Giống với bất kỳ khía cạnh nào khác trong cuộc sống, cách mà tâm trí của chúng ta tiến hành việc kiến tạo một giá trị công việc luôn có thể chia làm hai giai đoạn:

- Nhìn nhận tổng quan, trừu tượng, lên kế hoạch, v.v...
- Tiến hành cụ thể, chi tiết, thực thi công việc, v.v...

Những công cụ sơ khai đầu tiên về `OOP`, bao gồm cú pháp định nghĩa `class` và các tính năng `Inheritance`, `Encapsulation`, `Polymorphism` thuộc về nhóm công cụ thứ hai. Đó là khi chúng ta thực hiện viết code mô tả logic hoạt động chi tiết cho chương trình. Và bây giờ thì chúng ta sẽ nói về tính năng Trừu Tượng `Abstraction`, phục vụ cho giai đoạn thiết kế tổng quan phần mềm cần xây dựng.

Trong `Java` và nhiều ngôn ngữ hỗ trợ `OOP` chủ điểm, `Abstraction` được hỗ trợ bởi bộ đôi công cụ có tên là: Lớp Trừu Tượng `Abstract Class` và Giao Diện Tham Chiếu `Interface`.

## Abstract Class

Chúng ta sẽ mở đầu bằng việc xem xét một ví dụ với các `class` thông thường mà chúng ta đã biết. Giả sử khi xây dựng một chương trình mô phỏng lại môi trường sống xung quanh, chúng ta có rất nhiều cá nhân thuộc các quốc gia khác nhau. Và để thuận tiện cho việc tạo ra các `object` phân lớp các cá nhân theo quốc tịch, chúng ta sẽ có các `class` kiểu như `Vietnamese`, `American`, `Chinese`, v.v...

Tuy nhiên, do các `object` mô phỏng các cá nhân cũng có nhiều thuộc tính chung căn bản, ngoài những yếu tố mô tả đặc trưng riêng của từng quốc gia. Ví dụ như tên `name`, tuổi `age`, giới tính `gender`, các phương thức hỗ trợ `get()`, `set()`, v.v... Như vậy để giảm lượng code lặp trong các `class` trên thì chúng ta sẽ cần có một `super class` dạng như `Person`.

