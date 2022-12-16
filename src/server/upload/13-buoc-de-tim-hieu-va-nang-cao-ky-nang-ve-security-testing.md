## Giới thiệu:

Security testing đang ngày càng phổ biến cho các ứng dụng phần mềm được viết bằng các công nghệ web và cho phép người dùng truy cập từ bất cứ đâu bằng cách kết nối internet. Do đó, việc kiểm tra bảo mật là một phần rất quan trọng trọng việc thử nghiệm các ứng dụng web. Ngay cả những người có kinh nghiệm trong QA, kiểm tra bảo mật cũng rất khó khăn. Vậy làm thế nào để bạn bắt đầu xây dựng những kỹ năng này? 

Trong thực tế, kiểm tra bảo mật theo nhiều cách tương tự như kiểm tra chức năng. Bạn xác định một rủi ro, xác định hành vi mong đợi là gì, và sau đó thực hiện một số thử nghiệm để giảm thiểu rủi ro đó bằng cách chứng minh rằng sự bất ngờ không xảy ra.

Sự khác biệt chính khi kiểm tra bảo mật là trong cách tư duy. Khi thử nghiệm chức năng, bạn cố gắng chứng minh rằng một tính năng hoạt động tốt cho người dùng cuối - nó làm những gì họ mong đợi và không cản trở họ hoàn thành công việc của mình. Là người kiểm tra bảo mật, 'người dùng cuối' của bạn hiện là kẻ tấn công đang cố gắng phá ứng dụng của bạn. Mục tiêu của thử nghiệm của bạn là để chứng minh rằng một kịch bản tấn công cụ thể không thành công và đối với bất kỳ kịch bản tấn công nào khác. Chứng minh rằng một tính năng hoạt động dễ dàng hơn nhiều so với chứng minh rằng một tính năng cụ thể không thể bị tấn công bởi bất kỳ phương pháp nào. 

Trong bài viết này, tôi sẽ chia sẻ 13 bước để tìm hiểu và hoàn thiện về Security Testing: 


## Những khái niệm cơ bản:


### 1. Hiểu ứng dụng của bạn

Điều quan trọng là phải hiểu được ứng dụng bạn đang thử nghiệm để bạn có thể đánh giá những rủi ro ở đâu. Có thể ở công nghệ được sử dụng, thông tin của người dùng, phân cấp các quyền truy cập khác nhau và nơi dữ liệu được ứng dụng lưu trữ. 


