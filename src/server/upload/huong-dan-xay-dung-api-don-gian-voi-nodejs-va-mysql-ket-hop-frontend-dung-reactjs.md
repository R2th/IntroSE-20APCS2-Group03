Bài này sẽ nói về cách build một ứng dụng sử dụng ReactJs với phần server sử dụng API build bằng Nodejs.

Phần build server API Nodejs các bạn xem chi tiết tại bài sau [Hướng dẫn xây dựng API đơn giản với Nodejs và Mysql](https://viblo.asia/p/huong-dan-xay-dung-api-don-gian-voi-nodejs-va-mysql-RnB5pNz2ZPG)


## Khởi tạo project
### Requirement
- Nodejs 6.x
- Mysql 5.x
- ReactJs 16.x

### Create react app

```
npm install -g create-react-app
create-react-app my-app
```

Kết quả file package.json sẽ như sau:
```
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

Để chạy ta dùng lệnh:

```
cd my-app
npm start
```

### Running Test

Truy cập app trên trình duyệt với đường link như bên dưới:

```
http://localhost:3000/
```
Giao diện chúng ta nhìn thấy sẽ như sau:

![](https://images.viblo.asia/93f13500-cebe-4122-a960-c41e9164de71.png)


## Cách gọi API từ ReactJs

### Cài đặt Axios để gọi API
Chạy lệnh sau
```
npm install axios ---save
```

API Nodejs mình đã nói từ bài trước các bác lấy code về chạy nhé. Lấy code tại [nodejs_api](https://github.com/huuhv/nodejs_api)

Và fix port để chạy api này là 3001 chẳng hạn.

### Danh sách items
#### Kết quả từ API trả về như sau:

URL: http://localhost:3001/api/todos

![](https://images.viblo.asia/8c0d14f0-9f8f-417b-947f-894a16ea788a.png)

#### Trên frontend ta sẽ gọi bằng cách.

- File `src/App.js` mặc định sẽ là:
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```

- Và file `src/App.js`, ta sẽ sửa file này bằng cách import thêm thư viện `axios` gọi phương thức api theo kiểu restful api. Thêm function `componentDidMount` để gọi api từ Nodejs API.

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state ={items: []};
   }
  componentDidMount() {
    axios.get('http://localhost:3001/api/todos')
     .then(response => {
      console.log(response.data);
       this.setState({ items: response.data });
     })
     .catch(function (error) {
       console.log(error);
     })
    }
    render() {
      return (
          <div className="App">
              <h1>Todo List</h1>
              <div>
                <table className="table table-hover" align="center">
                  <thead>
                  <tr>
                      <th width="10%">ID</th>
                      <th width="80%">Title</th>
                      <th width="10%">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map(item =>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td><a href="#">Edit</a>&nbsp;<a href="#">Delete</a></td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </div>
      );
  }
}

export default App;
```

Màn hình kết quả sẽ là:
![](https://images.viblo.asia/4a5096e4-6b94-4aa5-9c0f-b1755534a532.png)

Như vậy ta đã gọi một api cơ bản với việc sử dụng react
## Tham khảo
- [Reactjs.org](https://reactjs.org/docs/add-react-to-a-new-app.html)
- [Axios](https://github.com/axios/axios)
- [Github code](https://github.com/huuhv/nodejs_api_reactjs)