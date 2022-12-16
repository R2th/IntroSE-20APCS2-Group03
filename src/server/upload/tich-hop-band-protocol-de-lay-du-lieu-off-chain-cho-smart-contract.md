Khoan nói về Band Protocol là gì, mình sẽ đi thẳng vào công dụng của nó, có thể đây chính là mảnh ghép mà bạn vẫn luôn tìm kiếm cho Dapp của mình. Band protocol hỗ trợ các contract giao tiếp với dữ liệu từ thế giới bên ngoài như các dữ liệu về thời tiết, thể thao, giá trị cổ phiếu, tỉ giá các đồng ngoại tệ và tất nhiên không thể thiếu tỉ giá của các crypto currencies.
Và có thể coi Band Protocol thuộc hệ Oracle tương tự như Chainlink.
![](https://images.viblo.asia/ee2dc46a-3ff9-42dc-b56d-5add2b50a304.png)

# Giới thiệu
Trong bài viết lần này, mình sẽ hướng dẫn chủ yếu về phần lấy các giá trị của các cryptocurrencies và tỉ giá ngoại tệ và cách tích hợp chúng vào những ứng dụng của các bạn.

Mình sẽ hướng dẫn các bạn tích hợp dữ liệu oracle của Band vào Smart Contract thông qua contract **StdReference** và Frontend thông qua thư viện **bandchain.js**

# Tích hợp trên Smart Contract

### Lý thuyết
Để lấy dữ liệu về giá từ **Oracle của band** thông qua smart contract, chúng ta có thể sử dụng **StdReference** contract. Contract này có 2 function hỗ trợ việc lấy dữ liệu là **getReferenceData** và **getReferenceDataBulk**

Function **getReferenceData** sẽ nhận 2 giá trị đầu vào là **base** và **quote**. Nó sẽ query lên **StdReference** contract với 2 tham số đầu vào và trả về giá trị giữa 2 cặp này dưới dạng dữ liệu struct **ReferenceData**. Dữ liệu này có dạng như sau:

```js
struct ReferenceData {
    uint256 rate; // Giá trị tỉ lệ base/quote, đã được nhân với 1e18.
    uint256 lastUpdatedBase; // Mốc thời gian gần nhất giá trị của base được update theo UNIX time.
    uint256 lastUpdatedQuote; // Mốc thời gian gần nhất giá trị của quote được update theo UNIX time.
}
```

Cũng tương tự như **getReferenceData**, hàm **getReferenceDataBulk** sẽ lấy dữ liệu một bulk luôn thay vì 1 cặp, nó sẽ nhận đầu vào là một mảng các base và một mảng quote tương ứng. Ví dụ như đầu vào 2 mảng ['ETH', 'BTC', 'BNB'] và ['USD', 'KNC', 'DAI'] thì đầu ra sẽ là mảng giá trị ReferenceData tương tự các cặp :

- ETH/USD
- BTC/KNC
- BNB/DAI

### Thực hành

Để thực hành sử dụng smart contract **StdReference**, Band Protocol đã hỗ trợ deploy một contract trên **testnet Kovan**,  các bạn có thể  test trực tiếp trên Remix: https://remix.ethereum.org/

Địa chỉ của StdReference trên **Kovan**:       **0xDA7a001b254CD22e46d3eAB04d937489c93174C3**

```js
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract DemoOracle {
    IStdReference ref;
    
    uint256 public price;
    
    constructor(IStdReference _ref) public {
        ref = _ref;
    }
    
    function getPrice(string _base, string _quote) external view returns (uint256){
        IStdReference.ReferenceData memory data = ref.getReferenceData(_base, _quote);
        return data.rate;
    }
}
```

Tiếp theo các bạn deploy contract **DemoOracle** với đối số đầu vào của constructor là địa chỉ của **stdReference** trên Kovan : **0xDA7a001b254CD22e46d3eAB04d937489c93174C3**

Từ đó có thể test được hàm **getPrice** với 2 đối số đầu vào là cặp crypto.
# Tích hợp trên Webapp

### Lý thuyết

Cũng tương tự như tích hợp cho smart contract, để tích hợp trên Webapp chúng ta sẽ sử dụng package **bandchain.js**. Tuy nhiên package này hiện đang chỉ hỗ trợ lấy giá theo bulk, tức là đầu vào sẽ nhận là 2 mảng là các cặp các bạn muốn lấy rate tương ứng.

Về cơ bản thì package bandchain.js cũng không khác gì việc bạn sử dụng các API cung cấp giá của **binance** hoặc **coinbase** tuy nhiên với những ứng dụng Dapp đã được tích hợp band trong smart contract thì cũng nên recommend sử dụng bandchain.js cho phần giao diện

### Thực hành

Đầu tiên tạo một file node js: 

**index.js**:



```js
const BandChain = require('@bandprotocol/bandchain.js');

(async () => {
  const endpoint = 'https://poa-api.bandchain.org';

  const bandchain = new BandChain(endpoint);
  const price = await bandchain.getReferenceData(['BAND/USD', 'BTC/ETH', 'EUR/USD', 'EUR/BTC']);
  console.log(price);
})();
```

**endpoint** phía trên sẽ trỏ đến một node để query các cặp crypto.

Chạy thử đoạn code phía trên
```bash
node index.js
```

Kết quả trả về sẽ là giá trị của các cặp tương ứng:

![](https://images.viblo.asia/4f0257e6-1c61-4230-822e-83b3807ef720.png)

Như vậy bài viết lần này mình muốn chia sẻ cách mà các bạn có thể tích hợp nhanh chóng band protocol vào những ứng dụng blockchain có liên quan đến giá trị của các crypto currencies. Những bài viết tiếp theo mình sẽ giải thích rõ hơn về các nguyên lý hoạt động của band protocol.