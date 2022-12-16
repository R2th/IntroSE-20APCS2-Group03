![](https://images.viblo.asia/a1a7aeeb-067c-4661-9401-9e0e858e242e.png)

Hẳn những lập trình viên Dapp lâu năm lẫn cả những bạn beginer sẽ không quá xa lạ với thư viện web3.js dùng để tương tác với Ethereum blockchain. Còn với ethers.js thì hẳn chưa có quá nhiều người biết (mình cũng mới được biết và sử dụng trong thời gian gần đây). Sau một thời gian sử dụng và làm việc với ethers.js, mình thấy nó có 1 ưu điểm muốn chia sẻ với mọi người qua bài viết ngày hôm nay.

## 1. Giới thiệu

Nói một cách đơn giản, **ethers.js** là một thư viện được viết bằng Javascript giúp Dapp tương tác với mạng Ethereum Blockchain.

### Các tính năng nổi bật ethers.js gồm có

- Giữ private key ở client một cách an toàn
- Import và export **JSON wallets**
- Import và export ví theo chuẩn [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- Hỗ trợ ABI, ABIv2 và Human-Readable ABI
- Kết nối với Ethereum nodes thông qua nhiều provider như JSON-RPC, INFURA, Etherscan, Alchemy, Cloudflare, MetaMask ...
- Hỗ trợ **ENS**
- Nhẹ (88kb khi nén và 284kb khi không nén)
- Hỗ trợ **TypeScript**

### Cài đặt và import

```bash
npm install --save ethers
```

```js
// Node.js
const { ethers } = require("ethers");
```

```js
// ES6 hoặc TypeScript
import { ethers } from "ethers";
```

```js
// ES6 trên trình duyệt
<script type="module">
    import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js";
    // Your code here...
</script>
```

## 2. Sử dụng 

### Kết nối

```js
// Với Metamask
const provider = new ethers.providers.Web3Provider(window.ethereum)
```

```js
// Kết nối qua JSON-RPC, mặc định là http://localhost:8545
const provider = new ethers.providers.JsonRpcProvider('URL RPC');
```

### Query

```js
// Truy vấn block number hiện tại
provider.getBlockNumber()
// { Promise: 11792922 }

// Truy vấn số dư ETH
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

ethers.utils.formatEther(balance)
// '2.337132817842795605'

// If a user enters a string in an input field, you may need
// to convert it from ether (as a string) to wei (as a BigNumber)
ethers.utils.parseEther("1.0")
// { BigNumber: "1000000000000000000" }
```

### Thao tác ghi dữ liệu vào blockchain

Để thực hiện các giao dịch làm thay đổi trạng thái của blockchain, giao dịch gửi đi phải được ký bằng private của 1 account. Cơ bản chúng ta sẽ có 2 cách là lấy tài khoản mặc định từ provider và import account vào bằng private key

#### Cách 1: 

![](https://images.viblo.asia/8975f69c-b8ea-43dd-801c-d02b5a02b327.png)

Mình chạy `ganache-cli` lên ở cổng 8545, `ganache-cli` sẽ tạo cho chúng ta 10 tài khoản.

```js
const { ethers, Wallet } = require('ethers');

async function main() {
  try {
    let provider = new ethers.providers.JsonRpcProvider();

    let signer = provider.getSigner();
    console.log(await signer.getAddress());
    
    // Gửi 1 ETH
      const tx = await signer.sendTransaction({
      to: '0x999E01f04Bb155AbdFc4B2200D762800a758c469',
      value: ethers.utils.parseEther('1.0')
    });

    console.log(parseInt(await signer.getBalance()));
  } catch (err) {
    console.log(err);
  }
}

main();
```

Kết qủa in ra sẽ là tài khoản số 0 và balance của signer cũng giảm đi 1 `ETH`

```bash
0x58232B661A58112ab6e491918fddE2793D5Dd4Cc
```

### Cách 2: Import tài khoản bên ngoài

```js
const { ethers, Wallet } = require('ethers');

async function main() {
  try {
    let provider = new ethers.providers.JsonRpcProvider();
    let signer = new Wallet('PRIVATE_KEY');
    
    // Cách 1 thì signer đã được connect sẵn với provider, với cách này thì chúng ta cần connect tài khoản với provider để có thể thực thi giao dịch
    let wallet = signer.connect(provider);
  } catch (err) {
    console.log(err);
  }
}

main();
```

Hoặc chúng ta có thể dùng thêm các phương thức khác như tạo random account, load từ mnemonic, ...
- `ethers.Wallet.createRandom( [ options = {} ] )`
- `ethers.Wallet.fromEncryptedJson( json , password [ , progress ] )`
- `ethers.Wallet.fromEncryptedJsonSync( json , password )`
- `ethers.Wallet.fromMnemonic( mnemonic [ , path , [ wordlist ] ] )`

### Thao tác với contract

Để tương tác với bất kỳ contract nào trong Ethereum thì chúng ta đều cần 2 thông tin đó là **địa chỉ contract** và **ABI**

```js
const { ethers, Wallet } = require('ethers');

async function main() {
  try {
    let provider = new ethers.providers.JsonRpcProvider();
    let signer = new Wallet('PRIVATE_KEY');
    let wallet = signer.connect(provider);

    const contract = new ethers.Contract('ADDRESS', 'ABI', provider);
    // Kết nối wallet với contract
    const withSigner = contract.connect(wallet);
  } catch (err) {
    console.log(err);
  }
}

main();
```

1 ưu điểm của việc gọi hàm trong contract bằng `ethers.js` so với `web3.js` là không cần dài dòng thêm `call()` hay `send()` ở cuối.

```js
const daiAddress = "dai.tokens.ethers.eth";

const daiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

daiContract.name()
// { Promise: 'Dai Stablecoin' }

daiContract.symbol()
// { Promise: 'DAI' }

balance = await daiContract.balanceOf("ricmoo.firefly.eth")
// { BigNumber: "198172622063578627973" }

ethers.utils.formatUnits(balance, 18)
// '198.172622063578627973'
```


### Truy vấn lịch sử giao dịch (Query Historic Events)

Một tính năng khá hay ho của `ethers.js` mà mình chưa được mục kích sở thị trên `web3.js` đó là khả năng lọc, truy vấn lịch sử giao dịch. Chúng có thể dễ dàng tìm kiếm các giao dịch đầu vào, đầu ra theo điều kiện cho trước.

```js
const { ethers, Wallet } = require('ethers');

async function main() {
  try {
    let provider = new ethers.providers.JsonRpcProvider();
    let signer = new Wallet('PRIVATE_KEY');
    let wallet = signer.connect(provider);
    const myAddress = signer.getAddress();
    // ...
    
   const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
   
   // Filter tất cả giao dịch gửi token DAI từ myAddress
   let filterFrom = await daiContract.filters.Transfer(myAddress, null);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }
    
    
    // Filter tất cả giao dịch gửi token DAI cho myAddress
   let filterTo = await daiContract.filters.Transfer(null, myAddress);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     null,
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }
    
    // Filter các giao dịch gửi DAI token từ myAddress trong khoảng block [9843470, 9843480]
    daiContract.queryFilter(filterFrom, 9843470, 9843480)
    
    // { Promise: [
    //   {
    //     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //     args: [
    //       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       '0x8B3765eDA5207fB21690874B722ae276B96260E0',
    //       { BigNumber: "4750000000000000000" }
    //     ],
    //     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
    //     blockNumber: 9843476,
    //     data: '0x00000000000000000000000000000000000000000000000041eb63d55b1b0000',
    //     decode: [Function],
    //     event: 'Transfer',
    //     eventSignature: 'Transfer(address,address,uint256)',
    //     getBlock: [Function],
    //     getTransaction: [Function],
    //     getTransactionReceipt: [Function],
    //     logIndex: 69,
    //     removeListener: [Function],
    //     removed: false,
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
    //       '0x0000000000000000000000008b3765eda5207fb21690874b722ae276b96260e0'
    //     ],
   //     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
    //     transactionIndex: 81
    //   },
    //   {
    //     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //     args: [
    //       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       '0x00De4B13153673BCAE2616b67bf822500d325Fc3',
    //       { BigNumber: "250000000000000000" }
    //     ],
    //     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
    //     blockNumber: 9843476,
    //     data: '0x00000000000000000000000000000000000000000000000003782dace9d90000',
    //     decode: [Function],
    //     event: 'Transfer',
    //     eventSignature: 'Transfer(address,address,uint256)',
    //     getBlock: [Function],
    //     getTransaction: [Function],
    //     getTransactionReceipt: [Function],
    //     logIndex: 70,
    //     removeListener: [Function],
    //     removed: false,
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
    //       '0x00000000000000000000000000de4b13153673bcae2616b67bf822500d325fc3'
    //     ],
   //     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
    //     transactionIndex: 81
    //   }
    // ] }

  } catch (err) {
    console.log(err);
  }
}

main();

```

## Tổng kết

Trong giới hạn bài viết, mình đã cùng các bạn tìm hiểu cách sử dụng cơ bản `ethers.js` để tương tác với mạng Ethereum, chi tiết kỹ hơn và các hàm, tham số thì mọi người có thể dễ dàng tham khảo ở tài liệu chính thức từ `ethers.js`

Những gì `web3.js` làm được, gần như `ethers.js` cũng làm được và thậm chí có cú pháp gọn gàng hơn (gọi hàm trong contrat). Ngoài trừ hàm `web3.eth.net.isListening()` trên `web3.js` để kiếm tra kết nối đến `provider` có thành công hay không thì mình chưa tìm được hàm tương tự trên `ethers.js` :sweat_smile:

Combo `Hardhat` và `ether.js` đang được team mình sử dụng thay thế dần cho bộ đôi huyền thoại `truffle` và `web3.js` và hoạt động khá trơn tru. Các bạn có thể cân nhắc chuyển qua dùng thử bộ đôi trên :wink: 

## Tài liệu tham khảo

https://docs.ethers.io/v5/