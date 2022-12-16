![](https://images.viblo.asia/2b3456f0-567a-471a-a81d-3411c9006d34.jpg)

Gần đây, mình có nghe được anh em trong team kháo nhau về một khái niệm mới đó là `Flash Loan`. Vay nóng crypto rồi đem đi đắp chỗ khác, tìm cách ăn chêch lệch để kiếm lời. Chợt nghĩ, lỡ như vay xong không trả thì sao :thinking:, rồi lại nghe nói tất cả chỉ diễn ra trong 1 giao dịch :scream: Làm thế nào mà hay dợ ? Vay xong rồi trading, swap đi khắp thế gian và cuối cùng hoàn trả mà chỉ gói gọn trong 1 giao dịch, thật không thể tin nổi :triumph: Vậy mình quyết định tìm hiểu ngay về flash loan trên một nền tảng đang rất nổi hiện nay, đó là **Aave**

## 1. Giới thiệu tổng quan

**Aave** là một giao thức thị trường tiền tệ phi tập trung không lưu trữ chạy trên Ethereum (decentralized non-custodial money market protocol), nơi người dùng có thể tham gia với tư cách là người gửi tiền hoặc người đi vay. Người gửi tiền cung cấp tính thanh khoản cho thị trường để kiếm thu nhập, trong khi người đi vay có thể vay tiền mã hóa dùng để đầu tư, trading.

Một số dịch vụ nổi bật **Aave** cung cấp là
1. **Depositing & Earning**: Gửi tiền mã hóa vào và nhận lãi suất từ một phần phí giao dịch của người vay.
2. **Borrowing**: Vay tiền mã hóa, người vay cần đưa ra tài sản thế chấp (một đồng mã hóa khác chẳng hạn mà mình đang sở hữu).
3. **Swap**: Chuyển đổi tiền mã hóa.
4. **Flash loan**: Vay chớp nhoáng và trả ngay trong giao dịch đó (Nghe có vẻ hơi sai sai, phần sau chúng ta sẽ tìm hiểu kỹ hơn)

Dưới đây là video giới thiệu về **Aave** trên trang chủ

{@embed: https://www.youtube.com/watch?v=BiseNyNpniE&feature=youtu.be}

## 2. Flash loan là gì ?

Flash loan (tạm dịch là vay nóng) là một cơ chế cho phép người dùng có thể vay nhanh chóng, dễ dàng một lượng tiền mã hóa mà không cần tài sản thế chấp gì cả :money_mouth_face: Điều kiện cần đáp ứng là khoản vay sẽ được hoàn trả ngay cuối giao dịch.

Nếu điều kiện trên không xảy ra, toàn bộ giao dịch sẽ được đảo ngược. **Flash loan** sẽ được dùng trong các trường hợp người vay muốn dùng vay tiền để ăn chênh lệch giá, trading v..v

### Ví dụ

Ngày 18/01/2020, một giao dịch flash loan có giá trị  3137.41 **DAI** . **DAI** được chuyển đổi thành 3137.41 **SAI** bằng cách dùng [migration contract](https://etherscan.io/address/0xc73e0383f3aff3215e6f04b0331d58cecf0ab849) của **MakerDAO**. Lượng **SAI** đó tiếp tục được chuyển đổi thành 18.16 **ETH** thông qua pool **SAI/ETH** trên Uniswap và ngay lập tức được chuyển tiếp thành 3,148.39 **DAI** qua pool **DAI/ETH** Uniswap. 

=> Vậy so với lượng **DAI** vay ban đầu thì lượng **DAI** sau khi chuyển đổi một hồi đã ăn chênh lệch một lượng **DAI** (đã khấu trừ chi phí giao dịch)

![](https://images.viblo.asia/c09f7ee8-2310-4963-b536-37e3593e2657.png)

## 3. Luồng hoạt động của flash loan trên Aave

Muốn thực hiện giao dịch flash loan, chúng ta cần viết contract theo chuẩn có sẵn, cùng với đó là triển khai kịch bản sử dụng lượng tiền vay được như thế nào trước khi trả lại cho **Lending Pool** của **Aave**.

1. Contract của chúng ta sẽ gọi đến hàm `falshLoan` trong contract `LendingPool` của **Aave**, xin vay nóng một khoản tiền.
2. Khi các tham số thỏa mãn yêu cầu, contract `LendingPool` gửi lượng tiền đến địa chỉ nhận, đồng thời sẽ gọi hàm `executeOperation` trên contract của chúng ta.
3. Khi này, contract của chúng ta đang giữ lượng tiền vừa mới vay được.
- **TH1**: Nếu không có thao tác gì thêm, thì lượng tiền vừa vay sẽ được approve cho contract `LendingPool` ở cuối giao dịch, contract `LendingPool` sẽ tự rút về.
- **TH2**:  Nếu số dư của contract ở cuối giao dịch bé hơn lượng đã vay thì giao dịch sẽ bị `revert`.
- **TH3**: Khi thực hiện các logic trading, swap để ăn chênh lệch giá chẳng hạn xong. Contract chúng ta sẽ approve cho contract `LendingPool` 1 khoản bằng khoản đã vay nóng + phí. Contract `LendingPool` sẽ rút tiền về sau.
4. Tất cả chỉ xảy ra trong 1 giao dịch, vốn là giao dịch gọi hàm  `flashLoan` trong contract `LendingPool` (trong logic của hàm này sẽ gọi hàm `executeOperation` nên ở cuối giao dịch mà contract `LendingPool` chưa có khả năng rút lại tiền thì giao dịch sẽ bị revert)

**Lưu ý**: Flash loan v1 của **Aave** thì cuối giao dịch sẽ chuyển luôn lượng tiền về contract `LendingPool`, còn ở phiên bản v2 thì contract `LendingPool` sẽ được approve quyền để có thể rút tiền từ contract đã vay.

Có vẻ đang còn hơi mơ hồ nhỉ, ban đầu mình đọc cũng chẳng hiểu mô tê gì cho đến khi xem code :cry:. Vậy phần ngay sau đây chúng ta hãy cùng xem cách mà **Aave** triển khai tính năng **Flash Loan** này cụ thể như thế nào ?

## 4. Từng bước triển khai

Source code được tham khảo trên github organization của [Aave](https://github.com/aave/code-examples-protocol/tree/main/V2/Flash%20Loan%20-%20Batch)

### B1: Cài đặt contract

Contract muốn vay nóng từ **Aave** cần phải implement `IFlashLoanReceiver` interface và overide hàm `executeOperation`

```js
// MyV2FlashLoan.sol
pragma solidity 0.6.12;

import { FlashLoanReceiverBase } from "FlashLoanReceiverBase.sol";
import { ILendingPool, ILendingPoolAddressesProvider, IERC20 } from "Interfaces.sol";
import { SafeMath } from "Libraries.sol

// FlashLoanReceiverBase là contract implement interface IFlashLoanReceiver
// Chúng ta hoàn toàn có thể vay nóng nhiều đồng trong cùng một giao dịch
contract MyV2FlashLoan is FlashLoanReceiverBase {
    using SafeMath for uint256;

    constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public {}
    
    /**
        Hàm này được gọi sau khi contract của chúng ta nhận được số tiền vay
     */
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    )
        external
        override
        returns (bool)
    {

        // Chúng ta có thể triển khai logic ở đây, ví dụ swap, trading lượng tiền vừa vay
        
        // Approve cho LendingPool contract để có thể rút tiền về ở cuối giao dịch
        for (uint i = 0; i < assets.length; i++) {
            uint amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }
        
        return true;
    }
}
```

Giải thích qua một chút về ý nghĩa của các tham số trong hàm `executeOperation`
- **assets**: Mảng danh sách địa chỉ của các token cần vay (vd như DAI, LINK, UNI, v.v)
- **amounts**: Lần lượt là số lượng token cần flash loan
- **premiums**: Chi phí cần trả thêm cho việc flash loan
- **initiator**: Địa chỉ gọi đến contract `LendingPool`

Contract `FlashLoanReceiverBase`

```js
pragma solidity 0.6.12;

import {IFlashLoanReceiver, ILendingPoolAddressesProvider, ILendingPool, IERC20  } from "Interfaces.sol";
import { SafeERC20, SafeMath } from "Libraries.sol";

abstract contract FlashLoanReceiverBase is IFlashLoanReceiver {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  ILendingPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
  ILendingPool public immutable override LENDING_POOL;

  constructor(ILendingPoolAddressesProvider provider) public {
    ADDRESSES_PROVIDER = provider;
    LENDING_POOL = ILendingPool(provider.getLendingPool());
  }
}
```

### B2: Thực thi flashLoan

Tiếp theo chúng ta sẽ viết thêm hàm `myFlashLoanCall`.Khi được thực thi, nó sẽ gọi đến hàm `flashLoan` trong contract `LendingPool` để thực hiện giao dịch flash loan từ **Aave**.

```js
pragma solidity 0.6.12;

import { FlashLoanReceiverBase } from "FlashLoanReceiverBase.sol";
import { ILendingPool, ILendingPoolAddressesProvider, IERC20 } from "Interfaces.sol";
import { SafeMath } from "Libraries.sol";

contract MyV2FlashLoan is FlashLoanReceiverBase {
    using SafeMath for uint256;

    constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public {}

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    )
        external
        override
        returns (bool)
    {

  
        for (uint i = 0; i < assets.length; i++) {
            uint amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }

        return true;
    }

    function myFlashLoanCall() public {
        address receiverAddress = address(this);

        address[] memory assets = new address[](7);
        assets[0] = address(0xB597cd8D3217ea6477232F9217fa70837ff667Af); // Kovan AAVE
        assets[1] = address(0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738); // Kovan BAT
        assets[2] = address(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD); // Kovan DAI
        assets[3] = address(0x075A36BA8846C6B6F53644fDd3bf17E5151789DC); // Kovan UNI
        assets[4] = address(0xb7c325266ec274fEb1354021D27FA3E3379D840d); // Kovan YFI
        assets[5] = address(0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789); // Kovan LINK
        assets[6] = address(0x7FDb81B0b8a010dd4FFc57C3fecbf145BA8Bd947); // Kovan SNX

        uint256[] memory amounts = new uint256[](7);
        amounts[0] = 1 ether;
        amounts[1] = 1 ether;
        amounts[2] = 1 ether;
        amounts[3] = 1 ether;
        amounts[4] = 1 ether;
        amounts[5] = 1 ether;
        amounts[6] = 1 ether;

        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](7);
        modes[0] = 0;
        modes[1] = 0;
        modes[2] = 0;
        modes[3] = 0;
        modes[4] = 0;
        modes[5] = 0;
        modes[6] = 0;

        address onBehalfOf = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;
        /*
            receiverAddress: Địa chỉ nhận tiền từ LendingPool
            assets: Danh sách địa chỉ của các token cần vay
            amounts: Số lượng các token cần vay
            modes: có 3 giá trị 0, 1, hoặc 2. Nếu models = 0 thì giao dịch sẽ bị revert khi ko trả lại tiền đã vay, models 1 hoặc 2 thì contract LendingPool sẽ kiếm tra xem địa chỉ đủ tài sản thế chấp không, nếu có thì sẽ cho nợ như hình thức Lending-Borrow thông thường nếu cuối giao dịch contract ko được hoàn lại số tiền.
            
        */
        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );
    }
}
```

Hàm `flashLoan` trong contract `LendingPool` sẽ trông như thế này

```js
function flashLoan(
    address receiverAddress,
    address[] calldata assets,
    uint256[] calldata amounts,
    uint256[] calldata modes,
    address onBehalfOf,
    bytes calldata params,
    uint16 referralCode
  ) external override whenNotPaused {
  
  
   /* Cấu trúc struct FlashLoanLocalVars
           struct FlashLoanLocalVars {
                IFlashLoanReceiver receiver;
                address oracle;
                uint256 i;
                address currentAsset;
                address currentATokenAddress;
                uint256 currentAmount;
                uint256 currentPremium;
                uint256 currentAmountPlusPremium;
                address debtToken;
             }
   */
    FlashLoanLocalVars memory vars;
    
    // Kiểm tra độ dài mảng asssets có bằng với amounts hay không ?
    ValidationLogic.validateFlashloan(assets, amounts);

    address[] memory aTokenAddresses = new address[](assets.length);
    uint256[] memory premiums = new uint256[](assets.length);
    
    // Gán địa chỉ sẽ nhận khoản tiền cho vay
    vars.receiver = IFlashLoanReceiver(receiverAddress);
   
   // Tính toán chi phí cho vay theo từng loại token và gửi token đến địa chỉ nhận
    for (vars.i = 0; vars.i < assets.length; vars.i++) {
      aTokenAddresses[vars.i] = _reserves[assets[vars.i]].aTokenAddress;

      premiums[vars.i] = amounts[vars.i].mul(FLASHLOAN_PREMIUM_TOTAL).div(10000);

      IAToken(aTokenAddresses[vars.i]).transferUnderlyingTo(receiverAddress, amounts[vars.i]);
    }
    
    // Gọi đến hàm `executeOperation` của contract vay, nếu trả về false thì revert giao dịch
    require(
      vars.receiver.executeOperation(assets, amounts, premiums, msg.sender, params),
      Errors.LP_INVALID_FLASH_LOAN_EXECUTOR_RETURN
    );
    
    
    for (vars.i = 0; vars.i < assets.length; vars.i++) {
      vars.currentAsset = assets[vars.i];
      vars.currentAmount = amounts[vars.i];
      vars.currentPremium = premiums[vars.i];
      vars.currentATokenAddress = aTokenAddresses[vars.i];
      vars.currentAmountPlusPremium = vars.currentAmount.add(vars.currentPremium);
       
       // Nếu cuối giao dịch, contract vay approve đủ số lượng token, contract LendingPool sẽ  rút tiền về
      if (DataTypes.InterestRateMode(modes[vars.i]) == DataTypes.InterestRateMode.NONE) {
        _reserves[vars.currentAsset].updateState();
        _reserves[vars.currentAsset].cumulateToLiquidityIndex(
          IERC20(vars.currentATokenAddress).totalSupply(),
          vars.currentPremium
        );
        _reserves[vars.currentAsset].updateInterestRates(
          vars.currentAsset,
          vars.currentATokenAddress,
          vars.currentAmountPlusPremium,
          0
        );

        IERC20(vars.currentAsset).safeTransferFrom(
          receiverAddress,
          vars.currentATokenAddress,
          vars.currentAmountPlusPremium
        );
      } else {
      // Nếu người  không trả lại tiền, hệ thống sẽ kiểm tra xem có đủ tài sản thế chấp hay không và cuối cùng sẽ ghi nhận khoản nợ cho người dùng
        _executeBorrow(
          ExecuteBorrowParams(
            vars.currentAsset,
            msg.sender,
            onBehalfOf,
            vars.currentAmount,
            modes[vars.i],
            vars.currentATokenAddress,
            referralCode,
            false
          )
        );
      }
      emit FlashLoan(
        receiverAddress,
        msg.sender,
        vars.currentAsset,
        vars.currentAmount,
        vars.currentPremium,
        referralCode
      );
    }
  }
```

Toàn bộ source code của contract `LendingPool.sol`, các bạn có thể tham khảo trên [github](https://github.com/aave/protocol-v2/blob/master/contracts/protocol/lendingpool/LendingPool.sol)

## Tổng kết

Nói chung, Flash loan là một tính năng rất hay và đặc sắc, nếu bạn nắm bắt được thị trường, chênh lệch giá cả ở các sàn thì có thể làm giàu mà không cần quá nhiều vốn (chỉ cần chút phí giao dịch). Nhưng vấn đề làm thì nào để ăn chênh lệch được lại là một vấn đề không hề đơn giản :sweat_smile:

Do giới hạn bài viết, mình chưa giới thiệu được sâu hơn về Flash Loan hay thử implement phần logic trading, swap sau khi vay được tiền. Hẹn các bạn ở một bài viết gần nhất.

## Tài liệu tham khảo

https://docs.aave.com/developers/guides/flash-loans

https://hackingdistributed.com/2020/03/11/flash-loans/#:~:text=A%20flash%20loan%20is%20a,a%20repayment%20is%20not%20satisfied.

https://academy.binance.com/en/articles/what-are-flash-loans-in-defi