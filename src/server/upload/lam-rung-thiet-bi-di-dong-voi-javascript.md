Rung thiết bị di động giúp trải nghiệm người dùng trở nên tốt hơn, ví dụ thông báo có tin nhắn, bài viết mới ...

## Cách sử dụng:
### Cú pháp:
Thiết bị có thể rung nhờ phương thước `navigator.vibrate()`.

### Ví dụ:
* Để thực hiện việc rung :joy: chúng ta truyền tham số có đơn vị là miliseconds vào.
Ví dụ:
```
// Rung kéo dài 1 giây.
window.navigator.vibrate(1000);
```

* Để thực hiện việc rung nhiều lần, ta truyền vào tham số là một mảng số nguyên, dạng [ [thời gian rung] [*thời gian nghỉ*] [thời gian rung] [*thời gian nghỉ*] ... ]:
`window.navigator.vibrate([400, 100, 300, 100]);`

Đoạn code trên sẽ thực hiện lần lượt việc rung, nghỉ 400, 100, 300, 100 giây.

### Hủy rung:
Truyền vào hàm giá trị 0

`window.navigator.vibrate(0);`

### Giá trị trả về:
Hàm `navigator.vibrate` trả về giá trị boolean
* false: nếu tham số truyền vào không hợp lệ.
* true: nếu tham số truyền vào  hợp lệ.

## Lưu ý:
* Nếu một hàm vibrate đang thực hiện, hàm vibrate khác được gọi thì hàm đầu tiên sẽ bị hủy và hàm gọi thứ hai sẽ bắt đầu thực hiện.
* Nếu thời gian rung quá dài, trình duyệt sẽ rung trong thời gian được cài đặt sẵn và bỏ phần còn lại.
* Hàm chỉ này sẽ chỉ hoạt động khi thiết bị có cảm biến rung.

## Supported Browsers:
* Google Chrome 32 trở lên
* Firefox 16 trở lên