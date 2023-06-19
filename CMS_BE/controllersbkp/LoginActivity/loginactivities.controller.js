const User_Login = require("../../models/user_login.model")
const User = require('../../models/users.model');
const sequelize = require('../../config/database');

exports.simpleLogout=async (req,res,next)=>{
    return res.json({message:"Token blacklisted. User logged out."});
}
exports.userCurrentLogins=async (req,res,next)=>{
    const user = await User.findOne({where:{ id: req.user.id }});
    if (user){
        const user_logins=await User_Login.findAll({where:{ user_id: user.id ,token_deleted:false}});
        var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress || 
        req.connection.socket.remoteAddress
        var current=false
        const logins=[]
        user_logins.forEach(async(login) => {
            current=false
            if(req.user.token_id==login.token_id){
                current=true
            }
            var login=login.get({plain:true});
            login.current=current
            logins.push(login);          
        });        
        return res.status(200).send({"user_logins":logins})
    }
    return res.status(400).send("Bad Request")
}
exports.LogoutAllDevices=async (req,res,next)=>{
    const user = await User.findOne({where:{ id: req.user.id }});
    if (user){
        const user_logins=await User_Login.findAll({where:{ user_id: user.id}});
        var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress || 
        req.connection.socket.remoteAddress
        var current=false
        const logins=[]
        user_logins.forEach(async(login) => {
            current=false
            if(req.user.token_id==login.token_id){
                current=true
            }
            login.token_deleted=true;
            login.logged_out=true;
            login.save()
            var login=login.get({plain:true});
            login.current=current
            logins.push(login);          
        });              
        return res.status(200).send({"deleted":true,"user_login":logins})
    }
    return res.status(400).send("Bad Request")

}