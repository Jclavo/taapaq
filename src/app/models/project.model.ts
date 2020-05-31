import { Module } from "src/app/models/module.model";
import { Company } from "src/app/models/company.model";

export class Project{

    id: number = 0;
    name: string = '';

    modules: Array<Module> = [];
    companies: Array<Company> = [];
}