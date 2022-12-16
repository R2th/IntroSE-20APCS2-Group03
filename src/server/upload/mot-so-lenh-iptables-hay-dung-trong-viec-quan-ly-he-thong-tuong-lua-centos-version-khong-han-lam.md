**Iptables** là một hệ thống tường lửa (Firewall) tiêu chuẩn được cấu hình, tích hợp mặc định trong hầu hết các bản phân phối của hệ điều hành Linux (CentOS, Ubuntu…). **Iptables** hoạt động dựa trên việc phân loại và thực thi các package ra/vào theo các quy tắc được thiết lập từ trước.

![](https://images.viblo.asia/e5b8af34-8edf-4256-88c5-2e58b0892350.jpg)

Trong bài này, mình sẽ hướng dẫn một số lệnh đơn giản để sử dụng Iptables, bạn có thể tự thiết lập VPS CentOS firewall cho riêng mình, cũng như mở port theo nhu cầu.

## Kiểm tra Iptables đã được cài đặt trong hệ thống
Trước tiên, cần kiểm tra CentOS đã cài đặt Iptables chưa bằng lệnh:
`rpm -q iptables` hoặc `iptables --version`

Nó sẽ ra kết quả như này:
```
iptables-1.4.7-16.el6.x86_64
hoặc
iptables v1.4.7
```
## Disabling/uninstalling FirewallD
Suýt nữa thì quên, **CentOS 7** sử dụng **FirewallD** làm tường lửa mặc định thay vì Iptables. Nếu bạn muốn sử dụng **Iptables** thì mần lệnh này:

```
systemctl mask firewalld
systemctl enable iptables
systemctl enable ip6tables
systemctl stop firewalld
systemctl start iptables
systemctl start ip6tables
```
Hoặc thích thì xóa luôn firewalld khỏi CentOS cho rảnh nợ:

`yum remove -y firewalld`
## install/activate IPTables
Họa may **iptables** chưa được install trong CentOS thì làm thế nào ?

Đơn giản, chỉ cần chạy:
```
yum install -y iptables-services // install iptables-services thôi
systemctl start iptables // Start iptables cho nó chạy êm xuôi trên centos
```

## Configure IPTables to start automatically at boot time
À còn nữa, nếu muốn hệ điều hành tự bật lại **iptables** khi khởi động (reboot) lại, thì nhớ chạy lệnh này 1 lần duy nhất trong đời nhé:

`systemctl enable iptables`

Phần trên (cách 2 mục) có nhắc tới rồi, nhưng note lại ở đây để các bạn hiểu rõ nó là cái gì, sao lại tồn tại :D 

## Check tình trạng Iptables
Tới đây, nhìn xuống, chắc có lẻ bạn đoán được 4 lệnh dưới làm gì rồi đúng không?

Đơn giản là check status, start, stop, restart iptables. Những lệnh này nên thuộc lòng nhé, vì sẽ dùng hơi bị nhiều đấy ;)

```
service iptables status
service iptables start
service iptables stop
service iptables restart
```
# PHÍA DƯỚI LÀ NHỮNG LỆNH KHÁ QUAN ĐÂY RỒI :D

## Cho phép truy cập vào webserver qua port mặc định 80 và 443
Đây xem như là ví dụ cơ bản cho các bạn, để truy cập vào 1 trang web từ bên ngoài, bạn phải mở port thường là 80 (http), và 443 (https):
```
iptables -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp -m tcp --dport 443 -j ACCEPT
```
Để mở những port khác, chỉ cần thay số **80** hoặc **443** ở trên với port mà các bạn mong muốn

Ví dụ: Port mặc định tomcat: 8080, postgres: 5432, mysql: 3306, openlitespeed: 6379. Cần phải mở tất cả các port này thì bên ngoài mới truy cập được vào service bên trong server, mới thông nhau một cách trơn tru nhất :D
> **Lưu ý:** Mỗi dòng như kia sau khi được thêm gọi là 1 **RULE**

## Xóa tất cả các rule
Tiếp đến, muốn thẳng tay xóa hết các rule đã được thêm thì làm như nào:

`iptables -F`
							
## Xóa rule ở dòng thứ 2
Chỉ muốn xóa rule ở **dòng thứ 2** thì phải làm sao:

`iptables -D INPUT 2`

Ủa vậy rule ở dòng thứ 2 là cái gì, port nào, làm sao "tao" nhớ được hả thằng "cún"?
## Xem danh sách rule
Đây này, xem thử trên server đã thêm những rule gì, port nào được accept ở dòng thứ mấy, đều hiện ra cả khi chạy lệnh dưới:

`iptables -L -n --line-numbers`

# Cuối cùng, cần lưu lại các thiết lập tường lửa Iptables (nếu không các thiết lập sẽ mất khi bạn reboot hệ thống)
## Cấu hình được lưu tại /etc/sysconfig/iptables
Chạy lệnh bên dưới để lưu lại danh sách rule đã được thêm:

`/usr/libexec/iptables/iptables.init save`
## Xem rule được lưu
Nếu bạn hay bị quên do tuổi già, sinh lý yếu, hãy nhớ dòng này mà chạy: `cat /etc/sysconfig/iptables`

**Cat** 1 phát mà ra 1 list các rule với các port bạn thấy quen quen là OK nhé ;)
## Reload IPTables
Cuối cùng, đừng quên chạy lệnh reload này sau khi lưu các rule nhé:
`systemctl reload iptables`

# !!!

Xong rồi đấy! Thực ra còn nhiều lệnh nữa, nhưng mình nghĩ đó là những lệnh hay dùng sẽ cần cho các bạn (Mình cũng chỉ dùng chừng ấy thôi :D)

Hẹn gặp lại bạn vào bài viết tới ;)

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)