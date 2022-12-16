# Mở đầu
"Là một System Admin thì chắc chắn phải biết viết Bash Script" đó là câu nói của anh trong team nói với mình khi mình đi thực tập, lúc đầu mình cũng nghe cho biết vậy thôi, tuy nhiên đến khi đụng vào viết thử thì thực sự mình cảm nhận được cái hay và tiện dụng của việc viết bash script. Trong bài này mình sẽ chỉ ra Bash Script là gì và có thử viết 1 Bash Script cơ bản mà trong thực tế chẳng ai dùng.

# Bash Script là gì?
Nếu tìm kiếm trên mạng thì các bạn sẽ có rất nhiều các định nghĩa mang tính khái quát cao và nhiều từ ngữ khó hiểu cho người mới như:  "ngôn ngữ kịch bản",... Tuy nhiên để hiểu một cách đơn giản và dễ hình dung nhất thì Bash Script là 1 file tập hợp các command được thực hiện 1 cách lần lượt. 

Ví dụ để cài 1 phần mềm A thì chúng ta phải gõ các lệnh như `apt update => apt install => systemctl start => ...` thì ta có thể viết hết tất cả các lệnh này vào 1 file bash script và chạy để lần lượt thực hiện hết các lệnh.

![](https://images.viblo.asia/1fcb6481-696f-4dc9-a227-d95a3b4bd607.png)


## Ưu điểm
* Đặc biệt tiết kiệm thời gian cho các tác vụ phải lặp lại nhiều lần.
* Thực hiện các công việc mang tính logic cao nhờ các vòng lặp for, câu điều kiện if else,....
* Hạn chế lỗi, sai sót trong công việc.
* Thực hiện các công việc lặp đi lặp lại vào các thời điểm nhất định nhờ corntab hoặc chạy như 1 service.

## Nhược điểm
* Cấu trúc riêng mình thấy hơi dị, khó nhớ, mới viết chắc chắn sẽ viết sai cứ pháp rất nhiều.

# Tấn công Denial of service (DoS)
Trong bài viết này chúng ta sẽ thực hành viết 1 Bash Script để ngăn chặn cuộc tấn công DoS. Giải thích nhanh thì DoS là các cuộc tấn công vào các máy chủ dịch vụ làm cạn kiện tài nguyên CPU, Network, Ram,... từ 1 nguồn ở đây là 1 IP. 

Nhiều bạn sẽ dễ bị nhầm lẫn giữa DoS và DDoS, cả 2 hình thức tấn công này đều là Denial of service (từ chối dịch vụ) tuy nhiên DDoS (Distributed Denial of Service) mang tính chất nguy hiểm hơn vì nguồn tấn công đến từ nhiều nguồn khác nhau, phân tán (Distributed) nên khó ngăn chặn hơn.
![](https://images.viblo.asia/f25c0968-71c1-43a4-b984-7afb36c9827a.jpg)


# Viết Bash Script 
Ý tưởng cơ bản sẽ như thế này: Mình sẽ lấy ra IP từ 1000 dòng log gần nhất trong Access Log của Apache và đếm tần suất xuất hiện của 1 IP là nhiều hay ít từ đấy dùng iptables để block IP có dấu hiệu tấn công. Khá đơn giản đúng không nào :) Vậy cùng bắt đầu nhé!

Đầu tiên, ta khai báo 2 biến Global là **file** lưu địa chỉ đến Apache Access Log file và **tmplogfile** để lưu địa chỉ đến file tách riêng ra 1000 IP trong 1000 request gần nhất của Apache.
```
#! /bin/bash

file='/var/log/apache2/access.log'
tmplogfile='/root/tmp.txt'

# Lay IP tu Apache access log
tail -fn 1000 $file | head -n 1000 | cut -d " " -f 1 > $tmplogfile
```

 Trong file **tmp.txt** sẽ có dạng:

```
103.23.52.153
103.23.52.153
103.23.52.153
103.23.52.153
103.23.52.153
34.54.62.111
34.54.62.111
34.54.62.111
34.54.62.111
103.23.52.153
```
 Tiếp theo ta khai báo các mảng Array để lưu các IP:
 
 Mảng **ip_array** sẽ lưu 1000 IP chứa trong 1000 dòng access log gần nhất
 
 Mảng  **ip_array_min** sẽ lưu các IP trong 1000 IP (không trùng lặp)
 
 Mảng **ip_black** sẽ lưu các IP vi phạm điều luật 
 
 
```
 #Day IP vao array
declare ip_array       # Array luu cac ip lay tu trong apache access log
declare ip_array_min    # Array luu cac ip khong trung lap lay tu ip_array
declare ip_black        # Array luu cac ip vi pham rule
```

Tiếp tục, ta đẩy 1000 IP có trong **tmplogfile** và mảng ip_array với câu lệnh

```
# them cac ip co trong access log vao Array ip_array
while read -r line;
do
        ip_array+=($line)
done < $tmplogfile
```

Sau đó ta trích xuất ra các IP trong **ip_array** vào **ip_array_min** với điều kiện không trùng lặp

```
# Trich xuat IP khong trung lap vao ip_array_min
for ip1 in "${ip_array[@]}"
do
        add=1
        for ip2 in "${ip_array_min[@]}"
        do
                if [[ $ip1 == $ip2 ]]
                then
                        add=0
                        break
                fi
        done
        if [[ $add -eq 1 ]]
        then
                ip_array_min+=($ip1)
        fi
done
```

Cuối cùng, ta sẽ kiểm tra xem IP nào có lượng request cao, cụ thể ở đây IP nào có 700 request trên 1000 request gần nhất sẽ vi phạm điều luật và tiến hành block bằng công cụ iptables:

```
# Tim kiem IP vi pham luat them vao ip_black
for ip1 in "${ip_array_min[@]}"
do
        count=1
        for ip2 in "${ip_array[@]}"
        do
		if [[ $ip1 == $ip2 ]]
                then
                        ((count++))
                fi
        done
        if [[ $count -gt 700 ]]
        then
                ip_black+=($ip1)
        fi
done
echo "IP vi pham dieu luat: ${ip_black[*]}"
iptables -I INPUT -s ${ip_black[*]} -p tcp --dport 80 -j DROP
```

File hoàn thiện sẽ như sau: 
```
#! /bin/bash

file='/var/log/apache2/access.log'
tmplogfile='/root/tmp.txt'

# Lay IP tu Apache access log
tail -fn 1000 $file | head -n 1000 | cut -d " " -f 1 > $tmplogfile

# Day IP vao array
declare ip_array       # Array luu cac ip lay tu trong apache access log
declare ip_array_min    # Array luu cac ip khong trung lap lay tu ip_array
declare ip_black        # Array luu cac ip vi pham rule

# them cac ip co trong access log vao Array ip_array
while read -r line;
do
        ip_array+=($line)
done < $tmplogfile

# Trich xuat IP khong trung lap vao ip_array_min
for ip1 in "${ip_array[@]}"
do
        add=1
        for ip2 in "${ip_array_min[@]}"
        do
                if [[ $ip1 == $ip2 ]]
                then
                        add=0
                        break
                fi
        done
        if [[ $add -eq 1 ]]
        then
                ip_array_min+=($ip1)
        fi
done
#echo "${ip_array_min[*]}"

# Tim kiem IP vi pham luat them vao ip_black
for ip1 in "${ip_array_min[@]}"
do
        count=1
        for ip2 in "${ip_array[@]}"
        do
		if [[ $ip1 == $ip2 ]]
                then
                        ((count++))
                fi
        done
        if [[ $count -gt 700 ]]
        then
                ip_black+=($ip1)
        fi
done
echo "${ip_black[*]}"
iptables -I INPUT -s ${ip_black[*]} -p tcp --dport 80 -j DROP
```

# Cài đặt corntab để chạy Bash Script định kỳ
Lưu file lại với tên antiDos.sh, bạn có thể chạy thử với lệnh `bash antiDos.sh` hoặc `./antiDos.sh`. 

Truy cập sửa file `/etc/crontab` để cấu hình chạy file bash script mỗi 2 phút.

```
*/2 * * * * root bash /root/antiDos.sh
```
![](https://images.viblo.asia/9d106ecf-d5f1-425c-86b4-740c862cd205.PNG)

Ngay sau khi lưu lại Bash Script sẽ tự động chạy mỗi 2 phút, ngoài ra thì bạn cũng có thể cho Bash Script chạy như 1 service, tìm hiểu thêm ở đây [Run Shell script as systemd service.](https://tecadmin.net/run-shell-script-as-systemd-service/)

# Kết

Bash Script này chỉ có mục đích tập tành viết cho vui chứ chắc chẳng có cơ hội áp dụng được vào thực tế đâu :). Mong rằng các bạn học được thêm 1 ít kiến thức hay ho. Have a nice day!

# Tham khảo 
https://linuxhint.com/30_bash_script_examples/

https://stackoverflow.com/