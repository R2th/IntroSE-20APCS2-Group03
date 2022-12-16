![](https://images.viblo.asia/ab35ae3d-e05f-4ad9-91c2-1da581b286c3.jpeg)
Bash command là một công cụ khá hữu ích cho bất kỳ ai đặc biệt là developer. Nó giúp bạn tương tác với hệ thống tốt. Trong bài này mình sẽ giới thiệu một số lệnh command line khá hữu ích trên terminal.

## ls
Hiển thị danh sách các folder, tên file ở vị trí thư mục bạn đang làm việc.

**$ ls -a** : Hiển thị toàn bộ file, folder kể cả file ẩn.

**$ ls -A**: Hiển thị toàn bộ file kể cả file ẩn. Ngoại trừ thư mục trên cùng.

**$ ls -F**: Thêm / cuối tên các file, thu mục

**$ ls -S**: Hiển thị danh sách các file, folder được sort by file size.

**$ ls -al**: Hiển thị danh sách tất cả các file, folder kể cả file ẩn chứa đầy đủ thông tin như permission, update time ...

**$ ls -l** : Hiển thị danh sách tất cả các file, folder không bao gồm file ẩn và chứa đầy đủ thông tin như permission, update time ...

**$ ls -nl**: Hiển thị danh sách tất cả các file, folder không bao gồm file ẩn và chứa thông tin permission, user id, update time ...

**$ ls -c**: Hiển thị các folder và file name theo cột

## ENV
Hiển thị danh sách các biến môi trường cho user hiện tại.

**$ env**

## CHMOD
Dùng thay đổi permissions của file hoặc thư mục.

**$ chmod 777**: Mọi người đều có thể đọc ghi và thực thi trên folder, file đó.

**$ chmod 755**: Mọi người có thể đọc và thực thi trên chúng. Nhưng chỉ có root mới có thể thay đổi.

**$ chmod 700**: chỉ root mới có thể làm bất kì điều gì với chúng.

## CHOWN
Thay đổi quyền sở hữu với file và directories.

**$ chown --help && chown --version**: để xem hướng dẫn sử dụng lênh chown và version của nó.

ex:`chown tienpm myfile.txt `: chuyển quyền sở hữu myfile cho tienpm.

## GREP
Tìm kiếm tệp.

```
grep 'word' filename
grep 'word' file1 file2 file3
```

**$ grep -i "keyword" file.txenables** tìm kiếm không phân biệt chữ hoa chữ thường.

**$ grep -R "192.168.1.5" /etc/** tìm kiếm tất cả các file folder có chứa "192.168.1.5"
```
/etc/ppp/options:# ms-wins 192.168.1.50
/etc/ppp/options:# ms-wins 192.168.1.51
/etc/NetworkManager/system-connections/Wired connection 1:addresses1=192.168.1.5;24;192.168.1.2;
```

# OPEN
Mở folder hiện tại bằng finder.

`$ open .`

## PWD
Hiển thị tên thư mục hiện tại.

`$ pwd`

## CD
Thay đổi folder hiện tại đang làm việc.

**$ cd /**: Di chuyển về root

**$ cd ..**: Di chuyển tới folder cha

**$ cd ../../**: Di chuyển tới folder ông =))

**$ cd path:**: goes to the user's home directory when executed without the parameter

**$ cd ~**: Di chuyển thư mục tới ~/

## HOME
Hiển thị path của thư mục chính.

**$ echo $HOME**

## NANO
Trình soạn thảo văn bản trên terminal, cho phép bạn chỉnh sửa file.

`$ nano myscript.sh`

## FIND
Tìm kiếm file và folder

**$ find directory -name filename:** Tìm kiếm file theo tên

## MKDIR
Tạo folder bằng lệnh

**$ mkdir foldername**: Tạo một folder trong folder hiện tại.

## RM
Xoá file, folder

**rm -f file:** xoá file mà không cần confirm trước khi xoá

**rm -i file:** Nhắc trước khi xoá file 

**rm -r directory:** xoá thư mục và các file chứa trong thư mục

**rm -v file:** Hiển thị thông tin file được xoá trong quá trình xoá.

**rm -rf:** xoá được cả file, folder

## RMDIR
Xoá folder và chỉ làm việc nếu folder đã rỗng.

`rmdir -p directoryname`

## TOUCH
Tạo mới hoặc mở 1 file và không lưu những thay đổi trên file đó.

**$ touch -a file:** Cập nhật thời gian truy cập tệp.

**$ touch -c file:** nếu file chưa tồn tại thì tạo mới file

$ touch -m file: Thay đổi thời gian sửa đổi tập tin

$ touch -t file: Thay đổi thời gian truy cập hoặc thay thế tệp theo quy định

## CAT
Hiển thị nội dung file

**$ cat -n file:** Hiển nội dung của tệp trên màn hình bằng cách gán số cho tất cả các dòng

Đây là một số lệnh mà mình thấy khá hữu ích trên terminal.