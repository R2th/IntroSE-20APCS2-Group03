Bài viết trước mình đã giới thiệu với các bạn về kiểm thử bảo mật là gì, tại sao phải kiểm thử bảo mật, các mối đe dọa và một số kĩ thuật kiểm thử bảo mật. Ở bài viết này mình sẽ tiếp tục giới thiệu cho các bạn về kĩ thuật kiểm thử bảo mật và các công cụ kiểm thử bảo mật. <br>
### 4. Các kĩ thuật kiểm thử bảo mật <tiếp>
Trong bài viết này mình sẽ giới thiệu kĩ thuật kiểm thử bảo mật với SQL injection, thao tác URL với phương thức HTTP GET <br>

**SQL injection:** <br>
 Ví dụ: 1 form login với 2 textbox nhập vào là username và password
- Hacker sẽ nhập dữ liệu đối với username: 105 or 1=1 và password nhập tự do
- Câu lệnh SQL thực thi dữ liệu đầu vào: SELECT * FROM Users WHERE Username = 105 OR 1=1;
- Ở đây điều kiện 1=1 luôn đúng nên hacker này đã đăng nhập được vào hệ thống và tấn công cơ sở dữ liệu trái phép. Chỉ với 1 sự bất cẩn của dev đã làm hệ thống bị tấn công một cách dễ dàng. <br>
=> Việc kiểm tra SQL injection là hết sức quan trọng 

**Thao tác URL với phương thức HTTP GET** <br>
- Phương thức HTTP GET được sử dụng giữa ứng dụng máy khách và máy chủ để truyền thông tin.  Người kiểm thử cần xác minh xem ứng dụng có truyền thông tin quan trọng trong chuỗi truy vấn hay không. Thông tin qua HTTP được truyền vào các tham số trong chuỗi truy vấn. Để kiểm thử được vấn đề này, một giá trị tham số có thể được sửa đổi trong chuỗi truy vấn để kiểm tra xem máy chủ có chấp nhận nó không. <br>
- Thông thường thông tin người dùng được chuyển qua HTTP GET đến máy chủ để xác thực hoặc tìm nạp dữ liệu. Tin tặc có thể thao túng đầu vào của yêu cầu GET đến máy chủ để có thể thu thập thông tin cần thiết  hoặc làm hỏng dữ liệu. Bất kỳ hành vi đột ngột nào của ứng dụng hoặc máy chủ web, trong điều kiện như vậy, là chìa khóa để tin tặc xâm nhập vào ứng dụng. <br>
- Kiểm tra dữ liệu Adhoc cũng có thể được thực hiện như một phần của kiểm thử bảo mật:
   + Kiểm tra dữ liệu ngẫu nhiên được bao gồm trong các request <br>
   + Kiểm tra dữ liệu ngẫu nhiên được bao gồm như là tham số. <br>
   + Kiểm tra dữ liệu ngẫu nhiên được mã hóa bao gồm như tham số. <br>

- Kiểm tra tràn bộ đệm: <br>
    + Kiểm tra giá trị biên trên Độ dài của chuỗi, ví dụ: 128 byte, 256 byte, 1024 byte <br>
    + Chuỗi dài của một ký tự <br>
    + Các mẫu chuỗi đa dạng <br>

