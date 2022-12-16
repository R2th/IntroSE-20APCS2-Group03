# I. Problem:

Trong Javascript, có 2 cách thức `nhìn có vẻ giống nhưng lại khác nhau hoàn toàn` để chúng ta so sánh các giá trị bằng nhau. Chúng chính là `==` và `===`.

# II. `===`:
Khi chúng ta sử dụng `===` trong Javascript, chúng ta đang so sánh theo hướng `strict equality` - `nghiêm ngặt` , điều này có nghĩa là chúng ta đang so sánh cả giá trị lẫn kiểu dữ liệu của biến. 

```javascript
5 === 5;
=> true, cả 2 đều cùng giá trị và cùng kiểu Number

'hello world' === 'hello world'
=> true

true === true
=> true
```

Trong ví dụ thứ 2, chúng ta sẽ so sánh với nhiều trường hợp hơn:
```javascript
console.log(77) // => 77
console.log('77') // => 77
77 === '77'
=> false

'cat' === 'dog'
=> false 

false === 0
=> false
```

# III. `==`:
Khi sử dụng `==`  để so sánh trong Javascript, chúng ta đang so sánh theo hướng `loose equlity` - `lỏng lẻo`. Khi sử dụng `==` để so sánh cho các giá trị khác kiểu, Javascript sẽ thực hiện 1 quá trình phía dưới, gọi là `type coercion`, nhằm ép kiểu để 2 phía của phép so sánh về cùng 1 kiểu giá trị để thực hiện so sánh. Ví dụ về `==`:

```javascript
77 === '77'
=> false

77 == '77'
=> true
```

Các bạn có thể thấy, khi sử dụng `==`, dù khác kiểu nhưng `77` và `'77'` lại bằng nhau . Khi thực hiện phép so sánh bằng `==`, Javascript sẽ chuyển đổi kiểu dữ liệu của `'77'` giống với `77` (`String` ->  `Number`).  Nhưng đôi khi không phải lúc nào việc so sánh 2 giá trị khác kiểu cũng đều thuận lợi và dễ đoán. 
Đặc biệt, việc so sánh bằng `==` trong so sánh các giá trị `falsy` cũng rất biến ảo:

```javascript
// false, 0, ''
false === 0
=> false

false == 0
=> true

false === ''
=> false
 
false  == ''
=> true

0 == ''
=> true

// null & undefined
null == null
=> true

undefined == undefined
=> true

undefined == null
=> true

// riêng với NaN, sẽ không có giá trị tương đương các falsy khác
null == NaN
=> false
```

# IV. Javascript's Implicit Coercion:
Tiêu đề ở đây có nghĩa là: `Javascript sẽ ép kiểu các giá trị dù không có yêu cầu ép kiểu nào`.
Thông thường, chúng ta thường sử dụng cú pháp `Number('7')` để chuyển chuỗi `'7'` thành số. Nhưng nếu so sánh như ví dụ ở trên, Javascript đã tự động làm việc đó:
```javascript
7 == '7'
=> true
```

Và bởi vì sự thay đổi kiểu của biến 1 cách âm thầm, mình nghĩ đây là 1 trong những tính năng tệ nhất của `JavaScript`, hoặc ít nhất là tính năng mình ghét nhất:

```javascript
1 + 2 = 3

1 + "2" = "12"

1 * "2" = 2

1 + true = 2

4 / [2] = 2
```

Thay vì thông báo khác kiểu dữ liệu với giá trị còn lại, mình nhận được 1 kết quả với giá trị vượt xa trí tưởng tượng của mình!

Đây chỉ là vài trong Hằng hà sa số các trường hợp mà `Javascript's Implicit Coercion` tạo ra. Vậy nên, hãy tỉnh táo và so sánh thật chuẩn với `===` nhé.

Tài liệu tham khảo:

* [JavaScript — Double Equals vs. Triple Equals](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a)

Cảm ơn các bạn đã đọc qua bài viết của mình. Nếu cảm thấy hay, hãy tặng mình 1 like nhé :D.