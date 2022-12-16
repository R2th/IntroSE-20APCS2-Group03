Cú pháp ngắn gọn và cực kỳ dễ sử dụng, [default argument](https://kotlinlang.org/docs/reference/functions.html#default-arguments) chấp nhận việc bạn thực hiện implement hàm được nạp chồng (overloads) mà không cần viết code tất cả các hàm nạp chồng như khi sử dung ngôn ngữ Java. Giống như rất nhiều tính năng khác của Kotlin, default arguments được coi như một phép màu vậy. Bạn có cảm thấy hứng thú khi đọc đến đây không ? Nếu có hãy đọc tiếp và cùng mình tìm hiểu xem cơ chế hoạt động thực sự của default arguments như thế nào nhé :D .

# I. Cách sử dụng cơ bản
- Khi bạn cần overload một function, thay vì việc viết ra một function nhiều lần với các tham số của function khác nhau thì bạn có thể sử dụng default arguments:

```Kotlin
// instead of:
fun play(toy: Toy){ ... }

fun play(){
    play(SqueakyToy)
}

 // use default arguments:
 fun play(toy: Toy = SqueakyToy)

fun startPlaying() {
    play(toy = Stick)
    play() // toy = SqueakyToy
}
```

- Default arguments cũng có thể sử dụng với constructor:
 
```Kotlin
class Doggo(
    val name: String,
    val rating: Int = 11
)

val goodDoggo = Doggo(name = "Tofu")
val veryGoodDoggo = Doggo(name = "Tofu", rating = 12)
```

- Tới đây, một bài toán được đặt ra đó là khi dự án sử dụng cả hai ngôn ngữ Kotlin và Java thì chúng ta có thể áp dụng thằng default arguments vào được không ? Chúng ta cùng đến với phần II để làm sáng tỏ điều này nhé.

# II. Tương tác với Java
- Có một đoạn code ví dụ như bên dưới:

```Kotlin
// kotlin
fun play(toy: Toy = SqueakyToy) {... }

// java
DoggoKt.play(DoggoKt.getSqueakyToy());
DoggoKt.play(); // error: Cannot resolve method 'play()'
```

- Nếu viết code như bên trên và gọi hàm play(),  Java không thể tự nhận biết được giá trị mặc định `toy: Toy = SqueakyToy`. Để thông báo cho compiler tạo ra các overload methods, các bạn hãy thêm annotation `@JvmOverloads` phía trước tên hàm trong Kotlin như dưới đây:

```
@JvmOverloads
fun play(toy: Toy = SqueakyToy) {… }
```

- Vậy là vấn đề được giải quyết :D. Chuẩn bị tới với phần III chúng ta sẽ xem cơ chế hoạt động của thằng default arguments này như thế nào nhé.

# III. Tìm hiểu cơ chế hoạt động
- Mình sẽ đưa lại ví dụ mình đã nêu ở phần I và phân tích nó:

```Kotlin
fun play(toy: Toy = SqueakyToy)

fun startPlaying() {
    play(toy = Stick)
    play() // toy = SqueakyToy
}
```

- Các bạn thử copy rồi paste đoạn code trên vào Android studio, sau đó hãy làm theo các bước dưới đây `Tools -> Kotlin -> Show Kotlin Bytecode` rồi nhấn nút `Decompile`. Dưới đây là những gì mà chúng ta nhận được:

```Java
// decompiled Java code
public static final void play(@NotNull Toy toy) {
   Intrinsics.checkNotNullParameter(toy, "toy");
}

// $FF: synthetic method
public static void play$default(Toy var0, int var1, Object var2) {
   if ((var1 & 1) != 0) {
      var0 = SqueakyToy;
   }

   play(var0);
}

public static final void startPlaying() {
   play(Stick);
   play$default((Toy)null, 1, (Object)null);
}
```

- Các bạn có thể thấy compiler tự động tạo ra 2 functions:
    * `play`: có 1 tham số `Stick` và được gọi khi không sử dụng default arguments.
    * `play$default`: có 3 tham số lần lượt là Toy, 1 và Object. Hàm này được gọi khi chúng ta sử dụng default arguments, tham số Object luôn luôn có giá trị null nhưng tham số có kiểu int (ở đây đang có giá trị là 1)  thì khác. Hãy xem tại sao lại xảy ra điều này nhé :D

# IV. The int parameter
- Giá trị của tham số có kiểu int trong hàm `play$default` được tính toán dựa trên số lượng và vị trí của argument mà chúng ta truyền vào giá trị mặc định. Nhờ giá trị này mà Kotlin compiler có thể biết được function play sẽ được gọi với parameter thế nào.
- Trong hàm play() ở ví dụ trên, argument ở vị trí 0 sử dụng default argument. Thực chất là hàm `play$default` với int var1 = 2⁰:

```
play$default((Toy)null, 1, (Object)null);
```

- Sau đó, việc triển khai `play$default` biết rằng giá trị của var0 nên được thay thế bằng giá trị mặc định. Mình sẽ lấy một ví dụ phức tạp hơn để xem tham số int hoạt động như thế nào và giúp mọi người hiểu sâu hơn phần này nhé.

```
fun play(doggo: Doggo = goodDoggo, doggo2: Doggo = veryGoodDoggo, toy: Toy = SqueakyToy) {...}

fun startPlaying() {
    play2(doggo2 = myDoggo)
}
```

- Hãy cùng xem chuyện gì xảy ra khi chúng ta decompiled đoạn code trên:

```
public static final void play(@NotNull Doggo doggo, @NotNull Doggo doggo2, @NotNull Toy toy) {
...
 }

// $FF: synthetic method
public static void play$default(Doggo var0, Doggo var1, Toy var2, int var3, Object var4) {
  if ((var3 & 1) != 0) {
     var0 = goodDoggo;
  }

  if ((var3 & 2) != 0) {
     var1 = veryGoodDoggo;
  }

  if ((var3 & 4) != 0) {
     var2 = SqueakyToy;
  }

  play(var0, var1, var2);
}

public static final void startPlaying() {
    play2$default((Doggo)null, myDoggo, (Toy)null, 5, (Object)null);
 }
```

- Giờ thì tham số int đã có giá trị là 5 rồi. Quá trình tính toán diễn ra như sau: tham số ở vị trí 0 và 2 đang sử dụng giá trị mặc định nên `var3 = 2⁰ + 2² = 5`:

    * `var3 & 1 != 0` is true so `var0 = goodDoggo`
    * `var3 & 2 != 0` is false so `var1 is not replaced`
    * `var3 & 4 != 0` is true so `var2 = SqueakyToy`

- Dựa trên mặt bitmask được áp dụng cho var3, trình biên dịch có thể tính toán tham số nào nên được thay thế bằng giá trị mặc định.

# V. The Object parameter
- Trong các ví dụ mình đã nêu ở trên, các bạn có thể nhận thấy rằng giá trị của tham số Object luôn là null và nó thực sự không bao giờ được sử dụng trong hàm `play$default`. Nguyên nhân là vì chức năng của tham số này là kết nối để hỗ trợ các giá trị mặc định trong trường hợp override functions. Ở trên mình mới phần tích cách hoạt động của Default arguments với việc overload function, tiếp theo chúng ta sẽ xem với override function thì Default arguments sẽ hoạt động thế nào nhé :D .

# VI. Default arguments và kế thừa
- Điều gì sẽ xảy ra khi chúng ta muốn override một hàm với các đối số mặc định? Mình sẽ thay đổi một chút ví dụ đã nêu ở phần IV:
    * Biến hàm play() thành open function, class Doggo trở thành một open class.
    * Tạo một lớp PlayfulDoggo mới extends Doggo và override hàm play().

- Khi các bạn muốn đặt một giá trị mặc định trong PlayfulDoggo.play có thể dễ dàng thấy rằng IDE sẽ báo lỗi, không cho phép chúng ta làm như vậy. Bởi vì một hàm ghi đè không được phép chỉ định giá trị mặc định cho các tham số của nó (**An overriding function is not allowed to specify default values for its parameters**)

```
open class Doggo(
    val name: String,
    val rating: Int = 11
) {
    open fun play(toy: Toy = SqueakyToy) {...}
}

class PlayfulDoggo(val playfulness: Int, name: String, rating: Int) : Doggo(name, rating) {
    // error: An overriding function is not allowed to specify default values for its parameters
    override fun play(toy: Toy = Stick) { }
}
```

- Nếu xóa đi `override` và kiểm tra đoạn code được decompiled, hàm `PlayfulDoggo.play()` sẽ trông như sau:

```
public void play(@NotNull Toy toy) {...  }

// $FF: synthetic method
public static void play$default(Doggo var0, Toy var1, int var2, Object var3) {
  if (var3 != null) {
     throw new UnsupportedOperationException("Super calls with default arguments not supported in this target, function: play");
  } else {
     if ((var2 & 1) != 0) {
        var1 = DoggoKt.getSqueakyToy();
     }

     var0.play(var1);
  }
}
```

- Điều này có nghĩa là các lệnh gọi `super` với đối số mặc định có thể sẽ được hỗ trợ trong tương lai chứ chưa phải bây giờ :D . Hãy cùng chờ đợi và ngóng trông kết quả với mình nhé. 

# VII. Constructors
- Đối với các hàm tạo, mã Java được decompiled chỉ có một điểm khác biệt:

```
class Doggo(
    val name: String,
    val rating: Int = 11
)

// decompiled Java code
public final class Doggo {
   ...

   public Doggo(@NotNull String name, int rating) {
      Intrinsics.checkNotNullParameter(name, "name");
      super();
      this.name = name;
      this.rating = rating;
   }

   // $FF: synthetic method
   public Doggo(String var1, int var2, int var3, DefaultConstructorMarker var4) {
      if ((var3 & 2) != 0) {
         var2 = 11;
      }

      this(var1, var2);
   }
```

- Hàm Doggo(...) thay vì sử dụng `Object` nó lại sử dụng `DefaultConstructorMarker` với giá trị null

# VIII. Tổng kết
- Đơn giản và dễ hiểu, default arguments làm giảm số lượng code mà chúng ta cần viết khi xử lý overload các phương thức, cho phép chúng ta đặt giá trị mặc định cho các tham số của mình. Ngôn ngữ Kotlin thật tuyệt vời và nó sẽ tuyệt hơn nữa khi chúng ta decompile code, đọc và hiểu được sâu cách thức hoạt động bên dưới. Bài viết đến đây kết thúc, chúc các bạn có một ngày làm việc vui vẻ và nhiêu năng lượng. Hẹn gặp lại trong các bài viết sắp tới ;) .