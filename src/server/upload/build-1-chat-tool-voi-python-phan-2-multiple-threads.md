* Ở phần trước mình đã giới thiệu xong cho các bạn khái niệm về Socket và kết nối TCP Client- Server với Socket dùng Python
* Hôm nay mình sẽ giới thiệu tới các bạn một phần nữa khá trừu tượng đó là đa luồng (Multiple Threads)
# Khái niệm
* Để dễ hiểu hơn, mình sẽ đưa ra một ví dụ như sau:
* Bạn kinh doanh 1 cửa hàng nhận order online. Các order khi đến sẽ xếp vào 1 hàng đợi. Sẽ có 1 nhân viên xử lí các order theo thứ tự sau đó đưa yêu cầu vào cho nhà bếp để làm.  Nếu xử lí như này, thì ở trong lập trình được gọi là lập trình đơn luồng.
* Ưu điểm của lập trình đơn luồng :
    * Đơn giản, dễ xử lí, mỗi lần 1 đơn hàng.
* Nhược điểm:
    * Thời gian xử lí lâu. Khiến khách hàng không hài lòng. Trong khi đó nhà bếp thì lại rảnh.
* Để khắc phục nhược điểm trên. Bạn có thể bố chí 2 hoặc nhiều nhân viên xử lí đơn hàng. Khi đó các đơn hàng sẽ được phân bổ, xử lí song song đồng thời. Cách xử lý như thế trong lập trình được gọi là lập trình đa luồng.
* Hình dưới đây minh họa sự khác nhau giữa đơn luồng và đa luồng:

