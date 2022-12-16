**Array là một cấu trúc dữ liệu được sử dụng rất nhiều trong các ngôn ngữ lập trình và trong Javascript cũng không ngoại lệ. Với những tính năng mới được giới thiệu trong ES6, ES7 khiến cho Javascript ngày càng trở nên thú vị. Trong bài viết này mình xin được chia sẻ những cách/mẹo sử dụng với array mà mình sưu tầm được.**

## 1. Truyền parameter trống vào một hàm
Nếu bạn muốn thực thi một hàm và không truyền một vài tham số mặc dù đã định nghĩa trong hàm thì lúc đó JS sẽ báo lỗi.
Ví dụ:
```
method('parameter1', , 'parameter3');
Uncaught SyntaxError: Unexpected token ,
```

Cách giải quyết mọi người thường hay sử dụng là truyền vào null hoặc undefined
```
method('parameter1', null, 'parameter3') // hoặc
method('parameter1', undefined, 'parameter3');
```

Nhưng việc truyền vào null hoặc undefined chỉ giải quyết được vấn đề ngay lúc này, mặc vẫn chạy được nhưng thực sự nếu có nhiều tham số như vậy khiến mã nguồn chúng ta trở nên dư thừa và không được chuyên nghiệp.
Để giải quyết chúng ta có thể sử dụng spread operators được giới thiệu trong ES6. Với tính chất của array thì chúng ta có thể có một phần tử rỗng và ta có thể truyền mảng đó vào gọi hàm.

`method(...['parameter1', , 'parameter3']);`

## 2.  Tạo giá trị độc nhất trong mảng
Bằng cách sử dụng `spread operator` và `Set` ta có thể tạo ra một mảng giá trị với các giá trị không trùng nhau.
```
const arr = [...new Set([1, 2, 3, 3])];
Kết quả của arr sẽ là: [1, 2, 3]
```

### 3. Map với Array.from()
`Array.from()` là một lựa chọn thay thế cho hàm map trong một vài trường hợp.
Ví dụ khi sử dụng hàm `document.querySelectorAll()` thì kết quả trả về là Object Like-array, để có thể sử dụng được hàm map thì chúng ta phải chuyển nó qua array.
Với array.from() chúng ta có thể thực hiện luôn bước chuyển đó.

```
const contents = document.querySelectorAll('span.content');
const result = Array.from(contents, c => c.textContent);
```

### 4. Xóa phần tử trong mảng
Để giảm size của mảng hay xóa n phần tử trong mảng, ta có thể sử dụng `array.length`
```
let array = ['a', 'b', 'c', 'd']
array.length = 2
// Kết quả: array = ["a", "b"]
```

### 5. Lấy phần tử cuối cùng trong mảng
`Array.prototype.slice(begin, end)` được dùng để cắt bớt các phần tử trong mảng khi bạn truyền tham số `begin` và `end`, nếu không truyền `end` thì nó sẽ tự động đặt giá trị `length` của mảng.
Vì `begin` có thể nhận giá trị âm nên chúng ta có thể lấy được các phần tử cuối của mảng.

```
let array = [1, 2, 3, 4, 5, 6]
array.slice(-1)
// Kết quả: array = [6] 

array.slice(-2)
// Kết quả: array = [5,6] 
```

**Cảm ơn bạn đã dành thời gian đọc bài viết.**

*Nguồn: Sưu tầm*