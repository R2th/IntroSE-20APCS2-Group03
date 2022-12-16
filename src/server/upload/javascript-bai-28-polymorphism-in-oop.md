Oh.. đây là một đặc trưng được hỗ trợ bởi các ngôn ngữ lập trình với những cấp độ khác nhau. Đối với những ngôn ngữ lập trình kiểu tĩnh `static-typing` như `C`, `Ada`, `Haskell`, `Java`, và `C#` thì việc biểu thị logic Đa Hình `Polymorphism` trong code sẽ phụ thuộc khá nhiều vào các công cụ mà mỗi ngôn ngữ cung cấp; Còn đối với những ngôn ngữ quản lý kiểu dữ liệu linh động `dynamic-typing` như `JavaScript`, `Python`, hay `Ruby`, thì về cơ bản là không hề có giới hạn để biểu hiện.

Chúng ta sẽ khởi đầu với định nghĩa được tổ hợp bởi [Wikipedia](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))

> Sự Đa Hình `Polymorphism` trong lĩnh vực lập trình nói chung là việc sử dụng `1 tên định danh` để biểu thị hay đại diện cho `nhiều kiểu dữ liệu khác nhau`. Khái niệm này được vay mượn từ lĩnh vực nghiên cứu sinh học - nơi mà người ta sử dụng một tên định danh để mô tả một nhóm các loài khác nhau.  
> *_Wikipedia*

Và cũng theo bản ghi này thì những cách thức để biểu thị sự đa hình trong môi trường lập trình có thể được chia thành 3 nhóm:

- `Sub-typing` - khi 1 tên định danh được sử dụng để biểu thị một `object` bất kỳ trong nhiều `class` khác nhau có chung `super class`.
- `Ad-hoc` - khi code đưa ra định nghĩa một giao diện lập trình chung cho một bộ ngẫu nhiên các kiểu giá trị.
- `Parametric` - Khi code không chỉ định kiểu dữ liệu cụ thể và thay vào đó thì các ký hiệu trừu tượng sẽ được sử dụng để thay thế cho khả năng chấp nhận bất kỳ kiểu dữ liệu nào.

## Sub-typing Polymorphism

Đây là khía cạnh logic biểu thị `Polymorphism` căn bản nhất và rất dễ để nhận biết sự tương đồng với định nghĩa được đặt trong khung trích dẫn ở phía trên. Ở đây chúng ta sẽ thực hiện một ví dụ đơn giản với các `class` có mặt trong đồ hình như sau:

![](https://images.viblo.asia/9266aab0-2b46-41ed-a146-887fd63d3c98.png)

Chúng ta có các `class Shape` có một phương thức `show()` được kế thừa bởi các `class` khác là `Circle`, `Square`, và `Triangle`. Và ở các `class` kế thừa thì phương thức `show()` đều được định nghĩa lại để có kết quả hoạt động phù hợp với từng `class`.

```Main.java
class Main {  
   public static void main(String args[]) { 
      Shape form = null;

      form = new Circle ();
      form.show ();
     
      form = new Square ();
      form.show ();

      form = new Triangle ();
      form.show ();
   } 
} //. Main


class Shape {
   public void show () {
      System.out.println ("-- Shape - - - - - - - - - - -");
   }
} //. Shape


class Circle extends Shape {
   public void show () {
      super.show ();
      System.out.println ("Type of Shape : Circle \n");
   }
} //. Circle


class Square extends Shape {
   public void show () {
      super.show ();
      System.out.println ("Type of Shape : Square \n");
   }
} //. Square


class Triangle extends Shape {
   public void show () {
      super.show ();
      System.out.println ("Type of Shape : Triangle \n");
   }
} //. Triangle
```

Lúc này ở chương trình `main`, chúng ta chỉ khai báo một biến `form` duy nhất được định kiểu là sẽ lưu trữ một `object` tương thích với `class Shape`. Ở đây chúng ta có thể hiểu là biến này sẽ chỉ cho phép lưu trữ một `object` được tạo ra trực tiếp từ `class Shape` bằng phép thực thi `new Shape()`, hoặc được tạo ra từ các `class` khác kế thừa `class Shape`.

Đây là `điều kiện cần` trong định nghĩa `Polymorphism`, đó là khi một tên định danh `form` có thể đại diện cho `object` của nhiều `class` khác nhau. Tuy nhiên, yếu tố còn lại, hay `điều kiện đủ` để hoàn thiện định nghĩa `Sub-typing Polymorphism` đó là tính tương thích về giao diện lập trình `API` được để mở ra code sử dụng bên ngoài của các `class`.

Để hiểu ngắn gọn, khi chúng ta gọi phương thức `show()` trong bất kỳ trường hợp nào, từ `object` được tạo ra từ bất kỳ `class` nào mà code vẫn có thể hoạt động tốt, thì chúng ta có thể nhận định cách sử dụng tên định danh `form` như trên là một cách biểu thị `Sub-typing Polymorphism`.

```console.io
-- Shape - - - - - - - - - - -
Type of Shape : Circle 

-- Shape - - - - - - - - - - -
Type of Shape : Square 

-- Shape - - - - - - - - - - -
Type of Shape : Triangle
```

Nhân tiện thì trong các ngôn ngữ lập trình hỗ trợ cú pháp `OOP` kiểu như `Java`, `C#`, `Ruby`, `Python`, `JS`, v.v... thì thao tác khi chúng ta định nghĩa lại một yếu tố `property` hoặc `method` ở `class` kế thừa khi mà yếu tố đó đã được định nghĩa ở `super class` - được gọi là `override`.

Thao tác `override` luôn được nhắc đến gắn liền với định nghĩa `Sub-typing Polymorphism`, nhưng chúng ta cần lưu ý - đó là `Sub-typing Polymorphism` còn yêu cầu sự tương thích về giao diện lập trình cung cấp bởi các `class`. Vì vậy nên nếu như chúng ta thực hiện `override` các yếu tố và thay đổi các nhãn `access modifier` để ẩn khỏi bề mặt sử dụng đối với code bên ngoài thì đó không còn là `Sub-typing Polymorphism` nữa.

Việc biểu thị logic `Sub-typing Polymorphism` như trên trong `JavaScript`, hiển nhiên không có gì trở ngại và còn thuận lợi hơn nhiều do `JS` là một ngôn ngữ kiểu động `dynamic-typing`. Các yếu tố như sử dụng tên của `super class` để định kiểu cho biến đại diện chỉ có ý nghĩa trong môi trường của các ngôn ngữ định kiểu tĩnh `static-typing` như `Java`, `C#`, v.v...

```main.js
class Shape {
   show () {
      console.log ("-- Shape - - - - - - - - - - -");
   }
} //. Shape


class Circle extends Shape {
   show () {
      super.show ();
      console.log ("Type of Shape : Circle \n");
   }
} //. Circle


class Square extends Shape {
   show () {
      super.show ();
      console.log ("Type of Shape : Square \n");
   }
} //. Square


class Triangle extends Shape {
   show () {
      super.show ();
      console.log ("Type of Shape : Triangle \n");
   }
} //. Triangle


// - main - - - - - - - - - 
      
var form = null;

form = new Circle ();
form.show ();

form = new Square ();
form.show ();

form = new Triangle ();
form.show ();
```

## Ad-hoc Polymorphism

> `Ad-hoc Polymorphism` - khi code đưa ra định nghĩa một giao diện lập trình chung cho một bộ ngẫu nhiên các kiểu giá trị.

Định nghĩa này thực ra xuất phát từ các ngôn ngữ chủ điểm `Procedural` và `Functional`, nơi mà mỗi tên định danh của các `sub-program` có thể được nhìn nhận là một điểm biểu thị hình thái nhất định.

Ý tưởng ở đây là một `sub-program` có tên là `sum` có thể được hiểu như một tên đại diện cho các hình thái hoạt động hay `mindset` khác nhau. Chúng ta có thể sử dụng `sum(a,b)` để thu được tổng của hai giá trị đầu vào, hoặc có thể sử dụng `sum(array)` để thu được tổng của tất cả các giá trị trong mảng `array`, v.v...

Như vậy, tên định danh `sum` đã được sử dụng để biểu thị cho nhiều bộ logic `mindset` khác nhau và có thể được sử dụng với những yếu tố dữ liệu đầu vào `input` khác nhau; Và đó có thể được xem là một biểu thị Đa Hình `Polymorphism`.

Bây giờ chúng ta sẽ xem xét một ví dụ trong môi trường `OOP`. Ở đây chúng ta sẽ tạo ra một `class` có chứa một tên định danh của `method` được định nghĩa lại nhiều lần.

```Main.java
class Main {  
   public static void main(String args[]) { 
      Utility intel = new Utility ();

      int total = intel.add (1, 2);
      System.out.println ("int add (int, int) = " + total);
     
      String message = intel.add ("String", "Concatenation");
      System.out.println ("String add (String, String) = " + message);
   } 
} //. Main


class Utility {
   public int add (int a, int b) {
      return a + b;
   }

   public String add (String a, String b) {
      return a + " " + b;
   }
} //. Shape
```

```console.io
int add (int, int) = 3
String add (String, String) = String Concatenation
```

Trong môi trường của các ngôn ngữ định kiểu tĩnh `stating-typing` như `Java`, `C#`,  v.v... mỗi một bộ định danh bao gồm tên của `sub-program` và các yếu tố định kiểu các giá trị đầu vào `input/parameters` và giá trị trả về `output/return` như mô tả trong kết quả ở `console` - được gọi là một chữ ký `signature`.

Các `signature` sẽ được các trình biên dịch của mỗi ngôn ngữ lưu trữ lại để phân biệt giữa các phiên bản định nghĩa khác nhau, và chọn được định nghĩa phù hợp ở vị trí mà `sub-program` đó được sử dụng. Thêm vào đó thì thao tác định nghĩa lại nhiều lần một `sub-program` như trên được gọi là `overload`.

Như vậy là chúng ta đã thấy `intel` sử dụng các bộ logic `mindset` khác nhau khi thực hiện thao tác `add` trên các đối tượng dữ liệu khác nhau: Khi `add` các số nguyên `int` thì đó là người làm toán thực hiện phép tính tổng; Còn khi `add` các chuỗi `String` thì đó là người làm văn thực hiện công việc gắn kết các câu chữ. Đó là những hình thái khác nhau được thể hiện bởi cùng một tên định danh `add` - là biểu hiện của Sự Đa Hình `Polymorphism` theo kiểu `Ad-hoc`.

Trong các ngôn ngữ kiểu động `dynamic-typing` như `JavaScript`, `Python`, `Ruby`, v.v... thì cách biểu thị này được thực hiện bằng cách người viết code sẽ phải tự tạo ra logic kiểm tra số lượng tham số đầu vào, kiểu dữ liệu của từng tham số, và thứ tự sắp xếp của các tham số được truyền vào `sub-program`, để tạo ra các logic rẽ nhánh tới các `sub-program` khác.

```main.js
const typed = (value,type) => (typeof value) == type

const addNumber = (a,b) => a + b
const addString = (a,b) => a + ' ' + b

const add = (...parameters) => {
   var [a,b] = parameters;
   if (typed(a,"number") && typed(b,"number"))  return addNumber(a,b)
   if (typed(a,"string") && typed(b,"string"))  return addString(a,b)
   if ("any-other-case")                        throw new Error("Unsupported Signature")
}


// - main - - - - - - - - -

var total = add (1,2)
console.log ("add : (number,number) -> number = " + total)

var message = add ("String","Concatenation")
console.log ("add : (string,string) -> string = " + message)
```

Đối với trường hợp `overload` thì việc sử dụng các ngôn ngữ định kiểu tĩnh `static-typing` có phần thuận lợi hơn nhiều vì thao tác kiểm tra kiểu dữ liệu của các tham số đầu vào đã được trình biên dịch hỗ trợ. Tuy nhiên thì như chúng ta cũng đã thấy, sự linh động của `dynamic-typing` luôn khiến mọi thứ đều trở thành có thể. :D

## Parametric Polymorphism

> `Parametric` - Khi code không chỉ định kiểu dữ liệu cụ thể và thay vào đó thì các ký hiệu trừu tượng sẽ được sử dụng để thay thế cho khả năng chấp nhận bất kỳ kiểu dữ liệu nào.

Đọc lướt cái định nghĩa thì bạn thấy rõ rồi đấy, `Parametric Polymorphism` là một tính năng cần phải biểu thị bởi người viết code trong các ngôn ngữ định kiểu tĩnh `static-typing` như `Java`, `C#`, v.v... Còn đối với các ngôn ngữ kiểu động `dynamic-typing` như `JavaScript`, `Python`, `Ruby`, v.v... thì mặc định yếu tố đó đã là đặc trưng tự nhiên rồi. Vì vậy nên chúng ta không cần phải quan tâm tới đâu.

Trong trường hợp bạn muốn tìm hiểu ví dụ về `Parametric Polymorphism` trong các ngôn ngữ định kiểu tĩnh thì có thể hỏi Google với từ khóa `Generic Programming`. Còn ở đây thì chúng ta sẽ để dành sự quan tâm cho đặc tính tiếp theo `Abstraction`.

[[JavaScript] Bài 29 - Abstraction in OOP](https://viblo.asia/p/5OXLAXEBJGr)