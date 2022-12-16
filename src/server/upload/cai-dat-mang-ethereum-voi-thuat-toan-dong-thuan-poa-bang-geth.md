Xin chào tất cả các bạn, hôm nay mình muốn hướng dẫn mọi người cài đặt mạng Proof of Authority với clique của Geth (phát triển lên từ Go của Ethereum protocole). Cụ thể thì chúng ta sẽ tạo mạng ngang hàng (Peer-to-Peer) trên máy tính cá nhân, ngoài ra còn bootnode (discovery service) cũng được cài đặt.
Trước tiên, chúng ta phải cài đặt được Geth, các bạn có thể xem hướng dẫn [tại đây](https://geth.ethereum.org/docs/install-and-build/installing-geth). Đây là phiên bản cài đặt Geth trong máy mình

![](https://images.viblo.asia/761b61f4-e5ea-4f04-828d-264a2b9c296a.png)
# 1. Bắt đầu
* Ta tạo folder làm việc cho bài này cũng với đó là 1 folder con cho mỗi nút trong mạng, ví dụ dev và node1, node2
```
$ mkdir dev
$ cd dev
$ mkdir node1 node2
```
## 1.2 Tạo tài khoản
- Mỗi tài khoản (hay 1 ví) sẽ có 1 cặp khóa gồm public key và private key, khóa public sẽ dùng để tương tác với bất kỳ nút mạng nào trong Blockchain, và khóa private sẽ dùng để tạo chữ ký cho các giao dịch trong mạng. Do đó, chúng ta phải cần ít nhất 2 tài khoản. Ta đi vào founder dev và chạy các lệnh sau
```
/dev$ geth --datadir node1/ account new // cho nút 1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 123 (for example)
Repeat passphrase: 123
Address: {87366ef81db496edd0ea2055ca605e8686eec1e6}
```
```
/dev$ geth --datadir node2/ account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 123 (for example)
Repeat passphrase: 123
Address: {08a58f09194e403d02a1928a7bf78646cfc260b0}
```
- Việc này sẽ tạo folder keystore trong mỗi folder node1, node2. Trong keystore sẽ có file in ra địa chỉ tài khoản trùng với phần địa chỉ trong màn hình terminal bên trên.
- Chúng ta có thể lưu địa chỉ của 2 nút trên vào 1 file txt trong thư mục dev, và lưu mỗi mật khẩu của 2 nút vào file password.txt trong mỗi founder
```
/dev$ echo '87366ef81db496edd0ea2055ca605e8686eec1e6' >> accounts.txt
/dev$ echo '08a58f09194e403d02a1928a7bf78646cfc260b0' >> accounts.txt
/dev/node1$ echo '123' > password.txt
/dev/node2$ echo '123' > password.txt
```
## 1.2 Tạo file genesis
- File genesis này được sử dụng để tạo mạng Blockchain. Geth đi kèm với nhiều exception như puppeth hoặc bootnode. Bắt đầu với puppeth:
```
/dev$ puppeth
Please specify a network name to administer (no spaces, please)
> devnet
What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
> 2
Which consensus engine to use? (default = clique)
 1. Ethash - proof-of-work
 2. Clique - proof-of-authority
> 2
How many seconds should blocks take? (default = 15)
> 5 // for example
Which accounts are allowed to seal? (mandatory at least one)
> 0x87366ef81db496edd0ea2055ca605e8686eec1e6 //copy paste from account.txt :)
> 0x08a58f09194e403d02a1928a7bf78646cfc260b0
Which accounts should be pre-funded? (advisable at least one)
> 0x87366ef81db496edd0ea2055ca605e8686eec1e6 // free ethers !
> 0x08a58f09194e403d02a1928a7bf78646cfc260b0
Specify your chain/network ID if you want an explicit one (default = random)
> 1515 // for example. Do not use anything from 1 to 10
Anything fun to embed into the genesis block? (max 32 bytes)
>
What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
> 2
1. Modify existing fork rules
 2. Export genesis configuration
> 2
Which file to save the genesis into? (default = devnet.json)
> genesis.json
INFO [01-23|15:16:17] Exported existing genesis block
What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
> ^C // ctrl+C to quit puppeth
```
## 1.3 Khởi tạo các nút
- Bây giờ chúng ta đã có file genesis.json, ta sẽ tạo 1 file giống genesis cho mỗi nút.
```
/dev$ geth --datadir node1/ init devnet.json
/dev$ geth --datadir node2/ init devnet.json
```
## 1.4 Tạo bootnode
- Mục đích của bootnode là giúp các nút mạng liên hệ được với nhau. Các nút có ip động, có thể thay đổi tắt hoặc bật lại, nhưng bootnode thì có ip tĩnh, do đó 1 nút có thể tìm 1 nút khác thông qua bootnode.
```
/dev$ bootnode -genkey boot.key
```
- Điều này sẽ tạo ra 1 mã encode duy nhất và được lưu trữ trong file boot.key
- Ta sẽ hiển thị xem có những gì rồi:
```
/dev$ tree -L 2
```
- Chúng ta sẽ có kết quả sau:
![](https://images.viblo.asia/4e71f01a-1d22-4e11-9806-53619d38de20.png)
# 2. Thao tác với bootnode
## 2.1 Bắt đầu với bootnode service
```
/dev$ bootnode -nodekey boot.key -verbosity 9 -addr :30310
INFO [02-07|22:44:09] UDP listener up                          self=enode://3ec4fef2d726c2c01f16f0a0030f15dd5a81e274067af2b2157cafbf76aa79fa9c0be52c6664e80cc5b08162ede53279bd70ee10d024fe86613b0b09e1106c40@[::]:30310
```
## 2.2 Bắt đầu với các nút
- Với nút 1, ta mở màn hình terminal mới và thực hiện:
```
/dev$ geth --datadir node1/ --syncmode 'full' --port 30311 --rpc --rpcaddr 'localhost' --rpcport 8501 --rpcapi 'personal,db,eth,net,web3,txpool,miner' --bootnodes 'enode://3ec4fef2d726c2c01f16f0a0030f15dd5a81e274067af2b2157cafbf76aa79fa9c0be52c6664e80cc5b08162ede53279bd70ee10d024fe86613b0b09e1106c40@127.0.0.1:30310' --networkid 1515 --gasprice '1' -unlock '0x87366ef81db496edd0ea2055ca605e8686eec1e6' --password node1/password.txt --mine
```
- Giải thích qua 1 chút:
* --syncmode 'full'giúp ngăn chặn lỗi loan truyền những khối độc hại.
* --port 30311là cổng enode cho node1 và phải khác với cổng bootnode (đó là 30310). Trên một mạng thực (mỗi máy là 1 nút), sẽ sử dụng cùng một cổng.
* --rpcapicho phép các mô-đun đã liệt kê được sử dụng qua các cuộc gọi RPC.
* --bootnodescho biết nút của bạn tại địa chỉ nào để tìm bootnode của bạn. Thay thế bằng IP bootnode.
* --networkIdnhư được định nghĩa trong devnet.json tập tin.
* --unlock --password --mine báo cho nút để mở khóa tài khoản này, với mật khẩu trong tệp đó và bắt đầu thực hiện.
- Tương tự với nút 2, mở màn hình terminal mới và thực hiện:
```
/dev$ geth --datadir node2/ --syncmode 'full' --port 30312 --rpc --rpcaddr 'localhost' --rpcport 8502 --rpcapi 'personal,db,eth,net,web3,txpool,miner' --bootnodes 'enode://3ec4fef2d726c2c01f16f0a0030f15dd5a81e274067af2b2157cafbf76aa79fa9c0be52c6664e80cc5b08162ede53279bd70ee10d024fe86613b0b09e1106c40@127.0.0.1:30310' --networkid 1515 --gasprice '0' --unlock '0x08a58f09194e403d02a1928a7bf78646cfc260b0' --password node2/password.txt --mine
```
- Lúc này, bootnode của bạn sẽ truyền các kết nối đến từ nút1 (cổng 30311) và nút2 (cổng 30312) như được hiển thị trong cửa sổ đầu cuối phía trên. Node1 (thiết bị đầu cuối giữa) và nút2 (thiết bị đầu cuối thấp hơn) nên vui vẻ khai thác và ký kết các khối.
- ![](https://images.viblo.asia/54a991b1-db57-49c9-8b35-30bd6d5b2d0d.png)
## 2.2 Cập nhật tệp genesis
- Chắc chắn khi xây dựng file genesis ta muốn sửa lại nó 1 lần nữa, mở file đó lên:
```
{
    "config": {
        "chainId": 1515,
        "homesteadBlock": 1,
        "eip150Block": 2,
        "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "eip155Block": 3,
        "eip158Block": 3,
        "byzantiumBlock": 4,
        "clique": {
            "period": 1,
            "epoch": 30000
        }
    },
    "nonce": "0x0",
    "timestamp": "0x5a722c92",
    "extraData": "0x000000000000000000000000000000000000000000000000000000000000000008a58f09194e403d02a1928a7bf78646cfc260b087366ef81db496edd0ea2055ca605e8686eec1e60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "gasLimit": "0x59A5380",
    "difficulty": "0x1",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "08a58f09194e403d02a1928a7bf78646cfc260b0": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        },
        "87366ef81db496edd0ea2055ca605e8686eec1e6": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        },
        "F464A67CA59606f0fFE159092FF2F474d69FD675": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
- Trong phần code trên, ta đã xóa những địa chỉ trong mà puppeth đã tạo, và tạo thêm địa chỉ thứ 3 mà genesis được tạo sau đã hỗ trợ. Sau đó, thay đổi period từ 15s thành 1s để các block được thực hiện nhanh hơn. Tăng gasLimit để cho phép các giao dịch được thực hiện nhiều hơn.
- Tiếp theo ta vào 2 thư mục node1 và node2 để xóa thư mục geth trong 2 thư mục này. Thực hiện như sau để tạo lại 2 thư mục geth:
```
/dev$ geth --datadir node1 / init genesis.json 
/dev$ geth --datadir node2 / init genesis.json
```
# 3. Tương tác giữa các nút
## 3.1 Mở Javascript Geth Console
- Cách đơn giản nhất để tương tác với 1 nút là gắn [Javascript Geth Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) cho nút đó.
### 3.1.1 Thông qua ipc
- IPC chỉ hoạt động trên máy chúng ta, mở 1 màn hình terminal:
```
/dev$ geth attach node1/geth.ipc
Welcome to the Geth JavaScript console!
instance: Geth/v1.7.3-stable-4bb3c89d/linux-amd64/go1.9
coinbase: 0x87366ef81db496edd0ea2055ca605e8686eec1e6
at block: 901 (Sat, 10 Feb 2018 21:15:30 CET)
 datadir: /home/salanfe/privateNetworks/devnet/node1
 modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
>
```
- Ta có ngay file geth.rpc khi nút này đang chạy, khi nút tắt thì sẽ không có file này nữa.
- RPC cung cấp quyền truy cập mà không hạn chế đối với tất cả các mô-đun được liệt kê trong terminal: admin: 1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
### 3.1.2 Thông qua rpc
- RPC ( Remote Procedure Call ) hoạt động qua internet dưới dạng các yêu cầu HTTP. Do đó, thông tin trên máy tính chúng ta có thể bị lộ ra bên ngoài qua internet.
- Kết nối với nút 1 bằng rpc:
```
/dev$ geth attach 'http://localhost:8501'
Welcome to the Geth JavaScript console!
instance: Geth/v1.7.3-stable-4bb3c89d/linux-amd64/go1.9
coinbase: 0x87366ef81db496edd0ea2055ca605e8686eec1e6
at block: 945 (Sat, 10 Feb 2018 21:16:14 CET)
 modules: eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
>
```
### 3.1.3 Sử dụng Javascript Geth Console
- Dưới đây là 1 ví dụ:
```
> net.version
"1515"
> eth.blockNumber
1910
> eth.coinbase
"0x87366ef81db496edd0ea2055ca605e8686eec1e6"
> eth.sendTransaction({'from':eth.coinbase, 'to':'0x08a58f09194e403d02a1928a7bf78646cfc260b0', 'value':web3.toWei(3, 'ether')})
"0x299a99baa1b39bdee5f02e3c660e19e744f81c2e886b5fc24aa83f92fe100d3f"
> eth.getTransactionReceipt("0x299a99baa1b39bdee5f02e3c660e19e744f81c2e886b5fc24aa83f92fe100d3f")
{
  blockHash: "0x212fb593980bd42fcaf3f6d1e6db2dd86d3764df8cac2d90408f481ae7830de8",
  blockNumber: 2079,
  contractAddress: null,
  cumulativeGasUsed: 21000,
  from: "0x87366ef81db496edd0ea2055ca605e8686eec1e6",
  gasUsed: 21000,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: "0x08a58f09194e403d02a1928a7bf78646cfc260b0",
  transactionHash: "0x299a99baa1b39bdee5f02e3c660e19e744f81c2e886b5fc24aa83f92fe100d3f",
  transactionIndex: 0
}
> exit // to quit the Geth javascript console
```
- Chúng ta có thể tham khảo [Management APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs) và [JSON RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC)
## 3.2 Sử dụng MIST
- [Mist](https://github.com/ethereum/mist) cung cấp 1 giao diện đồ họa cho phép chúng ta tương tác với smart contract và quản lý các tài khoản (ví).
- Kết nối mist với mạng cục bộ rpc: `/dev$ mist --rpc node1/geth.ipc` và trên `mist --rpc 'http://localhost:8501'` (rpc phải được bật trước)
- Ngoài mist chúng ta cũng có thể dùng [Ethereum Wallet](https://ethereum.org/en/wallets/) để quản lý tài khoản
## Thực hiện cuộc gọi RPC
- Trong phẩn 3.1, chúng ta đã tương tác với Geth API bằng tay, bây giờ chúng ta có thể làm với rpc 1 cách tự động.
- Chúng ta có thể gửi các request JSON RPC đến các nút thông qua thư viện javascript [web3.js](https://github.com/ethereum/web3.js/), hoặc bằng java thông qua [web3.j](https://github.com/web3j/web3j) hoặc bằng pythong thông qua [web3.py](https://github.com/ethereum/web3.py).
- Dưới đây là 1 ví dụ về request Geth API gửi đến 1 nút:
```
$ python
Python 3.6.4 |Anaconda custom (64-bit)| (default, Jan 16 2018, 18:10:19) 
[GCC 7.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import requests
>>> import json
>>> session = requests.Session()
>>> method = 'eth_getTransactionCount'
>>> params = ["0x627306090abaB3A6e1400e9345bC60c78a8BEf57","latest"]
>>> PAYLOAD = {"jsonrpc":"2.0",
...            "method":method,
...            "params":params,
...            "id":67}
>>> PAYLOAD = json.dumps(PAYLOAD)
>>> headers = {'Content-type': 'application/json'}
>>> response = session.post('http://127.0.0.1:8501', data=PAYLOAD, headers=headers)
>>> response.content
b'{"jsonrpc":"2.0","id":67,"result":"0x0"}\n'
>>> json.loads(response.content)['result']
'0x0'
```
- Về phương thức `geth_transactionCount` chúng ta có thể đọc tài liệu [tại đây](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gettransactioncount)
## 3.4 Triển khai và deploy smart contract với Truffle trong mạng của mình
- Truffle là 1 công cụ tốt giúp phát triển smart contract. Trước khi thực hiên bất cứ điều gì với truffle, ta phải khởi tạo trước:
```
$ truffle init
```
- Nó tạo 1 loạt các thư mục và tệp, chúng ta sẽ chỉnh sửa tệp truffle.js như sau:
```
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        devnet: {
            host: '127.0.0.1',
            port: 8501,
            network_id: '*'
        },
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*'
        }
    }
};
```
- Sau đó: `$ truffle deploy --network devnet` để deploy smart contract (ví dụ bạn có file solidity là X.sol) được định nghĩa trong `migrations/X_deploy.js`. Và chúng ta kiểm tra với `$ truffle test --network devnet`.
- Thông thường công cụ giả lập Ethereum Blockchain [Ganache](http://truffleframework.com/ganache/) là khá tốt để chúng ta phảt triển smart contract nhưng việc xây dựng 1 mạng riêng để deploy smart contract cũng tốt không kém. Ngoài ra, genache chỉ thích hợp với lớp trừu tượng lớn, không cần thiết vì nó khá phức tạp.
> Nguồn [Geth](https://geth.ethereum.org/), [Proof-of-Authority](https://www.coinhouse.com/learn/blockchain/what-is-proof-of-authority/), [Truffle](https://www.trufflesuite.com/docs/truffle/reference/configuration)