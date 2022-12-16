##  Xét về flow của 1 request client đi tới web application ra sao nếu không có Rack:
### 1. Web servers
- Khi bắt đầu code Rails, web server của nó mặc định sẽ là WEBrick. (Đối với Rails >= 5 thì là Puma)
- Công việc chính của một Web server như WEBrick là một phiên dịch viên giữa client requests và web application.
- Cụ thể là WEBrick sẽ chờ những HTTP requests từ client gửi tới, xử lý và ném về cho web application.
- Sau khi chuyển request xong, WEBrick lại ngồi chờ cho đến khi web app trả lại response, xử lý và bắn về cho client.
### 2. HTTP request
- Khi client tạo request gọi tới server, cái HTTP requests đấy cũng chỉ là 1 đoạn text loằng ngoằng:
 ```
 GET /hello.htm HTTP/1.1
  User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
  Host: www.tutorialspoint.com
  Accept-Language: en-us
  Accept-Encoding: gzip, deflate
  Connection: Keep-Alive
```
- Web server sẽ tiếp nhận và xử lý cái đống HTTP requests dạng plain text kia, trước khi chuyển tới web application.
- Đối với WEBrick thì WEBrick chuyển tới web application của ta 1 đoạn Hash sạch đẹp từ HTTP requests.
```
{
request_method: "get",
path_info: "hello.htm",
headers: { content_type: "text/plain" }
}
```
- Để web app đọc được request, chúng ta đơn giản chỉ cần gọi kiểu như:
 ` content_type = request["content-type"]`
- Thay vì 1 đoạn code lằng nhằng:
`_header, content_type = /^([A-Za-z0-9!\#$%&\'*+\-.^_`|~]+):\s*(.*?)\s*\z/om.match("content-type: application/json")`
###  3. HTTP response
- Giả sử web app được implement method call
```
class App
  def call(request)
  end
end
```
- Mỗi lần WEBrick nhận requests, nó sẽ parse thành 1 Hash và chuyển tới method call như một arguments:
```
app = App.new
#incoming request
#request = { REQUEST_METHOD: "GET", PATH_INFO: "/features" }
app.call(request)
```
- Giá trị mà method call sẽ trả về, sẽ được chuyển ngược lại cho web server WEBrick. Từ dữ liệu response đó, 
WEBrick dịch nó thành plain text và trả về cho client. Giống như web server đã parse request thành một Ruby Hash, 
chúng ta cần định nghĩa format response của method call.
- Response trả về bao gồm 3 phần chính:
+ HTTP status code
+ Header
+ Body
- WEBrick cần nhận được cả 3 để xây dựng một response hợp lệ.
```
class App
  def call(request)
    { status: 200, headers: { content_type: "application/json" }, body: "" }
  end
end
```
- Nếu cung cấp một Hash với các keys chính xác, WEBrick sẽ đảm bảo nó sẽ parse đúng thành một HTTP response hợp lệ.
- Mặt hạn chế khi sử dụng WEBrick đó là WEBrick là đơn luồng dẫn đến không hiệu quả về performance
=> Ta chuyển sang sử dụng 1 web server rất phổ biến khác đó là Puma
- Puma yêu cầu method call trả về Array thay vì cái Hash ở trên, nếu không, web servers sẽ không parse được để trả về cho Client. 
+ Tuy nhiên, Puma yêu app trả về method với tên khác - run.
```
class App
  def run(request)
    [200, { content_type: "application/json" }, ""]
  end
end
```
=> Dẫn đến việc chúng ta lại phải vào sửa code

**Rack là một gói Ruby cung cấp một giao diện dễ sử dụng giữa các máy chủ web và framework web. 
Có thể nhanh chóng xây dựng các ứng dụng web đơn giản chỉ sử dụng Rack.**
- Một Rack application có cấu trúc rất đơn giản: nó là một Ruby Object, định nghĩa call method. call method có tham 
số đầu vào là một biến environment và trả về response với response là một array có 3 item [status, headers, body]:
- Status
+ Một HTTP status như 200 hoặc 404
- Header
+ Cái gì đó đáp ứng cho mỗi cặp key-value. Các key phải là strings. Đây là nơi bạn có thể đặt Content-Type và 
Content-Length nếu nó phù hợp với response của bạn.
- Body
+ Body là dữ liệu mà máy chủ gửi lại cho người request. Nó phải đáp ứng với mỗi giá trị string.
**Cách viết 1 ứng dụng rack đơn giản:**
- Cách 1: Cách này sau khi code cần restart lại server.

**rack_sample.rb**
```
 require 'rack'
 app = Proc.new do |env|
    ['200', {'Content-Type' => 'text/html'}, ['Hello World']]
end
Rack::Handler::WEBrick.run app
```
- Cách 2: Tạo file config.ru:
- run
Lấy một ứng dụng - đối tượng response call - như một đối số. Đoạn code sau thể hiện rõ cách thức này:
`run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['get rack\'d']] }`
- map
Lấy một chuỗi xác định đường dẫn được xử lý và một khối có chứa code Rack app sẽ được chạy khi nhận được 
resquest với đường dẫn đó.
```
map '/posts' do
  run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['first_post', 'second_post', 'third_post']] }
end
```

* Middleware:
- Nằm giữa server và framework. Rack có thể tùy chỉnh để ứng dụng của bạn sử dụng middleware. Ví dụ:
+ Rack::URLMap : để định hướng cho nhiều ứng dụng hoạt động trong cùng một quá trình.
+ Rack::ShowException : để bắt các ngoại lệ...
* Trong mỗi project, luôn có một file config.ru được tạo ra trong thư mục gốc của mỗi project rails
```
#This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
```
- Điều này có nghĩa là nó chỉ tải tập tin config/environment, sau đó khởi động lên Rails.application.
- Trong config/environment, ta có thể thấy rằng nó được định nghĩa trong config/application.rb. config/environment
- Trong config/application.rb, ta thấy rằng nó tải trong các gói gems từ config/boot.rb, đòi hỏi rails/all, tải lên môi trường (test, development, production, vv), và định nghĩa một namespaced version của ứng dụng.
```
module MyApplication
  class Application < Rails::Application
    ...
  end
end
```
- Điều này phải có nghĩa là Rails::Application là một ứng dụng Rack, middleware là nó sử dụng đến từ việc nó autoloading 
rails/application/default_middleware_stack và nó được định nghĩa trong ActionDispatch.
ActionDispatch đến từ ActionPack trong rails
- ActionPack là framework của Rails để xử lý các reqeust và response trên web. ActionPack là nơi chứa khá nhiều thứ mà bạn tìm thấy trong Rails, chẳng hạn như routes, các abstract controllers và view rendering.

- Action Dispatch cung cấp một số middleware components mà tương tác với ssl, cookies, debugging, các files tĩnh, và nhiều hơn nữa.
- Tất cả thành phần trong Action Dispatch đều đáp ứng call, lấy một ứng dụng và trả lại status, header và body. Nhiều trong số đó cũng sử dụng các đối tượng Rack::Request và Rack::Response.
Nguồn tham khảo: https://thoughtbot.com/upcase/videos/rack