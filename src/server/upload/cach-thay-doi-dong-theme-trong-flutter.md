## Làm thế nào để làm nó.
Thông thường, ứng dụng của bạn trông giống như sau:

```
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

Nếu bạn muốn thay đổi chủ đề của ứng dụng tại thời điểm biên dịch, bạn có thể sửa đổi `ThemeData` . Có một thuộc tính gọi là `Brightness` thay đổi một loạt các màu từ sáng sang tối nếu được đặt thành` Brightness.dark`
Chúng ta muốn nó tự động thay đổi biến đó trong thời gian chạy. Do đó, chúng tôi đặt `state` cho widget cao nhất.

```
class _MyAppState extends State<MyApp> {

  Brightness brightness;

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.dark,
      ),
      home: new MyHomePage(
        title: 'Flutter Demo Home Page',
        onThemeChanged: (data) {
          setState(() {
            brightness = data.brightness;
          });
        },
      ),
    );
  }
}
```
Bây giờ, chúng ta phải truy cập `state` này. Hoặc chúng ta truyền callback viết 1 custom InheritedWidget, hoặc sử dụng BuildContext

Truyền callback là cách làm đơn giản nhất. Nhưng nó cũng là một trong những cách khó chịu nhất. Nếu cây bị lồng nhiều lớp thì chỉ cần chuyển lệnh gọi lại cho các cây con của nó. Logic khá đơn giản mặc dù tất cả những gì xảy ra là:

* Widget trên cùng sẽ thực thi phương thức sẽ thay đổi độ sáng và gọi `setState()`
* Con nào của cây widget cũng được tham chiếu đến phương thức và gọi nó.

`InheritedWidget`sẽ giải quyết vấn đề này bằng cách đưa tất cả con quyền truy cập callback. Bạn vẫn có thể quản lý callback, nhưng bây giờ không cần truyền nó xuống dưới nữa.

Tùy chọn khả thi cuối cùng là tìm kiếm state trên cây. Cách này đơn giản, bạn chỉ cần context và dùng nó để search.

```
context.ancestorStateOfType(const TypeMatcher<YourState>());
```

Bây giờ chúng tôi có thể truy cập và sửa đổi `Brightness` trong app. Điều cuối cùng là duy trì `Brightness` qua các lần khởi động lại ứng dụng.

```
void main() async {
  Brightness brightness;
  SharedPreferences prefs = await SharedPreferences.getInstance();
  brightness = (prefs.getBool("isDark") ?? false) ? Brightness.dark: Brightness.light;
  runApp(new MyApp(brightness: brightness,));
}
```

Sử dụng `shared preferences` để lấy lại độ sáng đã lưu trước khi chạy app. Khi độ sáng thay đổi thì chúng ta lưu nó xuống.

Vì `shared preferences` là bất đồng bộ, chúng ta phải chờ để có kết quả, nhưng rất nhanh sẽ không ảnh hưởng lớn đến app.

Vậy là xong, chúng ta có thể thay đổi theme của app bất kì đâu trong code