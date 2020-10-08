'use strict';
class User{
    constructor(id,username,password,sdt,adress,fullName){
        this.id=id;
        this.username=username;
        this.password=password;
        this.sdt=sdt;
        this.adress=adress;
        this.fullName=fullName;
    }
}
module.exports=User;