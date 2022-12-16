![image.png](https://images.viblo.asia/47f3591a-5c7e-4c25-91b8-8b9c9f4831ff.png)

Vào ngày 3 tháng 3 năm 2021, team Flutter đã công bố Flutter 2 and Dart 2.12. Trong số đó, có một thay đổi rất quan trọng là Sound Null Safety. Bài viết này sẽ hướng dẫn cho bạn mọi thứ căn bản bạn cần phải hiểu rõ để chuyển code của mình sang Sound Null Safety.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/huong-dan-su-dung-sound-null-safety-trong-flutter-dart/)

## 1. Vậy Null Safety là gì?

Null Safety, còn được biết đến với tên gọi nnbd (Non Nullable By Default), là sự đảm bảo của ngôn ngữ rằng trừ khi lập trình viên chỉ định, không biến nào có thể là null. Nếu lập trình viên đặc biệt tạo một biến "nullable", trình phân tích và biên dịch đảm bảo rằng lập trình viên sẽ xử lý các trường hợp mà giá trị của biến có thể là null.

## 2. Nhưng tại sao chúng ta cần dùng nó?

Nếu bạn đã từng viết code Dart, tôi rất tự tin rằng bạn đã gặp phải `the method '.someMethod()' was called on null `hoặc một cái gì đó tương tự vậy và bạn không phải là người duy nhất đâu.

Trên thực tế, ngay cả nhóm flutter cũng phải đối mặt với vấn đề này rất nhiều. Nếu bạn đọc [Dart 2.12 release blogpost](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87) , bạn sẽ thấy điều sau đây:

> The core challenge prior to null safety was that you couldn’t tell the difference between code that anticipated being passed null and code that didn’t work with nulls. A few months ago we discovered a bug in the Flutter master channel where various flutter tool commands would crash on certain machine configurations with a null error: The method '>=' was called on null. The underlying issue was code like this:


(Tạm dịch: Thách thức chính trước khi có null safety là bạn không thể phân biệt được code của chúng ta có null hay không. Một vài tháng trước, chúng tôi đã phát hiện ra lỗi trong kênh chính của Flutter nơi các lệnh của tool flutter khác nhau sẽ gặp sự cố trên một số cấu hình máy nhất định với lỗi null:  `The method '>=' was called on null`. Vấn đề cơ bản là code như thế này:)

```
final int major = version?.major;
final int minor = version?.minor;
if (globals.platform.isMacOS) {
  // plugin path of Android Studio changed after version 4.1.
  if (major >= 4 && minor >= 1) {
  ...
```

Sound Null safety giúp chúng ta tránh được các lỗi xảy ra mà không lường trước được, trường hợp điển hình và dễ thấy nhất đó là giá trị của 1 biến bị null nhưng thực tế thì chúng không nên null trong lúc chương trình đang chạy.

## 3. Null types (Các kiểu nullable):

Nói một cách đơn giản, các kiểu nullable cho phép bạn định nghĩa biến này có thể có giá trị null. Bạn có thể khai báo giá trị nullable bằng cách thêm `?`, ví dụ sau sẽ giúp bạn hiểu rõ hơn:

```
int x = 0; //Can never be null
int? y = 1; //Can have null value
int? z; //Can have null value, currently has null value
x = null; //This line will throw an error as x can never be null
y = null;
z = 2;
z = null;
```

Giả sử bạn đang tạo một lớp có tên là `Game` trong đó biến `title` không bao giờ là null nhưng biến `edition` thì có thể. Chúng ta có thể viết nó như thế này.

```
class Game {
  final String title = "Five Nights at Freddy's";
  int? edition;
}
```

## 4. Null checking (Kiểm tra Null):

Giả sử chúng ta muốn lấy phiên bản của trò chơi và lưu trữ nó trong một biến khác.

```
int gameEdition = Game().edition;
```

Nhưng trình biên dịch sẽ báo lỗi kiểu `int? type of int? cannot be assigned to a variable of type int bởi vì edition` có thể là null nhưng `gameEdition` thì không.

Vì vậy, chúng ta PHẢI thực hiện kiểm tra null. Chúng ta kiểm tra xem giá trị có là null hay không, nếu nó không phải là null, chúng ta sử dụng giá trị đó để thực hiện tiếp việc ta muốn

