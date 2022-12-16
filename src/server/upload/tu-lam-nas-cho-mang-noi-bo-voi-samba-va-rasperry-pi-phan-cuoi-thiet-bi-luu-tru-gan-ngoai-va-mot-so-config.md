Chào mừng mọi người đến với phần ba, phần cuối của series chia sẻ cách làm một hệ thống NAS cho mạng nội bộ với Samba và Rasperry Pi. Qua 2 phần trước chúng ta đã setup xong NAS và đã có thể truy cập để đọc, sửa, xóa file thành công rồi, tuy nhiên mới chỉ dừng lại ở phân vùng bộ nhớ chính của Pi thôi. Hôm nay mình sẽ chia sẻ cách mở rộng ra các phân vùng ngoài gắn trên Pi như USB hoặc ổ cứng gắn ngoài nhé. Nếu các bạn đang có dư USB hoặc ổ cứng cũ với dung lượng lớn mà chưa biết sử dụng vào mục đích gì thì có thể bài viết sẽ có ích với các bạn đó nhé.

Ngoài ra vì việc setup cho phân vùng ngoài khá đơn giản và nhanh nên mình cũng sẽ giới thiệu thêm một số config tiêu biểu của Samba Server, thêm nữa là use case của bản thân mình cho NAS với Pi này.

Giờ thì đi vào phần chính của bài viết thôi!!!!

# 1. Setup NAS với ổ cứng ngoài hoặc USB
### 1.1 Chuẩn bị USB hoặc ổ cứng

Những gì chúng ta cần:
* 

Trước hết thì chúng ta cần phải chuẩn bị một USB hoặc ổ cứng ngoài là đương nhiên rồi. Dung lượng thì tùy các bạn nhé, càng nhiều thì càng lưu trữ được nhiều thôi, ở đây vì đang demo nên mình chỉnh dùng một USB với dung lượng tầm 32GB thôi, với ổ cứng ngoài thì các bạn cũng làm tương tự chứ không có khác biệt gì nhé :smiley:

> Trong bài viết này mình khuyến khích các bạn sử dụng external drive (thiết bị lưu trữ gắn ngoài) có định dạng là Ext4, theo kinh nghiệm của mình thì với Ext4 chúng ta sẽ tránh được một số vấn đề liên quan tới quyền ghi trên phân vùng của thiết bị gắn ngoài. Còn nếu các bạn đang sử dụng các định dạng khác như FAT32, VFAT, v.v thì có thể tìm hiểu thêm cách setting quyền cho phân vùng trong fstab nhé.
> 
> Lưu ý thêm là riêng với định dạng NTFS thì theo mình nhớ sẽ cần thêm thư viện ntfs-3g để hỗ trợ đọc ghi.

Nếu các bạn đã USB hoặc ổ cứng với định dạng Ext4 rồi thì có thể bỏ qua bước này, còn nếu chưa thì hãy backup lại các dữ liệu trong thiết bị và tiến hành format lại theo định dạng Ext4 nhé.

Trước hết thì tiến hành kết nối USB hoặc ổ cứng với Pi nhé, kết nối xong thì không cần restart lại Pi đâu mà Pi sẽ tự nhận luôn.

Tìm xem phân vùng của thiết bị vừa kết nối nằm ở đâu bằng lệnh bên dưới nhé, mình có kèm thêm một vài option để hiển thị thêm thông tin giúp chúng ta dễ tìm được thiết bị hơn.

```
sudo lsblk -o UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
```

Các bạn có thể dễ dàng nhận ra thiết bị của mình qua dung lượng, tên model của thiết bị, với mình thì nó có dạng như bên dưới.

```
UUID                                 NAME        FSTYPE    SIZE MOUNTPOINT        LABEL       MODEL
                                     sda                  28.8G                               DataTraveler_3.0
C6C0-5C09                            └─sda1      vfat     28.8G                               
```

