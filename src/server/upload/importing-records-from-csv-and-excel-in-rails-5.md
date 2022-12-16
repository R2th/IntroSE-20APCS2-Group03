Đối với lập trình viên Rails thì khi chạy thử các chức năng của chương trình họ thường seed dữ liệu qua file seeds.rb. Tuy nhiên đối với người sử dụng chương trình, đặc biệt đối với các chương trình quản lý (ở đây mình lấy ví dụ là hệ thống quản lý học viên), họ phải nhập dữ liệu thực từ một danh sách có sẵn vào database. Trong rất nhiều hệ thống hiện nay, người dùng có thể thực hiện chức năng này bằng cách import dữ liệu từ file CSV hoặc Excel. Đây là cách làm phổ biến và đơn giản đổi với người sử dụng. Còn đối với vai trò là developer, làm cách nào để chúng ta có thể implement tác vụ này một cách dễ dàng và hiệu quả? Mình xin được giới thiệu một hướng giải quyết như sau. Hãy cùng bắt đầu nhé.
# Khởi tạo project
Mình sẽ tạo một app quản lý học viên để làm ví dụ cho việc import dữ liệu của học viên đăng ký.

```ruby
rails new sms
```

Ta sẽ dựng một model **students** đơn giản với các thuộc tính như sau
```ruby
rails g model Student name email score:integer
```
Migrate dữ liệu
```ruby
rails db:migrate
```
Tiếp theo ta tạo controller tương ứng StudentController
```ruby
rails g controller Students index
```
Trong đó index liệt kê ra tất cả các học viên trong hệ thống
```ruby
class StudentsController < ApplicationController
  def index
    @students = Student.all
  end
end
```
Khởi tạo view cho trang index (chứa danh mục học viên). Để cho đơn giản thì mình chỉ tạo view cho phép hiển thị ra danh sách dưới dạng bảng.
```erb
<%= flash[:notice] %>
<table>
  <thead>
  <tr>
    <th>STT</th>
    <th>Name</th>
    <th>Email</th>
    <th>Score</th>
  </tr>
  </thead>
  <tbody>
  <% @students.each_with_index do |student, index| %>
    <tr>
      <td><%= index %></td>
      <td><%= student.name %></td>
      <td><%= student.email %></td>
      <td><%= student.score %></td>
    </tr>
  <% end %>
  </tbody>
</table>
```
# Gem roo
Bây giờ ta đến với phần chính. Để import được dữ liệu CSV rất đơn giản, ta có thể sử dụng một class có sẵn trong Ruby là **csv** . Tuy nhiên ở đây mình cố gắng đưa ra cách import một file bất kỳ trong các dạng file .csv | .xlsm | .xlsx | .ods. Để làm được điều đó ta sử dụng gem 'roo'. Gem roo hỗ trợ thao tác truy xuất file cho các dạng bảng tính phổ biến như csv, excel, open office, libre office.
## Cài đặt
Bạn có thể cài đặt với RubyGems:

`gem install roo`

hoặc thêm vào Gemfile như sau:

`gem "roo"`

Sau đó chạy **bundle install**
## Áp dụng
Ta viết một class method cho model Student để thực hiện thao tác import
```ruby
class Student < ApplicationRecord
  class << self
    def import_file file
    # file có thể ở dạng file hoặc là path của file đều được xử lý chính xác bởi method open
      spreadsheet = Roo::Spreadsheet.open file
      # lấy cột header (column name)
      header = spreadsheet.row 1
      (2..spreadsheet.last_row).each do |i|
        # lấy ra bản ghi và biến đổi thành hash để có thể tạo record tương ứng
        row = [header, spreadsheet.row(i)].transpose.to_h
        create! row
      end
    end
  end
end
```
Nếu soi vào trong code của **Roo::Spreadsheet.open** bạn có thể thấy nó tạo một đối tượng từ một trong 4 loại extension (csv, xlsm, xlsx hay ods). Tức là bạn có thể handle bất cứ file nào chỉ bằng một dòng code duy nhất. Tiếp đó việc lấy ra dữ liệu để tạo ra record là hoàn toàn dễ dàng. Tuy nhiên trong những dòng code trên có một vấn đề. Mình sẽ đưa ra vấn đề và giải pháp ở phần cuối bài.

Điều tiếp theo cần làm là thêm vào giao diện một nút import, tương ứng với một phương thức import trong controller.
Trong view students/index.html.erb ta thêm
```erb
<div>
  <h4>Import data</h4>
  <%= form_tag import_students_path, multipart: true do %>
    <%= file_field_tag :file %>
    <%= submit_tag "Import" %>
  <% end %>
</div>
```
Về phía students_controler ta thêm phương thức **import**
```ruby
class StudentsController < ApplicationController
  def index
    @students = Student.all
  end

  def import
    Student.import_file params[:file]
    redirect_to root_url, notice: "Data imported"
  end
end
```
Giờ hãy sửa lại một chút phần route
```ruby
Rails.application.routes.draw do
  root to: 'students#index'

  resources :students do
    collection {post :import}
  end
end
```
Tốt rồi, giờ ta có thể chạy server và thử xem hoạt động của chức năng này ra sao
```ruby
rails s
```
À đừng quên tạo sẵn một file .csv hay .xlsx hoặc .ods có dạng như này. Hãy đảm bảo rằng columne names chính là tên thuộc tính của model bạn cần import (ở đây là name, email, score). Trong trường hợp nó có định dạng khác hoặc có chứa các cột khác, bạn sẽ phải tùy chỉnh code phía trên một chút.

