Với sự phát triển như vũ bão của Blockchain, ETH dường như đang quá tải và hệ quả là chi phí Gas đã lên đến 1000Gwei, phí để tạo những transaction phức tạp đã xấp xỉ 500$ . Và một giải pháp cứu cánh cho các sản phẩm Defi trên ETH chính là Layer2, và trong nhiệm vụ lần này Matic đang thể hiện khả năng của mình rất tốt

![](https://images.viblo.asia/344ea9c0-2c78-410b-82e3-e54217bd2342.jpg)

# Giới thiệu

Matic được xây dựng với mục đích hỗ trợ cho Ethereum chứ không phải trở thành một Ethereum killer. Matic hỗ trợ việc map các token giữa Ethereum và Matic cũng như đã xây dựng Bridge giữa chúng. Một trong những sản phẩm tiêu biểu đó chính là ứng dụng **Aavegotchi** ứng dụng này đã phải delay ngày phát hành do chi phí trên Ethereum quá khủng khiếp, nếu muốn đọc kĩ hơn về ứng dụng này các bạn có thể xem qua bài viết của mình :

 https://viblo.asia/p/aavegotchi-ung-dung-tien-phong-trong-linh-vuc-gamification-cho-blockchain-XL6lADY4Zek

Trong bài viết lần này mình sẽ hướng dẫn các bạn xây dựng các Dapp trên Layer2 này

# Thực hành
Trong bài viết lần này mình sẽ hướng dẫn các bạn từ cách config metamask để có thể tương tác với Matic, Deploy một Dapp trên Matic và giới thiệu qua việc trao đổi thông tin giữa Layer 1 và Layer 2

## Config metamask

Chúng ta sẽ cần mainnet khi sử dụng các dapp trên Matic hoặc testnet khi build và test các dapp. Do đó mình sẽ hướng dẫn config cả 2 mạng:

### Mainnet 
Sửa dụng rpc: https://rpc-mainnet.maticvigil.com/

![](https://images.viblo.asia/f3d52c08-8aee-4777-9ced-4dc034e6ec4c.png)


### Testnet

Sử dụng rpc: https://rpc-mumbai.maticvigil.com/

![](https://images.viblo.asia/ed1ce94e-16be-4de7-9648-ead553630ae0.png)


## Deploy contract 

Trong ví dụ lần này mình sẽ sử dụng Remix để deploy thử một contract trên Layer2 Matic, và cũng sẽ có một số điều lưu ý:
- Contract được viết bằng solidity do đó các bạn cũng cần có một chút kiến thức lập trình để hiểu được contract đang làm gì
- Ví Metamask đã được config theo các bước trên và có một chút **Matic** để trả phí deploy, các bạn có thể faucet tại đây: https://faucet.matic.network/


Và giớ thì đi thẳng đến remix (https://remix.ethereum.org/) và deploy nào:

```js
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {

    address private owner;
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
}
```

Chúng ta sẽ deploy trực tiếp contract phía trên, mình sẽ sử dụng mainnet để deploy vì fee để deploy hoàn toàn rẻ :

![](https://images.viblo.asia/d7cc0419-e41f-46ae-8b2a-eca9ecb92184.png)

Ok. Vậy là việc deploy contract trên layer2 này không có gì khác biệt so với phía Ethereum, chỉ có điều là fee giảm đi rất nhiều, các bạn có thể thử qua 2 hàm **call** và **send** ngay lập tức

## Ethereum <-> Polygon
Polygon (Matic) ngoài việc đưa đến việc cải thiện tốc độ và fee của giao dịch so với ETH, thứ làm Matic đang nổi lên chính là việc support scale cho ETH rất nhiều và tất nhiên chiếc cầu (bridge) này thực sự rất ổn

### POS và Plasma
Những chiếc cầu này được xây với các tiêu chuẩn :
- Token được peg 1:1 nên hoàn toàn yên tâm sẽ không làm thay đổi total supply của token
- Khi chuyển lại token từ Polygon quay lại ETH thì lượng token bên Polygon sẽ bị burn và unlock chỗ token bên phía Ethereum

Hiện tại có 2 chiếc cầu để có thể chuyển đổi token cross-chain từ eth sang  polygon và ngược lại:
- PoS
- Plasma

Và đây là bảng so sánh tổng quan giữa 2 cầu này:
![](https://images.viblo.asia/ecb8c634-9040-4012-a3b4-fd33973dea95.png)

### PoS Bridge

Trong thời gian gần đây các ứng dụng đang được khuyến khích sử dụng PoS Bridge do đó bài viết lần này của mình sẽ tập trung nói về PoS Bridge nhiều hơn

Plasma Bridge được xây dựng hướng đến mục đích nâng cao về tính security còn PoS Bridge hướng đến tốc độ, do đó chúng vẫn sẽ luôn tồn tại cùng với nhau tuỳ vào mục đích của users

Trong cây cầu này chúng ta sẽ cần 2 đầu nối là **Root Token** và **Child Token**. Đây chính là 2 đầu để chúng ta có thể ánh xạ giữa nhau.  Hiện tại trong thời điểm bài viết được publish, layer2 này đang support 3 dạng token là **ERC20**, **ERC721**, **ERC1155**

Việc đăng kí 2 cầu nối này chúng ta sẽ đăng kí thông qua đây: https://mapper.matic.today/

Say khi đăng ký xong xuôi thì chúng ta có thể sử dụng **matic.js SDK**  để tương tác với contract hoặc cũng có thể tự tương tác với **contract** cũng được

Có thể giải thích về một bước hoàn chỉnh chuyển đổi :

1. Chủ sở hữu các assets(**ERC20, ERC721, ERC1155**) sẽ approve cho **Predicate Contract** có quyền sử dụng lượng token mà mình muốn transfer sang bên Polygon (Contract này sau sẽ có nhiệm vụ lock lượng token đó lại)
2. Sau khi approve thành công, contract **RootChainManager** sẽ gọi function **deposit** và cũng sẽ trigger phía **Polygon** cho contract **ChildChainManager**
3. Gửi thông tin giữa 2 chain thông qua các event, các bạn có thể đọc kĩ hơn ở đây: https://docs.matic.network/docs/contribute/state-sync/
4. Contract **ChildChainManager** gọi hàm **deposit** để mint lượng token tương ứng đã được lock phía **Polygon** (Chỉ có contract **ChildChainManager** có quyền được gọi hàm này)
5. Tại bước này thì phía bên Polygon bạn đã nhận được token tương ứng và có thể giao dịch trên **Polygon**

Để đưa **asset** quay trở lại Ethereum chúng ta sẽ có 2 bước là :

1. Token phía Polygon sẽ bị burn ( Sẽ tốn khoảng 10 - 30 phút để có thể hoàn thành transaction burn và submit vào phía Ethereum, transaction burn này sẽ được các validators validate bằng cơ chế PoS). Sau khi hoàn thành transaction này sẽ được submit sang **RootChainManager** phía Ethereum
2. Contract **Predicate** sau khi đã nhận được proof từ **RootChainManager** sẽ unlock số token mà trước đó chúng ta đã lock vào khi chuyển từ Ethereum sang.

# Kết luận

Trong bài viết này, **Plolygon** đang dần mạnh hơn khi đã cải thiện tốt cho Ethereum và cũng đang dần bắt dần trend NFT khi liên tục các Dapp NFT leo dần sang Polygon vì giá gas cắt cổ của Ethereum. Hãy cùng kì vọng Polygon sớm có thể xây dựng chiếc cầu để cho User có thể **deposit** hoặc **withdraw** từ **Mainnet Polygon** sang Binance app.

Hẹn gặp lại các bạn trong bài viết tiếp theo, mình sẽ demo rõ hơn các thao tác trực tiếp với contract khi truyền thông tin giữa 2 Layer.


# Tham khảo
Official docs: https://docs.matic.network/