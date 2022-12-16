Tiếp theo sau `Inheritance`, tính năng Đóng Gói `Encapsulation` luôn được quan tâm và hỗ trợ trước hết so với `Abstraction` và `Polymorphism`. Để định nghĩa một cách ngắn gọn thì `Encapsulation` có thể được hiểu đơn giản là cho phép ẩn đi những yếu tố `property` và `method` mang tính chất cục bộ của một `object`. Điều này sẽ giúp đảm bảo code tương tác từ phía bên ngoài của `object` đó sẽ không thể trực tiếp sử dụng hay tạo ra sự thay đổi đối với các yếu tố cục bộ.

Đối với các ngôn ngữ `OOP` hoàn chỉnh như `Java` hay `C#`, tính năng `Encapsulation` được cung cấp bởi một bộ các từ khóa được gọi là `Access Modifier` - tạm hiểu là các nhãn quy định quyền truy cập tới các yếu tố của `object`. Các từ khóa được cung cấp trung `Java` bao gồm:

- `public` - luôn khả dụng với code tham chiếu được viết ở bất kỳ đâu.
- `private` - chỉ khả dụng với code tham chiếu được định nghĩa bên trong `class` đó; Code tham chiếu viết trong các `class` kế thừa cũng không thể truy xuất được các yếu tố `private` trong `class` cha.
- `default` - khả dụng với code tham chiếu được định nghĩa trong cùng `package`.
- `protected` - khả dụng với code tham chiếu được định nghĩa trong cùng `package` và các `class` kế thừa ở bên ngoài `package` đó.

## Public & Private

Từ khóa `public` hiển nhiên không có gì đáng phải lưu ý, do đó chúng ta sẽ làm ví dụ ngay với `private`. Ở code ví dụ trong bài trước, chúng ta có thể sửa lại một chút và sử dụng các nhãn `private` cho các thuộc tính `name` và `age`. Lúc này ở chương trình `main` chúng ta sẽ thử truy xuất trực tiếp tới các thuộc tính này.

```Main.java
class Main {  
   public static void main (String args[]) {
      Universe tabha = new Universe ("Tabha", 1001, "Buddhism");
      System.out.println ("Name: " + tabha.name);
      System.out.println ("Age: " + tabha.age);
   } 
} //. Main


// -- Entity - - - - - - - - - - - - - - - - - - -

class Entity {
   private String name;
   private int age;

   Entity (String name, int age) {
      this.name = name;
      this.age = age;
   }

   void whisper () {
      System.out.println (this.age + " years ago...");
      System.out.println (this.name + "...");
   }
} //. Entity


// -- Universe - - - - - - - - - - - - - - - - - - -

class Universe extends Entity {
   String laws;
  
   Universe (String name, int age, String laws) {
      super (name, age);
      this.laws = laws;
   }

   void teach () {
      System.out.println (this.laws + "...");
   }
} //. Universe
```

Và kết quả khi nhấn `Run` để chạy thử thì chúng ta sẽ thấy thông báo lỗi là `name` và `age` được gắn nhãn `private` nên không khả dụng trong câu lệnh truy xuất từ bên ngoài `class Entity` ở chương trình `main`.

```console.io
Main.java:4: error: name has private access in Entity
      System.out.println ("Name: " + tabha.name);
                                          ^
Main.java:5: error: age has private access in Entity
      System.out.println ("Age: " + tabha.age);
                                         ^
2 errors
exit status 1
```

Bây giờ chúng ta sẽ sửa lại chương trình `main` một chút và thay vì truy xuất trực tiếp tới `age`, chúng ta sẽ gọi phương thức  `whisper`. Phương thức này được `class Universe` kế thừa từ `class Entity`, và bởi vì `whisper` được định nghĩa tại `class Entity` nên có thể truy xuất được `private age` được định nghĩa trong `class Entity`.

