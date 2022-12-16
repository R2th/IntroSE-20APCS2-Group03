![](https://images.viblo.asia/50305b90-afaf-4a6f-9e8d-8d88ecdb7c0f.png)
### 0. Lập trình bất đồng bộ là gì?

Lập trình bất đồng bộ là kiểu lập trình cho phép bạn thực hiện riêng một công việc  nào đó và nó chạy độc lập với thread chính. Khi công việc đó được hoàn thành, nó sẽ thông báo với thread chính của ứng dụng. Trong Flutter, bạn hoàn toàn có thể thực hiện việc lập trình bất đồng bộ để xử lý những tác vụ riêng mà bạn mong muốn mà không gây cản trở đến việc running app.

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu lập trình bất đồng bộ trong Dart & Flutter. 

### 1. Asynchronous Programming (Lập trình bất đồng bộ):
- Lập trình bất đồng bộ (Asynchronous Programming) giúp bạn có thể thực thi nhiều action trong cùng 1 lúc, khác với việc phải thực hiện chúng theo tuần tự (xem hình phía dưới). Lập trình đồng bộ (Synchronous Programming) có thể tạo ra sự chậm trễ và khiến cho ứng dụng phản hồi kết quả lâu hơn. Tuy nhiên, việc lập trình bất đồng bộ cũng mang lại sự đánh đổi đôi chút, đặc biệt là hiệu năng ứng dụng của bạn. Do đó, chúng ta không nên sử dụng lập trình bất đồng bộ cho tất cả các trường hợp.

- Ngôn ngữ Dart đã cung cấp cho Flutter rất nhiều "đồ chơi" xịn xò để đáp ứng việc xây dựng những ứng dụng hiện đại hiện nay, và khả năng lập trình bất đồng bộ là một trong số đó. Mặc dù Dart chạy single-threaded, nhưng nó có thể kết hợp với các code khác nhau trong các thread chạy song song, riêng biệt.

### 2. Tại sao chúng ta nên sử dụng lập trình bất đồng bộ (Asynchronous Programming):
Dưới đây là một số lý do đặc biệt mà việc sử dụng lập trình bất đồng bộ mang lại cho bạn:

- Cải thiện `hiệu năng` và `khả năng phản hồi` của ứng dụng, đặc biệt khi bạn có các tác vụ lớn (long-running activities) cần tính toán và xử lý lâu mà không cần phải chặn việc running app hiện tại. Đối với tình huống này, bạn có thể thực hiện các công việc khác trong khi chờ đợi tác vụ lớn đó hoàn tất.
- Giúp bạn tổ chức code của mình đơn giản, dễ hiểu bằng cách sử dụng `async / await`. Ngôn ngữ Dart đã hỗ trợ việc lập trình đồng bất đồng bộ cho bạn trong khi các ngôn ngữ lập trình bất đồng bộ khác trước đây, bạn phải tự tạo thread riêng để xử lý việc bất đồng bộ.

### 3. Future:
Về cơ bản, cách thức hoạt động của `Future` của Dart giống với `Promise` từ ngôn ngữ Javascript. Nó bao gồm hai trạng thái: `Uncompleted` và `Completed`. `Completed Future` sẽ cho chúng ta giá trị trả về hoặc lỗi xảy ra. `Uncompleted` Future là trạng thái chờ đợi hoạt động bất đồng bộ của hàm sẽ hoàn thành hoặc xảy ra lỗi.

Future có một vài hàm khởi tạo cơ bản như sau :

- `Future.delayed()` : Dart sẽ thực hiện việc tính toán và trả ra kết quả sau khoảng thời gian delay trôi qua.
- `Future.error() `: Dart sẽ trả về lỗi sau khi thực thi việc tính toán.

### 4. Sử dụng Await/Async:
Các phương pháp tiếp cận `async` và `await` trong Dart về cơ bản giống với các phương ngữ khác nhau. Tuy nhiên, dù bạn là người mới học lập trình, hoặc bạn vừa mới tiếp cận việc lập trình bất đồng bộ, việc sử dụng async/await rất đơn giản và bạn hoàn toàn dễ dàng nắm bắt được chúng.

Async functions: Hàm bất đồng bộ cho phép bạn thực hiện các tác vụ bất đồng bộ như call API lấy dữ liệu, lấy data hoặc lữu trữ dưới local,v.v  bên trong body của hàm. Dưới đây là một minh họa về công việc bất đồng bộ chung bên dưới:

```dart
void flutter() async {
	print('Flutter Devs');
}
```

`Await expressions`: Nó giúp bạn thực hiện code bất đồng bộ như thể nó diễn ra theo từng dòng. Dưới đây là ví dụ minh họa:

```dart
void main() async {
    await flutter();
    print('flutter Devs done');
}
```

### 5. User Interaction Events (Sự kiện tương tác của người dùng):
Có thể bạn không biết, sau khi người dùng nhấn vào một nút button bất kỳ trên màn hình, Flutter sẽ thực hiện một sự kiện chạy asynchronous thông qua callback:

```dart
FlatButton(
  child: Text("Data"),
  onPressed: () {
    print("pressed button");
  },
)
```

Widget FlatButton, giống như hầu hết các widget khác của Flutter, cung cấp cho bạn một function callback là onPressed để phản hồi các thao tác của người dùng. Ở ví dụ trên, khi người dùng nhấn vào FlatButton, chúng ta in ra một đoạn log đơn giản trên terminal. Và bất cứ khi nào người dùng nhấn vào button, sự kiện onPressed sẽ được thiết lập và câu log sẽ được in ra.

### 6. Sử dụng callback trong việc thực hiện call API:
Có lẽ trường hợp nổi tiếng nhất để bạn buộc phải làm việc với lập trình bất đồng bộ đó là lấy dữ liệu từ phía backend thông qua API

```dart
import 'package:http/http.dart' as http;
final future = http.get("https://flutterdevs.com");
future.then((response) {
  if (response.statusCode == 200) {
    print("Response received.");
  }
});
```

Package http là một trong những package nổi tiếng nhất trong kho Pub của ngôn ngữ Dart. Sau khi bạn khai báo package vào file `pubspec.yaml`, sau đó bạn import nó vào nơi bạn sử dụng. 

```dart
dependencies:
  http: ^0.13.3
```

```dart

http.get("https://flutterdevs.com").then((response) {
  if (response.statusCode == 200) {
    print("Response received.");
  }
  else {
    print("Response not received");
  }
});
```

Ở ví dụ dưới đây, sau khi gọi lệnh `get()` chúng ta sẽ nhận được giá trị từ Future thông qua hàm `then()` mà không cần phải gán nó thông qua một biến nào cả. Đoạn code này đơn giản hơn và dễ đọc, dễ hiểu so với ví dụ ở trên. Ngoài ra, chúng ta còn có thể kết hợp nhiều giá trị callback như sau:

```dart
http.get("https://flutterdevs.com").then((response) {
  if (response.statusCode == 200) {
    print("Response received.");
  }
  else {
    print("Response not received");
  }
}).catchError(() {
  print("Error!");
}).whenComplete(() {
  print("Future complete.");
});
```

Ở ví dụ trên, nếu có lỗi xảy ra trong quá trình chúng ta call API thì chương trình sẽ in ra câu lệnh `print("Error!");`. Và dù có lỗi hay không lỗi thì chương trình cũng sẽ thực thi callback một khi Future đó kết thúc.

### 7. Thực hiện call API mà không sử dụng callback:
Nếu bạn không thích lập trình bất đồng bộ kiểu callback lồng nhau thì ngôn ngữ Dart đưa cho bạn một offer khác.

```dart

Future<String> getData() async {
  final response = await http.get("https://flutterdevs.com");
  return response.body;
}
    
```
Khi bạn thực hiện một lệnh gọi bất đồng bộ bên trong một hàm, chẳng hạn như `http.get()`, bạn phải chỉ định hàm đó thực hiện các chức năng bất đồng bộ bằng từ khóa async. Một công việc bất đồng bộ luôn trả về một future và bạn phải sử dụng kèm theo từ khóa await. Đối với ví dụ trên, chúng ta nhận thấy rằng lệnh gọi REST sẽ trả về kiểu dữ liệu dạng String, vì vậy chúng ta viết hàm trả về kiểu:` Future<String>`.

Bạn có thể `await` bất kỳ hàm nào trả về future. Hàm `getData()` sẽ tạm ngừng thực thi để đợi kết quả Future trả về. Để bắt lỗi khi sử dụng await, bạn có thể sử dụng `try/catch` chuẩn của Dart bao gồm:
    
```dart
Future<String> getData() async {
  try {
    final response = await http.get("https://flutterdevs.com");
    return response.body;
  } catch (excute) {
    print("Error: $excute");
  }
}
```
    
Trong trường hợp mọi thứ diễn ra suôn sẻ, bạn sẽ nhận được giá trị trả về từ Future và thực hiện tiếp việc xử lý data nhận được. Còn khi có điều gì không đúng xảy ra, thì chương trình sẽ nhảy vào block catch và cho chúng ta biết lỗi đã xảy ra là gì bằng câu lệnh log in ra.

### 8. FutureBuilder:
    
Future Builder là một Widget trong Flutter nhận vào một function Future và trả ra kết quả nhận được để người dùng render Widget tương ứng lên màn hình. Ở ví dụ bên dưới, chúng ta truyền vào một hàm getData() và hàm đó sẽ trả ra cho chúng ta một kiểu dữ liệu Future<String> khi nó thực hiện xong.


```dart
class MyStatelessWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getData(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        }
        if (snapshot.hasData) {
          return Text(snapshot.data);
        }
        return Container();
      },
    );
  }
}
    
```
Ở ví dụ trên, trong khi đợi kết quả trả về của hàm `getData()` thì màn hình sẽ hiển thị widget `CircularProgressIndicator()` (loading xoay xoay). Nếu hàm kết thúc và trả về dữ liệu thì dữ liệu sẽ được hiển thị trên màn hình và loading sẽ bị mất đi. Bạn có để ý, thuộc tính builder trả về cho chúng ta tham số có kiểu dữ liệu là `AsyncSnapshot` để giúp bạn kiểm tra status của Future. Nếu hàm của bạn xảy ra lỗi hoặc không rơi vào bất kỳ trường hợp nào bên trên, nó sẽ hiển thị 1 Container rỗng.

FutureBuilder còn có thể sử kết hợp với stateful widget và theo tôi, bạn nên sử dụng theo cách này vì bạn có thể lợi dụng hàm initState() để gọi hàm getData().

```dart

class MyStatefulWidget extends StatefulWidget {
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  Future<String> _dataFuture;
  @override
  void initState() {
    super.initState();
    _dataFuture = getData();
  }
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _dataFuture,
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        }
        if (snapshot.hasData) {
          return Text(snapshot.data);
        }
        return Container();
      },
    );
  }
}
```
    
### 9. StreamBuilder:
Sream giống như một luồng sự kiện. Thông tin hoặc sự kiện lỗi đi về một phía và chúng được chuyển tải đến những nơi lắng nghe các thay đổi được thêm vào luồng đó.

```dart

class MyStatelessWidget extends StatelessWidget {
  final Stream<String> dataStream;
  const MyStatelessWidget({Key key, this.dataStream}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<ConnectionState>(
      stream: dataStream,
      builder: (BuildContext context, AsyncSnapshot<ConnectionState> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        }
        if (snapshot.hasData) {
          return Text(snapshot.data);
        }
        return Container();
      },
    );
  }
}
```
### Kết Luận
Trong bài viết, tôi đã giải thích về Lập trình bất đồng bộ trong Dart & Flutter của cấu trúc cơ bản trong Flutter; bạn có thể sửa đổi code theo mong muốn của bạn và chạy thử. Tôi hy vọng bài viết này sẽ cung cấp cho bạn đầy đủ thông tin hữu ích.

### Tham khảo
https://medium.com/flutterdevs/exploring-asynchronous-programming-in-dart-flutter-25f341af32f