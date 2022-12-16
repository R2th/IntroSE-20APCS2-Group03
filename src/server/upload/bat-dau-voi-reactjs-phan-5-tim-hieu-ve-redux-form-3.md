# 2.2 Ví dụ: 
### 2.2.1 Field-Level validation:
 - Một ví dụ cơ bản với form đăng ký gồm text field, email:

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
import FieldLevelValidationForm from "./FieldLevelValidationForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Field-Level Validation</h2>
      <FieldLevelValidationForm onSubmit={showResults} />
      <Values form="fieldLevelValidation" />
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
  form: reduxFormReducer, 
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;

```


- Mình muốn mở alert để show data sau khi form submit với data valid:

```
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  await sleep(500);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});

```

- Và đây sẽ là form của chúng ta, đầu tiên khai báo form bọc bởi high level components  `reduxForm` và đặt cho nó 1 form id. Ở đây mình đặt là `simple` tên này phải nên là uniq trong ứng dụng của bạn vì form sẽ nhận  lại props thông qua form id này. <=> bạn cũng có thể lợi dụng lại đặc tính này để tận dụng formRecuce của mình 1 cách tối ưu.

`src/FieldLevelValidationForm.js`

```
import React from 'react';
import { reduxForm } from 'redux-form';

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)
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
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
```

- Field component

```

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
```

- Render:

```
import React from 'react'
import { Field, reduxForm } from 'redux-form'

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
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text"
        component={renderField} label="Username"
        validate={[ required, maxLength15 ]}
      />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={email}
        warn={aol}
      />
      <Field name="age" type="number"
        component={renderField} label="Age"
        validate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)
```


và đơn giarn, đâu là kết quả:

![](https://images.viblo.asia/77431cc9-0ec0-400e-90e5-0382b9b88bc1.png)https://images.viblo.asia/77431cc9-0ec0-400e-90e5-0382b9b88bc1.png

## 2.2.2  Submit Validation
- Bắt đầu chuẩn bị gần như tương tự với `Simple Form`

- Ở đây mình sẽ thay đổi 1 tí ở file `src/index.js` thay đổi form id
`src/index.js`
```
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import SyncValidationForm from "./SyncValidationForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Submit Validation</h2>

      <ul>
        <li>
          Usernames that will pass validation: <code>john</code>
          , <code>paul</code>
          , <code>george</code>
          , or <code>ringo</code>
          .
        </li>
        <li>
          Valid password for all users: <code>redux-form</code>.
        </li>
      </ul>

      <SubmitValidationForm onSubmit={showResults} />
      <Values form="submitValidation" />
    </div>
  </Provider>,
  rootEl
);
```

- Tạo 1 component để đưa vào component `Field` để Show các error 1 cách cụ thể:
```
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
```

-  1 ví dụ về submit validation nên mình sẽ tạo 1 file handle submit
  `src/submit.js`
```
import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(1000).then(() => { // simulate server latency
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!',
      });
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!',
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
}

export default submit;

```

- Các mà chúng ta sẽ phải khai báo với `reduxForm` 
```
export default reduxForm({
  form: 'submitValidation', // a unique identifier for this form
})(SubmitValidationForm);
```

`src/SubmitValidationForm.js`

```
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>
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
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>Log In</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'submitValidation', // a unique identifier for this form
})(SubmitValidationForm);

```

đây làm kết quả:

![](https://images.viblo.asia/06fc6d83-eb10-42e0-97c3-6a9126144197.png)