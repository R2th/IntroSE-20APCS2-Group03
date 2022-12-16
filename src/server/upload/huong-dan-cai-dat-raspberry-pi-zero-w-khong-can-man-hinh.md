![](https://images.viblo.asia/931b45ec-14b7-424d-96b4-df603828f179.png)

Chào các bạn!

Năm rồi mua được bộ Raspberry Pi Zero W và Pi Camera, tính làm cái cam an ninh, mà hồi đó vọc linh tinh lỗi hoài chán quá đổi qua làm thành máy chơi game Snes..., Xong chơi được vài bữa cũng chán vì nó cần cấp nguồn cho cái tay xbox vì vậy nhiều khi chạy không ổn định, thế là cuối cùng để qua 1 góc.

Hôm rồi dọn nhà nhìn thấy lại em ấy, tuy nhiên đã mất tiêu cái cam ở đâu rồi, nhưng nhớ lại quãng thời gian trước cài đặt này kia phức tạp thế, phải cắm màn cắm chuột cắm bàn phím rõ phức tạp, mới thử tìm hiểu thì có 1 cách để cài đặt Raspberry Pi Zero W từ đầu rồi tự động kết nối wifi mà không cần cắm bàn phím chuột màn gì cả. Vì vậy chúng ta mới có bài này này :v

Nói về thế giới Raspberry Pi thì nó quá là bao la rồi, nhưng bài viết này mình viết cũng 1 phần để note lại sau này có quên có thể mở ra xem lại ;) NÓ PHÙ HỢP VỚI CÁC BẠN MỚI!

Ok vào việc nhé ;)

Bước 1: Thiết bị.
- 1 Raspberry Pi Zero W (sở dĩ là W là vì bản này mới có wifi để không phải cắm thêm gì, nếu ko các bạn phải cắm mạng này kia rắc rối lắm :v)
- 1 Thẻ nhớ Micro SD 64GB (của mình là 64GB còn ko rõ các thẻ nhỏ hơn có ok ko, các bạn cứ thử rồi chia sẻ ở dưới nhé ;) )
- 1 Đầu đọc thẻ Micro SD để cắm vào máy tính.
- 1 Máy tính.
- 1 Cable Micro USB.

