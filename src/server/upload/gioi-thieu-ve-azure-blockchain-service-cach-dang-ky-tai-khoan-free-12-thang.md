![](https://images.viblo.asia/7dd6b388-ea75-4337-bc5f-545fa0c06e87.png)

**Azure Blockchain Service** là một thành phần trong hệ sinh thái của Azure, thằng này chuyên cung cấp các dịch vụ cho phép người dùng có khả năng phát triển và vận hành các mạng blockchain với quy mô của Azure. Theo như nhà phát hành nói thì những lợi ích của Azure blockchain như sau:

* Giúp việc vận hành và triển khai mạng blockchain trở lên dễ dàng 
* Dịch vụ có tích hợp các công cụ để quản lý các consortium
* Sẽ không cần phải học các công cụ hay ngôn ngữ lập trình mới để phát triển smart contract.

Azure Blockchain thì được thiết kế để hỗ trợ nhiều ledger protocols. Hiện tại thì nó đang hỗ trợ cho  Ethereum **Quorum** ledger và sử dụng cơ chế đồng thuận [Istanbul Byzantine Fault Tolerance (IBFT)](https://github.com/jpmorganchase/quorum/wiki/Quorum-Consensus)

Người dùng sẽ không cần phải quan tâm vào vấn đề quản lý mạng  cũng như cơ sở hạ tầng cho các máy ảo nữa tất cả đã được hỗ trợ. Công việc còn lại chỉ cần tập trung vào phát triển sản phẩm mà thôi. Ngoài ra người dùng vẫn có thể phát triển ứng dụng của mình với các công cụ mã nguồn mở mà không cần phải học thêm những kiến thức mới.

# Các thành phần chính trong Azure Blockchain

### Consortium 
Đây là đơn vị lớn nhất trong một mạng blockchain Azure. Nó là một mạng private blockchain chứa những member khác bên trong. Mỗi mạng này đều có thể giới hạn member gia và chỉ những member tham gia vào mạng consortium private này mới có thể tương tác được với blockchain. Trong consortium tồn tại 2 loại role chính đó là :

* **Administrator**: Là những member có quyền thực hiện các thao tác quản lý consortium và có thể tham gia vào các giao dịch của blockchain
* **User** : Là những member không có quyền quản lý sortium nhưng có thể tham gia vào các giao dịch

Mạng Consortium thì có thể mix các role với nhau và tạo ra số lượng role tùy ý. Mỗi một consortium sẽ luôn luôn có tối thiểu là một administrator. Và dưới đây sẽ là hình ảnh minh họa

![](https://images.viblo.asia/951496d8-1b01-427b-a846-e1d5018e4edc.png)

| Action | User role | Administrator role |
| -------- | -------- | -------- |
| Create new member     | Yes     | Yes     |
| Invite new members  | No | Yes |
|  Set or change member participant role   |   No   |  Yes    |
| Set or change member participant role| No | Yes | 
|Change member display name |Only for own member | Only for own member| 
| Remove members | Only for own member |Yes | 
|Participate in blockchain transactions| Yes| Yes|

### Member
Member là đơn vị nhỏ hơn trong mạng có thể hình dung consortium như một tập đoàn thì member giống như các cổ đông tham gia. Mặc định một member tạo ra sẽ phải thuộc một consortium nào đó, trong lúc tạo nếu không có consortium nào để tham gia nó sẽ phải tạo ra một consortium của mình và nó sẽ là administrator của consortium đó luôn. Tối thiếu một member được tạo ra sẽ có một node transaction và một node validator. Lúc tạo member ta sẽ có hai kiểu để lựa chọn một là kiểu **Basic**, hai là kiểu **Standard**

![](https://images.viblo.asia/92abb473-5762-44f2-8870-82e1a8733aa0.png)

Nhà phát hành thì khuyên nên sử dụng loại basic cho các môi trường như dev hoặc test. Còn muốn sử dụng cho môi trường production thì loại standard sẽ phù hợp hơn. vì loại basic thì compute chỉ có 1 vCore, trong khi loại standard sẽ có 2 vCores nên 1 vCore có thể sử dụng cho transaction node với validator node và 1 vCore còn lại có thể sử dụng cho các dịch vụ liên quan đến cơ sở hạ tầng khác.

Và từ đây ta sẽ có cái nhìn tổng quát hơn về các thành phần trong một mạng blockchain Azure thông qua bức ảnh sau

![](https://images.viblo.asia/aac06c0e-d290-491e-9840-1af8ce009fd2.jpg)

### Node
Như đã nói thì bên trong các member sẽ chứa các node, tối thiểu như basic member sẽ là một node transaction và một node validator, còn loại standar sẽ có một node transaction và hai node validator. Đó là mặc định còn sau đó chúng ta có thể tạo thêm các node transaction tối đa có thể là 9 -> 10, riêng các node validator thì sẽ không thể thay đổi. Vậy member là các cổ đông thì các node sẽ như các nhân viên trực tiếp thao các với các client. Khi ta deploy contract hay là tạo transaction thì ta sẽ chỉ tương tác với các node mà thôi.

# Hướng dẫn tạo một member
Trước khi có thể tạo được member bạn cần có một tài khoản microsoft và cần phải xác minh thẻ thanh toán để có thể sử dụng free 12 tháng và có 200$ để sử dụng dịch vụ trong 30 ngày. Nó sẽ yêu cầu thẻ Visa hoặc mastercard: [tại đây](https://portal.azure.com/#create/Microsoft.Blockchain)

![](https://images.viblo.asia/0bdb982f-5d90-44e7-9707-11c007ad82fb.png)

![](https://images.viblo.asia/dc30c595-d39c-46ff-9241-20502830c6f4.png)

chọn Start free

![](https://images.viblo.asia/0f2dd399-43d2-4e0e-9518-2a2c9f5ee641.png)

sau khi đã add thẻ thanh toán ta có thể sử dụng các dịch vụ của nó

![](https://images.viblo.asia/524f8aa3-2c2a-4e78-8096-62e045423168.png)

Có rất nhiều các dịch vụ 

![](https://images.viblo.asia/c4214ec3-f390-4cb7-af51-44bb073659cf.png)

Sau khi đã có tài khoản và xác minh xong ta sẽ đến với việc tạo member 

### Các bước tạo một member
1.  Truy cập [Azure portal](https://portal.azure.com/).
2.  Chọn **Create a resource** ở góc trên bên trái của Azure portal

![](https://images.viblo.asia/593fa0f7-f4f8-4ef0-8e77-600dd4214875.png)

3. Chọn **Blockchain** > **Azure Blockchain Service** (preview)

![](https://images.viblo.asia/806a71b7-d3c3-46ff-8c81-6f757d18e9f2.png)

4. Điền các thông tin cần thiết

![](https://images.viblo.asia/cc69c081-9897-4ece-95f4-fb9ed6b48150.png)

5. Chọn **Review** + **create** để kiểm tra lại các settings. Chọn **Create** để tạo member sẽ mất khoảng 10 phút chờ đợi có khi hơn đấy
6. Đợi đến khi có thông báo là đã tạo thành công
7. Chuyển hướng đến blockchain member

Chọn **Overview**, bạn có thể xem thông tin cơ bản về dịch vụ của mình bao gồm RootContract address và member account.

![](https://images.viblo.asia/6e3d1d6c-69f0-4105-85fa-f09cd8f1164e.png)

Vậy là đã tạo được một member

# Configure transaction nodes

Các Transaction nodes được sử dụng để gửi các transactions đến Azure Blockchain Service thông qua một public endpoint. Để view transaction node sẽ làm như sau

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. Sau khi được chuyến đến trang của Azure Blockchain Service member. Chọn **Transaction nodes**

![](https://images.viblo.asia/6dc04bd1-4f32-44a8-adf7-03e9d18c73e1.png)

### Tạo thêm transaction node

Như đã nói ở trên bạn có thể tạo thêm các node transaction và tối đa thêm 9 node nữa tức tổng cộng sẽ có 10 node transaction. Bằng việc tạo thêm các node transaction bạn có thể tăng khả năng mở rộng hoặc phân khối việc phân phối tải. Ví dụ như bạn có thể có nhiều điểm kết nói cho nhiều ứng dụng khác nhau.

Các bước tạo thêm node transaction:

1. Ở trong Azure portal ta sẽ chuyển hướng đến Azure Blockchain Service member và chọn **Transaction nodes > Add**.
2. Hoàn thành các settings cho transaction node mới

![](https://images.viblo.asia/18c75d5a-6172-4a1e-bf2c-1be408e90276.png)

3. Chọn **Create**

Bạn cũng phải đợi khoảng 10 phút để hệ thống tạo mới một node transaction mới. Và nó được tính phí thêm như bảng tính phí sau:  **[Azure pricing](https://azure.microsoft.com/en-us/pricing/details/blockchain-service/)**.

### Thiết lập truy cập cho transaction node

Các Transaction nodes có một tên DNS duy nhất và các public endpoints.

Để có thể xem các thông tin chi tiết của endpoint sẽ làm như sau:

1. Trong Azure portal ta chuyển đến một  transaction nodes của Azure Blockchain Service member và chọn **Overview**

![](https://images.viblo.asia/e9119e12-860a-40d1-87b5-da33c1d4b538.png)

Các endpoint của transaction node thì được bảo mật và yêu cầu xác thực nếu muốn truy cập. Có nhiều cách để connect đến một endpoint transaction như sử dụng Azure AD authentication, HTTPS basic authentication và sử dụng một access key thông qua HTTPS hoặc Websocket thông TLS.

&nbsp;
##### Azure Active Directory access control
&nbsp;

Transaction node thì có hỗ trợ xác thực bằng Azure Active Directory (Azure AD). Bạn có thể cấp Azure AD cho user, group hoặc  service principal truy cập đến endpoint. 
 
Để cấp quyền kiểm soát truy cập Azure AD endpoint:
1. Tại Azure portal chuyến trang đến Azure Blockchain Service member của bạn và chọn **Transaction nodes > Access control (IAM) > Add > Add role assignment.**
2. Tạo một assignment role cho user, group hoặc service principal(vài trò ứng dụng)

![](https://images.viblo.asia/a13adb2b-db3a-43de-bbdd-441e580b526c.png)

3. Chọn **Save**  để  thêm assignment role 

&nbsp;
##### Basic authentication
&nbsp;

Đối với  HTTPS basic authentication sẽ sử dụng username và password để đăng nhập qua  HTTPS header như bình thường.

Bạn có thể nhìn thấy những thông tin để basic authentication bằng cách chọn **Basic Authentication**  tại Settings

![](https://images.viblo.asia/b87a5c20-8b40-4485-95c8-1d206754294a.png)

User name là tên của node và không thể thay đổi được. Trong URL sẽ thay thế `<password>` với password của node và có thể thay đổi mật khẩu bằng cách chọn **Reset password**

&nbsp;
##### Firewall rules
&nbsp;

Có thể sử dụng các thiết lập của Firewall để cho phép hay chặn các địa chỉ IP. Tại phần Settings chọn **Firewall rules** và thiết lập tùy ý

![](https://images.viblo.asia/a5ec89f4-eb57-4a78-8698-57b985ea0d07.png)

Để enable:

* **Single IP address**: Là cho phép chỉ địa chỉ IP nào được truy cập, nên sẽ để START IP và END IP là một.
* **IP address range**: Sẽ configure một dải địa chỉ được phép truy cập. Ví dụ: từ 10.221.34.0 đến 10.221.34.255 điều này sẽ cho phép toàn bộ dải 10.221.34.xxx.
* **Allow all IP addresses** : Sẽ là configure từ 0.0.0.0 và kết thúc 255.255.255.255

&nbsp;
##### Connection strings
&nbsp;

![](https://images.viblo.asia/398e2426-5b3d-450a-87e8-76cb8dcbefed.png)

&nbsp;
##### Sample code
&nbsp;

Phần này sẽ là các ví dụ về các cách connect đến transaction node như Web3, Nethereum, Web3js và Truffle.

![](https://images.viblo.asia/e3a4bfd9-d357-4970-a41e-1e5e2dff5f81.png)

# Kết luận 

Bài viết này mình muốn giới thiệu về Azure blockchain service và hướng dẫn cách tạo member cũng như các configure truy cập của một transaction node. Bài viết sau mình sẽ hướng dẫn cách kết nối transaction node với Remix, Vscode và hướng dẫn cách sử dụng Azure Blockchain Development Kit for Ethereum extension để viết smart contract sau đó deploy lên mạng. Rất cảm ơn đã đón đọc hẹn mọi người trong các bài viết tiếp theo


**Nguồn**: https://docs.microsoft.com/en-us/azure/blockchain/service/