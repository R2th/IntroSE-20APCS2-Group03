Khi ta chạy một số thread cũng giống như chạy nhiều chương trình khác nhau đồng thời, nhưng nó đem lại một số lợi ích như sau:
- Đa luồng trong một tiến trình chia sẻ cùng một không gian dữ liệu với main thread do đó có thể chia sẻ dữ liệu, kết nối với nhau dễ dàng hơn là các chương trình riêng biệt
- Các thread đôi khi được gọi là các tiến trình light-weight và chúng không đòi hỏi nhiều bộ nhớ, chúng tốn ít hơn tiến trình.

Một thread có một khởi động, một chu trình và một kết thúc. Nó có con trỏ để chỉ dẫn theo dõi vị trí trong ngữ cảnh mà nó đang chạy.
- Nó có thể làm gián đoạn
- Và cũng có thể được giữ lại(trong trạng thái sleep) trong khi các thread khác đang chạy. Nó được gọi là nhượng lại

## Start một New Thread
Để sinh ra một luồng khác, ta gọi phương thức sau trong module `thread`
```Python
thread.start_new_thread ( function, args[, kwargs] )
```
Phương thức này cho phép khởi tạo một thread nhanh chóng mà hiệu quả trong cả môi trường Linux và Windows
Phương thức gọi trả về ngay lập tức và các thread con bắt đầu gọi hàm với danh sách của `args`. Khi func retrurn thì thread kết thúc.
Ở đây `args` là một tuple. Nó rỗng khi không truyền bất kỳ đối số nào, `kwargs` là 1 dictionary optional của keyword arguments
Ví dụ:
```Python
#!/usr/bin/python

import thread
import time

# Khai báo một function cho thread
def print_time( threadName, delay):
   count = 0
   while count < 5:
      time.sleep(delay)
      count += 1
      print "%s: %s" % ( threadName, time.ctime(time.time()) )

# Tạo 2 thread
try:
   thread.start_new_thread( print_time, ("Thread-1", 2, ) )
   thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
   print "Error: unable to start thread"

while 1:
   pass
```
Khi đoạn code trên được thực thi thì:
```Python
Thread-1: Thu Mar 22 15:42:17 2018
Thread-1: Thu Mar 22 15:42:19 2018
Thread-2: Thu Mar 22 15:42:19 2018
Thread-1: Thu Mar 22 15:42:21 2018
Thread-2: Thu Mar 22 15:42:23 2018
Thread-1: Thu Mar 22 15:42:23 2018
Thread-1: Thu Mar 22 15:42:25 2018
Thread-2: Thu Mar 22 15:42:27 2018
Thread-2: Thu Mar 22 15:42:31 2018
Thread-2: Thu Mar 22 15:42:35 2018
```
Mặc dù nó hiệu quả cho các luồng ở mức low-level nhưng module thread rất hạn chế so với module mới là **threading** module

## Threading module
**Threading** module hỗ trợ mạnh mẽ hơn so với module thread được đề cập ở phần trước
Chúng bao gồm tất cả các method của module **thread** và có thêm một số phần mở rộng như:
- threading.activeCount(): Trả về số lượng thread đang hoạt động
- threading.currentThread(): Trả về số lượng đối tượng trong chuỗi điều khiển luồng được gọi
- threading.enumerate(): Trả về danh sách tất cả các đối tượng chuỗi hiện đang hoạt động.

Ngoài các method thì threading module còn có lớp `Thread` để thực hiện luồng, class có các method sau:
 - run() − Là entry point cho một thread
 - start() − Start một thread bằng cách gọi method run()
 - join([time]) − The join() waits for threads to terminate. Chờ cho các thread đóng với tham số `time`
 - isAlive() − Kiểm tra một thread vẫn còn đang thực thi
 - getName() − Trả về tên của thread
 - setName() − Set tên cho thread
## Tạo thread bằng Threading module
Để tạo một thread sử dụng **threading** module, ta phải thực hiện các bước sau:
- Khởi tạo một subclass của class **Thread**
- Override func  __init__(self [,args]) để thêm đối số
- Override the run(self [,args]) method to implement what the thread should do when started. Override func run(self [,args]) để thực hiện những gì các thread nên làm gì khi bắt đầu.

