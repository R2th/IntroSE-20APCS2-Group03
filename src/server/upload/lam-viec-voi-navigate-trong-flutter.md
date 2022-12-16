Hello mọi người bài viết hôm nay mình sẽ viết về cách làm việc với Navigate cơ bản trong Flutter. Các chuyển từ màn hình này sang một màn hình khác và truyền data giữa các màn hình với nhau. :D

![](https://images.viblo.asia/ad4affbb-cc86-4aeb-93b5-30862599ef97.jpg)

# Tạo hai màn hình
Đầu tiên, ta tạo hai route để làm việc. Mỗi route chỉ chứa một button duy nhất. 
![](https://images.viblo.asia/542f909c-ef2d-4b0c-ba9a-4725c5a7ec1f.png)

![](https://images.viblo.asia/84509f28-452e-4e4a-97b6-6a4c994835e9.png)
# Di chuyển giữa 2 màn hình
## Navigator.push()
Để di chuyển từ màn hình 1 sang màn hình 2 chỉ cần gọi `Navigation.push()`
```dart
Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SecondRoute()),
  );
```
Hàm `push()` này sẽ thêm màn hình 2 vào trong stack được quản lý bởi `Navigator`. MaterialPageRoute` là một class mà Flutter cung cấp để tạo Route và kèm theo animation mặc định của class đó.
##  Navigator.pop()
Để quay trở lại màn hình 1 thì ở màn hình 2 chỉ cần gọi `Navigator.pop()`
```dart
onPressed: () {
  Navigator.pop(context);
}
```

Hàm `pop()` sẽ lấy màn hình đã được thêm ở trên đỉnh của stack ra ở đây là màn hình 1.

Và để truyền dữ liệu ngược lại màn hình trước đó chỉ cần thêm data ở param 2.

```dart
onPressed: () {
 Navigator.pop(context, data);
 }
```
## Navigator.pushNamed()
Trước tiên phải xác định route bằng cách cung cấp các thuộc tính bổ sung cho phương thức khởi tạo `MaterialApp(InitialRoute)` và các route chính.
```dart
void main() {
  runApp(MaterialApp(
    title: 'Named Routes Demo',
    // Dùng bất kì ký tự nào ở đây là "/" để đặt tên cho route đầu tiên
    initialRoute: '/',
    routes: {
      '/': (context) => FirstScreen(),
    // Đặt tên cho route thứ 2 là"/second" phải kèm theo dấu "/" chứa kí tự route đầu tiên
      '/second': (context) => SecondScreen(),
    },
  ));
}
```

Ở màn hình 1 thêm hàm `Navigator.pushNamed()` như sau:
```dart
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Màn hình 1'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Chuyển sang màn hình 2'),
          onPressed: () {
            Navigator.pushNamed(context, '/second');
          },
        ),
      ),
    );
  }
}
```

Ở màn hình 2 thêm hàm `Navigator.pushNamed()` như sau:
```dart
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Màn hình 2"),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Quay lại!'),
        ),
      ),
    );
  }
}
```
##  ModalRoute.of()
Hàm này sẽ giúp ta truyền dữ liệu khi chuyển màn hình.

Tạo một data class. 
```dart
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
```
```dart
class FirstScreen extends StatelessWidget {
  static const routeName = '/firstScreen';

  @override
  Widget build(BuildContext context) {
  // Trích xuấ các đối số từ cài đặt ModalRoute hiện tại và ép kiểu về ScreenArguments
    final ScreenArguments args = ModalRoute.of(context).settings.arguments;

    return Scaffold(
      appBar: AppBar(
        title: Text(args.title),
      ),
      body: Center(
        child: Text(args.message),
      ),
    );
  }
}
```

Tiếp theo, thêm  vào các route được cung cấp cho tiện ích MaterialApp. Các route xác định dựa trên name route.
```dart
MaterialApp(
  routes: {
    FirstScreen.routeName: (context) => FirstScreen(),
  },
  title: 'Navigation with Arguments',
  home: HomeScreen(),
);
```

Cuối cùng, điều hướng đến `FirstScreen()` khi người dùng nhấn vào một button bằng       `Navigator.pushNamed()`. Cung cấp các đối số cho route thông qua thuộc tính đối số `FirstScreen()` 

```dart
Button(
  child: Text("Chuyển đến màn hình 2"),
  onPressed: () {
    Navigator.pushNamed(
      context,
      ExtractArgumentsScreen.routeName,
      arguments: ScreenArguments(
        'Đề mục',
        'Data được truyền đi và giải nén ra.',
      ),
    );
  },
),
```
![](https://images.viblo.asia/9aaa2b3d-ac2c-495b-bb1d-1f735c33884c.png)

Data đã được truyền qua màn hình 2.
![](https://images.viblo.asia/dc630341-1aef-40d3-8a14-ddbc149e0fea.png)

### onGenerateRoute()
Thay vì trích xuất các đối số trực tiếp bên trong Widget con, ta cũng có thể trích xuất các argument bằng một hàm `onGenerateRoute() `và chuyển chúng vào một Widget con.

Hàm `onGenerateRoute()` tạo route chính xác dựa trên `RouteSettings` class.

```dart
MaterialApp(
  onGenerateRoute: (settings) {
    if (settings.name == SecondScreen.routeName) {
     // Ép kiểu argument sang ScreenArguments.
      final ScreenArguments args = settings.arguments;

    //Chuyển data đến màn hình 2.
      return MaterialPageRoute(
        builder: (context) {
          return SecondScreen(
            title: args.title,
            message: args.message,
          );
        },
      );
    }
  },
);
```

```dart
class SecondScreen extends StatelessWidget {
  static const routeName = '/secondScreen';

  final String title;
  final String message;

  const SecondScreen({
    Key key,
    @required this.title,
    @required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Text(message),
      ),
    );
  }
}
```

```dart
Button(
  child: Text("Chuyển đến màn hình 2"),
  onPressed: () {
    Navigator.pushNamed(
      context,
      ExtractArgumentsScreen.routeName,
      arguments: ScreenArguments(
        'Đề mục',
        'Data được truyền đi dùng onGenerateRoute()',
      ),
    );
  },
),
```
Kết quả sau khi chuyển màn hình.
![](https://images.viblo.asia/ec7a916d-420c-4c52-84bf-c5bd8f76fcfc.png)

# Tổng kết
Mình đã giới thiệu sơ lược về navigate, hy vọng có thể giúp ích được cho mọi người :kissing_heart:

> Link tham khảo: https://flutter.dev/docs/cookbook/navigation