import { Resource } from "src/app/models/resource.model";

export class Module{
    id: number = 0;
    name: string = '';
    url: string = '';
    project_id: number = 0;
    resources: Array<Resource> = []; 
}