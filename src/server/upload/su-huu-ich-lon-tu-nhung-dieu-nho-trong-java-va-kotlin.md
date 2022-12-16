Kotlin và Java là những ngôn ngữ chính để phát triển ứng dụng Android, với những người đã làm Android lâu rồi thì việc quay trở lại để khám phá thêm những điều nhỏ nhặt trong 2 ngôn ngữ này gần như rất hiếm vì thời gian hạn hẹp. Phát triển ứng dụng đòi hỏi phải đáp ứng kịp deadline, feedback, ... nhưng không vì thế mà một số điều dưới đây giảm bớt tầm **quan trọng** và **thú vị**. 

Trong bài viết này chúng ta sẽ cùng nhìn lại và tìm xem vài điều thú vị trong 2 ngôn ngữ này là gì nha :wink:
Cùng là ngôn ngữ OOP và sở hữu ưu điểm mạnh mẽ: **Thừa kế**. Tất nhiên mình không đi so sánh về những khái niệm này đâu, mà nội dung bài viết sẽ nói về:

> 1. Class vs Type
> 2. Subclass vs Subtype
> 3. Variance: Covariance, Contravariance and Invariance

Mình cùng đi vào những ví dụ trực quan từ những đối tượng trên nhé.

### 1. Class vs Type

Trong Java và Kotlin tất cả những **Class** đều có ít nhất 1 **Type** là chính nó. 
Vd: Integer có type là Integer, String, ...
Nhưng ở Kotlin có type là nullable. Vd: String? -> Đây có phải là một class không ?
Câu trả lời là không vì đó chỉ là một kiểu dữ liệu mà thôi.

Hay `List<String>` có phải là một Class không?

:thinking: Câu trả lời cũng là không phải. Đó chỉ là một type

*Chúng ta có một bảng tóm tắt sau:*

![](https://images.viblo.asia/3b066cb5-47d1-46f6-ab72-40acf990e29f.png)

### 2. Subclass vs Subtype

Điều chúng ta đã biết, khi một class thừa kế từ một class khác để thực thi một nhiệm vụ riêng. Như thế chúng ta có `subclass` và `superclass`

Ví dụ: Number là một superclass của Integer. Nên khi sử dụng ta có thể gán dữ liệu như sau:

Java:

```
Integer integer = new Integer(1);
Number number = integer;
```

Kotlin:

```
val integer: Int = 1
val number: Number = integer
```

Cũng bởi vì Integer là một subtype của Number mà ta có được điều trên.

Một ví dụ khác với **type nullable** sau:

```
val integer: Int = 1
val nullableInteger: Int? = integer
```

Rút ra kết luận: `Int` là là một subtype của `Int?`
Vì vậy khi bạn mới chuyển sang code Kotlin, nhiều lúc bạn dùng hoặc khai báo type như sau:

```
val ageA: Int? = 19
val age: Int = ageA // lỗi gán dữ liệu
```

Bạn bị báo lỗi là bạn hiểu lý do rồi nha, thay vì mình chỉ sửa chữa theo suggest của IDE AS thành : `val age: Int = ageA!!` Nếu chỉ làm vậy thôi là không ổn đâu bạn nhé. :innocent:

### 3.1. Variance (phương sai)

Nhìn cái tên thấy có cái gì đó "căng căng" đấy nhỉ? :D Nhưng thực ra nó là một điều rất đỗi "thân quen" như người nhà.

![](https://images.viblo.asia/8717c12b-6202-4a3d-80e2-35fb422f2167.png)

Thấy rõ hơn khi bạn định nghĩa một chút trong Kotlin như sau:

```
abstract class Animal(val size: Int)
class Dog(val cuteness: Int): Animal(100)
class Dragon(val fly: Int): Animal(1)
```

Làm rồi là biết ngay 2 con vật Dog và Dragon tuy khác biệt lớn đấy nhưng chúng đều là Động Vật (Animal) thôi, nêu chưa quen thì thử check phát:

```
val dog: Dog = Dog(10)
val dragon: Dragon = Dragon(9000)
var animal: Animal = dog
animal = dragon
```

IDE AS "im lặng" không có lỗi đỏ tức là ngon rồi đấy, đúng như suy đoán :sunglasses:

### 3.2. Covariance (hiệp phương sai)

Vẫn là những cái tên khi nhìn vào có chút nguy hiểm, nhưng không sao đâu. :D

Từ ví dụ trong 3.1, chúng ta làm nó phức tạp thêm một chút là khởi tạo 1 danh sách (List) 

```
val dogList: List<Dog> = listOf(Dog(10), Dog(20))
val animalList: List<Animal> = dogList
```

Và điều đã biết là Dog là subtype của Animal nên *animalList = dogList* điều này người ta gọi là type có tính **bảo toàn**
Nó được gọi là **Covariance**

### 3.3. Invariance (Tính bất biến)

Mặc dù Dog và Dragon là subtype của Animal thật, nhưng trong Java ta lại không thể làm điều tương tự như trong Kotlin. :hushed::hushed:

```
List<Dog> dogList= new ArrayList<>();
List<Animal> animalList = dogList; // lỗi xảy ra
```

Có thật không vậy? sao lại thế được nhỉ??? 
Đúng vậy, Java đã **ignore** mối quan hệ type và subtype vì vậy mà không thể gán  `animalList = dogList;` 
Hay nói cách khác trong Java không hề có type và subtype và điều này gọi là **Invariance**

### 3.4. Contravariance (phản biến)

Bây giờ mình sẽ tạo ra 1 `interface Compare<T>` để so sánh 2 đối tượng ví dụ: mức độ cute hoặc "hổ báo" của nhiều con vật xem nó sẽ thế nào nhỉ ? :D
Với function `compare(T item1, T item2)`

Kotlin:

```
val dogCompare: Compare<Dog> = object: Compare<Dog> {
  override fun compare(first: Dog, second: Dog): Int {
    return first.cuteness - second.cuteness
  }
}
```

Nếu mình gán `dogCompare` cho `animalCompare` các bạn nghĩ kết quả có ổn không nhỉ?

`val animalCompare: Compare<Animal> = dogCompare // Lỗi xảy ra `

Ồ sao lại thế nhỉ? Rõ ràng Animal là superType của Dog trong Kotlin cơ mà.
Nhưng trong trường hợp này thì `Compare<Dog>` chỉ để  mà không thể Compare cho Dragon hay Animal được.
Chúng ta nghĩ đến việc làm sao tạo ra cách Compare tất cả các Animal cùng lúc đây ??

**Hãy làm Ngược Lại ** :roll_eyes:

Trước tiên tạo ra type Compare Animal sau đó gán cho tất cả con vật cần được compare 
```
val animalCompare: Compare<Animal> = object: Compare<Animal> {
  override fun compare(first: Animal, second: Animal): Int {
    return first.size - second.size
  }
}
```

`val dogCompare: Compare<Dog> = animalCompare // Successful !`

=> Rút ra nhận xét: Trong trường hợp này **Compare<Animal>** lại là subtype của **Compare<Dog>**  Đây gọi là **Contravariance**
    
### 4. Tổng kết 

Như vậy chúng ta vừa đi qua 3 vấn đề trong Java và Kotlin đôi lúc chúng ta chăm chú phát triển sản phẩm, UI-UX và đã chưa có nhiều thời gian để nhìn lại chúng. Dựa trên những gì trải qua cùng đưa lên cho mọi người bớt chút thời gian nhâm nhi, :cowboy_hat_face::clinking_glasses: 

Hy vọng mọi người có được những lợi ích riêng khi xem xong bài viết của mình, thấy thêm một chút niềm vui trong việc phát triển ứng dụng Android , vv.v 
Còn nhiều điều thú vị hơn mình xin hẹn mọi người ở bài viết sau! :male_detective: