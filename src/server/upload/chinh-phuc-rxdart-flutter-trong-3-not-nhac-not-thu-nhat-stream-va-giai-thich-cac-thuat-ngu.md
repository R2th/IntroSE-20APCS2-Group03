# Lời mở đầu
Mình viết series này với mục đích chia sẻ kiến thức về RxDart trong Flutter. Vì nó có liên quan đến các kiến thức về lập trình bất đồng bộ như Stream nên mình quyết định sẽ đi từ gốc cho đến ngọn 😄

Series này sẽ gồm 2 nội dung chính:

*Phần 1*: Stream, các khái niệm liên quan đến Stream như Stream Controller, Subscription,... Bởi vì hiểu được Stream thì mới có thể hiểu được RxDart. Nếu bạn đã hiểu các khái niệm về Stream mời bạn tiến thẳng đến phần 2: RxDart.

*Phần 2*: [RxDart](https://viblo.asia/p/chinh-phuc-rxdart-flutter-trong-3-not-nhac-not-nhac-cuoi-cung-rxdart-khong-dang-so-nhu-ban-nghi-bWrZn0qp5xw) (cần kiến thức về Stream trong phần 1)

Okay, bây giờ chúng ta sẽ bắt đầu với phần 1 là Sờ tream.
# 1. Stream là gì, Event là gì
Có thể hình dung cái băng chuyền này là 1 `Stream`.

![](https://images.viblo.asia/0d036b0a-1c12-44a7-a704-2222b3d0b447.gif)

Định nghĩa nguyên văn từ doc: 
> A stream is a sequence of asynchronous events

Dịch nôm na ra thì Stream là một chuỗi các `events` bất đồng bộ. Các khối hộp đang trượt trên băng kia chính là các `events`. `Event` có thể là một `data`, cũng có thể là một `error`, hoặc một trạng thái `done` (Trong phần Tạo ra Stream ở dưới mình sẽ nói rõ hơn). Các `events` này được xử lý bất đồng bộ. Như vậy `Stream` là một chuỗi các `events` được xử lý bất đồng bộ. 

Thực tế Stream nó không có chạy mãi như cái ảnh gif đâu nha. Nó có thể được tạo ra, cũng có thể bị đóng lại và ta cũng có thể tạm dừng cái băng chuyền đó (pause) và tiếp trục cho băng chuyền chạy (resume)

Trong quá trình truyền data, có thể qua 1 số khâu chế biến trung gian để cho ra output. Như cái ảnh dưới đây, dữ liệu đầu vào là các `chữ thường` qua một hàm xử lý gọi là `map` để cho ra những data đầu ra là các `chữ in hoa`. Các hàm như vậy thì trong lớp `Stream` của Dart cũng có tuy nhiên còn hạn chế. Chính vì vậy mà chúng ta mới cần đến `RxDart`  - một thư viện bổ sung sức mạnh thêm cho `Stream`.

![](https://images.viblo.asia/e3a6c928-9fe3-4825-900e-36f7977aa59c.gif)

Nếu các bạn đã từng biết RxJava hay RxJs,... thì định nghĩa `Stream` chính là định nghĩa của `Observable` trong Rx.
# 2. Tạo ra Stream, lắng nghe Stream và giải thích thuật ngữ
## emit là gì
Hành động phát ra `Event` của Stream người ta gọi là `emit`

## Tạo Stream
Có rất là nhiều cách để tạo ra 1 stream. Ở đây mình tạm giới thiệu 1 cách đơn giản nhất để giải thích thuật ngữ.
```dart
var stream = Stream.value('gấu bông'); // tạo ra 1 stream và đồng thời emit 1 data là 'gấu bông'
```

Ở đây mình đã tạo ra 1 Stream và emit 1 data là 'gấu bông' nhưng khi run chương trình thì sẽ ko xảy ra gì cả. Là vì mình phát ra con 'gấu bông' nhưng không có ai nhận hết. Muốn nhận được con gấu bông phải đăng ký Stream để được nhận nó khi 'gấu bông' được phát ra. Tiếp theo chúng ta sẽ tiến hành đăng ký Stream trên (subscribe a Stream).
## Subscribe một Stream
Chúng ta sử dụng hàm `listen` để đăng ký nhận events từ stream.
```dart
var stream = Stream.value('gấu bông'); // tạo ra 1 stream và đồng thời emit 1 data là 'gấu bông'
stream.listen((event) { // đăng ký nhận event từ stream
    print('Tôi đã nhận được $event');
  });
```
Output:
```
Tôi đã nhận được gấu bông
```

Trong RxJava, ..., người ta còn gọi cái lambda này `(event) { print('Tôi đã nhận được $event'); }` là 1 `Observer`

Trong hàm `listen` chúng ta có thêm các [optional parameter](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-3-5-Qbq5Qm935D8#_5-named-parameters-4) như `onDone`, `onError`

Một Stream khi emit xong tất cả event thì nó sẽ emit event tại `onDone`, nếu gặp lỗi thì nó sẽ emit một error và `onError` sẽ giúp ta nhận được event đó. 
```dart
var stream = Stream.value('gấu bông'); // tạo ra 1 stream và đồng thời emit 1 data là 'gấu bông' và done luôn
  stream.listen((event) {
    print('Tôi đã nhận được $event');
  }, onDone: () => print('Done rồi'), 
      onError: (error) => print('Lỗi rồi $error'));
```

Output: Do không gặp lỗi nên output sẽ là thế này. 
```
Tôi đã nhận được gấu bông
Done rồi
```
## Thêm nhiều cách tạo Stream
Bây giờ mình sẽ giới thiệu thêm nhiều cách tạo ra Stream nữa:

* Tạo ra một Stream đồng thời emit 1 error và done luôn.
```dart
Stream.error(FormatException('lỗi nè')).listen(print, onError: print, onDone: () => print('Done!'));
```
Output:
```
FormatException: lỗi nè
Done!
```

* Tạo ra một Stream đồng thời emit 1 List data xong rồi Done.
```dart
Stream.fromIterable([1, 2, 3]).listen(print, onError: print, onDone: () => print('Done!'));
```
Output:
```
1
2
3
Done!
```

* Tạo ra một Stream từ 1 [Future](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-5-5-Ljy5Vqjolra#_async-va-future-5). 
```dart
void main() {
  Stream.fromFuture(testFuture()).listen(print, onError: print, onDone: () => print('Done!'));
}

Future<int> testFuture() async {
  return 3;
}
```
Output:
```
3
Done!
```

* Tạo ra một stream cứ 1 giây sẽ emit ra 1 event. Các bạn chú ý là `error` nó cũng là `event` nên khi Stream emit ra error thì Stream đó không dừng lại.
```dart
Stream.periodic(Duration(seconds: 1), (int i) {
    if(i == 5) {
      throw Exception('lỗi');
    }
    if (i % 2 == 0) {
      return '$i là số chẵn';
    } else {
      return '$i là số lẻ';
    }
  }).listen(print, onError: print, onDone: () => print('Done!'));
```
Output:
```
0 là số chẵn
1 là số lẻ
2 là số chẵn
3 là số lẻ
4 là số chẵn
Exception: lỗi
6 là số chẵn
7 là số lẻ
8 là số chẵn
.......
```

Stream này nó bất tử lun :D. Bây giờ mình sẽ sử dụng StreamSubscription để trảm nó, không cho nó bất tử nữa!
# 3. StreamSubscription là gì
Hàm `listen` ở trên sẽ trả về một đối tượng StreamSubscription. StreamSubscription giúp ta điều khiển stream. Ta có thể pause stream, resume stream và hủy stream.
```dart
void main() async {
  var subscription = Stream.periodic(Duration(seconds: 1), (int i) {
    if(i == 5) {
      throw Exception('lỗi');
    }
    if (i % 2 == 0) {
      return '$i là số chẵn';
    } else {
      return '$i là số lẻ';
    }
  }).listen(println, onError: println, onDone: () => println('Done!'));

  // Sau 3 giây kể từ lúc run chương trình ta sẽ pause stream
  await Future.delayed(Duration(seconds: 3), () {
    println('pause stream');
    subscription.pause();
  });

  // Sau 2 giây kể từ lúc pause stream ta sẽ resume stream
  await Future.delayed(Duration(seconds: 2), () {
    println('resume stream');
    subscription.resume();
  });

  // Sau 3 giây kể từ lúc resume stream ta sẽ cancel stream
  await Future.delayed(Duration(seconds: 3), () {
    println('cancel stream');
    subscription.cancel();
  });
}

// mình sử dụng hàm println này để in ra thời gian hiện tại cho dễ quan sát output
void println(Object value) {
  print('${DateTime.now()}: $value');
}
```
Output:
```
2020-08-29 21:53:32.882979: 0 là số chẵn
2020-08-29 21:53:33.881757: 1 là số lẻ
2020-08-29 21:53:34.880876: 2 là số chẵn
2020-08-29 21:53:34.884870: pause stream
2020-08-29 21:53:36.888422: resume stream
2020-08-29 21:53:37.890725: 3 là số lẻ
2020-08-29 21:53:38.891863: 4 là số chẵn
2020-08-29 21:53:39.891114: cancel stream

Process finished with exit code 0
```

Và chúng ta đã có thể stop được stream bất tử ở trên thành công bằng hàm `cancel()`. Người ta thường gọi hành động này là `unsubscribe một Stream`.
# 4. Stream Builder, async*, yield và yield*
Trong thực tế, người ta lại rất ít khi dùng các cách trên để tạo stream mà họ sử dụng cái gọi là `stream builder`, ở đó họ có thể emit data bất cứ thời điểm nào họ muốn. 

Để tạo một stream builder ta tạo 1 function với `async*` và trả về một `Stream`. Để emit một data ta có thể sử dụng `yield`, để emit tất cả data trong 1 stream ta có thể sử dụng `yield*`
```dart
void main() {
  testStream().listen(println, onError: println, onDone: () => println('Done!'));
}

Stream<int> testStream() async* {
  yield 10; // emit 10
  await Future.delayed(Duration(seconds: 2)); // delay 2s
  yield* Stream.fromIterable([1, 2, 3]); // emit nguyên 1 stream
  await Future.delayed(Duration(seconds: 3)); // delay 3s
  throw FormatException('lỗi');
  yield 13; // hàm này đã xảy ra Exception nên số 13 không được phát ra
}

// mình sử dụng hàm println này để in ra thời gian hiện tại cho dễ quan sát output
void println(Object value) {
  print('${DateTime.now()}: $value');
}
```
Output:
```
2020-08-30 09:23:23.965913: 10
2020-08-30 09:23:25.975207: 1
2020-08-30 09:23:25.975207: 2
2020-08-30 09:23:25.975207: 3
2020-08-30 09:23:28.977575: FormatException: lỗi
2020-08-30 09:23:28.978575: Done!
```
# Kết luận
Qua phần 1 của series này, hy vọng các bạn đã nắm được các thuật ngữ quan trọng trong Stream cũng như trong lập trình bất đồng bộ của Dart. Các thuật ngữ này rất quan trọng đối với loạt bài tiếp theo trong series này. Trong bài tiếp theo mình sẽ giới thiệu đến các bạn các toán tử của Stream và Stream Controller, Broadcast Stream. Hy vọng các bạn đón đọc :D.

Nguồn tham khảo: https://dart.dev/tutorials/language/streams

Đọc bài tiếp theo: [Chinh phục RxDart Flutter trong 3 nốt nhạc. Nốt nhạc thứ 2: Tiếp tục với 'Sờ tream'](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W)