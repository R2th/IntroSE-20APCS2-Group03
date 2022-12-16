This is the second installment to the article series *Preparing a CRA based React Redux Scaffold*. In the last article we setup a CRA boilerplate. We added basic support for React, Redux and React Router. We also introduced environment variables to our setup. In this article, we are going to add some more features on top of the scaffold we developed so far.

## React-Intl Integration [[link](https://github.com/atshakil/cra-rest-scaffold/commit/77d785cf6838b91f1a6f69005752999b858326f4)]

There are several popular i18n libraries available to use with React. Among those, [React-Intl](https://github.com/yahoo/react-intl) is one of the most feature rich solution. It features API to format dates, numbers and strings, including pluralization and handling translations.

First, we are going to add the dependency.

```sh
yarn add react-intl
```

Since our scaffold is Redux based, we are going to integrate *react-intl* with Redux, so that tasks like language switching can be performed with just dispatching an action. In order to enable date and number translation, we need to explicitly declare languages we want to support. During the period of writing this article, *React-Intl* supports around 150 languages. The supported languages can be declared in the entry point (`index.js`) of our scaffold.

```js
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';
import ja from 'react-intl/locale-data/ja';

// ...
addLocaleData([...en, ...vi, ...ja]);
// ...
```

Once the languages are declared, we need a reducer. The reducer should facilitate language switching.

```js
import * as types from '../constants/ActionTypes';
import { en, vi, ja } from '../locales';

const initialState = {
  locale: 'en',
  messages: en,
  locales: [
    {locale: 'en', messages: en},
    {locale: 'vi', messages: vi},
    {locale: 'ja', messages: ja}
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOCALE_SWITCH:
      const messages =
        state.locales.find(nth => nth.locale === action.locale).messages;
      return Object.assign({}, state, {locale: action.locale, messages});
    default:
      return state;
  }
};
```

Maybe you have noticed that we are importing messages from `locales` directory. Translation files are simply JSON files with translation key value pairs.

Once the reducer is in place, we need associated action.

```js
import * as types from '../constants/ActionTypes';

export const switchLocale = locale => ({
  type: types.LOCALE_SWITCH,
  locale
});
```

Now that we integrated *React-Intl* with Redux, we need to introduce a provider to the scaffold, so that the translation becomes available to all the child components.

```js
// src/containers/app/index.js

class App extends Component {
  render() {
    const { locale, translations } = this.props;
     return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <IntlProvider locale={locale} key={locale} messages={translations}>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </IntlProvider>
    );
  }
}
```

Once the provider is in place, we can access translations in any child component. For an example, `<FormattedMessage id='dashboard.title' />`, where `dashboard.title` is a translation key.

## SCSS Support [[link](https://github.com/atshakil/cra-rest-scaffold/commit/6fdd91a29c8ea44fe377a0cf99fe6b18120de0ea)]

We are going to enable SCSS support using *node-sass-chokidar* package. SCSS support integration is a little bit tricky, since this package utilizes an watcher that constantly watches SCSS files, and if any change is detected, it updates the corresponding CSS file. But the issue is encountered when we need to run watcher and development server at the same time. This is where comes *npm-run-all* package to rescue. We can setup npm script in the following way, so that SCSS watcher and development server can be run consequently using a single command, which is more convenient.

```json
  "scripts": {
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
    "start-js": "react-scripts start",
    "build-js": "react-scripts build",
    "start": "npm-run-all -p watch-css start-js",
    "build": "npm-run-all build-css build-js",
    "test-js": "react-scripts test --env=jsdom",
    "test": "npm-run-all build-css test-js",
    "eject": "react-scripts eject"
  }
```

## State Persistence Support [[link](https://github.com/atshakil/cra-rest-scaffold/commit/d58aef403e49bb30ba8bc6bf2e0979ff11c783ad)]

When a Redux based React application is initialized, it receives initial state from it's reducers (reducers by convention provides their corresponding default initial state.). But, during an application's lifecycle, we may encounter some scenario where some state needs to be persistent.

Persistent state can be achieved by constantly producing backup of the state. And, `localStorage` can be the perfect candidate for this task. We can feed application state to the `localStorage` using the `store.subscribe` method.

```js
store.subscribe(throttle(
  () => saveState(persistableStateTree(store.getState())),
  Settings.local_storage_update_latency
));
```

Here, `persistableStateTree` provides a structure identical to that of `mapStateToProps`, which receives a `state` as an argument, and here `persistableStateTree` returns a subset of the state tree instead. We are using `throttle` to reduce computational overhead, so that backup occurs only at a specified maximum frequency.

We made a backup of the state. But, on app initialization or reload, we need to merge this state with the application state. `createStore` provides the entrypoint for this task.

```js
// ...
const initialState = loadState();
// ...
const store = createStore(rootReducer, initialState, composedEnhancers);
// ...
```

Two methods (`loadState` and `saveState`) we haven't revealed yet. Let's have a look.

```js
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(error) {
    console.error(error.message);
  }
};
 export const loadState = state => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
     return JSON.parse(serializedState);
  } catch(error) {
    console.error(error.message);
    return undefined;
  }
};
```

`saveState` serializes the state and saves to the `localStorage`, where `loadState` parses the state from the `localStarage`, with support for additional fallback measures.

This process of state persistence unification adds many advantages during the application development lifecycle. Managing persistent states in different components in a scattered manner can become really painful, when application grows over time. And, this process makes it a lot easier from both maintenance and feature development perspectives.

---

Till now, we added support for internationalization, SCSS and unified persistent state management. While these features may seem pretty fundamental (once you get a hang of it ;) ). But, we are still missing a lot. In the upcoming installment we are going to cover back end integration, and something more interesting :D . Till then, happy coding. :)