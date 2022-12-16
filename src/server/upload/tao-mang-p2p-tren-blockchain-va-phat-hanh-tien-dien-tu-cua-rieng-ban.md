Chào các bạn.

Trong bài viết [Tự tạo Blockchain trong 60 dòng code Javascript ](https://viblo.asia/p/tu-tao-blockchain-trong-60-dong-code-javascript-1VgZvQN1KAw), mình đã hướng dẫn cách tạo blockchain trong 60 dòng Javascript.

Trong bài viết [Tạo Transaction, tiền thưởng Mining, Phí gas, Mint trên Blockchain với Javascript ](https://viblo.asia/p/tao-transaction-tien-thuong-mining-phi-gas-mint-tren-blockchain-voi-javascript-L4x5xJOaZBM), mình đã nói về cách tạo một hế thống giao dịch cho blockchain của mình.

Trong bài viết này, mình sẽ tạo bộ phận quan trọng nhất của blockchain - mạng p2p. Nó không chỉ cần thiết cho blockchain chúng ta hoạt động, mà sau khi xây dựng được mạng p2p, chúng ta sẽ có thể phát hành tiền điện tử của mình. Các bạn nên xem code của hai bài trước nhé vì code bài viết này liên quan đến code hai bài trước. Đây là phiên bản tiếng Việt của [bài viết gốc của mình trên dev.to](https://dev.to/freakcdev297/build-a-p2p-network-and-release-your-cryptocurrency-clf).

Mình đã làm video hướng dẫn thực hiện nội dung của bài viết này trên Youtube, các bạn cũng có thể xem để biết thêm thông tin chi tiết nhé: https://youtu.be/i0LW7SFPD4A

## Mạng p2p (peer-to-peer) là gì?
Trước hết, nó có nghĩa là "mạng ngang hàng".

Nhưng để hiểu rõ hơn về nó thì ta cần phải hiểu được mô hình `client-server` đã. Trong cuộc sống của chúng ta, gần như mọi thứ chúng ta đang dùng đều sử dụng mô hình này. Mạng theo mô hình này hoạt động bằng cách sử dụng `server`, và mọi máy của người dùng sẽ kết nối với server đó. Người dùng có thể gửi yêu cầu và server sẽ trả lại phản hồi. Hãy tưởng tượng nó như một công ti, với sếp là server, sếp là người quyết định và cũng là người điều kiển mọi hoạt động của công ti.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/22l5f9ehc4dq5y6rbmss.png)

Nhưng trong một mạng p2p, các máy (gọi là các `nodes`) có thể gửi tin nhắn cho nhau mà không cần bất kì bên thứ ba nào. Có thể lấy là ví dụ là một nhóm bạn làm việc cùng nhau. Mọi người có thể hoạt động một cách độc lập, quyết định sẽ được đưa ra theo số đông.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s3nc9o2goloh6ml7xth1.png) 


Trong một mạng lưới của tiền điện tử, mọi người ít nhất có thể gửi đi những giao dịch của mình và đề nghị thêm block mới.

Cùng code nào!

## Chúng ta cần những gì và làm như thế nào?
Ta sẽ cần một mạng nơi mà các node có thể kết nối với nhau và gửi tin nhắn cho các node khác trực tiếp với nhau. Sau đó, ta sẽ cho thêm các tính năng như gửi đi các giao dịch, đề nghị tạo block mới, gửi đi chain, gửi những thông tin của chain.

Mình sẽ sử dụng `WebSocket` - một TCP-based protocol, hãy đọc qua docs của nó để hiểu rõ hơn về những gì mình chuẩn bị làm nhé.

Ngoài ra, bạn nhớ đọc comments trong các đoạn code mình chuẩn bị viết nhé, mình sẽ sử dụng chúng để giải thích cách hoạt động của code.

## Setup
Mình sẽ sử dụng một thư viện tên là `ws` cho dễ dùng nhé.

Tải nó qua `npm`:
```
npm install ws
```

## Những khái niệm cơ bản của `ws`
```js
// Import package
const WS = require("ws");
// Khởi tạo một server
const server = new WS.Server({ port: "SOME PORT" });
// Nghe tín hiệu kết nối
server.on("connection", async (socket, req) => {
    // Event handler này sẽ được chạy mỗi khi một người kết nối với ta
});
// Lấy socket từ một địa chỉ
const socket = new WS("SOME ADDRESS");
// Kết nối với một node qua socket
socket.on("open", () => {
    // Event handler này sẽ được chạy khi ta kết nối với họ
})
// Chờ 
socket.on("close", () => {
    // Event handler này sẽ được chạy khi họ ngừng kết nối với ta
})
// Nghe các tin nhắn
socket.on("message", message => {
    // "message" chính là tin nhắn nhé
})
```

## Một node đơn giản
Tạo một file mới, đặt tên nó là gì cũng được nhé!

Chúng ta sẽ có những biến để chứa PORT, danh sách peers mà mình sẽ kết nối với (PEERS) và địa chỉ của chúng ta (MY_ADDRESS).

Mình sử dụng `process.env.abcxyz` để ta có thể cài đặt node một cách dễ dàng qua terminal.
```js
// Mình sẽ import những thứ cần thiết luôn nhé!
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const { Block, Transaction, JeChain } = require("./jechain");
const EC = require("elliptic").ec, ec = new EC("secp256k1");

const MINT_PRIVATE_ADDRESS = "0700a1ad28a20e5b2a517c00242d3e25a88d84bf54dce9e1733e6096e6d6495e";
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, "hex");
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

// Key pair của mình
const privateKey = process.env.PRIVATE_KEY || "62d101759086c306848a0c1020922a78e8402e1330981afe9404d0ecc0a4be3d";
const keyPair = ec.keyFromPrivate(privateKey, "hex");
const publicKey = keyPair.getPublic("hex");

// Code mới
const WS = require("ws");

const PORT = process.env.PORT || 3000;
const PEERS = process.env.PEERS ? process.env.PEERS.split(",") : [];
const MY_ADDRESS = process.env.MY_ADDRESS || "ws://localhost:3000";
const server = new WS.Server({ port: PORT });

console.log("Listening on PORT", PORT);

// Dòng này để báo lỗi nếu có nhé!
process.on("uncaughtException", err => console.log(err));
```

Address dùng để mint cũng không nên bị thay đổi, và chúng ta sẽ thay đổi genesis block cũ luôn:
```js
const initalCoinRelease = new Transaction(MINT_PUBLIC_ADDRESS, "04719af634ece3e9bf00bfd7c58163b2caf2b8acd1a437a3e99a093c8dd7b1485c20d8a4c9f6621557f1d583e0fcff99f3234dd1bb365596d1d67909c270c16d64", 100000000);
```

Ta sẽ release coin và nạp vào tài khoản một người (chính chúng ta) với địa chỉ trên (nó cũng chính từ private key này: `62d101759086c306848a0c1020922a78e8402e1330981afe9404d0ecc0a4be3d`)

Nhớ thay key pair cho minting với cái mới nữa nhé!

Bây giờ, hãy tạo một hệ thống để kết nối với các node khác, cũng như nghe tín hiệu kết nối từ các node khác.

Để tạo hệ thống này, ta cần một hàm để kết nối và sử dụng `server.on("connection")` để nghe những tín hiệu ấy.

Hàm `connect` cần có thể kết nối với một địa chỉ, gửi cho nó địa chỉ của ta, sau đó connection handler của địa chỉ đó sẽ kết nối với địa chỉ của ta qua tin nhắn trước.

Tin nhắn là một chuỗi, trong trường hợp này là JSON, và sẽ có cấu trúc như thế này:
```json
{
    "type": "...",
    "data": "..."
}
```

Thứ mà mình cần là:
```json
{
    "type": "TYPE_HANDSHAKE",
    "data": ["Địa chỉ của ta và địa chỉ các node ta đã kết nối", "địa chỉ x", "địa chỉ y"]
}
```

Mình sẽ tạo ra một hàm để tạo ra các tin nhắn cho tiện nhé:
```js
function produceMessage(type, data) {
    return { type, data }
}
``` 

Bây giờ, hãy cùng tạo hệ thống chính nào!
```js
// THE CONNECTION LISTENER
server.on("connection", async(socket, req) => {
    // Nghe những tin nhắn
    socket.on("message", message => {
        // Parse JSON sang object
        const _message = JSON.parse(message);

        switch(_message.type) {
            case "TYPE_HANDSHAKE":
                const nodes = _message.data;

                nodes.forEach(node => connect(node))

            // Ta sẽ cần phải xử lí nhiều loại tin nhắn hơn nên mình sử dụng switch-case cho tiện nhé!
        }
    })
});

// THE CONNECT FUNCTION
async function connect(address) {
    // Lấy socket từ địa chỉ
    const socket = new WS(address);

    // Kết nối với địa chỉ đó
    socket.on("open", () => {
        // Gửi cho họ địa chỉ của ta
        socket.send(JSON.stringify(produceMessage("TYPE_HANDSHAKE", [MY_ADDRESS])));
    });
}
```

Để thực sự có thể làm gì đó trong tương lai, chúng ta sẽ cần lưu những socket và địa chỉ này vào một array. Ngoài ra, nó giúp cho ta có thể gửi cho những node khác địa chỉ của các node mà ta đã kết nối.

```js
let opened = [], connected = [];
// Mình sẽ lưu địa chỉ và socket vào opened, địa chỉ vào connected.

async function connect(address) {
    // Chúng ta sẽ chỉ kết nối với các node mà ta chưa kết nối, và ta cũng không được tự kết nối với bản thân
    if (!connected.find(peerAddress => peerAddress === address) && address !== MY_ADDRESS) {
        const socket = new WS(address);

        socket.on("open", () => {
            // Mình sẽ sử dụng spread operator để cho tất cả các địa chỉ của các node đã kết nối vào nội dung của tin nhắn rồi gửi nó đi.
            socket.send(JSON.stringify(produceMessage("TYPE_HANDSHAKE", [MY_ADDRESS, ...connected])));
            
            // Chúng ta nên cho những node mà ta đã kết nối địa chỉ của node này và bảo hộ kết nối với nó.
            opened.forEach(node => node.socket.send(JSON.stringify(produceMessage("TYPE_HANDSHAKE", [address]))));

            // Chúng ta sẽ push vào "opened" nếu chúng ta chưa từng kết nối với nó
            if (!opened.find(peer => peer.address === address) && address !== MY_ADDRESS) {
                opened.push({ socket, address });
            }

            // Chúng ta sẽ push vào "opened" nếu chúng ta chưa từng kết nối với nó
            if (!connected.find(peerAddress => peerAddress === address) && address !== MY_ADDRESS) {
                connected.push(address);
            }

            // Hai lệnh if trên dùng để khắc phục code chạy bất đồng bộ. Vì chúng chạy đồng thời, nên lệnh if đầu tiên
            // có thể bị vượt qua một cách dễ dàng, từ đó sinh ra sự lặp lại không đáng có.
        });
        
        // Khi họ ngắt kết nối, ta sẽ xóa địa chỉ họ khỏi connected và opened.
        socket.on("close", () => {
            opened.splice(connected.indexOf(address), 1);
            connected.splice(connected.indexOf(address), 1);
        });
    }
}
```

Để kết nối với các peer trong `PEERS`, bạn có thể cho thêm đoạn code này vào:
```js
PEERS.forEach(peer => connect(peer));
```

## Sử dụng blockchain trong network vừa tạo
### Ta cần phải làm gì?
Bây giờ, ta đã tạo được một node đơn giản, bây giờ hãy cùng đào sâu vào phần chính của bài viết - tạo tiền ảo. Để tạo một đồng tiền ảo, ta cần có thể gửi đi các giao dịch và đề nghị các block mới. Các node mới tham gia vào network cũng cần có khả năng để xin chain từ các node khác. 

### 0. Những thứ cần thiết
Vì khi ta gửi đi những tin nhắn, ta sẽ parse object sang JSON, tức là các method của 1 object (trong trường hợp này là các giao dịch, blocks, blockchains) sẽ biến mất. Chúng ta có thể khắc phục vấn đề này bằng cách làm các method static để ta có thể sử dụng chúng mà không cần động đến các objects.

Và trong bài viết trước, method xác thực của các block và các giao dịch không thực sự ổn, nên hãy cùng update chúng nào!

```js
    static hasValidTransactions(block, chain) {
        let gas = 0, reward = 0;

        block.data.forEach(transaction => {
            if (transaction.from !== MINT_PUBLIC_ADDRESS) {
                gas += transaction.gas;
            } else {
                reward = transaction.amount;
            }
        });

        return (
            reward - gas === chain.reward &&
            block.data.every(transaction => Transaction.isValid(transaction, chain)) && 
            block.data.filter(transaction => transaction.from === MINT_PUBLIC_ADDRESS).length === 1
        );
    }
```

```js
    static isValid(blockchain) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            if (
                currentBlock.hash !== Block.getHash(currentBlock) || 
                prevBlock.hash !== currentBlock.prevHash || 
                !Block.hasValidTransactions(currentBlock, blockchain)
            ) {
                return false;
            }
        }

        return true;
    }
```

```js
    static isValid(tx, chain) {
        return ( 
            tx.from && 
            tx.to && 
            tx.amount && 
            (chain.getBalance(tx.from) >= tx.amount + tx.gas || tx.from === MINT_PUBLIC_ADDRESS) && 
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
        )
    }
```

```js
    static getHash(block) {
        return SHA256(block.prevHash + block.timestamp + JSON.stringify(block.data) + block.nonce);
    }
```

#### Các method liên quan
```js
    constructor(timestamp = Date.now().toString(), data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.hash = Block.getHash(this);
        this.nonce = 0;
    }
```

```js
    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = Block.getHash(this);
        }
    }
```

```js
    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = Block.getHash(block);
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }
```

```js
    addTransaction(transaction) {
        if (Transaction.isValid(transaction, this)) {
            this.transactions.push(transaction);
        }
    }
```

### 1. Giao dịch
Đầu tiên, mình sẽ tạo function `sendMessage` để gửi tin nhắn cho các node khác dễ hơn.

```js
function sendMessage(message) {
    opened.forEach(node => {
        node.socket.send(JSON.stringify(message));
    });
}
```

Bây giờ, ta sẽ xử lí các loại tin nhắn.

Một tin nhắn giao dịch sẽ trông như sau:
```json
{
    "type": "TYPE_CREATE_TRANSACTION",
    "data": "transaction ở đây"
}
```

Trong message handler, ta sẽ tạo một case mới để xử lí tin nhắn này. Nó sẽ sử dụng hàm `addTransactions` ta đã tạo từ những bài trước.
```js
        switch(_message.type) {
            ...
            case "TYPE_CREATE_TRANSACTION":
                const transaction = _message.data;

                JeChain.addTransaction(transaction);

                break;
        }
```

Ta có thể gửi tin nhắn như sau:
```js
sendMessage(produceMessage("TYPE_CREATE_TRANSACTION", someTransaction));
// Ta cũng phải cho transaction đó vào pool của ta:
JeChain.addTransaction(someTransaction);
```

### 2. Đào và gửi các block mới
Bây giờ, ta sẽ xử lí các tin nhắn gửi block.

Đây là phần khó và cồng kềnh nhất, nên cùng bắt đầu nào!

Tin nhắn ấy sẽ trông như thế này:
```json
{
    "type": "TYPE_REPLACE_CHAIN",
    "data": [
        "block mới",
        "difficulty mới"
    ]
}
```

Ta sẽ sử lý tin nhắn này ra sao? Trước hết, ta sẽ phải xác thực block, sau đó ta sẽ cho nó vào chain và đổi độ khó. Một block được xác thực theo các tiêu chí:
- Nó có các giao dịch hợp lệ (tồn tại trong pool và check qua `isValid`).
- Nó có hash hợp lệ (match với những thông tin của block).
- Nó có difficulty hợp lệ (không thể hơn hoặc kém 1 so với difficulty trước). Đây
- Nó có mốc thời gian hợp lệ (không thể lớn hơn mốc thời gian họ gửi ta và không thể bé hơn mốc thời block trước được tạo).

```js
        switch(_message.type) {
            ...
            case "TYPE_REPLACE_CHAIN":
                const [ newBlock, newDiff ] = _message.data;

                // Ta đang kiểm tra xem các giao dịch có tồn tại trong pool hay không bằng cách xóa bỏ đi các phần tử ở trong pool
                // Sau đó, ta dùng `theirTx.length === 0` để check xem các elements đã được xóa hết chưa (hay các giao dịch đều ở trong pool)
                const ourTx = [...JeChain.transactions.map(tx => JSON.stringify(tx))];
                const theirTx = [...newBlock.data.filter(tx => tx.from !== MINT_PUBLIC_ADDRESS).map(tx => JSON.stringify(tx))];
                const n = theirTx.length;

                if (newBlock.prevHash !== JeChain.getLastBlock().prevHash) {
                    for (let i = 0; i < n; i++) {
                        const index = ourTx.indexOf(theirTx[0]);

                        if (index === -1) break;
                        
                        ourTx.splice(index, 1);
                        theirTx.splice(0, 1);
                    }

                    if (
                        theirTx.length === 0 &&
                        SHA256(JeChain.getLastBlock().hash + newBlock.timestamp + JSON.stringify(newBlock.data) + newBlock.nonce) === newBlock.hash &&
                        newBlock.hash.startsWith(Array(JeChain.difficulty + 1).join("0")) &&
                        Block.hasValidTransactions(newBlock, JeChain) &&
                        (parseInt(newBlock.timestamp) > parseInt(JeChain.getLastBlock().timestamp) || JeChain.getLastBlock().timestamp === "") &&
                        parseInt(newBlock.timestamp) < Date.now() &&
                        JeChain.getLastBlock().hash === newBlock.prevHash &&
                        (newDiff + 1 === JeChain.difficulty || newDiff - 1 === JeChain.difficulty)
                    ) {
                        JeChain.chain.push(newBlock);
                        JeChain.difficulty = newDiff;
                        JeChain.transactions = [...ourTx.map(tx => JSON.parse(tx))];
                    }
                }

                break;
        }
```

Nhưng hóa ra, còn có một vấn đề khá nguy hiểm. Nếu một miner đào được một block, họ sẽ không biết block của họ có trước hay các block được đào khác có trước. Yes, vấn đề này vẫn xảy ra qua nhiều tác động, một trong số đó là mạng. Nếu một ai khác đào được block trước bạn và họ đã gửi block cho các node khác rồi, nhưng do một số vấn đề internet, bạn có thể đào xong trước khi message được gửi, nên block mới đó sẽ bị bỏ nhưng bạn sẽ bị bỏ lại phía sau.

Có nhiều cách khắc phục vấn đề này nhưng mình đã nghĩ ra một cách sử dụng ý kiến số đông.

Ta có thể build tính năng này bằng cách sử dụng một biến boolean `checking` và hàm `setTimeout`. Đơn giản là ta sẽ xem xem prevHash của block này có bằng với của block mới nhất hay không, nếu có, thì nó là block cần kiểm tra. Ta sẽ đặt `checking` thành `true` để chỉ rằng ta đang thực hiện quy trình kiểm tra, sau đó, ta sẽ yêu cầu các node khác block mới nhất của họ. Ta sẽ chờ một lúc (mình set là 5s) bằng `setTimeout`, tiếp đó, ta sẽ thay `checking` thành` false`, hủy quy trình này, và block xuất hiện nhiều nhất khả năng cao là block chuẩn. Mình cũng sẽ tạo một hệ thống để skip qua các block giống nhau khi đã có block đúng.

```js
let check = [];
let checked = [];
let checking = false;

...

                if (newBlock.prevHash !== JeChain.getLastBlock().prevHash) {
                    ...
                  // Nếu trường hợp này chưa tồn tại thì ta sẽ tiến hành check
                } else if (!checked.includes(JSON.stringify([newBlock.prevHash, JeChain.chain[JeChain.chain.length-2].timestamp || ""]))) {
                    checked.push(JSON.stringify([JeChain.getLastBlock().prevHash, JeChain.chain[JeChain.chain.length-2].timestamp || ""]));

                    const position = JeChain.chain.length - 1;

                    checking = true;

                    sendMessage(produceMessage("TYPE_REQUEST_CHECK", MY_ADDRESS));

                    setTimeout(() => {
                        checking = false;

                        let mostAppeared = check[0];

                        check.forEach(group => {
                            if (check.filter(_group => _group === group).length > check.filter(_group => _group === mostAppeared).length) {
                                mostAppeared = group;
                            }
                        })

                        const group = JSON.parse(mostAppeared)

                        JeChain.chain[position] = group[0];
                        JeChain.transactions = [...group[1]];
                        JeChain.difficulty = group[2];

                        check.splice(0, check.length);
                    }, 5000);
                }
```

Nên nhớ rằng đoạn code trên như là một phương pháp thử nghiệm, nếu check xem block có xác thực hay không thì sẽ ổn hơn. Ngoài ra, cũng có nhiều cách clean và safe hơn cách này, nhưng tạm thời cách này hoạt động ổn.

Hãy tạo một handler cho `TYPE_REQUEST_CHECK`, ta sẽ gửi về `TYPE_SEND_CHECK` ngay sau đó. Hãy cùng tạo chúng nào!

Message đó sẽ có cấu trúc:
```json
{
    "type": "TYPE_REQUEST_CHECK",
    "data": "địa chỉ để gửi lại"
}
```

```json
{
    "type": "TYPE_SEND_CHECK",
    "data": ["block", "transaction pool", "difficulty"]
}
```

Handler:
```js
            case "TYPE_REQUEST_CHECK":
                // Tìm địa chỉ và gửi về thông tin cần thiết
                opened.filter(node => node.address === _message.data)[0].socket.send(
                    JSON.stringify(produceMessage(
                        "TYPE_SEND_CHECK",
                        JSON.stringify([JeChain.getLastBlock(), JeChain.transactions, JeChain.difficulty])
                    ))
                );

                break;
```

```js
            case "TYPE_SEND_CHECK":
                // Chỉ push nếu ta đang mở yêu cầu check
                if (checking) check.push(_message.data);

                break;
```

Vì handler đã xong rồi, nên bạn có thể mine block như thế này:
```js
if (JeChain.transactions.length !== 0) {
    // Nhớ rằng bạn có thể mine giao dịch bạn thích, nhưng mình sẽ mine tất luôn nhé!
    JeChain.mineTransactions(publicKey);

    sendMessage(produceMessage("TYPE_REPLACE_CHAIN", [
        JeChain.getLastBlock(),
        JeChain.difficulty
    ]));
}
```

### 3. Gửi chain
Với các node vừa mới tham gia vào network, có hai cách để lấy chain hiện tại. Ta có thể lấy chain từ một nguồn đáng tin, hoặc hỏi trong mạng. Nhớ rằng size của tin nhắn bị giới hạn, nên chúng ta sẽ không thể gửi một lúc cả chain được, nên chúng ta sẽ gửi từng block một cũng như những thông tin của chain.

Ta có thể sử dụng theo cách thứ hai như sau:
```js
let tempChain = new Blockchain();
...

            case "TYPE_SEND_CHAIN":
                const { block, finished } = _message.data;

                if (!finished) {
                    tempChain.chain.push(block);
                } else {
                    tempChain.chain.push(block);

                    if (Blockchain.isValid(tempChain)) {
                        JeChain.chain = tempChain.chain;
                    }

                    tempChain = new Blockchain();
                }

                break;


            case "TYPE_REQUEST_CHAIN":
                const socket = opened.filter(node => node.address === _message.data)[0].socket;
                 
                for (let i = 1; i < JeChain.chain.length; i++) {
                    socket.send(JSON.stringify(produceMessage(
                        "TYPE_SEND_CHAIN",
                        {
                            block: JeChain.chain[i],
                            finished: i === JeChain.chain.length - 1
                        }
                    )));
                }

                break;

            case "TYPE_REQUEST_INFO":
                opened.filter(node => node.address === _message.data)[0].socket.send(JSON.stringify(produceMessage(
                    "TYPE_SEND_INFO",
                    [JeChain.difficulty, JeChain.transactions]
                )));

                break;

            case "TYPE_SEND_INFO":
                [ JeChain.difficulty, JeChain.transactions ] = _message.data;
                
                break;
```

Bạn có thể hỏi một node mà bạn tin tưởng hoặc dựa theo ý kiến số đông.

## Testing in localhost
Để test, mình sẽ bật 2 cửa sổ mới với `PORT`, `MY_ADDRESS`, `PRIVATE_KEY` khác nhau. Với node đầu tiên, mình sẽ đặt peers trống, còn key sẽ là địa chỉ mà cái transaction release coin hướng tới. Đối với cái còn lại thì mình sẽ đặt peers là node trước để test tính năng kết nối. Sau đó, mình sẽ tạo một giao dịch ở node thứ nhất và đào block mới trong node thứ hai. Sau 10 giây, mình sẽ in ra `opened` và chain.

Node thứ nhất:
```js
setTimeout(() => {
    const transaction = new Transaction(publicKey, "046856ec283a5ecbd040cd71383a5e6f6ed90ed2d7e8e599dbb5891c13dff26f2941229d9b7301edf19c5aec052177fac4231bb2515cb59b1b34aea5c06acdef43", 200, 10);

    transaction.sign(keyPair);

    sendMessage(produceMessage("TYPE_CREATE_TRANSACTION", transaction));

    JeChain.addTransaction(transaction);
}, 5000);

setTimeout(() => {
    console.log(opened);
    console.log(JeChain);
}, 10000);
```

Node thứ hai:
```js
setTimeout(() => {
        if (JeChain.transactions.length !== 0) {
            JeChain.mineTransactions(publicKey);

            sendMessage(produceMessage("TYPE_REPLACE_CHAIN", [
                JeChain.getLastBlock(),
                JeChain.difficulty
            ]));
        }
}, 6500);

setTimeout(() => {
    console.log(opened);
    console.log(JeChain);
}, 10000);
```

Nó sẽ trông như sau:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qztm153ka8e0hvgg09zk.png)

