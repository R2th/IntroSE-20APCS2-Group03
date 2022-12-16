### 1. Mở đầu:

Winston được thiết kế để trở thành một thư viện ghi logger đơn giản và support cho multiple transports. A transport về cơ bản là một thiết bị lưu trữ cho cho logger của bạn. Mỗi logger winston có thể có multiple transports được cấu hình ở các cấp độ khác nhau. Ví dụ, người ta có thể muốn các  error logs được lưu trữ và có thể remote từ xa, nhưng tất cả các output đều cho ra console hay local file.
 
### 2. Logging levels:
Winston có các logging levels sau

```
const levels = { 
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
```

Tùy theo loại log mà bạn chọn logging levels tương ứng khi output log. Ví dụ logging lỗi thì chọn error, hoặc chỉ là các thông báo thì chọn là info.
 
### 3. Creating your own Logger:

Đầu tiên chúng ta install winston cho project của bạn

```
npm install winston
```

Sau đó chung ta bắt đầu tạo logger bằng winston.createLogger:

```
const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});
```

Để xuất log trong project bạn dùng đoạn code sau:

```
logger.log({
  level: 'info',
  message: 'Hello distributed log files!'
});

//Hoặc như thế này
logger.info('Hello again distributed logs');
```

Tất nhiên đoạn code phía trên chỉ có thể giúp bạn xuất log mà không theo format bạn mong muốn. Hoạc bạn muốn mỗi ngày sẽ xuất ra 1 file log riêng để dễ quản lí và file không quá nặng thì bạn cần làm thêm các bước sau nữa


### 4.Tạo format log file:

Để tạo format log file bạn cần import format trong winston 

```
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
```

Rồi sau đó bạn tạo một format khi bạn xuất ra file log, ở đây tôi muốn xuất nội dung log theo thứ tự timestamp, level, message

```
const formatLog = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
```

### 5. Create daily rotate file :

Phần này sẽ giúp bạn xuất mỗi ngày 1 file log riêng để cho bạn dễ quản lí và dung lượng file log nhỏ.

```require('winston-daily-rotate-file');```

```
let transportApi = new (transports.DailyRotateFile)({
  filename: 'log/api.%DATE%.log',
  datePattern: 'YYYY-MM-DD'
});
```

### 6. Create log file with format and daily rotate file:

```
let api = createLogger({
  format: combine(
    timestamp(),
    formatLog
  ),
  transports: [
    transportApi
    ]
});
```

Sau đó bạn xuất log ra log file với đoạn code sau chẳng hạn:

```
let server = app.listen(process.env.PORT || 3000, function () {
  logger.api.info(`Server listening on port ${server.address().port}`);
});
```


### 7. Lời kết
Một điểm chú ý với các bạn là winston sẽ không hoạt động trên Heroku nhé, Heroku có log riêng của nó các bạn có thể tìm hiểu thêm. Hy vọng bài viết này sẽ giúp các bạn outlut log dễ dàng hơn, chúc các bạn thành công