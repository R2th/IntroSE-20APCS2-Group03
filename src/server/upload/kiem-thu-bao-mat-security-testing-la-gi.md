*Bài viết sau được dịch từ link: https://www.qualitestgroup.com/white-papers/what-is-security-testing/*

Như chúng ta đã biết, kiểm thử chức năng có tác dụng đảm bảo rằng phần mềm hoạt động theo những yêu cầu trong tài liệu mô tả khách hàng đưa ra. Kiểm thử chức năng đảm bảo với khách hàng rằng phần mềm của họ sẽ thực thi theo đúng như yêu cầu và tài liệu đặc tả. Còn kiểm thử bảo mật là một phần mở rộng của kiểm thử tiêu cực. Nó tập trung vào những giá trị đầu vào không hợp lệ và xem xét xem liệu những đầu vào này có khả năng gây ra những lỗi nghiêm trọng liên quan đến các yêu cầu nhất định của sản phẩm đang được kiểm thử hay không.

### 1. Giới thiệu
Với sự gia tăng những dịch vụ mới được cung cấp thông qua mạng lưới internet, càng ngày càng có nhiều vụ xâm nhập bảo mật trong các lĩnh vực như ngân hàng trực tuyến, game trực tuyến hay xâm nhập email các chính khách. Việc kết nối giữa các máy tính ngày càng tăng lên thông qua mạng lưới internet đã góp phần làm gia tăng số lượng các cuộc tấn công và số lượng các phần mềm có thể bị tấn công và cũng đã đặt các hệ thống vào rủi ro lớn. Con người, nền kinh tế và các tổ chức chính phủ càng ngày càng phụ thuộc nhiều hơn vào các kết nối trực tuyến như email hoặc trang web được cung cấp bởi hệ thống thông tin. Khi các hệ thống này được kết nối với nhau, chúng sẽ rất dễ bị tấn công bởi các phần mềm khác dù chúng ở cách xa nhau. Do việc kết nối thông qua internet không bắt buộc phải có sự can thiệp của con người nên việc phát động các cuộc tấn công tự động là rất dễ dàng.

