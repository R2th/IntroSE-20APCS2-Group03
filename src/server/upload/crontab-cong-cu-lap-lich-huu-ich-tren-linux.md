![](https://images.viblo.asia/6fdf3fbf-0c38-4a97-bc85-700622ab29b7.png)

### Giới thiệu

Mọi users, cũng như admin của hệ thống Linux, sẽ thường xuyên cần thực hiện một số tác vụ tự động vào những thời điểm nào đó hàng ngày. 

Ví dụ, một admin của hệ thống có thể cần giám sát việc sử dụng dung lượng ổ đĩa cứng, RAM,... của hệ thống. Trong những trường hợp này, một bộ lập lịch cron là một công cụ rất tiện dụng để đạt được mục đích này.

Giả sử rằng admin của hệ thống cần thực thi một script `/usr/local/sbin/backup.sh`  vào lúc `2:36 AM` mỗi ngày `Chủ Nhật` hàng tuần. Trong trường hợp này, admin cần chỉnh sửa file `crontab` của mình như trong hình bên dưới:

```
sudo crontab -e
```

Định dạng của một crontab khá đơn giản, chúng được chia thành 7 trường ngăn cách nhau bởi dấu space hoặc dấu tab:
- Trường đầu tiên mô tả phút (giá trị từ 0-59)
- Trường thứ 2 mô tả giờ (giá trị từ 0-23)
- Trường thứ 3 mô tả ngày của tháng (giá trị từ 1-31)
- Trường thứ 4 mô tả tháng (giá trị từ 1-12)
- Trường thứ 5 mô tả ngày trong tuần (giá trị từ 0-7)
- Trường thứ 6 mô tả chúng ta sẽ thực thi câu lệnh với quyền của account nào
- Trường thứ 7 mô tả câu lệnh chúng ta sẽ thực thi

Hãy quay lại với ví dụ ở trên cho các bạn dễ hình dung, hình sau đây mô tả một Crontab được lập lịch để thực thi vào mỗi `2:36 AM` mỗi ngày `Chủ Nhật`:

![](https://images.viblo.asia/2865149c-fd44-4802-b2f0-ff6a772c23b1.png)

Dưới đây là một số crontab cơ bản khác:



| Crontab | Mô tả |
| -------- | -------- |
| */5 * * * *   | Chạy crontab job mỗi 5 phút một lần  | 
|0 * * * *|Chạy crontab job mỗi một giờ một lần|
|0 0 * * *|Chạy crontab job vào lúc 00:00 giờ mọi ngày|

### Cách chỉnh sửa các tác vụ trong Crontab
Bạn có thể chỉnh sửa các Crontab job sử dụng câu lệnh sau:
```
crontab -u foobar -e 
```

Câu lệnh trên sẽ mở file cấu hình Crontab cá nhân của bạn sử dụng Text Editor mặc định của bạn. Đơn giản là bạn chỉ cần vào đó, thêm những sửa đổi của mình và save file lại là xong. Chúng ta không cần phải khởi động lại crontab bởi vì nó sẽ tự động cập nhật những thay đổi của bạn mỗi khi bạn đóng file lại. Để hiển thị danh sách các tác vụ trong Crontab, sử dụng câu lệnh:

```
crontab -l
```
Cuối cùng, nếu bạn muốn xóa các tác vụ trong Crontab, hãy thực thi câu lệnh sau đây. Lưu ý rằng nó sẽ xóa tất cả crontab hiện có của bạn:
```
crontab -r
```

#### Bộ lập lịch crontab của hệ thống Linux
Có rất nhiều services trong Linux sử dụng crontab tự động. Chúng lưu những cấu hình của bộ lập lịch Crontab trực tiếp trong thư mục `/etc/cron.d`. Bất cứ file nào được lưu trong thư mục này sẽ được tự động lấy ra và thực thi bởi bộ lập lịch Crontab.

Các admin trong hệ thống linux có thể tận dụng được những thư mục cấu hình crontab có sẵn như `/etc/cron.daily`, `/etc/cron.hourly`, `/etc/cron.monthly` and `/etc/cron.weekly`

### Một số ví dụ về crontab
#### Ví dụ 1:
Crontab sẽ chạy câu lệnh `updatedb` 35 phút mỗi giờ:
```
35 * * * * updatedb
```

#### Ví dụ 2
Crontab sẽ thực thi `/usr/local/bin/diskusage.sh` lúc `2:00 PM` vào các ngày mùng 10 của tháng 3, 6, 9, 12:
```
00 14 10 3,6,9,12 * /usr/local/bin/diskusage.sh
```

#### Ví dụ 3
Crontab sẽ thực thi `/usr/local/bin/diskusage.sh` lúc `1:25 AM`, `1:50 AM` mỗi thứ 3, và ngày 15 của mỗi tháng:
```
25,50 1 15 * 2 /usr/local/bin/diskusage.sh 
```

#### Ví dụ 4:
Crontab thực thi `/usr/local/bin/diskusage.sh` vào lúc `9:00 PM` mỗi thứ 2, thứ 4, thứ 6. 
```
00 21 * * Mon,Wed,Fri /usr/local/bin/diskusage.sh
```

Lưu ý rằng, sử dụng tên của các ngày trong tuần bằng tiếng anh là một mở rộng của một vài phiên bản crontab

#### Ví dụ 5:
Crontab thực thi `/usr/local/bin/diskusage.sh` mỗi 5 phút trong 5 ngày (Thứ 2 - Thứ 6), mỗi tuần, mỗi tháng:
```
*/5 * * * 1-5 /usr/local/bin/diskusage.sh
```

#### Ví dụ 6:
Crontab sẽ thực thi `/usr/local/bin/diskusage.sh` mỗi phút vào giờ thứ 4 của ngày Chủ nhật:
```
* */4 * * sun /usr/local/bin/diskusage.sh
```

### Tài liệu tham khảo
1. https://linuxconfig.org/linux-crontab-reference-guide
2. https://opensource.com/article/17/11/how-use-cron-linux
3. https://kvz.io/blog/2007/07/29/schedule-tasks-on-linux-using-crontab/