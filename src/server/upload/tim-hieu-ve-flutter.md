# 1. Context
* Android là một trong những hệ điều hành phổ biến nhất trên thế giới ở nền tảng di động, nhưng nó không chỉ là hệ điều hành duy nhất. Nếu bạn muốn ứng dụng của mình tiếp cận đến người dùng nhiều nhất có thể, thì bạn phải cung cấp ứng dụng của mình trên các nền tảng khác, bao gồm cả ios..

* Chuyển ứng dụng của bạn từ Android sang iOS yêu cầu thời gian và công sức lớn. Khi thực hiện, bạn có bao giờ tự hỏi liệu đây có phải là cách sử dụng làm tốt nhất, thay vào đó bạn có thể cắt giảm thời gian phát triển của mình bằng cách tạo một ứng dụng duy nhất chạy trên nhiều nền tảng. 

* Google Flutter là bộ sdk tuyệt vời hứa hẹn sẽ làm chính xác điều đó, nó cung cấp cho chúng ta cách phát triển giao diện người dùng cho Android và iOS 
# 2. What the Flutter
* Là một SDK mới của google dành cho các thiết bị di động giúp developers và designers xây dựng nhanh chóng ứng dụng dành cho các thiết bị di động (Android, iOS). Flutter là dự án mã nguồn mở đang trong giai đoạn thử nghiệm.

* Flutter bao gồm **Reactive framework** và công nghệ hiển thị 2D (**2D rendering engine**)và các công cụ phát trển(development tool). Các thành phần này làm việc cùng nhau giúp ta thiết kế, xây dựng, test, debug ứng dụng

