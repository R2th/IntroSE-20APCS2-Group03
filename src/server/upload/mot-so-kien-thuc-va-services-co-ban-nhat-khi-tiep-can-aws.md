Ở bài viết trước mình đã cùng các bạn đi qua những khái niệm cơ bản để bước chân vào làm quen với AWS, tiếp tục cho series ấy, ở bài viết này mình sẽ giới thiệu cho các bạn 1 vài services cơ bản, phổ thông nhất cũng như công dụng và cách sử dụng.
Để hiểu rõ thì chúng ta sẽ cần có tầm nhìn bao quát về hệ thống AWS này trước nhé
![image.png](https://images.viblo.asia/1f15eecd-4cf2-4f57-8311-0d8935ea0d8d.png)

# Phân biệt các loại service
AWS là một nhà cung cấp các giải pháp, dịch vụ đám mây. Trong đó các dịch vụ đám mây, không chỉ riêng AWS mà là hệ thống chung của cloud được chia thành các loại đó là
![image.png](https://images.viblo.asia/f008af22-291f-4021-8554-2b8f30880541.png)

Như ảnh trên, các bạn cũng có thể phần nào hiểu được các loại đó là:
* SaaS (Software as a Service): Nghĩa là một số "phần mềm như một dịch vụ", dùng để cho người dùng sử dụng trực tiếp một cách đơn giản, gần như k cần quan tâm có kĩ thuật tech hay không, ví dụ như Gmail, Office 365, toàn là những phần mềm quen thuộc mà hầu như ai cũng biết sử dụng đúng k, ví nó đơn giản hóa đi cho chúng ta rồi :smile:
* PaaS (Platform as a Service): "Nền tàng như một dịch vụ", nôm na nó là nhà cung cấp cho bạn thuê một dịch vụ mà bạn không cần quan tâm gì hết, chỉ cần quan tâm đến code của mình mà thôi. Ví dụ như Heroku, nhà cung cấp đã cung cấp sẵn cho bạn OS, runtime,... bạn chỉ việc up code của mình lên rồi hệ thống sẽ lo cho bạn toàn bộ những thứ còn lại, nhưng bất tiện là bạn không thể can thiệp vào quản lí hệ thống đó, vì vậy các nhà cung cấp đã làm ra loại thứ 3 IaaS.
* IaaS (Infrastructure as a Service): "cơ sở hạ tầng như một dịch vụ", nghe giải thích nghĩa cụm từ thế này thì đã đủ thấy bao quát rồi phải không, nghĩa là nhà cung cấp chỉ cung cấp cho bạn các thiết bị vật lý như server, còn việc server đó sử dụng OS gì, loại server gì (Apache, Nginx,...), được cấu hình trong giải mạng như thế nào, giải mạng đó private hay public, IP tĩnh IP động, ... tất cả những thứ khác ngoại trừ thiết bị vật lý, khả năng kết nối đến thiết bị đó và ảo hóa nó thì bạn sẽ là người setup và điều hành.
![image.png](https://images.viblo.asia/7fc61e9c-c4d2-4198-a6c5-d4930da8d8a5.png)
Mình muốn các bạn hiểu rõ nhưng khái niệm này trước vì hệ thống AWS cũng sẽ phân cấp kiểu như vậy, dần dần khi làm quen các bạn sẽ hiểu và phân biệt các hệ thống này rõ ràng hơn

# Các service phổ thông cơ bản nhất
Sau khi đã hiểu được khái niệm AWS là gì thì chúng ta cần biết nó có thể làm được gì, với AWS bạn có thể thuê và sử dụng các dịch vụ điện toán đám mây như: Compute (bao gồm cả hệ thống có máy chủ và không máy chủ), Storage (Lưu trữ dữ liệu), Database, Machine Learning, AI, Analytics,...
Nói ví dụ đơn giản như chúng ta có source code 1 trang web, chúng ta cần mua tên miền, cần server lưu trữ code, sau khi code vận hành được thì cần nơi lưu trữ thông tin người dùng, cần có cơ sở dữ liệu,...AWS là một nhà cung cấp có thể lo cho chúng ta tất cả những vấn đề đó.

Như đã trình bày ở trên, một trang web sẽ cần sử dụng đến những service với các loại như: Networking (hệ thống mạng chúng ta cần thiết lập quy định các máy chủ), Compute (hệ thống máy chủ tính toán cho chúng ta), Database, Storage (Nơi lưu trữ data của trang web). Với những danh mục thế này chúng ta có khá nhiều dịch vụ có thể đáp ứng, nhưng trong bài viết này mình sẽ trình bày một service cơ bản nhất trong mỗi mục để các bạn có cái nhìn cơ bản nhất về hệ thống AWS - MỘT TRANG WEB ĐƯỢC VẬN HÀNH NHƯ THẾ NÀO?

## Networking
Mình có tìm cho các bạn được 1 hình giải thích khá là đơn giản trên google
![image.png](https://images.viblo.asia/ab4c3896-11f7-4c49-9a79-329204f0414e.png)

- Bo ngoài cùng: Là hệ thống AWS
- Bo liền bên trong: Đại diện cho 1 VPC (Virtual Private cloud) chúng ta hiểu đơn giản như là một lớp mạng ảo để ngăn cách mình với thế giới xung quanh cũng được, chúng ta có thể thiết lập cho người bên người có thể nhìn thấy chúng ta hay không, đại loại thế :v , mỗi VPC của AWS sẽ tải dài toàn bộ AZ (Avaibility Zone) trong 1 region của AWS.
- 2 bo không liền bên trong: mỗi cái đại diện cho 1 subnet, mỗi subnet lại kiểu như 1 phân vùng nhỏ trong 1 VPC
- Ngoài ra thì ở ảnh trên còn có đề cập đến sercurity group, mỗi instance trong VPC sẽ được gắn với 1 security group, dùng để kiểm soát inbound và outbound traffic (muốn ra vào instance thì phải thông qua config của 2 thằng này).
- Internet gateway: Là cổng kết nối giữa mạng nội bộ của chúng ta (VPC) với Internet bên ngoài thế giới
Mình đưa ra những khái niệm này có thể chưa chuẩn nhưng sẽ giúp các bạn dễ tưởng tượng nhất nhé. Mặc định thì AWS đã chuẩn bị chúng ta 1 VPC default và subnet default thuộc VPC đó, mình hãy cứ xử dụng nó đi, cần config thêm một số cái như là:
Bạn tìm đến mục VPC trên thanh search, tìm bên menu bên tay trái chọn mục "Your VPCs", bạn sẽ thấy 1 table chứa các VPC của mình.
![image.png](https://images.viblo.asia/b95ef6b4-0c89-46dc-bd75-2969b00ebb42.png)

B1: Đầu tiên chúng ta cần tạo 1 internet gateway để public mạng của chúng ta ra ngoài internet, tìm feature "Internet gateway" trong mục VPC
![image.png](https://images.viblo.asia/36175570-295b-4c72-965f-45bec0600723.png)

Chọn "create internet gateway"
B2: Đặt tên cho IG đó, ví dụ là my-internetgateway-01
B3: Nhấn vào nút "Attach to VPC"
![image.png](https://images.viblo.asia/1731f6ab-b70b-42e1-acb1-d54fc483257a.png)

B4: Ở ô select bạn chọn VPC của mình, để attach nó vào.

B5: Mở public cho route table, cho phép VPC thông với internet bên ngoài
Chọn feature  "Route table" trong VPC
![image.png](https://images.viblo.asia/b887269d-350e-4c59-b31f-6f39a0f4284b.png)

chuột phải vào route kết nối với VPC, chọn edit route
![image.png](https://images.viblo.asia/6e5b222a-df6a-448d-b678-3021d7dcac77.png)

Nhấn nút add route, chọn 0.0.0.0/0, đại khái là chúng ta cho nó vào từ mọi nguồn, ở phần target chúng ta chọn mục Internet gateway, sau đó chọn vào internet gateway đã tạo ở bên trên, rồi nhấn save lại là được.
B6: Mở cổng cho security group, mặc định security group sẽ chỉ mở cổng 22 để chúng ta có thể SSH vào server của chúng ta, chúng ta muốn truy cập thông qua URL bằng internet thì cần mở thêm cổng http hoặc https thông qua cổng 80, để làm điều đó thì chúng ta tìm đến mục "security group" trong VPC, chọn checkbox security group "default" => chọn nút action => chọn "Edit inbound rules", type chúng ta chọn All trafic, source chúng ta chọn "anywhere-ipv4", đại khái chúng ta hiểu là chúng ta cho phép mở tất cả các cổng.

Như vậy là set up luôn networking rồi

## Compute
### Mục đích và lợi ích
Đối với Compute, EC2 (Elastic Compute Cloud) chính là dịnh vụ máy chủ cơ bản nhất, mỗi máy chủ EC2 hay được gọi là instance, chúng ta cần máy chủ đề tính toán và vận hành code của chúng ta đúng không. Mỗi instance này là một máy chủ,  chẳng khác nào máy tính của chúng ta cả, việc chúng ta thuê 1 instance EC2 giống như việc chúng ta thuê của AWS 1 chiếc máy tính khác, chỉ khác là chúng ta "Pay-as-you-go" nghĩa là mình chỉ trả tiền cho những gì mình dùng thôi, còn mình sẽ không phải tốn cả đống tiền mua cả cái server như họ.
Vậy chúng ta được lợi ích như thế nào?
Cái này trong các bài test chứng chỉ Foundation ( Clound Pratictioner ) có nhắc đến khá nhiều, các bạn có thể tìm hiểu rõ hơn, nhưng với kinh nghiệm mình học được thì có một vài ưu điểm to lớn đáng chú ý hơn cả như sau:
1. Như với cái tên có chứa từ "Elastic" nghĩa là đàn hồi, chúng ta có thể hiểu là tíết kiệm đi. Nếu chúng ta sử dụng máy chủ của riêng mình (On premise), chúng ta sẽ phải bỏ một số tiền khá lớn để mua nguyên 1 chiếc máy chủ, cũng tương đối đắt đó vì máy chủ cần cấu hình khỏe mà. Vậy tại sao chúng ta không thuê của họ, chúng ta chỉ trả tiền khi chúng ta sử dụng, còn khi ta trả lại họ thì ta sẽ không mất tiền trong các khoảng thời gian không sử dụng nữa, như vậy tiết kiệm được rất rất nhiều đúng không.
2. "Go global in minutes", đây là cụm từ AWS viết ra để mọi người tìm hiểu về các lợi ích của họ, nghĩa là "Toàn cầu hóa trong vài phút", cái này cũng rất lợi, nếu sử dụng máy chủ On-premise, khi cần mua 1 máy chủ, ta cần đặt mua nó, vài tuần thậm chí vài tháng, sau khi về ta còn phải set up dây mạng,  cấu hình vật lý phức tạp,...Rất rất mất thời gian, với AWS, bạn chỉ cần vài cú click chuột, trong tay đã có ngay 1 server có thể được gọi từ tất cả mọi nơi trên thế giới, một số dịch vụ có thể giúp server đó giảm độ trễ như CloudFront (service này mình sẽ giới thiệu sau)

### Cách sử dụng
B1: Bạn cần đăng nhập vào màn console của AWS, tìm vào mục service  EC2 (gõ lên thanh tìm kiếm là thấy nha)
B2: Sau khi vào màn hình Dashboard của EC2, chúng ta sẽ tìm và nhấn nút "Launch instance"
![image.png](https://images.viblo.asia/e570b799-f4c3-40a2-9609-d9b369b9ffa3.png)

B3: Ở màn này là nơi bạn chọn OS cho máy chủ của mình, có rất nhiều sự lựa chọn ví dụ như: Ubuntu 20.04, Ubuntu 18.04,  Amazon Linux 2, MacOs Mojave,... Lưu ý là để học tập và thử nghiệm chúng ta sẽ chọn loại nào có dòng chữ "free tier eligible" ở bên dưới nha, nghĩa là những OS đó nằm trong danh sách có thể sử dụng thử nghiệm miễn phí, mình sẽ chọn Amazon Linux 2.
![image.png](https://images.viblo.asia/481a8267-9406-43aa-9a2e-7cb2d7487edf.png)

B4: Chúng ta sẽ chọn loại instance, kiểu dạng như bạn muốn cấu hình máy thường, máy khỏe hay máy siêu siêu khỏe thì chọn ở đây nhá, ví dụ mặc định là AWS chọn cho chúng ta loại "t2.micro", loại này có thông số cấu hình là: ECUs, 1 vCPUs, 2.5 GHz, -, 1 GiB memory, EBS only (có 1 CPU, tốc độ CPU là 2.5Ghz,...), mình cứ cái này mà chọn, vì đang test mà :v: 
![image.png](https://images.viblo.asia/37619a58-6cd9-47d6-9aad-c66f7aaf2ff0.png)

B5: Nếu mặc định thì các phần sau bạn có thể cài theo mặc định họ setting và chọn "Review and Launch", nhưng nếu ai cần config sâu hơn có thể chọn "Next, config instance detail"  nhé. Ở bài này giới thiệu đơn giản nên chúng ta sẽ chỉ chọn "Review and launch"  luôn thôi.
B6: Sau khi nhấn nút "Review and Launch", chúng ta sẽ được chuyển đến màn review lại 1 nhungwx gì chúng ta đã chọn
![image.png](https://images.viblo.asia/172a2e86-a759-4122-9a3a-1f1b92299728.png)

Sau đó chúng ta ấn "Launch", sẽ có một modal hiện ra cho chúng ta hỏi sẽ có sử dụng key pair hay không, nếu sử dụng thì đã có chưa ? có muốn tạo mới hay không ? Key pair là một cặp public và private key (asymmetric key) dùng để truy cập vào EC2 instance. Chúng ta có thể chọn "Proceed without a key pair" để không cần sử dụng khóa nha, nhưng bài này mình sẽ hướng dẫn luôn các bạn sử dụng, vì thấy nó khá hay, kiểu dạng như khóa ssh ấy, bạn muốn vào được instance EC2 thì bạn cần có chiếc khóa đó. Mình đã có khóa rồi nên mình chọn "Chooose an existing key pair", các bạn chưa có nên chọn mục "Creat a new keypair", sau đó sẽ có 1 ô input cho các bạn nhập  tên khóa, mình sẽ đặt tên khóa là "aws-keypair" chẳng hạn. Sau khi nhập tên các bạn nhấn vào nút "Download key pair", lúc này bạn đã tải khóa của bạn về rồi, sau đó nhấn nút "Launch  instance" là xong, chúng ta đã khởi chạy một server rồi nhé. Lúc này họ sẽ thông báo mình khởi chạy thành công, mình nhấn nút "View instance" để trợ lại màn dashboard nhé.
![image.png](https://images.viblo.asia/9303611d-e60d-4998-b0e5-924dbd4942b5.png)

Ở màn này bạn đợi cho instance của mình chuyển trạng thái từ "Pending" => "Running" là xong rồi nha.

Chạy thì chạy xong rồi, giờ làm thế nào để mình test đây ? Chúng ta sẽ click vào ô checkbox instance vừa tạo

![image.png](https://images.viblo.asia/4bf136cb-7029-4eda-be8e-cdd68110b930.png)

ở mục detail bên dưới sau khi chọn checkbox, ta sẽ để ý đến "Public IPv4 address", đây chính là địa chỉ IP chúng ta cần truy cập vào để test sau khi hoàn tất
Nhưng trước khi lên URL test Http, chúng ta sẽ cùng truy cập vào server của chúng ta thông qua CLI bằng ssh trước.
Chúng ta chuột phải vào instance vừa tạo, tìm và chọn mục "Connect", chọn sang tab "SSH client"
![image.png](https://images.viblo.asia/fb07d05d-588c-4d33-837c-481658dd5e71.png)

Ở dòng example cuối cùng, chúng ta copy nguyên dòng đó và paste vào terminal của chúng ta, chú ý là phần "aws-keypair.pem", chúng ta thay bằng đường dẫn vào khóa mà chúng ta đã tải về keypair ban nãy nhé, như của mình là "Download/aws-keypair.pem", sau đó nhấn "Enter" màn hình chúng ta có abcxyz gì đó không chúng ta cứ viết "yes" rồi enter nha. Sau đó hiện ra như bên dưới là đã truy cập từ máy mình vào được đến server rồi đó các bạn
![image.png](https://images.viblo.asia/c0ba4582-6eb2-421c-98e4-f10f8bb3c2ef.png)

Bài này mình sẽ sử dụng server Nginx nha, để cài đặt server thì chúng ta sẽ viết command line
```
# chuyển sang tài khoản root
sudo su

# Cài đặt nginx
sudo amazon-linux-extras install nginx1 -y

# Bật nginx
sudo service nginx start

# Kiểm tra trạng thái xem nginx đã được bật hay chưa
sudo service nginx status
```

Sau khi kiểm tra trạng thái, chúng ta sẽ thấy trạng thái đang ở Active, như vậy là xong rồi đó
![image.png](https://images.viblo.asia/4df71299-7306-4df7-8ff8-bc7f5bc15801.png)

Sau đó chúng ta sẽ mở 1 tab brower mới và vào địa chỉ: http://dia_chi_ip_v4_public_ban_nay, ta sẽ thấy kết quả này là server chạy ngon lành rồi nha

Note: Lưu ý là nếu không như ý trên, bạn cần check lại xem security group gắn với EC2 này đã được mở các cổng ngoài cổng 22 hay chưa  (Như hướng dẫn phần networking bên trên nha)
Ngoài ra các bạn chú ý là nhớ terminate luôn instance EC2 khi không sử dụng nữa nhé, để dành tài nguyên sau còn sử dụng miễn phí nữa, vì miễn phí có hạn mà :v 

## Database
### Giới thiệu và mục đích
Database thì anh em dev ai cũng làm qua rồi, chúng ta phân ra làm 2 loại SQL và NoSQL, dùng để lưu trữ những thông tin cần để phục vụ cho server. Ở bài viết này mình sẽ cùng các bạn tìm hiểu về RDS, một loại database cũng sẽ tương đôi quen thuộc với các bạn vì đây là loại SQL (Structured Query Language)
![image.png](https://images.viblo.asia/4f6a363d-c836-4448-995d-b62199b91c1c.png)

RDS là một service của AWS, cung cấp các loại database thuộc loại SQL như: MariaDB, MySQL, MySQL Server,...
Trong đó bá nhất và đắt nhất thì mình thấy là AuroraDB, đây là một dạng DB tương thích với MySQL và PostgreSQL
"Amazon asserts Aurora is five times faster than standard MySQL databases and three times faster than PostgreSQL databases when used in the cloud"
Ngay như tài liệu AWS cũng đề cập, nó nhanh gấp 5 lần MySQL tiêu chuẩn và nhanh gấp 3 lần PostgreSQL tiêu chuẩn, có thể đạt perfomance nhanh gấp 15 lần, khả năng mở rộng rất lớn lên đến 128TB.

### Cách sử dụng
- Sử dụng DB service: Set up 1 database này khá đơn giản, bạn chỉ cần chọn "Create database"=> Chọn loại database mình cần sử dụng (các bạn test thì nên sử dụng MySQL thường nhé, đừng chọn Aurora vì giá nó chát lắm :v) => chọn các option mong muốn hoặc cứ mặc định rồi next next thôi.
- Sử dụng instance store: Ngoài ra thì để đỡ tốn chi phí trong quá trình thử nghiệm hoặc có thể một vài lí do khác ví dụ như: cần tốc độ query cực nhanh chẳng hạn, bạn cũng nên thử sử dụng cách cài đặt DB và lưu trữ trực tiếp trên instancec EC2, vì nó không phải vòng ra ngoài lấy dữ liệu rồi quay lại mà chỉ lấy trực tiếp luôn từ server, nên tốc độ nó thuộc dạng best performance, tuy nhiên nhược điểm của nó là không scale (mở rộng) ra được, vì EC2 không nở phần cứng ra được nha các bạn.

## Storage
### Giới thiệu về S3
Đối với 1 hệ thống web, ngoài database thì cần có 1 nơi lưu trữ data ví dụ như ảnh, file text,...AWS cũng cung cấp một số dịch vụ đáp ứng được nhu cầu này như: EFS, EBS, ... tuy nhiên S3 mới chính là chân lý :v 
S3 (Simple Storage Service) là một service cho phép chúng ta lưu trữ data dưới dạng object, có khả năng scale-up. Đây là lợi ích rất tuyệt vời của servicec storage, chúng ta không cần quan tâm hay tính toán bộ nhớ cần sử dụng bao nhiêu để đặt trước, chúng ta chỉ chả tiền cho bộ nhớ mà chúng ta sử dụng.
![image.png](https://images.viblo.asia/2f20f93a-5c6c-4100-8a7d-b82946498495.png)

S3 được chia thành nhiều loại (Class) khác nhau để phù hợp với chi phí và mục đích sử dụng của chúng ta ví dụ như:
* S3 Standard: Dạng tiêu chuẩn này là dạng mặc định khi chúng ta tạo ra 1 Bucket. Mỗi bucket ta tưởng tượng như 1 cái xô, trong cái xô đấy chúng ta đựng dữ liệu của chúng ta, dạng này thì tốc độ cao, phù hợp với như cầu truy vấn ra vào liên tục
* S3 Glacier: Dạng này rẻ hơn nhiều với S3 Standard vì tốc độ của nó khá chậm, phù hợp cho những dữ liệu lưu trữ lâu dài, lâu lâu mới dùng, như trường hợp chúng ta lưu data để backup dữ liệu
* S3 Deep archive: Loại này còn rẻ hơn nữa vì nó phù hợp cho những dữ liệu lưu trữ thực sự lâu, ví dụ như trường hợp 1 công ty kế toán họ lưu trữ các tài liệu chỉ để dự phòng, 7 hay 10 năm sau họ mới cần đến nó, tiết kiệm được rất nhiều tiền so với S3 Standard đấy nhé
* S3 Intelliegent-tiering: Loại này thì khá linh hoạt, khi bạn lưu trữ 1 đống dữ liệu, sau một thời gian (hình như 90 ngày thì phải) nếu bạn không sử dụng đến nó, nó sẽ cho vào mục dạng như Long-term, tiết kiệm giống như s3 glacier vậy, sau khi dữ liệu đó lại được gọi lại, thì nó sẽ lại đẩy về trạng thái frequently (thường xuyên sử dụng) để đạt performance tốt hơn.
* ...

### Cách sử dụng S3
B1: Tạo bucket
Chúng ta sẽ tìm đến service, các bạn search keyword "S3" trên thanh tìm kiếm
![image.png](https://images.viblo.asia/35432206-f66c-4cde-839b-8e2e9592bd36.png)

Nhấn "Create bucket", đặt tên cho bucket, ngoài ra ở màn này các bạn có thể tùy chọn thêm các option ví dụ như có bật mã hóa data hay không? (Tất nhiên là mất thêm tiền sử dụng rồi), mặc định có public data trong bucket hay không ? Nhưng những phần này để sau, chúng ta cứ mặc định rồi tạo đã.
![image.png](https://images.viblo.asia/0e479842-496a-4bae-ab5f-b90e22d64166.png)

Sau khi nhấn "Create" chúng ta đã tạo thành công 1 bucket, nhấn vào trong bucket đó, chúng ta cùng upload thử 1 ảnh lên đó nhé
B2: Nhấn vào nút "Upload", rồi nhấn "Add file", chọn 1 file gì đó muốn up lên, mình sẽ up 1 ảnh gif, rồi kéo xuống dưới rồi nhấn "Upload". Kết quả sẽ ra được như hình
![image.png](https://images.viblo.asia/8d5bff7f-b574-4089-8efd-05011520d1cf.png)

Rồi ta bấm vào file vừa upload
![image.png](https://images.viblo.asia/ae26f0da-7f31-4884-9669-4e8901833d21.png)

Ta sẽ thấy có "Object URL", ta dán lên thanh URL để xem ảnh ta vừa upload, nhưng lúc này bạn vẫn sẽ chưa xem được, vì mặc định S3 để các file trong bucket private mà
![image.png](https://images.viblo.asia/4a7b35b7-ba89-4f82-90fa-ac8bbc8b2713.png)

Để public nó, ta cần quay về detail bucket của chúng ta, chọn "Permission"
![image.png](https://images.viblo.asia/98ff3e13-8339-4118-8c72-1192453024f3.png)

Tìm xuống "Block public access (bucket settings)" chọn edit và bỏ tick "Block all public access" rồi nhấn "Save changes" => confirm
![image.png](https://images.viblo.asia/473cb759-dd2e-4b70-9851-289c3d6689fc.png)

Rồi ta lại quay về tab "Objects"
chọn vào checkbox ảnh ta vừa upload, chọn "action" => chọn "Make public"
![image.png](https://images.viblo.asia/25aab24d-4168-4b66-b373-a960fb50e654.png)

Sau khi make public xong, ta vào lại Object URL của ảnh vừa nãy, và ta sẽ thấy kết quả :v 
![image.png](https://images.viblo.asia/b31b3910-18ca-489a-a709-2f81ff16c281.png)

IMPORTANT: Các bạn nhớ delete, terminate hết những service không sử dụng đi để tiết kiệm tài nguyên miễn phí nhé.


Qua bài viết này, mình đã giới thiệu với các bạn xong 1 vài các service cơ bản mà hầu hết hệ thống web sử dụng AWS nào cũng cần đến. Mong các bạn có một cái nhìn tổng quát và rõ ràng hơn về AWS !