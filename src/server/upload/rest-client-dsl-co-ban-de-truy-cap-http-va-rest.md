# Giới thiệu
* REST Client là một máy khách HTTP và REST cơ bản cho Ruby, được lấy cảm hứng từ phong cách microframework của Sinatra về chỉ định các actions: get, put, post, delete.
* Yêu cầu sử dụng với Ruby >= 2.0. REST-Client dần được sử dụng để thay thế Net::HTTP trong việc gọi API bên ngoài để xử lý dữ liệu. 
# Sử dụng
* Hai hàm cơ bản được gọi với REST-Client là get và post:
```
require 'rest-client'
RestClient.get(url, headers={})

RestClient.post(url, payload, headers={})
```
* Thông thường, chỉ các hàm POST, PUT, PATCH mới truyền đối số payload là các params cho mục đích update, muốn sử dụng với các HTTP verbs khác chúng ta nên sử dụng RestClient::Request.execute để thay thế.
## Các ví dụ cụ thể:
* Get method:
```
require 'rest-client'
RestClient.get 'http://example.com/resource'

>> response = RestClient.get 'http://example.com/resource'
=> <RestClient::Response 200 "<!doctype h...">
>> response.code
=> 200
>> response.cookies
=> {"Foo"=>"BAR", "QUUX"=>"QUUUUX"}
>> response.headers
=> {:content_type=>"text/html; charset=utf-8", :cache_control=>"private" ... }
>> response.body
=> "<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n ..."
```

