## 1. Inversion of Control (IoC)

### 1.1. IoC là gì đây?

Trong phần trước chúng ta đã tìm hiểu nguyên lý Dependency inversion, và đã nắm được nguyên tắc để viết code tốt hơn. Tuy nhiên, DI principle chỉ đơn giản là nguyên lý thôi, còn việc thực hiện thì không nói rõ. Chúng ta có thể thực hiện như phần trước, là tạo từng object riêng rẽ, sau đó gắn chúng lại với nhau (qua constructor).

Tuy nhiên, nếu chương trình có nhiều module, nhiều object thì sẽ gặp tình trạng như:

* Gắn thiếu module vào module khác
* Phải quan tâm tới thứ tự khởi tạo module (tạo module nào trước)
* Phụ thuộc vòng (A phụ thuộc B, và B cũng phụ thuộc A, suy ra không biết tạo A hay B trước)

Cách làm tạo các module riêng rẽ, sau đó gắn lại gọi là cách bình thường :D. Do các nhược điểm trên, hiện nay người ta đưa ra khái niệm IoC - Inversion of Control - đảo ngược sự điều khiển.

> IoC nhằm mục đích đơn giản hóa quá trình tạo đối tượng và liên kết giữa chúng, bằng cách tuân theo nguyên tắc:
> Không tạo đối tượng, chỉ mô tả cách chúng sẽ được tạo ra.

Do quá trình này phức tạp và khó implement, nên đã có nhiều framework ra đời hỗ trợ IoC, điển hình như Spring cho Java hoặc Angular của JavaScript.

IoC framework sẽ có các thành phần có sẵn làm nhiệm vụ tạo, quản lý các đối tượng trong chương trình. IoC sẽ quản lý, phân tích các mối phụ thuộc, tạo các đối tượng theo thứ tự phù hợp nhất và liên kết chúng lại với nhau, theo cách lập trình viên mô tả.

Inversion of control có nhiều kiểu để thực hiện, như dùng ServiceLocator, Delegate,… nhưng phổ biến nhất là Dependency injection. Mình sẽ trình bày về nó ở phần sau.

### 1.1. Code ví dụ

Như trên, nhờ có IoC chúng ta không cần tự mình tạo các module bằng **new** như trước nữa. Chúng ta không cần viết code như sau để tạo ra hai module `goodEngine` và `myCar`.

```java
Engine goodEngine = new VNEngine();
Car myCar = new Car(goodEngine);
```

Code trên chúng ta vừa tạo, vừa liên kết hai đối tượng lại với nhau. Nhưng với IoC framework thì không, chúng ta chỉ cần đánh dấu (mark) trên các class. IoC framework sẽ dựa vào đó để tạo module đúng theo yêu cầu.

```java
@Component
class VNEngine implements Engine {
    ...
}

@Component
class Car {
    // Tìm object tương ứng với Engine và chèn (inject) vào đây
    @Autowired
    private Engine engine;
}
```

Mỗi class được đánh dấu `@Component` (cái này gọi là Annotation trong java) sẽ được IoC hiểu là một module:

* `@Component` là bảo IoC container tạo một object duy nhất (singleton)
* `@Autowired` là tìm module tương ứng (tạo từ trước) và inject vào đó.

Nhờ có IoC framework, việc tạo và liên kết các module dễ dàng hơn nhiều. Tuy nhiên, IoC chỉ nên áp dụng trên các module, object lớn, còn các object nhỏ nhỏ, linh tinh, dùng tạm thời thì không nên dùng.

## 2. Dependency injection

### 2.1. Dependency injection là gì đây?

DI là một dạng thực hiện của IoC, bằng cách tiêm (inject) module vào một module khác cần nó. Ví dụ module cấp cao `Car` cần có module `Engine`, thì dependency injection sẽ thực hiện theo các bước như sau:

* Tìm và tạo module tương ứng với `Engine` (class nào có implements `Engine` interface)
* Tạo tiếp module `Car`, do `Car` phụ thuộc vào `Engine` nên IoC tìm và lấy ra đối tượng `Engine` đã tạo trước đó và inject vào bên trong `Car`.
* Xong

Mọi module trong IoC đều gọi là dependency, mặc dù có những module không bị phụ thuộc bởi module nào khác. Khi chương trình chạy, IoC sẽ quét tất cả class đánh dấu dependency, tạo một đối tượng duy nhất (singleton), và bỏ vào cái túi gọi là IoC container, lúc nào cần thì lấy ra sử dụng. Do đó, các module đảm bảo được IoC tạo ra duy nhất một object, giúp tiết kiệm bộ nhớ và quản lý cũng dễ hơn.

Nếu khi tạo module nào đó, mà module đó cần một module khác phụ thuộc, thì IoC sẽ tìm trong IoC container xem có không, nếu có thì inject vào, nếu chưa thì tạo mới, bỏ vào container và inject vào. Việc inject tự động các dependency (module) như thế được gọi là **Dependency injection**.

Chú ý nhỏ, cần phân biệt DI (dependency injection) với DI principle (dependency inversion principle) nhé.

### 2.2. Các loại injection

Có 2 loại chính:

* **Constructor-based injection:** Dùng inject các module bắt buộc. Các module được inject nằm trong constructor, và được gán lần lượt vào các field.
* **Setter-based injection:** Dùng inject các module tùy chọn. Mỗi module sẽ được inject thông qua setter, nằm ở tham số và cũng gán cho field nào đó.

Hãy xem code sau để hiểu constructor based và setter based là như thế nào.

```java
@Component
class Car {
    // Bắt buộc, vì xe thì phải có động cơ
    private Engine engine;

    // Tùy chọn, vì xe có thể không có người chủ
    private Human owner;

    // Do engine bắt buộc, nên dùng constructor based injection
    // Constructor based có thể inject nhiều dependency cùng lúc
    public Car(Engine engine) {
        this.engine = engine;
    }

    // Do owner là tùy chọn, nên dùng setter based injection
    // Setter based chỉ inject một dependency mỗi setter
    public void setOwner(Human owner) {
        this.owner = owner;
    }
}
```

## 3. Áp dụng vào Spring Boot

Spring là một framework được xây dựng dựa trên nguyên lý Dependency injection. Bản thân Spring có chứa IoC container, có nhiệm vụ tạo và quản lý các module:

* IoC container của Spring gọi là **Application context**
* Các module chứa trong IoC container được Spring gọi là các **Bean**

Spring Boot sử dụng các **annotation** dạng như `@Component` để đánh dấu lên class, chỉ ra rằng class đó cần tạo một module. Ngoài `@Component`, còn có các annotation khác như `@Repository`, `@Controlller`, `@Service`,... cũng được đánh dấu là module.

Khi ứng dụng Spring Boot chạy, thì IoC container sẽ thực hiện quá trình như sau:

* Quét tìm (scan) các class được đánh dấu là Bean, và tạo một object singleton, bỏ vào IoC container
* Khi có một Bean phụ thuộc vào Bean khác, thì IoC sẽ tìm trong container, nếu chưa có thì tạo, nếu đã có thì lấy ra và inject vào bean cần nó

Cơ bản là thế, trong phần tiếp theo chúng ta sẽ bàn kĩ hơn về hai khái niệm Bean và Application context nhé. Hẹn gặp lại các bạn vào những bài tiếp theo. Nếu thấy bài viết hay, hữu ích đừng quên upvote tiếp thêm động lực cho mình nhé.