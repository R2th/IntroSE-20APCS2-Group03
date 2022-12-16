### Bắt đầu với ứng dụng mô phỏng Duck đơn giản

Nam làm việc cho công ty mô phỏng về game có tên là SimUDuck. Game thể hiện nhiều trạng thái khác nhau của vịt về hành vi bơi và tiếng kêu. 

Thiết kế ban đầu sử dụng hướng đối tượng (OO) bằng cách tạo 1 class Duck làm class cha để cho các lớp con thừa kế.
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/xgp2j11ej3_image.png)

Vào cuối năm, do áp lực gay gắt với các đối thủ cạnh tranh. Sau 1 tuần suy xét cẩn trọng giám đốc quyết định phải tạo ra 1 bước đột phá mới.

### Các chú vịt cần phải biết bay

Những chú vịt biết bay là chìa khoá của đột phá để giúp đánh bại các đối thủ cạnh tranh "vịt biết bơi". Và đương nhiên, quản lí của Nam OK vấn đề này, và nói sẽ làm trong 1 tuần là xong ngay.

**Và đây là công việc của Nam:** Mình chỉ cần thêm method fly() và lớp Duck(parent class) cho tất cả các lớp con thừa kế là xong ngay!
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/jcimm1f6he_image.png)

### Nhưng có vấn đề xảy ra
Giám đốc điện thoại cho Nam: "Cậu đùa với tôi ah, tôi đang chạy demo của cậu: Những chú vịt cao su làm sao biết bay!"

Nam quên 1 điều là những chú vịt cao su không thể bay. Và anh ấy nhận ra 1 điều rằng, kế thừa cũng không giúp gì nhiều trong việc tái sử dụng, bảo trì code.

### Cùng xem xét lại về kế thừa
Vì vịt cao su có tiếng kêu khác với vịt thường, và vịt cao su không thể bay được. Chúng ta phải Override lại hàm quack() (tiếng kêu) và hàm fly() (bay) của vịt cao su.
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2m54fmm6po_image.png)
Nhưng còn vịt gỗ(WoodenDuck) thì sao chúng không thể kêu hoặc bay được?

### Interface thì như thế nào?
Nam nhận ra rằng, kế thừa sẽ làm code anh ta lặp lại(duplicate code). Và không thích hợp cho việc code bị thay đổi thường xuyên 3-6 tháng/lần.

Trong đó hàm fly() và quack()(tiếng kêu) sẽ bị ảnh hưởng bởi yêu cầu mới.

Nam quyết định đập lại code của mình bằng cách: đem hàm fly() và quack() ra khỏi class Duck và tạo interface Flyable, hàm fly() và interface Quackable, hàm quack(). 

Chỉ những chú vịt có thể bay mới implement interface Flyable, và những chú vịt có thể phát ra tiếng kêu thì sẽ implement interface Quackable.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/hs7yr9vi1i_image.png)

Nhưng giải quyết bằng cách này kết quả còn tồi tệ hơn nữa. 

Theo cách kế thừa: bạn chỉ cần override lại vài hàm.

Theo cách interface: bạn phải override lại tất cả những chú vịt có thể bay và có thể phát ra tiếng kêu, hiện tại ta có 70 chú vịt như thế...

### Bạn sẽ làm thế nào nếu bạn là Nam?
Chúng ta biết rằng không phải tất cả các lớp con sẽ kế thừa hàm fly() và quack(), vì thế kế thừa không phải là đáp án đúng.

Còn với interface: Sẽ có nhiều class implement lại hàm fly, quack() của interface Flyable và Quackable. Điều này sẽ hạn chế lại việc tái sử dụng code.

Và đó là tại sao chúng ta cần Design Pattern.

### Design principle

> Identify the aspects of your application that vary and separate them from what stays the same.

> Tạm dịch là: Tìm ra những phần hay thay đổi trong ứng dụng và đóng gói chúng, để không ảnh hưởng tới phần chung của hệ thống.

### Thiết kế hành vi(behavior) cho những chú vịt

Nam nhận ra rằng, hàm fly() và quack() thay đổi thường xuyên nên sẽ được đóng gói riêng biệt.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7pwyxy99pg_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/izpe2tpo01_image.png)

> Với thiết kế này, các đối tượng có thể tái sử dụng lại hàm fly và quack.

> Chúng ta có thể thêm mới hành vi mà không gây ảnh hưởng gì đến các đối tượng hiện có.
 
### Tích hợp hành vi cho class Duck

Thay vì gọi hàm fly() và quack() trong lớp Duck. Nam sẽ khai báo FlyBehavior và QuackBehavior như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/m12r6ed82f_image.png)

