# Tổng quan:
Flutter là mobile UI framework của Google để tạo ra các giao diện chất lượng cao trên iOS và Android trong khoảng thời gian ngắn. Các ứng dụng được phát triển từ Flutter thường có xu hướng quen thuộc như lấy dữ liệu từ server, xử lý và hiển thị chúng đến người dùng.
Bất kỳ ngôn ngữ lập trình nào thì với những việc công việc nặng, tốn thời gian... thì chúng ta nên xử lý nó bất đồng bộ hoặc xử lý chúng trong background threads bởi vì nếu chúng ta xử lý trên main thread thì sẽ dẫn đến việc ứng dụng có thể bị chậm, giật.. và ảnh hưởng lớn đến trải nghiệm của người dùng.

Flutter đã cũng cấp Stream và Future để hỗ Lập Trình Viên xử lý những vấn đề liên quan đến bất đồng bộ nhưng điều này là chưa đủ để chúng ta có thể giải quyết triệt để vì chúng vẫn được thực thi trên luồng chính. Nên vì thế trong bài viết này chúng ta sẽ cùng nhau tìm hiểu cách đưa những công việc kia xuống background xử lý bằng Isolate để không ảnh hưởng đến hiệu năng của ứng dụng và trải nghiệm của người dùng.

# [Isolate](https://api.dart.dev/stable/2.1.0/dart-isolate/Isolate-class.html) là gì?
Trước khi tìm hiểu Isolate là gì thì chúng ta nên biết những khái niệm sau:
* Theo mặc định, Dart thực thi tất cả mã lệnh của nó trên một luồng đơn.
* Mọi hàm và mọi lệnh gọi async-await chỉ hoạt động trên luồng chính (cho đến khi và trừ khi được chỉ định).

