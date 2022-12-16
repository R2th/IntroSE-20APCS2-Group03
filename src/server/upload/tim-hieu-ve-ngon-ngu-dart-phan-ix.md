## Hỗ trợ bất đồng bộ
Một trong những công việc thường gặp nhất trong phát triển phần mềm đó là xử lý bất đồng bộ. Dart có đầy đủ các hàm trả về các đối tượng Future hoặc Stream . Các chức năng này đều bất đồng bộ : chúng trả về sau khi thiết lập một hoạt động có thể tốn thời gian (chẳng hạn như I/O, thực hiện network call), mà không cần chờ thao tác đó hoàn thành.

Các từ khóa *async* và *await* hỗ trợ lập trình bất đồng bộ, cho phép bạn viết mã bất đồng bộ trông giống với mã đồng bộ.


### Xử lý Future
Khi bạn cần kết quả của một Future sau khi nó hoàn thành, bạn có hai tùy chọn:

* Sử dụng *async* và *await*.
* Sử dụng API Future, như được mô tả tại [đây](https://dart.dev/guides/libraries/library-tour#future).
Code sử dụng *async* và *await* sẽ chạy bất đồng bộ, nhưng nó trông rất giống mã đồng bộ. Ví dụ: đây là một dòng code sử dụng *await* để chờ kết quả của hàm bất đồng bộ:

```
await lookUpVersion();
```
Để sử dụng *await*, mã phải nằm trong một hàm async - hàm được đánh dấu với từ khóa *async*:

```
Future checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```
> Lưu ý: Mặc dù một hàm async có thể thực hiện các hoạt động tiêu tốn thời gian, nhưng nó không chờ các hoạt động đó. Thay vào đó, hàm async chỉ thực thi cho đến khi gặp biểu thức await đầu tiên ([chi tiết](https://github.com/dart-lang/sdk/blob/master/docs/newsletter/20170915.md#synchronous-async-start)). Sau đó, nó trả về một đối tượng Future, chỉ tiếp tục thực hiện sau khi biểu thức await hoàn thành.

Sử dụng *try*, *catch* và *finally* để xử lý các lỗi và dọn dẹp trong mã mà sử dụng await:

```
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```
Bạn có thể sử dụng await nhiều lần trong một hàm async. Ví dụ: đoạn mã sau đợi ba lần cho kết quả của các hàm:

```
var entrypoint = await findEntrypoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```
Trong biểu thức *await*, giá trị của nó biểu thức là một Future; nếu không, thì giá trị sẽ tự động được bao bọc trong Future. Đối tượng Future này cho thấy một lời hứa sẽ trả lại một đối tượng. Giá trị của cả biểu thức await là đối tượng được trả về. Biểu thức await làm cho việc thực thi tạm dừng cho đến khi đối tượng đó sẵn sàng.

**Nếu bạn gặp lỗi runtime khi sử dụng await, hãy đảm bảo await được đặt trong một hàm async**. Ví dụ: để sử dụng await trong main() của ứng dụng , phần thân main() phải được đánh dấu là async:

```
Future main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}

```

### Khai báo các hàm async
Một hàm async là một hàm mà phần thân được đánh dấu bằng các async.

Thêm từ khóa async vào một hàm làm cho nó trả về một Future. Ví dụ, hãy xem xét hàm đồng bộ này, trả về một String:

```
String lookUpVersion() => '1.0.0';
```
Nếu bạn thay đổi nó thành một hàm async, do việc triển khai trong tương lai sẽ tiêu tốn thời gian, giá trị được trả về là Future:

```
Future<String> lookUpVersion() async => '1.0.0';
```
Lưu ý rằng phần thân của hàm không cần sử dụng API Future. Dart tạo ra đối tượng Future nếu cần thiết. Nếu hàm của bạn không trả về giá trị  hãy tạo kiểu trả về của nó Future<Void>.

Để có thể hiểu thêm về việc sử dụng Future, *async*, và *await*, hãy xem [codelab lập trình bất đồng bộ ](https://dart.dev/codelabs/async-await).


### Xử lý Stream
Khi bạn cần nhận các giá trị từ Stream, bạn có hai tùy chọn:

* Sử dụng *async* và một vòng lặp for bất đồng bộ (await for).
* Sử dụng API Stream, như được mô tả tại [đây](https://dart.dev/guides/libraries/library-tour#stream).
    
> Lưu ý: Trước khi sử dụng await for, hãy chắc chắn rằng nó làm cho code rõ ràng hơn và bạn thực sự muốn đợi tất cả các kết quả của luồng. Ví dụ: bạn thường không nên sử dụng await for cho listener của các sự kiện UI, vì framework UI gửi các luồng sự kiện vô tận.

Một vòng lặp không đồng bộ có dạng sau:

```
await for (varOrType identifier in expression) {
  // Executes each time the stream emits a value.
}
```
Giá trị biểu thức phải có kiểu Stream. Tiến hành thực hiện như sau:

1. Đợi cho đến khi luồng phát ra một giá trị.
2. Thực thi phần thân của vòng lặp for, với biến được đặt thành giá trị phát ra đó.
3. Lặp lại 1 và 2 cho đến khi luồng được đóng lại.
    
Để dừng lắng nghe luồng, bạn có thể sử dụng một câu lệnh break hoặc return thoát ra khỏi vòng lặp for và hủy đăng ký khỏi luồng.

Nếu bạn gặp lỗi runtime khi thực hiện vòng lặp for bất đồng bộ, hãy đảm bảo rằng *await for* nằm trong một hàm *async*. Ví dụ: để sử dụng vòng lặp for bất đồng bộ cho hàm main() của ứng dụng , phần thân main() phải được đánh dấu là async:

```
Future main() async {
  // ...
  await for (var request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```
Để biết thêm thông tin về lập trình bất đồng bộ, nói chung, hãy xem phần [Dart: async](https://dart.dev/guides/libraries/library-tour#dartasync---asynchronous-programming).

Lược dịch từ Nguồn: https://dart.dev/guides/language/language-tour#asynchrony-support