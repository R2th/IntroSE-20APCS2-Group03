## 1. Giới thiệu về Hyperledger Fabric

Như mình đã giới thiệu ở Bài 1,  Public Blockchain là một mạng mà ai cũng có thể tham gia, tương tác với mạng và truy vấn dữ liệu, điều này khiến một số Tổ chức không hài lòng vì họ không muốn công khai các số liệu hoạt động của mình.  Mặt khác, đa phần các tổ chức chỉ cần đặc tính không thể sửa đổi của Blockchain, hay nếu một cụm các Tổ chức cùng xây dựng một mạng thì họ chỉ cần "tính phân tán" trong phạm vi các Tổ chức đấy và với mỗi một mạng thì lại có một quy trình nghiệp vụ khác nhau nên việc sử dụng Public Blockchain là không cần thiết và thiếu riêng tư. 

Trong khi các mạng Public Blockchain đang dần điều chỉnh để phù hợp hơn với yêu cầu riêng tư của thị trường thì Hyperledger Fabric được sinh ra để làm việc đấy.

**Hyperedger Fabric** là một trong 5 Framework về Blockchain nằm trong chiến lược **Hyperledger Umbrella** của **Linux Foundation** gồm : Hyperledger Indy, Hyperledger Fabric, Hyperledger Iroha, Hyperledger Sawtooth, Hyperledger Burror. Điều đặc biệt là Hyperledger Fabric được contributed bởi ông lớn **IBM**.

Hyperledger Fabric có **modularity** ( tính mô đun) khá cao nên nó cho phép các Doanh nghiệp dễ dàng **plug and play** để xây dựng một ứng dụng Private Blockchain phù hợp các yêu cầu nghiệp vụ của mình .

Phiên bản mới nhất của Hyperledger Fabric tại thời điểm viết bài này là 2.0.0-alpha. 

Đến đây, mọi người có thể hiểu rằng nói Hyperledger Fabric là một mạng Private Blockchain cũng đúng, hay là một Framework để xây dựng Private Blockchain cũng đúng. 

## 2. Kiến trúc của một mạng Hyperledger Fabric.

