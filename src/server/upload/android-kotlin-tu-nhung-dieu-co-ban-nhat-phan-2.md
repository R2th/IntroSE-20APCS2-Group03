### I. Mở đầu
Chào mừng các bạn đã quay trở lại với loạt bài viết về Kotlin của mình. Trong series này, mình chủ yếu nói về những điều "cơ bản nhất" của Kotlin có thể nói như một thứ basic nhất khi bạn học một ngôn ngữ lập trình.

Trong phần trước mình cũng đã giới thiệu qua với các bạn về  Kotlin, ưu điểm cũng như là một số khái niệm cơ bản trong kotlin. Trước khi đọc bài viết này, nếu bạn chưa theo dõi phần trước của series này thì có thể xem tại [Đây](https://viblo.asia/p/android-kotlin-tu-nhung-dieu-co-ban-nhat-phan-1-gGJ59WrJZX2)

Còn trong bài viết này, mình cùng các bạn sẽ đi tìm hiểu thêm về Kotlin - Từ những điều cơ bản nhất nhé

### II. Bắt đầu
#### 1. When
Nếu bạn đã từng lập trình với Java thì chắc hẳn sẽ biết đến block lệnh điều kiện switch-case. Với Kotlin, biểu thức switch-case đã được thay thế bởi biểu thức when. When hoạt động rất
mạnh mẽ, đa năng, đáp ứng được nhiều trường hợp xử lý cho người lập trình viên.

Logic: 
```
when(<expression>){
<value 1> -> <statement 1>
<value 2> -> <statement 2>
else -> <statement else>
}
```

when lấy giá trị trong <expression>, đem so sánh với các <value> bên trong , nếu trùng khớp với value nào thì <statement> đó sẽ được thực thi. Nếu tất cả <value> đều không khớp với <expression> thì else sẽ được thực hiện.
    
Kotlin cũng cho phép ta gom nhóm nhiều điều kiện trong when nếu như các giá trị này cùng giải quyết một vấn đề nào đó bằng cách dùng dấu phẩy "," để ngăn cách giữa các giá trị.

Sau đây mình sẽ so sánh về cách dùng switch-case trong java và Kotlin:

Đối với Java:
```
final int x = // value;
final String xResult;

switch (x){
  case 0:
  case 12:
    xResult = "0 or 12";
    break;
  case 1:
  case 2:
    //...
  case 10:
    xResult = "from 1 to 10";
    break;
  default:
    if(isOdd(x)) {
      xResult = "is odd";
      break;
    }
    xResult = "otherwise";
}

```
  
Đối với Kotlin:
```
val x = // value
val xResult = when (x) {
  0, 12 -> "0 or 12"
  in 1..10 -> "from 1 to 10"
  else -> if (isOdd(x)) { "is odd" } else { "otherwise" }
}
```

Như bạn có thể thấy, Kotlin tối giản một lượng code khá lớn trong ví dụ trên, giúp cho việc code đơn giản hơn và đặc biệt là nhanh hơn nhiều so với khi dùng java 

Trong ví dụ trên bạn cũng có thể thấy cấu trúc when của Kotlin nó còn cho phép ta kiểm tra theo vùng dữ liệu liên tục:" in 1..10 " , rất mạnh mẽ đúng không.

#### 2. For
Đối với mọi ngôn ngữ lập trình thì các cấu trúc vòng lặp rất là quan trọng, đặc biệt là vòng lặp for rất là phổ biến và gần như trong mọi phần mềm đều sẽ chắc chắn sử dụng để giải quyết
những công việc lặp đi lặp lại một cách có quy luật.
Kotlin cung cấp khoảng 5+ cách thức làm việc với vòng lặp for rất đa dạng, các kỹ thuật này mình sẽ giới thiệu sau đây 
#### 2.1. Duyệt tuần tự hết giá trị trong danh sách(closed range)
```
for (i in a..b) {
...
}
```
Với cú pháp này, i được duyệt tuần tự từ a đến b, tăng 1 đơn vị cho 1 bước nhảy
#### 2.2. Duyệt tuần tự gần hết giá trị trong danh sách (half-opne range)
```
for (i in a until b) {
...
}
```
Với cú pháp này, i được duyệt tuần tự từ a đến b-1 , tăng 1 đơn vị cho 1 bước nhảy
#### 2.3. Lặp theo bước nhảy Step
```
for (i in a .. b step s) {
...
}
```
Với cú pháp này, i được duyệt tuần tự từ a đến b , tăng s đơn vị cho 1 bước nhảy
#### 2.4. Lặp theo bước nhảy downTo
Trong cú pháp lặp này thực ra là dùng vòng lặp ngược, tức là cho duyệt từ cuối đến đầu, ta cũng có thể duyệt ngược tuần tự hoặc step như sau
```
for (i in b downTo a) {
...
}
```
Với cú pháp này, i được duyệt tuần tự từ b về a , giảm dần 1 đơn vị cho 1 bước nhảy

Sau đây duyệt ngược với step 
```
for (i in b downTo a step x) {
...
}
```
Với cú pháp này, i được duyệt tuần tự từ b về a , giảm dần x đơn vị cho 1 bước nhảy

#### 2.5. Lặp tập đối tượng
```
for (item in collection) {
...
}
```
Với cú pháp này, sẽ duyệt từng đối tượng trong một tập đối tượng

#### 3. While & do-While
Một cấu trúc lặp khá phổ biến khác trong mọi ngôn ngữ lập trình đó là vòng lặp while, trong đó Kotlin cũng không phải ngoại lệ. Do đó mình chỉ giới thiệu qua trong phần này.
```
while (expression) {
...
}
```

```
do{
...
}
while(expression)
```

#### 4. Function trong 1 dòng
Funtions một dòng có thể viết trong java tuy nhiên ta sẽ phải tuần theo những style đã được mặc định sẵn. Kotlin thì nó có thể viết ngắn gọn hơn
```
// Java
public String getName() {
    return getFirstName() + " " + getLastName();
}
// Kotlin
fun getName() = "${firstName} ${lastName}"
```

#### 5. Giảm thiểu việc check null
Trong Java việc check null rất phổ biến, ta rất dễ miss việc này gây crash chương trình và nó làm code trông xấu đi. Với tính năng null safety của kotlin đã được đề cập ở phần trước, ta sẽ thấy để khả năng đọc code khi viết bằng kotlin dễ dàng hơn rất nhiều.
```
// Java
if (name != null) {
    System.out.println(name)
}
// Kotlin
name?.let { println(it) }
```
### III. Kết luận
Vậy là mình đã giới thiệu với các bạn những điều cơ bản nhất trong lập trình Kotlin. Nếu bài viết có thiêú xót rất mong ý kiến phản hồi từ mọi người để bài viết sau được tốt hơn. Mình cảm ơn!
ref: https://fabiomsr.github.io/from-java-to-kotlin/index.html
https://duythanhcse.wordpress.com/2017/06/15/tai-lieu-kotlin-tieng-viet/

Book: Kotlin in action