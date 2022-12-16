Như chúng ta đã biết, **Builder pattern** là một trong những **Design Pattern** thuộc về nhóm *Creational Pattern* - những mẫu thiếu kế cho việc khởi tạo đối tượng của lớp. 
**Design Pattern** này sẽ giúp chúng ta tạo mới một đối tượng từ class một cách rõ ràng, linh hoạt. 

 Bên cạnh đó, **Data Class** là một từ khóa không còn xa lạ với chúng ta ở trong Kotlin. 
 Khi sử dụng **Data Class**, với từ khóa này, trình biên dịch sẽ tự động sinh cho chúng ta những hàm thường đi kèm với một POJO ở java như là getter, setter, equals, hashCode, component1, component2,...

Cụ thể về 2 chủ đề trên, mình cũng đã có những bài viết chỉ nói riêng về [Builder Pattern](https://viblo.asia/p/builder-design-pattern-6J3ZgjwgKmB)  và [Data Class trong Kotlin](), nếu ai chưa đọc thì có thể vào ủng hộ mình nhé. 
Còn ở bài viết này, mình chỉ đi sâu hơn về việc so sánh giữa **Data Class** và **Builder Design Pattern**. 

Nhìn chung **Builder Pattern** giải quyết cho chúng ta 2 bài toán: 
* Quá nhiều tham số truyền vào trong một hàm *constructor*, đôi khi không cần thiết
* Thứ tự các tham số hàm *constructor* quá nhiều, khó để nhớ được thứ tự tham số 

Với 2 bài toán trên, **Builder Pattern** đã giải quyết cho chúng ta một cách triệt để, tuy nhiên ở trong Kotlin thì sao? 

Trong Kotlin, **Data Class**  đã hỗ trợ chúng ta trong việc xây dựng những class  có nhiều trường, đôi khi không cần dùng đến  **Builder Pattern** nữa. 

Thực sự là như vậy, các bạn hãy thử xem **Data Class**  đã giải quyết 2 vấn đề của chúng ta như thế nào nhé!

### 1. Bài toán đầu tiên: Quá nhiều tham số truyền vào trong một hàm constructor, đôi khi không cần thiết

Để giải quyết vấn đề này, `Data class` đã hỗ trợ chúng ta trong việc xây dựng những giá trị mặc định 

Với việc khai báo một `class` như này: 
``` Kotlin
data class Student(
    val id: String, 
    val name: String, 
    val gender: String = "Male", 
    val country: String = "Vietnam",
    val address: String? = null
)
```

Nếu như không cần quan tâm tới các trường như `gender`, `country` hay `address`, ta có thể không cần phải truyền những tham số liên quan tới chúng.
``` Kotlin
val student = Student("1234", "Tran Quang Huy")
println(student) // Student(id=1234, name=Tran Quang Huy, gender=Male, country=Vietnam)
```

Như vậy bài toán thứ nhất đã giải quyết xong, vậy bài toán thứ 2 thì sao nhỉ? 

### 2. Bài toán thứ hai: Thứ tự các tham số hàm constructor quá nhiều, khó để nhớ được thứ tự tham số.

Như mình đã giới thiệu ở phần trên, chúng ta hoàn toán có thể định nghĩa rõ ràng những tham số truyền vào thuộc về trường nào mà không cần quan tâm tới thứ tự của chúng trong data class.

Ví dụ, cùng một việc khởi tạo đối tượng Student như trên, mình có thể viết như này: 
``` Kotlin
val student = Student(name = "Tran Quang Huy", id = "1234", country = "Japan")
println(student)// Student(id=1234, name=Tran Quang Huy, gender=Male, country=Japan)
```
Như vậy, với `data class`, không những không cần quan tâm thứ tự các tham số truyền vào, mà khi đọc code, chúng ta lại có thể hiểu được những tham số ấy thuộc về trường nào. 

Đến đây, bạn thử tưởng tượng việc thiết kế `Builder Pattern` đồ sộ so với những dòng code ngắn gọn của `data class`, bạn sẽ thích cái nào hơn?

Tuy nhiên việc gì cũng có ưu và nhược điểm của nó, vậy chúng ta cùng nhau xem bản chất thực sự của các cách giải quyết đó như nào nhé. 

### 3. Data Class xây dựng các giá trị mặc định bằng cách nào ? 

Để biết được Data Class đã xây dựng cách thiết lập cách giá trị mặc định cho thuộc tính của nó bằng cách nào, chúng ta hãy cùng nhau xem Kotlin Bytecode của nó 

Nếu Class Student được viết trong Kotlin như sau 
``` Kotlin
data class Student(
    val id: String = "", 
    val name: String = "Tran Quang Huy"
)
```

Trình biên dịch sẽ sinh ra các đoạn bytecode tương đương với java (Đoạn code dưới mình đã rút gọn) 

``` Java 
public final class Student {
   @NotNull
   private final String id;
   @NotNull
   private final String name;
 ...
 
   public Student(@NotNull String id, @NotNull String name) {
    ...
      super();
      this.id = id;
      this.name = name;
   }

   // $FF: synthetic method
   public Student(String var1, String var2, int var3, DefaultConstructorMarker var4) {
      if ((var3 & 1) != 0) {
         var1 = "";
      }

      if ((var3 & 2) != 0) {
         var2 = "Tran Quang Huy";
      }

      this(var1, var2);
   }

   public Student() {
      this((String)null, (String)null, 3, (DefaultConstructorMarker)null);
   }
    ...
}
```

Chà chà, nhìn qua đã thấy dài dòng hơn rất nhiều rồi. Tất nhiên đó là điều hiển nhiên khi **Data Class** giúp chúng ta viết hộ những đoạn code rườm rà lặp lại.

Nếu nhìn kĩ hơn thì có thể thấy việc thiết lập các giá trị mặc định cho thuộc tính của **Data Class** sẽ đồng nghĩa với việc **Data Class** sẽ sinh thêm cho chúng ta các hàm *constructor* khác nhau. 
Việc tạo ra nhiều *constructor* này giúp chúng ta tùy biến hơn với những *constructor* thiếu *param* truyền vào  

Nói đến đây thì có vẻ như **Data Class** nhìn có vẻ treo đầu dê bán thịt chó thì phải ? 

Dù vậy, chúng ta hãy lưu ý rằng, với những thuộc tính được khai báo là *val* *(final)* thì việc gán lại giá trị là không thể, cách duy nhất gán được giá trị là tạo ra một *constructor* mới mà không thể thông qua các hàm setter như **Builder Design Pattern** đã làm. 
Vậy có thể nói, nhược điểm là phải tạo nhiều *constructor* khác nhau nhưng ưu điểm là có thể áp dụng với tất cả các *access modifier* trong tính đóng gói 

###  4. Data Class  giải quyết thứ tự tham số như nào ? 

Cùng với Class Student ở trên chúng ta hãy xem các cách khởi tạo đối tượng mới nhé 
``` Kotlin
val student1 = Student("20212021", "Tran Quang Huy")
val student2 = Student(id = "20212021", name = "Tran Quang Huy") 
val student3 = Student(name = "Tran Quang Huy", id = "20212021")
```

Với 3 cách khởi tạo trên, chúng ta đều tạo được 3 đối tượng có giá trị giống nhau nhưng cách để chúng tạo ra đối tượng có đôi phần khác nhau đó.

Với 2 cách đầu tiên, khi thứ tự tham số được sắp xếp theo đúng thứ tự,  đối tượng được tạo ra không có gì đặc biệt : 
``` Java 
   @NotNull
   private static final Student student1 = new Student("20212021", "Tran Quang Huy");
   @NotNull
   private static final Student student2 = new Student("20212021", "Tran Quang Huy");
```

Nhưng với cách thứ 3, khi thứ tự tham số lộn xộn, thì đoạn code Java tương ứng sẽ như sao 
``` Java 
      String var0 = "20212021";
      String var1 = "Tran Quang Huy";
      student3 = new Student(var0, var1);
```
Có thể thấy rằng, khi thứ tự tham số không theo trật tự ban đầu, trình biên dịch sẽ phải sinh thêm cách biến *temporary* để lưu các giá trị đúng theo tứ tự rồi mới truyền vào *constructor* .

Việc tạo thêm cách biến này sẽ làm chúng ta tốn thêm 1 phần nhỏ bộ nhớ tạm thời để lưu trữ. 
Vì vậy chúng ta có thể rút ra kết luận rằng, khi sử dụng Data Class, nếu có thể, hãy truyền các param theo đúng thứ tự của nó thì sẽ góp 1 phần nhỏ trong việc cải thiện hiệu suất chương trình nhé.

## Kết luận 
Dù là sử dụng Data Class hay Builder Design Pattern đều có ưu/nhược điểm riêng của nó. Không có cách nào tối ưu hơn hẳn cách nào mà tùy vào cách sử dụng chúng ta cần linh hoạt hơn trong các trường hợp thực tế. 

Cảm ơn cắc bạn đã theo dõi bài viết.