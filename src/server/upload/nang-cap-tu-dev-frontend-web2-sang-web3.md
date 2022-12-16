## Tại sao nên đọc bài này?

- Nâng cấp level của bản thân một cách ngắn gọn, hiệu quả
- Người ta làm web3 được chả lẽ mình làm không được?

## Trở thành Web3 Frontend developer

Giờ tao đang là Web2 developer, làm react, redux, nextjs mỗi ngày kiếm cơm, làm sao tao trở thành Web3 developer được?

Đây là check-list

-  Blockchain là gì
-  Cách mà wallet và block chain tương tác với frontend
- Code thử, tương tác với blockchain (Đơn giản như call API)
-  Kiếm việc trong Web3

### Blockchain là gì?

Đâu tiên thì nên hiểu khái niệm xem tụi Blockchain hay Web3 là gì nhỉ

[Blockchain cho mọi người](https://thanhle.blog/blog/blockchain-cho-moi-nguoi)

### Tương tác với Block-chain và Wallet

Về cơ bản khi code frontend, mọi chuyện không có gì thay đổi nhiều so với web2 cả. Thay vì call API để hiển thị data thì bạn call một bên khác để trả về data (Cụ thể là JSON RPC), nên cơ bản nó cũng chả khác gì call API lắm

![image.png](https://images.viblo.asia/806645c0-0ded-4c50-b2f6-b9258f902d88.png)

Về cơ bản, web3 sẽ chia ra 2 loại request riêng biệt:

- Mutable API - Những API sẽ làm thay đổi trạng thái của hệ thống. Vd như chuyển tiền, swap token, lending,…
- Read-only API - Những API thể hiện trạng thái của hệ thống. Ai cũng có thể call và lấy data được. VD như đang có bao nhiêu tiền trong ví, đang lending ở đâu, swap với rate bao nhiêu

**Đã có 2 loại request rồi, bây giờ mình sẽ gọi vào đâu?**

Thường chúng ta sẽ phải gọi qua một server trung gian - blockchain node, con server kết nối vào Block Chain để:

- Nhận Read-only API, lấy data từ blockchain, trả về cho user
- Nhận Mutable API, broadcast lên blockchain cho tụi validator

Các Node Provider thường thấy

- Node provider mặc định của network đó (thường bị rate limit và khá chậm nên ít người dùng)
- Infura
- QuickNode
- Alchemy, Moralis

**Vậy tụi Wallet làm gì ở đây?**

Có nhớ hồi nãy mình có nhắc tới về Mutable API không? Wallet giúp ta chứng minh được ai là đứa thực hiện Request đó, và cũng đồng thời nhắc nhở bạn là người chịu trách nhiệm cho cái request vừa rồi.

Đương nhiên là bạn không thể call Mutable API với nội dung: `Thằng A gửi cho tui 10BTC` được đúng không? Wallet giúp xác định chắc chắn, nếu thằng A gửi tiền thì chỉ có mình thằng A có thể gửi, mà không phải là một thằng hacker nào khác

[Định danh ở Web 2 và Web 3](https://thanhle.blog/en/blog/tai-khoan-o-web2-va-web-3)

*Đọc thêm bài viết của mình về việc định danh ở Web3 ở trên*

**Đó vậy khác biệt giữa Web2 và Web3 cho Frontend dev chỉ có nhiêu đây:**

- Thay vì tương tác với API thì tương tác với JSON RPC node
- Thay vì gắn login, gắn auth token vào API thì bạn tương tác với Wallet để làm việc trên

### Một số thư viện cho Frontend

[wagmi: React Hooks for Ethereum](https://wagmi.sh/)

[web3-react](https://www.npmjs.com/package/web3-react)

[RainbowKit](https://www.rainbowkit.com/)

[Documentation](https://docs.ethers.io/v5/)

[web3.js - Ethereum JavaScript API - web3.js 1.0.0 documentation](https://web3js.readthedocs.io/en/v1.7.5/)

Nói chung mình Highly recommend dùng Wagmi và ethers.js vì tụi này tiện và ok hơn mấy thằng còn lại. Mấy thằng khác nên học tùy tình huống kiểu như trong prj đang dùng sẵn thằng này cmnr.

## Học thêm về web3

Đó frontend thì chỉ có vậy, nhưng mình nghĩ các bạn vẫn nên tìm hiểu thêm về phía backend, và một số thứ liên quan khác như:

- Dùng explorer để inspect data
- Hiểu sơ về code backend (Solidity, rust) để có thể biết được đâu rà Read function, đâu là Mutate function
- Bảo mật

Một số khóa học về web3 phù hợp với frontend

[#1 Solidity Tutorial & Ethereum Blockchain Programming Course | CryptoZombies](https://cryptozombies.io/)

[buildspace](https://buildspace.so/)

[Web3 University - Your Guide to Blockchain Development](https://www.web3.university/)

[Learn NEAR Club](https://learnnear.club/)

Khóa near học xong còn có tiền nữa, mình cũng quen một vài người build prj trong khóa học đó, sau đó được NEAR tại trợ để làm tiếp (khoảng hơn 5000$)

![Khoe thành tích 😎](https://images.viblo.asia/a581f49f-2a17-4001-a39d-2578154ded72.png)

Khoe thành tích 😎

Học song nhớ thực hành nha, nghĩ ra problem gì phù hợp mà blockchain cần giải quyết rồi làm thử, như mình làm Morphling nè

[Morphling - dApp Tham gia Binance Launchpad](https://thanhle.blog/blog/morphling-dapp-tham-gia-binance-launchpad)

---
😼 Nhân tiện, mình cũng rất muốn connect với các bạn đang làm trong Web3, mình cũng đang build product về Web3

---


## Tìm việc web3

Thì có 2 cách, hoặc bạn xin vào làm trong một công ty về Web3, hoặc là bạn làm công việc freelance đến Web3

Công việc fulltime thì chỗ kiếm chắc khá nhiều, search Google đầy

Còn công việc freelance thì đây là một vài chỗ để tham khảo

[Issue Explorer](https://gitcoin.co/explorer)

[Dework - The task manager for DAOs and decentralized work](https://app.dework.xyz/bounties)

## Lời kết

So với backend, thì frontend tương tác với Blockchain khá đơn giản và dễ học. Tuy nhiên mình thấy benefit cho các bạn làm ở Web3 đang cao hơn hẳn nên cũng đáng để các bạn thử.

Mà dù Web2, Web3 hay Web4 thì hãy luôn nhớ trau dồi những thứ cơ bản nhất, đảm bảo không bị lỗi thời đâu.

## Các bài viết “lan quyên”
- https://thanhle.blog/blog/bay-gio-hoc-blockchain-lieu-co-muon
- https://thanhle.blog/blog/chiec-transaction-tren-blockchain-ben-trong-co-gi
- https://thanhle.blog/blog/tai-sao-minh-tin-vao-blockchain