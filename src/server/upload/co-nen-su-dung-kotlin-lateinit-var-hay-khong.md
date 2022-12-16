# Tóm tắt về lateinit

Theo giới thiệu về bối cảnh từ doc thì các property với non-null type sẽ phải được init ở constructor, tuy nhiên việc này thường không thuận tiện. Ví dụ các property được init qua dependency injection, hoặc là qua hàm setup của unit test. Với những case này bạn không thể khởi tạo non-null ở constrcutor nhưng bảo vẫn muốn tránh việc check null khi truy cập đến property đó. 

Để xử lý những case này thì bạn có thể sử dụng `lateinit`:

```kotlin
public class MyTest {
    lateinit var subject: TestSubject

    @SetUp fun setup() {
        subject = TestSubject()
    }

    @Test fun test() {
        subject.method()  // dereference directly
    }
}
```

`lateinit` chỉ dùng với các `var` property ở trong body của class (không phải primary constructor, và chỉ khi property không có custom getter hoặc setter) và từ Kotlin 1.2 cho các top-level property và các local variable. Kiểu của property và variable phải là non-null, và nó không phải là kiểu primitive (kiểu cơ bản).

# Vấn đề

Truy vập một `lateinit` property trước khi nó được init sẽ sinh ra `kotlin.UninitializedPropertyAccessException` xác định property được truy cập khi chưa được khởi tạo. (1)

```kotlin
fun main() {
    User().showCompany()
}

class User() {
    lateinit var company: Company

    fun showCompany() {
        println(company.toString())
    }
}

class Company
```

```kotlin
Exception in thread "main" kotlin.UninitializedPropertyAccessException: lateinit property company has not been initialized
 at User.showCompany (File.kt:9) 
 at FileKt.main (File.kt:2) 
 at FileKt.main (File.kt:-1) 
```

Dù từ Kotlin 1.2 chúng ta có thể check xem `lateinit var` đã được init hay chưa bằng cách dùng `.isInitialized` (2)

```kotlin
    fun showCompany2() {
        println(if (::company.isInitialized) {
            company.toString()
        } else {
            "not Initialized"
        })
    }
```

Quay lại một chút, kotlin sinh ra `non-null type` và `nullable type` để khắc phục cho java nhược điểm có thể truy cập vào `null property` và gây ra `nullpointerexception`. Để truy cập an toàn thì chúng ta cần check property có null hay không trước. (3)

Từ (1) (2) và (3) các bạn sẽ thấy rằng có vấn đề tương tự giữa `lateinit var` trong kotlin và `null type` trong java, nhưng vẫn có nhiều trường hợp mọi người sử dụng `lateinit var` cho các case khác mà không check một cách kỹ càng. Dù lúc mọi người bắt đầu code thì có thể nó không sao, nhưng đến lúc maintain sẽ tiềm ẩn rủi ro lớn. Vậy chúng ta nên khắc phục như thế nào?

# Giải pháp

- Chỉ dùng `lateinit var` lúc cần thiết như tài liệu doc đã mô tả (các property được init qua dependency injection, hoặc là qua hàm setup của unit test, ,..).
- Nếu có dùng thì cần check `isInitialized` cẩn thận.
- Khi không bắt buộc phải dùng thì hãy ưu tiên `var foo: Foo? = null`.

Các bạn hãy lưu ý để code an toàn và ngon hơn nhé :)

Bài của mình đến đây là hết rồi, hẹn gặp lại các bạn :rose:

# Tham khảo
Late-Initialized Properties and Variables

https://kotlinlang.org/docs/reference/properties.html#late-initialized-properties-and-variables