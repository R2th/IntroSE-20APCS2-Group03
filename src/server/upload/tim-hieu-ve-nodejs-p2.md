### Sử dụng documentation hiệu quả
### 
Trang chủ https://nodejs.org/en/docs/

![](https://images.viblo.asia/f35cf51f-71d0-4ff4-9a24-c34752cc8eff.png)

Như bên trái ta có thể thấy nodejs áp dụng các tính năng của ES6.
Trích từ trang chủ của nodejs

> Node.js được xây dựng dựa trên các phiên bản hiện đại của V8. Bằng cách cập nhật các bản phát hành mới nhất của công cụ này, chúng tôi đảm bảo các tính năng mới từ đặc tả JavaScript ECMA-262 được đưa đến các nhà phát triển Node.js một cách kịp thời, cũng như tiếp tục cải thiện hiệu suất và độ ổn định.
> 
> Tất cả các tính năng ECMAScript 2015 (ES6) được chia thành ba nhóm tính năng **shipping**, **staged**, and **in progress**:
> 
> Tất cả các tính năng shipping, là những tính năng mà V8 coi là ổn định, được bật mặc định trên Node.js.
> Các tính năng staged, là các tính năng gần như đã hoàn thành mà nhóm V8 không coi là ổn định, yêu cầu cờ thời gian chạy (runtime flag): --harmony.
> Trong các tính năng in progress có thể được kích hoạt riêng bởi cờ harmony tương ứng của chúng, mặc dù điều này không được khuyến khích trừ khi cho mục đích test. Lưu ý: những cờ này được hiển thị bởi V8 và sẽ có khả năng thay đổi mà không có bất kỳ thông báo nào.
> 

https://node.green/ là trang web mà bạn có thể dễ dàng tra cứu các tính năng **shipping** của nodejs

Các tính năng mới sẽ thường xuyên được cập nhật vào V8. Nói cách khác, các tính năng **in progress** sẽ dần dần được đưa vào nodejs, dù là trong khoảng thời gian chưa biết trước.

Bạn có thể liệt kê tất cả các tính năng **in progress** có sẵn trên mỗi bản phát hành Node.js thông qua  `--v8-options`. Lưu ý rằng đây là những tính năng chưa hoàn chỉnh và có thể làm hỏng các tính năng của V8, vì vậy hãy chấp nhận rủi ro khi sử dụng chúng:

```
node --v8-options | grep "in progress"
```

Các function được ghi trong docs cũng có thể được đánh dấu mức độ ổn định, đây là 1 yếu tố khá quan trọng để bạn cân nhắc nên sử dụng chúng

Mức độ ổn định cao:

![](https://images.viblo.asia/2b1bd85f-df00-4d32-943e-e19773f574d6.png)

Mức độ ổn định còn đang được thử nghiệm:

![](https://images.viblo.asia/d6d6cb01-c35b-4449-9d74-ff67bb8205f5.png)

### Đối tượng Global (Global Object):
### 
Global Object có sẵn ở trong tất cả các module

Nếu bạn đã tiếp xúc với javascript thì bạn có thể biết chúng như là các **window object**

Ví dụ đơn giản như khi ta sử dụng Global Object : **setTimeout(callback, delay[, ...args])**
```
setTimeout(function() {
  console.log('2 sec have passed');
}, 2000);
```

Chương trình sẽ delay 2000ms trước khi thực hiện câu lệnh.

Một ví dụ khác về: **setInterval(callback, delay[, ...args])**

setInterval sẽ lặp đi lặp lại function callback sau mỗi *delay* ms, nó sẽ lặp vô hạn trừ khi chúng ta để điều kiện dừng cho nó.

Nếu giá trị *delay* lớn hơn *2147483647*  hoặc nhỏ hơn *1* thì *delay* sẽ được set là 1. Nếu chúng ta truyền vào giá trị không phải số nguyên (50/3 = 16.66666666) thì giá trị sẽ được đưa về integer (16).

Nếu callback không phải là function thì lỗi `TypeError` sẽ được throw

```
var time = 0;

setInterval(function() {
  time +=2;
  console.log(time + ' sec have passed');
}, 2000);
```

Đoạn code sau đây sẽ in ra console mỗi 2 giây trôi qua cho đến khi ta ép dừng nó (Ctrl + C) , để có thể đặt điều kiện dừng cho nó ta có thể sử dụng một Global Object khác đó là **clearInterval**

```
var time = 0;
var timer = setInterval(function() {
  if (timer > 10) {
    clearInterval(timer);
  }
  time +=2;
  console.log(time + ' sec have passed');  
}, 2000);
```

2 Global Object khá quan trọng và cũng khá quen thuộc khác đó là __dirname (tương tự như `path.dirname()` ) và __filename

```
console.log('Folder Name: ' + __dirname);

console.log('File Name: ' + __filename);
```

![](https://images.viblo.asia/17cb965e-5a7b-41f9-a142-71955844ceb2.png)


Nguồn: Udemy Course - Nodejs For Absolute Beginer - Yogesh Patel