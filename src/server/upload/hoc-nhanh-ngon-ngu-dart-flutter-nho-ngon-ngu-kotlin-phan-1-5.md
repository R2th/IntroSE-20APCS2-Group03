# 1. Lời mở đầu
Dạo gần đây mình có tìm học về Flutter thì mình thấy Flutter dùng ngôn ngữ lập trình Dart. Với kiến thức về ngôn ngữ lập trình Kotlin, mình chỉ mất 1 ngày để học Dart và mình muốn tổng hợp lại lộ trình 1 ngày học này và share lại cho các bạn. Nếu như mình mất 1 ngày để học thì mình hy vọng ngay sau khi đọc xong series này, các bạn đã có thể code được Dart 😄. Series này mình sẽ tập trung phiên dịch code từ Kotlin sang Dart, code Kotlin viết thế này thì Dart sẽ viết ra sao và kèm theo đó mình sẽ chỉ ra những đặc điểm mà ở ngôn ngữ Dart có mà Kotlin không có. Tất nhiên, Kotlin cũng có những đặc điểm mà Dart không có nhưng đó không nằm trong mục đích của series này nên mình sẽ không viết vào.

Tất nhiên, điều kiện cần để hiểu series này là các bạn phải có kiến thức về ngôn ngữ Kotlin hoặc Java hoặc một ngôn ngữ hướng đối tượng nào đó. Nếu bạn chưa biết về ngôn ngữ Kotlin thì có thể theo dõi series học Kotlin từ A đến Á này của mình nhé: [Trở thành lập trình viên với ngôn ngữ Kotlin](https://viblo.asia/s/tro-thanh-lap-trinh-vien-voi-ngon-ngu-kotlin-jy5VB8rz5ra)

OK Quảng cáo vậy đủ rồi. Chúng ta bắt đầu thôi!

# 2. Chuẩn bị hành trang
Đầu tiên chúng ta phải có môi trường để code Dart. Có 2 con đường cho các bạn chọn. Một là dùng IDE, cần phải download, cài đặt, config các kiểu mới code được, con đường này tuy khổ trước nhưng sướng sau :D. Con đường còn lại là mì ăn liền: vào một trang web của Dart để code luôn không cần cài đặt gì cả.

## Con đường khổ trước sướng sau
Sau đây mình sẽ hướng dẫn nếu bạn chọn con đường khổ trước sướng sau là chọn IDE để code. IDE có thể là IntelliJ IDEA IDE, Visual Studio Code, .... Mình chọn IntelliJ IDEA IDE. Các bạn có thể download [tại đây](https://www.jetbrains.com/idea/download/#section=windows). Tiếp theo chúng ta cần cài đặt plugin Dart trên IntelliJ IDEA IDE. Các bạn chọn menu File/Setting.

![](https://images.viblo.asia/0c83bc00-98d3-4ddf-9de9-e8a7f20e15c2.PNG)


Tiếp theo chúng ta cần download và cài đặt Dart SDK (hoặc máy bạn đã cài sẵn Flutter SDK thì trong Flutter SDK nó cũng chứa sẵn luôn Dart SDK rồi). Vào đây để xem hướng dẫn tải và cài đặt Dart SDK: https://dart.dev/get-dart

Ok, bắt đầu tạo project đầu tay thôi: chọn menu File/New/Project

![](https://images.viblo.asia/e5201981-f5e8-44d1-96c6-fc1931e0fd81.PNG)

Các bạn có thể thấy mình Dart SDK path của mình không phải trong Flutter SDK (nếu các bạn đã cài Flutter SDK thì path của Dart SDK trong Flutter SDK trong window như sau: `C:\flutter\bin\cache\dart-sdk`). Sở dĩ mình download Dart SDK riêng là vì mình muốn code Dart version mới nhất là 2.9.0 (stable release ngày 5 tháng 8 năm 2020, Wow! nó cách thời điểm mình viết bài này có 4 ngày, hàng mới cứng :D). Còn trong Flutter SDK thì Dart mới chỉ ở version 2.8.4

Lý do thứ 2 mình chọn Dart sdk version 2.9.0 trở lên là để trải nghiệm được tính năng Null Safety (tương tự Kotlin), còn các version cũ thì Dart chưa có tính năng này. Mà version 2.9.0 này lại chưa có trong Flutter SDK. Nói cách khác là project Flutter chưa chiến được tính năng Null Safety này. Mà cho dù có chiến được thì Google cũng khuyên rằng không nên enable tính năng Null Safety vào các production vì nó mới chỉ là tính năng thử nghiệm, sẽ có rất nhiều rủi ro khi dùng nó :(. Tuy mình sử dụng ver 2.9.0 nhưng mình không enable tính năng experiment của Dart lên thì code nó cũng giống như ver 2.8.x thôi nhé. Xuyên suốt bài viết này mình sẽ không enable tính năng experiment vì mình muốn học xong là phải dùng được ngay để chiến Flutter. Do đó các bạn không bắt buộc phải cài version mới nhất là 2.9.0, các bạn vẫn có thể sử dụng phiên bản 2.8.x nếu muốn. Tất nhiên, mình cũng không muốn bỏ sót một tính năng quan trọng như Null Safety nên mình sẽ enable experiment của Dart và giới thiệu tính năng Null Safety ở cuối bài viết này.

## Con đường mì ăn liền
Có tới 2 trang web, một trang có tích hợp tính năng Null Safety: https://nullsafety.dartpad.dev/

Trang web thứ 2 này sẽ không có tính năng Null Safety: https://dartpad.dev/

Nếu bạn muốn chạy thử các example trong bài viết này thì mình khuyến khích dùng trang web thứ 2 tức là không có tính năng Null Safety. Vì xuyên suốt bài viết này mình sẽ không enable tính năng experiment nên nếu bạn dùng trang web thứ nhất để chạy code trong bài viết này có thể gây ra side effect không mong muốn!.

OK! Hành trang đã đủ. Let’s get started!
# 3. Đặt tên file source code và folder/package
![](https://images.viblo.asia/d4537394-7f90-485a-a206-27b2398eec24.jpg)

* Tên package/folder của Kotlin và Dart đều viết kiểu chữ thường (lower case) nhưng khác với Kotlin đặt tên package/folder không có dấu underscore `_` thì Dart lại cho phép sử dụng dấu `_`
* File source code của Dart có đuôi là .dart, quy ước đặt tên file cũng khác Kotlin. Kotlin sử dụng `UpperCamelCase` (VD: MyClassName.kt) thì Dart sử dụng `lowercase_with_underscores` (VD: my_class_name.dart) và chỉ được phép sử dụng các ký tự Latinh `a-z`, các chữ số `0-9`, ký tự underscrore `_` và không được bắt đầu bởi chữ số.

> Tóm lại: Đặt tên file source code và folder/package trong Dart đều sử dụng stype: `lowercase_with_underscores`
# 4. Hàm main()
![](https://images.viblo.asia/fef0159a-b2e4-4793-819c-b8294c2b3c77.jpg)

Cũng giống như Kotlin, hàm `main()` là hàm mà khi run project thì hàm này sẽ chạy đầu tiên. Khác biệt duy nhất ở đây chỉ là syntax. Kotlin dùng `fun` còn Dart dùng `void` (khá giống Java). Còn nhiều thứ Dart khá giống Java nữa nên nếu bạn nào đã học Java rồi thì học Dart sẽ khá dễ dàng. Tuy nhiên nhân vật chính trong bài viết của mình là Kotlin nên mình sẽ không nói nhiều về Java :D.  

# 5. Hàm print() và dấu `;` huyền thoại come back
![](https://images.viblo.asia/d81ab731-3d81-46b0-adc3-14908a61af28.jpg)

* Dart sử dụng hàm print() để in xuống dòng tương đương với hàm println() trong Kotlin
* String trong Kotlin sử dụng dấu nháy kép `" "` còn Dart sử dụng dấu nháy đơn `' '`
* Biểu thức (expression) trong Kotlin không cần dấu `;` nhưng Dart lại cần có dấu `;` huyền thoại cuối mỗi expression.
# 6. Kiểu dữ liệu cơ bản có sẵn (Basic built-in data types)
## Kiểu số nguyên
Dart chỉ có 1 kiểu số nguyên là `int` (64 bits) tương đương kiểu `Long` trong Kotlin. Chú ý là kiểu `int` được viết thường nha các bạn :D

## Kiểu số thực
Kotlin có 2 kiểu số thực là: `Float` (32 bits) và `Double` (64 bits), còn Dart chỉ có 1 kiểu số thực là `double` (64 bits) và cũng viết thường.

## Kiểu Boolean
Trong Kotlin là `Boolean` còn trong Dart là `bool`

## Kiểu String
Cả Kotlin và Dart đều dùng `String`. Tuy nhiên trong Dart không có kiểu `Char`

Tóm tắt lại các basic type:
![](https://images.viblo.asia/fbd1611b-d650-4a58-b852-5248db8fe0e0.jpg)

# 7. Comment
Comment trong Dart cũng giống Kotlin là sử dụng: `// nội dung comment` hoặc  `/* nội dung comment */`
# 8. Khai báo biến và hằng
Trong Dart có 4 cách khai báo biến:
![](https://images.viblo.asia/659c3442-b0db-4eeb-b6be-165a74998c7a.jpg)

* 2 cách để khai báo biến vừa get vừa set là: 

`{kiểu dữ liệu} {tên biến} = {giá trị khởi tạo}` và

`var {tên biến} = {giá trị khởi tạo}`


* Dart cũng có thể tiên đoán kiểu dữ liệu (Type Inference) tương tự như Kotlin
* Để khai báo biến read-only (get only) thì ta dùng  cú pháp: `final {tên biến} = {giá trị khởi tạo}`
* Để khai báo hằng số thì ta dùng cú pháp: `const {tên hằng} = {giá trị khởi tạo}`
* Cách đặt tên biến thì dùng kiểu `lowerCamelCase`  (VD: isMyDog) tương tự Kotlin nhưng cách đặt tên hằng lại khác. Kotlin đặt tên hằng là ghi hoa toàn bộ và dấu `_` (VD: `CONNECTION_TIMEOUT`), còn trong Dart đặt tên hằng cũng dùng kiểu `lowerCamelCase` tương tự như đặt tên biến luôn (VD: `connectionTimeout`).

# 9. Kiểu dynamic (dynamic type)
Đây là một kiểu độc lạ mà Kotlin không có đó là kiểu `dynamic`. Kiểu này nó cho phép linh hoạt kiểu dữ liệu, nói cách khác là một biến có thể đổi kiểu dữ liệu. Thật vi diệu :v

![](https://images.viblo.asia/5db51a43-da44-4f9b-9a7c-0d6a9d8594cf.PNG)

```
Output:
3
3.5
true
Minh
```

# 10. Kiểu num
Thêm một kiểu độc lạ mà Kotlin không có nữa là kiểu `num`. Kiểu này nó vừa là số nguyên vừa là số thực. Vi diệu tập 2 :|

![](https://images.viblo.asia/551aec3e-21b9-4407-9f0b-a9fc5c4400a0.PNG)
* Hàm `runtimeType` có sẵn trong mọi đối tượng để in ra kiểu dữ liệu
* Có thể thấy kiểu `num` này nó cũng giống `dynamic` chỉ khác một chỗ là `num` chỉ có thể chuyển đổi qua lại giữa 2 kiểu là `int` và `double`
* Tất nhiên khi dùng kiểu `num` phải dùng cách `{kiểu dữ liệu} {tên biến} = {giá trị khởi tạo}` rồi chứ xăng pha nhớt thế này thì `var` nó đoán kiểu thế nào được. Trong Dart không có cú pháp `var` đi kèm với type như bên Kotlin đâu nhá.

![](https://images.viblo.asia/290ae0bc-1125-4c47-92da-f2a6b26c21f6.PNG)

Tuy nhiên, `final` với `const` thì có thể đi kèm với type nhưng sẽ bị warning vì code thừa thãi :D

![](https://images.viblo.asia/acf46038-b25a-49f7-829e-218e529f4fab.PNG)

# 11. Class Object
Kiểu `Object` trong Dart giống kiểu `Any?` trong Kotlin. Đó là ông tổ của tất cả các kiểu (hay nói cách khác class `Object` là root class trong Dart). Như vậy là tất cả kiểu `int`, `double`, `String`, `Student`, `List`,... đều là con của class `Object`. Chính vì điều đó nên mọi kiểu dữ liệu trong Dart đều là kiểu object kể cả kiểu `int`, `double` hay `bool` nhé. Do đó giá trị default của mọi kiểu dữ liệu đều là `null`. Ví dụ:
```dart
void main() {
  int a; // không có giá trị khởi tạo
  print(a); // nên nó sẽ in ra giá trị default là: null
}
```
# Kết luận
Ban đầu mình dự định sẽ viết vào chung 1 bài. Tuy nhiên mới đi được một nửa mà bài viết đã dài thế này nên mình sẽ chia ra nhiều phần. Phần đầu tạm viết nhiêu đây thôi. Hy vọng các bạn tiếp tục theo dõi những phần tiếp theo :D

Tham khảo: https://dart.dev/guides

Đọc tiếp phần 2: [Học nhanh ngôn ngữ Dart (Flutter) nhờ ngôn ngữ Kotlin (Phần 2)](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-2-L4x5x3vwlBM)