> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4) 

Khi chạy server, NodeJS sẽ lấy thông từ file có tên được định nghĩa trong key ***main*** đế khởi chạy. 

Ở bài trước mình đã đặt tên file này là *app.js*, nên mình sẽ tạo file này trong nodeapp

```javascript:nodeapp/app.js
// do some thing here
```

Bây giờ, ta sẽ thêm vào file này nội dung như sau:
```javascript:nodeapp/app.js
const express = require('express'); 
const app = express(); 
const port = 8080; 

app.get('/', function(req, res){
    res.send("Hello World");
})

app.listen(port, function(){
    console.log("Your app running on port " + port);
})
```

Mình sẽ giải thích sơ lược về các câu lệnh và hàm trong file này. Các bạn đừng lo lắng nếu không hiểu, vì các câu lệnh và hàm này sẽ được giải thích kĩ hơn trong các bài tiếp theo

	
| Câu lệnh / hàm | Ý nghĩa |
| - | - |
| const express = require('express'); | Thêm module express vào project. Trong Node, khi muốn sử dụng một module, bạn sẽ phải dùng hàm ***require()*** với tham số là tên module |
|const app = express();| Khởi tạo một app mới sử dụng module express|
|const port = 8080; | Định nghĩa tên cổng để chạy ứng dụng NodeJS của bạn trên server, ở đây là cổng 8080, bạn cũng có thể chọn cổng 3000|
|app.get('/', function(req, res){ res.send("Hello World"); }) | Hàm ***get()*** sẽ có 2 tham số, tham số đầu tiên là địa chỉ mà server sẽ nhận request từ client, tham số thứ 2 là một function xử lý request (req) và gửi kết quả trả về gọi là response (res). Hàm ***send()*** làm một hàm gửi kết quả trả về. Ở đây mình sẽ trả về một chuỗi là: "Hello World"
| app.listen(port, function(){console.log("Your app running on port " + port);}) | Hàm ***listen()*** sẽ khởi động server. Hàm này có 2 tham số, tham số đầu tiên là port mà ứng dụng NodeJS của bạn sẽ chạy, tham số thứ 2 là một callback function sẽ được gọi khi server khởi động|

> Bây giờ, để chạy server, ta sẽ chạy dòng lệnh ***node app.js*** trong cmd (chạy file main của node, ở đây là file app.js, khi bạn thay đổi bất kì điều j trong project của bạn, bạn cũng sẽ phải chạy lại dòng lệnh này để khởi chạy lại server)
```
C:\User\DucPhuc> node app.js
Your app running on port 8080
``` 
Ta đã thấy dòng chữ "Your app running on port 8080" được in ra, tức là hàm callback đã được gọi, server đã chạy thành công. Thử truy cập vào [localhost:8080](localhost:8080) xem có gì nhé

![](https://images.viblo.asia/363ecaf9-6f16-4e27-b29c-f8e5f7c709e6.png)

Ta thấy đã có dòng chữ Hello World xuất hiện. Đúng như ý chúng ta mong muốn

Thử thay đổi hàm ***get()*** một chút nhé

```javascript:nodeapp/app.js
app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
    // res.send("Hello World");
})
```

Tắt server hiện tại (Nhấn Ctrl + C trong cmd), và chạy lại server bằng lệnh ***node app.js*** và xem kết quả, ta sẽ thấy một thẻ h2 với nội dung ***This is my first app*** được hiển thị

Đây là cách mà ta trả về một đoạn code html cho client khi client gửi request lên server NodeJS

Nói thêm một chút về hàm ***get()*** các bạn hãy bật F12 (Inspect), chọn tab Network, và refresh (F5) lại trang web, bạn sẽ thấy 1 request có method GET được gửi lên server
![](https://images.viblo.asia/400c1934-44cf-40cd-bb37-228ce0d6ee30.png)

Chi tiết về Request
![](https://images.viblo.asia/dd04c316-0fcd-4e31-9424-82b76d6b3f5c.png)

Như vậy, đến đây, bạn đã tạo cho mình được ứng dụng đầu tiên với NodeJS. Ở các bài học sau, mình sẽ nói rõ hơn về các HTTP Method (Get, Post, Put, Patch, Delete) thông qua một số ví dụ khi kết hợp với các thành phần khác để các bạn có thể hiểu và làm được trên NodeJS. Hẹn gặp lại các bạn