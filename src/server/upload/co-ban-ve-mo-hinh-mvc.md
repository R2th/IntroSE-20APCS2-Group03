# 1. Kiến thức nền tảng
## 1.1. Khái niệm
MVC là viết tắt của Model - View - Controller. Là một mô hình thiết kế phần mềm thường được sử dụng để thiết kế phần mềm có giao diện người dùng.
MVC tuy là một mô hình thiết kế phần mềm nhưng nó cũng được sử dụng rộng rãi trong web, sự khác biệt được tùy chỉnh liên quan đến sự có mặt của server - client
## Thành phần của mô hình MVC 

**Mô hình MVC gồm 3 thành phần chính là:**

### Model
Là một dạng mẫu dữ liệu, có nhiệm vụ thao tác với cơ sở dữ liệu, nghĩa là nó sẽ chứa tất cả các hàm, các phương thức truy vấn trực tiếp với dữ liệu và controller sẽ thông qua các hàm, phương thức đó để lấy dữ liệu rồi gửi qua View.

### View
Là các giao diện người dùng, có nhiệm vụ tiếp nhận dữ liệu từ controller là nơi chứa những giao diện như một nút bấm, khung nhập, menu, hình ảnh… nó đảm nhiệm nhiệm vụ hiển thị dữ liệu và giúp người dùng tương tác với hệ thống.

### Controller
Là các hành vi, hành động, xử lý của hệ thống đóng vai trò trung gian giữa Model và View. Nó có nhiệm vụ tiếp nhận yêu cầu từ client sau đó xử lý request, load model tương ứng và gửi data qua view tương ứng rồi trả kết quả về cho client.

## 1.2. Sự tương tác giữa các thành phần
Ngoài việc chia ứng dụng thành các thành phần này, thiết kế model – view – controller xác định các tương tác giữa chúng.

Mô hình chịu trách nhiệm quản lý dữ liệu của ứng dụng. Nó nhận đầu vào của người dùng từ bộ điều khiển.
Chế độ xem hiển thị bản trình bày của mô hình theo một định dạng cụ thể.
Bộ điều khiển phản hồi đầu vào của người dùng và thực hiện các tương tác trên các đối tượng mô hình dữ liệu. Bộ điều khiển nhận đầu vào, xác nhận tùy chọn và sau đó chuyển đầu vào cho mô hình.

Cũng như các mẫu phần mềm khác, MVC thể hiện "cốt lõi của giải pháp" cho một vấn đề đồng thời cho phép nó được điều chỉnh cho phù hợp với từng hệ thống. Các thiết kế MVC cụ thể có thể thay đổi đáng kể so với mô tả truyền thống ở đây.

## 1.3 Ưu điểm và nhược điểm của MVC
### Ưu điểm
Do được chia thành các thành phần độc lập nên Mô hình MVC giúp phát triển ứng dụng có code dễ đọc, dễ nâng cấp, bảo trì.
 Thể hiện tính chuyên nghiệp trong việc tạo ứng dụng.
### Nhược điểm
Đối với dự án nhỏ việc áp dụng mô hình MVC gây cồng kềnh, tốn thời gian trong quá trình phát triển. 
Tốn thời gian trung chuyển dữ liệu của các thành phần.
## 1.4. Luồng xử lý trong của mô hình MVC
Bạn có thể hình dung cụ thể và chi tiết qua từng bước dưới đây:
Khi một yêu cầu của từ máy khách (Client) gửi đến Server. Thì bị Controller trong MVC chặn lại để xem đó là URL request hay sự kiện.
Sau đó, Controller xử lý input của user rồi giao tiếp với Model trong MVC.
Model chuẩn bị data và gửi lại cho Controller.
Cuối cùng, khi xử lý xong yêu cầu thì Controller gửi dữ liệu trở lại View và hiển thị cho người dùng trên trình duyệt.
Ở đây, View không giao tiếp trực tiếp với Model. Sự tương tác giữa View và Model sẽ chỉ được xử lý bởi Controller.

Hình 1. Sơ đồ mô hình MVC

