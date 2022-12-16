# 2.2 Ví dụ: 
### 2.2.1 Async Blur Validation:
 - Validation này sẽ chạy trước thi event onSubmit được thực hiện, nếu bạn chỉ quan tâm tới validation chỉ khi submit thì nên sửa dụng submit validation.

- Chuẩn bị file `public/index.html`

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <title>React App</title>
  <link rel="stylesheet" type="text/css" href="https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css" media="all">
<link rel="stylesheet" type="text/css" href="https://redux-form.com/6.6.2/bundle.css" media="all">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- root file ở `src/index.js`, Ở đây mình sẽ sử dụng 1 thẻ của `redux-form` là `Values` Khá là tiện dụng khi debug với `simple` là form id

```
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import AsyncValidationForm from "./AsyncValidationForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Asynchronous Validation</h2>
      <p>
        Usernames that will <em>fail</em> validation: <code>john</code>
        , <code>paul</code>
        , <code>george</code> or <code>ringo</code>
        .
      </p>
      <AsyncValidationForm onSubmit={showResults} />
      <Values form="asyncValidation" />
    </div>
  </Provider>,
  rootEl
);
```

- Tạo store với khai báo `redux-form` reduce
`src/store.js`
```
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;

```


- Mình muốn mở alert để show data sau khi form submit với data valid:
`src/asyncValidate.js` mình tạo 1 ví dụ validation đơn giản
```
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' };
    }
  });
};

export default asyncValidate;

```

- Và đây sẽ là form của chúng ta, đầu tiên khai báo form bọc bởi high level components  `reduxForm` và đặt cho nó 1 form id. Ở đây mình đặt là `asyncValidation` , cách khai báo async validation form với react:
```
export default reduxForm({
  form: 'asyncValidation', 
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
})(AsyncValidationForm);

```

`src/AsyncValidationForm.js`

```
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import asyncValidate from './asyncValidate';

const renderField = (
  { input, label, type, meta: { asyncValidating, touched, error } },
) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const AsyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <div>
        <button type="submit" disabled={submitting}>Sign Up</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'asyncValidation', 
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
})(AsyncValidationForm);
```

- Mình sẽ khởi tạo 1 số validation theo cấu trúc:

```

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You` might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
```

`src/showResults.js` vẫn là 1 alert để show kết quả:
```
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});

```

và đơn giarn, đâu là kết quả:

![](https://images.viblo.asia/7f0fcba5-70e8-4f02-b9c5-1a07f438bced.png)

## 2.2.2  Initialize From State
- Ở đây mình sẽ đưa ra ví dụ về cách initialize value cho form.
- 
- Ở đây mình sẽ thay đổi 1 tí ở file `src/index.js` thay đổi form id
`src/index.js`
```
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import InitializeFromStateForm from "./InitializeFromStateForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Initialize From State</h2>
      <InitializeFromStateForm onSubmit={showResults} />
      <Values form="initializeFromState" />
    </div>
  </Provider>,
  rootEl
);

```

- Tạo 1 redux action:

```
// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const LOAD = 'redux-form-examples/account/LOAD';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: LOAD, data });

export default reducer;

```

`store.js`
```
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import account from './account';

const reducer = combineReducers({
  account,
  form: reduxFormReducer, // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;

```

- Map state to props bằng cách đơn giản 

```
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data, // pull initial values from account reducer
  }),
  { load: loadAccount }, // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
```
- Tương tự với ví dụ khác đây là form của mình:
`src/InitializeFromStateForm.jsInitializeFromStateForm.js`
```
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load as loadAccount } from './account';
const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.',
};
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(data)}>Load Account</button>
      </div>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Age</label>
        <div>
          <Field name="age" component="input" type="number" placeholder="Age" />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />
            {' '}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />
            {' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option value="">Select a color...</option>
            {colors.map(colorOption => (
              <option value={colorOption} key={colorOption}>
                {colorOption}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Bio</label>
        <div>
          <Field name="bio" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data, // pull initial values from account reducer
  }),
  { load: loadAccount }, // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;


```

Kết quả nào: