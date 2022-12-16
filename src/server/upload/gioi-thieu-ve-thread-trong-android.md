# Khái niệm :
   - Thread là một tiến trình đơn vị xử lý của máy tính có thể thực hiện một công việc riêng biệt.
    - Mutil-Thread là khái niệm cho nhiều tiến trình chạy đồng thời, một ứng dụng Java ngoài luồng chính có thể có các luồng khác thực thi đồng thời làm ứng dụng chạy nhanh hơn và hiệu quả hơn.
# Trong Android sẽ chia làm 2 loại Thread :
   - MainThread : Là một dạng Thread nhưng có thể tương tác với giao diện người dùng.(cho phép cập nhập giao diện người dùng) :
       -  **Handler**
       -   **AsynTask**
       -    **BroadCast** **Receiver**
       -    **Service**
    - Worker Thread : Là một dạng khác của Thread nhưng không thể tương tác với giao diện người dùng.(không cho cập nhật giao diện)
 # Ưu điểm của đa luồng :
   - Mỗi luồng có thể dùng chung và chia sẻ nguồn tài nguyên trong quá trình chạy, nhưng có thể thực hiện một cách độc lập.
    - Phân tách các luồng : luống chính thì chạy trên giao diện người dùng, các luồng phụ làm nhiệm vụ riêng gửi đến luồng chính.
  # Nhược điểm của đa luồng :
   - Càng nhiều luồng thì xử lý càng phức tạp.
   - Nhiều luồng chạy thì sẽ khó quản lý, dễ gây ra lỗi hoặc luồng chết.
  
  # Cách tạo ra Thread và sử dụng :
   - Tạo một class extends từ Thread  hoặc implements Runable sau đó overide method run().
   - Khởi tạo đối tượng 
   - Bắt đầu khởi động Thread bằng cách gọi phương thức start.

**Cách 1: extends từ Thread**
                     
   ```
      public class ThreadTest {
               public static void main(String[] args) {
                   Counter ct = new Counter();
                   ct.start();
                   System.out.println("The thread has been started");
               }
           }
           class Counter extends Thread {
               public void run() {
                   for (int i = 1; i <= 5; i++) {
                       System.out.println("Count: " + i);
               }
            }
```
               
   **Cách 2 : implements Runable**
                               
```
public class RunnableTest {
      public static void main(String[] args) {
           RunCounter rct = new RunCounter();
           Thread th = new Thread(rct);
           th.start();
           System.out.println("The thread has been started");
       }
 }

 class RunCounter extends Nothing implements Runnable {
       public void run() {
           for (int i = 1; i <= 5; i++) {
           System.out.println("Count: " + i);
       }
  }

class Nothing {
}
```
  **Chú ý** : Giữa 2 cách trên không có sự khác biệt lắm, bạn có thể thấy nó đều thực thi phương thức run(). Tuy nhiên trong Java không hỗ trợ đa kế thừa nên 1 lớp kế thừa từ lớp khác muốn tạo 1 thread thì bắt buộc bạn phải implements Runable.
# Trạng thái của Thread :
   
   

