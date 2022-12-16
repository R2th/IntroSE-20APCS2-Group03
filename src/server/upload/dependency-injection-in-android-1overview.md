## 1. Mở đầu
Dependency injection (DI) là một kỹ thuật được sử dụng rộng rãi trong lập trình và rất phù hợp để phát triển những ứng dụng Android. Bằng cách tuân theo các nguyên tắc (principles) của DI, thì bạn cũng đã đặt nền tảng một kiến trúc tốt cho ứng dụng của mình. 

Việc implement dependency injection sẽ cung cấp cho bạn những lợi thế sau đây:
- Tái sử dụng code (Reusability of code)
- Dễ tái cấu trúc (Ease of refactoring)
- Dễ testing  (Ease of testing)
## 2. Nguyên tắc cơ bản của dependency injection (Fundamentals)
Trước khi hiểu và làm việc với Dependency Injection trong Android, chúng ta nên hiểu một cách tổng quan nó hoạt động như thế nào.
### 2.1 Dependency injection là gì?
Các Class thường yêu cầu tham chiếu tới các Class khác. Ví dụ, một class Car (xe hơi) có thể cần tham chiếu đến một class Engine (động cơ). Những lớp như trên được gọi là các dependencies, và trong ví dụ này class Car phụ thuộc vào việc có một thể hiện của Engine để chạy. ( Các bạn có thể hiểu là trong class của các bạn sẽ phải sử dụng dữ liệu từ những đối tượng khác, có thể dưới dạng thuộc tính hoặc ở một nơi nào bất kỳ nó xuất hiện)

Có 3 cách để một class có được một đối tượng mà nó cần:

1. Lớp xây dựng một phụ thuộc mà nó cần. Trong ví dụ trên Car sẽ khởi tạo Engine của chính nó.
2. Lấy phụ thuộc từ nơi khác. Một số API của Android, như getContext và getSystemService() làm việc theo cách này.
3. Cung cấp các đối tượng phụ thuộc như một tham số. Ứng dụng có thể cung cấp các đối tượng phụ thuộc này khi các class đã được xây dựng hoặc chuyển chúng (các đối tượng phụ thuộc) vào các function cần mỗi phụ thuộc. Trong ví dụ trên, kiến trúc Car sẽ nhận Engine làm tham số.

Các thứ 3 chính là dependency injection! Với cách tiếp cận này, bạn lấy các đối tượng phụ thuộc và cung cấp chúng thay vì tạo ra thể hiện của chúng trực tiếp trong class bị phụ thuộc. 

