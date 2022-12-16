Khi chúng ta làm việc với các Framework như ``ReactJS`` hay  ``AngularJS`` chắc hẳn bạn cũng đã phải vài lần lúng túng khi thao tác với form. Vì vậy ``Formik`` đã được phát triển để giúp chúng ta xử lý những vấn đề khó khăn và phức tạp khi làm việc với form trong React

Theo như định nghĩa trong trang chủ của Formik, nó là 1 thư viện nhỏ, giúp chúng ta xử lý 3 vấn đề phiền toái nhất trong form là, nhận giá trị ở trong và ngoài form state, validate giá trị và trả lại error messages, xử lý việc submit form. Và tất cả những phiền toái đó sẽ được ``Formik`` tập trung lại để giải quyết thông qua cách nó tổ chức, tái cấu trúc form của bạn theo cách dễ dàng hơn bạn có thể nghĩ.

Nhưng tại sao lại không dùng ``Redux-Form`` ?, có 3 lý do rõ ràng nhất đã được tác giả của Formik liệt kê:

1) Theo như lời của Dan Abramov ( người đã tạo ra Redux) : state của form vốn cục bộ và không ổn định, vì vậy việc theo dõi nó trong Redux là 1 việc không cần thiết.
2) Redux-form gọi toàn bộ top-level Redux reducer nhiều lần với mỗi lần bạn nhấn phím ( chẳng hạn như khi bạn nhập từ 'react' vào input thì nó sẽ gọi 5 lần cho 5 chữ bạn gõ). Với ứng dụng nhỏ thì việc đó chỉ như muỗi chích inox thôi, nhưng khi ứng dụng đó dần phát triển thêm và trở nên siêu to khổng lồ thì bạn sẽ sớm cảm nhận được độ trễ, lag khi bạn gõ chữ vào input hoặc thao tác với form.
3) Redux-form có dung lượng minified là 22.5 kB, Formik thì chỉ có 12.7 kB, bạn tiết kiệm được tới hẳn 9.8 kB, thích nhé (yaoming).

**1) Bắt đầu**

Để sử dụng 1 phần mềm hay 1 thư viện nào cũng không thể thiếu việc cài đặt được, bạn có thể cài Formik bằng 1 trong 2 cú pháp dưới đây

``npm install formik --save``

``yarn add formik``

Formik tương thích với phiên bản React 15+ và có thể sử dung tốt với ReactDOM, và React Native 

**2) Giới thiệu**

Formik quản lý và theo dõi state của form và hiển thị ra, nó còn cung cấp cho form của bạn 1 số event hữu ích để sử dụng như ``handleChange``, ``handleSubmit``, ``handleFocus``, và ``handleBlur``. Thông qua việc bạn đặt ``name`` hoặc ``id`` như thế nào, nó sẽ dựa vào đó để tìm được đúng trường cần xử lý và cập nhật.

Example:

```
import React from 'react';
import { Formik } from 'formik';
const Basic = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);
export default Basic;
```

Từ đoạn code trên, bạn có thể hiểu rõ ràng về những gì Formik đang làm, nó sẽ hoạt động từ ``onChange`` đến ``handleChange``, tương tự , ta có từ ``onBlur`` đến ``handleBlur``. Ngoài ra, Formik cũng tương tự Redux-Form ở việc nó cũng cung cấp cho bạn 1 số component cực kì hữu ích để giúp cho việc xử lý  form của bạn dễ dàng hơn như: <Form />, <Field />, và  <ErrorMessage />.

Ngoài ra, Formik còn mang đến cho bạn những lựa chọn trong việc validate dữ liệu state trong form. Bạn có thể tự code  hoặc nhờ tới sự trợ giúp của thư viện khác. Và tác giả của Formik, Jared Palmer đã gợi ý cho chúng ta Yup để dùng trong việc validation. để cài đặt nó cũng rất đơn giản, chỉ cần ``npm i yup --save`` hoặc ``yarn add yup``

**3) Components**

**Form**

Form là 1 wrapper bao ngoài cho HTML form, nó được nối vào ``handleSubmit`` và ``handleReset`` của Formik. Tất cả props sẽ được truyền trực tiếp thông qua DOM node.

