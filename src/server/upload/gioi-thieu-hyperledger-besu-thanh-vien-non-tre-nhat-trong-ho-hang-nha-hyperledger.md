![](https://images.viblo.asia/9460714f-0ba9-480e-b187-04a2c4eb1bad.png)


## 1. Giới thiệu

Hyperledger Besu là một Ethereum client (mã nguồn mở) được viết bằng Java. Nó có thể chạy tốt trên mạng Ethereum MainNet và các mạng thử nghiệm như Rinkeby, Rospten và Görli.

### Vậy Ethereum Client cụ thể là gì ?

Ethereum Client là phần mềm implements các giao thức của mạng Ethereum hay là phần mềm chạy máy ảo EVM. Nếu bạn muốn tham gia trực tiếp vào mạng Ethereum mà không thông qua bên thứ 3 như là Infura, hay dùng Metamask ... thì bắt buộc tải Ethereum Client về để cài đặt trên máy.

![](https://images.viblo.asia/e96f766c-39cf-4872-aed7-c90f3dcc3a74.jpg)


Hiện nay có khá nhiều phiên bản Ethereum Client được viết bằng nhiều ngôn ngữ khác nhau.
1. Phát hành chính bởi Ethereum
    - Aleth - C++ client: https://github.com/ethereum/aleth
    - Geth - Golang client of the go-ethereum project: https://github.com/ethereum/go-ethereum
    - Trinity - Python client: https://github.com/ethereum/trinity
2. Do bên thứ 3 phát hành
    - EthereumJ - Java client by the ether.camp team: https://github.com/ethereum/ethereumj
    - EthereumJS VM - Javascript Ethereum Virtual Machine: https://github.com/ethereumjs/ethereumjs-vm
    - Besu  https://github.com/hyperledger/besu
    - Mana - Elixir by POA Network - https://github.com/mana-ethereum/mana
    - Minimal - Go client by umbracle - https://github.com/umbracle/minimal
    - Nethermind - C# / .NET by Nethermind
    - Parity Ethereum - Rust client by Parity Technologies : https://www.parity.io/ethereum/


Một Ethereum Client cơ bản có những tính năng sau:
- Xử lý giao dịch, smart contract với môi trường EVM
- Lưu trữ dữ liệu của mạng (các block)
- Kết nối P2P đến các node khác trong mạng để đồng bộ dữ liệu hay broadcast event lên mạng.
- Cung cấp APIs cho các developer tương tác với mạng blockchain

## 2. Kiến trúc

![](https://images.viblo.asia/5e3ea6bb-22cf-48df-b2b8-a8639dd788a6.png)

Kiến trúc của Besu chia ra làm 4 phần chính là **Storage**, **Ethereum Core** , **Networking** và **User-facing APIs**

1. **Storage**: Besu sử dụng [RocksDB](https://rocksdb.org/) để lưu trữ dữ liệu dạng key-value. Data lưu trong storage chia thành 2 phần.
     - **Blockchain**: Lưu chuỗi các block (gồm header và body block).
     - **World State**: Lưu StateTree (mapping address account với state của account (vd như số dư)).
 ![](https://images.viblo.asia/c4b6ef88-55cd-473b-b7bc-c90cbaadcbe5.png)
2. **Ethereum Core**:
    - EVM: Biên dịch, xử lý các smart contracts cũng như các giao dịch.
    - Thuật toán đồng thuận (Consensus Algorithms): Hỗ trợ 3 thuật toán là **Proof of Work (Ethash)**, **Clique** và **IBFT 2.0**.
3. **Networking**
- Discovery: Giao thức dựa trên UDP để tìm các peers trên network
- RLPx:  Giao thức dựa trên TCP tương tác với các peers khác. Tùy vào thuật toán đồng thuận mà node sẽ sử dụng **ETH Sub-protocol** hay là **IBF Sub-protocol**.
4. **User-facing APIs**
- Phía ứng dụng có thể thông qua **HTTP JSON-RPC**, **WebSocket JSON-RPC** hay **GrapgQL** để tương tác với mạng blockchain. Khi phát triển dapp với Besu chúng ta có thể dùng các công cụ quen thuộc như **Truffle**, **Remix** hay **web3**.

## 3. Tính riêng tư (Privacy)

Ngoài việc có thể hoạt động bình thường trên mainet Ethereum và các testnet như các phiên bản Ethereum Client khác. Hyperledger Besu còn cho phép người dùng có thể  tạo một mạng private (private network) và thực hiện các private transactions trên mạng đó.

### Orion
Đầu tiên chúng ta sẽ tìm hiểu Orion, một khái niệm quang trọng đối với việc sử lý các private transaction trong Besu.

**Orion** là một phầm mềm mã nguồn mở giúp quản lý các private transactions (private transaction manager) được viết bằng Java.

Chức năng của **Orion**:
- Tạo và duy trì các cặp khóa công khai (private/public keypairs)
- Lưu trữ thông tin chi tiết về `privacy group` (chúng ta sẽ tìm hiểu privacy group là gì ở phần sau)
- Kết nối đến các Orio node khác trong mạng
- Cung cấp bộ API giúp kết nói với Ethereum Client cũng như các Orion node.

### Privacy Group

Privacy Group là tập hợp các nodes được định danh bởi một id duy nhất.

Besu node trong trường hợp này sẽ lưu trữ `public world state` của mạng publics và `private state` cho mỗi privacy group. Dữ liệu trong private state sẽ truy cập từ các thành phần bên ngoài.

![](https://images.viblo.asia/2904c74d-177d-49b3-8808-16c4eba76adc.png)


### Private Transactions

Private transactions là các giao dịch được diễn ra trong các **Privacy Group**, dữ liệu, trạng thái của các private transactions sẽ được lưu vài private state của Besu node như đã mô tả ở trên.

**Đặc điểm của private transactions**
- Private transactions chỉ thành công khi các node tham gia vào giao dịch đều online trên mạng (nguyên văn: `All private transaction participants must be online for a private transaction to be successfully distributed`
 )
- Các private transactions chỉ có thể là giao dịch deploy contract hoặc gọi hàm trong contract. Giao dịch chuyển ETH không thể là private transaction.
- Để thực hiện các private transactions, mỗi Besu node cần có một Orion node tương ứng.


```json
{
  "to": null,
  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
  "gas": "0x7600",
  "gasPrice": "0x0",
  "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029",
  "nonce": "0x0",
  "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
  "privateFor": ["g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw=","6fg8q5rWMBoAT2oIiU3tYJbk4b7oAr7dxaaVY7TeM3U="],
  "restriction": "restricted"
}
```

Ngoài một số trường tương tự như các public transactions, private transactions có thêm một số trường như sau:
- `privateFrom`: The Orion public key của người gửi
- `privateFor`: - The Orion public keys của người nhận
- `privacyGroupId`
- `restriction`: Là một trong 2 giá trị `restricted` hoặc `unrestricted`
    - `restricted`: Chỉ các node tham gia vào giao dịch mới nhận được payload 
    - `unrestricted`: Tất cả các node trong mạng nhận được payload của private transactions, nhưng chỉ có các node là thành phần của giao dịch mới đọc được.

### Quy trình xử lý một private transactions

Quá trình xử lý một private transaction bao gồm:
- **Precompiled Contract**: Smart contract được biên dịch thành EVM bytecode và lưu trữ ở Ethereum node để sau này xử lý tiếp.
- **Privacy Marker Transaction**: Một public Ethereum transaction với payload kèm theo một enclave key. Enclave key là một con trỏ, nó trỏ tới private transaction ở Orion node. Trường `to` trong Privacy Marker Transaction là địa chỉ của contract được biên dịch ở phần trên.

Privacy Marker Transaction được [ký bằng một khóa ngẫu nhiên hoặc khóa được chỉ định qua command-line](https://besu.hyperledger.org/en/stable/HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions/)

**Lưu ý**: Các private transaction vẫn được public lên mạng Ethereum và đóng vào block bình thường như các giao dịch public khác. Chỉ khác ở chỗ khi ở trong **Privacy group** thì các node sẽ sử dụng `private state` thay vì `public state` của mạng Ethereum.


![](https://images.viblo.asia/e4a7014f-2eac-45bb-9d08-1671c4b7b5a5.png)

1. Private transactions được submit bằng việc sử dụng [eea_sendRawTransaction](https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eea_sendrawtransaction)
2. Private transaction được chuyển tiếp đến **Private Transaction Handler** trong node Besu thông qua JSON-RPC.
3. **Private Transaction Handler** gửi private transactions tới Orion node tương ứng với Besu node hiện tại.
4. **Orion node** gửi trực tiếp private transactions đến Orion node của bên nhận (point-to-point) hoặc các **Orion node** trong privacy group (tùy thuộc vào trường `restriction` trong private transactions). Các **Orion node** nhận được và lưu các private transactions ở dạng key-value.
5. **Orion node** trả lại transactions hash cho **Private Transaction Handler**.
6.  **Private Transaction Handler** tạo một **Privacy Marker Transaction**. **Private Transaction Handler** sẽ broadcast  **Privacy Marker Transaction** lên toàn mạng public thông qua giao thức P2P.
7.  Miner sẽ đóng  **Privacy Marker Transaction**  vào block và broadcast lên toàn mạng
8. Với những nodes lưu trữ `contract` có địa chỉ giống với địa chỉ contract trong  **Privacy Marker Transaction** sẽ giữ lại **Privacy Marker Transaction** và xử lý tiếp. Các node còn lại sẽ bỏ qua **Privacy Marker Transaction**.
9.  Contract truy vấn Orion node thông tin và `private transaction` và `privacy group ID` bằng việc sử dụng transaction hash.
10.  Contract chuyển private transaction vào **Private Transaction Processor**
11.  **Private Transaction Processor** thực thi giao dịch. **Private Transaction Processor** có thể đọc và ghi vào `private world state` và chỉ có thể đọc từ `public world state`.


## Tài liệu tham khảo

https://www.hyperledger.org/blog/2019/08/29/announcing-hyperledger-besu
https://besu.hyperledger.org/en/stable/