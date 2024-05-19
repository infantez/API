import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './DTO/create.rol.dto';
import { HasRoles } from 'src/auth/JWT/has-roles';
import { JwtRole } from 'src/auth/JWT/jwt-roles';
import { JwtRolesGuard } from 'src/auth/JWT/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService){}

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    create(@Body() rol: CreateRolDto){
        return this.rolesService.create(rol);
    }

}
