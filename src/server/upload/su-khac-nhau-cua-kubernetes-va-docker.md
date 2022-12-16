“Kubernetes và Docker” là cụm từ mà bạn nghe thấy ngày càng nhiều hơn ngày nay khi Kubernetes trở nên phổ biến hơn bao giờ hết như một giải pháp điều phối container.

Tuy nhiên, “Kubernetes và Docker” cũng là một cụm từ hơi gây hiểu lầm. Khi bạn phân tích nó, những từ này không có nghĩa giống như nghĩa mà nhiều người nghĩ tới, vì Docker và Kubernetes không phải là đối thủ cạnh tranh trực tiếp. Docker là một nền tảng container hóa và Kubernetes là một bộ điều phối container cho các nền tảng container như Docker.

Bài viết này nhằm mục đích làm sáng tỏ một số nhầm lẫn phổ biến xung quanh Kubernetes và Docker, đồng thời giải thích ý nghĩa thực sự khi mọi người nói về "[Docker](https://www.sumologic.com/insight/what-is-docker/) và [Kubernetes](https://www.sumologic.com/insight/what-is-kubernetes/)”.

## Kubernetes và Docker - Sự trỗi dậy của công nghệ container hoá và Docker 

Không thể nói về Docker mà không đề cập đến containers đầu tiên. Container giải quyết một vấn đề quan trọng trong vòng đời phát triển ứng dụng. Khi các nhà phát triển đang code, thì họ làm việc trên môi trường phát triển cục bộ của riêng họ. Khi họ sẵn sàng chuyển code đó sang môi trường production thì đây là lúc các vấn đề mới phát sinh. Code hoạt động hoàn hảo trên máy của họ nhưng không hoạt động trong môi trường production. Có nhiều lý do cho vấn đề này, có thể là hệ điều hành khác nhau, các dependencies khác nhau, thư viện khác nhau.

Các container đã giải quyết được các vấn đề này bằng cách cho phép bạn tách code khỏi cơ sở hạ tầng - infrastructure - cơ bản mà nó đang chạy. Các nhà phát triển có thể đóng gói ứng dụng của họ, bao gồm tất cả các bins và thư viện mà nó cần, thành một image containter nhỏ. Trên môi trường production, container có thể được chạy trên bất kỳ máy tính nào có nền tảng containerization.

Container có khả năng di chuyển và mở rộng linh hoạt 

