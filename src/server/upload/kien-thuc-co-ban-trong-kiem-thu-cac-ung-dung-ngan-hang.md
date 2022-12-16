![](https://images.viblo.asia/94c99362-cdba-4d09-999c-ec4616925390.jpg)

Bài viết được dịch từ link: http://www.softwaretestinghelp.com/testing-banking-applications/
            
Ứng dụng ngân hàng là một trong những loại ứng dụng phức tạp nhất trong ngành công nghiệp phát triển và kiểm thử phần mềm hiện nay.

Vậy điều gì đã làm cho ứng dụng Ngân hàng trở nên phức tạp?
Khi được giao việc đảm bảo chất lượng của một ứng dụng ngân hàng thì chúng ta nên làm gì để kiểm tra các quy trình công việc phức tạp liên quan đến các ứng dụng đó?

Trong bài này,  tôi sẽ nhấn mạnh vào các giai đoạn và kỹ thuật khác nhau liên quan đến việc thử nghiệm các ứng dụng ngân hàng.

## Các đặc điểm của một ứng dụng ngân hàng như sau:

* Chức năng nhiều lớp hỗ trợ hàng nghìn phiên người dùng cùng lúc.
* Tích hợp quy mô lớn: Thông thường, một ứng dụng ngân hàng tích hợp với nhiều ứng dụng khác như tiện ích Bill Pay và các tài khoản giao dịch (Trading Accounts)
* Các luồng nghiệp vụ đặc trưng và phức tạp
* Chạy hàng loạt xử lý theo thời gian thực
* Tỷ lệ Giao dịch trong từng giây rất cao
* Giao dịch an toàn
* Mảng báo cáo mạnh mẽ để theo dõi các giao dịch hàng ngày
* Kiểm tra thường xuyên, liên tục, kịp thời để khắc phục sự cố khách hàng
* Hệ thống lưu trữ lớn
* Quản lý tốt các vấn đề khi gặp mọi sự cố dù là rất nghiêm trọng, và có khả năng Phục hồi

Mười điểm được liệt kê trên đây là ***những đặc điểm quan trọng nhất của một ứng dụng ngân hàng.***

Để thực hiện một hoạt động, các ứng dụng ngân hàng cần phải có nhiều cấp liên quan cùng tham gia xử lý. 
Ví dụ, một ***ứng dụng ngân hàng có thể có***:

* Web Server: để tương tác với người dùng thông qua trình duyệt
* Middle Tier: Lớp trung gian để xác nhận đầu vào và đầu ra cho máy chủ web
* Data Base: Cơ sở dữ liệu để lưu trữ dữ liệu và thủ tục
* Transaction Processor: Bộ xử lý giao dịch có thể là Máy chủ lưu trữ có dung lượng lớn hoặc bất kỳ hệ thống Legacy nào khác mà có khả năng thực hiện hàng tỷ các giao dịch mỗi giây.

Vì thế, nếu chúng ta nói về việc thử nghiệm các ứng dụng ngân hàng, thì nó đòi hỏi ***một phương pháp thử nghiệm end to end testing liên quan đến nhiều kỹ thuật kiểm thử phần mềm để đảm bảo được:***

* Tổng thể tất cả các phạm vi của tất cả các quy trình nghiệp vụ ngân hàng và các yêu cầu nghiệp vụ.
* Khía cạnh chức năng của ứng dụng
* Khía cạnh bảo mật của ứng dụng
* Toàn vẹn dữ liệu
* Truy cập đồng thời
* Kinh nghiệm người dùng

## Các giai đoạn điển hình liên quan đến việc thử nghiệm các ứng dụng ngân hàng

Các giai đoạn điển hình liên quan đến việc thử nghiệm các ứng dụng ngân hàng được thể hiện trong quy trình làm việc dưới đây. 

![](https://images.viblo.asia/e1bc4ed6-1299-4ffa-9c97-357aab7d5f90.jpg)

Chúng ta sẽ đề cập đến từng giai đoạn riêng lẻ.

### 1) Requirement Gathering - Thu thập yêu cầu:

Giai đoạn thu thập yêu cầu bao gồm việc đưa ra các tài liệu liên quan đến các yêu cầu của ứng dụng như Tài liệu đặc tả chức năng (Functional Specifications) hoặc các trường hợp sử dụng (Use Cases). Các yêu cầu được thu thập theo nhu cầu của khách hàng và được viết thành tài liệu bởi các chuyên gia về Ngân hàng (Banking Experts) hoặc Chuyên gia phân tích tài liệu (Business Analyst).

![](https://images.viblo.asia/02cda250-7f59-45b5-9765-35d5a0be4b1b.jpg)

Các chuyên gia tham gia vào việc viết yêu cầu về nhiều chủ đề, ví dụ như bản thân ngân hàng có nhiều lĩnh vực hoạt động và một ứng dụng ngân hàng có khả năng ứng phó hoàn chỉnh sẽ là sự tích hợp của tất cả các lĩnh vực này.

***Ví dụ:*** Ứng dụng ngân hàng có thể có các module riêng cho hoặc động Chuyển tiền, Thẻ tín dụng, Báo cáo, Tài khoản cho vay, Thanh toán hóa đơn, Thương mại v.v..

### 2) Requirement Review - Đánh giá yêu cầu:

Sản phẩm bàn giao của quá trình thu thập yêu cầu sẽ được xem xét đánh giá bởi tất cả các bên liên quan như các QA, các leader của đội phát triển và Các nhà phân tích nghiệp vụ ngang hàng (Peer Business Analysts)

![](https://images.viblo.asia/61257c31-6943-4676-9a6f-9aac16d32261.jpg)

Họ sẽ kiểm tra chéo rằng không có luồng xử lý nghiệp vụ hiện tại nào cũng như luồng công việc mới nào bị vi phạm. Tất cả các yêu cầu được xác minh và xác nhận. Các hoạt động theo dõi và yêu cầu sửa đổi tài liệu được thực hiện thống nhất với nhau.

### 3) Business Scenario Preparations - Chuẩn bị Kịch bản nghiệp vụ:

Trong giai đoạn này, QA nhận được các Kịch bản nghiệp vụ từ các tài liệu yêu cầu (tài liệu đặc tả chức năng hoặc các Use cases).
Kịch bản nghiệp vụ được tạo ra theo cách mà tất cả các yêu cầu kinh doanh đều đã được bao phủ hết (phản ánh đầy đủ các yêu cầu trong kịch bản nghiệp vụ). 

Kịch bản nghiệp vụ là kịch bản cấp cao mà không có bất kỳ bước chi tiết nào. Hơn nữa, các Kịch bản nghiệp vụ này được các nhà phân tích nghiệp vụ (BAs) xem xét để đảm bảo tất cả các yêu cầu nghiệp vụ đều được đáp ứng. ***Khi review thì sẽ dễ dàng hơn cho các BA để xem xét kịch bản ở cấp cao hơn là xem xét các trường hợp kiểm tra chi tiết ở mức độ thấp (Test cases).***

***Ví dụ***: một khách hàng mở một khoản tiền gửi cố định trên giao diện ngân hàng kỹ thuật số có thể là một kịch bản kinh doanh. Tương tự, chúng ta có thể có các kịch bản kinh doanh khác nhau liên quan đến việc tạo tài khoản ngân hàng trực tuyến, tiền gửi trực tuyến, chuyển tiền trực tuyến, v.v ...

### 4)  Functional Testing - Kiểm tra chức năng :

Trong giai đoạn này, thử nghiệm chức năng được thực hiện và các hoạt động kiểm thử phần mềm thông thường được thực hiện như:

***Chuẩn bị test case:***

Trong giai đoạn này, đầu vào là các Business Scenario, đầu ra là các test case ở mức chi tiết. Từ một Business Scenario, vận dụng các ký thuật viết test case, sẽ dẫn đến một số positive test cases và negative test cases tương ứng. 
Thông thường, các công cụ được sử dụng trong giai đoạn này là Microsoft Excel, Test Director  hoặc Quality Center.

***Review đánh giá test case:***

Test case sau khi được tạo ra thì sẽ được review chéo nhau bởi các QA.

***Thực hiện chạy test case***

Việc chạy test case có thể đươc thực hiện thủ công hoặc tự động, và có thể sử dụng các công cụ test liên quan như QC, QTP hoặc bất kỳ công cụ nào khác.

Việc kiểm tra chức năng của một ứng dụng ngân hàng khá khác so với kiểm thử phần mềm thông thường. Vì các ứng dụng này làm việc với tiền thật của khách hàng và các dữ liệu tài chính nhạy cảm nên chúng phải được kiểm tra cực kỳ kỹ lưỡng. Không cho phép bỏ sót bất kỳ một kịch bản kinh doanh quan trọng nào. Ngoài ra, nguồn nhân lực QA chịu trách nhiệm thử nghiệm ứng dụng ngân hàng cũng cần phải có kiến thức cơ bản về lĩnh vực ngân hàng.

### 5) Database Testing - Thử nghiệm cơ sở dữ liệu :


Ứng dụng ngân hàng bao gồm các giao dịch phức tạp được thực hiện cả ở cấp UI và cấp cơ sở dữ liệu, Do đó, kiểm thử cơ sở dữ liệu cũng quan trọng như kiểm tra chức năng. Cơ sở dữ liệu là một lớp phức tạp và là một lớp hoàn toàn riêng biệt trong ứng dụng. Và do đó các test case kiểm tra cơ sở dữ liệu sẽ được thực hiện bởi các chuyên gia về cơ sở dữ liệu.

Nó sử dụng các kỹ thuật như:

* Tải dữ liệu (Data loading)
* Di chuyển cơ sở dữ liệu (Database Migration)
* Thử nghiệm lược đồ DB và các loại dữ (DB Schema and Data types)
* Kiểm tra quy tắc (rules của DB)
* Kiểm tra Thủ tục lưu trữ và Chức năng (Stored Procedures and Functions)
* kiểm tra Triggers
* Toàn vẹn dữ liệu

### 6) Security testing - Kiểm tra an ninh :

Kiểm tra an ninh thường là giai đoạn cuối cùng của chu trình thử nghiệm. Điều kiện tiên quyết để bắt đầu kiểm tra an ninh là đã hoàn việc kiểm tra chức năng và phi chức năng. 

Kiểm tra an ninh là một trong những giai đoạn chính trong toàn bộ chu trình thử nghiệm của ứng dụng vì giai đoạn này đảm bảo ứng dụng tuân thủ các tiêu chuẩn của Liên bang Hoa Kỳ và tiêu chuẩn công nghiệp về an toàn thông tin. (Federal and Industry standards)

![](https://images.viblo.asia/a5039eb3-ba12-4ab1-a046-5378eb663f99.jpg)
Do tính chất của dữ liệu đặc trưng của ngân hàng mà các ứng dụng ngân hàng rất nhạy cảm và là mục tiêu hàng đầu cho các hoạt động tin tặc và gian lận. Thử nghiệm bảo mật đảm bảo rằng ứng dụng không có bất kỳ lỗ hổng trên web nào có thể để lộ dữ liệu nhạy cảm cho những kẻ xâm nhập hoặc kẻ tấn công lấy cắp thông tin. Nó cũng đảm bảo rằng ứng dụng này tuân thủ các tiêu chuẩn như OWASP.

Trong giai đoạn này, nhiệm vụ chính là quét toàn bộ ứng dụng được thực hiện bằng các công cụ như IBM AppScan hoặc HP WebInspect (đây là 2 công cụ phổ biến nhất).

Khi quá trình quét xong, báo cáo quét được xuất bản. Trong báo cáo này, False Positives được lọc ra và phần còn lại của các lỗ hổng được báo cáo cho nhóm phát triển để họ bắt đầu sửa các vấn đề tùy thuộc vào mức độ nghiêm trọng của mỗi vấn đề.

Thử nghiệm thâm nhập cũng được thực hiện ở bước này để phát hiện ra được các lỗi.

Kiểm tra an ninh nghiêm ngặt nên được thực hiện trên các nền tảng, mạng và hệ điều hành.

Một số công cụ khác hỗ trợ kiểm tra an ninh bằng tay được sử dụng là: Paros Proxy , Http Watch , Burp Suite , Fortify tools v.v..

Ngoài các giai đoạn chính ở trên, có thể có các giai đoạn khác nhau liên quan đến Thử nghiệm Tích hợp, Thử nghiệm khả năng sử dụng, Thử nghiệm chấp nhận của Người dùng và Thử nghiệm Hiệu suất.

Chúng ta hãy xem qua về những giai đoạn này:

### Integration testing - Thử nghiệm tích hợp

Như bạn biết rằng trong một ứng dụng ngân hàng, có thể có một số module khác nhau như chuyển khoản, thanh toán hóa đơn, tiền gửi, v.v ... Và do đó, có rất nhiều thành phần được phát triển. Trong thử nghiệm tích hợp, tất cả các thành phần được tích hợp với nhau và xác nhận.

### Usability Testing - Kiểm tra khả năng sử dụng### 

Một ứng dụng ngân hàng phục vụ cho nhiều khách hàng. Một số khách hàng này có thể thiếu các kỹ năng và nhận thức cần thiết để thực hiện các nhiệm vụ ngân hàng qua ứng dụng đó. 
Do vậy, ứng dụng ngân hàng nên được kiểm tra để đảm bảo thiết kế đơn giản và hiệu quả, làm cho nó sử dụng thuận tiện cho tất cả các nhóm khách hàng khác nhau. 
Khi giao diện đơn giản và dễ sử dụng hơn, nhiều khách hàng sử dụng thì sẽ được hưởng lợi từ ứng dụng ngân hàng.

### Performance Testing - Kiểm tra hiệu suất

Một số khoảng thời gian nhất định như ngày trả lương, cuối năm tài chính, ngày giảm giá mua sắm, mùa lễ hội... có thể mang lại thay đổi hoặc tăng đột biến trong lưu lượng truy cập thông thường trên ứng dụng. Do đó, nên tiến hành kiểm tra hiệu năng kỹ lưỡng để khách hàng không bị ảnh hưởng bởi sự hạn chế của hiệu suất. 

Một ví dụ điển hình đã từng xảy ra mà khách hàng cá nhân của ngân hàng bị ảnh hưởng do sự thất bại về hiệu suất là NatWest và RBS vào ngày thứ Ha:  trong đó khách hàng có thẻ ghi nợ và thẻ tín dụng đã bị từ chối giao dịch trên khắp các cửa hàng trong nước.

### User Acceptance Testing - Kiểm thử chấp nhận Người dùng

Điều này được thực hiện bằng cách người dùng cuối tham gia vào việc sử dụng thử để đảm bảo rằng ứng dụng tuân thủ các kịch bản thực tế và sẽ được chấp nhận bởi người dùng nếu nó được phát hành.

Trong kịch bản hiện nay đa số các dự án ngân hàng đang sử dụng : Phương pháp Agile / Scrum, RUP và Continuous Integration, và các công cụ như VSTS và Rational Tools của Microsoft để thực hiện thử nghiệm này.

Như chúng ta đã đề cập ở trên về RUP, RUP là viết tắt của Rational Unified Process, là một phương pháp phát triển phần mềm lặp đi lặp lại được IBM giới thiệu bao gồm bốn giai đoạn trong đó các hoạt động phát triển và thử nghiệm được thực hiện.

Bốn giai đoạn là 
* i) Khởi động 
* ii) Hợp tác 
* iii) Xây dựng
* iv) Chuyển tiếp 
RUP liên quan rộng rãi đến các công cụ IBM Rational.

Trong bài này, chúng ta đã xem xét về mức độ phức tạp của ứng dụng Ngân hàng và những giai đoạn điển hình nào liên quan đến việc thử nghiệm ứng dụng đó . Ngoài ra chúng ta cũng đã thảo luận các xu hướng hiện tại được kéo theo bởi ngành công nghiệp IT bao gồm các phương pháp và công cụ phát triển phần mềm hỗ trợ. Hy vọng bài viết này sẽ giúp các bạn có một hình dung cơ bản về việc test một ứng dụng ngân hàng.