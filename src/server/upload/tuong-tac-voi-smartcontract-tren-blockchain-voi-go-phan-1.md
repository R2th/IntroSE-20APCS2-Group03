Xin chào mọi người, trong bài viết này tôi sẽ giới thiệu cách đọc dữ liệu của SmartContract sử dụng Golang.
Thông thường khi nhắc đến công nghệ blockchain mọi người thường chỉ hiểu đó là dùng để chuyển tiền từ người này sàng người khác mà không thông qua bên thứ ba, nhưng đó không phải là tất cả. Với SmartContract ta có thể làm nhiều hơn thế nữa, không chỉ là việc chuyển tiền mã hóa mà ta còn có thể thiết lập ra các luật lệ, chuyển đổi các dạng tài sản khác...
# SmartContract là gì?
Smart Contract (Hợp Đồng Thông Minh) là một thuật ngữ mô tả một bộ giao thức đặc biệt có khả năng tự động thực hiện các điều khoản, các thoả thuận giữa các bên trong hợp đồng (ở trường hợp này là các hệ thống máy tính) nhờ sự hỗ trợ của công nghệ Blockchain. Toàn bộ hoạt động của Smart Contract được thực hiện một cách tự động và không có sự can thiệp từ bên ngoài, hay thông qua một bên thứ ba trung gian. Những giao dịch được thực hiện bằng các hợp đồng thông minh rất minh bạch, có thể dễ dàng truy xuất được và không thể bị can thiệp hoặc đảo chiều. Các điều khoản trong Smart Contract tương đương với một hợp đồng có pháp lý và được ghi lại dưới ngôn ngữ của lập trình.
![](https://images.viblo.asia/6ef67ea1-a212-44d4-a9e2-0499d8ceab6e.jpg)
Điểm nổi bật nhất của Smart Contract là cho phép hai bên tham gia thực hiện hợp đồng một cách chính xác, an toàn và nhanh chóng; mà không cần các bên biết nhau từ trước, cũng không cần phải gặp trực tiếp để có thể làm việc với nhau, hay một bên trung gian thứ ba mà chỉ cần có kết nối Internet. Khái niệm về Smart Contract được biết đến lần đầu tiên năm bởi Nick Szabo vào 1993.
# Setup SmartContract
Trong bài viết này tôi sẽ tạo một smartcontract đơn giản tên là Anime. Tôi sẽ miêu tả đại khái mục đích của nó như sau: Khi người dùng đăng ký một tài khoản họ sẽ phải bỏ ra một loại tài sản nào đó(USD, VNĐ, BTC, ETH,..) để đổi lấy `Treasures` và người dùng có thể kiểm tra số treasures mình đang có mua thêm treasures và gửi treasures cho người khác.
```
//path: contract/Anime.sol
pragma solidity ^0.4.19;

/**
 * The Anime contract does this and that...
 */
contract Anime {
    address public owner;
    mapping (address => uint) public treasures;
  
    function Anime () {
        owner = msg.sender;
        // otakuToken = 1000000;
        treasures[owner] = 100;
    }

    function register(address user, uint amount) public {
        if (msg.sender != user) return;
        treasures[user] = amount;
    }
    

    function getTreasure(address _a) public constant returns(uint) {
        if (treasures[_a] != 0)
          return treasures[_a];
        return 0;
    }

    function addTreasure(address _a ,uint amount) public {
        if (msg.sender != owner) return;
        if (amount > 10)
          treasures[_a] += amount;
        else
          return;
    }

    function sendTreasure(address receiver, uint amount) public {
        if (msg.sender != owner) return;
        if (amount < 0) return;
        if (treasures[receiver] != 0) return;
        treasures[receiver] += amount;
        treasures[owner] -= amount;
    }
}
```
SmartConstrain sẽ gồm những thành phần sau: 
* Biến toàn cục truesures là một map address -> amount(lương trusures hiện tại của mỗi address đó).

* function khởi tạo của contract `Anime()`: Nó sẽ khởi tạo người sở hữu hợp đồng, trong trường hợp này là người gửi(msg.sender).

* function khởi tạo cho address mới `register()`: Chúng ta thêm 1 address vào map treasures.

* function lấy dữ liệu `getTreasures()`: Trả về số treasures hiện tại của address.

* function `addTreasures()`: Thêm treasures cho address.

* function `sendTreasures()`: Gửi treasures từ địa chỉ này sang địa chỉ khác.
# Deploy SmartContract
Tiếp theo chúng ta sẽ deploy SmartContract này trên blockchain
Chúng ta sẽ sử dụng 4 thư viện
```
//path: contract/deploy.js
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const ethTx = require('ethereumjs-tx');
```
Đầu tiên, chúng ta sử dụng web3 để tạo kết nối 1 node
```
var web3 = new Web3()
var enpoint = "https://ropsten.infura.io";
web3.setProvider(new web3.providers.HttpProvider(enpoint));
```
Sau đó, nhập tài khoản (trong bài viết này tôi sử dụng keystore) để thanh toán chi phí tạo constract
```
var file = "yourpath/key_store"
var contractPath = "yourpath/Anime.sol"
var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
var accountUnlocked = web3.eth.accounts.decrypt(obj, "123456") 
```
Tiếp theo chúng ta sẽ set một số config: gasPrice, gasLimit và thực hiện transaction.
```
var gasPrice = '20000000000'
var gasPriceHex = web3.utils.toHex(gasPrice);
var gasLimitHex = web3.utils.toHex(1000000);
var pk = Buffer.from(privateKey.slice(2), 'hex')

web3.eth.getTransactionCount(coinbase).then(function(result){
	var nonceHex = web3.utils.toHex(result)
	var data = "0x" + bytecode
	var rawTx = {
		nonce: nonceHex,
		gasPrice: gasPriceHex,
		gasLimit: gasLimitHex,
		data: data,
		from: coinbase
	}

	var txI = new ethTx(rawTx)
	txI.sign(pk)
	var serializedTx = txI.serialize()

	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    console.log('contract creation tx: ' + hash);
	});
})
```
Sau bước này chúng ta sẽ có địa chỉ constract trên màn hình console.

# Tương tác với constract bằng Golang
Cấu trúc của project như sau:
```
* blockchain
  **anime.abi
  ** blockchain.go
  ** signer.go
*cmd
  ** main.go
*contract
  ** Anime.sol
  ** deploy.js
*signer
  ** signer.go
*vendor
  **github
  **golang
  **go.pkg
```
Chúng ta sẽ sử dụng những thư viện của go-ethereum như sau:
```
//path: blockchain/blockchain.go
ether "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	ethereum "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
```
Các bạn có để install bằng cách sử dụng `go get`.

Tiếp theo, tạo một cấu trúc dữ liệu blockchain như sau:
```
type Blockchain struct {
	client    *rpc.Client
	ethclient *ethclient.Client
	signer    Signer
	abi       abi.ABI
	contract  ethereum.Address
}
```
Trong đó, client, ethclient sẽ được sử dụng để thực hiện những query lên phía node blockchain. signer dùng để ký cho các transaction, abi(Application Binary Interface) sẽ được sử dụng để pack và unpack data từ smartcontract, còn contract là địa chỉ con constract mà chúng ta deploy ở trên.
Cuối cùng, chúng ta sẽ lấy dữ liệu từ smartcontract(gọi hàm `getTreasures()` của smartcontract để lấy số treasures của một address
```
func (self *Blockchain) GetTreasure() {
	input, err := self.abi.Pack("getTreasure", self.signer.GetAddress())
	if err != nil {
		log.Println(err)
	}
	value := big.NewInt(0)
	from := self.signer.GetAddress()
	msg := ether.CallMsg{From: from, To: &self.contract, Value: value, Data: input}
	result, err := self.ethclient.CallContract(context.Background(), msg, nil)
	if err != nil {
		log.Println(err)
	}
	// log.Println("treasure: ", string(result))
	log.Println("treasure: ", result)

	var trueResult interface{}
	err = self.abi.Unpack(&trueResult, "getTreasure", result)
	if err != nil {
		log.Println(err)
	}

	log.Println("result get treasure: ", trueResult)
}
```
Như chúng ta thấy, hàm getTreasures() của smartcontract là một hàm đọc dữ liệu không yêu cầu đối số, chúng ta sẽ không mất phí và sẽ không phải tạo transaction để lấy được thông tin này. Để contract biết chúng ta sẽ gọi đến function nào chúng ta cần tạo một message (là một struct)

* From là địa chỉ thực hiện message

* To là địa chỉ contract

* Value là lượng tiền ảo mà bạn muốn gửi. Trường hợp này sẽ bằng 0.

* Data sẽ được pack lại bằng cách sử dụng method Pack của abi với đối số truyền vào là tên function của smatcontract mà ta muốn gọi, và địa chỉ của smartcontract.

* Cuối cùng ta sử dụng hàm CallContract với đối số truyền vào là message vừa được tạo ở trên. Kết quả trả về sẽ có kiểu hex và một lần nữa ta phải dùng hàm Unpack của abi để lấy được dữ liệu mong muốn.

Ở phần này, chúng ta đã tạo ra một chương trình Golang dùng để đọc dữ liệu từ smartcontract. Ở bài tiếp theo tôi sẽ trình bày cách thực hiện transaction để thay đổi dữ liệu của smartcontract. 
Toàn bộ source được lưu lại tại [đây](https://github.com/tuanhnt1712/smartcontract)
> to be continues...