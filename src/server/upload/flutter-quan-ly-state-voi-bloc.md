Quản lý state trong một ứng dụng Flutter là rất quan trọng, việc này ảnh hưởng trực tiếp đến hiệu năng của ứng dụng. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về một thư việc quản lý state là [Bloc](https://bloclibrary.dev/#/gettingstarted).

Trước hết chúng ta sẽ xem qua cấu trúc project khi áp dụng thư viện này như sau
![](https://images.viblo.asia/fe9dec65-1a17-4e68-a200-1c395daf4da4.png)

Bloc sẽ nhận các event mà UI gửi qua, sau đó xử lý logic (get data, update data, ...) rồi trả về state cho UI. Dựa vào state nhận được từ Bloc, UI sẽ render lại những view cần thiết.

Để đơn giản và dễ hiểu hơn, chúng ta sẽ tạo một project nhỏ là `Counter` nhé :D

### Thêm thư viện bloc vào project
```yml
dependencies:
  bloc: ^3.0.0
  flutter_bloc: ^3.2.0
```

Các bạn nhớ `pub get` lại nhé :D

### Áp dụng bloc vào project
Như hình vẽ ban đầu, chúng ta sẽ có 4 thành phần chính: UI, State, Event và Bloc. Chúng ta sẽ lần lượt xây dựng những thành phần này :D

#### UI
Trước hết chúng ta sẽ hình dung ứng dụng của mình gồm 1 `Text` widget, 1 `CircularProgressIndicator` widget và 1 `Button` widget như sau.

![](https://images.viblo.asia/02bec865-21b6-4b56-8b38-e5d2d39d5c11.png)

Text sẽ hiển thị giá trị ban đầu bằng 0. Khi nhấn button (+), sẽ hiển thị loading và sau 1 s, giá trị sẽ được tăng lên 1.

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
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
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  bool loading = false;

  void _incrementCounter() {
    setState(() {
      loading = true;
    });
    Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _counter++;
        loading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            loading ? new CircularProgressIndicator() :
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
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

#### State
Ở ví dụ này chúng ta sẽ có 2 trạng thái là `Loading` và `Success`

```dart
class DataState {}

class Loading extends DataState {}

class Success extends DataState {
  int count = 0;
  
  Success(this.count);

}
```

#### Event
Trong ví dụ này, đơn giản chúng ta chỉ có duy nhất một event là `Increment`

```dart
class DataEvent {}

class Increment extends DataEvent {}
```

#### Bloc
Chúng ta sẽ có giá trị khởi tạo của state là `Success(0)`. 

```dart
class CounterBloc extends Bloc<DataEvent, DataState> {
  @override
  // TODO: implement initialState
  DataState get initialState => Success(0);

  @override
  Stream<DataState> mapEventToState(DataEvent event) {
    // TODO: implement mapEventToState
    throw UnimplementedError();
  }
}
```

Chúng ta sẽ chuyển phần logic

```dart
  void _incrementCounter() {
    setState(() {
      loading = true;
    });
    Future.delayed(Duration(seconds: 1), () {
      setState(() {
        _counter++;
        loading = false;
      });
    });
  }
```

vào trong bloc như sau

```dart
class CounterBloc extends Bloc<DataEvent, DataState> {

  int count = 0;

  @override
  // TODO: implement initialState
  DataState get initialState => Success(count);

  @override
  Stream<DataState> mapEventToState(DataEvent event) async* {
    if (event is Increment) {
      yield Loading();
      await Future.delayed(Duration(seconds: 1));
      count++;
      yield Success(count);
    }
  }
}
```

#### Update UI
Cuối cùng chúng ta sẽ sửa lại code phần UI để có thể lắng nghe được sự thay đổi của state.

1. BlocProvider

```dart
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BlocProvider<CounterBloc>(
        create: (context) => CounterBloc(),
        child: MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    );
  }
}
```

`BlocProvider` là một widget cung cấp một bloc để các widget con có thể sử dụng mà ko cần khai báo thông qua `BlocProvider.of<T>(context)`. 

2. BlocBuilder

`BlocBuilder` là widget được sử dụng bên trong `BlocProvider` để hứng các sự thay đổi về state của bloc. Nói cách khác, mỗi khi state thay đổi, `BlocProvider` sẽ thông báo cho các `Builder` để có thể render lại view theo state. Chúng ta sẽ áp dụng vào project như sau

```dart
class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    final CounterBloc counterBloc = BlocProvider.of<CounterBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(this.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            BlocBuilder<CounterBloc, DataState>(
              builder: (context, state) {
                if (state is Success) {
                  return Text(
                    '${state.count}',
                    style: Theme.of(context).textTheme.headline4,
                  );
                } else {
                  return new CircularProgressIndicator();
                }
              },
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          counterBloc.add(Increment());
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

Chúng ta chạy project và sẽ thấy kết quả giống như ban đầu. Các bạn có thấy đơn giản ko?  :D

Sau khi đã hiểu được cơ bản về bloc, các bạn có thể vào trang chủ của bloc https://bloclibrary.dev/#/gettingstarted để tham khảo thêm các widget mà thư viện `flutter_bloc` cung cấp, chúng rất có ích khi chúng ta sử dụng.


#### Cảm ơn các bạn đã đọc bài viết. Happy coding!