Xin chào mọi người, tuần vừa qua là 1 tuần khá khổ sở khi mình và team trật vật config server cho việc testing, tất nhiên vấn đề ở đây chính là thằng **docker**. Nó khiến cho tuần đầu năm mới của mình khá sấp mặt. Cuối cùng mọi thứ cũng xong, tất nhiên ngoại trừ thằng *docker* thì còn cả tỉ mớ kiến thức về config server như *nginx, php-fpm, mysql, redis ...*. Tuy nhiên trong khuôn khổ bài viết mình chỉ đề cập đến **Docker**.

Do khá cay cú, mình đã tìm sách và thấy cuốn **Docker: Up and Running**. Mình sẽ cố gắng đọc nó trong vài tuần để hiểu qua chút về Docker để có ích hơn trong team của mình (tạ nặng gánh). Chương Intro không có gì nên mình sẽ dịch **phần 1 : Architecture** của  **chương 2: Docker at a Glance** (nôm na dịch là liếc qua tý về docker). Khuyến cáo là bài viết này dành cho những ai đã tìm hiểu và làm việc rồi với docker nhưng chưa rõ kiến trúc của nó (vì bài có nhiều thuật ngữ mình sẽ không giải thích, mọi người có thể xem ở bài viết tiếp theo).
# Architecture
Docker là 1 công nghệ cực kỳ mạnh mẽ, và điều này thường có nghĩa là một thứ gì đó đi kèm độ phức tạp cực kỳ cao. Nhưng nền tảng kiến trúc của Docker thì chỉ  là dạng Client/Server đơn giản, cùng với duy nhất 1 cách thực thi là hoạt động giống như cả 1 khối, dựa vào cách bạn gọi docker command. Ta sẽ đi vào cách mà client và server hoạt động và giới thiệu về lớp network (mạng) hoạt động bên dưới Docker container.
## 1. Client/Server Model.
Docker bao gồm ít nhất 2 phần: client và server. 
![](https://images.viblo.asia/f8fad86a-c0ae-4e12-a20e-b363e15a3330.png)

Thông thường nó gồm 3 thành phần là: Docker Registry (nơi lưu trữ Docker images và metadata về đống images đó). Server làm nhiệm vụ chạy và quản lý các container và bạn sử dụng client để nói với server nhiệm vụ nó phải làm. Docker daemon (chả biết dịch cái này dư lào) có thể chạy trên bất kỳ server nào và mỗi client có thể nói chuyện với bất kỳ số lượng server. Client điều khiển mọi giao tiếp, nhưng Docker server có thể giao tiếp trực tiếp với Image registries (chính là cái Docker Registry) khi hành động. Client có nghĩa vũ điều khiển trực tiếp server phải làm gì và server tập trung vào việc tổ chức đóng gói ứng dụng.

Docker có chút khác biệt trong cấu trúc so với các phần mềm client/server khác. Thay vì có clietn và server thực thi riêng biệt, nó lại sử dụng cùng dạng nhị phân cho cả 2 thành phần (ý là việc thực thi). Khi cài docker, ta có 2 thành phần trên, nhưng server chỉ chạy trên host linux. Chạy Docker server/daemon là đơn giản như chạy docker với config -d (config này ở đây tác giả muốn nói là chạy ngầm vậy). Mỗi docker host thường có 1 Docker daemon chạy và có thể quản lý số lượng container. Bạn có thể sử dụng docker command-line tool client để giao tiếp với server.

## 2. Network Ports and Unix Sockets.
Docker command-line tool và docker -d daemon giao tiếp qua net-work sockets. Bạn có thể chọn để cho Docker daemon nghe trên 1 hoặc nhiều cổng TCP hoặc Unix socket.

> Nó tè 1: Đọc đến đoạn này mình nghĩ là nhiều người sẽ không hiểu daemon là cái khỉ gì. Oke thì nó là 1 tiến trình chạy nền tức là thay vì show lên cho bạn thấy mọi request đến đi, tên server các kiểu thì nó âm thầm chạy ở phía sau. Cái này nghe có vẻ trừu tượng nhưng sau này có lẽ ta sẽ đi vào chi tiết hơn để hiểu. Còn wiki thì nói dư lày : [daemon](https://en.wikipedia.org/wiki/Daemon_(computing))

Đoạn phía sau có lẽ mình sẽ skip vì thấy nó chưa hữu dụng lắm (nó liên quan nhiều đến kiến thức mạng máy tính, mà mình chả nhớ gì cả)

## 3. Robust Tooling.
Trong số rất nhiều thứ dẫn dắt cho Docker phát triển là các công cụ hỗ trợ đơn giản mà đầy sức mạnh. Nó đã phát triển rộng hơn bởi về nó bắt đầu được release bởi docker và bởi cộng đồng docker. Công cụ mà Docker kèm theo và hỗ trợ cả xây dựng Docker Images và khả năng deploy 1 cách đơn giản đến Docker daemons, cũng như có đầy đủ chức năng cần thiết để quản lý từ xa Docker server. Cộng đồng chú ý về quản lý tất cả các cụm Docker server và tổ chức cho việc deploy các container. Docker cũng xây nên các tool của chính mình bao gồm: [Docker Compose](https://github.com/docker/compose) (cái này chắc quen lắm rồi), [Docker Machine](https://github.com/docker/machine) (cái này mình chưa dùng bao giờ) và [Docker Swarm](https://github.com/docker/swarm/) (cái này thì càng không), nó làm tăng khả năng gắn kết việc deploy trong nhiều môi trường.
Bởi vì Docker cung cấp cả command-line tool và web API nên nó rất dễ để thêm tool với nhiều ngôn ngữ. 

## 4. Docker Command-line Tool

Docker Command-line Tool là giao diện chính mà phần lớn người dùng sử dụng. Nó sử dụng ngôn ngữ [Golang](https://golang.org/) để thực thi và chạy chung kiến trúc và hệ thống. Command-line tool được dùng cho mọi nền tảng và được thực thi trực tiếp từ source Go. 1 vài thứ chúng ta có thể thực hiện với Docker command-line tool:
* Tạo ra container, image.
* Kéo image từ kho lưu trữ của Docker daemon và đẩy image lên ngược lại.
* Khởi tạo 1 container ở trên Docker server trên nền hoặc dưới nền hệ thống.
* Xem được Docker logs từ server.
* Khởi tạo 1 command-line shell trong các container trên server.

Phần API của Docker có lẽ mình cũng sẽ bỏ qua (vì mình chưa hiểu rõ lắm cũng như chưa dùng đến nó).

## 5. Container Networking.
Mặc dù Docker containers là lớn và có nhiều tiến trình chạy trên chính nó, tuy nhiên nó có chút khác biệt trên các tiến trình trong 1 tầng mạng. Mỗi Docker  container như chạy trên 1 mạng giống như được host ở trên 1 private network. Docker server thực hiện như 1 cầu nối ảo, và các container là clients ở sau nó. Cây cầu này chỉ là 1 thiết bị mạng mà lặp lại giao tiếp từ 1 đến số còn lại. Nó có thể coi như 1 mạng ảo nhỏ với các host được đính kèm.

Điều này có nghĩa là mỗi container có 1 giao diện mạng kết nối tới Docker của riêng nó và IP address của chính nó được kết nối tới 1 giao diện ảo. Docker cho phép bạn đặt cổng trên host tới container do đó bên ngoài có thể kết nối tới container của bạn. Các giao tiếp được chạy qua 1 proxy cái mà là 1 phần của Docker daemon trước khi đến với container.

Docker kết nối các private subnet từ 1 chuẩn kết nối [RFC 1918](https://tools.ietf.org/html/rfc1918) (chả hiểu đây là cái gì nhưng cứ dịch vào, anhem click vào link xem sao). Nó phát hiện network nào là khoogn được sử dụng khi khởi tạo và kết nối nó với mạng ảo. Nó kết nối tới máy chủ mạng cục bộ qua các giao diện trên server ( được gọi là *docker0*). Có nghĩa là tất cả các container là chung 1 mạng và có thể nói chuyện trực tiếp với nhau. Nhưng để lấy host ở bên ngoài (ngoài docker), chúng ta đi qua giao diện mạng ảo docker0. Nó không giới hạn giao tiếp qua proxy. Proxy này có hiệu năng cao như có thể bị limit nếu chạy quá nhiều ứng dụng trên 1 container. 

Có 1 ti tỉ cách mà chúng ta có thể config tầng mạng của docker, từ kết nối mạng của chúng ta tới config giao diện kết nối. Chúng ta cũng có thể chạy với mặc đinh trừ trường hơi quá phức tạp hoặc cần chạy riêng cho ứng dụng. Bạn có thể tìm thấy chi tiết về mạng Docker trong [Documentation](https://docs.docker.com/articles/networking/) của Docker.


-----
Oke, bài viết cũng khá dài và toàn lý thuyết, lần tới có thể mình sẽ đi sâu vào việc cài đặt cũng như làm việc với Docker qua việc thực hành nhiều hơn. Tuy nhiên đọc bài này giúp mình hiểu hơn về cách mà Docker làm việc cũng như kiến trúc của nó. Hy vọng mình có thể áp dụng kiến thức này cho team của mình và hy vọng các bạn cũng như vậy.