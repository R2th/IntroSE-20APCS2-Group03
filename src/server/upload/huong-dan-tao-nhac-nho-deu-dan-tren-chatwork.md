![](https://images.viblo.asia/bc9e083a-4397-414a-b9f1-1c1c9fd88edd.jpg)

Chào các bạn! Hôm nay mình sẽ hướng dẫn các bạn làm một công cụ tự động nhắc nhở mỗi giờ, mỗi ngày, hoặc mỗi tháng, giúp chúng ta không bị bỏ quên những việc cần làm.

Như các bạn cũng biết, việc sử dụng những phần mềm nhắc việc hiện nay rất nhiều, nhưng chúng đều chỉ có thể sử dụng riêng biệt, điều đó gây phiền phức cho chúng ta mỗi khi cần dùng lại phải chuyển qua lại.

Chatwork là công cụ trao đổi công việc rất phổ biến hiện nay, tuy nhiên nó thiếu đi khả năng nhắc việc 1 cách thường niên, đó chính là lý do mình viết bài này, để hướng dẫn các bạn có thể trải nghiệm chatwork 1 cách trọn vẹn hơn.

Vậy chúng ta sẽ làm gì hôm nay? chúng ta sẽ tạo ra 1 con bot nhắc việc theo thời gian mong muốn, nó sẽ tự động làm điều đó giúp chúng ta hàng ngày, như: nhắc viết report cuối ngày, nhắc đến giờ gọi hoa quả, nhắc đến giờ uống nước.... mà chúng ta không cần rời khỏi môi trường làm việc của chatwork ;)

Bắt đầu nào ;)

Mình sử dụng google scripts cho bài viết này, vì nó miễn phí và qua thử nghiệm tool tự động like fb thì tính ổn định của nó cũng tương đối cao :v

Bước đầu tiên, chúng ta cần cung cấp quyền cho con Bot để nó có thể có quyền làm những việc thay ta, đó chính là cấp token cho nó!

### Bước 1: Lấy Token.
Ấn vào biểu tượng của mình sẽ có 1 menu hiện ra, các bạn chọn Cài Đặt API

![](https://images.viblo.asia/d54978ee-ddde-4d85-9acb-e2ad0cd92ef6.JPG)

Tiếp đó các bạn điền password vào để xác thực tài khoản

![](https://images.viblo.asia/5e97f775-b15f-4db3-86a8-e242ab33523d.JPG)

Cuối cùng chúng ta sẽ có được token để cung cấp cho Bot, các bạn hãy copy nó lại.

![](https://images.viblo.asia/406bb3e0-d977-489c-a0c0-fb03256741cc.JPG)

### Bước 2: Tạo một script với google scripts.

Các bạn ấn vào được link sau: https://script.google.com/u/1/home

Sau đó tạo lệnh mới

![](https://images.viblo.asia/ae081b42-2bc4-471d-9d64-358ff417b93c.JPG)

Tiếp theo ấn lưu để lưu tập lệnh vừa tạo

![](https://images.viblo.asia/474cd47f-cfef-434e-8cea-b0ac6614beeb.JPG)

Đặt tên cho tập lệnh này

![](https://images.viblo.asia/e9cd3b19-48b0-45dc-84d3-73e1c8bfc72e.JPG)

Viết đoạn script như hình mình đã viết

![](https://images.viblo.asia/a13c4015-d43a-40b9-a516-ee9378cec4b1.JPG)

- token: các bạn đã lấy được ở bước trên.
- roomId: là id room mà bạn muốn gửi nội dung nhắc nhở vào đó! mình có hướng dẫn lấy room id ở phía dưới.
- messages: nội dung tin nhắn các bạn muốn hiện thị khi nhắc nhở.
- phần còn lại các bạn chưa cần hiểu, sau này có dịp mình sẽ hướng dẫn chi tiết hơn về google script sau nhé ;)

Ấn nút run để chạy thử sẽ được yêu cầu cấp quyền như sau

![](https://images.viblo.asia/940711dc-dcaa-4699-82ba-86b0a3aeba27.JPG)

Chọn tài khoản cấp quyền

![](https://images.viblo.asia/a9220ddf-d67b-4c83-9ea7-e82347cb0040.JPG)

Đồng ý với điều khoản

![](https://images.viblo.asia/93f5ce24-c624-4919-9b8f-f8641c026479.JPG)

ID của bài viết các bạn lấy từ thanh url ở phần số phía sau của "rid" và điền vào roomId của scripts.

![](https://images.viblo.asia/36b40b7f-97b7-44be-b2c9-e22b2cda633d.JPG)

### Bước 3: Thiết lập thời gian nhắc nhở.
Ấn vào biểu tượng hình đồng hồ

![](https://images.viblo.asia/7c05f9ac-4f83-40cc-89fd-6e32ef3516a0.JPG)

Nhấn vào thêm kích hoạt ngay bây giờ

![](https://images.viblo.asia/a3d37638-3209-45e1-a0ae-d73be9461e48.JPG)

Thiết lập thời gian nhắc nhở theo ý muốn

![](https://images.viblo.asia/c7d545d2-6206-42d2-95d2-d8952288c166.JPG)

Tương tự như vậy! Các bạn có thể tạo cho mình những con bot nhắc nhở uống nước mỗi 15p, nhắc nhở dọn dẹp mỗi thứ 6 hàng tuần, nhắc nhở quay cơm mỗi buổi trưa.... Chúc các bạn sẽ làm được nhiều thứ hay ho với chú robot này và chatwork nhé ;)