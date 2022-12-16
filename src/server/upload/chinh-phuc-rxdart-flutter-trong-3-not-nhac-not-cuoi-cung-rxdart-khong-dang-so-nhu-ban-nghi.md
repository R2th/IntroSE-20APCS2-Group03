# Lời mở đầu
Như mình đã nói ở [bài 1](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-1-stream-va-giai-thich-cac-thuat-ngu-Ljy5Vq6blra#_1-stream-la-gi-event-la-gi-1): RxDart là một package cung cấp thêm một số class và function để tăng cường sức mạnh cho Stream. Các bạn chú ý là nó chỉ cung cấp thêm sức mạnh cho `Stream` chứ bản chất RxDart không tạo ra thứ gì thay thế `Stream` nhé. Điều đó đồng nghĩa là bạn muốn hiểu RxDart thì trước tiên bạn phải hiểu `Stream` và một khi đã hiểu rõ về `Stream` thì RxDart nó sẽ không còn đáng sợ nữa :D. Nếu bạn còn lạ lẫm với `Stream`, bạn có thể tìm đọc lại [bài 1](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-1-stream-va-giai-thich-cac-thuat-ngu-Ljy5Vq6blra#_1-stream-la-gi-event-la-gi-1) và [bài 2](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W) của series này để hiểu về `Stream`.

# 1. Thêm package vào dự án
Link package: https://pub.dev/packages/rxdart

Thời điểm mình viết bài này thì latest version của RxDart là 0.24.1 nên mình sẽ sử dụng version này để code demo.

Thêm package vào file `pubspec.yaml` rồi chạy `pub get` để nạp package vào dự án
```dart
  rxdart: ^0.24.1
```

Thêm thư viện xong rồi thì vào file source code import RxDart vào:
```dart
import 'package:rxdart/rxdart.dart';
```
# 2. Tổng quan về RxDart
RxDart là một thư viện cung cấp một lượng class và function rất đồ sộ cho Stream. Vì vậy để dễ thấm được tất cả tuyệt đỉnh kungfu từ RxDart, ta sẽ chia ra 3 nhóm nhỏ để học. Mỗi nhóm nhỏ mình sẽ giới thiệu 1 số class, function đại diện và từ đó các bạn sẽ có nền để chinh phục được tất cả class, function trong mỗi nhóm.

**Nhóm 1 - Những class Stream do RxDart cung cấp**: nó cung cấp những lớp Stream đặc biệt mạnh mẽ hơn lớp `Stream` của Dart rất nhiều như `ZipStream`, `MergeStream`, `ConcatStream`, ....

**Nhóm 2 - Những extension function dành cho lớp Stream**: Ở bài 2 mình đã chia sẻ [rất nhiều function của Stream](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_1-stream-operators-1) rồi nhưng nhiêu đó chưa đủ sài đâu, RxDart nó cung cấp thêm cho chúng ta hơn 50 function nữa. Học xong đống function của nó có mà xưng bá võ lâm :D

**Nhóm 3 - Subjects**: Đây là thuật ngữ mới nhưng bản chất nó chính là các [StreamController](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_3-stream-controlller-15) trong Dart với nhiều sức mạnh lợi hại hơn :D

# 3. Những class Stream của RxDart
Ở đây, mình sẽ giới thiệu một số class đại diện và hay dùng để từ đó các bạn sẽ có nền để chinh phục được tất cả class. Trong dự án thực tế, chỉ có 1 số ít class là hay sử dụng thôi chứ cũng không cần phải học hết đâu :D

Trước tiên, mình muốn giới thiệu 1 trang webapp: https://rxmarbles.com/#merge .Trang này cực kỳ tiện để hiểu các function này hoạt động thế nào bằng cách di chuyển các data (1, 2, 3, 4,...) trong 1 stream. Mặc dù nó sử dụng RxJs tuy nhiên RxJs hay RxDart hay RxJava thì nó cũng giống nhau hết. Hôm nay các bạn học RxDart thì cũng tức là các bạn đã học được cả RxJs và RxJava rồi. Ví dụ link trên là giúp bạn hiểu hàm `merge`. Có rất nhiều hàm trong đó đang chờ bạn khám phá và sẽ còn được tác giả cập nhật thêm nữa :D

## 3.1. MergeStream
Mình mượn cái ảnh trong https://rxmarbles.com/#merge rồi chú thích vào, Stream ở chỗ nào, tạo ra Output Stream chỗ nào, event ở chỗ nào, các function sau cứ thế mà khám phá nhá :D

![](https://images.viblo.asia/900e145f-3e5c-4f3c-a517-9ef96ddeced5.jpg)

Nhìn hình là các bạn đủ hiểu rồi phải ko :D. Ở đây ta có 2 stream gọi là `Stream 1` và `Stream 2` chạy song song nhau và 2 stream đó được **merge lại thành 1 MergeStream, các event trong MergeStream được emit theo thứ tự đúng y hệt dòng thời gian của Stream 1 và Stream 2**. Thực tế bạn thích truyền bao nhiêu Stream vào `MergeStream` để merge lại cũng được. Ở đây mình sẽ merge 2 stream lại bằng cách dựng code giống hệt cái ảnh trên cho các bạn dễ hiểu.
```dart
void main() {
  // biến này để làm cột mốc thời gian lúc bắt đầu run chương trình
  var currentTime = DateTime.now();

  var mergeStream = MergeStream([firstStream(), secondStream()]); // truyền 2 stream vào đây để merge lại
  mergeStream.listen((event) => println(event, currentTime));
}

// stream 1
Stream<int> firstStream() async* {
  await Future.delayed(Duration(seconds: 1)); // 1s sau sẽ emit event đầu tiên
  yield 20; // emit 20 vào giây thứ 1
  await Future.delayed(Duration(seconds: 1)); // nghỉ 1 giây
  yield 40; // emit 40 vào giây thứ 2
  await Future.delayed(Duration(seconds: 2));
  yield 60; // emit 60 vào giây thứ 4
  await Future.delayed(Duration(seconds: 6));
  yield 80; // emit 80 vào giây thứ 10
  await Future.delayed(Duration(seconds: 3));
  yield 100; // emit 100 vào giây thứ 13
}

// stream 2
Stream<int> secondStream() async* {
  await Future.delayed(Duration(seconds: 7)); // sau 7s sẽ emit event đầu tiên
  yield 1;
  await Future.delayed(Duration(seconds: 9));
  yield 1;
}

// mình sử dụng hàm println này để in kèm thời điểm emit event cho dễ quan sát output
void println(Object value, DateTime currentTime) {
  print('Emit $value vào giây thứ ${DateTime.now().difference(currentTime).inSeconds}');
}
```
Output giống hệt `MergeStream` trong cái ảnh trên :D.
```
Emit 20 vào giây thứ 1
Emit 40 vào giây thứ 2
Emit 60 vào giây thứ 4
Emit 1 vào giây thứ 7
Emit 80 vào giây thứ 10
Emit 100 vào giây thứ 13
Emit 1 vào giây thứ 16
```

Ngoài cách trên ra, RxDart lúc nào cũng đi kèm 1 hàm static để bạn thay đổi khẩu vị: `Rx.merge()`. Output chả khác gì cách dùng class `MergeStream` cả. Bạn có thể kiểm chứng bằng cách replace dòng code `var mergeStream = MergeStream([firstStream(), secondStream()]);` bằng dòng code rồi run lại chương trình:
```dart
var mergeStream = Rx.merge([firstStream(), secondStream()]);
```
## 3.2. ZipStream
Lại thêm 1 cái ảnh kèm đường link rxmarbles là đủ hiểu: https://rxmarbles.com/#zip :D

![](https://images.viblo.asia/53c3f78b-e8ea-48dd-804f-d49780d30cbb.jpg)

Nhìn vào ảnh có thể hiểu có 2 Stream là `Stream 1` và `Stream 2` chạy song song, 2 Stream này cũng được merge lại thành 1 `ZipStream`. 
* Phần tử thứ 1 của Stream 1 sẽ kết hợp với phần tử thứ 1 bên Stream 2
* Phần tử thứ 2 của Stream 1 sẽ kết hợp với phần tử thứ 2 bên Stream 2
* Phần tử thứ 3 của Stream 1 sẽ kết hợp với phần tử thứ 3 bên Stream 2
* Phần tử thứ 4 của Stream 1 sẽ kết hợp với phần tử thứ 4 bên Stream 2
* Phần tử thứ 5 của Stream 1 không có ai để kết hợp vì Stream 2 đã hết event.

Mỗi khi có 1 sự kết hợp thành công thì ZipStream sẽ emit event tổng hợp từ 2 event của Stream 1 và Stream 2. Hàm tổng hợp sẽ do chúng ta truyền vào.
```dart
// truyền vào 1 mảng Stream và 1 hàm kết hợp (zipper)
ZipStream(
    [
      Stream.fromIterable(['1', '2', '3', '4', '5']),
      Stream.fromIterable(['A', 'B', 'C', 'D']),
    ], (values) => values.join(), // hàm kết hợp zipper
  ).listen(print); // prints 1A, 2B, 3C, 4D
```

Ngoài ra, nếu bạn biết rõ số lượng stream cần zip lại thì bạn có thể sử dụng các constructor khác của `ZipStream` như `ZipStream.zip2`, `ZipStream.zip3`, ..., `ZipStream.zip9`. Ví dụ ở đây mình zip 3 stream:
```dart
ZipStream.zip3(
    Stream.fromIterable([1, 2]),
    Stream.fromIterable([3, 4, 5]),
    Stream.fromIterable([6, 7, 8]),
        (a, b, c) => a + b + c, // tính tổng 3 số lại
  ).listen(print);
```
Output:
```
10 // vì 1 + 3 + 6
13 // vì 2 + 4 + 7
```

Mình khuyến khích sử dụng cách này thay cho cách trên. Vì dùng cách này thì lambda `(a, b, c) => a + b + c` cho ta cả 3 biến độc lập `a, b, c` và mình thoải mái sử dụng thích làm gì cũng được. Còn cách trên thì lambda chỉ có 1 biến kiểu List là `values`: `(values) => values.join()`, sẽ không được thoải mái lắm.

Cũng giống như merge, RxDart cũng cung cấp hàm static `Rx.zip` để bạn đổi khẩu vị:
```
Rx.zip(
    [
      Stream.fromIterable(['1', '2', '3', '4', '5']),
      Stream.fromIterable(['A', 'B', 'C', 'D']),
    ], (values) => values.join(), // hàm kết hợp zipper
  ).listen(print); // prints 1A, 2B, 3C, 4D

  // hoặc dùng hàm zip2, zip3, ..., zip9
  Rx.zip2(Stream.fromIterable(['1', '2', '3', '4', '5']),
      Stream.fromIterable(['A', 'B', 'C', 'D']), 
          (a, b) => a + b) // hàm kết hợp zipper
      .listen(print); // prints 1A, 2B, 3C, 4D
```
## 3.3. TimerStream
Truyền vào 1 value, và 1 duration. Sau 1 khoảng thời gian duration đó Stream mới emit value được truyền vào.
```dart
TimerStream('hi', Duration(seconds: 5))
    .listen((i) => print(i)); // print 'hi' sau 5 giây
```
Tương tự các hàm trên ta cũng có hàm static: `Rx.timer`
## 3.4. RangeStream
Truyền vào 2 biến: `startInclusive` và `endInclusive` để tạo thành 1 range. `RangeStream` sẽ emit một chuỗi các số nguyên liên tiếp trong range đó. Ví dụ sau đây mình sẽ emit một chuỗi số nguyên từ 1 đến 6.
```dart
RangeStream(1, 6).listen((i) => print(i)); // Print: 1, 2, 3, 4, 5, 6
```
Tương tự các hàm trên ta cũng có hàm static: `Rx.range`
## 3.5. RetryStream
Truyền vào 1 stream. Khi stream được truyền vào gặp lỗi `RetryStream` sẽ cho retry lại nó. Chúng ta có thể truyền thêm 1 biến `count` chính là số lần được phép retry. Nếu không truyền biến `count` thì nó sẽ retry mãi mãi.
```dart
void main() {
  RetryStream(() { return errorStream(); }, 2) // truyền vào số 2 có nghĩa là được phép retry 2 lần
      .listen(print, onError: print);
}

Stream<int> errorStream() async* {
  yield 10;
  throw FormatException('abc'); // lỗi ở đây
  yield 11; // 11 mãi ko được in ra
}
```
Output:
```
10 // lần 1 in ra gặp lỗi nên sẽ retry lần 1
10 // retry lại 1 lần vẫn gặp lỗi nên sẽ retry lần 2
10 // retry lại 2 lần vẫn gặp lỗi nên cho ném lỗi luôn
Received an error after attempting 2 retries // bắn lỗi ra sau 2 lần retry thất bại
```
Tương tự các hàm trên ta cũng có hàm static: `Rx.retry`

Như vậy là mình đã giới thiệu qua các class lợi hại của RxDart. Bạn có thể học thêm những class khác [tại đây](https://pub.dev/packages/rxdart#stream-classes).
# 4. Những extension function của RxDart
Đối với extention function cũng vậy, mình sẽ giới thiệu một số function đại diện và hay dùng để từ đó các bạn sẽ có nền để chinh phục được tất cả function. Và mình sẽ cố gắng chia sẻ những function không được chia sẻ ở phần 3 (ví dụ như function [zipWith](https://pub.dev/documentation/rxdart/latest/rx/ZipWithExtension/zipWith.html) có cùng công dụng với class `ZipStream` ở trên).
## 4.1. debounceTime
Link rxmarbles: https://rxmarbles.com/#debounceTime

![](https://images.viblo.asia/9d605627-8640-43cf-9e4a-f2e728a91952.jpg)

Hàm này cho phép chúng ta truyền vào 1 Duration, cụ thể trong hình là 10s. Nếu Source Stream emit ra 1 event mà sau 10s nó không emit tiếp 1 event khác thì Output Stream mới emit event đó ra. Hàm này cực kỳ hữu ích để làm tính năng live search cho app (real time search) bởi vì app sẽ tránh spam server do call API quá nhiều. Cụ thể ví dụ sau mình sẽ mô phỏng lại quá trình live search của user.
```dart
void main() {
   // 500ms sau mà user không gõ nữa thì sẽ call API search
  demoStream().debounceTime(Duration(milliseconds: 500)).listen((event) { 
    // call API search với keyword
    print('call API search với keyword: $event');
  });
}


// stream mô phỏng lúc user đang gõ text vào TextField để search
Stream<String> demoStream() async* {
  yield 'L'; // gỡ chữ L
  yield 'Le'; // gõ thêm chữ e
  yield 'Lea'; // gõ thêm chữ a
  yield 'Lear'; // gõ thêm chữ r
  yield 'Learn'; // gõ thêm chữ n
  await Future.delayed(Duration(seconds: 1)); // dừng gõ 1 giây
  yield 'Learn R'; // tiếp tục gõ dấu space và chữ R
  yield 'Learn Rx'; // gõ tiếp chữ x
  yield 'Learn RxD'; // gõ tiếp chữ D
  yield 'Learn RxDa'; // gõ tiếp chữ a
  yield 'Learn RxDar'; // gõ tiếp chữ r
  yield 'Learn RxDart'; // gõ tiếp chữ t
}
```
Output:
```
call API search với keyword: Learn
call API search với keyword: Learn RxDart
```
## 4.2. onErrorResumeNext
Hàm này truyền vào 1 Stream gọi là `recoveryStream` đi ha. Khi Source Stream gặp lỗi thay vì nó emit cái `event lỗi` đó thì nó lại vào emit các phần tử trong `recoveryStream`. Các bạn để ý code dưới đây, `onError` không print ra gì cả.
```dart
void main() {
  errorStream().onErrorResumeNext(Stream.fromIterable([11, 22, 33])).listen(print, onError: print);
}

Stream<int> errorStream() async* {
  yield 1;
  yield 2;
  throw FormatException('lỗi rồi');
  yield 3;
}
```
Output. 
```
1
2
11
22
33
```
## 4.3. interval
Hàm này truyền vào 1 duration. Cứ sau khoảng thời gian duration đó thì nó mới emit ra 1 event.
```dart
Stream.fromIterable([1, 2, 3])
  .interval(Duration(seconds: 1)) // cứ 1 giây emit ra 1 event
  .listen((i) => print('$i giây'); // prints 1 giây, 2 giây, 3 giây
```
## 4.4. concatWith
Link rxmarbles: https://rxmarbles.com/#concat

![](https://images.viblo.asia/45069a64-88b6-4b19-8f9e-08ab70381f0d.JPG)

Merge 2 stream lại thành 1 ConcatStream và emit tất cả event trong lần lượt từng stream một. Sau khi emit xong tất cả event của Stream 1, thì ConcatStream vẫn chờ `x giây` (trong hình) mới emit phần tử đầu tiên của Stream 2 chứ không emit ngay lập tức. Chính vì vậy tổng thời gian của `t1` (thời gian stream 1 dừng) + `t2` (thời gian stream 2 dừng) = `t3` (thời gian ConcatStream dừng). 
```dart
void main() {
  // biến này để làm cột mốc thời gian lúc bắt đầu run chương trình
  var currentTime = DateTime.now();

  var mergeStream = firstStream().concatWith([secondStream()]); // truyền vào 1 List Stream
  mergeStream.listen((event) => println(event, currentTime));
}

// stream 1
Stream<int> firstStream() async* {
  await Future.delayed(Duration(seconds: 1));
  yield 20; // emit 20 vào giây thứ 1
  await Future.delayed(Duration(seconds: 1));
  yield 40; // emit 40 vào giây thứ 2
  await Future.delayed(Duration(seconds: 2));
  yield 60; // emit 60 vào giây thứ 4
  await Future.delayed(Duration(seconds: 6));
  yield 80; // emit 80 vào giây thứ 10
  await Future.delayed(Duration(seconds: 3));
  yield 100; // emit 100 vào giây thứ 13
}

// stream 2
Stream<int> secondStream() async* {
  await Future.delayed(Duration(seconds: 7)); // emit 100 vào giây thứ 20
  yield 1;
  await Future.delayed(Duration(seconds: 9)); // emit 100 vào giây thứ 29
  yield 1;
}

// mình sử dụng hàm println này để in kèm thời điểm emit event cho dễ quan sát output
void println(Object value, DateTime currentTime) {
  print('Emit $value vào giây thứ ${DateTime.now().difference(currentTime).inSeconds}');
}
```
Output. Mất 13s để emit hết event trong stream 1 và mất tiếp 16s để emit hết event trong stream 2. Vậy mất tất cả 29s
```
Emit 20 vào giây thứ 1
Emit 40 vào giây thứ 2
Emit 60 vào giây thứ 4
Emit 80 vào giây thứ 10
Emit 100 vào giây thứ 13
Emit 1 vào giây thứ 20
Emit 1 vào giây thứ 29
```
## 4.5. distinctUnique
Link rxmarbles: https://rxmarbles.com/#distinct

![](https://images.viblo.asia/e25fe46f-dfde-4bd6-aa9e-f105da402539.JPG)

Mình từng giới thiệu về [hàm distinct có sẵn trong lớp Stream của Dart](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_5-distinct-13) rồi. Còn hàm `distinctUnique` là thuộc thư viện RxDart. Hai hàm này khác nhau nhé. Khác nhau ở chỗ:

Hàm `distinct` của Dart dùng để skip (bỏ qua) các phần tử mà chúng equal (bằng) với phần tử đã được emit trước đó (the previous element). Vâng nó chỉ so sánh với đúng 1 phần tử đứng liền trước đó thôi. Nếu bằng nhau thì nó skip

Còn hàm `distinctUnique` của RxDart dùng để emit các phần tử không trùng nhau trong Source Stream. 

Ok, giờ mình sẽ dựng code giống hệt cái ảnh trên dùng cả 2 hàm là `distinct` và `distinctUnique`
```dart
void main() {
  // dùng distinct
  Stream.fromIterable([1, 2, 2, 1, 3]).distinct()
      .listen(print); // print: 1, 2, 1, 3

  // dùng distinctUnique
  Stream.fromIterable([1, 2, 2, 1, 3]).distinctUnique()
      .listen(print); // print: 1, 2, 3
}
```

Như vậy là mình đã giới thiệu qua các extension function lợi hại của RxDart. Bạn có thể học thêm những extension function khác [tại đây](https://pub.dev/packages/rxdart#extension-methods)
# 5. Subjects
Như mình đã giới thiệu ở trên, Subjects bản chất là [StreamController](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_3-stream-controlller-15). Trong RxDart có 3 loại Subjects là: `BehaviorSubject`, `ReplaySubject` và `PublishSubject`
## 5.1. BehaviorSubject
Đây cũng là một [Broadcast StreamController](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_4-broadcast-streamcontroller-16). Đặc điểm của thằng này là mỗi khi có một listener mới subscribe thì nó lập tức emit phần tử mới nhất vừa được add vào controller (the latest item that has been added to the controller)

![](https://images.viblo.asia/acf3e451-4eb9-41dd-9e39-deb6e12685f2.png)

Xem hình khó hiểu quá thì xem code, xem code khó hiểu quá thì lại lên xem hình sẽ hiểu ngay =))
```dart
// tạo BehaviorSubject
var streamController = BehaviorSubject();

void main() {
  // subscription thứ nhất
  streamController.stream.listen((event) {
    println('thứ 1: $event');
  });

  // 2 giây sau sẽ tạo subscription thứ hai
  createSecondSubscription();

  // cứ mỗi 600 ms sẽ push 1 data từ 0 cho đến 4
  streamController.sink.addStream(RangeStream(0, 4).interval(Duration(milliseconds: 600)));
}

void createSecondSubscription() async {
  Future.delayed(Duration(seconds: 2), () {
    println('tạo ra subscription thứ 2');
    streamController.stream.listen((event) {
      println('subscription thứ 2: ${event + event}'); // double value lên
    });
  });
}

// mình sử dụng hàm println này để in ra thời gian hiện tại cho dễ quan sát output
void println(Object value) {
  print('${DateTime.now()}: $value');
}
```
Output: Quan sát output có thể thấy ngay thời điểm 8 phút 51 giây thì subscription thứ 2 mới được tạo ra mà nó vừa tạo ra là nó chụp luôn cái data `số 2` để double lên thành `số 4`. Mặc dù data `số 2` được sinh ra trước khi `subscription thứ 2` chào đời gần 1 giây. Đúng là vừa sinh ra đã đi ăn cướp :D
```
2020-08-30 15:08:49.728767: thứ 1: 0
2020-08-30 15:08:50.330743: thứ 1: 1
2020-08-30 15:08:50.932222: thứ 1: 2
2020-08-30 15:08:51.117602: tạo ra subscription thứ 2
2020-08-30 15:08:51.118510: subscription thứ 2: 4
2020-08-30 15:08:51.533267: thứ 1: 3
2020-08-30 15:08:51.533267: subscription thứ 2: 6
2020-08-30 15:08:52.133810: thứ 1: 4
2020-08-30 15:08:52.133810: subscription thứ 2: 8
```

Ngoài ra, BehaviorSubject còn có 1 constuctor khác là `BehaviorSubject.seeded`. Khi sử dụng constructor này thì mặc định mới vào controller sẽ được add 1 phần tử được truyền vào hàm `seeded`.
```dart
// tạo BehaviorSubject sử dụng seeded
var streamController = BehaviorSubject.seeded(333);

void main() {
  // subscription
  streamController.stream.listen(print);

  // cứ mỗi 600 ms sẽ push 1 data từ 0 cho đến 2
  streamController.sink.addStream(RangeStream(0, 2).interval(Duration(milliseconds: 600)));
}
```
Output:
```
333
0
1
2
```
## 5.2. ReplaySubject
Đây cũng là một Broadcast StreamController. Thằng này còn bá đạo hơn thằng BehaviorSubject là vừa chào đời không những nó chụp 1 data mới nhất mà nó chụp tất cả data đã được add vào controller luôn.

![](https://images.viblo.asia/be65d365-78c9-4803-96d1-0df2a7af1241.png)

```dart
// tạo ReplaySubject
var streamController = ReplaySubject();

void main() {
  // subscription thứ nhất
  streamController.stream.listen((event) {
    println('thứ 1: $event');
  });

  // 2 giây sau sẽ tạo subscription thứ hai
  createSecondSubscription();

  // cứ mỗi 600 ms sẽ push 1 data từ 0 cho đến 4
  streamController.sink.addStream(RangeStream(0, 4).interval(Duration(milliseconds: 600)));
}

void createSecondSubscription() async {
  Future.delayed(Duration(seconds: 2), () {
    println('tạo ra subscription thứ 2');
    streamController.stream.listen((event) {
      println('subscription thứ 2: ${event + event}'); // double value lên
    });
  });
}

// mình sử dụng hàm println này để in ra thời gian hiện tại cho dễ quan sát output
void println(Object value) {
  print('${DateTime.now()}: $value');
}
```
Output. Ngay thời điểm `tạo ra subscription thứ 2` nó chụp luôn tất cả data từ 0 đến 2 để double lên `0, 2, 4`.
```
2020-08-30 15:18:57.738695: thứ 1: 0
2020-08-30 15:18:58.338941: thứ 1: 1
2020-08-30 15:18:58.940654: thứ 1: 2
2020-08-30 15:18:59.124769: tạo ra subscription thứ 2
2020-08-30 15:18:59.126769: subscription thứ 2: 0
2020-08-30 15:18:59.126769: subscription thứ 2: 2
2020-08-30 15:18:59.126769: subscription thứ 2: 4
2020-08-30 15:18:59.542143: thứ 1: 3
2020-08-30 15:18:59.542143: subscription thứ 2: 6
2020-08-30 15:19:00.143433: thứ 1: 4
2020-08-30 15:19:00.143433: subscription thứ 2: 8
```
## 5.3. PublishSubject
![](https://images.viblo.asia/79af63f5-e3ed-45f9-adc9-09d814c8bde8.png)

Thằng này chính xác là nó rất giống một [Broadcast StreamController](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W#_4-broadcast-streamcontroller-16) thông thường. Có nghĩa là lúc subscription thứ 2 được tạo ra nó sẽ không chôm chĩa bất cứ data nào trước đó của controller mà nó chờ có data mới được add vào controller nó mới nhận.
```dart
// tạo PublishSubject
var streamController = PublishSubject();

void main() {
  // subscription thứ nhất
  streamController.stream.listen((event) {
    println('thứ 1: $event');
  });

  // 2 giây sau sẽ tạo subscription thứ hai
  createSecondSubscription();

  // cứ mỗi 600 ms sẽ push 1 data từ 0 cho đến 4
  streamController.sink.addStream(RangeStream(0, 4).interval(Duration(milliseconds: 600)));
}

void createSecondSubscription() async {
  Future.delayed(Duration(seconds: 2), () {
    println('tạo ra subscription thứ 2');
    streamController.stream.listen((event) {
      println('subscription thứ 2: ${event + event}'); // double value lên
    });
  });
}

// mình sử dụng hàm println này để in ra thời gian hiện tại cho dễ quan sát output
void println(Object value) {
  print('${DateTime.now()}: $value');
}
```
Thay vì sử dụng `PublishSubject`: `var streamController = PublishSubject();` thì các bạn sử dụng Broadcast StreamController thông thường thế này: `var streamController = StreamController.broadcast();` nó đều sẽ cho ra cùng 1 output:
```
2020-08-30 15:27:19.845036: thứ 1: 0
2020-08-30 15:27:20.446674: thứ 1: 1
2020-08-30 15:27:21.047935: thứ 1: 2
2020-08-30 15:27:21.230446: tạo ra subscription thứ 2
2020-08-30 15:27:21.649195: thứ 1: 3
2020-08-30 15:27:21.649195: subscription thứ 2: 6
2020-08-30 15:27:22.249643: thứ 1: 4
2020-08-30 15:27:22.249643: subscription thứ 2: 8
```
# 6. CompositeSubscription
`CompositeSubscription` giống như một cái vùng chứa tất cả StreamSubscription, để sau này chúng ta tiện cancel tất cả StreamSubscription cùng một lúc.
```dart
void main() async {
  // giả sử chúng ta có 3 subscription
  var subscription1 = testStream().listen(println);
  var subscription2 = testStream().listen(println);
  var subscription3 = testStream().listen(println);

  // tạo ra 1 compositeSubscription
  var compositeSubscription = CompositeSubscription();

  // add 3 subscription đó vào compositeSubscription
  compositeSubscription.add(subscription1);
  compositeSubscription.add(subscription2);
  compositeSubscription.add(subscription3);

  // 2 giây sau cancel tất cả 3 subscription đó
  await Future.delayed(Duration(seconds: 2));
  compositeSubscription.clear();

  // cũng có thể dùng hàm dispose để cancel tất cả 3 subscription đó
  compositeSubscription.dispose();
}

Stream<int> testStream() async* {
  yield 10;
  await Future.delayed(Duration(seconds: 2));
  yield 11;
  await Future.delayed(Duration(seconds: 3));
  throw FormatException('lỗi');
  yield 13; // hàm này đã xảy ra Exception nên số 13 không được phát ra
}
```
Output:
```
2020-08-29 22:33:19.276475: 10
2020-08-29 22:33:19.278475: 10
2020-08-29 22:33:19.278475: 10
```

Hàm `clear()` giống hàm `dispose()` đều là để cancel tất cả subscription. Nhưng khác ở chỗ là khi sử dụng hàm `clear` thì chúng ta có thể tái sử dụng lại `compositeSubscription`, còn một khi đã sử dụng hàm `dispose` thì không thể tái sử dụng `compositeSubscription` nữa.
# Kết luận
Đúng như lúc đầu mình nói là RxDart tuy đồ sộ nhưng không hề đáng sợ đúng không nào, mình đâu có chém :D. Nó thật sự chỉ đáng sợ với những bạn chưa hiểu về `Stream` mà thôi :D

Tham khảo: https://pub.dev/documentation/rxdart/latest/

https://hoangcuulong.com/flutter/flutter-rxdart/