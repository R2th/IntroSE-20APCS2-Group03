## Intro

**Decentralized Applications**, hay ĐApps, là các ứng dụng được chạy trên các nền tảng phi tập trung.

Nó gắn liền với các khái niệm như _Distributed Ledger Technologies_ (DLT) hay _Blockchain_. Do đó khi nhắc tới _ĐApps_, ta thường mặc định rằng đó là các ứng dụng trên blockchain.

Do chạy trên các nền tảng phi tập trung, do đó nó cũng sẽ phải có những kiến trúc đặc biệt để đạt được tính bảo mật cao cũng như tính tin cậy của hệ thống.

Trong bài bày chúng ta sẽ phân tích một số những yêu cầu về kiến trúc đối với _ĐApp_, đồng thời cũng đưa ra những gợi ý về các pattern nên áp dụng đối với backend của hệ thống.

> ĐApp nói chung và Blockchain nói riêng rất rộng, trong bài viết này ta sẽ lấy ví dụ với những nền tảng ĐApp đang phổ biến nhất hiện nay là Ethereum, EOS, TRON. Tất nhiên những kiến thức này vẫn có thể áp dụng cho những nền tảng phi tập trung khác.

Một số điểm nổi bật:

- Lưu trữ private key tại backend như thế nào?
- Kiến trúc Decentralized và Semi-Decentralized.
- Giải quyết các vấn đề low-level như network lỗi, xử lý event.

## Decentralized Applications

Giá trị lớn nhất mà Blockchain và các công nghệ phi tập trung mang lại chính là việc trên đó ta có thể xây dựng được những ứng dụng chạy chính xác theo design mà không một ai có thể ảnh hưởng tới hành vi của ứng dụng, hay làm sai lệch dữ liệu đã có.

Tuy nhiên hiện nay, việc tính toán và lưu trữ trên các nền tảng blockchain thông dụng như Ethereum, EOS, TRON vẫn còn rất hạn chế, nên trong các hệ thống ĐApp ta vẫn phải kết hợp với các front-end và back-end truyền thống.

Do đó, đôi khi không hoàn toàn 100% ứng dụng là decentralized, mà có thể là centralized một phần, hoặc semi-decentralized tuỳ vào bài toán. Trong tương lai thì khi các nền tảng phi tập trung được scale, thì ta sẽ có khả năng một cách toàn diện các ứng dụng fully-decentralized, bao gồm từ frontend, backend hay bất cứ thứ gì khác.

![](https://images.viblo.asia/d6b7c571-3684-4c90-b6a2-fea4a482d639.png)

Tuy nhiên ở thời điểm hiện tại, vì những lý do hạn chế đó mà ta cần phải kết hợp rất nhiều những thiết kế khác nhau, bao gồm cả những kiến trúc tập trung truyền thống và kiến trúc phi tập trung để giải quyết bài toán mà ta đang gặp phải. Cụ thể:

- Sử dụng một server để host backend hoặc frontend của ứng dụng
- Ta vẫn phải sử dụng một backend để tương tác với những hệ thống đã được xây dựng từ trước. Ta không thể luôn luôn đập đi làm lại tất cả mọi thứ được, đặc biệt là khi liên quan đến những business logic phức tạp và đang chạy ổn định.
- Khả năng lưu trữ của blockchain có giới hạn (do giới hạn của block size), do đó những dữ liệu lớn chúng ta vẫn phải lưu trữ tại những server truyền thống. Trên thực tế cũng đã có những decentralized storage như IFPS hay Filecoin, nhưng tính ổn định của những service này vẫn còn là dấu hỏi. Hơn thế nữa, chúng vẫn đang trong quá trình phát triển, có lẽ ta nên chờ thêm thời gian để chúng có thể trở thành những sản phẩm thực sự hoàn thiện.

Do đó tại thời điểm hiện tại, hầu như đối với bất kì hệ thống phi tập trung nào, ta vẫn phải xây dựng backend cho nó. Và trong bài viết này, ta sẽ bàn đến cách thiết kế backend sao cho hiệu quả.

## Đapp Architecture

> ĐPlatform = Decentralized Platform - tức những nền tảng phi tập trung như Ethereum/EOS/TRON.

Ta có 2 loại kiến trúc phổ biến của ĐApp hiện nay:

### Client ⇔ ĐPlatform: fully decentralized applications

Với kiến trúc này thì client của chúng ta (browser hoặc mobile app) sẽ tương tác trực tiếp với nền tảng phi tập trung thông qua những wallet software như Metamask, Trust hay những ví phần cứng như Trezor hay Ledger.

Ví dụ: CryptoKitties, forum Delegate Call của Loom; những ví điện tử như Metamask, Trust, TRON wallet; các sàn giao dịch phi tập trung như Etherdelta, Kyber.

### ĐPlatform ⇔ Client ⇔ Backend ⇔ ĐPlatform: semi-centralized applications

Đây là kiến trúc phổ biến nhất hiện nay.

Một ví dụ đó là các sàn giao dịch nổi tiếng như Bitfinex hay Poliniex hay Binance. Tất cả tiền ảo giao dịch trên các sàn này đều được lưu trữ trên một database truyền thống. Ta nạp tiền vào bằng cách chuyển tiền đến một địa chỉ xác định của sàn (ĐPlatform ⇔ Client), và khi rút tiền ra thì ta sẽ đặt lệnh và chờ phía backend sẽ chuyển lại tiền cho chúng ta (Backend ⬌ ÐPlatform). Và tất nhiên, tất cả những tương tác khác bên trong app đều là các tương tác giống như trong app truyền thống và không ảnh hưởng gì tới Đplatform cả (Client ⬌ Backend).

Một ví dụ khác nữa sử dụng kiến trúc semi-decentralized chính là [Etherscan.io](https://etherscan.io/): Ta có thể get tất cả những action liên quan đến ethereum tại đây, tức những action với ĐPlatform, nhưng bản thân trang web này được host trên một backend cố định, và cũng cung cấp các API/UI như những web truyền thống thông thường.

Ta sẽ lấy một ví dụ đơn giản để hiểu luồng của một giao dịch trên các hệ thống này xảy ra và được xử lý như thế nào:

![](https://images.viblo.asia/dd5a0178-484e-484d-9197-6dbb63e11aa5.png)

Tại đây:

1. Lắng nghe event trên network bằng cách polling liên tục.
2. Một khi bắt được sự kiện, ta sẽ tiến hành những business logic và send một transaction tương ứng.
3. Ký giao dịch với private key.
4. Sau khi transaction được gửi đi, ta tiếp tục polling network để check status của nó.
5. Nếu transaction tốn quá nhiều thời gian mà vẫn chưa được verify, có thể do rất nhiều lý do ta đã nói ở trên, trong trường hợp này ta sẽ send lại bằng cách ký lại giao dịch & gửi với lượng gas cao hơn để có thể được verify sớm hơn.
6. Transaction được mined. Tại đây ta có thể tiếp tục thực hiện những bussiness logic của mình.

## Backend for ĐApp

Toàn bộ các tương tác đối với mạng phi tập trung ta có thể gói gọn lại trong 2 điểm:

1. **Listen** các event và **Read** state của network.
2. **Send** transaction để thay đổi các state của network.

có vài vấn đề nổi cộm khi ta implement những điều trên:

- Với Ethereum, thì event _không ổn định_. Có hàng tá lý do dẫn tới việc ta không thể nhận được event khi transaction xảy ra, như lỗi mạng, fetch quá nhiều event một lúc, event có thể biến mất hoặc bị thay đổi do network fork... Và để giải quyết những vấn đề này, ta cần phải xây dựng một cơ chế để sync event và đảm bảo độ tin cậy.
- Tương tự vậy, transaction trong Ethereum cũng _không ổn định_, có hàng tá lý do dẫn đến việc transaction thất bại như nonce sai, gas không đủ, chữ ký sai lệch, sai logic.... Ta cần những cơ chế recover hay resend lại các transaction đó.
- Security: thật khó để có thể đảm bảo 100% rằng private key trên backend không bao giờ bị lộ. Thay vì thế, ta có thể thiết kế các phương án phù hợp hơn, để cho dù có bị tấn công, thiệt hại vẫn là quá nhỏ so với công sức mà kẻ tấn công bỏ ra.

Ok ta sẽ đi cụ thể cách giải quyết từng vấn đề trên.

### Listen Network Events

Bởi tất cả các action bên trên mạng phi tập trung đều là bất đồng bộ, các transaction tốn những khoảng thời gian khác nhau thì mới được mine, nên để nắm bắt được trạng thái của các transaction một cách đầy đủ và kịp thời, ta phải sử dụng đến lắng nghe event.

Ví dụ như với một contract ERC-20 thì tất cả những transaction chuyển tiền đều sẽ phát ra event `Transfer`. Trong ứng dụng, ta cần lắng nghe event này để thực hiện các business logic của app, như gửi notification, email, hoặc chỉ đơn thuần là cập nhật lại số dư cho một tài khoản nào đó.

Như ta cũng đã có nói bên trên thì event trong mạng phi tập trung là không ổn định, có rất nhiều trường hợp ta không thể lắng nghe được trực tiếp event. Do đó ta cần xây dựng một backend để có thể thực hiện việc sync các event một cách hiệu quả hơn.

Tuỳ vào từng bài toán mà sẽ có cách thiết kế khác nhau, ta sẽ đưa ra một thiết kế ví dụ như sau để có thể cải thiện được cách lắng nghe trực tiếp event bằng sử dụng _message bus_

![](https://images.viblo.asia/408aea0d-4d4c-4164-98b4-66fdf3657bd0.png)

Cách hoạt động sẽ như sau:

1. Backend sẽ liên tục poll network để lấy các event. Mỗi khi có một event mới xảy ra, nó sẽ được gửi về _message hub_ theo thứ tự để có thể xử lý bất cứ lúc nào. Có một điều cần lưu ý ở đây là nếu ta lấy quá nhiều event cùng một lúc thì có thể dẫn tới request bị fail, điều này có thể được giải quyết bằng cách limit số lượng request trên một block sao cho phù hợp.
2. Message Bus (ví dụ RabbitMQ) sẽ chuyển event về cho từng backend phù hợp để xử lý. Mỗi backend sẽ chỉ xử lý những event nào mà nó subscribe mà thôi, tránh được việc lắng nghe và xử lý dư thừa với các event không cần thiết.

Message bus là một cách hiệu quả để lưu trữ và phân phối các event, tất nhiên ta vẫn hoàn toàn có thể xử lý theo những cách khác như callback, socket... Tuy nhiên khi đó, thì ta sẽ phải implement thêm việc phân phối các event, cộng với việc monitoring để đảm bảo rằng các event được truyền tới đúng backend cần nó.

### Send Transaction

Khi gửi đi một transaction, ta sẽ phải thực hiện các bước sau:

1. Chuẩn bị raw transaction: Việc này rất quan trọng vì nó quyết định phần lớn transaction có được gửi thành công hay không. Gas, nonce, input... là những điều mà ta cần phải chú ý setup sao cho đúng. Có nhiều thư viện support ta làm điều này như `web3js` hay `ethereumjs-tx`.
2. Ký transaction: ta sẽ ký transaction với `private key`.
3. Send và resend transaction (trong trường hợp transaction chờ quá lâu hoặc bị fail). Không có gì đảm bảo rằng transaction luôn được mined 100%. Có thể do mạng lỗi mà ta không gửi được, lượng gas quá thấp dẫn đến các miner không đưa nó vào block để confirm. Trong những trường hợp đó ta sẽ phải resend lại transaction, chú ý giữ nguyên nonce, và tăng gas lên để transaction được ưu tiên đưa vào block.

![](https://images.viblo.asia/4827a4fe-58b7-49d1-8d78-a7ad69cce015.png)

Kết hợp cách thiết kế lắng nghe event và send transaction bên trên lại, ta có được một kiến trúc giống như dưới đây, trong trường hợp này là ví dụ cho một ứng dụng payment:

![](https://images.viblo.asia/064619b7-842a-490c-a9f8-29b641844e2e.png)

1. User sẽ gọi một hàm trong smart contract, sau khi thành công backend sẽ thực hiện một transaction charge tiền.
2. Backend lắng nghe và bắt được event tại bước 1, nó sẽ thực hiện transaction charge tiền.
3. Khi transaction charge tiền đã được mined, backend sẽ lại nhận được một event nữa và thực hiện tiếp các logic phía sau.

### Backend Security

Transaction được ký và gửi đi bởi **private key**. Nên việc bảo mật private key là việc rất quan trọng. Có rất nhiều phương án bảo mật phức tạp đã được thực hiện như [tại đây](https://en.wikipedia.org/wiki/Threshold_cryptosystem), [tại đây](https://medium.com/@ericwiner/cold-storage-keys-crypto-how-gemini-keeps-assets-safe-a732addcd13b), và [tại đây](https://www.coinbase.com/security). Có solution thì lưu trữ private key tại những geo-distributed databases (dữ liệu được lưu trữ tại nhiều địa điểm khác nhau nhưng hầu như không ảnh hưởng tới performance của hệ thống), một số khác thì lưu trữ tại những phần cứng đặc biệt. Tuy nhiên cuối cùng ta vẫn phải sử dụng private để ký transaction, có nghĩa là, về mặt lý thuyết không có cách nào đảm bảo 100% private key không thể bị lộ.

Do đó, thay vì nghĩ cách đảm bảo tuyệt đối cho private key, có một phương án khác là thiết kế hệ thống để sao cho dù private key có bị lộ đi chăng nữa, thiệt hại của nó gây ra hầu như không đáng kể.

Điều này được thực hiện như thế nào? Thay vì user gọi trực tiếp tác vụ, thì user chỉ gọi đến hàm _trigger_ tác vụ, còn tác vụ thực tế sẽ được thực hiện bởi một account khác trên hệ thống, gọi là _operator account_. Và cách design này ta gọi là _Operational Accounts Pattern_.

![](https://images.viblo.asia/4ad60b10-bf60-46f8-9d37-4adba6f94a83.png)

khi này, dù hệ thống bị tấn công và lộ private key đi chăng nữa thì:

- Kẻ tấn công sẽ chỉ lấy cắp được một lượng Ether rất nhỏ đã được deposit vào operator account.
- Các transaction khác và bản thân smart contract logic không hề bị ảnh hưởng.
- Ta có thể thay thế operator account đã bị tấn công bởi một account khác một cách nhanh chóng.

Do đó thiệt hại gây ra là rất nhỏ (có lẽ không đáng bao nhiêu so với công sức mà kẻ tấn công bỏ ra để chiếm lấy private key).

Ngoài phương án trên, thì [Vault](https://www.vaultproject.io/) cũng là một lựa chọn. Đây là một Ethereum plugin để lưu trữ và quản lý các Ethereum account.

## Kết luận

Trên đây chúng ta đã đi qua một vài phương án phổ biến để thiết kế backend một cách hiệu quả cho ĐApp. Hi vọng nó có thể giúp ích phần nào cho các developer đang làm việc với các hệ thống phi tập trung nói chung và blockchain nói riêng.

Có thể nói rằng thiết kế một hệ thống an toàn và đáng tin cậy là _thực sự khó_. Không có gì có thể đảm bảo rằng thiết kế an toàn ngày hôm nay cũng sẽ an toàn ngày mai. Trừ [cách thiết kế này](https://github.com/kelseyhightower/nocode).

Hãy luôn cập nhật những kiến trúc mới và những design pattern mới cho hệ thống của mình nhé :smile:

## Tham khảo

- https://en.wikipedia.org/wiki/Decentralized_application
- https://www.freecodecamp.org/news/how-to-design-a-secure-backend-for-your-decentralized-application-9541b5d8bddb/
- https://www.vaultproject.io/
- https://hackernoon.com/payments-of-tomorrow-decentralized-recurring-billing-47d126d895fd