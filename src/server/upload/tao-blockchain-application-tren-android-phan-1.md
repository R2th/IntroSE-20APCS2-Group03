## **Tổng quan**
Như title ở trên :point_up_2:, trong series lần này mình sẽ giới thiệu cho các bạn mới tất tần tật về cách tạo một game trên blockchain (ở đây mình chọn Ethereum làm nền tảng nhé :kissing:) và sẽ sử dụng chúng trên mobile (cụ thể là Android - vì mình là dev Android mà :male_detective:). Vì là giới thiệu cho các bạn mới nên sẽ hơi kỹ và dài dòng một chút, nếu mọi người biết rồi thì có thể lướt nhanh nhé.
Mình sẽ chia chủ yếu thành 2 phần, phần 1 thì sẽ hướng dẫn các bạn setup môi trường, lib, tạo token, ... trên Ethereum. Còn phần 2 thì sẽ là viết cái app cơ bản để gọi nó nhé.
### Ok! Let's get it!
### Objective
Mình muốn giới thiệu sơ qua về ứng dụng chúng ta sẽ làm, để mọi người có thể dễ dàng biết được đích đến của bài viết là gì. Nôm na là chúng ta sẽ tạo một DiceApp (DApp) trên nền tảng Blockchain thông qua đồng tiền ảo (token) mà chúng ta sẽ tạo.
* Dựng môi trường
* Tạo đồng token theo chuẩn [ERC20](https://blogtienao.com/erc20-token-la-gi/) của riêng mình, compile và deploy nó.
* Tạo ra contract game.
* Tương tác với nó qua console hoặc remix.
* Tạo ứng dụng Android để tạo ví và tương tác với game.
### 1. Solidity và Ethereum
Về Solidity và Ethereum thì hiện tại cũng có nhiều tài liệu dễ hiểu, giúp bạn xây dựng được các contract đầu tiên nên mình sẽ không nhắc lại nữa. Các bạn có thể đọc thêm tại [đây](https://viblo.asia/p/solidity-ethereum-va-smart-contract-dau-tien-Az45bg0oKxY) và code trực tiếp trên [Remix](https://remix.ethereum.org/) để test nhanh. 
Ở giới hạn series lần này thì mình sẽ hướng dẫn các bạn làm điều đó trên VSCode nhé :grinning:
### 2. Môi trường lập trình
Có nhiều cách để các bạn có thể tạo ví ERC20, ví dụ như dùng Metamask rồi vòi Ether trên Ropsten Network (được xem như là môi trường dev, còn Mainnet thì được xem như Prod). Còn ở bài này thì mình recommend là chúng ta sẽ dùng bộ đôi [Ganache](https://www.trufflesuite.com/docs/ganache/overview)  và [Truffle](https://www.trufflesuite.com/truffle) để tạo nhanh các tài khoản cũng như là dễ hơn trong việc test Dapp và . Tiếp theo là chúng ta sẽ dùng thư viện [Web3js](https://web3js.readthedocs.io/en/v1.2.9/) cho cả server cũng như dưới Android để có thể deploy cũng như tương tác,
Okay, đầu tiên sẽ là cài đặt nhé, chỉ cần chạy những commands trong VSCode sau:
```
mkdir TokenDemo
cd TokenDemo
npm install ganache-cli web3@0.20.2
npm install -g truffle
```
![](https://images.viblo.asia/88e79d2d-a9d8-4cc5-b648-c722f7732297.PNG)

![](https://images.viblo.asia/6803120d-587c-46b2-8601-684148787871.PNG)
Vậy là cài xong nhé!
Tiếp theo chúng ta sẽ dùng ganache tạo một loạt 10 tài khoản, mỗi tài khoản 100 ETH (trên môi trường test nhé)
```
node_modules/.bin/ganache-cli
```
![](https://images.viblo.asia/caa3b27b-3c80-487c-8120-620a59fd61e2.PNG)

Mọi người chú ý save cái này ra file riêng để sau này làm việc cho tiện nhé, chúng ta sẽ cần dùng nhiều Address và Private Key đấy
Tiếp theo sẽ dùng init cái truffle đã cài ở trên
```
truffle init
npm install @truffle/hdwallet-provider
```
Sau khi cài xong thì nó sẽ tạo cho chúng ta 1 file **truffle-config.js**. Bây giờ hãy cùng nhau mò vào đó để setup nó nhé.
Với version hiện tại (6.14.4) thì file này nó đã có sẵn các đoạn setup (đã comment code lại), việc của ta chỉ đơn giản là mở nó ra vào sửa lại cho phù hợp với bản thân thôi. 
![](https://images.viblo.asia/5aeea628-f008-4aaa-864f-12a57bc209ad.PNG)

Mình sẽ giải thích sơ qua về cấu hình trên nhé:
* Private key: Cái này chúng ta sẽ chọn 1 key (nào đó tùy các bạn) ở trong danh sách khi chúng ta cấu hình ganache :point_up_2:
* HDWalletProvider: Cái này chúng ta sẽ tạo 1 project trên Infura để lấy endpoint bỏ vào nhé ([chi tiết hơn tại đây](https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2))

Okay. Sau khi cài đặt xong thì bạn để ý nó sẽ tự sinh ra thư mục **contracts**, trong đó sẽ có 1 contract mẫu **Migrations.sol**. Bây giờ chúng ta sẽ thử deploy (để kiểm tra xem nãy giờ quá trình cài đặt có thành công hay chưa) thông qua câu lệnh `truffle migrate --network ropsten`. Nếu ra được như này là sẽ thành công :point_down:
![](https://images.viblo.asia/033ba96b-d057-4927-9f3d-a044bc571f0d.PNG)

**Ủa, mà như vậy thì chúng ta đã deploy nó lên đâu, làm sao để kiểm tra được nhỉ?**
Đừng lo, các bạn chỉ cần copy **transaction hash**, sao đó paste vào ô tìm kiếm của [Ropsten Etherscan](https://ropsten.etherscan.io/) (nếu là Mainnet thì các bạn xóa chữ ropsten trong link đi nhé), nếu nó hiện ra được ngày giờ deploy, status = success thì chúng ta đã thành công trong việc tạo ra contract đầu tiên rồi đó.
![](https://images.viblo.asia/3e261435-c401-480d-b9ed-b21b69b38c5e.PNG)
Vậy là chúng ta đã xong phần đầu tiên (cài đặt môi trường), ở [phần tiếp theo](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-2-L4x5xaqwKBM) mình sẽ hướng dẫn các bạn tạo ra 1 đồng tiền ảo (token)  của riêng mình theo đúng chuẩn ERC20 của nó nhé. 
Hẹn gặp lại!