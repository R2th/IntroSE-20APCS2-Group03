Tiếp tục cho phần xác thực ở client nhé.
# II. Client
## 1. Thêm hàm login/logout và thực hiện request lên server.
Trong file `user.service.ts` chúng ta định nghĩa 2 hàm login/logout và gọi lên api mà đã được định nghĩa ở bước trên:
```
/front/src/app/services/users.service.ts

 login(email, password) {
    var params = {
      email: email,
      password: password
    }
    return this.http.post<any>('api/login', params);
  }

  logout() {
    return this.http.get<any>('api/logout');
  }
```
## 2. Định nghĩa service auth để xử lý authentication.
```
/front/src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// class này sẽ kiểm tra việc user đã được đăng nhập hay chưa bằng biết trong localStorage. Nếu chưa đăng nhập nó sẽ chuyển đến trang login.(dùng cho trường hợp người dùng truy cập vào trang yêu cầu login khi chưa login login)
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

// class này sẽ kiểm tra việc user đã được đăng nhập hay chưa bằng biết trong localStorage. Nếu đã đăng nhập nó sẽ chuyển đến trang user (dùng cho trường hợp người dùng truy cập vào trang login khi đã login)
@Injectable({
  providedIn: 'root'
})
export class LoggedIn implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/users']);
            return false;
        }
        return true;
    }
}

//Hàm này sẽ được gọi để  kiểm tra response được server trả về  xem thử có bị NOT AUTHENTICATION không trước khi thực hiện các công việc khác. (trường hợp hết hạn session hoặc user đó bị khóa hay bị xóa bởi admin)
@Injectable({
  providedIn: 'root'
})
export class CheckAuthentication {
    constructor(private router: Router) { }
    check(response) {
        var data = JSON.parse(response.replace(/NaN/g, 'null'));
        if (data.code == 601) {
            localStorage.removeItem('currentUser')
            this.router.navigate(['/login']);
            return true;
        }
        return false;
    }
}
```
Như mình đã đề cập ở hàm thứ 3. Chúng ta sẽ phải sửa lại toàn bộ các function gọi api lên server trong các component và kiểm tra response trước khi làm các công việc khác. Ví dụ với component  `manage_users` mình sẽ sửa lại như sau:
```
front/src/app/manage_users/manage_users.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CheckAuthentication } from '../services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage_users.component.html',
  styleUrls: ['./manage_users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  ngOnInit() {
    this.load();
  }

  constructor(
    private usersService: UsersService,
    private checkAuthentication: CheckAuthentication,
    private router: Router
  ) { }

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
      if (this.checkAuthentication.check(response)) { return; }
      else {
        var result = JSON.parse(response);
      this.listUsers = result.data
      }
    });
  }

  submit() {
    if (this.type == 'Add') {
      this.usersService.addUser(this.user.id, this.user.name, this.user.sex, this.user.age, this.user.email).subscribe(response => {
        if (this.checkAuthentication.check(response)) { return; }
        else {
          var result = JSON.parse(response);
          alert(result.data);
          this.load();
        }
      });
    }
    else {
      this.usersService.updateUser(this.user.id, this.user.name, this.user.sex, this.user.age, this.user.email).subscribe(response => {
        if (this.checkAuthentication.check(response)) { return; }
        else {
          var result = JSON.parse(response);
          alert(result.data);
          this.load();
        }
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
      if (this.checkAuthentication.check(response)) { return; }
      else {
        var result = JSON.parse(response);
        alert(result.data);
        this.load();
      }
    });
  }
   
   //Chức năng logout
  logout() {
    this.usersService.logout().subscribe(response => {
      if (this.checkAuthentication.check(response)) { return; }
      else {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    });
  }
}
```
À. Chúng ta sẽ thêm 1 button logout ở trang HTML mà gọi đến function logout như mình đã định nghĩa ở trên để làm chức năng đăng xuất luôn nhé.

## 3. Thêm component login.
Chúng ta sẽ thêm component login với 3 file lần lượt như sau:
```
/front/src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl = '';

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  constructor(
    private usersService: UsersService,
    private router: Router,

  ) { }

  user_mail = '';
  password = '';


  login() {
    this.usersService.login(this.user_mail, this.password).subscribe(response => {
      var result = JSON.parse(response);
      if (result.code == 200) {
        localStorage.setItem('currentUser', JSON.stringify({email: this.user_mail}));
        this.router.navigate([this.returnUrl]);
      }
      else {
        alert('Email or password wrong!!!');
      }
    });
  }
}
```
```
/front/src/app/login/login.component.scss

.title {
  display: inline-block;
  width: 70px;
  margin-bottom: 5px;
}

button {
  padding: 5px;
  margin: 5px;
}
```
```
/front/src/app/login/login.component.html

<div><h3>LOGIN</h3>

<div>
  <div>
    <span class="title">Email</span>
    <input type="text" name="" [(ngModel)]="user_mail">
  </div>
  <div>
    <span class="title">Password</span>
    <input type="password" name="" [(ngModel)]="password">
  </div>
  <button (click)='login()' [disabled]="user_mail.length == 0 || password.length == 0">Login</button>
</div>
```

## 4. Cập nhật lại routing cho các component.
Chúng ta sẽ thêm component login vào và truyền thêm tham số `canActivate` cho các route để nó thực hiện check authentication trước khi thực hiện việc load trang.
```
/front/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage_users/manage_users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard, LoggedIn } from './services/auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedIn]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# III. Kết quả
Chúng ta mở terminal lên cd vào thư mục server và thực hiện build+run server bằng lệnh `sh reboot.sh`.
Sau đó mở browser lên và truy cập vào các url như  /home hoặc /users thì trình duyệt sẽ tự động chuyển về trang login.

Sau khi login mà chúng ta lại truy cập vào url /login thì nó sẽ chuyển qua trang /users.

Khi phiên làm việc của session hết (như mình thiết lập ở trên là 10p) thì khi có thực hiện thao tác nào lên server để lấy dữ liệu thì trình duyệt cũng sẽ chuyển sang trang login.

Vậy là mình đã hướng dẫn xong các authentication, cảm ơn các bạn đã đón đọc. Nếu có bất kỳ thắc mắc hoặc góp ý gì thì comment giúp mình nhé. 

Các bạn có thể xem source của phần này [tại đây](https://github.com/phamthanhluan125/serial2/commit/71942b5eebda48dd190027beb98e45434e7fd819)