![](https://images.viblo.asia/22550768-64c8-42d2-9b1f-ddd9cb762493.png)



```
Một Thread bao gồm 4 trạng thái sau:
    * New
    * Runnable
    * Blocked
    * Dead
```
         

   - **Trạng thái New** : Khi tạo một Thread với toán tử new, thì Thread vẫn chưa được chạy. Điều này có nghĩa là nó ở trong trạng thái New. Khi một Thread ở trong trạng thái New, Thread vẫn chưa bắt đầu thực thi code ở bên trong nó.
    - **Trạng thái Runnable **: Khi gọi phương thức start(), thì Thread rơi vào trạng thái Runnable.
    - **Trạng thái Blocked** : Thread rơi vào trạng thái Blocked nếu một trong các action sau đây xảy ra:
        * Gọi phương thức sleep().
        * Thread gọi một operation mà nó đang bị blocking trên Input/Output.
        * Thread cố gắng giành lấy khóa(lock) trong khi khóa này đang được nắm giữ bởi một Thread khác.
        * Thread đang đợi một điều kiện nào đó để thực thi.
    - **Trạng thái Dead** : Một Thread rơi vào trạng thái Dead với một trong 2 lý do sau:
        * Thực thi xong phương thức run().
        * Một ngoại lệ chưa được bắt(uncaught) được phát sinh và kết thúc phương thức run().
Ngoài ra, có một cách khác có thể kill một Thread bằng cách gọi phương thức stop(). Tuy nhiên, phương thức này đã bị ngăn cấm và không nên sử dụng phương thức này trong code.
    - **Quyền ưu tiên (Priority)** : Mỗi Thread trong Java đều có một quyền ưu tiên (priority) giúp cho hệ điều hành xác định được thứ tự thực hiện của các Thread được thực thi.
        * Giới hạn của nó:  MIN_PRIORITY (có giá trị 1) và MAX_PRIORITY (có giá trị 10).
        * Thông thường, Thread có quyền ưu tiên cao hơn sẽ được ưu tiên xử lý. Theo mặc định,  mỗi một Thread được cho một quyền ưu tiên NORM_PRIORITY (có giá trị 5).
        * Hầu hết Java Platforms đều hỗ trợ bảng biểu làm việc (timeslicing). Nếu không có timeslicing, thì mỗi Thread trong tập hợp các Thread có quyền ưu tiên ngang nhau đều thực thi (trừ khi nó từ trạng thái runnable rơi vào trạng thái waiting hay timed waiting, hay bị ngắt bởi Thread có quyền thực thi cao hơn) trước khi các Thread khác có quyền ưu tiên ngang nhau nhận được cơ hội thực thi. Với Timeslicing, thậm chí nếu Thread chưa thực thi xong khi thời gian thực thi vượt quá giới hạn cho phép, thì processor sẽ đẩy Thread đó ra và đưa một Thread tiếp theo(có độ ưu tiên bằng Thread trước đó) vào để thực thi.
 * Lưu ý: Những constants (MAX_PRIORITY, MIN_PRIORITY) được khai báo trong lớp Thread. Và ta không tạo và sử dụng các đối tượng Thread để thực thi đồng thời mà phải thực thi giao diện Runnable.
 # Đồng bộ luồng :
  - **Vấn đề** : Giả sử có 1 cặp vợ chồng có chung 1 sổ tiết kiệm có 2000$ và  2 người đều có thể rút tiền thông qua thẻ 2 ATM. Ngày đẹp trời 2 người cùng đi ra máy ATM rút tiền, cùng 1 thời điểm khi người vợ rút tiền 1000$ thì đúng ra trên màn hình sẽ báo còn 1000$ nhưng ở đây lại là 0$. Vậy vấn đề xảy ra do lúc đó ông chồng cũng rút tiền, và đó là sự bất đồng bộ.

	- **Synchronized** :(Tại cùng 1 thời điểm có nhiều thằng start() nhưng chỉ có 1 thằng được chạy, chạy xong thì thằng tiếp theo sẽ được running).
        - Mục đích của chính của synchronized là khi đã có một tiến trình A sử dụng tài nguyên này rồi thì những tiến trình khác phải chờ đến khi tiến trình A kết thúc thì mới được phép sử dụng.
        - Đồng nghĩa với việc thời gian xử lý sẽ tăng lên gấp đôi (do phải chờ tiến trình trước kết thúc) nhưng điều này đảm bảo rằng dữ liệu luôn luôn được toàn vẹn. 
        - 	Cách sử dụng : Để giả quyết vấn đề trên ta chỉ cần thêm từ khóa synchronized vào trước kiểu giá trị trả về của phương thức là đủ :
        
       
```
   public synchronized int value() {
                return c;
            }
```
- Nếu bạn không cần đồng bộ toàn bộ phương thức và chỉ muốn đồng bộ từng phần nào đó trong phương thức, Java cung cấp cho bạn khối đồng bộ (Synchronized blocks) để làm điều đó.Đây là 1 khối đồng bộ bên trong 1 phương thức không đồng bộ (unsynchronized):
      
```

    public void add(int value){
       //TODO: Do something else
       // Synchronized block
           synchronized(this){
           this.count += value;
          }
    }
```

   - **Chú ý**: Khối mã được đồng bộ phải được đặt trong dấu ngoặc nhọn. Biến “this” thể hiện khối mã sẽ được đồng bộ trên đối tượng (object) sở hữu phương thức chứa chúng. Các đối tượng được đồng bộ được gọi là các đối tượng giám sát (Monitor Object).


Trên đây là phần chia sẻ Thread của mình qua những gì mình tìm hiểu được, bài tiếp theo mình sẽ giới thiệu tiếp phần Handler & Asynctask. Rất mong được sự ủng hộ của các bạn, chúc các bạn học tốt