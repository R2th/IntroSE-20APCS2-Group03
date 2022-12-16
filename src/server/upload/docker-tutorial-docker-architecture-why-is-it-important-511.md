Nhiều người trong chúng ta tin rằng Docker là một phần không thể thiếu của DevOps . Vì vậy, đằng sau công cụ đáng kinh ngạc này, phải có một kiến ​​trúc tuyệt vời. Trong blog này, tôi sẽ trình bày mọi thứ mà bạn phải biết về kiến trúc Docker. Đây là những điểm mà tôi sẽ thảo luận ở đây:

1. Traditional Virtualization vs Docker
1. Docker’s Workflow
1. Docker Architecture
    * Docker’s Client
    * Docker Host
    * Docker Objects
    * Docker’s Registry

# 1. Traditional Virtualization Vs Docker
### Máy ảo (Virtual Machine - VM) là gì?

VM là một máy chủ ảo giả lập một máy chủ phần cứng. Máy ảo dựa vào phần cứng vật lý của hệ thống để mô phỏng chính xác môi trường mà bạn cài đặt các ứng dụng của mình. Tùy thuộc vào trường hợp sử dụng của mình, bạn có thể sử dụng máy ảo hệ thống (chạy toàn bộ hệ điều hành như một quá trình, cho phép bạn thay thế một máy thực cho một máy ảo) hoặc xử lý các máy ảo cho phép bạn thực thi các ứng dụng máy tính một mình trong môi trường ảo.

Trước đó, chúng tôi đã từng tạo các máy ảo và mỗi máy ảo đều có một hệ điều hành chiếm nhiều dung lượng và khiến nó nặng nề.

### Docker là gì?

