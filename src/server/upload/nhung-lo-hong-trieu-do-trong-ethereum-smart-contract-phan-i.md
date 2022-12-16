Ethereum là một trong hai loại tiền điện tử lớn nhất hiện nay, với mức vốn hóa thị trường hơn 21 tỷ đô la. Sử dụng ngôn ngữ lập trình cấp cao Turing-Complete, Solidity, mọi người đang xây dựng các [hợp đồng thông minh](https://viblo.asia/p/blockchain-va-hop-dong-thong-minh-dang-thay-doi-nen-tai-chinh-cua-chung-ta-nhu-the-nao-naQZRXmq5vx) hàng ngày. Hiện đã có một lượng lớn ứng dụng chạy trên mạng chính, từ hệ thống Token đến ví, hợp đồng bảo hiểm rủi ro, xổ số, v.v ...Hợp đồng thông minh (Smart Contract) là một thiết kế cách mạng, cho phép triển khai mọi giao dịch mà không cần bên thứ ba xác nhận. Thiết kế này là một ứng dụng rất hữu ích trên nền tảng Blockchain. Tuy nhiên, nó sẽ hoàn hảo hơn nếu không bị vướng mắc phải các vấn đề về an ninh. Bài viết này sẽ đưa ra danh sách các cuộc tấn công smart contract đã được biết tới mà bạn nên chú ý và đề phòng  khi viết smart contract 

## **1. Reentrancy attack** (Tấn công Reentrancy)
Một cuộc tấn công reentrancy xảy ra khi kẻ tấn công rút tiền từ mục tiêu bằng cách gọi đệ quy chức năng rút tiền mục tiêu, như trường hợp của DAO. Khi contract không cập nhật trạng thái (số dư người dùng) trước khi gửi tiền, kẻ tấn công có thể liên tục gọi chức năng rút tiền để rút hết tiền trong contract. Bất cứ khi nào kẻ tấn công nhận Ether, contract của hắn tự động gọi fallback function (fallback function là một hàm không tên trong contract, được thực thi khi hàm gọi đến không trùng với bất cứ hàm nào trong contract, hoặc hàm gửi ether mà không chứa dữ liệu) ,  nơi lại gọi hàm rút tiền một lần nữa. Lúc này cuộc tấn công đi vào vòng lặp đệ quy và contract sẽ không thể cập nhật số dư của kẻ tấn công.

![](https://images.viblo.asia/6019738e-4648-490d-9033-8da8ae3ba291.png)
> DAO là một tổ chức được thiết kế để tự động hóa và phi tập trung.Mục tiêu của nó là mã hóa các quy tắc và bộ máy ra quyết định của một tổ chức, loại bỏ sự cần thiết của các tài liệu và con người trong quản lý, tạo ra một cấu trúc với sự kiểm soát phi tập trung.
> 
> Vào ngày 17 tháng 6 năm 2016, [DAO](https://www.coindesk.com/understanding-dao-hack-journalists) đã bị hack và 3,6 triệu Ether (tương đương 50 triệu đô la) đã bị đánh cắp bằng cách sử dụng cuộc tấn công reentrancy đầu tiên.
> 
> Ethereum Foundation sau đó đã ban hành một bản cập nhật quan trọng để khôi phục lại vụ hack. Điều này dẫn đến việc Ethereum được chia thành Ethereum Classic và Ethereum.
> 


### 1.1 Reentrancy on a Single Function (Reentrancy xảy ra trên một hàm đơn lẻ) 

Phiên bản đầu tiên được chú ý của loại lỗi này liên quan đến các hàm có thể được gọi lặp lại nhiều lần. Một hàm được gọi lặp đi lặp lại trước khi lời gọi hàm đầu tiên của nó hoàn tất.  Theo cách này, các lời gọi hàm liên tiếp sẽ phá vỡ tính toàn vẹn của dữ liệu nếu không được kiểm soát tốt.
Ví dụ:
```js
INSECURE
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    require(msg.sender.call.value(amountToWithdraw)()); // ở đây code của người gọi được thực thi, kẻ tấn công có thể  gọi withdrawBalance lần nữa
    userBalances[msg.sender] = 0;
}
```

Trong đoạn code bên trên, số dư tài khoản người dùng KHÔNG được thiết lập giá trị về 0 cho đến khi lời gọi hàm đầu tiên hoàn tất. Do đó, các lời gọi gọi thứ 2, thứ 3,... sẽ thực hiện rút tiền thành công ra khỏi tài khoản mà vẫn không chịu sự giới hạn nào.

Cách tốt nhất để ngăn ngừa việc này là sử dụng [`send()` thay vì `call.value()()`](https://consensys.github.io/smart-contract-best-practices/recommendations/#send-vs-call-value). Điều này sẽ hạn chế bất cứ hàm bên ngoài (external function) nào được thực thi.  `send()` cho phép chúng ta thực thi mã bên ngoài, nhưng việc giới hạn lượng gas quy định ở mức 2.300 gas, nó chỉ đủ để ghi lại một sự kiện, nhưng không đủ để khởi động một cuộc tấn công. Bên cạnh đó `send()` sẽ tự động revert nếu gửi thất bại. Trong khi  `call()` không giới hạn lượng gas quy định nên nó không an toàn với reentrancy.

Mặc dù vậy, nếu bạn không thể loại bỏ các external call thì một cách đơn giản khác là đảm bảo không gọi bất cứ external function nào cho đến khi tất cả các công việc nội bộ (internal work) được thực thi. 

```js
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    userBalances[msg.sender] = 0;
    require(msg.sender.call.value(amountToWithdraw)()); // Tài khoản người dùng đã bị chuyển về 0 trước đó nên các lệnh về sau sẽ không rút thêm được gì
}
```

Lưu ý rằng nếu bạn có một hàm khác gọi đến `withdrawBalance()` thì nó cũng sẽ thành mục tiêu của cuộc tấn công tương tự, chính vì vậy bất cứ function nào gọi đến một contract không đáng tin cậy cũng phải bị coi là không đáng tin cậy. (Xem tiếp bên dưới để thảo luận về các giải pháp tiềm năng).

### 1.2 Cross-function Reentrancy (Reentrancy xảy ra liên hàm)

Ngoài cách trên kẻ tấn công cũng có thể thực hiện các cuộc tấn công tương tự sử dụng 2 function khác nhau có chung trạng thái (state).

```js
// INSECURE
mapping (address => uint) private userBalances;

function transfer(address to, uint amount) {
    if (userBalances[msg.sender] >= amount) {
       userBalances[to] += amount;
       userBalances[msg.sender] -= amount;
    }
}

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    require(msg.sender.call.value(amountToWithdraw)()); // Ở đây code của người gọi hợp đồng được thực thi, có thể gọi hàm transfer()
    userBalances[msg.sender] = 0;
}
```

Trong trường hợp này, kẻ tấn công gọi hàm `transfer ()` khi mã nguồn của chúng đang được thực thi trên lời gọi hàm bên ngoài  (external call)  thông qua phương thức withdrawBalance() . Vì số dư của kẻ tấn công chưa được đặt thành 0, nên hắn có thể tiếp tục chuyển tiền về tài khoản của hắn bằng lời gọi hàm transfer () mặc dù hắn đã nhận được khoản rút tiền thông qua hàm withdrawBalance(). Lỗ hổng này cũng được sử dụng trong cuộc tấn công DAO.

Lưu ý rằng trong ví dụ trên cả 2 hàm đều được viết trong cùng một contract. Tuy nhiên lỗi tương tự cũng xảy ra với nhiều contracts nếu các contracts đó chia sẻ cùng trạng thái.

### **1.3 Pitfalls in Reentrancy Solutions ( Cạm bẫy trong các giải pháp xử lí Reentrancy )**

Bởi vì reentrancy có thể xảy ra trên nhiều hàm, thậm chí là nhiều contracts, chính vì vậy bất cứ giải pháp nào nhằm ngăn chặn reentrancy với một hàm duy nhất sẽ là không đủ.

Thay vào đó chúng tôi khuyến nghị **hoàn thành tất cả các viêc nội bộ ( internal work)  trước ( ví dụ thay đổi trạng thái), và sau đó mới gọi các hàm bên ngoài ( external function).**  Nếu tuân thủ theo quy tắc này một cách cẩn thận sẽ cho phép bạn tránh các lỗ hổng bảo mật do reentrancy. Tuy nhiên bạn không chỉ cần tránh gọi các external function quá sớm mà còn cần tránh các function gọi các external function. Ví dụ sau đây là không an toàn:
```js
// INSECURE
mapping (address => uint) private userBalances;
mapping (address => bool) private claimedBonus;
mapping (address => uint) private rewardsForA;

function withdrawReward(address recipient) public {
    uint amountToWithdraw = rewardsForA[recipient];
    rewardsForA[recipient] = 0;
    require(recipient.call.value(amountToWithdraw)());
}

function getFirstWithdrawalBonus(address recipient) public {
    require(!claimedBonus[recipient]); // Each recipient should only be able to claim the bonus once

    rewardsForA[recipient] += 100;
    withdrawReward(recipient); // At this point, the caller will be able to execute getFirstWithdrawalBonus again.
    claimedBonus[recipient] = true;
}
```

Mặc dù `getFirstWithdrawalBonus()` không trực tiếp gọi đến một external contract, phép gọi trong `withdrawReward()` cũng đủ khiến nó dễ bị tấn công với reentrancy. Do đó bạn phải coi `withdrawReward()` cũng không đáng tin cậy.

```js
mapping (address => uint) private userBalances;
mapping (address => bool) private claimedBonus;
mapping (address => uint) private rewardsForA;

function untrustedWithdrawReward(address recipient) public {
    uint amountToWithdraw = rewardsForA[recipient];
    rewardsForA[recipient] = 0;
    require(recipient.call.value(amountToWithdraw)());
}

function untrustedGetFirstWithdrawalBonus(address recipient) public {
    require(!claimedBonus[recipient]); // Each recipient should only be able to claim the bonus once

    claimedBonus[recipient] = true;
    rewardsForA[recipient] += 100;
    untrustedWithdrawReward(recipient); // claimedBonus has been set to true, so reentry is impossible
}
```

Trong contract trên ngoài việc sửa lỗi giúp ngăn ngừa reentrancy, [các function không đáng tin cậy được đánh dấu](https://consensys.github.io/smart-contract-best-practices/recommendations/#mark-untrusted-contracts). Mô hình tương tự được lặp lại ở mọi cấp độ; bởi vì `untrustedGetFirstWithdrawalBonus` gọi `untrustedWithdrawReward`, nơi gọi đến external function. Chính vì vậy `untrustedGetFirstWithdrawalBonus` cũng bị coi là không an toàn.

Một giải pháp khác thường được khuyến khích đó là sử dụng [mutex](https://en.wikipedia.org/wiki/Mutual_exclusion). Điều này cho phép bạn "khóa" một vài trạng thái mà chỉ có thể bị thay đổi bởi chủ khóa. Sau đây là một ví dụ đơn giản:

```js
// Note: This is a rudimentary example, and mutexes are particularly useful where there is substantial logic and/or shared state
mapping (address => uint) private balances;
bool private lockBalances;

function deposit() payable public returns (bool) {
    require(!lockBalances);
    lockBalances = true;
    balances[msg.sender] += msg.value;
    lockBalances = false;
    return true;
}

function withdraw(uint amount) payable public returns (bool) {
    require(!lockBalances && amount > 0 && balances[msg.sender] >= amount);
    lockBalances = true;

    if (msg.sender.call(amount)()) { // Normally insecure, but the mutex saves it
      balances[msg.sender] -= amount;
    }

    lockBalances = false;
    return true;
}
```

Nếu người dùng cố gọi lại hàm `withdraw()` trước khi lần gọi đầu kết thúc thì "khóa" sẽ ngăn cho nó không có hiệu lực. Đây có thể là một mô hình hiệu quả, tuy nhiên nó lại trở nên khó khăn khi có nhiều contracts cùng hợp tác. Chúng ta cùng xem xét ví dụ sau đây:

```js 
// INSECURE
contract StateHolder {
    uint private n;
    address private lockHolder;

    function getLock() {
        require(lockHolder == address(0));
        lockHolder = msg.sender;
    }

    function releaseLock() {
        require(msg.sender == lockHolder);
        lockHolder = address(0);
    }

    function set(uint newState) {
        require(msg.sender == lockHolder);
        n = newState;
    }
}
```

Ở đây kẻ tấn công có thể `getLock()` và sau đó không bao giờ gọi `releaseLock()`. Nếu chúng làm vậy thì contract sẽ bị khóa vĩnh viễn và không thể thay đổi thêm nữa. Thế nên nếu bạn sử dụng mutex để bảo vệ contracts khỏi reentrancy, bạn sẽ phải cần cẩn thận để đảm bảo rằng không có cách nào mà khóa được thực thi rồi không bao giờ mở ra. ( Ngoài ra mutexes còn ẩn chứa nhiều nguy cơ tiềm ẩn khác, chẳng hạn như deadlocks và livelocks. Bạn nên tham khảo trước một lượng lớn tài liệu đã được viết trên mutexes nếu quyết định đi theo con đường này.) 

## 2. Integer Overflow and Underflow (Tấn công Overflow và Underflow trên smart contract)

Xem xét hợp đồng chuyển token đơn giản sau

```js
mapping (address => uint256) public balanceOf;

// INSECURE
function transfer(address _to, uint256 _value) {
    /* Check if sender has balance */
    require(balanceOf[msg.sender] >= _value);
    /* Add and subtract new balances */
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
}

// SECURE
function transfer(address _to, uint256 _value) {
    /* Check if sender has balance and for overflows */
    require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);

    /* Add and subtract new balances */
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
}
```

Lỗi overflow xảy ra khi một số có giá trị vượt quá giá trị tối đa được khai báo. Như ví dụ trên nếu balance chạm ngưỡng tối đã uint value (2^256) nó sẽ quay lại về 0 . Tùy vào từng trường hợp thì điều này có thể sẽ gây nguy hiểm nhất định.  Ta phải xem xét đến việc liệu giá trị của uint có cơ hội tiệm cận một giá trị lớn như vậy hay không cũng như cách thay đổi biến uint và ai có thẩm quyền để thực hiện những thay đổi đó. Nếu bất cứ người dùng nào có thể gọi hàm cập nhật giá trị uint thì nó sẽ dễ dàng bị tấn công. Tuy nhiên nếu chỉ có quản trị viên có quyền truy cập để thay đổi trạng thái của biến thì nó lại an toàn. Hoặc nếu người dùng có thể tăng giá trị uint lên 1 mỗi lần gọi thì nó cũng an toàn vì không có cách nào khả thi để đạt đến giới hạn lớn như thế này.

Điều tương tự cũng đúng với underflow. Nếu một giá trị uint nhỏ hơn 0 nó sẽ gây ra underflow và được gán giá trị tối đa của nó.

Hãy cẩn thận với những giá trị dữ liệu nhỏ hơn như uint8, uint16, uint24,...; Chúng thậm chí còn dễ dàng chạm mức tối đa hơn.

> Lưu ý  với [20 trường hợp về overflow và underflow](https://github.com/ethereum/solidity/issues/796#issuecomment-253578925)
>

Một giải pháp đơn giản để giảm thiểu các lỗi phổ biến đối với overflow và underflow là sử dụng thư viện [SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol) cho các hàm số học

### **Underflow in Depth: Storage Manipulation**

Lỗi underflow thường dễ xảy ra hơn so với overflow, bởi vì rất khó để một người nào đó nhận đủ số lượng token yêu cầu để gây ra overflow. [Một bài dự thi của Doug Hoyte](https://github.com/Arachnid/uscc/tree/master/submissions-2017/doughoyte) trong một cuộc thi ngầm vào năm 2017 đã nhận được một đề cử vinh danh bởi vì nó làm tăng mối lo ngại về cách mà C-like underflow có thể ảnh hưởng đến Solidity storage. Dưới đây là một bản đơn giản hóa:
```js
contract UnderflowManipulation {
    address public owner;
    uint256 public manipulateMe = 10;
    function UnderflowManipulation() {
        owner = msg.sender;
    }

    uint[] public bonusCodes;

    function pushBonusCode(uint code) {
        bonusCodes.push(code);
    }

    function popBonusCode()  {
        require(bonusCodes.length >=0);  // this is a tautology
        bonusCodes.length--; // an underflow can be caused here
    }

    function modifyBonusCode(uint index, uint update)  {
        require(index < bonusCodes.length);
        bonusCodes[index] = update; // write to any index less than bonusCodes.length
    }

}
```
Nhìn chung thì vị trí của biến `manipulateMe` không thể bị ảnh hưởng nếu không đi qua hàm keccak256, điều mà gần như không khả thi. Tuy nhiên bởi vì mảng động được lưu trữ tuần tự, nếu một tác nhân độc hại muốn thay đổi `manipulateMe` thì tất cả những gì cần làm là:
* Gọi `popBonusCode` tới underflow (Lưu ý: phương thức `array.pop()` được thêm vào solidity 0.5.0)
* Tính toán vị trí lưu trữ của `manipulateMe`
* Sửa đổi và cập nhật giá trị của `manipulateMe` sử dụng `modifyBonusCode`
 
> Trong thực tế, rõ ràng việc chỉ ra tất cả các lỗi trong các hàm riêng biệt là rất đơn giản, tuy nhiên, hãy tưởng tượng với một hợp đồng thông minh dài và phức tạp với hàng ngàn dòng mã rất dễ dàng để bỏ qua một lỗi như vậy khi kiểm tra.
> 

> 4chan / biz / tạo ra “Proof of Weak Hands Coin” hoặc POWH. Đó là một chương trình Ponzi, tuy nhiên, mọi người vẫn mua nó và giá trị vốn hóa của nó đã tăng lên hơn một triệu đô la. Các nhà phát triển POWH không đảm bảo tất cả các hoạt động an toàn và không thể đưa ra các biện pháp phòng thủ phù hợp chống lại các cuộc tấn công underflow và overflow. Vì lý do này, một hacker không rõ danh tính đã lấy đi một số tiền trị giá 2000 ETH ~ 2,3 triệu đô la.
Khi cân nhắc việc sử dụng `dynamic array` thì nên thực hành cấu trúc dữ liệu container, ngoài ra các bài viết của Solidity CRUD phần 1 và phần 2 cũng là một nguồn tài liệu không tồi.

    
## 3. DoS with (Unexpected) revert (Tấn công từ chối dịch vụ với hoàn trả không mong đợi)
Chúng ta cùng xem xét ví dụ về một contract đấu giá sau:
```js
// INSECURE
contract Auction {
    address currentLeader;
    uint highestBid;

    function bid() payable {
        require(msg.value > highestBid);

        require(currentLeader.send(highestBid)); // Refund the old leader, if it fails then revert

        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}
```
Nếu kẻ tấn công trả giá bằng cách sử dụng smart contract có chứa fallback function hoàn trả (revert ) bất cứ khoản thanh toán nào thì chúng sẽ chiến thắng trong mọi cuộc đấu giá. Trong ví dụ trên khi contract cố trả lại tiền cho người trả giá cao nhất trước đó, nó sẽ bị revert nếu như trả lại tiền thất bại. Điều này có nghĩa là một kẻ tấn công trong vai người đấu giá sẽ trở thành người trả giá cao nhất nếu như chúng đảm bảo việc trả lại tiền về địa chỉ ví của chúng luôn thất bại. Bằng cách này chúng sẽ ngăn bất cứ ai khác gọi đến hàm `bid()` và sẽ luôn luôn là người trả giá cao nhất. Một khuyến nghị là thiết lập một hệ thống [pull payment system](https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls) thay thế.

Một ví dụ khác là khi contract có thể duyệt qua một mảng để trả tiền cho người dùng (ví dụ như những người ủng hộ trong một contract gây quỹ cộng đồng). Điều thông thường là muốn đảm bảo rằng mỗi khoản thanh toán đều thành công, nếu không sẽ revert. Vấn đề ở đây là nếu một trường hợp thất bại, bạn sẽ revert toàn bộ hệ thống, nghĩa là vòng lặp sẽ không bao giờ được hoàn thành. Không ai được trả tiền nếu một địa chỉ trong mảng dính lỗi.
```js
address[] private refundAddresses;
mapping (address => uint) public refunds;

// bad
function refundAll() public {
    for(uint x; x < refundAddresses.length; x++) { // arbitrary length iteration based on how many addresses participated
        require(refundAddresses[x].send(refunds[refundAddresses[x]])) // doubly bad, now a single failure on send will hold up all funds
    }
}
```
Giải pháp được đề xuất sẽ là [favor pull over push payment](https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls)

External calls có thể thất bại một cách vô tình hoặc có chủ ý. Để giảm thiểu thiệt hại có thể gây ra bởi lỗi trên thì giải pháp đề ra là cho phép người dùng rút tiền thay vì tự động chuyển tiền cho họ, ( điều này cũng giảm sự cố với gas limit - vấn đề được nói ngay sau ) và tránh kết hợp nhiều hàm gọi `transfer()` trong một giao dịch đơn lẻ.
Xem xét ví dụ sau:
```js
// bad
contract auction {
    address highestBidder;
    uint highestBid;

    function bid() payable {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            highestBidder.transfer(highestBid); // if this call consistently fails, no one else can bid
        }

       highestBidder = msg.sender;
       highestBid = msg.value;
    }
}

// good
contract auction {
    address highestBidder;
    uint highestBid;
    mapping(address => uint) refunds;

    function bid() payable external {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            refunds[highestBidder] += highestBid; // record the refund that this user can claim
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function withdrawRefund() external {
        uint refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        msg.sender.transfer(refund);
    }
}
```
## 4. DoS with Block Gas Limit (Tấn công từ chối dịch vụ với giới hạn gas của block)
Mỗi block đều có giới hạn trên về lượng gas mà chúng sẽ sử dụng, nhờ đó mà khối lượng tính toán mới được hoàn thành. Đây là giới hạn gas của một block (Block Gas Limit). Nếu số gas sử dụng vượt quá giới hạn này thì giao dịch sẽ thất bại. Điều này dẫn đến hai khả năng tấn công từ chối dịch vụ (Denial of Service):
### 4.1 Gas Limit DoS on a Contract via Unbounded Operations 
Bạn có thể nhận thấy rằng một vấn đề khác trong ví dụ trước: bằng cách thanh toán cho nhiều người cùng lúc, ta có nguy cơ đến giới hạn về gas của block.

Điều này có thể dẫn đến các vấn đề ngay cả khi không có các cuộc tấn công có chủ ý. Tuy nhiên vấn đề sẽ trở nên nghiêm trọng hơn nếu kẻ tấn công thao túng được một lượng gas cần thiết. Trong trường hợp của ví dụ trước, kẻ tấn công có thể thêm một loạt địa chỉ, mỗi địa chỉ cần được hoàn tiền lại với một lượng rất nhỏ. Việc đó dẫn đến chi phí gas dùng cho việc hoàn trả từng địa chỉ của kẻ tấn công có thể vượt quá giới hạn gas và ngăn chặn việc hoàn lại tiền trên toàn hệ thống.

Đây lại là một lí do khác cho [favor pull over push payments.](https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls)

Nếu bạn bắt buộc phải lặp một mảng có kích thước không xác định thì bạn nên lập trình cho nó có khả năng thực hiện nhiều khối, từ đó yêu cầu nhiều giao dịch. Cần kiểm tra xem mảng đã đi được bao xa để có thể tiếp tục từ điểm đó như trong ví dụ dưới đây:
```js
struct Payee {
    address addr;
    uint256 value;
}

Payee[] payees;
uint256 nextPayeeIndex;

function payOut() {
    uint256 i = nextPayeeIndex;
    while (i < payees.length && msg.gas > 200000) {
      payees[i].addr.send(payees[i].value);
      i++;
    }
    nextPayeeIndex = i;
}
```
Ngoài ra cần phải đảm bảo thêm không có gì xấu xảy ra nếu các giao dịch khác được xử lí trong khi đợi đến lần lặp tiếp theo của hàm `payOut()`. Vì vậy hãy chỉ sử dụng mô hình này khi thực sự cần thiết.

### 4.2 Gas Limit DoS on the Network via Block Stuffing
Ngay cả khi contract của bạn không chứa vòng lặp bị ràng buộc, kẻ tấn công có thể ngăn các giao dịch khác được đưa vào một số blocks của blockchain bằng cách đặt các giao dịch tính toán phức tạp với gas price đủ cao.

Để làm được điều này, kẻ tấn công có thể tạo ra một số giao dịch tiêu thụ toàn bộ giới hạn gas, với gas price sẽ được đưa ngay khi biock tiếp theo được khai thác. Không có gas price nào có thể đảm bảo cho việc được đưa vào trong block, nhưng gas price càng cao thì cơ hội càng cao.

Nếu cuộc tấn công thành công thì sẽ không có giao dịch nào khác được đưa vào block. Đôi khi mục tiêu của kẻ tấn công là chặn các giao dịch vào một hợp đồng cụ thể trước thời gian cụ thể. Trường hợp sau đây sẽ giúp bạn hình dung rõ hơn:

>  Loại tấn công này đã được thực hiện trên[ Fomo3D](https://solmaz.io/2018/10/18/anatomy-block-stuffing/), một ứng dụng gambling. Ứng dụng được thiết kế để thưởng cho địa chỉ cuối cùng đã mua "key". Mỗi lần mua key mở sẽ gia tăng thời gian, trò chơi kết thúc khi thời gian về 0. Kẻ tấn công đã mua một "key" sau đó nhồi 13 blocks liên tiếp cho đến khi bộ đếm thời gian kích hoạt và thanh toán được giải phóng. Các giao dịch được gửi bởi kẻ tấn công đã lấy 7,9 triệu gas trên mỗi block, do đó gas limit cho phép một vài giao dịch gửi nhỏ (21.000 gas mỗi lần), nhưng sẽ không cho phép bất cứ ai gọi đến hàm buyKey()` ( tốn 300.000 gas).`
 
Một cuộc tấn công Block Stuffing có thể được sử dụng trên bất kỳ contract nào yêu cầu một hành động trong một khoảng thời gian nhất định. Tuy nhiên, như với bất kỳ cuộc tấn công nào, nó chỉ có lợi nhuận khi phần thưởng dự kiến vượt qua chi phí của nó. Chi phí của cuộc tấn công này tỷ lệ thuận với số blocks cần nhồi. Nếu một khoản thanh toán lớn có thể có được bằng cách ngăn chặn các hành động từ những người tham gia khác, contract của bạn có thể sẽ bị nhắm mục tiêu bởi một cuộc tấn công tương tự như vậy.



## Documentation
https://consensys.github.io/smart-contract-best-practices/known_attacks/