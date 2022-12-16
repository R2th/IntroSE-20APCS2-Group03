Chào các bạn, hôm nay mình sẽ giới thiệu cho các bạn một chủ đề mà app Flutter nào cũng đều sử dụng. Đó chính là Stream.
# Vậy Stream là gì?
Bản chất Stream là một luồng data bất đồng bộ, nó như là một cái ống sẽ có dữ liệu đầu vào và dữ liệu đầu ra.
![](https://images.viblo.asia/f7b1b7b2-4c2e-45e3-9f81-787574149abc.png)
* Để handle một Stream thì ta có StreamController.
* Để đẩy dữ liệu vào Stream thì thông qua thuộc tính sink.(Bạn có thể đẩy bất kỳ cái gì vào Stream: value, object, collection, error....)
* Để publish dữ liệu ra ngoài thì chúng ta dùng thuộc tính stream.
* Để transform, modify hay bất kỳ một thao tác để chỉnh sửa như xoá, cập nhật thì chúng ta dùng StreamTransformer.
# Có bao nhiêu loại Stream?
Có 2 loại Stream:
* Single - Subscription Stream
* Broadcast Streams
## Single - Subscription Stream
Khi chúng ta dùng stream để publish dữ liệu ra ngoài, nếu sử dụng Single - Subscription Stream thì chỉ được phép đăng ký lắng nghe dữ liệu một lần.<br>
Để hiểu rõ hơn, mình có một demo nhỏ như sau. (Mình sử dụng luôn Example Counter mặc định khi các bạn tạo project flutter)<br>
Đầu tiên mình tạo file MyStream.dart: 
```dart
import 'dart:async';

class MyStream {
  int counter = 0;
  StreamController counterController = new StreamController<int>();
  Stream get counterStream => counterController.stream;

  void increment() {
    counter += 1;
    counterController.sink.add(counter);
  }

  void dispose() {
    counterController.close();
  }
}
```
Ở đây mình có tạo một biến counter gán bằng 0, khi gọi hàm increment thì thực hiện tăng counter lên và nhiệm vụ quan trọng nhất là add nó vào stream thông qua sink.<br>
Lúc này stream sẽ publish, những nơi nào lắng nghe stream này thì sẽ nhận được data thay đổi và update lên giao diện.<br>
Việc bạn chỉ khởi tạo `StreamController counterController = new StreamController<int>();`  thì nó sẽ hiểu đó chính là Single - Subscription Stream.<br>
Ở Main mình sẽ handle lại như sau: 
```dart
class _MyHomePageState extends State<MyHomePage> {
  MyStream myStream = new MyStream();

  @override
  void dispose() {
    myStream.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            StreamBuilder(
              stream: myStream.counterStream,
              builder: (context, snapshot) => Text(
                snapshot.hasData ? snapshot.data.toString() : "0",
                style: Theme.of(context).textTheme.headline4,
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          myStream.increment();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```
Mình có sử dụng StreamBuilder như là một cái phễu để lắng nghe sự kiện từ Stream, từ đó khi có thay đổi dữ liệu thì nó sẽ gọi đến builder để thay đổi giao diện tương ứng. Một lưu ý nhỏ, nếu bạn cần handle các error thì bạn cũng có thể kiểm tra bằng cách sử dụng snapshot.hasError.<br>
Còn FloatingActionButton chỉ là việc lúc click vào thì mình gọi hàm increment() mà mình đã tạo ở trên.<br>
Đến đây các bạn có thể chạy thử vào xem kết quả. Goodluck :heart_eyes::heart_eyes:<br>

Tiếp theo, bạn hãy thử thêm một lắng nghe khác vào Main. Ví dụ mình thêm một lắng nghe như sau vào build trước khi return giao diện.
```dart
myStream.counterStream.listen((event) {
      print(event.toString());
});
```
Khi chạy thử, lập tức bạn bị báo lỗi.<br>
![](https://images.viblo.asia/d5f7f8b6-1e89-4a18-a5b1-35e1f45e1874.png) <br>
Lý do lỗi ở đây là do bạn đang sử dụng Single - Subscription Stream nên bạn chỉ được phép lắng nghe một lần. Để giải quyết vấn đề này, chúng ta có **Broadcast Streams**.
## Broadcast Streams
Broadcast Streams cho phép nhiều chỗ có thể lắng nghe sự kiện thay đổi dữ liệu của Stream.<br>
Để tạo Broadcast Streams, rất đơn giản chúng ta chỉ cần thêm broadcast() lúc khởi tạo StreamController. `StreamController counterController = new StreamController<int>.broadcast()`<br>
Nhưng một lưu ý nhỏ là chính vì Broadcast Streams cho phép nhiều thằng lắng nghe cùng một lúc, nên bạn phải xử lý được ai lắng nghe, và ai không lắng nghe thì phải huỷ đi tránh trường hợp memory leak.
## Cách xử lý dữ liệu trong Stream trước khi đẩy ra ngoài
Các bạn có thể xử lý dữ liệu trước khi stream publish dữ liệu ra ngoài với transformer.<br>
Mình ví dụ như sau, ở MyStream mình sửa lại chút:
```dart
import 'dart:async';

class MyStream {
  int counter = 0;
  StreamController counterController = new StreamController<int>.broadcast();
  Stream get counterStream => counterController.stream.transform(counterTranformer);

  var counterTranformer = StreamTransformer<int, int>.fromHandlers(handleData: (data, sink) {
    data += 5;
    sink.add(data);
  });

  void increment() {
    counter += 1;
    counterController.sink.add(counter);
  }

  void dispose() {
    counterController.close();
  }
}
```
Đối với StreamTransformer, khi dữ liệu đẩy vào stream, các bạn hoàn toàn có thể thay đổi data(như mình tăng data lên thêm 5) thông qua **handleData**  rồi add vào sink của Stream. Ngoài ra, bạn cũng có thể handle error bằng cách thay thêm **handleError**.<br>
# Tổng kết
> Nếu có 1 listener, hãy sử dụng Single - Subscription Stream.<br>
> Nếu có nhiều listener, hãy sử dụng Broadcast Streams.<br>
> Bạn hoàn toàn có thể xử lý được dữ liệu trước khi publish với StreamTransformer, mỗi Stream có thể có nhiều luồng.

Qua bài viết này, mình hy vọng có thể giúp các bạn có thể hiểu cơ bản về các loại Stream và cách sử dụng, biết được cách custom một data trước khi publish nó ra ngoài cho các listener. Chúc các bạn thành công !!!:sweat_smile: