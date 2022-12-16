![](https://images.viblo.asia/84963846-e57b-47f5-b368-d41ca186520a.jpg)

Cay cú vì bị mất mnemonic của tài khoản ethereum cũng như bị ăn cắp một lượng token không nhỏ (xin phép không tiết lộ con số :zipper_mouth_face: ). Tôi quyết định trả thù đời bằng cách thử đi brute force mnemonic trên mạng ethereum mainnet, kiếm lại số vốn liếng đã mất :triumph:

![](https://images.viblo.asia/1ffb1b00-f85a-4bb6-887f-d3eb7abe8922.jpg)


## 1. Giới thiệu

**Mnemonic** trong [HD Wallet](https://viblo.asia/p/hdwallet-la-gi-goc-nhin-cong-nghe-63vKjD1bl2R) là một danh sách các từ được sắp xếp theo thứ tự với độ dài tiêu chuẩn từ 12 đến 24 words. Chuẩn được dùng phổ biến để tạo **mnemonic** là chuẩn [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) được sử dụng trong các ví Bitcoin, Ethereum, v..v. Chuẩn [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) hỗ trợ tạo mnemonic dưới nhiều ngôn ngữ khác nhau như Tiếng Anh, Tiếng Pháp, Tiếng Italy, Tiếng Nhật, Tiếng Trung giản thể, Tiếng Trung phổn thể, Tiếng Hàn. Ví dụ về một đoạn mnemonic: `army van defense carry jealous true garbage claim echo media make crunch`.

### Mnemonic được tạo ra như thế nào ?

Đầu tiên ví HD cần tạo một chuỗi nhị phân **entropy**, độ dài của **entropy** phụ thuộc vào độ dài **mnemonic** cần tạo, bên dưới là bảng thể hiện mối quan hệ giữa độ dài **entropy** và **mnemonic** tương ứng. Ở phần này chúng ta sẽ mô tả cách tạo **mnemonic** với độ dài 12 từ, quá trình tạo ra các **mnemomic** dài hơn cũng diễn ra tương tự.

![](https://images.viblo.asia/4192b592-312a-4ee8-a2d1-54807cac71d6.png)

*Ví dụ*: Entropy `01110110010110011000101011101011110010101001111010100011011000110000000111101101010010011010101000110011100001110110110010100110` dài 128 bits để tạo ra mnemonic dài 12 từ.

TIếp theo:
- B1: Băm **entropy** với hàm SHA-256, lấy 4 bit đầu của hàm băm gán thêm vào entropy => entropy mới dài **132 bit**
- B2: Chia **entropy** thành 12 phần, mỗi phần dài **11 bit**
- B3: Mỗi phần khi chuyển sang hệ thập phân sẽ tương ứng với thứ tự các từ trong từ điển của chuẩn BIP39. `11111111111` bằng 2047 tương ứng với từ `zoo`, từ thứ 2048 của từ điển tiếng anh trong BIP39.

![](https://images.viblo.asia/75e52bc2-1e14-43ae-97b5-422f69479984.png)

### Từ Mnemonic tạo ra các tài khoản như thế nào ?

Với **mnemomic** thu được ở bước trên, chúng ta tiếp tục tìm hiểu quá trình tạo ra **seed** (dài 512 bit).

- B1: Cụm **mnemonic** sẽ được cộng với 1 chuỗi **salt** (bắt đầu bằng từ "mnemonic" cộng thêm 1 chuỗi **passphare** tùy ý). Chức năng của **salt** tăng độ khó trước các cuộc tấn công từ điển hay vét cạn.
- B2: Băm chuỗi gồm **mnemonic** và **salt** với thuật toán [HMAC-SHA512](https://en.wikipedia.org/wiki/HMAC) 2048 lần.
- B3: Kết quả cuối cùng thu được **seed** dài 512 bit.

![](https://images.viblo.asia/987feccb-494c-41ea-b1b1-4c74ea4dbc44.png)

Tiếp theo:
- Từ **seed** đã có, băm tiếp bằng [HMAC-SHA512](https://en.wikipedia.org/wiki/HMAC).
- Lấy 256 bit đầu làm **Master Private Key**, 256 bit sau làm **Master Chaincode**.
- Từ **Master Private Key** sinh ra **Master Public Key** dựa theo thuật toán [ECDSA](https://viblo.asia/p/ecdsa-he-mat-dua-tren-duong-cong-elliptic-va-ung-dung-trong-blockchain-XL6lA4oDZek)
![](https://images.viblo.asia/5fd11f69-7313-4452-a924-b610c05c7089.png)

Quá trình tạo khóa con:
- Băm **Master Public Key**, **Master Chaincode** cộng thêm số thứ tự độ dài **32 bit**  với [HMAC-SHA512](https://en.wikipedia.org/wiki/HMAC) (số thứ tự sau này dùng để phân biệt thứ tự các khóa con tạo ra). Vậy 1 khóa mẹ có thể có $\def\foo{2^{32}} \foo$ tức hơn 4 tỷ khóa con.
- Lấy 256 bit đầu làm **private key**, 256 bit sau làm **chain code**
- **private key** con sinh ra **public key** con bằng thuật toán [ECDSA](https://viblo.asia/p/ecdsa-he-mat-dua-tren-duong-cong-elliptic-va-ung-dung-trong-blockchain-XL6lA4oDZek).
![](https://images.viblo.asia/6f684772-7b9e-4586-9603-b859fde165e4.png)

Cứ tiếp tục như vậy, khóa mẹ đẻ khóa con thành một cây phân nhánh. Số tài khoản mà ví HD có thể tạo ra là **vô hạn** :dizzy_face: 
![](https://images.viblo.asia/d1373594-9239-4aa3-a65c-ce6df98bb340.png)

Chi tiết hơn về cách HD Wallet sinh tài khoản, các bạn có thể tham khảo thêm bài viết [HDWallet là gì ? Góc nhìn công nghệ
](https://viblo.asia/p/hdwallet-la-gi-goc-nhin-cong-nghe-63vKjD1bl2R) của tác giả @dohoang.

## 2. Khối lượng tính toán cần brute force

### Brute force tất cả

Do số tài khoản sinh ra từ mỗi mnemonic của HD wallet là vô hạn nên việc đi brute force tất cả là bất khả thi. 

> Lấy cái hữu hạn mà theo đuổi cái vô hạn thì ngu ngơ quá thay ! - Trang Tử

### Giải pháp giảm khối lượng tính toán

Tuy số lượng khóa của thể sinh ra từ 1 mnemomic của HD wallet là vô hạn, nhưng thực tế thì liệu có mấy ai dùng đến tài khoản thứ 1000 ? Cá nhân chúng tôi cho rằng gần như không có, nếu có thì cũng rất hiếm. Do vậy, với giả thuyết trên, ta đã giảm được 1 lượng lớn khối lượng cần tính toán.

Hơn nữa, từ điển tiếng anh để tạo mnemonic được dùng rất phổ biến. Như ví [Metamask](https://metamask.io/) rất phổ biến cũng chỉ hỗ trợ mnemonic dạng tiếng Anh cho người dùng.

### TÍnh toán

#### Số mnemonic có thể tạo ra bẳng chỉnh hợp chập 12 của 2048: $\frac{n!}{(n - k)!} = \frac{2048!}{(2048 - 12)!}$

Chúng ta sẽ sử dụng python3 để tính toán

```python
import math 

countMnemonic = math.factorial(2048) / math.factorial(2048 - 12)
print (countMnemonic) 
# Kết quả: 5.2715379713014884e+39
```

Chuyển sang dạng lũy thừa của 2:

```python
print(math.log(countMnemonic, 2))
# Kết quả: 131.95341963018637
```

Kết quả xấp xỉ $\def\foo{2^{132}} \foo$ :confused:

### Tính toán thời gian brute force

#### Với máy tính cá nhân

Với máy tính mà người viết đang sử dụng, ram 8GB, SSD 240GB, bộ vi xử lý từ đời Tống Intel Haswell i5-4460. Thì tốc độ chạy một chương trình JS đơn giản nhất (code brute force sẽ viết bằng JS) mất trung bình **0.1ms** tức $\def\foo{10^{-4}} \foo$ s

```js
// Trung bình chạy mất 0.1ms
console.time();
console.timeEnd();
```

Giả dụ như thời gian tính toán xong 1 mnemonic bằng 0.1ms thì thời gian cần để vét cạn hết tất cả mnemonic là:
$\def\foo{10^{-4}} \foo$ * $\def\foo{2^{132}} \foo$

```python
print((10 ** -4) * (2 ** 132))
# Kết quả 5.444517870735016e+35 (s)
```

Quy đổi ra năm:

```python
print(5.444517870735016e+35 / (3600 * 24 * 365))
# 1.7264452913289623e+28 năm
print(math.log(1.7264452913289623e+28, 2))
# 93.80179127474499
```

Vậy xấp xỉ $\def\foo{2^{93}} \foo$ năm thì cái máy tính của tôi mới vét hết được số lượng mnemonic kể trên :scream:

Thử so sánh vui một chút với tuổi vũ trụ (được ước tỉnh khoảng 14 tỷ năm)

```python
print((2 ** 93) / (14000000000))
# 1.233175208092116e+18
print(math.log(1.233175208092116e+18, 2))
# 60.09708349870112
```

Gấp $\def\foo{2^{60}} \foo$ lần tuổi của vũ trụ ạ :nauseated_face:

#### Siêu máy tính mạnh nhất thế giới

Siêu máy tính [IBM Submit](https://en.wikipedia.org/wiki/Summit_(supercomputer)) hiện nắm giữ danh hiệu siêu máy tính mạnh nhất thế giới với tốc độ tính toán 200 petaFLOPS (1 petaFLOPS tương đương với **1 triệu tỷ phép tính/giây**). Để brute force mnemonic cần nhiều phép tính nhưng ta cứ thoải mái cho rằng 1 giây thì IBM Submit brute force được 1 triệu tỷ mnemonic.

=> Thời gian ước tính để IBM submit brute force được hết

```python
print((2 ** 132) / (200 * (10 ** 15))
# 2.722258935367508e+22 (s)
# Quy đổi ra năm
print(2.722258935367508e+22 / (3600 * 24 * 365))
# 863222645664481.2
print(math.log(863222645664481.2, 2))
49.61672604120927
```

Vậy xấp xỉ $\def\foo{2^{49}} \foo$ năm, vẫn còn quá to :pensive:

Tính ngược một chút, để xong trong vòng 1 tháng (1/12 năm) thì cần bao nhiêu máy IBM Submit :thinking:

```python
yearToSecond = (1 / 12) * (3600 * 24 * 365)
print((2 ** 132) / yearToSecond)

# 2.0717343495947547e+33

print(math.log(2.0717343495947547e+33, 2))
# 110.67446615501558
```

$\def\foo{2^{110}} \foo$ máy :rofl:

## 3. Coding

Nhiều như thế thì vét cạn làm sao nổi ? Đúng, trừ khi có máy tính lượng tử may ra mới nói đến chuyện brute force hết cái đống menmonic này. Nhưng không may hú họa trúng được 1 cái thì sao ? Nghĩ bụng thôi thì cứ thử xem sao, cũng chẳng mất gì !

### Dùng web3 Provider của Infura

Source code để chạy cũng khá đơn giản, gồm có 1 vài bước sau:
- Kết nối với mạng Ethereum Mainet bằng Provider của [Infura](https://infura.io/). Dùng provider của Infura thì có hạn chế là bị giới hạn request, cần phải trả tiền để nâng cấp.
- Tạo ra 1 menmonic ngẫu nhiên, sử dụng chuẩn **BIP39**
- Lấy tài khoản đầu tiên được tạo ra từ mnemonic (Với suy nghĩ của người viết rằng nhiều người sẽ dùng ngay tài khoản đầu tiên của Metamask).
- Check số dư của tài khoản bằng **web3.js**, nếu số dư lớn hơn 0 thì in ngay ra **mnemonic** và **private key**


```js
// index.js
const { EthHdWallet } = require('eth-hd-wallet');
const Web3 = require('web3');
const bip39 = require('bip39');
const web3 = new Web3('LINK_WEB3_PROVIDER');

async function bruteForce() {
  try {
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);

    let balance = await web3.eth.getBalance(address);
    if (balance > 0) {
      let privateKey = wallet.getPrivateKey(address);
      privateKey = privateKey.toString('hex');
      console.log({mnemonic});
      console.log({ privateKey });
      console.log({ balance });
    }
  } catch (err) {
    console.log(err);
  }
}

bruteForce();
```

Để tự động thì chúng ta viết thêm 1 file bash để chạy.

```bash
#!/bin/bash
for value in {1..10000}
do
node index.js
done
```

### Dùng API của EtherScan

Để dùng được API của Etherscan, các bạn phải đăng ký tài khoản và tạo 1 `API_KEY` để để có thể gọi được. API của Etherscan cũng bị giới hạn, nếu cần nâng cấp cũng phải trả thêm phí.

Các bạn có thể tham khảo các đầu API của Etherscan ở [đây](https://etherscan.io/apis)

```js
const { EthHdWallet } = require('eth-hd-wallet');
const bip39 = require('bip39');
const axios = require('axios');

async function bruteForce() {
  try {
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);

    const apiKey = 'YOUR_API_KEY';

    let response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    );

    let balance = response.data.result;
    if (balance > 0) {
      let privateKey = wallet.getPrivateKey(address);
      privateKey = privateKey.toString('hex');
      console.log({ privateKey });
      console.log({ balance });
    }
  } catch (err) {
    console.log(err);
  }
}

bruteForce();
```

### Dùng JSON RPC

Với Infura Web3 Provider và Etherscan API, điểm hạn chế nhất là bị limit request, chúng ra không thể cắm máy cả ngày để brute force được. Giải pháp ở đây là chúng ta sẽ dùng [JSON RPC](https://viblo.asia/p/json-rpc-khi-khong-con-phai-phu-thuoc-vao-web3-07LKXy4pZV4)

Ta sẽ cần cài thêm package [exec-sh](https://www.npmjs.com/package/exec-sh) để thực thi câu lệnh với JS.

```js
const execShPromise = require('exec-sh').promise;
const bip39 = require('bip39');
const { EthHdWallet } = require('eth-hd-wallet');

async function bruteForce() {
  try {
      // bạn có thể dùng link infura provider ở trên 
     const url = 'YOUR_URL';
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);

    let outPut = await execShPromise(
      `curl -s -X POST --data \'{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["${address}", "latest"], "id":1}\' ${url}`,
      true
    );

    outPut = JSON.parse(outPut.stdout);
    let balance = outPut.result;
    balance = parseInt(balance);
    if (balance > 0) {
      let privateKey = wallet.getPrivateKey(address);
      privateKey = privateKey.toString('hex');
      console.log({ privateKey });
      console.log({ balance });
      console.log({ mnemonic });
    }
  } catch (err) {
    console.log(err);
  }
}

for (let i = 0; i < 100; i++) {
  bruteForce();
}

console.log('Done !');

```

## Kết luận

Việc đi brute force mnemonic cũng như việc mò trăng đáy nước, đâm đầu vào tường. Với không gian khóa và số lượng khổng lồ các khả năng đến cả các siêu máy tính cũng chào thua. Họa chăng với sự phát triển của máy tính lượng tử trong tương lai mới đạt được khả năng tính toán lớn như vậy. Tuy nhiên, nếu bạn là người cực kỳ may mắn, biết đâu chỉ trong một thời gian ngắn chạy tools lại ra được một cái gì đó. Khi đó hãy donate cho người viết 1 ít Ether tại tài khoản `0x19171a5da52276b6a034CB859ddA1e905739F8B2` nhé :laughing:


## Tài liệu tham khảo
[Mastering Bitcoin Chapter 05](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc)

https://en.wikipedia.org/wiki/Summit_(supercomputer)

https://en.wikipedia.org/wiki/FLOPS