export class UserRole{
    user_id: number = 0;
    role_id: number = 0;

    constructor(_user_id,_role_id){
        this.user_id = _user_id;
        this.role_id = _role_id;
    }
}