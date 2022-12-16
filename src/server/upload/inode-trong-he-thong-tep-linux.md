# Mở đầu 
Khi tìm hiểu về hệ thống tệp Linux, ta không thể nào bỏ qua được khái niệm inode. Vậy sau đây chúng ta cùng đi tìm hiểu xem inode là gì và nó hoạt động như thế nào nhé!
## Inode là gì?
Inode (index node) là một thực thể hỗ trợ việc sắp xếp các file trong hệ thống tệp Linux. Mỗi đối tượng trong filesystem đều được thể thiện bởi một inode có chức năng lưu trữ các thông tin cơ bản về file, thư mục thông thường hay đối tượng filesystem khác. Một tệp rỗng tương đương với một inode không có khối dữ liệu. 
## Số inode
Mỗi inode được xác định bởi một số inode duy nhất bên trong filesystem. 
### Đánh số inode như thế nào
Các inode trên một filesystem được đánh số bắt đầu từ 1 đến 10 được dành riêng cho việc sử dụng trong hệ thống. Riêng inode 11 thì lưu trữ file siêu dữ liệu (lưu trữ thông tin như dung lượng file, quyền, người dùng và nhóm người dùng,... ). Tất cả các inode được xếp chồng lên nhau gọn gàng trong một bảng inode. Ngoài ra, mỗi inode cho một file cũng sẽ có thông tin về vị trí của dữ liệu trong hệ thống file. 
### Cách xem số inode của file
Để xem số inode của một file, bạn có thể sử dụng lệnh `ls -i <file_name>`. 
Hoặc nếu, bạn muốn xem số inode của tất cả các file trong một thư mục, bạn có thể sử dụng lệnh `ls -i <dir_name>`.

Ví dụ, mình muốn xem số inode của tất cả các file trong thư mục Public, thì sẽ được kết quả trả về như sau:

![](https://images.viblo.asia/3c44d9e3-1304-477d-9f60-56c6c14c4443.png)

Từ kết quả ta thấy file `directories.txt` có inode là 1836715 còn file `errors.txt` có inode là 1840312.

Ngoài ra, bạn cũng có thể dùng lệnh `stat <file_name>` để kiểm tra số inode và thuộc tính của nó:

![](https://images.viblo.asia/285259c1-972a-4c88-95fd-11aa993b920f.png)
## Inode được dùng để làm gì?
Trên thực tế, những file được tạo ra với những kí tự đặc biệt như ?,^, ... thì không thể dễ dàng xóa đi được. Lúc này, để xóa được những file đặc biệt, chúng ta cần tìm số inode của file đó và thực hiện xóa.   
Để thực hiện xóa fie bằng inode, ta thực hiện lệnh sau: `find . -inum <inode-number> -exec rm -i {} \;`

Tiếp tục với ví dụ trên, bây giờ, mình sẽ thực hiện xóa file `./Public/directories.txt` bằng số inode: 

![](https://images.viblo.asia/a37c5d1f-b448-48a4-b0a4-b418afdf3907.png)

Sau khi xóa xong, hãy kiểm tra lại xem còn file `./Public/directories.txt` không nào:

![](https://images.viblo.asia/bd79f49b-9e35-499d-8dae-2142dc50a590.png)

Như vậy là ta đã xóa thành công file `./Public/directories.txt` bằng số inode. 
# Kết luận
Như vậy, chúng ta đã tìm hiểu qua về khái niệm inode, số inode và tác dụng của inode. Inode có nhiều tác dụng trong việc sắp xếp và quản lý tệp trong Linux. Inode lưu trữ một cách tỉ mỉ những thông tin cơ bản của file và trí dữ liệu của chúng. 
Hẹn gặp lại các bạn ở những bài viết sau!