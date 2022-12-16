![](https://images.viblo.asia/2a879a0c-c7e5-42c8-a691-5de1cb72dda8.png)

## 1. Giới thiệu

**Corda** là một nền tảng sổ cái phân tán (distributed ledger). Được quản lý bởi tổ chức [R3](https://www.r3.com/), Corda hướng đến mảng doanh nghiệp với các ứng dụng tài chính, thương mại, bảo hiểm, y tế, chuỗi cung ứng v..v

**Lưu ý**: Corda không phải là một nền tảng Blockchain (Corda không hề có block). Distributed ledger là một khái niệm rộng hơn của Blockchain.

Dưới đây là video giới thiệu đến từ trang chủ của Corda.

{@embed: https://vimeo.com/205410473}

## 2. Đặc trưng và triết lý thiết kế của Corda

### Permissioned (Tính riêng tư của mạng Corda)

Corda là một mạng private (giống như Hyperledger Fabric hay Quorum). Các node tham gia vào mạng cần được cấp phép và định danh đầy đủ. 

Khi các node bên ngoài muốn tham gia vào mạng Corda, Node đó sẽ cần phải xác thực với DoorMan (tạm dịch là người giữ cửa :D). Node mới sẽ được tham gia vào mạng khi được DoorMan verified và accept.



### Distributed Ledger

Là một khái niệm rộng hơn của Blockchain, sổ cái phân tán (Distributed Ledger) cũng có những đặc điểm nổi bật của Blockchain như tính phân tán (decentralisation), không thể sửa đổi (immutability) và bảo mật. Đôi khi người ta vẫn quen gọi Corda là một nền tảng Blockchain mặc dù nó không hề có Block, dữ liệu trong Corda được lưu dạng bảng (SQL).

### Smart Contract

Corda cũng có smart contract như các nền tảng khác như Ethereum, Hyperledger Fabric hay Quorum. Tuy nhiên, smart contract của Corda có chút khác biệt so với các nền tảng trên.
 
Tất cả nội dung, nghiệp vụ, logic trong smart contract của các nền tảng như Ethereum hoàn toàn do lập trình viên quy định. Do đó, nó khá free style, không thực sự giống so với các hợp đồng pháp lý truyền thống.

Corda khác biệt ở chỗ nó tập trung vào ngôn ngữ pháp lý, quy trình kinh doanh, cách giải quyết các thỏa thuận tranh chấp và mối quan tâm cụ thể của các doanh nghiệp. Trong các nền tảng blockchain nêu trên **Code là luật** (Code is Law) thì Corda hướng tới triết lý **Luật là luật** (Law is Law).

Lấy ví dụ nho nhỏ về giao dịch tiền mặt, smart contract trong corda sẽ được viết để kiểm tra xem giao dịch có đúng hay không ? Chẳng hạn như tổng giá trị input bằng tổng giá trị output. Nó tương tự như vai trò của kế toán, kiểm toán vậy. Nếu không thỏa mãn các điều kiện, giao dịch sẽ bị smart contract reject.

![](https://images.viblo.asia/3a648968-81b4-4c91-b5cb-81f85d083086.png)


### Peer-to-Peer

- Mạng P2P của Corda không có việc boardcast thông tin hay giao dịch cho toàn mạng. Thông tin, giao dịch chỉ được trao đổi bởi các bên tham gia. Ví dụ nếu Alice giao dịch với Bob, thì chỉ Alice và Bob biết về nó, và có thể thêm bên cơ quan quản lý.
- Không như Ethereum, Bitcoin hay phần nào là Hyperleder Fabric. Dữ liệu trên sổ cái của mạng Corda không đồng bộ ở tất cả các Node. Ví dụ được mô tả trong hình bên dưới,  Alice chỉ giao dịch với Bob, nên dữ liệu, trạng thái về các giao dịch giữa Alice và Bob chỉ được lưu trữ ở sổ cái của 2 bên. Ngược lại, Alice cũng không biết được về các giao dịch giữa Bob với Carl, Card với ED, v..v

![](https://images.viblo.asia/7474abc0-12a4-4e8d-aa26-5a5a0ddf681a.png)

### Message Queues

Corda sử dụng AMQP (Advanced Message Queuing Protocol) thông qua TLS để truyền thông điệp trong mạng. AMQP chạy bất đồng bộ, chịu tải tốt, đảm bảo về việc gửi, lưu giữ thông điệp và hoạt động mà không cần kết nối liên tục. Khi node ngoại tuyến, thông điệp được xếp thành hàng đợi và gửi đi khi node online.

### UTXO

Corda sử dụng mô hình UTXO cho các giao dịch giống như Bitcoin. Output của giao dịch này sẽ là Input cho giao dịch kế tiếp.

**Ví dụ**: Alice có 10$, Alice muốn chuyển cho Bob 1$. Đầu vào của giao dịch sẽ là `Alice has got $10`, đầu ra của giao dịch là `Alice has got $9` và `Bob has got $1` . Khi giao dịch hoàn tất, input sẽ được đánh dấu là `Historic` (không thể sử dụng làm đầu vào cho các giao dịch tiếp theo).

![](https://images.viblo.asia/39156ae3-8229-4f08-b642-5b7afdf73e69.png)

![](https://images.viblo.asia/c68923f7-cf34-40d7-9516-a69ea893b2f6.png)


### Tính linh hoạt

Corda hỗ trợ nhiều cơ sở dữ liệu quan hệ khác nhau, chỉ cần kết nối thông qua JDBC (Java Database Connectivity).

Ngoài việc hỗ trợ các cơ sở dữ liệu khác nhau, Corda linh hoạt trong việc sử dụng thuật toán đồng thuận. Corda không có hệ thống đồng thuận cố định, nó sử dụng **Notary services** (sẽ giới thiệu chi tiết hơn ở phần sau) nhằm kiểm chứng giao dịch, tránh trường hợp double spending. Mạng Corda có thể có một hoặc nhiều **Notary services**, mỗi **Notary services**  sử dụng các thuật toán đồng thuận khác nhau (như Raft hay BFT). 

### Tựu trung lại
Bên dưới là bảng so sánh giữa Corda và các nền tảng Blockchain như Bitcoin, Ethereum, Hyperledger Fabric.

![](https://images.viblo.asia/9fd4c098-9c3b-47c8-b546-21935f11c5ba.png)

- Smart contract của Corda thì có thể viết bằng Java hoặc Kotlin.
- Corda do tổ chức [R3](https://www.r3.com/) duy trì và phát triển.
- Corda không có sử dụng một số thuật toán cố định, các Notary nodes có thể tùy chọn thuật toán đồng thuận.
- Khả năng mở rộng cao.
- Các thành phần tham gia và mạng được định danh đầy đủ.
- Không có tiền mã hóa.


## 3. Các khái niệm quan trọng trong Corda

### States (Trạng thái)

Trạng thái là dữ liệu được lưu trong sổ cái của một hay nhiều node trong 1 thời điểm nhất định, trạng thái tại thời điểm đó là không thể thay đổi (immutable).

![](https://images.viblo.asia/30dee504-8672-4813-92fb-a8312f19d150.png)

Ví dụ về trạng thái Alice đang nợ Bob 10$

Trạng thái không thế sửa đổi trực tiếp, thay vào đó trạng thái sẽ được lưu thành mỗi chuỗi (gọi là State sequences). Các trạng thái cũ sẽ được đánh dấu là **Historic**.

**State sequences** cho chúng ta cái nhìn đầy đủ về quá trình chuyển đổi trạng thái của sổ cái.

![](https://images.viblo.asia/a43cb578-9cb3-4bf0-88ed-67a1ca1ab7e0.png)

#### Vault

Mỗi node có một thành phần tên là **Vault** lưu trữ tất cả các trạng thái liên quan đến nodes đó.

![](https://images.viblo.asia/df21b297-d263-476a-8b68-d1001a640ca0.png)


### Commands

Có nhiều hình thức giao dịch khác nhau. Không chỉ là chuyển tiền mà có thể là đổi tiền, hủy tiền, v..v. **Commands** là khái niệm gắn liền với 1 giao dịch trong Corda nhằm mô tả rõ mục đích của giao dịch đó.

![](https://images.viblo.asia/95478978-d83a-4556-b2bb-544277d6f3c5.png)


### Flows

**Flows** là một chuỗi các bước để một node biết cách cập nhật trạng thái của sổ cái, chẳng hạn như phát hành một tài sản hoặc thực thi một giao dịch. Chẳng hạn, Flow của node gửi giao dịch và node nhận giao dịch sẽ khác nhau. Corda cung cấp [Flow Library](https://docs.corda.net/docs/corda-os/1.0/flow-library.html) để các node có thể implement tùy thuộc vào từng trường hợp.

![](https://images.viblo.asia/e7a8c948-2ac6-4554-aa4b-fc7dc99a9224.gif)

![](https://images.viblo.asia/cbc9c5b0-9494-477e-ae6a-056b0dc7ba89.png)



### Consensus

Để được lưu vào sổ cái, giao dịch phải đạt được Validation Consensus lẫn Uniqueness Consensus.

#### Validation Consensus

Validation consensus là quá trình đồng thuận nhằm đảm bảo cho giao dịch đều được ký bởi tất cả các bên tham gia cũng như `input`, `output` của giao dịch thỏa mãn logic trong smart contract.


![](https://images.viblo.asia/e29f8019-1006-499d-83e0-5de0ead0497f.png)


#### Uniqueness Consensus

**Uniqueness consensus** có mục đích nhằm ngăn chặn việc **double-spends** (lặp chi) được cung cấp bởi **Notary Services**.

Lấy ví dụ Bob có 1.000.000$ trong tài khoản. Bob tạo 2 giao dịch
1. Chuyển 1.000.000$ cho Charlie để đổi lấy 800.000£
2. Chuyển 1.000.000$ cho Dan để đổi lấy 900.000€

Vấn đề ở đây là 2 giao dịch của Bob hoàn toàn thỏa mãn Validation Consensus, chỉ với 1.000.000$ Bob có thể gian lận và thu về gấp đôi số tiền ban đầu.

![](https://images.viblo.asia/2aedb630-74c8-4bf6-abc2-3d493eba9d22.png)

Để ngăn chặn điều đó, mọi giao dịch được đề xuất cần thỏa mãn yêu cầu rằng không có bất kỳ input nào trong giao dịch đã được sử dụng ở một giao dịch khác.


### Notary Services 

Notary Services (tạm dịch là dịch vụ công chứng) là một dịch vụ trong mạng Corda có chức năng chống **double spends**. Notary Services có thể bao gồm 1 hay nhiều node, mỗi node có thể chạy các thuật toán đồng thuận khác nhau.

Khi một peer gửi giao dịch đến Notary Services , có 2 trường hợp có thể xảy ra. Nếu trạng thái của input đã có trong **Notary Map** thì service sẽ throw exception. Nếu trạng thái input chưa được ghi nhận là đã sử dụng thì **Notary Services** sẽ ký và xác nhận giao dịch. 

![](https://images.viblo.asia/26949599-33f2-462b-abea-1ff57ae0ac8f.png)

### Time-windows

Đúng như tên gọi (cửa sổ thời gian), time-windows là khái niệm trong các giao dịch, áp dụng với các giao dịch cần được thực hiện trong một khoảng thời gian nhất định.

- Time-windows có 3 khoảng là trước, trong và sau. Các bên tham gia có thể quy định khoảng thời gian mà giao dịch cần được thực hiện.
-  Notary Services sẽ kiểm tra thời gian và reject các giao dịch có thời gian đã bên ngoài time-windows được quy định.

![](https://images.viblo.asia/17f3a733-f900-4b5f-b40a-0463e7f84966.gif)


### Oracles

Oracles trong Corda cũng có ý nghĩa tương tự như Oracles trong các nền tảng blockchain khác như Ethereum, Cosmos, v..v là dịch vụ cung cấp dữ liệu bên ngoài cho mạng (ví dụ như tỷ giá tiền tệ). 

![](https://images.viblo.asia/4346a885-1779-4925-be08-98ef27e949df.png)

### Nodes

Corda node là môi trường chạy máy ảo Java (Java Virtual Machine run-time), mỗi node trong mạng đều có cho mình một định danh riêng.


Các thành phần chính trong kiến trúc của một Corda node:
- **Persistence layer** làm nhiệm vụ lưu trữ dữ liệu.
- **Network interface**  thực hiện việc tương tác với các nodes khác trong mạng.
- **RPC interface** có chức năng tương tác với các thành phần khác trong node.
- **Service Hub** là nơi trung gian để tương tác với các services trong mạng (oracles, notary)


#### Persistence layer

Persistence layer gồm có 2 phần:
1. **Vault**, lưu trữ trạng thái của sổ cái (hiện tại và historic)
2. **Storage service**, nơi lữu trữ các giao dịch.

### The service hub

Các chức năng cụ thể mà service hub cung cấp:
- Thông tin về các node khác trên mạng và các dịch vụ chúng cung cấp.
- Truy cập vào nội dung của **vault** và **storage service**.
- Truy cập và tạo ra các cặp public-private key của node.
- Thông tin về chính node chứa service hub.
- Thời gian.

![](https://images.viblo.asia/c311b4e5-2d1c-4c7e-ade7-b794347ff99e.png)

## Tài liệu tham khảo

- [Corda Docs](https://docs.corda.net/docs/corda-os/1.0.html)
- [Corda Training](https://training.corda.net/)
- [Blockchain Council Corda Developer](https://www.blockchain-council.org/corda/certified-corda-developer-ccd/)