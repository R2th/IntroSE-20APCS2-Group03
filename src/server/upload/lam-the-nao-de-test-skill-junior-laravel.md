Chào mọi người.

Sau khi phỏng vấn một ứng viên junior laravel và nhận vào làm việc thì chắc hẳn ai cũng muốn test skill của nhân viên này đang ở trình độ nào trong 2 tháng thử việc đúng không?

Vì là test ở mức độ cơ bản nên dự án cần có những chức năng đơn giản, nhưng đồng thời phải đảm bảo vận dụng các kiến thức cơ bản. Ngoài ra, có thể làm trong vòng một ngày hoặc lâu hơn - trong một số trường hợp, bạn thậm chí sẽ trả tiền cho họ để dành thời gian của họ.

Bài viết này cũng có thể coi là dự án nhỏ giúp các bạn sinh viên đang học về laravel muốn test skill của mình để đi làm ở mức mới bắt đầu nhé.

Nào ta cùng bắt đầu nào.
## Cơ bản về Laravel
Về cơ bản thì đây sẽ là dự án để quản lý các công ty và nhân viên của họ, tương tự CRM nhỏ.

* Basic Laravel Auth: Tạo chức năng đăng nhập
* Sử dụng database seeds để tạo user đầu tiên với email admin@admin.com và password trên website
* Chức năng CRUD (Create/Read/Update/Delete) cho 2 menu công ty và nhân viên
* Sử dụng di chuyển cơ sở dữ liệu để tạo các lược đồ trên
* Lưu trữ logo công ty trong thư mục storage/app/public và làm cho chúng có thể truy cập từ website
* Sử dụng các function mặc định của resource Laravel cơ bản như: index, create, store, v.v.
* Sử dụng chức năng Validate của Laravel, sử dụng các class Request
* Sử dụng Pagination của Laravel để hiển thị danh sách Công ty / Nhân viên, 10 mục trên mỗi trang
* Sử dụng Laravel make:auth làm chủ đề làm giao diện dựa trên Bootstrap mặc định

Như vậy với các chức năng trên junior có thể tạo ra page như thế này:

![CRUD Laravel](https://images.viblo.asia/86f02817-7cde-4094-afd8-57e09f269896.png)

Với bài tập đơn giản này, bạn sẽ cho thấy các kỹ năng về những kiến thức cơ bản của Laravel:

* MVC
* Auth
* CRUD and Resource Controllers
* Eloquent and Relationships
* Database migrations and seeds
* Form Validation and Requests
* File management
* Basic Bootstrap front-end
* Pagination

Những kiến thức trên hầu hết các ứng dụng web cơ bản đều sẽ có các chức năng này làm cốt lõi. Có thể sẽ có nhiều hơn thế nữa, nhưng không có những kiến thức cơ bản này, bạn không thể tiến xa hơn.

Vì vậy, ứng dụng đơn giản này sẽ kiểm tra nếu người đó có thể tạo các dự án đơn giản và sau đó là thực hành trên nhiều dự án, mỗi dự án riêng lẻ và bổ sung thêm vào cơ sở kiến thức của bạn.

Từ kinh nghiệm của riêng tôi, những người quản lý có thể đánh giá được năng lực của junior developer qua những đoạn code khác nhau: có người không sử dụng resource controller và đặt Route::get() đi khắp mọi nơi, có người không validate forms, một số không kiểm tra code của họ đúng cách, v.v. đó là những người quản lý những điều bạn muốn phát hiện càng sớm càng tốt.

## Nâng cao hơn cho Junior Laravel
Nếu những chức năng trên bạn cảm thấy quá nhỏ và đơn giản, bạn có thể thêm những chức năng này lên trên:

* Sử dụng thư viện Datatables.net để hiển thị bảng - với kết xuất không có phía máy chủ của chúng tôi
* Sử dụng chủ đề giao diện phức tạp hơn như AdminLTE
* Thông báo qua email: gửi email bất cứ khi nào công ty mới được nhập vào (sử dụng Mailgun hoặc Mailtrap)
* Tạo dự án đa ngôn ngữ (sử dụng folder resources/lang )
* Thử nghiệm cơ bản với phpunit (Nếu có thể)

## Kết luận
OK, bạn có đồng ý với nhiệm vụ như vậy để test skill laravel của junior developer không? comment ở dưới để thảo luận với mình nhé :D

### Tham khảo
https://laraveldaily.com/test-junior-laravel-developer-sample-project/