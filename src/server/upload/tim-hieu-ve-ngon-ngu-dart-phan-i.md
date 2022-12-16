Ở các phần trước chúng ta đã cùng tìm hiểu sơ lược về Flutter. Sẽ thật thiếu sót khi chúng ta bỏ qua ngôn ngữ lập trình được dùng trong Flutter - Dart, vì vậy phần này ta sẽ cùng tìm hiểu về ngôn ngữ mới mẻ này.

Những thứ ta sẽ tìm hiểu trong phần này:
* Dart là gì?
* Tại sao lại chọn Dart? Những ưu điểm của nó?
* Cài đặt Dart
* Hello World!

## Dart là gì?

Dart là ngôn ngữ lập trình đa mục đích ban đầu được phát triển bởi Google và sau đó được Ecma (ECMA-408) phê chuẩn làm tiêu chuẩn. Nó được sử dụng để xây dựng các ứng dụng web, server, máy tính để bàn và thiết bị di động.
Dart là một ngôn ngữ hướng đối tượng, được xác định theo lớp, với cơ chế garbage-collected, sử dụng cú pháp kiểu C để dịch mã tùy ý sang JavaScript. Nó hỗ trợ interface, mixin, abstract, generic, static typing và sound type (2 cái cuối có thể hiểu là type-safe).
Dart là ngôn ngữ mã nguồn mở và miễn phí, được phát triển trên [GitHub](https://github.com/dart-lang).
Hiện nay Dart đã release phiên bản 2.2

## Tại sao lại chọn Dart? Những ưu điểm của nó?

### Tại sao lại chọn Dart

Các nhà phát triển tại Google và các nơi khác sử dụng Dart để tạo các ứng dụng chất lượng cao, quan trọng cho iOS, Android và web. Với các tính năng nhắm đến sự phát triển phía khách hàng, Dart rất phù hợp cho cả ứng dụng di động và web.
Dart giúp bạn tạo ra những trải nghiệm đẹp, chất lượng cao trên tất cả các màn hình, với:
* Một ngôn ngữ được tối ưu hóa cho client
* Framework mạnh mẽ
* Công cụ linh hoạt

### Những ưu điểm của Dart

**Năng suất**
Cú pháp Dart rõ ràng và súc tích, công cụ của nó đơn giản nhưng mạnh mẽ. Type-safe giúp bạn xác định sớm các lỗi tinh tế. Dart có các thư viện cốt lõi và một hệ sinh thái gồm hàng ngàn package.

**Nhanh**
Dart cung cấp tối ưu hóa việc biên dịch trước thời hạn để có được dự đoán hiệu suất cao và khởi động nhanh trên các thiết bị di động và web.

**Di động**
Dart biên dịch thành mã ARM và x86, để các ứng dụng di động của Dart có thể chạy tự nhiên trên iOS, Android và hơn thế nữa. Đối với các ứng dụng web, chuyển mã từ Dart sang JavaScript.

**Dễ gần**
Dart quen thuộc với nhiều nhà phát triển hiện có, nhờ vào cú pháp và định hướng đối tượng không gây ngạc nhiên của nó. Nếu bạn đã biết C ++, C # hoặc Java, bạn có thể làm việc hiệu quả với Dart chỉ sau vài ngày.

**Reactive**
Dart rất phù hợp với lập trình Reactive, với sự hỗ trợ để quản lý các đối tượng tồn tại trong thời gian ngắn, chẳng hạn như các widget UI, thông qua phân bổ đối tượng nhanh và GC. Dart hỗ trợ lập trình không đồng bộ thông qua các tính năng ngôn ngữ và API sử dụng các đối tượng Future và Stream.

## Cài đặt Dart

Dart cung cấp cho bạn một bộ tool trên trình duyệt web được gọi là DartPad để bạn có thể dễ dàng viết và test Dart. Bạn có thể truy cập vào DartPad tại [đây](https://dartpad.dartlang.org/)
Mặc dù DartPad là một cách tuyệt vời để tìm hiểu cách viết một ứng dụng đơn giản, nhưng khi bạn đã sẵn sàng để phát triển các ứng dụng thực sự, bạn cần có SDK.
Vì mục đích của chúng ta là sử dụng Dart cho Flutter nên ta chỉ cần cài đặt Flutter (chi tiết tại https://viblo.asia/p/bat-dau-lam-viec-voi-flutter-phan-i-GrLZDXOnZk0) là chúng ta đã sẵn sàng.

## Hello World!

```
void main() {
    print('Hello World!');
}
```

Vậy là xong, bài của chúng ta kết thúc tại đây :)

Đùa chút thôi, ta sẽ cùng tìm hiểu về 1 đoạn code đơn giản sau

```
// Define a function.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

Đoạn code đơn giản ở trên dùng nhiều đến những tính năng cơ bản trong Dart, ta sẽ cùng phân tích

`// This is a comment.`
Một comment một dòng. Dart cũng hỗ trợ comment nhiều dòng và tài liệu. Để biết chi tiết, xem [Comments](https://www.dartlang.org/guides/language/language-tour#comments).

`int`
Một kiểu. Một số kiểu tích hợp khác là String, List và bool.

`42`
Một số theo nghĩa đen. Số và chữ là một loại hằng số

`print()`
Một cách tiện dụng để hiển thị đầu ra.

`'...' (or "...")`
Một chuỗi ký tự.

`$variableName (or ${expression})`
Nội suy String: bao gồm một biến hoặc biểu thức String tương đương bên trong chuỗi ký tự. Để biết thêm thông tin, xem [String](https://www.dartlang.org/guides/language/language-tour#strings).

`main()`
Hàm main(), hàm cấp cao nhất, bắt buộc, bắt đầu thực hiện ứng dụng. Để biết thêm thông tin, hãy xem [Hàm main()](https://www.dartlang.org/guides/language/language-tour#the-main-function).

`var`
Một cách để khai báo một biến mà không chỉ định loại của nó.

Chúng ta sẽ tìm hiểu thêm về ngôn ngữ Dart ở các phần sau. Bạn có thể xem thêm về Dart tại trang chủ của nó https://www.dartlang.org/