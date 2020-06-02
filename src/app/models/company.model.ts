import { Project } from "src/app/models/project.model";
import { User } from "src/app/models/user.model";

export class Company{
    id: number = 0;
    name: string = '';

    projects: Array<Project> = [];
    users: Array<User> = [];

}