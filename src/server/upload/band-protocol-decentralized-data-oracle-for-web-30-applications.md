![](https://images.viblo.asia/4f2dd93a-9cf9-4b91-8faf-90e03e739f69.png)

# I. Band Protocol là gì? 
Các ứng dụng blockchain sử dụng smart contracts được ứng dụng trong các lĩnh vực thực tế đang ngày càng trở lên phổ biến, đi kèm với đó là nhu cầu về dữ liệu được đưa lên smart contract cũng tăng lên. Tuy nhiên các dữ liệu hiện tại lại chưa hoàn toàn đảm bảo được sự phân tán cũng như vấn đề về an ninh dữ liệu. Chính vì vậy Band Protocol được xây dựng hướng tới trở thành một oracle phi tập trung cho các dApps trên nhiều mạng blockchain bằng cách đảm bảo bảo mật tối đa, tốc độ và chi phí thấp.
# II. Tại sao cần sử dụng Band Protocol?

### 1. Vấn đề các hệ thống hiện tại
Mặc dù việc xây dựng oracle data để đưa dữ liệu lên smart contract không phải là một vấn đề mới, tuy nhiên các ứng dụng hiện tại lại chưa giải quyết được một số vấn đề còn tồn đọng như: 
* Kiến trúc chưa hoàn toàn phi tập trung.
* Việc phát triển và ứng dụng còn khó khăn.
* Chưa có chính sách tài chính để khuyến khích nhà cung cấp dữ liệu.

### 2. Tại sao cần sử dụng Band protocol
![](https://images.viblo.asia/c56d6d24-b9cc-4fe6-a4f2-b0ed9cf54534.png)

Phần lớn các nền tảng hợp đồng thông minh hiện tại thiếu khả năng truy cập vào các dữ liệu thực tế, khiến khả năng của smart contract bị hạn chế đi rất nhiều. 

Band Protocol được phát triển để hướng tới mục tiêu xây dựng cơ sở hạ tầng oracle hỗ trợ đa nền tảng blockchain đồng thời mở rộng khả năng ứng dụng của smart contract. Dự án giúp kết nối các public blockchain với các thông tin offchain, với các tiêu chí thiết kế sau: 
- **Tốc độ và khả năng mở rộng**: Hệ thống phải có khả năng phục vụ một lượng lớn yêu cầu dữ liệu cho nhiều chuỗi khối công khai với độ trễ tối thiểu.
- **Khả năng tương thích crosschain:** Hệ thống có thể phục vụ dữ liệu cho tất cả các public blockchain đang có sẵn.
- **Cung cấp dữ liệu linh hoạt**: Hỗ trợ nhiều cách khác nhau để lấy và tổng hợp dữ liệu.

# III. Decentralized data delivery network (D3N)
D3N là một blockchain của Band protocol, với native token là Band. Được xây dựng trên Tendermint và Cosmos SDK, D3N sử dụng thuật toán đồng thuận BFT để nhận được xác nhận ngay lập tức khi đủ số lượng block validators. Bên cạnh việc kí blocks, các validators còn đóng vai trò trả lời các request data được gửi lên hệ thống.

## Một số khái niện 
Để tìm hiểu kĩ hơn về D3N, chúng ta phải hiểu 1 số khái niệm sau đây:

### Data Sources
**Data Sources**: đơn vị cơ bản của 1 hệ thống oracle, mô tả quy trình lấy dữ liệu thô từ nguồn và chi phí liên quan trong 1 câu truy vấn. Trong D3N, data source được đăng ký lên hệ thống có 2 loại:
*  Owned data source: có thể thay đổi , nâng cấp và thu phí bởi người sở hữu.
* Unowned data source: bất biến và không đổi.

> Lưu ý: Mặc dù unowned là không đổi tuy nhiên dữ liệu vẫn có thể bị chi phối bởi 1 bên tập trung nếu nguồn cung cấp dữ liệu là tập trung.

```
#!/bin/sh

# Cryptocurrency price endpoint: https://www.coingecko.com/api/documentations/v3
URL="https://api.coingecko.com/api/v3/simple/price?ids=$1&vs_currencies=usd"
KEY=".$1.usd"

# Performs data fetching and parses the result
curl -s -X GET $URL -H "accept: application/json" | jq -r ".[\"$1\"].usd"
```
Ví dụ về data source lấy giá coin từ coingecko.

### Oracle Scripts
**Oracle script** : là chương trình mã hóa dữ liệu thô để gửi đến data source cần thiết và mô tả cách tổng hợp dữ liệu đầu ra
```
# 1st Phase. Emits raw data requests that the oracle script needs.
def prepare(symbol):
    request(get_px_from_coin_gecko, symbol)
    request(get_px_from_crypto_compare, symbol)
    request(get_px_from_coin_market_cap, symbol)

# 2nd Phase. Aggregates raw data reports into the final result.
def aggregate(symbol, number_of_reporters):
    data_report_count = 0
    price_sum = 0.0
    for reporter_index in range(number_of_reporters):
        for data_source in (
            get_px_from_coin_gecko,
            get_px_from_crypto_compare,
            get_px_from_coin_market_cap,
        ):
            price_sum = receive(reporter_index, data_source, symbol)
            data_report_count += 1
    return price_sum / data_report_count
    
   ```
   Ví dụ minh họa 1 oracle script lấy dữ liệu giá coin từ nhiều nguồn khác nhau:  CoinGecko, CryptoCompare, và CoinMarketCap.
   
###    Data Requests
Data request là một giao dịch từ người dùng để thực hiện truy vấn dữ liệu dựa trên oracle script. Một giao dịch yêu cầu dữ liệu chỉ định oracle script để thực thi, các tham số cho script và các tham số bảo mật khác.
### Raw Data Reports
Raw data report là kết quả từ việc giải quyết các raw data request bằng  D3N block validators. Các raw data report  được gửi đến D3N. Khi đủ số lượng report được thu thập, chúng sẽ được sử dụng trong giai đoạn thứ hai của oracle script để tính kết quả cuối cùng của raw data request.
### Oracle Data Proof
Khi tổng hợp hoàn tất, kết quả cuối cùng của yêu cầu dữ liệu được lưu trữ vĩnh viễn ở global state của D3N. Giống như hầu hết các blockchains khác, toàn bộ state của D3N có thể được biểu diễn dưới dạng  Merkle root hash. Oracle Data Proof là bằng chứng merkle cho thấy sự tồn tại của kết quả cuối cùng của yêu cầu dữ liệu với các thông tin khác liên quan đến nó, bao gồm oracle script hash, tham số, thời gian thực hiện, v.v.

## Data Request Lifecycle
![](https://images.viblo.asia/01fd46ce-ce7d-4a5f-9729-cc794b3ece51.jpg)
1. Người dùng gửi yêu cầu dữ liệu tới mạng bằng cách broadcasting  MsgRequestData. Message bao gồm oracle script nó muốn gọi và các tham số bổ sung khác.


2. Khi giao dịch được xác nhận, hàm prepare của oracle script sẽ được chạy theo cách thức phi tập trung. Hàm này sẽ phát ra tập các raw data request cần thiết để tiếp tục thực thi oracle script.


3. Block validator D3N kiểm tra các data request và thực hiện các data source tương ứng

4. Block validator gửi data report đến mạng bằng cách broadcasting MsgReportData. Các data report được lưu trữ tạm thời trên blockchain.

5. Khi đủ block validator gửi dữ liệu ( như trong chỉ định của data request's security parametes). D3N tiếp tục thực thi oracle script để tổng hợp dữ liệu trả về kết quả cuối cùng, và được lưu vào blockchain vĩnh viễn. 
6. Kết quả cuối cùng sẽ có sẵn trên state tree của blockchain. Dữ liệu có thể được gửi đến các chuỗi khối khác thông qua giao tiếp giữa các blockchain của D3N.
# IV. Ứng dụng
![](https://images.viblo.asia/4bc746d8-4c21-4cd5-a716-ed1c2dfb5d34.png)
Band Protocol cho phép người sử dụng lấy dữ liệu thông qua web api và sử dụng chúng trên blockchain. Lập trình viên có thể truy xuất dữ liệu thông qua Bandchain - một cosmos-based blockchain thích hợp cho oracle request và thanh toán, ngoài ra còn có thể sử dụng dApp thông qua interchain communication.
Việc tích hợp oracle data được thực hiện qua 3 bước cơ bản sau:
* Chọn oracle script
* Yêu cầu dữ liệu từ Bandchain
* Sử dụng dữ liệu trên smart contract

Các blockchain đang được hỗ trợ bởi Band protocol
![](https://images.viblo.asia/60f21797-3595-4ab5-bef5-ef6c0860829c.png)
( https://docs.bandchain.org/dapp-developers/getting-started)

## B1: Chọn Oracle script
BandChain hỗ trợ sẵn các script sau:

* 📈[Crypto Price & Volume](https://docs.bandchain.org/built-in-oracle-scripts/crypto-price)
* 💹[Stock Price](https://docs.bandchain.org/built-in-oracle-scripts/alphavantage-price)
* ♻️ [Random Number Generator](https://docs.bandchain.org/built-in-oracle-scripts/random-number-generator)
* 🛫[Flight Status](https://docs.bandchain.org/built-in-oracle-scripts/flight-status) 
* 🌦[Weather Info](https://docs.bandchain.org/built-in-oracle-scripts/weather-info)
* ⛽️[Ethereum Gas Cost](https://docs.bandchain.org/built-in-oracle-scripts/ethereum-gas-cost)
* 📦[Bitcoin Block Hash](https://docs.bandchain.org/built-in-oracle-scripts/bitcoin-block-hash)

## B2: Request BandChain Data
Có 2 cách để yêu cầu dữ liệu từ D3N blockchain:
* Thông qua Explorer
* Thông qua Rest API

### Request data thông qua Explorer
![](https://images.viblo.asia/6e6ee1ac-6a72-446e-9101-104b51623d22.png)

Vào trang http://scan.alpha.bandchain.org/ và ấn Oracle Script ở góc phải màn hình. 

**Chọn Oracle Script**
![](https://images.viblo.asia/ac4032f0-336d-41f4-b1de-ff1a1884dc64.png)
Có rất nhiều oracle cho chúng ta lựa chọn. Ở đây chúng ta sẽ khám phá oracle binance_price

**Gửi request** 
![](https://images.viblo.asia/9bb3ba60-2961-4e9b-b137-086d28a7c947.png)

Chọn tab execute, chọn loại token cần lấy giá và ấn send request. Kết quả trả về là một transaction.

![](https://images.viblo.asia/f7843184-1c25-475f-86e6-54322545e8be.png)
**Nhận kết quả**
![](https://images.viblo.asia/d830bc7b-7e15-4948-a183-6c86faa8e7df.png)

Bên trong là các dữ liệu của transaction như transactionID, block, tham số, dữ liệu thời gian trả về. Để sử dụng kết quả trên trong smart contract. Chúng ta sử dụng tab Proof of Validity và copy kết quả trong đó. 

### Request data thông qua API
Trong dApp thì chúng ta không thể sử dụng explorer được. Chính vì vậy Band protocol cung cấp Rest API để giúp việc lấy dữ liệu trở nên thuận tiện và đơn giản hơn. Phương thức được sử dụng là POST, body của request gửi dưới dạng json
```
http://rpc.alpha.bandchain.org/bandsv/request
```
![](https://images.viblo.asia/e2e2cadc-16dd-4696-9c8c-435c3534b97d.png)

Response:
![](https://images.viblo.asia/2fe4ea04-1287-4292-9c27-158c0daa2fbd.png)

## B3: Sử dụng data trong smart contract
Sau khi đã có được dữ liệu ta sẽ viết smart contract cho Dapp của mình. Ở ví dụ này chúng ta sẽ viết contract lấy dữ liệu BTC/USD:

```
pragma solidity 0.5.14;
pragma experimental ABIEncoderV2;

import { BandChainLib } from "bandchain-helper-library/contracts/BandChainLib.sol";
import { IBridge } from "bandchain-helper-library/contracts/IBridge.sol";

contract SimplePriceDatabase {
  using BandChainLib for bytes;

  bytes32 public codeHash;
  bytes public params;
  IBridge public bridge;
  
  uint256 public latestPrice;
  uint256 public lastUpdate;

  constructor(
    bytes32 _codeHash , 
    bytes memory _params, 
    IBridge _bridge
  ) public {
    codeHash = _codeHash;
    params = _params;
    bridge = _bridge;
  }

  function update(bytes memory _reportPrice) public {
    IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
    uint64[] memory decodedInfo = result.data.toUint64List();
    
    require(result.codeHash == codeHash, "INVALID_CODEHASH");
    require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
    require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

    latestPrice = uint256(decodedInfo[0]);
    lastUpdate = uint256(decodedInfo[1]);
  }
}
```
Cùng phân tích từng phần của contract trên
```
import { BandChainLib } from "bandchain-helper-library/contracts/BandChainLib.sol";
import { IBridge } from "bandchain-helper-library/contracts/IBridge.sol";
```
Đầu tiên là import [BandChainLib](https://docs.bandchain.org/references/bandchainlib-library) và [IBridge](https://docs.bandchain.org/references/ibridge-interface) từ [bandchain-helper-library](https://www.npmjs.com/package/bandchain-helper-library) package.

**Khai báo các state của contract**
```
bytes32 public codeHash;
bytes public params;
IBridge public bridge;

uint256 public latestPrice;
uint256 public lastUpdate;
```
Các tham số codeHash, params và bridge để xác nhận dữ liệu chính xác được yêu cầu và gửi từ BandChain. 3 tham số này được truyền vào constructor:
> 
> * codeHash is the hash of Oracle Script. 
> Ví dụ scripthash của binance: Script Hash: 0x6b7be61b150aec5eb853afb3b53e41438959554580d31259a1095e51645bcd28
> * params is the[ serialized string of parameters](https://docs.bandchain.org/references/encoding-params) for the Oracle Script request
> * bridge is the[ bridge contract](https://docs.bandchain.org/dapp-developers/getting-started#what-blockchain-does-band-protocol-support) deployed for the blockchain

**Định nghĩa `update function`**
```
function update(bytes memory _reportPrice) public {
  // _reportPrice is a magic bytes we received from BandChain
  ...
}
```
Report price chính là dữ liệu ta nhận được từ bước 2. Tuy nhiên dữ liệu đang được để ở dạng bytes nên ta phải decode dữ liệu được cho trước. Sử dụng hàm `IBridge.relayAndVerify` 
```
IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
uint64[] memory decodedInfo = result.data.toUint64List();
```
Cuối cùng là cập nhật dữ liệu 
```
latestPrice = uint256(decodedInfo[0]);
lastUpdate = uint256(decodedInfo[1]);
```
Oke. Vậy là ta đã có một ví dụ smart contract sử dụng BandChain oracle data.

Hy vọng bài viết này giúp ích cho bạn trong việc phát triển smartcontract và Dapp của mình. Hẹn gặp lại ở những bài viết sau với các nền tảng khác!

# V. Source:
https://docs.bandchain.org/