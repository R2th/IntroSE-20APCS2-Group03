Giống như Deep Learning quá khó thì đã có Keras, thì lập trình các ứng dụng phi tập trung trên nền tảng Ethereum đã có Truffle. Hôm nay có thời gian tổng hợp lại và chia sẻ cho anh em cô gì chú bác hàng xóm láng giềng gần xa chút kiến thức. Để biết đâu ai đó đang có những ý tưởng về ứng dụng phi tập trung táo bạo mà chưa biết bắt đầu từ đâu có thể bắt tay vào làm ngay. 

**1. Một số thứ cần biết trong cuộc hành trình**

Như các bạn các biết hiện tại có ba loại hệ thống:
- Hệ thống tập trung: các máy tính trong mạng sẽ được kết nối đến một máy chủ và các yêu sẽ được sử lí trên máy chủ này.
- Hệ thống phân tán: trong hệ thống này sẽ có nhiều máy chủ hơn hệ thống tập trung. Điều này giúp cho hệ thống có khả năng chịu lỗi cao hơn hệ thống tập trung. (Khi một máy chủ bị lỗi, vẫn có các máy chủ khác thực hiện công việc)
- Hệ thống phi tập trung: mỗi một máy tính trong hệ thống điều đóng cả 2 vài trò: vừa là server vừa là client. Tất cả các máy tính trong mạng đều ngang hàng với nhau.  Người ta nói Blockchain là một cuốn sổ cái phân tán cũng là vì lí do này. Mỗi máy tính tham gia hệ thống Blockchain đều lưu giữ một bản sao của cuốn sổ, vừa có thể góp phần xác minh các block mới trong hệ thống, vừa có thể là nơi tạo các giao dịch được đưa vào block để hệ thống xác minh. Các tính toán trên hệ thống phi tập trung được thực hiện trên nhiều máy tính.

Tuy nhiên ứng dụng phi tập trung ( Decentralized Application - viết tắt là: DApp )  mình muốn các bạn biết các đặc điểm cần lưu ý sau:

* Ứng dụng phải hoàn toàn mã nguồn mở, được điều hành tự động, và không có tổ chức nào kiểm soát được phần lớn token của nó. 
* Ứng dụng có thể điều chỉnh giao thức của nó để đáp ứng các cải tiến được đề xuất và phản hồi của thị trường nhưng tất cả các thay đổi phải được quyết định bởi sự đồng thuận của người dùng.
* Các giao thức, dữ liệu và hồ sơ hoạt động của ứng dụng phải được lưu trữ mã hóa trong một Blockchain công cộng, phi tập trung để tránh việc tập trung hóa, dễ trở thành điểm yếu cho các hacker tấn công.
* Ứng dụng cần phải có ít nhất một token được mã hóa (Bitcoin hay một token nội bộ cho hệ thống của chính nó). Token này cần thiết cho việc truy cập vào ứng dụng và dùng để tặng thưởng cho bất kỳ đóng góp nào vào hệ thống.
* Ứng dụng phải tạo token theo thuật toán mật mã chuẩn đóng vai trò là bằng chứng về các node giá trị đang đóng góp cho ứng dụng (Bitcoin sử dụng thuật toán Proof of Work).

Yo... vậy thì bắt tay vào xây dưng một DApp đơn giản thôi nào. 
Một số thứ cần cài đặt:

* **Nodejs** 
*  **FrameworkTruffle**: Đây là framework được sử dụng phổ biến nhất để xây dựng các ứng dụng trên nền tảng Ethereum
* **Ganache**: Ứng dụng sẽ tạo một mạng Ethereum local. Sẽ có sẵn các tài khoản chứa 100 ETH (Ước gì là 100 ETH thật chứ không phải test :D :D :D). Sẽ có một số điều cần lưu ý mình sẽ nói ở phần cài đặt cụ thể. 
* **Ngôn ngữ lập trình Solidity** : Solidity là một ngôn ngữ high-level dùng cho ứng dụng vào smart contract. Nó là một ngôn ngữ hướng đối tượng được thiết kế dành riêng cho Ethereum Virtual Machine. Mình thấy nhiều người nói đây sự kết hợp của javascript với hướng đối tượng.
* **Ethereum**: Chắc không cần nói nhiều rồi. Bác nào mà định start-up mà sợ bị hack 51% hay các lỗi khác thì cứ dev trên các nền tảng lớn cho an toàn nha.(Chỉ lo lỗi ở code của mình chứ không lo lỗi ở hệ thống Blockchain) Sử dụng loại tiền điện tử là: **ether(ETH)**
* **Metamask**: plugin này sẽ tạo ví điện tử trên trình duyệt cho các bạn một các đơn giản, có thể liên kết nhanh chóng với các ví điện tử của các nền tảng như MyEtheWallet(Mình hay dùng mỗi cái này :D). Ứng dụng giúp bạn tiếp cận các ứng dụng phi tập trung dễ dàng hơn. Có tích hợp tính năng cảnh báo khi vào các trang web không an toàn(Mình chưa từng thấy bị cảnh báo bao giờ kể cả vào những trang phim mình thích hí hí).
* **web3js**: thư viện dùng để tương tác với Smart Contract. 

**2.Cài đặt các thứ các thứ thôi** 

