## 1. CSRF là viết tắt của (Cross Site Request Forgery
là kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với một website. CSRF là kỹ thuật tấn công vào người dùng, dựa vào đó hacker có thể thực thi những thao tác phải yêu cầu sự chứng thực. Hiểu một cách nôm na, đây là kỹ thuật tấn công dựa vào mượn quyền trái phép. Ngoài ra còn có tên khác là "session riding", "XSRF".

## 2. Ví dụ cho việc tấn công CSRF.

- Khách hàng **Nguyễn Văn Bảy** đang sử dụng dịch vụ của ngân hàng A. Trông tin này được lưu trong database của ngân hàng.
![](https://images.viblo.asia/43ab9d28-24c5-4a99-9098-7b946baf5ef1.png)
- Anh Bảy có **1000$** trong tài khoản. :) Một ngày đẹp trời, nhà anh ta mất mang. Anh ra quán nét để giao dịch chuyển tiền cho khách hàng. :vulcan_salute: . Thật không may bằng một cách nào đó hacker biết được thông tin về form chuyển tiền của anh ta.
- ![](https://images.viblo.asia/c76ce3f9-638e-475a-a1ec-8fedaa3d640d.png) 
- Gồm có:
    - **action = /transactions**
    - **method = post**
    - **trường dữ liệu**
        - **money**(số tiền muốn chuyển)
        - **title** (tiêu đề - tóm tắt nội dung chuyển khoản)
        - **user_id** : là id người chuyển khoản.
- Hắn tạo ra một websize có đường dẫn ví dụ như sau:
    - **http://localhost:3001/payments?money=100&user_id=1&title=anonymous**
-  Sau khi click đường dẫn này. :D sẽ có một form được submit trùng với form mà anh **Bảy** submit khi thực hiện giao dịch chuyển tiền. 
-  ![](https://images.viblo.asia/30978846-3d71-480f-9750-f6415e1f5b60.png)
-  Tiếp sau hắn gửi cho anh khách hàng một email chứa nội dung dụ dỗ click vào đường dẫn **http://localhost:3001/payments?money=100&user_id=1&title=anonymous** mà hắn ta chuẩn bị trước.
- ![](https://images.viblo.asia/845060e9-df97-48a4-8657-a8445ae8a32c.png)
- Thế là mọi thứ đã xong chỉ cần chờ cá cắn câu . :D :D :D 
- Anh Bảy vì thấy email **được khen thưởng** :D nên đã không để ý mà click vào đường dẫn mà tên hacker chuẩn bị trước. :v Thế là số tiền của anh ta tự dưng bị chuyển đi cho tên hacker.
![](https://images.viblo.asia/82a85401-0979-4042-9441-9f783226056d.png)
- Với hacker kiếm tiền không khó đúng không nào. :( 
- Trên là một ví dụ của việc **tấn công CSRF**

## 3. Tổng quan cách phòng chống CSRF

1. **Phía client.**
    - Nên **thoát khỏi các website quan trọng**: Tài khoản ngân hàng, thanh toán trực tuyến, các mạng xã hội.. sau khi **hoàn thành giao dịch**.
    - Không nên click vào các đường dẫn mà bạn nhận được qua **email, qua facebook** … Kiểm tra địa chỉ đến trước khi click để điều hướng.
    - **Không lưu các thông tin** về mật khẩu **tại trình duyệt** của mình.
    - **Trong quá trình thực hiện giao dịch** hay vào các website quan trọng **không nên vào các website khác**, có thể chứa các mã khai thác của kẻ tấn công.

2. **Phía server.**
    - Sử dụng **captcha** hoặc các th**ông báo xác nhận** để kiểm tra xem có phải con người đang giao tiếp với máy tính hay không. Nên sử dụng cho những action quan trọng như **đăng nhập**, hay những **giao dịch chuyển tiền**....
    - Sử dụng **token**: Tạo ra một token tương ứng với mỗi form, token này sẽ là duy nhất đối với mỗi form.
    - Kiểm tra IP: Một số hệ thống quan trọng **chỉ cho truy cập từ những IP được thiết lập sẵn**

## 4. Tìm hiểu cách phòng chống CSRF trong rails sử dụng token.
1. **Cơ chế xác thực.**
- Rails cung cấp một **cơ chế sinh token**. Token này là duy nhất và được thêm vào nhúm vào **from html khi render và đồng thời cũng được lưu trong session cookie trên server.** Khi submit form csrf token sẽ được gửi kèm theo request và lúc này rails sẽ so sánh xem giá trị gửi kèm request và giá trị lưu trong session cookies có khớp không và trả về kết quả.
2. **Cách sử dụng trong rails.**
- Trong rails cũng cấp sẵn việc xác thực bằng **CFRS**.
Có 3 cách để xây dựng RequestForgeryProtection có 3 chiến lược để xây dựng vào module RequestForgeryProtection ::ProtectionMethods của ActionController: là exception, null_session và reset_session.
3. **Tìm hiểu từng chiến lược .**
- Bây giờ cùng mình tìm hiểu qua các option của protect_form_forgery nhé. :) :D :D 
    
    - protect_from_forgery with: **:null_session**
        - Trong rails 5 null_session được xét mặc định. 
        - Thường sử dụng cho các ứng dụng phát triền theo hướng viết API.
        - Nó không sử dụng cho đối tượng sử dụng phiên làm việc như các ứng dụng Angular, Reac native...
        - Phiên làm việc của người dùng cũng sẽ không bị ảnh hưởng.
    
    - protect_from_forgery with: **:exception**
        - sẽ bắn ra ngoại lệ nếu cuộc tấn công CSRF xảy ra làm cho ứng dụng ngừng hoạt động.

    - protect_from_forgery with: **:reset_session**
        - Khi server phát hiển ra có cuộc tấn công CSRF lập tức người dùng bị đăng xuất ra khỏi ứng dụng.

- Ngoài ra, Nếu ứng dụng của bạn vì một lý do gì đó mà không muốn sử dụng module này của rails. Bạn cũng có thể vô hiệu hóa nó bằng cách thêm vào file.
```
Thêm vào file : app/controllers/application.html.erb

skip_before_action :verify_authenticity_token
```

- Hoặc bạn có thể chỉ định cụ controler nào, action nào muốn bỏ qua xác thực CSRF bằng cách:
```
# app/views/layouts/application.html.erb
Thêm vào file : app/controllers/myController.rb (myController là controller muốn bỏ qua xác thực CSRF)

skip_before_action :verify_authenticity_token, only: %i(create)
```

Tùy thuộc vào mục đích của nhà phát triền mà các bạn nên cân nhắc xem sử dụng option nào của module RequestForgeryProtection. :D

- Bài viết mang tính chất chia sẻ :D mong mọi người thấy hạnh phúc khi đọc bài của mình. hihi!!!
- À còn về nó hoạt động như thế nào mình sẽ chia sẻ ở bài viêt sau nhé :D :D :D :violin: 

## Tài liệu tham khảo :)
    - https://marcgg.com/blog/2016/08/22/csrf-rails/
    - https://viblo.asia/p/tim-hieu-ve-csrf-protection-trong-rails-m68Z08BAZkG