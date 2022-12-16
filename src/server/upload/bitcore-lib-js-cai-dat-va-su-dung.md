![](https://images.viblo.asia/716d6372-6d7d-4729-a440-dd8cdd1b09be.png)
# Sơ lược một số khái niệm cơ bản của Bitcoin
Các khái niệm về bitcoin là gì đã có khá nhiều do đó bài viết chỉ tập trung vào vấn đề tạo một giao dịch trong network của bitcoin, cách thức thực hiện như nào.
Bitcoin sử dụng các block nối với nhau hình thành Blockchain (chuỗi khối) - Vì vậy blockchain giống như một cuốn sổ cái ghi lại toàn bộ giao dịch trên mạng lưới Bitcoin.
![](https://images.viblo.asia/272ac49c-62d1-4b36-a411-5009a9e944f4.png)

Khi triển khai 1 dự án về giao dịch bitcoin thì việc cần làm dễ thấy nhất chúng ta cần tạo ra là
*  Wallet(Ví) : Đây được mô tả giống như một địa chỉ định danh, trong Wallet không chứa tiền (là các btc) mà là chứa mã khóa chứng minh được quyền sử dụng BTC (tiền) trên sổ cái (blockchain). Việc tạo ra giao dịch trong mạng lưới Bitcoin là việc ghi nhận sự thay đổi quyền sở hữu lượng BTC của Wallet chứa mã khóa liên quan.
*  Key: Có 2 loại khóa là PrivateKey và PublicKey - (PublicKey được tạo từ PrivateKey bằng thuật toán mã hóa một chiều). PrivateKey chính là chìa khóa để xác định quyền sở hữu trên Wallet, privateKey được sử dụng để sign (ký) trên các giao dịch số (giống như ký trên tấm séc là bạn có toàn quyền sử dụng tiền của mình). PublicKey chỉ để đối chiếu xác minh chữ ký và tạo ra Address bằng cách sử dụng thuật toán mã hóa một chiều - *Address là một chuỗi ký tự đại diện cho Wallet trong việc chuyển nhận BTC*
> Quan trọng nhất là việc bảo mật được hoàn toàn PrivateKey.
*  Transaction: Thực hiện giao dịch trong mạng bitcoin. Transaction có 2 thành phần chính là *Input* (đầu vào) và *Output* (đầu ra).
> *Input* là trạng thái nhận được (spend) một lượng BTC từ các Wallet khác chuyển đến
> *Output* là trạng thái ghi nhận số lượng BTC mà người dùng đã chuyển nhượng cho các Wallet khác

# Thực hiện transaction trong mạng lưới như nào?
Về lý thuyết, chúng ta cần thực hiện full node của bitcoin để tạo ra các service dựa trên node đó, tuy nhiên có một số lib có sẵn có thể giản lược bớt vấn đề này.
Bài viết này sử dụng lib javascript 'bitcore-lib' và 'bitcore-explorers' được bitpay đưa ra để thực hiện giao dịch.
Việc sử dụng lib này là việc sử dụng node mà bitpay đã và đang dựng lên, thông qua mạng lưới node của bitpay mà khởi tạo ví, track các giao dịch. Để đáp ứng cho việc test các transaction thuận tiện thì các giao dịch, khởi tạo ví sẽ thực hiện trên môi trường TESTNET - (cách thức thực hiện sẽ không đưa chi tiết trong bài viết này). Giả sử ta có 2 ví A và B, ví A có 1 lượng bitcoin và muốn gửi cho ví B 1 lượng BTC.
## Cài đặt
```
npm install bitcore-lib --save
npm install bitcore-explorers --save
```
## Tạo một ví random
Địa chỉ ví này là random và được bitcore-lib khởi tạo ra. (khi test, các bạn nên tạo ví trong mạng testnet - mạng test bitcoin tương tự mạng bitcoin thật)
```
var bitcore = require('bitcoin-lib');
var privateKey = new bitcore.PrivateKey(); // Privatekey của ví A

var address = privateKey.toAddress();
```
Trong đó: privateKey là khóa bí mật của địa chỉ ví address
## Lấy địa chỉ ví qua WIF (wallet import format)
```
var wif = 'Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW****'; // PrivateKey của Ví A

var address = new bitcore.PrivateKey(wif).toAddress();
```
## Tạo transaction trên mạng testnet
![](https://images.viblo.asia/319b6ffa-8054-4999-8a89-9b0d766f3af9.png)
```
var Insight = require('bitcore-explorers').Insight;
var insight = new Insight('testnet'); // Khai báo một giao dịch sẽ tạo trong mạng Testnet

insight.getUnspentUtxos(addrSender, function(err, utxos){
	if(err){}
	else{
		console.log('Unsent trans Output ' + utxos);


		var tx = bitcore.Transaction(); // Khởi tạo transaction và các tham số đầu vào
		tx.from(utxos);
		tx.to(addrRecev,20000); // Lượng BTC gửi từ ví A cho ví B ( tính theo satosi)
		tx.change(addrSender); // Địa chỉ ví B
		tx.fee(15000);

		tx.sign(privKeySender); // Ký lên giao dịch sẽ thực hiện
		tx.serialize();

// Broadcast lên mạng lưới testnet
		insight.broadcast(tx, function(err, returnedTxId){
			if(err){
				console.log(err);
			}
			else{
				console.log('success ' + returnedTxId);
			}
		});
	}
});

```
Các thành tố quan trọng trong bài viết này cần để ý là:
```
var bitcore = require('bitcore-lib'); // Lib tạo wallet và private key
var Insight = require('bitcore-explorers').Insight; // Thực hiện giao dịch với UnspentUtxos 
```

Đây là việc tạo ví và thực hiện một cách đơn giản nhất. Các bài viết nâng cao hơn sẽ được viết trong các bài viết khác.

Các nguồn sử dụng cho bài viết: 
- https://github.com/bitcoinjs/bitcoinjs-lib
- https://en.bitcoin.it/wiki/BitcoinJS
- https://iztuts.com/bai-2-tong-quan-ve-bitcoin-va-cach-no-hoat-dong/