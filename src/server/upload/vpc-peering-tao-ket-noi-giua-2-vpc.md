# 1. Knowledge
## 1.1. Giới thiệu tổng quan
![image.png](https://images.viblo.asia/5aa76a30-9e8c-4696-bc5a-995ab1367894.png)
Nếu đã từng làm việc với AWS (Amazon Web Services) chắc hẳn bạn đã nghe đến khái niệm VPC (Virtual Private Cloud). Những tài nguyên chúng ta thường sử dụng đều được đặt trong các VPC. Nếu bạn cần kết nối từ tài nguyên thuộc VPC A sang VPC B (các tài nguyên này đều không kết nối trực tiếp từ internet), thì việc tạo ra một kết nối từ VPC A sang VPC B là điều bắt buộc. VPC Peering sẽ giúp bạn giải quyết điều này.

## 1.2. VPC Peering là gì?
VPC peering là một phương thức giúp ta tạo ra một kết nối riêng giữa 2 VPC, trong đó, ta có thể chỉ định VPC nguồn và VPC đích. 
Khi các VPC được kết nối với nhau bằng cách sử dụng VPC peering, những dịch vụ trong các VPC đó có thể giao tiếp bằng IP riêng từ VPC nguồn đến VPC đích và ngược lại.

Các VPC không nhất thiết nằm cùng trong một region, nó có thể nằm ở các khu vực khác nhau, thậm chí ở các tài khoản AWS khác nhau. Tức là nếu có đủ thông tin kết nối bạn có thể kết nối đến VPC của bạn bè, thật tiện lợi.

Ngoài ra, khi bạn sử dụng VPC Peering để kết nối tới các VPC thuộc nhiều region khác nhau, tốc độ sẽ được cải thiện nhiều hơn so với kết nối trực tiếp từ internet.

# 2. Hand on
Bài lab này chúng ta sẽ dựng theo sơ đồ sau
![image.png](https://images.viblo.asia/b70fa755-8401-4092-858d-c42dc63a3687.png)

## 2.1. Tạo và config VPCs, subnet
### 2.1.1. Config VPCs
Bước đầu tiên chúng ta cần tạo ra 2 VPC, mình sẽ tránh không sử dụng VPC default để các bạn có được cái nhìn rõ ràng nhất. Chúng ta cần đăng nhập vào AWS console, tìm và chọn service VPC
![0C18FB75-9962-4356-A61C-198B8D7B0F02_1_105_c.jpeg](https://images.viblo.asia/ab6c1fde-5a61-46ec-9288-4bcb81847969.jpeg)

Sau đó chọn Create VPC
![image.png](https://images.viblo.asia/a3888f3e-e8de-41b7-bbf1-00ad4c552bde.png)

Ở phần "Name tag auto-generation" ta nhập "request-peering" (đặt tên gì cũng được nhé các bạn)
![image.png](https://images.viblo.asia/7c888870-a38f-4361-b14d-c5512460c66f.png)

- Number of Availability Zones (AZs) ta chọn 1
- Number of public subnets ta cũng chọn 1
- Number of private subnets ta chọn 0
- VPC endpoints chọn "None"
- Enable auto-assign public IPv4 address click chọn enable (Bước này không cần áp dụng đối với private subnet ta sẽ thực hiện ở bên dưới)
- NOTE:  config setting trên các bạn để mặc định cungx được tuy nhiên để lát đến phần tạo resource trên các VPC trở nên đơn giản hơn thì mình sẽ config 1 cách đơn giản nhất
![image.png](https://images.viblo.asia/a706e90a-1b5d-4219-aaab-472e3af6a532.png)

Sau đó ta chỉ cần chọn button "Create VPC" ở bên dưới là đã hoàn thành tạo xong VPC với 1 public subnet rồi

 Tiếp đến ta sẽ tạo VPC chứa private subnet
 Tương tự các bước trên, tuy nhiên ta sẽ config như thế này
 ![image.png](https://images.viblo.asia/d33128d3-864a-40c1-8d86-b1897823784e.png)
NOTE: Các bạn sửa lại giúp mình CIDR là : 172.0.1.0/28 nhé

 ![image.png](https://images.viblo.asia/ed3da2e0-41d9-440c-a5be-f6f698811979.png)
 
###  2.1.2. Config public subnet
 Ta cần config  lại route table cho các subnet
 ![image.png](https://images.viblo.asia/16f0dc48-6d52-4084-a9c2-9e5387c0ee75.png)
 
Ở phần VPC ta filter chọn "request-peering-vpc", ở phần navigator bên trái chọn "Route tables", rồi click checkbox chọn "request-peering-rtb", tiếp đến chọn actions ở bên góc trên bên phải và cuối cùng là chọn "set main route table"
Sau đó chúng ta confirm và nhấn "ok"
![image.png](https://images.viblo.asia/c203f3c4-3570-4dd4-9bde-ccdf997197ea.png)

Làm tương tự với accept-peering-rtb nhé các bạn

## 2.2. Tạo resource EC2
Ở bước này ta sẽ tạo 2 con EC2 ở 2 subnet (trong 2 VPC vừa tạo) bên trên
### 2.2.1. Tạo EC2 ở public subnet
Ta cần truy cập vào EC2 dashboard và chọn "launch instance"
![image.png](https://images.viblo.asia/97621e69-d3bd-4097-b9ee-360c39293435.png)

Tiếp đến ta config EC2 với các config sau
![image.png](https://images.viblo.asia/2f8e9304-1b8e-4206-94f9-2c99dda44b39.png)

Ở phần "key pair" ta chọn "create new key pair"
Ta nhập tên key pair xong thì nhất "create key pair" (Nhớ lưu key pair về máy với đuôi .pem nhé các bạn)
![image.png](https://images.viblo.asia/518e4a2a-04e8-417f-be68-3601cee61b96.png)

Tiếp đến ở phần "Network settings" ta chọn button "Edit"
VPC ta chọn "request-peering-vpc"

Check lại configs xem đã đúng nhu cầu chưa, đúng rồi thì ta chọn button "Launch instance" ở bên phải màn hình là ok, đã xong bước tạo EC2 ở public subnet

### 2.2.1. Tạo EC2 ở private subnet
 Tương tự như tạo ở public subnet, ta sẽ tạo 1 EC2 có tên "EC2-private-subnet" ở private subnet nằm trong VPC "accept-peering-vpc" (Quan trọng nhất là phần "Network settings", các bạn nhớ chọn VPC là "accept-peering-vpc" nhé). Xong thì ta launch instance là được
 
 ## 2.3. Test traffic lần 1
 Từ đầu đến giờ chúng ta mới chỉ tạo VPCs, subnets, EC2 nhưng chưa hề đụng đến VPC peering, vì vậy chắc chắn ở lần test này, khi chúng ta đứng ở con "EC2-public-subnet" ping sang con "EC2-private-subnet" thì sẽ không ping được. Để chứng minh điều đó ta sẽ cùng thử ssh vào "EC2-public-subnet" rồi ping sang private IP của "EC2-private-subnet" (Ở đây mình nghĩ các bạn đã biết cách ssh vào 1 instance rồi nên mình sẽ làm nhanh đoạn này)
 IP private của instance "EC2-private-subnet" của mình là "10.0.142.136". Khi mình ping đến ip này kết qủa là sẽ 100% lost packages (Xin lỗi các bạn ở phần IP private này mình có hơi conflick với phần bên dưới 1 chút vì mình gặp chút trục trặc cần tạo lại EC2 => IP ở đây sẽ khác bên dưới nhưng không sao, mình chỉ cần lâys đúng IP private để test là được)
![image.png](https://images.viblo.asia/298140dc-4d52-4b58-bd10-3f53a255ffaa.png)

=> Chúng ta đã thấy được răng hoàn toàn không giao tiếp được giữa instance ở public subnet và instance ở private subnet. Để giải quyết vấn đề này ta sẽ cần thực hiện tạo VPC peering connection

## 2.4. Tạo VPC peering connection
### 2.4.1. Tạo connection
Ta truy cập vào "VPC dashboard", tìm và chọn "Peering connections". Tiếp đến click button "create peering connection"
![image.png](https://images.viblo.asia/f6d8f46f-22be-45a5-b40a-e2a5b917ad1c.png)

Ở phần setting, ta sẽ thực hiện các setting như sau
![image.png](https://images.viblo.asia/63a015c9-9fe1-4fa7-b15a-7d101f38d93d.png)
![image.png](https://images.viblo.asia/f2fb9cfe-60cd-4753-96cd-74e7824ed1c5.png)

Sau đó click button "Create peering connection" bên dưới cùng là được

### 2.4.2. Config route table
Điều kiện để kết nối VPC peering có thể hoạt động được đó là route table của các subnet request cần route CIDR block của VPC accept và ngược lại
Cụ thể ở lab này, route table của public subnet cần có route đến CIDR block của accept-peering-vpc và route table của private subnet cần có route đến CIDR của request-peering-vpc
Ta sẽ thực hiện các bước trên như sau

Vào VPC dashboard -> chọn your VPCs -> quan sát ta sẽ thấy ở 2 VPC của chúng ta đều có column "IPv4 CIDR" -> ta lưu lại 2 dải IP này vào đâu đó
![image.png](https://images.viblo.asia/a8e33c77-27fd-49c1-8a6c-2aaf3de823ab.png)

Filter "request-peering-vpc" -> chọn "Route tables" ở navigator bên trái -> click checkbox "request-peering-rtb" -> ở bên dưới chọn tab "Routes" -> chọn button "Edit routes"
Chọn button "Add route" và nhập thông tin như sau:
- Destination: nhập CIDR của accept-peering-vpc
- Target: Tìm kiếm và chọn "Peering Connection"
=> Click button "Save changes"
=> Tương tự với "accept-peering-vpc" ta sẽ config route table của private subnet và nhập destination là CIDR của request-peering-vpc

### 2.4.3. Accept VPC peering connection
VPC dashboard -> chọn peering connections -> click connection đã tạo bên trên -> chọn actions -> chọn accept request
![image.png](https://images.viblo.asia/94d98b55-7103-4334-9a92-7b81b8e3f775.png)

### 2.4.4. Allow traffic
Để có thể ping đến EC2-private-subnet, ta cần 1 thao tác nữa là config security group (SG) để allow traffic từ EC2-public-subnet
Mình sẽ nhập CIDR của request-peering-vpc trong allow rule inbound của SG attach với private subnet
![image.png](https://images.viblo.asia/97fd8799-2b3f-4b68-a585-17134107f549.png)

## 2.5. Test traffic lần 2
Sau khi làm xong các bước trên, các bạn thử đứng từ con EC2-public-subnet ping lại đến con EC2-private-subnet sẽ thấy giờ đây đã có sự giao tiếp đc
![image.png](https://images.viblo.asia/c6e306f3-6609-4a79-abac-fd72389ac88a.png)

Cảm ơn các bạn đã bỏ thời gian ra đọc, nếu có gì sai sót mong các bạn cmt bài viết góp ý cho mình nhé ạ !

Nguồn tài liệu tham khảo:
- https://rabiloo.com/vi/blog/vpc-peering-giao-tiep-giua-2-vpc#:~:text=VPC%20Peering%20l%C3%A0%20g%C3%AC,VPC%20%C4%91%C3%ADch%20v%C3%A0%20ng%C6%B0%E1%BB%A3c%20l%E1%BA%A1i.