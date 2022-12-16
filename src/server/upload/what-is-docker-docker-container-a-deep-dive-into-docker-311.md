# 1. Docker & Docker Container là gì?
*Docker là gì và tại sao cần có Docker?* - Docker là một nền tảng container hóa gói ứng dụng của bạn và tất cả các phần phụ thuộc của nó lại với nhau dưới dạng một docker container để đảm bảo rằng ứng dụng của bạn hoạt động liền mạch trong mọi môi trường.

*Container là gì?* - Docker Container là một đơn vị tiêu chuẩn hóa có thể được tạo nhanh chóng để triển khai một ứng dụng hoặc môi trường cụ thể. Nó có thể là Ubuntu container, CentOs container, v.v. để điền đầy đủ yêu cầu từ quan điểm hệ điều hành. Ngoài ra, nó có thể là một container hướng ứng dụng như CakePHP container hoặc Tomcat-Ubuntu container, v.v.

*Hãy hiểu nó với một ví dụ:*

Một công ty cần phát triển một Ứng dụng Java. Để làm như vậy, nhà phát triển sẽ thiết lập một môi trường với máy chủ tomcat được cài đặt trong đó. Một khi ứng dụng được phát triển, nó cần được kiểm tra bởi người thử nghiệm. Bây giờ người kiểm tra sẽ lại thiết lập môi trường tomcat từ đầu để kiểm tra ứng dụng. Sau khi thử nghiệm ứng dụng được thực hiện, nó sẽ được triển khai trên máy chủ sản xuất. Một lần nữa, quá trình sản xuất cần một môi trường có cài đặt tomcat trên đó, để nó có thể lưu trữ ứng dụng Java. Nếu bạn thấy cùng một môi trường tomcat thiết lập được thực hiện ba lần. Có một số vấn đề mà tôi đã liệt kê bên dưới với cách tiếp cận này:

1) Mất thời gian và công sức.

2) Có thể có phiên bản không khớp trong các thiết lập khác nhau, tức là nhà phát triển & người kiểm tra có thể đã cài đặt tomcat 7, tuy nhiên quản trị viên hệ thống đã cài đặt tomcat 9 trên máy chủ sản xuất.

Bây giờ, tôi sẽ chỉ cho bạn cách sử dụng Docker container để ngăn chặn sự mất mát này. 

Trong trường hợp này, nhà phát triển sẽ tạo một docker image tomcat (image không là gì ngoài bản thiết kế để triển khai nhiều container có cùng cấu hình) bằng cách sử dụng image cơ sở như Ubuntu, đã có trong Docker Hub (Hub có một số image cơ sở có sẵn miễn phí). Bây giờ image này có thể được sử dụng bởi nhà phát triển, người kiểm tra và quản trị viên hệ thống để triển khai môi trường tomcat. Đây là cách container này giải quyết vấn đề.

Tuy nhiên, bây giờ bạn sẽ nghĩ rằng điều này cũng có thể được thực hiện bằng Virtual Machines. Tuy nhiên, có một số vấn đề nếu bạn chọn sử dụng Virtual Machines. Chúng ta hãy xem so sánh giữa hai loại để hiểu rõ hơn điều này.

