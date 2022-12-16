Trong React và Flutter thì vấn đề khó nhất chính là quản lý state, mỗi khi state thay đổi, một số thành phần trên giao diện sẽ được render lại. Điều này quyết định đến hiệu năng của ứng dụng. Trong bài viết lần này, chúng ta sẽ cùng nhau tìm hiểu về một thư viện quản lý state cho Flutter, đó là [Provider](https://pub.dev/packages/provider).

Thư viện này cung cấp rất nhiều thành phần, tuy nhiên để đơn giản nhất, chúng ta sẽ chỉ tìm hiểu 3 thành phần sau đây
* Provider
* ChangeNotifierProvider
* Consumer

### Setup
Trước hết, chúng ta sẽ tạo 1 project nhỏ và có UI như sau

![](https://images.viblo.asia/b70b3835-4053-42fc-b422-db8b9d8ce612.png)

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('My App')),
        backgroundColor: Colors.grey,
        body: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[

            Container(
              padding: const EdgeInsets.all(20),
              color: Colors.green[200],
              child: RaisedButton(
                child: Text('Do something'),
                onPressed: () {},
              ),
            ),

            Container(
              padding: const EdgeInsets.all(35),
              color: Colors.blue[200],
              child: Text('Show something'),
            ),

          ],
        ),
      ),
    );
  }
}
```

Chúng ta sẽ có 2 thành phần của widget này là  `RaisedButton` và `Text`. 

Add thư viện vào project
```
dependencies:
  provider: ^4.0.4
```

Chắc chắn chúng ta cần chạy lệnh sau nhé, hoặc sử dụng IDE để get
```
flutter pub get
```

### Provider
Provider là một provider widget đơn giản nhất trong tất cả các provider mà thư viện cung cấp. Hiểu đơn giản là widget này sẽ cung cấp một object mà chúng ta có thể sử dụng chúng ở bất kỳ đâu trong cây widget được bao bởi `Provider`.

Giả sử với ví dụ trên, chúng ta có một object như sau
```
class MyModel {
  String text = "Hello";

  void doSomething() {
    text = "World";
  }
}
```

Chúng ta sẽ wrap widget trong ví dụ bởi một Provider. Để lấy được object này trong các widget con, chúng ta cần sử dụng `Consumer` như sau

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<MyModel>(
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          backgroundColor: Colors.grey,
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>(
                  builder: (context, mymodel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: () {
                        mymodel.doSomething();
                      },
                    );
                  },
                ),
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>(
                  builder: (context, mymodel, child) {
                    return Text(mymodel.text);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}
```

Vậy khi chúng ta press vào button thì text trên có Text có thay đổi không? Câu trả lời là không bởi vì `Provider` chỉ đơn giản cung cấp một object là mymodel cho các widget con của nó, chứ ko lắng nghe bất cứ sự thay đổi nào của mymodel.

### ChangeNotifierProvider
Không giống như `Provider`, `ChangeNotifierProvider` sẽ lắng nghe sự thay đổi của object mà nó cung cấp. Khi object có sự thay đổi, widget được return từ builder function của `Consumer` sẽ được render lại.

Model của chúng ta cần sử dụng ChangeNotifie (mixin hoặc extends). Khi thay đổi thuộc tính của model, chúng ta sẽ call `notifyListeners()`, khi đó `ChangeNotifierProvider` sẽ thông báo cho tất cả Consumer liên quan để rebuild. 

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<MyModel>(
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          backgroundColor: Colors.grey,
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>(
                  builder: (context, mymodel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: () {
                        mymodel.doSomething();
                      },
                    );
                  },
                ),
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>(
                  builder: (context, mymodel, child) {
                    return Text(mymodel.text);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}

class MyModel with ChangeNotifier {
  String text = "Hello";

  void doSomething() {
    text = "World";
    notifyListeners();
  }
}
```

Như vậy, khi chúng ta click button, text trên `Text` sẽ được change từ "Hello" sang "World". Tuy nhiên rõ ràng khi cập nhật, button cũng đang nằm trong Consumer nên sẽ bị rebuild, điều này là không cần thiết. Chúng ta ko cần sử dụng Consumer cho widget này, mà sẽ chuyển

```
    Consumer<MyModel>(
      builder: (context, mymodel, child) {
        return RaisedButton(
          child: Text('Do something'),
          onPressed: () {
            mymodel.doSomething();
          },
        );
      },
    )
```

thành 

```
    RaisedButton(
      child: Text('Do something'),
      onPressed: () {
        Provider.of<MyModel>(context, listen: false).doSomething();
      },
    )
```

Như vậy chúng ta sẽ tránh được việc rebuild không cần thiết. 

### Summary
Như vậy chúng ta đã tìm hiểu cơ bản về `Provider`, một thư viện quản lý state trong Flutter. Hy vọng qua bài viết này các bạn có thể áp dụng vào các dự án của mình. 

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!

#### Ref:
* https://pub.dev/packages/provider
* https://medium.com/flutter-community/making-sense-all-of-those-flutter-providers-e842e18f45dd