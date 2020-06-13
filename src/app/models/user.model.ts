import { Role } from "./role.model";
import { UserDetail } from "./user-detail";

export class User{
    id: number = 0;
    login: string = '';
    activated: boolean = false;
    token: string = '';
    isSuper: boolean = true;

    company_id: number = 0;
    project_id: number = 0;
    user_detail_id: number = 0;

    roles: Array<Role> = [];
    info = new UserDetail();
}