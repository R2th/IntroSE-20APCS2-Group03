### 1. Nước sông không phạm nước giếng :smirk:
Ngày xửa ngày xưa cách đây 11 năm vào ngày 3 tháng 1 năm 2009, màn debut hoành tráng của Bitcoin đã mở đầu cho công nghệ hứa hẹn sẽ thay đổi hoàn toàn cục diện của nền tài chính, người ta gọi nó là Blockchain. Kể từ đó, đã có rất nhiều sản phẩm blockchain ra đời, mỗi sản phẩm lại có tôn chỉ và phương án thiết kế riêng. Có chain thì chỉ có coin (tức sinh ra chỉ phục vụ cho giao dịch), có chain thì có cả coin và hỗ trợ smart contract, cũng có chain sinh ra chả biết để làm gì :D

Tuy nhiều chain là vậy, nhưng các chain đều chảy những dòng chảy riêng lẻ, mạnh ai nấy chơi, giao dịch hoàn toàn xảy ra trong phạm vi riêng của chain. Ví dụ như bây giờ bạn có 10 ETH, nhưng bạn lại muốn đổi 10 ETH để lấy đồng ATOM thì cách duy nhất nếu như không có cross chain là bạn bán 10 ETH lấy USD rồi dùng số USD đó để mua lấy ATOM. 

Nhưng với cross chain thì việc đó có thể diễn ra nhanh chóng mà không cần thông qua USD.

Cùng với Storage Data, Oracle thì Cross Chain đang là một trong ba xu hướng mạnh mẽ nhất của Public Blockchain.

### 2. Điều kỳ diệu của Cross Chain
Như mình đã nói ở trên điều kỳ diệu của Cross Chain có thể chuyển coin từ chain này sang trên khác mà không cần phải thông qua việc mua bán USD trung gian.

Vậy Cross Chain thực chất đã làm như thế nào ? Có phải là nó đã thật sự chuyển 1 ETH từ Ethereum sang Cosmos hay không ?

#### IBC protocol

Nhắc lại, cosmos-sdk là một frame work hỗ trợ lập trình viên tự tạo một chain riêng của mình, được viết bằng Golang, có tính module rất cao nên rất linh hoạt, các bạn có thể xem lại series về Cosmos của mình [tại đây](https://viblo.asia/s/cosmos-sdk-tutorial-jeZ103gjKWz). Cosmos đã tiếp cận xu hướng Cross Chain thông qua một protocol được gọi là Inter-Blockchain Communication Protocol (IBC), các bạn cần phải phân biệt rõ giữa xu hướng Cross Chain và IBC protocol. 

Ban đầu IBC được Cosmos phát triển để phục vụ cho việc giao tiếp giữa các chain trong Cosmos Zone - nghĩa là các chain được dựng bằng cosmos-sdk, tư tưởng chung của IBC là 2 chain sẽ chọn ra 2 `peg` (chốt) làm đại diện của mình 2 `peg` này sẽ có nhiệm vụ là xử lý các package, và cập nhật state của chain này lên chain kia. Nhìn chung IBC protocol là một giao thức khó diễn đạt và triển khai, chỉ khi bạn tự chạy một project mẫu và phân tích nó thì bạn mới bắt đầu hiểu nó được. 

Các bạn có thể xem project mẫu về IBC [tại đây](https://blog.cosmos.network/guide-to-building-defi-using-band-protocol-oracle-and-cosmos-ibc-fa5348832f84).

Cosmos cũng đang xây dựng một chuẩn cho IBC [tại đây](https://github.com/cosmos/ics).

Vậy việc giao tiếp giữa các chain trong cùng một hệ sinh thái như Cosmos có được xem là Cross Chain hay không? Câu trả lời là có, tuy nhiên việc cross giữa các chain trong cùng một hệ sinh thái có phần dễ triển khai hơn và mở ra ít use case hơn là cross giữa các chain khác hệ sinh thái như cross giữa Ethereum và CosmosHub.

#### Peggy
Peggy là một open source của Cosmos hỗ trợ cho việc gửi ETH hoặc ERC20 từ Ethereum vào chain cosmos được dựng bằng Cosmos SDK, nó cũng cho phép gửi ngược lại từ chain cosmos đến Ethereum. Xem repo của peggy [tại đây](https://github.com/cosmos/peggy).

Kiến trúc của peggy có thể hiểu cơ bản như sau:
* Cụm Smart Contract trên Ethereum (tích hợp ERC20 và chỉ ai có privateKey của Validator mới có thể tương tác)
* Relayer có privateKey của Validator, theo dõi các sự kiện được bắn ra từ cụm Smart Contract, chỉ có Validator mới có quyền thao tác với cụm smart contract
* Chain dựng từ cosmos  sdk
<br>

##### ETH hoặc ERC20 từ Ethereum vào Cosmos

Khi một account `ethereum sender` trên Ethereum muốn gửi 1 ETH hoặc 1 ERC20 (ví dụ DAI) vào một account `cosmos receiver` trong chain cosmos của mình, thì nó sẽ gọi đến cụm smart contract để `lock` 1 ETH vào đó, cụm smart contract sau khi nhận được 1 ETH sẽ phát ra một `event` thông báo gồm các thông tin về:
* ethereum sender
* cosmos receiver
* amount
* denom (có thể là ETH hoặc DAI hoặc một ERC20 nào đó)

Sau đó, `relayer` bắt được `event`, nó sẽ đúc một coin mới và quy ước nó có giá trị là 1 ETH ( hoặc DAI) trong nội bộ chain cosmos và gắn quyền sở hữu cho `cosmos receiver`.  
<br>
##### Từ Cosmos ra Ethereum
Đấy là gửi ETH từ Ethereum vào cosmos chain, vậy muốn gửi ngược lại một coin từ cosmos vào Ethereum thì luồng sẽ như thế nào?

Một account trên cosmos là `cosmos sender` muốn gửi 1 ETH hoặc DAI hoặc 1 local asset nào đó trên cosmos chain (chẳng hạn STAKE) đến một account `ethereum receiver` trên Ethereum thì chain cosmos sẽ burn 1 ETH hoặc DAI (lưu ý lúc này chỉ là một local asset có giá trị quy ước là 1 ETH hoặc 1 DAI) của `cosmos sender` sau đó sẽ dùng relayer ( relayer này đã có privateKey của validator) gọi đến cụm smart contract, sau đó cụm smart contract sẽ kiểm tra xem:
- Nếu coin muốn gửi là ETH (hoặc ERC20) thì sẽ unlock một lượng ETH (hoặc ERC20) tương ứng và gửi nó đến `ethereum receiver`
- Nếu coin muốn gửi là một local asset thì nó sẽ deploy một smart contract ERC20 mới và mint cho `ethereum receiver` một lượng tương ứng quy ước bằng với giá trị của local asset mà cosmos chain đã burn).

Tư tưởng đơn giản của Cosmos là như vậy, thể nhưng triển được nó lại là một chuyện khác, hiện tại peggy đã nên hình hài và có thể hoạt động được luồng hoàn chỉnh, chỉ là nó còn một vài vấn đề về revert :D, ví dụ như nếu bạn gửi ETH từ Ethereum vào một account trên cosmos nhưng lại nhập một account cosmos không hợp lệ thì sẽ như thế nào ?. Đấy là một vấn đề khó , phải chờ  peggy update thêm.

### 3. Tương lai của cross chain

#### Tương lai rộng mở
Thật sự với kỹ thuật Cross chain, hoạt động tài chính trên Blockchain đã đang ngày càng tiệm cận với hoạt động tài chính thực tế, bên ngoài có thể trao đổi các loại tiền tệ dễ dàng thì Blockchain cũng có thể làm như vậy, thực tế có chênh lệch lỗ lãi thì Blockchain cũng như thế

Mặt khác, khi Cross chain được tích hợp với Oracle thì nó mở ra một loạt các use case mới, ngoài việc gửi 1 ETH vào thì chúng ta có thể gửi 1 ETH nhưng được quy đổi ra USD hoặc một coin khác, thậm chí là ATOM, khi đó chain cosmos của chúng ta sẽ đứng giữa Ethereum và Cosmos Hub. 

Với use case linh hoạt như thế, ta hoàn toàn có thể mang mô hình thế chấp tài sản để vay tiền vào Blockchain, chẳng hạn như thế chấp Ethereum để vay ATOM, USD.

#### Bị lợi dụng
Cross chain thể được sử dụng che dấu đường đi của đồng tiền, ví dụ như 1 cá mập có 1 triệu ETH muốn gửi đến 1 account, nhưng cá mập ấy không muốn giao dịch ấy dễ bị nhìn thấy bởi người khác thì ông ta hoàn toàn có thể gửi nó vào cosmos xong lấy ra bằng account mà ông ấy muốn :D.

### 4. Link tham khảo

https://github.com/cosmos/peggy

https://blog.cosmos.network/guide-to-building-defi-using-band-protocol-oracle-and-cosmos-ibc-fa5348832f84

https://github.com/cosmos/ics