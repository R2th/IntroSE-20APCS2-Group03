Bất cứ ai muốn giao dịch trên nền tảng của Ethereum đều cần ETH để trả phí (gas). Điều này là rào cản lớn với đa số user khi mới tham gia vào mạng Ethereum và sử dụng 1 Dapp do quá trình trao đổi ETH không hề đơn giản. 
Bài viết này sẽ mở ra khái niệm gasless (còn gọi là meta) transactions, giúp người dùng không nhất thiết cần ETH để giao dịch và đồng thời giới thiệu về [Gas Station Network](https://www.opengsn.org/) được sinh ra để giải quyết vấn đề này.

![](https://payspacemagazine.com/wp-content/uploads/2019/01/petrolstation.jpg)

# 1. Meta-transaction là gì?
Mọi giao dịch trên mạng Ethereum đều yêu cầu gas, và người gửi cần có đủ Ether để trả phí gas này. Mặc dù, số Ether phải trả là rất nhỏ (vài nghìn VND ở thời điểm bài viết), nhưng quá trình thực hiện thì lại phức tạp bao gồm: đáp ứng chính sách [KYC & AML](https://en.wikipedia.org/wiki/Know_your_customer) và mua đồng ETH trước khi sử dụng bất cứ Dapp nào, không chỉ tốn thời gian mà còn có nguy cơ lộ thông tin cá nhân trên Internet. Ngoài với những người dùng "hardcore" ra, đây là trở ngại lớn với đa số người có ít kinh nghiệm với tiền kỹ thuật số. <br>
Và **meta-transactions**, một ý tưởng đơn giản ra đời nhằm giải quyết vấn đề: Một tổ chức (được gọi là **relayer**) sẽ thanh toán phí giao dịch thay cho người dùng. Người dùng chỉ cần ký một thông điệp bao chứa thông tin về giao dịch. Sau đó, Relayer sẽ lo các bước còn lại: ký giao dịch (nếu hợp lệ) đi kèm với các thông tin đó, lan truyền lên mạng Ethereum và trả phí gas. Bằng cách này, người dùng không cần thiết phải có ví điện tử (chứa Ether) và không cần thiết phải cung cấp thông tin các nhân.
>  Note: Vậy vấn đề về tính tin cậy của Relayer sẽ được giải quyết thể nào?

# 2. Gas Station Network (GSN)
**GSN** là một mạng phân tán gồm các relayer, cho phép bạn triển khai những Dapp và trả phí giao dịch thay cho người dùng, giảm bớt rào cản với người dùng mới.

> Note: GSN là ý tưởng của [TabooKey](https://medium.com/tabookey/1-800-ethereum-gas-stations-network-for-toll-free-transactions-4bbfc03a0a56), bao gồm nhiều công ty hợp tác cùng nhau nhằm giải quyết khó khăn khi mới bước chân vào mạng Ethereum.

Tuy nhiên, các relayer không hoạt động miễn phí. Chính nhà cung cấp đã triển khai Dapp sẽ phải hoàn lại cho họ phí giao dịch (gas fee) cùng với một khoản nhỏ trả phí dịch vụ.  <br>
Nghe có vẻ kỳ quặc nhưng đây lại là một cách hợp lý để lôi kéo người dùng. Đó chỉ là 1 khoản nhỏ so với sô tiền cho việc quảng cáo, miễn phí dùng thử, giảm giá.... Hoặc nếu không, nhà cung cấp có thể yêu cầu trả phí gas thông qua "off-chain" (ví dụ:thông qua credit card), được tính từ số lần GSN được thực thi.

> Giải quyết câu hỏi phần 1: "Relayer liệu có đáng tin?": Mặc dù relayer có toàn quyền quyết định xử lý request của bạn thế nào, nhưng những hành vi xấu của relayer sẽ bị hạn chế bởi cơ chế đánh giá xử phạt của GSN. Tất cả hoàn toàn tự động, nên bạn không cần lo lắng khi sử dụng dịch vụ của GSN.

# 3. Kiến trúc của Ethereum Gas Station Network (GSN)
## 3.1. Các thành phần trong GSN:
* `Sender`: Một địa chỉ chứa cặp khóa hợp lệ nhưng không có ETH để trả gas.
* `Relay`: một node chứa ETH, có nhiệm vụ thực hiện giao dịch và trả phí gas.
* `Recipient contract`: Là smart contract mà được deploy.
* `RelayHub`: Là một contract kết nối relay và smart contract, điều hướng sender đến relay và phạt các relay có hành vi xấu,.... Ngoài ra, nó được cọc một khoản tiền từ nhà cung cấp của Dapp để hoàn lại cho relay.

## 3.2. Luồng hoạt động

![Luồng hoạt động](https://github.com/ethereum/EIPs/raw/master/assets/eip-1613/sequence.png)

1. Các ứng viên đăng ký làm `Relayer` với `RelayHub`, và cọc 1 khoản tiền (nhằm phạt nếu `relayer` có hành vi xấu).
2. Khi có giao dịch từ người dùng, `RelayHub` sẽ lựa chọn `Relayer` phù hợp.
3. `Sender` tạo và gửi thông điệp bao gồm các thông tin về giao dịch muốn thực hiện cho Relayer
4. Với các thông tin trong lời gọi, `Relayer` xác nhận lại với RelayHub contract xem giao dịch này có được chấp thuận.
5. Với các thông tin trong lời gọi, `RelayHub` xác nhận với `Recipient Contract` xem giao dịch này có được chấp thuận để trả gas thay cho người dùng.
6. `Relayer` tạo ra một giao dịch bao gồm các thông tin mà người dùng đã gửi (vd: chữ ký, nonce). Đặc biệt, msgSender sẽ là người dùng chứ không phải `relayer`. Và `relayer` sẽ lan truyền giao dịch này lên mạng Blockchain, trả phí giao dịch.
7. `Relayer` lan truyền giao dịch lên mạng Ethereum bằng cách gửi raw Transaction đến `RelayHub`.
8. `RelayHub` xác nhận lại xem giao dịch này đã chấp thuận. 
9. `RelayHub` gọi các hàm thực hiện trước lời gọi chính từ `Recipient Contract`.
10. `RelayHub` gọi các hàm người dùng muốn thực hiệm từ `Recipient Contract`.
11. `RelayHub` gọi các hàm thực hiện sau lời gọi chính từ `Recipient Contract`.
12. `RelayHub` hoàn lại phí từ gas cho Relayer và trigger sự kiện `TransactionRelayed`.
13. Raw transaction được trả về cho `Sender`.
14. (Không bắt buộc) Gửi lại raw transaction đến `RelayHub`. Giao dịch này có thể sẽ không thành công do giống giao dịch trước, nhưng điều đó xác nhận rằng giao dịch trước đã được lan truyền.


# 4. Triển khai Dapp với GSN
Phần này sẽ hướng dẫn việc triển khai Dapp với GSN và đẩy lên testnet, ta sẽ cần:
* `create-react-app` package cho việc triển khai Frontend, [OpenZeppelin Network JS ](https://docs.openzeppelin.com/network-js/0.2/) nhằm hỗ trợ web3.
* [@openzeppelin/contracts-ethereum-package](https://github.com/OpenZeppelin/openzeppelin-contracts-ethereum-package): thư viện GSN hỗ trợ smart contract.
* [OpenZeppelin CLI](https://docs.openzeppelin.com/cli/2.8/): quản lý và triển khai contract.

## 4.1. Thiết lập môi trường
Khởi đầu bằng việc tạo npm project và cài đặt các thư viện
```bash
$ mkdir gsn-dapp && cd gsn-dapp
$ npm init -y
$ npm install @openzeppelin/network
$ npm install --save-dev @openzeppelin/contracts-ethereum-package @openzeppelin/upgrades
```
Sử dụng CLI nhằm thiết lập project: 
```bash
$ npx oz init
```
> Note: Nếu chưa rõ về câu lệnh npx, có thể đọc thêm tại [Npm vs Npx whats the difference](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/).

## 4.2. Khởi tạo Contract
Ta sẽ tạo một contract tên `Counter` trong thư mục đã được tạo sẵn `contracts`.
```js
// contracts/Counter.sol
pragma solidity ^0.5.0;

contract Counter {
    uint256 public value;

    function increase() public {
        value += 1;
    }
}
```

Contract này chỉ đơn giản đếm số lượt hàm `increase` được gọi. Hãy chỉnh sửa lại để thêm GSN. Contract này sẽ kế thừa `GSNRecipient` và cần có thêm hàm `acceptRelayedCall` để quyết định xem sẽ có trả phí gas thay cho người dùng không. Tuy nhiên, trong bài viết này, mọi giao dịch sẽ được chấp thuận trả phí thay cho người dùng.

```js
// contracts/Counter.sol
pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";

contract Counter is GSNRecipient {
    uint256 public value;

    function increase() public {
        value += 1;
    }

    function acceptRelayedCall(
        address relay,
        address from,
        bytes calldata encodedFunction,
        uint256 transactionFee,
        uint256 gasPrice,
        uint256 gasLimit,
        uint256 nonce,
        bytes calldata approvalData,
        uint256 maxPossibleCharge
    ) external view returns (uint256, bytes memory) {
        return _approveRelayedCall();
    }

    // We won't do any pre or post processing, so leave _preRelayedCall and _postRelayedCall empty
    function _preRelayedCall(bytes memory context) internal returns (bytes32) {
    }

    function _postRelayedCall(bytes memory context, bool, uint256 actualCharge, bytes32) internal {
    }
}
```

> Trong thực tế, không nên làm vậy vì một số người dùng xấu có thể sẽ hút hết Ether của bạn. Có thể tham khảo [GSN payment strategies](https://docs.openzeppelin.com/contracts/3.x/gsn-strategies) để tìm hiểu các cách tiếp cận khác.

Bước tiếp, ta sẽ triển khai Dapp lên Rinkeby testnet. Bạn sẽ cần config lại file `networks.js`, và cần có 1 tài khoản chứ chút ETH ở mạng Rinkeby. Có thể tham khảo thêm hướng dẫn cách [triển khai contract lên testnet](https://docs.openzeppelin.com/learn/connecting-to-public-test-networks).
```js
rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${projectId}`
        ),
      networkId: 4,
      gasPrice: 5e9,
    },
```

Ta sẽ tạo contract sử dụng OpenZeppelin CLI:
```bash
npx oz create
```
sau đó, lựa chọn theo chỉ dẫn: 
```bash
$ npx oz create
✓ Compiled contracts with solc 0.5.9 (commit.e560f70d)
? Pick a contract to instantiate: Counter
? Pick a network: rinkeby
✓ Added contract Counter
✓ Contract Counter deployed
? Call a function to initialize the instance after creating it?: Yes
? Select which function * initialize()
✓ Setting everything up to create contract instances
✓ Instance created at 0xCfEB869F69431e42cdB54A4F4f105C19C080A601
```

> Note: Bạn cần lưu lại địa chỉ của instance, nó sẽ được sử dụng sau.

> Note: hàm initialize() cần được gọi để khởi tạo contract.


## 4.3. Xây dựng Dapp
Tạo sample:
```bash
npm create-react-app client
```
Ta cần tạo 1 simlink để có thể truy cập file biên dịch của contract `.json`. Từ thư mục `client/src`, chạy:
```bash
$ ln -ns ../../build
```
Thay thế `client/src/App.js` bằng đoạn code sau: 
```js
// client/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3Network, useEphemeralKey } from '@openzeppelin/network/react';

const PROVIDER_URL =
  `https://rinkeby.infura.io/v3/${process.env.REACT_APP_PROJECT_ID}`;

function App() {
  // get GSN web3
  const context = useWeb3Network(PROVIDER_URL, {
    gsn: { signKey: useEphemeralKey() },
  });

  const { accounts, lib } = context;

  // load Counter json artifact
  const counterJSON = require('./build/contracts/Counter.json');

  // load Counter Instance
  const [counterInstance, setCounterInstance] = useState(undefined);

  if (!counterInstance && context && context.networkId) {
    console.log(context.networkId);
    const deployedNetwork = counterJSON.networks[context.networkId.toString()];
    const instance = new context.lib.eth.Contract(
      counterJSON.abi,
      deployedNetwork.address
    );
    setCounterInstance(instance);
  }

  const [count, setCount] = useState(0);

  const getCount = useCallback(async () => {
    if (counterInstance) {
      // Get the value from the contract to prove it worked.
      const response = await counterInstance.methods.value().call();
      // Update state with the result.
      setCount(response);
    }
  }, [counterInstance]);

  useEffect(() => {
    getCount();
  }, [counterInstance, getCount]);

  const increase = async () => {
    await counterInstance.methods.increase().send({ from: accounts[0] });
    getCount();
  };

  return (
    <div>
      <h3> Counter counterInstance </h3>
      {lib && !counterInstance && (
        <React.Fragment>
          <div>Contract Instance or network not loaded.</div>
        </React.Fragment>
      )}
      {lib && counterInstance && (
        <React.Fragment>
          <div>
            <div>Counter Value:</div>
            <div>{count}</div>
          </div>
          <div>Counter Actions</div>
          <button onClick={() => increase()} size="small">
            Increase Counter by 1
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
```

> Note: Ở đây sử dụng dịch vụ của [Infura](https://infura.io/) để truy cập vào mạng Rinkeby. Bạn có thể lựa chọn dịch vụ khác hoặc nếu cũng dùng Infura, cần thay REACT_APP_PROJECT_ID của riêng bạn.

Đoạn code này sử dụng [OpenZeppelin Network JS](https://docs.openzeppelin.com/network-js/0.2/) để kết nối với một node của mạng Ethereum.
Ta có thể bắt đầu sử dụng Dapp. Từ client, chạy `npm start`.

Bạn có thể sử dụng Dapp rồi quay lại đây đọc tiếp. Bạn sẽ phát hiện ra, biến đếm không hề tăng. Đó là bởi `Counter` contract chưa được "cấp vốn". Bạn có thể sử dụng [GSN-online tool](https://www.opengsn.org/recipients), pasting địa chỉ instace đã lưu ở trên vào đây. Ngoài ra, cần có ví Metamask và Ether ở mạng Rinkeby nhằm đặt cọc cho contract này ở Relayer.

![](https://docs.openzeppelin.com/learn/_images/GSNDappTool.png)

Đến lúc này, bạn đã có thể giao dịch từ browser mà không cần đến ví Metamask.


# Tổng kết
Vậy là bài viết này đã giới thiệu về khái niệm Meta-transaction và Gas Station Network để giải quyết những khó khăn của người mới với mạng Ethereum. Tiếp đó, một Dapp đơn giản sử dụng thư viện của  [Openzeppelin](https://docs.openzeppelin.com) để làm rõ các bước của quá trình triển khai với Gas Station Network.
Cảm ơn bạn đọc đã theo dõi đến cuối bài viết. Toàn bộ source-code có thể tìm thấy treen [Github](https://github.com/hungld-2201/Meta-Transaction-Ether).

# Tài liệu tham khảo
* [openzeppelin.com](https://docs.openzeppelin.com/learn/sending-gasless-transactions).
* [GSN](https://www.opengsn.org/)
* [KYC & AML](https://en.wikipedia.org/wiki/Know_your_customer).
* [EIP-1613](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1613.md).
* [Npm vs Npx whats the difference](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/).