a. **Nodejs** vào trang chủ tải về setup nha các bạn. [đây](https://nodejs.org/en/download/) Mình sẽ sử dụng Nodejs để build phần giao diện và tương tác của trang web phi tập trung của mình

b.**Truffle** cài đặt đơn giản với command `npm install truffle -g` .Cái này là để complie, deploy Smart Contract lên các lớp mạng của Ethereum.

c. **Ganache** vào trang chủ tải về tiếp để setup nha [đây](https://truffleframework.com/ganache). Như đã nói ở trên, ứng dụng tạo mạng Ethereum local với các địa chỉ có thể liên kết được với Metamask

d. **Solidity** mình hay sử dụng VSCode để code và install Solidity vì nó khá dễ dàng. Tải VSCode tại [đây](https://code.visualstudio.com/). Sau đó, bạn vào phần Extentions(Ctrl + Shift + X) và tìm kiếm Solidity để install vào trong VSCode. 

e. **Metamask** các bạn vào [đây](https://metamask.io/) để tìm phần cài đặt lên trình duyệt của mình. 

f. **web3js** cài đặt với command `npm install web3` cài này sẽ dùng khi bạn muốn tương tác với Smart Contract, kết nối giữa giao diện web với Smart Contract.

**3. Quẩy cái nhẹ với sample của Truffle nào**

Truffle là framework của nền tảng của Ethereum nên nó có rất nhiều sample sẵn. Các bạn có thể tham khảo tại [đây](https://truffleframework.com/tutorials)
Mình sẽ hướng dẫn các bạn làm cái sample kute nhất đó là pet-shop nhé. 

Mình sẽ sử dụng **Windows PowerShell** để thực hiện các command line nhé. Các bạn chú ý chạy cùng với quyền admin nhé. 

**B1**: framework mà. Tải code về cái nhẹ đã. sử dụng `mkdir <tên project>` để tạo folder mới. Các bạn lưu ý phải là folder empty nhé

**B2**: dùng lệnh cd di chuyển vào trong thư mục rỗng vừa tạo. gõ `truffle unbox pet-shop` để download sample về. 

**B3**: Sử dụng `truffle compile` để compile code Smart Contract có trong sample.

**B4**: Bật Ganache lên và đợi cho các thứ các thứ load xong đã. Sẽ có 10 tài khoản với 100ETH với các setting mặc định là 

NETWORK ID : 5777

RPC SERVER HTTP://127.0.0.1:7545

các thông tin này có thể được thay đổi trong phần setting của ứng dụng

Lúc này mạng Ethereum cục bộ đã khởi động xong. Quay về **Windows PowerShell** thôi

**B5**: sử dụng `truffle migrate` để deploy Smart Contract lên trên mạng cục bộ vừa tạo. 
Nếu deploy thành công bạn sẽ thấy số dư ở tài khoản đầu tiên giản đi một ít tại Ganache. 

**B6**: sử dụng `npm run dev` để build trang web của bạn lên địa chỉ http://localhost:3000/. À các bạn nhớ setup trình duyệt mặc định trừ cái IE, Opera ra nhé. Metamask không có add được trên đấy đâu :D 

**B7**: Sau khi cài đặt Metamask thành công các bạn sẽ thấy có hình con cáo ở phía trên bên phải trình duyệt. Bấm vào đấy và accept mấy cái quy định của họ. Đến phần tạo tài khoản thì bạn chọn vào **Restore from seed phrase**. Copy chuỗi MNEMONIC trên Ganache vào và đặt pass mới. Mình nói qua một chút, do ứng dụng phi tập trung không có công ty nào quản lí nên tài khoản và ví của bạn cũng vậy. Nếu bạn mất mật khẩu thì sẽ không có chức năng lấy lại mật khẩu đâu. Hệ thống sẽ dùng chuỗi MNEMONIC( gồm 12 chữ cái ngẫu nhiên) xem như là mật khẩu backup của bạn. Bạn sẽ dùng cái này để khôi phục lại nếu quên mật khẩu. Nên nếu bạn đang sở hữu ví có chưa các coin thật thì nên cẩn thận bảo quản cái này nha. Khi dùng chuỗi  MNEMONIC trên Ganache tức là bạn sẽ liên kết với các tài khoản có sẵn trong Ganache. Sau đó bạn nhấn Ok để đăng nhập vào tài khoản. 

**B8**:Lúc này bạn đang ở mạng Mainnet của Ethereum nên sẽ thấy số dư là 0 ETH. Chọn để chuyển qua **Custome RPC** và điền vào trường **New RPC URL** cái địa chỉ **RPC SERVER** của Ganache khi nãy là HTTP://127.0.0.1:7545 và nhấn **Save** . Back lại sẽ thấy tài khoản trùng với tài khoản đầu tiên trên Ganache với số dư tương ứng. 

**B9**: Triển thôi. Bạn vào giao diện web và tiến hành mua  `cờ hó` mà bạn thích. Sau khi mua Smart Contract của sample này sẽ tự động khóa con chó mà bạn đã mua không cho ai mua nữa. Tiền cũng sẽ tự động được trừ. 

Trong các bài viết tiếp theo mình sẽ giải thích cho các bạn cụ thể từng phần của sample này, một số điều lưu ý khi code Smart Contract, các chuẩn token của nền tảng Ethereum, cách tạo ra đồng coin, token của riêng mình,...

Các bạn cũng có thể tự nghiên cứu các sample của truffle tại phần tutorials, họ cũng viết rất chi tiết rồi. :D Cảm ơn các bạn đã đọc bài của mình. 

Time for love... but I love alone