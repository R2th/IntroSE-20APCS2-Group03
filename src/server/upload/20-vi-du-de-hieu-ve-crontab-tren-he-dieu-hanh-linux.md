**Crontab** được sử dụng để chạy các tác vụ cụ thể trong một khoảng thời gian nào đó. **Crontab** rất hữu dụng cho các tác vụ thường xuyên như là lập lịch quét hệ thống, sao lưu dữ liệu, gửi mail ... Trong bài này, chúng ta sẽ làm quen với crontab thông qua 20 ví dụ rất dễ hiểu.
# Cú pháp Linux Crontab

Linux crontab có 2 phần chú ý, đầu tiên là * * * * * , 5 * này giúp chúng ta xác định ngày, giờ thực hiện, phần cuối cùng là câu lệnh hoặc script cần được thực thi.

![](https://images.viblo.asia/81b2c7ea-7a89-4eef-8af8-42ebd99f2c01.png)

[Minute] [hour] [Day_of_the_Month] [Month_of_the_Year] [Day_of_the_Week] [command]


# Làm thế nào để thêm/sửa 1 Crontab

Để thực hiện việc thêm hay sửa 1 crontab chúng ta sử dụng câu lệnh bên dưới, sau khi thực hiện câu lệnh, sẽ có 1 màn hình editor để bạn có thể viết thêm hoặc sửa 1 crontab đã có
```
crontab -e
```

Mặc định, với câu lệnh trên chúng ta sẽ sửa toàn bộ crontab của user log vào hệ thống, để sửa crontab của user khác ta dùng lệnh sau:
```
crontab -u username -e
```


Thay đổi biến môi trường EDITOR  để thay editor mặc định.
Hiển thị danh sách Crontab

Để hiển thị toàn bộ crontab của user hiện tại ta dùng.
```
crontab -l
```
Sử dụng -u để có thể list crontab của 1 user cụ thể.
```
crontab -u username -l
```
# 20 Ví dụ về Crontab
## 1. Thực thi 1 cron vào lúc 2 giờ sáng hàng ngày.

Khi chúng ta cần backup database hàng ngày, cũng như sourcecode thì việc dùng cron này rất hữu ích.
```
0 2 * * * /bin/sh backup.sh
```
## 2. Thực thi cron 2 lần trong 1 ngày.

Ví dụ dưới đây giúp ta thực thi 1 cron tại 2 thời điểm khác nhau trong 1 ngày. Ngoài ra chúng ta có thể chỉ định nhiều thời điểm khác cách nhau bởi giấu ','
```
0 5,17 * * * /scripts/script.sh
```
## 3. Thực thi cron theo từng phút.

Thông thường, chúng ta sẽ không khuyến khích thực hiện các cron theo từng phút vì có thể tốn tài nguyên của máy chủ, nhưng trong 1 vài trường hợp ngoại lệ, chúng ta có thể config như sau:
```
* * * * *  /scripts/script.sh
```
## 4. Thực thi cron vào 17h chủ nhật hàng tuần.

Cron này rất hữu ích cho các task hàng tuần, ví dụ như việc sinh logs hàng tuần.
```
0 17 * * sun  /scripts/script.sh
```
## 5. Thực thi cron 10 phút 1 lần.

If you want to run your script on 10 minutes interval, can configure like below. These type of crons are useful for monitoring.
```
*/10 * * * * /scripts/monitor.sh
```
*/10: nghĩa là cứ 10 phút chạy 1 lần. Tương tự như vậy ta có thể thực thi 5 phút 1 lần bằng */5.

## 6. Thực thi cron theo các tháng được chỉ định.

Đôi khi chúng ta chỉ cần thực hiện 1 cron trong các tháng được chỉ định mà thôi, ta sử dụng:
```
* * * jan,may,aug *  /script/script.sh
```
## 7. Thực thi cron theo ngày được chỉ định.

Khi bạn chỉ định ngày cụ thể trong tuần cần thực hiện, ví dụ chạy cron vào chủ nhật và thứ 6 vào lúc 5 giờ chiều.
```
0 17 * * sun,fri  /script/script.sh
```
## 8. Thực thi cron vào chủ nhật đầu tiên hàng tháng.

Để thực hiện script vào chủ nhật đầu tiên của tháng ta phải sử dụng điều kiện kèm theo:
```
0 2 * * sun  [ $(date +%d) -le 07 ] && /script/script.sh
```
## 9. Thực thi cron  theo chu kì 4 giờ.

Khi bạn muốn thực hiện 1 cron cứ 4 giờ chạy 1 lần.
```
0 */4 * * * /scripts/script.sh
```
## 10. Thực thi cron 2 lần vào thứ 2 và chủ nhật hàng tuần.

Để thực hiện chạy 1 cron 2 lần vào 2 ngày chỉ định ta làm như sau:
```
0 4,17 * * sun,mon /scripts/script.sh
```
## 11. Thực thi cron cứ 30 giây 1 lần.

Để thực hiện 1 cron 30 giây 1 lần, ta không thể thực thi trên 1 cron mà cần thực hiện theo 2 bước sau:
```
* * * * * /scripts/script.sh
* * * * *  sleep 30; /scripts/script.sh
```
## 12. Thực thi nhiều script trong 1 cron.

Để thực thi việc này ta tách các script cách nhau bởi dâu ( ; ).
```
* * * * * /scripts/script.sh; /scripts/scrit2.sh
```
## 13. Thực thi cron hàng năm ( @yearly ).

Sẽ hữu ích khi chúng ta gửi thông báo chúc mừng năm mới tự động, chúng ta sử dụng @yearly tương tự như “0 0 1 1 *”.
```
@yearly /scripts/script.sh
```
## 14. Thực thi cron hàng tháng ( @monthly ).

@monthly tương tự với “0 0 1 * *”. Cron này dùng để thực thi script tại thời điểm phút đầu tiên của tháng.
```
@monthly /scripts/script.sh
```
## 15. Thực thi cron hàng tuần ( @weekly ).

@weekly tương tự “0 0 1 * mon”. Thực thi cron tại phút đầu tiên của tuần mới.
```
@weekly /bin/script.sh
```
## 16. Thực thi cron hàng ngày ( @daily ).

@daily tương tự “0 0 * * *”. Được dùng để thực hiện các task daily.
```
@daily /scripts/script.sh
```
## 17. Thực thi các cron hàng giờ ( @hourly ).

@hourly tương tự “0 * * * *”. Thực thi cac cron hàng giờ tại phút đầu tiên.
```
@hourly /scripts/script.sh
```
## 18. Thực thi reboot hệ thống  ( @reboot ).

@reboothữu ích cho tác vụ mà bạn muốn chạy khi khởi động hệ thống. Nó giống như các kịch bản khởi động hệ thống. Hữu ích cho việc khởi động các tác vụ trong nền một cách tự động
```
@reboot /scripts/script.sh
```
## 19. Chuyển kết quả Cron sang tài khoản email được chỉ định.

Mặc định, cron gửi gửi kết quả tới user hiện tại khi cron được lập lịch chạy. Nếu bạn muốn chuyển nó tới một account khác, bạn có thể setup biến MAIL như dưới đây
```
crontab -l
MAIL=bob
0 2 * * * /script/backup.sh
```
## 20. Đưa tất cả các crons vào 1 tệp văn bản.

Các bạn nên giữ bản backup của toàn bộ job trên 1 file text. Việc này giúp bạn có thể khôi phục lại trong trường hợp xảy ra sự cố:

Kiểm tra cron đã lên lịch hiện tại:
```
crontab -l
MAIL=rahul
0 2 * * * /script/backup.sh
```
Sao lưu cron trên file txt:
```
crontab -l > cron-backup.txt
cat cron-backup.txt
MAIL=abc
0 2 * * * /script/backup.sh
```
## Xoá cron đã lên lịch hiện tại:
```
crontab -r
crontab -l
no crontab for root
```
Khôi phục cron từ file text:

```
crontab cron-backup.txt
crontab -l
MAIL=abc
0 2 * * * /script/backup.sh
```

# Kết luận
Sử dụng crontab rất thuận tiện cho chúng ta khi thực hiện 1 tác vụ nào đó theo một lịch cố định như xuất report, backup database, sourcecode ... Tuỳ vào từng bài toán trong sản phẩm của mỗi người chúng ta sẽ đưa crontab vào để giúp chúng ta làm 1 project hiệu quả và tốt nhất.

### Tham khảo
[https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/)