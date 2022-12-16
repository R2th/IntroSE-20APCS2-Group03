**Cross-Origin Resource Sharing** ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) là một cơ chế sử dụng header  [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)  mở rộng, để Browser xác định có cho phép một webapp trên một origin [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin), có thể access đến resource tại origin khác hay không 

-----

Nhiều bạn chắc sẽ thắc mắc **origin** là gì?

origin hiểu nôm na là những thuộc tính xác định 1 URL,  cụ thể là:  scheme (protocol), host (domain), và port

Ví dụ xét URL: `https://domain-a.com:3000` thì 
- protocol: https
- domain: domain-a.com
- port: 3000

2 Orign được xem là tương đồng khi chúng giống nhau cả 3 thuộc tính trên.

-----

Một ví dụ về request cross-origin: một front-end code javaScript chạy trên  `https://domain-a.com` sử dụng [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) để request tài nguyên ở một server khác `https://domain-b.com/data.json`.

Vì lý do security, các browser sẽ cấm request HTTP cross-orign như thế này. Ví dụ `XMLHttpRequest` và [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request này tuân theo [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) - là 1 chính sách về bảo mật. Có nghĩa là các webapp sử dụng các APIs này sẽ chỉ có thể request tài nguyên từ các app mà có cùng origin với nhau, trừ khi trong response từ server (nơi chứa tài nguyên) có chứa CORS headers đúng! (Đúng thế nào thì phần sau sẽ rõ nhé!) 

![img](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

## Khái quát về CORS

Tiêu chuẩn **Cross-Origin Resource Sharing** hoạt động bằng cách add [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) mới, cho phép server mô tả những origin nào được phép truy cập thông tin từ web browser. 

Ngoài ra, với các HTTP methods mà có khả năng làm thay đổi data/ ảnh hưởng server ví dụ [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)  với [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), Browser sẽ tiến hành gửi đi các request "preflight" trước, và sau đó nếu nhận được sự chấp thuận từ server, browser sẽ gửi đi request "thật" :yum: . 

Server còn có thể báo cho client biết rằng "credentials" ví dụ như  [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) và [HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) có thể được gửi kèm cùng Request hay không. 

## Ví dụ về các tình huống access

### Simple requests

Một số request sẽ không kích hoạt [CORS preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests). Chúng được gọi chung là *“simple requests”*, bao gồm: 

  - [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
  - [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
  - [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

Ví dụ, web content trên site `https://foo.example` muốn gọi đến contrent ở domain `https://bar.other`. Code dưới đây mô tả cách request trên `foo.example`:

```java:js
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send(); 
```

Code này sẽ thực thi việc get data đơn giản giữa client và server, sử dụng CORS headers để xác định quyền hạn

![img](https://mdn.mozillademos.org/files/17214/simple-req-updated.png)

Dưới đây là nội dung browser gửi lên server 

```markdown
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

có thể thấy param [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) trong header chỉ server xuất phát của request.

```markdown
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

Trong response, server trả về [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header. Ta cùng đối chiếu cặp quan hệ [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) và [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) . Trường hợp này, server trả về  `Access-Control-Allow-Origin: *`, có nghĩa tài nguyên của server này có thể đc access bởi từ **bất kì** domain nào. 

Nếu tài nguyên ở `https://bar.other` chỉ cho phép *duy nhất* request từ  `https://foo.example`, thì response sẽ là

```css
Access-Control-Allow-Origin: https://foo.example
```

### Preflighted requests

Kông giống [“simple requests” (được trình bày ở phía trên)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests), "preflighted" requests đầu tiên sẽ gửi  một HTTP request với method [`OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) đến server tài nguyên, để xác định trước xem là request thật, có thể gọi được hay không. 

Dưới đây là một ví dụ của mọt request mà sẽ kích hoạt một preflight request gọi trước. 

```java:js
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>'); 
```

ví dụ trên, tạo một XML body gửi đi một `POST` request. do request sử dụng `Content-Type` là  `application/xml`, và header đã được custom, request này sẽ cần một preflight request gọi đi trước. 

![img](https://mdn.mozillademos.org/files/17268/preflight_correct.png)

**Chú ý**: Như trình bày dưới đây, request `POST` thật, sẽ không bao gồm `Access-Control-Request-*` header, 
các header này chỉ chỉ có trong `OPTIONS` request.

Cùng xem luồng trao đổi giữa client và server, lần gọi đầu tiên chính là preflight request! 

```shell
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```
đây là preflight response! 

```shell
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

Sau khi preflight request được hoàn thành, request **thật** sẽ được gửi đi:

```shell
POST /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some XML payload]
```

Nhìn vào *preflight request* ta có thể thấy, browser gửi đi trước các methods mà sẽ được sử dụng trong request **thật** để server xem xét là có nhận request **thật** không.  ví dụ request headers: `POST, X-PINGOTHER, Content-Type`

```shell
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

Trong *preflight response*, server trả về nội dung cho thấy method `POST` và các headers khác `X-PINGOTHER, Content-Type` được chấp thuận:

```shell
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

### Requests with credentials

Có thể nói khả năng hay nhất của [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) hay [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) và CORS đó là tạo các credential request, cho phép nhận diện thông tin [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) và HTTP Authentication. 

Trong ví dụ này,  content trong `http://foo.example` trong một GET request có mang theo Cookies đến `http://bar.other` 

```javascript:js
const invocation = new XMLHttpRequest();
const url = 'http://bar.other/resources/credentialed-content/';

function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```

Line 7 có flag `withCredentials` mang boolean value. Browser sau khi gửi request này đi sẽ reject không xử lý tiếp trong trường hợp response trả về không có  [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true`. 

![img](https://mdn.mozillademos.org/files/17213/cred-req-updated.png)

Dưới đây là sample request gửi đi và response nhận lại từ server. 

```shell
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: http://foo.example/examples/credential.html
Origin: http://foo.example
Cookie: pageAccess=2

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

[text/plain payload]
```

Line 10 có set cookie để request content trên `http://bar.other`, giả sử bar.other mà không response với [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)`: true` (line 17) thì nội dung data nhận được trong response sẽ Browser khước từ, và không phản ánh lên client foo.example.

*reference: [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests)*