![](https://images.viblo.asia/6bd58e55-5c4d-456c-9d75-8c89dbda975b.png)

Qua sơ đồ trên. Máy ảo (Virtual Machines) và Docker Container được so sánh trên ba thông số sau:

* Kích thước - Tham số này sẽ so sánh Máy ảo & Docker Container trên tài nguyên mà chúng sử dụng.
* Khởi động - Tham số này sẽ so sánh trên cơ sở thời gian khởi động của chúng.
* Tích hợp - Tham số này sẽ so sánh khả năng tích hợp với các công cụ khác một cách dễ dàng.

**Kích thước**

Hình ảnh sau đây giải thích cách Máy ảo và Docker Container sử dụng tài nguyên được phân bổ cho chúng.
![](https://images.viblo.asia/2a53b764-77be-4e3a-895b-86ef43aa4efe.png)

Hãy xem xét một tình huống được mô tả trong hình ảnh trên. Tôi có một hệ thống máy chủ với **16 Gigabyte RAM** và tôi phải chạy **3 Máy ảo** trên đó. Để chạy các Máy ảo song song, tôi cần chia RAM của mình cho các Máy ảo. Giả sử tôi phân bổ nó theo cách sau:

* **6 GB RAM** cho máy ảo đầu tiên của tôi,
* **4 GB RAM** cho máy ảo thứ hai của tôi và
* **6 GB** cho máy ảo thứ ba của tôi.


Trong trường hợp này, tôi sẽ không còn RAM nữa mặc dù mức sử dụng là:

* Máy ảo đầu tiên của tôi chỉ sử dụng **4 GB RAM** - Được phân bổ **6 GB - 2 GB** Không sử dụng và bị chặn
* Máy ảo thứ hai của tôi chỉ sử dụng **3 GB RAM** - Được phân bổ **4 GB - 1 GB**  Không sử dụng và bị chặn
* Máy ảo thứ ba của tôi chỉ sử dụng **2 GB RAM** - Được phân bổ **6 GB - 4 GB** Không sử dụng và bị chặn

Điều này là do khi một phần bộ nhớ được cấp phát cho Máy ảo, thì bộ nhớ đó sẽ bị chặn và không thể được cấp phát lại. Tôi sẽ lãng phí tổng cộng **7 GB ( 2 GB + 1 GB + 4 GB ) RAM** và do đó không thể thiết lập Máy ảo mới. Đây là một vấn đề lớn vì RAM là một phần cứng đắt tiền.

*Vì vậy, làm thế nào tôi có thể tránh vấn đề này?*

Nếu tôi sử dụng Docker, CPU của tôi sẽ phân bổ chính xác lượng bộ nhớ được Container yêu cầu.

* Container đầu tiên của tôi sẽ chỉ sử dụng **4 GB RAM - Được phân bổ 4 GB - 0 GB** Không sử dụng và bị chặn
* Container thứ hai của tôi sẽ chỉ sử dụng **3 GB RAM - Được phân bổ 3 GB - 0 GB** Không sử dụng và bị chặn
* Container thứ ba của tôi sẽ chỉ sử dụng **2 GB RAM - Được phân bổ 2 GB - 0 GB** Không được sử dụng và bị chặn

Vì không có bộ nhớ được cấp phát (RAM) không được sử dụng, tôi tiết kiệm 7 GB ( 16 - 4 - 3 - 2 ) RAM bằng cách sử dụng Docker Container. Tôi thậm chí có thể tạo thêm các vùng chứa từ RAM còn sót lại và tăng năng suất của mình.

Vì vậy, ở đây Docker Container chiến thắng rõ ràng trước Máy ảo vì tôi có thể sử dụng hiệu quả tài nguyên của mình theo nhu cầu của mình.

**Khởi động**

![](https://images.viblo.asia/ef115bbe-0215-4b16-a4ba-4d32b65906c4.png)

Khi bắt đầu khởi động, Máy ảo mất rất nhiều thời gian để khởi động vì hệ điều hành guest cần phải khởi động lại từ đầu, sau đó sẽ tải tất cả các tệp nhị phân và thư viện. Điều này tốn thời gian và sẽ rất tốn kém vào những thời điểm cần khởi động nhanh các ứng dụng. Trong trường hợp Docker Container, vì container chạy trên hệ điều hành máy chủ của bạn, bạn có thể tiết kiệm thời gian khởi động quý giá. Đây là một lợi thế rõ ràng so với Máy ảo.

Hãy xem xét một tình huống mà tôi muốn cài đặt hai phiên bản Ruby khác nhau trên hệ thống của mình. Nếu tôi sử dụng Máy ảo, tôi sẽ cần thiết lập 2 Máy ảo khác nhau để chạy các phiên bản khác nhau. Mỗi thứ này sẽ có bộ nhị phân và thư viện riêng khi chạy trên các hệ điều hành guest khác nhau. Trong khi nếu tôi sử dụng Docker Container, mặc dù tôi sẽ tạo 2 container khác nhau trong đó mỗi contanier sẽ có bộ nhị phân và thư viện riêng, tôi sẽ chạy chúng trên hệ điều hành máy chủ của mình. Chạy chúng trực tiếp trên hệ điều hành Máy chủ lưu trữ của tôi làm cho Bộ chứa Docker của tôi nhẹ và nhanh hơn.

Vì vậy, Docker Container rõ ràng sẽ thắng lại từ Máy ảo dựa trên tham số Khởi động.

**Còn về Tích hợp?**

Có thể có khả năng tích hợp các công cụ khác nhau bằng Máy ảo, nhưng ngay cả khả năng đó cũng đi kèm với rất nhiều phức tạp.
![](https://images.viblo.asia/21462534-176e-4e73-a3e1-aecc6c246e15.png)

Tôi chỉ có thể có một số công cụ DevOps giới hạn chạy trong Máy ảo. Như bạn có thể thấy trong hình trên, Nếu tôi muốn có nhiều phiên bản Jenkins và Puppet, thì tôi sẽ cần tạo ra nhiều Máy ảo vì mỗi máy chỉ có thể có một phiên bản chạy của các công cụ này. Việc thiết lập mỗi máy ảo đều mang theo những vấn đề về cơ sở hạ tầng. Tôi sẽ gặp vấn đề tương tự nếu tôi quyết định thiết lập nhiều phiên bản của Ansible, Nagios, Selenium và Git. Nó cũng sẽ là một nhiệm vụ bận rộn để cấu hình các công cụ này trong mọi máy ảo.

Đây là nơi Docker đến để giải cứu. Sử dụng Docker Container, chúng ta có thể thiết lập nhiều phiên bản Jenkins, Puppet và nhiều phiên bản khác, tất cả đều chạy trong cùng một contanier hoặc chạy trong các container khác nhau có thể tương tác với nhau bằng cách chỉ chạy một vài lệnh. Tôi cũng có thể dễ dàng mở rộng quy mô bằng cách tạo nhiều bản sao của các container này. Vì vậy, cấu hình chúng sẽ không phải là một vấn đề.
![](https://images.viblo.asia/672dd80b-3987-4072-974f-3d4d0b1639a2.png)

Tóm lại, sẽ không quá khi nói rằng đây là một lựa chọn hợp lý hơn khi so sánh với Máy ảo.

Cái trước được thiết kế để mang lại lợi ích cho cả Nhà phát triển và Quản trị viên hệ thống, khiến nó trở thành một phần của nhiều công cụ DevOps. Các nhà phát triển có thể viết mã của họ mà không cần lo lắng về việc kiểm tra hoặc môi trường sản xuất và quản trị viên hệ thống không cần lo lắng về cơ sở hạ tầng vì Docker có thể dễ dàng mở rộng quy mô và giảm số lượng hệ thống để triển khai trên các máy chủ.

# 2. Docker Engine là gì?
Bây giờ tôi sẽ đưa bạn qua Docker Engine là trái tim của hệ thống.

Docker Engine chỉ đơn giản là ứng dụng được cài đặt trên máy chủ của bạn. Nó hoạt động giống như một ứng dụng client-server chủ sử dụng:

* Server là một loại chương trình chạy lâu dài được gọi là quy trình daemon
* Một giao diện dòng lệnh (CLI) client
* API REST được sử dụng để giao tiếp giữa CLI client và Docker Daemon

![](https://images.viblo.asia/dc6b274f-8e9e-40d1-9c83-3fd592309df8.png)

Như hình trên, trong Hệ điều hành Linux, có một máy guest có thể được truy cập từ terminal và một Host chạy Daemon. Chúng tôi xây dựng image của mình và chạy các container bằng cách chuyển các lệnh từ CLI client tới Daemon.

Tuy nhiên, trong trường hợp Windows / Mac, có một Toolbox bên trong Docker host. Docker Toolbox này là một trình cài đặt để cài đặt và thiết lập môi trường Docker trên Windows / iOS của bạn một cách nhanh chóng và dễ dàng. Toolbox này cài đặt Docker Client, Machine, Compose (chỉ dành cho Mac), Kitematic và VirtualBox.

Bây giờ chúng ta hãy hiểu ba thuật ngữ quan trọng, đó là **Docker Images** , **Docker Containers** và **Docker Registry**.

**Hình ảnh Docker là gì?**

Docker Image có thể được so sánh với một mẫu được sử dụng để tạo Docker Containers. Chúng là các khối xây dựng của Docker Container. Các Docker images này được tạo bằng lệnh xây dựng. Các mẫu Chỉ đọc này được sử dụng để tạo container bằng cách sử dụng lệnh chạy. Chúng ta sẽ khám phá các lệnh Docker chuyên sâu trong “blog Các lệnh Docker”. 
![](https://images.viblo.asia/027860ce-cb85-4053-bec6-4767dd362aab.png)

Docker cho phép mọi người (hoặc công ty) tạo và chia sẻ phần mềm thông qua Docker images. Ngoài ra, bạn không phải lo lắng về việc liệu máy tính của mình có thể chạy phần mềm trong Docker image hay không - một Docker container luôn có thể chạy nó . 

Tôi có thể sử dụng docker image làm sẵn từ docker-hub hoặc tạo một image mới theo yêu cầu của tôi. Trong blog Docker Commands, chúng ta sẽ xem cách tạo hình ảnh của riêng bạn.

**Docker Container là gì?**

Docker Containers là các ứng dụng sẵn sàng được tạo từ Docker Images. Hoặc bạn có thể nói rằng họ đang chạy các phiên bản của Images và họ giữ toàn bộ gói cần thiết để chạy ứng dụng. Đây là tiện ích cuối cùng của công nghệ. 
![](https://images.viblo.asia/834eb272-4c0a-40fb-b64c-2170ab51c147.png)

**Docker Registry là gì?**

Cuối cùng, Docker Registry là nơi lưu trữ Docker images. Registry có thể là kho lưu trữ cục bộ của người dùng hoặc kho lưu trữ công cộng như Docker Hub cho phép nhiều người dùng cộng tác trong việc xây dựng ứng dụng. Ngay cả với nhiều nhóm trong cùng một tổ chức có thể trao đổi hoặc chia sẻ các container bằng cách tải chúng lên Docker Hub, một kho lưu trữ đám mây tương tự như GitHub.

**Docker Architecture là gì?**

Docker Architecture bao gồm một ứng dụng Docker client - được sử dụng để kích hoạt các lệnh Docker, một Docker Host - chạy Docker Daemon và một Docker Registry - lưu trữ Docker Images. Docker Daemon chạy trong Docker Host chịu trách nhiệm về image và container.
![](https://images.viblo.asia/55477505-8f6d-44bc-89f2-69faa6eba167.png)

* Để xây dựng Docker Image, chúng ta có thể sử dụng CLI (client) để đưa ra lệnh xây dựng cho Docker Daemon (chạy trên Docker_Host). Sau đó, Daemon sẽ xây dựng một image dựa trên đầu vào của chúng ta và lưu nó trong Registry, có thể là trung tâm Docker hoặc kho lưu trữ cục bộ
* Nếu chúng ta không muốn tạo một image, thì chúng ta chỉ có thể lấy một image từ Docker hub, mà lẽ ra sẽ được tạo bởi một người dùng khác
* Cuối cùng, nếu chúng ta phải tạo một phiên bản đang chạy củaDocker image, chúng ta có thể đưa ra lệnh chạy từ CLI, lệnh này sẽ tạo một Container.

Những điều nói trên là một chức năng đơn giản của công nghệ này!

Nguồn: [Edureka](https://www.edureka.co/blog/what-is-docker-container)