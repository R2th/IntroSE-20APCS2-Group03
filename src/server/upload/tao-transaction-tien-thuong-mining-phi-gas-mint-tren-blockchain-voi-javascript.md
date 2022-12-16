Xin chào tất cả các bạn!, vào [bài viết trước của mình](https://viblo.asia/p/tu-tao-blockchain-trong-60-dong-code-javascript-1VgZvQN1KAw), mình đã nói về cách tạo một Blockchain đơn giản trong 60 dòng code. Do đó, hôm nay, mình sẽ làm hệ thống giao dịch nhé!

**Hãy đọc bài viết trước nếu bạn chưa biết gì về blockchain nhé.**

Đồng thời, bạn cũng nên xem hướng dẫn của mình trên Youtube để biết thêm một số thông tin chi tiết nữa nhé:
* Part 1: [Tạo Blockchain trong 60 dòng Javascript](https://www.youtube.com/watch?v=-yr4f5dlwGA).
* Part 2: [Tạo Transaction, tiền thưởng Mining, Phí gas, Mint trên Blockchain với Javascript](https://youtu.be/306hE9h85-0).
* Part 3: [Tạo mạng P2P trên blockchain và phát hành tiền điện tử của riêng bạn](https://www.youtube.com/watch?v=i0LW7SFPD4A).

## Mình sẽ cần làm những gì?
Chúng ta sẽ cần một mô hình của một giao dịch bao gồm địa chỉ của người gửi, người nhận, và số lượng tiền mà chúng ta cần gửi. Chúng ta sẽ cho nó vào một pool (bể chứa) các giao dịch.

Để phòng chống các giao dịch lỗi, chúng ta sẽ dùng một signing algorithm (thuận toán ký) kèm với một cặp key. Cặp key này sẽ gồm một key bí mật (private key) và một key công khai (public key). Public key có thể được dùng để làm địa chỉ ví và kiểm tra tính xác thực của chữ kí. Private key sẽ được dùng để kí. Vì chỉ bạn có private key, chỉ có bạn có thể kí được giao dịch của mình, đảm bảo được tính bảo mật.

Chúng ta cũng sẽ nói về khái niệm `minting`, lần phát hành tiền đầu tiên và phí gas.

Cùng bắt đầu nào!

## Transaction class - class cho giao dịch
Mình sẽ có một form như sau:
```js
class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}
```


## Đào các giao dịch
Quay trở lại với class `Blockchain`, trước hết, chúng ta phải tạo một pool giao dịch để chứa các giao dịch đang chờ.

```js
    this.transactions = [];
```

Mình cũng sẽ tạo một method để đẩy giao dịch vào pool.

```js
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
```

Và một method để mine:

```js
    mineTransactions() {
        this.addBlock(new Block(Date.now().toString(), this.transactions));

        this.transactions = [];
    }
```

Đơn giản là chúng ta sẽ chuyển các giao dịch từ pool vào một block mới rồi clear pool kia đi.

### Tiền thưởng
Không một ai muốn mine cho chain của bạn miễn phí cả, bạn cần phải có phần thưởng cho miners.

Đầu tiên, chúng ta sẽ tạo một prop `reward`, bạn có thể set thành gì cũng được, mình sẽ set thành 297.

```js
    this.reward = 297;
```

Bây giờ, chúng ta sẽ tạo một giao dịch để chuyển tiền thưởng đến miner.

```js
    mineTransactions(rewardAddress) {
        this.addBlock(new Block(Date.now().toString(), [new Transaction(CREATE_REWARD_ADDRESS, rewardAddress, this.reward), ...this.transactions]));
        // Hiện tại, mình sẽ đặt địa chỉ gửi như thế này, chúng ta sẽ quay lại về vấn đề này trong phần tiếp theo của bài.
        this.transactions = [];
    }
```


### Minting
Đây là một khái niệm rất nổi tiếng trong blockchain development, nó có nghĩa là in thêm tiền. Chain sẽ mint (in tiền ra) để tạo ra tiền thưởng cho bạn.

## Kí
Trước tiên, bạn cũng nên tìm hiểu về signing trước, nó là một thuật ngữ rất quan trọng trong cryptography.

Mình sẽ sử dụng một thuật toán dùng bởi Bitcoin và Ethereum để tạo các cặp key - secp256k1.

Vì bài viết này mang tính đơn giản hóa nên chúng ta sẽ không tự tạo lại hàm để sign, thay vào đó, ta sẽ sử dụng package `elliptic`.

(`elliptic` cũng hỗ trợ một thuật toán mạnh hơn là `Curve25519`).

Tải về dùng npm:

```
npm i elliptic
```

### Tạo một cặp key
Ví dụ:
```js
const EC = require("elliptic").ec, ec = new EC("secp256k1");

const keyPair = ec.genKeyPair();
// public key: keyPair.getPublic("hex")
// private key: keyPair.getPrivate("hex")
```

### Kí
Tạo một method `sign` trong class `Transaction`: 
```js
    sign(keyPair) {
        // Kiểm tra xem public key có giống với địa chỉ gửi không
        if (keyPair.getPublic("hex") === this.from) {
            // Kí
            this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount), "base64").toDER("hex");
        }
    }
```

## Xác thực
Chain sẽ được xác thực khi mọi block chứa các giao dịch đã được xác thực, và nó được xác thực khi:
* From, to, amount không bị bỏ trống.
* Người gửi có đủ số tiền.
* Chữ ký được verify.

Đầu tiên, ta sẽ tạo một method trong class `Blockchain` để tính số dư của một địa chỉ.

Mình có thể tạo nó dựa vào lịch sử giao dịch của chain:
```js
    getBalance(address) {
        let balance = 0;

        this.chain.forEach(block => {
            block.data.forEach(transaction => {
                // Vì bạn là người gửi, bạn đang gửi tiền đi, nên số dư của bạn sẽ bị trừ.
                if (transaction.from === address) {
                    balance -= transaction.amount;
                }

                // Vì bạn là người nhận, bạn đang nhận tiền, nên số dư của bạn sẽ được cộng.
                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            })
        });

        return balance;
    }
```

Mình sẽ có một method như sau trong class `Transaction`:
```js
    isValid(tx, chain) {
        return (
            tx.from &&
            tx.to &&
            tx.amount &&
            chain.getBalance(tx.from) >= tx.amount &&
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
        );
    }
```

Trong class `Block`, ta cần tạo một method để kiểm tra xem block có chứa các transactions hợp lệ hay không.
```js
    hasValidTransactions(chain) {
        return this.data.every(transaction => transaction.isValid(transaction, chain));
    }
```

Sửa lại `isValid` của `Blockchain` nữa nhé:
```js
    if (
        currentBlock.hash !== currentBlock.getHash() || 
        prevBlock.hash !== currentBlock.prevHash || 
        !currentBlock.hasValidTransactions(blockchain)
    ) {
        return false;
    }
```

Bây giờ, chúng ta cũng cần check xem một giao dịch có hợp lệ hay không trước khi cho nó vào pool:
```js
    addTransaction(transaction) {
        if (transaction.isValid(transaction, this)) {
            this.transactions.push(transaction);
        }
    }
```

Quay trở lại với `minting`, mình sẽ tạo một địa chỉ chỉ để mint.
```js
const MINT_KEY_PAIR = ec.genKeyPair();
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");
```

Method mới:
```js
    mineTransactions(rewardAddress) {
        // Tạo một transaction làm phần thưởng.
        const rewardTransaction = new Transaction(MINT_PUBLIC_ADDRESS, rewardAddress, this.reward);
        rewardTransaction.sign(MINT_KEY_PAIR);

        // Mình sẽ gộp giao dịch trên với pool
        this.addBlock(new Block(Date.now().toString(), [rewardTransaction, ...this.transactions]));

        this.transactions = [];
    }
```

Địa chỉ để mint sẽ được 1 ngoại lệ: Số dư của nó sẽ không bị kiểm tra vì chúng ta đang in tiền, nên chúng ta cần sửa lại method `isValid` của `Transaction`. Ngoài ra, số lượng tiền chuyển cũng phải giống y hệt phần thưởng định sẵn.

```js
    isValid(tx, chain) {
        return (
            tx.from &&
            tx.to &&
            tx.amount &&
            (chain.getBalance(tx.from) >= tx.amount || tx.from === MINT_PUBLIC_ADDRESS) &&
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount), tx.signature)
        );
    }
```

## Phát hành những đồng coin đầu tiên
Quay trở lại với class `Blockchain`, mình sẽ có một chút thay đổi với genesis block. Mình sẽ mint một lượng coin cho một địa chỉ của chúng ta. Nếu ai muốn mua coin của chúng ta, họ sẽ phải chuyển tiền cho ta, và chúng ta sẽ gửi lại coins. Đây còn được gọi là một hợp đồng.

Tạo cặp key đó trước.
```js
const holderKeyPair = ec.genKeyPair();
```

Trong genesis block, tạo một giao dịch để phát hành coin.
```js
    // Chúng ta sẽ ra mắt 100000 coin
    const initalCoinRelease = new Transaction(MINT_PUBLIC_ADDRESS, holderKeyPair.getPublic("hex"), 100000);
    this.chain = [new Block(Date.now().toString(), [initalCoinRelease])];
```

## Vấn đề với minting
Nếu bạn đang thắc mắc rằng nếu bất kỳ ai có thể sử dụng minting key, thì chẳng phải mình có thể in ra rất nhiều tiền cho bản thân đúng không? Thực chất thì đúng vậy, nhưng chúng ta sẽ xử lí vấn đề này với một mạng p2p. Mình sẽ build nó trong bài viết tiếp theo.

Mạng p2p sẽ khắc phục vấn đề này bằng cách bài trừ các chain có những block:
* Có lớn hơn hoặc ít hơn 1 transaction cho minting.
* Có 1 transaction duy nhất, tức miner đã tự tạo mint transaction rồi mine nó chứ không thực sự mine các transaction thật.

## Gas fees
Cũng có một loại tiền thưởng khác cho miner gọi là phí gas, nhưng nó có một chút khác biệt. Nó đơn giản chỉ là tiền thưởng riêng của user dành cho miner. Nó sẽ khiến làm cho việc đào coin thêm thu hút hơn với các miners, và nó cũng trả cho tiền điện dùng để mine, và người dùng sẽ phải trả phí gas cao hơn nếu muốn được pick nhanh hơn.

Chúng ta sẽ cho prop gas vào:
```js
    class Transaction {
        constructor(from, to, amount, gas = 0) {
            this.from = from;
            this.to = to;
            this.amount = amount;
            this.gas = gas;
        }

        sign(keyPair) {
            if (keyPair.getPublic("hex") === this.from) {
                // Thêm gas vào
                this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount + this.gas), "base64").toDER("hex");
            }
        }

        isValid(tx, chain) {
            return (
                tx.from &&
                tx.to &&
                tx.amount &&
                // Thêm gas vào
                (chain.getBalance(tx.from) >= tx.amount + tx.gas || tx.from === MINT_PUBLIC_ADDRESS) &&
                ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
            );
        }
    }
```

Chúng ta cũng sẽ sửa lại method `getBalance`:
```js
    getBalance(address) {
        let balance = 0;

        this.chain.forEach(block => {
            block.data.forEach(transaction => {
                if (transaction.from === address) {
                    balance -= transaction.amount;
                    balance -= transaction.gas
                }

                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            })
        });

        return balance;
    }
```

Chúng ta sẽ đưa gas fee cho miner:
```js
    mineTransactions(rewardAddress) {
        let gas = 0;

        this.transactions.forEach(transaction => {
            gas += transaction.gas;
        });

        const rewardTransaction = new Transaction(MINT_PUBLIC_ADDRESS, rewardAddress, this.reward + gas);
        rewardTransaction.sign(MINT_KEY_PAIR);

        // Ngăn chặn hành dộng mint coin và mine luôn transaction đó
        if (this.transactions.length !== 0) this.addBlock(new Block(Date.now().toString(), [rewardTransaction, ...this.transactions]));

        this.transactions = [];
    }
```

Chúng ta cũng cần phải sửa lại `hasValidTransactions` do bây giờ ta đã có phí gas, và mình quên chưa có một hình thức check xem lượng reward có hợp lệ không:
```js
    hasValidTransactions(chain) {
        let gas = 0, reward = 0;

        this.data.forEach(transaction => {
            if (transaction.from !== MINT_PUBLIC_ADDRESS) {
                gas += transaction.gas;
            } else {
                reward = transaction.amount;
            }
        });

        return (
            reward - gas === chain.reward &&
            this.data.every(transaction => transaction.isValid(transaction, chain)) && 
            this.data.filter(transaction => transaction.from === MINT_PUBLIC_ADDRESS).length === 1
        );
    }
```

### Testing

```js
// Số dư gốc của bạn là 100000

const girlfriendWallet = ec.genKeyPair();

// Tạo giao dịch
const transaction = new Transaction(holderKeyPair.getPublic("hex"), girlfriendWallet.getPublic("hex"), 100, 10);
// Kí giao dịch
transaction.sign(holderKeyPair);
// Cho giao dịch vào pool
JeChain.addTransaction(transaction);
// Đào
JeChain.mineTransactions(holderKeyPair.getPublic("hex"));

// In ra số dư của hai tài khoản
console.log("Your balance:", JeChain.getBalance(holderKeyPair.getPublic("hex")));
console.log("Your girlfriend's balance:", JeChain.getBalance(girlfriendWallet.getPublic("hex")));
```

Nó sẽ trông thế này:
![image.png](https://images.viblo.asia/4961b8a0-c15f-4edf-a6df-dac6b6a05382.png)

## Phần tiếp theo
* [Tạo mạng P2P trên blockchain và phát hành tiền điện tử của riêng bạn](https://viblo.asia/p/tao-mang-p2p-tren-blockchain-va-phat-hanh-tien-dien-tu-cua-rieng-ban-m68Z0jnA5kG).

## Resources
Find me on:
* [Github](https://github.com/nguyenphuminh)
* [Twitter](https://twitter.com/NguynPhMinh8)
* [Youtube](https://www.youtube.com/channel/UCfoL6jxesUq0urUHBqXY1WA)
* [Viblo](https://viblo.asia/u/freakcdev)

Video trên Youtube:
* [Tạo Transaction, tiền thưởng Mining, Phí gas, Mint trên Blockchain với Javascript](https://youtu.be/306hE9h85-0).