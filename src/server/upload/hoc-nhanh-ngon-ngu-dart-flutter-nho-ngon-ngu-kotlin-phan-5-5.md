# 1. Lời mở đầu
Series này được viết nhằm mục đích giúp những bạn đã hiểu biết về ngôn ngữ Kotlin hoặc Java có thể học nhanh ngôn ngữ Dart để code Flutter. Nếu bạn chưa đọc những phần trước, bạn có thể đọc lại [tại đây](https://viblo.asia/s/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-dbZN76DvlYM)
# 2. Generic class
Khá giống Kotlin.

![](https://images.viblo.asia/41e5c9a1-65d2-4c85-af74-888c57df17a0.jpg)

# 3. Generic function
Có một cái Dart làm được mà Kotlin không làm được đó là sử dụng generic trong function type của một biến. Để biết function type, high order function hay extension function là gì thì bạn hãy xem lại [phần 3](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-3-Qbq5Qm935D8#_10-function-type-9) của series này.

![](https://images.viblo.asia/089e1d47-b1a4-43d4-825e-60882801d3d8.jpg)
# 4. Typedefs
Chính là `typealias` trong Kotlin. Dùng để tạo ra 1 kiểu dễ đọc hơn.

![](https://images.viblo.asia/6ca0f237-c9d7-452f-92ec-e63c6738ae33.jpg)

# 5. Chạy bất đồng bộ với async await
## async và Future
Để chạy một function bất đồng bộ, chỉ cần thêm từ khóa `async` ngay trước body của hàm và trả về kiểu `Future`. Như vậy tạo ra một hàm bất đồng bộ chỉ đơn giản thế này:
```dart
Future<int> lookUpVersion() async {
  return 3;
}
```

Ví dụ chạy 2 hàm song song là hàm `veryLongTask` và hàm `runSecondTask`. Do hàm `veryLongTask` này không cần trả về data nên mình sử dụng `Future<void>`:

![](https://images.viblo.asia/18793fb4-11d6-4ac0-a98a-a19965e8b36c.PNG)
Output:
```
10:24:54: Bắt đầu task 1
10:24:54: Bắt đầu & Kết thúc task 2
10:24:59: Kết thúc task 1
```

* Hàm `printWithCurrentTime` mình sử dụng hàm `DateTime.now()` với mục đích in kèm với thời gian cho các bạn dễ thấy thời gian thực thi.
* Hàm `Future.delayed` truyền vào một object `Duration` để mình delay giả tạo rằng task này chạy mất hơn 5 giây.
* Nhìn vào output có thể thấy Task 1 và task 2 đã chạy song song và đúng 5s sau thì task 1 mới chạy xong.
* `await + 1 biểu thức`: công dụng của nó là code trong `async` phải chờ biểu thức sau `await` chạy xong rồi mới chạy tiếp. Nhờ vậy mà biểu thức `delay 5s` được chờ hết 5s rồi mới chạy tiếp. Các ví dụ tiếp theo bạn sẽ thấy công dụng của `Future` và `await`
## await và Furure.then
* Cú pháp của `await` là:  `await + 1 biểu thức`. Công dụng của nó mình đã nói ở trên là code trong `async` phải chờ biểu thức sau await này chạy xong rồi mới chạy tiếp
* từ khóa `await` chỉ được sử dụng trong code bất đồng bộ (khối `async`), code đồng bộ thì không được
* `await` có thể được sử dụng nhiều lần trong 1 khối `async`
* Muốn lấy giá trị trong biến `Future` ta dùng hàm `then`.

Bây giờ mình sẽ code thử ví dụ sử dụng 2 `await` trong 1 `async`:

![](https://images.viblo.asia/cae58214-e98e-40e7-9cee-385a3da3a0b6.png)

*Edit: Có một chỗ do viết sai tên hàm trong comment nên phải vào photoshop sửa lại :(*

Output:
```
11:33:15: Bắt đầu get version
11:33:15: Bắt đầu & Kết thúc task 2
11:33:18: Đã get current version = 3
11:33:23: latest version get được = 4
```

Hàm  `veryLongTask` có thể dùng hàm `then` để viết gộp lại thế này cho gọn. 
```dart
void main() {
  // hàm then giúp ta lấy giá trị từ Future
  veryLongTask().then((value) => printWithCurrentTime('latest version get được = $value'));
}

Future<int> veryLongTask() async {
  printWithCurrentTime('Bắt đầu get version');
  
  // có thể viết gộp 2 Future như thế này bằng hàm then
  return await getCurrentVersion().then((version) => upgradeVersion(version));
}
```
## Xử lý lỗi
Có 2 cách: cách 1 là `try / catch` trực tiếp trong `async` và cách 2 là sử dụng hàm `catchError` của `Future` 

**Cách 1: dùng try / catch**

![](https://images.viblo.asia/6418e238-5d1a-433a-9a5d-c7b151b94ed1.PNG)

Output:
```
Bắt đầu get version
FormatException: Lỗi rồi nè
latest version get được = -1
```

**Cách 2: sử dụng hàm `catchError` của `Future`**

![](https://images.viblo.asia/1b78a770-b553-4bc6-ba1e-c90fe462f624.PNG)

Output:
```
Bắt đầu get version
FormatException: Lỗi rồi nè
```

# 6. sync* và Iterable, async* và Stream
## sync* và Iterable
Trong Kotlin, chúng ta cũng có thể build một `Synchronous Stream of Data` bằng cách sử dụng `Sequence.` (Nếu bạn chưa phân biệt được `Sequence` và `Collection` trong Kotlin có thể xem nhanh bằng ảnh gif trong một bài viết của mình tại đây: [Collections vs Sequences vs Flow](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw#_collections-vs-sequences-vs-flow-1))

Dart cũng làm được điều tương tự như `Sequence` bằng cách dùng `sync*` và nó trả về `Iterable`.

![](https://images.viblo.asia/3dcd3222-ac9a-4202-a9a2-424a2a5f43fc.jpg)

Output (ảnh gif):

![](https://images.viblo.asia/4993bff6-c720-45ac-8f34-5e541de9add3.gif)

## async* và Stream
*Note*: Dành cho những bạn chưa tìm hiểu về [Kotlin Coroutine](https://viblo.asia/s/cung-hoc-kotlin-coroutine-z45bxjBoZxY), mình đã soạn riêng 2 bài rất chi tiết và đầy đủ về Stream là: 

[Flutter từ RxDart đến Bloc Pattern, bài 1: Stream và giải thích các thuật ngữ](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-1-stream-va-giai-thich-cac-thuat-ngu-Ljy5Vq6blra)

[Flutter từ RxDart đến Bloc Pattern, bài 2: Tiếp tục với 'Sờ tream'](https://viblo.asia/p/flutter-tu-rxdart-den-bloc-pattern-bai-2-tiep-tuc-voi-so-tream-oOVlYMX4l8W)

So, nếu bạn đã tìm hiểu về Kotlin Coroutine thì mời bạn tiếp tục compare với Kotlin Coroutine cho nó nhanh.

Trong Kotlin Coroutine có `Flow`, `Flow` về cơ bản khá giống `Sequences` trong Kotlin nhưng khác ở chỗ Sequences xử lý đồng bộ còn `Flow` xử lý bất đồng bộ. (Có thể tham khảo `Flow` [tại đây](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw)). 

Trong Dart build một Stream of Data xử lý bất đồng bộ bằng cách dùng `async*` và nó trả về `Stream`

![](https://images.viblo.asia/4629518d-bd86-4202-bd8a-697c0de672cf.jpg)

Output (ảnh gif):

![](https://images.viblo.asia/4993bff6-c720-45ac-8f34-5e541de9add3.gif)
# 7. await for
Dart hỗ trợ bất đồng bộ for loop dùng để duyệt các phần tử trong `Stream` một cách bất đồng bộ để tối ưu performance bằng `await for`. Tất nhiên như mình đã nói ở trên thì cứ `await` là phải dùng trong `async`. Bây giờ mình sẽ thử viết một hàm bất đồng bộ để tính tổng các phần tử của `Stream` vừa tạo ra ở phần 6, sử dụng await for nhé:

![](https://images.viblo.asia/e4f1d726-55e0-4033-8cc7-3704392ce220.JPG)

Vì `Stream` của mình có 3 giá trị là `1, 2 và 3` nên output tổng sẽ là `6`.

# 8. Null safety
Tính năng này từ [phần 1](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-1-07LKX9eEZV4#_con-duong-kho-truoc-suong-sau-2) mình đã giới thiệu là ta phải enable experiment: non-nullable + dart sdk version 2.9.0 trở lên thì mới code được tính năng này. Hoặc đơn giản hơn là vào đây code luôn: https://nullsafety.dartpad.dev/

Khi enable experiment lên thì Dart nó phân ra 2 kiểu dữ liệu như Kotlin và kiểu nullable (có thể null) và non-nullable (không thể null). Cú pháp cũng tương tự như Kotlin thôi `int?` (có thể null) và `int` (không thể null), `String?` (có thể null) và `String` (không thể null), ...

Khoan đã, không phải từ bài 1 mình đã nói tất cả kiểu dữ liệu khi không có giá trị khởi tạo thì giá trị default sẽ là `null` sao. Giống thế này này:
```dart
void main() {
  String a; // a đang null
  print(a); // in ra null
}
```

Rõ ràng là in ra `null` được sao lại có thể tồn tại khái niệm kiểu dữ liệu không thể null được nhỉ :v 

Thử chạy đoạn code trên trong trang https://nullsafety.dartpad.dev/ xem. Nó sẽ ném vào mặt bạn một lỗi: `Error: Non-nullable variable 'a' must be assigned before it can be used`. Vậy là đã rõ rồi, Dart nó dùng chiêu là ép buộc các kiểu dữ liệu non-nullable đều phải được gán giá trị khởi tạo trước khi sử dụng. Vậy thì làm sao tụi nó null được nữa cơ chứ, quả là một chiêu hay. Đây cũng chính là lý do ngay từ phần 1 mình nói là các bạn không nên enable experiment, để có thể làm theo các example mà mình viết xuyên suốt series này. Vì giữa bật và không bật thì code nó khác nhau lắm (yaoming). 

Phần null-safety này mình chỉ nói thêm thôi chứ nó chưa được sử dụng chính thức trong Flutter nên các bạn yên tâm rằng học theo series này vẫn có thể sử dụng để code Flutter nha. Khi nào Flutter chính thức được sử dụng null-safety thì hãy học những sự thay đổi giữa phiên bản cũ và bản mới.

![](https://images.viblo.asia/7248536d-e6ae-43f4-9845-3f0fe38bf84e.PNG)

Khai báo `late` giống `lateinit var` bên Kotlin và các bạn phải gán giá trị cho biến được khai báo `late` trước khi sử dụng nếu không sẽ lỗi compile như trong ảnh. Thêm một lệnh gán vào là ok:
```dart
late int bienLate; // giống lateinit var bên Kotlin
bienLate = 3; // thêm dòng gán này vào là ok
print(bienLate); // in ra: 3
```
# Kết bài
Đây cũng phần cuối của series này. Hy vọng các bạn đã nắm được phần nào ngôn ngữ Dart. Series này mình chỉ tập trung nói về mặt ngôn ngữ và syntax nên khá ít ví dụ. Để pro hơn thì mời các bạn đọc thêm các thư viện core trong Dart: https://dart.dev/guides/libraries/library-tour :D. Thật sự mình viết series này chỉ trong vòng 3 ngày, khá là vội vàng hấp tấp nên có thể còn nhiều thiếu sót. Mong được các bạn comment góp ý để series này được hoàn thiện hơn. Xin cảm ơn!

Tham khảo: https://dart.dev/guides

https://www.youtube.com/watch?v=SmTCmDMi4BY&t=153s