> [**Flutter**](http://flutter.io/) là SDK ứng dụng di động của [**Google**](https://www.google.com/), giúp tạo các ứng dụng di động hiện đại cho iOS và Android bằng cách sử dụng một code base (gần như). Nó là một lựa chọn mới cho những người tham gia vào phát triển ứng dụng di động đa nền tảng và không giống như các frameworks khác như [**React Native**](http://facebook.github.io/react-native/), nó không sử dụng JavaScript mà dùng **[DART](https://www.dartlang.org/)** làm Ngôn ngữ lập trình.

## Drawer là cái gì?

`Drawer` là một màn hình bên vô hình thường chứa các mục menu và nó chiếm khoảng một nửa màn hình khi hiển thị. Nếu bạn đã từng sử dụng các ứng dụng như Twitter và / hoặc GMail, thì bạn đã biết tôi nói về cái gì rồi đó.

## Tạo Drawer trống

Trước tiên, hãy tạo ra một drawer trống. Cũng như các ứng dụng Flutter khác với thiết kế **[material-ui](https://material-ui.com/)**, chúng ta sẽ tạo ra một `MaterialApp` cơ bản, màn hình chính sẽ chứa một `Scaffold` với `Drawer`.

Đây là code cho `MaterialApp` cơ bản sẽ trông như thế nào
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build (BuildContext ctxt) {
    return new MaterialApp(
      home: new DWidget()
    );
  }
}
```

`DWidget` ở đây là widget sẽ chứa các drawers. Cần lưu ý rằng các `drawers` là một phần của `Scaffold` cùng với `appBar` và `body`. Khi chúng ta thêm drawer vào Scaffold, nó sẽ tạo ra một mục menu ba dòng ở góc trên cùng bên trái của thanh ứng dụng, khi nhấp vào sẽ hiển thị màn hình drawer.

Đây là code cho nó cơ bản sẽ như thế này.

```dart
class DWidget extends StatelessWidget {
  @override
  Widget build (BuildContext ctxt) {
    return new Scaffold(
      drawer: new Drawer(
        child: new Text("\n\n\nDrawer Is Here"),
      ),
      appBar: new AppBar(
        title: new Text("Drawer Demo"),
      ),
      body: new Text("Drawer Body"),
    );
  }
}
```

Điều này sẽ tạo ra một ứng dụng với một drawer đơn giản như hiển thị bên dưới.

<p align="center"><img src="https://images.viblo.asia/14d3e033-51ec-451b-bc45-d8b28a3412b9.gif" width="400" height="790"></p>

<p align="center">An empty drawer</p>

Như bạn có thể nhận thấy rằng drawer, có `child:` và không phải `children:`, có nghĩa là tại bất kỳ thời điểm nào, chúng ta chỉ có thể có một widget trong drawer.

Để có nhiều hơn một widget, chúng ta cần sử dụng các widget có khả năng chứa nhiều widget con như `Column`. 

Đây là code cho drawer sẽ trông như thế này với `Column`

```dart
drawer: new Drawer(
  child: new Column(
    children: <Widget>[
      new Text("\n\n\n\Drawer Is Here => 1"),
      new Text("Drawer Is Here => 2"),
      new Text("Drawer Is Here => 3"),
    ],
  )
),
```

Điều này sẽ hiển thị ba dòng văn bản trong drawer.

## Thêm Drawer Header

Bây giờ chúng ta biết drawer là gì và làm thế nào nó có thể được tạo ra. Tuy nhiên, nếu chúng ta tiếp tục và so sánh các drawer của mình với drawer GMail hoặc Twitter, chúng ta sẽ nhận thấy rằng các drawer luôn đi kèm với một tiêu đề chiếm khoảng ~ 20% không gian ở trên cùng.

Trong Flutter, chúng ta có thể tạo một tiêu đề tương tự bằng cách sử dụng tiện ích `DrawerHeader` có một `child` và cho phép chúng ta trang trí tiêu đề. Ở đây, tôi đã sử dụng `BoxDecoration` để chúng ta có thể phân biệt ranh giới hoàn chỉnh của widget.

Đây là code cho `DrawerHeader` sẽ trông như thế này

``` dart
drawer: new Drawer(
  child:new DrawerHeader(
    child: new Text("DRAWER HEADER.."),
    decoration: new BoxDecoration(
      color: Colors.orange
    ),
  )
),
```

Và đây là cách drawer hiện tại thay đổi
<p align="center"><img src="https://images.viblo.asia/f68e6c1d-de0d-479b-9f91-9609f4629292.gif" width="400" height="790"></p>

<p align="center">Drawer with Drawer Header</p>

Thật đáng ngạc nhiên khi thấy tiêu đề chiếm 100% drawer trong khi nó được cho là chỉ chiếm khoảng 20% không gian trên đầu.
> Điều này xảy ra bởi vì trong `child` của drawer, chúng ta chỉ có `DrawerHeader` và không có gì khác.

## Chuyển Drawer Header lên phía trên

Để di chuyển tiêu đề drawer lên trên drawer, chúng ta cần sử dụng các tiện ích có thể chứa nhiều tiện ích (ví dụ: child:) như `Column` trên `ListView`.

Chúng ta sẽ sử dụng `ListView` ở đây vì `Column` không có tất cả các không gian có sẵn, điều này sẽ để lại các khoảng trống của màn hình trên không gian trống. Đây là cách chúng ta có thể sử dụng `ListView` bên trong `Drawer`.

```dart
drawer: new Drawer(
  child: new ListView(
    children: <Widget>[
      new DrawerHeader(
        child: new Text("DRAWER HEADER.."),
        decoration: new BoxDecoration(
            color: Colors.orange
        ),
      )
    ],
  )
),
```

Và đây là kết quả sẽ trông như thế này

<p align="center"><img src="https://images.viblo.asia/0ee4cf48-b2d4-4383-ae41-903e590e499a.gif" width="400" height="790"></p>

<p align="center">Drawer with ListView Widget</p>

Bây giờ, đây là những gì chúng ta đang tìm kiếm. Điều này cũng giống với các ứng dụng như tiêu đề Drawer GMail và Twitter.

> Bây giờ, chúng ta có thể trang trí tiêu đề theo cách chúng ta muốn và có càng nhiều mục và liên kết càng tốt.

Tôi sẽ quay lại trang trí tiêu đề trong một số bài viết sau, trong bài đăng này, chúng ta sẽ tiến hành hoàn thiện chức năng của drawer và thêm một số thành phần có thể thao tác.

## Thêm hành động cho các phần tử trên Drawer

Vì chúng ta muốn thực hiện một số hành động khi ai đó chọn (hoặc chạm) một trong các mục của drawer, chúng ta cần sử dụng các tiện ích có thể xử lý phương thức `onTap` hoặc cách khác, chúng ta cần tạo một container xung quanh các tiện ích để xử lý action.

> Tuy nhiên, sử dụng các widget với trình xử lý `onTap` tích hợp được ưa thích hơn ở đây vì tính dễ sử dụng của nó.

**<p align="center">Một widget như vậy mà chúng ta có thể sử dụng bên trong `ListView` là `ListTile`</p>**

Hãy để cùng nhau tạo một vài mục bằng `ListTile` và thêm các hành động tương ứng bằng phương thức onTap(). Có nhiều hành động chúng ta có thể thêm vào onTap(), tuy nhiên, hầu hết chúng ta thường sẽ tải một trang mới với onTap().

## Tải lại các trang mới
Tôi đã giải thích cách tải các trang mới trong một bài viết Flutter khác của tôi ở [đây](https://proandroiddev.com/flutter-creating-multi-page-application-with-navigation-ef9f4a72d181)

Tôi sẽ khuyên bạn nên đọc bài viết này để hiểu cách điều hướng hoạt động trong Drawer. Chúng ta sẽ sử dụng cùng một phương pháp ở đây để tải trang mới lên màn hình.

Tại đây, chúng ta sẽ tạo ra một vài trang (nghĩa là các widget) và tải chúng là kết quả của một hành động từ người dùng cuối trên các drawer.
```dart
class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Scaffold(
      appBar: new AppBar(title: new Text("First Page"),),
      body: new Text("I belongs to First Page"),
    );
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Scaffold(
      appBar: new AppBar(title: new Text("Second Page"),),
      body: new Text("I belongs to Second Page"),
    );
  }
}
```

Hãy để tải chúng dưới dạng hành động `onTap()` trên `ListTile`. Đây là cách mã drawer hoàn chỉnh sẽ trông như thế này
```dart
drawer: new Drawer(
  child: new ListView(
    children: <Widget>[
      new DrawerHeader(
        child: new Text("DRAWER HEADER.."),
        decoration: new BoxDecoration(
            color: Colors.orange
        ),
      ),
      new ListTile(
        title: new Text("Item => 1"),
        onTap: () { 
          Navigator.push(ctxt,
              new MaterialPageRoute(builder: (ctxt) => new FirstPage()));
        },
      ),
      new ListTile(
        title: new Text("Item => 2"),
        onTap: () {
          Navigator.push(ctxt,
              new MaterialPageRoute(builder: (ctxt) => new SecondPage()));
        },
      ),
    ],
  )
),
```

Và đây là kết quả

<p align="center"><img src="https://images.viblo.asia/1fcfa8aa-fc7e-4f0f-9844-c18bb275f994.gif" width="400" height="790"></p>

<p align="center">Drawer with Actionable Items</p>

## Làm cho Drawer biến mất

Chúng ta có thể tải thành công các trang mới khi nhấp vào các mục của drawer, tuy nhiên, khi chúng ta cố gắng quay lại trang gốc, drawer vẫn được tải ở đó (như có thể thấy trong hình trên).

> Điều này thật khó chịu vì chúng ta không muốn các drawer ở đó trừ khi chúng ta tải lại một cách rõ ràng


Điều này có thể đạt được bằng cách dỡ drawer trước khi chúng ta tải một trang mới bằng cách gọi `Navigator.pop()`. Đây là cách thay đổi mã `onTap()`

```dart
onTap: () {
  Navigator.pop(ctxt);
  Navigator.push(ctxt,
      new MaterialPageRoute(builder: (ctxt) => new FirstPage()));
},
```

Và màn hình kết quả sẽ không giữ các drawer trên Trang gốc

<p align="center"><img src="https://images.viblo.asia/cd43317a-8e3f-4459-bec6-694922323f08.gif" width="400" height="790"></p>
<p align="center">Making Drawer Disappear</p>

## Làm Drawer có sẵn trên tất các trang

Chúng thường tạo ra các hành động phổ biến trên các drawer cần được cung cấp trên toàn bộ ứng dụng. Điều này có thể được thực hiện bằng cách đảm bảo rằng các drawer có sẵn cho mỗi `Scaffold` hoặc tất cả các trang.

Điều này có nghĩa là chúng ta có thể có drawer trong một widget riêng biệt không trạng thái như

```dart
class DrawerOnly extends StatelessWidget {
  @override
  Widget build (BuildContext ctxt) {
    return new Drawer(
        child: new ListView(
          children: <Widget>[
            new DrawerHeader(
              child: new Text("DRAWER HEADER.."),
              decoration: new BoxDecoration(
                  color: Colors.orange
              ),
            ),
            new ListTile(
              title: new Text("Item => 1"),
              onTap: () {
                Navigator.pop(ctxt);
                Navigator.push(ctxt,
                    new MaterialPageRoute(builder: (ctxt) => new FirstPage()));
              },
            ),
            new ListTile(
              title: new Text("Item => 2"),
              onTap: () {
                Navigator.pop(ctxt);
                Navigator.push(ctxt,
                    new MaterialPageRoute(builder: (ctxt) => new SecondPage()));
              },
            ),
          ],
        )
    );
  }
}
```

và sử dụng cái này bên trong các `widgets` của chúng với `Scaffold`

```dart
class DWidget extends StatelessWidget {
  @override
  Widget build (BuildContext ctxt) {
    return new Scaffold(
      drawer: new DrawerOnly(),   // New Line
      appBar: new AppBar(
        title: new Text("Drawer Demo"),
      ),
      body: new Text("Drawer Body"),
    );
  }
}

class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Scaffold(
      drawer: new DrawerOnly(),    // new Line
      appBar: new AppBar(title: new Text("First Page"),),
      body: new Text("I belongs to First Page"),
    );
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Scaffold(
      drawer: new DrawerOnly(),    // New Line
      appBar: new AppBar(title: new Text("Second Page"),),
      body: new Text("I belongs to Second Page"),
    );
  }
}
```

Và ứng dụng kết quả sẽ có drawer trên tất cả các trang

<p align="center"><img src="https://images.viblo.asia/cd43317a-8e3f-4459-bec6-694922323f08.gif" width="400" height="790"></p>

<p align="center">Drawer on all page</p>

Đó là tất cả cho bài viết đặc biệt này. Tôi hy vọng tôi có thể giải thích làm thế nào chúng ta có thể tạo và sử dụng các drawer trong các ứng dụng flutter. 
****
Thank for reading….!!!

[source article](https://proandroiddev.com/flutter-creating-drawers-e31414f7d71a)