/**
 * Created by kvaghasiya on 12/20/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var port = 8080;
// Model path
var User = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Give your mongodb address here
mongoose.connect('mongodb://localhost/users');

// Middleware for all requests
router.use(function(req, res, next) {
    console.log('Request received. ');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Connected to API!' });
});


// Create - Create user with request data
router.route('/users/create').post(function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.zip = req.body.zip;

    user.save(function(err) {
        if (err) {
            console.log('Error occurred creating user: ', err);
            res.send(err);
        }
        res.json({ message: 'User created!' });
    });
});

// Read - Get all users info
router.route('/users').get(function (req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log('Error occurred getting all user: ', err);
            res.send(err);
        }
        res.json(users);
    });
});

// Read, Update & Delete
router.route('/users/:user_id')
    // Get User with given user_id
    .get(function(req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                console.log('Error occurred getting user with given user id: ', err);
                res.send(err);
            }
            res.json(user);
        });
    })
    // Update user with given user id
    .put(function(req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                console.log('Error occurred getting user with given user id: ', err);
                res.send(err);
            }
            if (!user) {
                console.log('No user found with given user id');
                res.json({ message: 'No user found with given user id.' });
            }
            else {
                // Just updates the username, add other things need to be updated here
                user.username = req.body.username;
                user.save( function (err){
                    if (err) {
                        console.log('Error occurred updating user: ', err);
                        res.send(err);
                    }
                    res.json({ message: 'User Name Updated!' });
                });
            }

        });
    })
    // Delete user with given user_id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) {
                console.log('Error occurred deleting user: ', err);
                res.send(err);
            }
            res.json({ message: 'User deleted.' });
        });
    });

app.use('/api', router);
app.listen(port);
console.log('Server started!');