Trong thời gian gần đây, **Docker** có rất nhiều bài báo, blog, ... thảo luận và gây được nhiều chú ý trong cộng đồng công nghệ trong nước cũng như trên thế giới. Vậy **Docker** là gì? Hãy cùng tìm hiểu cùng mình nhé

![](https://images.viblo.asia/6e121d8b-49c8-4e60-a352-f23efa9e544d.png)

## Docker là gì?
Docker là một nền tảng cho phép bạn đóng gói, triển khai và chạy các ứng dụng một cách nhanh chóng. Ứng dụng Docker chạy trong vùng chứa (container) có thể được sử dụng trên bất kỳ hệ thống nào: máy tính xách tay của nhà phát triển, hệ thống trên cơ sở hoặc trong hệ thống đám mây.
Và là một công cụ tạo môi trường được "đóng gói" (còn gọi là Container) trên máy tính mà không làm tác động tới môi trường hiện tại của máy, môi trường trong Docker sẽ chạy độc lập.

Docker được tạo ra để làm việc trên nền tảng Linux , nhưng đã mở rộng để cung cấp hỗ trợ lớn hơn cho các hệ điều hành không phải Linux, bao gồm Microsoft Windows và Apple OS X
## Các thành phần cơ bản của Docker
### Docker Engine
Docker Engine là công cụ Client - Server hỗ trợ công nghệ container để xử lý các nhiệm vụ và quy trình công việc liên quan đến việc xây dựng các ứng dụng dựa trên vùng chứa (container). Engine tạo ra một quy trình daemon phía máy chủ lưu trữ images, containers, networks và storage volumes. Daemon cũng cung cấp giao diện dòng lệnh phía máy khách (CLI) cho phép người dùng tương tác với daemon thông qua giao diện lập trình ứng dụng Docker.

Các bạn thắc mắc images, containers, network và volumes mình nhắc tới ở trên là gì? Đôn wua rì :v 4 đối tượng đó là 4 đối tượng của Engine và chúng đều có ID để xác định. Và bằng một cách thần kì nào đó chúng phối hợp với nhau để chúng ta có thể build, ship và run application ở bất cứ đâu

- <strong>Images:</strong> là thành phần để đóng gói ứng dụng và các thành phần mà ứng dụng phụ thuộc để chạy. Và image được lưu trữ ở trên local hoặc trên một Registry (là nơi lưu trữ và cung cấp kho chứa các image)
- <strong>Containers:</strong> là một instance của image, và nó hoạt động như một thư mục, chứa tất cả những thứ cần thiết để chạy một ứng dụng
- <strong>Network:</strong> cung cấp một private network chỉ tồn tại giữa container và host
- <strong>volume:</strong> Volume trong Docker được dùng để chia sẻ dữ liệu cho container
<br>
Sau đây là hình ảnh minh họa cho các mối liên hệ giữa các thành phần trên:

![](https://images.viblo.asia/81afaefc-050f-44be-bd9b-9f0d1435a7fc.png)

### Distribution tools
Là các công cụ phân tán giúp chúng ta lưu trữ và quản lý các Docker Images như: Docker Registry, Docker Trusted Registry, Docker Hub

Ở đây mình sẽ giới thiệu về Docker Hub. Docker Hub là gì ?

Docker Hub là một công cụ phần mềm như một dịch vụ cho phép người dùng public hay private các images của chúng ta. Dịch vụ cung cấp hơn 100.000 ứng dụng có sẵn công khai, cũng như các cơ quan đăng ký container công cộng và tư nhân
### Orchestration tools
- <Strong>Docker Machine</Strong>: Machine tạo Docker Engine trên laptop của bạn hoặc trên bất cứ dịch vụ cloud phổ biến nào như AWS, Azure, Google Cloud, Softlayer hoặc trên hệ thống data center như VMware, OpenStack. Docker Machine sẽ tạo các máy ảo và cài Docker Engine lên chúng và cuối cùng nó sẽ cấu hình Docker Client để giao tiếp với Docker Engine một cách bảo mật
- <Strong>Docker Compose</Strong>: là công cụ giúp định nghĩa và khởi chạy multi-container Docker applications
- <Strong>Docker Swarm</Strong>: là một công cụ giúp chúng ta tạo ra một clustering Docker. Nó giúp chúng ta gom nhiều Docker Engine lại với nhau và ta có thể "nhìn" nó như duy nhất một virtual Docker Engine
### Một số thành phần khác
- Dockerfile: như một script dùng để build các image trong container. Dockerfile bao gồm các câu lệnh liên tiếp nhau được thực hiện tự động trên một image gốc để tạo ra một image mới. Dockerfile giúp đơn giản hóa tiến trình từ lúc bắt đầu đến khi kết thúc
- Docker Toolbox: Bởi vì Docker Engine dùng một số feature của kernel Linux nên ta sẽ không thể chạy Docker Engine natively trên Windows hoặc BSD được. Ở các phiên bản trước đây thì ta sẽ cần một máy ảo cài một phiên bản Linux nào đó và sau đó cài Docker Engine lên máy ảo đó

## Kiến trúc của Docker
![](https://images.viblo.asia/88fd8aba-8070-4fe5-9e39-78696cfb5dc6.png)

Docker sử dụng kiến trúc client-server. Docker client sẽ liên lạc với các Docker daemon, các Docker daemon sẽ thực hiện các tác vụ build, run và distribuing các Docker container.  Cả Docker client và Docker daemon có thể chạy trên cùng 1 máy, hoặc có thể kết nối theo kiểu Docker client điều khiển các docker daemon như hình trên. Docker client và daemon giao tiếp với nhau thông qua socket hoặc RESTful API

Docker daemon chạy trên các máy host. Người dùng sẽ không tương tác trực tiếp với các daemon, mà thông qua Docker Client.

## Thực hành 
Lý thuyết là thế vậy thực tế sẽ như thế nào? Sau đây mình có một ví dụ nho nhỏ với Docker
### Cài đặt Docker 
Sau đây, mình sẽ hướng dẫn các bạn cài đặt trên ubuntu

Cài đặt Docker sử dụng repository
Thiết lập repository
1. Update ubuntu 
```
$ sudo apt-get update
```
2. Cài đặt các gói để cho phép apt sử dụng repository qua HTTPS:
```
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```
3. Thêm key chính thức của Docker:
```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
4. Thêm Repositories stable:
```
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
Sau khi thực hiện các bước trên tiến hành cài đặt Docker nào. Ở đây, mình cài đặt Docker CE
1. Update lần nưã :v: 
```
$ sudo apt-get update
```
2. Cài đặt Docker CE phiên bản mới nhất:
```
$ sudo apt-get install docker-ce
```
Để test thử thành công hay khồng chúng ta mở terminal thử chạy một image kinh điển : hello-world :D 
```
docker run hello-world
```
Sau khi chạy lệnh này terminal sẽ như sau:

![](https://images.viblo.asia/9216377b-7ef7-4293-a54c-5bd5cd8c5dd5.jpg)

terminal của bạn hiển thị như thế này là thành công rồi :D master docker đến nơi rồi 

Lệnh docker run là để chạy một image và sẽ tạo ra một container chính là instance của image hello-world, nếu image đó chưa được pull về thì lệnh docker run sẽ tìm và tự động pull về image có phiên bản mới nhất. Để tìm kiếm một image chúng ta có thể dùng lệnh: 
```
sudo docker search {image_name}
```
ví dụ: mình tìm kiếm image có tên nginx:
![](https://images.viblo.asia/62242a42-eb91-42f6-9e95-7bdacbd7a5e9.jpg)

terminal sẽ hiển thị các images liên quan đến nginx, bạn thấy ưng cái bụng với image nào thì pull về dùng thôi :D Câu lệnh pull một image về: 
```
sudo docker pull {image_name}
```

sau đây mình pull image có tên nginx, kết quả như sau: 
![](https://images.viblo.asia/8e2f0bad-2a61-4a98-abd6-2ffeb785c30d.jpg)

Để xem danh sách các images đã có chúng ta có câu lệnh:
```
sudo docker images
```
terminal sẽ hiển thị tất cả các images:
![](https://images.viblo.asia/37b27b4d-209e-4a78-b97d-825f0af4e97c.jpg)

### Ví dụ chia sẻ tài nguyên với Docker sử dụng image nginx
Đầu tiên, Chúng ta cần một file HTML để hiển thị khi chúng ta kết nối với server. và mình đã tạo một file index.html ở trong thư mục docker-nginx mình tự tạo và thư mục này trong thư mục document với nội dung là:
```
Hello, world 
```
Tiếp theo, chúng ta sử dụng image nginx mà chúng ta đã pull về ở phía trên:
```
sudo docker run -v /home/lyhuynh/Documents/docker-nginx:/usr/share/nginx/html:ro -p 8080:80 -d nginx
```
Docker sẽ chạy image nginx và tạo ra một instance của image nginx chính là container. Và ở câu lệnh phía trên docker run chắc các bạn đã biết nó làm gì rồi nhỉ vậy các thành phần phía sau nó là gì?

- /home/lyhuynh/Documents/docker-nginx: chính là đường dẫn tới thư mục chưa file index.html của mình để hiển thị Hello, world đấy :v 
- -v /home/lyhuynh/Documents/docker-nginx:/usr/share/nginx/html:ro chính là ánh xạ web page tới địa chỉ được yêu cầu bởi image. 'ro' ở đây là dẫn Docker đến chế độ chỉ đọc (read-only) 
- -p 8080:80 map dịch vụ mạng port 80 trong container đến port 8080 của máy chủ hệ thống
- -d : tách container khỏi phiên dòng lệnh của chúng ta
- nginx: tên của image 
Sau khi thực hiện dòng lệnh trên mở trình duyệt lên và truy cập vào http://127.0.0.1:8080/ và xem kết quả nào:
![](https://images.viblo.asia/07822877-b06e-4258-96e4-6032279a28f4.jpg)
Khi chạy image nginx, chúng ta cần phải cho nó biết nơi để lấy các tập tin trên web. Ở đây mình đã làm điều này bằng cách gắn một thư mục trên hệ thống máy chủ của mình vào một thư mục bên trong container, ghi đè các tệp đã có trong image. Docker cũng hỗ trợ volume, cái có thể chứa các tập tin hệ thống và được chia sẻ giữa các container. Chúng ta cũng cần ánh xạ port 80 trong container của chúng ta đến cổng của hệ thống máy chủ để máy chủ web giao tiếp với thế giới bên ngoài.

Để xem các container nào đang chạy, câu lệnh:
```
sudo docker ps
```
để xem tất cả các container, câu lệnh:
```
sudo docker ps -a
```

## Tổng kết
Ở trong bài viết này mình đã cùng với các bạn tìm hiểu về Docker ,các thành phần của nó và cách sử dụng cơ bản Docker. Docker thật tuyệt vời để tách biệt các môi trường lập trình và deploy môi trường cũng thật dễ dàng. Hãy thử tưởng tượng khi bạn tham gia vào 1 dự án, đáng ra bạn sẽ phải cài rất nhiều thứ để có thể chạy được môi trường lập trình trên máy mình thì bạn chỉ cần đơn giản là pull docker image của môi trường lập trình ấy về và start nó lên là xong

Trong bài viết tiếp theo mình sẽ cùng các bạn tìm hiểu các lệnh trong Docker. Nếu thấy bài viết có ích hãy upvote cho mình nhé <3 
## Tài liệu tham khảo
https://www.docker.com/

https://stackify.com/docker-tutorial/

https://kipalog.com/posts/He-sinh-thai-Docker