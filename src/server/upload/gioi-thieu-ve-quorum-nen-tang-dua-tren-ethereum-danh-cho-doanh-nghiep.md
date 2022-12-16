![](https://images.viblo.asia/ad3210ba-4865-4fda-a275-2d332307194d.png)

## 1. Các khái niệm cơ bản

### 1.1. Quorum là gì ?
Quorum là một giao thức sổ cái phân tán dựa trên Ethereum, được phát triển để giải quyết các vấn đề business như tài chính, chuỗi cung ứng, bán lẻ, bất động sản, v.v ... Quorum hỗ trợ quyền riêng tư trong các giao dịch và hợp đồng.

### 1.2. Các đặc điểm của Quorum
- Hỗ trợ các giao dịch công khai lẫn riêng tư
- Cơ chế đồng thuận theo kiểu multiple voting
- Network/peer được quản lý 
- Hiệu năng cao

### 1.3. Các thành phần trong Quorum

- Quorum Node (chỉnh sửa từ Geth client của Ethereum)
-  Quản lý riêng tư (Priacy Manager - Constellation/Tessera)
    * Transaction Manager
    * Enclave

![](https://docs.goquorum.com/en/latest/Quorum%20Design.png)

**Quorum Node**

Quorum Node là một bản chỉnh sửa nhẹ của Geth-client Ethereum, trong tương lai nó có thể tận dụng lợi thế được hỗ trợ đông đảo từ cộng đồng Ethereum phát triển Geth.Từ đó Quorum có thể phát hành các cập nhật tương thích với các bản cập nhật Geth.

Quorum Node có một số thay đổi sau đây so với Geth:
- Thuật toán đồng thuận được thay thế bằng Raft hoặc Istanbul BFT thay vì PoW.
- Lớp P2P được thay đổi để chỉ các nút được cho phép mới có thể kết nối đến.
- Cây Merkle được chia thành 2 loại: public state trie và private state trie
- Logic trong xác thực block được thay đổi để phù hợp với các giao dịch riêng tư.
- gasPrice bằng 0

**Constellation/Tessera**

Constellation và Tessera là các triển khai của Privacy Manager được viết lần lượt bằng Haskell và Java nhằm mục đích để gửi thông tin đi một cách an toàn. Có thể so sánh chúng với một mạng MTA (Message Transfer Agents) nơi tin nhắn được mã hóa bằng PGP. Nó có khả năng áp dụng trong nhiều loại ứng dụng khác nơi mà bạn muốn trao đổi thông tin một cách an toàn. Mô-đun Constellation và Tessera bao gồm hai mô-đun con:
- Node (Mặc định trong Quorum là `PrivateTransactionManager`
- Enclave (sẽ được đề cập ở phần dưới)

**Transaction Manager**

Transaction Manager là phần trung tâm trong vòng đời của một giao dịch riêng tư (private transaction). Nó giao tiếp với hầu hết các phần của network và thực hiện quản lý vòng đời của dữ liệu riêng tư (private data).

Nhiệm vụ của Transaction Manager bao gồm:
- Hình thành một mạng P2P giữa các transaction manager và broadcast thông tin từ peer
- Giao tiếp với Enclave để mã hóa/giải mã payload của các giao dịch riêng tư.
- Lưu trữ và truy xuất dữ liệu từ cơ sở dữ liệu.

**Enclave**

Enclave là một môi trường an toàn để xử lý các lệnh và dữ liệu, nó hoạt động như một chiếc hộp đen mã hóa/giải mã cho Transaction Manager. Ngoài ra Enclave còn lưu trữ private key của Quorum Node cục bộ cùng với public key của các node khác.




## 2.Giao dịch trong Quorum

### 2.1. Các loại giao dịch trong Quorum
Có 2 loại giao dịch trong Quorum:
- GIao dịch công khai (public transaction): Có phần payload (input) không được mã hóa, giá trị `v` của chữ ký số trong giao dịch là `27` hoặc `28`. Giao dịch công khai có thể được thực thi bởi tất cả các nút trong mạng. Nó có sự tương đồng lớn với một giao dịch trong Ethereum.
- Giao dịch riêng tư (private transaction): Có phần payload (input) được mã hóa, giá trị `v` của chữ ký số trong giao dịch là `37` hoặc `38`. Giao dịch riêng tư chỉ có thể được thực thi bởi các nút được chỉ định.



![](https://miro.medium.com/max/641/0*foPMuF8zUZtdaGRQ.)

Một giao dịch công khai


![](https://miro.medium.com/max/643/0*rFlpXuXElpoRj8wq.)

Một giao dịch riêng tư

### 2.2. Vòng đời của một giao dịch riêng tư

![](https://raw.githubusercontent.com/jpmorganchase/tessera/master/Tessera%20Privacy%20flow.jpeg)

Trong ví dụ này, Chúng ta cùng xem xét một giao dịch riêng tư giữa bên A và bên B, trong đó bên C không được chỉ định tham gia giao dịch.

1. Bên A gửi Giao dịch đến Quorum Node A, chỉ định payload của giao dịch và đặt `privateFor` là khóa công khai (public key) của Bên A và B (Bên A là tùy chọn).
2. Quorum Node A gửi payload của giao dịch đến Transaction Manager A và yêu cầu nó lưu giữ payload của giao dịch.
3. Transaction Manage A sẽ gửi payload của giao dịch đến Enclave để xác thực người gửi và mã hóa payload của giao dịch.
4. Sau khi xác thực xong, Enclave sẽ tiến hành các bước mã hóa:
     - a. Tạo ngẫu nhiên một Random Master Key (RMK) và một số nonce.
     - b. Mã hóa payload của giao dịch với RMK và nonce ở trên.
     - c. Duyệt qua danh sách những public key ở trường `privateFor`, trong trường hợp này là bên A và bên B, sau đó tiến hành mã hóa RMK. Mỗi RMK được mã hóa là duy nhất ứng cho từng bên, trong ví dụ này, sẽ có 2 RMK được mã hóa từ private key của A và public key của B. 
     - d. Enclave trả lại payload của giao dịch đã được mã hóa cùng với các RMK mã hóa cho Transaction Manager A.
5. Transaction Manager A tính toán giá trị SHA3-512 của payload mã hóa và lưu giá trị này cùng với RMK mã hóa vào cơ sở dữ liệu.
6. Transaction Manager A chuyển payload RMK đã mã hóa và nonce qua kênh truyền an toàn (như là HTTPS) đến Transaction Manager B. 
7. Khi việc truyền dữ liệu đến Transaction Manager B đã thành công, Transaction Manager A trả lại giá trị băm của payload cho Quorum Node A để thay thế cho payload  chưa mã hóa ban đầu, cùng với đó là thay đổi giá trị `v` của giao dịch thành 37 hoặc 38.
8. Giao dịch sau đó được Quorum Node A truyền đến các node của mạng bằng Giao thức P2P.
9. Mỗi Quorum Node sẽ nhận ra giá trị `v` là 37 hoặc 38, xác định giao dịch là một giao dịch cần phải giải mã và nó sẽ thực hiện truy vấn đến Transaction Manager để xác định xem nó có lưu giữ giao dịch hay không  ? (sử dụng giá băm để tra cứu).
10.  Vì Bên C không lưu giữ thông tin về giao dịch trong Transaction Manager, nó sẽ bỏ qua giao dịch. Bên A và B sẽ gọi đến Enclave, chuyển vào payload mã hóa, khóa đối xứng được mã hóa và chữ ký.
11.  Enclave xác thực chữ ký, giải mã payload giao dịch và trả lại payload đã được giải mã cho Transaction Manager.
12.  Transaction Manager A và B sau đó gửi payload của giao dịch đã được giải mã đến EVM để thực thi. Việc thực thi này sẽ chỉ cập nhật trạng thái trong Quorum Node ở Private StateDB.


## 3. Ví dụ

Chúng ta sẽ cùng tìm hiểu ví dụ [7nodes](https://github.com/jpmorganchase/quorum-examples) của Quorum để xem nó hoạt động như thế nào? Ví dụ yêu cầu cần cài đặt `VirtualBox` và `Vargant` để có thể chạy được, để tránh việc cài đặt thêm các phần mềm này lên trên máy, chúng ta sẽ chạy ví dụ với Docker.

**Clone mã nguồn từ github về**

```bash
git clone https://github.com/jpmorganchase/quorum-examples
cd quorum-examples
```

**Chạy ví dụ với docker-compose**

```bash
docker-compose up -d
```

![](https://images.viblo.asia/08dbdc35-4018-4ee4-857c-87d4e70a6a80.png)


**Xem các container (7 container cho 7 nodes)**

```bash
docker ps
```

![](https://images.viblo.asia/aa81aa86-a59a-4494-aaa9-8074213ca186.png)

**Mở Javascript Geth console trên node 1 (bạn có thể chọn node khác)**

```bash
docker exec -it quorum-examples_node1_1 geth attach /qdata/dd/geth.ipc
```

**Chạy file `private-contract.js`**

```bash
./runscript.sh private-contract.js
```

Nội dung file `private-contract.js`

```js
a = eth.accounts[0]
web3.eth.defaultAccount = a;

// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
var abi = [{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initVal","type":"uint256"}],"payable":false,"type":"constructor"}];

var bytecode = "0x6060604052341561000f57600080fd5b604051602080610149833981016040528080519060200190919050505b806000819055505b505b610104806100456000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632a1afcd914605157806360fe47b11460775780636d4ce63c146097575b600080fd5b3415605b57600080fd5b606160bd565b6040518082815260200191505060405180910390f35b3415608157600080fd5b6095600480803590602001909190505060c3565b005b341560a157600080fd5b60a760ce565b6040518082815260200191505060405180910390f35b60005481565b806000819055505b50565b6000805490505b905600a165627a7a72305820d5851baab720bba574474de3d09dbeaabc674a15f4dd93b974908476542c23f00029";

var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.new(42, {from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}, function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});
```

File `private-contract.js` sẽ thực hiện load contract `simplestorage` và thực hiện gọi hàm `set()` trong contract với tham số đầu vào là 42. 

```js
var simple = simpleContract.new(42, {from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}, function(e, contract)
```

Đoạn code trên thể hiện rằng giao dịch này xuất phát từ node 1 và là giao dịch private (có trường `privateFor` là public key của node 7). Giao dịch này chỉ có thể thực thi bởi node 1 và node 7.

![](https://miro.medium.com/max/634/0*6p93PgfUhmUtb-o-.)


```js
pragma solidity ^0.5.0;

contract simplestorage {
  uint public storedData;

  constructor(uint initVal) public {
    storedData = initVal;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() view public returns (uint retVal) {
    return storedData;
  }
}
```

Kết quả sau khi chạy xong file `private-contract.js`

![](https://images.viblo.asia/8e461032-278b-448d-a651-46e61346ba7a.png)

Khi này, giá trị biến `storedData` đã thay đổi thành 42 trong privateState của node 1  và node 7.

**Kiểm tra kết quả giao dịch**

- Trên Javascript Geth console của node 1:
```bash
> var test = simpleContract.at('0x1932c48b2bf8102ba33b4a6b545c32236e342f34')
> test.get()
42
>
```
- Trên javascript Geth console của node 7:
```bash
> var test = simpleContract.at('0x1932c48b2bf8102ba33b4a6b545c32236e342f34')
> test.get()
42
>
```
- Trên javascript Geth console của các node 2, 3, 4, 5, 6:
```bash
> var test = simpleContract.at('0x1932c48b2bf8102ba33b4a6b545c32236e342f34')
> test.get()
0
>
```

=> Chứng tỏ giao dịch khả dụng với node 1 và node 7


**Tắt Network Quorum**

```bash
docker-compose down
```




## 4.Tài liệu tham khảo
https://docs.goquorum.com/en/latest/

https://github.com/jpmorganchase/quorum-examples

https://medium.com/@kctheservant/exploring-how-private-transaction-works-in-quorum-53612a9e7206