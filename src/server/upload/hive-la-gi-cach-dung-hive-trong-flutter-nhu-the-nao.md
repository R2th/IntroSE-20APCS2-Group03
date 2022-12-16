# Hive là gì ?
  Hive là một dạng lưu trữ local database, Hive được tổ chức dưới dạng các Box. Mỗi Box có thể coi là tương ứng với một Table của SQL nhưng là lưu trữ dữ liệu dạng không có cấu trúc (NoSQL ) tức là dạng `< key, value >` và có thể lưu trữ bất cứ kiểu dữ liệu nào.
  
 # Mở Box trong Hive
Để sử dụng một Box thì bạn phải mở Box ra thì mới dùng được nha. :D 

```Dart
var box = await Hive.openBox<E>('testBox');
```
Phương thức trên cực kỳ hữu ích trong Flutter vì nó có thể gọi bất cứ đâu mà không cần phải truyền giữa các Widgets.

Nhưng nếu Box đã được mở rồi thì đoạn code ở trên sẽ bị vô hiệu và sẽ các tham số bên trong cũng bị bỏ qua.

Một khi đã mở Box lên thì có thể tiến hành Read, Write, Delete các phần tử trong đó.

Các tham số mà một Box sẽ có như sau:
| Parameter| Description| 
| -------- | -------- | 
| name    | Tên của Box đã chỉ định vị trí lưu trữ và được sử dụng để kiểm tra xem hộp đã tồn tại chưa.     |
| encryptionKey   | Dùng để chứa dữ liệu mã hoá và giải mã của Box nhưng phải là mảng 32 byte.    |
| keyComparator   | Theo mặc định, các khóa được sắp xếp theo bảng chữ cái. Thông số này cho phép bạn cung cấp một thứ tự sắp xếp tùy chỉnh theo ý bạn.    |
| compactionStrategy    | Chỉ định quy tắc nén của bạn và `Hive` sẽ nén theo quy tắc đó.   |
| crashRecovery    | Nếu ứng dụng của bạn bị tắt trong khi hoạt động ghi đang chạy, mục cuối cùng có thể bị hỏng. Mục này sẽ tự động bị xóa khi ứng dụng bắt đầu lại. Nếu bạn không muốn hành vi này, bạn có thể vô hiệu hóa nó.     |
|path    | Theo mặc định, các Box được lưu trữ trong thư mục được cung cấp `Hive.init ()`. Với tham số này, bạn có thể chỉ định vị trí nơi Box sẽ được lưu trữ.    |
| byte    | Bạn có thể cung cấp Box ở dạng nhị phân và mở Box trong bộ nhớ.    |
| E    | Tham số loại tùy chọn chỉ định loại của các giá trị trong Box.     |

# Read, Write, Delete trong Hive
## Read trong Hive
Vì các Box trong Hive sử dụng kiểu truy vấn <key, value> nên chỉ cần gọi key thì có thể get ra dữ liệu tương ứng:
```Dart
// Mở Box people.
var box = Hive.box('people');

// get giá trị theo key là name.
String name = box.get('name');

//get giá trị theo key là birthday.
DateTime birthday = box.get('birthday');
```
Nếu khóa không tồn tại,  nó sẽ trả về null. Theo tùy chọn, bạn có thể chỉ định defaultValue được trả về trong trường hợp khóa không tồn tại.

```Dart
double height = box.get('randomKey', defaultValue: 17.5);
```

## Write trong Hive

Write vào Box  giống như viết vào Map<key, value>. Tất cả các key phải là chuỗi ASCII có độ dài tối đa 255 ký tự hoặc số nguyên 32 bit không dấu.

```Dart
var box = Hive.box('myBox');

box.put('name', 'Paul');

box.put('friends', ['Dave', 'Simon', 'Lisa']);

box.put(123, 'test');

box.putAll({'key1': 'value1', 42: 'life'})
```
Một thế mạnh của Hive là việc cập nhật được diễn ra ngay lập tức mà không cần phải dùng đến `async` trong Flutter, còn nếu muốn chắc chắn get được dữ liệu thì bạn có thể thêm `await` của lớp `Future`.
```Dart
var box = await Hive.openBox('box');

box.put('key', 'value');
print(box.get('key')); // value

var lazyBox = await Hive.openLazyBox('lazyBox');

var future = lazyBox.put('key', 'value');
print(lazyBox.get('key')); // null

await future;
print(lazyBox.get('key')); // value
```
Với `lazyBox` nếu việc get dữ liệu không thành công thì sẽ trả về `null` còn nếu thêm await với `future` sẽ trả về giá trị cũ.

## Delete trong Hive
Hive cung cấp cho ta các phương thức để thực viện việc Delete.
```Dart
contactsBox.deleteAt(index);
contactsBox.deleteAll(interible);
```
# Hive trong app Flutter đơn giản
Mình sẽ viết một app có tính năng là:

* Thêm mới một liên hệ,
* Xoá liên hệ theo index.
* Hiển thị danh sách liên hệ đã lưu.
##  Add thư viện Hive
Vào file `pubspec.yaml` và thêm vào đoạn bên dưới.

