## Lời nói đầu
Chắc hẳn như các bạn đã biết, Cloud Computing là một thuật ngữ không còn xa lạ với mọi người nữa, và kể đến một trong những ông lớn đầu ngành mà không ai không thể không biết đó là Amazon với dịch vụ về Cloud đang được rất nhiều công ty lớn sử dụng như Netflix, Dropbox v..v.. đó là Amazon Web Service. Để hiểu tường tận về nó hay một cái nhìn tổng quát thì không phải điều mà tất cả mọi người đều có thể nắm được. Do đó mình có một ý tưởng về một series giới thiệu 1 cách căn bản nhất về các service của AWS cách hoạt động 1 cách cơ bản kèm theo hướng dẫn trực quan, hình ảnh và diagram để mọi người có thể hiểu một cách đơn giản nhất có thể

## Giới thiệu
![](https://images.viblo.asia/c62843e3-5b9c-468c-91ce-bd8e3a2f9e40.png)

Trên đây là một diagram khá đầy đủ về các services của AWS, và cũng chính là những thứ mình sẽ giới thiệu cho các trong series này. Trong bài viết này mình sẽ giới thiệu cho các bạn về IAM và VPC, 2 thành phần đầu tiên và cơ bản của AWS
### IAM (Identity & Access Management)

* Hiểu nôm na đây là nơi quản lý toàn bộ các AWS users và toàn bộ các của của accounts và services
* Những thứ cơ bản mà IAM quản lý bao gồm:
    * Users
    * Groups
    * IAM Access Policies
    * Roles

* Tài khoản được tạo lúc ban đầu của bạn được gọi là "root", mặc định thì root user sẽ có full quyền administrative.
* Tất cả các tài khoản tại mới mặc định đều không có quyền access vào bất cứ AWS services nào.
* Với tất cả user, ngoài trừ root, cần phải có permission để có thể access vào AWS services

Sau khi tạo vào giao diện của Identity & Access Management bạn sẽ thấy có một số Security Status chưa được thiết lập, ví dụ như Active MFA, tạo group, tạo thêm account v..v
![](https://images.viblo.asia/66c34db4-67ec-4752-8227-b893bacc55f5.png)

* MFA là xác thực 2 lơp mà các bạn thường thấy ở các giao dịch ngân hàng (Multi-Factor-Authentication), trong này thì nếu sử dụng app thì ta có thể sử dụng Google Authenticator, hoặc Authy
* Tạo 1 account để sử dụng. Thông thường không bao giờ chúng ta đăng nhập tài khoản root hằng ngày (vì lý do bảo mật), do đó chúng ta nên tạo thêm 1 IAM user với full quyền "AdministratorAccess"
* Để tăng mức độ bảo mật thì bạn có thể thêm các rule cho việc đặt password cho các user của mình
 
 #### Users & Policies
 
Như đã nói ở trên thì sau khi tạo 1 user mới thì chúng ta sẽ không có bất cứ quyền nào cho các AWS services, do đó cần phải tạo quyền tương ứng cho nó. Ví dụ như ảnh dưới thì chúng ta sẽ không có quyền access vào S3 ngay sau khi tạo tài khoản

![](https://images.viblo.asia/ba5c2015-1b5f-4d27-9797-4ea58d033aa9.png)

Do đó, chúng ta cần phải set quyền cho tài khoản đó, trong ảnh có rất nhiều quyền được tạo sẵn bởi amazon, nhưng chúng ta có thể tạo thêm những quyền cho riêng mình

![](https://images.viblo.asia/5e38d699-24f6-45b8-bcf4-0b97d7000827.png)

Mĩnh sẽ search các quyền của S3 và chọn "AmazonS3FullAccess", như vậy là user đó sẽ có full access với S3 service

![](https://images.viblo.asia/24a91b82-0916-4411-a3b9-5421b42b13a2.png)

#### Groups & Policies
Nếu bạn có quá nhiều user, và cùng chung 1 role, cứ mỗi một lần tạo user lại set role cho user đó thì thật là mệt mỏi, do đó AWS cho phép bạn tạo group để group toàn bộ các user mà bạn muốn vào làm 1 và có thể set role riêng cho group.

![](https://images.viblo.asia/24a91b82-0916-4411-a3b9-5421b42b13a2.png)
Thay vì việc set quyền cho từng người giờ bạn có thể set quyền cho cả group và những ai ở trong group đó đều có quyền tương ứng.

![](https://images.viblo.asia/223c9d88-c551-49bc-988b-e88b09617179.png)

#### IAM Roles 

Như trên chúng ta đã biết cách để tạo ra policy để có thể access vào các services như S3 v..v.. Nhưng làm thế nào để S3 có thể kết nối với EC2? Bạn mới chỉ tạo quyền cho user access vào S3 nhưng đâu tạo quyền để S3 có thể access vào EC2 và ngược lại. Do đó bạn cần tạo IAM Roles để xử lý vấn đề trên.

![](https://images.viblo.asia/57245f2b-82ee-4922-9257-d892468d9c64.png)

Bạn vào phần IAM trên service và chọn Roles, sẽ hiện phần create role cho các service 
![](https://images.viblo.asia/021befa3-df51-4284-b7d7-da384f40f4df.png)

Từ đây bạn chọn được service hiện tại của AWS, 3rd party, Web identity hoặc SAML là những type mà AWS hỗ trợ set role, từ đó ta set thêm role và policy mà mình mong muốn.

### VPC

#### Infrastucture

- AWS Region: là 1 group các AWS Resources được đặt ở một số địa điểm trên thế giới.
- Design các Region AWS ở nhiều nơi trên thế giới, với mục đích khách hàng ở trên khắp thế giới có thể connect với các server 1 cách gần nhất, ngoài ra để tránh việc bị ngắt kết nối đồng thời tại một server do thiên tai động đất (hiểu đơn giản để nhiều nơi, chỗ này bị hỏng thì còn chỗ khác)
- Mỗi một Region có nhiều **Availability Zones**
- AWS Availability Zone là nơi chứa các physical AWS data centers, hiểu nôm na là server chứa dữ liệu

#### VPC Basic
- VPC là gì? 

>**AWS Definition**
> Amazon Virtual Private Clound (Amazon VPC) lét you provision a logically isolated section of the Amazon Web Services (AWS) cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets and configuration of route tables and network gateway"

Có vẻ hơi khó hiểu, dịch theo định nghĩa trên thì ta có thể hiểu rằng VPC là nơi để chạy các AWS resources mà chúng ta đã define trước đó, và sử dụng nó, quản lý nó. Và để các bạn hiểu rõ hơn, thì mình có 1 ví dụ sau để giúp mọi người hiểu rõ hơn về VPC.

![](https://images.viblo.asia/3a5a5ae9-41e5-412b-bafa-2a31ed83fa54.png)

Chắc hẳn trong chúng ta ai cũng sử dụng facebook, và hãy tưởng tượng đơn giản rằng, homepage của bạn chính là 1 VPC, tại đây bạn có thể post status, upload video, phôto mà không bị người khác can thiệp vào, chỉ bạn có thể control nó, cũng giống như các homepage của bạn của bạn, bạn có thể vào xem, đôi khi không (do bị chặn), và bạn không thể điều khiển được trang các nhân của bạn. Và AWS cũng vậy, trong VPC của bạn, bạn có thể thêm các component, các service tùy ý phù hợp với nhu cầu của mình như EC2, RDS, S3 v..v. và toàn quyền xử lý và sử dụng chúng. 

Nếu ví dụ trên vẫn làm khó bạn thì mình có 1 concept khác để giúp bạn hiểu hơn về nó.

![](https://images.viblo.asia/977aea0f-30ef-4722-be2b-d338ffdbd7ab.png)
Giả sử coi hệ thống mạng trong gia đình là một private network, và các thành phần trong nhà như router, firewall, password đều do bạn quản lý, vận hành cho phù hợp với nhu cầu của bạn và gia đình, và những người xung quanh, hàng xóm của bạn không thể vào nhà của bạn thay đổi mà nếu không có quyền của bạn. 

Và để so sánh rõ hơn nữa về các thành phần của VPC thì mình có 1 hình minh họa để so sánh 
![](https://images.viblo.asia/afcf3bf4-b278-4e0c-b1aa-8340ca80b7db.png)

Chúng ta có thể thấy sự tương đồng giữa hình minh họa tổng thể VPC và Private network (PN) trong gia đình
- Cả 2 đều kết nối Internet bên ngoài thông qua Internet Gateway (VPC) hoặc Router (PN)
- Bên trong mạng nội bộ cũng có router/switch
- Về securiry đều sử dụng Firewall, với AWS có 1 tên khác là Network Access Control List (NACL)
- Mỗi một subnet trong Avalibility Zone, ứng với các PC hay Smartphone trong gia đình. 

#### Internet Gateway (IGW)
-  Là component dùng để kết nối giữa các instances trong VPC của bạn với Internet. Nếu không có IGW thì VPC của bạn không thể kết nối được Internet, giống như router không có thì nhà bạn không có mạng vậy
> VPC mặc định ban đầu thì IGW sẽ được **attached** sẵn rồi.

#### Route Tables (RTs)
> A route table contains a set of rules, called routes, that are used to determine where network traffic is directed
Hiểu đơn giản rằng, RTs là nơi điều hướng các xử lý của bạn với các component tương ứng. Ví dụ như hình ở trên, chúng ta có 2 subnet, thì route có chức năng phân biệt luồng dữ liệu, xử lý vào subnet nào tương ứng. Ngoài ra, RTs, còn kết nối giữa các subnet với IGW

#### Network Access Control Lists
> NACL là một phương thức bảo mật VPC của bạn và nó hoạt động giống như Firewall khi chặn các request không mong muốn từ user.

![](https://images.viblo.asia/541a7b40-91d7-45d0-85cf-82a2cfd4b5f2.png)

Có một số rule nhất định khi bạn sử dụng NACLs
1. Rule sẽ được thực hiện dựa theo tên của chúng từ thấp đến cao
2. Sau khi rule thứ nhất được thực hiện, thì sẽ apply nó ngay lập tức và bỏ qua tất cả rule tương tự cho loại request đó phía sau

Note: 
1. Với Default NACL sẽ allow toàn bộ inbound và outbound traffic HTTP, tất cả request còn lại sẽ bị denied
2. Với New NACL thì toàn bộ traffic sẽ bị Denied

#### Subnets

> Subnet, nói đầy đủ là sub-network là một sub-section của 1 network, thông thường thì 1 subnet sẽ bao gồm tất cả các máy tính trong cùng một location. Theo AWS thì khi bạn tạo VPC, bạn có thể tạo một hay nhiều subnets cho mỗi Avaibility zone. Mỗi subnets phải được tạo ra trên một Avaibility Zone và không thể mở rộng zone đó
Có 2 loại subnet đó là public subnet và private subnet:

![](https://images.viblo.asia/35098438-66cd-406e-8f40-c0eaaa2c846f.png)

- Public subnet: là subnet có route kết nối Internet
- Private subnet: là subnet KHÔNG có route kết nối Internet

Ví dụ: 
- Bạn tạo 4 Subnet, 2 subnet public, và 2 subnet private, thì bạn tạo một Route cho 2 subnet public cùng với đường dẫn đến internet gateway, như vậy 2 subnet đó sẽ public ra ngoài. Còn 2 subnet còn lại tạo với 1 route khác và k kết nối với Internet Gateway. Do đó, 2 subnet private sẽ hoạt động internal và private.

### Tổng kết

Vậy là các bạn đã biết tất cả các thành phần cơ bản nhất của VPC và IAM, các bạn có thể tự tạo một tài khoản AWS Free Tier rồi tự tạo thử những phần mình vừa mới đề cập ở trên. Trong bài viết tới mình sẽ đề cập về S3 và EC2, một trong những thành phần cốt lõi của AWS. Xin cám ơn tất cả các bạn, bài viết có gì sơ suất mong các bạn comment. Hẹn gặp lại các bạn trong số tháng 5 **Amazon Web Services for Essential - S3 and EC2**