**I. Docker là gì?**

Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers (trên nền tảng ảo hóa).

Ví dụ dễ hiểu hơn: Hãy tưởng tượng bạn code một App: Gồm Database MySQL, JDK, NODEJS,...
Sau khi code và test các kiểu, bạn bắt đầu deploy nó lên server. Và vấn đề ở đây, bạn code trên window nhưng server của bạn chạy unbuntu và bắt đầu có một số thứ trên window bạn có thể dễ dàng cài, nhưng ubuntu thì bạn phải mày mò, rồi gặp lỗi khi cài, hoặc khác version,...

Thế có cách nào chỉ việc vác ứng dụng và chạy chứ không phải đi cài một mớ hỗn độn kia không? Câu trả lời là docker.

Docker sẽ thực hiện việc gom các phần cần thiết thành một thứ gọi là container.

**II. Thế Container trong Docker là gì?**

Khái niệm container: Các containers cho phép lập trình viên đóng gói một ứng dụng với tất cả các phần cần thiết, chẳng hạn như thư viện và các phụ thuộc khác, và gói tất cả ra dưới dạng một package. 

Bằng cách đó, nhờ vào container, ứng dụng sẽ chạy trên mọi máy Linux khác bất kể mọi cài đặt tùy chỉnh mà máy có thể có khác với máy được sử dụng để viết code.

Ví dụ dễ hiểu hơn: Bạn có một cái tủ đông lạnh, bạn câu cá Ayu (Loài cá ở Nhật bản và chỉ đánh bắt vào mùa hè - theo anime :sweat_smile:) và nhét vào cái tủ đông lạnh đó. Thì dù mùa hè có qua đi thì bạn có muốn ăn thì chỉ cần và tủ đông lấy ra và bắt đầu thưởng thức.

Theo một cách nào đó, Docker khá giống virtual machine. Nhưng tại sao Docker lại phát triển, phổ biến nhanh chóng? Đây là những nguyên nhân:

Về tính dễ ứng dụng: Docker rất dễ cho mọi người sử dụng từ lập trình viên, sys admin… nó tận dụng lợi thế của container để build, test nhanh chóng. Có thể đóng gói ứng dụng trên laptop của họ và chạy trên public cloud, private cloud… Câu thần chú là “Build once, run anywhere”.

Về tốc độ: Docker container rất nhẹ và nhanh, bạn có thể tạo và chạy docker container trong vài giây.

Môi trường chạy và khả năng mở rộng: Bạn có thể chia nhỏ những chức năng của ứng dụng thành các container riêng lẻ. Ví dụng Database chạy trên một container và Redis cache có thể chạy trên một container khác trong khi ứng dụng Node.js lại chạy trên một cái khác nữa. Với Docker, rất dễ để liên kết các container với nhau để tạo thành một ứng dụng, làm cho nó dễ dàng scale, update các thành phần độc lập với nhau.

**III. Các khai niệm chính**

* Docker Engine : là thành phần chính của Docker, như một công cụ để đóng gói ứng dụng
* Docker Hub : là một “github for docker images”. Trên DockerHub có hàng ngàn public images được tạo bởi cộng đồng cho phép bạn dễ dàng tìm thấy những image mà bạn cần. Và chỉ cần pull về và sử dụng với một số config mà bạn mong muốn.
* Images: là một khuôn mẫu để tạo một container. Thường thì image sẽ dựa trên 1 image có sẵn với những tùy chỉnh thêm. Ví dụ bạn build 1 image dựa trên image Centos mẫu có sẵn để chạy Nginx và những tùy chỉnh, cấu hình để ứng dụng web của bạn có thể chạy được. Bạn có thể tự build một image riêng cho mình hoặc sử dụng những image được chia sẽ từ cộng đồng Docker Hub. Một image sẽ được build dựa trên những chỉ dẫn của Dockerfile.
* Container: là một instance của một image. Bạn có thể create, start, stop, move or delete container dựa trên Docker API hoặc Docker CLI.
* Docker Client: là một công cụ giúp người dùng giao tiếp với Docker host.
* Docker Daemon: lắng nghe các yêu cầu từ Docker Client để quản lý các đối tượng như Container, Image, Network và Volumes thông qua REST API. Các Docker Daemon cũng giao tiếp với nhau để quản lý các Docker Service.
* Dockerfile: là một tập tin bao gồm các chỉ dẫn để build một image .
* Volumes: là phần dữ liệu được tạo ra khi container được khởi tạo.

**Docker hoạt động thế nào**

![](https://images.viblo.asia/280b5f9e-33b2-443e-a78c-d583c0f85eaf.png)


Như trong hình vẽ, một hệ thống Docker được thực thi với 3 bước chính :

* **Build**.

```
Build -> Push -> Pull,Run
```

Đầu tiên chúng ta sẽ tạo một dockerfile, trong dockerfile này chính là code của chúng ta.

Dockerfile này sẽ được Build tại một máy tính đã cài đặt Docker Engine.

Sau khi build ta sẽ thu được Container, trong Container này chứa bộ thư viện và ứng dụng của chúng ta.

* **Push**.

Sau khi có được Container, chúng ta thực hiện push Container này lên đám mây và lưu trữ ở đó.

Việc push này có thể thực hiện qua môi trường mạng Internet.

* **Pull, Run**

Giả sử một máy tính muốn sử dụng Container chúng ta đã push lên đám mây (máy đã cài Docker Engine) thì bắt buộc máy phải thực hiện việc Pull container này về máy. Sau đó thực hiện Run Container này.

Đó chính là quy trình 3 bước miêu tả hoạt động của một hệ thống sử dụng Docker. Rất đơn giản và rõ ràng.

**IV. Tổng kết**

Đây là giới thiệu tổng quát để bạn có thể hiểu tổng quát về docker là gì.
Trong bài viết tuần tới mình sẽ đi sâu hơn về docker và bài example.

**Tài liệu tham khảo**

https://docs.docker.com/get-started/overview/#:~:text=Docker%20uses%20a%20client%2Dserver,to%20a%20remote%20Docker%20daemon.
https://luanbn.wordpress.com/2015/08/27/docker-part-2-cau-truc-va-quy-trinh-hoat-dong-cua-docker/