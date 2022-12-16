Trong quá trình phát triển dự án, khi dựng server trên môi trường test/staging chẳng hạn, để đảm bảo thông tin của dự án không bị lộ ra ngoài, khách hàng có thể đưa ra 1 số yêu cầu như tạo 1 bộ lọc những IP được phép truy cập vào server đó hay yêu cầu truy cập vào server phải thông qua vpn. Tuy nhiên đó là những yêu cầu về mặt infra, còn về phía server, biện pháp thường được áp dụng là sử dụng HTTP authentication như basic authentication hoặc digest authentication. Trong thực tế, khách hàng cũng thường đưa ra yêu cầu áp dụng basic authentication hoặc digest authentication để đảm bảo mật cho sản phẩm đang phát triển của họ. Vậy việc áp dụng các biện pháp authentication cơ bản này có khó khăn hay tốn thời gian không. Phần tiếp theo của bài viết sẽ hướng đến cách thức hoạt động của 2 phương pháp authentication này và cách thức implement chúng trên nền tảng Ruby on Rails.

# 1. HTTP authentication

## HTTP sử dụng cơ chế authenticate challenge/response

Điều đó có nghĩa là gì ?

Khi ai đó gửi 1 request, thay vì response - trả lời - ngay lập tức, server sẽ gửi 1 authentication challenge (thử thách để xác thực). Nó yêu cầu user chứng minh mình có quyền truy cập để lấy thông tin trên server bằng cách đòi cung cấp những thông tin bí mật (username và password). Tiếp đó request được lặp lại với việc đưa thêm thông tin chứng thực. Nếu thông tin đó đúng, server sẽ trả lại thông tin mà user muốn, trường hợp ngược lại, server có thể tiếp tục đưa challenge hoặc báo message lỗi.

## Việc authenticate có liên quan đến headers trong request/response

Server đưa ra chanllenge bằng cách sử dụng response header `WWW-Authenticate`. Nó chứa thông tin về giao thức authentication và security realm.

Sau khi client nhập thông tin chứng thực, request được gửi lại. Lần này trong request header `Authorization` sẽ chứa thông tin về thuật toán authentication và 1 bộ thông tin kết hợp từ username và password.

Nếu như việc chứng thực ok, server sẽ trả về response + những thông tin bổ sung trong response header `Authentication-Info`

## Security realms

Security realms cung cấp phương thức để liên kết các access rights - quyền truy cập - khác nhau tới các nhóm resource khác nhau trên server.

Điều đó có nghĩa là tuỳ thuộc vào việc bạn muốn truy cập resource nào trên server mà bạn cần phải có các credential tương ứng. Server có thể có nhiều realm. Ví dụ: realm để truy cập các thông tin thống kê mà chỉ có website admins mới có quyền truy cập, hay realm để truy cập các ảnh của website mà những user khác upload ...

```
/admin/statistics/financials.txt -> Realm=”Admin Statistics”

/images/img1.jpg -> Realm = “Images”
```

Khi bạn thử truy cập vào file financials.txt bạn sẽ bị challenge bởi server và response sẽ trông như sau:

```
HTTP/1.0 401 Unauthorized
WWW-Authenticate: Basic realm="Admin Statistics"
```

## HTTP authentication sample
Để dễ tưởng tượng về HTTP authentication bạn có thể xem ví dụ dưới đây

1. User Agent -> Server

  User gửi request để access 1 bức ảnh trên server
```
GET /gallery/personal/images/image1.jpg HTTP/1.1
Host: www.somedomain.com
```
2. Server -> User Agent

  Server gửi lại authentication challenge cho user.
```
HTTP/1.1 401 Access Denied
WWW-Authenticate: Basic realm="gallery"
```
3. User Agent -> Server

  User chứng thực bằng cách nhập thông tin vào form input
```
GET /gallery/personal/images/image1.jpg HTTP/1.1
Authorization: Basic Zm9vOmJhcg==
```

4. Server -> User Agent

Server check credentials mà user cung cấp và gửi lại response 200 OK cùng với dữ liệu bức ảnh

```
HTTP/1.1 200 OK
Content-type: image/jpeg
...<image data>
```

# 2. Basic authentication

`Basic Authentication` là 1 trong những giao thức authenticatino phổ biến, được áp dụng rộng rãi, xuất hiện từ HTTP/1.0.

