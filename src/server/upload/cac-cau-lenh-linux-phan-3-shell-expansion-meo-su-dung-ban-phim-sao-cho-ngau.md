Chào mừng các bạn đã trở lại với series hay nói đúng hơn là cheatsheet về các câu lệnh Linux mình tổng hợp lại sau quá trình tự học. Như đã giới thiệu ở phần trước thì nội dung bài viết nằm trong cuốn [The Linux Command Line: A Complete Introduction - William E. Shotts Jr.](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894), nên bạn nào muốn tìm hiểu sâu hơn, có lời giải thích kỹ hơn thì hãy tìm đọc theo cuốn sách đó.

Ở phần trước thì chúng ta đã tìm hiểu cách để tìm "bí kíp võ công" hay hướng dẫn sử dụng của từng câu lệnh, và  , vân vân và mây mây...

Ở kỳ này chúng ta sẽ cùng tìm hiểu thêm về các shell expansion và một số mẹo sử dụng bàn phím trong terminal thuận tiện nhất :v:

### 3.1. Shell expansion là cái gì?

Chắc hẳn chúng ta đã từng ít nhất sử dụng kí tự `*` trong câu lệnh terminal rồi, đối với shell mà nói thì kí tự này có rất nhiều ý nghĩa, trước khi shell thực thi một command nào đó thì nó phải thực hiện một quá trình xử lý gọi là expansion, với expansion, bạn nhập vào câu lệnh, và nó được mở rộng thành một câu lệnh hoàn chỉnh, sau đó shell mới thực thi câu lệnh đó.

Để mô tả điều này, chúng ta sẽ sử dụng câu lệnh `echo`, `echo` là một lệnh builtin đơn giản, in ra màn hình tham số truyền vào nó.

```
➜  ~ echo this is a test
this is a test
```

Lần này chúng ta nhập vào `*` là argument:

```
➜  ~ echo *
anaconda3 bin books Library Desktop Documents Downloads elasticsearch-5.5.3 examples.desktop kibana-5.5.3-linux-x86_64 Music opt Pictures projects Public PycharmProjects redis-stable setups snap Templates Videos VirtualBox VMs vmware
```

Chúng ta có thể thấy câu lệnh được xử lý và `*` được coi như là match tất cả những tên của directories và file name. 

Chúng ta cũng có thể áp dụng để list ra những tên file có prefix, postfix mong muốn.

```
➜  ~ echo b*
bin books
➜  ~ echo [[:upper:]]*
Calibre Library Desktop Documents Downloads Music Pictures Public PycharmProjects Templates Videos VirtualBox VMs
```

#### Tilde Expansion

Tilde - dấu `~` khi dùng ở đầu câu thì nó được sẽ được mở rộng thành đường dẫn về home diretory của user hiện tại hoặc user được chỉ định sau đó:

```
➜  ~ echo ~postgres
/var/lib/postgresql
➜  ~ echo ~
/home/hunguyen
➜  ~ echo ~hunghung
zsh: no such user or named directory: hunghung
➜  ~ echo ~hunguyen
/home/hunguyen
```

Nếu không có user nào tồn tại thì câu lệnh sẽ báo lỗi.

#### Arithmetic Expansion

Shell cho phép thực thi phép toán bằng cách sử dùng expansion, cho phép sử dụng shell như là một cái máy tính

```
➜  ~ echo $((2+2))
4
➜  ~ echo $(($((5**2)) * 3))
75
```

#### Brace Expansion

Với loại expansion này chúng ta có thể tạo ra rất nhiều chuỗi kí tự từ một pattern, chúng ta có thể sử dụng một list trong cặp ngoặc nhọn, hoặc chúng ta cũng có thể dùng range `{min_value..max_value}`

```
➜  ~ echo log-{1,2,3,4,5,6}-backup
log-1-backup log-2-backup log-3-backup log-4-backup log-5-backup log-6-backup
➜  ~ echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b
➜  ~ echo {Z..A}                                      
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
```

#### Parameter Expansion

Một dạng khác của expansion là mở rộng biến môi trường

```
➜  ~ echo $USER
hunguyen
➜  ~ echo $RUBY_VERSION
ruby-2.5.3
```

chúng ta có thể xem các biến môi trường bằng lênh `printenv`

#### Command Substitution

Command substitution cho phép chúng ta sử dụng output của một câu lệnh để mở rộng một câu lệnh khác:

```
➜  ~ echo $(ls)
anaconda3 bin books Calibre Library Desktop Documents Downloads
➜  ~ ls -l $(which cp)
-rwxr-xr-x 1 root root 151024 Th03  3  2017 /bin/cp
```

chúng ta không bị giới hạn trong việc sử dụng lệnh để mở rộng câu lệnh khác:

```
➜  ~ file $(ls -d /usr/bin/* | grep zip)
/usr/bin/funzip:     ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/l, for GNU/Linux 2.6.32, BuildID[sha1]=06412c648a6927c4a14c751fe2412db3425ecd0f, stripped
/usr/bin/gpg-zip:    POSIX shell script, ASCII text executable
/usr/bin/mzip:       symbolic link to mtools
...
```

