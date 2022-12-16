Trước đây khi học ở trường, có một số môn mình phải làm bài tập bằng ubuntu. Nhưng cũng chỉ là biết qua sử dụng thế nào. Khi cần sử dụng thực tế mình cũng chỉ biết search google rồi copy từng dòng một. Sau một thời gian sử dụng, mình bắt đầu tìm hiểu và hiểu dần ra một số thứ. Những thứ này chả ai nói cho mình biết cả, cảm giác như ai cũng biết vì nó cơ bản quá rồi. Và giờ thì mình viết bài nói toàn tứ ai cũng biết vậy.
# 1 Phân quyền cho file
```
$ chmod 777 filename
```
Chắc chả ai còn lạ gì cái chmod này nhỉ, nhưng mà có ai bảo bạn cái 777 hay 755 là gì không. Chắc là không vì giờ cũng chưa ai bảo mình cả. Kiểu như mặc định ai cũng biết. Vậy thì giải thích một chút.
Khi bạn gõ `ls -la` hoặc ngắn gọi là `ll`, bạn sẽ nhận được list file trong thư mục đại loại thế này.
```
$ ll
total 68K
drwxr-xr-x  5 sandy sandy 4,0K Thg 3 30 16:25  Desktop
-rw-r--r--  1 sandy sandy  435 Thg 4  4 00:04  docker-compose.yml
drwxr-xr-x  5 sandy sandy 4,0K Thg 3 27 13:44  Documents
drwxr-xr-x  4 sandy sandy 4,0K Thg 4 16 14:57  Downloads
```
Bạn có thể thấy phần phân quyền có có dạng `drwxrwxrwx`. Đầu tiên là định dạng của tệp `d` là directory. Ngoài ra có `l` là link, và một vài định dạng khác. Và theo sau đó là 3 cụm `rwx` trong đó r là read, w là write, x là execute. Mỗi cụm sẽ là bộ 3 bit với 1 là enable, 0 là disable. Dễ thấy là nếu enable toàn bộ sẽ là 111 = 7, hoặc `r-x` chỉ cho đọc và thực thi nhưng không cho ghi sẽ là 101 = 5.

Vậy thì 755 sẽ là `rwxr-xr-x`, Giờ thì bạn biết cách đánh số khi phân quyền rồi đấy.
# 2 SSH key
Hồi mới đi làm, mình không biết gì về server, cũng chả động vào làm gì, chỉ code local rồi đẩy lên thôi. Nhưng khi bắt đầu phải động vào thì mình được TL bảo "gửi ssh key cho anh để add vào". À và tất nhiên với 1 thằng mới vào thì "ssh key là cái gì ạ?".

Cơ bản thì ssh key là 1 cặp private và public key sẽ được dùng thay password khi ssh. Mình cũng chả đi sâu vào cơ chế mã hoá bên trong làm gì. bạn chỉ cần sinh cặp này bằng cách:
```
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/sandy/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/sandy/.ssh/id_rsa.
Your public key has been saved in /home/sandy/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:TO+dsOPISqqThDqdKaEbxopgmqEOgf6JOwNDZbSSy1k sandy@sandyy
The key's randomart image is:
+---[RSA 2048]----+
|  ..             |
|  .o.            |
| ooE    .        |
|o.=    o .       |
|+=      S o      |
|B..      . + .   |
|OX +  .   + o    |
|#*O .o . o .     |
|OB==. ..o .      |
+----[SHA256]-----+
```
Và copy nội dung trong file ~/.ssh/id_rsa.pub add vào server là bạn có thể ssh được.

Ngoài ra ssh key còn được sử dụng khi bạn authen vào github và làm deploy key trên server. Khá nhiều ứng dụng nếu bạn chịu tìm hiểu.
# 3 Command pipe
Lúc trước cứ khi làm 1 task là mình lại checkout ra một branch mới. Dần dần đống branch local dài cả dặm, rồi thì phải ngồi xóa, nhưng mà xóa từng cái thì có đến mai vì chỉ biết lệnh xóa từng branch một. Đầu tiên mình cố tìm xem git có câu command nào xóa hết các branch. Và mình tìm được 1 cái thế này:
```
git branch | grep -v "master" | xargs git branch -D
```
Và magic ở đây là dấu `|`, nó sẽ làm output của câu lệnh trước thành input ở câu lệnh sau. Nếu quen cách sử dụng thì thực sự có nhiều trò tiện lợi mà cái dấu này mạng lại. Ví dụ như, lọc 1 file log to đùng chỉ lẩý vài hôm nay:
```
cat development.log | grep "2020-04-22"
```
Copy 1 loạt file:
```
ls | grep ab | xargs cp -t files/
```
Ngoài ra còn 1 đống các dấu đặc biệt mà chắc bạn cũng có thể sẽ cần.  [https://www.howtogeek.com/439199/15-special-characters-you-need-to-know-for-bash/](https://www.howtogeek.com/439199/15-special-characters-you-need-to-know-for-bash/)