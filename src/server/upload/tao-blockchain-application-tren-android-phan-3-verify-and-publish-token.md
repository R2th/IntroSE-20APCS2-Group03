Ở [phần 2](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-2-L4x5xaqwKBM) chúng ta đã tạo thành công token của riêng mình (sẽ sử dụng là token lưu thông trong ứng dụng sắp triển khai). Hôm nay mình sẽ hướng dẫn các bạn cách Verify nó để có thể hiện ra được tên token, function,...
### 1. Verify and Publish
Bài trước, lúc deploy mình đã có lưu ý với các bạn lại là cần lưu **contract address** để dùng cho bài này. Tất nhiên, nếu các bạn đã quên lưu thì chúng ta vẫn có cách để lấy lại được cái **contract address** đó
* Cách 1: Deploy lại :grinning:, các bạn chỉ cần xóa file build đi, sau đó lại gọi `truffle migrate --network ropsten` thần thánh, nó sẽ deploy lại và sẽ sinh ra 1 contract mới, tất nhiên sẽ có **contract address** mới cho các bạn để verify, address này sẽ khác với address ở phần trước (do chúng ta deploy lại mà). Vì bản chất phần này mình chỉ cần address là được,
* Cách 2 - tìm đúng **contract address** cũ: Các bạn mở file truffle-config, copy **privateKey** rồi import nó vào metamask, lúc này nó sẽ tự tìm ra address ví của bạn. Tiếp tục lấy address đó, paste vào ô tìm kiếm của etherscan, nó sẽ hiển thị cho các bạn lịch sử hoạt động. Việc của chúng ta chỉ đơn giản là tìm lại ngày giờ chúng ta đã deploy trước đó thôi.

