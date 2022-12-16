![image.png](https://images.viblo.asia/331a41a9-b048-4654-a175-41b9fb180479.png)

Xử lý những sai lầm của bạn! Ứng dụng của bạn đôi khi sẽ có những lỗi xảy ra. Bạn phải giải quyết chúng. Thật là khủng khiếp. Nếu nó là một lỗi không thể sửa được, ứng dụng của bạn phải chủ động. Nếu nó xảy ra sự cố, ứng dụng của bạn nên cố gắng thực hiện điều đó nhanh chóng. Nó phải cố gắng thể hiện sức mạnh và không bị hỏng nặng - không mất bất kỳ thông tin nào, v.v.

Ứng dụng của bạn cũng phải có trách nhiệm cho khách hàng biết điều gì đã xảy ra và không để chúng hiển thị trên màn hình màu đỏ. Giống như tài liệu hướng dẫn, việc xử lý lỗi đối với tất cả các tài khoản là điều cuối cùng mà các nhà phát triển xem xét khi phát triển phần mềm. Điều đó thật tệ.

Trong blog này, chúng ta sẽ khám phá Xử lý lỗi với future & try-catch block trong Flutter là như thế nào. Chúng ta sẽ xem qua các lỗi bạn có thể gặp, cách bắt và xử lý các lỗi trong Dart, lỗi này cũng hoạt động trong các ứng dụng Flutter.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/xu-ly-loi-voi-future-try-catch-block-flutter/)

## 1. What is Error Handling? (Xử lý lỗi là gì ?)

Xử lý lỗi ám chỉ đến sự kỳ vọng, phát hiện và khắc phục trong lập trình ứng dụng. Các chương trình cụ thể, được gọi là người giám sát lỗi, có thể truy cập được cho một số ứng dụng nhất định. Các chương trình lọai này cản trở các lỗi, phục hồi ngay khi chúng xảy ra mà không kết thúc ứng dụng hoặc nhanh chóng kết thúc một ứng dụng bị ảnh hưởng và lưu dữ liệu lỗi vào log hệ thống.

Các ứng dụng phổ biến được gọi là bộ điều khiển lỗi có thể truy cập được cho các ứng dụng cụ thể để khắc phục lỗi. Các ứng dụng này có thể xảy ra lỗi, do đó giúp khôi phục mà không cần kết thúc của ứng dụng.

Có bốn nguyên tắc phân loại lỗi:

* Logical errors
* Generated errors
* Compile-time errors
* Runtime errors

Việc xử lý lỗi quan tâm đến các thủ tục cho các lỗi nâng cao kết hợp chỉnh sửa kỹ lưỡng. Ngoài ra, nó còn được biết đến các chiến lược cho các lỗi hoặc lỗi cơ bản thường được thực hiện bằng cách debug hoặc điều tra ứng dụng. Xử lý lỗi đối phó với các ứng dụng có thể giải quyết runtime errors hoặc ảnh hưởng của chúng bị hạn chế bằng cách nhận các biện pháp đối phó hợp lý. Hầu hết các ứng dụng phần cứng đều kết hợp xử lý lỗi với một hệ thống cho phép chúng khôi phục trơn tru khỏi các lỗi không lường trước được.

## 2. Xử lý lỗi với Future

`Future` trong Dart được mô tả như một object giải quyết việc tính toán bị hoãn lại (hoặc được hiểu là bất đồng bộ). Nó được sử dụng để giải quyết một giá trị hoặc một lỗi sẽ có thể truy cập sau. Nói chung, nó được sử dụng cho các nhiệm vụ cần thời gian để hoàn thành, chẳng hạn như đưa thông tin qua mạng hoặc duyệt qua hồ sơ. Các nhiệm vụ đó sẽ thông minh hơn khi được thực hiện bất đồng bộ và được bao bọc bởi một function trả về Future vì bạn có thể đặt các hoạt động bất đồng bộ bên trong một function trả về Future. Dart đề cao cả thiết kế `Future` và `async/await`.

Trong khi hàm đang được thực thi, nó có thể gặp lỗi. Bạn có thể phải nhận lỗi và tìm ra những gì cần làm nếu xảy ra sai sót. Sau đây là các ví dụ về cách xử lý lỗi trong Future. Đối với bài hướng dẫn này, chúng tôi sẽ sử dụng chức năng và ngoại lệ (exception) bên dưới.

```
class MyException implements Exception {}

Future<String> myErrorFunction() async {
	return Future.error(new MyException(), StackTrace.current);
}
```

