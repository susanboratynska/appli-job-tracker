# After first clone
* Check package.json to ensure the scripts are notated
* `npm install`
* `npm i validator`
* `npm start`
* 

# Backend Set Up

* `$ nodemon server` (new terminal window)
* Start MongoDB `$ mongod --dbpath /usr/local/var/mongodb` (new terminal window)
* Use database `$ mongo` followed by `> use appli-job-app-tracker` (new terminal window)

### Troubleshoting:
* Close MongoDB:: `$ brew services stop mongodb-community@4.2`
* Close previous instance of mongoDB:
    `sudo lsof -iTCP -sTCP:LISTEN -n -P`
    `$ brew services list`
    `sudo kill <mongo_command_pid>`
    `mongod`
* Socket Error: `$ sudo rm /tmp/mongodb-27017.sock`

### Notes:
* Mongoose is a library that lets us work with the database in an object oriented way.

# Connecting Backend to Frontend
* Axios will let us send HTTP request from the front-end to our server

## MongoDB Compass
Visual mongoDB data

### Connect Backend Steps
* create schema in `backend > models` folder
* `import axios from 'axios';` in component file
* in with `onSubmit` method, insert  the code responsible for sending data of the new component element to the backend
    `axios.[post OR get]('http://localhost:4000/NAME/NAME', newOBJECTNAME)
                .then(res => console.log(res.data));`
* 