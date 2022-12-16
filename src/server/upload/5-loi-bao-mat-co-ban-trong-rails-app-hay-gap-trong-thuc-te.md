## 1. Thiếu thời gian hết hạn của session 
Như trong [Securing Rails Applications](https://guides.rubyonrails.org/security.html) ta biết session hay còn gọi là phiên làm việc: 
```ruby 
Sessions that never expire extend the time-frame for attacks such as cross-site request forgery (CSRF), session hijacking and session fixation.
```

tạm dịch là
```ruby
Sessions sẽ không bao giờ hết hạn sẽ làm tăng thời gian cho các cuộc tấn công như CSRF, session hijacking và session fixation
```

Mặc dù, một phiên không hết hạn dường như phù hợp với quan điểm của người dùng (bởi vì người dùng sẽ ở trong trạng thái được đăng nhập mãi, và sẽ không cần phải đăng nhập lại mỗi khi mở lại ứng dụng), nhưng đó là một quan điểm rất tồi tệ. Điều đó sẽ dẫn tới nguy cơ có ai đó sẽ lấy trộm session của user đấy, bởi vì có một trường hợp nào đó, user đã quên đăng xuất khởi máy tính ở một nơi công cộng như 1 quán net chẳng hạn, do đó, session nên cài đặt thời gian hết hạn.

### Giải pháp

Cách đơn giản nhất là cài đặt thời gian hết hạn cho session trong initializer của `config/initializers/session_store.rb`
```ruby
Rails.application.config.session_store :cookie_store, expire_after: 12.hours
```

Với config trên, session cookie sẽ tự động hết hạn trong 12 giờ sau khi tạo. Tuy nhiên, phương pháp này có một lỗ hổng, đó là thời gian hết hạn được cài đặt ở browser của user. Khi đó, nếu có ai đó chiếm quyền kiểm soát session cookie thì có thể dễ dàng tăng thời gian hết hạn bằng cách chỉnh sửa cookie.

Để giải quyết vấn đề trên, thời gian hết hạn nên được lưu lại trên server. 

Nếu bạn dùng gem devise cho xác thực user, thì trong gem đó đã xây dựng module Timeoutable dùng cho xác định một phiên làm việc của user đã được hết hạn hay chưa. Để sử dụng nó, bạn cần phải include trong một model user:

```ruby
class User < ActiveRecord::Base
  devise :timeoutable
end
```

Sau đó, bạn có thể cài đặt option `timeout_in` trong initializer của gem devise, mặc định là 30 phút 
```ruby
# ==> Configuration for :timeoutable
# The time you want to timeout the user session without activity. 
# After this time the user will be asked for credentials again. 
# Default is 30 minutes.
config.timeout_in = 30.minutes
```

Một cách khác là nếu bạn không thích dùng gem, bạn có thể tạo model Session để lưu lại session của user với thời gian created_at và updated_at, khi sử dụng, chúng ta sẽ loại bỏ các record đã hết hạn.

## 2. Thiếu cơ chế khoá hệ thống 
Một user có thể cố gắng đăng nhập vào hệ thống bao nhiêu lần trước khi bị chặn? Nếu hệ thống của bạn là không giới hạn, điều đó nghĩa là bạn có một lỗ hổng bảo mật lớn. Nếu một user có thể cố gắng kết hợp nhiều email và password mà không có một sự ngăn chặn gì, nghĩa là một cuộc tấn công có thể xảy ra. Có thể là một cuộc tấn công brute-force hoặc dictionary 

```
Tấn công Brute-force là cố gắng thử kết hợp tất cả các khả năng có thể. 
Tấn công Dictionary là cuộc tấn công gợi ý dựa vào một tập danh sách các gợi ý phổ biến, gần nhất với mật khẩu của user.
```

### Giải pháp
Để sửa chữa vấn đề này, user nên bị khoá sau khi cung cấp một tập các kết hợp không đúng các user name hoặc email và mật khẩu trong một số lần cụ thể.

Nếu bạn sử dụng gem devise, giải pháp cũng đơn giản như vấn đề thứ nhất. Có một model Lockable cho phép chặn truy cập đến một user sau khi có một số lần cố gắng truy cập không thành công. Số lần đó có thể được cài đặt bởi hệ thống, nhưng 5 thường là con số phù hợp.

Module cung cấp 2 chiến lược mở khoá: 
* `:time` sẽ mở khoá user tự động sau một khoảng thời gian được cài đặt.
* `:email` sẽ gửi một email tới user khi tài khoản bị khoá, chưa một link để mở lại tài khoản.

Mỗi một cách có ưu nhược điểm riêng, nhưng quyết định là dựa vào bạn, gem devise đã cung cấp cả 2 cách này.

Ngoài ra , nếu bạn không sử dụng gem, bạn có thể thực hiện một giải pháp đơn giản hơn, vd có thể dùng captcha chẳng hạn 

![](https://images.viblo.asia/bb9bf0ed-4615-4e66-b30f-8c6b68ff5721.png)

## 3. Liệt kê, gợi ý địa chỉ email  
Đó không phải là một vấn đề nghiêm trọng. Bạn thử vào hệ thống của bạn, chuyển đến trang reset password. Điều gì sẽ xảy ra nếu bạn cung cấp một email không liên quan gì đến user của hệ thống?

Hi vọng đó không trả về một lỗi validate của user với một thông báo là địa chỉ email không tồn tại. Bởi vì, đó có thể dẫn đến một cuộc tấn công, nó giúp kẻ tấn công có thể thu thập danh sách email tồn tại trong hệ thống.

Hacker có thể sử dụng một script tạo ra hàng triệu request với tập các địa chỉ email và dựa theo các phản hồi của hệ thống để xác định email nào tồn tại. Tuy nhiên, bạn có thể chặn đứng cách thức tấn công này bằng cách khoá user như ở phương pháp trên.  

### Giải pháp 
Một ứng dụng nên phản hồi giống nhau khi một user cung cấp địa chỉ email cho một user trong hệ thống. Nhờ vậy, kẻ tấn công sẽ không thể thu thập được các địa chỉ email của user. 

Nếu bạn sử dụng gem devise, thì có một config gọi là `paranoid` với hướng dẫn trong tài liệu là 

`It will change confirmation, password recovery and other workflows to behave the same regardless if the e-mail provided was right or wrong.`

tạm dịch 

`Nó sẽ thay đổi xác nhận, khôi phục mật khẩu và các quy trình công việc khác để hoạt động giống nhau bất kể email được cung cấp là đúng hay sai.`

Hoặc nếu bạn không sử dụng devise, bạn nên điều chỉnh ứng dụng của bạn để trả về giống nhau nếu một user cung cấp địa chỉ email bị sai 

![](https://images.viblo.asia/984f6f49-73e7-439a-999c-acfd20abf69c.jpg)

## 4. Vượt quyền, truy cập trái phép vào tài nguyên 
Đấy là một lỗi rất cơ bản, không nên có , nhưng cũng dễ xảy ra nếu ta không cẩn thận. Giả sử bạn tạo một API mới, trả về các user trong project dựa theo id 

```ruby
GET https://my-rails-app.com/api/projects/:project_id
```

Khi gửi một ID của project, sẽ trả về danh sách user của project đó. Tuy nhiên, nếu bạn tạo một request cho một project được quản lý bởi user khác.

Bạn có thể quên việc giới hạn trả về các user chỉ cho project của user hiện tại.

Có một câu nói tổng kết lại về bảo mật rất hay trong tài liệu Rails: 
```ruby
As a rule of thumb, no user input data is secure, until proven otherwise, and every parameter from the user is potentially manipulated.
```

tạm dịch 

```ruby
Theo nguyên tắc chung, không có dữ liệu đầu vào của người dùng là an toàn, cho đến khi được chứng minh và mọi thông số từ người dùng đều có khả năng bị sửa đổi.
```

### Giải pháp

Luôn luôn ghi nhớ việc giới hạn truy cập tài nguyên vừa đủ nhất có thể. Nếu bạn có thể sử dụng hàm `current_user`, thì ta có thể sửa thành:
 
```ruby
# Ban đầu
Project.find(params[:id])

# Chuyển thành
current_user.projects.find(params[:id])
```

Nếu bạn muốn kiểm soát các tài nguyên theo phương pháp hướng đối tượng, bạn có thể sử dụng gem `pundit` hoặc `cancan`

Khi đó, mọi action trong controller nên được authorize trước đấy 
```ruby
after_action :verify_authorized
```

Gem sẽ thông báo khi bạn quên không gọi hàm `authorize` trong action của controller.

## 5. Cho phép người dùng sử dụng mật khẩu yếu 
Đa số các user của hệ thống không sử dụng các công như như 1password hay KeePass để tự động tạo các mật khẩu bảo mật, lưu trữ lại và tự động điền mỗi khi user đăng nhập.

Mà hầu như user lựa chọn các mật khẩu dễ nhớ và thường sử dụng các mật khẩu giống nhau cho mọi ứng dụng.

Tuy nhiên, với trách nhiệm của một người xây dựng hệ thống, thì cần phải thông báo cho user và chịu trách nhiệm về độ bảo mật dù cho điều đó làm cho user không hài lòng.

Chúng ta không nên cho phép tạo các tài khoản với các mật khẩu dễ nhớ như `12345678` hoặc `qwerty`. Điều đó rất dễ bị lộ thông tin khi bị tấn công brute-force hoặc dictionary.

### Giải pháp
Sử dụng một chính sách khi tạo mật khẩu.

Một chính sách mật khảu bao gồm tập các quy định được thiết kế để tăng cường độ bảo mật của máy tính bằng cách khuyến khích user sử dụng mật khẩu khó.

Để làm được như vậy, ta chỉ cần thêm một ràng buộc trong model User:

```ruby
validate :password_complexity
def password_complexity
  return if password.blank? || password =~ /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/
  errors.add :password, "Complexity requirement not met. Length   
    should be 8-70 characters and include: 1 uppercase, 1 lowercase, 
    1 digit and 1 special character"
end
```

Nếu bạn muốn chắc chắn hơn thì có thể sử dụng gem `strong_password`

![](https://images.viblo.asia/5c61987f-8c8a-480c-a6b6-540133d8b1a1.png)

Trên đây là một vài lỗi bảo mật cơ bản của hệ thống, hi vọng sẽ giúp ích được các bạn trong quá trình xây dựng hệ thống chắc chắn cho người dùng.