Trong đoạn mã kết thúc, hàm ném MyException sử dụng Future.error, với StackTrace được bổ sung để bạn dễ dàng biết được chỗ nào đang xảy ra lỗi.

## 3. Làm thế nào để sử dụng then's onError:

Giả sử bây giờ bạn đã làm quen với Dart’s Future, bạn phải gặp tiếp phương thức `then`. Nó cho phép bạn vượt qua một callback sẽ được xem xét khi Future kết thúc. Nếu bạn nhìn lướt qua signature của then, sẽ có một boundary tùy ý onError. Callback được truyền dưới dạng đối số onError sẽ được xem xét khi Future kết thúc với lỗi.

Callback onError phải thừa nhận một vài tham số. Nếu nó thừa nhận một boundary, nó sẽ được gọi với lỗi. Nếu nó thừa nhận hai tham số, nó sẽ được gọi với lỗi và stack trace. Callback cần trả về một giá trị hoặc Future.

```
Future<R> then<R>(FutureOr<R> onValue(T value), {Function? onError});
```

Mã bên dưới `myErrorFunction` ném MyException. Lỗi sẽ được nhận bởi callback onError. Bên trong callback, bạn có thể nhận được thông tin chi tiết về lỗi và StackTrace. Bạn cũng có thể đặt giá trị để trả về bên trong lệnh callback.

```
myErrorFunction()
.then(
(value) => print('Value: $value'),
onError: (Object e, StackTrace stackTrace) {
print(e.toString());
return 'Another value';
},
)
.then(print);
```

Khi chúng tôi chạy ứng dụng, chúng tôi có thể nhận được output của màn hình như đoạn mã màn hình bên dưới.

```
Instance of 'MyException'
#0      myErrorFunction (file:///home/aeologic/Projects/test-dart/src/error.dart:9:53)
#1      _delayEntrypointInvocation.<anonymous closure> (dart:isolate-patch/isolate_patch.dart:283:19)
#2      _RawReceivePortImpl._handleMessage (dart:isolate-patch/isolate_patch.dart:184:12)
Another value
```

## 4. Tại sao chúng ta nên sử dụng catchError?

Future has a strategy called `catchError` which is utilized to deal with errors transmitted by the `Future`. It’s what asynchronous be compared to a catch block.

Future có một chiến lược được gọi là `catchError` được sử dụng để xử lý các lỗi do Future truyền đi. Nó là những gì bất đồng bộ được so sánh với một catch block.

```
Future<T> catchError(Function onError, {bool test(Object error)?})
```

Bạn cần chuyển một callback sẽ được gọi khi `Future` phát ra lỗi. Giống như callback `onError` của `then` trong ví dụ trước, callback được truyền vào có thể có một hoặc hai tham số. Khi callback được gọi, lỗi được chuyển làm đối số đầu tiên. Nếu callback chấp nhận hai tham số, stack trace sẽ được chuyển làm đối số thứ hai. Dưới đây là một ví dụ không có đối số `test`.

```
myErrorFunction()
.catchError((Object e, StackTrace stackTrace) {
print(e.toString());
return 'Another value';
})
.then(print);
```

Output của code trên phải giống với đầu ra của ví dụ trước.

Như bạn có thể thấy trên, nó cũng nhận một `test` đối số tùy ý. Đối với tranh chấp đó, bạn có thể chuyển một hàm xác nhận lỗi làm boundary và trả về bool. Nếu đối số kiểm tra được chuyển qua và callback đánh giá là hợp lệ, thì callback onError (callback được truyền làm đối số chính) sẽ được gọi. Một điều khác nữa, nếu callback kiểm tra đánh giá là false, callback onError sẽ không được gọi và `Future` trả về kết thúc với lỗi tương tự và theo dõi ngăn xếp. Nếu đối số kiểm tra không được thông qua, đối số này sẽ mặc định là một kỹ thuật trả về `true`. Sau đây là một mô hình khác, trong đó sự cạnh tranh thử nghiệm được thông qua.

```
myErrorFunction()
.catchError(
(Object e, StackTrace stackTrace) {
print(e.toString());
return 'Another value';
},
test: (Object error) => error is MyException
)
.then(print);
```

Output của code trên phải giống với đầu ra của ví dụ trước.

## 5. Làm thế nào để sử dụng `onError`:

Ngoài `Future` ra, có một kỹ thuật khác được gọi là onError. Nó rất thường được sử dụng để giải quyết các lỗi do Future gây ra.

