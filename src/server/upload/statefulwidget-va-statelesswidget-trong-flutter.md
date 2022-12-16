![](https://i.imgur.com/fPl1WWa.png)

Nếu bạn đến với Flutter từ Android SDK hay iOS UIKit thì bạn nên cần suy nghĩ 1 quan điểm mới về lập trình app.

Quan điểm mới như sau:
![](https://i.imgur.com/I4y5QIM.png)

Đơn giản phải không. Theo công thức trên thì UI cũng chỉ là 1 hàm phụ thuộc vào biến trạng thái **State** thôi. 

:) Cố gắng nghĩ đơn giản thôi nhé !

Khi xây dựng ứng dụng Flutter, chúng ta thường sử dụng Widgets để dựng giao diện. Khi đó có 2 loại để dựng là **statteful** và **stateless**. Trong bài này chúng ta sẽ tìm hiểu, làm 1 demo để hiểu và biết cách sử dụng chúng khi nào.
# I. Lý thuyết
## 1) Stateless widgets

**Stateless** widget không có state. Nó không chấp nhận sự thay đổi bên trong nó. Còn đối với sự thay đổi từ bên ngoài (widget cha) thì nó sẽ thụ động thay đổi theo.

Có nghĩa là **StatelessWidget** chỉ đơn thuần nhận dữ liệu và hiển thị 1 cách thụ động. Việc tương tác với nó không sinh ra bất kỳ một event nào để chính bản thân phải render lại. Nếu phải render lại thì là do tác động từ bên ngoài vào.

Vậy nên, nó không có liên quan gì đến **State** cả. Bản thân nó cũng không có hàm `createState` mà thay vào đó là hàm `build(BuildContext)`

Ví dụ: ta có thể nhìn 1 vài mẫu **Stateless widgets**.

![](https://i.imgur.com/eF3T4n2.png)

Xét loại **Text widget** là để khởi tạo trong một constructor và những properties thường để build widget và hiển thị lên màn hình


## 2) Stateful widgets

Nghe qua là hiểu **StatefulWidget** là Widget này có State. Ở đây sẽ có bạn nhầm lẫn cho rằng State là trạng thái của các biến. Nhưng thực tế State là trạng thái của cả 1 widget.

Để hiểu rõ hơn ta xét ví dụ như sau:

Khi xoay màn hình thì coi như ứng dụng sẽ dựng lại các Widget và sẽ render lại Widget từ những dữ liệu ban đầu. Trong Android SDK để khôi phục lại trạng thái cho các TextView, RadioButton, CheckBox, ... bạn sẽ phải thao tác với `savedInstanceState`. Với Flutter thì nó làm sẵn với tên **State** này, nó sẽ tận dụng lại State cũ, lấy tất cả giá trị trong đó ra để render lại Widget. 

Và ví dụ cho StatefulWidget sẽ là như sau:

![](https://i.imgur.com/yhcVuCC.png)

# II. Demo
Để nhanh hiểu ta cứ làm ví dụ cho nhanh
Trong bài này ta sẽ thử với 3 action sau:
1. Làm thế nào để chuyền app state cho widget
2. Làm sao để rebuild widget sau khi cập nhật state
3. Làm sao có thể điều hướng màn hình và vẫn đồng bộ được state.

Cụ thể sẽ là:

- Tăng biến đếm trong MyHomePage
- Chuyển sang màn hình MySecondPage
- Giảm biến đếm trong MySecondPage

Để tiện theo dõi tôi đã đẩy ví dụ này lên Github và bạn có thể pull code về để chạy thử.

```
$ git clone https://github.com/oTranThanhNghia/flutter_app_test1.git
```

Hiện tại bạn chỉ nên quan tâm file code trong `lib` folder thôi nhé 

![](https://i.imgur.com/m9lADAF.png)

Trong `main.dart` như sau:

```dart 
import 'package:flutter/material.dart';
import 'MyHomePage.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  int counter;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    counter = counter ?? 0;
  }

  void _decrementCounter(_){
    setState(() {
      counter--;
      print('decrement: $counter');
    });
  }

  void _incrementCounter(_){
    setState(() {
      counter++;
      print('increment: $counter');
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(
        title: 'My Home Page',
        counter: counter,
        decrementCounter: _decrementCounter,
        incrementCounter: _incrementCounter,
      ),
    );
  }
}
```

Trong `MyHomePage.dart`

```dart
import 'package:flutter/material.dart';

import 'MySecondPage.dart';

class MyHomePage extends StatefulWidget {
  MyHomePage(
      {Key key,
      this.title,
      this.counter,
      this.decrementCounter,
      this.incrementCounter})
      : super(key: key);

  final String title;
  final int counter;
  final ValueChanged<void> decrementCounter;
  final ValueChanged<void> incrementCounter;

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _MyHomePageState();
  }
}

class _MyHomePageState extends State<MyHomePage> {
  void _onPressed() {
    widget.incrementCounter(null);
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Text(
              widget.counter.toString(),
              style: Theme.of(context).textTheme.display1,
            ),
            RaisedButton(
              child: Text('next screen'),
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => MySecondPage(
                              widget.decrementCounter,
                              title: 'My Second Page',
                              counter: widget.counter,
                            )));
              },
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _onPressed,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}

```

Và cuối cùng `MySecondPage.dart`
```dart
import 'package:flutter/material.dart';

class MySecondPage extends StatefulWidget {
  MySecondPage(
    this.decrementCounter, {
    Key key,
    this.title,
    this.counter,
  }) : super(key: key);

  final String title;
  final int counter;
  final ValueChanged<void> decrementCounter;

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _MySecondPageState();
  }
}

class _MySecondPageState extends State<MySecondPage> {
  void _onPressed() {
    widget.decrementCounter(null);
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Text(
              super.widget.counter.toString(),
              style: Theme.of(context).textTheme.display1,
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _onPressed,
        tooltip: 'Decrement',
        child: Icon(Icons.indeterminate_check_box),
        backgroundColor: Colors.red,
      ),
    );
  }
}

```


![](https://i.imgur.com/xdFO9f9l.png)
![](https://i.imgur.com/L4yZC5cl.png)

# III. Tài liệu tham khảo
1. https://medium.com/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d
2. https://flutterdoc.com/stateful-or-stateless-widgets-42a132e529ed
3. https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro
4. http://eitguide.net/flutter-bai-7-state-va-stateful-stateless-widgets/