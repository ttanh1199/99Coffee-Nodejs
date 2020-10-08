const userController=require('./controllers/UserController');
var User=require('./model/User')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
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
})

var port = 8888;
app.listen(port);
console.log('Users API is runnning at ' + port);



