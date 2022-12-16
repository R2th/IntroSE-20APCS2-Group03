# Giới thiệu
Xin chào các bạn hôm nay mình xin phép trình bày về Flutter Navigation.
Flutter là một cross-platform development SDK từ Google cho phép bạn nhanh chóng phát triển app trên iOS và Android từ một source code. Trong tutorial lần này mình sẽ giới thiệu cách implements navigation giữa 2 màn hình cụ thể như sau:
* Routes and navigation
* Popping off the stack
* Returning a value from a route
* Custom navigation transitions

Bài viết được tham khảo từ nguồn:

https://flutter.io/tutorials/

https://www.raywenderlich.com/110-flutter-navigation-tutorial

# Getting Started
Trước tiên ta sẽ download the starter tại [đây](https://koenig-media.raywenderlich.com/uploads/2018/03/FlutterNavigation.zip) 
Trong turotial này mình sẽ sử dụng Android Studio. Ngoài ra có thể sử dụng VS Code, IntelliJ IDEA.

Mở Start project in Android Studio bằng cách chọn File -> Open sau đó chọn folder của start project file.
![](https://images.viblo.asia/8b1998d5-cb7e-45df-b866-14a233cadaba.png)

Khi build thử trên iOS Simulator:
![](https://images.viblo.asia/469ae4d9-5708-4c42-8efc-32d5981e5cee.png)

Khi build thử trên Android Studio:
![](https://images.viblo.asia/24ef71fe-4d12-4e04-b6d8-e8798e4b72a0.png)
# Second Screen
Màn hình thứ 2 sẽ là màn hình detail cho mỗi member. 
Trước tiên ta sẽ tạo class Model cho Member. Ta tạo file mới có tên là Member.dart và implement như sau:
```
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
Tiếp theo mình sẽ tạo class DetaiViewController cho màn hình thứ 2. Ta tạo file mới có tên là DetailViewController.dart. Ta sẽ import model vào 
```
import 'Member.dart';
```
Tiếp theo ta sẽ import statements và 1 subclass của StatefulWidget là DetailView
```
import 'package:flutter/material.dart';
import 'Member.dart';

class DetaiView extends StatefulWidget {
  final Member member;

  DetaiView(this.member) {
    if (member == null) {
      throw new ArgumentError('member of DetailView');
    }
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new DetaiViewState(member);
  }
}
```
Mỗi một DetaiView cho từng Member thì được sử dụng một DetaiViewState.
Add thêm class DetailViewState cho State của DetaiView.
```
class DetaiViewState extends State<DetaiView> {
  final Member memeber;
  DetaiViewState(this.memeber);
}
```
Tiếp theo ta sẽ override lại hàm func build():
```
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('DetailViewState'),
      ),
      body: new Padding(
          padding: new EdgeInsets.all(16.0),
          child: new Image.network(memeber.avatarUrl)
          ),
    );
  }
```
# Routes
Ta quay về với class main.dart và import `DetailViewController.dart`
Tiếp theo ta add 1 private func `_pushMember()` tới `GHFlutterState`
```
  void _pushMember(Member member) {
    Navigator.of(context).push(
      new MaterialPageRoute(
          builder: (context) => new DetaiView(member)
      )
    );
  }
```
Bây giờ ta cần phải call được func `_pushMember()` khi user tap và row trong list of members. Ta sẽ update lại trong hàm `_buildRow()` trong GHFlutterState và add thêm thuộc tính onTap tới ListTile 
```
  Widget _buildRow(int i) {
    return new Padding(
      padding: const EdgeInsets.all(16.0),
      child: new ListTile(
        title: new Text("${_members[i].login}", style: _biggerFont),
        leading: new CircleAvatar(
          backgroundColor: Colors.green,
          backgroundImage: new NetworkImage(_members[i].avatarUrl),
        ),
        onTap: (){
          _saveMember.add(_members[i]);
          _pushMember(_members[i]);
        },
      ),
    );
  }
```
Và đây là kết quả trên iOS simulator:
![](https://images.viblo.asia/217a5ba4-7806-45d2-86a9-a514e30127fa.gif)

Và trên Android emulator:![](https://images.viblo.asia/946f94de-7349-46ba-b3cf-9620a8731a78.gif)
# Popping the stack
Cơ chế hoạt động của Navigation trong Flutter trên cơ chế Stack(Push và Pop)
Thêm một IconButton tới DetaiViewState trong func `build()` và phải add thêm 1 hàng trong Widget 
```
@override
Widget build(BuildContext context) {
  return new Scaffold (
    appBar: new AppBar(
      title: new Text(member.login),
    ),
    body: new Padding(
      padding: new EdgeInsets.all(16.0),
      // Add Column here:
      child: new Column(
        children: [
          new Image.network(member.avatarUrl),
          new IconButton(
            icon: new Icon(Icons.arrow_back, color: Colors.green, size: 48.0),
            onPressed: () { Navigator.pop(context); }
            ),
        ]),
    )
  );
}
```
Build và run lại app thì ta sẽ thấy có 1 button back và có thể trở lại member list view bằng cách tapping vào nó
# Returning a value
1. Ta sẽ push một mới `MaterialPageRoute` vào Stack với 1 parameter có kiểu là `bool` 
2. Ta sử dụng `await` khi pushing một route mới, nó có nhiệm vụ sẽ wait cho đến khi route đó được popped 
3. Route bạn push vào stack gồm có một Column để show ra text widgets
4. Khi Tapping vào text widgets thì sẽ call tới `Navigator` để pop tới route mới khỏi ngăn xếp 
5. Khi mà call hàm `pop` thì ta sẽ nhận được giá trị là true nếu user tapped vào "OK" và return false nếu sử dụng "NOT OK". Nếu User pressses vào back button thì value nhận được là null
6. Ta tạo `AlertDialog` để show ra result return từ route
7. Lưu ý rằng AlertDialog chính nó phải được popped ra khỏi ngăn xếp
8. Ta gọi `showDialog()` để show alert
```
_showOKScreen(BuildContext context) async {
  // 1, 2
  bool value = await Navigator.of(context).push(new MaterialPageRoute<bool>(
    builder: (BuildContext context) {
      return new Padding(
        padding: const EdgeInsets.all(32.0),
        // 3
        child: new Column(
        children: [
          new GestureDetector(
            child: new Text('OK'),
            // 4, 5
            onTap: () { Navigator.of(context).pop(true); }
          ),
          new GestureDetector(
            child: new Text('NOT OK'),
            // 4, 5
            onTap: () { Navigator.of(context).pop(false); }
          )
        ])
      );
    }
  ));
  // 6
  var alert = new AlertDialog(
    content: new Text((value != null && value) ? "OK was pressed" : "NOT OK or BACK was pressed"),
    actions: <Widget>[
      new FlatButton(
        child: new Text('OK'),
        // 7
        onPressed: () { Navigator.of(context).pop(); }
        )
    ],
  );
  // 8
  showDialog(context: context, child: alert);
}
```
Cập nhật lại hàm `build()` trong `DetaiViewState` rằng call `_showOKScreen()`
```
@override
Widget build(BuildContext context) {
  return new Scaffold (
    appBar: new AppBar(
      title: new Text(member.login),
    ),
    body: new Padding(
      padding: new EdgeInsets.all(16.0),
      child: new Column(
        children: [
          new Image.network(member.avatarUrl),
          new IconButton(
            icon: new Icon(Icons.arrow_back, color: Colors.green, size: 48.0),
            onPressed: () { Navigator.pop(context); }
            ),
          // Add RaisedButton here:
          new RaisedButton(
            child: new Text('PRESS ME'),
            onPressed: () { _showOKScreen(context); }
            )
        ]),
    )
  );
}
```
Và đây là kết quả:
![](https://images.viblo.asia/96083f83-69cc-4b04-875d-71459bb8420b.png)
# Custom Transitions
Để làm cho ứng dụng thêm sinh động thì ta sẽ tạo 1 custom transitions.
Thay thế `_pushMember` trong `GHFlutterState` rằng nó pusher một `PageRouteBuilder` mới vào stack
```
_pushMember(Member member) {
  // 1
  Navigator.of(context).push(new PageRouteBuilder(
    opaque: true,
    // 2
    transitionDuration: const Duration(milliseconds: 1000),
    // 3
    pageBuilder: (BuildContext context, _, __) {
      return new MemberWidget(member);
    },
    // 4
    transitionsBuilder: (_, Animation<double> animation, __, Widget child) {
      return new FadeTransition(
        opacity: animation,
        child: new RotationTransition(
          turns: new Tween<double>(begin: 0.0, end: 1.0).animate(animation),
          child: child,
        ),
      );
    }
  ));
}
```
Và đây là kết quả:
![](https://images.viblo.asia/a460e05b-b801-4c83-9e60-d7f154bec10e.gif)
# Tổng kết
Cảm ơn các bạn đã theo dõi tutorial này. Qua tutorial này ta đã biết cách implement navigation, push pop giữa các view và custom transitions