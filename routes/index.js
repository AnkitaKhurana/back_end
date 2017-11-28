const bcrypt = require('bcrypt');
const eli = require('../auth/utils').eli;
const route = require('express').Router();
const User = require('../db/models').User;
const passport = require('passport');
const msgsaved = require('../db/models').Msg;

const saltRounds = 10;

const myPlaintextPassword = 's0/\/\P4$$w0rD';




let msg='';

route.get('/',(req,res)=>{
    // res.send(req.user);

    res.render('index', { title: 'CHATAPP'});

});


route.get('/signup',(req,res)=>{
    res.render('signup', { title: 'CHATAPP'});
});


route.post('/signup', (req, res) => {


    User.create({

        username: req.body.username,
        email: req.body.email,
        //NEVER EVER DO THIS IS PRODUCTION
        //PASSWORDS SHOULD BE HASHED

        password:  bcrypt.hashSync(req.body.password, saltRounds)

    }).then((user) => {
        console.log(user.password);
        res.redirect('/')
    })
});


route.post('/login',passport.authenticate('local',{

    successRedirect:'/chatwindow/',
    failureRedirect:'/'
}));



route.get('/logout', (req, res) => {
    req.user = null;
    req.logout();
    req.session.destroy(function () {
        res.render('index', { title: 'CHATAPP'});
        // res.redirect('/login.html')
    })
});

route.post('/addMessage',eli('/'),(req,res)=>{

     console.log(req.body.username);
    msg+='\n'+(req.body.NN)+': '+(req.body.newmessage);

    msg = msg.replace(/\n/g, '<br/>');
    res.redirect('/chatwindow/');

});


route.get('/chatwindow',eli('/'),(req,res)=>{

        res.render('chat', { title: 'CHATAPP',username:req.user.username,messages:msg});

});

route.get('/profile', (req, res) => {
    // console.log(req.user);
    res.send(req.user);

});




//
// route.post('/token', passport.authenticate('local'), (req, res) => {
//
//     AuthToken.create({
//         token: uid2(20),
//         userId: req.user.id
//     }).then((authToken) => {
//         return res.send({
//             token: authToken.token
//         })
//     })
//
// });

module.exports = route;