Kotlin là một ngôn ngữ được phát triển từ Java, chúng ta có thể viết một chương trình bằng Kotlin với code ngắn gọn hơn so với viết bằng Java. Và khả năng tương tác của Kotlin với Java giúp chúng ta dễ dàng kết hợp nó vào các ứng dụng hiện tại hoặc viết ứng dụng mới, trong khi vẫn có quyền tự do sử dụng các thư viện Java hiện hành.

Tuy nhiên, khi các thư viện này được viết bằng Java, việc sử dụng chúng trong Kotlin thường dẫn việc sử dụng cú pháp giống như Java. Điều này không có nghĩa là chúng ta cần phải "reinvent the wheel" và viết một phiên bản Kotlin của thư viện đó, nhưng chúng ta có thể viết một số lớp phụ trợ bằng Kotlin. 

Khi nói đến dependency injection, tôi không phải là một fan lớn của [Dagger](https://google.github.io/dagger/) vì cần rất nhiều đoạn code vô lý cần dùng để thiết lập nó. Ngoài ra nó không thực sự tốt để thử nghiệm, và với tôi thử nghiệm là một trong những lý do cho việc dùng dependency injection ở nơi đầu tiên. Vì vậy, tôi thích cách tiếp cận của [Toothpick](https://github.com/stephanenicolas/toothpick). Nhưng việc sử dụng nó trong dự án Kotlin đã dẫn tôi tới việc tôi cần cải thiện nó khi mắt tôi đau ^^.

Hãy xem cách chúng tôi kết nối một số class với một module:
```
val module = Module()
module.bind(Repository::class.java).to(DbRepository::class.java)    
module.bind(Scheduler::class.java).toInstance(DefaultScheduler())
module.bind(Api::class.java).toProviderInstance(ApiProvider())
```

Toothpick có thể liên kết một class với một class khác hoặc một instance hiện có hoặc một provider class có thể tạo class cần thiết khi chạy.

Trước tiên, hãy làm điều này tốt hơn một chút với Kotlin:
```
val module = Module().apply {
    bind(Repository::class.java).to(DataBaseRepository::class.java)
    bind(Scheduler::class.java).toInstance(DefaultScheduler())
    bind(Api::class.java).toProviderInstance(ApiProvider())
}
```

Một số điều khiến chúng ta bận tâm:

`to` là một hàm mở rộng hiện có để tạo instance của `Pair`. Có cùng tên, thật dễ dàng để làm hỏng điều này ở đây mà không hề nhận thấy. Ràng buộc của bạn có thể không ràng buộc một thứ nào đó nhưng sẽ tạo ra một instance của `Pair` không được sử dụng.

Vì vậy, chúng ta cần phải viết nó như thế này để đảm bảo rằng có thể nhận được giá trị bên phải của hàm `to` :
```
bind(Repository::class.java).`to`(DataBaseRepository::class.java)
```

Và như vậy, đoạn code của chúng ta đã trở nên xấu xí :D 
Vì vậy, chúng ta sẽ cải tiến từng bước một.

Đầu tiên, sẽ tốt hơn nếu không truyền vào kiểu mà sử dụng generics:
```
bind<Repository>().`to`(DataBaseRepository::class.java)
```
để gọi hàm `bind()` chúng ta cần một instance của class `Class`. Trong Kotlin, bạn có thể nhận được điều này từ một kiểu generic nếu chúng ta đánh dấu là kiểu `refied` ( chỉ hoạt động với các hàm được khai báo là `inline`)
```
inline fun <reified T> Module.bind(): Binding<T> = bind(T::class.java)
```

Bằng cách này, chúng tôi đã thêm một liên kết mới vào Module như một hàm mở rộng.

> Generics nghĩa là tham số hóa kiểu dữ liệu, cho phép chúng ta có thể tạo ra và sử dụng một class, interface, method với nhiều kiểu dữ liệu khác nhau.

Nhưng bây giờ chúng ta có một lời gọi method rỗng. Chúng ta nên sử dụng nó thay vì chỉ dùng nó để gọi phương thức tiếp theo. Vì vậy, hãy xây dựng một cái gì đó để chúng tôi có thể gọi nó như thế này:
```
bindClass<Repository>(DataBaseRepository::class.java)
```

Không hề khó, chúng ta có thể viết như sau:
```
import kotlin.to as toPair

inline fun <reified T> Module.bindClass(target: Class<out T>)
     : Binding<T> = bind<T>().apply { to(target) }
```

Như vậy, chúng tôi đang gọi phương thức `bind` khác mà chúng tôi vừa tạo và sử dụng `apply` để thêm lệnh `to()` trên đó.
Phần `import` sẽ thay đổi tên hàm `to` của Kotlin thành `toPair` để không có xung đột nào tồn tại ở đây.

Nhưng bây giờ chúng ta vẫn đang truyền vào phiên bản Java class, chúng ta có cần để như thế không? Tôi không nghĩ vậy, nó có thể viết như sau:
```
bindClass<Repository>(DataBaseRepository::class)
```


Việc thực hiện rất giống nhau, chúng ta chỉ cần lấy một KClass:
```
inline fun <reified T> Module.bindClass(target: KClass<out Any>): Binding<T> = bind<T>().apply { to(target.java as Class<T>) }
```
     
Và nó hoạt động tốt khi truyền vào tên của class.


Khi nhìn vào các biến thể khác, nó sẽ không được đẹp khi truyền vào một lambda?
```
bindInstance<Scheduler> { DefaultScheduler() }
```

Rất dễ, cú pháp này có thể được sử dụng nếu tham số cuối cùng của hàm là một lambda:
```
inline fun <reified T> Module.bindInstance(target: () -> T): Binding<T> = bind<T>().apply { toInstance(target()) }
```


Điều này đưa tôi đến ý tưởng tiếp theo.
Khi chúng tôi sử dụng một provider, chúng tôi đang viết rất nhiều bản mẫu:
```
class ApiProvider : Provider<Api> {
    override fun get(): Api {
        return RestApi()
    }
}
bind(Api::class.java).toProviderInstance(ApiProvider())
```

Liệu chúng ta cũng có thể truyền lambda vào đây không?
Có lẽ! Nhưng chúng ta hãy đi từng bước:

Áp dụng những gì tôi đã làm ở trên sẽ dẫn tôi đến:
```
bindProviderInstance<Api>(ApiProvider())
```

Trên thực tế, `generic` có thể được bỏ qua ở đây vì `Provider` đã được định nghĩa là `generic`, tính năng tuyệt vời của [`type inference`](https://en.wikipedia.org/wiki/Type_inference).
Nhưng thay vì viết  provider, điều chúng tôi muốn là viết một lambda như thế này:
```
bindProviderInstance<Api> { RestApi() }
```

Đoạn code đằng sau nó sẽ là:
```
inline fun <reified T> Module.bindProviderInstance(target: () -> T): Binding<T> = bind<T>().apply { 
      toProviderInstance(target.asProvider()) 
}
```

trong đó `asProvider()` là một phương thức mở rộng khác ẩn giấu việc tạo bản mẫu của `provider`.
```
fun <T> (() -> T).asProvider(): Provider<T> {
    return object : Provider<T> {
        override fun get(): T {
            return invoke()
        }
    }
}
```

Hãy xem xét tất cả các biến thể đầu tiên theo kiểu của Java:
```
class ApiProvider : Provider<Api> {
    override fun get(): Api {
        return RestApi()
    }
}
val module = Module()
module.bind(Repository::class.java).to(DbRepository::class.java)    
module.bind(Scheduler::class.java).toInstance(DefaultScheduler())
module.bind(Api::class.java).toProviderInstance(ApiProvider())
```

và với kiểu mới của chúng ta:
```
val module = Module().apply {
    bind<Repository>(DataBaseRepository::class)
    bindInstance<Scheduler>(DefaultScheduler())
    bindProviderInstance<Api>{ RestApi() }
}
```

Nhưng mặc dù `apply()` là cách tốt ở đây, nó cũng thường đưa ra gợi ý rằng chúng tôi đang làm việc trên một lớp Java. Vì vậy, hãy cải thiện điều này:
```
val module = module {
    bind<Repository>(DataBaseRepository::class)
    bindInstance<Scheduler>(DefaultScheduler())
    bindProviderInstance<Api>{ RestApi() }
}
```

Định nghĩa này cũng dễ dàng. Một function module nhận một lambda chạy trong ngữ cảnh của Module và trả về một module:
```
fun module(bindings: Module.() -> Binding<*>): Module = Module().apply { bindings() }
```

Và nếu bạn chỉ có một module, hãy đặt phần bên phải này vào scope:
```
val scope = simpleScope(SCOPE) {
    bind<Repository>(DataBaseRepository::class)
    bindInstance<Scheduler>(DefaultScheduler())
    bindProviderInstance<Api>{ RestApi() }
}
```
Trong đó:
```
fun simpleScope(scopeName: Any, bindings: Module.() -> Binding<*>?): Scope = openScope(scopeName).apply { 
     Module().apply { bindings() }
}
```

Và đó là tất cả những gì tôi muốn nói, nó rất dễ dàng để cải thiện một API được thiết kế cho Java khi sử dụng nó trong Kotlin.

Bài viết được dịch từ: [Java libraries with Kotlin. The case of dependency injection frameworks](https://hackernoon.com/java-libraries-with-kotlin-the-case-of-dependency-injection-frameworks-3366f1d6cf48)