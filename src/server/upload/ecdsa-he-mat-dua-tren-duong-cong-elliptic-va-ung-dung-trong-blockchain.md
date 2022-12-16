## Intro

ECDSA là viết tắt của Elliptic Curve Digital Signature Algorithm - thuật toán sinh _chữ ký số_ dựa trên đường cong Elliptic.

ECDSA được sử dụng để tạo chữ kí số cho dữ liệu, giúp chống lại sự giả mạo cũng như làm sai lệch dữ liệu, cung cấp một phương pháp xác thực mà không ảnh hưởng đến tính bảo mật của dữ liệu gốc.

ECDSA được ứng dụng rộng rãi trong rất nhiều lĩnh vực cần tính bảo mật và sự riêng tư dữ liệu, đặc biệt như trong **Blockchain**.

Trong bài viết này mình sẽ trình bày tổng quan về ECDSA nói chung và ứng dụng của nó trong **Blockchain** nói riêng.

## Tại sao lại sử dụng ECDSA?

ECDSA là thuật toán mã hoá **bất đối xứng**.

Nó khác với các mã hoá **đối xứng** khác như AES, ta có một key duy nhất để mã hoá dữ liệu và giải mã. Nó đồng nghĩa với việc biết key là biết tất cả, và không biết key thì không biết gì.

ECDSA thì khác, nó có một cặp key `private key` và `public key`. `private key` dùng để mã hoá, `public key` dùng để xác nhận (verify) tính đúng đắn của dữ liệu đã được mã hoá này, và chỉ vậy mà thôi. `public key` không thể giải mã được dữ liệu đã được mã hoá, do đó dữ liệu gốc luôn luôn được an toàn.

Tại sao lại sử dụng mã hoá bất đối xứng ? Sự hữu ích của nó thể hiện ở việc nó có thể tạo ra được **chữ ký số**. Với mỗi văn bản, hay giao dịch, hay dữ liệu bất kì, ta có thể tạo ra được một dữ liệu **kèm chữ ký**. Chữ ký này chỉ có thể được tạo ra bởi người có thông tin về khoá bí mật, và bất cứ ai cũng có thể tiếp cận được khoá công khai để có thể _xác minh_ chữ ký này. Thuộc tính hữu ích này của mật mã bất đối xứng cho phép bất cứ ai cũng có thể xác minh mọi chữ ký trên mọi giao dịch, trong khi vẫn đảm bảo rằng chỉ những chủ sở hữu khoá bí mật mới có thể tạo ra được chữ ký hợp lệ.

## Khoá bí mật và khoá công khai

### Khoá bí mật

Một khoá bí mật - `private key` chỉ đơn thuần là một con số được chọn ra ngẫu nhiên.

Đúng như cái tên của nó, `private key` cần được giữ bí mật, nên việc chọn ra số ngẫu nhiên phải vô cùng an toàn và đảm bảo tính **thực sự ngẫu nhiên** để tránh các cuộc tấn công vét cạn hay các cuộc tấn công khác nhằm lấy được `private key`.

