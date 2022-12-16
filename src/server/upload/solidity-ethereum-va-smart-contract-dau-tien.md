![](https://images.viblo.asia/16b840d3-d14d-4bd6-8016-41d2b5b41702.png)

Ở bài viết này, mình mặc định các bạn đã biết khái niệm Blockchain và những ứng dụng của nó.
## Ethereum Là Gì?
#####  Khái niệm
Ethereum (ETH) là: 
* Một nền tảng (platform) chạy trên nền tảng công nghệ Blockchain
* Hỗ trợ hợp đồng thông minh (smart contract)
* Mạng lưới sử dụng tiền mã hoá 2.0
* Sử dụng blockchain riêng
* Có dự định chuyển từ sử dụng Proof of Work (Ethash) sang Proof of Stake (Casper)
* Có thể viết chương trình kiểu model Turing Complete chạy trên nền giao thức P2P

Vài năm trước, Vitalik Buterin (người sáng lập ra Ethereum) nhận thấy việc công nghệ blockchain không chỉ gói gọn trong giao dịch tiền tệ mà còn có thể ứng dụng vào tạo ra các phần mềm phân tán (DApps - Decentralized Applications).

Về căn bản, Bitcoin cũng có thể viết được phần mềm chạy trên đó, nhưng nó rất khó để thiết kế. Chính vì thế ông Vitamin Putin (Vitalik Buterin) mới đề xuất cộng đồng Bitcoin phải có 1 ngôn ngữ lập trình riêng để các dân developer tiện việc phát triển...Tuy nhiên, việc đó không được sự đồng ý 100% cho nên Vitalik Buterin mới phải tạo ra 1 đồng riêng là Ethereum như bây giờ.

##### Hợp đồng thông minh (smart contract)
* Hợp đồng thông minh (smart contract) là một giao thức quản lí hợp đồng.
* Smart contract là một bộ giao thức đặc biệt với mục tiêu là để đóng góp, xác nhận hay tiến hành quá trình đàm phán và thực hiện hợp đồng. Smart contract cho phép chúng ta triển khai giao dịch mà không cần thông qua một bên thứ ba trung gian.
* Những giao dịch này hoàn toàn dễ dàng truy dấu và không thể bị can thiệp hoặc đảo chiều. Smart contract chứa trong mình toàn bộ những thông tin chi tiết về các điều khoản và thực hiện chúng một cách tự động.

##### Cách Đọc Giao Dịch Của Ethereum
Chúng ta sẽ xem chi tiết 1 giao dịch trên [https://etherscan.io](https://etherscan.io)
Cụ thể chọn 1 giao dịch bất kỳ.

VD: https://etherscan.io/tx/0xa67b1b7c3fa00b3337ff63d540473faeef1c0ecfae0c9825f68f06f052a11a90

Bây giờ cùng giải thích chi tiết nhé:
* TxHash: `0xa67b1b7c3fa00b3337ff63d540473faeef1c0ecfae0c9825f68f06f052a11a90`

Còn được gọi là ID giao dịch, TxHash là cách để tìm kiếm một giao dịch cụ thể trên blockchain Ethereum.

* Block Height: `5750374 (73252 block confirmations)`

Là số thứ tự của khối mà giao dịch được thêm vào. Tức là thợ đào sẽ xử lý giao dịch của bạn khi họ đào Ethereum. Nói cách khác số đó biểu thị giao dịch đó được diễn ra ở block số mấy trong chuỗi blockchain.

* TimeStamp: `12 days 17 hrs ago (Jun-08-2018 12:00:22 AM +UTC)`
Thời điểm xử lý giao dịch

* Value: `0 Ether ($0.00)`

Số lượng tiền ETH trong chuyến giao dịch đó. Ở đây là 0$.

* Gas Limit:  `100000`

Số Gas tối đa mà bạn sẵn sàng trả khi thực hiện giao dịch

* Gas Used by Txn: `52155`

Số Gas thực sự dùng. Ví dụ bạn sẵn sàng trả 400k cho 1 lần "vui chơi" nhưng hum nay ngầy lễ "em" khuyến mãi 300k thui :v

* Gas Price: `0.000000091 Ether (91 Gwei)`

Giá của Gas, giá này được quyết định bởi thợ đào

* Actual Tx Cost/Fee: `0.004746105 Ether ($2.54)`

Phí bạn phải trả, phí này được tính bằng Gas Price * Gas Used. Như trên hình bạn có thể thấy Gas Used là 2100 còn Gas Price là 2 cho nên phí phải trả là 0.000042

* Nonce: `12173 | {0}`

Số lần mà địa chỉ đó đã giao dịch. Ví dụ nếu bạn chuyển tới chuyển lui tiền được 100 lần đi thì con số đó sẽ hiện 100.

### Solidity là gì?
Nói ngắn gọn: Solidity là ngôn ngữ lập trình để cài đặt hợp đồng thông minh (smart contract).
Solidity khá giống Javascript, hiện tại là ngôn ngữ phổ biến nhất cho lĩnh vực này.

Các khái niệm cơ bản:
* **Contracts**

    Mã của Solidity được đóng gói trong các hợp đồng. Một hợp đồng là khối xây dựng cơ bản của các ứng dụng Ethereum – tất cả các biến và chức năng thuộc về một hợp đồng, và đây là điểm khởi đầu của tất cả các dự án của bạn.
VD về contract có tên HelloWorld:
```
pragma solidity ^0.4.0;
contract HelloWorld {
    string public hello;
    constructor(string store) public {
        hello = store;
    }
}
```
* **Version Pragma**

Tất cả các mã nguồn đều bắt đầu với một phiên bản “version pragma“-một tuyên bố của phiên bản của trình biên dịch Solidity. Đây là để ngăn chặn các vấn đề với các phiên bản trình biên dịch tương lai có khả năng giới thiệu những thay đổi có thể phá vỡ mã của bạn.
Ở VD trên version pragma là: ^0.4.0
* **Biến**

Solidity yêu cầu khai báo biến và kiểu dữ liệu trước khi sử dụng.

VD: `uint public numberOne = 20`;

* **Structs** 

Cho phép tạo các kiểu dữ liệu phức tạp hơn có nhiều thuộc tính. Kiểu cấu trúc này tương tự như trong ngôn ngữ lập trình [C](https://en.wikipedia.org/wiki/Struct_(C_programming_language)).
```
struct Person {
uint age;
string name;
}
```
* **Arrays**

Có hai loại mảng trong Solidity: mảng cố định và mảng động.

Bạn có thể khai báo một mảng như là public, và Solidity sẽ tự động tạo ra một phương thức getter cho nó. Cú pháp như sau: `Person[] public people;`

Các hợp đồng khác sau đó sẽ có thể đọc (nhưng không viết) cho mảng này. Vì vậy, đây là một mô hình hữu ích để lưu trữ dữ liệu công cộng trong hợp đồng của bạn.

* **Keccak256 and Typecasting**

Ethereum có chức năng băm keccak256 được xây dựng trong, đó là phiên bản của SHA3. Một hàm băn cơ bản ánh xạ một chuỗi đầu vào thành 1 số thập lục phân 256-bit ngẫu nhiêu. Một thay đổi nhỏ trong chuỗi sẽ gây ra một thay đổi lớn trong băm. Nó hữu ích cho nhiều mục đích trong Ethereum.
Typecasting: chuyển đổi giữa các kiểu dữ liệu

Ngoài ra bạn có thể tham khảo thêm trong document của Solidity [https://solidity.readthedocs.io/en/v0.4.24/](https://solidity.readthedocs.io/en/v0.4.24/)

### Viết chương trình HelloWorld
Vâng, VD huyền thoại HelloWorld cho một ngôn ngữ mới:
Bạn vào trang Remix Solidity - [https://remix.ethereum.org](https://remix.ethereum.org) - Công cụ này này của chính chủ Ethereum.
Xóa hết nội dung có sẵn trong file và viết contract HelloWorld vào:
```
pragma solidity ^0.4.0;
contract HelloWorld {
    string public hello;
    constructor(string store) public {
        hello = store;
    }
}
```
Sau đó ấn run để build. Và đây là kết quả:
![](https://images.viblo.asia/1b050540-99bc-40c2-9f04-ff83dc1a7f90.png)

Tài liệu tham khảo:

[https://www.choxinti.com/2018/05/seri-solidity-ethereum-bai-2-viet.html](https://www.choxinti.com/2018/05/seri-solidity-ethereum-bai-2-viet.html)
[https://phuphan.info/2017/12/15/ethereum-cho-lap-trinh-vien/](https://phuphan.info/2017/12/15/ethereum-cho-lap-trinh-vien/)