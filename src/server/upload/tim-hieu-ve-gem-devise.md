## Giới thiệu Devise và các Mô-đun
Devise là một giải pháp xác thực cho Rails được tích hợp với Warden và được cung cấp bởi những người tuyệt vời tại Plataformatec. Devise cung cấp các mô-đun khác nhau:
* Xác thực Cơ sở dữ liệu: Điều này mã hóa và lưu trữ một mật khẩu vào cơ sở dữ liệu để xác nhận tính xác thực của người dùng trong khi đăng nhập.
* Xác thực với Omniauth: Điều này giúp cho OmniAuth có thể hỗ trợ cho Devise. Người dùng ứng dụng của bạn sẽ có thể đăng nhập bằng tài khoản như Facebook, Twitter và Google.
* Xác nhận: Điều này cho phép việc gởi các email với các chỉ dẫn sẽ giúp xác nhận một tài khoản.
* Khôi phục: Mô-đun này giúp những khi người dùng quên mật khẩu và cần phải khôi phục nó. Với điều này, thì người dùng sẽ có thể thiết lập lại mật khẩu.
* Đăng ký: Điều này xử lý quá trình đăng ký của người dùng. Nó cũng cho phép người dùng chỉnh sửa và xoá các tài khoản của họ.
* Khả năng nhớ: Mô-đun này làm cho ứng dụng của bạn có thể nhớ một người dùng đã đăng nhập bằng cách lưu trữ một cookie.
* Theo dõi: Mô-đun này giúp theo dõi tài khoản đăng nhập, mốc thời gian, và địa chỉ IP.
* Quá thời gian: Mô-đun này chịu trách nhiệm cho một phiên hết thời hạn mà đã không được kích hoạt trong một khoảng thời gian.
* Kiểm tra hợp lệ: Với mô-đun này, email và mật khẩu sẽ được kiểm tra tính hợp lệ.
* Khả năng khoá: Điều này cung cập một lớp phụ của bảo mật - khi được kích hoạt, một tài khoản có thể bị khoá sau một số lần cố gắng đăng nhập thất bại.
## Cài đặt
Tạo một project mới trong cửa sổ console
```
rails new demo_devise
```
Thêm gem devise vào Gemfile
```
gem "devise"
```
Sau đó chạy trong cửa sổ terminal
```
bundle install
rails generate devise:install
```
Sau khi thêm gem devise vào chúng ta cần tạo model sử dụng dem devise cho hệ thống.Ví dụ bạn muốn quản lí người dùng trong bảng User gõ lệnh sau.
```
rails generate devise User
```
Lệnh trên sẽ tạo ra file 
> db/migrate/20180428154229_devise_create_users.rb
> 
Sau khi thực hiện các bước trên bạn cần migrate lại dữ liệu:
```
rake db:create
rake db:migrate
```
Như vậy về cơ bản các bạn đã hoàn thành xong việc đưa gem devise vào ứng dụng rails của mình. Dưới đây mình sẽ giới thiệu về các method của devise
## Các helper method hỗ trợ hay dùng và hữu ích
* authenticate_user! : authenticate_user! là method ở trong controller. đảm bảo người dùng đã đăng nhập. Hàm này được gọi thông qua before_action.
* current_user: Trả về người dùng đang đăng nhập. Nó sẽ trả về nil khi người dùng chưa đăng nhập
* user_signed_in?: Trả về True hoặc False. True nếu user đã đăng nhập, và ngược lại
* sign_in(@user) , sign_out(@user) : Thực hiện login, logout user
* user_session: Trả về dữ liệu người dùng login.
## Các tính năng trong modules
```
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :confirmable, :lockable, :timeoutable
end
```
* database_authenticatable: Đảm bảo mật khẩu được nhập chính xác và mã hóa chúng trước khi lưu vào cơ sở dữ liệu
* confirmable: Đảm bảo việc người dùng đăng kí tài khoản sẽ xác nhận tài khoản qua mail mà Devise gửi. Đây là 1 biện pháp để tránh tạo các tài khoản fake.
* recoverable: Xử lí quên mật khẩu *resetpasswordkeys*: Các phím bạn muốn sử dụng khi khôi phục lại mật khẩu cho một tài khoản *resetpasswordwithin*: Khoảng thời gian trong đó mật khẩu phải được đặt lại hoặc token hết hạn. *signinafterresetpassword*: Có hoặc không đăng nhập người dùng tự động sau khi đặt lại mật khẩu.
* registerable : Cho phép người dùng đăng kí và sau đó thay đổi thông tin đăng nhập
* rememberable: Khi chọn Remember me trên form login. Dựa trên cookie giúp lưu mật khẩu kể từ lần đăng nhập sau
* trackable: Lưu trữ thông tin đăng nhập (địa chỉ IP máy người dùng, thời gian đăng nhập, tổng số lần đăng nhập) Các thông tin được lưu vào các cột: *signincount*: Tăng sau mỗi lần đăng nhập *currentsigninat*: Đánh dấu thời gian khi người dùng đăng nhập *lastsigninat*: Thời gian đăng nhập trước đó *currentsigninip*: IP truy cập khi người dùng đăng nhập *lastsigninip*: IP truy cập lần trước đăng nhập
* validatable : Đảm bảo email, mật khẩu phù hợp với một định dạng cụ thể. Có các option tương ứng là *emailregexp*: Biểu thức chính quy để xác nhận tính hợp lệ của email, *passwordlength*: Xác định độ dài của mật khẩu.
* lockable: Giới hạn số lần đăng nhập sai. Hạn chế truy cập tài khoản trong 1 khoảng thời gian và gửi email bao gồm link để mở khóa tài khoản.
## Kết luận
Trên đây mình đã giới thiệu các method và tính năng của các modules trong gem devise. Ở phần sau mình sẽ hướng dẫn các bạn làm thế nào để có thể cấu hình view và controller.
Cảm ơn các bạn đã theo dõi.

Tài liệu tham khảo: 

https://code.tutsplus.com/vi/tutorials/exploring-devise-part-1--cms-26587

https://github.com/plataformatec/devise