![image.png](https://images.viblo.asia/22971917-2eb4-4af4-b002-fee8bd771139.png)

Flutter sử dụng kiểu dữ liệu Generic trong Dart cho mọi nền tảng để đảm bảo các kiểu object hoạt động đồng nhất giống như những gì chúng ta mong muốn. Về cơ bản, generics là cách tiếp cận để xây dựng class bằng cách trừu tượng hoá kiểu dữ liệu với một giới hạn thông tin nhất định thay vì khai báo tường minh. Kiểu dữ liệu thực tế sẽ được xác định bởi người sử dụng nó, từ thời điểm được xác định kiểu cụ thể, tính an toàn cho kiểu dữ liệu vẫn được đảm bảo.

Trong bài viết này, chúng ta sẽ khám phá kiểu dữ liệu Generic trong Dart & Flutter. Chúng ta sẽ tìm hiểu cách sử dụng các collection, class và function có kiểu dữ liệu Generic trong ứng dụng Flutter của bạn.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/generics-trong-dart-flutter/)

## 1. Giới thiệu:

Generic được tận dụng trong việc kiểm tra các kiểu của biến ở compile time. Họ thực hiện như vậy để đảm bảo kiểu an toàn (type-safety) trong code. Ví dụ, trong các collection, type-safety được xác thực bằng cách nắm giữ một loại thông tin tương tự. Generics giúp bạn tái sử dụng các class, phương thức, chức năng cho nhiều kiểu dữ liệu khác nhau.

Collections, streams, và futures là những điểm nổi bật của kiểu dữ liệu này mà bạn thường xuyên sử dụng khi làm việc với các ứng dụng Flutter. Flutter làm vậy để khai thác và tái sử dụng lại nhiều nơi trong quá trình code.

## 2. Kiểu dữ liệu Generic với Collection:

Collection generics có thể giúp bạn đảm bảo mọi thành phần bên trong collection  là kiểu bình thường. Bình thường, bạn sẽ khai báo biến collection như sau:

```
List myList;
Map myMap;
```

Nếu bạn chỉ định kiểu dữ liệu động cho nó thì nó sẽ như này:

```
List<dynamic> myList;
Map<dynamic, dynamic> myMap;
```

Điều này có thể được thực hiện khi bạn thực sự cần một collection chứa nhiều kiểu. Nhưng nếu bạn biết chính xác kiểu dữ liệu được chỉ định cho List đó, bạn nên chỉ định chính xác kiểu dữ liệu đó trong ngoặc nhọn luôn, điều này sẽ cho phép trình phân tích của Dart hỗ trợ bạn tránh những sai lầm trong lúc code:

```
List<String> myList;
```

Tương tự như vậy, trong trường hợp bạn mong đợi một Map chứa các key và value được chỉ định kiểu dữ liệu theo bạn mong muốn, hãy khai báo như sau:

```
Map<String, dynamic> jsonData;
Map<int, String> myMap;
```

> Cần lưu ý rằng Dart cho phép bạn sử dụng bất kỳ kiểu dữ liệu nào cho Key trong Map, trong khi ở một số ngôn ngữ nhất định chỉ cho phép các chuỗi (String).

## 3. Kiểu dữ liệu Generic với Asynchronous:

Thông thường chúng ta sử dụng các tác vụ asynchronous (bất đồng bộ) để cho phép ứng dụng luôn thực thi trong khi đợi các tác vụ trên hoàn thành. Trong trường hợp chúng ta lấy thông tin qua mạng (call API, download file) hoặc lấy dữ liệu từ database local, v.v  thì thời gian đợi sẽ lâu hơn. Do đó, Dart hỗ trợ các tác vụ thực hiện bất đồng bộ qua 2 khái niệm gọi là là Future and the Stream.

Đó là phương pháp hay nhất để kết hợp các loại khi quản lý nhiều Futures và Streams. Điều này cho phép không tiếp nhận những kiểu dữ liệu không chấp nhận được. Như trong các trường hợp khác nhau, nếu bạn bỏ qua việc kết hợp một loại cụ thể, dynamic được mong đợi và bất kỳ loại nào sẽ được cho phép.

### 3.1 Futures:

Nó giải quyết các giá trị được trả về sau khi thực thi các hoạt động bất đồng bộ. Vào thời điểm mà lần đầu thực hiện, Future đương nhiên là chưa hoàn thành. Khi hoạt động kết thúc, bạn thường nhận được một là kết quả, hai là lỗi. Bằng cách sử dụng generic, chúng tôi có thể chỉ ra loại giá trị quan trọng thông thường được tạo ra.

Hàm này trả về Future, nhưng giá trị kiểu Boolean cuối cùng được trả về nơi gọi (trong trường hợp không có lỗi xảy ra) khi Future kết thúc:

```
Future<bool> someData() {
  return Future.delayed(const Duration(seconds: 2 ), () => true);
}
```

### 3.2 Streams:

Chúng giống như một danh sách bất đồng bộ hoặc một đường ống thông tin, truyền tải một nhóm thông tin (dữ liệu) bất đồng bộ. Khi các giá trị có thể truy cập được, chúng sẽ được đưa vào Stream. Listeners  trên stream nhận các giá trị  tương tự mà bạn đã đưa vào Stream.

Một phương pháp điển hình để cho phép một lớp giao tiếp với code bên ngoài là sử dụng một StreamController được kết hợp với một Stream. Chỉ định kiểu dữ liệu để đảm bảo việc kiểu dữ liệu hoạt động giữa chúng là đồng nhất:

```
final _onData= StreamController<Data>.broadcast();
Stream<Data> get onData => _onData.stream;
```

Đoạn code này tạo ra một StreamController có thể được sử dụng để gửi các Object “Data” ra trên một Stream một cách bất đồng bộ.

## 4. Generics trong Flutter:

Các điểm dễ thấy nhất khi bạn sử dụng các kiểu dữ liệu Generic trong Flutter đó là khi bạn sử dụng các Collection hoặc các Stateful Widget. Các Stateful Widget bao gồm StatefulWidget và lớp State. Lớp State sử dụng các generic để quản lý StatefulWidget, sử dụng cấu trúc cú pháp structure State<MyApp>. Trường hợp State là thông thường, được tạo ra để hoạt động với bất kỳ StatefulWidget nào và đối với tình huống này, chúng tôi đang đưa ra state rõ ràng cho lớp MyApp của mình.

```
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        const Text("Hello, "),
        const Text("Flutter Dev's"),
      ],
    );
  }
}
```

Nếu bằng cách nào đó bạn cố gắng loại bỏ các dấu ngoặc nhọn và biểu tượng MyApp, thiết bị phân tích (analyzer) trong IDE thường sẽ không "nói" bất kỳ điều gì tiêu cực, nhưng bạn sẽ tạo State được gắn với loại `dynamic` mặc định. Tuy nhiên, ngoài thực tế là điều này không là type-safe, nó có thể gây ra các vấn đề cho framework khi nó cố gắng phối hợp với các trường hợp state với các widget phù hợp.

List nghiêm ngặt được chuyển cho `children` đối với Row widget được tạo tương đối, lần này là danh sách các object  Widget: <Widget>[]. Nhiệm vụ này hỗ trợ Dart giải quyết các vấn đề tại thời điểm cấu hình. Nếu bạn cố gắng đưa một non-widget vào collection đó, bạn sẽ nhận được cảnh báo.

Widget Row không có ý tưởng tuyệt vời nhất về cách quản lý các object không phải là widget, vì vậy việc giải quyết vấn đề này trước khi chạy code rất hữu ích. Các generic cũng phục vụ để tạo code self-report nhiều hơn, làm rõ những gì thường được dự đoán bên trong collection.

## 5. Generic Methods & Functions trong Flutter:

Dart đề cao việc sử dụng generic trên các method and function. Giả sử bạn cần tạo một generic function có thể thay đổi giá trị chuỗi thành một enum. Generics có thể hỗ trợ bạn tránh sử dụng dynamic, bảo vệ an toàn cho kiểu dữ liệu trả về:

```
enum Size {
  small,
  medium,
  large
}
T stringToEnum<T>(String str, Iterable<T> values) {
  return values.firstWhere(
    (value) => value.toString().split('.')[1] == str,
    orElse: () => null,
  );
}
Size size = stringToEnum<Size>("large", Size.values);
```

Trong đoạn code trên, `T` là kiểu địa chỉ được cung cấp bởi người gọi stringToEnum(). Kiểu đó sẽ được sử dụng làm return type của function, vì vậy khi chúng ta gọi function ở dòng cuối cùng, class `Size` sẽ được tạo thành một cách an toàn. Tình cờ, T sẽ cung cấp cho kiểu ranh giới `values`, đảm bảo rằng chỉ các loại đúng mới được thực hiện trong collection Iterable. Function `stringToEnum()` sẽ được đảm bảo an toàn khi hoạt động. Nếu String truyền vào không tương ứng với bất kỳ giá trị enum nào, function sẽ return giá trị `null`

## 6. Generic Classes trong Flutter:

Bạn cần cố gắng không tạo các class riêng biệt vì động cơ duy nhất đằng sau việc xử lý các loại thông tin khác nhau. Có thể bạn cần tạo một lớp collection cụ thể, và vẫn đảm bảo an toàn cho kiểu.

Thông thường bạn sẽ không muốn tạo nhiều class riêng biệt khi bạn có thể tái sử dụng các chức năng của class đó ở nhiều nơi. Do đó, bạn cần tạo một lớp collection cụ thể nhưng vẫn đảm bảo an toàn cho các kiểu truyền vào lớp đó.
    
```
class Data<T> {
  List<T> _data = [];
void push(T item) => _data.add(item);
  T pop() => _data.removeLast();
}
```   
    
Class này cung cấp cho bạn một collection sẽ không bao giờ thực sự đưa dữ liệu vào và lấy giá trị của nó ra. Rất khó để truy cập trực tiếp các giá trị của dữ liệu từ bên ngoài, vì thuộc tính `_data` là biến private. 
    
```
final data = Data<String>();
data.push("A string.");  // works
data.push(5);            // errors
```
    
Ở ví dụ trên, nếu dữ liệu bạn đưa vào không phù hợp với kiểu dữ liệu khởi tạo của List thì chương trình sẽ báo lỗi.

### Tóm lại:

Trong bài viết, tôi đã giải thích Generics trong Dart & Flutter và các cấu trúc cơ bản trong Flutter; bạn có thể sửa đổi code theo ý của bạn. Tôi hy vọng bài viết này sẽ cung cấp cho bạn những thông tin về việc tạo ra Generics trong Dart & Flutter trong các dự án Fluter của bạn.

Bài viết được dịch từ: [Explore Generics In Dart & Flutter](https://medium.com/flutterdevs/explore-generics-in-dart-flutter-6dd62b6f3ed4)