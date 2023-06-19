const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./config/database')
const router = express.Router();
const isAuthorized = require('./middlewares/authenticateToken');
const jwt = require("jsonwebtoken");
const routes=require('./routes/index');
const PORT=process.env.PORT;
const middleware=require('./controllers/auth');
var cors = require('cors')
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get("/auth/data", (req, res) => {
  console.log("I am here");
  return res.send({ data: "Working Properly" }).status(200);
});


var config = require("./config/config");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,OPTIONS, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization,*');
    // res.setHeader('Access-Control-Alow-Headers', 'Content-Type, Authorization');
    // res.setHeader('Content-Type', 'text/json')
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // console.log("In cors Middleware methods",req.method)
    // console.log("In cors Middleware headers",req.headers)
    // console.log("In cors Middleware headers",req.body)
    next();
});

const dashboardController = require("./controllers/dashboard.controller");
app.get("/auth/dashboard_data", dashboardController.getDashboardReport);


app.use('/auth/masters',routes(router))
app.use('/auth',routes(router))

app.post("/auth/login", (req, res) => {
  console.log("I am here")
    middleware.authUser(req, res);
  });
  
  app.get("/auth/userdata", (req, res) => {
  console.log("I am in users data api here")
    middleware.allUser(req, res);
  });
  
  
  app.post("/auth/tokenValidity", async(req, res) => {
    if (!req.headers["authorization"]) {
     return res.status(401).send("Unauthorized");
    } else {
      jwt.verify(req.headers["authorization"], config.secret, (err, decoded) => {
        if (err) {
          res.status(403).send("Not authorized");
        } else {
          res.status(200).send("Token is valid");
        }
      });
    }
  });
  
  //app.use(router);
  

// sequelize.sync().then(result=>{
app.listen();
// }).catch(err=>{
    // console.log(err)
// })



