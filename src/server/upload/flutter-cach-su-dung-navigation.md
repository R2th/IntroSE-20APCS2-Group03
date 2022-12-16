Hầu hết các ứng dụng đều chứa một số màn hình để hiển thị các loại thông tin khác nhau. Ví dụ: chúng ta có thể có màn hình hiển thị sản phẩm. Sau đó, người dùng có thể chạm vào sản phẩm để biết thêm thông tin về sản phẩm trên màn hình mới.

Trong Android, các màn hình này chúng ta gọi là các `Activities`, trong iOS thì được gọi là ViewControllers. Còn trong Flutter, các màn hình chỉ là Widgets!

Vậy làm cách nào để điều hướng đến màn hình mới trong Flutter? Sử dụng [Navigator](https://docs.flutter.io/flutter/widgets/Navigator-class.html)!
Hôm nay chúng ta sẽ tìm hiểu về `Navigator.push/Navigator.pop` trong Navigator ở Flutter và cách truyền dữ theo theo phương thức `Navigator.push`

##  Điều hướng màn hình
Chúng ta sẽ thực hiện các công việc :

1. Tạo 2 màn hình (Widgets)
2. Từ màn hình thứ 1, chúng ta sẽ chuyển sang màn hình thứ 2 với việc sử dung `Navigator.push`
3. Ở màn hình thứ 2, để quay trở lại màn hình thứ 1, chúng ta sử dụng `Navigator.pop`

Triển khai từng phần: 
### Tạo 2 màn hình (Widgets)
Chúng ta sẽ cùng đi tạo 2 màn hình đơn giản, ở đó mỗi màn hình có 1 button nằm ở giữa màn hình :

- Màn hình thứ 1 sẽ handle việc chuyển sang màn hình thứ 2
- Màn hình thứ 2 sẽ handle việc quay về màn hình thứ 1 

Xây dựng màn hình thứ 1 với nút "Launch screen"
```dart
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Launch screen'),
          onPressed: () {
            // Navigate to second screen when tapped!
          },
        ),
      ),
    );
  }
}
```

Màn hình thứ 2 với nút "Go back!"
```dart
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Screen"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            // Navigate back to first screen when tapped!
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```
### Sử dụng Navigator.push
Để chuyển hướng tới màn hình khác chúng ta sử dụng phương thức `Navigator.push` . Phương thức `push` sẽ thêm một `Route` vào trong stack chứa toàn bộ Routes của Navigator. 

Như vậy làm sao để tạo ra một `Route`? Chúng ta sẽ sử dụng [MaterialPageRoute](https://docs.flutter.io/flutter/material/MaterialPageRoute-class.html). Sử dụng `MaterialPageRoute` là tiện dụng bởi vì nó chuyển sang màn hình mới với các animation cụ thể.

Chúng ta sẽ đi thêm phương thức `Navigator.push` vào trong callback `onPressed` trong màn hình đầu tiên như sau: 

```dart
// Within the `FirstScreen` Widget
onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SecondScreen()),
  );
}
```

### Sử dụng Navigator.pop
Sau khi đã `push` sang một màn hình mới, chúng ta sẽ sử dụng phương thức `Navigator.pop` để quay trở lại màn hình đầu tiên. 
Phương thức `pop` sẽ xoá `Route` hiện tại ra khỏi stack chứa toàn bộ Routes của Navigator. 

Cách triển khai đơn giản thôi. Trong màn hình thứ 2, chúng ta chỉ cần thêm vào dòng code `Navigator.pop(context)` vào trong callback `onPressed: ()`
```dart
// Within the SecondScreen Widget
onPressed: () {
  Navigator.pop(context);
}
```

![](https://images.viblo.asia/8aa7cdcd-8e61-4412-9124-decc5dccd71d.gif)

## Truyền dữ liệu trong Navigator.push
Sau khi đã biết cách điều hướng các màn hình với `Navigator` trong Flutter. Vậy làm cách nào để chúng ta có thể truyền dữ liệu sang màn hình khác với `Navigator` ?
Chúng ta sẽ cùng đi tìm hiểu với ví dụ đơn giản là hiển thị danh sách Todo, khi click vào một Todo thì hiển thị toàn bộ thông tin của Todo này.

### Define a Todo class
Chúng ta sẽ cần tạo 1 Todo class có chứa 2 thông tin : title và description 
```dart
class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}
```

### Create a List of Todos
Tiếp theo chúng ta sẽ đi hiển thị danh sách Todo trong một ListView 
1. Khởi tạo danh sách Todo 
Ở đây chúng ta đi khởi tạo danh sách với 20 Todos được lưu dưới dạng [Basic List](https://flutter.io/cookbook/lists/basic-list/)
```dart
final todos = List<Todo>.generate(
  20,
  (i) => Todo(
        'Todo $i',
        'A description of what needs to be done for Todo $i',
      ),
);
```
3. Hiển thị danh sách Todo với việc sử dụng ListView 
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile( //use ListTile to show a Todo 
      title: Text(todos[index].title),
    );
  },
);
```

### Tạo trang Detail Screen
Sau khi có được màn hình đầu tiên hiển thị lên danh sách Todo. Chúng ta sẽ đi xây dựng màn hình `DetailScreen`
Màn hình này sẽ có 2 phần : title của màn hình sẽ hiển thị title của Todo, và bên trong màn hình chúng ta sẽ hiển thị thông tin description của Todo. 


```dart
class DetailScreen extends StatelessWidget {
  // Declare a field that holds the Todo
  final Todo todo;

  // In the constructor, require a Todo
  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Use the Todo to create our UI
    return Scaffold(
      appBar: AppBar(
        title: Text("${todo.title}"),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text('${todo.description}'),
      ),
    );
  }
}
```

### Truyền dữ liệu tới màn hình Detail Screen
Việc tiếp theo là chúng ta cần truyền dữ liệu Todo sang màn hình `DetailScreen` sau khi click vào một Todo trong danh sách.
Trong `ListTile` widget cung cấp sẵn một callback `onTap` để lắng nghe sự kiện khi chúng ta click vào item. 

Sau khi bắt được sự kiện `onTap` chúng ta sẽ sử dụng phương thức `Navigator.push` và truyền dữ liệu vào trong method này. 
```dart
ListView.builder(
  itemCount: todos.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(todos[index].title),
      // When a user taps on the ListTile, navigate to the DetailScreen.
      // Notice that we're not only creating a DetailScreen, we're
      // also passing the current todo to it!
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DetailScreen(todo: todos[index]),
          ),
        );
      },
    );
  },
);
```

![](https://images.viblo.asia/f3b8d3eb-29c3-4243-9c0b-5b6d02a19c92.gif)

Qua bài này chúng ta có thể thay việc sử dụng `Navigator` trong Flutter là khá đơn giản đúng không. Nhưng đây mới chỉ là ở mức basic, còn việc custom và đi tìm hiểu sâu hơn nữa thì sao. 
Chúng ta sẽ cùng tiếp tục tìm hiểu trong những phần sau nhé. 

Happy Learning! 

Bài viết tham khảo từ trang [Flutter](https://flutter.io/cookbook/)