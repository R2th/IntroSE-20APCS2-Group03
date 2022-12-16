Xin chào mọi người, thường là khi tìm tới các chủ đề 'chi tiết' về SQL thì chắc hẳn các bạn cũng đã khá quen thuộc với khái niệm cơ sở dữ liệu là gì rồi. Hôm nay mình sẽ chia sẻ về 1 khía cạnh mà hầu như khi chúng ta làm việc với hệ quản trị cơ sở dữ liệu ( cụ thể  là SQL SERVER) thì đều sẽ bỏ qua và thậm chí là không hề biết đến, đó là **Transaction Log**.

Trước khi đến với khái niệm thì chúng ta sẽ lướt qua nguyên nhân dẫn chúng ta đến với Transaction Log. Câu chuyện như sau, khi đang thao tác ngon lành với cơ sở dữ liệu thì em ổ cứng của bạn bị cháy, hay file System bị lỗi, và thường gặp hơn đó là bạn delete/update nhầm. Lúc đó, điều đầu tiên bạn cần làm là tìm kiếm bản sao lưu  database đã được backup gần đây nhất để revert lại dữ liệu .Nhưng giả sử đã 1 ngày bạn chưa backup lại dữ liệu, bạn rất muốn lấy lại cái mớ dữ liệu mà bạn đã mất cả ngày để tạo ra. Vậy phải làm thế nào, hãy cùng mình tìm hiểu tiếp nhé ^^

### **1.Transaction log là gì vậy ?**

![](https://images.viblo.asia/0910d78e-18e4-4e0d-a79e-7396f228c01e.png)


Nó là một dãy các record lưu trữ thông tin các thao tác cập nhật dữ liệu được thực hiện lên database, hoạt động ngầm bên dưới 1 DBMS và tất nhiên nó vô cùng quan trọng. Thông thường database của chúng ta sẽ bao gồm hai thành phần, 1 là data file, dùng để chứa các thông tin để hình thành nên cơ sở dữ liệu ( thông tin về cấu trúc database, dữ liệu, ...), 2 là log file( Transaction Log) sẽ chứa những  các bản ghi ghi nhận thao tác cập nhật dữ liệu vào database như Insert, Update, Delete. Nghĩa là mọi thao tác làm thay đổi dữ liệu của database đều được lưu vào Log File.

*>>>Tại sao lại phải tách thành 2 phần trong khi hoàn toàn có thể gộp chúng thành 1 cho gọn ?*

Nguyên nhân là do **hiệu suất xử lý** .Vì Data File là một cấu trúc phức tạp, và để xử lí (phân tích cấu trúc,  phân chia các page, tạo thêm các extent mới, lưu trữ vào ổ cứng) một cấu trúc phức tạp thì sẽ rất mất thời gian. Bây giờ ta sẽ chia dữ liệu đầu vào thành 2 phần,  bản thân giá trị dữ liệu cần lưu trữ sẽ đưa vào buffer của **RAM thay vì lưu thẳng vào  đĩa cứng**, mỗi thao tác với dữ liệu sẽ **ngay lập tức** được đưa vào 1 file khác ( Transaction Log). Vì Transaction Log lưu trữ dữ liệu theo **cơ chế tuần tự** và theo một **cấu trúc đơn giản** nên xử lý sẽ rất nhanh.

*>>>Khi nào các dữ liệu đang có trong buffer sẽ được lưu xuống Data File?*

Đó là khi một Checkpoint xảy ra. Checkpoint có thể do người dùng thực thi hoặc do SQL Server tự động thực hiện dựa trên thiết lập của database. Lúc đó, dữ liệu trong buffer sẽ được lưu vào Data File trên đĩa cứng. Đồng thời, thông tin về Checkpoint sẽ được ghi nhận vào Transaction Log. 

*>>>Điều gì xảy ra nếu máy tính bị tắt đột ngột( hoặc ở cứng bị cháy) trong khi dữ liệu trong buffer chưa được ghi xuống Data File?*

 Đây là lúc các record trong Transaction Log thể hiện vai trò. Trong tình huống này, khi khởi động, SQL Server sẽ đọc thông tin từ Transaction Log (các record phát sinh sau Checkpoint gần nhất) để khôi phục những dữ liệu chưa được lưu vào Data File. Khi tiến hành quá trình này, SQL Server sẽ sử dụng các thao tác redo (roll-forward) và undo (roll-back) để đảm bảo tính chất nhất quán của transaction.
 
###  **2.Cấu trúc Transaction Log**

![](https://images.viblo.asia/d6abe34a-eec0-494a-a6d6-03c8c3a76648.png)


Có thể hiểu dữ liệu Transaction Log là các record được lưu trữ như hình trên. Mỗi thao tác thay đổi lên dữ liệu được ghi nhận thành một dãy các record trong Transaction Log. Mỗi record được đánh số thứ tự Log Sequence Number (LSN) và được lưu trữ trong các Virtual Log File. Số lượng và kích thước của Virtual Log File được quyết định bởi Database Engine của SQL Server. 

Trong Transaction Log, những record cần dùng cho quá trình Full Recovery của Database được gọi là Active Log. Khi thông tin chứa trong các record của Transaction Log được ghi xuống Data File (với Recovery model là SIMPLE), hoặc khi Transaction Log được sao lưu (với Recovery model là FULL/BULK-LOGGED) thì các Active Log sẽ trở thành Inactive Log. Lúc đó, vùng lưu trữ chứa các Inactive Log có thể được sử dụng để lưu trữ các Active Log mới. Quá trình này được gọi là Log Truncation.

Thực chất, quá trình Log Truncation không xóa đi dữ liệu nên không làm cho kích thước Log File giảm xuống. Ở đây, SQL Server chỉ đánh dấu các record không còn được sử dụng và do đó có thể ghi đè bằng các record mới. Vì thế, Transaction Log không cần tăng thêm kích thước cho record mới.

Các record được ghi vào Transaction Log theo cơ chế xoay vòng (circular). Nghĩa là các Active Log được ghi tuần tự từ cho đến cuối file. Nếu lưu đến cuối file mà vùng lưu trữ đầu file có thể sử dụng (do quá trình Log Truncation xảy ra) thì các record mới sẽ được ghi đè vào vùng này.

Vậy nếu ghi đến cuối file mà các record ở đầu file vẫn là Active Log thì chuyện gì xảy ra? Lúc đó, SQL Server sẽ tăng kích thước Log File để có thể ghi thêm Active Log mới (kích thước mỗi lần tăng thêm được thiết lập trong thuộc tính File Growth của Log File). Nếu bạn không giới hạn kích thước, Log File sẽ tiếp tục tăng cho đến khi vùng lưu trữ đầu file được giải phóng, hoặc khi ổ đĩa bị đầy. Hẳn nhiên, khi ổ đĩa đầy, Transaction Log sẽ không thể ghi thêm dữ liệu nên Database sẽ ngừng hoạt động.

Quá trình Log Truncation sẽ được tiến hành khi xảy ra 1 trong 2 tình huống sau:

- **Nếu Recovery model là SIMPLE**: Khi một Checkpoint xảy ra, dữ liệu đang có trong buffer sẽ được lưu xuống Data File. Do đó, các record tương ứng sẽ trở thành Inactive Log. Các record mới có thể được ghi đè vào vùng này.
- **Nếu Recovery model là FULL hoặc BULK-LOGGED:** Với 2 Recovery model này, cho dù Checkpoint có xảy ra thì SQL Server vẫn không tiến hành quá trình Log Truncation. Do đó, các Active Log không trở thành Inactive Log để vùng lưu trữ được thu hồi. Thay vào đó, bạn phải tiến hành sao lưu Transaction Log bằng lệnh BACKUP LOG. Chỉ khi được sao lưu thì các Active Log mới trở thành Inactive Log. Nhờ đó, vùng lưu trữ mới được thu hồi.

Tùy theo Recovery model thiết lập cho Database mà bạn cần có phương án quản lý Transaction Log hợp lý để tránh trường hợp dung lượng Transaction Log cứ tăng lên, làm đầy ổ đĩa khiến Database không thể hoạt động. Nếu Recovery model của Database là SIMPLE, bạn không cần quan tâm nhiều đến quản lý Transaction Log. Bởi khi đó SQL Server sẽ tự thực hiện Checkpoint để ghi dữ liệu xuống Data File và tiến hành quá trình Log Truncation. Trong trường hợp Recovery model là FULL hoặc BULK-LOGGED, bạn cần sao lưu Transaction Log định kỳ để quá trình Log Truncation diễn ra.

### **3.Sao lưu Transaction Log**

Sao lưu Transaction Log là thao tác cần thiết giúp bạn ở 2 khía cạnh:

1.Khiến quá trình Log Truncation xảy ra. Nhờ đó, kích thước Log File không phải tăng lên để chứa các record mới.

2.Tạo bản sao lưu Transacton Log để có thể phục hồi khi Database bị hư hỏng, mất mát.

Với các bản sao lưu Transaction Log, bạn có thể khôi phục dữ liệu về bất kỳ thời điểm nào mong muốn (Point-in-Time Recovery). Đặc biệt, khi Database bị lỗi hay Data File bị hỏng nhưng Log File vẫn có thể sử dụng được, bạn có thể tiến hành Tail-Log Backup để sao lưu các Transaction Log đang có. Kết hợp cùng các bản sao lưu Transaction Log trước đó, bạn có thể khôi phục Database về thời điểm ngay trước khi sự cố xảy ra.

Để sao lưu Transaction Log, bạn sử dụng lệnh BACKUP LOG theo ví dụ sau:

```
BACKUP LOG ERP
TO DISK = ‘E:\SQLBackupData\ERP_LOG.bak’
```

**Cần lưu ý, bản thân các bản sao lưu Transaction Log không thể giúp bạn khôi phục Database. Trước tiên, bạn cần khôi phục Database bằng bản sao lưu Full (và Differential) với tùy chọn NORECOVERY. Sau đó, bạn mới có thể khôi phục từ các bản sao lưu Transaction Log. Ngoài ra, các bản sao lưu Transaction Log được khôi phục phải liên tiếp nhau.**

Nguồn tài liệu : 

http://backupacademy.zbackup.vn/sql-server/sao-luu-transaction-log-trong-sql-server/