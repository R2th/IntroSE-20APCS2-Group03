![](https://images.viblo.asia/83e0b7f1-3f41-4e6f-9fc1-261ccaec0379.jpg)

**Kyber Network** giúp kết nối thế giới tiền mã hóa phân tán hiện tại trở thành một mạng lưới liên kết chặt chẽ, bằng cách cho phép thực hiện các giao dịch giữa nhiều nền tảng, hệ sinh thái và các ứng dụng khác nhau một cách dễ dàng và nhanh chóng.
# Kyber Network (KNC) là gì?
**Kyber Network** (mã token: **KNC**) là một nền tảng giao dịch phân cấp mới đáng tin cậy, cho phép giao dịch gần như ngay lập tức và chuyển đổi giữa bất kỳ tiền mã hóa (token) nào với nhau. **Kyber Network** hứa hẹn sẽ cung cấp các API thanh toán đa dạng và một chiếc ví contract mới cho phép nhận được thanh toán từ bất kỳ Token nào và đảm bảo tính thanh khoản cao.

![](https://images.viblo.asia/b937ac80-b520-40ff-9d40-cbfc2c0272d9.png)

Tính thanh khoản được đảm bảo thông qua mô hình quỹ dự trữ mở của Kyber cho phép bên thứ 3 có thể đóng góp tài sản mã hoá nhàn rỗi của họ và hưởng lợi nhuận từ phần chênh lệch giữa giá mua với giá bán trên mỗi giao dịch. Những token này có thể được sử dụng trên bất cứ nền tảng nào đã tích hợp vào Kyber giúp chúng được lưu thông dễ dàng và trở nên hữu dụng hơn.
# Cách thức hoạt động bên trong của Kyber Network
**Giao thức của Kyber Network được xây dựng dựa trên 3 nguyên lý cốt lõi:**

> **HỖ TRỢ ĐA NỀN TẢNGl**: Khả năng hỗ trợ đa nền tảng cho phép Kyber Network có thể kết nối với mọi ứng dụng và giao thức mà không bị giới hạn bởi sự khác biệt về công nghệ hay hệ sinh thái.
> 
> **GIAO DỊCH TỨC THÌ VÀ AN TOÀN** : Giao thức của kyber giúp hiện thực hóa các giao dịch thương mại và các sản phẩm tài chính phi tập trung bằng cách cho phép xử lý các giao dịch một cách tức thì và an toàn giữa các token. Đây cũng là điểm then chốt đối với rất nhiều ứng dụng.
>
> **DỄ DÀNG TÍCH HỢP** : Không chỉ vận hành hoàn toàn trên blockchain để đảm bảo tính minh bạch, Kyber còn được thiết kế với khả năng tương thích cao và thân thiện đối với lập trình viên, giúp nhiều ứng dụng khác nhau dễ dàng tích hợp.


-----


Ngày nay, cùng với sự phát triển nhanh chóng của thế giới tiền mã hóa, nhiều dự án tập trung vào xây dựng các nền tảng với công nghệ đột phá, cho ra mắt những token với công dụng riêng mà không chú ý nhiều đến việc kết hợp với những nền tảng khác nhau để tạo nên nhiều giá trị lớn hơn. Bitcoin tạo ra token đầu tiên, Ethereum tiến xa hơn một bước với việc cho phép dễ dàng chuyển đổi tài sản thành token và tạo ra các token mới. Hệ quả là số lượng các token tăng đột biến, tuy nhiên mỗi token đó lại chỉ có thể được sử dụng trong một hệ sinh thái biệt lập.

Kyber Network giúp kết nối tất cả các hệ sinh thái biệt lập đó với nhau và giúp các token trở nên hữu dụng hơn, có thể được sử dụng cho nhiều mục đích khác nhau. 

### Tổng quát về Network
Dưới đây là mô hình tổng quát về network của kyber sẽ gồm các thành phần sau:
![](https://images.viblo.asia/e6cc182c-4e96-4179-baa3-541fa9b90674.png)

- **Takers** :  có thể hiểu là những đối tượng sẽ có nhu cầu thanh khoản token của mình sang một loại token khác. Takers có thể là người dùng cuối, là các ứng dụng chuyển đổi phi tập trung hoặc có thể là smart contract

- **Reserves**: là những nhà cung cấp thanh khoản. Những người này sẽ quyết định số lượng thanh khoản và giá của các loại token có trên network 

- **Maintainers**: những đối tượng được phép truy cập đến 2 functions **Thêm/Xóa**  Reserve ra khỏi danh sách **Registered Reserves** và các **Token Pairs** sẽ được gọi là các **Maintainers**


### Các kiểu trade trong kyber Network
**Kyber** có 2 kiểu trade:
- Basic Token Trade
- Token to Token Trade 

##### Basic Token Trade

![](https://images.viblo.asia/f3136f8c-690a-4f48-8191-5da8dc25c428.png)

 Ví dụ ở đây là một **taker** đang có token `ETH`  và có nhu cầu muốn thanh khoản sang token `BAT`, lúc này khi **taker** thực hiện yêu cầu giao dịch thanh khoản cho smart contract, nó sẽ tìm kiếm trong **list reserves** xem có reserve nào chấp nhận thanh khoản nhận về `ETH` và trả lại `BAT` hay không. Trong trường hợp này thì có nhiều hơn 2 **Reserves** chấp nhận thanh khoản. Sau khi đã xác định được danh sách các reserves chấp nhận thanh khoản, smart contract sẽ sử dụng vòng lặp để duyệt qua các **reserves** này để tìm ra tỷ lệ `rate` tốt nhất. Và cuối cùng nó sẽ thực hiện chuyển đổi. Đây cũng có thể hiểu là kiểu trade trực tiếp, giống như ví dụ ở trên là có reserve chấp nhận chuyển đổi trực tiếp từ `EHT` sang `BAT`. Vậy nếu không có reserve nào chấp nhận chuyển đổi trực tiếp thì sao. Lúc đó sẽ sử dụng đến kiểu trade gián tiếp đó chính là token to token trade

##### Token to Token Trade

![](https://images.viblo.asia/b6c7f320-46b8-4040-bafb-bf2538e3f0b9.png)

Để hiểu kiểu trade gián tiếp này ta sẽ đi luôn vào ví dụ. Ở đây **Taker** muốn thanh khoản từ 50 `BAT` sang `DAI`. Nhưng tiếc là không có **Reserves** nào chấp nhận thanh khoản trực tiếp từ `BAT` sang `DAI` , nên lúc này smart contract sẽ tìm và chuyển lượng `BAT` kia sang `ETH` với lượng tốt nhất, sau đó nó sẽ chuyển từ  `ETH` sang `DAI` .  Và cuối cùng **Taker** vẫn sẽ nhận được token `DAI` như mình mong muốn. Như vậy nó đang chuyển đổi gián tiếp qua một loại token trung gian nên ta có thể coi nó là kiểu trade gián tiếp.

> Thực tế thì phía người dùng sẽ không cần quan tâm đến điều này vì cách sử dụng kiểu trade như thế nào sẽ do smart contract tự động thực hiện và chuyển đổi. Còn phía người dùng sẽ chỉ thấy được lượng thanh khoản của mình được chuyển đổi mà thôi. Đây sẽ là phần dành cho các nhà phát triển.
> 

### Reserves Overview 
Theo như kyber thì sẽ tồn tại 3 loại **Reserve**:
- Fed Price Reserve
- Automated Price Reserve
- Orderbook Reserve.

##### Fed Price Reserve

![](https://images.viblo.asia/21be4b3a-d857-4fbd-b9db-40d75d3d63c4.png)

Fed Price Reserve (FPR) là kiểu mà các **Reserves** có toàn quyền kiểm soát và linh hoạt với thuật toán định giá của họ. Tuy nhiên, tính linh hoạt cũng sẽ đi theo tốn kém về chi phí. Vì sẽ cần một server ngoài chain để có thể cập nhật các thay đổi linh hoạt này.


-----


##### Automated Price Reserve

![](https://images.viblo.asia/72d6f030-c721-48e2-b58b-20e86ce09a85.png)

Automated Price Reserve (APR) : Được thiết kế dễ bảo trì như là sự cân nhắc hàng đầu. Không giống như  **FPR**, các nhà quản lý dự trữ của **APR** sẽ ủy quyền kiểm soát  giá của họ cho một thuật toán được xác định trước trong smart contract. Nhưng đổi lại, họ sẽ không còn phải chịu các chi phí phát sinh từ việc phải xây dựng, vận hành và duy trì một máy chủ ngoài chain.



-----


##### Orderbook Reserve

![](https://images.viblo.asia/808cf663-0f53-47eb-be02-6b477cd31a0c.png)

Orderbook reserve (OR) loại này thì là sự kết hợp của 2 kiểu ở trên. instance của OR sẽ có thêm 2 `Orderlist` để theo gió **Buy** và **Sell** rồi nó sẽ tùy chỉnh giá tương ứng.

# Sự khác biệt của Kyber Network
Mục đích ra đời của nền tảng Kyber Network là cải tiến các sàn giao dịch tập trung hiện thời, như Binance, Huobi Global, Bittrex, Kraken, Poloniex, Shapeshift hay Coinbase. Dưới đây là một số điểm nổi bật của Kyber Network so với sàn tập trung thông thường:
- Chi phí giao dịch thấp
- Tin cậy
- Giao dịch nhanh chóng
- On-chain
- Tính thanh khoản cao
- Bảo mật tốt chống lại sự tấn công của hacker

# Đội ngũ phát triển của dự án Kyber Network
Dự án Kyber Network có một nhóm phát triển rất mạnh mẽ, cũng như đội ngũ cố vấn với những cái tên nổi bật. Một số thành viên đáng chú y:

- **Loi Luu** (Lợi Lưu): Nhà sáng lập kiêm CEO của Kyber Network, Anh được biết là một chuyển gia trong lĩnh vực crypto và blockchain. Loi Luu từng là người sáng lập của Oyente – một phần mềm phân tích bảo mật mã nguồn mở đầu tiên cho hợp đồng thông minh của Ethereum. Anh cũng là nhà đồng sáng lập của SmartPool, một dự án mỏ đào phi tập trung khá phổ biến.

- **Yaron Velner** : Đống sáng lập kiêm giám đốc kỹ thuật của Kyber Network. Ông có hơn 10 năm kinh nghiệm là kỹ sư phần mềm và lãnh đạo kỹ thuật tại EZChip. Bên cạnh đó, anh còn tham gia vào chương trình tìm lỗi của Ethereum và phát hiện được nhiều lỗi quan trọng.

- **Victor Tran**: Đống sáng lập kiêm kỹ sư trưởng tại Kyber Network. Anh là một kỹ sư back-end và nhà quản trị hệ thống Linux giàu kinh nghiệm. Anh đã tham gia phát triển blockchain, tiền điện tử từ đầu năm 2016 và là kỹ sư trưởng tại SmartPool.

![](https://images.viblo.asia/dc8bd161-4e8b-4b69-8c72-5336e1f656e1.png)

Ngoài ra, còn khá nhiều những thành viên tài năng khác mà bạn có thể xem chi tiết tại website chính thức của dự án. Một điểm nổi bật mà Kyber Netword có là sự góp mặt của Vitalik Buterin – Nhà sáng lập của Ethereum.

![](https://images.viblo.asia/c87a9a8a-82cf-409f-8aa0-95c497b0c526.png)

# Lịch sử ICO của Kyber Network
KyberNetwork thực hiện ICO mở bán token KNC vào ngày 22/09/2017 tại Singapore, chỉ sau vài giờ đồng hồ mở bán, Kyber đã huy động được 200.000 ETH tương đương khoảng 52 triệu USD vào thời điểm đó. Điều này đã giúp Kyber Network trở thành một trong những thương vụ gọi vốn lớn nhất trong lịch sử startup tại Việt Nam và ngang hàng với 10 công ty khởi nghiệp hàng đầu thế giới về số tiền được huy động năm 2017.

Và không lâu sau khi kết thức đợt token sale của mình, token KNC đã được niêm yết trên một số sàn giao dịch tiền điện tử, nổi bật nhất là Binance – sàn sở hữu khối lượng giao dịch lớn nhất thế giới thời điểm đó và kể cả bây giờ, giá KNC coin đã tăng gấp gần 4 lần chỉ vài ngày sau đó, rất nhiều nhà đầu tư đã kiếm bộn tiền từ việc mua token KNC.

# Tỷ giá của KyberNetwork Coin hiện tại

![](https://images.viblo.asia/9e517082-c029-4110-a7fe-ccc176015349.png)

# Tạo ví lưu trữ đồng KNC coin ở đâu an toàn nhất?

**KNC coin** là một Token phát triển trên nền tảng Blockchain của Ethereum theo tiêu chuẩn `ERC-20`, vì thế bạn có thể **tạo ví Kyber Network coin** và lưu trữ chúng trên các ví ETH có hỗ trợ ERC20. Một số ví ERC20 phổ biến nhất hiện nay như **ImToken, Trust, MEW, Metamask, Trezor, Ledger**,.. Trong đó, ImToken là ví trên điện thoại uy tín và an toàn nhất, Trust Wallet cũng là một lựa chọn tốt, MEW là ví web thì phổ biến nhưng không an toàn. Ví lạnh Trezor và Ledger thì lại cực an toàn nhưng sẽ tốn phí để mua.

Ngoài ra, nếu bạn thường xuyên **mua bán KNC coin** thì có thể trữ luôn trên ví của các sàn giao dịch để tiện cho việc mua bán, không phải chuyển đi chuyển lại, nhưng tất nhiên là mức độ an toàn của ví sàn sẽ không bằng ví riêng mình kể trên.

# Kết Luận
Do bài viết không quá chi tiết cho người dùng phổ thông nên sẽ có một số từ ngữ chuyên ngành. Mong qua bài viết này mọi người sẽ có cái nhìn tổng quan nhất về Kyber Network giúp các bạn đang có hứng thú với Kyber có thể dễ dàng tìm hiểu và tiếp cận nền tảng cực kỳ thú vị này.

##### Nguồn : 

- https://developer.kyber.network/docs/Start/
- https://toiyeubitcoin.com/kyber-network-la-gi/#Kyber_Network_KNC_la_gi
- https://blogtienao.com/kyber-network-la-gi/