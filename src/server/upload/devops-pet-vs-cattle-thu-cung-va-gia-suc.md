## Khái niệm
Pets vs Cattle là một khái niệm cơ bản của DevOps. Bài viết này sẽ nói về sự phát triển của các mô hình dịch vụ từ cốt lõi Pets and Cattle

### 1. Pets Service Model
Hãy tưởng tượng bạn nuôi một em thú cưng, cụ thể là 1 em mèo.

Bạn sẽ đặt cho nó 1 cái tên dễ thương như:  "Chó con"

Khi em mèo của bạn bị ốm, bạn sẽ chăm sóc nó, đưa nó tới phòng khám thú ý

Bạn sẽ chăm sóc việc ăn ị của em nó, chăm em nó lớn lên, chăm lo chuyện tâm tư tình cảm, tìm bạn tình cho em nó , ..v..v
![](https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_touching_human_hand_other/1800x1200_cat_touching_human_hand_other.jpg)

Tương tự, đối với Pets Service cũng vậy. 

Các máy chủ này được xem như những con thú cưng. Bạn sẽ gọi nó bằng những cái tên thân thương như kiểu: "lẩu  thái chua cay" , "nướng bbq" (đang mùa đông nên mấy cái tên này chắc cũng hay). 

Chúng là  độc nhất vô nhị, được nâng niu và chăm sóc tận tình, và khi chúng có vấn đề, bạn sẽ phải xử lí để chúng hoạt động khỏe mạnh trở lại. 

Bạn thường sẽ scale nó theo chiều dọc (tăng cấu hình). Và nếu máy chủ không hoạt động hay không khả dụng, ta sẽ ngay lập tức biết.

Một số máy chủ thuộc dạng này là: Fire Wall, Load balance, Database,...

### 2. Cattle Service Model
OK, giờ đây bạn không làm Sen cho 1 con Boss nữa, đã đến lúc chúng ta lên ngôi. 

Hãy tưởng tượng bạn là 1 cô bé cưỡi ngựa chăn cừu hàng ngày lùa cừu kiểu:
>  Sáng ra sườn đồi, tối vào chuồng  

Bây giờ bạn sẽ làm gì?
![](https://i.pinimg.com/originals/23/64/15/236415893438ede1e6cd2404f920e812.jpg)

- Bạn sẽ cưỡi ngựa, chắc chắn rồi.

Cưỡi ngựa không phải vì thích cưỡi ngựa, hoặc cũng có thể bạn thích. Cưỡi ngựa để cung cấp cho bạn 1 tầm nhìn đủ cao và rộng để có thể quan sát rõ ràng đàn cừu của mình.

- Đảm bảo số lượng

Nhớ đảm bảo số lượng đàn của bạn nhé. Dắt đi 10 con mà lúc về lại chỉ có 5 con là không ổn rồi.

- Mở rộng đàn cừu

Chúng ta mở rộng đàn cừu bằng cách tăng số lượng cừu. Có thể qua sinh sản hoặc là mua thêm :D

Tương tự, đối với Cattle Service cũng vậy

Các máy chủ được cung cấp các số nhận dạng như web01, web02, web03, web04 và web05, giống như cách gia súc được gắn số vào tai của chúng.  

Mỗi máy chủ gần như giống hệt nhau và khi một máy chủ có vấn đề, ta hoàn toàn có thể thay thế nó bằng một máy chủ khác.  

Các máy chủ được scale theo chiều ngang (tăng số lượng).

Ví dụ về máy chủ loại này là: web server arrays, no-sql clusters, queuing cluster, search cluster, caching reverse proxy cluster, v.v

Để quản lí các máy chủ "gia súc", bạn cũng cần "cưỡi ngựa". Một số công cụ quản lý máy chủ khá hiệu quả đó là Ansible, Chef hay Puppet

## Evolution of Cattle
Cattle service model xuất hiện từ thời điểm của những chiếc máy tính đầu tiên cho tới hiện tại - khi mà Cloud đang là xu hướng. Dưới đây là tổng quan ngắn gọn về các nền tảng và công cụ đã phát triển qua thời gian

Trong thời kỳ đầu của máy tính, chỉ cho đến khi sự ra đời của ảo hóa phần cứng mới dẫn đến việc quản lý hệ thống cattle. 

Các công cụ hỗ trợ config mạnh mẽ như Puppet (2005), CFEngine 3 (2008) và Chef (2009) cho phép các tự động hóa việc thiết lập, cài đặt trên các server 

IaaS (Infrastructure as a Service) bắt đầu xuất hiện. Chúng cho phép ảo hóa toàn bộ cơ sở hạ tầng (mạng, lưu trữ, bộ nhớ, cpu) thành các tài nguyên có thể lập trình được. 

Các nền tảng phổ biến cung cấp IaaS là Amazon Web Services (2006), Microsoft Azure (2010), Google Cloud Platform (2011). Điều này cũng kéo theo sự ra đời của các công cụ CM (config managerment) như  Salt Stack (2011), Ansible (2012), và Terraform (2014).

Sau khi ảo hóa cơ sở hạ tầng, đã có những chuyển động ban đầu trong việc ảo hóa hệ điều hành (processes, network, memory, file system). Điều này cho phép các ứng dụng được tách biệt thành môi trường riêng chúng mà không cần phải ảo hóa phần cứng. Một trong những công nghệ đình đám nhất là Docker (2015).

Hiện Docker đã trở nên lớn mạnh và tách ra thành một hệ sinh thái riêng. Các công cụ quản lý container vì thế cũng ra đời. Nổi bật nhất là  Kubernetes (2014) và Swarm (2015). Các ông cụ này được gọi là **"Immutable Production"** - nơi thiết lập và triển khai containers.

#### ...
Đến đây thì bài viết cũng băt đầu khá lan man, nên mình xin phép dừng lại. Bài viết này mong muốn mang đến cho bạn đọc phép ẩn dụ khá thú vị nhưng không hề lỗi thời, cùng với đó là 1 cái nhìn tổng quan về quá trình phát triển của các mô hình dịch vụ. Chúc anh em 1 ngày tốt lành :D 

Còn hiện tại, công nghệ vẫn đang phát triển không ngừng. Khi mà chúng ta nắm được các 
**Google Kubernetes Engine (GKE), Azure Container Service (AKS), AWS Elastic Container Service (EKS), Spark, Kafka, Flink, Storm, Hadoop, Cassandra, Samza, Akka, Finagle, Heron**

Thì có lẽ thế giới lại đã sinh ra thêm hàng trăm công cụ hay khái niệm mới. KKKK