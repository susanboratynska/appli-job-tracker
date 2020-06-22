const router = require('express').Router();
const bcrypt = require('bcryptjs'); //Package for hashing
const jwt = require('jsonwebtoken'); //used for authorization
const keys = require('../config/keys');
//load validators
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
let User = require('../models/user.models');

//Handles HTTP GET request
router.route('/').get((req, res) => {
    User.find()//mongoose method for select all
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
//Handles HTTP POST request

// @route POST api/users/register
// @desc Register user
// @access Public
router.route('/add').post((req, res) => {
    //Form Validation
    const{ errors, isValid } = validateRegisterInput(req.body);
    //check Validation
    if(!isValid){
        return res.status(400).json('Error: '+ errors);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        username,
        email,
        password
    });
    //Hash Password before saving
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if (err) throw err;
            newUser.password = hash;            
            newUser.save()
                .then(() => res.json('User Added!'))
                .catch(err => res.status(400).json('Error: '+ err));
        });
    });

});
//@route POST api/users/login
//@desc Login user and return JWT token
//@access Public

router.route('/login').post((req, res) => {
    //form validation
    const {errors, isValid} = validateLoginInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json('Error: '+ errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            //check if they exists
            if (!user) {
                return res.status(400).json({emailnotfound: "Email not found"});
            }
            //check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //User Matched, then create JWT payload
                    const payload = {
                        id: user.id,
                        username: user.username
                    };
                    //sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 //1 year in seconds
                        },
                        (err, token) => {
                            res.json({success: true, token: "Bearer " + token});
                        }
                    );
                }else{
                    return res.status(400).json({passwordincorrect: "Password incorrect"});
                }
            });
        });
});

router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User annihilated"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
            .then(() => res.json('User Updated!'))
            .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;