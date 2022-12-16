**Ethereum** cùng với công nghệ **Blockchain** đang trở thành xu hướng công nghệ trên toàn thế giới. Tuy nhiên với rất nhiều người, kiến thức về lĩnh vực này còn khá là mới mẻ. Dưới góc nhìn là một developer thì Ethereum mang đến rất nhiều khám phá mới mẻ và ứng dụng của nó có tiềm năng phát triển rất lớn trong tương lai. <br>

Trong bài viết này, tôi xin phép hướng dẫn cách tạo một account và transaction Ethereum trên môi trường Testnet để mọi người có thể hiểu hơn về quá trình tạo và xử lý một giao dịch như thế nào. Hy vọng sau bài viết này mọi người sẽ hứng thú nghiên cứu và yêu thích Ethereum nhiều hơn.<br>


Vậy đầu tiên, chúng ta sẽ đi tìm hiểu các khái niệm cơ bản trong Ethereum:<br>
## Các khái niệm cơ bản trong Ethereum
### Smart contract (SC) ?
**Smart contract** là một ứng dụng có khả năng tự đưa ra các điều khoản và thực thi thỏa thuận của hệ thống máy tính bằng cách sử dụng công nghệ Blockchain. Các điều khoản của **SC** tương đương với một hợp đồng pháp lý và được ghi lại dưới ngôn ngữ của máy tính.<br> **SC** được biên dịch thành bytecode và được lưu trên blockchain dưới dạng **contract** (hợp đồng) đi kèm với 1 **address** (địa chỉ) duy nhất. Ta có thể sử dụng **address** này để tương tác với **SC** và thực hiện các phương thức được cung cấp bởi **SC**. <br>
Mỗi **SC** có thể lưu trữ những giá trị của riêng (state) và việc thay đổi các giá trị này phải được sự đồng thuận bởi cả blockchain đồng nghĩa với việc một thay đổi tương đương với một **transaction**(giao dịch).
### Wallet trong Ethereum?
**Wallet** là một loại ví điện tử dùng để lưu trữ các đồng tiền có giá trị tương đương với thực tế. <br>
**MyEtherWallet** là một loại ví điện tử dùng để lữu trữ đồng tiền điện tử Ethereum (ETH) được coi là số 1 hiện nay về lưu trữ cũng như giao dịch ETH hiện nay. Ngoài việc lưu trữ ETH ví Myetherwallet còn được dùng để lưu trữ các token trong các dự án ICO.<br>

### Khái niệm GAS ?
**Gas** là một đơn vị đo lường nhằm tính toán chi phí mà nó sẽ cần để thực hiện các hoạt động nhất định, có thể là một giao dịch đơn giản, hoặc một hợp đồng thông minh, hoặc thậm chí một ICO cũng sẽ tiêu tốn một lượng gas.<br>