```Main.java
class Main {  
   public static void main (String args[]) {
      Universe tabha = new Universe ("Tabha", 1001, "Buddhism");
      tabha.whisper ();
   } 
} //. Main
```

```console.io
1001 years ago...
Tabha...
```

Chúng ta đã biết rằng trong `JavaScript` thì cơ chế hoạt động của `public` và `private` như đã nói ở trên cũng được biểu hiện tương tự. Mặc định thì tất cả các yếu tố `property` và `method` đều được `JavaScript` ngầm định là `public`; Và từ khóa `private` của `Java` thì được `JavaScript` biểu thị bằng một ký tự `#` gắn liền phía trước tên định danh của các yếu tố mà chúng ta muốn ẩn đi.

## Default & Protected

Hai từ khóa `default` và `protected` được `Java` thiết kế với chức năng liên quan tới một khái niệm được gọi là `package`. Một `package` trong `Java` được hiểu đơn giản là một thư mục có chứa các tệp code có liên hệ lẫn nhau. Và nếu một chương trình được viết bằng `Java` với nhiều tệp code được nhóm về nhiều thư mục khác nhau thì khi đó từ khóa `default` và `protected` sẽ thể hiện chức năng đóng gói ở cấp độ thư mục hay còn được gọi là `package level`.

Trong môi trường `JavaScript` thì chúng ta không có khái niệm đóng gói tương tự ở cấp độ thư mục. Vì vậy nên chúng ta sẽ chỉ quan tâm tới một đặc điểm duy nhất của từ khóa `protected` trong `Java` mà chúng ta có thể vay mượn logic hoạt động sang code `JavaScript`. Đó là các yếu tố được gắn nhãn `protected` không khả dụng ở mọi nơi như `public`, nhưng cũng không giống như `private` chỉ khả dụng duy nhất trong `class` đang khai báo trực tiếp.

> Ngoài phạm vi của `class` đang định nghĩa trực tiếp, thì các yếu tố `protected` còn khả dụng đối với code truy xuất được định nghĩa trong các `class` kế thừa.

Bây giờ chúng ta sẽ thử sửa lại code ví dụ trên và đặt nhãn `protected` cho các thuộc tính `name` và `age`. Sau đó, trong định nghĩa của `class Universe`, chúng ta sẽ tạo thêm một phương thức `echo()` và thực hiện truy xuất thông qua con trỏ `this`.

```Main.java
class Main {  
   public static void main (String args[]) {
      Universe tabha = new Universe ("Tabha", 1001, "Buddhism");
      tabha.echo ();
   } 
} //. Main


// -- Entity - - - - - - - - - - - - - - - - - - -

class Entity {
   protected String name;
   protected int age;

   Entity (String name, int age) {
      this.name = name;
      this.age = age;
   }

   void whisper () {
      System.out.println (this.age + " years ago...");
      System.out.println (this.name + "...");
   }
} //. Entity


// -- Universe - - - - - - - - - - - - - - - - - - -

class Universe extends Entity {
   String laws;
  
   Universe (String name, int age, String laws) {
      super (name, age);
      this.laws = laws;
   }

   void teach () {
      System.out.println (this.laws + "...");
   }

   void echo () {
      System.out.println ("Name: " + this.name);
      System.out.println ("Age: " + this.age);
      System.out.println ("Laws: " + this.laws);
   }
} //. Universe
```

```console.io
Name: Tabha
Age: 1001
Laws: Buddhism
```

Như chúng ta đã thấy thì `name` và `age` được định nghĩa là `protected` trong `class Entity`, và khả dụng trong code tham chiếu được định nghĩa trong `class Universe`.

Để làm rõ điểm khác nhau giữa `protected` và `private` thì bạn có thể thử chuyển lại các nhãn của `name` và `age` thành `private`. Như vậy trình chạy thử sẽ thông báo lỗi vì phương thức `echo()` được định nghĩa trong `class Universe` sẽ không được phép truy xuất tới các yếu tố `private` của `class Entity`.

