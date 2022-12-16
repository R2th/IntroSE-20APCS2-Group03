Docker đã trở nên phổ biến rộng rãi trong thế giới CNTT đang phát triển nhanh chóng này. Các tổ chức đang tiếp tục áp dụng nó trong môi trường sản xuất của họ. 

Nhân cơ hội này tôi sẽ giải thích Docker theo cách đơn giản nhất. Trong blog này, các khái niệm sau sẽ được đề cập:
* History Before containerization
* Reasons to use containers
* What is Docker?
* Dockerfile, Images  & Containers
* Docker Compose & Docker Swarm
* Hands-On

## 1. History Before containerization

Trước khi quá trình container hóa xuất hiện, cách hàng đầu để cô lập, sắp xếp các ứng dụng và sự phụ thuộc của chúng là đặt từng ứng dụng trong máy ảo của riêng nó. Những máy này chạy nhiều ứng dụng trên cùng một phần cứng vật lý và quá trình này không gì khác ngoài **Virtualization**.

Tuy nhiên, **virtualization** có một số nhược điểm như các máy ảo có kích thước cồng kềnh, chạy  nhiều máy ảo dẫn đến hiệu suất không ổn định, quá trình khởi động thường mất nhiều thời gian và máy ảo sẽ không giải quyết được các vấn đề như tính di động, cập nhật phần mềm hoặc tích hợp liên tục và thay đổi liên tục.

Những hạn chế này đã dẫn đến sự xuất hiện của một kỹ thuật mới được gọi là  **Containerization** (container hóa). Bây giờ để tôi nói cho bạn biết về **Containerization** .

**Containerization**

Containerization là một loại Virtualization đưa virtualization lên cấp hệ điều hành. Mặc dù Virtualization mang lại sự trừu tượng cho phần cứng, Containerization mang lại sự trừu tượng cho hệ điều hành. Để hiểu chi tiết về container, hãy tham khảo blog [Hướng dẫn](https://www.edureka.co/blog/docker-tutorial) này .
## 2. Reasons to use containers
Sau đây là những lý do để sử dụng container:
* Container không có hệ điều hành khách và sử dụng hệ điều hành của máy chủ. Vì vậy, họ chia sẻ  các thư viện và tài nguyên có liên quan khi cần thiết.
* Xử lý và thực thi các ứng dụng rất nhanh vì các mã nhị phân và thư viện vùng chứa dành riêng cho ứng dụng chạy trên hạt nhân máy chủ.
* Việc khởi động container chỉ mất một phần nhỏ giây, đồng thời, các vùng chứa cũng nhẹ và nhanh hơn virtualization.

Bây giờ, bạn đã hiểu container là gì và lý do để sử dụng container, đã đến lúc bạn hiểu khái niệm chính của chúng tôi ở đây.
## 3. What is Docker?
Docker là một nền tảng gói một ứng dụng và tất cả các phụ thuộc của nó lại với nhau dưới dạng các thùng chứa. Khía cạnh này đảm bảo rằng ứng dụng hoạt động trong mọi môi trường.

![](https://images.viblo.asia/0e8cf746-bf77-4cfc-bb95-d4b788cfc668.png)

Như bạn có thể thấy trong sơ đồ, mỗi và mọi ứng dụng chạy trên các container riêng biệt và có tập hợp phụ thuộc & thư viện riêng. Điều này đảm bảo rằng mỗi ứng dụng độc lập với các ứng dụng khác, mang lại cho các nhà phát triển sự chắc chắn rằng họ có thể xây dựng các ứng dụng không can thiệp vào nhau.

Vì vậy, một nhà phát triển có thể xây dựng một container có các ứng dụng khác nhau được cài đặt trên đó và cung cấp cho nó cho nhóm QA. Sau đó, nhóm QA sẽ chỉ cần chạy container để tái tạo môi trường của nhà phát triển.

Nếu bạn muốn tìm hiểu thêm về Docker, thì bạn có thể nhấp vào [đây](https://www.edureka.co/blog/what-is-docker-container).

Bây giờ, hãy để tôi cho bạn biết một số khái niệm cơ bản hơn về Docker, chẳng hạn như Dockerfile, images  và containers.
## 4. Dockerfile, Images & Containers
Dockerfile, Docker Images & Docker Containers là ba thuật ngữ quan trọng mà bạn cần hiểu khi sử dụng Docker.

![](https://images.viblo.asia/0f944b49-099e-40eb-9e00-52daeb236f98.png)

Như bạn có thể thấy trong sơ đồ trên khi Dockerfile được xây dựng, nó sẽ trở thành Docker Image và khi chúng ta chạy Docker Image thì cuối cùng nó trở thành Docker Container.

Tham khảo bên dưới để hiểu tất cả ba thuật ngữ.

**Dockerfile**: Dockerfile là một tài liệu văn bản chứa tất cả các lệnh mà người dùng có thể gọi trên dòng lệnh để lắp ráp một Image. Vì vậy, Docker có thể tạo Images tự động bằng cách đọc hướng dẫn từ Dockerfile. Bạn có thể sử dụng `docker build` để tạo một bản dựng tự động để thực thi một số hướng dẫn dòng lệnh liên tiếp.

**Docker Image**: Theo thuật ngữ của layman, Docker Image có thể được so sánh với một mẫu được sử dụng để tạo Docker Containers. Vì vậy, các mẫu chỉ đọc này là các khối xây dựng của Containers. Bạn có thể sử dụng `docker run` để chạy Image và tạo containers.

Docker Images được lưu trữ trong Docker Registry. Nó có thể là kho lưu trữ cục bộ của người dùng hoặc kho lưu trữ công khai như Docker Hub cho phép nhiều người dùng cộng tác trong việc xây dựng ứng dụng.

**Docker Container**:  Nó là một phiên bản đang chạy của Docker Image vì chúng chứa toàn bộ gói cần thiết để chạy ứng dụng. Vì vậy, về cơ bản đây là các ứng dụng sẵn sàng được tạo từ Docker Images, đây là tiện ích cuối cùng của Docker. 

Bây giờ, bạn đã biết những điều cơ bản, nếu bạn muốn tìm hiểu về kiến trúc của công nghệ này thì bạn có thể nhấp vào [đây](https://www.edureka.co/blog/what-is-docker-container) .

## 5. Docker Compose & Docker Swarm

[Docker Compose](https://www.edureka.co/blog/docker-compose-containerizing-mean-stack-application/) là một tệp YAML chứa thông tin chi tiết về các services, networks và volumes  để thiết lập ứng dụng. Vì vậy, bạn có thể sử dụng Docker Compose để tạo các container riêng biệt, lưu trữ chúng và giúp chúng giao tiếp với nhau. Mỗi vùng chứa sẽ hiển thị một cổng để giao tiếp với các vùng chứa khác.

[Docker Swarm](https://www.edureka.co/blog/docker-swarm-cluster-of-docker-engines-for-high-availability)  là một kỹ thuật để tạo và duy trì một cụm các **Docker Engines** . Các Docker Engines có thể được lưu trữ trên các nodes khác nhau và các nodes này ở các vị trí xa, tạo thành một Cluster khi được kết nối ở chế độ Swarm. 

Trong phần Thực hành, tôi sẽ chỉ cho bạn các lệnh cơ bản của Docker và cho bạn biết cách tạo Dockerfile, Images & Docker Container.
## 6. Hands-On
Làm theo các bước dưới đây để tạo Dockerfile, Image & Container.

**Bước 1**: Đầu tiên bạn phải cài đặt Docker. Để tìm hiểu cách cài đặt nó, bạn có thể nhấp vào [đây](https://www.edureka.co/blog/install-docker/).

**Bước 2**: Sau khi cài đặt xong, sử dụng lệnh dưới đây để kiểm tra phiên bản.
> docker -v

![](https://images.viblo.asia/5cc161fb-ef02-4004-9902-a3e16a1008a0.png)


**Bước 3**: Bây giờ tạo một thư mục trong đó bạn có thể tạo DockerFile và thay đổi thư mục làm việc hiện tại thành thư mục đó.
> mkdir images
> 
> cd images

![](https://images.viblo.asia/b627942c-b768-4b1d-8eff-4337075a6107.png)

**Bước 4.1**: Bây giờ tạo Dockerfile bằng cách sử dụng trình chỉnh sửa. Trong trường hợp này, tôi đã sử dụng trình chỉnh sửa nano.
> nano Dockerfile

![](https://images.viblo.asia/cadeed8d-37b7-4350-b794-c14d8b47459d.png)

**Bước 4.2**: Sau khi mở Dockerfile, bạn phải viết nó như sau.
```docker
FROM ubuntu:latest
MAINTAINER Sahiti (email@domain.com)
RUN apt-get update
RUN apt-get install -y nginx
ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]
EXPOSE 80
```
* FROM:  Chỉ định hình ảnh phải được tải xuống
* MAINTAINER: Siêu dữ liệu của chủ sở hữu image
* RUN: Chỉ định các lệnh được thực thi
* ENTRYPOINT:  Chỉ định lệnh sẽ được thực thi đầu tiên
* EXPOSE:  Chỉ định cổng tiếp xúc với container

**Bước 4.3**: Khi bạn đã hoàn tất, chỉ cần lưu tệp.

**Bước 5**: Xây dựng Dockerfile bằng lệnh dưới đây.
> docker build .

** “.” được sử dụng để xây dựng Dockerfile trong thư mục hiện tại **

**Bước 6**: Sau khi lệnh trên đã được thực hiện, docker image tương ứng sẽ được tạo. Để kiểm tra xem Docker Image có được tạo hay không, hãy sử dụng lệnh sau.
> docker images

![](https://images.viblo.asia/16327cf6-417c-41d9-bc80-4189a1f330b1.png)

**Bước 7**: Bây giờ để tạo một container dựa trên image này, bạn phải chạy lệnh sau:
> docker run -it -p port_number -d image_id

Trong đó -it là để đảm bảo container tương tác, -p  là để chuyển tiếp cổng và -d để chạy daemon trong nền.
![](https://images.viblo.asia/8c2503b8-7a94-472a-86e1-0393628497d8.png)

**Bước 8**:  Bây giờ bạn có thể kiểm tra container đã tạo bằng cách sử dụng lệnh sau:
> docker ps

![](https://images.viblo.asia/db2b3af2-4cf5-47d6-bf2b-7b694646f3a1.png)


Với điều này, chúng tôi kết thúc blog này.  Tôi hy vọng bạn đã thích bài viết này.

Nguồn: [Edureka](https://www.edureka.co/blog/docker-explained/)