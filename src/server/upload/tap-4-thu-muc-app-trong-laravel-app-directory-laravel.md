Ở tập trước chúng ta đã cùng nhau tìm hiểu cấu trúc thư mục của Laravel framework, hôm nay mình sẽ nói sâu một thư mục mà chúng ta cần phải hiểu rõ vì nó đóng vai trò quan trọng của ứng dụng, đó là thư mục `app`.

Khi quan sát bên trong thư mục `app`, ta thấy nó gồm có các thành phần như `Console`, `Exceptions`, `Http`, `Providers`... Liệu đó có phải là tất cả của nó?

# 1. Thư mục Console (The Console directory)
Thư mục `console` là nơi chứa các lệnh Artisan do chính bạn tạo ra trong ứng dụng với lệnh `make:command` trong commander. Nơi đây còn chứa file `Kernel.php`, nó sẽ thực hiện việc đăng ký các lệnh Artisan của riêng bạn, ngoài ra có thể đặt lịch trình tác vụ cho các lệnh Artisan ấy.

Mình sẽ thử khởi tạo một câu lệnh Artisan, các bạn chạy lệnh sau:

> php artisan make:command test

Kiểm tra source project, ngay tại thư mục `app/Console` ta có thể thấy một thư mục `Commands` kèm theo file tên `test.php` đã được tạo ra. Có thể thấy sau này khi tạo thêm một command nào khác thì nó sẽ được quản lý ở đây.

