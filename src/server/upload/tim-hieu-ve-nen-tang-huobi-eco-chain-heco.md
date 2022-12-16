![](https://images.viblo.asia/1dff5b7a-9863-4c4c-bf94-161d6c482a6c.png)


# Heco chain là gì

Huobi ECO Chain (Heco) là một nền tảng blockchain đầu tiên được ra mắt trên Huobi Open Platform. Nền tảng này được giới thiệu là một nền tảng public chain decentralized, có hiệu quả cao và tiết kiệm phí giao dịch. Nó thì cho phép lập trình smart contract và hỗ trợ các giao dịch với hiệu suất cao. Native token của Heco chain là **HT** và nó sử dụng cơ chế đồng thuận HPoS. Houbi thì cũng hứa hẹn sẽ tiếp tục cải tiến nó bằng cách triển khai layer 2 nhằm hỗ trợ các nhà triển đang ở Ethereum có thể chuyển sang layer 2 trên Houbi.

Vậy có thể hình dung đơn giản Heco chính là một sự kế thừa với những nét tương đồng của người anh đi trước Ethereum. Với sự khác biệt hiện thời là cơ chế đồng thuận và có triển khai layer 2 như các nền tảng Matic, Loom, BSC,....

# Các thông tin cơ bản

#### Heco’s Performance 
- **TPS** ( Transactions Per Second ): 500+
- Thời gian confirm trung bình một block: **3s**

#### Cơ chế đồng thuận
- Sử dụng cơ chế HPoS giống với lại cơ chế  POS của Etherum 2.0 sắp ra mắt, với việc sử dụng cơ chế này thay cho PoW thì sẽ giúp tiết kiệm chi phí vận hành node, chi phí confirm block không cần tiêu tốn quá nhiều điện năng nữa... Với cơ chế này thì các minner giờ đây sẽ là các node validator, họ nhẽ nhận được phần thưởng chính là fee gas của các transactions, phần thưởng này sẽ được chia theo tỷ lệ tài sản mà validator đã thế chấp.

#### Cross-Chain
- Hiện  tại thì thằng Heco chain nó có hỗ trợ cross-chain, tài sản như BTC, ETH hay các stable coins thì có thể được mapped sang Heco chain bằng cách sử dụng một cây cầu - asset bridge. Cơ chế của thực hiện của cái cầu này là sẽ lock tài sản ở trên chain ban đầu và tạo ra một lượng token tương ứng ở bên Heco chain, cơ chế này thì được khá nhiều bên sử dụng tiêu biểu là asset brigde của Binance Smart Chain sang các chain ETH, TronLink,...

![](https://images.viblo.asia/e0f45b5d-69cb-4036-a869-5f1a40e2356a.png)


- Team mình cũng có một sản phẩm Cross-Chain từ Harmony sang ETH và sử dụng lượng token đã bị lock ở đầu ETH đem đi lending ở Aave để sinh lời thay vì để lock im một chỗ. 

{@youtube: https://www.youtube.com/watch?v=7Uwklhll-ao}

#### Meta Transaction 

Heco chain thì đã hỗ trợ chức năng meta-transaction, nó sẽ giúp giảm chi phí giao dịch của người dùng và Heco sẽ thanh toán khoản giảm phí này. Vì vậy meta-transaction sẽ giúp tối thiểu chi phí vận hành của các developers DApp , cũng như của người dùng Dapp.

Nhưng để được hưởng sự ưu đãi giảm phí này thì người dùng cũng như các nhà phát triển Dapp sẽ cần phải hold một lượng token HT với các hạn mức như sau:

![](https://images.viblo.asia/efd9482a-88a2-4fbe-a3c1-68468b6e9127.png)

Điều này khá giống với cách vận hành của các sàn giao dịch tập trung hiện tại như Binance, Okex hay chính sàn Huobi :D :D :D không tự nhiên ăn được của họ đâu.

# Tokens - Dapp
Hiện các tokens top ở bên ETH đã có mặt trên Heco chain như Uni, Usdt, Link,...

![](https://images.viblo.asia/c54ad671-bdfc-46a7-adf6-027c290aa509.png)

Còn các Dapps trên heco hiện vẫn chưa được đa dạng cho lắm, đa phần vẫn đang là các sản phẩm do Huobi xây dựng. Các sản phẩm do cộng đồng xây dựng hiện khá hiếm hoi

![](https://images.viblo.asia/1015e1fe-5eef-4247-b435-caedc98c7545.png)

# Connect metamask

##### Mainnet

```json
name: heco-mainnet
rpc: https://http-mainnet-node.huobichain.com
chainid: 128
symbol: HT
scan: https://hecoinfo.com
```

![](https://images.viblo.asia/b6ceb113-7872-4d25-a13a-1627da3aeefc.png)


##### Testnet

```json
name: Heco-Testnet
rpc: https://http-testnet.hecochain.com
chainid: 256
symbol: HT
scan: https://testnet.hecoinfo.com
```

![](https://images.viblo.asia/998e9281-7ec9-42ba-86a3-5c6e3790c92b.png)

# Code smart contract và deploy

Việc phát triển Dapp trên Heco giống hết như việc phát triển trên Ethereum và Binance Smart Chain (BSC). Mọi người có thể sử dụng 2 công cụ phổ biến để code contract và deploy đó là [Remix](https://remix.ethereum.org/) và [Truffle](https://www.trufflesuite.com/). Trong bài viết lần này thì mình sẽ sử dụng Remix vì thằng này khá là tiện không phải cài đặt gì. Wallet thì Heco đã hỗ trợ Metamask nên mình đã hướng dẫn config mạng ở trên.

Bây giờ mình sẽ demo việc deploy một contract lên mạng testnet của Heco. Đầu tiên ta cần chuẩn bị 1 file code bằng solidity `Storage.sol`.

#### Storage.sol
```js
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

Sau khi đã có contract giờ ta sẽ cần complier, ở đây ta cần chọn đúng version solidity để có thể complier mà không bị lỗi nha

![](https://images.viblo.asia/49b40955-7592-4036-83fb-0a89fc948758.png)

Ok giờ đến phần connect wallet với metamask nhớ change netwrork sang testnet đó

![](https://images.viblo.asia/65afea38-ea01-4fd0-a1bc-e0c810413ce9.png)

Ồ quên ta còn thiếu HT để có thể làm fee gas deploy. Để có được HT ta sẽ đi faucet tại đây [here](https://scan-testnet.hecochain.com/faucet). Ok đã có 0.5 HT deploy thoải mái luôn

![](https://images.viblo.asia/aa556317-212d-4c4c-87a7-5ca70c13fad8.png)

Bây giờ cần chuyển môi trường của Remix từ máy ảo của remix sang connect vào web3 của metamask

![](https://images.viblo.asia/dcaffd17-aaad-43c0-9425-f4d3cb604dce.png)

Rồi deploy và xem kết quả nào

![](https://images.viblo.asia/3811cf50-bcac-4d31-9497-5da735a33529.png)

Vậy là xong do dùng HPoS (PoS) nên confirm giao dịch khá nhanh tầm 3s bằng với BSC.

# Tổng kết
Qua bài viết nay thì mình muốn cho những bạn nào đã nghe nói về Heco chain như chưa tìm hiểu về nền tảng này. Nói chung thì docs của Heco theo quan điểm cá nhân mình thì còn rất sơ sài. Hoặc có thể do họ nghĩ xây giống gần như y hệt một bên nào đó rồi thì chả cần docs chi tiết làm gì, nếu cần thì sang docs của bên kia mà đọc :smile::smile::smile: chắc mọi người cũng hiểu là giống bên nào rồi đấy. Mình mong là thời gian tới Huobi có thể cập nhật thêm những tính năng khác biệt so với các nền tảng hiện có, chứ hiện tại thì để có thể tạo được một trend như BSC hay Etherum thì mình nghĩ là chắc là sẽ chưa thể xảy ra với Heco chain.

### Nguồn 
https://www.hecochain.com/en-us/