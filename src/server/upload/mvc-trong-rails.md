# Ruby on Rails MVC Framework
Model - Controller - View là nguyên tắc phân chia công việc của một ứng dụng thành ba hệ thống con riêng biệt nhưng hợp tác chặt chẽ.
# Model (ActiveRecord)
Model duy trì mối quan hệ giữa các đối tượng và cơ sở dữ liệu và xử lý xác nhận, liên kết, giao dịch, v.v.

Hệ thống con này được triển khai trong thư viện ActiveRecord, cung cấp giao diện và ràng buộc giữa các bảng trong cơ sở dữ liệu quan hệ và mã chương trình Ruby thao tác các bản ghi cơ sở dữ liệu. Tên phương thức Ruby được tạo tự động từ tên trường của các bảng cơ sở dữ liệu.
# View ( ActionView )
Đây là phần trình bày dữ liệu theo một định dạng cụ thể, được kích hoạt bởi quyết định trình bày dữ liệu của bộ điều khiển. Chúng là các hệ thống khuôn mẫu dựa trên tập lệnh như JSP, ASP, PHP và rất dễ tích hợp với công nghệ AJAX.

Hệ thống con này được triển khai trong thư viện ActionView, là hệ thống dựa trên Ruby nhúng (ERb) để xác định các mẫu trình bày để trình bày dữ liệu. Mọi kết nối Web tới ứng dụng Rails đều dẫn đến việc hiển thị chế độ xem.
# Controller ( ActionController )
Cơ sở trong ứng dụng chỉ dẫn lưu lượng, một mặt, truy vấn các mô hình cho dữ liệu cụ thể và mặt khác, tổ chức dữ liệu đó (tìm kiếm, sắp xếp, nhắn tin cho nó) thành một hình thức phù hợp với nhu cầu của một chế độ xem cụ thể.

Hệ thống con này được triển khai trong ActionContoder, là một nhà môi giới dữ liệu nằm giữa ActiveRecord (giao diện cơ sở dữ liệu) và ActionView (công cụ trình bày).
# Hình ảnh của MVC Framework
Dưới đây là hình ảnh mô tả hoạt động  của Ruby on Rails Framework.!
<br>
<br>
<br>
![](https://images.viblo.asia/20015301-ad62-4c33-a0a6-9fc677419bc4.gif)
<br>
<br>
<br>
![](https://images.viblo.asia/438da0ef-5f0a-42fe-8f91-6fa658485339.png)
# MVC the Rails
Rails thúc đẩy khái niệm rằng các model, view, controller nên được tách biệt bằng cách lưu trữ mã cho từng thành phần dưới dạng các tệp riêng biệt trong các thư mục riêng biệt.

Đây là nơi cấu trúc thư mục Rails mà chúng ta đã tạo lại trong . Đã đến lúc chọc một chút trong cấu trúc đó. Nếu bạn xem bên trong thư mục app, được mô tả trong hình dưới đây, bạn sẽ thấy một số thư mục có tên bắt đầu nghe quen thuộc.

![](https://images.viblo.asia/957e4917-0273-4ae7-81e1-c45b320472d9.png)
<br>
<br>
Như bạn thấy, các thư mục models, view, controllers được đặt trong thư mục app
 <br>
**app/controllers**
<br>
Đây như tên của folder nó là bộ não controller trong MVC chứa tất cả các file contrller. Việc đặt tên của file này bắt buộc phả theo quy tắt là số nhiều của tên model + "_controller". Ví dụ bạn có model User thì tên controller được đặt sẽ là users_controller.rb, nó theo khiểu snack_case. Còn trong file bạn tạo ra sẽ theo CamelCase tức là UsersController
<br>
**app/models**
<br>
Tất cả model sẽ nằm trong app/models. Models đóng vai trò như đối tượng quan hệ sẽ mapping với database table chứa dữ liệu. Quy tắt đặt model sẽ là viết các object table trong DB ở dạng số ít
<br>
app/models/concerns
<br>
Giống như controller, method ở đây sẽ được dùng ở nhiều model files
<br>
**app/views**
<br>
Phần cuối cùng trong mô hình MVC là views. Những file cần hiển thị hoặc mails cũng như response api sẽ được viết trong phần này. Thường những file ở đây nếu là web sẽ là kết hợp giữu HTML và Ruby với extension sẽ là html.erb và được tổ chức dựa trên controller. Ví dụ, BooksController#index action sẽ có view tương ứng ở file
<br>
app/views/books/index.html.erb

Ngoài ra các file layout sẽ được đặt tại đây

app/views/layouts
Nó như là một layout tổng và được kế thừa ở các views khác. Ngoài ra bạn cũng có thể dùng nhiều layout và tương ứng với controller tổng mà bạn muốn
<br>
Qua bài viết, hi vọng các bạn sẽ hiểu được mô hình làm việc MVC trong rails
## Tài liệu tham khảo
https://www.tutorialspoint.com/ruby-on-rails/rails-framework.htm
<br>
https://www.sitepoint.com/model-view-controller-mvc-architecture-rails/