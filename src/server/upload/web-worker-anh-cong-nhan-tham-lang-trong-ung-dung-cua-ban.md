Như mọi người cũng đã biết thì Javascript là một ngôn ngữ đơn luồng, các đoạn code hầu như không thể chạy song song. Một website có đến hàng tá các chức năng, thao tác cần phải thực hiện, khi ứng dụng của bạn đang xử lý một đoạn code, thì bạn không thể làm gì khác ngoài cách ngồi đợi nó xử lý. 

Thế nên là các lập trình viên thường sử dụng bất đồng bộ như `setTimeout`, `setInterval` hay `XMLHttpRequest`. Ví dụ đơn giản khi chúng ta sử dụng AJAX cần chuyền vào một callback để thực thi code sau khi có response, nếu như việc xử lý đơn giản, không phức tạp, tốn ít thời gian thì sẽ không có chuyện gì xảy ra. Thế nhưng nếu việc xử lý tốn nhiều thời gian ngốn nhiều CPU thì rất dễ xảy ra việc crash app, đối với người dùng thì đây quả là một trải nghiệm không hề vui vẻ

Trong bài này mình sẽ giới thiệu cho các bạn một Web APIs để thực hiện multi-threading task khá tốt đó chính là **Web Worker**.

# Web Worker 
## 1. Web Worker là gì ?
Web Worker là một đối tượng trong Javascript được tạo ra bởi các hàm contructor như `Worker`, `SharedWorker`... với tham số được truyền vào là một file JS chứa các đoạn code sẽ được thực thi bởi Worker. Các script được viết trong file này sẽ được thực thi ngầm, không ảnh hưởng đến trải nghiệm của người dùng. Vì vậy với các tác vụ tốn nhiều thời gian các bạn có thể dùng Worker để xử lý.

