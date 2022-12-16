## Microservices và containers là gì?

Đầu tiên mình xin giới thiệu tổng quan về microservices và containers.

Microservice là một loại kiến trúc mà tách ứng dụng của bạn thành nhiều services nhỏ thực hiện một chức năng chuyên biệt. Mỗi microservice sẽ có một chức năng logic khác nhau cho ứng dụng của bạn. Mỗi microservices là một cách tiếp cận hiện đại hơn trong một kiến trúc của ứng dụng khi được so sánh với một cấu trúc nguyên khối nơi tất cả components và functions của ứng dụng đều trong instance đơn lẻ. Bạn có thể so sánh kiến trúc nguyên khối (monolithic) với microservice trong sơ đồ bên dưới:
![](https://images.viblo.asia/cfc5916c-c051-407f-aa9b-b70a6c227728.png)

Vậy chúng ta có thể đặt các microservices ở đâu? Chính trong containers. Containers là những gói packages chứa mọi thứ cần thiết để phần mềm của bạn có thể hoạt động như code, dependencies, libraries, binaries... [Docker](https://www.docker.com/) là một trong những sự lựa chọn phổ biến cho việc build và run các containers nhưng [Kubernete](https://kubernetes.io/) đang nhanh chóng trở thành tiêu chuẩn trên thực tế mà được dùng để bố trí các container trong môi trường dự án lớn. So sánh với máy ảo (Virtual Machines) , containers chia sẻ phần cốt lõi trong hệ điều hành thau về tạo một bản copy đầy đủ của nó (tương tự tạo nhiều VMS trong một single host). Mặc dù có thể đặt các microservices trong nhiều VMs, containers vẫn được dùng phổ biến  trong trường hợp này vì nớ chiếm ít bộ nhớ hơn và nhanh hơn để khởi động. 

## Tại sao sử dụng kiến trúc microservice? 

Kiến trúc microservices được tạo ra nhằm giải quyết các vấn đề mà chúng ta nhìn thấy trong cấu trúc nguyên khối. Microservices  đã được sử dụng rộng rãi và các websites quy mô lớn đã chuyển đổi từ các app nguyên khối thành microservices. Một số lợi ích của việc dùng kiến trúc microservices:
* Developers sẽ làm việc trên một code base nhỏ hơn khi được so sánh với app nguyên khối. Khi các components của app được kết hợp một cách rời rạt, cách developers sẽ dễ dàng hiểu source code và không làm chậm quá trình phát trình phát triển. Không thể không đề cập, IDE của bạn sẽ nhanh hơn nếu bạn làm việc với số dòng code ít hơn. Các developers sẽ không cần đối đầu với sự phức tạp và sự phụ thuộc của các functions mà có thể được tìm thấy trong một app nguyên khối. 
* Các khối công nghệ của app có thể đa dạng ở các microservices. Ứng dụng sẽ không còn cần phụ thuộc vào một ngôn ngữ hay thư viện nhất định. Microservices sẽ có thể cho phép các ngôn ngữ lập trình khác nháu mà các developers thấy phù hợp. 
        ![](https://images.viblo.asia/c0006894-015f-44ad-b7ce-35b3a5816bd0.png)
* Dễ dàng update hệ thống khi có thay đổi nhỏ.  So sánh với monolithic app, với microservices, bạn sẽ không cần deploy mọi thứ trở lại cho một sự thay đổi nhỏ, thay vào đó chỉ cần rebuild và deploy cái microservice mà bạn cần update.
* Khả năng mở rộng sẽ độc lập đối với mỗi microservice. Bạn có thể chọn để mở rộng mỗi compenent dựa vào nguồn mà nó cần. Bạn sẽ không cần tạo nhiều instances của mọi thứ như app nguyên khối. Việc mở rộng các microservices sẽ dùng một cách hiệu quả các nguồn có sắn thay vì tạo nhiều bản copy của toàn bộ hệ thống trong một app nguyên khối.
        ![](https://images.viblo.asia/5c7fff4d-f998-49c6-a633-92c698b3bc96.png)
* Dữ liệu có thể phi tập trung. Bạn có thể chọn dùng các databases hay storage khác nhau. Bạn có thể chọn NoQuery database nếu microservice của bạn phù hợp với nó hơn relational database. Một microservice cũng có thể chỉ cần một database được lưu trữ theo key đơn giản như Redis. Giống như sơ đồ bên dưới, bạn có thể chọn sự kết hợp giữa Cloudant, MySQL và MongoDB. Bạn có thể tận dụng các cơ sở dữ liệu khác nhau để lưu trữ các loại dữ liệu khác nhau. 
        ![](https://images.viblo.asia/e50e6c6e-9410-401b-a233-c1f928000637.png)
* Isolate failures. Một eror hoặc một bug trong một microservice không làm down toàn bộ hệ thống. Khi bạn có các thành phần được kết hợp một cách rời rạt và một dịch vụ microservice trong ứng dụng của bạn bị treo hoặc ném lỗi thì ít có khả năng các microservices khác bị ảnh hưởng vì chúng nằm trong các containers riêng và không hoàn toàn phụ thuộc vào nhau. Một ứng dụng nguyên khối có thể làm down toàn bộ quá trình ứng dụng của bạn nếu error hoặc bug không được phát hiện một cách toàn diện. 
  
Bên cạnh những ưu điểm trên của Microservices thì cũng không tránh khỏi vài bất lợi.
       
##    Vậy những nhược điểm của Microservices là gì?
Trong khi việc sử dụng microservice giải quyết một số vấn đề của kiến trúc nguyên khối, sử dụng chúng cũng có một số vấn đề riêng. Nếu bạn đang cố gắng phân chia ứng dụng nguyên khối của mình thành microservice, thách thức đầu tiên là làm thế nào để phân tách chúng. Bạn có thể chọn tách chúng theo các chức năng business, chẳng hạn như một microservices để xử lý các lô hàng và một microservice khác để xử lý các dịch vụ thanh toán. Cuối cùng, các thành phần của bạn chỉ nên chứa một set các functions hoặc responsibilities nhỏ.

Một số vấn đề trong kiến trúc microservice mà ta có thể thấy là: 
*  Khi số lượng microsercvices của bạn tăng lên, thật khó để theo dõi chúng. Ban đầu, việc thiết lập tích hợp liên tục và phân phối liên tục có thể khó khăn vì bạn sẽ cần phải đối phó với sự phức tạp kèm theo của việc có quá nhiều microservices. 
*  Phức tạp. Microservice sẽ cần nhiều sự phối hợp hơn đặc biệt khi nhiều team tham gia. Microservice cũng sẽ giới thiệu nhiều network calls hơn trong trường hợp cần tương tác với các microservices khác mà điều này sẽ không có xuất hiện trong một ứng dụng nguyên khối. Nó sẽ không đơn giản như việc triển khai một phiên bản của một ứng dụng. Nhiều thứ khác bạn cũng sẽ cần xem xét là: cách xử lý giao tiếp giữa các microservices, xử lý lỗi để tránh làm gián đoạn các micrservices khác và thêm nhiều trường hợp test vào mỗi thành phần. 
*  Việc tìm kiếm và theo dõi các bugs / errors trong ứng dụng của bạn. Sẽ dễ dàng tìm thấy hơn nếu microservice của bạn chỉ có một route nhưng nếu một microservice giao tiếp với nhiều microservice khác, nó có thể tiêu tốn rất nhiều thời gian của bạn chỉ để tìm kiếm một lỗi. 
*  Định tuyến microservice của bạn sẽ cần làm việc nhiều hơn. Bạn cần phải dành thời gian để cấu hình và kiểm soát luồng của các microservices. Bạn cũng sẽ cần theo dõi phiên bản của các microservices và xử lý việc định tuyến của nó.
        ![](https://images.viblo.asia/0424d012-dfaf-4fcd-8020-4834676b6d76.png)
*  Microservice có thể tiêu thụ nhiều tài nguyên hơn so với một ứng dụng nguyên khối. Mặc dù một trong những ưu điểm mà tôi đã đề cập là khả năng mở rộng và tài nguyên có thể được sử dụng tốt hơn và hiệu quả hơn, tất cả các thành phần sẽ cần instances riêng và container riêng của nó, điều này có khả năng dẫn đến việc sử dụng nhiều hơn trong bộ nhớ và CPU.   

## Các công cụ có thể giúp bạn với microservices 
### 1.  Kubernetes 
Kubernetes là một nền tảng điều phối container cho phép bạn triển khai, mở rộng quy mô và quản lý tất cả các container của bạn. Nó cho phép bạn tự động hóa việc phát triển của các microservices được đóng gói của bạn. Điều này làm dễ dàng hơn để quản lý tất cả các components và microservices trong ứng dụng của bạn. Bạn sẽ muốn học Docker để chứa các microservices của mình. IBM cung cấp một dịch vụ công khai với [ IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) để quản lý cluster cho bạn. 

### 2.  Istio 
Istio giải quyết một số nhược điểm trong microservice. Istio là một lưới dịch vụ giúp bạn quản lý các microservices của mình. Istio có thể được cài đặt trên Kubernetes, nơi nó có thể giúp bạn truy tìm và giám sát các microservices của bạn. Điều này cũng có thể giúp bạn nhanh chóng theo dõi các errors và bugs trong ứng dụng của bạn nếu có. Istio cũng có thể quản lý lưu lượng của các microservices của bạn ví dụ như quản lý và kiểm soát luồng. Các routes của bạn có thể dễ dàng được cấu hình. Istio cũng cung cấp tính bảo mật trong các microservices ví dụ như có TLS chung hoặc giới hạn quyền truy cập với các dịch vụ bên ngoài. Bạn cũng có thể cài đặt [Istio](https://console.bluemix.net/docs/containers/cs_tutorials_istio.html#istio_tutorial) lên IBM Cloud Kubernetes Service. 

## Kết luận 
Sử dụng nền tảng điều phối container là điều bắt buộc trong việc xây dựng ứng dụng của bạn với microservice. Kubernetes là một trong những lựa chọn phổ biến của các developer vì nó nhanh chóng đưa ứng dụng của họ từ development sang production. Và, thậm chí tốt hơn, nó là open source.

Đối với các developer đang bắt đầu xây dựng các ứng dụng của họ, họ nên quyết định xem việc sử dụng [kiến trúc microservice](https://www.ibm.com/cloud/garage/architectures/microservices) có tốt hơn là kiến trúc nguyên khối hay không . Họ nên xem xét khả năng sử dụng lâu dài và khả năng mở rộng của ứng dụng của họ. Thật tốt để bắt đầu với một kiến trúc nguyên khối, nhưng một khi ứng dụng tăng kích thước, sẽ khó khăn hơn để phân tách chúng thành các dịch vụ siêu nhỏ. Trong trường hợp đó, sẽ có lợi hơn khi bắt đầu với microservice trong giai đoạn phát triển sớm. Đối với các ứng dụng nguyên khối hiện có, các developers nên xem xét cách thức và thành phần nào họ sẽ tách rời trong ứng dụng của họ. 

Mặc dù có những hạn chế, microservice tiếp tục phổ biến với các developers và doanh nghiệp vì nó mang lại những lợi ích tuyệt vời cho các ứng dụng và nhu cầu của người dùng. Với tính linh hoạt của nó, các developers và doanh nghiệp có thể đạt được sự phát triển hoặc updates nhanh chóng trong ứng dụng của họ khi họ sở hữu mức độ các microservices phù hợp.

Trên đây là phần giới thiệu về microservices được mình tham khảo và sử dụng từ nguồn : https://developer.ibm.com/articles/why-should-we-use-microservices-and-containers/?fbclid=IwAR2EeHXvzYkVU2KUCNpZcBk57CelJQwEbXQxhNu0Jyh_MnCq4fVyVkK6T8M

Hy vọng bài viết sẽ giúp bạn có cái nhìn tổng quan và hiểu hơn về kiến trúc Microservices, cũng như dựa vào ưu nhược điểm của nó mà có thể áp dụng với những trường hợp cụ thể trong thực tế.