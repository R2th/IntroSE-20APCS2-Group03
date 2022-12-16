## Giới thiệu vấn đề
- Đối với các hệ thống web lớn, lưu trữ nhiều loại dữ liệu thì việc import một tập tin với lượng dữ liệu lớn lên hệ thống là một nhu cầu tất yếu. Thường các tập tin cần import thường ở định dạng csv, office (word, excel, ...). Trong Rails, để xử lý vấn đề import dữ liệu nó đã cung cấp sẵn công cụ import dữ liệu từ file csv mà lập trình viên có thể dễ dàng sử dụng
- Ngoài ra, ở các hệ thống có nhu cầu quản lý, tổng kết và trích xuất dữ liệu thì hệ thống cần cung cấp tính năng export dữ liệu ra các định dạng phổ biến

Ở bài viết này, mình xin trình bày phương pháp import dữ liệu và export dữ liệu ra một số định dạng quen thuộc như pdf, xls, xlsx
## Dự án demo
Để minh họa cho các kĩ thuật mà mình nhắc đến ở trên, ta sẽ tạo một project Rails để áp dụng <br>
Tạo project  
```ruby
rails new demo_export_import
```
Tạo một số model với đầy đủ các thành phần controller, views, model với câu lệnh<br>
```ruby
rails generate scaffold User name:string email:string
```
Sau đây, mình xin vào phần chính của bài viết. Giao diện của sản phẩm như sau
![](https://images.viblo.asia/edf2c2df-f2c8-4c38-bc48-7e4ceebeda04.png)
## Import dữ liệu từ tập tin csv, xls, xlsx
Để import dữ liệu từ các tập tin trên, mình sử dụng gem "roo" và để tăng hiệu suất import dữ liệu vào database sử dụng gem "activerocord-import" <br>
```ruby
gem "roo"
gem "activerecord-import"
```
Định nghĩa route và tạo thẻ input nhận file cần import
```ruby
<%= form_tag import_users_path, multipart: true do %>
  <%= file_field_tag :file %>
  <%= submit_tag "Import", class: "btn btn-success" %>
<% end %>
```
Trong model User, định nghĩa các phương thức dưới đây để thực hiện import dữ liệu
```ruby
def import_file file
 # Mở file được xử lý 
  spreadsheet = open_spreadsheet(file)
  # Gán header (tên các cột) là hàng 1 trong file
  header = spreadsheet.row(1)
  # Khởi tạo một mảng rỗng để chứa các bản ghi
  rows = []
  # Đọc bản ghi dữ liệu từ dòng thứ 2 đến dòng cuối và gán vào mảng trên
  (2..spreadsheet.last_row).each do |i|
    rows << spreadsheet.row(i)
  end
  # Sử dụng phương thức import mà thư viện activerecord-import cung cấp để tạo dữ liệu đạt hiệu suất cao
  import! header, rows
end

# Phương thức mở tập tin để import tùy vào từng loại file
def open_spreadsheet(file)
  case File.extname(file.original_filename)
      when ".csv" then Roo::CSV.new(file.path)
      when ".xls" then Roo::Excel.new(file.path)
      when ".xlsx" then Roo::Excelx.new(file.path)
      else raise "Unknown file type: #{file.original_filename}"
  end
end
```
Trong controller, tạo phương thức import để xử lý
```ruby
def import
  if params[:file].present?
    User.import_file params[:file]
    redirect_to root_url
    flash[:success] = "Data imported"
  else
    redirect_to root_url
    flash[:error] = "Data not imported"
  end
end
```
## Export dữ liệu ra định dạng pdf
Để export dữ liệu ra định dạng pdf, ta thêm 2 gem sau vào Gemfile và chạy bundle để cài đặt chúng
```ruby
gem "wicked_pdf"
gem "wkhtmltopdf-binary"
```
Tạo template chung cho giao diện của tập tin pdf được tạo ra bằng cách tạo các tập tin `pdf.js` và `pdf.scss`
```erb
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8' />
    <%= wicked_pdf_stylesheet_link_tag 'pdf' %>
    <%= wicked_pdf_javascript_include_tag 'jquery', 'users', 'pdf' %>
  </head>
  # Đánh số trang khi export file
  <body onload="number_pages()">
    <%= yield %>
  </body>
</html>
```
Đánh số trang khi export file
```ruby
function number_pages() {
    var vars={};
    var x=document.location.search.substring(1).split('&');
    for(var i in x) {var z=x[i].split('=',2);vars[z[0]] = decodeURIComponent(z[1]);}
    var x=['frompage','topage','page','webpage','section','subsection','subsubsection'];
    for(var i in x) {
        var y = document.getElementsByClassName(x[i]);
        for(var j=0; j<y.length; ++j) y[j].textContent = vars[x[i]];
    }
}
```
Tạo nút bấm để thực hiện export dữ liệu ra tập tin pdf
```ruby
<%= link_to export_users_path(format: :pdf)do %>
  <i class="fa fa-paperclip" aria-hidden="true"></i> PDF Attachment
<% end %>
```
Phương thức export ra pdf file với các tùy chọn mà `gem "wkhtmltopdf-binary"` cung cấp
```ruby
def export
  @users = User.order created_at: :desc # Xác định nội dung file
  respond_to do |format|
    format.pdf do
      render pdf: 'users', # Xác định view truyền nội dung file
        layout: 'pdf.html', # Xác định layout mà file sẽ nhận
        template: 'users/export', # Xác định layout mà file sẽ nhận
        footer: {right: '[page]'}, # Thêm số trang ở bên phải phần footer
        margin: { :top => 15, :bottom => 21, :left => 12, :right => 12 }, # Căn lề cho file
        orientation: 'Landscape', page_size: 'A4' # Xác định cỡ giấy và chiều hiển thị bảng
    end
  end
end
```
Tạo tập tin `users.pdf.html` để tạo nội dung cho tập tin (đổ dữ liệu vào file)
```ruby
<div class="container">
  <h1 align="center">List Users</h1>

  <table class='table table-bordered'>
    <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Create at</th>
    </tr>
    </thead>

    <tbody>
    <% @users.each do |user| %>
      <tr>
        <td><%= user.name %></td>
        <td><%= user.email %></td>
        <td><%= l user.created_at, format: :time %></td>
      </tr>
    <% end %>
    </tbody>
  </table>
</div>
```
## Export dữ liệu ra định dạng xls, xlsx
Để export dữ liệu ra định dạng excel, ta thêm 2 gem sau vào Gemfile và chạy bundle để cài đặt chúng
```ruby
gem "axlsx"
gem "axlsx_rails"
```
Tạo nút bấm để thực hiện export dữ liệu ra tập tin xls, xlsx
```ruby
<%= link_to export_users_path(format: :xlsx)do %>
  <i class="fa fa-file-excel-o" aria-hidden="true"></i> Download as Excel
<% end %>
```
Tạo tập tin `export.xlsx.axlsx` để tạo nội dung cho tập tin (đổ dữ liệu vào file)
```ruby
# Tạo một file workbook mới
wb = xlsx_package.workbook
# Tạo worksheet có tên là Users
wb.add_worksheet(name: "Users") do |sheet|
  # Thêm nội dung hàng tiêu để cho file
  sheet.add_row %w(name email)
  # Tạo các bản ghi dữ liệu cho file
  @users.each do |user|
    sheet.add_row [user.name, user.email]
  end
end
```
Phương thức export ra xlsx file
```ruby
def export
  @users = User.order created_at: :desc # Xác định nội dung file
  respond_to do |format|
    format.xlsx
  end
end
```
## Sản phẩm khi chạy sẽ cho kết quả như sau


![](https://images.viblo.asia/9e8d6aae-1815-4254-81a4-b09996a98acd.gif)

## Bài viết có tham khảo một số bài sau
https://viblo.asia/p/importing-records-from-csv-and-excel-in-rails-5-ByEZk0QqlQ0 <br>
https://github.com/roo-rb/roo <br>
https://github.com/mileszs/wicked_pdf <br>
https://github.com/randym/axlsx