Example:
```
<Form />
```

Nó sẽ tương tự với 

```
<form onReset={formikProps.handleReset} onSubmit={formikProps.handleSubmit} {...props} />
```

**Field**

Field sẽ tự động kết nối các input trong nó với Formik, nó dựa vào ``name`` để kết nối với các Formik state phù hợp. khi render, field thường được mặc định là input

Tuy nhiên bạn có thể custom nó thành các element khác bạn muốn thông qua việc rendering, có 4 cách để làm:
1) ``<Field as>``, as chấp nhận với các giá trị String như input, select hay textarea hoặc có thể là HTML element name hoặc Custom Component, ví dụ:

    ````
       // Renders an HTML <input> by default
        <Field name="lastName" placeholder="Last Name"/>

        // Renders an HTML <select>
        <Field name="color" as="select" placeholder="Favorite Color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>

        // Renders a CustomInputComponent
        <Field name="firstName" as={CustomInputComponent} placeholder="First Name"/>

        const CustomInputComponent = (props) => (
          <input className="my-custom-input" type="text" {...props} />
        );
    ````
3) <Field children>, children nhận giá trị JSX element hoặc callback funrtion, ví dụ:
    ````
        // Children can be JSX elements
        <Field name="color" as="select" placeholder="Favorite Color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>

        // Or a callback function
        <Field name="firstName">
        {({ field, form, meta }) => (
          <div>
            <input type="text" {...field} placeholder="First Name"/>
            {meta.touched &&
              meta.error && <div className="error">{meta.error}</div>}
          </div>
        )}
        </Field>
    ````
3) <Field render> từ bản 2.x trở lên sẽ bị báo warning khi sử dụng nên thôi cái này ta không bàn
4) <Field component> cũng khá giống với as, nhưng không nhận HTML element name, ví dụ:
    ````
        // Renders an HTML <input> by default
        <Field name="lastName" placeholder="Last Name"/>

        // Renders an HTML <select>
        <Field name="color" component="select" placeholder="Favorite Color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>

        // Renders a CustomInputComponent
        <Field name="firstName" component={CustomInputComponent} placeholder="First Name"/>

        const CustomInputComponent = ({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          ...props
        }) => (
          <div>
            <input type="text" {...field} {...props} />
            {touched[field.name] &&
              errors[field.name] && <div className="error">{errors[field.name]}</div>}
          </div>
        );
    ````
    
**name trong Field**: kiểu String, đê có thể truy cập vào các mảng lồng nhau, name cũng thể viết là array[2].item hoặc object.item
    
**FieldArray**
    
 FieldArray là component giúp ta điểu chỉnh và sử dụng các list hoặc array component, thông qua thuộc tính name và các value có liên quan đến array, FieldArray sẽ cho phép truy cập đến các props được cung cấp từ Formik, ví dụ:
    
 ````
    import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export const FriendList = () => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ friends: ['jared', 'ian', 'brent'] }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="friends"
            render={arrayHelpers => (
              <div>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Field name={`friends.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  </div>
);
 ````
        
 Tương tự như Field, Field cũng có thể render Custom Component bằng các props như component, render hay children ( không có as)
        
**ErrorMessage**
        
ErrorMessage là component giúp render thông báo lỗi từ những trường đã được chạm vào (touched). Nó lưu trữ tất cả các lỗi thành 1 chuối String. Như Field hay FieldArray, nó cũng được hỗ trợ với các props như name, render, children hay component

````
        import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name"  />
-           {errors.name && touched.name ? (
-            <div>{errors.name}</div>
-          ) : null}
+         <ErrorMessage name="name" />
          <Field name="email" type="email" />
-           {errors.email && touched.email ? (
-            <div>{errors.email}</div>
-          ) : null}
+         <ErrorMessage name="email" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);
````

Ở trên là 1 số lời giới thiệu của mình về Formik để những người mới, chưa tiếp cận đến nó có thể tiếp cận 1 cách dễ dàng hơn và nhanh hơn. Cảm ơn các bạn đã theo dõi bài viết của mình