## Cách thức hoạt động của Basic Authentication

Basic authentication đóng gói username và password vào thành 1 string, ngăn bởi đấu hai chấm `:`. Sau đó encode string đó bằng cách sử dụng Base64 encoding. Mặc dù kết quả của quá trình này là 1 chuỗi kí tự lộn xộn tuy nhiên thực tế thì Base64 encoding hoàn toàn có thể decode dễ dàng. Mục đích của Base64 encoding vốn không phải là để mã hoá bảo mật mà chỉ là để làm cho thông tin username và password có thể `HTTP compatible` do các kí tự quốc tế có thể không hợp lệ trong HTTP headers.

```
GET /gallery/personal/images/image1.jpg HTTP/1.1
Authorization: Basic Zm9vOmJhcg==
```

Nhìn lại ví dụ trong phần `HTTP authentication`, thực tế ví dụ này sử dụng `Basic Authentication` và chuỗi `Zm9vOmJhcg==` thực tế đơn giản chỉ là string sau khi Base64 encoded của string `foo:bar`

```Ruby
$ irb
2.5.1 :001 > require "base64"
 => true
2.5.1 :002 > Base64.decode64("Zm9vOmJhcg==")
 => "foo:bar"
```
## Security problem

ßất cứ ai nghe được request của user đều có thể dễ dàng decode và sử dụng thông tin credentials này vào mục đích bất chính. Thậm chí, không cần decode, các script độc có thể đơn giản gửi luôn chuỗi kí tự lộn xộn sau khi encode lên thẳng server và vẫn có thể thu được kết quả tương tự.

Mặc dù vậy phương pháp `Basic Authentication` vẫn có thể dùng để phòng chống những trường hợp vô tình truy cập vào những resource không được cho phép và cung cấp 1 mức độ riêng tư nhất định cho các resource.

Để sử dụng 1 cách an toàn hơn, `Basic Authentication` nên được implement cùng với `HTTPS` thông qua `SSL`

# 3. Digest authentication

`Digest Authentication` là 1 phương pháp thay thế bảo mật và đáng tin hơn phương pháp đơn giản nhưng thiếu bảo mật như `Basic Authentication`

## Cách thức hoạt động của Digest Authentication

`Digest Authentication` sử dụng mã hoá `MD5` kết hợp với `nonces` - number used once (mã số dùng 1 lần) để ẩn thông tin password và phòng chống các loại attack.

Cách thức hoạt động của nó phức tạp hơn so với `Basic Authentication`, có thể nhận thấy trong ví dụ mô tả dưới đây.

1. User Agent -> Server
```
GET /dir/index.html HTTP/1.0
Host: localhost
```
User gửi 1 request mà chưa được authenticate.

2. Server -> User Agent

```
HTTP/1.0 401 Unauthorized
WWW-Authenticate: Digest realm="shire@middleearth.com",
                        qop="auth,auth-int",
                        nonce="cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ",
                        opaque="c29tZXJhbmRvbW9wYXF1ZXN0cmluZw"
Content-Type: text/html
Content-Length: 153
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Error</title>
  </head>
  <body>
    <h1>401 Unauthorized.</h1>
  </body>
</html>
```

Server gửi challenge cho user yêu cầu authenticate dùng `Digest Authentication` và gửi 1 số thông tin cần thiết cho user.

3. User Agent -> Server

```
GET /dir/index.html HTTP/1.0
Host: localhost
Authorization: Digest username="Gandalf",
                     realm="shire@middleearth.com",
                     nonce="cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ",
                     uri="/dir/index.html",
                     qop=auth,
                     nc=00000001,
                     cnonce="0a4f113b",
                     response="5a1c3bb349cf6986abf985257d968d86",
                     opaque="c29tZXJhbmRvbW9wYXF1ZXN0cmluZw"
```

Phía user client tính toán các giá trị và gửi lại cho server những thông tin như `username, realm, URI, nonce, opaque, qop, nc, cnonce`

1 số khái niệm mới được đề cập trong bước này:

- nonce and opaque – chuỗi string mà server định nghĩa cần được trả lại khi phía client nhận được
- qop (quality of protection) – là 1 hoặc nhiều các giá trị được định nghĩa trước ("auth" | "auth-int" | token). Các gía trị này ảnh hưởng đến quá trình tính toán digest
- cnonce – client nonce, được sinh ra khi `qop` được set. Nó được dùng để chống `plaintext attacks` và bảo vệ tính toàn vẹn của message
- nc – nonce count, được gửi đi khi `qop` được set. Mục đích là để server xác định `request replays`. Nếu như 1 giá trị `nc` được gửi 2 lần giống nhau thì có nghĩa request sau là 1 `replay`

Các thuộc tính được tính toán như sau:

```
HA1=MD5(username:realm:password)
HA2=MD5(method:digestURI)
Response=MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
```

Áp dụng vào ví dụ trên ta có kết quả như sau

```
HA1 = MD5("Gandalf:shire@middleearth.com:Lord Of The Rings")
       = 681028410e804a5b60f69e894701d4b4
HA2 = MD5("GET:/dir/index.html")
       = 39aff3a2bab6126f332b942af96d3366
Response = MD5( "681028410e804a5b60f69e894701d4b4:
                 cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ:
                 00000001:0a4f113b:auth:
                 39aff3a2bab6126f332b942af96d3366" )
         = 5a1c3bb349cf6986abf985257d968d86
```
4. Server -> User Agent

HTTP/1.0 200 OK
Content-Type: text/html
Content-Length: 2345
... <content data>

Server tự mình tính toán hash và so sánh với giá trị nhận được từ client. Nếu như chúng match với nhau thì clent sẽ nhận được data trả về.

Như đã thấy, quá trình xử lí với phương pháp digest authentication dài dòng và phức tạp hơn nhiều. Bản thân ví dụ trên đã lấy theo chuẩn `RFC 2617 Digest Access Authentication` thay cho chuẩn `RFC 2069 Digest Access Authentication` đã bị outdate. Về quá trình dẫn đến luồn xử lí như hiện tại trong chuẩn `RFC 2617 Digest Access Authentication` với 1 loạt các giá trị chỉ xuất hiện trong disgest authentication mà không có trong basic authentication như `username, realm, URI, nonce, opaque, qop, nc, cnonce` đều có lí do của nó và chúng ta sẽ đề cập vào 1 lúc khác.

## Security improvement

Digest authentication đã cải thiện được, khắc phục nhiều nhược điểm của basic authentication
- Không gửi password dưới dạng plain text qua network.
- Chống được replay attacks
- Bảo vệ khỏi message tampering.

Tuy nhiên nó vẫn có những nhược điểm
- Vẫn có thể bị xâm nhập bởi man-in-the-middle attacks.
- Có nhiều security options không bắt buộc nên nếu như không được set, tính bảo mật vẫn chưa cao

Do vẫn còn những nhược điểm như vậy nên việc sử dụng basic authentication kết hợp với SSL vẫn đảm bảo việc implement đơn giản hơn và vẫn bảo mật hơn việc chỉ dùng mỗi digest authentication

# 4. Implement HTTP authentication in Rails

## 4.1. Implement basic authentication in Rails

### Simple example

Chỉ cần đơn giản thêm `http_basic_authenticate_with` vào trong controller mà bạn muốn đặt basic authentication với `username` và `password`.
Đây là ví dụ lấy từ [API doc của Rails](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)
Trên thực tế bạn sẽ để các giá trị của `name` và `password` vào biến môi trường để đảm bảo không bị lộ thông tin.


```Ruby
class PostsController < ApplicationController
  http_basic_authenticate_with name: "dhh", password: "secret", except: :index

  def index
    render plain: "Everyone can see me!"
  end

  def edit
    render plain: "I'm only accessible if you know the password"
  end
end
```

### Advanced example

Đây là ví dụ advance hơn với việc yêu cầu xác thực basic authentication chỉ cho Atom feeds và XML còn đối với request html thông thường thì sử dụng session.

```Ruby
class ApplicationController < ActionController::Base
  before_action :set_account, :authenticate

  private
    def set_account
      @account = Account.find_by(url_name: request.subdomains.first)
    end

    def authenticate
      case request.format
      when Mime[:xml], Mime[:atom]
        if user = authenticate_with_http_basic { |u, p| @account.users.authenticate(u, p) }
          @current_user = user
        else
          request_http_basic_authentication
        end
      else
        if session_authenticated?
          @current_user = @account.users.find(session[:authenticated][:user_id])
        else
          redirect_to(login_url) and return false
        end
      end
    end
end
```

