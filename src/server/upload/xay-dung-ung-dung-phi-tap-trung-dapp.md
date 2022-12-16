Các bài viết trước trong chuỗi bài "Xây dựng dapp":

* Reactjs: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-reacjs-L4x5x8p15BM
* Cocos Creator: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-cocos-creator-63vKjk2bZ2R
* Unity: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-unity-QpmlexwVZrd
* Vuejs: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-vuejs-vyDZOaP95wj
# Giới thiệu

Sau bài lí thuyết về lộ trình tiếp cận public blockchain thì mình sẽ giới thiệu cách xây dựng một ứng dụng phi tập trung (DApp) cũng như xây dựng một bản mẫu kết hợp giữa **Contract** và **Frontend** . Bài đầu tiên sẽ xây dựng một based code cho DApp dựa vào **framework Reactjs** .
![](https://images.viblo.asia/e20df1ae-c845-4927-808f-7bd5c3fc1b6a.png)



# Khởi tạo project

Đầu tiên thì phải chuẩn bị các package cần có, về cơ bản thì cũng chỉ tập trung 2 phần gồm phần **contract** và phía **frontend**

## **Contract** 
Như đã giới thiệu trong phần [trước](https://viblo.asia/p/lo-trinh-bat-dau-tim-hieu-ve-public-blockchain-djeZ1pmRKWz), framework **Truffle** cũng đã được đề cập đến với mục đích để dễ dàng test unit cho smart contract, trong trường hợp chưa cài **truffle** thì có dùng command này để install: 
```bash
npm install -g truffle
``` 

Sau đó unbox gói cơ bản của **truffle** : **webpack**
Đầu tiên sẽ tạo một folder cho toàn bộ DApp:
```bass
mkdir EthCodeBased && cd EthCodeBased
```

Tiếp đó là unbox gói **webpack** :
```
truffle unbox webpack
```

Tiếp đó init npm:
```
npm init
```

Thêm các dependencies , khi đó package.json sẽ có dạng : 
```json
{
  "name": "ethcodebased",
  "version": "1.0.0",
  "description": "",
  "main": "truffle-config.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^8.1.0",
    "solidity-coverage": "^0.6.4",
    "truffle": "^5.0.12",
    "truffle-assertions": "^0.9.1",
    "truffle-hdwallet-provider": "^1.0.6"
  }
}

```

Cuối cùng dùng **yarn**  để install các package:

```bash
yarn install
```

Sau khi chạy hoàn thiện câu lệnh và loại bỏ một số file không cần thiết thì cấu trúc folder sẽ dạng như vậy :

![](https://images.viblo.asia/3e2a647b-6ae8-4e2c-8c52-798811b8e61a.png)


Trong box **webpack** đã mặc định chứa contract **MetaCoin**, và đây sẽ là **contract** để chúng ta làm demo cơ bản.  **Contract** này về cơ bản sẽ là một phiên bản siêu rút gọn của **ERC20**. **Contract** này sẽ phát hành 10.000 **coin**, trong đó mỗi coin sẽ tương ứng với giá là 2 ETH 
```js
function getBalanceInEth(address addr) public view returns(uint) {
        return ConvertLib.convert(getBalance(addr),2);
}

function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount) {
        return amount * conversionRate;
}
```

Vẫy đã nắm rõ phần **Smart contract**, tiếp tục sẽ là cách thứ deploy đoạn code này. Để deploy chúng ta sẽ sử dụng mạng **ropsten** , do đó sẽ cần config lại file **truffle-config.js** :
```json
const path = require('path');
var HDWalletProvider = require('truffle-hdwallet-provider');
MNENOMIC = process.env.MNENOMIC;
INFURA_API_KEY = process.env.INFURA_API_KEY;
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*' // Any network (default: none)
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(MNENOMIC, 'https://ropsten.infura.io/v3/' + INFURA_API_KEY),
      network_id: 3,
      gas: 4612388
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(MNENOMIC, 'https://kovan.infura.io/v3/' + INFURA_API_KEY),
      network_id: 42,
      gas: 470000,
      gasPrice: 21
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(MNENOMIC, 'https://rinkeby.infura.io/v3/' + INFURA_API_KEY),
      network_id: 4,
      gas: 470000,
      gasPrice: 21
    }
  }
};
```

Sẽ cần đến 2 thứ là **Mnemonic** và **Infura key**: 
* **Mnemonic:** Được lấy từ chính **Metamask**, 12 kí tự **seed words**, khi lấy thì nhớ lấy tại tài khoản có **ETH** vì sau này sẽ dùng tài khoản này để **deploy** 
* **Infura key:** Được lấy đơn giản bằng cách tạo project trên https://infura.io/dashboard khi đó sẽ tự động sinh ra một **PROJECT ID** . **Infura** có thể hiểu là một **fullnode**

Có đầy đủ các thứ trên thì giờ chỉ cần gọi command để deploy lên mạng ropsten:
```js
truffle migrate --network ropsten
```
và thành công sẽ như sau:
![](https://images.viblo.asia/29399743-487c-4bab-82e3-b94408e73355.png)

Sau khi đã deploy xong thì sẽ xuất hiện một folder mới lưu file đã compile của contract:
![](https://images.viblo.asia/070675ed-5f24-402c-b6de-aba0782afb9b.png)

File **Metacoin** sẽ chứa 2 phần quan trọng đó là **ABI** và **Address** :

* **ABI** có thể hiểu rằng nó chứa bản mô tả về các **function**, các **variable** của smart contract vừa được deploy
* **Address** địa chỉ của contract vừa được deploy, tìm kiếm trong file **Metacoin** với từ khóa **networks** sẽ thấy xuất hiện object có **key** là 3 - tương ứng với **chainID** của ropsten (mỗi network sẽ có một **chainID** riêng, **mainnet** của ETH có chainID là 1)

Vậy là về cơ bản đã xong phần contract, thứ quan trọng cần đạt được ở phần này chính là **ABI** và **Address** của smart cotnract. Ngoài sử dụng **Truffle** thì cũng có thể sử dụng **Remix** (Sử dụng remix sẽ đỡ tốn gas hơn truffle do không phải tốn thêm gas để deploy contract **Migration** )



> **Tips:** Có một tips để tối ưu nhất đó chính là compile contract bằng truffle và deploy bằng remix để lấy Address và khi đó là sẽ có một file hoàn hảo với chi phí tối thiểu