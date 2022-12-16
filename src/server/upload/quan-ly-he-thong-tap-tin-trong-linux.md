![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/success-g0ab034520_1280.jpeg)

Chào mừng bạn đến với blog số 3 của series [“Linux dành cho lập trình viên”](https://beautyoncode.com/lam-quen-linux-danh-cho-lap-trinh-vien-series-overview/).

Trong các blog trước, mình đã đi qua các nội dung về:

– [“Giới thiệu về Linux”](https://beautyoncode.com/gioi-thieu-ve-linux/)

– [“Làm quen câu lệnh và hệ thống tập tin trong Linux”](https://beautyoncode.com/lam-quen-cau-lenh-va-he-thong-tap-tin-trong-linux/). 

Nếu bạn chưa đọc qua thì hãy dừng ít phút ghé đọc để có cái nhìn tổng quan và theo cùng nội dung chuỗi bài này nhé.

Tiếp theo trong bài này, tụi mình sẽ **tìm hiểu về cách quản lý hệ thống tập tin trong Linux**, cụ thể:

– Quản lý hệ thống tập tin

– Quản lý thư mục

– Quản lý file

– Các toán tử đại diện

## Quản lý hệ thống tập tin(filesystem)

Sau khi đến được thư mục cần đến bằng câu lệnh với **cd** rồi, thì mình muốn xem những nội dung bên trong thư mục đấy có gì. Câu lệnh **ls** giúp mình:

– mặc định **ls sẽ hiển thị tất cả các file trừ những file ẩn**

  File ẩn là những file môi trường có bắt đầu bằng . (ví dụ: ., .., .env, .gitignore)

– sử dụng **-a** để liệt kê **tất cả các file(bao gồm các file bị ẩn)**

– sử dụng **-l** để liệt kê ở **long format**, có thể hiểu là thêm các thông tin khác của file như có phải là thư mục hay không(d hay -), các loại quyền của từng loại user(rwxr-xr-x), user owner, group owner, kích thước, ngày tháng chỉnh sửa, filename, …

– sử dụng **-la** để kết hợp cả hai options trên lại, hiển thị tất cả các file ở long format

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/01/ls-l-long-format.png?resize=768%2C472&ssl=1)

Ở hình trên có ghi chú chi tiết, về các thông tin được hiển thị với câu lệnh ls -l, cụ thể là:

– **File type**: **d** nghĩa là thư mục, **–** nghĩa là file

– **Permissions**: cho phép các đối tượng cụ thể các quyền truy cập vào file

– **Hard link count**: thông tin về liên kết của tệp

– **User owner**: người dùng là chủ sở hữu của file

– **Group owner**: nhóm người dùng có quyền truy cập thông qua các permissions

– **File size**: kích thước file theo bytes

– **Modification timestamp**: ngày giờ chỉnh sửa gần nhất

– **File name**: tên của file

## Quản lý thư mục
### Quản lý thư mục

> **mkdir** <tên-thư-mục> hoặc <đường-dẫn-đến-tên-thư-mục>

*Ví dụ:* Giả sử mình đang đứng ở thư mục ~/Desktop/example-linux

1. tạo một thư mục có tên là **manage-dir** vào thư mục hiện tại với **mkdir manage-dir**

    ![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/create-dir.png)

mkdir cũng có thể đi cùng với đường dẫn đến thư mục và tên của thư mục cần tạo. 

2. tạo thêm một thư mục có tên là **mkdir-example** nằm trong thư mục **manage-dir** 
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/02/create-dir-path.png)

Tuy nhiên, nếu đường dẫn này chưa tồn tại, ví dụ mình muốn tạo một thư mục mkdir-example trong thư mục manage-dir-not-exist chẳng hạn, thì sẽ báo lỗi:

   ![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/mkdir-error.png)

### Xóa thư mục trống với rmdir

> **rmdir** <tên-thư-mục> hoặc <đường-dẫn-đến-tên-thư-mục>

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/02/rmdir-empty.png)

### Xóa thư mục bao gồm cả nội dung bên trong với rm

Để xóa được cả thư mục chứa nội dung bên trong, thì câu lệnh rmdir thôi sẽ báo lỗi folder này không trống. 

