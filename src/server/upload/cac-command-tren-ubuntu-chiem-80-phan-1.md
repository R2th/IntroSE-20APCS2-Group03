"Lập trình viên thì nên mua máy cấu hình như thế nào?"

"Em đang học code thì nên mua máy cấu hình như thế nào?"

"Lập trình viên thì nên sử dụng hệ điều hành nào?"

....

Trong vô vàn các câu hỏi khác dành cho những thế hệ đã đi qua trên con đường vọc code. Với 2 câu hỏi đầu tiên thì câu trả lời mà mình từng được nghe đó chính là chỉ cần có máy tính có thể note và truy cập internet để học hỏi là có thể dùng được rồi nhé. Tuy nhiên tùy từng điều kiện mà mua máy tốt yếu (kiểu gì dùng cao cấp cũng thích hơn, nhưng cứ có máy tính là đã học được code rồi nhé). Tại vì sao giờ cloud đầy hầu như các dịch vụ đều hướng đến triển khai trên cloud ví dụ như Word, excel, drive.... bla bla. Nên xin thưa nếu bạn hỏi là máy cấu hình abcxyz có đủ để học code không thì thay vào đó bạn nên hỏi là bạn có đủ điều kiện mua nó về không. Nếu bạn dư giả có thể mua con gaming 40 củ về xem iu túp cũng dc chả sao.

Còn về câu hỏi hệ điều hành nào thì mình suggest nên sử dụng ubuntu (hoặc họ hàng nhà linux - ubuntu kali là điển hình). À nếu có điều kiện sử dụng macbook code cũng dc. À quên khoe bạn mình vừa mua lại con Mac 2016 mượn sài đỡ thấy mê =)):grinning:. Tại sao? Thì bởi vì hầu hết các server hiện cũng đang sử dụng hệ điều hành họ hàng nhà linux. Nêu sử dụng giống với server là ngon nhất, mà còn mượt nhất. Như mình hiện tại đang doal boot mà thực ra là three boot cả windown, ubuntu và kali. Mình set ubuntu làm mặc định, nên khi vào ubuntu là chiến luôn. Ít khi quay trở lại win chỉ khi nào thỉnh thoảng viết doc chuẩn chỉnh thì quay lại win, cơ mà hễ quay lại win thì thôi rồi máy nó gào lên, lag lag ko để đâu hết. Còn ẻm kali thì để vọc vạch mạng nhà hàng xóm em xinh xinh có ny chưa =)):grinning:.

Đấy các bạn thấy hết được ưu điểm của hệ điều hành họ hàng nhà linux rầu đó. Còn chần chờ gì nữa. Thì đó bài này mình sẽ làm 1 đến 2 bài tổng hợp lại ***learn in 20% of the time the 80%*** khoảng 80% câu lệnh hay dùng. Các bài viết này sẽ không cố gắng thử tất cả mọi thứ mọi command vì nó có quá nhiều, và mình sẽ hướng đến ubuntu. Let go =)):grinning:

-----

### man

Đây là command đầu tiên mình muốn giới thiệu, nó là một command giúp bạn hiểu tất cả các command khác. Cú pháp `man <command>` - trong đó command là command bạn cần tìm hiểu.

