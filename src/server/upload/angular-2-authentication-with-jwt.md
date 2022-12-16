# Intro
Hôm nay mình xin giới thiệu tới các bạn một ví dụ về API Authentication trong Angular 2 sử dụng JWT. Đây là một ví dụ mà mình thấy khá hữu ích trong việc xác thực người dùng trong các ứng dụng web.
# JWT là gì?
JWT là Json Web Token là một tiêu chuẩn mở (RFC 7519) định nghĩa cách thức truyền tin an toàn giữa các thành viên bằng một đối tượng JSON. Thông tin này có thể được xác thực và đánh dấu tin cậy vào nhờ "chữ ký của nó". Phần chữ ký của JWT sẽ được mã hóa lại bằng HMAC hoặc RSA. 
# Setup project
* Install nodejs và npm từ https://nodejs.org/en/download/, bạn có thể kiểm tra versions bạn có bằng cách gõ `node -v` và `npm -v` trong terminal
* Install tất cả package bằng cách gõ `nm install` từ command line trong project.
* Start project bằng cách chạy `npm start` from the command line trong project gốc folder.

Tôi đã sử dụng Angular 2 quickstart project như là nên của project của mình, nó được viết bằng Typescript và sử dụng systemjs để tải cá modules.
Cấu trúc của ứng dụng:
```
*. app
  ** _guards
    *** auth.guard.ts
    *** index.ts
 **_helpers
    ***fake-backend.ts
    ***index.ts
 **_models
    ***user.ts
index.ts
_services
authentication.service.ts
index.ts
user.service.ts
home
home.component.html
home.component.ts
index.ts
login
index.ts
login.component.html
login.component.ts
app.component.html
app.component.ts
app.module.ts
app.routing.ts
main.ts
app.css
index.html
package.json
system.config.js
tsconfig.json
```
# Coding
 **Angular 2 Fake Backend Provider**
 
paths: `/app/_guards/auth.guard.ts`
Guard được sử dụng để ngăn người dùng không có quền truy cập đến các routes bị hạn chế, nó được sử dụng trong  `app.routing.ts`. 
```
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
```
**Fake backend provider**

path: `/app/_helpers/fake-backend.ts`
fake backend giúp ứng dụng chạy khi không có backend api thật. nó sử dụng service $httpBackend cung cấp bởi module ngMockE2E để chặn các requests tạo baỏi angular app và gửi lại response mock/fake.
Nó chứa một mock thực hiện của api end poit /api/authenticate để xác nhận username và password sau đó gửi lại một jwt token giả nếu thành công. Tất cả các request khác được đi qua trực tiếp đến service vì vậy static file như (.js, .html, .css) yêu cầu bởi angular app được cung cập chính xác.
```
// app/_helpers/fake-backend.ts
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
 
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        let testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
 
        // wrap in timeout to simulate server api call
        setTimeout(() => {
 
            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
 
                // check user credentials and return fake jwt token if valid
                if (params.username === testUser.username && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }
 
            // fake users api end point
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: [testUser] })
                    ));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }
 
        }, 500);
 
    });
 
    return new Http(backend, options);
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
```
**Angular 2 user model**

path: `/app/_models/user.ts`
Tạo model cho người dùng là một lớp nhỏ định nghĩa các thuộc tính của người dùng
```
// app/_models/user.ts
export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
```
**Angular 2 authentication service**

