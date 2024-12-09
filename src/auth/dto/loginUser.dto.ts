import { CreateUsersDTO } from "@entities/users/dto/createUsers.dto";
import { PickType } from "@nestjs/swagger";

export class LoginUserDto extends PickType(CreateUsersDTO, ['email', 'password']){

}