![](https://images.viblo.asia/453181bb-345b-4cd1-960b-f9cc3d9253f8.png)

Đối với những game gambling người chơi luôn lo sợ rằng mình sẽ bị lừa hết tiền . Điều này là vô cùng dễ hiểu vì khi chơi casino online mọi kết quả đều có vẻ dễ dàng thay đổi được bằng công nghệ .Chính vì những rủi ro cơ bản như vậy cộng đồng Bitcoin gambling đã có một giải pháp nó gọi là **Provably fair** . Cũng giống như những gì Bitcoin giải quyết , phương thức này không yêu cầu bên thứ ba , nó làm trò chơi trở nên hoàn toàn minh bạch bằng cách sử dụng các phương thức mã hóa nâng cao để đảm bảo rằng kết quả trò chơi hông bị giả mạo . Các dễ dàng nhất để sử dụng là dùng các công cụ Provably fair verifiers cho phép người chơi có thể verify kết quả sau mỗi roll để đảm bảo rằng mình không bị lừa trong quá trình chơi bằng cách nhập các thông tin mà trang web cung cấp và check phần roll results
nói một cách ngắn gọn đây là một cách cho phép người chơi kiểm tra xem một số được tạo có thực sự ngẫu nhiên hay mà ko bị chỉnh sửa theo bất kỳ cách nào.
Các trang Verifiers đc khuyến nghị
* [BetKing verifier](https://dicesites.com/betking/verifier)
* [BetterBets verifier](https://dicesites.com/betterbets/verifier)
* [BitDice.me verifier](https://dicesites.com/bitdiceme/verifier)
* [Bitsler verifier](https://dicesites.com/bitsler/verifier)
* [Crypto-Games.net verifier](https://dicesites.com/crypto-games/verifier)
* [Just-Dice.com verifier](https://dicesites.com/justdice/verifier)
* [Nitrogen Dice verifier](https://dicesites.com/nitrogendice/verifier)
* [Primedice verifier](https://dicesites.com/primedice/verifier)
* [SafeDice verifier](https://dicesites.com/safedice/verifier)

Tuy nhiên chúng ta vẫn cảm thấy có gì đấy sai sai . Để chắc chắn thì chúng ta nên hiểu rõ Provably fair hoạt động như thế nào. Bài viết này mình sẽ cố gắng giải thích một cách rõ ràng nhất về cách thức hoạt động của nó .

## Provably fair hoạt động như thế nào?

Mặc dù có một số cách để triển khai Provablu fair và mình sẽ cố gắng giải thích một cách phổ biến nhất. Với phương pháp này mỗi roll-result sẽ được tính dựa theo các biến sau  :

* Serverseed : Được cung cấp bởi gambling site
* Clientseed : Được cung cấp bởi browser của người dùng hoặc có thể điều chỉnh được bởi người dùng 
* Nonce : Một con số tăng với mỗi lần đặt cược

Người chơi sẽ nhận được encrypted hash của **serverseed** trước khi người chơi bắt đầu gambling và vì thế trang web sẽ ko thể thay đổi nó .Tuy nhiên nó đã được mã hóa bản thân người chơi cũng không thể tính trước được kết quả roll của mình .

Browser của người chơi sẽ tạo ra một **clientseed** ngẫu nhiên hoặc người chơi có thể tự sửa nó . Bằng cách này chắc chắn trang web sẽ không thể biết **clientseed** của ng chơi được

Tiếp theo là **Nonce** được bắt đầu từ 0 hoặc 1 tùy vào trang web và sau mỗi lần đặt cược số Nonce sẽ tăng thêm 1

## Tính toán roll result

Giả sử ta có 
```
Clientseed: ClientSeedForDiceSites.com
Serverseed unhashed: 293d5d2ddd365f54759283a8097ab2640cbe6f8864adc2b1b31e65c14c999f04
Serverseed hashed: 5ac59780d512265230d5efb3cc238886dc1b457a80b54fbf1f920b99c6505801
Nonce: for the first bet it is 0 on this dice site (PrimeDice)
```

PrimeDice trước hết sử dụng HMAC hash với giá trị theo công thức :
```
hmac-sha512(server_seed, client_seed-nonce)

# Theo ví dụ

hmac-sha512(293d5d2ddd365f54759283a8097ab2640cbe6f8864adc2b1b31e65c14c999f04, ClientSeedForDiceSites.com-0)
```
Chúng ta sẽ sử dụng một tool online freeformatter.com/hmac-generator.html để tính 
![](https://images.viblo.asia/14765292-e961-4e86-b196-e05175cfbbbf.png)
Tóm lại là chúng ta kí clientseed + nonce bằng key của serverseed theo HMAC-SHA512

Kết quả
```
aa671aad5e4565ebffb8dc5c185e4df1ae6d9aca2578b5c03ec9c7750f881922276d8044e5e3d84f158ce411f667e224e9b0c1ac50fc94e9c5eb883a678f6ca2
```
Bây giờ chọn 5 ký tự đầu tiên (aa671) và chuyển đổi từ giá trị hex thành số thập phân. Bạn cũng có thể sử dụng công cụ trực tuyến như statman.info/conversions/hexadecimal.html để tính toán . 
![](https://images.viblo.asia/2ba52a13-4a85-4772-bc1a-57640b108f41.png)

Nếu kết quả là một số > 999.999 thì chúng ta sẽ lấy 5 kí tự tiếp theo là (aad5e) trong trường hợp của chúng ta thì 697969 thỏa mãn . Bây h chúng ta sẽ lấy số đấy module của số đấy với 10000 rồi chia cho 100
```
697969%(10000)/100

# Kết quả 

79.69%
```
Đối với  lần đặt cược tiếp theo trang web sẽ thực hiện đúng như vậy chỉ thay đổi Nonce tăng dần theo mỗi roll và vì thế kết quả cuối là ngẫu nhiên .

## Verifying your roll results
### Step 1
Trước tiên kiểm tra serverseed hashed xem có phải nó được hash từ serverseed không  . Chúng ta sử dụng một tool online khác để kiểm tra ( xorbin.com/tools/sha256-hash-calculator ) để tạo SHA256 từ serverseed. Bạn sẽ so sánh mã này với mã đã hash của server trả về nếu nó giống nhau thì chính tỏ serverseed đã được sử dụng cho kết quả roll .
### Step 2
Lặp lại việc tính và so sánh nó với kết quả cả roll server trả về 

### Sử dụng các tool probably fair
Bởi vì bạn có thể thực hiện hàng chục , hàng trăm hoặc thậm trí hàng nghìn lần đặt cược sẽ thật là vất vả nới mỗi lần chúng ta đặt cược rồi lại phải tính toán bằng tay. Vì vậy cộng đồng Bitcoin Gambling đã hỗ trợ rất nhiều tool để mọi người có thể xác nhận kết quả roll của mình xem có thực sự ko bị thay đổi hay không

ví dụ sử dụng [Primedice](https://dicesites.com/primedice/verifier) bạn chỉ cần nhập các thông số trang web yêu cầu 
![](https://images.viblo.asia/e615cc13-27cc-4122-8e30-3cd11c82b0c6.png)

Nếu kết quả giống nhau thì chúng ta biết rằng chúng ta ko bị cheated khi chơi gambling :))))

## Development
Lý thuyết dừng ở đây là được rồi bh đến thực hành .

Mỗi kết quả được sinh ra đều sẽ dựa theo **client-seed** , **server-seed** và **nonce** 

### Tạo số ngẫu nhiên

Đầu tiên chúng ta sẽ tạo ngẫu nhiên **client** và **server** seed 

**Client seed:**
```js
function randomString(length) {
  const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = '';
  for(let i = 0; i < length; i++) {
    randomString += availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return randomString;
}
```

Chúng ta dễ dàng lấy được các giá trị ngẫu nhiên từ hàm trên ví dụ :
```js
randomString(30) // jd2X84d1jvUvIqcaRFmVWIsot2zIeH
randomString(30) // XaX6MWShOwxAZbggz4dfTYVd6EuIzw
randomString(30) // 95zrd3MsUZJ6AOE9OdPu9ctKxmgQpy
```

**Server seed**
Mã này được tạo ở phía server và chúng ta có thể sử dụng hàm mã hóa
```js
// Generate 256 random characters
const crypto = require('crypto')
crypto.randomBytes(256).toString('hex');
```

Kết hợp tất cả sau đó tính theo SHA-512 hash 
```js
const crypto = require('crypto');

const combination = <SERVER SEED> + <CLIENT SEED> + <NONCE> 
const hash = crypto.createHash('sha512')
                   .update(combination)
                   .digest('hex');
console.log(hash) // 1f40fc92da241694750979ee6cf582f2d5d7d28e...
```

Bây giờ chúng ta có thể gửi cho client kết quả  rồi
```js
const getResult = hashedValue => {
  // the offset of the interval
  let index = 0;
  // result variable
  let result;

  do {
    // get the decimal value from an interval of 5 hex letters
    result = parseInt(hashedValue.substring(index * 5, index * 5 + 5), 16);
    // increment the offset in case we will need to repeat the operation above
    index += 1;
    // if all the numbers were over 999999 and we reached the end of the string, we set that to a default value of 9999 (99 as a result)
    if (index * 5 + 5 > 129) {
      result = 9999;
      break;
    }
  } while (result >= 1e6);
  // the result is between 0-999999 and we need to convert if into a 4 digit number
  // we a apply a modulus of 1000 and the 4 digit number is further split into a 2 digit number with decimals
  return [result % 1e4] * 1e-2;
};

console.log(getResult('d9b9b9774d35566bdbd33a0050b15f7f3bc0ec68cff1b593994c04b05767573c0c002cb965d506e5ccedf803db8b58c27406e320f2c13dcbc247448dedccec12'))
```

![](https://images.viblo.asia/18cc0811-8a32-40a2-8e9e-c7b07c9e6f2e.png)


Bài viết được dịch từ : https://dicesites.com/provably-fair

https://medium.com/@alexcambose/provably-fair-system-in-javascript-6457e028d2aa