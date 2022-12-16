Khi phát triển một ứng dụng có những việc cần thược hiện định kì theo thời gian như việc thống kê, tổng hợp, đồng bộ dữ liệu hay các công việc định kỳ như gửi email nhắc nhở hàng ngày. Chúng ta cần một giải phát hiệu quả cho việc này! và hôm nay tớ muốn giới thiệu cho các bạn mộtmodule để tạo ra các run job theo một lịch có sẵn một cách đơn giản và hiệu quả.

[Node-cron](https://www.npmjs.com/package/node-cron) là một module để tạo các task con theo lịch, sử dụng JavaScript nguyên bản base trên [GNU crontab](https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html). Module này cho phép bạn lập lịch tác vụ trong node.js bằng cú pháp full crontab.

## Cài đặt và sử dụng node-cron
- Cài đặt node-cron qua npm
> npm install --save node-cron

Noài ra các bạn có thể cài node-cron thông qua các responsitory khách như yarn.
- Import và tạo một cron job bằng node-cron
```
var cron = require('node-cron');
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
```
## crontab syntax
Mỗi crontab thường có cấu trúc:
```
# ┌────────────── Giây (không bắt buộc)
 # │ ┌──────────── Phút
 # │ │ ┌────────── Giờ
 # │ │ │ ┌──────── Ngày trong tháng
 # │ │ │ │ ┌────── Tháng
 # │ │ │ │ │ ┌──── Ngày trong tuần
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

**Khoảng giá trị cho phép**
| Trường | Khoảng giá trị |
| -------- | -------- |
| Giây | 0-59 |
| Phút | 0-59 |
| Giờ | 0-23 |
| Ngày trong tháng | 1-31 |
| Tháng | 1-12 or JAN-DEC |
| Ngày trong tuần | 0-7 or SUN-SAT (0 hoặc 7 là chủ nhậtr) |

**Các kí tự đặc biệt có thể sử dụng**
| Ký tự | Mô tả |
| -------- | -------- |
| *  |  (all value)  sử dụng trong trường hợp tất cả các giá trị đều đúng.  |
| - | (range of values -) sử dụng để mô tả khoảng giá trị |
| , | (value list separator) sử dụng để liệt kê các giá trị |
| / | (step values) sử dụng để chỉ rõ số lần tăng |

**Một số Tips thông dụng**

0 * * * * :  Chạy vào lúc 00 phút của mỗi giờ. 

1,2,4,5 * * * * : Chạy mỗi khi số phút bằng 1,2,4 hoặc 5. 

## Một số hàm được cung cấp bởi node-cron
### Thành phần của một cron
- **expression** string: Toán tử Cron
-  **function** Function: Hàm thực hiện theo lịch
-  **options** Object: Optional.

Options
    **scheduled** boolean: true nếu tác vụ đã bị thay đổi. Mặc định là true;
    **timezone** string: múi giờ;

Một hàm cron đầy đủ:
```
var cron = require('node-cron');
 
 cron.schedule('0 1 * * *', () => {
   console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
 }, {
   scheduled: true,
   timezone: "America/Sao_Paulo"
 });
```

### Các hàm được cung cấp

**Start**
Bắt đầu tạo một lịch cho một tác vụ.

```
var cron = require('node-cron');
 
var task = cron.schedule('* * * * *', () =>  {
  console.log('stoped task');
}, {
  scheduled: false
});
 
task.start();
```
**Stop**
Tạo dừng thực thi  một lịch cho một tác vụ.

```
var cron = require('node-cron');
 
var task = cron.schedule('* * * * *', () =>  {
  console.log('will execute every minute until stopped');
});
 
task.stop();
```
**Destroy**
Hủy một lịch cho một tác vụ.

```
var cron = require('node-cron');
 
var task = cron.schedule('* * * * *', () =>  {
  console.log('will not execute anymore, nor be able to restart');
});
 
task.destroy();
```
**Validate**
Validate sự hợp lệ của một toán tử cron.

```
var cron = require('node-cron');
 
var valid = cron.validate('59 * * * *');
var invalid = cron.validate('60 * * * *');
```

Nguồn tham khảo:
https://www.npmjs.com/package/node-cron, 
https://stackjava.com/uncategorized/cron-expression-la-gi-huong-dan-cu-phap-cron-expression.html