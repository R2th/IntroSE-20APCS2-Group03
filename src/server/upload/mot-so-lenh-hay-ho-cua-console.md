# 1, log
Ai code JS mà chưa từng một lần trong đời sử dụng console.log() ? Đây có lẽ là lệnh phổ biến nhất trong JS.

console.log() sẽ in ra chuỗi, số, object được truyền vào nó. Bạn có thể truyền bất kỳ object nào trong JS vào console.log() và nó sẽ in ra màn hình console cho bạn.

Ngoài ra, bạn còn có thể sử dụng CSS trong console.log. Bất ngờ phải không ? Đây cũng là cách mà facebook đã áp dụng đấy !

```js
console.log(
  'Hello %cViblo%c!',
  'color: #1ab374; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);',
  'color: #ff7b5f; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);',
)
```

# 2, info, warn, error
Về cơ bản thì những lệnh này không khác gì log, tuy nhiên nó sẽ phân biệt các message mà người dùng truyền vào bằng các màu, cũng như ký tự warning hoặc danger,... Ngoài ra, trên trình duyệt Chrome, các lệnh này còn có thể được hiển thị riêng biệt bằng các tab trên cửa sổ console của Chrome.

![](https://images.viblo.asia/301fb32d-ed80-441e-83bd-172565cdd11a.gif)

# 3, assert
console.assert() nhận vào 2 tham số. Tham số thứ nhất là một biểu thức boolean, tham số thứ hai là message được in ra nếu như biểu thức được truyền vào trước đó trả về ```false``` 

![](https://images.viblo.asia/cd1a153b-3b20-4d0c-a661-5f7fbc0cc33e.png)

# 4, clear
Ai dùng terminal đều hay có thói quen sử dụng lệnh clear (trên linux, mac) hoặc cls (trên window). Trong JS cũng hỗ trợ lệnh console.clear() để clear toàn bộ màn hình console hiện tại. Trong trình duyệt Chrome để tránh mất công gõ cả lệnh console.clear(), bạn có thể dùng tổ hợp phím tắt ```ctrl + l``` để clear màn hình.

# 5, dir
Đây là một lệnh khá hay ho để in ra DOM. Nếu truyền vào các object bình thường thì console.dir cũng in ra chẳng khác gì console.log cả. Tuy nhiên đối với DOM thì khác ! Trong khi console.log in DOM dưới dạng code HTML thì console.dir lại in ra dưới dạng 1 object với các thuộc tính chính là các element nằm trong DOM.

![](https://images.viblo.asia/4e45a777-24b1-4262-b44e-970a6e7787f4.png)

# 6, group
Khá thuận tiện cho việc debug ! Về cơ bản thì console.log sẽ được dùng kết hợp với các lệnh khác để in (thông thường là console.log). Cũng như nó sẽ được gom vào trong 1 hàm để sử dụng cho thuận tiện. console.group sẽ gom tất cả những lệnh in phía sau nó cho đến khi chạy lệnh console.groupEnd và một group có tên là chuỗi được truyền vào nó.

```javascript
function name(obj) {
  console.group('name');
  console.log('first: ', obj.first);
  console.log('middle: ', obj.middle);
  console.log('last: ', obj.last);
  console.groupEnd();
}

name({"first":"Wile","middle":"E","last":"Coyote"});
```

![](https://images.viblo.asia/b7a266a2-aa89-43d9-8d76-0537f4204ca6.png)

# 7, table
Ok, nếu bạn muốn có một cái nhìn siêu trực quan về các object thì đây là lệnh dành cho bạn ! Đây là lệnh mà khi nhận vào một array, nó sẽ trình bày cho bạn dưới dạng bảng, rất giống cách biểu diễn trong cuộc sống hàng ngày. Tiêu đề mỗi cột chính là thuộc tính của các element trong array đó.

![](https://images.viblo.asia/ca18cf9f-918d-4346-9828-a711e1c2afa8.png)

# 8, time
Đây là một câu lệnh để đo thời gian chạy của đoạn mã ta đưa vào. Đặt đoạn mã của bạn nằm giữa console.time() và console.timeEnd(), sau khi thực hiện đoạn mã, nó sẽ in ra xem để thực hiện đoạn mã đó hết bao nhiêu thời gian. Điều này rất tiện lợi khi ta muốn thử hiệu năng code của mình đúng không nào ?

```js
console.time();
var arr = new Array(10000);
for (var i = 0; i < arr.length; i++) {
  arr[i] = new Object();
}
console.timeEnd();
// default: 3.696044921875ms
```