![](https://images.viblo.asia/8de73dd1-924c-4c49-8bdb-b91a9964f2b9.png)
## 1.5. Vì sao nên sử dụng mô hình MVC 
### 1.5.1) Quy trình phát triển nhanh hơn
MVC hỗ trợ phát việc phát triển nhanh chóng và song song. Nếu một mô hình MVC được dùng để phát triển bất kỳ ứng dụng web cụ thể nào, một lập trình viên có thể làm việc trên View và một developer khác có thể làm việc với Controller để tạo logic nghiệp vụ cho ứng dụng web đó.
Do đó, ứng dụng mô hình MVC có thể được hoàn thành nhanh hơn ba lần so với các ứng dụng mô hình khác.

### 1.5.2) Khả năng cung cấp nhiều chế độ view

Trong mô hình MVC, bạn có thể tạo nhiều View cho chỉ một mô hình. Ngày nay, nhu cầu có thêm nhiều cách mới để truy cập ứng dụng và đang ngày càng tăng. Do đó, việc sử dụng MVC để phát triển chắc chắn là một giải pháp tuyệt vời.
Hơn nữa, với phương pháp này, việc nhân bản code rất hạn chế. Vì nó tách biệt dữ liệu và logic nghiệp vụ khỏi màn hình.

### 1.5.3) Các sửa đổi không ảnh hưởng đến toàn bộ mô hình

Đối với bất kỳ ứng dụng web nào, người dùng có xu hướng thay đổi thường xuyên. Bạn có thể quan sát thông qua những thay đổi thường xuyên về màu sắc, font chữ, bố cục màn hình. Hay là thêm hỗ trợ thiết bị mới cho điện thoại hay máy tính bảng…
Việc thêm một kiểu view mới trong MVC rất đơn giản. Vì phần Model không phụ thuộc vào phần View. Do đó, bất kỳ thay đổi nào trong Model sẽ không ảnh hưởng đến toàn bộ kiến trúc.

### 1.5.4) MVC Model trả về dữ liệu mà không cần định dạng

MVC pattern có thể trả về dữ liệu mà không cần áp dụng bất kỳ định dạng nào. Do đó, các thành phần giống nhau có thể được sử dụng với bất kỳ giao diện nào.
Ví dụ: tất cả loại dữ liệu đều có thể được định dạng bằng HTML. Ngoài ra, nó cũng có thể được định dạng bằng Macromedia Flash hay Dream Viewer.

### 1.5.5) Hỗ trợ kỹ thuật Asynchronous

Kiến trúc MVC có thể được tích hợp với cả JavaScript Framework. Có nghĩa là, các ứng dụng MVC có thể hoạt động ngay cả với các file PDF, trình duyệt riêng cho web hay các widget trên desktop.
Ngoài ra, MVC cũng hỗ trợ kỹ thuật Asynchronous, giúp các developer phát triển các ứng dụng có thể load rất nhanh.

### 1.5.6) Nền tảng MVC thân thiện với SEO

Nền tảng MVC hỗ trợ phát triển các trang web thân thiện với SEO. Bằng nền tảng này, bạn có thể dễ dàng phát triển các URL thân thiện với SEO để tạo ra nhiều lượt truy cập hơn.
# 2. Sử Dụng framework Laravel Trong Mô Hình MVC

Laravel là một PHP Framework mã nguồn mở miễn phí, được phát triển bởi Taylor Otwell với phiên bản đầu tiên được ra mắt vào tháng 6 năm 2011. Laravel ra đời nhằm mục đích hỗ trợ phát triển các ứng dụng web, dựa trên mô hình MVC (Model – View – Controller).  
## Controller trong Laravel
Vị trí lưu
Trong Laravel, controller được tạo ra trong folder app/Http/Controllers
![](https://images.viblo.asia/b7254a7c-485f-498f-ae3d-226e2afbefcb.png)
## View trong Laravel
View trong Laravel là các file trình bày dữ liệu (code html, css, js). Các file view được đặt trong folder ressources/views. Đặc biệt trong Laravel có 2 dạng view: view bình thường và view dạng blade.  
![](https://images.viblo.asia/57519a42-606f-4ffd-a9e0-a540dab14694.png)

## Route trong Laravel
Ngoài các thành phần Model View Controller thì trong Laravel có 1 thứ rất quan trọng: route. Route trong Laravel  được sử dụng để khai báo các đường dẫn, dẫn người dùng đến các chức năng trong Laravel.
Các đường route trong Laravel được định nghĩa trong file routes/web.php, và thành routes/ api.php

![](https://images.viblo.asia/bea9f616-184d-4334-af89-955e4b20901a.png)

## Model trong laravel
Vị trí lưu:
Trong Laravel, model được tạo ra trong folder app/Models

![](https://images.viblo.asia/47be585e-ebbb-4fd4-83dd-0eaee95e4c35.png)

# 3. Tài liệu tham khảo
https://docs.google.com/document/d/1cVa31VIBI_LjIVctM6WAG0vGVuxvPtJBAcaBw9KttC8/edit
https://towardsdatascience.com/everything-you-need-to-know-about-mvc-architecture-3c827930b4c1
https://developer.mozilla.org/en-US/docs/Glossary/MVC
https://docs.google.com/presentation/d/155xtSWBVcfpTPb2So-XzBJlsORHNBe6G0oxLSNS5enM/edit#slide=id.g12363b94545_5_50
https://www.youtube.com/watch?v=AE3eD-XV4vg&list=RDMt8VnhbbIVc&index=6

# 4. Lời Kết
Trên đây là những chia sẻ của mình về mô hình MVC. Chắc chắn mình vẫn còn những sai sót trong bài viết. Cảm ơn vì đã dành thời gian đọc bài viết của mình. Nếu có gì comment phía dưới nhé.