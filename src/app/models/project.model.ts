import { Module } from "src/app/models/module.model";

export class Project{

    id: number = 0;
    name: string = '';

    modules: Array<Module> = [];
}