Khi đó, bạn có thể dùng câu lệnh **rm với option -r dùng để xóa tất cả files hay folders ở tất cả các cấp**. 

Ví dụ: mình muốn xóa folder manage-dir nơi có chứa một file test.txt

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/02/rm-folder.png)

**Lưu ý**: đây là một câu lệnh **khá nguy hiểm**(thấy không? nó xóa hết mà không có bất kỳ thông báo gì hết như ví dụ trên) nên bạn hãy dùng **man rm** để đọc document và kiểm tra kỹ từng options có thể dùng nhé. 

Ví dụ bạn có thể sử dụng thêm option **-i để vào chế độ cho phép tương tác**(interactive) tức là cho phép lựa chọn file để xóa với y(yes) hay n(no)

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/rm-option-i.png)

Ở ví dụ trên mình cố tình chọn **y** khi được hỏi **remove manage-dir**.  Dẫn đến lỗi là thư mục này không có trống để xóa được, vì mình đã chọn **n** tức là không cho xóa khi được hỏi manage-dir/test.txt, tức là folder này vẫn còn file test.txt ở trong. 

## Quản lý file

### Sao chép file với cp

> **cp** <file-cần-copy> <nơi-copy-đến>

Ví dụ: copy file test.txt trong folder manage-dir đến thư mục hiện tại là example-linux

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/cp-file.png)

**Lưu ý:** đây cũng là lệnh **khá nguy hiểm**, khi mà ở folder hiện tại bạn có một file cùng tên với file bạn tính copy đến, thì file mới đến nó ghi đè luôn, thế mà mất toai cái bạn cũ.

Ví dụ: lệnh cp ghi đè file cùng tên có sẵn

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/cp-could-override.png)

Bạn để ý kích thước file **test.txt** ban đầu là **55KB**, với nội dung là đoạn text đó. Sau khi copy kích thước còn **0KB**, và nội dung trống.

Bạn có thể sử dụng thêm option **-i để vào chế độ cho phép tương tác**(interactive) tức là được lựa chọn có ghi đè file cùng tên hay không

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/02/cp-option-i.png)

Sau khi mình chọn n để không cho ghi đè thì kích thước và nội dung file test.txt không thay đổi.

### Di chuyển file với mv

> **mv** <tên file> <nơi-di-chuyển-đến>

### Xóa file với rm
Câu lệnh rm cho phép mình xóa file.

> **rm** <tên-file> hoặc <đường-dẫn-đến-tên-file>

### Tạo file trống với touch

> **touch** <tên-file>

## Toán tử đại diện
Khi thực hiện quản lý hệ thống tập tin, nhiều lúc mình sẽ cần làm việc với số lượng files, thư mục khá lớn, lên đến hàng chục hay hàng trăm nghìn. 

Dưới đây là ví dụ với folder /etc có total 1560

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/02/etc-ls-l.png)

Trong những trường hợp này, việc tìm kiếm bằng mắt các file hay thư mục là việc vô cùng khó khăn và tốn thời gian. Khi đó, các** toán tử đại diện** là cứu tinh của chúng ta. 

Các toán tử đại diện thường dùng để tìm kiếm các file có chung đặc điểm nào đó, như là có chung đuôi file(phần mở rộng) là .conf hay có cùng một số ký tự nào đó trong tên chẳng hạn.

### Toán tử *
Ví dụ mình muốn tìm kiếm tất cả các file có đuôi là .conf trong folder /etc ở trên, khi đó đường dẫn của mình sẽ là /etc/*/conf

> Toán tử * đại diện cho “không chứa hoặc có chứa một hay nhiều ký tự”

Tức ***** ở đây có thể là không chứa gì hết, như file .conf hoặc có chứa một hay nhiều ký tự như nfs.conf hay pf.conf

Thường khi làm việc với một lượng lớn file như vậy, bạn sẽ cần copy những file tìm được vào một thư mục nào đó để dễ làm việc với chúng(những file copy) – cho an toàn – vì nếu đụng vô sửa mấy file hệ thống hay config bậy khá là nguy hiểm nha. 

Vậy nên, để thực hiện thao tác này, là lúc câu lệnh **cp** tới công chiện. 

Hãy cùng tạo một thư mục config trong example-linux rồi copy cái bạn này bỏ vào đó nhé(thử làm trước khi xem đáp án ha).

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/02/ls-and-cp-with-wild-card.png)

### Toán tử ?

> Toán tử ? đại diện cho một ký tự

Với ? đại diện cho một ký tự, vậy thì để tìm những file có đuôi là .conf và có tên đúng 3 ký tự thôi thì mình có thể sử dụng đường dẫn là **/etc/???.conf**

### Toán tử [] đại diện cho một khoảng(range)
Thế còn có cách nào muốn kiếm file chứ ký tự với một số giá trị nào đấy không nhỉ?

Đến đây thì cái này **[]** vào công chiện nè, đường dẫn để kiếm tên file có đuôi .conf mà bắt đầu bằng a hoặc b sẽ là **/etc/[ab]*.conf**

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/02/wildcard-range.pn)

Ngoài cách viết từng loại ký tự trong range [] như thế, có một cách gọn hơn để viết mội dãy các ký tự với **<từ-bắt-đầu>-<từ-kết-thúc>**, cụ thể là **[abcd] **có thể viết thành **[a-d]**

**Note:** mấy ví dụ trên đây là mình dùng kèm câu lệnh cp để copy file được chọn về thư mục mới luôn, nếu bạn thích gọn hơn thì có thể dùng thằng câu lệnh ls thôi nhé, kiểu như: **ls /etc/[ab]*.conf**

### Các toán tử đại diện được hiểu như thế nào khi câu lệnh thực thi?
Bạn nghĩ sao về câu hỏi này, bạn đoán thử nha. 

Theo mình thì để có thể hiểu được các toán tử đại diện này hẳn là các câu lệnh phải có cách nào đó dịch ý nghĩa của chúng ra.

Ví dụ mình muốn tìm tất cả các files hay folder có bắt đầu bằng a hoặc b, sử dụng ls /etc/[ab]* , thì mình đoán là BASH sẽ dịch [ab] thành a hoặc b, xong qua dịch tiếp dấu * để hiểu * là như nào xong mới đi kiếm với ls được chứ. Hay là câu lệnh ls đi dịch cái nghĩa xong rồi mới kiếm ta?

Thực ra thì, mình đoán cũng gần đúng đó mấy bạn hehe.

---
Các **toán tử đại diện sẽ không được dịch theo từng câu lệnh, mà thay vào đó nó là một phần của BASH shell**. Điều này có ý nghĩa quan trọng vì nó cho bạn biết là bạn **có thể dùng cái toán tử đại diện này ở mọi câu lệnh**, đã chưa.

Ví dụ **ls /etc/[ab]*.conf** ở trên thì câu lệnh ls thậm chí còn không biết là bạn dùng toán tử hay gì hết. 

BASH đầu tiên sẽ:

– đi đổi cái **etc/[ab]*.conf** qua thành **/etc/asl.conf /etc/autofs.conf /etc/aliases … **

– gọi lệnh **ls /etc/asl.conf /etc/autofs.conf /etc/aliases …**

Cùng xem kết quả nhé:
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/02/wildcard-run.png)

Ủa kỳ ta, sao nó hiện tùm lum vậy kìa =)) Hình như nó hiện cả các files trong mấy cái thư mục luôn phải không?

Thế thì, mình cần thêm option nào của ls để hiển thị tên thư mục thôi hả các chế?

Chắc bạn nhớ, dùng **-d** đó nha. Nếu không nhớ thì … **man ls** và đọc document nào.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/02/wildcard-d.png)

---
Nội dung bài blog này đến đây tạm hết rồi, tụi mình đã tìm hiểu cách quản lý hệ thống tập tin trong Linux rồi ấy, cũng đơn giản đúng không nào.

Trong bài viết tiếp theo của series [“Làm quen Linux giành cho lập trình viên”](https://beautyoncode.com/lam-quen-linux-gianh-cho-lap-trinh-vien-series-overview/), sẽ là tìm hiểu thêm về việc chuyển hướng của câu lệnh trong Linux, tức là có thể sử dụng kết quả của câu lệnh này để thực thi một câu lệnh khác ấy, thú vị lắm.

[Bài gốc của nội dung này](https://beautyoncode.com/quan-ly-he-thong-tap-tin-trong-linux/) nằm trên blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!