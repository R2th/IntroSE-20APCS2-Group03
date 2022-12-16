Kết thúc chuổi vài viết về chủ đề `Xây dựng ứng dụng web với NodeJS + Express FrameWork + AngularJS` thì hôm nay mình xin triễn khai 1 chủ đề mới đó là `Xây dựng ứng dụng web với Python + Flask Framework + Angular2 + DynamoDB`.
Có lẽ vì thời gian tồn tại và hổ trợ quá ngắn của angular2 nên nó sẽ làm cho nhiều người phải xoắn não khi cần tìm hiểu về nó khi mà các tài liệu của nó cực ít ỏi hay list thư viện nghèo nàn. Mà đôi khi vì Khách Hàng yêu cầu nó nên chúng ta cũng phải căng não ra để tìm tòi và xử đẹp nó.

Ở project này mình chỉ sữ dụng angular2 để build còn lại chỉ dùng 1 server duy nhất đó là flask-python.

Các bạn cần tạo 1 thư mục để chứa dự án của mình. Ở đây mình đặt là ```series2/```
## Cài đặt angular2
Có rất nhiều cách để cài đặt angular2 và ở bài viết này, mình sẽ thực hiện việc cài đặt bằng cách sử dụng angular-cli. 

+ Đầu tiên, máy bạn cần cài đặt npm và nodejs(2 thằng này thì rất đơn giản, mọi người có thể search google hoặc tìm lại ở chuổi series trước của mình nhé)