* POST method
```
RestClient.post( url,
  {
    :transfer => {
      :path => '/foo/bar',
      :owner => 'that_guy',
      :group => 'those_guys'
    },
     :upload => {
      :file => File.new(path, 'rb')
    }
  })
``` 
## Các tùy chọn nâng cao
* Các phương thức trình trợ giúp cấp cao như RestClient.get chỉ chấp nhận headers hash làm đối số cuối cùng của chúng và không cho phép truyền các tùy chọn phức tạp hơn. Các tùy chọn hoạt động đầy đủ với RestClient :: Request.execute.
```
RestClient::Request.execute(method: :get, url: 'http://example.com/resource',
                            timeout: 10)
RestClient::Request.execute(method: :get, url: 'http://example.com/resource',
                            ssl_ca_file: 'myca.pem',
                            ssl_ciphers: 'AESGCM:!aNULL')
```
* Bạn cũng có thể truyền payload với các hành động HTTP khác như DELETE, khi mà RestClient.delete không cho phép truyền payload:
```
RestClient::Request.execute(method: :delete, url: 'http://example.com/resource',
                            payload: 'foo', headers: {myheader: 'bar'})
```
* Do những tùy chọn trong API ban đầu, các tham số được sử dụng để hiển thị chuỗi truy vấn thực sự được lấy ra khỏi headers hash. Vì vậy, nếu bạn muốn chuyển cả params và các tùy chọn phức tạp hơn, hãy sử dụng khóa đặc biệt: params trong headers hash. Như vậy params có thể được hiển thị trên url request:
```
RestClient::Request.execute(method: :get, url: 'http://example.com/resource',
                            timeout: 10, headers: {params: {foo: 'bar'}})

➔ GET http://example.com/resource?foo=bar
```
## Sử dụng ActiveResource-Style
```
resource = RestClient::Resource.new 'http://example.com/resource'
resource.get

private_resource = RestClient::Resource.new 'https://example.com/private/resource', 'user', 'pass'
private_resource.put File.read('pic.jpg'), :content_type => 'image/jpg'
```
* Ở đây chúng ta khởi tạo đối tượng RestClient để truy cập RESTful resource, bao gồm quá trình xác thực. Bạn có thể đọc thêm ở [RestClient::Resource](https://www.rubydoc.info/gems/rest-client/1.6.1/RestClient/Resource)
## Exception
* Đối với mã kết quả từ 200 đến 207, RestClient::Response sẽ được trả về
* Đối với mã kết quả 301, 302 hoặc 307, sẽ tuân theo chuyển hướng nếu yêu cầu là GET hoặc HEAD
* Đối với mã kết quả 303, chuyển hướng sẽ được theo sau và yêu cầu chuyển thành GET
* Đối với các trường hợp khác, RestClient::ExceptionWithResponse giữ lại phản hồi; một lớp ngoại lệ cụ thể sẽ được ném cho các mã lỗi đã biết
* Gọi .response trong ngoại lệ để lấy response từ server:
```
>> RestClient.get 'http://example.com/nonexistent'
Exception: RestClient::NotFound: 404 Not Found

>> begin
     RestClient.get 'http://example.com/nonexistent'
   rescue RestClient::ExceptionWithResponse => e
     e.response
   end
=> <RestClient::Response 404 "<!doctype h...">
```
## Redirection
* Mặc định, rest-client sẽ tuân theo các yêu cầu chuyển hướng HTTP 3XX
* Tính năng mới trong 2.0: RestClient::Response hiển thị phương thức #history trả về danh sách từng phản hồi nhận được trong chuỗi chuyển hướng.
```
>> r = RestClient.get('http://httpbin.org/redirect/2')
=> <RestClient::Response 200 "{\n  \"args\":...">

# see each response in the redirect chain
>> r.history
=> [<RestClient::Response 302 "<!DOCTYPE H...">, <RestClient::Response 302 "">]

# see each requested URL
>> r.request.url
=> "http://httpbin.org/get"
>> r.history.map {|x| x.request.url}
=> ["http://httpbin.org/redirect/2", "http://httpbin.org/relative-redirect/1"]
```
## Xử lý kết quả trả về
* Kết quả của một dối tượng RestClient::Request là một đối tượng RestClient::Response.
* RestClient::Response là một lớp con của String với một vài method hữu ích:
    * Response#code: Mã phản hồi HTTP
    * Response#body: Nội dung phản hồi dưới dạng một chuỗi
    * Response#headers: Một hash các tiêu đề phản hồi HTTP
    * Response#raw_headers: Một hash các tiêu đề phản hồi HTTP dưới dạng mảng chưa được xử lý
    * Response#cookies: Một hash cookie HTTP do máy chủ đặt
    * Response#request: Đối tượng RestClient::Request để thực hiện yêu cầu
    * Response#history: Các chuyển hướng được tuân theo và danh sách các phản hồi đằng trước đó
```
RestClient.get('http://example.com')
➔ <RestClient::Response 200 "<!doctype h...">

begin
 RestClient.get('http://example.com/notfound')
rescue RestClient::ExceptionWithResponse => err
  err.response
end
➔ <RestClient::Response 404 "<!doctype h...">
```
## Một vài lệnh
* Lệnh restclient cung cấp một sesion IRB với RestClient đã được tải:
```
$ restclient
>> RestClient.get 'http://example.com'
```
* Chỉ định đối số URL cho get/post/put/delete trên tài nguyên đó:
```
$ restclient http://example.com
>> put '/resource', 'data'
```
* Thêm xác thực với username và pasword:
```
$ restclient https://example.com user pass
>> delete '/private/resource'
```
## Các tham số Query
* Rest-client có thể hiển thị h dưới dạng tham số truy vấn HTTP cho các yêu cầu GET/HEAD/DELETE nh dưới dạng dữ liệu yêu cầu HTTP POST ở định dạng x-www-form-urlencoded.
* GET params:
```
RestClient.get('https://httpbin.org/get', params: {foo: 'bar', baz: 'qux'})
# GET "https://httpbin.org/get?foo=bar&baz=qux"
```
* POST params với x-www-form-urlencoded:
```
>> r = RestClient.post('https://httpbin.org/post', {foo: 'bar', baz: 'qux'})
# POST "https://httpbin.org/post", data: "foo=bar&baz=qux"
=> <RestClient::Response 200 "{\n  \"args\":...">
>> JSON.parse(r.body)
=> {"args"=>{},
    "data"=>"",
    "files"=>{},
    "form"=>{"baz"=>"qux", "foo"=>"bar"},
    "headers"=>
    {"Accept"=>"*/*",
        "Accept-Encoding"=>"gzip, deflate",
        "Content-Length"=>"15",
        "Content-Type"=>"application/x-www-form-urlencoded",
        "Host"=>"httpbin.org"},
    "json"=>nil,
    "url"=>"https://httpbin.org/post"}
```
* JSON payload: rest-client không nhận JSON nguyên bản, vì vậy hãy tuần tự hóa payload của bạn thành một chuỗi trước khi chuyển nó t rest-client:
```
>> payload = {'name' => 'newrepo', 'description': 'A new repo'}
>> RestClient.post('https://api.github.com/user/repos', payload.to_json, content_type: :json)
=> <RestClient::Response 201 "{\"id\":75149...">
```
* Khi muốn truyền GET params dưới dạng một mảng:
```
>> r = RestClient.get('https://http-params.herokuapp.com/get', params: {foo: [1,2,3]})
# GET "https://http-params.herokuapp.com/get?foo[]=1&foo[]=2&foo[]=3"
=> <RestClient::Response 200 "Method: GET...">
>> puts r.body
query_string: "foo[]=1&foo[]=2&foo[]=3"
decoded:      "foo[]=1&foo[]=2&foo[]=3"

GET:
  {"foo"=>["1", "2", "3"]}
```
* GET params với nested hash:
```
>> r = RestClient.get('https://http-params.herokuapp.com/get', params: {outer: {foo: 123, bar: 456}})
# GET "https://http-params.herokuapp.com/get?outer[foo]=123&outer[bar]=456"
=> <RestClient::Response 200 "Method: GET...">
>> puts r.body
...
query_string: "outer[foo]=123&outer[bar]=456"
decoded:      "outer[foo]=123&outer[bar]=456"

GET:
  {"outer"=>{"foo"=>"123", "bar"=>"456"}}
```
## Headers
* Header của yêu c có thể được đặt bằng cách chuyển một hash rby chứa các khóa và giá trị đại diện cho tên và giá trị headers:
```
# GET request with modified headers
RestClient.get 'http://example.com/resource', {:Authorization => 'Bearer cT0febFoD5lxAlNAXHo6g'}

# POST request with modified headers
RestClient.post 'http://example.com/resource', {:foo => 'bar', :baz => 'qux'}, {:Authorization => 'Bearer cT0febFoD5lxAlNAXHo6g'}

# DELETE request with modified headers
RestClient.delete 'http://example.com/resource', {:Authorization => 'Bearer cT0febFoD5lxAlNAXHo6g'}
```
# Tổng kết
* Bên trên là những chức năng cơ bản của gem rest-client được sử dụng phổ biến để call API bên ngoài. Hi vọng nó sẽ giúp ích được cho bạn.
* Nguồn gem rest-client: [https://github.com/rest-client/rest-client](https://github.com/rest-client/rest-client)