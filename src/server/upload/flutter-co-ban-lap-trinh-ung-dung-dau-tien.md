![image.png](https://images.viblo.asia/30e0c4f0-6ee4-419c-abee-2e4b459989db.png)

Flutter đang ngày càng phát triển không chỉ dành cho mobile mà còn với các nền tảng khác: Web, hệ thống nhúng, desktop app. Không có thời gian nào tốt hơn bây giờ để học Flutter!

Điều gì sẽ tốt hơn là bắt đầu xây dựng ứng dụng đầu tiên của chúng ta? Vì vậy, chúng ta hãy bắt đầu ngay lập tức!

Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/flutter-co-ban-xay-dung-ung-dung-dau-tien/)

## Thiết lập môi trường

Đối với loạt bài hướng dẫn này, mình đang sử dụng Visual Studio Code làm Editor của mình. Bạn có thể sử dụng bất kỳ editor nào mà bạn chọn. Hãy đảm bảo Flutter SDK được cài đặt trên máy của bạn. Ngoài ra, bạn phải cài đặt Android Studio để chạy ứng dụng trên Emulator hoặc bất kỳ thiết bị Android nào. Nếu đang sử dụng macOS, bạn cũng có thể thiết lập XCode để chạy các ứng dụng Flutter của mình trên trình mô phỏng iOS hoặc các thiết bị iOS thực tế.

## Ứng dụng Demo của chúng ta

Ở đây, chúng ta sẽ xây dựng một demo single page application (app có một màn hình duy nhất) để nhanh chóng làm quen với Flutter và một số widget của nó. Ứng dụng Demo của chúng ta sẽ giống như bên dưới,

