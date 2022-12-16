CountDownLatch được sử dụng để đảm bảo rằng một tác vụ chờ các Thread khác hoàn thành trước khi nó bắt đầu thực thi.

Khi chúng ta tạo ra một đối tượng của CountDownLatch, chúng ta chỉ định số lượng các Thread cần chờ đợi, tất cả các Thread đó được yêu cầu phải đếm ngược bằng cách gọi CountDownLatch.countDown() khi chúng đã hoàn thành. Ngay sau khi tính đến số 0, nhiệm vụ chờ đợi bắt đầu chạy.

![](https://images.viblo.asia/a7ef2527-0c59-45ad-93d0-3b41c95363ef.png)

Ví dụ: Một chương trình chỉ được start sau khi 3 service của nó đã được start. Với yêu cầu này, chúng ta có thể sử dụng phương thức join() của lớp Thread hoặc sử dụng lớp CountDownLatch.
## 1.Ví dụ sử dụng Thread.join()
Đầu tiên chúng ta hãy xem chương trình sử dụng phương thức join() của lớp Thead:
ServiceOne.java
```
public class ServiceOne implements Runnable {
 
    @Override
    public void run() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service One");
    }
}
```
ServiceTwo.java
```
public class ServiceTwo implements Runnable {
 
    @Override
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service Two");
    }
 
}
```
ServiceThree.java
```
import java.util.concurrent.CountDownLatch;
 
public class ServiceThree implements Runnable {
 
    private final CountDownLatch latch;
 
    public ServiceThree(CountDownLatch latch) {
        this.latch = latch;
    }
 
    @Override
    public void run() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service three");
        latch.countDown();
    }
 
}
```
Chương trình chính phải chờ 3 service ServiceOne và ServiceTwo hoàn thành trước khi start.
```

import java.util.concurrent.CountDownLatch;
 
public class CountDownLatchExample {
 
    public static void main(String[] args) {
        // intialising count down latch by 3, as it will wait for 3 threads to
        // finish execution
        final CountDownLatch latch = new CountDownLatch(3);
 
        // making two threads for 3 services
        Thread service1 = new Thread(new ServiceOne(latch));
        Thread service2 = new Thread(new ServiceTwo(latch));
        Thread service3 = new Thread(new ServiceThree(latch));
 
        service1.start();
        service2.start();
        service3.start();
 
        // latch waits till the count becomes 0
        // this way we can make sure that the execution of main thread only
        // finishes ones 3 services have executed
        try {
            System.out.println("Waiting for 3 services have started ... ");
            latch.await();
            System.out.println("Starting main Thread ... ");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Done!!!");
    }
 
}
```
Thực thi chương trình trên, ta có kết quả như sau:
```
Waiting for 3 services have started ... 
Started service Two
Started service One
Started service three
Starting main Thread ... 
Done!!!
```
## 2.Ví dụ sử dụng CountDownLatch
ServiceOne.java
```
public class ServiceOne implements Runnable {
 
    @Override
    public void run() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service One");
    }
}
```
ServiceTwo.java
```
public class ServiceTwo implements Runnable {
 
    @Override
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service Two");
    }
 
}
```
ServiceThree.java
```
import java.util.concurrent.CountDownLatch;
 
public class ServiceThree implements Runnable {
 
    private final CountDownLatch latch;
 
    public ServiceThree(CountDownLatch latch) {
        this.latch = latch;
    }
 
    @Override
    public void run() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Started service three");
        latch.countDown();
    }
 
}
```
Chương trình chính phải chờ 3 service ServiceOne và ServiceTwo hoàn thành trước khi start.
```
public class ThreadJoinExample {
 
    public static void main(String[] args) {
 
        // making two threads for 3 services
        Thread service1 = new Thread(new ServiceOne());
        Thread service2 = new Thread(new ServiceTwo());
        Thread service3 = new Thread(new ServiceThree());
 
        service1.start();
        service2.start();
        service3.start();
 
        // using thread.join() to make sure that the execution of main thread only
        // finishes ones 3 services have executed
        try {
            System.out.println("Waiting for 3 services have started ... ");
            service1.join();
            service2.join();
            service3.join();
            System.out.println("Starting main Thread ... ");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Done!!!");
    }
 
}
```
Như bạn thấy, tôi đã khởi tạo đối tượng CountDownLatch  với tham số là 3 để chỉ ra rằng chương trình chính phải chờ 3 Thread hoàn thành, tức là countdown là 0 mới được phép thực thi.
Mỗi Thread (ServiceOne, ServiceTwo) khi hoàn thành phải gọi phương thức CountDownLatch.countDown() để thông báo là Thead này đã hoàn thành, tức là giảm giá trị countdown (countdown–).
Sử dụng phương thức CountDownLatch.await() để thông báo chương trình chính phải chờ các Thread hoàn thành trước khi nó bắt đầu.
> Lưu ý: chúng ta có thể sử dụng phương thức CountDownLatch.await(long timeout, TimeUnit unit) để chỉ ra rằng chương trình chính phải chờ cho tới khi countdown là 0 hoặc sau khoản thời gian timeout.
Thực thi chương trình ta có kết quả như sau:
```
Waiting for 3 services have started ... 
Started service Two
Started service One
Started service three
Starting main Thread ... 
Done!!!
```
Như bạn thấy, cả 2 cách sử dụng phương thức Thread.join() và CountDownLatch kết quả của chương trình cũng không khác biệt. Tuy nhiên, nếu số lượng Thread của chương trình tăng lên thì bạn cần phải khai báo Thread.join() cho mỗi Thread. Điều này khá phiền phức, thay vào đó chúng ta nên sử dụng CountDownLatch cho trường hợp này.

Trong các ứng dụng thực tế, CountDownLatch thường được sử dụng để test các ứng dụng đa luồng. Bằng cách sử dụng CountDownLatch, nó có thể đảm bảo rằng nhiều luồng được kích hoạt yêu cầu đồng thời hoặc thực hiện mã cùng một lúc.

Trong bài tiếp theo, chúng ta sẽ tìm hiểu cách sử dụng CyclicBarrier, một lớp tiện ích khác cũng nằm trong gói java.util.Concurrent.

Nguồn GPCoder.com