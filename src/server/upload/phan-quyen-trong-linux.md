## Giới thiệu

**Linux** là một hệ điều hành mã nguồn mở được rất nhiều người sử dụng. Nhiều người đã chuyển từ Windows sang Linux hay ngược lại, tuy nhiên khi chuyển sang một hệ điều hành mới thì gặp khó khăn trong việc làm quen với hệ điều hành mới cũng là điều dễ hiểu. Khi chuyển từ Windows sang Linux thì cấu trúc thư mục file trong Linux khác hoàn toàn so với Win, hay bạn phải làm quen với việc dùng lệnh để tối ưu hóa công việc và đặc biệt là phần **phân quyền trong Linux**. Bài này mình chia sẻ về phần phân quyền trong Linux, hi vọng nó sẽ giúp các bạn hiểu hơn về Linux và yêu thích nó hơn.

## Các khái niệm

Có 2 khái niệm rất quan trọng cần phải nhớ trong Linux đó là **permissions** và **ownership**.

### Ownership

Mỗi file hay thư mục trên Linux đều được gán bởi 3 loại chủ sở hữu là **user**, **group**, **other**
#### User

Theo như mặc định trên Linux thì người tạo ra file hay thư mục nào đó thì sẽ trở thành chủ sở hữu của chính nó, giống như việc một người A tạo ra một vậy B thì mặc định người A sẽ là chủ sở hữu của vật B đó.

#### Group

Một nhóm có thể chứa nhiều người dùng cùng một lúc. Tất cả người dùng trong một nhóm sẽ có cùng quyền truy cập vào file hay thư mục đó. Giả sử có một tài liệu học tập cho một lớp học mà bạn không muốn cho lớp khác biết, chỉ muốn chia sẻ trong lớp. Thay vì bạn cấp quyền cho từng người trong lớp thì bạn có thể gom tất những người trong lớp thành một nhóm người dùng và bạn gán quyền cho một nhóm người dùng đó để chỉ có những người trong nhóm đó mới có quyền truy cập vào tài liệu.

#### Other

Other là bất kỳ người dùng nào không thuộc vào 2 đối tượng phía trên. Xét lại ví dụ trên, bạn không phải là  thuộc nhóm lớp được truy cập vào tài liệu và bạn cũng không phải là người sở hữu tài liệu đó thì bạn được xét là other.

Bài toán đặt ra là làm sao để Linux phân biệt giữa ba loại người dùng này để người dùng A không ảnh hưởng đến một số file hay thư mục chứa thông tin hay dữ liệu của một người dùng B. Và đây chính là lúc **permissions**(quyền) được sử dụng để kiểm soát hình vi của người dùng.

### Permissions

Mỗi một file hay thư mục trong Linux đều có 3 quyền **đọc, ghi, thực thi** được xác định cho 3 chủ sở hữu ở trên.

+ **Đọc**: Nếu là một file thì quyền này cho phép bạn mở file đó lên và đọc. Nếu là một thư mục thì nó cho phép bạn liệt kê danh sách file hay thư mục trong thư mục đó.
+ **Ghi**: Quyền ghi cho phép bạn sửa đổi nội dung của file. Nếu là thư mục thì nó cho phép bạn có thể **thêm**, **xóa** và **đổi tên** các file trong thư mục đó.
+ **Thực thi**: Với Windows bạn có thể chạy với một file có đuôi ".exe" một cách dễ dàng. Khác so với Windows, trong Linux bạn không thể chạy khi nó không được cấp quyền thực thi. Còn đối với thư mục thì bạn không thể truy cập(cd) nếu bạn không có quyền thực thi nó.

## Thực hành

