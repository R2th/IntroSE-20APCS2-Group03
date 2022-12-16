Bài viết này chỉ tổng hợp lại 1 số nội dung và ví dụ điển hiện của null safety trong Dart 2.0. [Chi tiết thì các bạn xem tại đây nhé!](https://dart.dev/null-safety)
### 1. Null safety là gì?
Khi sử dụng `Null safety` thì các biến trong chương trình sẽ không được gán giá trị mặc định là `null` trừ khi chúng ta chỉ rõ nó bằng `null`.



|Trước Dart 2.0 | Dart 2.0 |
| -------- | -------- |
|    ![](https://images.viblo.asia/b02f903a-3db4-4d54-b97a-a49d7f117ccb.png)|      ![](https://images.viblo.asia/30d1ef7f-7c4c-4594-ba4f-e65f22de95f5.png).|
|Trước phiên bản 2.0, Dart là ngôn ngữ nullability. Theo đó, null sẽ là kiểu con (subtype) của mọi kiểu. Tức là tất cả các kiểu số nguyên int, số thực double, danh sách List… đều chấp nhận giá trị null.|Từ phiên bản 2.0 thì Dart là ngôn ngữ hỗ trợ null safety. Theo đó, kiểu Null đã tách ra, không còn là kiểu con của các kiểu khác nữa. Do đó, khi bạn khai báo một biến là non-nullable (ví dụ kiểu int, kiểu String) mà lại gán cho chúng giá trị null thì chương trình sẽ báo lỗi.|




1 ví dụ dễ thấy nhất của việc sử dụng null safety:

- **~~Null safety~~**

```dart
String name; // hoặc String name = null
final uppercase = name.toUppecase();
=> sẽ xảy ra exception tại runtime
```

- **Null safety**
 ```dart
 String name = null
 final uppercase = name.toUppecase();
 => sẽ xảy ra exception tại compile time
 ```
 
### 2. Sử dụng null safety
Trong `pubspec.yaml`
```java
environment:
  sdk: ">=2.12.0 <3.0.0"
```

#### 2.1. Nullable types
Instance fields trong class phải được gán giá trị nếu nó không phải là nullable type:
```java
class Foo {
  String word; // forbidden (không được dùng)

  String sentence = 'Hello, World!'; // allowed
}
```

Để có thể sử dụng `nullable types` thì bạn cần phải thêm `?` sau variable type:
```java
class Foo {
  String word; // forbidden

  String? sentence; // allowed
}
```

Biến nullable không cần phải được khởi tạo trước khi nó được sử dụng. Nó được khởi tạo là null theo mặc định:
```java
void main() {
  String? word;
  
  print(word); // prints null
}

```

#### 2.2. Null checks
Khi sử dụng null safety áp dụng cho đoạn code sau:
```java
void main() {
  setName(null);
}

void setName(String name) {
  name.toUpperCase();
}
```
Bạn đoán xem kết quả sẽ như nào? Compile error sẽ xuất hiện ngay lập tức.
Đoạn code trên sẽ cần sửa thành:
```java
void main() {
  setName(null);
}

void setName(String? name) {
  if (name == null) return;

  name.toUpperCase();
}
```

#### 2.3. Convert Type to Type?
Bạn có thể chuyển kiển non nullable thành nullable như sau:
```java
void main() {
  String name = 'Sarah Abs';
  
  String? newName = name;
}
```

#### 2.4. Convert Type? to Type
Vậy vẫn đoạn code trên nếu convert ngược lại từ **Type? to Type** thì sao? Có phải 1 số bạn sẽ làm như sau:
```java
void main() {
  String? name = null;

  if (name != null) {
    String newName = name;
  }
}
-> tránh sử dụng cách này. Bạn có thể tham khảo cách viết bên dưới.
```
Vậy cách này thì sao?
```java
//Chúng ta sẽ add thêm defaul value cho name
void main() {
  String? name = null;

  String newName = name ?? 'Sarah Abs'; 
}
```

Nếu như ai biết kotlin thì bạn cũng sẽ biết là sử dụng kí tự ! ở phía sau một biểu thức để thực thi biểu thức đó và chuyển (cast) giá trị nhận được sang kiểu non-nullable. Dart 2.0 cũng tương tự như vậy. Nếu thêm ! vào sau variable a thì sẽ throw runtime error nếu variable a null, và nếu variable a không null thì biến đó có thể sử dụng như 1 biến non-nullable. VD: 
```java
// Issue
void main() {
  String? name = null;

  String newName = name!;  => runtime error
}
```
Fix it
```java
void main() {
  bool isNameNull = true;
  String? name = null;

  if (!isNameNull) {
    String newName = name!;
  }
}
```

#### 2.5. Late init
Cũng giống kotlin. Dart cũng code late init (khai báo biến trễ, biến muộn). Đôi khi variable phải là kiểu non-nullable, nhưng chúng không thể được gán giá trị ngay lập tức. Đối với những trường hợp như vậy, hãy sử dụng từ khóa late.
```java
  late String name;
  @override
  void initState() {
    super.initState();

    name = 'Sarah Abs';
  }
```

Ngoài ra còn `late final`, cũng giống như late, tuy nhiên, variable chỉ được gán giá trị 1 lần do sử dụng từ khóa final.

### Tham khảo
[NULL SAFETY DART / NULL SAFETY FLUTTER LÀ GÌ?](https://o2.edu.vn/null-safety-dart-null-safety-flutter-la-gi/)