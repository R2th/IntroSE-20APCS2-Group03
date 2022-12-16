### Sau create thì là create2
Phương thức ```create2``` được bổ sung vào Ethereum virtual machine vào cuối tháng 2 năm 2019. Nó được giới thiệu là phương thức thứ 2 được dùng để deploy smart contract lên địa chỉ mà người dùng mong muốn bằng cách tùy chỉnh tham số đầu vào, do đó việc sử dụng nó có đôi chút phức tạp.

### So sánh thuật toán tính địa chỉ của create và create2

#### create

Create là phương thức deploy mặc định của solidity khi ta gọi như sau:


```solidity
// file Test.sol
pragma solidity ^0.5.2;

contract Test {
    address public testOwner;
    uint256 public a;
    string public b;

    modifier onlyTestOwner() {
        require(msg.sender == testOwner, "FORBIDEN");
        _;
    }

    constructor() public {
        testOwner = msg.sender;
    }

    function updateA(uint256 _a) public onlyTestOwner {
        a = _a;
    }

    function updateB(string memory _b) public onlyTestOwner {
        b = _b;
    }

    function changeOwner(address _newOwner) public onlyTestOwner {
        testOwner = _newOwner;
    }
}

```

```solidity
// file Deployer.sol
pragma solidity ^0.5.12;

import "./Test.sol";

contract Deployer {
    address public deployerOwner;
    address public testContractAddress;

    modifier onlyDeployerOwner() {
        require(msg.sender == deployerOwner);
        _;
    }

    constructor() public {
        deployerOwner = msg.sender;
    }

    function deploy() public onlyDeployerOwner {
        testContractAddress = address(new Test());
    }

    function changeTestContractOwner(address _newOnwer)
        public
        onlyDeployerOwner
    {
        return Test(testContractAddress).changeOwner(_newOnwer);
    }
}
```
Ví dụ khi ta muốn deploy contract Test từ contract Deployer thì mặc định Deployer sẽ gọi đến phương thức ```create()``` để tính toán địa chỉ sắp deploy của Test và đồng thời deploy Test lên.

Cách tính địa chỉ của ```create```  nôm na sẽ là kết quả băm của:
- Địa chỉ đang thực hiện deploy contract, trong trường hợp này là địa chỉ của Deployer
- Số contract mà địa chỉ kia đã deploy hay được gọi là ```nonce```, trong trường hợp này là số contract mà Deployer đã deploy.

 Code sẽ như sau:
 ```bash
 keccak256(rlp.encode(deployingAddress, nonce))[12:]
 ```
 
 #### create2
 có 2 file như sau:
 ```solidity
// file Deployer.sol
pragma solidity ^0.5.12;
import "./Test.sol";

contract Deployer {
    bytes testContractBytecode = hex"608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610427806100606000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306fdde031461005c5780638da5cb5b146100df578063a6f9dae114610129578063f446c1d01461016d578063fa1dda021461018b575b600080fd5b6100646101b9565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a4578082015181840152602081019050610089565b50505050905090810190601f1680156100d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100e76101f6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016b6004803603602081101561013f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061021b565b005b610175610320565b6040518082815260200191505060405180910390f35b6101b7600480360360208110156101a157600080fd5b8101908080359060200190929190505050610326565b005b60606040518060400160405280600d81526020017f5445535420434f4e545241435400000000000000000000000000000000000000815250905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f464f52424944454e00000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f464f52424944454e00000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b806001819055505056fea265627a7a723158201efcec2c524eb043a0507b85327f756627943740356a5423e83f13c382b3cb6564736f6c63430005100032";
    address public result;
    address public owner;

    modifier onlyDeployerOwner() {
        require(owner == msg.sender, "FORBIDEN");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function deploy(bytes32 salt) public onlyDeployerOwner {
        bytes memory bytecode = testContractBytecode;
        address addr;

        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }

        result = addr;
    }

    function changeTestOwner(address _newOwner) public onlyDeployerOwner {
        Test(result).changeOwner(_newOwner);
    }
}
 ```
 ```solidity
 // file Test.sol
 pragma solidity ^0.5.12;

contract Test {
    address public owner;
    uint256 public A;

    modifier onlyTestOwner() {
        require(msg.sender == owner, "FORBIDEN");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function name() external view returns (string memory) {
        return "TEST CONTRACT";
    }

    function updateA(uint256 _A) public onlyTestOwner {
        A = _A;
    }

    function changeOwner(address _newOwner) public onlyTestOwner {
        owner = _newOwner;
    }
}
 ```
 
Nhìn vào code thì ta có thể thấy ```Deployer``` sẽ gọi phương thức ```create2``` để deploy contrac Test, phương thức ```create2``` cơ bản sẽ tính toán ra địa chỉ của Test bằng cách băm các giá trị:
 - bytecode của chính contract Test, là giá trị của trường ```bytecode``` trong file Test.json khi ta compile contract.
 - địa chỉ mà đang deploy contract Test, trong trường hợp này là địa chỉ của Deployer.
 - salt: một giá trị bytes32 tùy ý

Trong 3 giá trị trên thì bytecode và địa chỉ của Deployer là chúng ta không thể tùy chỉnh được, như vậy chỉ có thể tự tính toán ```salt``` để ra giá trị địa chỉ như ý chúng ta.

Thuật toán là :
```bash
keccak256(0xff ++ deployingAddr ++ salt ++ keccak256(bytecode))[12:]
```

### Dò số
Để có thể dò tìm số salt thì trước tiên ta phải deploy Deployer lên trước, để lấy địa chỉ của nó cho vào tính toán.
Code để dò số như sau:

```javascript
const eth = require('ethereumjs-util');

// ví dụ Deployer đã được deployer lên địa chỉ 0x48599ebbc73d075a3bd3409cdffd9fb910f99611 thì biến bên dưới sẽ là
var deployerAddress = '0xff48599EBbC73d075A3Bd3409cDFfD9FB910F99611';

var Test = require('./build/contracts/Test.json');

/
var bytecodeHash = eth.keccak256(Test.bytecode).toString('hex');

// lặp để tìm salt
for (var i = 0; i < 72057594037927936; i++) {
    // 1. convert về dạng bytes
    var saltToBytes = i.toString(16).padStart(64, '0');

    // 2. nối chuỗi
    var concatString = deployerAddress.concat(saltToBytes).concat(bytecodeHash);

    // 3. băm đúng như thuật toán của create2 
    var hashed = eth.bufferToHex(eth.keccak256(concatString));

    // 4. Kiểm tra đuôi 4 mùa lộc phát không nha, giống đuôi sdt mình nè :D
    if (hashed.substr(26).endsWith('4668')) {
        var address = '0x' + hashed.substr(26);
        console.log('SALTY: ', '0x' + saltToBytes);
        console.log('EXPECTED ADDRESS: ', address);
        break;
    }
}
```

Chạy vài giây ra kết quả:
```bash
SALTY:  0x0000000000000000000000000000000000000000000000000000000000003c77
EXPECTED ADDRESS:  0xf9e978d101b1382cd89a0b39b55d6075a59c4668
```

có được ```salt``` rồi lấy giá trị đấy gọi hàm deploy() của Deployer sẽ ra được contract có địa chỉ là EXPECTED_ADDRESS.

### Tổng kết
Phương thức ```create2``` là một phương thức vô cùng hữu ích trong một số trường hợp như contract có nhiều module, bạn không muốn lưu cứng địa chỉ của smart contract A vào smart contract B, để tiện cho việc nâng cấp các module. 

Mặt khác nó còn giúp chúng ta dễ dàng cho được địa chỉ đẹp như ý muốn, biết đâu một ngày nào đó project chúng ta thành unicorn thì sao :D