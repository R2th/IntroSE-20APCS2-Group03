Ở bài viết trước mình đã hướng dẫn xong thiết lập cho cả front và server([tại đây](https://viblo.asia/p/xay-dung-ung-dung-web-voi-python-flask-framework-angular2-dynamodb-phan-1-RQqKLAVbZ7z)). Để chuẩn bị tiếp cho các phần hay ho như xử lý authentication, sessions... thì ở bài viết này mình xin hướng dẫn cách kết nối và liên lạc giữa front-server bằng cách tạo trang CRUD đơn giản.

Tương tự như các hệ ứng dụng client-server khác. Ở hệ thống này chúng ta sẽ xây dựng api để nhận request và gửi lại response cho client.

## Tạo componet manage users.
Trong thư mục app chúng ta tạo thư mục login với 3 file login.component.ts, login.component.html và login.component.scss giống như thư mục home và thiết kế html, css và định nghĩa sẵn các method sẽ dùng cho công việc của mình.
```javascript
/front/src/app/manage_users/manage_users.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage_users.component.html',
  styleUrls: ['./manage_users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  ngOnInit() {
    this.load();
  }

  constructor() { }

  listUsers = [];
  type = 'Add'
  user = {
    id: '',
    name: '',
    age: '',
    sex: '',
    email: ''
  }

  load() {
    //Code
  }

  submit() {
    if (this.type == 'Add') {
       //code
    }
    else {
       //code
    }
  }

  create() {
    //code
  }

  update(id) {
     //code
  }

  delete(id) {
    //code
}

```

```html
/front/src/app/manage_users/manage_users.component.html

<div><h3>MANAGE USERS</h3>

<div>
  <div>
    <span class="title">ID</span>
    <input type="text" name="" [(ngModel)]="user.id" [disabled]="type == 'Edit'">
  </div>
  <div>
    <span class="title">Name</span>
    <input type="text" name="" [(ngModel)]="user.name">
  </div>
  <div>
    <span class="title">Age</span>
    <input type="text" name="" [(ngModel)]="user.age">
  </div>
  <div>
    <span class="title">Sex</span>
    <input name="sex" type="radio" value="Male" [(ngModel)]="user.sex"> Nam
    <input name="sex" type="radio" value="Female" [(ngModel)]="user.sex"> Nu
  </div>
  <div>
    <span class="title">Email</span>
    <input type="text" name="" [(ngModel)]="user.email">
  </div>
  <button (click)='load()'>Refresh</button>
  <button (click)='create()'> New user</button>
  <button (click)='submit()'>Submit</button>
</div>
<div class="list-users">
  <table class="table table-hover">
    <thead>
      <tr class="table-title">
        <td>Id</td>
        <td>Name</td>
        <td>Sex</td>
        <td>Age</td>
        <td>Email</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of listUsers">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.sex == 'Male' ? 'Nam' : 'Nu'}}</td>
        <td>{{user.age}}</td>
        <td>{{user.email}}</td>
        <td><button (click)='update(user.id)'>Update</button><button (click)='delete(user.id)'>Detele</button></td>
      </tr>
    </tbody>
  </table>
</div>
```
```css
/front/src/app/manage_users/manage_users.component.scss

.title {
  display: inline-block;
  width: 50px;
  margin-bottom: 5px;
}

button {
  padding: 5px;
  margin: 5px;
}
```
Thêm 1 route cho trang manage users (url định nghĩa ở angular 2 và ở python phải giống nhau)
```javascript
/front/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage_users/manage_users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: ManageUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
 ## Tạo service xử lý request và nhận response từ server.
Từ thư mục app chúng ta tạo thư mục `services` và file users.service.ts để xử lý những gì liên quan đến user. Trong service này cũng sẽ chứa các phương thức tương ứng với các chức năng CRUD.
```javascript
/front/src/app/services/users.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get<any>('api/all_users');
  }

  deleteUser(id) {
    var params = {id: id}
    return this.http.post<any>('api/delete_user', params);
  }

  addUser(id, name, sex, age, email) {
    var params = {
      id: id,
      name: name,
      sex: sex,
      age: age,
      email: email
    }
    return this.http.post<any>('api/add_user', params);
  }

  updateUser(id, name, sex, age, email) {
    var params = {
      id: id,
      name: name,
      sex: sex,
      age: age,
      email: email
    }
    return this.http.post<any>('api/update_user', params);
  }
}
```
Thêm một vài module và componet vừa tạo vào file app.module (Chức năng của các module này các bạn có thể tham khảo trên google nhé).
```javascript
/front/src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage_users/manage_users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
 ## Tạo API.
 Trước tiên chúng ta tạo 1 file `config.py` và định nghĩa các kiểu response trả về cho client. Chúng ta có thể tham khảo thêm các mã lỗi thông dụng và cũng có thể tự định nghĩa  thêm các mã lỗi riêng để phục vụ cho 1 vài công việc cụ thể sau này.
 ```
 /server/config.py
 
 class Response(object):

  SUCCESS = {'code': 200, 'message': 'Success.'}
  ERROR = {'code': 500, 'message': 'Fail.'}
  NOT_FOUND = {'code': 404, 'message': 'Not found.'}

  def __init__(self):
    self.code = 0
    self.message = ''
    self.data = {}

  def create(self, params, data={}):
    self.code = params['code']
    self.message = params['message']
    self.data = data
 ```
 Sau đó trong file `app.py` chúng ta thêm 1 vài thư viện và định nghĩa các api cho nó. Ở bài viết này mình tạm quản lý danh sách user trên một array có tên là list_users (Ở các bài viết tiếp thì mình sẽ hướng dẫn cách kết nối dynamodb và chúng ta sẽ thao tác trực tiếp trên db đó).
 ```
 /server/app.py
 
import flask
import json
from flask import Flask, make_response, request
from config import Response

app = Flask(__name__, static_folder="../front/dist/front", static_url_path="")
list_users = [
  {'id': 1, 'name': 'Nguyen Van A', 'sex': 'Male', 'age': 20, 'email': 'mail_a@gmail.com'},
  {'id': 2, 'name': 'Hoang Anh B', 'sex': 'Male', 'age': 28, 'email': 'mail_b@gmail.com'},
  {'id': 3, 'name': 'Nguyen Thi C', 'sex': 'Female', 'age': 31, 'email': 'mail_c@gmail.com'},
  {'id': 4, 'name': 'Pham Thanh D', 'sex': 'Male', 'age': 22, 'email': 'mail_d@gmail.com'}
]
@app.route('/')
def hello_world():
  return "Hello world."

@app.route('/users')  //Mình thêm route có url là /users chính là url của trang manage users và được định nghĩa giống như trên angualr 2
@app.route('/home')
def home():
  return make_response(open('../front/dist/front/index.html').read())


@app.route('/api/all_users')
def all_users():
  response = Response()
  response.create(Response.SUCCESS)
  response.data = list_users
  return flask.jsonify(json.dumps(response.__dict__))


@app.route('/api/add_user', methods=['POST'])
def add_user():
  response = Response()
  params = json.loads(request.data)
  if check_index(params['id']):
    response.create(Response.ERROR)
    response.data = 'Id have exist.'
  else:
    list_users.append(params)
    response.create(Response.SUCCESS)
    response.data = 'Created user.'
  return flask.jsonify(json.dumps(response.__dict__))

@app.route('/api/update_user', methods=['POST'])
def update_user():
  response = Response()
  params = json.loads(request.data)
  for user in list_users:
    if user['id'] == params['id']:
      user['name'] = params['name']
      user['age'] = params['age']
      user['sex'] = params['sex']
      user['email'] = params['email']
      break
  response.create(Response.SUCCESS)
  response.data = 'Update success.'
  return flask.jsonify(json.dumps(response.__dict__))

@app.route('/api/delete_user', methods=['POST'])
def delete_user():
  params = json.loads(request.data)
  del list_users[check_index(params['id'])]
  response = Response()
  response.create(Response.SUCCESS)
  response.data = 'Delete success.'
  return flask.jsonify(json.dumps(response.__dict__))

def check_index(id):
  for index, user in enumerate(list_users):
    if user['id'] == id:
      return index
  return False;

if __name__ == '__main__':
  app.run()
 ```

## CRUD method.
Vậy là mọi thứ cơ bản nhất đã xong. Tiếp theo chúng ta sẽ thực hiện các method đã định nghĩa trong component manage_user được tạo ra ở bước 1.
```javascript
/front/src/app/manage_users/manage_users.component.ts

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage_users.component.html',
  styleUrls: ['./manage_users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  ngOnInit() {
    this.load();
  }

  constructor(private usersService: UsersService) { }

  listUsers = [];
  type = 'Add'
  user = {
    id: '',
    name: '',
    age: '',
    sex: '',
    email: ''
  }

  load() {
    this.usersService.getAllUsers().subscribe(response => {
      var result = JSON.parse(response);
      this.listUsers = result.data
    });
  }

  submit() {
    if (this.type == 'Add') {
      this.usersService.addUser(this.user.id, this.user.name, this.user.sex, this.user.age, this.user.email).subscribe(response => {
        var result = JSON.parse(response);
        alert(result.data);
        this.load();
      });
    }
    else {
      this.usersService.updateUser(this.user.id, this.user.name, this.user.sex, this.user.age, this.user.email).subscribe(response => {
        var result = JSON.parse(response);
        alert(result.data);
        this.load();
      });
    }
  }

  create() {
    this.type = 'Add';
    this.user = {
      id: '',
      name: '',
      age: '',
      sex: '',
      email: ''
    }
  }

  update(id) {
    this.type = 'Edit'
    var userEdit = this.listUsers.filter(item => item.id == id)[0];
    this.user.id = userEdit.id;
    this.user.name = userEdit.name;
    this.user.age = userEdit.age;
    this.user.sex = userEdit.sex;
    this.user.email = userEdit.email;

  }

  delete(id) {
    this.usersService.deleteUser(id).subscribe(response => {
      var result = JSON.parse(response);
      alert(result.data);
      this.load();
    });
  }
}
```
Và đây là kết quả:
![](https://images.viblo.asia/23c27284-1822-4a7a-bda2-edb5d1df22c8.png)

Để tiện cho các bạn tham khảo mình xin chia sẽ mã nguồn của project lên github và các bạn có thể xem [tại đây](https://github.com/phamthanhluan125/serial2/commit/607cae68b5913eeb0aa02322f91db2a34d7211e6).

Ở bài viết tiếp theo mình sẽ hướng dẫn cách xử lý authentication, session. Cảm ơn các bạn đã đón đọc và rất mong nhận được nhiều phản hồi của tất cả mọi người.