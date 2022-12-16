Microservice architecture là một trong những xu hướng kiến trúc phần mềm được thảo luận nhiều nhất tại thời điểm hiện tại và nó đã thay đổi vĩnh viễn cách thức xây dựng các ứng dụng lớn. Thay vì cách tiếp cận monolithic chậm chạp, phức tạp trong quá khứ, developer và công ty ở khắp mọi nơi đang chuyển dịch sang kiến trúc microservice để đơn giản hóa và mở rộng cấu trúc. Trên thực tế, ngay cả các công ty như Amazon, Netflix, Spotify và Uber cũng đã thực hiện quá trình chuyển dịch này.

### I. Microservices Architecture là gì?

Thực tế thì không có định nghĩa phổ quát cho thuật ngữ microservice. Định nghĩa đơn giản nhất của microservice, hay còn gọi là *microservice architecture,* là một kiểu kiến trúc mà cấu trúc một ứng dụng bằng các service được ghép nối lỏng (*loosely couple*). Các collection hoặc mô-đun này có thể được phát triển, triển khai và bảo trì độc lập (develop, deploy, maintain).

![](https://images.viblo.asia/26b0997d-328b-49dc-b35b-bd3aa91de153.png)

![](https://images.viblo.asia/09ee6b81-01f5-4f75-81ae-8a4c3c95752b.png)

Chúng hoạt động ở tốc độ nhanh hơn, ổn định hơn ứng dụng monolithic truyền thống. Bằng việc sử dụng microservice, một tổ chức dù lớn hay bé đều có thể phát triển technology stack tùy theo năng lực.

Bên cạnh lợi ích khi sử dụng microservice, thì cũng có một số tranh cãi về việc liệu các công ty có nên chuyển từ kiểu kiến trúc monolithic sang microservice hay không. Hãy cùng xem sự khác biệt giữa cả 2 để hiểu tại sao lại có tranh luận này.

![](https://images.viblo.asia/5db96805-b72b-441e-8fa2-de135e9c490a.png)


#### Monolithic vs. Microservices

Monolithic là kiểu kiến trúc truyền thống khi muốn xây dựng và triển khai ứng dụng. Kiến trúc này dựa trên khái niệm về một thể duy nhất, không tách rời bao gồm server, client và database. Tất cả được thống nhất và quản lý như một codebase. Điều này có nghĩa là bất kỳ thay đổi nào cũng sẽ ảnh hưởng đến cả hệ thống. Bơi vậy khi muốn scale ứng dụng monolithic thì chúng trở nên phức tạp, và tổng thể vòng đời phát triển sẽ dài hơn.

Ở một chiều hướng khác, kiến trúc microservice chia nhỏ thể duy nhất ấy thành các đơn vị độc lập có chức năng như những service riêng biệt. Nghĩa là, mọi service có logic và codebase riêng. Chúng liên lạc với nhau thông qua API.

Vậy thì nên chọn kiến trúc nào?

**Chọn kiến trúc monolithic**
* Nếu công ty bạn là một team nhỏ, bằng cách này thì tránh được phức tạp khi deploy microservice.

* Hoặc là bạn muốn triển khai nhanh. Hệ thống sẽ cần thêm thời gian để cập nhật về sau, nhưng khởi đầu thì nó phát triển nhanh hơn. 

**Chọn kiến trúc microservices**

* Nếu bạn muốn phát triển ứng dụng có khả năng scale. Scale ứng dụng microservice dễ hơn monolithic rất nhiều. Tính năng và module mới được thêm vào một cách đơn giản và nhanh gọn.
* Nếu công ty lớn hoặc có kế hoạch mở rộng quy mô. 

![](https://images.viblo.asia/94ed0840-596e-46f7-987d-918088a687c4.png)


### II. Ưu và nhược của microservices

Có nhiều lý do microservice là lựa chọn đúng đắn cho công ty. Hãy thảo luận một số lợi ích đáng lưu ý và sau đó cùng xem xét một số nhược điểm.

#### Ưu
##### Improves Scalability and Productivity
Các team lớn thường phải làm việc ở những dự án phức tạp. Với microservice, dự án có thể chia nhành nhiều đơn vị nhỏ và độc lập. Điều này có nghĩa là mỗi team có thể hoạt động độc lập về logic, domain, giúp giảm thiểu effort. Trên hết là mỗi team có thể tự chọn technology stack cho phần microservice mà mình đảm nhận.

Miễn là API đầu ra chuẩn thì bất kỳ ngôn ngữ nào cũng có thể sử dụng để viết microservie, bởi vậy nên team có thể chọn ngôn ngữ phù hợp với nhu cầu của những người trong team.

##### Tích hợp tốt với hệ thống cũ

Hệ thống monolithic khó để maintain. Nhiều hệ thống cũ được dựng sơ sài, khó test và sử dụng công nghệ lỗi thời. Rất may là với microservice, ta có thể vừa làm việc với hệ thống cũ, vừa dần cải thiện mã nguồn và thay thế các phần cũ của hệ thống. Tích hợp nhanh và đơn giản chính là thế mạnh của microservice so với ứng dụng truyền thống kiểu nguyên khối.

##### Phát triển bền vững

Kiến trúc microservice tạo ra những hệ thống có thể duy trì trong thời gian dài do các phần khác nhau đều có thể thay thế được. Điều này có nghĩa là một microservice có thể viết lại dễ dàng mà không ảnh hưởng đến toàn bộ hệ htoongs. Miễn là sự phụ thuộc giữa các microservice được vận hành hợp lý thì việc thực hiện các thay đổi để phục vụ performance cũng như nhu cầu của team sẽ rất đơn giản.

##### Cross-functionality
Microservices cực kỳ phù hợp với những team làm remote, cho phép các quyền tự do cần thiết và linh hoạt để hoạt động tự chủ. Các vấn đề về kỹ thuật sẽ được quyết định nhanh chóng, tích hợp đơn giản.

#### Nhược
##### Deploy cần nhiều efffort hơn
Vận hành một hệ thống microservice yêu cầu nhiều efffort hơn bình thường. Những thay đổi về *interface* phải được thực hiện sao cho việc deploy từng microservice đơn lẻ vẫn có thể làm được.

##### Test độc lập
Dù tất cả microservice phải được test tích hợp, thì mỗi microservice cũng cần phải test độc lập.

##### Khó thay đổi nhiều microservice
Những thay đổi mà ảnh hưởng đến nhiều microservice sẽ khó được thực hiện. Trong hệ thống microservice, một thay đổi yêu cầu nhiều bên phối hợp để deploy.

![](https://images.viblo.asia/4fdbd19f-1e34-4dce-b7ae-c092d43e0e09.png)

### III. Microservices và Docker
Docker và Microservices gần như là một. Microservices phải được triển khai riêng rẽ như một đơn vị độc lập. Nhưng, nếu ta cần tạo nhiều microservice cho ứng dụng thì thế nào? Docker chính là giải pháp để deploy microservice. Một microservice có thể được đóng gói trong docker image và phân lập thành một docker container. Bằng cách này thì ứng dụng có thể có môi trường độc lập với máy chủ.

Thay vì sử dụng nhiều máy ảo, Docker container chia sẻ nhân hệ điều hành cho các host. Tiến trình từ container sẽ xuất hiện trong bảng tiến trình (process) của hệ điều hành mà Docker đang chạy.

Để sử dụng Docker với microservice, bạn cần tạo Docker image qua một file gọi là Dockerfile. Ví dụ:


```
FROM openjdk:11.0.2-jre-slim
COPY target/customer.jar .
CMD /usr/bin/java -Xmx400m -Xms400m -jar customer.jar
EXPOSE 8080
```

Một hệ thống microservice điển hình sẽ chứa nhiều Docker container. Để kết hợp một hệ thống gồm nhiều Docker container thì cần cấu hình mạng ảo. Các container cần phải liên lạc được với nhau.

![](https://images.viblo.asia/6e8e6b07-e48d-4cc5-b15f-0fb1dc6ca42b.png)

### IV. Technology stacks và architecture patterns

Một trong những điều cần phải nắm rõ là cách microservice vận hành cũng như cách xây dựng và cài đặt. Đó là lý do chúng ta muốn tập trung vào những công nghệ khác nhau cho toàn bộ hệ thống microservice. Cùng điểm qua một số tech stack, pattern và design để tạo nên một kiến trúc microservice.

#### Micro và Macro architecture

Thường thì ta sẽ chia thành 2 kiểu kiến trúc micro và macro. Micro bao gồm những quyết định cho mỗi service. Macro là quyết định ở tầng global ảnh hưởng đến tất cả các service.

Có thể mở rộng khái niệm về micro và macro cho các vấn đề kỹ thuật. Ví dụ, xem xét quyết định về kỹ thuật được đưa ra ở mức độ micro và macro cho một database:

* Micro: mỗi microservice có database riêng. Nếu database được thiết lập ở kiến trúc micro, thì sự cố của database sẽ chỉ ảnh hưởng đến microservice đó, giúp toàn bộ ứng dụng ổn định hơn.

* Macro: database được thiết lập như một phần của kiến trúc macro. Nhiều microservice không xài chung một database.

![](https://images.viblo.asia/f0fce8bf-2d4c-4a2b-9100-b552a64132da.png)

#### Self-contained systems

Self-contained system (SCS) là kiểu kiến trúc microservice chỉ định thành phần của kiến trúc macro, nhưng không có nghĩa nó đại diện cho toàn bộ hệ thống. Vì SCS là tự lưu trữ, nó cung cấp mọi thứ ta cần để cài đặt *một phần* logic, như log dữ liệu...

Chẳng hạn, một SCS cho một payment microservice có thể lưu thông tin liên quan đến thanh toán, nó cùng cài đặt giao diện để hiển thị lịch sử thanh toán, và dữ liệu về khách hàng có thể sao chép từ các SCS khác.

![](https://images.viblo.asia/f2d3a34e-69f5-4996-a220-71310d8199df.png)

Chúng ta có thể xem SCS như một một kiến trúc microservice vì nó có thể deploy độc lập và chia một hệ thống thành các ứng dụng web độc lập. Thực tế, một SCS thậm chí có thể chia thành nhiều microservice nhỏ hơn. Chúng khác microservice ở 3 điều: chúng lớn hơn microservice, tập trung vào ghép nối lỏng, và phải có giao diện.

#### Microservices bất đồng bộ
Microservices bất đồng bộ tạo request đến microservice khác trong khi nó xử lý request và đợi kết quả. Những giao thức liên lạc bất đồng bộ gửi message mà bên nhận tương tác nhưng không có phản hồi trức tiếp. Một microservice có thể thiết kế theo kiểu bất đồng bộ nếu nó không tạo request đến microservice khác khi xử lý, hoặc nó tạo request nhưng không nhận kết quả.

![](https://images.viblo.asia/6bc281a0-0291-41da-a279-5e7bfa5c2fa3.png)

Microservice bất đồng bộ cung cấp một số lợi thế đáng lưu ý cho những microservice đồng bộ và giải quyết nhiều thách thức của hệ thống phân tán. Logic cần thiết để xử lý microserivce request không phụ thuộc và kết quả, giúp chúng trở nên độc lập hơn.

Tương tự, nếu một trong những kênh trên bị lỗi, toàn hệ thống cũng không bị ảnh hưởng nhiều, giúp tăng khả năng phục hồi cho hệ thống. Trên hết, việc xử lý và delivery luôn được đảm bảo.

Một số ví dụ thường gặp về công nghệ sử dụng cho microservice bất đồng bộ là Kafka, REST và dữ liệu Atom.

#### Nền tảng Microservices
Những platform microservice, như PaaS và Docker, hỗ trợ việc vận hành và kết nối các microservice. Những công nghệ này cho phép liên lạc giữa các microservice để deploy, phân tích log, giám sát...

Chẳng hạn, những platform này hỗ trợ HTTP và REST với load balancing.

![](https://images.viblo.asia/c8d77ba5-7d30-4e24-a474-f0eef92947ab.png)

Những platform nhằm cung cấp giải pháp cho những vấn đề thường gặp. Một vài platform đáng lưu ý là Kubernetes và Docker, rất quan trọng cho việc vận hành microservice. PaaS và Cloud Froundry cũng hữu ích nhưng không phổ biến.

Tham khảo: https://www.educative.io/blog/microservices-architecture-tutorial-all-you-need-to-get-started