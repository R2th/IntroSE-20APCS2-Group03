Từ sau những năm tháng rực rỡ của Bitcoin đã mở ra một thời kì blockchain mới với hàng trăm loại blockchain khác nhau tiêu biểu như ETH, NEO, TRON, ... Mỗi blockchain sinh ra để cải tiến một nhược điểm nào đó của mô hình blockchain cũ như tăng tốc độ, tăng tính ứng dụng, có thể lập trình, tích kiệm tài nguyên. Mở ra những tiềm năng phát triển hứa hẹn có thể áp dụng blockchain trong cuộc sống thường ngày của chúng ta. Tuy nhiên chính sự phát triển theo hướng đó dẫn đến việc giữa các blockchain bị cô lập với nhau. Tuy rằng chúng ta hoàn toàn có thể đưa các token lên các sàn tập trung để exchange nhưng như thế lại mang tính tập trung hơn nữa tài khoản trên sàn cũng là do sàn quản lý như vậy thật thiếu an toàn. Cộng đồng đã mơ về một sàn phi tập trung nơi mà mọi nền tảng blockchain có thể exchange mà ko có một bên thư ba nào can thiệp vào , chính vì thế mà **Hashed TimeLock Contract** ra đời .

![](https://images.viblo.asia/f9097812-9f29-40de-880f-853aef7bd0b2.png)

# Vấn đề
Khi hai người muốn trao đổi 2 vật phẩm thì sẽ làm thế nào ? Người A gửi cho người B rồi người B gửi cho người A . Như vậy thì nhỡ đâu người B nhận được rồi sau đó bùng luôn thì sao :scream: . Một cách khác đó là nhờ một người thứ 3 , khi cả người A và B đưa vật phẩm cho người thứ 3 sau đó người thứ 3 sẽ đưa lại cho cả người B và A . Nhưng nhỡ đâu người thứ 3 cầm rồi chạy mất thì sao  :cold_sweat: . Và thực trạng hiện nay thì cách trade ở một số sàn giao dịch tập trung như Binance  Okex đều là như thế. Chính vì thế mà ng ta mong muốn có một sàn phi tập trung từ rất lâu rồi . Chắc một vài bạn sẽ tự hỏi chẳng phải viết 1 cái smart contract trên eth là giải quyết đc vấn đề người thứ 3 sao ? . Đúng thế nhưng nếu ng dùng muốn exchange giữa 2 loại blockchain khác hẳn nhau thì sao ? Và hashed timelock contract là 1 câu trả lời cho câu hỏi này .
# Hashed TimeLock Contract là gì ?
Hashed TimeLock Contract ( HTLC ) là một loại smart contract được sử dụng để trao đổi các loại coin, token khác nhau mà không cần phải cần đến bên thứ ba cũng như không phải lo lắng về các rủi ro scam. Bằng cách cho phép thực hiện giao dịch trong một giới hạn thời gian nhất định. Cụ thể hơn là , người nhận giao dịch HTLC phải xác nhận khoản thanh toán bằng cách gửi một đoạn key mã hóa để xác thực trong một khung thời gian cụ thể (tính bằng số khối). Nếu người nhận từ chối hoặc không yêu cầu thanh toán, số tiền sẽ được trả lại cho người gửi ban đầu. 

Có hai yếu tô quan trọng trong HTLC đó là Hashlock và timelock :

**Hashlock**: người đầu tiên tạo một sẽ tạo một secret sau đó dùng một hàm mã hóa để hash ra một mã gọi là hashlock.

**Timelock**: là một chức năng hạn chế việc giao dịch trong một thời điểm cụ thể (tính bằng số block) .
# Luồng hoạt động 

Kịch bản của chúng ta sẽ gồm hai người **Alice** người giữ Ethereum và **Bob** người giữ Bitcoin . Hai người này sẽ thực hiện trao đổi Eth và BTC mà không cần phải tin tưởng lẫn nhau . Quá trình này bao gồm hai bên và bốn tài khoản, vì vậy quá trình sẽ gồm :

Alice 2 tài khoản : Tài khoản gửi ETH và tài khoản nhận BTC

Bob 2 tài khoản : Tài khoản gửi BTC và tài khoản nhận ETH

![](https://images.viblo.asia/dc40e0fc-e1ed-4501-85fc-dc26940dae54.png)

Quá trình sẽ diến ra như sau :

- Alice chọn một số hoặc 1 chuỗi kí tự ngẫu nhiên đặt là **secret** sau đó sử dụng một hàm hash để tạo ra hasklock
- Taọ một Lock trên contract của Eth, bao gồm các thông tin cần thiết như hashlock, timelock ,input amount , receiver, sender ,...
- Gửi cho Bob hashlock đó 
- Bob cũng tạo một Lock trên BTC gồm hachlock mà Alice gửi ,timelock, input amount, receiver, sender,...
- Alice sẽ sử dụng secret để giải mã Lock của Bob để nhận BTC đồng thời secret sẽ được public lên mạng và Bob sẽ biết
- Bob sửa dụng **secret** đã được public để mở Lock của Alice và nhận được ETH 

# Demo
Mình sẽ demo code một chiều từ ETH 
```js
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract HashTimeLock {

    mapping(bytes32 => LockContract) public contracts;

    //                   / - WITHDRAWN
    // INVALID - ACTIVE |
    //                   \ - EXPIRED - REFUNDED

    uint256 public constant INVALID = 0; // Uninitialized  swap -> can go to ACTIVE
    uint256 public constant ACTIVE = 1; // Active swap -> can go to WITHDRAWN or EXPIRED
    uint256 public constant REFUNDED = 2; // Swap is refunded -> final state.
    uint256 public constant WITHDRAWN = 3; // Swap is withdrawn -> final state.
    uint256 public constant EXPIRED = 4; // Swap is expired -> can go to REFUNDED

    struct LockContract {
        uint256 inputAmount;
        uint256 outputAmount;
        uint256 expiration;
        uint256 status;
        bytes32 hashLock;
        address payable sender;
        address payable receiver;
        string outputNetwork;
        string outputAddress;
    }

    event Withdraw(
        bytes32 indexed id,
        bytes32 secret,
        bytes32 hashLock,
        address indexed sender,
        address indexed receiver
    );

    event Refund(
        bytes32 indexed id,
        bytes32 hashLock,
        address indexed sender,
        address indexed receiver
    );

    event NewContract(
        uint256 inputAmount,
        uint256 outputAmount,
        uint256 expiration,
        bytes32 indexed id,
        bytes32 hashLock,
        address indexed sender,
        address indexed receiver,
        string outputNetwork,
        string outputAddress
    );

    function newContract(
        uint256 outputAmount,
        uint256 expiration,
        bytes32 hashLock,
        address payable receiver,
        string calldata outputNetwork,
        string calldata outputAddress
    ) external payable {
        address payable sender = msg.sender;
        uint256 inputAmount = msg.value;
        
        require(expiration > block.timestamp, 'INVALID_TIME');
        require(inputAmount > 0, 'INVALID_AMOUNT');
        bytes32 id = sha256(
            abi.encodePacked(sender, receiver, inputAmount, hashLock, expiration)
        );

        require(contracts[id].status == INVALID, "SWAP_EXISTS");

        contracts[id] = LockContract(
            inputAmount,
            outputAmount,
            expiration,
            ACTIVE,
            hashLock,
            sender,
            receiver,
            outputNetwork,
            outputAddress
        );

        emit NewContract(
            inputAmount,
            outputAmount,
            expiration,
            id,
            hashLock,
            sender,
            receiver,
            outputNetwork,
            outputAddress
        );
    }

    function withdraw(bytes32 id, bytes32 secret) external {
        LockContract storage c = contracts[id];
        require(c.status == ACTIVE, "SWAP_NOT_ACTIVE");
        require(c.expiration > block.timestamp, "INVALID_TIME");
        require(c.hashLock == sha256(abi.encodePacked(secret)),"INVALID_SECRET");
        c.status = WITHDRAWN;
        c.receiver.transfer(c.inputAmount);
        emit Withdraw(id, secret, c.hashLock, c.sender, c.receiver);
    }

    function refund(bytes32 id) external {
        LockContract storage c = contracts[id];
        require(c.status == ACTIVE, "SWAP_NOT_ACTIVE");
        require(c.expiration <= block.timestamp, "INVALID_TIME");
        c.status = REFUNDED;
        c.sender.transfer(c.inputAmount);
        emit Refund(id, c.hashLock, c.sender, c.receiver);
    }

    function getStatus(bytes32[] memory ids) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](ids.length);

        for (uint256 index = 0; index < ids.length; index++) {
            result[index] = getSingleStatus(ids[index]);
        }

        return result;
    }

    function getSingleStatus(bytes32 id) public view returns (uint256 result) {
        LockContract memory tempContract = contracts[id];
        if (
            tempContract.status == ACTIVE &&
            tempContract.expiration < block.timestamp
        ) {
            result = EXPIRED;
        } else {
            result = tempContract.status;
        }
    }
}
```
Contract sẽ gồm 3 hàm chính đó là **newContract**, **withdraw**, **refund** và ngoài ra còn 2 hàm check status của Lock
- newContract : đây là hàm để tạo 1 Lock gồm các tham số cần thiết . sau khi tạo xong sẽ tạo ra một emit NewContract public lên mạng 
- withdraw : đây là hàm để cho ng nhận điền id của Lock và secret vào . Đầu tiên sẽ check thời gian xem đã hết hạn chưa, sau đó sử dụng hàm sha256 hash rồi so sánh vs hashlock nếu đúng thì giao dịch sẽ thực hiện và sau đó sẽ public private key thông qua emit
- refund : hàm này chỉ chạy khi đã quá thời gian mà khi khởi tạo Lock vs mục đích cho người tạo rút lại tiền

Contract sẽ gồm 5 trạng thái 
- INVALID : đây là trạng thái mà contracts[id] đã tồn tại . vì id được lấy là hash của  *sender, receiver, inputAmount, hashLock, expiration* nên vẫn có thể sẽ trùng . Và nếu trùng thì sẽ ko tạo đc Lock
- ACTIVE : đây là trạng thái mà contracts[id] hợp lệ .
- WITHDRAWN : sau khi người nhận vào rút tiền thì Lock sẽ chuyển qua trạng thái withdrawn
- EXPIRED : đây là trạng thái người nhận không vào rút và đã quá khoảng thời gian qui định (expiration)
- REFUNDED : chỉ khi contract ở trạng thái expired thì người tạo mới có thể vào rút lại khoản tiền của mình và sau khi rút xong thì Lock sẽ về trạng thái refunded

ngoài ra còn 2 hàm để check status cũng như 3 emit để bắt các sự kiện trong contract .Quan trọng nhất là 2 emit đó là NewContract và withdrawn vì newContract sẽ public Id của Lock và withdrawn sẽ public secret của người tạo lên mạng .

# Tổng kết 
Mình chỉ giải thích một cầu từ eth thôi còn phía BTC cũng tương tự như vậy vẫn sẽ cần 3 hàm cơ bản là newContract , withdraw và refund và tuân thủ các quy tắc về time cũng như có các sự kiện public ra mạng khi có người thao tác . Ở bài viết tiếp theo mình sẽ viết về Market maker để khi kết hợp lại thì chúng ta có 1 sàn phi tập trung vs heart là htlc .
![](https://images.viblo.asia/b2bc6b6e-5189-4e07-b77b-71ca35800a9b.png)

# Reference
- https://github.com/jelly-swap/docs