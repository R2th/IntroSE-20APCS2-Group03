Lazy Load một list lớn bằng việc phân trang từ REST API với Flutter có thể gặp một số khó khăn khi dùng ListView nếu bạn không thuần thục sử dụng ListView, index và state.
Sau đây tôi sẽ hướng dẫn bạn lazy load list data lớn trong Flutter mà không dùng thêm plugins nào.

## Tạo StatefulWidget
Đầu tiên là tạo một `stateful widget` với `Scroll Controller` để theo dõi sự kiện kéo cuộn trên thiết bị. Dựa vào vị trí cuộn, ta có thể load tập dự liệu tiếp theo 

```
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
 
class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new HomeState();
}
 
class HomeState extends State<Home> {
  static int page = 0;
  ScrollController _sc = new ScrollController();
  bool isLoading = false;
  List users = new List();
  final dio = new Dio();
  @override
  void initState() {
    this._getMoreData(page);
    super.initState();
    _sc.addListener(() {
      if (_sc.position.pixels ==
          _sc.position.maxScrollExtent) {
        _getMoreData(page);
      }
    });
  }
 
  @override
  void dispose() {
    _sc.dispose();
    super.dispose();
  }
....
....
....
}

```

## Lazy Load Large List
Bước này tôi sẽ load dữ liệu từ REST API. Tôi dùng [Dio](https://pub.dev/packages/dio) để gọi http request, bạn cũng có thể sử dụng plugin khác cho bước này.

```
....
....
final dio = new Dio();
....
....
void _getMoreData(int index) async {
    if (!isLoading) {
      setState(() {
        isLoading = true;
      });
      var url = "https://randomuser.me/api/?page=" +
          index.toString() +
          "&results=20&seed=abc";
      print(url);
      final response = await dio.get(url);
      List tList = new List();
      for (int i = 0; i < response.data['results'].length; i++) {
        tList.add(response.data['results'][i]);
      }
 
      setState(() {
        isLoading = false;
        users.addAll(tList);
        page++;
      });
    }
  }

```

## Tạo list dữ liệu
Bước này, tôi sẽ tạo một List và gán dữ liệu vào nó.
```
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Lazy Load Large List"),
      ),
      body: Container(
        child: _buildList(),
      ),
      resizeToAvoidBottomPadding: false,
    );
  }
 
  Widget _buildList() {
    return ListView.builder(
      itemCount: users.length + 1, // Add one more item for progress indicator
      padding: EdgeInsets.symmetric(vertical: 8.0),
      itemBuilder: (BuildContext context, int index) {
        if (index == users.length) {
          return _buildProgressIndicator();
        } else {
          return new ListTile(
            leading: CircleAvatar(
              radius: 30.0,
              backgroundImage: NetworkImage(
                users[index]['picture']['large'],
              ),
            ),
            title: Text((users[index]['name']['first'])),
            subtitle: Text((users[index]['email'])),
          );
        }
      },
      controller: _sc,
    );
  }

```

## Các mục khác cần lưu ý
Bên cạnh dữ liệu text, hình ảnh cũng được thêm vào item. Bất cứ khi nào vị trí cuộn đạt dưới cùng, dữ liệu mới sẽ được gọi bằng việc tăng số trang index. Thêm vào đó, `loading indicator` cũng được hiện lên khi đang gọi API. Để chắc chắn việc `scroll controller` được xử lý đúng cách

Đây là toàn bộ code 
```
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
 
class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new HomeState();
}
 
class HomeState extends State<Home> {
  static int page = 0;
  ScrollController _sc = new ScrollController();
  bool isLoading = false;
  List users = new List();
  final dio = new Dio();
  @override
  void initState() {
    this._getMoreData(page);
    super.initState();
    _sc.addListener(() {
      if (_sc.position.pixels ==
          _sc.position.maxScrollExtent) {
        _getMoreData(page);
      }
    });
  }
 
  @override
  void dispose() {
    _sc.dispose();
    super.dispose();
  }
 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Lazy Load Large List"),
      ),
      body: Container(
        child: _buildList(),
      ),
      resizeToAvoidBottomPadding: false,
    );
  }
 
  Widget _buildList() {
    return ListView.builder(
      itemCount: users.length + 1, // Add one more item for progress indicator
      padding: EdgeInsets.symmetric(vertical: 8.0),
      itemBuilder: (BuildContext context, int index) {
        if (index == users.length) {
          return _buildProgressIndicator();
        } else {
          return new ListTile(
            leading: CircleAvatar(
              radius: 30.0,
              backgroundImage: NetworkImage(
                users[index]['picture']['large'],
              ),
            ),
            title: Text((users[index]['name']['first'])),
            subtitle: Text((users[index]['email'])),
          );
        }
      },
      controller: _sc,
    );
  }
  
  void _getMoreData(int index) async {
    if (!isLoading) {
      setState(() {
        isLoading = true;
      });
      var url = "https://randomuser.me/api/?page=" +
          index.toString() +
          "&results=20&seed=abc";
      print(url);
      final response = await dio.get(url);
      List tList = new List();
      for (int i = 0; i < response.data['results'].length; i++) {
        tList.add(response.data['results'][i]);
      }
 
      setState(() {
        isLoading = false;
        users.addAll(tList);
        page++;
      });
    }
  }
 
  Widget _buildProgressIndicator() {
    return new Padding(
      padding: const EdgeInsets.all(8.0),
      child: new Center(
        child: new Opacity(
          opacity: isLoading ? 1.0 : 00,
          child: new CircularProgressIndicator(),
        ),
      ),
    );
  }
 
}
```
## Kết quả
![](https://i.imgur.com/f3J6Zcz.gif)