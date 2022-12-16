# Mở đầu
- Tiếp tục là mình đây, sau khi viết xong bài [DC-3 Walkthrough - Cuộc phiêu lưu kỳ thú](https://viblo.asia/p/dc-3-walkthrough-cuoc-phieu-luu-y-thu-gAm5yXeEldb) thì mình lại build lên lab nữa cho nhóm thử sức xem sao. Cụ thể là lab [DC-2](http://www.five86.com/dc-2.html).
- Bài này có tất cả là 5 cờ, tính cả cờ cuối. Chúng ta phải tìm đủ 5 cờ đó mới hoàn thành bài lab này. Mọi người theo mình nhé.
## Tấn công
- Vẫn như các bài khác, đầu tiên mình phải dùng `nmap` quét tất cả các IP trong dải mạng của mình để tìm ra IP của lab. 
- Sau khi xác định được địa chỉ IP rồi, tiếp tục cần xác định xem hệ điều hành, quét các tập lệnh, ... bằng lệnh `-A` trong `nmap`

    ![](https://images.viblo.asia/92ed8f83-0d4c-432e-acdc-0b3e2f3483a9.png)

- Do đây là 1 CMS nên mình phải ném nó vào hosts thì mới chạy lên được. Mở file hosts lên vào thêm dòng `192.168.19.62 dc-2` vào. Mở trình duyệt chạy `http://dc-2` ta được 1 con web như này.

    ![](https://images.viblo.asia/5d841810-97a2-4783-96ba-71d6e7e32cdc.png)

- Theo thói quen, xác định con này chạy bằng cái gì đã, mở `Wappalyzer` lên thì biết con web này chạy bằng `WordPress`.
- Có `flag` kìa, bấm vào coi sao. Đây là một hint của bài thôi. 

    ![](https://images.viblo.asia/6c51eda6-26da-4070-b808-7825b9d8fba0.png)

- Nó có nhắc đến `cewl`, đây là 1 tool trên kali tạo list mật khẩu thôi. Chắc là sử dụng cái này, chạy nó lên thôi :D.
   
   ```bash
    cewl -w crack.txt http://dc-2
    ```
    
- Do con web này chạy bằng WordPress nên sử dụng `WPScan` trên Kali luôn.
    
    ```bash
    wpscan --url http://dc-2 --passwords crack.txt 
    ```
    
- Ui con web này lắm lỗi quá, bắn ra một đống CVE với cái phiên bản của nó. Điều chúng ta quan tâm là đây nè :D

    ![](https://images.viblo.asia/ea0a3194-a0c8-49db-b4aa-b1b50a8bcb3b.png)

- Bắt được 1 con mèo và 1 con chuột
    
    ```bash
     | Username: jerry, Password: adipiscing
     | Username: tom, Password: parturient
    ```
    
- Có user và pass rồi, đăng nhập vào thôi. Vào `http://dc-2/wp-admin/` đăng nhập tài khoản jerry xem có gì k.
- Loay hoay một hồi thì thấy cái `flag 2` được để trong `Pages`. Nội dung thì là như này.

    ![](https://images.viblo.asia/20771743-8ec4-46f5-a83e-b2b495510d85.png)

- Có một cách khác nhanh hơn à (suynghi). Lần mò lần mò mãi, xong quét thử full port xem có cái gì đang mở k. 

    ![](https://images.viblo.asia/3d26bb0f-85ab-4e4b-9d62-602249406b83.png)

- Cổng 7744 ssh đang mở kìa (ngacnhien). :laughing::laughing:. SSH tới thôi chứ còn làm gì nữa.
- `ssh jerry@192.168.19.62 -p 7744` rồi nhập mật khẩu của `jerry` vô. Không được, chẳng lẽ nhập sai ở đâu. Thử với thằng `tom` xem sao. Được luôn này. 

    ![](https://images.viblo.asia/baf2840b-7228-4861-8655-3c2136d8e883.png)

- Vào được thằng `tom`, `ls` phát thì thấy `flag3.txt`. Nội dung thì là như này
    
    ```
    Poor old Tom is always running after Jerry. Perhaps he should su for all the stress he causes.
    ```
    
- Nghịch ngợm một lúc thì thấy thằng `tom` này có mỗi mấy cái quyền này thôi
   
   ```bash
    tom@DC-2:~$ ls /home/tom/usr/bin
    less  ls  scp  vi
    ```
    
- `Export` phát xem thế nào. Giờ phải sửa được thằng `PATH` để lấy thêm quyền, chứ bằng kia không đủ.
- Nhớ ở đâu mình đọc được thằng `vi` có thể up shell lên được, vào thằng `vi` set phát xem nào.
  
  ```bash
    vi
    :set shell=/bin/bash
    :shell
    ```
    
- Á ngon, chạy này. `cd` phát xem có trầm trồ không nào. 

    ![](https://images.viblo.asia/b8a70af7-e181-4468-87b9-0e21e995b91b.png)

    ```bash
    tom@DC-2:/home$ export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    ```
    
- Sửa thằng `PATH` cái đã để lấy thêm lệnh =))
- Được rồi. Ấm rồi, cơ mà loay hoay một hồi cũng chả biết làm gì, switch thử sang thằng `jerry` xem được k.
- Ngon, vào được thằng `jerry` rồi. Đọc được `flag4.txt`. Hint tiếp đây rồi, đọc xem có gì nào.
    
    ```bash
    Good to see that you've made it this far - but you're not home yet.

    You still need to get the final flag (the only flag that really counts!!!).

    No hints here - you're on your own now.  :-)

    Go on - git outta here!!!!
    ```
    
- Còn cái cờ final thôi :D

    ![](https://images.viblo.asia/5cbbaec4-bc0f-4234-aee1-4311433bb74d.png)

- Có 1 chương trình đang chạy quyền root mà k cần mật khẩu root là thằng `git`.
- Loay hoay chán chê chẳng biết khai thác thằng này kiểu gì để lấy quyền root :sob::sob::sob::sob:. 

    ![](https://images.viblo.asia/bed71f3d-a31e-47d3-8c9f-a474051323f7.png)

- Bing boong, lấy được quyền root rồi. Đọc help của git thì có 1 cái gọi là phân trang -p. Khi mà mình gõ `sudo git -p --help` thì nó sẽ đọc theo trang. Do cái help nó dài nên đọc k hết trong 1 khung của terminal. Lợi dụng điểm yếu đó, mình gõ `!/bin/bash` vào và lấy được quyền root thôi :D
## Tổng kết
- Bài xàm xàm của mình kết thúc ở đây, mình cũng học được rất nhiều điều từ bài lab này. Mong các bạn đọc có gì cần góp ý cho mình hoặc bạn nào có cách làm khác hơn có thể comment bên dưới giúp mình để mình phát triển hơn. Cảm ơn tất cả các bạn đã đọc bài này của mình :D