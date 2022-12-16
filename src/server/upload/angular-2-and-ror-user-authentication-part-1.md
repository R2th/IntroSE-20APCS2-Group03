Chào các bạn, hôm nay chúng ta cùng nhau tìm hiểu cách viết Authenticate bằng Angular 2 và Rails nhé. 

Bài viết sẽ được dịch từ: https://hackernoon.com/angular-2-and-ruby-on-rails-user-authentication-part-2-a0c40f427145

# Giới thiệu
Về phần giao diện, app sẽ được chia làm 3 phần nhỏ:
1. Khởi tạo, cấu hình và sử dụng bootstrap cho app.
2. Làm chức năng Login/ Register.
3. Xây dựng Profile View và Router.

Trong bài viết này, chúng ta sẽ khởi tạo, cấu hình và sử dụng bootstrap cho app bằng Angular CLI, Materialize cho UI và Angular2Token để quản lý User trên frontend.
# Layout
Về layout thì chia làm 2 phần: Toolbar và Content - **Xem hình mô tả bên dưới.**
* Toolbar thì bao gồm: Title và Actions (để Login/ Register).
* Content để hiển thị nội dung tương ứng.

![](https://images.viblo.asia/b5a67485-e0b9-471b-9eb5-2cc920751252.png)

# Application behaviour
Khi truy cập vào sẽ hiển thị: 
* Chưa login: Hiển thị Welcome... ở phần `Content`, phần `Actions` sẽ hiển thị button `Login & Register`.
* Đã login: Hiển thị `Show profile & Logout`.

Khi user click vào `Login & Register` thì bật modal tương ứng lên, đối với `Show profile & Logout` thì hiển thị profile ở phần `Content`.


![](https://images.viblo.asia/393f333a-c036-4fd8-a609-4ff87706b835.png)


Cơ bản là như vậy, giờ đến phần khởi tạo app và phần giao diện.

# Bootstrapping and configuring the frontend
## Installing Angular CLI

Để raise app bằng Angular thì cách nhanh và OK nhất là sử dụng Angular CLI, nên giờ ta cài đặt nó nhé:

```
npm install -g @angular/cli
```

## Bootstrapping an Angular CLI project
Khi đã cài đặt Angular CLI xong thì chạy câu lệnh dưới để tạo app:
```
ng new report-token-auth 
```

## Use MaterializeCSS with Angular

Như đã giới thiệu, bài viết này sẽ sử dụng MaterializeCSS để làm giao điện (tham khảo thêm tại: https://materializecss.com/).

Materialize đã viết sẵn components để sử dụng với Angular 2 rồi, ta cài đặt bằng câu lệnh sau:

```
cd report-token-auth
npm install materialize-css angular2-materialize jquery@^2.2.4 hammerjs font-awesome --save
```

Nếu các bạn sử dụng Angular 6.0.0 thì sẽ không có file `./angular-cli.json` mà đã được thay thế bằng file `./angular.json`,

do vậy tùy phiên bản thì các bạn add các dòng code sau vào file tương ứng như hình dưới:

```
# ./angular.json hoặc ./angular-cli.json
"styles": [
  "styles.sass",
  "./node_modules/materialize-css/dist/css/materialize.css",
  "./node_modules/font-awesome/css/font-awesome.css"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/hammerjs/hammer.js",
  "./node_modules/materialize-css/dist/js/materialize.js"
]
```

![](https://images.viblo.asia/d48614d6-8e7f-46c5-8ba8-d4f398f9a3b0.png)

Sau khi đã thêm các dòng code như trên thì ta mở file `./src/app/app.module.ts` và thêm `MaterializeModule` vào như sau:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

![](https://images.viblo.asia/0919b267-3d72-47e8-9990-c958924b3af1.png)

Xong rồi thì ta nên kiểm tra lại xem phần setup đã ổn chưa, giờ thì mở Terminal lên và chạy thử nhé:

```
cd ~/report-token-auth
ng-serve
```

Nhớ bật F12 lên và xem qua log trong Terminal để kiểm tra lỗi nhé các bạn, nếu không có lỗi gì thì OK rồi, ta tiếp tục.

![](https://images.viblo.asia/849e4cfa-26bc-478c-9988-2468a3fd3d48.png)

## Installing and Configuring Angular2 Token

Để quản lý user trên frontend dễ dàng hơn, chúng ta sử dụng thư viện angular2-token, được tạo ra để sử dụng cùng với DeviseAuthToken gem mà chúng ta sử dụng ở phần backend.

Về phần backend thì các bạn có thể tham khảo link sau và tự làm: https://medium.com/@avatsaev/angular-2-and-ruby-on-rails-user-authentication-fde230ddaed8

hoặc sử dụng luôn API của mình để demo tạm trước rồi sau đó tự làm sau: https://d2-forever-my-api.herokuapp.com/

Cài đặt với cú pháp sau:
```
npm install angular2-token --save
```

Sau khi install xong thì thêm nó vào file `./src/app/app.module.ts`:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Tiếp theo mở thư mục `./src/environments/environment.ts` và thêm đoạn code sau để kết nối với cổng 3000 của API:
```
export const environment = {
  production: false,
  token_auth_config: {
    apiBase: 'http://localhost:3000' 
    # Nếu các bạn chưa có API ở localhost:3000 thì sẽ thay thế bằng 'https://d2-forever-my-api.herokuapp.com/' nhé
    # Tức là thay dòng trên thành: apiBase: 'https://d2-forever-my-api.herokuapp.com/'
  }
};
```

Nhớ kiểm tra log trên Terminal và F12 nhé các bạn.

## Initialize Angular2Token

Giờ chúng ta cần khởi tạo Token Service với cấu hình trên, mở file `./src/app/app.component.ts` và import `Angular2TokenService` và `environment` vào:
```
import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

Sau đó thêm phần khởi tạo key vào cho AppComponent như sau:
```
import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Title';
  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);
  }
}
```

![](https://images.viblo.asia/d9b3a3b9-d4dd-4ac0-95d0-4380e82440a8.png)

## Testing the Token Service

Bây giờ ta thử test xem đã có thể authenticate bằng client được hay chưa bằng tài khoản:

`{email: "user@gmail.com", password: "password123"}` - Đối với các bạn tự tạo API thì sử dụng tài khoản tự tạo của các bạn nhé

```
import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Title';
  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);

    this.authToken.signIn({email: "user@gmail.com", password: "password123"}).subscribe(
      res => {
        console.log('auth response:', res);
        console.log('auth response headers: ', res.headers.toJSON());
        console.log('auth response body:', res.json());
      },
      err => {console.log('Auth error: ', err)}
    )
  }
}
```

![](https://images.viblo.asia/f7dc72b0-e954-40af-b4f3-d3692c950c81.png)

Bây giờ bạn tắt server chạy lại để kiểm tra thử OK không, nếu xuất hiện data trả về và các log như hình thì OK nhé:

![](https://images.viblo.asia/27dcfba9-bf5a-40a2-9ec1-6f84675a810d.png)

Hiện tại thì chúng ta đã làm những phần sau:
* Khởi tạo app, import MaterializeCSS vào trong app.
* Gọi API ROR và authenticate bằng Angular 2.

Ở phần này thì phần cốt lõi để authenticate thì đã OK rồi, chỉ còn:

* Mở modal Login/ Register, switch qua lại giữa 2 modal.
* Thêm giao diện.

Hẹn gặp lại các bạn ở phần tiếp theo. Cảm ơn đã theo dõi!