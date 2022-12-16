## Mở đầu
`chmod -R 777`, không biết bạn có thấy câu lệnh này ... quen quen không nhỉ :joy: 

Mỗi khi gặp các vấn đề liên quan đến permission denied, hay các message lỗi khác tương tự, thì đây có vẻ là câu lệnh thần thánh mà mọi người hay sử dụng. Bản thân mình hồi mới bắt tay vào lập trình web, khi làm việc trên các hệ thống Linux, Mac, thì cũng hay search ra cách giải quyết này.

Sau này tìm hiểu kỹ mới thấy được rằng đằng sau câu lệnh trông rất đơn giản này là rất nhiều những concept phức tạp của một hệ thống Linux. Và trong phần tiếp theo của series [Become a SuperUser](https://viblo.asia/s/become-a-superuser-24lJDg3WKPM) này, chúng ta hãy cùng tìm hiểu sâu về các khái niệm permission và ownership nhé.

Đây cũng là chủ đề của objective [104.5 Manage file permissions and ownership](https://learning.lpi.org/en/learning-materials/101-500/104/), trong [Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard , objective](https://learning.lpi.org/en/learning-materials/101-500/104/) của kỳ thi LPIC 1 (Linux Professional Institute Certification Level 1).

## Tìm hiểu về file ownership
### Truy xuất các thông tin liên quan đến File hoặc Directory
Một câu lệnh vốn rất quen thuộc với những người sử dụng Linux, đó là `ls`. Đây là câu lệnh giúp bạn liệt kê các content (file và thư mục) trong một thư mục bất kỳ. 

Thông thường, câu lệnh `ls` sẽ cho chúng ta thông tin về tên các content, tuy nhiên chúng ta có thể sử dụng thêm option `-l` để hiển thị thêm nhiều thông tin khác. Ví dụ như dưới đây
- Owner: Trong hệ thống Linux thì mỗi file hoặc directory thuộc về 1 user, user đó gọi là owner của file hay directory 
- Group: Tương tự với owner, thì trong hệ thống Linux, một file hay một directory sẽ được gán cho một group nào đó, và chúng ta có thể điều chỉnh quyền với file/directory giữa owner và group khác nhau.
- Others: Đây là nhóm còn lại, bên cạnh owner của file/directory, cũng như group của file/directory. 

```
thangtd@localhost> ls -l README.md
-rw-r--r--@ 1 thangtd  thangtd  337 May 31  2022 README.md
```

- Loại filetype: `-`
- Permission string: `rw-r--r--` , chúng ta sẽ tìm hiểu rõ hơn về ý nghĩa của phần này ở phía dưới của bài viết nhé :smiley: 
- Số lượng Hard link: 1
- File owner: thangtd
- File group: thangtd
- File size: 337 bytes
- Thời gian được modify gần nhất: May 31 08:46
- Tên file: README.md

### Các loại Filetypes
- `-`: Một file thông thường
- `d`:  Một thư mục (directory). Một thư mục có thể chứa files, hoặc các thư mục khác, giúp cho việc quản lý files trong hệ thống được hiệu quả hơn. Về mặt kỹ thuật thì có một câu rất nổi tiếng miêu tả về hệ thống Unix/Linux đó là *Everything is a file*, và đương nhiên, một *directory* cũng vậy, nó là một dạng file đặc biệt.
- `l`: Mang ý nghĩa là symbolic link. Khi một "file" ở dạng symbolic link thì ta có thể hiểu nó như là một pointer đến một file hoặc directory khác ở đâu đó trong hệ thống. Có lẽ chúng ta sẽ tìm hiểu chi tiết hơn về dạng file đặc biệt này ở một bài khác nhé :smiley: 
- `b`: Là block device. Nó là file đại diện cho một virtual device hoặc physical device, thường là ổ cứng, hay các thiết bị lưu trữ
- `c`: là character device. Nó là file đại diện cho virtual hoặc physicial device, ví dụ như terminal ... 
- `s`: là socket. Sockets có thể hiểu đơn giản là đường ống dẫn, để kết nối và truyền tải thông tin giữa các chương trình với nhau

Ví dụ
```
// File và folder
$ ls -l
-rw-r--r-- 1 thangtd thangtd   10 May 31 00:46 test
drwxr-xr-x 2 thangtd thangtd 4096 May 31 03:05 test_dir

// Block device
$ ls -l /dev/sda
brw-rw---- 1 root disk 8, 0 Oct 19  2021 /dev/sda

// Character device
$ls -l /dev/tty
crw-rw-rw- 1 root tty 5, 0 May 28 13:09 /dev/tty

// Socket
ls -l /var/run/docker.sock
srw-rw---- 1 root docker 0 Oct 19  2021 /var/run/docker.sock
```

## Thay đổi file's owner và file's group
### Câu lệnh `chgrp`
Một câu lệnh đơn giản để giúp chúng ta thay đổi group được assign cho một file/directory đó là `chgrp` (change group) 
```
chgrp [options] new_group filenames
```

Theo đó thì `new_group` là tên của group mới mà sẽ được assign cho file/directory. Còn `filenames` chính là tên của file/directory mà chúng ta muốn thay đổi group. Nếu muốn thay đổi cùng lúc nhiều files/directories thì bạn có thể liệt kê chúng hết ra, ngăn cách nhau bởi dấu cách là được. Ví dụ như

```
// Đổi group của file test và thư mục test_dir 
// sang group có tên là tran.duc.thang
sudo chgrp tran.duc.thang test test_dir
```

Về cơ bản thì owner của file hoặc directory, cũng như một user có quyền root, có thể thay đổi giá trị của group vốn được gán cho một file/directory sang một group khác. Trong trường hợp bạn chỉ là owner của file, thì bạn chỉ có thể đổi group của nó sang một group mà bạn cũng có quyền membership (tức cũng nằm trong group đấy). Còn với root user, hay khi bạn có quyền sudo thì bạn có thể đổi sang bất kỳ group nào của hệ thống.

### Câu lệnh `chown`
Tương tự với `chgrp` thì chúng ta có một câu lệnh để thay đởi owner của file, đó là `chown` (change own)
```
chown [options] new_owner filenames
```

Tương tự với câu lệnh `chgrp` thì `new_owner` là tên của user mới mà sẽ được assign làm owner cho file/directory. Còn `filenames` chính là tên của file/directory mà chúng ta muốn thay đổi owner. Nếu muốn thay đổi cùng lúc nhiều files/directories thì bạn có thể liệt kê chúng hết ra, ngăn cách nhau bởi dấu cách là được.

Ngoài ra thì owner của 1 file không nhất thiết phải là member trong group của file đó, nên bạn có thể tùy ý thay đổi owner cũng như group mà không cần quan tâm đến mối liên quan giữa chúng.

Một option mà mình hay dùng với câu lệnh `chown` này đó là `-R`, **recursive**, tức thực hiện câu lệnh một cách đệ quy cho các file và thư mục bên trong nó. Câu lệnh này sẽ giúp bạn đổi owner của toàn bộ file và thư mục ở bên trong, chứ không chỉ dừng lại ở mỗi bản thân thư mục không thôi.

Ngoài ra câu lệnh `chown` cũng có thể giúp bạn đổi cả group của file nữa, thông qua cú pháp dưới đây

```
chown new_owner:new_group filenames
```

tức là ta đồng thời có thể thay đổi owner của file, và group của file, bằng cách truyền vào `new_owner` và `new_group`, được ngăn cách với nhau bởi dấu `:`. Và nếu chỉ muốn thay đổi mình group không thôi thì bạn có thể ... bỏ trống phần `new_owner` này :joy: Lúc đó ta có một câu lệnh hoạt động giống với `chgrp` như sau:

```
chown :new_group filenames
```

## Tìm hiểu về permission
Như phần đầu bài viết có đề cập, thì khi dùng câu lệnh `ls -l` để đọc thông tin về file, chúng ta sẽ bắt gặp một thông tin kiểu như `rw-rw-r--` hay `rwxrwxrwx` ... Chúng là những giá trị biểu diễn cho permission của file/directory. Linux sử dụng 3 loại permission control, và mỗi loại này có ý nghĩa khác nhau khi nó được áp dụng trên đối tượng là normal file hoặc là directory. Hãy cùng đi vào tìm hiểu chi tiết hơn nhé

### Ý nghĩa của các permission với File
- `r` mang ý nghĩa là `read`, và có giá trị là 4 trong hệ cơ số 8. Một file có permission `r` tức là có thể mở và đọc content của file đó
- `w` mang ý nghĩa là `write`, và có giá trị là 2 trong hệ cơ số 8. Một file có permission `w` tức là có thể edit và delete nó
- `x` mang ý nghĩa là `execute`, và có giá trị là 1 trong hệ cơ số 8. Một file có permission `x` tức là ta có thể thực thi nó

Permission được sắp xếp lần lượt theo thứ tự read-write-execute, nếu có quyền nào đó thì ta có thể biểu diễn với ký tự tương ứng `r`, `w`, `x` , hoặc là `1`. Ngược lại nếu không có quyền thì ta dùng ký tự `-` hoặc là số `0`.

Ví dụ như với một file có permission là `rw-` thì tức là nó có thể được đọc, ghi, sửa, xóa, nhưng không thể thực thi. Permission đó có thể được biểu diễn tương ứng là `110`.

Việc dùng một ký tự, tương ứng với từng loại permission thì ta gọi đó là **biểu diễn permission dưới dạng symbolic mode**. Còn việc dùng số nhị phân để biểu diễn xem có hay không có permission thì được gọi là **octal mode** . Tại sao lại là octal mode (octal là hệ cơ số 8), mà không phải hexadecimal (hệ 16), hay một hệ cơ số nào khác thì mọi người có thể hiểu đơn giản là để biểu diễn 3 loại quyền khác nhau thì chúng ta cần 3 bit, và với 3 bit này thì ta có thể biểu diễn các giá trị từ 0 đến $2^3 - 1$, tức nằm trong hệ cơ số 8.

Điều này cũng giải thích cho việc tại sao quyền read (`r--`), khi được biểu diễn dưới dạng bit là `100` sẽ có giá trị là 4 như đã nhắc đến ở trên.

### Ý nghĩa của các permission với Directory
Tương tự với *normal file* thì với *directory* chúng ta cũng có các loại permission cơ bản như sau:
- `r` mang ý nghĩa là `read`, và có giá trị là 4 trong hệ cơ số 8. Một thư mục có permission `r` thì ta có thể **đọc được nội dung bên trong thư mục đó (tức list được ra danh sách các thư mục, các files ở bên trong**. Tuy nhiên nó cũng chỉ dừng lại ở việc liệt kê ra danh sách filé ở bên trong, chứ không bao gồm quyền đọc nội dung bản thân các files đó (lúc này phải xét đến quyền read của từng files)
- `w` mang ý nghĩa là `write`, và có giá trị là 2 trong hệ cơ số 8. Một thư mục có permission `w`  tức là ta có thể tạo và xóa files bên trong nó.
- `x` mang ý nghĩa là `execute`, và có giá trị là 1 trong hệ cơ số 8. Có vẻ khá khó hiểu phải không nhỉ, một thư mục thì biết thực thi cái gì :joy: Ý nghĩa của quyền `x` với một thư mục đó là bạn có thể **vào bên trong thư mục đó**. Hiểu một cách đơn giản là nếu một thư mục mà bạn không có quyền `execute` thì bạn sẽ không thể `cd` vào bên trong nó được. (Đương nhiên khi `cd` vào bên trong rồi, thì bạn cần quyền `r` để list ra danh sách files, hay cần quyền `w` để tạo ra thêm files mới ...)

### Permission Level
Bên cạnh việc phân chia làm 3 loại permission liên quan đến `read`, `write` và `execute`, thì hệ thống Linux còn có thêm sự phân cấp cho phép chúng ta apply các loại permission này đến với từng đối tượng nhất định. Cụ thể ta sẽ có 3 loại cấp độ là:
- Owner: Tức permission sẽ được apply cho owner của file 
- Group: Permission sẽ được apply cho những user thuộc vào group của file
- Others: Permission sẽ được apply cho những users còn lại, mà không phải owner, cũng như không phải là member của group của file

Khi một user cố gắng thực thi một thao tác gì đó với file, thì hệ thống sẽ check xem user đó có phải là owner của file không, nếu có thì permission ở level owner sẽ được sử dụng. Tiếp đến, hệ thống sẽ check xem user có thuộc group của file không, nếu có thì permission ở level group sẽ được sử dụng, và nếu không phải 2 trường hợp trên thì cuối cùng permission của others sẽ được sử dụng.

Theo đó, bạn thử giải đáp câu hỏi vui dưới đây xem sao nhé :smiley: 

> File `test_file` có permission và thông tin về owner, group như sau `---rwxr-- thangtd superusers`. Tức với owner (là `thangtd`) thì có quyền là `---`, với group (là `superusers`) thì có quyền là `rwx`, còn với others thì có quyền là `r--`. Nếu `thangtd` là một thành viên của group `superusers` thì liệu `thangtd` có thể đọc được nội cung của file này không?

## Thay đổi permission
Khi là owner của file, hoặc khi có quyền root thì bạn có thể thay đổi permission của file thông qua câu lệnh `chmod`. Đây là một câu lệnh rất mạnh mẽ, và syntax của nó cũng rất đa dạng :joy: Chúng ta vừa có thể truyền các thông tin về permission bằng ký tự (symbolic mode), hoặc bằng số (octal mode). Hãy cùng đi sâu hơn tìm hiểu cách sử dụng chúng nhé.

### Thay đổi permission với symbolic mode
Ở symbolic mode thì chúng ta sử dụng các ký tự như `r`, `w`, `x` để biểu diễn giá trị permission, và dùng các ký tự `u`, `g`, `o`, hay `a` để biểu diễn level của permission. Cụ thể thì:
- `u`	tương ứng với owner
- `g`	tương ứng với group
- `o`	tương ứng với others (chứ không phải owner đâu nhé, nghĩ rằng `o` là owner, xong set nhầm quyền cái là tai hại lắm đấy :joy: )
- `a`	tương ứng với tất cả các mức từ owner, group cho đến other

Ngoài ra chúng ta có thể dùng các ký tự `+` với ý nghĩa là thêm permission, `-` với ý nghĩa là bớt đi permission, hay `=` với ý nghĩa là set permission đúng bằng một giá trị mong muốn.

Một vài ví dụ:
```
// Loại bỏ quyền write (nếu có) của group
chmod g-w README.md

// Thêm quyền execute cho other
chmod o+x script

// Set quyền cho owner và group là r--
chmod ug=r-- README.md

// Loại bỏ quyền execute cho tất cả các mức
chmod a-x script
```

### Thay đổi permission với octal mode
Ở octal mode, chúng ta sẽ dùng 8 số, từ 0 đến 7, để biểu diễn cho 3 bit permission. Các giá trị trong hệ cơ số 8, và permission tương ứng được biểu diễn ở bảng dưới đây:
| Giá trị trong hệ cơ số 8 | Giá trị bit tương ứng | Permission | Ý nghĩa |
| -------- | -------- | -------- | -------- |
| 0	| 000 |  ---	| Không có quyền gì cả |
| 1	| 001 |  --x	| Chỉ có quyền execute |
| 2	| 010 |  -w-	| Chỉ có quyền write |
| 3	| 011 | -wx	| Có quyền write và execute |
| 4	| 100 | r--	| Chỉ có quyền read |
| 5	| 101 | r-x	| Có quyền read và execute |
| 6	| 110 | rw-	| Có quyền read và write |
| 7	| 111 | rwx	| Có cả 3 quyền read, write và execute |

Chúng ta sẽ biểu diễn lần lượt permission theo level owner, rồi đến group và cuối cùng là other. Theo đó thì permission ở symbolic mode là `rwxrw-r--` thì sang octal mode sẽ tương ứng là 764.

Lúc này khi set permission ta sẽ dùng các số từ 0 ~ 7 này, ví dụ như
```
// Đổi permission về rwx------ 
// Tức loại bỏ hoàn toàn quyền của group và other
chmod 700 README.md

// Set full quyền cho owner, group, other
chmod 777 README.md

// Set full quyền cho owner, group, other
// cho toàn bộ các file và thư mục bên trong
chmod -R 777 test_dir
```

### Thay đổi default permission với `umask`
Đã bao giờ bạn thắc mắc xem khi mình tạo mới một file hoặc thư mục, thì chúng sẽ có permission như thế nào chưa nhỉ :smiley: Hãy thử check qua nhé:
```
thangtd@localhost:~$ touch test
thangtd@localhost:~$ mkdir test_dir
thangtd@localhost:~$ ls -l
-rw-r--r-- 1 thangtd thangtd    0 May 31 13:34 test
drwxr-xr-x 2 thangtd thangtd 4096 May 31 13:34 test_dir
```

Như bạn thấy thì file mới được tạo ra sẽ có permission là `rw-r--r--` tức 644, còn thư mục mới được tạo ra sẽ có permission là `rwxr-xr-x` tức 755. Và có vẻ như mặc định nó sẽ là như vậy khi bạn tạo mới file hay thư mục. Như tại sao lại là con số 644 hay 755 này?

Thực ra về cơ bản thì hệ thống Linux mặc định tạo ra file mới với permission là 666 (tức có quyền read và write cho cả owner, group, other),  và tạo ra thư mục mới với permission là 777 (tức có quyền read, write, execute cho cả owner, group, other). Vì lý do security mà hệ thống sẽ không cho phép ta tạo ra một file mới với quyền execute, kể cả với owner, thế nên giá trị max mà chúng ta có được chỉ là 6 mà thôi. Còn giá trị permission mà thực tế bạn nhận được như ví dụ ở trên là giá trị đã được xử lý qua một công cụ, gọi là `umask`. Trước hết hãy thử gõ câu lệnh `umask` vào terminal để xem giá trị của nó đang là gì nhé:
```
thangtd@localhost:~$ umask
0022
```

Hãy khoan nói đến số 0 ở đầu tiên, thứ mà chúng ta sẽ tìm hiểu kỹ hơn ở phần cuối của bài viết này, thì 3 chữ số tiếp theo chính là giá trị làm ảnh hưởng đến các permission của file, thư mục mới mà chúng ta vừa đề cập đến ở trên. Cụ thể thì giá trị `umask` biểu thị permission sẽ **KHÔNG** được set khi file hay directory mới được tạo ra. 

Như ở trên ta đã đề cập thì theo mặc định file sẽ có permission là 666, còn thư mục thì là 777. Với giá trị `umask` là 022 (remove quyền write ở group, và other) thì:
- File mới được tạo ra sẽ có permission là 666 - 022 = 644
- Directory mới được tạo ra sẽ có permission là 777 - 022 = 755

Giờ thì bạn đã hiểu được giá trị permission thực tế 644, hay 755 là từ đâu ra rồi chứ :smiley: 

Nếu giá trị ở octal mode hơi khó hiểu, thì bạn có thể dùng option `-S` để xem ý nghĩa của câu lệnh `umask` dưới dạng symbolic mode:
```
thangtd@localhost:~$ umask -S
u=rwx,g=rx,o=rx
```

Với việc sử dụng `umask`, chúng ta có thể control được việc một file, hay một thư mục mới được tạo ra sẽ có permission như thế nào. Ví dụ như bạn muốn thư mục được tạo ra có full quyền 777 chẳng hạn, bạn có thể set giá trị `umask` về 000. Hay nếu bạn muốn file được tạo ra không có permission gì dành cho other, bạn có thể set lại `umask` về 027. Ví dụ về cách set giá trị `umask`, cũng như tác dụng mà nó mang lại có thể được thấy rõ qua ví dụ dưới đây:
```
// Giá trị umask mặc định
thangtd@localhost:~$ umask
0022
// Tạo ra file mới
thangtd@localhost:~$ echo "test" > test
// Check để thấy rằng permission file mới là 644
thangtd@localhost:~$ ls -l
-rw-r--r-- 1 thangtd thangtd    5 May 31 15:20 test
// Thay đổi giá trị umask
thangtd@localhost:~$ umask 027
// Check để thấy là giá trị đã được thay đổi
thangtd@localhost:~$ umask
0027
// Tạo ra file 2
thangtd@localhost:~$ echo "test 2" > test_2
// Check để thấy rằng permission của file mới là 640
thangtd@localhost:~$ ls -l test_2
-rw-r----- 1 thangtd thangtd 7 May 31 15:21 test_2
// Tạo ra file 3
thangtd@localhost:~$ echo "test 3" > test_3
// Check để thấy rằng permission của file mới cũng là 640
thangtd@localhost:~$ ls -l test_3
-rw-r----- 1 thangtd thangtd 7 May 31 15:23 test_2
```

Có một điểm cần chú ý là giá trị `umask` sẽ chỉ có hiệu lực trong một phiên session của user. Tức hiểu đơn giản là bạn gõ vào terminal câu lệnh đổi `umask` sang 077 là `umask 077`, thì khi bạn tắt terminal, vào và check lại thì nó sẽ lại quay trở về giá trị 022. Nếu muốn sử dụng một permission mặc định mới một cách lâu dài, thì bạn có thể set câu lệnh `umask` vào trong các file config `~/.bashrc` (nếu bạn dùng bash) hay `~/.zshrc` (nếu bạn dùng zsh) chẳng hạn.

## Các permission đặc biệt
Trong câu lệnh `chmod` ở octal mode, thì bên cạnh việc sử dụng 3 số trong hệ cơ số 8 để biểu diễn permission, ví dụ như `777`, `664`, `400` ... thì thỉnh thoảng bạn sẽ còn thấy trường hợp người ta dùng 4 số nữa. Ví dụ như `0777`, `2644` ... Hay đơn giản như trường hợp bạn gõ câu lệnh `umask` như ở trên, thì kết quả cũng là một dãy 4 số của hệ cơ số 8, chứ không phải 3. Vậy chữ số đầu tiên có ý nghĩa gì? Tại sao thỉnh thoảng nó lại bị bỏ qua?

Ngoài ra, nếu thường xuyên check permission của file, hay directory, bạn thỉnh thoảng sẽ thấy một vài ký tự đặc biệt, ví dụ như `t`, `s`, `S`. Vậy chúng có ý nghĩa gì?

2 vấn đề trên có chung một câu trả lời. Đó là ngoài các permission cho read, write, execute, hệ thống Linux còn một số loại permission khác, gọi là special permission, để sử dụng trong một vài hoàn cảnh đặc biệt.

Hãy cùng tìm hiểu về các special permissions này nhé.

### Sticky Bit
**Sticky bit** còn được gọi là **restricted deletion flag**, mang ý nghĩa là ngăn một user bất kỳ có thể xóa, hay đổi tên file, trừ khi user đó là owner của file. Nghe đến đây có thể bạn sẽ thắc mắc là chẳng phải với một directory ta đã có quyền `w` để kiểm soát việc đó rồi hay sao, chỉ cần remove quyền `w` đi là được mà? Tuy nhiên nếu bạn remove quyền `w` của directory, với group, hay others đi, thì người dùng đồng thời cũng sẽ không thể **tạo mới** được file khác. Đó chính là mấu chốt. Tức bạn muốn cho người dùng tạo, nhưng không cho phép họ xóa, trừ khi file đó là do họ tạo ra, thì sticky bit chính là giải pháp cho vấn đề này. Sticky bit được thể hiện bởi ký tự `t`, thay thế cho ký tự `x` trong phần permission của others. Và nó chỉ hoạt động với directory, chứ không có ý nghĩa gì khi set trên một normal file. 

Sticky bit sẽ rất hữu dụng trong trường hợp bạn có một folder share bởi group. Tức bạn có thể set quyền write cho group, và members thuộc group đó có thể đọc các content, và tạo ra content mới, tuy nhiên chỉ có người tạo ra file mới có thể xóa nó được mà thôi, còn những người khác thì chỉ có thể đọc. Ví dụ như bạn sẽ thấy thư mục `/tmp` sẽ có sticky bit này.

```
thangtd@localhost:~$ ls -l /
drwxrwxrwt  11 root root  4096 May 31 15:46 tmp
```

Như ở trên ta có thể thấy giá trị `x` của phần others được thay thế bằng ký tự `t`, biểu thị đây là thư mục được set sticky bit. Cùng với việc quyền của user, group, other đều là full, thế nên ai cũng có thể vào trong thư mục này, tạo ra một file mới, tuy nhiên chỉ có người owner mới có thể xóa file mà mình đã tạo ra mà thôi, bạn vào `/tmp` mà xóa file của người khác, là sẽ gặp lỗi ngay :joy: 

Và do được biểu thị bằng ký tự `t` ở phần others, nên bạn có thể set sticky bit bằng symbolic mode theo cách sử dụng câu lệnh `chmod o+t`

### Set Group ID
Set Group ID, hay còn được viết tắt là Set GID, hay SGID, là một special permission khác, có thể được đặt lên cả file (trong trường hợp file đó có thể thực thi được) cũng như directory. Khi được set lên file, và thực thi file đó, thì nó sẽ khiến process được thực thi dưới quyền hạn của group của file, thay vì owner của file. Còn khi được set lên thư mục, nó sẽ khiến các file được tạo ra bên trong nó kế thừa group của thư mục cha. 

Ví dụ như bạn có một thư mục với SGID, khi user tạo ra một file mới, thì file đó sẽ được tự động assign vào group của directory, thay vì group của user. Với cách này thì tất cả các users nằm trong group của thư mục cha sẽ đều có permissions cho tất cả các files ở bên trong thư mục đó.

SGID được biểu thị bằng ký tự `s`, thay thế cho ký tự `x` ở phần permissions của group. Theo đó thì bạn có thể bật nó lên bằng cách dùng `chmod g+s`. Nếu bạn đặt SGID cho một file mà không có quyền thực thi bởi group của nó, thì bit này sẽ được hiển thị bằng chữ `S` (in hoa, thay vì in thường), như một cách để cảnh báo rằng file không thể thực thi.

```
thangtd@localhost:~$ chmod g+s test
thangtd@localhost:~$ ls -l test
-rw-r-Sr-- 1 thangtd thangtd 5 May 31 15:20 test
```

### Set User ID
Set User ID, hay còn được viết tắt là Set UID, hay SUID là một special permission được đặt lên cho một file có thể thực thi. Nó báo cho hệ thống biết rằng khi file này được chạy, thì process sẽ được thực thi dưới quyền của owner của file, thay vì người dùng thực tế gõ câu lệnh chạy file đó. Chức năng này hay được sử dụng khi chạy ứng dụng đòi hỏi quyền root để có thể access vào một số file quan trọng của hệ thống, tuy nhiên bạn lại không muốn cấp cho người dùng quyền root chỉ để chạy ứng dụng này, hoặc vì một lý do nào đó người dùng cần chạy ứng dụng này ngay cả khi họ chỉ là người dùng bình thường.

Ví dụ như câu lệnh `passwd` chẳng hạn. Đây là một command được set UID. Nó là một câu lệnh cho phép người dùng thay đổi password của mình. Và thông tin này (sau khi mã hóa) sẽ được lưu lại trong file `/etc/shadow` (ở một bài khác chúng ta sẽ tìm hiểu kỹ hơn về phần này nhé). Nếu bạn check file `/etc/shadow` bạn sẽ thấy nó có quyền là 640, với owner là root, và group là shadow. Tức nếu không có quyền root, thì bạn không thể đọc, hay ghi file này. Là others, bạn chẳng có quyền gì với file này cả.
```
thangtd@localhost:~$ ls -l /etc/shadow
-rw-r----- 1 root shadow 1245 Oct 19  2021 /etc/shadow
```

Về mặt logic thì đương nhiên một câu lệnh dành cho người dùng đổi password của mình, thì hệ thống không thể yêu cầu người dùng đó phải có quyền ... root được rồi nhỉ :joy: Thế nên SUID mới được sử dụng, và bất kỳ user nào cũng có thể gọi nó, để thay đổi password của mình. Và khi bạn dùng câu lệnh `passwd` thì process được tạo ra sẽ được chạy với quyền hạn của owner của file này, tức là root. Mà được chạy dưới quyền root, thì lúc đó có thể access được vào file `/etc/shadow` để mà update nội dung rồi.

```
thangtd@localhost:~$ which passwd
/usr/bin/passwd
thangtd@localhost:~$ ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 68208 May 28  2020 /usr/bin/passwd
```

Giống như SGID thì SUID cũng được biểu thị bằng ký tự `s`, thay thế cho ký tự `x`, nhưng là ở phần permissions của owner. Theo đó thì bạn có thể bật nó lên bằng cách dùng `chmod u+s`. Nếu bạn đặt SUID cho một file mà không có quyền thực thi bởi owner của nó, thì bit này sẽ được hiển thị bằng chữ `S` (in hoa, thay vì in thường), như một cách để cảnh báo rằng file không thể thực thi.

### Special permission trong Octal Mode
Như ta đã thấy thì chúng ta có 3 special permission, và khi được set thì chúng sẽ thay thế permission `x` của lần ượt owner (với SUID), group (với SGID) và others (với sticky bit). Nếu ta gộp 3 special permission này lại để biểu diễn bằng 3 bit, thì ta sẽ được thêm một số trong hệ cơ số 8 nữa. Đây chính là chữ số đứng đầu tiên trong trường hợp mà bạn gặp phải permission được biểu diễn bằng 4 chữ số.

Ví dụ với permission 0755, thì special permissions được biểu diễn bằng số 0, tức cả 3 special permission đều không được bật. Với permission là 4755, thì special permission sẽ được biểu diễn bằng số 4, tương ứng với `100`, hay nói cách khác là bit đầu tiên, tức SUID được bật, còn 2 bit còn lại là SGID và sticky bit là tắt.

Khi set permission bằng `chmod`, ngoài việc dùng các ký tự đặc biệt là `t` và `s` để set special permission, thì bạn cũng có thể viết permission dưới dạng 4 chữ số như ở trên, với số đầu tiên biểu diễn trạng thái của special permission.

## Tổng kết
Như vậy là trong bài viết này chúng ta đã đi qua một lượt về permission và ownership trong Linux rồi. Cũng khá là dài, với nhiều concept phức tạp ý chứ nhỉ:
- Câu lệnh `ls -l`
- Các loại filetypes
- Câu lệnh `chgrp` và `chown`
- Permission với file và directory
- Permission level, từ owner, group cho đến others
- Symbolic mode Permission vs Octal mode Permission
- `umask`
- Sticky bit
- Set Group ID
- Set User ID
Chắc là bạn sẽ cần thực hành, ngồi gõ thử nghiệm trên terminal của mình nhiều để có thể nhớ được hết chúng đấy.

Hẹn gặp lại các bạn trong các bài tiếp theo của series **Become a SuperUser** này nhé :wink: 

## Reference
- https://linuxize.com/post/umask-command-in-linux/
- https://learning.lpi.org/en/learning-materials/101-500/104/104.5/104.5_01/
- [LPIC-1 Linux Professional Institute Certification Study Guide, 5th Edition](https://www.amazon.com/LPIC-1-Linux-Professional-Institute-Certification/dp/1119582121)