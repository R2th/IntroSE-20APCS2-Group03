Trong một số năm gần đây, tiền ảo cũng như blockchain đang là 2 mảng phát triển mạnh, nên hôm nay, mình sẽ chia sẻ cách mình đã làm một blockchain chỉ trong 60 dòng Javascript nhé! 

**(Bài viết gốc của mình ở trên [dev.to](https://dev.to/freakcdev297/creating-a-blockchain-in-60-lines-of-javascript-5fka) nhé!)**

## Blockchain là gì?
Trước khi chúng ta làm bất kì thứ gì, ta phải hiểu rằng blockchain là gì. Blockchain, hiểu một cách đơn giản nhất, chỉ là một tập hợp gồm các objects (đối tượng) có chứa các thông tin như mốc thời gian, các giao dịch, hash,... Dữ liệu của nó phải không được thay đổi, và không thể bị hack. Những platform lớn hiện nay như Ethereum, Cardano, Polkadot,... có nhiều khái niệm phức tạp hơn nữa, nhưng chúng ta sẽ chỉ có một cái nhìn đơn giản nhất về blockchain trong bài viết này.

## Setup
Trước hết, bạn cần phải có NodeJS nhé. Ngoài ra, mình cũng sẽ sử dụng lập trình hướng đối tượng (OOP) nên nếu bạn chưa có kinh nghiệm về nó thì nên tìm hiểu trước nhé.

## Tạo một block
Như mình đã nói, một block chỉ là một object gồm một số thông tin trên nó, nên ta có thể tạo một class `Block` như sau:

```js
class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        // prop data này sẽ có thể được dùng để lưu trữ các giao dịch.
        this.data = data;
    }
}
```

Như vậy, chúng ta đã có một class `Block` gồm mốc thời gian (`timestamp`) và một mảng `data` nhằm lưu trữ dữ liệu. Nhưng chúng ta vẫn cần immutablity (sự không thay đổi) của dữ liệu trong blockchain. Để đạt được điều này, ta có thể sử dụng một hashing function (hàm băm) để hash (băm) dữ liệu của các properties (thuộc tính) trong một block. Bạn có thể hiểu đơn giản là nó sẽ lấy một đầu vào là chuỗi, sau đó sẽ trả về một chuỗi mới đại diện cho chuỗi gốc với độ dài mặc định không thay đổi, chỉ cần một thay đổi nhỏ tới đầu vào có thể khiến cho đầu ra hoàn toàn khác. 

Minh sẽ sử dụng thuật toán `SHA256`. Để có thể tạo được một hashing function, mình sẽ dùng luôn package `crypto` của NodeJS cho tiện.

```js
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
```

Nếu bạn muốn hiểu rõ hơn thì nhớ check [doc chính thức của NodeJS về `hash`](https://nodejs.org/api/crypto.html#class-hash) nhé.

Chúng ta sẽ có một đoạn code như sau:

```js
// Get the sha256 hash function.
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // previous block's hash
    }

    // Our hash function.
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }
}
```
Property `hash` sẽ chứa hash gốc của block. Chỉ cần một thay đổi nhỏ với bất kì thuộc tính nào sẽ khiến cho `getHash` trả về một hash khác hẳn, nên ta có thể biết được rằng liệu block có còn hợp lệ nữa không, đảm bảo immutability.

Property `prevHash` cũng đóng một vai trò quan trọng trong immutability, nó sẽ đảm bảo rằng các block trong quá khứ vẫn sẽ luôn giữ nguyên trong tương lai. `prevHash` sẽ chứa hash của block trước, nên khi block trước bị thay đổi thì `getHash` của block này sẽ trả về một hash khác, đảm bảo được rằng dữ liệu sẽ không thay đổi. Hiện tại thuộc tính này đang bỏ trống, nhưng chúng ta sẽ dùng nó trong phần tiếp của bài.

## Blockchain
Bây giờ ta sẽ chuyển sang làm class `Blockchain`.

Như mình đã nói, Blockchain chỉ là một tập hợp gồm các blocks, nên mình có một form cơ bản như sau:

```js
class Blockchain {
    constructor() {
        this.chain = [];
    }
}
```

Mình sẽ tạo một "genesis block", tức là block đầu tiên của chain.

```js
class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())];
    }
}
```

Để tiện lợi cho tương lai, mình sẽ làm một method trả về block mới nhất của chain.

```js
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
```

Và mình cũng sẽ làm một method để thêm một block vào chain:

```js
    addBlock(block) {
        // Vì mình đang thêm một block mới, nên mình sẽ gán prevHash là hash của nó.
        block.prevHash = this.getLastBlock().hash;
        // Mình cũng phải đặt lại hash, do bây giờ đã có thêm thuộc tính prevHash.
        block.hash = block.getHash();
        this.chain.push(block);
    }
```

### Kiểm tra tính hợp lệ của chain
Chúng ta cần biết xem chain có còn hợp lệ hay không, nên chúng ta sẽ tạo một method để kiểm tra. Chain sẽ hợp lệ khi hash của block bằng giá trị mà `getHash` của nó trả về, cũng như `prevHash` phải bằng `hash` của block trước đó.

```js
    isValid() {
        // Lặp qua chain, bắt đầu từ 1 vì trước genesis block không có gì.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            // Kiểm tra
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
```

## Proof-of-work
Nhưng thực tế, `hash` và `prevHash` vẫn mang theo nhiều khúc mắc, khi mọi người có thể thay đổi dữ liệu 1 block rồi thay prevHash và hash của các block sau là vẫn tạo được một chain hợp lệ, và chúng ta cũng muốn người dùng cùng phải đồng thuận (consensus) về một lịch sử duy nhất của chain. Bitcoin và một số tiền ảo khác sử dụng proof-of-work để giải quyết vấn đề này.

Nếu bạn muốn sửa đổi block trước đó, bạn sẽ phải mine lại block và tất cả các block sau nó. Nó yêu cầu quét một giá trị bắt đầu bằng một số số 0 nhất định khi được hash. Giá trị được gọi là giá trị `nonce`, số bit 0 đứng đầu được gọi là difficulty. Bằng cách tăng độ khó, việc khai thác ngày càng khó hơn và chúng ta có thể ngăn chặn việc sửa đổi các block trước đó bởi vì việc làm lại tất cả công việc này nhưng vẫn bắt kịp những block khác là điều không thể.

Chúng ta có thể làm hệ thống này bằng cách tạo method `mine` và một giá trị `nonce` và một block:

```js
class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty) {
        // Nó sẽ lặp cho đến khi hash của block có số số 0 bằng difficulty.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // Tăng nonce
            this.nonce++;
            // Cập nhật hash mới
            this.hash = this.getHash();
        }
    }
}
```

Hiểu đơn giản là vì khi chúng ta thay đổi một giá trị, ta sẽ có được hash hoàn toàn mới, nên ta sẽ tăng nonce liên tục cho đến khi ta có được một hash đạt yêu cầu thì thôi.

Chuyển sang class `Blockchain`, ta tạo một prop mới tên difficulty:

```js
    this.difficulty = 1;
```

Gốc sẽ là 1, nhưng difficulty sẽ tăng tùy vào số blocks đã được đào và cơ chế của blockchain.

Chúng ta cùng cần đổi mới method `addBlock`:

```js
    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(block);
    }
```

Bây giờ, block nào cũng sẽ phải được đào mới có thể được cho vào chain.

### Lưu ý nhỏ
Vì bài viết này mang tính cơ bản và dễ hiểu là chủ yếu, nên sẽ sử dụng proof-of-work. Trên thực tế, công nghệ này đã lỗi thời, chậm chạp, tốn tài nguyên và có hại cho môi trường, nên các platform hiện nay thường sử dụng proof-of-stake.
 
## Dùng thử!
Ta sẽ tạo một file mới, file này sẽ là file chính.

Trước hết, chúng ta cần export 2 class cần thiết.
```js
module.exports = { Block, Blockchain };
```

Mình sẽ gọi chain là `JeChain`:

```js
const { Block, Blockchain } = require("./file-blockchain-cua-ban.js");

const JeChain = new Blockchain();
// Thêm block mới
JeChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
// Đây chỉ là một ví dụ, một giao dịch thường phải thông qua nhiều bước!

// In ra chain
console.log(JeChain.chain); 
```

Nó sẽ trông như thế này:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yaxvmoz4w7mbfno2mi00.png)

Block đầu tiên là genenis block, block thứ hai là block chúng ta vừa tạo.

## Difficulty và block time
### Block time
Block time là một hằng số, tượng trưng cho thời gian trung bình một block có thể được đào. Các nền tảng như Bitcoin có block time là 10 phút, trong khi Ethereum có block time là 13 giây.

### Công thức tính difficulty của Bitcoin
Với Bitcoin, difficulty của nó được cập nhật vào mỗi 2016 blocks được đào. Nó sử dụng công thức này để tính difficulty mới:
```
old difficulty * (2016 blocks * 10 phút) / thời gian đào 2016 blocks trước (theo đơn vị của block time)
```

Trước hết, chúng ta sẽ khai báo property `blockTime`, mình sẽ đặt nó là 30s, hay bằng 30000ms. Mình dùng mili giây vì nó hoạt động tốt hơn với `Date.now()`.
```js
    blockTime = 30000;
```
(Chúng ta đang code trong class `Blockchain` nhé)

Ví dụ, mình sẽ tạo hệ thống của riêng mình: difficulty sẽ tăng lên 1 nếu block time nhỏ hơn thời gian thực mà block được khai thác, ngược lại nó sẽ giảm.

```js
    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(block);

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }
```

Bạn có thể tự nghĩ ra một công thức cho mình, nhưng bạn nên check lại về tính bảo mật và tốc độ.


## Source code
Bạn có thể lấy full code của bài trong:
<br/>
<a href="https://github.com/nguyenphuminh/JeChain"><img src="https://github-readme-stats.vercel.app/api/pin/?username=nguyenphuminh&repo=JeChain"/></a>
 
## Nguồn tham khảo
Mình đã tham khảo ý tưởng về blockchain từ:
* [Simply Explained](https://www.youtube.com/c/Savjee).
* [Bài viết này](https://www.activestate.com/blog/how-to-build-a-blockchain-in-python/).

## Donate
Nếu bạn thích bài viết này, bạn có thể ủng hộ mình bằng cách mua tặng mình cốc cà phê qua địa chỉ BEP-20 của mình là `0x1848Ba922d6eD66D4910176998fF4fa77AEb82D5`.

Follow mình để có thông tin về các bài viết mới và comment chủ đề mà bạn muốn mình thực hiện tiếp theo nhé!

## Liên hệ
* [Bài viết gốc của mình](https://dev.to/freakcdev297/creating-a-blockchain-in-60-lines-of-javascript-5fka)
* [Twitter](https://twitter.com/NguynPhMinh8)
* [Github](https://github.com/nguyenphuminh)