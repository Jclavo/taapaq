import { Resource } from "src/app/models/resource.model";

export class Module{
    id: number = 0;
    name: string = '';
    url: string = '';
    icon: string = '';
    project_id: number = 0;
    resources: Array<Resource> = [];
    parent_id: number = 0;
    labeled: boolean = false;

    children: Array<Module> = [];
    open: boolean = false;
}