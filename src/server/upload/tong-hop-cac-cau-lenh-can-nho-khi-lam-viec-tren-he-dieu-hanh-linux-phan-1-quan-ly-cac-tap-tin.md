## Mở đầu
Ngày nay, hệ điều hành **Linux** đang dần trở nên lớn mạnh. Đa số các máy chủ hiện nay đều sử dụng hệ điều hành này bởi các ưu điểm mà nó lại như bảo mật tốt, miễn phí, ... Tuy nhiên, để sử dụng được hệ điều hành **Linux** một cách thành thạo thì không phải một việc đơn giản.

**Linux** cung cấp một phần mềm tên là **Terminal** giúp chúng ta có thể chỉ thị cho máy tính thực hiện một tác vụ nào đó bằng các câu lệnh (command). Vậy tại sao chúng ta phải sử dụng các câu lệnh để thực hiện các tác vụ và mục đích của **Terminal** là gì? Đôi khi để thực hiện một tác vụ nào đó ví dụ như xóa một folder thay vì chúng ta phải làm nhiều hành động như tới folder cần xóa, click chuột phải rồi chọn xóa và chọn **yes** để confirm thì chúng ta có thể sử dụng **command line**, như vậy sẽ tiết kiệm thời gian hơn rất nhiều. Bạn có thể sử dụng câu lệnh để xóa file, di chuyển file, copy file, nén và giải nén thư mục, ...

Trong bài viết này, mình sẽ liệt kê các câu lệnh quan trọng và cần thiết khi sử dụng hệ điều hành **Linux**, cụ thể hơn là các câu lệnh về **quản lý các tập tin và thư mục**.

## 1. Di chuyển / liệt kê các tập tin
Hiển thị tên thư mục đang làm việc
```
$ pwd
```

Di chuyển đến thư mục ***/home/ngườidùng***
```
$ cd
```

Di chuyển đến thư mục ***/home/ngườidùng/Desktop***
```
$ cd ~/Desktop
```

Di chuyển đến thư mục cha của thư mục hiện hành
```
$ cd ..
```

Di chuyển đến thư mục ***/usr/apt***
```
$ cd /usr/apt
```

Liệt kê danh mục tập tin trong thư mục ***my_folder*** một cách chi tiết
```
$ ls -l my_folder
```

Liệt kê tất cả các tập tin, kể cả các tập tin ẩn (thường có tên bắt đầu bằng một dấu chấm)
```
$ ls -a
```

Liệt kê các thư mục nằm trong thư mục hiện hành
```
$ ls -d
```

Sắp xếp lại các tập tin theo ngày đã tạo ra, bắt đầu bằng những tập tin mới nhất
```
$ ls -t
```

Sắp xếp lại các tập tin theo kích thước, từ to nhất đến nhỏ nhất
```
$ ls -S
```

## 2. Tập tin và thư mục
Chép toàn bộ nội dung ***file1.txt*** sang ***file2.txt***
```
$ cp file1.txt file2.txt
```

Chép ***file.txt*** vào thư mục ***my_folder***
```
$ cp file.txt /my_folder
```

Chép toàn bộ nội dung của thư mục ***my_folder1*** sang thư mục ***my_folder2***
```
$ cp -r my_folder1 my_folder2
```

Thay đổi tên tập tin từ ***file1.txt*** thành ***file2.txt***
```
$ mv file1.txt file2.txt
```

Thay đổi tên thư mục từ ***my_folder1*** thành ***my_folder2***
```
$ mv my_folder1 my_folder2
```

Chuyển tập tin ***file.txt*** vào thư mục ***my_folder***
```
$ mv file.txt my_folder
```

Chuyển tập tin ***file1.txt*** vào thư mục ***my_folder*** đồng thời đổi tên tập tin thành ***file2.txt***
```
$ mv file1.txt my_folder/file2.txt
```

Tạo một thư mục mới tên là ***my_folder***
```
$ mkdir my_folder
```

Tạo ra thư mục cha ***my_folder1*** và thư mục con ***my_folder2*** cùng lúc
```
$ mkdir -p my_folder1/my_folder2
```

Xóa bỏ tập tin ***file.txt*** trong thư mục hiện hành
```
$ rm file.txt
```

Xóa bỏ thư mục trống mang tên ***my_folder***
```
$ rmdir my_folder
```

Xóa bỏ thư mục mang tên ***my_folder*** với tất cả các tập tin trong đó
```
$ rm -rf my_folder
```

