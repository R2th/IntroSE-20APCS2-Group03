Redux-form là một thư viện hỗ trợ trong việc quản lý React form state.

## Tổng quan

Để kết nối giữa React form component và Redux store bạn cần những thành phần sau từ redux-form

**formReducer** : function chịu trách nhiệm cập nhật Redux store dựa trên những thay đổi từ app.

**reuduxForm()** : là một HOC với đầu vào là một object và đầu ra là một function mới. Sử dụng hàm này để bao lấy form component và bind các hàm xử lý tương tác người dùng và dispatch action tương ứng.

**<Field/>** : components bên trong form component, dùng để kết nối input component với redux-form logic.

## Luồng dữ liệu
Dưới đây là luồng dữ liệu cơ bản

![](https://images.viblo.asia/6caccc2a-6f36-434c-a3fa-5346c2377f40.png)


Giả sử ta có một form chứa một text input được bao bới **<Field/>**. Form này được bao bởi **reduxForm()**. Luồng dữ liệu sẽ như sau:
1. Người dùng click vào input
2. "Focus action" được dispatch
3. formReducer update state
4. State được truyền ngược lại đến input component

Ngoài ra redux-form còn hỗ trợ về sử lý validation, fomatting, nhiều thuộc tính và action creator khác. Bạn có thể tìm hiểu thêm.

## Hướng dẫn sử dụng cơ bản
### Bước 1: Form reducer
Đầu tiên ta truyền **formReducer** đến store. Reducer này sẽ phục vụ tất cả form components trong app của bạn.

```
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  // ...nhung reducer khac
  form: formReducer
})

const store = createStore(rootReducer)
```

Như vậy store sẽ biết phải handle actions đến từ các form component.

**Lưu ý** : Key để truyền redux-form reducer nên được đặt là **'form'**. Nếu bạn muốn sử dụng một tên key khác bạn có thể tìm hiểu thêm [ở đây](https://redux-form.com/7.3.0/docs/api/reduxform.md/#-getformstate-function-optional-).

### Bước 2: Form component
Để form component được kết nối đến store, ta cần bao component đó bởi **reduxForm()**. Nó sẽ cung cấp các props liên quan đến state và function để handle việc submit form.

```
import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ContactForm = props => {
  const { handleSubmit } = props
  return <form onSubmit={handleSubmit}>{/* form body*/}</form>
}

ContactForm = reduxForm({
  // ten cua moi form la duy nhat
  form: 'contact'
})(ContactForm)

export default ContactForm
```

### Bước 3: Component <Field/>
Component **<Field/>** làm nhiệm vụ kết nối input đến store `<Field name="inputName" component="input" type="text" />`.
Nó sẽ tạo  phần tử HTML **<input/>** với type text và truyền vào những props như **value, onChange, onBlur** ,... giúp cho việc theo dõi và cập nhật state.

**Lưu ý** : Component **<Field/>** ngoài việc tạo ra input cơ bản bằng **component="input"**, bạn có thể thay vào đó bằng một component. Tìm hiểu thêm [ở đây](https://redux-form.com/7.3.0/docs/api/Field.md/#usage)

Ta sẽ thêm 3 input vào form gồm **"firstName", "lastName", "email"**.
```
import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm
```
### Bước 4 : Handle việc submit form
Dữ liệu submit được truyền dưới dạng object JSON đến function **onSubmit**. Thử **console.log** nó ra xem sao.
```
import React from 'react'
import ContactForm from './ContactForm'

class ContactPage extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <ContactForm onSubmit={this.submit} />
  }
}
```
Như vậy bạn đã lấy được dữ liệu từ form. Việc sử dụng dữ liệu sau đó là tùy thuộc vào bạn.

## Tham khảo
[Getting Started With redux-form](https://redux-form.com/7.3.0/docs/gettingstarted.md/)