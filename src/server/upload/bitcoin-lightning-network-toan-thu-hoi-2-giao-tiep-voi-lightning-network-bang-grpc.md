Trong phần này, chúng ta sẽ tìm hiểu cách thiết lập và tương tác với lnd thông qua giao thức gRPC . Trước khi bắt đầu bước này , hãy đảm bảo bạn đã cài đặt btcd và lnd các bạn có thể xem ở [đây](https://viblo.asia/p/bitcoin-btcd-la-gi-no-co-an-duoc-khong-gAm5y4Wqldb) và ngoài ra là **node** và **npm** nhé . 
Tài liệu tham khảo tại [đây](https://api.lightning.community/#lnd-grpc-api-reference) , đây là web về docs API cho lncli (CLI) có thể tương tác bằng Python và JavaScript giao tiếp với local **LND** thông qua gRPC. Nó dành cho những người đã hiểu LND các bạn có thể đọc tại [đây](https://viblo.asia/p/bitcoin-giai-ma-bi-an-lighting-network-va-cach-thuc-hoat-dong-bWrZn4BO5xw). Ngoài ra LND cũng cung cấp một phương thức tương tác vs LND khác đó là REST các bạn  có thể đọc tại [đây](https://api.lightning.community/rest/index.html#lnd-rest-api-reference)

Các ví dụ dưới đây giả định rằng đang chạy LND local và kết nối cổng gRPC ở cổng 10009.
File `rpc.proto` có thể download tại [đây](https://github.com/lightningnetwork/lnd/blob/master/lnrpc/rpc.proto)
## Init wallet
Mình sẽ sử dụng repo của mình đã setup đầy đủ hết môi trường docker các bạn có thể clone tại https://github.com/vinhyenvodoi98/LightningNetwork-Nodejs

Lướt qua nhanh các bước để start 1 mạng LND nào
bạn chỉ cần chạy lệnh 
```sh
scripts/simnet-env.sh
```
Sau khi chạy lệnh này xong một chúng sẽ tạo ra :

* một mạng bitcoin simnet
* 3 Bitcoin LND node (đồng thời đã kết nối các peer giữa các node)

Chú thích:  đặt tên 3 node này là alice, bob, charlie và chúng ta sẽ thao tác với node `alice` trong bài viết này
    
Sau đó để có biến môi trường chúng ta cần chạy 

```sh
scripts/simnet-env.sh
```

cop  phần LND_MACAROON và LND_CERT của Alice vào file `.env`

## Setting gRPC 

Chúng ta sử dụng đoạn code này để setup connet bằng gRPC 

```js
require("dotenv").config();
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./rpc.proto", {
  keepCase: true
});
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;

process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";
var lndCert = Buffer.from(process.env.LND_CERT, "utf8");
var sslCreds = grpc.credentials.createSsl(lndCert);

var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(
  args,
  callback
) {
  var macaroon = process.env.LND_MACAROON;
  var metadata = new grpc.Metadata();
  metadata.add("macaroon", macaroon);
  callback(null, metadata);
});

var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
var lightning = new lnrpc.Lightning("localhost:10009", creds);

});

var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
var lightning = new lnrpc.Lightning('localhost:10001', creds);
```

Test thử một chút với hàm **getinfo** nhỉ :

```js
  var request = {};
  lightning.getInfo(request, function(err, response) {
    console.log(response);
  });
  
  //ket qua
  { 
      identity_pubkey:
           '02b91a3e09cc9e207aea58a6a172b94fd6946cc7f364b13b9419c17fee56b6dca1',
      alias: '02b91a3e09cc9e207aea',
      num_peers: 2,
      block_height: 2040,
      block_hash:
           '789f790ed8190bb034ec1b8cbafda3b9db0ebfb743d67b1c3b35f4177fdebcb2',
      synced_to_chain: true,
      uris:
           [ '02b91a3e09cc9e207aea58a6a172b94fd6946cc7f364b13b9419c17fee56b6dca1@172.26.0.3:9735' ],
      best_header_timestamp: Long { low: 1573662914, high: 0, unsigned: false },
      version: '0.8.0-beta commit=v0.8.0-beta',
      chains: [ { chain: 'bitcoin', network: 'simnet' } ],
      color: '#3399ff',
      synced_to_graph: true 
  }
```
**Get walletbalance**

```js
var request = {} 
lightning.walletBalance(request, function(err, response) {
  console.log(response);
})
// ket qua tra ve o dang long nen ban nen su dung ham BigInt cua js nhe
```

Kiểm tra các peer

```js
var request = {};
  lightning.listPeers(request, function(err, response) {
    console.log(response);
  });
// ket qua
{ peers:
   [ { pub_key:
        '02d61e6b1e69f56e1be75fc270abdb9daade494df32ce4b7bb008a0caed5e4bb3c',
       address: '172.26.0.4:9735',
       bytes_sent: [Long],
       bytes_recv: [Long],
       ping_time: [Long],
       sync_type: 1 },
     { pub_key:
        '02c9c7b15e75e9c33671fd6c82d8218f5b4dca825c7d831c77902b941330da04c9',
       address: '172.26.0.5:37356',
       bytes_sent: [Long],
       bytes_recv: [Long],
       inbound: true,
       ping_time: [Long],
       sync_type: 1 } 
    ] 
}

```
## Tạo Channel
```js
var pubkey =
    "02d61e6b1e69f56e1be75fc270abdb9daade494df32ce4b7bb008a0caed5e4bb3c"; //public key mình đã lấy cua 1 peer ben tren
  var request = {
    node_pubkey_string: pubkey,
    local_funding_amount: 5000000,
    push_sat: 0,
    target_conf: 1,
    private: false,
    min_confs: 3,
    spend_unconfirmed: false
  };
  lightning.openChannelSync(request, function(err, response) {
    console.log(response);
  });
```

Bây giờ chúng ta cần khai thác 5 khối để kênh được coi là hợp lệ :
```sh
docker-compose run simnet-btcctl generate 5 > /dev/null
```
**Chú ý** việc tạo kênh ở đây là tạo kênh 1 hướng nghĩa là khi kênh đc tạo ra thì sẽ chỉ có ng tạo nạp tiền vào kênh thôi . Đây đc gọi là **single-funded channel** còn kênh được tạo ra với 2 người đều nạp tiền vào được gọi là **mutually funded channels** và bên phát triển LND vào những bản cập nhật tiếp theo . Có một số giải pháp được đề xuất các bạn có thể đọc tại đây :
https://bitcoin.stackexchange.com/questions/80792/how-to-create-bidirectional-channels-using-lnd

## Thực hiện giao dịch giữa các channel
### Tạo một hóa đơn
```js

 var request = {
    amt_paid: 10000
  };
  lightning.addInvoice(request, function(err, response) {
    console.log(response);
  });

//ket qua

r_hash:
   <Buffer 9b 45 92 99 d6 eb 5f 47 80 81 51 ba 54 f1 29 4b 39 11 34 56 64 02 41 d2 c8 a3 8f 31 dd 84 9e 2e>,
  payment_request:
   'lnsb1pwuc0q7pp5ndze9xwkad050qyp2xa9fufffvu3zdzkvspyr5kg5w8nrhvynchqdqqcqzpgdeu379ry7ceatpsmguqhpj988wsta6vuka44kqr2zjyth0jyrnfyazekukh25glnkd9tdlpnsecwmawue7edxv5s8gnnxpg499fm3lqp6spfxw',
  add_index: Long { low: 1, high: 0, unsigned: true } }
```
Chúng ta lấy `payment_request` rồi gửi thanh toán trong lênh của alice -> bob

### Tạo thanh toán 
Chúng ta chạy commad đối vs node của bob
```js
docker-compose exec simnet-lnd-btcd-bob lncli --macaroonpath=~/.lnd/data/chain/bitcoin/simnet/admin.macaroon sendpayment --pay_req=<payment_request>
```
**payment_request** lấy ở bên trên nhé .
sau đó chúng ta sẽ xác nhận
```
Confirm payment (yes / no) yes
```
Là hoàn thành rồi

## Đóng Channel

```js
var request = {
    channel_point: {
      funding_txid_str:
        "229e6fbbe4942c1e405fdf50c55174a609440fb39f20e822eec34286aadab098",
      output_index: 0
    }
  };
  var call = lightning.closeChannel(request);
  call.on("data", function(response) {
    console.log(response);
  });
  ```

## Phụ Lục
Bạn có thể tự tạo 1 node bên ngoài hoặc start thêm 1 container nữa rồi connect với các node còn lại rồi tạo channel giống như trên . 

### Creating the P2P Network
Bây h 2 tài khoản đã có một số Bitcoin trên  mạng simnet rồi hãy kết nối 2 tài khoản đấy vs nhau nào

Chúng ta lấy public Key của Alice và biết được port của Alice là 10012

```js
var getInfo = () => {
  var request = {};
  lightning.getInfo(request, function(err, response) {
    console.log(response);
  });
};

//Kết quả
{ 
    "identity_pubkey": <string>,
    "alias": <string>,
    "num_pending_channels": <uint32>,
    "num_active_channels": <uint32>,
    "num_peers": <uint32>,
    "block_height": <uint32>,
    "block_hash": <string>,
    "synced_to_chain": <bool>,
    "testnet": <bool>,
    "uris": <array string>,
    "best_header_timestamp": <int64>,
    "version": <string>,
    "num_inactive_channels": <uint32>,
    "chains": <array Chain>,
    "color": <string>,
    "synced_to_graph": <bool>,
}
```
Trong đó `identity_pubkey` là Public key của mình

### Connect peer
```js
var connectPeer = () => {
  var request = {
    addr: {
      pubkey: '030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886',
      host: 'localhost:10012'
    },
    perm: true
  };
  lightning.connectPeer(request, function(err, response) {
    console.log(response);
  });
};
```

sau đó chúng ta có thể check peer
```js
var checkPeer = () => {
  var request = {};
  lightning.listPeers(request, function(err, response) {
    console.log(response);
  });
};
// Ket qua
{ peers:
   [ { pubKey:
        '030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886',
       address: '127.0.0.1:10012',
       bytesSent: [Long],
       bytesRecv: [Long],
       pingTime: [Long],
       syncType: 1 
       } 
   ] 
}
```

Như vậy chúng ta đã kết nối được với Alice rồi.

tài liệu tham khảo : 

https://github.com/RadarTech/ln-api-boilerplate#simnet-suite

https://api.lightning.community/#lnd-grpc-api-reference