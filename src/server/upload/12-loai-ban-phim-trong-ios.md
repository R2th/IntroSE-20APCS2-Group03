Bài viết được dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại https://medium.com/better-programming/12-shades-of-keyboard-types-in-ios-a413cf93bf4f.

Mỗi loại bàn phím iOS, tất cả sẽ có trong bài viết này.
![](https://images.viblo.asia/1a091bdc-6c5a-4adb-9e7a-3e7ab2d1baa6.png)

Như trong [tài liệu của Apple](https://developer.apple.com/documentation/uikit/uikeyboardtype) đã đề cập, chúng ta sẽ có tất cả là 12 loại bàn phím trên iOS.
Bây giờ, cùng xem xét qua tất cả chúng, tôi đã ảnh chụp màn hình các loại bàn phím này để các bạn dễ hiểu.

### 1. .default
Bạn dùng kiểu bàn phím này chỉ định mặc định cho phương thức nhập văn bản hiện tại.

![](https://images.viblo.asia/cfe51f7c-0644-43ac-ac5a-aa5873715c5f.png)

### 2. .asciiCapable
Đây là loại bàn phím chỉ định nhập các ký tự ASCII tiêu chuẩn.
Bạn không thể nhập các biểu tượng cảm xúc với kiểu bàn phím này.

![](https://images.viblo.asia/de75ec73-b9f4-48e9-9846-51d368900130.png)

### 3. .numbersAndPunctuation
Đây là loại bàn phím chỉ định nhập số và chấm câu.

![](https://images.viblo.asia/c3c2075f-a9df-4935-961e-1350d1b8648b.png)

### 4. .URL
Đây là loại bàn phím được tối ưu hóa cho việc nhập URL.
Loại bàn phím này nổi bật với các ký tự dấu chấm (.) và dấu gạch chéo (/) và chuỗi *.com*.

![](https://images.viblo.asia/7eec76d3-e205-478a-adad-91ded5cc8879.png)

### 5. .numberPad
Đây là loại bàn phím số, thiết kế để nhập mã PIN.
Loại bàn phím này nổi bật với các số từ 0 đến 9. 
Và nó không hỗ trợ viết hoa tự động.

![](https://images.viblo.asia/d30dae40-f979-44e5-937c-1ce796db0f76.png)

### 6. .phonePad
Đây là loại bàn phím được thiết kế để nhập số điện thoại.
Loại bàn phím này nổi bật với các số từ 0 đến 9, và các kí tự (*) và (#).
Nó cũng không hỗ trợ viết hoa tự động.

![](https://images.viblo.asia/f7bab345-c8a4-4ad8-859d-3801bfffdb10.png)

### 7. .namePhonePad
Đây là loại bàn phím được thiết kế để nhập tên người hoặc số điện thoại.
Loại bàn phím này cũng không hỗ trợ viết hoa tự động.

![](https://images.viblo.asia/48a09f39-6649-48c1-9cf5-3cb674a3b2b0.png)

### 8. .emailAddress
Đây là loại bàn phím được tối ưu hóa cho việc nhập địa chỉ email.
Loại bàn phím này nối bật với các kí tự (@), (.), và kí tự cách.

![](https://images.viblo.asia/e0a037a2-02e9-44ff-b0d0-3cd6eeccaa23.png)

### 9. .decimalPad
Đây là loại bàn phím chỉ định nhập số và dấu thập phân.

![](https://images.viblo.asia/7152ea0d-331d-46bd-93de-7e2d28cfe61d.png)

### 10. .twitter
Đây là loại bàn phím được tối ưu hóa cho việc nhập văn bản trên Twitter, bạn dễ dàng để nhập các kí tự (@) và (#).

![](https://images.viblo.asia/92279f8d-40bc-4351-aa0b-341e55146705.png)

### 11. .webSearch
Đây là loại bàn phím được tối ưu hóa cho việc nhập cụm từ tìm kiếm trên web và nhập URL.
Loại bàn phím này nối bật với các kí tự cách và dấu (.)
Bạn cũng có phím *Go* với chức năng như là phím *Return* trên các loại bàn phím khác.

![](https://images.viblo.asia/d0c12781-051f-4165-ae0d-2b2acb2c5ea9.png)

### 12. .asciiCapableNumberPad
Loại bàn phím này chỉ định một bảng số mà chỉ cho ra các chữ số ASCII.
Lưu ý: bàn phím này chỉ khả dụng trong iOS 10.0 trở lên.

![](https://images.viblo.asia/e84586a6-2bad-4489-a795-27f366f3b7f9.png)

Nếu bạn nhìn vào *.numberPad* và *.asciiCapableNumberPad*, bạn có thể thấy 2 loại bàn phím này giống nhau nhưng khi bạn sử dụng bàn phím tiếng Ả Rập, Kannada, Konkani bạn sẽ thấy có sự khác biệt giữa 2 loại bàn phím này, như ảnh ở phía dưới đây:

![](https://images.viblo.asia/21eed656-86d8-43fc-ac67-cb13e9236a81.png)

Bên cạnh đó, chúng ta có loại bàn phím thứ 13, đó là *.alphabet*, nhưng nó không được dùng nữa nên tôi sẽ không đề cập đến nó ở trên.

Cảm ơn vì đã đọc!