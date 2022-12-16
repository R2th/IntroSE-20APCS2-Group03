![](https://images.viblo.asia/625c936a-d5b0-430b-9061-640ddb7f6c13.jpg)

Chắc hẳn thời gian vừa qua mọi người đã nghe rất nhiều đến NFT, khi mà người ta sẵn sàng bỏ ra hàng chục triệu USD để sở hữu một tệp mà có thể tải về miễn phí. Làn sóng NFT bắt đầu xuất hiện ở mọi nơi, mọi thứ từ thẻ cầu thủ bóng rổ, vật phẩm game, tranh, nhạc cho tới tweet đều có thể được giao dịch dưới dạng NFT trên các trang đấu giá online. Nhiều người sẽ tự hỏi vậy NFT là cái gì mà lại gây sốt đến vậy. Bài viết hôm nay mình sẽ cùng mọi người đi vào tìm hiểu về nó nha.

# NFT là gì ?

NFT là từ viết tắt của **Non-Fungible Token** thì trước khi hiểu no-fungible token thì chúng ta sẽ tìm hiểu fungible token trước. Thì **Fungible Token** là những loại token có thể thay thế được. Kiểu dạng như bạn cần trả cho người bán hàng 10 nghìn đồng để thanh toán món hàng mình đã mua, thì bạn có thế đưa cho họ 10 đồng 1 nghìn, 5 đồng 2 nghìn, 2 đồng 5 nghìn hoặc đưa thẳng 1 đồng 10 nghìn. Đơn giản giá trị của nó chỉ cần bằng 10 nghìn là được, sẽ không cần quan tâm rằng trong lượng giá trị đó gồm những đồng tiền nào. Fungible Token chính là đại diện cho dạng token như vậy trong blockchain, nên nó thường được sử dụng trong các nền tảng thanh toán (**payment**), tài chính (**Defi**),...

![](https://images.viblo.asia/afbd7c06-4f02-43ff-b1cb-f1dd1f081208.png)


Còn Non-Fungible Token thì lại khác nó không phải là dạng có thể thay thế được như Fungible Token mà nó là duy nhất. Mỗi token sẽ đại diện cho một thứ duy nhất mà không gì có thể thay thế được. Nó giống như ID của một bản ghi trong cơ sở dữ liệu vậy mỗi token sẽ có một cái ID duy nhất (**unique**). Chính vì thế nó có thể được áp dụng vào vô vàn thứ trong cuộc sống này. Chẳng hạn nếu có một công ty bất động sản họ muốn tạo ra một nền tảng blockchain của mình, họ có thể sử dụng NFT để đại diện cho mỗi bất động sản là một NFT, ok giờ thì NFT là sổ đỏ. Nếu lotte cinema muốn biến toàn bộ các vé xem phim của mình thành NFT cũng hoàn toàn được. Vì đơn giản mỗi xuất chiếu, mỗi chỗ ngồi trong xuất chiều sẽ là duy nhất, ok giờ NFT sẽ là vé xem phim. Các game nuôi thú, bán card mỗi con thú trong game sẽ là NFT duy nhất, mỗi thẻ card trong game cũng là duy nhất khi sử dụng NFT. Hay sử dụng NFT để đánh bản quyển hình ảnh, bản quyền âm nhạc với việc định danh được lưu trữ trên blockchain và không thể thay đổi được. Đó mới nghe qua đã thấy NFT có rất nhiều chỗ để có thể áp dụng vào được rồi rất tiềm năng có phải không.

![](https://images.viblo.asia/529d6b98-4aba-43a3-8bfb-e64c454195bc.jpg)

***<p align="center">Một bức tranh ghép của Mike Winkelmann bán đấu giá tại Christie’s và thu về được 69,3 triệu USD</p>***

Khả năng sử dụng của NFT không nằm ở những vật phẩm, như bức tranh, bài hát hay dòng tweet, mà nằm ở quyền sở hữu độc quyền chúng, chủ sở hữu (owner) của NFT sẽ được lưu trữ trên blockchain. Nhờ đó, món hàng trở thành duy nhất, chỉ người mua NFT mới sở hữu quyền đối với vật phẩm gốc, dù có vô số bản sao trôi nổi miễn phí trên Internet. Việc sở hữu một NFT giống như việc sở hữu bức họa Mona Lisa gốc. Dù có rất nhiều bản sao của tác phẩm này trên thế giới, chỉ một người duy nhất sở hữu bản gốc. 

# ERC-1155 và ERC-721

Có rất nhiều loại chuẩn NFT nhưng hiện nay có 2 loại phổ biến nhất thường được sử dụng đó là ERC-721 và ERC-1155

Thì một chuẩn token là một bộ các quy tắc dữ liệu và các chức năng mà token đó có thể thực hiện. Thì đầu tiên ta sẽ nói đến tiêu chuẩn ERC-721, nó thì được ra đời trước và được rất nhiều nển tảng blockchain đã sử dụng, tiêu biểu là tựa game **cryptokitties** trên Ethereum. Chuẩn ERC-721 sẽ giúp bạn tạo ra các NFT khác nhau và duy nhất, khi bạn deploy một contract ERC-721 thì mỗi khi bạn mint ra một NFT thì chúng sẽ có các `tokenId` khác nhau. Có nghĩa là cặp giá trị `address-contract` và `tokenId` này sẽ là duy nhất trên blockchain, tại một thời điểm sẽ chỉ có một owner sở hữu được token này. Nó tạo ra độ hiếm cho token và rất phù hợp để áp dụng cho các game như **cryptokitties**. Nhưng nó lại có nhược điểm là nếu sử dụng cho các nền tảng cần sử dụng đến transfer multi token, thì sẽ gây lãng phí bộ nhớ và cần một lượng gas fee rất lớn. Vì mỗi NFT của ERC-721 chỉ có thể transfer một token trong một transaction, để giải quyết điều này người ta đã giới thiệu một chuẩn mới hoàn thiện hơn đó là ERC-1155

![](https://images.viblo.asia/bd861508-4947-416e-a02b-3a7063d225b3.png)

Qua hình ảnh trên chúng ta sẽ thấy một sự khác biệt. Đó là ERC-721 thì giống như ta đang tạo ra 1 cái máy bán hàng tự động, nhưng trong máy thì mỗi loại sản phẩm chỉ có số lượng là 1 cái. Còn ERC-1155 nó sẽ khác, lúc này nó sẽ có thêm khái niệm là `balance` cho mỗi `id`. Tức là thay vì chỉ có thể tạo ra NFT với số lượng 1 cái giờ ta có thể tạo ra NFT với số lượng NFT `n` cái. Nó cũng giống như một bức tranh và các dòng Iphone vậy. Bức tranh sẽ do nghệ sĩ vẽ ra và mỗi bức tranh sẽ khác nhau và chỉ có một, còn các dòng sản phẩm Iphone thì chúng ta có Iphone X, Iphone 11, Iphone 12. Các dòng điện thoại này thì khác nhau nhưng mỗi lần sản xuất Apply sẽ cho ra đời một số lượng rất lớn của từng loại. Vậy giờ mọi người đã hiểu sự khác nhau giữa ERC-721 và ERC1155 chưa

![](https://images.viblo.asia/82321809-9396-47f9-8d83-a4d4b6401b6a.png)


Đó là những sự khác nhau về khái niệm còn về mặt kỹ thuật thì chúng cũng có sự khác nhau

#### Fungibles & Non-Fungibles

- ERC-721: Chỉ giới hạn cho các Non-Fungibles

- ERC-1155: Cho phép cả Fungibles và Non-Fungibles
- ERC-1155: Cho phép những khái niệm mới giống như semi-fungible tokens. Ví dụ các fungible tokens có thể "chuyển đổi" thành non-fungibles và ngược lại.

#### Batch transfers
- ERC-721: Hỗ trợ transfer một token tại một thời điểm
- ERC-1155: Thì hỗ trợ `batch transfers` giúp transfer hàng loạt `id` trong cùng một transaction ( Như đối với Ethereum thì mỗi transaction có thể mất từ 15-30s, nếu sử dụng ERC-721 sẽ mất rất nhiều transacion và thời gian, còn chưa kể fee gas sẽ rất lớn. Trong khi đó ERC-1155 có thể gửi hàng trăm token khác nhau trong cùng một transaction. Một số thử nghiệm tối ưu để cho kết quả ERC1155 có thể gửi 150-200 token trên giây)

#### Single smart contract không gây lãng phí dữ liệu
- ERC-721: Yêu cầu sẽ cần phải deploy một contract mới cho mỗi loại token mới. Ví dụ như một contract của CryptoKitties thì khác với contract của CryptoCuties.
- ERC-1155: Thì chỉ cần deploy một contract cho vô vàn loại token
> Không thể nào có chuyện bạn vô tình bị khóa NFT ở một contract không hỗ trợ ERC-1155. Vì bạn chỉ có thể gửi token đến một contract có khả năng nhận ERC-1155, token của bạn sẽ bị revert ngay lập tức quay trở lại nếu bạn vô tình gửi đến contract không hỗ trợ ERC-1155. Một số contract ERC-721 cố gắng để cố gắng để đạt được điều này nhưng đã bị thất bại. Do chúng đã kế thừa các function "no-safe" bên trong chuẩn token. Nên nếu người dùng vẫn cố sử dụng các function này họ có thể sẽ bị mất token

#### ID Substitution
- ERC-721: Chỉ hỗ trợ static metadata vì vậy mỗi token phải có metadata URI của nó sẽ được lưu trữ và quản lý bởi smart contract
- ERC-1155: Các contract có thể trỏ đến vô số URIs mà không cần lưu trữ bất kỳ dữ liệu bổ sung nào on-chain. Điều này thậm chí có thể được sử dụng để trỏ đến một dịch vụ web lưu trữ JSON token được tạo động cho mỗi token trong cơ sở dữ liệu.

#### Rich Event Logs
- ERC-721: Emits transfers và approvals.
- ERC-1155: Chuẩn bao gồm các sự kiện mints, burns, transfers, approvals, và metadata changes. 


# Top 10 chợ NFT hiện nay

### [1. OpenSea](https://opensea.io/)

![](https://images.viblo.asia/e18d3062-8b2e-40c0-9727-81da1dd2c251.jpg)

### [2. Rarible](https://rarible.com/)

![](https://images.viblo.asia/fbf9b820-2e74-4cda-9b4e-906f481df996.jpg)

### [3. SuperRare](https://superrare.co/)

![](https://images.viblo.asia/966f0399-6967-48d2-b5d4-65b084db9356.jpg)

### [4. Foundation](https://foundation.app/)

![](https://images.viblo.asia/accb66d2-476b-49b1-b1d2-cefa48f50124.jpg)

### [5. AtomicMarket](https://wax.atomicmarket.io/)

![](https://images.viblo.asia/078a9070-b64f-4925-bd86-94edefc56ff6.jpg)

### [6. Myth Market](https://myth.market/)

![](https://images.viblo.asia/220f4158-3c3e-4f7a-a52c-3f6a12d34894.jpg)

### [7. BakerySwap](https://www.bakeryswap.org/#/home)

![](https://images.viblo.asia/d3036f7a-3465-46e0-b8b8-e65989807d20.jpg)

### [8. KnownOrigin](https://knownorigin.io/)

![](https://images.viblo.asia/1941ebbe-a4d7-4d18-b226-85467de8be22.jpg)

### [9. Enjin Marketplace](https://enjinx.io/eth/marketplace)

![](https://images.viblo.asia/40b47adf-2f5a-4712-b12f-c3af98db6689.jpg)

### [10. Portion](https://portion.io/)

![](https://images.viblo.asia/90372626-23cf-4c13-8dad-532fae0f7070.jpg)


# NFT Thực sự có giá trị và nguy cơ khi đầu tư?

Theo trang Coindesk, những tính chất tạo nên giá trị của NFT bao gồm: không thể phá hủy (bởi dữ liệu được lưu trữ trên blockchain) và có thể xác minh (bởi blockchain cho phép truy xuất ngược nguồn gốc của sản phẩm mà không cần qua một bên thứ ba). Bên cạnh đó, không giống các loại tiền ảo, NFT là duy nhất và không thể sao chép. Do đó, các nhà đầu tư NFT có thể thu giá trị từ sự độc nhất này, tương tự như việc mua bán các món hàng sưu tầm. 

Tuy nhiên, nhiều người cho rằng không ai thể bảo đảm giá trị của token này sẽ tồn tại sau vài chục năm tới bởi công nghệ luôn thay đổi mỗi ngày. Một vấn đề nữa đặt ra là nếu chủ sở hữu quên mật khẩu ví thì làm sao để lấy lại quyền sở hữu NFT bởi, cũng giống như tiền ảo, NFT không được quản lý hay vận hành bởi bất kỳ thực thể nào. 

Nhiều nhà phân tích cũng cho rằng việc mua bất kỳ loại tiền số nào, bao gồm cả NFT tiềm ẩn nhiều rủi ro lớn. Bởi vì giá trị của chúng chủ yếu dựa trên sự suy đoán và người mua chỉ có thể hi vọng một ngày nào đó NFT của họ sẽ được mua lại với giá cao hơn. Nhưng chẳng có ai đảm bảo điều này.

Sức hút lớn nhất của công nghệ này khi bất kỳ ai cũng có thể tạo ra NFT lại là một trong những điểm yếu chính của nó. Bất kỳ ai trên Internet đều có thể tạo NFT từ bất cứ thứ gì. Điều đó có nghĩa là có rất nhiều token vô giá trị trên mạng. Sự khan hiếm của một vật phẩm không đảm bảo cho giá trị của nó sẽ tăng, do đó người chơi có thể chịu khoản lỗ nặng khi cơ sốt NFT hạ nhiệt.

# Kết luận 
Như vậy chúng ta đã đi qua hết từ khái niệm, yếu tố kỹ thuật đến các góc nhìn từ kinh tế. Mong rằng các bạn đã có được cái nhìn tổng quan về cơn sốt NFT này. Một thị trường rất tiềm năng và cũng không ít rủi ro, hãy thật tỉnh táo và tìm hiểu kỹ các dự án khi có ý định đầu tư. Bài viết tiếp theo chắc mình sẽ hướng dẫn mọi người các viết và deploy một contract NFT lên mạng blockchain. Rất vui và hẹn mọi người trong các bài viết tiếp theo.

#### Link tham khảo
https://www.altcoinbuzz.io/bitcoin-and-crypto-guide/the-difference-between-erc721-vs-erc1155/

https://kriptomat.io/cryptocurrencies/tokens/what-is-an-nft/

https://influencermarketinghub.com/nft-marketplaces/