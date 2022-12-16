# Sequelize in Nodejs Part I
In the article, I want to show you guy about how to use sequlize in nodejs. By the way, i will step by step to config connect Sequelize with mysql and connect in Pool connection, and after you finish read this the article, we hope you guy can config sequelize to connect to mysql by your self.
## What is Sequelize ?
Sequelize is a promise-based ORM for Node.js. Sequelize is easy to learn and has dozens of cool features like synchronization, association, validation, etc. It also has support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL.
![](https://images.viblo.asia/e5b14eb5-e348-420a-b6ee-ecf6de9c6586.png)
## Why we need to use Sequelize ?
With this question, maybe some you guy say that hey!!! I never use it, I use other library for support Nodejs or Hey I use only mysql connect, I dont' want to use third mysql. But in this case i will show you how usefull of the result We need to choose Sequelize for connect your database.
![](https://images.viblo.asia/977cec63-8b42-4c76-9af0-e16ae6810a31.jpeg)
### Easy To Use
In the first thing, I need to tell you, it is easy to use you. For my studied, I just spend only 1h hour i can find out and run it, But I think maybe you guy can do it better than me. Sequelize is full [documentation](https://sequelize.org/v4/) and [stackoverflow](https://stackoverflow.com/questions/tagged/sequelize.js) or [slack](http://sequelize-slack.herokuapp.com/). It means it is easy for you to find out and research. 
### Synchronization, Association and Validation
In this words, for my meaning if you use only mysql2 or mysql in nodejs you need to handle validation and synchronization by your self. You can image like that Sequelize it look like ActiveRecord in Ruby On Rails. It provide full ***Scope***, ***Transcations***, ***Migration***,  ***Associations*** and ***Model Usage***
![](https://images.viblo.asia/8995a87c-e2e7-44b7-8bc1-49354ba459ad.png)
## How to config Sequelize
In first step we need to do we need to run add sequelize package.
```
// run with NPM
npm add sequlize
// run with Yarn
yarn add sequlize
```
After that we need to create folder and file called ```config/database.js``` to write our code config in it. In file ```config/database.js```
```
'user strict';
const Sequelize = require('sequelize');

const host = process.env.HOST || 'localhost';
const userName = process.env.USER_NAME;
const password = process.env.DATBASE_PASSWORD || '';
const database = process.env.DATBASE_NAME;
const maxPool = process.env.MAX_POOL || 5;
const minPool = process.env.MIN_POOL || 0;
const acquire = process.env.acquire || 30000;
const idle = process.env.IDLE || 10000;
const MYSQL = 'mysql';

class Database {
  constructor() {
    this._sequelize = new Sequelize(database, userName, password, {
      host: host,
      dialect: MYSQL,
      pool: {
        max: parseInt(maxPool),
        min: parseInt(minPool),
        acquire: parseInt(acquire),
        idle: parseInt(idle)
      }
    })
  }

  connect() {
    return this._sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  sequelize() {
    return this._sequelize;
  }
}

const db = new Database();

module.exports = db;
```
## How to use Sequelize
After you already config our sequelize in file above. Example you have the database as image below
![](https://images.viblo.asia/6de571c9-079e-4249-91e3-ec64c1f83659.png)
Now let's start create folder and file for our table user  by add new folder and file ```models/user.js```, In ```user.js```
```
const db = require('../../config/database');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = db.sequelize();

const attributes = {
  idUser: {
    field: 'isUsers',
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    field: 'email',
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    field: 'password',
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
      field: 'age',
      type: Sequelize.INTEGER,
      allowNull: false
  }
}

const modelName = {
  indexes: [{
    unique: true,
    fields: ['isUsers']
  }],
  sequelize,
  modelName: 'user'
}

class User extends Model {}

User.init(attributes, modelName);

module.exports = User;
```
## Conclusion
With this articles, We just introduct how to config with very simple example. By the way it is very important for you to step up as sentence that ***journey of thousands miles begins with a single step***. We will continue with other Nodejs Usage and tip like promise. However if you guy feel not confortable with this please let me the the comment. Or if you think it is very usefull for you please let's put Like or Up.
## Documentation
- [sequelize](https://sequelize.readthedocs.io/en/v3/docs/getting-started/)