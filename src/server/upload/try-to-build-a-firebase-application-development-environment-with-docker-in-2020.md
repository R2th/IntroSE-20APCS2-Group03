Not long ago, Windows System for Linux2 (WSL2) was released. You can now run Linux on Windows.

Also, by using WSL2, you can use Docker Desktop for Windows even on home Windows. Unexpectedly, some people may not aware of this.

Home I used to use Docker ToolBox, but it wasn't a very good experience and I didn't have much motivation for Docker.

However, when I used Docker Desktop for Windows, it was very easy to use, so I tried to build an environment to develop a TS application with Firebase Cloud Functions as the back end with Docker. I will try Vue.js for the front. This is an article summarizing the results.

↓ is a directory structure diagram of files related to environment construction explained in this article. Of course, there are other source files and application configuration files as well.

```
directory construction map

.
├──app
│  ├──functions
│  │  ├──lib
│  │  ├──node_modules
│  │  ├──.dockerignore
│  │  ├──copy-node_modules.sh
│  │  ├──Dockerfile
│  │  └──package.json
│  │     
│  ├──vuejs
│  │  ├──dist
│  │  ├──node_modules
│  │  ├──.dockerignore
│  │  ├──copy-node_module.sh
│  │  ├──Dockerfile
│  │  └──vue.vonfig.js
│  │
│  └──firebase.json
│
├──swagger
│  └──index.yml
│
└──docker-compose.yml
```

The Docker container group looks like ↓.