###  5. Tiếp cận kiểm thử bảo mật
Chúng ta có thể thực hiện phương pháp sau trong khi chuẩn bị và lập kế hoạch kiểm tra Bảo mật:
- Nghiên cứu kiến trúc bảo mật: Bước đầu tiên là tìm hiểu các yêu cầu nghiệp vụ, mục tiêu bảo mật và mục tiêu về mặt tuân thủ bảo mật của tổ chức. Kế hoạch kiểm tra cần xem xét tất cả các yếu tố bảo mật, như tổ chức có thể đã lên kế hoạch để đạt được sự tuân thủ PCI.
- Phân tích kiến trúc bảo mật: Hiểu và phân tích các yêu cầu của ứng dụng đang được thử nghiệm.
- Phân loại kiểm tra bảo mật: Thu thập tất cả thông tin thiết lập hệ thống được sử dụng để phát triển Phần mềm và Mạng như Hệ điều hành, công nghệ, phần cứng. Lập danh sách các lỗ hổng và rủi ro bảo mật.
- Mô hình mối đe dọa: Dựa trên bước trên, chuẩn bị hồ sơ Đe dọa.
- Lập kế hoạch kiểm tra: Dựa trên mối đe dọa, lỗ hổng bảo mật và rủi ro bảo mật đã xác định kế hoạch kiểm tra để giải quyết các vấn đề này.
- Chuẩn bị ma trận truy xuất nguồn gốc: Đối với mỗi mối đe dọa được xác định, các lỗ hổng và rủi ro bảo mật đã chuẩn bị Ma trận truy xuất nguồn gốc.
- Nhận dạng công cụ kiểm tra bảo mật: Tất cả các kiểm tra bảo mật có thể được thực hiện thủ công, vì vậy hãy xác định công cụ để thực hiện tất cả các trường hợp kiểm tra bảo mật nhanh hơn và đáng tin cậy hơn.
- Chuẩn bị trường hợp kiểm tra: Chuẩn bị tài liệu trường hợp kiểm tra bảo mật.
- Kiểm tra trường hợp thực thi: Thực hiện thực thi các trường hợp kiểm thử bảo mật và kiểm tra lại các sửa lỗi. Thực hiện các trường hợp kiểm tra hồi quy.
- Báo cáo: Chuẩn bị báo cáo chi tiết về Kiểm tra bảo mật có chứa các lỗ hổng và các mối đe dọa có trong đó, nêu chi tiết các rủi ro và các vấn đề vẫn còn mở, v.v.

### 6. Công cụ kiểm thử bảo mật

| Tool | Mô tả | Yêu cầu |
| -------- | -------- | -------- |
| BeEF     | BeEF (Browser Exploitation Framework)  là một công cụ tập trung vào trình duyệt web - điều này có nghĩa là nó lợi dụng thực tế là trình duyệt web mở là một hệ thống đích và thiết kế các cuộc tấn công của nó để tiếp tục từ thời điểm này trở đi.     | Linux, Apple Mac OS X và Microsoft Windows     |
| BFBTester – Brute Force Binary Tester | BFBTester là một công cụ để kiểm tra bảo mật của các chương trình nhị phân. BFBTester sẽ thực hiện kiểm tra các dòng lệnh đối số đơn và nhiều đối số và tràn biến môi trường. Công cụ này cảnh báo cho chuyên gia bảo mật cho bất kỳ chương trình nào sử dụng tên tempfile không an toàn bằng cách xem hoạt động tạo tempfile. | POSIX, BSD, FreeBSD, OpenBSD, Linux |
| Brakeman | Brakeman là một trình quét lỗ hổng mã nguồn mở được thiết kế cho các ứng dụng Ruby on Rails. Nó phân tích tĩnh mã ứng dụng Rails để tìm các vấn đề bảo mật ở bất kỳ giai đoạn phát triển nào. | Rails 3 |
| CROSS | Chương trình CROSS (Codenomicon Robust Open Software Software) được thiết kế để giúp các dự án nguồn mở, là một phần của cơ sở hạ tầng của internet, sửa các lỗi nghiêm trọng trong mã của họ. Dòng sản phẩm Codenomicon, là một bộ công cụ kiểm tra giao thức mạng có tên DEFENSICS giúp các dự án tìm và sửa một số lượng lớn các lỗi nghiêm trọng rất nhanh. | 130 giao thức và định dạng giao thức |
| Knock Subdomain Scan | Knock là một công cụ quét hiệu quả để quét khám phá Vùng chuyển, tên miền phụ, thử nghiệm Wildcard với danh sách từ bên trong hoặc bên ngoài. Công cụ này có thể rất hữu ích trong thử nghiệm thâm nhập hộp đen để tìm tên miền phụ dễ bị tấn công | Linux, Windows và MAC OS X với Python version 2.x |
| Metasploit | Metasploit Framework là một nền tảng nguồn mở tiên tiến để phát triển, thử nghiệm và sử dụng mã khai thác. Dự án này ban đầu bắt đầu như một trò chơi mạng di động và đã phát triển thành một công cụ mạnh mẽ để thử nghiệm thâm nhập, phát triển khai thác và nghiên cứu lỗ hổng. | Win32 / UNIX |

=> Trên đây là một số các công cụ có thể giúp chúng ta kiểm thử bảo mật dễ dàng hơn.

Các bạn có thể xem bài viết trước tại đây: https://viblo.asia/p/security-testing-tiep-can-cong-cu-va-ki-thuat-kiem-thu-bao-mat-part-1-vyDZO0nalwj

### 7. Tài liệu tham khảo
https://www.3pillarglobal.com/insights/approaches-tools-techniques-for-security-testing