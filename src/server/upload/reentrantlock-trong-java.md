Cách làm thông thường để có được đồng bộ thread trong java là sử dụng keyword **synchronized**, tuy nhiên nó có một vài nhược điểm, ví dụ như các khối đồng bộ (có thể hiểu như nhóm các thread cùng chờ đợi một tài nguyên) không có cơ chế hàng đợi, sau khi một thread thoát khỏi khối, bất kì một thread nào khác cũng có thể truy cập -> có thể dẫn đến tình trạng “đói tài nguyên” cho các thread khác trong thời gian dài.
<br>
**ReentrantLock** cung cấp tính năng đồng bộ tốt hơn nhiều.
<br><br>
**ReentrantLock là gì?**
<br><br>
Lớp ReentrantLock *implement interface Lock* và cung cấp tính đồng bộ cho các hàm truy cập tài nguyên chung. Những dòng code điều khiển tài nguyên chung chủ yếu chỉ thực hiện các thao tác lock và unlock, nhằm cung cấp tài nguyên chung cho một thread và khóa nó, ngăn không cho các thread khác truy cập.<br>
ReentrantLock không giới hạn số lần truy cập tài nguyên của một thread. Khi một thread truy cập lần đầu vào tài nguyên, nó được gán một biến đếm giá trị 1. Trước khi giải phóng tài nguyên, nó có thể tái truy cập, và mỗi lần như thế thì biến đếm tăng lên 1. Với mỗi yêu cầu unlock, biến đếm sẽ giảm một, và khi biến đếm bằng 0 thì tài nguyên được giải phóng.<br>
ReentrantLock cung cấp một cơ chế phân chia tài nguyên khá công bằng, cụ thể là sau khi tài nguyên được giải phóng nó sẽ được cung cấp cho thread có thời gian chờ lâu nhất. Chế độ này có thể được thiết lập bằng cách truyền *true* vào hàm khởi tạo:
<br><br>
                  *ReentrantLock  rl = new ReentrantLock(true)*
 <br><br>
**Một số hàm thông dụng:**
<br><br>
	rl.tryLock(): thử yêu cầu truy cập tài nguyên. Nếu tài nguyên đang ở trạng thái tự do sẽ lập tức được truy cập, biến đếm = 1. Nếu thread đang chiếm giữ tài nguyên, biến đếm tăng thêm 1.<br><br>
	rl.lock(): tăng biến đếm lên 1 nếu đang chiếm giữ tài nguyên, ngược lại yêu cầu truy cập tài nguyên<br><br>
	rl.unlock(): giảm biến đếm đi 1<br><br>
    
** Ví dụ:**
 <br>
```
package main.java;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantLock;


public class DemoReentrantLock {
    private static final Integer MAX_T =2;

    public void demo() {
        ReentrantLock rel = new ReentrantLock();
        ExecutorService pool = Executors.newFixedThreadPool(MAX_T);
        Runnable w1 = new Worker(rel, "Job1");
        Runnable w2 = new Worker(rel, "Job2");
        Runnable w3 = new Worker(rel, "Job3");
        Runnable w4 = new Worker(rel, "Job4");
        pool.execute(w1);
        pool.execute(w2);
        pool.execute(w3);
        pool.execute(w4);
        pool.shutdown();
    }

    public static String getCurrentTime() {
        Date d = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss");
        return ft.format(d);
    }

    public static void main(String[] args) {
        new DemoReentrantLock().demo();
    }

    class Worker implements Runnable
    {
        String name;
        ReentrantLock re;

        public Worker(ReentrantLock rl, String n)
        {
            re = rl;
            name = n;
        }
        public void run()
        {
            boolean done = false;
            while (!done)
            {
                //Getting Outer Lock
                boolean ans = re.tryLock();

                // Returns True if lock is free
                if(ans)
                {
                    try
                    {
                        System.out.println(getCurrentTime() + ": task name - "+ name
                                + " outer lock acquired at "
                                + " Doing outer work");
                        Thread.sleep(1500);

                        // Getting Inner Lock
                        re.lock();
                        try
                        {
                            System.out.println(getCurrentTime() + ": task name - "+ name
                                    + " inner lock acquired at "
                                    + " Doing inner work");
                            System.out.println("Lock Hold Count - "+ re.getHoldCount());
                            Thread.sleep(1500);
                        }
                        catch(InterruptedException e)
                        {
                            e.printStackTrace();
                        }
                        finally
                        {
                            //Inner lock release
                            System.out.println(getCurrentTime() +  ": task name - " + name +
                                    " releasing inner lock");
                            re.unlock();
                        }
                        System.out.println("Lock Hold Count - " + re.getHoldCount());
                        System.out.println(getCurrentTime() + ": task name - " + name + " work done");

                        done = true;
                    }
                    catch(InterruptedException e)
                    {
                        e.printStackTrace();
                    }
                    finally
                    {
                        //Outer lock release
                        System.out.println(getCurrentTime()+ ": task name - " + name +
                                " releasing outer lock");

                        re.unlock();
                        System.out.println(getCurrentTime() + ": Lock Hold Count - " +
                                re.getHoldCount());
                    }
                }
                else
                {
                    System.out.println(getCurrentTime() + ": task name - " + name +
                            " waiting for lock");
                    try
                    {
                        Thread.sleep(1000);
                    }
                    catch(InterruptedException e)
                    {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
```