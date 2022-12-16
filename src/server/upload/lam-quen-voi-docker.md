Trong thời đại cách mạng công nghiệp 4.0, thời đại phát triển như vũ bão về lĩnh vực công nghệ, đặc biệt là công nghệ thông tin, có vô số các công nghệ mới được sinh ra nhằm đáp ứng các nhu cầu của khách hàng và cả lập trình viên. Chính vì thế mà nhu cầu của con người ngày càng cao, ngày càng có nhiều phần mềm được ra đời, phục vụ nhu cầu của con người trong đời sống hàng ngày. Tuy nhiên, việc setup và deploy ứng dụng lên một hoặc nhiều server mất rất nhiều thời gian từ việc phải cài đặt các công cụ, môi trường cần cho ứng dụng đến việc chạy được ứng dụng, chưa kể việc không đồng nhất giữa các môi trường trên nhiều server khác nhau. Chính vì lý do đó Docker được ra đời để giải quyết vấn đề này.

Docker cho phép các nhà phát triển tách biệt ứng dụng của họ với môi trường, giải quyết vấn đề đau đầu: “It works on my machines - Ứng dụng hoạt động trên máy của tôi”. Đối với hàng triệu nhà phát triển ngày nay, Docker là tiêu chuẩn thực tế để xây dựng và chia sẻ các ứng dụng được chứa trong container.

Trong phạm vi bài viết này, mình sẽ trình bày về các khái niệm cơ bản và kiến trúc tổng quát của Docker.
# 1. Tổng quan về Docker
Docker là một nền tảng mở cho phát triển, vận chuyển và chạy ứng dụng, cho phép bạn tách các ứng dụng ra khỏi cơ sở hạ tầng của mình để có thể cung cấp phần mềm một cách nhanh chóng. Với Docker, bạn có thể quản lý cơ sở hạ tầng theo cùng cách quản lý ứng dụng của mình. Bằng cách tận dụng các phương pháp của Docker để vận chuyển, thử nghiệm và triển khai mã một cách nhanh chóng, bạn có thể làm giảm đáng kể sự chậm trễ giữa việc viết mã và chạy nó trong sản xuất. 

Docker cung cấp khả năng đóng gói và chạy một ứng dụng trong một môi trường tách biệt lỏng lẻo gọi là container. Nó giúp cách ly và bảo mật, cho phép bạn chạy nhiều containers đồng thời trên một máy chủ nhất định. Các container là lightweight và chúng không cần tải thêm của một hypervisor, chạy trực tiếp trên kernel của máy chủ. Điều này có nghĩa là bạn có thể chạy nhiều container hơn trên một kết hợp phần cứng nhất định hơn là nếu bạn đang sử dụng các máy ảo.

Về cơ bản, docker đóng gói một bộ file hệ thống (filesystem) hoàn chỉnh vào trong 1 container, trên container đó có thể thao tác và cài đặt mọi thư viện cần thiết để phát triển ứng dụng giống như một hệ điều hành thu nhỏ. Container này chạy trên filesystem độc lập với filesystem trên máy hiện tại (host computer), nên mọi thay đổi trên container không ảnh hưởng đến filesystem của host computer.

