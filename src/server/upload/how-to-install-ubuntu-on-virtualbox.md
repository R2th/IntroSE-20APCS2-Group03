Bạn đang tìm một bài hướng dẫn để cài đặt một máy tính ảo **miễn phí** trên máy tính của mình ? Vậy thì đây đúng là bài viết mà bạn cần rồi. Còn chần chừ gì nữa, cùng mình tạo ngay ra một con máy ảo Ubuntu 20.04 ngay trên hệ điều hành Windows, để anh em lập trình chúng ta sáng có em Ubuntu cho tiện làm việc, trong khi tối vẫn có em Windows thân thương để giải trí nào.
<br>
Trong bài viết này mình sẽ hướng dẫn các bạn tải và cài đặt máy ảo VirtualBox – đây là phần mềm tạo máy ảo miễn phí và phổ biến nhất hiện nay. Sau đó chúng ta sẽ tiền hành cài đặt Ubuntu 20.04 trên VirtualBox này. Mọi người có thể tham khảo bài viết này để cài các phiên bản Ubuntu khác hoặc các hệ điều hành khác như Mac OS hay Windows cũng được nhé.
# 1. Downloads and Install VirtualBox

Truy cập link này để downloads VirtualBox:  https://www.virtualbox.org/wiki/Downloads
<br>
Lựa chọn phiên bản Host phù hợp với máy của bạn. Hiện tại mình đang dùng con Windows nên mình lựa chọn tải Windows Hosts nhé.
<br>
<br>
![](https://images.viblo.asia/bc840930-6452-40cd-9664-a4850a38393a.png)
<br>
<br>
Sau khi cài đặt VirtualBox bạn sẽ mở được VirtualBox như hình dưới đây.
<br>
![](https://images.viblo.asia/5c33febf-3d10-4c89-b6fe-9fdb963a315d.png)
<br>

# 2. Create virtual machine
Chọn New để tạo machine mới. Lựa chọn Type và Version như hình dưới đây. Mục Machine Folder là folder mà bạn sẽ config để lưu trữ máy ảo này. 
<br>
![](https://images.viblo.asia/b6a1f4b6-c6f5-47a8-ba21-f5a4fee50f46.png)
<br>
<br>
Tiếp theo sẽ cấu hình về RAM của máy ảo này. Tối thiểu là 1024MB.
<br>
![](https://images.viblo.asia/75fc839c-7b14-404c-b1ef-96ef76a2f288.png)
<br>
<br>
Tạo ra một ổ cứng cho máy ảo. Nếu bạn đã từng tạo ra một ổ cứng rồi bạn có thể dùng lại.
<br>
![](https://images.viblo.asia/af333098-22d6-4094-8e1f-c95f50bc9d96.png)
<br><br>
Lựa chọn VDI
<br>
![](https://images.viblo.asia/48eb43a6-43ea-4934-8e6f-85ec26884c7d.png)
<br><br>
Tiếp theo mình lựa chọn Fixed Size để để tạo ra một ổ cứng cố định theo dung lượng mình mong muốn. Nếu lựa chọn cái này bạn sẽ tốn thêm tầm 10 phút để tạo ra một máy ảo ban đầu nhưng sau này khi làm việc tốc độ xử lý sẽ nhanh hơn.
<br>
![](https://images.viblo.asia/7792b064-9be5-4dd4-99e4-bf13c38a4768.png)
<br><br>
Cài đặt dung lượng mà bạn muốn. Mình muốn có dung lượng lớn để làm việc nhiều trên con Ubuntu này nên để cấu hình hơi cao nhé. Còn tùy nhu cầu của bạn mà để cho phu hợp.
<br>
![](https://images.viblo.asia/ca200b4d-1d06-4141-87d9-695129c6100f.png)
<br><br>
Bấm Create và đợi tầm 5-10 phút để tạo là xong rồi đó.

# 3. Install Ubuntu 20.04 on Virtual Box
Tiếp theo chúng ta cần tải file iso để Virtual Box có thể cài đặt máy Guest như mình mong muốn.
<br>
Đây là link để download file iso cho Ubuntu 20.04:  http://releases.ubuntu.com/20.04/
<br>
Lựa chọn Desktop Image để download. File khá nặng nên đứng dậy uống tí nước nào.
<br>
![](https://images.viblo.asia/9c37abcc-d4f4-4829-b800-1a97ed9db49a.png)
<br><br>
Sau khi file iso đã được tải về mình sẽ vào lại Virtual Box và bấm Start.
Lựa chọn nút folder. Và insert file iso đã tải vào
<br>
![](https://images.viblo.asia/484cce28-a220-469c-8683-baff5299f163.png)
<br><br>
![](https://images.viblo.asia/dfacb393-eecf-4ebc-8594-0659d4fb1c99.png)
<br><br>
Tiếp theo chúng ta sẽ cài đặt hệ điều hành Ubuntu. Bạn có thể follow theo các hướng dẫn dưới đây
<br>
![](https://images.viblo.asia/c5394ce4-9f3b-4d8f-8c44-56023d9d4bd0.png)
<br><br>
![](https://images.viblo.asia/792357ba-2239-4a69-b40b-e4f1f43de623.png)
<br><br>
![](https://images.viblo.asia/d5dfe2f4-af0f-40a6-9622-dc94b9ccf8a0.png)
<br><br>
![](https://images.viblo.asia/d7eaf4ac-1c99-440c-a690-326235fc3988.png)
<br><br>
![](https://images.viblo.asia/b984b9ab-8df8-4b33-a4d7-7aef57a84416.png)
<br><br>
![](https://images.viblo.asia/098137e3-3431-4e1a-9013-f303f7a5fd67.png)
Tới đây Ubuntu sẽ được install và bạn đã cài đặt thành công Ubuntu 20.04 trên Virtual Box rồi đó.
<br>
Chúc các bạn thành công.
# 4.Bonus: Change Resolution Displays
Sau khi cài đặt xong máy ảo thì bạn sẽ thấy máy ảo size của nó nhỏ quá như thế này.
<br>
![](https://images.viblo.asia/de18ea94-64cd-469e-9e4f-2cc0a6b20bd9.png)
<br><br>
Giờ muốn chỉnh cho lớn hơn để dễ làm việc thì làm thế nào đây ta ? Vậy làm tiếp theo hướng dẫn của mình nhé.
<br>
Vào **Settings**.
<br>
![](https://images.viblo.asia/03170b13-af52-4763-b3c1-9a0d0e2e56d8.png)
<br><br>
Vào **Displays** => Chọn size mình muốn => **Apply**. 
<br>
![](https://images.viblo.asia/7f0240ec-d85c-483f-a633-9b50140355c8.png)
# 5.Bonus: Copy between Host Machine and Guest Machine
Giờ muốn copy giữa máy Host (Windows) và máy Guest (Ubuntu trong Virtual Box) thì làm thế nào nhỉ ?
<br>
Đầu tiên **Tắt Ubuntu**, rồi vào mục **Settings**
<br>
Setting như hình dưới đây
<br>
![](https://images.viblo.asia/b1ec1994-4cc4-41a9-8152-3adcb38a6e49.png)
<br><br>
Sau đó Start lại Ubuntu và check lại xem mục **Shared Cliboard** và **Drag and Drop** đã chính xác chưa.
<br>
![](https://images.viblo.asia/e7e116b1-e8cd-4dc8-bb08-ad28eb3970f7.png)
<br><br>
Sau đó bạn cần cài đặt thêm Guest Additions nữa
<br>
![](https://images.viblo.asia/c2e17cc3-6668-41e1-90f0-18f10b16bc2d.png)
<br><br>
![](https://images.viblo.asia/7cfcbedd-fbcc-4099-b4f4-f678cb088726.png)
<br><br>
Sau khi Run hoàn thành thì bạn tắt Ubuntu và Khởi động lại nhé.
<br>
Tới đây là bạn đã có thể copy giữa máy Host và máy Guest rồi đó.
<br>
Chúc các bạn thành công.