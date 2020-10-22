const config = require('./../database');
const sql = require('mssql');
async function getType(request) {
    try {
        let pool = await sql.connect(config);
        let type = await pool.request()
            .query("SELECT * FROM type");
        return ({
            "status": 200,
            "message": "thành công",
            data: type.recordset
        });
    } catch (error) {
        return ({
            "status": 500,
            "message": error.originalError.info["message"]
        });
    }
}
async function getSale(request) {
    try {
        let pool = await sql.connect(config);
        let sale = await pool.request()
            .query("SELECT * FROM Sales");
        return ({
            "status": 200,
            "message": "thành công",
            data: sale.recordset
        });
    } catch (error) {
        return ({
            "status": 500,
            "message": error.originalError.info["message"]
        });
    }
}
async function getMenu(Type) {
    try {
        let pool = await sql.connect(config);
        let menu = await pool.request()
            .input('id_type', sql.Int, Type)
            .query("SELECT * FROM food_drink WHERE Id_type=@id_type");
        return ({
            "status": 200,
            "message": "thành công",
            data: menu.recordset
        });
    } catch (error) {
        return ({
            "status": 500,
            "message": error.originalError.info["message"]
        });
    }
}
async function getSize() {
    try {
        let pool = await sql.connect(config);
        let size = await pool.request()
            .query("SELECT * FROM size");
        return ({
            "status": 200,
            "message": "thành công",
            data: size.recordset
        });
    } catch (error) {
        return ({
            "status": 500,
            "message": error.originalError.info["message"]
        });
    }
}
async function postBill(Bill) {
    try {
        let pool = await sql.connect(config);
        let bill = await pool.request()
            .input('price', sql.Money, Bill.price)
            .input('dateBill', sql.DateTime, Bill.dateBill)
            .input('id_user', sql.Int, Bill.id_user)
            .query('INSERT INTO bill VALUES (@price,@dateBill,@id_user)');
        return ({
            "status": 200,
            "message": "tạo đơn thành công"
        });
    } catch (error) {
        console.log(error);
        return ({
            "status": 500,
            "message": "Thất bại"
        });
    }
}

async function billDetail(dt) {
    try {
        let pool = await sql.connect(config);
        for (let i = 0; i < dt.length; i++) {
            await pool.request()
                .input('id_bill', sql.Int, dt[i]['id_bill'])
                .input('id_food_drink', sql.Int, dt[i]['id_food_drink'])
                .input('price', sql.Money, dt[i]['price'])
                .input('id_size', sql.Int, dt[i]['id_size'])
                .query('INSERT INTO billDetail VALUES (@id_bill,@id_food_drink,@price,@id_size)');
        }
        return ({
            "status": 200,
            "message": "tạo đơn thành công"
        });
    } catch (error) {
        console.log(error);
        return ({
            "status": 500,
            "message": "Thất bại"
        });
    }
}

async function getProSale() {
    try {
        let pool = await sql.connect(config);
        let prosale = await pool.request()
            .query("SELECT * FROM food_drink WHERE promo_price > 0");
        return ({
            "status": 200,
            "message": "thành công",
            data: prosale.recordset
        });
    } catch (error) {
        return ({
            "status": 500,
            "message": error.originalError.info["message"]
        });
    }
}
module.exports = {
    getType: getType,
    getSale: getSale,
    getMenu: getMenu,
    getSize: getSize,
    postBill: postBill,
    billDetail: billDetail,
    getProSale: getProSale,

}