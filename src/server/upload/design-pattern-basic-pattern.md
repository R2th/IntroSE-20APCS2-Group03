Đây là 1 series mình hệ thống lại những gì mình đã học về các design pattern cơ bản. Có thể vẫn có nhiều sai sót hi vọng được bổ sung thêm

## I. Khái niệm design pattern

Design pattern có thể hiểu là một tài liệu thực hành tốt nhất hay cốt lõi của một giải pháp nhằm giải quyết một nhóm các vấn đề cụ thể đã được thực hành đối với nhiều môi trường khác nhau.

### 1. Tính chất
- Là các tài liệu tổng hợp lại các nghiên cứu về thiết kế chất lượng cao
- Design pattern không phải thứ được sáng tạo ra mà là sự đúc rút về cách tốt nhất nhằm giải quyết các vấn đề sau quá trình quan sát, nghiên cứu và thực hành đối với nhiều hệ thống phần mềm
- Không nhất thiết phải ứng dụng trong lập trình hướng đối tượng mà có thể áp dụng cho bất cứ mô hình nào
- Design pattern có thể xem là best practice nhưng best practices chưa chắc là design pattern
- Chỉ áp dụng từng pattern cụ thể trong các tình huống cụ thể


### 2. So sánh Design patterns và Frameworks

Đều là các giải phát nhằm hỗ trợ việc phát triển phần mềm tuy nhiên 2 khái niệm này sinh ra với các mục tiêu và đặc điểm giống và khác nhau

|| Design patterns | Frameworks |
| --- | --- | --- |
|Giống|Tăng chất lượng của phần mềm trên các phương diện như khả năng tái sử dụng, khả năng bảo trì, khả năng mở rộng,...| Tăng chất lượng của phần mềm trên các phương diện như khả năng tái sử dụng, khả năng bảo trì, khả năng mở rộng,...|
||Giảm thời gian phát triển|Giảm thời gian phát triển|
|Khác|Thiên về lý luận (logical) | Thiên về mặt vật lý (physical) khi thể hiện là các phần mềm|
||Không phụ thuộc vào ngôn ngữ hay các triển khai chi tiết|Phụ thuộc vào các triển khai cụ thể|
||Mang tính chung chung, có thể áp dụng rộng rãi cho hầu hết các ứng dụng| Cung cấp các chức năng cho một nhóm cụ thể|

## II. Các pattern cơ bản
Ở đây mình sử dụng java để demo về các design pattern 

### 1. Interface

#### Nguyên nhân sử dụng
Trong một hệ thống hướng đối tượng, các object có thể tự cung cấp các dịch vụ hoặc  thông qua dịch vụ của một object khác. Các object sử dụng dịch vụ của các object khác có thể gọi là các `client`, chúng sử dụng dịch vụ của các `ServiceProvider`.

![image.png](https://images.viblo.asia/76c6512a-a5ec-4465-9b78-547a41b8f85f.png)

Mô hình này đòi hỏi 1 client sẽ yêu cầu một dịch vụ từ 1 kiểu cung cấp dịch vụ xác định cho một dịch vụ xác định.

Tuy nhiên, nếu có nhiều hơn các nhà cung cấp dịch vụ cho cùng dịch vụ này thì với mỗi nhà cung cấp dịch vụ, client sẽ cần 1 request khác nhau, với cùng input và output mong muốn, như vậy sẽ rất không thuận tiện.

![image.png](https://images.viblo.asia/d9feccd3-44fc-4807-9c7b-110384d05d93.png)

Do đó, cần 1 thiết kế để có thể giảm việc tái sử dụng các request với từng bên cung cấp dịch vụ. Và *interface* là giải pháp thích hợp đối với trường hợp này.

![image.png](https://images.viblo.asia/ad6d12e6-c7f0-4003-b3b4-d59830a94deb.png)

Trong mô hình này, client sẽ đơn giản là request tới một object kiểu service provider và luôn nhận được output tương ứng mà client mong muốn. 

#### Ví dụ
Ở đây sẽ là demo java với các class ở mô hình trên
```java
public class Client {
    public static void main(String[] args) {
        //use service of service provider 1
        ServiceProvider serviceProvider = new ServiceProvider1();
        serviceProvider.service();

        //use service of service provider 2
        serviceProvider = new ServiceProvider2();
        serviceProvider.service();
    }
}
```

```java
public interface ServiceProvider {
    public void service();
}
```

```java
public class ServiceProvider1 implements ServiceProvider{
    @Override
    public void service() {
        System.out.println("Service provider 1");
    }
}
```
```java
public class ServiceProvider2 implements ServiceProvider{
    @Override
    public void service() {
        System.out.println("Service provider 2");
    }
}
```
Có thể thấy, client dù dùng dịch vụ của bên nào cũng chỉ cần quan tâm tới hàm `service()` của `ServiceProvider` và nhận được service tương ứng

```bash
Service provider 1
Service provider 2
```
 
### 2. Abstract Parent Class
#### Abstract method
Là một method được khai báo đầy đủ bao gồm tên, giá trị trả về, tham số đầu vào nhưng không có triển khai chi tiết. Ví dụ

```java
public void service();
```

Một abstract method sẽ được khai báo trong một abstract class.
#### Abstract class
Là các class có thể chứa một hoặc nhiều (hoặc không có) các abstract method. Các method này nếu muốn thực thi phải được override bởi các class con. Ví dụ:
```java
public abstract class ServiceProvider {
    public abstract void service();
    
    public void print(){
        System.out.println("This is abstract class");
    }
}
```

Các class kế thừa một abstract class phải override tất cả các abstract method (nếu class con không phải abstract).

#### Nguyên nhân sử dụng
Tương tự trường hợp của interface, việc sử dụng abstract class nhằm thể hiện tính trừu tượng của lập trình hướng đối tượng. Tuy nhiên, abstract class có thể sử dụng cả các method thông thường và các abstract method, các class con kế thừa từ nó sẽ chỉ cần triển khai các abstract method thay vì toàn bộ các method như interface. Các class con cũng sẽ có thể sử dụng các class thông thường kế thừa từ abstract class mà không bắt buộc phải override lại.

#### Ví dụ
```java
public abstract class ServiceProvider {
    protected int money = 10;
    
    public abstract void service();
    public void print(){
        System.out.println("money = " + money);
    }
}
```

```java
public class ServiceProvider1 extends ServiceProvider{

    @Override
    public void service() {
        this.money += 2;
    }
}
```

```java
public class ServiceProvider2 extends ServiceProvider{
    @Override
    public void service() {
        this.money += 3;
    }
}
```

Ở đây, các class kế thừa từ `ServiceProvider` sẽ chỉ cần triển khai hàm service và có thể kế thừa các đặc điểm (`money`) hay các chức năng thông thuowngf(`print()`) của class cha.


### 3. Private method
#### Nguyên nhân sử dụng
Các object thông thường sẽ cung cấp các dịch vụ thông qua các method. Các method này thường sẽ chỉ thực hiện một tác vụ nhất định. Một method có thể tự nó triển khai hoặc sử dụng chức năng của các method khác. Tuy nhiên, không phải bất cứ method nào cũng được xem là một dịch vụ và cung cấp cho các object bên ngoài (làm mất tính bao đóng của lập trình hướng đối tượng). Do đó, chúng được triển khai dưới dạng các private method.

#### Ví dụ
```java
public  class ServiceProvider {
    protected int money = 10;
    
    public void print(){
        System.out.println("money = " + money);
    }

    private boolean isEven(int n) {
        return n % 2 == 0;
    }

}
```

Khi client triển khai 
```java
public class Client {
    public static void main(String[] args) {
        //use service of service provider 1
        ServiceProvider serviceProvider = new ServiceProvider();
        serviceProvider.print(); //ok
        serviceProvider.isEven(100); //error
    }
}
```

### 4. Accessor Method
Trong một class, các thuộc tính có thể ở trạng thái là private hoặc public. Nếu một thuộc tính có trạng thái private và một method cung cấp quyền truy cập public tới nó thì đây gọi là các `accessor method`.

#### Nguyên nhân sử dụng
- Ngăn các object bên ngoài trực tiếp sử dụng các thuộc tính của object
- Client chỉ biết giá trị mà accessor trả về, có thể là giá trị của thuộc tính hoặc giá trị đã qua xử lý khác
- Việc sử dụng trực tiếp có thể tăng các chi phí bảo trì. Ví dụ, một thuộc tính kiểu `double` chuyển sang kiểu `int`, nếu truy xuất trực tiếp, tất cả các đoạn code sử dụng thuộc tính này sẽ phải cập nhật theo về kiểu `int`. Tuy nhiên, với accessor method, việc thay đổi này sẽ chỉ ảnh hưởng tới accessor method. Accessor method có thể xử lý trả về `double` và không cần cập nhật đối với client.

#### Ví dụ

```java
public  class ServiceProvider {
    private int money = 10;
    
    public int getMoney() { //accessor method
        return money;
    }

}
```

### 5. Constant Data Manager
#### Nguyên nhân sử dụng
- Lưu trữ tập trung các giá trị hằng số của chương trình trong 1 (hoặc 1 số ít) các object và sử dụng bởi các object khác của chương trình.
- Dễ bảo trì

#### Ví dụ
- Không sử dụng Constant Data Manager

```java
public class ClassA {
    public static final String CLASS_A_VARIABLE = "Class A";
}
```

```java
public class ClassB {
    public static final String CLASS_B_VARIABLE = "Class B";
}
```

Khi cần thay đổi các giá trị hằng này, cần tìm đúng class nó được khai báo sử dụng.

- Sử dụng Constant Data Manager

```java
public class ConstantDataManager {
    public static final String CLASS_A_VARIABLE = "Class A";
    public static final String CLASS_B_VARIABLE = "Class B";
}
```
Các giá trị hằng được lưu tập trung tại một object và khi cần cập nhật, theo dõi sẽ đơn giản hơn nhiều.

### 6. Immutable Object
#### Nguyên nhân sử dụng
Một class thông thường sẽ bao gồm các thuộc tính dữ liệu và chức năng (method). Nếu một class cần sử dụng để làm việc với dữ liệu mà không cần tới các chức năng khác, chúng sẽ được gọi là các data model class. Instance của các class này là các data object. Đôi khi, có vài client object sẽ cùng lúc sử dụng dữ liệu của một instance của các data model class này dẫn tới có thể sai lệch trong xử lý do các thay đổi đối với dữ liệu của các instance này.

Immutable Object pattern được sử dụng để đảm bảo rằng việc truy xuất đồng thời tới data object bởi nhiều client khác nhau sẽ không dẫn tới các vấn đề này mà không sử dụng tới việc đồng bộ hoá (synchronize) method truy xuất dữ liệu. Điều này đòi hỏi dữ liệu trong các data object không đổi trong suốt vòng đời của nó.

#### Cách khởi tạo
- Tất cả các biến chỉ được khởi tạo từ constructor
- Class không được kế thừa nên được khai báo với từ khoá `final`
- Tất cả các biến đều chỉ được thiết lập 1  lần do đó chúng cũng được khai báo là `final`
- Nếu có một biến nào kiểu object thì method getter của nó sẽ chỉ trả về bản clone của biến này thay vì object thực

#### Ví dụ
```java
public final class ImmutableExample {
    final int a;
    final String b;
    final Object c;

    public ImmutableExample(int a, String b, Object c){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public int getA() {
        return a;
    }

    public String getB() {
        return b;
    }

    public Object getC() {
        return c.clone();
    }
}
```

### 7. Monitor
#### Nguyên nhân sử dụng
Đôi khi các object trong chương trình sẽ cần chia sẻ 1 tài nguyên nào đó. Việc truy xuất đồng thời tới cùng 1 tài nguyên có thể dẫn tới việc đọc sai các dữ liệu của tài nguyên (race conditions).

Monitor pattern được sử dụng để đảm bảo rằng chỉ có 1 và chỉ 1 thread truy cập tới tài nguyên tại 1 thời điểm. Thiết kế này, service provider sẽ tự quản lý việc đọc dữ liệu đồng thời thay vì phải dựa vào logic của client object. Trong java, việc này có thể thực hiện thông qua từ khoá `synchronized`

#### Ví dụ
Ở đây, mình dùng 1 ví dụ đơn giản về có và không có từ khoá `synchronized` trong đọc ghi 1 biến đơn giản.

```java
public class Counter extends Thread{
    public static int a = 0;


    @Override
    public void run() {
        int i = 0;
        while(i++ < 100) {

            try {
                increase();
                decrease();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void decrease() throws InterruptedException {
        a--;
        System.out.println("a = " + a);
        Thread.sleep(10);
    }

    private void increase() throws InterruptedException {
        a++;
        Thread.sleep(10);
        System.out.println("a = " + a);
    }
}
```

```java
public class Main {

    public static void main(String[] args) {
        Counter counter = new Counter();
        Thread thread1 = new Thread(counter, "Thread-1");
        Thread thread2 = new Thread(counter, "Thread-2");
        Thread thread3 = new Thread(counter, "Thread-3");
        thread1.start();
        thread2.start();
        thread3.start();
    }

}
```
Theo logic thông thường, việc tăng và giảm giá trị của biến a sẽ là một phép vô dụng (trivial) và giá trị cuối cùng ta thu được sẽ là giá trị ban đầu (0). Tuy nhiên, việc có nhiều thread cùng đọc và ghi vào biến này sẽ dẫn tới race conditions và ta có thể có output sau

```bash
....
a = -5
a = -6
a = -6
a = -7
a = -7
a = -8
a = -5
a = -6
a = -6
a = -7
a = -7
a = -8
a = -5
a = -6
a = -6
a = -7
a = -7
a = -8
a = -5
a = -6
a = -6
a = -7
a = -7
a = -8
```

giá trị cuối mà ta có được là `-8` sai so với output kì vọng. Tiếp theo, tới sử dụng `synchronized`

```java
public class Counter extends Thread{
    public static int a = 0;


    @Override
    public void run() {
        int i = 0;
        while(i++ < 100) {

            try {
                increase();
                decrease();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private synchronized void decrease() throws InterruptedException {
        a--;
        System.out.println("a = " + a);
        Thread.sleep(10);
    }

    private synchronized void increase() throws InterruptedException {
        a++;
        Thread.sleep(10);
        System.out.println("a = " + a);
    }

}
```
Việc lock lại các method được sử dụng, các thread sẽ k ghi đè hay đọc sai giá trị của biến như trong race conditions. Do đó, kết quả kì vọng có thể đạt được

```bash
...
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
a = 1
a = 0
```

Trên đây là các pattern cơ bản, đã được hỗ trợ sẵn trong ngôn ngữ java. Bài tiếp theo, mình sẽ giới thiệu về các *Creational pattern* sử dụng trong việc khởi tạo các object.