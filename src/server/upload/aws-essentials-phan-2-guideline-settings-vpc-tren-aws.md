Tiếp tục với chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, sau bài viết Settings IAM thì tiếp đến mình sẽ giới thiệu về Settings VPC (Virtual Private Cloud) trên AWS.

Trước khi đi vào chi tiết settings từng phần, mình sẽ điểm lại một số khái niệm, định nghĩa cơ bản về VPC  (Virtual Private Cloud) 

# 1. VPC là gì?
Định nghĩa đơn giản:
VPC là một private subsection của AWS, là nơi để người dùng có thể điều khiển, cũng như tích hợp AWS resource (Như là EC2 Instances hay Database) vào trong VPC. User root sẽ có toàn quyền điều khiển xem ai có quyền access vào AWS resource mà ta đã đưa vào trong VPC.

Định nghĩa của phía AWS:
VPC  (Virtual Private Cloud) cho phép chúng ta cung cấp một section với logic độc lập trên Amazone Web Service, nơi chúng ta có thể đưa AWS resource vào mạng **internet ảo** (internet virtual) mà ta đã định nghĩa. Và chúng ta sẽ có toàn quyền điều khiển mạng môi trường virtual internet này, bao gồm cả việc lựa chọn dải địa chỉ IP, tạo mới **Subnets** và config **Route tables** và **Network gateways**.

Mô hình VPC được ví giống như phía Facebook:
- Giống như Homepage phía Facebook, sẽ bao gồm My VPC, Your VPC, Friend's VPC.
- Chúng ta sẽ có full-control trên My VPC
- Trên VPC cá nhân, chúng ta có thể đưa resource EC2, RDS vào và settings ai có quyền access tới các tài nguyên này (giống như trên Facebook, setting privacy những account có quyền tương tác, view các bài viết,...)

![](https://images.viblo.asia/0d3ff431-ddd0-4688-9cd6-9fa7d707f1f1.png)

# 2. Những thành phần cơ bản của VPC
# 
VPC Basics: Để cho mọi người có một cái nhìn tổng quan và đẩy đủ về các thành phần cơ bản của VPC cũng như chức năng của từng phần. Mình sẽ đưa ra một ví dụ so sánh trực quan mà ít nhiều ai cũng có những hiểu biết nhất định: Đó là Home Network

Mô hình Home Network
![](https://images.viblo.asia/488e2fba-b30a-4f31-8f05-d6b1f5015129.png)

Các thành phần cơ bản của Home Network:
1. (1) **Wire**: Mạng dây các nhà mạng cung cấp đến từng hộ gia đình (FPT,Viettel,...). Connect giữa Internet tới ISP của bạn (Modem).
1. (2) **Modem**: Kết nối (hay gateway) của từng hộ gia đình tới internet
1. (3) **Wire**: Kết nối Router tới Modem.
1. (4) **Router/Switch**: Thiết bị cho phép người dùng connect toàn bộ các thiết bị tới mạng network. Routes sẽ điều hướng các thiết bị trên mạng network, kiểm tra các kết nối này thông uqa modem hay là kết nối từ Internet.
1. (5) **Firewall**: Để các Local device có thể kết nối tới Internet thì cần phải thông qua Firewall. Firewall Cung cấp các lớp bảo mật để tránh các kết nối không mong muốn có thể truy cập được vào các thiết bị. 
Nếu muốn setting communication các kết nối tới thiết bị, chúng ta sẽ chọc lỗ kết nối ảo để cho các communications này được pass qua Firewall.
1. (6) **Local Devices**: Các thiết bị local như máy tính, điện thoại, hoặc bất kì thiết bị nào có khả năng kết nối vào internet

Mô hình VPC cơ bản:
![](https://images.viblo.asia/b9e7452e-67f9-4093-975a-3710c061821a.png)

VPC cũng sẽ có đầy đủ các thành phần với các chức năng tương ứng giống như Home network. Khi tạo một tài khoản AWS, thì "default" VPC cũng sẽ được tạo. Và default VPC này sẽ bao gồm các thành phần cơ bản như sau:
1. (1) Internet Gateway (IGW)
1. (2) Route Tables (Với predefined ban routes ban đầu với default subnets)
1. (3) Network Access Control List (với predefined rules cho kết nối)
1. (4) Subsnet để cung cấp AWS resource vào VPC (Như EC2 Instances)

Chúng ta sẽ cùng đi vào tìm hiểu chi tiết và Settings Guideline từng thành phần cơ bản trên của VPC
## 1. Internet Gateways (IGW)
### Định nghĩa:
Là một thành phần của VPC cho phép communication giữa các Instances trong VPC và Internet.
Nhằm đảm bảo tránh các rủi do không mong muốn hoặc risk trên băng thông đường truyền.

Note: Default VPC sẽ đều có Internet Gateway với trạng thái **attached**

### Settings Internet Gateways:
![](https://images.viblo.asia/422c1b12-c455-4c43-96c4-51ae7289b98b.png)

### Có thể thấy dưới đây, các thành phần cơ bản trên VPC đều đã được khởi tạo trước khi tạo Account AWS:
### 
![](https://images.viblo.asia/e5d6e56c-a38d-44a4-a4b9-c3d6d875fea7.png)

### Default setting Internet Gateways (IGW):
- VPC ID mà AWS khởi tạo sẵn cho chúng ta là ID:  vpc-55b55333
- Internet Gateways ID default: igw-e07b7d84 với trạng thái **attached** default. 
Tức là IGW ID này đã được tích hợp sẵn vào VPC default tương ứng. Và chúng ta có thể tiến hành **detached**  kết nối này để settings kết nối khác.

![](https://images.viblo.asia/207431ba-5367-4698-b561-54a5ac0de834.png)

### Tạo mới Internet Gateways (IGW):
![](https://images.viblo.asia/cdd016f8-b2b5-4abe-8ad4-8014b6ad5d7a.png)


Lưu ý: **Một** IGW chỉ có thể setting **attached** tới **một** VPC duy nhất
Trường hợp muốn setting IGW khác tới VPC, chúng ta sẽ phải **dettached** kết nối cũ rồi mới có thể **attached** kết nối mới từ IGW tới VPC.

![](https://images.viblo.asia/5ca5e226-8b46-4ee5-882a-c1f850d62090.png)

Vậy là chỉ với một vài thao tác đơn giản, chúng ta đã có thể tạo mới IGW mới để connect tới VPC default. Bài viết này mình chưa đề cập tới chi tiết viết tạo VPC mới vì việc này liên quan tới việc setting dải IPv4 tương ứng cho từng VPC nên tạm thời bài viết giới hạn trong việc sử dụng kết nối VPC default với dải IP default phía AWS cung cấp.

## 2. Routes Tables
### Định nghĩa:
Routes Tables bao gồm các **set of rules**, được gọi là **routes**, được sử dụng để định trước tuyến network traffic cho các kết nối.
Note: Default VPC có một **main** route table
VD:
- Chúng ta có 2 EC2 Trong mạng Subnets và muốn connect 2 EC2 này tới internet.
- Đầu tiên thì communication của 2 EC2 này sẽ phải thông qua Network Access Control list (Sẽ đề cập tới ở phần sau)
- Data sẽ dược truyền tới Route Table, và Route table sẽ quyết định sẽ redirect kết nối này nên tới đâu. 

### Khi trỏ vào Route kết nối thì sẽ có 2 Routes default:
- Một route local: Biểu thị cho việc các communication với IP address nằm trong dải IP CIDR range là **172.31.0.0/16** dưới đây thì các communication đó sẽ keep là communication local trong VPC
 ![](https://images.viblo.asia/98018273-0ef2-4706-adeb-7915f52bc178.png)
- Một route connect tới IGW (dưới đây là trạng thái blackhold do ở step trước chúng ta đã dettached kết nối IGW default tới VPC và thay bằng một IGW mới)
Route connect tiếp theo với destination là **0.0.0.0/0**: Biểu thị rằng bất kì kết nối nào không được chỉ định kết nối tới local subnet thì sẽ được trỏ default tới kết nối này (chính là Internet Gateway) và sẽ communicate với Internet (nếu trạng thái là active, trạng thái blackhole sẽ không connect được tới internet) thay vì chỉ communicate nội bộ trong VPC.
![](https://images.viblo.asia/4f573359-662f-4b8a-8b0b-f2f7885f1795.png)

- Setting Routes sang kết nối IGW mới được khởi tạo
Lúc này các kết nối thông qua IGW mới sẽ có thể communicate với Internet
![](https://images.viblo.asia/00ed41ed-d9f6-462f-ba58-80d4f7b1173b.png)

**Lưu ý: Nếu đã setting Route Table có các subnets liên kết với Route Table, chúng ta sẽ không thể delete được Route Table đó.**

## 3. Network Access Control List (NACLs)
### Định nghĩa:
Network Access Control List (NACLs) chính là các lớp bảo mật cho VPC giống như là Firewall để điều khiến các tín hiệu traffic in/out của một hay nhiều **subnets**.
Note: Default VPC đã có NACL và được connect tới default subnets. Subnets sẽ được đề cập ở mục 4

Network Access Control List:
![](https://images.viblo.asia/4b2ed722-85c0-412b-9a80-8997d1958159.png)
Điều quan trọng chúng ta cần hiểu đó là Network Access Control List là **stateless** (Không có trạng thái cố định). Tức là user phải set rule cho inbound/outbound vượt qua được **NACL**. Hiểu một cách đơn giản là chúng ta phải đục các lỗ ở Firewall để định tuyến cho các kết nối **IN/OUT** có thể vượt qua được. 
**NACL** cũng là nơi định tuyến xem các connect có được thực hiện giữa các subnet hay không, hay là allow/deny các kết nối từ **Subnet** tới **Route table**.
Để thực hiện được điều này thì chúng ta sẽ tạo ra các **Rules**
**AWS chia thành 2 rule: **
- Inbound Rules: Control các communication vào trong Subnets.
- Outbound Rules; Control các communication từ Subnets ra ngoài. 


### Inbound Rules
Default AWS sẽ khởi tạo cho chúng ta 2 rules:
- Rule đầu tiên được đánh số 100 để lưu ý rằng rule này được đánh số, tất cả các rule chúng ta khởi tạo và modifie đều có số liên kết với nó.
- Rule thứ 2 là default rule được chạy sau toàn bộ các rule được đánh số khác, và default rule này là một "**Deny**" rule. Cơ bản rằng, nếu các kết nối không thuộc rule đã định nghĩa thì sẽ tự động bị từ chối. 
![](https://images.viblo.asia/9818cd78-2846-49c9-ba8f-9cfffa2182ab.png)

- Tất cả các rules đều được chạy theo thứ tự. Từ số nhỏ nhất so tới số lớn nhất và cuối cùng sẽ tới rule default DENY.
- Khi chạy tới rule number đã match thì sẽ tự động dừng chạy qua các rule tiếp theo, bởi vì rule tương ứng đã được tìm thấy.  
- Rule 100 default là rule "Allow All Traffic". Nếu chúng ta update rule này từ All trở thành Rule chỉ cho phép Allow qua Type SSH Protocal TPC thì chúng ta sẽ cho phép các kết nối TPC từ bất kì Source nào.
Vì mục đích security thì chúng ta có thể muốn restrict phần này thành IP address nội bộ hoặc IP address admin hơn là việc open IP address này cho cả thế giới.
Tuy nhiên trong bài viết này với mục đích training chúng ta vẫn có thể giữ SSH open bởi phần này sẽ delete sau khi chúng ta training xong.
→ Nếu các access match với rule 100 với type SSH và Protocal TCP thì sẽ cho ALLOW kết nối, nếu không thì kết nối này sẽ bị DENY.
![](https://images.viblo.asia/78b3c876-5e73-415a-bda2-6382a6ec0225.png)

Ví dụ chúng ta tạo ra một rule giống hệt với RULE 100 là RULE 90 nhưng thay vì ALLOW thì setting là DENY cho type SSH và Protocal TCP. thì bởi vì rule 90 đứng trước rule 100 vậy nên cơ bản sẽ DENY toàn bộ kết nối type SSH và protocal TCP tới Subnets và bởi đã tìm thấy matching rule nên sẽ không chạy qua rule 100 tiếp
Cơ bản thì rule 90 và 100 là trái ngược với nhau, tuy nhiên thì vẫn có thể setting được như vậy do logic xử lý từ trên xuống dưới của AWS.

### Outbound Rules
Nếu với Inbound rules chúng ta nhận các kết nối qua port 22. thì phía Outbound rule với mục đích security chúng ta có thể setting range cổng kết nối khác với Inbound Rule
VD: 1024 - 65535 (Port khả dụng nằm trong dải 0 - 65535)
Các port này sẽ được sử dụng để return các communication và các return communication có thể sử dụng tuỳ ý các port trong dải setting 1024 - 65535
![](https://images.viblo.asia/ee5a9e8e-831b-49e5-b537-f3da0e5cda78.png)

### Subnets
Default AWS cung cấp cho chúng ta 3 Subnets
![](https://images.viblo.asia/2ed1761f-08f4-486b-9503-cdad8419587a.png)
Giả sử chúng ta tạo mới NACL mới, thì default sẽ không có Subnets nào bởi toàn bộ subnet đã được kết nối tới NACL default chứ không phải NACL mới
Công việc đơn giản của chúng ta là edit Subnet và tự add thêm Subnet tương ứng với NACL mới. 
- Default kết nối Subnet này sẽ tự động DENY toàn bộ kết nối mới vì chúng ta chưa setting kết nối ALLOW nào mà chỉ có rule default duy nhất là DENY.
- Add new Inbound and Outbound rules
![](https://images.viblo.asia/9ded0b0a-f6b3-499b-8307-935db65e5e46.png)
![](https://images.viblo.asia/8bec84f9-f6c7-451a-969a-d89a9cd77255.png)

Kết quả được thể hiện dưới sơ đồ sau:
- Chúng ta có 1 Subnet với EC2 connect tới rule default
- Subnet còn lại với EC2 connect tới NACL mới với rule chúng ta vừa định nghĩa ở trên.
![](https://images.viblo.asia/dc3bc6c1-4e8b-476c-8090-69446572e1b9.png)

Tổng hợp kiến thức về NACL:
1. (1) Rule được ưu tiên theo rule number từ nhỏ tới thấp
1. (2) Rule đầu tiên matching sẽ được áp dụng cho traffice type và ngay lập tự apply rule này. Các rule sau sẽ không được thực hiện
1. (3) Default NACL sẽ allow toàn bộ kết nối tới default subnets.
1. (4) Bất kì NACLs nào được add mới thì default sẽ là DENY toàn bộ kết nối của Subnets
1. (5) **Một** subnets chỉ có thể kết nối tới **một** NACL duy nhất trong cùng một thời điểm.


Mình xin kết thúc Guideline setting VPC trên AWS tại đây. Hẹn gặp mọi người ở những phần tiếp theo về setting EC2 và RDS sắp tới