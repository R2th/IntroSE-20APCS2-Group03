Ở bài trước mình đã giới thiệu cho các bạn cấu trúc đơn giản nhất của một network  Hyperledger Fabric (HF). Nhưng đó chỉ mới là một khung xương của project, ngoài khung xương (network) thì project cần có thêm ý thức ( chaincode và các logic khác ) để có thể chạy được. Nên ở bài này, mình sẽ giới thiệu trước cho các bạn các khái niệm cơ bản trong HF theo một cách dễ nhớ nhất, để bài sau chúng ta sẽ flow từ đầu đến cuối các bước build một project. 
# 1. Identity
Mỗi tác nhân trong HF bao gồm peers, orderer, client, admin,.. đều có một identity. Các tác nhân này sẽ sử dụng identity của mình để tương tác với mạng, identity đó được cấp dưới dạng một **X.509 digital certificate**.   Các identity rất quan trọng vì nó còn giúp hệ thống xác định tác nhân có thể thực hiện những hành động nào, có quyền truy cập vào những tài nguyên nào của network.

![](https://images.viblo.asia/a1c88e73-3430-40f7-b51e-e52e88670085.png)

Một **Public key Infrastructue** (PKI) là tập hợp các internet technologies cung cấp sự liên lạc an toàn trong network. 

Trong ngữ cảnh Hyperledger Fabric network thì PKI là tập hợp các **Certificate Authorities** của các tổ chức mà ở bài trước được minh họa là các node CA trong kiến trúc mạng.

Các Certificate Authorities này sẽ cấp cho mỗi tác nhân muốn tham gia vào vào mạng một identity. Ví dụ khi bạn registerUser một user có id là 'GV00' với CA của một tổ chức Academy chẳng hạn:

```javascript
# 
# Các khai báo, kết nối cần thiết đến CA của Academy
#

const secret = await ca.register(
            { affiliation: '', enrollmentID: 'GV00', role: 'client', attrs: [{ name: 'TeacherID', value: 20156425, ecert: true }] },
            adminIdentity
);
const enrollment = await ca.enroll({ enrollmentID: GV00, enrollmentSecret: secret });
const userIdentity = X509WalletMixin.createIdentity(
            'AcademyMSP',
            enrollment.certificate,
            enrollment.key.toBytes()
 );
```

thì kết quả trả về sẽ các file như sau: 

![](https://images.viblo.asia/ac61f940-4acf-47b9-8113-2cae777df5bc.png)

gồm các file GV00, file chứa public-key, private-key và bên trong file GV00 sẽ như sau:

![](https://images.viblo.asia/06a30d24-7c59-401f-8c53-d9763ed4a201.png)

nhìn vào những ký tự ta có thể hiểu được thì dễ dàng biết rằng đây là người dùng GV00 của tổ chức Academy. Nội dung của file này khi dùng package **cid** để giải mã thì sẽ có dạng:

![](https://images.viblo.asia/2c624cd3-487a-48e3-a448-d0161b84199c.png)

Identity được cung cấp bởi các CA và các identity này được kiểm chứng bởi một **Membership Service Provider** ( MSP ), hiểu đơn giản là CA cấp identity còn MSP sẽ kiểm tra và xác định identity đó là ai. 

# 2. Membership

Membership Service Provider (MSP) của một tổ chức tham gia - xác định CA nào được ủy quyền cấp identity hợp lệ cho các thành viên của tổ chức đó.

MSP không chỉ đơn giản là liệt kê ai là người tham gia network hoặc thành viên của channel. MSP có thể xác định các vai trò cụ thể mà một tác nhân có thể đóng trong phạm vi tổ chức mà MSP đại diện (ví dụ: quản trị viên hoặc là thành viên của nhóm tổ chức con) và là cơ sở để xác định đặc quyền truy cập trong phạm vi network và channel (ví dụ: quản trị viên, quyền đọc, quyền ghi).

Ngoài ra, MSP có thể cho phép xác định danh sách các identity đã bị thu hồi ( Certificate Revocation List ) xem hình đầu tiên.

## 2.1 MSP của các ORG

![](https://images.viblo.asia/7d66b73b-64bc-4fd1-bcf2-324e88906905.png)

Một tổ chức là một nhóm các thành viên được quản lý. Đó có thể là một tổ chức lớn như một công ty đa quốc gia hoặc nhỏ như một cửa hàng. Các tổ chức quản lý các thành viên của mình theo một MSP duy nhất. Lưu ý rằng điều này khác với khái niệm tổ chức được xác định trong chứng chỉ X.509 của identity, mà chúng ta sẽ nói sau.

Ví dụ: tổ chức ORG1 có thể sẽ có một MSP được gọi là ORG1.MSP. Trong một số trường hợp, một tổ chức có thể yêu cầu nhiều tổ chức con - ví dụ: ORG2.MSP.NATIONAL, ORG2.MSP.INTERNATIONAL, ORG2.MSP.GOVERNMENT, phản ánh các nhóm thành viên khác nhau trong tổ chức ORG2.

## 2.2 Một ORG có thể chia thành nhiều đơn vị

Một tổ chức thường được chia thành nhiều đơn vị tổ chức ( tổ chức con) - organizational units (OUs), mỗi đơn vị có một bộ trách nhiệm nhất định. Ví dụ: ORG1 tổ chức có thể có cả ORG1-MANUFACTURING và ORG1-DISTRIBUTIONOU để phản ánh các nghiệp vụ riêng biệt. Khi CA cấp chứng chỉ X.509, trường OU trong chứng chỉ sẽ chỉ đơn vị mà identity đó thuộc về.

## 2.3 Local and Channel MSPs

![](https://images.viblo.asia/39a6d82b-f72f-4740-aae4-04ac6850c1ba.png)

MSP xuất hiên ở 2 nơi trong một blockchain network: channel configuration ( channel MSP ) và trên một tác nhân ( local MSP). 

Local MSPs dùng để xác định identity cho clients (users) và cho các node (peers and orderers).  

Ngược lại, channel MSP xác định quyền quản trị và quyền tham gia ở cấp channel . Mỗi tổ chức tham gia vào một channel phải có MSP được xác định cho channel đó. 

# 3. Peer
Một Blochain network bao gồm chủ yếu các peer. Peer là thành tố cơ bản của network vì nó lưu trữ bản sao của Smart Contract ( Chaincode ) và bản sao của Ledger. 

![](https://images.viblo.asia/c8390d7d-5f93-4a7e-9522-2310061e970a.png)

Trong ví dụ này, network N bao gồm các peer P1, P2 và P3, mỗi peer lưu trữ một bản sao của L1. P1, P2 và P3 sử dụng cùng một chaincode S1, để truy cập vào bản sao của Ledger L1 được lưu trên nó.

Các peer có thể được tạo, start, stop, tái cấu hình, thậm chí là xóa. Chúng ta sẽ tìm hiểu các thao tác này sau.

## 3.1 Mối quan hệ giữa Peer với Ledger,  Chaincode

![](https://images.viblo.asia/1358fb1e-3e9d-4698-b945-e89e80a77fc6.png)

Một peer lưu trữ một bản sao của chaincode và ledger trên nó. 

Có thể có nhiều Ledger và Chaincode được lưu trữ trên một peer.

Bởi vì peer lưu trữ Ledger và Chaincode, các client và admin phải tương tác với một peer nếu họ muốn truy cập Ledger hoặc Chaincode. Đó là lý do tại sao các peer được coi là thành tố cơ bản nhất của Fabric. Khi một peer được tạo khởi tạo, vẫn chưa có Ledger cũng như Chaincode được lưu trên nó. Sau này chúng ta sẽ tìm hiểu cách Ledger được tạo ra như thế nào và cách cài đặt Chaincode trên các peer.

Một peer có thể trả về kết quả của một truy vấn cho client application ngay lập tức vì tất cả các thông tin cần thiết để đáp ứng truy vấn đều nằm trong bản sao của Ledger được lưu trên peer đó.  Tuy nhiên, các client application cũng có thể kết nối với một hoặc nhiều peer khác thực hiện truy vấn nếu nghi ngờ dữ liệu lưu trên peer hiện tại bị sai.

Giao dịch cũng  bắt đầu giống như truy vấn, nhưng có thêm các yêu cầu khác. Mặc dù các client muốn giao dịch cũng kết nối với các peer để gọi chaincode, nhưng không giống với việc truy vấn, một peer đơn lẻ không thể tự thực hiện việc cập nhật vào Ledger, vì cần phải sự đồng ý của các peer khác  - một quá trình được gọi là **consensus** với sự tham gia của orderer. ( Sẽ trình bày sau )

## 3.2 Mối quan hệ giữa Peer với Channel

![](https://images.viblo.asia/6fc6345f-f3b0-4343-86a5-cdb5bd6a8ee8.png)

Channel là cơ chế để các peer cũng như các thành phần khác có thể giao tiếp với nhau. 

Channel được hiểu đơn giản như một nhóm các tổ chức cùng chung một chuỗi giá trị tham gia vào cùng một channel, một tổ chức có thể tham gia vào nhiều channel, và peer như là điểm tương tác của tổ chức với channel tương ứng.

Các channel cho phép các application cụ thể giao tiếp với nhau trong blockchain network. Trong ví dụ này, application A có thể giao tiếp trực tiếp với peer P1 và P2 bằng cách sử dụng channel C. Hiểu đơn giản channel là một con đường để liên lạc giữa các application cụ thể với các  peer.


## 3.3 Mối quan hệ giữa Peer với Org

![](https://images.viblo.asia/c54d8609-cbaa-4c68-aac5-233a06507c02.png)

Vì Blockchain network là một mạng phi tâp tập trung nên nó được quản lý bởi một tập hợp các tổ chức chứ không phải là một tổ chức đơn lẻ. Các peer là trọng tâm của cách thức mà loại mạng phân tán này hình thành - và là điểm kết nối của các tổ chức với network.

Trong ví dụ này, chúng tôi thấy bốn tổ chức đóng góp tám peer để tạo thành một network. Channel C kết nối năm trong số tám peer này vào network N - P1, P3, P5, P7 và P8. Các peer còn lại chưa được tham gia channel này, nhưng có thể đang tham gia ít nhất một channel khác.


# 4. Smart Contract và Chaincode

![](https://images.viblo.asia/ab2d03b6-cea9-4ec7-a994-6ae0230711cb.png)

Hình trên mô tả prototype của một chaincode đơn giản. 

Smart Contract xác định các quy tắc giữa các tổ chức khác nhau trong các hành động. Các application gọi một smart contract để tạo ra các giao dịch được ghi lại kết quả trên Ledger.

Trong hình trên, chúng ta có thể thấy hai tổ chức ORG1 và ORG2 đã định nghĩa Smart Contract như thế nào để query, transfer và update. Các application từ các tổ chức này gọi smart contract này để thực hiện một bước đã thỏa thuận trong quy trình kinh doanh, ví dụ như để chuyển quyền sở hữu một chiếc xe từ ORG1 sang ORG2.

### Phân biệt thuật ngữ smart contract và chaincode

Người dùng thường xem các thuật ngữ smart contract, chaincode là một, cũng không sai. Tuy nhiên nói đúng hơn sẽ là, một smart contract định nghĩa các logic giao dịch, sau đó smart contract được đóng gói thành chaincode.

# 5. Ledger

Ở cấp độ đơn giản nhất, một blockchain bất biến ghi lại các giao dịch cập nhật kết quả thực hiện giao dịch trong một Ledger. Smart contract có thể truy cập theo 2 phần riêng biệt, một là lịch sử của tất cả các giao dịch và hai là trạng thái hiện tại của Ledger (kết quả sau khi thực hiện tất cả các giao dịch).

Mỗi kênh có thể có nhiều Chaincode nhưng chỉ có 1 Ledger.

![](https://images.viblo.asia/7755db23-0e88-41eb-8eb7-243402352ec8.png)

Ledger L khi phân tích ra sẽ bao gồm 2 đối tượng: Blockchain B và World State W ( Trạng thái hiện tại của dữ liệu ). Chúng ta có thể tùy chọn database để lưu Ledger L ( dùng LevelDB hoặc CouchDB ).

Blockchain B lưu lại toàn bộ giao dịch, gía trị của các đối tượng sau khi thực hiện các giao dịch ấy  được lưu vào World State.

![](https://images.viblo.asia/c6111732-b396-4fab-872d-55c39f796ed1.png)

Chảng hạn như hình trên, trong Ledger L mới chỉ có 2 block, block đầu tiên là genesis block ( không chứa giao dịch ), block thứ hai là block chứa 4 giao dịch T1, T2, T3, T4 khởi tạo cho 4 chiếc xe CAR0, CAR1, CAR2, CAR3, và lúc này ở World State chứa trạng thái hiện tại của 4 chiếc xe  ( color, model, owner ) và 4 chiếc xe đều được đánh version = 0 là mới nhất, có nghĩa là cả 4 chiếc này vẫn chưa có thay đổi gì về giá trị các thuộc tính. 

![](https://images.viblo.asia/da3767e8-329a-4f93-90d1-44ec09e49f03.png) ![](https://images.viblo.asia/5be7566b-4006-4d4a-bea4-516265b5f811.png)
 
 Một block B1 gồm có : Block header H, Blockdata D, Các transaction T có trong block đó, Block metadata M.
 
 Một transaction T4 sẽ gồm có: Header H4, Signature S4, Proposal P4 ( đề xuất giao dịch ), Response R4 ( phản hồi giao dịch ), Endorsements E4 ( chứng thực giao dịch ).
 
 # 6. The ordering service

Hầu hết các mạng Public Blockchain, chẳng hạn như Ethereum và Bitcoin, bất kỳ node nào cũng có thể tham gia vào quá trình đồng thuận ( consensus ). Hyperledger Fabric thì khác, nó có một loại node được gọi là một orderer (hay còn được gọi "ordering node" ), thực hiện nhiệm vụ "consensus", có thể là chỉ có 1 ordering node trong một network, hoặc có thể có nhiều node tạo nên 1 ordering service. 

Bởi vì thiết kế Hyperledger Fabric là dựa trên các thuật toán "deterministic consensus ", nên bất kỳ block nào đã được các peer validates và được tạo bởi ordering service thì đều được đảm bảo là chính xác. Ledger sẽ  không thể xảy ra tình trạng rẽ nhánh như các blockchain khác.

Ngoài vai trò trên, ordering service còn lưu trữ các thông tin khác như tổ chức nào được phép tạo channel, ai có thể thay đổi các cấu hình channel, và tất cả hành động thay đổi cấu hình đó đều phải đi qua orderer.

## Các cách triển khai Ordering Service 

### Solo

Chỉ có 1 orderer node duy nhất, nó không có khả năng "fault tolerant" ( chịu lỗi ). Vì thế nó chỉ dùng trong các project thử nghiệm, không nên dùng trong triển khai thực tế. 

### Raft

Kể từ version 1.4.1, HY ra mắt Raft là ordering serive có khả năng "fault tolenrant"  (CFT) . Raft theo mô hình của một node "leader" và các node "followers", trong đó "leader" được bầu ra (trên mỗi channel) và các quyết định của nó sẽ được broadcast đến tất cả các "followers". 
Raft ordering service dễ dàng thiết lập và quản lý hơn Kafka ordering service và thiết kế của chúng cho phép các tổ chức có thể đóng góp các node cho ordering.

### Kafka 

Tương tự như Raft, Apache Kafka là một triển khai CFT sử dụng mô hình "leader and followers". Kafka sử dụng một nhóm ZooKeeper cho mục đích quản lý. Kafka có từ version 1.0, nhưng chi phí để thực hiện cao.

# Tổng kết

Trên đây là các khái niệm cơ bản nhất mà khi triển khai bất kỳ một project Hyperledger Fabric nào cũng phải có, sẽ có nhiều khái niệm mà tùy bài toán cụ thể ta mới cần dùng đến. Việc đọc một mạch 6 khái niệm ở trên có thể khiến bạn thấy rối, nhưng mình đã cố gắng rút gọn nội dung nhất từ tutorial của Hyperledger Fabric. Nếu có bất cứ thắc mắc nào, bạn hãy để lại câu hỏi bên dưới =))

# Link tham khảo 
https://hyperledger-fabric.readthedocs.io/en/release-1.4/key_concepts.html