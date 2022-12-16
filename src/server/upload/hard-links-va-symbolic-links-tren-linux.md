## Giới thiệu 
- Trong hệ thống file Linux, một liên kết (link) là một kết nối giữa file name và dữ liệu thực tế trên disk. 
- Có hai loại liên kết chính có thể được tạo: "hard" links, và "soft" hay symbolic links. Trước khi tìm hiểu về hard links và symbolic links, có một khái niệm khác cần hiểu rõ là “inode” - một khái niệm cơ bản trong Linux filesystem.  Mỗi đối tượng của filesystem được đại diện bởi một inode. 
## 1. Inode
- Trong Linux, dữ liệu của các file được chia thành các block. Có nhiều cách tổ chức để liên kết các khối dữ liệu trong một file với nhau, một trong các cách đó là dùng chỉ mục (indexed allocation).
![](https://images.viblo.asia/bed26257-9800-43b5-871f-acda88c5658d.gif)

- Trong một inode có các metadata sau:
    + Dung lượng file tính bằng bytes.
    + Device ID : id của thiết bị lưu file.
    + User ID : id chủ sở hữu của file.
    + Group ID: id nhóm của chủ sở hữu file.
    + File mode : gồm kiểu file và cách thức truy cập file.
    + Timestamps: các mốc thời gian khi: bản thân inode bị thay đổi (ctime, inode change time), nội dung file thay đổi (mtime, modification time) và lần truy cập mới nhất (atime, access time).
    + Link count : số lượng hard links trỏ đến inode. Các con trỏ chỉ đến các blocks trên ổ cứng dùng lưu nội dung file. Các con trỏ cho biết file nằm ở đâu để đọc nội dung.
    + ...
- Inode xác định file và thuộc tính của nó (các thuộc tính đã liệt kê ở trên). Mỗi Inode được xác định bởi 1 con số duy nhất trong hệ thống tệp tin. 
-  INODE là:
> Inode là một cấu trúc dữ liệu trong hệ thống tệp truyền thống của các họ Unix ví dụ như UFS hoặc EXT3. Inode lưu trữ thông tin về 1 tệp thông thường, thư mục, hay những đối tượng khác của hệ thống tệp tin.
- Có hai chú ý trong nội dung inode:
    + Inode không chứa tên file, thư mục.
    + Các con trỏ là thành phần quan trọng nhất: nó cho biết địa chỉ các block lưu nội dung file và tìm đến các block đó có thể truy cập được nội dung file.

## 2. Hard links
- **Hard links** là các liên kết cấp thấp ( low-level links) mà hệ thống sử dụng để tạo các thành phần của chính hệ thống file, chẳng hạn như file và thư mục. Liên kết cứng sẽ tạo một liên kết trong cùng hệ thống tập tin với 2 inode entry tương ứng trỏ đến cùng một nội dung vật lý (cùng số inode vì chúng trỏ đến cùng dữ liệu). 
- Tất cả các hệ thống tệp tin dựa trên thư mục phải có ít nhất một liên kết cứng (link counts từ 1 trở lên) cung cấp tên gốc cho mỗi tệp tin.
![](https://images.viblo.asia/854df42c-5097-49cf-8c32-23fdd8be3484.png)

- Lệnh tạo liên kết cứng như sau:
`ln [file nguồn] [file đích]`

![](https://images.viblo.asia/15b8b521-52c6-43e7-9b6a-5ee8f6a7d6a4.png)
- 2 file viblo.txt và hardlink.txt có số inode giống nhau là 1326632. Xóa file viblo.txt thì nội dung của file hardlink.txt vẫn còn.

![](https://images.viblo.asia/8c138555-bd08-4578-ad8c-70f7358973f7.png)
- Nội dung trong hardlink.txt vẫn còn vì khi xóa file viblo.txt hệ thống chỉ xóa đi số link count trong inode của file đi 1.
- Khi sử dụng lệnh rm để xóa file thì làm giảm đi một hard link. Khi số lượng hard link giảm còn 0 thì không thể truy cập tới nội dung của file được nữa

## 3. Symbolic links
- Hầu hết người dùng không muốn tự tạo hoặc sửa đổi các hard links, nhưng các symbolic links là một công cụ hữu ích cho bất kỳ người dùng Linux nào. 
- **Symbolic links** là một file đặc biệt trỏ đến một file hoặc thư mục khác - được gọi là **target**. Khi được tạo, một symbolic links có thể được sử dụng thay cho target file. Nó có thể có một tên độc nhất, và được đặt trong bất kỳ thư mục nào. Nhiều symbolic links thậm chí có thể được tạo cho cùng một target file, cho phép truy cập target bằng nhiều tên khác nhau.
![](https://images.viblo.asia/bf8c7003-1a2f-487d-89e9-a4c9f2ac608c.png)

- **Symbolic link** không chứa bản sao dữ liệu của target file. Nó tương tự như một shortcut trong Microsoft Windows: nếu bạn xóa một symbolic link, target sẽ không bị ảnh hưởng. Vì chỉ đơn thuần là một shortcut, symbolic link không dùng đến inode entry. Nó sẽ tạo ra một inode mới và nội dung của inode này trỏ đến tên tập tin gốc.
- Ngoài ra, nếu target của một symbolic link bị xóa, di chuyển hoặc đổi tên, symbolic link không được cập nhật. Khi điều này xảy ra, liên kết tượng trưng được gọi là "broken" hoặc "orphaned" và sẽ không còn hoạt động như một liên kết.
-  Lệnh tạo liên kết tượng trưng như sau: `ln -s [file nguồn] [file đích]`

![](https://images.viblo.asia/f4e76b24-09b6-4e96-b92b-aae5acc8de1f.png)
 - 2 file viblo2.txt và softlink.txt có số inode khác nhau lần lượt là 1326634 và 1326630. Xóa file vibo2.txt thì nội dung của file softlink.txt sẽ không còn.
 
![](https://images.viblo.asia/680cb211-0c5d-4b03-bbf0-4bee0ff4beb5.png)
- Nội dung của softlink.txt không hiển thị được vì softlink.txt trỏ đến một tập tin khác, mà tập tin này không tồn tại.

## 4. So sánh Hard links và Symbolic links


| Hard links | Symbolic links |
| -------- | -------- | 
|Chỉ liên kết được tới file, không liên kết được tới thư mục   | Có thể liên kết được tới thư mục     | 
| Không tham chiếu được tới file trên ổ đĩa khác  | Có thể tham chiếu tới file/thư mục khác ổ đĩa  | 
| Liên kết tới một file vẫn còn ngay cả khi file đó đã được di chuyển | Liên kết không còn tham chiếu được nữa nếu file được di chuyển  | 
|  Được liên kết với inode tham chiếu vật lý trên ổ cứng nơi chứa file   | Liên kết tham chiếu tên file/thư mục trừu tượng mà không phải địa chỉ vật lý. Chúng được cung cấp inode riêng của mình | 
|Có thể làm việc với mọi ứng dụng   | Một số ứng dụng không cho phép symbolic link  | 


## References
https://en.wikipedia.org/wiki/Inode

https://www.computerhope.com/issues/ch001638.htm

https://www.nixtutor.com/freebsd/understanding-symbolic-links/