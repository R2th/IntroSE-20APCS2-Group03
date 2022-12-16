# A. Giới thiệu
Một Thread trong Java tại bất kỳ thời điểm nào tồn tại ở bất kỳ trạng thái nào sau đây. Một Thread chỉ nằm ở một trong các trạng thái được hiển thị tại bất kỳ thời điểm nào:

1. New
2. Runnable
3. Blocked
4. Waiting
5. Timed Waiting
6. Terminated <br>

Biểu đồ dưới đây thể hiện các trạng thái khác nhau của một luồng tại bất kỳ thời điểm nào.
<img src="https://media.geeksforgeeks.org/wp-content/uploads/threadLifeCycle.jpg" alt="error internet">
# B. Vòng Đời và Trạng thái 
## I. Vòng đời của a Thread
1. New Thread : Khi một Thread mới được tạo, nó ở trạng thái mới. Thread vẫn chưa bắt đầu chạy khi Thread ở trạng thái này. Khi một Thread nằm ở trạng thái mới, mã của nó vẫn chưa được chạy và chưa bắt đầu thực thi.
2. Runnable State : Một Thread đã sẵn sàng chạy được chuyển sang trạng thái có thể chạy được. Trong trạng thái này, một Thread có thể thực sự đang chạy hoặc nó có thể sẵn sàng chạy bất kỳ lúc nào. Bộ lập lịch luồng có trách nhiệm cung cấp cho Thread, thời gian để chạy.
Một chương trình đa luồng phân bổ một lượng thời gian cố định cho từng luồng riêng lẻ. Mỗi và mọi Thread chạy trong một thời gian ngắn, sau đó tạm dừng và chuyển CPU sang một Thread khác để các luồng khác có cơ hội chạy. Khi điều này xảy ra, tất cả các luồng đã sẵn sàng chạy, đang chờ CPU và luồng hiện đang chạy sẽ nằm ở trạng thái có thể chạy được.
3. Blocked/Waiting state: Khi một Thread tạm thời không hoạt động, thì nó ở một trong các trạng thái sau:
- Bị chặn
- Đang chờ đợi

Ví dụ, khi một Thread đang đợi I / O hoàn tất, nó sẽ nằm ở trạng thái bị chặn. Bộ lập lịch Thread có trách nhiệm kích hoạt lại và lên lịch cho một Thread bị chặn / chờ. Một Thread ở trạng thái này không thể tiếp tục thực thi thêm nữa cho đến khi nó được chuyển sang trạng thái có thể chạy được. Bất kỳ Thread nào ở các trạng thái này không tiêu thụ bất kỳ chu kỳ CPU nào.

Một Thread ở trạng thái bị chặn khi nó cố gắng truy cập vào một phần mã được bảo vệ hiện đang bị khóa bởi một số Thread khác. Khi phần được bảo vệ được mở khóa, lịch biểu sẽ chọn một trong các Thread bị chặn cho phần đó và chuyển nó sang trạng thái có thể chạy được. Trong khi đó, một Thread ở trạng thái chờ khi nó đợi một Thread khác với một điều kiện. Khi điều kiện này được đáp ứng, bộ lập lịch được thông báo và Thread chờ được chuyển sang trạng thái có thể chạy được.

Nếu một Thread hiện đang chạy được chuyển sang trạng thái bị chặn / chờ, một Thread khác ở trạng thái có thể chạy được bộ lập lịch Thread lên lịch chạy. Bộ lập lịch Thread có trách nhiệm xác định Thread nào sẽ chạy.

4. Timed Waiting: Một Thread nằm ở trạng thái chờ theo thời gian khi nó gọi một phương thức có tham số thời gian chờ. Một Thread nằm ở trạng thái này cho đến khi hết thời gian chờ hoặc cho đến khi nhận được thông báo. Ví dụ: khi một Thread gọi là ngủ hoặc chờ có điều kiện, nó sẽ được chuyển sang trạng thái chờ theo thời gian.
5.Terminated State : Một Thread kết thúc vì một trong các lý do sau:
Vì nó tồn tại bình thường. Điều này xảy ra khi mã của Thread đã được chương trình thực thi hoàn toàn.
Bởi vì đã xảy ra một số sự kiện sai bất thường, như lỗi phân đoạn hoặc một ngoại lệ chưa được khắc phục.
## II. Triển khai trạng thái của Thread
Để lấy trạng thái hiện tại của luồng, hãy sử dụng phương thức Thread.getState () để lấy trạng thái hiện tại của luồng. <br>
Java cung cấp lớp java.lang.Thread.State định nghĩa các hằng số ENUM cho trạng thái của một luồng, như tóm tắt của nó được đưa ra bên dưới:

1. Loại không đổi: New
```Java
    public static final Thread.State NEW
```
Mô tả: Trạng thái Thread cho một Thread chưa bắt đầu.

2. Loại không đổi: Runnable
```Java
    public static final Thread.State RUNNABLE
```
Mô tả: Trạng thái Thread cho một Thread có thể chạy được. Một Thread ở trạng thái có thể chạy được đang thực thi trong máy ảo Java nhưng nó có thể đang đợi các tài nguyên khác từ hệ điều hành như bộ xử lý.

3. Loại không đổi: Blocked
```Java
    public static final Thread.State BLOCKED
```

Mô tả: Trạng thái Thread cho Thread bị chặn đang chờ khóa màn hình. Một Thread ở trạng thái bị chặn đang chờ khóa màn hình nhập một khối / phương thức được đồng bộ hóa hoặc nhập lại một khối / phương thức được đồng bộ hóa sau khi gọi Object.wait ().

4. Loại không đổi: Waiting
```Java
    public static final Thread.State WAITING
```

