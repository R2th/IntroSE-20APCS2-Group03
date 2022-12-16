Trong các trình duyệt web hiện tại, Chính sách cùng nguồn gốc (Same-origiin policy) được áp dụng để ngăn chặn thông tin bị đánh cắp vì một trang web bị lạm dụng bởi một trang web độc hại khác.

Ví dụ: khi một trang web https://guiltysite.com được hiển thị trên trình duyệt, bạn có thể sử dụng XMLHttpRequest (sau đây gọi là XHR) hoặc Fetch API từ trang web này đến một trang web khác https://innocentsite.net sang HTTP (S Nếu bạn cố đọc dữ liệu với), sẽ xảy ra lỗi.

Tuy nhiên, bất kể nguồn truy cập có phải là một trang web độc hại hay không, sẽ rất bất tiện khi hạn chế trang web có mối quan hệ tin cậy với tư cách là đối tác để liên kết dữ liệu. CORS là một cơ chế cho phép truy cập ngoài nguồn gốc.

## Ví dụ về cách sử dụng CORS

Ở đây, một ví dụ được mô tả trong đó một trang web https://trustsite.com muốn cho phép truy cập vào một trang web khác https://usiouslyapis.net thông qua HTTP (S).

### Nếu đơn giản chỉ muốn cho phép việc đọc dữ liệu

Nếu bạn chỉ muốn cho phép GET hoặc POST bằng XHR hoặc Fetch API, hãy làm như sau: Đầu tiên, về phía client, không cần thiết lập gì đặc biệt về XHR, API Fetch chỉ cần thiết lập CORS được sử dụng ở tùy chọn.

```Javascript 
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://usefulapis.net/api');
xhr.addEventListener('load', onLoadFunc, false);
xhr.send(null);
```

```
fetch('https://usefulapis.net/api', {
  mode: 'cors'
}).then(onLoadFunc);
```

Mặt khác, về phía máy chủ Web, cần thêm thông tin phù hợp vào response header HTTP để thông báo rõ ràng cho trình duyệt biết rằng quyền truy cập ngoài Origin được cho phép.

Đầu tiên, tiêu đề yêu cầu HTTP được gửi từ trình duyệt đến máy chủ bao gồm một trường có tên Origin để truy cập qua Origin.

```
GET /api HTTP/1.1
Origin: https://trustedsite.com
```

Nếu Origin là một trang web đáng tin cậy, ở tiêu đề phản hồi HTTP nếu có nội dung như sau:

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trustedsite.com
```

Truy cập sẽ được cho phép ở phía trình duyệt. Trong một ví dụ đơn giản như trên, có thể chỉ định bằng các wildcard rằng bất kỳ trang web nào cũng có thể được truy cập ngoài Origin (không thể chỉ định tên miền phụ).

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
```

### Trường hợp cho phép chia sẻ Cookie

Nếu bạn muốn cho phép gửi và nhận cookie trong quá trình giao tiếp HTTP (S), cần thêm một chút công việc trên cả trình duyệt và máy chủ. Đầu tiên, trong JavaScript của trình duyệt sẽ làm như sau. Lưu ý rằng từ sau ví dụ này, sẽ không được phép thiết lập Wildcard trong Access-Control-Allow-Origin.

```JavaScript(XHR)
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://usefulapis.net/api');
xhr.withCredentials = true;
xhr.addEventListener('load', onLoadFunc, false);
xhr.send(null);
```

```JavaScript(Fetch)
fetch('https://usefulapis.net/api', {
  mode: 'cors',
  credentials: 'include'
}).then(onLoadFunc);
```

Mặt khác, phía máy chủ thêm nội dung sau vào response header  HTTP.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trustedsite.com
Access-Control-Allow-Credentials: true
```

### Trường hợp muốn điều chỉnh http request nữa

Đặc tả CORS quy định rằng, nếu một trong các điều kiện sau là đúng,  trước khi thực hiện một yêu cầu HTTP thực tế (GET hoặc POST), một yêu cầu OPTIONS được thực hiện như một preflight request . Trong trường hợp này, lưu ý rằng  ngoài GET và POST ở phía server side cần có hỗ trợ CORS tương tự cho OPTIONS.

- Phương thức yêu cầu HTTP không phải là GET, POST hoặc HEAD.
- Request header HTTP chứa các trường không phải là trường Accept, Accept-Language, Content-Language nội dung hoặc Content-type không phải là application/x-www-form-urlencoded, multipart/form-data, text/plain được chỉ định.

Yêu cầu preflight chứa các tiêu đề yêu cầu HTTP sau:

```
OPTIONS /api HTTP/1.1
Access-Control-Request-Method: (この後に行うリクエストのHTTPメソッド(GET, POSTなど))
```

Ví dụ, như một response cho  preflight request này, cần chỉ định phương thức yêu cầu HTTP cho phép truy cập ngoài Origin, ít nhất là theo cách sau.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trustedsite.com
Access-Control-Allow-Methods: GET,POST,HEAD,OPTIONS
```

