## Generics
Nếu bạn xem tài liệu API cho kiểu mảng cơ bản - List, bạn sẽ thấy kiểu đó được định nghĩa List<E>. Các ký hiệu <...> cho biết List là một kiểu chung (hoặc được tham số hóa ). Theo quy ước , hầu hết các biến loại có tên đơn, chẳng hạn như E, T, S, K và V.

### Tại sao nên sử dụng kiểu generic?
Generics thường được yêu cầu cho các kiểu đòi hỏi sự an toàn, nhưng chúng có nhiều lợi ích hơn là chỉ cho phép mã của bạn chạy:

* Chỉ định đúng các kiểu chung dẫn đến mã được tạo tốt hơn.
* Bạn có thể sử dụng generic để giảm trùng lặp mã.
    
Nếu bạn có ý định cho một List chỉ chứa các String, bạn có thể khai báo nó dưới dạng List<String>(đọc List đó dưới dạng List của Chuỗi). Bằng cách đó, bạn, các lập trình viên đồng nghiệp và các công cụ của bạn có thể phát hiện ra rằng việc gán một object không phải kiểu String vào List có thể là một sai lầm. Đây là một ví dụ:

```
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```
Một lý do khác để sử dụng generic là để giảm trùng lặp mã. Generics cho phép bạn chia sẻ một giao diện duy nhất và triển khai giữa nhiều kiểu, trong khi vẫn tận dụng phân tích tĩnh. Ví dụ: giả sử bạn tạo giao diện để lưu trữ đối tượng:

```
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```
Bạn phát hiện ra rằng bạn muốn có một phiên bản dành riêng cho giao diện này, vì vậy bạn tạo một giao diện khác:

```
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```
Sau đó, bạn quyết định bạn muốn có một phiên bản số cụ thể của giao diện này. Vậy là bạn đã có ý tưởng.

Các kiểu chung có thể giúp bạn tiết kiệm những rắc rối khi tạo tất cả các giao diện này. Thay vào đó, bạn có thể tạo một giao diện duy nhất có kiểu chung:

```
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```
Trong mã này, T là kiểu độc lập. Đó là một place holder mà bạn có thể nghĩ là một kiểu mà developer sẽ xác định sau này.

### Sử dụng collection literals
List, Set và Map có thể được tham số hóa. Việc tham số hóa giống như bạn đã thấy ở trên, ngoại trừ việc bạn thêm (cho List và Set) < type > hoặc (cho Map) < keyType , valueType > trước dấu ngoặc mở. Dưới đây là một ví dụ về việc sử dụng các chữ được gõ:

```
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```
### Sử dụng các kiểu chung với các hàm khởi tạo
Để chỉ định một hoặc nhiều kiểu khi sử dụng hàm tạo, hãy đặt các kiểu trong ngoặc nhọn ( <...>) ngay sau tên lớp. Ví dụ:

```
var nameSet = Set<String>.from(names);
```
Đoạn mã sau tạo Map có các khóa nguyên và giá trị của kiểu View:

```
var views = Map<int, View>();
```
### Collection chung và các kiểu chúng chứa
Trong Dart, kiểu generic được thống nhất, có nghĩa là chúng mang theo thông tin về kiểu của mình runtime. Ví dụ: bạn có thể kiểm tra kiểu của Collection:

```
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```
> Lưu ý: Ngược lại, generic trong Java sử dụng *erasure* , có nghĩa là các tham số kiểu chung được loại bỏ khi chạy. Trong Java, bạn có thể kiểm tra xem một đối tượng có phải là List hay không, nhưng bạn không thể kiểm tra xem liệu đó có phải là một List<String>.

### Hạn chế kiểu chung
Khi thực thi một kiểu chung, bạn có thể muốn giới hạn các kiểu tham số của nó. Bạn có thể làm điều này bằng cách sử dụng *extends*.

```
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```
Bạn có thể sử dụng *SomeBaseClass* hoặc bất kỳ lớp con nào của nó làm đối số chung:

```
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```
Bạn cũng có thể chỉ định không có đối số chung:

```
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```
Chỉ định bất kỳ kiểu nào không phải con của SomeBaseClass sẽ gây một lỗi:

```
var foo = Foo<Object>();
```
### Sử dụng phương thức chung
Ban đầu, sự hỗ trợ kiểu chung của Dart chỉ giới hạn trong các lớp. Một cú pháp mới hơn, được gọi là các phương thức chung , cho phép các đối số kiểu chung trên các phương thức và hàm:

```
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```
Ở đây, tham số kiểu chung trên first( <T>) cho phép bạn sử dụng đối số loại T ở một số vị trí:

* Trong kiểu trả về của hàm ( T).
* Trong kiểu của một đối số ( List<T>).
* Trong loại biến cục bộ ( T tmp).
Để biết thêm thông tin về generic, xem [Sử dụng Phương thức Chung](https://github.com/dart-lang/sdk/blob/master/pkg/dev_compiler/doc/GENERIC_METHODS.md).

Nguồn https://dart.dev/guides/language/language-tour#generics