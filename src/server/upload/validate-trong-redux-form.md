### **I. Tổng quan về redux-form**

- `redux-form` là một components bậc cao cho form được sử dụng trong Redux React.
- Sử dụng `redux-form` giúp dễ dàng quản lý các state trong form `html` của React.

### **II. Cài đặt**

- Chúng ta có thể cài đặt `redux-form` trong console thông qua `npm` bằng câu lệnh:

```
npm install redux-form
```

- Hoặc có thể thêm trong file package.json trước khi dùng lệnh ```npm install```:

```
"redux-form": "6.1.0"
```

### **III. Validate trong redux-form**

Chúng ta có thể thực hiện validate một form sử dụng `redux-form` theo các bước sau:
#### 1. Đầu tiên, ta phải xây dựng một form sử sử dụng `redux-form`:
- Trong containers, tạo một form với nội dung:
```js
'use strict';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import exampleValidate from '../validates/example_validate';

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleField: ''
    };
  }

  onChangeAttribute(e) {
    this.setState({exampleField: e.target.value});
  }

  render() {
    return (
      <div className='form-group'>
        <input type='text' value={this.state.exampleField}
          onChange={this.onChangeAttribute.bind(this)}/>
        <div className='text-danger'>
          {touched && error && <span className='error'>{error}</span>}
        </div>
        <button disabled={!this.props.valid} >
          Submit
        </button>
      </div>
    );
  }
}

Example = reduxForm({
  form: 'Example',
  validate: ExampleValidate
})(Example);

export default Example;
```

- Như vậy, ta đã có 1 form react với validate có nội dung trong file `/validates/example_validate.js` được định nghĩa trong đoạn:
```
Example = reduxForm({
  form: 'Example',
  validate: ExampleValidate
})(Example);
```

- Button submit được disabled khi form chưa valid như trong đoạn 
```
<button disabled={!this.props.valid} >
```

- Các thông báo validate sẽ được hiển thị trên view qua đoạn:
```
<div className='text-danger'>
  {touched && error && <span className='error'>{error}</span>}
</div>
```

#### 2. Tiếp theo, ta phải tạo nội dụng file validate:
- Trong file validate, ta thêm các trường hợp validate cho trường cần validate, ví dụ như validate require bằng cách:
```js
const exampleValidate = (values, props) => {
  const errors = {};

  if (!values.exampleField) {
    errors.exampleField = 'Required';
  }

  return errors;
}

export default exampleValidate;
```

Như vậy:
- Khi exampleField không có giá trị, form `Example` sẽ trả về giá trị `this.props.valid = false` và `errors.exampleField = 'Required'`. Khi đó button `Submit` sẽ bị disabled và trường `exampleField` sẽ hiển thị thông báo lỗi 'Required'.
- Khi exampleField có giá trị, form `Example` sẽ trả về giá trị `this.props.valid = true` và `errors = {}'`. Khi đó button `Submit` sẽ được enable và trường `exampleField` sẽ mất hiển thị thông báo lỗi 'Required'.

### **V. Kết luận**

Trên đây là một ví dụ cơ bản nhất trong việc sử dụng validate thông qua `redux-form`. Hi vọng bài viết có thể cung cấp cách nhìn tổng quan, dễ hiểu nhất cho những bạn mới tiếp xúc với việc validate trong redux-form của React. Chúng ta có thể khai thác rất nhiều tính năng mở rộng trong `redux-form` qua hướng dẫn của npm: https://www.npmjs.com/package/redux-form.