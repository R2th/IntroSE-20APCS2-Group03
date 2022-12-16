![](https://images.viblo.asia/824a8e56-111c-4e57-a5b8-aa35e7b1f4bf.png)

# Mattermost
Mattermost là Slack-alternative mã nguồn mở, phát triển để thay thế phần mềm dịch vụ nhắn tin. Masttermost mang lại môi trường giao tiếp cho một nhóm phát triển đến từ quy mô nhỏ đến lớn. Nó được viết bằng Golang và React và chạy trên môi trường nhị phân Linux theo giấy phép của MIT, MySQL và Postgres.   
# API Mattermost
## Mở đầu
Mattermost Web Services API được sử dụng bởi Mattermost clients và các ứng dụng bên thứ ba để tương tác với máy chủ. Hiện nay đã hỗ trỡ sẵn kết nối API của Javascript và Golang.
## Schema
Tất cả quyền truy cập API đều thông qua HTTP hoặc HTTPS request tại ```your-mattermost-url.com/api/v4``` . Và tất cả các request và response bodies đều là ```application/json```
## Authentication
Có nhiều cách để xác thực dựa trên Mattermost API.
Make an HTTP POST to with a JSON body indicating the user’s login_id, password and optionally the MFA token. The login_id can be an email, username or an AD/LDAP ID depending on the system's configuration.
Tạo một HTTP với phương thức POST gửi tới  your-mattermost-url.com/api/v4/users/login với JSON body bao gồm login_id, password và có thể bao gồm token MFA. Login_id có thể là email, username hoặc một AD/LDAP ID phụ thuộc vào cấu hình hệ thống.

Một cách lấy token bằng email và password bằng code Ruby
```ruby
def get_token
    if @access_token.blank?

    end
    uri = "#{ENV['MATTERMOST_URL']}/api/v4/users/login"
    body = { login_id: @login_id, password: @password }.to_json
    response = run_request(:post, uri, body, nil)
    return unless response&.success?

    SS.config.gws.mattermost["access_token"] = response.headers["token"] if SS.config.gws.mattermost
    response.headers["token"] if response.headers
end
```
## Error
Tất cả các lỗi sẽ trả về một HTTP response code thích hợp cùng với JSON body:
```
{
    "id": "the.error.id",
    "message": "Something went wrong", // the reason for the error
    "request_id": "", // the ID of the request
    "status_code": 0, // the HTTP status code
    "is_oauth": false // whether the error is OAuth specific
}
```
## Rate Limiting
Bất cứ khi nào thực hiện một yêu cầu HTTP tới Mattermost API, bạn có thể nhận thấy các eaders sau được bao gồm trong response:
```
X-Ratelimit-Limit: 10
X-Ratelimit-Remaining: 9
X-Ratelimit-Reset: 1441983590
```
- X-Ratelimit-Limit: Số request tối đa có thể gửi trong một giây.
- X-Ratelimit-Remaining: Số request còn lại trong current window.
- X-Ratelimit-Reset: Khoảng thời gian còn lại trước khi giới hạn request được reset.
## ENDPOINTS
Ví dụ về một endpoints: Get team unreads for a user 

Lấy số lượng tin nhắn chưa đọc được mentions trong một team của một user. 
```ruby
def get_unread(user_id)
    uri = "#{ENV['MATTERMOST_URL']}/api/v4/users/#{user_id}/teams/unread"
    response = run_request(:get, uri, nil, nil)
    return unless response&.success?

    JSON.parse(response.body)&.pluck("mention_count")&.sum
end
```
- Code 200: Team unreads retrieval successful
- Code 400: Parameters bị thiếu hoặc không hợp lệ trong URL hoặc request body.
- Code 401: Access token không được cung cấp.
- Code 403: Không có quyền thích hợp.

Tất cả các endpoints được cung cấp chi tiết ở đây: [GET ALL ENDPOINT MATTERMOST](https://documenter.getpostman.com/view/4508214/RW8FERUn#3038ae7c-61db-4a33-90e9-6108210e5277)

-----

### Một số hàm hỗ trợ call API trong rails

```ruby
def run_request(method, url, body, headers)
  begin
    http_client = create_http_client(url)

    http_client.run_request(method, nil, body, headers) do |request|
      request.headers["Accept"] = "*/*"
      request.headers["Authorization"] = "Bearer #{@access_token}"
      request.headers["content-type"] = "application/json"
    end
  rescue Faraday::Error::ConnectionFailed => e
    Rails.logger.error("Connection failed: Failed to open TCP connection to Mattermost server host.")
    return
  end
end
```

```ruby
def create_http_client(url)
  http_client = Faraday.new(url: url) do |builder|
    builder.request :url_encoded
    builder.response :logger, Rails.logger
    builder.adapter Faraday.default_adapter
  end
  http_client.headers[:user_agent] += " (SHIRASAGI/#{SS.version}; PID/#{Process.pid})"
  http_client
end
```

# Kết bài

Trên đây là một vài thông tin cơ bản về mã nguồn mở Mattermost và cách cấu hình thực hiện giao tiếp HTTP cơ bản của một ứng dụng Ruby on Rails tương tác với server Mattermost.

Còn rất nhiều thứ có thể khai thác từ mã ngoài mở này, dưới đây là link tham khảo và khám phá:
- https://mattermost.com/
- https://api.mattermost.com/