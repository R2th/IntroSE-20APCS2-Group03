Như ở [phần 1](https://viblo.asia/p/getting-started-with-flutter-part-1-m68Z08ydZkG), mình đã giới thiệu về Flutter , cách xây dựng một ứng dụng Flutter và sử dụng VS Code để viết môt ứng dụng như thế nào  . 

Trong hướng dẫn này, bạn sẽ xây dựng một ứng dụng  `Flutter`  truy vấn [API GitHub](https://developer.github.com/v3/teams/members/) cho các thành viên trong tổ chức GitHub và hiển thị thông tin của thành viên nhóm trong một danh sách có thể cuộn được:

![](https://images.viblo.asia/e26f6b67-4c8e-4426-8828-b9d2a1bb7edb.png)

Hôm nay chúng ta sẽ tìm hiểu thêm về : 
* Importing files và packages
* Tạo mới và sử dụng widgets 
* Thực hiện API call (HTTP)
* Hiển thị các mục trong một danh sách
* Cập nhập Theme app 

# Importing a File
Thay vì giữ tất cả các Dart code trong tập tin **main.dart** , bạn sẽ muốn có thể nhập mã từ các class khác bạn tạo ra. Bạn sẽ thấy một ví dụ bây giờ để nhập strings, việc này sẽ giúp đỡ khi bạn cần localize các strings người dùng của mình.

Bạn tạo file có tên **strings.dart** trong thư mục  **lib** bằng cách click chuột phải vào thư mục **lib** và chọn **New file** 

![](https://images.viblo.asia/7a769a6e-3419-472e-b1a8-c0f31465e439.png)

Thêm class Strings vào trong file mới này 
```dart
class Strings {
  static String appTitle = "GITHUB members";
}
```
Ở đây bạn định nghĩa static String `appTilte`. Để sử dụng bạn cần import bằng câu lệnh sau, thêm vào vị trí trên cùng của file **main.dart**

```dart
import 'strings.dart';
```

Cập nhật app title như sau, sử dụng `appTitle` bạn đã định nghĩa trong class **Strings**
```dart
return new MaterialApp(
  title: Strings.appTitle,
```

Bạn có thể cập nhật code trong class **GHFlutterApp** như sau : 
```dart
class GHFlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: Strings.appTitle,
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text(Strings.appTitle),
        ),
        body: new Center(
          child: new Text(Strings.appTitle),
        ),
      ),
    );
  }
}
```

Kiểm tra thay đổi bằng cách Build and Run với phím F5. Ok vậy là bạn đã nắm được cách import file trong Flutter rồi đó. 
# Widgets

Hầu như mọi yếu tố trong ứng dụng Flutter là một widget. Widget được thiết kế để không thay đổi, vì việc sử dụng các widget bất biến giúp giữ cho UI của ứng dụng nhẹ.

Có 2 loại widget cơ bản được sử dụng: 
* **Statekess**: chỉ phụ thuộc vào thông tin cấu hình của chúng, chẳng hạn như hình ảnh tĩnh trong một imageview 
* **Stateful**: cần duy trì thông tin động và làm như vậy bằng cách tương tác với một đối tượng State.

Cả **Statekess** và  **Stateful** widgets đều vẽ lại trong Flutter app, sự khác biệt là **Stateful** widget uỷ quyền cấu hình cho đối tượng **State**

Để hiểu việc tạo ra các widgets riêng cho bạn, bạn tạo nới 1 class **GHFlutter** vào cuối file **main.dart**
```dart
class GHFlutter extends StatefulWidget {
  @override
  createState() => new GHFlutterState();
}
```

Bạn đã thực hiện một lớp con **StatefulWidget** và bạn đang ghi đè phương thức `createState ()` để tạo đối tượng **state** của nó. Bây giờ thêm một class **GHFlutterState** trên **GHFlutter**:

```dart
class GHFlutterState extends State<GHFlutter> {
}
```

**GHFlutterState** là 1 extend **State** với tham số là **GHFlutter**

Nhiệm vụ chính của bạn cần làm khi tạo một widget mới là ghi đè lên phương thức `build ()` được gọi khi widget được hiển thị trên màn hình.

Thêm phương thức `build()` vào bên trong class **GHFlutterState**

```dart
@override
Widget build(BuildContext context) {
  return new Scaffold (
    appBar: new AppBar(
      title: new Text(Strings.appTitle),
    ),
    body: new Text(Strings.appTitle),
  );
}
```

Một **Scaffold** là một **container** cho **material design** widgets. Nó hoạt động như là gốc rễ của một phân cấp widget. Trong ví dụ, chúng ta đã thêm một **AppBar** và một **body** và trong **Scaffold**, mỗi phần đều chứa một widget Text. 

Cập nhật lại **GHFlutterApp** để sử dụng **GHFlutter** như thuộc tính của **home** , thay vì xây dựng một khung riêng (scaffold).

```dart
class GHFlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: Strings.appTitle,
      home: new GHFlutter(),
    );
  }
}
```

Build và run app, bạn sẽ thấy được kết quả của việc tạo mới widget. 

![](https://images.viblo.asia/8f4534ab-dee1-4131-9f02-c477bdd25973.png)

# Making Network Calls
Như mình đã hướng dẫn các bạn cách import file **strings.dart** vào trong project. Bạn cũng có thể import những packages khác nằm trong Flutter framework và Dart.

Bây chúng ta muốn sử dụng một package trong framework để thực hiện một **HTTP network call** và parse dự liệu trả về theo định dạng JSON vào trong Dart objects. Chúng ta sẽ thêm những import mới sau vào trên đầu file `main.dart`:

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'strings.dart';
```
Bạn sẽ thấy một indicator thông báo trên những import hiện chưa được sử dụng
Các ứng dụng Dart đều có một luồng, nhưng Dart cung cấp hỗ trợ chạy mã trên các luồng khác cũng như chạy mã không đồng bộ, không chặn luồng UI sử dụng  async / await pattern.

Bạn sẽ thực hiện cuộc gọi mạng không đồng bộ để tìm danh sách các thành viên của nhóm GitHub. Thêm danh sách trống dưới dạng thuộc tính ở đầu **GHFlutterState** và cũng thêm thuộc tính để giữ kiểu văn bản:

```dart
var _members = [];

final _biggerFont = const TextStyle(fontSize: 18.0);
```

Bạn chú ý nhé nếu bạn để dấu gạch dưới đặt ở phần đầu của tên sẽ làm cho  thuộc tính này của lớp trở nên **private**.

Để gọi một HTTP không đồng bộ, chúng ta thêm một phương thức **_loadData()** vào trong **GHFlutterState**

```dart
_loadData() async {
  String dataURL = "https://api.github.com/orgs/raywenderlich/members";
  http.Response response = await http.get(dataURL);
  setState(() {
    _members = JSON.decode(response.body);
  });
}
```

Bạn đã thêm từ khóa **async** lên **_loadData ()** để nói với Dart rằng nó không đồng bộ, và cũng là từ khóa chờ đợi trên cuộc gọi http.get () đang chặn. Bạn đang sử dụng giá trị **dataUrl** được đặt thành điểm cuối API GitHub lấy ra thành viên cho tổ chức GitHub.

Khi cuộc gọi HTTP hoàn thành, bạn chuyển một callback tới **setState ()** chạy đồng bộ trên UI thread. Trong trường hợp này, bạn cần giải mã JSON trả về và gán nó vào danh sách **_members**.

Bạn cần override **initState()** trong **GHFlutterState**  và gọi **_loadData ()** khi state được khởi tạo 
```dart
@override
void initState() {
  super.initState();

  _loadData();
}
```

# Using a ListView
Lúc này bạn đã có được danh sách member, việc tiếp theo là cần hiển thị nó lên UI dưới dạng danh sách. Dart cung cấp một ListView widget hỗ trợ hiển thị dữ liệu dưới dạng danh sách. LisView giống như **RecyclerView** trong Android và UITableView trong iOS. 

Thêm phương thức **_buildRow()** trong **GHFlutterState**:
```dart 
Widget _buildRow(int i) {
  return new ListTile(
    title: new Text("${_members[i]["login"]}", style: _biggerFont)
  );
}
```

Phương thức **_buildRow** trả về ListTitle widge với  việc hiển thị giá trị `login` trong JSON 
Chúng ta cần cập nhật `body`  của **Widget build** trong **GHFlutterState**
```dart
body: new ListView.builder(
  itemCount: _members.length * 2,
  itemBuilder: (BuildContext context, int position) {
    if (position.isOdd) return new Divider();

    final index = position ~/ 2;

    return _buildRow(index);
  }),
```

Với từng item trong ListView, đặt giá trị ` itemCount`  và đặt `itemBuilder` sử dụng **_buildRow()**

Bấm F5 để build và run lại app. 

![](https://images.viblo.asia/8ea43162-ecc1-4e34-93f1-1fc01f82961f.png)

# Parsing to Custom Types
Vừa rồi chúng ta đã hiển thị danh sách member dưới dạng ListView, chúng ta đã phân tích từng member từ JSON trả về, sau đó thêm vào danh sách **_members** dưới dạng Dart **Map** . 
Tuy nhiên chúng ta muốn sử dụng dưới dạng một danh sách do chúng ta định nghĩa thì sẽ cần làm như thế nào. Ví dụ chúng ta muốn thao tác trên một danh sách Member chẳng hạn. 

Đầu tiên chúng ta cần tạo mới class **Member** trong **main.dart** 
```dart
class Member {
  final String login;
  final String avatarUrl;

  Member(this.login, this.avatarUrl) {
    if (login == null) {
      throw new ArgumentError("login of Member cannot be null. "
          "Received: '$login'");
    }
    if (avatarUrl == null) {
      throw new ArgumentError("avatarUrl of Member cannot be null. "
          "Received: '$avatarUrl'");
    }
  }
}
```

Một member có các properties : `login` và `avatarUrl` 
Cập nhật khai báo **_members**  trong GHFlutterState 
```dart
var _members = <Member>[];
```

Chúng ta sẽ cần cập nhật quá trình parse JSON trong phương thức **_loadData()**  trong  class **GHFlutterState**
```dart
_loadData() async {
    String dataURL = "https://api.github.com/orgs/raywenderlich/members";
    http.Response response = await http.get(dataURL);
    setState(() {
      final membersJSON = JSON.decode(response.body);
      for (var memberJSON in membersJSON) {
        final member =
            new Member(memberJSON["login"], memberJSON["avatar_url"]);
        _members.add(member);
      }
    });
  }
```



Tiếp đến cập nhật phương thức **_buildRow()** để sử dụng các properites : `login` và `avatarUrl` 
```dart
Widget _buildRow(int i) {
  return new Padding(
    padding: const EdgeInsets.all(16.0),
    child: new ListTile(
      title: new Text("${_members[i].login}", style: _biggerFont),
      leading: new CircleAvatar(
        backgroundColor: Colors.green,
        backgroundImage: new NetworkImage(_members[i].avatarUrl)
      ),
    )
  );
}
```

Để hiển thị avatar, sử dụng **NetworkImage** và **CircleAvatar** 

Build và run app với phím F5, bạn sẽ thấy danh sách member với thông tin login và avatar

![](https://images.viblo.asia/cf01cf36-5746-4da5-acd1-10bb6be63f7f.png)

# Cleaning the Code
Hầu hết code của bạn bây giờ nằm trong tệp `main.dart`. Để làm cho code sạch sẽ hơn, bạn có thể tái cấu trúc lại widget con và các lớp mà bạn đã thêm vào .

Tạo class tên `member.dart` và `ghflutter.dart` trong thư mục **lib**. Di chuyển class **Member** vào trong file `member.dart` và cả hai lớp **GHFlutterState** và **GHFlutter** vào trong `ghflutter.dart.`

Lúc này sẽ không cần bất kỳ câu lệnh imports nào trong `member.dart`, nhưng trong `flutter.dart` nên viết như sau:

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'member.dart';
import 'strings.dart'; 
```

Bạn cũng cần cập nhật lại file `main.dart` như sau:
```dart
import 'package:flutter/material.dart';

import 'ghflutter.dart';
import 'strings.dart';

void main() => runApp(new GHFlutterApp());


class GHFlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: Strings.appTitle,
      home: new GHFlutter(),
    );
  }
}  
```

Build and run và sẽ thấy kết quả không có gì thay đổi nhưng code của bạn trông sạch sẽ hơn chút rồi đó :) 

# Adding a Theme
Bạn có thể dễ dàng thêm mới thuộc tính theme vào trong **MaterialApp** bên trong file `main.dart`:
```dart
class GHFlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: Strings.appTitle,
      theme: new ThemeData(primaryColor: Colors.green.shade800), 
      home: new GHFlutter(),
    );
  }
}  
```
Trong ví dụ, chúng ta sẽ sử dụng mày xanh lục như Material Design color của app.

Hot reload hoặc Build and run (F5) 

![](https://images.viblo.asia/706c685f-3b4a-4d52-b446-201e105f13db.png)

Ok, vậy là một demo nhỏ về việc lấy data từ một HTTP request và hiển thị lên danh sách đã xong. 
Hy vọng các bạn đã có nhìn rõ hơn một chút về việc làm sao để làm việc với Flutter và Dart. 
Mình có link sourcecode [demo](https://github.com/vuvanhanh/helloflutter_example) nếu các bạn cần nhé. 

Link tham khảo cho bài viết: 
- https://www.raywenderlich.com/188257/getting-started-with-flutter
-  https://flutter.io/
-  https://www.dartlang.org/