Bài hướng dẫn này sẽ hướng dẫn bạn cách tạo ứng dụng Angular + Rails đơn giản nhất có thể. 
Chúng ta sẽ tạo một ứng dụng Angular, sau đó tạo một ứng dụng Rails, và cuối cùng là làm cho chúng có thể nói chuyện được với nhau.
# Set up
## Tạo ứng dụng Angular
Ứng dụng của chúng ta sẽ tạo có tên `Home Library`, với mục đích là hiển thị bộ sưu tập những cuốn sách riêng tư của một người.

Chúng ta sẽ sử dụng Angular CLI (command-line interface) để tạo ứng dụng Angular. Trước khi chúng ta có thể làm bất cứ điều gì khác, chúng ta cần phải cài đặt Angular CLI. (Nếu bạn chưa cài đặt NPM, bạn cần cài đặt nó trước khi cài đặt Angular CLI.)
```
npm install -g @angular/cli
```
Ứng dụng Angular và Rails sẽ nằm cạnh nhau trong một thư mục. Chúng ta sẽ gọi đây là `get_started`, mặc dù bạn có thể gọi nó là bất cứ điều gì bạn muốn.
```
mkdir getting_started
cd getting_started
```
Đây là lệnh để khởi tạo một ứng dụng Angular:
```
ng new home-library
```
Khi lệnh này kết thúc, cd vào thư mục `home-library` và chạy `ng serve`.
```
cd home-library
ng serve
```
Bạn có thể truy cập http://localhost:4200 và kết quả sẽ giống như ảnh sau:

![](https://images.viblo.asia/e24b284b-7516-42a3-bb28-c9fb88dc1d1a.png)
## Khởi tạo ứng dụng Rails
Bây giờ, hãy mở 1 tab terminal khác, tạo ứng dụng Rails và sau đó tạo database cho nó. (flag –api nghĩa là đây sẽ là ứng dụng Rails chỉ API).
```
cd ..
rails new home_library --api
cd home_library
rails db:create
```
Bây giờ, hãy tạo một resource có tên là `Book`.
```
rails generate scaffold book name:string
rails db:migrate
```
Sau đó, hãy tạo một vài cuốn sách vào trong database của bạn.
```
# db/seeds.rb
 
Book.create!([
  { name: 'Think and Grow Rich' },
  { name: 'Trying Stuff Until it Works' }
])
```
```
rails db:seed
```
# Connect Angular với Rails
Để cho Angular có thể nói chuyện với Rails, máy chủ Rails tất nhiên phải chạy. Hãy bắt khởi động máy chủ Rails.
```
rails s
```
Và nếu bạn truy cập vào http://localhost:3000/books.json, bạn sẽ thấy danh sách book mà chúng ta vừa tạo:

![](https://images.viblo.asia/67cce202-06f3-4a9f-8dec-eb9fa69b80c5.png)

Bây giờ ứng dụng Rails của chúng ta phải cho phép các ứng dụng bên ngoài làm việc được với nó. Bước đầu tiên là uncomment `rack-cors` trong Gemfile.
```
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'
```
```
bundle install
```
Sau đó, hãy tạo `config/initializers/cors.rb` như sau:
```
# config/initializers/cors.rb
 
# Be sure to restart your server when you modify this file.
# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept
# cross-origin AJAX requests.
# Read more: https://github.com/cyu/rack-cors
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
Và đừng quên khởi động lại máy chủ Rails.

Chúng ta sắp xong rồi. Một trong những bước cuối cùng là thêm yêu cầu HTTP từ ứng dụng Angular đến ứng dụng Rails.

Sửa đổi `src/app/app.module.ts`:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Sửa đổi `src/app/app.component.ts`:
```
import { Component } from '@angular/core';
import { Http } from '@angular/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books;
 
  constructor(private http: Http) {
    http.get('http://localhost:3000/books.json')
      .subscribe(res => this.books = res.json());
  }
}
```
Điều này sẽ xử lý việc lấy dữ liệu từ máy chủ Rails. Bây giờ chúng ta cần hiển thị nó lên trang chủ.

Cuối cùng, hãy sửa đổi `src/app/app.component.html`:
```
<h1>
  {{title}}
</h1>
 
<ul>
  <li *ngFor="let book of books">{{ book.name }}</li>
</ul>
```
Bây giờ, hãy refresh trang http://localhost:4200, chúng ta sẽ nhìn thấy tên của 2 cuốn sách ở trang này:

![](https://images.viblo.asia/4cf2924e-3b65-4ffb-8fca-2b002be25fee.png)

# Tổng kết
Đó là những gì trong bài viết này, trong những bày viết sau, chúng ta sẽ tạo một ứng dụng gồm đầy đủ các chức năng CRUD. 
Bài viết được tham khảo tại link [này](https://www.codewithjason.com/getting-started-with-angular-and-rails/).