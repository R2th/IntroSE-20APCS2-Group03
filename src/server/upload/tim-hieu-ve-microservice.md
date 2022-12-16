Khi nhắc đến mẫu thiết kế kiến trúc hệ thống ta có thể nghe nói đến các cái tên như Monolithic App, SOA, microservice... Bài viết sẽ tìm hiểu về kiến trúc microservice. <br>
# 1. Kiến trúc monolithic (một khối)
Đây là kiến trúc mà chúng ta thường dùng để xây dựng phần mềm. Toàn bộ các module (view, business, database, report) đều được gom chung vào một project lớn. Khi deploy, sẽ đẩy khối code này lên server và config để nó chạy <br>
![](https://images.viblo.asia/cc923a11-24df-4a1c-ab84-7ceeaea631a6.png)

## Ưu điểm
- Kiến trúc này hoạt động khá tốt vì nó đơn giản, dễ code. <br>
- Quá trình development đơn giản và trực tiếp, centralized managenment và những bước phát triển cơ bản thì sẽ không được lặp lại <br>
- Effort dành cho việc development được giảm thiểu: tất cả mọi quá trình development đều nằm trên 1 project. Development flow đơn giản chỉ là submit changes, review, merge code và continue. <br>
## Nhược điểm
- Ứng dụng monolithic phức tạp và to gây khó khăn cho việc bảo trì, nâng cấp và thêm tính năng mới <br>
- Khó áp dụng phát triển kiểu agile <br>
- Quá trình development sẽ mất đi tính linh hoạt: thời gian để build feature sẽ bị dài lên, bị block lẫn nhau. Bất kì một sự thay đổi dù nhỏ nào cũng cần build lại toàn bộ dự án => tốn nhiều thời gian <br>
- Tính ổn định không cao. Bất kì một lỗi nào có thể khiến toàn bộ application bị crash. <br>
### Các thử thách đối với Monolith Application
- Scalability <br>
- Ứng dụng các công nghệ mới <br>
- Ứng dụng automation test <br>
- Áp dụng quy trình làm việc - Agile?
# 1. Kiến trúc microservice
Thực tế có nhiều định nghĩa khác nhau đối với Microservices nhưng hiểu theo cách đơn giản thì, microservice là một kiếu kiến trúc phần mềm. Các module trong phần mềm này được chia thành các service rất nhỏ (microservice). Mỗi service này đều có một logic riêng, một trách nhiệm riêng và có thể được deploy riêng biệt. Khái niệm mircoservice đồng thời đề cập đến xu hướng tách biệt architecture ra thành các loose coupling service, tức là các service này sẽ có một mối liên hệ "lỏng lẻo" với nhau và mối service sẽ được nằm trong 1 context nhất định. <br>
![](https://images.viblo.asia/5f8cd1c2-e390-43ec-9fdb-260305533e56.png)
## Đặc điểm
- Tập hợp một nhóm nhỏ các service: mức độ chi tiết của một service là nhỏ và mỗi service này sẽ chịu một trách nhiệm cụ thể (single responsiblity) và chỉ tập trung vào nhiệm vụ đó. Ví dụ: storage service sẽ chịu riêng trách nhiệm về lưu trữ <br>
- Việc phát triển và mở rộng một service là hoàn toàn độc lập. Điều này mang lại tính linh hoạt cho hệ thống . Quá trình deliver feature, release version sẽ dễ dàng và nhanh chóng. Hơn nữa sẽ không còn tình trạng bị block như ở mô hình monolithic <br>
- Giảm tải được các mối quan ngại về công nghệ sử dụng. Chọn một công nghệ phù hợp với vấn đề của doanh nghiệp có thể được giải quyết dễ dàng. Các service giap tiếp với nhau thông qua API, do vậy mỗi service có thể dùng một ngôn ngữ riêng biệt. Serivce A dùng Java, Service B dùng Javascript ... <br>
- Đối với team, microservice đem lại tính độc lập và tự quản lí cho team. Một team sẽ có trách nhiệm toàn bộ với life-cycle của một hay nhiều service. Họ làm việc trong việc context biệt lâp, có thể tự quản lí các quyết định của mình. <br>
## Các thuộc tính của mô hình microservice
- **Autonomous** (tính tự trị): 1 service sẽ là 1 đơn vị chức năng, cung cấp API để thực hiện việc trao đổi, giao tiếp với các service khác <br>
- **Isolated** (tính biệt lập): 1 serivce sẽ là 1 đơn vị triển khai. Nó có thể được chỉnh sửa, test và deployed như 1 đơn vị mà không ảnh hưởng đến những khía cạnh khác. <br>
- **Elastic**: 1 service là phi trạng thái (stateless) vì vậy nó có thể scale tùy ý khi cần thiết. <br>
- **Resilient**: 1 microservice sẽ được thiết kế để chấp nhận các lỗi, các rủi ro có thể xảy ra, các lỗi này là các lỗi có thể chấp nhận được <br>
- **Responsive**: respond cho các request trong khoảng thời gian hợp lý. <br>
- **Intelligent**: Tính thông minh ở đây tức là muốn nhắc đến việc hệ thống có thể tìm thấy các endpoint của các microservice đã được đăng kí. <br>
- **Message Oriented**: Mô hình micro-service hoạt động dựa trên giao thức HTTP hoặc message bus để tạo nên sự giao tiếp giữa các service. Điều này đảm bảo tính loose coupling, tính biệt lập và có thể cung cấp lỗi dưới dạng message <br>
- **Programmable**: Cung cấp API's cho phép truy cập bởi developer và administrator. <br>
- **Composable**: Bao gồm nhiều microservices. <br>
- **Automated**: Lifecycle của Microservice được quản lý thông qua automation bao gồm development, build, test, staging, production và distribution.) <br>
## Ưu điểm
- Dễ nâng cấp và scale, đây là điều quan trọng nhất. Giả sử với một trang web bán hàng cần xuất nhiều hóa đơn, chỉ việc nâng cấp server cho service order và report. Việc nâng cấp server với mô hình microservice rất dễ dàng thực hiện. Điều này rất khó thực hiện với monolithic <br>
- Do tách biệt nên nếu một service bị lỗi, toàn bộ hệ thống vẫn hoạt động bình thường. Với monolith, một module bị lỗi có thể sẽ kéo theo toàn bộ hệ thống bị sập <br>
- Với monolithic, các module sử dụng chung 1 ngôn ngữ/framework. Với microservice, các service nằm tách biệt nhau, bạn có thể thoải mái sử dụng ngôn ngữ lập trình riêng, database riêng. VD service xử lý ảnh có thể viết bằng C++, service tổng hợp data có thể viết bằng Python <br>
- Khả năng testing dễ dàng hơn - các services nhỏ hơn và nhanh hơn để test <br>
- Cải thiện khả năng bảo trì - mỗi service tương đối nhỏ do đó dễ hiểu và thay đổi hơn <br>
- Dễ dàng hơn trong việc tích hợp 3rd-party <br>
- Mỗi service có dung lượng lưu trữ riêng và có thể có cơ sở dữ liệu riêng. <br>
## Nhược điểm
- Các module giao tiếp qua mạng nên có thể tốc độ không cao bằng monolith. Ngoài ra, mỗi module phải tự giải quyết các vấn đề về bảo mật, transaction, lỗi kết nối, quản lý log files. <br>
- Mỗi service sử dụng một database riêng, việc đảm bảo tính đồng nhất trong dữ liệu sẽ trở nên phức tạp. <br>
- Sử dụng nhiều service nên việc theo dõi, quản lý các service này sẽ phức tạp hơn. Do vậy, một số tool/công nghệ ra đời để phục vụ cho việc này (Docker, Ansible, Salt, Octopus, …). <br>
- Cần một đội ngũ có khả năng và trình độ: Software Architect để phân tách module, Techinical Leader để setup workflow, IT/DevOps để setup CI/CD , deploy lên cloud…. <br>
## Một số lưu ý khác
- Kiến trúc Microservice đã được nhiều công ty lớn áp dụng như Amazon, Netflix, chứng tỏ rằng nó hiệu quả, giải quyết được vấn đề. Tuy nhiên, điều đó không có nghĩa chúng ta nên làm theo các công ty lớn. Để đơn giản, trước hết hãy tập trung phát triển ứng dụng dạng monolith, với nhiều module riêng biệt trước. Khi vai trò của các module đã rõ ràng, ta có thể dần tách cách module này ra thành các service riêng <br>
- Single Responsibility Principle (SRP): một service với phạm vi và chức năng giới hạn, tập trung vào một nhiệm vụ giúp quá trình phát triển và triển khai dịch vụ trở nên nhanh chóng hơn. Mục tiêu của thiết kế là phạm vi của microservices phục vụ một nghiệp vụ chứ không chỉ đơn giản làm các dịch vụ nhỏ hơn. Kích thước hợp lý của một service là kích thước đủ để đáp ứng yêu cầu của một chức năng trong hệ thống <br>
- Thông thường, để đảm bảo tính độc lập mỗi service sẽ có một cơ sở dữ liệu riêng. Duy trì tính nhất quán dữ liệu giữa các services là một thách thức. Một pattern có thể áp dụng, mọi người có thể tìm hiểm [Saga pattern](https://microservices.io/patterns/data/saga.html) <br>
Trên đây là những gì tìm hiểu về microservice, hi vọng bài viết có thể giúp ích cho mọi người. Hẹn gặp lại! <br>
# Reference
https://www.cnblogs.com/wintersun/p/6219259.html
https://www.redhat.com/en/topics/microservices/what-are-microservices
https://toidicodedao.com/2017/02/21/tong-quan-micro-service/