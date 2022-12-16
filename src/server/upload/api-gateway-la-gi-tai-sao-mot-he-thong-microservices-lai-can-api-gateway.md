Một hệ thống microservices trung bình sẽ có một vài cho tới hàng trăm services khác nhau, nếu như client giao tiếp trực tiếp với các services này thì sơ đồ giao tiếp giữa client và hệ thống của chúng ta sẽ trông như một nồi cám lợn như này:
![](https://images.viblo.asia/eeaf19e0-142b-44db-bbfb-5f078c02a30d.png)

Chính vì cái nồi cám lợn trên cho nên mới xuất hiện một giải pháp đó chính là API Gateway (tạm dịch là cổng kết nối API) đóng vai trò là một cổng trung gian giữa client và hệ thống microservices đằng sau.

# API Gateway là gì?
Như mình nói ở trên, API Gateway có thể coi là một cổng trung gian, nó là cổng vào duy nhất tới hệ thống microservices của chúng ta, api gateway sẽ nhận các requests từ phía client, chỉnh sửa, xác thực và điều hướng chúng đến các API cụ thể trên các services phía sau. Khi này sơ đồ hệ thống của chúng ta sẽ trông như này.
![](https://images.viblo.asia/7c5add32-77c0-43c4-bb76-f87ec53badaa.png)
Ngoài nhiệm vụ chính là proxy request thì một hệ thống API Gateway thường sẽ đảm nhận luôn vài vai trò khác như bảo mật API, monitoring, analytics số lượng requests cũng như tình trạng hệ thống phía sau.
# Lợi ích của việc sử dụng API Gateway
### Che dấu được cấu trúc của hệ thống microservices với bên ngoài

Clients sẽ tương tác với hệ thống của chúng ta thông qua api gateway chứ không gọi trực tiếp tới một services cụ thể, các endpoints của các services sẽ chỉ được gọi nội bộ, tức là gọi giữa các services với nhau hoặc được gọi từ API gateway, người dùng sẽ gọi các api này thông qua các public endpoints từ API Gateway. Chính vì vậy cho nên phía client không cần và cũng không thể biết được các services phía backend được phân chia như thế nào, việc refactor code frontend cũng dễ dàng hơn đối với lập trình viên.

### Phần code phía frontend sẽ gọn gàng hơn
Vì không phải tracking nhiều endpoints, tất cả chỉ việc gọi đến api gateway nên phần code frontend sẽ gọn gàng hơn so với việc phải tracking hàng tá endpoints trên từng services một, nhất là khi mà hệ thống ngày một phình to ra. 

### Dễ dàng theo dõi và quản lý traffic.
Hầu hết các hệ thống API gateway phổ biến hiện nay đều sẽ đi kèm tính năng theo dõi và quản lý lượng traffic bằng GUI hoặc thông qua các APIs của hệ thống Gateway, VD như với Kong (bản EE) 
![](https://images.viblo.asia/8b01140d-7496-499e-a868-76a8cab9d6d7.png)
### Requests caching và cân bằng tải.
API Gateway sẽ kiêm luôn vai trò load balancer của hệ thống, requests sẽ không được gửi trực tiếp đến backend nên sẽ giảm thiểu được rủi ro hệ thống bị quá tải.
### Thêm một lớp bảo mật nữa cho hệ thống.
API gateway giúp ngăn chặn các cuộc tấn công bằng cách thêm một lớp bảo vệ các loại tấn công như ddos, slq injections,...

### Thay thế authentication services
API gateway thường cung cấp nhiều cơ chế xác thực, chúng ta có thể sử dụng nó để xác thực người dùng luôn, giúp tiết kiệm thời gian và làm hệ thống chúng ta đơn giản hơn. VD một vài cơ chế xác thực hỗ trợ bởi Kong API gateway

![](https://images.viblo.asia/d865c4cb-3662-450d-8b4d-63041e991962.png)

Và rất nhiều ưu điểm khác với tùy loại API Gateway

# Nhược điểm khi sử dụng API gateway 
### Tăng thời gian response
Vì phải đi qua server trung gian cho nên việc response sẽ bị trễ hơn so với việc gọi trực tiếp tới hệ thống. 
### Thêm tác nhân gây lỗi
Để sử dụng API Gateway thì chúng ta sẽ phải config, rồi chỉnh sửa code, quản lý server gateway, bla bla...Khiến cho chúng ta có thêm việc phải lo, chẳng may gateway có lỗi thì requests sẽ không thể tới được phía server. 
### Có thể gây nghẽn cổ chai
Nếu như không được scale hay config hợp lý thì gateway sẽ có thể bị quá tải và làm chậm hệ thống của chúng ta. 
### Tốn thêm tiền
Tiền server, tiền điện, tiền quản lý hệ thống api gateway, với hệ thống lớn cần các tính năng xịn sò thì còn tốn thêm tiền mua bản Enterpise của các api gateway nữa này, tính ra cũng không rẻ chút nào cả.

# Lời kết
Hi vọng qua bài viết trên, các bạn có thể hiểu được API Gateway là gì, cũng như ưu và nhược điểm của nó.

Ở bài viết tiếp theo mình sẽ hướng dẫn cách triển khai API Gateway với Kong một cách cụ thể.