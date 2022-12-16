Chào mừng các bạn đã trở lại với series hay nói đúng hơn là cheatsheet về các câu lệnh Linux mình tổng hợp lại sau quá trình tự học. Như đã giới thiệu ở phần trước thì nội dung bài viết nằm trong cuốn The Linux Command Line: A Complete Introduction - William E. Shotts Jr., nên bạn nào muốn tìm hiểu sâu hơn, có lời giải thích kỹ hơn thì hãy tìm đọc theo cuốn sách đó.

Ở phần trước thì chúng ta đã bắt đầu quá trình tìm hiểu những tác vụ khi sử dụng Linux để hỗ trợ cho công việc hàng ngày mà mở đầu là chúng ta đã tìm hiểu về Package management trong Linux.

Ở kỳ này chúng ta sẽ tạm gác lại chủ đề tác vụ trong Linux lại một chút mà thay vào đó chúng ta sẽ cùng tóm tắt lại một số điểm cần nắm vững khi viết một shell script.

### Shell script là gì?

Trước hết đi vào tìm hiểu cách viết shell script thì chúng ta cần hiểu xem shell script là gì. Hiểu đơn giản shell script là một file bao gồm tập hợp của nhiều commands tạo thành. Để viết một shell script thì chúng ta cần: 

- Một text editor, loại nào có highlight syntax (như `vim` mà chúng ta đã làm quen ở những bài viết trước chẳng hạn)
- Sau khi viết xong chúng ta cần chuyển file mode để script có thế executable.
- Bước cuối cùng (optional), để script đó tại một nơi mà hệ thống có thể dễ dàng gọi đến được.

### Một vài điểm cần nhớ

#### Cấu trúc của một shell script

```shell
#!/bin/bash
# Shell function demo
function step2 {
    echo "Step 2"
    return
}
# Main program starts here
echo "Step 1"
step2
echo "Step 3"
```

Trên đây là ví dụ về một script cơ bản, các thành phần bao gồm:
- Dòng đầu tiên bắt đầu với chuỗi kí tự đặc biệt `#!` được gọi là `shebang`, dòng này thường được dùng để nói với kernel là interpreter nào được dùng để thông dịch script này. Nó có thể là bất cứ interpreter nào từ `/bin/bash` cho đến `ruby` hay là `python`. Tất cả các script đều nên bắt đầu bằng dòng khai báo này. Trong bài viết này chúng ta sẽ chỉ đề cập đến shell script nên mặc định dòng này sẽ chỉ có `shebang` là `/bin/bash`.
- Tất cả các dòng tiếp theo nếu bắt đầu bằng `#` đều được coi là comment.
- Các câu lệnh.

#### Permission

