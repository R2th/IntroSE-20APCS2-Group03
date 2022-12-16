Chào các bạn chúng ta lại gặp lại nhau trong phần cuối của serie sử dụng JWT trong Laravel 5.5 và Angular 4.

Hôm nay mình sẽ trình bày về các phần còn lại như: `Logout`, `Refresh Token`, `Profile`...

# Phần III: Profile
- Bạn có thế thấy sau khi login, localstorage sẽ có các key và value tương tự như thế này
![](https://images.viblo.asia/594db9e1-b6ea-41c5-ac5d-2f8a45c0bf62.png)

- Và màn hình sau khi login:
![](https://images.viblo.asia/400f8838-704a-4db7-b5c2-d553b4edbe40.png)

- Trong service bạn thêm 1 hàm getUser sau:
```
getUser(): User {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
}
```
- Trong bài trước sau khi login xong thì API có trả ra 1 token và 1 data user và ta đã lưu lại nó vào localStorage, việc bây giờ thì là lôi nó ra sử dụng (cá nhân mình thì thấy không nên trả cả object user mà chỉ nên lấy những field nào mình cần thôi, ví dụ như: name, email,...)
-  Để sự dụng service thì bạn phải gọi service ở nơi show ra view, ở đây mình đặt tại `admin-left-side component` nên mình sẽ viết vào `admin-left-side component.component.ts`.
```
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/services/auth.service';
import { User } from './../../auth/models/user.model';

@Component({
	selector: 'app-admin-left-side',
	templateUrl: './admin-left-side.component.html',
	styleUrls: ['./admin-left-side.component.css']
})
export class AdminLeftSideComponent implements OnInit {
	user : User;
	constructor(
		private authService : AuthService
		) { }

	ngOnInit() {
		this.user = this.authService.getUser();
	}
}
```
- Sau đó bạn có thể gọi user ở file `admin-left-side.component.html` với dạng `{{user.value}}` (value là 1 key trong object user)
```
<style>
  .info a:hover{
    color: green;
    font-size:12px;
  }
</style>
<aside class="main-sidebar">
  <section class="sidebar">
    <div class="user-panel">
      <div class="pull-left image">
        <img src="assets/img/avatar" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p>{{ user.name }}</p>
        <a href="#">Profile</a>
      </div>
    </div>
  </section>
</aside>
```
# Phần IV: Logout
- Trong service bạn thêm 1 hàm logout sau:
```
logout(): void {
    this.httpClient.get(`${environment.api_url}/auth/logout`);
    localStorage.clear();
}
```
Link url request sẽ được map với function tương ứng vào route trong laravel
```
public function logout()
{
    $token = $this->jwtAuth->getToken();
    $this->jwtAuth->invalidate($token);
    return response()->json(['logout']);
}
```
Ở giao diện trên bạn có thể thấy sau khi login vào thì nút logout được đặt ở dashboard, vậy để sử dụng service trên ta sẽ viết file logic ở component chứa view đó, ở đây chúng ta đang đặt ở dashboard nên view bạn sẽ thêm sự kiện `onClick ` vào phần view `<a href="#" (click)="onLogout($event)" class="btn btn-default btn-flat">Sign out</a>` . Còn ở file js ta sẽ thêm đoạn code gọi service logout. Sau khi logout màn hình sẽ redirect sang trang login.
```
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/services/auth.service';
import { Router } from '@angular/router';
declare var AdminLTE: any;

@Component({
	selector: 'app-admin-dashboard1',
	templateUrl: './admin-dashboard1.component.html',
	styleUrls: ['./admin-dashboard1.component.css']
})
export class AdminDashboard1Component implements OnInit {
	constructor(
		private authService : AuthService,
		private routerService: Router
		) { }
	ngOnInit() {
	}
	onLogout(event){
		event.preventDefault();
		this.authService.logout();
		this.routerService.navigate(['auth/login']);
	}
}
```
* Để gọi các serivce này sử dụng lại thì tất nhiên bạn cũng có thể gọi ở trong các component khác thông qua service.
# Phân cuối (Token)
a) Token 
- Như các bạn cũng đã biết, để request lấy api thì client phải gửi cho chúng ta 1 token để xác thực, ở đây chúng ta sử dụng `Bearer ${token}`, sẽ có dạng
```
'headers' : {
    'Authorization' : '`Bearer ${token}`'
}
```
- Vậy chẳng nhẽ cứ request chúng ta sẽ lại viết đọan này lên server??? NOOOOOOOOOOOOOOOOO
- Ở đây chúng ta sẽ tiếp tục sử dụng  [Interceptor](https://angular.io/api/common/http/HttpInterceptor).
- Bạn tạo 1 file `token.intercreptor.ts` nằm trong (auth/intercreptors/token.intercreptor.ts):
```
Most interceptors will transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle(transformedReq).
In rare cases, interceptors may wish to completely handle a request themselves, and not delegate to the remainder of the chain. This behavior is allowed.
```
```
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler):
	Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		const requestUrl: Array<any> = request.url.split('/');
		const apiUrl : Array<any> = environment.api_url.split('/');
		if(token && (requestUrl[2] === apiUrl[2])){
			const newRequest = request.clone({ setHeaders: {'Authorization' : `Bearer ${token}`} });
			return next.handle(newRequest);
		}else{
			return next.handle(request);
		}
	}
}
```    
- Trong providers (app.modules.ts)
```
 providers: [
    ...
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },   
    ],
```
* Bây giờ chúng ta sẽ thử request lên server nhé, bạn còn nhớ ở API còn 1 hàm me() chung ta vẫn chưa sử dụng
```
public function me()
{
    if (!$user = $this->jwtAuth->parseToken()->authenticate()) {
        return response()->json(['error' => 'user_not_found'], 404);
    }
    return response()->json(compact('user'));
}
```
- Bạn tạo them 1 component profile với lệnh ng g c profile --false (đặt trong folder auth)
- Trong service bạn thêm 1 hàm để request lấy api như sau (và bạn có thể thấy chúng ta request không cần truyền token lên vì đã có xử lý của Interceptor)
```
me(): Observable<User>{
    return this.httpClient.get<any>(`${environment.api_url}/auth/me`);
}
```
- Việc còn lại rất đơn giản là trong file js gọi service ra sử dụng 
```
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';

import { AuthService } from './../services/auth.service';
import { User } from './../interfaces/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user : User;

	subScription: Subscription;

	constructor(
		private authService : AuthService
		) { }

	ngOnInit() {
		this.subScription = this.authService.me().subscribe(data=>{
			this.user = data['user'];
		});
	}
	ngOnDestroy(){
		if(this.subScription){
			this.subScription.unsubscribe();
		}
	}
}
```
- HTML (bạn có thể đặt link tùy ý và sử dụng với route `[routerLink]="['/admin/profile']"` được đặt trong thẻ <a></a>)
```
<div class="content-wrapper">
	<section class="content-header">
		<h1>Profile</h1>
		<ol class="breadcrumb">
			<li>
				<a>
					<i class="fa fa-dashboard"></i> Dashboard
				</a>
			</li>
			<li class="active">Profile</li>
		</ol>
	</section>
	<section class="content">
		<div class="row">
			<div class="col-xs-12">
				<ul>
					<li>
						<strong>Nome: </strong>{{user?.name}}</li>
					<li>
						<strong>E-mail: </strong>{{user?.email}}</li>
				</ul>
			</div>
		</div>
	</section>
</div>
```
b) Refresh Token
- Rất rõ ràng, Login thì phải có thời hạn, nhưng chẳng nhẽ cứ hết hạn lại phải logout r lại login? Vậy khi nào chúng ta biết hết hạn? Đó là khí chúng ra request và trả về error với status là `401`.
- Và lại làm việc với `intercreptor`.
Trong folder intercreptors bạn thêm file refreshToken.intercreptor.ts như sau.
```
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 401 && errorResponse.error.error === 'token_expired') {
        const http = this.injector.get(HttpClient);
        return http.post<any>(`${environment.api_url}/auth/refresh`, {})
        .flatMap(data => {
          localStorage.setItem('token', data.token);
          const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.token}`}});
          return next.handle(cloneRequest);
        });
      }
      return Observable.throw(errorResponse);
    });
  }
}
```
và bạn thêm dong này vào providers của app.module.ts để Interceptor này được hoạt động
```
{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
```
# Tổng kết
Vậy là phần trình `JWT with Laravel 5.5 and Angular 4` của mình đã xong, hiện tại WebApp đang trở nên vô cùng phổ biến nên việc liên kết api trở nên quan trọng hơn bao giờ hết. Khi trong quá trình làm series này mình cũng đã làm dự án với Reactjs - với các chức năng đầy đủ hơn thế này rất nhiều. Hi vọng có thể chia sẻ với các bạn trong các bài viết sắp tới. Cảm ơn các bạn đã theo dõi trong những bài viết dầu tiên của minh. Bạn có thể tải source code này trên [github](https://github.com/sonhip94/JWT_Angular4_Laravel)