### 2.1 Kiến trúc đơn giản của một mạng Hyperledger Fabric
![](https://images.viblo.asia/90b1f262-1182-4dd3-bf73-106b312937e8.png)

**N**: (Network) Mạng.

**NC**: Network Configuration ( Cấu hình của mạng ). 

**C**: Channel ( Kênh ), tập hợp các tổ chức có vai trò nhất định trong cùng một quy trình kinh doanh. Ví dụ, trong một channel về mua bán xe hơi sẽ gồm có 2 tổ chức là : Nhà sản xuất xe hơi, Nhà phân phối xe hơi.  

**CC**: Channel Configuration ( Cấu hình của kênh ).

**R**: Organization ( Tổ chức ).

**O**: Orderer Node: Nếu như trong Publuc Blockchain, tất cả các node của mạng đều tham gia vào quá trình đồng thuận, thì ở Hyperledger Fabric chỉ có Orderer tham gia vào quá trình đó.

**P**: Peer, là điểm tương tác giữa các thành viên trong tổ chức tương ứng với kênh, mọi hành động của người dùng đều phải đi qua peer.

**S**: Smart Contract (Chaincode) được cài đặt trên kênh, định nghĩa rõ các struct, các hành động mà người dùng có thể thực hiện để tương tác trạng thái của struct được lưu trong sổ cái. Ví dụ 1 struct như sau

```go
type Car struct {
	CarID                string
    OwnerID              string
	Description          string
}
```

**L**: Ledger ( Sổ cái ), lưu trữ trạng thái của các đối tượng.  Ví dụ :
```go
car01 := Car{CarID: "Merc", OwnerID: "thienthangaycanh", Description: "ABC" }
```
 Đối tượng *car01* sẽ được lưu vào sổ cái dưới dạng *key-value*, *key* được xác định như thế nào thì tùy thuộc vào người code Smart Contract, còn *value* là giá trị của *car01* được đưa về dạng []byte. Đương nhiên là cách lưu trữ của sổ cái L là lưu trữ theo kiểu blockchain, còn có thêm bước mã hóa hay xử lý gì cho cặp giá trị này không thì mình không biết, cái này phải hỏi IBM :smiley: <br><br>
 Vì đây là series hướng dẫn sử dụng nên mọi kiến thức mình sẽ tiếp thu theo kiểu chấp nhận rồi sử dụng, còn nếu bạn muốn đào sâu hơn để contribute cho Framework này thì bạn có thể clone project về rồi nghiên cứu từ từ  https://github.com/hyperledger/fabric
 
 **CA** : Certificate Authority, phát hành identity cho người dùng hoặc node của tổ chức tương ứng. Ví dụ, người dùng A là thành viên của Tổ chức R1, khi muốn tham gia vào mạng thì sẽ gửi yêu cầu đến CA1, sau đó CA1 sẽ tạo ra một identity gồm private-key, public-key và các đặc tính liên quan khác, sau đó trả về cho người dùng A, từ đó về sau A dùng identity đó để  thực hiện các tương tác với mạng, mạng sẽ tự động biết đó là người dùng A đến từ tổ chức R1.
 
 **A**: Application, ứng dụng hay giao diện (web, mobile app ) giúp người dùng tương tác với hệ thống dễ dàng hơn. 
 
 Tất cả cả thành phần ở trên hoặc là chạy trên docker hoặc là ta có thể thấy được định nghĩa của chúng trong code, nên tạm thời ta coi chúng là thành phần vật lý của mạng, vì thế chúng được đưa vào cấy trúc mạng, sẽ có những khái niệm ta không thấy được nhưng lại rất quan trọng, ta sẽ tìm hiểu sau. 
 
 ### 2.2 Quy trình xây dựng mạng 
 
 **Bước 1. Vụ nổ Big Bang**
 
 ![](https://images.viblo.asia/2024f2b2-e194-42ef-86fc-e03b862bd6c2.png)
 
 Hình trên là sơ khởi của một mạng N. Gồm có một Orderer Node O4, trên đó chạy một dịch vụ có tên là Ordering Services, tổ chức R4 nắm giữ quyền quản trị mạng N và thông tin này được lưu trong cấu hình mạng NC4, node CA4 có nhiệm vụ phát hành identity cho người dùng hoặc peer hoặc application đến từ tổ chức R4.  
 
Như vậy, đùng một phát chả hiểu từ đâu ra xuất hiện R4 cung cấp một Orderer O4 cho mạng, mọi hành động sau này như thêm tổ chức vào vào mạng, thêm kênh, cài đặt chaincode cho kênh, khởi tạo chaincode, yêu cầu thực thi chaincode,... đều phải đi qua Orderer O4 này ( bạn sẽ thấy rõ điều này ở các bài sau ). Và trong Hyperledger Fabric, tất cả các hành động trên đều là transaction ( giao dịch ).
 
 **Bước 2. Thêm một tổ chức quản trị**
 
 ![](https://images.viblo.asia/259d412e-7d43-43d9-a7e8-0ad0fe06298f.png)
 
 NC4 ban đầu được cấu hình để chỉ cho phép người dùng R4 có  quyền quản trị trên mạng. Trong bước này, mình sẽ thêm một tổ chức R1 vào mạng và cho phép R1 có quyền quản trị như R4:
 
 - Tổ chức R4 cập nhật cấu hình mạng NC4 để thêm tổ chức R1 làm quản trị viên. Sau thời điểm này, R1 và R4 có quyền ngang nhau đối với cấu hình mạng.

- Ta thấy CA1 cũng được thêm vào, CA1 sẽ cung cấp indentity cho người dùng của tổ chức R1. Sau thời điểm này cả người dùng từ R1 và người dùng từ R4 đều có quyền quản trị mạng. 

- Mặc dù O4 đang chạy trên một cơ sở hạ tầng nào đó của R4 nhưng R1 cũng có quyền như R4 đối với O4. 

Mình sẽ trình bày về Ordering service ở những bài sau, bây giờ bạn chỉ cần hiểu O4 như một điểm quản trị tất cả các hoạt động của mọi thành phần trong mạng.

**Bước 3. Định nghĩa 1 consortium**

Hiện tại mạng có thể được quản lý bởi R1 và R4, và có rất ít hành động mà có thể thực hiện được đối với mạng. Để có thể mapping các hoạt động kinh doanh vào mạng thì điều đầu tiên chúng ta cần làm là định nghĩa một **consortium** ( nhóm - tập đoàn ). Từ này có nghĩa đen là một nhóm các tổ chực cùng nằm trong một hoạt động kinh doanh, ví dụ *Tổ chức sản xuất* ô tô, *Tổ chức phân phối* ô tô được sản xuất bởi *Tổ chức sản xuất* đến tay *Người tiêu dùng*.

![](https://images.viblo.asia/8261d09f-8cc9-472e-b830-b3f4ee990ab2.png)

Một quản trị viên mạng (R1 hoặc R4) định nghĩa một consortium X1 có chứa hai thành viên, R1 và R2. Định nghĩa của consortium này được lưu trữ trong cấu hình mạng NC4 và sẽ được sử dụng ở giai đoạn phát triển mạng tiếp theo. CA2 là Cơ quan cấp identity cho người dùng, node, application đến từ tổ chức R2 này. Một consortium có số lượng tổ chức tùy ý, ở đây mình sử dụng trường hợp đơn giản nhất là 2. 

**Bước 4. Tạo một channel cho một consortium**

Kênh là một phương tiện truyền thông tin mà thông qua đó các thành viên của một consortium có thể giao tiếp với nhau. Có thể có nhiều consortium và nhiều kênh trong một mạng, nhưng mỗi consortium chỉ có một kênh. 

![](https://images.viblo.asia/5d69cabc-e097-4658-bcc7-615b6e4d3a7c.png)
 
 Một kênh C1 đã được tạo cho consortium X1. Cấu hình của kênh C1 được lưu trong cấu hình kênh CC1, tách biệt hoàn toàn với cấu hình mạng NC4. CC1 được quản lý bởi R1 và R2, 2 tổ chức này có quyền ngang nhau đối với C1. R4 không có quyền gì trong CC1.
 
 Kênh C1 cung cấp một cơ chế liên lạc riêng cho các tổ chức trong X1. Chúng ta có thể thấy kênh C1 mới chỉ được kết nối với Ordering O4. Trong bước tiếp theo, chúng ta sẽ kết nối các thành phần như Application và Peer.
 
 Mặc dù kênh C1 là một phần của mạng N, nhưng nó tách biệt hoàn toàn với N. Cũng lưu ý rằng tổ chức R4 không nằm trong kênh này  - kênh này chỉ dành cho xử lý giao dịch giữa R1 và R2. Trong bước trước, chúng ta đã thấy cách R4 đã cấp quyền quản trị mạng cho R1, rồi R1 tạo ra một consortium. Hiểu ngầm rằng R4 cũng đã cấp quyền cho R1 tạo kênh! Trong sơ đồ này, có thể là tổ chức R1 hoặc R4 đã tạo ra kênh C1. Một lần nữa, lưu ý rằng một kênh có thể có bất kỳ số lượng tổ chức nào được kết nối với nó - mình lấy ví dụ đơn giản nhất là 2.
 
 Cấu hình kênh CC1 chứa các quy định về quyền mà R1 và R2 có trên kênh C1 - và như chúng ta thấy R4 không có quyền gì trong kênh này cả. R4 chỉ có thể tương tác với C1 nếu chúng được thêm bởi R1 hoặc R2 vào cấu hình kênh CC1. R4 cũng không thể tự thêm mình vào kênh C1 - nó phải và chỉ được thực hiện vởi R1 và R2.
 
Đến đây ta có thể thấy rằng tính riêng tư của Hyperledger Fabric đến từ Kênh. Hyperledger Fabric rất mạnh về vấn đề này, vì nó cho phép các tổ chức chia sẻ cơ sở hạ tầng nhưng lại giữ được sự riêng tư của mình.

Mọi cập nhật cho cấu hình mạng NC4 từ thời điểm này trở đi sẽ không có ảnh hưởng trực tiếp đến cấu hình kênh CC1; ví dụ: nếu định nghĩa consortium X1 bị thay đổi, nó sẽ không ảnh hưởng đến các thành viên của kênh C1. Do đó, các kênh rất hữu ích vì chúng cho phép liên lạc riêng giữa các tổ chức cấu thành kênh. Hơn nữa, dữ liệu trong một kênh được cách ly hoàn toàn với phần còn lại của mạng, cũng như các kênh khác.

**Bước 5. Peer và Ledger**

Bây giờ, ta sẽ xem cách sử dụng kênh để kết nối các tổ chức lại với nhau.

![](https://images.viblo.asia/0852c582-086a-4d0e-93e2-8d9f768ed99c.png)

Một peer P1 đã tham gia kênh C1. Mỗi Kênh sẽ chỉ có một sổ cái duy nhất, mỗi Peer sẽ lưu trữ 1 bản sao của sổ cái này để người dùng từ tổ chức tương ứng truy cập. Chẳng hạn như P1 của tổ chức R1 lưu trữ trữ bản sao của sổ cái L1 để người dùng từ tổ chức R1 truy cập. <br>

L1 được **physically hosted** trên peer P1, nhưng **logically hosted** trên kênh C1 <br>

Lúc này, P1 và O4 có thể giao tiếp với nhau thông qua kênh C1.

Mọi thành phần từ người dùng đến peer đều cần có 1 identity. Vì thế P1 là cũng có một identity  (kiểu X.509 - chưa cần quan tâm X.509 là gì đâu ) do CA1 cấp, xác định P1 thuộc tổ chức R1.<br>

Khi P1 được start, nó có thể tham gia kênh C1 bằng cách gửi yêu cầu tham gia O4. Khi O4 nhận được yêu cầu tham gia này, nó sử dụng cấu hình kênh CC1 để xác định quyền của P1 trên kênh này. Ví dụ, CC1 xác định xem P1 có thể đọc và / hoặc ghi thông tin vào sổ cái L1 hay không.


**Bước 6. Application và Smart Contract ( Chaincode)**

Bây giờ kênh C1 có một sổ cái trên đó, chúng ta có thể bắt đầu kết nối các application để sử dụng một nghiệp vụ kinh doanh được định nghĩa trong smart contract. 

![](https://images.viblo.asia/b13ad1c2-aa6e-4de8-bf7b-be9dec97c38a.png)

Một smart contract S5 đã được cài đặt trên P1. Application A1 của tổ chức R1 có thể sử dụng S5 để truy cập vào sổ cái L1 thông qua peer P1. Trong kênh lúc này có A1, P1 và O4.

Cũng giống như các peer, orderer và người dùng, một application sẽ có một identity được liên kết với tổ chức tương ứng. Chẳng hạn A1 có một identity được CA1 cung cấp để xác định A1 thuộc về R1.

Bây giờ có vẻ như A1 có thể truy cập vào sổ cái L1 trực tiếp thông qua P1, nhưng trên thực tế, tất cả quyền truy cập được quản lý thông qua Smart Contract S5. Hiểu đơn giản là S5 định nghĩa tất cả các use case truy cập vào sổ cái L1; S5 cung cấp một tập hợp các cách xác định rõ ràng mà theo đó sổ cái L1 có thể được truy vấn hoặc cập nhật hoặc cập nhật như thế nào, bởi ai. Nói tóm lại, ứng dụng khách A1 phải thông qua Smart Contract S5 để tương tác với sổ cái L1!

Smart Contract có thể được tạo bởi các nhà phát triển ứng dụng trong mỗi tổ chức để thực hiện quy trình kinh doanh được chia sẻ bởi các thành viên của consortium.

Một kênh có thể có nhiều Smart Contract.

**Bước 6.1 Cài một smart contract**

Sau khi smart contract S5 được code xong, quản trị viên trong tổ chức R1 phải cài đặt nó vào peer P1. Đây là một hoạt động đơn giản;  sau đó, P1 có thể thấy logic triển khai của S5 - code mà nó sử dụng để truy cập vào sổ cái L1.

Khi một tổ chức có nhiều peer trên một kênh, họ có thể chọn các peer mà họ muốn để cài đặt smart contract; họ không cần phải cài đặt một smart contarct trên mọi peer.

**Bước 6.2 Khởi tạo một smart contract**

Để các thành phần khác được kết nối với kênh C1 biết về smart contract vừa được cài đặt; ta phải khởi tạo nó trên kênh C1. Trong ví dụ này, chỉ có một peer P1, một quản trị viên trong tổ chức R1 phải khởi tạo S5 trên kênh C1 bằng cách sử dụng P1. Sau khi khởi tạo, mọi thành phần trên kênh C1 đều biết về sự tồn tại của S5; điều đó có nghĩa là bây giờ S5 có thể được gọi bởi ứng dụng khách A1.

Lưu ý rằng mặc dù mọi thành phần trên kênh hiện có thể truy cập S5, nhưng chúng không thể thấy logic chương trình của S5. Điều này vẫn được giữ riêng tư đối với những peer đã cài đặt nó; trong ví dụ này có nghĩa là P1. Về mặt khái niệm, điều này có nghĩa là chỉ có interface của smart contract được khởi tạo. Và, cài đặt một smart contract hiểu đơn giản là nó được physically hosted trên một peer, trong khi việc khởi tạo smart contract hiểu là nó được logically hosted trên kênh.

**Endorsement policy ( chính sách chứng thực )**

Phần quan trọng nhất của thông tin phải đượctại thời điểm khởi tạo là một chính sách chứng thực. Nó mô tả các tổ chức nào phải phê duyệt các giao dịch trước khi chúng được các tổ chức khác chấp nhận vào bản sao của sổ cái. ĐỊnh nghĩa kiểu như R1 AND R2 hoặc R1 OR R2. 

**Invoking Smart Contract ( gọi hợp đồng thông minh )**

Khi một smart contract được cài đặt trên một peer và được khởi tạo trên một kênh, nó có thể được gọi bởi một application. Các application thực hiện điều này bằng cách gửi đề xuất giao dịch cho các peer thuộc sở hữu của các tổ chức được chỉ định bởi chính sách chứng thực. Đề xuất giao dịch đóng vai trò là tham số đầu vào cho smart contract ( tên function, tham số đầu vào của function đó ), sử dụng nó để tạo ra phản hồi giao dịch được chứng thực, được trả lại bởi peer cho application. Mình sẽ trình bày về transaction flow trong bài sau.

**Bước 7. Network completed**
![](https://images.viblo.asia/dca68a5d-a2f8-4353-8e9a-9e102b198986.png)

Việc thêm các peer P2 và A2, CA2, cài đặt Smart contract cho P2 tương tự như đối với R1.



## Link Tham Khảo 
https://hyperledger-fabric.readthedocs.io/en/latest/network/network.html