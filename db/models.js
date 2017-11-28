const Sequelize = require('sequelize');



const db = new Sequelize('ChatApp', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Msg = db.define('msg',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content : Sequelize.STRING
})

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email : Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
});
console.log('test');


//CODE TO MAKE DB 1st time
//
// return db.query("CREATE DATABASE IF NOT EXISTS `ChatApp`;").then(data => {
//     console.log('Db Made Anki');
//
//
//         // code to run after successful creation.
//     });



db.sync()
    .then(() => {
    console.log("Database Synchronised");
})
.catch((err) => {
    console.log("Error setting up Database");
console.error(err);
});



module.exports = {
    User,Msg
};