```Dart
 dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.3
  hive: ^1.4.1+1
  hive_flutter: ^0.3.0+2
  path_provider: ^1.6.5

dev_dependencies:
  hive_generator: ^0.7.0+2
  build_runner: ^1.10.0
  flutter_test:
    sdk: flutter

dependency_overrides:
  quiver: 2.1.3
```

## Init Hive vào trong App 
Hive cần phải được khởi tạo,  chỉ ra path trong thư mục nào để nó lưu trữ dữ liệu. Tốt nhất là khởi tạo Hive ngay trong phương thức `main()`
```Dart
void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  final appDocumentDirectory = await path_provider.getApplicationDocumentsDirectory();
  Hive.init(appDocumentDirectory.path);
  runApp(MyApp());
}
```

Và để ngăn chặn dữ liệu không cần thiết load lên RAM khi thoát app thì nên close() Hive lại.
```Dart
  @override
  void dispose() {
    Hive.close();
    super.dispose();
  }
```

Tạo một lớp `Contacts`
```Dart
class Contact {
  final String name;
  final int age;

  Contact(this.name, this.age);
}
```

Tạo một Widgets ContactPage nơi sẽ hiển thị ra danh sách các liên hệ đã lưu.
```Dart
class ContactPage extends StatelessWidget {
  const ContactPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page Hive'),
      ),
      body: Column(
        children: <Widget>[Expanded(child: _buildListView()), NewContactForm()],
      ),
    );
  }

  Widget _buildListView() {
    return WatchBoxBuilder(
      box: Hive.box('contacts'),
      builder: (context, contactsBox) {
        return ListView.builder(
          itemCount: contactsBox.length,
          itemBuilder: (BuildContext context, int index) {
            final contact = contactsBox.getAt(index) as Contact;

            return ListTile(
              title: Text(contact.name),
              subtitle: Text(contact.numberCall.toString()),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  IconButton(
                    icon: Icon(Icons.refresh),
                    onPressed: () {
                       //Sửa tên liên hệ.
                      contactsBox.putAt(
                          index,
                          Contact('${contact.name}*', contact.numberCall)
                      );
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () {
                    //Xoá liên hệ theo index.
                      contactsBox.deleteAt(index);
                    },
                  )
                ],),
            );
          },
        );
      },
    );
  }
}
```
`WatchBoxBuilder()` là một Widgets của package flutter_hive dùng để cập nhật UI khi có sự thay đổi của Box.

Để thêm một liên hệ mới ta tạo thêm một Widgets `new_contact_form.dart`

```Dart
...
void addContact(Contact contact) {
  final contactsBox = Hive.box('contacts');
  // phương thức add() sẽ tự động tăng key lên +1 mỗi khi có liên hệ được thêm vào.
  contactsBox.add(contact);
}
...
RaisedButton(
  child: Text('Add New Contact'),
  onPressed: () {
    _formKey.currentState.save();
    final newContact = Contact(_name, int.parse(_age));
    addContact(newContact);
  },
)
...
```

Vì Hive yêu cầu phải lưu dữ liệu dưới dạng Json nên phương thức contactsBox.add() muốn thực hiện được thì ở hàm `main()` ta phải thêm vào một `Adapter` nữa.

```Dart
void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  final appDocumentDirectory = await path_provider.getApplicationDocumentsDirectory();
  Hive.init(appDocumentDirectory.path);
  
  Hive.registerAdapter(ContactAdapter());
  
  runApp(MyApp());
}
```

Các bước để tạo ra Adapter:

Vào class Contact thêm vào các annotation, HiveType sẽ dành cho class và HiveField sẽ dành cho properties của class đó.
```Dart
//chỉ ra path để lưu Adapter
part 'contact.g.dart';

@HiveType(typeId: 0)
class Contact {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final int numberCall;

  Contact(this.name, this.numberCall);

}
```

Gõ lệnh sau để flutter sẽ tự sinh ra một file adapter cho chúng ta:

`> flutter packages pub run build_runner build`

Kết quả là ta có được một file `contact.g.dart` có nội dung như sau:
```Dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contact.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class ContactAdapter extends TypeAdapter<Contact> {
  @override
  final typeId = 0;

  @override
  Contact read(BinaryReader reader) {
    var numOfFields = reader.readByte();
    var fields = <int, dynamic>{
      for (var i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Contact(
      fields[0] as String,
      fields[1] as int,
    );
  }

  @override
  void write(BinaryWriter writer, Contact obj) {
    writer
      ..writeByte(2)
      ..writeByte(0)
      ..write(obj.name)
      ..writeByte(1)
      ..write(obj.numberCall);
  }
}

```

Cuối cùng build lên điện thoại để test nào:
![](https://images.viblo.asia/0d511121-ea74-4492-af49-a5dab1f144f7.png)


Vậy là mình đã giới thiệu xong về Hive. Cảm ơn mọi người đã xem hy vọng giúp ích được cho mọi người.


Link code
>  https://github.com/nghiaptx-2124/HiveAppDemo

Các bạn có thể đọc thêm ở đây :
>  https://docs.hivedb.dev/#/basics/hive_in_flutter?id=initialize-flutter-apps


>  https://resocoder.com/2019/09/30/hive-flutter-tutorial-lightweight-fast-database/#WatchBoxBuilder_Widget