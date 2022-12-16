![](https://images.viblo.asia/720869ff-bc3b-4993-a6e2-5bc0c9c6fb0d.png)
Như chúng ta đã biết việc bảo vệ contract trước các cuộc tấn công không bao giờ là đủ. Vì chỉ một thất bại trong việc phòng thủ thôi cũng dẫn đến thiệt hại lớn về tiền bạc , vì vậy bạn cũng phải điều chỉnh cách bạn viết contract để giảm thiểu rủi ro đó.

Cách tiếp cận của bài viết là chuẩn bị cho việc contract của bạn bị tấn công. Không thể biết trước liệu code của bạn có an toàn hay không. Tuy nhiên, bạn có thể thiết kế các hợp đồng của mình theo cách giảm thiểu thiệt hại một cách tối đa. Phần này mình sẽ trình bày một loạt các kỹ thuật sẽ giúp bạn thực hiện điều đó.

Lưu ý: Luôn có rủi ro khi bạn thêm một thành phần mới vào hệ thống của mình. Một thiết bị không an toàn được thiết kế xấu có thể trở thành một lỗ hổng . Hãy suy nghĩ kỹ về từng kỹ thuật bạn sử dụng trong các hợp đồng của mình và xem xét cẩn thận cách chúng phối hợp với nhau để tạo ra một hệ thống mạnh mẽ.
## Nâng cấp các Contract bị hỏng
Code sẽ cần phải được thay đổi nếu phát hiện bug hoặc nếu cần cải thiện. Thật chẳng tốt chút nào khi phát hiện ra một bug, nhưng lại không có cách nào để đối phó với nó.

Thiết kế một hệ thống có khả năng nâng cấp hiệu quả cho các Smart contract là một lĩnh vực nghiên cứu thú vị nhưng chúng ta không thể đề cập hết tất cả trong bài viết này. Tuy nhiên, có hai cách tiếp cận cơ bản được sử dụng phổ biến nhất. Cách đầu tiên là phải có một hợp đồng đăng ký giữ địa chỉ của phiên bản mới nhất của hợp đồng. Một cách tiếp cận khác với hợp đồng là có một hợp đồng chuyển tiếp các hàm gọi và dữ liệu lên phiên bản mới nhất của hợp đồng. 

Dù là kỹ thuật nào, điều quan trọng là phải module hóa và phân chia tốt giữa các thành phần, để thay đổi code không làm  phá vỡ cách chức năng, dữ liệu hoặc yêu cầu chi phí lớn để chuyển. Đặc biệt, điều này thường có lợi khi tách các logic phức tạp khỏi bộ lưu trữ dữ liệu , để bạn không phải tạo lại tất cả dữ liệu cũng như thay đổi các chức năng.

Điều quan trọng là có một cách an toàn để các bên quyết định nâng cấp code. Tùy thuộc vào hợp đồng của bạn, các thay đổi code có thể cần được chấp thuận bởi một bên đáng tin cậy, một nhóm thành viên hoặc cần sự bỏ phiếu của toàn bộ các bên liên quan. Quá trình này có thể mất nhiều thời gian, bạn sẽ muốn xem xét liệu có cách nào khác để phản ứng nhanh hơn trong trường hợp bị tấn công, chẳng hạn như dừng khẩn cấp.

**Ví dụ 1: Sử dụng hợp đồng đăng ký để lưu trữ phiên bản mới nhất của hợp đồng**

Trong ví dụ này, các hàm gọi không được chuyển tiếp, vì vậy người dùng nên fetch lại địa chỉ hiện tại mỗi lần trước khi tương tác với nó.
```javascript
contract SomeRegister {
    address backendContract;
    address[] previousBackends;
    address owner;

    function SomeRegister() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner)
        _;
    }

    function changeBackend(address newBackend) public
    onlyOwner()
    returns (bool)
    {
        if(newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = newBackend;
            return true;
        }

        return false;
    }
}
```

Có hai nhược điểm chính của phương pháp này:
1. Người dùng phải luôn luôn tìm địa chỉ hiện tại và bất kỳ ai không thực hiện được việc cập nhật thì rủi ro sẽ đến khi sử dụng phiên bản cũ của hợp đồng
2. Bạn sẽ cần suy nghĩ cẩn thận về cách xử lý dữ liệu hợp đồng khi bạn thay thế hợp đồng

**Ví dụ 2: Sử dụng DELEGATECALL để chuyển tiếp dữ liệu và call funcion**

```javascript
contract Relay {
    address public currentVersion;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function Relay(address initAddr) {
        currentVersion = initAddr;
        owner = msg.sender; // this owner may be another contract with multisig, not a single contract owner
    }

    function changeContract(address newVersion) public
    onlyOwner()
    {
        currentVersion = newVersion;
    }

    function() {
        require(currentVersion.delegatecall(msg.data));
    }
}
```

Cách tiếp cận này tránh được các vấn đề trước đó nhưng có vấn đề của riêng nó. Bạn phải cực kỳ cẩn thận với cách bạn lưu trữ dữ liệu trong hợp đồng này. Nếu hợp đồng mới của bạn có bố cục lưu trữ khác với hợp đồng đầu tiên, dữ liệu của bạn có thể bị hỏng. Ngoài ra, mẫu kiến trúc đơn giản này của không thể trả về giá trị từ các hàm, chỉ chuyển tiếp chúng vì thế làm hạn chế khả năng ứng dụng của nó. (Việc triển khai phức tạp hơn cố gắng giải quyết vấn đề này bằng in-line assembly code và đăng ký kích thước trả về.)

Bất kể cách tiếp cận của bạn là gì, điều quan trọng là phải có một số cách để nâng cấp contract của bạn, hoặc chúng sẽ trở nên không sử dụng được khi phát hiện ra các lỗi không thể tránh khỏi trong đó.

## Phương pháp ngắt mạch
Bộ ngắt mạch sẽ dừng thực thi khi có gặp một số điều kiện nhất định và nó sẽ hữu ích khi xảy ra lỗi bất ngờ . Ví dụ: hầu hết các hành động có thể bị dừng khẩn cấp trong trường hợp phát hiện ra lỗi và hành động duy nhất có thể hoạt động đc là rút tiền về. Bạn có thể cung cấp cho các bên đáng tin cậy khả năng kích hoạt bộ ngắt mạch này hoặc người nào khác có các quy tắc lập trình mà sẽ tự động kích hoạt bộ ngắt nhất định khi đáp ứng một số điều kiện nhất định.

**Ví dụ :**
```javascript
bool private stopped = false;
address private owner;

modifier isAdmin() {
    require(msg.sender == owner);
    _;
}

function toggleContractActive() isAdmin public {
    // Bạn có thể thêm modifier nhằm hạn chế việc dừng hợp đồng chỉ dựa trên một quyết định của một người, chẳng hạn như thêm phiếu bầu của người dùng
    stopped = !stopped;
}

modifier stopInEmergency { if (!stopped) _; } // dừng lại nếu gặp trường hợp khẩn cấp
modifier onlyInEmergency { if (stopped) _; } // chỉ thực hiện trong trường hợp khẩn cấp

function deposit() stopInEmergency public {
    // some code
}

function withdraw() onlyInEmergency public {
    // some code
}
```

## Delay contract actions
Một ý tưởng về việc giảm tốc độ các hoạt động của contract để nếu xảy ra lỗi còn có thời gian để recover.
Dưới đây là một cách viết hàm Withdrawal  
**Ví dụ :**
```javascript
struct RequestedWithdrawal {
    uint amount;
    uint time;
}

mapping (address => uint) private balances;
mapping (address => RequestedWithdrawal) private requestedWithdrawals;
uint constant withdrawalWaitPeriod = 28 days; // 4 weeks

function requestWithdrawal() public {
    if (balances[msg.sender] > 0) {
        uint amountToWithdraw = balances[msg.sender];
        balances[msg.sender] = 0; // for simplicity, we withdraw everything;
        // presumably, the deposit function prevents new deposits when withdrawals are in progress

        requestedWithdrawals[msg.sender] = RequestedWithdrawal({
            amount: amountToWithdraw,
            time: now
        });
    }
}

function withdraw() public {
    if(requestedWithdrawals[msg.sender].amount > 0 && now > requestedWithdrawals[msg.sender].time + withdrawalWaitPeriod) {
        uint amountToWithdraw = requestedWithdrawals[msg.sender].amount;
        requestedWithdrawals[msg.sender].amount = 0;

        require(msg.sender.send(amountToWithdraw));
    }
}
```
Hà nội ko vội được đâu ví dụ này cho thấy rằng để rút tiền bạn cần đợi 4 tuần . Đầu tiên để rút tiền bạn phải chạy hàm **RequestedWithdrawal** , hàm sẽ lưu số dư của bạn vào 1 struct và bắt đầu đếm thời gian đến khi qua 28 ngày bạn mới có thể rút được tiền khi gọi hàm **withdraw** để rút được tiền

## Giới hạn tỉ lệ

Tỷ lệ giới hạn hoặc yêu cầu phê duyệt cho những thay đổi đáng kể. Ví dụ: người gửi tiền chỉ có thể được phép rút một số tiền nhất định hoặc theo tỷ lệ phần trăm nhất định của tổng số tiền gửi trong một khoảng thời gian nhất định (ví dụ: tối đa 100 ether trong 1 ngày) - nếu tiếp tục rút tiền trong khoảng thời gian sau đó có thể sẽ thất bại hoặc yêu cầu một số phê duyệt đặc biệt .

## Contract Rollout

Contract nên có thời gian thử nghiệm kĩ càng và kéo dài trước khi public
Tối thiểu bạn nên đảm bảo:
* Có một bộ test vs 100% test coverage (hoặc gần gần 100%)
* Deploy trên testnet của riêng bạn
* Deploy lên các public testnet với các bài test lớn và bug bounties
* Test toàn diện , cho phép nhiều người tương tác với contract vs số lượng lớn
* Triển khai trên mainnet ở phiên bản beta, với các giới hạn nhất định như lượng tiền ,...

Trong quá trình thử nghiệm, sau một khoảng thời gian nhất định bạn có thể tự động cho dừng mọi hoạt động của contract. Ví dụ: hợp đồng alpha có thể hoạt động trong vài tuần và sau đó tự động tắt tất cả các hành động, ngoại trừ việc cho rút tiền lần cuối.
```javascript
modifier isActive() {
    require(block.number <= SOME_BLOCK_NUMBER);
    _;
}

function deposit() public isActive {
    // some code
}

function withdraw() public {
    // some code
}
```

Ngoài ra trong giai đoạn đầu, bạn có thể hạn chế lượng Ether cho bất kỳ người dùng nào (hoặc cho toàn bộ) -> giảm rủi ro.

## Bug Bounty Programs
Một số mẹo để chạy các chương trình Bug Bounty:
* Quyết định tiền thưởng loại nào sẽ được phân phối  (BTC và / hoặc ETH)
* Quyết định tổng ngân sách ước tính cho phần thưởng tiền thưởng
* Từ ngân sách, xác định ba tầng phần thưởng:
    * Phần thưởng nhỏ nhất bạn sẵn sàng đưa ra
    * Phần thưởng cao nhất thường được trao
    * Một phạm vi bổ sung sẽ được trao trong trường hợp lỗ hổng rất nghiêm trọng
* Xác định ai là người quyết định mức độ nghiêm trọng của lỗi (3 có thể là con số lý tưởng ,điển hình)
* Nhà phát triển chính nên là một trong số đó
* Khi nhận được báo cáo lỗi, nhà phát triển chính, với lời khuyên từ các nhà thẩm định, nên đánh giá mức độ nghiêm trọng của lỗi
* Nếu có 1 bug đc report nhà phát triển nên viết một test case chứa lỗi này sau đó xác nhận lỗi
* Nhà phát triển nên thực hiện sửa lỗi ,thông báo khi sửa xong và viết các test bổ sung nếu cần thiết
* Thông báo cho người tham gia  trong suốt quá trình, và sau đó cố gắng tránh sự chậm trễ trong việc gửi cho họ phần thưởng của họ
Để biết ví dụ về ba cấp độ phần thưởng, hãy xem [Chương trình Bounty của Ethereum](https://bounty.ethereum.org/):
> Giá trị của phần thưởng được chi trả sẽ khác nhau tùy thuộc vào mức độ ảnh hưởng. Phần thưởng cho các lỗi nhỏ 'vô hại' bắt đầu từ 0,05 BTC. Các lỗi lớn, ví dụ dẫn đến các vấn đề đồng thuận, sẽ được thưởng tới 5 BTC. Phần thưởng cao hơn nhiều có thể (tối đa 25 BTC) trong trường hợp lỗ hổng rất nghiêm trọng.

Tài liệu tham khảo : https://consensys.github.io/smart-contract-best-practices/software_engineering/#upgrading-broken-contracts