Mô tả: Trạng thái Thread cho một luồng đang chờ. Trạng thái Thread cho một Thread đang chờ. Một Thread đang ở trạng thái chờ do gọi một trong các phương thức sau:
- Object.wait mà không có thời gian chờ
- Thread. tham gia mà không có thời gian chờ
- LockSupport.park

Một Thread ở trạng thái chờ đợi một Thread khác thực hiện một hành động cụ thể.

5. Loại không đổi: Timed Waiting
```Java
    public static final Thread.State TIMED_WAITING
```

Mô tả: Trạng thái Thread cho một Thread đang chờ với thời gian chờ được chỉ định. Một Thread đang ở trạng thái chờ theo thời gian do gọi một trong các phương thức sau với thời gian chờ tích cực được chỉ định:
Thread.sleep
- Object.wait với thời gian chờ
- Thread. tham gia với thời gian chờ
- LockSupport.parkNanos
- LockSupport.parkUntil

6. Loại không đổi: Terminated
```Java
    public static final Thread.State TERMINATED
```

Mô tả: Trạng thái Thread cho một Thread đã kết thúc. Thread đã hoàn tất quá trình thực thi.

- Chương trình sau đây giúp chúng ta kiểm tra trạng thái luồng
```Java
class thread implements Runnable
{
    public void run()
    {
        // Chuyển thread2 sang trạng thái chờ theo thời gian
        try
        {
            Thread.sleep(1500);
        } 
        catch (InterruptedException e) 
        {
            e.printStackTrace();
        }
          
        System.out.println("Trạng thái của thread1 khi nó gọi join() trên thread2 -"+
            Test.thread1.getState());
        try
        {
            Thread.sleep(200);
        } 
        catch (InterruptedException e) 
        {
            e.printStackTrace();
        }     
    }
}
```

Ta cũng cần tạo lớp Test thực thi Runnable
```Java
public class Test implements Runnable
{
    public static Thread thread1;
    public static Test obj;
      
    public static void main(String[] args)
    {
        obj = new Test();
        thread1 = new Thread(obj);
          
        // thread1 được tạo và hiện ở trạng thái New
        System.out.println("Trạng thái của thread1 sau khi tạo nó - " + thread1.getState());
        thread1.start();
          
        // thread1 đã chuyển sang trạng thái Runnable
        System.out.println("Trạng thái của thread1 sau khi gọi phương thức .start () - " + 
            thread1.getState());
    }
      
    public void run()
    {
        thread myThread = new thread();
        Thread thread2 = new Thread(myThread);
          
        // thread1 đã được tạo và hiện ở trạng thái New
        System.out.println("Trạng thái của thread2 sau khi tạo nó - "+ thread2.getState());
        thread2.start();
          
        // thread2 được chuyển sang trạng thái Runnable
        System.out.println("Trạng thái của thread2 sau khi gọi phương thức .start - " + 
            thread2.getState());
          
        // chuyển thread1 sang trạng thái Waiting state
        try
        {
            //chuyển thread1 sang trạng thái timed waiting
            Thread.sleep(200);
        } 
        catch (InterruptedException e) 
        {
            e.printStackTrace();
        }
        System.out.println("Trạng thái của thread2 sau khi gọi phương thức .sleep () - "+ 
            thread2.getState() );
          
        try 
        {
            // đợi cho thread2 chết
            thread2.join();
        } 
        catch (InterruptedException e) 
        {
            e.printStackTrace();
        }
        System.out.println("Trạng thái của thread2 khi nó kết thúc, nó đang thực thi - " + 
            thread2.getState());
    }
      
}
```

Chương trình sau khi chạy sẽ trả về
```
Trạng thái của thread1 sau khi tạo nó - NEW
Trạng thái của thread1 sau khi gọi phương thức .start () - RUNNABLE
Trạng thái của thread2 sau khi tạo nó - NEW
Trạng thái của thread2 sau khi gọi phương thức .start - RUNNABLE
Trạng thái của thread2 sau khi gọi phương thức .sleep () - TIMED_WAITING
Trạng thái của thread1 khi nó gọi join() trên thread2 -WAITING
Trạng thái của thread2 khi nó kết thúc, nó đang thực thi - TERMINATED
```

Giải thích: Khi một Thread mới được tạo, Thread đó ở trạng thái MỚI. Khi phương thức .start () được gọi trên một Thread, bộ lập lịch Thread sẽ chuyển nó sang trạng thái Runnable. Bất cứ khi nào phương thức join () được gọi trên một cá thể Thread, Thread hiện tại thực thi câu lệnh đó sẽ đợi Thread này chuyển sang trạng thái Đã kết thúc. Vì vậy, trước khi câu lệnh cuối cùng được in trên bảng điều khiển, chương trình gọi tham gia () trên luồng2 làm cho thread1 đợi trong khi thread2 hoàn thành việc thực thi và được chuyển sang trạng thái Đã kết thúc. thread1 chuyển sang trạng thái Chờ đợi vì nó đang đợi thread2 hoàn thành việc thực thi của nó vì nó đã gọi tham gia trên thread2.

# C. Tổng kết 
Qua đây chắc bạn cũng có cái nhìn tổng quan về vòng đời của Thread hoạt động ra sao. Khi nào nó ở trong trạng thái nào. Nếu bạn thấy bài viết còn thiếu sót ở đâu rất mong nhận được phản hồi tự bạn. Hay mong muốn mình chia sẻ về chủ đề nào khác không :)
# D. Tài liệu tham khảo
https://www.geeksforgeeks.org/lifecycle-and-states-of-a-thread-in-java/?ref=lbp<br>
https://www.geeksforgeeks.org/multithreading-in-java/