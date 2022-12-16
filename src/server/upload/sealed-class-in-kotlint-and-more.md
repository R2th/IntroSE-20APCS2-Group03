- Chào các bạn, trong bài viết này chúng ta sẽ cùng tìm hiểu một keyword trong kotlint đó là Sealed class, trong nhiều trường hợp thì Selead class tỏ ra khá hữu ích, cùng tìm hiểu nhé.
### 1.Khái niệm
- Cùng đi qua một số khái niệm chính, sealed class viet sub là lớp niêm phong và được hiểu là một lớp mà bị giới hạn các subclass
- Giống như các abstract class , các Sealed class cho phép bạn biểu diễn các thứ bậc. Các class con có thể là bất kỳ loại lớp nào: một data class, một object, một class thông thường hoặc thậm chí một Sealed class khác.
- Không giống như các  abstract class, bạn phải định nghĩa các cấu trúc phân cấp này trong cùng một tệp hoặc dưới dạng các lớp lồng nhau,
- Trước phiên bản kotlint 1.1, các subclass phải định nghĩa trong body của một sealed class
- Từ phiên bản kotlint 1.1 trở đi, cho phép chúng ta định nghĩa các class subclass trong cùng 1 file
- Default constructor của sealed class là private và không thể khởi tạo non-private constructor
- Ví dụ: dưới đây là 1 sealed class chứa 3 subclass của nó 
```
sealed class Vehicle
class Car : Vehicle()
class Truck : Vehicle()
class Bus : Vehicle()
```
- sealed class hoạt động rất hiệu quả khi sử dụng với biểu thức when. Ex: 
```
 sealed class Vehicle
class Car : Vehicle()
class Truck : Vehicle()
class Bus : Vehicle()

fun pick(v: Vehicle) = when (v) {
   is Car -> println("Can transport 4 people")
   is Truck -> println("Can transport furnitures ")
   is Bus -> println("Can transport 50 people ")
   //else -> "else case is not require as all case is covered above"  
}

fun main(){
   val car = Car()
   pick(car) 		
}
output: // Can transport 4 people
```
- Vì đã cover hết tất cả các trường hợp nên, nó giúp chúng ta không cần phải dùng mệnh đề else nữa.
### 2.Hanlde when conditional statement
- Tiếp tục sử dụng sealed class với biểu thức when, chúng ta sẽ cùng tìm hiểu ví dụ tiếp theo.
- Cùng xem file Result.kt bên dưới
```
// Result.kt
sealed class Result<out T : Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
}
```
- Điều này giúp chúng ta dễ dàng quản lí các class của mình
- Và khi bạn cố gắng extend sealed class bên ngoài file thì sẽ thu ngay được một lỗi compile: 
```
Cannot access ‘<init>’: it is private in Result
```
- Khi bạn sử dụng câu lệnh điều kiện when, thông thường ta sẽ muốn xử lí tất cả các trường hợp, ví dụ:
```
when(result) {
    is Result.Success -> { }
    is Result.Error -> { }
}
``` 
Nhưng điều gì sẽ xảy ra nếu ai đó thêm một loại kết quả mới: InProgress
```
sealed class Result<out T : Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object InProgress : Result<Nothing>()
}
```
- when, giống như câu lệnh If, nhưng nó yêu cầu chúng ta covert tất cả các trường hợp, và khi chúng ta thêm 1 loại mới nhưng không xử lý thêm trường hợp cho nó, thì IDE sẽ cho chúng ta một compiler error khi chúng ta sử dụng biểu thức dưới:
```
val action = when(result) {
    is Result.Success -> { }
    is Result.Error -> { }
}
```
- Biểu thức when phải là đầy đủ, chúng ta phải xử lý thêm trường hợp `is InProgress` hoặc là else thay cho nó 
- Để có được lợi ích tiện lợi này ngay cả khi chúng ta sử dụng when làm câu lệnh, hãy thêm extension property của helper này (xem lại bài viết property trong kotlint của mình nếu bạn chưa biết):
```
val <T> T.exhaustive: T
    get() = this
```
Và bây giờ, bằng cách thêm .exhaustive, nếu một trường hợp bị thiếu thì compiler sẽ cho chúng ta một lỗi giống như trước đó
```
when(result){
    is Result.Success -> { }
    is Result.Error -> { }
}.exhaustive
```
### 3.IDE auto-generate 
- Vì các sub-types của sealed class điều được biết đến, nên IDE sẽ có thể tự điền các trường hợp có thể có của câu lệnh when cho chúng ta 

![](https://images.viblo.asia/9b56f92b-6ce3-4c77-a7af-225e88e62b9a.gif)
- Tưởng chừng như đơn giản nhưng tính năng này thực sự tỏa sáng khi chúng ta sử dụng hệ thống phân cấp của các sealed class phức tạp hơn 
```
sealed class Result<out T : Any> {
  data class Success<out T : Any>(val data: T) : Result<T>()
  sealed class Error(val exception: Exception) : Result<Nothing>() {
     class RecoverableError(exception: Exception) : Error(exception)
     class NonRecoverableError(exception: Exception) : 
                                               Error(exception)
  }
  object InProgress : Result<Nothing>()
}
```
![](https://images.viblo.asia/6dd0c79b-29c4-4e73-8489-415eaa03a6df.gif)
- Đây là loại chức năng không thể được thực hiện với các abstract class vì compiler không biết được các phân cấp kế thừa, do đó IDE không thể generate giúp chúng ta các trường hợp.
### 4.Under the hood
- Điều gì khiến các sealed class có thể làm được như vậy, hãy cùng xem những gì thực sự diễn ra bằng cách decompiled Java code
```
ealed class Result
data class Success(val data: Any) : Result()
data class Error(val exception: Exception) : Result()
@Metadata(
…
d2 = {“Lio/testapp/Result;”, “T”, “”, “()V”, “Error”, “Success”, “Lio/testapp/Result$Success;”, “Lio/testapp/Result$Error;” …}
)
public abstract class Result {
    private Result() {}
    // $FF: synthetic method
    public Result(DefaultConstructorMarker $constructor_marker) {
        this();
    }
}
```
- Metadata của sealed class giữ danh sách các sub class, cho phép trình biên dịch sử dụng thông tin này khi cần thiết.
- class `Result` được implemented như một abstract class với hai constructors: 
    - Một private default constructor
    - Một synthetic constructor mà chỉ có thể được sử dụng bởi Kotlin compiler 
- Vậy nên điều này có nghĩa là không có class nào khác có thể trực tiếp gọi constructor, nếu chúng ta nhìn vào decompiled code của Success class thì có thể thấy là nó gọi đến synthetic constructor
```
public final class Success extends Result {
    @NotNull
    private final Object data
    
    public Success(@NotNull Object data) {
      
       super((DefaultConstructorMarker)null);
       this.data = data;
    }
```
### Conclusion
- Như vậy, chúng ta đã tìm hiểu sealead class trong Kotlin, cách sử dụng, ưu điểm và bản chất giúp nó thực hiện, hy vọng bạn đã có thể dùng sealed class cho các mô hình class phân cấp để có thể cho compiler and IDE nhận biết và giúp tránh các lỗi không cần thiết.
- Bài viết có sử dụng nguồn tham khảo: https://kotlinlang.org/docs/reference/sealed-classes.html , https://medium.com/androiddevelopers/sealed-with-a-class-a906f28ab7b5 
- Cảm ơn các bạn đã đọc, xin chào và hẹn gặp lại.