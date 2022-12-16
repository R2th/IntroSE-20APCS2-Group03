![](https://images.viblo.asia/1273a096-1dc4-4995-bbb3-2ee1a943a97d.png)
- Pattern đầu tiên chúng ta cùng nhau tìm hiểu đó chính là Singleton vì tính hữu dụng của pattern này. Không dài dòng nữa. Chúng ta hãy cùng nhau tìm hiểu ngay thôi. Lẹt gô...

## 1. Đặt vấn đề
- Trong quá trình code chúng ta sẽ gặp những trường hợp mong muốn có một đối tượng duy nhất tồn tại để truy xuất đến nhiều nơi. VD khi làm việc với MVP,MVVM,... chúng ta muốn tạo ra 1 đối tượng repository để vừa có thể truy xuất đến database, vừa có thể truy xuất đến các class thao tác api. Trong trường hợp này chúng ta có thể áp dụng Singleton Pattern để giải quyết vấn đề này. Còn rất nhiều trường hợp trong code mà chúng ta muốn tạo ra 1 instance suốt project thì chúng ta cũng có thể áp dụng Singleton Pattern.

- Singleton pattern giải quyết được 2 vấn đề 1 lúc:
    + **1. Đảm bảo rằng một lớp chỉ có một instance duy nhất.** Tại sao mọi người lại muốn kiểm soát số lượng instance mà một lớp có? - Lý do phổ biến nhất cho điều này là kiểm soát quyền truy cập vào một số tài nguyên được chia sẻ (VD: Database,Network,File...)
        + **Lưu ý:** Khi thao tác với Singleton thì không thể thực hiện với một constructor thông thường vì một lời gọi constructor phải luôn trả về một đối tượng mới theo thiết kế. mà phải thao tác với method trả về instance của đối tượng.
    + **2. Cung cấp một method truy cập mọi nơi cho instance đó.** Nhờ vậy mà ta có thể gọi instance đã tạo ở bất cứ đâu trong chương trình.
        + **Lưu ý:** Chỉ tạo method để truy cập instance, không được phép tạo method để thay đổi instance đó. 

## 2. Cách để tạo ra 1 class Singleton
- Tất cả các triển khai của Singleton đều phải thực hiện 2 bước sau:
    + Đặt `constructor mặc định là private`, để ngăn các đối tượng khác sử dụng toán tử `new` với class Singleton.
    + Tạo ra một` static method` với mục đích hoạt động như một constuctor. Method này sẽ tạo ra một instance và lưu nó trong `1 trường static`. Tất cả các lệnh gọi đến method này đều trả về đối được được lưu trong bộ nhớ cache.
 - Khi thao tác với class Singleton thì ta sẽ thao tác với method trả về instance của class đó. Vì vậy bất cứ khi nào method đó được gọi thì luôn trả về cùng một đối tượng.
- **Lưu ý:**  Singleton phải là nhất quán trên nhiều luồng. 
### 2.1 Cấu trúc
![](https://images.viblo.asia/5f623503-9deb-4346-8ced-2428764ed3a1.png)

- Lớp Singleton khai báo static method getInstance() trả về cùng một thể hiện của lớp riêng của nó.
- Constructor của Singleton phải là private. Gọi phương thức getInstance() là cách duy nhất để lấy đối tượng Singleton.

### 2.2 Code ví dụ về class Singleton
- **Java**:
```java
public class Singleton {

    private static Singleton instance = null;

    private Singleton() {
        
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

- **Kotlin:**
```kotlin
class Singleton private constructor(){
	
    companion object{
        private var instance: Singleton? = null

        fun getInstance() = instance ?: synchronized(this) {
            instance ?: Singleton().also{ instance = it }
        }
    }
}
```
## 3. Ưu điểm và nhược điểm của Singleton


| Ưu điểm | Nhược điểm |
| -------- | -------- | 
| Bạn có thể chắc chắn rằng một lớp chỉ có một instance duy nhất.     | Khó triển khai 1 cách hiệu quả để đảm bảo rằng chỉ 1 class chỉ có 1 đối tượng.     | 
| Bạn có được một method truy cập toàn cục vào instance đó.     | Ví dụ, mẫu Singleton có thể che giấu thiết kế xấu khi các thành phần của chương trình biết quá nhiều về nhau.     | 
| Đối tượng singleton chỉ được khởi tạo khi nó được yêu cầu lần đầu tiên.     | Pattern yêu cầu xử lý đặc biệt trong môi trường đa luồng để nhiều luồng sẽ không tạo ra một đối tượng singleton nhiều lần.     | 
|      | Có thể khó viết unit test code có sử dụng Singleton bởi vì nhiều  test frameworks dựa vào tính kế thừa khi mock các object.    | 
|| Constructor của Singleton là private và không thể override các static method trong hầu hết các ngôn ngữ|

## 4. Mối quan hệ giữa Singleton với các pattern khác
- Một class **Facade** có thể được chuyển đổi thành một Singleton vì một đối tượng facede duy nhất là đủ trong hầu hết các trường hợp.
- **Flyweight** sẽ giống với Singleton nếu bằng cách nào đó chúng ta có thể giảm tất cả các trạng thái được chia sẻ của đối tượng cuống còn 1 đối tượng Flyweight. Nhưng có 2 điểm khác biệt cơ bản giữa 2 pattern này:
    + Chỉ nên có một instance Singleton, trong khi Flyweight có thể có nhiều instance với các trạng thái nội tại khác nhau.
    + Đối tượng Singleton có thể thay đổi hoặc bất biến (thay đổi trong trường hợp trong class Singleton chúng ta có các method setter ). Đối tượng Flyweight là bất biến.
- **Abstract Factories, Builders và Prototypes**đều có thể triển khai dưới dạng các Singletons.
## 5. Sử dụng Singleton Pattern khi nào ?
- Trường hợp giải quyết các bài toán: Shared resource, Logger, Configuration, Caching, Thread pool, …
- Một số design pattern khác cũng sử dụng Singleton để triển khai: Abstract Factory, Builder, Prototype, Facade,…
- Đã được sử dụng trong một số class của core java như: java.lang.Runtime, java.awt.Desktop.

## 6. Singleton Pattern trong Kotlin
- Phần này dành cho những bạn nào học Kotlin giống mình.
- Sau đây chính là đoạn code cho 1 Singleton trong Kotlin
    ```kotlin
    object Singleton
    ```
 - Bạn không nhìn nhầm đâu. Đó chính là đoạn code để sử dụng Singleton trong Kotlin. Hết sức đơn giản phải không.
 - **Giải thích:** Trong Kotlin, chúng ta cần sử dụng từ khóa `object` để sử dụng class Singleton. Class Object này có thể chứa các `method`, `property`, `method init` . Phương thức khởi tạo không được phép trong một `object` vì vậy chúng ta có thể sử dụng `init` nếu một số khởi tạo được yêu cầu. Object được khởi tạo khi nó được sử dụng lần đầu tiên.
 - Ví dụ:
 ```kotlin
 object Singleton{

    init {
        println("This is a Singleton class.")
    }
    var name = "Khac Tung - Shjn"
    fun showName(){
        println(name)
    }
}

fun main() {     
    Singleton.showName()
    Singleton.name = "Shjn"
	Singleton.showName()
    //Kết quả:
    //This is a Singleton class.
    //Khac Tung - Shjn
    //Shjn
}
 ```
 
 ### 6.1 Object kế thừa một class
 - Bạn có thể sử dụng một `object` trong Kotlin để mở rộng một số lớp. Hãy lấy một ví dụ tương tự:
```kotlin
open class A {
    init {
        println("Init of A")
    }
    
    open fun printName() {
    }
}

object Singleton : A() {
    override fun printName() {
    }
}
fun main() {
    Singleton.printName() //Init of A
}
```

### 6.2 Class Singleton với Argument trong Kotlin.
- Như chúng ta đã thấy bên trên thì khi sử dụng `object` để triển khai Singleton thì sẽ không có constructor và chúng ta dùng init để thay thế. Vậy nếu chúng ta cần truyền một tham số vào class Singleton thì phải làm thế nào?
- Chúng ta sẽ viết như sau:
```kotlin
class Singleton private constructor(private val dao: DAO){
	
    companion object{
        private var instance: Singleton? = null

        fun getInstance(dao: DAO) = instance ?: synchronized(this) {
            instance ?: Singleton(dao).also{ instance = it }
        }
    }
}
```

## 7. Singleton Pattern trong Android
- Trong ứng dụng Android điển hình, có nhiều đối tượng mà chúng ta chỉ cần một instance của chúng dù cho chúng ta đang sử dụng trực tiếp hay chỉ đơn giản là chuyển nó qua một lớp khác. VD: `OkHttpClient, HttpLoggingInterceptor, Retrofit, GSon,...`. Nếu chúng ta khởi tạo nhiều hơn 1 instance của các object này thì sẽ gặp phải các vấn đề như hành vi của ứng dụng không chính xác, sử dụng quá mức tài nguyên và cho ra các kết quả không mong muốn.
- **Ví dụ tạo ra một instance Singleton của Retrofit.**
```kotlin
object MyApi {
    private const val BASE_URL = "your_base_url"

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private fun retrofit(): Retrofit {
        return Retrofit.Builder()
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .addCallAdapterFactory(CoroutineCallAdapterFactory())
            .client(clientBuilder.build())
            .baseUrl(BASE_URL)
            .build()
    }
    ...
}
```
- Ngoài ra chúng ta còn có cách khai báo Singleton nhanh hơn đó là sử dụng [dependency injection](https://developer.android.com/training/dependency-injection). Tuy nhiên trong bài này mình sẽ không đi sâu vào `di`. Bạn có thể tìm thêm để biết về `di` nha. 
- Mình đưa ra ví dụ minh họa về tạo Singleton bằng `dependency injection` :
```kotlin
@Module
@InstallIn(YourSingletonComponent::class)
object AnalyticsModule {

    @Singleton
    @Provides
    fun provideAnalyticsService(): AnalyticsService {
        return Retrofit.Builder()
            .baseUrl("https://example.com")
            .build()
            .create(AnalyticsService::class.java)
    }
}
```
## Kết luận
- Như vậy là chúng ta đã tìm hiểu về Singleton Pattern. Phần tiếp theo chúng ta sẽ tìm hiểu tiếp các pattern khác cùng nhau nhé.
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý để mình có thể hoàn thiện kiến thức hơn nữa.
- Cảm ơn mọi người đã đọc bài của mình
- Nguồn tham khảo:
    + https://refactoring.guru/design-patterns/singleton
    + https://gpcoder.com/4190-huong-dan-java-design-pattern-singleton/#Su_dung_Singleton_Pattern_khi_nao
    + https://blog.mindorks.com/how-to-create-a-singleton-class-in-kotlin
    + https://code.tutsplus.com/tutorials/android-design-patterns-the-singleton-pattern--cms-29153