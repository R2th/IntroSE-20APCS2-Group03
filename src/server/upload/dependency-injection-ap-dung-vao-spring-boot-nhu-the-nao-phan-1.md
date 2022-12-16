Bài tiếp theo đây sẽ bàn về khái niệm siêu quan trọng là Dependency injection, và cách sử dụng ra sao trong Spring Boot nhé.

## 1. Module coupling

### 1.1. Coupling là gì?

Trước hết cần nói sơ qua về khái niệm **module coupling**. Coupling có thể hiểu là mối quan hệ giữa hai module, hai đối tượng với nhau, có sự phụ thuộc lẫn nhau.

Và coupling có hai loại:

* Tight coupling: hai module liên kết chặt chẽ, khó tách rời
* Loose coupling: liên kết yếu, rời rạc

Trong chương trình, thường sẽ có nhiều module riêng rẽ, mỗi module có chức năng riêng, và có quan hệ với nhau (HAS-A trong OOP).

![](https://images.viblo.asia/e9eae0bb-b41b-4455-93f8-cd529a3b3384.png)

Ví dụ như hai module **Xe hơi** và **Động cơ**, xe hơi phụ thuộc vào động cơ mới có thể chạy được. Thể hiện dạng code như sau.

```java
class ChinaEngine {
    ...
}

class Car {
    private ChinaEngine engine;
    public Car() {
        // Khi tạo Car thì nhớ gắn engine vào :D
        engine = new ChinaEngine();
    }
}
```

### 1.2. Nguyên tắc về sự phụ thuộc

Chúng ta vừa đi qua khái niệm coupling. Tiếp theo đây là nguyên tắc quan trọng liên quan tới nó mà các bạn cần nhớ.

> Để code dễ bảo trì và sửa đổi, thì nguyên tắc là phải **giảm sự phụ thuộc** giữa các module.
> 
> Nghĩa là biến mối quan hệ giữa chúng từ tight coupling thành loose coupling.

Như code phía trên, sự phụ thuộc giữa `Car` và `ChinaEngine` rất mạnh. Điều này dẫn tới nhiều khó khăn:

* Muốn thay đổi động cơ, cần sửa class `Car`
* Không thể nào có hai `Car` mà sử dụng các `Engine` khác nhau được
* Khó test các module hơn

Trong chương trình không chỉ có 1, 2 module như ví dụ trên, mà có rất nhiều. Do đó, nếu các module dính quá chặt vào nhau thì sẽ rất khó bảo trì.

## 2. Nguyên lý Dependency inversion

### 2.1. Dependency inversion principle

Đây là nguyên lý số 5 trong SOLID principles, tương ứng với chữ D. Được đưa ra để thiết kế các module trong chương trình, sao cho có ít sự phụ thuộc nhất có thể.

DI principle có hai ý chính:

* Các module cấp cao không nên phụ thuộc (trực tiếp) vào module cấp thấp. Cả hai nên phụ thuộc vào abstraction (của OOP).
* Abstraction không nên phụ thuộc vào chi tiết, mà ngược lại.

Okay, nghe có vẻ khá trừu tượng. Chúng ta hãy đi phân tích từ từ, từng bước.

Trước tiên, bạn cần hiểu dependency là gì. Ví dụ ở trên class `Car` phụ thuộc vào class `ChinaEngine`, nên `ChinaEngine` là một dependency (phụ thuộc) của `Car`. Lúc này, ta nói `Car` là module cấp cao, `ChinaEngine` là module cấp thấp.

### 2.2. Ý thứ nhất của DI principle

Xem lại code ở trên, có thể thấy code đã vi phạm ý 1 của DI principle. Lý do là vì `Car` đã trực tiếp phụ thuộc vào `ChinaEngine` (do trong code class `Car` có sử dụng tới `ChinaEngine`),

Để đúng với DI principle, chúng ta sửa lại như sau. Bằng cách cho cả hai module cùng phụ thuộc vào abstraction (trong OOP thường là interface).

```java
// Interface đại diện cho mọi loại động cơ
interface Engine {
    ...
}

// ChinaEngine là một loại Engine
class ChinaEngine implements Engine {
    ...
}

// Trong Car thì chỉ dùng Engine (chung chung), không có cụ thể loại nào
// Loại engine cụ thể sẽ được inject vào lúc tạo (không phải gán cứng trong code)
// Do đó có thể tạo Car với các loại Engine khác nhau
class Car {
    // Loại engine nào đó, lợi dụng tính đa hình OOP
    private Engine engine;
    
    // Khi tạo Car thì tạo Engine object trước, rồi inject vào constructor này
    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

Code trên lợi dụng tính đa hình của OOP để switch giữa các loại `Engine` mà không có lỗi gì xảy ra.

### 2.3. Giải thích code

Như trên, sau khi sửa lại thì cả `Car` và `ChinaEngine` đều phụ thuộc vào interface `Engine` (đại diện cho abstraction). Như thế đúng với nguyên lý DI đặt ra:

* `ChinaEngine` là một loại `Engine`. `Engine` có những method nào thì `ChinaEngine` phải implement hết. Do đó, khi lắp vào `Car` thì chức năng các loại động cơ đều giống nhau và đều có trong `Engine`.
* `Car` sử dụng `Engine` làm động cơ, thay vì class cụ thể nào đó. Do đó, chỉ cần động cơ thuộc `Engine` (implement interface này) thì đều gắn được vào `Car`.

Lúc này, mối quan hệ giữa `Car` và `ChinaEngine` đã lỏng lẻo hơn rất nhiều. Và chúng ta dễ dàng thêm loại động cơ khác như sau.

```java
class VNEngine implements Engine {
    ...
}
```

Nhưng rồi dùng như thế nào, nếu có hai loại `Engine` thì làm sao biết gắn loại nào vào cho `Car`?

Đúng, nhưng việc này sẽ được thực hiện khi khởi tạo đối tượng `Car`. Nghĩa là khi tạo ra `Car` thì ta mới gắn `Engine` cho nó. Xem lại code đầu tiên, chúng ta đã gắn cứng `ChinaEngine` cho `Car` ngay trong bản thân `Car`, đúng ra việc đó thì phải thực hiện bên ngoài, khi tạo `Car`. Đó là sự khó khăn khi mối liên kết giữa chúng quá cứng.

Và như code ví dụ sau, khi mối quan hệ trở nên loosely hơn, thì chúng ta có thể tạo 2 đối tượng `Car` khác nhau, với hai loại `Engine` khác nhau một cách dễ dàng.

```java
// Tạo động cơ trước
Engine goodEngine = new VNEngine();
Engine cheapEngine = new ChinaEngine();

// Tạo xe, khi tạo thì gắn động cơ vào (qua constructor)
Car myCar = new Car(goodEngine);
Car yourCar = new Car(cheapEngine);  // and bad :)
```

Ví dụ trên chúng ta thực hiện gắn `Engine` vào `Car` trong constructor. Đây gọi là **constructor-based injection**, chúng ta sẽ bàn kĩ hơn ở phần sau.

### 2.4. Ý thứ hai của DI principle

Ý thứ hai của DI principle khá đễ hiểu nếu bạn nắm vững OOP. Cụ thể, nguyên tắc “abstraction không nên phụ thuộc vào chi tiết, mà ngược lại” có nghĩa là abstraction chỉ lấy những thuộc tính, những hành động chung nhất, mà không cần quan tâm chi tiết bên trong chúng hoạt động thế nào.

Lấy lại ví dụ về Engine ở trên, chúng ta chỉ cần biết abstraction Engine có method là run, còn những loại động cơ khác nhau thực hiện run như thế nào (chi tiết) thì không cần quan tâm.

```java
// Mọi loại Engine đều có thể run
interface Engine {
    void run();
}

// Động cơ VNEngine run theo hiểu khác
class VNEngine implements Engine {
    public void run() {
        // Run nhanh, bền, ít tốn xăng
    }
}

// Động cơ ChinaEngine run theo kiểu khác
class ChinaEngine implements Engine {
    public void run() {
        // Run nhanh, bền nhưng tốn xăng
    }
}
```

Rồi bên trong class `Car`, nó không cần quan tâm tới liệu động cơ chạy như thế nào. Nó chỉ cần biết khi làm 1 số thao tác thì xe sẽ chạy, có vậy thôi.

---

Phần 1 của bài này đến đây là hết. Đón xem luôn phần sau nhé. Có chỗ nào thắc mắc cứ comment bên dưới, vì đây là phần khá quan trọng khi học Spring nhé.