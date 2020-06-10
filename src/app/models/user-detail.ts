export class UserDetail{

    id: number = 0;
    identification: string = '';
    email: string = '';
    name: string = '';
    lastname: string = '';
    fullname: string = '';
    phone: string = '';
    address: string = '';

    setFullname(){
        if(this.name){
            this.fullname = this.name;
        }

        if(this.lastname){
            this.fullname = this.fullname + ' ' + this.lastname;
        }

        this.fullname = this.fullname?.trim();
    }
} 