+ Tiếp đến mình sẽ cài đặt angular-cli bằng cách cd vào thư mục ```series2``` và chạy lệnh : ``` npm install -g @angular/cli ```
+ Cuối cùng là init project angluar2  bằng lệnh: ``` ng new front --style scss ``` (ở đây mình dùng style là scss nếu các bạn muốn dùng css thì có thể sửa lại - cách viết scss và các lợi ích của nó thì mình cũng đã có 2 bài viết nói về nó rồi, các bạn có thể tham khảo [tại đây](https://viblo.asia/p/code-css-chuyen-nghiep-va-don-gian-hon-voi-sass-phan-1-3Q75wyAQZWb) nhé)
+ Chúng ta kiểm tra bằng cách cd vào thư mục /front và chạy lệnh : ```ng serve ``` Sau khi build mất tầm mấy giây thì kết quả sẽ được như hình bên dưới:

![](https://images.viblo.asia/b8a08fa3-c0c2-4ce9-bade-68eaff5756e3.png)

Mở browser lên và truy cập ```http://localhost:4200/``` chúng ta sẽ được kết quả như hình:

![](https://images.viblo.asia/855ebe8b-a780-4cf1-b506-70e4332edf95.png)


## Thiết lập front
+ Chúng ta sẽ tạo 1 component có tên là home gồm 3 file theo fomat như bên dưới
```
#front/src/app/home/home.component.html

<div class="welcome">HOME PAGE</div>
```
```
#front/src/app/home/home.component.scss

.welcome {
  font-size: 20px;
  color: red;
}
```
```
#front/src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() { }
  constructor() { }

}
```
+ Trong file ```front/src/app/app.module.ts``` chúng ta thêm component vừa tạo vào:
```
#front/src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
+ Trong file ```front/src/app/app.component.html``` chúng ta xóa các đoạn html ko cần thiết đi và chỉ để lại dòng lệnh sau:
```
#front/src/app/app.component.html


<router-outlet></router-outlet>
```
+ Định nghĩa 1 route có đường dẫn là ```home``` và nó sẽ chuyển đến component home chúng ta vừa tạo ở trên bằng cách thêm route vào trong file ```front/src/app/app-routing.module.ts ``` theo dạng như bên dưới:
```
#front/src/app/app.component.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

+ Chạy lại server angular2 bằng lệnh `ng serve` và truy cập vào url `localhost:4200/home` chúng ta sẽ thấy kết quả như hình(chạy server angular 2 là để chắc chắn rằng component mình vừa tạo đã hoạt động tốt):
![](https://images.viblo.asia/2af39176-e437-4d45-84c0-26c84868b77e.png)

+ Tại thư mục front chúng ta chạy lệnh `ng build` và sau khi nó hoàn thành chúng ta sẽ thấy trong thư mục front có thêm 1 thư mục `dist`
, đây chính là source mà angular2 đã build ra. Như đã nói ở trên, mình chỉ dùng 1 server `flask-python` duy nhất nên mình sẽ trả source ở trong thư mục này về cho browser.

## Cài đặt Flask framwork
 + Cài đặt python: Các bạn có thể xem [tại đây](https://o7planning.org/vi/11383/huong-dan-cai-dat-va-cau-hinh-python-tren-ubuntu-desktop)
 + Cài đặt pip: Các bạn có thể tham khảo cách cài đặt tùy thuộc vào HĐH của các bạn ở trên google nhé, rất đơn giản thôi.
 + Cài đặt Flask bằng lệnh: ``` pip install Flask ``` (thêm sudo phía trước nếu bị báo lỗi)
 + Chúng ta kiểm tra bằng cách import flask vào và kết quả sẽ được như hình bên dưới:
 
 ![](https://images.viblo.asia/f2c0493a-3476-4238-bfb4-338ce96decfb.png)
 
 
 
 ## Thiết lập server
 + trong thư mục ``` series2 ``` chúng ta tạo thư mục ```/server``` và tạo file ```app.py```trong thư mục vừa tạo rồi thêm các lệnh cơ bản sau:
 ```
 #server/app.py

from flask import Flask

app = Flask(__name__, static_folder="../front/dist/front", static_url_path="")

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
 ```
 Ở đây static_forder chúng ta đang dùng chính resource đã được build bởi angular2 ở trên.
 + Tại thu mục server chúng ta chạy lệnh ``` python app.py ``` để chạy server python. Chúng ta sẽ được kết quả như hình bên dưới:
 
 ![](https://images.viblo.asia/6eca0964-375a-4f76-9cca-be4b50a751b8.png)
 
+  Mở browser lên và chạy url ``` http://127.0.0.1:5000/``` hoặc ```localhost:5000``` chúng ta sẽ được kết quả như hình:
 
 ![](https://images.viblo.asia/871239bb-91dd-422b-959c-e38ffe2cb0af.png)
 
 + Như mình đã nói từ đầu thì mình chỉ dùng angular2 để build front-end nên tại server mình sẽ phải định nghĩa 1 route có url là `/home` để đồng bộ với dưới front. Vì đây là single-page nên chúng ta chỉ cần trả về đúng trang index sau khi angular build là được. Chúng ta sẽ thêm vào file app.py như sau:
 ```
 #server/app.py
 
 from flask import Flask

app = Flask(__name__, static_folder="../front/dist/front", static_url_path="")

@app.route('/')
def hello_world():
  return "Hello world."

@app.route('/home')
def home():
  return make_response(open('../front/dist/front/index.html').read())

if __name__ == '__main__':
  app.run()
 ```
 
 + Chúng ta khởi động lại server flask rồi sau đó mở url `localhost:5000/home` chúng ta sẽ nhận được kết quả như hình:
 ![](https://images.viblo.asia/04c3b687-3b9c-40f8-a43b-29e9a941a8bc.png)
 
 + Để thực hiện công việc build front và chạy server cho thuận tiện về sau bằng cách tại thư mục server chúng ta tạo file sh có tên là reboot.sh với nội dung như sau:
 ```
 #server/reboot.sh
 
 #!/bin/sh
cd ../front
ng build
cd ../server
python app.py
 ```
 
 Bây giờ sau khi thay đổi code bạn chỉ cần vào thư mục server và chạy lệnh `sh reboot.sh` là xong.

 Ở bài viết tiếp theo mình xin hướng dẫn tạo trang CRUD cơ bản. Cảm ơn các bạn đã đón đọc và rất mong nhận được góp ý của tất cả mọi người.