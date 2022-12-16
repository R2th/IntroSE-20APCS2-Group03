# **Đa luồng trong Java**

Đa luồng (multithreading) là một tính năng của Java cho phép việc thực thi đồng thời hai hoặc nhiều phần của chương trình để có thể tận dụng tối đa sức mạnh của CPU. Mỗi phần của chương trình như vậy được gọi là một luồng (thread). Vì vậy, có thể nói rằng luồng là các tiến trình (process) con nằm trong một tiến trình lớn.

Luồng có thể được tạo ra bằng hai cách:
1. Extend class Thread
2. Implement giao diện Runnable

 
**1. Tạo luồng mới bằng cách mở rộng class Thread**

Chúng ta tạo một class mới extend class java.lang.Thread. Class này override phương thức run () có sẵn trong class Thread. Phương thức run () cho phép chúng ta tạo một luồng mới. Sau đó chúng ta tạo một đối tượng của class vừa tạo và gọi phương thức start () để bắt đầu thực thi một luồng. Start () gọi phương thức run () nằm trong đối tượng Thread.

```

// Java code for thread creation by extending 
// the Thread class 
class MultithreadingDemo extends Thread 
{ 
    public void run() 
    { 
        try
        { 
            // Displaying the thread that is running 
            System.out.println ("Thread " + 
                  Thread.currentThread().getId() + 
                  " is running"); 
  
        } 
        catch (Exception e) 
        { 
            // Throwing an exception 
            System.out.println ("Exception is caught"); 
        } 
    } 
} 
  
// Main Class 
public class Multithread 
{ 
    public static void main(String[] args) 
    { 
        int n = 8; // Number of threads 
        for (int i=0; i<8; i++) 
        { 
            MultithreadingDemo object = new MultithreadingDemo(); 
            object.start(); 
        } 
    } 
} 
```

Kết quả: 
Thread 8 is running
Thread 9 is running
Thread 10 is running
Thread 11 is running
Thread 12 is running
Thread 13 is running
Thread 14 is running
Thread 15 is running

**2. Tạo luồng mới bằng các implement Giao diện Runnable**

Chúng ta tạo một class mới implement giao diện java.lang.Runnable và override phương thức run (). Sau đó, chúng ta khởi tạo một đối tượng Thread và gọi phương thức start () nằm trong đối tượng này.

```
// Java code for thread creation by implementing 
// the Runnable Interface 
class MultithreadingDemo implements Runnable 
{ 
    public void run() 
    { 
        try
        { 
            // Displaying the thread that is running 
            System.out.println ("Thread " + 
                                Thread.currentThread().getId() + 
                                " is running"); 
  
        } 
        catch (Exception e) 
        { 
            // Throwing an exception 
            System.out.println ("Exception is caught"); 
        } 
    } 
} 
  
// Main Class 
class Multithread 
{ 
    public static void main(String[] args) 
    { 
        int n = 8; // Number of threads 
        for (int i=0; i<8; i++) 
        { 
            Thread object = new Thread(new MultithreadingDemo()); 
            object.start(); 
        } 
    } 
} 
```

Kết quả :
Thread 8 is running
Thread 9 is running
Thread 10 is running
Thread 11 is running
Thread 12 is running
Thread 13 is running
Thread 14 is running
Thread 15 is running

**3. Các khác biệt giữa class Thread và giao diện Runnable**
* Nếu chúng ta cho một class extend lớp Thread, class đó sẽ không thể extend bất kỳ class nào khác vì Java không hỗ trợ đa kế thừa. Nhưng, nếu chúng ta implement giao diện Runnable, lớp của chúng ta vẫn có thể mở rộng các class khác.
* Chúng ta sẽ không phải implement lại một số chức năng cơ bản của  luồng nếu chúng ta extend class Thread, vì Thread đã cung cấp sẵn cho chúng ta một số phương thức như field (), interrupt (), v.v... Các phương thức này không có sẵn trong giao diện Runnable.

 Nguồn: Geekforgeeks