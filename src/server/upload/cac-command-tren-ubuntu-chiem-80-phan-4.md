Sau một kì nghỉ tết trong thời buổi đại dịch vừa qua. Không còn những buổi dong chơi đi chúc tết nữa. Ở nhà ra số tiếp theo cho anh em đây.

![](https://images.viblo.asia/fc8dcf65-1d7c-4261-b3eb-7f19eaf1f353.jpg)

Nào tiếp tục seri 20% command line sử dụng nhiều nhất. Bạn có thể xem phần trước tại [đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-3-yMnKM2kmZ7P).

Dưới đây sẽ là 2 command được sử dụng nhiều nhất khi sử dụng file. Liên quan đến quyền truy cập: chown - chmod.

# chown
Mọi file/directory trong Hệ điều hành như Linux, macOS (và mọi hệ thống UNIX nói chung) đều có khái niệm chủ sở hữu - chủ sở hữu với file/directory đó. Chủ sở hữu - owner có thể làm mọi thứ với tệp đó, có toàn quyền. Owner (hoặc root user) có thể thay đổi owner của file/directory bằng cách sử dụng câu lệnh chown:

```
chown <owner> <file>
```
 Khi chưa đổi owner thì file dưới đây owner là user và không thể ghi dữ liệu vào được.
 
 ![](https://images.viblo.asia/f59d6474-a845-4a7a-ac48-194b9c15264e.png)

Sử dụng chown với owner là nghiemtuan

![](https://images.viblo.asia/2ca6a1b0-04ff-49c6-83b0-affb7d15f4a6.png)

Cách sử dụng trên cho phép owner của directory, nhưng chỉ đổi được owner của thư mục đó. Để thay đổi owner của các thư mục/file con có trong directory đó sử dụng thêm cờ `-R`

```
chown -R <owner> <file>
```

Các file/directory không chỉ có owner mà có cả nhóm sở hữu - group. Thay đổi group bằng cách thêm group cần chuyển `:<group>`

```
chown -R <owner>:<group> <file>
```

Hoặc cũng có thể chỉ thay đổi group bằng câu lệnh:

```
chgrp <group> <filename>
```

# chmod
Mọi file/directory trong Hệ điều hành như Linux, macOS (và mọi hệ thống UNIX nói chung) đều có 3 quyền: Read, Write, Execute. Sử dụng câu lệnh `ls -al` hoặc `ll` để xem toàn bộ thông tin của file/folder.

![](https://images.viblo.asia/6f17cf3a-6f04-4393-86dd-fb3e151c4f31.png)

Các chuỗi kì lạ -rw-rw-r-- xác định quyền của file/directory. Cụ thể:

* Kí tự đầu tiên có biết loại: - là file, d là directory, l là link
* Mỗi cụm 3 kí tự tiếp theo (rw-): xác định quyền có thể thực hiện được đối với file này lần lượt theo thứ tự 3 cụm thể hiện quyền của owner - group - other. Mỗi cụm được tạo bởi 3 kí tự rwx (Read-Write-Execute).

Để thay đổi quyền này sử dụng câu lệnh `chmod`, có 2 các để xác định quyền:

* Sử dụng symbolic arguments: cú pháp `chmod <chuoi>` với `<chuoi>` là tổ hợp của `<augo>` `-+` `rwx`

a - all

u - user

g - group

o - others

`-` bớt permisstion

`+` thêm permisstion

`rwx` permissions

ví dụ:

```
chmod a+r filename #everyone can now read
chmod a+rw filename #everyone can now read and write
chmod o-rwx filename #others (not the owner, not in group)
chmod og-r filename #other and group can't read any
```

* Sử dụng numeric arguments: sử dụng cách này nhanh hơn bằng cách sử dụng cụm 3 số, mỗi số thể hiện cho từng cá nhân, lớn nhất là 7 và nhỏ nhất là 0. Trong đó:

`1` - Execute

`2` - Write

`4` - Read

=> Có các kiểu tổ hợp:

0 no permissions

1 can execute

2 can write

3 can write + execute (2 + 1)

4 can read

5 can read + execute (4 + 1)

6 can read + write (4 + 2)

7 can read, write and execute (1 + 2 + 4)


Chúng ta sẻ sử dụng cặp 3 số để thể hiện owner - group - other: vd

```
chmod 777 filename
chmod 755 filename
chmod 644 filename
```

# umask
Khi bạn đang đứng ở 1 thư mục nào đó và tạo 1 file mới, khi đó bạn không cần phải xác định quyền trước. Quyền đã có trước, được lấy từ quyền của thư mục cha cho tệp mới tạo. Để hiển thị được thông tin của quyền hiện tại nếu tạo file sử dụng câu lệnh:

```
umask
```

![](https://images.viblo.asia/437486b9-ff45-4800-87da-e0afe6b473fb.png)

Tại sao là `002`. Bạn thử lấy 777 - 775 mà xem có gì đặc biệt không? ồ. Cái thư mục cha (test) có quyền là 775 nên umask (hiểu là ngược lại của chmod) là lấy 777 trừ đi quyền hiện tại là ra. Nếu khó hiểu sử dụng thêm đối số `-S` đỡ phải nghĩ.

![](https://images.viblo.asia/125ca145-52e9-4194-ac1f-3c9efdb2c2ac.png)

# du
Câu lệnh này sẽ tính toán kích thước của thư mục hiện tại.

![](https://images.viblo.asia/13dd9dec-a1ea-47b2-9015-8fb3590718ea.png)

Số 8 ở đây là kích thước của thư mục tính theo bytes.

Sử dụng `du *` để tính kích thước của các file có trong thư mục.

![](https://images.viblo.asia/b6af3b44-8d90-40b0-a9fa-751272467a35.png)

Ngoài ra có các option khác như: `du -m` - Đơn vị MegaBytes, `du -g` - Đơn vị GigaBytes, `du -h`

# df
Lệnh này được sử dụng để lấy thông tin usage disk. Dạng cơ bản của nó sẽ in thông tin về các disk được gắn:

![](https://images.viblo.asia/01756b2e-733d-4250-a999-51f391d67586.png)

Sử dụng với option `-h` để dễ đọc hơn.

![](https://images.viblo.asia/14bbba9d-e2de-485f-935e-737f4f606ab1.png)


# Basename & Dirname
Lấy thông tin đường dẫn như tên gọi với cú pháp:

```
basename <path>
dirname <path>
```

-----

Done. Đây là phần 4 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 5 [link ở đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-5-eW65Gm8aZDO). Cảm ơn mọi người đã quan tâm.