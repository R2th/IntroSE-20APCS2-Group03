Hế lô anh em, mình là Cris Leo. <br/>
Trong bài viết này mình sẽ cùng anh em khám phá về Ethereum nhé!<br/>
Đối tượng của loạt bài viết này mình hướng đến anh em lập trình viên chưa có nhiều kinh nghiệm nhưng có hứng thú với công nghệ blockchain, đi sâu vào công nghệ bên trong chứ không liên quan về giá cả lên xuống hay như cách trade đồng coin nhé ae.

Đầu tiên chúng ta sẽ bắt đầu tìm hiểu về cách sử dụng ví (wallets) và cái wallets phổ biến và khá dễ sử dụng đó là MetaMask. 
Tiếp đó anh em mình sẽ cùng nhau từng bước tạo các giao dịch (transactions) và cuối cùng sẽ đi đến việc tìm hiểu làm sao để run một cái hợp đồng thông minh (smart contracts) cơ bản nhoé!

Let's do it!!!

### Vài điều về Ethereum?
Ethereum là một công nghệ do cộng đồng điều hành, cung cấp năng lượng cho đồng coin ETH, và hàng ngàn ứng dụng phi tập trung (decentralized application -  viết tắt là DApp, các bạn hãy quen với thuật ngữ DApp vì nó sẽ sử dụng viết trên các tài liệu cũng như cộng đồng Ethereum dùng rất nhiều) 

Các ứng dụng của Ethereum như <br/>
- Ngân hàng dành cho mọi người (*Banking for everyone*): Không phải ai cũng được tiếp cận với các dịch vụ tài chính. Nhưng tất cả những gì bạn cần để truy cập vào các sản phẩm cho vay, đi vay và tiết kiệm của Ethereum đơn giản là 1 kết nối internet. <br/>
- Một internet bảo mật hơn (*A more private internet*):  Chúng ta  không cần phải cung cấp quá nhiều thông tin cá nhân của mình để có thể truy cập vào những ứng dụng Dapp, Ethereum đang xây dựng một nền kinh tế dựa trên giá trị chứ không phải giám sát. <br/>
- Một mạng lưới ngang hàng (*A peer-to-peer network*): Ethereum cho phép chúng ta thực hiện chuyển tiền hoặc các thoả thuận với người khác mà không cần thông qua 1 tổ chức trung gian. (thông qua smart contract và ae lập trình viên chúng ta là những người đi viết các smart contract đó). <br/>
- Chống kiểm soát (*Censorship-resistant*): Không một tập đoàn lớn hay bất kỳ chính phủ nào có thể kiểm soát hệ thống Ethereum. Điều này giúp chúng ta không bị ai ngăn cản bất kỳ giao dịch nào. <br/>
- An toàn thương mại (*Commerce guarantees*): Ethereum tạo ra một sân chơi bình đẳng hơn. Khách hàng có một đảm bảo an toàn, được tích hợp sẵn rằng tiền sẽ chỉ được chuyển đi khi nhà cung cấp đáp ứng những gì đã thoả thuận.<br/>
-  Khả năng tương thích để giành chiến thắng. (*Compatibility for the win*)<br/>

**Lưu ý: Ethereum là một hệ thống còn Ether hoặc ETH mới là tiền tệ.**

### Đơn vị tiền tệ trong Ethereum
Đơn vị tiền tệ trong Ethereum được gọi là Ether hoặc ETH với symbol là ♦ or Ξ. <br/>
Đồng ETH được chia thành nhiều mệnh giá nhỏ,  mệnh giá nhỏ nhất được gọi *wei*. <br/>
1 ETH = 1 nghìn tỷ wei (1 * 10^18 = 1,000,000,000,000,000,000). 

Khi anh em phát sinh 1 giao dịch trong Ethereum thì giá trị của ETH luôn được thể hiện bằng số nguyên không dấu dưới dạng wei. 
VD: khi tôi chuyển muốn chuyển 0.5 ETH sang cho thằng bạn vay  thì trong network blockchain Ethereum sẽ không ghi log là tôi chuyển 0.5 ETH mà nó sẽ mã hoá là 500,000,000,000,000,000 (5e+17)

Các mệnh giá trong Eth có 2 cách gọi 1 là tên thông thường được đặt theo những vĩ nhân trong ngành khoa học máy tính và mật mã và tên còn lại được đặt theo hệ thống đơn vị quốc tế gọi tắt là SI (International System of Units)
Anh em có thể tham thảo bảng danh sách các mệnh giá của ETH dưới đây: 

