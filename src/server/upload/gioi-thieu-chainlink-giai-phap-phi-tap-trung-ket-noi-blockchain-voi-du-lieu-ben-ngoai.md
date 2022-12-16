![](https://files.readme.io/7b88b8d-sub-hero-chainlink-diagram.png)

## 1. Oracle là gì ? Điểm hạn chế của oracle tập trung

Oracle là một thuật ngữ có nguồn gốc từ tiếng Hy Lạp chỉ những người có khả năng giao tiếp với các thế lực siêu nhiên, vô hình hay dự đoán tương lai. Đơn giản hơn thì chúng ta gọi là nhà tiên tri vũ trụ :D

Thuật ngữ Oracle trong blockchain chỉ  một hệ thống cung cấp các dữ liệu bên ngoài (external data) cho smart contract trong mạng blockchain. Qua giải thích trên, chúng ta thấy ít nhiều về ý nghĩa thì cũng có liên quan đến nghĩa gốc.

Hiện tại, đã có nhiều dịch vụ, hệ thống Oracle được giới thiệu như [Provable](https://provable.xyz/),  [Augur](https://www.augur.net/), [Ramp](https://www.ramp.network/), v.v. Về căn bản, các loại Oracle được chia làm 2 loại:
- Oracle tập trung (Centrailized Oracle)
- Oracle phi tập trung (Decentralized Oracle)

### Hạn chế của oracle tập trung

Oracle tập trung tồn tại 1 điểm lỗi duy nhất (Single Point of Failure), dữ liệu đưa vào smart contract hoàn toàn có thể bị thay đổi, giả mạo  làm mất đi tính tin cậy, phi tập chung của mạng blockchain.

## 2. ChainLink là gì ?

Chainlink đơn giản là một mạng oracle phi tập trung,  đảm bảo sự tin cậy, toàn vẹn cho nguồn dữ liệu bên ngoài đưa vào blockchain qua các cơ chế đồng thuận. Mạng ChainLink bao gồm nhiều node (oracle), điều này tránh được việc 1 điểm lỗi duy nhất mà các oracle tập trung gặp phải.

## 3. Kiến trúc của ChainLink

![](https://images.viblo.asia/a2e79af3-1d40-499d-bab4-b27ca19743a3.png)

Phần này chúng ta sẽ tìm hiểu kiến trúc Chainlink với mạng Ethereum

Kiến trúc Chainlink gồm 2 phần chính:
- Phần thuộc blockchain (on-chain): User smart contract (User-SC), chainlink smartcontract (Chainlink-SC hay Oracle Contract).
- Phần bên ngoài mạng blockchain (off-chain):  Chainlink Node (Oracle) và External API.

**User-SC**: Smart contract thông thường được viết bằng Solidity hay Vyper, chứa logic của ứng dụng.

**Oracle contract**: Smart contract trên Ethereum, được cung cấp bởi Oracle node. Oracle contract có nhiệm vụ nhận request từ user contract và chuyển đến các oracle node để xử lý tiếp.

**Chainlink Node**: Là các node trong mạng Chainlink, mỗi node sẽ có một phần core chứa logic hoạt động và phần adapter giúp lấy dữ liệu từ các API bên ngoài (get, post, ...)

**External API**:  Là các trang web, dịch vụ lưu trữ dữ liệu bên ngoài.

## 4. Luồng dữ liệu

### Truy vấn dữ liệu

1. User contract sẽ gửi một transaction tới Oracle contract (transaction sẽ bao gồm 1 lượng LINK token và dữ liệu yêu cầu truy vấn).
2. Oracle smart contract sau khi nhận đủ lượng LINK token từ user contract (thông thường là 1 LINK/request) sẽ chuyển tiếp truy vấn đến các oracle node trong mạng Chainlink.


![](https://files.readme.io/5e38fb9-Screenshot_from_2019-03-06_13-50-31.png)



### Trả về dữ liệu

1. Khi oracle node đã lấy được dữ liệu từ API thông qua adapter, oracle node sẽ trả về kết quả cho oracle contract.
2. Oracle contract trả kết quả lại cho user contract cùng với đó là trả 1 lượng LINK token cho oracle node xem như phần thưởng.

![](https://files.readme.io/058c547-Screenshot_from_2019-03-06_13-50-43.png)

## 5. Chainlink network

Chainlink là một mạng phi tập trung (decentrailized) với nhiều oracle node. Để đảm bảo dữ liệu cung cấp từ API không bị giả mạo hay thao túng, cần có một cơ chế oracle contract chọn ra giá trị thích hợp để trả về cho user contract từ giá trị trả về của các oracle node khác nhau (vốn lấy dữ liệu từ nhiều nguồn khác nhau).

Ngoài ra, có một vấn đề cũng cần được xử lý là `freeloading`. Freeloading ám chỉ việc các oracle nodes sao chép kết quả của các oracle nodes khác mà không cần tốn công sức truy vấn API bên ngoài.

Để giải quyết các vấn đề trên, Chainlink đề xuất ra 2 giải pháp là `In-contract aggregation` và `Medium-term strategy`.

![](https://images.viblo.asia/4f160faa-d98c-4307-8fca-3fe5bb849a0c.png)


![](https://images.viblo.asia/ec302cf2-8496-4d74-a52d-4a060f3f838b.png)

*Tỷ giá ETH/USD được lấy ra từ ít nhất 14 oracle node với các giá trị khác nhau*

### Giải pháp on-chain:  In-contract aggregation

Ý tưởng của giải pháp này là các oracle nodes sẽ không trả ngay kết quả về cho oracle contract mà mã hóa kết quả gửi cho oracle contract rồi sau đó mới gửi bản rõ của kết quả truy vấn sau. Điều này sẽ giải quyết tương đối triệt để vấn đề freeloading. Oracle contract sẽ là nơi đưa ra kết quả cuối cùng để trả về cho user contract.

*Ưu điểm*:  Đơn giản, linh hoạt (flexible) và tin cậy (do logic được thực hiện trên mạng blockchain).

*Nhược điểm*: Cần thực hiện nhiều giao dịch => tốn phí giao dịch.


### Giải pháp off-chain: Medium-term strategy

Giải pháp off-chain nhằm khắc phục điểm yếu của giải pháp on-chain, nhằm mục đích tiết kiệm phí giao dịch (chỉ cần 1 giao dịch). Việc tổng hợp, thống nhất kết quả trả về sẽ được thực hiện với các oracle nodes trên mạng Chainlink.  Ý tưởng ở phương pháp này là mỗi oracle nodes có 1 mảnh chữ ký (thuật toán Schnorr) cùng ký để chọn ra giá trị trả về cho oracle contract.

*Ưu điểm*:  Chỉ cần một giao dịch, tiết kiệm được phí giao dịch. 

*Nhược điểm*: Chưa thể giải quyết hoàn toàn vấn đề freeloading.


![](https://images.viblo.asia/c8363a81-adc7-4a96-af87-6e0834897875.png)


Để hiểu chi tiết hơn về các giải pháp trên, các bạn có thể tim đọc [White paper](https://link.smartcontract.com/whitepaper) của Chainlink.



## 6. Viết smart contract

Ở phần này, chúng ta sẽ cùng thử tìm hiểu cách viết smart contract bằng Solidity sử dụng Chainlink để lấy tỷ giá ETH/USD.

Dưới đây là mã nguồn của smart contract

```js
pragma solidity >=0.5.0 <0.6.0;

import "https://github.com/smartcontractkit/chainlink/blob/develop/evm/v0.5/contracts/ChainlinkClient.sol";

contract Evi is ChainlinkClient {
  address private constant ORACLE_PRICE = 0xc99B3D447826532722E41bc36e644ba3479E4365;
  bytes32 private constant JOB_ID_PRICE = "3cff0a3524694ff8834bda9cf9c779a1";


  constructor() public {
      setPublicChainlinkToken();
  }
  
  uint256 public payment = 1 * LINK;
  uint256 public etherPrice;

 
  function queryPrice() public {
    Chainlink.Request memory req = buildChainlinkRequest(JOB_ID_PRICE, address(this), this.fulfillPrice.selector);
    req.add("get", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    req.add("path", "USD");
  	req.addInt("times", 100);
    sendChainlinkRequestTo(ORACLE_PRICE, req, payment);
  }

  function fulfillPrice(bytes32 _requestId, uint256 _etherPrice) public recordChainlinkFulfillment(_requestId) {
    etherPrice = _etherPrice;
  }

}
```

Chúng ta sẽ giải thích ý nghĩa đoạn mã từng chút một

- 2 dòng đầu để khai báo phiên bản soliity và import thư viện ChainlinkClient.
- Contract của chúng ta tên là Evi và thừa kế từ contract ChainlinkClient  (để có thể sử dụng chainlink).
- 2 biến `ORACLE_PRICE` và `JOB_ID_PRICE` lần lượt là địa chỉ của oracle contract để gửi request tới và JOB_ID.
- constructor dùng hàm `setPublicChainlinkToken()` của Chainlink để lấy để chỉ phát hành token LINK trên mạng mà chúng ta deploy contract (ở phần này chúng ta dùng testnet Ropsten).
- Biến `etherPrice` sẽ lưu tỷ giá ETH/USD khi được oracle contract trả về.
- Biến `payment = 1 * LỊNK` có nghĩa là 1 Token LINK (lượng token trả cho oracle contract mỗi lần request dữ liệu).
- Hàm `queryPrice` có nhiệm vụ tạo 1 request đến Oracle contract (có chỉ định ủrl API, trường dữ liệu)
- Hàm `fullfullPrice` nhận kết quả trả về từ oracle contract, hàm có sử dụng modifier  `recordChainlinkFulfillment` để đảm bảo kết quả trả về hợp lệ. Kết quả trả về cũng được lưu vào biến `etherPrice`.

### Demo trên Remix

Chúng ta thực hiện sao chép phần mã nguồn phía trên vào IDE Remix để tiến hành demo.

![](https://images.viblo.asia/4cf80b1b-41a5-4dfe-b59b-683c761fdf2d.png)

**Bước 1**: Biên dịch và deploy contract lên mạng Ropsten (ở đây tôi dùng trình biên dịch 0.5.12)

**Bước 2**: Sau khi deploy xong, chúng ta sẽ gửi LINK token vào contract (để làm phí gửi cho oracle contract sau này). nếu tài khoản chưa có LINK token, chúng ta có thể faucet tại [https://ropsten.chain.link/](https://ropsten.chain.link/)

![](https://images.viblo.asia/d12b0d1c-a220-4b06-8f92-55140774421b.png)

**Bước 3**: Gọi hàm `queryPrice` trên Remix để lấy tỷ giá ETH/USD

![](https://images.viblo.asia/7682b527-1f16-4562-bf7c-0aa288d01c98.png)

**Bước 4**: Sau khi giao dịch thành công, chúng ta lấy giá trị biến `etherPrice`. Giá trị trả về đã được nhân với 100 để số nguyên hóa vì solidity hiện chưa hỗ trợ kiểu số phẩy động. Phần cài đặt nhân 100 với giá trị trả về từ API được thực hiện ở câu lệnh dưới đây.

```js 
req.addInt("times", 100);
```

![](https://images.viblo.asia/8264894f-3261-4784-be0b-f154f3ca11fb.png)


Cuối cùng ta nhận được tỷ giá ETH/USD tại thời điểm bài viết là 1 ETH = 151.26 USD

## Tài liệu tham khảo

- https://link.smartcontract.com/whitepaper
- https://docs.chain.link/docs/architecture-overview
- https://medium.com/@jonnyhuxtable/analysis-of-chainlink-the-decentralised-oracle-network-7c69bee2345f
- https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841
- https://medium.com/chainlink/chainlink-white-paper-section-4-chainlink-decentralization-approach-beaae3c2d8bb