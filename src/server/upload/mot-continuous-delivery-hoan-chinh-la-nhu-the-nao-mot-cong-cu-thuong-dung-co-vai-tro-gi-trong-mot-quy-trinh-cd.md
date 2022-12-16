# Một Continuous Delivery hoàn chỉnh là như thế nào ? Một công cụ thường dùng có vai trò gì  trong một quy trình CD ?

Bây giờ chúng ta hãy cùng đi tìm hiểu một quy trình CD sẽ thực hiện như nào nhé.
Đầu tiên một công cụ không hoàn toàn quan trọng với vai trò của nó trong quy trình bởi vì bất kỳ công cụ nào cũng có thể thay thế được bằng công cụ khác có cùng vai trò ví dụ như Jenkins có thể thay thế bằng Atlassian, Bamboo, hay như Chef có thể thay thế được Ansible do đó bạn không nên đặt nặng vấn đề bài viết này sử dụng công cụ nào để hoàn thiện một quy trình CD.

## Docker ecosystem
Đầu tiên không thể bỏ qua Docker, Docker xuất hiện dẫn đầu với xu hướng container hóa, đã thống trị ngành công nghệ phần mềm trong những năm gần đây. Nó cho phép ta đóng gói một ứng dụng trong một images gồm cả cấu hình môi trường để thực thi và do đó coi các máy chủ như một kho tài nguyên, thay vì các máy phải được cấu hình cho từng ứng dụng.
Docker bạn sẽ cần một số công nghệ hỗ trợ sau: 
* **Docker Hub:** sử dụng lưu trữ lại các Docker images
* **Kubernetes:** là một công cụ giúp quản lý điều phối cho các container (Trước đây hoặc chắc hẳn bạn cũng biết Docker Compose và Docker Swarm là một công cụ hỗ trợ tương tự nhưng những năm gần đây Kubernetes được thống kê dẫn đầu về lựa chọn thay thế)
Mục đích chính của Docker được gói gọn trong hình ảnh sau: 

![](https://images.viblo.asia/029c21da-3a14-48c1-85bc-14a6fbc684a8.png)

Một ứng dụng dockerized (web server) được chạy dưới dạng container trên Máy chủ lưu trữ Docker và có thể truy cập trực tiếp đến nó (chi tiết có thể xem thêm về port publishing trong docker).

## Jenkins

Jenkins cho đến nay là máy chủ tự động hóa phổ biến nhất trên thị trường. Nó giúp tạo CI và pipelines CD và bất kỳ chuỗi script tự động nào khác. Có khả năng plugin cao, nó có một cộng đồng tuyệt vời liên tục mở rộng nó với các tính năng mới.
![](https://images.viblo.asia/50ea0a25-f76f-478c-b97d-5bc1c066b98e.png)
Mô hình đặc trưng nhất của Jenkins được biết đến như hình ảnh mô hình hỗ trợ đa agent (slave) nodes với khả năng xử lý tải đồng thời. Jenkins master chấp nhận một yêu cầu build, nhưng quá trình thực thi được tại một trong các máy Jenkins Slave (agent) giúp hỗ trợ khả năng mở rộng chiều ngang cho mô trường jenkins.

## CI pipeline
![](https://images.viblo.asia/17ce8d23-bfc2-4a72-a767-6a1829c1629a.png)
Bạn có thể hình dùng qua hình ảnh mô tả ở trên.
Giả sử rằng ứng dụng của chúng ta có là một dịch vụ web đơn giản được viết bằng Java bằng Spring Boot. Gradle được sử dụng làm công cụ để build và GitHub làm kho lưu trữ mã nguồn. Mọi commit với GitHub sẽ tự động kích hoạt bản dựng Jenkins, sử dụng Gradle để biên dịch mã Java tiếp đến chạy các unit test và thực hiện một số kiểm tra bổ sung (code coverage, static code analysis, v.v.). Khi build Jenkins hoàn tất, một thông báo sẽ được gửi đến các nhà phát triển.

## Automated acceptance testing
Bây giờ chúng ta cùng kết hợp jenkins với docker nào.
![](https://images.viblo.asia/7174772a-79e1-4641-b98c-95d05879f742.png)
Một số yếu tố được bổ sung vào sơ đồ phục vụ cho automated acceptance testing gồm: 
* **Docker Registry**: Sau giai đoạn CI, đầu tiên ứng dụng được đóng gói thành JAR và sau đó dưới dạng hình ảnh Docker. Image đó sẽ được đẩy đến Docker Registry hoạt động như một bộ lưu trữ cho các ứng dụng.
* **Docker Host**: Trước khi thực hiện acceptance test, một ứng dụng ảo phải được khởi chạy. Jenkins kích hoạt một máy Docker Host để kéo image từ Docker Registry và chạy nó.
* **Cucumber**: Sau khi ứng dụng được khởi động trên Docker Host, Jenkins chạy một bộ các acceptance tests được viết bằng Cucumber.

## Clustering bằng Kubernetes
Chúng ta sẽ thay thế từ một máy chủ Docker duy nhất bằng thành một cụm Kubernetes và một ứng dụng độc lập được cài đặt trong 2 container khác nhau thông qua sơ đồ sau:
![](https://images.viblo.asia/c62f19ad-e6ae-40c9-9617-841db7c34e25.png)
Kubernetes cung cấp một abstraction layer cho một tập hợp các máy chủ Docker và chúng có thể giao tiếp cơ bản với nhau. Chúng ta sẽ không phải suy nghĩ chính xác mà các ứng dụng được triển khai như nào mà tất cả những gì chúng ta quan tâm là số lượng phiên bản của chúng.

## Thực hiện quản lý bằng ansible

Tiếp đới chúng ta có thể môi trường bằng Ansible và được trực quan qua mô hình sau: 
![](https://images.viblo.asia/d29cbc79-90b3-4a42-8ab6-e2bb8b81042e.png)

Ansible sẽ đảm hiện cho việc cấu hình môi trường và cho phép triển khai các ứng dụng giống nhau trên nhiều máy. Cuối cùng chúng ta sẽ có có một phiên 2 bản y hịt để dev và product.

## Tổng kết

Tổng kết một chút nhỉ chúng ta đã đi tìm hiều đôi chút về một quy trình CD thực hiện như nào và chức năng, nhiệm vụ của một số công cụ phổ biến hiện nay áp dụng vào mô hình CD.

Việc tiếp cận CD mang lại một số lợi ích trong đó những lợi ích quan trọng nhất là phân phối nhanh, chu kỳ phản hồi nhanh và phát hành ít rủi ro. 

Pipeline CD bao gồm ba giai đoạn: CI, automated acceptance testing, và cấu hình quản lý. 

Bài viết này không hoàn toàn đầy đủ chi tiết về cách cài đặt từng phần nhưng có thể nó sẽ giúp bạn hiểu phần nào hơn về một quy trình CD và vai trò của từng thành phần trong quy trình đó. 

Cuối cùng mình xin cảm ơn bạn đã đọc hết bài viết.