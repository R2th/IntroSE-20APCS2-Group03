> Từ khi những chiếc máy tính trở nên phổ biến thì luôn có những cuộc battle nảy lửa diễn ra giữa các luồng quan điểm khác nhau về cách sử dụng máy tính như Window hay OSX, GUI/TUI hay CLI, Vim hay Emacs... Và cuộc chiến mà mình đã tham gia gõ phím nhiều nhất trên các mặt trận Reddit, Facebook.. đó chính là trận siêu kinh điển giữa GUI và CLI (dùng giao diện vs dùng command line), mình không rõ hiện giờ phe nào đang áp đảo, nhưng sau trận chiến mình đã trở thành một người yêu thích sử dụng CLI hơn hẳn GUI (với những việc mà mình có thể tối ưu GUI bằng CLI thôi nha 🤣🤣).  Và bài viết này sẽ trình bày một số kỹ thuật với CLI mà mình may mắn học được để giúp quá trình làm việc với terminal trở nên thú vị, bớt nhàm chán hơn.

##  Intro
Unfollow crush với Linux.
{@embed: https://www.youtube.com/watch?v=ITgse17hDBA}

## 1. Quickly edit current command
Giữ `CTRL`, nhấn phím `x` rồi nhấn phím `e`. Thao tác này sẽ mở ra editor mặc định (echo `$EDITOR` | `$VISUAL` để kiểm tra) chứa sẵn
câu lệnh mà bạn đang gõ trên terminal như đã được miêu tả trong `man` page:

> edit-and-execute-command (C-xC-e)
> 
> Invoke  an  editor  on the current command line, and execute the
result as shell commands.   Bash  attempts  to  invoke  $VISUAL,
$EDITOR, and emacs as the editor, in that order.

Phím tắt này đặc biệt hữu ích trong trường hợp câu lệnh của bạn có độ dài từ vài dòng trở lên và tương đối tốn thời gian để chỉnh sửa ngay trên terminal bởi vì thư viện [GNU Readline](https://en.wikipedia.org/wiki/GNU_Readline) mà `bash` sử dụng cho việc line-editing, bao gồm việc di chuyển con trỏ chuột, chỉnh sửa câu lệnh, `tab completion`, `command history`...
có một hạn chế là thư viện này chỉ hỗ trợ việc tương tác sử dụng bàn phím cho nên khi bạn muốn chỉnh sửa câu lệnh tại
một vị trí bất kì thì bạn không thể di chuột đến đó rồi click để thay đổi vị trí như trên những môi trường khác được mà bạn phải dí liên tục vào các phím mũi tên để có thể di chuyển một cách chậm chạp mà thôi.
Mình không biết vì sao hạn chế của `GNU Realine` chưa được khắc phục (?) nhưng đó cũng là lý do mà có rất nhiều công cụ ra đời
chỉ với một mục đích duy nhất là làm cho việc edit câu lệnh được nhanh chóng hơn.

Khi bạn sử dụng tổ hợp phím tắt này thì hãy chú ý rằng, nếu bạn không lưu lại và thoát ra, thì câu lệnh sẽ được thực thi ngay lập tức, điều này có thể gây ảnh hưởng lớn 
khi bạn đang thực hiện một số tác vụ cần sự cẩn trọng như là `rm -rf /path/to/file`.

Nếu default editor của bạn là *vim* thì bạn có thể dùng câu lệnh `:cq` để thoát ra khỏi editor an toàn bởi vì `:cq` trả về exit status khác 0, ám chỉ rằng, việc chỉnh sửa thất bại và `bash` sẽ không thực thi câu lệnh hiện tại nữa.

> Khi mỗi câu lệnh được thực thi thì đều trả về exit status. Thông thường thì **0** ứng với xử lý thành công, còn **1** trở lên ứng với xử lý thất bại.
> 

Bạn có thể xem demo ở [đây](https://terminalizer.com/view/d55f89105066).

## 2. Quickly edit last command  (Fix Command)

`fc` là một câu lệnh tích hợp sẵn khi cài `bash` và được dùng để chỉnh sửa câu lệnh đã thực thi gần nhất với default editor có sẵn của bạn.

Ngoài ra với câu lệnh này bạn có thể xem thời điểm mà những câu lệnh đã được thực hiện trước đó như sau:
```
 fc -lf

 3087  5/25/2021 23:10  trash service
 3088  5/25/2021 23:11  trash tlp
 3089  5/25/2021 23:11  cd thinkpad-power-config
 3090  5/25/2021 23:11  vi powertop.service
 3091  5/25/2021 23:14  tlp-stat -c
 3092  5/25/2021 23:16  curl -sSL https://install.pi-hole.net | bash\n
 3093  5/25/2021 23:17  sudo curl -sSL https://install.pi-hole.net | bash\n
```

Xem thêm về fc command ở [đây](https://shapeshed.com/unix-fc/).

## 3. Repeat last command

Có những lúc bạn quên thêm `sudo` vào phía trước câu lệnh nhưng nhỡ thực thi rồi thì có thể nhanh chóng thực hiện lại bằng cách này nhé:
```
sudo !!
```

## 4. Repeat previous command start with specific prefix
Thực thi lại câu lệnh gần nhất bắt đầu với **ls**
```shell
!ls
```

## 5. Retain last argument
Giả sử bạn đang xem 500 dòng cuối cùng của file `logbasex-v2020-06-30.txt` theo thời gian thực
```
tail -fn500 logs/logbasex-v2020-06-30.txt
```
Bạn có thể dễ dàng thay thế `tail` bằng `cat` command mà vẫn giữ nguyên được tham số cuối cùng bằng câu lệnh sau:

```
cat !$
cat logs/logbasex-v2020-06-30.txt
```

## 6. Paste last argument of previous command(s)
```
alt + .
```

Bạn có thể lặp lại câu lệnh này để lấy được tham số cuối cùng của nhiều câu lệnh trước đó nữa chứ không chỉ dừng lại ở câu lệnh gần nhất.

## 7. Paste **N**th argument of previous command(s)
```
alt-<n>-alt-.
```

## 8. Fix typo in command using [thefuck](https://github.com/nvbn/thefuck#installation)
Lỗi typo à? 

![](https://raw.githubusercontent.com/nvbn/thefuck/master/example.gif)

## 9. Quickly create an empty file / clear content of file

Đến lúc mà việc dùng câu lệnh `touch` dùng để tạo file là không cần thiết.
```

# bash
>file.extension
cat /dev/null > file.extension

# zsh
cat /dev/null >! file.extension
```

## 10. Recover the overwritten file
Nếu bạn có nhỡ tay xóa nội dung của tập tin nào quan trọng bằng những câu lệnh phía trên thì bạn vẫn có thể lấy lại được bằng cách sau:
```
CURRENT_FILE_SYSTEM=$(mount | grep $(df -P . | tail -n 1 | awk '{print $1}') | awk -F' ' '{print $1}')
sudo grep -i -a -B100 -A100 '<your-unique-string-in-file>' $CURRENT_FILE_SYSTEM | strings > /var/tmp/my-recovered-file

## strings command: get text inside a binary or data file.
## tập tin my-recovered-file sẽ có nhiều thông tin lộn xộn ngoài những thông tin bạn cần, nhớ lọc ra nhé.
```

## 11. Remove all but one specific file
Bạn sẽ có nhiều cách làm việc này nhưng ở đây mình muốn giới thiệu một kĩ thuật gọi là `extended globbing` (`extglob`), có thể hiểu như một dạng `pattern matching` nhưng không phải dành cho văn bản như `regex` mà là dành cho tập tin, đường dẫn và thư mục... sử dụng các ký tự đại diện (wildcard).
Gõ `man bash` để xem hướng dẫn:
```
?(pattern-list)
             Matches zero or one occurrence of the given patterns
      *(pattern-list)
             Matches zero or more occurrences of the given patterns
      +(pattern-list)
             Matches one or more occurrences of the given patterns
      @(pattern-list)
             Matches one of the given patterns
      !(pattern-list)
             Matches anything except one of the given patterns
```

Tuy nhiên đây không phải tính năng được bật sẵn, bạn cần bật lên thông qua built-in command `shopt` (shell option)  trước khi sử dụng:
```
shopt -s extglob
rm -f !(survivior.txt)
```

## 12. Remove all empty directory
```
find . -type d -empty -delete
```

## 13. Terminal cheatsheet (cht.sh)

![](https://149351115.v2.pressablecdn.com/wp-content/uploads/2017/05/exitvim-1024x455.png)

Đôi khi bạn dùng `vim` mà không thể thoát ra, hoặc biết rồi mà hết lần này đến lần khác lại quên cách thoát ra thì xin chúc mừng bạn,
trên thế giới có hàng vạn người như thế. Và một trong số đó đã viết ra một vài cái cheatsheet xịn xò để tiện cho việc tìm kiếm ở đây:
```
curl cht.sh/vim

...
# Editing

u               undo
yy              yank (copy) a line
y{motion}       yank text that {motion} moves over
p               paste after cursor
P               paste before cursor
<Del> or x      delete a character
dd              delete a line
d{motion}       delete text that {motion} moves over

# Search and replace with the `:substitute` (aka `:s`) command

:s/foo/bar/	replace the first match of 'foo' with 'bar' on the current line only
:s/foo/bar/g	replace all matches (`g` flag) of 'foo' with 'bar' on the current line only
:%s/foo/bar/g	replace all matches of 'foo' with 'bar' in the entire file (`:%s`)
:%s/foo/bar/gc	ask to manually confirm (`c` flag) each replacement
...
```

Ngoài ra bạn cũng có thể tìm kiếm rất nhiều cheatsheet khác bằng cách thay `vim` bằng một từ khóa khác như `java` chẳng hạn.

## 14. ASCII table in terminal

Nếu bạn đã từng phải google không biết bao nhiêu lần vì không nhớ code point trong bảng mã ASCII thì đã có câu lệnh này giúp bạn.
```
man ascii
```

## 15. File system document (hier command)

Nếu bạn mới bắt đầu với Linux, rất có thể bạn sẽ bị choáng ngợp bởi hệ thống file system trên Linux. Câu lệnh này sinh ra để giúp bạn tra cứu khi cần.
```
man hier
```

## 16. Bypass command yes/no question (yes to all)
Mỗi khi cài đặt package trên Linux, thì bạn sẽ thường được bạn được câu hỏi là có chắc chắn về việc cài đặt không, nếu có thì nhấn **enter** hoặc **yes|no** gì đó. Ví dụ:

```
sudo apt install openjdk-13-jdk-headless
```

Chuyện này quá đỗi là bình thường luôn nhưng nếu bạn quá lười để chờ đợi thì có thể làm như sau:
```shell
yes | sudo apt install openjdk-13-jdk-headless 
```

Hay thậm chí nếu bạn lười hơn nữa thì vẫn có cách đấy 
```
sudo -i
echo "APT::Get::Assume-Yes \"true\";\nAPT::Get::force-yes \"true\";" > /etc/apt/apt.conf.d/90_no_prompt

## test
sudo apt install openjdk-14
```

## 17. sudo without password
Nếu việc ngăn chặn khỏi việc thực thi những câu lệnh gây ảnh hưởng nghiêm trọng đến hệ thống là không cần thiết đối với bạn, thì việc không phải nhập mật khẩu mỗi lần dùng câu lệnh `sudo` quả là một lợi thế lớn.
```
 echo "$USER ALL=(ALL) NOPASSWD: ALL" | sudo sh -c "cat - >> /etc/sudoers.d/nopassword; chmod 0440 /etc/sudoers.d/nopassword"
```


## 18. Keep process running after logout/exit terminal
Trong quá trình làm việc với vị trí backend, nhiều lúc bạn sẽ cần build frontend lên để test cho nó dễ.
```
eko-frontend/frontend on  test [⇣$!] is 📦 v0.0.1 
➜ sudo npm run dev -- -p 4001

event - compiled successfully
event - build page: /dashboard/status
wait  - compiling...
event - compiled successfully
event - build page: /login
wait  - compiling...
event - compiled successfully
event - build page: /dashboard/news
wait  - compiling...
event - compiled successfully
...
```

Tuy nhiên có một vấn đề là process này sẽ hold terminal của bạn, nếu tắt terminal thì tiến trình kết thúc, giữ lại thì cũng chẳng làm gì mà lại lãng phí một tab terminal. Để khắc phục việc này thì bạn có thể dùng `nohup` (stand for **NO** **H**ang **UP**) command, câu lệnh này sẽ bỏ qua việc gửi **HUP** (**H**ang **UP**) signal đến process khi đóng terminal, cho phép bạn có thể giữ cho process vẫn được chạy khi terminal bị đóng lại. **STDOUT** của process này sẽ được lưu trong tập tin `nohup.out` ở cùng thư mục bạn đang đứng.
```
eko-frontend/frontend on  test [⇣$!] is 📦 v0.0.1 took 7m 19s 
➜ nohup sudo npm run dev -- -p 4001 &

[2] 441199
nohup: ignoring input and appending output to 'nohup.out' 
```

Find `nohup` process id
```shell
ps -ef | grep <nohup command>
```

## 19. Share wifi as QR code
Mỗi lần có ai hỏi mật khẩu wifi thì thường mình trả lời là không biết, hoặc là phải tìm kiếm trong đây:
```
cat /etc/NetworkManager/system-connections/Bluebottle.nmconnection | grep psk
```

Việc này đôi khi gây ra đôi chút rắc rối nên mình đã tạo một cái thủ thuật nhỏ để có thể nhanh chóng chia sẻ mật khẩu wifi cho bất cứ ai muốn join vào network như sau:

```
logbasex@tty:~$ bash
logbasex@tty:~$ echo "\e[19~": 'nmcli device wifi show -s\015' > ~/.inputrc
logbasex@tty:~$ bind -f ~/.inputrc

Nhấn F8 để thấy điều kì diệu
```

![](https://i.imgur.com/DlSFWsL.png)

## 20. ls command show binary permission

`ls` command show binary permission

```
ls -l | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/) \
             *2^(8-i));if(k)printf("%0o ",k);print}'

600 -rw------- 1 logbasex logbasex  3389 Mar 10 00:26 id_rsa
664 -rw-rw-r-- 1 logbasex logbasex  1460 Mar 10 00:10 id_rsa.ppk
664 -rw-rw-r-- 1 logbasex logbasex   752 Mar 10 00:10 id_rsa.pub
```

Tạo alias cho [câu lệnh này](https://stackoverflow.com/questions/1795976/can-the-unix-list-command-ls-output-numerical-chmod-permissions) thì việc thay đổi permission của tập tin/thư mục dùng `chmod` sẽ nhẹ nhàng hơn đôi chút đấy, tất nhiên là với điều kiện bạn đã quen làm việc với binary permission.

```
alias ls -l='ls -l | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/) \
             *2^(8-i));if(k)printf("%0o ",k);print}''
```


## Final thought
Phần 1 đến đây là kết thúc, chúc mọi người năm mới vui vẻ an lành bên gia đình và người thân. 

```
 ____________________
< Thanks for reading >
 --------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     |
```

## Reference
- https://twobithistory.org/2019/08/22/readline.html