Tiếp tục cho series tìm hiểu về AWS, hôm nay mình sẽ tiến hành "mày mò" để tạo 1 VPC dựa theo hướng dẫn của bài lab bên dưới.

[Building Your First Amazon Virtual Private Cloud (VPC)](https://www.qwiklabs.com/focuses/3629?catalog_rank=%7B%22rank%22%3A5%2C%22num_filters%22%3A1%2C%22has_search%22%3Atrue%7D&locale=en&parent=catalog&search_id=2607562#)

## Mục đích
- Tạo và hiểu được mục đích của 1 VPC là gì? => Task 1
- Tạo và hiểu được mục đích của 1 public subnet là gì?  => Task 2
- Tạo và hiểu được mục đích của 1 Internet Geteway là gì?  => Task 3
- Tạo và hiểu được mục đích của 1 Route Table là gì?!  => Task 4

## Task 1. Tạo 1 VPC

* Sau khi log in vào console của aws, tìm tới service VPC 

![](https://images.viblo.asia/4452b3c8-891f-4a4c-b04e-77b752d6fec0.png)

* Ở VPC dashboard, click Your VPCs

![](https://images.viblo.asia/8d71dd1e-0f18-4db6-9de6-b92c496ce71c.png)

* Click vào VPC và cấu hình như sau rồi nhấn Create

`Name tag: HoangNgo VPC` => Cái này đơn giản chỉ là tên của VPC mình muốn đặt.

`IPv4 CIDR block: 10.0.0.0/16` => Cái này là dải IP version 4 mà mình chỉ định cho VPC của mình

![](https://images.viblo.asia/29916b19-202d-4408-895e-e729aa7359f4.png)

* Để ý thì lúc này trên màn hình có hiện

> A VPC is an isolated portion of the AWS cloud populated by AWS objects, such as Amazon EC2 instances. 
> 

***=> VPC là một phần biệt lập của AWS Cloud, được cư ngụ bởi các objects, chẳng hạn như các instances Amazon EC2. 
Hay nói đơn giản, VPC như 1 căn nhà riêng, nơi mà người dùng có thể sắp xếp, điều khiển, phân bổ các services của aws, như là EC2 chẳng hạn.***

* Như vậy là việc tạo 1 VPC cơ bản là hoàn thành. 

![](https://images.viblo.asia/79b41808-374a-4dd0-a877-2c4f47aed1c2.png)

![](https://images.viblo.asia/6c0357ac-e8d2-41fb-a4d9-ccbdb1465926.png)

## Task 2. Tạo 1 public subnet

* Ở VPC dashboard, chọn vào Subnets -> Click Create Subnet

![](https://images.viblo.asia/713ef062-59ee-4282-9657-8e7cddbbd3c2.png)

* Cấu hình như sau

`Name tag: Public 1`

`VPC*: lựa chọn VPC đã create ở Task 1`

`Availability Zone: Chọn zone đầu tiên trong list`

`IPv4 CIDR block: 10.0.1.0/24` => Chỗ này là dải IP version 4 của subnet

![](https://images.viblo.asia/c659ea04-06d2-4534-8316-0a9ca957acef.png)

* Tạo subnet thành công

![](https://images.viblo.asia/d7d6e5af-da7b-45e1-933f-8fc6984a9825.png)

* Sau khi create subnet thì tiến hành "Enable auto-assign public IPv4 address" cho subnet đó. Việc này có ý nghĩa là sẽ cho phép subnet đó tự động cấp 1 địa chỉ IP cho toàn bộ instance mà khởi tạo trong subnet đó.

-> Chọn vào button và click Modify auto-assign IP settings

![](https://images.viblo.asia/ed646638-ba65-4677-befb-7cb7416b7ac1.png)

* Click button Auto-assign IPv4 và nhấn Save

![](https://images.viblo.asia/2b41226f-75b3-44e7-af97-767f608085bc.png)

* Tạo 1 public subnet thứ 2 tương tự như các bước đã tạo public subnet đầu tiên

![](https://images.viblo.asia/7408360f-4eb2-4880-85a9-e789c4665778.png)

***=> Có thể hiểu đơn giản, subnet là các căn phòng nhỏ trong ngôi nhà VPC, mỗi subnet sẽ có 1 mục đích sử dụng riêng khác nhau.***

## Task 3. Tạo 1 Internet Gateway

* Tại VPC dashboard, chọn vào Internet Gateways và click Create internet gateway

![](https://images.viblo.asia/605409a2-76d3-4fc4-91f5-f4dc03d912d8.png)

* Đặt name tag cho Internet Gateway rồi click Create

![](https://images.viblo.asia/d8c02d2f-8fc6-4fd6-a6f6-0ea27d2ada06.png)

> An internet gateway is a virtual router that connects a VPC to the internet. To create a new internet gateway specify the name for the gateway below.
> 
***=> Có thể hiểu đơn giản internet gateway như 1 cái cửa để đi ra Internet của căn nhà VPC vậy. Muốn đi ra ngoài thì bắt buộc phải làm cửa thôi :)***

* Create Internet Gateway thành công
![](https://images.viblo.asia/71925669-c534-49f0-bbc6-f900241c248a.png)

* Chọn vào IG đã tạo rồi click Attach to VPC

![](https://images.viblo.asia/7cd04ead-f14c-4133-81b9-4b4c77751807.png)

* Select VPC đã tạo ở task 1 để attach rồi nhấn Attach

![](https://images.viblo.asia/0faf39c9-658e-4c62-a298-3608abceb12b.png)


***=> Thao tác này giống như gắn cửa Internet Gateway vào căn nhà VPC vậy.***

## Task 4. Tạo 1 Route Table

* Ở dashboard VPC, chọn vào Route Tables và click Create route table

![](https://images.viblo.asia/1f7c7bad-beb4-4fb9-98d7-a3ad6a8ffcac.png)

* Đặt name tag và chọn VPC đã tạo ở task 1 rồi click Create

![](https://images.viblo.asia/8b19ca9d-9ff3-486b-bdab-483c050dd4a9.png)

>A route table specifies how packets are forwarded between the subnets within your VPC, the internet, and your VPN connection.
>
***=> Có thể hiểu đơn giản, Route table như là các ống dẫn nước trong nhà, cho phép chủ nhà điều kiển được nước được phép chảy từ phòng (subnet) nào tới phòng nào, hay là chảy ra ngoài (internet).***

* Create route table thành công

![](https://images.viblo.asia/1444f470-ebe5-4109-a225-67a32cfa3eea.png)

* Sau khi tạo được Route table thì tiến hành thiết lập route theo ý muốn (giống như tiến hành lắp ráp các ống dẫn nước để điều hướng dòng chảy vậy). Chọn vào tab Routes bên dưới màn hình Route table rồi chọn Edit Route

![](https://images.viblo.asia/7ff599aa-52c3-4bf3-a3f4-af7999d1327c.png)

* Chọn add route với cấu hình rồi click Save routes

`Destination: 0.0.0.0/0`
`Target: Là cổng IG đã tạo ở task 3`

![](https://images.viblo.asia/15b85c58-1dec-46b4-a64e-0ca079f6bde7.png)

* Create route thành công

![](https://images.viblo.asia/ef4709d9-6819-4f6c-aff0-8d82a1815d2a.png)

* Sau khi tạo route thành công thì còn phải tạo Subnet Associations để chỉ định subnet nào apply route đã tạo đó. Chọn tab Subnet Associations rồi click Edit Subnet Associations

![](https://images.viblo.asia/95b703fd-8eef-4316-a50e-1d61d14082d6.png)

* Click chọn 2 public Subnet đã tạo ở task 2 rồi nhấn Save

![](https://images.viblo.asia/2299c7c2-8ec5-4f77-a7a7-23b2fd74a742.png)

Như vậy, đến đây có thể xem như đã hoàn thành cơ bản 4 mục tiêu đã đề ra ban đầu. 
Trong phần sau mình sẽ tiếp tục tìm hiểu thêm về private subnet và thực hiện launch 1 web app trên VPC này. 

## Kết luận

Có thể suy nghĩ VPC như 1 ngôi nhà riêng mà ở đó chủ nhà có toàn quyền để phân chia, sắp xếp các tài nguyên của mình, cũng như cho phép vị khách nào có quyền ghé thăm và sử dụng các tài nguyên đó.
Các subnet thì có thể xem như là các căn phòng, được chia ra để phục vụ các mục đích khác nhau.
Để căn nhà có thể liên lạc được với thế giới bên ngoài thì cần có cánh cửa Internet Gateway.
Route table như là các ống dẫn nước, cho phép chủ nhà điều khiển dòng chảy lưu thông trong nhà, giữa phòng này với phòng khác, hay giữa căn nhà với bên ngoài.