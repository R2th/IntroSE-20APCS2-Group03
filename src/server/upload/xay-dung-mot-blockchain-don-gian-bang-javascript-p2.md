Trong bài viết trước, chúng ta đã [xây dựng một blockchain đơn giản bằng Javascript](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-bang-javascript-Qbq5QLE3lD8) để minh họa cách hoạt động của một blockchain. Tuy nhiên, nó thực sự vẫn chưa hoàn chỉnh, và vẫn rất dễ dàng bị tấn công thay đổi dữ liệu. Blockchain cần một cơ chế khác để bảo vệ bản thân khỏi các cuộc tấn công. Vì vậy, chúng ta hãy xem làm thế nào để có thể làm điều đó!
# Vấn đề

Chúng ta đã có thể tạo các block và thêm chúng vào blockchain một cách nhanh chóng, tuy nhiên nó có 3 vấn đề sau:
* Thứ nhất, mọi người có thể tạo các block cực kỳ nhanh chóng và spam blockchain của chúng ta. Nó có thể trở nên quá tải và sẽ làm cho nó không thể sử dụng được.
* Thứ hai, bởi vì nó rất dễ dàng để tạo ra một block hợp lệ, mọi người có thể thay đổi dữ liệu trong các block và sau đó chỉ cần tính toán lại các hash cho các block sau đó. Cuối cùng chúng ta vẫn có một blockchain hợp lệ mặc dù nó đã bị người khác thay đổi dữ liệu.
* Thứ ba, kết hợp với hai vấn đề trên, blockchain được hỗ trợ bởi một mạng ngang hàng (peer-to-peer), trong đó các node sẽ thêm các block vào chuỗi dài nhất có sẵn. Vì vậy, bạn có thể giả mạo với một block, tính toán lại tất cả các block khác và sau đó thêm bao nhiêu block tùy thích. Sau đó bạn sẽ kết thúc với chuỗi dài nhất và tất cả các node khác sẽ chấp nhận nó và bắt đầu thêm các block riêng của họ vào đó.

Rỏ ràng chúng ta cần một giải pháp cho các vấn đề này. Đó là `proof-of-work`. 
# Proof-of-work là gì?
Thực tế thì proof-of-work (PoW) là một thuật toán đã có trước khi Blockchain ra đời. Nó là một kỹ thuật nhằm ngăn chặn spam và giả mạo bằng cách yêu cầu một lượng lớn công việc tính toán nhất định. Việc muốn cố ý thay đổi dữ liệu bên trong blockchain sẽ không còn có ý nghĩa nếu như nó đòi hỏi cần phải có một sức mạnh tính toán rất lớn.

Để làm được điều này, blockchain thêm một giá trị `nonce` vào mỗi block. Đây là một số được tăng lên cho đến khi tìm thấy một hash thỏa mãn `một điều kiện nhất định nào đó (chúng ta gọi là độ khó)`. Nói một cách đơn giản số nonce là đáp án cho một bài toán, và đáp án này phải khó để có thể giải ra nhưng lại rất dễ dàng để kiểm tra nó bởi bất kỳ ai trong mạng lưới. Tìm kiếm một hash hợp lệ để tạo một khối mới cũng được gọi là `mining` trong thế giới crypto.
# Thực hiện
Vậy làm thế nào để thực hiện nó? Hãy bắt đầu bằng cách sửa đổi `class Block` và thêm biến `nonce` trong hàm tạo của nó. Chúng ta sẽ khởi tạo giá trị cho nó là 0.
```
constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
}
``` 
Chúng ta cần một method mới để tăng số nonce cho đến khi chúng ta tìm ra hash hợp lệ dựa vào độ khó của nó. Trong Bitcoin thì độ khó của nó chính là yêu cầu Hash của một block phải bắt đầu bằng những số 0. Càng nhiều số 0 thì độ khó càng cao, thời gian tính toán sẽ lâu hơn. Chúng ta hãy làm tương tự:
```
mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
}
```
Tất nhiên chúng ta cũng cần thay đổi hàm `calculateHash()` vì cần phải đưa vào số `nonce` vào cho việc tính toán Hash.
```
calculateHash() {
    return SHA256(this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
}
```
Bây giờ chúng ta sẽ có một `class Block` như sau:
```
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}
```
Bây giờ các block đã có số nonce và đã có thể được đào, chúng ta cũng phải cần sửa đồi `class Blockchain` một chút. Chúng ta sẽ set độ khó cho nó bằng cách khai báo một biến có tên là `difficulty` và gán giá trị cho nó là 2 (tức là Hash của các block sẽ bắt đầu bằng 2 số 0). 
```
constructor() {
    this.chain = [this.createFirstBlock()];
    this.difficulty = 2;
}
```
Cuối cùng là thay đổi hàm `addBlock()` để nó thực sự gọi là đào một block trước khi đưa vào chuỗi blockchain. 
```
addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
}
```
Vậy là Blockchain của chúng ta đã có `proof-of-work` để có thể chống người khác spam hoặc giả mạo nó.
# Testing
Bây giờ chúng ta sẽ test nó để chứng minh hiệu quả của `proof-of-work`. Chúng ta sẽ thêm 2 block vào chuổi giống như lần trước:
```
let myChain = new Blockchain();
myChain.addBlock(new Block(1, "20/07/2018", "block 2"));
myChain.addBlock(new Block(2, "20/07/2018", "block 3"));
```
Chúng ta có thể thấy rằng việc thêm các block đã chậm hơn lúc trước, tuy nhiên nó vẫn còn khá nhanh, bởi vì độ khó mà chúng ta đặt chỉ mới là 2. Nếu tăng độ khó lên 5, bạn sẽ thấy rằng nó mất khoảng 10 giây để có thể đào được một block. Đó chính là một sự bảo vệ trước những kẻ tấn công.
# Kết luận
`Proof-of-work` là điều cần thiết cho sự an toàn và tính toàn vẹn của blockchain. Không có nó, chúng ta không thể tin tưởng để  có thể lưu trữ thông tin ở đó. Tuy nhiên, nó vẫn không thiếu những điểm hạn chế, giả sử như cần tiêu thụ một lượng điện năng lớn để đào được block, hoặc cần một thiết bị đủ mạnh để có thể có đủ năng lực tính toán... Trong bài viết tiếp theo, chúng ta sẽ cùng tìm hiểu về `Transaction` và `Mining Reward`. Bài viết được tham khảo ở [link](https://www.savjee.be/2017/09/Implementing-proof-of-work-javascript-blockchain/) này.