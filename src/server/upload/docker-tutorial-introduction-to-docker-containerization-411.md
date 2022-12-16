# 1. Hướng dẫn Docker
Blog Hướng dẫn Docker này sẽ cung cấp cho bạn khái niệm và tiếp xúc thực tế với Docker - Một công nghệ chứa đựng thời đại mới.

Trong blog này, chúng tôi sẽ tập trung vào các chủ đề dưới đây:

* Virtualization là gì?
* Containerization là gì
* Ưu điểm của Containerization so với Virtualization
* Giới thiệu về Docker
* Lợi ích của Docker
* Virtualization so với Containerization
* Cài đặt Docker
* Dockerfile, Docker Image & Docker Container
* Docker Hub là gì?
* Kiến trúc Docker
* Docker Compose

Nói một cách đơn giản, Docker là một nền tảng chứa phần mềm, có nghĩa là bạn có thể xây dựng ứng dụng của mình, đóng gói chúng cùng với các phụ thuộc của chúng vào một container và sau đó các container này có thể dễ dàng vận chuyển để chạy trên các máy khác. 

*Ví dụ:* Chúng ta hãy xem xét một ứng dụng dựa trên linux đã được viết bằng cả Ruby và Python. Ứng dụng này yêu cầu một phiên bản cụ thể của linux, Ruby và Python. Để tránh bất kỳ xung đột phiên bản nào từ phía người dùng, có thể tạo docker container linux với các phiên bản yêu cầu của Ruby và Python được cài đặt cùng với ứng dụng. Giờ đây, người dùng cuối có thể sử dụng ứng dụng dễ dàng bằng cách chạy container này mà không cần lo lắng về các phụ thuộc hoặc bất kỳ xung đột phiên bản nào. 

Những containers này sử dụng Containerization có thể được coi là một phiên bản phát triển của Virtualization. Tác vụ tương tự cũng có thể đạt được bằng Máy ảo (Virtual Machines), tuy nhiên nó không hiệu quả lắm. 

Tôi thường nhận được một câu hỏi tại thời điểm này, tức là sự khác biệt giữa Virtualization và Containerization là gì? Hai thuật ngữ này rất giống nhau. Vì vậy, trước tiên hãy để tôi cho bạn biết Virtualization là gì?

# 2. Virtualization là gì?
Virtualization là kỹ thuật nhập hệ điều hành Khách lên trên hệ điều hành Máy chủ. Kỹ thuật này ban đầu là một phát hiện vì nó cho phép các nhà phát triển chạy nhiều hệ điều hành trong các máy ảo khác nhau, tất cả đều chạy trên cùng một máy chủ. Điều này đã loại bỏ nhu cầu về tài nguyên phần cứng bổ sung. Ưu điểm của Máy ảo (Virtual Machines) hoặc Virtualization là:
* Nhiều hệ điều hành có thể chạy trên cùng một máy
* Bảo trì và phục hồi dễ dàng trong trường hợp điều kiện hỏng hóc
* Tổng chi phí sở hữu cũng ít hơn do nhu cầu cơ sở hạ tầng giảm

