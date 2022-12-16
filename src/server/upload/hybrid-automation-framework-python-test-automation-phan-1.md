> **Yêu cầu:** 
* Python cơ bản
* Excel
* Kiến thức cơ bản về testing

> **Sự cần thiết của Framework**

* Xét ví dụ sau: Trang gmail.com là Application Under Test. Tính năng cần test là:
    1. Compose email/Soạn thư
    2. Create contacts/Tạo contact
    3. Receiving an email/Nhận thư

- Có nhiều automation testers, mỗi người làm việc với một tính năng ở trên. Giờ thì, kịch bản sẽ phải có code thực hiện các hành động sau đây:
    - Soạn thư: Gmail.com được mở lên -> Login -> Soạn email -> Viết nội dung, thêm tệp đính kèm -> Send email -> Logout
    - Tạo contacts: Gmail.com được mở lên -> Login -> Chọn contacts -> Tạo contact -> Save -> Logout.
    - Nhận email: Gmail.com được mở lên -> Login -> Kiểm tra email -> Đọc email -> Logout
- Tất cả kịch bản trên phải được test cho nhiều người dùng với các tham số khác nhau cho mỗi hành động. Ta thấy rằng có vài việc lặp đi lặp lại trong các hành động trên:
    - Gmail.com được mở ra
    - Login
    - Logout
- Chúng ta có thể giảm đáng kể thời gian và effort nếu ta tạo ra thành phần chung cho mỗi lần chạy, tức là có tính Tái Sử Dụng, khi đó chỉ tạo 1 lần, debug 1 lần nhưng tái dùng nhiều lần.
- Tính tái sử dụng cũng đảm bảo rằng nếu có sự thay đổi nào đó, thì chỉ cần thay đổi ở một nơi. Tức là có sự tập trung.
- Ví dụ, nếu trang chủ của gmail.com thay đổi, ta không cần phải thay đổi trong từng kịch bản, mà chỉ cần sửa trong cái thành phần dùng chung.
- Tóm lại, test automation framework là thứ bạn cần và có thể giúp đỡ bạn rất nhiều.

Bài tham khảo và dịch từ nguồn: http://www.softwaretestinghelp.com/why-do-we-need-test-automation-framework/