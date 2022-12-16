*Vào ngày 26 tháng 5 vừa qua, 20 triệu $OP (trị giá 14 triệu USD theo giá trị tại thời điểm viết bài) đã bị hack. Vụ việc xảy ra trước cả khi token $OP được phát hành tới với người dùng 5 ngày sau đó. Bài viết sau đây cung cấp thông tin để mô phỏng lại chi tiết quá trình xảy ra vụ hack.*

![image.png](https://images.viblo.asia/897bad72-bda6-4741-b56c-d487ab7ccc58.png)
# Về Optimism
# 
Optimism là Layer 2 trên Ethereum cung cấp tốc độ giao dịch nhanh chóng và bảo mật tốt dựa trên cơ chế Optimistic Rollup. Là một trong những Layer 2 đứng đầu, Optimism có lượng TVL đạt ngưỡng cao nhất hơn 1 tỷ USD.

Sử dụng máy ảo EVM, Optimism cung cấp môi trường phát triển dapp giống với mạng chính Ethereum. 

![image.png](https://images.viblo.asia/b7e29390-b2e3-4612-815d-0ca40b36f54e.png)
# Cơ sở lý thuyết
# 
Để hiểu rõ hơn về vụ hack, ta cần hiểu về quá trình deploy smart contract bởi một smart contract khác.

Khi contract A được deploy bởi contract B thì địa chỉ của contract A được tính dựa trên những tham số:

```
address_A = keccak256(address_B, nonce_B)
```

Theo công thức trên, address_A chỉ phụ thuộc vào 2 tham số address_B và nonce_B, trong đó nonce_B là số contract đã được deploy bởi B cộng thêm 1.

Nói cách khác, ta có thể xác định trước address của contract A bất kỳ được deploy bởi contract B dựa vào address của B và số thứ tự của contract A.

Ví dụ, ở đây ta có 2 contract như sau:
```
pragma solidity ^0.5.3;

contract Instance {}

contract Factory {
    mapping(uint256 => address) public nonceToAddress;
    uint256 public nonce;

    constructor() public {
        nonce = 1;
    }

    function createInstance() public {
        Instance newInstance = new Instance();
        nonceToAddress[nonce] = address(newInstance);
        nonce++;
    }
}
```
trong đó, contract Instance sẽ được deploy bởi contract Factory.

Ta hoàn toàn có thể tính được trước address của Instance được deploy qua mỗi lần gọi đến hàm createInstance() của Factory:
```
// nonce = 1
    await factory.connect(deployer).createInstance();
    var nonce = 0x01; //The nonce must be a hex literal!
    var input_arr = [factory.address, nonce];
    var rlp_encoded = rlp.encode(input_arr);
    var contract_address_long = keccak('keccak256').update(Buffer.from(rlp_encoded)).digest('hex');
    var contract_address = '0x' + contract_address_long.substring(24); //Trim the first 24 characters.
    console.log('Instance contract_address with nonce 1: ' + contract_address);
    expect((await factory.nonceToAddress(1)).toLowerCase()).be.equal(contract_address);// The deployed instance address must be equal to the one we calculated
```

Chạy lệnh `yarn test_create`: [link](https://github.com/ChainZoom-Security/optimistic-chain-exploit/blob/main/test/test_create.test.js)

Kết quả:
![image.png](https://images.viblo.asia/8198dcf0-f107-4ed9-86d2-25e670412aa9.png)

# Quá trình hack
# 
Sự việc xảy ra do sự bất cẩn của Wintermute - một market maker partner với Optimism. Wintermute vay Optimism 20 triệu OP để tạo thanh khoản cho đồng token này.

Vụ hack bao gồm sự tham gia của 5 address chính, ta gọi ngắn gọn như sau:

1. A(L1) và A(L2): Contract 0x4f3a120e72c76c22ae802d129f599bfdbc31cb81 trên Ethereum và Optimism Chain.

* [Address A(L1)](https://etherscan.io/address/0x4f3a120e72c76c22ae802d129f599bfdbc31cb81#code)
* [Address A(L2)](https://optimistic.etherscan.io/address/0x4f3a120e72c76c22ae802d129f599bfdbc31cb81)


2. B(L1) và B(L2): Contract ProxyFactory 0x76e2cfc1f5fa8f6a5b3fc4c8f4788f0116861f9b trên Ethereum và Optimism Chain.

* [Contract B(L1)](https://etherscan.io/address/0x76e2cfc1f5fa8f6a5b3fc4c8f4788f0116861f9b#code)
* [Contract B(L2)](https://optimistic.etherscan.io/address/0x76e2cfc1f5fa8f6a5b3fc4c8f4788f0116861f9b)


3. X(L2): Contract chứa logic tấn công của hacker

* [Contract X(L2)](https://optimistic.etherscan.io/address/0xe7145dd6287ae53326347f3a6694fcf2954bcd8a)

Để nhận token, Wintermute gửi address A cho Optimism Foundation.

Tuy nhiên, Wintermute chỉ mới sở hữu address này trên Ethereum Chain (L1) mà chưa deploy nó lên Optimisim Chain (L2). Họ nghĩ rằng nếu mình đã sở hữu địa chỉ này trên L1 thì có thể dễ dàng sở hữu nó trên L2, do cả hai cùng sử dụng máy ảo EVM.

#### May-26-2022 11:55:44 PM +UTC: 
 

Optimism Foundation gửi test 1 OP đến address A(L2)

[Transaction tại đây](https://optimistic.etherscan.io/tx/0xf79ed3037b55fbfd305007da2f19fb7960d31b8410453c679313e37a6d8548f4)
#### May-27-2022 04:05:27 PM +UTC:


Optimism Foundation gửi tiếp 1,000,000 OP đến address A(L2)

[Transaction tại đây
](https://optimistic.etherscan.io/tx/0x0c1d6166293924566ea0ca32d07379c7033a8b8f2558f667f917543e51dd474a)

Rất có thể lúc này address A(L2) đã vào tầm ngắm của hacker

 #### May-27-2022 04:59:21 PM +UTC:

Optimism Foundation gửi nốt 19,000,000 OP đến address A(L2)

[Transaction tại đây
](https://optimistic.etherscan.io/tx/0x8e29eef359f6c18a06e229157d44467b5e873f6e5b996baa7124b38eb6dfb1db)

=> một khoản tiền trị giá 20M USD nằm trong 1 empty_address, chưa hề có logic nào được triển khai trên địa chỉ đó.

#### Hacker điều tra về address A(L1) trên Ethereum chain ####

Trên Ethereum Chain address A(L1) thực chất lại là 1 contract: 
![image.png](https://images.viblo.asia/7b9ea132-01d0-4cca-a6e5-11cc6d01ce00.png)
Hacker còn điều tra được thêm contract này lại được deploy bởi contract B(L1) tại [transaction này](https://etherscan.io/tx/0xd705178d68551a6a6f65ca74363264b32150857a26dd62c27f3f96b8ec69ca01#internal)

#### Tại address B(L2) trên Optimism Chain cũng là một contract ProxyFactory y hệt Ethereum Chain

Kết hợp với lý thuyết trình bày ở trên, hacker suy ra được cặp contract được tạo bởi B trên Ethereum và Optimism nếu cùng 1 nonce sẽ cho ra cùng địa chỉ.

#### Bước tiếp theo Hacker tìm số nonce đã tạo ra địa chỉ A(L1) ####

Bằng cách thay đổi giá trị nonce cho đến khi địa chỉ cho ra khớp với A, hacker tìm được nonce là 8884

```
const rlp = require('rlp');
const keccak = require('keccak');

const findNonce = () => {
  var factoryAddress = '0x76e2cfc1f5fa8f6a5b3fc4c8f4788f0116861f9b';
  var target = '0x4f3a120e72c76c22ae802d129f599bfdbc31cb81';
  var nonce = 1;

  while (true) {
    var input_arr = [factoryAddress, parseInt(nonce.toString(16), 16)];
    var rlp_encoded = rlp.encode(input_arr);
    var contract_address_long = keccak('keccak256').update(Buffer.from(rlp_encoded)).digest('hex');
    var contract_address = '0x' + contract_address_long.substring(24);

    if (contract_address == target) {
      console.log(nonce);
      console.log(contract_address);
      return;
    }

    nonce++;
  }
};

findNonce();
```
Kết quả: 
![image.png](https://images.viblo.asia/4c9d8727-20d4-4423-8fa1-baad281151de.png)

#### Hacker quay lại điều tra nonce của address B(L2) trên Optimism xem liệu nó đã vượt qua 8884 chưa. ####

![image.png](https://images.viblo.asia/a6e002ee-7b99-48ca-b0c6-cfd4121f6784.png)
Thật may mắn cho hacker, nonce tại thời điểm đấy mới chỉ tầm 10, vẫn chưa vượt quá 8884

#### Bước tiếp theo, hacker chuẩn bị sẵn 2 logic: 

* replaying the deployment gọi liên tục đến hàm createProxy() của B(L2) để tăng nonce đến 8884
* logic để rút OP Token khi đã deploy contract thành công lên address A(L2)

Hacker đã kết hợp 2 logic đấy trong contract X(L2)

#### Hacker tấn công và rút tiền:

Transaction replay deploy để chiếm quyền kiểm soát address A(L2) [tại đây](https://optimistic.etherscan.io/tx/0x00a3da68f0f6a69cb067f09c3f7e741a01636cbc27a84c603b468f65271d415b#internal)

Hacker khởi động tấn công tại address X(L2). Hắn gọi liên tục hàm createProxy() của B(L2) với tham số masterCopy chính bằng address X(L2)

Như vậy 20M OP trong contract A(L2) đã hoàn toàn thuộc về hacker, hắn đã rút ra khoảng 2M OP tại 2 transaction 
* [Transaction 1](https://optimistic.etherscan.io/tx/0x230e17117986f0dc7259db824de1d00c6cf455c925c0c8c6b89bf0b6756a7b7e)
* [Transaction 2](https://optimistic.etherscan.io/tx/0xdb693613d550e38d53d47b5fd07ce505e24e141db146fa1321710c9a86d9db6a)

# Tái hiện trên local
# 
Sử dụng repo này để test.

Để chạy test đỡ mất thời gian, chúng ta sẽ giả định targetAddress ứng với nonce = 15 chứ không cần đến 8884 

Có 3 module:

* [ProxyFactory contract](https://github.com/ChainZoom-Security/optimistic-chain-exploit/blob/main/contracts/optimistic/ProxyFactory.sol)
* [OPTokenMock contract](https://github.com/ChainZoom-Security/optimistic-chain-exploit/blob/main/contracts/optimistic/OPTokenMock.sol)
* [Attack contract](https://github.com/ChainZoom-Security/optimistic-chain-exploit/blob/main/contracts/optimistic/Attack.sol)

Trong đó 2 modules ProxyFactory và OPTokenMock là có sẵn, Hacker chỉ cần code thêm Attack contract.

Phân tích code trong Attack contract, vì Hacker muốn kết hợp cả 2 logic replayDeploy và withdrawToken trong cùng 1 contract nên contract Attack sẽ hơi khó hiểu và có một số việc bị lặp lại:

* Ở hàm `constructor()`, các tham số factory, target, token là cần thiết cho việc thực hiện replayDeploy
* Ở hàm `replayDeploy()`, sẽ thực hiện vòng lặp createProxy cho đến khi tìm được targetAddress
* Ở hàm `initialize()` cần phải khởi tạo lại token và khởi tạo thêm giá trị owner, do contract Attack sẽ chứa logic của contract Proxy vừa được deploy lên targetAddress.

Chạy lệnh `yarn exploit`: [link](https://github.com/ChainZoom-Security/optimistic-chain-exploit/blob/main/test/exploit.test.js)

Kết quả trả về sẽ tương tự như sau:
![image.png](https://images.viblo.asia/66e180ca-b215-4e3e-812f-a1b478dfbe57.png)``