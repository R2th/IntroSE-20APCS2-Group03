# Khởi động
## Kiến thức lí thuyết, các định nghĩa cơ bản
Bước đầu tiên để tiếp cận với nền tảng blockchain nói chung hay public chain nói riêng thì bạn cần có một chút kiến thức về blockchain đã, và đây là những cuốn sách có thể giúp ích cho việc đó:
- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)
- [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook/tree/first_edition_first_print)

Về cơ bản thì 2 cuốn sách sẽ cho chúng ta nhưng khái niệm cơ bản về cách hoạt động của nên tảng Blockchain gồm các thành phần cấu tạo nên một mạng  blockchain, cách thức hoạt động, các cơ chế đồng thuận, ...

Trong phần này sẽ có những phần cần tìm qua bao gồm:

1.  **Cách thức hoạt động tổng thể của mạng blockchain** : mô phỏng các giao dịch diễn ra trong một mạng blockchain.
2.  **Ví, khóa và địa chỉ** : Bao gồm kiến thức về cách thức sinh cặp khóa (public và private), địa chỉ, cách thức quản lý các địa chỉ bằng ví của mạng blockchain
3.  **Cấu trúc của blockchain** : Phần này sẽ khái quát về cấu trúc của các **Block** hình thành nên mạng **Blockchain** cũng như việc kết nối giữa các **Block**, cách thức blockchain lưu trữ khối dữ liệu của mình
4. **Cơ chế đồng thuận** : Phần khá quan trọng của mỗi mạng **blockchain**, trong 2 cuốn sách thì cơ chế đồng thuận sẽ chủ yếu đi vào thuật toán **proof of work**

Riêng với phần Ethereum, kiến thức ngoài những phần đã đề cập phía trên thì còn bổ sung thêm các kiến thức mới :

1.  **Smart contract** (Hợp đồng thông minh) : Đây cũng chính là gợi ý của chính tác giả của ETH khi đề xuất nâng cấp cho mạng bitcoin để giúp các mạng blockchain có thể xây dựng ứng dụng trên nó.
2.  **Dapp** (Ứng dụng phi tập trung): Thuật ngữ này có thể coi là phần mở rộng hơn của Smart contract, có thể hiểu như là một ứng dụng tương đối hoàn thiện với đủ các phần Frontend, Smartcontract, có thể có cả backend,...
## Cài đặt ví, tra cứu transaction


### Cài đặt ví
Sau khi tìm hiểu những kiến thức lí thuyết nền tảng cơ bản, chúng ta sẽ thực hành một chút thông qua việc cài đặt một ví tiền mã hóa cho mạng ETH. Trong phần tutorial này sẽ bắt đầu từ mạng ETH, do đó việc cài đặt ví cũng sẽ được triền khai ngay trên nền tảng này và một trong những ví nổi tiếng của mạng ETH chính là Metamask. Tại thời điểm hiện tại **(11/2019)**, ví **Metamask** được dùng phổ biến dưới dạng [extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) của browser, với 2 bản cho **Ios** và **Android** thì đang ở trạng thái **beta**:

* Trang chủ : https://metamask.io/ 
*  [Metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US)

Sau khi hoàn thành các bước đăng ký thì có thể gửi và nhận cryptocurrencies thông qua ví **metamask**

