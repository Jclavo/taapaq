import { Role } from "./role.model";
import { UserDetail } from "./user-detail";

export class User{
    id: number = 0;
    login: string = '';
    // password: string = '';
    // name: string = '';
    // email: string = '';
    activated: boolean = false;
    isSuper: boolean = true;

    company_id: number = 0;
    project_id: number = 0;
    user_detail_id: number = 0;

    roles: Array<Role> = [];
    info = new UserDetail();

    // static fromData(_id,_name,_email){

    //     let user = new User();
    //     user.id = _id;
    //     user.name = _name;
    //     user.email = _email;
    //     return user;
    // }
}