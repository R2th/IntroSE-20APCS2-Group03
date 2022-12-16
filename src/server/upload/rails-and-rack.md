![](https://images.viblo.asia/55933c8f-0251-4257-9c4a-694a4f219259.jpeg)


---
Trong khi tìm hiểu và làm việc với `rails`, ắt hẳn chúng ta đều nghe tới khái niệm `Rack`. 

Vậy `Rack` là gì ? Những `request` được gửi tới Rails app sẽ được xử lý như thế nào ?

Chào mọi người, hôm nay chúng ta sẽ tìm hiểu những vấn đề về `Rack`.

:fish_cake:
# Rack
[Rack](https://github.com/rack/rack) được định nghĩa :

> Rack provides a minimal, modular, and adaptable interface for developing web applications in Ruby

Có thể hiểu rằng `Rack` là một `interface`, một `component` đặt giữa `webserver` và các `ruby` framework,  với mục đích làm cầu nối cho việc giao tiếp giữa `webserver` và `ruby` framework .




---


# Request response with Rack
Khi một request được gửi đi từ browser, `webserver`(Puma, Unicorn, Webrick) sẽ nhận HTTP `request` này, sau đó chuyển tới cho `Rack` ,  `Rack` tiếp tục chuyển tới web app (Rails, Sinatra).

Web app xử lý `request` được gửi tới, tạo `response` trả về cho người dùng theo chiều ngược lại :
![](https://images.viblo.asia/b1e21b0b-4a61-4f81-8726-98f82317e942.png)

Vậy tại sao chúng ta cần `Rack`, tại sao các webserver không gửi thẳng `request` và nhận `response` từ các webapp mà phải thông qua `Rack` ? 

Bởi việc sử dụng `Rack` để giao tiếp giữa webserver và webapp giúp ta có thể sử dụng nhiều webserver khác nhau với nhiều web application khác nhau. Ví dụ ta muốn dùng Puma thay vì Webrick, hay sử dụng Sinatra thay vì Rails đều được, bởi các webserver và webapp đều có thể giao tiếp với nhau thông qua `Rack` :
![](https://images.viblo.asia/a8c0fbb4-cd15-4eaa-a33e-65801dc1c61f.png)


# Deeper
Quay lại với `request`, khi được gửi từ browser tới webserver, webserver sẽ convert HTTP request thành một ruby hash: `env`, `env` có dạng giống như :

```ruby
{"GATEWAY_INTERFACE"=>"CGI/1.1", "PATH_INFO"=>"/", "QUERY_STRING"=>"", "REMOTE_ADDR"=>"127.0.0.1", "REM
OTE_HOST"=>"localhost", "REQUEST_METHOD"=>"GET", "REQUEST_URI"=>"http://localhost:9292/", "SCRIPT_NAME"
=>"", "SERVER_NAME"=>"localhost", "SERVER_PORT"=>"9292", "SERVER_PROTOCOL"=>"HTTP/1.1", "SERVER_SOFTWAR
E"=>"WEBrick/1.3.1 (Ruby/2.2.1/2015-02-26)", "HTTP_HOST"=>"localhost:9292", "HTTP_ACCEPT_LANGUAGE"=>"en
-US,en;q=0.8,de;q=0.6", "HTTP_CACHE_CONTROL"=>"max-age=0", "HTTP_ACCEPT_ENCODING"=>"gzip", "HTTP_ACCEPT
"=>"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "HTTP_USER_AGENT"=>"Mo
zilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.1
35 Safari/537.36", "rack.version"=>[1, 3], "rack.url_scheme"=>"http", "HTTP_VERSION"=>"HTTP/1.1", "REQU
EST_PATH"=>"/"}
```

Có thể chia `env` thành 3 phần :
* Request headers :
```ruby
  HTTP_HOST: "localhost:9292"
  HTTP_REFERER: "http://localhost:9292/"
  HTTP_ACCEPT_LANGUAGE: "en-US,en;q=0.8,de;q=0.6"
  HTTP_ACCEPT_ENCODING: "gzip"
  HTTP_USER_AGENT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36"
  HTTP_ACCEPT: "*/*"
  HTTP_VERSION: "HTTP/1.1"
```
* Server info :
```ruby
GATEWAY_INTERFACE: "CGI/1.1"
  PATH_INFO: "/"
  QUERY_STRING: ""
  REMOTE_ADDR: "127.0.0.1"
  REMOTE_HOST: "localhost"
  REQUEST_METHOD: "GET"
  REQUEST_URI: "http://localhost:9292/"
  SCRIPT_NAME: ""
  SERVER_NAME: "localhost"
  SERVER_PORT: "9292"
```
* Rack info :
```ruby
  rack.version: [1, 3]
  rack.url_scheme: "http"
```

Vậy biến `env` này được xử lý trong Rack như thế nào ?

Rack application sẽ nhận biến `env` này . Một Rack app cần có một method `call`,  và trả về  một mảng 3 phần tử : 
* The HTTP response code
* A Hash of headers
* The response body
```ruby
class RackApp
  def call(env)
    #do some action according to the contents in the env hash
    result = action(env["PATH_INFO"])
    [200, { 'Content-Type' => 'text/html' }, result]
  end
end
```

## Rack middleware
Mỗi `Rack middleware` là một `rack app`, với mục đích khác nhau, thực hiện những chức năng khác nhau với `request` được gửi tới hay `response` được trả về
## In rails?
`Rails` is `rack` application, a final application được dựng bởi một loạt các `middleware` với các mục đích khác nhau. `$ rake middleware ` sẽ đưa ra list các middleware trong app:

![](https://images.viblo.asia/7533abe1-6cef-4734-b10f-36f67a0fe884.png)

### **Một số middleware:**

* **Rack::Sendfile**: xử lý các static file dưới thư mục public
* **Rack::Runtime**:  thêm trường X-Runtime trong response header được trả về, chỉ ra khoảng thời gian xử lý cho request tương ứng
* **Rack::MethodOverride**: đặt giá trị cho HTTP request method dựa trên input "_method" trong mỗi form được tạo ra bởi rails form helper
*  **ActionDispatch::RequestId**: gán một unique ID cho mỗi request tới
* **ActionDispatch::ShowExceptions, ActionDispatch::DebugExceptions**: bắt các exception và hiển thị ra các custom page:
![](https://images.viblo.asia/d4b7a079-14f6-4028-896f-c18e19308f8a.png)
* **ActionDispatch::Callbacks**: cung cấp các before/after callback
* **ActionDispatch::Flash**: lưu flash, và xóa bỏ các flash cũ trong session
* **ActionDispatch::Session::CookieStore**: lưu trữ session trong cookie
* **ActionDispatch::Cookies**: lưu trữ cookie trong browser thông qua Set-Cookie header
* **Rack::Cache**: hỗ trợ rails với HTTP Caching



`request` tới, các `middleware` lần lượt được gọi theo thứ tự, cuối cùng tới RailsApp::Application.routes, tìm ra controller tương ứng, và trả về `response`

----

Trên đây là một số tìm hiểu của mình về `Rack`, cám ơn mọi người đã theo dõi :boom: