### Mở đầu
Như chúng ta đã biết, trên các chain chạy evm ngày nay ngoài Native coin (ETH) và Fungible Token (ERC20) thì chúng còn cón Non-Fungible Token (ERC721 và ERC1155). Native coin là coin được sinh ra trong quá trình đào của các máy, còn Fungible Token và Non-Fungible Token được sinh ra và vận hành theo source code được lập trình trong smart contract.

Tuy nhiên, còn có một vài điểm khác nhau giữa các loại token này như:

* Native coin: có thể chuyển tự do giữa các địa chỉ ví, nhưng nếu một contract muốn nhận được ETH thì nó phải implement  `receive()`   hoặc một function nào đó trong contract muốn nhận ETH thì nó phải khai báo `payable`, ví dụ như sau:

```javascript
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

contract ContractA {
    address public owner;
    uint256 public balance;

    constructor() public {
        owner = msg.sender;
    }

    receive() external payable {
        balance = balance + msg.value;
    }

    function receivesETH() public payable {
        balance = balance + msg.value;
    }
}
```
* Fungible Token: nếu các Fungible Token này được dev theo chuẩn ERC20 của opepzepplin thì dù địa chỉ ví hay contract đều có thế nhận Token mà không cần implement thêm gì.
* Non-Fungible Token: Nếu Non-Fungible Token này implement theo chuẩn của openzeppelin thì nó cũng tương tự như Native Token, một địa chỉ ví có thể dễ dàng nhận Non-Fungible Token, nhưng nếu người nhận là một contract thì có 2 tùy chọn:

    * Nếu người gửi sử dụng function `transferFrom(address from, address to, uint256 tokenId)`  để gửi NFT thì contract có thể thoải mái nhận mà không cần implement thêm gì
    * Nếu người gửi sử dụng function `safeTransferFrom(address from, address to, uint256 tokenId)` hoặc `safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data)` thì contract cần phải implement thêm một đoạn source code thì mới có thể nhận NFT.

### ERC721
Đầu tiên ta sẽ dev một **TestERC721** theo chuẩn ERC721 của *Openzeppelin* và xem qua source code của nó:

```javascript
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract TestERC721 is ERC721, Ownable {

  constructor(string memory name_, string memory symbol_) public  ERC721(name_, symbol_) {
  }s

  function mint(address _to, uint256 _tokenId) public onlyOwner {
    _safeMint(_to, _tokenId);
  }
}
```
Chúng ta sẽ nhìn qua function ```safeTransferFrom()``` và các function liên quan đến nó trong trong file *ERC721.sol*:
```javascript
...

function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || ERC721.isApprovedForAll(owner, spender));
}
...

function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
}
...

function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
}
...

function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data) private returns (bool) {
        if (!to.isContract()) {
            return true;
        }
        bytes memory returndata = to.functionCall(abi.encodeWithSelector(
            IERC721Receiver(to).onERC721Received.selector,
            _msgSender(),
            from,
            tokenId,
            _data
        ), "ERC721: transfer to non ERC721Receiver implementer");
        bytes4 retval = abi.decode(returndata, (bytes4));
        return (retval == _ERC721_RECEIVED);
}
```

Phân tích một chút thì ta sẽ thấy ở bước cuối cùng khi chuyển Token ERC721 từ A đến B bằng function `safeTransferFrom()` thì bước cuối cùng mà nó thực hiện là kiểm tra xem B có sẵn sàn nhận Token đấy không ? Ở trong function ```_checkOnERC721Received()```:
* Nếu B là một địa chỉ ví thì luôn cho phép nhận:
```javascript
if (!to.isContract()) {
            return true;
}
```
* Nếu B là một contract thì nó sẽ gọi đến function ```onERC721Received()``` của contract B bằng cách gọi ```low-level call``` và kiểm tra giá trị trá về từ B xem có bằng ```_ERC721_RECEIVED``` hay không, nếu bằng thì có nghĩ là B sẵn sàng nhận Token:
```javascript
bytes memory returndata = to.functionCall(abi.encodeWithSelector(
    IERC721Receiver(to).onERC721Received.selector,
    _msgSender(),
    from,
    tokenId,
    _data
), "ERC721: transfer to non ERC721Receiver implementer");
bytes4 retval = abi.decode(returndata, (bytes4));
return (retval == _ERC721_RECEIVED);
// _ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")) = 0x150b7a02
```

Như vậy để contract B có thể nhận được một token ERC721 thì bắt buộc nó phải implement function `onERC721Received()` và hàm đấy bắt buộc phải trả về giá trị `keccak256("onERC721Received(address,address,uint256,bytes)")`

Mã nguồn như sau:

```javascript
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {
    IERC721Receiver
} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract ReceiverERC721 is IERC721Receiver {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }
}
```
Luồng thực hiện như sau:
```javascript
/** @format */

const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Receiver ERC721', async () => {
  let erc721, receiverERC721;
  let deployer, user;
  let tokenId = '0';

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    let TestERC721 = await ethers.getContractFactory('TestERC721');

    erc721 = await TestERC721.connect(deployer).deploy('Test ERC721', 'Test');

    let ReceiverERC721 = await ethers.getContractFactory('ReceiverERC721');

    receiverERC721 = await ReceiverERC721.connect(deployer).deploy();
  });

  it.only('All setup successfully', async () => {
    await erc721.connect(deployer).mint(user.address, tokenId);

    await erc721
      .connect(user)
      .functions['safeTransferFrom(address,address,uint256)'](
        user.address,
        receiverERC721.address,
        tokenId
      );

    console.log('User address: ', user.address);
    console.log('Receiver ERC721 address: ', receiverERC721.address);
    console.log('NFT owner: ', await erc721.ownerOf(tokenId));
  });
});
// Result
// Receiver ERC721
// User address:  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// Receiver ERC721 address:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// NFT owner:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```
Ngoài ra trong luồng trên nếu để ý thì ta sẽ thấy có một tham số được truyền vào mà vẫn chưa được dùng để làm gì đó là tham số `bytes calldata data`, tham số này chỉ có tác dụng khi người dev smart contract muốn contract sẽ thực thi một việc gì đó khi ngay khi nhận được NFT, mục đích của việc này làm làm cho function `onERC721Received` giống như function `receive()` nhận token và thực thi một việc gì đó.

Ví dụ:
```javascript 
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {
    IERC721Receiver
} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ReceiverERC721_2 is IERC721Receiver {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        msg.sender.call(data);
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }
}
```

Mình sẽ chạy một luồng để cho ```contract``` nhận NFT từ ```user``` và chuyến nó luôn cho ```anotherUser```. Luồng  như sau:
```javascript
/** @format */

const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Receiver ERC721 2', async () => {
  let erc721, receiverERC721_2;
  let deployer, user, anotherUser;
  let tokenId = '0';

  beforeEach(async () => {
    [deployer, user, anotherUser] = await ethers.getSigners();

    let TestERC721 = await ethers.getContractFactory('TestERC721');

    erc721 = await TestERC721.connect(deployer).deploy('Test ERC721', 'Test');

    let ReceiverERC721_2 = await ethers.getContractFactory('ReceiverERC721_2');

    receiverERC721_2 = await ReceiverERC721_2.connect(deployer).deploy();
  });

  it.only('All setup successfully', async () => {
    await erc721.connect(deployer).mint(user.address, tokenId);

    let data = erc721.interface.encodeFunctionData('transferFrom', [
      receiverERC721_2.address,
      anotherUser.address,
      tokenId
    ]);

    await erc721
      .connect(user)
      .functions['safeTransferFrom(address,address,uint256,bytes)'](
        user.address,
        receiverERC721_2.address,
        tokenId,
        data
      );

    console.log('User address: ', user.address);
    console.log('Another user address: ', anotherUser.address);
    console.log('Receiver ERC721 address: ', receiverERC721_2.address);
    console.log('NFT owner: ', await erc721.ownerOf(tokenId));
  });
});
// Result 
// Receiver ERC721
// User address:  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// Another user address:  0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
// Receiver ERC721 address:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// NFT owner:  0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
```
### ERC1155
Tương tự đối với ERC1155, chúng ta dev một contract ERC1155 như sau: 
```javascript
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TestERC1155 is ERC1155, Ownable {
    constructor(string memory uri_) public ERC1155(uri_) {}

    function mint(
        address account_,
        uint256 tokenId_,
        uint256 amount_,
        bytes memory data_
    ) public onlyOwner {
        _mint(account_, tokenId_, amount_, data_);
    }
}
```

Xem source code của file `ERC1155.sol` ta có:
```javascript
...
function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
} 
...

function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        virtual
        override
    {
        require(to != address(0), "ERC1155: transfer to the zero address");
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, to, _asSingletonArray(id), _asSingletonArray(amount), data);

        _balances[id][from] = _balances[id][from].sub(amount, "ERC1155: insufficient balance for transfer");
        _balances[id][to] = _balances[id][to].add(amount);

        emit TransferSingle(operator, from, to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
}
    ...
    
function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        private
    {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
                if (response != IERC1155Receiver(to).onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
}
```

Như vậy nếu người dùng dùng function `safeTransferFrom()` để gửi NFT đến một contract thì contract ấy bắt buộc phải implement function `onERC1155Received()` để có thể nhận được NFT đó:
```javascript
// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {
    ERC1155Receiver
} from "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";

contract ReceiverERC1155 is ERC1155Receiver {
    address public owner;

    constructor() public ERC1155Receiver() {
        owner = msg.sender;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"
                )
            );
    }
}
```

Luồng thực hiện như sau, `deployer` sẽ deploy một ERC1155 và mint ở tokenId `0` một lượng là `10` cho `user`, sau đó `user` chuyển bớt `5` cho contract.

```javascript
/** @format */

const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Receiver ERC1155', async () => {
  let erc1155, receiverERC1155;
  let deployer, user;
  let tokenId = '0';

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    let TestERC1155 = await ethers.getContractFactory('TestERC1155');

    erc1155 = await TestERC1155.connect(deployer).deploy('Test ERC1155');

    let ReceiverERC1155 = await ethers.getContractFactory('ReceiverERC1155');

    receiverERC1155 = await ReceiverERC1155.connect(deployer).deploy();
  });

  it.only('All setup successfully', async () => {
    await erc1155.connect(deployer).mint(user.address, tokenId, '10', '0x');

    await erc1155
      .connect(user)
      .functions['safeTransferFrom(address,address,uint256,uint256,bytes)'](
        user.address,
        receiverERC1155.address,
        tokenId,
        '5',
        '0x'
      );

    console.log('User address: ', user.address);
    console.log('Receiver ERC1155 address: ', receiverERC1155.address);
    console.log('User balance:', parseInt(await erc1155.balanceOf(user.address, tokenId)));
    console.log(
      'Receiver ERC1155 balance:',
      parseInt(await erc1155.balanceOf(receiverERC1155.address, tokenId))
    );
  });
});
// Result
// Receiver ERC1155
// User address:  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// Receiver ERC1155 address:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// User balance: 5
// Receiver ERC1155 balance: 5
```

Với tham số `bytes calldata data` thì mọi người thử triển khai tương tự như ERC721 nhé.