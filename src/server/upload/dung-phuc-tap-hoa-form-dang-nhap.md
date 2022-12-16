Thời gian trôi qua, tôi thấy mình ngày càng khó chịu với các hình thức đăng nhập. Khi các trình quản lý mật khẩu như 1Password và trình quản lý mật khẩu của Chrome (mà tôi cũng sử dụng) trở nên phổ biến hơn, điều quan trọng là các trang web phải nhận thức được cách người dùng đăng nhập vào trang web của họ.

Hãy đi qua một số mẫu đăng nhập và tại sao tôi nghĩ rằng không lý tưởng chút nào. Và sau đó hãy xem xét một số cách tốt hơn để xử lý việc đăng nhập. 
Nói ngắn gọn là bạn - những nhà phát triển - hãy tạo các hình thức đăng nhập đơn giản, có thể liên kết, có thể dự đoán và tích hợp tốt với các trình quản lý mật khẩu.

## Không nên
Dưới đây là một số mẫu mà tôi gặp phải trên các trang web mà tôi nghĩ nên tránh.

### Đừng đặt form đăng nhập ở popup / modal

![](https://images.viblo.asia/9d1cbb38-7573-43d5-9619-6707121552c4.png)

Các vấn đề với mẫu này là:

* Các thao tác thừa cho người dùng - 1. Nhấp vào nút menu, 2. chọn đăng nhập, 3. điền vào biểu mẫu, thay vì truy cập trang đăng nhập (thông qua tìm kiếm, trò chuyện hỗ trợ khách hàng, đánh dấu, quản lý mật khẩu, trực tiếp hoặc qua điều hướng chính) và điền vào biểu mẫu.
* Không thể chia sẻ liên kết trực tiếp đến trang đăng nhập, điều này có thể gây khó khăn cho những người hỗ trợ khách hàng (vì họ phải đưa ra một loạt các hướng dẫn được mô tả ở trên thay vì chỉ cung cấp một liên kết cho khách hàng). 
* Nó cũng ngăn các trình quản lý mật khẩu vì popup hay modal bị ẩn đi & chỉ có thể nhìn thấy khi click vào một nút nào đó. 1Password có một tính năng "mở và điền vào" tuyệt vời, cho phép bạn truy cập một trang web và điền vào mẫu đăng nhập với thông tin đăng nhập của bạn. Tính năng này không hoạt động với các form đăng nhập ở dạng popup / modal.

### Không phân chia form đăng nhập thành nhiều trang

![](https://images.viblo.asia/17a5851c-bc4d-42a4-9680-806cf113ff4e.png)
![](https://images.viblo.asia/d5ac1f1a-3867-49f8-9993-8af5b694e945.png)

Shopify (một dịch vụ mà tôi yêu thích) gây khó chịu cho người dùng vì chia nhỏ thông tin đăng nhập trên ba màn hình riêng biệt. Một lần nữa, tôi có thể đánh giá cao ý định ở đây: họ không cố gắng làm quá tải người dùng với quá nhiều thông tin cùng một lúc. Và mặc dù tôi đồng ý với mô hình này cho các bối cảnh nhất định (như trong luồng thương mại điện tử, bạn thường thấy thông tin thanh toán, phương thức giao hàng và địa chỉ, thông tin thẻ tín dụng, v.v. được chia thành các bước riêng biệt), điều này ở đây lại quá mức cần thiết cho form đăng nhập chỉ có 3 trường thông tin.

* Thêm các bước không cần thiết để đăng nhập - Một lần nữa, đây chỉ là form đăng nhập có 3 trường, nhưng bây giờ người dùng phải đi qua 3 màn hình để đăng nhập. Điều này chắc chắn sẽ làm chậm người dùng.
* Không hoạt động với trình quản lý mật khẩu vì lúc này trình quản lý mật khẩu chỉ có thể điền một trường vào trang đăng nhập.

## Nên
Vậy chúng ta nên làm gì tốt hơn cho các form đăng nhập thông thường? Tôi nghỉ chỉ cần có một trang đăng nhập truyền thống, nhàm chán nhưng hiệu quả.

![](https://images.viblo.asia/8f4adc9c-67d5-4a5e-983f-7259527eae2b.png)

Đơn giản, súc tích, dễ đoán. Làm việc với người quản lý mật khẩu.

* Có một trang dành riêng để đăng nhập - Những người hỗ trợ khách hàng có thể hướng mọi người đến một URL (domain.com/login) thay vì phải đưa ra một loạt các hướng dẫn để tìm chỗ đăng nhập trên trang. Các trình quản lý mật khẩu có thể lưu trữ thông tin đăng nhập và chỉ cần nhấp vào nút mở trang đó và điền trước các thông tin.
* Hiện tất cả các trường bắt buộc - Nếu bạn cần nhập tên của mình để đăng nhập, hãy để lộ trường đó!
* Giữ tất cả các trường trên một trang - đăng nhập phải là một quá trình nhanh chóng, không phải là một việc không cần thiết thông qua nhiều trang.
* Đừng quá trở nên lạ mắt - Có thể có một cái gì đó cho toàn bộ điều liên kết ma thuật và các mẫu đăng nhập sáng tạo khác, nhưng tôi nghĩ điều đó rất quan trọng để nhận ra cách người dùng sử dụng để đăng nhập trên internet. Dựa vào khoa học giải quyết nhàm chán, dự đoán.
* Sử dụng Social login: hãy cho phép người dùng đăng nhập bằng Google hay Facebook của họ nhanh chóng qua 1 vài cú click chuột.

# Lời kết: Hãy làm cuộc sống dễ dàng hơn các bạn nhé :D