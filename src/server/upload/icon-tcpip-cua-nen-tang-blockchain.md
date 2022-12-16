![](https://images.viblo.asia/9e88f2fb-28c0-4c89-8ff8-33ae8835a8e5.png)

## 1. Giới thiệu

**ICON** là một nền tảng Blockchain 2.0 (có nhiều điểm tương đồng với Ethereum). **ICON** chạy các hợp đồng thông mình với giao thức đồng thuận là BFT-DPoS (Delegated Proof-of-Stake), **ICON** cũng có phát hành tiền mã hóa giống như Ethereum với tên gọi là **ICX**.

Mục tiêu mà đội ngũ phát triển **ICON** hướng đến trong tương lai là kết nối giữa các mạng blockchain với nhau, giúp chúng dễ dàng trao đổi tài sản cũng như dữ liệu. Có một ví dụ mà đội ngũ phát triển của **ICON** đưa ra để so sánh việc kết nối được các mạng blockchain với nhau, cũng giống như việc ra đời của bộ giao thức **TCP/IP** giúp kết nối các mạng riêng với nhau thành mạng Internet toàn cầu. **ICON** mong muốn họ sẽ là **TCP/IP** của Blockchain :grinning:

Bên giới là video giới thiệu về **ICON** từ đội ngũ nhà phát triển

{@embed: https://www.youtube.com/watch?v=ZgaAovoV_Dk&feature=youtu.be}

## 2. Một số khái niệm cơ bản

### Tài khoản

Giống như Ethereum, ICON cũng có 2 loại tài khoản đó là:
- Tài khoản người dùng (Externally Owned Accounts): Bắt đầu bằng **hx**, độ dài 20 bytes hex
- Tài khoản hợp đồng thông minh: Bắt đầu bằng **cx**, độ dài 20 bytes hex. Không có private key.

### Giao dịch

Các loại giao dịch trên **ICON**
- Chuyển ICX
- Lưu data vào blockchain
- Deploy hay update **SCORE**
- Thay đổi state của **SCORE**

**Lưu ý**: Smart contract trên ICON được gọi là  **SCORE**

Các tham số khi thực hiện một giao dịch:
- `from`: Địa chỉ tạo giao dịch
- `to`: Địa chỉ nhận giao dịch (Khi deploy thì địa chỉ nhận là `cx0000000000000000000000000000000000000000` )
- `value`: Lượng **ICX** gửi đi
- `stepLimit`: Số step tối đa mà giao dịch có thể thực hiện (gần tương tự như gasLimit trong Ethereum)
- `time stamp`: Thời gian tạo giao dịch
- `nonce`: Số thứ tự giao dịch của tài khoản gửi (tương tự như nonce trong Ethereum)
- `nid`: Network ID (Phân biệt giữa mainnet, testnet)
- `data type`: Giúp phân biệt loại giao dịch. Gồm 3 giá trị `call`, `deploy` và `message`. Với giao dịch chuyển ICX thông thường, data type sẽ được bỏ qua.
- `data`: Nội dung giao dịch (có thể là các tham số truyền vào để gọi hàm trong contract)
- `signature`: Chữ ký số của người gửi giao dịch
- `transaction hash`: Giá trị băm định danh giao dịch

### Phí giao dịch

**Step** là đơn vị đo lường để tính phí giao dịch trên mạng **ICON**. Số lượng **Step** mà một giao dịch cần phụ thuộc vào  lượng tài nguyên tính toán cần bỏ ra để thực hiện giao dịch đó. Tỷ giá ban đầu, 1 **ICX** = 100,000,000 **Step**. Tỷ giá này có thể được thay đổi nếu giá **ICX** tăng quá cao hoặc bị giảm xuống rất thấp. 

#### Công thức tính step

**Step = max ( ∑ βiSi + C, C )**

**Lưu ý**: Số lượng step tối đa mà một giao dịch có thể tiêu thụ là 2.5 tỷ step

Với:
- **Si** là số lần thực hiện một lời gọi cụ thể nào đến đến hợp đồng thông minh.
- **βi** là số step sẽ được tiêu thụ với từng lời gọi cụ thể.
- **C** là số lượng step tối thiểu một giao dịch cần phải chi trả (Hằng số với giá trị 100.000)

Bên dưới là 2 bảng lần lượt mô tả các giá trị khả dĩ của **Si** và các giá trị step tiêu thụ với mỗi lời gọi tương ứng đến contract.

![](https://images.viblo.asia/02324ad5-3c1d-4a12-87b9-146206055d41.png)

![](https://images.viblo.asia/6858cdb6-77c5-4222-9750-02c872771ca3.png)

#### Chính sách hỗ trợ phí giao dịch cho người dùng

Bình thường, khi thực hiện giao dịch, người dùng sẽ chịu toàn bộ chi phí. Với ICON, đội ngũ phát triển đã thiết kế một tính năng cho phép chủ của contract có thể hỗ trợ một phần hoặc toàn bộ chi phí giao dịch khi người dùng gọi đến contract của họ.

Phần trăm phí hỗ trợ giao động từ 0 - 100% (nghĩa là có thể không hỗ trợ phí). Nếu bên phát triển contract muốn hỗ trợ phí cho người dùng, thì họ phải gửi trước vào contract 1 lượng ICX để đến khi người dùng gọi đến, lượng ICX này sẽ được khấu trừ vào phí giao dịch của người dùng tùy theo tỷ lệ.

### Virtual Step

**Virtual Step** là hệ thống tính phí mới của mạng ICON dành cho chủ sở hữu contract. Nó được tạo ra hàng tháng tương ứng với số lượng ICX được gửi vào contract và khoảng thời gian ký gửi ICX vào contract đó. Ngoài việc hỗ trợ phí cho người dùng bằng **ICX**, chủ sở hữu SCORE có thể trả phí bằng **Virtual Step**. Điều này giúp chủ sở hữu contract giảm 1 phần gánh nặng chi phí cũng như khuyến khích tăng phần trăm hỗ trợ phí lên cao hơn cho người dùng.

Một số đặc điểm:
- **Virtual Step** và **Step** có tỷ lệ 1:1
- **Virtual Step** được tạo ra sau mỗi 1,296,000 blocks (1 tháng). Khi đó, các **Virtual Step** chưa dùng sẽ hết hạn.
- Không thể chuyển **Virtual Step** đi đâu cả.
- Phí hỗ trợ người dùng sẽ tiêu **Virtual Step** trước, nếu hết **Virtual Step** mới tiêu đến **ICX**

**Tính toán Virtual Step**

- Khi gửi ICX vào contract, cần thiết lập đặt số tiền gửi và thời hạn gửi.
- Thời gian gửi có thể được thiết lập từ tối thiểu là 1 tháng đến tối đa là 24 tháng.
- Số tiền gửi tối thiểu từ 5.000 ICX đến tối đa 100.000 ICX.

Tùy vào thời gian ký gửi ngắn hay dài mà số virutal step nhận được sau mỗi tháng sẽ khác nhau:

![](https://images.viblo.asia/e76a162c-e22d-4e25-aca0-b5fbbbc44600.png)

Ví dụ:
- Gửi 10.000 ICX vào với thời gian 1 tháng. Sau 1 tháng nhận được **80,000,000,000** Virtual Step, tương đương với 8 % của số tiền gửi 10.000, là 800 ICX. 
- Gửi 10.000 ICX vào với thời gian 24 tháng. Mỗi tháng nhận được **202,400,000,000** Virtual Step, tương đương với  20.24 % của số tiền gửi 10.000 ICX.


**Lưu ý**: Các chủ sở hữu contract sẽ phải chịu một khoản phạt nếu họ rút ICX đã ký gửi trước khi kết thúc khoảng thời gian định trước. Tiền phạt bằng tổng số **Virtual Step** được sử dụng trong thời gian trước đó.

### ICON nodes

ICON nodes có 3 loại
- Peer: có thể tham gia vào giao thức đồng thuận, có thể tạo mới block trên mạng.
- Citizen: Đồng bộ hóa dữ liệu blockchain và chuyển tiếp giao dịch đến Peer.
- Light: Lưu các block header của mạng, thực hiện nhiệm vụ xác minh giao dịch.

![](https://images.viblo.asia/03843e26-4eea-456d-ad1b-99b0b22ebd75.png)


## 3. Viết smart contract

**SCORE** trên **ICON** được viết bằng ngôn ngữ Python.

Trước tiên, các bạn cần cài công cụ [tbears](https://www.icondev.io/docs/tbears-overview), tbears là một công cụ giúp init, deploy và tương tác với smart contract trên mạng **ICON** (tương tự như truffle bên Ethereum). Các cài đặt tbears các bạn có thể tham khảo tại [đây](https://www.icondev.io/docs/tbears-installation)

### Hello world
 
Chúng ta sẽ bắt đầu vơi một smart contract đơn giản nhất

**Bước 1**: Khởi tạo

```bash
# tbears init [project_name] [main_class_name]
tbears init hello HelloWorld
```
Trong folder `hello` mới tạo ra, chúng ta sẽ thấy 3 file
- `__init.py__`:  Ban đầu rỗng, file này giúp trình thông dịch Python nhận folder này như 1 package.
- `hello.py`: FIle chính, chứa logic của contract
- `package.json`: File này gồm các thông tin cơ bản của contract như version, name, ...

```js
// package.json
{
	"version": "0.0.1",
	"main_module": "hello_world",
	"main_score": "HelloWorld"
}
```

```python
# hello-world.py
from iconservice import *

TAG = 'HelloWorld'

# class HelloWorld kế thừa class IconScoreBase của thư viện iconservice
class HelloWorld(IconScoreBase):
	# Hàm __init__ là hàm constructor của class, được gọi khi nào contract được deploy mới 
	def __init__(self, db: IconScoreDatabase) -> None:
	  super().__init__(db)
     
	# Hàm on_install chỉ được gọi 1 lần khi deploy contract lần đầu
	# Khi contract được update thì nó không được gọi lại nữa
	def on_install(self) -> None:
	  super().on_install()
      
	# Hàm on_update được gọi khi contract được update 
	def on_update(self) -> None:
	  super().on_update()
      
	# Hàm hello sẽ trả về thông điệp "Hello" bất cứ khi nào được gọi
	@external(readonly=True)
	def hello(self) -> str:
	  Logger.debug(f 'Hello, world!', TAG)
	  return "Hello"
```

### Implement Token

**ICON** hỗ trợ implement nhiều chuẩn token khác nhau (có tham khảo từ các chuẩn ERC của Ethereum), các chuẩn token của **ICON** được gọi được định nghĩa tại [đây](https://github.com/icon-project/IIPs/blob/master/IIPS)

Ở ví dụ này, chúng ta sẽ thử implement chuẩn token **IRC-2** là dạng Fungibles Token (IRC-2 được tham khảo từ 2 chuẩn ERC-20 và ERC-223 của Ethereum).  Định nghĩa về chuẩn **IRC-2** các bạn có thể tham khảo ở [đây](https://github.com/icon-project/IIPs/blob/master/IIPS/iip-2.md)

```bash
tbears init sample-token SampleToken
``

```py
# sample_token.py
from iconservice import *

TAG = 'SampleToken'

## Định nghĩa interface theo chuẩn IRC-2
class TokenStandard:
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass

    @abstractmethod
    def decimals(self) -> int:
        pass

    @abstractmethod
    def totalSupply(self) -> int:
        pass

    @abstractmethod
    def balanceOf(self, _owner: Address) -> int:
        pass

    @abstractmethod
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        pass


# Định nghĩa Interface TokenFallbackInterface
# Hàm tokenFallback được gọi khi có 1 lượng token được gửi vào địa chỉ contract (tương tự như fallback function xử lý việc nhận ICX)
class TokenFallbackInterface(InterfaceScore):
    @interface
    def tokenFallback(self, _from: Address, _value: int, _data: bytes):
        pass

# Implement
class SampleToken(IconScoreBase, TokenStandard):

    _BALANCES = 'balances'
    _TOTAL_SUPPLY = 'total_supply'
    _DECIMALS = 'decimals'
    
    # Event được emit khi hàm _transfer được gọi
    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):
        pass
    
    # Định nghĩa các biến cần lưu trữ trong contract
    # `_total_supply` dạng int (Tổng số token được tạo ra)
    # `_decimals` dạng int, dùng để tính toán ra `_total_supply`
    # `_balances` dạng (key => value) lưu số dư token của các tài khoản
    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._total_supply = VarDB(self._TOTAL_SUPPLY, db, value_type=int)
        self._decimals = VarDB(self._DECIMALS, db, value_type=int)
        self._balances = DictDB(self._BALANCES, db, value_type=int)
    
    # Tính toán số lượng token phát hành
    # Tất cả lượng token ban đầu được nắm giữ bởi địa chỉ deploy contract
    def on_install(self, _initialSupply: int, _decimals: int) -> None:
        super().on_install()

        if _initialSupply < 0:
            revert("Initial supply cannot be less than zero")

        if _decimals < 0:
            revert("Decimals cannot be less than zero")

        total_supply = _initialSupply * 10 ** _decimals
        Logger.debug(f'on_install: total_supply={total_supply}', TAG)

        self._total_supply.set(total_supply)
        self._decimals.set(_decimals)
        self._balances[self.msg.sender] = total_supply

    def on_update(self) -> None:
        super().on_update()
    
    # Tên của token
    @external(readonly=True)
    def name(self) -> str:
        return "SampleToken"
    
    # Ký hiệu của token
    @external(readonly=True)
    def symbol(self) -> str:
        return "ST"

    @external(readonly=True)
    def decimals(self) -> int:
        return self._decimals.get()

    @external(readonly=True)
    def totalSupply(self) -> int:
        return self._total_supply.get()
    
    # truy vấn số dư của địa chỉ
    @external(readonly=True)
    def balanceOf(self, _owner: Address) -> int:
        return self._balances[_owner]

    @external
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        if _data is None:
            _data = b'None'
        self._transfer(self.msg.sender, _to, _value, _data)
    
    # Chuyển tokne từ `_from` sang `_to`
    def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):

        # Nếu giá trị âm hoặc địa chỉ gửi không đủ số dư thì giao dịch sẽ bị revert
        if _value < 0:
            revert("Transferring value cannot be less than zero")
        if self._balances[_from] < _value:
            revert("Out of balance")

        self._balances[_from] = self._balances[_from] - _value
        self._balances[_to] = self._balances[_to] + _value
        
          # Nếu địa chỉ đích là 1 contract thì sẽ gọi đến hàm tokenFallback
        if _to.is_contract:
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)

        # Emits an event log `Transfer`
        self.Transfer(_from, _to, _value, _data)
        Logger.debug(f'Transfer({_from}, {_to}, {_value}, {_data})', TAG)
```

### Deploy

Contract đã xong xuôi, bây giờ chúng ta cùng tìm hiểu các deploy chúng lên mạng testnet 
**Yeouido** với tools tbears.

**B1**: Tạo file config deploy

deploy_hello.json
```json
{
  "uri": "https://bicon.net.solidwallet.io/api/v3",
  "nid": "0x3",
  "keyStore": null,
  "from": "ĐỊA CHỈ CỦA BẠN",
  "to": "cx0000000000000000000000000000000000000000",
  "stepLimit": "0x5a000000",
  "deploy": {
    "contentType": "tbears",
    "mode": "install"
  },
  "txresult": {},
  "transfer": {}
}
```

deploy_sample_token.json
```json
{
  "uri": "https://bicon.net.solidwallet.io/api/v3",
  "nid": "0x3",
  "keyStore": null,
  "from": "ĐỊA CHỈ CỦA BẠN",
  "to": "cx0000000000000000000000000000000000000000",
  "stepLimit": "0x5a000000",
  "deploy": {
    "contentType": "tbears",
    "mode": "install",
    "scoreParams": {
      "_decimals": "0x12",
      "_initialSupply": "0x3e8"
    }
  },
  "txresult": {},
  "transfer": {}
}
```

Hàm `on_install` trong contract `SampleToken` cần truyền 2 đối số để `_decimals` và `_initialSupply` để thực thi.

**B2**: Tạo ví

Chúng ta cài đặt extension **ICONex** (ví giống như Metamask) để tạo địa chỉ trên mạng **ICON**. Với trình duyệt Chrome, các bạn có thể tại tại [đây](https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel?hl=en)

![](https://images.viblo.asia/864ceb74-372f-489d-8f85-dd962d6e1bb5.png)

Ấn vào phần tạo ví mới, các bạn sẽ tải file keystore và về đổi đuôi thành file json, chẳng hạn như `keystore.json`.

**B3**: Deploy lên testnet vơi tbears

Thư mục hiện tại chúng ta có

```bash
/hello
/sample-token
deploy-hello.json
deploy_sample_token.json
keystore.json
```

Trước khi deploy chúng ta cần faucet **ICX** cho tài khoản trên testnet tại
- https://faucet.sharpn.tech
- http://icon-faucet.ibriz.ai
- https://faucet.reliantnode.com/

```bash
tbears deploy hello -k keystore.json -c deploy-hello.json
tbears deploy sample-token -k keystore.json -c deploy-sample_token.json
```

Transaction hash sẽ được trả về sau khi deploy, chúng ta có thể kiểm tra giao dịch có thành công hay không cũng như địa chỉ của contract trên trang [bicon.tracker.solidwallet.io](https://bicon.tracker.solidwallet.io/)

## 4. ICON SDK (Javascript SDK)

Mỗi node **ICON** đều cung cấp các API JSON-RPC. Để tương tác với một node ICON, chúng ta có thể gửi yêu cầu **JSON-RPC** thô hoặc sử dụng ICON SDK bằng nhiều ngôn ngữ khác nhau. ICON chính thức hỗ trợ Java, Python, JavaScript và Swift. Trong khuôn khổ bài viết, chúng ta sẽ chỉ tìm hiểu qua về 1 loại SDK đó là Javascript SDK.

![](https://images.viblo.asia/0b950d24-0c30-44fe-89e4-c6c92cc99b62.png)


### Cài đặt

 Javascript SDK được tích hợp trong 1 package node.js, giúp chúng ta dễ dàng cài đặt và sử dụng
 
 Cài đặt qua npm
 ```bash
 npm install --save icon-sdk-js
 ```
 
 Hoặc link CDN
 ```js
<script src="https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@latest/build/icon-sdk-js.web.min.js"></script>
 ```
 
 ### Dùng SDK tương tác với contract đã deploy
 
 Tạo thư mục sdk và tạo biến môi trường
 ```
 mkdir sdk
 cd sdk
 touch .env
 ```
 
 ```py
 # .env
API_ENPOINT='https://bicon.net.solidwallet.io/api/v3'
PRIVATE_KEY='PRIVATE KEY ĐỊA CHỈ CỦA BẠN'
ADDRESS_CONTRACT_SAMPLE_TOKEN='ĐỊA CHRI CONTRACT SAMPLE TOKEN ĐÃ DEPLOY'
OWNER='ĐỊA CHỈ DÙNG ĐỂ DEPLOY'
 ```
 
 #### Với các hàm readonly, khi gọi không cần phải ký giao dịch gì cả
 
 ```js
 // getBalance.js
const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;

// Kết nối đến mạng testnet
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const instanceContract = process.env.ADDRESS_CONTRACT_SAMPLE_TOKEN;
let account = owner;

if (argv.address) {
  account = argv.address;
}

async function getBalance() {
  try {
     // class CallBuilder dùng để build thành các transaction object chuyên gọi các hàm read-only
     // https://link.sun-asterisk.vn/FPM4jf 
    const txObj = new CallBuilder()
      .from(owner)
      .to(instanceContract)
      .method('balanceOf')
      .params({
        _owner: account,
      })
      .build();

    let balance = await iconService.call(txObj).execute();
    balance = parseInt(balance);
    console.log({ balance });
    return balance;
  } catch (err) {
    console.log({ err });
  }
}

getBalance(); 
 ```
 
 #### Với những hàm khác, khi gọi qua SDK chúng ta cần thực hiện thao tác ký
 
 ```js
 // transfer.js
 const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

// Import private key cảu account vào wallet, dùng cho việc ký giao dịch
const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const instanceContract = process.env.ADDRESS_CONTRACT_SAMPLE_TOKEN;
const to = argv.to;
const value = parseInt(argv.value);

async function transfer() {
  try {
  // Class CallTransactionBuilder dùng để build các giao dịch gọi đến các hàm thay đổi trạng thái của blockchain
  // Hàm transfer nhận vào 2 params là `_to` và `_value`
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(instanceContract)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber('1'))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('transfer')
      .params({
        _to: to,
        _value: IconConverter.toHex(value),
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

transfer();
 ```
 
 Chạy:
 
 ```bash
 node getBalance --address=<tài khoản bạn cần truy vấn số dư token>
 node transfer --to=<địa chỉ nhận token> --value=
 ```

**Chú thích**: Để tìm hiểu các năng của thể của các module ở trong Javascript SDK, các bạn có thể tham khảo ở trên [Github](https://github.com/icon-project/icon-sdk-js)

## Tài liệu tham khảo

[ICON Documentation](https://www.icondev.io/docs)