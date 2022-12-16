# Lời đầu
Qua bao nhiêu tháng dùi mài kinh sử chinh chiến Flutter. Bản thân tự cảm thấy chán nản với việc phải đi decode từ json thành object mỗi lần request api về.
Mọi mê, đâu đầu, tuyệt vọng, nên mình đã đi đến một quyết định đó là, thử viết cái thứ gì đó zui zui trong thời gian end task :)). Với bản tính lười biếng, ghét cay ghét đắng
những công việc nhàm chán nên là thôi, lôi em decode json ra xử đẹp để ngày sau bớt đổ mồ hôi.

# Đặt vấn đề
Hiện nay bạn biết đó, khó mà tìm ra được một ứng dụng chỉ chạy local mà không cần giao tiếp với server. Cho nên dù muốn hay không JSON vẫn là thứ bạn gặp như cơm bữa.
Cơ bản thì chúng ta có hai cách để convert một JSON thành Object:
1. Manual serialization (Convert thủ công, hay còn gọi là chạy bằng cơm :D)
2. Automated serialization (Convert tự động)
Tùy thuộc vào sự phức tạp của dữ liệu mà lựa chọn cách thức triển khai cho phù hợp, tuy nhiên có một nỗi đau mang tên optimize size trong Flutter mang đến :((
Không giống như Java, Swift có thể đọc được tên thuộc tính trong Object, Flutter đã disable tính năng đó dẫn đến chúng ta khó có thể implement được các thư viện như Gson...
```
Is there a GSON/Jackson/Moshi equivalent in Flutter?
The simple answer is no.

Such a library would require using runtime reflection, which is disabled in Flutter. Runtime reflection interferes with tree shaking, which Dart has supported for quite a long time.
With tree shaking, you can “shake off” unused code from your release builds. This optimizes the app’s size significantly.
```

Mặc dù chúng ta không thể sử dụng tính năng runtim reflection với Flutter, một số thư viện cung cấp cho chúng các API dễ sử dụng tương tự nhưng thay vào đó dựa trên việc tạo mã. 
Đó chính là generate code. Nghe đến 2 từ generate code mà đau nhói con tim :((
Ý tưởng đằng sau gen code này chính là đọc file class khai báo của bạn, lọc ra properties trong đó và implement một class khác thực hiện chức năng decode, encode json. Cuối cùng tạo một tham chiếu từ class gốc tới
class được gen.

Nghe thì có vẻ hợp lý, nghe cũng thích đây, cơ mà mình lười gõ lệnh để gen lắm :(( Mình vẫn muốn nó làm được như Gson, Codable cơ.

# Ý tưởng
Nghĩ kỹ thì việc decode bằng tay tốn khá nhiều thời gian và công lực, decode bằng gencode thì hơi lười, cũng không ưa cho lắm. Thôi thì trong cái lười nó có cái ý tưởng.
Một cơn gió thoáng qua, chợt nghĩ. Ơ, giờ không đọc được properties thì mình chỉ cần viết một lần cũng đỡ hơn convert bằng tay. Tuy không thông minh được như Gson hay Codable nhưng cũng đỡ được phần nào công lực.
Json thực chất có 2 loại: Array, hoặc Object
Array thì mình sẽ bàn sau, nhưng với Object thì nó bản chất là dữ liệu dạng: Key => Value

![](https://images.viblo.asia/81f71519-40b8-4ea7-b4a2-8a050577d873.png)

Key thì luôn là kiểu String rồi, giờ việc của mình là xác định ra được bao nhiêu loại Value của nó để convert cho đúng kiểu dữ liệu.
Value trong JSON thì một là primary type: Số hoặc Chuỗi
Loại thứ 2 là Array: Mảng này có thể là mảng của Primary Type hoặc là một mảng các Json Object khác, và cũng có thể là mix giữa 2 loại đó. (Loại mix khó quá, xử lý sau, chắc cũng hiếm khi gặp)

Thì dựa vào phân tích trên chúng ta có thể triển khai ý tưởng thành code như sau:
### 1. Tạo ra một class abstract để convert key => value

```
abstract class OriginalCodable<T> {
  String key;
  T? value;
  OriginalCodable({required this.key, this.value});

  dynamic fromJson(dynamic) => null;
}
```

Nhiệm vụ abstract này định nghĩa 2 thuộc tính: String key, và T value (T là một generic type, T có thể null)
Tiếp theo là định nghĩa một hàm fromJson() hàm này nhận vào một giá trị dynamic và trả về một giá trị dynamic.

### 2. Tạo một lớp Codable dùng để convert Primary Type

```
abstract class Codable<T> extends OriginalCodable<T> {
  Codable({required String key, T? value}) : super(key: key, value: value);

  @override
  T? fromJson(dynamic) {
    if (dynamic != null) {
      value = dynamic as T;
    } else {
      value = null;
    }
    return value;
  }
}
```

Đơn giản chỉ là implement lại method fromJson và ép kiểu dữ liệu về đúng với type mong muốn.

### 3. Tạo một lớp CodableObject dùng để convert Object Type trong Json

```
class CodableObject<T extends Encodable> extends OriginalCodable<T> {
  CodableObject({required String key, required T value})
      : super(key: key, value: value);

  @override
  T? fromJson(dynamic) {
    if (dynamic != null) {
      if (value is Encodable) {
        (value as Encodable).decode(dynamic);
      } else {
        throw ArgumentError("Can not convert Object not extends from Encodable.");
      }
    } else {
      value = null;
    }
    return value;
  }
}
```

Cái này là để convert một Object Json về một Object Dart thôi.

### 4. Lớp CodableList dùng để convert một Array

```
typedef Instance<T extends Decodable> = T Function();

class CodableList<T extends Decodable> extends OriginalCodable<List<T>> {
  Instance<T> instance;
  CodableList({required String key, required this.instance, List<T>? value})
      : super(key: key, value: value);

  @override
  List<T>? fromJson(dynamic) {
    if(dynamic == null) {
      return null;
    }else if (dynamic != null && dynamic is List) {
      List<T> list = [];
      for (var item in dynamic) {
        final element = instance()..decode(item);
        list.add(element);
      }
      return list;
    } else {
      throw ArgumentError("Value is not a List");
    }
  }
}
```

Lớp này đơn giản là decode lại các object trong json array

### 5. Tạo ra các kiểu dữ liệu để tiện sử dụng

```
class Stringer extends Codable<String> {
  Stringer({required String key, String? value}) : super(key: key, value: value);
}

class Interger extends Codable<int> {
  Interger({required String key, int? value}) : super(key: key, value: value);
}

class Doubler extends Codable<double> {
  Doubler({required String key, double? value}) : super(key: key, value: value);
}

class Boolean extends Codable<bool> {
  Boolean({required String key, bool? value}) : super(key: key, value: value);
}

// Only for primary data type
class ListCodablePrimary<P> extends Codable<List<P>> {
  ListCodablePrimary({required String key, List<P>? value}) : super(key: key, value: value);
}

// Only for Object extends Encodable
class ListCodableObject<P extends Encodable> extends CodableList<P> {
  ListCodableObject({required String key, required Instance<P> instance, List<P>? value})
      : super(key: key, instance: instance, value: value);
}
```

Các bạn đừng cười tôi đặt tên hơi kỳ ghê nhé :))

### 6. Tạo lớp Encode và Decode

```
class Decodable<T> {
  List<OriginalCodable> values = [];
  List<OriginalCodable> properties() {
    return [];
  }

  void decode(Map json) {
    values = properties();
    for (var item in values) {
      if (json.containsKey(item.key)) {
        item.value = item.fromJson(json[item.key]);
      }
    }
  }

  T? createInstance() => null;
}

abstract class Encodable extends Decodable {
  Map toJson() {
    var json = {};
    for (var item in values) {
      if (item is Encodable) {
        json[item.key] = (item.value as Encodable).toJson();
      } else if (item is CodableObject) {
        json[item.key] = (item.value as Encodable).toJson();
      } else if (item is CodableList) {
        json[item.key] = (item.value as List).map((e) => (e as Encodable).toJson()).toList();
      } else {
        json[item.key] = item.value;
      }
    }
    return json;
  }
}
```

Decode có nhiệm vụ chuyển Json thành Object trong Flutter
Encode có nhiệm vụ ngược lại là chuyển Object thành Json.
Chú ý: những trường muốn decode, hoặc encode phải được khai báo trong properties functions.

# Ví dụ cụ thể
### 1. Test độ khó level tiểu học
Khai báo một lớp User gồm các properties như sau: fullname, age, address

```
class User extends Encodable {
  var fullname = Stringer(key: "fullname");
  var age = Interger(key: "age");
  var address = Stringer(key: "address");

  @override
  List<OriginalCodable> properties() {
    return [fullname, address, age];
  }
}
```

Bạn có thể nhìn thấy code cực kỳ gọn gàng và sạch đẹp, không giống như thằng chạy bằng cơm :((
Kết quả:
```
  final user = User();
  user.decode({
    "fullname": "Nguyen Van A",
    "age": 32,
    "address": "271 Nguyen Van Linh",
  });

  print(user.fullname.value); // Nguyen Van A
```

### 2. Tăng độ khó cho game

Mình sẽ tiến hành đi convert một Object phức tạp hơn như sau:
1. Dog: 
ps:// Không phải doggy :D)
```
class Dog extends Encodable {
  var name = Stringer(key: "name");
  var age = Interger(key: "age");
  var brand = Stringer(key: "brand");
  var colors = ListCodablePrimary<String>(key: "colors");

  @override
  List<Codable> properties() {
    return [name, age, brand, colors];
  }

  @override
  Dog createInstance() {
    return Dog();
  }

  String? get getName => name.value;
  set setName(String newName) => name.value = newName;
}
```

2. Cat
```
class Cat extends Encodable {
  var name = Stringer(key: "name");
  var age = Interger(key: "age");
  var colors = ListCodableObject<ColorCat>(
    key: "colors",
    instance: ColorCat().createInstance,
  );

  @override
  List<OriginalCodable> properties() {
    return [name, age, colors];
  }
}
```

3. ColorCat
```
class ColorCat extends Encodable {
  var id = Interger(key: "id");
  var color = Stringer(key: "color");

  @override
  List<OriginalCodable> properties() {
    return [id, color];
  }

  @override
  ColorCat createInstance() {
    return ColorCat();
  }
}
```

4. ListDog
```
class ListDog extends Encodable {
  var phone = Stringer(key: "phone");
  var address = Stringer(key: "address");
  var shop = Stringer(key: "shop");
  var cat = CodableObject<Cat>(key: "cat", value: Cat());
  var dogs = ListCodableObject<Dog>(
    key: "dogs",
    instance: Dog().createInstance,
  );

  @override
  List<OriginalCodable> properties() {
    return [phone, address, shop, dogs, cat];
  }

  String? get getPhone => phone.value;
  set setPhone(String newPhone) => phone.value = newPhone;
}
```

5. Chạy chương trình
```
var listDog = ListDog();
  listDog.decode({
    "phone": "324242524",
    "address": "271 Nguyen Van Linh",
    "shop": "Shop thu cung",
    "cat": {
      "name": "Cat 1",
      "age": 2,
      "colors": [
        {
          "id": 1,
          "color": "Red",
        },
        {
          "id": 2,
          "color": "White",
        }
      ]
    },
    "dogs": [
      {
        "name": "Dog 1",
        "age": 1,
        "brand": "Bec de",
        "colors": ["xanh", "vang", "do"]
      },
      {
        "name": "Dog 2",
        "age": 2,
        "brand": "Bec de",
        "colors": ["xanh", "vang", "do"]
      },
      {
        "name": "Dog 3",
        "age": 3,
        "brand": "Bec de",
        "colors": ["xanh", "vang", "do"]
      }
    ]
  });
```

Mình sẽ để các bạn chạy thử xem ra kết quả như mong muốn không nhé :))

### Tổng kết
Bài viết này nhằm mục đích chia sẻ kiến thức vui vẻ, nếu bạn nào thấy hay thì có thể ủng hộ mình :)) Còn không thì các bạn đừng ném đá nhé.
Mình không phải là một chuyên gia, nếu có gì thiếu sót, các bạn có thể đóng góp ý kiến dưới phần comment, mình sẽ đọc và lắng nghe ý kiến của các bạn.

Xin cảm ơn bạn đã bớt chút thời gian đọc đến đây, xin cảm ơn và chào thân ái.