![](https://images.viblo.asia/a26ea734-3d62-4cb9-9569-9fa4cc53513a.png)
### Widget

Flutter đã tạo ra một khái niệm "mới" đó là widget. Widget chính là nền tảng của Flutter, một widget miêu tả một phần của giao diện người dùng. Tất cả các component như text, image, button hay animation, theme, layout hay thậm chí app cũng là 1 widget. Trong Flutter tất cả các widget hay giao diện đều được code bằng dart

![](https://images.viblo.asia/524866e9-1277-4278-abee-1941c505ea73.png)


* Khi một widget thay đổi trạng thái, chẳng hạn như do người dùng click hay animation, widget sẽ tự xây dựng lại theo trạng thái mới. Điều này tiết kiệm thời gian của nhà phát triển bởi vì UI có thể được mô tả như là một state functions. Ta không phải viết thêm code để chỉ update UI khi state change.


### Dart 
 Flutter sử dụng [Dart](https://www.dartlang.org/), một ngôn ngữ nhanh, hướng đối tượng với nhiều tính năng hữu ích như mixin, generic, isolate, và static type.

### Hot reload
Là một tính năng của Flutter giúp ta nhanh chóng và dễ dàng thử nghiệm, xây dựng giao diện thêm tính năng và sửa lỗi mà không cần khởi động lại chúng.
![](https://images.viblo.asia/25654ec4-7b0e-43a3-8ce0-4683dba85e4d.gif)
### Compatible with other programming languages: 
Flutter tích hợp với code Java trên Android và ObjectiveC và Swift trên iOS, do đó ta không phải viết lại hoàn toàn các ứng dụng hiện có của mình để bắt đầu sử dụng Flutter.
### Beautiful UI
Flutter sử dụng các công cụ thiết kế Material Design và Cupertino (iOS-flavor) cho người dùng một trải nghiệm tuyệt vời, ngoài ra Flutter còn hỗ trợ sứ lý reposive cho các kích thước màn hình khác nhau
# 3. Get Started
* Khá đơn giản, trên trang chủ của họ đã hướng dẫn rất kỹ, các bạn vào https://flutter.io/get-started/install/ để xem hướng dẫn cài flutter sdk sau đó cài đặt nó vào AndroidStudio
# 4. Creating your Google Flutter app
* Cách tốt nhất để tìm hiểu một công nghệ mới là sử dụng nó,hãy tạo thử một ứng dụng “Hello World” với Flutter nàooo

* Như đã biêt , từ codebase Flutter có thể được xây dựng thành cả mã IOS và Android , luôn có một thư mục cho mỗi nền tảng, trông cấu trúc thư mục của flutter có vẻ hơi lằng nhằng nhưng thật may mắn, ta sẽ chỉ cần xem file main.dart bên trong thư mục lib. Đây là nơi chứa tất cả logic của ứng dụng này.
## Sample 1
Ta xóa hết đoạn code này đi rồi thay thế bằng đoạn code này để bắt đầu bằng một ví dụ đơn giản hơn:
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {

 @override
 Widget build(BuildContext context) {
   return new MaterialApp(
     title: 'Welcome to Flutter',
     home: new Scaffold(
       appBar: new AppBar(
          title: new Text('This is the title text'),
        ),

        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
```
Sau đó chạy code ta được một ứng dụng "Hello word" rồi ^^
![](https://images.viblo.asia/6ee9d937-7479-4eab-8d29-3f959b7d3878.png)

Ứng dụng này rất đơn giản, nhưng nó thể hiện một số khái niệm cốt lỗi trong việc phát triển flutter, vì vậy cùng xem xét kĩ chúng.
```
void main() => runApp(new MyApp());
```
đây chính là phương thức gọi để run ứng dụng, để ngắn gọn Flutter cũng hỗ trợ oneline function thay vì 
```
void main() {
  runApp(new MyApp());
}
```

```
class MyApp extends StatelessWidget {
}
```
Như đã đề cập ở trên, với flutter, hầu hết tất cả các thành phần đều là widget kể cả ứng dụng cũng vậy, đây là lí do tại sao Myapp lại kết thừa một thứ gọi là **StatelessWidget**

**StatelessWidgets** là các widget không chứa State. Tất cả các giá trị của StatelessWidget đều là final -> không thể thay đổi trong thời gian chạy, do đó StatelessWidget chỉ hiển thị những gì được truyền vào trong contructor .Ngược lại, để thay đổi trạng thái của widget ta dùng **statefulwidget**
```
 @override
  Widget build(BuildContext context) {
```
Phương thức build () mô tả cách hiển thị một widget. Flutter gọi built() khi nó chèn một widget vào widget hierarchy, và sau đó chạy lại build () mỗi khi widget cần được update.

![](https://images.viblo.asia/af3e17af-99b4-4f64-ba7e-c588f1dfb2fb.png)

```
return new MaterialApp(
```

Đây là khởi tạo để áp dụng thiết kế Material design cho ứng dụng

```
 home: new Scaffold(
```

Đối số 'home' tham chiếu đến widget định nghĩa main UI, trong trường hợp này là Scaffold. 

Widget [Scaffold](https://docs.flutter.io/flutter/material/Scaffold-class.html) cung cấp cho ứng dụng một cấu trúc tuân theo nguyên tắc Material Design, bằng cách cung cấp app bar, title, backgroundcolor. Nó cũng cung cấp các API để hiển thị drawer, snackbars, hay bottom sheets....
* Tạo title cho app bar
```
appBar: new AppBar(
          title: new Text('This is the title text'),
       ),
```
* Trong scafford có thuộc tính là body đây là primary content của scafford. Thuộc tính child: cung cấp một widget con nằm trong widget [center](https://docs.flutter.io/flutter/widgets/Center-class.html). Ở đây ta đặt một text ở vị trí center trong phần body (tương tự gravity center trong relativelayout)
```
body: new Center(
          child: new Text('Hello World'),
```
## Sample 2
Ở ví dụ 1 ta đã tìm hiểu về statelesswidget, ở ví dụ 2 ta sẽ tìm hiểu về statefullwidget và User interaction. Ta sẽ lấy luôn ví dụ ban đầu khi tạo app của Flutter
```
import 'package:flutter/material.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
    );
  }
}

```

Ứng dụng hiển thị một textview và một floatingActionButton. Khi người dùng click vào floatingActionButton, textview sẽ cập nhật số lần click

![](https://images.viblo.asia/870fc2f3-8594-4681-8034-58372bebfaf6.png)
### StatefulWidget
* **StatefulWidget** là widget mà trạng thái của chúng có thể thay đổi. Để tạo state thì statefulwidget phải gọi method createState();
* **State** là nơi chứa logic và trạng thái của statefulwidget, nó chứa một số dữ liệu có thể thay đổi trong suốt thời gian tồn tại của widge, và phương thức build() để vẽ lại widget khi có sự thay đổi
* Khi có sự thay đổi trạng thái (state changes), state object sẽ gọi đến setState() nghĩa là trạng thái của widget đã thay đổi -> build widget
* State<T> lifecycle
![](https://images.viblo.asia/0d3439f6-a1ef-4956-a880-352e24849298.png)

### User interaction
Ngoài StatefulWidget thì trong ví dụ này còn xuất hiện thêm sự kiện người dùng click
```
floatingActionButton: new FloatingActionButton(
       onPressed: _incrementCounter,
       tooltip: 'Increment',
       child: new Icon(Icons.add),
     ),
   );
```
Cách dễ nhất để kiểm tra xem một widget  có hỗ trợ event click hay không, là đọc [doc](https://flutter.io/widgets/) của nó.
Ví dụ, doc [FloatingActionButton](https://docs.flutter.io/flutter/material/FloatingActionButton-class.html), nói rõ rằng widget này hỗ trợ onPressed.

Nếu widget không hỗ trợ phát hiện sự kiện, bạn có thể làm cho widget tương tác bằng [GestureDetector](https://docs.flutter.io/flutter/widgets/GestureDetector-class.html), có nhận sự kiện click, drag,..

# 5. Reference
https://flutter.io/docs/

https://www.androidauthority.com/create-google-flutter-app-854337/

https://www.udacity.com/course/build-native-mobile-apps-with-flutter--ud905