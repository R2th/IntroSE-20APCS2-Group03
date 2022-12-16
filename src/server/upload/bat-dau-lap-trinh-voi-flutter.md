Tôi là một lập trình viên backend, cụ thể là code ruby. Nhưng tôi cũng thích code mobile, cũng muốn có một sản phẩm mobile hay ho, nhưng lại rất lười vì phải tìm hiểu cả 2 nền tảng iOS và Android. Và tôi đã tìm đến với khái niệm Cross Platform Mobile.

Trước đây, tôi có thử tìm hiểu react native, tại tôi có code react rồi nên nghĩ việc chuyển qua react native sẽ đơn giản. Tuy nhiên, quá trình cài đặt react native rất là phức tạp. Muốn cài 1 project React Native thì cần cài rất nhiều thư viện javascript, mà mỗi thư viện là có ràng buộc nhiều version của các thư viện phụ thuộc khác nhau, rồi khi nâng cấp version cũng sẽ phát sinh nhiều lỗi nữa. Vậy là nản, mặc dù tôi rất thích tính năng Hot Reload ở react native, giống như code ruby on rails, cập nhật thay đổi ngay trên simulator thay vì phải đợi 1 lúc để build code.

Và đến giờ, tình cờ đọc 1 bài báo về flutter, đại khái là Flutter sẽ thay đổi bộ mặt của lập trình mobile. Nghe có vẻ hơi khoa trương, nhưng tôi cũng thử đọc. Thật bất ngờ, flutter đã cung cấp đủ các yếu tố cần thiết mà tôi mong đợi để lập trình mobile. 

### 1. Flutter là gì

Flutter là framework được rất nhiều người quan tâm ở thời điểm hiện tại. Là Cross Platform Mobile được phát triển bởi Google, build native cho cả Android và iOS, có thể giao tiếp với native để viết các module base on native (gần như bắt buộc). 

#### Ưu điểm:
- Cài đặt dễ dàng 
- Mạnh về animation, performance app rất cao.
- Giao tiếp gần như trực tiếp với native
- Cung cấp các widget được dựng sẵn cho hầu hết các animation và tác vụ, widget sẽ tự động hiển thị phù hợp cho từng device, từng loại màn hình 
- Static language nhưng với syntax hiện đại, compiler linh động giữa AOT (for archive, build prod) và JIT (for development, hot reload)
- Có thể chạy được giả lập mobile ngay trên web, tiện cho development. Cung cấp các thông số đo đạc performance được hỗ trợ sẵn giúp developer kiểm soát tốt performance của app.
- Có thể dùng để build các bundle/framework gắn và app native để tăng performance.

#### Nhược điểm:
- Phải học thêm ngôn ngữ DART, bloc pattern, DART Streaming, tuy nhiên nếu ai từng code python, typescript thì học ngôn ngữ này cũng khá đơn giản, vì mình thấy khá giống mấy ngôn ngữ đấy.
-  Là ngôn ngữ mới và framework mới, nên cộng đồng chưa thực sự nhiều 
-  Chưa chỗ nào tuyển cả :D, nhưng nếu bạn chỉ học để code tự tạo sản phẩm thì sẽ rất phù hợp 

### 2. Cài đặt 

Để cài đặt flutter và sử dụng code thì bạn cần cài đặt:

- Flutter SDK
- Xcode - để test với iOS Simulator và Device
- Android Studio - để  với Android Simulator và Device, và sử dụng là IDE luôn, đây là theo khuyến khích của Google 

#### Cài Flutter SDK 

