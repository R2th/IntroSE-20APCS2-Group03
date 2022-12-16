***Chúng ta có thể phân chia kiến trúc của SQL Server thành các thành phần khác nhau***

- Kiến trúc chung.
- Kiến trúc bộ nhớ.
- Kiến trúc Data File.
- Kiến trúc Log File.

# **1. Kiến trúc chung:**

- Client : Nơi bắt đầu các request.
- Query: Truy vấn SQL ngôn ngữ bậc cao.
- Logical Units: Từ khóa, Biểu thức, toán tử,…
- N/W Packets: Code liên quan đến mạng.
- Protocols: Trong SQL có 4 giao thức.
- Shared memory: Cho các kết nối cục bộ và xử lí dự cố.
- Named pipes : Cho các kết nối trong kết nối LAN.
- TCP/IP: Cho các kết nối trong kết nối WAN.
- VIA-Virtual Interface Adapter: Yêu cầu phần cứng đặc biệt để thiết lập bởi nhà cung cấp và bị bỏ từ phiên bản SQL 2012.
- Server: Nơi dịch vụ SQL được cài đặt và lưu trú cơ sở dữ liệu.
- Relational Engine: Đây là nơi thực thi thực tế sẽ thực hiện. Nó chứa trình phân tích cú pháp truy vấn, trình tối ưu hóa truy vấn, trình thực thi truy vấn.
- Query Parser (Command Parser) and Compiler (Translator): kiểm tra cú pháp của truy vấn và sẽ chuyển đổi truy vấn sang ngôn ngữ máy.
- Query Optimizer: Nó sẽ chuẩn bị kế hoạch thực thi như đầu ra bởi câu truy vấn đưa ra, số liệu thống kê, cây Algebrizer như đầu vào.
- Kế hoạch thực thi: Nó như bản đồ đường đi, nó chứa yêu cầu của tất cả các bước để thực hiện như một phần của thực thi câu lệnh.
- Query Executor: Đây là nơi các truy vấn sẽ được thực thi từng bước với sự giúp đỡ của kế hoạch thực thi và cả công cụ lưu trữ  sẽ được tiếp xúc.
- Storage Engine: Nó chịu trách nhiệm lưu trữ và truy xuất dữ liệu trên hệ thống lưu trữ ( đĩa, SAN, …), thao tác dữ liệu, khóa và quản lí giao dịch.
- SQL OS: Nó nằm giữa máy chủ ( Windows OS) và SQL Server. Tất cả các thực thi trên cơ sở dữ liệu được quản lí bởi SQL OS. SQL OS cung cấp dịch vụ hệ điều hành khác nhau, chẳng hạn như các giao dịch quản lí bộ nhớ với vùng đệm, bộ đệm log, phát hiện deadlock bằng các sử dụng cấu trúc chặn và khóa.
- Checkpoint Process: Checkpoint là một quá trình nội bộ  ghi tất cả các trang dirty( các trang đã sửa đổi) từ Bộ nhớ đệm vào Đĩa vật lí. Ngoài ra, nó cũng ghi các bản ghi nhật ký từ bộ đệm log vào tệp vật lý. Hành động viết trang dirty từ bộ đệm cache vào file dữ liệu còn được gọi là “ Hardening of dirty pages” ( Cứng hóa các trang dirty).
Nó là một quá trình chuyên dụng và tự động chạy bởi SQL Server tại các khoảng thời gian cụ thể. SQL Server chạy quy trình điểm kiểm tra cho từng cơ sở dữ liệu riêng lẻ. Điểm kiểm tra giúp giảm thời gian khôi phục cho SQL Server trong trường hợp tắt máy bất ngờ hoặc lỗi hệ thống \ Không thành công.

### ***Checkpoint trong SQL Server***

Trong SQL Server 2012 có 4 kiểu checkpoint:

- Automatic: Checkpoint phổ biến nhất chạy dưới dạng một tiến trình trong background để đảm bảo Cơ sở dữ liệu SQL có thể được phục hồi trong giới hạn thời gian được xác định bằng tùy chọn Recovery Interval (  Khoảng thời gian khôi phục) – Tùy chọn cấu hình máy chủ.

- Indirect : Đây là điểm mới SQL Server 2012. Kiểu này cũng chạy trong background nhưng để đáp khoảng thời gian phục hồi mục tiêu để người dùng xác định cho cơ sở dữ liệu cụ thể nơi tùy chọn được cấu hình. Khi Target_Recovery_Time cho một cơ sở dữ liệu đã được chọn, nó sẽ ghi đè  khoảng thời gian khôi phục đã được chỉ định cho máy chủ và tránh checkpoint automatic trên DB đó.

- Manual: Điều này giống như bất kì câu lệnh T-SQL nào khác , khi bạn ban hành lệnh checkpoint, nó sẽ chạy đến khi hoàn thành. Checkpoint  thủ công chỉ chạy cho cơ sở dữ liệu hiện tại của bạn . Bạn cũng có thể chỉ định Checkpoint_Duration là tùy chọn – khoảng thời gian này là khoảng thời gian bạn muốn checkpoint của mình hoàn thành.
- Internal: Là người dùng bạn không thể kiểm soát checkpoint Internal. Cấp độ cho các hoạt động cụ thể:
* Shutdown khởi tạo một hoạt động checkpoint trên tất cả các cơ sở dữ liệu trừ khi tắt máy không triệt để ( tắt máy tức thì).
* Nếu mô hình khôi phục được thay đổi từ Full\Bulk-logged sang Đơn giản.
* Trong khi thực hiện sao lưu cơ sở dữ liệu.
* Nếu DB của bạn đang trong mô hình khôi phục đơn giản, quá trình điểm kiểm tra sẽ tự động thực thi khi nhật ký trở nên đầy đủ 70% hoặc dựa trên Khoảng thời gian phục hồi tùy chọn của máy chủ.
* Lệnh cơ sở dữ liệu thay đổi để thêm hoặc xóa tệp dữ liệu \ file log cũng khởi tạo checkpoint.
* Điểm kiểm tra cũng diễn ra khi mô hình khôi phục của DB được ghi lại hàng loạt và thực hiện thao tác ghi nhật ký tối thiểu.
* Tạo ảnh chụp nhanh DB.
- Lazy Writer Process: sẽ đẩy các trang dirty vào đĩa vì một lí do hoàn toàn khác, bởi vì nó cần giải phóng bộ nhớ vùng đệm. Điều này xảy ra khi máy chủ SQL dưới áp lực bộ nhớ. Theo như tôi biết, điều này được kiểm soát bởi một tiến trình nội bộ và không thiết lập được cho nó
Máy chủ SQL liên tục giám sát việc sử dụng bộ nhớ để đánh giá sự tranh chấp tài nguyên (hoặc tính khả dụng); công việc của nó là đảm bảo rằng có một số lượng không gian trống nhất định có sẵn mọi lúc. Là một phần của quá trình này, khi nó nhận thấy bất kỳ tranh chấp tài nguyên nào như vậy, nó kích hoạt Lazy Writer để giải phóng một số trang trong bộ nhớ bằng cách viết ra các trang dirty vào đĩa. Nó sử dụng thuật toán ít được sử dụng gần đây nhất (LRU) để quyết định các trang nào sẽ được đưa vào đĩa.
Nếu Lazy Writer luôn hoạt động, nó có thể chỉ ra tắc nghẽn bộ nhớ.

## ***Ví dụ:***
##  *Checkpoint Indirect*
* Dùng SQL Server Management Studio:
B1: Trong Object Explorer, ấn mở rộng một đối tượng SQL Server Database Engine ( ở đây là dòng PCLAP) -> mở rộng Database.
B2: Chuột phải Database muốn chọn -> chọn Properties.
B3: Trong hộp thoại Database Properties, kích trang Options.
B4: Trong bảng Recovery, trong trường Target Recovery Time (Seconds), hãy chỉ định số giây bạn muốn làm giới hạn trên trên thời gian khôi phục cho cơ sở dữ liệu này.

