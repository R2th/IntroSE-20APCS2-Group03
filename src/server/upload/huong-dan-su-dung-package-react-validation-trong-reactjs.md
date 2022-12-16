### Validation Form là gì?
Form Validation thường được sử dụng trên Server, sau khi Client đã nhập tất cả dữ liệu cần thiết và sau đó nhấn nút Submit. Nếu dữ liệu nhập bởi một Client là không chính xác hoặc bị lỗi, Server sẽ phải gửi tất cả dữ liệu trở lại Client và yêu cầu rằng Form đó phải được đệ trình lại với thông tin chính xác. Đây thực sự là một tiến trình kéo dài mà đặt nhiều gánh nặng lên trên Server.
![](https://images.viblo.asia/945d006e-1fa6-4945-b191-19827ee21fb7.png)
<br />
>Validation Form là một mảnh ghép cực kỳ quan trọng trong lập trình nói chung
### Reactjs Validation Form
Với **Reactjs** việc validate dữ liệu cũng khá là đơn giản, nhanh chóng và vô cùng hiệu quả. Dưới đây mình sẽ hướng dẫn các bạn tạo một form login với validation form reactjs.
<br />
**Cài đặt:**
<br />
-Tạo **react-app:**  
```
    npx create-react-app login-validation
    cd my-app
    npm start
```
Sau khi đã tạo thành công một **react-app**. Tiếp tục cài các package cần thiết:
```
    npm install react-validation
    npm install validator
```
Done! chỉ cần vài package như vậy thôi là có thể bắt đầu đi tạo Form-Validation được rồi (clap).
- Import thư viện react-validation:
```javascript
    import Form from 'react-validation/build/form';
    import Input from 'react-validation/build/input';
    import CheckButton from 'react-validation/build/button';
    import { isEmail, isEmpty } from 'validator';
```
- Tạo Form-Validation sử dụng thư viện đã import: 
```javascript
     <div className="container">
        <div className="login-container">
            <div id="output"></div>
            <div className="avatar"></div>
            <div className="form-box">
                <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                    <Input 
                        name="email" 
                        onChange={this.onChangeHandler}
                        type="text" 
                        placeholder="Email"
                        className="form-control" 
                        validations={[required, email]}
                    />
                    <Input 
                        name="password" 
                        onChange={this.onChangeHandler}
                        type="password" 
                        placeholder="Password"
                        className="form-control" 
                        validations={[required, minLength]}
                    />
                    <button className="btn btn-info btn-block login" type="submit">Login</button>
                    <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                </Form>
            </div>
        </div>
    </div>
```
-Khai báo thêm các lỗi có thể mắc phải, đơn giản như require, Invalid fomat,...
```javascript
    const required = (value) => {
      if (isEmpty(value)) {
          return <small className="form-text text-danger">This field is required</small>;
      }
    }

    const email = (value) => {
      if (!isEmail(value)) {
          return <small className="form-text text-danger">Invalid email format</small>;
      }
    }

    const minLength = (value) => {
      if (value.trim().length < 6) {
          return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
      }
    }
```
Ở đây bạn có thể chỉnh css để highlight lỗi hơn.
Và đừng quên gọi function submit nữa nhé =))
```javascript
      onSubmit(e){
        e.preventDefault();
        this.form.validateAll();

        if ( this.checkBtn.context._errors.length === 0 ) {
          alert('success')
        }
    }
```
Vậy là chúng ta đã xây dựng xong một Form-Validation đơn giản với ReactJS
- **Tổng kết:**
```javascript
    import React, { Component } from 'react';
    import Form from 'react-validation/build/form';
    import Input from 'react-validation/build/input';
    import CheckButton from 'react-validation/build/button';
    import { isEmail, isEmpty } from 'validator';

    const required = (value) => {
      if (isEmpty(value)) {
          return <small className="form-text text-danger">This field is required</small>;
      }
    }

    const email = (value) => {
      if (!isEmail(value)) {
          return <small className="form-text text-danger">Invalid email format</small>;
      }
    }

    const minLength = (value) => {
      if (value.trim().length < 6) {
          return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
      }
    }

    class Login extends Component {

        constructor(props){
            super(props);
            this.state = {
                email : '',
                password: '',
            };
        }

        onSubmit(e){
            e.preventDefault();
            this.form.validateAll();

            if ( this.checkBtn.context._errors.length === 0 ) {
               alert('success');
            }
        }

        render() {
            return (
                <div className="container">
                    <div className="login-container">
                        <div id="output"></div>
                        <div className="avatar"></div>
                        <div className="form-box">
                            <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                                <Input 
                                    name="email" 
                                    onChange={this.onChangeHandler}
                                    type="text" 
                                    placeholder="Email"
                                    className="form-control" 
                                    validations={[required, email]}
                                />
                                <Input 
                                    name="password" 
                                    onChange={this.onChangeHandler}
                                    type="password" 
                                    placeholder="Password"
                                    className="form-control" 
                                    validations={[required, minLength]}
                                />
                                <button className="btn btn-info btn-block login" type="submit">Login</button>
                                <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default Login;

```

### Lời kết
Validation Form thực sự quan trọng, khi bạn phải gửi dữ liệu lên server hãy nghĩ ngay đến validation và dùng nó ngay nhé. Đây chỉ là chia sẻ về cách mình validation form khi mình dùng Reactjs. Mong được ý kiến đóng góp của mọi người để phát triển kinh nghiệm về reactjs.

   **Tham Khảo:**
    
   - Github: https://github.com/vanquynguyen/login-validation
   - Trang chủ reactJs: https://reactjs.org/
   - React-Validation: https://www.npmjs.com/package/validation