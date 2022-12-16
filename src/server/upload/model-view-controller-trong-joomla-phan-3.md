##**Post/Request/Get pattern**

Joomla tuân theo mẫu Post / Redirect / Get, điều đó có nghĩa là khi người dùng submits a form trong phương POST của HTTP, thay vì phản hồi lại POST với một trang HTML thì nó lại điều hướng tới một page khác mà lại dùng một trang mà trình duyệt sẽ truy cập bằng phương thức GET.
Điều này được đánh dấu khi trang quản trị viên hiển thị trang Content/ Articales page. Hành động được thực hiện bởi sự chỉ dẫn của tham số task, cả nó và dữ liệu liên quan đều được gửi trong phương thức POST đến server. Một khi hành động được thực hiện trang web tiếp theo sẽ được hiện ra được định nghĩa trong Redirect HTTP 

![](https://images.viblo.asia/87f5254e-da68-4f93-a1b3-1642f9e61df5.jpg)

ở trong hình trên mô tả quá trình khi administrator chỉnh sửa một article. Trong trường hợp này, có thêm bước hiển thị biểu mẫu chỉnh sửa, Joomla xử lý bằng cách gửi một HTTP Redirect để phản hồi lại yêu cầu ban đầu để chỉnh sửa article. 
![](https://images.viblo.asia/8721b7f7-bfc8-4ec7-928c-57f273de95db.jpg)

Ở điểm thứ 3 trong BaseDatabaseModel lưu tại "chỉnh sửa id" trong session và component controller kiểm tra id này ở điểm thứ 4, để chắc chắn rằng người dùng không thể xác định được URL của form một cách trực tiếp, mà không thông qua bước 3.

Các số màu đỏ bên trong hình tròn màu xanh trong 2 hình trên là những kiểu khác nhau trong HTTP request mà joomla kiểm soát, và chúng ra sẽ thấy nó trong phần tiếp theo của bài viết nói về các class MVC đã được định nghĩa để phục vụ cho 5 trường hợp này