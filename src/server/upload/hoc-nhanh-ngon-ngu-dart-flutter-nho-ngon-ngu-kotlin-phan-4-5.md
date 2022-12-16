# 1. Lời mở đầu
Series này được viết nhằm mục đích giúp những bạn đã hiểu biết về ngôn ngữ Kotlin hoặc Java có thể học nhanh ngôn ngữ Dart để code Flutter. Nếu bạn chưa đọc những phần trước, bạn có thể đọc lại [tại đây](https://viblo.asia/s/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-dbZN76DvlYM)
# 2. Class
Class trong Dart khá giống Java. Quy ước đặt tên class cũng giống Kotlin. Dưới đây mình liệt kê các thành phần cơ bản của một class gồm property (Dart gọi là data), constructor, member funtions (hay còn gọi là method), biến static và hàm static.

![](https://images.viblo.asia/435eb725-2d90-45e8-a022-a14adfa85620.PNG)

* Muốn tạo biến hoặc hàm static thì thêm từ khóa static ở trước thôi
* Dòng code `User(this.id, this.name, this.age);` trong Dart nó tương đương với đoạn code này trong Kotlin
```dart
constructor(id: Int, name: String, age: Int) {
        this.id = id
        this.name = name
        this.age = age
}
```
* Nếu trong Class mà bạn không khai báo bất cứ một constructor nào cả, sẽ có một constructor rỗng (không có param) mặc định được tạo trong class của bạn và một khi bạn đã tạo ra được 1 constructor có param rồi thì constructor rỗng này sẽ biến mất. Tức là với code trên mà gọi `var user = User();` sẽ lỗi vì không tìm thấy constructor. Cái này giống y Kotlin với Java.
# 3. Data class
Cũng sử dụng đoạn code trên. Nếu thử print đối tượng user: `print(user);` ta sẽ nhận được output là `Instance of 'User'` chứ không phải là `User(id=1, name=Minh, age=18)` như ta vẫn thường gặp bên Kotlin. Lý do là vì:

> Dart không có hỗ trợ `data class` như Kotlin. 

Đắng (facepalm). Mà không hỗ trợ data class thì phải `overide` hàm `toString` một cách thủ công thôi.

![](https://images.viblo.asia/dd6ab4cb-8c54-444c-80ee-3a12fe6b14f5.PNG)

Bây giờ thì output đã giống Kotlin rồi:
```
User(id=1, name=Minh, age=18)
```
# 4. Named constructors
Dart cho phép chúng ta đặt tên constructors để tạo ra nhiều hơn 1 constructor. Mình thử tạo ra 3 constructor:

![](https://images.viblo.asia/30da2b8c-564c-40ca-92d9-8b66d9fd9d9c.PNG)

Output:
```
User(id=1, name=Minh, age=18)
User(id=0, name=null, age=18)
User(id=30, name=null, age=18)
```

Vì mấy biến `name` kia không có giá trị khởi tạo nên nó `null`. Dễ hiểu ha :D
# 5. Redirecting constructors
Thuật ngữ này bên Dart nó giống `Secondary constructors` bên Kotlin ấy. Nó giúp ta tạo 1 constructor từ một constructor khác trong cùng class.

![](https://images.viblo.asia/28ba80d9-6503-46d1-8284-e4316a3bbc4e.jpg)
# 6. Import
**Import file**

Dart xem mỗi file `.dart` như 1 `lib` riêng biệt. Điều đó có nghĩa là dù 2 file `.dart` nằm trong 1 package bạn cũng phải dùng `import`. Cái này khác Kotlin ha.

Bây giờ thử tạo ra 2 file `.dart`. Trong file `user.dart` mình tạo 1 class là `User`. Trong file .dart còn lại mình sẽ tạo hàm `main()` và khởi tạo đối tượng User. Kết quả Dart nó yêu cầu phải `import 'user.dart';`

![](https://images.viblo.asia/b908eaa5-59ee-4a07-a80d-7cd026449961.PNG)

Thử move file `user.dart` vào 1 folder có tên là `example` rồi xem kết quả. Bây giờ đường dẫn thư mục đã đổi thành `import 'example/user.dart';`

![](https://images.viblo.asia/f3630b64-1e7f-49ad-bfc5-74186cff1d04.PNG)

**Import thư viện core của Dart**

Import thư viện core của Dart. Cú pháp `import 'dart:xxx'`. Ví dụ thư viện math: `import 'dart:math'`

**Import lib từ dependency hoặc lib do mình code trong thư mục lib**

Cú pháp: `import 'package:file path'`. Ví dụ:
```dart
import 'package:english_words/english_words.dart';
```

**import as**

Giả sử như chúng ta có 2 lib là lib1 và lib2. Cả 2 lib đều có class Element thì chúng ta sẽ phân biệt bằng cách dùng `import ... as ... `:

![](https://images.viblo.asia/fbed1e46-a797-4f23-81c4-d783bfe4bd4a.PNG)

**Import một phần của lib**

Nếu chúng ta chỉ muốn lấy một phần trong lib, không muốn lấy tất cả. Có thể dùng `show/hide`

![](https://images.viblo.asia/bb8798a6-bd74-4c7e-9678-3fbb36747804.PNG)


# 7. Access modifier
Trong Dart không có access modifier (public, private, protected, internal) như Kotlin hay Java. Default là public hết. Nếu bạn muốn tạo một biến, hàm hoặc constructor mà private thì thêm ký tự underscore `_` trước cái tên.

Thử tạo thêm 1 file user.dart rồi tạo 1 class trong file này
```dart
class User {
  var id;
  var name;
  
  // biến private
  var _age;

  // hàm private
  void _printName() {
    print(name);
  }

  bool duTuoiXemPhim() => _age >= 18;
}
```
Giờ qua file main.dart để code hàm main:

![](https://images.viblo.asia/449cac8d-be7e-4976-93a3-aeb03b2f9b84.PNG)

Các bạn thấy nó báo lỗi không. Vậy là mình không thể gọi đến biến `_age` và hàm ` _printName()` vì nó đã private
# 8. Setter, getter
Đã có biến private thì cần phải có hàm setter, getter đúng không nào :D. Dart cung cấp cho chúng ta 2 keyword là `set` và `get` để làm điều này.

![](https://images.viblo.asia/3664720b-0168-4fe2-a188-a07b01df7708.PNG)

# 9. Factory constructor, Singleton
Dart cung cấp cho chúng ta `factory` keyword để tạo ra 1 constructor đặc biệt, khi sử dụng constructor này để tạo đối tượng nó sẽ không tạo ra một đối tượng mới nếu nó thấy đã có một đối tượng có sẵn rồi. Nói ngắn gọn là nó hoạt động giống như Singleton Pattern vậy. Vậy mình sẽ thử dùng factory để tạo ra một class `Singleton`.

```dart
class Singleton {
  static final Singleton _singleton = Singleton._internal();

  // factory constructor
  factory Singleton() {
    return _singleton;
  }

  // Như mình đã nói ở trên thì đây là private constructor 
  Singleton._internal();
}
```

Bây giờ thử test xem 2 đối tượng có cùng địa chỉ hay không?
```dart
void main() {
  var s1 = Singleton();
  var s2 = Singleton();

  // hàm identical giúp ta so sánh cùng địa chỉ hay ko?. Giống toán tử === bên Kotlin
  print(identical(s1, s2));  // in ra: true
}
```
# 10. Cascade notation
Cái này khá giống `apply` trong Kotlin. Cú pháp: `..`

![](https://images.viblo.asia/02c22fe0-de14-421d-9f8f-a2c0aa7fd5db.jpg)

Các bạn thấy Dart lỗi ở lệnh print không?. Đó là lý do vì sao mình nói là khá giống mà không nói giống hoàn toàn :v. `..` trong Dart nó chỉ gọi được instance method/property thôi còn hàm `print` thì nó chịu. Vậy nên chỉ cần chỉnh lại như thế này là được:

![](https://images.viblo.asia/989948dd-3184-4561-b164-7e235a3a6600.PNG)

# 11. Enum
Đặt tên Enum trong Dart cũng viết kiểu `UpperCamelCase` như Kotlin (VD: `TypeOfStudent`). Nhưng các enum values trong Dart viết style `lowerCamelCase` (VD: `goodStudent`), còn Kotlin viết chữ hoa kèm dấu `_` (VD: `GOOD_STUDENT`).

![](https://images.viblo.asia/aae0cb1e-ef51-42c8-9b2b-8475e98fb8dd.jpg)
# 12. Abstract class
Abstract class nó cũng giống class bình thường thôi, cũng có constructor, method và các property. Chỉ khác ở chỗ là nó có thêm abstract method (phương thức không có body). VD:

![](https://images.viblo.asia/093cc42d-74f8-498d-9595-10d8e6026cbe.PNG)
# 13. Kế thừa
Dart không hỗ trợ đa kế thừa, tức là một class chỉ có thể có tối đa một class cha. Chúng ta sử dụng từ khóa `extend` để kế thừa class cha. Class cha có thể là abstract class cũng có thể là class thường. Khi `extend` abstract class, chúng ta bắt buộc phải overide lại các abstract method (phương thức không có body).

![](https://images.viblo.asia/cd99947d-98e6-4bb0-97c5-7dc5c0db43dd.PNG)

Dart không có phân biệt `Interface` với `Class` như Kotlin mà nó xem mỗi class chính là interface luôn. Như vậy một class có thể kế thừa một class khác bằng từ khóa `implement`. Một class chỉ có thể `extend` một `class` nhưng có thể `implement` nhiều `class` khác. Trong Dart không có khái niệm `final class` như Kotlin, có nghĩa là tất cả class đều có thể được kế thừa.

![](https://images.viblo.asia/34f5ada3-4727-4182-a657-373d53c3da6c.jpg)

Vì Interface trong Kotlin là phương thức không thân nên khi override lại sẽ không bị duplicate code. Còn Dart thì code trong class `Dog` bị duplicate code với class mà nó implement là `Walkable`, `Flyable` như trong ảnh mình có note. Nếu như bạn chỉ muốn tái sử dụng code của lớp `Walkable`, `Flyable` mà không muốn override lại một hàm giống y chang như vậy (duplicate) thì bạn sử dụng `with` thay cho `implements`. 
## with
Bây giờ mình sẽ ví dụ đoạn code có sử dụng cả `extend`, `implements` và `with`:

![](https://images.viblo.asia/ba88b4b2-9db3-4a92-af64-61de44ec3951.PNG)

Sử dụng `with` bạn sẽ không bị ép buộc phải override hết function, property, có nghĩa là bạn thích thì bạn cũng có thể override lại còn không thì sẽ reuse lại code. Còn sử dụng `implements` thì buộc phải override lại hết, có nghĩa là sẽ có trường hợp bị duplicate code như ví dụ trên của mình :D

Cái `with` này trong Dart người ta gọi là `Mixins`. Thuật ngữ này có thể khá lạ lẫm với bạn nên mình xin trích nguyên văn từ doc là:

> Mixins are a way of reusing a class’s code in multiple class hierarchies.

Hiểu nôm na là một nơi cung cấp method và property cho lớp khác sử dụng mà không cần phải là cha cũng chúng.
## mixin
Dart cung cấp thêm cho chúng ta từ khóa `mixin`. Trong ví dụ Kế thừa ở trên, bạn thử replace `class Walkable` bằng `mixin Walkable` thì kết quả vẫn không đổi. `mixin` khác `class` thông thường ở chỗ:

* `mixin` không có constructor nên không thể tạo đối tượng.
* `mixin` chỉ có thể sử dụng để `implements` hoặc `with` chứ không thể `extends`
* `mixin` có thể giới hạn những class nào được phép sử dụng code của mình bằng từ khóa `mixin on`

## mixin on
Như mình đã nói ở trên, ta sử dụng mixin on để giới hạn những class nào được phép sử dụng code của mình. 

![](https://images.viblo.asia/d5d74b2f-6fa2-4373-89ae-fd1dc7cd9e39.PNG)

Nhìn vào ảnh trên có thể dễ hiểu rằng:

* `mixin XOnA` chỉ được dành cho những class nào là con của `class A` cụ thể là `class P`, tương tự như thế với `mixin YOnB`. 
* `class T` không được phép sử dụng `mixin YOnB` vì nó không phải là con của `class B`. 
* `class R` không được phép sử dụng `mixin XOnA` vì nó không phải là con của `class A`. Chính xác thì `class R` là con của `class Object` nên sửa lại thế này sẽ ok:

![](https://images.viblo.asia/5be85c9f-ce3d-4872-8509-0dc16dd2f70a.PNG)
# 14. Override toán tử
Trong Kotlin, mỗi class cho phép ta override hàm `equal` thì Dart overide toán tử `==`

![](https://images.viblo.asia/46c0e882-a4d0-46dc-94ef-8eea9892a058.jpg)

Ngoài toán tử `==`, bạn cũng có thể override các toán tử khác trong bảng sau nếu muốn

![](https://images.viblo.asia/6ca0f4b1-6a72-4f22-95ae-aa06d430ae08.PNG)
# Kết luận
Đến giờ phút này đây thì các bạn đã có thể code Dart được rồi đấy :D. Hy vọng các bạn tiếp tục theo dõi những phần tiếp theo :D

Tham khảo: https://dart.dev/guides

https://medium.com/flutter-community/https-medium-com-shubhamhackzz-dart-for-flutter-mixins-in-dart-f8bb10a3d341

https://medium.com/@manoelsrs/dart-extends-vs-implements-vs-with-b070f9637b36

Đọc tiếp phần 5: [Học nhanh ngôn ngữ Dart (Flutter) nhờ ngôn ngữ Kotlin (Phần 5)](https://viblo.asia/p/hoc-nhanh-ngon-ngu-dart-flutter-nho-ngon-ngu-kotlin-phan-5-Ljy5Vqjolra)