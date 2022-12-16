# Giới thiệu
Chào các bạn, đến hẹn lại lên cần phải research thứ gì đó :))

Dạo này mình đang tìm hiểu về flutter, thấy bài này hay quá nên mạn phép cõng về đây cùng tham khảo về Flutter với 500 ae. Hi vọng sẽ giúp ích được cho các bạn ^^. Huyên thuyên vậy đủ rồi, let's go!

Flutter là SDK của Google, giúp tạo các ứng dụng di động cho iOS và Android bằng cách sử dụng một cơ sở mã (gần như vậy). Nó là một người mới trong phát triển ứng dụng di động đa nền tảng và không giống như các frameworks khác ví dụ React Native, nó không sử dụng JavaScript làm Ngôn ngữ lập trình.

Ngôn ngữ được sử dụng trong flutter là DART, tương tự như JavaScript, nó cũng chạy một hàng đợi sự kiện theo luồng. Lợi ích lớn nhất của việc sử dụng Flutter là nó trực tiếp tạo ra các nhị phân ARM sẽ thực thi trực tiếp trên nền tảng gốc giúp chạy nó nhanh hơn.

> JavaScript based frameworks like “React Native” needs a bridge which converts the JavaScript code to Native Code which adds an additional layer of indirection.

Các hướng dẫn cài đặt  **[TẠI ĐÂY](https://flutter.io/setup/)**. Cả **Android Studio** và **IntelliJ IDEA** đều có thể sử dụng để phát triển các ứng dụng flutter.

Nguồn tham khảo: https://proandroiddev.com/flutter-from-zero-to-comfortable-6b1d6b2d20e

# Tạo ứng dụng Flutter - Các widget phân cấp
Tất cả mọi thứ trong một ứng dụng Flutter đều là một Widget trong Flutter, từ những thử đơn giản như **Text** hay **Button** cho đến các **Screen Layouts**.

Các widgets này sắp xếp theo thứ tự phân cấp sẽ được hiển thị trên màn hình. Các widget có thể chứa các widget bên trong nó được gọi là **Container Widget**. Hầu hết các widget bố cục là các widget container ngoại trừ các widget thực hiện một công việc tối thiểu như Text Widget.

Một sự sắp xếp tối thiểu của các widgets sẽ trông giống như
![](https://images.viblo.asia/bd89d0fd-57d2-49a3-a83b-d84dbba49128.png)

# Hello Flutter : The first Flutter Code
Với những dòng code đầu tiên của chúng ta, mình sẽ hiển thị *"Hello Flutter"* trên di động. Chúng ta sẽ sử dụng **Widget Container** có tên là **Directionality** và **Text Widget** gọi là **Text** để hiển thị văn bản trên màn hình. Dưới đây là đoạn code.

```kotlin
import 'package:flutter/material.dart';
void main() => runApp(new MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Directionality(
        textDirection: TextDirection.ltr,
        child: new Text("Hello Flutter")
    );
  }
}
```

Cũng như nhiều ngôn ngữ lập trình khác, hàm **main()** là nơi bắt đầu thực thi. Trong đoạn code **Hello Flutter** ở trên, MyApp là một widget được tạo ra để xây dựng bố cục màn hình.

>Every custom widget has a **build** function which returns a **Widget**

Trong đoạn code trên, mình tạo ra một *"Container Widget"* có tên gọi là *"Directionality"*, sẽ có widget con là *Text*, sẽ hiển thị văn bản trong Hello Flutter. Hệ thống phân cấp widget cho cái này trông giống như

![](https://images.viblo.asia/9de61ff6-75a7-4d8c-b732-37fc60e851a2.png)

Văn bản sẽ được hiển thị ở trên cùng của màn hình, tuy nhiên, chúng ta có thể di chuyển văn bản ra giữa màn hình bằng cách sử dụng một widget có tên là **Center**, thay đổi thứ bậc như sau

![](https://images.viblo.asia/60358494-f9b6-43df-9e01-53eae2580378.png)

Và code lúc này sẽ giống như
```kotlin
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new Directionality(
        textDirection: TextDirection.ltr,
        child: new Center(                        // Changed Line
          child: new Text("Hello Flutter"),       // Changed Line
        )
    );
  }
}
```

# Tạo Material Designs
Không có ứng dụng nào chúng ta tạo ra cho thế giới thực sẽ chỉ có các văn bản đơn giản được hiển thị trên màn hình, thay vào đó, một ứng dụng sẽ ở mức tối thiểu bao gồm **Application Bar**, **Body**, và **Navigational Functionality**.

Trong Flutter, chúng ta thường sử dụng **MaterialApp** để tạo material design cho phép chúng ta sử dụng **Scaffold**, nó sẽ được sử dụng để tạo **Application Bar & Body**. Đây là cách chúng tôi tạo ra một màn hình tối thiểu với MaterialApp và Body.

```kotlin
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
        ),
        body: new Center(
          child: new Text("Hello Flutter"),
        ),
      ),
    );
  }
}
```

Và hệ thống phân cấp widget cho ở trên sẽ như thế nào

![](https://images.viblo.asia/e9df06c6-5875-4ad3-bad9-f1c2eec793c4.png)

# Mở rộng Material Designs
Trong Material Design, *body* chỉ có thể chứa một widget con không phải là thứ chúng ta muốn. Nói chung, màn hình bao gồm nhiều widgets.

Để đạt được điều tương tự, chúng ta cần sử dụng một widget như con, có thể chứa một loạt các widget khác. Có nhiều widget trong Flutter có thể chứa một loạt các widget con, **Row / Column** là một trong số đó. Trong đoạn code trên, chúng ta có thể thêm **Row/Column** để hiển thị nhiều widget thay đổi phân cấp widget như sau

![](https://images.viblo.asia/b081ad0c-b267-460b-a729-0c11a9a63b49.png)

Và code lúc này sẽ như sau

```kotlin
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
        ),
        body: new Center(
          child: new Row(
            children: <Widget>[
              new Text("Hello Flutter"),
              new Text("Hello Flutter - "),
            ],
        ),
       ),
      )
    );
  }
}
```

# Truyền tham số tùy chỉnh cho Widgets
Class *MyApp* cũng là một **Widget** được tạo bởi application. Cũng giống như bất kỳ Widgets dựng sẵn nào khác, chúng ta cũng có thể truyền các tham số cho widget của mình. Điều này được thực hiện khi cung cấp **constructor** trên class MyApp.
>It's a non mandatory, but a common practice to declare the parameters provided inside the constructor as final.

Trong code bên dưới, widget *MyApp* của mình sẽ đợi một widget làm đầu vào nơi chúng ta sẽ cung cấp *TextWidget* làm đầu vào.

```kotlin
void main() => runApp(new MyApp(
  TextInput: new Text("Provided By Main"),
));
class MyApp extends StatelessWidget {
  MyApp({this.TextInput});
 final Widget TextInput;
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
        ),
        body: new Center(
          child: new Column(
            children: <Widget>[
              TextInput
            ],
          ),
        )
      ),
    );
  }
}
```

# Stateless và Stateful Widgets
Có hai loại widget chúng ta có thể tạo trong flutter là **Stateless** và **Stateful**. Tất cả các widget mà chúng ta đã tạo ra cho đến bây giờ là các *stateless widget*.
## Stateless Widgets và những hạn chế của nó
Một *Stateless widget* chỉ có thể được vẽ ra một lần khi Widget được tải, điều đó có nghĩa là chúng ta có thể vẽ lại Widget dựa trên bất kỳ sự kiện hoặc hành động nào của người dùng.

Chúng ta có thể thấy hành vi này bằng cách có **Widget Checkbox**. **Widget Checkbox** là một flutter Widget có chức năng xử lý cho việc click vào Checkbox, tuy nhiên, để hiển thị checkbox đã được click, chúng ta cần vẽ lại Widget bằng **hot reload** hoặc reload widget.

Điều này không có nghĩa là **Stateless Widgets** không hữu ích, nó có cách sử dụng riêng trong việc hiển thị nội dung tĩnh hoặc trang cần được tải lại nhiều lần trong một Ứng dụng

Đây là cách các Stateless widget với một checkbox sẽ trông như thế nào
```kotlin
class MyApp extends StatelessWidget {
  MyApp({this.TextInput});
  final Widget TextInput;
  bool checkBoxValue = false;
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
        ),
        body: new Center(
          child: new Column(
            children: <Widget>[
              TextInput,
              new Checkbox(
                  value: checkBoxValue,
                  onChanged: (bool newValue){
                    checkBoxValue = newValue;
                  }
              )
            ],
          ),
        )
      ),
    );
  }
}
```

Như bạn có thể thấy trong khi chạy code này, không có gì xảy ra khi chúng ta nhấp vào checkbox trừ khi chúng ta tải lại các widget

## Statelful Widgets
**Statelful Widgets** khắc phục các thiếu sót reloading của *Stateless Widgets*. Một **Statelful Widget** có thể được tải nhiều lần bằng cách gọi **setState()**. Điều này sẽ kích hoạt `build(BuildContext ctxt)` được gọi lại.

Việc tạo ra các **Statelful Widget**  khác với việc tạo **Stateless Widget**  vì chúng ta cần tạo 2 class, một class được lấy từ **Stateful Widget** và một class khác có nguồn gốc từ **Generic State<>**.

Trong mọi **Statelful Widget**, chúng ta ghi đè hàm **createdState(...)** để tạo instance cho stateful của chúng ta. Đây là cách code Statelful Widget trông như thế nào

```kotlin
class MyApp extends StatefulWidget {
  MyApp({this.TextInput});
  final Widget TextInput;
  MyAppState createState() => new MyAppState();
}
class MyAppState extends State<MyApp> {
  bool checkBoxValue = false;
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
        ),
        body: new Center(
          child: new Column(
            children: <Widget>[
              widget.TextInput,
              new Checkbox(
                  value: checkBoxValue,
                  onChanged: (bool newValue){
                    setState(() {
                      checkBoxValue = newValue;
                    });
                  }
              )
            ],
          ),
        )
      ),
    );
  }
}
```

Và sự sắp xếp tổng thể của hệ thống phân cấp widgets sẽ như thế nào
![](https://images.viblo.asia/7de2f366-a309-4a14-80a6-b1d4a5b01ebf.png)

# Thêm AppBar Actions
Không có ứng dụng nào hoàn thiện mà không cung cấp một số hành động **AppBar**, đôi khi bao gồm cả dấu ba chấm ở góc trên cùng bên phải.

Việc xây dựng **AppBar** cung cấp và các tùy chọn để thêm các actions để tạo các mục có thể thực hiện được. Giống như **Row/Column**, nó cần một mảng Widgets cho phép tạo nhiều mục có thể thao tác. Ví dụ, tôi thêm một vài IconButton trong code bên dưới
```kotlin
class MyApp extends StatefulWidget {
  MyApp({this.TextInput});
  final Widget TextInput;
  MyAppState createState() => new MyAppState();
}
class MyAppState extends State<MyApp> {
  bool checkBoxValue = false;
  String  actionText = "Default";
  @override
  Widget build(BuildContext ctxt) {
    return new MaterialApp(
      title: "MySampleApplication",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Hello Flutter App"),
          actions: <Widget> [
              new IconButton (
                icon: new Icon(Icons.add_comment),
                onPressed: (){
                  setState(() {
                    actionText = "New Text";
                  });
                }
              ),
              new IconButton (
                  icon: new Icon(Icons.remove),
                  onPressed: (){
                    setState(() {
                      actionText = "Default";
                    });
                  }
              ),
            ]
        ),
        body: new Center(
          child: new Column(
            children: <Widget>[
              widget.TextInput,
              new Text(actionText),
              new Checkbox(
                  value: checkBoxValue,
                  onChanged: (bool newValue){
                    setState(() {
                      checkBoxValue = newValue;
                    });
                  }
              )
            ],
          ),
        )
      ),
    );
  }
}
```

Hệ thống phân cấp Widget tổng thể sẽ trông giống như được mô tả trong hình dưới đây. Như trước đó, bất kỳ lệnh gọi nào đến **setState (...)** sẽ vẽ lại toàn bộ MaterialApp, do đó, nó quản lý để in văn bản cập nhật khi nhấn IconButtons
![](https://images.viblo.asia/1c4e9eb5-b97e-4c9a-8c4f-19f4b9dce283.png)

# Kết luận
Mình đã trình bày đủ trong phần này bằng cách sử dụng ứng dụng flutter một cách đơn giản. Chúng ta sẽ khám phá các chức năng nâng cao trong phần sau nhé :D.

Cảm ơn các bạn đã đọc đến đây!! Chúc các bạn một ngày vui vẻ.