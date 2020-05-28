export class RolePermission{
    role_id: number = 0;
    permission_id: number = 0;

    constructor(_role_id, _permission_id){
        this.role_id = _role_id;
        this.permission_id = _permission_id;
    }

}