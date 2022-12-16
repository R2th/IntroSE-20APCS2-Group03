## 1. Yêu cầu bài toán
- Smart contract kêu gọi vốn từ cộng đồng
- Admin có thể mở / đóng việc kêu gọi vốn
- Nhận vốn thông qua ETH với điều kiện min $10 và max $200 cho mỗi địa chỉ ví khi contract gọi vốn đang mở
- Tặng 1 NFT ngẫu nhiên cho 3 địa chỉ ví đầu tiên đầu tư  trên $100
- Dừng nhận vốn nếu nhận được số tiền tương đương $50.000
- Admin có thể rút vốn từ smart contract

## 2. Trước khi giải quyết bài toán
Tưởng tượng bạn cần gọi vốn từ cộng đồng cho một dự án game NFT mà team của bạn đang phát triển và bạn đã quyết định kêu gọi vốn thông qua smart contract của mạng Ethereum. Các NFT là những vật phẩm trong game và bạn muốn giveaway dành cho những người nhanh chân nhất.

Nếu bạn đang cần 1 smart contract tương tự như vậy thì bài này dành cho bạn.

## 3. Bắt đầu code
Tạm gọi tên dự án là Project X. Như vậy ta sẽ tạo 1 contract ProjectXFunding. Ở bài này chúng ta sẽ sử dụng Openzeppelin để hỗ trợ một số phần code có sẵn, ở yêu cầu đề bài ta thấy có đề cập đến Admin có thể làm gì đó ~~ và  NFT như vậy  contract ProjectXFunding sẽ kế thừa 2 contracts ERC721 và Ownable. Code ban đầu của dự án sẽ trông như sau:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/access/Ownable.sol";

contract ProjectXFunding is ERC721,Ownable {

}
```

### 3.1 Xử lý mint NFT
Dự án có NFT nên chúng ta sẽ tạo 1 constructor cho ERC721,  tạm đặt tên cho Token là "Project X Item" với symbol là "PIX". Chúng ta sẽ sử dụng 1 biến đếm "tokenCounter" làm ID cho từng NFT  và được code như sau: 

```javascript
uint256 public tokenCounter;

constructor() public ERC721("Project X Item", "PXI") {
        tokenCounter = 0;
    }
```

Tiếp theo, chúng ta hãy tạo một hàm cho phép admin  mint NFT tạm gọi là createNewNFT()  truyền vào URI của token và trả về token_id. Đồng thời, chúng ta sẽ tạo 1 biến tokenIds của contract là mảng lưu list token_id của contract để phục vụ cho công việc thao tác với NFT về sau.

```javascript

uint256[] public tokenIds;

function createNewNFT(string memory tokenURI) onlyOwner
        public
        returns (uint256)
    {
        uint256 newTokenId = tokenCounter;
        _safeMint(address(this), newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
        tokenIds.push(newTokenId);
        return newTokenId;
    }
```

Như code ở phần trên, ta thấy  hàm mint NFT được viết ` _safeMint(address(this), newTokenId);`  và `address(this)` chính là địa chỉ của contract của chúng ta. Nghĩa là cứ mỗi lần mint NFT mới thì chủ nhân của NFT chính là contract của chúng ta. Các NFT default sẽ chỉ có thể chuyển cho các địa chỉ ví thay vì địa chỉ contract nên nếu để contract là owner của NFT ta cần overide lại hàm onERC721Received() đến từ  IERC721Receiver như sau :

```javascript
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }
```

Như vậy chúng ta đã có thể tự tạo các NFTs cho contract để phục vụ cho việc thường NFT cho những địa chỉ ví nhanh nhất ở phần sau. 

NFT đã minted ae có thể xem ở trên OpenSea bằng đường dẫn format như sau:
https://testnets.opensea.io/assets/{địa chỉ smart contract}/{token_id}

Như vậy hãy bắt tay vào xử lý phần gọi vốn.

### 3.2 Xử lý đóng/mở gọi vốn
Theo yêu cầu từ đề bài của phần gọi vốn ta sẽ thiết kế giải pháp như sau:

- Admin có thể mở / đóng việc kêu gọi vốn
 => Tạo 1 biến STATE  thể hiện contract đang  đóng / mở
 => Tạo 2 hàm đóng/ mở contract mà chỉ admin có quyền gọi
 => Thêm state = close vào trong constructor

```javascript
enum CONTRACT_STATE {OPEN, CLOSED} CONTRACT_STATE public contractState;

function openFunding() public onlyOwner {
        require (contractState == CONTRACT_STATE.CLOSED, "CANNOT OPEN FUNDING!");
        contractState = CONTRACT_STATE.OPEN;
    }

    function closeFunding() public onlyOwner {
        require (contractState == CONTRACT_STATE.OPEN, "CANNOT CLOSE FUNDING!");
        contractState = CONTRACT_STATE.CLOSED;
    }
```

Thêm state = close vào trong constructor thì ae thêm vào giúp mình nhé.

### 3.3 Xử lý gọi vốn 
Chúng ta xử lý lần lượt các yêu cầu đề bài như sau:

**Đề bài:** - Nhận vốn thông qua ETH với điều kiện min $10 và max $200 cho mỗi địa chỉ ví khi contract gọi vốn đang mở

**Giải pháp:**  => Tạo 1 số các function convert ETH sang dollar -> giải pháp chainlink AggregatorV3Interface
Do đề bài yêu cầu các điều kiện được thực hiện thông qua dollar nhưng chúng ta lại chỉ cho phép nhận ETH nên chúng ta sẽ cần giải pháp convert số lượng ETH user gửi vào qua dollar để so sánh các điều kiện. 

Như 1 giải pháp thông dụng, chúng ta sẽ sử dụng công cụ AggregatorV3Interface mạnh mẽ đến từ Chainlink. Chúng ta sẽ cần làm các công việc sau:
1. import AggregatorV3Interface
```javascript
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
```

2. Tạo hàm lấy giá ETH/USD  ( địa chỉ ví AggregatorV3Interface ở trong code mình lấy ở network Rinkeby nhé. Ae cần network khác có thể lấy tại đây nhé:
https://docs.chain.link/docs/ethereum-addresses/

```javascript
    function getETHPrice() public view returns (uint256) {
        //ETH/USD 8 decimals
        AggregatorV3Interface price = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (,int256 lastestPrice,,,) = price.latestRoundData();

        //Convert to 18 decimals
        return uint256(lastestPrice*10000000000);
    }
```

3. Tạo hàm convert số lượng ETH => USD
```javascript
    function getExchangeRate(uint256 eth)  public view returns (uint256) {
        uint256 ethPrice = getETHPrice();
        uint256 usd = eth * ethPrice/ 1000000000000000000;

        return usd;
    }
```


**Đề bài:**- Tặng 1 NFT ngẫu nhiên cho 3 địa chỉ ví đầu tiên đầu tư  trên $100

**Giải pháp:**=> Tạo hàm xử lý ngẫu nhiên, hàm check trùng địa chỉ ví
1. Tạo hàm xử lý ngẫu nhiên 
Như chúng ta đã define arrays chứa list token_id. Vậy chúng ta sẽ tạo ra 1 số ngẫu nhiên và chia lấy phần dư cho tổng số NFT đang có để lấy ra index của NFT ngẫu nhiên ở trong mảng.
```javascript
    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))); 
    }

    function getRandomNFTIndex() private view returns (uint256) {
        return getRandomNumber() % tokenIds.length;
    }
```
Có thể ae đọc đến đây sẽ nói hàm getRandomNumber() mình đã viết không thực sự random khi mình chỉ đang hash lại block.difficulty ( có thể bị tampered bởi thợ đào) và block.timestamp ( có thể đoán trước được ) nhưng ở đây mình coi những NFTs ở đây có giá trị tương tự nhau nên mình chấp nhận độ khó của hàm random chỉ cần như vậy vì nó ảnh hưởng không lớn đến contract của mình . Bạn nào làm những ứng dụng khác nghiêm túc hơn có thể dùng chainlink VRF nhé ^^

2. Hàm check trùng địa chỉ ví
Mình sẽ tạo 1 arrays chứa list địa chỉ ví đã nhận NFT và loop qua để check địa chỉ ví tương ứng đã được nhận NFT chưa như sau:
```javascript
address[] public nftWonInvestors;

function checkUniqueNFTWinner (address _address) private view returns (bool) {
        for (uint i = 0; i < nftWonInvestors.length; i++) {
            if (_address == nftWonInvestors[i]) {
                return false;
            }
        }
        return true;
    }
```

**Đề bài:**- Smart contract kêu gọi vốn từ cộng đồng

**Giải pháp:**- Dừng nhận vốn nếu nhận được số tiền tương đương $50.000
=> Tạo 1 function public payable cho phép gọi vốn từ tât cả mọi người và nhận max $50.000

Cuối cùng của phần kêu gọi vốn, ta sẽ tạo 1 hàm fund() kết hợp tất cả các điều kiện gọi vốn của đề bài như sau:
```javascript

    function fund() public payable {
        require (contractState == CONTRACT_STATE.OPEN, "CONTRACT NOT OPEN, NO PERMISSION!");
        require (getExchangeRate(msg.value) >= 10*10**18, "NOT ENOUGH ETH!");
        require (getExchangeRate(addressToMoneyAmount[msg.sender]) <= 200*10**18, "CANNOT FUND THAT MUCH!");
        require (getExchangeRate(addressToMoneyAmount[msg.sender] + msg.value) <= 200*10**18, "TOTAL FUNDING AMOUNT GREATER THAN $200, NO APPROVED!");
        addressToMoneyAmount[msg.sender] += msg.value;
        investors.push(msg.sender);

        if (getExchangeRate(addressToMoneyAmount[msg.sender]) >= 100*10**18 && checkUniqueNFTWinner(msg.sender) && nftWonInvestors.length < 3) {
            nftWonInvestors.push(msg.sender);
            this.safeTransferFrom(address(this), msg.sender, tokenIds[getRandomNFTIndex()]);

        }

        // if received $50.000, close the contract
        if (getExchangeRate(address(this).balance) + getExchangeRate(msg.value) >= 50000*10**18 ) {
            contractState = CONTRACT_STATE.CLOSED;
        }
    }
```

###  3.4 Xử lý rút vốn khỏi contract
Cuộc gọi vốn đã thành công mĩ mãn. Với tư cách là admin của contract chúng ta cần rút vốn ra và biến mất 🤕 bằng hàm withdraw() như sau:
```javascript
    function withdraw() public payable onlyOwner {
        msg.sender.transfer(address(this).balance);

        // for (uint256 index=0; index < investors.length; index++){
        //     address investor = investors[index];
        //     addressToMoneyAmount[investor] = 0;
        // }
        // //funders array will be initialized to 0
        // investors = new address[](0);
    }
```
Như vậy là đã xong. Anh em có thể deploy lên Rinkeby và test thử nhé. Nếu muốn test thử ở các network khác, lưu ý cần thay đổi địa chỉ của AggregatorV3Interface sang mạng tương ứng nhé.
## Kết luận:
Vậy là chúng ta đã giải xong bài toán ở đầu đề. Chúng ta có thể vận hành cuộc gọi vốn theo process như sau:

1. Deploy contract lên mạng lưới
2. Tạo 3 NFTs bằng hàm createNewNFT() truyền vào tokenURI
Anh em có thể lấy tạm 3 tokens dưới này của mình trên ipfs để test nhé:
https://ipfs.io/ipfs/QmUuYd3DRjAxHMkKxrj9kGgSJRpmzRTZp7vVDGkMkRLqfN?filename=chickenattack.json
https://ipfs.io/ipfs/QmNs6tps5fVYuRZrQH3bzrJaEjsskbmEbwYbbvM3xh31fY?filename=haothienkhuyen.json
https://ipfs.io/ipfs/QmcHYDVJY8XiGSoWEquxVyGDMbY6miy2ZrDBSHa5o1zEPM?filename=tungson.json

3. Mở contract gọi vốn bằng hàm openFunding()
4. Rút vốn bằng hàm withdraw() và phát triển dự án.

Tất cả source code anh em có thể lấy ở đây:

```javascript
// SPDX-License-Identifier: MIT
// Create NFT OK
// Set State of Funding Contract OK
// Receiving Fund with minimum $10 maxximum $200, First 3 investors who invested more than $100, give a random NFT OK
// Claim Fund OK

pragma solidity 0.6.6;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract ProjectXFunding is ERC721,Ownable {
    using SafeMathChainlink for uint256;

    enum CONTRACT_STATE {OPEN, CLOSED} CONTRACT_STATE public contractState;
    uint256 public tokenCounter;
    mapping(address => uint256) public addressToMoneyAmount;
    address[] public investors;
    address[] public nftWonInvestors;
    uint256[] public tokenIds;

    constructor() public ERC721("Project X Item", "PXI") {
        tokenCounter = 0;
        contractState = CONTRACT_STATE.CLOSED;
    }

    function createNewNFT(string memory tokenURI) onlyOwner
        public
        returns (uint256)
    {
        uint256 newTokenId = tokenCounter;
        _safeMint(address(this), newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
        tokenIds.push(newTokenId);
        return newTokenId;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))); 
    }

    function getRandomNFTIndex() private view returns (uint256) {
        return getRandomNumber() % tokenIds.length;
    }

    function openFunding() public onlyOwner {
        require (contractState == CONTRACT_STATE.CLOSED, "CANNOT OPEN FUNDING!");
        contractState = CONTRACT_STATE.OPEN;
    }

    function closeFunding() public onlyOwner {
        require (contractState == CONTRACT_STATE.OPEN, "CANNOT CLOSE FUNDING!");
        contractState = CONTRACT_STATE.CLOSED;
    }

    function fund() public payable {
        require (contractState == CONTRACT_STATE.OPEN, "CONTRACT NOT OPEN, NO PERMISSION!");
        require (getExchangeRate(msg.value) >= 10*10**18, "NOT ENOUGH ETH!");
        require (getExchangeRate(addressToMoneyAmount[msg.sender]) <= 200*10**18, "CANNOT FUND THAT MUCH!");
        require (getExchangeRate(addressToMoneyAmount[msg.sender] + msg.value) <= 200*10**18, "TOTAL FUNDING AMOUNT GREATER THAN $200, NO APPROVED!");
        addressToMoneyAmount[msg.sender] += msg.value;
        investors.push(msg.sender);

        if (getExchangeRate(addressToMoneyAmount[msg.sender]) >= 100*10**18 && checkUniqueNFTWinner(msg.sender) && nftWonInvestors.length < 3) {
            nftWonInvestors.push(msg.sender);
            this.safeTransferFrom(address(this), msg.sender, tokenIds[getRandomNFTIndex()]);

        }

        // if received $50.000, close the contract
        if (getExchangeRate(address(this).balance) + getExchangeRate(msg.value) >= 50000*10**18 ) {
            contractState = CONTRACT_STATE.CLOSED;
        }
    }

    function checkUniqueNFTWinner (address _address) private view returns (bool) {
        for (uint i = 0; i < nftWonInvestors.length; i++) {
            if (_address == nftWonInvestors[i]) {
                return false;
            }
        }
        return true;
    }

    function getExchangeRate(uint256 eth)  public view returns (uint256) {
        uint256 ethPrice = getETHPrice();
        uint256 usd = eth * ethPrice/ 1000000000000000000;

        return usd;
    }

    function getETHPrice() public view returns (uint256) {
        //ETH/USD 8 decimals
        AggregatorV3Interface price = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (,int256 lastestPrice,,,) = price.latestRoundData();

        //Convert to 18 decimals
        return uint256(lastestPrice*10000000000);
    }

    function withdraw() public payable onlyOwner {
        msg.sender.transfer(address(this).balance);

        // for (uint256 index=0; index < investors.length; index++){
        //     address investor = investors[index];
        //     addressToMoneyAmount[investor] = 0;
        // }
        // //funders array will be initialized to 0
        // investors = new address[](0);
    }
}

```

Chúc anh em thành công !