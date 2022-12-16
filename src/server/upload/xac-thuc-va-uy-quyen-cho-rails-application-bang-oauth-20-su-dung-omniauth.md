### I. OAuth 2.0

- OAuth 2.0 là một framework ủy quyền (authorization) giúp cho các ứng dụng có thể có quyền truy cập (một cách giới hạn) vào tài nguyên của một user trên một service (như Facebook, Github, Twitter, Google,...) thông qua việc xác thực (authentication) và ủy quyền (authorization).
- Sử dụng OAuth 2.0 giúp cho việc chia tài nguyên giữa các ứng dụng được dễ dàng và bảo mật hơn, đồng thời người dùng không phải tạo quá nhiều tài khoản cho mỗi ứng dụng mà họ sử dụng

#### 1.1. Các tác nhân trong OAuth 2.0

![](https://images.viblo.asia/eff070d5-90c4-488a-9653-7a7b9be8c790.png)

- Resource Owner (User): Là người dùng, ủy quyền cho ứng dụng truy cập vào tài nguyên (như ảnh, thông tin cá nhân trên Facebook,...), giới hạn bởi những phạm vi được cấp phép
- Client (Application): Là những ứng dụng yêu cầu quyền truy cập đến tài nguyên của User
- Resource Server (API): Nơi ứng dụng truy xuất những tài nguyên của người dùng khi được cấp quyền.
- Authorization Server: Nơi người dùng xác thực (authenticate) và ủy quyền (authorize) cho ứng dụng (Client) bằng việc cấp cho ứng dụng access_token

#### 1.2. Luồng hoạt động

- Application yêu cầu ủy quyền để truy cập vào Resource Server thông qua User
- User xác thực với Authorization Server và cấp quyền truy cập cho Application
- Application gửi thông tin định danh (ID) của mình kèm theo giấy ủy quyền của User tới Authorization Server
- Nếu thông tin định danh được xác thực và giấy ủy quyền hợp lệ, Authorization Server sẽ trả về cho Application access_token. Đến đây quá trình ủy quyền hoàn tất.
- Để truy cập vào tài nguyên (resource) từ Resource Server và lấy thông tin, Application sẽ phải đưa ra access_token để xác thực.
- Nếu access_token hợp lệ, Resource Server sẽ trả về dữ liệu của tài nguyên đã được yêu cầu cho Application.

#### 1.3. Các loại ủy quyền của OAuth 2.0

- Authorization Code: Được sử dụng với Web Application (được giải thích cụ thể với ví dụ demo ở phần sau)
- Implicit: Sử dụng với Mobile App
- Resource Owner Password Credentials: sử dụng với những ứng dụng của service cung cấp và xác thực bằng password
- Client Credentials: sử dụng với các ứng dụng truy cập thông qua API

### II. Sử dụng gem OmniAuth để truy cập tài nguyên Twitter trong Rails app

#### 2.1. Đăng ký thông tin của ứng dụng với Authorization Server

![](https://images.viblo.asia/9342412c-af20-42d1-a92a-6154b85c98e9.png)

- Truy cập vào Twitter Application Management và tạo một ứng dụng mới (Create New App)

- Điền vào các thông tin sau:
	+ Tên ứng dụng (Name)
	+ Mô tả ứng dụng (Description)
	+ Trang chủ của ứng dụng (Website)
	+ Callback URL: đây là đường dẫn mà Authorization Server sẽ trả thông tin access_token về cho ứng dụng để ứng dụng có thể lưu trữ và gửi yêu cầu truy cập tới Resource Server vào những lần sau mà không phải xác thực cũng như ủy quyền lại.

Lưu ý: riêng với ứng dụng Twitter không cho phép khai báo URL là localhost, nên nếu thực hiện demo trong môi trường development tại localhost thì phải thay localhost bằng IP là `127.0.0.1`

- Chọn Yes, I have read and agree to the Twitter Developer Agreement.
- Create your Twitter application


![](https://images.viblo.asia/4eda570f-7520-4436-a36f-083c69518575.png)


- Sau khi tạo xong App, tại màn hình Application Management, chọn ứng dụng vừa tạo
- Tại tab Permission, có thể tùy chỉnh quyền mà ứng dụng có thể thao tác trên tài nguyên của Server (Trong hình cho phép đọc và ghi)

![](https://images.viblo.asia/490129c2-2788-412e-b065-c31f6b847001.png)

- Tại tab Keys and Access Tokens, ghi nhớ hai thông tin để cài đặt cho ứng dụng Rails

![](https://images.viblo.asia/fd7d4b35-9552-4993-937f-2caf1b62a2fd.png)

+ Consumer Key: chính là đinh danh của ứng dụng, để sinh URL xác thực với Authorization Server
+ Consumer Secret: Chuỗi ký tự để xác thực định danh của ứng dụng, chuỗi này được giữ bí mật giữa Application và Server 


####  2.2. Thiết lập cơ chế OAuth trong ứng dụng Rails với gem OmniAuth và Devise:

Tạo Rails app mới

Sử dụng gem omniauth-twitter được viết bởi Arun Agrawal: 
	
```ruby
# Gemfile
...
gem "omniauth-twitter" 
gem "devise"
...
```

```
$ bundle install
$ rails g devise:install
$ rails g devise user
```

Trong file model thêm vào như sau giúp ứng dụng có thể đăng nhập với OAuth

```
# User.rb
     devise :database_authenticatable, :registerable, :omniauthable,
           :recoverable, :rememberable, :trackable, :validatable
```

Tạo thêm trường mới cho bảng`Users` là `uid`.

Lưu ý: Vì ứng dụng demo này chỉ đăng nhập và truy cập resource của Twitter nên chỉ sử dụng bảng Users với uid là id của tài khoản trên Twitter. Đối với các ứng dụng muốn liên kết với nhiều tài khoản mạng xã hội và Service khác, phải tạo thêm một bảng mới với 2 cột uid và provider (bên cung cấp tài nguyên, ví dụ: twitter, facebook,...) và cột `user_id` là khóa ngoại đến nó (có quan hệ `n-1` với bảng `Users`).

```ruby
$ rails g migration AddOmniauthToUsers uid:string
```

Lưu ý: uid phải là unique

Khai báo thông tin ID và secret key cho App trong file `config/initialers/devise.rb`

```
# config/initialers/devise.rb

config.omniauth :twitter, 'YOUR_APP_ID', 'YOUR_APP_SECRET'
```

Ngoài ra còn có 2 tham số là scope và permission để cài đặt tương ứng là phạm vi tài nguyên được truy cập và quyền đươc thực thi trên tài nguyên.

Generate login template của devise để thêm chức năng đăng nhập với Twitter

```
$ rails g devise:views
```

Tại `app/views/devise/sessions/new.html.erb` thêm vào đường dẫn đăng nhập với Twitter

```ruby
# app/views/devise/sessions/new.html.erb

<%= link_to "Sign in with Twitter", user_twitter_omniauth_authorize_path %>
```

`user_twitter_omniauth_authorize_path` là URL helper được sinh ra từ các cài đặt trên.


Implement callback method

Đầu tiên thêm route tới callback method. Trong file `config/routes.rb`

```ruby
# config/routes.rb

devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
```

Thêm controller `OmniauthCallbacksController` đã khai báo ở trên:

```ruby
class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    twitter_data = request.env["omniauth.auth"]
    @user = User.find_or_create_by uid: twitter_data.uid
    session["twitter_data"] = {
      uid: twitter_data.uid,
      app_id: twitter_data.extra.access_token.consumer.key,
      secret: twitter_data.extra.access_token.consumer.secret,
      access_token: twitter_data.extra.access_token.token,
      access_secret: twitter_data.extra.access_token.secret
    }

    if @user.persisted?
	# Đăng nhập nếu user với uid đã tồn tại
      sign_in :user, @user
      redirect_to root_path
    else
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
```

Method twitter sẽ xử lý thông tin trả về khi người dùng xác thực và cấp quyền cho ứng dụng

Thông tin trả về bao gồm thông tin về app đồng thời có cả access_token để truy cập tài nguyên.

Ở đây viết thêm một controller để test xem ứng dụng đã có thể truy cập vào tài nguyên hay chưa. Controller này sẽ lấy đoạn text nhập trong form và sử dụng API của twitter để tạo một tweet mới trên Twitter

```
class HomeController < ApplicationController
  def index
    if current_user
      redirect_to home_tweet_path
    end
  end

  def tweet
    if request.method == "POST"
      tweet_response = get_access_token.
        request(:post, "https://api.twitter.com/1.1/statuses/update.json",
          {status: request.params[:tweet]})
      case tweet_response
      when Net::HTTPOK
        flash.now[:success] = "Tweet successful"
      else
        flash.now[:alert] = "Failed"
      end
    end
  end

  private

  def get_access_token
    twitter_data = session["twitter_data"]
    consumer = OAuth::Consumer.new(twitter_data["app_id"],
      twitter_data["secret"], {:site => "http://api.twitter.com"})
    token_hash = {oauth_token: twitter_data["access_token"],
      oauth_token_secret:twitter_data["access_secret"]}
    OAuth::AccessToken.from_hash(consumer, token_hash)
  end
end
```


### III. Luồng hoạt động của Demo App

Truy cập vào trang đăng nhập của demo app --> Sign in with Twitter

![](https://images.viblo.asia/993f452a-3439-4b2b-b28d-e5253ddac39e.png)

Twitter yêu cầu xác thực để có thể cấp quyền cho ứng dụng (bước 1 trong luồng hoạt động)

![](https://images.viblo.asia/ea0619ce-454c-4aa0-83ac-93d81bfdb36d.png)

Sau khi xác thực thành công, Twitter yêu cầu cấp quyền cho app (Bước 2 trong luồng hoạt động) -> Authorize app

![](https://images.viblo.asia/8e94c6ed-a6ec-4b6d-b0bf-260dd701e555.png)

Sau khi ủy quyền thành công Twitter trả về thông tin của access token thông qua callback URL (bước 3, 4 trong luồng)

![](https://images.viblo.asia/b8adfed2-db7d-4e2b-b6f4-0adf9371108f.png)

Thực hiện tweet trên chính demo app

![](https://images.viblo.asia/ea072526-c8b0-4d6f-9909-d62f92c23294.png)

Kiểm tra tweet đã được đăng thành công nghĩa là app đã có quyền truy cập tài nguyên của user trên Twitter

![](https://images.viblo.asia/d7a549a8-ca76-44fd-b61c-1f7240739bea.png)



[Example App Source](https://github.com/hunguyen1702/oauth-twitter-example)