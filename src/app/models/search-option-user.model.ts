import { SearchOption } from "./search-option.model";

export class SearchOptionUser extends SearchOption {

    company_id: number = 0;
    project_id: number = 0;
    role_id: number = 0;
    identification: string = '';
    type_id: number = 0;
    country_code: number = 0;

    constructor() {
        super();
    }

}