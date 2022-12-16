# 1. Docker để làm gì ?
Mỗi khi được join vào 1 dự án mới tinh thì điều đầu tiên chúng ta cần làm đó là setup môi trường để dev đúng không ạ. Và khi vào file readme để đọc thì ...oigioioi bao nhiêu là thứ phải cài đặt, nào là mysql, redis, nvm, elasticsearch, ... đó, như vậy là mất nguyên cả buổi sáng để setup, mà  với môi trường của từng máy tính thì sự không tương thích giữa các package cũng không giống nhau, sẽ càng làm mất thời gian hơn nữa cơ, nản :cold_sweat:. Nhưng nếu ta sử dụng docker, mọi thứ sẽ trở nên đơn giản hơn rất nhiều, chỉ cần vài lệnh đơn giản chúng ta sẽ tạo ra một môi trường có đầy đủ các config cần thiết cho dự án rồi, điều ta cần làm là bật docker lên là máy tính sẽ tự build project cho chúng ta, nghe rất thú vị phải không ạ. Bây giờ thì cùng mình vào bài viết nhé.

# 2. Docker là gì ?
Hãy cùng xem qua 1 chút về lịch sử hình thành của docker đã .

###  Containerlization

![](https://images.viblo.asia/c73f3844-7fe3-4cc4-8d9a-2bd8c0e6de5a.png)
Chúng ta đều biết được mô hình của 1 máy tính thường (hình bên trái) sẽ là :
```
Máy chủ vật lý (physical server) + hệ điều hành(operating system) + ứng dụng (application).
```
Đối với mô hình này một máy chủ chỉ cài được một OS do vậy nó mất đi nhiều lợi thế, gây lãng phí tài nguyên hệ thống, kiểu như 1 OS sẽ không dùng hết bộ nhớ, thì phần bộ nhớ còn thừa lại ko thể dùng cho việc khác được.

Để cải thiện khả năng sử dụng tài nguyên của máy tính thì công nghệ virtualization (hình bên phải) đã ra đời , thường được gọi là VMware hay Virtualbox. Công nghệ này cho phép cài đồng thời nhiều OS trên 1 máy tính, như vậy sẽ cho phép sử dụng tối đa tài nguyên của hệ thống đồng thời tận dụng được nhiều ưu thế khi sử dụng các OS khác nhau.

Tuy nhiên việc sử dụng virtualization vẫn chưa phải là tối ưu hoàn toàn, vẫn gây ra lãng phí tài nguyên hệ thống. Nguyên bắt nguồn từ việc setup 1 máy ảo, ta sẽ phải fix cứng dung lượng bộ nhớ mà máy tính sẽ cung cấp cho nó, giả sử máy tính có RAM là 8GB, ta sẽ cung cấp 4GB cho máy ảo chạy Windows, như vậy máy tính sẽ chỉ còn 4GB bộ nhớ để sử dụng cho mục đích khác dù máy ảo không sử dụng hết 4GB để hoạt động. Một vấn đề nữa đó là khởi động máy ảo khá mất thời gian.

Và thế là công nghệ containerlization đã được đưa ra để giải quyết tất cả các vấn đề trên, đồng thời nó còn sở hữu rất nhiều ưu điểm khác nữa. Với công nghệ này, ta sẽ cài đặt được nhiều máy ảo trên một máy chủ vật lý (giống với virtualization), nhưng tốt hơn ở chỗ là các máy con này (Guess OS) đều dùng chung phần nhân của máy mẹ (Host OS) và chia sẻ với nhau tài nguyên máy mẹ (hình bên dưới).
![](https://images.viblo.asia/53325d2f-751c-41ca-b56b-999686eaf689.png)

Theo đó, tài nguyên sẽ được cấp khi khi cần và cấp tùy theo nhu cầu sử dụng của máy ảo, như vậy việc tận dụng tài nguyên đã tối ưu hơn rất nhiều.

###  Container

Điểm nổi bật nhất của containerlization là nó sử dụng các container. Đó phần mềm, chương trình được Container Engine ( một công cụ ảo hóa tinh gọn được cài đặt trên host OS) tạo ra với mục đích chuyển giao phần mềm một cách đáng tin cậy giữa các môi trường máy tính khác nhau. Trong container chúng ta có thể tạo ra một môi trường độc lập với hệ thống máy chủ mẹ và chứa tất cả các cài đặt cần thiết để phần mềm có thể chạy được.

Cứ tưởng tượng là mỗi container là 1 cái tủ lạnh kín, ngoài việc dùng chung nguồn điện và chiếm 1 diện tích trong phòng ( chia sẻ chung tài nguyên máy tính ), thì mỗi chiếc tủ sẽ bảo quản các món đồ cần thiết ( các cài đặt ) ,  và các món đồ + hoạt động xảy ra trong tủ này sẽ không gây ảnh hưởng tới tủ khác ( các tiến trình trong 1 container là độc lập với container khác ). 

Với nền tảng này chúng ta có thể chuyển giao và chạy các ứng dụng dễ dàng hơn. Thay vì phải cài JDK vào máy thật để chạy Java app ( sẽ tốn tài nguyên bộ nhớ ngay cả khi bạn không sử dụng nó ), bạn hoàn toàn có thể kiếm hoặc tạo ra 1 container chứa các cài đặt tương ứng với app, lúc nào cần thì bật nó lên và chạy app trong đó, không dùng nữa thì tắt hoặc xóa bỏ, vừa tối ưu tài nguyên lại vừa không ảnh hưởng tới hệ thống.

Cùng tóm tắt lại 1 vài ưu điểm của container như sau: 

- Đóng gói: môi trường bao gồm cả app đều được ẩn trong một gói được gọi là container
- Linh hoạt: do không còn phụ thuộc vào OS và các hạ tầng khác nên có thể triển khai ơ mọi nơi 
- Nhanh: container có thể được tạo gần như một cách tức thì do chia sẻ host OS
- Nhẹ: container cũng sử dụng chung các images nên cũng không tốn nhiều disks.
- Bảo mật: các ứng dụng an toàn hơn trong container và Docker cung cấp khả năng độc lập mạnh mẽ
- Đồng nhất : không có sự sai khác về môi trường khi nhiều người cùng tham gia phát triển cùng một dự án


Bên cạnh các ưu điểm thì tồn tại 1 số vấn đề do việc chia sẻ Host OS :

- Nếu Host OS có vấn đề thì các container cũng sẽ ảnh hưởng theo
- Nếu 1 app nào đó trong container bị chiếm quyền supper thì theo lí thuyết Host OS  sẽ bị crack và kéo theo đó là các container khác cũng sẽ bị hack

### Docker

![](https://images.viblo.asia/fb173357-d5cd-4ad0-90cc-139721195627.png)

Hiện có rất nhiều công ty công nghệ lớn như Google, Facebook, Amazon áp dụng rộng rãi công nghệ containerlization vào phát triển phần mềm của họ. Và họ đều private mã nguồn về công cụ sử dụng containerlization. Sau này 1 công ty công nghệ là Docker đã public sources code của họ về công nghệ này qua sản phẩm mang tên là Docker, ngay lập tức nó đã trở nên nổi tiếng và phổ biến.
Ngoài docker ra các bạn cũng có thể muốn tìm hiểu thêm về [Windows Container](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) do Microsoft phát triển hay 1 số các công nghệ khác tại[ đây](https://vdotrading.vn/containerization-cong-nghe-ao-hoa-moi-nhat/).

Docker cũng có khả năng kết hợp với hệ thống ảo hoá sẵn có như Vmware, HyperV, Openstack để tạo ra một hệ thống rộng lớn và hoàn chỉnh, các giải pháp điện toán đám mây lớn như Google cloud, Amazon Web Services, Microsoft Azure là sự kết hợp của ảo hoá hypervisor và containerization.

Ok, bài giới thiệu cũng khá nhiều chữ rồi, sang phần [tiếp theo](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-cai-dat-bJzKmrkEZ9N) mình sẽ hướng về cách cài đặt cũng như cấu hình các file để sử dụng docker trong dự án, cảm ơn mn đã dành thời gian cho bài viết này :hugs:

Tài liệu tham khảo : https://docs.docker.com/