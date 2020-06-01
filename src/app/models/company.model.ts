import { Project } from "src/app/models/project.model";

export class Company{
    id: number = 0;
    name: string = '';

    projects: Array<Project> = [];
}