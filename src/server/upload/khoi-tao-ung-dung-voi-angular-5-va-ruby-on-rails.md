Bài viết này mình xin giới thiệu cách tạo 1 ứng dụng giữa Angular 5 và Ruby On Rails.
Nó sẽ có 2 server riêng biệt. phần server sẽ là rails và angular làm nhiệm vụ gửi request để lấy giữ liệu hoặc 1 công việc nào đó.
Rails sẽ chịu trách nhiệm là 1 api. trả về giữ liệu json.
Trước tiên mình sẽ hướng dẫn các bạn cài đặt angular.
# Cài đặt angular
Đầu tiên sẽ cài đặt npm bằng lệnh.
```
sudo apt install npm
```
sau khi cài xong chúng ta tiếp tục cài angular cho máy.
```
npm install -g @angular/cli
```
Vậy là xong phần cài đặt.
# Tiếp theo chúng ta khởi tạo ứng dụng
chạy lệnh để khởi tạo ứng dụng angular
```
ng new demo-angular
```
Chúng ta được cấu trúc thư mục như sau.
![](https://images.viblo.asia/11d8f7d9-b5be-4656-be13-d21c308918b5.png)
Thư mục mà  chúng ta sẽ tương tác nhiều nhất đó là src. nó sẽ tạo sẵn những file view, css cho trang chủ của chúng ta.

Cách chạy server của angular. chỉ cần cd vào thư mục và chạy lệnh ng serve. Đơn giản phải không nào.
```
cd demo-angular
ng serve
```
Đợi server start xog chúng ta thử truy cập vào localhost:4200. Sẽ được kết quả như thế này. tức là server của chúng ta đã hoạt động được.
![](https://images.viblo.asia/20622257-b179-44a4-bf64-5a6d59756b9f.png)
# Khởi tạo ứng dụng rails
Với rails kết hợp thì nó chỉ hoạt động như là api.
```
rails new demo-app --api
```
Phần --api cho thấy đây là ứng dụng chỉ API
Tiếp theo đó là tạo ra 1 vài dữ liệu mẫu và sử dụng angular để get dữ liệu bằng cách gửi request đến rails.
```
rails db:create
rails generate scaffold users name:string email:string
rails db:migrate
```
tạo 1 ít dữ liệu bằng file seed.rb
```ruby
(1..10).each do |i|
	User.create name: "demo name #{i}", email: "demo_#{i}@gmail.com"
end
```
sau đó chạy lệnh 
```rails db:seed```
# Kết nối rails và angular
Chạy server rails bằng lênh ```rails s``` và vào localhost:3000/users.json chúng ta sẽ thấy được những user đã tạo ở file seed trên.
![](https://images.viblo.asia/3db48b3b-d409-4c47-83f0-fba62cad2cae.png)
## Sử dụng CORS để rails cho phép kết nối từ bên ngoài
Chúng ta thêm vào gemfile
```ruby
gem 'rack-cors'
```
và chạy ```bundle install```
gem sẽ sinh ra file cors.rb việc của chúng ta là config cho nó bằng những dòng lệnh sau
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      expose:  ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
## Thực hiện việc request từ angular
Thêm line ```import {HttpModule} from '@angular/http';``` vào app.module.ts.

Mở app.component.ts và chỉnh sửa như thế này.
```
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users;

  constructor(private http: Http) {
    this.http.get('http://localhost:3000/users.json')
      .subscribe(res => this.users = res.json());
  }
}
```
Phần ```this.http.get('http://localhost:3000/users.json')``` sẽ là phần request đến server rails của chúng ta. và response sẽ là những user.

Sau đó chúng ta sửa lại view 1 chút nữa ở file ```app.component.html```
```
<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>User Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of users">
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
    </tr>
  </tbody>
</table>
```
Và thêm 1 chút css để view trông dễ nhìn hơn vào file app.component.css
```
table { 
  width: 750px; 
  border-collapse: collapse; 
  margin:50px auto;
}

tr:nth-of-type(odd) { 
  background: #eee; 
  }

th { 
  background: #3498db; 
  color: white; 
  font-weight: bold; 
}

td, th { 
  padding: 10px; 
  border: 1px solid #ccc; 
  text-align: left; 
  font-size: 18px;
}
```
Đợi server build và chúng ta cùng vào lại localhost:4200 để thấy kết quả.
![](https://images.viblo.asia/24a83f94-2295-4bf6-b8f9-430010fe6d2e.png)
# Kết luận
Qua bài viết giới thiệu trên. Chúng ta cũng có được cái nhìn về 1 ứng dụng giữa Angular 5 và Rails với 2 server riêng biệt. Cảm ơn các bạn đã tham khảo.