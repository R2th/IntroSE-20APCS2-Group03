## Container là gì?
Trước đây, mô hình của một máy chủ thường là tập hợp của 3 yếu tố chính đó là:
- Máy chủ vật lý (physical server)
- Hệ điều hành (operating system)
- Ứng dụng (application)

Vấn đề gặp phải ở đây là một máy chủ chỉ cài được duy nhất một hệ điều hành, một ứng dụng, từ đó không sử dụng triệt để được hết sức mạnh phần cứng đem lại.

Sau đó một khoảng thời gian, công nghệ ảo hóa **containerization** xuất hiện, giúp tạo ra nhiều máy chủ con ảo từ một máy chủ vật lý, dùng chung phần nhân kernel và tài nguyên của máy chủ từ đó không những tối ưu được về hiệu suất của phần cứng mà còn tiết kiệm được thời gian quản trị.

![](https://images.viblo.asia/2a918122-e8fb-41e2-a5de-ff3bfeae9ffc.jpg)



**Container** là đơn vị phần mềm cung cấp cơ chế đóng gói ứng dụng, mã nguồn, thiết lập, thư viện… vào một đối tượng duy nhất. Ứng dụng sau khi được đóng gói có thể hoạt động một cách nhanh chóng và hiệu quả trên các môi trường điện toán khác nhau. Từ đó nó có thể tạo ra một môi trường hoàn hảo nơi mà có mọi thứ để chương trình có thể hoạt động được, không chịu sự tác động từ môi trường của hệ thống cũng như không làm ảnh hưởng ngược lại về phía hệ thống chứa nó.

Để tạo ra container phải kể đến 2 tính năng có trong nhân Linux đó là:
- *Namespace*: có nhiệm vụ cô lập các tài nguyên của hệ thống, khiến các tiến trình "nhìn thấy" tập tài nguyên khác nhau.
- *Control groups (cgroups)*: giới hạn tài nguyên của mỗi ứng dụng, cho phép Docker Engine điều phối lượng tài nguyên phần cứng của mỗi ứng dụng, thiết lập các ràng buộc.

Các tiến trình (process) trong một container sẽ cô lập với tiến trình của các container khác trong cùng một hệ thống. Tuy nhiên, tất cả các container này đều chia sẻ kernel của host OS.

**Ưu điểm:**

- *Linh động*: Dễ dàng triển khai ở nhiều môi trường khác nhau do loại bỏ được sự phụ thuộc của ứng dụng vào tầng OS cũng như cơ sở hạ tầng.
- *Tiết kiệm không gian*: container được xây dựng dựa trên nhiều image có sẵn, từ đó tiết kiệm được nhiều không gian lưu trữ hơn.
- *Đồng nhất*: không có sự sai khác về mặt môi trường khi triển khai ở bất kỳ nơi đâu, tạo ra sự nhất quán khi làm việc theo nhóm.
- *Nhanh*: do chia sẻ host OS nên các container có thể gần như được tạo một cách tức thì, việc khởi động cũng diễn ra nhanh hơn rất nhiều.

## Container vs Virtual Machine
Trong thời gian đầu, mô hình máy chủ thường là một máy chủ vật lý, một hệ điều hành và chạy một ứng dụng.

![](https://images.viblo.asia/dbd26ca7-31c4-443d-ba1c-e352bc7ba441.png)


Tuy nhiên về sau này, năng lực của phần cứng không ngừng tăng lên thì mô hình này sẽ sinh ra vấn đề là lãng phí tài nguyên khi mà hệ thống không thể sử dụng được hết lợi thế về mặt tài nguyên. Ngoài ra, còn có khó khăn trong việc mở rộng hệ thống (muốn mở rộng thì phải thuê thêm server, cấu hình, …). Và từ đó, công nghệ ảo hóa (virtualization) được ra đời.

Virtualization (ảo hóa) là một công nghệ được thiết kế để tạo ra một tầng trung gian giữa phần cứng máy tính và phần mềm chạy trên nó. Ảo hóa được xây dựng dựa trên ý tưởng phân chia ổ đĩa, chúng phân chia máy chủ gốc thành nhiều máy chủ logic. Từ đó, một máy chủ vật lý đơn lả có thể tạo thành nhiều máy ảo chạy độc lập, riêng rẽ với nhau. Các máy ảo đó có thể có hệ điều hành riêng, ứng dụng riêng, độc lập với các máy ảo khác.

![](https://images.viblo.asia/2c96bdb9-e9b9-434b-9c0a-874b927d3f48.png)

Sự ra đời của ảo hóa giúp cho một máy tính có thể chia ra thành nhiều máy ảo, từ đó tạo ra được nhiều môi trường khác nhau để chạy được nhiều ứng dụng. Vì vậy, năng suất của phần cứng được đẩy lên cao hơn, tận dụng được nhiều hơn. Tuy nhiên, việc ảo hóa này cũng nảy sinh ra nhiều vấn đề mới:

- **Ngốn tài nguyên**: Khi chạy một máy ảo, nó sẽ luôn chiếm một phần tài nguyên nhất định. Giả sử bạn có một máy chủ vật lý có *512GB SSD*, *16GB RAM*. Nếu tạo ra 2 máy ảo, mỗi máy cấp *128GB SSD* và *4GB RAM* thì máy chủ vật lý đã mất đi *256GB SSD* và *8GB RAM* mặc dù chỉ bật máy ảo lên và không sử dụng gì cả.

- **Tốn thời gian thực thi**: thời gian khởi động, restart, shutdown của các máy ảo cũng khá lâu, thường là vài phút.

- **Cồng kềnh**: server sẽ không thể chạy được hết hiệu suất khi mà phải chịu tải cho cả nhóm máy ảo, đồng thời cũng khó cho việc quản lý, mở rộng.

Để giải quyết các vấn đề trên, người ta đã phát minh ra **Container**.

![](https://images.viblo.asia/ab7cde5f-08b1-4879-89c3-a474e54012f2.png)

Như đã để cập ở phần trước, với công nghệ này, một máy chủ vật lý có thể sinh ra và chạy nhiều container tương tự như VM. Tuy nhiên, điểm đặc biệt ở đây là các container có thể dùng chung kernel và chia sẻ tài nguyên của máy chủ vật lý với nhau (CPU, RAM, …) Vì thế tài nguyên sẽ được sử dụng hợp lý và linh động hơn, không bị gò bó trong một khoảng như VM.

Ngoài ra, việc container được chia ra thành nhiều layer khác nhau cũng khiến cho việc quản lý tài nguyên được hiệu quả hơn.

Cụ thể, container mới sẽ được xây dựng dựa trên các image layer dạng read-only. Trong mỗi container sẽ có thêm một layer với quyền read-write, mọi thay đổi của container sẽ chỉ được ghi vào đây. Như vậy, chỉ từ một vài image ban đầu chúng ta có thể tạo ra nhiều container khác nhau từ đó tiết kiệm được một phần không gian lưu trữ. 

![](https://images.viblo.asia/9b134568-cc60-4d94-8874-a5e9b126e0b2.png)

Đối với Virtual Machine, dung lượng mà hệ điều hành với các ứng dụng phụ thuộc sử dụng cũng không phải nhỏ.


## Sự ra đời của Docker

![](https://images.viblo.asia/f17e5b92-3cb6-4d85-a0d9-323c8bca7b47.png)

Docker là một nền tảng nguồn mở cung cấp cho người sử dụng những công cụ để có thể đóng gói, vận chuyển và chạy container một cách đơn giản và dễ dàng trên các nền tảng khác nhau một cách nhanh nhất với tiêu chí - “Build once, run anywhere”.
Docker thực hiện ảo hóa ở mức hệ điều hành. Mỗi container là cô lập (isolated) với nhau nhưng đều dùng chung một số bin/lib và kernel của Host OS.
Docker có thể làm việc trên nhiều nền tảng khác nhau như Linux, Microsoft Windows và Apple OS X. Ngoài ra, Docker còn hỗ trợ nhiều dịch vụ điện toán đám mây nổi tiếng như Microsoft Azure hay Amazon Web Services.


## Các thuật ngữ thường gặp trong Docker

**Docker Image**

Một Docker Image là một read-only template dùng để tạo ra các containers. Image được cấu tạo theo dạng layer và tất cả các layer đều là read-only. Một image có thể được tạo ra dựa trên một image khác với một số tùy chỉnh bổ sung.
Nói ngắn gọn, Docker Image là nơi lưu trữ các cài đặt môi trường như OS, package, phần mềm cần chạy, …
    
Nếu nhìn nhận theo lập trình hướng đối tượng thì Docker Image giống như một class chứa các phương thức và thuộc tính, còn các containers là các thực thể (instance/object) của các class đó. Vì vậy từ 1 image chúng ta có thể tạo ra nhiều containers với môi trường bên trong giống hệt nhau.

**Dockerfile**

Dockerfile là một file dạng text không có phần đuôi mở rộng, chứa các đặc tả về một trường thực thi phần mềm, cấu trúc cho Docker image. Từ những câu lệnh đó, Docker sẽ build ra Docker image (thường có dung lượng nhỏ từ vài MB đến lớn vài GB).

**Docker Container**

Docker Container được tạo ra từ Docker Image, là nơi chứa mọi thứ cần thiết để có thể chạy ứng dụng. Là ảo hóa nhưng Container lại rất nhẹ, có thể coi như là một process của hệ thống. Chỉ mất vài giây để start, stop hoặc restart một Container. Với một máy chủ vật lý, thay vì chạy được vài cái máy ảo truyền thống thì ta có thể chạy vài chục, thậm chí vài trăm cái Docker Container.

Các trạng thái có thể có: run, started, stopped, moved và deleted.

Ví dụ, container có thể chứa môi trường:
-  OS: Ubuntu 18.04
-  Package: cài sẵn git, curl, vim, nano, …
- Cài ứng dụng cần thực thi

**Docker Network**

Docker network có nhiệm vụ cung cấp private network (VLAN) để các container trên một host có thể liên lạc được với nhau, hoặc các container trên nhiều hosts có thể liên lạc được với nhau (multi-host networking).

**Docker Volume**

Docker volume là cơ chế tạo và sử dụng dữ liệu của docker, có nhiệm vụ lưu trữ dữ liệu độc lập với vòng đời của container.

Có 3 trường hợp sử dụng Docker Volume:
- Giữ lại dữ liệu khi một Container bị xóa.
- Để chia sẻ dữ liệu giữa máy chủ vật lý và Docker Container.
- Chia sẻ dữ liệu giữa các Docker Container.

**Docker Compose**

Docker compose là công cụ dùng để định nghĩa và run multi-container cho Docker application. Với compose bạn sử dụng file YAML để config các services cho application của bạn. Sau đó dùng command để create và run từ những config đó.

Sử dụng cũng khá đơn giản chỉ với ba bước:
- Khai báo app’s environment trong Dockerfile.
- Khai báo các services cần thiết để chạy application trong file docker-compose.yml.
- Run docker-compose up để start và run app.

**Docker Hub**

![](https://images.viblo.asia/666442ed-c0e5-46f8-83c4-a337038c92c5.png)

Nếu bạn là developer thì chắc hẳn bạn đã quen với công cụ github dùng để upload code của mình lên đó, hiểu đơn giản thì Docker hub cũng tương tự như github nhưng dành cho DockerFile, Docker Images. Ở đây có những DockerFile, Images của người dùng cũng như những bản chính thức từ các nhà phát triển lớn như Google, Oracle, Microsoft, … Ngoài ra còn có Docker Hub cho phép quản lý các image với những câu lệnh giống như Github như push, pull... để bạn có thể quản lý dễ dàng image của mình.

## Kiến trúc của Docker

Docker là một ứng dụng client-server, có 2 phiên bản phổ biến:
- **Docker Community Edition (CE)**: là phiên bản miễn phí và chủ yếu dựa vào các sản phẩm nguồn mở khác.
- **Docker Enterprise (EE)**: phiên bản dành cho các doanh nghiệp, khi sử dụng phiên bản này sẽ nhận được sự support của nhà phát hành, ngoài ra còn có thêm các tính năng quản lý và bảo mật.

![](https://images.viblo.asia/7abfd20a-3ea5-4871-b7cb-81fe95636a53.png)

Các thành phần của **Docker Engine** gồm có:

- **Docker Deamon**: chạy trên host, đóng vai trò là server, nhận các RESTful request từ Docker Client và thực thi nó. Là một lightweight runtime giúp build, run và quản lý các containers và các thành phần liên quan khác.

Docker Deamon quản lý 4 đối tượng chính: image, container, network, volume.

- **Docker Client (CLI)**: cung cấp giao diện dòng lệnh (command line) cho người sử dụng, đồng thời cũng gửi request đến Docker deamon.

![](https://images.viblo.asia/bd07ffdc-0c4b-4e0f-af1b-6c7f68a18490.png)
Sơ đồ minh họa các lệnh phổ biến của Docker client và mối quan hệ của Image, Container, Network, Volume.

- **Docker Registry**: nơi lưu trữ Docker image. Docker Hub là một registry công khai mà bất cứ ai cũng có thể sử dụng và Docker được cấu hình để tìm kiếm image trên Docker Hub theo mặc định. Bạn thậm chí có thể chạy registry riêng của mình. Có hai loại registry là public hoặc private registry.


.. còn tiếp ..

## Nguồn tham khảo
https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0
https://medium.com/@moneerrifai/from-physical-servers-to-vms-to-docker-containers-whats-next-moneer-rifai-27bc6c77179f
https://vmarena.com/docker-architecture-and-components/