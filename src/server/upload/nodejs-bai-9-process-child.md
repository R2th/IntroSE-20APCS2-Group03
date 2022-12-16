Trong bài viết này, chúng ta sẽ cùng tìm hiểu về việc quản lý tiến trình vận hành phần mềm - hay còn được gọi là `process` - và một vài công cụ do NodeJS cung cấp để hỗ trợ việc tạo ra và quản lý các tiến trình vận hành code. Tuy nhiên trước khi bắt đầu thảo luận về các công cụ do NodeJS cung cấp, chúng ta cần xem một `process` được biểu thị như thế nào trong môi trường hệ điều hành mà chúng ta đang sử dụng.

Nếu như bạn đang sử dụng Windows thì có thể tìm và mở phần mềm `Resource Monitor` hoặc `Task Manager` để xem danh sách tất cả các tiến trình vận hành phần mềm đang được quản lý bởi hệ thống. Ví dụ trong ảnh chụp màn hình minh họa dưới đây thì mỗi một `process` được `Task Manager` biểu thị bằng một hàng trong bảng `Details`; Và được gắn với một mã `Process ID` ở cột thứ hai để phân biệt với các tiến trình khác.

![](https://images.viblo.asia/a18bb4e9-b936-48fc-b577-4a73f49e8f22.png)

Ồ... mình đang sử dụng duy nhất một cửa sổ Firefox với 1 tab đang soạn thảo bài viết tại đây, nhưng lại có tới 10 tiến trình `firefox.exe` khác nhau đang hoạt động song song. Để mình thử mở một phần mềm đơn giản hơn xem kết quả thế nào, Notepad chắc là đơn giản nhất rồi.

![](https://images.viblo.asia/17dffc07-ec9b-4216-a9fb-9b6455482f50.png)

Hm... Một cửa sổ Notepad chỉ sử dụng duy nhất một tiến trình. Như vậy là một phần mềm, như chúng ta đã thấy, có thể sử dụng nhiều tiến trình để thực hiện các công việc ở phía sau giao diện người dùng. Và ở trong bảng `Task Manager` vừa nãy thì cũng có rất nhiều những phần mềm khác không thể hiện trên giao diện người dùng, giống như phần mềm `server` của trang blog đơn giản mà chúng ta đã viết, cũng sử dụng nhiều tiến trình vận hành song song.

## Các module quản lý tiến trình

Cũng như các ứng dụng khác trong cùng thiết bị, mỗi ứng dụng NodeJS mà chúng ta lập trình cũng sẽ được vận hành trên một hoặc nhiều tiến trình. 

Cụ thể là chúng ta sẽ luôn có một tiến trình chính `main process`, gắn liền với tệp mà chúng ta khởi chạy với lệnh `node tên-tệp.js`. Vì vậy nên trong nhiều ngôn ngữ lập trình, hàm khởi đầu chương trình có tên mặc định là `main()` - có nghĩa là bắt đầu tiến trình chính.

Các tiến trình phụ (nếu có) sẽ được đặt tên theo `convention` riêng tùy vào `project` và người viết code. Tuy nhiên ở lớp cơ sở thì NodeJS gọi là các tiến trình con `child process`.

Và tương ứng với hai loại tiến trình này, NodeJS có cung cấp 2 module khởi điểm cung cấp giao diện lập trình cho chúng ta có thể chủ động tạo ra và quản lý các tiến trình là:

- [Module `process`](https://nodejs.org/dist/latest-v16.x/docs/api/process.html#process) - cung cấp object `process` mô tả tiến trình chính `main process`.
- [Module `child_process`](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#child-process) - cung cấp `class ChildProcess` và các phương thức khởi tạo các tiến trình con sử dụng class này.

## Main process

Mặc dù object `process` được gắn với object môi trường toàn cục `global` và có thể được truy xuất ở bất kỳ đâu trong `project`. Tuy nhiên tài liệu của NodeJS khuyến khích thực hiện thêm thao tác `require("process")` trong tệp cần sử dụng. Ở đây chúng ta sẽ sử dụng lại code server "Hello World" từ những bài viết đầu tiên của Sub-Series này để hiển thị một số thông tin về `main process`.

```Destop/main.js
const process = require(`process`);
const http = require(`http`);

   /* --- Create a server */

const handleRequest = function(request, response) {
   var html = `
      <h1> Process </h1>
      <h2> Title: ${process.title} </h2>
      <h2> ID: ${process.pid} </h2>
      <h2> OS: ${process.platform} </h2>
   `; // html

   response.setHeader(`content-type`, `text/html`);
   response.statusCode = 200;
   response.end(html);
};

const server = http.createServer(handleRequest);

   /* --- Start server */

const port = 3000;
const hostname = `127.0.0.1`;

const callback = function() {
   console.log(`Server is running at...`);
   console.log(`http://${hostname}:${port}/`);
};

server.listen(port, hostname, callback);
```

```CMD|Terminal.io
cd Desktop
node main.js
```

[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
![](https://images.viblo.asia/2b9d9eb4-fa2f-45c6-b3e5-2234ebd905d6.png)

## Child process

Các tiến trình con có thể được tạo ra bởi nhiều phương thức khác nhau và NodeJS có cung cấp một vài module khác nữa để thực hiện việc này. Tuy nhiên tất cả đều được xây dựng dựa trên giao diện lập trình do module `child_process` cung cấp. Và phương thức cơ bản nhất có tên là [`spawn`](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#child_processspawncommand-args-options) - được sử dụng để chạy một câu lệnh trong cửa sổ dòng lệnh như chúng ta thường thao tác trên giao diện đồ họa.

```
child_process.spawn(command[, args][, options]);
```

Trong cú pháp của `spawn` được cung cấp bởi tài liệu của NodeJS thì tạm thời chúng ta sẽ chỉ quan tâm tới `command` và `[, args]`. Ví dụ khi chúng ta chạy một câu lệnh nào đó trong cửa sổ dòng lệnh ví dụ như `npm install --save something`; thì `npm` là lệnh cần thực thi `command`, và phần còn lại đều là các tham số `args`.

```js
var command = 'npm';
var args = ['install', '--save', 'something'];
var subprocess = child_process.spawn(command, args);
```

Phương thức này mở ra một tiềm năng mới giúp chúng ta có thể chạy một phần mềm khác trong cùng thiết bị từ code viết trên nền NodeJS. Ví dụ như mở một trình duyệt web và trỏ tới một địa chỉ web nào đó, hoặc chạy một `module` được viết trên một ngôn ngữ khác, v.v...

Nói riêng về việc chạy một `module` khác để ủy thác một tác vụ cần xử lý song song, nếu như chúng ta muốn sử dụng một `module` được viết bằng JavaScript thì NodeJS có cung cấp một phương thức khác tên là `fork`. Phương thức này được xây dựng dựa trên `spawn` nhưng được bổ sung thêm nhiều tiện ích hỗ trợ viết code giao tiếp giữa `main process` và `child process` đơn giản hơn.

```js
var subprocess = child_process.fork("đường-dẫn-tới-module");
```

## Giao tiếp giữa các process

Hãy tạm lấy ví dụ một trường hợp sử dụng `child_process` đơn giản nhất, đó là khi chúng ta muốn tách rời một tác vụ tính toán phức tạp để thực hiện song song với `main process`. Như vậy chương trình của chúng ta sẽ có thể thực hiện những công việc khác nữa, trong thời gian chờ kết quả tính toán được trả về.

Đây là trường hợp cơ bản và phổ biến tới mức các ngôn ngữ lập trình đều cung cấp một giao diện dựng sẵn như một cú pháp hoặc một phương thức cho phép phát động một lời gọi hàm trên tiến trình song song. Trong JavaScript thì chúng ta đã biết tới các hàm `async`; và ở đây thì chúng ta sẽ làm một ví dụ đơn giản với `fork` để mô phỏng lại một thao tác được thực thi bất đồng bộ.

```Desktop/main.js
const child_process = require(`child_process`);

console.log(`Ủy thác tác vụ tính toán phức tạp cho module async...`);

var subprocess = child_process.fork(`./async`);

subprocess.on(`message`, (message) => {
   console.log(`Kết quả từ module async: ${message.result}`);
   subprocess.kill();   // kết thúc subprocess
});

subprocess.send({ parameter: 1001 });

console.log(`Đây là một tác vụ khác trên main process...`);
```

Trong code ví dụ `main.js` ở trên, chúng ta đã tạo ra một `subprocess` từ module `async.js` trong cùng thư mục. Sau đó gắn một `listener` vào `subprocess` để chờ thông báo kết quả tính toán được ủy thác từ `main`.

Phương thức `subprocess.send` sẽ phát động một sự kiện bằng `process.emit("message", ...)` kèm theo một kênh truyền dữ liệu trừu tượng được lập trình sẵn mà chúng ta không cần biết chi tiết. Lúc này code ở `async.js` cũng có thể gắn `listener` vào `main process` để chờ thông báo tham số được truyền tới. Ngay khi nhận được tham số thì `async` sẽ thực hiện tính toán và thông báo lại sớm nhất có thể.

```Desktop/async.js
var process = require(`process`);

process.on(`message`, (message) => {
   // --- giả lập một tác vụ tính toán sau khi nhận được tham số
   // --- thời gian thực hiện khoảng 10 giây sau đó trả về kết quả
   var delay = 10 * 1000;
   setTimeout((_) => {
      process.send({ result: message.parameter - 900 });
   }, delay);
});
```

```CMD|Terminal.io
node main.js

Ủy thác tác vụ tính toán phức tạp cho module async...
Đây là một tác vụ khác trên main process...
# 10 giây sau...
Kết quả từ module async: 101
```

## Kết thúc bài viết

Như vậy là chúng ta đã thực hiện xong phần giới thiệu sơ lược về các công cụ cơ bản hỗ trợ tạo ra và quản lý các tiến trình vận hành phần mềm trong NodeJS. Nói riêng về nhu cầu cần sử dụng các `module` viết trên các ngôn ngữ khác, phương thức giao tiếp giữa các `process` sẽ có phần phức tạp hơn một chút. Lý do là vì `spawn` là phương thức cơ sở và không được tích hợp tính năng giao tiếp qua `message` như `fork`.

Để có thể sử dụng được `spawn` và ủy thác tác vụ tính toán cho một `module` viết bởi ngôn ngữ khác hoặc một `package` bất kỳ có giao diện sử dụng dòng lệnh, chúng ta sẽ cần chuẩn bị thêm một chút kiến thức về `Standard I/O & Stream`. Đây cũng sẽ là chủ đề của bài viết tiếp theo. :D

[[NodeJS] Bài 10 - Standard I/O & Stream](https://viblo.asia/p/6J3ZgRrAKmB)