![](https://images.viblo.asia/2c555c16-6078-4fa8-8f99-2770a28739cf.png)

* Dùng Transact-SQL
Lệnh : ALTER DATABASE <Tên Cơ sở dữ liệu> SET TARGET_RECOVERY_TIME = <số giây hay phút recover> <SECONDS/MINUTES>;  

![](https://images.viblo.asia/747bfe3c-2444-4c4b-ad93-8f2aafd5c78b.png)

* Dùng Transact-SQL
Lệnh : ALTER DATABASE <Tên Cơ sở dữ liệu> SET TARGET_RECOVERY_TIME = <số giây hay phút recover> <SECONDS/MINUTES>;  

![](https://images.viblo.asia/286e9f2e-d6c0-48a9-974d-945ff8f591cb.png)

## ***Checkpoint Automatic:***
* Dùng SQL Server Management Studio:
B1: Kích chuột phải vào Server ( ở đây là dòng PCLAP) chọn Properties.
B2: Kích Database Setting.
B3: Dưới Recovery, trong hộp Recovery interval (minutes) chọn giá trị 0- 32767 để đặt số lượng thời gian tối đa, tính bằng phút, SQL Server sẽ dành để khôi phục từng cơ sở dữ liệu khi khởi động. Mặc định là 0, cho biết cấu hình tự động của SQL Server. Trong thực tế, điều này có nghĩa là thời gian khôi phục dưới một phút và một trạm kiểm soát khoảng một phút cho các cơ sở dữ liệu hoạt động.

![](https://images.viblo.asia/0a7cfe4c-7514-4dc1-a70c-1696a28232e2.png)

* Dùng Transact-SQL:  
Kiểm tra các giá trị trước thay đổi:
Lệnh: 	RECONFIGURE;  
EXEC sp_configure; 

![](https://images.viblo.asia/d662b331-7ad9-466b-a3c0-b379858c17fc.png)

Cần thay đổi dòng show advanced options thành 1 mới có thể thay đổi thời gian checkpoint recovery interval
 
*** Lệnh:***
USE <tên cơ sở dữ liệu ;  
GO  
EXEC sp_configure 'show advanced options', 1;  
GO  
RECONFIGURE ;  
GO  
EXEC sp_configure 'recovery interval', 0 ;  
GO  
RECONFIGURE;  
GO  
RECONFIGURE;  
EXEC sp_configure;
Dòng show advanced options chuyển sang giá trị là 1

![](https://images.viblo.asia/7f8339c5-46c7-440e-8864-945a82f6d36f.png)

Thời gian recovery chuyển thành 3

![](https://images.viblo.asia/85f888ba-5b33-404e-b1d3-2984b7ebbdf7.png)

## ***Checkpoint Manual***
* Dùng Transact-SQL:
Lệnh : CHECKPOINT < Thời gian thực hiện tính bằng giây >

![](https://images.viblo.asia/96bf5a6e-177d-4bc8-8b0d-99f5f1b4dad1.png)

# **2. Kiến trúc bộ nhớ**
Một số tính năng nổi bật của kiến trúc bộ nhớ:
- Một trong những mục tiêu thiết kế chính của tất cả các phần mềm cơ sở dữ liệu là giảm thiểu I / O  đĩa vì đĩa đọc và ghi là một trong những hoạt động tốn nhiều tài nguyên nhất.
- Bộ nhớ trong các cửa sổ có thể được gọi với không gian địa chỉ ảo, được chia sẻ bởi chế độ Kernel (chế độ OS) và chế độ Người dùng (Ứng dụng giống như SQL Server).
- SQL Server "Không gian địa chỉ người dùng" được chia thành hai vùng: MemToLeave và Buffer Pool.
- Kích thước của MemToLeave (MTL) và vùng đệm (BPool) được xác định bởi SQL Server trong khi khởi động.
- Quản lý bộ đệm là một thành phần quan trọng trong việc đạt được hiệu quả cao I / O. Thành phần quản lý bộ đệm bao gồm hai cơ chế: trình quản lý bộ đệm để truy cập và cập nhật các trang cơ sở dữ liệu và vùng đệm để giảm bớt tệp cơ sở dữ liệu I / O.
- Vùng đệm được chia thành nhiều phần. Các bộ lọc quan trọng nhất là bộ đệm cache (còn được gọi là bộ đệm dữ liệu) và bộ nhớ cache của thủ tục. Bộ đệm đệm lưu giữ các trang dữ liệu trong bộ nhớ để dữ liệu được truy cập thường xuyên có thể được truy xuất từ bộ nhớ cache. Cách thay thế sẽ là đọc các trang dữ liệu từ đĩa. Đọc các trang dữ liệu từ bộ nhớ cache tối ưu hóa hiệu suất bằng cách giảm thiểu số lượng các hoạt động I / O yêu cầu vốn chậm hơn so với việc lấy dữ liệu từ bộ nhớ.
- Thủ tục cache giữ các thủ tục được lưu trữ và các kế hoạch thực hiện truy vấn để giảm thiểu số lần các kế hoạch truy vấn phải được tạo ra. Bạn có thể tìm hiểu thông tin về kích thước và hoạt động trong bộ nhớ cache thủ tục bằng cách sử dụng câu lệnh DBCC PROCCACHE.
Các thành phần khác của bộ đệm gồm:
- System level data structures: Giữ SQL Server mức phiên bản dữ liệu về các cơ sở dữ liệu và khóa
- Log cache:  Dành riêng cho việc đọc và viết các trang nhật ký giao dịch
- Connection context: Mỗi kết nối với phiên bản có một vùng nhớ nhỏ để ghi lại trạng thái hiện tại của kết nối. Thông tin này bao gồm các thủ tục lưu sẵn và các tham số chức năng do người dùng định nghĩa, vị trí con trỏ và hơn thế nữa
- Stack space: Windows phân bổ không gian ngăn xếp cho mỗi luồng được bắt đầu bởi SQL Server.

# **3. Kiến trúc Data File**

Kiến trúc tệp dữ liệu có các thành phần sau:
- File Groups:
Các tệp cơ sở dữ liệu có thể được nhóm lại với nhau trong các nhóm tệp cho mục đích phân bổ và quản trị. Không tệp nào có thể là thành viên của nhiều nhóm tệp. Tệp nhật ký không bao giờ là một phần của nhóm tệp. Không gian nhật ký được quản lý riêng biệt với không gian dữ liệu.
Có hai loại nhóm tệp trong SQL Server, Chính và do người dùng xác định. Nhóm tệp chính chứa tệp dữ liệu chính và bất kỳ tệp nào khác không được chỉ định cụ thể cho một nhóm tệp khác. Tất cả các trang cho các bảng hệ thống được phân bổ trong nhóm tệp chính. Các nhóm tệp do người dùng định nghĩa là bất kỳ nhóm tệp nào được chỉ định bằng cách sử dụng từ khóa nhóm tệp trong tạo cơ sở dữ liệu hoặc thay đổi câu lệnh cơ sở dữ liệu.
Một nhóm tệp trong mỗi cơ sở dữ liệu hoạt động như nhóm tệp mặc định. Khi SQL Server phân bổ một trang cho một bảng hoặc chỉ mục mà không có nhóm tệp nào được chỉ định khi chúng được tạo, các trang được cấp phát từ nhóm tệp mặc định. Để chuyển nhóm tệp mặc định từ nhóm tệp này sang nhóm tệp khác, nhóm tệp phải có db_owner được cố định db role
Theo mặc định, nhóm tệp chính là nhóm tệp mặc định. Người dùng nên có vai trò cơ sở dữ liệu cố định db_owner để sao lưu các tệp và các nhóm tệp riêng lẻ.
- Files:
Cơ sở dữ liệu có ba loại tệp - Tệp dữ liệu chính, tệp dữ liệu thứ cấp và tệp nhật ký. Tệp dữ liệu chính là điểm bắt đầu của cơ sở dữ liệu và trỏ đến các tệp khác trong cơ sở dữ liệu.
Mỗi cơ sở dữ liệu có một tệp dữ liệu chính. Chúng tôi có thể cung cấp bất kỳ tiện ích mở rộng nào cho tệp dữ liệu chính nhưng tiện ích mở rộng được đề xuất là .mdf. Tệp dữ liệu thứ cấp là tệp không phải tệp dữ liệu chính trong cơ sở dữ liệu đó. Một số cơ sở dữ liệu có thể có nhiều tệp dữ liệu phụ. Một số cơ sở dữ liệu có thể không có một tệp dữ liệu thứ cấp. Khuyến nghị cho tệp dữ liệu thứ cấp là .ndf.
Các tệp nhật ký chứa tất cả thông tin nhật ký được sử dụng để khôi phục cơ sở dữ liệu. Cơ sở dữ liệu phải có ít nhất một tệp nhật ký. Chúng tôi có thể có nhiều tệp nhật ký cho một cơ sở dữ liệu. Phần mở rộng được khuyến nghị cho tệp nhật ký là .ldf.
Vị trí của tất cả các tệp trong cơ sở dữ liệu được ghi lại trong cả cơ sở dữ liệu chính và tệp chính cho cơ sở dữ liệu. Hầu hết thời gian, công cụ cơ sở dữ liệu sử dụng vị trí tệp từ cơ sở dữ liệu chính.
Các tệp có hai tên - Logical và Physical. Tên logic được sử dụng để chỉ tệp trong tất cả các câu lệnh T-SQL. Tên vật lý là OS_file_name, nó phải tuân thủ các quy tắc của hệ điều hành. Các tệp dữ liệu và nhật ký có thể được đặt trên hệ thống tệp FAT hoặc NTFS, nhưng không thể được đặt trên các hệ thống tệp nén. Có thể có tới 32.767 tệp trong một cơ sở dữ liệu.
- Extents
Extents là đơn vị cơ bản trong đó không gian được phân bổ cho các bảng và các chỉ mục. Một extent là 8 trang liền kề hoặc 64KB. SQL Server có hai loại extents - Uniform và Mixed. Các phần mở rộng đồng nhất được tạo thành từ một đối tượng duy nhất. Các phạm vi hỗn hợp được chia sẻ bởi tối đa tám đối tượng.
- Pages
Nó là đơn vị cơ bản của lưu trữ dữ liệu trong MS SQL Server. Kích thước của trang là 8KB. Đầu mỗi trang là tiêu đề 96 byte được sử dụng để lưu trữ thông tin hệ thống như loại trang, lượng không gian trống trên trang và id đối tượng của đối tượng sở hữu trang. Có 9 loại trang dữ liệu trong SQL Server.
* Data: Các hàng dữ liệu có tất cả dữ liệu ngoại trừ dữ liệu văn bản, ntext và hình ảnh.
* Index : Chỉ mục
* Tex\Image: Dữ liệu văn bản, ntext và hình ảnh.
* GAM: Thông tin về khoảng cách được phân bổ.
* SGAM : Thông tin về các cấp độ được phân bổ ở cấp hệ thống.
* Page Free Space (PFS): Thông tin về dung lượng trống có sẵn trên các trang.
* Index Allocation Map (IAM): Thông tin về khoảng cách được sử dụng bởi một bảng hoặc chỉ mục.
* Bulk Changed Map (BCM): Thông tin về khoảng cách được sửa đổi bởi tập hợp các hoạt động kể từ khi sao lưu nhật ký sao lưu cuối cùng.
* Differential Changed Map (DCM) : Thông tin về các khoảng đã thay đổi kể từ khi sao lưu cơ sở dữ liệu sao lưu cuối cùng.

# **4. Kiến trúc Log File:**
Nhật ký giao dịch SQL Server hoạt động hợp lý như thể nhật ký giao dịch là một chuỗi các bản ghi nhật ký. Mỗi bản ghi nhật ký được xác định bằng Số thứ tự bản ghi nhật ký (LSN). Mỗi bản ghi nhật ký chứa ID của giao dịch mà nó thuộc về.
Bản ghi nhật ký cho sửa đổi dữ liệu ghi lại hoặc hoạt động lôgic được thực hiện hoặc ghi lại hình ảnh trước và sau của dữ liệu đã sửa đổi. Hình ảnh trước là bản sao dữ liệu trước khi thực hiện thao tác; hình ảnh sau là bản sao dữ liệu sau khi thao tác đã được thực hiện.

Các bước để khôi phục hoạt động phụ thuộc vào loại bản ghi nhật ký :
- Nhật ký thao tác logic:
* Để cuộn hoạt động logic về phía trước, hoạt động được thực hiện lại.
* Để cuộn hoạt động logic trở lại, hoạt động lô-gic ngược được thực hiện.

- Trước và sau khi hình ảnh được ghi lại.
* Để cuộn hoạt động về phía trước, hình ảnh sau được áp dụng.
* Để cuộn lại hoạt động, hình ảnh trước được áp dụng.

Các loại hoạt động khác nhau được ghi lại trong nhật ký giao dịch. Các hoạt động này bao gồm
- Sự bắt đầu và kết thúc của mỗi giao dịch.
- Mọi sửa đổi dữ liệu (chèn, cập nhật hoặc xóa). Điều này bao gồm các thay đổi của các thủ tục được lưu trữ hệ thống hoặc các câu lệnh ngôn ngữ định nghĩa dữ liệu (DDL) cho bất kỳ bảng nào, kể cả các bảng hệ thống.
- Mọi cấp độ và phân bổ trang hoặc phân bổ.
- Tạo hoặc thả một bảng hoặc chỉ mục.

Hoạt động rollback cũng được ghi lại. Mỗi giao dịch bảo lưu không gian trên nhật ký giao dịch để đảm bảo rằng không gian log đủ tồn tại để hỗ trợ một rollback gây ra bởi một câu lệnh rollback rõ ràng hoặc nếu gặp lỗi. Không gian dành riêng này được giải phóng khi giao dịch hoàn tất.
Phần của tệp nhật ký từ bản ghi nhật ký đầu tiên phải có mặt để khôi phục cơ sở dữ liệu thành công trên toàn bộ bản ghi nhật ký được viết cuối cùng được gọi là phần hoạt động của nhật ký hoặc hoạt động nhật ký. Đây là phần của nhật ký cần thiết để khôi phục toàn bộ cơ sở dữ liệu. Không thể cắt bớt một phần của nhật ký hoạt động. LSN của bản ghi nhật ký đầu tiên này được gọi là LSN khôi phục tối thiểu (Min LSN).
Công cụ cơ sở dữ liệu máy chủ SQL chia mỗi tệp nhật ký vật lý nội bộ thành một số tệp nhật ký ảo. Tệp nhật ký ảo không có kích thước cố định và không có số tệp nhật ký ảo cố định cho tệp nhật ký thực.

Công cụ Cơ sở dữ liệu chọn kích thước của các tệp nhật ký ảo động trong khi nó đang tạo hoặc mở rộng các tệp nhật ký. Cơ sở dữ liệu cố gắng duy trì một số lượng nhỏ các tệp ảo. Kích thước hoặc số lượng tệp nhật ký ảo không thể được định cấu hình hoặc được đặt bởi quản trị viên. Các tệp nhật ký ảo duy nhất ảnh hưởng đến hiệu năng hệ thống là nếu tệp nhật ký vật lý được xác định bởi các giá trị kích thước nhỏ và giá trị growth_increment.

Giá trị kích thước là kích thước ban đầu cho tệp nhật ký và giá trị growth_increment là lượng không gian được thêm vào tệp mỗi lần không gian mới được yêu cầu. Nếu các tệp nhật ký phát triển thành một kích thước lớn vì nhiều gia số nhỏ, chúng sẽ có nhiều tệp nhật ký ảo. Điều này có thể làm chậm quá trình khởi động cơ sở dữ liệu và cũng ghi lại các hoạt động sao lưu và khôi phục.

Chúng tôi khuyên bạn nên chỉ định tệp nhật ký giá trị kích thước gần với kích thước cuối cùng được yêu cầu và cũng có giá trị tăng trưởng tương đối lớn. SQL Server sử dụng nhật ký ghi (WAL), đảm bảo rằng không có sửa đổi dữ liệu nào được ghi vào đĩa trước khi bản ghi nhật ký liên quan được ghi vào đĩa. Điều này duy trì các thuộc tính ACID cho một giao dịch.
*Tài kiệu tham khảo: https://www.tutorialspoint.com/ms_sql_server/index.htm*