Các bạn có thể tham khảo thêm về việc tạo ra số ngẫu nhiên [tại bài viết này](https://viblo.asia/p/random-co-thuc-su-ngau-nhien-L4x5xg81lBM).

Vì sao `private key` lại quan trọng ? vì nó tạo ra **chữ ký**, và chứng minh rằng dữ liệu, hay tài sản thuộc về quyền sở hữu của người có private key.

Chính vì vậy việc bảo vệ private key là vô cùng quan trọng. Tuyệt đối không chia sẻ private key cho ai khác, và hãy giữ private key ở một nơi an toàn, vì một khi mất đi sẽ không thể khôi phục lại được, đồng nghĩa với việc ta có thể sẽ mất đi toàn bộ quyền chứng thực với dữ liệu hay tài sản của ta.

### Khoá công khai

Khác với `private key`, `public key` được công khai cho tất cả mọi người.

`public key` được tạo ra bởi **phép nhân** với `private key` trong **đường cong Elliptic**, ta sẽ nói rõ hơn ở phần tiếp theo.

Phép nhân đường cong Elliptic là một phép toán **trap door** (cửa lật), có nghĩa là nó dễ tính theo một chiều (phép nhân) và không thể tính được theo chiều ngược lại (phép chia).

Do đó người sở hữu private key có thể dễ dàng tạo ra khoá công khai và yên tâm chia sẻ với mọi người mà không lo lắng rằng ai đó có thể đảo ngược `public key` để chiếm lấy `private key` của mình.

Lý thuyết này tạo nên nên tảng cho các chữ ký số an toàn và không thể làm giả, ví dụ được dùng để chứng minh quyền sở hữu đối với Bitcoin hay Ethereum trên các mạng blockchain.

## Đường cong Elliptic

### Công thức

Công thức của đường cong Elliptic là:

$y^2 \pmod p = x^3 + ax + b \pmod p$

Bitcoin hay Ethereum sử dụng một đường cong theo tiêu chuẩn [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) do _Viện Tiêu Chuẩn và Kỹ Thuật Quốc Gia Mỹ_ (NIST) đặt ra.

Đường cong này có công thức như sau:

$y^2 \pmod p = x^3 + 7 \pmod p$

với `p` là một số nguyên tố rất lớn, $p = 2^{265} - 2^{32} - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1$.

Hình dưới minh hoạ đường cong elliptic được sử dụng trong Bitcoin & Ethereum.

![](https://images.viblo.asia/1cf96f25-f0c8-404e-9779-191e690635ad.png)

### Các phép toán trên đường cong Elliptic

Có 2 phép toán quan trọng trên đường cong Elliptic: **phép cộng** và **phép nhân**

#### Phép cộng

Đường cong Elliptic có một tính chất: "Nếu hai điểm P và Q nằm trên đường cong, thì điểm P+Q cũng sẽ nằm trên đường cong".

Điểm này được xác định như sau:

- Vẽ đường thẳng nối 2 điểm P và Q, đường thẳng này sẽ cắt đường cong tại một điểm nữa
- Lấy đối xứng của điểm này qua trục hoành, ta sẽ có được P+Q

Hình dưới mô tả phép cộng được tiến hành trong đường cong Elliptic thế nào:

![](https://images.viblo.asia/6ffd1c4c-0dd0-4706-9786-fd4c57f389f1.png)

> Nếu 3 điểm trên đường cong Elliptic là thẳng hàng, thì tổng của chúng bằng 0.

#### Phép nhân

Trên đường cong Elliptic, việc nhân một điểm với một hằng số không đơn thuần chỉ là lấy từng toạ độ rồi nhân là xong.

Thực chất, phép nhân ở đây vẫn là _phép cộng_, nhưng thực hiện nhiều lần mà thôi.

Ví dụ trong phép toán tính `3P`, đầu tiên ta sẽ tính `2P` bằng cách tính `P+P`.

Theo cách cộng ở bên trên, ta vẽ đường thẳng nối P và P, ở đây chính là _tiếp tuyến_ của đường cong, nó cắt đường cong tại điểm `-2P`, lấy đối xứng qua trục hoành ta có `2P`.

Tiếp tục vẽ đường thẳng nối giữa `2P` và `P`, cắt đường cong tại `-3P`, lấy đối xứng ta có `3P`.

Hình dưới mô tả phép nhân được tiến hành trong đường cong Elliptic thế nào:

![](https://images.viblo.asia/74922af4-2b28-4bc8-8f3a-2eba374617d6.png)

Do cách tính toán trên, ta có thể dễ dàng tính toán được phép nhân `k*P` khi biết `k` và `P`, nhưng hoàn toàn không thể tính toán được theo chiều ngược lại, tức phép chia. Đó cũng chính là tính chất đặc trưng thú vị của mã hoá bất đối xứng.

### Tạo public key

Ta đã có một `private key` là một số ngẫu nhiên $d_{A}$.

Trên đường cong Elliptic ta chọn một điểm **G**, gọi là _điểm sinh_ (generator point hay reference point).

Public key $Q_A$ được sinh ra bằng kết quả của phép nhân:

$Q_A = d_A \times G$

với Bitcoin hay Ethereum thì:

```js
G = 04 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798 483ADA77 26A3C465 5DA4FBFC 0E1108A8 FD17B448 A6855419 9C47D08F FB10D4B8
```

theo tiêu chuẩn [secp256k1](https://en.bitcoin.it/wiki/Secp256k1).

Tất nhiên $Q_A$ cũng sẽ là một điểm trên đường cong Elliptic.

Mối quan hệ giữa $d_{A}$ và $Q_A$ là cố định, và chỉ tính được theo một chiều từ $d_{A}$ đến $Q_A$ . Đó là lý do tại sao ta có thể sinh ra khoá công khai từ khoá bí mật và có thể chia sẻ khoá công khai này với tất cả mọi người, mà không thể dùng khoá công khai để tìm ngược lại về khoá bí mật.

## ECDSA - Chữ ký số dựa trên đường cong Elliptic

Ta đã nắm được lý thuyết về đường cong Elliptic, private key, public key, trong phần này ta sẽ tìm hiểu một file/message được ký như thế nào trong Ethereum và nó tạo ra chữ ký số trông ra sao.

### Tạo chữ ký

> Chữ ký trong Ethereum sẽ được biểu diễn bởi một cặp `(r, s)`.

Để tạo ra cặp `(r, s)` này đầu tiên ra sẽ phải chọn ra một số ngẫu nhiên `k` (lưu ý đây là một số ngẫu nhiên khác với private key).

Sau đó nhân `k` với điểm sinh `G` giống như phép toán ta dùng để tạo ra pubic key bên trên:

$P = k \times G$

khi này ta có được một điểm `P(x, y)`, toạ độ `x` của `P` chính là giá trị `r`.

Để tính được `s`, đầu tiên ta tính _hash của message_ mà ta cần ký, gọi là `z` (trong Ethereum thì hàm hash là `Keccak256`), khi này:

$s = k^{-1}(z + d_A \times r) \pmod p$

Ta lưu ý ở đây $k^{-1}$ là **nghịch đảo theo modulo** của `k`, xem thêm tại ([modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse)) chứ không phải nghịch đảo đơn thuần trong tính toán thập phân là $\frac{1}{k}$.

Nếu trong tính toán thập phân $k\times \frac{1}{k} = 1$ thì theo modulo $k \times k^{-1} \equiv 1 \pmod m$.

Ví dụ nghịch đảo của 2 trong tính toán thập phân là $\frac{1}{2}$ vì $2\times \frac{1}{2} = 1$. Nhưng nghịch đảo theo modulo 5 của 2 sẽ là 3 vì $2 \times 3 = 6 \equiv 1 \pmod 5$. Vậy $2^{-1} = 3 \pmod 5$.

### Verify chữ ký

Để xác minh tính hợp lệ của chữ ký, ta chỉ cần public key $Q_A$ là đủ.

Bằng cách tính:

$P = s^{-1} \times z \times G + s^{-1} \times r \times Q_A$

Nếu toạ độ x của `P` bằng `r`, có nghĩa là chữ ký là hợp lệ.

Ta sẽ chứng minh điều này như sau:

$P = s^{-1} \times z \times G + s^{-1} \times r \times Q_A$

mà $Q_A = d_A \times G$

nên $P = (z + r \times d_A) \times s^{-1} \times G$

mà ta có $s = k^{-1}(z + d_A \times r)$

suy ra $P = (z + r \times d_A) \times (z + r \times d_A)^{-1} \times (k^{-1})^{-1} \times G$

$\Leftrightarrow P = k \times G$

Đây chính là công thức mà ta dùng để tính là P khi tạo ra chữ ký, vậy ta có điều phải chứng minh.

## Ứng dụng trong Ethereum

Trong Ethereum (Bitcoin cũng tương tự) thì đường cong Elliptic được ứng dụng trong 2 việc:

- Tạo ra địa chỉ ví
- Tạo chữ ký cho giao dịch

Trong phần này ta sẽ sử dụng code để lược bớt sự phức tạp của tính toán.

### Tạo ra địa chỉ ví

Từ một private key, một địa chỉ ví Ethereum được tạo ra như sau

- tạo public key từ private key giống như bên trên ta đã trình bày.
- tính hash của public key và lấy 20 bytes cuối cùng làm địa chỉ, hàm hash ở đây là `Keccak256`

ví dụ ta có một private key:

```js
dA = f8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315
```

bằng phép nhân đường cong Elliptic, ta tính được public key là một điểm $Q_A = (x, y)$ với

```js
x = 6e145ccef1033dea239875dd00dfb4fee6e3348b84985c92f103444683bae07b
y = 83b5c38e5e2b0c8529d7fa3f64d46daa1ece2d9ac14cab9477d042c84c32ccd0
```

ghép vào ta sẽ có một public key

```js
QA = 0x6e145ccef1033dea239875dd00dfb4fee6e3348b84985c92f103444683bae07b83b5c38e5e2b0c8529d7fa3f64d46daa1ece2d9ac14cab9477d042c84c32ccd0
```

tiến hành hash public key, ta được

```js
Keccak256(QA) = 2a5bc342ed616b5ba5732269001d3f1ef827552ae1114027bd3ecf1f086ba0f9
```

Lấy 20 bytes cuối cùng ta sẽ được địa chỉ ví chính là `0x001d3f1ef827552ae1114027bd3ecf1f086ba0f9`

Code:

```js
var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

const privateKeyBuffer = EthUtil.toBuffer(
  '0xf8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315'
);
const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

const publicKey = wallet.getPublicKeyString();
console.log({ publicKey });
const address = wallet.getAddressString();
console.log({ address });
```

### Ký giao dịch

Một raw transaction trong Ethereum sẽ trông như sau:

```js
{
  from: '0x937CDc3a7273269Fe43967E785D9e24D3C48C164',
  gas: '0x3d0900',
  gasPrice: 10000000000,
  hash: '0x228c53215e5ad0f9d6114a4f4adeb8e5359fbee1283aacb7fedb2ab1b212871b',
  data: '0x60fe47b10000000000000000000000000000000000000000000000000000000000000003',
  nonce: 34,
  to: '0x6b4A7a46ad065b5fb142DEe92E9F4546982510fD',
  value: '0x',
}
```

Ta sẽ tiến hành ký với private key như sau:

```js
let tx = new EthereumTx(rawTx);
console.log('mess: ', tx.hash(false).toString('hex'));
tx.sign(privateKey);
let serializedTx = tx.serialize();
await web3.eth
  .sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('transactionHash', (hash) => {
    console.log('tx hash: ', hash);
  })
  .on('receipt', (receipt) => {
    console.log('tx successfull');
  })
  .on('error', (err) => {
    console.log('wrong ', err);
  });
```

khi này ta sẽ được một transaction đã ký và sẵn sàng broadcast lên mạng rồi:

```js
{
  blockHash: '0x7905dc70c9a0196fd2a1999568506026e5e4027c7fac88fd3b841df213c7918d',
  blockNumber: 7719658,
  from: '0x937CDc3a7273269Fe43967E785D9e24D3C48C164',
  gas: '0x3d0900',
  gasPrice: '10000000000',
  hash: '0x228c53215e5ad0f9d6114a4f4adeb8e5359fbee1283aacb7fedb2ab1b212871b',
  input: '0x60fe47b10000000000000000000000000000000000000000000000000000000000000003',
  nonce: 34,
  r: '0x3dee14909e26ec8758cca4b386ec582cac5100767776454eec94343ac6f2de46',
  s: '0x68869c7b5e4b4caa6b602e29f0787ae70a37833cc681c9463b139f30a2fe5de5',
  to: '0x6b4A7a46ad065b5fb142DEe92E9F4546982510fD',
  transactionIndex: 2,
  v: '0x29',
  value: '0',
};
```

ta có thể để ý ở đây raw transaction cũ đã được thêm các trường `r` và `s`, đây chính là chữ ký số của giao dịch.

Bằng chữ ký này ta có thể xác nhận được rằng đây là giao dịch được ký bởi địa chỉ `0x937CDc3a7273269Fe43967E785D9e24D3C48C164`.

Trên thực tế khi tương tác với các Dapp thì ta thường sử dụng Metamask hay các ứng dụng ví đã được lập trình sẵn các hàm trên rồi, điều này giúp cho người dùng có thể dễ dàng tiếp cận với ứng dụng mà không cần hiểu quá rõ về key, địa chỉ cũng như chữ ký số. Chỉ đơn giản bấm _OK_ hay _Cancel_ là đủ rồi.

## Kết luận

Hi vọng bài viết có thể giúp cho chúng ta hiểu thêm về ECDSA cũng như những ứng dụng của nó trong blockchain, mà cụ thể ở đây là Ethereum và Bitcoin.

Và hãy luôn giữ `private key` của mình an toàn nhé :smile:

## Tham khảo

- https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
- https://www.instructables.com/id/Understanding-how-ECDSA-protects-your-data/
- https://www.instructables.com/id/Understanding-how-ECDSA-protects-your-data/
- https://www.maximintegrated.com/en/design/technical-documents/tutorials/5/5767.html
- https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages