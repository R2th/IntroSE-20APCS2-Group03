NFTs hay tên tiếng Anh là Non-Fungible Tokens có nghĩa là token duy nhất mà không bất kì token nào khác giống như nó.

Về lý thuyết thì NFT có thể được áp dụng để giải quyết một số vấn đề liên quan đến đặc tính “duy nhất” của NFT như:
* Marketplace cho các vật phẩn sưu tầm.
* Định danh trên không gian số.
* Số hóa các tài sản đời thực: bất động sản, bằng cấp.
* Xác định bản quyền cho hình ảnh, video, âm nhạc, tài liệu.

Trong 4 ý trên, cá nhân mình nhận định thì NFT chỉ mới chạm đến bước đầu tiên, đó là marketplace để người dùng đăng bán các hình ảnh, video dưới mục đích sưu tầm.

Trong bài viết này chúng ta sẽ cùng xây dựng một NFT đơn giản với các nội dung sau:

* Lập trình smart contract theo tiêu chuẩn ERC-721.
* Sử dụng IPFS để lưu trữ nội dung.
* Sử dụng Chainlink để sinh số ngẫu nhiên để tạo nội dung duy nhất cho mỗi token.

## ERC-721:
Về mặt lập trình thì NFT là token theo tiêu chuẩn ERC-721. Trong bài viết này, chúng ta sẽ sử dụng thư viện `@openzeppelin/contracts` để tạo token theo tiêu chuẩn này.

Mã nguồn tại: https://github.com/gitvani/nft-chainlink-ipfs.

Tạo smart contract AdvancedCollection.sol có nội dung như sau:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
 
contract AdvancedCollection is ERC721, VRFConsumerBase {
 
  uint public counter;
 
  bytes32 public keyHash;
  address public linkToken;
  address  public vrfCoordinator;
  uint public fee;
   
  mapping(bytes32 => address) public requestIdToSender;
  mapping(bytes32 => string) public requestIdToTokenURI;
  mapping(bytes32 => uint) public  requestIdToTokenId;
  mapping(uint => uint) public tokenIdToGene;
 
  event CreatedColection(bytes32 requestId, uint tokenId);
 
/*
* Rinkeby: <https://docs.chain.link/docs/vrf-contracts/#rinkeby>
* _vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
* _linkToken: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
* _keyhash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'
* Fee: 0.1 LINK
* LINK token faucet: <https://rinkeby.chain.link/>
*/
  constructor(address _vrfCoordinator, address _linkToken, bytes32 _keyhash) public
    VRFConsumerBase(_vrfCoordinator, _linkToken)
    ERC721("Yugioh Trading Card Game" , "Yugioh")
  {
    vrfCoordinator = _vrfCoordinator;
    linkToken = _linkToken;
    keyHash = _keyhash;
    fee = 0.1 * 10 ** 18;
  }
 
  function create(string memory tokenURI) public {
    bytes32 requestId = requestRandomness(keyHash, fee);
    requestIdToSender[requestId] = msg.sender;
    requestIdToTokenURI[requestId] = tokenURI;
  }
 
  function fulfillRandomness(bytes32 requestId, uint randomness) internal override {
    address owner = requestIdToSender[requestId];
    string memory tokenURI = requestIdToTokenURI[requestId];
    uint newItemId = counter;
    _safeMint(owner, newItemId);
    _setTokenURI(newItemId, tokenURI);
    requestIdToTokenId[requestId] = newItemId;
    tokenIdToGene[newItemId] = randomness;
    counter = counter + 1;
    emit CreatedColection(requestId, newItemId);
  } 
}
 
```
Cách deploy smart contract trên trên testnet bạn có thể xem lại các bài viết trước ở cùng series này tại [đây](https://notcuder.com/series-ethereum-danh-cho-lap-trinh-vien-trien-khai-ung-dung-len-mang-luoi-cua-ethereum/).

Trong smart contract trên, chúng ta đang khai báo sử dụng solidity phiên bản ^0.6.6 nên do đó, chúng ta cần cài đặt phiên bản `@openzeppelin/contracts@3.4.0`:
```
npm install --save @openzeppelin/contracts@3.4.0
```
Trong smart contract trên, để sinh số ngẫu nhiên, chúng ta sử dụng Chainlink.

## Chainlink:
Thông thường NFT sẽ dùng cơ chế sinh số ngẫu nhiên để tạo ra một số đại diện cho NFT đó, đặc biệt là các NFT về game sưu tầm. Giả sử NFT đại diện cho mỗi nhân vật và mỗi nhân vật sẽ có 1 con số 10 chữ số được sinh ngẫu nhiên. Khi đó, 2 số đầu quy định màu da, 2 số tiếp theo quy định màu mắt, 2 số tiếp theo quy định kiểu tóc,…

Có nhiều cách để sinh số ngẫu nhiên, trong đó cách an toàn tính đến thời điểm hiện là sử dụng Oracle của Chainlink, chúng ta cần làm các bước sau:

Bước 1:

Cài đặt thư viện smart contract được Chainlink xây dựng sẵn:
```
npm install --save @chainlink/contracts
```
Bước 2:

Kế thừa VRFConsumerBase, khởi tạo LINK token và chỉ định keyhash, mức phí mà Chainlink đã cung cấp. Giả sử mình muốn để deploy trên testnet là Rinkeby thì thông tin nằm ở đây: https://docs.chain.link/docs/vrf-contracts/#rinkeby
```
constructor(address _vrfCoordinator, address _linkToken, bytes32 _keyhash) public
    VRFConsumerBase(_vrfCoordinator, _linkToken)
    ERC721("Yugioh Trading Card Game" , "Yugioh")
  {
    vrfCoordinator = _vrfCoordinator;
    linkToken = _linkToken;
    keyHash = _keyhash;
    fee = 0.1 * 10 ** 18;
  }
 ```
Tiếp theo, bạn cần có LINK token trong smart contract của mình. Bạn có thể request LINK token từ faucet: https://rinkeby.chain.link Bạn có thể nhập vào address của contract đã deploy hoặc address của ví cá nhân. Tuy nhiên, nếu bạn dùng ví cá nhân thì bạn cần làm thêm bước transfer LINK token qua smart contract đã deploy bởi smart contract của bạn cần LINK token để tạo request sinh số ngẫu nhiên từ Chainlink blockchain.

Bước 3:

Để yêu cầu sinh số ngẫu nhiên từ Chainlink blockchain, ta dùng hàm sau:
```
bytes32 requestId = requestRandomness(keyHash, fee);
```
Ngoài ra, trong smart contract bắt buộc phải có hàm fulfillRandomness để nhận dữ liệu trả về từ Chainlink:
```
function fulfillRandomness(bytes32 requestId, uint randomness) internal override {}
```
## IPFS:
Một trong những vấn đề trong việc tạo ERC-721 token đến từ việc lưu trữ nội dung mà nó đại diện. Các NFT marketplace hiện tại thông thường sẽ lưu trữ một hình ảnh hay video mà token này đại diện. Vậy hình ảnh và video này được lưu trữ ở đâu? Liệu có được lưu trữ trên blockchain?

Blockchain không được thiếu kế để lưu trữ các dữ liệu kích thước lớn. Vào năm 2017, Jamila Omar của tổ chức Interplanetary Database đã ước tính chi phí lưu trữ 1GB dữ liệu trên Ethereum sẽ tiêu tốn hơn 4 triệu USD. Chi phí để lưu trữ dữ liệu trên Ethereum xấp xỉ 17.500 ETH/GB, khoảng 4,672,500 USD tính theo giá hiện nay.

Vậy đâu là sự lựa chọn thay thế cho việc lưu trữ dữ liệu như trên? Các dịch vụ lưu trữ đám mây tập trung như Amazon’s S3, Google Cloud Storage, Dropbox,… Tuy nhiên, để giữ vững tình thần decentralized của blockchain thì chúng ta có thể dùng IPFS (Interplanetary File System).

Để upload file lên IPFS, chúng ta có thể sử dụng phần mềm IPFS Desktop có thể tải về tại: https://github.com/ipfs/ipfs-desktop.
Ví dụ màn hình upload files của IPFS Desktop:

![image.png ](https://images.viblo.asia/59021769-c9f8-4c02-ba26-6323cb4dac2f.png)

Sau khi upload, bạn sẽ có được share link giống thế này: `https://ipfs.io/ipfs/QmP2sFmGJbw1yqK1HbJcDw1LhsUUm2wcXaSVYqZ6QgT7tq`

Sau khi đã có URI từ IPFS, bạn có thể sử dụng URI này cho tham số tokenURI trong hàm create của smart contract phía trên:
```
 function create(string memory tokenURI) public { }
 ```
## Kiểm tra thành quả:
Sử dụng các hàm như totalSupply, tokenIdToGene, tokenURI để kiểm tra thành quả.



-----
Nguồn:
https://notcuder.com/lap-trinh-smart-contract-de-tao-nft-ket-hop-voi-chainklink-va-ipfs/