![](https://images.viblo.asia/a422b6c9-9724-4b36-88b0-8d76109f573e.PNG)

Hình trên chính là lịch sử hoạt động của ví của mình. Giờ thì click vào **Txn Hash** của item mình khoanh xanh lại nhé.

![](https://images.viblo.asia/99adaf31-63ae-451d-9f03-68219a78082c.PNG)

Đấy, đơn giản như vậy là chúng ta đã tìm ra **contract address** của đồng token rồi nè. 

Giờ cùng nhau verify nha. 

Việc đầu tiên là paste address vào trong ô tìm kiếm của etherscan, sẽ được như dưới :point_down:

![](https://images.viblo.asia/4f49f822-4b03-49dd-aeef-f439931825ee.PNG)

Tiếp tục bấm vào tab Contract -> Verify and Publish

![](https://images.viblo.asia/12ac4fe3-15e7-4b36-b3b9-b1722ffdccfb.PNG)

Ở mục **Compiler Type** thì chọn Single File (nghĩa là Verify bằng 1 file duy nhất), **Compiler Version** thì chọn giống với phiên bản code solidity nhé (của mình là `pragma solidity ^0.4.25` nên sẽ chọn 0.4.25). Sau đó bấm Continue thôi.

Ở trang mới sẽ có dòng **Enter the Solidity Contract Code below**, tuy nhiên, do code của chúng ta có **import** interface, lib nên tạm thời không thể copy tất cả rồi paste vào đó được.

Chúng ta sẽ dùng 1 tool mới, mở terminal, run `npm install truffle-flattener -g` để cài truffle-flattener, sau đó tiếp tục run `truffle-flattener ./contracts/NeolabToken.sol` (các bạn nhớ chỉ đúng đường dẫn của các bạn nha, của mình thì nó như vậy). Run xong dòng đó thì nó sẽ sinh ra 1 đoạn code, chỉ cần copy nó bỏ vào **Enter the Solidity Contract Code below**, vượt capcha, rồi bấm **Verify and Publish** thôi.

![](https://images.viblo.asia/a3fd8a42-e709-4010-9549-624b5112ccaf.PNG)

Như này là thành công rồi đó, giờ thì các bạn có thể search chính token của mình bằng tên rồi hihi. Giờ chuyển qua test, demo vài chức năng của nó trên chính etherscan nha.

### 2. Test

1. Read Contract:
![](https://images.viblo.asia/76aed985-ab11-4a75-b14c-05c8b0fa2451.PNG)

Ở mục này, các bạn có thể xem được name, symbol, totalSupply,... Bên cạnh đó, có hàm **balanceOf** để mọi người kiểm tra xem ví (nhập address vào) có chưa bao nhiêu đồng NeolabToken (đây là token mà mình deploy, token của các bạn thì nó có tên khác nha). Lưu ý, ở đây **decimals = 18** nên giá trị của nó các bạn chia cho 10^18 là ra số token mình đang có. Mình sẽ thử kiếm tra ví của mình (ví mình dùng deploy ấy).

![](https://images.viblo.asia/94fcfa64-e51d-4d53-afe0-9ad4a99e74cd.PNG)

Ở trên là số NeolabToken mà mình đang có, nó đúng với có lúc trước chúng ta setting `_balances[msg.sender] = 10e6 * (10 ** uint256(decimals));`. Nếu dùng address khác thì chắc chắn nó sẽ trả về 0 rồi. 

Hàm **allowance** thì sao này mình sẽ hướng dẫn test ha.

2.  Write Contract:

Mục này thì sẽ thú vị hơn một chút!

Đầu tiên chúng ta add CustomToken vào Metamask.

![](https://images.viblo.asia/1be4f93e-1040-44e1-8ad6-afe84bc05d5b.PNG)

Sau khi add xong thì chúng ta có thể xem được trực tiếp mình đang có bao nhiêu token.

![](https://images.viblo.asia/697213b0-0b34-4796-a501-5e5b8e3230c0.PNG)

Ở đây mình đã dùng 50 NLT nên nó còn chừng đó nha.

Sau đó các bạn click vào **Connect to Web3** (ở tab Write contact của etherscan), rồi khi có dialog hiện lên thì chọn **Metamask**, tiếp tục chọn ví mình muốn dùng để test ([hôm bữa có genarate ra 10 cái account rồi đó](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-1-E375z4AjZGW), lấy nó ra rồi import vào metamask dùng thôi). 

![](https://images.viblo.asia/3436ce72-38a0-443b-ade7-3d6a0e00cfc2.PNG)
Như này là đã connect thành công. 

Ví mình chọn hiện tại có 5 ETH và 0 NLT (NeolabToken). 
* buyToken: Chúng ta sẽ nhập số ETH muốn mua NLT nha, mình sẽ nhập 0,1. Sau đó bấm Write. Tiếp tục chờ vài giây để xử lý giao dịch. Khi giao dịch thành công chúng ta sẽ nhận được 0,1 x 4000 = 400 NLT (4000 ở đây là do chúng ta [code](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-2-L4x5xaqwKBM) `uint16 rate = 4000;` ).

![](https://images.viblo.asia/cb7c743f-134b-46ff-ab9e-bb84c6548d51.PNG)

Vậy là mua thành công rồi, số ETH có chút chênh lệch (khác 5 - 0.1 = 4.9) vì nó phải trừ thêm 1 ít phí khi chúng ta mua nữa (tất cả câu lệnh có làm thay đổi giá trị đều tốn phí ETH).

* transfer: Giờ mình sẽ test xem gửi token có được không ha. Lần này sẽ chuyển 15 NLT từ ví hiện tại sang ví `0x2E9a4ff7E893157eDc26F501Abb472C4771cD3A0` (đang có 9999950 NLT).

![](https://images.viblo.asia/b94e7669-0273-424a-b6c6-990b74b6c7ab.PNG)
Lưu ý, phải thêm **18 số 0** vào sau giá trị muốn gửi đi như hình.

Bấm Write

![](https://images.viblo.asia/0cbf9e95-8e38-4501-beb6-a4221ab3568c.PNG)

Vậy là đã transfer thành công 15 NLT nha.

Các hàm khác trong quá trình làm app mình sẽ tiếp tục giải thích nha. 

Hôm nay tới đây thôi, vì bão số 9 sắp vô rồi!!!

Ở [phần tiếp theo](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-4-tao-contract-game-oan-tu-ti-naQZRvOdZvx) chúng ta sẽ tạo ra contract game nhé. Hẹn gặp lại!