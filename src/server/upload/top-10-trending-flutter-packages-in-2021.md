Chào các bạn, như đã biết, trending hiện nay đang là Flutter, được biết đến như là một cross platform bùng nổ được ưa chuộng và vẫn đang phát triển không ngừng.

Để thiết kế các native app đẹp mắt, Google đã giới thiệu Flutter UI vào năm 2017. Bộ giao diện người dùng đa nền tảng này(Cross-Plattform UI Kit) có thể được sử dụng để xây dựng các ứng dụng web, Android, iOS hoặc máy tính để bàn từ một codeBase duy nhất.

Flutter được viết bằng C ++ nhưng sử dụng Ngôn ngữ Dart để lập trình. Nó có một cộng đồng đang phát triển và sự hỗ trợ tuyệt vời từ chính Google bao gồm các Video trên YouTube về các widgets (tiện ích) có thể tái sử dụng.

Với trang web pub.dev, Flutter team có thể xuất bản và chia sẻ các package(gói) có thể sử dụng lại để lập trình các ứng dụng Dart và Flutter.

Trong bài viết này, chúng ta sẽ cùng đi qua một trong những gói được yêu thích nhất và phổ biến nhất để qua đó thấy được phần nào những khả năng to lớn của Flutter framework.

Với mỗi gói sẽ có các đường dẫn trực tiếp đến trang chủ để các bạn có thể tìm hiểu, bên cạnh đó sẽ có các thông tin về đặc điểm của từng gói, cũng như ví dụ, video hướng dẫn sử dụng đi kèm. Nào cùng bắt đầu thôi.