Một khi ta subclass của class Thread, ta có thể tạo một instance của nó và bắt đầu một thread mới bằng cách gọi method `start()` mà lần lượt là `run()`
```Python
#!/usr/bin/python

import threading
import time

exitFlag = 0

class myThread (threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
   def run(self):
      print "Starting " + self.name
      print_time(self.name, 5, self.counter)
      print "Exiting " + self.name

def print_time(threadName, counter, delay):
   while counter:
      if exitFlag:
         threadName.exit()
      time.sleep(delay)
      print "%s: %s" % (threadName, time.ctime(time.time()))
      counter -= 1

# Tạo thread mới
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# Start thread mới
thread1.start()
thread2.start()

print "Exiting Main Thread"
```
Và kết quả là:
```Python
Starting Thread-1
Starting Thread-2
Exiting Main Thread
Thread-1: Thu Mar 21 09:10:03 2018
Thread-1: Thu Mar 21 09:10:04 2018
Thread-2: Thu Mar 21 09:10:04 2018
Thread-1: Thu Mar 21 09:10:05 2018
Thread-1: Thu Mar 21 09:10:06 2018
Thread-2: Thu Mar 21 09:10:06 2018
Thread-1: Thu Mar 21 09:10:07 2018
Exiting Thread-1
Thread-2: Thu Mar 21 09:10:08 2018
Thread-2: Thu Mar 21 09:10:10 2018
Thread-2: Thu Mar 21 09:10:12 2018
Exiting Thread-2
```
## Synchronizing Threads
Với bất kỳ ngôn ngữ nào làm việc với thread đều cũng đã từng động đến đồng bộ các threads. Vậy làm thế nào thực hiện nó đối với Python
**Threading** module cung cấp cơ chế khoá đơn giản để triển khai cho phép ta đồng bộ các thread. Một khoá mới được tạo ra bằng cách gọi method `Lock()`, nó trả về một khoá mới. Method `arquire(blocking)` của khoá mới được sử dụng để ràng buộc các thread chạy đồng bộ. Tham số tuỳ chọn `blocking` cho phép ta kiểm soát thread có chờ khoá hay không.
Nếu `blocking` đặt là 0, thread return ngay lập tức với gía trị 0 nếu không thể lấy khoá và 1 nếu khoá được thu hồi. Nếu `blocking` được đặt thành 1, chuỗi sẽ bị khóa và chờ khóa được giải phóng.
Phương thức `release ()` của đối tượng khóa mới được sử dụng để giải phóng khóa khi nó không còn cần thiết nữa
Ví dụ:
```Python
#!/usr/bin/python

import threading
import time

class myThread (threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
   def run(self):
      print "Starting " + self.name
      # Get lock to synchronize threads
      threadLock.acquire()
      print_time(self.name, self.counter, 3)
      # Free lock to release next thread
      threadLock.release()

def print_time(threadName, delay, counter):
   while counter:
      time.sleep(delay)
      print "%s: %s" % (threadName, time.ctime(time.time()))
      counter -= 1

threadLock = threading.Lock()
threads = []

# Tạo mới threads
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# Start newThreads
thread1.start()
thread2.start()

# Add threads to thread list
threads.append(thread1)
threads.append(thread2)

# Wait for all threads to complete
for t in threads:
    t.join()
print "Exiting Main Thread"
```
Kết quả là
```Python
Starting Thread-1
Starting Thread-2
Thread-1: Thu Mar 21 09:11:28 2018
Thread-1: Thu Mar 21 09:11:29 2018
Thread-1: Thu Mar 21 09:11:30 2018
Thread-2: Thu Mar 21 09:11:32 2018
Thread-2: Thu Mar 21 09:11:34 2018
Thread-2: Thu Mar 21 09:11:36 2018
Exiting Main Thread
```
## Multithreaded Priority Queue
Module **Queue** cho phép ta create một objet queue, nó lưu giữ một số lượng item nhất định. Để kiểm soát queue ta có 1 số method sau:
 - get() − Removes and returns an item from the queue. lấy item ra khỏi queue và return về item đó
 - put() − Thêm item vào queue
 - qsize() − Trả về số items trong queue hiện tại
 - empty() − Return true  nếu queue empty còn không là false
- full() − Return true nếu queue full ngược lại là false
Ví dụ:
```Python
#!/usr/bin/python

import Queue
import threading
import time

exitFlag = 0

class myThread (threading.Thread):
   def __init__(self, threadID, name, q):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.q = q
   def run(self):
      print "Starting " + self.name
      process_data(self.name, self.q)
      print "Exiting " + self.name

def process_data(threadName, q):
   while not exitFlag:
      queueLock.acquire()
         if not workQueue.empty():
            data = q.get()
            queueLock.release()
            print "%s processing %s" % (threadName, data)
         else:
            queueLock.release()
         time.sleep(1)

threadList = ["Thread-1", "Thread-2", "Thread-3"]
nameList = ["One", "Two", "Three", "Four", "Five"]
queueLock = threading.Lock()
workQueue = Queue.Queue(10)
threads = []
threadID = 1

# Create new threads
for tName in threadList:
   thread = myThread(threadID, tName, workQueue)
   thread.start()
   threads.append(thread)
   threadID += 1

# Fill vào queue
queueLock.acquire()
for word in nameList:
   workQueue.put(word)
queueLock.release()

# Chờ cho queue rỗng
while not workQueue.empty():
   pass

# Thông báo cho thread để thoát
exitFlag = 1

# Chờ tất cả thread hoàn thành
for t in threads:
   t.join()
print "Exiting Main Thread"
```
Kết quả:
```
Starting Thread-1
Starting Thread-2
Starting Thread-3
Thread-1 processing One
Thread-2 processing Two
Thread-3 processing Three
Thread-1 processing Four
Thread-2 processing Five
Exiting Thread-3
Exiting Thread-1
Exiting Thread-2
Exiting Main Thread
```
> Refs: Python Advanced