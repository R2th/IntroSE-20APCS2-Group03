Kiểm tra các nguyên tắc của mã tối giản trong phần [giới thiệu thử thách đầu tiên](https://viblo.asia/p/toi-gian-ma-1-if-boolean-then-boolean-924lJREWlPM).
### Thử thách
Viết hàm trả về chuỗi `"even"` nếu số nguyên đã cho là chẵn và chuỗi `"odd"` nếu là số lẻ.

### Gợi ý:
Chuyển đổi boolean hoặc thứ gì đó bản chất là boolean trở thành boolean là không cần thiết.

Ví dụ:
```
let bool = Boolean(x < 4)
return bool === true
```

Tương đương với:
`return x < 4`

Các so sánh  `<, <=, ===, !==, >=, >` sẽ luôn dẫn đến giá trị boolean, do đó việc sử dụng hàm `Boolean()` là hoàn toàn không cần thiết.
`bool === true` là dư thừa, vì nó sẽ luôn trả về `bool`.

Để lấy nghịch đảo `bool`, chúng ta có thể sử dụng `bool === false`.  Tuy nhiên, một cách đơn giản hơn nhiều để làm điều này là`!bool`.

Để duy trì khả năng dễ đọc, hãy tránh khai báo các biến không cần thiết.

### Chú ý:
Khả năng dễ đọc thực sự là một khái niệm chủ quan.  Chúng ta cùng thảo luận nhé!  Hãy để lại ý kiến của bạn trong bình luận.