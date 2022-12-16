### **Giới thiệu**


Blockchain là công nghệ đằng sau những đồng tiền điện tử phổ biến trong đó bao gồm Bitcoin, Ethereum , Cardano v.v . Khái niệm chính đằng sau Blockchain là cung cấp cuốn sổ cái phân tán mà không được kiểm soát bởi bất kỳ một bên trung tâm nào . Thông tin trong Blockchain không thể bị thay đổi và chỉ được bổ sung thêm khi có sự đồng thuận của tất cả các nút trong hệ thống. Đây là một hệ thống bảo mật an toàn cao trước khả năng bị đánh cắp dữ liệu ngay cả khi một phần của hệ thống Blockchain sụp đổ, những máy tính và các nút khác sẽ tiếp tục bảo vệ thông tin và giữ cho mạng lưới tiếp tục hoạt động.

Trong bài viết này, mình sẽ xây dựng một hệ thống Blockchain rất cơ bản trong Swift 4.

### **Block**

Nền tảng của Blockchain là cấu trúc dữ liệu được gọi là “block” . Cấu trúc này sẽ lưu trữ thông tin quan trọng . Ví dụ Bitcoin Blocks lưu trữ các giao dịch của [satoshis](https://bitcoinvietnamnews.com/satoshi-la-gi) thông qua các địa chỉ . Tuy nhiên chúng ta có thể lưu trữ mọi thứ chúng ta muốn : Số phiếu từ một cuộc bầu cử dân chủ , hợp đồng pháp lý , hồ sơ về ngày sinh , hộ chiếu …. không lâu nữa chúng ta sẽ lưu trữ mọi thông tin quan trọng trong block chain 🤓
   
Chúng ta xây dựng một block như thế nào ? Ta cần một số dữ liệu quan trọng như giao dịch , mốc thời gian để biết khi nào block đã được tạo , một **hash** cho block trước và một **hash** cho block hiện tại .
    
```
struct Block {
let timestamp: Date
let data: String
let previousBlockHash: Int
let hash: Int
}
```

Vậy **previousBlockHash** và **hash** là gì ? Nó là một phần quan trọng nhất của hệ thống Blockchain ,nhưng ở bài viết này tôi sẽ không đề cập đến nó . Thay vào đó tôi sẽ thực hiện ví dụ đơn giản cho nó và sẽ đề cập nó vào bài viết tiếp theo . Bây giờ , hãy nghĩ rằng các **hash** này là cách để liên kết các block với nhau .

Hãy tính toán một **hash** cơ bản :

```
struct Block {
    
    init(timestamp: Date, data: String, previousBlockHash: Int) {
        
        self.timestamp = timestamp
        self.data = data
        self.previousBlockHash = previousBlockHash
        
      // For now lets just get some fields, concatenate them, and calculate a hash
        let basicHash = String(previousBlockHash) + data + String(timestamp.timeIntervalSince1970)
        hash = basicHash.hashValue
    }
    
    let timestamp: Date
    let data: String
    let previousBlockHash: Int
    let hash: Int
}
```

Và đó chúng ta có Block đầu tiên 🚀!

### **Blockchain**

Về bản chất một blockchain (chuỗi khối) là một danh sách đã được sắp xếp và được móc nối liên kết với nhau . Cấu trúc này cho chúng ta khả năng get được block cuối cùng một cách hiệu quả và tìm thấy bất cứ block nào thông qua **hash** của chính nó .

Chúng ta có thể thực thi một Blockchain trong Swfit 4 sử dung **Set<Block>** để lưu trữ các block và một mảng **Array<Int>** để lưu trữ các block **hash** trong một danh sách theo thứ tự . Nhưng hiện tại chúng ta không cần khả năng để get các block hiểu quả , vì vậy chỉ cần sử dụng một **Array**. 
    
```
struct Blockchain {
    var blocks: [Block]
}
```

Nó thật dễ dàng phải không nào 😱 
Well…hãy nhớ rằng đây là một hệ thống Blockchain cơ bản .

Hãy thêm khả năng add block :

```
struct Blockchain {
    
    var blocks = [Block]()
    
    mutating func addBlock(_ data: String) {
        guard let lastBlock = blocks.last else { fatalError("Failed to find genesis block.") }
        let newBlock = Block(timestamp: Date(), data: data, previousBlockHash: lastBlock.hash)
        blocks.append(newBlock)
    }
}
```

Nhưng nếu danh sách block trống thì sao ??

Phải rồi , để thêm một block mới và liên kết tới **previousblockHash** chúng ta cần một block . Vậy, Cái gì có trước ? 🐓 or 🥚

The Block : Chúng ta cần một khối ban đầu được gọi là [Genesis Block](https://bitcoinvietnamnews.com/genesis-block-la-gi), Thông thường nó sẽ được hardcode và có thể thực hiện như sau :

```
func NewGenesisBlock() -> Block {
     return Block(timestamp: Date(), data: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks", previousBlockHash: 0)
}
```

Dữ liệu của block đầu tiên có thể là bất cứ thứ gì , trong ví dụ này chúng ta thêm comment[ Genesis Block của Bitcoin ](https://blockchain.info/block-index/14849).

Giờ chúng ta đã có đủ mọi thứ và có thể tạo Blockchain đầu tiên của mình :

```
import Foundation

struct Block {
    
    init(timestamp: Date, data: String, previousBlockHash: Int) {
        
        self.timestamp = timestamp
        self.data = data
        self.previousBlockHash = previousBlockHash
        
        // Simpified version, blockchain uses a proof of work.
        let basicHash = String(previousBlockHash) + data + String(timestamp.timeIntervalSince1970)
        hash = basicHash.hashValue
    }
    
    let timestamp: Date // to know when this block was created
    let data: String // Important data that we want to record
    let previousBlockHash: Int // Linked to the previous block
    let hash: Int // Hash of the current block
    
    // Hardcoded the cration of the first block.
    static func NewGenesisBlock() -> Block {
        return Block(timestamp: Date(), data: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks", previousBlockHash: 0)
    }
}

struct Blockchain {
    
    // Add the first block called genesis
    init(genesis: Block) {
        blocks = [Block]()
        blocks.append(genesis)
    }
    
    // Back-linked, ordered list of blocks
    var blocks: [Block]
    
    // Add a new record
    mutating func addBlock(_ data: String) {
        guard let lastBlock = blocks.last else { fatalError("Failed to find genesis block.") }
        let newBlock = Block(timestamp: Date(), data: data, previousBlockHash: lastBlock.hash)
        blocks.append(newBlock)
    }
}
```

### **Hãy thử nghiệm nó !**

```
var blockchain = Blockchain(genesis: Block.NewGenesisBlock())

blockchain.addBlock("Satoshi send 50 BTC to Matias")
blockchain.addBlock("Matias send 2 BTC to Hal Finney")

for block in blockchain.blocks {
    print(block.data)
}

// Result
The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
Satoshi send 50 BTC to Matias
Matias send 2 BTC to Hal Finney
```

### **Tổng kết**

Chúng ta vừa xây dựng một hệ thống Blockchain rất cơ bản . Blockchain thực tế thì phức tạp hơn nhiều . Về Cơ bản việc thêm thêm các khối mới yêu cầu một số tính toán khá nặng . Đây được gọi là [Proof of Work](https://bigcoinvietnam.com/proof-of-work-la-gi-cac-diem-uu-viet-va-mat-han-che) . Mình sẽ đề cập nó ở bài viết tới 

Thanks for watching <3