```
final Game game = Game();
if (game.edition != null) {
  int gameEdition = game.edition;
else {
  debugPrint("Game Edition is null")
}
```

## 5. Cẩn thận với biến kiểu var và dynamic

Biến `dynamic` phá vỡ null safety vì biến dynamic có thể là null mà không cần phải chỉ định thêm  `?`. Thí dụ:

```
dynamic x;
int y = x; //Will compile but throw an error at runtime
print(y.toString()); //Will compile but throw an error at runtime
```

Tương tự như vậy nếu bạn khai báo một biến với var mà không khởi tạo nó và không cung cấp một kiểu rõ ràng, biến đó sẽ suy ra kiểu dynamic và phá vỡ toàn bộ null safety.

## 6. Required and Default variables (Các biến bắt buộc và mặc định):

Các biến bắt buộc và mặc định‌‌Bạn không muốn tiêu đề Trò chơi được đặt mặc định thành “Năm đêm ở Freddy’s”. Bạn muốn tiêu đề phải được thêm vào khi có bất kỳ Trò chơi mới nào được đăng ký. Chúng ta có thể làm điều đó bằng cách sử dụng các tham số của hàm tạo:

```
class Game {
  final String title;
  final String? description;
  int? edition;
  
  Game(this.title);
}
```

Nhưng ngoài ra chúng ta có thêm 1 tham số nữa đó là description, là một biến final, chúng ta cần khởi tạo biến đó nhưng là một tham số tùy chọn. Ngoài ra, bạn muốn các tham số được truyền vào theo tên tương ứng của nó vì vậy bạn đặt tất cả chúng là các tham số tùy chọn như sau:

```
class Game {
  final String title;
  final String? description;
  int? edition;
  
  Game({this.title, this.description}); //This will throw an error
}
```

Bây giờ, `title` là biến optional, nó có thể là null, nhưng theo khai báo của chúng ta, nó không thể là null. Vì vậy, chúng ta cần đặt tham số `title` là một yêu cầu bắt buộc phải truyền vào khi khởi tạo bằng cách sử dụng từ khóa `required`.

```
class Game {
  final String title;
  final String? description;
  int? edition;
  
  Game({required this.title, this.description});
}
```

Bạn quyết định `description` ít nhất nên có một cái gì đó. Vì vậy, bạn cung cấp cho nó một giá trị mặc định.

```
class Game {
  final String title;
  final String? description;
  int? edition;
  
  Game({required this.title, this.description = "New Cool Game"});
}
```

## 7. Làm việc với "!"

Nếu bạn chắc chắn rằng một biến nullable sẽ không null trong thời gian chạy, bạn có thể thêm ! để biểu thị điều đó. Thí dụ:

```
int? x;
x = 5;
int y = x; //Will throw type int? cannot be assigned to a variable of type int
int y = x!; // Will work but you have to me COMPLETELY sure
```

## 8. late keyword

Bạn quyết định thêm trường `author` và bạn khá chắc chắn rằng trò chơi phải có Tác giả nhưng không có thứ gọi là Tác giả mặc định. Ngoài ra, khi tìm kiếm trò chơi, bạn không cần hiển thị tác giả, chỉ tại trang chi tiết bạn mới cần hiển thị tác giả. Điều gì sẽ xảy ra nếu có một cách để khởi tạo một biến khi chúng ta muốn mà không làm nó null? `late` keyword là thứ chúng ta đang mong đợi. Bạn có thể trì hoãn việc khởi tạo một biến với `late`. Đó là một công cụ RẤT mạnh mẽ. Chúng ta có thể thay đổi code của mình để sử dụng `late` như sau:

```
class Game {
  final String title;
  final String? description;
  late String author;
  int? edition;
  
  Game({required this.title, this.description = "New Cool Game"});
}
```

Hãy nhớ rằng Uncle Ben - một nhân vật trong phim Spider man (phim Spider man   này được đóng bởi diễn viên Tobey Maguire) đã từng nói:

> With great power comes great responsibility

(Tạm dịch: Sức mạnh to lớn đi kèm với trách nhiệm lớn.)

`late` giống như một lời hứa với trình biên dịch rằng giá trị sẽ được thêm vào trong thời gian chạy trước khi sử dụng. Ví dụ:

