const rl = require('readline-sync');
const db = require('quick.db');
const bcrypt = require('bcrypt'); const saltRounds = 10;
function c(){console.clear()};
function check(username){if(db.get(`${username}.password`)){ return true } else { return false }};
function register(username, password){bcrypt.hash(password, saltRounds, function(err, hash) {db.set(username, { password: hash });c();console.log(`${username} has been successfully created.`)})};c();
function login(username, password){let check = db.get(`${username}.password`);bcrypt.compare(password, check, function(err, result) {
    if(result){
        //if true
        c();console.log('Logged in!')
    } else {
        //if false
        c();console.log('Password inncorrect!')
    }})}

const U = rl.question('USERNAME: ');if(!U){ c(); return console.log('Please enter a username.')};if(U.length < 4){ c(); return console.log('Please enter a longer username.')};
const P = rl.question('PASSWORD: ', {hideEchoBack: true});if(!P){ c(); return console.log('Please enter a password.')};if(P.length < 8){ c(); return console.log('Please enter a longer password.')};
check(U) ? login(U, P) : register(U, P)