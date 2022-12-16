Chào các bạn, gần đây mình đang làm dự án tương tác với Google Calendar, mình đã chia sẽ ở [phần trước](https://viblo.asia/p/tuong-tac-voi-google-calendar-trong-ung-dung-rails-07LKXAnrZV4).

Hôm nay mình sẽ chia sẽ hai vấn đề mình gặp phải trong quá trình làm việc với Google Calendar, đó là disconnect khỏi Google account và lấy email address.

Ở bài trước mình đã sử dụng [thư viện Singet](https://www.rubydoc.info/github/google/signet/Signet) để tương tác với Google API, tuy nhiên đọc qua cái doccument thì có vẻ như không có hàm nào hỗ trợ để xử lý 2 chức năng mình đã nếu ở trên.

Vì thế mình quyết định sử dụng call trực tiếp từ Google API.

### Get user email

Để lấy được thông tin của user đã xác thực, trong đó có email address, bạn phải request scope cho phép lấy email của user.

Ở lần trước khi tương tác với Google Calendar mình đã request scope **Google::Apis::CalendarV3::AUTH_CALENDAR**, scope này không cho phép bạn lấy thông tin user.

Google API có riêng 1 scope để bạn lấy email address đó là **userinfo.email**.

Danh sách scope các bạn có thể xem [tại đây](https://developers.google.com/identity/protocols/googlescopes).

Khai báo thông tin client

```
  def client_options
    {
      client_id: ENV["google_client_id"],
      client_secret: ENV["google_client_secret"],
      authorization_uri: "https://accounts.google.com/o/oauth2/auth",
      token_credential_uri: "https://accounts.google.com/o/oauth2/token",
      scope: "https://www.googleapis.com/auth/userinfo.email",
      redirect_uri: callback_url
    }
  end
```

Viết action redirect để chuyển đến trang đăng nhập yêu cầu xác thực Google

```
  def redirect
    client = Signet::OAuth2::Client.new client_options
    redirect_to client.authorization_uri.to_s
  end
```

Tiếp theo là action callback sau khi xác thực thành công

```
  def callback
    client = Signet::OAuth2::Client.new client_options
    client.code = params[:code]
    response = client.fetch_access_token!
    binding.pry
  end
```

Bỏ binding.pry ở đây để tiếp tục.

```
=> response
{"access_token"=>"xxxx",
 "expires_in"=>3600,
 "id_token"=> "aaaaa",
 "refresh_token"=>"yyyyyy",
 "token_type"=>"Bearer"}
```

Như bạn thấy sau khi xác thực thành công, Google sẽ trả về cho bạn cái token trên. Việc của bạn sẽ là lấy cái access_token để yêu cầu lấy thông tin user

```
=> uri = URI "https://www.googleapis.com/userinfo/v2/me?alt=json&access_token=#{response["access_token"]}"
=> result = Net::HTTP.get uri
=> JSON.parse result

Kết quả:
{"id"=>"12345678999999",
 "email"=>"le.quang.canh@framgia.com",
 "verified_email"=>true,
 "name"=>"",
 "given_name"=>"",
 "family_name"=>"",
 "picture"=>"https://lh5.googleusercontent.com/-cKvRvbDYOts/AAAAAAAAAAI/AAAAAAAAAAA/1GTtAnXZH2g/photo.jpg",
 "hd"=>"framgia.com"}
```

Giờ thì bạn có thể lấy thông tin và sử dụng ở đâu bạn muốn :D

### Disconnect Google account

Ứng dụng của bạn cho phép user disconnect tài khoản Google. Nếu suy nghĩ một cách đơn giản, bạn chỉ cần remove những cái token user đã xác thực với Google gửi cho ứng dụng của bạn là xong.

Tuy nhiên, có một vấn đề, sau đó user lại muốn connect vào lại thì sao. Lại lấy token lưu lại thôi mà.

Không đơn giản như bạn nghĩ. Với cái luồng ở trên, bạn chỉ có thể sử dụng khi người dùng sử dụng trình duyệt ẩn danh. Bởi vì, Google chỉ gửi cho bạn refresh_token ở 1 lần xác thực đầu tiên. User disconnect, bạn xóa nó đi, user đăng nhập vào lại (thực ra là không cần đăng nhập vì trình duyệt đã lưu session rồi), sau khi access_token hết hạn, bạn sẽ không thể refresh token => lỗi.

Vậy cách giải quyết ở đây là, khi user muốn disconnect Google account ra khỏi ứng dụng của bạn, thì bạn cũng request Google thu hồi luôn quyền truy cập vào ứng dụng.

Việc này khá đơn giản, chỉ cần request tới **oauth2.revoke endpoint**, Google sẽ xử lý giùm bạn

```
uri = URI "https://accounts.google.com/o/oauth2/revoke"
params = {token: user_access_token}
uri.query = URI.encode_www_form params
Net::HTTP.get uri
```

Trên đây là một số kiến thức mình tìm hiểu được trong quá trình tìm hiểu tương tác với Google Calendar.

Cảm ơn các bạn đã theo dõi!