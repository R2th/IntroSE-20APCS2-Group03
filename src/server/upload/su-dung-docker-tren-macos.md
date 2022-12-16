## **1. Docker dùng để làm gì?**
- Docker là công cụ giúp chúng ta chạy ứng dụng dễ dàng hơn trong các container. Các container hoạt động riêng biệt và được bảo vệ như các máy ảo nhưng chúng lại nhỏ hơn nhiều so với các máy ảo vì chúng chạy trên hệ thống host machine.
- Là một iOS developer, tại sao chúng ta lại muốn sử dụng Docker? Để tránh các vấn đề về version, chạy các version của các hệ điều hành khác nhau, ngôn ngữ lập trình khác nhau. Nói một cách đơn giản là chúng ta có thể sử dụng trên tất cả môi trường cài đặt khác nhau của từng người sử dụng.
![](https://images.viblo.asia/c63b8afc-4a7c-4fa1-9e44-073eb2be500d.png)
- Ở bài viết này chúng ta sẽ cùng nhau trao đổi một số thuật ngữ trong Docker, một vài commands để khởi tạo, kiểm tra, xoá bỏ các containers, các networks , data volumes layer.
## **2. Cài đặt Docker?**
- Docker rất thông dụng và phổ biến cho người dùng Linux. Chạy Docker trên macOS trước đây rất phức tạp, nhưng với sự ra mắt của Docker for Mac vào 07/2016 thì mọi việc đã trở nên rất đơn giản. 
- Phiên bản community(CE) là phiên bản miễn phí, nên chúng ta chỉ cần đăng ký account là có thể download và install. Cho đến khi biểu tượng cá voi xuất hiện trên status bar là việc cài đặt đã hoàn thành:D.
![](https://images.viblo.asia/6aba039e-5155-4d4c-ad5f-cb38ab9d5e48.png)
## **3. Các thuật ngữ Docker và cách quản lý của Docker.**
- Trong phần này chúng ta sẽ điểm qua vài thuật ngữ của Docker và làm quen cách sử dụng Unix command cho các quản lý đơn giản.
- Cùng mở Terminal lên và gõ thử dòng lệnh sau để xem cách Docker hoạt động:
```swift
docker run hello-world
```
- Từ khoá để khởi chạy docker command là "**docker run**" - đây cũng là cách đơn giản nhất để chỉ địng Docker images để hoạt động. Nếu image không nằm trên host system của bạn, docker sẽ cố pull nó về từ Docker image registry mặc định. Để dễ hiểu thì từ image - tương tựu như disk images mà bạn download như file có đuôi `.dmg`. Một Docker image là một app và bạn sẽ chạy nó trên hệ thống của bạn trong Docker container.
- Output của coomain sẽ giải thích cái Docker vừa làm:
![](https://images.viblo.asia/5d25be84-536f-4ffc-943e-330ae38a23cc.png)
- Chúng ta sẽ cùng giải thích những gì terminal vừa thông báo nhé:
    - Mặc dù bạn chỉ yêu cầu mỗi hello-world, Docker đã tìm kiếm bản `hello-world-lastest`- `lastest` là một tag version. Nếu bạn không chỉ định một version cụ thể. Docker sẽ chỉ định cho bạn version lastest.
    - Bởi vì image không nằm trên hệ thống của bạn, Docker sẽ pull nó về từ "**library/hello-world**" - nằm trên image registry Docker Hub mặc định. Chúng ta sẽ cùng ghé thăm địa chỉ này trong những phần sau.
    - **Docker client** và **Docker daemon** là các phần của Docker Engine - thử mà ứng dụng client server đang hoạt động trên máy Mac. Deamon là phần server, và client là phần docker command line interface (**CLI**). Client sẽ cung cấp thông tin cho deamon sử dụng engine **REST API**.
![](https://images.viblo.asia/78f32276-b77b-439f-a47a-c10481801afb.png)
- Có nhiều loại Docker images như:
    - **OS**: các phiên bản Linux như Ubuntu, Alpine.
    - **Programing languages**: Swift, Ruby, PHP, Haskell, Python, Java, Golang, etc.
    - **Databases**: MYSQL, CouchDB, PostgreSQL, Oracke, IBM db2, etc.
    - **Application framework**: Node.js, Flask, Kitura, Tomcat etc.
    - **Web Server**: Nginx, Apache etc.
- Một Docker image bao gồm các layer. Các lower layer (OS hoặc programing language) được sử dụng bởi các higher layer(API hoặc app). Khởi chạy image sẽ tạo ra các container.Chúng ta có thể chạy các image giống nhau trên đồng loại container mà tốn ít bộ nhớ. Mỗi container chỉ là các read-write layer, và chỉ có duy nhất một bản copy của image tồn tại trong hệ thống của bạn.
![](https://images.viblo.asia/658609ec-c790-43dc-b1fa-680514fd1dbe.png)
## **4. Sử dụng Docker commands.**
- Bây giờ chúng ta sẽ cùng thực hành và theo dõi Docker đã tạo ra gì trên hệ thống cuả bạn.
    - First, những thông tin chung về Docker(**CLI**): Docker commands tương tự như Unix commands nhưng chúng bắt đầu với từ khoá `docker` như là `docker run`, `docker image`, `docker container`, `docker network`.
    - Hầu hết các command có vài options và nhiều options cho các cách viết tắt. Cú pháp đầy đủ của option là `--something` với 2 dấu gạch, ví dụ như `--name`, hoặc `--publis`.
    - Hầu hết các option yêu cầu giá trị, như là `-p 8080:8080` hoặc `--name kitura`. Một số ít không có gía trị đi kem và có thể chạy cùng nhau như `-it` hoặc `-ti` viết tắt cho `--interactive --tty`. Chúng ta phải chỉ định các option calue ngay sau  option name.
    - Nhiều option value gắn liền một số thứ trên host machine với một số thứ trong container.Trong trường hợp cụ thể là host machine chính là máy mac của bạn.
- Chúng ta cùng thực hành một số câu lệnh sau:
`docker images`
- Chúng ta nhận được out put như sau: (chúng ta sẽ nhận được các IMAGE ID và CREATED khác nhau).
    
![](https://images.viblo.asia/52e5d3c5-5965-4d57-8be8-d599ddcbc1a8.png)

- Cách để kiểm tra các container có trong system là: `docker ps -a`. Docker khởi tạo ID và name cho contaner

![](https://images.viblo.asia/9860f47c-244c-4809-ad4a-005ff59675f2.png)

- Như trên chúng ta đã cùng làm quen vài kiến thức + ví dụ  cơ bản, hãy bắt đầu từ từ và có thời gian để ôn lại kiến thức trước khi chúng ta bắt đầu khám phá những kiến thức sâu hơn về Docker. Hẹn gặp lại các bạn trong phần tiếp theo của Docker :D