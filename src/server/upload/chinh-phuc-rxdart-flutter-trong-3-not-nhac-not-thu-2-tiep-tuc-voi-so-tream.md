# Lời mở đầu
Mình viết series này với mục đích chia sẻ kiến thức về RxDart trong Flutter. Vì nó có liên quan đến các kiến thức về lập trình bất đồng bộ như Stream nên mình quyết định sẽ đi từ gốc cho đến ngọn :D

Ở [bài 1](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-1-stream-va-giai-thich-cac-thuat-ngu-Ljy5Vq6blra) mình đã chia sẻ khái niệm Stream là gì và các thuật ngữ quan trọng liên quan. Bây giờ chúng ta sẽ tiếp tục Sờ tream.
# 1. Stream Operators
Như mình đã giới thiệu ở bài 1, operators là những function được cung cấp để giúp ta dễ dàng xử lý `event` trong Stream. Có thể từ 1 Stream chế biến ra 1 Stream khác (`Stream transformation`), hoặc chỉ đơn giản là get 1 giá trị nào đó trong Stream (`Receiving stream events`), khi đó giá trị đó sẽ được trả dưới dạng một `Future`. Vì vậy mình sẽ chia thành 2 nhóm nhỏ: nhóm trả về `Future` và nhóm trả về `Stream` khác. Vì số function trong mỗi nhóm là rất nhiều nên mình sẽ giới thiệu 5 function điển hình, hay dùng. 

