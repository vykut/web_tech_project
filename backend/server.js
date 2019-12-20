const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");

const app = express();

const User = sequelize.define('user', {
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            len : [5, 20]
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            len : [5, 20]
        }
    }
})

app.use((req, res, next) => {
    console.warn(req.url);
    next();
});
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.warn(err);
    res.status(500).json({message: '>:('});
});

app.get('/login', async (req, res, next) => {
    try {
        let user = await User.findByUsername(req.params.username)
        if (user && user.password == req.params.password) {
            res.status(200).json({message: 'Login succesful'})
        } else {
            res.status(401).json({message: 'Wrong username or password. Try again'})
        }
    } catch (err) {
        next(err)
    }
})

app.listen(8080);