Nam thêm 2 thuộc tính vào lớp Duck là flyBehavior và quackBehavior. Được khai báo như là loại interface(không phải là 1 class thực thi cụ thể).

Với flyBehavior và quackBehavior ta có thể thay đổi cách bay hoặc cách phát ra tiếng kêu trong thời gian chạy(runtime).

### Hàm thực thi của Duck

Với hàm thực thi này. Ta không cần quan tâm tới loại thực thi là gì. Thứ mà chúng ta quan tâm là chúng thực thi được được đúng chức năng hay không.

```
public class Duck {
    QuackBehavior   quackBehavior;
    FlyBehavior     flyBehavior;

    public void performQuack() {
        quackBehavior.quack();
    }

    public void performFly() {
        flyBehavior.fly();
    }
}
```

### Hàm thực thi cho lớp con

```
public class MallardDuck extends Duck{
    public MallardDuck() {
        flyBehavior = new FlyWithWings();
        quackBehavior = new Quack();
    }

    public void display(){
        System.out.println("I'm real MallardDuck");
    }
}
```

Vì `flyBehavior` và `quackBehavior` là interface, nên trong constuctor MallardDuck phải khởi tạo đối tượng thực thi cho `flyBehavior` và `quackBehavior`.
Và MallarldDuck là vịt thật, nên có thể bay được, và phát ra tiếng kêu thật.

### Code tổng hợp

```
public interface QuackBehavior {
    void quack();
}
```

```
public interface FlyBehavior {
    void fly();
}
```

```
public abstract class Duck {
    QuackBehavior   quackBehavior;
    FlyBehavior     flyBehavior;

    public void performQuack() {
        quackBehavior.quack();
    }

    public void performFly() {
        flyBehavior.fly();
    }

    public abstract void display();
    public void swim(){
        System.out.println("Tất cả vịt đều có thể bơi, bao gồm vịt ");
    }
}
```

```
public class FlyWithWings implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("Bay bằng cánh");
    }
}
```

```
public class FlyNoWay implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("Tôi không thể bayy");
    }
}
```

```
public class Quack implements QuackBehavior{
    @Override
    public void quack() {
        System.out.println("Perform quack!");
    }
}
```

```
public class Squeak implements QuackBehavior{
    @Override
    public void quack() {
        System.out.println("Tôi là vịt nhựa!");
    }
}
```

```
public class MuteQuack implements QuackBehavior{
    @Override
    public void quack() {
        System.out.println("Tôi.... không thể nói!");
    }
}
```

```
public class MiniDuckSimulator {
    public static void main(String args[]) {
        Duck mallardDuck = new MallardDuck();
        mallardDuck.performQuack();
        mallardDuck.performFly();
    }
}
```

Kết quả hiển thị
> Tôi là vịt thật!

> Bay bằng cánh

### Thay đổi hành vi(behavior) trong thời gian chạy(runtime)
Ta thêm 2 hàm sau vào lớp Duck

```
public abstract class Duck {
    .....

    public void setFlyBehavior(FlyBehavior flyBehavior) {
        this.flyBehavior = flyBehavior; 
    }

    public void setQuackBehavior(QuackBehavior quackBehavior) {
        this.quackBehavior = quackBehavior;
    }
}
```

Tạo thêm 1 lớp vịt mới

```
public class ModelDuck extends Duck{
    public ModelDuck() {
        flyBehavior   = new FlyNoWay();
        quackBehavior = new Quack();
    }

    public void display(){
        System.out.println("Tôi là vịt mẫu!");
    }
}
```

Tạo thêm 1 hành vi mới cho cách bay

```
public class FlyRocketPowered implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("Tôi bay nhanh như tên lửa!");
    }
}
```

```
public class MiniDuckSimulator {
    public static void main(String args[]) {

        Duck modelDuck = new ModelDuck();
        modelDuck.display();
        modelDuck.performFly();
        //Thay đổi cách bay thành tên lửa cho ModelDuck
        modelDuck.setFlyBehavior(new FlyRocketPowered());
        modelDuck.performFly();
    }
}
```

> Tôi là vịt mẫu!
 
> Tôi không thể bay

> Tôi bay nhanh như tên lửa!

Như bạn đã thấy sau khi gọi hàm `setFlyBehavior` thì cách bay của modelDuck sẽ thay đổi.

### Bức tranh tổng thể về Strategy Design Pattern

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/opho9880yp_image.png)

### Đóng góp

Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn. 

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! :)

Tham khảo từ: Head First Design Pattern (Eric Freeman & Elisabeth Freeman)

Phúc Vưu

### Bài viết liên quan

[Học Facade Design Pattern qua câu chuyện](https://viblo.asia/p/hoc-facade-pattern-qua-cau-chuyen-RnB5pxBr5PG)