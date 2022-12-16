# Introduction

Kiểm thử code Solidity là rất quan trọng để tránh mọi tình huống có vấn đề gây ra bởi lỗi trong code của lập trình viên. Chúng ta thường test code trong các contract một cách thủ công , điều này khá phổ biến trong những project nhỏ . Nhưng khi project lớn lên với nhiều code hơn , nhiều điều kiện hơn lúc đó thật tốt khi có một trình kiểm thử tự động .

## Requirement

- Đã cài đặt [Nodejs](https://nodejs.org/en/)
- Đã cài đặt Truffle
  `npm install -g truffle`
- Đã cài đặt ganache-cli
  `npm install -g ganache-cli`

## 1. Tạo Truffle Project

```sh
$ mkdir truffle-demo

$ cd truffle-demo

$ truffle init
```

Khi khởi tạo thành công, chúng ta sẽ thấy thông báo sau trong console:

```sh
Downloading...
Unpacking...
Setting up...
Unbox successful. Sweet!
Commands:
Compile:        truffle compile
Migrate:        truffle migrate
Test contracts: truffle test
```

## 2. Tạo môi trường test

Sau khi install ganache-cli mở terminal chạy

```sh
$ ganache-cli
```

Ganache đã tạo ra mười tài khoản với 100 ether để thao tác trên môi trường test này. Nó cũng mở cổng RPC 8545 ở localhost.

```javascript
Ganache CLI v6.4.4 (ganache-core: 2.5.6)

Available Accounts
==================
(0) 0xd822d9f1863d52786f38616561c81ef4fb51cb06 (~100 ETH)
(1) 0x8480ce349284aae0818aeed52a84bb38e592f9d2 (~100 ETH)
(2) 0xbd60ca9841594a8bc339f524368070d63fd3ab3a (~100 ETH)
(3) 0x969782da583bd9f4765e35a6d01021fcf95b299a (~100 ETH)
(4) 0x048f3ecb1c64941aeb3b6ee1cd60e03adb127611 (~100 ETH)
(5) 0xb28d5de05e38a3cacec3a7dac23642f816b30d51 (~100 ETH)
(6) 0x1a885f80ba835008c0c2a00fa3737bf2b985ac8b (~100 ETH)
(7) 0xbf5feb658b633d5067b837e7c82c4f483253f006 (~100 ETH)
(8) 0xa5b3adec778b76c70a9f886edffb84b9fcee231e (~100 ETH)
(9) 0xb91d049d253fc0bbaa035ae2bb4186e8aa49b99c (~100 ETH)

Private Keys
==================
(0) 0xff0630d5a6e0518faa4e1b9ed40dbe4d7a5134f41038f7de200fd09a6c2abbd2
(1) 0xcd98eb4fdfaf062cec8ca21f2f25e3c1490dcb405cb207f43eb71fd7e08d9800
(2) 0x0bd6ec0f094fa3126bba5a5f9c3aa7db40188fba7b7ea76bd30bd8dc8da2afb4
(3) 0x9a96721a45a8b2a611b160491bf7c2bf78d838935772f384459884720be9399d
(4) 0x7c4e664858dfc0ca767d34797fa2987966799244de073cd1c8ee6781065849ce
(5) 0xe33f09abd99c925e260a0f6ebe9adba0bb3e9bae0c160e5c2f5e05d957f96769
(6) 0x9fd89acd6bcb18b79d20fc4f75f75e9b380938897bf5c2f1f8d7148e889b914a
(7) 0xf14e432eddab75e71e9283fb4df9be79d92bb3a56691ec777fa60f883448fa54
(8) 0x2f678a82aba406ba732f502ed2d487e99ef092b3fa4c7cf7039b69f6a9c2b722
(9) 0x9b84cda1d7135c61698de61316cbca35c100735bf6d7bf259f9b6d1952809c49

HD Wallet
==================
Mnemonic:      harvest fee chaos explain rabbit oval spider valid layer advance crash like
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8545
```

Tiếp theo chúng ta cần định cấu hình cài đặt mạng trong file truffle-config.js như dưới đây:

```javascript
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // match any netwrok id
    }
  }
};
```

Công việc setup đã xong bây giờ chúng ta hãy cùng code gì đó nào

### Viết Smart Contract

Hãy tạo một hợp đồng thông minh một cách đơn giản bằng cách gõ lệnh sau trong terminal:

```sh
truffle create contract SimpleContract
```

Trong thư mục contract, Truffle vừa tạo tệp `SimpleContract.sol` . Giờ chúng ta có thể code solidity vào file `SimpleContract.sol` rồi :

```javascript
pragma solidity ^0.5.0;

contract SimpleContract {
  string public name;
  address private owner;

  constructor () public {
    name = "my name";
    owner = msg.sender;
  }

  event NameEvent(string evPram);

  modifier onlyOwner() {
    require(msg.sender == owner,"is owner");

    _;
  }

  function getName() public view returns (string memory) {
    return (name);
  }

  function changeName(string memory _name ) public onlyOwner {
    name = _name;
    emit NameEvent(name);
  }
}
```

Chúng ta vừa tạo một contract với contructor , modifier (**onlyOwner**) một getter(**getName**) và một setter (**changeName**) , một events (**NameEvent**)
Bước tiếp theo chúng ta sẽ compile contract

### Compile Smart Contract

Để compile smart contract, hãy chạy lệnh sau:

`$ truffle compile`

Sau khi chạy lệnh này chúng ta sẽ ra tạo ra một file **build/contracts**. Nếu chúng ta mở thư mục này, chúng ta có thể thấy các file này là bản tóm tắt của smart contract và chứa thông tin sau:

- Contract name
- ABI (danh sách tất cả các hàm cùng với các giá trị tham số và giá trị trả về của chúng)
- Bytecode
- Deployed bytecode
- Compiler name và phiên bản của nó
- Danh sách các networks mà hợp đồng được deploy
- Địa chỉ của contract đối với từng mạng mà contract được deploy
  Đây là một file .json và điều đó thật tiện để sử dụng

### Viết Migrations

Để deploy smart contract trên blockchain chúng ta cần có file cấu hình . Các file javascript này có chạy các script khi deploy contract .
Chúng ta sử dụng lệnh

```sh
$ truffle create migration deploy_sample_contract
```

Chúng ta nhận được một file .js ở trong thư mục migrations với một tiền tố là 1 số ngẫu nhiên và sau đó là tên mà bạn vừa tạo .  
Sau đó chúng ta mở file và cấu hình như sau :

```js
const SimpleContract = artifacts.require('SimpleContract');

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(SimpleContract);
};
```

- Ở dòng đầu là chỉ định contract nào sẽ được sử dụng để tương tác bằng các phương thức `artifacts.require ()`. Phương thức này giống như trong Nodejs . Tuy nhiên nó sẽ trả về một bản tóm tắt của contract
- Ở dòng thứ 3 , `module.export ()` được sử dụng để export migrations . Phương thức này export một function, trong đó sẽ dàn dựng trước các script khi khởi tạo .
- Ở dòng thứ 5 là một phương thức deploy từ deployer để deploy SimpleContract của chúng ta

Sau đó chúng ta chạy lệnh

```sh
$ truffle migrate
```

Sau khi chạy lệnh chúng ta có thể thấy kết quả như sau

```
Starting migrations...
======================
> Network name:    'development'
> Network id:      1566745977104
> Block gas limit: 6721975

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x4995a88e7a4afd248773807d8e4a3e3d999515df6b20b335412267dcecd5ba73
   > Blocks: 0            Seconds: 0
   > contract address:    0x5b577EEE8B5ceb72fB78eaEedd47B9a32F4cee00
   > account:             0x2705D5775937A1137181EE6BE7A22fa5F859b7A3
   > balance:             99.99430184
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


2_deploy_sample_contract.js
===========================

   Deploying 'SimpleContract'
   --------------------------
   > transaction hash:    0xc4686dd4ed40497724b3f1682b42da3555835c9098b21ce1335fbbe3d03e77dc
   > Blocks: 0            Seconds: 0
   > contract address:    0x8afBECB9636a532a3814ECC3543B5f563605D2b3
   > account:             0x2705D5775937A1137181EE6BE7A22fa5F859b7A3
   > balance:             99.98419426
   > gas used:            463345
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0092669 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0092669 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01496506 ETH
```

Có thể thấy 0x8afBECB9636a532a3814ECC3543B5f563605D2b3 là địa chỉ contract chúng ta vừa deploy .

## 3. Viết Tests

Smart contract test có thể được viết bằng cả Solidity và Javascript . Nhưng trong bài viết này mình sẽ đề cập đến việc sử dụng Javascript .
Truffle sử dụng thư viện Mocha và Chai của javascipt để test smart contract .
Chúng ta sẽ bắt đầu với lệnh sau để tạo file test

```sh
$ truffle create test SimpleContract
```

Sau khi chạy chúng ta tạo được 1 file `simple_contract.js` trong thư mục test
Cùng sửa lại một chút nào

```js
const SimpleContract = artifacts.require('SimpleContract');

contract('SimpleContract', (accounts) => {
  it('should return the list of accounts', async () => {
    console.log(accounts);
  });
});
```

- Dòng 1 chúng ta sử dụng `artifacts.require()` để chỉ định contract
- Dòng 3 `contract()` dùng để nhóm các test, nó sẽ hiển thị ra các message để hiển thị múc đích của tests
- Dòng 4 `it()` là kí hiệu của Mocha để ghi chú các test case

### Testing Contructor

Hãy cùng viết code để test constructor của SimpleContract mà chúng ta đã viết bên trên 

```js
const SimpleContract = artifacts.require('SimpleContract');

contract('SimpleContract', (accounts) => {
  it('should return the name', async () => {
    const instance = await SimpleContract.deployed();
    const value = await instance.getName();

    assert.equal(value, 'my name');
  });
});
```

- Trong dòng 6, tạo một **instance** của hợp đồng để truy cập các phương thức của nó.
- Trong dòng 7, lưu trữ giá trị trả về của phương thức `getName ()` để chúng ta có thể kiểm tra nó.
- Trong dòng 9, kiểm tra giá trị trả về bằng có bằng **my name** không.

Bây giờ chạy lệnh `$truffle test` và chúng ta có thể thấy passing test

### Testing Setter

Tiếp theo chúng ta sẽ viết test cho setter cụ thể là hàm **changeName()**
Viết tiếp vào file `simple_contract.js`

```js
it('should return change the name', async () => {
  const instance = await SimpleContract.deployed();
  await instance.changeName('your name');
  const value = await instance.getName();

  assert.equal(value, 'your name');
});
```

Trong phần test này chúng ta gọi hàm changeName() vs tham số truyền vào là **your name** sau đó kiểm tra đầu ra có phải là **your name** không sau đó chạy lệnh `truffle test` để kiểm tra

### Testing Modifiers

Trước khi viết test cho modifiers chúng ta cần sửa file `simple_contract.js` để có thể dễ dàng viết test hơn

```js
const SimpleContract = artifacts.require('SimpleContract');

contract('SimpleContract', (accounts) => {
  let instance;
  before('should setup the contract instance', async () => {
    instance = await SimpleContract.deployed();
  });

  it('should return the name', async () => {
    const value = await instance.getName();

    assert.equal(value, 'my name');
  });

  it('should return change the name', async () => {
    await instance.changeName('your name');
    const value = await instance.getName();

    assert.equal(value, 'your name');
  });

  it('should execute only by the owner', async () => {
    await instance.changeName('modifier', { from: accounts[1] });
    const value = await instance.getName();

    assert.equal(value, 'modifier');
  });
});
```

Thay vì tạo instance cho mọi test case, chúng ta sẽ tạo một global instance cách sử dụng hook `before`do Mocha cung cấp.
Nếu chạy `$ truffle test` với code trên chúng ta sẽ thấy lỗi ở test case cuối do `accounts[1]` không phải là **owner**. Nếu chúng ta ko chỉ định tài khoản `{'from': accounts[1]}` thì sẽ là mặc định tài khoản đầu tiên. cũng là tài khoản owner . Nhưng dù thế nào chúng ta cũng muốn pass tất cả các test case kể cả trường hợp trên chứ ko muốn báo lỗi đỏ lòm đúng không . Chúng ta hãy sử dụng package `truffle-assertions` để hoàn thiện các test case nào .
Trước khi cài hãy chạy lệnh `npm init`

```sh
$ npm install truffle-assertions
```

Sau đó thêm code vào đầu file test

```js
const truffleAssert = require('truffle-assertions');
```

Sau đó sửa lại test case cuối :

```js
it("should fail", async () => {
  await truffleAssert.reverts(instance.changeName("modifier", {
  from: accounts[1]
}));
```

### Testing Listening Events

Sử dụng package `truffle-assertions` chúng ta vừa install . Chúng ta có thể :

1.  Check event type
2.  Check event parameters
3.  Print the event

Thêm code để check events trong file test như sau :

```js
it('should check the type of the event', async () => {
  const result = await instance.changeName('hello event');
  truffleAssert.eventEmitted(result, 'NameEvent');
});
```

Chúng ta đang lưu transaction vào một biến result và sau đó kiểm tra xem liệu ‘NameEvent có được chạy bởi transaction hay không.
Bây giờ chúng ta sẽ kiểm tra xem **Events** đc chạy với các tham số đúng chưa :

```js
it('should emit with correct paremeters', async () => {
  const result = await instance.changeName('hello event');
  truffleAssert.eventEmitted(result, 'NameEvent', (event) => {
    return event.evPram == 'hello event';
  });
});
```

Cuối cùng, chúng tôi sẽ in ra các tham số của Events và giá trị của chúng được phát ra bởi một event cụ thể:

```js
it('should print the event paremeters', async () => {
  let result = await instance.changeName('hello event');
  truffleAssert.prettyPrintEmittedEvents(result);
});
```

Sau khi chạy lệnh `$ truffle test`, bạn sẽ thấy giao dịch phát ra sự kiện, tên của sự kiện được phát ra, tham số và giá trị của nó.

# Lời kết

Với các project lớn việc viết test là rất quan trọng . Hi vọng bài viết này sẽ giúp ích cho các bạn có thể viết test một cách tốt nhất .

Tài liệu tham khảo :
[https://medium.com/oli-systems/test-driven-solidity-with-truffle-e4beaa2bd194](https://medium.com/oli-systems/test-driven-solidity-with-truffle-e4beaa2bd194)

Link github : [https://github.com/vinhyenvodoi98/Test_Contract_With_Truffle](https://github.com/vinhyenvodoi98/Test_Contract_With_Truffle)