Dưới đây là một ví dụ KHÔNG phải Dependency injection!
```Kotlin
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
![](https://images.viblo.asia/67591c2f-87de-4ee5-b6b0-50635b1e0c3d.png)
Ở trong class Car thì ta đã tạo hẳn một đối tượng Engine. Đây không phải là Dependency injection bởi class Car đã tạo ra đối tượng Engine của mỗi nó, điều này sẽ gây ra vấn đề gì ?
1. Car và Engine kết hợp rất chặt chẽ với nhau. Một thể hiện của Car chỉ sử dụng một loại động cơ duy nhất. Và không có các lớp con hay triển khai khác có thể dễ dàng sử dụng được. Ở đây một loại xe (Car) chỉ sử dụng được một loại động cơ (Engine) có thể chỉ là xăng (Gas) hoặc chỉ là điện (Electric)
2. Hard dependency (phụ thuộc chặt chẽ) làm cho việc testing trở nên khó khăn hơn. Car sử dụng một thể hiện thực của Engine, do đó ngăn chặn việc testing nhiều case tương ứng với các trường hợp Engine khác nhau. 

Với Dependency thì code sẽ trông như thế nào. Thay vì mỗi thể hiện của Car, nó xây dựng đối tượng Engine riêng của mình khi khởi tạo, thì nó nhận một đối tượng Engine làm tham số trong constructor của nó.
```Kotlin
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
![](https://images.viblo.asia/17e5730c-f2fa-4bf1-80c1-c5ff2d0a854e.png)
Hàm main phụ thuộc Car, mà Car lại phụ thuộc Engine. Trong main ta tạo một đối tượng Engine, và sau đó dùng nó để tạo một đối tượng Car. Lợi ích của phương pháp dự trên DI này là:
1. Tái sử dụng Car. Chúng ta có thể chuyển các Engine (động cơ) khác nhau sang Car. Ví dụ bạn có thể định nghĩa một lớp con mới của Engine như ElectricEngine mà bạn muốn xe sử dụng. Nếu bạn sử dụng DI tức là cho dù bạn thay đổi bất kỳ loại động cơ Engine nào thì Car vẫn luôn luôn hoạt động. 
2. Dễ dàng để testing cho Car. Chúng ta có thể triển khai nhiều test case với các Engine khác nhau với cùng một Car. Ví dụ bạn có thể tạo một FakeEngine và config nó cho các trường hợp test khác nhau. 

Có 2 cách chính để thực hiện Dependency injection trong Android:
1. Constructor Injection. Đây là cách mô tả ở trên. Chúng ta đưa các đối tượng phụ thuộc của một lớp vào hàm constructor của nó.
2. Field Injection (or Setter Injection). Trong Android một số class như Activity hay Fragment thì được hệ thống khởi tạo. Vì vậy dùng constructor injection là không thể.  Với field injection, các phụ thuộc được khởi tạo ngay sau khi lớp được tạo.  Code sẽ trông như thế này:
```Kotlin
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
Với Java code (tức là dùng setter) :
```Java
class Car {

    private Engine engine;

    public void setEngine(Engine engine) {
        this.engine = engine;
    }

    public void start() {
        engine.start();
    }
}

class MyApp {
    public static void main(String[] args) {
        Car car = new Car();
        car.setEngine(new Engine());
        car.start();
    }
}
```
### 2.2 Tự động dependency injection.
Ở ví dụ trên, chúng ta tự tạo, cung cấp và quản lý các dependencies của các lớp mà không cần dựa vào một thư viện nào cả. Đây được gọi là xử lý Dependency bằng tay, hoặc là thủ công. Trong ví dụ về xe hơi (Car) ở trên thì nó chỉ phụ thuộc vào một đối tượng là động cơ (Engine) thôi. Trong thực tế các bài toán thì một lớp có thể phục thuộc vào nhiều đối tượng và còn có sự chồng chéo, và việc dùng DI một cách thủ công sẽ rất là nhàm chán và có thể gây rườm rà, nó có một số nhược điểm sau đây:
1. Đối với các ứng dụng lớn, lấy tất cả các dependencies và kết nối chúng một cách chính xác phải yêu cầu một lượng code rất là lớn. Rồi trong một kiến trúc nhiều tầng, để tạo đối tượng cho một lớp trên cùng bạn phải cung cấp tất cả các lớp phụ thuộc bên dưới cho nó. Ví dụ cụ thể, để tạo ra một chiếc Xe thì ngoài động cơ, thì bạn cần hộp số, khung gầm và các bộ phận khác ... và một động cơ thì cần xilanh và bugi chẳng hạn ...
2. Khi bạn không thể tạo ra các dependencies trước khi chuyển chúng vào, ví dụ như khi bạn sử dụng lazy initializations hoặc các đối tượng có phạm vi theo follow ứng dụng. Khi đó bạn cần viết và duy trì một nơi nào đó để quản lý vòng đời của các dependencies trong bộ nhớ. 

Có những thư viện giải quyết những vấn đề này bằng cách tự động hóa quy trình tạo và cung cấp các dependencies. Chúng phù hợp với 2 loại:
1. Reflection-based solutions (Các giải pháp dựa trên phản xạ), cái kết nối các dependencies trong runtime.
2. Static solutions tạo code để kết nối các dependencies tại compile time. 

Dagger là một thư viện Dependency injection phổ biến cho Java, Kotlin, và Android, được maintain bởi Google. Dagger tạo điều kiện sử dụng DI trong ứng dụng của bạn bằng cách tạo và quản lý biểu đồ dependencies. Nó cung cấp những dependencies statict và compile time, giải quyết nhiều vấn đề về development và performance của Reflection-based solutions. Nó là Static Solution!
## 3. Các lựa chọn thay thế cho dependency injection.
Một thay thế cho DI là sử dụng Service Locator. Service Locator cũng cải thiện việc tách các lớp từ những dependencies cụ thể. Ta có thể tạo một lớp Service Locator, lớp này tạo và lưu trữ những dependencies và sau đó cung cấp theo nhu cầu.

Java code:
```Java
class ServiceLocator {

    private static ServiceLocator instance = null;

    private ServiceLocator() {}

    public static ServiceLocator getInstance() {
        if (instance == null) {
            synchronized(ServiceLocator.class) {
                instance = new ServiceLocator();
            }
        }
        return instance;
    }

    public Engine getEngine() {
        return new Engine();
    }
}

class Car {

    private Engine engine = ServiceLocator.getInstance().getEngine();

    public void start() {
        engine.start();
    }
}

class MyApp {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();
    }
}
```
Kotlin:
```Kotlin
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
Ta có thể thấy DI khác Service Locator ở cách các dependencies được tiêu thụ. Đối với Service Locator các lớp có quyền kiểm soát và yêu cầu các đối tượng được inject (tiêm); với DI ứng dụng có quyền kiểm soát và chủ động inject các đối tượng cần thiết. 

