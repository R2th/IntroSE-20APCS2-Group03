Multi Thread và Task có thể là những chủ đề cũ của Java. Bản thân Java có gói java.util.concurrent và framework Fork/Join để tạo điều kiện thuận lợi cho nó. Và một vài thư viện mạnh mẽ đã được xây dựng để thực hiện bất đồng bộ. RxJava là thư viện phổ biến nhất hiện nay cho lập trình phản ứng và thiết kế một ứng dụng không đồng bộ.

Vậy còn những giải pháp cho Android?

*Looper, Handler và HandlerThread là cách giải quyết các vấn đề về lập trình không đồng bộ của Android*. Mặc dù khá ít được sử dụng, nhưng đây là một trong những thành phần xây dựng nên framework Android. Đối với những những lập trình viên mới bắt đầu, bạn nên hiểu các nguyên tắc đằng sau những thành phần này và người có kinh nghiệm nên xem lại chúng để nhận ra những chi tiết nhỏ rất có thể bị bỏ qua trong khi bạn làm việc với chúng.

# Trường hợp sử dụng
* Main Thread được xây dựng trên Looper và các Handler. Vì vậy hiểu biết về nó có thể giúp bạn tránh việc block Main Thread.
* Các nhà phát triển viết thư viện không đủ khả năng sử dụng thư viện của bên thứ ba vì kích thước thư viện. Vì vậy, đối với họ, lựa chọn tốt nhất là sử dụng các tài nguyên sẵn có.
* Việc hiểu chúng hoàn toàn sẽ nâng cao khả năng theo dõi phiên bản SDK Android.


-----


# Cơ chế hoạt động
### Vấn đề của Thread trong Java?

Các Thread Java chỉ sử dụng một lần và chết sau khi thực thi phương thức **run()** của nó.

### Chúng ta có thể cải thiện nó không?
Thread là một con dao hai lưỡi. Chúng ta có thể tăng tốc độ thực hiện bằng cách phân phối các nhiệm vụ giữa các Thread thực thi, nhưng cũng có thể làm chậm nó xuống khi các Thread dư thừa. Tạo Thread trong Thread khá là không hiệu quả và tốn kém. Vì vậy, lựa chọn tốt nhất là để có một số lượng tối ưu của các Thread và tái sử dụng chúng để thực hiện tác vụ.

**Khả năng tái sử dụng Thread:**
* Thread được giữ nguyên trong vòng lặp thông qua phương thức **run()**  của nó.
* Tác vụ được thực thi lần lượt theo thứ tự và được duy trì trong hàng đợi (MessageQueue)
* Thread phải bị hủy khi hoàn thành công việc.

### Cách Android thực hiện điều đó?
Mô hình trên được thực hiện trong Android thông qua Looper, Handler và HandlerThread:
* **MessageQueue** là một hàng đợi có các nhiệm vụ được gọi là các thông điệp cần được xử lý.
* **Handler** enqueues nhiệm vụ trong MessageQueue bằng cách sử dụng Looper và cũng thực hiện chúng khi nhiệm vụ đi ra khỏi MessageQueue.
* **Looper**  giữ một Thread luôn sống, lặp lại thông qua MessageQueue và gửi tin nhắn đến Handler tương ứng để xử lý.
* **Thread** cuối cùng được chấm dứt bằng cách gọi phương thức **quit()** của Looper.

> Một Thread có thể chỉ có một Looper duy nhất và có thể có nhiều Handler được liên kết với nó.
> 

#### Tạo Looper và MessageQueue cho một Thread:

Một **Thread** nhận được **Looper** và **MessageQueue** bằng cách gọi **Looper.prepare()** sau khi nó chạy. Looper.prepare () xác định Thread  gọi nó, tạo đối tượng Looper và MessageQueue và liên kết Thread với chúng trong lớp **ThreadLocal**.

**Looper.loop()** phải được gọi để bắt đầu looper. Tương tự, looper phải được chấm dứt một cách rõ ràng thông qua **Looper.quit()**.

