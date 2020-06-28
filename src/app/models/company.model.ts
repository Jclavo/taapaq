import { Project } from "src/app/models/project.model";
import { User } from "src/app/models/user.model";

export class Company{
    id: number = 0;
    name: string = '';
    country_id: number = 0;

    projects: Array<Project> = [];
    users: Array<User> = [];

}