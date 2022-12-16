Dependency injection (DI) là một kỹ thuật được sử dụng rộng rãi trong lập trình và rất phù hợp với sự phát triển của Android. Bằng cách tuân theo các nguyên tắc của DI, ứng dụng của bạn sẽ có base tốt, chặt chẽ, dễ maintance.

Lợi thế của DI:
* Khả năng reuse code.
* Dễ refactor.
* Dễ test.

## Nguyên tắc cơ bản của DI

### DI là gì?

Các class thường yêu cầu tham chiếu đến các class khác. Ví dụ, class **Car** sẽ tham chiếu đến class **Engine**. Các class được yêu cầu tham chiếu này được gọi là dependencies, và trong ví dụ này thì class **Car** phụ thuộc (dependent) vào instance của class **Engine** để có thể run được.

Có 3 cách để class có thể có được object mà nó cần:
1. Class khởi tạo dependency mà nó cần. Trong ví dụ **Car** sẽ khởi tạo một instance của **Engine**.
2. Lấy nó từ một nơi khác. Một vài Android APIs, như **Context** getter và **getSystemService()** hoạt động theo cách này.
3. Truyền parameter. App có thể cung cấp những dependencies này khi class khởi tạo hoặc truyền từ function cần những dependency này. Trong ví dụ trên, constructor của **Car** sẽ nhận **Engine** như là một parameter.

Option thứ 3 chính là DI! Với cách tiếp cận này, bạn lấy các dependency của một class và cung cấp cho chúng thay vì khởi tạo lại chính chúng.

Ví dụ sau, không có DI, **Car** khởi tạo **Engine** dependency của chính nó:

```kotlin
class Car {

    private val engine = Engine()

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.start()
}
```

Đây không phải là DI, vì class **Car** khởi tạo **Engine** của bản thân nó. Đây có thể là vấn đề vì những lý do sau:

* **Car** và **Engine** liên kết chặt chẽ - một instane của **Car** sử dụng một loại **Engine**, và không có subclass hay implement thay thế để có thể sử dụng dễ dàng. Nếu **Car** khởi tạo **Engine** của riêng nó, bạn sẽ phải tạo 2 loại **Car** thay vì reuse lại cùng **Car** cho động cơ chạy **Gas** hoặc **Electric**.
* Hard dependency vào **Engine** làm cho việc testing trở nên khó hơn. **Car** sử dụng instance thật của **Engine**, việc này ngăn chặn bạn sử dụng [test double](https://en.wikipedia.org/wiki/Test_double) để modify **Engine** objject như là một parameter trong constructor của nó:

```kotlin
class Car(private val engine: Engine) {
    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val engine = Engine()
    val car = Car(engine)
    car.start()
}
```

Hàm **main** sử dụng **Car**. Vì **Car** phụ thuộc vào **Engine**, ứng dụng sẽ tạo một instance của **Engine**, và sử dụng để khởi tạo instance của **Car**. Lợi thế của sử dụng DI là:

* Khả năng reuse lại **Car**, Bạn có thể truyền vào các implement khác nhau của **Engine** vào **Car**. Ví dụ, bạn có thể define một subclass mới của **Engine**, gọi là **ElectricEngine** cho **Car** sử dụng. Nếu dùng DI, bạn chỉ cần truyền một instance của subclass update **ElectricEngine**, và **Car** vẫn hoạt động tốt mà không cần thay đổi gì.
* Dễ dàng test **Car**. Bạn có thể truyền vào test double để test trong nhiều hoàn cảnh.

![](https://images.viblo.asia/607a7927-220d-4791-8abd-3c8d9a2bdee1.png)

Có 2 cách chính để thực hiện DI trong Android:

* **Constructor Injection**: Đây là cách được mô tả bên trên, truyền dependencies của class vào constructor của nó.
* **Field Injection (hay Setter Injection)**: Framework class Android hiện tại như activity và fragment đã được khởi tạo bởi hệ thống, vì vậy constructor injection là không thể thực hiện.Với field injection, dependencies được khởi tạo sau khi class được tạo ra. Ví dụ:

```kotlin
class Car {
    lateinit var engine: Engine

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.engine = Engine()
    car.start()
}
```

### DI tự động

Trong ví dụ trước, bạn khởi tạo, cung cấp và quản lý dependencies trong các class khác nhau mà không sử dụng lib. Việc này gọi là *DI by hand*, hay *manual DI*. Trong ví dụ **Car**, chỉ có 1 dependency, nhưng với dependencies và class có thể khiến cho manual DI trở nên nhàm chán, tẻ nhạt hơn. Manual DI cũng có một vài vấn đề:

* Với những app lớn, lấy tất cả các dependencies  và kết nối chúng một cách chính xác cần một lượng lớn code mẫu. Trong multi-layer architecture, để tạo một object cho top layer, bạn phải cung cấp dependency cho tất cả các layer bên dưới. Ví dụ cụ thể: để chế tạo một chiếc xe thực sự, bạn có thể cần một động cơ, hộp số, khung gầm và các bộ phận khác; và một động cơ lần lượt cần xi lanh và bugi.
* Khi bạn không thể xây dựng các dependencies trước khi truyền nó vào - ví dụ như khi sử dụng lazy initializations hoặc các scoping objects cho các flow trong app - bạn cần phải viết và maintain một custom container (hay biểu đồ dependencies) quản lý lifetime dependencies trong bộ nhớ.

Có 1 lib có thể giải quyết vấn đề này bằng cách tự động hóa quá trình tạo và cung cấp dependencies. Nó phù hợp với hai loại:
* Các giải pháp dựa trên reflection-base kết nối các dependencies trong thời gian chạy.
* Static solution generate code để kết nối các dependencies tại compile time. 

[Dagger](https://dagger.dev/) là một lib dependency injection phổ biến cho Java, Kotlin và Android được cung cấp bởi Google. Dagger tạo điều kiện sử dụng DI trong ứng dụng của bạn bằng cách tạo và quản lý biểu đồ dependencies cho bạn. 

### Các lựa chọn thay thế cho DI

Sử dụng [service locator](https://en.wikipedia.org/wiki/Service_locator_pattern). Service locator design pattern cũng cải thiện việc tách lớp từ các dependencies cụ thể. Bạn tạo một lớp được gọi là service locator tạo và lưu trữ các dependencies  và sau đó cung cấp các dependencies  đó theo yêu cầu.

```kotlin
object ServiceLocator {
    fun getEngine(): Engine = Engine()
}

class Car {
    private val engine = ServiceLocator.getEngine()

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.start()
}
```

Service locator pattern khác với tiêm DI theo cách các phần tử được tiêu thụ. Với service locator pattern, class có sự kiểm soát và yêu cầu object được inject vào, với DI, app kiểm soát và chủ động inject các object cần thiết.

So sánh với DI:

* Việc thu thập các dependencies theo yêu cầu của service locator làm cho code khó kiểm tra hơn vì tất cả các kiểm tra phải tương tác với cùng một global service locator.
* Các dependencies  được mã hóa trong class implementation, không phải trong bề mặt API. Kết quả là, khó hơn để biết một class cần gì từ bên ngoài. Thay đổi với **Car** hay dependency có sẵn trong service locator có thể dẫn đến lỗi ở runtime  hoặc test bằng cách khiến các tham chiếu không thành công.
* Việc quản lý vòng đời của các đối tượng sẽ khó khăn hơn nếu bạn muốn tạo scope cho bất kỳ thứ gì khác ngoài vòng đời của toàn bộ ứng dụng.

### Lựa chọn đúng công nghệ cho ứng dụng của bạn

Như đã chứng minh ở trên, có nhiều công nghệ khác nhau để quản lý dependencies trong app của bạn:

**Manual dependency injection** chỉ có ý nghĩa đối với một ứng dụng tương đối nhỏ vì nó có khả năng mở rộng kém. Khi dự án trở nên lớn hơn, việc truyền các đối tượng đòi hỏi rất nhiều code mẫu.

**Service locators** bắt đầu với code mẫu tương đối ít, nhưng cũng có quy mô kém. Hơn nữa, việc kiểm tra trở nên khó khăn hơn vì nó dựa vào một singleton object.

**Dagger** được xây dựng để scale. Nó rất phù hợp để xây dựng các ứng dụng phức tạp.

![](https://images.viblo.asia/9d6e0bf9-e061-4d8a-8ab6-c03e86dc1b45.png)

Nếu ứng dụng nhỏ của bạn dường như có khả năng phát triển, bạn nên xem xét việc chuyển sang Dagger sớm khi không có nhiều code thay đổi.

Vậy làm thế nào để tính toán size project của bạn? Với mục đích quyết định sử dụng kỹ thuật nào, bạn có thể sử dụng số lượng màn hình để kích thước ứng dụng. Tuy nhiên, lưu ý rằng số lượng màn hình chỉ là một trong nhiều yếu tố có thể ảnh hưởng đến kích thước ứng dụng của bạn.![](https://images.viblo.asia/3900b9f5-9fd5-4e07-b561-26115415f30b.png)

### Chọn đúng kỹ thuật cho thư viện của bạn

Nếu bạn đang phát triển SDK hoặc thư viện bên ngoài, bạn nên chọn giữa DI hoặc Dagger thủ công tùy thuộc vào kích thước của SDK hoặc thư viện. Lưu ý rằng nếu bạn sử dụng thư viện của bên thứ ba để thực hiện tiêm phụ thuộc, thư viện của bạn có thể sẽ tăng kích thước.

## Kết luận

DI cung cấp cho ứng dụng của bạn những lợi thế sau:

* Khả năng sử dụng lại các lớp và tách rời các dependencies: Dễ dàng trao đổi các implementations của một dependency. Code tái sử dụng được cải thiện do sự đảo ngược của điều khiển và các lớp không còn kiểm soát cách tạo ra các dependencies của chúng, mà thay vào đó hoạt động với bất kỳ cấu hình nào.
* Dễ tái cấu trúc: Các phần dependencies trở thành một phần có thể kiểm chứng được trên bề mặt API, do đó chúng có thể được kiểm tra tại thời điểm object-creation hoặc tại thời gian compile thay vì bị ẩn như implementation details.
* Dễ test: Một class không quản lý các dependencies của nó, vì vậy khi bạn testing nó, bạn có thể chuyển qua các implementations khác nhau để kiểm tra tất cả các trường hợp khác nhau của mình.

Cảm ơn mọi người đã đọc bài của mình :D