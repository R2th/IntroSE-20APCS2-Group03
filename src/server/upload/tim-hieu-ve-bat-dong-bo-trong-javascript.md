JavaScript là ngôn ngữ lập trình đơn luồng, có nghĩa là engine của JavaScript chỉ có thể xử lý một câu lệnh tại một thời điểm. Mặc dù ngôn ngữ đơn luồng giúp đơn giản hoá việc viết code bởi vì bạn không phải quan tâm về các vấn đề xử lý đa luồng, nhưng điều đó cũng có nghĩa là bạn không thể thực hiện các tác vụ tốn thời gian (như request dữ liệu từ API) mà không block luồng chính (làm cho app của bạn cảm giác như bị đơ, ảnh hưởng đến trải nghiệm người dùng).

Đó là lí do JavaScript sinh ra tính năng bất đồng bộ, sử dụng bất đồng bộ (callbacks, promises, và async/await), bạn có thể thực hiện các tác vụ chiếm nhiều thời gian mà không ảnh hưởng tới luồng chính.

Dù học nhũng kiến thức này không cần thiết lắm nhưng nếu biết cũng có thể có ích đôi chút. Hãy cùng tìm hiểu nhé :)

## JavaScript đồng bộ hoạt động như thể nào?
Để hiểu được cách JavaScript bất đồng bộ hoạt động thì cách tốt nhất là so sánh với Javascript đồng bộ hoạt động:
```javascript
// javscript đồng bộ
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
Đầu tiên, chúng ta cần phải biết thêm về khái niệm **execution context** và **call stack** (hay **execution stack**).

## Execution Context
Có thể hiều một cách trừu tượng, **execution context** của môi trường mà JavaScript code được thực thi. Bất cứ đoạn code nào chạy trong JavaScript, nó phải chạy trong một **execution context** nào đó.

Các function code thực thi trong một **function execution context** , và global code thực thi trong **global execution context**. Mỗi function có một **execution context** riêng của nó

## Call Stack
Như cái tên ngụ ý, **call stack** là một stack với cấu trúc LIFO (Last in, First out), dùng để lưu trữ tất cả các **execution context** được tạo trong quá trình thực thi code.

JavaScript chỉ có duy nhất một call stack bởi nó là ngôn ngữ lập trình đơn luồng. **Call stack** có cấu trúc LIFO, có nghĩa là các context chỉ có thể thêm vào hoặc lấy ra từ node đầu tiên của stack.

Bây giờ hãy nhìn lại đoạn code trên và cùng hình dung thứ tự Javascript engine xử lý các đoạn code:

![](https://images.viblo.asia/1c9332f8-c320-4714-a4a7-63e9a1ca8e0c.png)


Khi code được thực thi, **global execuion context** được tạo (đại diện bởi hàm `main`) và đẩy lên đầu **call stack**. Sau đó đến lượt hàm  `first` khi nó được chạy tới.

Tiếp theo, `console.log('Hi there!')` được đẩy vào stack, thực thi ngay lập tức và được lấy ra khỏi stack. Tiếp đó là hàm `second` được đẩy vào stack.

Cứ như vậy cho đến khi không còn gì để đẩy vào stack, và thời điểm **global execution context** (hàm `main`) được lấy ra khỏi stack thì cũng là lúc chương trình kết thúc.
## JavaScript bất đồng bộ hoạt động như thế nào?
Bây giờ chúng ta đã nắm được cơ bản về **call stack** và cách Javascript đồng bộ hoạt động. Nhược điểm của nó là tạo ra các **blocking**. Vậy **blocking** là gì

Giả sử chúng ta đang thực hiện công việc xử lý ảnh hoặc request dữ liệu theo cách đồng bộ. Ví dụ:
```javascript
// JavaScript đồng bộ
const processImage = (image) => {
  /**
  * Thực hiện xử lý ảnh
  **/
  console.log('Image processed');
}
const networkRequest = (url) => {
  /**
  * Thực hiện network request
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

Thực thi xử lý ảnh hay request dữ liệu thường sẽ tốn nhiều thời gian, hàm `processImage` thì phụ thuộc kích cỡ ảnh còn hàm `networkRequest`  thì phụ thuộc vào tốc độ mạng. Và có thể thấy rằng hàm `greeting` sẽ phải chờ tới khi các hàm trên hoàn thành mặc dù nó không phụ thuộc vào chúng. Hiểu khái quát hơn thì những hàm này sẽ block **call stack** dẫn đến không thể xử lý các việc khác trong khi đoạn code trên đang thực thi, và lãng phí thời gian.

Đó là lí do JavaScript bất đồng bộ ra đời. Trong trường hợp trên chúng ta sẽ sử dụng asynchronous callback để làm cho code trở nên non-blocking:
```javascript
const networkRequest = () => {
    setTimeout(() => {
        console.log('Async Code');
    }, 2000);
};

console.log('Hello World');

networkRequest();

console.log('The End');
```
Ở đây chúng ta đã sử dụng hàm `setTimeout` để giả lập network request. Hãy nhớ rằng `setTimeout` không phải là một phần của JavaScript engine, nó là một phần của cái gọi là web API (trong trình duyệt) và C/C++ API (trong node.js).

Để hiểu cách hoạt động của đoạn code trên, chúng ta  phải hiểu thêm một chút về các khái niệm **event loop** và **message queue** (còn được biết đến là **task queue** hay **callback queue**).

![](https://images.viblo.asia/92a55e3e-4b3c-4a4b-bc62-754b616fd097.gif)

Khi trình duyệt chạy đoạn code trên, `console.log('Hello World')` được đẩy vào stack và lấy ra khỏi stack khi nó hoàn thành. Sau đó là đến lượt hàm `networkRequest`, 

Trong hàm `networkRequest` lại gọi tới hàm `setTimeout`, đưa lên đầu stack. `setTimeout` có 2 tham số: 1) callback và 2) thời gian (ms).

`setTimeout` tạo một hẹn giờ 2s trong môi trường web API. Tại thời điểm này, `setTimeout` đã hoàn thành và được lấy ra khỏi stack. Luồng chạy lại tiếp tục với lệnh `console.log('The End')` cho đến khi hẹn giờ kết thúc, callback mà được truyền váo `setTimeout` được đẩy vào **message queue** (có thể hiểu là một hàng đợi các hàm cần thực thi) nhưng không được thực thi ngay lập tức. Đây cũng là lúc **event loop** tham gia vào luồng chạy.

Nhiệm vụ của **event loop** là kiểm tra **call stack** và xác định xem nó có node nào hay không. Nếu không, nó sẽ quay sang **message queue** để xem có callback nào đang chờ được thực thi. Tiếp tục trong ví dụ, **message queue** đang chứa một callback và **call stack** đang trống. Vậy nên **event loop** đẩy callback lên đầu stack, cụ thể là lệnh `console.log('Async Code')`, cũng thực thi và kết thúc và chương trình đã kết thúc hoàn toàn

**Message queue** cũng bao gồm các callback đến từ **DOM events**, là các sự kiện click chuột, ấn phím,... Ví dụ:
```javascript
document.querySelector('.btn').addEventListener('click',(event) => {
  console.log('Button Clicked');
});
```
Tương tự như trên, mỗi khi có sự kiện xảy ra (ở ví dụ trên là sự kiện click), callback cũng sẽ được đưa vào **message queue** để chờ được thực thi. Ngoài ra JavaScript phiên bản ES6 còn giới thiệu khái niệm **job queue** / **micro-task queue** mà Promise sử dụng. Sự khác biệt giữa **message queue** và **job queue** là độ ưu tiên, promise job trong **job queue** sẽ được thực thi trước các callback trong **message queue**. Ví dụ:
```javascript
console.log('Script start');
setTimeout(() => {
  console.log('setTimeout');
}, 0);
new Promise((resolve, reject) => {
    resolve('Promise resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
console.log('Script End');
```

Kết quả:
```
Script start
Script End
Promise resolved
setTimeout
```
Có thể thấy `promise` chạy trước `setTimeout`, bởi vì promise được lưu trong **job queue** có độ ưu tiên cao hơn **message queue**. Cùng xét một ví dụ khác với 2 `promise` và 2 `setTimeout`
```javascript
console.log('Script start');
setTimeout(() => {
  console.log('setTimeout 1');
}, 0);
setTimeout(() => {
  console.log('setTimeout 2');
}, 0);
new Promise((resolve, reject) => {
    resolve('Promise 1 resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
new Promise((resolve, reject) => {
    resolve('Promise 2 resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
console.log('Script End');
```

Kết quả:
```
Script start
Script End
Promise 1 resolved
Promise 2 resolved
setTimeout 1
setTimeout 2
```
Các `promise` sẽ luôn chạy trước các `callback`. Một trường hợp nữa là khi **event loop** đang thực thi các promise trong **job queue**  mà lại có một `promise` mới, nó cũng sẽ có độ ưu tiên cao hơn các `callback` trong **message queue**.
```javascript
console.log('Script start');
setTimeout(() => {
  console.log('setTimeout');
}, 0);
new Promise((resolve, reject) => {
    resolve('Promise 1 resolved');
  }).then(res => console.log(res));
new Promise((resolve, reject) => {
  resolve('Promise 2 resolved');
  }).then(res => {
       console.log(res);
       return new Promise((resolve, reject) => {
         resolve('Promise 3 resolved');
       })
     }).then(res => console.log(res));
console.log('Script End');
```

Kết quả:
```
Script start
Script End
Promise 1 resolved
Promise 2 resolved
Promise 3 resolved
setTimeout
```

Vậy là chúng ta đã tìm hiểu cách hoạt động của JavaScript bất đồng bộ và một vài khái niệm liên quan như **call stack**, **event loop**, **message queue**, **job queue**. Hi vọng bài viết sẽ giúp ích cho bạn ^^.

## Tham khảo
https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff