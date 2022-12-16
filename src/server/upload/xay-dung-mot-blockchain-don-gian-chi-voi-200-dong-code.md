![](https://images.viblo.asia/e20d8de1-f66b-4567-b08a-45fd2e5068d5.png)

### Bài viết được dịch từ [A blockchain in 200 lines of code](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54) (có bổ sung phần demo)

Blockchain có thể hiểu một cách đơn giản là một cơ sở dữ liệu phân tán duy trì một danh sách các bản ghi theo thứ tự. Tuy nhiên, rất dễ bị lẫn lộn vì thông thường khi chúng ta nói về blockchain, chúng ta cũng nói về những vấn đề chúng ta đang cố gắng giải quyết với chúng. Đó là trường hợp trong các nền tảng dựa trên blockchain phổ biến như Bitcoin và Ethereum. Thuật ngữ blockchain thường được liên kết chặt chẽ với các khái niệm như giao dịch, hợp đồng thông minh hoặc tiền điện tử.

Điều này làm cho việc hiểu blockchain trở thành một nhiệm vụ khó khăn hơn. Hôm nay, tôi sẽ triển khai một blockchain đơn giản trong 200 dòng Javascript mang tên là NaiveChain.

## Cấu trúc block

![](https://images.viblo.asia/240a83cc-9a03-4dc7-8094-b0d8a62da41e.png)

```javascript
class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}
```

## Block Hash

Một block cần được tính giá trị băm để đảm bảo tính toàn vẹn. Hàm băm SHA-256 được sử dụng ở đây. 

```javascript
var generateNextBlock = (blockData) => {
    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};
```

## Tạo một block

Để tạo một block ta cần biết giá trị băm của block trước đó và thêm một số thông tin cho block mới như index, timeStamp, giá trị băm, data. 

```javascript
var generateNextBlock = (blockData) => {
    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};
```

## Lưu trữ dữ liệu trong block

Mảng trong Javascript được sử dụng để lưu trữ dữ liệu blockchain. Block đầu tiên của blockchain được gọi là block nguyên thủy (genesis block), block này được mã hóa cứng.

```javascript
var getGenesisBlock = () => {
    return new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};

var blockchain = [getGenesisBlock()];
```

## Xác thực một block

Tại bất kỳ thời điểm nào, chúng ta cũng có thể xác nhận một block hoặc một chuỗi các block là hợp lệ. Đoạn mã ở duới được áp dụng khi nhận được các block mới từ các nút khác và phải quyết định có chấp nhận chúng hay không.

```javascript
var isValidNewBlock = (newBlock, previousBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};
```

## Chọn chuỗi hợp lệ

Việc xảy ra phân nhánh (fork) ở trong một mạng blockchain là điều khó tránh khỏi, để quyết định xem chuỗi block nào là hợp lệ, chúng tôi chọn quy tắc lấy chuỗi dài nhất làm chuỗi hợp lệ (giống như trong mạng Bitcoin).

![](https://images.viblo.asia/51ad3cb5-6994-4fb7-9446-1e2b4bc86942.png)

```javascript
var replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcast(responseLatestMsg());
    } else {
        console.log('Received blockchain invalid');
    }
};
```

## Giao tiếp với các nút khác trong mạng

Nhiệm vụ của một nút trong mạng là chia sẻ và đồng bộ hóa cơ sở dữ liệu với các nút khác. Các quy tắc sau đây được đặt ra để giữ sự đồng bộ trong mạng blockchain.
* Khi một nút tạo một block mới, nó broadcast block lên mạng
* Khi một nút kết nối với một nút mới, nó truy vẫn xem block mới nhất của nút đó là gì ?
* Khi một nút nhận được một block có chỉ số lớn hơn block mới nhất mà nó có, nó sẽ xác thực và thêm block đó vào cơ sở dữ liệu của mình

![](https://images.viblo.asia/a7c5138a-2b8f-4512-9160-9b3e82615491.png)

Không có cơ chế tự động kết nối các nút với nhau. Để kết nối đến một nút khác, ta phải thêm url một cách thủ công.

## Quản lý nút

Người dùng phải có khả năng kiểm soát nút theo một cách nào đó. Điều này được thực hiện bằng cách thiết lập một máy chủ HTTP.

```javascript
var initHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
    app.post('/mineBlock', (req, res) => {
        var newBlock = generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    app.get('/peers', (req, res) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers([req.body.peer]);
        res.send();
    });
    app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};
```

Đoạn code có trên cho phép người dùng có thể truy vấn, tương tác với mạng blockchain:
*  Lấy danh sách tất cả các block
*  Tạo một block mới và broadcast nó lên mạng
*  Lấy danh sách các nút đang liên kết với nút hiện tại và thêm nút liên kết mới

Cách đơn giản nhất để tương tác với nút là với Curl, ví dụ như lấy danh sách tất cả các block:

```bash
curl http://localhost:3001/blocks
```

## Kiến trúc

NaiveChain gồm có 2 server:
* HTTP Server để người dùng có thể quản lý, kiếm soát nút
* Websocket HTTP Server dành cho kết nối P2P giữa các nút

![](https://images.viblo.asia/1678cea5-31b8-426e-b853-afe12c43e878.png)

## Demo

Mã nguồn của NaiveChain được lưu trữ tại [Đây](https://github.com/lhartikk/naivechain)

```bash
git clone https://github.com/lhartikk/naivechain.git
```

```bash
cd naivechain
```

```bash
npm install 
```

Thiết lập 2 nút kết nối với nhau (Mở 2 cửa số dòng lệnh)

```bash
HTTP_PORT=3001 P2P_PORT=6001 npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
```

```bash
HTTP_PORT=3001 P2P_PORT=6001 npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
```

Khởi tạo block nguyên thủy (genesis block)

```bash
curl -H "Content-type:application/json" --data '{"data" : "This is genesis block of Naivechain"}' http://localhost:3001/mineBlock
```

Lấy thông tin về danh sách các block

```bash
curl http://localhost:3001/blocks
```

Ta sẽ có được thông tin về các block có trong mạng blockchain (ở đây chỉ mới có block nguyên thủy)

![](https://images.viblo.asia/112c5579-d904-49cf-aa07-3583301a0cb6.png)

## Kết luận

NaiveChain được tạo ra cho mục đích trình diễn và học tập. Nó không có các thuật toán đồng thuận (như Proof-of-work hoặc Proof-of-Stake) và cũng chưa thể chạy như một mạng public cho nhiều người cùng tham gia. Tuy nhiên, Naivechain cũng đã mô tả được những tính năng cơ bản nhất mà một mạng blockchain cần có. Hy vọng sau bài viết này, mọi người đã có cái nhìn chi tiết hơn về blockchain qua những dòng code trực quan, thay vì lý thuyết nhàm chán.