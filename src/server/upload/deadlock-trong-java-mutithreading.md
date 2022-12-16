Từ khóa **synchronized** được sử dụng rất nhiều khi lập trình multithread tron Java. Nó giúp cho việc đảm bảo cho 1 class hay một phương thức của 1 thread được thực thi mà không bị ảnh hưởng việc truy cập tài nguyên bởi các thread khác. Với **synchoronized**, một thread sẽ khóa tài nguyên khi đang chạy, các thread khác sẽ phải đợi cho đến khi thread kia chạy xong thì có quyền truy cập vào tài nguyên. Từ việc chúng ta nhận ra 1 vấn đề khá nghiêm trọng là có 2 thread đều sử dụng tài nguyên A và B. Thread X chạy **synchoronized**  khóa tài nguyên A lại, thread Y cũng chạy và khóa tài nguyên B lại. Như vậy 2 thread sẽ phải đợi lẫn nhau, không ai nhường tài nguyên cho ai dẫn đến việc cả 2 sẽ chờ đợi nhau mãi mãi. Điều này người ta gọi nôm na là **deadlock**. 
![22-2.png](https://images.viblo.asia/d986329a-7e42-4686-9459-1eb8cca6286b.png)

Cùng vào một ví dụ cho dễ hiểu nhé
```java
public class TestDeadlockExample {  
  public static void main(String[] args) {  
    final String hung = "Hung";  
    final String lan = "Lan";  
    // t1 tries to lock resource1 then resource2  
    Thread t1 = new Thread() {  
      public void run() {  
          synchronized (hung) {  
           System.out.println("Den nha Lan ru di choi");  
  
           try { Thread.sleep(100);} catch (Exception e) {}  
  
           synchronized (lan) {  
            System.out.println("di choi");  
           }  
         }  
      }  
    };  
  
    // t2 tries to lock resource2 then resource1  
    Thread t2 = new Thread() {  
      public void run() {  
        synchronized (lan) {  
          System.out.println("Den nha Hung hoi bai");  
  
          try { Thread.sleep(100);} catch (Exception e) {}  
  
          synchronized (hung) {  
            System.out.println("hoc bai");  
          }  
        }  
      }  
    };  
  
      
    t1.start();  
    t2.start();  
  }  
} 

// Output: 
// den nha Lan ru di choi
// den nha Hung hoi bai
```

Ở ví dụ trên ta có kịch bản là thread t1: Thanh niên Hùng đến nhà Lan rủ Lan đi chơi. Trong khi đó cùng thời điểm ở thread t2: Lan lại đang đến nhà Hùng để hỏi bài. Hùng phải chờ Lan về để còn đi chơi, Lan thì phải chờ Hùng về để còn học bài. Dẫn đến việc là 2 người không ai đạt được mục đích của mình. Lúc này chương trình sẽ treo mãi mãi giống như ví dụ trên ta thấy đợi mãi cũng không ra kết quả là đi chơi hay học bài đâu chỉ thấy ngồi đợi mà thôi.

Như có thể thấy deadlock rất là nguy hiểm đối với chương trình nên việc tránh để deadlock trong khi lập trình multithread là một việc vô cùng quan trọng. Hiện tại Java hay mình nghĩ là không có ngôn ngữ lập trình nào có cơ chế tự động xử lý deadlock. Do đó chúng ta cần phải phòng tránh nó. Dưới đây là một số lưu ý khi sử dụng thread để tránh deadlock xảy ra:
+ **Tránh sử dụng synchronized lồng nhau:** Việc sử dụng synchoronized lồng nhau rất dễ gây ra deadlock nếu như không cẩn thận. Đây cũng là nguyên nhân chính cho việc deadlock xảy ra.
+ **Tránh sử dụng lock không cần thiết**: Chỉ nên lock nhưng thread xử lý việc quan trọng cần phải đồng bộ, chứ không phải dùng lock tràn lan được. Điều này rất dễ gây ra deadlock.
+ ****