```
class Game {
  final String title;
  final String? description;
  late String author;
  int? edition;
  
  Game({required this.title, this.description = "New Cool Game"});
}
void main() {
    Game game = Game(title: "Five Nights at Freddy's");
    print(game.author); //This won't give you any warning but will throw a LateInitializationException during runtime and crash your app
}
```

Hiện tại, không có cách nào để kiểm tra xem một biến late có được khởi tạo hay không vì biến late được xem như đã khởi tạo ở lần khai báo đầu tiên. Bạn PHẢI đảm bảo một giá trị của biến late được gán TRƯỚC KHI sử dụng nó. Vì vậy, cách chính xác để làm điều đó sẽ là:

```
class Game {
  final String title;
  final String? description;
  late String author;
  int? edition;
  
  Game({required this.title, this.description = "New Cool Game"});
}
void main() {
    Game game = Game(title: "Five Nights at Freddy's");
    game.author = "Scott Cawthon";
    print(game.author); //Will print "Scott Cawthon"
}
```

Nói chung tôi không thích sử dụng late như thế này. Có một biến final nullable sẽ dễ làm việc hơn nhiều và ít bị lỗi hơn.

## 9. late final variables

Nếu bạn nghĩ rằng `late` là superman thì `late final` chính là Godzilla. `late final` không phải là một từ khóa mới, nó chỉ là biến `late` và `final` nhưng nó cung cấp một số lựa chọn thiết kế CỰC KỲ mạnh mẽ.‌‌Nếu bạn có một listview hiển thị danh sách trò chơi với hàng triệu item thì thật là ngu ngốc khi tải mọi hình ảnh của trò chơi cùng một lúc. Chúng ta có thể tải hình ảnh đó khi item được hiển thị trên màn hình. Thông thường, chúng ta thực hiện lazy loading như thế này:

```
class Game {
  final String title;
  final String? description;
  late String author;
  int? edition;
  File? _image;
  
  Game({required this.title, this.description = "New Cool Game"});
  File getImage() {
    if (_image == null) {
      _image = File.fromUri(//some uri);
    }
    return _image;
  }
}
void main() {
    Game game = Game(title: "Five Nights at Freddy's");
    game.author = "Scott Cawthon";
    print(game.author); //Will print "Scott Cawthon"
}
```

Có 3 vấn đề ở đây:

* `image` có thể là biến là nullable.
* `image` không phải là biến final. Bạn không muốn ai đó ghi đè lên poster trò chơi của mình.
* Hãy sử dụng Getters trong class.

Cấu trúc lại như sau:

```
class Game {
  final String title;
  final String? description;
  late String author;
  int? edition;
  late final File image = File.fromUri(//some uri);
  
  Game({required this.title, this.description = "New Cool Game"});
}
void main() {
    Game game = Game(title: "Five Nights at Freddy's");
    game.author = "Scott Cawthon";
    print(game.author); //Will print "Scott Cawthon"
}
```

Bây giờ chỉ khi `game.image` được gọi, nó sẽ tải hình ảnh, làm cho biến `image` thành biến final và lưu nó trong bộ nhớ.‌‌Một trường hợp sử dụng khác là Khởi tạo Controller trong `initState`. Thay vì

```
class SomeWidget extends StatefulWidget {
  SomeWidget({Key? key}): super(key: key);
  @override
  _SomeWidgetState createState() => _SomeWidgetState();
}
class _SomeWidgetState extends State<SomeWidget> with SingleTickerProviderMixin {
  AnimationController controller;
  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this);
  }
...
```

Chúng ta có thể làm:

```
class SomeWidget extends StatefulWidget {
  SomeWidget({Key? key}): super(key: key);
  @override
  _SomeWidgetState createState() => _SomeWidgetState();
}
class _SomeWidgetState extends State<SomeWidget> with SingleTickerProviderMixin {
  late final AnimationController controller = AnimationController(vsync: this);
...
```

Về cơ bản, bạn có thể thực hiện bất kỳ hoạt động tốn kém với `late` và sử dụng `final` để nó tồn tại vĩnh viễn

## Tóm lại

Tôi hy vọng bài viết này đã giúp bạn hiểu được thêm Sound Null Safety trong Dart.

‌‌Bài viết được dịch từ: [A Real Life Guide To Dart Sound Null Safety](https://blog.rideapp.in/a-real-life-guide-to-sound-null-safety-in-dart-a33283678068)