### Trường hợp muốn thêm vào một HTTP request header duy nhất vào request

Ví dụ: giả sử bạn thêm các header X-MyRequest và X-MyOption ở phía trình duyệt.

```JavaScript(XHR)
クライアントのJavaScript(XHR)
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://usefulapis.net/api');
xhr.withCredentials = true;
xhr.setRequestHeader('X-MyRequest', 'this-is-cors-test');
xhr.setRequestHeader('X-MyOption', 'my-option');
xhr.addEventListener('load', onLoadFunc, false);
xhr.send(null);
```

```JavaScript(Fetch
fetch('https://usefulapis.net/api', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'X-MyRequest': 'this-is-cors-test',
    'X-MyOption': 'my-option'
  }
}).then(onLoadFunc);
```

Trong trường hợp này, trước tiên từ browser một http request header bao gồm preflight request như sau được gửi tới server.

```
OPTIONS /api HTTP/1.1
Origin: https://trustedsite.com
Access-Control-Request-Method: GET
Access-Control-Request-Headers: X-MyRequest,X-MyOption
```

Phía máy chủ xác định có cho phép các method và header được hiển thị trong các request header này hay không và trả về response header. Method được chỉ định trong Access-Control-Allow-Methods và header được chỉ định trong Access-Control-Allow-Headers được cho phép trong HTTP request mà trình duyệt thực sự gửi sau này. (Tiêu đề tương ứng là bắt buộc phải có cho cả preflight và yêu cầu thực tế.)

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trustedsite.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,HEAD,OPTIONS
Access-Control-Allow-Headers: X-MyRequest,X-MyOption
```

### Nếu bạn muốn thêm HTTP response header của riêng bạn vào response và đọc nó từ trình duyệt

Khi truy cập ngoài Origin, ví dụ, code ở phía browser sẽ như sau:

```Javascript (XHR)
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://usefulapis.net/api');
xhr.withCredentials = true;
xhr.setRequestHeader('X-MyRequest', 'this-is-cors-test');
xhr.setRequestHeader('X-MyOption', 'my-option');
xhr.addEventListener('load', onLoadFunc, false);
xhr.send(null);

function onLoadFunc() {
  var myResponse = xhr.getResponseHeader('X-MyResponse');
  var myOption = xhr.getResponseHeader('X-MyOption');
}
```

```Javascript (Fetch)
fetch('https://usefulapis.net/api', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'X-MyRequest': 'this-is-cors-test',
    'X-MyOption': 'my-option'
  }
}).then(onLoadFunc);

function onLoadFunc(response) {
  var myResponse = response.headers.get('X-MyResponse');
  var myOption = response.headers.get('X-MyOption');
}
```

Tương ứng code ở server sẽ như sau:

```
HTTP/1.1 200 OK
X-MyResponse: this-is-successful-response
X-MyOptions: good-result
```

Nếu bạn đang cố gắng trả lại các tiêu đề phản hồi tùy chỉnh như cho trình duyệt, nếu trình duyệt cố lấy nội dung của các tiêu đề phản hồi này, bạn sẽ được coi là bạn đang cố truy cập vào một tiêu đề không an toàn và quyền truy cập sẽ không được phép Nó đã trở thành. (Các tiêu đề phản hồi được phép truy cập là Kiểm soát bộ đệm, Ngôn ngữ nội dung, Loại nội dung, Hết hạn, Sửa đổi lần cuối và Thực dụng.)

Để cho phép trình duyệt truy cập một tiêu đề phản hồi duy nhất như vậy, hãy chỉ định tiêu đề phản hồi bạn muốn cho phép trong Tiêu đề kiểm soát truy cập-điều khiển.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trustedsite.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,HEAD,OPTIONS
Access-Control-Allow-Headers: X-MyRequest,X-MyOption
Access-Control-Expose-Headers: X-MyResponse,X-MyOption
```

Tất nhiên, Set-Cookie và Set-Cookie2 không thể được đọc bởi XHR hoặc Fetch API ngay cả khi được chỉ định bởi Tiêu đề kiểm soát truy cập-điều khiển.

## Reference

https://qiita.com/tomoyukilabs/items/81698edd5812ff6acb34