# Mở đầu
![](https://images.viblo.asia/158f0081-9be1-4c61-abbe-7adbe94f49d1.png)

<p align="center">Hình 1. Uniswap </p> 

Nhắc đến Blockchain đặc biệt là Ethereum thì không thể không nhắc đến một start-up đình đám hóa Kỳ Lân chỉ trong thời gian ngắn đó là **Uniswap**, đúng như tên gọi của nó hiện tại Uniswap đang lock khoảng một lượng Token hơn 3 tỷ USD, giá trị vốn hóa thị trường hơn 660 triệu USD, thật là một con số khủng khiếp !

Bài viết này mình hướng đến người đọc đã có kiến thức cơ bản về Ethereum và các xu hướng Defi, có tìm hiểu về Uni và cách sử dụng nó, cho nên mình sẽ đi luôn vào các bước deploy smart contract của Uniswap và sử dụng nó sau khi deploy, còn bản chất bên trong gọi những hàm nào thì bạn có thể xem source code mình đã chuẩn bị, vì mình ko thể phân tích tưng hàm trong bài viết này được và mình sẽ không nói về các chỉ số, công thức mang tính chất tài chính trong bài viết này.
# Ba thành phần chính của Uniswap smart contract
Chức năng của Uniswap nhìn thì có vẻ đơn giản, chỉ là đổi một lượng token này để lấy một lượng token khác, chẳng hạn như đổi ETH lấy DAI, nhưng đằng sau nó là một bộ smart contracts rất phức tạp được lắp tỉ mỉ với nhau.
<br>
<br>
<br>

![](https://images.viblo.asia/47b7d277-9d5b-4859-ada0-1cb45a27a207.png)
<p align="center">Hình 2. Add Liquidity DAI - ETH</p>
 
 Smart contract của Uniswap gồm 3 thành phần:
 - Router: Nơi tiếp nhận yêu cầu từ user
 - Factory: có nhiệm vụ tạo Pool
 - Pool: mỗi cặp Token sẽ là một Pool riêng

Khi người dùng gọi function AddLiquidityETH() (với đầu vào là một lượng DAI và một lượng ETH) của contract Router, Router sẽ kiểm tra xem  pool Dai - ETH đã tồn tại hay chưa, nếu chưa thì nó sẽ gọi đến Factory để Factory tạo ra Pool DAI - ETH, còn nếu đã tồn tại thì nó sẽ thêm một lượng  DAI và ETH tương ứng vào Pool.
<br>
<br>
<br>

![](https://images.viblo.asia/05c1d817-3c08-4f56-aee2-ebafd1e60d60.png)
<p align="center">Hình 3. Swap Exact ETH For Tokens</p>
Khi người dùng muốn đổi một lượng ETH để lấy DAI, họ sẽ gọi đến contract Router, Router sẽ tính toán địa chỉ của Pool và lượng DAi tương ứng sau đó gọi đến Pool để Pool trả về DAI cho người dùng.
<br>
<br>
Như vậy, smart contract của Uniswap sẽ có 3 thành phần chính là Router, Factory, Pool, tuy nhiên khi deploy thì chúng ta chỉ cần deploy Factory  trước sau đó đến Router, còn Pool sẽ được tạo ra trong quá trình vận hành.

# Nếu tự deploy thì sẽ bắt đầu từ đâu?

Để deploy smart contract của Uni thì ta phải có đủ smart contract của Uniswap gồm [Factory](https://github.com/Uniswap/uniswap-v2-core) và [Router](https://github.com/Uniswap/uniswap-v2-periphery), tuy nhiên mình đã chuẩn bị sẵn một repo tổng hợp 2 contract và các scripts để các bạn có thể thực hành dễ dàng [tại đây](https://github.com/trinhtan/uniswap-v2-totalContract). Trong repo gồm 3 thư mục:

* factory: smart contract của Factory
* periphery: bản đầy đủ cảu Router
* periphery_short: bản rút gọn của Router, vì lý do gas của Ropsten nên bản này mình sẽ lược bỏ chức năng remove Liquidity để có thể deploy lên Ropsten dễ dàng

clone repo của mình về và tạo .env với nội dung như mẫu trong .env.example để thực hành các bước sau nhé.

### Bước 1. Deploy Factory
Mở terminal và chạy lệnh sau:
```bash
cd factory
yarn migrate --network ropsten
```

Kết quả trả về tương tự như sau thì bạn đã deploy thành công Factory:
```bash
Replacing 'UniswapV2Factory'
   ----------------------------
   > transaction hash:    0x6243fe84c820e47014676bfbbcc331ff34b486d3d71e443cd76366a0875e2404
   > Blocks: 2            Seconds: 18
   > contract address:    0xFa900667AFa28FC7f979d4B2F4C18eB786Ff803f
   > block number:        9079776
   > block timestamp:     1605499558
   > account:             0xeDf47fCa90aC292554CD029a60f34ce1468086A5
   > balance:             81.10502223986658686
   > gas used:            4137702 (0x3f22e6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.08275404 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.08275404 ETH
```

### Bước 2. Deploy Router
Thay address của Factory vừa được deploy vào file `periphery_short/migrations/1_deploy.js`, như ở trên là giá trị `0xFa900667AFa28FC7f979d4B2F4C18eB786Ff803f`, sau đó vẫn ở terminal vừa rồi chạy lệnh sau để lấy BytecodeHash của UniswapV2Pair:
```bash
yarn getBytecodeHash
```
kết quả trả về dạng:
```bash
f9ed55e853e1ed03a7d0c0450cbf431b9e1f00ea6e8160be32dc812e3215c89a
Done in 8.66s.
```

copy giá trị `f9ed55e853e1ed03a7d0c0450cbf431b9e1f00ea6e8160be32dc812e3215c89a` thay vào dòng thứ 37 của file `periphery_short/contracts/libraries/UniswapV2Library.sol`, sau đó mở terminal lên và chạy lệnh sau để deploy Router lên Ropsten:
```bash
cd periphery_short
yarn migrate --network ropsten
```

kết quả trả về dạng:
```bash
Deploying 'UniswapV2Router02'
   -----------------------------
   > transaction hash:    0x83dcbbabc70a53123f0a5acdabfa17b6d0cb7fded14e8c250fdcdccb8e8a46a1
   > Blocks: 3            Seconds: 21
   > contract address:    0x89230c171B6628C6032d41ead73D33dE7EB82BDD
   > block number:        9081039
   > block timestamp:     1605506887
   > account:             0xeDf47fCa90aC292554CD029a60f34ce1468086A5
   > balance:             81.00817699986658686
   > gas used:            4842262 (0x49e316)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.09684524 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.09684524 ETH
```

### Bước 3. Tạo pool DAI - ETH
Chúng ta có thể hoàn toàn bỏ qua bước này mà đi xuống bước 4 luôn, vì sao thì mời bạn xem lại Hình 2, khi ta gọi addLiquidityETH(), nếu Pool chưa tồn tại thì nó sẽ được tạo, tuy nhiên mình muốn trình bày luôn về bước này để mọi người hiểu hơn, mở terminal lên và chạy lệnh sau để tạo Pool DAI - ETH, chú ý trong Uniswap, họ sẽ dùng WETH thay cho ETH:
```bash
cd factory
yarn createPair --network ropsten dai eth
```

Giao dịch thành công, một Pool (Pair) DAI - ETH vừa được deploy và được Factory lưu lại địa chỉ đó, chạy lệnh sau xem địa chỉ của Pair:
```bash
yarn getPair --network ropsten dai eth
```
kết qủa trả về là địa chỉ của Pair dạng:
```bash
0xd0cdEBe52786613cb7dc21594079518a0715697e
```

mở terminal trong periphery_short, chạy lệnh sau để lấy điạ chỉ của Pair DAI - ETH thông qua Router:
```
yarn getPairFor --network ropsten dai eth
```

kết qủa trả về:

```bash
0xd0cdEBe52786613cb7dc21594079518a0715697e
```

Có thể kết quả khi bạn thực hành sẽ khác với của mình nhưng bắt buộc kết quả của `getPair` bằng Factory và `getPairFor` bằng Router phải bằng nhau, tại sao lại như vậy? Rõ ràng là Router không hề lưu một địa chỉ nào ngoài địa chỉ Factory cả!

Đáp áp là Uniswap đã vận dụng linh hoạt phương thức `create2`, bạn có thể xem thêm về `create2` [tại đây](https://viblo.asia/p/chuan-bi-cho-minh-mot-dia-chi-contract-dep-di-biet-dau-lai-thanh-ky-lan-gGJ59QO15X2).

Ở Factory họ dùng `create2` để deploy một Pair, còn ở Router họ sẽ thực hiện lại thuật toán mà `create2` đã dùng để tính lại địa chỉ của một Pair (hàm pairFor trong file `periphery_short/contracts/libraries/UniswapV2Library.sol`)

###   Bước 4. addLiquidityETH
Sau khi đã tạo Pool thành công thì chúng ta sẽ addLiquidity để cung cấp cho Pool token để nó có thể hoạt động, ở bước này account mà bạn thực hiện bắt buộc phải có DAI và ETH, mình sẽ thực hiện add 1 ETH và 500 DAI vào Pool, chạy lênh sau:
```bash
cd periphery_short
yarn addLiquidityETH --network ropsten dai
```
sau khi transaction thành công thì nghĩa đã add 1 ETH và 500 DAI vào Pool, chạy lệnh sau để xem nếu mình swap 0.1 ETH thì sẽ nhận được bao nhiêu DAI:
```bash
yarn getAmountOut --network ropsten dai
```
kết quả trả về dạng wei là:
```bash
45330544694007456000
```
nghĩa là tầm hơn 45 DAI.

### Bước 5. Swap ETH lấy DAI

Bây giờ là bước cuối cùng để có thể hoàn thành một luồng hoàn chỉnh của Uniswap, chúng ta sẽ swap 0.1 ETH để lấy DAI,  đầu tiên ta sẽ xem số dư DAI hiện tại:
```bash
cd periphery_short
yarn getBalance --network ropsten dai
```
kết quả trả về:
```bash
224483050815055950000
```
Sau đó chúng ta sẽ tiến hành swap 0.1 ETH để lấy DAI:
```
yarn swapExactETHForTokens --network ropsten dai
```
Sau khi transaction thực hiện thành công, chúng ta xem lại DAI balance để xem thay đổi:
```
yarn getBalance --network ropsten dai
```
Kết quả trả về là:
```bash
269813595509063400000
```
Như vậy DAI đã tăng lên một lượng bằng với kết quả mà ta chạy ```yarn getAmountOunt --network ropsten dai``` ở trên.
# Sử dụng Uniswap như một Oracle giá token. Say Bye Chainlink!
Với cộng đồng sử dụng đông đảo, lượng thanh khoản trong các Pool cực kỳ lớn nên từ lâu tỉ giá giữa các token trong Uni gần như bám rất sát với giá token trên các sàn tập trung như Binance, Bitmax,... và khó có thể bị thao túng bởi một ai

Trước đây ta hay dùng Chainlink Oracle mỗi khi muốn lấy giá token, việc này tốn một lượng LINK token. Nhưng giờ ta có thể lợi dụng thanh khoản trong các Pool của Uni để lấy tỷ giá giữa các token. Việc này được triển khai như trong smart contract dưới đây:
```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";


interface IUniswapPair {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IUniswapFactory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

contract GetTokenPrice  {
    using SafeMath for uint256;
    uint256 public amountETH;
    address public WETH;
    address public uniswapV2FactoryAddress;

    constructor(
        address _uniswapV2FactoryAddress, address _weth) public {
        uniswapV2FactoryAddress = _uniswapV2FactoryAddress;
        WETH = _weth;
    }

    function calculateAmountETH(address _token, uint256 _amount) public returns (uint256) {

        address pairAddress = IUniswapFactory(uniswapV2FactoryAddress).getPair(_token, WETH);
        require(pairAddress != address(0), "Pair does not exist!");
        (uint112 _reserve0, uint112 _reserve1,) = IUniswapPair(pairAddress).getReserves();

        uint256 reserve0 = uint256(_reserve0);
        uint256 reserve1 = uint256(_reserve1);

        uint256 amount;
        if(_token < WETH) {
            amount = _amount.mul(reserve1).div(reserve0);
        } else {
            amount = _amount.mul(reserve0).div(reserve1);
        }
        amountETH = amount;
        return amountETH;
    }

    receive() external payable {
    }
}
```
### Bước 1. Lấy địa chỉ của Pair
Trước tiên ta phải lấy được địa chỉ của Pair thông qua Factory, nếu địa chỉ trả về là ```address(0)``` nghĩa là Pair (Pool) đó chưa tồn tại.

Tại sao lại dùng getPair() của Factory mà không dùng pairFor() của Router mặc dù đều trả về cùng 1 giá trị? Câu trả lời là Factory sẽ trả về địa chỉ thật sự mà Pair đã được deploy, còn Router chỉ tính toán sau đó trả về một địa chỉ mà có thể Pair vẫn chưa được deploy lên địa chỉ đó.
Dòng sau
```solidity
address pairAddress = IUniswapFactory(uniswapV2FactoryAddress).getPair(_token, WETH);
```

chính là lấy địa chỉ thực sự của Pair

### Bước 2. Lấy Reserves của Pair sau đó tính toán
Sau khi có được địa chỉ của Pair, chúng ta sẽ gọi đến hàm getReserves() của Pair, hàm này trả về lượng token đang có trong Pool, tý giá giữa chúng có thể nói là gần như bằng với các sàn tập trung như Binance, Bitmax,...

Sau đó là chúng ta tính toán dụa trên các reserves để có được tý giá của chúng, các reserves này được sắp xếp theo địa chỉ nên việc so sánh địa chỉ trước bước tính toán là vô cùng cần thiết.
```solidity
        (uint112 _reserve0, uint112 _reserve1,) = IUniswapPair(pairAddress).getReserves();

        uint256 reserve0 = uint256(_reserve0);
        uint256 reserve1 = uint256(_reserve1);

        uint256 amount;
        if(_token < WETH) {
            amount = _amount.mul(reserve1).div(reserve0);
        } else {
            amount = _amount.mul(reserve0).div(reserve1);
        }
```

### Thực hành
- Deploy Smart contract:
```bash
cd useOracle
yarn migrate --network ropsten
```
- Xem 1 DAI có thể mua được bao nhiêu ETH:
```bash
yarn getAmountETH --network ropsten dai
```
Kết quả trả về dạng wei:
```bash
2419339999999999
```
# Kết luận
Nếu bạn clone repo của mình về và phân tích và chạy thành công các bước ở trên thì có nghĩa là bạn hoàn toàn có thể tự deploy một Uniswap cho mình. 

Tiếp theo bạn clone tiếp giao diện của Uniswap [tại đây](https://github.com/Uniswap/uniswap-interface) cho nó trỏ vào contract Router mà bạn đã deploy là có thể chạy lên một project Uniswap hoàn chỉnh !!!