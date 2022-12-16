> Bài viết gốc https://manhhomienbienthuy.github.io/2018/11/20/html5-web-worker-hieu-biet-co-ban.html (đã xin phép tác giả :D)

Web worker (còn tên gọi khác là worker) là một phương thức đơn giản cho phép website chạy các script ngầm.  Tiến trình của worker có thể được thực thi mà không có bất cứ tương tác nào với giao diện người dùng.  Trong bài viết này, chúng ta sẽ tìm hiểu một số cách sử dụng cơ bản của web worker.

# Vấn đề: Tính toán song song của JavaScript

Có rất nhiều vấn đề với khiến một ứng dụng có thể gặp phải "tắc cổ chai", khiến cho một ứng dụng web cho tốt tới mức nào cũng rất khó tiếp cận người dùng do hiệu suất thấp.  Những vấn đề này có thể đến từ phía server (xử lý nhiều, tối ưu kém) hoặc ngay ở JavaScript của phía client.

Trong bài viết này, chúng ta sẽ tạm thời chỉ bàn về vấn đề của JavaScript, những vấn đề đó có thể bao gồm việc tương thích với các trình duyệt, hiệu suất của JavaScript engine.  Rất may là những vấn đề này ngày nay hầu như không còn nữa do CPU đã mạnh hơn rất nhiều, đồng thời các trình duyệt hiện đại cũng nâng cao hiệu suất của JavaScript engine rất nhiều rồi.  Thậm chí kể cả nỗi kinh hoàng đối với các developer là trình duyệt của Microsoft cũng đã chuyển mình.

Chỉ còn một vấn đề duy nhất vẫn còn tồn tại của JavaScript là chính bản thân ngôn ngữ.  JavaScript là một ngôn ngữ đơn luồng, có nghĩa là code JavaScript gần như không thể chạy song song. 

Hãy tưởng tượng rằng một website cần phải thực thi rất nhiều thứ trên client bằng JavaScript: Xử lý các event trên giao diện, truy vấn và xử lý các phản hồi từ API, thay đổi giao diện tuỳ theo thao tác của người dùng, v.v...  Đây là những công việc hết sức phổ thông của một ứng dụng web.  Thế nhưng, thật không may, những điều trên không thể được thực hiện đồng thời vì hạn chế của chính ngôn ngữ JavaScript.  Việc thực thi script phải tuần tự trong một tiến trình duy nhất.

Các developer thường sử dụng một số kỹ thuật để "giả lập" tính toán song song trong JavaScript như sử dụng [`setTimeout`](https://www.w3schools.com/jsref/met_win_settimeout.asp), [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp), [`XMLHttpRequest`](https://www.w3schools.com/xml/xml_http.asp) và [event trigger](https://www.w3schools.com/js/js_events.asp).  Vâng, tất cả những thứ trên đều được chạy "bất đồng bộ" và trông "có vẻ như" việc thực thi code là song song.  Thế nhưng "bất đồng bộ" không hoàn toàn là "song song", bởi vì các hoạt động bất đồng bộ chỉ được thực hiện sau khi code đồng bộ được thực thi xong.

Rất may là HTML 5 đã cung cấp cho chúng ta một phương thức mới giúp cho việc tính toán song song dễ dàng hơn rất nhiều.

# Web worker: thread cho JavaScript

Web worker (còn được gọi ngắn là worker) cung cấp cho chúng ta một số API để sinh các tiểu trình để chạy ngầm.  Web worker cho phép chúng ta có thể thực thi một số tác vụ như khởi tạo script chạy ngầm để thực hiện các thao tác nâng cao, nhưng không làm gián đoạn bất cứ thao tác nào trên UI cũng như các script khác ảnh hưởng đến trải nghiệm người dùng.  Nó sẽ giúp các website tránh được tình trạng "unresponsive script" vẫn thỉnh thoảng xuất hiện khi JavaScript thực hiện tính toán quá lớn.

![unresponsive](https://cdn-images-1.medium.com/max/1600/0*w2rEwv9mE9xVPhRy.png)

Worker với cơ chế hoạt động multithread cho phép chúng ta thực hiện tính toán song song.  Nó là phương án tốt nhất để giữ UI hoạt động trong khi các tác vụ nặng vẫn được thực thi.

Có nhiều phương thức cho phép chúng ta làm việc này như web worker, service worker, v.v...  Trong bài viết này, chúng ta chỉ đề cập đến một loại duy nhất, đó là web worker (có thể gọi tắt là worker).  Các loại worker khác, xin dành cho các bài viết sau.

# Sử dụng web worker

Web worker là một phương thức đơn giản cho phép chúng ta thực thi script ngầm bằng thread.  Lưu ý rằng, web worker không tương tác trực tiếp với DOM mà việc tương tác phải thực hiện thông qua `postMessage`.

Một worker là một object được tạo ra từ class `Worker` (hoặc `SharedWorker`), nó sẽ thực thi một file JavaScript.  File JavaScript sẽ chứa toàn bộ code chạy trong thread của worker, thread được thực thi trong ngữ cảnh hoàn khác với ngữ cảnh hiện tại.  Vì vậy, nếu sử dụng biến `window` để truy cập đến các biến, hằng của ngữ cảnh hiện tại từ worker sẽ gặp lỗi.

Ngữ cảnh của worker được đặt trong object `DedicatedWorkerGlobalScope` (trong trường hợp sử dụng dedicated worker) hoặc `SharedWorkerGlobalScrope` (nếu sử dụng shared worker).  Dedicated worker là worker chỉ tương tác từ một script duy nhất, nó chỉ có thể tương tác với script mà nó được sinh ra, trong khi shared worker có thể tương tác từ nhiều script khác nhau.

Một worker có thể thực thi bất cứ code JavaScript nào (có một số ít ngoại lệ).  Ví dụ, worker không thể tương tác với DOM, hoặc một số phương thức cũng như thuộc tính của `window` không thể truy cập được. Nhưng chúng ta có thể sử dụng một lượng lớn các cơ chế khác như Web socket, các cơ chế lưu trữ dữ liệu như IndexedDB, Data Store API (chỉ có ở Firefox).

Dữ liệu được gửi và nhận giữa worker và thread chính của trình duyệt thông qua message.  Cả hai phía đều gửi message thông qua phương thức `postMessage` và xử lý khi nhận message này thông qua event `onmessage`.

Một worker có thể sinh ra một worker khác, miễn là các worker này đều có chung nguồn gốc với cha gốc của chúng.  Ngoài ra, worker có thể sử dụng `XMLHttpRequest` để thực thi các tác vụ liên quan đến truy vấn mạng.  Tuy nhiên, khi đó `responseXML` và `channel` của request luôn luôn trống.

## Dedicated worker

Dedicated worker (worker dành riêng), đúng như tên gọi của nó, là worker chỉ có tương tác bởi script đầu tiên đã sinh ra nó.  Trong phần này, chúng ta sẽ tập trung tìm hiển về dedicated worker (tất nhiên là chỉ ở mức cơ bản).
 
Chúng ta sẽ tìm hiểu dedicated worker thông qua một ví dụ như sau: Nhập vào hai số, các số này sẽ được gửi tới dedicated worker, thực hiện phép nhân chúng với nhau sau đó kết quả sẽ được gửi lại thread chính và hiển thị.

Bạn có thể xem một demo của ví dụ này [ở đây](https://manhhomienbienthuy.github.io/web-worker-sample/dedicated/).

Ví dụ này khá cơ bản, và có vẻ không thực tế lắm (chỉ nhân thì không cần đến worker chạy multithread làm gì cả).  Thế nhưng nó là một ví dụ tốt để chúng ta tìm hiểu worker, không quá phức tạp và cũng dễ code.

### Kiểm tra worker có được hỗ trợ không

Để dễ dàng hơn trong việc chạy thử trên website riêng, các bạn nên viết script thành các file riêng, và những code trong phần này nên để trong một file.

```javascript
if (!!window.Worker) {
    ...
}
```

### Sinh một dedicated worker

Tạo một worker mới, mọi việc chúng ta cần làm là gọi class `Worker` với URI chỉ vào file JavaScript để thực hiện tác dụng trong worker đó:

```javascript
const myWorker = new Worker("worker.js");
```

### Gửi message đến worker

Mọi tương tác của worker đến thread chính đều thực hiện thông qua phương thức `postMessage` và event `onmessage`.  Nếu muốn gửi dữ liệu đến worker, chúng ta phải thực hiện như sau:

```javascript
first.onchange = () => {
    myWorker.postMessage([first.value,second.value]);
    console.log('Main (first.onchange): Message posted to worker');
}

second.onchange = () => {
    myWorker.postMessage([first.value,second.value]);
    console.log('Main (second.onchange): Message posted to worker');
}
```

Ở đây chúng ta có hai thẻ `input` được đại diện bởi hai biến `first` và `second`.  Khi giá trị của chúng thay đổi, phương thức `postMessage` sẽ được gọi để gửi những dữ liệu đó đến worker.  Thực tế, chúng ta có thể gửi bất cứ dữ liệu gì trong message này. 

Trong worker, chúng ta sẽ xử lý những dữ liệu thu được thông qua event `onmessage`:

```javascript
onmessage = (e) => {
    console.log('Worker: Message received from main script');
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
}
```

Event `onmessage` cho phép chúng ta thực thi code của worker bất cứ khi nào nhận được message.  Trong ví dụ của chúng ta, chúng ta chỉ đơn giản là nhân hai số nhận được từ message và gửi kết quả trở lại thread chính.

Trong thread chính, chúng ta cũng sử dụng event `onmessage` để xử lý những dữ liệu nhận được từ worker:

```javascript
myWorker.onmessage = (e) => {
    result.textContent = e.data;
    console.log('Main (myWorker.onmessage): Message received from worker');
}
```

Trong trường hợp cụ thể của chúng ta, chúng ta chỉ đơn giản là lấy dữ liệu này ra và hiển thị kết quả cho người dùng.  Khi đó, người dùng có thể nhìn thấy kết quả tính toán một cách nhanh chóng.

Lưu ý rằng, `onmessage` và `postMessage` ở thread chính (dùng để sinh ra worker) cần phải được gọi kèm với worker tương ứng, nhưng ở trong worker thì không cần làm như vậy.  Lý do rất đơn giản, thread chính có thể có nhiều worker, còn trong một worker thì đương nhiên chỉ có một thread của worker đó mà thôi.

Một lưu ý nữa là message được gửi và nhận giữa worker và thread chính không sử dụng chung object.  Có nghĩa là dữ liệu được gửi và nhận sẽ được "copy" chứ không phải cứ thế truyền đi luôn.

### Ngừng worker đang chạy

Nếu muốn ngừng ngay lập tức một worker đang chạy từ thread chính, chúng ta có thể sử dụng phương thức sau:

```javascript
myWorker.terminate();
```

Thread của worker sẽ ngay lập tức bị kill mà không cần đợi các tác vụ của nó được thực thi xong.

Bên trong worker, nó cũng có thể tự kill mình bằng phương thức sau:

```javascript
close();
```

### Xử lý lỗi

Khi có lỗi xảy ra trong quá trình thực thi của worker, chúng ta có thể sử dụng event `onerror` để bắt lỗi và xử lý.  Bằng cách đó, chúng ta sẽ bắt một event là error (thuộc class `ErrorEvent`).

Event lỗi này không thể cancel (`cancelable = false`), nhưng worker có thể sử dụng `preventDefault`.  Phương thức này sẽ ngăn cản việc error đó ảnh hưởng đến bên ngoài.

Event error có các thuộc tính sau mà chúng ta nên để ý:

- `message`: Đây là thông báo lỗi dễ hiểu cho người dùng.
- `filename`: Tên file script đã gặp lỗi.
- `lineno`: số dòng của script đã gặp lỗi.

### Sinh ra các worker con

Worker có thể sinh ra các worker khác muốn.  Những worker con đó phải có chung nguồn gốc với cha của chúng.  Ngoài ra, URI của script được thực thi bởi worker con (subworker) sẽ được coi là đường dẫn tương đối tính từ worker cha của nó chứ không phải tính từ website.  Điều đó giúp cho các worker dễ dàng theo dõi các con của nó hơn.

### Import các script khác

Worker có thể sử dụng `importScript` để import các script khác.  Nó có thể không có tham số (không import gì) hoặc các URI là các script cần import.  Tất cả các `importScript` sau đều hợp lệ:

```javascript
importScripts();                         /* không import gì */
importScripts('foo.js');                 /* imports 1 script "foo.js" */
importScripts('foo.js', 'bar.js');       /* imports 2 scripts */
importScripts('//example.com/hello.js'); /* You can import scripts từ bên ngoài */
```

Trình duyệt sẽ load các script trong tham số và thực thi chúng.  Tất cả các biến, hàm, v.v... của các script đó đều có thể truy cập được từ worker.  Nếu script không thể load được, thì một exception là `NETWORK_ERROR` sẽ được bắn ra, và các code tiếp theo nó sẽ bị dừng lại.

Việc load các script được import này sẽ được thực hiện lần lượt, và thực hiện đồng bộ.  Nghĩa là các script được load trước sẽ được thực thi trước, sau đó mới load tiếp các script khác.  Nhờ vậy, các hàm, biến được định nghĩa ở script trước có thể được truy cập ở script sau.

Lưu ý rằng, việc download các file từ URI có thể được thực hiện song song, nhưng việc thực thi code từ các file script đó chắc chắn sẽ là tuần tự.  Hàm `importScript` sẽ chỉ return (tức là đã thực thi xong) nếu các script trong tham số của nó được thực thi xong.

## Shared worker

Shared worker là worker có thể truy cập từ nhiều script khác nhau, thậm chí có thể truy cập được từ cửa sổ khác, iframe hoặc các worker khác.  Trong phần này, chúng ta sẽ tìm hiểu một vài điểm cơ bản của shared worker.

Cũng như phần trước, chúng ta sẽ tìm hiểu thông qua một ví dụ tương tự như phần trước, sử dụng worker để thực hiện phép nhân, mở thông thêm một chút là sử dụng luôn worker đó để thực hiện phép bình thường (là phép nhân một số với chính nó).

Demo của ví dụ này có thể được xem [ở đây](https://manhhomienbienthuy.github.io/web-worker-sample/shared/)

Lưu ý rằng, dù shared worker có thể truy cập từ nhiều script khác nhau, nhưng yêu cầu là những script này phải có chung nguồn gốc (cùng protocol, host, port).

### Sinh một shared worker

Sinh một shared worker mới cũng đơn giản như sinh một dedicated worker vậy, sự khác biệt duy nhất là ở class của chúng:

```javascript
const myWorker = new SharedWorker("worker.js");
```

Một sự khác biệt rất lớn của shared worker đó là việc giao tiếp giữa worker và các script khác phải thông qua một object port - đây là cổng được mở để script có thể tương tác với worker.  Không giống như dedicated worker, cổng này cũng được mở nhưng hoàn toàn trong suốt với lập trình viên.

Việc kết nối thông qua port này có thể được thực hiện tự động thông qua event `onmessage` hoặc gọi `start` cho tường minh.  Nếu gọi `start` thì việc này phải được thực hiện trước khi gửi và nhận message.

### Gửi nhà nhận message từ shared worker

Việc gửi message từ shared worker cũng tương tự như dedicated worker, nhưng phương thức `postMessage` phải được gọi thông qua object `port`.

```javascript
squareNumber.onchange = () => {
    myWorker.port.postMessage([squareNumber.value, squareNumber.value]);
    console.log('Message posted to worker');
}
```

Giờ đây, với shared worker, ở trong chính bản thân worker, việc xử lý kết nối sẽ phức tạp hơn một chút:

```javascript
onconnect = (e) => {
    var port = e.ports[0];

    port.onmessage = (e) => {
        var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
        port.postMessage(workerResult);
    }
}
```

Trước tiên, chúng ta gọi `onconnect` event để xử lý khi có kết nối đến `port` (event này sẽ được trigger khi thread cha của nó gọi `onmessage` hoặc `start`).  Sau đó, chúng ta phải sử dụng thuộc tính `port` của event để xử lý đúng kết nối đến worker.

Sau đó, việc tính toán và xử lý tương tự như ví dụ với dedicated server.  Quay trở lại với script chính, chúng ta cũng cần thực hiện việc nhận message từ worker:

```javascript
myWorker.port.onmessage = (e) => {
    result2.textContent = e.data;
    console.log('Message received from worker');
}
```

Lưu ý rằng, ở đây, chúng ta tạo worker thực hiện cùng một tác vụ (được định nghĩa trong `worker.js`), nếu không sử dụng shared worker, thì không thể làm được việc này.  Bởi vì dedicated worker chỉ cho phép kết nối với script đầu tiên đã tạo ra nó, những script sau đó dù có sinh worker cũng không thể gửi và nhận message được.

## Inline worker

Có một số trường hợp, chúng ta muốn tạo ra worker một cách "động" mà không muốn viết script cho worker đó ra file riêng.  Khi đó, chúng ta cần một phương thức nào đó để có thể cấp phát động một vùng nhớ để lưu trữ script đó.

Rất may, một số thủ thuật với JavaScript có thể giúp chúng ta thực hiện việc đó khá dễ dàng.  Lấy luôn ví dụ với worker thực hiện phép nhân của chúng ta, chúng ta có thể tạo ra inline worker như sau:

```javascript
const blob = new Blob([
    `onmessage = (e) => {
        console.log('Worker: Message received from main script');
        const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
        console.log('Worker: Posting message back to main script');
        postMessage(workerResult);
    }`
]);
const blobURL = window.URL.createObjectURL(blob);
const myWorker = new Worker(blobURL);
```

Demo của cách làm này, mời các bạn xem [ở đây](https://manhhomienbienthuy.github.io/web-worker-sample/inline/).

Mấu chốt vấn đề ở đây đến từ `Blob` và `BlobURL`, được tạo ra bởi `window.URL.createObjectURL`.  Phương thức này sẽ tạo ra một URL để truy cập đến dữ liệu được lưu trong `DOM File` hoặc `Blob`:

```
blob:http://localhost/b8fce994-9a2e-48ea-9f51-c926960e8571
```

Blob URL là duy nhất và sẽ tồn tại theo thời gian của website (nó chỉ mất đi nếu `document` unload).

## Worker scope

Trong worker, ngữ cảnh của nó tương đối bị thu hẹp.  Trong đó, `self` và `this` tham chiếu đến chính worker đó, và là các biến global trong toàn bộ code của worker.  Do đó, code của worker như sau:

```javascript
onmessage = (e) => {
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    postMessage(workerResult);
}
```

cũng tương đương với:

```javascript
self.onmessage = (e) => {
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    self.postMessage(workerResult);
}
```

và tương đương luôn:

```javascript
this.onmessage = (e) => {
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    this.postMessage(workerResult);
}
```

Ngoài ra, vì hoạt động của worker là multithread, nó chỉ có thể truy cập đến một phần nhỏ các biến cũng như hàm toàn cục của JavaScript như:

- `navigator`
- `location` (read only)
- `XMLHttpRequest`
- `setTimeout`, `clearTimeout`
- `setInterval`, `clearInterval`

Worker **không thể** truy cập được đến:

- DOM
- `window`
- `document`
- `parent`

# Khi nào thì nên sử dụng web worker

Web worker rất cool và cực kỳ hữu ích với các ứng dụng web.  Dưới đây là một số tình huống chúng ta có thể sử dụng web worker trong ứng dụng web của mình:

- Tải trước dữ liệu nhưng không dùng ngay mà để sau này mới dùng đến.
- Các thao tác định dang văn bản real-time (ví dụ code highlight hay preview với các editor trên nền web).
- Kiểm tra chính tả, kiểm tra ngữ pháp của văn bản nhập vào.
- Xử lý, phân tích dữ liệu hình ảnh, âm thanh.
- Các thao tác truyền, nhận dữ liệu qua long polling.
- Xử lý một khối lượng dữ liệu JSON rất lớn.
- v.v...

# Một vài vấn đề khác

Trình duyệt Google Chrome có một số giới hạn liên quan đến bảo mật, nên worker không thể chạy được từ file tĩnh (load bằng `file:///`, tất nhiên là có thể thay đổi settings này).  Một số trình duyệt dẫn xuất từ Chromium cũng gặp phải vấn đề này (ví dụ Opera).

Ngoài ra, việc load script cho worker yêu cầu phải chung nguồn gốc với website hiện tại, do đó, không thể load script từ `data:` hoặc `javascript:`.  Đồng thời trang web sử dụng HTTPS cũng không thể load script cho worker sử dụng HTTP.

Worker thật sự sinh ra một thread trong bộ nhớ máy tính, nhiều người có thể lo lắng rằng nó sẽ gây ra các tác dụng phụ với hệ thống.  Tuy nhiên, web worker được quản lý rất cẩn thận trong việc tương tác với các thread khác, nên thường nó rất khó gây ra các lỗi cho hệ thống. Nó không được truy cập DOM cũng như các object không thread-safe khác, do đó, rất khó để gặp vấn đề với worker.

# Kết luận

Worker thực sự là một giải pháp cho phép chúng ta thực hiện multithread với JavaScript rất hay.  Hy vọng bài viết giúp ích cho các bạn trong công việc, trong các bài viết sau, chúng ta sẽ dành thời gian tìm hiểu các loại worker khác.