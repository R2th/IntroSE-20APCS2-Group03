Trước kia khi validate form bên phía client side mình thưởng sử dụng plugin [jquery-validation](https://jqueryvalidation.org/), tuyên nhiên khi làm việc với ReactJs, dự liệu form thược được chứa trong state, vì vậy sử dụng jquery-validation không còn hợp lý nữa, việc sử dụng jQuery trong code ReactJs cũng không phải là một cách làm hay.  Trong bài viết này mình sẽ hướng dẫn các bạn viết một class dùng để validate form trong ReactJs có thể sử dụng lại cho nhiều trường hợp.

# Cài đặt

Chúng ta sẽ sử dụng `create-react-app` để tạo ứng dụng ReactJs.

Cài đặt package sử dụng `npm`:
```bash
npm install -g create-react-app
```

Tạo ứng dụng:
```bash
create-react-app react-form-validation-sample
```

Chạy ứng dụng:
```bash
cd react-form-validation-sample/
yarn start
```

Truy cập vào [http://localhost:3000/](http://localhost:3000/) trên trình duyệt bạn sẽ thấy ứng dụng đã có thể chạy được:

![](https://images.viblo.asia/c45888ca-9787-4a94-81fa-dd60f8c15e63.png)

# Chuẩn bị

Mình kiếm được một form snippet khá đẹp trên codepen, nên mình sẽ fork về và sử dụng nó trong ứng dụng này:

{@embed: https://codepen.io/thinhhung/pen/GPNxWx}

## Style

Sửa file `src/App.css` :

```css
body {
  margin: auto;
  background: #eaeaea;  
  font-family: 'Open Sans', sans-serif;
}

.info p {
  text-align:center;
  color: #999;
  text-transform:none;
  font-weight:600;
  font-size:15px;
  margin-top:2px
}

.info i {
  color:#F6AA93;
}
form h1 {
  font-size: 18px;
  background: #F6AA93 none repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  padding: 22px 25px;
  border-radius: 5px 5px 0px 0px;
  margin: auto;
  text-shadow: none; 
  text-align:left
}

form {
  border-radius: 5px;
  max-width:700px;
  width:100%;
  margin: 5% auto;
  background-color: #FFFFFF;
  overflow: hidden;
}

p span {
  color: #F00;
}

p {
  margin: 0px;
  font-weight: 500;
  line-height: 2;
  color:#333;
}

h1 {
  text-align:center; 
  color: #666;
  text-shadow: 1px 1px 0px #FFF;
  margin:50px 0px 0px 0px
}

input {
  border-radius: 0px 5px 5px 0px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  width: 75%;
  height: 40px;
  float: left;
  padding: 0px 15px;
}

a {
  text-decoration:inherit
}

textarea {
  border-radius: 0px 5px 5px 0px;
  border: 1px solid #EEE;
  margin: 0;
  width: 75%;
  height: 130px; 
  float: left;
  padding: 0px 15px;
}

.form-group {
  overflow: hidden;
  clear: both;
}

.icon-case {
  width: 35px;
  float: left;
  border-radius: 5px 0px 0px 5px;
  background:#eeeeee;
  height:42px;
  position: relative;
  text-align: center;
  line-height:40px;
}

i {
  color:#555;
}

.contentform {
  padding: 40px 30px;
}

.bouton-contact{
  background-color: #81BDA4;
  color: #FFF;
  text-align: center;
  width: 100%;
  border:0;
  padding: 17px 25px;
  border-radius: 0px 0px 5px 5px;
  cursor: pointer;
  margin-top: 40px;
  font-size: 18px;
}

.leftcontact {
  width:49.5%; 
  float:left;
  border-right: 1px dotted #CCC;
  box-sizing: border-box;
  padding: 0px 15px 0px 0px;
}

.rightcontact {
  width:49.5%;
  float:right;
  box-sizing: border-box;
  padding: 0px 0px 0px 15px;
}

.validation {
  display:none;
  margin: 0 0 10px;
  font-weight:400;
  font-size:13px;
  color: #DE5959;
}

#sendmessage {
  border:1px solid #fff;
  display:none;
  text-align:center;
  margin:10px 0;
  font-weight:600;
  margin-bottom:30px;
  background-color: #EBF6E0;
  color: #5F9025;
  border: 1px solid #B3DC82;
  padding: 13px 40px 13px 18px;
  border-radius: 3px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03);
}

#sendmessage.show,.show  {
  display:block;
}

```

## Tạo form

File `src/App.js` gồm những field đơn giản như name, email, address, subject và message, handle event change lưu data vào state.
```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      subject: '',
      message: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // Handle validation here
  };

  render() {
    return (
      <div className="App">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
        <h1>Elegant Contact Form.</h1>
        <form>
          <h1>Should you have any questions, please do not hesitate to contact me :</h1>
          <div className="contentform">
            <div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
            <div className="leftcontact">
              <div className="form-group">
                <p>Name <span>*</span></p>
                <span className="icon-case"><i className="fa fa-user"></i></span>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInput}/>
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <p>E-mail <span>*</span></p>
                <span className="icon-case"><i className="fa fa-envelope-o"></i></span>
                <input type="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <p>Address <span>*</span></p>
                <span className="icon-case"><i className="fa fa-location-arrow"></i></span>
                <input type="text" name="address" value={this.state.address} onChange={this.handleInput}/>
                <div className="validation"></div>
              </div>
            </div>

            <div className="rightcontact">
              <div className="form-group">
                <p>Subject <span>*</span></p>
                <span className="icon-case"><i className="fa fa-comment-o"></i></span>
                <input type="text" name="subject" value={this.state.subject} onChange={this.handleInput}/>
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <p>Message <span>*</span></p>
                <span className="icon-case"><i className="fa fa-comments-o"></i></span>
                <textarea name="message" onChange={this.handleInput}>{this.state.message}</textarea>
                <div className="validation"></div>
              </div>
            </div>
          </div>
          <button type="button" className="bouton-contact">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
```

Đây là kết quả sau khi đã custom form trên ReactJs:
![](https://images.viblo.asia/f549d6fa-4dec-4ce1-8db5-4fa61626fa95.png)

# Validator class

Cài đặt package `validator`:
```bash
npm install --save validator
```

## Validator class

Nội dung file `src/utils/validator.js`:

```js
import methods from 'validator';

class Validator {
  constructor(rules) {
    this.rules = rules;
    this.initiate();
  }

  initiate() {
    this.isValid = true;
    this.errors = {};
  }

  validate(state) {
    this.initiate();
    this.rules.forEach((rule) => {
      if (this.errors[rule.field]) return;

      const fieldValue = state[rule.field] || '';
      const args = rule.args || [];
      const validationMethod = typeof rule.method === 'string'
        ? methods[rule.method]
        : rule.method;

      if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
        this.errors[rule.field] = rule.message;
        this.isValid = false;
      }
    });
    return this.errors;
  }
}

export default Validator;
```

### Constructor truyền vào mảng rules
```js
const requiredWith = (value, field, state) => state[field] && value;
const rules = [
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name field is required.',
      },
      {
        field: 'name',
        method: 'isLength',
        args: [{min: 5}],
        validWhen: true,
        message: 'The name must be at least 5 characters.',
      },
      {
        field: 'message',
        method: requiredWith,
        args: ['subject'],
        validWhen: true,
        message: 'The message field is required when subject is present.',
      },
    ];
 ```
Mỗi rule sẽ bao gồm:
- **field** : key của field trong state
- **method**: method dùng để validate, nếu method là string sẽ lấy các methods trong package [validator](https://www.npmjs.com/package/validator). Ngoài ra có thể tự viết method như ở trên mình viết có viết`requiredMethod` có các tham số truyền vào là  value, các tham số khác, sau đó là state. `requiredMethod` sẽ check xem nếu field truyền vào và value có giá trị sẽ trả về true.
- **args**: các tham số sẽ truyền vào.
- **validWhen**: `true` hay `false` thì sẽ valid
- **message**: message khi có lỗi

### Initiate function
Khởi tạo các giá trị của validator

### Validate function
Duyệt lần lượt các rules và chạy method của nó, nếu có lỗi sẽ add vào errors object một property với key là key của field, value là message báo lỗi. VD: 
```json
{
    name: 'The name field is required.',
    email: 'The email must be a valid email address.'
}
```

## App.js

Import validator
```js
import Validator from './utils/validator';
```

Thêm state errors:
```js
    this.state = {
      errors: {},
    };
```

Khởi tạo validator trong constructor:
```js
    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
    const rules = [
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name field is required.',
      },
      {
        field: 'name',
        method: 'isLength',
        args: [{min: 5}],
        validWhen: true,
        message: 'The name must be at least 5 characters.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'The email field is required.',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'The email must be a valid email address.',
      },
      {
        field: 'address',
        method: 'isEmpty',
        validWhen: false,
        message: 'The address field is required.',
      },
      {
        field: 'message',
        method: requiredWith,
        args: ['subject'],
        validWhen: true,
        message: 'The message field is required when subject is present.',
      },
    ];
    this.validator = new Validator(rules);
```

Thêm code validate trong method `handleSubmit`:
```js
  handleSubmit = (e) => {
    this.setState({
      errors: this.validator.validate(this.state),
    });
  };
```

Hiển thị lỗi trong method `render`:

```jsx
{errors.name && <div className="validation" style={{display: 'block'}}>{errors.name}</div>}
```

File `App.js` đầy đủ sẽ như sau:

```jsx
import React, { Component } from 'react';
import Validator from './utils/validator';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      subject: '',
      message: '',
      errors: {},
    };
    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
    const rules = [
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name field is required.',
      },
      {
        field: 'name',
        method: 'isLength',
        args: [{min: 5}],
        validWhen: true,
        message: 'The name must be at least 5 characters.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'The email field is required.',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'The email must be a valid email address.',
      },
      {
        field: 'address',
        method: 'isEmpty',
        validWhen: false,
        message: 'The address field is required.',
      },
      {
        field: 'message',
        method: requiredWith,
        args: ['subject'],
        validWhen: true,
        message: 'The message field is required when subject is present.',
      },
    ];
    this.validator = new Validator(rules);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
      errors: this.validator.validate(this.state),
    });
    console.log(this.state);
  };

  render() {
    const {errors} = this.state;
    return (
      <div className="App">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
        <h1>Elegant Contact Form.</h1>
        <form>
          <h1>Should you have any questions, please do not hesitate to contact me :</h1>
          <div className="contentform">
            <div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
            <div className="leftcontact">
              <div className="form-group">
                <p>Name <span>*</span></p>
                <span className="icon-case"><i className="fa fa-user"></i></span>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInput}/>
                {errors.name && <div className="validation" style={{display: 'block'}}>{errors.name}</div>}
              </div>
              <div className="form-group">
                <p>E-mail <span>*</span></p>
                <span className="icon-case"><i className="fa fa-envelope-o"></i></span>
                <input type="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>}
              </div>
              <div className="form-group">
                <p>Address <span>*</span></p>
                <span className="icon-case"><i className="fa fa-location-arrow"></i></span>
                <input type="text" name="address" value={this.state.address} onChange={this.handleInput}/>
                {errors.address && <div className="validation" style={{display: 'block'}}>{errors.address}</div>}
              </div>
            </div>

            <div className="rightcontact">
              <div className="form-group">
                <p>Subject</p>
                <span className="icon-case"><i className="fa fa-comment-o"></i></span>
                <input type="text" name="subject" value={this.state.subject} onChange={this.handleInput}/>
                {errors.subject && <div className="validation" style={{display: 'block'}}>{errors.subject}</div>}
              </div>
              <div className="form-group">
                <p>Message</p>
                <span className="icon-case"><i className="fa fa-comments-o"></i></span>
                <textarea name="message" value={this.state.message} onChange={this.handleInput}/>
                {errors.message && <div className="validation" style={{display: 'block'}}>{errors.message}</div>}
              </div>
            </div>
          </div>
          <button type="button" className="bouton-contact" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
```

# Kết quả
![](https://images.viblo.asia/f9ff9036-0778-4cb9-9083-617ef2fa87de.gif)

# Source code
 [https://github.com/thinhhung/react-form-validation-sample](https://github.com/thinhhung/react-form-validation-sample)