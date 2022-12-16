Phương pháp kiểm thử phần mềm là các chiến lược hoặc cách tiếp cận khác nhau được sử dụng để kiểm tra một ứng dụng, để đảm bảo ứng dụng hoạt động và giao diện đúng theo thiết kế đã đặt ra. Đây là một quá trình tổng thể bao gồm từ front đến back-end, kiểm tra đơn vị (unit) và hệ thống(system). Bài viết nhằm cung cấp góc nhìn tổng quan nhất về các phương pháp phổ biến được áp dụng trong quá trình kiểm thử
![](https://images.viblo.asia/27c38fab-8dd1-4a27-85bf-7e64f6fe40f8.jpg)
## Kiểm thử chức năng và kiểm thử phi chức năng (Functional vs. Non-functional Testing)
Mục tiêu của việc sử dụng nhiều phương pháp thử nghiệm trong quy trình phát triển nhằm đảm bảo phần mềm có thể hoạt động hiệu quả trong nhiều môi trường và trên các nền tảng khác nhau. Các phương pháp kiểm thử có thể chia thành hai loại chính: Kiểm thử chức năng và kiểm thử phi chức năng (Functional vs. Non-functional Testing).

**Kiểm thử chức năng** bao gồm kiểm tra ứng theo yêu cầu hoạt động thực tế của phần mềm. Kết hợp tất cả các phương pháp kiểm thử được thiết kế để đảm bảo từng phần một của phần mềm hoạt động như mong đợi, bằng cách sử dụng các trường hợp sử dụng (uses cases) được cung cấp bởi nhóm thiết kế hoặc nhà phân tích kinh doanh (BA). Các phương pháp kiểm tra này thường được tiến hành theo thứ tự và bao gồm:

_ Kiểm thử đơn vị (Unit testing)
_ Kiểm thử tích hợp (Integration testing)
_ Kiểm thử hệ thống (System testing)
_ Kiểm thử chấp nhận (Acceptance testing)

**Các phương pháp kiểm thử phi chức năng** kết hợp tất cả các loại kiểm thử tập trung vào các khía cạnh hoạt động của một phần mềm. Bao gồm:

_Kiểm thử hiệu suất (Performance testing)
_Kiểm thử bảo mật (Security testing)
_Kiểm thử khả năng sử dụng (Usability testing)
_Kiểm thử khả năng tương thích (Compatibility testing)
Chìa khóa để phát hành phần mềm chất lượng cao mà người dùng cuối có thể dễ dàng chấp nhận là xây dựng một mô hình kiểm thử toàn diện, trong đó bao gồm đồng bộ kiểm thử chức năng và phi chức năng.

## Kiểm thử đơn vị (Unit testing)
Kiểm thử đơn vị là cấp độ thử nghiệm đầu tiên và thường được thực hiện bởi chính lập trình viên. Đây là quá trình đảm bảo các thành phần riêng lẻ của một phần mềm ở cấp mã nguồn có chức năng và hoạt động như được thiết kế. Lập trình viên trong môi trường dựa trên thử nghiệm thường sẽ viết và chạy thử nghiệm trước khi phần mềm hoặc tính năng được chuyển cho bộ phận kiểm thử. Kiểm thử đơn vị có thể được tiến hành thủ công, nhưng tự động hóa quy trình sẽ tăng tốc chu kỳ phân phối và mở rộng phạm vi kiểm tra. Kiểm thử đơn vị cũng sẽ giúp việc gỡ lỗi dễ dàng hơn vì việc tìm kiếm các sự cố sớm hơn có nghĩa là chúng mất ít thời gian để khắc phục hơn so với việc chúng được phát hiện sau đó trong quá trình kiểm tra.

## Kiểm thử tích hợp (Integration testing)
Sau khi mỗi đơn vị được kiểm tra kỹ lưỡng, được tích hợp với các đơn vị khác để tạo ra các mô-đun hoặc thành phần được thiết kế để thực hiện các nhiệm vụ hoặc hoạt động cụ thể. Sau đó, chúng được kiểm tra theo nhóm thông qua kiểm tra tích hợp để đảm bảo toàn bộ các phân đoạn của ứng dụng hoạt động như mong đợi ( các tương tác giữa các đơn vị là liền mạch). Các thử nghiệm này thường được tạo lập dựa trên kịch bản người dùng, chẳng hạn như đăng nhập vào một ứng dụng hoặc mở tệp. Các thử nghiệm tích hợp có thể được tiến hành bởi lập trình viên hoặc nhân viên kiểm thử và thường bao gồm sự kết hợp của các thử nghiệm chức năng và thủ công hoặc tự động.

## Kiểm thử hệ thống (System testing)
Kiểm thử hệ thống là phương pháp kiểm thử hộp đen được sử dụng để đánh giá toàn bộ hệ thống đã hoàn thành và tích hợp, để đảm bảo đáp ứng các yêu cầu cụ thể. Chức năng của phần mềm được kiểm tra từ đầu đến cuối và thường được tiến hành bởi bộ phận kiểm thử riêng biệt so với nhóm lập trình.

## Kiểm thử chấp nhận (Acceptance testing)
Kiểm thử chấp nhận là giai đoạn cuối của kiểm thử chức năng và được sử dụng để đánh giá liệu phần mềm cuối cùng có sẵn sàng để bàn giao hay không. Nhằm đảm bảo rằng sản phẩm tuân thủ tất cả các tiêu chí kinh doanh ban đầu và đáp ứng nhu cầu của người dùng cuối. Điều này đòi hỏi sản phẩm phải được kiểm tra cả bên trong và bên ngoài, nghĩa là bạn cần phải phát hành phiên bản beta, nhằm người dùng cuối có thể thử nghiệm ứng dụng. Thử nghiệm Beta là chìa khóa để nhận phản hồi thực sự từ khách hàng tiềm năng và có thể chỉ ra những khiếm khuyết thật sự khi sản phẩm được đưa vào ứng dụng thực tế.

## Kiểm thử hiệu suất (Performance testing)
Kiểm thử hiệu suất là một kỹ thuật kiểm tra phi chức năng được sử dụng để xác định cách ứng dụng sẽ hoạt động trong các điều kiện khác nhau. Mục tiêu là để kiểm tra khả năng đáp ứng và tính ổn định của nó trong các tình huống người dùng thực. Kiểm tra hiệu suất có thể được chia thành bốn loại:

**Load testing** là quá trình đưa số lượng nhu cầu mô phỏng ngày càng tăng lên trên phần mềm, ứng dụng hoặc trang web để xác minh xem liệu phần mềm có thể xử lý những gì nó được thiết kế để xử lý hay không.
**Stress test** được sử dụng để đánh giá cách phần mềm sẽ phản hồi tại
điểm quá tải hoặc vượt quá tải tối đa. Mục tiêu của Stress test là làm quá tải ứng dụng theo chủ đích cho đến khi phần mềm gặp sự cố bằng cách áp dụng cả kịch bản tải thực tế và phi thực tế. Với Stress test, bạn sẽ có thể tìm thấy giới hạn chịu tải của phần mềm.
**Endurance testing** được sử dụng để phân tích hành vi của ứng dụng theo một lượng tải mô phỏng cụ thể trong khoảng thời gian dài hơn. Mục tiêu là để hiểu hệ thống của bạn sẽ hoạt động như thế nào trong quá trình sử dụng bền vững, việc này là một quá trình dài hơn so với thử nghiệm tải hoặc Stress test ( thường được thiết kế để kết thúc sau vài giờ). Một phần quan trọng của kiểm tra độ bền là nó giúp phát hiện rò rỉ bộ nhớ (memory leaks).
**Spike test** là một loại kiểm tra tải được sử dụng để xác định cách phần mềm của bạn sẽ phản ứng với thời điểm người dùng gia tăng đột biến hoặc hoạt động của hệ thống có thay đổi bất thường vào các khoảng thời gian ngẫu nhiên. Lý tưởng nhất, điều này sẽ giúp bạn hiểu những gì sẽ xảy ra khi tải đột ngột và tăng mạnh.
**Kiểm thử bảo mật (Security testing)**
Với sự gia tăng của các nền tảng thử nghiệm dựa trên đám mây và các cuộc tấn công mạng, mối quan tâm ngày càng tăng về việc cần bảo mật dữ liệu được sử dụng và lưu trữ trong phần mềm. Kiểm thử bảo mật là một kỹ thuật kiểm thử phần mềm phi chức năng được sử dụng để xác định xem thông tin và dữ liệu trong hệ thống có được bảo vệ hay không. Mục đích là cố tình tìm ra các lỗ hổng và rủi ro bảo mật trong hệ thống có thể dẫn đến truy cập trái phép hoặc mất thông tin bằng cách phát hiện các lỗ hổng bảo mật của ứng dụng. Có nhiều loại phương pháp thử nghiệm này, mỗi loại nhằm xác minh sáu nguyên tắc bảo mật cơ bản:
1.Integrity
2.Confidentiality
3.Authentication
4.Authorization
5.Availability
6.Non-repudiation

## Kiểm thử khả năng sử dụng (Usability testing)
Kiểm tra khả năng sử dụng là một phương pháp kiểm tra đo lường mức độ dễ sử dụng của ứng dụng theo quan điểm của người dùng cuối và thường được thực hiện trong giai đoạn kiểm thử chấp nhận (Acceptance testing). Mục tiêu là để xác định xem giao diện và tính thẩm mỹ của ứng dụng có đáp quy trình hoạt động và dự định cho các tác vụ khác hay không, ví dụ như đăng nhập vào ứng dụng. Kiểm tra khả năng sử dụng là một cách tuyệt vời để các nhóm xem xét các chức năng riêng biệt hoặc toàn bộ hệ thống, trực quan để sử dụng.

## Kiểm thử khả năng tương thích (Compatibility testing)
Kiểm tra khả năng tương thích được sử dụng để đánh giá cách một ứng dụng hoặc một phần mềm sẽ hoạt động trong các môi trường khác nhau. Nó được sử dụng để kiểm tra xem sản phẩm của bạn có tương thích với nhiều hệ điều hành, nền tảng, trình duyệt hoặc cấu hình độ phân giải hay không. Mục tiêu là để đảm bảo rằng chức năng của phần mềm của bạn luôn được hỗ trợ trên mọi môi trường mà bạn mong muốn người dùng cuối của mình sẽ sử dụng.

Được dịnh từ :https://smartbear.com/learn/automated-testing/software-testing-methodologies/
Nguồn dịnh: http://testerviet.com.vn/phuong-phap-kiem-thu/