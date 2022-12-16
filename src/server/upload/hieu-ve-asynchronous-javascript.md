JavaScript là một ngôn ngữ lập trình đơn luồng có nghĩa là chỉ có một điều có thể xảy ra tại một thời điểm. Tức là, JavaScript engine chỉ có thể xử lý một câu lệnh tại một thời điểm trong một luồng duy nhất.

Mặc dù ngôn ngữ đơn luồng đơn giản hóa việc viết code do bạn không cần lo lắng về các vấn đề tương tranh, điều này cũng có nghĩa là bạn không thể thực hiện các tác vụ dài như truy cập mạng mà không chặn luồng chính.

Hãy tưởng tượng bạn request dữ liệu từ một API. Tùy thuộc vào tình hình máy chủ có thể mất một thời gian để xử lý request trong khi chặn luồng chính làm cho trang web không hồi đáp.

Đó là lý do asynchronous JavaScript xuất hiện. Sử dụng asynchronous JavaScript (callbacks, promises, and async/await) bạn có thể thực hiện các request network dài mà không chặn luồng chính.
## Synchronous JavaScript hoại động như thế nào?
Trước khi đi sâu vào asynchronous JavaScript, ta cần hiểu cách mà synchronous JavaScript code được thực thi trong JavaScript engine. Ví dụ:
```
const second = () => {
  console.log('Hello there!');
}
const first = () => {
  console.log('Hi there!');
  second();
  console.log('The End');
}
first();
```
Để hiểu đoạn code trên được thực thi như thế nào trong JavaScript engine, chúng ta phải hiểu khái niệm về `execution context` và `call stack`.
### Execution Context
`Execution Context` là một khái niệm trừu tượng về môi trường nơi JavaScript code được đánh giá và thực hiện. Bất cứ khi nào code được thực thi trong JavaScript, nó chạy trong một `execution context`.

Code cục bộ thực thi trong một `execution context` cục bộ, và code toàn cục thực hiện trong một `execution context` toàn cục. Mỗi hàm có một `execution context` riêng của nó.
### Call Stack
`call stack` như tên gọi của nó là một ngăn xếp với cấu trúc LIFO được sử dụng để lưu trữ tất cả các `execution context` được tạo ra trong quá trình thực thi code.

JavaScript có một ngăn xếp duy nhất vì nó là một ngôn ngữ lập trình đơn luồng. `Call Stack` có cấu trúc LIFO nghĩa là các mục chỉ có thể được thêm hoặc xóa khỏi đầu ngăn xếp.

