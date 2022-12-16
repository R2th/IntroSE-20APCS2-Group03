# 4. Triển khai một `upgradeable contract` theo cách Unstructured Storage
Đây là cách được Openzepplin chuẩn hóa và publish miễn phí [tại đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/TransparentUpgradeableProxy.sol) và gọi nôm na cách triển khai này là Proxy.
Toàn bộ code thực hành của bài này mình để [tại đây](https://github.com/trinhtan/testUpgradeabilityContract).

Cốt lõi của cách làm này là họ sẽ thực hiện `delegatecall` trong `assembly{}` và đặt nó trong `fallback()` của contract: 
```javascript
// SampleProxy
pragma solidity >=0.6.0 <0.8.0;

contract SampleProxy {
    
    constructor (address _logic, bytes memory _data) public payable {
       assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
        _setImplementation(_logic);
        if(_data.length > 0) {
            // solhint-disable-next-line avoid-low-level-calls
            (bool success,) = _logic.delegatecall(_data);
            require(success);
        }
    }
    
    /**
     * @dev Emitted when the implementation is upgraded.
     */
    event Upgraded(address indexed implementation);

    bytes32 private constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
   
    function _implementation() internal view returns (address impl) {
        bytes32 slot = _IMPLEMENTATION_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            impl := sload(slot)
        }
    }
    
    function _fallback() internal {
        _delegate(_implementation());
    }

    function _delegate(address implementation) internal {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
    
    function upgradeToAndCall(address newImplementation, bytes calldata data) external payable {
        _upgradeTo(newImplementation);
        // solhint-disable-next-line avoid-low-level-calls
        (bool success,) = newImplementation.delegatecall(data);
        require(success);
    }
    
        /**
     * @dev Upgrades the proxy to a new implementation.
     * 
     * Emits an {Upgraded} event.
     */
    function _upgradeTo(address newImplementation) internal {
        _setImplementation(newImplementation);
        emit Upgraded(newImplementation);
    }

    /**
     * @dev Stores a new address in the EIP1967 implementation slot.
     */
    function _setImplementation(address newImplementation) private {

        bytes32 slot = _IMPLEMENTATION_SLOT;

        // solhint-disable-next-line no-inline-assembly
        assembly {
            sstore(slot, newImplementation)
        }
    }
    
    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
     * function in the contract matches the call data.
     */
    fallback () external payable {
        _fallback();
    }
}
```
```javascript
pragma solidity >=0.6.0 <0.8.0;
contract SampleLogic {

    address public owner;
    bool public initialized;
    mapping(address => uint256) public balances;

    modifier initializer() {
        require(!initialized, "Initializable: contract is already initialized");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor () public {
    }
    
    function initialize() public initializer {
        owner = msg.sender;
        initialized = true;
    }
    
    function mint(address _recipient, uint256 _amount) public onlyOwner {
        balances[_recipient] = balances[_recipient] + _amount;
    }
}
```

Như ta đã biết: 
 - khi gọi đến một function không được định nghĩa trong contract X nào đó, thì nó sẽ được tự gọi đến function `fallback()` của contract X 
 - mặt khác, tất cả các cuộc gọi đến function của contract dù là function chỉ có chức năng `view` hay là function thay đổi storage thì nó đều được mã hóa trong biến `msg.data`

Kết hợp 2 điều này, Openzeppelin đã đặt một đoạn code `assembly{}` bên trong `fallback()` để triển khải lõi của Proxy, Nhìn vào 2 contract mẫu ở trên, ta thấy:
- SampleProxy có các function: 
     - constructor(address _logic, bytes memory _data)
     - upgradeToAndCall(address newImplementation, bytes calldata data)
     - fallback()
    
   mặt khác nó còn một giá trị `_implementation` được lưu ở slot ngẫu nhiên `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc` . Lý do ta không khai báo một biến để lưu giá trị `_implementation` mà lại lưu trữ theo kiểu ghi vào `slot`  là vì nếu khai báo biến, rất có thể sẽ bị xung đột lưu trữ với các biến của contract SampleLogic (xem lại Phần 1).
   
- SampleLogic có các function: 
    - constructor()
    - initialize()
    - mint(address _recipient, uint256 _amount)

<br/>

Thứ tự thực hiện sẽ là như sau:
- Deploy `SampleLogic` ta thu được địa chỉ của SampleLogic là `sample_logic_address`
- Deploy `SampleProxy` cùng với các tham số `sample_logic_address, 0x8129fc1c` (trong đó `0x8129fc1c` là selector của function `initialize()` được định nghĩa trong `SampleLogic`), ta thu được địa chỉ `sample_proxy_address`.  
- Thực hiện `SampleLogic(sample_proxy_address).mint(user, '1000')`
- Kiểm tra số dư của `user` `SampleLogic(sample_proxy_address).balances(user)` và thấy nó bằng `1000`.

<br/>

Mặc dù trong code của SampleProxy không có các function `mint()` cũng như `balances()` thế nhưng khi tạo instance `SampleLogic` tại địa chỉ `sample_proxy_address` vẫn có thể gọi được các function đó, lý do ta đã nói ở trên.

Bây giờ ta sẽ upgrade SampleProxy sang một SampleLogic2 có mã nguồn dưới đây, nó khác với SampleLogic là nó sẽ mint cho user gấp đôi amount truyền vào:
```javascript
pragma solidity >=0.6.0 <0.8.0;

contract SampleLogic2 {

    address public owner;
    bool public initialized;
    mapping(address => uint256) public balances;

    modifier initializer() {
        require(!initialized, "Initializable: contract is already initialized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor () public {
    }

    function initialize() public initializer {
        owner = msg.sender;
        initialized = true;
    }

    function mint(address _recipient, uint256 _amount) public onlyOwner {
        balances[_recipient] = balances[_recipient] + _amount * 2;
    }
}
```

Ta gọi function `upgradeToAndCall()` của SampleProxt và truyền vào địa chỉ của SampleLogic2 vừa deploy cùng với một chuỗi bytes có ý nghĩa mint cho user 1000. 

Sau đó ta check lại `balances(user)` sẽ nhận được kết  quả là 3000.

Đây là toàn code để test:
```javascript
const SampleProxy = artifacts.require('SampleProxy');
const SampleLogic2 = artifacts.require('SampleLogic2');
const SampleLogic = artifacts.require('SampleLogic');

contract('Sample', ([owner, user, someuser]) => {
  it('SampleProxy test', async () => {
    // deploy SampleLogic
    let sampleLogic = await SampleLogic.new({ from: someuser });

    // get selector of initialize() function
    let data = sampleLogic.contract.methods.initialize().encodeABI();

    // deploy SampleProxy
    let sampleProxy = await SampleProxy.new(sampleLogic.address, data, { from: owner });

    // create SampleLogic instance at SampleProxy's address
    let realSampleLogic = await SampleLogic.at(sampleProxy.address);

    // check owner
    assert.equal(await realSampleLogic.owner(), owner);

    // mint for user 1000
    await realSampleLogic.mint(user, '1000', { from: owner });

    // check user's balance
    assert.equal(await realSampleLogic.balances(user), '1000');

    // deploy SampleLogic2
    let sampleLogic_2 = await SampleLogic2.new({ from: someuser });

    data = sampleLogic_2.contract.methods.mint(user, '1000').encodeABI();

    // upgrade _implementation of Proxy to SampleLogic2's address and mint to user 2000
    await sampleProxy.upgradeToAndCall(sampleLogic_2.address, data);

    // check user's balance
    assert.equal(await realSampleLogic.balances(user), '3000');
  });
});
```
# 5. Triển khai một upgradeable ERC20 theo tiêu chuẩn của Openzepplin
Bên trên là cách triển khai một Proxy đơn giản, tuy nhiên trong thực tế việc quản lý Proxy không đơn giản như thế, nó phải có phân quyền admin, người mà có quyền upgrade `_implemmentation` của Proxy, vì nếu để ai cũng upgrade được thì Proxy hoàn toàn vô tác dụng.

Rất may là Openzeplin đã chuẩn hóa điều này cho chúng ta, mình chỉ cần implement nó. Đây là repos mình chuẩn bị sẵn để các bạn có thể tham khảo xem [tại đây](https://github.com/trinhtan/testUpgradeabilityContract). 

Mình sẽ hướng dẫn các bạn cách tạo một upgradeable ERC20 (tạm gọi là DAI) bằng cách kế thừa code đã được chuẩn hóa của Openzepplin:

```javascript
pragma solidity >=0.6.0 <0.8.0;

import "./token/ERC20/ERC20Upgradeable.sol";
import "./proxy/Initializable.sol";
import "./access/OwnableUpgradeable.sol";

contract DAI is ERC20Upgradeable, OwnableUpgradeable {

  function initialize(string memory name_, string memory symbol_) initializer public {
    __ERC20_init(name_, symbol_);
    __Ownable_init();
  }

  function mint(address recipient, uint256 amount) public onlyOwner {
    _mint(recipient, amount);
  }
}
```
Đây là logic đầu tiên của DAI, các file được import là mã nguồn đã được chuẩn hóa của Openzeplin, logic này sẽ `mint` sẽ mint một lượng `amount` cho `recipient`, contract này có thể deploy bởi bất kỳ user nào (`someuser`) vì nó chỉ đóng vai trò logic.

```javascipt
pragma solidity >=0.6.0 <0.8.0;

import "./proxy/ProxyAdmin.sol";

contract DAIProxyAdmin is ProxyAdmin {

  constructor () public {
  }
}
```
Đây là contract `DaiProxyAdmin`, nó import `ProxyAdmin.sol` đã được chuẩn hóa của Openzepplin, nó quản lý và có quyền upgrade giá trị `_implimentation` của các `DAIProxy` mà nó quản lý. Tại sao không dùng trực tiếp một địa chỉ ví để quản lý các Proxy mà lại phải thông qua một contract ProxyAdmin? Các bạn tự tìm hiểu nhé :D

```javascript
pragma solidity >=0.6.0 <0.8.0;

import "./proxy/TransparentUpgradeableProxy.sol";

contract DAIProxy is TransparentUpgradeableProxy {

  constructor (address _logic, address admin_, bytes memory _data) public TransparentUpgradeableProxy(_logic, admin_, _data) {
  }
}
```

Đây là file DaiProxy, sau này nó sẽ hoạt động như một ERC20, nó import TransparentUpgradeableProxy.sol đã được chuẩn hóa bởi Openzepplin, contract này phải được deploy bởi `daiOwner`

```javascript
pragma solidity >=0.6.0 <0.8.0;

import "./token/ERC20/ERC20Upgradeable.sol";
import "./proxy/Initializable.sol";
import "./access/OwnableUpgradeable.sol";

contract DAI_2 is ERC20Upgradeable, OwnableUpgradeable {

  function initialize(string memory name_, string memory symbol_) initializer public {
    __ERC20_init(name_, symbol_);
    __Ownable_init();
  }

  function mint(address recipient, uint256 amount) public onlyOwner {
    _mint(recipient, amount * 2);
  }
}
```
Đây là file `DAI_2`, nó chỉ khác so với `DAI` là nó mint một lương `amount * ` cho `recipient`. 

Bây giờ mình sẽ thực hiện các bước:
- 1. Deploy DAI bằng account `someuser`, được `dai`
- 2. Deploy DAIProxyAdmin bằng account `proxyAdmin`, được `daiProxyAdmin`
- 3. Lấy dạng bytes của  `initialize('DAI', 'DAI')` (`calldata`)
- 4. Deploy  DAIProxy bằng account `daiOwner` và truyền vào các tham số: `dai.Address`, `daiProxyAdmin.address`, `calldata`, được `daiProxy`.
- 5. Tạo một instance DAI khác tại địa chỉ `daiProxy.address`, được `realDai`.
- 6. Gọi `realDAI.mint(user, '1000')` bằng account `daiOwner`
- 7. Gọi kiểm tra `realDAI.balanceOf(user)` thì nhận được kết quả là `1000`.
- 8. Deploy DAI2 bằng account `someuser`, được `dai_2`
- 9. Upgrade lại `implementation` của `daiProxy` bằng cách gọi `daiProxyAdmin.upgrade(daiProxy.address, dai_2.address)` bằng account `proxyAdmin` .
- 10. Gọi  `realDAI.mint(user, '1000')` bằng account `daiOwner`.
- 11. Gọi kiểm tra `realDAI.balanceOf(user)` thì nhận được kết quả là `3000`.

Đây là toàn bộ code chạy test:
```javascript
const DAI = artifacts.require('DAI');
const DAI_2 = artifacts.require('DAI_2');

const DAIProxy = artifacts.require('DAIProxy');
const DAIProxyAdmin = artifacts.require('DAIProxyAdmin');

contract('DAI Proxy', ([proxyAdmin, daiOwner, user, someuser]) => {
  it('DAI Proxy', async () => {
    // deploy DAI
    let dai = await DAI.new({ from: someuser });

    // deploy DAIProxyAdmin
    let daiProxyAdmin = await DAIProxyAdmin.new({ from: proxyAdmin });

    // Get bytes of initialize('DAI', 'DAI')
    let data = await dai.contract.methods.initialize('DAI', 'DAI').encodeABI();

    // deploy DAIProxy
    let daiProxy = await DAIProxy.new(dai.address, daiProxyAdmin.address, data, {
      from: daiOwner,
    });

    // create DAI instance at daiProxy.address
    let realDai = await DAI.at(daiProxy.address);

    // Mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 1000
    assert.equal(await realDai.balanceOf(user), '1000');

    // deploy DAI_2
    let dai_2 = await DAI_2.new({ from: someuser });

    // upgrade daiProxy's implementation to dai_2.address
    await daiProxyAdmin.upgrade(daiProxy.address, dai_2.address);

    // mint 1000 for user
    await realDai.mint(user, '1000', { from: daiOwner });

    // check user's balance = 3000
    assert.equal(await realDai.balanceOf(user), '3000');
  });
});
```

# Tổng kết
Vấn để Upgradeable Contract hay còn gọi là Proxy trong solidity là một vấn đề tương đối khó, đòi hỏi phải thực hành nhiều lần thì mới hiểu được, nhưng lợi ích nó mang lại là cực kỳ lớn, nó giúp chúng ta bảo vệ ứng dụng ứng dụng và tài sản của mình tốt hơn, tránh những incident đáng tiếc xảy ra. Và để một smart contract có thể upgrade được thì chúng ta phải làm nó có thể upgrade ngay từ đầu chứ không thể nào upgrade một smart contract đã được deploy từ rất lâu mà không có cơ chế upgrade.