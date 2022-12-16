Tiếp tục series, hôm nay chúng ta sẽ tìm hiểu tiếp phần còn lại của Week 1, gồm 1 phần của GitHub CheatSheet, một vài tutorials và toàn bộ chương 2( Nếu có thể :V ). OK, let's start...

# Getting Started
## 3. Cheat Sheet
### Classes
Cách định nghĩa Class trong scala cũng không quá khác biệt so với các ngôn ngữ lập trình hướng đối tượng( Vì Scala mang cả 2 dòng máu FP và OOP mà :V ).Trong Scala có 1 câu lệnh mới:
```
      require(y > 0, "y must be positive")    // precondition, triggering an IllegalArgumentException if not met  
```
Câu lệnh trên yêu cầu khi khởi tạo 1 Object từ Class, thì biến y phải lớn hơn 0. Chúng ta sẽ tìm hiểu kỹ hơn khi đi sâu vào bài học này tại các chương sau.

### Operators
Hãy để ý dòng đầu tiên này: myObject myMethod 1 is the same as calling myObject.myMethod(1). Nhớ lại bài tập về làm chương trình tính toán phân số, thay vì viết fraction1.plus(fraction2), chúng ta có thể viết fraction1 plus fraction2. Và đặc biệt hơn, Scala cho phép đặt tên bằng các ký tự đặc biệt, do đó ta hoàn toàn có để đổi tên hàm plus thành + và khi đó, fraction1 plus fraction2 sẽ trở thành fraction1 + fraction2. Dễ nhìn hơn rất nhiều đúng không. Tuy nhiên, các giáo viên, các coder lẫn bản thân tôi không khuyến khích các bạn lạm dụng điều này quá nhiều, sẽ khiến code của các bạn cực kỳ khó hiểu, và rất khó khăn cũng như mất thời gian khi bảo trì code.  

### Class hierarchies
Tạm hiểu là phân cấp class, có 1 điều cần lưu ý đó là Object - đây là 1 Singleton, tức là bạn chỉ có duy nhất 1 object cùng kế thừa từ abstract class tồn tại ở 1 thời điểm. Lấy 1 ví dụ nhỏ, bạn có 1 class là Animals, bạn tạo 1 Object là Dog kế thừa từ class Animals, thì xuyên suốt chương trình bạn chỉ có thể có 1 Dog, thao tác và làm việc( Cho ăn, tắm, làm thịt,...) trên 1 Dog, không có Dog thứ 2. Quay lại chương trình HelloWorld, chúng ta còn 1 cách khác để viết chương trình, hãy thử:
```
 object Hello extends App {
      println("Hello World")
    }
```
### Class Organization
Cách tổ chức class: Class và Object trong scala đều có thể được nhét vào trong 1 Package. Và chúng ta có thể thao tác với class, object hoặc các method phía trong nó thông qua 1 thứ gọi là Package Name - tên package chứa class và object của bạn. Ví dụ tôi có Class Dog, có 2 method là eat() và sleep() , và Class Bird, có 2 method là fly() và eat() - đều nằm trong 1 package là Animal. Giờ tôi muốn gọi method sleep() của class Dog thông qua package name chứa nó, tôi có thể viết như sau:

Và có 1 điều thú vị trong Scala mang tên Trait, giúp chúng ta thực hiện chức năng đa kế thừa trong OOP, tôi sẽ trình bày ở các chương sau. Dù sao thì đây là bài tóm tắt cheat sheet, mà trait thì cần nhiều line và word hơn.
### Type Parameters
Giống template trong C++ và giống generics trong Java, có thể áp dụng cho function, trait và class. Giúp chúng ta tái sử dụng code với những kiểu dữ liệu khác nhau mà không cần viết lại code. Một ví dụ nhỏ cho những bạn chưa biết 2 khái niệm trên từ C++ hoặc Java: Thay vì viết 2 hàm cộng, 1 để cộng 2 số thực( float), 1 để cộng 2 số nguyên( int) , thì ta có thể viết 1 hàm cộng cho cả 2, sau đó gọi hàm này và truyền vào cho nó kiểu dữ liệu cùng 2 parameters là 2 số cần tính toán.
### Variance - Skip
### Pattern Matching
Khá giống với Switch - case trong các ngôn ngữ lập trình khác, tuy nhiên có thể sử dụng đa dạng hơn rất nhiều, cùng xem ví dụ với 1 List
```
(someList: List[T]) match {
      case Nil => ...          // empty list
      case x :: Nil => ...     // list with only one element
      case List(x) => ...      // same as above
      case x :: xs => ...      // a list with at least one element. x is bound to the head,
                                                           // xs to the tail. xs could be Nil or some other list.
      case 1 :: 2 :: cs => ... // lists that starts with 1 and then 2
      case (x, y) :: ps => ... // a list where the head element is a pair
      case _ => ...            // default case if none of the above matches
    }
```
Cấu trúc của List trong Scala khá đặc biệt, hãy nhìn vào hình sau để dễ hình dung hơn

