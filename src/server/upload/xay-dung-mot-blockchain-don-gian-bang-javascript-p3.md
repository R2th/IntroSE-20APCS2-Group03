Đây là bài viết tiếp theo trong series `Xây dựng Blockchain bằng JavaScript`, trong bài viết này chúng ta sẽ tìm hiểu về khái niệm `Transactions` và `Mining Rewards` và cách thực hiện chúng.
* Phần 1: [Basic Blockchain](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-Qbq5QLE3lD8)
* Phần 2: [Proof-of-work](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-p2-QpmleEX7lrd)
## Refactor class Block
Bây giờ một block đã có các thuộc tính như index, previousHash, timestamp, data, hash và nonce. Chúng ta hãy xóa thuộc tính `index` vì nó không thực sự hữu ích và thay `data` thành `transactions` .
```
class Block{
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
}
```
Chúng ta cũng cần phải thay đồi hàm `calculateHash()` như sau:
```
calculateHash() {
  return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
}
```
## Class Transaction
Trong một block, chúng ta có thể lưu trữ nhiều transaction, bây giờ, hãy định nghĩa một class `Transaction` để gói những thuộc tính mà một transaction sẽ có:
```
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
```
## Thay đổi Blockchain
Như các bạn đã biết, Blockchain tạo các block với một khoảng thời gian ổn định nhờ vào thuật toán proof-of-work. Trong trường hợp của Bitcoin, độ khó được điều chỉnh sao cho các block mới được tạo ra khoảng 10 phút một lần. Và trong 10p đó, những transaction mới sẽ được chờ để xử lý đưa vào một block tiếp theo.

Hãy bắt đầu bằng cách thay đổi constructor của Blockchain để nó có một nơi lưu trữ các transaction đang chờ xử lý để được đưa vào 1 block. Chúng ta cũng sẽ tạo một thuộc tính xác định số tiền mà miner nhận được sau khi đào được một block.
```
class Blockchain{
    constructor() {
        this.chain = [this.createFirstBlock()];
        this.difficulty = 5;

        // Nơi lưu trữ các transaction đang chờ được xữ lý để đưa vào block
        this.pendingTransactions = [];

        // Số coin mà miner sẽ nhận được sau khi đào được block
        this.miningReward = 100;
    }
}
```

Tiếp theo, chúng ta cần phải thay đổi với phương thức `addBlock()`. Chúng ta sẽ không cho phép mọi người trực tiếp thêm các block vào chuỗi Blockchain nữa. Thay vào đó, họ phải thêm các transaction được bao gồm trong block tiếp theo. Vì vậy, chúng ta sẽ thay thế phương thức `addBlock()` bằng `createTransaction ()`:
```
createTransaction(transaction) {
    // Sẽ có một vài validate transaction ở đây

    // Đẩy transaction vào mãng pendingTransactions
    this.pendingTransactions.push(transaction);
}
```
## Mining block
Bây giờ, mọi người có thể thêm các giao dịch mới vào danh sách các transaction đang chờ xử lý. Nhưng bằng cách này hay cách khác, chúng ta cần phải đặt chúng bên trong các block thực tế của chuỗi. Để làm điều đó, hãy tạo phương thức `minePendingTransactions()`. Phương thức này sẽ không chỉ tạo ra một block mới với tất cả các transaction đang chờ xử lý, nó cũng sẽ gửi một phần thưởng cho người đào được block đó.
```
minePendingTransactions(miningRewardAddress) {
    // Tạo một block mới với tất cả các transaction pending và đào nó
    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    // Thêm block vừa được đào vào chuỗi
    this.chain.push(block);

    // Reset các transaction pending và gửi phần thưởng cho thợ đào
    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward)
    ];
}
```
Lưu ý rằng phương thức này có một đối số là `miningRewardAddress`. Đây chính là địa chỉ ví của bạn để nhận được phần thưởng sau khi đào được một block. Tuy nhiên, chúng ta đã lấy tất cả các transaction đang chờ được xử lý và thêm chúng vào một block. Nhưng trong thực tế, điều đó sẽ không hiệu quả vì kích thước của một block bị giới hạn. Trong trường hợp của Bitcoin, một block có giới hạn kích thước là 2mb.
## Balance
Cuối cùng, chúng ta sẽ tạo một phương thức để lấy được số dư của một address trên blockchain.
```
getBalanceOfAddress(address){
    let balance = 0;

    // Lặp qua từng block và các transaction bên trong một block
    for(const block of this.chain){
        for(const trans of block.transactions){

            // Nếu address cần kiểm tra số dư là người gửi, hãy giảm balance
            if(trans.fromAddress === address){
                balance -= trans.amount;
            }

            // Nếu address cần kiểm tra số dư là người nhận, hãy tăng balance
            if(trans.toAddress === address){
                balance += trans.amount;
            }
        }
    }

    return balance;
}
```
## Testing
Hãy bắt đầu bằng việc thêm một vài transaction:
```
let myChain = new Blockchain();

myChain.createTransaction(new Transaction('address1', 'address2', 100));
myChain.createTransaction(new Transaction('address2', 'address1', 50));
```
Các transaction này hiện đang chờ được xử lý, bây giờ chúng ta hãy bắt đầu đào nó:
```
console.log('Starting the miner:');
myChain.minePendingTransactions('myAddress');
```
Trong trường hợp trên, địa chỉ của chúng ta muốn nhận phần thưởng là `myAddress`. 
Bây giờ, hãy kiểm tra số dư của địa chỉ `myAddress`:
```
console.log('Balance of my address is', myChain.getBalanceOfAddress('myAddress'));
// Output: 0
```
Tuy nhiên, phần thưởng chỉ thực sự nhận được sau khi block tiếp theo sau đó được đào, phần thưởng của bạn lúc này vẫn đang là một transaction trong trạng thái pending. Vì vậy, hãy bắt đầu đào một lần nữa, chúng ta sẽ có kết quả là 100 coin:
```
console.log('Starting the miner again!');
myChain.minePendingTransactions("myAddress");

console.log('Balance of my address is', myChain.getBalanceOfAddress('myAddress'));
// Output: 100
```
## Kết luận
Bây giờ blockchain của chúng ta có khả năng lưu trữ nhiều transaction trong một block và trao phần thưởng cho miner đào được nó.

Tuy nhiên vẫn còn một số điều còn thiếu: Dữ liệu trong một block chưa được giới hạn. Khi gửi tiền, chúng ta không kiểm tra xem người gửi có đủ số dư để thực sự thực hiện giao dịch đó hay không. Chúng ta cũng không kiểm tra rằng người gửi có thực sự muốn gửi số tiền đó đến người nhận hay không, và rất nhiều vấn đề khác nữa... Chúng ta sẽ cùng tìm hiều trong bài viết tiếp theo. Bài viết được tham khảo ở [link](https://www.savjee.be/2018/02/Transactions-and-mining-rewards/) này.