# Giới thiệu
Ở phần trước chúng ta đã tìm hiểu cách cài đặt Laravel với React Preset ở bài viết  [Laravel 5.5 và React JS Phần 1: Cài đặt và Hiển thị ví dụ](https://viblo.asia/p/laravel-55-va-react-js-phan-1-cai-dat-va-hien-thi-vi-du-bJzKmkNBl9N), phần này chúng ta sẽ làm thêm sửa xoá cơ bản sử dụng Laravel và Reactjs.

# Khởi động

Tạo seeder cho bảng `users`:

```bash
php artisan make:seeder UsersTableSeeder
```

Thêm đoạn code này vào `run()` function trong file `database/seeds/UsersTableSeeder`:

```php 
factory(App\User::class, 50)->create();
```

Chạy `seed` command chỉ định file seeder chúng ta vừa tạo:
```php
php artisan db:seed --class=UsersTableSeeder
```

Cài đặt package `react-route-dom` để routing. Chạy command sau:
```bash
npm install --save react-router-dom@4.2.2
```
Ở thời điểm viết bài phiên bản mới nhất của `react-router-dom` là 4.2.2. Bạn có thể xem tài liệu tại [đây](https://reacttraining.com/react-router/web/guides/quick-start).

Cài đặt package `history` dùng để quản lý lịch sử của trình duyệt:
```bash
npm install --save history
```
Đây là repo của pacakage `history`:  [https://github.com/ReactTraining/history](https://github.com/ReactTraining/history).

Để recomplile tự động mỗi khi chúng ta thay đổi script ở thư mục assets chạy command sau:
```
npm run watch
```

# Restful API đơn giản sử dụng Laravel
## Restful API
Đây là nội dung file `app\Http\Controllers\UserController.php`
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()
            ->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create($request->all());
        return response()
            ->json(['message' => 'Success: You have added an user']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'The user is not exists']);
        }
        return response()
            ->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $user->update($request->all());
        return response()
            ->json(['message' => 'Success: You have updated the user']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $user->delete();
        return response()
            ->json(['message' => 'Success: You have deleted the user']);
    }
}
```

Đoạn code trên implement các function với mục đích như sau:
 - index: Lấy tất cả các users để hiển thị ngoại list
 - edit: Lấy user info ra màn edit
 - update: Cập nhật thông tin user
 - destroy: Xoá user

## Routes
Chúng ta sửa file `routes/web.php` với nội dung  như sau:
```php
<?php
Route::group(['prefix' => 'api'], function () {
    Route::resource('users', 'UserController');    
});
Route::view('/{any}', 'welcome')
    ->where('any', '.*');
```
Điều chúng ta cần chú ý nhất ở đây là đoạn route này cần đặt cuối file để bắt tất cả những uri khác các các request trên vào view chứa reactjs.
```php
Route::view('/{any}', 'welcome')
    ->where('any', '.*');
```
Đoạn routes này thì chỉ đơn giản là nhóm các api vào 1 group có prefix là `api` mà thôi:
```php
Route::group(['prefix' => 'api'], function () {
    Route::resource('users', 'UserController');    
});
```

# Sử dụng react js làm frontend
## Chỉnh sửa file view

Thay đổi file `resources/views/welcome.blade.php` với nội dung:

```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel 5.5 - ReactJS Example</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <script type="text/javascript">
            window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
```

File view trên có thêm biến javascript `window.Laravel` sẽ chứa những giá trị động lấy từ Laravel sử dụng trong javascript. Chúng ta sẽ fill nội dung Reactjs vào thẻ `div` có id `app`. 

## Tạo sẵn các file component và sửa file `app.js`

Tạo sẵn các file `App.js`, `UserList.js`, `UserRow.js`, `CreateUser.js`, `EditUser.js` trong `resources\assets\js\components`:

![](https://images.viblo.asia/4e68e102-1776-46e6-99e5-f9d8ceaa52b9.png)

Sửa nội dung file `resources\assets\js\app.js`:

```js
// resources\assets\js\app.js

import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import CreateUser from './components/CreateUser'
import EditUser from './components/EditUser'
import UserList from './components/UserList'

const history = createBrowserHistory()
render (
  <Router history={history}>
    <Switch>
      <Route path='/users/create' component={CreateUser} />
      <Route path='/users/edit/:id' component={EditUser} />
      <Route path='/' component={UserList} />
    </Switch>
  </Router>, document.getElementById('app'))
```

File `app.js` sử dụng `Router` để điều hướng các request vào các components `CreateUser`, `EditUser` và `UserList`. function `createBrowserHistory()` tạo ra `history` object dùng để quản lý history của trình duyệt.

## Tạo layout

Tạo file `resources/assets/js/components/App.js` với nội dung:

```js
// resources/assets/js/components/App.js

import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-static-top'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#app-navbar-collapse' aria-expanded='false'>
                <span className='sr-only'>Toggle Navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <Link className='navbar-brand' to='/'>
                Laravel 5.5 - ReactJS Example
              </Link>
            </div>
            <div className='collapse navbar-collapse' id='app-navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li><Link to='/users'>Users</Link></li>
                <li><Link to='/users/create'>Add User</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default App
```

Ở đoạn code trên có một component mới là `Link` được import từ `react-router-dom` có tác dụng tạo ra thẻ `<a/>`.

Chúng ta sẽ fill nội dung của trang vào ` {this.props.children}`.

## Tạo component hiển thị danh sách users

### User List

Tạo file `resources/assets/js/components/UserList.js` với nội dung:

```js
// resources/assets/js/components/UserList.js

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import App from './App'
import UserRow from './UserRow'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = { users: '' }
  }
  componentDidMount () {
    axios.get(window.Laravel.baseUrl + '/api/users')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  deleteRow (key) {
    var users = [...this.state.users];
    users.splice(key, 1);
    this.setState( {users} );
  }
  fetchRows () {
    if (this.state.users instanceof Array) {
      return this.state.users.map( (object, i) => {
        return <UserRow obj={object} key={i} index={i} deleteRow={ this.deleteRow.bind(this) } />
      })
    }
  }

  render () {
    return (
      <App>
        <h1>Users</h1>
        <div className='clearfix'>
          <Link className='btn btn-success pull-right' to='/users/create'>Add User</Link>
        </div><br />
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.fetchRows()}
          </tbody>
        </table>
      </App>
    )
  }
}
export default UserList
```

Ở đoạn code trên, trong method `componentDidMount()` chúng ta sử dụng `axios` gọi đến api `api/users` lấy list users. Method `deleteRow()` sử dụng trong component `UserRow` dùng để cập nhật users list sau khi delete thành công. Method ` fetchRows()` lặp và bind data vào các `UserRow`.

### User Row

Nội dung file `resources/assets/js/components/UserRow.js`:

```js
// resources/assets/js/components/UserRow.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class UserRow extends Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete (e) {
    e.preventDefault()
    if (!confirm('Are your sure you want to delete this item?')) {
      return false
    }
    let url = window.Laravel.baseUrl + '/api/users/' + this.props.obj.id
    axios.delete(url)
      .then(response => {
        this.props.deleteRow(this.props.index)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render () {
    return (
      <tr>
        <td>
          {this.props.obj.id}
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td>
          <Link className='btn btn-primary' to={'/users/edit/' + this.props.obj.id}>Edit</Link>
        </td>
        <td>
          <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}

export default UserRow
```

File này chỉ đổ nội dung được binding từ method `fetchRows()` từ component `UserList` và handle action delete bằng cách sử dụng axios trong method `handleDelete`, sau khi xoá thành công update users list bằng cách gọi  `this.props.deleteRow(this.props.index)`, bằng cách gọi như thế này method `deleteRow` trên component `UserList` cũng sẽ được gọi.

Đây là màn hình user list:

![](https://images.viblo.asia/f6760223-21f4-413a-8c16-fd06352e5a08.png)

## Create user

Nội dung file `resources/assets/js/components/CreateUser.js`:

```js
// resources/assets/js/components/CreateUser.js

import React, { Component } from 'react'
import App from './App'
import axios from 'axios'

class CreateUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeName (e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/users'
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.post(url, data)
      .then(response => {
        this.props.history.push('/users')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <App>
        <h1>Create An User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' id='name' placeholder='Name'
              value={this.state.name} onChange={this.handleChangeName} required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email'
              value={this.state.email} onChange={this.handleChangeEmail} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Password'
              value={this.state.password} onChange={this.handleChangePassword} required />
          </div>
          <button type='submit' className='btn btn-primary'>Add User</button>
        </form>
      </App>
    )
  }
}
export default CreateUser
```

Component `CreateUser` khá đơn giản, chỉ bao gồm các method update các state mỗi khi có sự thay đổi, và method `handleSubmit()` sử dụng axios gọi đến api create user `api/users`, khi tạo xong redirect về users list.

Màn hình create user:

![](https://images.viblo.asia/3d70a57f-1f8c-47a7-9f38-6e49612902a1.png)

## Edit user

Nội dung file `resources/assets/js/components/EditUser.js`:

```js
// resources/assets/js/components/EditUser.js

import React, { Component } from 'react'
import App from './App'
import axios from 'axios'

class EditUser extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    let url = window.Laravel.baseUrl + '/api/users/' + this.props.match.params.id + '/edit'
    axios.get(url)
      .then(response => {
        this.setState(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleChangeName (e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/users/' + this.props.match.params.id
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.patch(url, data)
      .then(response => {
        this.props.history.push('/users')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <App>
        <h1>Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' id='name' placeholder='Name'
              value={this.state.name} onChange={this.handleChangeName} required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Email'
              value={this.state.email} onChange={this.handleChangeEmail} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Password'
              value={this.state.password} onChange={this.handleChangePassword} required />
          </div>
          <button type='submit' className='btn btn-primary'>Update User</button>
        </form>
      </App>
    )
  }
}
export default EditUser
```

Component `EditUser` chỉ khác `CreateUser` ở method `componentDidMount()`  có gọi đến api `api/users/{id}` để lấy thông tin user. Sau khi submit cũng sử dụng axios để update thông tin user và redirect tới màn users list.

Màn hình edit user đã được fill data:

![](https://images.viblo.asia/1c27f6d8-3c6d-46a7-b6e4-96fcf5b3e5bb.png)

# Kết
Trên đây là các bước cơ bản để làm chức năng thêm sửa xoá đơn giản với Laravel và Reactjs, nếu bạn gặp khó khăn trong việc cài đặt có thể đọc bài trước: [Laravel 5.5 và React JS Phần 1: Cài đặt và Hiển thị ví dụ](https://viblo.asia/p/laravel-55-va-react-js-phan-1-cai-dat-va-hien-thi-vi-du-bJzKmkNBl9N)