import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository, In } from 'typeorm';
import { RegisterUserDto } from './DTO/register-auth.dto';
import { LoginAuthDto } from './DTO/login-auth.dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
        private jwtService: JwtService
    ){}

    async register(user:RegisterUserDto){

        const {email, phone} = user
        // const emailExist = await this.usersRepository.findOneBy({email: user.email})
        const emailExist = await this.usersRepository.findOneBy({email: email})
        if(emailExist){
            // 409 CONFLICT
            throw new HttpException("El email ya está registrado", HttpStatus.CONFLICT)
        }

        const phoneExist = await this.usersRepository.findOneBy({phone: phone})
        if(phoneExist){
            // 409 CONFLICT
            throw new HttpException("El teléfono ya está registrado", HttpStatus.CONFLICT)
        }

        const newUser = this.usersRepository.create(user);

        let rolesId = [];
        if(user.rolesId !== undefined && user.rolesId !== null){ // DATA
            rolesId = user.rolesId;
        } else {
            rolesId.push('CLIENT')
        }
        
        const roles = await this.rolesRepository.findBy({id: In(rolesId)});
        newUser.roles = roles;

        const userSaved = await this.usersRepository.save(newUser);
        const rolesString = userSaved.roles.map(rol => rol.id);

        const payload = {
            id: userSaved.id, 
            name: userSaved.name,
            roles: rolesString
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token
        }

        delete data.user.password;
        
        return data;
    }

    async login(loginData:LoginAuthDto) {
        const { email, password} = loginData;
        
        const userFound = await this.usersRepository.findOne({
            where: {email: email},
            relations: ['roles']
        })
        if(!userFound) {
            // 404
            throw new HttpException("El correo no existe", HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);
        if(!isPasswordValid){
            // 403
            throw new HttpException("La contraseña no es correcta", HttpStatus.FORBIDDEN);
        }

        const rolesId = userFound.roles.map(rol => rol.id); // ['CLIENT', 'ADMIN'] 

        const payload = {
            id: userFound.id, 
            name: userFound.name, 
            roles: rolesId 
        };

        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        }

        delete data.user.password;
        // console.log('DATA RETURN: ', data);
        return data;

    }

}
