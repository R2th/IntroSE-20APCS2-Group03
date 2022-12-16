## Giới thiệu
CSRF là phương thức tấn công bằng cách hacker lấy quyền xác thực của một user để gửi request mà người dùng đó không mong muốn. Thông qua các mạng xã hội hoặc email hacker có thể gửi đường dẫn cho người dùng và lừa người dùng thực hiện các hành động theo chỉ dẫn của hacker. Với một tấn công CSRF thành công có thể lừa người dùng thực hiện các hành động chuyển tiền, thay đổi địa chỉ email....
## Mô tả cách thức tấn công
Để thực hiện tấn công csrf thành công cần có 3 yếu tố chính:
- Thao tác của người dùng: Điều kiện đầu tiên của csrf là người dùng phải thực hiện hành động theo mong muốn của hacker(click vào đường dẫn nguy hại....)
- Xử lý session dựa trên cookie: server xác định http request của user chỉ bằng cookie. Không có cơ chế nào khác để theo dõi phiên hoặc xác thực yêu cầu của người dùng.
- params http request không bao gồm thông số không thể đoán được.
Để hiểu hơn về cách thức tấn công này các bạn có thể xem hình minh họa dưới đây.

![](https://images.viblo.asia/55b0b5d3-d220-4257-a1fd-368f7ccbba2a.png)

ở đây hacker gửi một thẻ img có source dẫn tới "http://www.webapp.com/project/1/destroy" cho người dùng của website "http://www.webapp.com" mà người dùng mới xác thực trước đó (phiên làm việc chưa hết hạn).

Khi người dùng click vào thẻ img mà hacker gửi, browser sẽ gửi request delete project có id là 1 đến "http://www.webapp.com" cùng với cookie của người dùng do người dùng đã xác thực trên trang web này trước đó nên server sẽ thực hiện xóa project có id bằng 1 mà người dùng không hề hay biết.

CSRF tấn công chức năng nhắm mục tiêu gây ra thay đổi dữ liệu người dùng trên server, chẳng hạn như thay đổi địa chỉ email hoặc mật khẩu của người dùng hoặc mua thứ gì đó.
## Cách phòng tránh tấn công CSRF

## Phía Server

### Sử dụng CRSF TOKEN
- Bằng việc thêm csrf-token vào form mỗi khi user submit lên server sẽ gửi theo csrf-token vì vậy có thể xác định được request được gửi từ chính trang đó. csrf-token phải không thể đoán trước, ứng với mỗi request sẽ có token riêng.
### Sử dụng http method đúng cách
- không sử dụng method get cho các thao tác cập nhật, tạo dữ liệu
### Sử dụng cookie riêng biệt cho trang admin
- Nên để trang quản trị ở một subdomain riêng để chúng không dùng chung cookies với front end của sản phẩm. Ví dụ nên đặt là admin.website.vn hay hơn là website.vn/admin

## Phía User
- Nên thoát khỏi các website quan trọng: Tài khoản ngân hàng, thanh toán trực tuyến, các mạng xã hội, gmail, facebook… khi đã thực hiện xong giao dịch hay các công việc cần làm. (Check email…)
- Không nên click vào các đường dẫn không tin cậy mà bạn nhận được qua email, facebook …
- Không lưu các thông tin về mật khẩu tại trình duyệt của mình (không nên chọn các phương thức “đăng nhập lần sau”, “lưu mật khẩu” …
- Trong quá trình thực hiện giao dịch hay vào các website quan trọng không nên vào các website khác, có thể chứa các mã khai thác của kẻ tấn công.