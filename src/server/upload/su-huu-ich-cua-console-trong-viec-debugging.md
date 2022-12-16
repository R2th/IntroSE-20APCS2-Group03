Trong quá trình coding ắt hẳn chúng ta không ít lần cần đến sự hỗ trợ của console để debugging.
Một trong những lệnh hữu ích nhất và phổ biết nhất mà bất kì một lập trình viên nào cũng biết đến là `console.log()`.Có thể nó không phải là cách làm tối ưu nhất nhưng tại sao chúng ta không thử khám phá chúng?
Trong bài viết này mình sẽ chia một số phương thức hữu hiệu với `console` với hy vọng sẽ giúp ích ít nhiều cho các bạn trong quá trình debugging.

## console.log()
Chắc hẳn các bạn đã quá quen thuộc với nó rồi nhỉ. Đây là phương pháp được sử dụng nhiều nhất hay còn được gọi là câu lệnh huyền thoại dành cho việc debug `Javascript`.
Ví dụ chúng ta có 1 object và 1 string:
```
var myObject = { item1: 'hello', item2: 'world' };
var myString = "Hello world !!!";

console.log('myObject', myObject);
console.log('myString', myString);
```
Khi hiển thị console nó sẽ như sau:
![](https://images.viblo.asia/ba03c272-fa3a-4669-9938-47e6b37e8ee2.png)

## console.count()
Khi dùng tới Console.count() thì đầu ra sẽ là số lần nó được gọi với label của nó.
Ta có một function sau:
```
function sayHello(name) {
  console.count(name)
}

sayHello("Asia")
sayHello("Viblo")
sayHello("Sun*")
sayHello("Asia")
```
Điều này cho chúng ta đếm số lần chúng ta gọi hàm và nó sẽ đếm số lần của những hàm có name trùng nhau.
![](https://images.viblo.asia/53e8fdb8-2aaf-4de5-a1c5-1a52f4a9f51c.png)

## console.warn()
Phương pháp sau đây đưa ra một thông báo cảnh báo đến console. Nó hữu ích khi làm việc với các công cụ dành cho nhà phát triển hoặc API, console.warn() là lý tưởng để cho người dùng biết điều gì đó có thể không chính xác, chẳng hạn như bỏ qua một đối số hoặc cho nhà phát triển biết phiên bản API/package không dùng nữa.
```
console.warn("Nothing in here")
```
![](https://images.viblo.asia/6f358224-b25a-4167-8a8c-5b76d4b79895.png)

## console.table()
Một hàm rất hay mà bạn có lẽ sẽ sử dụng thường xuyên là console.table(). Như tên gọi của nó, hàm này cho phép hiển thị dữ liệu dưới dạng bảng. Không chỉ dùng cho các dữ liệu dạng bảng, console.table() còn có thể đọc các thuộc tính của đối tượng phức tạp để hiển thị. Tất nhiên không thể thiếu, bạn có thể nhấn vào tiêu đề của một cột để table sắp xếp dữ liệu theo cột đó.
```
var data = [
  { firstName: 'Demo', lastName: '1', role: 'DEV' },
  { firstName: 'Demo', lastName: '2', role: 'QA' },
  { firstName: 'Demo', lastName: '3', role: 'BRSE' },
  { firstName: 'Demo', lastName: '4', role: 'COMTOR' },
]

console.table(data);
```
![](https://images.viblo.asia/f339808d-4661-488c-825e-05bebfb322b5.png)

Ngoài ra, nếu chỉ cần xem một vài cột, bạn có thể thêm tùy chọn tên các cột cần hiển thị:
```
console.table(data, ['lastName', 'role']);
```
![](https://images.viblo.asia/4b30b4df-2b05-43d0-8e57-df0283722b79.png)

## console.group()
Khi làm việc với các tập hợp hoặc dữ liệu được liên kết, hãy sử dụng các nhóm lồng nhau để giúp tổ chức đầu ra của bạn bằng cách liên kết trực quan các thông báo liên quan. Để tạo một khối lồng nhau mới, hãy gọi console.group().
```
console.log("This is the first level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the first level");
```
![](https://images.viblo.asia/76e7fe63-92e5-47d0-af16-a8270a464319.png)

## console.dir()
Hiển thị dữ liệu theo dạng cây phân cấp, bạn có thể tương tác để xem các thuộc tính bên trong.
```
console.dir(document)
```
![](https://images.viblo.asia/29c9e148-6d57-46e7-ae96-8ba2454f40c3.png)

## console.time()
Một điều quan trọng trong lập trình là code cần chạy nhanh. `console.time()` giúp bạn biết được thời gian chạy của code.
`console.time()` bắt đầu đếm đồng hồ tính giờ khi được gọi và kết thúc khi gặp `console.timeEnd()`. Nó có thể chạy đến 10.000 đồng hồ đếm giờ đồng thời trên trang web đưa ra.
```
let i = 0;
console.time("While loop");
while (i < 1000000) {
  i++;
}
console.timeEnd("While loop");
console.time("For loop");
for (i = 0; i < 1000000; i++) {
  // For Loop
}
console.timeEnd("For loop");
```
![](https://images.viblo.asia/86695a78-2d2c-478a-828d-7c973047a004.png)

## Kết
Bên trên là một số câu lệnh `console` mà mình đã tìm hiểu được. Hi vọng nó sẽ giúp ích cho bạn trong việc debug javascript một cách dễ dàng hơn.

## Tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/Console