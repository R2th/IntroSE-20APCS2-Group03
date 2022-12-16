### Introduction
Phương thức bảo mật 2 lớp (2-factors authentication - 2FA) hiện nay được sử dụng ngày một phổ biến hơn trong lĩnh vực công nghệ thông tin và có thể dễ dàng thấy ở bất cứ đâu, từ việc đăng kí hoặc đăng nhập quản lí account, xác thực, giao dịch , thanh toán trực tuyến, ... vì tính bảo mật của phương thức này cao hơn phương thức bảo mật cũ rất nhiều.

Tuy nhiên việc sử dụng 2FA không đồng nghĩa với việc bỏ qua lớp bảo mật thứ nhất (first factor) - thường là password. Ngoài việc validate password bằng Regex , ta cũng có thể kết hợp thêm với các authenticate API bên thứ 3, ví dụ như `Pwned`.

`Pwned` được viết ra bởi Troy Hunt, qua nhiều năm thu thập và thống kê danh sách các tài khoản đã từng bị lộ thông tin cá nhân(bao gồm email và password) ở nhiều dịch vụ khác nhau bởi các vụ rò rỉ data hoặc bị hacker tấn công vào hệ thống(public breaches of data). Chi tiết có thể xem thêm tại [đây](https://haveibeenpwned.com/About).

### The API
`Pwned` cho phép người dùng kiểm tra xem password mà mình nhập vào có nằm trong danh sách đã từng bị lộ thông tin hay không. Nếu câu trả lời là có, nó sẽ chỉ ra rằng password mà người dùng đã nhập vào đã xuất hiện(được sử dụng) bao nhiêu lần, với số lượng data khổng lồ, hơn 500,000,000 passwords khác nhau tính đến thời điểm hiện tại.

Việc sử dụng `Pwned` trong hệ thống cũng đồng nghĩa với việc mỗi một lần người dùng nhập password, thì password đó cũng sẽ được gửi đến cho bên thứ 3. Tuy nhiên chúng ta cũng không cần phải lo lắng, thay vì gửi toàn bộ những gì mà người dùng nhập vào, thì sau khi mã hóa password bằng  thuật toán SHA-1, `Pwned` chỉ cần 5 kí tự đầu tiên của chuỗi mà thôi. Và phía bên thứ 3 sẽ check nếu như trong database của họ tồn tại ít nhất một chuỗi bất kì có chứa 5 kí tự được gửi đến, có nghĩa là password mà người dùng vừa nhập vào đã bị ''pwned'.

Nghe cũng khá thú vị, bây giờ chúng ta cùng thử xem `Pwned` hoạt động trong hệ thống như thế nào:
* Việc đầu tiên cần làm đó là cài gem:
```
gem install pwned
```
Mở rails console và test thử trước 1 password bất kì, "qwerty123" chẳng hạn:
```
pw = Pwned::Password.new("qwerty123")
pw.pwned?
#=> true
pw.pwned_count
#=> 554177
```
Có thể thấy ở đây password "qwerty123" đã bị "pwned" và xuất hiện trong danh sách khoảng 554177 lần (yaoming)
* Trong model User:
```
class User < ApplicationRecord
  has_secure_password

  validates :password, not_pwned: true
end
```
Sau đó chỉ việc validate như bình thường:
```
user = User.new(name: "thanos", email: "eliminate@half-overpopulation.com", password: "123123")
user.valid?
#=> false
user.errors.messages
#=> {:password=>["has previously appeared in a data breach and should not be used"]}
```
Có khá nhiều tùy chọn khác nhau trong việc sử dụng validate trong "Pwned", chẳng hạn như thiết lập ngưỡng số lần xuất hiện của một password trong data hoặc logic xử lí sau khi API trả về kết quả lỗi, chi tiết có thể tham khảo thêm tại [đây](https://github.com/philnash/pwned#activerecord-validator).

Chằng hạn như với những password "không may" xuất hiện trong danh sách 01 lần và chúng ta "giả sử như" nó vẫn sạch, ta có thể thiết lập ngưỡng cho nó:
```
validates :password, not_pwned: { threshold: 1 }
```
`Pwned` cũng hỗ trợ cho hệ thống sử dụng `Devise` thông qua gem `devise-pwned_password`:
```
gem "devise-pwned_password", "~> 0.1.4"
```
Sau đó ta tiến hành thêm `:pwned_password` vào trong method của Devise là xong:
```
class User < ApplicationRecord
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable, :pwned_password
end
```
Ta cũng có thể dùng Devise để cảnh báo người dùng sau khi đăng kí (hoặc đăng nhập) rằng password của họ không an toàn bằng việc override lại hàm `after_sign_in_path_for` của devise như sau:
```
def after_sign_in_path_for(resource)
  set_flash_message! :alert, :warn_pwned if resource.respond_to?(:pwned?) && resource.pwned?
  super
end
```

Qua bài viết mình muốn giới thiệu về `Pwned` -  third-party authentication API mà theo mình thấy cũng khá là thú vị. Cảm ơn các bạn đã đọc bài viết.

[Nguồn](https://dev.to/philnash/better-passwords-in-ruby-applications-with-the-pwned-passwords-api-4o9f) và tài liệu tham khảo:
* https://github.com/philnash/pwned
* https://haveibeenpwned.com/About