Như các bạn thấy thì USB của mình đang ở phân vùng có tên là sda1 và có định dạng vfat. Tìm ra rồi thì mình tiến hành format phân vùng thành Ext4 bằng cách chạy câu lệnh bên dưới nhé

```
sudo mkfs -t ext4 /dev/sda1
```

Sau khi đã format xong thì chúng ta kiểm tra lại xem thay đổi đã được tích hợp vào phân vùng chưa bằng cách chạy lại lệnh `lsblk` như trên. 

Và đây là kết quả

```
UUID                                 NAME        FSTYPE    SIZE MOUNTPOINT        LABEL       MODEL
                                     sda                  28.8G                               DataTraveler_3.0
dd453df2-3e59-4a9c-a021-53a67061d0a9 └─sda1      ext4     28.8G                               
```

Giờ thì USB của mình đã có đã có định dạng Ext4 rồi, we're good to go next guys!!!!!!

------

### 1.2 Tạo mount point cho phân vùng của USB hoặc ổ cứng

Trên Linux thì trước khi muốn sử dụng ổ đĩa ngoài thì chúng ta phải qua một bước gắn kết phân vùng của thiết bị với Linux, hay được gọi là mounting disk partition. Công việc này cũng khá là đơn giản thôi nên làm luôn nhé các bạn.

1. Đầu tiên là tạo mount point với tên mà các bạn muốn, ở đây mình sẽ để là `usb1`

```
sudo mkdir -p /usb1
```

2. Sau đó, gắn kết phân vùng ổ đĩa với mount point vừa được tạo ở trên.

```
sudo mount -t auto /dev/sda1 /usb1
```

3. Kiểm tra lại xem phân vùng ổ đĩa đã được mount hay chưa cũng bằng cách chay lệnh `lsblk` khi nãy, và chú ý vào mục MOUNTPOINT

```
UUID                                 NAME        FSTYPE    SIZE MOUNTPOINT        LABEL       MODEL
                                     sda                  28.8G                               DataTraveler_3.0
dd453df2-3e59-4a9c-a021-53a67061d0a9 └─sda1      ext4     28.8G /usb1                               
```

Giờ đây ở cột MOUNTPOINT đã xuất hiện `/usb1`, có nghĩa là chúng ta đã tạo mount point thành công rồi. So far so good :grinning: 

4. Tạo thư mục share trên phân vùng của ổ đĩa ngoài

```
sudo mkdir /usb1/shared_folder
```

Vậy là xong giờ chúng ta chuyển sang phần setup cho Samba để chia sẽ phân vùng vừa tạo với các thiết bị khác nhé.

------

### 1.3 Chia sẻ phân vùng của USB hoặc ổ cứng bằng Samba

