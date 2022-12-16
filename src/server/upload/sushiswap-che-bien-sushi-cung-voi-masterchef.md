Đầu tiên đây không phải là một blog nấu ăn mặc dù tên của nó rất dễ khiến người khác lầm tưởng.
Bài viết lần này mình sẽ cùng các bạn tìm hiểu về contract **MasterChef** và cách tạo ra Token quản trị của nó (Sushi) trong **SushiSwap** - Một nền tảng đang làm mưa làm gió cũng như tạo không ít drama trong thế giới Blockchain tại thời điểm hiện tại.

![](https://images.viblo.asia/5e9220bc-960c-4cee-8171-31886123a6c7.png)

# Giới thiệu về SushiSwap
## Overview
Trước khi tìm hiểu SushiSwap thì các bạn cần phải có một lượng kiến thức về các ứng dụng Defi trên blockchain. Các bạn có thể đọc qua bài viết [Yield Farming - Cách tăng lợi nhuận một năm trên 100% từ cryptocurrencies](https://viblo.asia/p/yield-farming-cach-tang-loi-nhuan-mot-nam-tren-100-tu-cryptocurrencies-vyDZO3rQZwj) để có thể nắm được một số từ ngữ chuyên ngành cần biết.
Đầu tiên SushiSwap là một ứng dụng Defi cho phép người dùng có thể chuyển đổi giữa các token **ERC20**, bên cạnh đó cũng có thể cung cấp **Liquidity** cho các **Pool** .
Sushi chính là **token gorvernance** (token quản trị) được sinh ra thông qua việc cung cấp thanh khoản cho nền tảng Swap.

![](https://images.viblo.asia/9f9154b9-243a-4054-a7d7-dea96a11308c.png)

## Nguồn gốc của Sushiswap

**SushiSwap** không thông qua một tổ chức **audit** nào hết và được deploy lên mạng Ethereum thông qua một hoặc một nhóm người lấy tên là **NomiChef** . Đây cũng là một nền tảng khởi đầu cho một thế giới đồ ăn xuất hiện trên Ethereum gồm có như **KimchiSwap**, **PancakeSwap**, **HotdogSwap**

**SushiSwap** về cơ bản kế thừa tư tưởng từ **UniSwap** tuy nhiên nó lại có một thứ mà **UniSwap** tại thời điểm đó chưa có đó chính là **token gorvernance** (Sushi).
Và một pha chuyển đổi từ Sushi sang **14 triệu $** đã làm toàn thị trường **Defi** ảnh hưởng. Bài viết này của mình sẽ giải thích con số **14 triệu $** của NomiChef được sinh ra từ đâu và cách thức Token được sinh ra cũng như kĩ thuật khéo léo của NomiChef khi xây dựng contract **Masterchef.sol**

# Contract MasterChef
Về cơ bản để hiểu được phần này thì các bạn cần có một chút kiến thức về **solidity**. Các bạn có thể tìm kiếm những bài về solidity trong các bài đã có của mình.
## Nguyên liệu
Các bạn có thể xem qua contract MasterChef tại đây: 
https://github.com/sushiswap/sushiswap/blob/master/contracts/MasterChef.sol

Thông tin của mỗi user trong Pool:

Trong MasterChef sẽ có nhiều Pool, mỗi Pool cho phép user stake một loại **ERC20**

Struct **UserInfo**  lưu 2 giá trị **amount** và **rewarDebt**, **amount** là lượng **ERC20** đang được stake trong Pool của user còn **rewardDebt** thì được dùng để tính lượng Sushi được sinh ra (phần này thể hiện khả năng viết sol rất hay của NomiChef)
```go
struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }
```

Struct **Poolinfo** là thông tin của 1 **Pool** :
```go
struct PoolInfo {
        IERC20 lpToken;           // Địa chỉ của token (như DAI, KNC).
        uint256 allocPoint;       // Thông số này có thể coi như độ weight của pool đấy so với các pool khác
        uint256 lastRewardBlock;  // Số block cuối cùng mà Sushi được phân phối
        uint256 accSushiPerShare; // Tỉ lệ nhận Sushi trên 1 đơn vị ERC20 cung cấp
    }
```


```js
   // The SUSHI TOKEN! : Token quản trị được sinh ra
    SushiToken public sushi;
    // Địa chỉ của dev
    address public devaddr;
    // Số Block kết thúc khoảng được thưởng thêm sushi khi stake.
    uint256 public bonusEndBlock;
    // Lượng Sushi sinh ra trong mỗi Block.
    uint256 public sushiPerBlock;
    // Lượng sushi được thưởng thêm trong khoảng Block (default là 10).
    uint256 public constant BONUS_MULTIPLIER = 10;
    // The migrator contract. It has a lot of power. Can only be set through governance (owner).
    IMigratorChef public migrator;
```

```js
    // Mảng thông tin của các pool.
    PoolInfo[] public poolInfo;
    // Thông tin của mỗi user trong các pool.
    mapping (uint256 => mapping (address => UserInfo)) public userInfo;
    // Tổng sổ điểm phân phối, là tổng của các allocPoint mỗi Pool.Tổng của toàn bộ allocPoint trong mỗi Pool
    uint256 public totalAllocPoint = 0;
    // Số Block mà Sushi bắt đầu được sinh ra.
    uint256 public startBlock;
```

## Công thức chế biến
Phần này sẽ giới thiệu về cách thức tạo ra Sushi và cách phân chia Sushi cho các liquidity provider

### Tạo Pool và update trọng số cho mỗi Pool
- Khởi tạo Contract: Trong hàm contractor sẽ chứa địa chỉ của Sushi (ERC20), địa chỉ của dev, lượng sushi sinh ra mỗi block, thời gian bắt đầu mining, block kết thúc việc thưởng thêm
```js
    constructor(
        SushiToken _sushi,
        address _devaddr,
        uint256 _sushiPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) public {
        sushi = _sushi;
        devaddr = _devaddr;
        sushiPerBlock = _sushiPerBlock;
        bonusEndBlock = _bonusEndBlock;
        startBlock = _startBlock;
    }
```

- Thêm Pool liquidity:  Thêm Pool thanh khoản vào cho contract, sẽ bao gồm trọng số nhận sushi của pool (**_allocPoint**) ,  địa chỉ **token ERC20** của Pool
```js
    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            lpToken: _lpToken,
            allocPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            accSushiPerShare: 0
        }));
    }
```

- Cập nhật lại trọng số nhận sushi của pool, cập nhật lại tổng số **allocPoint** của toàn contract, sẽ được gọi khi muốn thay đổi trọng số nhận Sushi của mỗi Pool
```js
    // Update the given pool's SUSHI allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }
```
- Tính toán xem khoảng block có nằm trong khoảng được thưởng thêm Sushi hay không. Sẽ có 3 trường hợp là khoảng block nằm hoàn toàn sau khoảng được thưởng, nằm hoàn toàn trong khoảng được thưởng hoặc nằm một phần ở trong, một phần ở ngoài :

```js
    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from).mul(BONUS_MULTIPLIER);
        } else if (_from >= bonusEndBlock) {
            return _to.sub(_from);
        } else {
            return bonusEndBlock.sub(_from).mul(BONUS_MULTIPLIER).add(
                _to.sub(bonusEndBlock)
            );
        }
    }
```

### Công thức tính toán

Cuối cùng cũng đến phần fancy nhất chính là nguyên lý để MasterChef tạo ra Sushi. Ngay từ những dòng đầu tiên NomiChef đã comment lại về cách thức tính toán sushi cho mỗi liquid provider của mình :

```
// We do some fancy math here. Basically, any point in time, the amount of SUSHIs
// entitled to a user but is pending to be distributed is:
//
//   pending reward = (user.amount * pool.accSushiPerShare) - user.rewardDebt
//
// Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
//   1. The pool's `accSushiPerShare` (and `lastRewardBlock`) gets updated.
//   2. User receives the pending reward sent to his/her address.
//   3. User's `amount` gets updated.
//   4. User's `rewardDebt` gets updated
```

Công thức này sẽ tính toán để trả về lượng Sushi mà một user sẽ được nhận trong một khoảng block xác định (**from** - **to**). Công thức này được xây dựng để luôn tính ra được lượng Sushi mà user có thể claim về mà không cần tạo transaction nào. Do đó mấu chốt của công thức này chính là biến **user.rewardDebt** trong công thức :
> (user.amount * pool.accSushiPerShare) - user.rewardDebt

Đầu tiên chúng ta hãy làm một luồng đơn giản ở đây là Deposit vào 1 Pool :

**Deposit**:
```js
// Deposit LP tokens to MasterChef for SUSHI allocation.
function deposit(uint256 _pid, uint256 _amount) public {
    PoolInfo storage pool = poolInfo[_pid];
    UserInfo storage user = userInfo[_pid][msg.sender];
    updatePool(_pid);
    if (user.amount > 0) {
        uint256 pending = user.amount.mul(pool.accSushiPerShare).div(1e12).sub(user.rewardDebt);
        if(pending > 0) {
            safeSushiTransfer(msg.sender, pending);
        }
    }
    if(_amount > 0) {
        pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        user.amount = user.amount.add(_amount);
    }
    user.rewardDebt = user.amount.mul(pool.accSushiPerShare).div(1e12);
    emit Deposit(msg.sender, _pid, _amount);
}
```

Ngay từ đầu vào chúng ta sẽ thấy gọi đến 1 function **updatePool**, đây chính là dụng ý của NomiChef - muốn tối ưu transaction của người dùng:

```js
// Update reward variables of the given pool to be up-to-date.
function updatePool(uint256 _pid) public {
    PoolInfo storage pool = poolInfo[_pid];
    if (block.number <= pool.lastRewardBlock) {
        return;
    }
    uint256 lpSupply = pool.lpToken.balanceOf(address(this));
    if (lpSupply == 0) {
        pool.lastRewardBlock = block.number;
        return;
    }
    uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
    uint256 sushiReward = multiplier.mul(sushiPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
    sushi.mint(devaddr, sushiReward.div(10));
    sushi.mint(address(this), sushiReward);
    pool.accSushiPerShare = pool.accSushiPerShare.add(sushiReward.mul(1e12).div(lpSupply));
    pool.lastRewardBlock = block.number;
}
```

Trong trường hợp người đầu tiên deposit thì sẽ chỉ cập nhật lại **pool.lastRewardBlock** vì **lpSupply** ở trạng thái này là 0 (do chưa có ai deposit vào cả).

updatePool xong chúng ta lại quay lại với **function deposit**:
```js
if (user.amount > 0) {
    uint256 pending = user.amount.mul(pool.accSushiPerShare).div(1e12).sub(user.rewardDebt);
    if(pending > 0) {
        safeSushiTransfer(msg.sender, pending);
    }
}
if(_amount > 0) {
    pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
    user.amount = user.amount.add(_amount);
}
user.rewardDebt = user.amount.mul(pool.accSushiPerShare).div(1e12);
emit Deposit(msg.sender, _pid, _amount);
```

Trong thời điểm này thì user.amount vẫn bằng 0, nhưng **_amount** > 0 (lượng token erc20 mình stake vào pool) Giả sử lượng truyền vào là **20**.

=> Sau khi cập nhật thì chúng ta sẽ có: 
-  user.amount > 0   (amount = 20)
- **accSushiPerShare** vẫn là 0

Tiếp tục sau  **10 Block** nữa user này lại tiếp tục **deposit** vào 1 lượng nữa (**10 token**), khi đó sẽ lại tiếp tục update Pool :

```js
// Update reward variables of the given pool to be up-to-date.
function updatePool(uint256 _pid) public {
    PoolInfo storage pool = poolInfo[_pid];
    if (block.number <= pool.lastRewardBlock) {
        return;
    }
    uint256 lpSupply = pool.lpToken.balanceOf(address(this));
    if (lpSupply == 0) {
        pool.lastRewardBlock = block.number;
        return;
    }
    uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
    uint256 sushiReward = multiplier.mul(sushiPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
    sushi.mint(devaddr, sushiReward.div(10));
    sushi.mint(address(this), sushiReward);
    pool.accSushiPerShare = pool.accSushiPerShare.add(sushiReward.mul(1e12).div(lpSupply));
    pool.lastRewardBlock = block.number;
}
```

Tại lúc này **lpSupply** đã lớn hơn 0 (**20**) do đã được deposit vào trong **trx** trước đó. Tại đấy chúng ta sẽ tính toán :

- **sushiReward** : Tổng lượng token sushi được tạo ra (giả sử chỉ có 1 pool và trọng số là 1) và mỗi Block có 10 Sushi mới sinh ra => **sushiReward** = 100 (10 Block), lượng **sushiReward** này sẽ được mint cho contract **MasterChef** và một lượng cho **dev**. Khi đó chúng ta sẽ được tính toán lại **accSushiPerShare**
- **accSushiPerShare** : Giá trị này sẽ được cập nhật lại thành 0 + $\frac{100}{20}$  (100 là số lượng sushi sinh ra còn 20 là số lượng token đang cung cấp), tỉ lệ này có thể được hiểu là tỉ lệ sushi nhận được tương ứng với **mỗi đơn vị ERC20** mà user cung cấp cho pool
- **lastRewardBlock** được cập nhật lại thành thời điểm **updatePool** 

Tiếp tục quay lại hoàn thành nốt những dòng code trong deposit:
```js
if (user.amount > 0) {
    uint256 pending = user.amount.mul(pool.accSushiPerShare).div(1e12).sub(user.rewardDebt);
    if(pending > 0) {
        safeSushiTransfer(msg.sender, pending);
    }
}
if(_amount > 0) {
    pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
    user.amount = user.amount.add(_amount);
}
user.rewardDebt = user.amount.mul(pool.accSushiPerShare).div(1e12);
emit Deposit(msg.sender, _pid, _amount);
```
Tại đây thì **user.amount** đã > 0, **pending** sẽ là lượng sushi mà user đó sẽ được nhận (được tính bằng lượng token đang cung cấp nhân với **accSushiPerShare** - tỉ lệ sushi trên mỗi đơn vị token). Lượng sushi này sẽ được transfer trực tiếp luôn cho user qua hàm **safeSushiTransfer**

Tiếp đó sẽ transfer 10 token vào cho contract **MasterChef** và cập nhật lại **user.amount** (20 + 10).

Mấu chốt sẽ nằm ở phần này, tính toán lại **user.rewardDebt**:
(20 + 10) * $\frac{100}{20}$

Như vậy tóm lại luồng hoạt động của chúng ta như sau:

Deposit 20 token => Deposit 10 token
và có các giá trị tương ứng :

-  **user.rewardDebt**: (20 + 10) * $\frac{100}{20}$

- **accSushiPerShare**: $\frac{100}{20}$

Phần cuối cùng này sẽ cho bạn thấy công thức này hay ho như thế nào, tiếp tục **5 Block** tiếp theo user muốn xem họ đang có bao nhiêu Sushi họ sẽ được nhận thông qua function:
```js
// View function to see pending SUSHIs on frontend.
function pendingSushi(uint256 _pid, address _user) external view returns (uint256) {
    PoolInfo storage pool = poolInfo[_pid];
    UserInfo storage user = userInfo[_pid][_user];
    uint256 accSushiPerShare = pool.accSushiPerShare;
    uint256 lpSupply = pool.lpToken.balanceOf(address(this));
    if (block.number > pool.lastRewardBlock && lpSupply != 0) {
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 sushiReward = multiplier.mul(sushiPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
        accSushiPerShare = accSushiPerShare.add(sushiReward.mul(1e12).div(lpSupply));
    }
    return user.amount.mul(accSushiPerShare).div(1e12).sub(user.rewardDebt);
}
```

Tại thời điểm là là 5 Block tiếp theo sau khi Deposit lần 2 khi đó **accSushiPerShare** sẽ được tính theo công thức:

$\frac{100}{20}$ + $\frac{50}{30}$ 

(Trong đó 50 chính là lượng Sushi mới sinh ra trong Block)

Lượng Sushi người đó có thể claim về sẽ là :

(20 + 10) * ($\frac{100}{20}$ + $\frac{50}{30}$ ) - (20 + 10) * $\frac{100}{20}$


=> Từ công thức phía trên chúng ta sẽ thấy là **user.rewardDebt** dùng để làm như một biến nhớ cho lượng sushi mà user đã claim về trong quá khứ.

Cuối cùng chúng ta có thể có một công thức tổng quan. Sau 2 lần Deposit lần lượt vào thì giá trị **accSushiPerShare** sẽ lần lượt à :
**A => A + A'**


![](https://images.viblo.asia/a1413e20-af7d-4710-8c4e-e496eab8b2e8.png)

Tại thời điểm gọi **pendingSushi** thì trên thực tế tất cả sushi của người đó đã được lấy về => ta chỉ tính lượng sushi sinh ra trong 5 block gần nhất  (Khoảng được highlight) :
![](https://images.viblo.asia/348f72c1-b876-4742-afd6-c0d67c19469d.png)

Lượng sushi có thể claim lúc này sẽ phải được tính bằng cách nhân **Tỉ lệ nhận Sushi trên 1 đơn vị ERC20 cung cấp** (Trong thời điểm này là **A''** ) với **lượng đơn vị ERC20 đang cung cấp**

=> Nhiều người sẽ hỏi là tại sao không cập nhật lại **accSushiPerShare** là **A''** mà phải cập nhất thành  **A + A' + A''** để rồi phải trừ đi **user.rewardDebt** cho nó phức tạp. Tuy nhiên đây chính là cái hay của **NomiChef**, nếu cập nhật lại **accSushiPerShare** là **A''** thì chúng ta sẽ phải tốn một mảng lưu trữ cho từng user còn với công thức này, tất cả user đều có thể sử dụng chung 1 biến **accSushiPerShare** để tính toán lượng Sushi của mình vì nó đã được **stack** lại thành :
**A + A' + A''**. Biến **user.rewardDebt** thực ra chính là để loại bỏ phần **A + A'**. 

# Kết Luận

Trên đây mình đã giới thiệu về cách thức một Contract đã gây không ít Drama trong thời điểm hiện tại (Scam 14 triệu $ nhưng sau đó lại trả lại cho cộng đồng). 

Các bạn nếu để ý thì sẽ hiểu rõ 14 triệu $ này lấy từ đâu trong contract MasterChef này. Mình sẽ hint cho các bạn :

```js
sushi.mint(devaddr, sushiReward.div(10));
sushi.mint(address(this), sushiReward);
```


# Tham khảo

https://github.com/sushiswap/sushiswap/blob/master/contracts/MasterChef.sol