```java
class LooperThread extends Thread {
      public Handler mHandler; 

      public void run() { 
          Looper.prepare();

          mHandler = new Handler() { 
              public void handleMessage(Message msg) { 
                 // process incoming messages here
                 // this will run in non-ui/background thread
              } 
          }; 

          Looper.loop();
      } 
  }
```

#### Tạo Handler cho một Thread:
Một Handler được liên kết ngầm với Thread mà tạo ra nó thông qua Looper của Thread, nhưng có thể ràng buộc nó một cách rõ ràng vào một Thread bằng cách truyền looper của Thread vào Constructor của Handler.
```java
handler = new Handler() {
@Override
public void handleMessage(Message msg) {
        // process incoming messages here
        // this will run in the thread, which instantiates it
    }
};
```

Việc gửi tin nhắn đến MessageQueue qua Handler có thể được thực hiện theo hai cách:
* **Message**: Đây là một lớp xác định các phương thức hữu ích khác nhau để xử lý dữ liệu được gửi đi. Để gửi một đối tượng, chúng ta thiết lập biến obj.
    ```java
    Message msg = new Message();
    msg.obj = "Ali send message";
    handler.sendMessage(msg);
    ```
    Chi tiết của lớp Message có thể được tìm thấy ở đây:
    https://developer.android.com/reference/android/os/Message.html
*   **Runnable**: Một runnable cũng có thể được gửi trong MessageQueue. 
    
    ```java
    new Handler(Looper.getMainLooper()).post(new Runnable() {
    @Override
    public void run() {
            // this will run in the main thread
        }
    });
    ```
    Trong ví dụ trên, chúng ta tạo một Handler và cung cấp Looper liên kết đến Main Thread.Khi post Runnable, nó sẽ được xếp vaò hàng đợi trong MessageQueue của Main Thread và sau đó được thực thi trong Main Thread.
    
    Handler có khả năng xử lý Message theo nhiều cách khác nhau, có thể tìm thấy ở đây:
    https://developer.android.com/reference/android/os/Handler.html
    


-----


####   HandlerThread
Tạo Thread  riêng và cung cấp Lopper và MessageQueue không phải là cách phù hợp để giải quyết vấn đề. Vì vậy, Android đã cung cấp HandlerThread (lớp con của Thread) để hợp lý hóa quá trình. Trong đó nó làm những điều tương tự mà chúng ta đã làm nhưng theo một cách mạnh mẽ. Vì vậy,khuyến khích sử dụng HandlerThread.

```java
private class MyHandlerThread extends HandlerThread {

    Handler handler;

    public MyHandlerThread(String name) {
        super(name);
    }

    @Override
    protected void onLooperPrepared() {
        handler = new Handler(getLooper()) {
            @Override
            public void handleMessage(Message msg) {
                // process incoming messages here
                // this will run in non-ui/background thread
            }
        };
    }
}
```
**Lưu ý:** Chúng ta đã khởi tạo Handler khi onLooperPrepared() được gọi. Vậy, Handler có thể liên kết với Looper đó.
* Looper chỉ được chuẩn bị sau khi  HandlerThread.start() được gọi(là sau khi thread chạy).
* Một Handler có thể được liên kết với một HandlerThread, chỉ sau khi Looper được chuẩn bị.

**Cách khác để tạo HandlerThread:**
```java
HandlerThread handlerThread = new HandlerThread("MyHandlerThread");
handlerThread.start();
Handler handler = new Handler(handlerThread.getLooper());
```

**Lưu ý**: HandlerThread cần gọi myHandlerThread.quit() để giải phóng tài nguyên và ngừng thực thi Thread.



-----

> Trên đây là bài giới thiệu của mình về Handler, Looper và HandlerThread. Hi vọng có thể giúp các bạn hiểu và giả quyết vấn đề của mình.


Bài viết dịch từ : 

https://blog.mindorks.com/android-core-looper-handler-and-handlerthread-bd54d69fe91a