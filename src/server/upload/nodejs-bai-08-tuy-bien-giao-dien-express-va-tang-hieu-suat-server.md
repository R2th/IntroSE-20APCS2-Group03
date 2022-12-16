##  1:  Tùy biến giao diện Express
Trong các bài trước chúng ta đã tìm hiểu cách xây dựng ứng dụng với Express, và các ứng dụng này có giao diện phía client (hay frontend) cũng khá bắt mắt, tuy nhiên nếu muốn chúng ta có thể tùy biến để giao diện hiển thị theo ý thích riêng của chúng ta.

Khi tạo một project Express thì file index.ejs (mà chúng ta hay tách thành top.ejs và bottom.ejs) có dòng code này tròng thẻ <head>:
```
<link rel='stylesheet' href='/stylesheets/style.css' />
```
Đây là dòng code tham chiếu đến file style.css được đặt trong thư mục public/stylesheets. Ngoài thư mục stylesheets thì còn có 2 thư mục khác trong này là images và javascripts. Đây là các thư mục chứa các file tài nguyên để sử dụng cho phần frontend.

Chúng ta sẽ thử thay đổi một số thứ trong file style.css của project Notes đã làm trong [phần trước](https://viblo.asia/p/nodejs-bai-07-xay-dung-ung-dung-mvc-voi-express-WAyK80VpKxX) để có giao diện như ý muốn.
```
h1 {
    text-align: center;
    text-decoration: underline;
}
```
Đoạn code CSS trên rất đơn giản nếu bạn đã từng học CSS. Chỉ là đưa các element h1 ra giữa trình duyệt và thêm dấu gạch dưới phía dưới.
![](https://images.viblo.asia/fc8c96a3-71e5-4441-8d48-5661c39f97ea.jpg)
Tất nhiên là ngoài file style.css thì chúng ta cũng có thể tự viết nhiều file khác để việc tùy biến giao diện được linh hoạt hơn, bạn chỉ cần viết các file đó rồi đưa link tham chiếu trong thẻ <link> là được.

Nếu muốn bạn có thể dùng thêm một framework khác rất nổi tiếng đó là Bootstrap. Boostrap được phát triển bởi Twitter, hỗ trợ làm frontend rất mạnh, rất dễ sử dụng, có thể dùng trên nhiều loại trinh duyệt khác nhau.

Để sử dụng Bootstrap thì chúng ta có thể lên trang chủ của Bootstrap tại địa chỉ: http://getbootstrap.com/getting-started/#download

Sau khi tải về thì chúng ta giải nén ra rồi bỏ vào thư mục public, tiếp theo chúng ta chỉ cần khai báo thẻ <link> tham chiếu đến file bootstrap.min.css trong thư mục css là được, Ví dụ mình giải nén ra được thư mục bootstrap-3.3.7-dist thì mình khai báo như sau:

```
<link href="/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
```
Sau đó trong file bottom.ejs chúng ta phải khai báo hai dòng sau trước khi đóng thẻ </body>:
```
<script src="http://code.jquery.com/jquery.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
</body></html>
```
Hoặc dùng cách khác mà hầu hết mọi người thường dùng là chèn link CDN trực tiếp trong thẻ <link> luôn:
```
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
 
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
 
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```
Dùng cách này thì bạn không cần phải tốn bộ nhớ lưu trữ Bootstrap, ngoài ra Bootstrap sẽ được tải về nhanh hơn vì có rất nhiều trang web sử dụng Bootstrap bằng CDN, do đó trình duyệt sẽ lưu lại Bootsrap trong bộ nhớ cache, và đến khi gặp trang web của chúng ta cũng sử dụng CDN thì trình duyệt không cần phải tải lại nữa mà dùng thẳng cái đã được lưu trong cache luôn.

Sau khi khai báo Bootstrap chúng ta vẫn có thể khai báo file style.css của riêng chúng ta, như thế chúng ta có thể ghi đè Bootstrap đẻ tùy biến theo ý chúng ta.

Ngoài ra khi sử dụng Bootstrap bạn phải khai báo thêm dòng này ở đầu file top.ejs:
```
<!DOCTYPE html>
```
##  2:  Tăng hiệu suất server
Bây giờ giả sử dụng ứng dụng của chúng ta nổi tiếng đến mức có đến 1 triệu người dùng truy cập mỗi ngày. Một tiến trình server phải phục vụ 1 triệu người mỗi ngày là rất mệt, có một cách giải quyêt đó là chạy nhiều instance cùng một lúc để “san sẻ gánh nặng” cho nhau. Nếu bạn chưa bao giờ nghe qua khái niệm instance thì có thể hình dung nó giống như một biến hay một đối tượng vậy, tức là ở đây chúng ta tạo nhiều đối tượng server để chạy.

Khi bạn tạo một ứng dụng Express thì trong thư mục bin của project, có file www, file này không có phần mở rộng tuy nhiên nó cũng chỉ là một file text nên chúng ta có thể mở ra xem với bất kỳ trình text editor nào:

file www
```
#!/usr/bin/env node
 
/**
 * Module dependencies.
 */
 
var app = require('../app');
var debug = require('debug')('notes:server');
var http = require('http');
 
/**
 * Get port from environment and store in Express.
 */
 
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
 
/**
 * Create HTTP server.
 */
 
var server = http.createServer(app);
 
/**
 * Listen on provided port, on all network interfaces.
 */
 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
 
/**
 * Normalize a port into a number, string, or false.
 */
 
function normalizePort(val) {
    var port = parseInt(val, 10);
 
    if (isNaN(port)) {
        // named pipe
        return val;
    }
 
    if (port >= 0) {
        // port number
        return port;
    }
 
    return false;
}
 
/**
 * Event listener for HTTP server "error" event.
 */
 
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
 
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
 
    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}
 
/**
 * Event listener for HTTP server "listening" event.
 */
 
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
```
Trong file này có 2 dòng là:
```
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
```
Ý nghĩa của 2 dòng này là chạy server trên cổng được định nghĩa trong biến môi trường PORT, nếu biến môi trường PORT không có thì chạy trên cổng mặc định là 3000.

Để có thể chạy nhiều instance server cùng một lúc thì chúng ta chỉ cần chạy chúng trên các cổng khác nhau là được. Bằng cách thiết lập biến môi trường PORT cho mỗi lần chạy, chúng ta sẽ chạy được nhiều instance server.

Ví dụ:
```
C:\NodeJS\notes>SET PORT=3030
C:\NodeJS\notes>npm start
 
> notes@0.0.0 start F:\NodeJS\notes
> node ./bin/www
 
  notes:server Listening on port 3030 +0ms
```
Chúng ta thiết lập biến môi trường PORT có giá trị là 3030 bằng lệnh SET, lưu ý là việc thiết lập biến môi trường thông qua lệnh SET chỉ có hiệu lực trong terminal (Command Prompt) đó thôi, khi thoát terminal thì biến này sẽ mất. Sau đó chúng ta chạy server như thường thì server lúc này sẽ chạy trên cổng 3030.

Sau đó chúng ta lại mở một trình terminal khác lên và cũng chạy lại những lệnh như trên, chỉ khác số PORT là sẽ có thêm một instance khác, ví dụ:
```
C:\NodeJS\notes>SET PORT=4040
C:\NodeJS\notes>npm start
 
> notes@0.0.0 start F:\NodeJS\notes
> node ./bin/www
 
  notes:server Listening on port 4040 +0ms
```
![](https://images.viblo.asia/737f219c-dd12-4818-99f6-465d6fab6a75.jpg)

![](https://images.viblo.asia/7e4d2d27-6ec3-425f-bfcb-f0a721c685cf.jpg)
Thoạt nhìn thì có vẻ 2 instance đều là một, nhưng thực chất chúng là 2 đối tượng server khác nhau, chẳng qua là vì chúng đều trả về cùng một tài nguyên nên nội dung HTML trả về giống nhau. Mỗi instance đều có bộ nhớ riêng, có dữ liệu riêng. Đặc biệt là ở đây chúng ta không lưu các ghi chú trong cơ sở dữ liệu mà lưu trong bộ nhớ RAM, do đó nếu bạn tạo một ghi chú mới ở instance có cổng 3030 thì chỉ có bên đó mới thấy được, còn ở cổng 4040 thì không thể thấy được.

![](https://images.viblo.asia/db7f6077-d4a0-488d-b914-1f2c0688fbae.jpg)

![](https://images.viblo.asia/96acdeb9-48f4-4a48-a9fd-2c5502d802b0.jpg)
Tất nhiên là trong thực tế thì chúng ta muốn dữ liệu trả về phải đồng nhất (tức là 2 bên phải giống nhau), do đó dữ liệu nên/phải được lưu trong các file tài nguyên dùng chung, chẳng hạn như sử dụng cơ sở dữ liệu. Mục đích của việc sử dụng cơ sở dữ liệu là để lưu trữ lâu dài, đặc biệt là với các tập dữ liệu có các mối quan hệ phức tạp.Trong các phần sau chúng ta sẽ bắt đầu đi vào tìm hiểu cách lưu trữ dữ liệu.