Việc chia sẽ phân vùng thì chúng ta cũng làm tương tự như mình đã chia sẻ với các bạn ở phần 2 nên chúng ta sẽ đi nhanh qua mục này nhé, nếu ai chưa biết cách setup thì có thể xem lại chi tiết ở [phần 2](https://viblo.asia/p/tu-lam-nas-cho-mang-noi-bo-voi-samba-va-rasperry-pi-phan-2-setup-samba-va-chay-nas-Ljy5VPGjZra) của series nhé.

```
1. sudo nano /etc/samba/smb.conf
2. Thêm phân vùng bằng cách add đoạn config bên dưới vào cuối file
     
     [Shared Folder External Drive]
     comment = Samba NAS on External Drive
     path = /usb1/shared_folder
     browsable = yes
     writable = yes
     
3. sudo systemctl restart smbd
```

Xong xuôi rồi thì tiến hành access vào lại NAS và các bạn sẽ thấy phân vùng của USB hoặc ổ cứng ngoài của mình đã có sẵn ở đó.


---

![image.png](https://images.viblo.asia/5795a86f-e62f-4166-be6a-79002c1463f8.png)

:tada: Mission Accomplished :tada:
----

Quá dễ phải không các bạn, giờ thì chúng ta đã có thể thoải mái thao tác với phân vùng share của USB hay ổ cứng ngoài rồi nhé. Mục tiêu chính của phần 3 đã hoàn thành rồi, chúng ta cùng đi sang 2 nội dung phụ còn lại là một số config tiêu biểu và một vài use cases với NAS nhé.

> Nếu các bạn có ai gặp vấn đề sau khi đã set writable trong Samba nhưng vẫn không thể ghi dữ liệu được trên phân vùng share thì thử gán quyền lại cho mount point vừa tạo xem sao nhé. Mình thấy có một số người gặp vấn đề này, mình thì mọi thứ 
> đều trơn tru cả :laughing: 

# 2.  Một vài configuration tiêu biểu cho NAS với Samba

Dưới đây là một bảng mà mình tổng hợp được, đa phần là các giá trị config hay được sử dụng với Samba. Tất nhiên nó sẽ thừa, đủ hoặc thiếu dựa trên nhu cầu của các bạn, vậy nên các bạn có thể tham khảo qua ở bảng dưới và tìm thêm ở các nguồn ngoài nữa.

Trong bảng sẽ cung cấp một vài thuộc tính như kiểu value, mô tả, default value và scope. Lưu ý là với scope là Global thì các bạn nên define nó ở dưới tag `[global]` nhé, còn với scope là share thì có thể define ở dưới tag phân vùng share của mình.

| Parameter | Type | Description | Default | Scope |
| -------- | -------- | -------- |-------- | -------- |
| workgroup     | string     | Option này để đặt tên cho work group mà server Samba nằm trong đó, cái này sẽ hữu ích khi bạn muốn phân loại các group client ra với nhau | WORKGROUP | Global |
| server string     | string     | Cái này là một chuỗi để mô tả cho Samba server của bạn | Samba %v | Global |
| netbios name     | string     | Tên của Samba server | 	Server’s unqualified hostname | Global |
| read only | boolean | Giá trị này dùng để xác định xem client có được quyền write ở phân vùng được chia sẻ hay không | yes | Share |
| writable | boolean | Ngược lại với read only, vậy nên read only là no thì sẽ giống với writable là yes | no | Share |
| hosts allow | string | Các giá trị ở đây sẽ là IP của client mà chúng ta cho phép truy cập vào phân vùng share | none | Share |
| hosts deny | string | Ngược lại với hosts allow, chúng ta sẽ định nghĩa các host mà không được phép truy cập phân vùng share ở đây | none | Share
| smb ports | integer, list | List các port numbers mà Samba sẽ nhận các request  CIFS (Common Internet File System) | 139, 445 | Global |
| log file | string | Tên file log mà Samba sẽ output ra | Specified in Samba make file | Global |
| log level | integer | Level log mà Samba sẽ output ra, có tất cả 5 level, các bạn có thể tìm hiểu thêm nhé. Default là 0 thì Samba sẽ chị log ra các error thôi | 0 | Global |
| max log size | integer | Dung lượng tối đa của file log, tính bằng kolibytes | 5000 | Global |
*Nguồn: O'Reilly*

Ở trên là một loạt các config mà mình thấy khá là phổ biến, ngoài ra thì Samba có khoảng hơn 200 configs nên việc list ra hết đương nhiên là không thể, demo từng config thì lại càng không. Nên mình để phần thú vị nhất là mày mò để config theo nhu cầu sử dụng của bản thân lại cho các bạn đấy :wink:. 

# 3. Use case của bản thân mình với NAS w Pi

Vậy là chúng ta sắp đi hết series build NAS với Pi và Samba rồi. Trước khi kết thúc thì mình cũng muốn chia sẻ use case của bản thân với các bạn, từ đó mong là các bạn sẽ có cái nhìn rõ hơn về lợi ích của NAS hay của Rasperry Pi.

Với Pi thì mình dùng nó cho khá nhiều mục đích có thể kể đến như ad-blocker bằng Pi-hole, một server tại gia để học tập, một PC thứ 2 để chạy các tác vụ tốn thời gian như download chẳng hạn, hay là NAS như mình đã chia sẻ. Nhưng mình sẽ chỉ nói chính về NAS với Pi thôi nhé.


### 3.1 Phân vùng lữu trữ mở rộng

Hiện tại mình đang sử dụng NAS như một phân vùng lưu trữ thêm, những file lớn mà mình ngại phải upload hay download lên Cloud Storage thì đều quăng vào NAS cả. Đa số là các files ảnh và video mình mà mình quay và chụp được muốn lưu lại để xem hoặc dùng khi cần, ngoài ra thì mình share cho các thành viên trong gia đình sử dụng để lưu dữ liệu nữa.
 
Mà tiện nhắc đến các dịch vụ lưu trữ đám mây thì mình thấy NAS sẽ tiện hơn ở chỗ là các bạn sẽ không bị phụ thuộc vào tốc độ đuờng truyền của ISP. Chẳng hạn bạn lưu trữ các dữ liệu có dung lượng lớn, mà lại tới mùa đứt cáp thì kéo file về cũng sẽ bị ảnh hưởng ít nhiều. Còn với NAS thì với đường truyền 100Mbps là bạn đã có thể truyền tải dữ liệu với tốc độ tầm 13MB/s rồi, nếu muốn tăng hơn nữa thì có thể dùng cable ethernet từ 5E trở lên với các thiết bị hỗ trợ Gigabit Ethernet (1000Mbps) thì tốc độ sẽ có thể lên ngưỡng ~100MB/s. Giúp cho việc xử lý cũng như thao tác dữ liệu sẽ nhanh chóng hơn.

------
### 3.2 Media Server

Media Server cũng là công năng khác mà chúng ta có thể tận dụng khi sử dụng NAS cùng với Pi. Nếu như các bạn đang lưu trữ các file media ở một ổ cứng nào đó mà mỗi lần cần xem phim hay nghe nhạc thì lại phải lôi ổ cứng ra, kết nối vào PC hoặc TV để sử dụng thì cũng khá là phiền, vậy sao không làm cho mọi thứ nó luôn luôn sẵn có để chỉ khi cần thì chúng ta sẽ thưởng thức luôn mà không cần phải làm gì cả? :laughing:  Đó cũng là lí mà mình tìm hiểu dựng NAS với Pi, sau đó là Media Server.

Chỉ qua một vài bước setup kèm với một số tool thì chúng ta cũng đã có cho mình một Media Server tại nhà mà không tốn quá nhiều chi phí. Thêm nữa cái thiết bị đang chạy Media Server còn có thể dùng cho nhiều việc khác cùng lúc như mình nói ở trên nữa :wink: 

---

Vừa rồi mình đã chia sẻ với các bạn 2 user cases mà mình đang xài với con NAS tự build cùng Pi và Samba. Mong là từ đây các bạn có thể ứng dụng và đưa ra được các ý tưởng hay hơn để phục vụ cho các nhu cầu của bản thân.

# 4. Phần kết

Vậy là chúng ta đã đi qua hết 3 phần của series rồi, hẳn là các bạn cũng đã build thành công một hệ thống NAS cho mình rồi. Có lẽ series này sẽ là phần mở đầu cho các loạt bài về máy tính nhúng của mình trong tương lai hứa hẹn sẽ có vài cái hay để chia sẻ cho các bạn, nếu ai có hứng thú thì có thể đón đọc trong thời gian tới nhé.

Ngoài ra đây cũng là lần đầu tiên mình làm series dài tới 3 phần, hay cũng là lần đầu tiên viết về Rasperry Pi hay NAS. Nếu có thiếu sót hoặc sai chỗ nào thì mong các bạn có thể góp ý bên dưới phần comment nhé. Hoặc nếu có làm được gì hay hay từ series của mình thì cũng đừng ngại thả nhẹ một chiếc comment để mình biết nhé.

Tạm biết các bạn và hẹn gặp lại các bạn ở những bài sau nhé. Be happy, be fresh and be safe from the pandemic!!!!!!!!