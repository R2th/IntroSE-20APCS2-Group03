![](https://images.viblo.asia/c33f0761-b7c1-4776-b860-0db417c1c234.jpeg)


Khi nhắc đến các chuẩn token trong Ethereum, ERC-20 và ERC-721 có lẽ là hai cái tên được nghĩ đến đầu tiên. Ngày hôm nay, chúng ta sẽ cùng tìm hiểu về một chuẩn token khác là ERC-1155, một chuẩn đa token (multiple token types) giúp linh hoạt hơn trong việc implement nhiều loại token trong Dapp.


## 1. Giới thiệu

**ERC-1155** là một chuẩn giúp smart contract quản lý nhiều loại token (multiple token types). Một smart contract áp dụng chuẩn **ERC-1155** có thể xử lý nhiều loại token khác nhau như  `fungible`, `non-fungible` hay `semi-fungible`.

**ERC-1155**  là sự lựa chọn tuyệt vời cho các game trên Blockchain, nhất là những game có số lượng lớn vật phẩm (items) cần token hóa. Ngoài ra, **ERC-1155**  còn có thể ứng dụng vào việc quản lý cùng lúc nhiều tài sản được như trái phiếu, cổ phiếu, bất động sản, v..v


### Điểm khác biệt so với những chuẩn token khác như ERC-20 hay ERC-721

Với các chuẩn token như `ERC-20` hay `ERC-721`, cần ít nhất một smart contract để implement các chuẩn đó. Điều này có chút bất tiện, nếu Dapp của chúng ta cần áp dụng các chuẩn token khác nhau thì khi xử lý các token cần gọi đến các smart contract khác nhau. Với chuẩn  **ERC-1155**, chỉ với một smart contract implement, chúng ta có thể làm việc với nhiều chuẩn token. Gửi nhiều loại token cùng 1 lúc đến 1 tài khoản để tiết kiệm phí giao dịch chẳng hạn :+1:

Lấy ví dụ về game trên Blockchain chẳng hạn. Giả sử bạn cần phát triển 1 game có rất nhiều loại vật phẩm khác nhau, với các chuẩn `ERC-20` và `ERC-721` thì mỗi vật phẩm cần được triển khai trên mỗi contract khác hay, hãy tưởng tượng game của bạn có đến hàng ngàn vật phẩm :scream:

Với  **ERC-1155**, tất cả các vật phẩm có trong game sẽ được triển khai trên cùng 1 smart contract, các vật phẩm được phân biệt với nhau theo một mã định danh `ID`.


## 2. Các tính năng nổi bật của ERC-1155

### Triển khai nhiều loại token trên 1 smart contract

Như đã đề cập ở ví dụ ở phần 1, chuẩn **ERC-1155** cho phép triển khai nhiều loại token trên cùng một smart contract, các loại token này có thể là `fungible` hoặc `non-fungible` tùy ý. TÍnh năng này rất hữu ích cho các Dapp cần quản lý nhiều loại token (như game chẳng hạn). Thay vì phải quản lý mỗi smart contract ứng với mỗi `items`, với  **ERC-1155** thì tất cả các `items` sẽ được xử lý ở một smart contract


### Gửi nhiều loại token cùng lúc (Batch Transfers)

Chuẩn **ERC-1155** cho phép chúng ta có thể chuyển cùng lúc nhiều loại token đến một tài khoản trong một giao dịch. Việc nhiều loại token được gửi cùng lúc trong 1 giao dịch giúp tiết kiệm chi phí và thời gian chờ đợi so với việc gửi lần lượt từng giao dịch một.



## 3. Source code interface ERC-1155

Ở phần này, chúng ta sẽ cùng nhau tìm hiểu chi tiết mã nguồn `interface` của  **ERC-1155**. Chức năng của các hàm cùng ý nghĩa của các tham số được chú thích đầy đủ ở phần comment trong source code.

### ERC1155

#### **IERC1155.sol**

```js
pragma solidity ^0.5.9;
/**
Smart contract muốn sử dụng chuẩn ERC-1155 phải implement interface ERC1155 và supportsInterface ERC165
*/

interface ERC1155 /* is ERC165 */ {
    /**
        event TransferSingle được emit khi chuyển 1 loại token
        `_operator` là địa chỉ (hay contract) có quyền thực hiện chuyển token (được `_from` ủy quyền) (`_operator` ở đây là msg.sender)
        `_from` là địa chỉ gửi token
        `_to` là địa chỉ nhận token
        `_id` loại token được chuyển
        `_value` lượng token được chuyển
        Với giao dịch tạo token, `_from` là địa chỉ `0x0`
        Với giao dịch hủy token, `_from` là địa chỉ `0x0`
    */
    event TransferSingle(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256 _id,
        uint256 _value
    );

    /**
        event TransferBatch được emit khi chuyển nhiều loại token
         `_operator` là địa chỉ (hay contract) được phê duyệt để thực hiện chuyển khoản (msg.sender)
        `_from` là địa chỉ gửi token
        `_to` là địa chỉ nhận token
        `_ids` là danh sách các loại token được gửi
        `_values` là danh sách số lượng token được gửi (ứng với từng loại token trong tham số `_ids` ở trên)
        Với giao dịch tạo token, `_from` là địa chỉ `0x0`
        Với giao dịch hủy token, `_from` là địa chỉ `0x0`
    */
    event TransferBatch(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256[] _ids,
        uint256[] _values
    );
    
    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );
 
    event URI(string _value, uint256 indexed _id);

    /**     
        Hàm thực hiện chuyển chuyển token
        revert nếu `_to` là địa chỉ `0x0`
        revert nếu số dư token bé hơn `_value`
        Emit event TransferSingle khi gửi
        @param _from    địa chỉ gửi
        @param _to      địa chủ nhận
        @param _id      ID của loại token
        @param _value   Số lượng token cần gửi
        @param _data    Additional data with no specified format, MUST be sent unaltered in call to `onERC1155Received` on `_to`
         Sau khi thỏa mãn các điều kiện tra, hàm sẽ kiểm tra xem địa chỉ `_to` có là địa chỉ      contract hay không (code size > 0) ?
        Nếu có thì phải gọi đến `onERC1155Received`  thuộc contract `_to`
    */
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external;

    /**                  
        Hàm gửi nhiều loại Token
        revert nếu `_to` là địa chỉ `0x0`
        revert nếu độ dài mảng `_ids` khác độ dài mảng `_values`
        revert nếu có trường hợp số lượng token gửi đi lớn hơn số token hiện có
        emit event `TransferSingle` hoặc `TransferBatch` tùy vào số lượng token gửi đi
        @param _from    địa chỉ gửi
        @param _to      địa chỉ nhận
        @param _ids     Danh sách ID của các loại token cần gửi
        @param _values  Số lượng từng loại token tương ứng cần gửi
        @param _data    
        Sau khi thỏa mãn các điều kiện tra, hàm sẽ kiểm tra xem địa chỉ `_to` có là địa chỉ       contract hay không (code size > 0) ?
        Nếu có thì phải gọi đến `onERC1155Received` hoặc `onERC1155BatchReceived` thuộc contract `_to`
    */
    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external;

    /**
        Hàm trả về số lượng token hiện có của tài khoản
        @param _owner  địa chỉ cần kiểm tra
        @param _id     id của loại token
     */
    function balanceOf(address _owner, uint256 _id)
        external
        view
        returns (uint256);

    /**
        Hàm trả về số lượng token hiện có của nhiều tài khoản
        @param _owners Danh sách các địa chỉ
        @param _ids    Danh sách id của token
     */
    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids)
        external
        view
        returns (uint256[] memory);

    /**
        Cho phép hoặc vô hiệu bên thứ 3 tham gia vào quá trình quản lý token
        emit event ApprovalForAll
        @param _operator  Địa chỉ được ủy quyền
        @param _approved  True là được ủy quyền, false là vô hiệu
    */
    function setApprovalForAll(address _operator, bool _approved) external;

    /**
        Truy vấn xem địa chỉ `_operator` có được ủy quyền với token của `_owner` không ?
        @param _owner     Chủ của token
        @param _operator  Địa chỉ được ủy quyền
       
    */
    function isApprovedForAll(address _owner, address _operator)
        external
        view
        returns (bool);
}
```

### ERC-1155 Token Receiver

Như đã đề cập ở phần trên, nếu địa chỉ nhận token là địa chỉ contract thì hàm chuyển token sẽ gọi đến hàm `onERC1155Received` hoặc `onERC1155BatchReceived` của contract nhận (tùy từng trường hợp). Nếu điều kiện thỏa mãn số dư token của contract nhận sẽ tăng, nếu không giao dịch sẽ bị **revert**. 

#### **IERC1155TokenReceiver.sol**
```js
pragma solidity ^0.5.9;

/**
    Note: The ERC-165 identifier for this interface is 0x4e2312e0.
*/
interface ERC1155TokenReceiver {
    /**
        @notice Hàm sẽ được gọi khi contract được nhận 1 loại token (`safeTransferFrom`). 
        @notice Xử lý việc nhận 1 loại token ERC1155
        @param _operator  Địa chỉ (hay contract) được phê duyệt để thực hiện chuyển khoản (msg.sender)
        @param _from      Địa chỉ gửi token
        @param _id        ID của loại token
        @param _value     Lượng token cần gửi
        @param _data      Dữ liệu bổ sung (không có định dạng cụ thể)
        @return giá trị trả về: bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)")
    */
    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data) external returns(bytes4);

    /**
        @notice Hàm sẽ được gọi khi contract được nhận nhiều loại token (`safeBatchTransferFrom`).
        @param _operator  Địa chỉ (hay contract) được phê duyệt để thực hiện chuyển khoản (msg.sender)
        @param _from      Địa chỉ gửi token
        @param _ids       Danh sách ID của các loại token được gửi
        @param _values    Danh sách lượng token cần gửi tương ứng với mỗi loại
        @param _data      Dữ liệu bổ sung (không có định dạng cụ thể)
        @return giá trị trả về: `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
    */
    function onERC1155BatchReceived(address _operator, address _from, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external returns(bytes4);      
```

## 4. Implement

Chúng ta cùng xem qua một ví dụ nhỏ về việc implement `interface` **ERC-1155**.

Ví dụ được tham khảo từ repo [Github](https://github.com/enjin/erc-1155)

#### **`ERC1155.sol`**
```js
pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Address.sol";
import "./Common.sol";
import "./IERC1155TokenReceiver.sol";
import "./IERC1155.sol";

contract ERC1155 is IERC1155, ERC165, CommonConstants {
    // Sử dụng thư viện SafeMath để tránh các trường hợp tràn số
    using SafeMath for uint256;
    using Address for address;

    // id => (owner => balance): mapping lưu số dư token các các tài khoản (id là ID của các loại token khác nhau)
    mapping(uint256 => mapping(address => uint256)) internal balances;

    // owner => (operator => approved)
    mapping(address => mapping(address => bool)) internal operatorApproval;

  
    // bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))
    bytes4 constant internal ERC1155_ACCEPTED = 0xf23a6e61;
    
  
    // bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
    bytes4 constant internal ERC1155_BATCH_ACCEPTED = 0xbc197c81; 
    
    // bytes4(keccak256('supportsInterface(bytes4)'));
    bytes4 private constant INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;

    /*
        bytes4(keccak256("safeTransferFrom(address,address,uint256,uint256,bytes)")) ^
        bytes4(keccak256("safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)")) ^
        bytes4(keccak256("balanceOf(address,uint256)")) ^
        bytes4(keccak256("balanceOfBatch(address[],uint256[])")) ^
        bytes4(keccak256("setApprovalForAll(address,bool)")) ^
        bytes4(keccak256("isApprovedForAll(address,address)"));
    */
    bytes4 private constant INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;

    function supportsInterface(bytes4 _interfaceId) public view returns (bool) {
        if (
            _interfaceId == INTERFACE_SIGNATURE_ERC165 ||
            _interfaceId == INTERFACE_SIGNATURE_ERC1155
        ) {
            return true;
        }

        return false;
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external {
        require(_to != address(0x0), "_to must be non-zero.");
        // Địa chỉ gửi token là địa chỉ gọi hàm (msg.sender) hoặc địa chỉ được ủy quyền bởi `_from`
        require(
            _from == msg.sender || operatorApproval[_from][msg.sender] == true,
            "Need operator approval for 3rd party transfers."
        );

        // Trừ số dư của `_from` và tăng số dư của `_to`
        balances[_id][_from] = balances[_id][_from].sub(_value);
        balances[_id][_to] = _value.add(balances[_id][_to]);

        // emit event
        emit TransferSingle(msg.sender, _from, _to, _id, _value);

        // Kiểm tra xem địa chỉ `_to` có là địa chỉ contract hay không (code size > 0) ?
        // Nếu có thì phải gọi `onERC1155Received`
        if (_to.isContract()) {
            _doSafeTransferAcceptanceCheck(
                msg.sender,
                _from,
                _to,
                _id,
                _value,
                _data
            );
        }
    }

    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external {
        require(_to != address(0x0), "destination address must be non-zero.");
        // mảng `_ids` của các token phải có độ dài bằng mảng `_values`
        require(
            _ids.length == _values.length,
            "_ids and _values array length must match."
        );
        // Địa chỉ gửi token là địa chỉ gọi hàm (msg.sender) hoặc địa chỉ được ủy quyền bởi `_from`
        require(
            _from == msg.sender || operatorApproval[_from][msg.sender] == true,
            "Need operator approval for 3rd party transfers."
        );

        // Duyệt mảng `_ids`, cộng trừ số dư token của các tài khoản
        for (uint256 i = 0; i < _ids.length; ++i) {
            uint256 id = _ids[i];
            uint256 value = _values[i];

            balances[id][_from] = balances[id][_from].sub(value);
            balances[id][_to] = value.add(balances[id][_to]);
        }

        // emit event
        emit TransferBatch(msg.sender, _from, _to, _ids, _values);

        // Kiểm tra xem địa chỉ `_to` có là địa chỉ contract hay không (code size > 0) ?
        // Nếu có thì phải gọi `onERC1155Received` hoặc `onERC1155BatchReceived`
        if (_to.isContract()) {
            _doSafeBatchTransferAcceptanceCheck(
                msg.sender,
                _from,
                _to,
                _ids,
                _values,
                _data
            );
        }
    }

    // Trả về số lượng token có id bằng `_id` của tài khoản `_owner`
    function balanceOf(address _owner, uint256 _id)
        external
        view
        returns (uint256)
    {
        return balances[_id][_owner];
    }

    // Trả về số lượng tất cả loại token của tài khoản `_owner`
    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids)
        external
        view
        returns (uint256[] memory)
    {
        require(_owners.length == _ids.length);

        uint256[] memory balances_ = new uint256[](_owners.length);

        for (uint256 i = 0; i < _owners.length; ++i) {
            balances_[i] = balances[_ids[i]][_owners[i]];
        }

        return balances_;
    }

    // Cho phép hoặc vô hiệu hóa việc tài khoản có địa chỉ `_operator` có quyền gửi token từ địa chỉ msg.sender
    function setApprovalForAll(address _operator, bool _approved) external {
        operatorApproval[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    // Kiểm tra xem `_operator` có quyền chuyển token của `_owner` hay không ?
    function isApprovedForAll(address _owner, address _operator)
        external
        view
        returns (bool)
    {
        return operatorApproval[_owner][_operator];
    }
    
    /* 
        Gọi đến hàm `onERC1155Received` của contract `_to`, so sánh gía trị trả về có bằng   `ERC1155_ACCEPTED` hay không, nếu không thì revert giao dịch.
    */
    function _doSafeTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes memory _data
    ) internal {
         
        require(
            ERC1155TokenReceiver(_to).onERC1155Received(
                _operator,
                _from,
                _id,
                _value,
                _data
            ) == ERC1155_ACCEPTED,
            "contract returned an unknown value from onERC1155Received"
        );
    }
    
      /* 
        Gọi đến hàm `onERC1155BatchReceived` của contract `_to`, so sánh gía trị trả về có bằng ` ERC1155_BATCH_ACCEPTED` hay không, nếu không thì revert giao dịch.
    */
    function _doSafeBatchTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _values,
        bytes memory _data
    ) internal {
     
        require(
            ERC1155TokenReceiver(_to).onERC1155BatchReceived(
                _operator,
                _from,
                _ids,
                _values,
                _data
            ) == ERC1155_BATCH_ACCEPTED,
            "contract returned an unknown value from onERC1155BatchReceived"
        );
    }
}
```

## Tài liệu tham khảo

[EIP-1155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md)

[ERC-1155: The Crypto Item Standard](https://blog.enjincoin.io/erc-1155-the-crypto-item-standard-ac9cf1c5a226)

https://blockonomi.com/erc1155-gaming-token/