Bước 2: Download tất cả mọi thứ.
- Các bạn download tất cả những thứ mình nói ở đây nhé, thừa hơn thiếu ;)
- 1. Phần mềm SD Card Formatter để format thẻ nhớ lại. [Link](https://www.sdcard.org/downloads/formatter/) 
- 2. Bản rom bạn muốn dùng, với kiểu dùng ko cần tới màn hình này thì tốt nhất bạn dùng bản Lite cho nó gọn nhẹ chạy cho mượt nhé ;) [Link](https://www.raspberrypi.org/downloads/raspberry-pi-os/) 
- 3. Phần mềm Etcher để flash rom vào thẻ nhớ [Link](https://www.balena.io/etcher/)
- 4. Phần mềm Notepad++ để sửa file config [Link](https://notepad-plus-plus.org/downloads/)
- 5. Phần mềm Putty để ssh vào Raspberry Pi sau khi đã cài đặt xong để kết nối wifi [Link](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
- 6. Phần mềm Bonjour để kết nối được với Raspberry Pi khi mới cài xong [Link](https://support.apple.com/kb/DL999?viewlocale=en_US&locale=en_US)
- 7. Driver phòng trường hợp máy tính bạn không nhận ra khi lần đầu cắm Raspberry Pi vào máy tính [Link](https://drive.google.com/file/d/1QKHL-JUvmvzBzafEnAxo2RnjsQTnPHQh/view)

Bước 3: Format SD Card.
- Các bạn format lại thẻ Micro SD để đảm bảo quá trình cài đặt không bị lỗi gì lạ nhé ;)
- Các bạn cứ để cài đặt mặc định là được nhé!

![](https://images.viblo.asia/9f826e5c-1fe0-46d5-bfa9-533cc89a5667.png)

Bước 4: Flash Rom.
- Sau khi đã format xong thẻ nhớ và download xong rom Raspberry Pi rồi các bạn bật phần mềm Etcher lên để flash rom vào thẻ nhớ nhé.
- Quá trình flash mất khá lâu vì vậy các bạn cứ kiên nhẫn cho tới khi nhận được thông báo thành công nhé, đừng vội không là hỏng việc đó ;)

![](https://images.viblo.asia/9cd4d128-090a-440a-911d-49cc9ce9b412.png)

Bước 5: Config.
- Sau khi flash xong rom vào thẻ nhớ, có thể máy sẽ tạm thời không nhận thẻ nữa, các bạn rút ra cắm lại để máy tính nhận thẻ nhé.
- Sau khi máy nhận thẻ rồi các bạn vào trong thẻ nhớ (có tên là boot) sẽ thấy có file Config.txt, các bạn mở nó ra bằng Notepad++ rồi thêm dòng này vào cuối file sau đó save lại nhé:

```
dtoverlay=dwc2
```
![](https://images.viblo.asia/553a966e-51f7-45a9-9153-99cef7ad16aa.png)

- Sau đó các bạn tiếp tục tìm đến file cmdline.txt rồi cũng mở bằng Notepad++ ra, sau đó tìm tới từ khóa **rootwait**, các bạn viết tiếp đoạn text sau vào phía sau của rootwait (có khoảng cách với rootwait nhé) rồi save lại nhé:

```
modules-load=dwc2,g_ether
```
![](https://images.viblo.asia/6ac8d71e-9f79-4150-a2eb-c12c432d8d8e.png)

- Cuối cùng các bạn tạo 1 file có tên là ssh ở ngay nơi chứa file Config và file cmdline nhưng nhớ là file ssh này không có phần mở rộng của file nhé! (ví dụ tạo file ssh.txt sau đó xóa phần .txt đi là xong) 
![](https://images.viblo.asia/39af8f6f-ae47-4c87-83f1-564e4fa5ad5a.png)


Bước 6: Kết nối với Pi qua cable Micro USB.
- Sau khi xong bước 5 các bạn thoát thẻ nhớ ra, rồi cắm thẻ vào Raspberry Pi Zero W, sau đó cắm cable Micro USB vào cổng USB (trên Pi Zero có 2 cổng 1 cổng là PWR và 1 cổng ghi là USB) đầu còn lại của cable cắm vào máy tính.
- Đợi khoảng 2p để Raspberry cài đặt và khởi động lên xong (chú ý trong quá trình này không được rút cable ra có thể gây lỗi- mình từng bị 1 lần và phải làm lại từ đầu).
- Sau 2p các bạn kiểm tra xem trong phần network của máy tính có thêm 1 kết nối nữa chưa, nếu chưa thì qua bước 6-1, nếu nhận rồi thì qua bước 7 nhé.
![](https://images.viblo.asia/39787093-5be3-4c84-b188-edf7fea763e6.png)

Bước 6-1: Cài đặt Bonjour và Driver.
- Các bạn cài Bonjour như bình thường, sau đó kiểm tra xem máy có đang báo thiếu driver không, nếu có thể brower driver đó qua file driver ở trên để nó cài vào.

Bước 7: Config Wifi.
- Như các bạn đã thấy, chúng ta mới chỉ xong việc cài đặt rom thôi, còn để làm việc với Pi chúng ta cần config cho nó kết nối wifi tự động để có thể ssh vào đó làm việc mà không cần gắn màn hình và bàn phím chuột.
- Các bạn bật PuTTY lên, rồi gõ vào Host Name (or IP address) là raspberrypi.local, port để 22, connection type là ssh, rồi ấn open.

![](https://images.viblo.asia/3ec4d589-62a9-4a48-9d6f-d27d996f9872.png)

- Lúc này sẽ có 1 màn hình console hiện lên yêu cầu chúng ta nhập tài khoản, các bạn điền pi, mật khẩu là raspberry.
- SSH thành công, các bạn đang ở trong Raspberry pi rồi, giờ các bạn  gõ câu lệnh sau đề vào menu config của Pi nhé:

```
sudo raspi-config
```
![](https://images.viblo.asia/b0a4f73a-eb0e-40e7-b550-a0f533a1c77a.png)

- Menu Config Tool hiện ra, các bạn chọn Network Options -> Wi-fi (wireless) -> SSID (tên của wifi sẽ kết nối tới) -> Password của wifi -> Chọn Finish.
- Các bạn gõ lệnh sau để check xem đã kết nối thành công hay chưa nhé (nếu wlan0 được cấp IP là các bạn đã kết nối thành công rồi đó):

```
ifconfig
```
![](https://images.viblo.asia/ce3520ce-266f-45fa-92d0-234fb5f66455.png)

Vậy là các bạn đã cài đặt rom, kết nối Raspberry Pi Zero W vào mạng thành công mà không cần cắm màn hình, bàn phím hay chuột vào, và tất nhiên giờ đã có ssh vào được rồi bạn có thể làm bất kì điều gì với Pi của mình từ xa 1 cách thoải mái mà chỉ cần cắm nguồn thôi nhé!

Chúc các bạn thành công ^_^