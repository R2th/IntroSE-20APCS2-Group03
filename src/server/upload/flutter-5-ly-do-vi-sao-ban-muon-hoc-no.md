![](https://images.viblo.asia/f83e6017-b1e7-4cf4-9083-9992025e0dbb.jpg)

# Lời nói đầu:
* Chào các bạn, lại là mình đây. Không biết giới thiệu sao cho ngầu nên mình nói thẳng luôn :v. Tình hình là mình đang định học một ngôn ngữ mới, đó là Flutter. Và trước khi học một cái gì đó mới, chắc các bạn cũng giống mình là tìm ra những lý do  chúng ta cần phải học nó. Chứ không không tự nhiên học chi  :grin:  . Trong lúc lang thang thì mình vô tình đọc được một bài viết khá hay và dự định chia sẻ lại cho bạn. Đó là lý do vì sao có bài viết này :D.
*  Google đã giới thiệu Flutter vào Google I/O 2017 - một open source mới cho việc tạo ra các ứng dụng Mobile. Điều đặc biệt của Flutter là nó được sinh ra nhằm mục đích *tạo ra các ứng dụng mobile chạy trên đa nền tảng (cross-platform mobile applications)* với UI đẹp và bắt mắt. Cách design của Flutter thì tương tự với Web Application, vì thế chúng ta có thể nhìn thấy nhiều điểm tương đồng với HTML/CSS.
*  Đây là lời hứa của google khi ra mắt Flutter :

```
Flutter makes it easy and fast to build beautiful mobile apps.
```
Tạm dịch: *Flutter giúp xây dựng các ứng dụng di động đẹp mắt và dễ dàng.*

* Nghe có vẻ hay, nhưng với mình thì chưa đủ thuyết phục để học nó. Chúng ta có nhiều sự lựa chọn - Xamarin, PhoneGap, Ionic... đặc biệt là React Native rất phổ biến tại Việt Nam. Chúng ta đều biết rằng có nhiều lựa chọn và mỗi thứ đều có ưu và nhược điểm riêng. Với Flutter thì đó là gì ?

# Nội dung:
### Tại sao là Flutter?
* Có lẽ chúng ta sẽ tò mò và tự hỏi bản thân rằng:  "Flutter có gì hay? Làm thế nào nó hoạt động? Flutter khác với React Native như thế nào?"
* Mình sẽ không nói về kỹ thuật vì mình vẫn chưa có chuyên môn về Flutter. Những gì mình biết về Flutter ngắn gon là nó cho phép chúng ta tạo một ứng dụng mobile có thể chạy trên cả Android và IOS. Code được viết bằng [Dart](https://dart.dev/) , một ngôn ngữ được phát triển bởi Google. Và sự khác biệt lớn nhất ở đây với Kotlin là các View sẽ được lồng nhau dưới 1 tree và không còn file layout xml nữa :

```
import 'package:flutter/material.dart';

class HelloFlutter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: "HelloFlutter",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("HelloFlutter"),
        ),
        body: new Container(
          child: new RaisedButton(onPressed: _handleOnPressed),
        ),
      ),
    );
  }
}
```
Như chúng ta có thể thấy, một layout được build từ các View components(Widgets) lồng với nhau. Component chính và cũng là lớn nhất bọc bên ngoài là *MaterialApp*, bên trong nó là cấu trúc main layout là *Scaffold*. Và bên nó chúng ta có AppBarr (giống như Toolbar trong Android) và vài các *Container* như là các layout mẹ (tương tự LinearLayout, ConstraintLayout, ... ở Android). Cuối cùng bên trong các layout mẹ này là các Widget nhỏ như Text, Button,...

Một chút code để chúng ta có cái nhìn sơ qua về cách hoạt động của Flutter vậy là đủ :innocent: . Bây giờ là phần chính 
## 1. Hot reload:
* Bắt đầu với một ứng dụng nhỏ như sau. Chúng ta có 3 button, khi click vào những button nàu thì text sẽ bị đổi màu.
![](https://images.viblo.asia/b13a0675-beae-4594-b54d-164424555cf8.gif)
Bây giờ mình sẽ biểu diễn tính năng thú vị nhất - **Hot reload**. Nó cho phép chúng ta rebuild lại ững dụng của mình ngay lập tức như thể nó chỉ là một trang web chứ không phải app. Hãy xem màn trình diễn dưới đây : 

![](https://images.viblo.asia/93903ed7-ae86-47fb-a549-39a59bd0bab1.gif)

* Chúng ta đã làm gì ở đây ? Thay đổi vài thứ trong code (text của button), sau đó click vào *"Hot-Reload"* (ở trên đỉnh của IntelliJIDE) và chúng ta đã có thể thấy kết quả của sự thay đổi trong vài dây. Thật tuyện phải không? Chắc những ai làm app Android đều chán ngán cái cảm giác khi phải chờ ứng dụng build lại trong một thời gian dài nhỉ.
* **Hot reload** không chỉ nhanh mà nó còn thông minh. Nếu chúng ta thay đổi điều gì đó trong UI khi thao tác với app (trong trường hợp này là đổi màu text khác so với màu chúng ta đã set ban đầu ), sau khi rebuild những dữ liệu đó vẫn còn lưu và hiển thị lại. Hãy đến việc khi chúng ta đã fill 1 EditText nhưng vì lý do gì đó mà phải build lại app, sau khi build thì text đã fill vào EditText đó vẫn được giữ lại, thật tuyệt nhỉ. :sunglasses:

## 2. Full set of (Material Design) widgets:
* Một điều tuyệt vời khác về Flutter là nó có một danh mục rất phong phú về các thành phần UI tích hợp. Có 2 bộ widgets rất phổ biến khi build App là - [Material Design](https://flutter.dev/docs/development/ui/widgets/material)  và  [Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino) mà bất cứ developer nào cũng biết trên mỗi nền tảng.  Và bạn ở Flutter chúng ta có thể Implement bất cứ thứ gì mà chúng ta muốn từ 2 bộ widget này.  Nếu muốn tạo một FloatingActionButton, đơn giản thôi : 

![](https://images.viblo.asia/ed1d2a6e-52e3-451c-981f-5fd15b3d9ce5.gif)

Và điều tuyệt vời nhất ở đây là chúng ta có thể implement tất cả các Widge trên mọi nền tảng. Nếu chúng ta triển khai một số Widge Material Design hoặc Cupertino, nó sẽ giống nhau trên mọi thiết bị Android và iOS. Không còn phải lo bị bắt bug khác nhau trên các nên tảng =)) .

## 3. Everything is a Widget

* Như chúng ta đã thấy trong ảnh gif trước, việc tạo UI rất dễ dàng. Nó có thể nhờ vào nguyên tắc cốt lõi của Flutter, nơi mọi thứ đều là một widget. Class App của chúng ta là một widget (MaterialApp), toàn bộ cấu trúc bố cục là một widget (Scaffold) và về cơ bản, mọi thứ đều là một widget (AppBar, Drawer, SnackBar). Nếu muốn mọi thứ được hiển thị ở giữa ? Gói nó (Cmd / Ctrl + Enter) với widget `Center`.
![](https://images.viblo.asia/4c1a75ab-e68f-40c6-beba-d2a375695a85.gif)

* Việc tạo UI đơn giản chỉ là soạn một layout gồm nhiều phần nhỏ khác nhau. Một nguyên tắc cốt lõi trong việc dựng UI trong Flutter là sự **kế thừa** (over inheritance). Điều đó có nghĩa là nếu như chúng ta muốn tạo một số widget mới, thay extend từ một Widge (ở Android là kế thừ lại một View Class) thì chỉ cần tạo một Widget mới với các Widget nhỏ ở bên trong.

## 4. Different themes for Android/iOS:
* Thông thường, chúng ta muốn ứng dụng Android của mình trông khác với ứng dụng iOS. Sự khác biệt không chỉ ở màu sắc mà còn về kích thước và kiểu dáng của các view. Chúng ta có thể làm được điều này trong Flutter với các theme:

![](https://images.viblo.asia/35fa9ad8-43b3-4d74-9fdf-35da7445baf2.png)
* Hình trên mình đã đặt màu sắc và height khác nhau cho Toorbar(AppBar). Chúng ta thực hiện điều này bằng cách sử dụng parameter `Theme.of(context).platform` để có UI theo platform mới device được build:

```
import 'package:flutter/material.dart';

class HelloFlutter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: "HelloFlutter",
        theme: new ThemeData(
            primaryColor:
                Theme.of(context).platform == TargetPlatform.iOS
                    ? Colors.grey[100]
                    : Colors.blue),
        home: new Scaffold(
          appBar: new AppBar(
            elevation:
                Theme.of(context).platform == TargetPlatform.iOS
                    ? 0.0
                    : 4.0,
            title: new Text(
              "HelloFlutter",
            ),
          ),
          body: new Center(child: new Text("Hello Flutter!")),
        ));
  }
}
```

## 5. Many, many, many packages
* Flutter có sự hỗ trợ của nhiều gói (thư viện, giống như Gradle dependencies trong Android). Chúng ta có các gói để mở hình ảnh, thực hiện các request HTTP, chia sẻ nội dung, lưu trữ tùy chọn, truy cập cảm biến, implement Firebase và nhiều hơn nữa. Tất nhiên, mọi người đều **hỗ trợ cả Android và iOS**.

# Kết luận 
- Trên đây là một số điểm mà mình cảm thấy rất hay trong Flutter, hi vọng với bài viết này bạn có thể học được gì đó và có hứng thú với Flutter như mình :D
- Nếu có bất kỳ điều gì không ổn thì hãy để nó dưới phần bình luận. Cảm ơn bạn đã đọc đến đây. Good bye!!
## Tham khảo :
- https://flutter.dev/docs
- https://medium.com/hackernoon/flutter-5-reasons-why-you-may-love-it-55021fdbf1aa