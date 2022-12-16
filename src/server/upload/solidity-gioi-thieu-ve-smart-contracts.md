## Một ví dụ đơn giản về Smart Contract 
- Hãy bắt đầu với một ví dụ đơn giản nhất về smart contract. Chúng ta không cần phải hiểu hết mọi thứ, chúng ta sẽ tìm hiểu chúng sau.

```
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```
- Dòng đầu tiên `pragma solidity ^0.4.0;`  cho chúng ta biết rằng code này được viết trên Solidity version 0.4.0 và mọi phiên bản mới (ví dụ Solidity version 0.5.0) sẽ không làm phá vỡ chương trình. Điều này đảm bảo rằng, hợp đồng (**smart contract**) sẽ không có bất cứ hoạt động nào kỳ quặc ở các phiên bản cao hơn. Keyword `pragma` để khai báo version đang được sử dụng của solidity. 

- Một hợp đồng (**contract**) là những dòng bao gồm tập hợp các code (là các chức năng của hợp đồng) và dữ liệu (là các trạng thái của hợp đồng) nằm ở cụ thể một địa chỉ trên Ethereum blockchain.  Dòng `uint storedData;` khai báo một biến trạng thái được gọi là `storedData` của kiểu `uint`([unsigned integer of 256 bit](http://diendan.congdongcviet.com/archive/index.php/t-42687.html)). Chúng ta có thể hiểu đơn giản là nó là một record trong database thông thường, có thể query được, thay đổi được và được quản lý bởi database. Trong trường hợp của Ethereum, đây luôn luôn là những hợp đồng sở hữu. Và trong trường hợp này, các function `set` và `get` được sử dụng để sửa dữ liệu, hay nhận giá trị từ các biến. 

- Để truy cập đến các biến trạng thái (state variable) cụ thể trong trường hợp này là `storedData`, chúng ta không cần thiết phải sử dụng `this.` như các ngôn ngữ thông thường khác. Như chúng ta đã thấy, thì `return storedData;` là được. Nhưng câu hỏi đặt ra là nếu sử dụng `this.storedData;` có được hay không :question: Chúng ta sẽ trả lời câu hỏi này khi hiểu rõ hơn về **Solidity**.

-  Hợp đồng (**contract**) mà được ví dụ ở trên không có làm gì nhiều. Nó đơng giản chỉ là đồng ý bất cứ ai đó lưu trữ một số (unsigned integer 256bit) có thể được truy cập bởi bất cứ ai mà không có cơ chế nào ngăn chặn việc thay đổi giá trị của nó. Như vậy mọi người đều có thể sử dụng phương thức **set** để thay đổi giá trị con số của bạn. Tuy nhiên giá trị của chúng ta đã lưu vẫn có thể tìm thấy chính xác trên history của block-chain. Về sau, chúng ta sẽ tìm hiểu cách ngăn chặn bất cứ ai truy cập và thay đổi giá trị của bạn ngoại trừ chính bản thân bạn. :heart_eyes: 

- :notebook: Mọi **indent** (contract names, function names, variable name) là những ký tự quy định trong ASCII. Nó cũng có thể được lưu trữ các chuỗi encoded utf-8 

- :warning:  Thật cẩn thận khi sử dụng Unicode text, một ký tự trông có vẻ giống nhau, có thể trong quá trình encoded tạo ra các byte array khác nhau.

## Một ví dụ khác về tiền tệ 
- Contract dưới dây sẽ cài đặt một cách đơn giản nhất về mẫu của một đồng tiền điện tử. Nó có thể sinh ra các coins của nó, nhưng chỉ duy nhất người tạo ra contract mới có thể tạo ra các coint đó. Bất cứ ai cũng có thể gửi coins đến người khác mà không cần đăng ký với username và mật khẩu. Mọi thứ bạn cần là một cặp khóa Ethereum. 

```
pragma solidity ^0.4.21;

contract Coin {
    // The keyword "public" makes those variables
    // readable from outside.
    address public minter;
    mapping (address => uint) public balances;

    // Events allow light clients to react to
    // changes efficiently.
    event Sent(address from, address to, uint amount);

    // This is the constructor whose code is
    // run only when the contract is created.
    function Coin() public {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        if (msg.sender != minter) return;
        balances[receiver] += amount;
    }

    function send(address receiver, uint amount) public {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```
- Đừng băn khoăn khi mà đọc chẳng hiểu gì cả. Vì cơ bản chúng ta đâu cần phải hiểu ngay đâu. Đó là cách chúng ta tiếp nhận từ từ từng vấn đề, chúng ta không thể hiểu rõ mọi thứ ngay từ đầu và chấp nhận những hiểu sai ban đầu, hoặc không hiểu gì, để rồi, khi có lượng kiến thức nhất định, chúng ta sẽ hiểu rõ hơn. 

- Hợp đồng (**contract**) này giới thiệu một số tiến trình mới. Chúng ta hãy lần lượt tìm hiểu chúng. 

- `address public minter;` khai báo một biến trạng thái kiểu `address` và nó là `public`. Kiểu `address` là một giá trị 160-bit, không cho phép bất kỳ một phép toán học nào. Nó phù hợp để lưu trữ các địa chỉ của hợp đồng hoặc cặp khóa thuộc về cá nhân. Từ khóa `public` sẽ tự động sinh ra một funtion mà cho phép bạn truy cập đến giá trị biến trạng thái hiện tại từ ngoài contract. Nếu không có keyword `public`, các contract khác sẽ không có cách nào truy cập đến các biến trạng thái.
```
function minter() returns (address) { return minter; }
```

- Dĩ nhiên, , function này nó sẽ không hoạt động, chúng ta chỉ có cái tên function và biến trạng thái thôi, nhưng hy vọng rằng compipler nó sẽ hiểu được ý tưởng của chúng ta. 

- Dòng tiếp `mapping (address=> uint) public balances;` tạo ra một biến trạng thái public, nhưng nó có kiểu dữ liệu phức tạp. Kiểu map giữa các địa chỉ và một số unsigned integer. :detective: Nó là kiểu key=>value đấy. Có ai không hiểu kiểu key=>value không anh em? 
## Blockchain Basic 
- Blockchains là một khái niệm không quá khó hiểu với lập trình viên. Đó là lý do mà hầu hết các complications (mining, hashing, elliptic-curve cryptography, p2p network) chỉ cung cấp các tính năng và các lời hứa. Một khi bạn đồng ý với những tính năng (features) giống như họ hứa hẹn, bạn sẽ không phải lo lắng về công nghệ bên dưới, giống như bạn không phải hiểu tại sao Amazon web service của Amazon hoạt động như nào khi order chúng. 
### Transactions

- Một blockchain được chia sẻ một cách công khai trên toàn cầu,  transactional database. Điều này có nghĩa là bất cứ ai cũng có thể đọc những dữ liệu trong database nếu là một thành phần của mạng. Nếu bạn muốn thay đổi một cái gì đó trong database, bạn phải tạo ra một transaction cái mà được đồng ý bởi mọi người khác. Từ **transaction** bao hhafm rằng mọi sự thay đổi mà bạn muốn có thể thực hiện hoàn toàn, hoặc bị từ chối. Trong khi transaction của bạn được thực thi trong database, thì không một transaction nào có thể thay đổi nó. 
- Ví dụ, tưởng tượng rằng bạn có một danh sách số tiền của mọi tài khoản trong một đồng tiền điện tử. Nếu một yêu cầu chuyển tiền từ tài khoản này sang một tài khoản khác, transactional một cách tự nhiên là database đảm bảo rằng số tiền trừ đi từ tai khoản chuyển, và tăng thêm ở tài khoản nhận. Nếu trong quá trình đó, vì bất kỳ một lý do nào đó, số tiền từ tài khoản chuyển không khả thi, thì transaction bị thất bại, và dữ liệu không được thay đổi trong database.
- Hơn nữa, một transaction luôn luôn được xác nhận thông quá chữ ký mã hóa của người gửi (sender, creator). Nó đảm bảo rằng quá trình truy nhập và thay đổi dữ liệu database được an toàn. Trong ví dụ về tiền điện tử, một phép kiểm tra đơn giản là chỉ người giữ key mới có khả năng thực hiện việc chuyển tiền từ tài khoản đó. 

### Blocks 
- Một khó khăn lớn đặt ra trong các điềukhoản của Bitcoin nó được gọi là "double-spend attack". Hiểu nôm na là một khoản tiền được sử dụng đến hai lần. Nó đề cập đến vấn đề,  tồn tại trong mạng hai transaction có nội dung xung đột nhau. Như vậy giải quyết như nào? 
- Câu trả lời là bạn không phải quan tâm. :face_with_thermometer: . MỘt transaction sẽ được chọn cho bạn, các transaction sẽ được chia nhỏ được gọi là các "block" và chúng sẽ được thực thi và phân chia thành một phần của các node. Nếu hai transaction xảy ra xung đột với một cái khác, thì một cái sẽ được thực hiện và cái thứ hai sẽ bị từ chối và không trở thành một phần của một "block". 
- Các block là một chuỗi dài có thứ tự theo thời gian từ "blockchain" có xuất phát từ ý nghĩa đó. Các block được thêm vào chuỗi một cách đều đặn. Với Etheum là mỗi 17s sẽ có một block được thêm vào chuỗi. 
- Là một phần của "cơ chế lựa chọn thứ tự" (được gọi là "khai thác"), có thể xảy ra các khối được hoàn nguyên theo thời gian, nhưng chỉ ở “đầu” của chuỗi. Càng nhiều khối được thêm vào hàng đầu thì càng ít khả năng. Vì vậy, nó có thể là giao dịch của bạn được hoàn nguyên và thậm chí loại bỏ khỏi blockchain, nhưng bạn còn chờ đợi, ít có khả năng nó sẽ được.
### Nguồn tham khảo: 
- Xem bài gốc [ở đây](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html) , bài này mình vẫn đang dịch tiếp . Mong anh em thông cảm, mình sẽ cập nhật bài viết này dần dần :bow: