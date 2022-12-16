### React là gì
React là một thư viện javascript để xây dựng giao diện người dụng(UI). Trong mô hinh MVC(Model - View - Controller) nó tương ứng với phần V. Với React, tất cả mọi thứ là component. Sử dụng React, chúng ta có thể truyền dữ liệu phong phú thông qua ứng dụng và chúng ta có thể duy trì trạng thái bên ngoài DOM.
### Tích hợp React với Rails
Hãy chắc chắn rằng bạn đã cài đặt Ruby và Rails trong hệ thống của bạn. Nếu bạn chưa cài đặt, bạn có thể theo [link](https://www.ruby-lang.org/en/documentation/installation/)  này để có hướng dẫn chi tiết để cài đặt Ruby và Rails. Khi bạn đã cài đặt xong, bây giờ bạn có thể bắt đầu tạo ứng dụng rails bằng lệnh sau:
```
$ rails new react_integration
```
Nó sẽ tạo ra 1 ứng dụng Rails trống. Chúng ta có thể tích hợp React với ứng dụng Rail theo cách sau:

* react-rails gem
* react_on_rails gem
* Hyperloop gem

### 1. react-rails gem
gem react-rails là một trong những cách dễ nhất để bắt đầu sử dụng React trong ứng dụng Rails.

Nó dử dụng đường dẫn Ruby on Rails asset để tự động chuyển đổi JSX thành các asset tương thích với Ruby on Rails bằng cách sử dụng  Ruby Babel Transpiler.

Bây giờ thêm gem react-rails vào Gemfile.
```ruby
gem 'react-rails'
```
Sau đó cài đặt gem vơí:
```ruby
bundle install
```
Sau khi cài đặt xong, chúng ta cần chạy tập lệnh cài đặt react-rails bằng rails generator.
```ruby
$ rails generate react:install or rails g react:instal
      create  app/assets/javascripts/components
      create  app/assets/javascripts/components/.keep
      insert  app/assets/javascripts/application.js
      create  app/assets/javascripts/components.js
      create  app/assets/javascripts/server_rendering.js
      create  config/initializers/react_server_rendering.rb
```
Điều này sẽ tạo ra thư mục component trong thư mục app/assets/javascripts, file kê khai và thêm chúng vào file application.js của chúng ta.

Bây giờ chúng ta có thể tạo file react component trong thư mục  app/assets/javascripts/components và lưu nó với đuôi .jxs. Sử dụng lệnh sau chúng ta có thể tạo component của chúng ta.
```ruby
$  rails g react:component articles
create  app/assets/javascripts/components/articles.js.jsx
```
Thêm đoạn code sau đây vào article.js.jsx:
```ruby
var Articles = createReactClass({
  propTypes: {
    articles: [
      {
        title: PropTypes.string,
        author: PropTypes.string
      }
    ]
  },
  render: function() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {this.props.articles.map(article => (
            <tr key={article.title}>
              <td>{article.title}</td>
              <td>{article.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
});
```
Bây giờ chúng ta có thể render react component của mình trong view vs đường dẫn nhưu sau.
```ruby
<%= react_component("Articles", articles: [ { title: "Ruby on Rails", author: "Arjunan" }, { title: "Python", author: "John"}]) %>
```
Phương thức react_component lấy tên component làm đối số thứ nhất và prop là đối số thứ hai.

Để biết thêm chi tiết bạn có thể tham khảo [tại đây](https://github.com/reactjs/react-rails).
### 2. gem react_on_rails
gem react_on_rails cho tích hợp React với Rails. react_on_rails cho phép chúng ta tạo component bằng ES^ và nó sẽ sử dụng các tool javascrip bao gồm cả webpack. Nó sử dụng webpack để biên dịch react component với JS thay vì sử dụng đường dẫn Rails asset. Vì chúng ta có sức mạnh của webpack, chúng ta có thể định cấu hình nó theo yêu cầu của chúng ta nhưng nhược điềm ủa chúng ta cần cài đặt npm và hiểu cách hoạt động của webpack.

Sử dụng npm chúng ta có thể cài đặt thư viện javascrip, thay vì sử dụng gem hoặc tải xuống và thêm thủ công. Để bắt đầu với gem react_on_rails, trước tiên chúng ta cần cài đặt Node.js, gem sử dụng npm để cài đặt thưu viện.

Khi node và npm được cài đặt xong, chúng ta có thể bắt đầu sử dụng gem react_on_rails. Thêm gem vào Gemfile của chúng ta.
```ruby
gem 'react_on_rails', '~> 11.2', '>= 11.2.2'
gem "webpacker"
```
chạy
```ruby
bundle install
```
Sau khi cài đặt hoàn tất, chúng ta cần cài đặt các điều kiện tiên quyết, gem react_on_rails bằng cách sử dụng yarn, foreman và webpack.

Bạn có thể cài đặt yarn [ở đây](https://yarnpkg.com/en/docs/install#windows-stable).

Cài đặt foreman chúng ta cần cài đặt gem foreman.
```ruby
$ gem install foreman
```
react_on_rails bên trong phục thuộc vào foreman để khởi động rails server, khởi động webpack và cấu hình nó để xem và biên dịch các thay đổi jacvascrop. Đối với webpack chúng ta cần chạy hai lệnh sau:
```ruby
$ bundle exec rails webpacker:install
$ bundle exec rails webpacker:install:react
```
Để script react_on_rails hoạt động chúng ta cần commit lại trong git.
```ruby
$ git init
$ git add .
$ git commit -m "Adding react on rails"
```
Tiếp theo chạy lệnh:
```ruby
$ rails generate react_on_rails:install
```
Điều này sẽ tạo ra file Procfile.dev.

Sau đó chạy bundle install để cài đặt Execjs và cài đặt npm để cài đặt javascrip phụ thuộc.
```ruby
$ bundle install && npm install
```
Bây giờ chúng ta có thể chạy server bằng cách sử dụng foreman.
```ruby
$ foreman start -f Procfile.dev
```
Trong khi chạy react_on_rails:install, một component HelloWorld đơn giản đã được tạo ra và nó có sẵn trong thư mục app/javascript/bundles. Bây giờ chúng ta có thể truy cập http://localhost:3000/hello_world .

Để biết thêm chi tiết, bạn có thể tham khảo [tại đây](https://github.com/shakacode/react_on_rails).
### 3. Hyperloop
Mục tiêu chính của Hyperloop là xây dựng các ứng dụng web hiện đại một cách nhanh chóng. Điều này cho phép chúng ta tạo thành phần ứng dụng bằng cách sử dụng code ruby. Các mô hình logic và domain model giống nhau chạy trên máy khách và máy chủ.

Hyperloop được tích hợp hoàn toàn với Rails và cung cấp cho bạn quyền truy cập hoàn toàn vào không gian của thư viện javascrip(bao gồm React) từ trong code Ruby của bạn. Hyperloop cho phép bạn xây dựng giao diện người dùng tương tác tốt đẹp với Ruby.

Hyperloop đã được thử nghiệm với Rails(~> 4.2), Rails (~>5.2) và Rails (5.1.0). Đối với Rails (5.1.0), vẫn còn một vài điểm cần biết về Hyperloop và Rails(~5.1.0)
### Setup
Thêm gem hyperlopp vào Gemfile:
```ruby
gem 'hyperloop'
```
chạy
```ruby
bundle install
```
Sau khi cài đặt hoàn thành, chúng ta chạy rails generator:
```ruby
$ rails g hyperloop:install
```
Nó sẽ tạo cấu trúc hyperloop bên trong thư mục /app.
```ruby
create  app/hyperloop/components/
create  app/hyperloop/operations/
create  app/hyperloop/stores/
create  app/hyperloop/models/
create  app/policies/application_policy.rb
```
Và cập nhật file app/assets/javascripts/application.js của bạn, thêm:
```ruby
 //= require hyperloop-loader
```
Bây giờ chúng ta có thể kiểm tra hyperloop bằng cách tạo Article Component bằng cách chạy hyperloop generator.
```ruby
$ rails g hyper:component Article
create  app/hyperloop/components/article.rb
```
Nó sẽ tạo ra article.rb dưới  app/hyperloop/components.

Bây giờ chúng ta thêm router vào routers.rb
```ruby
get 'article' => 'hyperloop#article', as: :article
```
Bây giờ bắt đầu chạy ứng dụng của chúng ta
```ruby
rails server
```
Truy cập http://localhost:3000/articl nó sẽ hiển thị component mới được tạo ra. Để biết thêm chi tiết, bạn có thể tham khảo trang web [hyperloop](http://ruby-hyperloop.org/).
### Kết luận
Như vậy ta có 3 cách để tích hợp React vs Rails.

link tham khảo: https://www.agiratech.com/integrate-rails-with-react-webpacker-hyperloop-gem-guide/