Còn để làm rõ điểm khác nhau giữa `protected` và `public` thì do giới hạn của công cụ `Online REPL` đang sử dụng, chúng ta không thể tạo ra một tệp code trong `package` khác để thử tham chiếu tới các yếu tố `protected`. Tuy nhiên thì như đã nói trước đó, nếu là code viết ở một tệp khác thư mục với `class Universe` và không kế thừa `class Universe` thì chắc chắn sẽ không thể truy xuất được các yếu tố `protected`.

## Protected in JavaScript

Như vậy có một phần logic hoạt động của nhãn `protected` có thể sẽ hữu ích trong một số trường hợp mà chúng ta có thể mong muốn trong `JavaScript`. Đó là khả năng đóng gói trong cùng dòng kế thừa tính từ vị trí của `class` trực tiếp định nghĩa các yếu tố `protected`.

Code tham chiếu được viết trong chính `class` đó hoặc các `class` kế thừa đều có thể sử dụng phép tham chiếu `.` để truy xuất được các yếu tố `protected`. Còn lại thì code logic được định nghĩa ở tất cả các nơi khác trong chương trình sẽ không thể truy xuất trực tiếp được các yếu tố `protected`.

Ở thời điểm hiện tại thì `JavaScript` chưa hỗ trợ tính năng này. Tuy nhiên khá nhiều lập trình viên cho rằng `protected` rất quan trọng nên đã tạo ra một quy ước đặt tên với ký hiệu `_` gắn ở phía trước cho các yếu tố `property` và `method` mà họ sẽ không bao giờ truy xuất trực tiếp từ code định nghĩa bên ngoài dòng kế thừa.

Tức là các yếu tố có tên dạng như `_name`, `_age`, v.v... thì hiển nhiên về mặt kĩ thuật vẫn là `public` và có thể truy xuất được bởi code định nghĩa ở bất kỳ đâu. Tuy nhiên, khi người viết code tự tạo quy ước là sẽ chỉ thực hiện tham yếu tới các yếu tố này khi viết code định nghĩa của các `class` trong cùng dòng kế thừa, thì các yếu tố `_` hiển nhiên sẽ có cách hoạt động giống với `protected`.

```main.js
// -- Entity - - - - - - - - - - - - - - - - - - -

class Entity {
   constructor (name, age) {
      this._name = name;
      this._age = age;
   }

   whisper () {
      console.log (this.age + " years ago...");
      console.log (this.name + "...");
   }
} //. Entity


// -- Universe - - - - - - - - - - - - - - - - - - -

class Universe extends Entity {
   constructor (name, age, laws) {
      super (name, age);
      this.laws = laws;
   }

   teach () {
      console.log (this.laws + "...");
   }

   echo () {
      console.log ("Name: " + this._name);
      console.log ("Age: " + this._age);
      console.log ("Laws: " + this.laws);
   }
} //. Universe


// -- Main - - - - - - - - - - - - - - - - - - -

var tabha = new Universe ("Tabha", 1001, "Buddhism");
tabha.echo ();
```

```CMD|Terminal.io
node main.js

Name: Tabha
Age: 1001
Laws: Buddhism
```

Nguồn tham khảo: [Private & Protected _by JavaScript.info](https://javascript.info/private-protected-properties-methods)

À.. thực ra thì cái quy ước đặt tên cho các yếu tố `protected` mở đầu với ký hiệu `_` vốn được vay mượn từ `Python`. Ở đó thì cả về khía cạnh kĩ thuật, các yếu tố mở đầu `_` thực sự có khả năng ẩn khỏi code tham chiếu từ bên ngoài dòng kế thừa. Do đó nên người viết code sẽ còn có thể nhận được thông báo lỗi logic vận hành nếu như viết nhầm code tham chiếu từ một vị trí không có quyền truy cập.

[[JavaScript] Bài 28: Polymorphism in OOP](https://viblo.asia/p/gwd43B9XVX9)