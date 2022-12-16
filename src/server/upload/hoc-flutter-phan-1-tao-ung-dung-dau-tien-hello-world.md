# Giới thiệu
Như vậy là sau khi tìm hiểu về những lý do vì sao nên học Flutter [ở đây ](https://viblo.asia/p/flutter-5-ly-do-vi-sao-ban-muon-hoc-no-gDVK2n2nKLj) thì mình đã bắt đầu *Tầm sư học đạo* để có thể trở thành một Flutter dev chân chính. Nói cho sang vậy thôi chứ mình chỉ mò lên [Docs](https://flutter.dev/docs) của Flutter đọc thôi :joy: . Sau một thời gian tập đọc đánh vần các kiểu cũng biết khá nhiều và quyết định áp dụng những gì đã học vào một project nhỏ với mục đích sharing với mọi người - những ai có ý định học Flutter sẽ dễ dàng tiếp cận hơn :D thông qua áp dụng vào thực tế. 

Bài viết sẽ đi từ lúc khởi tạo project - giải thích về những components cơ bản nhất đến việc sử dụng nó trong thực tế. Nếu biết những component nào rồi thì các bạn có thể lướt qua nhé. Vì mới học nên mình sẽ tạm thời bỏ qua các convension của Flutter trong code cho dễ hiểu. 

Giới thiệu vậy đủ rồi, chúng ta bắt đầu thôi!
# Nội dung

## 1. Set-up môi trường
Đầu tiên chúng ta phải tạo môi trường để code Flutter, có 2 editor mà được mọi người sử dụng phổ biến đó là **Visual Studio Code** và **Android Studio** . Về bản thân mình thì xuất thân là 1 Android dev nên mình sẽ code trên Android Studio cho tiện vì có sẵn bộ máy ảo của nó. Chuẩn bị công cụ nào (tùy vào hệ điều hành mà các file download sẽ khác nhau):
* Đầu tiên phải có Android Studio. Chúng ta có thể download  [ở đây ](https://developer.android.com/studio) .
* SDK của Flutter thì ở [đây](https://flutter.dev/docs/get-started/install) . 

Với Android studio thì tiến hành cài đặt như bình thường, còn Sdk của Flutter thì chỉ cần giải nén vào một file nào đó chúng ta sẽ dùng sau .  Sau khi download và cài đặt giải nén các thứ  thì bây giờ hãy mở Android Studio lên và tiến hành các config dưới đây: 
1. Vào **File** -> **Settings...**
2. Chọn **Plugin** -> search với từ khóa "flutter"  và install như hình dưới đây 

![](https://images.viblo.asia/69173c84-a0fb-4d83-9c26-bd933aa48750.jpg)


3. Search thêm "dart" tại mục số (2) trong hình và install plug Dart tương tự.
4. Chọn **Apply** -> **OK**
5. Khởi động lại Android Studio.

Và bây giờ chúng ta đã có thể tạo mới một project Flutter :
1. Vào **File** -> **New** -> **New Flutter Project**   (nó ở dòng thứ 2) -> Chọn cái đầu tiên là **Flutter Application** -> **
** , chúng ta sẽ được một bảng tùy chọn như này : 

![](https://images.viblo.asia/a28294f5-0001-4d42-ad15-56b2ca0bec3a.png)

Cần phải lưu ý ở chỗ **Flutter SDK path** , các bạn nhớ úc nãy chúng ta đã download file SDK và giải nén nó. Đây là lúc cần dùng, hãy chọn icon [...] và trỏ tới SDK flutter mà chúng ta đã giải nén lúc nãy. Những field còn lại thì tự field theo ý mình thôi.

Và như vậy là đã set up xong, chúng ta cùng bắt đầu viết một project nào !

## 2. Build ứng dụng Flutter đầu tiên : Hello world 

Sau khi hoàn thành xong mục 1, ở file main.dart, chúng ta sẽ thấy các line code sample của google, thôi thì tranh thủ chạy thử xem họ code những gì nào. Nhìn trên tool bar thì chúng ta sẽ thấy được một giao diện như sau:

![](https://images.viblo.asia/341498fa-52aa-46f7-9586-99bd2757f2fe.png)

Nếu đã quen với Android studio thì có thể nhanh chóng hiểu các tác dụng của những option này, từ trái qua phải lần lượt sẽ là các chức năng cần chú ý  :
* Target selector: Chọn device để chạy
* Config selector: Chọn file chứa cofig code để chạy
* Run, Debug
* Hot reload: khi có chỉnh sửa bất cứ điều gì trong code, chúng ta có thể dùng Hot-reload để update những thay đổi mà không cần phải chạy là toàn bộ ứng dụng tốn thời gian, ngoài ra dùng Hot-reload thì những thao tác trên ứng dụng vẫn được dữ lại.
* Stop : Dừng ứng dụng đang chạy.



Nhìn qua góc trái của Editor chúng ta sẽ thấy được các tổ chức file của app như sau :

![](https://images.viblo.asia/e2f04cae-e1c8-43d0-b23d-81be3dbc605b.png)

Ở đây sẽ chứa rất nhiều các file, nhưng trong khuôn khổ bài viết, chúng ta chỉ cần chú ý đến các file sau :
* android/ ios : 2 folder này sẽ chứa code native. Trong khi làm việc, chúng ta sẽ nhận thấy khó vài trường hợp Flutter không thể giải quyết tất cả các bài toàn mà phải nhờ đến native code.
* lib: đây là folder chính chúng ta sẽ làm việc, nơi này sẽ chứa gần như tất cả source code của 1 project flutter sẽ gồm các file source dart, các pakage.
* test: nơi chúng ta tạo ra các unit-test case.
* pubspec.yaml : file này là nơi khai báo các thư viện, config hệ thống,... Nếu các các bạn đã từng làm việc với native Android thì nó sẽ tương tự như file gradle.
* Ngoài ra khi làm chúng ta có thể tạo thêm file như assets để chứa các resource như ảnh, icon, ...

Ok. thử chạy code sample mà Google đã viết sẵn thôi, nhìn qua máy ảo chúng ta sẽ được một giao diện như này: 

![](https://images.viblo.asia/fc99fa36-930e-4fbd-9e0d-2ee2dbc2e0b1.png)

Nhìn sample code khá khó hiểu phải không? xóa nó đi và viết thử chương trình "Hello world" đã đi vào huyền thoại trước đã (yaoming). Xóa hết code ở main.dart và thay thế bằng đoạn code dưới đây.

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```
Chạy lên và chúng ta sẽ được giao diện như thế này : 
![](https://images.viblo.asia/6b0ba8b0-6bba-45d7-b0b1-33fd24f43538.png)

### Phân tích :
* Đầu tiên, chúng ta cần phải làm quen với một khái niệm mới được sử dụng trong Flutter, đó là **Widget** . Ý tưởng chính của Widget là xây dựng lên những giao diện chúng ta nhìn thấy thông qua các trạng thái, cấu hình mà nó định nghĩa. Có vẻ hơi rối đúng không? Như chúng ta thấy ở trên đoạn code `  child: Text('Hello World')` , `Text` ở đây chính là một Widget, trong này nó định nghĩa ra một string `'Hello World'` mà chúng ta có thể nhìn thấy. Như ở trong android native thì một Widget tương tự như là một View.
* method **main()** : Đây là nơi bắt đầu của ứng dụng, nơi thực thi tất cả những gì được tạo ra như method, biến, hàm ... Chắc các bạn cũng khá quen với method này rồi. Nó sử dụng ký hiệu arrow (=>). Sử dụng ký hiệu mũi tên cho các hàm hoặc phương thức một dòng. Sau dấu (=>) là những gì method main chạy và trả về . 
* Trong example trên `MyApp`  đang kế thừa từ  `StatelessWidget`, biến bản thân MyApp thành một Widget. Trong Flutter thì hầu như tất cả mọi thứ đều là Widget, bao gồm cả alignment, padding, và layout. 
    * `StatelessWidget` là widget không có state. Nó không chấp nhận sự thay đổi bên trong nó. Còn đối với sự thay đổi từ bên ngoài (widget cha) thì nó sẽ thụ động thay đổi theo. Nó chỉ đơn thuần là nhận dữ liệu vào và hiển thị, chúng ta không thể thay đổi bất cứ điều gì, muốn tạo một variable cũng phải là final (ko được thay đổi). Bản thân nó cũng không có hàm createState mà thay vào đó là hàm build(BuildContext)
* `MaterialApp` là điểm khởi đầu của ứng dụng, nó cho Flutter biết rằng chúng ta sẽ sử dụng các thành phần Material và tuân theo thiết kế material design trong ứng dụng của mình. Các định nghĩa ở đây bao gồm màu sắc chủ đạo, dartThem, locale, navigation...
* `Scaffold` cho phép chúng ta triển khai các widget ứng dụng chuẩn material mà hầu hết các ứng dụng đều có. Chẳng hạn như AppBar, BottomAppBar, FloatingActionButton, BottomSheet, Drawer, Snackbar. Scaffold được thiết kế để trở thành vùng chứa cấp cao nhất cho MaterialApp mặc dù không cần thiết phải lồng một Scaffold.
* `Center` : như cái tên, nó đưa mọi thứ nằm bên trong nó vào giữa màn hình.
* `Text` : Hiển thị text, chúng ta có thể thêm slyle cho text này với thuộc tính `TextStyle` .
* Và cuối cùng khi lồng các Widget với nhau hãy chú ý cần phải khai báo đúng những params cho nó với các định nghĩa param như :  `title:`, `body:`, ... tương ứng. Sẽ có lỗi compiler nếu thiếu những định nghĩa này.

Đây mới chỉ là những Widget căn bản. Còn rất nhiều Widget mà chúng ta sẽ học trong qua trình build một dự án, mình sẽ không liệt kê toàn bộ chúng mà sẽ giải thích qua nhứng áp dụng thực tế vào code như trên.

# Kết luận
* Trên đây là bài đầu tiên trong series tự học Flutter của mình. Thành thật mà nói thì mình học Flutter cũng chưa lâu, và vẫn còn học tiếp. Thông qua quá trình học hỏi và làm dự án sẽ hấp thụ được nhiều điều và mình sẽ tổng hợp những gì đã học trong series này. Hi vọng qua những bài viết về series sẽ giúp các bạn dễ dàng tiếp cận với Flutter hơn.
* Code Flutter thì dựa trên ngôn ngữ Dart, các bạn có thể học song song ngôn ngữ Dart với series này tại [đây](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-1-07LKX9eEZV4) để đẩy nhanh quá trình. Có gì góp ý xin hãy để nó dưới phần comment nhé :raised_hand_with_fingers_splayed: . 

## Tham khảo
* https://flutter.dev/docs

## Update:
Các bạn đón xem các phần tiếp theo ở đây nha :D
* Phần 2 - Cơ bản về Widget : https://viblo.asia/p/hoc-flutter-phan-2-co-ban-ve-widgets-1Je5E9jA5nL