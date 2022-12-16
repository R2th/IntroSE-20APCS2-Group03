![](https://images.viblo.asia/9d17a350-de74-4d05-b239-8d009e642ccb.png)
Kotlin Data Class thật tuyệt vời, chúng ngắn gọn, và dễ dàng sử dụng. Gson cũng vậy, nó là một tiêu chuẩn để parsing Json trong Android một cách dễ dàng. Nhưng có một vấn đề là, các data class được phân tích có đảm bảo null safety hay có giá trị mặc định?

### The problem
- Có một [bài viết](https://proandroiddev.com/most-elegant-way-of-using-gson-kotlin-with-default-values-and-null-safety-b6216ac5328c) khá hay đã miêu tả issue này. Nếu bạn có một data class như thế này:
```kotlin

data class SomeData(
    val intValue: Int,
    val strValue: String = "default value"
)
```
Các giá trị mặc định sẽ bị bỏ qua, vì vậy khi Json là {"intValue":2} nó sẽ tạo ra đối tượng {intValue = 2, strValue = null} thay vì thứ ta muốn là {intValue = 2, strValue = "default value"} 
Thật may là có cách để ta khắc phục điều này
### Solution
Hãy sửa lại data class trên kia một chút 
```kotlin 
data class SomeData(
    val intValue: Int = 0,
    val strValue: String = "default value"
)
```
Bạn có thấy một chút khác biệt? Class này định nghĩa tất cả các giá trị default cho tất cả các trường. Đây chính là KEY. Ngay khi tất cả c ác trường được gắn giá trị mặc định, Gson sẽ tôn trọng chúng khi các trường tương ứng bị thiếu trong Json (nếu bạn không cần giá trị mặc định hãy gán trường đó bằng null). 

Tại sao chúng lại hoạt động??

### Reason
So sánh 2 class
```kotlin
data class WithoutDefaultConstructor(
    val intValue: Int,
    val strValue: String = "default"
)

data class WithDefaultConstructor(
    val intValue: Int = 1,
    val strValue: String = "default"
)
```
Xem byte code của chúng :

```Java 
public final class WithoutDefaultConstructor {
   private final int intValue;
   @NotNull
   private final String strValue;

   public WithoutDefaultConstructor(int intValue, @NotNull String strValue) {
      super();
      this.intValue = intValue;
      this.strValue = strValue;
   }

   public WithoutDefaultConstructor(int intValue, String strValue, int defaultParametersFlags, DefaultConstructorMarker defaultConstructorMarker) {
      if ((defaultParametersFlags & 2) != 0) {
         strValue = "default";
      }

      this(intValue, strValue);
   }
   //... other methods
}

public final class WithDefaultConstructor {
   private final int intValue;
   @NotNull
   private final String strValue;

   public WithDefaultConstructor(int intValue, @NotNull String strValue) {
      super();
      this.intValue = intValue;
      this.strValue = strValue;
   }

   public WithDefaultConstructor(int intValue, String strValue, int defaultParametersFlags, DefaultConstructorMarker defaultConstructorMarker) {
      if ((defaultParametersFlags & 1) != 0) { // checking binary flag for the first parameter presence `01`
         intValue = 1;
      }

      if ((defaultParametersFlags & 2) != 0) { // checking binary flag for the second parameter presence `10`
         strValue = "default";
      }

      this(intValue, strValue);
   }

   public WithDefaultConstructor() {
      this(0, (String)null, 3, (DefaultConstructorMarker)null);
   }
   //... other methods 
}
```

Khi tất cả các trường được gắn giá trị mặc định, trình biên dịch Kotlin sẽ tạo ra hàm khởi tạo không có tham số mặc định bên cạch các hàm overload nó tạo ra

### Java Unsafe Invocations in Gson
Sự hiện diện của hàm khởi tạo mặc định rất quan trọng đối với Gson. Cách thức hoạt động của nó ở [đâyyy](https://github.com/google/gson/blob/master/gson/src/main/java/com/google/gson/internal/ConstructorConstructor.java). Nó sẽ

- Cố gắng tạo  ra một đối tượng thông qua [InstanceCreator](https://github.com/google/gson/blob/master/gson/src/main/java/com/google/gson/InstanceCreator.java) được implement dựa trên base on type-token
- Cố gắng gọi hàm khởi tạo mặc định
- Cố gặng gọi hàm khởi tạo cho maps, sets, queues,..
- Sử dụng  [unsafe allocation](https://github.com/google/gson/blob/master/gson/src/main/java/com/google/gson/internal/UnsafeAllocator.java)


Điều đó có nghĩa là, nếu bạn không cung cấp một instance creator và lớp của bạn không có một default contrustor, object sẽ được tạo mà không có lệnh gọi hàm khởi tạo. Kotlin đặt tất cả các kiểm tra null và gán giá trị mặc định cho hàm tạo,vì vậy tất cả chúng sẽ bỏ qua 
Vì vậy nếu bạn muốn thực sự tốt khi sử dụng Gson và chưa sẵn sàng chuyển sang một thư viện mới của Kotlin như Moshi, hãy xác định tất cả các giá trị mặc định trong data class và để Gson làm nốt phần còn lại.
### Note
Giải pháp trên hoạt động tốt cho Json với các trường bị thiếu, nhưng nó có một vấn đề là. Tính nullability được định nghĩa trong Kotlin có thể không được tôn trọng trong Json, và Gson sẽ không complain về Json dạng {"intVaule":2, "strValue":null} có chứa null rõ ràng. Nếu vào case này, hãy xác định các trường để nullable để tránh gặp lỗi

### References
- https://proandroiddev.com/safe-parsing-kotlin-data-classes-with-gson-4d560fe3cdd2