Trong câu lệnh trên, kết quả trả về của lệnh `ls -d /usr/bin/* | grep zip` trở thành list các tham số truyền vào lệnh `file`. Chúng ta cũng có thể sử dụng ``` back-tick để  thay thế cho việc sử dụng `$` và ngoặc

```
➜  ~ file `ls -d /usr/bin/* | grep zip`
/usr/bin/funzip:     ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/l
...
```


#### Sử dụng kết hợp với single quote và double quote

Đôi khi có những tên file có chứa khoảng trắng, nếu chúng ta đơn thuần chỉ gõ vào tên file đó mà không escape dấu cách shell sẽ tự hiểu ta đang truyền vào nhiều argument cho một lệnh

```
➜  ~ ls -l two words.txt
ls: cannot access 'two': No such file or directory
ls: cannot access 'words.txt': No such file or directory
```

chúng ta cần sử dùng double quote hoặc single quote để tránh việc phải sử dụng escape khoảng trắng

```
➜  ~ ls -l "two word.txt"
-rw-rw-r-- 1 hunguyen hunguyen 0 Th06 19 22:51 two word.txt
```

các loại expansion vẫn sử dụng bình thường khi ở trong single quote và double quote, tất nhiên là khi chúng ta muốn sử dụng chúng như là một argument

```
➜  ~ echo $(cal)
Tháng sáu 2019 CN T2 T3 T4 T5 T6 T7 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
➜  ~ echo "$(cal)"
   Tháng sáu 2019     
CN T2 T3 T4 T5 T6 T7  
                                    1  
 2  3  4  5  6  7  8  
 9 10 11 12 13 14 15  
16 17 18 19 20 21 22  
23 24 25 26 27 28 29  
30
```

### 3.2. Các mẹo sử dụng bàn phím

 Chuột sinh ra để xử lý tác vụ một cách nhanh chóng và hiệu quả, nhưng đối với việc sử dụng terminal, thì việc dùng chuột lại không có ý nghĩa lắm, việc với tay ra chuột để xử lý một vài tác vụ sẽ tốn vài giây làm việc của bạn, mình thường hay nói đùa như vậy, rõ ràng là ai cũng quen với một cách làm việc nào đó, nhưng mình vẫn thích là ít dùng chuột hơn, nên sau đây mình sẽ liệt kê ra một số tổ hợp phím hiệu quả mà không cần dùng đến chuột hay phải dùng các phím mũi tên nhiều lần để di chuyển con trỏ đến vị trí nào đó, một số phần mình cho là không cần thiết trong quyển sách, mình sẽ lược bỏ, các bạn có thể tham khảo thêm trực tiếp trong sách sau nhé.
 
 #### Di chuyển con trỏ
 
 Đây là một số tổ hợp phím dùng để di chuyển con trỏ một cách nhanh chóng khi bạn đang thao tác trên dòng lệnh

| Tổ hợp phím | Tác vụ |
| -------- | -------- |
|  Ctrl - a    |   Di chuyển con trỏ đến đầu dòng   |
|  Ctrl - e    |    Di chuyển con trỏ về cuối dòng  |
|  Ctrl - f    |   Di chuyển con trỏ tiến lên 1 chữ cái (cái này ai không nhớ thì dùng phím mũi tên đơn thuần cũng được)   |
|  Ctrl - b    |   Di chuyển con trỏ lùi 1 chữ cái  |
|  Alt - f    |   Di chuyển con trỏ tiến 1 từ  |
|  Alt - b    |   Di chuyển con trỏ lùi 1 từ  |
| Ctrl - l    |   Clear màn hình và di chuyển về đầu dòng |

#### Chỉnh sửa câu lệnh

Chúng ta thường có thói quen gõ sai thì copy xong gõ lại, hoặc sử dụng mũi tên hay copy paste ở đâu đó, nhưng có lẽ khá nhiều người không để ý là chúng ta có thể edit, copy, paste ngay trên dòng lệnh, sau đây là một số tổ hợp phím để copy paste delete

| Tổ hợp phím | Tác vụ |
| -------- | -------- |
|  Ctrl - k    |   Xóa text từ vị trí con trỏ đến hết dòng  |
|  Ctrl - u    |    Xóa text từ vị trí con trỏ đến đầu dòng   |
|  Alt - d   |   Xóa text từ vị trí con trỏ đến cuối từ hiện tại  |
|  Alt - backspace    |   Xóa text từ vị trí con trỏ đến đầu từ hiện tại  |
| Ctrl - y    |   paste những từ vừa xóa trở lại vị trí con trỏ hiện tại |

Trong dòng lệnh, xóa thực ra không phải là xóa, xóa thực ra là kill, mỗi khi chúng ta thực hiện một trong bốn thao tác kill của bảng trên, từ chúng ta kill đó được đưa vào một stack gọi là kill-ring, khi chúng ta sử dụng Ctrl+y (gọi là yank text) tất cả những từ chúng ta đã xóa sẽ được paste lại vào câu lệnh hiện tại theo thứ tự, stack này sẽ được reset ở những lần kill tiếp theo.

### Kết luận

Vậy là với bài viết này, chúng ta đã biết thêm về cách shell hiểu được những lệnh của chúng ta trước khi thực thi nó thông qua expansion, và một số mẹo sử dùng bàn phím hay. Ở bài viết tới trong series Linux Command Line này, chúng ta tìm hiểu về permission và processes nhé.


--- 

Sắp tới những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁

### Tham khảo:
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-4-shell-expansion-va-mot-so-meo-su-dung-ban-phim/