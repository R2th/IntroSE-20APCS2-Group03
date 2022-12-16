![](https://images.viblo.asia/2e81a2e3-a54e-4f27-920f-1f085021ec91.jpg)

Một vấn đề chung của nhiều bạn khi đang thuần thục với ngôn ngữ Java rồi xong chuyển sang học Kotlin là nhiều chỗ "Mình thấy sao nó ngắn gọn quá đến mức khó hiểu hàm đó nó xử lý gì ? " Hay ở những đoạn biểu thức lambda nó "biến hoá" làm mình phải xem thật chậm mới hiểu được. Nhưng không sao cái gì đầu tiên sẽ có một vài điểm "chưa hiểu" nhau mà thôi, lâu dần điều đó sẽ được thay thế chí ít là 1 - 2 cái thú vị đấy :D Như khi ta **tập trung ngắm nhìn** cô gái (chàng trai) nào đó sẽ thấy họ đáng yêu mà lâu nay ta chưa nhận ra, nếu mỗi lúc lại nhìn ngắm 1 em ta khó mà thấy được vẻ đẹp của người bên ta đẹp ở đâu phải không nào ? :sweat_smile:
Và chủ đề chính trong bài chúng ta sẽ đi trả lời những câu hỏi và làm rõ vấn đề sau nhé :

1. SAM Conversion là gì?
2. Implement SAM Conversion
3. SAM Conversion không dùng lambda
4. Điều kì diệu của biến **it**

### 1. SAM Conversion là gì?

**SAM Conversion** dịch ra là Chuyển đổi SAM, đây có phải là tên của một cô gái xinh đẹp hay người nào đó mà ngày xưa mình học Tiếng Anh vẫn thấy không? =)) Đó là một ý nghĩ của mình chắc do hôm nay cuối tuần nên anh em vui vui chút nhỉ :D Với khái niệm này để hiểu được thì chúng ta cần nhớ lại Java Interface, khi tạo 1 interface mà trong đó có **duy nhất** 1 function mà ta vẫn hay làm. Ví dụ luôn nhé:

`ItemRecyclerClick.java`
```
public interface ItemRecyclerClick {
    void onDetail(product Product);
}
```

Đây là listener thường được implement trong 1 adapter của RecyclerView thực thi nhiệm vụ mở xem chi tiết Product, các bạn thấy rất quen phải không? Hay 1 ví dụ đơn giản hơn ở dưới

`Adder.java`

```
public interface Adder {
    int sumNumbers(int a, int b);
}
```

Một interface **Adder** thực thi tính tổng 2 số a, b

Chúng ta đã xong bước tạo ra **1 interface với 1 function** tiếp đến tạo 1 class ẩn danh (anonymous class) để implement nó, bạn biết rồi không thể tạo instance trực tiếp với interface được mà phải thông qua một class trung gian khác đó là anonymous class. Đây là cách xử lý thông thường với 2 cách Java và Kotlin :

`AnonyWithJava.java`

```
public class AnonyWithJava {
    private Adder myAdder = new Adder() {
        @Override
        public int sumNumbers(int a, int b) {
            return a + b;
        }
    };
}
```

`AnonyWithKotlin.kt`

```
val adder = object : Adder {
        override fun sumNumbers(a: Int, b: Int): Int {
            return a + b
        }

    }
```

*Định nghĩa:*

Bây giờ bạn không cần phải làm vậy nữa mà sẽ dùng biểu thức lambda, Kotlin có thể chuyển đổi bất kì biểu thức lambda nào một cách rõ ràng khi có signature khớp với **phương thức đơn** trong Interface thành 1 instance của class anonymous đã implement interface như ở trên. Tất cả điều đó là nhờ vào quá trình chuyển đổi SAM hay chính là SAM Conversion. SAM là từ viết tắt của **Single Abstract Method** à vậy là không giống như tôi đã suy đoán ở trên :D 

Phần định nghĩa chúng ta đã có rồi, bạn chú ý vào những từ tôi đã in đậm và xem ví dụ chắc chắn không khó hiểu vì đây là quá trình chúng ta vẫn hay làm mà chưa biết đến định nghĩa thôi =)) **Chúng ta đã gặp nhau rồi nhưng chưa biết tên**

### 2. Implement SAM Conversion

Như đã nói trong định nghĩa mình sẽ dùng biểu thức lambda để triển khai một interface có một function đơn thì đó là SAM Conversion, nhưng bên cạnh đó nó còn có nhiều cách khác nữa tôi sẽ nói trong mục này luôn nha.

Chúng ta khởi tạo một biến "myAdder" có kiểu dữ liệu Adder interface với biểu thức lambda:

```
val adder = Adder { a, b -> a + b }
```

SAM conversion đã tự động chuyển đổi đoạn function override 

```
override fun add(a: Int, b: Int): Int {
        return a + b
    }
```

thành một biểu thức lambda gắn gọn và dễ hiểu hơn rất nhiều. Đôi lúc việc dùng Adder interface một cách gián tiếp qua một tính năng khác lớn hơn. Ví dụ:

`Calculator.java`
```
public class Calculator {
    private Adder adder;

    public void setAdder(Adder adder) {
        this.adder = adder;
    }

    public void add(int a, int b) {
        Log.d("CALCULATOR", "Sum is " + adder.sumNumbers(a,b));
    }
}
```