Tìm tập tin mang tên ***my_file*** trong thư mục ***my_folder*** kể cả trong các thư mục con
```
$ find my_folder -name my_file
```

So sánh nội dung của 2 tập tin hoặc của 2 thư mục
```
$ diff file1.txt file2.txt
```

## 3. Nội dung các tập tin
Hiển thị nội dung của tập tin ***file.txt*** trên màn hình ở dạng mã ASCII
```
$ cat file.txt
```

Soạn tập tin ***file.txt*** bằng trình soạn **vi**
```
$ vi file.txt
```

Soạn tập tin ***file.txt*** bằng trình soạn **nano**
```
$ nano file.txt
```

Soạn tập tin ***file.txt*** bằng trình soạn **gedit**
```
$ gedit file.txt
```

Hiển thị các dòng chứa nội dung ***Hello world*** trong tập tin ***file.txt***
```
$ grep "Hello world" file.txt
```

Hiển thị các dòng chứa nội dung ***Hello world*** trong tất cả các tập tin nằm trong thư mục ***my_folder***
```
$ grep -r "Hello world" my_folder
```

Chép kết quả của một câu lệnh vào tập tin ***results.txt***
```
$ grep "Hello world" file.txt > results.txt
```

Chèn kết quả của một câu lệnh vào cuối tập tin ***results.txt***
```
$ grep "Hello world" file.txt >> results.txt
```

## 4. Nén và giải nén tập tin
Giải nén các tập tin có trong tập tin ***my_archive.tar***, đồng thời hiển thị các tên tập tin
```
$ tar xvf my_archive.tar
```

Giải nén các tập tin có trong tập tin ***my_archive.tar.gz*** dùng ***gzip*** và ***tar***
```
$ tar xvfz my_archive.tar.gz
```

Giải nén các tập tin có trong tập tin ***my_archive.tar.bz2*** dùng ***bzip*** và ***tar***
```
$ tar jxvf my_archive.tar.bz2
```

Tạo ra một tập tin ***my_archive.tar*** chứa các tập tin ***file1.txt*** và ***file2.txt***
```
$ tar cvf my_archive.tar file1.txt file2.txt
```

Tạo ra một tập tin ***my_archive.tar.gz*** dùng ***gzip*** để chứa toàn bộ thư mục ***my_folder***
```
$ tar cvfz my_archive.tar.gz my_folder
```

Tạo tập tin nén ***file.txt.gz***
```
$ gzip file.txt
```

Giải nén tập tin ***file.txt.gz***
```
$ gunzip file.txt.gz
```

Tạo tập tin nén ***file.txt.bz2***
```
$ bzip2 file.txt
```

Giải nén tập tin ***file.txt***
```
$ bunzip2 file.txt.bz2
```

## 5. Quyền truy cập tập tin
Thay đổi chủ sở hữu của tập tin ***file.txt***
```
$ chown [tên_người_dùng] file.txt
```

Thay đổi chủ sở hữu của thư mục ***my_folder***, bao gồm cả thư mục con ***(-R)***
```
$ chown [tên_người_dùng] my_folder
```

Chuyển tập tin ***file.txt*** thành sở hữu của một nhóm người dùng
```
$ chgrp [tên_nhóm] file.txt
```

Giao **(+)** quyền thực hiện **(x)** tập tin ***file.txt*** cho người dùng **(u)**
```
$ chmod u+x file.txt
```

Rút **(-)** quyền ghi **(w)** ***file.txt*** của nhóm **(g)**
```
$ chmod g-w file.txt
```

Rút **(-)** quyền đọc **(r)** tập tin ***file.txt*** của những người dùng khác **(o)**
```
$ chmod o-r file.txt
```

Giao **(+)** quyền đọc **(r)** và ghi **(w)** tập tin ***file.txt*** cho mọi người **(a)**
```
$ chmod a+rw file.txt
```

Giao **(+)** quyền đọc **(r)** và vào bên trong thư mục **(x)** ***my_folder***, kể cả tất cả các thư mục con của nó **(-R)**, cho tất cả mọi người **(a)**
```
$ chmod -R a+rx my_folder
```

## Kết luận
Trên đây là các câu lệnh về **quản lý các tập tin** trên hệ điều hành Linux, ở phần sau mình sẽ giới thiệu cho các bạn các câu lệnh về **quản trị hệ thống**, một phần không thể thiếu trong việc quản lý máy chủ. Cám ơn các bạn đã đọc bài viết của mình! :wink: