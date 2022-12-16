# Intro
  Today we will extend on one of the pervious apps we've worked before. We used react hooks to create this [Todo application](https://viblo.asia/p/intro-to-react-hooks-1VgZvGE9lAw)
  
  
![](https://images.viblo.asia/2b8d36dc-c163-4bdf-b697-5ee697ec2aae.gif)

  That app used `localStorage` to save the state. We will transform it to a full blown PWA with help of `Feathers.js`.

  If you want to brush up on your skills on `React Hooks` or `Feathers.js` Please feel free to refer to these previous articles.

  [Intro to Feathers.js](https://viblo.asia/p/intro-to-feathersjs-Qbq5QpnJlD8)
  
  [Feathers hooks](https://viblo.asia/p/intro-to-feathersjs-deep-dive-in-hooks-Ljy5VzLz5ra)
  
  [Todo using React Hooks](https://viblo.asia/p/intro-to-react-hooks-1VgZvGE9lAw)

  # Making our app Offline Capable
  Because we've generated our app using `create-react-app`, we don't have to do a lot to turn our app offline capable. `create-react-app` by default comes with all the settings in place conveniently. But, for development purpose, it's disabled by default.

  To enable, navigate to `src/index.js`

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import * as serviceWorker from './serviceWorker';

  ReactDOM.render(<App />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();   <<=============== We need to change this
  ```

  Find the `serviceWorker.unregister()` (at the bottom) line and replace it with

  ```js
  serviceWorker.register()
  ```

  Now, our app is primed to register the `serviceWorker` on pageload. But, there are some gotchas.

  ```js
  // This optional code is used to register a service worker.
  // register() is not called by default.

  // This lets the app load faster on subsequent visits in production, and gives
  // it offline capabilities. However, it also means that developers (and users)
  // will only see deployed updates on subsequent visits to a page, after all the
  // existing tabs open on the page have been closed, since previously cached
  // resources are updated in the background.

  // To learn more about the benefits of this model and instructions on how to
  // opt-in, read https://bit.ly/CRA-PWA

  const isLocalhost = Boolean(  <<============ This will block sw from loading in development env.
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebook/create-react-app/issues/2374
        return;
      }

      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
          // This is running on localhost. Let's check if a service worker still exists or not.
          checkValidServiceWorker(swUrl, config);

          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
          });
        } else {
          // Is not localhost. Just register service worker
          registerValidSW(swUrl, config);
        }
      });
    }
  }

  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous service worker will still serve the older
                // content until all client tabs are closed.
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                );

                // Execute callback
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.');

                // Execute callback
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }

  function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
      .then(response => {
        // Ensure service worker exists, and that we really are getting a JS file.
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No service worker found. Probably a different app. Reload the page.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found. Proceed as normal.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }

  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }
  ```

  The way `create-react-app` designed it's service worker, in order for it to work, we have to use it as production environment.
  You can just modify `isLocalhost` to false, and continue working.
  ```js
  const isLocalhost = false;
  ```

  But a much better way is, to run it from production env.
  For that run

  ```bash
  npm i -g serve # if you don't have it installed already

  npm run build  # generate the build folder
  serve -s build # serve !
  ```

  Now to production server should be running at `localhost:5000`.
  Let's test.

 # Creating the api
 Because we will use `Feathers.js` this is extremely easy part. Will take us less than 5 minutes to be up and running with the API.

 So, let's create a new folder, and generate the app
 ```
 mkdir feathers-todo
 feathers generate app
 ```
 select the default options (we disabled authentication for the sake of bravety)
 ![](https://images.viblo.asia/1f4083b1-992f-49b3-a15a-a35047554681.png)

 now, lets create the `todo` service
 ```bash
 feathers generate service
 ```
![](https://images.viblo.asia/7ca35d5d-fbcf-4e23-bd3c-8601798feb47.png)

 Just doing this we will have all the necessary api for our app. For now, keep the feathers server running by running `npm start`.

 Let's focus back on our `React Todo` and make it work with the feathers api.

 # Making api calls
 We'll use `axios` for this. Run this and install `axios` on your code
 ```bash
 npm i -s axios
 ```

Open `App.js` and import `axios` on top.
```js
....
import axios from 'axios';
```

Now, let's see our old `App.js`

```js
if (localStorage.getItem('todoStore') !== null) {
    store = JSON.parse(localStorage.getItem('todoStore'));
  } else {
    store = [{
      item: "example todo",
      isCompleted: false
    }]
  }
```
We were checking if our browser's `localStorage` had previous todos stored, and reading that as our `store` object.

Let's change that to read from our feathers api

```js
axios.get('localhost:3030/todos') // 3030 is feathers app running
.then(function (response) {
  setTodos(response.data.data);
})
.catch(function (error) {
  console.log(error);
});
```

Fire up the react server and let's run.

![](https://images.viblo.asia/3fd20b0c-df7a-4000-81c3-c3415d96a00d.png)

We are blocked by the `CORS` security countermeasures. No worries, it's just a one line change to make it work.
Open the `package.json` file, and add the `"proxy": "http://localhost:3030"` line at the bottom.

```js
{
  "name": "react-todo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.19.0",
    "font-awesome": "^4.7.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.1.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:3030"     <<============ Add this
}
```

 This will tell react app to redirect any path it can't recognize to the proxy path. Easy as that.
 That being done. let's modify our code, we can just call `axios.get('/todos')`
 now, no need to define full path.

 ```js
  axios.get('/todos')
  .then(function (response) {
    setTodos(response.data.data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

![](https://images.viblo.asia/7f97319b-1f6e-49e1-8db0-c5bb42216495.gif)


## Create

Time to modify our create todo method. The previous method only saved data to `localStorage`.
```js
const addItem = text => {
  const newTodos = [...todos, { item: text }];
  setTodos(newTodos);
  localStorage.setItem('todoStore', JSON.stringify(newTodos));
}
```

Let's change it to actually do api call. After we get response from the server,
we'll call the `setTodos(todo)` method and update the UI.
```js
  const addItem = text => {
    const todo = { item: text, isCompleted: false };
    const newTodos = [...todos, todo ];
    axios.post('/todos', todo)
    .then(function (response) {
      setTodos(newTodos);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
```

## Update
```js
const complete = index => {
  const newTodos = [...todos];
  const todo = newTodos[index];
  todo.isCompleted = !todo.isCompleted
  setTodos(newTodos);
  axios.put(`/todos/${todo._id}`, todo)
  .then(function (response) {
    setTodos(newTodos);
  })
  .catch(function (error) {
    console.log(error);
  });
}
```

## Remove
```js
const removeItem = index => {
  const newTodos = [...todos];
  const removedTodo = newTodos.splice(index, 1);

  axios.delete(`/todos/${removedTodo[0]._id}`)
  .then(function (response) {
    setTodos(newTodos);
  })
  .catch(function (error) {
    console.log(error);
  });
}
```

And we're done !

# Source code
[React App](https://github.com/SSalekin/react-todo)

[Feathers App](https://github.com/SSalekin/feathers-todo)