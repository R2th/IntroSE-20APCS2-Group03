`AWS` như các bạn biết nó là viết tắt của cụm từ `Amazon Web Service`, tập đoàn Amazon đang cung cấp resource về điện toán đám mây, mà trên đó có rất nhiều dịch vụ có thể triển khai, bạn có thể tìm thấy tất cả những gì mình cần với `AWS`. Trên `AWS` bạn có thể thấy mình như đang ở một khu đô thị hiện đại, nơi bạn sống cung cấp tất cả những dịch vụ thiết yếu mà bạn cần, bạn không cần phải đi ra ngoài mà vẫn kết nối được chúng dễ dàng nhanh chóng và an toàn. Trong bài cơ bản này tôi sẽ điểm qua 15 khái niệm cơ bản cần biết khi sử dụng `AWS`.

### 1. Region

Region bản thân nó mang ý nghĩa là vùng, phạm vi và với resource điện đoán đám mây của Amazon được host tại nhiều nơi trên thế giới, thì region chỉ theo nghĩa đen về mặt vật lý là những địa danh trên thế giới. Vào thời điểm hiện tại thì trên toàn thế giới họ có khoảng 19 region chính và các vùng con (là những data center) bên trong chúng như hình bên dưới. Chuẩn bị sẽ có thêm vài region nữa. Mỗi region có thể là cung cấp một hoặc một số dịch vụ riêng như DB (Aurora), storage (S3), Batch ... và chi tiết bạn có thể đọc thêm [ở đây](https://docs.aws.amazon.com/general/latest/gr/rande.html)

![](https://images.viblo.asia/3319495f-6f5d-4b1a-a6a8-c1485cdb8290.png)
![](https://images.viblo.asia/ad705001-bfb6-4842-a4d0-bdff1fcbc954.png)

### 2. AZ : Availability Zone

Mỗi region lại có một hoặc nhiều AZ, ví dụ như Tokyo region là vùng cung cấp dịch vụ AWS trên thế giới nhưng còn trong nó lại có 3 data center độc lập nhau, và họ gọi là AZ.

![](https://images.viblo.asia/7faa246b-b1f8-48a2-8793-7672e9c1fb35.jpeg)

Do region có nhiều AZ nên khi mà thiết kết infra cho hệ thống thì có thể dùng chế độ Multi-AZ để nâng cao an toàn giảm thiểu tổn thất nếu chẳng may xảy ra cho hệ thống.

### 3. VPC (Virtual Private Cloud)

Đây là khái niệm chỉ vùng (section) phân chia về mặt logic của điện toán đám mây `AWS` có trong mỗi AZ mà ai cũng có thể dễ dàng có được.

![](https://images.viblo.asia/54bf5a03-3bf3-4ff4-8764-b779267aa0c6.jpeg)

Khi dùng VPC bạn có thể khởi động `AWS` resource như là EC2, RDS bên trọng mạng riêng ảo do bạn tự định nghĩa. Địa chỉ IP của VPC bạn có thể chỉ định bởi quy tắc dưới :

- Có 1 IP cho tổng thể cả VPC
- Phân chia không gian địa chỉ IP bằng subnet

Nhưng bạn cần chú ý một điều là địa chỉ network sau khi tạo là không thể thay đổi.

### 4. Subnet (Public, Private)

Subnet là chỉ network nhỏ khi mà bạn có VPC rồi chia nó ra thành những phần network nhỏ hơn để quản lý.

![](https://images.viblo.asia/49cd3873-2907-41c1-a6e8-0b5e6842f232.jpeg)

Về cơ bản với mỗi vai trò của các instance thì bạn sẽ nhóm chúng lại theo subnet để quản lý, và thường được sử dụng khi mà có attach route table để có thể quản lý đến những loại access nhỏ nhất. Trong subnet chia ra hai loại là Public và Private, bạn có thể xem hình sau để hiểu chúng khác nhau như nào :

![](https://images.viblo.asia/f2ae1f59-f2ee-4df4-9e30-d92c5619ad70.png)

Theo như hình trên thì khi mà kết nối vào VPC instance từ internet, bạn sẽ cần internet gateway (sẽ giải thích sau). Và việc truyền tin đến các instnace bên trong các subnet sẽ thông qua router ở bên trong VPC netwwork. Khi này thì tuỳ theo nội dung của route table được attach vào các subnet, sẽ phán đoán xem sẽ cho phép access hay chặn access từ internet. Đó chính là sự khác nhau của Public (cho phép access) và Private (chặn access) Subnet.

### 5. Internet Gateway

Internet Gateway là component VPC cho phép truyền tin giữa internet và instance của VPC.

![](https://images.viblo.asia/418d4d20-6154-4235-b950-907d50e0b725.png)

Vai trò của nó thì có 2 cái chính :

1. Thêm vào route table của VPC network những target mà có thể routing ra ngoài internet.
2. Thực hiện hoán đổi địa chỉ network (NAT) đối với các insatnce đang được gán địa chỉ IP v4 public.

### 6. Default Gateway

Là máy tính hay router được thiết lập để đảm nhận vai trò cửa ra vào trong trường hợp truyền tin từ network nội bộ (AWS subnet hay VPC) giống như là LAN đến network bên ngoài ( subnet khác hay internet). Nó có thể hoán đổi nhiều dữ liệu khác nhau về mặt protocol (quy tắc) trên network để truyền tin đi.

### 7. Router

Thiết bị truyền tin bằng IP(Internet Protocol) đầu tiên sẽ kiểm tra xem đối tượng truyền tin có phải là thiết bị cùng thuộc network với nó không (cùng subnet), nếu mà là truyền tin ra ngoài network của nó thì sẽ thông qua router để tiến hành truyền tin đi.

### 8. Routing table

Nó nắm giữ thông tin về đường đi liên quan đến nơi sẽ đến của các gói tin mà router hay thiết bị nắm giữ. Có 2 loại là : 

・Static Routing : Nó là cách thiết lập thủ công các thông tin đường đi bên trong các router, những thông tin này về cơ bản là không thể bị mất đi.
・Dynamic Routing : Nó sử dụng các routing protocol như là 「RIP(Routing Information Protocolo)」「OSPF(Open Shortest Path First)」「BGP(Border Gateway Protocol)」... để cập nhật động các thông tin đường đi.

### 9. NAT (NAT Gateway)

NAT là viết tắt của Network Address Translation, một kĩ thuật biến đổi địa chỉ IP. Cơ bản nó biến đổi địa chỉ IP private sang global IP. Ví dụ trong trường hợp kết nối internet từ các PC trong mạng lên công ty thì cần phải biến đổi những địa chỉ IP private thành global IP. Khi này bạn sẽ cần cơ chế NAT.

### 10. Bastion Server

Là server được dùng cho các route kết nối chuyên dùng cho việc maintain. 
Cơ bản thì bản thân việc server ứng dụng cho phép kết nối SSH trực tiếp từ bên ngoài (internet) là không hay về quan điểm an toàn bảo mật, những kết nối SSH từ bên ngoài thì nên nhận thông qua một server chuyên dụng khác với server ứng dụng. Những server như thế được gọi là Bastion Server. Do chúng sẽ ở trạng thái dừng hoạt động ngoài những lúc mà admin server sử dụng ra nên hoàn toàn có thể an tâm người bên ngoài xâm nhập là rất khó, nên sẽ làm tăng an toàn bảo mật lên.

### 11. Security Group

Là chức năng như giống như Firewall ảo sẽ tiến hành điều khiển traffic khi thực hiện truyền tin với các instance thuộc các security group khác nhau. Chúng không phải theo đơn vị subnet mà cần phải thiết lập theo đơn vị instance. Và mỗi khi mà khởi động instance (tạo instance mới) sẽ cần mapping instance đó với ít nhất từ 1 security group trở lên.

### 12. ElasticIP

Nó là địa chỉ IPv4 public mà có thể access từ internet. Trong trường hợp mà instance không có IPv4 thì sẽ cần mapping địa chỉ Elastic IP với instance rồi mới có khả năng truyền tin ra internet. Nó cũng như là từ máy tính local của bạn mà muốn kết nối internet vậy.

### 13. VPC Endpoint

Nó là cơ chế để các instance của VPC sử dụng địa chỉ IP private có thể truyền tin tới các resource khác như là S3, RDS ... Trên AWS chia ra 2 loại chính về access policy :

- Policy của resource base (đối voiws gói tin hay object của S3)
- User policy

Tuỳ vào bạn muốn điều khiển access như nào thì sẽ gán quyền một như là view ở bên trong resource thì dùng resource base policy), còn khi quyết định phạm vi có thể thao tác của user thì dùng user policy, hoàn toàn rất linh động mềm dẻo.

#### 14. IAM (Identity and Access Management) 【 User Policy 】

Là cơ chế điều khiển một cách an toàn việc access đến `AWS` đối với user. Bạn có thể vào `AWS Console` để thiết lập từ màn hình, bản thân IAM nó không mất tiền gì cả.Bằng Việc dùng IAM bạn có thể tiến hành các điều khiển như case dưới :

- User nào có thể dùng resource AWS？
- Rồi có thể dùng theo cách như thế nào ？

#### 15. ACL (Access Control List) 【 Resource base Policy】

Trong các resource thì cần phải attach ACL như là một sub resouce. ACL này sẽ định nghĩa xem account nào được cho phép access, rồi các group và loại access khác nhau. Ví dụ như Amazon S3 sẽ kiểm tra nội dung ACL được attach vào nó để phán đoán xem người thực hiện request với gói tin hay object là có thoả mãn nội dung ACL hay không.

Nguồn [qiita.com](https://qiita.com)