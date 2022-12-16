## Tạo HTTP Request với Nodejs.
Trong Node có lớp http.ClientRequest dùng để lưu những thông tin về một gói tin HTTP được gửi đến các webserver, chúng ta có thể tạo ra hầu như tất cả mọi yêu cầu HTTP, các lớp kiểu này thường được dùng để gửi các yêu cầu tự động. Trong bài này chúng ta sẽ tìm hiểu cách tạo một yêu cầu HTTP từ client, trong bài sau chúng ta sẽ tìm hiểu và xây dựng REST server và dùng các yêu cầu HTTP này để test server đó.

Nếu bạn đã từng dùng các hệ điều hành Linux thì có lẽ bạn sẽ biết đến các trình gửi yêu cầu HTTP là wget hoặc curl. Chúng ta sẽ viết đoạn code mô phỏng trình wget.

Chúng ta tạo một file có tên wget.js với nội dung như sau:
```
var http = require('http');
var url = require('url');
var util = require('util');
var argUrl = process.argv[2];
var parsedUrl = url.parse(argUrl, true);
var options = {
    host: null,
    port: -1,
    path: null,
    method: 'GET'
};
options.host = parsedUrl.hostname;
options.port = parsedUrl.port;
options.path = parsedUrl.pathname;
if(parsedUrl.search)
    options.path += "?" + parsedUrl.search;
var req = http.request(options, function(res) {
    util.log('STATUS: ' + res.statusCode);
    util.log('HEADERS: ' + util.inspect(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        util.log('BODY: ' + chunk);
    });
    res.on('error', function(err) {
        util.log('RESPONSE ERROR: ' + err);
    });
});
req.on('error', function(err) {
    util.log('REQUEST ERROR: ' + err);
});
req.end();
```
Sau đó chúng ta có thể chạy đoạn code trên như sau: 
```
node wget.js http://www.google.com
```
![](https://images.viblo.asia/60493ad5-e9dd-4d32-8a14-a7e72f0c9290.png)
Chúng ta sẽ nhận về được một gói tin trả lời từ server của google. Trong đó dòng đầu tiên là mã trạng thái STATUS, ở đây chúng ta nhận được mã là 302, mã này là mã redirect, nghĩa là chúng ta sẽ được chuyển tới một đường dẫn khác, trong trường HEADERS chúng ta có một vài thông tin khác, trong đó location là đường dẫn mà chúng ta sẽ được chuyển tới, ở đây là http://www.google.com.vn/?gfe_rd=cr&ei=WpDkV-CjEKzY8gf-n4uICw, nếu bạn mở trình duyệt web lên rồi truy cập http://www.google.com thì bạn cũng sẽ được chuyển tới đường dẫn như trên. Phần BODY là nội dung HTML trả về, nếu chúng ta dùng trình duyệt để gửi thì đoạn code HTML này sẽ được “vẽ” trên trình duyệt.
```
var argUrl = process.argv[2];
var parsedUrl = url.parse(argUrl, true);
```
Trong đoạn code trên, chúng ta tạo một đối tượng thuộc lớp URL từ phương thức url.parse() là parsedUrl, phương thức này nhận vào đường dẫn mà chúng ta đã nhập (ở trên là http://www.google.com), tham số thứ hai cho biết các tham số đi kèm trong đường dẫn có được mã hóa hay không.
```
var options = {
    host: null,
    port: -1,
    path: null,
    method: 'GET'
};
options.host = parsedUrl.hostname;
options.port = parsedUrl.port;
options.path = parsedUrl.pathname;
```
Đối tượng options sẽ lưu một số thông tin trong gói tin yêu cầu được gửi đi, như host là đường dẫn website, port là cổng, pathname là đường dẫn phía sau hostname, ví dụ www.google.com/ thì pathname là '/', method là phương thức gửi lên như GET, PUT, POST…
```
if(parsedUrl.search)
     options.path += "?" + parsedUrl.search;
```
Nếu chúng ta đưa vào đường dẫn có tham số, chẳng hạn http://www.google.com/?query=germany, thì đoạn ?query=germany sẽ được lưu trong thuộc tính search của đối tượng parsedUrl, ở đây chúng ta chèn vào sau thuộc tính path của đối tượng options.
```
var req = http.request(options, function(res) {
    util.log('STATUS: ' + res.statusCode);
    util.log('HEADERS: ' + util.inspect(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        util.log('BODY: ' + chunk);
    });
    res.on('error', function(err) {
        util.log('RESPONSE ERROR: ' + err);
    });
});
```
Phương thức http.request() nhận vào đối tượng options và một hàm callback, hàm này sẽ được gọi khi có gói tin trả về từ server, trong hàm này chúng ta chỉ đơn giản là in nội dung gói tin đó ra màn hình. Tham số res trong hàm callback là một đối tượng thuộc lớp EventEmitter, đối tượng này lắng nghe sự kiện data và error, sự kiện data xảy ra khi có dữ liệu được trả về, sự kiện error xảy ra khi có lỗi trả về.
```
req.on('error', function(err) {
    util.log('REQUEST ERROR: ' + err);
});
```
Phương thức http.request() trả về một đối tượng lớp http.ClientRequest. Bản thân đối tượng này kế thừa từ lớp EventEmitter và sẽ tạo ra sự kiện error và data. Sự kiện data xảy ra khi có dữ liệu đến, còn sự kiện error xảy ra khi có lỗi xảy ra. Ở đây chúng ta chỉ bắt sự kiện error, bạn có thể chạy lại đoạn code trên và đưa vào tham số là www.google.com (bỏ phần http://) thì sẽ có lỗi.
## Tạo REST Service với Nodejs
Trong phần này chúng ta sẽ tìm hiểu cách tạo các truy vấn REST và cách viết một REST service.

Bản thân việc gọi các REST service đã là bất đồng bộ, tức là khi chúng ta truy vấn một hàm REST thì REST server sẽ gọi một hàm để xử lý và một hàm callback để gửi kết quả trả về, tất cả đều thông qua giao thức HTTP.
### 1. Về REST service
REST là viết tắt của REpresentational State Transfer. Đây là một chuẩn web dựa trên giao thức HTTP. Mục đích chính của REST là hỗ trợ truy cập tài nguyên thông qua giao thức HTTP. REST được giới thiệu lần đầu bởi Roy Fielding vào năm 2000.

Công việc của một REST server chỉ đơn giản là cung cấp quyền truy cập tài nguyên, một REST client sẽ dùng các quyền truy cập đó để lấy tài nguyên, tất cả đều thông qua giao thức HTTP. Các tài nguyên được xác định thông qua URI. REST sử dụng 2 định dạng dữ liệu là JSON và XML, nhưng JSON phổ biến hơn.

Nói một cách đơn giản thì giao thức HTTP ban đầu được tạo ra là để trả các website về cho trình duyệt. Sau này người ta phát minh ra chuẩn REST, HTTP không chỉ được dùng để trả về các nội dung HTML mà có thể là bất cứ thứ gì.

Ví dụ
Chúng ta sẽ viết lại server tính số fibonacci, nhưng lần này thay vì trả về một trang web HTML thì server chỉ trả về một chuỗi JSON.

Mặc dù Express ra đời với mục đích chính là để xây dựng các trang web, nhưng chúng ta cũng có thể dùng chính module Express để viết các hàm REST API. Express cho phép so sánh/tìm kiếm chuỗi trong các đường dẫn URL.

Đoạn code routing một đường dẫn URL tới một hàm xử lý cũng tương tự như khi viết một routing bình thường, ví dụ:
```
app.get('/user/:id', function(req, res) {
    res.send('user ' + req.params.id);
});
```
Trong dòng code trên, URL /user/:id có một tham số là :id, Express sẽ tách phần tham số này ra và gán vào trường req.params.id.

Bây giờ chúng ta viết lại một server để tính số fibonacci và trả về kiểu JSON, chúng ta tạo một file có tên fiboserver.js với nội dung như sau:
```
var math = require('./math');
var express = require('express');
var app = express();
app.get('/fibonacci/:n', function(req, res, next) {
    var result = math.fibonacciLoop(req.params.n);
    res.send({
        n: req.params.n,
        res: result
    });
});
app.listen(3002);
console.log('Fibonacci REST service is listening on port 3002');
```
Ở đoạn code trên chúng ta dùng 2 module là Express và math do chúng ta viết trong các phần trước.
```
app.get('/fibonacci/:n', function(req, res, next) {
    ...
});
```
Ở đây chúng ta dùng phương thức app.get() thay vì dùng app.use() để xử lý phần routing. Tham số đầu tiên là URL, tham số thứ 2 là hàm callback dùng để gửi kết quả về client.
```
var result = math.fibonacciLoop(req.params.n);
res.send({
    n: req.params.n,
    res: result
});
```
Trong hàm callback đó chúng ta tính số fibonacci rồi lưu trong biến result, sau đó chúng ta gửi kết quả về thông qua phương thức res.send(). Tham số của phương thức res.send() là một đối tượng  được tạo theo cú pháp JSON, ở đây đối tượng này gồm có 2 tham số là n và res, trong đó n chỉ đơn giản là tham số được gửi lên từ client, còn res là kết quả tính số fibonacci từ module math.

Chúng ta chạy file này, sau đó bạn có thể vào trình duyệt và gõ đường dẫn localhost:3002/fibonacci/<tham số> với tham số là một số nguyên bất kỳ, server sẽ trả về chuỗi JSON kết quả là số fibonacci cho bạn.
![](https://images.viblo.asia/4f587e1a-5ced-4768-a61a-1c4d5fc46458.jpg)
Tuy nhiên mục đích chính của REST không phải chỉ là để trả kết quả về cho trình duyệt, bất kỳ chương trình nào có hỗ trợ giao thức HTTP đều có thể gọi các hàm REST API, kể cả smartphone, tablet, smartwatch… Chúng ta sẽ viết một client đơn giản để gửi yêu cầu đến REST service này.

Chúng ta tạo một file có tên fiboclient.js với nội dung như sau:
```
var http = require('http');
var util = require('util');
[
 "/fibonacci/30",
 "/fibonacci/20",
 "/fibonacci/10",
 "/fibonacci/9",
 "/fibonacci/8",
 "/fibonacci/7",
 "/fibonacci/6",
 "/fibonacci/5",
 "/fibonacci/4",
].forEach(function(path) {
    var req = http.request({
        host: "localhost",
        port: 3002,
        path: path,
        method: 'GET'
    }, function(res) {
        res.on('data', function(chunk) {
            util.log('BODY :' + chunk);
        });
    });
    req.end();
});
```
Trong đoạn code trên chúng ta tạo một mảng là danh sách các đường dẫn, sau đó chúng ta lặp qua mảng này, mỗi lần lặp chúng ta gửi một yêu cầu HTTP lên server với đường dẫn tương ứng rồi in kết quả trả về.
```
var req = http.request({
    host: "localhost",
    port: 3002,
    path: path,
    method: 'GET'
}, function(res) {
    res.on('data', function(chunk) {
        util.log('BODY :' + chunk);
    });
});
```

Chúng ta tạo một đối tượng http.ServerResponse thông qua phương thức http.request(). Trong đó chúng ta điền các thông tin cơ bản như host là địa chỉ server, port là cổng, path là đường dẫn, method là phương thức, và một hàm callback để nhận kết quả trả về từ server, hàm này nhận một tham số là res, tham số này lắng nghe sự kiện data, sự kiện này xảy ra khi có dữ liệu gửi về từ server.

Chạy đoạn code trên chúng ta được kết quả như sau:
![](https://images.viblo.asia/562322ff-644f-45b2-af73-8debc891068e.png)

Tham khảo: https://devskill.org/bai-06-http-request-va-rest-service-trong-nodejs