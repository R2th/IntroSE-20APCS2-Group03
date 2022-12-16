![](https://images.viblo.asia/834327a7-a385-43bf-ab7c-06055d19c2c9.png)

# **Giới thiệu**

Làm việc với form là một trong những khó khăn nhất khi phát triển ứng dụng React. React là một thư viện UI tối giản tập trung vào việc kiểm soát hành vi giao diện, đảm bảo rằng UI thay đổi một cách phù hợp với mỗi hành vi của người dùng.

Nó không cung cấp 1 giải pháp hoàn thiện để đáp ứng các nhu cầu đầu vào của người dùng, nhưng nó cung cấp phương pháp để lưu các giá trị trên form vào local state với các component được kiểm soát.

Các form xử lí trong React yêu cầu bạn phải viết code các action để nó được hoạt động:

* Quản lí và xác nhận giá trị đầu vào của người dùng với state
* Theo dõi các lỗi không hợp lệ
* Xử lí form khi submit

Để làm cho việc xây dựng form và xứ lí chúng dễ dàng thì các nhà phát triển đã tạo ra các thư viện để xây dựng các form với React. Một trong những giải pháp tốt nhất là dùng 1 thư viện có tên là Formik

Nhưng gần đây xuất hiện thêm 1 thư viện mới có tên là React Hook form.

Trong bài viết này tôi sẽ giúp bạn thấy những lợi ích của việc sử dụng React Hook Form với Formik.

Làm thế nào để handle form với React

Đây là môt ví dụ về React form được xây dựng mà không có bất kì thư viện nào được hỗ trợ. Chúng ta sẽ sử dụng Bootstrap để form trở nên đẹp hơn 

```
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default () => {
  const [formState, setFormState] = useState({
    formValues: {
      email: "",
      password: ""
    },
    formErrors: {
      email: "",
      password: ""
    },
    formValidity: {
      email: false,
      password: false
    }
  });

  const handleChange = ({ target }) => {
    const { formValues } = formState;
    formValues[target.name] = target.value;
    setFormState({ formValues });
    handleValidation(target);
  };

  const handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = formState.formErrors;
    const validity = formState.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    setFormState({
      ...formState,
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { formValues, formValidity } = formState;
    if (Object.values(formValidity).every(Boolean)) {
      // Form is valid
      console.log(formValues);
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        handleValidation(target);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">React regular form</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  formState.formErrors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter email"
                onChange={handleChange}
                value={formState.formValues.email}
              />
              <div className="invalid-feedback">
                {formState.formErrors.email}
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  formState.formErrors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                onChange={handleChange}
                value={formState.formValues.password}
              />
              <div className="invalid-feedback">
                {formState.formErrors.password}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

```

Chúng ta sẽ được form như sau:

![](https://images.viblo.asia/96a2a9ce-fb8c-4070-a836-58be1e8b0485.png)

Ở trong ví dụ trên, trước tiên chúng ta tạo ra một function component với một state có tên là formState, chỗ để lưu các trạng thái đầu vào, tính hợp lệ của các giá trị đầu vào và lỗi. Form có 2 đầu vào là email và password, vì vậy chúng ta sẽ cần khởi tạo giá trị đầu vào cho mỗi ô input:

```
export default () => {
  const [formState, setFormState] = useState({
    formValues: {
      email: "",
      password: ""
    },
    formErrors: {
      email: "",
      password: ""
    },
    formValidity: {
      email: false,
      password: false
    }
  });
```


Tiếp theo, chúng ta viết function để render UI trong trạng thái return:

```
return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">React regular form</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  formState.formErrors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter email"
                onChange={handleChange}
                value={formState.formValues.email}
              />
              <div className="invalid-feedback">
                {formState.formErrors.email}
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  formState.formErrors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                onChange={handleChange}
                value={formState.formValues.password}
              />
              <div className="invalid-feedback">
                {formState.formErrors.password}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
```

Chúng ta sử dụng formValues để hiển thị các giá trị inputs, trong khi formErrors được dùng để chỉ ra các giá trị không hợp lệ của form,

Tiếp theo, chúng ta viết function handleChange như sau:

```
const handleChange = ({ target }) => {
  const { formValues } = formState;
  formValues[target.name] = target.value;
  setFormState({ formValues });
  handleValidation(target);
};
```

Hàm sẽ cập nhật giá trị của state và chạy hàm handleValidation để kiểm tra giá trị có hợp lệ hay không:

```
const handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = formState.formErrors;
    const validity = formState.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;
if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }
setFormState({
      ...formState,
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };
```

Hàm handleValidation là nơi mọi thứ trở nên phức tạp. Trước tiên nó kiểm tra xem giá trị input nào đã được xác thực, và sau đó tiến hành xác nhận giá trị hợp lệ.

Cuối cùng chúng ta cần function handleSubmit:

```
const handleSubmit = event => {
  event.preventDefault();
  const { formValues, formValidity } = formState;
  if (Object.values(formValidity).every(Boolean)) {
    // Form is valid
    console.log(formValues);
  } else {
    for (let key in formValues) {
      let target = {
        name: key,
        value: formValues[key]
      };
      handleValidation(target);
    }
  }
};
```

Và đó là cách bạn xây dựng một form với React. Như chúng ta đã thấy, một form chỉ có 2 giá trị đầu vào đã rất dài dòng. Bạn đã sẵn sàng để tìm hiển Formik để làm cho mọi thức trở nên đơn giản hơn chưa ? 

## **Đây là những gì Formik sẽ giúp bạn**

Formik là một giải pháp xây dựng form phổ biến vì nó cung cấp cho bạn form có thể tái sử dụng, nơi bạn chỉ cần dùng API của nó để xử lí 3 phần khó nhất ở trong form:

* Nhận các giá trị trong và ngoài của form state
* Validate input và các message lỗi
* Handle form submit

Để bắt đầu với Formik, bạn cần cài đặt nó đã `npm install formik`. Ở đây, cùng 1 dạng có 2 giá trị đầu vào, khi xây dựng bằng Formik sẽ như sau:

```
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.css";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address format";
  }
  
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Password is required";
  } else if (value.length < 3) {
    error = "Password must be 3 characters at minimum";
  }
  
  return error;
}

export default () => {
  const onSubmit = values => {
		// form is valid
		console.log(values);
	}

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Login form with Formik</h1>
        </div>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
              <Field 
                name="email"
								placeholder="Enter email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                validate={validateEmail} />
              <ErrorMessage
                component="div"
                name="email"
                className="invalid-feedback"
              />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
              <Field 
                name="password"
                type="password"
								placeholder="Enter password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                validate={validatePassword} />
              <ErrorMessage
                component="div"
                name="password"
                className="invalid-feedback"
              />
              </div>

              <button className="btn btn-primary btn-block" type="submit">Submit</button>
            </Form>
          )}
      </Formik>
    </div>
  );
};
```

Form mới này sử dụng 4 thành phần được cung cấp bởi Formik: Formik, Form, Field và ErrorMessage. Để sử dụng Formik, chúng ta cần bọc thành phần Form bên trong thành phần Formik:

```
<Formik>
  <Form>
    {/* the rest of the code here */}
  </Form>
</Formik>
```

Giống như các form thông thường, chúng ta sẽ khởi tạo giá trị của form, nhưng thay vì viết toàn bộ state cho các giá trị, viết validate và error, thì chúng ta chỉ cần sử dụng các chức năng sẵn có của Formik:

```
<Formik
  initialValues={{
    email: "",
    password: ""
  }}
  onSubmit={onSubmit}
>
```

Component Formik cũng chấp nhận các prop function chạy ở trong event submit, hãy nhìn xuống function submit, nó sẽ chỉ chạy khi giá trị nhập là hợp lệ:

```
// Put this inside your component before the return statement
const onSubmit = values => {
  // form is valid
  console.log(values);
}
```

Tiếp theo, chúng ta sẽ sử dụng Form. Đầu tiên, chúng ta sẽ sử dụng các API được truyền từ Formik vào Form. Chúng ta sẽ xử lí lỗi nếu bất kì giá trị input nào nhập sai:

```
{({errors, touched}) => (
    <Form>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <Field
          name='email'
          placeholder='Enter email'
          className={`form-control ${
            touched.email && errors.email ? 'is-invalid' : ''
          }`}
          validate={validateEmail}
        />
        <ErrorMessage
          component='div'
          name='email'
          className='invalid-feedback'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <Field
          name='password'
          type='password'
          placeholder='Enter password'
          className={`form-control ${
            touched.password && errors.password ? 'is-invalid' : ''
          }`}
          validate={validatePassword}
        />
        <ErrorMessage
          component='div'
          name='password'
          className='invalid-feedback'
        />
      </div>
    <button className='btn btn-primary btn-block' type='submit'>
        Submit
      </button>
    </Form>
  )}
```

Thành phần ErrorMessage sẽ tự động hiển thị lỗi dưới dạng phần tử div. Hãy viết chức năng để hoàn thiện form của chúng ta:

```
function validateEmail(value) {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address format";
  }
  
  return error;
}
function validatePassword(value) {
  let error;
  if (!value) {
    error = "Password is required";
  } else if (value.length < 3) {
    error = "Password must be 3 characters at minimum";
  }
  
  return error;
}
```

và bây giờ form được xây dựng bằng Formik đã hoàn thiện. Và tiếp theo tôi sẽ giới thiệu cho bạn React Hook Form, thậm chí nó còn tốt hơn cả Formik

## **Bắt đầu với React Hook Form**

Cũng như Formik, nó được xây dựng nên để các lập trình viên dễ dàng hơn trong quá trình phát triển với form ở trong React. Sự khác biệt lớn nhất giữa 2 cái là React Hook Form được thiết kế để tránh việc re-rendering gây ra do giá trị nhập vào của người dùng.

Đây là cách bạn sẽ thực hiện với một form giống với ví dụ ở Formik. Điều chú ý ở đây là những dòng code còn ít hơn so với Formik:

```
import React from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

export default () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = values => {
		// form is valid
		console.log(values);
	}

  return (
		<div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Login form with React Hook Form</h1>
        </div>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					name="email"
					placeholder="Enter email"
					className={`form-control ${
						errors.email ? "is-invalid" : ""
					}`}
					ref={register({
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "Invalid email address format"
						}
					})}
				/>
        <ErrorMessage className="invalid-feedback" name="email" as="div" errors={errors} />
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
      <input
        name="password"
				placeholder="Enter password"
					className={`form-control ${
						errors.password ? "is-invalid" : ""
					}`}
        ref={register({
					required: "Password is required",
          validate: value => value.length < 3 || "Password must be 3 characters at minimum"
        })}
      />
      <ErrorMessage className="invalid-feedback" name="password" as="div" errors={errors} />
			</div>

      <button className="btn btn-primary btn-block" type="submit">Submit</button>
    </form>
		</div>
  );
};
```

Để sử dụng React Form Hook, chúng ta cài đặt nó bằng lệnh `npm install react-hook-form`. Sau đó import nó vào:

```
import { useForm, ErrorMessage } from "react-hook-form";
```

Đầu tiên, chúng ta sẽ gọi method useForm, nó trả về 1 object với các function set để chúng ta xây dựng form:

```
export default () => {
  const { register, errors, handleSubmit } = useForm();
```

Khái niệm cốt lõi của React Hook Form là sử dụng các component không được kiểm soát vào Hook bởi prop:

```
<input
  name='email'
  placeholder='Enter email'
  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
  ref={register({
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address format',
    },
  })}
/>;
```

Function register cũng phục vụ để tạo validate cho các input hiện tại. Quy tắc validate của React Hook Form cũng rất giống với validate của html.

Sau đó chúng ta sẽ truyền errors vào ErrorMessage component, và nó sẽ hiển thị dưới dạng div:

```
<ErrorMessage className="invalid-feedback" name="email" as="div" errors={errors} />
```

Cuối cùng, chúng ta chỉ cần truyền nốt chức nằng xử lí submit vào form thông qua onSubmit:

```
export default () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = values => {
    // form is valid
    console.log(values);
  }
  return (
    <div className="container">
      {/* .. other code */}
      <form onSubmit={handleSubmit(onSubmit)}>
```

Đây là 1 so sánh ngắn gọn giữa React Hook Form và Formik:

![](https://images.viblo.asia/a4012b6b-6f4a-4993-b70e-f0b93c71123e.png)

Bài viết được tham khảo tại: https://blog.bitsrc.io/react-hook-form-vs-formik-form-builder-library-for-react-23ed559fdae