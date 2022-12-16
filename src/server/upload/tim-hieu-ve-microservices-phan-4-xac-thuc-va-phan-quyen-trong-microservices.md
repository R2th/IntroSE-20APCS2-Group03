Kiến trúc Microservice mang lại nhiều lợi ích cho việc phát triển phần mềm. Đồng thời, nhiều vấn đề phức tạp của hệ thống phân tán cũng xảy ra. Một trong những thách thức là làm thế nào để xác thực và phân quyền một cách linh hoạt, an toàn và hiệu quả trong kiến trúc Microservice. Bài viết này mình sẽ cố gắng đưa ra giải pháp để giải quyết về vấn đề này.

## 1. Xác thực và phân quyền trong Monolithic

- **Authentication**: Đề cập đến việc **xác minh bạn là ai** , vì vậy bạn cần sử dụng username và password để xác thực.
- **Authorization**: Đề cập đến **những gì bạn có thể làm** , ví dụ như quyền truy cập, chỉnh sửa hoặc xóa đối với một số tài liệu và điều này xảy ra sau khi xác minh bạn là ai.

![Authentication trong Monolithic](https://images.viblo.asia/0797c319-f28d-4168-8424-5c323719b862.png)

Trong kiến trúc Monolithic, toàn bộ ứng dụng là một quá trình. Một module bảo mật sẽ được sử dụng để thực hiện xác thực và phân quyền của người dùng.
Khi Client đăng nhập, module này sẽ xác thực danh tính người dùng và tạo ra một ***sessionID*** trả lại cho Client. 

![Authorization trong Monolithic](https://images.viblo.asia/983c47ba-7bce-41d3-accc-4dce8e55d8f8.png)

Mỗi khi client tạo request đến server nó sẽ gửi kèm ***sessionID*** này, server sẽ kiểm tra xem user tương ứng với ***sessionID*** đó có quyền thực hiện request hay không.

## 2. Các vấn đề về xác thực và phân quyền của Microservice

Trong kiến trúc Microservices, hệ thống được chia nhỏ thành nhiều hệ thống con, đảm nhận các nghiệp vụ và chức năng khác nhau. Mỗi hệ thống con đó cũng cần được xác thực và phân quyền, nếu xử lý theo cách của kiến trúc Monolithic ở trên chúng ta sẽ gặp các vấn đề sau:

- Mỗi service có nhu cầu cần phải tự thực hiện việc xác thực và phân quyền ở service của mình. Mặc dù chúng ta có thể sử dụng các thư viện giống nhau ở mỗi service để làm việc đó tuy nhiên chi phí để bảo trì thư viện chung đó với nhiều nền tảng ngôn ngữ khác nhau là quá lớn. Không chỉ thế các services còn bị phụ thuộc vào một thư viện cụ thể cùng phiên bản của nó, ảnh hưởng đến tính linh hoạt của lựa chọn ngôn ngữ/framework microservice.
- Mỗi service nên tập trung vào xây dựng các nghiệp vụ của mình, việc xây dựng thêm logic về phân quyền làm giảm tốc độ phát triển và tăng độ phức tạp của các service.
- Các service thông thường sẽ cung cấp các interface dưới dạng RESTful API, sử dụng protocol HTTP. Các HTTP request sẽ được đi qua nhiều thành phần của hệ thống. Cách truyền thống sử dụng session ở server (stateful) sẽ gây khó khăn cho việc mở rộng hệ thống theo chiều ngang.
- Service sẽ được truy cập từ nhiều ứng dụng và đối tượng sử dụng khác nhau, có thể là người dùng, 1 thiết bị phần cứng, 3rd-party, crontab hay 1 service khác. Việc xác định định danh (identity) và phân quyền (authorization) ở nhiều ngữ cảnh (context) khác nhau như vậy là vô cùng phức tạp.

## 3. Giải pháp cho xác thực và phân quyền của Microservices

### Distributed Session Management

##### Sticky session
Đảm bảo tất cả request từ một user sẽ luôn được gửi đến cùng một server đã xử lý request đầu tiên của user đó, như thế thì có thể đảm bảo được session sẽ luôn chính xác. Tuy nhiên cách này thì yêu cầu load balancer, và nó chỉ đáp ứng được kịch bản horizontally scaling cluster, nhưng khi load balancer đột nhiên vì lý do nào đó mà gửi user đến server khác thì tất cả session của user đó sẽ bị mất.

##### Session replication
Nghĩa là mỗi server lưu hết session, và đồng bộ thông qua mạng. Việc đồng bộ session có thể dẫn đến tắc nghẽn băng thông mạng vì cứ mỗi lần session thay đổi thì dữ liệu lại phải được đồng bộ đến tất cả các server. Càng nhiều server thì băng thông mà việc đồng bộ cần lại càng lớn.

##### Centralized session storage
Nghĩa là khi user truy xuất một microservice, dữ liệu người dùng có thể được lấy từ một nơi lưu trữ session chung, để đảm bảo tất cả các microservice đọc được dữ liệu giống nhau. Ở một số trường hợp thì cách này rất là hay. Nhưng bất lợi của nó là việc quản lý session tập trung sẽ yêu cầu một cơ chế bảo mật riêng biệt.
![](https://images.viblo.asia/21f277d7-2bb7-4cf2-9bca-6c65cfa6e03b.png)

### Client Token

Việc sử dụng session là một ý tưởng tồi cho kiến trúc Microservices, bởi nó gây khó khăn cho việc mở rộng theo chiều ngang của server. Bạn nên sử dụng Token để ghi lại trạng thái đăng nhập của người dùng trong kiến trúc Microservices.

Sự khác biệt chính giữa Token và Session là nơi lưu trữ khác nhau. Session được lưu trữ tập trung phía server, Token được giữ bởi chính người dùng và thường được lưu trữ trong trình duyệt dưới dạng cookie. Token giữ thông tin nhận dạng của user và mỗi lần yêu cầu được gửi đến server, server có thể xác định danh tính của user và xác định xem nó có quyền truy cập vào tài nguyên được yêu cầu hay không.

Token được sử dụng để chỉ ra danh tính của user. Do đó, nội dung của Token cần được mã hóa để tránh làm sai lệch bởi user hoặc bên thứ ba. [JWT (Json Web Token)](https://jwt.io/) là một tiêu chuẩn mở (RFC 7519) xác định định dạng Token, nội dung Token, mã hóa nó và cung cấp lib cho các ngôn ngữ khác nhau.

Bằng cách sử dụng Token để xác thực người dùng, Server không lưu trạng thái người dùng. Client cần gửi token đến server để xác thực mỗi khi gửi request.
Luồng cơ bản của xác thực người dùng với Token như sơ đồ sau:

![](https://images.viblo.asia/9c5c56cc-9399-478b-b2b9-52cf79edaa6a.png)

Việc sử dụng Token mang lại nhiều lợi ích:
- Stateless, thông tin không được lưu trữ trên server.
- Dễ dàng phát triển, mở rộng.
- Performance tốt hơn do server đọc thông tin ngay trong request (nếu session thì cần đọc ở storage hoặc database).

### Client Token with API Gateway

Quá trình xác thực của người dùng sẽ diễn ra ở Gateway, có nghĩa là Gateway kiểm tra các policy xem có hợp lệ hay không thông qua Authorization Server. Các microservices không thực hiện lớp xác thực và phân quyền nào, có thể tự do truy cập bên trong vùng nội bộ (internal network).

![](https://images.viblo.asia/4aab991b-6f6a-4414-a7ae-2793bfc6b6e9.png)

Mô hình này có điểm tương đồng với kiến trúc Monolithic khi đặt xác thực phân quyền tại 1 số service nhất định, việc xây dựng và bảo trì sẽ tốn chi phí nhỏ hơn, tuy nhiên sẽ để lộ 1 khoảng trống bảo mật rất lớn ở lớp trong do các service có thể tự do truy cập lẫn nhau. Chúng ta có thể đặt 1 số rule ở góc độ network đối với các service bên trong này tuy nhiên các rule này sẽ tương đối đơn giản và không thể đáp ứng được các nghiệp vụ truy cập dữ liệu lẫn nhau giữa các team/service (mở rộng ra là các công ty nội bộ) độc lập nhau.

### Tổng kết
Việc liên tục mở rộng nghiệp vụ và hệ thống đòi hỏi các service phải tự xác thực, qua đó không phân biệt service đó là bên trong (internal) hay bên ngoài (external), giúp các team dễ dàng mở rộng tích hợp với nhau. Việc này đòi hỏi mô hình xác thực chung phải hoạt động ổn định, tối ưu và đáp ứng được hiệu năng cao.