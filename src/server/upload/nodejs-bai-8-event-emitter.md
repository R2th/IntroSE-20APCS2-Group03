Trong Sub-Series JavaScript trước đó, chúng ta đã có một bài viết về chủ đề [Event & Listener](https://viblo.asia/p/RnB5pA0wKPG) và đã biết về hai kiểu sự kiện:

- Một là các sự kiện mô tả thao tác người dùng như `click`, `scroll`, v.v...
- Hai là các sự kiện được tạo ra bởi code phần mềm nhằm mục đích nào đó.

Và trong môi trường trình duyệt web, trong một sự kiện sẽ có sự tham gia của ba đối tượng:

Đầu tiên, là một object `EventTarget` - là đối tượng mà trình duyệt web sẽ gửi một sự kiện tới. Các object `EventTarget` được dựng sẵn trong môi trường trình duyệt web chính là các object `Element` mô tả các phần tử HTML. Ngoài ra thì chúng ta cũng có thể tạo ra các `class` mở rộng `EventTarget` để sử dụng nếu cần thiết.

Thứ hai, là một object `Event` - chứa thông tin mô tả về sự kiện đó, và sẽ được trình duyệt web hoặc code do chúng ta viết - gửi tới `EventTarget` bằng phương thức dựng sẵn `target.dispatch(event)`.

Thứ ba, là các object `EventListener` - thực ra là các hàm xử lý sự kiện mà chúng ta gắn vào các `EventTarget` bằng phương thức `target.addEventListener(eventName, listener)`. Các hàm này sẽ được kích hoạt bởi phương thức `.dispatch` ở trên và nhận được object `Event` để có thông tin mô tả thêm về sự kiện.

Và chủ đề mới của chúng ta đang hướng đến trong bài viết này, trên nền NodeJS, thực ra cũng không có gì mới mẻ so với những thứ mà chúng ta đã biết về `Event` trong lập trình nói chung.

## Một sự kiện trong NodeJS được phát động như thế nào?

Hoàn toàn tương đồng với cách mà một sự kiện được phát động trong môi trường web, một sự kiện trong môi trường NodeJS được phát động tại vị trí của một `object` khởi điểm. Tuy nhiên NodeJS không gọi `object` này là "mục tiêu gửi sự kiện tới" `EventTarget` mà thay vào đó lại gọi là "chủ thể phát động sự kiện" `EventEmitter`.

Khác biệt về cách đặt tên này có lẽ là vì khi sử dụng một `EventEmitter` để phát động một sự kiện, chúng ta không cần tạo ra một `object` mô tả sự kiện trước đó để gửi tới mà thay vào đó thì chỉ cần `.emit()` tên của sự kiện là đủ.

```emitter.js
const { EventEmitter } = require("events");

class Database
extends EventEmitter {
   constructor(...params) {
      super(...params)
      this.data = [];
   }

   insert(value) {
      this.data.push(value);
      this.emit("insert", value, this.data);
   }
} // Database

   /* --- Init Database */

var db = new Database();

   /* --- Add Listener */

db.on("insert", (value, data) => {
   console.log("- - - - - - - - -");
   console.log("Listener is activated");
   console.log(`Inserted: ${value}`);
   console.log(data);
});

   /* --- Insert Something */

db.insert(1001);
db.insert("Infinity");
```

```CMD|Terminal.io
node emitter.js

- - - - - - - - -
Listener is activated
Inserted: 1001
[ 1001 ]
- - - - - - - - -
Listener is activated
Inserted: Infinity
[ 1001, 'Infinity' ]
```

Ở đây tất cả các giá trị được truyền vào phương thức `.emit` theo sau tên sự kiện sẽ được truyền cho các hàm xử lý sự kiện `listener` theo đúng thứ tự xuất hiện, và không giới hạn về số lượng tham số mà chúng ta muốn sử dụng để tạo bề mặt giao tiếp giữa các `listener` và `emitter`.

## Các Emitter dựng sẵn

Giống với trong môi trường trình duyệt web, class `EventTarget` được sử dụng để tạo ra một phần giao diện lập trình của các object mô tả các phần tử HTML; Thì trong môi trường NodeJS, class `EventEmitter` được sử dụng để tạo ra một phần giao diện lập trình của các module và các class dựng sẵn khác.

Vì vậy nên khi nhìn vào tài liệu của một `module` bất kỳ, bạn sẽ luôn thấy có liệt kê tên của một vài kiểu sự kiện trong các class ngay ở phần `Table of Content` với cú pháp chung là `Event: 'tên-event'`. Và khi sử dụng các chức năng tiện ích do các class này cung cấp, chúng ta chỉ cần `.on()` để gắn các hàm xử lý sự kiện `listener` vào các `emitter` này với các tên sự kiện mô tả trong tài liệu.

## Quản lý các Listener

Ngoài phương thức `.on()`, thì các `emitter` còn được thiết kế với các phương thức quản lý các hàm xử lý sự kiện khác nữa. Ở đây mình sẽ liệt kê một vài liên kết về các phương thức quản lý các `listener` để bạn tiện tham khảo:

- [`emitter.on(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitteroneventname-listener) - gắn một hàm xử lý cho một sự kiện.
- [`emitter.once(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitteronceeventname-listener) - giống với `.on()` tuy nhiên hàm xử lý sự kiện ở đây sẽ chỉ được kích hoạt 1 lần duy nhất và được tách khỏi `emitter` ngay trước thời điểm kích hoạt.
- [`emitter.off(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitteroffeventname-listener) - tách một hàm xử lý sự kiện khỏi `emitter`.

Một số phương thức khác dành cho nhu cầu quản lý đa dạng hơn nếu bạn thiết kế logic xử lý của phần mềm mà bạn đang viết xoay quanh các sự kiện.

- [`emitter.eventNames`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emittereventnames) - Xem tên của tất cả các kiểu sự kiện đã được gắn vào `emitter`.
- [`emitter.listeners(eventName)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitterlistenerseventname) - Truy xuất tất cả các `listener` đã được gắn với tên sự kiện `eventName`.
- [`emitter.addListener(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitteraddlistenereventname-listener) - Tương tự với phương thức `.on()` ở trên. Hàm sử lý sự kiện mới sẽ được gắn vào cuối danh sách `listeners` tương ứng với `eventName`.
- [`emitter.prependListener(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitterprependlistenereventname-listener) - Tương tự với phương thức `.on()`. Nhưng hàm sử lý sự kiện mới sẽ được gắn vào đầu danh sách `listeners` tương ứng với `eventName`.
- [`emitter.prependOnceListener(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitterprependoncelistenereventname-listener) - Tương tự với phương thức `.once()` ở trên. Ồ... như vậy là các hàm xử lý sự kiện 1-lần sẽ luôn được gắn vào đầu danh sách `listeners` của mỗi kiểu `event`.
- [`emitter.removeListener(eventName, listener)`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitterremovelistenereventname-listener) - Tương tự với phương thức `.off()` ở trên.
- [`emitter.removeAllListeners([eventName])`](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#emitterremovealllistenerseventname) - Tách rời cả các `listener` đã được gắn với tên sự kiện `eventName` tương ứng.

## Event & EventTarget & NodeEventTarget

Trước đây thì NodeJS chỉ có duy nhất `EventEmitter` để hỗ trợ lập trình hướng sự kiện. Tuy nhiên ở các phiên bản gần đây thì NodeJS đã triển khai thêm các class [Event](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-event) và [EventTarget](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-eventtarget) để mô phỏng lại phương thức quản lý sự kiện mà các trình duyệt web sử dụng.

Và hơn thế nữa thì các class tại các module cũng đã được áp dụng một giao diện mở rộng của `EventTarget` có tên là [NodeEventTarget](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-nodeeventtarget) để tạo một phần giao diện lập trình. Do đó nên chúng ta sẽ có thể gặp một kiểu `Event` ở một class dựng sẵn nào đó mà khi `listener` được kích hoạt sẽ có một object mô tả `event` với rất nhiều thông tin chứ không chỉ có tên `eventName`.

Giao diện lập trình do `NodeEventTarget` cung cấp có các tên phương thức tương đồng với `EventEmitter` nhưng có số lượng phương thức ít hơn, và một số phương thức được mở rộng với các tham số tùy chọn `options` đóng gói trong một `object`.

Mặc dù ở thời điểm hiện tại thì `NodeEventTarget` vẫn chưa thể thay thế `EventEmitter`, tuy nhiên chúng ta vẫn cần tham khảo thông tin để có thể đọc và sử dụng code được dựng sẵn ở đâu đó. 

Chẳng hạn nếu như nhìn vào tài liệu của một `framework` NodeJS nào đó mà có một câu lệnh kiểu như `component.dispatch(event)` thì chúng ta cũng cần biết là `component` được áp dụng `NodeEventTarget`; Và phương thức `.dispatch()` sẽ tự động kích hoạt các hàm xử lý sự kiện, đồng thời chuyển tiếp object `event` cho các `listener`.

- [Tài liệu về class `Event` của NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-event)
- [Tài liệu về class `EventTarget` của NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-eventtarget)
- [Tài liệu về class `NodeEventTarget` của NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#class-nodeeventtarget)

## Kết thúc bài viết

Hiện tại thì chúng ta đã hoàn thành xong blog cá nhân đơn giản của Series này và đã chuyển tiếp sang Series App. Và bài viết này được thực hiện để chuẩn bị kiến thức cho tiến trình học tập của Series mới. Tuy nhiên nếu như bạn có ý tưởng nào đó với việc sử dụng Event trong code xử lý blog đã viết thì hãy mạnh dạn thử áp dụng nhé. :D Đặc biệt là ở những thao tác xử lý bất đồng bộ `async` sẽ có thể viết lại code theo lối tư duy khác.

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về cách tạo ra các tiến trình phụ trong môi trường NodeJS, giống như cách mà các thủ tục `async` được xử lý mặc định bởi môi trường. Đồng thời, điều này cũng sẽ mở ra một khả năng mới, giúp code của chúng ta có thêm cách tương tác với các phần mềm khác trong cùng thiết bị.

[[NodeJS] Bài 9 - Process & Child](https://viblo.asia/p/ORNZqArbZ0n)