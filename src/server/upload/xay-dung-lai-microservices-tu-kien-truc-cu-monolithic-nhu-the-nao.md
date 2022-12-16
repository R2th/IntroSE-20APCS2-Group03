### Giới thiệu:

- Khái niệm đơn giản khi nhắc đến microservices thì chung ta có thể hiểu như sau:
- Microsevices chia nhỏ ứng dụng lớn thành các ứng dụng nhỏ kết nối với nhau. Mỗi dịch vụ đảm nhiệm một chức năng riêng biệt và các dịch vụ ấy được kết nối với nhau tạo nên một tổng thể hài hòa.
- Ví dụ: 
   Trong ngân hàng có hàng tá các dịch vụ liên kết với nhau, như liên kết thanh toán hóa đơn, gửi tiền, rút tiền, gửi tiết kiệm .... thì những dịch vụ nhỏ này chúng ta cũng có thể tạo thành 1 microservices trong ứng dụng.
- Nhưng thực tế, với các ứng dụng nhỏ (mặc dù có nhiều dịch vụ chuyên biệt) thì chúng ta lại đang sử dụng kiến trúc Monolithic (gộp chung databases, quản lý code, repo, ....) cách làm có ưu điểm dễ viết, dễ triển khai, cách viết chặt chẽ hơn. Nhưng nhược điểm thì lại chính từ sự chặt chẽ của nó, khiến kiến trúc này trở nên khó mở rộng. Ngay từ ban đầu nếu tầm nhìn không tốt, thì việc đập đi xây lại cả hệ thống là điều khó tránh khỏi, rồi có một service nào dẹo thì những service còn lại nguy cơ dẹo cũng rất cao....

Okie, phía trên thì mình giới thiệu qua về các khái niệm của Microservices và Monolithic, còn ở phần  dưới đây mình sẽ đi vào bài toán thực tế khi chúng ta xây dựng hệ thống nhé.

### Bài toán thực tế

- Khi bạn nhận được yêu cầu xây dựng một ứng dụng X với các tính năng đại khái là A, B, C, ... Okie, ứng dụng ban đầu của chúng ta thật ít chức năng, chúng ta nghĩ đến việc xây dựng nó với kiến trúc Monolithic như bình thường. Một thời gian sau, với các tính năng mở rộng, việc quản lý và tầm nhìn vẫn okie, chúng ta chia module quản lý code bình thường, đến lúc này có vẻ phình cũng khá to rồi đây.
- Một thời gian tiếp theo, khách hàng yêu cầu "Tạo tính năng giả thiết", tính năng này sẽ mang đi phục vụ business, có thể nó sẽ không được release. Hoặc thấy ko hợp lý có thể xóa bỏ hoàn toàn. Oh, giờ nếu sử dụng Monolithic thì code tính năng có vẻ nhanh, nhưng khi loại bỏ nó ra khỏi ứng dụng, không chỉ việc quản lý source code mà databases cũng khá là phức tạp.
Vì vậy, giải pháp mình chọn cho việc này là sử dụng Microservice. Tất cả các tính năng đã code từ trước đến nay đóng vai trò như một main service.

### Kiến trúc Microservice đối với bài toán trên

![](https://images.viblo.asia/19c592d9-fed0-412c-9f60-5f75d9e33361.png)


Xây dựng Serivce 1 là tính năng giả thiết có repo github riêng, database riêng ...
Giải thích qua một chút về đường đi của request:

- Client 1 gửi request đến service, đường đi của request sẽ đi qua Nginx đóng vai trò một service điều hướng để điều hướng request đến Service 1 hay là Main Service (ở đây điều hướng đến Service 1).
- request 1 này cần xác thực thì từ Service 1 sẽ call api đến Auth Service để lấy về response xác thực (ở đây mình ví dụ là muốn lấy về thông tin của current_user). 
- Sau khi bắt được response current_user hoặc response khác tùy theo yêu cầu thì Service 1 thực hiện các thao tác logic và trả về response cho người dùng.
- Tương tự đường đi đến Main Service cũng như vậy.
- Ở đây chúng ta làm rõ là việc Service 1 và Main Service hay Auth Service sẽ không liên quan gì đến nhau về mặt code, về database ... service cần thông tin gì từ Main Service hay Auth Service thì sẽ request qua đó để lấy về.
- Các service giao tiếp với nhau thông qua các API support lẫn nhau => Service 1 chẳng khác gì cách mobile giao tiếp với server cả.

=> Từ việc xây dựng kiến trúc như trên, có thể nhận thấy nếu một ngày đẹp trời có yêu cầu off tình năng Service 1 đi thì cũng chẳng ảnh hưởng gì đến Main Service vốn đang chạy bình thường cả.

### Kết luận

Trên đây mình giới thiệu về bài toán sử dụng microservices thực tế mình đã gặp phải. Nó không hoàn toàn đúng với ứng dụng của bạn. Nhưng về mặt tư tưởng thì microservices là các services nhỏ này sẽ hoàn toàn riêng biệt với nhau và giao tiếp với nhau thông qua API

### Tài liệu tham khảo

https://microservices.io/