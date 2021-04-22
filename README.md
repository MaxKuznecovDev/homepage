<h1 align="center">Homepage</h1>

<h2 align="center"><a  href="https://d5114f41eaf249219a8a474ab8f34c6d.vfs.cloud9.eu-central-1.amazonaws.com/">Live Demo</a></h2>


## Description

A page about me and my pet-projects

## How to install

### 1.Create a new database for users messages:
You can use feedback.sql from repository.

### 2.Connection to your database:

```js
// serverModule\dbModule.js
const connection = mysql.createConnection({
        host: "127.0.0.1",//the location of your database
        user: "root",// the username to connect to your database
        database: "feedback",//the name of the database 
        password: "root"//the password to connect to your database
    });
```

## Technology stack

HTML, CSS, JS, Node JS