### Xem quyền
Để liệt kê, xem quyền và chủ sở hữu các file hay thư mục:
```bash
ls -l
```
Hình ảnh tổng quát nhất về quyền trong Linux:
![](https://images.viblo.asia/9aca144b-99e4-4d80-88f4-2568d8c7e9b2.png)

Có thể nhìn nó rất rối hay khó hiểu đối với những người chưa quen về Linux, nhưng không sao mình sẽ giúp các bạn hiểu hơn về từng phần.


Trên máy Linux mình có tạo một file có tên là **file1** và một thư mục có tên là **dir1**, mặc định thì thì người tạo sẽ là chủ sở hữu vì vật mình dùng account **hoavt** để tạo mặc định nó có **user** sở hữu là **hoavt** , vậy nhóm ở đâu ra? Theo như Linux đã thiết kế thì sẽ thêm người dùng vào một nhóm có cùng tên với người dùng đó vì vật **user** và **group** sở hữu chính là **hoavt**. Cùng xem quyền của nó trông sẽ như thế nào


![](https://images.viblo.asia/bc716c86-ed51-4939-b60d-3d3e342f2884.png)

Với phần đầu tiên mình khoanh đỏ chính là phần permissions mình đã nói ở phía trên. Trông rất lằng nhằng phải không? Đừng lo cấu trúc của phần permissions sẽ được chia ra thành từng phần như sau: đầu tiên là file type, sau đó sẽ đến đến quyền của từng owner trong hệ thống.
|file type|user| group| other | name |
|-------------|----------------|-------------|----------------|----------------|
|d|rwx|r-x|r-x|dir1|
|-|rw-|r--|r--|file1|

Nhìn vào bảng mình đã chia ra thành từng cột khác nhau. Đầu tiền trong phần permissions sẽ cho bạn biết nó là ở dạng file hay thư mục. Trong đó:
|Ký hiệu|Ý nghĩa|
|-------------|----------------|
|d|Thư mục|
|-|File|
Sau khi phân biệt được là file hay thư mục thì đến phần xem các quyền mình có thể làm đối với mỗi file hay thư mục đó. Nó được chia ra làm 3 phần là **user**,**group**, **other**. Ý nghĩa của **r,w,x**:

|Ký hiệu|Ý nghĩa|
|-------------|----------------|
|r|Đọc|
|w|Ghi|
|x|Thực thi|
|-|Không có quyền|

Đối với **user** nó được sở hữu bởi **hoavt** và có quyền **rwx** với thư mục **dir1** nghĩa là mình có quyền `đọc, ghi, thực thi` thư mục **dir1**  khi mình là **hoavt**, còn với **file1** mình chỉ có quyền **rw-**, nghĩa là mình chỉ có quyền đọc và ghi còn thực thi mình không có quyền nên được ký hiệu bởi dấu **-**. Nếu bạn để ý thì các quyền được ghi theo thứ tự **rwx** chỉ cần nhìn qua và thấy chỗ đó có quyền hay không, nếu có nó được thay **- (không có quyền)** bằng quyền tương ứng ở vị trí đó.

Tương tự đối với **group** và **other** quyền cũng được sắp xếp như **user**.


### Thay đổi quyền với chmod

**chmod** là viết tắt của `change mode` dùng để thay đổi quyền của một thư mục hay file trên Linux.
##### Phần quyền bằng số
```bash
chmod <permissions-number> <filename>
```

![](https://images.viblo.asia/b9741f62-bb9f-492c-8bf1-8a865193edc5.png)

Permissions -number về cơ bản sẽ có 3 chữ số một số với ý nghĩa số thứ nhất là quyền của user, số thứ 2 là quyền của group, số thứ 3 là quyền của other. Ý nghĩa của từng chữ số ở đây:

|Số|Ký hiệu|Ý nghĩa|
|--|-------------|----------------|
|0|---|Không có quyền|
|1|--x|Thực thi|
|2|-w-|Ghi|
|3|-wx|Thực thi + Ghi|
|4|r--|Đọc|
|5|r-x|Đọc + Thực thi|
|6|rw-|Đọc + Ghi|
|7|rwx|Đọc + Ghi + Thực thi|

Giả sử bạn cần phân quyền cho một file có tên là **file1** quyền **rwxrw-r--**. Nó có nghĩa là user có tất cả quyền đọc, ghi, thực thi. Group có quyền đọc và ghi và other thì chỉ có quyền đọc. Để làm điều này ta cần tính quyền cho từng chủ sở hữu.

**user**: **r + w +x** = **4 + 2 + 1** = **7**

**group**: **r + w** = **4 + 2** = **6**

**other**: **r** = **4** = **4**

Vậy quyền của cả file sẽ là **764**, sau đó sử dụng lệnh sau để phân quyền:
```bash
chmod 764 file1
```
Ngoài ra bạn cũng có thể tham khảo thêm câu lệnh
```bash
chmod u=rwx,g=rw,o=r <filename>
```
|Ký hiệu|Ý nghĩa|
|-------------|----------------|
|u|user|
|g|group|
|o|other|
|a|tất cả|
### Thay đổi owner và group
Ngoài ra bạn còn có thể thay đổi các quyền sở hữu của một file. Để thay đổi được bạn cần phải có quyền **sudo**.

Để thay đổi user:
```bash
sudo chown <username> <filename>
```

Để thay đổi group:
```bash
sudo chgrp <groupname> <filename>
```

Để thay đổi cả user và group:
```bash
sudo chown <username>:<groupname> <filename>
```
## Tổng kết
Tóm lại bạn cần nhớ một vài ý chính như sau:
+ Có 3 loại chủ sở hữu một file/thư mục trên Linux đó là user, group, other
+ Các quyền đọc, ghi, thực thi được ký hiểu là r, w, x tương ứng với các số là 4, 2, 1.
+ Lệnh chmod để thay đổi quyền, chown để thay đổi user sở hữu, chrgrp để thay đổi group sở hữu.
## Tham khảo

https://medium.com/@sajithnmadeesha/basics-of-linux-file-permission-5db00bd9749f

https://phoenixnap.com/kb/linux-file-permissions

https://www.guru99.com/file-permissions.html