Hãy quay lại đoạn mã trên và tìm hiểu cách code được thực thi bên trong JavaScript engine.
![](https://images.viblo.asia/e6a202c0-2dbc-4ec0-af91-0fc89500fb72.png)
### Vậy điều gì đang xảy ra ở đây?
Khi đoạn code này được thực thi, một `execution context` toàn cục được tạo ra (biểu diễn bằng hàm `main()`) và được đẩy vào đầu ngăn xếp. Khi hàm `first()` được gọi, nó được đẩy vào đầu ngăn xếp.

Tiếp theo, `console.log('Hi there!')` được đẩy vào đầu ngăn xếp, khi kết thúc, nó được lấy ra từ ngăn xếp. Sau đó hàm `second()` được gọi và nó được đẩy vào đầu của ngăn xếp. 

`console.log('Hello there!')`  được đẩy vào đầu ngăn xếp là lấy ra khi nó kết thúc. Hàm `second` kết thúc, do đó nó được lấy ra khỏi ngăn xếp.

`console.log(‘The End’)` được đẩy vào đầu của ngăn xếp và xóa đi khi nó kết thúc. Sau đó, hàm `first` kết thúc và nó được lấy ra khỏi ngăn xếp.

Chương trình thực hiện xong ở đây và `execution context` toàn cục (`main()`) được lấy ra khỏi ngăn xếp.

Đến đây ta đã có ý tưởng cơ bản về `call stack` và JavaScript  đồng bộ hoạt động như thế nào, hãy quay trở lại với JavaScript bất đồng bộ.
### Blocking là gì?
Giả sử ta đang xử lý hình ảnh hay thực hiện network request theo cách đồng bộ:
```
const processImage = (image) => {
  /**
  * doing some operations on image
  **/
  console.log('Image processed');
}
const networkRequest = (url) => {
  /**
  * requesting network resource
  **/
  return someData;
}
const greeting = () => {
  console.log('Hello World');
}
processImage(logo.jpg);
networkRequest('www.somerandomurl.com');
greeting();
```
Việc xử lý hình ảnh và network request cần có thời gian. Vì vậy, khi hàm `processImage()` được gọi, sẽ mất một chút thời gian tùy thuộc vào kích thước của hình ảnh.

Khi hàm `processImage()` hoàn thành, nó sẽ bị xóa khỏi ngăn xếp, sau đó hàm `networkRequest()` được gọi và được đẩy vào ngăn xếp, một lần nữa cũng sẽ mất một thời gian để nó thực thi xong.

Cuối cùng khi hàm `networkRequest()` hoàn thành, hàm `greeting()` được gọi và nó chỉ thực thi một câu lệnh `console.log` và các câu lệnh `console.log` nói chung là nhanh, do đó hàm `greeting()` thực hiện xong ngay lập tức và kết thúc.

Như đã thấy, chúng ta phải chờ các hàm `processImage()` và `networkRequest()` kết thúc. Điều này có nghĩa là các hàm này đang chặn `call stack` hay luồng chính. Do đó chúng ta không thể thực hiện hoạt động khác khi code trên đang thực hiện.
### Vậy giải pháp là gì?
Giải pháp đơn giản nhất là `callbacks` không đồng bộ. Ta sử dụng `callbacks` không đồng bộ để làm cho code trở thành `non-blocking`. Ví dụ:
```
const networkRequest = () => {
  setTimeout(() => {
    console.log('Async Code');
  }, 2000);
};
console.log('Hello World');
networkRequest();
```
Ở đây, phương thức `setTimeout` được sử dụng để mô phỏng network request. Cần nhớ rằng `setTimeout` không phải là một phần của Javascript engine. Nó là một phần của web APIs và C/C++ APIs.

Để hiểu đoạn code này được thực thi như thế nào, chúng ta cần hiểu một vài khái niệm khác như `event loop` và `callback queue` (hay `message queue`)

![](https://images.viblo.asia/97f2b2fc-d251-489e-ab2e-f799a0803931.png)

`event loop`, web APIs và `message queue` không phải là một phần của JavaScript engine, nó là một phần của môi trường thực thi Javascript của browser hay môi trường thực thi Nodejs JavaScript (trong trường hợp Nodejs). Trong Nodejs, web APIs được thay thế bởi C/C++ APIs.

Bây giờ hãy trở lại với đoạn code trên và xem xét nó được thực thi như thế nào theo cách bất đồng bộ.
```
const networkRequest = () => {
  setTimeout(() => {
    console.log('Async Code');
  }, 2000);
};
console.log('Hello World');
networkRequest();
console.log('The End');
```
![](https://images.viblo.asia/d6668078-23db-42d3-b311-ea0a97dbd6e6.gif)

Khi đoạn code trên được load vào trình duyệt, `console.log(‘Hello World’)` được đẩy vào ngăn xếp và lấy ra khi nó kết thúc. Tiếp theo, hàm `networkRequest()` được gọi và nó được đẩy vào đầu ngăn xếp. 

Tiếp theo, hàm `setTimeout()` được gọi, nó được đẩy vào đầu ngăn xếp. Hàm` setTimeout()` có hai tham số 1) callback và 2) thời gian với đơn vị mili giây.

Hàm `setTimeout()` bắt đầu hẹn giờ 2s trong môi trường web APIs. Tại thời điểm này, `setTimeout()` kết thúc và được lấy ra khỏi ngăn xếp. Sau đó `console.log('The End')` được đẩy vào ngăn xếp, thực thi và xóa khỏi ngăn xếp sau khi nó hoàn tất. 

Trong khi đó, bộ hẹn giờ đến hạn và `callback` được đẩy vào `message queue`. Nhưng `callback` không được thực hiện ngay lập tức và đó là nơi `event loop` được khởi động.
### Event Loop
Công việc của `event loop` là nhìn vào `call stack` và xác định xem `call stack` có trống hay không. Nếu `call stack` trống, nó sẽ nhìn vào `mesage queue` để xem có bất kỳ `callback` nào đang chờ xử lý để thực hiện nó.

Trong trường hợp này, `message queue` có chứa 1 `callback` còn `call stack` thì trống rỗng. Do đó `event loop` đẩy `callback` vào đầu ngăn xếp.

`console.log(‘Async Code’)` được đẩy vào đầu ngăn xếp, thực thi và lấy ra khỏi ngăn xếp. Tại đây, `callback` kết thúc và được lấy ra khỏi ngăn xếp và chương trình kết thúc.

Message queue cũng chứa các `callback` từ các sự kiện DOM như sự kiện click và sự kiện keyboard. Ví dụ:
```
document.querySelector('.btn').addEventListener('click',(event) => {
  console.log('Button Clicked');
});
```
Trong trường hợp sự kiện DOM, trình lắng nghe sự kiện đặt ở môi trường web APIs chờ một sự kiện cụ thể xảy ra. Và khi nó xảy ra, hàm `callback` được đặt vào `message queue` và chờ được thực thi.
Một lần nữa `event loop` sẽ kiểm tra xem `call stack` có trống không và đẩy `callback` vào ngăn xếp nếu nó trống và `callback` được thực thi.
### Trì hoãn thực thi hàm
Chúng ta cũng có thể sử dụng `setTimeout` để trì hoãn việc thực thi hàm cho đến khi ngăn xếp trống. Ví dụ:
```
const bar = () => {
  console.log('bar');
}
const baz = () => {
  console.log('baz');
}
const foo = () => {
  console.log('foo');
  setTimeout(bar, 0);
  baz();
}
foo();
```
Kết quả là:
```
foo
baz
bar
```
Khi code này chạy, đầu tiên `foo ()` được gọi, bên trong `foo` chúng ta gọi `console.log ('foo')`, sau đó `setTimeout ()` được gọi với `bar ()` là `callback` và bộ đếm thời gian 0 giây.

Bây giờ nếu chúng ta không sử dụng `setTimeout`, hàm `bar ()` sẽ được thực hiện ngay lập tức, nhưng việc sử dụng `setTimeout` với bộ đếm thời gian 0 giây giúp trì hoãn việc thực hiện `bar()` cho đến khi ngăn xếp trống.

Sau 0 giây, `callback` `bar ()` được đưa vào `message queue` đang đợi để được thực thi. Nhưng nó sẽ chỉ được thực hiện khi ngăn xếp hoàn toàn trống rỗng sau khi hàm `baz` và `foo` kết thúc.
### ES6 Job Queue
Chúng ta đã học được cách các `callback` không đồng bộ và các sự kiện DOM được thực thi, sử dụng `message queue` để lưu trữ tất cả các `callback` chờ đợi để được thực thi.

ES6 giới thiệu khái niệm về `job queue` được sử dụng bởi `Promises` trong JavaScript. Sự khác biệt giữa `message queue` và `job queue` là `job queue` có mức ưu tiên cao hơn `message queue`, có nghĩa là các `promise job` bên trong `job queue` sẽ được thực thi trước các `callback` bên trong `message queue`.

Ví dụ:
```
const bar = () => {
  console.log('bar');
};
const baz = () => {
  console.log('baz');
};
const foo = () => {
  console.log('foo');
  setTimeout(bar, 0);
  new Promise((resolve, reject) => {
    resolve('Promise resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
  baz();
};
foo();
```
Kết quả là:
```
foo
baz
Promised resolved
bar
```
Chúng ta có thể thấy rằng `promise` được thực hiện trước `setTimeout`, bởi vì `promise response` được lưu trữ bên trong `job queue` có mức độ ưu tiên cao hơn `message queue`.
## Kết luận
Chúng ta đã học được cách JavaScript không đồng bộ hoạt động và các khái niệm khác như `call stack`, `event loop`, `message queue` và `job queue` cùng nhau tạo ra môi trường chạy JavaScript. Mặc dù bạn không cần phải tìm hiểu tất cả các khái niệm này để trở thành một JavaScript developer tuyệt vời nhưng sẽ rất hữu ích khi biết các khái niệm này.
## Tham khảo
[https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)