```
Future<T> onError<E extends Object>(
FutureOr<T> handleError(E error, StackTrace stackTrace),
{bool test(E error)?})
```

Giá trị bạn cần truyền vào làm tham số chính cũng giống như các mô hình trước đây, một công việc callback dung nạp một vài boundary . Điều quan trọng là công việc callback cần trả về một giá trị có kiểu tương đương với kiểu trả về của Future trong quá khứ. Giống như catchError, nó thừa nhận đối số kiểm tra tùy ý được sử dụng để xử lý xem liệu callback được truyền có nên xử lý lỗi đã xử lý hay không. Trong bất kỳ trường hợp nào, bạn cũng có thể chỉ ra một loại lỗi cụ thể sẽ nhận được khi bỏ qua một generic sort (ví dụ: `.onError<MyException>` ). Tất cả các lỗi có loại lỗi thay thế sẽ không được xử lý.

```
myErrorFunction()
.onError<MyException>(
(Object e, StackTrace stackTrace) {
print(e.toString());
return 'Another value';
},
test: (Object error) => error is MyException
);
```

Output của code trên phải giống với đầu ra của ví dụ trước.

## 6. Sử dụng whenComplete:

Trong khi các đối ứng của catchError đều nhận vào 1 block, thì `whenComplete` là thứ có thể được so sánh với `finally`. Do đó, nếu code sẽ được thực thi cho dù Future có kết thúc với lỗi hay không, bạn có thể sử dụng WhenComplete.

```
Future<T> whenComplete(FutureOr<void> action());
```

Hãy xem một bản demo bên dưới:

```
myErrorFunction()
.catchError(
(Object e, StackTrace stackTrace) {
print(e.toString());
},
test: (Object error) => error is MyException
)
.whenComplete(() { print('complete'); })
.then(print);
```

Khi chúng tôi chạy ứng dụng, chúng tôi phải nhận được output của màn hình như đoạn code màn hình bên dưới:

```
Instance of 'MyException'
#0     myErrorFunction (file:///home/aeologic/Projects/test-dart/src/error.dart:9:53)
#1      _delayEntrypointInvocation.<anonymous closure> (dart:isolate-patch/isolate_patch.dart:283:19)
#2      _RawReceivePortImpl._handleMessage (dart:isolate-patch/isolate_patch.dart:184:12)
complete
```

## 7. Xử lý lỗi với Try-Catch Block:

Đối với code bất đồng bộ có kiểu async / await hoặc đối với code không bất đồng bộ, bạn có thể sử dụng try-catch-finally block, điều này cũng rất bình thường trong các ngôn ngữ lập trình khác. Dart’s catch thừa nhận có thể có một vài thông số. Nếu có lỗi được đưa ra, lỗi sẽ được chuyển làm đối số chính. Nếu khối bắt thừa nhận hai boundary, StackTrace sẽ được chuyển làm đối số thứ hai.

```
try {
await myErrorFunction();
} catch (e, stackTrace) {
print(e.toString());
} finally {
print('complete');
}
```

## Tóm lại

Phần kết luận:‌‌Trong bài viết này, tôi đã giải thích các cấu trúc cơ bản của Streams And Sinks trong Dart & Flutter; bạn có thể sửa đổi code này theo sự lựa chọn của bạn. Đây là phần giới thiệu nhỏ về Streams và Sinks trong Dart & Flutter khi user tương tác từ tôi và nó đang hoạt động khi sử dụng Flutter.

Tôi hy vọng blog này sẽ cung cấp cho bạn đầy đủ thông tin về Streams và Sinks trong Dart & Flutter trong các dự án flutter của bạn. Đó là cách xử lý lỗi trong Dart / Flutter. Đối với mã không đồng bộ hoặc mã không đồng bộ có kiểu async / await, bạn có thể sử dụng try-catch-finally block. Khi sử dụng Future, bạn có thể chuyển một callback khi sau đó `onError` đối số để xử lý lỗi. Tương tự như vậy, bạn có thể sử dụng catchError và whenComplete là những tác nhân có đi có lại của catch và `finally` là riêng biệt. Vì vậy, hãy thử nó.‌‌❤ ❤ Cảm ơn đã đọc bài viết này ❤❤

Bài viết được dịch từ: [Error Handling With Future & Try-Catch Block In Dart](https://medium.com/flutterdevs/error-handling-with-future-try-catch-block-in-dart-62671f824141)