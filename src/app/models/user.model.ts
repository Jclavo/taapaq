import { Role } from "./role.model";

export class User{
    id: number = 0;
    login: string = '';
    password: string = '';
    name: string = '';
    email: string = '';
    isSuper: boolean = true;
    company_id: number = 0;
    project_id: number = 0;
    roles: Array<Role> = [];

    static fromData(_id,_name,_email){

        let user = new User();
        user.id = _id;
        user.name = _name;
        user.email = _email;
        return user;
    }
}