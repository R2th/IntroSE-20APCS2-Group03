# Mở đầu 
Bài này theo mình đánh giá khá là dễ dành cho người mới bắt đầu
# Write-up
## Recon 
`nmap -A -p- 10.0.1.11 -o nmap`

![](https://images.viblo.asia/cb7c46e8-11ff-4be7-88f6-d8c65850b3ac.PNG)

Quét được 3 cổng đang mở là: 22, 80, 33060. Nhìn vào kết quả nmap thì biết cổng 80 đang chạy Wordpress. Mình dùng wpscan để quét xem có gì thú vị không 

`wpscan --url http://10.0.1.11`

Sau khi quét thì mình không tìm thấy được nhiều thông tin nào có ích ngoài file **robots.txt**. Truy cập vào file robots.txt ta tìm thấy được 1 file secret.txt

![](https://images.viblo.asia/06eeff8b-ab9a-43ee-a212-469149688d15.PNG)

Nhìn file này mình đoán nội dung đã dùng base64 để encode.  Khi decode thì ta sẽ được một file có nội dung giống ssh key, việc tiếp theo cần làm là tìm tên user để dùng với file ssh key. Quay lại Wordpress thì ta tìm được user 
![](https://images.viblo.asia/d60666d7-3e1e-4074-aec2-f0e3aa98337c.PNG)
## Exploit 
### Oscp
Sau khi có tên user và file ssh key thì ta có được shell đầu tiên
![](https://images.viblo.asia/7fcae78d-30ec-4a8c-8398-5a8f11d00c0e.PNG)
### Root
 Bài này ta có 2 hướng để lên root mình sẽ trình bày từng cách một:
#### lxd
Chi tiết cách sử dụng lxd để leo quyền đã được trình bày ở [đây](https://book.hacktricks.xyz/linux-unix/privilege-escalation/interesting-groups-linux-pe/lxd-privilege-escalation) nên mình sẽ không nói lại. Việc khó nhất ở đây là bạn phải tìm được đường dẫn đến file lxd 
#### bash
Dùng lệnh `find / 2>/dev/null -perm -u=s ` thì ta sẽ tìm được file bash có SUID và bạn chỉ việc thêm option -p để giữ lại quyền root

![](https://images.viblo.asia/059dd161-a1f5-4773-81db-fa3007cf996c.PNG)

# Conclusion
Đây là một bài khá dễ dành cho các bạn mới bắt đầu như mình. Cảm ơn các bạn đã đọc