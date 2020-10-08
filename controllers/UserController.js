const config=require('./../database');
const sql=require('mssql');
async function addUser(User){
    try {
        let pool=await sql.connect(config);
        let users=await pool.request()
            .input('username',sql.NVarChar,User.username)
            .input('password',sql.NVarChar,User.password)
            .input('phone',sql.NVarChar,User.phone)
            .input('adress',sql.NVarChar,User.adress)
            .input('fullName',sql.NVarChar,User.fullName)
            .query('insert into users values (@username,@password,@phone,@adress,@fullName)');
        return ({"status":1,"message":"Thêm mới thành công"});
    } catch (error) {
        return ({"status":1,"message":"Thêm mới thất bại"});
    }
}
async function getUser(username){
    try {
        let pool=await sql.connect(config);
        let users=await pool.request()
            .input("username",sql.NVarChar,username)
            .query("SELECT * FROM users where username=@username");
        return users.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}
async function checkLogin(login){
    try {
        let pool=await sql.connect(config);
        let check =await pool.request()
            .input('username',sql.NVarChar,login.username)
            .input('password',sql.NVarChar,login.password)
            .query("select * from users where username=@username and password=@password");
		console.log();
        if (check.recordsets.length>0)
			return ({"status":1,'message':check.recordsets[0][0].username});
		else
			return ({"status":0,"message":"Login Fail!!!"});
    } catch (error) {
        return {"status":0,"message":"Login Fail!!!"};
    }
}
async function updateUser(username,User){
    try {
        let pool=await sql.connect(config);
        let update=await pool.request()
        .input('username',sql.NVarChar,username)
        .input('password',sql.NVarChar,User.password)
        .input('phone',sql.NVarChar,User.phone)
        .input('adress',sql.NVarChar,User.adress)
        .input('fullName',sql.NVarChar,User.fullName)
        .query("update users set password=@password,phone=@phone,adress=@adress,fullName=@fullName where username=@username");
        return {"status":1};
    } catch (error) {
        return{"status":0};
    }
}
module.exports ={
    addUser:addUser,
    getUser:getUser,
    checkLogin:checkLogin,
    updateUser:updateUser
}