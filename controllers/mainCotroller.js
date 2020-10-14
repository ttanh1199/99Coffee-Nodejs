const config=require('./../database');
const sql=require('mssql');
async function getType(request){
    try {
        let pool=await sql.connect(config);
        let type=await pool.request()
        .query("SELECT * FROM type");
        return ({"status":200,"message":"thành công", data: type.recordset});
    } catch (error) {
        return ({"status":500,"message":error.originalError.info["message"]});
    }
}
async function getSale(request){
    try {
        let pool=await sql.connect(config);
        let sale=await pool.request()
        .query("SELECT * FROM Sales");
        return ({"status":200,"message":"thành công", data: sale.recordset});
    } catch (error) {
        return ({"status":500,"message":error.originalError.info["message"]});
    }
}
async function getMenu(Type){
    try {
        let pool=await sql.connect(config);
        let menu=await pool.request()
        .input('id_type',sql.Int,Type)
        .query("SELECT * FROM food_drink WHERE Id_type=@id_type");
        return ({"status":200,"message":"thành công", data: menu.recordset});
    } catch (error) {
        return ({"status":500,"message":error.originalError.info["message"]});
    }
}       
async function getSize(){
    try {
        let pool=await sql.connect(config);
        let size=await pool.request()
        .query("SELECT * FROM size");
        return ({"status":200,"message":"thành công", data: size.recordset});
    } catch (error) {
        return ({"status":500,"message":error.originalError.info["message"]});
    }
}   
async function postBill(bill){
    console.log(bill);
    try {
        let pool=await sql.connect(config);
        let bill=await pool.request()
        // .input('id_type',sql.Int,Type)
        // .input('id_type',sql.Int,Type)
        // .input('id_type',sql.Int,Type)
        // .query("SELECT * FROM size");
        return ({"status":200,"message":"thành công", data: bill.recordset});
    } catch (error) {
        return ({"status":500,"message":error.originalError.info["message"]});
    }
}               

module.exports ={
    getType:getType,
    getSale:getSale,
    getMenu:getMenu,
    getSize:getSize,
    postBill:postBill,

}