|  Giá trị (đơn vị wei) |  Số mũ  |  Common Name | SI 
| -------- | -------- | -------- |  -------- |
| 1     | 1     | 1     | 1
| 1,000     | 1^3    | Babbage     | Kilowei or femtoether
| 1,000,000    | 1^6    | Lovelace     | Megawei or picoether
| 1,000,000,000    | 1^9    | Shannon     | Gigawei or nanoether
| 1,000,000,000,000    | 1^12   | Szabo     | Microether or micro
| 1,000,000,000,000,000    | 1^15   | Finney     | Milliether or milli
| 1,000,000,000,000,000,000    | 1^18   | Ether     | Ether
| 1,000,000,000,000,000,000,000   | 1^21   | Grand     | Kiloether
| 1,000,000,000,000,000,000,000,000   | 1024   |      | Megaether

### Sử dụng "ví" Etheremum 
Phòng trường hợp anh em đang mơ hồ về thuật ngữ "ví" (wallet) thì ở đây chúng ta  đang nói đến về việc sử dụng một phần mềm giúp chúng ta quản lý tài khoản Ethereum.  <br/>
Nói tóm lại wallet là cánh cổng để anh em có thể truy cập vào hệ thống Ethereum, wallet sẽ giúp chúng ta lưu giữ key và có thể tạo hoặc gửi giao dịch. 

Có rất nhiều loại wallet cho anh em có thể lựa chọn nhưng trong bài viết này tôi sẽ chỉ đề cập đến 1 loại ví tên là MetaMask. <br/>
**Lưu ý: chúng ta không nên bỏ hết trứng vào một giỏ, nên nếu bạn giàu và có ý định sở hữu nhiều ETH thì hãy tham khảo thêm nhiều loại ví và chia chúng ra. Hoặc gửi cho tôi giữ hộ nhé!**

### MetaMask
MetaMask là một extension chạy trên trình duyệt, nó hỗ trợ các trình duyệt như (Chrome, Firefox, Opera, or Brave Browser) có icon con cáo. <br/>
MetaMask rất dễ để sử dụng và test, nó có thể kết nối đến nhiều node Ethereum và test blockchains. <br/>
MetaMask cũng có app ở trên Android và iOS.

