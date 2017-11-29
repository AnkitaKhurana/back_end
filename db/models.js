const Sequelize = require('sequelize');

const db = new Sequelize('df1endjjfbqmth', 'ogpmmliwvhlbrw', '02d8a5b7c15a5ca81db6381656ed57a06a9a307735b14af1e0aa3e7cd61749f1', {
    host: 'ec2-54-221-254-72.compute-1.amazonaws.com',
    dialect:'postgres',
    dialectOptions: {
        ssl: true
    },

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

