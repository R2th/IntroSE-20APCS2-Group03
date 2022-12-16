Trong bài viết này, chúng ta sẽ cùng tìm hiểu về một giao diện giao tiếp nhập/xuất tiêu chuẩn áp dụng chung cho các ứng dụng và các hệ điều hành có tên là Standard I/O; và giao diện lập trình do module `stream` của NodeJS cung cấp để thực hiện việc gửi/nhận thông tin khi giao tiếp qua chuẩn này. Sau đó chúng ta sẽ có thể sử dụng được phương thức `spawn` đã nói đến trong bài trước để chạy một chương trình tính tổng đơn giản được viết bằng [ngôn ngữ Python](https://www.python.org/).

## Standard Input/Output

Standard Input/Output (stdio), hay còn được gọi là Standard Streams - dịch nôm na là các dòng (hoặc kênh) truyền tải dữ liệu nhập/xuất tiêu chuẩn - được áp dụng để tạo giao diện giao tiếp cơ sở chung cho các hệ điều hành và các ứng dụng.

Giao diện I/O tiêu chuẩn bao gồm có các `stream` là:
- Standard Input (stdin) - dòng (hoặc kênh) đầu vào - để nhận dữ liệu.
- Standard Output (stdout) - dòng (hoặc kênh) đầu ra - để gửi dữ liệu.
- Standard Error (stderr) - dòng (hoặc kênh) báo lỗi - để gửi thông báo ngoại lệ.

Ứng dụng mà chúng ta viết trên nền NodeJS hiển nhiên cũng được áp dụng giao diện I/O tiêu chuẩn này; Và cụ thể là khi chúng ta nhìn vào module `process` hay `child_process` sẽ thấy có các thuộc tính `stdin`, `stdout`, và `stderr`. Khi chúng ta ghi nội dung nào đó vào các kênh `stdout` và `stderr`, hệ điều hành hoặc một `process` phần mềm nào đó khác đang nghe `listen` trên hai kênh này sẽ nhận được dữ liệu.

```Desktop/main.js
const process = require('process');

process.stdout.write('streamed text');
```

```CMD|Terminal.io
cd Desktop
node main.js

streamed text
```

Các object `stdin`, `stdout`, và `stderr`, đều được áp dụng giao diện lập trình của `EventEmitter` và chúng ta sẽ có thể gắn các `listener` xử lý dữ liệu nhập/xuất trên các kênh này; Đồng thời thì các object này đều được tạo ra từ [module `stream`](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html) với các class cung cấp giao diện lập trình thực hiện chức năng tương ứng.

## Stream & Buffer

NodeJS bảo là có cung cấp một vài kiểu `stream` như sau:
- [stream.Writeable](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#class-streamwritable) - có thể ghi được.
- [stream.Readable](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#class-streamreadable) - có thể đọc được.
- [stream.Duplex](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#class-streamduplex) - vừa là `Writeable` và vừa là `Readable`.
- [stream.Transform](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#class-streamtransform) - là `Duplex` nhưng có thêm khả năng chuyển hóa dữ liệu.

Ví dụ như cái `stdout` mà chúng ta sử dụng trong ví dụ ở trên chính là một `Writable` và [phương thức `write`](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#writablewritechunk-encoding-callback) được sử dụng để ghi dữ liệu vào `stdout`.

Khi chúng ta truyền một `object` qua các `stream`, `object` này sẽ được tự động chuyển thành chuỗi `string`, và sau đó tiếp tục được chuyển đổi thành một mảng các ký tự đơn, và rồi tiếp tục được chuyển đổi về phương thức biểu thị bậc thấp hơn - là một mảng các giá trị số nguyên không âm 8-bit [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

Trong trường hợp lượng dữ liệu truyền tải lớn thì sẽ được chia thành các mảng nhỏ `chunk` có kích thước mặc định là 16kbs. Và ở đầu bên kia của kênh truyền tải, khi nhận được dữ liệu thì thường cũng sẽ được áp dụng sẵn giao diện lập trình để tự động chuyển đổi các `chunk` thành các [object `Buffer`](https://nodejs.org/dist/latest-v16.x/docs/api/buffer.html#class-buffer) mở rộng `Uint8Array` hoặc object JSON tùy theo thiết lập stream.

Bây giờ chúng ta sẽ làm một ví dụ sử dụng các `stream` Standard I/O với phương thức `spawn` ở bài trước. Đầu tiên chúng ta có một ứng dụng `nodejs-add` sẽ nhận vào hai giá trị số học `a` và `b` và ghi kết quả ra `stdout`.

```Desktop/nodejs-add/main.js
const process = require('process');

var [nodeCommand, thisFilePath, a, b] = process.argv;
var result = Number(a) + Number(b);

process.stdout.write(String(result));
```

```CMD|Terminal.io
cd Desktop && cd nodejs-add
node main.js 1 9

10
```

Sau đó chúng ta lại có một ứng dụng khác sử dụng `spawn` để chạy `nodejs-add` để ủy thác tác vụ tính toán và thu về kết quả để in ra `console`.

```Desktop/nodejs-print/main.js
const child_process = require('child_process');
const path = require('path');

var add = path.join(__dirname, '..', 'nodejs-add', 'main.js');
var subprocess = child_process.spawn('node', [add, '1', '9']);

subprocess.stdout.on('data', (chunk) => {
   console.log('Result: ' + chunk.toString());
});
```

```CMD|Terminal.io
cd Desktop && cd nodejs-print
node main.js

Result: 10
```

Như vậy là chúng ta đã có được đủ nhóm công cụ để có thể chạy một chương trình khác được viết trên bất kỳ ngôn ngữ nào khác. Bạn có thể thử chạy ứng dụng `python-add` dưới đây thay cho `nodejs-add` ở phía trên.

```Desktop/python-add/main.py
import sys

def main():
   _, a, b = sys.argv
   sum = float(a) + float(b)
   message = str(sum)
   sys.stdout.write(message)
# end def

main()
```

Bạn sẽ cần tải về và cài đặt môi trường chạy tệp `.py` tại [Python.org](https://www.python.org/). Sau đó sửa lại code của chương trình `nodejs-print` một chút.

```Desktop/nodejs-print/main.js
const child_process = require('child_process');
const path = require('path');

var add = path.join(__dirname, '..', 'python-add', 'main.py');
var subprocess = child_process.spawn('python', [add, '1', '9']);

subprocess.stdout.on('data', (chunk) => {
   console.log('Result: ' + chunk.toString());
});
```

```CMD|Terminal.io
cd Desktop && cd nodejs-print
node main.js

Result: 10.0
```

## Kết thúc bài viết

Như vậy là chúng ta đã hoàn thành phần giới thiệu về giao diện nhập/xuất dữ liệu tiêu chuẩn sử dụng chung cho các ứng dụng và các hệ điều hành khác nhau. Ở thời điểm hiện tại thì chúng ta đã biết khá đủ các công cụ thiết yếu trên nền NodeJS để có thể xây dựng bất kỳ kiểu ứng dụng nào.

Trong các bài viết tiếp theo, chúng ta sẽ chuyển hướng tới chủ đề sử dụng công cụ hỗ trợ soát lỗi vận hành của code trong môi trường NodeJS, và giới thiệu một vài thư viện cung cấp công cụ viết code kiểm tra hoạt động của code phần mềm chính.

[[NodeJS] Bài 11 - Assertion & Testing](https://viblo.asia/p/63vKjANy52R)