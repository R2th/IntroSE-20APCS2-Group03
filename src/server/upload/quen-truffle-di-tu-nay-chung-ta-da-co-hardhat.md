![](https://images.viblo.asia/f7579379-ee7a-40ec-b21f-3bfb1ccf1018.png)

Hẳn đối với những bạn mới bắt đầu tìm hiểu Ethereum nói riêng cũng như các nền tảng EVM-based nói chung đều biết đến `Truffle` (một framework hỗ trợ compile, deploy smart contract). Tuy nhiên, khi cần phát triển các smart contract lớn, phức tạp hơn thì nó sẽ bộc lộ 1 số hạn chế như tốn nhiều gas, thời gian deploy lâu, ... Với `Hardhat`, framework đem lại cho chúng ta những tùy chọn, tính năng phần nào vượt trội hơn để làm với các hệ thống smart contract phức tạp hơn.

## 1. Giới thiệu tổng quan

Cũng như **Truffle**, **Hardhat** là một môi trường phát triển để biên dịch, triển khai, test và debug Dapp Ethereum. 

Một số điểm tính năng nổi bật của **Hardhat**
- Tích hợp mạng local `hardhat`, dễ dàng chạy và debug code ngay trên local.
- Debug dễ dàng hơn: Với **Hardhat**, chúng ta có thể debug code **Solidity** dễ dàng hơn khi có thể console.log ra các biến (Solidity vốn ko hỗ trợ console.log)
- Hệ thống plugin: Giúp developer có thể bổ sung chức năng, tùy vào từng dự án cụ thể
- Hỗ trợ **TypeScript**

## 2. Cài đặt

Chúng ta còn setup thử 1 project mẫu nho nhỏ với `hardhat`. Chúng ta thực hiện các thao tác như dưới đây

```bash
mkdir hardhat-tutorial 
cd hardhat-tutorial 
npm init --yes 
npm install --save-dev hardhat 
```

```bash
npx hardhat
```

Chúng ta sẽ chọn lựa chọn số 1 (tạo ra 1 project mẫu)

![](https://images.viblo.asia/4643fead-1e24-4dcd-a0a4-21d6a25cfe6e.png)

Tiếp tục lựa chọn các option cần thiết

![](https://images.viblo.asia/baba56c3-2cd4-42fa-b21d-698886e99395.png)

Cuối cùng, cấu trúc thư mục project mẫu của **Hardhat** sẽ như thế này các bạn ạ

![](https://images.viblo.asia/e1356360-455d-417e-82b2-70ef86b8062a.png)

Còn đây lấy cấu trúc tương ứng của **Truffle Box**

![](https://images.viblo.asia/b32f50f1-2cac-495f-8de6-43ada7851184.png)

Cơ bản cấu trúc project của 2 công cụ là tương đối giống nhau
- Thư mục `contracts` chứa mã nguồn của các smart contract
- Thư mục `scripts` và `migrations` chứa các script viết bằng Javascript để biên dịch, deploy smart contract.
- Thư mục `test` chứa unit test viết cho contract
- 2 File `hardhat.config.js` và `truffle-config.js` chứa các config như networks, địa chỉ ví, trình biên dịch ... 

## 3. Sử dụng

### `Greeter.sol`

Chúng ta có file smart contract `Greeter.sol` trong folder `contracts` 

```js
pragma solidity ^0.7.0;

// Thư viện giúp sử dụng console.log trong solidity để debug
import "hardhat/console.sol";


contract Greeter {
  string greeting;

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
```

### `hardhat.config.js`

File `hardhat.config.js` là nơi chúng ta định nghĩa các networks, trình biên dịch, thư mục file build, ...

```js
require('@nomiclabs/hardhat-waffle');

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: '0.7.3'
};
```

Một phiên bản hoàn thiện hơn

```js
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    development: {
      url: 'http://127.0.0.1:8545',
    },
    quorum: {
      url: 'http://127.0.0.1:22000',
    },
  },
  solidity: {
    version: '0.6.2',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
};
```

### `scripts/sample-script.js`

Khác với **Truffle**, **Hardhat** không cần deploy "đệm" thêm contract `Migration.sol`, nên tiết kiệm được 1 lượng gas

```js
const hre = require("hardhat");

async function main() {
 // load contract Greeter
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  
  // Truyền tham số cho hàm constructor
  const greeter = await Greeter.deploy("Vui Tet Cung Viblo");

 // deploy contract
  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

### Deploy

```bash
npx hardhat run scripts/sample-script.js
```

![](https://images.viblo.asia/f02f4b8e-3db6-4a03-bab5-d1daf84bfb2e.png)

Nếu muốn deploy code contract ở các mạng khác thì chúng ta thêm lựa chọn `--network`

```bash
npx hardhat run scripts/sample-script.js --network development
```

Vậy đoạn console.log chúng ta đặt trong hàm `constructor` đã được thực thi

## 4. Các tính năng nâng cao hơn

### Biên dịch các contract ở nhiều phiên bản Solidity khác nhau

**hardhat.config.js**

```js
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.5"
      },
      {
        version: "0.6.7",
        settings: { } 
      }
    ]
  }
}
```

**Hardhat** trong trường hợp này sẽ dùng trình biên dịch `0.5.5` với các contract `pragma solidity ^0.5.0` và `0.6.7` với các contract `pragma solidity ^0.6.0`

Trong TH contract định nghĩa trình biên dịch `pragma solidity >=0.5.0` thì **Hardhat** sẽ lựa chọn trình biên dịch cao nhất `0.6.7`

Hoặc chúng ta có thể config chi tiết cho contracs nào dùng trình biên dịch nào

```js
module.exports = {
  solidity: {
    compilers: [...],
    overrides: {
      "contracts/Foo.sol": {
        version: "0.5.5",
        settings: { }
      }
    }
  }
}
```


### Chạy riêng 1 mạng blockchain local như ganache

Trước đây, mình hay dùng ganache để deploy smart contract trên local với truffle để thử nghiệm, tất nhiên là mình có thể dùng `truffle develop` nhưng ganache có nhiều lựa chọn và cách cấu hình các thông số hơn. Với **Hardhat**, mình có thể dùng luôn **Hardhat**, nó hỗ trợ cả việc mô phỏng các phiên bản hardforks của Ethereum trên local.

```bash
npx hardhat node
```

Mặc định mạng sẽ chạy ở port `8545`, chúng ta có thể thêm các tham số để điều chỉnh lại theo ý muốn

```
--fork
--fork-block-number
--hostname 
--port 
```


## Kết luận

Nhìn chung, **Hardhat** là 1 công cụ rất mạnh, đầy đủ tính năng cần thiết giúp các developer có thể triển khai smart contract trên Ethereum. Cách dùng **Hardhat** cũng khá giống với **Truffle**, ngoài ra cũng khắc phục được 1 số điểm chưa tốt từ đối thủ. 


## Tài liệu tham khảo

https://hardhat.org/getting-started/

https://hardhat.org/tutorial/