Node đã connect, block đã được đào, và chain của mọi người đều đồng bộ!

## Release coin
Hãy host một node public (bằng cách sử dụng port forwarding, với mỗi router, bạn sẽ có một cách khác nhau để mở port, tra model của bạn trên mạng là OK nhé!) bằng PC hoặc một dịch vụ VPS hosting.

Mình đã test với bạn ở đây.

Node đầu tiên và cũng là node của mình:
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/20f7u4nxgpuznkmi9ycy.png)

Node của bạn ấy chạy trên điện thoại qua Termux:
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4f35w6kbeqgjt8l7bmd3.png)  

Chúng mình đã mở port và kết nối với nhau qua public IP của mỗi người.

## Source code
Source code trong bài viết có thể được tìm thấy ở [Github repo này](https://github.com/nguyenphuminh/blockchain-tutorial/tree/main/Build%20a%20p2p%20network%20and%20release%20your%20cryptocurrency). 

Hoặc qua [JeChain](https://github.com/nguyenphuminh/JeChain) - một blockchain mà mình vẫn đang làm.

## Cảm ơn
Mình muốn gửi lời cảm ơn đến người bạn của mình - Apple vì đã đóng góp vào code của bài viết này, và Trey - người đã giúp mình trong hình thành cấu trúc và cách hoạt động của network.

* [Github của Apple](https://github.com/apple096).
* [Website của Trey](https://tr3y.io/).

Và cảm ơn các bạn đã theo dõi series của mình.

## Liên lạc
* [Twitter](https://twitter.com/NguynPhMinh8).
* [Github](https://github.com/nguyenphuminh).
* [Youtube](https://www.youtube.com/channel/UCfoL6jxesUq0urUHBqXY1WA).

Mình đã làm video hướng dẫn thực hiện nội dung của bài viết này trên Youtube, các bạn có thể xem để biết thêm thông tin chi tiết nhé: https://youtu.be/i0LW7SFPD4A