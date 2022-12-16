Đối với những lập trình viên Dapp ETH thì hẳn sẽ không còn lạ lẫm với thư viện [web3.js](https://github.com/ethereum/web3.js) để giao tiếp với các ethereum node, web3 đưa cho chúng ta một bộ interfaces tương đối chuẩn cho các phương thức RPC.

![](https://images.viblo.asia/a36ff732-6ff7-4076-a86b-1676d5af6c1e.png)

Thường thì các ứng dụng Dapp với ETH hay những chain được fork ra từ ETH thì có thể dùng web3 là đủ hết các chức năng cần có rồi tuy nhiên gần đây mình có phát triển một vài ứng dụng đòi hỏi độ phản hồi khá nhanh nên đã phải mò mẫm trực tiếp vào thẳng RPC để tăng tốc độ lấy dữ liệu .

# RPC là gì ?

Vậy thì RPC là gì ?

Phần lớn chúng ta đều quen thuộc với kiến trúc REST hơn vì nó được áp dụng phần lớn trong các ứng dụng client/server - nơi mà các client quan tâm đến việc lấy thông tin và thao tác với chúng dựa trên các tài nguyên được quản lí bởi một server.

Còn về phía RPC, công nghệ này thường được thấy khi xây dựng các hệ thống phi tập trung, như tên gọi của nó **RPC** - **Remote Procedure Call**. Có thể tạm hiểu RPC là việc chúng ta gọi một thủ tục (procedure) từ một máy khác không cùng chung 1 tiến trình với máy thực thi procedure và sau đó trao đổi bằng tin nhắn. Có thể tạm hiểu như là A đưa cho B một function và nhờ B thực thi vì function đó được implement trên B, sau khi thực thi xong được kểt quả gì thì sẽ vứt lại cho A.

![](https://images.viblo.asia/ee538349-4aba-426b-bd4f-ce79b8625f88.png)

# JSON RPC API

Phía trên là những kiến thức khá là cơ bản, nếu bạn muốn tìm hiểu kĩ hơn về các định nghĩa **RPC** hay **REST** thì có thể tìm kiếm rất dễ dàng trên Google. Trong bài viết lần này mình mục đích muốn giới thiệu về JSON RPC cho mạng blockchain fork từ ETH nên sẽ chỉ đề cập những kiến thức đơn giản.

## Chuẩn bị

Về chuẩn bị thì chúng ta sẽ làm một project nho nhỏ và sẽ cần đến một số thứ như

- Remix editor : Dùng để deploy contract cũng như tạo các transaction - https://remix.ethereum.org/
- Ganache-clie : Giả lập một mạng blockchain - https://github.com/trufflesuite/ganache-cli

Bài này mình phần lớn là giới thiệu về một hướng đi khác thay vì dùng những API có sẵn của web3 mà sẽ đâm thẳng vào RPC do đó sẽ là phần lớn các thao tác trên màn hình console.


## Triển khai

Đầu tiên là thiết kế một **Smart contract** đơn giản :

```js
pragma solidity 0.5.0;

contract RPC {
   
    address public owner;
    uint256 public count;
    
    event Increase(address indexed sender, uint256 count);
    
    constructor() public {
        owner = msg.sender;
    }
    
    function increase() external {
        count = count + 1;
        emit Increase(msg.sender, count);
    }
}
```

Smart contract ở trên đơn giản chỉ chứa 2 biến **owner** và **count** và một Event **Increase**, sau khi deploy thì chúng ta có thể lấy sử dụng RPC để lấy các thông tin từ node triển khai các transaction.

Các bạn có thể deploy trực tiếp trên môi trường **JavaScript VM** và tạo các transaction luôn, nhưng để tương tác thông qua RPC chúng ta phải khởi tạo một node để mô phỏng lại chain, để khởi tạo thì chúng ta sẽ sử dụng thư viện **Ganache-cli**. 


![](https://images.viblo.asia/3567a5c5-2eda-4dd8-b932-7d639a2a0431.png)

Deploy contract bằng remix trên JavaScript VM


Để khởi tạo một Node mô phỏng thì chúng ta sẽ sử dụng thư viện **ganache-cli** bằng câu lệnh trên terminal :

```js
ganache-cli --host 0.0.0.0 --blockTime 2 --networkId 12345678
```

Các tham số được thêm vào với mục đích :

- **host**:  địa chỉ của host chạy node
- **blockTime**: Thời gian một block mới được sinh ra
- **networkId** : ChainId của mạng

Ngoài các tham số này các bạn cùng có thể tuỳ chỉnh mạng **ganache** theo mục đích của mình, để xem các loại tham số có thể chạy câu lệnh để xem :

```js
ganache-cli --help
```

Sau khi đó thì mạng sẽ chạy :
![](https://images.viblo.asia/2ee101f4-1f19-412f-9bf0-4de86d0e7f63.png)


Tiếp đó sẽ dùng **remix** để kết nối với mạng **ganache** mà chúng ta vừa khởi tạo

![](https://images.viblo.asia/072db989-eae1-46c5-b5d6-7dc1155d61b3.png)

Phần **Environment** để tương tác với mạng vừa khởi tạo thì chúng ta sẽ chọn **Web3 Provider** ( Như các bạn thấy thì chainId sẽ thành 12345678 như khi chúng ta truyền vào param --networkId )

Và chúng ta sẽ thử deploy contract trên mạng này :

![](https://images.viblo.asia/c792fd9b-9edc-408c-b563-c3dfbbb72e0c.png)

Giá trị **owner** khởi tạo sẽ là địa deploy contract và giá trị **count** vẫn là 0 là giá trị ban đầu.

Tạo transaction **increase** và sẽ thấy phần log của transaction có dạng :

![](https://images.viblo.asia/d25e0d0a-52de-48f8-8218-842b7bca1a17.png)

Transaction **increase** sẽ emit ra một Event và sẽ tạo ra logs, thay đổi storage:

 - Giá trị **count** 0 - > 1 
 - log tạo ra **sender** và **count**

## Lời gọi RPC

Nếu các bạn follow theo những bước phía trên thì lời gọi RPC sẽ có dạng như sau

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"","params":[],"id":64}' http://0.0.0.0:8545
```

Và mình sẽ giải thích những phần này như sau: 

- **method**: tên procedure mà các bạn muốn gọi VD: web3_clientVersion, web3_sha3, ....
- **params** : Đây là các params trong các request thực hiện các filter, nó đóng vai trò là các giá trị điều kiện filter
- **id** : Giá trị này sẽ rất hữu ích khi bạn sử dụng những công nghệ như websocket - nơi mà nhận được một luồng trả lời, nó có tác dụng để mapping giữa request và response, còn trong trường hợp chỉ đơn giản dùng HTTP POST để truyền message thì nó sẽ không có nhiều tác dụng.

### **LƯU Ý**

Với giá trị được pass vào trong JSON sẽ cần chú ý đến 2 loại mà chúng ta đều phải convert sang **HEX** trước khi tạo request:

- QUANTITIES (giá trị integer, number) : Các giá trị này phải đối sang HEX và được prefix bởi **0x**
    
    + 0x41 (65 in decimal)
    + 0x400 (1024 in decimal)
    + WRONG: 0x (phải luôn có ít nhất 1 chữ số "0x0")
    + WRONG: 0x0400 (không cho phép chữ đầu tiên là 0)
    + WRONG: ff (prefix phải luôn là 0x)
- UNFORMATTED DATA (giá trị địa chỉ ví, mảng bytes, hash, mảng bytecode): Mã hoá sang hex, prefix với 0x, 2 hex digit cho mỗi byte.
    
    + 0x41 (size 1, "A")
    + 0x004200 (size 3, "\0B\0")
    + 0x (size 0, "")
    + WRONG: 0xf0f0f (số lượng digit phải là chẵn)
    + WRONG: 004200 (prefix 0x)


Danh sách các JSON API các bạn có thể tìm hiểu tại đây : https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-api-reference

Đầu tiên các bạn có thể gọi một request đơn giản như sau để lấy được blocknumber tại thời điểm hiện tại:

```js
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://0.0.0.0:8545
```
![](https://images.viblo.asia/adfde5d0-5149-4c4b-a72c-263840724d16.png)

Giá trị trả về là 0x839 ( 2105 in decimal ) là giá trị block hiện tại khi gọi request.

Request phía trên đơn giản là chỉ get dữ liệu về, tiếp theo là một function đòi hỏi phải truyền tham số đầu vào 

### **eth_getStorageAt**
Trả về giá trị lưu trữ trong storage của contract

contract mà chúng ta đã deploy:
```js
pragma solidity 0.5.0;

contract RPC {
   
    address public  owner;
    uint256 public count;
    
    event Increase(address indexed sender, uint256 count);
    
    constructor() public {
        owner = msg.sender;
    }
    
    function increase() external {
        count = count + 1;
        emit Increase(msg.sender, count);
    }
}
```

Địa chỉ của contract của mình chính là **0x1Afc3fdC7884c6a2064c2f39c60d62a7a042703A**
Có 3 params cần truyền:
 - DATA, 20 Bytes - địa chỉ contract.
 - QUANTITY - vị trí của biến muốn get, đã được convert sang hex.
 - QUANTITY|TAG - blockNumber muốn đọc vd: latest để xem giá trị bởi block mới nhất

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x1Afc3fdC7884c6a2064c2f39c60d62a7a042703A", "0x0", "latest"], "id": 1}' http://0.0.0.0:8545
```
![](https://images.viblo.asia/4890c6de-dedb-4d0a-aa96-1b78ebe88814.png)

Giá trị thứ 2 trong mảng params chính là vị trí của slot mà mình muốn lấy từ contract, như cá bạn thấy thì giá trị đó là 0x0 tương tự với là slot đầu tiên chính là gía trị của biến **owner** - địa chỉ đã deploy contract: **0x9bda73b2b006e2ffbe76a352018e8587f98700ca**

### **eth_getLogs**
Dùng để filter giá trị log mà event đã được emit ra trong quá trình tạo các transaction. Trong function này các bạn sẽ gặp một loại params nhận 1 object để filter các event theo giá trị object đó
 ```js
 event Increase(address indexed sender, uint256 count);
 ```

Example: 
```js
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{fromBlock: "",address: "",toBlock: "", "topics":[""]}],"id":74}'
```

Trong đó các params này sẽ là :

- fromBlock: block bắt đầu filter
- toBlock: block kết thúc filter (mặc định sẽ lá latest)
- address: Địa chỉ của contract filter
- topic: giá trị để filter - thường sẽ tồn tại giá trị ban đầu là hash256 của event ( trong trường hợp này là sẽ hash256 của Increase(address, uint256) ), tiếp đó là giá trị indexed để filter.

Trong trường hợp này câu query của chúng ta để lấy lại log Event đã được bắn ra sau khi chạy transaction Increase.

```js
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"address": "0x1Afc3fdC7884c6a2064c2f39c60d62a7a042703A","fromBlock": "0x0","topics":[]}],"id":74}' http://0.0.0.0:8545
```

```json
{"id":74,"jsonrpc":"2.0","result":[{"logIndex":"0x0","transactionIndex":"0x0","transactionHash":"0x5410c09d8f48b919e4a09263fd6cb9af465df7c19330f9c58d04076bb3d753d4","blockHash":"0x9a9df5f6dd60427c4e1ef3828861317124b7b8c1f5582791b1a1f755c101e3c9","blockNumber":"0x12f","address":"0x1afc3fdc7884c6a2064c2f39c60d62a7a042703a","data":"0x0000000000000000000000000000000000000000000000000000000000000001","topics":["0x12007e72f6f07d1e7dd33219d5187184ceba138e79459b6c241cec9a9399fe0c","0x0000000000000000000000009bda73b2b006e2ffbe76a352018e8587f98700ca"],"type":"mined"}]}
```

![](https://images.viblo.asia/59e487ac-7ec7-43dd-8a23-7c010b5b802b.png)

Phần data có kết quả :

```json
"data":"0x0000000000000000000000000000000000000000000000000000000000000001"
```

Đó chính là event mà chúng ta đã emit ra và convert nó sang decimal thì chính là giá trị 1 - giá trị của count 

giá trị **0x12007e72f6f07d1e7dd33219d5187184ceba138e79459b6c241cec9a9399fe0c** trong phần topic chính là mã sha256 của event mà chúng ta muốn filter

![](https://images.viblo.asia/a0dfbeff-5a7d-4720-8dca-889b6c51ae00.png)


# Kết luận

Trên đây là những ví dụ cơ bản nhất mà mính muốn giới thiệu cho các bạn về RPC của các chain được fork ra từ ETH. Các bạn có thể làm một bài test nho nhỏ để test về tốc độ của RPC bằng cách thử subcribe Event và polling Logs liên tục để so sánh tốc độ

Bài viết trên mình cũng mới chỉ thực hiện trên môi trường giả lập, khả năng khi chạy thực tế thời gian phản hồi sẽ khác biệt khi các node có vị trí cách xa nhau cũng như custom riêng của từng network.

Hiện tại mình cũng đang xây dựng một ứng dụng đòi hỏi tốc độ cao tuy nhiên mới chỉ thực nghiệm trên node giả lập, khi nào đưa lên mainet thì có thể mình sẽ tiếp tục viết một bài để review phương thức này có thực sự hữu ích khi xây dựng những dapp đòi hỏi tính real time cao hay không.


# Tham khảo 

- [JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)