![image.png](https://images.viblo.asia/cfa02774-5405-4a4f-8ca0-cdeff31d1f3e.png)

Đây là một  app rất đơn giản mà chúng ta sẽ xây dựng để hiển thị một số Text trên App Bar và Button. Khi nhấp vào button, chúng ta sẽ thay đổi màu nền.

## Khởi tạo ứng dụng

Để khởi tạo một ứng dụng mới, hãy đưa đường dẫn thư mục trong terminal/console của bạn và sử dụng lệnh bên dưới,

```
flutter create your_project_name
```

Ngoài ra, bạn có thể tạo một dự án Flutter mới từ bảng lệnh Android Studio hoặc VS Code của mình.

## Cấu trúc thư mục dự án

Hãy xem nhanh cấu trúc thư mục dự án của chúng ta trước khi bắt đầu xây dựng ứng dụng đầu tiên.

```
>android
>build
>ios
>lib 
   -> main.dart
>test
>.gitignore
>pubspec.lock
>pubspec.yaml
>README.md
```

### Thư mục "android"

Trong thư mục này, tất cả các file dự án cho ứng dụng android đều ở đây. Bạn có thể thực hiện thay đổi, thêm các quyền cần thiết và native Android code tại đây.

### Thư mục "build"

Thư mục này chứa tất cả các đầu ra được biên dịch như app bundles, file apk và các file và thư mục có liên quan khác.

### Thư mục "ios"

Trong thư mục này, tất cả code native cho ứng dụng iOS đều nằm ở đây. Tương tự như thư mục android, bạn có thể thêm các quyền cần thiết và thêm native iOS code tại đây.

### Thư mục "lib"

Đây là thư mục nơi mà tất cả những điều kỳ diệu xảy ra. Trong thư mục lib, bạn có thể thấy rằng bạn có một file main.dart. Tất cả dart code của bạn được viết trong thư mục này sẽ được biên dịch thành native platform code (native android và iOS) trong quá trình biên dịch.

### Thư mục "test"

Trong thư mục này, bạn có thể viết các unit test cho ứng dụng Flutter của mình.

### File ".gitignore"

Mình nghĩ bạn đã khá quen thuộc với file này nếu bạn đang sử dụng GIT làm hệ thống kiểm soát phiên bản (version control) cho các dự án của mình. Những file và folder bạn không muốn GIT kiểm soát và theo dõi thay đổi sẽ được khai báo trong này.

### File "pubspec.lock" và "pubspec.yaml"

Các file này chứa tất cả các tên package được yêu cầu, phiên bản của chúng, liên kết đến nội dung, dependencies, tên ứng dụng, phiên bản ứng dụng, phần dependencies của ứng dụng, v.v.

### File 'README'

Đây là một file markdown chứa tất cả thông tin cơ bản và mô tả về ứng dụng.

## Chạy ứng dụng trên trình giả lập / thiết bị thực

Để chạy ứng dụng của bạn, hãy tạo hoặc mở trình giả lập Android hoặc trình mô phỏng iOS hiện có. Mở thư mục lib và file main.dart và nhấn F5 để chạy ứng dụng của bạn. Nếu bạn đã cài đặt tiện ích mở rộng flashing và dart trong VS code editor của mình thì hãy di chuột qua hàm void main() trong file main.dart và bạn sẽ thấy tùy chọn Run | Debug.

Khi chạy ứng dụng, bạn sẽ thấy một ứng dụng Flutter cơ bản được tạo tự động. File main.dart là điểm vào của ứng dụng Flutter của bạn. Việc thực thi bất kỳ ứng dụng Flutter nào cũng bắt đầu đi từ hàm void main() {...}. Bây giờ hãy xóa mọi thứ và bắt đầu với ứng dụng của chúng ta từ đầu.

## Xây dựng ứng dụng

Với việc file main.dart của bạn đã xoá hết code. Hãy bắt đầu xây dựng ứng dụng lại như sau:

### Importing Packages

Trước tiên, chúng ta cần import các package cần thiết. Trong ứng dụng này, chúng ta yêu cầu material package được cung cấp bởi Flutter. Tất cả các widgets và chức năng được xây dựng dựa trên package này. Chúng ta có thể import package này bằng cách sử dụng câu lệnh sau:

```
import 'package:flutter/material.dart';
```


Nếu ứng dụng của bạn cần thêm các packages khác, câu lệnh cũng sẽ tương tự như trên, chỉ đổi lại tên package mà thôi.

### Tạo một Widget

Mọi thứ trong ứng dụng Flutter đều là Widget! Vì vậy, bất cứ thứ gì chúng ta cần hiển thị phải là một widget. Có hai loại widget được cung cấp bởi material.dart package, chúng ta sẽ xây dựng các widget tùy chỉnh của riêng mình trên đó. Chúng là Stateless Widget và Stateful Widget.

Chúng ta sẽ thảo luận chi tiết và sâu hơn về các state, stateful widgets, và stateless widgets trong các bài viết sắp tới trong series này.

IDE hoặc Editor mà bạn đang sử dụng sẽ giúp bạn xây dựng các widget tùy chỉnh của riêng mình nếu bạn đã cài đặt Flutter and Dart plugin. Chỉ cần nhập stateless hoặc stateful và IDE của bạn sẽ đưa ra các đề xuất tương ứng.

Ở đây, chúng ta sẽ tạo một stateless widget với tên MyApp. Bạn có thể chọn bất kỳ tên nào cho widget.

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

Như bạn có thể thấy rằng chúng ta đang mở rộng StatelessWidget được cung cấp bởi material package để tạo stateless widget tùy chỉnh của riêng chúng ta. @override là một decorator cũng được cung cấp bởi material package.

Widget là abstract class và chúng ta phải override build method. Phương thức này yêu cầu một context là BuildContext được cung cấp bởi Flutter. Bên trong phương thức này, chúng ta trả về Widget mà chúng ta cần xây dựng/hiển thị trên màn hình.

Vì vậy, ở đây chúng ta sẽ trả về MaterialApp cũng là một widget tích hợp được cung cấp bởi material.dart package của Flutter. Widget này chấp nhận nhiều đối số trong phương thức khởi tạo của nó. Bạn có thể tìm thêm thông tin chi tiết bằng cách di chuột qua Material App hoặc Command + Nhấp / Ctrl + Nhấp vào tiện ích MaterialApp. Tài liệu chính thức có thể được tìm thấy [ở đây](https://api.flutter.dev/flutter/material/MaterialApp-class.html).

Chúng ta cần xác định 3 tham số cho MaterialApp, tức là title, theme và home. Title chỉ đơn giản là chấp nhận một chuỗi. Mình sẽ cung cấp nó với First App Demo dưới dạng value. Theme mong đợi một giá trị kiểu dữ liệu ThemeData là một kiểu tích hợp trong Flutter material package. Vì vậy, hãy khởi tạo nó bằng,

```
ThemeData(primarySwatch: Colors.amber,),
```

ThemeData chấp nhận nhiều values để thiết lập app Default theme, primarySwatch là tham số bắt buộc chấp nhận value kiểu MaterialColor. Đây cũng là một loại được tích hợp sẵn và cung cấp Colors.amber cho Flutter để xây dựng chủ đề ứng dụng.

Bây giờ, chúng ta cần thiết lập home chấp nhận một loại Widget. Widget mà bạn cung cấp ở đây sẽ được hiển thị trên màn hình. Bây giờ, chúng ta sẽ khởi tạo nó bằng một vùng chứa như thế này, home: Container(),. Điều này sẽ sớm được thay thế bằng widget tùy chỉnh của chúng ta. Widget của chúng ta trông giống như thế này:

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First App Demo',
      theme: ThemeData(
        primarySwatch: Colors.amber,
      ),
      home: Container(),
    );
  }
}
```

### Hàm main

Để chạy ứng dụng, chúng ta cần hàm main. Hàm main có thể được viết bằng cú pháp chung (){...} hoặc bằng cách định nghĩa nó dưới dạng hàm mũi tên ()=>. Cả hai cú pháp như dưới đây:

```
void main() {
  runApp(MyApp());
}
```

Hoặc

```
void main() =>runApp(MyApp());
```

Cả hai cách trên sẽ hoạt động tốt. Mặc dù vậy, hàm mũi tên viết tắt sẽ thanh lịch hơn nếu chúng ta cần trả về một giá trị duy nhất. Bây giờ, chạy ứng dụng của bạn với F5 hoặc Run|Debug và bạn sẽ thấy một màn hình trống.

### Tạo một StatefulWidget

Thay vì hiển thị một vùng chứa trống không có gì ngoài một màu đen, hãy build một thứ gì đó hay ho hơn.

Để tạo StatefulWidget, hãy sử dụng tính năng tự động hoàn thành IDE hoặc Editor của bạn bằng cách chỉ cần gõ stateful và nhấn tab. Ở đây, tôi đang tạo một Stateful widget với tên DummyWidget như bên dưới,

```
class DummyWidget extends StatefulWidget {
  @override
  _DummyWidgetState createState() => _DummyWidgetState();
}

class _DummyWidgetState extends State<DummyWidget> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

Bạn có thể thấy rõ rằng, StatefulWidget có một chút khác biệt so với StatelessWidget. Hiện tại, tất cả những gì mình sẽ nói là StatefulWidget có thể phản ứng với những thay đổi dữ liệu trong nội bộ và tự render lại để phản ánh những thay đổi. Trong khi các StatelessWidget không tự xây dựng lại nếu dữ liệu thay đổi bên trong chúng.

Mình sẽ trình bày chi tiết hơn về vấn đề này trong các bài viết sắp tới của mình.

Chúng ta cần một số loại dữ liệu nội bộ để chúng ta có thể hiểu các Stateful Widgets. Ở đây, mình sẽ lấy một giá trị boolean có tên _isGreen để khởi tạo false theo mặc định. Mình đang sử dụng _ ở phía trước biến khiến nó trở thành biến riêng trong Dart và chỉ có thể truy cập bên trong class này.

Bây giờ, thay vì trả lại một empty container từ Widget build(BuildContext context){...} method, chúng ta sẽ trả về một thứ thú vị!

Chúng ta sẽ trả lại một Scaffold cũng là một widget được cung cấp bởi material package. Lưu ý rằng mỗi khi bạn muốn hiển thị một màn hình mới/khác, bạn cần cung cấp Scaffold. Scaffold chấp nhận một số tham số trong phương thức khởi tạo của nó.

Ở đây, chúng ta sẽ cung cấp cho nó appBar và body để xem một số nội dung trên màn hình. DummyWidget sẽ trông như thế này,

