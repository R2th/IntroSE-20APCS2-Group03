Hầu hết mọi người đều nghe về cryptocurrency như Bitcoin hoặc Ethereum, nhưng rất ít người thực sự biết về công nghệ đứng đằng sau nó. Đó là Blockchain. Thay vì đọc những dòng khái niệm khô khan và khó hiểu, bài viết này sẽ tạo một blockchain đơn giản bằng JavaScript để chúng ta có thể dễ hình dung chúng làm việc như thế nào. Bài viết này là phần đầu tiên trong series tìm hiểu về Blockchain, chúng ta sẽ thực hiện một blockchain đơn giản nhất. Các phần sau chúng ta sẽ tìm hiểu về thuật toán proof-of-work, transactions, mining rewards...
# Blockchain là gì?
Blockchain là một cơ sở dữ liệu bao gồm các khối (block) được nối lại với nhau thành mội chuỗi (chain). Và các block là immutable (bất biến). Khi một block đã được thêm vào chain, nó không thể thay đổi được nữa, và các block được nối với nhau sử dụng hash (block sau sẽ lưu hash của block trước).

Đó là lý do tại sao các cryptocurrency được dựa trên blockchain, bạn sẽ không muốn người khác thay đổi transaction sau khi đã thực hiện chúng.
# Xây dựng một Block
Một Blockchain bao gồm nhiều block được liên kết với nhau. Giả sử có ai đó muốn thay đổi dữ liệu của block trước đó, làm sao chúng ta có thể đảm bảo tình toàn vẹn?
Đó là dựa vào một hàm băm được tính toán dựa trên nội dung của chính block đó, và nó cũng sẽ chứa hàm băm của block trước đó.
Đây là những gì một class Block được viết bằng JavaScript:
```
const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
```
Một block sẽ chứa thời gian khởi tạo block đó, Hash của block trước nó, dữ liệu của nó (dữ liệu có thể là bất cứ thứ gì, trong cryptocurrency thì dữ liệu ở đây chính là các transaction), và tất nhiên nó sẽ lưu trữ Hash của chính nó, được tính toán dựa trên một thuật toán mã hóa SHA 256 bit. 

Chúng ta buộc phải require thư viện [crypto-js](https://github.com/brix/crypto-js) bởi vì hàm băm sha256 không có sẳn trong JavaScript.
# Xây dựng Blockchain
Bây giờ chúng ta sẽ bắt đầu nối các block với nhau thành một chuỗi để tạo thành Blockchain. Chúng ta có class Blockchain được viết bằng JavaScript như sau:
```
class Blockchain{
    constructor() {
        this.chain = [this.createFirstBlock()];
    }

    createFirstBlock() {
        return new Block(0, "01/01/2018", "first block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
```
Trong constructor, chúng ta khởi tạo chuỗi bằng cách tạo một mãng chứa block đầu tiên. Block đầu tiên là đặc biệt bởi vì nó không thể trỏ đến một block trước đó. Chúng ta cũng đã thêm các function sau:

* `getLatestBlock()` trả về block cuối cùng trong chuỗi blockchain.
* `addBlock()` là hàm thêm một block mới vào chuỗi của chúng ta. Để làm điều đó, chúng ta thêm Hash của block trước vào block mới. Nó sẽ giúp bảo toàn tính toàn vẹn của chuỗi. Tất nhiên chúng ta sẽ phải tính toán Hash của block mới này và lưu lại. Sau khi block hoàn thiện, chúng ta cần phải thêm nó vào chuỗi.
* `isChainValid()` đây là một hàm rất quan trọng, nó có nhiệm vụ đảm bảo rằng không ai có thể gây rối với blockchain của chúng ta. Nó lặp qua tất cả các block và kiếm tra xem Hash của mỗi block có chính xác hay không. Nó cũng kiểm tra xem mỗi block có trỏ tới chính xác block trước đó hay không bằng cách so sánh giá trị Hash của block trước và previousHash của block đó là bằng nhau hay không. Nếu một cái gì đó sai, tức data đã bị ai đó chỉnh sửa, nó sẽ lập tức return về false. 

# Sử dụng blockchain
Như vậy là chúng ta đã thực sự tạo ra một blockchain đơn giản bằng JavaScript, bây giờ chúng ta sẽ thử test nó.
```
let myChain = new Blockchain();
myChain.addBlock(new Block(1, "20/07/2018", "block 2"));
myChain.addBlock(new Block(2, "20/07/2018", "block 3"));

console.log(JSON.stringify(myChain, null, 4));
```
Ở đây chúng ta đã tạo một instance của Blockchain tên là `myChain`. Sau đó chúng ta thêm một vài block vào chuỗi. Các block đó có thể chứa bất kỳ giữ liệu nào mà bạn muốn, trong trường hợp này, data của chúng ta chỉ là một string đơn giản. Và đây là kết quả:
```
{
    "chain": [
        {
            "index": 0,
            "previousHash": "0",
            "timestamp": "01/01/2017",
            "data": "first block",
            "hash": "324b2bc54537c26b83e2e6175bf6551204ad629393a5001aef0b8a64c6d53398"
        },
        {
            "index": 1,
            "previousHash": "324b2bc54537c26b83e2e6175bf6551204ad629393a5001aef0b8a64c6d53398",
            "timestamp": "20/07/2017",
            "data": "block 2",
            "hash": "f925a5538ac5fdb9eab1790829dc5c5cd36fcfdfcdf28cdbf2ab0d5ab4987d3b"
        },
        {
            "index": 2,
            "previousHash": "f925a5538ac5fdb9eab1790829dc5c5cd36fcfdfcdf28cdbf2ab0d5ab4987d3b",
            "timestamp": "20/07/2017",
            "data": "block 3",
            "hash": "15ea184281490e1af0a8a8e4fd12528c158b7a679f463adeb25d084ccbeccf38"
        }
    ]
}
```
Bây giờ chúng ta sẽ thử thay đổi data của một block, vì như đã nói lúc đầu, blockchain là immutable, block không thể thay đổi sau khi chúng được thêm vào. Hãy kiểm tra điều đó.
```
// Kiểm tra khi chain là valid
console.log('Blockchain valid? ' + myChain.isChainValid());

// Thay đổi data của một block
console.log('Changing a block...');
myChain.chain[1].data = "I am hacker";

// Kiểm tra chain một lần nữa
console.log("Blockchain valid? " + myChain.isChainValid());
```
Và đây là kết quả: 
```
Blockchain valid? true
Changing a block...
Blockchain valid? false
```
Như vậy, Blockchain của chúng ta sau khi cố gắng thay đổi một block đã không còn hợp lệ nữa.
# Kết luận
Thực tế thì việc triễn khai một blockchain ở trên là chưa hoàn thiện. Nó không thực hiện proof-of-work hoặc một mạng P2P để giao tiếp với các miner khác. Tuy nhiên nó khái quát 1 cách đơn giản làm thế nào để một blockchain hoạt động. Nhiều người nghĩ rằng nó rất phức tạp, nhưng bài viết này chứng tỏ rằng các khái niệm cơ bản của một blockchain dễ hiểu và dễ thực hiện. Trong bài viết tiếp theo chúng ta sẽ tìm hiểu về `proof-of-work` và cách thực hiện chúng như thế nào. Bài viết được tham khảo ở [link](https://www.savjee.be/2017/07/Writing-tiny-blockchain-in-JavaScript/) này.