![](https://images.viblo.asia/b3cdfca5-7036-4899-9303-461e5cb6a2ec.png)


### Tra cứu transaction

Có khá nhiều trang có thể tra cứu các transaction của mạng (cơ bản chỉ cần là full node là có thể có bản sao lưu sổ cái chứa toàn bộ transaction của toàn mạng)
Có thể tìm kiếm các transaction của mình thông qua một số full node :

* ETH: [Etherscan](https://etherscan.io/) (Có thể tra cứu các transaction, địa chỉ, cả những giao dịch ERC20 và ERC721)
* Bitcoin: [Block explorer](https://www.blockchain.com/explorer?view=btc_blocks)  (Về cơ bản tra cứu tương tự như ETH tuy nhiên BTC sẽ không tồn tại các giao dịch token - ERC20, ERC721,.... như ETH)

# Xây dựng sample dapp
Sau khi đã tìm hiểu cơ bản về lí thuyết thì sẽ thực hành xây dựng một **Dapp** hoàn chỉnh từ đầu đến cuối để có thể nắm rõ cách thức kết nối giữa các phần của một Dapp

Sau khi tìm hiểu những kiến thức nền tảng về blockchain chúng ta có thể bắt tay vào code step by step một **smart contract** thông qua việc xây dựng một games : https://cryptozombies.io/ . Tại thời điểm bài viết, các bạn có thể tim hiểu theo lộ trình của bài 
[Solidity Path: Beginner to Intermediate Smart Contracts](https://cryptozombies.io/en/solidity)

![](https://images.viblo.asia/51121050-fcc9-435a-833e-a326fbee0001.png)


## Kiến thức cần có trước khi thực hành:

Ngoài những kiến thức về ngôn ngữ **solidity**, **web3.js** sẽ được học, làm quen ngay trong bài thì cũng phải hiểu qua chút về chuẩn **ERC721** sẽ được sử dụng. Đây có thể hiểu như một loại design pattern cho smart contract, do đó chúng ta cần hiểu được tư tưởng trước khi bắt tay vào code  :
* Viblo: [Những điều nên biết về ERC721](https://viblo.asia/p/nhung-dieu-nen-biet-ve-erc721-OeVKBqEE5kW)
* Medium: [The Anatomy of ERC721
](https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24)

![](https://images.viblo.asia/bd9b186a-d2f5-4229-8b50-bc077bf195ad.jpg)



Chuẩn **ERC721** được sử dụng cho khá nhiều loại game dạng thẻ bài, nổi tiếng nhất có thể kể đến [Cryptokitties](https://www.cryptokitties.co/)

Ngoài chuẩn **ERC721** thì còn rất nhiều các chuẩn như **ERC722**, **ERC720**, ... Tuy nhiên có 2 chuẩn được sử dụng nhiều nhất đó chính là **ERC721** và **ERC20**. **ERC721** đã được đề cập phía bên trên, còn **ERC20** thì chính là chuẩn để xây dựng các đồng **TOKEN** trên mạng **ETH**, nền tảng của các đợt ICO: 

* [Understanding ERC-20 token contracts](https://medium.com/@jgm.orinoco/understanding-erc-20-token-contracts-a809a7310aa5)
* [ERC20 Token Standard](https://medium.com/cryptoxtech/erc20-token-standard-a-beginners-guide-5b5f0c87e11f)

![](https://images.viblo.asia/d82f3292-de84-482d-98f8-7e9c9f74640c.jpg)


## Kiến thức cần chú ý:

* Xây dựng **Smart contract** với **Solidity** : Smart contract sẽ được viết bằng ngôn ngữ solidity, một ngôn ngữ có nhiều điểm tương đồng với Javascript và Python. Tìm hiểu thêm ở [documents](https://solidity.readthedocs.io/en/v0.4.24/)
* Kết nối **Smart contract** và **Frontend** thông qua **Web3js** : Thư viện Javascript để giúp **Frontend** tương tác với **Smart contract** thông qua các tác vụ tạo transaction, lấy dữ liệu, ... Tìm hiểu thêm ở [documents](https://web3js.readthedocs.io/en/v1.2.0/index.html)
* Kiểm thử smart contract: Một trong những cách để debug hiệu quả cho smart contract chính là viết các **unit test** :

    * Truffle: [Writing test in javascript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript) 
    * Viblo: [Kiểm thử smartcontract bằng truffle thông quá ví dụ minh họa](https://viblo.asia/p/kiem-thu-smartcontract-bang-truffle-thong-qua-vi-du-minh-hoa-QpmleEmmlrd)

## Mở rộng:

Để xây dựng contract theo các chuẩn có thể tham khảo bộ template đã có của OpenZeppelin:

* [ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)
* [ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721)
* [ERC777](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC777)


# Bảo mật cho smart contract

Phần xây dựng dapp phía trên mang đến cái nhìn tổng quan về xây dựng một Dapp đơn giản nhất, tuy nhiên để nâng cao viết các **smart contract** thì cần phải nâng cao khả năng coding **Solidity** cũng như bảo mật cho contract. Recommend trong phần này sẽ là series các bài **CTF** tìm lỗi bảo mật của **smart contract** : [Ethernaut](https://ethernaut.openzeppelin.com/)

Các bài trong series **Ethernaut** chủ yếu nhắm vào những lỗi bảo mật cơ bản khi viết các **smart contract**, tác giả của **Ethernaut** cũng là OpenZeppelin (Tổ chức xây dựng template cho các chuẩn **ERC**)

![](https://images.viblo.asia/5efe1ffb-8e8d-45b6-8d90-77655d4283a8.png)


## Chuẩn bị
Để tham gia series bảo mật này, cần thực hiện các bước:

1. Đăng nhập **Metamask** và chuyển sang mạng **Ropsten** vì Ethernaut sẽ sử dụng mạng này để chạy các bài trong series
2. Xin **faucet coin** từ **Ropsten** để có thể tham gia **Ethernaut** : https://faucet.metamask.io/

Sau khi thực hiện 2 bước trên là chúng ta đã có thể tham gia vào series **Ethernaut**, mục tiêu của các bài trong chuỗi series này chính là **chiếm quyền** hoặc **lấy toàn bộ tiền** trong các **smart contract** đã được định nghĩa sẵn.

Để hỗ trợ cho việc test contact **Ethernaut** cũng như xây dựng **smart contract** hoàn chỉnh sau này có thể tham khảo qua một **cloud IDE** được dùng khá phổ biến đó chính là [**Remix**](https://remix.ethereum.org):

![](https://images.viblo.asia/ed9328f4-47bc-4139-829d-09c192530a53.png)

Sử dụng Remix có thể deploy các **smart contract** trực tiếp lên các mạng **testnet**, **mainnet** hoặc mạng **local**. Để hiểu rõ hơn về remix cũng như cách sử dụng, có thể tham khảo trực tiếp tại phần [documents official](https://remix-ide.readthedocs.io/en/latest/index.html#)

Để có thể hoàn thiện phần này một cách hiệu quả nhất thì có 2 thứ được coi là gối đầu giường chính là :

* [White paper](https://github.com/ethereum/wiki/wiki/White-Paper) : Sách trắng hay còn được biết đến sách viết về kĩ thuật dành cho các nhà phát triển **smart contract** trên Ethereum. Do **white paper** sẽ khá dài nên có thể tập trung vào các phần mục lục và chọn những phần mình cần phải tìm hiểu thay vì việc đọc từ đầu đến cuối.
* [Documentations ](https://solidity.readthedocs.io/en/v0.4.24/introduction-to-smart-contracts.html) : Nếu khá ngại để đọc **white paper** thì vẫn còn một bản thay thế nhưng cũng vô cùng hiểu quả là chính docs. Tips: Nên chú ý vào các phần được đánh tag **Warning** và **Note** 
## Kiến thức  cần chú ý

Trong những bài này sẽ phần lớn tập trung vào các tính chất của kiến trúc **smart contract** :

* Các loại function có sẵn trong smart contract
* Cấu trúc lưu trữ data của smart contract
* Cấu trúc của ERC20

## Writeup

Sau khi hoàn thành hết series **Ethernaut** thì đã nắm được phần lớn các lỗi có thể xảy ra và cần tránh khi xây dựng các **smart contract**, có thể thấy những lỗi này cũng đá được các chuẩn của **OpenZeppelin** khắc phục ở trong các template của họ

Trong trường hợp nghĩ mãi không ra hoặc đã giải quyết xong , có thể tham khảo bản writeup cho Ethernaut :
[Hacking Ethernaut](https://viblo.asia/s/blockchain-smart-contract-Am5yq0mq5db) của anh [Do Trung Kien](https://viblo.asia/u/kiendinang)

Trong trường hợp vẫn muốn tiếp túc đào sâu thêm vào bảo mật cho **smart contract**, có thể tham khảo một trang web tiếp chính là : https://capturetheether.com/


# Tạm kết
Những phần trên chủ yếu sẽ hướng dẫn tương tác với smart contract và cách hoạt động của smart contract. Để xây dựng một Dapp hoàn chỉnh chũng ta sẽ cần kết hợp các phần gồm : **Fronted**, **Smart contract** và có thể có cả **Backend**.
Phần tiếp theo sẽ là xây dựng các dapp dựa trên 2 Framework Reactjs và Vuejs.