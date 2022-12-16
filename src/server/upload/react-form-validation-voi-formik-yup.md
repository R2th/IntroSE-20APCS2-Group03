Tạo form validation là một công việc khá mệt moi nhưng lại rất quan trọng. Việc xây dụng và xác thực form tho cách thông thường của React có thể gây cho ta sự khó chịu khi cần tạo quy trình thiết lập trạng thái để gửi biểu mẫu. Formik giúp chúng ta có thể tạo một form theo các đơn giản hơn. Kết hợp với Yup, chúng giúp chúng ta xây dựng quá trình xác thực dễ dàng hơn.

## Bài viết bao gồm
- Setting form fields và init giá trị với Formik
- Handling user inputs
- Create validation với Yup
- Xử lý form submisstion

Trong bài viết này, mình sẽ xây dựng một form đăng ký đơn giản và xử lý form validation. Nó bao gồm full name, email, password và password confirmation fields.

## Setting form fields và init giá trị với Formik
Dưới đây là ví dụ và form signup

```
import React from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Validation with Formik + Yup</h1>

      <form>
        <div>
          <label>Full Name</label>
          <input type="text" name="full_name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirm_password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
```

Như bạn đã thấy, không có state nào được khai báo để lưu trữ giá trị của các trường. Ta sẽ không sử dụng useState hook cho điều đó. Thay vào đó, ta sẽ sử dụng Formik để lưu trữ chúng.

Hãy bắt đầu bằng việc cài đặt Formik

```
npm install formik --save
// or
yarn add formik
```

Formik cung cấo một hook tuỳ chỉnh trả về tất cả state và helper cần thiết, nó được gọi là useFormik. Nó chấp nhận một object xác định configuration của form.

```
import React from "react";

import { useFormik } from "formik";

export default function App() {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  });
  
  return (
    <div className="App">
      <h1>Validation with Formik + Yup</h1>

      <form>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formik.values.full_name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
```

Ta truyền `initialValue` cho biểu mẫu vào useFormik. Tên thuôc tính đươc khai báo trong initialValue trùng với tên của `<input />`. Các state được trả về và helpers giờ có thể được truy cập từ biến formik. Nhờ đó, chúng ta có thể lất các giá trị của field và put chúng vào input component của ta:` value={formik.values.full_name}`. Không cần React `useState`.


## Handling user inputs

Bước tiếp theo sẽ là bắt giá trị đầu vào của user và lưu trữ nó trong Formik state. Formik cung cấp cho chúng ta một loạt các helper functions, một trong số đó là `handleChange`. Function này chấp nhận đối tượng `event` ( được trả về từ onChange ) và sử dụng tên trường để lưu trữ giá trị trong Formik state thích hợp.

```
<input
  type="text"
  name="full_name"
  value={formik.values.full_name}
  onChange={formik.handleChange} 
/>
```

Không cần truyền lên field name cho `handleChange` vì nó sẽ get field name = event.target.name

##  Create validation với Yup
Setting biểu mẫu và xử lý đầu vào của chúng rất dễ dàng, nhưng validate các giá trị đó thì không. Chúng ta phải tạo trình kiểm tra các giá trị để xác thực tất cả các trường. Nhưng nhờ có Yup, chúng ta có thể tạo quy trình validation dễ dàng hơn.

Yup là gì? Trích dẫn từ document page Yup: 
> “Yup is a JavaScript schema builder for value parsing and validation”

Tạm dịch là: "Yup là một Javascript schema cho việc phân tích giá trị và xác thực". Chúng ta có thể sử dụng Yup để tạo một validation schema và áp dụng nó với `useFormik`. Formik có một tuỳ chọn cho Yup được gọi là `validationSchema`.

Đầu tiên, hãy cài đặt Yup:

```
npm install yup --save
// or
yarn add yup
```

Sau đó, ta có thể import Yup trên trang signup ở trên và tạo validation schema cho biểu mẫu của chúng ta:

```
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function App() {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    })
  });

  return (
    <div className="App">
      <h1>Validation with Formik + Yup</h1>

      <form>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
          />
          {formik.errors.full_name && formik.touched.full_name && (
            <p>{formik.errors.full_name}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <p>{formik.errors.confirm_password}</p>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
```

Có 2 điều mình đã làm ở trên, đó là tạo lược đồ xác thực bằng Yup và hiện thị các error message.

### Create the validation schema with Yup
Như bạn đã thấy ở trên, lược đồ của chúng ta khá đơn giản. Ta chỉ cầu xâu chuỗi các function xác thực để tạo thành một tập hợp lược đồ xác thực. Ví dụ: ta muốn giá trị `full_name` không được để trống, là một string, có tối thiểu 2 ký tự và có tối đa 15 ký tự. Sau đó, với Yup, chúng ta có thể sử dụng các function `required`, `string`, `min` và `max`. Error message có thể được truyền cho từng function.

Xác thực phức tạp hơn một chút mà chúng ta thường gặp là xác thực email và xác thực mật khẩu. May thay, Yup cũng cung cấp cho ta các function để xác thực email và giá trị tương đương. Còn rất nhiều function hay ho mà Yup cung cấp nữa, bạn có thể tìm hiểu nó trong [document page của Yup](https://github.com/jquense/yup)

### Show the error messages
useFormik hook trả về `errors` và `touched` state được sử dụng để hiển thị thông báo lỗi. 

- `errors`: 1 đối tượng của form’s validation error.
- `touched`: 1 đối tượng với kiểu dữ liệu là boolean cho biết field đã được truy cập hay chưa.

Formik valdation function chạy trên mỗi tổ hợp phím đầu vào của user. Điều đó có nghĩa là `errors` object sẽ chứa tất cả các lỗi xác thực ở bất kỳ thời điểm nào. Vì vậy, chúng ta có thể hiện thị một thông báo lỗi như dưới đây:

```
{formik.errors.full_name && <p>{formik.errors.full_name}</p>}
```

Đoạn code trên sẽ hiển thị thông báo lỗi ngay khi họ nhập nội dung vào một field. Thông thường thì ta muốn error mess được hiện thị sau khi người dùng đã nhập xong. Đó là lý do vì sao chúng ta lại cần `touched` state:

```
{formik.errors.full_name && formik.touched.full_name && (
  <p>{formik.errors.full_name}</p>
)}
```

Bằng các checking `touched` state, giờ đây ta có thể show error message sau khi user nhập xong field.

## Handling form submission

Để xử lý form submission, ta cần truyền option `onSubmit` vào `useFormik` hook. Chúng ta có thể truy cập các giá trị đã được submit trong function `onSubmit` . Bạn có thể làm bất cứ gì mình muốn với các giá trị, chẳng hạn như sử dụng nó làm payload tới API.

```
const formik = useFormik({
  initialValues: {
    ...
  },
  validationSchema: Yup.object({
    ...
  }),
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2));  
  }
});
```

Một helper function khác mà Formik cung cấp là handleSubmit. Nó sẽ thực thi chức năng `onSubmit` nếu không có lỗi validation. Chúng ta có thể put function `handleSubmit` trong `<form />`.

```
<form onSubmit={formik.handleSubmit}>
```

Dưới đây là đoạn code hoàn chỉnh của form SignUp và validation của nó với Formik + Yup.

```
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function App() {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="App">
      <h1>Validation with Formik + Yup</h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
          />
          {formik.errors.full_name && formik.touched.full_name && (
            <p>{formik.errors.full_name}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <p>{formik.errors.confirm_password}</p>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
```

link code sandbox: https://codesandbox.io/s/react-formik-yup-y37yq?from-embed

## Lời kết
Trên đây là một ví dụ nhỏ về việc validation form sử dụng Formik và Yup. Hi vọng bài viết này sẽ giúp đỡ các bạn phần nào trong quá trình nâng cao skill React của bản thân. Cảm ơn vì đã ghé thăm.

Tham khảo: https://medium.com/javascript-in-plain-english/react-form-validation-with-formik-yup-ee6395b355f