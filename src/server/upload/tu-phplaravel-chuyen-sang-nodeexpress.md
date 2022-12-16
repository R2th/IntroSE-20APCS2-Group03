# Mở đầu
Chào các bạn, mình - một thằng dev PHP, trải qua một thời gian học và làm PHP với Laravel bỗng một ngày cảm thấy chán, muốn đổi gió một chút, NodeJS là nơi dừng chân tiếp theo. Bài viết này chủ yếu nói về khía cạnh webserver (không so sánh về ngôn ngữ), hãy cùng tìm hiểu về NodeJS/Express dưới góc độ từ một thanh niên PHP chuyển sang các bạn nhé =)).
# Tiếp cận với Node.js
Trước tiên, tất nhiên rồi, muốn học thì hãy tìm hiểu về nó trước, vậy node.js là gì?
* Node.js là một **JavaScript runtime**, được xây dựng dựa trên Chrome's V8 JavaScript engine (một trình thông dịch JavaScript chạy trên Chrome)

Để tránh nhầm lẫn: Node.js là run time, không phải là một ngôn ngữ lập trình, không phải là một JS framework
* Node.js ra mắt từ bao giờ? Nodejs được xây dựng và phát triển từ năm 2009
* Node.js có hỗ trợ đa luồng không? Không, chỉ đơn luồng thôi
* Node.js phù hợp với các ứng dụng nào? Các ứng dụng có số lượng truy cập lớn, yêu cầu cập nhật theo thời gian thực
# So với PHP thì sao?
Chúng ta hãy tiếp cận một request thường thấy là đọc một file có sẵn trên server sau đó trả về nội dung cho client
**Cách PHP xử lý:**
1. Gửi yêu cầu đọc file xuống hệ điều hành
2. Chờ hệ điều hành mở sau đó đọc file
3. Trả về nội dung file cho client
4. Tiếp nhận và xử lý các request tiếp theo


**Vậy với node.js thì sao?**
1. Gửi yêu cầu đọc file xuống hệ điều hành
2. Tiếp nhận và xử lý các request tiếp theo
3. Trả về nội dung file cho client khi hệ điều hành hoàn thành việc mở và đọc file

Như vậy có thể thấy PHP xử lý một request theo kiểu **đồng bộ** và node.js xử lý theo kiểu **bất đồng bộ**
#  Hello world
Cũng như các dev thông thường khác, chúng ta bắt đầu với một công nghệ mới từ thứ đơn giản nhất - hello world =)). Vậy để có thể chạy được node.js thì cần phải cài đặt node.js trong máy trước đã :sweat_smile::smirk:
Các bạn có thể tải node.js từ [](https://nodejs.org/en/) sau đó cài đặt theo hướng dẫn. Sau khi cài đặt xong, hãy bật IDE/Text Editor lên và bắt đầu ngay vào hello world thôi =))
```javascript 
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.send('Hello World!');
}).listen(8080)
```
ở đây ```http``` là một module của node.js để có thể xử lý được các task liên quan đến HTTP
Tiếp theo sẽ tạo một server lắng nghe các request từ cổng ```8080``` thông qua function ```http.createServer()```,  tham số truyền vào là một callback gồm 2 params là ```req, res```. 

Lưu lại file này dưới tên ```helloworld.js``` và chạy lệnh ```node helloworld.js```, bật trình duyệt và xem kết quả nhé :3.
# HTTP
Ở ví dụ trên, ta thấy ngay đầu tiên là ```var http = require('http');```. Ở trong module "http" này chứa các function liên quan đến HTTP? Hãy đào sâu hơn về http xem sao.

```javascript 
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.send('Hello World!');
}).listen(8080)
```

Có một callback được truyền vào method ```http.createServer()``` sẽ được chạy mỗi khi có request vào cổng ```8080```.
Param thứ nhất ```req``` (request) sẽ bao gồm các thông tin về request gửi lên server như: Url, query string, params, Http body,...
Param thứ hai  ```res``` (response) sẽ bao gồm các thông tin về response trả về cho client
```  res.writeHead(200, {'Content-Type': 'text/html'});``` sẽ trả về Header cho client bao gồm status code  = 200 và có kiểu text/html.
Một số modules có sẵn của node.js

| Module | Mô tả | 
| -------- | -------- | 
| querystring     | Chứa các hàm xử lý query string trên URL     | 
| http     | Tạo một http webserver     | 
| https     | Tạo một https webserver     | 
| events     | Hỗ trợ xử lý các sự kiện diễn ra trong hệ thống     | 
| os     | Cung cấp thông tin về hệ điều hành     | 
| crypto     | Hỗ trợ mã hóa/giải mãi     | 
| events     | Hỗ trợ xử lý các sự kiện diễn ra trong hệ thống     | 
và còn rất nhiều module khác nữa, các bạn có thể tham khảo tại [đây](https://nodejs.org/en/docs/)

# Package manager
Ngoài các modules/thư viện có sẵn đi kèm với node.js đôi khi chúng ta cần sử dụng thêm các thư viện từ bên ngoài, với PHP có composer, với node.js đã có NPM/Yarn. 
Để cài sử dụng NPM, cần có node (ta đã cài ở bước trên rồi), cài đặt tại [đây](https://www.npmjs.com/get-npm) các bạn nhé, về công dụng thì tất nhiên là tương tự với composer rồi =))
Để có thể dụng đơn giản chỉ cần sử dụng method ```require()```, có phần nào đó tương tự ```use``` như trong PHP :D

# Event driven
Trước khi học chắc hẳn ai cũng đọc về giới thiệu của node.js, chúng ta sẽ thấy hầu hết các bài viết đều nói về **Event Driven**, Vậy Event driven trong node.js là gì vậy nhỉ?
Trước hết hãy nói về event, như bình thường để tương tác với các DOM qua javascript chúng ta thường nói đến các event, các event đơn giản ở đây chỉ là khi click vào một phần tử nào đó (onclick), khi thay đổi giá trị (onchange),... dựa vào các action này chúng ta sẽ xử lý logic cho sự kiện.
Trong node.js cũng tương tự, hầu kiến phần core của node.js được thiết kế theo kiến trúc event-driven. Điều này khiến cho node.js khác PHP ở chỗ, khi có request, thay vì phải đọc tất cả các file có liên quan, node.js sẽ khởi động server, khai báo, định nghĩa một loạt các biến, hàm rồi chờ khi có sự kiện xảy ra sẽ nhảy vào các hàm tương ứng. Như ở ví dụ hello world phía trên, khi có sự kiện một request truy cập vào server qua cổng 8080, function phía trong sẽ được chạy
```javascript 
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.send('Hello World!');
}).listen(8080)
```
Có thể nói Event Driven khiến cho node.js trở nên khác biệt với các ngôn ngữ còn lại, đặc biệt về tốc độ xử lý, tuy nhiên ưu điểm nào cũng có nhược điểm đi kèm, vì xử lý theo cách "hướng sự kiện" nên chúng ta phải bao quát được tất cả các sự kiện có thể xảy ra để gán logic tương ứng, nhưng khi một sự kiện chưa được định nghĩa thì sao? Tất nhiên là không sao cả (về mặt logic) vì chưa bắt được sự kiện này nên sẽ không có logic nào để xử lý cả :expressionless:
# Kết
Trên đây là những gì mình tìm hiểu và so sánh giữa PHP và node.js, vào bài sau mình sẽ tiếp tục tìm hiểu và so sánh giữa 2 framework Laravel và Express