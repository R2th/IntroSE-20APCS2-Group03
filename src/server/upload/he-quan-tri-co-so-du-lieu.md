**Hệ quản trị cơ sở dữ liệu là gì?**

Hệ quản trị cơ sở dữ liệu (DBMS) là một phần mềm cho phép tạo lập các CSDL cho các ứng dụng khác nhau và điều khiển mọi truy cập tới các CSDL đó. Nghĩa là, hệ quản trị CSDL cho phép định nghĩa (xác định kiểu, cấu trúc, ràng buộc dữ liệu), tạo lập (lưu trữ dữ liệu trên các thiết bị nhớ) và thao tác (truy vấn, cập nhật, kết xuất, ...) các CSDL cho các ứng dụng khác nhau.
Ví dụ: MS. Access, MS. SQL Server, ORACLE, IBM DB2, ...

![](https://images.viblo.asia/dfcc8972-f517-4294-b2e2-56825d856df3.png)

-- Bộ Quản lý lưu trữ
* Lưu trữ và truy xuất dữ liệu trên các thiết bị nhớ.
* Tổ chức tối ưu dữ liệu trên thiết bị nhớ.
* Tương tác hiệu quả với bộ quản lý tệp.

-- Bộ xử lý câu hỏi
* Tìm kiếm dữ liệu trả lời cho một yêu cầu truy vấn.
* Biến đổi truy vấn ở mức cao thành các yêu cầu có thể hiểu được bởi hệ CSDL.
* Lựa chọn một kế hoạch tốt nhất để trả lời truy vấn này.

-- Bộ Quản trị giao dịch
* Định nghĩa giao dịch: một tập các thao tác được xử lý như một đơn vị không chia căt được.
* Đảm bảo tính đúng đắn và tính nhất quán của dữ liệu.
* Quản lý điều khiển tương tranh.
* Phát hiện lỗi và phục hồi CSDL

**Một số hệ quản trị CSDL**

**1. MySQL**

* MySQL là hệ quản trị cơ sở dữ liệu tự do nguồn mở phổ biến nhất thế giới và được các nhà phát triển rất ưa chuộng trong quá trình phát triển ứng dụng. Vì MySQL là cơ sở dữ liệu tốc độ cao, ổn định và dễ sử dụng, có tính khả chuyển, hoạt động trên nhiều hệ điều hành cung cấp một hệ thống lớn các hàm tiện ích rất mạnh. Với tốc độ và tính bảo mật cao, MySQL rất thích hợp cho các ứng dụng có truy nhập CSDL trên internet. Nó có nhiều phiên bản cho các hệ điều hành khác nhau: phiên bản Win32 cho các hệ điều hành dòng Windows, Linux, Mac OS X, Unix, FreeBSD, NetBSD, Novell NetWare, SGI Irix, Solaris, SunOS, ...
* MySQL được sử dụng cho việc bổ trợ PHP, Perl, và nhiều ngôn ngữ lập trình khác, nó làm nơi lưu trữ thông tin của các trang web viết bằng PHP hay Perl.
* MySQL hiện nay có 2 phiên bản (version): miễn phí (MySQL Community Server) và có phí (Enterprise Server).

-- Một số đặc điểm của MySQL
* MySQL quản lý dữ liệu thông qua các CSDL, mỗi CSDL có thể có nhiều bảng quan hệ, chứa dữ liệu.
* MySQL có cơ chế phân quyền người sử dụng riêng, mỗi người dùng có thể được quản lý một hoặc nhiều CSDL khác nhau, mỗi người dùng có một tên truy cập (user name) và mật khẩu (password) tương ứng để truy xuất đến CSDL.
* Khi ta truy vấn tới CSDL MySQL, ta phải cung cấp tên truy cập và mật khẩu của tài khoản có quyền sử dụng CSDL đó. Nếu không, chúng ta sẽ không làm được gì cả giống như quyền chứng thực người dùng trong SQL Server vậy.

**2. SQL Server**

**Microsoft SQL Server** là một hệ quản trị cơ sở dữ, cung cấp cách tổ chức dữ liệu bằng cách lưu chúng vào các bảng. Dữ liệu quan hệ được lưu trữ trong các bảng và các quan hệ đó được định nghĩa giữa các bảng với nhau. Người dùng truy cập dữ liệu trên Server thông qua ứng dụng. Người quản trị CSDL truy cập Server trực tiếp để thực hiện các chức năng cấu hình, quản trị và thực hiện các thao tác bảo trì CSDL. Ngoài ra, SQL Server là một
CSDL có khả năng mở rộng, nghĩa là chúng có thể lưu một lượng lớn dữ liệu và hỗ trợ tính năng cho phép nhiều người dùng truy cập dữ liệu đồng thời. Các phiên bản của SQL Server phổ biến hiện này trên thị trường là SQL Server 7.0, SQL Server 2000, SQL Server 2005, SQL Server 2008, ...

Các phiên bản của SQL Server gồm 6 bản chính dưới đây:
* Enterpise Manager: Là phiên bản đầy đủ của SQL Server có thể chạy trên 32CPU và 64GB RAM. Có các dịch vụ phân tích dữ liệu Analysis Service.
* Standard: Giống như Enterprise nhưng bị hạn chế một số tính năng cao cấp, có thể chạy trên 2CPU, 4GB RAM.
* Personal: Phiên bản này chủ yếu để chạy trên PC, nên có thể chạy trên các hệ điều hành Windows 9x, Windows XP, Windows 2000, Windows 2003...
* Là phiên bản tương tự như Enterprise nhưng bị giới hạn bởi số user kết nối đến.
* Desktop Engine: Là phiên bản một engine chỉ chạy trên desktop và không có giao diện người dùng (GUI), kích thước CSDL giới hạn bởi 2GB.
* Win CE: Sử dụng cho các ứng dụng chạy trên Windows CE.
* Trial: Phiên bản dùng thử, bị giới hạn bởi thời gian.
* SQL Client: Là phiên bản dành cho máy khách, khi thực hiện khai thác sẽ thực hiện kết nối đến phiên bản SQL Server, phiên bản này cung cấp giao diện GUI khai thác cho người sử dụng.
* SQL Connectivity only: Là phiên bản sử dụng chỉ cho các ứng dụng để kết nối đến SQL Server, phiên bản này không cung cấp công cụ GUI cho người dùng khai thác SQL Server.

**3. DB2**

DB2 là một trong các dòng phần mềm quản trị cơ sở dữ liệu quan hệ của hãng IBM. Nó được phát hành đầu tiên vào năm 1982 và hiện đang sẵn dùng cho một phạm vị rộng các nền hệ điều hành, được dùng chủ yếu trên Unix (thường gọi AIX), Linux, IBM i (trước đây là OS/400), z/OS and Windows Servers. DB2 sử dụng ngôn ngữ SQL để đọc và viết thông tin vào dữ liệu.

Các phiên bản của DB2:
* DB2 for Z/OS: cung cấp các tính năng của DB2 cho các hệ thống máy chủ.
* DB2 Personal Edition: cung cấp cho người dùng đơn lẻ trên một máy tính cá nhân.
* DB2 Enterprise Server Edition (ESE) là một RDBMS hoàn chỉnh với cài đặt khách/chủ (client/server setup)
* DB2 Workgroup Server Editon (WSE) chủ yếu nhằm đến các doanh nghiệp từ nhỏ đến vừa với tất cả các tính năng của DB2 ESE, trừ kết nối với máy tính lớn.

**4. Oracle**

Không có gì ngạc nhiên khi Oracle được xem là hệ quản trị cơ sở dữ liệu phổ biến nhất thế giới. Oracle luôn dẫn đầu trong nhiều năm từ khi ra đời năm 1979. Điều có thể nói về Oracle là “hệ thống phức tạp nhưng mạnh mẽ”. Oracle đang phát triển hướng đến mô hình dữ liệu đám mây trong phiên bản 12c, cho phép các công ty củng cố và quản lý cơ sở dữ liệu như là các dịch vụ đám mây.

Các phiên bản:
* Phiên bản 1 (năm 1977), Phiên bản 2 (năm 1979)
* Phiên bản 3 (năm 1983), Phiên bản 4 (1984)
* Phiên bản 5 phát hành năm 1985 (SQLNet: hệ thống khách/chủ (client/server)).
* Phiên bản 6 phát hành năm 1988 (Sequence, thao tác ghi trễ).
* Oracle7 được phát hành năm 1992 (SQL*DBA).
* Năm 1999 Oracle giới thiệu Oracle8i (i:internet).
* Năm 2001-2002: 2 phiên bản Oracle9i (Release 1&2).
* Năm 2004-2005: 2 phiên bản Oracle10g (g:Grid) (Release 1&2).
* Năm 2007 – 2009: 2 phiên bản 11g (Release 1&2)
* Năm 2013 – 2017: 2 phiên bản 12c (Release 1&2)
* Năm 2018: Phiên bản 18c

Các release phổ biến hiện nay (10g, 11g, 12c) có 5 phiên bản sau :

* Oracle Database Express Edition (Oracle Database XE): là phiên bản đơn giản nhất, download nhanh chóng, cài đặt và quản lý đơn giản, miễn phí cho lập trình, triển khai và mở rộng.
* Oracle Database Standard Edition One
* Oracle Database Standard Edition
* Oracle Database Enterprise Edition: là phiên bản mạnh mẽ nhất, cung cấp nhiều tính năng bảo mật cao cấp, giúp cho các công ty quản lý truy xuất các nguồn tài nguyên và dữ liệu một cách hữu hiệu và tiện lợi hơn.
* Oracle Database Personal Edition: là một sản phẩm đặc biệt, có chứa hầu hết các tính năng của Enterprise Edition (ngoại trừ Oracle Real Application Clusters), phù hợp cho môi trường phát triển và triển khai một người dùng có đòi hỏi có sự tương thích đầy đủ với các phiên bản khác của Oracle.