Hiện nay, với sự phát triển của các công nghệ đã thay đổi cách chúng ta xây dựng kiến trúc của một ứng dụng. Cùng với sự phát triển của Docker, cloud service... đã mang lại cho chúng ta khả năng phát triển các giải pháp phân tán, có thể mở rộng và đáng tin cậy hơn. Trong bài viết này mình sẽ so sánh kiến trúc microservices và monolith để thấy được ưu nhược điểm của từng loại.
Để hình dung rõ sự khác biệt các bạn có thể xem hình dưới đây.

Như chúng ta thấy ứng dụng phát triển theo kiến trúc monolith đơn giản hơn ứng dụng phát triển theo microservice rất nhiều lần.
Để so sánh hai loại kiên trúc trên chúng ta cùng xem xét qua các điểm sau.

## Deployment
Ứng dụng Monolith cho phép bạn thiết lập việc deployment của mình một lần và sau đó chỉ cần điều chỉnh nó dựa trên những thay đổi đang diễn ra. Tuy nhiên,  nếu như chỉ cần có một lỗi duy nhất trong quá trình deployment và nếu mọi thứ trục trặc, bạn có thể phá vỡ toàn bộ dự án của mình.

Microservices đòi hỏi nhiều công việc hơn; bạn sẽ cần phải deploy từng microservice một cách độc lập và cố gắng thống nhất định dạng của ci / cd để giảm lượng thời gian cần thiết để thực hiện việc đó cho mỗi microservice mới.Nếu xảy ra sự cố, chỉ có một microservice nhỏ gặp vấn đề. Việc khôi phục một microservices nhỏ cũng dễ dàng hơn nhiều so với toàn bộ ứng dụng monolith.

## Bảo trì
Nếu bạn định sử dụng kiến trúc microservices, bạn sẽ cần một DevOps cho nhóm của bạn và chuẩn bị cho bản thân.các kiến thức về DevOps bởi vì không phải developer nào cũng có thể làm việc tốt với docker hoặc các công cụ như  Kubernetes, Docker Swarm, Mesosphere... 

## Độ tin cậy
Kiến trúc Microservices có ưu điểm hơn hẳn về độ tin cậy. Việc một microservice gặp sự cố chỉ ảnh hưởng đến những khách hàng sử dụng nó và các service khác vẫn hoạt động. Ví dụ khi phát triển ứng dụng ngân hàng nếu như microservice cho chức năng rút tiền gặp sự cố thì chỉ có các chức năng mà service này cung cấp không hoạt động điều này tốt hơn rất nhiều so với việc toàn bộ ứng dụng không  hoạt động.

## Khả năng mở rộng
Đối với khả năng mở rộng, microservices lại phù hợp hơn. Các tài nguyên có thể được sử dụng cẩn thận hơn và chỉ cho phép bạn mở rộng quy mô các phần yêu cầu nhiều tài nguyên hơn. Ứng dụng monolith rất khó mở rộng quy mô bởi vì ngay cả khi bạn chạy nhiều worker hơn . Mỗi worker chạy một dự án duy nhất(quản lý tài nguyên không hiệu quả). 

## Phát triển
Cách tốt nhất để đối phó với microservices là xây dựng tệp soạn thảo docker của bạn ngay từ đầu và phát triển thông qua Docker. Điều này giúp bạn giảm thời gian làm quen với những người mới; chỉ cần chạy hệ thống từ đầu và khởi chạy tất cả các dịch vụ nhỏ khi cần thiết.
Mặt khác. khi bạn phát triển một microservice, bạn có thể gặp trường hợp mà bạn không cần chạy các phần khác của ứng dụng. Điều này dẫn đến ít vấn đề về git conflict hơn do quá trình chia nhỏ tasks tốt hơn và khả năng cô lập các developer trên các microservices.

## Releasing
Các microservices nhỏ hơn và có kiến trúc giao tiếp microservices phù hợp cho phép bạn release các tính năng mới nhanh hơn bằng cách giảm thời gian QA, thời gian xây dựng và thời gian thực hiện kiểm tra. Ứng dụng Monolith có rất nhiều phụ thuộc nội bộ không thể chia nhỏ.

## Tổng kết
Sử dụng kiến trúc monolith khi
* dự án nhỏ, có số lượng nhỏ dev, chi phí thấp.
* có kinh nghiệm phát triển trên các framework vững chắc, chẳng hạn như Ruby on Rails, Laravel, v.v.
* không nhận được hàng triệu đô đầu tư để thuê DevOps hoặc dành thêm thời gian cho kiến trúc phức tạp.

Sử dụng kiến trúc microservice khi
* deadline phát triển dự án lớn.
* team dev có kiến thức về nhiều ngôn ngữ khác nhau.
* quan tâm nhiều đến khả năng phát triển và mở rộng của sản phẩm

## TÀI LIỆU THAM KHẢO
https://dev.to/alex_barashkov/microservices-vs-monolith-architecture-4l1m