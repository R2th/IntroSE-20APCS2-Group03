***Hiện nay kiến trúc Microservices đang là chủ đề được cộng đồng Developer vô cùng quan tâm. Bạn có thể tìm thấy khá nhiều tài nguyên giới thiệu và nói về tính chất cũng như lợi ích của Microservices tuy nhiên không phải ai cũng hiểu và có cái nhìn chính xác về kiến trúc này. Hi vọng bài viết dưới đây sẽ mang đến cho bạn cái nhìn khách quan về các ưu, nhược điểm của Microservices từ đó tìm ra phương pháp áp dụng khoa học và hiệu quả cho công việc, dự án của mình.***
<br>
<br>
Trước tiên hãy xem lý do tại sao bạn nên xem xét sử dụng microservice.
## Kiến trúc một khối (Monolithic Architecture)
Tôi sẽ bắt đầu bằng một ví dụ mà bạn sẽ dễ dàng bắt gặp khi tìm hiểu các bài viết về microservices:<br>
![](https://images.viblo.asia/821a6642-9bfe-4ffb-a793-0e117624b3ad.png)
<br>
Một dịch vụ gọi taxi qua di động, với business logic được thể hiện bởi các khối dịch vụ, đối tượng cho từng vùng nghiệp vụ (domain objects) và các sự kiện (events: khách đặt xe, khách hủy xe, xe nhận khách...) Xung quanh lõi là bộ chuyển đổi (adapter) ví dụ như kết nối vào cơ sở dữ liệu, gửi nhận thông điệp (messaging), web service hoặc giao diện web front end.
<br>
<br>
Trong nhiều trường hợp, người ta có thể xây dựng các services độc lập nhưng chúng lại được triển khai chung. Mặc dù có cấu trúc module hóa hợp lý, nhưng ứng dụng kiểu này sẽ đóng gói và cài đặt thành một khối (monolithic). Mã chạy cụ thể tùy thuộc vào ngôn ngữ lập trình hay thư viện framework.<br>
![](https://images.viblo.asia/ed2e5bbc-f76c-4b5b-8d3c-e0f0bd601401.png)<br>
Tương tự như ứng dụng monolithic, những services này to và phức tạp lên theo thời gian vì thường xuyên thêm các tính năng. Và thế là những ứng dụng này lại trở thành một mớ các services monolithic, cũng không còn khác mấy so với kiến trúc một khối thông thường. Hình trên thể hiện một ứng dụng gồm nhiều services. Những services này được triển khai cùng một lúc vào 1 ứng dụng lớn. Dù bên trong có gồm các services thì đây là một ứng dụng monolithic. Một số tính chất của kiến trúc một khối:<br>
* Được thiết kế, phát triển và triển khai theo một khối duy nhất
* Ứng dụng monolithic phức tạp và to gây khó khăn cho việc bảo trì, nâng cấp và thêm tính năng mới
* Khó áp dụng phát triển kiểu agile
* Phải triển khai lại toàn bộ hệ thống dù chỉ cập nhật hay nâng cấp một phần 
* Mở rộng: phải mở rộng cả khối ứng dụng, gặp khó khăn nếu có các yêu cầu về tài nguyên khác nhau (ví dụ một service yêu cầu thêm CPU, service khác lại yêu cầu nhiều memory)
* Độ tin cậy: một service không ổn định có thể sập cả hệ thống
* Khó đổi mới: ứng dụng monolithic phải sử dụng chung công nghệ nên khó thay đổi hay áp dụng công nghệ mới. <br>
Những tính chất giới hạn trên của kiến trúc Monolithic dẫn tới sự phát triển của kiến trúc Microservices.<br>
## Kiến trúc dịch vụ nhỏ (Microservices Architecture)
***Nền tảng cả kiến trúc microservices là xây dựng một ứng dụng mà ứng dụng này là tổng hợp của nhiều services nhỏ và độc lập có thể chạy riêng biệt, phát triển và triển khai độc lập.***
<br>
<br>
Ta có thể giải quyết các vấn đề của ứng dụng một khối bằng kiến trúc microservices (nhiều dịch vụ nhỏ).  Ý tưởng là chia nhỏ ứng dụng lớn ra thành các dịch vụ nhỏ kết nối với nhau.<br>
Mỗi dịch vụ nhỏ thực hiện một tập các chức năng chuyên biệt như quản lý đơn hàng, quản lý khách hàng. Mỗi dịch vụ là một ứng dụng nhỏ có kiến trúc đa diện lõi là business logic kết nối ra các adapter khác nhau. Một số dịch vụ nhỏ lộ ra giao tiếp lập trình API cho dịch vụ nhỏ khác hay ứng dụng client gọi tới. Khi vận hành, mỗi dịch vụ nhỏ được chạy trong một máy ảo hoặc Docker container.<br>
![](https://images.viblo.asia/ab2cf8a2-ced9-42e9-b014-c22a977bd16a.png)
<br>
Mỗi vùng chức năng giờ được thực thị bởi một dịch vụ nhỏ. Ứng dụng web cũng có thể chia nhỏ hơn chuyên cho từng đối tượng người dùng (hành khách/tài xế). Thiết kế giao diện cho từng đối tượng người dùng giúp tối ưu trải nghiệm tốt hơn, tốc độ nhanh hơn, dễ tương thích hơn trong khi chức năng tối giản hơn.<br>
<br>
Một số khái niệm về microservices nói về quá trình chia tách ứng dụng monolithic thành nhóm các services độc lập. Tuy nhiên, theo quan điểm của tôi, microservices không chỉ về chia tách các servcies sẵn có trong monolithic.

Điều quan trọng chính là nhìn vào các tính năng trong một ứng dụng monolithic, ta có thể nhận biết, xác định các yêu cầu và khả năng cần thiết để đáp ứng một nghiệp vụ. Sau đó từng nghiệp vụ này sẽ được xây dựng thành những service nhỏ, độc lập. Những services này có thể sử dụng các nền tảng công nghệ khác nhau và phục vụ một mục đích cụ thể và có giới hạn.
## Ưu nhược điểm của Microservices
### 1. Ưu điểm
1. Cho phép dễ dàng continuous delivery và deployment các ứng dựng lớn, phức tạp:
* Cải thiện khả năng bảo trì - mỗi service tương đối nhỏ do đó dễ hiểu và thay đổi hơn
* Khả năng testing dễ dàng hơn - các services nhỏ hơn và nhanh hơn để test
* Khả năng triển khai tốt hơn - các services có thể được triển khai độc lập
* Cho phép các services được phát triển bởi những team khác nhau. Mỗi team có thể phát triển, thử nghiệm, triển khai và mở rộng quy mô dịch vụ của mình một cách độc lập với tất cả các team khác.
2. Giảm thiểu rủi ro: Nếu có lỗi trong một service thì chỉ có service đó bị ảnh hưởng. Các services khác sẽ tiếp tục xử lý các yêu cầu. Trong khi đó, một thành phần hoạt động sai của kiến trúc một khối có thể làm ảnh hưởng toàn bộ hệ thống.
3. Dễ dàng thay đổi sử dụng các công nghệ mới: Khi triển khai các services bạn có thể lựa chọn nhiều công nghệ mới. Tương tự khi có thay đổi lớn đối với các services hiện có bạn có thể dễ dàng thay đổi công nghệ.

### 2. Nhược điểm
1. Các nhà phát triển phải đối phó với sự phức tạp của việc tạo ra một hệ thống phân tán:
* Cần implement việc communication giữa các inter-services
* Handle partial failure là rất phức tạp vì một luồng xử lý cần đi qua nhiều services
* Việc thực hiện các requests trải rộng trên nhiều services khó khăn hơn, điều này cũng đòi hỏi sự phối hợp cẩn thận giữa các teams
* Khó khăn trong việc đảm bảo toàn vẹn CSDL nếu triển khai theo kiến trúc cơ sở dữ liệu phân vùng
2. Triển khai và quản lý microservices nếu làm thủ công theo cách đã làm với ứng dụng một khối phức tạp hơn rất nhiều
3. Phải xử lý sự cố khi kết nối chậm, lỗi khi thông điệp không gửi được hoặc thông điệp gửi đến nhiều đích đến vào các thời điểm khác nhau
## Một số điều cần lưu ý khi thiết kế Microservices
### 1. Một số cách hiểu sai về Microservices
* Số dòng code/ kích cỡ của một đội lập trình là chỉ số tồi: có vài cuộc bàn luận về kích thước của một service dựa vào số lượng dòng code hay kích thước của đội phát triển service đó (ví dụ two-pizza team). Tuy nhiên, những cách đo đếm này không thực tiễn và không chính xác, vì ta có thể phát triển services với ít dòng code hoặc với một đội nhỏ nhưng hoàn toàn vi phạm các nguyên tắc trong kiến trúc microservices.
* "Micro" là một từ khóa dễ gây nhầm lẫn. Nếu bạn nghĩ rằng nên tạo ra services nhỏ hết mức thì đó là một cách hiểu sai.
* Trong SOA, services thường trở thành các cục monolithic với nhiều hàm, chức năng khác hỗ trợ. Vì vậy, chỉ phát triển services kiểu SOA rồi dán nhãn microservices hoàn toàn lạc hướng và không mang lại bất kì lợi ích nào của kiến trúc microservices.
### 2. Vậy cần tuân thủ điều gì?
* Single Responsibility Principle (SRP): một service với phạm vi và chức năng giới hạn, tập trung vào một nhiệm vụ giúp quá trình phát triển và triển khai dịch vụ trở nên nhanh chóng hơn.
* Trong quá trình thiết kế, ta nên xác định và giới hạn các services theo chức năng nghiệp vụ thực tế
* Đảm bảo microservices có thể phát triển và triển khai độc lập
* Mục tiêu của thiết kế là phạm vi của microservices phục vụ một nghiệp vụ chứ không chỉ đơn giản làm các dịch vụ nhỏ hơn. Kích thước hợp lý của một service là kích thước đủ để đáp ứng yêu cầu của một chức năng trong hệ thống.
* Khác với services trong SOA, một microservice không nên có quá nhiều hàm hay chức năng hỗ trợ xung quanh và định dạng thông báo/ gửi tin (messaging) đơn giản.
## Làm thế nào để duy trì tính nhất quán dữ liệu?
Thông thường, để đảm bảo tính độc lập mỗi service sẽ có một cơ sở dữ liệu riêng. Duy trì tính nhất quán dữ liệu giữa các services là một thách thức nên [2 phase-commit](https://vi.wikipedia.org/wiki/X%C3%A1c_nh%E1%BA%ADn_hai_pha_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh))/[distributed transactions](https://en.wikipedia.org/wiki/Distributed_transaction) không phải là một lựa chọn tối ưu. Thay vào đó, một ứng dụng nên sử dụng [Saga partten](https://microservices.io/patterns/data/saga.html). <br>
![](https://images.viblo.asia/7ee16d61-17cc-462c-a638-50a74aecc381.jpg)<br><br>
Một service publishes một event khi dữ liệu của nó thay đổi. Các services khác consume event đó và cập nhật dữ liệu của chúng. Nếu một transaction thất bại, thì saga sẽ thực hiện một loạt các transactions để hoàn tác các transactions trước đó. Có một số cách đáng tin cậy để updating data và publishing các events là [Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html) và [Transaction Log Tailing](https://microservices.io/patterns/data/transaction-log-tailing.html).
## Khi nào nên sử dụng kiến trúc Microservices?
Một thách thức đối với việc sử dụng kiến trúc Microservices là khi nào nên sử dụng nó.<br>
Khi phát triển phiên bản đầu tiên của ứng dụng, bạn thường không gặp phải các vấn đề mà Microservices giải quyết. Hơn nữa, sử dụng một kiến trúc phân tán, phức tạp sẽ làm chậm quá trình phát triển. Đây là một vấn đề rất lớn đối với các start-up vì họ cần phát triển nhanh mô hình kinh doanh cùng ứng dụng đi kèm.<br>
Vì vậy, theo tôi, trừ khi bạn có một hệ thống quá phức tạp để quản lý bằng Monolithic Architecture, hoặc bạn xác định tương lai của ứng dụng sẽ trở nên như vậy. Thì kiến trúc Monolithic vẫn đủ tốt đối với bạn.