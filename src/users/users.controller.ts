import { Body, Controller, Post, Get, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';
import { UpdateUserDto } from './DTO/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/JWT/jwt-roles.guard';
import { HasRoles } from 'src/auth/JWT/has-roles';
import { JwtRole } from 'src/auth/JWT/jwt-roles';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    // GET -> OBTENER
    // POST -> CREAR
    // PUT / PATCH -> ACTUALIZAR
    // DELETE -> BORRAR 

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get() // 
    findAll(){
        return this.userService.findAll();
    }

    @Post() // 
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') // 
    update(@Param('id', ParseIntPipe) id : number, @Body() user:UpdateUserDto ){
        return this.userService.update(id, user);
    }
   
    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateImage(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 1024 * 1024 * 10}),
                new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})
            ]
        }),
    ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id : number, 
    @Body() user:UpdateUserDto
    ) {
        return this.userService.updateImage(file, id, user);
    }
}