![](https://images.viblo.asia/5ffafc0f-1d3e-477a-a82d-341f99b241f2.png)

Sau khi chạy server

![](https://images.viblo.asia/0f73fcfa-d9f5-4c39-96b8-c48e54ebaff1.png)

Hãy chọn lấy một file

![](https://images.viblo.asia/6e5f1d7c-1f31-4c74-a4be-a114ce566781.png)

Đây là kết quả

![](https://images.viblo.asia/5a243593-5c64-4121-934e-42d5aa246222.png)

Hãy thử với những loại file khác bạn sẽ thấy nó cũng hoạt động chính xác. Nếu muốn nó hoạt động đúng như yêu cầu của bạn thì bạn chỉ cần tùy chỉnh một chút phần xử lý code bên model thôi.
# Tối ưu import dữ liệu
Quay trở lại vấn đề mình đã nói, đoạn code ở phía trên có chút vấn đề
```ruby
(2..spreadsheet.last_row).each do |i|
        # lấy ra bản ghi và biến đổi thành hash để có thể tạo record tương ứng
        row = [header, spreadsheet.row(i)].transpose.to_h
        create! row
 end
```
Mỗi khi bạn create một bản ghi với ActiveRecord, một câu lệnh INSERT được tạo ra và gửi tới database. Giả sử ta import 10 file, mỗi file khoảng 500 bản ghi tức là khoảng 5000 câu SQL riêng biệt được gửi tới database và database sẽ phải phân tích 5000 câu lệnh một cách lần lượt, mở và đóng bảng students 5000 lần để ghi dữ liệu, ngoài ra nó còn phải thực hiện các thao tác cập nhật index với mỗi sự thay đổi dữ liệu. Điều đó đặt gánh nặng tài nguyên và thời gian xử lý không hề nhỏ lên database. Rất may mắn cho chúng ta là có nhiều cách khác nhau để giải quyết vấn đề này, mình xin giới thiệu một cách đơn giản, đó là sử dụng gem **activerecord-import**. Gem này giúp chúng ta hỗ trợ khả năng insert dữ liệu hàng loạt trong ActiveRecord, đặc biệt giúp loại bỏ [N+1 insert problem ](https://secure.phabricator.com/book/phabcontrib/article/n_plus_one/). Cách sử dụng như sau
## Cài đặt gem activerecord-import
Bạn có thể cài đặt activerecord-import với RubyGems:

`gem install activerecord-import`

hoặc thêm vào Gemfile như sau:

`gem "activerecord-import"`

Sau đó chạy **bundle install**

## Tối ưu với phương thức import
Thay vì sử dụng `create!`, hãy xây dựng các instance của Student trong memory và pass chúng vào method `.import` của thư viện **activerecord-import**:
```ruby
def import_file file
      spreadsheet = Roo::Spreadsheet.open file
      header = spreadsheet.row(1)
      students = []
      (2..spreadsheet.last_row).each do |i|
        row = [header, spreadsheet.row(i)].transpose.to_h
        student = new row
        students << student
      end
      import! students
    end
```
Đây là câu truy vấn duy nhất được thực hiện tới database, từ đây bạn có thể hiểu tác dụng của nó trong việc tối ưu việc import dữ liệu

![](https://images.viblo.asia/cc296bef-28bd-433d-9d17-5e5048e2ec19.png)

Thậm chí ở đây **activerecord-import** còn cung cấp cho bạn một cách còn nhanh hơn, đó là gán luôn columns name và dãy các bản ghi vào và phương thức **import** tự động làm phần còn lại. Bạn không cần phải qua bước khởi tạo object để lưu record nữa.
```ruby
def import_file file
      spreadsheet = Roo::Spreadsheet.open file
      header = spreadsheet.row(1)
      rows = []
      (2..spreadsheet.last_row).each do |i|
        rows << spreadsheet.row(i)
      end
      import! header, rows
    end
```
Rất nhanh và gọn phải không nào? :D
# Kết luận
Trên đây là những hiểu biết của mình về cách import dữ liệu từ file (CSV, Excel hoặc LibreOffice) trong Rails 5. Rất hi vọng nó sẽ hữu ích đối với bạn.
# Tham khảo
Mình có tham khảo nội dung một số nguồn, tuy nhiên có những đoạn code đã cũ và không còn hợp lý nữa và mình đã sửa lại trong bài viết này.

http://railscasts.com/episodes/396-importing-csv-and-excel

https://github.com/roo-rb/roo

https://github.com/zdennis/activerecord-import