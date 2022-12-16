Với sự ra đời của chuẩn ERC20 sự bùng nổ về crypto trong Ethereum bắt đầu, các sàn mọc lên như nấm sau mưa, bán cả trăm loại ERC20 nhưng như thế là chưa đủ vs thị trường crypto, rồi sau đó nhu cầu xây dựng sàn giao dịch phi tập trung trên blockchain trở thành một cơn sốt. Sàn giao dịch này có thể được sử dụng như một nhà cung cấp thanh khoản không thể thay đổi cho thị trường mua và bán token và một oracle về giá token. Và sau đây mình sẽ tóm tắt những thứ cần thiết để xây dựng một sàn phi tập trung thông qua các blog mình đã đọc được . Link các bài tham khảo mình để dưới cuối mọi ng có thể đọc thêm để có cái nhìn tổng quan hơn . Bắt đầu nào let's gooo !!!

![](https://images.viblo.asia/df5c0b98-8bad-4e70-9a6d-b07b21e5b035.jpg)

# Development enviroment
Môi trường phát triển theo mọi người thì có thể đây tiêu chí phụ nhưng lại là đầu tiên , việc chọn code bằng ngôn ngữ gì ( Solidity , Vyper ) hay phát triển trên framework như Truffle hay Hardhat . Mình có đọc qua code của một vài project như Uniswap, Balancer cùng vời cập nhật một vài project dành cho developer khác thì rút ra một vài recommend như sau . Smartcontract nên chọn **Solidity** tuy rằng Vyper được đánh gía là ít sảy ra những lỗi do sơ xuất của dev trong lúc code nhưng số lượng developer solidity lại nhiều hơn, các câu hỏi lỗi có thể dễ dàng tìm thấy câu trả lời trên stackoverflow. Về framework chúng ta có thể sử dụng **Hardhat** vì một số tính năng nổi bật của Hardhat như :
- Tích hợp nhiều phiên bản solidity trên cùng một project
- Debug dễ dàng hơn khi có thể dùng **console.log** ra các biến (Solidity vốn ko hỗ trợ console.log)
- Plugin: Giúp developer có thể bổ sung chức năng, tùy vào từng dự án cụ thể
- Hỗ trợ TypeScript
- Tối ưu gas và thời gian deploy nhanh


![](https://images.viblo.asia/484bef7b-d9eb-4c66-bc3e-5382c23b96f2.png)

Mọi người có thể đọc thêm về hardhat tại https://viblo.asia/p/quen-truffle-di-tu-nay-chung-ta-da-co-hardhat-yMnKM2BaZ7P
# Wallet 
Đây cũng tiếp tục là một tiêu chí phụ nhưng lại rất quan trọng với trải nghiệm người dùng. Sau khi phát triển một vài dự án gần đây mình nhận thấy số lượng người dùng trên điện thoại ngày càng lớn. Trước kia các Dapp sẽ thao tác với blockchain thông qua web3 và ví là **Metamask** tuy ví này khá nổi bật trên nền tảng web với vai trò như một extention tuy nhiên việc triển khai trên điện thoại lại đi chậm hơn so với một ví khác đó là ví **Trust** vì thế mà chúng ta cần phải tích hợp và project của mình các loại ví khác nhau và phải luôn đảm bảo rằng đáp ứng được càng nhiều người dùng càng tốt . Mình recommend sử dụng **Web3Connect** , đây là một thư viện  giúp developer frontend cung cấp multiple providers cho Dapp của mình.

Theo mặc định, **Web3Connect** hỗ trợ (Metamask, Dapper, Gnosis Safe, v.v.) và WalletConnect, Bạn cũng có thể dễ dàng định cấu hình thêm để hỗ trợ các ví Fortmatic, Squarelink và Portis

![](https://images.viblo.asia/8c8692d7-f888-4955-b7b5-933127d9167c.png)

Link demo : https://web3connect.com/
github : https://github.com/TotlePlatform/web3connect
# Automated Market Maker và Pool
Ở các sàn tập trung hiện tại để trade các loại token với nhau chúng ta sẽ sử dụng cơ chế sổ cái. Nghĩa là dựa vào giá của người bán và người mua , người bán sẽ đặt giá bán cao nhất có thể , người mua sẽ mua với giá thấp nhất có thể và khi giá của người mua và người bán khớp với nhau thì sẽ tạo ra giá hiện tại. Cơ chế này có một vài nhược điểm đó là nếu như không khớp giá thì thị trường ko hoạt động được .Người bán không ai mua, người mua không ai bán và một nhược điểm nữa đó là chúng ta gửi token vào sàn và việc đặt lệnh chẳng qua là gửi request vào server của họ chứ bản chất là mình đã đưa hết tiền cho sàn rồi. Hoặc nhiều trường hợp khác như  sàn Okex vừa rồi cũng ko cho người dùng rút tiền ra hẳn 1 tháng khiến nhiều ng yếu tim cảm thấy mất niềm tin vào cuộc sống :v https://www.okex.com/academy/en/okex-to-resume-withdrawals-after-the-temporary-suspension

Vì thế Automated Market Maker (AMM) và Liquidity pool ra đời , AMM là các thuật toán để tính toán giá token ngay tại thời điểm mua và được triển khai trên smart contract còn Pool là một contract với lượng thanh khoản lớn giữa 2 hoặc nhiều token. AMM sẽ đóng vai trò là trung gian, người dùng sẽ chuyển token vào liquidity pool, sau đó sẽ swap token đó với token khác trong pool và số lượng token đầu ra sẽ được tính thông qua AMM . Hãy cùng xem qua một vài thuật toán AMM đang được sử dụng trên một số sàn 
## Uniswap AMM
Uniswap là nền tảng exchange với liquility gồm **2 loại token** sử dụng công thức AMM : 

$x * y=k$ 

Trong đó **x** và**y** là số lượng token trong pair ( một cách gọi tên khác của pool ). Trong mô hình của Uniswap sẽ có 2 đối tượng đó là liquidity provider và trader. Liquidity provider là ng sẽ gửi vào Pool 2 token với một tỉ lệ nhất định nếu tỉ lệ đó lệch quá thì sẽ bị trader và swap hết rồi mang đi chỗ khác bán ăn chênh lệch. Và khi người dùng gửi token vào pool sẽ được trả **liquidity provider token** và dùng nó để rút thanh khoản mà mình đã gửi vào.
## Balancer AMM
Balancer là nền tảng exchange với liquidity **min là 2 và max là 8 loại token** trong 1 pool sử dụng công thức :

$V = \prod_{t}B_t^{W_t}$

với $B_t$ là số lượng token t trong pool và $W_t$ là tỉ lệ của token $B_t$ trong pool và tổng các  $W_t$ bằng 1 . Các cơ chế về thêm thanh khoản hay swap có một vài điểm mới hơn so với Uniswap đó là hỗ trợ thêm một cơ chế tìm pool cho người dùng với một lượng input token a và output là pool mà ng dùng có thể nhận lượng token b nhiều nhất khi swap ,... ngoài ra còn một số lợi ích khác nữa khi sử dụng Balancer mọi người có thể đọc thêm tại : https://docs.balancer.finance/ 
# Audit 
Đây chắc không phải là vấn đề cần phải nhắc khi phát triển Defi nhưng nên làm như thế nào thì chính ra cũng không có một câu trả lời rõ ràng .Nhưng mình recommend một hướng như sau : 
- Đầu tiên dev cần phải đọc các audit report của các nền tảng như [Uniswap](https://uniswap.org/audit.html#orga882e47) , [balancer](https://docs.balancer.finance/core-concepts/security/audits) ,... để tránh vấp phải những bug của họ đồng thời hiểu được cơ chế một cách tường tận nhất. Bước này giúp giảm thiếu bug trong quá trình code . 
- Sau khi hoàn thành việc code thì nên thuê các bên audit smartcontract có tiếng như **Trail of Bits**, **Consensys**, **OpenZeppelin**,... để họ audit và mình có thể dùng audit report của họ thêm vào document như một khẳng định là sàn của mình an toàn . 

Các bên audit uy tín khác mọi người có thể đọc thêm tại  : https://boxmining.com/top-blockchain-security-firms/

Ngoài ra nên chạy thêm các Bug Bounty để cộng đồng audit nữa.
# Public sdk
SDK khá quan trọng trong việc phát triển hệ sinh thái. Nó giúp nhiều ứng dụng sử dụng nền tảng của mình khi phát triển . Vì thế đây cũng là một khía cạnh mà khi phát triển các dự án defi nên có trong project của mình .

Các bạn có thể đọc thêm về các sdk của uni tại : https://viblo.asia/p/gioi-thieu-cac-sdk-cua-uniswap-cho-lap-trinh-vien-V3m5WWVW5O7
## Oracle
Đây là một tính năng mở rộng thêm khi phát triển Defi . Đó là khi chúng ta giao dịch trên Uni chẳng hạn, giá của token sẽ được thị trường quyết định một cách công bằng không giống như sàn Centralized là họ có thể tự điều trỉnh giá hiển thị . Giá đó được public bằng SDK và các Dapp có thể sử dụng, nhờ thế mà có thể mở rộng hệ sinh thái của mình. Tuy nhiên việc sử dụng Oracle cũng có một số nhược điểm đó là nếu bị swap một lượng quá lớn sẽ làm lệch giá token trong pool và ảnh hưởng đến oracle dẫn đến các Dapp trong hệ sinh thái bị ảnh hưởng . Đây không chỉ là giả thuyết mà đã có những vụ hack rồi bạn có thể đọc thêm về một vụ hack :
https://medium.com/harvest-finance/harvest-flashloan-economic-attack-post-mortem-3cf900d65217
# Public lên 1Inch
Đây là một bước để kéo người dùng vào nền tảng của mình sau khi đã dev xong . 1inch exchange là DEX Aggregator Protocol cho phép người dùng có thể thực hiện giao dịch tokens với giá tốt nhất trên các sàn và có mức slippage thấp. Để làm được điều đó, 1inch đã áp dụng giải pháp smart routing - Pathfinder. Người dùng muốn thực hiện giao dịch token A sang token B, Pathfinder của 1inch sẽ trả về giá tốt nhất của token A trên các nền tảng. Khi user thực hiện lệnh swap, 1inch sẽ chia nhỏ lệnh giao dịch tới các DEXes khác nhau bằng 1 transaction với gas token để giảm gần 1 nửa phí giao dịch. 

![](https://images.viblo.asia/eef8ce9c-5f2a-490e-9630-90b544a718a3.jpg)

# Biểu đồ
Một số trader chắc chắn sẽ ko quên những bài học vỡ lòng về sóng elliott hay những người chơi hệ phân tích theo nến sẽ thấy hơi hụt hẫng khi tham gia trade trên nền tảng Defi. Để có thế thu hút nhiều trader hơn thì nền tảng của chúng ta phải có một trang phân tích và vẽ biểu đồ giá cho người dùng. Chúng ta cần ngược lại một chút để hiểu hơn .Bình thường trên các nền tảng web sử dụng database truyền thống thì việc truy vấn vô cùng đơn giản tuy nhiên trên blockchain thì đây là một vấn đề . Chính vì thế The Graph ra đời , đây là  một index protocol để truy vấn trên các mạng như Ethereum và IPFS. Bất kỳ ai cũng có thể xây dựng và public các API , đồ thị giúp hiển thị và truy cập data dễ dàng hơn.

![](https://images.viblo.asia/07e59027-7e7b-404f-a9c5-48ce99675a74.jpg)

Mọi người có thể đọc thêm tại :  https://thegraph.com/
# Phái sinh
Phái sinh là một khái niệm khá mở nhưng chúng ta có thể hiểu là chúng ta sinh ra một cách kiếm tiền mới trên nền tảng của mình . Ví dụ các phái sinh hiện tại trên Sushiswap, Curve ,.. 
## SushiSwap 
Nền tảng này mở rộng của Uniswap nhưng lại hay hơn một xíu. Đó chính là có thêm một tính năng **Farm**. Nôm na thì khi mình cung cấp liquidity vào pool của uniswap thì họ sẽ trả về cho mình **liquidity provider token** và token đó ngoài để trả tiền khi mình rút liquidity khỏi pool thì trên Sushi họ cho stake token đó và sinh ra **sushi token**. Vậy là ngoài việc liquidity provider ăn lãi từ phí swap của trader thì nay còn đc ăn thêm sushi token. tại thời điểm mình viết thì sushi token có giá ~7$ trên sàn Binance. Đây làm một động lực to lớn kéo người dùng vào nền tảng của mình 
## Curve
Nền tảng này có phái sinh khá giống với SushiSwap đó là cũng farm ra token **crv** tuy nhiên nó kéo người dùng một cách khéo ơi là khéo là có thể stake liquidity provider token từ Uniswap ( nền tảng ko có phái sinh ) . Như vậy là có thể kéo người dùng từ Uni qua curve một cách hợp lý . Thời điểm viết giá Crv đang là 1.4$ trên Binance .

# Tổng kết
Thời điểm mình viết có thể sẽ bị lạc hậu sau 1 2 tháng nữa vì tốc độ thay đổi đang là rất nhanh. Cũng khá dễ hiểu vì dòng tiền đổ vào thị trường blockchain đang rất lớn tạo động lực cho công nghệ này phát triển. Nếu còn có thêm khía cạnh nào giúp cho một project defi phát triển tốt hơn hi vọng mọi người hãy comment phía dưới.