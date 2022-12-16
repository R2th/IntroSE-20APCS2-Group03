Từ phiên bản Node.js 8.4.0, Node.js đã đưa vào thử nghiệm HTTP/2. Tại phiên bản này chúng ta có thể bật HTTP/2 bằng cách sử dụng cờ `--expose-http2` khi khởi động ứng dụng. Đến thời điểm hiện tại thì Node.js 10 đã ra đời và HTTP/2 là module mặc định, chúng ta không phải thêm cờ khi khởi động nữa.

Trong bài này, chúng ta sẽ cùng tìm hiểu một số đặc điểm quan trọng của HTTP/2 Server Push và sẽ thử demo bằng một ứng dụng nho nhỏ để thấy được lợi ích từ việc sử dụng HTTP/2

![](https://images.viblo.asia/a9a802af-05cf-4051-9c29-61894a3081dc.png)

## Giới thiệu về HTTP/2
Mục tiêu chính của HTTP/2 là `reduce latency` (giảm độ trễ) bằng cách kích hoạt `full request` và `response đa kênh`, giảm thiểu gánh nặng cho các giao thức truyền thông bằng cách nén có hiệu quả các HTTP headers. Ngoài ra nó còn hỗ trợ việc đánh  ưu tiên các request và  `Server push`. Bạn có thể tìm hiểu chi tiết về HTTP/2 qua bài viết này https://developers.google.com/web/fundamentals/performance/http2/


## Server Push
`HTTP/2 Server Push` cho phép server gửi assets về cho browser trước khi browser gửi request lên server.

> Trước khi đi vào tìm hiểu HTTP/2 Server Push, hãy cùng so sánh nó với HTTP/1

Đối với HTTP/1, client side gửi request tới server, server khi đó sẽ phản hồi lại content là HTML source; trong đó tồn tại link đến các resource cần thiết để hiển thị trang web (js, css, image,...). Ngay khi browser nhận được source HTML này, nó sẽ bắt đầu quá trình xử lý. Khi đó browser sẽ gửi các request riêng biệt để load từng file asset khác nhau về phía client.

Hãy cùng xem hình dưới đây để thấy toàn bộ tiến trình (Lưu ý vào việc load từng file js và phần Initiator)

![](https://images.viblo.asia/061de2ab-0d4d-4b55-b22f-a13f2e311425.png)

Đây là cách mà HTTP/1 làm việc và vấn đề với nó là user phải chờ trong khi brower xử lý html response, tìm link assets và load assets về. Điều này làm chậm quá trình render và tăng thời gian tải trang. Có một số cách giải quyết vấn đề này như là sử dụng inline assets (giống cách mà Google search nhúng css trực tiếp vào html source), nhưng nó cũng làm cho html response ban đầu có kích thước lớn hơn, chúng ta sẽ cần nhiều thời gian hơn cho việc tải inital response.

> Đây chính là vấn đề mà HTTP/2 Server Push giải quyết, khi mà server có thể gửi assets đến browser ngay cả trước khi browser gửi request đến server.

Hãy cùng quan sát hình dưới đây, (cùng source với website demo bên trên nhưng được chạy thông qua HTTP/2). Chúng ta lại tiếp tục để ý vào timeline à Initiator nhé. Bạn có thể thấy rằng HTTP/2 (đa kênh) đã giúp giảm thiểu số lượng requests và các file asset được gửi ngay lập tức, cùng lúc với request ban đầu.

![](https://images.viblo.asia/1537e6a1-8314-4308-913a-03dfce4e4eb8.png)

Bây giờ chúng ta sẽ cùng kiểm chứng xem HTTP/2 Server Push có thể làm gì và nó sẽ giúp tăng tốc độ load dưới client như thế nào nhé

## HTTP/2 Demo cách dùng Server Push trong Node.js
Chúng ta sẽ sử dụng module `http2` với Node.js giống như cách mà chúng ta từng làm với module `https`

Điểm khác biệt và khá thú vị ở đây là chúng ta sẽ có thêm phần push asset files ngay khi có request đến file index.html

```
const path = require('path');
const http2 = require('http2');
const fs = require('fs');
const mime = require('mime');

const { HTTP2_HEADER_PATH } = http2.constants;

const getFile = path => {
    const filePath = `${__dirname}/${path}`;

    try {
        const content = fs.openSync(filePath, 'r');
        const contentType = mime.getType(filePath);
        return {
            content,
            headers: {
                'content-type': contentType
            }
        };
    } catch (e) {
        console.log('error => ', e)
        return null;
    }
}

const server = http2.createSecureServer({
    cert: fs.readFileSync(path.join(__dirname, '/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/key.pem'))
});

function push(stream, path) {
    const file = getFile(path);
    if (!file) {
        return;
    }
    stream.pushStream({
        [HTTP2_HEADER_PATH]: path
    }, pushStream => {
        pushStream.respondWithFD(file.content, file.headers);
    });
}

server.on('stream', (stream, headers) => {
    push(stream, '/bundle1.js');
    push(stream, '/bundle2.js');

    const file = getFile('/index.html');
    stream.respondWithFD(file.content, file.headers);
});

server.listen(3000, () => console.log('App listening on port 3000'));
```

Đây là cách mà các file `bundle1.js` và `bundle2.js` sẽ được gửi đến browser ngayc ả khi browser chưa request

![](https://images.viblo.asia/309fd612-fa4e-4e21-be94-f496d0b322a9.png)

![](https://images.viblo.asia/81e71cf4-960b-4958-ba1b-25709d2f523b.png)

Tham khảo:
https://developers.google.com/web/fundamentals/performance/http2/

https://blog.risingstack.com/node-js-http-2-push/

https://blog.risingstack.com/node-js-10-lts-feature-breakdown/