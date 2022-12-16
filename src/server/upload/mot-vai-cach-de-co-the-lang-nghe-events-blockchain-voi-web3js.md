![](https://images.viblo.asia/5266363d-e0ab-4cf9-be17-478f7bcd1cef.png)

Thông thường khi chúng ta xây dựng  một Dapp blockhain thì việc đồng bộ giữa giao diện người dùng và giữ liệu trên blokchain là điều rất quan trọng. Và người dùng sẽ luôn muốn thấy các thông tin được cập nhật ngay lập tức sau khi các transaction của họ được thực thi xong. Vậy thì làm sao để giao diện có thể cập nhật những thay đổi khi có vô vàn các transaction đang đượ ghi đi trên mạng. Lúc đó chúng ta sẽ sử dụng đến events trong solidity và hôm nay mình sẽ giới thiệu cho các bạn một số cách để có thể listen các events này ngay khi transaction thành công.

# Giới thiệu về events
Event thì là một thành phần cũng có thể được kế thừa như Function. Nó thì thường được sử dụng để broadcast ra cho phía client biết răng hàm nào đó đã được gọi và thực thi. Nó hay được để ở cuối của Function và cũng có các tham số để phía client có thể hiểu được. Ví dụ như một token ERC20 thường emit ra một event **Transfer** với các thông số người gửi, người nhận và value bao nhiêu. Để các clients subscribe có thể biết được là vừa có một giao dịch chuyển token.

```js
...

// Định nghĩa event Transfer
event Transfer(address indexed from, address indexed to, uint256 value);

...

// Hàm transfer token
function transfer(address to, uint256 value) public returns (bool) {
    require(value <= _balances[msg.sender]);
    require(to != address(0));

    _balances[msg.sender] = _balances[msg.sender].sub(value);
    _balances[to] = _balances[to].add(value);
    emit Transfer(msg.sender, to, value);
    return true;
}
```

Kết quả trả về sẽ có dạng như sau

```js
 Transfer (index_topic_1 address from, index_topic_2 address to, uint256 value)
   address from
   0x8f7f6c18039776c8b7f952185c3e75649a25b9cb
   address to
   0x611abc072ee91c0cc19ffef97ac7e69a1a7a17ec
   uint256 value
   6538744793000000000000
   
   [topic0] 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
   [topic1] 0x0000000000000000000000008f7f6c18039776c8b7f952185c3e75649a25b9cb
   [topic2] 0x000000000000000000000000611abc072ee91c0cc19ffef97ac7e69a1a7a17ec
```


# Chuẩn bị
Việc đầu tiên cần chuẩn bị test event là chúng ta phải có một provider web3 và ABI của contract muốn subcribe

```js

const Web3 = require('web3');
const ABI = require('./ABI-WETH.json');

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/<PROJECT_ID_INFURA>');
const CONTRACT_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS); 

```

Trong bài này mình sử dụng RPC của infura thì mọi người có thể tham khảo cách get một RPC Infura tại đây: https://blog.infura.io/getting-started-with-infura-28e41844cc89/

Còn ABI ngoài việc phải compiler để có  được thì đối với một số contract public và đã verified chúng ta có thể lên etherscan.io hoặc bscscan.com để lấy ví dụ như ở đây là https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code và đến phần **Contract ABI** để lấy ABI của chúng.

# 1. Getting past events
Thực ra cách này thì giống với query data blockchain hơn nhưng mình vẫn muốn giới thiệu đến với mọi người. Do các events được lưu trữ trên blockchain nên ta có thể query nó bất cứ khi nào. Chúng ta sẽ sử dụng method **getPastEvents** có sẵn trong instance mà phía trên ta đã tạo để lấy về các events trong quá khứ. Ví dụ như ở đây chúng ta sẽ get về tất các event **Transfer** của contract ERC20 WETH từ block `12856158` đến block mới nhất

```js

async function example1() {
    let options = {
        filter: {
            value: ['1000', '1337']    //Only get events where transfer value was 1000 or 1337
        },
        fromBlock: 12856158,                  //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest'
    };

    myContract.getPastEvents('Transfer', options)
        .then(result => console.log ('result', result))
        .catch(err => console.log ('error', err.message, err.stack));
}

```

Kết quả:

```js

  ...

  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    blockHash: '0x5d6592c6f8be4443dd79b27fafa35bb58fd8b71161a5d58715a8888a0b186601',
    blockNumber: 12856161,
    logIndex: 287,
    removed: false,
    transactionHash: '0x7c9d4b3655b89179b09bc025ecc12530eb38111c7cc79312c85786bd7d8a398a',
    transactionIndex: 180,
    id: 'log_980923fb',
    returnValues: Result {
      '0': '0x05f21E62952566CeFb77F5153Ec6B83C14FB6b1D',
      '1': '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      '2': '20568368904018071',
      src: '0x05f21E62952566CeFb77F5153Ec6B83C14FB6b1D',
      dst: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      wad: '20568368904018071'
    },
    event: 'Transfer',
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    raw: {
      data: '0x000000000000000000000000000000000000000000000000004912d292221897',
      topics: [Array]
    }
  },
  ... 404 more items
]
```

Như ở trên bạn cũng  có thể thấy là còn thể filter với các điều kiện như **fromBlock** từ block thứ bao nhiêu , **form** address nào, **to** block nào.

# 2. Contract instance event method
Cách thứ 2 là sử dụng trực tiếp từ methods event trong instance contract mà ta đã tạo. Mọi người hãy để ý khi ta tạo instance trong phần events sẽ có tất cả các events mà ta đã định nghĩa trong contact

```js
  ...
  
  events: {
    Approval: [Function: bound ],
    '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925': [Function: bound ],
    'Approval(address,address,uint256)': [Function: bound ],
    Transfer: [Function: bound ],
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': [Function: bound ],
    'Transfer(address,address,uint256)': [Function: bound ],
    Deposit: [Function: bound ],
    '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c': [Function: bound ],
    'Deposit(address,uint256)': [Function: bound ],
    Withdrawal: [Function: bound ],
    '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65': [Function: bound ],
    'Withdrawal(address,uint256)': [Function: bound ],
    allEvents: [Function: bound ]
  },
  _address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  _jsonInterface: [
  
  ...
```

Ta cũng có thể sử dụng trực tiếp các methods này để lắng nghe sự kiện

```js

function example2() {
    let options = {
        filter: {
            value: [],
        },
        fromBlock: 12856518
    };

    myContract.events.Transfer(options)
        .on('data', event => console.log(event))
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log ('error', err.message, err.stack))
        .on('connected', str => console.log(str))
}

```

Mỗi method events sẽ trả về một **EventEmitter**. Event này sẽ lắng nghe các sự kiện như dưới đây. 

- **data** – Nó sẽ được kích hoạt mỗi khi có một event Transfer gọi đến contract được emited
- **changed** – Nó sẽ được kích hoạt mỗi khi event bị xóa khỏi blockchain
- **error** – Sẽ được kích hoạt khi có lỗi trong quá trình subscription events
- **connected** – Sẽ được kích hoạt khi thiết lập subscription đã thành công. Nó sẽ trả về một subscription id và điều này chỉ xảy ra một lần duy nhất. 

Kết quả như sau

```js
...

{
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  blockHash: '0xee2da8ff4b39294545ed2af49ee40c17ddad9c12d21d0733554a2579b2ca006b',
  blockNumber: 12856552,
  logIndex: 252,
  removed: false,
  transactionHash: '0x1871d9dbe683796d4219ed34403495dd5bf8784e9f73e92602adcac9ebd887fe',
  transactionIndex: 147,
  id: 'log_190e2a37',
  returnValues: Result {
    '0': '0x11b815efB8f581194ae79006d24E0d814B7697F6',
    '1': '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    '2': '1667655933682553825',
    src: '0x11b815efB8f581194ae79006d24E0d814B7697F6',
    dst: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    wad: '1667655933682553825'
  },
  event: 'Transfer',
  signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  raw: {
    data: '0x0000000000000000000000000000000000000000000000001724b43c6eb893e1',
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x00000000000000000000000011b815efb8f581194ae79006d24e0d814b7697f6',
      '0x000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564'
    ]
  }
}

...
```

# 3. The eth subscribe method
Kiểu này là một cách tổng quát nhất để có thể lắng tất cả các logs events đã được emited. Và nếu muốn lọc events thì bạn phải thiết lập trong phần options

```js

function example3() {
    let options = {
        fromBlock: 12856551,
        address: ['address-1', 'address-2'],    //Only get events from specific addresses
        topics: []                              //What topics to subscribe to
    };

    let subscription = web3.eth.subscribe('logs', options,(err,event) => {
        if (!err)
        console.log(event)
    });

    subscription.on('data', event => console.log(event))
    subscription.on('changed', changed => console.log(changed))
    subscription.on('error', err => console.log ('error', err.message, err.stack))
    subscription.on('connected', nr => console.log(nr))
}

```

Kiểu subscribe này sẽ trả lại một  Subscription instance nó cũng là một EventEmitter. Vì vậy các events cũng giống với cách số 2, ngoài ra nó cũng có thêm một vài properties khác như:

- **id** – Đây là id của subscription
- **unsubscribe**(callback) – Method này được sử dụng để unsubscribe
- **subscribe**(callback) – Method này được sử dụng để re-subscribe khởi tạo lại subscription với những parameters đã có trước đó
- **arguments** – Subscription arguments như ở trên thì được nó được sử dụng để re-subscribe.

# 4. Listen pending transactions 
Thực ra cách này thì cũng không được coi là cách để listen events đúng lắm. Nhưng cách này là cách chúng ta có thể lắng nghe sự kiện kể từ khi transaction còn đang ở status pending và chưa được confirm. Nó phù hợp để sử dụng cho các trường hợp cần tạo transaction với tốc độc nhanh giống như front-running

```js

function example4() {

    let subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
        if (!error)
        console.log(result)
    });

    subscription.on('data', event => console.log(event))
    subscription.on('changed', changed => console.log(changed))
    subscription.on('error', err => console.log ('error', err.message, err.stack))
    subscription.on('connected', nr => console.log(nr))

    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
}

```

Kết quả ta sẽ thấy rất nhiều các hash transaction pending mới được tạo và đang ở trong mempool. Ở đây ta có thể get detail từng transaction sau đó dùng một package decode value trong params của transacion là ta có thể thấy được các tông tin cần thiết. Để có thể ngay lập tạo một transaction khác front-running.

```js
$ node index
0x0a3b8d59019e69890acbf83ac37941654b1cc38aa403dec48ff8c06655b94d60
0xb987c738efeaffa5264b3f742473217b02d4f46b957b10bec8a17e166d78e5ae
0xf709f281a8bd7b8f3e9a1d179795a897184ae325ba16a9d4659e6f70149d1e30
0xf8fee92a9d0acb71c98924790fff4adb4783b67af166ba8b21ac6c60d1a8f1fc
0xc1a7c3f539e97f3c3f5f92ee1baae8e19e218d04768fd902aa3b4d4f00c3fe2a
0x060b5f0bc264a49946b33368c25eac9e1dc811ae05b0a4a67d296685aa508fc0
0xdc6ca9e3f06553f7d085938a650dd0f54158789734362ec6ff524f0affeb8422
0x0bc0b31ee1031f8756209d1ce36aabed5b16199b4647bab5a95b94ae9c6b2d3e
0xc060e657437b13cc2034b0183d551cb46710e18958dd680ace3c30fc9d95a181
0x218ee31c6081b23d94bc325b2f95cc2a02ed3aa4225b806de01294119d9c1be3
0xbb39ce1d5d1c301dbb82c46e769b964ffb476d612fce913b39e15ef0f4f5ba51
0xa4fc54a17bb947492cef5c2ee511819b263715afd659eef12b10cda63edbb247
0xae10c65552d34c56005b4762fe8eb3e7d98d552ee43e38b97b56e5ac48187b39
0x362d3d74d230befac200df6d79c4189b894d04bfc0ea7b4a85956d7923efcb9c
0xf4a68c61014ed3ba4a5555ce7b2905a3ddb6e518b1652fcaec76d293ed21adc9
0x8274ff71b177bd735f574f46ee105b886530f507779d28cc07a3df58f23acc1e
0xf55c854f80ec3a46c5ba379ccbe4f4a4e4c61b97d38403db77a83caacdfd0398
0x6810428528670494b12206e94973f1223a8fde8f13d6e5a14432265944474f34
0xc1a158f038054f0aaca34baa4aaffba69410795e361657d47967861d18718050
0xcdf04bdb4987737a28cbe759ca50cfc45af9e31da485cec89cb19b7929aaf0f5
0x0070afc5b8849edf32614969b8e11564801ab1ae8cdfedb128a9c03c285582b2
0xe9da592af30ccd51c10e83a3ec15ae7366253ac9dd41100d0cb5c05eaf029827
```

Package mình sử dụng để decode value params transacion là cái này: https://www.npmjs.com/package/ethereum-input-data-decoder

# Tổng kết 
Bài viết này mình muốn giới thiệu đến mọi người các cách để có thể lắng nghe được các events solidity trong blockchain với việc sử dụng web3js. Mong là sẽ giúp mọi người có thể chọn được cách phù hợp nhất để lắng nghe events cho Dapp của mình.