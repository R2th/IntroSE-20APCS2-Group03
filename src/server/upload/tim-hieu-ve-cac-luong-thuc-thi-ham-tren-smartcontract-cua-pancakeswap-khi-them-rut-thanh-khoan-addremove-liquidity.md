Pancakeswap là một trong những sàn phi tập trung theo cơ chế tạo lập thị trường tự động (AMM DEX) đầu tiên của Binance Smart Chain, cho phép người dùng giao dịch mua bán các token BEP-20 (chuẩn token mới nhất từ BNB Smart Chain). Chúng ta hay cùng tìm hiểu luồng chạy các hàm khi thực hiện thêm và bỏ thanh khoản trên defi này nhé.<br />
<br />
![](https://images.viblo.asia/0a3aa72f-346f-4c93-aa78-fe9b456865e6.png)


# Thêm thanh khoản (Add Liquidity)<br />
## I.Luồng thực hiện của function AddLiquidity<br />
### Các bước để add liquidity :<br />
1.Approve số lượng token tự tạo cho phép router sử dụng  . Có thể approve trên testnet.bscscan hoặc remix. Các coin như ETH,BTC,DAI… thì không cần approve. Approve trên testnet.bscscan thì cần verify contract trước.<br />
   
2.Gọi hàm addLiquidity<br />

![](https://images.viblo.asia/46d3a26c-4c7d-4b02-a701-0a7618d57075.png)


1._addLiquidity: tính lượng token được add vào liquidity<br />
2.safeTransferFrom: chuyển token an toàn vào địa chỉ to<br />
3.pairFor: lấy địa chỉ LP token<br />
4.mint: trả về địa chỉ to lượng LP token mint ra sau khi add liquidity với cặp token<br />

![](https://images.viblo.asia/c7a7609e-61c0-4584-80dc-f084fe0d6f07.png)
![](https://images.viblo.asia/0bdc5fbb-cd08-4c5b-863f-73918fee9913.png)

## II.Nội dung function AddLiquidity:<br />
```solidity
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);<br />
```
Gọi hàm _addLiquidity trả về kết quả là số lượng token A và token B trong pool vừa tạo gán trong 2 biến amountA và amount.(*)<br />
```solidity
        address pair = PancakeLibrary.pairFor(factory, tokenA, tokenB);<br />
```
Địa chỉ LP token trả về gán vào biến pair<br />
```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);<br />
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);<br />
 ```
Chuyển số lượng token A là amountA, token B với số lượng amountB từ địa chỉ đang gọi hàm đến địa chỉ LP token vừa tạo ra ở trên <br />
```solidity
liquidity = IPancakePair(pair).mint(to);<br />
```
Gọi hàm mint trong PancakePair để tạo LP token với số lượng lưu trong biến liquidity và chuyển tới địa chỉ ví là to<br />


## 
## III.Nội dung chi tiết các hàm liên quan:<br />
### 1. library PancakeLibrary

1.1 sortTokens : Sắp xếp token<br />
![](https://images.viblo.asia/33a67bc0-53be-463d-98ce-372199e01802.png)


Nôi dung function:<br />
```solidity
        require(tokenA != tokenB, 'PancakeLibrary: IDENTICAL_ADDRESSES');<br />
 ```
kiểm tra yêu cầu 2 token phải khác nhau nếu không báo lỗi<br />
```solidity
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);<br />
  ```
So sánh thứ tự địa chỉ token theo a-z,a-9 rồi sắp xếp và gán vào biến token 0 và token1 <br />
```solidity
        require(token0 != address(0), 'PancakeLibrary: ZERO_ADDRESS');<br />
 ```
 kiểm tra yêu cầu địa chỉ thứ 1 sau sắp xếp có tồn tại hại không, nếu không báo lỗi<br />

1.2 pairFor: lấy địa chỉ LP token<br />
![](https://images.viblo.asia/a5f929ef-2543-4ad8-8ecf-f600cf4b18b5.png)


Nôi dung function:<br />
Tính toán ra địa chỉ của LP token mà không phải gọi hàm từ ngoài vào giúp tiếp kiệm gas<br />

1.3 getReserve: lấy số dư Token<br />
![](https://images.viblo.asia/be507beb-a1da-4b30-9e4e-3a2e4721a836.png)


Nôi dung function:<br />
```solidity
        (address token0,) = sortTokens(tokenA, tokenB);<br />
 ```
Sắp xếp 2 token <br />
```solidity
        pairFor(factory, tokenA, tokenSăpB);<br />
   ```
Tính địa chỉ LP token<br />
```solidity
        (uint reserve0, uint reserve1,) = IPancakePair(pairFor(factory, tokenA, tokenB)).getReserves();<br />
  ```
Lấy số dư của 2 token<br />
```solidity
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);<br />
   ```
Sắp xếp thứ tự 2 số dư này tương ứng với thứ tự token đã sắp xếp<br />

1.4 quote<br />
![](https://images.viblo.asia/d735bd9d-f3f9-4dd5-bd2f-78b1a4000988.png)


Nôi dung function:<br />
```solidity
        require(amountA > 0, 'PancakeLibrary: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'PancakeLibrary: INSUFFICIENT_LIQUIDITY');
   ```
Điều kiện yêu cầu số lượng token A nhập vào >0, số dư 2 token trong ví>0<br />
```solidity
        amountB = amountA.mul(reserveB) / reserveA;
  ```
Tính ra số lượng token B theo công thức<br />
###  2. PancakeRouter
2.1 _addLiquidity: tính lượng token được add vào liquidity<br />

![](https://images.viblo.asia/175cafbe-ca8c-4522-98d0-dba19ce73035.png)


Nội dung function:<br />
```solidity
if (IPancakeFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            IPancakeFactory(factory).createPair(tokenA, tokenB);
```
Kiểm tra xem token A và token B đã được tạo pair hay chưa nếu chưa sẽ gọi hàm createPair ở contract factory để tạo pair<br />
```solidity
        (uint reserveA, uint reserveB) = PancakeLibrary.getReserves(factory, tokenA, tokenB);
   ```
Lấy số dư của 2 token<br />
```solidity
 if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
  ```
  
Nếu cả 2 token có số dư =0 thì hàm trả ra số lượng token được add liquidity bằng số lượng input đã nhập <br />
```solidity
        } else {
            uint amountBOptimal = PancakeLibrary.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'PancakeRouter: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```
Nếu ít nhất 1 token có số dư khác 0 thì tính khối lượng qui đổi số lượng tokenB tối ưu từ số lượng tokenA mong muốn. Nếu kết quả nhỏ hơn số lượng tokenB mong muốn và không nhỏ hơn số lượng tokenB tối thiểu thì số lượng tokenB tối ưu này được add liquidity cùng với số lượng tokenA đã nhập vào<br />
```solidity
            } else {
                uint amountAOptimal = PancakeLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'PancakeRouter: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
```
Nếu không thì tính tiếp số lượng tokenA tối ưu qui đổi từ số lượng tokenB mong muốn. 
Kiểm tra xem kết quả trả ra phải nhỏ hơn số lượng token Among muốn nếu không sẽ revert
Kiểm tra tiếp yêu cầu kết quả trả ra phải lớn hơn số lượng tokenA tối thiểu thì revert và báo lỗi.
Sau đó thì số tokenA tối ưu này sẽ được add liquidity cùng với số lượng tokenB đã nhập vào<br />
### 3. library TransferHelper
3.1 safeTransferFrom: chuyển token an toàn<br />
![](https://images.viblo.asia/77cba7a0-aa6c-429b-a4ba-6a8e9e5dcfa7.png)


Nội dung function:<br />
```solidity
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
```
Gọi hàm chuyển token transfer qua giao thức call địa chị token  . Hàm trả ra 2 kết quả bao gồm success là true nếu gọi hàm call thành công, false nếu không gọi được hàm và data là dữ liệu dạng bytes <br />
Kiểm tra yêu cầu phải gọi hàm thành công và không có dữ liệu data trả về hoặc decode data trả về true , nếu không sẽ báo lỗi và revert<br />


### 4.PancakePair
4.1 mint : trả về địa chỉ to lượng LP token mint ra sau khi add liquidity với cặp token<br />
![](https://images.viblo.asia/426c4c5a-6c2d-41b9-bb68-c6ffb9bcec9d.png)

Nội dung function:<br />
```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
 
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
```

Lấy số dư trước khi add liquidity của 2 token trong pool<br />
Lấy số dư sau khi add liquidity của 2 token trong pool<br />
Gọi hàm _mintFee để mint ra lượng LP token tương đương lượng phí 0,03% chuyển vào vào địa chỉ treasury của Pancakeswap chính là địa chỉ feeTo đã set trước đó (Phí pancakeswap đang tính là 0.25% khối lượng giao dịch trong đó 0,17% phân phối cho các liquidity provider, 0,05% pancakeswap sẽ mua lại và burn,0,03% sẽ đi vào quỹ treasury để phát triển nền tảng). Để tiết kiệm gas thì phí này chỉ tính khi liquidity provider add hoặc remove liquidity<br />
```solidity
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
        }
```
Tính lượng LP token: <br />
- Nếu là lần đầu add liquidity của cặp token thì tính số lượng LP token như công thức
Lượng LP token tối thiểu được mint rồi khóa vĩnh viễn ở địa chỉ address(0) để tránh phép chia cho 0
- Nếu cặp token đã được add liquidity trước đó thì số lượng LP token sẽ lấy theo số  nhỏ hơn như là sự trừng phạt dành cho liquidity provider nếu cố tình add liquidity theo tỷ lệ không giống như tỷ lệ sẵn có trong pool<br />
```solidity
        require(liquidity > 0, 'Pancake: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
 
        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date        
if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date<br />
```
Kiểm tra điều kiện LP token được tính ra ra phải >0 nếu không báo lỗi mint không thành công<br />
Gọi hàm _mint để mint LP token theo số lượng đã tính ở trên và chuyển về địa chỉ ví to<br />
Update số dư của 2 token trong pool<br />
Update k<br />