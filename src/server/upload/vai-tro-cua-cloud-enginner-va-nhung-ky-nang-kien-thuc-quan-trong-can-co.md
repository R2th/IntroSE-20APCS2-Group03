{@youtube: https://www.youtube.com/embed/L4DeSlVhXqw}

Hôm nay thì mình sẽ chia sẻ những hiểu biết, kinh nghiệm của mình về vị trí Cloud Engineer .

Và bài viết này sẽ giúp các bạn hiểu rõ hơn về vai trò của một Cloud Engineer cũng như những kĩ năng, kiến thức cần thiết để có thể trở thành một Cloud Engineer.

**✊ Let's start! ✊**

-----

## 1️⃣  Vai trò của Cloud Engineer
**Cloud Engineer** là vị trí planning, maintain, design Cloud Infrastructure - làm việc trực tiếp với Infrastructure ở trong 1 công ty. 

Nếu các bạn chưa biết, **Cloud Infrastructure** bao gồm các thành phần cần thiết liên quan tới Cloud Computing là:
* Hardware (Servers)
* Network
* Storage/Database
* Software

Mình có thể lấy một số ví dụ về công việc của Cloud Engineer như sau:

1. Thiết kế Infrastructure cho các Application chạy trên Cloud Platform: Lựa chọn giải pháp computing tối ưu nhất cho Application deploy trên Cloud, lựa chọn giải pháp Database, Thiết lập Networking giữa Application với Cloud Services. hoặc là giữa Application chạy trên Cloud với môi trường On-Premises, Thiết lập DNS rồi CDN.
2. Sau khi Application chạy trên thực tế ổn định, thì Cloud Engineer cũng sẽ cần phải theo dõi cost của toàn bộ Infrastructure và đưa ra các giải pháp để tối ưu hóa cost, khi cần thiết thì cũng cần phải scale Infrastructure để đáp ứng được workload.

> 💭 Đây chỉ là 2 ví dụ về công việc của Cloud Engineer. Ngoài ra thì còn rất rất nhiều công việc lặt vặt khác.

Tiếp theo, các bạn có thể nghe thấy từ "**Cloud**" rất nhiều và ở đây "**Cloud**" - tương đương với Internet, tức là người dùng có thể sử dụng, khởi tạo nhanh chóng (provision) các tài nguyên Infrastructure từ bất kì địa điểm nào vào bất kì lúc nào họ cần.

Đối với các dịch vụ Cloud Computing, chúng ta sẽ có **Cloud Provider** là nhà cung cấp dịch vụ. 

Mỗi Cloud Provider sẽ sử dụng các công nghệ virtualization để abstract các **physical hardware** được cài đặt trong các **Data Center** trên toàn thế giới. 

Và sau đó, sẽ được cung cấp dưới dạng các dịch vụ ở trên Cloud.

> 💭 Ngoài ra có 3 khái niệm **Public Cloud**, **Private Cloud** và **Hybrid Cloud** mà tạm thời mình sẽ bỏ qua.

Quay trở lại với nội dung chính, tùy vào môi trường làm việc thì vị trí này có thể tách nhỏ hơn dựa trên các lĩnh vực chuyên môn. Ví dụ :
* Cloud Architect
* Cloud Network Engineer
* Cloud Security Engineer
* Cloud SysOps Engineer
* Cloud Developer

Tuy nhiên, cho dù có tách nhỏ theo chuyên môn hay không. thì mình chắc chắn một điều là các bạn sẽ cần phải có hiểu biết ở một mức độ nào đấy đỗi với từng lĩnh vực chuyên môn này để có thể thành công dưới vai trò là 1 Cloud Engineer. 🔥

-----

## 2️⃣  Các kĩ năng, kiến thức cần thiết (Skillset)

Tiếp theo mình sẽ liệt kê một số kiến thức / kĩ năng mà mình nghĩ là quan trọng đối với **Cloud Engineer**.

### ☑️Programming Languagues
Sử dụng thành thạo ít nhất 1 ngôn ngữ lập trình Ví dụ: Python, Java, Go

Đây là các ngôn ngữ lập trình bậc cao và có thể sử dụng với nhiều mục đích khác nhau. Đối với cá nhân mình thì mình rất hay sử dụng Python.

Các bạn cũng sẽ cần phải tự mình viết được các application liên kết với các Cloud Services. Đặc biệt là API hay là Web Services vì đây là 2 dạng Application phố biến nhất.

Ngoài ra, các bạn cũng phải hiểu về các khái niệm liên quan tới Software Development như là: Source Code Version Control, Agile, Scrum v.v

### ☑️Hệ điều hành Linux
Trong thực tế, thường các application như là API / Web Services sẽ được deploy và chạy ở trên hệ điều hành **Linux**. 

Cho nên các bạn cần phải có kiến thức về Linux để có thể maintain, cũng như vận hành Linux Server.

Và trong Linux, các bạn cũng sẽ cần phải hiểu về các **Middleware** hay được sử dụng với Application. Đây là các software sẽ cung cấp thêm các chức năng cho hệ điều hành Linux.

Ví dụ: **NGINX**, **HAProxy** v.v

### ☑️Networking, Internet Protocols

Hiểu về: **IP Address**, **CIDR**, **Firewall**

Protocol: **TCP/IP**, **HTTP/HTTPS**, **SSL**

Các dịch vụ: **DNS**, **CDN**.

Đây là kiến thức quan trọng để giúp các bạn hiểu, cũng như thiết kế Networking cần thiết cho Application chạy trên Cloud.

> 💭 Thực chất thì Networking ở trên Cloud sẽ đơn giản hơn so với Networking ở trên môi trường On-premise khi mà Engineer sẽ phải làm việc trực tiếp với Router, Switch.

Khi mà hệ thống lớn và phức tạp thì sẽ cần phải có vị trí chuyên môn là: Cloud Network Engineer để phụ trách mảng này.

### ☑️Database/Storage
Phát triển các skills liên quan tới Database. Thường sẽ là RDBMS hoặc NoSQL.

* **RDBMS**: MySQL / PostgreSQL

* **NoSQL**: MongoDB, hoặc là Cassandra

Trên các dịch vụ Cloud Computing đều cung cấp giải pháp liên quan tới Database dựa trên RDBMS / NoSQL. 

Vì vậy đây là kiến thức quan trọng để giúp các bạn có thể maintain cũng như vận hành Database.

Tiếp theo, đối với Storage thì sẽ có 3 loại chính:
* File Storage
* Block Storage
* Object Storage

Thì các bạn cũng sẽ cần phỉa hiểu về 3 loại Storage này để lựa chọn giải pháp tối ưu cho hệ thống

### ☑️Container, Container Orchestration
Hiểu về **Container** và các công nghệ như: **Docker**, **Kubernetes** Đây là những kiến thức cũng rất là quan trọng đối Cloud Engineer.

**Container** là package đóng gói Application cùng với các dependencies cần thiết để chạy được Application. Container có thể chạy ở bất kì môi trường nào nếu môi trường đấy có cài đặt container runtime.

Để tìm hiểu về Container, thì **Docker** là công cụ phổ biến nhất hiện nay, các bạn có thể dùng Docker để build và chạy Container ở trên môi trường dev của các bạn.

Và khi các bạn cần deploy Container lên các dịch vụ Cloud, lúc này sẽ cần tới các công cụ **Container Orchestration**, và hiện nay thì **Kubernetes** là Container Orchestration platform phổ biến nhất mà các bạn nên sử dụng.

Ngoài ra các bạn cũng có lựa chọn khác là sử dụng các dịch **Serverless Computing** để triển khai Container trên các Cloud Platform.

### ☑️Cloud Computing Platform
Kinh nghiệm sử dụng thực tiễn với một trong các Cloud Provider có thị trường lớn như: AWS / GCP / Microsoft Azure.

Các bạn sẽ phải thiết kế, sử dụng các dịch vụ trên Cloud Computing Platform liên quan tới: Server, Storage và Network. Ngoài ra các bạn cũng sẽ phải hiểu được các best practices để lựa chọn các giải pháp phù hợp nhất với hệ thống.

Txất nhiên, mình nghĩ là không phải ai cũng có điều kiện để làm việc trực tiếp với Cloud Computing nhưng có 1 số cách mà các bạn có thể tham khảo như sau:

- Vận dụng mọi cơ hội để chủ động tham gia vào các dự án và đảm nhận các task liên quan tới Cloud Computing từ đơn giản tới phức tạp
- Tự đăng ký tài khoản trên các Cloud Computing Platform, đăng ký các khóa học Hands-On và tự tích lũy kinh nghiệm của bản thân.

### ☑️Cloud Automation
* **Infrastructure as Code**

Đây là công nghệ giúp các bạn duy trì sự đồng nhất giữa các môi trường như là: staging, canary, production sử dụng code.

Kết hợp giữa Infrastructure As Code và Cloud Computing sẽ giúp các bạn provision infrastructure một cách rất là nhanh. 

Khi cần thay đổi setting của Infrastructure thì việc các bạn cần làm là thay đổi code và deploy.

* **DevOps**

Đây là một trong những kĩ năng cực kì quan trọng đối với bất kì vị trí nào không chỉ Cloud Engineer.

Hiểu về DevOps và tốt hơn nữa là biết cách vận dụng các nguyên lí  DevOps vào trong quá trình phát triển phần mềm.

* **CI/CD**

**Continuous Integration** / **Continuous Delivery**: Giúp đẩy nhanh quá trình triển khai product / application tới người dùng nhưng vẫn giữ được chất lượng tốt nhất có thể.

Các bạn có thể vận dụng các CI/CD tools để tự động hóa các process trong chu trình phát triển phần mềm, cũng như quản lý Infrastructure.

---

## 3️⃣  Tổng kết
Trên đây là những chia sẻ của mình về vị trí Cloud Engineer từ chính kinh nghiệm của bản thân mình.

Hi vọng bài viết này có thể giúp mọi người tham khảo và có kế hoạch phát triển phù hợp với bản thân.

Đối với anh em thích tìm hiểu Cloud Computing và Infrastructure giống như mình thì mình nghĩ đây là một vị trí rất là tuyệt vời. 😍

**Ghé thăm mình tại:**
* **[Youtube](https://www.youtube.com/c/FullstacKAGE)**
* **[GitHub](https://github.com/p-le)**
* **[Facebook](https://www.facebook.com/fullstackage)**
* **[Tiktok](https://www.tiktok.com/@fullstackage)**
* **[Instagram](https://www.instagram.com/fullstackage/)**
* **[Twitch](https://www.twitch.tv/fullstackage)**

ありがとうございます！🙇