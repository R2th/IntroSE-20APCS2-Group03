Thông thường chúng ta cần phải đại diện cho một tập các khả năng nào đó; chẳng hạn một request web thành công hoặc thất bại, hay ví dụ `User` chỉ có thể là Pro-User hoặc Standard-User.

Để mô hình hóa điều này, chúng ta có thể sử dụng một `enum`, nhưng điều này mang đến một số hạn chế. Các lớp Enum chỉ cho phép một instance duy nhất của mỗi giá trị và không thể mã hóa thêm thông tin về từng loại, ví dụ: một trường hợp `Error` có thuộc tính `Exception` liên quan.

Bạn có thể sử dụng một lớp abstract và một số extensions, nhưng điều này làm mất tính chất tập hạn chế là lợi thế mà enums mang lại. Các lớp Sealed cung cấp tốt nhất của cả hai yêu cầu: đại diện cho các lớp trừu tượng abstract và tập hợp các loại enum bị hạn chế. Đọc tiếp để tìm hiểu thêm về các lớp [sealed](https://kotlinlang.org/docs/reference/sealed-classes.html) hoặc, nếu bạn thích một video, hãy xem nó ở đây:

https://youtu.be/OyIRuxjBORY

### Cơ bản về sealed classe
Giống như các lớp abstract, các lớp sealed cho phép bạn biểu diễn các phân cấp. Các lớp con có thể là bất kỳ loại lớp nào: một data class, một [object](https://kotlinlang.org/docs/reference/object-declarations.html#object-declarations), một lớp thông thường hoặc thậm chí một lớp sealed khác. Không giống như các lớp abstract, bạn phải định nghĩa các cấu trúc phân cấp này trong cùng một tệp hoặc dưới dạng các lớp lồng nhau.
```
// Result.kt
sealed class Result<out T : Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
}
```

Nếu bạn thử mở rộng lớp sealed bên ngoài tệp, nó đã được định nghĩa trong kết quả là một lỗi biên dịch:
```
Cannot access ‘<init>’: it is private in Result
```

### Quên một nhánh (branch)?
Thông thường chúng ta muốn handle tất cả các loại có thể:
```
when(result) {
    is Result.Success -> { }
    is Result.Error -> { }
}
```

Nhưng điều gì sẽ xảy ra nếu ai đó thêm một loại `Result` mới: `InProgress`
```
sealed class Result<out T : Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object InProgress : Result<Nothing>()
}
```

Trình biên dịch có thể gây ra lỗi cho chúng ta nếu một nhánh không được bảo vệ. Giống như câu lệnh if, chỉ yêu cầu chúng ta bao gồm tất cả các tùy chọn (nghĩa là toàn diện) bằng cách tạo ra lỗi trình biên dịch khi nó sử dụng như một biểu thức:
```
val action = when(result) {
    is Result.Success -> { }
    is Result.Error -> { }
}
```

Có thể thêm các extension trợ giúp:
```
val <T> T.exhaustive: T
    get() = this
```

Bây giờ, bằng cách thêm `.exhaustive`, nếu một nhánh bị thiếu, trình biên dịch sẽ cung cấp cho chúng ta cùng một lỗi mà chúng ta đã thấy trước đó.
```
when(result){
    is Result.Success -> { }
    is Result.Error -> { }
}.exhaustive
```

### IDE auto-complete
Vì tất cả các sub-types của một lớp sealed đều được biết đến, IDE có thể gợi ý điền vào tất cả các nhánh có thể có của câu lệnh cho chúng ta:
![](https://images.viblo.asia/d6dc34d1-aced-4dc6-936b-1c91224ddb0b.gif)

Tính năng này thực sự nổi bật với hệ thống phân cấp các lớp sealed phức tạp hơn khi IDE có thể nhận ra tất cả các nhánh:
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

![](https://images.viblo.asia/33d3e956-dc6e-4497-9c68-c894481a0340.gif)

Đây là loại chức năng có thể được thực hiện với các lớp trừu tượng vì trình biên dịch không có cấu trúc phân cấp kế thừa; do đó IDE có thể tạo ra các nhánh.

### Under the hood
Vậy, đối với các lớp sealed, hãy xem những gì diễn ra trong mã Java được dịch ngược:
```
sealed class Result
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

Metadata của lớp sealed giữ danh sách các lớp con, cho phép trình biên dịch sử dụng thông tin này khi cần thiết.

`Result` được triển khai như một lớp trừu tượng với hai hàm tạo:
* Một constructor mặc định private
* Một constructor tổng hợp chỉ có thể được sử dụng bởi trình biên dịch Kotlin

Vì vậy, điều này có nghĩa là không có lớp nào khác có thể gọi trực tiếp hàm tạo. Nếu chúng ta nhìn vào mã được dịch ngược của lớp Success, chúng ta sẽ thấy rằng nó gọi đến constructor tổng hợp:
```
public final class Success extends Result {
    @NotNull
    private final Object data
    
    public Success(@NotNull Object data) {
      
       super((DefaultConstructorMarker)null);
       this.data = data;
    }
```

Bắt đầu sử dụng các lớp sealed để mô hình phân cấp lớp bị hạn chế cho phép trình biên dịch và IDE giúp bạn tránh các loại lỗi.

Ref: https://medium.com/androiddevelopers/sealed-with-a-class-a906f28ab7b5