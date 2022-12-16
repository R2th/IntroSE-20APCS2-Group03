## Blockchain Smart Contract
Viet Nam Mobile Day 2018 đã diễn ra tại Hà Nội vào ngày  15/06/2018. Với cái tên hoa mỹ là Bữa tiệc công nghệ lớn nhất năm. Và may mắn ngay hôm đó mình đã thu xếp được công việc để tham dự event này. 

![](https://images.viblo.asia/8d62be3b-35b5-44de-9fde-1b6b7170821b.jpg)

Hơn 40 bài thuyết trình đã được trình chiếu. Với bài trình chiếu được mình chý ý là **Blockchain Smart contract** từ diễn giả **Phạm Thanh Tú** - Agile Tech. Với số ít bài thuyết trình mình tham gia nghe, mình không tỏ mặn mà lắm với sự kiện lần này.

## Điểm trừ Vietnam Mobile Day
Thực sự, theo quan điểm cá nhân của mình, một sự kiện được hàng nghìn người quan tâm, mua vé nhưng lại có một lỗi nhỏ mà lớn từ bộ phận kỹ thuật mà mà chính xác là ở khâu phục vụ cho việc trình chiếu nội dung.
- Một số file presentation còn không mở lên để trình chiếu được hay video không thể phát được.
- Một số thì đang mở lại bị đơ, phải mở và tua lại presentation từ đầu.
- Cái khó chịu nhiều nhất là bút lazer cấp cho diễn giả để chuyển slide .etc không hoạt động hoặc hoạt động chập chờn. Lúc này diễn giả phải ngắt quãng bài thuyết để kêu gọi trợ giúp hoặc tệ hơn là nói chay.

Các lỗi nhỏ trên đã làm chiếm mất phần ba thời gian của một bài thuyết trình dài khoảng 15 phút - 20p. Thời lượng khá ít dành cho một bài thuyết trình về BlockChain cho một NewBie như mình.

Bù lại thời lượng, thì số lượng tham gia thuyết trình lại rất nhiều, chia ra thành 3 stage - thuyết trình đồng thời ở ba stage và mọi người có thể thoải mái chuyển qua lại giữa các stage để tham gia.

## Nội dung đã trình bày
Quay trở lại với chủ đề **Blockchain Smart contract**, mình xin điểm lại các từ khóa mà anh Tú đã dẫn dắt mọi người đi qua trong nội dung trình bày:
- Giới thiệu chung (Blockchain, Blockchain Timeline, Architecture)
- Giới thiệu về Smart Contract
- Ethereum (RPC + Truffle + Dapps)
- Hyperleger (Fabric chaincode & Sawtooth processor)
- Tendermint ABCI

## Giới thiệu Blockchain
### Blockchain với các mốc thời gian
- Tháng 11/2008, Bitcoin whitepaper - Shatoshi Nakamoto
- Tháng 5/2010, First bitcoin purchase, 10K BTC for a $25 pizza.
- Tháng 7/2014, Ethereum project
- Tháng 9/2015, Visa, Citi, Nasdaq invest $30 in Chain.com
- Tháng 12/2015, Hyperleger projects by the Linux Foundation
- Đến năm 2018, 80% of all bank will initiate projects concerning distributed ledger technology.

### Đặc trưng của Blockchain
- A P2P distributed ledger techology
- Permanent, digitilized decentralized chain of transactions grouped in blocks
- Can not be altered without the alteration of all subsequent blocks

**Computer revolution**
![](https://images.viblo.asia/eaa5cf9b-617d-4f4c-9ebc-cbf1fbbd2d44.png)

**Internet Revolution**
![](https://images.viblo.asia/b5a7957d-5451-4d30-b953-2862bf96f0b2.png)

### Architecture Complexity với Blockchain
![](https://images.viblo.asia/40df9502-e61d-4d63-9831-1af51b358782.png)

Các kiến trúc được kể đến bao gồm: `Hyperledger`, `Tendermint` và `Ethereum`.

## Smart Contract
- Smart contracts are computer protocols that facilitate, verify or enforce the negotiation or performance of a contract
- Smart contracts usually have a user interface and often emulate the logic of contractual clauses

![](https://images.viblo.asia/25a6e4b9-ee92-4b6e-af21-a8c438a8db45.png)

### So sánh Traditional contracts vs Smart contracts
![](https://images.viblo.asia/d7e0f956-5f44-4c8e-bbd5-14b7966d7708.png)

### Danh sách Blockchain và Smart contracts

|Platform name|Contract language|Is Live|Origin|Inc. in|Since…|Published|
|--- |--- |--- |--- |--- |--- |--- |
|Bitcoin|Ivy-lang|Yes|USA|USA|2017.12|2017.12|
|BitShares|?|Yes|||||
|Cardano|Plutus (Haskell inspired)|no|HK|Switzerland|2015||
|Counterparty|?|Yes|||||
|Corda|||||||
|DFINITY|Ethereum compatible (aka Solidity, Serpent, etc.)|No|||||
|EOS|C/C++ (compiles to WASM)|no|||||
|Ethereum|Solidity|Yes|CA|Switzerland|2014.04|2015.07|
|Ethereum Classic|Solidity|Yes|^^^|no|^^^|^^^|
|Exonum|Rust. Java bindings TBD|No|UA|Netherlands||2017.07|
|hyperledger|?|?|||||
|Lisk|Javascript||||||
|Nem|?|?|||||
|Neo|1st batch: dotNet; 2nd: Java,Kotlin; 3rd: C,C++,GO,Py,JS (TBD)|Yes|China|China|2014.06|2016.10|
|Neblio|REST-API, Python,JS, .NET(C# & VB.NET), Objective-C, Java, Node.js, GO, PHP|Yes|USA|USA|2017.01|2017.07|
|NXT|?|Yes|||||
|OmniLayer|||||||
|Qtum|Solidity|Yes|Singapore|Singapore|2016|2017.09|
|quorum|?|?|||||
|Radix|Scrypto (Based on JavaScript/TypeScript)|Yes|UK|UK|2018||
|Rootstock|Solidity|no|Argentina|Argentina|2015.11||
|Tezos|Michelson|no|||||
|Ubiq|Solidity|Yes|CA|CA ?||2017.01|
|Universa|||||||
|Urbit|Hoon|Yes|||||
|Waves|NA|Yes|RU|?|2016|2016.11|

Diễn giả đã liệt kê ra rất nhiều tên tuổi Blockchain qua một danh sách bên trên. Chúng được sử dụng trong các hệ thống:
- Decentralized DNS
- Autonomous companies
- Insurance
- Heritance
- Direct democracy
- IOT
- Token economy
- Loyalty system

### Thử thách gặp phải
Qua các dự án Blockchain đã làm, anh chia sẻ các thử thách đang phải đối mặt trong quá trình vận hành:
- Scalibility: Khả năng scale up hệ thống, khi mà lượng user nhiều, dung lượng ổ cứng tăng lên rất nhanh.
- Privacy & Criminality (quyền riêng tư và tội phạm)
- A bug can be very expensive (loss all funds): Khi có một bug xảy ra, việc fix lỗi phải bỏ ra rất nhiều công sức.
- Minor Updates lead to forks

## Tổng kết
Nội dung trình bày của diễn giả Phạm Thanh Tú khá dài, trong bài viết này mình cũng chưa kịp liệt kê lại hết nội dung đó được với một Beginer về Blockchain như mình. Bài viết mới chỉ tóm tắt lại được 1/2 nội dung bài trình bày và vẫn còn nhiều thiếu sót. Mời mọi người tham khảo, nếu có chỗ nào chưa hợp lý mong nhận được sự đóng góp của mọi người để hoàn thiện bài viết. 1/2 Nội dung còn thiếu bao gồm:
- Ethereum
- RPC + Truffle + Dapps
- Hyperleger (Fabric chaincode & Sawtooth processor)
- Tendermint ABCI

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***