![](https://images.viblo.asia/6fbddf46-6d1c-49df-8028-5f5ca47b6c97.JPG)

# 2. Thư mục Exceptions (The Exceptions directory)
Như tên gọi của nó, thư mục `Exceptions` này sẽ chứa các xử lý ngoại lệ (exception handler) của ứng dụng. Nếu bạn muốn tùy chỉnh cách mà những exception này ghi lại hoặc hiển thị, thì hãy sửa đổi file `Handler.php` trong thư mục này. Nhưng mình nghĩ việc này cũng không cần thiết cho lắm vì Laravel đã làm quá tốt rồi.

# 3. Thư mục Http (The Http directory)
Thư mục này sẽ chứa các controller, middleware và form request (sẽ tìm hiểu ở các tập sau). File `Kernel.php` dùng để định nghĩa cho các middleware. Nói chung thư mục này sẽ chứa các thành phần sẽ xử lý các yêu cầu đến ứng dụng, chẳng hạn các request từ phía client.

# 4. Thư mục Providers (The Providers directory)
Thư mục này chứa tất cả các nhà cung cấp dịch vụ (service provider) cho ứng dụng của bạn. Các service provider này sẽ khởi động ứng dụng bằng cách ràng buộc các service trong vùng chứa của nó, đăng ký các sự kiện hoặc thực thi các mã lệnh để chuẩn bị đáp ứng cho các request đến ứng dụng. Nghe có vẻ hơi khó hiểu vì đây là một trong số các khái niệm kiến trúc (Architecture Concepts) của Laravel nên khá trừu tượng. Mình sẽ nói rõ vấn đề này ở những tập sau.

# 5. Thư mục Broadcasting (The Broadcasting directory)
Thư mục `Broadcasting` này là nơi chứa tất cả các lớp broadcasting channel. Đây cũng là một thuật ngữ khá mới mẻ khi mới học Laravel nên sẽ có một tập chi tiết về vấn đề này. Bây giờ bạn chỉ hiểu cho mình là nó liên quan đến file `routes/channels.php` mà mình đã nói ở tập trước, sử dụng đến nó khi app của bạn có real-time... Mặc định thì thư mục `Broadcasting` này không được khởi tạo trước, nó sẽ xuất hiện khi bạn tạo một class broadcasting channel đầu tiên với lệnh:

> php artisan make:channel TestChannel

Quan sát source code ta có thể thấy, thư mục `Broadcasting` đã được tạo ra cùng với class mình vừa khởi tạo bằng lệnh ban nãy.

![](https://images.viblo.asia/6baeb35c-1f07-437b-b2c2-aa8c2929f040.jpg)

Kể từ phần này trở đi, các thư mục mặc định không xuất hiện trong thư mục `app` mà chỉ được khởi tạo bằng lệnh như `Broadcasting`.

# 6. Thư mục Events (The Events directory)
Để khởi tạo thư mục cũng như một lớp sự kiện (event class), bạn phải thực hiện chuỗi lệnh sau:

> php artisan event:generate

Tiếp đó:

> php artisan make:event TestEvent

![](https://images.viblo.asia/fbe7ce7d-102d-4193-be9c-9537934ad366.jpg)

Hiểu đơn giản, ví dụ bạn click vào nút đăng nhâp của một trang web, đó là sự kiện đăng nhập, hoặc thêm sản phẩm vào giỏ hàng, đó là sự kiện thêm sản phẩm vào giỏ hàng... Laravel cung cấp cho ta event để nâng cao tính linh hoạt, tách rời và không phụ thuộc, giúp dễ quản lý và mở rộng hơn.

# 7. Thư mục Listeners (The Listeners directory)
Thư mục `Listeners` này dùng để chứa các lớp xử lý các event ở trên, gọi là event listener. Các event listener này sẽ hoạt động khi nhận được một event khởi tạo và thực thi nhiệm vụ được khai báo trước. Chẳng hạn như sự kiện `UserRegisterd` có thể xử lý bởi listener `SendWelcomeEMail`. Tức là khi listener `SendWelcomeEmail` lắng nghe được event `UserRegistered` khởi tạo thì nó sẽ thực thi gửi một email welcome rồi sau đó trả về cho người dùng biết là tài khoản đã được đăng ký.

Để khởi tạo thư mục `Listener` cũng như file listener, các bạn thực hiện chuỗi lệnh sau:

> php artisan event:generate 

*(Nếu đã thực hiện ở event thì có thể bỏ qua lệnh này)*

Tiếp đó:

> php artisan make:listener TestListener

![](https://images.viblo.asia/32f99b4d-a829-4608-86b5-b10854dc8687.jpg)

# 8. Thư mục Jobs (The Jobs directory)
Hiểu đơn giản thư mục này chứa các class để sắp xếp các công việc vào hàng đợi, hoặc có thể chạy đồng bộ.

Để tạo một `Job` bạn chỉ cần thực thi lệnh:

> php artisan make:job TestJob

![](https://images.viblo.asia/96c91b71-119a-4103-b121-a01ad347138f.jpg)

# 9. Thư mục Mail (The Mail directory)
Nghe tên cũng đủ hiểu chức năng của thư mục `Mail` này. Thư mục `Mail` chứa tất cả các lớp đại diện cho từng email. Các mail object này gói gọn các xử lý của việc xây dựng email trong một class đơn giản, có thể gửi bằng `Mail::send`.

Để tạo một `Mail`, thực thi câu lệnh sau:

> php artisan make:mail TestMail

![](https://images.viblo.asia/69eb8651-85e7-493b-bf1d-6eeedbade0cc.jpg)

# 10. Thư mục Notifications (The Notifications directory)
Dễ hiểu là thư mục này chứa các class cho việc thông báo các hoạt động của ứng dụng, chẳng hạn như thông báo đơn giản về các event đã xảy ra trong ứng dụng. Tính năng này thông qua nhiều driver khác nhau như SMS, email, Slack hoặc lưu trữ trong database.

Khởi tạo `Notifications` với một câu lệnh:

> php artisan make:notification TestNotification

![](https://images.viblo.asia/ed5b726d-8c40-42b8-bedd-a3558c023be3.jpg)

# 11. Thư mục Policies (The Policies directory)
`Policies` cũng là một thuật ngữ khá mới mẻ đối với các bạn mới tìm hiểu về framework này, nói theo Laravel Docs thì đây chứa các class dùng để xác định xem client có thể thực hiện một hành động nào đó đối với tài nguyên hay không. 

Chẳng hạn như bạn muốn chỉnh sửa bài viết nào đó thì `Policies` này sẽ kiểm tra xem bạn có phải là tác giả của bài viết đó hoặc là admin hay không? Nếu phải thì mới cho phép chỉnh sửa, còn không thì báo lỗi không đủ quyền.

Để tạo một `Policies`, bạn cũng thực thi lệnh Artisan sau:

> php artisan make:policy TestPolicy

![](https://images.viblo.asia/f126c130-11e4-44bc-82ff-0d5b3f265d12.jpg)

# 12. Thư mục Rules (The Rules directory)
Nói dễ hiểu, `Rules` này có chức năng validate data từ request như các bạn vẫn hay làm khi code PHP thuần vậy. Nhưng ở Laravel, nó được tách rời riêng biệt để dễ dàng quản lý.

Dùng lệnh Artisan này để tạo một `Rules`:

> php artisan make:rule TestRule

![](https://images.viblo.asia/d65e8066-1548-4c1a-a0a5-047b9b9b1606.jpg)

Thế là chúng ta đã tìm hiểu bao quát hết cấu trúc trong `app` rồi đấy, tới đây các bạn liệu có cảm giác thiếu thiếu hay đang thắc mắc không? Vâng, đó chính là "Model". Đây là một framework chuẩn mô hình MVC thì vậy `Model` nằm ở đâu, không nằm trong thư mục `app` à? Không, không phải vậy. Các bạn có để ý trong `app` vẫn còn một file `User.php` riêng lẻ không. Đó chính là một `Model` đấy. 

Theo Laravel Docs, vì khái niệm `Model` còn quá mơ hồ, nó có nghĩa khác nhau với những cách suy nghĩ khác nhau. Có người cho rằng `Model` trong ứng dụng là tất cả các bussiness logic, còn có người cho rằng `Model` chính là các lớp tương tác quan hệ trong database.

Chính vì đều đó, Laravel không tạo thư mục `Model` trong `app`, thay vào để các coder có thể đặt theo cách mà họ muốn.

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