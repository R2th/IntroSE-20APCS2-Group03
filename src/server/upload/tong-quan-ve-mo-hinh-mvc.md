## Giới thiệu
MVC là một phương pháp tổ chức code có lịch sử lâu đời. Bản thân nó cũng đã xuất hiện nhiều biến thể theo thời gian. Trong dòng chảy đó, nhiều mô hình tổ chức code khác cũng ra đời. Các mô hình này dần có được chỗ đứng vững chắc cho riêng mình. Điều này không hề khiến MVC trở nên lỗi thời như một số người nhầm tưởng. Tư tưởng của MVC vẫn rất quan trọng với bất cứ ai theo học lập trình. Bài viết này đưa ra một cái nhìn tổng quan về một mô hình MVC cơ bản.
## Chi tiết kỹ thuật
MVC là viết tắt của Model-View-Controller. Trong đó, Model xử lý dữ liệu. Controller xử lý logic. Còn View là phần hiển thị và tiếp nhận request từ phía user (người dùng).
![](https://images.viblo.asia/71fc0f22-1381-49df-8d5d-1314bd5c77a4.png)
Trong MVC, Controller đóng vai trò cầu  nối giữa Model và View. Giữa Controller-View và Controller-Model đều là tương tác 2 chiều. Mỗi phần trong đó sẽ bao gồm các đoạn code xử lý độc lập theo vai trò của mình. Mục đích chính của mô hình này nhằm chia nhỏ code để dễ phát triển và bảo trì. 

Khi có một action từ phía user, ví dụ như submit form, action đó sẽ đi qua một Controller chính. Controller này gọi đến các Controller phụ và các Model cần thiết để xử lý. Sau đó, nó sẽ quyết định gọi đến phần View nào cần hiển thị và cập nhật lại. Đặc tính này cũng nâng cao tính tái sử dụng của code. Trong đó, View và Model không cần phải quan tâm mình được gọi như thế nào và ở đâu.

Xem qua cách tổ chức một ứng dụng đơn giản theo mô hình MVC dưới đây:
```php
App
|-- controllers/
|  |-- UserController.php
|  |-- UploadController.php
|-- models/
|  |-- UserModel.php
|  |-- UploadModel.php
|-- views/
|  |-- user/
|  |  |-- register.php
|  |  |-- login.php
|  |-- upload/
|  |  |-- success.php
|  |  |-- fail.php 
|  |-- common/
|    |-- header.php
|    |-- footer.php
|-- index.php
|-- style.css
```
Nhìn vào cấu trúc trên chúng ta dễ dàng hình dung được mình cần đặt đoạn code nào vào đâu. Các web frameworks phổ biến như Laravel, Phalcon, CodeIgniter đều được viết theo mô hình MVC. Dĩ nhiên, mỗi cái sẽ có những cải tiến riêng phù hợp định hướng phát triển của mình.
## Tổng kết
Ngoài MVC, còn nhiều mô hình khác như HMVC, MVP, MVVM. Mỗi cái đều có những ưu nhược điểm riêng. Biết được tổng quan từng cái sẽ giúp chúng ta áp dụng chính xác vào từng project cụ thể.