Với Kotlin bạn sẽ không cần phải khai báo thêm 1 biến "myAdder" như ở trên nữa mà có thể truyền thẳng việc thực thi vào trong function luôn như này:

**Cách 1:**

```
val calculator = Calculator()
calculator.setAdder({ a, b -> a+b })
```

**Cách 2:**
Một cách ngắn gọn và đơn giản hơn mà Kotlin nó vẫn hiểu chúng ta muốn gì :)

```
calculator.setAdder { a, b -> a+b }
```

*Tiếp đến chúng ta đến với một biến thể khác của SAM Conversion rất thú vị*

### 3. SAM Conversion không dùng lambda

Nhìn lại **Adder interface** chỉ có một function `sumNumbers` có vẻ như sẽ có vấn đề nếu như tôi muốn subtract, multiplication, hay divide nữa thì sao? À cũng hợp lý, chúng ta sẽ làm một bài toán logic hay hơn vì tôi nghĩ những phép toán kia chúng ta tạo ra function ấy để hiểu SAM conversion là gì thôi, còn thực tế ngôn ngữ hỗ trợ hết rồi mà. 

*Bài toán:*

Với 2 số a, b nếu a + b nằm trong khoảng 0 đến 50 thì **sum**, a + b nằm trong 50 đến 100 thì **subtract** còn trên 100 là **multiplication** và trên 200 là **divide** nhé.

Như thế này sẽ giống giống với thực tế hơn mà nó cũng hấp dẫn đấy chứ :D 

Trước tiên tôi đổi tên hàm trong Adder interface thành :

```
public interface Adder {
    int resultOperation(int a, int b);
}
```

Sau đó tôi tạo ra một function care tất cả logic mong muốn ở trên 

```
fun customAdder(a: Int, b: Int): Int {
        val sum = a + b
        if (sum >= 0 && sum <= 50) return sum
        else if (sum <= 100)
            return a - b //subtract
        else if (sum <= 200)
           return a * b //multiplication
        else if (sum > 200) return a / b //divide
        return 0 //Default
    }
```

Giờ chúng ta sẽ không sử dụng biểu thức lambda để tạo instance của anonymous class Adder :

```
calculator.setAdder(this::customAdder)
        calculator.getResult(30, 20)
        calculator.getResult(70, 50)
        calculator.getResult(50, 170)
```

*Kết quả:*

> D/CALCULATOR: Result is 50
> 
> D/CALCULATOR: Result is 3500
> 
> D/CALCULATOR: Result is 0
>

Kotlin cho phép bạn truyền trực tiếp `customAdder` như một tham số vào phương thức khác và tham chiếu tới single method của interface tương ứng. Đây là một điểm thú vị nữa trong Kotlin.

### 4. Điều kì diệu của biến **it**

Nhiều khi trong interface có một phương thức mà chỉ có 1 param, Kotlin cho phép việc bỏ qua định nghĩa biến đó trong biểu thức lambda và sử dụng một tên biến ẩn danh chung là **it**
Cùng xem ví dụ sau đây:

Một interface có phương thức 1 tham số duy nhất, ở đây mình đang bám sát vào định nghĩa và cách dùng nên mới tạo ra interface bằng Java code và nơi sử dụng trong file Kotlin khác. Còn các bạn có thể viết bằng Kotlin hết cũng cho kết quả tương tự nhé. Không phải ép buộc viết với Java đâu :D Nó còn có cái lợi khi viết Kotlin interface ngắn gọn hơn cơ

`Doubler.java`
```
public interface Doubler {
     int doubleIt(int number);
}
```

Khởi tạo instance cho anonymous class với biến **it** như sau :

```
val doubler1 = Doubler { 2 * it }
```

Chúng ta lại có thêm một cách làm mới không cần dùng tới lambda rồi.

**Thêm một điều nữa nha**

Vừa mới nói có thể viết code interface bằng Kotlin, giờ mình sẽ demo luôn việc triển khai class java `Calculator` ở trên bằng Kotlin luôn và đây chính là SAM Interfaces trong Kotlin.
Kotlin hỗ trợ function in function nên có thể coi một function khác làm đối số mà bạn không cần phải tạo SAM interface trong đó. Cùng xem ví dụ này 

`Calculator.kt`

```
class Calculator {
    var adder:(a:Int, b:Int)->Int = {a,b -> 0}

    fun add(a:Int, b:Int) {
        Log.d("CALCULATOR", "Sum is " + adder(a,b))
    }
}
```

Bạn chú ý lúc triển khai với bước sau:

```
calculator.adder = {a,b -> a+b}
calculator.add(4,3)
```

*Kết quả chạy = 7*

Mặc dù bạn thấy rằng trong class ban đầu định nghĩa là **var adder:(a:Int, b:Int)->Int = {a,b -> 0}**

### 5. Tổng kết

Như vậy chúng ta đã cùng nhau đi trọn vẹn nội dung về SAM Conversion, bên cạnh những điều các bạn đã biết và triển khai rồi nhưng chưa biết gọi tên đó là gì. Cứ thấy nó giống tính chất trong lập trình OOP (thừa kế và trừu tượng) nhưng thực ra nó là SAM Conversion và ngoài ra có những cách triển khai thú vị khác nữa mà mình hy vọng sẽ hữu ích với bạn. Cảm ơn các bạn đọc nội dung, Happy Coding !!!