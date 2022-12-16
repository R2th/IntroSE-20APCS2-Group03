Xin chào các bạn, trong thời gian tìm hiểu về Dart thì mình có note lại những thứ mình học được ra đây để chia sẻ cho mọi người, và để mình có thể xem lại bất kỳ khi nào cần. Những thứ cơ bản mà mọi ngôn ngữ đều có đó là biến, các kiểu dữ liệu và hằng số. Dưới đây mình xin trình bày chút xíu về cái mớ mình kể trên! Let's go!

![](https://images.viblo.asia/1fdb8538-2e66-440c-9f34-d3105901df32.jpg)

# 1. Biến
Trong Dart mọi thứ đều là object. Đã là object thì luôn phải là instance của một class nào đó. Vì tất cả là đều là object nên dù là số, chữ hay bất kể loại dữ liệu nào thì giá trị mặc định của nó đều là null. Nhờ vậy, mọi biến số trong Dart đều là reference type. Cũng chính vì thế mà Dart có một loại biến *dynamic* chấp nhận mọi kiểu dữ liệu.

Đơn giản thì khi tạo ra biến ta dùng từ khóa *var* với cú pháp như sau: 
```
var a = "Learn Dart";
```

Bạn cũng có thể khai báo và chỉ định kiểu dữ liệu cụ thể cho nó luôn:
```
   String  s     = 'Chuỗi ký tự';
   double  d     = 1.1234; 
   int     i     = 1;   
   bool    found = true;
```
   
Với *dynamic* như đã giới thiệu thì nó có thể chấp nhận gán vào nó nhiều loại kiểu: 
```
dynamic dyn = 123;             
dyn = "Dynamic";               
dyn = 1.12345;
```


# 2. Các kiểu dữ liệu

Kiểu dữ liệu hỗ trợ là điểm cơ bản nhất cần biết khi nói về một ngôn ngữ lập trình. Các kiểu dữ liệu cơ bản được hỗ trợ trong Dart: Numbers, Strings, Booleans, Lists, Maps, Sets, Runes, Symbols.

- **Numbers**: được dùng để biểu diễn dạng số. Trong đó có 2 kiểu *int* được biểu diễn tối đa 64-bit phụ thuộc vào phần cứng và *double* đều được biểu diễn bởi 64bit. 
-**Integer** biểu diễn dạng số nguyên với từ khóa *int*. Đổi chữ số thành số nguyên:  `int numint = int.parse("120");`   
- **Double** biểu diễn dạng số thực dấu phẩy động với từ khóa *double*. Đổi chuỗi thành số thực: `var abc = double.parse("123.123");`
    Cả số nguyên và số thực đều có các phép toán để tạo thành biểu thức (cộng, trừ , nhân, chia). Trên các đối tượng số này có các phương thức để chuyển đổi kiểu *toString()*, *toInt()*, *toDouble()*.
- **Strings**: được dùng để biểu diễn chuỗi ký tự. Nó được nhập vào trong cặp nháy đơn ' ' hoặc nháy kép " ". Dùng ký hiệu  \\', \\'  để biểu diễn ký tự nháy đơn ( ' ' )  trong chuỗi: 
   ```
    String a = 'Chuỗi ký tự \'\' (nháy đơn)';  // Chuỗi ký tự '' (nháy đơn)
    String b = "Chuỗi ký tự \"\" (nháy kép)";  // Chuỗi ký tự "" (nháy kép)
   ```
   Để nối các chuỗi lại với nhau dùng toán tử +, kiểm tra hai chuỗi giống nhau thif thì có thể dùng == , hoặc so sánh hai đối tượng giống nhau trong memory dùng *identical(a,b)*.
   
   Muốn nhập chuỗi trên nhiều dòng, dùng cú pháp sau, các dòng nằm giữa cặp ... hoặc *** : 
   ```
   String s1 = '''
   Các dòng
   chữ trong chuỗi s1
   ''';
   ```
   Có thể chèn một biến hoặc một biểu thức vào chuỗi bằng cách ký hiệu $tên_biến, ${biểu thức giá trị}.
- **Booleans**: được biểu diễn bởi 2 giá trị *true* và *false* với từ khóa *bool*. 
- **Lists, Maps**: đều được sử dụng để biểu diễn 1 tập các đối tượng. **List<T>** biểu diễn một nhóm các đối tượng được sắp xếp và có thiết kế giống như mảng (array) trong các ngôn ngữ khác. **Map<dynamic, dynamic>{}** kiểu dữ liệu biểu diễn một tập đối tượng không được sắp xếp ở dạng *<key, value>*.
- **Set<T>**: biểu diễn một nhóm các đối tượng duy nhất.
- **Runes**: là biểu diễn dạng chuỗi Unicode 32 bit (UTF-32).
- **Symbols**: Về cơ bản thì Symbols có thể sử dụng như Java Reflection. Phần này để tìm hiểu sau nhé. :D
- **Dynamic Type**: *dynamic* trong Dart có thể hiểu là kiểu dữ liệu tùy chọn. Đây là kiểu cơ bản cho mọi kiểu dữ liệu trong Dart. Kiểu dữ liệu của một biến nếu không được chỉ định rõ ràng thì sẽ được gán với từ khóa *dynamic*.

# 3. Hằng
Hằng số lưu giá trị mà không thể thay đổi, sử dụng từ khóa *const* hoặc *final* để tạo ra hằng số.

Tạo hằng số const: const ten_hang_s0 = biểu_thức_giá_trị; ví dụ: const row = 1; Đây gọi là hằng số biên dịch, nó cố định ngay từ khi viết code.

Tạo hằng số final: biến final chỉ được gán 1 lần duy nhất, nếu gán lần 2 sẽ lỗi.
# 4. Một số chú ý
Trong Dart có toán tử Null-aware để đảm bảo null safe trong quá trình thực thi code, ví dụ như sau: 
```
void main() {
  x = y ?? z; // nếu y null thì gán y cho x, không thì gán z cho x.

  var x = null;
  x ??= 'Syntax sugar của `x = x ?? "Viết gì vào đây bây giờ"`';
  print(x);

  var isNull = null;
  print(isNull?.foo()); // Nếu null thì không thực hiện foo() nữa mà trả về `null`
}
```
Ngoài ra, trong Dart 2.3 update vào 19/4/2019 có toán tử " ?... ". Ví dụ: 
 ```
List lowerNumbers = [1, 2, 3, 4, 5];
List upperNumbers = [6, 7, 8, 9, 10];
List numbers = […lowerNumbers?…upperNumbers];
```
Nó tương đương với: 
    
```
List numbers = [];
numbers.addAll(lowerNumbers);
if(upperNumbers != null){
 numbers.addAll(upperNumbers);
}
```
 Xem thêm tại: https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md#spread

Khi viết các functions thì có một suggesst nhỏ, nếu hàm chỉ có một câu lệnh thì nên dùng " => ". ví dụ: 
    
```
@override
  Widget build(BuildContext context) => widget.child;
```
Thay vì viết: 
```
@override
  Widget build(BuildContext context) {
    return widget.child;
  }
```
    
**Mixins**: đây là cách sử dụng nhiều class khác cho một class nào đó. Dùng từ khóa *with*, xem ví dụ dưới đây: 
    
```
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```
Để *implement* một mixin, tạo một class mà extends Object và không có constructor.  Ngoài ra, nếu bạn muốn mixin có thể sử dụng  như là class bình thường thì thay từ khóa *class* thành *mixin*, ví dụ: 
```
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```
Để lớp mixin của bạn có thể gọi phương thức từ lớp cha hơn thì nó sử dụng từ khóa *on* , như trong ví dụ sau: 
```
mixin MusicalPerformer on Musician {
  // ···
}
```
- Từ khóa mixin được giới thiệu trong Dart 2.1. Những phiên bản Dart trước đó thì sử dụng abstract class. Để xem sự thay đổi của các phiên bản Dart: https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md 
- 
Đến đây là hết, mời các bạn đón xem ở bài tiếp theo nhé! :D