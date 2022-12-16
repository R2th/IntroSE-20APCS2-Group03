![](https://images.viblo.asia/2beb8306-748e-49c1-addb-d0f5de37b5a7.png)

Rails phiên bản 6 đã ra mắt! Một trong những điều thú vị nhất về bản phát hành mới nhất của Rails là việc đối xử với JavaScript như một công dân hạng nhất. Webpacker mặc định được thêm vào các dự án khởi động với Rails CLI, cùng với hỗ trợ sử dụng Angular, React hoặc Vue. Bây giờ chúng ta sẽ thử tạo 1 ứng dụng Rails đơn giản với sự hỗ trợ của React.
<br><br>
Trước tiên, bạn sẽ muốn đảm bảo rằng bạn cập nhật lên Rails 6. Bạn sẽ cần cài đặt Ruby 2.5 trở lên: nhập `ruby -v` vào màn hình terminal để xem bạn đang làm việc với phiên bản nào. Mình sử dụng RVM nên để cài đặt phiên bản chỉ định mà mình muốn mình sẽ sử dụng câu lệnh `rvm install 2.6.3`. Tiếp theo là update Rails CLI: `gem update rails`. Bây giờ bạn thử nhập `rails -v` trong màn hình terminal để kiểm tra phiên bản Rails xem chúng ta đã có `Rails 6.0.0` hoặc phiên bản cao hơn chưa.
<br><br>
Nếu đã ổn, chúng ta tiến hành tạo mới 1 ứng dụng:
```
rails new PROJECT_NAME -BT --webpack=react
```
Ở câu lệnh trên mình đã thông báo cho rails bỏ qua testing framework , bỏ qua bundling , và cài đặt các dependencies cho React. Điều tiếp theo chúng ta sẽ muốn làm là thêm gem `react-rails`, kết hợp một trình tạo cho các thành phần React vào danh sách tasks Rails có sẵn cũng như cho phép chúng ta thực hiện render phía máy chủ với React. Ok giờ chúng ta thực hiện add gem và đặt project trong sự kiểm soát của git:
```
bundle add react-rails
git add . && git commit -m "initial commit"
```
Trên màn hình terminal nếu bạn nhập `rails g --help` , sẽ thấy 2 câu lệnh được gợi ý mới là: `react:install ` và `react:component`, chúng ta sẽ chạy câu lệnh đầu tiên để cài đặt và nó sẽ sinh ra 1 vài file mới trong project của chúng ta
```
rails g react:install
```
Đó là tất cả những gì chúng ta cần làm để cài đặt. Nếu bạn xem qua `package.json` trong thư mục gốc của dự án, bạn sẽ thấy tất cả các dependencies cần thiết của React như Babel và Webpack đều đã được thêm. Ngoài ra thì câu lệnh trên đã thêm 1 vài dòng vào app/javascript/packs/application.js.
<br>
<br>
Chúng ta sẽ tạo nhanh 1 số dữ liệu để hiển thị bằng React:
```
rails g resource User f_name:string l_name:string
```
Thêm vào db/seeds.rb (sử dụng gem Faker):
```ruby
require 'faker'
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
25.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(f_name: first_name, l_name: last_name)
end
```
Chúng ta cần chạy `rails db:migrate && rails db:seed` để tạo bảng và khởi tạo dữ liệu ảo. Bây giờ chúng ta thử tạo 1 component bằng câu lệnh `rails generate ...` quen thuộc:
```
rails g react:component Users users:array
```
Bằng cách chỉ định users:array , chúng ta nói rằng component sẽ mong đợi một prop gọi users là một mảng. Nếu bạn xem qua tệp đã được tạo, bạn sẽ thấy cài đặt này trong các loại prop.
<br>
<br>
Chúng ta sẽ set up component như sau:
``` ruby
class Users extends React.Component {
  render() {
    return (
      <div>
        <h1>All Users</h1>
        <ul>
          {this.props.users.map(user => (
            <li key={user.id}>{`${user.f_name} ${user.l_name}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
```
Và set up ở users_controller.rb:
```ruby
class UsersController < ApplicationController
  def index
    @users = User.all
    render component: 'Users', props: { users: @users }
  end
end
```
Ok giờ bạn chạy rails s và vào đường dẫn http://localhost:3000/users trong trình duyệt sẽ thấy danh sách tên của tất cả user được hiển thị.
### Tài liệu tham khảo
https://medium.com/swlh/getting-started-with-rails-6-and-react-afac8255aecd