![image.png](https://images.viblo.asia/4d17c403-b22a-427e-8dc8-0082883d68b9.png)

Câu chuyện lúc này là chúng ta chỉ cần `class Person` nhằm mục đích giảm lượng code lặp trong 1001 `class` kế thừa; Thế nhưng chương trình của chúng ta lại không bao giờ phải tạo `object` trực tiếp từ `class Person` bằng thao tác `new Person()`. Vì vậy nên `class Person` lúc này được hiểu là một dạng thiết kế Trừu Tượng và tạo Ràng Buộc rằng: tất cả các `class` kế thừa sẽ đều có đầy đủ các yếu tố chung thiết yếu.

Với nhu cầu sử dụng `class Person` như vậy thì trong các ngôn ngữ như `Java`, `C#`, v.v... chúng ta có thể sử dụng từ khóa `abstract` đặt ở phía trước định nghĩa `class`, và trình biên dịch sẽ hiểu rằng chúng ta chỉ sử dụng `class Person` nhằm mục đích thiết kế tổng quan và sẽ không muốn thao tác `new Person()` khả dụng trong code logic chi tiết ở bất kỳ đâu.

```Person.java
abstract class Person {
   ...
}
```

Ngoài ra thì từ khóa `abstract` trong `Java` còn có thể được gắn cho các yếu tố của `abstract class` và như vậy các yếu tố này sẽ chỉ mang tính chất khai báo, và tạo ràng buộc để các `class` kế thừa sẽ phải `override` đầy đủ các yếu tố thiết yếu đã khai báo.

```Person.java
abstract class Person {
   protected abstract String name;
   protected abstract int age;
   protected abstract int gender;
   // - - - - - - - - - - - - - - - - - - -
   public    abstract String getName ();
   protected abstract void setName (String name);
   public    abstract int getAge ();
   protected abstract void setAge (int age);
   public    abstract int getGender ();
   protected abstract void setGender (int gender);
} //. abstract Person
```

Và như vậy, nếu trong một `class` kế thừa nào đó mà chưa có code `override` các yếu tố `abstract` này thì khi biên dịch code chúng ta sẽ nhận được thông báo lỗi. Một công cụ hỗ trợ thiết kế tổng quan rất mạnh mẽ.

Để mang tính năng này sang `JavaScript` thì chúng ta có thể xử lý tương tự như trường hợp của `trait` trong bài viết về `Inheritance`. Tuy nhiên thao tác kiểm tra `super class` của một `object` đôi khi cũng được sử dụng để tạo logic code nhất định. Do đó chúng ta nên sử dụng cú pháp `class` và `throw new Error()` ở phương thức khởi tạo `constructor` để chặn khả năng tạo `object` bằng phép thực thi `new`.

```main.js
class AbstractPerson {
   name = "Somebody"
   age = 1001
   gender = "male"
   constructor () { throw new Error ("AbstractPerson is an abstract class.") }
   getSomething () { throw new Error ("Not overridden.") }
   setSomething () { throw new Error ("Not overridden.") }
} //. AbstractPerson

class American extends AbstractPerson {
} //. American


// - main - - - - - - - - - - - -

var fred = new American ()
console.log (fred.getSomething ())
```

```CMD|Terminal.io
node main.js

/home/semiart/Documents/main.js:5
   getSomething () { throw new Error ("Not overridden.") },
                ^

Error: Not overridden.
```

Hm... về việc khóa thao tác khởi tạo `new AbstractPerson()` bằng cách `throw new Error()` trong phương thức khởi tạo `constructor` thì có lẽ là điểm không hẳn cần thiết. Thực tế thì khi sử dụng các `abstract class` trong `Java` cũng sẽ có rất nhiều trường hợp triển khai sẵn `constructor` để giảm lượng code phải viết lặp trong các `class` kế thừa. Có lẽ là chúng ta chỉ cần tạo ra quy ước ngầm định khi viết code đó là sẽ không tạo `object` từ thao tác `new` đối với các `class` được đặt tên với tiền tố `Abstract`.

## Interface

Về khía cạnh kỹ thuật, `Interface` là một dạng khai báo ngắn gọn về các thành phần tạo ra giao diện lập trình `API` của một thư viện code `library`. Công cụ này vốn xuất phát từ một ngôn ngữ lập trình bậc trung có tên là `C`, nơi mà người ta sử dụng các tệp `header.h` để khai báo các hằng số và tên định danh của các `sub-program` được cung cấp bới một thư viện cần xây dựng. Sau đó thì code triển khai logic chi tiết của các `sub-program` sẽ được viết trong các tệp code khác `implement.c`.

Và khi được mang tới `Java` thì chúng ta có thể nhìn nhận một `class` bất kỳ giống như một thư viện bao gồm code định nghĩa logic chi tiết của nhiều yếu tố khác nhau. Trong đó thì các phương thức `method` và các hằng số `static` là các yếu tố thường được nhóm thành các giao diện lập trình `API` được cung cấp bởi `class` đó. Và đối với mỗi giao diện lập trình này, ở giai đoạn thiết kế tổng quan chương trình, `Java` có cung cấp một cú pháp khai báo với từ khóa `interface`.

```Algebra.java
interface Algebra {
   int INFINITY = 0;
   
   int sumInt (int a, int b);
}
```

Sau đó, tới giai đoạn viết code triển khai logic xử lý chi tiết, bất kỳ `class` nào được định nghĩa là có triển khai `implements` giao diện `Algebra` - sẽ được tạo ràng buộc là cần phải viết code triển khai cho các phương thức đã được khai báo trong `interface` này; Hoặc là khi tiến hành biên dịch code và chạy chương trình mà chưa viết code triển khai đầy đủ thì chúng ta sẽ nhận được một thông báo lỗi.

![](https://images.viblo.asia/669926f0-d63f-4bb5-9fd8-4e97178250ff.png)

```Main.java
class Main {
   public static void main (String args[]) {
      Algebra intel = new Math ();
      System.out.println ("Unbound: " + Math.INFINITY);
   } 
} //. Main


// -- Algebra - - - - - - - - - - - - - - - - - - -

interface Algebra {
   int INFINITY = 0;
   
   int sumInt (int a, int b);
}


// -- Math - - - - - - - - - - - - - - - - - - -

class Math implements Algebra {
} //. Math
```

```console.io
Main.java:18: error: Math is not abstract and does not override abstract method sumInt(int,int) in Algebra
class Math implements Algebra {
^
1 error
exit status 1
```

Về khía cạnh phản ánh và mô phỏng `object` trong cuộc sống thực tế, mỗi người trong số chúng ta có thể đảm đương nhiều hơn 1 nhóm tác vụ trong cuộc sống. Ví dụ cụ thể là ban ngày, bạn có thể là một người lao động ở khối công việc LĐPT như: Thủ Công, Xây Dựng, Sửa Chữa, v.v... còn buổi tối thì có thể là một giáo viên dạy nghề ở một trung tâm dạy học bổ túc.

Hiển nhiên trong mỗi khoảng thời gian ban ngày và khi đi dạy học, bạn sẽ tương tác với các cá nhân khác nhau trên những khía cạnh hay giao diện khác nhau. Khi là một người làm công, bạn sẽ sử dụng những phương thức nhất định trong công việc và giao tiếp `khác biệt` so với khi ở vai trò là một người đi truyền đạt lại kiến thức, kinh nghiệm đã có.

Và nếu bạn có ý định tạo ra một chương trình mô phỏng lại môi trường sống xung quanh, thì rất có khả năng bạn sẽ muốn tạo ra một `class Person` như thế này:

```Main.java
interface Crafter {
   String craft ();
   String discuss ();
   void rest ();
}


interface Teacher {
   String teach ();
   String discuss ();
   void listen ();
}


class Person implements Crafter, Teacher {
   ...
}
```

Như vậy, khi tương tác với một `object` tạo ra từ `class Person` qua giao diện `Crafter`, các thao tác truy xuất tới `teach()` sẽ không khả dụng. Và điều ngược lại cũng xảy ra nếu tham chiếu qua giao diện `Teacher`, phương thức `craft()` sẽ không khả dụng.

```java
Person fred = new Person ();

Crafter acrafter = fred;
fred.teach ();
// -- error

Teacher ateacher = fred;
fred.craft ();
// -- error
```

Tính năng giới hạn tương tác qua `interface` như thế này trong `Java` được gọi là `blackbox`. Nếu để đem sang `JavaScript` thì đó là một câu chuyện hơi phức tạp, và cần khá nhiều thao tác sắp xếp lại kiến trúc của `object`. Chúng ta sẽ để dành chủ đề này cho bài viết tiếp theo. Còn bây giờ thì chúng ta sẽ viết code ví dụ mang `interface` sang `JavaScript`.

Khá giống với cách thức mà chúng ta đã mang các `trait` từ các ngôn ngữ hỗ trợ hình thức Đa Kế Thừa `Multi-Inheritance` vào môi trường `JavaScript`. Ở đây chúng ta sẽ tạo ra một `literal object` đại diện cho `interface` và sao chép nội dung vào `prototype` của `class` cần triển khai bằng `static constructor`.

```main.js
const InterfaceWorker = {
   craft () { throw new Error ("Not implemented.") },
   discuss () { throw new Error ("Not implemented.") },
   rest () { throw new Error ("Not implemented.") }
} //. InterfaceWorker


const InterfaceTeacher = {
   teach () { throw new Error ("Not implemented.") },
   discuss () { throw new Error ("Not implemented.") },
   listen ()  { throw new Error ("Not implemented.") }
} //. InterfaceTeacher


class Person {
   static {
      Object.assign (Person.prototype, InterfaceWorker, InterfaceTeacher)
   }
} //. Person


var fred = new Person ()
console.log (fred.craft ())
console.log (fred.teach ())
```

```CMD|Terminal.io
node main.js

/home/semiart/Documents/main.js:2
   craft () { throw new Error ("Not implemented.") },
              ^

Error: Not implemented.
```

Giới hạn trong cách làm này đó là chúng ta sẽ không thể định nghĩa được các hằng số trong `interface` bằng các thuộc tính `static` như trong `Java`. Và như vậy sẽ cần phải sử dụng một quy ước đặt tên để nhận biết và tránh thực hiện thao tác thay đổi giá trị của các yếu tố đó.

Một lưu ý khác nữa, đó là khi sử dụng kèm các `trait` thì chúng ta cần đảm bảo là các `interface` sẽ được áp dụng vào `prototype` trước.

Lý do là vì `interface` là công cụ được sử dụng trong giai đoạn thiết kế tổng quan và sẽ xuất hiện trước hết để tạo ràng buộc. Còn `trait` thì lại là công cụ dùng trong giai đoạn viết code triển khai chi tiết và sẽ xuất hiện sau để đảm bảo rằng nếu có các yếu tố trùng lặp tên định nghĩa với `interface` thì sẽ `override` các ràng buộc đã có.

```main.js
class American extends AbstractPerson {
   static {
      // - implements Interfaces
      Object.assign (American.prototype, InterfaceWorker, InterfaceTeacher)
      // - uses Traits
      Object.assign (American.prototype, TraitHardWorking, TraitRunnable)
   }
} //. American
```

[[JavaScript] Bài 30 - Composition in OOP](https://viblo.asia/p/3kY4gn3yVAe)