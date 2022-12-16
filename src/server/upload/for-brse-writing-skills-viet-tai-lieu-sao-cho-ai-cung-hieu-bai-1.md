# Mở đầu

Trong quá trình phát triển phần mềm. Một BrSE nhất thiết phải tạo không ít tài liệu. Và trong quá trình đó, chắc hẳn không ít người ca thán về những khó khăn khi tạo các tài liệu Proposal hay là Requirement definition document.
Lý do chính yếu là phía người đọc (khách hàng) không phải lúc nào cũng hiểu về IT. Do đó, BrSE băn khoăn không biết làm sao để mà vừa không dùng các từ ngữ chuyên dụng, mà có thể truyền tải được các nội dung chuyên sâu một cách chính xác. 
Series này một phần nào đó sẽ đưa ra các "writing skills" cần thiết để hỗ trợ cho vấn đề này.

Bài 1 sẽ chỉ ra các khái niệm cơ bản về tài liệu (có thể) được viết bởi BrSE trong quá trình phát triển.

Nguồn bài viết được dịch từ link bên dưới. 

[開発工程でSEが書く文書の基本](https://www.atmarkit.co.jp/ait/articles/0907/31/news103.html)
# 1. Quy trình phát triển và các tài liệu cần thiết

Tài liệu là có thể hiểu chính là một trong những công cụ để giao tiếp. Được sử dụng để truyền đạt thông tin và xác nhận nội dung của thông tin.

Trong quá trình phát triển hệ thống, cần truyền đạt thông tin và xác nhận nội dung thông tin giữa BrSE và khách hàng, giữa BrSE và lập trình viên. Do đó, tài liệu là thiết yếu để phát triển hệ thống. BrSE (có thể phải) tạo ra các tài liệu bên dưới tương ứng ở mỗi giai đoạn của quá trình phát triển.

**Requirement definition document   =>  Requirement definition document.**

↓

**External design   =>  External specifications**

↓

**Internal design   =>  Internal specification**

↓

**Program design   =>  Program design document**

↓

**Test   =>  Test specification (test case)**


Ngoài ra, nhiều trường hợp trước khi được khách hàng order để bắt đầu phát triển hệ thống, thì BrSE cũng cần phải tạo Proposal (các đề xuất). 

Thêm nữa, sau khi quá trình phát triển hoàn thành (hoặc song song với đó), BrSE cũng cần tạo các tài liệu hướng dẫn sử dụng, các manual...

Tóm lại là rất rất nhiều tài liệu mà với vai trò BrSE rất có thể cần phải tạo.

# 2. Mục đích, nội dung của các tài liệu

Tất nhiên là mỗi tài liệu được tạo ra đều có một mục đích. Cho nên tài liệu phải được viết phù hợp đúng với mục đích ban đầu của nó.

## (1) Proposal

Mục đích chính của Proposal viết sao cho có thể nhận được đơn đặt hàng phát triển hệ thống từ khách hàng. Nói cách khác, một đề xuất là một tài liệu có thể được sử dụng để thuyết phục khách hàng và kích thích một hành động đặt hàng. Để thuyết phục được khách hàng, cần thiết phải tạo ra được một bản Proposal mà biết cần phải thuyết phục khách hàng cái gì, thuyết phục như thế nào, và biết đặt các vấn đề trọng điểm đúng chỗ. 

Mục đích khác của Proposal là để thống nhất các nhận thức của khách hàng với các vấn đề cơ bản liên quan đến phát triển hệ thống. Bằng cách ghi lại rõ ràng phạm vi của hệ thống, phạm vi phát triển và đơn đặt hàng, v.v., có thể tạo ra được tiếng nói chung giữa khách hàng và đội phát triển. Nội dung của đề xuất là từng trường hợp cụ thể, nhưng chủ yếu là các mục sau đây sẽ được mô tả.

* Bối cảnh của việc áp dụng hệ thống này.
* Mục đích và tác dụng của việc áp dụng hệ thống này.
* Phương châm, phương pháp để hiện thực hoá hệ thống này.
* Phạm vi và các lĩnh vực kinh doanh có thể áp dụng hệ thống này.
* Cấu tạo của hệ thống sẽ được triển khai.
* Business follow sau khi áp dụng hệ thống.
* Chất lượng hệ thống và điều kiện hiệu suất.
* Phạm vi phát triển hệ thống.
* Cách thức tiến hành phát triển dự án.
* Kết quả product sẽ bàn giao cho khách hàng.
* Thể tài phát triển.
* Kế hoạch phát triển.
* Dự toán chi phí.

Các đề xuất có thể được tạo ra để đáp ứng yêu cầu RFP (Request For Proposal) từ khách hàng. Trong trường hợp này, điều quan trọng là phải đáp ứng chính xác và cụ thể cho từng yêu cầu được liệt kê trong RFP.

## (2) Requirement definition document (đặc tả yêu cầu)

Mục đích của Requirement, trước tiên tất nhiên là phát triển hệ thống. Với mục tiêu là xác định rõ những yêu cầu nào cần được đáp ứng để hoàn thành hệ thống.

Tiếp theo, có mục đích là để xác nhận và đồng ý giữa BrSE và khách hàng về các mục tiêu đã chỉ định. Nội dung của Requirement được khách hàng chấp thuận và cả hai bên đồng ý về hệ thống sẽ được phát triển.

Ngoài ra còn có một mục đích khác là bản đặc tả yêu cầu sẽ làm cơ sở cho External design. Requirement definition document được trình bày cho người thiết kế và người thiết kế thực hiện External design dựa trên Requirement definition document này. Các Requirement definition document chủ yếu mô tả các mục sau đây.

* Các khu vực mục tiêu để hệ thống hóa...Các nghiệp vụ sẽ trở thành mục tiêu hệ thống hóa.
* Khái quát hệ thống ... Bức tranh tổng thể về nghiệp vụ sử dụng hệ thống.
* Cấu trúc hệ thống...Cấu trúc phần cứng, cấu trúc phần mềm, cấu trúc mạng.
* Business Follow...Follow nghiệp vụ sử dụng hệ thống.
* Định nghĩa công việc...Danh sách các tác vụ tạo nên các business và từng quy trình làm việc.
* Yêu cầu chức năng...Chức năng cần thiết để thực hiện các business.
* Yêu cầu Input / Output...Thông tin Input và thông tin Output.
* Yêu cầu các Item Database.
* Yêu cầu bảo mật.
* Yêu cầu về hiệu suất, yêu cầu chất lượng...Hiệu suất và chất lượng cần thiết cho hệ thống.

## (3) External specifications

External specifications là một tài liệu thiết kế tóm tắt các kết quả của External design. Được tạo ra để làm cơ sở cho Internal Design. Người thiết kế thực hiện Internal Design dựa trên External specifications. External specifications mô tả các "chức năng" và cấu trúc hệ thống mà hệ thống phải có. "Chức năng" trong trường hợp này là một chức năng mà người dùng có thể nhìn thấy và hiểu được.

Ngoài ra, tài liệu này còn mô tả luồng data chạy trong hệ thống. Loại data được sử dụng trong hệ thống, data được nhập vào hệ thống và phương thức nhập, phương thức xử lý data, vị trí lưu trữ data và data được lưu trữ, data output và phương thức output, v.v. Tài liệu này cũng mô tả cả giao diện người dùng, các thao tác của màn hình, thông tin hiển thị trên màn hình, biểu mẫu, v.v.

## (4) Internal specification

Internal specification là một tài liệu thiết kế tóm tắt các kết quả của Internal Design, và được tạo ra để làm cơ sở cho Program design. Người thiết kế Program design dựa trên Internal specification.

Internal specification là một tài liệu được thiết kế về cách nhận ra các chức năng và luồng dữ liệu được thiết kế trong giai đoạn External design dưới dạng phần mềm. Internal specification mô tả các chức năng cần thiết và hoạt động và xử lý phần mềm để thực hiện phân phối dữ liệu, cấu trúc phần mềm và truyền dữ liệu giữa các phần mềm.

## (5) Program design document

Program design document là một tài liệu thiết kế tóm tắt các kết quả của Program design và được tạo ra làm cơ sở cho programing. Trong Program design document, nội dung xử lý mô-đun và nội dung hoạt động, dữ liệu đầu vào, dữ liệu đầu ra, bảng dữ liệu, v.v. được mô tả.

## (6) Test specification (test case)

Test specification được tạo ra nhằm mục đích chỉ định loại test case nào được thực hiện. Tạo ra các Test specification tập trung vào kiểm tra hệ thống và kiểm tra hoạt động. Các Test specification bao gồm các mục kiểm tra toàn diện bao gồm tất cả các thông số kỹ thuật xử lý hệ thống và thông số kỹ thuật vận hành và mô tả dữ liệu đầu vào và dữ liệu đầu ra là kết quả vận hành hệ thống cho từng mục kiểm tra.

## (7) Manual

Mục đích của Manual là cho phép tất cả người dùng hiểu cách sử dụng và vận hành hệ thống và tự mình sử dụng hệ thống. Đồng thời, mục tiêu là đảm bảo rằng tất cả người dùng có thể sử dụng hệ thống theo cùng một cách và ở cùng cấp độ.

Do đó, Manual phải bao gồm các hướng dẫn cần thiết để sử dụng hệ thống theo thứ tự cần thiết. Ngoài ra, nội dung và cấu hình phải sao cho bất kỳ ai vận hành theo các quy trình và phương pháp được mô tả có thể khiến hệ thống thực hiện đúng công việc và xử lý.

### (Còn tiếp)