# [Tài liệu tham khảo](https://inet.vn/vps?aff=408037) 
Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.

## Đặc điểm Axios
* Tạo XMLHttpRequests từ trình duyệt
* Thực hiện các http request từ node.js
* Hỗ trợ Promise API
* chặn  request và response
* Chuyển đổi dữ liệu request và response 
* Hủy requests
* Tự động chuyển đổi về dữ liệu JSON
* Hỗ trợ phía client để chống lại XSRF
## Hỗ trợ các trình duyệt
![](https://images.viblo.asia/47176966-53fa-4a7a-a1cd-1a8515d1fdbb.PNG)
## Cài đặt
* Sử dụng npm:
```shell
$ npm install axios
```
* Sử dụng bower:
```markdown
$ bower install axios
```
* Sử dụng yarn:
```markdown
$ yarn add axios
```
* Sử dụng cdn:
```swift
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Một request với Axios
Giống như với hàm $.ajax của jQuery, Chúng ta có thể tạo bất kỳ một request HTTP nào bằng cách truyền vào các object option cho Axios, ví dụ như: 
```javascript
axios({
  method: 'post',
  url: 'https://jsonplaceholder.typicode.com/users',
  data: { user }
});
```
Bài viết này sẽ giới thiệu một số phương thức HTTP mà chúng ta hay sử dụng (Ví dụ: GET/POST/DELETE) 
### 1.GET Requests
Ban đầu chúng ta tạo một component  có tên **PersonList** như sau:
```javascript
import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}
```
Đoạn mã này gửi một request với phương thức GET đến URL https://jsonplaceholder.typicode.com/users, nếu thành công kết quả sẽ được render ra danh sách `person.name`
```javascript
<ul>
     { this.state.persons.map(person => <li>{person.name}</li>)}
</ul>
```
và nếu lỗi thì in lỗi ra console trong .catch(). Bạn có thể tưởng tượng nó giống như việc bạn mở trình duyệt ra, gõ vào đường dẫn cần đến và chờ, nếu thông tin được hiển thị bạn sẽ đọc được, nếu không một thông báo lỗi hiển thị lên trên trình duyệt
```javascript
axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(error => console.log(error));
```
### 2. POST Requests
Với việc cho phép người dùng nhập dữ liệu vào form sau đó submit gửi nội dung lên API thì  ta có thể sử dụng phương thức POST hoặc PUT. Ở đây ta dùng phương thức POST để gửi yêu cầu.
```javascript
import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    name: '',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
```
### 3. DELETE Requests
Chúng ta có thể xóa một hoặc nhiều person khỏi API bằng cách sử dụng `axios.delete` và truyền vào URL dưới dạng tham số `this.state.id`
```javascript
import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}
```
Ngoài ra chúng ta có thể cung cấp  rất nhiều các option mới cho request, nhưng dưới đây là một số option phổ biến nhất:
* **baseURL**: nếu bạn chỉ định một base URL, nó sẽ được đính vào trước bất cứ một URL tương đối nào mà bạn sử dụng.
* **headers**: một object gồm các cặp key/value có thể gửi trong header của request.
* **params**: một object gồm các cặp key/value mà sẽ được serialize và đính vào URL dưới dạng một query string.
* ...

-----
Ví dụ đối với option **baseURL**:
Ta tạo 1 file mới và đặt tên là api.js.
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});
```
Khi này ở trong component  PersonList :
```javascript
import API from '../api';

export default class PersonList extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    API.delete(`users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
}
```
### 4.Đối tượng response được trả về từ server
```go
{
  // Dữ liệu cần lấy từ máy chủ
  data: {},

  // Mã trạng thái HTTP của yêu cầu
  status: 200,

  // Mô tả trạng thái tương ứng với mã trạng thái ở trên
  statusText: 'OK',

  // Thông tin header của hồi đáp (response)
  headers: {},

  // config được thiết lập trước khi gửi request
  config: {},

  // là thực thể của ClientRequest nếu sử dụng Node.js và XMLHttpRequest trong trình duyệt
  request: {}
}
```
## Lời kết 
Axios xây dựng dựa trên nền tảng Promise do đó nó kế thừa các ưu điểm của Promise. Cho phép thực hiện các hook (intercept) ngay khi gửi request và nhận response. Cho phép hủy yêu cầu, đây là một chức năng mà các thư viện khác không có. Axios là HTTP Client giúp xây dựng các ứng dụng kết nối từ nhiều nguồn dữ liệu. Axios là phần công cụ giúp lấy dữ liệu dễ dàng cho các framework như Vue.js, React.js, Angular… xây dựng các ứng dụng font-end linh động. 
## Tài liệu tham khảo
* Trang web [alligator.io](https://alligator.io/react/axios-react/?fbclid=IwAR01z45xg8Zag2FD1iGgStN1rYilnR3oWFdk6SmmjTGajYneUbNuGNjcREQ#post-requests)
* https://github.com/axios/axios