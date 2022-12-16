# Introduction
> Command line là một công cụ vô cùng mạnh mẽ cho bất cứ ai sử dụng linux. Mặc dù các distro của linux sử dụng các giao diện rất đẹp để quản lý, nhưng tôi cam đoan là việc bạn hiểu biết về command line sẽ giúp ích bạn rất nhiều trong quá trình sử dụng linux. Command line cho phép bạn làm được nhiều thứ mà bạn không làm được nếu chỉ sử dụng giao diện, ví dụ như viết các đoạn script tự động phục vụ một công việc nào đó chẳng hạn.

`Sau khi đọc được bài viết của mình thì bạn có thể mở ngay terminal ra và thực hiện một vài thao tác cơ bản sau đây nhé`

# Moving around with file system
`Phần này bao gồm các lệnh giúp bạn làm việc với file như tạo, xóa, đổi tên, di chuyển file hay thư mục, thay đổi quyền...`

#### 1. Xem thư mục hiện tại
```shell
tunguyen@notebook:~$ pwd
```
#### 2. Thay đổi thư mục
```shell
tunguyen@notebook:~$ cd workspace/demo
```
Bạn có thể sử dụng dấu ngã (~) để chuyển tới thư mục gốc của bạn, dâu hai chấm (..) để chuyển tới thư mục cha. Đường dẫn có thể là tương đối hoặc tuyệt đối.

#### 3. Tạo thư mục mới
```shell
tunguyen@notebook:~$ mkdir test
```
Bạn đã tạo ra một thư mới tên là test
#### 4. Xem nội dung của thư mục hiện tại
```shell
tunguyen@notebook:~$ ls
```
Hoặc bạn có thể xem nội dung của thư mục bất kì bằng cách chỉ đường dẫn đến thư mục đó như sau:
```shell
tunguyen@notebook:~$ ls /home/tunguyen/Downloads
```
Để xem các quyền liên quan đến các file trong thư mục thì sử dụng thêm `-l` hoặc xem cả các file ẩn trong thư mục sử dụng `-a`.
#### 5. Thay đổi quyền
```shell
tunguyen@notebook:~$ chmod 777 /home/tunguyen/workspace/demo
```
Như ví dụ trên sẽ cấp quyền đọc, ghi và thực thi quyền đó đối với owner, group... `chmod` được sử dụng để thay đổi quyền đối với các file và thư mục. 
#### 6. Thay đổi owner
```shell
tunguyen@notebook:~$ chown tunguyen /opt/traefik
tunguyen@notebook:~$ chown tunguyen:sudo /opt/traefik
```
chown được sử dụng để thay đổi owner của file hay thư mục. Dòng đầu tiên giúp ta thay đổi owner của folder `/opt/traefik` thành user `tunguyen`. Tuy nhiên nếu bạn muốn thay đổi owner của thư mục đó là cả user và group bạn có thể sử dụng dòng lệnh thứ hai.
#### 7. Di chuyển file hoặc thư mục
```shell
tunguyen@notebook:~$ mv file1 test/
```
Như vậy là ta chuyển file1 vào trong folder test. Nếu chuyển folder thì tất cả nội dung trong đó cũng sẽ được chuyển theo.
#### 8. Đổi tên file
```shell
tunguyen@notebook:~$ mv file1 file2
```
Đổi tên file1 thành file2.
#### 9. Copy file
```shell
tunguyen@notebook:~$ mkdir test2
tunguyen@notebook:~$ cp file1 test2/
```
Dòng dầu tiên ta tạo ra 1 folder mới tên là test2 rồi dòng thứ 2 ta copy file1 vào folder test2. Nếu muốn copy folder thì phải thêm `-r` vào sau (r là recursive).
#### 10. Xóa file
```shell
tunguyen@notebook:~$ rm file1
```
Đó là khi ta muốn xóa 1 file, nếu muốn xóa folder ta cần phải thêm `-r` vào.
#### 11. Tìm file
```shell
tunguyen@notebook:~$ locate .prisma
```
Lệnh trên sẽ hiển thị ra tất cả các đường dẫn mà nó tìm thấy file có tên là .prisma

