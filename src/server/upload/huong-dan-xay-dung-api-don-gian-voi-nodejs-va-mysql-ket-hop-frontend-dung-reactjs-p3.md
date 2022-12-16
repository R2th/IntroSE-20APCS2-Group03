Bài này sẽ nói về cách build một ứng dụng sử dụng ReactJs với phần server sử dụng API build bằng Nodejs.
Và nói tiếp cách tạo form: thêm, sửa, xóa dữ liệu bằng API Nodejs, sử dụng ReactJs.


Phần build server API Nodejs các bạn xem chi tiết tại bài sau [Hướng dẫn xây dựng API đơn giản với Nodejs và Mysql](https://viblo.asia/p/huong-dan-xay-dung-api-don-gian-voi-nodejs-va-mysql-RnB5pNz2ZPG)
Phần trước của bài này bạn xem ở đây [Hướng dẫn xây dựng API đơn giản với Nodejs và Mysql, kết hợp frontend dùng reactjs](https://viblo.asia/p/huong-dan-xay-dung-api-don-gian-voi-nodejs-va-mysql-ket-hop-frontend-dung-reactjs-1VgZvNmYZAw)



Như vậy chúng ta đã gọi một api cơ bản với việc sử dụng Reactjs.

## Cấu trúc lại code ReactJs

Trong bài trước về cơ bản cách tổ chức code rất nguyên thủy, mình sẽ cấu trúc lại code [FrontEnd Github code](https://github.com/huuhv/nodejs_api_reactjs) hiện tại thành các components như sau:

### Component hiển thị danh sách

#### Tạo component DisplayItem
Danh sách Todo list hiển thị ban đầu tại file `App.js`, mình sẽ  đổi tên thành component DisplayItem `src/components/DisplayItem.js`

Nội dung của file `src/components/DisplayItem.js` là:

```
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

class DisplayItem extends Component {
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
    tabRow() {
      if (this.state.items instanceof Array) {
        return this.state.items.map(function(object, i) {
          return <TableRow obj={object} key={i} />;
        })
      }
    }
    render() {
      return (
          <div className="list">
              <h1>Todo List</h1>
              <div>
                <table className="table table-hover" align="center">
                  <thead>
                    <tr>
                        <th width="100%" colSpan="5"><Link to="/add-item">Add item</Link></th>
                    </tr>
                    <tr>
                        <th width="10%">ID</th>
                        <th width="70%">Title</th>
                        <th width="20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.tabRow()}
                  </tbody>
                </table>
              </div>
          </div>
      );
  }
}

export default DisplayItem;
```

#### Tạo component TableRow

Trong file `src/components/DisplayItem.js` chúng ta thấy có một component `TableRow` được import vào.
Mục đích của component `TableRow` là để hiển thì từng dòng trong danh sách Todo.

Nội dung của component `src/components/TableRow.js`  như sau:

```
import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            <button className="btn btn-primary">Edit</button>
            &nbsp;
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;
```

#### Cấu trúc lại Router

- Nội dung file `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import bootstrap from 'bootstrap';
import './bootstrap.min.css';
import DisplayItem from './components/DisplayItem';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={DisplayItem} />
          <Route path="/display-item" component={DisplayItem} />
        </Switch>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
```

- Kết quả màn hình khi truy cập vào `http://localhost:3000/`

![](https://images.viblo.asia/711e7430-29b3-4af1-ba0a-f59905a08bb3.png)


## Form tạo item

### API tạo item
API thêm item mới vào danh sách todo list như sau:
- Url: http://localhost:3001/api/todos
- Method: post
- Parameters: title(string)

Kết quả khi chạy api:

![](https://images.viblo.asia/652d8418-7d1d-44e5-881a-14ec160d6390.png)

### Tạo form và call api
#### Tạo form add item
- Tạo file `src/components/CreateItem.js` có nội dung như sau:

```
import React, {Component} from 'react';

class CreateItem extends Component {
    render() {
      return (
      <div>
        <h1>Create An Item</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" onChange={this.handleChange1}/>
              </div>
            </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary">Add Item</button>
            </div>
          </form>
        </div>
      )
    }
}
export default CreateItem;
```

- Sửa lại `Router` trong file `src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import bootstrap from 'bootstrap';
import './bootstrap.min.css';
import DisplayItem from './components/DisplayItem';
import CreateItem from './components/CreateItem';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={DisplayItem} />
          <Route path="/add-item" component={CreateItem} />
          <Route path="/display-item" component={DisplayItem} />
        </Switch>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
```

- Sửa file `src/components/DiplayItem.js` để thêm link đến form add item
Thêm dòng 
```
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
```
Và sửa dòng 
```
<th width="100%" colSpan="3">Add item</th>
```
thành dòng 
```
<th width="100%" colSpan="3"><Link to="/add-item">Add item</Link></th>
```

#### Tạo xử lý form để post data

File `src/components/CreateItem.js` sẽ được thêm các lệnh xử lý form như sau:

```
import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class CreateItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({
      title: e.target.value
    })
  }
  render() {
    return (
      <div>
        <h1>Create An Item</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" onChange={this.handleChange} required="true" />
              </div>
            </div>
          </div><br />
          <div className="form-group">
            <button className="btn btn-primary">Add Item</button>
            &nbsp;
            <Link to="/display-item">Back Todo list</Link>
          </div>
        </form>
      </div>
    )
  }
}
export default CreateItem;
```

Chúng ta có giao diện form như sau:


![](https://images.viblo.asia/04431ad3-9792-4508-ba18-a89856ecd2b5.png)


#### Thêm function để call api

Trong file `src/components/CreateItem.js` sẽ thêm fucntion call api sau:
```
handleSubmit(e){
    e.preventDefault();
    const items = {
      title: this.state.title
    }
    let uri = 'http://localhost:3001/api/todos';
    axios.post(uri, items).then((response) => {
        return <Redirect push to='/display-item' />
    });
  }
```

Sử dụng api ta sẽ có kết quả như sau:

![](https://images.viblo.asia/407275a2-e53c-44a3-8053-fb9b481701ec.png)
![](https://images.viblo.asia/d5c228ce-8cc3-4a98-b9f0-a0f6b99f309a.png)


## Form edit & delete item

Tương tự với cách hoạt động của form tạo item chúng ta sẽ chỉnh sửa và thêm các file sau:

### Form edit

Thêm file `src/components/EditItem.js` có nội dung như sau:

```
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class EditItem extends Component {
  constructor(props) {
      super(props);
      this.state = {title: '', redirect: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/todos/"+this.props.match.params.id)
    .then(response => {
      console.log(response);
      this.setState({ title: response.data.title });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleChange(e){
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const items = {
      title: this.state.title
    }
    let uri = 'http://localhost:3001/api/todos/'+this.props.match.params.id;
    axios.put(uri, items).then((response) => {
      this.setState({
        redirect: true
      })
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1>Update Todo</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/display-item" className="btn btn-success">Return to Todo list</Link>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    )
  }
}
export default EditItem;
```

Tạo route để phần edit này có thể nhìn thấy trên giao diện, thêm các dòng code sau vào `src/index.js`:

```
import EditItem from './components/EditItem';

<Route path="/edit-item/:id" component={EditItem} />
```

### Xử lý delete

Để cập nhật xử lý cho phần `Delete` item, 
File `src/components/TableRow.js` sẽ được sửa như sau:

```
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let uri = `http://localhost:3001/api/todos/${this.props.obj.id}`;
    axios.delete(uri);
      this.setState({
        redirect: true
      })
    }
  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
        <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            <Link className="btn btn-primary" to={"/edit-item/"+this.props.obj.id}>Edit</Link>
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="btn btn-danger">Delete</button>
            </form>
          </td>
        </tr>
    );
  }
}

export default TableRow;

```

Trên giao diện sẽ hiển thị như sau:

![](https://images.viblo.asia/2fd61bc5-f5e6-4a1e-8e77-a583f2fed82e.png)

Click vào button Edit sẽ hiển thị ra form sau:

![](https://images.viblo.asia/0493b4a0-c5c8-47a0-9888-bd4e55dbf90f.png)

Sau khi nhập dữ liệu để sửa ta click vào button `Update` dữ liệu sẽ được cập nhật vào DB.

![](https://images.viblo.asia/03c05bf8-3d16-4953-aa2a-cdd9b4524c22.png)

Khi click vào button xóa thì tương tự dữ liệu cũng sẽ được xóa khỏi DB.




## Tham khảo
- [Reactjs.org](https://reactjs.org/docs/add-react-to-a-new-app.html)
- [Axios](https://github.com/axios/axios)
- [FrontEnd Github code](https://github.com/huuhv/nodejs_api_reactjs)
- [Nodejs API Github code](https://github.com/huuhv/nodejs_api)