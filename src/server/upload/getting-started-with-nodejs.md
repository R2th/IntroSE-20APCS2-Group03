### What is Node.js? and Why use it?
Node.js is a JS runtime environment which allows the infrastructure to build and run an application. It’s a light, scalable, and cross-platform way to execute code. It uses an event-driven I/O model which makes it extremely efficient and makes scalable network application possible.

There are many reasons why Node.js become popular below are just a few to name.
- Easy and fast to build real-time apps
- Many programmers are already familar with javascript
- It increases the efficiency of the development process as it fills the gap between frontend and backend developers
- It has hug ecosystem and tons of library to choose from.
- The single-threaded, event-driven architecture of Node.js allows it to handle multiple simultaneous connections efficiently. This allows it to handle hundreds of thousands or even a million concurrent connections
- Great for microservice

### Installation
There are many different ways to get Node.js installed, but in this article I'm going to use [nvm](https://github.com/nvm-sh/nvm) a node version manager to manage multiple node versions.

To install nvm enter the following command
```SH
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

then to install specific version of node run the following command
```SH
$ nvm install 8.11.3
$ nvm use 8.11.3 # switch version
```

check if node is correctly installed
```SH
$ node -v
$ npm -v
```

**NPM** is the default node package manager and it comes pre-installed with the node runtime, but I prefer to use another package manager tool and it's called [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable). To install it enter
```SH
$ curl -o- -L https://yarnpkg.com/install.sh | bash
```

### The Basic
To start with the basic let's initialize a project by run the following command
```SH
$ mkdir demo
$ cd $_
$ yarn init # Or just `yarn` for existing project
$ # or using npm
$ npm init
```
this will create two files `yarn.lock` if you create project with yarn, and `package.json`. Every time you add new dependency these two files will be updated.

To add dependency run
```SH
$ yarn add {package-name} # or npm install {package-name} --save
$ yarn install # or npm install to fetch all dependencies listed in package.json
```

Type in `node` to open interactive console and play around.
```JS
$ node
> 10 + 20
30
> function hello() {
... console.log('hello')
... }
undefined
> hello()
hello
undefined
```

We can run node script by type `node script.js`. This will load the content of `script.js` file and evaluate it.

When the application grow large we can separate our code into separate file and import them. Node.js support a concept call **module** and anything that was assign to **module.exports** get exposed to the outside world and ready to be used. For example
```JS
// hello.js
module.exports = function() {
    console.log('hello');
}
```

to use this module we need to import it using **require** keyword and assign it to a variable like below
```JS
$ node
> const hello = require('./hello');
undefined
> hello()
hello
undefined
```
**require** accept a string which can be a relative path to a script file or a package name from **node_modules** directory which we will see in latter section when we start exploring third-party packages.

### Node.js Project
Lets start by creating a **RESTful** service that serve **JSON** over **HTTP** for a Todo list. Open up your favorite text editor and enter the following code snippet.
```JS
// app.js
const express = require('express');

const app = express();
let todos = [];

app.use(express.json());

app.get('/todos', (req, res) => {
    res.status(200).json({
        data: todos,
    });
});

app.post('/todos', (req, res) => {
    const { body } = req;
    
    if (!body.name) {
        res.status(400).json({
            error: {
                name: 'is required',
            },
        });
    } else {
        todos.push(body.name);
        res.status(201).json({
            data: body.name,
        });
    }
});

app.delete('/todos/:name', (req, res) => {
    const { name } = req.params;
    const index = todos.find(todo => todo === name);
    
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).json('success');
    } else {
        res.status(404).json({
            error: `can't find '${name}' in todo list.`,
        });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`start listening on: http://localhost:${port}`);
});
```

We begin by importing a package name **express**, a popular Node.js web application framework. Then we create a server application instance. To add support for parsing a JSON payload we add a middleware function to our application instance with **app.use**. Then we add three routes to our web server by calling **app.get**, **app.post** and **app.delete** which in turn expose **GET**, **POST** and **DELETE** to **/todos** endpoint. The **app.listen** will start our web server on provided port number.

Before we could start our web application there is one more step we need to do. That is initialize a project and to pull in third-party package (express). Type in the following
```SH
$ yarn init
$ yarn add express
```

then we can start our application like this
```SH
$ node app.js
```

Go on and start making request to `http://localhost:8000/todos` to see the result.

A final step to make development easy is to add live code reloading by using a package name **nodemon**.
```SH
$ yarn nodemon --dev
```
the `--dev` flag tells yarn to add this package as a development only dependency. Now open `package.json` and add the following.
```JSON
"scripts": {
    "start": "./node_modules/nodemon/nodemon.js app.js"
}
```
now we can start the server and watch for file changes with
```SH
$ yarn start
```