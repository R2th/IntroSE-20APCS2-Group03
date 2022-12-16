Trong [bài trước](https://viblo.asia/p/lay-du-lieu-bai-viet-cua-mot-tai-khoan-instagram-voi-instagram-basic-api-ORNZqAMrZ0n) mình có giới thiệu về Instagram Basic API trong việc lấy các thông tin của người dùng. Bài này sẽ là một bản demo nho nhỏ cho api này.

## I. Authorize action
Đầu tiên, mình demo 1 route để redirect người dùng tới api xin cấp quyền của `api.instagram.com`

Thêm route

```ruby
Rails.application.routes.draw do
  get 'authorize', to: "instagram#authorize"
end
```

Thêm authorize action trong controller

```ruby
class InstagramController < ApplicationController
  CLIENT_ID = ENV['INSTAGRAM_CLIENT_ID']
  CLIENT_SECRET = ENV['INSTAGRAM_CLIENT_SECRET']
  REDIRECT_URI = ENV['INSTAGRAM_REDIRECT_URI']

  def authorize
    redirect_to "#{authorize_url}?client_id=#{CLIENT_ID}&redirect_uri=#{REDIRECT_URI}&scope=user_profile,user_media&response_type=code"
  end

  private

  def authorize_url
    "https://api.instagram.com/oauth/authorize"
  end
end
```

Sau khi người dùng truy cập tới `https://localhost:3000/authorize` sẽ được điều hướng tới api cấp quyền của instagram

![image.png](https://images.viblo.asia/1e6fdc1a-cf0e-47d4-a7bc-4626fcc1b122.png)

OK, vậy là api này đã xong.

## II. Callback action
Sau khi người dùng cấp quyền, instagram sẽ điều hướng về redirect_uri kèm theo authorization code, do đó ta cần có 1 route xử lý code gửi về và lấy access_token.

Thêm route

```ruby
get 'callback', to: "instagram#callback"
```

Đầu tiên, api này sẽ nhận 1 params là `code`

```ruby
def callback
    code = params[:code]
    return unless code
end
```

Sử dụng code này, ta sẽ cần gửi 1 request post tới `https://api.instagram.com/oauth/access_token` để lấy access_token

```ruby
response = Faraday.post(get_access_token_url) do |req|
  req.headers = headers,
  req.body = authorization_params(authorization_code)
end
```

Trong đó, `headers` sẽ là

```ruby
def headers
    {
      Accept: "application/json"
    }
end
```

Các params cần gửi lên

```ruby
def authorization_params
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: authorization_code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI
    }
end
```

Response trả về sẽ chứa access token. Ta sẽ lưu lại giá trị này vào trong database. Trước tiên cần khởi tạo một model cho nó. Ở đây mình demo với 1 user nên sẽ không sử dụng user_id và chỉ tạo model đơn giản nhất.

```ruby
class CreateInstagramAccessTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :instagram_access_tokens do |t|
      t.string :access_token

      t.timestamps
    end
  end
end
```

Lấy giá trị access_token

```ruby
data = JSON.parse(response.body)

access_token = data["access_token"]
```

Ở đây, ta đã có 1 access_token có thể sử dụng được. Tuy nhiên, để có thể sử dụng lâu dài, ta cần chuyển đổi giá trị token sang một token dài hạn nữa.

```ruby
# exchange access_token for a long-lived access_token
if access_token
  res = Faraday.get(get_long_lived_access_token_url) do |req|
    req.headers = headers,
    req.params = long_lived_access_token_params(authorization_code)
  end

  long_lived_data = JSON.parse(response.body)

  long_lived_access_token = long_lived_data["access_token"]

  if long_lived_access_token
    InstagramAccessToken.create(
      access_token: long_lived_access_token
    )
    render json: {"message": "ok"}, status: 200
  else
    render json: {"error": "#{res.body}"}, status: res.status
  end
else
  render json: {"error": "#{response.body}"}, status: response.status
end
```

Các hàm private

```ruby
def get_long_lived_access_token_url
"https://graph.instagram.com/access_token"
end
  
def long_lived_access_token_params access_token
    {
      grant_type: "ig_exchange_token",
      client_secret: CLIENT_SECRET,
      access_token: access_token
    }
end
```

OK, vậy là ta đã có được access_token để có thể sử dụng cho việc lấy dữ liệu từ Basic Display API rồi.

## III. Lấy dữ liệu
Ở đây mình sẽ chỉ demo nhỏ việc sử dụng access token trên để fetch data về. 

### 1. Get user data
Add route

```ruby
get 'me', to: "instagram#me"
```

Params

```ruby
def user_params
    {
      fields: "id,username,account_type,media_count",
      access_token: access_token
    }
end
```

fetch data

```ruby
def me
    response = Faraday.get("#{graph_base_url}/me") do |req|
      req.headers = headers,
      req.params = user_params
    end

    render json: response.body
end
```

Kết quả

![image.png](https://images.viblo.asia/9c1a1f78-bec6-43ac-8d77-d12d58e52829.png)

### 2. Get user's media
Add route

```ruby
get 'me/media', to: "instagram#media"
```

Params

```ruby
def media_params
    {
      fields: "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username",
      access_token: access_token
    }
end
```

Fetch data

```ruby
def media
    response = Faraday.get("#{graph_base_url}/me/media") do |req|
      req.headers = headers,
      req.params = media_params
    end

    render json: response.body
end
```

![image.png](https://images.viblo.asia/de8b1e04-47a4-45b2-b8f1-34964af19fff.png)
### 3. Get album's media

Add route

```ruby
get 'album', to: "instagram#album_media"
```

Params

```ruby
def album_media_params
    {
      fields: "id,media_type,media_url,thumbnail_url",
      access_token: access_token
    }
end
```

Fetch data

```ruby
  def album_media
    album_id = params[:id]
    if album_id
      response = Faraday.get("#{graph_base_url}/#{album_id}/children") do |req|
        req.headers = headers,
        req.params = album_media_params
      end
  
      render json: response.body
    else
      render(json: "Missing parameter id")
    end
  end
```

Kết quả

![image.png](https://images.viblo.asia/be4bdd56-783b-4995-b33a-a896963ecd1b.png)

## IV. Kết luận
Ở bài này mình chỉ demo nho nhỏ về Instagram Basic Display API. API này còn có thể dùng với nhiều ứng dụng khác nữa và phần demo còn có thể phát triển rất nhiều.