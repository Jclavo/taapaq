import { Project } from "src/app/models/project.model";
import { User } from "src/app/models/user.model";
import { Country } from "src/app/models/country.model";

export class Company{
    id: number = 0;
    name: string = '';
    country_id: number = 0;

    projects: Array<Project> = [];
    users: Array<User> = [];
    country = new Country();

}