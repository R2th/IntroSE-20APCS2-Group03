# 1.Giới thiệu
Xin chào các bạn, hôm nay mình sẽ giới thiệu cho các bạn một kỹ thuật đó là đánh số thứ tự (index) trong một danh sách bản ghi khi kết hợp với phân trang. Đây là kỹ thuật tuy đơn giản, nhưng đối với những bạn mới làm quen với ngôn ngữ ruby thì chắc còn gặp phải một chút khó khăn.
# 2. Hướng dẫn cài đặt
Đầu tiên chúng ta thêm gem phân trang trong Gemfile
``` ruby
gem  "bootstrap-will_paginate", "1.0.0"
```
vào sau đó
``` ruby
rails bundle install
```
Mình sẽ tạo ra một model User với các trường name, age, email và address, sau đó chạy migrate
``` ruby
rails g model User name:string age:integer email:string address:string
rails db:migrate
```
Bây giờ chúng ta sẽ tạo dữ liệu để đổ vào model vừa tạo ra bằng cách thêm trong file seeds.rb ở folder db. Ở đây mình thêm 20 bản ghi như sau.
``` ruby
puts "Create user"
20.times do |n|
  User.create(
    name: "Nguyễn Văn A #{n+1}",
    age: 18,
    email: "email#{n+1}@gmail.com",
    address: "Ha Noi"
  )
end
```
Sau đó chạy lệnnh này 
``` rails db:seed ```
<br />Tiếp theo mình sẽ tạo controller cho User, các bạn chú ý Users phải là số nhiều nhé
``` ruby
rails g controller Users index
```
Mở  ```users_controller.rb``` trong thư mục controllers và sửa thành như sau:
``` ruby
class UsersController < ApplicationController
  def index
    @users =User.page(params[:page]).per_page 10
  end
end
```
Trong đoạn code trên mình phân trang để hiển thị 10 users trên một trang. Các bạn có thể thay đổi số lượng users muốn hiển thị trên một trang bằng cách sửa lại sô 10 ở trên.<br />
Bạn tìm đến``` file index.html.erb``` trong ```views/users``` và thêm code sau:
``` html(rails)
<h1 class="text-center" style="color: red;">Users list</h1>
<div class="col-md-10 col-lg-offset-1">
  <table class="table text-center" style="border: 2px solid black;">
    <tr class="bg-primary">
      <th class="text-center col-md-1">index</th>
      <th class="text-center col-md-3">name</th>
      <th class="text-center col-md-2">Age</th>
      <th class="text-center col-md-3">Email</th>
      <th class="text-center col-md-3">Address</th>
    </tr>
      <% @users.each_with_index do |user, index| %>
        <tr class="bg-success">
          <td><%= index %></td>
          <td scope="row"><%= user.name %></td>
          <td scope="row"><%= user.age %></td>
          <td scope="row"><%= user.email %></td>
          <td scope="row"><%= user.address %></td>
        </tr>
      <% end %>
  </table>
  <%= will_paginate @users %>
</div>

```
Các bạn chú ý mình sử dụng ```each_with_index``` thay cho ```each``` như bình thường là để lấy thêm index của vòng lặp
Chúng ta gọi thêm hàm helper will_paginate với tham số là @users để tạo các thẻ <a> dẫn tới từng trang cụ thể.<br/>
Các bạn có thể thấy như ở đây
![](https://images.viblo.asia/3307f84b-7697-4b03-8e74-f2643178a271.png)
![](https://images.viblo.asia/08b30a3d-2ccc-44e8-8334-5c502bc8c794.png)
Như các bạn đã thấy, chỉ số ở cột index chính là nhờ  ```each_with_index``` đó. Nhưng nó lại gặp một vấn đề đó là khi mình chuyển sang trang 2 thì cột index vẫn lại bắt đầu từ 0. Vậy làm thế nào để index tiếp tục tăng theo các trang trước???
Để xử lý trường hợp này ta làm như sau <br />
Đầu tiên trong ```file users_helper.rb``` ta thêm code sau
``` ruby
module UsersHelper
  def create_index params_page, index, per_page
    params_page = 1 if params_page.nil?
    (params_page.to_i - 1) * per_page.to_i + index.to_i + 1
  end
end
 ```
Ở đây ```params_page``` chính là ```params[:page]``` là số trang hiện tại. nó được hiển thị ở thanh url “http://localhost:3000/users/index?page=2” ở đây params_page = 2. 
Còn số ```per_page``` là số lượng users hiển thị trên 1 trang mà mình đã cài đặt ở phần cài đặt trong users_constroller.rb là bằng 10
và ```index``` là chỉ số được lấy từ ```each_with_index``` trong file index.html.erb
Trong trường hợp ```params_page = nil``` như hình 1 đó, thì mình gán cho nó bằng 1 sau đó sử dụng công thức như trên.<br />
Tiếp theo mình sẽ gọi hàm ```create_index``` và truyền tham số tương ứng ở ```file index.html.erb``` như sau
``` html(rails)
<h1 class="text-center" style="color: red;">Users list</h1>
<div class="col-md-10 col-lg-offset-1">
  <table class="table text-center" style="border: 2px solid black;">
    <tr class="bg-primary">
      <th class="text-center col-md-1">index</th>
      <th class="text-center col-md-3">name</th>
      <th class="text-center col-md-2">Age</th>
      <th class="text-center col-md-3">Email</th>
      <th class="text-center col-md-3">Address</th>
    </tr>
      <% @users.each_with_index do |user, index| %>
        <tr class="bg-success">
          <td><%= create_index params[:page], index, 10 %></td>
          <td scope="row"><%= user.name %></td>
          <td scope="row"><%= user.age %></td>
          <td scope="row"><%= user.email %></td>
          <td scope="row"><%= user.address %></td>
        </tr>
      <% end %>
  </table>
  <%= will_paginate @users %>
</div>
```
Và đây là kết quả
![](https://images.viblo.asia/0c831189-fa21-4733-8c88-4b5b27c31f7b.png)
![](https://images.viblo.asia/03d930be-00b4-4b81-9896-d13144302f7e.png)
Vậy là xong rồi đó, chúc các bạn thành công!