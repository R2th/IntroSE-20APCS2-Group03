Một trong những cách phổ biến nhất trong lập trình Mobile là gọi hàm async để xử lý 1 business logic code khi 1 màn hình mới được hiển thị. Trong Flutter, bạn có thể sử dụng Stateful widget để gọi các function xử lý các logic code của chúng ta thông qua hàm initState().
```
class MyHomePage extends StatefulWidget {
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
  void initState() {
    _getThingsOnStartup().then((value){
      print('Async done');
    });
    super.initState();
  }

  Future _getThingsOnStartup() async {
    await Future.delayed(Duration(seconds: 2));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

**Giả sử nếu bạn muốn gọi function _getThingsOnStartup() từ Stateless Widget?**

Không giống với Stateful Widget, Stateless Widget trong Flutter không cung cấp cho chúng ta function initState() cũng như không thể gọi function setState(). Nhưng bạn vẫn có thể làm được điều giả sử ở trên bằng cách sử dụng 1 Stateful Widget như một root widget. Root widget này cung cấp cho ta 1 callback function để thực thi những function khởi tạo xử lý các logic code của chúng ta khi 1 screen mới được hiển thị.

Trước tiên, chúng ta tạo 1 class StatefulWrapper để thực thi function khởi tạo và 1 child Widget để hiển thị UI.

```
import 'package:flutter/material.dart';

/// Wrapper for stateful functionality to provide onInit calls in stateles widget
class StatefulWrapper extends StatefulWidget {
  final Function onInit;
  final Widget child;

  const StatefulWrapper({@required this.onInit, @required this.child});

  @override
  _StatefulWrapperState createState() => _StatefulWrapperState();
}

class _StatefulWrapperState extends State<StatefulWrapper> {

@override
  void initState() {
    if(widget.onInit != null) {
      print("initState");
      widget.onInit();
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}
```

Sau đó, chúng ta wrap Stateless UI Widget trong class StatefulWrapper và pass function mà chúng ta muốn run thông qua onInit().

```
import 'package:flutter/material.dart';

import 'stateful_wrapper.dart';

class Example extends StatelessWidget {
  Future _getThingsOnStartup() async {
    await Future.delayed(Duration(seconds: 2));
  }

  @override
  Widget build(BuildContext context) {
    return StatefulWrapper(
      onInit: () {
        _getThingsOnStartup().then((value) {
          print('Async done');
        });
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text('Flutter Demo'),
        ),
        body: Center(
          child: Text(
            'Hello Flutter',
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: null,
          tooltip: 'Increment',
          child: Icon(Icons.add),
        ), // This trailing comma makes auto-formatting nicer for build methods.
      ),
    );
  }
}
```

và cuối cùng thì điều chúng ta mong đợi ở trên đã được thực hiện. Function _getThingsOnStartup() sẽ được gọi khi class Stateful Widget được khởi tạo xong.