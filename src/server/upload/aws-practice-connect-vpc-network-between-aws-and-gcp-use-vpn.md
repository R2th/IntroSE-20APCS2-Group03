## Giới thiệu
Chào các bạn tới với series thực hành về AWS, ở bài này chúng ta sẽ tìm hiểu cách kết nối Virtual Private Cloud giữa AWS và Google Cloud Platform. Nếu các bạn sử dụng AWS nhiều thì chắc ta đã nghe nói tới Site-to-Site VPN, dùng để kết nối network của on premise tới VPC của AWS, nhưng ngoài cộng dụng đó thì nó còn khá nhiều công dụng khác rất hữu ích. Một trong số các công dụng đó là chủ đề mà ta sẽ tìm hiểu ở bài này, sử dụng Site-to-Site VPN để kết nối private network giữa AWS và GCP.

![](https://images.viblo.asia/ab833107-8a4a-4756-973b-b90f6b0c3d17.jpg)

Trước khi bắt tay vào làm, thì có một vấn đề ta cần trả lời trước là: Tại sao lại phải xài multi cloud rồi dùng VPN để kết nối tụi nó với nhau chi cho cực vậy?

## Multi cloud
**Đây chỉ là quan điểm cá nhân của mình thôi nhé** 🤣. Ví dụ được đặt ra là ta cần xây dựng một giải pháp để streaming hành động của khách hàng ở trên một trang thương mại điện tử với số lượng truy cập khá cao và sau khi streaming và tổng hợp được tất cả các hành động của khách hàng thì ta cần xử lý dữ liệu đó để phân tích được sở thích của khách hàng.

Với yêu cầu ở trên thì hệ thống của ta sẽ có hai phần chính. Hệ thống event streaming và hệ thống phân tích dữ liệu. **Mình sẽ chọn xây dựng hệ thống event streaming ở trên AWS và xây dựng hệ thống phân tích dữ liệu ở trên GCP**.

### GCP for Data Analysis
Tại sao là lại xài Google Cloud Platform cho việc phân tích dữ liệu, nó có gì hơn AWS, nó nhanh hơn hay sao? Lý do mình chọn GCP cho việc phân tích dữ liệu không phải là vì các công cụ xử lý dữ liệu của GCP nó nhanh hơn hay gì cả, vì mình cũng chưa có đủ kiến thức để có thể đánh giá được là hai công cụ của AWS và GCP thằng nào nhanh hơn, mình chọn GCP vì nó phù hợp cho việc phân tích dữ liệu khách hàng. Vì Google đã đi trước trong việc phân tích dữ liệu người dùng khá lâu, **Google sở hữu các dịch vụ có sẵn mà rất dễ dàng kết hợp với GCP trong việc thu thập và thống kê dữ liệu của người dùng, như là Google Analysis, Gmail, Google Ads, Youtube, Google search**. 

Ngoài ra các UI của các trang report dữ liệu của Google rất đẹp và dễ nhìn, phù hợp cho cả những người mà không phải chuyên dữ liệu khi nhìn vào cũng có thể hiểu. Đây là mô hình ví dụ của việc phân tích dữ liệu của khách hàng dùng GCP.

![image.png](https://images.viblo.asia/e4ccf5a8-982c-4e5b-baa0-323331721fc0.png)

### AWS for Event Streaming
Ngược lại với GCP thì AWS đi trước trong mảng Cloud khá lâu. Nên các dịch vụ dùng để xây dựng ứng dụng của AWS lại thông dụng hơn nhiều, có nhiều documents và usecase, cộng đồng lớn, dễ sử dụng với nhiều công cụ IaC có sẵn. Đó là lý do mình chọn AWS cho việc xây dựng hệ thống event streaming. Ví dụ cụ thể là mình cần xây dựng một Kafka Cluster để làm core của hệ thống streaming này, nếu ta tự xây dựng nó trên GCP thì sẽ mất rất nhiều công sức. Trong khi ở trên AWS thì Kafka nó có sẵn, tội gì ta phải tự xây là quản lý một Kafka Cluster 😂 (công việc này không dễ).

Trên AWS thì Kafka service nó tên là AWS MSK, mô hình ví dụ như sau.

![image.png](https://images.viblo.asia/2d979e5e-894b-43cf-a1cc-1d35070ba3ee.png)

Oke, đó là lý do tại sao mình cần phải xài multi cloud, nhưng vì tất cả ứng dụng mình đều đặt trong private subnet ở trên VPC, nên bên ngoài sẽ không thể truy cập được.

![image.png](https://images.viblo.asia/7c48e754-6533-4623-8d8d-b9cc8fcca7e0.png)

Vậy thì làm sao ta stream event từ AWS sang GCP được, cả hai ứng dụng đều nằm trong private subnet hết.

![](https://images.viblo.asia/e683f18f-e0e4-46c8-99e6-998dd5de9451.jpg)

Để làm được điều đó thì ta cần phải kết nối VPC của hai thằng Cloud lại với nhau, ta sẽ dùng AWS Site-to-Site VPN và Google Cloud VPN.

## Connect VPC Network between AWS and GCP
Oke, giờ ta sẽ bắt tay vào làm. Các bạn có thể tạo custom VPC nhé, vì để nhanh mình sẽ sử dụng default VPC. Đầu tiên ta sẽ bắt đầu ở Google Cloud.

### Create GCP External IP
Ta sẽ tạo một External IP ở trên GCP trước, truy cập Google Cloud Console chọn **VPC Network -> External IP addresses** bấm **Reserve a static address**.

![](https://images.viblo.asia/75e61d23-65c5-479f-8b90-785907ad102d.png)

Nhập như sau.

![image.png](https://images.viblo.asia/04d2fc1c-472c-4451-a3c7-bbe8e375b55f.png)

Điền vào tên là external-ip-aws-cusomter-gateway, **Network Service Tier** chọn Premium, **IP version** chọn IPv4, **Type** chọn Region và lựa Region giống với Region của AWS VPC, trong bài này ta sẽ làm việc ở us-east-1. Bấm tạo.

![image.png](https://images.viblo.asia/cb7ffad0-16c0-4bd5-a1e9-052611d50c1d.png)

Đây là IP ta sẽ dùng cho AWS Customer Gateway.

### Create AWS Customer Gateway
Tiếp theo ta sẽ tạo AWS Customer Gateway, truy cập AWS Console, chọn **VPC -> Customer gateways**, bấm tạo.

![image.png](https://images.viblo.asia/66c5b93a-bc35-497b-a6db-d437207625f3.png)

Điền như sau.

![image.png](https://images.viblo.asia/27239406-86b6-46ba-8881-d93fe828e5b9.png)

Tên ta nhập gcp-customer-gateway, **IP address** ta điền vào External IP ta vừa tạo ở GCP. Bấm tạo.

![image.png](https://images.viblo.asia/932b23b9-fd1b-4b70-bec7-3306cf9f4fd6.png)

### Create AWS Virtual private gateways
Tiếp theo ta sẽ tạo AWS VGW, truy cập Virtual private gateways Console, nó nằm ở dưới menu Customer Gateway.

![image.png](https://images.viblo.asia/5caf7891-c947-4ff4-ad0b-0a15484c74e0.png)

 Bấm tạo. Nhập như sau.
 
 ![image.png](https://images.viblo.asia/4ad7b6d3-4665-4d7d-8dcc-4df54cff36d2.png)
 
 Tên điền vgw-default-vpc, **ASN** chọn default. Bấm tạo.
 
 ![image.png](https://images.viblo.asia/39e5a929-6fff-4315-a653-f013555b5cc3.png)
 
 Tiếp theo ta sẽ gán VGW này vào default VPC. Nhấn **Action -> Attach to VPC**.
 
 ![image.png](https://images.viblo.asia/c979a093-775e-4a11-959e-9f68166aff33.png)
 
 Chọn default VPC.
 
 ![image.png](https://images.viblo.asia/0e1be595-f187-4c5c-9982-46a92ba7aa00.png)
 
 Bấm Attach.
 
 ![image.png](https://images.viblo.asia/828389a5-b2aa-4459-ac19-7e8282e3bc5c.png)
 
###  Create AWS Site-to-Site VPN
Tiếp theo ta sẽ tạo AWS VPN để connect tới GCP. Truy cập Site-to-Site VPN.

![image.png](https://images.viblo.asia/bdc6a277-0416-431c-b3cd-6a1f32042ff5.png)

Bấm tạo, ta điền như sau.

![image.png](https://images.viblo.asia/fe303ca4-64cf-471a-84f2-0a951cdd33da.png)

Tên nhập vào aws-vpn-gcp, chọn virtual private gateway và customer gateway ta vừa tạo. Phần **Routing options** ta chọn Static, nhập vào ô **Static IP prefixes** là CIRD Block của GCP với giá trị 10.142.0.0/20

![image.png](https://images.viblo.asia/afc0fcb7-d48b-4ffa-b8de-6273f8c76e80.png)

Để xem CIRD Block của GCP VPC ở một region nào đó, ta truy cập Google Console ở mục VPC networks.

![image.png](https://images.viblo.asia/ec41593c-1d02-4594-9bd0-340dfff49f32.png)

Quay lại AWS Console bấm Create VPN connection. Sau khi tạo ta đợi cho status của nó thành Available nhé.

![image.png](https://images.viblo.asia/4fd87fa5-abc7-4056-bf9f-c335ad557513.png)

Sau đó ta chọn Download configuration của VPN này xuống. Nó sẽ hiện ra cái modal.

![image.png](https://images.viblo.asia/2233aa13-ef4b-4958-82af-91ed5935d301.png)

**Vendor** và **Platform** ta chọn Generic, phần **Software** ta chọn Vendor Agnostic, **IKE version ta chọn ikev1**.

### Create GCP Cloud VPN
Tiếp theo ta sẽ tạo VPN Connection ở trên GCP, truy cập Google Cloud Console, chọn VPN.

![image.png](https://images.viblo.asia/10377cca-2c80-46ee-a711-17074385f3f3.png)

Bấm tạo.

![image.png](https://images.viblo.asia/14f13322-1592-44c1-9d00-2da8e39597e4.png)

Chọn **Classic VPN**, bấm tiếp tục. Ở form Google Compute Engine VPN gateway ta điền như sau.

![image.png](https://images.viblo.asia/4aa6e906-0ca2-4c7c-94b1-1c042af979ed.png)

Tên ta nhập vào là aws-vpn-gcp, network chọn default, region nhớ chọn us-east1, IP address ta chọn External IP ta đã tạo ở trên.

Tiếp theo là phần quan trọng, ở mục VPN tunnel, ta điền như sau.

![image.png](https://images.viblo.asia/18c68b6e-fbc8-468d-9cb4-52e21a8b72c0.png)

Mục name ta điền là aws-vpn-gcp-tunnel-1, IKE version ta chọn IKEv1, còn giá trị của **Remote peer IP address** và **IKE pre-shared key**, ta tìm ở trong file mà ta tải xuống hồi nãy từ Site-to-Site VPN. Bạn kiếm đoạn hai phần sau.

![image.png](https://images.viblo.asia/27d8634c-a7ed-4233-9393-2feadd77b230.png)

![image.png](https://images.viblo.asia/b9380b37-8943-48aa-ab5d-8fe255b44173.png)

Giá trị của **Virtual Private Gateway** và **Pre-Shared Key**  là hai giá trị ta cần. Phần Routing options ta chọn Route-based, và điền vào CIRD Block của VPC bên AWS.

![image.png](https://images.viblo.asia/55bed388-3cad-4f67-9b14-660741476194.png)

Để kiếm CIDR Block của VPC, ta tìm ở menu VPC của AWS Console.

![image.png](https://images.viblo.asia/8ac62ec3-0d43-4657-bf58-5ed09c658521.png)

Bấm tạo. Đợi VPN tunnel status chuyển thành Established.

![image.png](https://images.viblo.asia/5a7a1b82-fe25-4f04-a44b-1f2c157e7b62.png)

Đợi một chút, quay lại AWS ở phần Site-to-Site VPN, ta bấm vào VPN ta vừa tạo và kiểm tra phần Tunnel state. Bạn sẽ thấy trạng thái của Tunnel 1 đã bược bật lên.

![image.png](https://images.viblo.asia/64a03906-6835-44ef-b598-dc50bc6db5b5.png)

**Ta sẽ thấy có warning là cần sử dụng cả hai tunnel, khi ở môi trường production, bạn nên tạo cả hai tunnel.**

Ok, tới đây là ta đã tạo được kết nối từ AWS sang GCP. Bước cuối cùng ta cần làm là enable Security Group để hai thằng có thể thoải mái nói chuyện với nhau.

## Enable Security Group
Ta cập nhật SG của AWS để các ứng dụng từ GCP có thể thoải mái truy cập tới AWS VPC, bấm vào SG ở VPC, chọn default SG và sửa Inbound rules như sau.

![image.png](https://images.viblo.asia/8cf40e17-2ba9-47de-bc6a-2c096bf96413.png)

Sau đó ta cập nhật Firewall Rule ở bên GCP để các ứng dụng của AWS có thể thoải mái truy cập tới GCP VPC. Truy cập GCP Console, bấm vào memu Firewall, chọn default-allow-internal và Edit nó.

![image.png](https://images.viblo.asia/a9408a45-6007-4a9c-8d61-737587afbed7.png)

Ta thêm vào CIDR Block của AWS VPC là 172.31.0.0/16

![image.png](https://images.viblo.asia/90f80e6a-bd7d-4c6d-8d9c-56bdf80390fe.png)

Bấm save. Bây giờ thì các ứng dụng của AWS và GCP của ta đã có thể nói chuyện với nhau cho dù cả hai đều nằm trong private network 😁.

![](https://images.viblo.asia/33d87e29-d41e-4031-b6d3-5d546cd9b0de.jpg)

## Kết luận
Vậy là ta đã tìm hiểu xong cách kết nối VPC giữa hai Cloud với nhau, ta có thể sử dụng VPN không chỉ để kết nối giữa AWS và GCP mà còn có thể sử dụng nó để kết nối giữa AWS và Azure, tùy vào mục đích của chúng ta. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.