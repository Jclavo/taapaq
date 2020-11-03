import { Project } from "src/app/models/project.model";
import { User } from "src/app/models/user.model";
import { Country } from "src/app/models/country.model";

export class Company{
    id: number = 0;
    name: string = '';
    universal_person_id : number = 0;
    // country_id: number = 0;
    // country: string = '';
    // country_code: string = '';
    country = new Country();

    projects: Array<Project> = [];
    users: Array<User> = [];


}