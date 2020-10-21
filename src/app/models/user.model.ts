import { Role } from "./role.model";
import { UserDetail } from "./user-detail";
import { Company } from "src/app/models/company.model";

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
    company =  new Company();

    password: string = '';
}