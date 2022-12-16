Link bài viết gốc - [Những cuốn sách nên đọc để trở thành DevOps cho người mới bắt đầu](https://devopsvn.tech/devops/nhung-cuon-sach-nen-doc-tro-thanh-devops-cho-nguoi-moi-bat-dau)

![](https://images.viblo.asia/b00d1c5a-40da-4417-8db3-1c188abb5a22.png)

## Giới thiệu!

Trong bài này mình chỉ muốn giới thiệu tới các bạn những cuốn sách mà mình đã đọc để từ một Full-stack Developer trở thành DevOps và Cloud Engineer. Và mình cũng sẽ chia sẻ về kinh nghiệm học tập của mình, và mong có thể đem tới cho các bạn chưa biết gì một con đường học tập để trở thành DevOps Engineer.

Những cuốn sách mà mình giới thiệu sẽ đi từ cơ bản lên nâng cao, mình sẽ nói qua những thứ mà chúng ta cần nắm để bắt đầu trên hành trình trở thành một DevOps Engineer.

## Basic
Đầu tiên, thứ căn bản nhất mà chúng ta cần phải nắm đó là Linux, không cần phải trở thành master linux (vì không ai có thể tự nhận mình là master về linux được) mà ta chỉ cần hiểu rõ về Linux là gì, Linux với Ubuntu hay Centos khác nhau cái gì, hệ thống file của Linux và những câu command line đơn giản.

Để tìm hiểu về linux cho người chưa biết gì, mình giới thiệu các bạn cuốn sách này.

![image.png](https://images.viblo.asia/d7337c00-fe45-4a9c-8c44-d2d6336d75ee.png)

*<div align="center">[Linux for Beginners](https://www.amazon.com/Linux-Beginners-Introduction-Operating-Command-ebook/dp/B00HNC1AXY)</div>*

Cuốn sách này sẽ chỉ cho các bạn những thứ cơ bản nhất về linux, khác biệt giữa linux và ubuntu, hệ thống file của linux ra sao, những câu lệnh command line nào là cần thiết, cách tạo và quản lý user trên linux.

Nếu các bạn muốn tìm hiểu sâu hơn về linux thì mình giới thiệu cuốn này.

![image.png](https://images.viblo.asia/62715207-c931-449a-9754-82a7ca985e97.png)

*<div align="center">[Ubuntu Linux Unleashed 2021 Edition](https://www.amazon.com/Ubuntu-Linux-Unleashed-2021-14th/dp/0136778852)</div>*

## The first step
Sau khi ta đã tìm hiểu xong cơ bản về hệ điều hành linux, thì bước tiếp theo ta cần học là cách để chạy chương trình của ta trên các hệ điều hành khác nhau, đặc biệt là linux.

Ta cần tìm hiểu cơ bản về nodejs, java hoặc .NET, nhưng lưu ý là ta không cần phải học về cách lập trình của ngôn ngữ mà chỉ cần tìm hiểu về cách chạy, install thư viện và build code của những ngôn ngữ này.

Ví dụ đối với nodejs, ta chỉ cần tìm hiểu cách cài nodejs, cách chạy nodejs dùng pm2, cách cài các thư viện của nodejs dùng npm. Còn đối với java ta cần tìm hiểu cách java chạy, cách tải thư viện và build source code dùng maven.

Sau đó để ta có thể chạy các chương trình khác nhau dễ dàng nhất có thể thì ta phải tìm hiểu về container và docker. Để tìm hiểu cơ bản về Docker, mình giới thiệu mọi người cuốn này.

![image.png](https://images.viblo.asia/3d686ba6-71c7-4579-9ded-5bd6c7d1f459.png)

*<div align="center">[Docker in Action, Second Edition](https://www.manning.com/books/docker-in-action-second-edition)</div>*

Trong cuốn này nó sẽ chỉ cho ta những thứ cơ bản nhất về Docker và cách chạy container, cách build code thành container image, cách xài docker-compose, cách tự dựng docker registry để tự host container image của ta. Sau khi đọc xong các bạn sẽ có cái nhìn tổng quan hơn về cách dùng docker để chạy chương trình của ta trên các hệ điều hành khác nhau.

## Step on the road to become a DevOps
Sau khi học xong và hiểu cơ bản về linux và docker, bây giờ các bạn có thể tự tin để bước chân lên con đường để trở thành một DevOps Engineer. Thứ tiếp theo ta cần tìm hiểu là cách tự động delivery sản phẩm hoặc chương trình của chúng ta tới người dùng một cách dễ dàng nhất có thể. Cách để làm việc đó người ta gọi là CI/CD, để tìm hiểu đơn giản về CI/CD mình giới thiệu các bạn cuốn này.

![image.png](https://images.viblo.asia/727a06c7-7339-4416-81bb-b69137787f0b.png)

*<div align="center">[Continuous Delivery with Docker and Jenkins](https://www.amazon.com/Continuous-Delivery-Docker-Jenkins-Delivering/dp/1787125238)</div>*

Cuốn này sẽ chỉ cho ta những thứ cần thiết để thiết lập luồng CI/CD cho chương trình của ta, tìm hiểu cơ bản về Jenkins, kiến trúc của jenkins, cách cài đặt và thiết lập jenkins, cách sử dụng jenkins với docker.

Và song song với việc học về CI/CD, ta cũng cần tìm hiểu về **Container Orchestration**. Đây là cách vận hành và quản lý hàng ngàn container trên môi trường sản phẩm thực tế mà khách hàng của ta đang sử dụng, ta sẽ tìm hiểu về kubernetes và đây là cuốn mình đã đọc.

![image.png](https://images.viblo.asia/c14ae7a0-c8d3-41b4-a004-96368ecdfb3e.png)

*<div align="center">[Kubernetes in Action, Second Edition](https://www.manning.com/books/kubernetes-in-action-second-edition)</div>*

Trong cuốn này nó sẽ giải thích cho ta mọi thứ ta cần biết về kubernetes, đây là một cuốn sách cực kì hay. Ta sẽ tìm hiểu về kubernetes là gì, cách dùng nó để chạy và quản lý container, cách chạy cả trăm container một lúc, triển khai ứng dụng với thời gian downtime gần như bằng 0, các best pratice về cách dùng kubernetes để triển khai ứng dụng.

Nếu các bạn muốn đọc bản tiếng việt thì có thể đọc series của mình: [Kubernetes Series](https://viblo.asia/s/kubernetes-series-bq5QL8QGlD8). Đây là series mình tham khảo từ cuốn trên và thêm cách hiểu của mình vào đó.

Và nhớ là thực hành và thực hành càng nhiều càng tốt về CI/CD và Kubernetes.

## Middle
Nếu đọc xong những cuốn sách trên và thực hành nhiều thì bây giờ các bạn có thể tự tin nói mình là một Fresher DevOps rồi. Thứ tiếp theo ta cần học là cách vận dụng những thứ trên vào thực tế, tuy đây là việc rất khó nhưng mình cũng có hai cuốn sách sau để giới thiệu tới mọi người.

Đầu tiên là cuốn **Managing Kubernetes**.

![image.png](https://images.viblo.asia/47dd3c29-0b0d-4199-bb79-7539c5b72a1b.png)

*<div align="center">[Managing Kubernetes](https://www.oreilly.com/library/view/managing-kubernetes/9781492033905)</div>*

Đây là cuốn sẽ chỉ cho ta cách vận hành kubernetes trên môi trường production, cách cài kubernetes trên môi trường production thế nào, quản lý cụm kubernetes của ta thế nào, cách backup và restore nó ra sao.

Thứ hai là cuốn **Kubernetes Best Practices - Blueprints for Building Successful Applications on Kubernetes**.

![image.png](https://images.viblo.asia/47a9fa76-28ac-4595-8c5d-2bee20ce7ea7.png)

*<div align="center">[Kubernetes Best Practices](https://www.oreilly.com/library/view/kubernetes-best-practices/9781492056461)</div>*

Đây là cuốn sách sẽ mang tới cho các bạn rất nhiều ví dụ thực tế, cách cài rất nhiều ứng dụng trên môi trường kubernetes, cách monitoring ứng dụng.

## Become a Good DevOps
Có cách nào để khiến giá trị của ta tốt hơn so với các ứng viên DevOps khác không? Theo quan điểm mình, để giá trị của ta có thể tốt hơn so với các ứng viên DevOps còn lại, ta cần phải biết về Cloud. Tương lai sẽ sân chơi của là Cloud.

Để học Cloud thì ta nên chọn các nhà cung cấp lớn nhất và nhiều người xài nhất, ở thời điểm hiện tại mình viết bài này thì Cloud nổi nhất là AWS, và mình cũng rất thích AWS.

Đế bắt đầu với Cloud thì mình giới thiệu các bạn hai cuốn sách và một khóa học trên Udemy. Đầu tiên là cuốn.

![image.png](https://images.viblo.asia/2addbfdb-9663-4175-ac95-3a8ce024eaef.png)

*<div align="center">[Amazon Web Services in Action, Second Edition](https://www.manning.com/books/amazon-web-services-in-action-second-edition)</div>*

Xuyên suốt cuốn này ta sẽ được tìm hiểu về AWS là gì, các dịch vụ cơ bản của AWS, cách sử dụng nó làm sao, cách thiết kế một hệ thống chịu tải cao, và cách thiết kế hệ thống dễ dàng mở rộng trên AWS.

Tiếp theo là khóa học dạy ta cách lấy chứng chỉ của AWS.

![image.png](https://images.viblo.asia/20e7da77-b740-4b7b-9ba4-3061ae84b028.png)

*<div align="center">[Ultimate AWS Certified Solutions Architect Associate 2022](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/)</div>*

Khóa này của một giảng viên rất nổi tiếng là Stephane Maarek, trong khóa này anh sẽ dạy cho ta toàn bộ những thứ cần thiết về AWS để đi thi lấy chứng chỉ. Tuy là khóa học dạy thi chứng chỉ nhưng sau khi học xong thì ta sẽ có cái nhìn tổng quan nhất về AWS.

Và tiếp theo là cuốn về Infrastructure as Code.

![image.png](https://images.viblo.asia/9195638a-64b7-41af-aabd-a3b7a14870fa.png)

*<div align="center">[Terraform in Action](https://www.manning.com/books/terraform-in-action)</div>*

Thông thường khi làm việc với AWS ta sẽ dùng một công cụ khác để hỗ trợ việc tạo hạ tầng trên AWS, và công cụ phổ biến nhất thời điểm mình viết là Terraform, trong cuốn trên nó sẽ chỉ cho ta toàn bộ những thứ cần thiết về Terraform và cách dùng nó với AWS. Hoặc nếu các bạn muốn đọc bằng tiếng Việt thì có thể xem series của mình [Terraform Series](https://viblo.asia/s/terraform-series-3m5WB8JvlO7).

## Keep Learning
Nếu các bạn có thể hoàn thành được toàn bộ những thứ trên thì chúc mừng, bạn đã trở thành một DevOps Engineer rồi đấy 😁. Nhưng con đường học tập thì không bao giờ kết thúc, để có nhiều kiến thức hơn thì ta phải học và học. Đây là những cuốn mình đang xem để nâng cao kiến thức.

Đầu tiên là một cuốn về monitoring, tất nhiên là trong quá trình vận hành của ta thì việc monitoring là không thể thiếu.

![image.png](https://images.viblo.asia/7e6bdb11-6a41-4203-9316-7a5e54ca3369.png)

*<div align="center">[Monitoring with Prometheus](https://www.amazon.com/Monitoring-Prometheus-James-Turnbull-ebook/dp/B07DPH8MN9)</div>*

Cuốn này sẽ dạy cho ta về cách sử dụng Prometheus để monitoring hệ thống, cách xài Grafana để vẽ chart biểu diễn tình trạng của hệ thống.

Tiếp theo là về Search Engine.

![image.png](https://images.viblo.asia/88092ab9-b461-4baf-84b0-cbf05770a379.png)

*<div align="center">[Elasticsearch in Action](https://www.manning.com/books/elasticsearch-in-action)</div>*

Đây là cuốn sẽ dạy ta về Elasticsearch, tuy trong cuốn này nó dạy về Elasticsearch 5.x, nhưng từ đó ta có thể google thêm để tìm hiểu về cách hoạt động của Elasticsearch 7.x, việc này sẽ đem lại cho ta cái nhìn chi tiết hơn về nó.

Cuối cùng là cuốn về Event Streaming.

![image.png](https://images.viblo.asia/9a3bee69-ee47-4b17-983e-d99d5216f4d9.png)

*<div align="center">[Kafka: The Definitive Guide](https://www.oreilly.com/library/view/kafka-the-definitive/9781491936153/)</div>*

Khi ta làm việc với hệ thống lớn thì Event Streaming là thứ không thể thiếu, và Kafka là một trong những công cụ mạnh nhất để làm việc này.

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Ở trên là những cuốn mình đã đọc và đang đọc để từ một Full-stack developer trở thành một DevOps và Cloud Engineer, mong rằng nó sẽ hữu ích với mọi người. DevOps và Cloud là một mảng rất rộng, tuy ta không bao giờ có thể tìm hiểu hết về nó nhưng cứ keep learning nhé mọi người 😁.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).