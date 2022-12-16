![](https://images.viblo.asia/07b874b6-3d98-443c-afb7-8a9d882a4a72.png)

## 1. Đặt vấn đề

Giả sử chúng ta sắp phát hành 1 đồng **ERC-20** trên Ethereum và cần **Airdrop** cho 1 cơ số người dùng ban đầu, nhằm tăng số người giữ token cũng như quảng bá rộng hơn cho đồng token sắp phát hành.

Về cơ bản, chúng ta sẽ cần thực hiện các bước sau để xây dựng tính năng **Airdrop**:
1. Tất nhiên là phải deploy contract token **ERC-20** trước.
2. Viết contract **Airdrop**: Contract lưu danh sách các địa chỉ đăng ký nhận token. Sau khi hết đợt đăng ký **Airdrop** thì người dùng có thể gọi đến contract để claim token.
3. Ngoài ra chúng ta có thể xây dựng thêm bot (vd như bot Telegram) để tracking người dùng với điều kiện follow page, share bài viết. v..v để đăng ký được **Airdrop**.

### Merkle Airdrop

Với cách thiết kế contract **Airdrop** ở trên, chúng ta có 1 vấn đề.  Với các đợt  **Airdrop**, số người đăng ký nhận token tùy theo quy mô có thể dao động từ hàng trăm, hàng nghìn hay thậm chí là hàng vạn người :scream:. 

Phí lưu trữ cũng như phí giao dịch của **Ethereum** hiện tại không hề rẻ một chút nào, các bạn hãy tưởng tượng 1 array trong contract lưu đến hàng ngàn địa chỉ đăng ký thì sẽ rất tốn kém, chưa kể đến các giao dịch thêm mới địa chỉ vào array nữa. Nói chung, giải pháp thiết kế contract **Airdrop** như trên là không hề tối ưu một chút nào cho ví tiền của bạn :disappointed_relieved:.

Với **Merkle Airdrop**, chúng ta sẽ không phải lo lắng việc phải lưu 1 lượng lớn địa chỉ đăng ký vào contract nữa, trong khi đó vẫn đảm bảo được việc xác minh xem địa chỉ claim đã đăng ký trước đó hay chưa ? Từ đó tiết kiệm được rất nhiều chi phí trong việc **Airdrop**.

## 2. Cơ sở lý thuyết

### Merkle Tree

**Merkle Tree** đơn giản là một cấu trúc dữ liệu dạng cây nhị phân, giá trị của các nút, các lá là mã hash của dữ liệu.

Để tạo ra một **Merkle Tree**, từ dữ liệu chúng ta có, dùng hàm hash để tính toán ra giá trị hash tương ứng của dữ liệu, các giá trị này sẽ là nút lá của cây. Tiếp tục hash các giá trị liền kề nhau đến khi còn 1 giá trị hash duy nhất (Gốc của cây Merkle). Hình bên dưới mô tả cách mà một **Merkle Tree** được tính toán như thế nào ?

![](https://images.viblo.asia/419a1c0e-6ebd-4342-80b6-782ebfbc3179.jpg)

**Merkle Tree** giúp việc xác minh, kiểm tra tính toàn vẹn dữ liệu trong khi chỉ tốn 1 lượng nhỏ không gian lưu trữ (do mã hash có kích thước bé).  Trong Blockchain, **Merkle Tree** được dùng rất phổ biến nhằm xác minh các giao dịch (Dùng trong Bitcoin, Ethereum, v..v)


### Merkle Proof

**Merkle Proof** dùng để kiểm tra xem dữ liệu đầu vào có thuộc  **Merkle Tree** hay không mà không cần phải tiết lộ các dữ liệu tất cả dữ liệu tạo thành  **Merkle Tree**.

![](https://images.viblo.asia/b66f93c4-6e31-466c-a614-280e12b4aed7.png)

Chúng ta cùng xem qua ví dụ được minh họa ở hình trên để có thể nắm rõ **Merkle Proof**  là gì ? Trong ví dụ này chúng ta cần chứng minh rằng dữ liệu **K** thuộc **Merkle Tree**. Ta cần tính Hash của **K** rồi leo dần lên gốc của **Merkle Tree**, nếu giá trị của gốc **Merkle Tree** tính được trùng với giá trị **Merkle Root** cho trước thì chứng tỏ **K** thuộc **Merkle Tree**.

Thay vì phải dùng tất cả data từ A-P để tính toán lại **Merkle Root** xem có giống **Merkle Root** ban đầu không ? Ta sẽ chỉ cần lấy các nút sau của cây để chứng K thuộc **Merkle Tree**.

- Hash của **L** từ đó tính được hash **KL**
- Hash của **HJ** từ đó tính được hash **IJKL**
- Hash của **MNOP** từ đó tính được hash **IJKLMNOP**
- Hash của **ABCDEFGH**

Từ đó ta hoàn toàn tính được **Merkle Root** mà chỉ cần biết 4 giá trị nút trong **Merkle Tree**

## 3. Merkle Airdrop

Luồng cơ bản mà chúng ta sẽ implement **Airdrop** như sau

- Cho người dùng đăng ký airdrop và lưu danh sách dưới dạng như sau (Chúng ta có thể lưu ở server, cloud hay IPFS gì đó tùy ý). Giá trị thứ nhất là địa chỉ đăng ký và thứ 2 là số lượng token airdrop cho địa chỉ đó.
```
0x19171a5da52276b6a034CB859ddA1e905739F8B2 10000000000000000000
0x04d1eC716Fe9AC219D59b9E4f0D64D3B4339642e 10000000000000000000
0x14C06EC9402f7CD52dd0AF02979a350EAF133F76 10000000000000000000
```
- Sau khi kết thúc thời gian đăng ký airdrop, từ danh sách ở trên, chúng ta tính toán ra **Merkle Root** và lưu trên smart contract.
- Dựa vào số lượng người đăng ký airdrop, chúng ta sẽ gửi số lượng token **ERC-20** tương ứng vào smart contract **Merkle Airdrop** để có thể airdrop cho người dùng.
- Người dùng sau đó sẽ gọi đến contract **Merkle Airdrop** để claim về lượng token đã đăng ký. Dựa vào **Merkle Proof**, contract sẽ tính toán liệu xem địa chỉ này đã đăng ký airdrop hay chưa và số lượng token claim có thỏa mãn hay không ? Nếu đúng thì contract sẽ gửi lượng token tương ứng cho người dùng.

### Ví dụ cụ thể

Bên chúng tôi cũng đã có xây dựng 1 trang Airdrop và cho đến nay vẫn đang hoạt động khá ổn.

**Đăng ký**: Người dùng sẽ đăng ký nhận airdrop thông qua **BOT trên Telegram** với một số điều kiện như join box chat Telegram, follow twitter hay retweet. Khi người dùng hoàn thành các bước đăng ký thì con BOT sẽ gọi đến server **Node.js** và lưu thông tin của người dùng vào **MongoDB**.

![](https://images.viblo.asia/337f4aee-4ceb-4d6a-be92-c1495b5d33ac.png)

**Claim**: Sau khi đóng đăng ký airdrop và cho phép người dùng claim token. Người dùng sẽ vào trang airdrop. Server sẽ tính toán và trả về **Merkle Proof** dựa trên address của người dùng. Sau đó, người dùng ký giao dịch gọi đến smart contract để claim, nếu người dùng đã đăng ký trước đó thì sẽ nhận được token khi hoàn thành giao dịch.

![](https://images.viblo.asia/419bed80-8892-4817-ad3a-af840cc8d440.png)



## 4. Smart contract

```js
// MerkleAirdrop.sol
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PhoneAirdrop is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    event Claimed(address claimant, uint256 week, uint256 balance);
    event TrancheAdded(uint256 tranche, bytes32 merkleRoot, uint256 totalAmount);
    event TrancheExpired(uint256 tranche);
    event RemovedFunder(address indexed _address);

    IERC20 public token;

    mapping(uint256 => bytes32) public merkleRoots;
    mapping(uint256 => mapping(address => bool)) public claimed;
    uint256 public tranches;

    constructor(IERC20 _token) public {
        token = _token;
    }

    function seedNewAllocations(bytes32 _merkleRoot, uint256 _totalAllocation)
        public
        onlyOwner
        returns (uint256 trancheId)
    {
        token.safeTransferFrom(msg.sender, address(this), _totalAllocation);

        trancheId = tranches;
        merkleRoots[trancheId] = _merkleRoot;

        tranches = tranches.add(1);

        emit TrancheAdded(trancheId, _merkleRoot, _totalAllocation);
    }

    function expireTranche(uint256 _trancheId)
        public
        onlyOwner
    {
        merkleRoots[_trancheId] = bytes32(0);

        emit TrancheExpired(_trancheId);
    }

    function claimWeek(
        address _liquidityProvider,
        uint256 _tranche,
        uint256 _balance,
        bytes32[] memory _merkleProof
    )
        public
    {
        _claimWeek(_liquidityProvider, _tranche, _balance, _merkleProof);
        _disburse(_liquidityProvider, _balance);
    }


    function claimWeeks(
        address _liquidityProvider,
        uint256[] memory _tranches,
        uint256[] memory _balances,
        bytes32[][] memory _merkleProofs
    )
        public
    {
        uint256 len = _tranches.length;
        require(len == _balances.length && len == _merkleProofs.length, "Mismatching inputs");

        uint256 totalBalance = 0;
        for(uint256 i = 0; i < len; i++) {
            _claimWeek(_liquidityProvider, _tranches[i], _balances[i], _merkleProofs[i]);
            totalBalance = totalBalance.add(_balances[i]);
        }
        _disburse(_liquidityProvider, totalBalance);
    }


    function verifyClaim(
        address _liquidityProvider,
        uint256 _tranche,
        uint256 _balance,
        bytes32[] memory _merkleProof
    )
        public
        view
        returns (bool valid)
    {
        return _verifyClaim(_liquidityProvider, _tranche, _balance, _merkleProof);
    }

    function _claimWeek(
        address _liquidityProvider,
        uint256 _tranche,
        uint256 _balance,
        bytes32[] memory _merkleProof
    )
        private
    {
        require(_tranche < tranches, "Week cannot be in the future");

        require(!claimed[_tranche][_liquidityProvider], "LP has already claimed");
        require(_verifyClaim(_liquidityProvider, _tranche, _balance, _merkleProof), "Incorrect merkle proof");

        claimed[_tranche][_liquidityProvider] = true;

        emit Claimed(_liquidityProvider, _tranche, _balance);
    }


    function _verifyClaim(
        address _liquidityProvider,
        uint256 _tranche,
        uint256 _balance,
        bytes32[] memory _merkleProof
    )
        private
        view
        returns (bool valid)
    {
        bytes32 leaf = keccak256(abi.encodePacked(_liquidityProvider, _balance));
        return MerkleProof.verify(_merkleProof, merkleRoots[_tranche], leaf);
    }


    function _disburse(address _liquidityProvider, uint256 _balance) private {
        if (_balance > 0) {
            token.safeTransfer(_liquidityProvider, _balance);
        } else {
            revert("No balance would be transferred - not going to waste your gas");
        }
    }
}
```

Chúng ta cùng tìm hiểu một chút về logic của contract **Merkle Airdrop**
- Biến `tranches` lưu id của đợt Airdrop (chúng ta có thể mở nhiều đợt airdrop khác nhau)
- Mapping `merkleRoots` lưu giá trị  **Merkle Root** của đợt Airdrop tương ứng.
- Mapping `claimed` dùng để check xem trong đợt airdrop cụ thể thì địa chỉ đó đã claim hay chưa ?
- Hàm `seedNewAllocations` là hàm init đợt Airdrop, sau khi kết thúc đăng ký airdrop thì owner của contract sẽ gọi đến hàm này để chuyển token vào contract cũng như lưu giá trị  **Merkle Root**.
- Hàm private `_claimWeek` sẽ check các điều kiện xem địa chỉ của user đã claim hay chưa ? id `tranches`có hợp lệ hay không ?
- Hàm `_verifyClaim` sẽ dựa vào  **Merkle Proof** người dùng gửi lên để tính toán xem địa chỉ có đúng là đã đăng ký airdrop hay chưa ?
- Cuối cùng là hàm `_disburse` là hàm sẽ gửi token từ contract đến cho người dùng khi tất cả các điều kiện đã được thỏa mãn.


## Tài liệu tham khảo

[Evolution of Airdrop: from Common Spam to the Merkle Tree](https://hackernoon.com/evolution-of-airdrop-from-common-spam-to-the-merkle-tree-30caa2344170)

[Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)

[Merkle proofs Explained](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)