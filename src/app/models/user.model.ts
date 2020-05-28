
export class User{
    id: number = 0;
    name: string = '';
    email: string = '';
    password: string = '';

    static fromData(_id,_name,_email){

        let user = new User();
        user.id = _id;
        user.name = _name;
        user.email = _email;
        return user;
    }
}