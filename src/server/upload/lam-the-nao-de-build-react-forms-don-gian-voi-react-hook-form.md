React-hook-form là một thư viện form tiện ích, dễ sử dụng và giúp validation form đơn giản hơn. 

Hãy cùng tìm hiểu cách sử dụng react-hook-form trong project như thế nào nhé.

## Cài đặt

Với npm:
```
npm i react-hook-form
```

Nếu dùng yarn:

```
yarn add react-hook-form
```

Sau khi cài đặt xong, ta tạo một form đăng ký user với username, email, password để thực hành luôn nhé :D

```
import React from "react";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
};

export default function Signup() {
  return (
    <div style={styles.container}>
      <h4>Sign up</h4>
      <form>
        <input placeholder="Username" style={styles.input} />
        <input placeholder="Email" style={styles.input} />
        <input placeholder="Password" style={styles.input} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## Làm thế nào để dùng useForm hook?

Để bắt đầu với react-hook-form chúng ta gọi useForm. Chúng ta sẽ sử dụng  `register` để lấy một đối tượng. register là một function, cần liên kết với mỗi input bằng `ref`.

```
function App() {
  const { register } = useForm();

  return (
    <div style={styles.container}>
      <h4>Signup</h4>
      <form>
        <input ref={register} placeholder="Username" style={styles.input} />
        <input ref={register} placeholder="Email" style={styles.input} />
        <input ref={register} placeholder="Password" style={styles.input} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

Hàm register sẽ lấy value mà user đã nhập vào ô input để validate nó. Register sẽ gởi các value này cho một function khi submit form.

Để register hoạt động bình thường, với mỗi input cần cung cấp một thuộc tính name thích hợp, ví dụ ở đây, với input nhập email ta đặt name="email".

Lý do cho việc thêm thuộc tính name à mỗi khi form được submitted, chúng ta sẽ nhận được tất cả các value của input trên một đối tượng duy nhất, mỗi thuộc tính khi gởi về cho phía server, sẽ được đặt tên theo name này.

```
function App() {
  const { register } = useForm();

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form>
        <input
          name="username"
          ref={register}
          placeholder="Username"
          style={styles.input}
        />
        <input
          name="email"
          ref={register}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="password"
          ref={register}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## Làm thế nào để submit form với handleSubmit?

Để xử lý việc submit form và nhận input data, bình thường chúng ta sử dụng `onSubmit` của form và call tới function xử lý khi submit.

```
function App() {
  const { register } = useForm();

  function handleSubmitSignUp() {}

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmitSignUp}>
        <input
          name="username"
          ref={register}
          placeholder="Username"
          style={styles.input}
        />
        <input
          name="email"
          ref={register}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="password"
          ref={register}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

=> Với useForm, bạn call function `handleSubmit` và gọi `handleSubmitSignUp` lồng bên trong như sau:

```
function App() {
  const { register, handleSubmit } = useForm();

  function handleSubmitSignUp(data) {
    console.log(data); 
    // { username: 'test', email: 'test', password: 'test' }
  }

  return (
    <div style={styles.container}>
      <h4>Signup</h4>
      <form onSubmit={handleSubmit(handleSubmitSignUp)}>
        <input
          name="username"
          ref={register}
          placeholder="Username"
          style={styles.input}
        />
        <input
          name="email"
          ref={register}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="password"
          ref={register}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

`handleSubmit` sẽ lấy tất cả các data input và chúng ta sẽ nhận được trong `handleSubmitSignUp` với object `data`.

Bạn dễ dàng kiểm tra được data khi `console.log(data)` ở `handleSubmitSignUp`.

## Validation data input với register
Để validate form và thêm các điều kiện cho mỗi value input rất đơn giản, chúng ta chỉ cần truyền điều kiện trong hàm `register`.

`register` nhận object, với các thuộc tính là điều kiện đối với input. Ví dụ ta muốn trường username bắt buộc nhập, nhiều hơn 6 ký tự và ít hơn 24 ký tự:

```
<input
  name="username"
  ref={register({
    required: true,
    minLength: 6,
    maxLength: 20,
    pattern: /^[A-Za-z]+$/i,
  })}
  style={styles.input}
  placeholder="Username"
/>
```

Thuộc tính `required: true` tức là bắt buộc phải nhập data vào input, và `minLength: 6` tức nhiều hơn 6 ký tự,  `maxLength: 20` tức ít hơn 20 ký tự, trường hợp muốn áp dụng regex, ta sử dụng pattern, ở ví dụ này chỉ cho phép nhập chữ cái thường hoặc chữ in hoa.

## Hiển thị errors và validation mode

Trường hợp nhập các giá trị không đúng với điều kiện thì ta sẽ lấy được object `errors` từ useForm.

```
function App() {
  const { register, handleSubmit, errors } = useForm({
      mode: "onBlur",
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          style={{ ...styles.input, borderColor: errors.username && "red" }}
          placeholder="Username"
        />
        <input
          name="email"
          ref={register({
            required: true,
            validate: (input) => isEmail(input),
          })}
          style={{ ...styles.input, borderColor: errors.email && "red" }}
          placeholder="Email"
        />
        <input
          name="password"
          ref={register({
            required: true,
            minLength: 6,
          })}
          style={{ ...styles.input, borderColor: errors.password && "red" }}
          placeholder="Password"
        />
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
```

Mặc định, errors sẽ được update sau khi submit form, nhưng ta có thể update errors với nhiều mode khác nhau:

`mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'`

`onSubmit` (Default): Validation sẽ trigger event submit.

`onBlur`: Validation sẽ trigger event blur.

`onChange`: Validation sẽ trigger event change trên mỗi input và update errors nhiều lần khi có sự thay đổi value, việc này cũng ảnh hưởng đáng kể đến performance.

`onTouched`: Validation sẽ trigger event blur đầu tiên , rồi sau đó nó sẽ trigger với mọi event change.

Để set hoặc clear errors, ta sử dụng setError và clearError.

## Áp dụng đối với form sử dụng component bên ngoài

Một số form sử dụng component bên ngoài như React-Select, AntD và Material-UI thì sử dụng Controller bọc ngoài sẽ giúp ta dễ làm việc hơn. Cấu trúc như sau:


|     Name     |    Type    | Required | Description |
| --------------- | ------------ | ------------- | ---------------- |
| name         | string      |          ✓     | Unique name input
| control      | Object     |                  | control object thiết lập khi sử dụng useForm. Optional khi sử dụng FormProvider.
| rules          | Object     |                  | Validation rules tương tự như format của register: `rules={{ required: true }}`
| render      | Function  |                  |Đây là một render prop. Function này trả về React element và cung cấp các event và value vào component. Cung cấp onChange, onBlur, name, ref và value đến child component

```
import React from "react";
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

function App() {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <Controller
        control={control}
        name="TextField"
        render={({ onChange, onBlur, value }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
      
      <input type="submit" />
    </form>
  );
}
```


Trên đây là bài viết về việc tạo form và validate với react-hook-form, hy vọng bài viết sẽ giúp ích cho mọi người khi làm việc với form trong React. Bài viết được tham khảo từ bài [How to Build React Forms the Easy Way with react-hook-form](https://www.freecodecamp.org/news/how-to-build-react-forms/) của tác giả Reed Barger. Các bạn cũng có thể tìm hiểu kỹ ở trang chủ [https://react-hook-form.com](https://react-hook-form.com/api)