Flutter là một sản phẩm của Google được sử dụng để xây dựng các ứng dụng di động lai với ngôn ngữ [Dart](https://www.dartlang.org/). Một trang ứng dụng trong Flutter là một Widget, mô tả về UI được miêu tả. Để tạo một ứng dụng hợp lý, bạn cần nhiều trang này, hiển thị vô số tính năng. Nó rất tốt và ổn sau khi bạn tạo một trang mới. Nhưng, làm thế nào để bạn di chuyển giữa chúng? 

Khá đơn giản: bạn sử dụng class [Navigator](https://docs.flutter.io/flutter/widgets/Navigator-class.html), sẵn có trong Flutter SDK.

## Navigator

Navigator là một Widget khác nó quản lý các trang của ứng dụng theo định dạng giống như ngăn xếp. Các trang full-screen được gọi là các router khi được sử dụng trong Navigator. Bộ điều hướng hoạt động giống như một triển khai ngăn xếp bình thường. Nó đi kèm với hai phương pháp quen thuộc là `push` và `pop`.

1. Push: Phương pháp `push` được sử dụng để thêm một route khác lên trên cùng của ngăn xếp hiện tại. Trang mới được hiển thị trên trang trước.
2. Pop: Vì Bộ điều hướng hoạt động giống như một ngăn xếp, nó sử dụng nguyên tắc LIFO (Lần vào trước, Xuất trước). Phương thức pop loại bỏ route trên cùng khỏi ngăn xếp. Điều này sẽ hiển thị trang trước cho người dùng.

Trong bài đăng này, tôi sẽ hiển thị: 
1. Hai cách điều hướng.
2. Truyền dữ liệu đến trang tiếp theo.

## Normal Navigation

Có hai cách để làm điều này:

### Tạo một trang mới trong phương pháp Push

Trong phương thức này, route mới được tạo bằng lớp `MaterialPageRoute`. Một trang mới (Widget) được tạo trong đó. Hai câu lệnh tạo này được đính kèm trong phương thức `push` và thêm trang này vào đầu ngăn xếp.

Tôi có chuẩn bị một project nho nhỏ ở [đây](https://github.com/oNguyenTuAnh/navigation-example-flutter), bạn có thể download và chúng ta bắt đầu. Tôi đã chỉnh sửa nó thêm vào một nút trên thành phần của `CustomCard`. Nút này sử dụng phương pháp `push`, trong đó route và trang mới được tạo ra.

``` dart
Widget build(BuildContext context) {
  return Card(
    child: Column(
      children: <Widget>[
        Text('Card $index'),
        FlatButton(
          child: Text("Press Me"),
          onPressed: () {
            Navigator.push(context, MaterialPageRoute<void>(
              builder: (BuildContext context) {
                return Scaffold(
                  appBar: AppBar(title: Text('My Page')),
                  body: Center(
                    child: FlatButton(
                      child: Text('POP'),
                      onPressed: () {
                        Navigator.pop(context);
                      },
                    ),
                  ),
                );
              },
            ));
          }),
    ],
  ));
}
```

![](https://images.viblo.asia/c1e2df1b-fffb-4b45-b759-83b6f3e46f54.gif)

### Thêm route vào app

Nhìn chung thì các ứng dụng có nhiều trang và thường xuyên hơn không, với mã hóa phức tạp. Nó sẽ không dễ dàng để tiếp tục tạo ra một trang mới để push vào. Điều này đặc biệt đúng nếu trang được truy cập từ nhiều nơi khác nhau. Bạn có thể mất theo dõi mã cho từng route giống nhau.
<br>
<br>
Vì vậy, trong phương thức thứ hai, trang được tạo một lần nhưng được thêm dưới dạng route trong điểm vào của ứng dụng, `main.dart`. Các tuyến này được đặt tên giống như đường dẫn tệp vì trang gốc của ứng dụng là đường dẫn `/`.


Trước tiên, bạn xây dựng một trang ứng dụng mới, như vậy:

```dart
class SecondPage extends StatelessWidget {
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Page'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Back To HomeScreen'),
          color: Theme.of(context).primaryColor,
          textColor: Colors.white,
          onPressed: () => Navigator.pop(context)),
      ),
    );
  }
}
```

Sau đó, thêm trang mới trong tệp `main.dart` và đưa nó vào danh sách các route bên trong hàm tạo của MaterialApp.

``` dart
class MyApp extends StatelessWidget {
// This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
      routes: <String, WidgetBuilder>{
        '/a': (BuildContext context) => SecondPage(),
      });
  }
}
```

Sau đó, tôi chỉnh sửa phương thức `onPress` của `FlatButton` trong `CustomCard` thành:

```dart
Navigator.pushNamed(context, '/a');
```

![](https://images.viblo.asia/aa95bec2-53d6-441a-a007-30887f4b3487.gif)

Trong ví dụ trên, người dùng được chuyển hướng đến lớp `SecondPage` được tạo vì đây là trang tương ứng với đường dẫn `/a`.

## Truyền dữ liệu giữa các trang
Bây giờ, phần cuối cùng của demo đó là chuyển dữ liệu sang trang tiếp theo. Làm như vậy một cách dễ dàng đòi hỏi một sự kết hợp của cả hai phương pháp điều hướng được đề cập ở trên.
<br>
<br>
Phương thức `PushNamed` không hỗ trợ truyền dữ liệu. Nhưng phương pháp trước đây tạo ra một route mới bên trong phương pháp `push`. Một trang mới không cần phải được thực hiện. Tham số được xây dựng của `MaterialPageRoute` bây giờ sẽ gọi hàm tạo của lớp `SecondPage`.
<br>
<br>
Cập nhật lớp SecondPage để chấp nhận dữ liệu được truyền cho nó, như vậy:

```dart
class SecondPage extends StatelessWidget {  
SecondPage({@required this.title});
final title;
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Card No. $title'),
      ),
      body: Center(...),
    );
  }
}
```

Phương thức `FlatButtons` trên `onPress` hiện được chỉnh sửa thành:

```dart
Navigator.push( context,
  MaterialPageRoute(
    builder: (context) => SecondPage(title: index)
  )
);
```

Index của thẻ hiện được chuyển cho lớp `SecondPage` và được hiển thị trong `AppBar`.

![](https://images.viblo.asia/389d5ee3-2746-4b72-b6d0-e0eba589fc1f.gif)

Thanks for reading! Bạn có thể tìm thấy repo ở [đây](https://github.com/oNguyenTuAnh/navigation-example-flutter).

[Nguồn bài viết.](https://medium.freecodecamp.org/how-to-handle-navigation-in-your-flutter-apps-ceaf2f411dcd)