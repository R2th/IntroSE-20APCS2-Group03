![](https://images.viblo.asia/1cf078a4-ded3-4126-8890-1bbd4bd37e11.png)
Dạo gần đây, cái dự án đang làm càng ngày càng phình ra, tính năng chồng chéo, muốn update cái này lại dính đến cái kia, nhiều lúc chả biết phải làm thế nào. Hỏi ý kiến các huynh đệ thì được xui tìm hiểu Microservice, nào là dễ quản lý, dễ deploy, phát triển nhanh, vân vân và mây mây. Ô-khê được tư vấn đến thế thì cũng phải tìm hiểu tí xem nó thế nào.

## I. Microservice và cái công trình phụ :toilet: 

Ơ hay, Microservice thì liên quan gì đến công trình phụ :angry: Bình tĩnh bạn hiền, từ từ để tôi phân tích đã nào. 
### Từ cái công trình phụ và kiến trúc Monolithic
![Chỉ là một cái công trình phụ bình thường thôi](https://images.viblo.asia/2c8b9973-7833-41c5-9cf7-9ee347715ca8.jpg)

Đầu tiên, khi bạn nhìn vào hình trên bạn thấy gì ? Đúng vậy, chỉ là một cái nhà vệ sinh bình thường thôi đúng không. Nhưng hãy để ý tới đặc điểm của nó, cái phòng này có những chức năng gì? Bồn tắm, bồn rửa mặt, bồn về sinh, treo đồ... nói tóm lại là all-in-one. Thấy quen không, chúng ta thiết kế phần mềm cũng vậy đấy, gom tất tần tật các tính năng của tất cả các loại user vào cùng 1 project lớn - cách thiết kế này gọi là **kiến trúc nguyên khối (Monolithic Architecture)**. 

![](https://images.viblo.asia/ceafbc36-332d-4af6-abbd-699f584ae179.png)

Kiến trúc này hoạt động tốt và phù hợp với hầu hết các project bởi sự đơn giản và tiện lợi khi tất cả đều ở chung 1 chỗ. Tuy nhiên nó sẽ dần bộc lộ nhược điểm do các module dính liên với nhau thành 1 cục (:poop:). 
####
Ứng dụng của chúng ta phát triển liên tục, kéo theo đó yêu cầu tính năng mới tăng, dữ liệu tăng, logic phức tạp hơn, giao tiếp với hệ thống khác tăng, và hàng trăm thứ khác dẫn đến một kết quả là ứng dụng phình to ra một cách khủng khiếp. Sau mỗi sprint, hàng loạt tính năng mới được thêm vào, thêm code, thêm bảng, thêm logic… Chỉ sau một thời gian, ứng dụng đơn giản sẽ trở nên kềnh càng như một con quái vật. Và số lượng effort bỏ ra để phát triển cũng như bảo trì con quái vật này sẽ không hề nhỏ. 
####
Khi ứng dụng phình quá to, mọi nỗ lực tối ưu đều không còn hiệu quả. Chỉ một chỉnh sửa nhỏ, sẽ phải xem xét sự ảnh hưởng của nó lên toàn bộ hệ thống. Nó quá khó để cho một lập trình viên có thể nắm và hiểu toàn bộ code hệ thống. Và như một hệ quả tất yếu, việc fix bug, hay thêm tính năng mới trở nên khó hơn và tốn nhiều thời gian hơn.
####
Ngoài ra rất khó để scale ứng dụng do có nhiều module khác nhau với nhu cầu về tài nguyên khác nhau. Nhưng lại nằm chung 1 khối nên chúng ta sẽ phải tính toán tài nguyên để phù hợp với tất cả module gây ảnh hưởng không nhỏ đến chi phí bỏ ra.
####
Thêm vào đó, ứng dụng nguyên khối sử dụng một ngôn ngữ nên khi muốn update công nghệ để đáp ứng nhu cầu của 1 module thì kéo theo là phải update toàn bộ hệ thống mặc dù những phần khác chưa chắc đã cần.
####
Cuối cùng, do tất cả các module đang chạy trên cùng 1 process nên tệ nhất là một module bị lỗi có thể làm ngưng toàn hệ thống. Ví dụ như cái phòng kia, giả sử mà cái bồn cầu bị tắc thôi là khỏi vào rửa mặt hay tắm luôn đi :poop:
####
Sau những hạn chế của monolithic thì **Kiến trúc hướng dịch vụ (Service Oriented Architecture - SOA)** được sinh ra để giải quyết một phần của vấn đề bằng cách giới thiệu khái niệm "service". Một dịch vụ là một nhóm tổng hợp các tính năng tương tự trong một ứng dụng. Do đó trong SOA, ứng dụng phần mềm được thiết kế như một tổ hợp của các dịch vụ. Tuy nhiên, với SOA, giới hạn hay phạm vi của một dịch vụ khá là rộng và được định nghĩa khá "thô" (coarse-grained). Việc này khiến các services cũng có thể trở nên quá to và phức tạp. Tương tự như ứng dụng monolithic, những dịch vụ này to và phức tạp lên theo thời gian vì thường xuyên thêm các tính năng. Và thế là những dịch vụ này lại trở thành một mớ các dịch vụ monolithic, cũng không còn khác mấy so với kiến trúc một khối thông thường.

### Cho đến phần mềm và microservice

Quay trở lại câu chuyện về cái công trình phụ, chúng ta hãy cùng nhau ngắm qua một bức ảnh khác.
![](https://images.viblo.asia/87f244fa-95f4-4ada-af21-37d6bdb9d60b.jpg)

Chúng ta có thể thấy rằng đây vẫn là cái nhà vệ sinh :roll_eyes: nhưng trong căn phòng này từng chức năng phòng tắm, bồn rửa mặt, bồn cầu... được xây dựng độc lập để có thể sử dụng riêng biệt mà không hề ảnh hưởng đến nhau. 
Cách thiết kế này gọi là **Kiến trúc dịch vụ nhỏ (Microservice Architecture)**, 

![](https://images.viblo.asia/69840619-b362-46c3-952d-d1a0b19da113.png)

Thiết kế phần mềm cũng vậy, thay vì gom tất cả lại thành một khối, chúng ta chia ứng dụng thành các service nhỏ hơn, chạy riêng biệt, có khả năng phát triển và triển khai độc lập.

## II.Microservice ưu và nhược
Microservice sinh ra để giải quyết những nhược điểm của Monolithic, thế nhưng nó không phải là viên đạn bạc toàn năng, nó vẫn có những ưu và nhược điểm riêng.

### Ưu điểm
**Đầu tiên, microservices giúp giảm thiểu quá trình phức tạp hóa trong các hệ thống lớn**. Với tổng số chức năng không đổi, kiến trúc microservices chia nhỏ hệ thống cồng kềnh ra làm nhiều dịch vụ nhỏ lẻ dể dàng quản lý và triển khai từng phần so với kiến trúc monolithic.
####
Trong microservice, các dịch vụ giao tiếp với nhau thông qua Remote Procedure Call (RPC) hay Message-driven API. Ngoài ra, kiến trúc microservices thúc đẩy việc phân tách rạch ròi các module, việc khó có thể làm nếu xây dựng theo kiến trúc monolithic.
####
Và quan trọng hơn cả, với mỗi dịch vụ nhỏ, chúng ta sẽ có thời gian phát triển nhanh hơn, dễ nắm bắt cũng như bảo trì hơn.
###
**Thứ hai, kiến trúc này cho phép mỗi service được phát triển độc lập bởi một team tập trung cho service đó. Developer có thể tự do lựa chọn công nghệ cho mỗi dịch vụ mình phát triển miễn là nó phù hợp**. Sự tự do này không phải là tạo ra một mớ công nghệ hổ lốn, mà có nghĩa là các developer không còn phải bắt buộc phải sử dụng các công nghệ lỗi thời còn tồn tại từ khi bắt đầu dự án. Khi đó, khi bắt tay vào viết một service mới, họ có cơ hội sử dụng công nghệ và môi trường tối ưu nhất với chức năng của service đấy.
####
**Thứ ba, microservices cho phép mỗi service được đóng gói và triển khai độc lập với nhau**. (VD: Mỗi service có thể được đóng gói vào một docker container độc lập, giúp giảm tối đa thời gian deploy). Bên cạnh đó, microservices rất phù hợp để áp dụng continuous deployment.
####
**Thứ tư, microservices cho phép mỗi service có thể được scale một cách độc lập với nhau**. Việc scale có thể được thực hiện dễ dàng bằng cách tăng số instance cho mỗi service rồi phân tải bằng load balancer. Ngoài ra, chúng ta còn có thể triển khai mỗi service lên server có resource thích hợp để tối ưu hóa chi phí vận hành (việc mà không thể làm được trong kiến trúc monolithic).

### Nhược điểm
Nhược điểm đầu tiên của Microservices cũng chính từ tên gọi của nó. **Microservice nhấn mạnh kích thước nhỏ gọn của dịch vụ**. Một số developer đề xuất dịch vụ siêu nhỏ cỡ dưới 100 dòng code. Service nhỏ là tốt, nhưng nó không phải mục tiêu chính của Microservice. Mục tiêu của Mircoservice là phân tích đầy đủ ứng dụng để tạo điều kiện phát triển và triển khai ứng dụng nhanh chóng.
####
**Nhược điểm thứ hai của Microservices đến từ đặc điểm hệ thống phân tán (distributed system)**. Developer cần phải lựa chọn phát triển mỗi dịch vụ nhỏ giao tiếp với các dịch vụ khác bằng cách nào messaging hay là RPC. Hơn thế nữa, họ phải xử lý sự cố khi kết nối chậm, lỗi khi thông điệp không gửi được. Việc này phức tạp hơn nhiều so với ứng dụng nguyên khối nơi các module gọi nhau thông qua các method/procedure cấp ngôn ngữ.
####
Thứ ba, **phải đảm bảo giao dịch phân tán (distributed transaction)** cập nhật dữ liệu đúng đắn (all or none) vào nhiều dịch vụ nhỏ khác nhau khó hơn rất nhiều, đôi khi là không thể so với đảm bảo giao dịch cập nhật vào nhiều bảng trong một cơ sở dữ liệu trung tâm. Theo nguyên tắc CAP (CAP theorem) thì giao dịch phân tán sẽ không thể thỏa mãn cả 3 điều kiện: 
- **consistency**: dữ liệu ở điểm khác nhau trong mạng phải giống nhau
- **availablity** yêu cầu gửi đi phải có phúc đáp
- **partition tolerance** hệ thống vẫn hoạt động được ngay cả khi mạng bị lỗi

Những công nghệ cơ sở dữ liệu phi quan hệ (NoSQL) hay message broker tốt nhất hiện nay cũng chưa vượt qua nguyên tắc CAP.
####
Thứ tư, **testing một dịch vụ trong kiến trúc microservices đôi khi yêu cầu phải chạy cả các dịch vụ nhỏ khác mà nó phụ thuộc**. Do đó khi phân rã ứng dụng một khối thành microservices cần luôn kiểm tra mức độ ràng buộc giữa các dịch vụ. Nếu các dịch vụ nhỏ thiết kế phục thuộc vào nhau theo chuỗi. A gọi B, B gọi C, C gọi D. Nếu một mắt xích có giao tiếp API thay đổi, liệu các mắt xích khác có phải thay đổi theo không? Nếu có thì việc bảo trì, kiểm thử sẽ phức tạp tương tự ứng dụng một khối. Thiết kế dịch vụ tốt sẽ giảm tối đa ảnh hưởng lan truyền đến các dịch vụ khác.
####
Cuối cùng, **việc triển khai microservices phức tạp hơn rất nhiều nếu làm thủ công theo cách đã làm với ứng dụng monolithic**. Theo Adrian Crockcroft, Hailo có 160 dịch vụ, NetFlix có hơn 600 dịch vụ. Với cloud, các máy ảo, docker container có thể linh động bật tắt, dịch chuyển. Vậy cần thiết phải có một cơ chế service discovery để cập nhật tự động địa chỉ IP và cổng, mô tả, phiên bản của mỗi dịch vụ,…

## Kết
Bài viết tạm dừng tại đây, hẹn gặp lại mọi người trong bài viết tiếp theo về một số nguyên tắc thiết kế hệ thống microservice.
## Source
https://www.nginx.com/blog/introduction-to-microservices/

https://dzone.com/articles/microservices-in-practice-1