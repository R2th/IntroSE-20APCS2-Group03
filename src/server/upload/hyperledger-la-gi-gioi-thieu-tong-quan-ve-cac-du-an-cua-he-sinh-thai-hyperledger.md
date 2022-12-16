![](https://images.viblo.asia/b82f6129-8604-44df-a428-72ebe67b759d.png)

## Hyperledger là gì ?
> “Hyperledger is an open sourced community of communities to benefit an ecosystem of Hyperledger based solution providers and users focused on blockchain related use cases that will work across a variety of industrial sectors.“ – Theo Brian Behlendorf, Giám đốc điều hành của Hyperledger.

Chúng ta có thể hiểu một cách nôm na rằng hyperledger là một dự án mã nguồn mở, nó xây dựng một hệ sinh thái các giải pháp và người dùng trên nền tảng công nghệ blockchain nhằm giải quyết các vấn đề trong ngành công nghiệp.

Hyperledger không phải là:
* Một đồng tiền mã hóa (Cryptocurrency)
* Một blockchain
* Một công ty

Hyperledger thuộc tổ chức Linux Foundation. NodeJs, Alljoyn, Dronecode là một số dự án nổi tiếng của Linux Foundation. Mục đích của Linux Foundation là tạo ra một cộng đồng các nhà phát triển làm việc trên các dự án nguồn mở, nhằm duy trì sự phát triển của các dự án, trong đó, mã nguồn dự án luôn được nâng cấp, sửa đổi và phân phối lại.

![](https://images.viblo.asia/41f87283-3e91-4182-9004-af61e81dd000.png)

Tư tưởng của Hyperledger là thế giới sẽ gồm nhiều kênh thanh toán (private chain) riêng biệt với các thị trường khác nhau. Mỗi doanh nghiệp có những đặc trưng riêng, nên các ứng dụng cho các doanh nghiệp sẽ cần phát triển với các quy tắc được cá nhân hóa. Không giống như ethereum có xu hướng buộc các nhà phát triển xây dựng các ứng dụng của họ xung quanh một bộ giao thức định sẵn.

Dự án Hyperledger bắt đầu với một số ít các nhà phát triển vào cuối năm 2015. Những nhà phát triển này đến từ nhiều lĩnh vực khác nhau như khoa học dữ liệu, sản xuất, ngân hàng, v.v. và họ có một mục tiêu chung, đó là làm cho blockchain trở thành công nghệ dễ tiếp cận hơn với các nhà phát triển, các doanh nghiệp. Dự án được bắt đầu với các thử nghiệm tương tác giữa ứng dụng và một mạng blockchain an toàn.

![](https://images.viblo.asia/99ea6ebd-c773-48c2-bd16-a72662e1041f.png)

### Hạn chế của các mạng public blockchain

Trong quá trình thử nghiệm, các nhà phát triển nhận ra rằng trong các mạng blockchain, khi các peer trong mạng cần xác thực từng giao dịch và thực hiện cơ chế đồng thuận cùng một lúc, nó sẽ ảnh hưởng rất lớn đến khả năng mở rộng (scale). Các giao dịch cần đảm bảo tính riêng tư, bảo mật (confidentiality) không phù hợp để thực hiện trên các mạng public blockchain.

![](https://images.viblo.asia/841a57f0-99c9-4212-a0bd-303835c19a34.png)

Chúng ta lấy ví dụ với Bob, sống ở Ấn Độ, anh ta muốn mua hàng từ Alice ở Thụy Sĩ. Vì họ là bạn, Alice bán sôcôla cho Bob với mức giá "vừa bán, vừa cho". Điều quan trọng ở đây là Alice còn bán sản phẩm của mình cho nhiều người khác nhau, ở các thị trường khác nhau và giá bán cho họ vẫn sẽ phải là mức giá niêm yết. Để hoàn tất giao dịch giữa Alice và Bob, nhiều người ở trên mạng sẽ tham gia để xác thực và chứng nhận các giao dịch.


![](https://images.viblo.asia/9b1eda9a-7028-40b8-9d0c-25b02aa7fe2d.png)

Giao dịch sau khi được xác thực sẽ được các thợ đào block, nếu block hợp lệ thì nó sẽ được thêm vào chuỗi. Khi đó, giao dịch giữa Alice và Bob sẽ có thể được xem bởi bất kỳ ai trên mạng, và sẽ không hay ho lắm khi một khách hàng khác nhìn thấy giao dịch giữa Bob và Alice và nhủ rằng "Chết tiệt, hóa ra mình mua hớ hàng của bà Alice này !!!". Uy tín của Alice từ đó sẽ giảm xuống. Thật là một điều chẳng ai mong muốn.

### Hyperledger hoạt động như thế nào ?

Tuy nhiên, trên mạng Hyperledger, nó lại là một câu chuyện hoàn toàn khác! Các peer liên kết trực tiếp với nhau và chỉ có sổ cái của riêng họ được cập nhật về thỏa thuận giao dịch. Các bên giúp thực hiện giao dịch chỉ được biết một lượng thông tin đủ để họ cần để chuyển tiếp và cho phép giao dịch trên mạng.

![](https://images.viblo.asia/c98a73b6-ba28-488d-a974-ef14007506de.png)

Giả sử Alice và Bob thực hiện giao dịch đặc biệt của họ trên mạng Hyperledger, cô sẽ tìm kiếm Bob thông qua một ứng dụng truy vấn danh sách các thành viên tham gia vào mạng. Sau khi đã được xác thực, hai peer sẽ được kết nối và kết quả được trả về. Trong thỏa thuận hai bên này, cả hai kết quả trả về phải giống nhau để giao dịch có thể được xác nhận. Trong các giao dịch khác với nhiều bên, nhiều quy tắc hơn có thể được áp dụng. 

![](https://images.viblo.asia/5187d856-a109-4975-8ccc-ddbc95867370.png)

### Những đặc điểm của Hyperledger

Tất cả điều này được thực hiện nhờ kiến ​​trúc mô đun của Hyperledger, nó làm cho các cơ chế như thuật toán đồng thuật trở thành một tính năng có thể tùy biến (plug-and-play). Trong kiến ​​trúc này, những đăc điểm đáng chú ý nhất được thể hiện trong các peer của mạng. Các peer đã được chia thành ba vai trò riêng biệt, đó là:

![](https://images.viblo.asia/26a832aa-4385-4ae6-81a4-5c008735421e.png)

* **Endorser**: Các endorser là những peer thực thi các giao dịch trong chaincode container và đề xuất giao dịch lên mạng dựa trên kết quả của hợp đồng thông minh. Tất cả các endoser peer phải được cài đặt chaincode.

* **Committer**: Đây là những peer không nhất thiết phải cài đặt chaincode,chúng lưu trữ sổ cái đầy đủ (full ledger). Sự khác biệt chính giữa committer peer và endoser peer là việc committer peer không thể gọi chaincode hoặc chạy các hàm trong hợp đồng thông minh.

* **Consenters**: Các nút này chịu trách nhiệm điều hành sự đồng thuận của mạng.Consenters có trách nhiệm xác nhận các giao dịch và quyết định các giao dịch sẽ được đưa vào sổ cái.

### Sơ lược qua về các framework của Hyperledger


![](https://images.viblo.asia/e54e16b6-8148-4c8a-980b-ce3686f41dd6.png)


#### Hyperledger Sawtooth

**Loại hình**: Công nghệ sổ cái phân tán (Distributed Ledger Technology), Smart Contract Engine

**Trạng thái**: Đã được triển khai (Active)

![](https://images.viblo.asia/e628fc5d-fc29-40bf-a196-da64b244214d.png)


là một nền tảng blockchain doanh nghiệp được phát triển bởi Intel, chạy với một thuật toán đồng thuận mới có tên Proof of Elapsed Time (PoeT), cho phép doanh nghiệp tương tác với các sổ cái phân tán (distributed ledgers) nhằm phục vụ các mục đích khác nhau.

PoeT là một thuật toán nhằm mục đích loại bỏ các vấn đề về môi trường và tiêu thụ năng lượng của thuật toán đồng thuận Proof of Work được sử dụng bởi Bitcoin và các loại tiền điện tử khác. Thuật toán tuân theo một cơ chế ngẫu nhiên, may rủi thay vì thưởng cho nút có tính toán nhanh nhất, mạnh nhất như PoW. Tóm lại, mỗi nút tham gia vào mạng được yêu cầu chờ trong một khoảng thời gian được chọn ngẫu nhiên và nút đầu tiên hoàn thành thời gian chờ sẽ được chỉ định là nút sẽ đưa block mới vào chuỗi.

Trong video dưới đây, Hyperledger minh họa tiềm năng của Sawtooth ứng dụng vào chuỗi cung ứng hải sản, nơi Sawtooth cung cấp một cơ sở dữ liệu không thể sửa đổi về nguồn gốc của các dòng sản phẩm khác nhau. Nhờ các thiết bị Internet of Things kết hợp với Sawtooth, chúng ta có thể theo dõi quy trình một con cá từ khi được đánh bắt đến khi lên bàn ăn như thế nào ?

{@embed: https://www.youtube.com/embed/8nrVlICgiYM}

Sawtooth được viết bằng Python và mục tiêu của nó cung cấp các giải pháp blockchain có thể được áp dụng cho Internet of Things cũng như các hệ thống tài chính.

#### Hyperledger Fabric

**Loại hình**: Công nghệ sổ cái phân tán (Distributed Ledger Technology), Smart Contract Engine

**Trạng thái**: Đã được triển khai (Active)

![](https://images.viblo.asia/a8d4c54b-3135-4cc3-8218-3cd6cc1bd78c.png)


là một dự án được phát triển dưới sự cố vấn của IBM. Fabric đang là nền tảng blockchain đang được chấp nhận rộng rãi nhất bởi các doanh nghiệp hàng đầu. Thật vậy, sử dụng nền tảng Ethereum cho các doanh nghiệp để xây dựng các ứng dụng trên đó là một hạn chế vì Ethereum có giao thức riêng, do đó nó kém linh hoạt. Fabric thì khác, nó rất linh hoạt, nó cung cấp bộ khung cho các doanh nghiệp có thể xây dựng những blockchain riêng tùy thuộc vào những nhu cầu cụ thể khác nhau.

Fabric sẽ không dễ nhai cho những người mới bắt đầu. Được xây dựng như một framework mô-đun nơi các ứng dụng có thể dễ dàng mở rộng ở mọi cấp độ, Fabric dự định cung cấp các dịch vụ blockchain cơ bản như minh bạch, phân cấp và bảo mật.


![](https://images.viblo.asia/973c5fce-bb99-4c78-973f-6502a953164a.png)


#### Hyperledger Burrow

**Loại hình**: Permissioned smart contract application engine

**Trạng thái**: Đang được phát triển (Incubation)

Hyperledger Burrow cung cấp một mô-đun blockchain client cùng với trình thông dịch hợp đồng thông minh (permissioned smart contract)  phát triển các ứng dụng một phần dựa theo đặc điểm kỹ thuật của Máy ảo Ethereum (EVM).

#### Hyperledger Indy

**Loại hình**: Sổ cái phân tán (Distributed Ledger ), thư viện tiện ích (utility library)

**Trạng thái**: Đã được triển khai (Active)

là một sổ cái phân tán được xây dựng cho mục đích định danh phi tập trung. Nó cung cấp các công cụ, thư viện và các component có thể tái sử dụng để tạo và sử dụng các danh tính kỹ thuật số (digital identities) một cách độc lập.

#### Hyperledger Iroha

**Loại hình**: Công nghệ sổ cái phân tán (Distributed Ledger Technology), Smart Contract Engine, thư viện tiện ích (utility library)

**Trạng thái**: Đã được triển khai (Active)

là một framework blockchain được thiết kế đơn giản và dễ tích hợp vào các dự án cơ sở hạ tầng yêu cầu sử dụng công nghệ sổ cái phân tán.


Bây giờ chúng ta đã biết Hyperledger là gì, tại sao nó lại cần thiết trong ngành công nghiệp CNTT ngày nay và cách thức hoạt động, chúng ta hãy so sánh Hyperledger với hai mạng blockchain nổi tiếng nhất: Bitcoin và Ethereum.

|  Đặc tính | Bitcoin     | Ethereum  | Hyperledger  | 
|---|---|---|---|---|
|  Tiền mã hóa |  Bitcoin     | Ether  | Không có  | 
| Mạng  |  Công khai | Công khai  | Riêng (private)  | 
|   Đồng thuận|  PoW |PoW   |  Practical Fault Byzantine Tolerance | 
|   Hợp đồng thông minh|  Không có | Có (Viết bằng Solidity hoặc Vyper)   | Có (chaincode) viết bằng Golang, NodeJS hoặc Java  |

## Tài liệu tham khảo

https://www.edureka.co/blog/what-is-hyperledger/

https://hackernoon.com/wtf-is-hyperledger-e433818b16aa