Trong sơ đồ dưới, bạn có thể thấy có một hệ điều hành chủ, trên đó có 3 hệ điều hành khách đang chạy, không gì khác ngoài các máy ảo.
![](https://images.viblo.asia/e5b03c97-c0fe-41a3-b1ae-6e79e070b7ba.png)

Như bạn biết không có gì là hoàn hảo, Virtualization cũng có một số thiếu sót. Chạy nhiều Máy ảo trong cùng một hệ điều hành máy chủ sẽ dẫn đến giảm hiệu suất. Điều này là do hệ điều hành khách chạy trên hệ điều hành chủ, hệ điều hành này sẽ có hạt nhân và tập hợp các thư viện và phụ thuộc của riêng nó. Điều này chiếm một lượng lớn tài nguyên hệ thống, tức là đĩa cứng, bộ xử lý và đặc biệt là RAM.

Một vấn đề khác với Máy ảo sử dụng virtualization là mất gần một phút để khởi động. Điều này rất quan trọng trong trường hợp ứng dụng thời gian thực.

Sau đây là những nhược điểm của Virtualization:
* Chạy nhiều Máy ảo dẫn đến hiệu suất không ổn định
* Trình giám sát không hiệu quả như hệ điều hành máy chủ
* Quá trình khởi động lâu và mất thời gian


Những hạn chế này đã dẫn đến sự xuất hiện của một kỹ thuật mới được gọi là Containerization. Bây giờ để tôi nói cho bạn biết về Containerization.
# 3. Containerization là gì?
**Containerization** là kỹ thuật đưa Virtualization lên cấp hệ điều hành. Trong khi Virtualization mang lại sự trừu tượng cho phần cứng, Containerization mang lại sự trừu tượng cho hệ điều hành. Lưu ý rằng Containerization cũng là một loại Virtualization. Tuy nhiên, Containerization hiệu quả hơn vì không có hệ điều hành khách ở đây và sử dụng hệ điều hành của máy chủ lưu trữ, chia sẻ thư viện và tài nguyên liên quan khi cần thiết không giống như máy ảo. Các mã nhị phân và thư viện container dành riêng cho ứng dụng chạy trên hạt nhân máy chủ, giúp xử lý và thực thi rất nhanh. Ngay cả việc khởi động một container cũng chỉ mất một phần nhỏ của giây. Bởi vì tất cả các container chia sẻ, lưu trữ hệ điều hành và chỉ giữ các tệp nhị phân & thư viện liên quan đến ứng dụng. Chúng nhẹ và nhanh hơn Máy ảo.

Ưu điểm của Containerization so với Virtualization:
* Các container trên cùng một nhân hệ điều hành nhẹ hơn và nhỏ hơn
* Sử dụng tài nguyên tốt hơn so với máy ảo
* Quá trình khởi động ngắn và mất vài giây

![](https://images.viblo.asia/91b13a24-816e-4353-a8f6-f5a66b83b838.png)

Trong sơ đồ trên, bạn có thể thấy rằng có một hệ điều hành máy chủ được chia sẻ bởi tất cả các containers. Container chỉ chứa các thư viện ứng dụng cụ thể riêng biệt cho từng container và chúng nhanh hơn và không lãng phí bất kỳ tài nguyên nào.

Tất cả các container này được xử lý bởi containerization layer không có nguồn gốc từ hệ điều hành máy chủ. Do đó, cần phải có một phần mềm, phần mềm này có thể cho phép bạn tạo và chạy các container trên hệ điều hành máy chủ của bạn.

# 4. Hướng dẫn Docker - Giới thiệu về Docker 
Docker là một nền tảng container hóa gói ứng dụng của bạn và tất cả các phần phụ thuộc của nó lại với nhau dưới dạng Container để đảm bảo rằng ứng dụng của bạn hoạt động liền mạch trong mọi môi trường.
![](https://images.viblo.asia/723412fd-3178-4d09-a7ff-dd35e0a99de5.png)

Như bạn có thể thấy trong sơ đồ trên, mỗi ứng dụng sẽ chạy trên một container riêng biệt và sẽ có tập hợp các thư viện và phụ thuộc riêng. Điều này cũng đảm bảo rằng có sự cô lập ở cấp độ quy trình, nghĩa là mỗi ứng dụng độc lập với các ứng dụng khác, mang lại cho các nhà phát triển sự chắc chắn rằng họ có thể xây dựng các ứng dụng sẽ không can thiệp vào nhau.

Là một nhà phát triển, tôi có thể tạo một container có các ứng dụng khác nhau được cài đặt trên đó và đưa nó cho nhóm QA của tôi, những người sẽ chỉ cần chạy container để tái tạo môi trường dành cho nhà phát triển.

# 5. Lợi ích của Docker
Giờ đây, nhóm QA không cần phải cài đặt tất cả các phần mềm và ứng dụng phụ thuộc để kiểm tra mã và điều này giúp họ tiết kiệm rất nhiều thời gian và năng lượng. Điều này cũng đảm bảo rằng môi trường làm việc nhất quán giữa tất cả các cá nhân tham gia vào quá trình, bắt đầu từ phát triển đến triển khai. Số lượng hệ thống có thể được mở rộng một cách dễ dàng và mã có thể được triển khai trên chúng một cách dễ dàng.

# 6. Virtualization so với Containerization
Virtualization và Containerization đều cho phép bạn chạy nhiều hệ điều hành bên trong một máy chủ.

Virtualization liên quan đến việc tạo nhiều hệ điều hành trong một máy chủ duy nhất. Mặt khác, Containerization sẽ tạo ra nhiều containers cho mọi loại ứng dụng theo yêu cầu.
![](https://images.viblo.asia/bbde4304-52fd-4cc0-939c-aeef2c62aa91.png)

Như chúng ta có thể thấy từ hình ảnh, sự khác biệt chính là có nhiều Hệ điều hành khách trong Virtualization không có trong Containerization. Phần tốt nhất của Containerization là nó rất nhẹ so với Virtualization.

# 7. Cài đặt Docker:
Tôi sẽ cài đặt Docker trong máy Ubuntu 17.10 của mình. Sau đây là các bước để cài đặt Docker:

1. Cài đặt các Gói bắt buộc
1. Thiết lập kho lưu trữ Docker
1. Cài đặt Docker trên Ubuntu

## 7.1. Cài đặt các Gói yêu cầu:
Có một số gói nhất định bạn yêu cầu trong hệ thống của mình để cài đặt Docker. Thực hiện lệnh dưới đây để cài đặt các gói đó.
> sudo apt-get install  curl  apt-transport-https ca-certificates software-properties-common

![](https://images.viblo.asia/3c5fd222-fdb0-4cc4-ad7d-4ac80fbd14e8.png)
## 7.2. Thiết lập Kho lưu trữ Docker:
Bây giờ, nhập khóa GPG chính thức của Dockers để xác minh chữ ký gói trước khi cài đặt chúng bằng apt-get. Chạy lệnh dưới đây trên thiết bị đầu cuối:
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add

![](https://images.viblo.asia/14a40a84-071d-4bcc-aaa9-ff9a9a85cbce.png)

Bây giờ, hãy thêm kho lưu trữ Docker trên hệ thống Ubuntu của bạn, nơi chứa các gói Docker bao gồm các phụ thuộc của nó, để thực thi lệnh dưới đây:

> sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

![](https://images.viblo.asia/0c271172-542c-4d22-9d70-aee71c9e3862.png)

## 7.3. Cài đặt Docker trên Ubuntu:
Bây giờ bạn cần nâng cấp chỉ mục apt và cài đặt phiên bản cộng đồng Docker, để thực hiện các lệnh dưới đây:
> sudo apt-get update
> 
> sudo apt-get install docker-ce

![](https://images.viblo.asia/9942e318-776e-4d3b-afba-e6a0ae183974.png)
![](https://images.viblo.asia/391d17c6-5d82-42e3-ab3b-bc14410ce5b5.png)

Xin chúc mừng! Bạn đã cài đặt Docker thành công. Ngoài ra, hãy xem một số [Lệnh Docker](https://www.edureka.co/blog/docker-commands/) thường được sử dụng .

Bây giờ chúng ta hãy xem một vài khái niệm Docker quan trọng.

# 8. Dockerfile, Docker Image và Docker Container:
1. Docker Image được tạo bởi chuỗi lệnh được viết trong một tệp được gọi là Dockerfile.
1. Khi Dockerfile này được thực thi bằng lệnh docker, nó dẫn đến một Docker Image và có tên.
1. Khi Image này được thực thi bằng lệnh "docker run", nó sẽ tự khởi động bất kỳ ứng dụng hoặc dịch vụ nào mà nó phải bắt đầu khi thực thi.

# 9. Docker Hub:
Docker Hub giống như GitHub dành cho Docker Image. Về cơ bản, nó là một sổ cloud registry, nơi bạn có thể tìm thấy Docker Image được tải lên bởi các cộng đồng khác nhau, bạn cũng có thể phát triển image của riêng mình và tải lên trên Docker Hub, nhưng trước tiên, bạn cần tạo một tài khoản trên DockerHub.
![](https://images.viblo.asia/2f14492e-e662-4e81-a0e3-f615521216a7.png)

# 10. Kiến trúc Docker:
Nó bao gồm một Docker Engine là một ứng dụng client-server với ba thành phần chính:

1. Server là một loại chương trình chạy lâu dài được gọi là quy trình daemon (docker command).
1. Một API REST chỉ định các giao diện mà các chương trình có thể sử dụng để nói chuyện với daemon và hướng dẫn nó phải làm gì.
1. Client giao diện dòng lệnh (CLI) (docker command).
1. CLI sử dụng API Docker REST để điều khiển hoặc tương tác với trình nền Docker thông qua các lệnh CLI kịch bản hoặc trực tiếp. Nhiều ứng dụng Docker khác sử dụng API và CLI cơ bản.

# 11. Docker Compose:
Docker Compose về cơ bản được sử dụng để chạy nhiều Docker Containers như một máy chủ duy nhất. Tôi sẽ cho bạn một ví dụ:

Giả sử nếu tôi có một ứng dụng yêu cầu WordPress, Maria DB và PHP MyAdmin. Tôi có thể tạo một tệp sẽ khởi động cả hai containers như một dịch vụ mà không cần phải khởi động từng tệp riêng biệt. Nó thực sự hữu ích, đặc biệt nếu bạn có kiến trúc microservice.

Nguồn: [Edureka](https://www.edureka.co/blog/docker-explained/)