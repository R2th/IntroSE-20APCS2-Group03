Tiếp theo bài trước, bài này ta sẽ bắt đầu tập trung vào code.

Đây là hướng dẫn để tạo ứng dụng Flutter đầu tiên của bạn. Nếu bạn đã quen với mã hướng đối tượng và các khái niệm lập trình cơ bản như biến, vòng lặp và điều kiện, bạn có thể hoàn thành hướng dẫn này. Bạn không cần kinh nghiệm trước đó với ngôn ngữ Dart hoặc thiết bị di động.

* Bước 1: Tạo ứng dụng khởi động Flutter
* Bước 2: Sử dụng gói bên ngoài
* Bước 3: Thêm tiện ích con trạng thái
* Bước 4: Tạo một ListView cuộn vô tận

### Những gì bạn sẽ xây dựng trong phần này
Bạn sẽ triển khai một ứng dụng di động đơn giản tạo tên được đề xuất cho một công ty khởi nghiệp. Người dùng có thể chọn và bỏ chọn tên, lưu tên tốt nhất. Khi người dùng cuộn, nhiều tên hơn được tạo. Không có giới hạn về mức độ người dùng có thể cuộn.

![](https://images.viblo.asia/1e772044-a9f2-4eec-a85f-b994749fe503.gif)

*GIF động hiển thị cách ứng dụng hoạt động khi hoàn thành.*

**Những gì bạn sẽ học**

> * Cách viết ứng dụng Flutter trông tự nhiên trên cả iOS và Android.
> * Cấu trúc cơ bản của ứng dụng Flutter.
> * Tìm và sử dụng các gói để mở rộng chức năng.
> * Sử dụng Hot reload cho chu kỳ phát triển nhanh hơn.
> * Làm thế nào để thực hiện một widget stateful.
> * Làm thế nào để tạo ra một danh sách vô hạn, được tải nhẹ nhàng.

**Những gì bạn sẽ sử dụng**

> Bạn cần hai phần mềm để hoàn thành bài này: SDK Flutter và trình chỉnh sửa . Codelab này giả định sử dụng Android Studio, nhưng bạn có thể sử dụng trình soạn thảo ưa thích của mình.
> 
> Bạn có thể chạy codelab này bằng bất kỳ thiết bị nào sau đây:
> 
> * Thiết bị vật lý ( Android hoặc iOS ) được kết nối với máy tính của bạn và được đặt ở chế độ nhà phát triển.
> * Trình mô phỏng iOS.
> * Trình giả lập Android.

## Bước 1: Tạo ứng dụng khởi động Flutter
Tạo một ứng dụng Flutter đơn giản, có khuôn mẫu, sử dụng các hướng dẫn trong bài trước. Đặt tên cho dự án startup_namer (thay vì myapp ).

Trong codelab này, bạn hầu như sẽ chỉnh sửa lib/main.dart , nơi mã Dart tồn tại.

1. Thay thế nội dung của lib/main.dart . 
Xóa tất cả mã khỏi lib/main.dart . Thay thế bằng mã sau đây, hiển thị “Hello World” ở giữa màn hình.

 ```
 import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```
> Mẹo: Khi dán mã vào ứng dụng của bạn, thụt đầu dòng có thể bị lệch. Bạn có thể tự động sửa lỗi này bằng các công cụ của Flutter:
> 
> * Android Studio / IntelliJ IDEA: Nhấp chuột phải vào mã và chọn **Reformat Code with dartfmt**.
> * VS Code: Nhấp chuột phải và chọn **Format Document**.
> * Terminal: Chạy flutter format <filename> .
Chạy ứng dụng bằng cách nhấp vào mũi tên màu xanh lá cây trong IDE. Bạn sẽ thấy output Android hoặc iOS, tùy thuộc vào thiết bị của bạn.

![](https://images.viblo.asia/419979f3-cef9-4504-b867-ad800591b048.png)
![](https://images.viblo.asia/a72972a7-bf1d-4291-9d88-9048b1a88b7a.png)

> Mẹo: Lần đầu tiên bạn chạy trên thiết bị thực, có thể mất một lúc để tải. Sau này, bạn có thể sử dụng Hot reload để cập nhật nhanh. Save cũng thực hiện tải lại nóng nếu ứng dụng đang chạy.

### Quan sát
* Ví dụ này tạo ra một ứng dụng Material. Material là ngôn ngữ thiết kế trực quan tiêu chuẩn trên thiết bị di động và web. Flutter cung cấp một tập hợp các widget Material phong phú.
* Hàm Main xác định ký hiệu mũi tên béo (=>). Sử dụng ký hiệu mũi tên béo cho các hàm hoặc phương thức một dòng.
* Ứng dụng extends từ StatelessWidget khiến cho ứng dụng chính nó là một widget. Trong Flutter, hầu như tất cả mọi thứ là một widget, bao gồm cả alignment, padding và layout.
* Widget Scaffold , từ thư viện Material, cung cấp thanh ứng dụng mặc định, tiêu đề và thuộc tính body chứa cây widget cho màn hình chính. Widget subtree có thể khá phức tạp.
* Công việc chính của widget là cung cấp phương thức build() mô tả cách hiển thị tiện ích con theo các tiện ích con cấp thấp khác.
* Phần thân của ví dụ này bao gồm một widget Center có chứa một widget con Text . Tiện ích con Center căn chỉnh subtree widget của nó với trung tâm của màn hình.

## Bước 2: Sử dụng package bên ngoài
Trong bước này, bạn sẽ bắt đầu sử dụng một package mã nguồn mở có tên là [english_words](https://pub.dartlang.org/packages/english_words) , chứa một vài nghìn từ tiếng Anh được sử dụng nhiều nhất cộng với một số hàm tiện ích.

Bạn có thể tìm thấy package english_words, cũng như nhiều package nguồn mở khác, trên [pub.dartlang.org](https://pub.dartlang.org/flutter/) .

1. Tệp pubspec quản lý nội dung và dependencies cho ứng dụng Flutter. Trong **pubspec.yaml** , thêm **english_words** (3.1.0 hoặc cao hơn) vào danh sách dependencies. Thêm dòng được đánh dấu bên dưới:

```
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^0.1.0
  english_words: ^3.1.0
```
2. Trong khi xem pubspec trong chế độ xem trình chỉnh sửa của Android Studio, nhấp vào **Packages get**. Nó sẽ tải package vào dự án của bạn. Bạn sẽ thấy những điều sau trong bảng điều khiển:
```
 > flutter packages get
 Running "flutter packages get" in startup_namer...
 Process finished with exit code 0 
 ```
Chạy Packages get cũng tự động tạo tệp pubspec.lock với danh sách tất cả các gói được đưa vào dự án và số phiên bản của chúng.

3. Trong lib/main.dart, import package mới:

```
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
```
Khi bạn import, Android Studio cung cấp cho bạn các đề xuất cho thư viện để import. Sau đó nó sẽ hiển thị chuỗi import màu xám, cho bạn biết rằng thư viện đã import không được sử dụng (cho đến thời điểm hiện tại).

4. Sử dụng package english_words để tạo văn bản thay vì sử dụng chuỗi “Hello World”.

Thực hiện các thay đổi sau:

```
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          //child: Text('Hello World'), // Replace the highlighted text...
          child: Text(wordPair.asPascalCase),  // With this highlighted text.
        ),
      ),
    );
  }
}
```
> Lưu ý: "Pascal case" (còn được gọi là "upper camel case"), có nghĩa là mỗi từ trong chuỗi, bao gồm cả từ đầu tiên, bắt đầu với một chữ hoa. Vì vậy, “uppercamelcase” trở thành “UpperCamelCase”.

Nếu ứng dụng đang chạy, hãy sử dụng nút Hot reload (biểu tượng tia chớp) để cập nhật ứng dụng đang chạy. Mỗi khi bạn nhấp vào tải lại nóng hoặc lưu dự án, bạn sẽ thấy một cặp từ khác nhau, được chọn ngẫu nhiên, trong ứng dụng đang chạy. Điều này là do việc ghép nối từ được tạo bên trong phương thức xây dựng, được chạy mỗi khi MaterialApp yêu cầu hiển thị hoặc khi chuyển đổi nền tảng trong Flutter Inspector.

![](https://images.viblo.asia/d2777cea-ba88-48e9-8171-190b6818f0e4.png)
![](https://images.viblo.asia/c965f2a5-a76d-4d96-91f7-41cc15f1872f.png)

Ảnh chụp màn hình khi hoàn thành bước thứ hai

Gặp vấn đề?
Nếu ứng dụng của bạn không hoạt động chính xác, hãy tìm lỗi chính tả. Nếu cần, hãy sử dụng mã tại các liên kết sau để trở lại đúng hướng.

* [pubspec.yaml](https://raw.githubusercontent.com/chalin/flutter-codelabs/master/startup_namer/2_end_of_use_package/pubspec.yaml)
* [lib / main.dart](https://raw.githubusercontent.com/chalin/flutter-codelabs/master/startup_namer/2_end_of_use_package/lib/main.dart)

*Còn tiếp*