```
class _DummyWidgetState extends State<DummyWidget> {
  bool _isGreen = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _isGreen ? Colors.green : Colors.red,
      appBar: AppBar(
        title: Text('Your First App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              onPressed: () {
                setState(() {
                  _isGreen = !_isGreen;
                });
              },
              child: Text(_isGreen ? 'TURN RED' : 'TURN GREEN'),
            ),
          ],
        ),
      ),
    );
  }
}
```

Hãy hình dung những gì đang xảy ra trong Stateful DummyWidget của chúng ta. Chúng ta có một biến private kiểu bool tên là `_isGreen` với mặc định là `false`. Thay vì trả về một vùng chứa, chúng ta đang trả về Scaffold widget và chúng ta đã cung cấp cho nó 2 tham số là `appBar` và `body`.

AppBar chấp nhận value of type PreferredSizeWidget trong trường hợp này là AppBar(). `AppBar()` cũng chấp nhận nhiều tham số khác để thiết lập nhưng chúng ta chỉ sử dụng một tham số ở đây để thiết lập title được hiển thị trên AppBar. Title chấp nhận type Widget nên chúng ta đang sử dụng `Text()` widget có sẵn.

Body cũng chấp nhận type Widget, vì vậy ở đây chúng ta đang sử dụng `Column()` widget được tích hợp sẵn. Theo mặc định, cột kéo dài từ trên xuống dưới của màn hình và tự bao bọc xung quanh các child widget của nó. Cột có thể chứa multiple widgets làm children của nó.

Ở đây, chúng ta có một con duy nhất của widget `Column()` là `FlatButton()` cũng là một widget được cung cấp bởi material package. `Flatbutton()` có một tham số `onPressed` và một tham số child. `onPressed` nhận vào hàm vô danh hoặc một hàm được khai báo sẵn thông qua tên của nó. Nội dung bạn viết bên trong hàm này xác định điều gì sẽ xảy ra khi nút được nhấn vào.

Bên trong hàm vô danh (anonymous function) này, chúng ta đang sử dụng `setState(() {...});` kích hoạt xây dựng lại Widget. Nếu chúng ta thay đổi một số giá trị bên trong như trong trường hợp của chúng ta, chúng ta sẽ thay đổi giá trị boolean _isGreen bên trong trạng thái đã đặt. Trên mỗi nút bấm, giá trị này sẽ thay đổi và kích hoạt quá trình render lại StatefulWidget này.

Cuối cùng, chúng ta cung cấp `Text('...')` widget như một phần tử con cho `FlatButton(...)`. Điều này chỉ định những gì được hiển thị bên trong nút.

Cuối cùng, trong StatelessWidget MyApp của chúng ta thay vì trả về một vùng chứa trống, chúng ta trả về StatefulWidget DummyWidget theo tuỳ chỉnh của chúng ta. Với điều này trong ứng dụng đang chạy của bạn, bạn đã có thể thấy widget tùy chỉnh của mình trên màn hình. Bây giờ, finished code của chúng ta trong file main.dart trông như bên dưới,

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First App Demo',
      theme: ThemeData(
        primarySwatch: Colors.amber,
      ),
      home: DummyWidget(),
    );
  }
}

class DummyWidget extends StatefulWidget {
  @override
  _DummyWidgetState createState() => _DummyWidgetState();
}

class _DummyWidgetState extends State<DummyWidget> {
  bool _isGreen = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _isGreen ? Colors.green : Colors.red,
      appBar: AppBar(
        title: Text('Your First App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              onPressed: () {
                setState(() {
                  _isGreen = !_isGreen;
                });
              },
              child: Text(_isGreen ? 'TURN RED' : 'TURN GREEN'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Kết

Yeah! Thật tuyệt phải không này. Bạn đã làm được ứng dụng đầu tiên với Flutter. Mình hy vọng bạn sẽ thích bài viết này và có những trải nghiệm tuyệt vời khi tạo ứng dụng với Flutter.

Bài viết được lược dịch từ [Shashank Biplav.](https://shashankbiplav.me/getting-started-with-flutter-and-building-your-first-app)