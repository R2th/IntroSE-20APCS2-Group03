#### Giới thiệu
Những người làm công việc phát triển phần mềm như chúng ta đã không còn cảm thấy xa lạ với những log. 
- Developers tìm kiếm, phát hiện nguyên nhân các vấn đề trong code để xử lý. 
- System administrators phải dám sát hệ thống để đảm bảo hệ thống hoạt động một cách ổn định cũng cần phải nhờ log. Mỗi một dấu hiệu bất bình thường nào diễn ra trên log cũng cần phải được chú ý.
- Security team cũng cần sử dụng log để phân tích, tìm ra những lỗ hổng từ đó có những biện pháp để cải thiện tính bảo mật của hệ thống.

<br/>
 
Việc ghi log, đọc log , quản lý log là một công việc quan trọng trong quá trình phát triển phần mềm nói riêng và ngành công nghệ thông tin nói chung. Có nhiều cách thức để ghi và quản lý việc logging, đối với những dự án nhỏ ta chỉ cần sử dụng log trực tiếp thông qua màn hình console hoặc ghi ra file để giám sát tuy nhiên đối với những hệ thống lớn phục vụ nhiều người dùng, có nhiều dịch vụ phân tán phải quản lý trên nhiều máy thì việc ghi log ra file không còn là một giải pháp hiệu quả trong trường hợp này cần có hệ thống monitoring đặc thù nhằm ghi và quản lý log tập trung. 

Trong khuôn khổ bài viết này mình sẽ giới thiệu một thư viện cho việc ghi log dành cho những dự án Nodejs ở mức quy mô nhỏ. Trong tương lai mình sẽ tìm hiểu thêm về hệ thống [monitoring ](https://pandorafms.com/blog/why-you-need-a-monitoring-system/) và [ELK Stack](https://www.elastic.co/what-is/elk-stack) trong xây dựng một hệ thống monitoring cho việc quản lý log để giới thiệu với mọi người. Hy vọng mọi người sẽ ủng hộ.

#### Thư viện Winston
Winston được thiết kế như một thư viện ghi log  Javascript đơn giản hỗ trợ nhiều transports và hỗ trợ tuỳ chỉnh trên nhiều levels log khác nhau.

- Transport là cách thức sử dụng log như log trên console hay ghi log vào file, ...
- Log levels là các mức độ của log
```javascript
const levels = { 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
};
```

##### Cài đặt
Để cài đặt thư viện winston có thể sử dụng các package manager như `npm` hoặc `yarn`
```bash
npm install winston
``` 

```bash
yarn add winston
```

##### Tạo một Logger với winston
Ta tạo một file có tên là `winston.js` để chứa đối tượng `logger` của chúng ta: 
```javascript
const winston = require('winston');
const path = require('path');

module.exports = winston.createLogger({
  // format của log được kết hợp thông qua format.combine
  format: winston.format.combine(
    winston.format.splat(),
    // Định dạng time cho log
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // thêm màu sắc
    winston.format.colorize(),
    // thiết lập định dạng của log
    winston.format.printf(
      log => {
        // nếu log là error hiển thị stack trace còn không hiển thị message của log 
        if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
        return  `[${log.timestamp}] [${log.level}] ${log.message}`;
      },
    ),
  ),
  transports: [
    // hiển thị log thông qua console
    new winston.transports.Console(),
    // Thiết lập ghi các errors vào file 
    new winston.transports.File({
      level: 'error',
      filename: path.join(__dirname, 'errors.log')
    })
  ],
})
```
Để khởi tạo một logger ta sử dụng `winston.createLogger`.  Một số tham số trong `logger` ta cần chú ý như:

- `level`:  cho phép ta sử dụng log đối với các mức level nhỏ hơn hoặc bằng level được thiết lập dựa trên thứ tự levels đã được quy định.
- `levels`: mặc định `winston.config.npm.levels`  là các levels mặc định đã được thiết lập sẵn với màu sắc tương ứng. Ta có thể tự custom các levels log và màu sắc của các level
- `transport`: Thiết lập cách thức log của logger.
- `format`: cho phép điều chỉnh thiết lập định dạng của log.

Ta cùng test Logger mà chúng ra đã tạo bằng.
```javascript
// test.js
const logger = require('./winston');

logger.info('Info log %');
logger.warn('Warning log');
logger.error(new Error('Error log'));
```

Chạy file `test.js` cho ta kết quả log trên màn hình console và một file errors.log được tạo ra chứa log của error:

![Test log](https://images.viblo.asia/90429ed9-4619-410f-a3e1-651368ba47b3.png)

#### Lời kết
Trong phạm vi bài viết mình mới giới thiệu một cách khái quát `winston` thông qua một ví dụ đơn giản. Thư viện còn hỗ trợ nhiều tính năng khác, các bạn có thể tham khảo chi tiết hơn tại [Winston](https://github.com/winstonjs/winston) và [Examples](https://github.com/winstonjs/winston/tree/master/examples). Cảm ơn các bạn đã theo dõi bài viết.