Điểm tiếp theo cần lưu ý đó chính là permission của file shell script. Có hai settings permission thường gặp đó chính là: `755` (mọi người đều có thể execute) `700` (chỉ file owner mới có quyền execute) (file mode là gì các bạn có thể tìm hiểu [bài viết trước](https://viblo.asia/p/cac-cau-lenh-linux-phan-4-permission-Do75443J5M6)).

#### Script file location

Chúng ta có thể đặt file shell script ở một directory tập trung sau đó append path của directory đó vào `PATH` trong file `.bashrc` (Tìm hiểu thêm về environment variable [ở bài trước](https://viblo.asia/p/cac-cau-lenh-linux-phan-6-environment-va-gioi-thieu-ve-vim-Eb85oj82l2G))

Ngoài ra một directory được prefer nhất ngoài cách trên đó chính là `/home/{user_name}/bin`.

#### Một vài recommendations khi viết shell script

- Mỗi câu lệnh đều có short và long option, với những câu lệnh execute trực tiếp trong terminal hay một shell session, chúng ta có thể dùng short option cho nhanh và ngắn gọn, tuy nhiên khi viết shell script cũng như là chúng ta đang viết code vậy, cần sự dễ đọc để dễ maintain, chúng ta nên dùng long option để người đọc dễ hiểu hơn

Ví dụ với lệnh `ls`
```shell
# thay vì dùng thế này
ls -ad
# ta có thể viết thế này trong script
ls --all --directory
```

- Sử dụng indent và line continuation với `\` cũng là để cung cấp sự dễ đọc

Ví dụ với lệnh `find`

```shell
# thay vì viết liền một dòng gây khó đọc hiểu 
find some_directory \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)

# chúng ta có thể sử dụng indent kết hợp với việc ngắt dòng bằng \ sẽ dễ đọc hơn
find playground \
    \( \
        -type f \
        -not -perm 0600 \
    \) \
-or \
    \( \
        -type d \
        -not -perm 0700 \
    \)
```

Chúng ta đã tìm hiểu được một vài bước cơ bản đầu tiên trước khi bắt tay vào viết một shell script, giờ sẽ đến phần quan trọng nhất những thành phần cơ bản của một shell script.

### Functions

Format của shell function được viết như sau:

```shell
function name {
      ...commands
      return
}

# hoặc 

name () {
      ...commands
      return
}
```

Một function thường chứa ít nhất một command và một lệnh `return` (kết thúc function và trả quyền control cho main script).

Ví dụ:

```shell
report_uptime () {
    cat <<- _EOF_
        System Uptime
        $(uptime)
    _EOF_
    return
}
# hoặc 
function report_uptime () {
    cat <<- _EOF_
        System Uptime
        $(uptime)
    _EOF_
    return
}
```

Script trên sẽ in ra màn hình thời gian uptime của hệ thống, chúng ta sẽ thấy một cú pháp đặc biệt với lệnh `cat` mà chúng ta sẽ tìm hiểu ngay sau đây có tên là here document.

### Here documents

Cũng giống như một vài ngôn ngữ chúng ta có thể format những đoạn text dài vài dòng hoặc cả trang, shell script cũng cung cấp một cơ chế tương tự gọi là here document. Cú pháp như sau:

```shell
command << TERMINATE_TOKEN
    This is 
    a    very
    long text
TERMINATE_TOKEN
```

Trong đó:
- `command` là bất kì command nào nhận đầu vào từ standard input (ví dụ như `cat`, `grep`, `sed`...)
- `TERMINATE_TOKEN`: là một string để xác định điểm đầu và cuối của đoạn text.
- Ngoài việc sử dụng `<<` để redirect đoạn text ta có thể sử dụng `<<-` để loại bỏ những khoảng tab ở đầu mỗi dòng.


### Variables

Một vấn đề quan trọng trong mọi ngôn ngữ lập trình đó chính là khai báo biến.

Để khai báo biến cũng giống như các ngôn ngữ lập trình khác ta sử dụng cú pháp: `some_var=[value]`. 
Có thể khai báo biến `some_var=` nếu không muốn gán ngay giá trị cho biến.
Để sử dụng biến, chúng ta thêm ký tự `$` vào trước tên biến vừa khai báo `$some_var`.


Lưu ý: không được có khoảng cách giữa dấu `=` nếu không việc khai báo sẽ bị lỗi.

```shell
➜  ~ A = "text"  
zsh: command not found: A
➜  ~ echo $A

➜  ~ A="text"  
➜  ~ echo $A
text
```

Đối với trường hợp chúng ta muốn khai báo hằng số chúng ta có thể sử dụng lệnh `declare` nhưng việc khai báo này thường hiếm khi được dùng đến.

```shell
declare -r TITLE="Page Title"
```

Variable trong shell script có thể tồn tại ở hai scope global và function:
- Nếu muốn biến trong function chỉ tồn tại trong scope của function đó, ta cần khai báo biến bằng lệnh `local` như ở trong script sau.

```shell
foo=0
funct_1 () {
    local foo
    foo=1
    echo "funct_1: foo = $foo"
}
funct_2 () {
    local foo
    foo=2
    echo "funct_2: foo = $foo"
}
echo "global: foo = $foo"
funct_1
echo "global: foo = $foo"
funct_2
echo "global: foo = $foo"
```

Bạn hãy thử tự comment dòng `local foo` lại và check xem điều gì sẽ xảy ra nhé.

Nếu như trong script bạn sử dụng tới một biến mà ở các lệnh trước chưa khai báo biến đó, hoặc biến đó chưa có giá trị, bạn có thể sử dụng một vài cú pháp sau được gọi là variable expansion:

- `#{foo:-"Default value"}` : nếu `foo` không tồn tại hoặc không chứa giá trị, nó sẽ sử dụng giá trị khai báo sau `:-`.

```shell
➜  /tmp foo= 
➜  /tmp echo ${foo:-"Default"}
Default
➜  /tmp echo ${foo} 

```

- `#{foo:="Default value"}` : giống như cách trên nhưng sau đó, biến `foo` sẽ được gán cho giá trị sau `:=`

```shell
➜  /tmp echo ${foo:="Default"}
Default
➜  /tmp echo ${foo}
Default
```

Vậy là chúng ta đã biết một số điều cơ bản khi viết một shell script, hi vọng là các bạn đã củng cố được thêm phần nào kiến thức khá quan trọng này. Phần tiếp theo chúng ta sẽ tiếp tục tìm hiểu về những cấu trúc khác trong shell script nhé.