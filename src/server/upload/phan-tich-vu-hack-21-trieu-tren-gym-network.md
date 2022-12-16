*Gym Network vẫn bị hack cho dù đã được audit bởi 2 cái tên lớn là Certik và PeckShield*

*ChainZoom đã điều tra và tổng hợp logic của tất cả module của GymNetwork trước khi bị hack tại [repos này](https://github.com/ChainZoom-Security/gym-network-exploit).*

![2.png](https://images.viblo.asia/2ab87fc0-d71d-4275-a045-21eddcc0182e.png)

# Giới thiệu
# 
Gym Network, một nền tảng được giới thiệu là tối ưu hóa lãi suất dựa trên hình thức farming cho user, vừa bị hack $2.1M vào ngày 8 tháng 6 vừa qua. Vụ việc khiến token GYMNET giảm từ $0.2 về $0.026, hiện tại token này đã phục hồi về mức giá $0.08


# Diễn biến sự việc 
#
**Jun-08-2022 05:18:03 AM +UTC**

Hacker tấn công vào [module GymSinglePool](https://bscscan.com/address/0xa8987285e100a8b557f06a7889f79e0064b359f2) thông qua [contract](https://bscscan.com/address/0x7cbfd7bccd0a4a377ec6f6e44857efe42c91b6ea) mà anh ta tự code 

=> Kết quả của transaction này là hacker được ghi nhận đã deposit rất nhiều $GYMNET vào GymSinglePool mặc dù thực tế anh ta chẳng deposit một đồng $GYMNET nào.

**Jun-08-2022 05:18:45 AM +UTC**

Hacker withdraw 8,000,000 GYMNET từ GymSinglePool về contract của mình.[ Transaction tại đây](https://bscscan.com/tx/0x171a448161f2c438cca0502599a6784561d11099c9218e2125c5f3c7a6705dd3).

**Jun-08-2022 05:18:45 AM +UTC**

Hacker chuyển 320,000 GYMNET đến ví 0xef6afbb3e43a1289bd6b96252d372058106042f6, 480,000 GYMNET đến ví 0x7e8413065775e50b0b0717c46118b2e6c87e960a, đồng thời swap 7,200,000 GYMNET còn lại lấy hơn 3300 BNB. [Transaction tại đây](https://bscscan.com/tx/0x12970f3962b4bacd01bb4e3dc086804e4e5861134db5dd80d7e4671aa7f23d16).

**Vậy Hacker đã tấn công GymSinglePool như thế nào?**

[Contract GymSinglePool](https://bscscan.com/address/0xa8987285e100a8b557f06a7889f79e0064b359f2) thực chất là một Proxy, trước khi bị tấn công, nó thực thi theo logic được triển khai tại [contract này](https://bscscan.com/address/0x0288fba0bf19072d30490a0f3c81cd9b0634258a#code)

Có thể xem code [tại đây](https://github.com/ChainZoom-Security/gym-network-exploit/blob/main/contracts/GymSinglePool.sol).

Về cơ bản GymSinglePool cho phép user farm theo block, nó là logic của sushi farm được mở rộng thêm chức năng lựa chọn lockingPeriods và levels cùng với tối ưu hóa lãi suất thông qua một loạt các modules như: GymAccountant, GymMLM, GymVaultBank, LiquidityProvider, NetGymFarming.

Chúng ta cùng nhìn vào hàm deposit của GymSimglePool:

```
/**
* @notice Deposit in given pool
* @param _depositAmount: Amount of want token that user wants to deposit
*/
function deposit(
    uint256 _depositAmount,
    uint8 _periodId,
    uint256 _referrerId,
    bool isUnlocked
) external {
    require(isPoolActive, "Contract is not running yet");
    IGymMLM(relationship).addGymMLM(msg.sender, _referrerId);
    _deposit(_depositAmount, _periodId, isUnlocked);
}
```



`IGymMLM().addGymMLM() `chỉ là một bước lưu lại thông tin user tham gia vào Pool thông qua sự giới thiệu bởi một user khác.

```
 function _deposit(
        uint256 _depositAmount,
        uint8 _periodId,
        bool _isUnlocked
    ) private {
        UserInfo storage user = userInfo[msg.sender];
        IERC20Upgradeable token = IERC20Upgradeable(tokenAddress);
        PoolInfo storage pool = poolInfo;
        updatePool();

        uint256 period = months[_periodId];
        uint256 lockTimesamp = DateTime.addMonths(
            block.timestamp,
            months[_periodId]
        );
        uint256 burnTokensAmount = 0;

        if (!_isUnlocked) {
            burnTokensAmount = (_depositAmount * 4) / 100;
            totalBurntInSinglePool += burnTokensAmount;
            IERC20Burnable(tokenAddress).burnFrom(msg.sender, burnTokensAmount);
        }

        uint256 amountToDeposit = _depositAmount - burnTokensAmount;

        token.safeTransferFrom(msg.sender, address(this), amountToDeposit);
        uint256 UsdValueOfGym = ((amountToDeposit * getPrice()) / 1e18) / 1e18;

        user.totalDepositTokens += amountToDeposit;
        user.totalDepositDollarValue += UsdValueOfGym;
        totalGymnetLocked += amountToDeposit;
        if (_isUnlocked) {
            totalGymnetUnlocked += amountToDeposit;
            period = 0;
            lockTimesamp = DateTime.addSeconds(
                block.timestamp,
                months[_periodId]
            );
        }

        uint256 rewardDebt = (amountToDeposit * (pool.accRewardPerShare)) /
            (1e18);
        UserDeposits memory depositDetails = UserDeposits({
            depositTokens: amountToDeposit,
            depositDollarValue: UsdValueOfGym,
            stakePeriod: period,
            depositTimestamp: block.timestamp,
            withdrawalTimestamp: lockTimesamp,
            rewardsGained: 0,
            is_finished: false,
            rewardsClaimt: 0,
            rewardDebt: rewardDebt
        });

        user_deposits[msg.sender].push(depositDetails);
        user.depositId = user_deposits[msg.sender].length;

        for (uint256 i = 0; i < levels.length; i++) {
            if (user.totalDepositDollarValue >= levels[i]) {
                user.level = i;
            }
        }

        emit Deposit(msg.sender, _depositAmount, _periodId);
    }
```


Ở hàm` _deposit()`: (từ dòng 386 đến 450)

* `updatePool()`, sẽ khá quen thuộc với những ai đã tìm hiểu về sushi farm
* `token.safeTransferFrom(msg.sender, address(this), amountToDeposit)`, chuyển tiền từ user về
* các logic tính toán timestamp và cập nhật thông tin cho user

Ở đây bước quan trọng nhất là `token.safeTransferFrom(msg.sender, address(this), amountToDeposit)`, để đảm bảo user thực sự deposit vào pool.

Sau khi `deposit()`, user có thể `withdraw()` dựa trên thông tin đã được ghi nhận ở bước deposit, từ dòng 528-585.

```
function withdraw(uint256 _depositId) external {
   require(_depositId >= 0, "Value is not specified");
   updatePool();
   _withdraw(_depositId);
}
```

Có thêm một kiểu deposit nữa ở hàm `depositFromOtherContract()`

```
/**
     * @notice Deposit in given pool
     * @param _depositAmount: Amount of want token that user wants to deposit
     */
    function depositFromOtherContract(
        uint256 _depositAmount,
        uint8 _periodId,
        bool isUnlocked,
        address _from
    ) external {
        require(isPoolActive, "Contract is not running yet");
        _autoDeposit(_depositAmount, _periodId, isUnlocked, _from);
    }
```


Ở hàm `_autoDeposit()` cũng có:

* `updatePool()`
* các logic tính toán và cập nhật thông tin cho user

Nhưng `token.safeTransferFrom()` đâu? tại sao không chuyển tiền từ user về pool mà pool lại tự approve cho chính nó tiêu tiền của chính nó? (dòng 466)
```
token.approve(address(this), _depositAmount);
```




Hacker đã lợi dụng điều này để tấn công, anh ta không hề deposit một đồng GYMNET nào nhưng lại được ghi nhận đã deposit 8,000,000 GYMNET vào pool, sau đó anh ta withdraw 8,000,000 GYMNET ra và bán tháo nó.

Điều này khiến chúng ta đặt ra rất nhiều nghi vấn. Liệu vụ hack là do sự bất cẩn của Gym Netwwork, hay đây là kịch bản đã được sắp xếp sẵn?