# 1. Lời mở đầu
Series này được viết nhằm mục đích giúp những bạn đã hiểu biết về ngôn ngữ Kotlin hoặc Java có thể học nhanh ngôn ngữ Dart để code Flutter. Nếu bạn chưa đọc phần 1 và 2, bạn có thể đọc lại [tại đây](https://viblo.asia/s/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-dbZN76DvlYM)
# 2. Hàm (function)
![](https://images.viblo.asia/c7974e88-e55a-493e-a910-a5e45b79a209.jpg)

* Thật ra cả trong Kotlin và Dart, không có khái niệm hàm không có kiểu trả về. Tất cả hàm đều có `return` nhưng nếu chúng ta không sử dụng `return` thì cả Kotlin và Dart sẽ ngầm định `return`. Kotlin sẽ trả về ngầm định một giá trị là `Unit` còn Dart sẽ trả về `null`. Mình comment vào code như vậy cho nó dễ so sánh hàm có `return` và không `return` hy vọng mọi người không hiểu nhầm :D
* Nếu để ý thì cách viết hàm của Dart rất giống Java
# 3. Single-Expression function
![](https://images.viblo.asia/0e27c836-1f67-4596-9d0d-9582851f1de5.jpg)
* Dart dùng arrow syntax `=>` để viết các hàm mà chỉ có 1 biểu thức duy nhất một cách nhanh gọn (tương tự Kotlin)
* Dart vi diệu hơn Kotlin ở chỗ nó lượt bỏ được cả kiểu trả về của hàm và kiểu dữ liệu của các biến parameter lun. Parameter không được khai báo kiểu sẽ có kiểu là `dynamic`. Tuy nhiên, cách viết code này không được khuyến khích trong Dart (bạn thấy nó warning đó). Dart muốn bạn khi khai báo một hàm phải khai báo đầy đủ kiểu trả về và kiểu của các parameter (nếu có).

Hoặc bạn cũng có thể dùng nó để `throw Exception`:

![](https://images.viblo.asia/26a8bfdf-6c2f-4749-b797-5372ca64d7ad.jpg)

Output:
```
FormatException: lỗi rồi ku Minh
```
# 4. Local funtions
Cũng giống như Kotlin, Dart cũng có thể khai báo 1 hàm bên trong 1 hàm và output của hàm này cũng có thể là input của hàm kia.

![](https://images.viblo.asia/e1b33d94-f9ba-4c88-881b-417fbd6ca066.jpg)
# 5. Named parameters
![](https://images.viblo.asia/342e1c30-77c9-4a0b-af18-516aee4c2ec4.jpg)
* Cũng giống như Kotlin, Dart cũng hỗ trợ **named parameters** chỉ khác biệt một chỗ về mặt syntax là Dart yêu cầu parameters phải đặt trong `{ }`
* Giữa tên param và argument, Kotlin sử dụng dấu `=` (VD: `bbb = 1`), còn Dart dùng dấu `:` (VD: `bbb: 1`)
* Một khi đã sử dụng tính năng named parameters trong function (tức là có dấu `{ }` như đã nói ở trên thì Dart bắt buộc phải chỉ định rõ tên của từng param khi call function. Còn Kotlin thông minh hơn, nó sẽ tự hiểu `a` là mấy còn `bbb` là mấy. Như các bạn thấy ở trường hợp đầu tiên Kotlin không báo lỗi còn Dart thì báo lỗi.
* Đây là 1 loại `Optional parameters` trong Dart, các parameters được đặt trong `{ }` thì khi gọi hàm không cần thiết phải truyền vào. Nói cách khác là truyền vào cũng được, không truyền vào cũng được. Nếu không truyền vào thì nó sẽ có giá trị default là `null`. Ví dụ:

```dart
void main() {
  enableFlags(); // in ra: null và null
}

void enableFlags({bool bold, bool hidden}) {
  print('$bold và $hidden');
}
```
# 6. Positional parameters
Đây cũng là 1 loại `Optional parameters`, các parameters được đặt trong `[ ]` thì khi gọi hàm không cần thiết phải truyền vào. Nói cách khác là truyền vào cũng được, không truyền vào cũng được. Nếu không truyền vào thì nó sẽ có giá trị default là `null`

![](https://images.viblo.asia/c72bbdd5-441c-4b78-9471-50e1ef1e2206.PNG)

* `Positional parameters` và `Named parameters` đều là `Optional parameters` nhưng `Positional parameters` không ép buộc phải chỉ định rõ tên của từng param khi call function như `Named parameters`
* Chúng ta không thể vừa sử dụng Position parameters vừa sử dụng Named parameters trong cùng 1 hàm. Ví dụ hàm sau sẽ lỗi:
```dart
void demoFunc(String foo, [String positonal], {String named}) {
      // lỗi compile
}
```
# 7. Default arguments
Cũng giống như Kotlin, Dart cũng hỗ trợ **default arguments**

![](https://images.viblo.asia/09d6b4d7-85c0-4521-8ef2-122f05871712.jpg)

Default arguments cũng được dùng trong các positional parameters

![](https://images.viblo.asia/30ad6d80-16fa-4a01-8e84-eaf37859f478.PNG)

# 8. Function reference
Nếu như Kotlin phải cần đến toán tử `::` đặt trước function thì Dart không cần gì cả.

![](https://images.viblo.asia/f302d0da-93c1-43d4-87d7-d5654f633697.jpg)

Output của cả Kotlin và Dart đều là:
```
1
2
3
```
# 9. Anonymous function, lambda expression
Kotlin nó phân biệt rõ ràng giữa **anonymous function** với **lambda expression** thì Dart xem 2 thằng này là một.

Cú pháp:
```
(item) {
    // gõ lệnh gì ở đây
}
```

Ví dụ vòng for được viết kiểu lambda:

![](https://images.viblo.asia/0df9f7b4-f9b8-4a8a-9f79-4544755c5e0f.jpg)

Bạn cũng có thể sử dụng cách viết của Single Expression function trong lambda. Cú pháp: `(item) => single expression`

```dart
void main() {
  var list = <int>[1, 2, 3];
  list.forEach((element) => print(element));
}
```

Output của 2 cách trên đều là:
```
1
2
3
```

`Chú ý`: Kotlin có `it` chứ Dart không có đâu nha, buộc phải đặt tên như ở đây mình đặt tên là `element`
# 10. Function type
Dart là một ngôn ngữ hướng đối tượng thực sự, vì vậy ngay cả hàm cũng là các đối tượng và có một kiểu `Function`. Chính vì vậy chúng ta có thể gán một function vào một biến trong Dart. Cái này giống **Function Type** trong Kotlin.

![](https://images.viblo.asia/e7714190-8cdb-4a53-ba25-992bc3725903.jpg)

Cả Kotlin và Dart đều in ra output:
```
Tui tên là Minh. Tui 18 tuổi
Hello Minh
```
# 11. High order funtion
## Hàm nhận parameter là hàm
Mình viết example so sánh cho các bạn dễ nắm được cách viết của Dart

![](https://images.viblo.asia/534ed38e-e47d-4f41-94f0-1a0793ec8483.jpg)

Hoặc anh em cũng hay sử dụng cho mục đích callback thế này

![](https://images.viblo.asia/407a3c99-36b9-48bb-8ea3-13f2472275d8.jpg)

Output của cả Kotlin và Dart:
```
Giá trị nhận được là 6
```
## Hàm trả về một hàm
Trong Dart một hàm cũng có thể trả về một hàm.

![](https://images.viblo.asia/a046bfe2-1a74-4ffe-bdb2-77b5b06d9b04.jpg)
# 12. Extension function
Dart cũng hỗ trợ Extension function như Kotlin. Cú pháp:
```
extension <tên extension> on <Type> {
  // viết function body
}
```

![](https://images.viblo.asia/8e1a1c8b-6176-4b0b-8572-95c91ebe3029.jpg)

Khác biệt ở chỗ là Dart có thêm <tên extension>.
# Kết luận
Phần này chỉ viết riêng về hàm mà nó nhiều như vậy. Thấy ý tưởng của Dart cũng giống Kotlin chứ nhỉ :D. Hy vọng các bạn tiếp tục theo dõi những phần tiếp theo :D

Tham khảo: https://dart.dev/guides

Đọc tiếp phần 4: [Học nhanh ngôn ngữ Dart (Flutter) nhờ ngôn ngữ Kotlin (Phần 4)](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-4-V3m5W0W7KO7)