![](https://images.viblo.asia/e0174930-be95-4905-8482-73b24c596dba.png)

* Đa luồng tận dụng tối đa tài nguyên của CPU, cho phép bạn chia tiến trình chính của bạn thành nhiều luồng, mỗi luồng thực thi 1 nhiệm vụ và chạy song song, đồng thời 
* Ưu điểm của đa luồng :
    * Nhiều luồng trong một tiến trình chia sẻ cùng một không gian dữ liệu với luồng chính và do đó có thể chia sẻ thông tin hoặc liên lạc với nhau dễ dàng hơn nếu chúng là các tiến trình riêng biệt
    * Xử lý nhanh hơn đơn luồng.
# Tạo 1 Thread
## Tạo 1 Thread sử dụng hàm
* Python cung cấp module `threading` hỗ trợ lập trình đa luồng. Vì thế nếu muốn sử dụng ta cần import thư viện này vào đầu file
```
import threading 
```
* Để sinh ra 1 luồng mớ sử dụng hàm, bạn dùng câu lệnh sau :
```
threading.Thread(target=function, args=(arr,))
```
* hàm `Thread()` nhận 2 đối số truyền vào. Đầu tiên là tên function mà luồng sẽ thực thi khi `start()`. Thứ 2 là 1 tuple các parameter của hàm (Nếu hàm không có parameter thì không cần truyền vào)
* Dưới đây là 1 ví dụ của mình với cách tạo thread sử dụng hàm.
```
import threading


def thread1():
    count = 0
    for x in range(10):
        count += 1
        print('thread 1: ', count)


def thread2():
    count = 0
    for x in range(10):
        count += 1
        print('thread 2: ', count)


try:
    t1 = threading.Thread(target=thread1)
    t2 = threading.Thread(target=thread2)
    t1.start()
    t2.start()
except Exception as e:
    print(e)
```
* Ví dụ trên mình tạo ra 2 luồng cùng đếm từ 1 đến 10 và in ra. và đây là kết quả :

![](https://images.viblo.asia/408b1b08-6036-4342-86e7-6f1dd6128f1d.png)

* Từ kết quả trên bạn có thể thấy rằng 2 luồng này đang chạy song song đồng thời. Vì thế nên thứ tự kết quả in ra hoàn có thể khác nếu bạn thử chạy lại file 1 lần nữa.
## Tạo 1 class định nghĩa Thread
* Để tạo được 1 class Thread, bạn cần:
    * Tạo 1 class kế thừa từ class Thread.
    * Ghi đè phương thức `__init __ (self [, args])` để thêm đối số bổ sung.
    * Sau đó, ghi đè phương thức `run (self [, args])` để thực hiện những gì luồng cần làm khi `start()`
* Tương tự như ví dụ ở phần trên nhưng khi dùng class Thread, ta sẽ làm như sau:
  * Đầu tiên tạo 1 file `countThread.py` định nghĩa cho class Thread
```
from threading import Thread


class CountThread(Thread):
    def __init__(self, name):
        super().__init__()
        self.name = name

    def run(self):
        count = 0
        for x in range(10):
            count += 1
            print(self.name, ':', count)
```

  * Tiếp theo tạo file `main.py` để chạy luồng chính thực thi chương trình:
  ```
  from countThread import CountThread


try:
    t1 = CountThread('thread1')
    t2 = CountThread('thread2')
    t1.start()
    t2.start()
except Exception as e:
    print(e)
  ```
    
   * Ok giờ thì run thử file `main.py` và xem kết quả:
  ![](https://images.viblo.asia/f0ba0762-a2ec-4706-be56-6e4aebeb990f.png)
* Module `threading` còn cung cấp 1 số hàm khá hữu dụng như :
    * **join([time])**: Đợi cho các thread kết thúc.
    * **isAlive()**: Kiểm tra xem một thread có đang thực thi hay không.
    * **getName()**: Trả về tên của một thread.
    * **setName()**: Thiết lập tên của một thread.
# Synchronizing Threads (Đồng bộ luồng)
## Khái niệm 
* Đồng bộ hóa (synchronized) chính là việc xắp xếp thứ tự các luồng khi truy xuất vào cùng đối tượng sao cho không có sự xung đột dữ liệu. Nói cách khác, đồng bộ hóa tức là thứ tự hóa.
## Tại sao cần đồng bộ hóa các luồng
* Khi lập trình đa luồng. Sẽ có lúc các luồng cùng cần thao tác trên 1 dữ liệu và điều này sẽ dễ dẫn đến các sai lệch về dữ liệu.
* Giả sử, trên 1 web bán quần áo, 1 chiếc áo được lưu trong csdl với số lượng là 1 cái. Có 2 khách hàng cùng lúc click mua chiếc áo này. Hệ thống đầu tiên sẽ lấy ra số lượng áo còn lại, kiểm tra xem còn không. nếu còn sẽ trừ số lượng của chiếc áo đó đi 1 và báo về đặt hàng thành công cho khách hàng. Vì 2 khách hàng cùng mua 1 lúc, số lượng áo còn lại hệ thống lấy ra từ CSDL đều là 1. Và như thế thỏa mãn điều kiện và hệ thống sẽ tiến hành lên đơn cho cả 2 khách. Trong khi đáng lẽ trong 2 người chỉ 1 người mua được chiếc áo.
* Lúc này việc đồng bộ hóa các luồng thật sự cần thiết trong trường hợp các luồng có những dữ liệu dùng chung.
## Đồng bộ luồng  trong Python
* Module `threading` cung cấp cơ chế khóa đơn giản cho phép bạn đồng bộ hóa các luồng. Bạn có thể tạo 1 khóa mới bằng cách gọi hàm `Lock()`
* Hàm `acquire` của Lock object được sử dụng để buộc các luồng chạy đồng bộ. Hàm `release()` của Lock object được sử dụng để giải phóng khóa khi không còn cần thiết.
* Ví dụ :
```
import threading
import time

class myThread (threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
   def run(self):
      print ("Starting " + self.name)
      # Get lock to synchronize threads
      threadLock.acquire()
      print_time(self.name, self.counter, 3)
      # Free lock to release next thread
      threadLock.release()

def print_time(threadName, delay, counter):
   while counter:
      time.sleep(delay)
      print ("%s: %s" % (threadName, time.ctime(time.time())))
      counter -= 1

threadLock = threading.Lock()
threads = []

# Create new threads
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# Start new Threads
thread1.start()
thread2.start()

# Add threads to thread list
threads.append(thread1)
threads.append(thread2)

# Wait for all threads to complete
for t in threads:
   t.join()
print ("Exiting Main Thread")
```
* Đoạn code trên tạo 2 luồng sử dụng chung hàm `print_time`. Và việc thêm các hàm `acquire()` và `release()` để lock hàm `print_time` giúp cho các thread chạy có thứ tự. Tại 1 thời điểm chỉ có 1 luồng gọi tới hàm `print_time`. 
* Đây là kết quả
```
Starting Thread-1
Starting Thread-2
Thread-1: Mon May  4 14:02:46 2020
Thread-1: Mon May  4 14:02:47 2020
Thread-1: Mon May  4 14:02:48 2020
Thread-2: Mon May  4 14:02:50 2020
Thread-2: Mon May  4 14:02:52 2020
Thread-2: Mon May  4 14:02:54 2020
Exiting Main Thread
```
* Để dễ dàng so sánh. Bạn hãy thử bỏ các hàm `acquire()` và `release()` để các luồng chạy song song bình thường.
```
Starting Thread-1
Starting Thread-2
Thread-1: Mon May  4 14:04:55 2020
Thread-2: Mon May  4 14:04:56 2020
Thread-1: Mon May  4 14:04:56 2020
Thread-1: Mon May  4 14:04:57 2020
Thread-2: Mon May  4 14:04:58 2020
Thread-2: Mon May  4 14:05:00 2020
Exiting Main Thread
```
* Đến đây chắc các bạn  đều đã thấy được sự khác biệt giữa việc đồng bộ và không đồng bộ các luồng rồi phải không nào.
 # Deadlock
 * Deadlock là khái niệm ai cũng cần phải biết khi lập trình đa luồng. Nói nôm na, Deadlock là tình trạng tiến trình dừng lại vĩnh viễn do một Thread đang đợi để được truy nhập 1 tài nguyên được sử dụng bởi 1 Thread khác và Thread này lại đang chờ để truy cập 1 tài nguyên mà Thread đầu tiên đang nắm giữ.
 * Để dễ hiểu hơn mình sẽ giải thích qua 1 ví dụ dưới đây.
 
 ![](https://images.viblo.asia/f1ce4dab-131e-4f49-ae3a-823eb29633fc.png)

* Ở hình trên, process A là tiến trình chạy trong Thread 1, process B là tiến trình chạy trong Thread 2. 
* Thread 1 đang truy vấn trong bảng A. Lúc này bảng A đã bị lock để đảm bảo tại 1 thời điểm chỉ 1 Thread được thao tác trên bảng A. Tương tự 
Thread 2 đang truy vấn trên bảng B nên bảng B đang bị lock bởi Thread 2.
* Sau khi truy vấn bảng A, Thread 1 muốn truy vấn sang bảng B tuy nhiên do bảng B đang bị Thread 2 lock nên cần đợi Thread2 chạy xong thì Thread 1 mới được truy vấn bảng B. 
* Thread 2 lại cần truy vấn sang bảng A đang bị lock bởi Thread 1 nên nó cũng cần đợi Thread 1 chạy xong thì mới truy vấn được tới bảng A.
* Lúc này Thread 1 và Thread 2 đều đợi nhau dẫn đến tiến trình bị dừng lại vĩnh viễn. Đó chính là tình trạng Deadlock
* Việc dính Deadlock là điều hoàn toàn có thể xảy ra, vì vậy khi lập tình đa luồng các bạn cần cực kỳ thận trọng, tránh để xảy ra Deadlock.
# Kết luận
* Vậy là thông qua phần 1 và phần 2, mình đã giới thiệu xong đến các bạn các kiến thức cần nắm để xây dựng 1 chat tool với python. 
* Trong phần tiếp theo, mình sẽ show code và giải thích chi tiết tool với mọi người. 
* Link phần 3: [**TẠI ĐÂY**](https://viblo.asia/p/build-1-chat-tool-voi-python-phan-3-ORNZqD9eK0n)
# Tài liệu tham khảo
* https://www.tutorialspoint.com/python/python_multithreading.htm