![](https://images.viblo.asia/e3a6c928-9fe3-4825-900e-36f7977aa59c.gif)

## I. Nhóm function trả về Future
### 1. elementAt
Hàm này giúp ta get được phần tử tại index bất kỳ trong Stream
```dart
void main() async {
  var future = await testStream().elementAt(2); // get data tại index = 2
  print(future); // print ra: 15
}

// xuyên suốt các ví dụ mình sẽ sử dụng Stream này
Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
### 2. length
Hàm này giúp ta get được số lượng phần tử có trong stream.
```dart
void main() async {
  print(await testStream().length); // print: 4
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
### 3. firstWhere
Hàm này giúp ta get được phần tử đầu tiên thỏa mãn một điều kiện được chúng ta cho trước. Ví dụ dưới đây mình muốn get ra phần tử đầu tiên có giá trị lớn hơn 11. Đó chính là 15
```dart
void main() async {
  print(await testStream().firstWhere((element) => (element > 11))); // print: 15
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
### 4. join
Hàm này nó nối tất cả element thành 1 `String` duy nhất, giữa các element được ngăn cách bởi 1 ký tự separator do chúng ta truyền vào.
```dart
void main() async {
  print(await testStream().join(',')); // print: '5,10,15,20'
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
### 5. await for
Cú pháp `await for` giúp chúng ta tính tổng các phần tử trong Stream một cách bất đồng bộ. Vì là tính bất đồng bộ nên nó sẽ tính nhanh hơn dùng for thông thường rất nhiều.
```dart
void main() async {
  var sum = 0;
  await for (final value in testStream()) {
    sum += value;
  }

  print(sum); // print: 50
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```

Mình thấy trong lớp `Stream` không có hàm `sum` mà dùng cú pháp `await for` đó thì nó dài dòng quá nên chúng ta có thể viết thêm 1 [extension function](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-3-5-Qbq5Qm935D8#_12-extension-function-13) cho nó:
```dart
void main() async {
  print(await testStream().sum()); // chỉ cần gọi hàm sum là print: 50
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}

// extension function của Stream dành để tính tổng
extension StreamExtensions on Stream<int> {
  Future<int> sum() async {
    var sum = 0;
    await for (final value in this) {
      sum += value;
    }

    return sum;
  }
}
```

***Bonus***: Xem thêm các function khác [tại đây](https://github.com/boriszv/Programming-Addict-Code-Examples/blob/master/12.%20Reactive%20Programming%20Course/3%20-%20Getting%20data%20from%20a%20Stream/main.dart)
## II. Nhóm function trả về Stream
Do các hàm này nó transform (biến đổi) một Stream sang một Stream khác nên để tránh nhầm lẫn, chúng ta sẽ thống nhất đặt cho chúng 2 cái tên là Source Stream và Output Stream như sau:
```
Source Stream -> transform -> Output Stream
```
### 1. map
Hàm này cho phép chúng ta truyền vào 1 hàm, hàm này sẽ giúp ta biến đổi từng element của Source Stream.
```dart
void main() {
  var outputStream = testStream().map((event) => event / 5); // chia từng phần tử của Source Stream cho 5
  outputStream.listen(print); // subscribe outputStream để nhận kết quả
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
Output:
```
1.0
2.0
3.0
4.0
```
### 2. where
Hàm này lọc ra những phần tử trong Source Stream thỏa mãn điều kiện cho trước.
```dart
void main() {
  testStream().where((event) => event > 11).listen(print); // lọc ra những phần tử > 11
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
Output:
```
15
20
```
### 3. takeWhile
Hàm này nó sẽ emit ra các phần tử **CÓ** thỏa mãn điều kiện cho trước cho đến khi có một phần tử **KHÔNG** thỏa mãn điều kiện thì nó dừng Stream.
```dart
void main() {
  testStream().takeWhile((event) => event < 11).listen(print, onDone: () => print('Done!'));
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15; // tới đây gặp 15 KHÔNG pass điều kiện nên dừng stream, ko emit ra 15
  yield 20;
}
```
Output:
```
5
10
Done!
```

Và như vậy có nghĩa là nếu Source Stream `yield 15` trước tiên thì Output Stream sẽ không có phần tử nào.
```dart
void main() {
  testStream().takeWhile((event) => event < 11).listen(print, onDone: () => print('Done!'));
}

Stream<int> testStream() async* {
  yield 15; // tới đây gặp 15 KHÔNG pass điều kiện nên dừng stream, ko emit ra 15
  yield 10;
  yield 5; 
  yield 20;
}
```
Output:
```
Done!
```
### 4. skipWhile
Hàm này nó sẽ bỏ qua, không emit ra các phần tử **CÓ** thỏa mãn điều kiện cho trước cho đến khi có một phần tử **KHÔNG** thỏa mãn điều kiện được emit ra.
```dart
void main() {
  testStream().skipWhile((event) => event < 11).listen(print); // bỏ qua các phần tử < 11
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15;
  yield 20;
}
```
Output:
```
15
20
```

Các bạn chú ý là: `skipWhile` không có lọc theo điều kiện `where` nhé. Thằng `skipWhile` một khi đã emit được 1 phần tử đầu tiên rồi thì nó sẽ không skip bất cứ phần tử nào nữa. Ví dụ như case này:
```dart
void main() {
  testStream().skipWhile((event) => event < 11).listen(print);
}

Stream<int> testStream() async* {
  yield 5; // thằng 5 CÓ pass điều kiện nên bị skip
  yield 15; // thằng 15 KHÔNG pass điều kiện nên được emit ra đầu tiên
  yield 6; // nhờ vậy mà tất cả phần tử sau 15 đều được emit kể cả 6
  yield 20;
}
```
Output:
```
15
6
20
```
### 5. distinct
Hàm này skip (bỏ qua) các phần tử mà chúng equal (bằng) với phần tử đã được emit trước đó (the previous element).
```dart
void main() {
  testStream().distinct().listen(print, onDone: () => print('Done!'));
}

Stream<int> testStream() async* {
  yield 5; // emit 5
  yield 5; // bỏ qua vì phần tử liền trước là 5
  yield 5; // bỏ qua vì phần tử liền trước là 5
  yield 10; // emit 10 (vì 10 khác thằng liền trước đã emit là 5)
  yield 5; // emit 5 (vì 5 khác thằng liền trước đã emit là 10)
  yield 10; // emit 10 (vì 10 khác thằng liền trước đã emit là 5)
}
```
Output:
```
5
10
5
10
Done!
```

Ngoài ra, `distinct` còn cho phép chúng ta có thể định nghĩa lại thế nào là bằng nhau.
```dart
void main() {
   // định nghĩa lại: 2 số bằng nhau là khi 2 số đó chia lấy phần nguyên với 10 ra kết quả bằng nhau 
  testStream().distinct((int previous, int next) => previous ~/ 10 == next ~/ 10)
      .listen(print, onDone: () => print('Done!'));
}

Stream<int> testStream() async* {
  yield 5;
  yield 10;
  yield 15; // không được emit ra vì 10 ~/ 10 = 15 ~/10 = 1
  yield 20;
}
```
Output:
```
5
10
20
Done!
```
***Bonus***: Xem thêm các function khác [tại đây](https://github.com/boriszv/Programming-Addict-Code-Examples/blob/master/12.%20Reactive%20Programming%20Course/4%20-%20Operators/main.dart)
# 2. Handle errors
Stream có một function giúp ta bắt lỗi trong Stream là `handleError`. Hàm này nó lợi hại hơn [onError](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-phan-1-stream-va-giai-thich-cac-thuat-ngu-Ljy5Vq6blra#_subscribe-mot-stream-5) trong hàm `listen` mà mình đã giới thiệu ở bài 1 ở chỗ. Nó cung cấp cho ta 1 optional param là hàm `test`, ở hàm `test` ta có thể check xem cái lỗi đó có đáng để ta `catch` hay không, nếu không đáng thì ta có thể cho ném lỗi đó luôn không cần `catch` (tương tự [rethrow](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-2-5-L4x5x3vwlBM#_10-try--catch--finally-11) lỗi). 

Hàm `test` này `return true` thì đồng nghĩa với việc chúng ta `catch` lỗi đó, ngược lại `return false` thì chúng ta `rethrow` lỗi đó.
```dart
void main() {
  testStream().handleError(print, test: (error) {
    if (error is HttpException) {
      return true; // return true thì catch lỗi đó lại
    } else {
      return false; // return false thì rethrow lỗi đó lun
    }
  }).listen(print);
}

Stream<int> testStream() async* {
  yield 5;
  throw FormatException('lỗi rồi');
  yield 10;
}
```

Vì `FormatException` không phải là `HttpException` nên hậu quả là máu nhuộm *cờn sô lơ* :D

![](https://images.viblo.asia/722c5167-7374-49a7-b798-32212c1b4687.PNG)

Vì hàm `test` là [optional param](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-3-5-Qbq5Qm935D8#_5-named-parameters-4) nên nếu chúng ta không truyền vào thì mặc định Dart sẽ hiểu tất cả lỗi trong Stream sẽ được `catch`
```dart
void main() {
  testStream().handleError(print).listen(print);
}

Stream<int> testStream() async* {
  yield 5;
  throw FormatException('lỗi rồi');
  yield 10;
}
```
Output:
```
5
FormatException: lỗi rồi

Process finished with exit code 0
```
# 3. Stream Controlller
`StreamController` đơn giản chỉ là 1 controller bên trong có 1 stream và controller này giúp ta điều khiển stream đó dễ dàng. Chúng ta có thể thoải mái push các events vào stream, lắng nghe nhận data từ stream đó. Nói cách khác, đây là một con đường khác giúp ta tạo ra 1 Stream và thoải mái emit events và nhận events bất cứ thời điểm nào chúng ta muốn.

Trong mỗi `StreamController` đều có 2 đối tượng là `sink`(giúp chúng ta push events đến `stream`) và `stream` (giúp chúng ta nhận events từ `sink`)

![](https://images.viblo.asia/cfcd1e56-becd-44ca-a2cc-39d1d60e7e8e.png)

```dart
void main() async {
  // tạo stream controller
  var streamController = StreamController();

  // lắng nghe
  streamController.stream.listen(print);
  
  // push events
  streamController.sink.add('Tui là Minh');
  streamController.sink.add(100);
  
  // Khi không cần sử dụng controller này nữa thì nên close controller
  await Future.delayed(Duration(seconds: 2)); // sau 2 giây ta sẽ close controller
  await streamController.close();
  
  // sau khi close mà chúng ta vẫn cố push event sẽ gặp Exception: 
  // Unhandled exception: Bad state: Cannot add new events after calling close
  // streamController.sink.add(11); // cố push event sau khi controller đã close
}
```
Output:
```
Tui là Minh
100
```
# 4. Broadcast StreamController
Giả sử chúng ta muốn có 2 nguồn lắng nghe events từ `sink`
```dart
void main() {
  // tạo broadcast stream controller
  var streamController = StreamController();

  // subscription thứ nhất
  streamController.stream.listen((event) {
    print('subscription thứ 1: $event');
  });

  // subscription thứ hai sẽ double giá trị của event lên
  streamController.stream.listen((event) {
    print('subscription thứ 2: ${event + event}'); // double value lên
  });

  // push events
  streamController.sink.add('Tui là Minh');
  streamController.sink.add(100);
}
```
Cái mà chúng ta nhận được là máu nhuộm cờn sô lơ:

![](https://images.viblo.asia/2fe507c2-62c1-401f-bd7d-b69ec5ae5337.PNG)

Nó báo lỗi là Stream này đã được lắng nghe rồi, vậy không có cách nào để có nhiều hơn 1 thằng lắng nghe Stream à?

Đừng lo, vì chúng ta đã có `Broadcast StreamController`. Với Broadcast StreamController chúng ta có thể tạo ra bao nhiêu thằng lắng nghe Stream đó cũng được.

Để tạo ra một Broadcast StreamController rất đơn giản, thay vì sử dụng constructor : `StreamController()` để tạo `streamController` thì ta sử dụng constructor `StreamController.broadcast()`. Và đối tượng `stream` trong `streamController` bây giờ người ta gọi là một `Broadcast Stream`.

```dart
void main() {
  // tạo Broadcast StreamController
  var streamController = StreamController.broadcast();

  // subscription thứ nhất
  streamController.stream.listen((event) { // streamController.stream là 1 broadcast stream
    print('subscription thứ 1: $event');
  });

  // subscription thứ hai sẽ double giá trị của event lên
  streamController.stream.listen((event) { // streamController.stream là 1 broadcast stream
    print('subscription thứ 2: ${event + event}');
  });

  // push events
  streamController.sink.add('Tui là Minh');
  streamController.sink.add(100);
}
```
Output:
```
subscription thứ 1: Tui là Minh
subscription thứ 2: Tui là MinhTui là Minh
subscription thứ 1: 100
subscription thứ 2: 200
```
# Kết luận
Như vậy, chúng ta đã đi hết phần Stream. Sau khi hiểu được Stream bạn đã có thể học được Bloc Pattern mà không cần thiết phải học RxDart. Nếu bạn đang cần học Bloc Pattern thì bạn có thể dễ dàng học ở nguồn khác, có rất nhiều người chia sẻ về nó. Tất nhiên mình vẫn tiếp tục viết về RxDart và cả Bloc Pattern. Cơ mà có bỏ đi thì đừng quên tặng cho mình 1 vote nếu thấy những chia sẻ của mình có giá trị nhé =))

Nguồn tham khảo: https://github.com/boriszv/Programming-Addict-Code-Examples/tree/master/12.%20Reactive%20Programming%20Course

Đọc bài cuối cùng: [Chinh phục RxDart Flutter trong 3 nốt nhạc. Nốt nhạc cuối: RxDart không đáng sợ như bạn nghĩ](https://viblo.asia/p/chinh-phuc-rxdart-flutter-trong-3-not-nhac-not-nhac-cuoi-rxdart-khong-dang-so-nhu-ban-nghi-bWrZn0qp5xw)