![](https://images.viblo.asia/94593beb-88df-4e9b-a9e7-6999e688bf2a.jpeg)

### 1. get/ GetX
URL: https://pub.dev/packages/get 

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 5,788 likes

GetX là gói toàn diện trong số các gói. Nó cố gắng đơn giản hóa toàn bộ quy trình phát triển ứng dụng bằng cách cung cấp hỗ trợ cho các quy trình như dependency, injection, quản lý state và route. 

Nó cũng cung cấp một loạt các tiện ích có thể được sử dụng để đơn giản hóa việc xác thực (validation), phân loại chủ đề(theme), quốc tế hóa (internationalization) ... và hơn thế nữa.

![](https://images.viblo.asia/d4fe5ecf-f38d-4006-91c0-3d2bdb410d2a.png)
Ex: Counter App với GetX:
```
class Home extends StatelessWidget {

  @override
  Widget build(context) {

    // Instantiate your class using Get.put() to make it available for all "child" routes there.
    final Controller c = Get.put(Controller());

    return Scaffold(
      // Use Obx(()=> to update Text() whenever count is changed.
      appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}"))),

      // Replace the 8 lines Navigator.push by a simple Get.to(). You don't need context
      body: Center(child: ElevatedButton(
              child: Text("Go to Other"), onPressed: () => Get.to(Other()))),
      floatingActionButton:
          FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}

class Other extends StatelessWidget {
  // You can ask Get to find a Controller that is being used by another page and redirect you to it.
  final Controller c = Get.find();

  @override
  Widget build(context){
     // Access the updated count variable
     return Scaffold(body: Center(child: Text("${c.count}")));
  }
}
```
Các bạn cũng có thể xem video giới thiệu tất tần tật về GetX ở đây: [GetX Powerful Framework in Flutter in Detail (2021)](https://youtu.be/V0oxG3tWiwk)  

### 2. Provider 
URL: https://pub.dev/packages/provider

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 4,855 likes

Provider wrap(bao bọc) xung quanh InheritedWidget để làm cho nó dễ truy cập hơn. Nó cung cấp tính năng lazy-loading, phân bổ đơn giản hóa và giảm mã soạn sẵn.

Dưới đây là một ví dụ đơn giản mà app sử dụng Provider:
```
class Person {
  Person({this.name, this.age});

  final String name;
  final int age;
}

void main() {
  runApp(
    Provider(
      create: (_) => Person(name: "Yohan", age: 25),
      child: MyApp(),
    ),
  );
}


// Just a plain ol' StatelessWidget
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyHomePage(),
    );
  }
}

// Again, just a stateless widget
class MyHomePage extends StatelessWidget {
  const MyHomePage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Provider Class'),
      ),
      body: Center(
        child: Text(
          // this string is where we use Provider to fetch the instance
          // of `Person` created above in the `create` property
          '''
          Hi ${Provider.of<Person>(context).name}!
          You are ${Provider.of<Person>(context).age} years old''',
        ),
      ),
    );
  }
}
``` 

Các bạn có thể xem chi tiết demo ở đây:  [the-most-basic-example-using-provider](https://flutterbyexample.com/lesson/the-most-basic-example-using-provider) 

Các bạn cũng có thể xem video giới thiệu về Provider ở đây: [Flutter Provider Simply Explained](https://www.youtube.com/watch?v=K2ampPUTfIQ)

Với những bạn mới bắt đầu với Flutter thì Provider là package ưu tiên để tìm hiểu.

### 3. shared_preferences 
URL: https://pub.dev/packages/shared_preferences

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 3,850 likes

SharedPreferences cho phép dữ liệu được lưu một cách bất đồng bộ (asynchronously) liên tục trên các thiết bị iOS và Android bằng cách wrap các chức năng cơ bản của Flutter. Do vậy, nó không nên được sử dụng để lưu trữ các dữ liệu quan trọng.

Ex:
```
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      body: Center(
      child: RaisedButton(
        onPressed: _incrementCounter,
        child: Text('Increment Counter'),
        ),
      ),
    ),
  ));
}

_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  await prefs.setInt('counter', counter);
}
``` 
Các bạn có thể xem video hướng dẫn sử dụng Shared Preferences trong 5 phút ở đây: [Flutter: Shared Preferences In 5 Minutes](https://www.youtube.com/watch?v=uyz0HrGUamc)
### 4. http
URL: https://pub.dev/packages/http

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 3,162 likes

Gói http cho phép các functions và classes high-level functions dễ sử dụng để truy cập http resources. Nó đa dạng và hỗ trợ tất cả các thiết bị phổ biến.

Dưới đây là một ví dụ đơn giản về get request của app bằng cách sử dụng http:
```
import 'dart:convert' as convert;

import 'package:http/http.dart' as http;

void main(List<String> arguments) async {
  // This example uses the Google Books API to search for books about http.
  // https://developers.google.com/books/docs/overview
  var url =
      Uri.https('www.googleapis.com', '/books/v1/volumes', {'q': '{http}'});

  // Await the http get response, then decode the json-formatted response.
  var response = await http.get(url);
  if (response.statusCode == 200) {
    var jsonResponse =
        convert.jsonDecode(response.body) as Map<String, dynamic>;
    var itemCount = jsonResponse['totalItems'];
    print('Number of books about http: $itemCount.');
  } else {
    print('Request failed with status: ${response.statusCode}.');
  }
}
```
Các bạn có thể xem video chi tiết hướng dẫn sử dụng Flutter package http ở đây: [Flutter Packages (http)](https://www.youtube.com/watch?v=WdXcJdhWcEY)
### 5. url_launcher
URL: https://pub.dev/packages/url_launcher

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 2,981 likes

Gói URL-launcher có mục đích để mở các liên kết bên ngoài (external links). Bao gồm các URL của trang web, cũng như các liên kết email, phone và SMS. 
Sau đó, chúng sẽ được thực thi bởi smartphone của bạn (hoặc các thiết bị điện tử khác) trong ứng dụng tương ứng.

Dưới đây là ví dụ đơn giản về sử dụng url_launcher: 
```
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

const _url = 'https://pub.dev/packages/url_launcher';

void main() => runApp(
      const MaterialApp(
        home: Material(
          child: Center(
            child: RaisedButton(
              onPressed: _launchURL,
              child: Text('Show Flutter package'),
            ),
          ),
        ),
      ),
    );

void _launchURL() async =>
    await canLaunch(_url) ? await launch(_url) : throw 'Could not launch $_url';

```
Các bạn có thể xem video demo example Flutter package http ở đây: [Example of Flutter package - url_launcher](https://www.youtube.com/watch?v=x7u6t4glGlU)

Các bạn cũng có thể xem video chi tiết hướng dẫn sử dụng Flutter package http ở đây: [url_launcher (Package of the Week)](https://www.youtube.com/watch?v=qYxRYB1oszw)
### 6. Animations
URL: https://pub.dev/packages/animations

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 2,777 likes

Gói animations chứa một số animations để mang lại nhiều chuyển động và khả năng truy cập hơn cho ứng dụng của bạn. Chúng có thể được tùy chỉnh cho sở thích của riêng bạn và được đưa ngay vào ứng dụng của bạn.

Dưới đây là Mã ví dụ OpenContainer cho animations package:

```
OpenContainer(
  closedBuilder: (content, action) {
    return Text('Small widget');
  },
  openBuilder: (content, action) {
    return Text('Big screen');
  },
);
```
Các bạn cũng có thể xem video chi tiết hướng dẫn sử dụng Flutter animations http ở đây: [Animations (Flutter Package of the Week)](https://www.youtube.com/watch?v=HHzAJdlEj1c)
### 7. cupertino_icons
URL: https://pub.dev/packages/cupertino_icons

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 301 likes

Gói cupertino_icons cung cấp một tập hợp các icon assets mặc định được sử dụng bởi các Flutter’s Cupertino widgets.
                                         
Bạn có thể tìm thấy một tập hợp tất cả các biểu tượng cupertino tại: https://flutter.github.io/cupertino_icons/

![](https://images.viblo.asia/8e72456b-2226-48b8-a49f-be0ddd472abe.png)

Cupertino Icons usage:

```
Icon(CupertinoIcons.<icon-name>,)
```

Bạn có thể xem thêm video hướng dẫn sử dụng Cupertino package ở đây: [Flutter’s Cupertino Package for iOS devs - Flutter In Focus](https://www.youtube.com/watch?v=3PdUaidHc-E) 
### 8. google_fonts
URL: https://pub.dev/packages/meta

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 2,505 likes

Các gói google_fonts cung cấp cho bạn hơn 1.000 phông chữ Google miễn phí để sử dụng trong ứng dụng của bạn. Tuy nhiên thì bạn chỉ nên sử dụng một số phông chữ nhất quán trong ứng dụng của mình.

![](https://images.viblo.asia/092f8de9-a37c-4c9b-aa02-e1b618a8da00.gif)

Dưới đây là một ví dụ sử dụng google_font: 

```
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
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
    final TextStyle headline4 = Theme.of(context).textTheme.headline4!;
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
              style: GoogleFonts.oswald(textStyle: headline4),
            ),
            Text(
              '$_counter',
              style: GoogleFonts.lato(fontStyle: FontStyle.italic),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

Bạn có thể xem thêm video hướng dẫn sử dụng google_font package ở đây [Use Custom Font Google Fonts](https://www.youtube.com/watch?v=g_nu7IlTqEw) 

### 9. Collection
URL: https://pub.dev/packages/collection

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 257 likes

Gói này chứa rất nhiều (có thể nói là cả tấn) functions và class tiện ích để đơn giản hóa việc làm việc với các collections. Bao gồm các thuật toán để xử lý lists, equality functions, priority queues, và các wrapper classes.

Dưới đây là một ví dụ về ListEquality với collection:

```
var a = ['A', 'B', 'C'];
var b = ['A', 'D', 'B'];
ListEquality().equals(a, b);
```

Bạn có thể xem hướng dẫn chi tiết sử dụng collection package ở đây:[ Collection (Flutter Package of the Week)](https://www.youtube.com/watch?v=Ymw9xfRucK0)

### 10. crypto
URL: https://pub.dev/packages/crypto

Supported Platforms: Android, iOS, Linux, macOS, Web, Windows

Popularity: 500 likes

Crypto cung cấp cho bạn một tập hợp các cryptographic hashing functions (các hàm băm mã hóa) được triển khai trong Dart một cách thuần túy như:
*     SHA-1
*     SHA-224
*     SHA-256
*     SHA-384
*     SHA-512
*     SHA-512/224
*     SHA-512/256
*     MD5
*     HMAC (i.e. HMAC-MD5, HMAC-SHA1, HMAC-SHA256)

Dưới đây là ví dụ để sử dụng thuật toán mã hóa SHA1:

```
Digest _hashValue(bool _withHmac) {
    String _secret = 'This is a secret';
    String _key = 'p@ssw0rd';
    var bytes = utf8.encode(_secret); // data being hashed
    var key = utf8.encode(_key); // data being hashed
    return _withHmac ? Hmac(sha1, key).convert(bytes) : sha1.convert(bytes);
}
``` 

Các bạn cũng có thể xem video hướng dẫn sử dụng Crypto package ở đây: [Crypto (Cryptographic hashing) Package](https://www.youtube.com/watch?v=cZYgnrOYGLY)  

### Conclusion 
Trên đây là danh sách mười Package hàng đầu theo xếp hạng của Flutter tại pub.dev, hy vọng các bạn sẽ có được sự lựa chọn thích hợp cho riêng mình. 

Cảm ơn các bạn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết tiếp theo. 

Bài viết có tham khảo [nguồn](https://betterprogramming.pub/top-10-trending-flutter-packages-in-2021-51977d0ff528)