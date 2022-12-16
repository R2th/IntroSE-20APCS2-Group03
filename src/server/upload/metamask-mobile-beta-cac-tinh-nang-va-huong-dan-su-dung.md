![](https://images.viblo.asia/0d578929-dbad-4163-b58b-4c1c913d2b80.jpg)
 Cuối cùng sau những hứa hẹn, MetaMask 1 ứng dụng ví điện tử đã cho ra mắt bản Beta dành cho điện thoại . Hiện tại bản beta này chỉ để thu thập phải hồi từ cộng đồng người dùng trước khi cho ra mắt phiên bản V1 vào mùa thu năm nay . 
 
 Để tải thử bản mobile ngay :
 **https://mobile.metamask.io/ **
 
 Thay vì chỉ đơn giản giống như các ví khác, MetaMask Mobile cung cấp một kết nối tới các decentralized web giống như sử dụng brower một cách trực quan và các tính năng đồng bộ hóa với tài khoản MetaMask trên Desktop.
 Bài viết này sẽ nhấn mạnh một số tính năng thú vị mà MetaMask đem lại.
 
##  Thân thiện với người dùng
Vấn đề tiếp cận với người dùng mới đặc biệt là với những người dùng lần đầu và chưa am hiểu về tiền điện tử luôn là một thử thách . Thấu hiểu được điều đó nhóm phát triển đã nỗ lực cải tiến giúp cho việc sử dụng trở nên dễ dàng . Tất cả chỉ cần khoảng 30s để có thể hiểu và sử dụng . Hãy xem bản demo :
1. Tạo ví chỉ với vài giây
2. Hướng dẫn những gì người dùng có thể làm với Metamask
3. Danh sách các ứng dụng phi tập trung nổi bật mà họ có thể khám phá .
{@embed: https://www.youtube.com/watch?v=NFbw_V_nlYA}

## Đồng bộ App vs Browser Extension
 Đứng trên phương diện người dùng , khả năng bạn sẽ có rất nhiều lịch sử giao dịch và các tài khoản trên browser extension Metamask . Tin vui là bạn có thể đồng bộ ví của mình vs Metamask extension ( tài khoản , nicknames, tokens, lịch sử giao dịch) tất cả thông tin đó sẽ được cập nhật trên ngay phiên bản điện thoại của bạn . Extension trên Desktop của bạn sẽ tạo mã QR và khi được quét bởi điện thoại , việc đồng bộ thông tin sẽ diễn ra trong vài giây.
 {@embed: https://www.youtube.com/watch?v=YXt9AF675W0}
 
##  Hỗ trợ ERC- 721 (Collectibles)
ERC-721 là một tiêu chuẩn tokens và là độc nhất trên Ethereum blockchain .Hiện tại, ứng dụng hỗ trợ cho ERC-721 cho phép mọi người dùng sở hữu tokens này có thể thấy trong ví MetaMask Mobile của họ. Gửi, nhận và xem bộ sưu tập yêu thích của mình bất cứ lúc nào 
![](https://images.viblo.asia/ed6ff5a9-44c2-4b05-807f-f938692a4d3c.gif)

## InstaPay
Các thanh toán sử dụng Payment Channels ( một dạng State Channel ) dựa trên Connext đều không mất gas và hoàn thành ngay lập tức. Ngoại trừ lần gửi tiền và rút tiền từ Channel, tính năng này giúp chuyển tiền ko mất gas giữa những người dùng trong Channel. Điều này được thực hiện để tạo một trải nghiệm nhanh và liền mạch giữa ví, browsers và applications.
{@embed: https://www.youtube.com/watch?v=jCLmFiaD67s}

Đây là tính năng thử nghiệm và bạn có thể bật tính năng này từ Settings > Experimental > Payment Channels / InstaPay > View Wallet

## Các tính năng khác có trong MetaMask Mobile Beta
### ONBOARDING:
* Một hướng dẫn để giúp mọi người bắt đầu và làm quen với ứng dụng
* Nếu đã có ví? Đồng bộ với Desktop Metamask của bạn trong vài giây hoặc nhập tài khoản bên ngoài bằng seed words
* Nếu là người dùng mới? Tạo một ví mới trong vài giây! Không cần sao lưu bảo mật cho đến khi bạn có tiền trong tài khoản của mình!
* Bạn có thể mua tiền điện tử đơn giản từ các sàn được liện kê trong **Buy Crypto** hoặc thực hiện một giao dịch.
### WALLET:
* Ví HD với việc tạo tài khoản mới theo yêu cầu
* Quản lý, gửi và nhận Tokens ETH, ERC20, ERC721 từ ví của bạn bao gồm tự động phát hiện Tokens mà bạn có và hỗ trợ để xem mã thông báo được đề xuất bởi DApps.
* Tokens và tự động phát hiện có thể thu thập (custom tokens, từ siêu [eth-contract-metadata](https://github.com/MetaMask/eth-contract-metadata) và tự động phát hiện) với thao tác nhấn giữ để ngừng xem một tài sản cụ thể.
* Hỗ trợ ENS (bạn có thể gửi bất kỳ tài sản nào đến ENS)
* Kênh thanh toán được tích hợp 
* Lịch sử giao dịch được cải thiện (Sent tokens, deployed contracts, đã gửi hoặc nhận ETH)
* Có khả năng view seed phrase và export và import private key
* Có khả năng quét mã QR
* Deeplinks (hỗ trợ EIP-681)
* EIP-681 - Payment URL 
* Điều khiển gas đơn giản
* Khả năng gửi tài sản với tiền thật ( Fiat money ) hoặc Crypto
### Web3 Browser functions
* Message signing- personal_sign, eth_sign and [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) —signTypedData
* DApps có thể truy cập máy ảnh để quét mã QR (Hỗ trợ cho EIP-945)
* Hỗ trợ WalletConnect cho thiết bị di động (sử dụng dapps từ safari / chrome)
* Favorite dApps — (có sẵn thông qua spotlight trong iOS)
* Có khả năng mở nhiều tab, trang đánh dấu và chia sẻ url
* ENS-> IPFS - bạn có thể truy cập .eth các trang web được lưu trữ trong IPFS thông qua trình duyệt
* Có khả năng chọn cổng IPFS gateway 
* [EIP-747](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md) — watchAsset support

### Networks
* Mainnet, Ropsten, Rinkeby, Kovan, Goerli
* Custom RPCs

### Security
* Hỗ trợ sinh trắc học - TouchID, FaceID và Passcode trên iOS, Vân tay / PIN trên Android
* Chế độ bảo mật được bật theo mặc định- [EIP-1102](https://medium.com/metamask/introducing-privacy-mode-42549d4870fa)
* Seed phrase backup
* Export private key
* Gia tăng hỗ trợ bảo mật tài khoản 
* EIP-1193: hỗ trợ tiêu chuẩn và đồng thời
* Hỗ trợ các thiết bị unprotected trên iOS
* Hỗ trợ phát hiện Phishing

## Lời Kết
Mặc dù vẫn đang trong bản Beta nhưng với những tính năng tuyệt vời Metamask phiên bản điện thoại sẽ là cầu nối Dapps vs thiết bị di động , đóng góp vào hệ sinh thái blockchain .

Bài viết được dịch từ : https://medium.com/metamask/metamask-mobile-public-beta-a-feature-guide-and-walkthrough-9d01de7190ae