![](https://images.viblo.asia/32a2330c-b546-4573-9f8f-7484516ef096.png)

Trên là giải thích của man command với cú pháp `man man`

![](https://images.viblo.asia/8edc887b-dc42-4df9-9f71-e587ebb12a6d.png)

Trên là giải thích của ls command chứa cú pháp và các options

Ngoài ra các bạn có thể học các command một cách nhanh chóng hơn và dễ hiểu hơn bằng cách tìm kiếm command trong trang này [tldr](https://tldr.ostera.io/) Trang này mình cho là rất dễ hiểu.

### ls

Đây là command cho phép liệt kê các file và thư mục trong một đường dẫn nào đó. Cú pháp: `ls path-to-folder`

![](https://images.viblo.asia/537daa3e-da6d-4fd0-acfd-5ef765810ef2.png)

Command này cho phép một vài options. Tuy nhiên có 1 option hay sử dụng nhất là `ls -la path-to-file` nó cho phép lấy thông tin quả tất cả file và thư mục kể cả file ẩn và quyền của các file.

![](https://images.viblo.asia/53bafd52-13aa-42ff-866e-7c62b3909c2e.png)

Các thông tin bao gồm:

* file permissions
* number of links đến file
* ower của file
* group của file
* file size (bytes)
* file modified datetime
* file name (file ẩn sẻ có dấu . liền trước)

### cd

Đây là command cho phép thay đổi current working directory.

### pwd

Với một công giao diện dòng lệnh như ubuntu sẽ có nhiều lúc bạn sẽ quên mất mình đang đứng ở vị trí nào. Thì câu lệnh này sẽ giúp bạn biết bạn đang đứng ở đâu. Cú pháp: `pwd`

![](https://images.viblo.asia/e8800b60-9936-4726-9175-0f2b44db5a60.png)

Nhưng như vậy có vẻ chưa đủ nếu không cài hỗ trợ vào thì giao diện sẽ như thế này: 

![](https://images.viblo.asia/a304bec7-5f92-4f9e-973b-ea10e4bfe84b.png)

Thế chả nẽ mỗi lần quên lại ấn pwd à. no no =)) Bạn nên cài thêm hỗ trợ này: [Z-shell](https://casparwre.de/blog/zsh-in-ubuntu-1804/). Bạn sẽ có giao diện như trên luôn có đường dẫn hiện tại và sẽ có nhiều gợi ý khác bạn tự tìm hiểu nhé. :grinning:

### mkdir

Bạn có thể tạo folders sử dụng câu lệnh này. Cú pháp: `mkdir path-to-folder1 path-to-folder2 path-to-folder3`

Bạn cũng có thể tạo nhiều folders có cả thư mục con bên trong bằng cách thêm option: `-p`

```
mkdir -p fruits/apples
```

### rmdir

Câu lệnh phía trên là câu lệnh tạo, thì bây giờ là câu lệnh xóa. Command này dùng để xóa folders với điều kiện các thư mục đều pahir rỗng không chứa bất kì file nào (tránh việc xóa nhầm). Cú pháp: `rmdir path-to-file`

Nhưng mình thì thích xóa luôn thì có được không? Được chứ sao không. Thì mình ưa dùng câu lệnh này, cho bay màu thẳng luôn. `rm -rf path-to-file`

### mv

Câu lệnh này là câu lệnh cho phép di chuyển 1 file đến 1 đường dẫn mới hoặc cho phép đổi tên file. Cú pháp: `mv path-to-file path-to-new`

### cp

Câu lệnh này cho phép copy một file đến 1 đường dẫn nào đó. Cú pháp: `cp path-to-file path-to-new-folder`

Để copy folders sử dụng thêm option `-r`: `cp -r path-to-file path-to-new-folder`

### touch

Câu lệnh này dùng để tạo 1 file empty. Cú pháp: `touch <file>`

Nếu file này đã tồn tại thì file sẽ ở chế độ write mode và timesamp sẽ được update ngay.

![](https://images.viblo.asia/193fcec1-423b-4d42-b420-d019610ff14d.png)

### find

`find` command có thể được sử dụng để tìm kiếm các flie hoặc folders phù hợp với keyword có trong hệ thống - tìm kiếm cả trong thu mục con. Cú pháp: `find path keyword options`

Học qua một vài ví dụ:

* Để tìm kiếm tât cả các file có phần mở rộng là ".js" và in ra relative path của các file: `find / -name "*.js"`.

![](https://images.viblo.asia/fee34011-0c01-4fdc-bdb5-b671088479a1.png)

Và đây là hậu quả, may là mình ấn nhanh nhá không thì kết quả là rất là dài =)):grinning:

* Tìm kiếm các thư mục (-type d) viết tắt là directory, có tên là src: `find / -type d -name src`

![](https://images.viblo.asia/e6209920-011a-4955-be9c-ff9e3ed3c7d8.png)

* Tìm kiếm trong nhiều thư mục

```
find folder1 folder2 -name filename.txt
```

![](https://images.viblo.asia/33263249-316f-4250-9385-c0840062e031.png)


* Tìm kiếm với nhiều điều kiện `-or`:

```
find . -type d -name node_modules -or -name public
```

![](https://images.viblo.asia/5baf59d0-9016-4fb4-9c0f-994470f03fc0.png)

* Tìm kiếm file có nhiều hơn 100 bytes:

```
find / -type f -size +100c
```

![](https://images.viblo.asia/7b4254c6-85a2-4fa9-bab6-dd46a2c10f80.png)

* Tìm kiếm các file được edit trong 24 giờ qua:

```
find . -type f -mtime -1
```

vân vân và mây mây. Các bạn có thể tìm hiểu thêm các options bởi câu lệnh `man` nhé.

-----

Done. Đây là phần 1 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 2 link [ở đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-2-Qpmlebdo5rd). Cảm ơn mọi người đã quan tâm