![](https://images.viblo.asia/762ccd64-9dd8-4662-8a5c-fcda5048bcb0.png)
Phần bên trái, gọi là head( Đầu), và phần bên phải, gọi là tail( Đuôi). Ký tự bạn viết var x = List(1,2) cũng tương tự khi bạn viết var x = 1 :: 2 vậy. Giải thích: x :: Nil tức là phần bên phải là 1 phần tử x, phần bên trái không có gì, biểu diễn 1 List chỉ có 1 phần tử là x. Tiếp với x :: xs biểu diễn 1 List có ít nhất 1 phần tử( thường là > 2 phần tử )...tương tự với các case còn lại. Chúng ta sẽ tìm hiểu sâu hơn về List trong các trương sau, còn giờ hãy quay lại với pattern matching.
Hàm trên có tác dụng check 1 List và xử lý theo từng trường hợp có thể xảy ra với 1 List. Khi viết " case _ " tương tự như khi viết "case default" trong C++ hay các ngôn ngữ khác, hiểu là các trường hợp còn lại. Ký tự _ được sử dụng khá nhiều trong Scala, khi mà ta không quan tâm đến các yếu tố khác.
Ví dụ import package._ tức là import toàn bộ package đó.
Lưu ý, pattern matching có thể sử dụng với kiểu dữ liệu Optional( Kiểu dữ liệu có thể có hoặc không - ví dụ như cho một List thông tin người dùng gồm tên, tuổi và giới tính. Một số người không muốn cung cấp giới tính của mình, bởi vậy mà ở một số người sẽ có thông tin về giới tính, một số sẽ không. Ta gọi biến giới tính ở đây là biến Optional. Khi làm việc, nếu không gán giá trị default, hoặc không xét đến trường hợp biến đó null, thì chương trình sẽ crash - bạn sẽ làm việc nhiều với biến optional khi lập trình mobile).  Pattern matching cũng được sử dụng trong các Anonymous functions, tôi sẽ trình bày ở các bài sau.
### Collections
Trong Scala có khá nhiều Collection, mỗi collection có những method riêng và từ đó cũng có cách sử dụng riêng trong từng trường hợp khác nhau. Có 2 loại collection chính là Immutable và Mutable - không thể và có thể thay đổi giá trị. Việc sử dụng collection loại nào sẽ ảnh hưởng rất lớn đến hiệu suất chương trình của bạn. Hãy đọc bài viết này để biết thêm: https://vngeeks.com/hieu-suat-cua-cac-collection-immutable-trong-scala/
### Pairs 
Cặp - đúng như tên gọi. Không có gì phải giải thích :)
### Ordering
Cung cấp các hàm giúp việc sort trở nên dễ dàng hơn. Tuy nhiên, khi học trên Coursera, bạn phải viết tay gần như toàn bộ các hàm sắp xếp và làm vô số bài tập thì Thầy mới giới thiệu đến class này :V ( Đây là 1 generics class nằm trong thư viện math của Scala - scala.math.Ordering[T] ). Nhờ đó mà mình biết thêm được khá nhiều kiến thức về sort, nhưng mà cũng ngốn khá nhiều thời gian :V.
### For-Comprehensions
Thường thì vòng lặp for trong các ngôn ngữ lập trình khác sẽ được giới thiệu ở những bài đầu tiên, nhưng Scala lại nhét nó xuống cuối cùng cheat sheet - tương tự thì nó là những bài cuối cùng của week 6 trên Coursera. Why ? Vì nó vô cùng @#$@Q& . Những bậc phàm nhân thường viết vòng lặp for như vầy: 
```
for (i <- 1 until n; j <- 1 until i if isPrime(i + j))
        yield (i, j)  
```
Translate qua C++ thì nó sẽ là:

```
for( int i = 1; i < n; i++){
    for(int j = 1; j <  i; j++){
    if isPrime(i + j) cout << i << j <<endl;
    }
 }
```
 Nhưng chúng ta không làm như vậy trong Scala, mà chúng ta viết lại như thế này:
 ```
for {  
      i <- 1 until n  
      j <- 1 until i  
      if isPrime(i + j)  
    } yield (i, j) 
``` 
Nhìn for loop là muốn học Scala rồi :) .Vậy  là kết thúc cheat sheet. Bắt đầu những bài học đầu tiên nhé.
## 4. Scala Tutorial
Oops, có vẻ như vẫn là ...chưa. Chúng ta đến với những quy tắc chung trước khi bước vào những bài học đầu tiên nhé. Mình sẽ skip 2 phần là IntelliJ Tutorials và submit bài tập - vì không hướng đến số đông. Phần Learning Resource, cũng là tài liệu tiếng anh, và mình suggest các bạn một vài nguồn sau để tìm hiểu về Scala: Scala Document, Coursera, edX, Udemy, Amazon Top Book( Tìm từ khóa Scala và chọn những quyển top để đọc - tương tự với các ngôn ngữ lập trình khác khi bạn không biết chọn nguồn  tài liệu như thế nào). Hãy học từng phần từng phần một, học hết phần này hãy xem và học đến phần khác. Tránh enroll 1 mớ về, mỗi thứ xem 1 chút rồi bỏ. Quan trọng vẫn là, bạn học và luyện tập thường xuyên. 
Phần này sẽ hướng dẫn rất ngắn gọn về ngôn ngữ lập trình Scala - mà có thể sẽ lặp lại với phần giới thiệu tại Cheat Sheet phía trên của mình.
 Lược dịch từ: https://www.coursera.org/learn/progfun1/supplement/ebKWU/scala-tutorial.
### Classes, Traits, Objects và Packages
Class trong Scala rất giống với class trong Java( Có thể bạn chưa biết, Scala và Java là anh em khi chúng cùng chạy trên nền JVM, bởi vậy mà hiệu suất của Scala là tương đương với Java).Chúng đều là một khuôn mẫu chứa các fields( như Name, Age, ...) và các methods( Như getName(), setAge(),...). Như Java, class có thể được khởi tạo bằng cách dùng hàm khởi tạo new, có thể có nhiều instances hoặc object cùng 1 kiểu Class.

Trong Scala tồn tại 1 trường hợp đặc biệt của Class có tên là case class. Bạn sẽ học về case class trong suốt khóa học này.
Class trong Scala không có những static members( members: Những thành phần trong class, có thể là fields hoặc methods). Bạn có thể dùng Object( xem phía dưới) để thực hiện các chức năng tương đương với static members trong Java.

Traits: Giống với Interfaces trong Java, nhưng chúng có thể implement các methods hoặc định nghĩa các fields.

Objects: Object trong Scala giống với Class, nhưng mỗi object được định nghĩa chỉ có duy nhất một instance. Không thể tạo instance cho object với từ khóa new, thay vào đó bạn chỉ có thể truy cập tới các members của một object bằng tên của nó

Packages: Việc thêm 1 câu lệnh như package foo.bar ở đầu file makes the code in a file part of the package foo.bar( Phần này dịch khá lủng củng, bạn có thể hiểu là khi để dòng package foo.bar ở đầu 1 file code, thì tất cả đoạn code phía sau sẽ nằm trong package đó - code có thể là object, class hoặc function,... - tức là bạn đang nhét chúng vào 1 package có thên foo.bar . Và bạn có thể để dòng package foo.bar ở nhiều file khi muốn thêm nhiều class/ object/ function vào package đó.). Sau đó bạn có thể "import foo.bar."  để  sử dụng tất cả những gì từ package foo.bar vào code của bạn. Nội dung của một package có thể nằm rải rác ở nhiều tệp. Nếu bạn định nghĩa một class là MyClass trong package foo.bar, bạn có thể import cụ thể class đó( Và không import thêm bất cứ thứ gì khác từ package) với lệnh import foo.bar.MyClass.

Trong Scala, mọi thứ đều có thể được imported, không chỉ là tên lớp. Do đó, nếu có 1 instance trong object baz trong package foo.bar, thì lệnh import foo.bar.baz._ sẽ import tất cả members của object đó....

Kết thúc phần 2. Hẹn gặp lại các bạn tại phần 3 với phần còn lại của bài dịch nhé.