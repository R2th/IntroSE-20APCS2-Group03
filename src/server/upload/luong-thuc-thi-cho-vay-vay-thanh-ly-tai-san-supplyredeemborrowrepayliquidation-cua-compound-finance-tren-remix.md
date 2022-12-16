Compound Finance là một trong những giao thức hàng đầu để vay và cho vay tiền điện tử trong không gian DeFi. Chúng ta hay cùng test thử các luồng vay, cho vay , trả nợ và thanh lý thực hiện trên Remix như thế nào nhé.
![](https://images.viblo.asia/d6fa0674-bc37-4589-8476-441bda1d57c3.png)


Lưu ý dùng ganache để remix không bị overload, optimization khi compile contract<br>
Download các contract theo link :<br>
https://drive.google.com/drive/folders/110TyQ_q7XsE22I4ibMfU-nmn4uNqe0Yd?usp=share_link

## I. Deploy các contract cần thiết :<br>
*  Supplied token: (DAI) 0xa9C8D0dC8270BEF0e967590E34AE4e5e85f2cf79<br>
*  Borrowed token (BAT) 0x84b08ca638A12de111Ad22F248e17EE1fABaAffb<br>
*  CErc20Delegate : 0x418Aa2AFC8B53559ee5B76CEcc3008Ec8d498011<br>
* Comptroller: 0xdFAE123E3a91fD4646De7DaDec418d10bDA4B9CD<br>
*  SimplePriceOracle : 0x0f577B15020AAe6457b120987cAdE241806D6654<br>
* (Compound sử dụng hệ thống oracle riêng để update thông tin về giá token gọi là OpenPriceFeed.Ở đây ta chỉ dùng contract set giá đơn giản để test)<br>
* JumpRateModelV2(Model lãi suất): 0x957C6a70CFdB10Df6a8bbA27CA7bE0e6AE4a4881<br>
### ** Lưu ý tham số khi deploy như sau:<br>
* BASERATEPERYEAR: lãi suất cơ bản 50000000000000000 (5%)<br>
* MULTIPLIERPERYEAR: mức tăng lãi suất hàng năm 1200000000000000000 (1.2)<br>
* JUMPMULTIPLIERPERYEAR: mức tăng lãi suất khi đến điểm kink 2000000000000000000 (2)<br>
* KINK_: tỷ lệ tổng vay trên tông mức cung chạm tới mức này thì lãi suất cho vay sẽ tăng lên nhiều để giảm nhu cầu vay, giảm rủi ro cho hệ thống 800000000000000000(80%)<br>
* OWNER_: admin<br>
* CDai (CERC20DELEGATOR):0x5e2db2272D7B038D883305615638F46b1b2E5158<br>
* CBat (CERC20DELEGATOR):0x0Ae2746cc53a018f58c9274EA1183dd5DfC01107<br>

### ** Lưu ý tham số khi deploy CERC20DELEGATOR như sau:<br>
* UNDERLYING_: token<br>
* INTERESTRATEMODEL_: là JumpRateModelV2<br>
* INITIALEXCHANGERATEMANTISSA_: tỉ lệ đổi token và ctoken ban đầu(1*10^18)<br>
* IMPLEMENTATION_: là CErc20Delegate<br>
* BECOMEIMPLEMENTATIONDATA: 0x<br>
Ta dùng 3 địa chỉ như sau: <br>
1. admin : 0x2b9f04190e73674ed2B97F981caB0C7205cd32a2<br>
1. User1: 0xA2546F00753e400421b5cD608a3b7601AC1D3270 - supply DAI<br>
1. User2: 0x8D372543c2b4E4E74624CeD470BF65Ead37Ca53e - supply BAT, borrow DAI<br>
1. User3: 0x0178dA524176760b643b8935FF22fa78abf8298a - liquidator này sẽ trả khoan DAI cho nền tảng để mua thanh lý khoản vay của User2  khi BAT thế chấp cho khoản vay xuống giá đến mức thanh lý <br>
![](https://images.viblo.asia/e389197d-9193-45bd-b0c6-5e7d39a24d68.png)


## II. SUPPLY <br>
1. Admin mint DAI cho user1  và user3 ,mint BAT cho user2<br>
1. Admin gọi hàm _supportMarket tham số là CDAI và CBAT trong Comptroller <br>
1. User1 approve CDAI trong DAI, user2 approve CBAT trong BAT<br>
1. User1 cung cấp DAI cho nền tảng sẽ gọi hàm mint trong CDAI với tham số là số lượng DAI muốn cung cấp. Khi này user sẽ được ghi nhận số lượng CDAI tương ứng với tỷ lệ <br>
1. User2 cung cấp BAT cho nền tảng sẽ gọi hàm mint trong CBAT với tham số là số lượng BAT muốn cung cấp. Khi này user sẽ được ghi nhận số lượng CBAT tương ứng với tỷ lệ <br>
Output: 0 nếu thực hiện thành công hoặc revert với số uint khác thể hiện nguyên nhân lỗi<br>
![](https://images.viblo.asia/5e097250-a304-4f73-a8c4-aa1656f4028f.png)

## III. REDEEM <br>
User 1 muốn rút DAI ra khỏi nền tảng sẽ gọi hàm redeem trong CDAI với tham số là số lượng CDAI tương ứng hoặc hàm redeemUnderlying với tham số là số lượng DAI muốn rút<br>
Output: 0 nếu thực hiện thành công<br>
![](https://images.viblo.asia/9103b76a-5139-4538-87c0-99c643345630.png)

## IV. BORROW <br>
### Để thưc hiện vay thì admin phải set trước các phần sau:<br>
1. Trong SimplePriceOracle set giá của CDAI , CBAT qua hàm setUnderlyingPrice. <br>
- set giá CDAI: 100000000000000000000<br>
- set giá CBAT 50000000000000000000<br>
1. Trong Comptroller gọi hàm _setPriceOracle với tham số là địa chỉ SimplePriceOracle<br>
1. Trong Comptroller set hệ số thế chấp qua hàm _setCollateralFactor . Hệ số này là tỷ lệ được vay trên số tài sản thế chấp thường set 50-70%<br>
### User 2 muốn vay DAI sẽ cần:<br>
1. Trong Comptroller gọi hàm enterMarkets với tham số là 1 mảng gồm các CToken mà user đang supply cho nền tảng mà khi khoản vay của user bị thanh lý thì các tài sản trong mảng này sẽ bị thanh lý<br>
1. Sau đó gọi hàm borrow trong CDAI với tham số là số lượng DAI mà user muốn vay<br>
Output: 0 nếu thực hiện thành công hoặc revert với số uint khác thể hiện nguyên nhân lỗi<br>
![](https://images.viblo.asia/765c43ef-65bf-4ec6-ba21-b2db124cc44c.png)

## V. REPAY<br>
1. Trước khi User2 repay DAI thì cần approve CDAI trong DAI trước<br>
1. User2 gọi làm repayBorrow với tham số là số token muốn trả hoắcj repayBorrowBehalf nếu trả hộ user khác<br>
Output: 0 nếu thực hiện thành công hoặc revert với số uint khác thể hiện nguyên nhân lỗi<br>
![](https://images.viblo.asia/daea9cc8-fc88-406d-b31c-a746aeae086b.png)


## VI. LIQUIDATION<br>
### Để thưc hiện thanh lý thì admin phải set trước các phần sau:<br>
1. Trong Comptroller set hệ số thanh lý qua hàm _setCloseFactor . Hệ số này thể hiện phần trăm tài sản bị thanh lý mà người mua thanh lý có thể mua( vd 70%)<br>
1. Trong Comptroller set hệ số khuyến khích thanh lý qua hàm _setLiquidationIncentive . Hệ số này thể hiện tỷ lệ chiết khấu của tài sản thanh lý so với giá thị trường để khuyến khích người mua thanh lý. (vd 1.1)<br>
1. Set giá CBAT hay BAT giảm để khoản vay DAI của user2 bị thanh lý hay CBAT sẽ bị nền tảng bán thanh lý<br>
### User3 là người mua thanh lý sẽ cần dùng DAI của mình để trả khoản nợ cho user2 sau các bước:<br>
1. Approve CDAI trong DAI <br>
1. Trong CDAI gọi hàm liquidateBorrow với tham số:<br>
Borrower: địa chỉ user2 bị thanh lý<br>
repayAmount: khoản vay được trả<br>
CtokenCollateral: địa chỉ CBAT đã được user2 dùng làm thế chấp<br>
Output: 0 nếu thực hiện thành công hoặc revert với số uint khác thể hiện nguyên nhân lỗi<br>

![](https://images.viblo.asia/5aefaa81-f556-4e3c-b019-286b84039ce6.png)