![](https://images.viblo.asia/f39a5438-904f-4c46-80f8-78657fc2eb88.png)

By the way, this time I developed an application that does not use DB. If you use DB, you probably keep this configuration if you use Firebase's Cloud Firestore, but if you need something like MySQL, you'll probably want to add a db container.

It was the first time I developed a TS application, but when building a development environment with Docker, I encountered the following problems.

* Hot reload does not work when sharing TS build destination with Windows
* Building is very slow when sharing node_modules with Windows
* If `*.d.ts` is not on the editor side, you will not receive the benefits of the type during development.


The next Firebase spec also bothered me.

* When you launch the emulator, the API will be prefixed with the `project name/region name /`

Let's take a look at each container.

# firebase container
* package.json
```
"scripts": {
  ...
  "emulators": "tsc-watch --onFirstSuccess \"firebase emulators:start --token ${FIREBASE_TOKEN}\""
  ...
},
...
"dependencies": {
  ...
  "firebase-admin": "^9.2.0",
  "firebase-functions": "^3.6.1",
  ...
}
...
"devDependencies": {
  ...
  "tsc-watch": "^4.2.9"
  ...
}
```
I will be using the advantage of [Cloud Functions Emulators](https://firebase.google.com/docs/functions/local-emulator) in the Firebase CLI. And use `tsc-watch` to enable hot reload development.

```
$ npm run emulators
```

* firebase.json
```
...
  "hosting": {
    "public": "vuejs/dist",
    ...
    "rewrites": [
      {
        "source": "/get-users",
        "function": "get-users"
      }
    ]
  },
  "emulators": {
    "functions": {
      "host": "0.0.0.0",
      "port": 5001
    },
    "hosting": {
      "host": "0.0.0.0",
      "port": 5000
    },
    "ui": {
      "enabled": true,
      "host": "0.0.0.0",
      "port": 4000
    }
  }
...
```
Firebase settings:

In `hosting`, the public directory is first specified as the default build destination of Vue.js (public). 

In `rewrites`, each function of Cloud Functions can be called by accessing / ～. This is because the API endpoint provided by Cloud Functions Emulators has the project name and region name in the prefix, but I want to ignore this prefix part when hitting the API from Swagger (project in Swagger's yml file). I don't want to write the name and region name). If the API calls increases, it will be necessary to add it here.

In `emulators`, host is specified so that it can be accessed from outside Docker, and the UI screen of Cloud Functions Emulators is enabled so that the smallest port number is assigned. You may not use it often, but this will open the dashboard-like screen of the emulator with "OPEN IN BROWSER" of Docker Desktop for Windows.

* docker-compose.yml
 ```
 volumes:
  firebase-node_modules:
  firebase-lib:

services:
  firebase:
    build: ./app/functions
    image: firebase
    container_name: firebase
    ports:
      - 4000:4000
      - 5000:5000
      - 5001:5001
    volumes:
      - ./app:/app
      - firebase-lib:/app/functions/lib
      - firebase-node_modules:/app/functions/node_modules
    environment:
      - FIREBASE_PROJECT
      - FIREBASE_TOKEN
 ```
 
 I don't want to share `node_modules` with the host, so I create separate volumes and store them there. If the code after transpiling the TS is also shared with the host side, it will prevent hot reloading, so we do the same.
 
FIREBASE_TOKEN is for hitting the Firebase CLI without logging in. You can get it at https://firebase.google.com/docs/cli?hl=ja#cli-ci-systems.
 
 * Dockerfile

```
FROM node:10

RUN apt-get update && \
  npm install -g firebase-tools

WORKDIR /app/functions

COPY package*.json ./

CMD npm install \
  && firebase use ${FIREBASE_PROJECT} --token ${FIREBASE_TOKEN} \
  && npm run emulators

EXPOSE 4000 5000 5001
```
I am executing the following steps

1. Install firebase-tools
2. npm package installation
3. Firebase project settings
4. Start the emulator (with hot reload)


And copy package `*.json` here because the volume mount I wrote in `docker-compose.yml` isn't in Docker yet because it's will only be available after processing the contents of the Dockerfile.

* .dockerignore
 ```
 node_modules
 ```
 
 The host `node_modules` are not needed, so write them in `.dockerignore`.
 
* copy-node_modules.sh
```
#! /bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)

docker cp -a -L firebase:/app/functions/node_modules $SCRIPT_DIR
```

It is a script that copies the `.d.ts` file installed in the Docker container to the host side for development with VS Code on the host. It would be nice if you could specify the extension with the `docker cp` command, but I can't, so I used `node_modules` entirely. It takes longer with it. Furthermore, I think that it is related to symbolic links, but it is necessary to execute it with administrator privileges.

I'd really like to develop by connecting to the Docker container with VS Code's [Remote WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) plugin, but the operation is still unstable in the Preview version, or it freezes frequently in my environment ... I would like to try again when it becomes the official version. If you can use this well, you don't need this script.

After launching the firebase container, you can access the emulator UI from OPEN IN BROWSER.

![](https://images.viblo.asia/29202251-b531-4863-a9dc-95f0172bdfe3.png)

# swagger container
* docker-compose.yml

```
services:
  # other settings...
  swagger:
    image: swaggerapi/swagger-ui
    container_name: swagger
    ports:
      - 8000:8080
    volumes:
      - ./swagger:/var/www
    environment:
      SWAGGER_JSON: /var/www/index.yml
```

Make the ./swagger/index.yml file visible on port 8000 on the host side.

After launching the swagger container, you can access the Swagger UI from OPEN IN BROWSER.

![](https://images.viblo.asia/1d480fac-2c1a-4339-bded-fc1dfa010d9b.png)
This container is simple because it simply publishes `index.yml`.

# vuejs container
* docker-compose.yml
```
volumes:
  # other settings...
  vuejs-node_modules:

services:
  # other settings...
  vuejs:
    build: ./app/vuejs
    image: vuejs
    container_name: vuejs
    ports:
      - 3000:3000
      - 3001:3001
    volumes:
      - ./app:/app
      - vuejs-node_modules:/app/vuejs/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
```

Make port 3000 for Vue CLI UI and port 3001 for serve.

Again, I don't want to share `node_modules` with the host, so I'll avoid it with another volume.

The environment variable CHOKIDAR_USEPOLLING seems to be what you need for a hot reload on serve.

* Dockerfile
```
FROM node:10

RUN apt-get update && \
    npm install -g @vue/cli

WORKDIR /app/vuejs

COPY package*.json ./

CMD npm install \
    && vue ui --host 0.0.0.0 --port 3000

EXPOSE 3000 3001
```

I have installed the Vue CLI and specified the following in the options of the vue ui command

* --host 0.0.0.0 Make WebUI accessible from outside the Docker container
* --port 3000 3000 Launch WebUI on port

`.dockerignore`
```
node_modules
```

Again, the host node_modules is not needed, so write it in `.dockerignore.`

* vue.config.js
```
module.exports = {
    devServer: {
        port: 3001,
        host: '0.0.0.0'
    }
}
```
Specify the server options to be launched with serve in the same way as vue ui.

* copy-node_modules.sh
```
#! /bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)

docker cp -a -L vuejs:/app/vuejs/node_modules $SCRIPT_DIR
```
It is a script that copies the .d.ts file installed in the Docker container to the host side in order to develop with VS Code on the host like the firebase container. It takes a while. Execution with administrator privileges is required.![](https://images.viblo.asia/899bb253-1b2e-440b-b65f-38d3f04ef5e1.png)

This is the construction of the development environment for Firebase + Vue.js + TS application using Docker. It seems that the contents here will change depending on the version upgrade of each tool in the future, but as of 2020/12, this is the way to make things set up.