Đối với 1 trường hợp đơn giản hơn là đặt basic authentication cho toàn bộ các request và chỉ sử dụng 1 bộ username, password đặt trong biến môi trường - câu chuyện thường thấy khi đặt cần set basic authentication cho môi trường staging, chỉ cần set đơn giản như sau.

```Ruby
class ApplicationController < ActionController::Base
  before_action :authenticate

  def authenticate
    if %w(test staging).include? Rails.env
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV["BASIC_USER"] && password == ENV["BASIC_PASSWORD"]
      end
    end
  end

end
```

Để ý 1 chút thì method `authenticate_or_request_with_http_basic` chính là sự kết hợp của `authenticate_with_http_basic` và `request_http_basic_authentication` trong ví dụ trước đó.

Ngoài ra 1 thủ thuật nữa có thể sử dụng để phòng chống ai đó vô tình nhìn thấy `ENV["BASIC_PASSWORD"]` của bạn đó là thay vì để trực tiếp password vào biến môi trường, bạn có thể để lưu giá trị password sau khi mã hoá md5 và trong phần so sánh ở method `authenticate` sửa lại 1 chút thành `Digest::MD5.hexdigest(password) == ENV["BASIC_PASSWORD"]`. Tất nhiên là nếu như bạn quên luôn cả password của mình thì chỉ còn cách đổi biến môi trường sang kết quả mã hoá md5 của 1 password mới.

## 4.2. Implement digest authentication in Rails

Tiếp tục là ví dụ lấy từ [API doc của Rails](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)

```Ruby
require 'digest/md5'
class PostsController < ApplicationController
  REALM = "SuperSecret"
  USERS = {"dhh" => "secret", #plain text password
           "dap" => Digest::MD5.hexdigest(["dap",REALM,"secret"].join(":"))}  #ha1 digest password

  before_action :authenticate, except: [:index]

  def index
    render plain: "Everyone can see me!"
  end

  def edit
    render plain: "I'm only accessible if you know the password"
  end

  private
    def authenticate
      authenticate_or_request_with_http_digest(REALM) do |username|
        USERS[username]
      end
    end
end
```

 Nhìn vào ví dụ này ta thấy cách để áp dụng digest authentication cũng có khá nhiều điểm tương đồng với basic authentication. Sau khi đặt 1 `before_action` `authenticate`cho những method mà chúng ta muốn, trong phần xử lí của method `authenticate` thay vì sử dụng `authenticate_or_request_with_http_basic` thì chúng ta sử dụng `authenticate_or_request_with_http_digest`. Mục tiêu là giá trị trả về trong block `USERS[username]` phải là password tương ứng với username hoặc là giá trị `HA1=MD5(username:realm:password)`. Trong ví dụ này thì danh sách user:password được nằm trong hash `USERS` với key là `username` còn value là `password` hoặc `HA1`. Tương tự với trường hợp basic authentication, nếu bạn muốn chỉ 1 mình bạn biết password thật sự, hãy sử dụng `HA1` để bảo mật hơn.

# 5. Conclusion

- Để tăng cường an toàn cho môi trường phát triển của những service chưa public, bạn có thể sử dụng HTTP authentication như 1 giải pháp phía server
- Có 2 loại `HTTP authentication` cơ bản là `basic authentiation` và `digest authentication`
- `Basic authentiation` có cách thức hoạt động đơn giản hơn nhưng lại thiếu bảo mật và dễ dàng bị giải mã nếu bị nghe trộm
- `Digest authentication` hoạt động phức tạp hơn, là giải pháp thay thế bảo mật hơn cho `Basic authentiation`
- Ruby on Rails support khá mạnh cho 2 phương thức `HTTP authentication` trên và việc implement không tốn nhiều thời gian, nếu chỉ tính thời gian code để apply 1 trong 2 phương thức này chỉ cần vài phút, nếu tính đến việc viết cả unit test thì tốn thêm 1 chút thời gian (ví dụ về unit test cũng có luôn trên API doc của Rails)

# 6. References

- https://dzone.com/articles/the-http-series-part-4-authentication-mechanisms
- https://stackoverflow.com/questions/9534602/what-is-the-difference-between-digest-and-basic-authentication
- https://api.rubyonrails.org/classes/ActionController/HttpAuthentication