![](https://images.viblo.asia/957e6f0e-5f10-4017-89fa-2076e543b29b.png)

Trong vài năm qua, đã có sự xâm phạm tài liệu của nhiều hệ thống phần mềm trực tuyến. Cho dù đó là vì lý do chính trị (Anonymous / WikiLeaks) hoặc trộm cắp (Sony PlayStation Network), việc xâm nhập vào các dịch vụ trực tuyến phổ biến chắc chắn đã tăng lên trong vài năm qua, và vẫn đang tiếp tục tăng, nhiều đến mức mà việc nghe về chúng không còn hiếm thấy ở các quốc gia và thậm chí là ở trên các bản tin quốc tế.

#### Định nghĩa về kiểm thử bảo mật và các khái niệm liên quan:
Như đã định nghĩa ở trên, chúng tôi xin nhắc lại một lần nữa về định nghĩa kiểm thử bảo mật.
Kiểm thử bảo mật là một phần mở rộng của kiểm thử tiêu cực. Nó tập trung vào những giá trị đầu vào không hợp lệ và liệu những đầu vào này có khả năng tạo ra những thất bại đáng kể liên quan đến các yêu cầu nhất định của sản phẩm đang được kiểm thử hay không.
Ta cần đưa ra đầy đủ chứng cứ để chứng minh với khách hàng rằng hệ thống và những thông tin hệ thống của họ được đảm bảo an toàn và bảo mật trước những đầu vào không hợp lệ là một phần vô cùng quan trọng trong kiểm thử bảo mật. Vậy những thông tin cần đưa ra là gì?

![](https://images.viblo.asia/e38ac624-4f76-4dd8-8b58-d30b9669c707.png)

Chúng tôi xin đưa ra một số thông tin cơ bản về bảo mật như sau:
- Asset: Bất cứ cái gì có giá trị với tổ chức, có thể là mục tiêu bị đe dọa
- Threat: Nguyên nhân tiềm ẩn của những tai nạn mà kết quả của nó có thể gây nguy hại tới hệ thống hoặc tổ chức [ISO/IEC 27001:2005]
- Lỗ hổng (Vulnerability): Được định nghĩa như điểm yếu của tài sản hoặc 1 nhóm tài sản, cái có thể bị khai thác bởi 1 hoặc nhiều nguy cơ. 
Lỗ hổng có thể được tìm thấy trong phần mềm, hệ thống thông tin, giao thức mạng và thiết bị, vv. Nếu lỗ hổng không được quản lý thì sẽ dẫn đến sự hiện thực hóa của những đe dọa. Một số ví dụ như lỗ hổng bao gồm phần mềm chưa được vá, mật khẩu yếu, thiếu kiểm soát truy cập, không cài đặt tường lửa, v.v.
- Rủi ro (Risk): Nguy cơ rằng mối đe dọa nhất định sẽ khai thác lỗ hổng để gây tổn thất hoặc thiệt hại cho tài sản hoặc nhóm tài sản thông tin, từ đó gây hại cho tổ chức. Nó được đo lường bằng sự kết hợp giữa xác suất xảy ra và mức độ nghiêm trọng khi sự kiện xảy ra.
- Bảo mật thông tin (Information security):  Sự gìn giữ tính bảo mật, tính toàn vẹn và tính sẵn sàng của thông tin, ngoài ra, còn một số thuộc tính khác như tính xác thực, tính trách nhiệm, tính không từ chối và độ tin cậy cũng có thể được tính đến. [ISO27002: 2005] Hoạt động gián điệp là việc thu thập trái phép các tài liệu bí mật, được phân loại hoặc sở hữu độc quyền.

### 2. Sự quan trọng của kiểm thử bảo mật
Để cùng tìm hiểu tại sao việc bảo mật thông tin hệ thống cũng như hệ thống khách hàng là vô cùng quan trọng, chúng ta hãy cùng tìm hiểu bài học của Sony dưới đây
Suốt nhiều năm liền, chúng tôi đã được nghe đến một vài câu chuyện khiến chúng tôi chú trọng hơn về tầm quan trọng của kiểm thử bảo mật. Một trong số đó là câu chuyện xảy ra vào năm 2011, khi mạng lưới hệ thống Sony Play Station bị xâm nhập. Đây là một hệ thống game trực tuyến được những người sở hữu thiết bị game của Sony sử dụng trên toàn thế giới, ước tính có khoảng 20 triệu người dùng và hơn 75 triệu thành viên. Chính kích thước và độ rộng của mạng lưới là điều khiến câu chuyện này hiện vẫn đang là bài học thích hợp cho những sơ hở về bảo mật cho cả giới game trực tuyến nói riêng và cho giới phần mềm nói chung.

Cuộc tấn công này đã làm tổn hại đến khách hàng cùng thông tin thanh toán của họ, đồng thời cũng khiến mạng lưới Sony PlayStation phải ngắt kết nối khoảng hơn 1 tháng trong khi điều tra xem có việc đánh cắp thông tin khách hàng từ hệ thống dữ liệu của Sony hay không. Điều này dẫn đến việc thời gian hệ thống bị down khá nhiều đối với những game thủ chơi online thường xuyên. Tệ hơn nữa là nó đã khiến hàng triệu thông tin ngân hàng của khách hàng gặp rủi ro, trong khi đó Sony không thể xác minh liệu có bất kỳ hành vi trộm cắp dữ liệu nào thực sự xảy ra hay không? Điều này khiến hàng triệu khách hàng của Sony lo lắng về việc xác định hành vi trộm cắp và gian lận thẻ tín dụng quốc tế. Nhiều game thủ trung thành đã trở nên thất vọng với Sony và quay sang phía đối thủ cạnh tranh chính của Sony là Microsoft Xbox. Mặc dù Sony đã miễn phí dịch vụ PlayStation, các game thủ hardcore có lẽ vẫn không thể chấp nhận việc một dịch vụ được hàng triệu người sử dụng lại có những lỗ hổng bảo mật như vậy.

![](https://images.viblo.asia/6d3fb3bd-899e-4b63-9276-818c6bc87cf8.jpg)

Thời gian hệ thống của Sony down gây tổn hại nhiều đến không chỉ những khách hàng là game thủ. Ngày nay, các bảng điều khiển game được sử dụng với nhiều mục đích hơn là chỉ để chơi game, nó có thể được dùng để download các phương tiện giải trí (như phim ảnh, file nhạc mp3 hoặc sử dụng trình duyệt web) và được sử dụng như một công cụ giải trí tại nhà… Và chính những người sử dụng những tiện ích thông thường này cũng bị ảnh hưởng. Điều này khiến cho Sony bị tổn thất khá nặng nề về uy tín và thương hiệu. Ngoài việc miễn phí các dịch vụ và game, Sony còn phải cung cấp dịch vụ kiểm tra thẻ tín dụng miễn phí cho người dùng của họ để lấy lại uy tín.

Đó là một ví dụ minh họa điển hình về việc tại sao chúng ta lại cần kiểm thử bảo mật, nhưng chúng ta vẫn chưa thể thực sự trả lời cho câu hỏi bảo mật là gì? Bảo mật phần mềm có liên quan tới toàn bộ quá trình thiết kế, xây dựng, kiểm thử phần mềm cho quá trình bảo mật. Bảo mật phần mềm là yếu tố mấu chốt của bảo mật máy tính nhờ việc xác định và giải quyết các vấn đề trong chính phần mềm. Bằng cách này, phần mềm có thể được xây dựng để có thể chịu được sự tấn công một cách chủ động.

Kiểm thử bảo mật đặc trưng có thể chiếm đến 90% ngân sách của bảo mật thông tin, một số tiền thường được đầu tư vào bảo mật mạng lưới là tường lửa và hệ thống xâm nhập. Tuy nhiên việc xâm nhập không chỉ nhắm vào chính bản thân ứng dụng và cơ sở hạ tầng tại chỗ. Dev cần phải đảm bảo rằng không có lỗ hổng an ninh nào tồn tại trong các dòng code của họ. Điều này có thể trở nên phức tạp vì phần mềm được xây dựng để đáp ứng những yêu cầu cơ bản nhất. Nó khiến cho kịch bản kiểm thử cũng phải được xây dựng dựa theo các yêu cầu chức năng, ví dụ như mục đích của phần mềm, mà không cần quan tâm đến những gì phần mềm không thể thực hiện. Một nhân viên kiểm thử phần mềm giỏi cần phải cân nhắc đến các kịch bản tiêu cực. Có một tin tốt là ngày nay, một số lỗ hổng bảo mật đã được công khai và có các công cụ có thể giúp chúng ta ngăn chặn chúng ngay trong code. Một số lỗ hổng bảo mật cơ bản dưới đây: 

### 3. Top các lỗ hổng bảo mật
1. Injection Flaws (SQL, OS and LDAP Injection)
2. Broken Authentication and Session Management
3. Cross Site Scripting (XSS)
4. Insecure Direct Object Reference
5. Security Misconfiguration
6. Sensitive Data Exposure
7. Missing Function Level Access Control
8. Cross-Site Request Forgery (CSRF)
9. Using Components with Known Vulnerabilities

Để chắc chắn rằng trong dự án của bạn không có một lỗ hổng bảo mật nào, các cố vấn có thể làm theo một số bước cơ bản dưới đây:
- Đánh giá rủi ro bảo mật tập trung vào quá trình kiểm thử của bạn
– Rủi ro nào gây ra bởi những lỗ hổng bảo mật tiềm tàng?Thực hiện phân tích thất bại để giúp đánh giá tác động của bất kỳ rủi ro nào.
- Kiểm thử phần mềm với lỗi bảo mật
– Xem xét việc sử dụng công cụ tự động: Có rất nhiều công cụ tự động có thể chạy để đánh giá phần mềm với những rủi ro tiềm ẩn về bảo mật. Xem xét việc sử dụng các công cụ này càng sớm càng tốt, ngay khi các bản build có thể test được đã sẵn sàng
- Phân tích phần mềm từ những lỗi bảo mật
– Phân tích các khiếm khuyết có thể được tìm thấy, những loại lỗ hổng bảo mật nào có thể xuất hiện?
- Đánh giá các kiểu rủi ro bảo mật, thất bại và lỗi
– Cố gắng rút ra kết luận từ bất cứ mẫu nào được tìm thấy có liên quan đến lỗ hổng bảo mật. Nó có thể giúp chúng ta tập trung vào những tính năng hoặc đoạn mã cần phải phân tích và kiểm thử kỹ hơn.
- Sửa lỗi và quan tâm đến quá trình hồi quy của phần mềm
- Đảm bảo rằng kiểm thử hồi quy được thực hiện để đảm bảo không có sai sót nào sinh ra trong khi sửa những lỗi đang tồn tại.
- Kiểm tra các chỉ số trong thực tế bằng cách theo dõi các chỉ số bảo mật quan trọng
- Có nhiều chỉ số bảo mật có thể phát sinh trong quá trình kiểm thử như tải trọng của mạng, số lượng câu lệnh truy xuất cơ sở dữ liệu, số lượng reset mật khẩu… Kiểm thử xung quanh các giới hạn của mỗi số liệu có thể phát hiện ra những nguy cơ bảo mật tiềm ẩn (DDOS, SQL injections…)
- Cuối cùng hãy nhớ rằng, bạn không thể kiểm tra chất lượng và cũng không thể kiểm tra bảo mật. Nó phải có mặt trong hệ thống ngay từ khi bắt đầu.
Chính sách bảo mật, thủ tục và quy trình đều là những điều cốt yếu để đảm bảo tính bảo mật của hệ thống. Kiểm thử bảo mật không bao giờ ngừng, giống như việc phát triển phần mềm luôn thay đổi liên tục ,việc giám sát và nhận thức về bảo mật cũng phải luôn luôn diễn ra. Mục tiêu của chúng ta là luôn cố gắng đi trước hacker 1 bước