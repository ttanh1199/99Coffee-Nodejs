const userController=require('./controllers/UserController');
var User=require('./model/User')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const mainCotroller = require('./controllers/mainCotroller');
const { request } = require('express');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 app.use('/api', router);

//userroute(router);
router.route('/user/:username').get((req,res)=>{
    userController.getUser(req.params.username).then(result=>{
        res.json(result[0]);
    })
}),
router.route('/user').post((req,res)=>{
        let user={... req.body}
        userController.addUser(user).then(result=>{
            res.json(result);   
    })
}),
router.route('/user/login').post((req,res)=>{
    let login ={... req.body}
    userController.checkLogin(login).then(result=>{
        res.json(result);
        console.log(result)
    })
}),
router.route('/user/:username').put((req,res)=>{
        let user={... req.body}
        userController.updateUser(req.params.username,user).then(result=>{
            res.json(result);   
    })
}),

// api dungnt
router.route('/type').get((req,res) => {
    mainCotroller.getType().then(result=>{
        res.json(result);  
    })
    .catch(err => {
        console.log(err);
    })
}),
router.route('/sale').get((req,res) => {
    mainCotroller.getSale().then(result=>{
        res.json(result);  
    })
    .catch(err => {
        console.log(err);
    })
}),
router.route('/menu/:id_type').get((req,res) => {
    mainCotroller.getMenu(req.params.id_type).then(result=>{
        res.json(result);  
    })
    .catch(err => {
        console.log(err);
    })
}),
router.route('/size').get((req,res) => {
    mainCotroller.getSize().then(result=>{
        res.json(result);  
    })
    .catch(err => {
        console.log(err);
    })
}),
router.route('/order').post((req,res) => {
    mainCotroller.postBill(req.body).then(result=>{
        res.json(result);  
    })
    .catch(err => {
        console.log(err);
    })
})

var port = 8888;
app.listen(port);
console.log('Users API is runnning at ' + port);



