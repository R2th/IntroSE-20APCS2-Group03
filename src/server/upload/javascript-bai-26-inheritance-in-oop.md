Trích đoạn nói về OOP của [learn.adacore.com](https://learn.adacore.com/courses/intro-to-ada/chapters/object_oriented_programming.html):

> Object-oriented programming (OOP) is a large and ill-defined concept in programming languages and one that tends to encompass many different meanings because different languages often implement their own vision of it, with similarities and differences from the implementations in other languages.  
>  
> However, one model mostly "won" the battle of what object-oriented means, if only by sheer popularity. It's the model used in the Java programming language, which is very similar to the one used by C++.

Và sau một lượt copy/paste qua Google Translate:

> Lập trình hướng đối tượng (OOP) là một khái niệm lớn và khó xác định trong các ngôn ngữ lập trình, và cũng là một khái niệm có xu hướng bao hàm nhiều ý nghĩa khác nhau bởi vì các ngôn ngữ khác nhau thường triển khai tầm nhìn riêng của họ về nó.  
>  
> Tuy nhiên, có một mô hình đang gần như "chiến thắng" trong cuộc chiến về ý nghĩa của hướng đối tượng, nếu chỉ xét trên sự phổ biến. Đó là mô hình được sử dụng trong ngôn ngữ lập trình `Java`, có rất nhiều điểm tương đồng với mô hình được sử dụng bởi `C++`.

Tuyệt.. mình cũng thực sự chưa biết nên xác định phạm vi thảo luận như thế nào thì may mắn vớ được trích đoạn này của các kỹ sư tạo ra ngôn ngữ `Ada`. Như vậy chúng ta có thể lấy `Java` để làm điểm tham chiếu và tìm cách thể hiện logic tương đương trong `JavaScript`.

## Online REPL

Về việc chạy thử code ví dụ minh họa thì chúng ta có thể dùng các công cụ Online miễn phí được cung cấp bởi `replit.com` và không cần phải cài đặt thêm công cụ gì trên máy tính đang sử dụng.

`Online Java REPL:` [`https://replit.com/languages/java10`](https://replit.com/languages/java10)

À.. và có thể là thêm cả `Python` nữa. Ngôn ngữ này rất phổ biến và được xem là `JavaScript` của các ngôn ngữ không sử dụng dạng cú pháp `Block Style` đóng gói các khối lệnh bằng các cặp ngoặc xoắn `{ ... }`; Mà thay vào đó thì các câu lệnh trong Python sẽ được xác định là cùng khối nếu có cùng khoảng trống thụt vào ở đầu dòng `Indentation Style`.

`Online Python REPL:` [`https://replit.com/languages/python3`](https://replit.com/languages/python3)

Bạn hãy thử nhấn vào các liên kết REPL để chạy thử chương trình `"Hello, World!"` của mỗi ngôn ngữ. Ở đây thì chúng ta sẽ nói qua một chút về `"Hello, World!"` của Java để lược bỏ nhanh một số yếu tố chưa cần quan tâm chi tiết.

```Main.java
class Main {  
   public static void main (String args[]) {
      String name = "Java";
      System.out.println ("Hello, " + name + " !");
   } 
} //. Main
```

Điểm khởi chạy của một chương trình viết bằng Java là một phương thức tĩnh `main` của một `class` bất kỳ. Tuy nhiên thì ở đây chúng ta sẽ sử dụng một `class Main` riêng biệt để làm điểm khởi chạy và sẽ tạo ra các `class` khác để mô tả các logic cần tìm hiểu trong `OOP`.

Tạm thời thì chúng ta sẽ chỉ cần quan tâm tới vị trí mà các câu lệnh bắt đầu được thực thi là dòng `String name = "Java";` và tất cả các câu lệnh khác trong khối ngoặc xoắn `{ ... }` của phương thức `main`. Và phương thức `System.out.println ("a string");` là câu lệnh duy nhất mà chúng ta cần ghi nhớ tạm để in một chuỗi `String` ra cửa sổ `console` ở phía bên phải.

![](https://images.viblo.asia/b89c52cd-3581-4e5b-a9f3-aeafb1b0a4d0.png)

Có một điểm khác biệt căn bản mà chúng ta cần lưu ý về mặt cú pháp của `Java` so với `JavaScript` - đó là `Java` là một ngôn ngữ định kiểu tĩnh `static-typing` và các tên định danh khi được tạo ra sẽ cần được khai báo kèm tên kiểu dữ liệu ở ngay phía trước. Cụ thể là trong câu lệnh `String name = "Java";` thì biến `name` được định kiểu là được sử dụng để lưu một chuỗi `String` bất kỳ. Nếu như chúng ta cố tình tạo logic gán vào `name` một giá trị số học thì khi nhấn nút `Run` để chạy chương trình sẽ thấy có thông báo lỗi.

Các kiểu `type-hint` căn bản trong `Java` bao gồm: `String`, `int`, `double`, `boolean`, và `void` là trường hợp đặc biệt được sử dụng để đánh dấu các phương thức không trả về giá trị nào.

Ok.. như vậy là đã tạm ổn. Chúng ta hãy bắt đầu nói về `Inheritance`.

## Single Inheritance

> Về khía cạnh kỹ thuật, Kế Thừa và Mở Rộng là tính năng giúp chúng ta giảm thiểu lượng code logic phải viết lặp lại nhiều lần khi thiết kế các `class` có nhiều điểm chung.

Ví dụ đầu tiên về đặc tính Kế Thừa và Mở Rộng trong Java cũng không có gì khác biệt nhiều so với những gì mà chúng ta đã biết trong JavaScript. Ở đây chúng ta có `class Universe` được định nghĩa là Kế Thừa và Mở Rộng từ `class Entity`.

![](https://images.viblo.asia/629cd457-3b78-4365-8e27-41722fd64460.png)

À.. có một lưu ý nhỏ nữa là phương thức khởi tạo trong `JavaScript` có tên mặc định là `constructor` thì qua `Java` chúng ta sẽ thấy sử dụng luôn tên của `class` để thay thế.

```Main.java
class Main {  
   public static void main (String args[]) {
      Universe tabha = new Universe ("Tabha", 1001, "Buddhism");
      tabha.whisper ();
      tabha.teach ();
   } 
} //. Main


// -- Entity - - - - - - - - - - - - - - - - - - -

class Entity {
   String name;
   int age;

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

```console.io
1001 years ago...
Tabha...
Buddhism...
```

Như vậy chúng ta sẽ tạm kết luận, Kế Thừa và Mở Rộng là logic triển khai code để một bản mẫu `class` mới có thể vay mượn được các yếu tố `property` và `method` từ một bản mẫu `class` đã có trước đó.

Một lưu ý khác đó là tất cả các `class` trong môi trường `Java` đều được ngầm định là kế thừa trực tiếp từ `class Object` đã có sẵn nếu như chúng ta không chỉ định. `JavaScript` cũng vậy. Do đó nên ngoài những yếu tố `property` và `method` mà chúng ta tự viết code định nghĩa, thì mỗi `object` bất kỳ sẽ còn có thêm rất nhiều `property` và `method` khác cung cấp tiện ích có thể rất hữu ích trong một số trường hợp.

## Multiple Inheritance

> Về khía cạnh phản ánh các sự vật trong cuộc sống của chúng ta, Đa Kế Thừa là hình mẫu tự nhiên nhất giúp chúng ta tạo thành một `class` với các đặc điểm `trait` được vay mượn từ nhiều nguồn khác nhau.

Hiển nhiên, mỗi người trong số chúng ta đều sẽ chỉ kế thừa một số đặc trưng của cha, một số đặc trưng của mẹ, và một số đặc trưng khác từ mọi người và môi trường sống xung quanh, ngoài những đặc trưng thuộc về thể kích tâm linh có từ trước khi tiếp nhận cơ thể hiện tại.

Chính vì lý do này nên mô hình kế thừa đơn `Single Inheritance` hay còn được gọi ngắn gọn là `Inheritance` của `Java` hay `JavaScript` không hẳn là lý tưởng để phản ánh, biểu thị, hay mô phỏng lại một khía cạnh của cuộc sống trong môi trường lập trình.

Đó cũng chính là lý do nhiều ngôn ngữ lập trình khác còn hỗ trợ hình thức Đa Kế Thừa `Multiple Inheritance`. Trong trường hợp này thì một `class` mới có thể được `extends` cùng lúc nhiều `class` đã định nghĩa trước đó. Và ở đây chúng ta sẽ cùng xem xét một ví dụ của `Python`.

![image.png](https://images.viblo.asia/f9807ed7-06b2-486a-8d79-5e8142b04ae5.png)

```main.py
class TraitHardWorking:
   spirit = "..."
   stamina = 0

   def work (self):
      print ("Spirit: %s" % self.spirit)
      print ("Stamina: %d" % self.stamina)
      print ("Working...")
   #-- work
#---- TraitHardWorking:


class TraitRunnable:
   feet = 2
   stamina = 0

   def run (self):
      print ("Number of feet: %d" % self.feet)
      print ("Stamina: %d" % self.stamina)
      print ("Running...")
   #-- run
#---- TraitRunnable


class American (TraitHardWorking, TraitRunnable):
   name = "Someone"
  
   def __init__ (self, name, spirit, feet, stamina):
      self.name = name
      self.spirit = spirit
      self.feet = feet
      self.stamina = stamina
   #-- __init__

   def live (self):
      self.run ()
      self.work ()
   #-- live
#---- American


# - main - - - - - - - - - - - - - - - - - -

john = American ("John", "The U.S.", 2, 1001)
john.live ()
```

Trong ví dụ này thì `class American` được tạo ra bằng cách thu nhặt các đặc điểm `Trait` từ nhiều nguồn khác nhau và yếu tố `stamina` được gộp lại khi xuất hiện ở nhiều hơn một `Trait`. Bằng cách tương tự thì chúng ta có thể tạo ra `class Vietnamese` với những `Trait` nhất định có phần giao thoa với một số `Trait` mà `class American` cũng sử dụng.

Ở cấp độ cú pháp của ngôn ngữ thì một số ngôn ngữ khác như `PHP` hay `Scala` còn có từ khóa `trait` tách riêng khỏi `class` và có tính năng chống tạo `object` trực tiếp từ các bản mẫu `trait`. Khái niệm đặc điểm hay nét đặc trưng `trait`, còn được gọi với một cái tên khác là `mixin`, được tạo ra để mô tả một khía cạnh được sử dụng khi tạo nên một bản mẫu `class` nào đó. Và thường thì một `class` sẽ được tổ hợp từ một `class` đã định nghĩa trước đó và các `trait` cần thiết.

## Trait/Mixin in JavaScript

```main.js
const TraitHardWorking = {
   spirit: "...",
   stamina: 0,
   
   work () {
      console.log ("Spirit: " + this.spirit)
      console.log ("Stamina: " + this.stamina)
      console.log ("Working...")
   }
} //. TraitHardWorking


const TraitRunnable = {
   feet: 2,
   stamina: 0,
   
   run () {
      console.log ("Number of feet: " + this.feet)
      console.log ("Stamina: " + this.stamina)
      console.log ("Running...")
   }
} //. TraitRunnable


class American {
   static {
      Object.assign (American.prototype, TraitHardWorking, TraitRunnable)
   }

   constructor (name, spirit, feet, stamina) {
      this.name = name
      this.spirit = spirit
      this.feet = feet
      this.stamina = stamina
   }
   
   live () {
      this.work ()
      this.run ()
   }
} //. American


// - main - - - - - - - - - - - - - - - - - -

john = new American ("John", "The U.S.", 2, 1001)
john.live ()
```

```CMD|Terminal.io
node main.js

Spirit: The U.S.
Stamina: 1001
Working...
Number of feet: 2
Stamina: 1001
Running...
```

Để biểu đạt logic hoạt động tương tự với khái niệm `trait` hay `mixin` như vừa định nghĩa ở phần trên, trong môi trường `JavaScript` chúng ta cần hiểu thêm một chút về bản mẫu được tạo ra bởi `class`.

Thực tế thì khi chúng ta sử dụng cú pháp `class Entity` để định nghĩa một bản mẫu, thì một `object` đại diện sẽ được tạo ra và gắn vào tên định danh `Entity`. Đồng thời `object` bản mẫu sẽ được gắn vào thuộc tính `prototype` của `Entity`.

Khi chúng ta tạo ra một `object` từ `class Entity` bằng phép thực thi `new`, các `property` trong `prototype` được định nghĩa bằng cú pháp thông thường của `class` sẽ được `copy` vào `object` thực thể. À.. và cả những `prototype` của các `class` đứng trước `class Entity` trong dòng kế thừa nữa.

Tuy nhiên thì do chúng ta không định nghĩa `class Entity` kế thừa từ `class` nào khác nữa và vì vậy nên định nghĩa trên tương đương với `class Entity extends Object { ... }`. Mặc dù vậy thì các `property` của `Object.prototype` được cấu hình để không thuộc dạng `enumerable` (có thể điểm danh trong các thao tác tập hợp), vì vậy nên chúng ta sẽ không có thêm thuộc tính nào khác ngoài định nghĩa của `class Entity`.

Phần tiếp theo của câu chuyện đó là chúng ta đã tạo ra các `literal object` để mô tả các `Trait` và sao chép các `property` của các `Trait` này vào `prototype` của `class Entity` trước khi thực hiện bất kỳ thao tác nào khác trong phương thức khởi tạo `constructor`. Như vậy các `object` mới được tạo ra sau đó sẽ mặc định có được các yếu tố định nghĩa bởi các `Trait` như trên.

[[JavaScript] Bài 27 - Encapsulation in OOP](https://viblo.asia/p/W13VM2mx4Y7)