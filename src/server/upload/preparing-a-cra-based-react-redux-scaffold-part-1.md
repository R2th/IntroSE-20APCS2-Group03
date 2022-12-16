A React App. development can be started by choosing one of many available scaffolds, which offers a variety of advantages and flexibility over one another. [Create React App.](https://github.com/facebook/create-react-app) (CRA) is a React scaffold offered by Facebook, that provides a minimal startup boilerplate with lots of flexibility via built in scripts. It attempts to represent a clean and minimal development environment to the developer, by abstracting away many development dependencies (e.g. [webpack](https://webpack.js.org/)), while exposing them when they are needed. It also supports a one way full control handover strategy called [`eject`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject), that exposes all the development dependencies to the user, so that those can be customized as needed.

While considering React App development, different development stack comes in mind, including REST app stact, [GraphQL](https://graphql.org/) app stack, and more. These stacks have their own ecosysystem with unique dependency requirements. CRA, while being a great starting point for a wide range of projects, it doesn't provide any stack specific boilerplates, and leaves it to the developer's hand. This often leaves a developer to work with stack specific boilerplate developement task, which must be completed before even starting project specific tasks.

In this article, we'll go through a REST based app boilerplate developement phases, which includes React Router, Redux, i18n, persistent state management and more. We'll also discuss briefly about dependency selection, utilization, advantages and their associated drawbacks.

## Generating a CRA Boilerplate [[link](https://github.com/atshakil/cra-rest-scaffold/commit/db5c7a34959242f4643cb3e45386c65d428e4302)]

First of all, we need to generate CRA boilerplate codes to get started. Before staring with any of the project work, we need [`node`](https://nodejs.org) to be installed in our development machine. To install the dependency package, please follow the instructions [here](https://nodejs.org/en/download/package-manager/) if a package manager is available for your system, else follow [these instructions](https://nodejs.org/en/download/) as applies to your system.

Once, Node is installed, generate a CRA boilerplate by running,

```bash
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

This will create a `my-app` directory with the boilerplate codes, which has the following structure.

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js
```

The first command `npx create-react-app my-app` fetches `create-react-app` package and executes it with `my-app` argument. This creates a directory `my-app`, generates all the project specific boilerplate codes in there and installs project dependency packages (specified in `package.json`), which creates `node_modules` directory.

Since we `cd`ed into the project root and run a `npm start`, the project starts running at `localhost` at port `3000` or any available consecutive port.

Now that we have our project base ready, let's get to know the primary structure.

- `src`
  - `index.js`: Contains DOM binding and other bootstrapping codes
  - `index.css`: Root level (potentially global) stylesheet
  - `App.js`: An example component
  - `App.css`: Component specific stylesheet for `App.css`
  - `App.test.js`: Component test file for `App.js`
  - `registerServiceWorker.js`: A simple service worker for the project
- `public`
  - `index.html`: Root markup
  - `favicon.ico`: [Favicon](https://en.wikipedia.org/wiki/Favicon) for the project
  - `manifest.json`: Project [manifest](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json) file (usually specifies platform specific details)

Different phases of development requires different support packages. For now, let's install [Lodash](https://lodash.com/), which is a utility library that provides functions which are convenient in terms of modularity and performance.

We are going to use [`yarn`](https://yarnpkg.com/en/) for package management.

```bash
yarn add lodash
```

## Redux Integration

Redux is an application specific state management library, which simplifies front end state management drastically.

### Store, Root Reducer, Provider [[link](https://github.com/atshakil/cra-rest-scaffold/commit/dc887d158f776ac73f83f02625ea784cefdc1215)]

While considering Redux integration in a React application, we have to add two different dependency modules.

```bash
yarn add redux
yarn add react-redux
```

`react` contains pure Redux elements without any binding to React. And, `react-redux` as the name implies, provides a React binding for Redux.

React binding of Redux implements a Provider pattern, which serves store to the enclosing component tree. Redux store itself depends on a reducer. First we need to create a Reducer.

```javascript
// src/reducers/index.js

import { combineReducers } from 'redux';
import dummy from './dummy';

export default combineReducers({
  dummy
});

```

```javascript
// src/reducers/dummy.js

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

In `src/reducers/index.js`, we defined a reducer root using `combineReducers`. It accepts multiple child reducers in a flat hierarchy. In this example, we fed `dummy` reducer to it.

Now we can define a store.

```js
// src/store.js

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const initialState = {};
const enhancers = [];
const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
```

A Redux store optionally accepts an initial state, [middlewares](https://redux.js.org/advanced/middleware) and [enhancers](https://github.com/reduxjs/redux/blob/master/docs/Glossary.md#store-enhancer). We already have a root reducer. An initial state can be marked as empty using an empty object `{}`. But, later we'll leverage this feature to load data from persistent storage. Middleware and enhancers can be considered as addons for Redux store. As an example, Redux Thunk provides asynchronicity to dispatch Redux actions.

And, finally, we can enclose our React root component with Redux provider.

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
```

Now, any child component of `Provider` will be able to access Redux store by utilizing the `connect` HOC.

### Directory Structure Generation [[link](https://github.com/atshakil/cra-rest-scaffold/commit/e2fc2a5a747cc22bb6d6f3c81e459db6e7159592)]

From the perspective of Redux, React components can be classified into three different categories.

#### Presentational Components

Presentational components are pure React components. These components are Redux agnostic. A simple example,

```js
class Hello extends React.Component {
 render() {
   return (<div>Hello {this.props.name}</div>);
 }
}
```

We are going to put these components in `src/components` directory.

#### Container Components

Container components are basically React components bound to Redux store. These components communicate with Redux via props, which provides bi-directional data flow through state and dispatcher mapping.

```js
const mapStateToProps = state => ({
 todos: state.todos
});

const mapDispatchToProps = dispatch => ({
 updateCurrentToDo(text) {
     dispatch(updateTodo(text))
 }
});

const ToDo = connect(mapStateToProps, mapDispatchToProps)(VisibleToDo);
```

We are going to put these components in `src/containers` directory.

#### Hybrid Components

Hybrid components are simply presentational and container components in a single file. This pattern is often used for lightweight components, to avoid the hassle of managing multiple files.

```js
class VisibleDemo extends React.Component {
 render() {
     return (<div>Hello {this.props.name}</div>);
 }
}

const Demo = connect()(VisibleDemo);
```

We'll put hybrid components in the same directory as the container components, for simplicity.

### Action, Reducer, Container and Presentational Components [[link](https://github.com/atshakil/cra-rest-scaffold/commit/6dfe97fc5484753e72596e8f908519ab7449b436)]

In a Redux based application, state can be read via *state to prop mapping*, and state can be manipulated via *dispatcher to prop mapping*.

To serve the basic purposes, we can introduce Redux action creators to the scaffold as follows.

```js
// src/actions/Dummy.js

import * as types from '../constants/ActionTypes';

export const incrementDummyValue = () => ({
  type: types.DUMMY_INCREMENT
});
```

```js
// src/constants/ActionTypes.js

export const DUMMY_INCREMENT='DUMMY_INCREMENT';
```

Constants are better separated, so that minor typo related errors can be eliminated.

Now, let's add a reducer branch for the newly introduced action creator.

```js
// src/reducers/dummy.js

import * as types from '../constants/ActionTypes';

const initialState = {
  dummyValue: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DUMMY_INCREMENT:
      return Object.assign({}, state, {dummyValue: state.dummyValue + 1});
    default:
      return state;
  }
};
```

Once action creator and reducer is defined, it is ready to be consumed.

```js
// src/containers/dashboard/index.js

// ...
export class VisibleDashboard extends Component {
  render() {
    const { dummyValue, incrementDummyValue } = this.props;

    return (
      <div className='App'>
        ||{dummyValue}||
        <button onClick={e => incrementDummyValue()}>Increment</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dummyValue: state.dummy.dummyValue
});

export default connect(mapStateToProps, { incrementDummyValue })(VisibleDashboard);
```

This setup demonstrates a basic Redux based application flow.

### Asynchronus Flow Support [[link](https://github.com/atshakil/cra-rest-scaffold/commit/f2dc9cd2b20be8e5d29c305135c6a80c3dc8edf5)]

Redux actions are plain JS objects, where action creators are just functions that returns actions. But, when asynchronus flow (e.g. API call, scheduled interrupt) is considered, it requires its own strategy. [Redux Thunk](https://github.com/reduxjs/redux-thunk) provides the capability to integrate asynchronicity to Redux's action dispatching mechanism. We'll integrate Thunk support by adding the following package.

```bash
yarn add redux-thunk
```

Once added, it can be attached as a store middleware like as follows.

```js
// src/store.js

import thunk from 'redux-thunk';
// ...

const middleware = [thunk];
// ...
```

## React Router Integration [[link](https://github.com/atshakil/cra-rest-scaffold/commit/9c68c0c4201607fe05124f907d60e8108c151a93)]

While React Router provides a lots of features, integrating it to a Redux application is not that much of a hassle. It requires a single dependency.

```bash
yarn add react-router-dom
```

Like Redux, React Router implements a Provider pattern. We are going to put it immediately below Redux provider.

```js
// src/index.js

import { BrowserRouter as Router } from 'react-router-dom';
// ...

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
// ...
```

After setting the provider in its place, we can start implementing routes as follows.

```js
// src/containers/app/index.js

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard';
import NotFound from '../not_found';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
```

`Switch` renders the first route component that matches the current path. If no path is matched, the last route component `<Route component={NotFound} />` gets rendered. Notice that this component does not have a `path` property defined. When this is the case, the associated component will be rendered always.

This is a very basic routing flow. We are still missing layout and authenticity based routing and redirection. We'll cover it shortly.

But, for now it is important to note that, due to compatibility issue with Redux, React Router requires that every container componet should be wrapped in `withRouter` HOC, as follows.

```js
export default withRouter(connect()(Demo));
```

## Environment Variables [[link](https://github.com/atshakil/cra-rest-scaffold/commit/c564c0eb6e041a7b9c766a13bbe87edddd784de1)]

CRA provides support for environment variables, by default.

### Setting an Environment Variable

An environment variable can be set by creating a file named `.env*` (e.g. `.env.local`). And, putting environment variables in the following format.

```env
REACT_APP_ORIGIN_API_PREFIX='/v1'
REACT_APP_ORIGIN_FRONTEND_PREFIX=''
```

The default `.gitignore` setup of CRA ignores several `.env*` prefixed files. Since these files store local configurations, a `.env.example` can be added with sample configurations to the SCM.

### Reading an Environment Variable

Environment variables can be read using the following format.

```js
process.env.REACT_ORIGIN_API_PREFIX
```

It's important to note that the variables are parsed and replaced by their corresponding value during compilation time. Also, the variables that are prefixed only with `REACT_APP_`, are available.

### Path Alias Support

When using CRA without ejecting, [webpack alias](https://webpack.js.org/configuration/resolve/#resolve-alias) feature does not become available. While by ejecting, configuration management becomes totally manual, there's a way to get limited support for path alias, by using `NODE_PATH` variable as follows.

```env
NODE_PATH=src
```

This enables us to import using,

```js
import App from 'containers/app';
```

instead of,

```js
import App from './containers/app';
```

This acts exactly like webpack alias, except the support is limited to relative directories only.

---

So far, we setup a CRA boilerplate, and added basic support for React, Redux and React Router. We also introduced environment variables to our setup. While this should be enough to get a basic project started, we are going to introduce a number of advanced features to our scaffold in the uncoming installment of this article. Till then, happy coding. :)