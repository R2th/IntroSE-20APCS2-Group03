> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/12/20/html5-web-worker-truyen-du-lieu.html (đã xin phép tác giả :D)

Trong [bài viết trước](https://manhhomienbienthuy.bitbucket.io/2018/Nov/20/html5-web-worker-the-fundamentals.html), chúng ta đã tìm hiểu những điều cơ bản về web worker cùng cách sử dụng đơn giản của nó.  Trong bài viết này, chúng ta sẽ tìm hiểu sâu hơn về cơ ché truyền và nhận dữ liệu giữa thread chính của trang web và worker.

# Cơ bản về việc truyền và nhận dữ liệu

Dữ liệu được truyền và nhận giữa thread chính và worker theo phương pháp clone, chứ không truyền cùng một object.  Object được serialize sau đó được truyền cho worker, rồi lại deserialize lúc nhận được. Thread chính và worker không bao giờ sử dụng chung một instance, dữ liệu nhận được ở một bên luôn là bản sao của dữ liệu từ bên còn lại.

Phần lớn các trình duyệt đều cài đặt tính năng này bằng thuật toán [structured cloning](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).

Để minh hoạ cho quá trình này, chúng ta hãy xem xét một ví dụ như sau:

```javascript
const emulateMsg = (val) => {
    return eval(`(${JSON.stringify(val)})`);
}
```

Hàm `emulateMsg` mô phỏng hành vi của các tham số được truyền bằng cách clone chứ không phải giữ nguyên object cũ.  Chúng ta có thể test thử xem sao:

```javascript
val1 = new Number(10)
typeof val1 // "object"
typeof emulateMsg(val1) // "number"
val2 = true
typeof val2 // "boolean"
typeof emulateMsg(val2) // "boolean"
val3 = new String('foo')
typeof val3 // "object"
typeof emulateMsg(val3) // "string"
val4 = {foo: 'foo', bar: 'bar'}
typeof val4 // "object"
typeof emulateMsg(val4) // "object"
```

Như chúng ta đã biết, việc truyền và nhận dữ liệu từ thread chính và worker được thực hiện bằng cách truyền tham số vào hàm `postMessage` và giá trị của thuộc tính `data` trong `message` event.  Với cách truyền tham số bằng clone như trên, việc gửi và nhận dữ liệu của thread chính và worker cũng hoàn toàn là copy.

Đó cũng là lý do khiến cho dữ liệu truyền và nhận giữa worker được gọi là "message".  Thuật toán [structured cloning](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) có thể nhận dữ liệu dưới dạng JSON và cả những dữ liệu phức tạp khác nữa.

# Ví dụ

Nếu cần phải truyền dữ liệu phức tạp, mà dữ liệu đó được gọi ở nhiều nơi cả thread chính lẫn worker thì chúng ta có thể xây dựng một hệ thống gộp chung tất cả.

Trước hết, chúng ta tạo một class `QueryableWorker`, dùng để track các handler và giúp chúng ta giao tiếp với worker.

```javascript
class QueryableWorker {
    constructor(url, defaultHandler, errorHandler) {
        this.worker = new Worker(url);
        this.handlers = {};
        this.defaultHandler = defaultHandler || function(){};

        if (errorHandler) {
            this.worker.onerror = errorHandler;
        }

        this.worker.onmessage = (event) => {
            if (event.data instanceof Object &&
                event.data.hasOwnProperty('method') &&
                event.data.hasOwnProperty('arguments')) {
                    this.handlers[event.data.method].apply(this,
                        event.data.arguments);
            } else {
                this.defaultHandler.call(this, event.data);
            }
        }
    }

    postMessage(message) {
        this.worker.postMessage(message);
    }

    terminate() {
        this.worker.terminate();
    }

    addHandler(name, handler) {
        this.handlers[name] = handler;
    }

    removeHandler(name) {
        delete this.handlers[name];
    }

    sendQuery(...args) {
        if (args.length < 1 ) {
            throw new TypeError('at least 1 argument');
        }

        this.worker.postMessage({
            method: args[0],
            arguments: Array.prototype.slice.call(args, 1)
        })
    }
}
```

Trong class trên, chúng ta sử dụng hai phương thức để thêm và bớt các handler.

Các handler sẽ được thêm vào tuỳ ý sau khi tạo ra object thuộc class trên, cho phép nó có thể linh hoạt trong việc xử lý các phản hồi từ worker (xử lý thế nào hoàn toàn phụ thuộc vào handler được thêm vào).

Còn phương thức `sendQuery` đùng dể gửi dữ liệu đến worker (bao gồm tên phương thức và tham số), yêu cầu worker thực hiện thao tác tương ứng.

Với worker, để minh hoạ, chúng ta sẽ xây dựng worker thực hiện hai thao tác đơn giản: lấy một số ngẫu nhiên, tạm dừng 1 giây.

```javascript
const reply = (...args) => {
    if (args.length < 1 ) {
        throw new TypeError('at least 1 argument');
    }
    postMessage({
        method: args[0],
        arguments: Array.prototype.slice.call(args, 1)
    })
}

const queryableFunctions = {
    getRandom: () => {
        reply('printStuff', Math.random());
    },
    waitSomeTime: () => {
        setTimeout(() => {reply('doAlert', 1, 'seconds')}, 1000);
    }
}
```

Phương thức `onmessage` của worker rất đơn giản: gọi và thực thi các phương thức cùng tham số nhận được.  Code chỗ này tương tự như `onmessage` của thread chính, chỉ khác đó là nó sẽ gọi các hàm được định nghĩa sẵn chứ không phải handler được thêm vào sau.

```javascript
onmessage = (event) => {
    if (event.data instanceof Object &&
        event.data.hasOwnProperty('method') &&
        event.data.hasOwnProperty('arguments')) {
        queryableFunctions[event.data.method].apply(self,
            event.data.arguments)
    } else {
        // do something
    }
}
```

Demo cùng toàn bộ code của ví dụ này, mời các bạn xem [ở đây](https://manhhomienbienthuy.github.io/web-worker-sample/transfer/index.html).

# Tranferable

Structured cloning rất tuyệt vời, nhưng hoạt động của nó cũng là hành động copy dữ liệu mà thôi.  Trong một số trường hợp cần truyền dữ liệu với kích thước lớn, structured cloning lại khiến tốc độ bị chậm đi. Ví dụ, nếu chúng ta cần truyền một [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) khoảng vài chục MB chẳng hạn, sẽ phải mất kha khá thời gian (khoảng nửa giây).

Nửa giây nghe thì ít nhưng với các ứng dụng hiện nay, như vậy đã là một sự trễ giờ quá lớn.  Rất may, các trình duyệt hiện đại đã có một cơ chế trong trường hợp này, đó là [`Transferable`](https://developer.mozilla.org/en-US/docs/Web/API/Transferable) object.

Các object thuộc loại Tranferable sẽ được truyền mà không hề cần tới thao tác clone.  Điều đó sẽ khiến cho tốc độ tăng lên đáng kể.  Tuy nhiên, việc sử dụng cách truyền dữ liệu này cũng có những tác dụng phụ.  Không giống với cách thức truyền dữ liệu thông thường, dữ liệu truyền bằng cách này sẽ không còn truy cập được ở nơi đã truyền nó đi nữa.

Ví dụ, nếu chúng ta truyền một `ArrayBuffer` từ thread chính vào worker thì dữ liệu của `ArrayBuffer` đó ở thread chính sẽ bị xoá và không thể truy cập được nữa.  Có thể nói, toàn bộ dữ liệu đã được di chuyển hoàn toàn vào worker và không còn tồn tại ở chỗ cũ nữa.

Để truyền dữ liệu vào worker dạng `Transferable`, chúng ta cần truyền hai tham số cho hàm `postMessage`: tham số đầu tiền là message, tham số thứ hai là danh sách các item cần transfer.  Trong trường hợp này, chúng ta có thể truyền như sau:

```javascript
const uInt8Array = new Uint8Array(1024 * 1028 * 32); // 32 MB
for (let i = 0; i < uInt8Array.length; i++) {
    uInt8Array[i] = i;
}
worker.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
```

# So sánh tốc độ

Dưới đây là cấu hình máy tính dùng để so sánh tốc độ giữa cách truyền dữ liệu thông thường (structured cloning) và cách dùng `Transferable`.

![cau hinh](https://i.imgur.com/QB3W7FK.png)

Với máy tính như vậy, tôi sẽ thực hiện so sánh với các trình duyệt [Safari](https://www.apple.com/safari/), [Chrome](https://www.google.com/chrome/) và [Firefox](https://www.mozilla.org/en-US/firefox/new/).  Chúng ta sẽ so sánh tốc độ truyền dữ liệu với kích thước lớn (500MB) bằng hai phương pháp khác nhau.

Ở đây, chúng ta chỉ so sánh tốc độ truyền tải dữ liệu giữa thread chính và worker, không so sánh tốc độ xử lý khi nhận dữ liệu.  Dưới đây là code dùng để so sánh:

**Truyền dử dụng bằng structured cloning**

```javascript
const myWorker = new Worker("worker.js");
const data = new Uint8Array(500 * 1024 * 1024);
const startTime = new Date().getTime();
myWorker.postMessage(data);
const timeTaken = new Date().getTime() - startTime;
console.log(`Tranfer completed in ${timeTaken}ms.`);
```


**Transferable**

```javascript
const myWorker = new Worker("worker.js");
const data = new Uint8Array(500 * 1024 * 1024);
const startTime = new Date().getTime();
myWorker.postMessage(data, [data.buffer]);
const timeTaken = new Date().getTime() - startTime;
console.log(`Tranfer completed in ${timeTaken}ms.`);
```

Dưới đây là bảng kết quả đo được khi sử dụng truyền dữ liệu bằng hai phương thức này:

Browser | Structured Cloning    | `Transferable`
--------|-----------------------|-------------
Safari  | 1168ms                | 1ms
Chrome  | 604ms                 | 10ms
Firefox | 690ms                 | 1ms

Nhìn vào đây chúng ta cũng thấy rằng, sử dụng `Transferable` để truyền dữ liệu giữa worker và thread chính có tốc độ cao hơn hẳn (nhanh hơn hàng trăm lần, thậm chí với Safari là hơn nghìn lần).  Đây có thể là một lựa chọn tốt để truyền những dữ liệu lớn nhưng không có nhu cầu tái sử dụng ở nguồn.

# Vấn đề về hiệu năng với `Transferable` phức tạp

Trong phần trước, chúng ta đã so sánh tốc độ truyền dữ liệu giữa cách thông thường và dùng `Transferable`.  Và chúng ta đã thấy rằng, tốc độ khi sử dụng `Transferable` đã từng lên đáng kể.  Thế nhưng, đó là trường hợp dữ liệu đơn giản, dữ liệu của message và của buffer tương ứng với nhau.

Tuy nhiên, trong các trường hợp phức tạp hơn, mọi chuyện không còn như vậy nữa.  Dưới đây là một đoạn code dùng để test tốc độ truyền tải dữ liệu giữa thread chính và worker bằng hai phương pháp đó.  Điểm khác biệt ở đây là dữ liệu mà chúng ta truyền tải không phải dữ liệu đơn giản (chỉ là một mảng nữa) mà phức tạp hơn nhiều.

Chúng ta sẽ truyền tải message là một mảng hai chiều, và một mảng buffer cũng là mảng hai chiều của các buffer.  Trong thực tế, chúng ta có thể gặp các trường hợp dữ liệu phức tạp hơn nữa.

```javascript
function transferByLine(line, transferable) {
    var arr = [];
    var bufferArr = [];
    for (var i = 0; i < line; i++) {
        arr[i] = new Uint8Array(100);
        if (transferable) {
            bufferArr.push(arr[i].buffer);
        }
    }
    console.log('Successfully created the array.');
    console.log(`The array has ${line} items, each item size is 100 bytes`);
    console.log(`Start transferring with transferable=${transferable}...`);
    var startTime = new Date().getTime();
    if (!transferable) {
        myWorker.postMessage(arr);
    } else {
        myWorker.postMessage(arr, bufferArr);
    }
    var timeTaken = new Date().getTime() - startTime;
    console.log(`Tranfer completed in ${timeTaken}ms.`);
}
```

Dưới đây là kết quả kiểm tra với các kích thước khác nhau của dữ liệu:

Lines   | Safari (clone / `Transferable`) | Chrome (clone / `Transferable`) | Firefox (clone / `Transferable`)
--------|-------------------------------|-------------------------------|-------------------------------
2000    | 6ms / 3ms                     | 3ms / 11ms                    | 7ms / 11ms
4000    | 21ms / 4ms                    | 1ms / 20ms                    | 37ms / 19ms
6000    | 17ms / 9ms                    | 2ms / 40ms                    | 22ms / 28ms
8000    | 19ms / 15ms                   | 19ms / 56ms                   | 57ms / 56ms
10000   | 33ms / 14ms                   | 10ms / 70ms                   | 78ms / 53ms
20000   | 63ms / 35ms                   | 28ms / 205ms                  | 84ms / 192ms
40000   | 106ms / 67ms                  | 67ms / 678ms                  | 187ms / 203ms
60000   | 137ms / 106ms                 | 92ms / 1417ms                 | 357ms / 552ms
80000   | 218ms / 146ms                 | 169ms / 2415ms                | 595ms / 490ms
100000  | 266ms / 174ms                 | 170ms / 3796ms                | 834ms / 717ms
200000  | 521ms / 391ms                 | 453ms / 15572ms               | 866ms / 865ms

Nhìn các con số hơi khô khan một chút, chúng ta hãy xem biểu đồ minh hoạ cho kết quả này như sau:

![chart](https://i.imgur.com/qMuCgt5.png)

Trong số các trình duyệt được test, chỉ có Safari là giữ được phong độ khi tốc độ truyền tải bằng `Transferable` vẫn nhanh hơn cách truyền thống.  Chrome và Firefox đều sa sút khi tốc độ truyền tải bằng cách truyền thống còn nhanh hơn.  Tuy nhiên đó chưa phải là điều đáng nói ở đây.

Nếu để ý, chúng ta sẽ thấy rằng, khi kích thước dữ liệu tăng lên,thời gian truyền tải của Safari hay Firefox tăng rất từ từ, cả cách truyền thống lẫn dùng `Transferable`.

Thế nhưng, riêng với Chrome, thời gian truyền tải tăng theo hàm mũ khi sử dụng `Transferable`, trong khi cách truyền thống vẫn tăng tuyến tính giống Safari và Firefox.  Nguyên nhân có thể là do Chrome mất nhiều thời gian để phân tích tham số thứ hai của hàm `postMessage` (một mảng các mảng buffer) và tìm cách map nó mới tham số thứ nhât. Rõ ràng Chrome không hề được tối ưu cho thao tác này.

# Kết luận

Web worker có hai phương thức khác nhau để truyền tải dữ liệu giữa thread chính và worker.  Mỗi phương thức đều có những ưu điểm riêng. Nếu cần truyền tải dữ liệu với kích thước lớn, chúng ta có thể sử dụng `Transferable` nếu dữ liệu đó chỉ được lưu ở một vài biến.  Trong trường hợp dữ liệu kích thước lớn có cấu trúc phức tạp, được lưu bằng một mảng nhiều phần tử, thì cách truyền thống dùng structured cloning lại tốt hơn.