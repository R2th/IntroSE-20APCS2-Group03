## Các lệnh điều khiển luồng
Bạn có thể kiểm soát luồng mã Dart của mình bằng bất kỳ cách nào sau đây:

* if và else
* vòng lặp for
* while và do- while
* break và continue
* switch và case
* assert

Bạn cũng có thể tác động đến luồng xử lý bằng cách sử dụng try-catch và throw, như được giải thích trong [Ngoại lệ](https://dart.dev/guides/language/language-tour#exceptions) .

### If và else
Dart hỗ trợ các câu lệnh if với else là câu lệnh tùy chọn , như ví dụ sau

```
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```
Không giống như JavaScript, các điều kiện chỉ sử dụng các giá trị boolean. Xem [Booleans](https://dart.dev/guides/language/language-tour#booleans) để biết thêm thông tin.

### Vòng lặp for
Bạn có thể xử lý lặp với vòng for. Ví dụ:

```
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```
Việc đóng bên trong các vòng lặp for của Dart nắm bắt giá trị của chỉ mục, tránh một lỗi phổ biến được tìm thấy trong JavaScript. Ví dụ: xem xét:

```
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

Output là 0 và sau đó 1, như mong đợi. Ngược lại, ví dụ sẽ in 2 và sau đó 2 trong JavaScript.

Nếu đối tượng mà bạn đang lặp là một Iterable, bạn có thể sử dụng phương thức forEach () . Sử dụng forEach() là một tùy chọn tốt nếu bạn không cần biết index lặp hiện tại:

```
candidates.forEach((candidate) => candidate.interview());
```
Các lớp lặp như List và Set cũng hỗ trợ for-in:

```
var collection = [0, 1, 2];
for (var x in collection) {
  print(x); // 0 1 2
}
```
### While và do-while
Một vòng lặp while đánh giá điều kiện trước vòng lặp:

```
while (!isDone()) {
  doSomething();
}
```
Một do- while đánh giá tình trạng sau vòng lặp:

```
do {
  printLine();
} while (!atEndOfPage());
```

### Break và continue
Sử dụng break để dừng lặp:

```
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```
Sử dụng continue để bỏ qua vòng lặp tiếp theo:

```
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```
Bạn có thể viết ví dụ đó khác đi nếu bạn đang sử dụng Iterable, chẳng hạn như List hoặc Set:

```
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

### Switch và case
Câu lệnh switch trong Dart so sánh các số nguyên, chuỗi hoặc hằng số thời gian biên dịch bằng cách sử dụng ==. Tất cả các đối tượng được so sánh phải là các thể hiện của cùng một lớp (và không thuộc bất kỳ kiểu con nào của nó) và lớp không được ghi đè toán tử ==. Các kiểu enum cũng hoạt động tốt trong switch.

> Lưu ý: Các câu lệnh switch trong Dart được dành cho các trường hợp hạn chế, chẳng hạn như trong trình thông dịch hoặc máy quét.

Mỗi mệnh đề case không trống kết thúc bằng một câu lệnh break, như một quy tắc. Cách hợp lệ khác để chấm dứt một case không rỗng là một câu lệnh continue, throw hoặc return.

Sử dụng mệnh đề default để thực thi mã khi không có case nào khớp:

```
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```
Ví dụ sau bỏ qua câu lệnh break trong mệnh đề case, do đó tạo ra lỗi:

```
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
```
Tuy nhiên, Dart vẫn hỗ trợ các mệnh đề case trống , cho phép một hình thức fall-through:

```
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case falls through.
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```
Nếu bạn thực sự muốn fall-through, bạn có thể sử dụng một lệnh continue kèm label:

```
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // Continues executing at the nowClosed label.

  nowClosed:
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```
Một mệnh đề case có thể có các biến cục bộ, chỉ visible bên trong phạm vi của mệnh đề đó.

### Assert
Trong quá trình phát triển, sử dụng một hàm Assert `assert(condition, optionalMessage)` để phá vỡ sự thực thi bình thường nếu một điều kiện boolean là sai. Bạn có thể tìm thấy các ví dụ về Assert trong suốt series này. Dưới đây là một số chi tiết:

```
// Make sure the variable has a non-null value.
assert(text != null);

// Make sure the value is less than 100.
assert(number < 100);

// Make sure this is an https URL.
assert(urlString.startsWith('https'));
```
Để đính kèm một message vào một Assert, hãy thêm một chuỗi làm đối số thứ hai vào assert.

```
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```
Đối số đầu tiên có thể là bất kỳ biểu thức nào phân giải thành giá trị boolean. Nếu giá trị của biểu thức là đúng, Assert thành công và tiếp tục thực hiện. Nếu nó sai, Assert thất bại và một ngoại lệ (AssertionError) sẽ được throw.

Khi nào Assert làm việc? Điều đó phụ thuộc vào các tool và framework bạn đang sử dụng:

* Flutter cho phép Assert trong chế độ gỡ lỗi.
* Các công cụ chỉ phát triển như dartdevc thường cho phép Assert theo mặc định.
* Một số công cụ, như dart và dart2js, hỗ trợ các xác nhận thông qua command-line flag : --enable-asserts.
Trong mã production, các Assert được bỏ qua và các đối số trong assert không được đánh giá.

Nguồn: https://dart.dev/guides/language/language-tour#control-flow-statements