### 2. Hiểu thuật ngữ và định nghĩa bảo mật
![](https://images.viblo.asia/f129982c-0a00-4926-ae95-a74cc581e0d0.png)

[OWASP](https://www.owasp.org/index.php/Category:Attack) là một nguồn tuyệt vời cho việc này. Có rất nhiều các thuật ngữ và khái niệm, do đó, chỉ tập trung vào tìm hiểu các thuật ngữ và khái niệm có nhiều khả năng áp dụng cho ứng dụng của bạn. Ví dụ có thể là [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29), [XSRF](https://www.owasp.org/index.php/XSRF), [SQL injection](https://www.owasp.org/index.php/SQL_Injection) và [Path Traversal](https://www.owasp.org/index.php/Path_Traversal). 
[CWE / SANS Top 25](http://cwe.mitre.org/top25/) liệt kê các lỗi phổ biến nhất gây ra các lỗ hổng bảo mật. 


## Xây dựng kiến thức


### 3. Sử dụng các công cụ đào tạo trực tuyến

Một cách tuyệt vời để bắt đầu học là bắt đầu kiểm thử một ứng dụng có các lỗ hổng đã biết, nơi bạn được cung cấp hướng dẫn về cách tìm chúng. Lựa chọn của tôi là [Gruyere](http://google-gruyere.appspot.com/) của Google có các bài học riêng biệt để đề cập đến từng khái niệm. Bạn có thể xem các gợi ý để giúp bạn tìm ra lỗ hổng bảo mật và câu trả lời nếu cần.

Một tùy chọn khác là [WebGoat](https://www.owasp.org/index.php/Category:OWASP_WebGoat_Project) của OWASP.


### 4. Học hỏi từ những những người khác

Có khả năng là trong số đội phát triển phần mềm trong công ty của bạn sẽ có một số kiến thức về các chủ đề bảo mật. Hỏi họ để có thể tìm hiểu các lỗi bảo mật trên ứng dụng của bạn. Hãy cùng hợp tác để thử tìm một vài lỗi bảo mật: Ví dụ như lỗi SQL injection có thể xảy ra được không. Nếu có sẽ là một bài học cho cả hai bạn. Họ cũng có thể giải thích cho bạn thiết kế của ứng dụng và cách nó được thiết kế để bảo vệ khỏi các cuộc tấn công.


### 5. Tìm hiểu các công cụ quét các lỗ hổng bảo mật

Một lựa chọn tốt là [Burp Scanner](https://portswigger.net/vulnerability-scanner); cũng có các lựa chọn miễn phí như [ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project) của OWASP và [RatProxy](https://code.google.com/archive/p/ratproxy/) của Google. Bằng cách định tuyến lưu lượng HTTP đến và đi từ một ứng dụng thông qua một proxy, và sau đó gửi lại các yêu cầu với các nỗ lực tấn công khác nhau thay thế các giá trị ban đầu. Đây có thể là một cách hiệu quả để tìm các lớp dễ bị tổn thương nhất định trong một khoảng thời gian ngắn. Công cụ này không có kiến thức về logic nghiệp vụ ứng dụng - nó chỉ đơn giản là phát lại các yêu cầu và kiểm tra các phản hồi. Có rất nhiều loại lỗ hổng có thể không được tìm thấy với cách này. Sử dụng một công cụ quét hoàn toàn không thay thế được sự cần thiết của kiểm tra bảo mật thủ công.
Các công cụ tự động, thậm chí các công cụ đắt tiền, chỉ tìm thấy các lỗ hổng tương đối đơn giản và chúng cũng thường xuất hiện kết quả sai. Bạn cần có hiểu biết về các lỗ hổng bảo mật để có thể đánh giá từng phát hiện của công cụ tự động. Lấy một báo cáo chưa được kiểm định và gửi nó cho đội phát triển thật sự là điều tồi tệ nhất.


## Chia sẻ kiến thức


### 6. Chia sẻ những gì bạn đang học

Hãy thuyết trình về những kiến thức, hiểu biết cơ bản về kiểm thử bảo mật. Hay 1 lớp về các công cụ quét lỗ hổng tự động. Có thể những chia sẻ của bạn có thể giúp ích rất nhiều cho đội phát triển và cả các tester khác. 


### 7. Thuyết phục mọi người rằng bảo mật rất quan trọng 

Bạn có thể làm việc với những cá nhân không biết hoặc không quan tâm đến vấn đề bảo mật - có thể họ là sinh viên tốt nghiệp mới hoặc đã từng làm việc ở những nơi phần mềm được bảo vệ bằng tường lửa. Nó là giá trị nâng cao nhận thức của họ - nhắc nhở họ về phản ứng dữ dội chống lại một số công ty tên tuổi lớn đã bị mất dữ liệu người dùng. Một công cụ tôi muốn giới thiệu là [BeEF](https://beefproject.com/).


### 8. Đánh giá các vấn đề bảo mật trong từng hoàn cảnh

Điều quan trọng là bạn đánh giá được tất cả các lỗ hổng bảo mật mà bạn phát hiện trong ứng dụng của bạn. Bạn có thể muốn thiết lập một hệ thống tính điểm cho các lỗ hổng mà bạn tìm thấy. Một trong những phương pháp chấm điểm phổ biến là [CVSS](https://www.first.org/cvss/faq). Ngoài việc ghi điểm, hãy xem xét bối cảnh - điều gì sẽ xảy ra nếu cuộc tấn công thành công? 


## Duy trì


### 9. Sử dụng bộ dữ liệu test phù hợp

Khi thử nghiệm một tính năng, có thể bạn sẽ tạo dữ liệu thử nghiệm. Thay vì sử dụng ‘test1’, ‘test2’, v.v. hoặc tên nhân vật hoạt hình thì hãy có thói quen sử dụng chuỗi tấn công. Bằng cách này, bạn sẽ thấy bạn tình cờ gặp phải các lỗ hổng. Nếu bạn có công cụ tự động hoặc nhập file dữ liệu chứa dữ liệu test, hãy thực hiện tương tự. Bạn có thể chia sẻ bộ dữ liệu đó với những testers và developers khác.


### 10. Thực hành, Thực hành, Thực hành

Giống như bất kỳ kỹ năng gì, luyện tập thường xuyên sẽ giúp kỹ năng của bạn trở nên tốt hơn. Khi bạn tìm thấy một lỗ hổng bảo mật, điều này sẽ giúp bạn cảm nhận được nơi chúng có thể xuất hiện trong tương lai. Chạy các chương trình quét thường xuyên sẽ giúp bạn sử dụng các chương trình quét hiệu quả hơn. Tham gia vào các buổi review code, điều này sẽ giúp bạn hiểu và chỉ ra được những lỗ hổng bảo mật trước khi sử dụng ứng dụng.


### 11. Sử dụng những công cụ tự động khi thích hợp

Xem xét liệu các công cụ bảo mật có giúp ích trong kiểm tra bảo mật hay không. 


## Cải thiện


### 12. Đọc sách, tài liệu

Có rất nhiều các ứng dụng hay về bảo mật cho ứng dụng web. Hai cuốn sách tôi muốn giới thiệu là [Web Application Hacker Handbook 2nd ed](https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470/) của người tạo ra Burp scanner Dafydd Stuttard và [The Tangled Web: A Guide to Securing Modern Web Applications](https://www.amazon.com/Tangled-Web-Securing-Modern-Applications/dp/1593273886) bởi Google’s Michal Zalewski.


### 13. Tham gia các khóa đào tạo

Có rất ít khóa đào tạo bảo mật dành riêng cho QA, vì vậy hãy tìm khóa học bảo mật dành cho nhà phát triển web. Các khóa học “penetration testing” có xu hướng tập trung vào tấn công mạng, nhưng cũng có các phần dành riêng để tấn công vào các ứng dụng web, vì vậy hãy kiểm tra nội dung của khóa học trước.
Bạn có thể tìm hiểu thêm về các khóa học được cung cấp bởi [SANS](https://www.sans.org/).

[link](https://gcqt.adj.st/open/contents/2021004844/multi?adj_t=mn1ta6y&adj_deep_link=baseballlive%3A%2F%2Fopen%2Fcontents%2F2021004844%2Fmulti)