Isolate là một tham chiếu đến một vùng cách ly, thường khác với vùng cách ly hiện tại. Hay có thể nói dễ hiểu hơn thì Isolate là một phiên bản tương ứng của Thread trên ngôn ngữ lập trình Dart.
Nó tương tự với Vòng lặp sự kiện ([Event Loop](https://en.wikipedia.org/wiki/Event_loop)) nhưng có một số điểm khác biệt như sau:
*  Nó là 1 vùng cách ly với bộ nhớ riêng, biệt lập.
*  Nó không thể chia sẻ trực tiếp dữ liệu với các vùng biệt lập khác.
*  Bất kể dữ liệu nào được truyền giữa các vùng biệt lập đều bị trùng lặp.

Mỗi Isolate có một Vòng lặp sự kiện (Event Loop) của riêng mình nhờ đó chúng sẽ hoạt động song song và độc lập với nhau.

# Làm thế nào để sử dụng Isolate
Chúng ta sẽ thực hiện demo parse data trả về từ server theo cách thông thường (*Không* sử dụng Isolate) và có sử dụng Isolate:

## 1.  Thêm gói thư viện `http` 
Đầu tiên, chúng ta cần add gói thư viện [http](https://pub.dev/packages/http) giúp thực hiện các yêu cầu truy cập mạng để kết nối và lấy giữ liệu Json từ server
```html
dependencies:
  http: <latest_version>
```
## 2.  Tạo một yêu cầu để lấy dữ liệu từ server
Ví dụ này chúng ta sẽ tạo yêu cầu đến server để lấy dữ liệu với danh sách chứa 5000 bản ghi bằng phương thức get()
```markdown
Future<http.Response> fetchPhotos(http.Client client) async {
  return client.get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));
}
```
## 3. Tạo đối tượng Photo Class
Trước khi bắt đầu, chúng ta cần tạo đối tượng **Photo Class** với phương thức **fromJson()** để giúp dễ dàng tạo một đối tượng Photo.
```java
class Photo {
  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  const Photo({
    required this.albumId,
    required this.id,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      albumId: json['albumId'] as int,
      id: json['id'] as int,
      title: json['title'] as String,
      url: json['url'] as String,
      thumbnailUrl: json['thumbnailUrl'] as String,
    );
  }
}
```

## 4. Phân tích và chuyển đổi dữ liệu từ Json sang List Object

Bây giờ, chúng ta sẽ tạo ra `parsePhotos` để làm công việc chuyển đổi dữ liệu từ Json sang List Photo Object:
```markdown
// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

  return parsed.map<Photo>((json) => Photo.fromJson(json)).toList();
}
```
### Phương pháp 1: Gọi trực tiếp mà không cần tạo ra các vùng biệt lập (Isolate)
Chúng ta có thể thực hiện chuyển đổi dữ liệu (parse data) trên Isolate chính mà vẫn có thể nhận được kết quả chính xác:
```markdown
Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client
      .get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));

  return parsePhotos(response.body);
}
```
Với việc thực thi như thế này, chúng ta sẽ nhận thấy ứng dụng có thể bị chậm và không mượt mà (jank) trong một vài giây do nó đang phải xử lý chuyển đổi một lượng lớn dữ liệu nhận được.

### Phương pháp 2: Tạo ra vùng biệt lập (Isolate) bằng cách sử dụng `compute`
Như đã nói ở trên, có một số cách để tạo ra các vùng biệt lập (Isolate) trong Flutter. Một trong số những cách dễ sử dụng nhất là `compute`. Với phương pháp này thì mã lệnh của chúng ta sẽ thực thi trong một vùng cách ly khác và trả lại kết quả cho vùng cách ly ban đầu của chúng ta.
```markdown
Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client
      .get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}
```
Bằng việc sử dụng Isolate thì `parsePhotos` sẽ được xử lý dưới nền và sẽ được trả Kết quả về khi thực thi xong nên sẽ không ảnh hưởng đến trải nghiệm người dùng. `compute` phù hợp cho các tác vụ không thường xuyên hoặc một lần, vì chúng ta không thể sử dụng lại vùng cách ly.

### Phương pháp 3: Tạo ra vùng biệt lập (Isolate) bằng cách sử dụng `Isolate.spawn`
Bằng cách sử dụng `Isolate.spawn` chúng ta cũng sẽ tạo ra một vùng biệt lập giống như `compute`.
```markdown
Future<List<Photo>> fetchPhotos(Client client) async {
    ReceivePort port = ReceivePort();
    final response = await client
        .get(Uri.parse('https://jsonplaceholder.typicode.com/photos'));
    final isolate = await Isolate.spawn<List<Photo>>(
        parsePhotos, [port.sendPort, response.body]);
    List<Photo> data = await port.first;
    isolate.kill(priority: Isolate.immediate);
    return data;
  }

  void parsePhotos(List<dynamic> param) {
    SendPort sendPort = values[0];
    final parsed = jsonDecode(param[1]).cast<Map<String, dynamic>>();
    sendPort.send(parsed.map<Photo>((json) => Photo.fromJson(json)).toList());
  }
```
Với phương pháp này, chúng ta cần phải tạo `ReceivePort` để có thể lắng nghe kết quả từ vùng biệt lập khác và sẽ cần truyền `SendPort` và data (nếu có) sang vùng biệt lập mới. Để khi chúng ta có thể sử `SendPort` gửi giữ liệu ngược trở về vùng biệt lập ban đầu và kết quả nhận được chính là `port.first`.
<br> Sau khi hoàn thành công việc chúng ta sẽ dọn dẹp bộ nhớ bằng cách hủy vùng biệt lập vừa được tạo.

#### Sử dụng lại các vùng biệt lập
Nhằm tránh việc phải **tạo - hủy** nhiều lần các vùng biệt lập mà chúng xử lý chung một công việc như nhau thì `Isolate.spawn` có thể hỗ trợ việc sử dụng lại các vùng biệt lập bằng cách thiết lập cổng giao tiếp 2 chiều để có thể gửi thêm dữ liệu để xử lý cho vùng biệt lập đã được tạo thành.
```java
void parsePhotos(SendPort sendPort) {
    ReceivePort receivePort = ReceivePort();
    sendPort.send(receivePort.sendPort);
    receivePort.listen((message) {
      final parsed = jsonDecode(message).cast<Map<String, dynamic>>();
      sendPort.send(parsed.map<Photo>((json) => Photo.fromJson(json)).toList());
    });
  }
```

# Lưu ý khi sử dụng Isolate
Dưới đây là những lưu ý mình nhận thấy khi nghiên cứu về Isolate:
- Như đã nói ở trên thì dữ liệu của những vùng biệt lập không thể truy cập trực tiếp, nên data đã được inject trong main app sẽ không thể truy xuất từ vùng biệt lập khác (trong project mình sử dụng DI để khởi tạo các generic model nên ở trong vùng biệt lập mình phải inject lại)
    ```
    static NetworkResponse<R> parseData<R extends ModelBase>(Map<String, dynamic> map) {
        AppGlobalBinding.addModelDependencies();
        String? json = map[_jsonKey];
        .....
        return NetworkResponse<R>()..fromJsonStr(json);
      }
     ```
- Các hàm xử lý của một Isolate (ví dụ trên là `parseData`) cần phải là một function nằm ở **Top-Level** (ngoài cùng) hoặc là một **STATIC** function.
- Isolate giao tiếp bằng cách truyền các "message" qua lại. Những dữ liệu này có thể là các giá trị **nguyên thủy** (null, num, double..) hoặc **String** hoặc những **đối tượng cơ bản** (ví dụ như `Photo Object` ví dụ trên). Với những đối tượng phức tạp (như Fututer, Response...) bạn sẽ gặp lỗi trong quá trình truyền dữ liệu.
- Trong trường hợp có nhiều dữ liệu cần truyền giữa các Isolate, chúng ta có bọc chúng dưới dạng `List<dynamic>` hoặc `Map`. Bởi vì nó chỉ hỗ trợ gửi duy nhất một tham số

# Khi nào nên sử dụng Future và Isolate
Để đánh giá một sản phẩm chất lượng hay không, người dùng sẽ có một số tiêu chí như sau:
* Tính năng, đặc điểm
* Giao diện người dùng
* Nội dung của ứng dụng
* ....

Sản phẩm của bạn có thể đáp ứng tất cả những yêu cầu trên, nhưng trong quá trình trải nghiệm sản phẩm của bạn bị chậm, giật trong quá trình xử lý thì rất có thể sẽ mang lại sự thất vọng lớn cho người dùng.

Do đó, đây là một số gợi ý mình tổng hợp được:<br>
1. Nếu các đoạn mã lệnh **KHÔNG THỂ** bị gián đoạn, hãy sử dụng quy trình đồng bộ bình thường (một phương thức hoặc nhiều phương thức gọi nhau)
2. Nếu các đoạn mã lệnh có thể chạy độc lập mà **KHÔNG** ảnh hưởng đến ứng dụng, hãy cân nhắc sử dụng `Event Loop` thông qua việc sử dụng `Future` ;
3. Nếu quá trình xử lý nặng có thể mất một thời gian để hoàn thành và có thể ảnh hưởng đến ứng dụng, hãy cân nhắc sử dụng `Isolates`

Ngoài ra, yếu tố khác giúp bạn quyết định sử dụng `Future` hay `Isolate` là thời gian trung bình để thự thi mã lệnh:
1. Nếu một phương thức xử lý mất vài mili giây => `Future`
2. Nếu một quá trình xử lý có thể mất vài trăm mili giây => `Isolate`

# Sử dụng Isolate cho hiệu quả
Dưới đây là một số đề xuất:

*  Parse Json => sử dụng `compute`
*  Encrypt/Decrypt => sử dụng  `Isolate`
*  Xử lý ảnh => sử dụng  `Isolate`

# Kết luận
Flutter ( Dart ) là Single-Thread , do đó để làm hài lòng người dùng, các nhà phát triển phải đảm bảo rằng ứng dụng sẽ chạy trơn tru nhất có thể. <br>Futures và Isolates là những công cụ rất mạnh có thể giúp bạn đạt được mục tiêu này.

# Tài liệu
1. https://blog.logrocket.com/multithreading-flutter-using-dart-isolates/
2. https://www.didierboelens.com/2019/01/futures-isolates-event-loop/
3. https://medium.flutterdevs.com/flutter-performance-optimization-17c99bb31553
4. https://docs.flutter.dev/cookbook/networking/background-parsing
5. https://medium.com/flutter-community/thread-and-isolate-with-flutter-30b9631137f3