Để cài đặt MetaMask trên Chrome các bạn hãy vào [store extension ](https://chrome.google.com/webstore/category/extensions) và search "*MetaMask*". <br/>
![](https://images.viblo.asia/646929f6-cf73-4588-befe-96905b95826e.png)

click "Add to Chrome" để install nhé. 

**Tạo một ví**<br/>
Bước 1<br/>
Click vào hình icon con cáo ở phía trên bên phải của Chrome sẽ chuyển bạn đến trang chào mừng
![](https://images.viblo.asia/9f6e03a2-04b0-472b-a247-17973070bb1a.png)

Bước 2<br/>
Click vào "Tạo ví" (Create wallet) 
![](https://images.viblo.asia/4d035481-d476-4002-b166-e9bfd68414e8.png)

Bước 3<br/>
Đồng ý điều khoản 
![](https://images.viblo.asia/2cae252a-4b94-4a9c-aa2f-f89ca162fe52.png)

Bước 4<br/>
Tạo mật khẩu 
![](https://images.viblo.asia/f96f9168-eb6b-472b-a76b-95f843f86cb6.png)

Bước 5<br/>
![](https://images.viblo.asia/bc1921c3-428c-4ab9-b829-e846eeeef73a.png)

Bước 6<br/>
Hãy xác nhận chuối ký tự bạn nhận được ở bước 5

Bước 7<br/>
Vậy là hoàn tất chúng ta đã tạo thành công 1 ví để có thể tham gia Ethereum. 
![](https://images.viblo.asia/cd5d8672-aebe-4ba8-a9ca-15256db80022.png)

**Lưu ý: Nếu bạn mất private key, bạn sẽ mất quyền truy cập vào tiền và hợp đồng của mình. Không ai có thể giúp bạn lấy lại quyền truy cập — tiền của bạn sẽ bị khóa vĩnh viễn.**

### Mainnet, Testnet và Local  
MetaMask cho phép chúng ta kết nối với nhiều node Ethereum khác nhau rất tiện lợi cho việc phát triển và test và deploy. <br/>
Như các bạn thấy ở hình dưới MetaMask cho giúp chúng ta switch qua lại giữa các node Ethereum rất dễ dàng, và mình sẽ giải thích cho anh em từng node Ethereum. 
![](https://images.viblo.asia/2c0cce3f-3889-40ad-9273-b2e99680283f.png)

**Main Ethereum Network**: 
Đây là public Ethereum blockchain, sử dụng ETH thật, giá trị thật và kết quả thật. Tại đây mọi sai lầm đều trả giá bằng tiền mặt. Vì thế trước khi deploy smart contract lên đây đều phải test cẩn thận ở local và testnet

**Testnet**<br/> 
*Thuật ngữ testnet ở đây có nghĩa là chỉ các network chỉ dành cho việc test, mọi transactions, constract, fee .v..v ở trên network này đều không có giá trị. *<br/>
 Đối với testnet có rất nhiều node Ethereum test khác nhau như:<br/>
 
 - Ropsten Test Network: một blockchain công khai và  ETH ở đây không có giá trị,  ae  có thể nhận 1 ETH free mỗi ngày để thực hiện test. (cách nhận mình sẽ hướng dẫn ở bài sau)
 - Kovan Test Network: Một blockchain và network test public Ethereum sử dụng giao thức đồng thuận Arua vời bằng chứng về authority. 
 - Rinkeby Test Network: sử dụng thuật toán đồng thuận Clique. 
 - Localhost 8545: Kết nối tới 1 node chạy trên máy của ae, Node này có thể là 1 phần của bất kỳ 1 public blockchain nào kể cả main hoặc testnet. Và cũng có thể là 1 private testnest của ae. 
 - Custom RPC: cho phép MetaMask connect tới bất kỳ node nào với Geth-compatible Remote Procedure Call (RPC) interface. Node có thể là 1 phần của bất kỳ blockchain private hoặc public. 

**Lưu ý: MetaMask sử dụng  1 private key duy nhất và cùng 1 địa chỉ Ethereum cho toàn bộ các network mà MetaMask kết nối đến, nhưng số dư trong mỗi network sẽ là khác nhau. **

### Nhận 1 ETH để test
Sau khi anh em cài đặt xong MetaMask, bước tiếp theo ae có thể nhận 1 đồng ETH mỗi ngày ở testnet.  <br/>

Để nhận 1 ETH trên testnet Ropsten anh em sẽ làm như sau. <br/>
Bước 1: <br/>
Click vào icon MetaMask được hiển thị ở góc bên phía trên bên phải và chọn Rospten network. <br/>
Sau đó click vào button "*Mua*". <br/>
![](https://images.viblo.asia/95bd39e7-1462-475a-bcf0-f2ffc701fd3f.png)

Bước 2: <br/>
 Click chọn "Nhận Ether" ở phần "Vòi thử nghiệm" <br/>
 ![](https://images.viblo.asia/2d1e92b0-a1c4-49de-be39-444a9888ef26.png)

Bước 3: <br/>
MetaMask sẽ đưa bạn đến website với địa chỉ https://faucet.metamask.io/ <br/>
Tại đây bạn có thể thấy ở phần "*faucet*"  có thông tin về address của "faucet" là "0x81b7e08f65bdf5648606c89998a9cc8164397647" và số dư ETH còn lại của address này là "84232011.29 ether". (từng này mà ở mainnet là giàu to). 

Ở phần "user" vì chúng ta chưa connect ví MetaMask của mình với "faucet" nên nó chưa có thông tin nên bây giờ chúng ta sẽ thực hiện việc connect này, rất đơn giản thôi. <br/>
Ở phần "transaction" cũng thế chúng ta chưa có giao dịch nào nên nó chưa hiển thị. 

![](https://images.viblo.asia/fd34ecde-f417-41f4-bc72-2a4dc8b1e1b3.png)

Bước 4: <br/>
Thực hiện kết nối và nhận 1 ETH để test trên Ropsten, hãy click vào "request 1 ether from faucet", tự động ví MetaMask sẽ mở ra và tiếp tục hãy click vào button "Kết nối" như trong ảnh dưới.  <br/>

![](https://images.viblo.asia/0e63b6d8-ef58-4548-b57c-73214f0ba8f8.png)

Bước 5: <br/>
Anh em có thể thấy như ảnh dưới, sau khi connect xong đã hiển thị address ví MetaMask của tôi và số dư ETH test còn lại trong ví. 
![](https://images.viblo.asia/4a230f79-13c3-493b-a4f6-989041a435c4.png)


**Lưu ý: anh em chỉ có thể nhận 1 ETH để test mỗi ngày 1 lần nhé.**

OK anh em bài viết có vẻ dài rồi nên hẹn anh em ở phần 2 nhoé. <br/>
*to be continued*<br/>
*Note: Tài liệu thảm khảo Mastering Ethereum.*