Docker là một dự án mã nguồn mở cung cấp giải pháp phát triển phần mềm được gọi là container. Để hiểu Docker, bạn cần biết container là gì. Theo [Docker](https://www.docker.com/) , container là một gói nhẹ, độc lập, có thể thực thi được của một phần mềm bao gồm mọi thứ cần thiết để chạy nó.

Các container độc lập với nền tảng và do đó Docker có thể chạy trên cả nền tảng Windows và Linux. Trên thực tế, Docker cũng có thể được chạy trong một máy ảo nếu có nhu cầu. Mục đích chính của Docker là nó cho phép bạn chạy các ứng dụng microservice trong một kiến ​​trúc phân tán.

Khi so sánh với Máy ảo, nền tảng Docker nâng cấp tài nguyên trừu tượng từ cấp phần cứng lên cấp Hệ điều hành. Điều này cho phép nhận ra các lợi ích khác nhau của Container, ví dụ như tính di động của ứng dụng, phân tách cơ sở hạ tầng và các dịch vụ vi mô khép kín.

Nói cách khác, trong khi Máy ảo trừu tượng hóa toàn bộ máy chủ phần cứng, Máy chủ chứa trừu tượng hóa hạt nhân Hệ điều hành. Đây là một cách tiếp cận hoàn toàn khác đối với ảo hóa và dẫn đến các phiên bản nhanh hơn và nhẹ hơn nhiều.
![](https://images.viblo.asia/d7b64371-6793-483f-99ee-0e086e46c2ba.png)

# 2. Quy trình làm việc của Docker

Trước tiên, chúng ta hãy xem qua Docker Engine và các thành phần của nó để chúng ta có ý tưởng cơ bản về cách hệ thống hoạt động. Docker Engine cho phép bạn phát triển, lắp ráp, vận chuyển và chạy các ứng dụng bằng cách sử dụng các thành phần sau:

1. **Docker Daemon**: Một quy trình nền liên tục quản lý Docker images, containers, networks, và storage volumes. Docker daemon liên tục lắng nghe các yêu cầu API Docker và xử lý chúng.
1. **Docker Engine REST API**: Một API được các ứng dụng sử dụng để tương tác với Docker daemon. Nó có thể được truy cập bởi một máy khách HTTP.
1. **Docker CLI**: Một ứng dụng khách giao diện dòng lệnh để tương tác với trình nền Docker. Nó đơn giản hóa đáng kể cách bạn quản lý các phiên bản container và là một trong những lý do chính khiến các nhà phát triển thích sử dụng Docker.

![](https://images.viblo.asia/0254eb56-e713-42bf-a81f-525f9d93e9d6.png)

Lúc đầu, Docker client giao tiếp với Docker daemon, trình nền này thực hiện việc nâng cao xây dựng, chạy, cũng như phân phối các Docker container của chúng tôi. Về cơ bản, cả Docker client và daemon đều có thể chạy trên cùng một hệ thống. Chúng tôi cũng có thể kết nối Docker client với Docker daemon từ xa. Ngoài ra, bằng cách sử dụng API REST, Docker client và daemon, giao tiếp qua ổ cắm UNIX hoặc giao diện mạng.

# 3. Kiến trúc Docker
Kiến trúc của Docker sử dụng mô hình client-server và bao gồm các thành phần Docker’s Client, Docker Host, Network và Storage components, và Docker Registry/Hub. Chúng ta hãy xem xét từng chi tiết trong số này.

### Docker’s Client

Người dùng Docker có thể tương tác với Docker thông qua client. Khi bất kỳ lệnh docker nào chạy, client sẽ gửi chúng đến dockerd daemon để thực hiện các lệnh đó. Docker API được sử dụng bởi các lệnh Docker. Docker client có thể giao tiếp với nhiều hơn một daemon.

### Docker Host
Docker host cung cấp một môi trường hoàn chỉnh để thực thi và chạy các ứng dụng. Nó bao gồm Docker daemon, Images, Containers, Networks, và Storage. Như đã đề cập trước đây, daemon chịu trách nhiệm cho tất cả các hành động liên quan đến container và nhận các lệnh thông qua CLI hoặc API REST. Nó cũng có thể giao tiếp với các daemon khác để quản lý các dịch vụ của mình.

### Docker Objects 
#### 1. Images
Images không là gì ngoài một mẫu nhị phân chỉ đọc có thể tạo container. Chúng cũng chứa siêu dữ liệu mô tả các khả năng và nhu cầu của container. Images được sử dụng để lưu trữ và vận chuyển các ứng dụng. Một image có thể được sử dụng riêng để tạo container hoặc tùy chỉnh để thêm các phần tử bổ sung nhằm mở rộng cấu hình hiện tại.

Bạn có thể chia sẻ container giữa các nhóm trong doanh nghiệp với sự trợ giúp của sổ đăng ký container riêng hoặc chia sẻ nó với mọi người bằng cách sử dụng sổ đăng ký công khai như Docker Hub. Images là yếu tố cốt lõi của trải nghiệm Docker vì chúng cho phép cộng tác giữa các nhà phát triển theo cách mà trước đây không thể thực hiện được
#### 2. Containers
Containers là một loại môi trường được đóng gói trong đó bạn chạy các ứng dụng. Containers được xác định bởi image và bất kỳ tùy chọn cấu hình bổ sung nào được cung cấp khi khởi động container, bao gồm và không giới hạn các kết nối mạng và các tùy chọn lưu trữ. Containers chỉ có quyền truy cập vào tài nguyên được xác định trong image, trừ khi quyền truy cập bổ sung được xác định khi xây dựng image thành container.

Bạn cũng có thể tạo image mới dựa trên trạng thái hiện tại của container. Vì các containers nhỏ hơn nhiều so với máy ảo, chúng có thể được quay trong vài giây và dẫn đến mật độ máy chủ tốt hơn nhiều

#### 3. Networks
Docker networking là một đoạn qua đó tất cả các containers biệt lập giao tiếp với nhau. Chủ yếu có năm trình điều khiển mạng trong docker:

* **Bridge** : Nó là trình điều khiển mạng mặc định cho một container. Bạn sử dụng mạng này khi ứng dụng của bạn đang chạy trên các containers độc lập, tức là nhiều container giao tiếp với cùng một docker host.
* **Host** : Trình điều khiển này loại bỏ sự cô lập mạng giữa các containers docker và docker host. Bạn có thể sử dụng nó khi bạn không cần bất kỳ sự cách ly mạng nào giữa máy chủ và container.
* **Overlay** : Mạng này cho phép các dịch vụ bầy đàn giao tiếp với nhau. Bạn sử dụng nó khi bạn muốn các containers chạy trên các Docker hosts khác nhau hoặc khi bạn muốn hình thành các swarm services bởi nhiều ứng dụng.
* **None** : Trình điều khiển này vô hiệu hóa tất cả kết nối mạng.
* **macvlan** : Trình điều khiển này gán địa chỉ mac cho các containers để làm cho chúng trông giống như các thiết bị vật lý. Nó định tuyến lưu lượng giữa các container thông qua địa chỉ mac của chúng. Bạn sử dụng mạng này khi bạn muốn các container trông giống như một thiết bị vật lý, chẳng hạn trong khi di chuyển thiết lập máy ảo.
#### 4. Storage
Bạn có thể lưu trữ dữ liệu trong lớp có thể ghi của container nhưng nó yêu cầu trình điều khiển lưu trữ. Không bền bỉ, nó sẽ chết bất cứ khi nào container không chạy. Hơn nữa, không dễ để chuyển dữ liệu này. Đối với lưu trữ liên tục, Docker cung cấp bốn tùy chọn:

* **Data Volumes** : Chúng cung cấp khả năng tạo lưu trữ liên tục, với khả năng đổi tên khối lượng, liệt kê khối lượng và cũng liệt kê container được liên kết với khối lượng. Khối lượng dữ liệu được đặt trên hệ thống tệp máy chủ, bên ngoài bộ chứa cơ chế sao chép khi ghi và khá hiệu quả.

* **Volume Container** : Đây là một cách tiếp cận thay thế trong đó container chuyên dụng chứa một khối lượng và để gắn khối lượng đó vào các container khác. Trong trường hợp này, container khối lượng độc lập với container ứng dụng và do đó bạn có thể chia sẻ nó trên nhiều containers.

* **Directory Mounts** : Một tùy chọn khác là gắn thư mục cục bộ của máy chủ lưu trữ vào container. Trong các trường hợp đã đề cập trước đây, các volumes sẽ phải nằm trong thư mục Docker volumes, trong khi khi nói đến Directory Mounts, bất kỳ thư mục nào trên máy chủ đều có thể được sử dụng làm nguồn cho volume.

* **Storage Plugins** : Storage Plugins cung cấp khả năng kết nối với các nền tảng lưu trữ bên ngoài. Các plugin này ánh xạ bộ nhớ từ máy chủ đến nguồn bên ngoài như mảng lưu trữ hoặc thiết bị. Bạn có thể xem danh sách các plugin lưu trữ trên trang Plugin của Docker.
### Docker’s Registry
Docker registries là dịch vụ cung cấp vị trí từ đó bạn có thể lưu trữ và tải xuống image. Nói cách khác, Docker registries chứa các kho lưu trữ Docker lưu trữ một hoặc nhiều Docker Image. Cơ quan đăng ký công khai bao gồm hai thành phần là Docker Hub và Docker Cloud. Bạn cũng có thể sử dụng Private Registries. Các lệnh phổ biến nhất khi làm việc với sổ đăng ký bao gồm: docker push, docker pull, docker run

Nguồn: [Edureka](https://www.edureka.co/blog/docker-architecture/)