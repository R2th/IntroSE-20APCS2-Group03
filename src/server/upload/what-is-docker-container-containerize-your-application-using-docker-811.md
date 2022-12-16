Trong blog Docker Container này, tôi sẽ thảo luận về Docker Container là gì và nó hoạt động như thế nào. Phần lớn, chúng tôi sẽ tập trung vào các trường hợp Hands-on và use-cases của Docker.

Tôi đã liệt kê các chủ đề cho blog Docker Container này:

* Why We Need Docker Containers?
* How Docker Containers work?
* Use-Cases of Docker Container

## 1. Why We Need Docker Containers?
Tôi vẫn nhớ không lầm, tôi đang thực hiện một dự án. Trong dự án đó, chúng tôi đã tuân theo kiến trúc microservice. Đối với những bạn chưa biết microservice là gì, đừng lo lắng, tôi sẽ giới thiệu cho các bạn về nó.

Ý tưởng đằng sau microservices là một số loại ứng dụng nhất định sẽ trở nên dễ dàng hơn trong việc xây dựng và bảo trì khi chúng được chia thành các phần nhỏ hơn, có thể ghép lại và hoạt động cùng nhau. Mỗi thành phần được phát triển riêng biệt và ứng dụng sau đó chỉ đơn giản là tổng các thành phần cấu thành của nó.

Hãy xem xét ví dụ dưới đây:
![image.png](https://images.viblo.asia/fb32f018-482e-4576-95b1-5cbc1ac9d333.png)

Trong sơ đồ trên có một cửa hàng trực tuyến với các microservices riêng biệt cho tài khoản người dùng, danh mục sản phẩm, xử lý đơn hàng và giỏ hàng.

Kiến trúc này có rất nhiều lợi ích:
* Ngay cả khi một trong những microservice của bạn bị lỗi, toàn bộ ứng dụng của bạn phần lớn không bị ảnh hưởng.
* Nó dễ dàng hơn để quản lý

Có rất nhiều lợi ích khác nữa, tôi sẽ không đi sâu chi tiết về microservices trong bài đăng này. Tuy nhiên, tôi cũng sẽ sớm tạo ra một vài blog trên microservices.

Trong kiến trúc này, chúng tôi đã sử dụng Máy ảo CentOS. Các Máy ảo đó được cấu hình bằng cách viết các đoạn mã dài. Việc cấu hình các máy ảo đó không phải là vấn đề duy nhất.

Việc phát triển các ứng dụng như vậy yêu cầu khởi động một số dịch vụ nhỏ trong một máy. Vì vậy, nếu bạn đang khởi động năm trong số các dịch vụ đó, bạn cần có năm máy ảo trên máy đó. Hãy xem xét sơ đồ dưới đây:
![image.png](https://images.viblo.asia/d022d96b-eb7c-4f06-a69d-4f1db9ce3923.png)

Ứng dụng hoạt động trên máy tính xách tay của nhà phát triển nhưng không hoạt động trong quá trình testing hoặc production. Điều này có thể là do không giữ một môi trường máy tính nhất quán. Hãy xem xét sơ đồ dưới đây:
![image.png](https://images.viblo.asia/e420cc93-cc77-4f0c-b0b7-0397cee0d1be.png)

Ngoài ra còn có nhiều vấn đề khác ngoài vấn đề trên, nhưng tôi cảm thấy, những vấn đề này đủ để tôi giải thích cho bạn sự cần thiết của Docker Containers.

Vì vậy, hãy tưởng tượng nếu tôi cung cấp 8 GB RAM cho tất cả các máy ảo của mình và tôi có 5 microservices đang chạy trên các Máy ảo khác nhau. Trong trường hợp đó, các máy ảo này sẽ yêu cầu 40 GB RAM. Vâng, bây giờ tôi yêu cầu cấu hình của máy chủ của tôi rất cao, gần 44 GB RAM phải có trong máy chủ của tôi. Rõ ràng, đây không phải là một giải pháp bền vững cho một kiến trúc như vậy bởi vì, tôi đang lãng phí rất nhiều tài nguyên ở đây. 

Tốt thôi, tôi có rất nhiều tài nguyên để lãng phí, nhưng tôi vẫn gặp vấn đề không nhất quán trong vòng đời phân phối phần mềm (SDLC) của mình. Tôi phải cấu hình các máy ảo này trong môi trường test như trong môi trường production. Ở đâu đó trong quá trình đó, một số phần mềm không được cập nhật trong máy chủ testing và nhóm Dev đang sử dụng phiên bản cập nhật của phần mềm. Điều này dẫn đến xung đột.

Điều gì sẽ xảy ra nếu tôi đang sử dụng 100 máy ảo, thì việc cấu hình từng máy ảo sẽ mất rất nhiều thời gian và đồng thời nó cũng dễ bị lỗi.

Bây giờ, chúng ta hãy hiểu Docker Container là gì và nó hoạt động như thế nào cũng như cách nó giải quyết vấn đề của tôi.

**What is a Docker Container?**

Để tìm hiểu Docker Container là gì, bạn hãy đọc [bog ở phần trước](https://viblo.asia/p/what-is-docker-docker-container-a-deep-dive-into-docker-311-GrLZDJyB5k0) để hiểu rõ hơn về Docker Container.

## 2. How Docker Containers work? 
Sơ đồ dưới đây về cơ bản là một cách sử dụng Docker. Và tôi giả định rằng, bạn có ý tưởng về Docker Image và Dockerfile. 
![image.png](https://images.viblo.asia/985bedfd-9a29-4e5f-a515-7c4450e7f62a.png)

Các bạn, tôi biết sơ đồ trông hơi phức tạp, nhưng hãy tin tôi rằng nó không phức tạp như vậy đâu. Dưới đây là giải thích của sơ đồ, ngay cả sau đó bạn cảm thấy nó khó hiểu, bạn có thể bình luận nghi ngờ của bạn, tôi sẽ giải quyết những câu hỏi đó càng sớm càng tốt.

* Trước tiên, một nhà phát triển sẽ viết code dự án trong một file Docker và sau đó xây dựng một image từ tệp đó.
* Image này sẽ chứa toàn bộ mã dự án.
* Bây giờ, bạn có thể chạy Docker Image này để tạo bao nhiêu container tùy thích. 
* Docker Image này có thể được tải lên DockerHub (Về cơ bản, nó là một kho lưu trữ đám mây cho Docker Image của bạn, bạn có thể giữ nó ở chế độ công khai hoặc riêng tư). 
* Docker Image này trên DockerHub, có thể được kéo bởi các nhóm khác như QA hoặc Prod.


Điều này không chỉ ngăn chặn sự lãng phí tài nguyên mà còn đảm bảo rằng môi trường máy tính có trong máy tính xách tay của Nhà phát triển cũng được nhân rộng trong các nhóm khác. Tôi cảm thấy bây giờ, tôi không cần phải nói với bạn tại sao chúng tôi cần Docker.

Đây là một cách để sử dụng nó, tôi đoán các bạn phải tò mò muốn biết tôi đã sử dụng Docker như thế nào để giải quyết vấn đề microservices của mình. Hãy để tôi cung cấp cho bạn một cái nhìn tổng quan.
![image.png](https://images.viblo.asia/b9499dd4-a4bf-4ab4-a16c-4ca121337d42.png)

Dưới đây là giải thích của sơ đồ:

* Đầu tiên, chúng tôi đã viết các yêu cầu phức tạp trong Dockerfile.
* Sau đó, chúng tôi đã đẩy nó lên GitHub.
* Sau đó, chúng tôi sử dụng máy chủ CI (Jenkins).
* Máy chủ Jenkins này sẽ kéo nó xuống khỏi Git và xây dựng môi trường chính xác. Điều này sẽ được sử dụng trong máy chủ Productioncũng như máy chủ Test.
* Chúng tôi đã triển khai nó ra môi trường staging (Nó đề cập đến việc triển khai phần mềm của bạn trên các máy chủ cho mục đích testing, trước khi triển khai chúng hoàn toàn vào môi trường production) cho Testers.
* Về cơ bản, chúng tôi đã đưa chính xác những gì chúng tôi có trong Development, Testing và Staging vào Production. 

## 3. Use-Cases of Docker Container
Tôi giả sử bạn đã cài đặt Docker . Tôi sẽ sử dụng Docker Compose trong bài đăng này, dưới đây tôi đã đưa ra một giới thiệu nhỏ về Docker Compose.

**Docker Compose:**  Nó là một công cụ để xác định và chạy các ứng dụng Docker nhiều container. Với Docker Compose, bạn có thể sử dụng tệp Compose để cấu hình các dịch vụ của ứng dụng. Sau đó, bằng một lệnh duy nhất, bạn có thể tạo và khởi động tất cả các dịch vụ từ cấu hình của mình.

Giả sử bạn có nhiều ứng dụng trong các container khác nhau và tất cả các containers đó được liên kết với nhau. Vì vậy, bạn không muốn thực thi từng container đó một. Tuy nhiên, bạn muốn chạy các containers đó bằng một lệnh duy nhất. Đó là nơi Docker Compose xuất hiện trong bức tranh. Với nó, bạn có thể chạy nhiều ứng dụng trong các containers khác nhau bằng một lệnh duy nhất. Ví dụ: `docker-compose up`

**Ví dụ:** Hãy tưởng tượng bạn có các containers khác nhau, một container đang chạy ứng dụng web, một container khác đang chạy postgres và một container khác đang chạy redis, trong một tệp YAML. Đó được gọi là docker compose file, từ đó bạn có thể chạy các container này bằng một lệnh duy nhất.

![image.png](https://images.viblo.asia/0e076f86-400b-49f6-b4bb-949556b87fbb.png)

Hãy để chúng tôi lấy một ví dụ nữa:

Giả sử bạn muốn xuất bản một blog, bạn sẽ sử dụng CMS (Content Management System) và wordpress là CMS được sử dụng rộng rãi nhất. Về cơ bản, bạn cần một container cho WordPress và bạn cần thêm một container nữa làm MySQL cho back end, container MySQL đó phải được liên kết với container wordpress. Chúng ta cũng cần một container nữa cho Php Myadmin sẽ được liên kết với cơ sở dữ liệu MySQL, về cơ bản, nó được sử dụng để truy cập cơ sở dữ liệu MySQL.

Làm thế nào về tôi thực hiện ví dụ nêu trên một cách thực tế.

**Các bước liên quan:**
1. **Cài đặt Docker Compose**
1. **Cài đặt WordPress** :  Chúng tôi sẽ sử dụng WordPress và  MariaDB Docker images chính thức . 
1. **Cài đặt MariaDB**:  Đây là một trong những máy chủ cơ sở dữ liệu phổ biến nhất trên thế giới. Nó được tạo ra bởi các nhà phát triển ban đầu của MySQL. MariaDB được phát triển dưới dạng phần mềm mã nguồn mở và như một cơ sở dữ liệu quan hệ, nó cung cấp giao diện SQL để truy cập dữ liệu.
1. **Cài đặt PhpMyAdmin** : Đây là một công cụ phần mềm miễn phí được viết bằng PHP, nhằm xử lý việc quản trị MySQL qua Web. 
1. **Tạo trang web WordPress**:


Bắt đầu nào!

**Cài đặt Docker Compose**

Cài đặt Python Pip trước:
> sudo apt-get install python-pip

![image.png](https://images.viblo.asia/f2e52daf-d79c-47bc-a434-81fc54c60bfc.png)

Bây giờ, bạn có thể cài đặt Docker Compose:
> sudo pip cài đặt docker -omp

![image.png](https://images.viblo.asia/7c4c5e9b-cdba-4dd0-aa4f-33bae1a57dd7.png)

**Cài đặt WordPress**

Tạo và truy cập một thư mục wordpress:
> mkdir wordpress
> 
> cd wordpress /

![image.png](https://images.viblo.asia/f2033418-393e-4489-885e-973344fc0ffa.png)

Trong thư mục này, hãy tạo tệp Docker Compose YAML, sau đó chỉnh sửa nó bằng gedit:
> sudo gedit docker-compo.yml

![image.png](https://images.viblo.asia/ef05e492-e5b6-4d18-82b5-e9bcff477ffd.png)

Dán các dòng mã dưới đây vào tệp yaml đó:
```json
wordpress:
    image: wordpress
    links:
        - wordpress_db:mysql
    ports:
        - 8080:80
 
wordpress_db:
    image: mariadb
    environment:
        MYSQL_ROOT_PASSWORD: edureka
        
phpmyadmin:
    image: corbinu/docker-phpmyadmin
    links:
        - wordpress_db:mysql
    ports:
        - 8181:80
    environment:
        MYSQL_USERNAME: root
        MYSQL_ROOT_PASSWORD: edureka
```
Tôi biết bạn muốn tôi giải thích mã này, vì vậy những gì tôi sẽ làm, tôi sẽ lấy các phần nhỏ của mã này và giải thích cho bạn những gì đang xảy ra.
![image.png](https://images.viblo.asia/ee9939d7-5c4e-47b9-b3fa-f78cdabd32ba.png)
Thao tác này sẽ đặt một biến môi trường bên trong wordpress_db container có tên MYSQL_ROOT_PASSWORD với mật khẩu mong muốn của bạn. MariaDB Docker image được cấu hình để kiểm tra biến môi trường này khi nó khởi động và sẽ quản lý việc thiết lập DB với tài khoản gốc với mật khẩu được xác định là MYSQL_ROOT_PASSWORD.

![image.png](https://images.viblo.asia/72929540-3aff-4b3b-b7f0-dd9a0426d24b.png)
Số cổng đầu tiên là số cổng trên máy chủ và số cổng thứ hai là cổng bên trong container. Vì vậy, cấu hình này chuyển tiếp các yêu cầu trên cổng 8080 của máy chủ tới cổng máy chủ web mặc định 80 bên trong container.
![image.png](https://images.viblo.asia/d50aff3a-e3c2-4059-b317-4d1643317184.png)

Đoạn này lấy docker-phpmyadmin bởi thành viên cộng đồng corbinu, liên kết nó với wordpress_db container của chúng tôi với tên mysql (có nghĩa là từ bên trong phpmyadmin container tham chiếu đến tên máy chủ mysql sẽ được chuyển tiếp đến wordpress_db container của chúng tôi), hiển thị cổng 80 của nó trên cổng 8181 của hệ thống máy chủ lưu trữ, và cuối cùng đặt một vài biến môi trường với username và password MariaDB của chúng tôi. Image này không tự động lấy biến môi trường MYSQL_ROOT_PASSWORD từ môi trường của wordpress_db container, giống như wordpress image. Chúng tôi thực sự phải sao chép dòng MYSQL_ROOT_PASSWORD: edureka từ wordpress_db container và đặt username thành root.

Bây giờ hãy bắt đầu nhóm ứng dụng:
> docker-compose up -d

![image.png](https://images.viblo.asia/5a261280-3f17-4106-8e0c-48ee517a1555.png)

Đó là tất cả những gì bạn phải làm. Bạn có thể thêm bao nhiêu container tùy thích theo cách này và liên kết tất cả chúng lại theo bất kỳ cách nào bạn muốn.

Bây giờ, trong trình duyệt, hãy chuyển đến cổng 8080, sử dụng IP công cộng hoặc tên máy chủ của bạn, như được hiển thị bên dưới: localhost: 8080

![image.png](https://images.viblo.asia/0dcc54b0-80f4-47b9-9645-edaf26842ee1.png)

Điền vào biểu mẫu này và nhấp vào cài đặt WordPress.
![image.png](https://images.viblo.asia/f7a2e5aa-f005-422e-84ce-ec51944cb1f6.png)

Sau khi hoàn tất, hãy truy cập lại địa chỉ IP của máy chủ của bạn (lần này sử dụng cổng 8181, ví dụ: localhost: 8181). Bạn sẽ được chào đón bởi màn hình đăng nhập phpMyAdmin:
![image.png](https://images.viblo.asia/9bf4440c-7e89-447e-97eb-f2ed00df0362.png)

Hãy tiếp tục và đăng nhập bằng username root và password bạn đã đặt trong tệp YAML, và bạn sẽ có thể duyệt cơ sở dữ liệu của mình. Bạn sẽ nhận thấy rằng máy chủ bao gồm một cơ sở dữ liệu wordpress, chứa tất cả dữ liệu từ cài đặt WordPress của bạn.
![image.png](https://images.viblo.asia/07b1eb7c-92d4-45fa-a8ed-ef5d8a7f416d.png)

Đến đây, tôi kết thúc blog Docker Container của mình. Tôi hy vọng bạn đã thích bài viết này.

Nguồn: [Edureka](https://www.edureka.co/blog/docker-container/)