Path: `/app/_services/authentication.service.ts`
Authenticaiton service dùng để đăng nhập và đăng xuất ra khỏi ứng dụng, để đăng nhập nó gửi thông tin user đến api và kiểm tra xem nếu có jwt token trong response thì đăng nhập thành công và thông tin chi tiết về user được lưu trong local storage và token được thêm vào http authorization header cho tất cả các request tạo bởi $$ttp serivce. Thuộc tính token được sử dụng bởi các dịch vụ khác trong ứng dụng để thiết lập quyền của các yêu cầu http được thực hiện bảo mật cho.... ( The token property is used by other services in the application to set the authorization header of http requests made to secure api endpoints.)
Thông tin của current user đã đăng nhập hiện tại được lưu trong local storage vì vậy user sẽ có trạng thái đã đăng nhập tùy họ refresh trình duyệt hoặc giữa các sessions của trình duyệt trừ khi đăng xuất. Nếu không muốn cho user giữ trạng thái đăng nhập trong khi refresh/session có thể thay đổi bằng cách dùng phương pháp lưu khác ngoài local storage để giữ thông tin của current user ví dụ như session storage hoặc root scope.
```
// app/_services/authentication.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
```
**Angular 2 User Service**

Path: `/app/_services/user.service.ts`
User service chứa một method để lấy tất cả người dùng từ api.
```
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
}
```

**Home conponent template**

Path: `/app/home/home.component.html`
View mặc đinh cho thành phần home.
```
# /app/views/home.html
<div class="col-md-6 col-md-offset-3">
    <h1>Home</h1>
    <p>You're logged in with JWT!!</p>
    <div>
        Users from secure api end point:
        <ul>
            <li *ngFor="let user of users">{{user.firstName}} {{user.lastName}}</li>
        </ul>
    </div>
    <p><a [routerLink]="['/login']">Logout</a></p>
</div>
```
**Home component**

Path: `/app/home/home.component.ts`
Định nghĩa một thành phần angular 2 để định nghĩa một thành phần lấy tất cả các users từ user service 
```
import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/index';
import { UserService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    users: User[] = [];
 
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
}
```
**Login component template**

Path: `/app/login/login.component,html`
Chứa form đăng nhạp với username và password. nó hiển thị tin nhắn xác thực với trường không hợp lệ khi submit form. Khi submit form thì hàm login() sẽ được gọi
```
<div class="col-md-6 col-md-offset-3">
    <div class="alert alert-info">
        Username: test<br />
        Password: test
    </div>
    <h2>Login</h2>
    <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
            <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
            <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
            <button [disabled]="loading" class="btn btn-primary">Login</button>
            <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    </form>
</div>
```

**Login component**

Path: `/app/login/login.component.ts`
Login component sẽ sử dụng authentication service để đăng nhập và đăng xuất khỏi ứng dụng. nó tự động ghi lại người dùng khi nó khởi tạo (ngOnInit) để trang đăng nhập cũng có thể sử dụng để đăng xuất 
```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
```
App component template
Path: `/app/app.component.html`
Đây là root component template của ứng dụng, nó chứa một router-outlet điều hướng cho hiển thị về nội dũng của mỗi thành phần dựa trên đường dần hiện tại.
```
<div class="jumbotron">
    <div class="container">
        <div class="col-sm-8 col-sm-offset-2">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
```
**App component**

Path: `/app/app.component.ts`
Đây là root component của ứng dụng, nó định nghĩa thẻ gốc của ứng dụng là <app></app> với thuộc tinhs selector.
```
import { Component } from '@angular/core';
 
@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
 
export class AppComponent { }
```
**App module**

Path: `/app/app.module.ts`
App module định nghĩa một root module của ứng dụng cùng với siêu dữ liệu về module.
Đây là nơi để thêm fake backend provider cho ứng dụng. Để chuyển sang một backend thực sự, chỉ cần xóa các nhà cung cấp nằm trong chú thích "//  providers used to create fake backend".
```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
 
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
 
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
 
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
 
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }
```
**App routing**

Path: `/app/app.routing.ts`
app routing định nghĩa dường định tuyến của ứng dụng, mỗi route chứa một đường dẫn và liên kết với các component khác. 
```
import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
```
**Main file**

Path: `/app/main.ts`
Là điểm vào của ứng dụng, nới mà app module được khai báo với các depndencies và chứa các cấu hình và khởi tạo logic khi ứng dụng load lần đầu tiên.
```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 
import { AppModule } from './app.module';
 
platformBrowserDynamic().bootstrapModule(AppModule);
```
# References
http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial