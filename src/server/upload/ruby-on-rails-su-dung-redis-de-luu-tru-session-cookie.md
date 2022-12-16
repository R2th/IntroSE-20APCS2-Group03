Session và Cookie là hai đối tượng đặc biệt được nhắc tới rất nhiều của các lập trình viên cho phép bạn thao tác với chúng giồn như thao tác với một đối tượng hash. Vậy có cách thức hoạt động, chúng được lưu trữ ở đâu . Chúng ta hãy cùng nhau tìm hiểu.
### **1. SESSION**
Session có thể hiểu là phiên làm việc. Nó là cách đơn giản để lưu trữ 1 biến và khiến biến đó có thể tồn tại từ trang này sang trang khác. Session bắt đầu khi người sử dụng truy cập vào ứng dụng lần đầu tiên, và kết thúc khi người sử dụng thoát khỏi ứng dụng. Một session thường được gắn với 1 mã số định danh (Session ID) và 1 hash chứa 1 số thông tin nhất định của người dùng.
Dưới đây là một số thao tác cơ bạn với session: 

```
> session.to_hash
=> {"_csrf_token"=>"zOO9DV0SOrxouyy/VWs6G+e6b98ZabC7CftOlj/UceA=",
"session_id"=>"d10e1cf53b22396bb0f6a952918fa903"}
> session[:user_id] = 1
> session[:test] = "test"
> session.to_hash
=> {"_csrf_token"=>"zOO9DV0SOrxouyy/VWs6G+e6b98ZabC7CftOlj/UceA=",
 "session_id"=>"d10e1cf53b22396bb0f6a952918fa903",
 "user_id"=>1,
 "test"=>"test"}
> session.delete(:test) # xóa session[:test] có thể dùng session[:test] = nil
> session.to_hash
=> {"_csrf_token"=>"zOO9DV0SOrxouyy/VWs6G+e6b98ZabC7CftOlj/UceA=",
"session_id"=>"d10e1cf53b22396bb0f6a952918fa903", "user_id"=>1}
> session.clear # chú ý lệnh này chỉ xóa dữ liệu trong session chứ không phải xóa cả session id, request tiếp theo vẫn sử dụng session id này
> session.to_hash
=> {}
```
### ***Session ID***
Session ID là một chuỗi kí tự ngẫu nhiên dùng để phân biệt 1 session với các session khác. Trong Rails, Session ID là 1 chuỗi 32 kí tự, là kết quả của việc mã hóa MD5 1 chuỗi kí tự ngẫu nhiên khác được tạo thành từ: thời gian hiện tại, 1 sỗ ngẫu nhiên giữa 0 và 1, process id của trình dịch Ruby và 1 chuỗi cố định. Với Rails 4 bạn có lấy giá trị của Session ID trong controller như sau:
```
[1] pry(#)> session.id
=> "06383951600dd0fc8713fafd63142fce"
```
Session ID được client lưu trữ trong cookie và gửi kèm theo mỗi request đến server. Tên của cookie dùng để lưu trữ Session ID có thể được set thông qua việc set giá trị cho biến key ở file `config/initializers/session_store.rb.`

### ***Cách thức hoạt động***
Session khi sinh ra được lưu trên 1 file có tên dài dòng, khó đoán và được tạo ngẫu nhiên là session id trên máy chủ, và đồng thời ở máy client cũng có 1 cookie sinh ra có nội dung (hoặc giá trị) đúng như session id (để có thể so khớp session nào là của client nào).
### **2.COOKIE**
Cookie là một phần dữ liệu được lưu trên máy khách. Mỗi khi máy khách gửi một yêu cầu tới máy chủ nào đó, thì nó sẽ gửi phần dữ liệu được lưu trong cookie tương ứng với máy chủ đó.
- Trong cookie sẽ có 1 số thông số sau:
+ Địa chỉ URL mà trình duyệt sẽ gửi cookie tới
+ Thời gian hết hạn của cookie
+ Các cặp biến: giá trị được lưu trữ liên tục
Cookies là dữ liệu được lưu trữ trên browser dưới dạng key-value, mỗi cookie (một cặp key-value) tồn tại cho đến khi nó bị hết hạn (expired)
Dưới đây là một số ví dụ sử dụng cookies trong Rails cũng khá đơn giản:
```rails
# cookie thông thường
cookies[:demo_normal] = "normal"

# giá trị của cookie sẽ được mã hóa
# cookie này được mã hóa với key là `secrets.secret_key_base`.
cookies.signed[:demo_signed] = "signed"

# giá trị của cookie sẽ được mã hóa tương tự như cookies.signed
# cookie này được mã hóa với key là `secrets.secret_key_base`.
cookies.encrypted[:demo_encrypted] = "encrypted"

# khi dùng http only thì cookie sẽ ko thể đọc được bằng javascript, và cookie sẽ hết hạn sau thời gian expires
cookies[:demo_httponly] = {value: "http only", expires: Time.current + 1.hour, httponly: true}

# khi dùng cookies.permanent cookie này sẽ hết hạn sau một thời gian rất dài  khoảng 20 năm từ thời điểm hiện tại
cookies.permanent[:demo_permanent] = "permanent"
```
Lưu ý là khi bạn set cookie mà không có thời gian expires thì cookie đó sẽ bị expires theo kiểu của session (expires khi trình duyệt bị đóng).
### **3. Redis để lưu trữ session, cookie**

Trong Ruby on Rails, mặc định session sẽ được lưu trên cookie trên trình duyệt của client. Vì vậy điều này phát sinh rủi ro về bảo mật dữ liệu phiên làm việc của người dùng. Ngoài ra cơ chế của trình duyệt chỉ cho lưu trữ cookie với dung lượng tối đa là 4kb. Nếu vượt quá 4kb, thì ứng dụng Rails của bạn sẽ phát sinh lỗi và không thể lưu thêm thông tin vào session được nữa. Vì vậy giải pháp được đưa ra là lưu trữ session trên database hoặc Redis.

### **Hướng dẫn cài đặt Redis Server**
Tiền đề bài viết này là mình sử dụng Ubuntu 16.04, và đã cài đặt Ruby on Rails trên Ubuntu
```
sudo apt-get install redis-server redis-tools
```
Kiểm tra Redis đã cài đặt thành công chưa? Sử dụng lệnh redis-cli ping. Nếu kết quả trả về `“PONG”` như bên dưới là chúng ta đã cài đặt thành công.
### Cấu hình Ruby on Rails sử dụng Redis
Sửa file **Gemfile** của Ruby on Rails thêm dependency của Redis

```
#Redis store
gem 'redis-rails'
gem 'redis-store', '~> 1.4.0'
```
Chạy command bundle để update lại gem:
`bundle update`
Tạo file có đường dẫn:` config/initializers/session_store.rb` với nội dung như bên dưới:
```
Rails.application.config.session_store :redis_store,
                                       secure: false,
                                       servers: redis://127.0.0.1:6379/0/session,
                                       expire_in: 604800
```
Bây giờ dữ liệu của session trong ứng dụng Rails của bạn đã được lưu trên Redis, thay cho lưu trên Cookie của trình duyệt rồi đấy.

**Tài liệu tham khảo**

https://zaiste.net/session_vs_cookie_in_rails/

https://viblo.asia/p/sessions-cookies-voi-rails-bxjeZYYNGJZ