- Tải gói cài đặt cho phiên bản ổn định và mới nhất của Flutter SDK: [flutter_macos_1.17.1-stable.zip](https://storage.googleapis.com/flutter_infra/releases/stable/macos/flutter_macos_1.17.1-stable.zip)
- Giải nén file:

```ruby
 cd ~/development
 unzip ~/Downloads/flutter_macos_1.17.1-stable.zip
```

- Cập nhật đường dẫn:

Mở file $HOME/.bash_profile hay $HOME/.bashrc hoặc $HOME/.zshrc nếu bạn dùng Z shell và thêm 

```ruby
export PATH="$PATH:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin"
```

với PATH_TO_FLUTTER_GIT_DIRECTORY là đường dẫn đến folder flutter SDK bạn giải nén 

Chạy `source $HOME/.<rc file>` bạn edit 

- Kiểm tra cài đặt thành công:

```ruby
which flutter
```

Sau khi cài flutter thành công, chúng ta có thể sử dung `flutter doctor` để kiểm tra các thành phần phụ thuộc với Flutter đã được cài đặt thành công chưa, nếu thiếu phần nào thì chúng ta bổ sung thêm.

#### Cài đặt Xcode 

- Tải phiên bản mới nhất Xcode trên trang [download](https://developer.apple.com/download/)
-  Cấu hình lại phiên bản Xcode command-line cho phiên bản mới nhất bạn vừa tải về (trong trường hợp bạn đã có sẵn Xcode trên máy):

```ruby
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```
-  Đảm bảo chính sách Xcode license agreement được xác nhận bằng lệnh:

```ruby
sudo xcodebuild -license
```

##### Mở iOS simulator:

```ruby
open -a Simulator
```

và kiểm tra các simulator sử dụng 64-bit bằng cách kiểm tra Hardware > Device trên menu của simulator 

#### Cài đặt Android:

##### Cài Android Studio:

- Tải [Android Studio](https://developer.android.com/studio)
- Chạy Android Studio, và làm theo các bước trong Android Studio Setup Wizard. Nó sẽ giúp cài đặt các phiên bản mới nhất Android SDK, Android SDK Command-line Tools, và Android SDK Build-Tools, những cái được yêu cầu bởi Flutter khi phát triển cho bên Android 

##### Cài đặt Flutter và Dart plugins:

- Mở Android Studio 
- Mở Configure > Plugins 
- Chọn Flutter plugin và ấn Install
- Bấm Yes khi hiện thông báo cài đặt Dart plugin 
- Bấm Restart khi hiện thông báo 

##### Cài Android emulator:

Các bước để cài đặt Android emulator:

- Bật VM acceleration trên thiết bị của bạn 
- Chạy Android Studio > Tools > Android > AVD Manager và chọn Create Virtual Device.
- Chọn định nghĩa một device và chọn Next 
- Chọn một hay nhiều image cho các phiên bản Android mà bạn muốn mô phỏng, và bấm Next. 
- Bên dưới Emulated Performance, chọn Hardware - GLES 2.0 để bật hardware acceleration
- Xác nhận cấu hình AVD là chính xác và chọn Finish.
- Trong Android Virtual Device Manager, bấm Run, emulator sẽ bắt đầu chạy và hiển thị phiên bản OS và thiết bị bạn chọn.

### 3. Demo chương trình đơn giản

Chúng ta sẽ xây dựng một chương trình đơn giản, tao ra một danh sách các từ tiếng anh, và khi scroll xuống cuối màn hình sẽ tự động tạo tiếp danh sách mới. Đây là tính năng lazy load.

- Học cách viết ứng dụng Flutter để trông tự nhiên cho iOS, Android 
- Tiếp cận cấu trúc cơ bản một ứng dụng Flutter 
- Tìm và biết cách sử dụng các package để mở rộng chức năng 
- Sử dụng hot reload để tăng tốc độ phát triển 
- Học cách sử dụng một widget có trạng thái 
- Học cách tạo một danh sách load lazy và vô hạn 

#### Tạo Flutter app

Tạo project với tuỳ chọn `New Flutter Project` trong Android Studio (chỉ khi thêm plugin Flutter và Dart thì mới hiện tuỳ chọn đó)

Thêm code trong file `lib/main.dart`

```ruby
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

Ở trên, ta đã tạo một Material app. Material là một ngôn ngữ thiết kế trực quan, là tiêu chuẩn cho mobile và web. Flutter cung cấp một tập rất lớn các material widget 

Hàm `main()` dùng ký hiệu arrow (=>). Kí hiệu mũi tên dùng cho hàm trên 1 dòng 

App được kế thừa từ StatelessWidget nên app trở thành một widget. Trong Flutter, mọi thứ là đều là một widget, bao gồm cả alignment, padding, và layout ( Tương tự như trong ruby, mọi thứ là object )

Scaffold widget cung cấp một thanh app bar mặc định, cả title và thuộc tính body chưa cây widget cho màn hình home. 

Chức năng chính của một widget là cung cấp hàm `build()` để mô tả cách hiển thị widget trong context của widget khác hoặc với các widget ở cấp độ thấp hơn trong cây.

Trong Vd trên, body chứa một widget Center, trong Center chứa một widget con là Text. Widget Center bố cục các widget con ở trung tâm của màn hình.

Bật simuation bằng cách chọn 1 simulator ở iOS hoặc Android, và click bào icon Run 

#### Thêm package ngoài 

Chúng ta thêm thư viện `english_words` để cung cấp tập hợp các từ tiếng anh.

Để thêm 1 package vào trong Flutter app, chúng ta thêm vào file `pubspec.yaml`. File pubspec.yaml quản lý tất cả assest và các thành phần phụ thuộc trong Flutter app.

```ruby
#pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  english_words: ^3.1.0
```

Sau đấy chạy lệnh 

```ruby
$ flutter pub get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```

Trong lib/main.dart thì thêm ở đầu file 

```ruby
import 'package:english_words/english_words.dart';
```

như vậy sửa trong code main:

```ruby
Thay 
child: Text('Hello World')
thành
child: Text(WordPair.random().asPascalCase)
```

khi đấy text sẽ thay đổi mỗi khi chúng ta build lại 

Save file lại thì Flutter sẽ chạy Hot Reload, và giá trị mới sẽ được cập nhật ngay trên simulator 

#### Thêm một Stateful widget

Stateless widget là bất biến nghĩa là các thuộc tính của chúng không đổi - tất cả giá trị là final.

Stateful widget lưu trữ state có thể thay đổi trong vòng đời của widget. Thực hiện một stateful widget yêu cầu ít nhất 2 class: StatefulWidget class tạo một thể hiện của class State. 

Chúng ta thêm stateful widget, `RandomWords`, class sẽ tạo một State class RandomWordsState

Thêm vào trong main 

```ruby
class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }
}
```

và ở trên ta đổi code 

```
thay vì:
body: Center(
    child: Text(WordPair.random().asPascalCase),
)

chuyển thành: 
body: Center(
  child: RandomWords(),
)
```

Như vậy ta đã sửa lại 1 app hello word widget stateless đơn giản thành 1 app có widget statefull

#### Tạo một infinite scrolling ListView

Chúng ta cần tạo một danh sách word và sử dụng widget ListView để hiện thị chúng. Hàm builder trong ListView cho phép hiển thị danh view lazy, tức là scroll đến đâu thì load đến đấy. 

Ta sửa lại class RandomWordsState:

```ruby
class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );
  }  
  
  Widget _buildSuggestions() {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemBuilder: /*1*/ (context, i) {
          if (i.isOdd) return Divider(); /*2*/

          final index = i ~/ 2; /*3*/
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10)); /*4*/
          }
          return _buildRow(_suggestions[index]);
        });
  }  
  
  Widget _buildRow(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }  
}
```

và gọi class trong Material App
 
```ruby
class MyApp extends StatelessWidget {        
   @override
   Widget build(BuildContext context) { 
      return MaterialApp(     
         title: 'Startup Name Generator',  
         home: RandomWords(), 
       )
   }
} 
```

Save lại ta sẽ có kết quả trên simulator:

![](https://images.viblo.asia/b679dddb-7d04-42be-9ce5-3a2aa2a8167f.png)

Trên đây là chương trình đơn giản bằng Flutter, trong bài tới mình sẽ giải thích kỹ hơn chương trình trên.

### Tham khảo 

- Flutter home page: https://flutter.dev/
- Github: https://github.com/HungSonSN/startup_namer