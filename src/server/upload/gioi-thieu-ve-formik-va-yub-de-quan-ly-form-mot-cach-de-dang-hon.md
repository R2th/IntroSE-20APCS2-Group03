Nếu như trước đây chúng tà thường mơ hồ khi không biết quản lý form như thế nào cho hợp lý trong các framework phát triển hiện nay ( Reactjs ,Angular ...) . Hay việc kiểm tra các giá truyền vào là việc cảm thấy kho khăn . Thì sau đây mình xin giới thiệu cho các ban 2 thư viện rất phổ biến hiện nay để quản lý form một cách hiệu qua hơn đó là Formik và Yup.

# 1. Formik là gì ? 
Formik đơn giản chỉ là một thư viện  nhỏ giúp chung ta giải quyết 3 vấn đề rắc rối chính sau đây : 
* Nhân giá trị trong và ngoài state form
* Validate giá trị và đưa ra lổi
* Xử lý việc submit form

Bằng cách sắp xếp tất cả những điều trên vào một nơi, Formik sẽ giữ mọi thứ có tổ chức - giúp việc kiểm tra, cấu trúc lại và trả kết quả cho form của bạn trở nên dễ dàng.

-----
###### Câu hỏi đặt ra ở đây là tại sao chúng ta nên sử dụng Formik trong khi đã có Redux-Form . Có 3 lý do chính sau đây 
1. Theo ông Dan Abramov việc quản lý form state vỗn dỹ không bền vững vởi tính chất thay đôi liên tục của state và tính cục bộ của nó .Vì vậy việc theo dõi nó trong Redux (hoặc bất kỳ loại thư viện Flux nào) là không cần thiết
2. Redux-Form gọi toàn bộ các reducer cấp cao nhất của bạn nhiều lần TRÊN MỖI PHÍM CHỈNH. Điều này là tốt cho các ứng dụng nhỏ, nhưng khi ứng dụng Redux của bạn phát triển, độ trễ nhập liệu sẽ tiếp tục tăng lên nếu bạn sử dụng Redux-Form.
3. DUng lượng của Formik nhỏ hơn Redux Form

# 2. Cách sử dụng Formik
### 1) Cài đặt