![](https://images.viblo.asia/8296eae8-576b-4e48-b6b1-3da0f2d6e72c.png)

## Kubernetes và Docker: Các ưu điểm của Containers

Ngoài việc giải quyết thách thức lớn về tính di động, container và nền tảng container cung cấp nhiều lợi thế so với công nghệ ảo hóa (virtualization) truyền thống.

Các containers có kích thước cực kỳ nhỏ. Container chỉ cần chứa các ứng dụng của nó và bộ cài đặt về tất cả các bins và thư viện mà nó yêu cầu để chạy. Không giống như các máy ảo là mỗi máy đều có một bản sao hoàn chỉnh của hệ điều hành khách, việc cô lập container được thực hiện ở tầng kernel mà không cần đến hệ điều hành khách. Ngoài ra, các thư viện có thể được chia sẻ với các containers, do đó, nó loại bỏ việc phải tạo 10 bản sao cho cùng một thư viện trên một máy chủ, giúp tiết kiệm không gian hơn nữa. Nếu tôi có 3 ứng dụng đều chạy node và express, thì tôi không cần phải có 3 phiên bản node và express, các ứng dụng đó có thể chia sẻ các bins và thư viện. Việc cho phép các ứng dụng được đóng gói trong môi trường độc lập cho phép deploy nhanh hơn, giống với các môi trường phát triển và khả năng mở rộng vô hạn.

## Docker là gì?

Docker hiện là nền tảng container phổ biến nhất. Docker xuất hiện trên thị trường vào đúng thời điểm và ngay từ đầu đã là mã nguồn mở , điều này làm cho nó vươn lên vị trí thống trị thị trường hiện nay. 30% doanh nghiệp hiện đang sử dụng Docker trong môi trường AWS của họ và con số đó tiếp tục tăng lên.


![Tỉ lệ sử dụng Docker trong AWS](https://images.viblo.asia/a1651a33-4056-4805-91b7-f45da82155cb.png)

### Docker được dùng để làm gì?

Khi hầu hết mọi người nói về Docker, họ đang nói về Docker Engine, môi trường thực thi (runtime) cho phép bạn build và chạy các containers. Nhưng trước khi bạn có thể chạy một container Docker, chúng phải được build và định nghĩa từ một Docker File. Docker File xác định mọi thứ cần thiết để chạy image bao gồm thông số kỹ thuật cho OS network và vị trí các file. Bây giờ bạn đã có một Docker file, bạn có thể build một image Docker, đó là thành phần tĩnh, có thể vận chuyển được và được chạy trên Docker Engine. Và Docker thậm chí còn có một dịch vụ gọi là Docker Hub, nơi bạn có thể lưu trữ và chia sẻ các image.

## Docker và Kubernetes: Sự cần thiết các hệ thống điều phối 

Trong khi Docker cung cấp một tiêu chuẩn mở để đóng gói và phân phối các ứng dụng container, thì đã nảy sinh một vấn đề mới. Làm thế nào để tất cả các containers này được điều phối và lên lịch? Làm cách nào để bạn nâng cấp ứng dụng một cách liền mạch mà không bị gián đoạn dịch vụ? Làm cách nào để bạn theo dõi tình trạng của ứng dụng, biết khi nào có sự cố và khởi động lại ứng dụng đó một cách kịp thời?

![Vòng đời một ứng dụng](https://images.viblo.asia/191ebc78-500b-418e-89db-fc1711edee63.png)

Các giải pháp cho việc sắp xếp các container đã sớm xuất hiện. Kubernetes, Mesos và Docker Swarm là một số giải pháp phổ biến để cung cấp một cách trừu tượng cách để tạo ra một cụm các máy hoạt động giống như một cỗ máy lớn, điều này rất quan trọng trong một môi trường có quy mô lớn.

Sự thật là các containers không dễ quản lý trong môi trường production. Các container cần có hệ thống điều phối.

Vậy hệ thống điều phối cần làm những công việc gì? 

* Xử lý đồng thời một lượng lớn containers và người dùng. Một ứng dụng có thể có hàng nghìn containers và người dùng tương tác với nhau cùng một lúc, việc quản lý và theo dõi các tương tác này đòi hỏi một hệ thống tổng thể toàn diện được thiết kế đặc biệt cho mục đích đó.
* Quản lý việc monitor service và giao tiếp giữa container và người dùng. Làm cách nào để người dùng tìm thấy container và giữ liên lạc với container đó? Việc cung cấp cho từng microservice các chức năng tích hợp riêng để theo dõi dịch vụ sẽ lặp đi lặp lại và có thể không hiệu quả; trong thực tế, nó có thể làm giảm hiệu năng, có thể tới mức không thể chấp nhận được hoặc gây tắc nghẽn trên quy mô lớn.
* Cân bằng tải hiệu quả. Trong một môi trường đặc biệt, không được điều phối, tải cho container có thể chủ yếu dựa vào yêu cầu của người dùng tại thời điểm này, điều này có thể dẫn đến tải không cân bằng  ở cấp máy chủ, phân bổ không hiệu quả và làm hạn chế tính sẵn sàng của các container và tài nguyên hệ thống. Cân bằng tải giúp khắc phục vấn đề này bằng đưa ra thứ tự và phân bổ tài nguyên hiệu quả.
* Xác thực và bảo mật. Hệ thống điều phối như Kubernetes giúp dễ dàng xử lý xác thực và bảo mật ở cấp cơ sở hạ tầng (infrastructure) (thay vì ứng dụng) và áp dụng các chính sách nhất quán trên tất cả các nền tảng.
* Deploy đa nền tảng. Bộ điều phối giúp quản lý các nhiệm vụ phức tạp khác như điều phối hoạt động container, tính khả dụng của microservice và đồng bộ hóa trong môi trường đa nền tảng, đa đám mây.

Hệ thống điều phối đóng vai trò là cơ sở hạ tầng động, toàn diện cho ứng dụng dựa trên container, cho phép ứng dụng này hoạt động trong môi trường được bảo vệ, có tổ chức cao, đồng thời quản lý các tương tác của nó với thế giới bên ngoài.

Kubernetes rất phù hợp cho nhiệm vụ này và là một trong những lý do khiến nó trở nên phổ biến.

### Kubernetes và Docker Swarm

Khi hầu hết mọi người nói về “Kubernetes và Docker”, ý của họ thực sự là “Kubernetes và Docker Swarm”. Về sau, Docker đã tự xây dựng giải pháp cluster cho các container Docker, và lợi thế là được tích hợp chặt chẽ vào hệ sinh thái của Docker và sử dụng API của riêng nó. Giống như hầu hết các bộ lập lịch, Docker Swarm cung cấp cách quản lý một số lượng lớn các container trải rộng trên các cụm máy chủ. Hệ thống lọc và lập lịch của nó cho phép lựa chọn các node tối ưu trong một cụm để deploy các container.

### Kubernetes được dùng để làm gì?

Kubernetes là bộ điều phối container được phát triển tại Google, đã được tài trợ cho CNCF và hiện là mã nguồn mở. Nó có lợi thế là được xây dựng dựa theo nhiều năm kinh nghiệm của Google về quản lý container. Đây là một hệ thống toàn diện để tự động hóa việc triển khai, lập lịch và mở rộng quy mô của các ứng dụng được container hóa, đồng thời hỗ trợ nhiều công cụ container hóa như Docker.

Hiện tại, Kubernetes là công ty dẫn đầu thị trường và là tiêu chuẩn cho các bộ điều phối container và deploy các ứng dụng phân tán. Kubernetes có thể chạy được trên các dịch vụ đám mây hoặc tại chỗ (on-premise), có tính mô-đun cao, mã nguồn mở và có một cộng đồng sôi động. Các công ty với mọi quy mô đang đầu tư vào nó và nhiều nhà cung cấp dịch vụ đám mây cũng đã cung cấp Kubernetes như một service.

## Kubernetes hoạt động như thế nào?

Kubernetes hiện giờ được xây dựng khá đơn giản. Cheryl Hung của CNCF mô tả Kubernetes như một vòng điều khiển. Chỉ cần bạn khai báo cách hệ thống của mình trông như thế nào (3 bản sao của container image a và 2 bản sao của container image b) thì Kubernetes sẽ biến điều đó thành hiện thực. Kubernetes sẽ so sánh trạng thái mong muốn với trạng thái thực tế và nếu không giống nhau, thì sẽ cần phải thực hiện một vài bước để sửa lại.

![Kubernetes như một vòng lặp điều khiển](https://images.viblo.asia/19ce5c8c-57b4-4639-906f-9cd1758174da.png)

## Các thành phần và kiến trúc của Kubernetes

Kubernetes được tạo thành từ nhiều thành phần không liên quan đến nhau. Các thành phần đều được giao tiếp với nhau thông qua các API server. Mỗi thành phần này đảm nhận chức năng riêng của nó và sau đó hiển thị các số liệu mà từ đó ta có thể thu thập để theo dõi. Chúng ta có thể chia nhỏ các thành phần thành ba phần:

1. Bộ điều khiển - The Master.
2. Node - Nơi các pods được lên lịch.
3. Pods - Chứa các containers.

![](https://images.viblo.asia/92b6ac39-b621-4df5-84ab-14cee30d1dfd.png)

### Bộ điều khiển - Master node 

Bộ điều khiển là thành phần điều khiển toàn bộ hệ thống. Kubernetes là một nền tảng điều phối và bộ điều khiển tạo điều kiện thuận lợi cho việc điều phối đó. Có nhiều thành phần trong bộ điều khiển đó. Etcd để lưu trữ, máy chủ API để giao tiếp giữa các thành phần, bộ lập lịch quyết định nodes pods nào nên chạy và trình quản lý bộ điều khiển chịu trách nhiệm kiểm tra trạng thái hiện tại so với trạng thái mong muốn.

### Nodes

Các node tạo nên sức mạnh tính toán cho cụm Kubernetes cluster. Đây là nơi các container thực sự được deploy để chạy. Nodes là cơ sở hạ tầng vật lý mà ứng dụng của bạn chạy trên đó, máy chủ của các máy ảo trong môi trường của bạn.

### Pods

Các pods là tài nguyên cấp thấp nhất trong Kubernetes cluster. Một pod được tạo thành từ một hoặc nhiều containers, nhưng thông thường chỉ là một containers. Khi bạn xác định cluster, các limits được cài đặt cho các pods để định nghĩa các tài nguyên, CPU và bộ nhớ mà pod cần để chạy. Bộ lập lịch sử dụng các định nghĩa này để quyết định xem các node nào sẽ đặt cho các pod nào. Nếu có nhiều hơn một container trong một pod thì sẽ rất khó để ước tính các tài nguyên cần thiết và bộ lập lịch sẽ không thể lên lịch chính xác cho các pod được.

## Mối quan hệ giữa Docker và Kubernetes

Kubernetes và Docker đều là các giải pháp toàn diện để quản lý các ứng dụng containter hoá và cung cấp các khả năng mạnh mẽ, nhưng cũng từ đó cũng phát sinh một số nhầm lẫn. “Kubernetes” đôi khi được sử dụng như một cách viết tắt cho toàn bộ môi trường container dựa trên Kubernetes. Trên thực tế, chúng không được so sánh trực tiếp, dù có nguồn gốc khác nhau và giải quyết cho những vấn đề khác nhau.

Docker là một nền tảng và công cụ để xây dựng, phân phối và chạy các Docker container. Nó cung cấp công cụ cluster riêng và có thể được sử dụng để sắp xếp và lập lịch các container trên các cụm máy. Kubernetes là một hệ thống điều phối container cho các Docker container, mở rộng hơn so với Docker Swarm, nghĩa là để điều phối các cụm node trên môi trường production một cách hiệu quả. Nó hoạt động quanh khái niệm pod, đó là các đơn vị lập lịch (và có thể chứa một hoặc nhiều container) trong hệ sinh thái Kubernetes và chúng được phân phối giữa các node để cung cấp tính khả dụng cao. Người ta có thể dễ dàng chạy một bản dựng Docker trên một cụm Kubernetes, nhưng bản thân Kubernetes không phải là một giải pháp hoàn chỉnh và có nghĩa là cần các plugin tùy chỉnh.

Kubernetes và Docker đều là những công nghệ khác nhau nhưng  về cơ bản chúng hoạt động rất tốt cùng nhau và cả hai đều tạo điều kiện thuận lợi cho việc quản lý và triển khai các container trong một kiến  trúc phân tán.

## Sự khác nhau giữa Docker và Kubernetes

Việc so sánh Kubernetes và Docker khá phổ biến, tuy nhiên, việc so sánh Kubernetes và Docker Swarm sẽ mang lại nhiều ý nghĩa hơn.

Docker Swarm là công nghệ điều phối tương tự như Kubernetes. Docker Swarm được tích hợp chặt chẽ trong hệ sinh thái Docker và tập trung vào việc nhóm các Docker container.

Một điểm khác biệt chính giữa Docker và Kubernetes là Docker chạy trên một node duy nhất, trong khi Kubernetes được thiết kế để chạy trên một cụm - cluster.

Một sự khác biệt khác giữa Kubernetes và Docker là Docker có thể được sử dụng mà không cần Kubernetes, trong khi Kubernetes cần môi trường container thời gian thực để tổ chức.

Kể từ lần phát hành đầu tiên vào năm 2015, Kubernetes đã được chấp nhận rộng rãi và hiện nay đã trở thành tiêu chuẩn cho việc điều phối và quản lý container. Kubernetes cung cấp một nền tảng cấp cơ sở hạ tầng để sắp xếp các container trên quy mô lớn và để quản lý tương tác của người dùng với chúng.

Tương tự, Docker đã trở thành tiêu chuẩn để phát triển và triển khai container. Docker cung cấp một nền tảng để phát triển, triển khai và chạy các container ở cấp độ cơ bản. Đó là nền tảng mà Kubernetes  framework sử dụng.

## Có thể sử dụng Docker mà không có Kubernetes?

Docker thường được sử dụng mà không có Kubernetes, trên thực tế đây là tiêu chuẩn. Mặc dù Kubernetes mang lại nhiều lợi ích, nhưng nó cũng phức tạp và có nhiều trường hợp mà chi phí bỏ ra cho Kubernetes là không cần thiết.

Trong các môi trường phát triển, người ta thường sử dụng Docker mà không có bộ điều phối container như Kubernetes. Trong các môi trường production, lợi ích của việc sử dụng bộ điều phối container không lớn hơn chi phí của độ phức tạp. Ngoài ra, nhiều dịch vụ đám mây như AWS, GCP và Azure cung cấp một số khả năng điều phối, nhờ đó, chúng ta không cần quan tâm đến các vấn đề phức tạp khi sử dụng. 

## Có thể sử dụng Kubernetes mà không có Docker?

Vì Kubernetes là một bộ điều phối container, nó cần một môi trường container để tổ chức. Kubernetes được sử dụng phổ biến nhất với Docker, nhưng nó cũng có thể được sử dụng với bất kỳ môi trường container nào. VD, RunC, cri-o, là các môi trường container runtime mà bạn có thể triển khai với Kubernetes. Cloud Native Computing Foundation (CNCF) duy trì một danh sách các container runtimes được sử dụng cho hệ sinh thái của nó và tài liệu Kubernetes cung cấp hướng dẫn cụ thể để cài đặt bằng ContainerD và CRI-O.

## Kubernetes và Docker: Giải pháp nào bạn nên áp dụng?

### Docker không có Kubernetes

Docker tự nó sẽ tạo được các container image, quản lý chúng trong registry, chạy container và giao tiếp với chúng, đồng thời đặt chúng trong một ứng dụng đa container bằng Docker Compose. Vì vậy, Docker có phải là tất cả những gì bạn cần?

Khi nói đến sản xuất và quản lý container image và đưa các container vào sử dụng ở cấp độ runtime, phần lớn câu trả lời là "Có". Nó đã trở thành tiêu chuẩn công nghiệp để tạo ra các container.

Tuy nhiên, theo định nghĩa hiện tại, sứ mệnh của Docker là tập trung vào nhà phát triển, nó đã vượt ra ngoài các chức năng cốt lõi của nó. Nó không còn cố gắng cạnh tranh với Kubernetes và các công ty khác ở cấp độ infrastructure / điều phối.

### Kubernetes không có Docker

Kubernetes không bao gồm chức năng tạo hoặc quản lý container images và bản thân nó không chạy các containers; nó chỉ cần làm việc với các container bên ngoài và môi trường thực thi. Tuy nhiên, nó có khả năng sử dụng các containers từ nhiều nguồn khác nhau và nó tương thích với các môi trường runtime khác hơn là với dockerd, vì vậy nó vốn dĩ không phụ thuộc vào Docker.

Những gì Kubernetes cung cấp là một framework phong phú, linh hoạt và mạnh mẽ để xác định các ứng dụng và điều phối các container trên quy mô lớn. Nó được thiết kế tốt cho các nhiệm vụ cấp doanh nghiệp như tự động mở rộng quy mô, duy trì tính sẵn sàng cao và hoạt động trong môi trường đa nền tảng. Nó cũng có một cộng đồng người dùng và nhà phát triển lớn, với số lượng lớn các tiện ích bổ sung và công cụ hỗ trợ tương ứng.

### Kubernetes với Docker

Vậy thì sự lựa chọn tốt nhất là gì? Đó không phải là một câu hỏi mẹo. Câu trả lời là rõ ràng: cả hai.

Sự thật là mặc dù Kubernetes có thể sử dụng các nguồn và môi trường runtime containter khác, nhưng nó được thiết kế để hoạt động tốt với Docker và phần lớn tài liệu của Kubernetes được viết với Docker. Trường hợp sử dụng Kubernetes cơ bản nhất là Kubernetes + Docker và Kubernetes bao gồm các công cụ tập trung vào Docker như Kompose, công cụ này chuyển đổi các lệnh và cài đặt Docker Compose để Kubernetes có thể sử dụng chúng.

Về phần mình, Docker đã chấp nhận Kubernetes và trên thực tế, đã cung cấp các bản Kubernetes tích hợp của riêng mình. Việc bán Docker Enterprise cho Mirantis vào cuối năm 2019 (cùng với sự tập trung của Docker vào các công cụ hướng đến nhà phát triển) thậm chí còn nhấn mạnh rõ hơn sự phụ thuộc của Docker vào Kubernetes và các nhà cung cấp cơ sở hạ tầng container khác. Điều này được nhấn mạnh bởi ý định đã nêu của Mirantis là loại bỏ Docker Swarm và thiết lập Kubernetes làm công cụ điều phối mặc định cho Docker Enterprise.

Điểm mấu chốt là Kubernetes và Docker đều là tiêu chuẩn công nghiệp trong các lĩnh vực chuyên môn cốt lõi tương ứng của họ và cùng nhau cung cấp một nền tảng tích hợp tốt để quản lý, triển khai và điều phối container trên quy mô lớn. Nó chưa bao giờ thực sự là một câu hỏi Kubernetes hay Docker; nó luôn là Kubernetes và Docker, và ngày nay điều này thậm chí còn đúng hơn.

Tài liệu tham khảo:
[Kubernetes vs. Docker](https://www.sumologic.com/blog/kubernetes-vs-docker/)