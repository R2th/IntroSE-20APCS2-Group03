# Giới thiệu
Lý do bài này ra đời cũng chỉ vì 1 người bạn của mình kêu bị lỗi mất desktop, chỉ còn gõ được mỗi terminal :(. Thôi thì âu cũng là cái số, anh em nhảy vào cứu nét thôi =))

![](https://memegenerator.net/img/instances/44458188.jpg) 

# Tasksel
### Cài đặt
Trước hết, đối mặt với cái màn hình Ubuntu mà có mỗi terminal mà không có giao diện, các bạn đừng hoảng mà gõ theo những command sau
```bash
sudo apt-get update
sudo apt-get install tasksel
```
Sau khi install xong thì khởi động tasksel với quyền sudo thôi ;)
```bash
sudo tasksel
```

![](https://images.viblo.asia/5cb86b20-1459-436d-870d-c5a9468d4d63.png)

Ở đây có rất nhiều software cho chúng ta chọn, hiện tại máy mình đang sử dụng Kbuntu Desktop (sau một thời gian dùng Ubuntu Desktop thấy Gnome hơi nặng nên mình đổi gió sang Kubuntu Desktop, cảm thấy cũng khá là okie).  
Ở đây máy bạn mình đang không có giao diện nên mình cần cài 1 chiếc desktop để lấy lại giao diện cho bạn ấy, do bạn ấy sử dụng Ubuntu Desktop nên mình chọn Ubuntu Desktop rồi chọn `Ok`
> Lưu ý: Ở đây có khá nhiều software cho chúng ta lựa chọn, từ audio, graphic cho đến Samba, Print đầy đủ cả, nếu cảm thấy cần phần nào thì các bạn cũng có thể chọn nhé. 

Chọn Ok xong tasksel sẽ tự tải và cài đặt những gói cần thiết, việc cần làm bây giờ là ngồi chờ và khởi động lại máy chúng ta sẽ lấy lại được giao diện desktop như bình thường thôi. 

![](https://www.tecmint.com/wp-content/uploads/2016/09/Tasksel-Install-Software-Group.gif)
### Một số cách cài đặt khác
##### Sử dụng đối số
Bạn cũng có thể sử dụng các đối số để cài đặt những package mà mình mong muốn
```bash
sudo tasksel install lamp-server
```
Có install thì phải có uninstall rồi, chúng ta sử dụng câu lệnh `remove`
```bash
sudo tasksel remove lamp-server
```
Kiểm tra những tác vụ có sẵn, có thể install (-i) hoặc uninstall (-u)
```bash
sudo tasksel --list-task

u kubuntu-live  Kubuntu live CD
u lubuntu-live  Lubuntu live CD
u ubuntu-budgie-live    Ubuntu Budgie live CD
u ubuntu-live   Ubuntu live CD
u ubuntu-mate-live      Ubuntu MATE Live CD
u ubuntustudio-dvd-live Ubuntu Studio live DVD
u xubuntu-live  Xubuntu live CD
u cloud-image   Ubuntu Cloud Image (instance)
u dns-server    DNS server
i kubuntu-desktop       Kubuntu desktop
u lamp-server   LAMP server
u lubuntu-desktop       Lubuntu Desktop
i mail-server   Mail server
u postgresql-server     PostgreSQL database
```
Bạn có thể tìm thấy mô tả đầy đủ về tất cả các tác vụ và trong các file.
```bash
/usr/share/tasksel/*.desc
/usr/local/share/tasksel/*.desc
```
# Khác
Ngoài cách sử dụng tasksel, chúng ta cũng có thể sử dụng vài câu lệnh khác để install lại desktop cho Linux, ví dụ như 
```bash
sudo apt-get install ubuntu-desktop^
sudo apt-get install kubuntu-desktop^
sudo apt-get install lamp-server^
```
# Kết
Tasksel là một công cụ hiệu quả cho bạn nào muốn đổi gió sang 1 giao diện hoàn toàn khác một cách an toàn và dễ dàng. Việc cài đặt cũng cực kỳ đơn giản cho những bạn nào k có thời gian vọc vạch.
Như mình chuyển từ Ubuntu sang Kubuntu để được trải nghiệm Plasma khá là nhanh chóng mà không sợ bị bug này bug nọ, quá trình chuyển đổi cũng mất hơn nửa tiếng nhưng mà mình hoàn toàn hài lòng về cái này. Nếu bạn nào chán GNOME khá nặng nề thì có thể chuyển sang Plasma giống mình để được trải nghiệm mới mẻ hơn nhé :D.