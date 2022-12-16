JavaScript chỉ là một ngôn ngữ lập trình phía client chạy trên trình duyệt, phải không? Nhưng điều này không còn đúng chút nào nữa. Node.js là một cách để chạy JavaScript trên server; nhưng nó còn hơn thế nữa. Nếu bạn là một người có hứng thú trong việc phát triển web, thì bạn nên tìm hiểu đôi chút về Node.js và lý do tại sao nó đang tạo ra một làn sóng trong cộng đồng.

### Tại sao nên sử dụng Nodejs?
Đầu tiên là ưu điểm về tốc độ thực thi và khả năng mở rộng. Node.js có tốc độ rất nhanh. Đó là một yêu cầu khá quan trọng khi bạn là một startup đang cố gắng tạo ra một sản phẩm lớn và muốn đảm bảo có thể mở rộng nhanh chóng, đáp ứng được một lượng lớn người dùng khi trang web của bạn phát triển lên. 

Node.js có thể xử lý hàng ngàn kết nối đồng thời. Bên cạnh các lợi ích về tốc độ thực thi và khả năng mở rộng, có thể bạn cũng đã biết một chút về JavaScript nên việc bắt đầu không còn là quá khó khăn nữa. Và điều quan trọng là, Node.js đang ngày càng trở nên lớn mạnh hơn.


### Demo Nodejs để chạy web server trên local

Tạo 1 file app.js
```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
    var body = 'Hello World\n';
    var content_length = body.lengthh;
    res.setHeader('Content-Type', 'text/plain');
    res.writeHeader(200, {
        'Content-Type' : 'text/plain',
        'Content-Length' : content_length
    });
    res.end(body);
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```
writeHead () được gọi để write header của response để gửi tới client.

Phương thức end () sẽ gửi content của response đến clinet và thông báo cho server rằng response (header và content) đã được gửi xong.

Chạy file app.js bằng command line
![](https://images.viblo.asia/2a369c64-7676-432b-8162-81252686a516.png)

Kiểm tra
![](https://images.viblo.asia/fd665684-ac88-4393-aae3-1edce87affe6.png)

### Nodejs Debugger

Giả sử trong đoạn code trên, thay vì **body.length** thì ta viết nhầm thành **body.lengthh**
Content-length trả về sẽ là undefined
![](https://images.viblo.asia/60f45005-446d-4b23-87f6-18a8a320a692.png)

Để có thể hỗ trợ cho việc phát hiện lỗi, ta có thể sử dụng debugger của nodejs

`node debug app.js`

Từ bản 6.3 trở đi thì nodejs sử dụng `node inspect app.js` (node debug vẫn chạy ở các phiên bản lớn hơn)


![](https://images.viblo.asia/00f40517-036f-4d49-944b-7b9a1a929c8f.png)

Khi chạy `node inspect app.js` node sẽ hiện lên 3 dòng đầu của file

Tiếp tục chạy lệnh help, chúng ta sẽ thấy danh sách các lệnh hỗ trợ cho việc debug

Ví dụ ta chạy `sb(9)` để đặt breakpoint tại dòng số 9, `cont` để tiếp tục
![](https://images.viblo.asia/ba7a4011-ae9f-4f3c-947c-7719bd1d43e6.png)

Quay trở lại browser, reload và quay lại terminal ta sẽ thấy đoạn code sẽ được thực hiện đến dòng số 9

Chạy lệnh repl, gõ tên các biến, ta thấy biến content_length đang là undefined nên có thể phán đoán được rằng dòng code đó đang xảy ra vấn đề
![](https://images.viblo.asia/7392120b-6daf-41ca-9bb5-52e4cb9165ad.png)


Trên đây là 1 đoạn chương trình đơn giản và giới thiệu sơ lược về công cụ debugger mặc định của nodejs hỗ trợ trong việc phát triển.

Nguồn tham khảo:
https://techmaster.vn/posts/33428/nodejs-la-gi-va-tai-sao-toi-nen-hoc-lap-trinh-nodejs