![](https://images.viblo.asia/55d8dc61-1b9e-4e9a-96b8-b143097d9878.png)

Đây là một kiến trúc hoạt động cơ bản của Worker với 2 luồng chính đó là **main thread** (main.js) và **worker**(worker.js). Nhìn trong ảnh chúng ta có thể hình dung được cơ chế hoạt động qua lại giữa hai luồng là đều có thể trao đổi thông tin với nhau.

Ví dụ việc gọi API ban đầu tốn nhiều thời gian **main thread** có thể chuyển xuống cho **worker** xử lý, sau khi xử lý xong thì chuyển lại dữ liệu cho **main.js**.

Cả main thread và worker đều giao tiếp vào gửi dữ liệu cho nhau thông qua hàm **postMessage()**, và sử dụng hàm **onmessage()** để lắng nghe dữ liệu được gửi tới. Dữ liệu được gửi qua lại giữa hai tiến trình này là một bản sao chép.

> Web Worker không phải của Javascript, mà đây là một tính năng của trình duyệt cho phép chúng ta truy xuất qua Javascript

## 2. Dedicated workers
**Dedicated workers** chỉ có thể truy cập bởi đoạn script gọi đến nó.

Để kiểm tra trình duyệt của chúng ta hỗ trợ Web Worker hay không sử dụng
```javascript
if (window.Worker) {
    ....
}
```

### Khởi tạo một Worker
Để khởi tạo mội Web Worker rất đơn giản, chỉ cần sử dụng `Worker constructor()`, truyền bên trong constructor này là một đường dẫn tới file xử lý ngầm bởi Worker
```javascript
var myWorker = new Worker('my-worker.js');
```

### Gửi và nhận message trong Web Worker
Như mình có nói ở trên Worker và main thread sẽ giao tiếp với nhau thông qua hai hàm chính là **postMessage()** và **onmessage()**. Cả main thread và Worker đều nhận thông tin thông qua sự kiện **onmessage()** và truy cập dự liệu thông qua **event.data**.

Ví dụ

```html:index.html
<button onclick="startWorker()">Start Worker</button>
<button onclick="stopWorker()">Stop Worker</button>
```
```javascript:main.js
const worker = new Worker("worker.js");

// gửi dữ liệu đến Worker xử lý
worker.postMessage("Tin nhắn này gửi đến worker")

//nhận tin nhắn từ Worker
worker.onmessage = function(e) {
    console.log(e.data); // Tin nhắn này gửi đến main thread
}
```
Khi gửi message đến Worker, để nhận được dữ liệu sử dụng sự kiện **onmessage** để lắng nghe
```javascript:worker.js
self.onmessage = function (e) {
    console.log(e.data); // Tin nhắn này gửi đến worker
    // gửi tin nhắn sang main thread
    self.postMessage("Tin nhắn này gửi đến main thread");
}
```

Trong `onmessage handler` cho phép chúng ta xử lý dữ liệu nhận được từ `main thread` mà không làm ảnh hưởng tới giá trị tại `main thread` vì dữ liệu được nhận là bản sao chép chứ không phải dữ liệu gốc.

> Trong thread chính `onmessage` và `postMessage` cần phải được gọi bởi worker tương ứng, còn trong worker không cần phải khai báo rõ ràng chỉ cần gọi thông qua từ khóa `this` hoặc `self` là được vì trong một thread có thể có nhiều worker, nhưng một worker chỉ có thể quản lý bới một thread 

### Ngừng Worker đang được thực thi
Nếu muốn dừng một Worker đang chạy chúng ta có 2 cách
* Sử dụng phương thức `terminate()` trên thực thể Worker
* Sử dụng phương thưc `close()` bên trong file Worker

```javascript:main.js
worker.terminate();
```
hoặc
```javascript:worker.js
self.close()
```
### Xử lý ngoại lệ
Khi code việc xử lý ngoại lệ là không thể thiếu và Web Worker cũng vậy. Trong quá trình chạy worker nếu có lỗi xảy ra `onerror` handler sẽ được gọi tới thông qua sự kiện `error`.
```javascript:main.js
worker.addEventListener('error', function (e) {
    console.log(e)
}, false)
```
Event error cung cấp cho chúng ta một vài thuộc tính để xác định được thông tin lỗi khá hữu ích
* **message**: mô tả chi tiết của lỗi
* **filename** : file xảy ra lỗi
* **lineno**: dòng xảy ra lỗi

### Import script và libraries
Bên trong các file Worker cho phép chúng ta import thêm các file script hoặc các libraries thông qua hàm `importScripts`

```javascript:worker.js
importScripts('foo.js');                 /* imports file "foo.js" */
importScripts('foo.js', 'bar.js');       /* imports nhiều file */
```

Sau khi import, trình duyệt sẽ load từng file một và thực hiện các đoạn code bên trong script đó, nếu một script không được load thì sẽ sinh ra một exception là `NETWORK_ERROR` => các đoạn code phía dưới sẽ không được thực thi.

> Web Worker sẽ không hoạt động nếu chúng ta truy cập trực tiếp các web page từ filesystem, nếu muốn sử dụng worker thì cần có một server để chạy nó nhé các pạn

## 3. Shared Worker
Khác với **Dedicated Worker** thì **Shared Worker** có thể được truy cập từ nhiều đoạn script nào đó miễn là trong cùng một domain hay là cùng protocol, port, host.

###  Khởi tạo một Shared Worker
Tạo một `Shared Worker` cũng đơn giản như tạo một `Worker` bình thường chỉ khác là chúng ta sẽ sử dụng `Shared Worker object` thay vì `Worker object`
```javascript
var worker = new SharedWorker("worker.js");
```

###  Tương tác với một Shared Worker
Bất cứ một file script nào trong cùng một domain đều có thể gọi tới Shared Worker thông qua [MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) object được tạo bởi thuộc tính `port` thuộc `SharedWorker interface`. 

Việc gửi và nhận message từ các file script khác tới `Shared Worker` phức tạp hơn một chút khi chúng cần thông qua object `port`.
```javascript:main.js
var worker = new SharedWorker("worker.js");

// lắng nghe message được truyền đến
worker.port.addEventListener("message", function(e) {
	alert(e.data);
}, false);

// Gửi message 
worker.port.postMessage("Tin nhắn này được gửi đến shared worker");
```

Để lắng nghe được message được gửi đến từ `main thread` thì ở file `shared worker` cần phải sử dụng `onconnect handler` để kết nối với `port`. Các ports được kết nói với `worker` được truy cập thông qua thuộc tính `ports`.

`onconnect` sẽ được kích hoạt khi kết nối được mở giữa `Shared Worker` và `main thread` qua `MessagePort` object. Sau đó các công việc khác như lắng nghe và gửi message trở lại cho main thread cũng giống như cách chúng ta làm với `Dedicated Worker`.

```worker.js
onconnect = function(e) {
  var port = e.ports[0];

  port.addEventListener('message', function(e) {
    var workerResult = 'Result: ' + e.data;
    port.postMessage('Tin nhắn từ shared worker tới main thread');
  });

  port.start(); // Required when using addEventListener
}
```
 Nếu sử dụng `addEventListener` để lắng nghe `message` event thì cần phải thêm `port.start()` ở cuối bên trong `onconnect` event.
 
 
##  4. Kết luận
**Donate cho tác giả**: https://www.buymeacoffee.com/imphunq

Trên đây là những chia sẻ của mình về Web Worker, nếu trong bài có nhầm lẫn hay có gì chưa hiểu thì các bạn hãy comment phía dưới để chúng ta cùng trao đổi kiến thức nhé.

Nếu bài viết hữu ích hãy tặng mình 1 like, 1 clip và 1 subcribe nhé :rofl::kissing_heart::kissing_heart::kissing_heart: