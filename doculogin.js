const rl = require('readline-sync'); //require thing that asks for user input
const db = require('quick.db'); //require db provider
const bcrypt = require('bcrypt'); //require thing that hashes passwords
function c() {console.clear()}; //shortened console.clear(); to c();

function check(username) { //function check with supplied username input (e.g check("username") )
    if (db.get(`${username}.password`)) { //if user password in the database exists
        return true //output true
    } else {
        return false //output false
    }};

function register(username, password) { //function register with supplied username and password input (e.g register("username", "password") )
    bcrypt.hash(password, 10, function (err, hash) { //hash supplied password, output as hash var
        db.set(username, { password: hash }); //store hash and supplied username in the database
        c(); console.log(`${username} has been successfully created.`)
    })};c();

function login(username, password) { //function login with supplied username and password input (e.g login("username", "password") )
    let check = db.get(`${username}.password`); //because username must be true from check function, get the hashed password from database
    bcrypt.compare(password, check, function (err, result) { //compare supplied password with hashed password from database
        if (result) { //if true
            c();console.log('Logged in!') //you can use supplied password to unlock / decrypt something
        } else { //if false
            c();console.log('Password inncorrect!')
        }
    })
}

const U = rl.question('USERNAME: '); //ask for username from user
if (!U) { c(); return console.log('Please enter a username.')}; //if there is no supplied username, stop.
if (U.length < 4) { c(); return console.log('Please enter a longer username.')}; //make sure supplied username length is over 4 letters

const P = rl.question('PASSWORD: ', {hideEchoBack: true}); //ask user for password and hide input
if (!P) { c(); return console.log('Please enter a password.')}; //if there is no supplied password, stop.
if (P.length < 8) {c(); return console.log('Please enter a longer password.')}; //make sure supplied password length is over 8 letters

check(U) ? login(U, P) : register(U, P) //if check function returns true run login function with supplied username and password else run register function

/*

Basically:

if(check(U)){ 
login(U, P)
} else {
register(U, P)
}

*/
