Nối tiếp bài trước hôm nay chúng ta sẽ tìm hiểu thêm một số kiến thức thường gặp khi làm việc với terminal.

# Shell là gì?
Trước tiên, chúng ta nhắc đến khái niệm `shell`.

Từ đầu đến giờ chúng ta mới chỉ nhắc đến cách chạy các lệnh mà chưa hiểu cách các lệnh chạy như thế nào.

![](https://images.viblo.asia/392a4d4b-fae0-459e-a57f-a9787069a14b.jpg)

Các bạn có thể nghe nhiều đến từ "nhân Linux", "nhân hệ điều hành", nhân hay kernel có nhiệm vụ là giao tiếp với hardware. Và nhân thì thường đi kèm với vỏ, ví dụ đập vỏ quả óc chó để ăn nhân bên trong :sweat_smile: Vỏ ở đây tức là shell, shell có nhiệm vụ là cầu nối giao tiếp giữa user và kernel. Do không cùng chung ngôn ngữ nên cần có 1 người thông dịch, shell chính là người làm việc đó, shell là 1 intepreter, thông dịch command từ input của user, chuyển đến kernel, và lấy ouput trả về hiển thị cho người dùng.

Có nhiều loại shell trong Linux nhưng thông dụng nhất có thể kể đến đó là `bash`, `zsh`, `fish`, `sh`...

# Các lệnh sinh ra ở đâu?
Trong Linux có thể kể đến các loại lệnh sau:
- Những **executable** program hay binary. Những lệnh này thường là những chương trình được viết bằng C or C++ hay Go... và được biên dịch thành file executable (file nhị phân - mã máy nên có thể thực thi trực tiếp, các bạn có thể quen thuộc với các file có đuôi `.exe` trên Windows, nhưng trên Linux thường thì không có đuôi cụ thể nào), hoặc là những script được viết bằng Bash, Ruby, Python, PHP... 
- Loại thứ hai gọi là **shell builtin**. Builtin commands là những lệnh do shell cung cấp. Ví dụ lệnh thường dùng `pwd`, `cd` là những shell builtin, giống như những cú pháp, function mà 1 ngôn ngữ lập trình cung cấp.
- Loại thứ 3 đó là **shell function**. Nó giống như những function thông thường trong lập trình, nhưng những function này là của shell do đó nó có thể thực thi được.
- Loại cuối cùng là **alias**, loại này được tạo thành từ những lệnh có sẵn khác bằng cách nhóm lại hoặc với 1 số tham số cố định. Chẳng hạn, khi dùng git chúng ta hay dùng lệnh `git status`, chúng ta có thể rút gọn lại bằng alias: `gst="git status"`, sau đấy thay vì gõ `git status` chúng ta có thể gõ lệnh `gst` thay thế

> Để kiểm tra, debug xem lệnh thuộc kiểu nào có thể dùng các lệnh sau: `type`, `which`
> VD: `type ls`, `which ls`, `type git`

## "Thêm" lệnh vào terminal như thế nào??
Từ các loại lệnh kể trên, thì chúng ta có thể có 3 cách để tạo ra lệnh:
- Tạo các executable program => Vấn đề là tạo ra rồi để file này ở đâu?
- Viết shell function => Viết ở đâu?
- Tạo alias => Viết ở đâu?

### Biến môi trường PATH
Khi làm với một số web framework như Rails, Laravel chúng ta hay gặp khái niệm *biến môi trường* hay *env*. Từ cái tên ta có thể đoán được ý nghĩa của nó: biến => có thể thay đổi, môi trường => phụ thuộc vào môi trường, tức là các giá trị phụ thuộc vào môi trường mà program, app chạy, nó ảnh hưởng đến hoạt động của program.

Ở đây có 1 biến môi trường mà có thể bạn biết lâu rồi đó `PATH`, giá trị của biến này chính là đường dẫn đến các thư mục chưa executable program. Ví dụ, khi bạn gõ lệnh `ls`, shell sẽ tìm trong các thư mục được chỉ định trong `PATH` xem có file nào tên là `ls` hay không, nếu có shell sẽ thực thi file đó. Những thư mục được khai báo trước sẽ được ưu tiên hơn.

### Khai báo biến môi trường
Giống như khi bạn làm việc với một số web framework, bạn sẽ khai báo biến môi trường vào file `.env`, sau đó khi ứng dụng được khởi chạy nó sẽ load file `.env` này và gán giá trị cho các biến môi trường.

Shell cũng hoạt động với cơ chế tương tự, mỗi loại shell sẽ đọc biến môi trường từ 1 file riêng biệt.

Đối với `bash` thì file đó là `.bashrc` ở thư mục home từ là `~/.bashrc`, với `zsh` là file `~/.zshrc`.
> Lưu ý: chạy lệnh `echo $0` đế biết terminal của bạn đang sử dụng shell nào

Để thêm hoặc sửa biến môi trường chúng ta thường thêm vào cuối những file này.

Ví dụ thêm 1 biến môi trường:
```bash
export MY_ENV=secret
# or
export MY_ENV="secret value"
```
> Lưu ý tên biến, dấu `=` và giá trị phải nằm liền nhau và không có dấu cách ở giữa.
>  Nếu value có dấu cách thì phải dùng `'` hoặc `"` để quote lại
> ```bash
> MY_VAR = value # Wrong
> MY_VAR = value has spaces # Wrong
> MY_VAR='value has spaces'
> MY_VAR="value of $OTHER_VAR"
> ```

Biến môi trường PATH mặc định của hệ thống thường sẽ có giá trị như thế này:
```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```
> Lưu ý: các thư mục được cách nhau bằng dấu `:` khác với Windows dùng dấu `;`
> => Các thư mục mặc định chứa executable file đó là `/usr/local/sbin`, `/usr/local/bin`, `/usr/sbin`, `/usr/bin`, `/sbin`, `/bin` theo thứ tự ưu tiên giảm giần. Chẳng hạn cả 2 thư mục `/usr/local/bin` và `/usr/bin` đều có file tên là `my_command`, nhưng do `/usr/local/bin` được khai báo trước nên shell sẽ sử dụng command `/usr/local/bin/my_command`.

Để thêm 1 thư mục vào PATH thì ta thêm vào file `~/.bashrc` hoặc `~/.zshrc`, chẳng hạn thêm thư mục bin của composer:
```bash
export PATH=/home/ubuntu/.composer/vendor/bin:$PATH
```
> **Lưu ý**: khi khai báo biết thì ta viết `MY_ENV=value` nhưng khi sử dụng biến thì ta phải tham chiếu qua tên `$MY_ENV`. Ví dụ chạy lệnh `echo $PATH` để kiểm tra những thư mục được đăng ký trong PATH.
> 
> Sau khi thay đổi file này thì bạn cần restart terminal hoặc dùng lệnh `source ~/.bashrc` để load lại config của shell.

#### Biến môi trường tạm thời
Ta cũng có thể khai báo biến môi trường tạm thời, tức là biến đó chỉ áp dụng khi chạy 1 câu lệnh:
```bash
MY_ENV_VAR=temporary_var php -r 'echo getenv("MY_ENV_VAR");' # Output: temporary_var
echo $MY_ENV_VAR # No value
```
Thử đoán xem kết quả của lệnh này là như thế nào nhé :D 
```bash
PATH='' ls
```

Hoặc ta cũng có thể khai báo biến môi trường mà giá trị của nó có phạm vi trong 1 phiên làm việc (session) bằng cách:
```bash
MY_SESSION_VAR=session_value
# OR
export MY_SESSION_VAR=session_value
```
Bạn có thể tham khảo thêm sự khác nhau giữa có `export` và không có `export` ở đây => https://stackoverflow.com/a/1158231/6595322

Qua các khái niệm trên ta có thể suy ra các cách "thêm lệnh" cho terminal như sau.

### Thêm thư mục vào PATH
Cách này dùng cho trường hợp thư mục đó chứa nhiều file executable.
```bash
/home/ubuntu/.composer/vendor/bin
├── phpcbf -> ../squizlabs/php_codesniffer/bin/phpcbf
└── phpcs -> ../squizlabs/php_codesniffer/bin/phpcs
```

### Tạo symbolic link
Hiểu nôm na là tạo shortcut đến file executable vào 1 trong các thư mục trong `PATH`.

Chẳng hạn ta có file [composer.phar](https://getcomposer.org/download/1.8.5/composer.phar) được tải về vào thư mục `~/Download/`, thay vì mỗi lần chạy cần phải `~/Download/composer.phar` thì chúng ta có thể tạo symbolic link vào thư mục `/usr/local/bin`:
```bash
sudo ln -s ~/Downloads/composer.phar /usr/local/bin/composer
```
Và sau đó khi cần dùng composer ta chỉ cần gõ `composer`

### Tạo alias
Giống như việc khai báo biến môi trường, `alias` cũng được khai báo trong các file `~/.bashrc`, `~/.zshrc`:
```bash
alias composer="~/Downloads/composer.phar"
```

### Tạo shell function
Lại giống như việc khai báo `alias`,  bạn cũng có thể khai `shell function` bên trong `~/.bashrc`, `~/.zshrc`:
```bash
function composer-install() {
  if [ ! -f composer.json ]; then
    composer init
  fi
  composer install
}
```
Cách này thường chỉ để custom những command có logic phức tạp, và cần nhiều kiến thức liên quan đến lập trình shell. Trong ví dụ trên là thực hiện khởi tạo composer nếu thư mục chưa có file composer.json và sau đó là thực hiện composer install.

### Tạo các file script từ PHP, Python, Sh
Thực chất file `composer.phar` nó cũng là 1 dạng file script được viết bằng PHP, bạn có thể mở file này vào có thể thấy nội dung phần đầu file như sau:

![](https://images.viblo.asia/7a350a1e-4757-4c3c-951e-d19f24587a96.png)

Dòng đầu tiên là 1 comment, nhưng nó cũng khá đặc biệt:
```bash
#!/usr/bin/env php
```
Shell xem dòng đặc biệt này (bắt đầu bằng `#!`) như một chỉ dẫn để thực thi nội dung file. Ví dụ, đoạn code ở trên chỉ dẫn cho shell nội dung của file này sẽ được thực thi bằng lệnh `/usr/bin/env php`, tức là khi ta chạy lệnh `./composer.phar` thì shell sẽ thông dịch ra là `/usr/bin/env php ./composer.phar`

Tương tự PHP, chúng ta có thể viết các script bằng các ngôn ngữ lập trình khác như Bash hay Python rồi sau đó thực hiện thêm thư mục vào `PATH`, tạo symbolic link hay tạo alias để tạo lệnh global cho terminal.
```bash
#!/usr/bin/env bash
echo 'Hello from Bash'
```
```python
#!/usr/bin/env python
print('Hello from Python')
```
# File ownership, permissions, sudo là cái chi?
Trong Linux các file đều có tính sở hữu (ownership), tức là mỗi file đều thuộc về 1 **owner** user và thuộc về 1 **group** và những user không sở hữu file này gọi là **others**. Các đối tượng này lại có quyền hạn (permissions) nhất định đối với file. Các quyền cơ bản bao gồm **read - r**, **write - w** và **execute - x** (thực thi).
- **r**: user có quyền đọc file, xem nội dung file
- **w**: user có quyền ghi file, sửa file
- **x**: user có quyền thực thi file tức là "chạy lệnh"

> Đến đây, ta thấy 1 điều kiện quan trọng để thực thi executable file đó là user (đang login vào hệ thống) phải có quyền **x** đối với file đó.

![](https://images.viblo.asia/f20c4d0e-ec77-4322-ac3d-b1553b7935ab.png)

Trong ví dụ trên, lệnh `ls -l` cho ta thông tin về owner và permission của file `/usr/local/bin/composer`:
- Owner: user `ubuntu` có cả 3 quyền `rwx`
- Group: các user thuộc nhóm `ubuntu` có cả 3 quyền `rwx`
- Others: các user khác chỉ có 2 quyền `r-x`, ký từ `-` xuất hiện ở vị trí thứ 2 tương ứng với không có quyền ghi **w**

![](https://images.viblo.asia/85d8a44d-836a-4c52-b1a9-ce848979febf.png)

Hoặc có thể xem bằng giao diện như trên.

Ngoài cách biểu diễn permission qua `rwx` ta có thể thể hiện thông qua số:
- 4: tương đương với quyền read **r**
- 2: tương đương với quyền write **w**
- 1: tương đương với quyền execute **x**
=> `rwx` <=> 4 + 2 + 1 = 7, `r-x` <=> 4 + 1 = 5, `rw-` <=> 4 + 2 = 6

Bạn có nhớ các hướng dẫn thường bảo bạn chạy lệnh `chmod 777 file_abc` không? Vậy 777 ở đây tức là cả **owner** user, các user trong **group** và các user **others** đều có quyền 7 tương ứng với **rwx**.
Hoặc 755 tương đương với **owner** => **rwx**, **group** => **r-x**, **others** => **r-x**

## Thay đổi permission
Dùng lệnh `chmod` để thay đổi quyền user, group và other đối với file, folder, sử dụng dấu `+` để thêm quyền, và dấu `-` để xóa quyền. Ví dụ:
```
chmod u+x my_script
```
=> Thêm quyền thực thi `x` cho user owner
```
chmod u-x my_script
```
=> Xóa quyền thực thi `x` của user owner
```
chmod ug+rwx my_script
```
=> Thêm quyền `rwx` cho user owner và group

Tương tự ta có `g` đại diện cho group, `o` đại diện cho other, và `a` đại diện cho tất cả user. Bạn đoán được kết quả của những lệnh sau chứ.
```
chmod a+x my_script
chmod a+rx my_script
chmod uo+rw-x my_script
```

Một cách dùng khác của `chmod` đó là sử dụng số:
```
chmod 777 my_script
chmod 755 my_script
chmod 664 my_script
```

## Thay đổi owner và group
Ta cũng có thể thay đổi owner và group của 1 file.

Thay đổi owner:
```
sudo chown patty myfile
```
=> Thay đổi owner của `myfile` sang cho user `patty`.

Thay đổi group:
```
sudo chgrp whales myfile
```
=> Thay đổi group của `myfile` sang group `whales`

Hoặc ta cũng có thể thay đổi owner và group cùng 1 lúc:
```
sudo chown patty:whales myfile
```

Mỗi user và group đều được gắn với 1 ID, chúng ta có thể sử dụng ID để thay cho user name, group name.
```
sudo chown 1000:1000 myfile
```
> Để xem ID của user ta dùng lệnh `id <tên_user>` hoặc `id` là mặc định cho user đang login hoặc thông qua các biến môi trường `$UID`, `$GID`, `$USER`
> ```
> sudo chown $UID:$GID otherfile
> ```
> 
## SUDO
![](https://images.viblo.asia/76559af6-19fe-4052-8ea6-711525bfae41.png)

`sudo` có thể tạm dịch là *superuser do*.
Chắc hẳn bạn đã gặp các trường hợp lỗi "Permission denied", nguyên nhân là do bạn thao tác trên các file mà bạn không có quyền. Và cách giải quyết duy nhất đó là yêu cầu quyền trên các file đó.

Nếu bạn prefix các command với tiền tố `sudo ` thì command đó sẽ được thực thi dưới quyền cao cấp. Các quyền này là bắt buộc nếu bạn muốn thực hiện một số task liên quan đến hệ thống, chẳng hạn bạn muốn cài LAMP stack, bạn phải restart  server sau khi thay đổi file config, chạy docker, thay đổi owner, permission của file thuộc user khác,... hoặc thậm chí là tác vụ shudown hoặc reboot máy.

Khi chạy lệnh với `sudo` lần đầu nó sẽ hỏi password của user đang thực hiện, nhớ là password của user hiện tại chứ không phải password của user root. Password sẽ được ghi nhớ trong 15 phút giúp bạn không phải nhập lại password nhiều lần.

Nên nhớ là chỉ khi thực hiện thao tác với những file mà user hiện tại không có quyền, nếu đang ở thư mục home của user thì tất tiên mặc định là không cần `sudo`.

Vấn đề là đã phân quyền rồi lại có thêm `sudo` để làm gì, nếu user nào cũng có thể chạy sudo thì phân quyền để làm gì nữa? Tất nhiên là không phải user nào cũng có quyền sử dụng `sudo`. Những user có quyền sử dụng `sudo` được khai báo trong file `/etc/sudoers`, và mặc định là các user thuộc group **sudo** có thể thực thi lệnh `sudo`:

![](https://images.viblo.asia/db479b8e-5337-46f0-a316-a04e5846aab3.png)

> TIPS: khi nhập password trên terminal thì sẽ không có hiện tượng gì xảy ra trên terminal (chẳng hạn khi nhập password trên web form thì nó sẽ hiển thị các dấu chấm đen thay thế), có thể gây khó khăn khi sử dụng. Tuy nhiên điều này có thể thay đổi để cho terminal hiển thị dấu * khi nhập password bằng cách sửa config trong file `/etc/sudoers` thông qua lệnh `visudo`:
> ```
> sudo visudo
> ```
> Và thay đổi:
> ```
> Defaults        env_reset
> ```
> Thành:
> ```
> Defaults        env_reset,pwfeedback
> ```
> 
> ![](https://images.viblo.asia/aaaace3b-a149-4824-89d3-5b1a47c77db7.png)
> 

# Summary
Nội dung của phần này xin được tạm dừng tại đây :D hy vọng các bạn có thêm 1 chút kiến thức để tự tin làm việc với command line hơn.

Theo dự định thì mình sẽ viết về một số vấn đề sau:
* Cài đặt phần mềm
* SSH
* Chuyển hướng nhập xuất stdin, stdout
* Nén và giải nén file
* Checksum file là gì và để làm gì?
* Lập trình shell script
* Text processing
* Process management
* Service management (SysV, Upstart, systemd)
* ...

Nhưng thôi mình để cho ai có hứng thú thì tự tìm hiểu thêm :D 

Dưới đây là slide mình làm để tổng kết một số kiến thức cơ bản về command line. Rất mong sự góp ý của các bạn.

{@googleslide: https://docs.google.com/presentation/d/1RWFdXg19UZserquLSOjOHumfgIPZ5J-kVQzDcOUMrqA/edit?usp=sharing}

Reference:
- https://linuxjourney.com/
- https://www.shellscript.sh/
- https://www.youtube.com/watch?v=D-VqgvBMV7g