import { Module } from "src/app/models/module.model";
import { Company } from "src/app/models/company.model";
import { Role } from "src/app/models/role.model";

export class Project{

    id: number = 0;
    code: string = '';
    name: string = '';

    modules: Array<Module> = [];
    companies: Array<Company> = [];
    roles: Array<Role> = [];
}