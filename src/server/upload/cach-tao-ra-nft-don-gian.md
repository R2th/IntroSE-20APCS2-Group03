Công nghệ Blockchain đã được thai nghén từ những năm 80 của thế kỉ trước, tuy nhiên nó chỉ được ứng dụng rộng rãi khi Bitcoin ra đời vào năm 2008. Từ đó đến nay, công nghệ Blockchain đã liên tục phát triển và tiến hóa, mang lại nhiều lợi ích cho nhân loại. Nếu như các Blockchain thế hệ đầu như Bitcoin chỉ tập chung vào một loại tài sản duy nhất ( chính là đồng Bitcoin), thì các Blockchain về sau, ví dụ như Ethereum, các nhà phát triển bên thứ 3, có thể tự do phát triển các loại tài sản mới cho riêng mình, đó là các Token. NFT cũng là một loại Token. Chúng ta sẽ cùng tìm hiểu sâu hơn về chúng, cũng như cách tạo ra chúng.

## Khái niệm NFT
NFT ( Viết tắt của Non-fungible token), dịch ra tiếng việt là Token không thể chia tách. Token thường (Chia tách được) là một loại tài sản giống như tiền, vàng, gạo, dầu,... chúng trao đổi cùng loại với nhau và giữ nguyên giá trị. Đặc điểm của loại này là chúng có số lượng rất nhiều, được chấp nhận rộng rãi phổ biến. Còn NFT giống như bức tranh Mona Lisa, chỉ có 1 bản duy nhất trên đời này. Không thể có bức tranh thứ 2 có giá trị như bức tranh thứ nhất được, dù nó có giống hệt đi chăng nữa. Tóm lại, NFT là các Token có 1 đơn vị duy nhất, không có cái thứ 2 trên đời, và điều này được ghi lại trên Blockchain.
![image.png](https://images.viblo.asia/edb1c7eb-a77a-4b8e-8ee4-76ec6de2768b.png)

Nói lại chuyện của bức tranh Monalisa, cái được treo ở Louvre chưa chắc là phiên bản thật ( vì những lí do về bảo quản). Tuy nhiên cái ta biết được gần như chắc chắn, là bảo tàng ở Louvre là nơi được thế giới công nhận, là đang sở hữu tuyệt tác của Davinci. NFT cũng như vậy, nó cũng như một các chứng nhận rằng ta đã sở hữu 1 tài sản kỹ thuật số. Bản thân các tài sản kỹ thuật số, có thể bị sao chép dễ dàng, còn NFT lại không thể bị sao chép.

## Ứng dụng NFT
NFT có rất nhiều ứng dụng. Ứng dụng đầu tiên của NFT mà chúng ta được tiếp xúc, đó là CryptoKitties, một tựa game cho chúng ta dùng tiền thật để mua những nhân vật trong game ( chính là những NFT). 
![image.png](https://images.viblo.asia/93ec555f-0c1d-4607-9122-dd8e9a3f63cf.png)

Bẵng đi một vài năm, khi cơn sốt NFT trở lại, chúng được biết đến nhiều hơn qua việc trở thành những tài sản sưu tập xa xỉ. Có những NFT do các nghệ sỹ tạo ra được bán hàng triệu Dollar. Khi Axie Infinity ra đời, NFT lại quay trở lại điểm khởi đầu của nó, xuất hiện trong 1 tựa game. Hiện tại, từ khóa Metaverse được đề cập rộng rãi, trong tương lai, các NFT sẽ trở thành những tài sản, đồ vật trong Metaverse.

![image.png](https://images.viblo.asia/47dafdbd-fef2-42e0-a00a-8267f69e38ed.png)

## Tạo 1 NFT đơn giản
Mình sẽ sử dụng tiêu chuẩn ERC1155 để tạo ra các NFT của mình. Với ERC1155, ta có thể tạo nhiều NFT trên một contract.  Mã nguồn, tài liệu của ERC1155 có thể được tham khảo tại https://docs.openzeppelin.com/contracts/3.x/erc1155

Truffle là một bộ công cụ giúp chúng ta phát triển một dự án hợp đồng thông minh. Ta sẽ chọn Box (là một dạng template) Drizzle để bắt đầu dự án, ta có thể tham khảo thêm các Box khác trên trang chủ Drizzle. Mình cái thêm Extension ... trên VS code để hỗ trợ việc phát triển. Link boxes: https://trufflesuite.com/boxes/drizzle

Ta tạo một contract mới kế thừa contract ERC1155. Trong hàm khởi tạo, ta sẽ sử tiến hành mint ( đào) các NFT mà mình định tạo ra. Ở đây mình sẽ tạo ra 100 NFT với id từ 1 đến 100.
```
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Waifus is ERC1155 {

constructor() public ERC1155("http://minh.fun/api/Meta/waifu/{id}") {

uint256[] memory ids = new uint256[](100);

uint256[] memory amounts = new uint256[](100);

for (uint256 i = 0; i < 100; i++) {

ids[i] = i;

amounts[i] = 1;

}

_mintBatch(msg.sender, ids, amounts, "");

}

function balanceOfOne(address account) public view returns (uint256[] memory) {

require(account != address(0), "ERC1155: balance query for the zero address");

uint256[] memory batchBalances = new uint256[](100);

for (uint256 i = 0; i < 100; ++i) {

batchBalances[i] = balanceOf(account, i);

}

return batchBalances;

}

}
```
Ta thêm một file migration mới vào trong thư mục migrations
```
const Waifu = artifacts.require("Waifus");

module.exports = function(deployer) {

deployer.deploy(Waifu);

};
```
Ta tiến hành Compile và Migrate contract ta vừa mới tạo trên Truffle dev net.

![image.png](https://images.viblo.asia/018e133c-652c-4659-a4e1-fb9d86c12bf4.png)
Để hiển thị meta data của NFT, mình sẽ sử dụng React + Drizzle để tạo ra một DApp, giúp hiển thị metadata từ NFT. Các thuộc tính của một NFT sẽ được tạo ra ngẫu nhiên. Drizzle cung cấp cho chúng ta các Component sẵn để có thể tương tác với Blockchain. Khi mở Dapp ta vừa tạo lên, ta sẽ có thông báo cho phép truy cập từ metamask.
![image.png](https://images.viblo.asia/75b06198-4219-4421-a6ac-54442fdf5362.png)
Giao diện của App sẽ hiển thị toàn bộ NFT mà ví hiện có ( của contract ta vừa deploy), mình sẽ mô tả các NFT dưới dạng ảnh để dễ phân biệt:
![image.png](https://images.viblo.asia/86bc9fc7-f211-44b7-8138-499a023cd6a7.png)
Ta thử chuyển NFT sang một ví khác:
![image.png](https://images.viblo.asia/f760166a-9e43-4596-9084-90b94a618490.png)
Sau khi xác nhận giao dịch, ta sẽ kiểm tra trong ví nhận:
![image.png](https://images.viblo.asia/9a10025d-9c6b-4acc-ac9c-af544a0cad17.png)
Vậy là chúng ta đã xây dựng xong được một bộ sưu tập NFT.  Code của bài viết có thể tham khảo tại: https://github.com/minhdanghuu/WaifuNFT
Để giúp các bạn theo dõi các giao dịch của NFT trong bài viết, mình đã deploy nó trên Testnet của Binance: https://testnet.bscscan.com/address/0xdcb343dddbf063a197b89cd7646690be125cad1a
## Kết
Trên đây, mình đã giới thiệu với các bạn về NFT và cách tạo ra chúng. Hy vọng sau bài viết này, các bạn có thêm những hiểu biết về công nghệ đang làm mưa làm gió này. Cảm ơn các bạn!