```
 npm install formik --save
 
 //hoăc
 
 yarn add formik
```
CDN
```
 <script src="https://unpkg.com/formik/dist/formik.umd.production.min.js"></script>
```
### 2) Ví dụ
Chúng ta sẽ bắt đầu với cách sử dụng Formik dài dòng nhất. Mặc dù điều này có vẻ hơi nản , nhưng điều quan trọng là bạn phải xem cách Formik xây dựng dựa trên chính nó để bạn có thể nắm bắt đầy đủ những gì có thể và một mô hình hoàn chỉnh về cách nó hoạt động của nó.
```
import React from 'react';
 import { useFormik } from 'formik';
 const SignupForm = () => {
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
       <button type="submit">Submit</button>
     </form>
   );
 };
```
Như ở ví dụ trên chúng ta có thể thấy tôi chuyển giá trị khởi tạo (initialValues) và hàm gửi (onSubmit) vào hook useFormik (). Sau đó hook trả về cho chúng ta một vào trong biến formik  . Trong biến formik, có rất nhiều các hàm và giá trị được xây dưng . Ở dây chúng ta có *formik.handleChange* , *handleBlur*  và *submit*  .  Các tính năng như error hay touch  giúp chúng ta thể hiện lổi một cách dể dàng hơn. Bên cạnh đó Formik còn cung cấp cho chúng ta một số component cực kì hữu ích để giúp cho việc xử lý form của bạn dễ dàng hơn
##### 2.1 Formik 
Formik là một thành phần giúp bạn xây dựng biểu mẫu. Nó sử dụng một mẫu render props được các thư viện như React Motion và React Router phổ biến.
```
 import { Formik } from 'formik';
 
<Formik
       initialValues={{ name: 'jared' }}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
       {props => (
         <form onSubmit={props.handleSubmit}>
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           />
           {props.errors.name && <div id="feedback">{props.errors.name}</div>}
           <button type="submit">Submit</button>
         </form>
       )}
     </Formik>
```
Formik render method và props . Có 2 cách để render với Forkmik  `<Formik component>` và  `<Formik children>`.Với mổi lần render nó sẻ trà về các props sau handleBlur,handleChange,isSubmitting....  (Xem thêm : https://formik.org/docs/api/formik)
##### 2.2 Field 
Field sẽ tự động kết nối các đầu vào với Formik. Nó sử dụng thuộc tính name để khớp với trạng thái Formik. <Field /> sẽ mặc định thành một phần tử <input />  trong HTML

Có nhiều cách khác nhau để hiển thị mọi thứ với  `<Field>` 

* `<Field as>`
* `<Field children>`
* `<Field component>`
* `<Field render>` không được dùng nữa trong phiên bản 2.x trở lên
   
   
 2.2.1 `<Field as>`
 
   Field as có thể là một thành phần React hoặc tên của một phần tử HTML để hiển thị. Mac đinh của Field as là thẻ input trong HTML
```
    <Field as="select">
      <option value="1">1</option>
      <option value="2">2</option>
    </Field>
    
    //Nó sẻ ren dẻ ra html như sau
    
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
    
    // Ngoài ra nó có thể xem như 1 component
     <Field name="firstName" as={CustomInputComponent} placeholder="First Name"/>
    const CustomInputComponent = (props) => (
      <input className="my-custom-input" type="text" {...props} />);
```
2.2.2 `<Field children>`
```
children?: React.ReactNode | ((props: FieldProps) => React.ReactNode)

// Children có thể là JSX elements
 <Field name="color" as="select" placeholder="Favorite Color">
   <option value="red">Red</option>
   <option value="green">Green</option>
   <option value="blue">Blue</option>
 </Field>
 
 // callback function
 <Field name="firstName">
 {({ field, form, meta }) => (
   <div>
     <input type="text" {...field} placeholder="First Name"/>
     {meta.touched &&
       meta.error && <div className="error">{meta.error}</div>}
   </div>
 )}
 </Field>
```
2.2.3 `<Field component>`
```
 // Renders an HTML <select>
 <Field component="select">
      <option value="1">1</option>
      <option value="2">2</option>
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
```
2.2.4 `<Field render>`
> không được dùng nữa trong phiên bản 2.x trở lên
```
// Renders an HTML <input> and passes FieldProps field property
 <Field
   name="firstName"
   render={({ field /* { name, value, onChange, onBlur } */ }) => (
     <input {...field} type="text" placeholder="firstName" />
   )}
 />
 
 // Renders an HTML <input> and disables it while form is submitting
 <Field
   name="lastName"
   render={({ field, form: { isSubmitting } }) => (
     <input {...field} disabled={isSubmitting} type="text" placeholder="lastName" />
   )}
 />
 
 // Renders an HTML <input> with custom error <div> element
 <Field
   name="lastName"
   render={({ field, form: { touched, errors } }) => (
     <div>
       <input {...field} type="text" placeholder="lastName" />
       {touched[field.name] &&
         errors[field.name] && <div className="error">{errors[field.name]}</div>}
     </div>
   )}
 />
```
##### 2.3 Field 
`<ErrorMessage />` là một thành phần hiển thị thông báo lỗi của một trường nhất định nếu trường đó đã được truy cập (touch[name] === true). Các thông báo lỗi được lưu trữ cho một trường nhất định dưới dạng một chuỗi như`<Field />`
```
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
           
           /// Ở đây chúng ta có thể thấy kiêm tra có lổi  và chạm lần đầu hay chưa
 -           {errors.email && touched.email ? (
         /// Các lổi sẻ được lưu dưới dạng errors[ name cửa tưng Field ]
 -            <div>{errors.email}</div>
 -          ) : null}
 +         <ErrorMessage name="email" />
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
```
# 3. Sử dung Yup và Forkmik  ?
### 1) Yup ? 
> Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformations.

Nói nôm na chúng ta có thể hiểu Yup giúp chung ta xây dựng được một lược đồ để chúng ta có thể  kiểm tra các giá trị cho phù hợp với các điều kiện mà chúng ta đã định nghĩa 
### 2)  Ví dụ
```
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
```
Chúng ta có thể thấy , ở đây chúng tao ra một lược đồ với Yup.object() . Tạo các điều kiện như  required ,min ,max và đưa ra thông báo lổi khi không thỏa của từng điều kiên . 

# 4 . Tham  Khảo
* #### https://formik.org/docs
* #### https://github.com/jquense/yup