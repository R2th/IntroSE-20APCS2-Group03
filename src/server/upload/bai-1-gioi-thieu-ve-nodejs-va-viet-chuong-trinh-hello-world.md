Dạo này mình muốn thử học cái gì đó mới mới (mới là mới với mình thôi nhé chứ không phải là công nghệ mới tinh vừa được ra mắt đâu). Và tự dưng trong đầu mình lóe lên ý nghĩa muốn học NodeJS. Mà tự dưng một đợt bận quá nên giờ mới bắt tay vào học được. Nên mình lại chuẩn bị viết 1 đống bài về NodeJS coi như bài tập về nhà :D Các bạn đọc và cho mình ý kiến với nhé

## Giới thiệu
Trước đây khi nghe tới NodeJS thì mình ngỡ nó là một framework của JavaScript. Nhưng sau khi tìm hiểu từ khá nhiều nguồn thì mới biết được rằng NodeJS là một platform chạy trên môi trường V8 JavaScript runtime - một trình thông dịch JavaScript, và bản thân NodeJS cũng có rất nhiều framework của riêng nó (Express, Scoket.IO, Mojtio, Derby,...). NodeJS sử dụng cơ chế (non-blocking), có thể xử lý lượng request lớn với tốc độ xử lý rất nhanh.


## Cài đặt
NodeJS hỗ trợ trên rất nhiều nền tảng như Window, MacOS, Ubuntu. Với window, bạn có thể vào đường link sau đây để tải: https://nodejs.org/en/download/. Còn đối với ubuntu thì có thể chạy lệnh sau:
```
sudo apt install nodejs npm
```

Nếu bạn cài npm rồi thì có thể bỏ đoạn `npm` đi nhé. Bạn có thể kiểm tra phiên bản node của mình bằng lệnh `node -v`

## Tạo chương trình đầu tiên
Giờ bạn hãy tạo 1 folder, ở trong folder chạy lệnh
```
npm init -y
```
Lệnh này sẽ tạo ra 1 file `package.json`. File này sẽ giúp hệ thống biết được thông tin về app, phiên bản, những package cần cài đặt (nếu có). Tiếp theo, bạn hãy tạo 1 file `server.js`

```javascript
const http = require('http');
const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World!</h1>');
});

server.listen(port, hostname, () => {
    console.log(`${hostname} is running at port:${port}`);
});
```

Sau đó mở terminal lên và chạy `npm start` hoặc là `node server.js`. Truy cập vào `http://localhost:4000/` và bạn sẽ thấy kết quả :D

## Modules
Trong NodeJS, mỗi file đều được coi như là một module tách biệt. Giờ mình sẽ thử tạo thêm file `countdown.js`. Mục đích sẽ là đếm ngược số ngày tới sinh nhật crush nhé :D
```javasript
exports.countdown = () => {
    const endDate = new Date('Feb 12,2021 12:00:00').getTime();
    const now = new Date().getTime();
    const time = endDate - now;
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    const result = {
        days,
        hours,
        mins,
        secs,
    };

    return result;
};
```

Và giờ bên trong `server.js` chúng ta sẽ sử dụng module này bằng việc `require` nó
```javasript
const http = require('http');
const time = require('./countdown');
const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h3>Countdown to crush birthday: ${time.countdown().days} days ${time.countdown().hours} hours ${time.countdown().mins} mins ${time.countdown().secs} secs </h3>`);
});

server.listen(port, hostname, () => {
    console.log(`${hostname} is running at port:${port}`);
});
```
Giờ hãy thử chạy lại server nha. Vì giờ mình mới làm đơn giản thui nên cái countdown này bạn phải refresh nhé =)) Khi nào crush thành người yêu thì làm bản xịn sau :D

Nhắc đến crush làm mình buồn quá nên là bài hôm nay dừng lại tại đây nha. Trong bài sau mình sẽ tiếp tục nói về Module :D Cảm ơn các bạn đã đọc