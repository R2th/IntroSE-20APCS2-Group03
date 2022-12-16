Bài viết này sẽ đề cập đến việc quản lý trạng thái của Widget trong Flutter. Chúng ta sẽ tìm hiểu về setState(), BLoC Architecture, Streams và Inherited Widget cùng cách thức hoạt động của chúng. Tôi sẽ chỉ ra các hạn chế mà bạn có thể gặp phải và cách mà BLoC Architecture xử lý những hạn chế đó. <br><br>
Flutter là thế giới của những Widget. Từ một Container đơn giản cho đến một Button hay bất kỳ thành phần nào bạn tạo ra đều là Widget. Widget là những khối cơ bản dùng để xây dựng và tái sử dụng. Có hai loại Widget là Stateless và Stateful Widget. Stateless Widget không mang trạng thái, nghĩa là một khi đã được khởi tạo, nó sẽ không thể bị thay đổi cho đến khi nó được khởi tạo lại. Mặt khác, Stateful Widget động và có mang trạng thái, nghĩa là chúng có thể thay đổi trong suốt vòng đời mà không cần phải khởi tạo lại. <br><br>
Có thể bạn đang thắc mắc State là gì và nó có liên quan gì đến quá trình biểu diễn Widget?<br><br>
Theo Flutter, State là những thông tin có thể được đọc một cách đồng bộ khi Widget được xây dựng và có thể thay đổi trong suốt vòng đời của Widget. Đối tượng State được tạo ra bởi Flutter framework. Để thay đổi Widget, bạn cần cập nhật trạng thái của đối tượng bằng hàm setState(), hàm này nằm trong các Stateful Widget. Hàm setState() cài đặt thuộc tính của đối tượng State và cập nhật giao diện người dùng.<br>
## Render từ Parent đến Child
Trên một cây thành phần Widget tiêu biểu, khi setState() được gọi từ các thành phần cha, nó sẽ vẽ lại tất cả thành phần con cháu. Điều này gây ra sự cập nhật không cần thiết cho những thành phần con không thay đổi trạng thái, nói đơn giản hơn là bạn không thể chỉ định một thành phần con nào đó để cập nhật lại trạng thái.
![](https://images.viblo.asia/83a0b7ec-b347-4762-b31c-b70b2c9da037.gif)
## Render từ Child đến Child
Trên một cây thành phần Widget tiêu biểu, nếu hai thành phần con của một thành phần cha không cùng chung một lớp với thành phần cha, khi cập nhật một thành phần con thì không thể tác động được đến thành phần con khác trừ khi bạn phải cập nhật thành phần cha của chúng. Bạn hoặc là phải gọi hàm setState() từ thành phần cha hoặc truyền một hàm call-back từ thành phần con này sang thành phần con kia thông qua thành phần cha.
![](https://images.viblo.asia/18ccf635-bf34-4e31-b6ea-0010c6e011c4.gif)
Với mục đích xử lý mặt hạn chế này và cung cấp mô hình MVC cho ứng dụng Flutter, có nhiều kỹ thuật quản lý trạng thái đã được tạo ra, một số cách tiếp cận phổ biến như BLoC Architecture, MobX, Scoped Model và Redux. Scoped Model và Redux có những mặt hạn chế của chúng về boilderPlate code, Scope và data rendering.
## BLoC Architecture
BLoC Architecture là một thành phần tách logic nghiệp vụ của ứng dụng ra khỏi giao diện người dùng thông qua việc sử dụng Streams, do đó hỗ trợ mô hình MVVM trong ứng dụng. Do đây không phải là một package mà chỉ là logic, nó cung cấp cho developer sự tự do để xây dựng ứng dụng theo cách họ mong muốn.<br><br>
Như đã đề cập trên đây, BLoC Architecture được xây dựng dựa trên Streams và vận hành bởi Inherited Widgets (sẽ được đề cập ở mục sau của bài viết).
## Streams là gì?
Streams là một chuỗi các sự kiện không đồng bộ. Để hiểu rõ hơn, hãy thử tưởng tượng một đường ống chứa chất lỏng, khi thêm một màu sắc vào đầu này, nó sẽ cập nhật màu sắc của toàn bộ chất lỏng trong ống. Đầu chúng ta thêm màu vào được gọi là 'Sink' và đầu chúng ta thấy màu sắc thay đổi được gọi là 'Stream'. StreamBuilder hành động như một cái tai lắng nghe đến các sự thay đổi và cập nhật màu trên màn hình tương ứng.
![](https://images.viblo.asia/6cfcb9d9-93ab-4a6c-bf00-b15889771b18.gif)
BLoC hoạt động tương tự trong Flutter. Để cập nhật Widget trong run time, chúng ta tạo ra Stream của các thuộc tính trong Widget, chúng sẽ thay đổi trong run time thông qua StreamController. Các thuộc tính này có thể là bất cứ thứ gì từ color, border, height, width... Sau khi một Stream được khởi tạo, nó có thể dễ dàng được thay đổi và lắng nghe thông qua các thuộc tính được phơi bày ra bởi Stream là sink và stream.
```
import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

class ColorBloc {
// streams of Color
  StreamController streamListController = StreamController<Color>.broadcast();
// sink
  Sink get colorSink => streamListController.sink;
// stream
  Stream<Color> get colorStream => streamListController.stream;

// function to change the color
  changeColor() {
    colorSink.add(getRandomColor());
  }
}

// Random Colour generator
Color getRandomColor() {
  Random _random = Random();
  return Color.fromARGB(
    _random.nextInt(256),
    _random.nextInt(256),
    _random.nextInt(256),
    _random.nextInt(256),
  );
}
```

Để cập nhật Widget theo sự thay đổi của stream, chúng ta gói Widget vào StreamBuilder Widget. StreamBuilder liên tục lắng nghe sự thay đổi của stream mà nó đăng ký lắng nghe đến và với mỗi thay đổi của stream nó sẽ cập nhật Widget tương ứng.
```
import 'package:bloc_architecture/bloc_model/bloc_model.dart';
import 'package:flutter/material.dart';

class BlocDemo extends StatelessWidget {
  // colorBlocModel instance
  ColorBloc colorBloc = ColorBloc();
  @override
  Widget build(BuildContext context) {
    print(color);
    return Scaffold(
      appBar: AppBar(
          title: Text(
        "BLoC Architecture",
      )),
      body: Container(
        child: Padding(
          padding: EdgeInsets.only(top: 100.0),
          child: Column(
            children: <Widget>[
              StreamBuilder(
                initialData: Colors.red,
                stream: colorBloc.colorStream,
                builder: (BuildContext context, snapShot) => Center(
                      child: Container(
                        height: 200.0,
                        width: 200.0,
                        color: snapShot.data,
                      ),
                    ),
              ),
              RaisedButton(
                child: Text("Change Color"),
                color: Colors.blue,
                onPressed: () {
                  colorBloc.changeColor();
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```
Tuy nhiên chúng ta có một sự ràng buộc cần xử lý ở đây. Hiện tại, hai thành phần con Container và RaisedButton đều nằm trong cùng một lớp với thành phần cha. Vì vậy chúng có thể dễ dàng sử dụng model được khởi tạo trong lớp cha.<br><br>
Nhưng nếu các thành phần con đó không cùng nằm chung một lớp với thành phần cha mà lại bị chia thành nhiều lớp khác nhau thì sao? Để sử dụng chung một model với thành phần cha, chúng ta cần cung cấp cho các thành phần con một model đã được khởi tạo trong thành phần cha.<br><br>
Có một hướng tiếp cận đó là truyền model vào hàm khởi tạo của thành phần con, nhưng nếu thành phần con không cần dùng đến model mà tới thành phần cháu chắt mới cần sử dụng model thì việc truyền model qua thành phần con sẽ bị thừa. Nếu cây thành phần có độ phức tạp cao thì rất khó có thể quản lý code.<br><br>
Cách tiếp cận khác cho vấn đề này là sử dụng Global Singleton, nhưng không có class destructor trong Dart, và model sẽ vẫn còn tồn tại đến khi nào chương trình kết thúc.<br><br>
Với mục đích cung cấp giải pháp trong trường hợp này, Flutter cung cấp một Widget đặc biệt là Inherited Widget. Widget này được thiết kế đặc biệt để lưu dữ liệu và cung cấp cho cây thành phần. Như vậy, trong trường hợp trên, chúng ta tạo ra BlocProvider cho model kế thừa đến InheritedWidget giữ đối tượng của model.<br><br>
```
import 'package:flutter/material.dart';

Type _typeOf<T>() => T;

abstract class BlocBase {
  void dispose();
}

class BlocProvider<T extends BlocBase> extends StatefulWidget {
  BlocProvider({
    Key key,
    @required this.child,
    @required this.bloc,
  }) : super(key: key);

  final Widget child;
  final T bloc;

  @override
  _BlocProviderState<T> createState() => _BlocProviderState<T>();

  static T of<T extends BlocBase>(BuildContext context) {
    final type = _typeOf<_BlocProviderInherited<T>>();
    _BlocProviderInherited<T> provider =
        context.ancestorInheritedElementForWidgetOfExactType(type)?.widget;
    return provider?.bloc;
  }
}

class _BlocProviderState<T extends BlocBase> extends State<BlocProvider<T>> {
  @override
  void dispose() {
    widget.bloc?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new _BlocProviderInherited<T>(
      bloc: widget.bloc,
      child: widget.child,
    );
  }
}

class _BlocProviderInherited<T> extends InheritedWidget {
  _BlocProviderInherited({
    Key key,
    @required Widget child,
    @required this.bloc,
  }) : super(key: key, child: child);

  final T bloc;

  @override
  bool updateShouldNotify(_BlocProviderInherited oldWidget) => false;
}
```
Với mỗi BLoC model được tạo ra, chúng ta chỉ cần extend BlocBase như ví dụ bên dưới đây:
```
import 'dart:async';
import 'package:bloc_architecture/bloc_model/generic_bloc_provider.dart';

class ColorBloc extends BlocBase {
// streams of Color
  StreamController streamListController = StreamController<Color>.broadcast();
// sink
  Sink get colorSink => streamListController.sink;
// stream
  Stream<Color> get colorStream => streamListController.stream;

// function to change the color
  changeColor() {
    colorSink.add(getRandomColor());
  }

//disponsing our Stream
  @override
  dispose() {
    streamListController.close();
  }
}

// Random Colour generator
Color getRandomColor() {
  Random _random = Random();
  return Color.fromARGB(
      255, _random.nextInt(256), _random.nextInt(256), _random.nextInt(256));
}
```
Sau đó chúng ta gói Widget cha vào BlocProvider Widget  và cung cấp đối tượng model cho trường bloc của Widget này.
```
class BlocDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text(
        "BLoC Architecture",
      )),
      body: Container(
        child: Padding(
          padding: EdgeInsets.only(top: 100.0),
          child: BlocProvider(
            bloc: ColorBloc(),
            child: Column(
              children: <Widget>[
                Child1(),
                Child2(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```
Lúc này, các thành phần con có thể dễ dàng sử dụng đối tượng model thông qua phương thức BlocProvider.of(context) và dễ dàng lắng nghe đến sự thay đổi của Stream.
```
class Child1 extends StatelessWidget {
  ColorBloc colorBloc;
  @override
  Widget build(BuildContext context) {
    //geeting the instance of our model created at Parent
    colorBloc = BlocProvider.of(context);
    return Column(
      children: <Widget>[
        Container(
          child: StreamBuilder(
            initialData: Colors.red,
            stream: colorBloc.colorStream,
            builder: (BuildContext context, snapShot) => Center(
                  child: Container(
                    height: 200.0,
                    width: 200.0,
                    color: snapShot.data,
                  ),
                ),
          ),
        ),
      ],
    );
  }
}
```
```
class Child2 extends StatelessWidget {
  ColorBloc colorBloc;
  @override
  Widget build(BuildContext context) {
    colorBloc = BlocProvider.of(context);
    return Column(
      children: <Widget>[
        Container(
          child: Center(
            child: RaisedButton(
              child: Text("Change Color"),
              color: Colors.blue,
              onPressed: () {
                colorBloc.changeColor();
              },
            ),
          ),
        ),
      ],
    );
  }
}
```
Và đây là sản phẩm cuối cùng của chúng ta:
![](https://images.viblo.asia/7fe4f56d-b0e2-4ee4-a7c9-7b4978a7e02d.gif)

### Tài liệu tham khảo
[State Management in Flutter](https://blog.geekyants.com/state-management-in-flutter-7df833e6f3bd)