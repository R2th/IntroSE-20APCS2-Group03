Bạn dùng máy tính hàng ngày, mở hàng chục trang web khác nhau, cùng một cơ số đếm không xuể các ứng dụng nghe nhạc, xem phim, game ở ngoài, bạn có tự hỏi vì sao máy tính có thể cân hết chừng đấy việc một lúc không? Dường như các chương trình đều phản ứng chỉ trong tích tắc, và đang chạy đồng thời cùng nhau. Nhưng thực tế ảo diệu hơn thế nhiều, hóa ra, trong một đơn vị thời gian (nanosecond), chỉ có một chương trình (process) được chạy. Và trong chương trình đó, lại chia ra thành nhiều luồn (thread) con, thực thi cùng một lúc (multithread, ít nhất là trong thời điểm hiện tại), tạo cho người dùng cảm giác chương trình đang chạy nhanh hơn. Nhờ khả năng xử lí các task có thể coi như đồng thời (concurrency), chương trình có thể đáp ứng tốt với người dùng trong khi đang bận làm việc khác. Và đó là chính ý tưởng cơ bản của multithread.
# 1.Luồng (thread) là gì ? Sự khác nhau giữa thread và process
* Nói về cấu trúc máy tính : Thread là một đơn vị cơ bản trong CPU. Một luồng sẽ chia sẻ với các luồng khác trong cùng process về thông tin data, các dữ liệu của mình. Việc tạo ra thread giúp cho các chương trình có thể chạy được nhiều công việc cùng một lúc
* Process là quá trình hoạt động của một ứng dụng. Tiến trình (process)chứa đựng thông tin tài nguyên, trạng thái thực hiện của chương trình
* Thread là một bước điều hành bên trong một process. Luồng (thread) là một khối các câu lệnh (instructions) độc lập trong một tiến trình và có thể được lập lịch bởi hệ điều hành. Hay nói một cách đơn giản, Thread là các hàm hay thủ tục chạy độc lập đối với chương trình chính. Một process dĩ nhiên có thể chứa nhiều thread bên trong nó. Điểm quan trọng nhất cần chú ý là một thread có thể làm bất cứ nhiệm vụ gì một process có thể làm.
* Một điểm khác biệt nữa đó là nhiều thread nằm trong cùng một process dùng một không gian bộ nhớ giống nhau, trong khi process thì không. Điều này cho phép các thread đọc và viết cùng một kiểu cấu trúc và dữ liệu, giao tiếp dễ dàng giữa các thread với nhau. Giao thức giữa các process, hay còn gọi là IPC (inter-process communication) thì tương đối phức tạp bởi các dữ liệu có tính tập trung sâu hơn. Ngoài các tài nguyên riêng của mình (các biến cục bộ trong hàm), các luồng chia sẻ tài nguyên chung của tiến trình. Việc thay đổi tài nguyên chung (ví dụ, đóng file, gán giá trị mới cho biến) từ một thread sẽ được nhìn thấy bởi tất cả các thread khác. Vì vậy, lập trình viên cần phải thực hiện đồng bộ việc truy cập tài nguyên chung giữa các luồng.
* Hình bên dưới minh họa sự khác nhau giữa luồng và tiến trình. 
![](https://images.viblo.asia/a57a2073-a363-4742-ae44-e9bdfeca8149.png)

Đây là nhưng kiến thức trung xuất phát từ máy tính nói chung, đến các ngôn ngữ lập trình nói riêng thì những khái niệm này cũng tương tự như vậy
# 2. Đa luồng (Multithreading) là gì:
Một chương trình đa luồng chứa hai hoặc nhiều phần mà có thể chạy đồng thời và mỗi phần có thể xử lý tác vụ khác nhau tại cùng một thời điểm, để sử dụng tốt nhất các nguồn có sẵn, đặc biệt khi máy tính của bạn có nhiều CPU.

Python cung cấp thread Module và threading Module để bạn có thể bắt đầu một thread mới cũng như một số tác vụ khác trong khi lập trình đa luồng. Mỗi một Thread đều có vòng đời chung là bắt đầu, chạy và kết thúc. Một Thread có thể bị ngắt (interrupt), hoặc tạm thời bị dừng (sleeping) trong khi các Thread khác đang chạy – được gọi là yielding.

Một ví dụ đơn giản chỉ sử dụng một thread, có truyền tham số. Để chạy thread, ta dùng method start(). Target sẽ là function myThread, là nhiệm vụ mà thread phải hoàn thàDư.
Đây là một chương trình process chạy bình thường:
```
import time

def cal_square(numbers):
	print("calculate square number")
	for n in numbers:
		time.sleep(0.2)
		print ('square:', n*n)

def cal_cube(numbers):
	print("calculate cube number")
	for n in numbers:
		time.sleep(0.2)
		print ('square:', n*n*n)

arr = [2,3,7,9]
t = time.time()
cal_square(arr)
cal_cube(arr)
print ("done in ", time.time()- t)
```
![](https://images.viblo.asia/6b41e2ca-1246-479b-aeee-5d4a2f73ec8a.png)

Còn đây là chương trình chạy đa luồng
```
from threading import Thread
import threading
import time


def cal_square(numbers):
	print("calculate square number")
	for n in numbers:
		time.sleep(0.2)
		print ('square:', n*n)


def cal_cube(numbers):
	print("calculate cube number \n")
	for n in numbers:
		time.sleep(0.2)
		print ('cube:', n*n*n)

arr = [2,3,7,9]

try:
	t = time.time()
	t1 = threading.Thread(target=cal_square, args=(arr,))
	t2 = threading.Thread(target=cal_cube, args=(arr,))
	t1.start()
	t2.start()
	t1.join()
	t2.join()
	print ("done in ", time.time()- t)
except:
	print ("error")
```
![](https://images.viblo.asia/5d9e4ff4-7dc7-401c-9206-fd588fc13593.png)

có thể thấy các luồng chạy đồng thời song song với nhau, không cần chạy lần lượt tuần tự như process nữa , với luồng 1 chạy in ra với độ delay là 2s, và với luồng 2 là 3s.
Nếu chạy process thì tài nguyên có thể khác nhau,cấu trúc khác nhau, kết quả khác nhau và hoạt động tuần tự , còn đa luồng thi các thread có thể cấu trúc giống giau , tài nguyên dùng ít hơn.

```
from threading import Thread
import time


class myThread(Thread):
 	"""docstring for myThread"""
 	def __init__(self, name, counter, delay):
 		super(myThread, self).__init__()
 		self.name= name
 		self.counter=counter
 		self.delay=delay

 	def run(self):
 		print "san sang chay" + self.name
 		while self.counter:
 			time.sleep(self.delay)
 			print "%s: %s" % (self.name, time.ctime(time.time()))
 			self.counter-=1
 		print "ket thuc vong lap", self.name

try:
 	thread1 = myThread("thread 1", 10, 2)
 	thread2 = myThread("thread 2", 10, 3)
 	thread1.start()
 	thread2.start()
except:
 	print "Error"
```
kết quả 
![](https://images.viblo.asia/12fac49d-0da2-4e12-bcdb-36e51e8806b3.png)

Mặc dù thread Module rất hiệu quả với đa luồng tầm thấp nhưng khi so sánh với **threading** Module thì nó có nhiều điểm hạn chế. Phần tiếp theo giới thiệu về threading Module.

Module Threading cung cấp nhiều hỗ trợ mạnh mẽ và cấp độ cao hơn cho các Thread trong khi so sánh với thread Module ở trên. Ngoài các phương thức có trong thread Module, thì threading Module còn bổ sung thêm một số phương thức khác, đó là:

- **threading.activeCount():** Trả về số đối tượng thread mà là active.
- **threading.currentThread():** Trả về số đối tượng thread trong Thread control của Caller.
- **threading.enumerate():** Trả về một danh sách tất cả đối tượng thread mà hiện tại là active.

Bên cạnh đó, threading Module có lớp Thread để triển khai đa luồng. Lớp này có các phương thức sau:

- **run():** Là entry point cho một Thread.
- **start():** Bắt đầu một thread bởi gọi phương thức run().
- **join(\[time\]):** Đợi cho các thread kết thúc.
- **isAlive():** Kiểm tra xem một thread có đang thực thi hay không.
- **getName():** Trả về tên của một thread.
- **setName():** Thiết lập tên của một thread.

Có một số câu hỏi về việc nếu các thread được giao việc và chạy như vậy thì muốn dừng các thread lại thì phải làm sao. Đó là dùng deamon thread . Daemon thread thường được dùng khi không còn cách đơn giản nào có thể dừng được thread này (vd như infinitive loop), hoặc ngắt giữa chừng thread mà không làm ảnh hưởng đến dữ liệu. Ta có thể bắt một thread chạy trong daemon mode bằng cách dùng method setDaemon(True).
```
import threading
import time
 
def daemon():
    print (threading.currentThread().getName(), 'Starting')
    time.sleep(2)
    print (threading.currentThread().getName(), 'Exiting')
 
def non_daemon():
    print (threading.currentThread().getName(), 'Starting')
    print (threading.currentThread().getName(), 'Exiting')
 
d = threading.Thread(name='daemon', target=daemon)
d.setDaemon(True)
t = threading.Thread(name='non_daemon', target=non_daemon)
 
d.start()
t.start()
```
![](https://images.viblo.asia/61bc1627-15bc-4caf-a850-b3247fdbf597.png)
# 3. Đồng bộ hóa các Thread trong Python
Trong lập trình đa luồng, các threads chia sẻ chung tài nguyên của tiến trình, vì vậy có những thời điểm nhiều luồng sẽ đồng thời thay đổi dữ liệu chung. Do đó, ta cần những cơ chể để đảm bảo rằng, tại một thời điểm chỉ có duy nhất một luồng được phép truy cập vào dữ liệu chung, nếu các luồng khác muốn truy cập vào đoạn dữ liệu này thì cần phải đợi cho thread trước đó hoàn thành công việc của mình.

Python cung cấp threading Module, mà bao gồm một kỹ thuật locking cho phép bạn đồng bộ hóa các Thread một cách dễ dàng. Một lock mới được tạo bởi gọi phương thức Lock().

Phương thức acquire(blocking) của đối tượng lock mới này được sử dụng để ép các Thread chạy một cách đồng bộ. Tham số blocking tùy ý cho bạn khả năng điều khiển để xem một Thread có cần đợi để đạt được lock hay không.

Nếu tham số blocking được thiết lập là 0, tức là Thread ngay lập tức trả về một giá trị 0 nếu không thu được lock và trả về giá trị 1 nếu thu được lock. Nếu blocking được thiết lập là 1, thì Thread cần đợi cho đến khi lock được giải phóng.

Phương thức release() của đối tượng lock được sử dụng để giải phóng lock khi nó không cần nữa.


# 4. Ứng dụng đa luồng
Đa luồng có rất công dụng vô cùng hữu ích thích hợp cho những tác vụ chạy ngầm không cần quan tâm chính xác thời gian hoàn thành, nghe có vẻ giống cronjob nhỉ =)) nhưng đặc điểm lớn nhất của nó vẫn là chạy song song nhiều luồng cùng 1 lúc , có thể kể đến tác dụng hữu hiệu nhất trong các ứng dụng web ,và dự án của bản thân là ghi  log. 
Ví dụ dự án của mình có tác vụ gồm nhiều ưu đãi , người dùng muốn lưu ưu đãi đó cho dùng lần sau thì cần ghi log 2 sự kiện gồm view log và save log 
```
extra = {"action": "user_save_deal", "did": str(deal.id), "uid": str(bundle.request.user.id),
         "sub_action": sub_action, "dslug": deal.slug, "official_action": sub_action, "source": "apps"}
 log_user_action(message="user_save_deal", extra=extra, request=bundle.request)
        
 extra = {"action": "user_view_deal", "did": str(deal.id), "uid": str(bundle.request.user.id),
           "sub_action": sub_action, "dslug": deal.slug, "official_action": sub_action, "source": "apps"}
  log_user_action(message="user_view_deal", extra=extra, request=bundle.request)
 ```

với 
```
def log_user_action(message, extra, request=None):
    try:
        log_action_thread = LogUserActionThreading(msg=message, extra=extra, request=request)
        log_action_thread.start()
    except Exception as ex:
        pass
```
LogUserActionThearding chính là hàm khởi tạo thread. Nào cùng chạy => run()
```
class LogUserActionThreading(LoggingThreading):
    def get_logger(self):
        return logging.getLogger("jamja.analytics.services")

    def run(self):
        if "action" in extra and extra["action"] == "user_view_deal":
            Deal.objects(pk=extra["did"]).update_one(inc__view_count=1)
```