Nhược điểm của Service Locator :
1. Tập hợp các dependencies cần thiết của Service Locator làm cho code khó để testing. Bởi vì tất cả các trường hợp test phải tập trung tại cùng một Service Locator chung.
2. Các dependencies được mã hóa trong sự thực thi của các class, không phải là những API hiện hữu. Kết quả là thật khó để biết một class cần những gi từ bên ngoài. Nếu dùng Service Locator thì các dependencies có sẵn trong nó sẽ có thể gây rã lỗi trong quá trình biên dịch hoặc việc test sẽ không thành công bởi các tham chiếu không chính xác. 
3. Việc quản lý vòng đời của các đối tượng sẽ khó khăn hơn. 
## 4. Chọn đúng kỹ thuật cho ứng dụng của bạn.
Như đã nói ở trên sẽ có một số kỹ thuật khác nhau để quản lý các dependencies (phụ thuộc) của ứng dụng chúng ta:
- DI thủ công chỉ có ý nghĩa đối với một ứng dụng tương đối nhỏ. Khi project lớn hơn, việc truyền các đối tượng phụ thuộc cần rất nhiều mã code soạn sẵn.
- Service Locator bắt đầu với mã code tương đối ít, nhưng khả năng mở rộng cũng kém. Hơn nữa việc testing sẽ trở nên khó khăn bở vì chúng dự trên một đối tưọng Singleton.
- Dagger được xây dựng để mở rộng. Nó rất phù hợp để xây dựng các ứng dụng phức tạp. 
![](https://images.viblo.asia/a5258388-d17f-4b84-85f7-d5161e77b08f.png)

Nếu ứng dụng của chúng ta có khả năng phát triển và mở rộng sau này thì bạn nên đưa Dagger vào sớm.

Vậy thì một ứng dụng như thể nào thì có kích thước là nhỏ, trung bình hay lớn. Goolge có đưa ra một cách tương đối với sự tương quan với số lượng màn hình của ứng dụng.
![](https://images.viblo.asia/59a9e62a-8536-4d6f-bc85-93d9dd6ced9c.png)
Số lượng màn hình từ 1 đến 3 thì là ứng dụng nhỏ. 4 đến 7 màn hình là thuộc loại trung bình, còn 8 màn hình trở lên là thuộc loại có kích thước size lớn. 
Chú ý đây chỉ mang tính chất tương đối, bởi kích thước màn hình còn có thể phải dựa vào nhiều yếu tố khác. 

Có một vấn đề nữa đó là nếu ứng dụng của bạn mà bạn đang tập trung phá triển external SDK hoặc library. Bạn nên cân nhắc giữ việc dùng DI thủ công hay Dagger. Nếu dùng Dagger thì thư viện của bạn cũng có thể tăng kích thước size đáng kể.
## 5. Kết luận
Ở bên trên thì mình đã overview về DI là gì? Và trong Android thì cụ thể nó như thế nào. Tóm lại thì Dependency Injection sẽ cung cấp cho ứng dụng của bạn những ưu điểm sau:
- Khả năng tái sử dụng lại các class và tách rời các phụ thuộc (dependencies): Dễ dàng hơn trong việc thay đổi một dependency. Việc tái sử dụng code được cải thiện do Inversion of Control, và các class không còn kiểm soát việc tạo ra các dependencies như thế nào, thay vào đó nó có thể làm việc với bất kỳ cấu hình nào.
- Dễ tái cấu trúc: Các dependencies trở thành những phần có thể kiểm tra như API. Hoàn toàn có thể kiểm tra lúc tạo đối tượng, lúc biên dịch chứ không bị ẩn đi. 
- Dễ dàng cho việc Testing: Các class không quản lý các dependencies của nó. Vì thế khi testing chúng ta có thể truyền các dependency khác nhau và xử lý được nhiều test case.