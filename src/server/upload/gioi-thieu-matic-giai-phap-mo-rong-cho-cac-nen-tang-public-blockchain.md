![](https://images.viblo.asia/0a122cc9-eb54-4618-879f-304172853d5b.jpg)

## 1. Tổng quan

**Matic** là một giải pháp **sidechain** giúp tăng khả năng mở rộng cho các nền tảng public blockchain. **Matic** được triển khai dựa trên giải pháp **Plasma** giúp "tăng tốc" cho các mạng public blockchain vốn vẫn được coi là có tốc độ khá khiêm tốn. Hiện tại, **Matic** tích hợp được trên Ethereum và hứa hẹn sẽ có thêm nhiều nền tảng khác trong tương lai không xa.

Vậy **Sidechain** hay **Plasma** là gì :thinking: 

### Sidechain

Ý tưởng về **sidechain** lần đầu tiên được đề xuất trong một [paper](https://blockstream.com/sidechains.pdf) được xuất bản vào năm 2014. Ban đầu, nó được áp dụng chủ yếu cho Bitcoin, khái niệm **sidechain** về cơ bản là việc chạy một blockchain khác, bên cạnh một hay một vài blockchain "chính" khác. Hai blockchain có thể "nói chuyện" với nhau giúp các tài sản có thể di chuyển giữa hai chuỗi.

Ví dụ, chúng ta cần chạy một **sidechain** trên Ethereum, việc đầu tiên là cần chạy lên một vài client Ethereum (như Geth hay Parity) nhưng không kết nối đến mạng Ethereum mà tự kết nối với nhau thành 1 blockchain khác :grinning:, thuật toán đồng thuận có thể được tùy chỉnh, không dùng Proof-of-Work giống Ethereum cũng được, hoàn toàn OK :thumbsup:

Bây giờ chúng ta cần làm sao để 2 blockchain có thể "nói chuyện" được với nhau :thinking:. Giải pháp phổ biến hay dùng là tạo 1 smart contract trên **Ethereum**. Khi người dùng muốn chuyển tài sản từ **Ethereum** sang **sidechain**, họ cần gửi tài sản đó vào smart contract. Chúng ta sẽ lắng nghe sự kiện và tạo tài sản tương ứng trên **sidechain** cho họ. Tương tự là việc người dùng muốn chuyển tài sản từ **sidechain** sang **Ethereum**, chúng ta sẽ xóa các tài sản đó trên **sidechain** và người dùng sẽ có quyền rút lại tài sản trên **Ethereum**.

**Ưu điểm**

Phí giao dịch trên **sidechain** luôn rẻ hơn các phí giao dịch trên **Ethereum**, điều này giúp người dùng tiết kiệm được rất nhiều chi phí giao. Ví dụ với trường hợp người dùng có nhu cầu chuyển đi chuyển lại tài sản nhiều lần, thay vì phải thực hiện ngần ấy giao dịch trên **Ethereum** với giá khá cao, họ chỉ cần thực hiện đúng 2 giao dịch là gửi và rút trên **Ethereum**, các giao dịch còn lại sẽ được xử lý ở **sidechain** với chi phí rẻ hơn.

**Nhược điểm**

**sidechain** là một blockchain nhỏ hơn chain chính, điều này tiềm ẩn nguy cơ bị tấn công đến từ hacker nhằm đảo ngược giao dịch, v..v

Một **sidechain** có phí rẻ hơn **Ethereum** thì nó sẽ kém an toàn hơn so. Nếu **sidechain** bị tấn công, bạn có thể mất tất cả tiền của mình. Nhưng đôi khi, người ta sẽ sẵn sàng đổi sự an toàn lấy sự tiện lợi.

### Plasma

**Plasma** đã được đề xuất vào năm 2016. Tóm lại, các chuỗi **plasma** giống như **sidechains**, ngoại trừ việc đánh đổi một số tiện ích để có thêm bảo mật.

Cũng giống như **sidechains**, **plasma** cũng có thuật toán đồng thuận tạo ra các block. Tuy nhiên, khác với **sidechains**, các chuỗi **plasma** không độc lập so với chuỗi chính mà là các chuỗi con (child chain) từ chuỗi chính.

![](https://images.viblo.asia/aaaf55ef-8437-4c45-934a-26d3dd7ba748.png)


Chi tiết hơn các bạn có thể tham khảo bài viết [Plasma- Giải pháp cho sự mở rộng mạng lưới Blockchain](https://viblo.asia/p/plasma-giai-phap-cho-su-mo-rong-mang-luoi-blockchain-tiep-theo-ByEZkybY5Q0#_2-plasma-hoat-dong-nhu-the-nao-2) của tác giả @NguyenDuyDien hay bài viết cũ của mình giải thích về Plasma ở [đây](https://viblo.asia/p/ban-ve-van-de-mo-rong-trong-blockchain-LzD5dj6wZjY#_giai-phap-5-plasma-10).

## 2. Kiến trúc của Matic

Kiến trúc của **Matic** được chia làm 3 layer:
1. Smart contract **Staking và Plasma** trên Ethereum
2. Heimdall (Proof of Stake layer)
3. Bor (Layer tạo block)

![](https://images.viblo.asia/5913389e-6d00-4660-ab81-9e13f176596d.png)

### Matic smart contract trên Ethereum

Matic triển khai các smart contract trên Ethereum với nhiệm vụ sau
- Quản tài sản được đưa vào Proof of Stake layer.
- Quản lý ủy quyền.
- Các hợp đồng Plasma nhằm kiểm tra/lưu giữ trạng thái của **sidechain**.

### Bor (Block Producer Layer)

**Bor** là lớp chịu trách nhiệm đóng block trên chuỗi **Matic sidechain**.

Các nút **Bor** và máy ảo **sidechain** hoàn toàn tương thích với máy ảo Ethereum (EVM).


### Heimdall (Proof-of-Stake validator layer)

Heimdall là nút xác thực PoS hoạt động đồng thời với các hợp đồng Staking trên Ethereum để kích hoạt cơ chế **PoS** trên **Matic**. **Heimdall** được xây dựng dựa trên nền **Tendermint** với một số thay đổi về cấu trúc chữ ký và cấu trúc dữ liệu. Nhiệm vụ chính của **Heimdall**  là xác thực các block, chỉ định người đóng block dựa theo thuật toán **Proof-of-Stake**.

**Heimdall** còn tính toán cây **Merkle** từ tập hợp các block do **Bor** tạo và đưa **Merkle Root** theo định kỳ lên chuỗi chính. Các **Merkle Root** được đưa lên chuỗi chính như này được gọi là **checkpoints**. Đối với các block trên **Bor**, **Heimdall** sẽ thực hiện:
1. Xác thực tất cả các khối kể từ **checkpoints** cuối cùng
2. Tính toán cây merkle của từ các giá trị băm của các block đó.
3. Đưa merkle root vào chuỗi chính.


## 3. Demo

Chúng ta cùng thử cách deploy lên testnet của **Matic**. Dựa trên code của repo [React Truffle Box](https://github.com/truffle-box/react-box)


1. Tạo network mới để kết nối đến testnet Mumbai của Matic.

![](https://images.viblo.asia/4e7318ba-7110-40de-a64a-428819b1f487.png)

2. Tạo network matic trong `truffle-config.js`

```js
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: '0.6.6'
    }
  }
};
```

3. Faucet Matic token để có thể trả phí deploy tại https://faucet.matic.network/

4. Dùng truffle để deploy smart contract lên Matic

```bash
yarn truffle migrate --network matic
```




## Tài liệu tham khảo

https://docs.plasma.group/en/latest/src/plasma/sidechains.html

https://docs.matic.network/docs