Như vậy chúng ta đã nắm được các khái niệm cơ bản về Ethereum. Tiếp theo, chúng ta sẽ đi tìm hiểu là thế nào để tạo một account và một transaction trên môi trường **testnet** với thư viện **web3.js**. <br>
Đầu tiên chúng ta cần chuẩn bị:
* Cài đặt thư viện **web3.js**: https://github.com/ethereum/web3.js
* Tham khảo tài liệu về Web3.js tại đây: https://web3js.readthedocs.io/en/1.0/getting-started.html
* Môi trường testnet chúng ta sẽ sử dụng là [Ropsten Testnet](https://ropsten.etherscan.io/)

## Tạo ví MyEtherWallet ?
### Thiết lập Provider với Ropsten
Chúng ta sẽ có 2 phương thức là **HttpProvider** và **Websocket provider**. Chúng ta sẽ bắt đầu với websocket provider:
```
//import thứ viện Web3js
var Web3 = require('web3');
var web3 = new Web3();

//thiết lập websocket provider
web3.setProvider(new web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
```

Tiếp theo, chúng ta sẽ tạo ra 2 ví để có thể thực hiện việc tạo một giao dịch:
### Tạo ví
```
//Tạo tài khoản ví 1
var accountSend = web3.eth.accounts.create();
accountSend
> { 
	address: '0x84dA187Ca89Ee326078B73beef971768B181a005',
	privateKey: '0xd487e9bc8c58015e42bbbd3914cc3b7dd5aa51884a04e2bec44f4507f4d5e41b',
	signTransaction: [Function: signTransaction],
	sign: [Function: sign],
	encrypt: [Function: encrypt] 
}
//Tạo tài khoản ví 2
var accountReceive = web3.eth.accounts.create();
accountReceive
> { 
	address: '0x5c590144B0f26c41adE2C64b3E0634a672038584',
  	privateKey: '0x440370d1d7bac178ca2e6ae371c17285c369fa42702764fdce2bcb258589ebc2',
  	signTransaction: [Function: signTransaction],
  	sign: [Function: sign],
  	encrypt: [Function: encrypt] 
}
```
Ở bước này, mỗi tài khoản đã sinh ra được một constract tương ứng với một **address** và **privateKey** duy nhất.<br>
Sau đó, chúng ta sẽ cấp tiền ảo cho ví bằng cách truy cập [Ropsten Ethereum Faucet](https://faucet.ropsten.be/) nhập địa chỉ ví (address) như hình:<br>
![](https://images.viblo.asia/b23bc243-8391-4815-8bfd-8c1be6c2e4ec.jpg)
<br>Tiếp theo, chúng ta có thể truy cập vào https://ropsten.etherscan.io và xem thông tin **balance** ví của mình hoặc truy cập địa chỉ https://ropsten.etherscan.io/address/<your_address>
## Tạo transaction
Để đăng ký một transaction, chúng ta sử dụng hàm **signTransaction** với một **privateKey**
```
web3.eth.accounts.signTransaction(tx, privateKey [, callback]);
```

**Thông số truyền vào**<br>
> **tx** - Object: The transaction object as follows:
> * **nonce** - String: (optional) The nonce to use when signing this transaction. Default will use web3.eth.getTransactionCount().
> * **chainId** - String: (optional) là id blockchain của bạn. Mặc định sẽ sử dụng web3.eth.net.getId().
> * **to** - String: (optional) là địa chỉ người nhận của giao dịch.
> * **data** - String: (optional) có thể là nội dung thực hiện giao dịch.
> * **value** - String: (optional) là giá trị của giao dịch được tính theo đơn vị wei.
> * **gasPrice** - String: (optional) là chi phí **gas** để thực hiện giao dịch này. Mặc định sẽ sử dụng web3.eth.gasPrice().
> * **gas** - String: gas được cung cấp bởi giao dịch.
> <br>
> 
> **privateKey** - String: là mã bảo mật được sinh ra khi tạo tài khoản ví.<br>
> **callback** - Function: (optional) được trả về là tham số đầu vào và đầu ra là giá trị trả về.<br>

<br>

**Ví dụ**
```
//sign transaction
var tx = {
    to: '0x5c590144B0f26c41adE2C64b3E0634a672038584',
    value: '2441406250',
    gas: '21000'
};
web3.eth.accounts.signTransaction(tx, '0xd487e9bc8c58015e42bbbd3914cc3b7dd5aa51884a04e2bec44f4507f4d5e41b').then(console.log);
```
Bước tiếp theo, chúng ta sẽ phải thực hiện lệnh gửi yêu cầu thực hiện giao dịch đó với hàm **sendSignedTransaction**
```
web3.eth.sendSignedTransaction(signedTransactionData [, callback])
```
**Thông số truyền vào**
> **signedTransactionData** - String: là chuỗi mã hóa kiểu Hex của dữ liệu giao dịch đã đăng ký.<br>
> **callback:** - Function (optional) được trả về là tham số đầu vào và đầu ra là giá trị trả về.<br>
> 
<br>

**Các bước thực hiện**
```
var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('d487e9bc8c58015e42bbbd3914cc3b7dd5aa51884a04e2bec44f4507f4d5e41b', 'hex')

var rawTx = {
	from: "0x84dA187Ca89Ee326078B73beef971768B181a005",
  	nonce: '0x00',
  	gasPrice: '0x9184e72a000', // 10000000000000
  	gasLimit: '0x76c0', // 30400
  	to: '0x5c590144B0f26c41adE2C64b3E0634a672038584',
  	value: '0x9184e72a', // 2441406250
  	data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
}

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
```
**Kết quả trả về**
```
{ 
	blockHash: '0x22903fa104fb9ffbc75325e50059af9e10613bdf078c32d1e54149402465da3d',
  	blockNumber: 3943689,
  	contractAddress: null,
  	cumulativeGasUsed: 23788,
  	from: '0x84da187ca89ee326078b73beef971768b181a005',
  	gasUsed: 23788,
  	logs: [],
  	logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  	status: true,
  	to: '0x5c590144b0f26c41ade2c64b3e0634a672038584',
  	transactionHash: '0xc06d6dc3e213c3e7be1407c08c7c9dc09ad46081da2ee502285da81e9e271a0e',
  	transactionIndex: 0 
}
```
Giao dịch đã được khởi tạo thành công.<br><br>
Trường hợp găp lỗi **Buffer** thì chúng ta sẽ cài dặt thư viện **Buffer** bằng npm:
```
npm i buffer
```
Ngoài ra, để kiểm tra trạng thái thực hiện giao dịch của mình bằng cách tìm kiếm giao dịch trên Ropsten testnet thông qua **transactionHash** trả về tại https://ropsten.etherscan.io. <br><br>
![](https://images.viblo.asia/2dbad753-9ec9-4046-abc4-ee078a754180.jpg)
<br>
Như vậy, kêt thúc bài viết này chúng ta sẽ có một cái nhìn cơ bản để có thể hiểu được luồng xử lý giao dịch blockchain và cụ thể hơn là đồng Ether (ETH). Hy vọng các bạn sẽ có hứng thú nghiên cứu và tạo ra những ứng dụng thực tế với công nghệ blockchain. Chúc các bạn thành công!

**Nguồn tham khảo:**
<br>
https://www.ethereum.org/
<br>
https://web3js.readthedocs.io/en/1.0/index.html
<br>
https://github.com/ethereum/web3.js/
<br>
https://medium.com/@codetractio/try-out-ethereum-using-only-nodejs-and-npm-eabaaaf97c80