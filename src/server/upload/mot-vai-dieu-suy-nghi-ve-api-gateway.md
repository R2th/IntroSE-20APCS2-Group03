Trong bất kì một hệ thống sử dụng mô hình **microservice** nào đều có 1 cánh cổng thần kì =)) 

Đó là **API GATEWAY**

Vậy tại sao chúng ta lại nói nó là cánh cổng thần kì.

**API-GateWay**  là một Interface mà nó nằm trước các service back-end  khác.
- Nhiệm vụ chính là **router**.
- Đi cùng với nó là các lựa chọn đa dạng khác như :                 
  - Multiple Back-ends ( Microservices )
  - Service Discovery
  - Circuit breaking
  - Authentication and Authorization
  - Rate limiting
  - Logging and tracing 
  - Retry logic..........
                                
- Đã thế lại còn nhiều open source như : 
  - Kong Gateway
  - Apache APISIX
  - Tyk
  - Goku
  - WSO2
  - KrakenD
  - Zuul

![](https://images.viblo.asia/c9d68310-1ae6-488f-943b-41bd0f7a31ed.PNG)

Nghe thì có vẻ hơi bị nhiều chức năng và tiện nghi thế nhưng mà cuộc sống đâu có như mong đợi và chẳng có gì tốt đẹp toàn diện.

Có một **nhược điểm to hơn tất cả** là nếu bạn sử dụng **duy nhất** một **API GATEWAY** cho hệ thống của bạn thì điều gì sẽ xảy đến nếu **cổng API của bạn oẳng** =))).

Tất nhiên là toàn bộ service đứng sau cánh cổng thần kì này cũng sẽ không được sử dụng và code cả hệ thống để luyện tay =))

Vậy để không còn là **duy nhất** chúng ta sẽ tạo ra một  cụm(cluster) Cổng API có thể mở rộng phía sau bộ cân bằng tải phần cứng(hardware load balancer). 

![](https://images.viblo.asia/2765deb2-55ba-4b98-a703-f19f9745d085.PNG)

Chúng ta có thể xác định hai loại API Gateway như sau.
* API Enterprise
* API Microservices

**API Microservices** như chúng ta vẫn sử dụng bình thường.

**API Enterprise** chủ yếu sử dụng cho  API dành cho  bên thứ 3 .

Sử dụng bên trong hệ sinh thái của bạn, nơi API Gateway chỉ được hiển thị với các khách hàng nội bộ của bạn.

Sử dụng  CI / CD với các loại triển khai như Canary, Shadow, Blue-Green, v.v.