# Manage process
#### 1. Xem các tiến trình
```shell
tunguyen@notebook:~$ ps
```
`ps` sẽ hiển thị ra tất cả các tiến trình đang chạy trong máy. Nếu muốn hiển thị chi tiết hơn bạn có thể thêm `-u` vào. Mặc định thì danh sách các tiến trình sẽ được sắp xếp theo số lượng CPU mà tiến trình đó đang sử dụng theo thứ tự giảm dần, bạn cũng có thể thay đổi điều kiện sắp xếp.
#### 2. Khởi chạy tiến trình chạy ngầm
```shell
tunguyen@notebook:~$ nano &
```
Thêm dấu và (&) vào để chuyển tiến trình đó sang chạy ngầm. Bởi vì đây là tiến trình đầu tiên nên nó sẽ trả ra số 1 còn số sau đó là process id.
#### 3. Xem tiến trình chạy ngầm
```shell
tunguyen@notebook:~$ jobs
```
`jobs` sẽ trả ra tất cả các tiến trình chạy ngầm trong máy. Tiến trình nào có dấu `+` thì đó là tiến trình cuối cùng.
#### 4. Kill tiến trình
```shell
tunguyen@notebook:~$ nano &
[1] 20390
tunguyen@notebook:~$ kill --SIGKILL 20390
[1]+  Killed                  nano
```
Nếu bạn muốn kill nhiều tiến trình có tên giống nhau bạn có thể sử dụng `killall <process-name>`, tuy nhiên hãy cẩn thận khi sử dụng `killall` bởi nó có thể kill nhiều tiến trình mà bạn không kiểm soát được.
# Manage group
#### 1. Tạo group mới
```shell
tunguyen@notebook:~$ groupadd superman
```
Tạo mới group tên là superman.
#### 2. Đổi tên group
```shell
tunguyen@notebook:~$ groupmod -n spiderman superman
```
Command đổi tên group từ `superman` thành `spiderman`.
#### 3. Xóa group
```shell
tunguyen@notebook:~$ groupdel spiderman
```
Command sẽ xóa group spiderman.
# Tips and tricks
Sử dụng command line cũng rất tiện và giúp chúng ta "chuyên nghiệp" hơn. Tiếp theo tôi xin giới thiệu một vài mẹo và thủ thuật nhỏ.
#### 1. Redirection
Mặc định thì tất cả command đều đọc và in ra kết quả ngay trên terminal, tuy nhiên bạn có thể thay đổi điều đó và điều chỉnh kết quả nhận đc. Ví dụ khi bạn gõ `ls` để liệt kê ra các file hoặc folder trong thư mục nào đó nhưng bạn không muốn in kết quả ra terminal mà muốn in kết quả đó vào file thì bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ ls /var > file1.txt
```
Command trên sẽ liệt kê nội dung trong folder /var và in vào file1.txt. Nếu bạn gõ lại command đó nó sẽ ghi đề nội dung file1.txt, bạn muốn nó ghi tiếp tục vào file đó chứ ko ghi đè bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ ls /var/lib >> file1.txt
```
Command trên sẽ liệt kê nội dung trong folder /var/lib và ghi thêm vào file1.txt
Đây là trường hợp đơn giản nhất, dưới đây là một vài lựa chọn để điều chỉnh kết quả nhận được từ terminal:

- 2> : sẽ chuyển lỗi nhận được từ terminal vào trong file.
- &> sẽ chuyển cả kết quả và lỗi nhận được vào trong file.
- < sẽ lấy nội dung nhận được từ một file chuyển thành command để chạy.

#### 2. Piping
`Piping cũng là một dạng của việc chuyển hướng output nhận được từ terminal, nhưng với piping kết quả nhận được từ terminal sẽ được dùng để chuyển tới cho command khác sử dụng. Bạn có thể chain nhiều command bằng cách sử dụng toán tử (|).`

Ví dụ nếu bạn muốn cuộn chuột để đọc hết nội dung một file bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ cat /etc/passwd | less
```
Command trên sẽ lấy nội dung file passwd và đưa vào trong less để xử lý tiếp.

#### 3. Bang bang
`Bang (!) bang cho phép bạn thực thi lại command trước đó.`

Ví dụ bạn muốn thực thi lại command ở trên mà ko muốn gõ lại bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ !!
```
Command trên sẽ thực thi lại command trước đó `tunguyen@notebook:~$ cat /etc/passwd | less` mà bạn không cần gõ lại dài dòng như trên.

Nếu bạn muốn thực thi một command trước đó bắt đầu bằng `cat` bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ !cat
```
Command trên sẽ trả ra kết quả của command `tunguyen@notebook:~$ cat /etc/passwd | less`
#### 4. Brace expansion
Nếu bạn muốn tạo 1 lúc nhiều file theo kiểu "file1", "file2", "file3"..."file10" mà không muốn phải gõ 10 lần thì bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ touch file{1..10}
```
Command trên sẽ giúp bạn tạo ra đúng 10 file từ file1 -> file10 mà bạn không cần gõ 10 lần. Bạn cũng có thể kết hợp brace expansion cho việc xóa tương tự như trên.

#### 5. Auto completion
Cái này cũng là 1 tips rất hay giúp bạn gõ đường dẫn hoặc tên file rất nhanh. Ví dụ bạn muốn cd đến một thư mục nào đó nhưng bạn không nhớ tên bạn có thể làm như sau:
```shell
tunguyen@notebook:~$ cd /var/[TAB]
backups/ cache/   crash/   lib/     local/   lock/    log/     mail/    metrics/ opt/     run/     snap/    spool/   tmp/
```
Nó sẽ giúp bạn nhìn thấy tất cả các thư mục hoặc file trong folder `var` để bạn có thể nhìn thấy và nhớ ra thư mục bạn muốn cd đến là gì, tên file bạn cũng có thể làm tương tự như thế. Khi dùng quen bạn sẽ thấy tính năng này rất hữu dụng trong thực tế.

# Conclusion
> Trên đây là một số command cơ bản mình hay sử dụng cũng như một số mẹo và thủ thuật mình thấy hữu ích trong quá trình sử dụng ubuntu mà mình đã tổng hợp lại. Hi vọng nó sẽ có ích cho các bạn trong quá trình sử dụng ubuntu.