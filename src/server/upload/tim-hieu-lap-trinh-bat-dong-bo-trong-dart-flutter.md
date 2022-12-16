![image.png](https://images.viblo.asia/9d4e3131-8975-4f4a-810a-14a05ff64b0a.png)

Bài viết được dịch và viết lại từ ngữ cho dễ hiểu từ nguồn bài gốc: [Exploring Asynchronous Programming In Dart & Flutter](https://medium.com/flutterdevs/exploring-asynchronous-programming-in-dart-flutter-25f341af32f)

Lập trình bất đồng bộ là kiểu lập trình cho phép bạn thực hiện riêng một công việc  nào đó và nó chạy độc lập với thread chính. Khi công việc được hoàn thành, nó sẽ thông báo với thread chính của ứng dụng. Trong Flutter, bạn hoàn toàn có thể thực hiện việc lập trình bất đồng bộ để xử lý những tác vụ riêng mà không cản trở đến việc running app.

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu lập trình bất đồng bộ trong Dart & Flutter. Chúng ta sẽ khám phá sâu hơn cách các asynchronous code patterns hỗ trợ trong việc làm "cầu nối" giao tiếp giữa UI và các tác vụ riêng biệt.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/lap-trinh-bat-dong-bo-trong-dart-flutter/)

## 1. Asynchronous Programming (Lập trình bất đồng bộ):

Lập trình bất đồng bộ (Asynchronous Programming) giúp bạn có thể thực hiện nhiều action trong cùng 1 lúc mà không cần theo tuần tự (xem hình phía dưới). Lập trình đồng bộ (Synchronous Programming) mất khoảng thời gian lâu hơn để ứng dụng phản hồi kết quả. Tuy nhiên, việc lập trình bất đồng bộ cũng có một số đánh đổi, đặc biệt là phần hiệu năng ứng dụng. Do đó, chúng ta không nên sử dụng lập trình bất đồng bộ trong tất cả các trường hợp.

![image.png](https://images.viblo.asia/0a125539-0c9c-45fe-b682-2c2a5efdeade.png)

Ngôn ngữ Dart đã cung cấp cho Flutter rất nhiều "đồ chơi" xịn xò để xây dựng nên những ứng dụng hiện đại, và khả năng lập trình bất đồng bộ là một trong số đó. Mặc dù Dart chạy single-threaded, nhưng nó có thể kết hợp với các code khác trong các thread chạy song song, riêng biệt.

## 2. Tại sao chúng ta nên sử dụng lập trình bất đồng bộ (Asynchronous Programming):

Dưới đây là một số điều đặc biệt mà lập trình bất đồng bộ mang đến cho bạn:

* Cải thiện hiệu năng và khả năng phản hồi của ứng dụng, đặc biệt khi bạn có các tác vụ lớn (long-running activities) cần tính toán và xử lý mà không phải chặn việc running app hiện tại. Đối với tình huống này, bạn có thể thực hiện công việc khác trong khi chờ đợi tác vụ đó hoàn tất.
* Giúp bạn tổ chức code flow của mình đơn giản, dễ hiểu bằng cách sử dụng mỗi `async` / `await`. Ngôn ngữ Dart đã hỗ trợ việc lập trình đồng bất đồng bộ cho bạn. Trong khi các ngôn ngữ lập trình bất đồng bộ trước đây, bạn phải tự tạo thread riêng theo tiêu chuẩn được đặt ra.

## 3. Future:

Về cơ bản, cách thức hoạt động của `Future` của Dart giống với `Promise` từ ngôn ngữ Javascript. Nó bao gồm hai trạng thái: Uncompleted và Completed. Completed Future sẽ cho chúng ta giá trị trả về hoặc lỗi xảy ra. Uncompleted Future là trạng thái chờ đợi hoạt động bất đồng bộ của hàm sẽ hoàn thành hoặc xảy ra lỗi.

Future có một vài hàm khởi tạo cơ bản, dưới đây là một số loại mình thường dùng:

* Future.delayed(): Dart sẽ thực hiện việc tính toán và trả ra kết quả sau khoảng thời gian delay trôi qua.
* Future.error(): Dart sẽ trả về lỗi sau khi thực thi việc tính toán.

## 4. Sử dụng Await/Async:

Các phương pháp tiếp cận async và await trong Dart về cơ bản giống với các phương ngữ khác nhau. Tuy nhiên, dù bạn là người mới học, hoặc vừa mới tiếp cận lập trình bất đồng bộ, việc sử dụng async/await rất đơn giản và bạn hoàn toàn dễ dàng nắm bắt chúng.

Async functions: Hàm bất đồng bộ cho phép bạn thực hiện các tác vụ bất đồng bộ như call API lấy dữ liệu, lấy data hoặc lữu trữ dưới local,v.v  bên trong body của hàm. Dưới đây là một ví dụ minh họa:

```
void flutter() async {
	print('Flutter Devs');
}
```

Await expressions: Nó giúp bạn thực hiện code bất đồng bộ như thể nó diễn ra theo từng dòng. Dưới đây là ví dụ minh họa:

```
void main() async {
    await flutter();
    print('flutter Devs done');
}
```

## 5. User Interaction Events (Sự kiện tương tác của người dùng):

Có thể bạn không biết, sau khi người dùng nhấn vào một nút button bất kỳ trên màn hình, Flutter sẽ thực hiện một sự kiện chạy asynchronous thông qua callback:

```
FlatButton(
  child: Text("Data"),
  onPressed: () {
    print("pressed button");
  },
)
```

Widget FlatButton, giống như hầu hết các widget khác của Flutter, cung cấp cho bạn một function callback là onPressed để phản hồi các thao tác của người dùng. Ở ví dụ trên, khi người dùng nhấn vào `FlatButton`, chúng ta in ra một đoạn log đơn giản trên terminal. Và bất cứ khi nào người dùng nhấn vào button, sự kiện `onPressed` sẽ được thiết lập và câu log sẽ được in ra.

## 6. Sử dụng callback trong việc thực hiện call API:

Có lẽ trường hợp nổi tiếng nhất mà bạn buộc phải làm việc với lập trình bất đồng bộ là lấy dữ liệu từ phía backend thông qua API

```
import 'package:http/http.dart' as http;
final future = http.get("https://flutterdevs.com");
future.then((response) {
  if (response.statusCode == 200) {
    print("Response received.");
  }
});
```

Package http là một trong những package nổi tiếng nhất trong kho Pub của ngôn ngữ Dart. Sau khi bạn khai báo package vào file pubspec.yaml, bạn import nó vào nơi bạn sử dụng. Từ khoá as giúp bạn "rename" cách gọi thư viện đó.

```
http.get("https://flutterdevs.com").then((response) {
  if (response.statusCode == 200) {
    print("Response received.");
  }
  else {
    print("Response not received");
  }
});
```

Ở ví dụ trên, sau khi gọi lệnh `get()` chúng ta sẽ nhận được giá trị từ Future thông qua hàm `then()` mà không cần phải gán nó thông qua một biến nào cả. Đoạn code này đơn giản, dễ đọc, dễ hiểu hơn so với ví dụ ở trên. Ngoài ra, chúng ta còn có thể kết hợp nhiều giá trị callback như sau:

```
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

Ở ví dụ trên, nếu có lỗi xảy ra trong quá trình chúng ta call API thì chương trình sẽ in ra câu lệnh `print("Error!");`. Và dù có lỗi hay không thì chương trình cũng sẽ thực thi callback một khi Future đó kết thúc.

## 7. Thực hiện call API mà không sử dụng callback:

Nếu bạn không thích lập trình bất đồng bộ kiểu callback lồng nhau thì ngôn ngữ Dart sẽ cho bạn một offer khác.

```
Future<String> getData() async {
  final response = await http.get("https://flutterdevs.com");
  return response.body;
}
```

Khi bạn thực hiện lệnh gọi bất đồng bộ bên trong một hàm, chẳng hạn như `http.get()`, bạn phải chỉ định hàm đó thực hiện các chức năng bất đồng bộ bằng từ khóa async. Một công việc bất đồng bộ luôn trả về một future và bạn phải sử dụng kèm theo từ khóa `await`. Đối với ví dụ trên, chúng ta thấy rằng lệnh gọi REST sẽ trả về kiểu dữ liệu dạng `String`, vì vậy chúng ta viết hàm trả về kiểu: Future<String>.

Bạn có thể `await` bất kỳ hàm nào trả về future. Hàm getData () sẽ tạm ngừng thực thi để đợi kết quả Future trả về. Để bắt lỗi khi sử dụng await, bạn có thể sử dụng `try/catch` chuẩn của Dart bao gồm:
    
```
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

## 8. FutureBuilder:

Future Builder là một Widget trong Flutter nhận vào một function Future và trả ra kết quả nhận được để người dùng render Widget tương ứng lên màn hình. Ở ví dụ bên dưới, chúng ta truyền vào một hàm `getData()` và hàm đó sẽ trả ra kiểu dữ liệu Future<String> khi nó thực hiện xong.
   
    
```
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

Ở ví dụ trên, trong khi đợi kết quả trả về của hàm `getData()` thì màn hình sẽ hiển thị widget `CircularProgressIndicator()` (loading xoay xoay). Nếu hàm kết thúc và trả về dữ liệu thì dữ liệu sẽ được hiển thị trên màn hình và loading xoay xoay sẽ bị mất đi. Bạn có để ý, thuộc tính `builder` trả về cho chúng ta tham số có kiểu dữ liệu là `AsyncSnapshot` để giúp bạn kiểm tra status của Future. Nếu hàm của bạn xảy ra lỗi hoặc không rơi vào bất kỳ trường hợp nào bên trên, nó sẽ hiển thị 1 Container rỗng.

`FutureBuilder` còn có thể sử kết hợp với stateful widget và theo tôi, bạn nên sử dụng theo cách này vì bạn có thể lợi dụng hàm `initState()` để gọi hàm `getData()`.
    
```
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
    
## 9. StreamBuilder:

Sream giống như một luồng sự kiện. Thông tin hoặc sự kiện lỗi đi về một phía và chúng được chuyển tải đến những nơi lắng nghe các thay đổi được thêm vào luồng đó.
    
```
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
    
## Tóm lại:

Trong bài viết, tôi đã giải thích về Lập trình bất đồng bộ trong Dart & Flutter; bạn có thể sửa code theo ý của mình và chạy thử. Tôi hy vọng bài viết này đã cung cấp cho bạn những thông tin hữu ích.