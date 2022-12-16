Trước khi đọc bài viết này, nên đọc *b-tree* là gì trước nha https://en.wikipedia.org/wiki/B-tree

**Thực thi trên 1 page**
* Để hiểu đơn giản cơ chế hoạt động ghi dữ liệu bên dưới của *b-tree* là ghi đè dữ liệu mới trên disk, mình đang nói là việc ghi đè sẽ không làm thay đổi vị trí ( hay địa chỉ ) của page.
* Việc ghi đè dữ liệu mới vào hệ thống thực sự là công việc ( hoạt động ) của phần cứng. Phần cứng sẽ thực thi việc di chuyển dữ liệu đến đúng vị trí khi xử lí phần còn lại sau đó nó sẽ ghi đè vị trí, khu vực đúng của nó với dữ liệu mới được thêm vào. Trên SSD thì công việc này sẽ là xoá dữ liệu cũ, rewrite và kết nối một khu vực khá lớn của việc lưu trữ đó.


-----

**Thực thi trên 2 page**

* Một số trường hợp không được đẹp đó là việc ghi dữ liệu được thực hiện trên nhiều page, Ví dụ bạn ghi một lượng data quá lớn thì dữ liệu trên page nó không đủ vùng nhớ thì sẽ phải cắt page. Trong trường hợp này phải thực hiện việc ghi dữ liệu trên 2 page mà vừa mới được cắt ra, cũng như cần update lại page cha của 2 page con vừa được cắt. 
* Tác vụ này được thực hiện cực kì nguy hiểm khi lưu data vào hệ cơ sở dữ liệu bị crashes -> sẽ là 1 page được ghi thành công, 1 page còn lại thì bị mất hoặc không thẻ liên kết với page cha của chính nó.


-----


**Tóm lại**
*    Để làm cho data trở nên ổn định khi crashes xảy ra, thì thuật toán *b-tree* thực hiện chỉ thêm data khi cơ chế [write-ahead-log](https://en.wikipedia.org/wiki/Write-ahead_logging) đã được thực thi xong, sau khi thực thi thành công thì mới upload và applied page chính nó trên *tree* 
*    Khi data bị *crashes* hoặc xảy ra vấn đề bất kì nào đó, chúng ta có thể sử dụng *log* để *restore b-tree* làm cho nó đảm bảo việc consistent state.
*    Sau này thì đã có nhiều thuật toán mới để đảm bảo việc này nữa, ví dụ như LSM-Trees.


-----


**Vấn đề**
* còn một vấn đề đó là khi multiple thread access đến thì phải làm sao ta ? => anh/em đóng góp nhé. 

**Cảm ơn anh em.**