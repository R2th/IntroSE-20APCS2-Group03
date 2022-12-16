![image.png](https://images.viblo.asia/0ce83897-46eb-471b-97c1-5d2bc21e8dd5.png)

JSON là một định dạng tuyệt vời để chuyển dữ liệu qua web và hơn thế nữa. Mọi nhà phát triển sẽ phải đối mặt với vấn đề: làm cách nào để parse JSON thành một object? Bây giờ chúng ta sẽ kiểm tra những gì Flutter cung cấp để serialize các object JSON. Vì lợi ích của bài viết này, chúng ta sẽ xem xét việc tạo một object “Event” được như sau:

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/lam-viec-voi-json-serialization-trong-flutter/)

```
class Event {
  final String title;
  final String date;
  final String imageUrl;
  Event(this.title, this.date, this.imageUrl);
}
```

## 1. Manual serialization (Parse Json bằng tay)

Manual serialization được hỗ trợ bởi Dart với thư viện `dart:convert`. Trên class dữ liệu của chúng ta, chúng ta sẽ cần tạo 2 hàm được gọi là `fromJson` và `toJson`, về mặt này, sẽ parse json thành class Event và ngược lại. `fromJson` nhận vào `Map<String`, `dynamic` và sẽ cung cấp cho bạn một instance của class dữ liệu, `toJson` là một hàm class cung cấp cho một Map bắt đầu từ các tham số dữ liệu.

```
class Event {
  final String title;
  final String date;
  final String imageUrl;
  
  Event (this.title, this.date, this.imageUrl);
  
  Event.fromJson(Map<String, dynamic> json): 
        title= json['title'],
        date = json['date'],
        imageUrl= json['imageUrl'];
        
  Map<String, dynamic> toJson() =>
    {
      'title': title,
      'date': date,
      'imageUrl': imageUrl
    };
}
```

Sau đó, serialize và deserialize bằng một dòng code đơn giản:

```
//JSON String to a map
Map eventMap = jsonDecode(jsonString);
//Serialize to object
var event = Event.fromJson(eventMap);
//Encode to JSON String
String json = jsonEncode(event);
```

Điều này rất dễ dàng nhưng hãy lưu ý rằng bạn có thể phải đối mặt với các object phức tạp hơn (như JSON lồng nhau) hoặc bạn có thể mong muốn có một cách “tự động” hơn để thực hiện thao tác này.

## 2. Code generation libraries (Parse Json bằng tool)

Chúng ta sẽ thấy một package hữu ích có tên là [json_serializable](https://pub.dev/packages/json_serializable), do Google xuất bản, package này tự động tạo code để serialize và giải mã hóa(deserialize) class dữ liệu của chúng ta.

Trước tiên, chúng ta cần thêm các phụ thuộc của mình, chúng ta cũng cần thêm dev_dependencies vì sẽ có quá trình tạo code từ `json_serializable` mà chúng ta  muốn:

```
dependencies:
  json_annotation: <latest_version>
dev_dependencies:
  build_runner: <latest_version>
  json_serializable: <latest_version>
```

Sau đó, trên class Event, chúng ta cần nói rằng đó là class json_serializable sử dụng chú thích và cho phép class truy cập vào các thuộc tính private trong các trường cần tạo:

```
import 'package:json_annotation/json_annotation.dart';
/// This allows the class to access private members in
/// the generated file called *.g.dart, where the star denotes the source file name.
part 'event.g.dart';
/// An annotation for the code generator to know that this class needs
/// JSON serialization.
@JsonSerializable()
class Event{
  Event(this.title, this.date, this.imageUrl);
  String title;
  String date;
  String imageUrl;
  /// A necessary factory constructor for creating a new Event instance
  /// from a map. Pass the map to the generated `_$EventFromJson()` constructor.
  /// The constructor is named after the source class Event.
  factory Event.fromJson(Map<String, dynamic> json) => _$EventFromJson(json);
  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$EventToJson`.
  Map<String, dynamic> toJson() => _$EventToJson(this);
}
```

Thao tác này sẽ tạo code để mã hóa và giải mã tất cả các tham số trong class này. Bạn có thể thay đổi tên mà bộ giải mã tìm thấy bằng cách thêm chú thích vào tham số theo cách này:

```
//On the json it's 'event_image_url'
@JsonKey(name: 'event_image_url')
String imageUrl;
```

Bạn cũng có thể đặt một số giá trị mặc định, phần tử bắt buộc hoặc bỏ qua một số trường:

```
@JsonKey(defaultValue: 'NoTitle')
String title;
@JsonKey(required: true)
String date;
@JsonKey(ignore: true)
String imageUrl;
```

Đoạn cuối là chạy một lệnh để tạo serialization code JSON với một trình theo dõi, một số class dữ liệu có thay đổi hay không, serialization code cũng sẽ được tạo lại:

```
//Run on project root
flutter pub run build_runner watch
```

Cuối cùng, chúng ta sẽ chỉ phải gọi `jsonDecode` và `fromJson`:

```
Map eventMap = jsonDecode(jsonString);
var event = Event.fromJson(eventMap);
String json = jsonEncode(event);
```

Nếu class của bạn có class lồng nhau, bạn sẽ cần JsonSerialize cũng là class lồng nhau và trên  “father class”, bạn sẽ cần thay đổi chú thích này:

```
@JsonSerializable(explicitToJson: true)
class Event{
  String title;
  //Our class (already json_serialized)
  Address address;
}
```

Nó có vẻ không phải là điều dễ dàng nhất nhưng tốt hơn là làm điều đó theo cách thủ công, ngoài ra nếu bạn thay đổi thứ gì đó trên object của mình, bạn không cần phải thay đổi cách serialization hoạt động, bạn chỉ cần thực hiện lại lệnh hoặc để người quan sát làm điều đó. Khá tiện dụng!

Bài viết này được dịch từ:[ Starting with Flutter: JSON & Serialization](https://medium.com/theotherdev-s/starting-with-flutter-json-serialization-bb72c582676e)