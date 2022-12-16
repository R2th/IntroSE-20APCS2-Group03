Trong lúc làm dự án, chắc hẳn các bạn cũng nhiều lần bối rối trong việc xử lý các `form` như thế nào, quản lý nó ra sao cho hợp lí. Theo thông thường bạn phải quản lý từng `state` của từng field input điều đó rất tốn thời gian và dễ bị nhầm lẫn phải không còn chưa tính đến việc `validate` cho nó nữa chứ. 

Hiện nay đã có rất nhiều library hỗ trợ việc quản lý `form` rất thuận tiện và dễ dàng nổi bật nhất là Formik, Redux Form, .... Ở bài viết này mình xin giới thiệu `react-hook-form` cũng mạnh mẽ không kém trong quá trình xử lý những `form` phức tạp.

React Hook Form còn được mô tả như sau: "Performant, flexible and extensible forms with easy-to-use validation".

## Getting Started
Trước tiên chúng ta cần tạo một form đơn giản trong `react` đã nào.

```js
<form className="box">
    <h1>login</h1>
    <div className="input-field">
        <input type="text" name="username" id="username" placeholder="Email" autoComplete="off" />
    </div>
    <div className="input-field">
        <input type="password" name="pass" id="pass" placeholder="Password" autoComplete="off" />
    </div>
    <button type="submit" id="submit">LOGIN</button>
</form>
```

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #2a3132; 
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #191919;
  border: none;
  border-radius: 25px;
  text-align: center;
}
h1{
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 5px;
}
/************** 
 Input Fields
***************/
#username, #pass{
  border: 2px solid #0097e6;
  background: none;
  display: block;
  margin: 20px 0;
  padding: 15px 45px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 25px;
  text-align: center;
  transition: 250ms width ease, 250ms border-color ease;
}
/************** 
   On Hover
***************/
#username:hover, #pass:hover{
  width: 220px;
}
/************** 
   On Focus
***************/
#username:focus, #pass:focus{
  width: 250px;
  border-color: #6fb98f;
}
/************** 
 Submit Button
***************/
#submit{
  border: 2px solid #2ecc71;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  padding: 15px 40px;
  outline: none;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 200;
  transition: 250ms background ease;
  -webkit-transition: 250ms background ease;
  -moz-transition: 250ms background ease;
  -o-transition: 250ms background ease;
}
/************** 
   On Hover
***************/
#submit:hover{
  background: #2ecc71;
}

.input-field {
  position: relative;
}

.error {
  width: 100%;
  margin: 0;
  padding: 0 15px;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  color: red;
}
```

Sau khi style một tí cho nó thì chúng ta sẽ được thế này đây.
![](https://images.viblo.asia/dc08a3f0-443d-4b72-a655-f56457743037.png)

## Using React Hook Form
Để sử dụng được nó bạn cần phải install nó trước đã:

`yarn add react-hook-form`
hoặc
`npm i react-hook-form`

Sau đó bạn chỉ cần gọi nó vào mà sử dụng thôi.

`import { useForm } from 'react-hook-form';`

Khi đã import nó vào component. Ở đây `useForm` sẽ cung cấp cho t 3 biến, `register`, `handleSubmit` và `errors`.

* `register`: dùng để theo dõi field trong form.
* `handleSubmit`: dùng để bắt sự kiện khi người dùng submit form và lấy được dữ liệu của tất cả field trong form đó.
* `errors`: dùng để show message khi bị sai validate.

Ở mỗi input chúng ta chỉ cần thêm gán `register` vào `ref` của nó là được nhưng đừng quên đặt `name` cho từng input nhé vì nó chính là thứ dùng để định nghĩa từng input ở trong form đấy.

```js
<input type="text" name="username" id="username" placeholder="Email" autoComplete="off" ref={register} />
```

Tiếp theo chúng ta sẽ bắt sự kiện khi người dùng submit và console ra data của nó thử nhé.

```js
const onSubmit = (data) => {
    // Bạn có thể gọi API để cập nhật dữ liệu ở ngay đây
    console.log(data);
};
```

```js
<form onSubmit={handleSubmit(onSubmit)} className="box">
```

Giờ chúng ta hãy thử điền thông tin vào form và submit thử nhé.
![](https://images.viblo.asia/4ddacd3e-03aa-4e61-adf5-acd16d328510.png)

## Validation
Bạn vẫn có thể sử dụng `validate` bình thường bằng cách truyền thẳng vào trong `register` như này

```js
ref={register({ required: true })}
```

Nhưng nếu làm thế này thì rất dài dòng bạn thử tưởng tượng nếu có cỡ chục cái input field thì nhìn rất là rối mắt phải không.

Để giải quyết việc đó mình sẽ chỉ bạn cách kết hợp `react-hook-form` với yup để `validate` một cách thuận tiện và dễ quản lý hơn.

Trước tiên bạn cần phải install package này đã `yarn add @hookform/resolvers` hoặc `npm i @hookform/resolvers`.

Và đừng quên Yup nữa nhé  `yarn add yup`

Sau đó ta sẽ tạo 1 file yupGlobal để sau này dễ dàng trong việc thêm 1 vài `validate` khác nếu cần nhé.

`yupGlobal.js`

```js
import * as yup from 'yup'

const REGEX_PASSWORD= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/
const REGEX_ONLY_NUMBER= /^\d+$/

yup.addMethod(yup.string, 'password', function (
  message,
) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'onlyNumber', function (
  message,
) {
  return this.matches(REGEX_ONLY_NUMBER, {
    message,
    excludeEmptyString: true,
  })
})

export default yup
```

Import vào mà dùng thôi nào

```js
import { yupResolver } from '@hookform/resolvers/yup';
import yup from './yupGlobal'

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Required')
    .email('Email invalid'),
  pass: yup
    .string()
    .required('Required')
    .password('Password invalid'),
})
```
```js
const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
});
```

Giờ bạn thử điền bậy bạ vào và submit thử xem. Nếu không thấy console xuất hiện có nghĩa là bạn đã sai validate rồi đấy. 

Nhưng bạn vẫn chưa biết làm thế nào để biết được nó đã đúng validate hay chưa đúng không. Chỉ cần bạn thêm đoạn này vào dưới mỗi input field thì nó sẽ show ra message error để cảnh báo là bạn đang nhập sai.

```js
// username input
{errors.username && <p className="error">{errors.username.message}</p>}

// password input
{errors.pass && <p className="error">{errors.pass.message}</p>}
```

Trên đây chỉ là một số thứ cơ bản đủ để bạn dùng mà mình muốn chia sẻ về `react-hook-form` và `yup`.

Nếu bạn muốn tìm hiểu sâu hơn về `react-hook-form` thì có thể xem ở [đây.](https://react-hook-form.com/)

Còn về yup thì [đây.](https://github.com/jquense/yup)

Cảm ơn bạn đã đọc bài viết của mình 😊😊😊. Bái bai :vulcan_salute::wave::vulcan_salute::wave: