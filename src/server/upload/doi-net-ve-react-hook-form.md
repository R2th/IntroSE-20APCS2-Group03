Form là một phần thiết yếu trong cách người dùng tương tác với các trang web và ứng dụng web. Việc xác thực dữ liệu của người dùng được chuyển vào form là việc rất quan trọng đối với developer

React-hook-form là một thư viện giúp bạn xác thực các form trong React ,là một thư viện tối thiểu không có bất kỳ phụ thuộc nào khác. Nó rât tiện và dễ sử dụng, yêu cầu các developer code ít hơn các thư viện   khác.

Trong bài hướng dẫn này, chúng ta sẽ học cách sử dụng thư viện React Hook Form để xây dựng các loại form vời trong React mà không cần sử dụng bất kỳ thành phần render prop phức tạp hay higher-order components nào.

# React Hook Form
React Hook Form có cách tiếp cận hơi khác so với các thư viện khác trong hệ sinh thái React. React Hook Form thông qua việc sử dụng  `uncontrolled component` gán vào input bằng cách sử dụng `ref` thay vì phụ thuộc vào `state` để kiểm soát input của bạn. Cách tiếp cận này làm cho  trang web của bạn hoạt động hiệu quả hơn và giảm số lần `re-render`.

Kích thước của `package` rất nhỏ  chỉ 9.1KB . API rất trực quan và cung cấp rất đầy đủ cho các developer khi làm việc. React Hook Form tuân theo các tiêu chuẩn HTML để xác thực các form bằng cách sử dụng API xác thực dựa trên ràng buộc.

Một tính năng tuyệt vời khác được cung cấp bởi React Hook Form là tích hợp dễ dàng với các thư viện UI, vì hầu hết các thư viện đều hỗ trợ ref.

Để cài đặt React Hook Form, hãy chạy lệnh sau:

```
npm install react-hook-form
```

# Register Form

Trong phần này, chúng ta sẽ tìm hiểu về các nguyên tắc cơ bản của useForm Hook bằng cách tạo một form đăng ký rất cơ bản.

Đầu tiên import `useForm` từ `react-hook-form`

```js
import { useForm } from "react-hook-form";
```
Sau đó , Bên trong component chúng ta sữ dụng hook này nư sau

```js
const { register, handleSubmit } = useForm();
```

`useForm` sẽ trả về về một object chứa rất nhiều thuộc tính bên trong. Bây giờ chúng ta chỉ sử dụng `register` và `handleSubmit`

Phương thức `register` giúp chúng ta đang kí một cái input field bên trong react-hook-form vì vậy nó sẽ có các thành phần cơ bản của một thẻ input để có thể theo dỏi được sự thay đổi của nó như (name,value,onChange ...)

```js
<input type="text" ref={register} name="firstName" />

```
 Chú ý rằng trong một form chỉ được đăng ký bởi một tên duy nhất . Như ở trên `firstName` chỉ được đăng ký 1 lần

 Phương thức handle submit dùng để sử lý sự kiện submit form của bạn . Ở đây `handleSubmit` sẽ nhận đàu vào là 2 function, ở thám số đầu tiên funtion sẽ được gọi nếu dữ liệu của bạn validate thành công, còn ngược lại ở tham số thứ 2 function này sẽ được gọi nếu submit gặp lỗi.

 ```js
const onFormSubmit  = data => console.log(data);

const onErrors = errors => console.error(errors);

<form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
{/*  các input  */}
</form>
 ```
 Bây giợ bạn đã có thể mương tượng ra được cách hoạt động của nó .Sau đây sẽ là một ví dụ thực tế

 ```js
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const handleRegistration = (data) => console.log(data);
  return (
    <Form onSubmit={handleSubmit(handleRegistration)}>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" innerRef={register} />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" name="email" innerRef={register} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" name="password" innerRef={register} />
      </FormGroup>
      <Button color="primary">Submit</Button>
    </Form>
  );
};
export default RegisterForm;
 ```


Như bạn có thể thấy, không có thành phần nào khác được gán vào thẻ input của bạn để theo dõi sự thay đổi . UseForm Hook làm cho code clean hơn  và dễ bảo trì hơn. Và vì form là `uncontrolled component` nên bạn không cần chuyển các props như onChange và value cho mỗi input.

Trong ví dụ trên, thư viện reactstrap được sử dụng để xây dựng giao diện người dùng . Bạn có thể nhận thấy ở đây rằng các phương thức trong `register` được đưa vào `innerRef` thay vì ref; điều này là do các thành phần do `reactstrap` cung cấp cho phép truy cập vào  DOM gốc bằng cách sử dụng hỗ trợ `innerRef`.

Bạn cũng có thẻ sử dụng các thự việc khác miễn nó cung cấp phường thức để truy cập vào input DOM của nó.


# Validate Form 
Để áp dụng validate cho một field nào đó, bạn có thể chuyển các tùy chọn  cho phương thức `register`.

```js
<Input
  name="name"
  innerRef={register({ 
      required: true ,
      minlength:5,
      maxlength:10,
      type:"text",

  )}
/>
```
Bạn cũng có thể chuyển một thông báo lỗi  bằng cách chuyển một string thay vì  boolean .

```js
const { register, handleSubmit, errors } = useForm();
  const handleRegistration = (data) => console.log(data);
  const handleError = (errors) => {};
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

return (
  <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
  <FormGroup>
      <Label>Name</Label>
      <Input name="name" innerRef={register({ required: "Name is required" })} />
      <small className="text-danger">
        {errors.name && errors.name.message}
      </small>
  </FormGroup>
  <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          innerRef={register(registerOptions.email)}
        />
        <small className="text-danger">
          {errors.email && errors.email.message}
        </small>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          innerRef={register(registerOptions.password)}
        />
        <small className="text-danger">
          {errors.password && errors.password.message}
        </small>
      </FormGroup>
      <Button color="primary">Submit</Button>
</Form>
)
```

Ngoài ra bạn cũng có thể kêt hợp YupJs để có thể tuỳ biến hơn

```js
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const RegisterForm = Yup.object().shape({
  name :Yup.string().required("Name is required"),
  email :Yup.string().required("Email is required"),
  password :Yup.string().required("Password is required").min(8,"Password must have at least 8 characters"),

})

const {
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(RegisterForm),
  })
```

Ở đây `react-hook-form` cung cấp cho bạn một số mode cho bạn nhiều cách thưc validate hơn
```js
const { register, handleSubmit, errors } = useForm({
  mode: "onSubmit" // default 
  // Ngoài ra còn có: 
  // onChange: validate sau khi input onChange
  // onBlur: validate sau khi outFocus input
});
```

# Kết Luận
React Hook Form là một bổ sung tuyệt vời cho hệ sinh thái mã nguồn mở cho  React. Nó đã làm cho việc tạo và bão trì các các form  dễ dàng hơn nhiều cho các developer. Phần hay nhất về thư viện này là nó tập trung nhiều hơn vào trải nghiệm của developer và rất linh hoạt để làm việc. React Hook Form cũng tích hợp tốt với các thư viện thứ 3 và hoạt động xuất sắc trong React Native.

### Nguồn tham khảo 
- https://react-hook-form.com
- https://blog.bitsrc.io/react-hook-form-an-elegant-solution-to-forms-in-react-4db64505b0cd