Ngoài ra do container có thể chạy giống nhau trên bất kỳ hệ điều hành nào và trên bất kỳ phần cứng nào nên developer hay sysadmin không cần quan tâm nhiều đến việc tạo môi trường để deploy ứng dụng, theo đúng “khẩu quyết” của docker là “build one, run anywhere”.
# 2. Lược sử của Docker
Mô hình trước đây thường là 1 máy chủ vật lý + 1 hệ điều hành (OS) + 1 ứng dụng:
![](https://lh3.googleusercontent.com/ssRCauBQ0Yn-KsC4dv7aX2MP06WVphujA50iU07XEqEVzm_Pn48DmDGI0SEMBDIt_Or4qr4Cmmeocjp46FheTW9Pb7m5cniD1ZOwBBXhDo37wE-CF6JeoMLfOJC3tlp5VV0XhuMi)

Khi ứng dụng phát triển lên, mô hình này sẽ nảy sinh các vấn đề lãng phí tài nguyên, khó khăn trong việc mở rộng hệ thống,.. Lúc này công nghệ ảo hóa Virtualization ra đời. Với công nghệ này, trên cùng 1 máy chủ vật lý có thể tạo ra nhiều hệ điều hành (OS), có nghĩa là ta có thể sử dụng được nhiều ứng dụng. Ưu điểm của nó là tận dụng được tốt hơn tài nguyên của máy tính, tránh được vấn đề lãng phí tài nguyên. Tuy nhiên, các vấn đề mới phát sinh mà các nhà phát triển phải đối mặt như:
![](https://lh3.googleusercontent.com/n92zJRBohd5WOK5r1JYi1LcRNXAek-iD7oey2CX-oQRwaWOjLVlCg9w6SNEq1Zcb_Ah460IC7nb8EmkQp6L88_NNyAH5UpYJMZtewT-Pmjrj-TUU8u6KwBbBL_VwRJXkrW48K-Oi)
* Thứ nhất, vấn đề ngốn tài nguyên khi chứa nhiều máy ảo trên một máy vật lý. Mỗi máy ảo sẽ chiếm một phần tài nguyên được cung cấp cứng - nghĩa là phần tài nguyên thực tế sẽ luôn phải cung cấp cho máy ảo mặc dù chưa thực hiện hành động nào trên đó). 
* Thứ hai là vấn đề về thời gian thực thi máy ảo: khởi động hoặc tắt máy ảo tốn một khoảng thời gian rất lâu. Và việc chạy nhiều máy ảo một lúc như vậy khiến tải của server phải xử lý rất cồng kềnh, không thể chạy hết hiệu suất được.

Vì thế, các nhà phát triển bắt đầu tìm kiếm một giải pháp tốt hơn, và Containerization ra đời. Công nghệ này sinh ra nhiều máy con trên một máy chủ (giống Virtualization), tuy nhiên nó không chiếm cứng một tài nguyên nhất định nào của máy chủ như Virtualization mà nó sử dụng máy chủ như một tài nguyên dùng chung (ví dụ như RAM). Vì thế mà tài nguyên được tận dụng tối ưu hơn.
![](https://lh4.googleusercontent.com/LFSQfoIySE5ZtkFuycYCuAkeO_ApticsCbiizCKLYZ6DvPkc47CBKxXZHWK1vqWFOSmwrfLU6taISqK-5J1qNIO0WS2qwx4n5yvpsjwWkfjxel1lP42JqmMl0gvryhh8WUm1zpy-)
Điểm nổi bật nhất của Containerization là sử dụng các container. Container là một giải pháp để chuyển giao phần mềm một cách đáng tin cậy giữa các môi trường máy tính khác nhau bằng cách:
* Tạo ra môi trường chứa mọi thứ mà phần mềm cần để có thể chạy được.
* Không bị các yếu tố liên quan đến môi trường hệ thống làm ảnh hưởng tới.
* Và không làm ảnh hưởng tới các phần còn lại của hệ thống.

Các ưu điểm nổi bật của container là: linh động - có thể triển khai ở bất cứ đâu; nhanh - do chia sẻ tài nguyên máy tính nên container có thể được tạo gần như tức thì; nhẹ - việc chia sẻ tài nguyên giúp các container có thể dùng chung các images nên không tốn quá nhiều bộ nhớ; đồng nhất - việc phát triển cùng một dự án sẽ không bị gặp vấn đề cài đặt sai môi trường; đóng gói - container gói tất cả mọi thứ (môi trường, app,..) để chạy được ứng dụng vào một cái thùng, giúp việc quản lý dễ dàng hơn.

Nhược điểm của container này chủ yếu về tính an toàn trong bảo mật vì các container dùng chung tài nguyên của máy chủ, do đó nếu máy chủ bị hack, tất cả các container bên trong sẽ bị ảnh hưởng.

Vậy Docker có mối liên hệ gì với các công nghệ trên? Docker là một dự án mã nguồn mở được phát triển dựa trên chính các đặc tính của container trong công nghệ Containerization. Cha đẻ của Docker là Solomon Hykes, ông bắt đầu tạo ra Docker khi làm việc ở Pháp, trong một dự án nội bộ của dotCloud, ban đầu có thêm sự đóng góp của các kỹ sư dotCloud. 

Docker được phát hành dạng mã nguồn mở trong tháng 3 năm 2013. Tới tháng 10 năm 2015, dự án Docker đã có hơn 25,600 sao trên GitHub (trở thành top 20 dự án có số sao cao nhất trên GitHub), có hơn 6,800 fork, và gần 1.100 lập trình viên tham gia đóng góp. Năm 2016, phân tích cho thấy các tổ chức sau có đóng góp chính cho việc phát triển Docker: nhóm Docker, Cisco, Google, Huawei, IBM, Microsoft, và Redhat.
# 3. Kiến trúc của hệ thống
Docker sử dụng kiến trúc máy khách - máy chủ. Docker client nói chuyện với Docker daemon, trình chạy nền này thực hiện công việc building, running, và phân phối các Docker containers của mình. Docker client và daemon có thể chạy trên cùng một hệ thống hoặc có thể kết nối docker client với docker daemon từ xa. Docker client và daemon giao tiếp bằng API REST, qua ổ cắm unix hoặc giao diện mạng. 
![](https://lh3.googleusercontent.com/bm-purwA1f88l-vAxUf9QiM_yno_fYl0f9HSlwdI8P_elxllCAeObKSaXtZFserJdxmshyWF7JQw80MGHy2MHp65XYBl2xI99boKTnMaSHkIxITfN0VBESM77j81ZdMa2CWIWKKZ)
## 4.1 Daemon Docker
Trong đa nhiệm máy tính hệ điều hành , một daemon là một chương trình máy tính mà chạy như một tiến trình nền, chứ không phải là dưới sự kiểm soát trực tiếp của một người sử dụng tương tác.

Daemon Docker (dockerd) lắng nghe các yêu cầu API Docker và quản lý các đối tượng Docker như hình ảnh, vùng chứa, mạng và khối lượng. Một daemon cũng có thể giao tiếp với các daemon khác để quản lý các dịch vụ Docker.
	
Dockerd là quá trình liên tục quản lý các vùng chứa. Docker sử dụng các tệp nhị phân khác nhau cho daemon và máy khách. Để chạy daemon, sử dụng lệnh dockerd. Để chạy daemon với đầu ra gỡ lỗi, sử dụng dockerd -D hoặc thêm "debug": true vào file daemon.json.

## 4.2 Docker client
Docker client (docker) là cách chính mà nhiều người dùng Docker tương tác với Docker. Khi bạn sử dụng các lệnh như docker run, máy khách sẽ gửi các lệnh này đến dockerd, nơi thực thi chúng. Lệnh docker sử dụng Docker API. Docker client có thể giao tiếp với nhiều hơn một daemon.
## 4.3 Docker registries
Một sổ đăng ký Docker lưu trữ các Docker images. Docker Hub là cơ quan đăng ký công khai mà bất kỳ ai cũng có thể sử dụng và Docker được định cấu hình để tìm kiếm images trên Docker Hub theo mặc định. Bạn thậm chí có thể chạy sổ đăng ký private của riêng mình.
	
Khi bạn sử dụng lệnh docker pull hoặc docker run, các images bắt buộc sẽ được lấy từ sổ đăng ký đã cấu hình của bạn. Khi bạn sử dụng lệnh docker push, images của bạn được đẩy vào sổ đăng ký đã định cấu hình của bạn.
## 4.4 Các đối tượng Docker
Khi bạn sử dụng Docker, bạn đang tạo và sử dụng images, containers, mạng, ổ đĩa, plugin và các đối tượng khác. Dưới đây là tổng quan về một số đối tượng trong Docker.
### 4.4.1 Images
Một image là một mẫu chỉ đọc (read only) với hướng dẫn để tạo ra một container Docker. Thông thường, một image dựa trên một image khác, với một số tùy chỉnh bổ sung. Ví dụ: bạn có thể xây dựng một image dựa trên image ubuntu, nhưng cài đặt máy chủ Web Apache và ứng dụng của bạn. cũng như các chi tiết cấu hình cần thiết để chạy ứng dụng của bạn. 

Bạn có thể tạo image của riêng mình hoặc có thể sử dụng những image do người khác tạo và xuất bản trong sổ đăng ký. Để xây dựng một image của mình, bạn tạo một Dockerfile với cú pháp đơn giản để xác định các bước cần thiết để tạo image và chạy nó. Mỗi lệnh trong Dockerfile tạo một lớp trong image. Khi bạn thay đổi Dockerfile và xây dựng lại image, chỉ những lớp thay đổi mới được xây dựng lại. Đây là một phần lý do khiến image trở nên nhẹ, nhỏ và nhanh, khi so sánh với các công nghệ ảo hóa khác.
### 4.4.2 Containers
Container là một thể hiện có thể chạy được của một image. Bạn có thể tạo (create), bắt đầu (start), dừng (stop), di chuyển (move), hoặc xóa (delete) một container bằng API Docker hoặc CLI. Bạn có thể kết nối một vùng chứa tới một hoặc nhiều mạng, đính kèm bộ nhớ vào nó hoặc thậm chí tạo image mới dựa trên trạng thái hiện tại của nó. Theo mặc định, một container được cách ly tương đối tốt với các container khác và máy chủ của nó. Bạn có thể kiểm soát mức độ cô lập của mạng, bộ nhớ hoặc các hệ thống con cơ bản khác của container với các container khác hoặc với máy chủ.
	
Container được xác định bởi image của nó cũng như bất kỳ tùy chọn cấu hình nào bạn cung cấp cho nó khi bạn khởi tạo hoặc khởi động nó. Khi một container bị xóa, mọi thay đổi đối với trạng thái của nó mà không được lưu trữ trong bộ nhớ liên tục sẽ biến mất. 
### 4.4.3 Services
Các Services cho phép ta có thể mở rộng các container trên nhiều daemon Docker, tất cả đều hoạt động cùng nhau như một nhóm với nhiều managers và workers. Mỗi thành viên của một nhóm là một daemon Docker và tất cả các daemon giao tiếp bằng API Docker. Một service cho phép bạn xác định trạng thái mong muốn, chẳng hạn như số lượng bản sao của service phải có sẵn tại mọi thời điểm. Theo mặc định, service được cân bằng tải trên tất cả các nút worker. Đối với người tiêu dùng, Docker service như là một ứng dụng duy nhất. Docker Engine hỗ trợ chế độ swarm (bầy đàn) từ Docker 1.12 trở lên.

# Tài liệu tham khảo
[1. Docker Overview, 2020.](https://docs.docker.com/get-started/overview/#docker-engine/)

[2. Dương Vũ: Docker và ứng dụng trong design microservice app, 2020.](http://en.sotatek.com/docker-ung-dung-trong-design-micro-service-app/)

[3. PGS.TS Trương Anh Hoàng: 9. Microservices. Vấn đề hiện đại Cao học, Trường đại học Công Nghệ - ĐHQG Hà Nội, 2017.](https://truonganhhoang.gitbooks.io/van-de-hien-dai-cao-hoc-2017/content/9microservices.html)

[4. Chia sẻ kiến thức IT: Docker Là Gì? Những Chuyện Bạn Chưa Biết Về Docker, 2019.](https://chiasekienthuc.net/docker-la-gi-nhung-chuyen-ban-chua-biet-ve-docker/)


Trên đây là kiến trúc và khái niệm cơ bản về docker mà mình tìm hiểu được, hi vọng sẽ giúp các bạn trong bước đầu làm quen với Docker :grin:. Chúc các bạn có một ngày làm việc hiệu quả :hugs: