# Giới thiệu

Trong bài viết chúng ta sẽ tìm hiểu cách thiết lập một cụm node Alice, Bob và Charlie, để chúng có thể kết nối với nhau, thiết lập các kênh và định tuyến thanh toán giữa các node này trên mạng --simnet ( mạng testnet của bitcoin ) . Mình cũng sẽ chia sẻ những hiểu biết cơ bản về các thành phần khác nhau và cách chúng hoạt động cùng nhau như thế nào trên lnd.

Hướng dẫn này giả định rằng bạn đã cài đặt Go, **btcd** và **lnd** .Nếu chưa các bạn có thể vào xem hướng dẫn cài đặt và chạy thử **btcd** và **lnd** tại [đây](https://viblo.asia/p/btcd-la-gi-no-co-an-duoc-khong-gAm5y4Wqldb) .

Sau đây là lược đồ để cho dễ hình dung thứ chúng ta sẽ làm trong bài viết này . Bạn có thể dễ dàng mở rộng mạng này bao gồm các node bổ xung

```
            (1)                        (1)                         (1)
         + ----- +                   + --- +                   + ------- +
         | Alice | <--- channel ---> | Bob | <--- channel ---> | Charlie |
         + ----- +                   + --- +                   + ------- +
             |                          |                           |
             |                          |                           |
             + - - - -  - - - - - - - - + - - - - - - - - - - - - - +
                                        |
                                + --------------- +
                                | BTC/LTC network | <--- (2)
                                + --------------- +
```

## Các thành phần trong demo

### LND

**lnd** là thành phần chính mà chúng ta tương tác với trong bài viết này . **lnd** viết tắt của Lightning Network Daemon và nó xử lý việc open/closing channel , định tuyến và gửi các thanh toán và quản lý tất cả các trạng thái của Lightning Network và nó hoàn toàn tách biệt với Bitcoin network

`lncli` là command line cliend để tương tác với node **lnd** của bạn.

### BTCD

`btcd` sẽ mở một cổng mà các node **lnd** sẽ sử dụng để tương tác với mạng Bitcoin / Litecoin. `btcd` để tạo địa chỉ hoặc thực hiện giao dịch trên blockchain để cập nhật và đóng mở kênh. Trong lược đồ trên, cả ba nút được kết nối với cùng một btcd. Trong thực tế hơn, mỗi node **lnd** sẽ được kết nối với các btcd khác nhau

Mình sẽ sử dụng simnet thay vì testnet. Simnet là mạng phát triển cho development cho phép chúng ta tạo các khối tùy ý.

## Setting up environment

### Run btcd

Hãy bắt đầu bằng cách chạy btcd, nếu bạn không có sẵn nó. Mở một cửa sổ terminal mới, đảm bảo bạn đã expost \$ GOPATH nhé :

```sh
btcd --txindex --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru
```

- --txindex để **lnd** client có thể query lịch sử giao dịch từ btcd
- --simnet chỉ định rằng sử dụng mạng simnet . Các bạn có thể thay nó bằng --testnet hoặc bỏ hoàn toàn để kết nối mạng Bitcoin thật
- -- rpcuser và --rpcpass đặt pass để xác thực phiên bản btcd

### Starting lnd (Alice’s node)

Chúng ta hãy tạo 3 **lnd** node . trước hết tạo 3 folders để lưu state từ alice, bob, charlie và mỗi **lnd** node sẽ trên một localhost port k khác nhau .

```js
// Tạo môi trường chạy
cd $GOPATH
mkdir dev
cd dev

// Tạo folder cho mỗi node
mkdir alice bob charlie
```

Cấu trúc thư mục sẽ như thế này :

```
├── bin
│   └── ...
├── dev
│   ├── alice
│   ├── bob
│   └── charlie
├── pkg
│   └── ...
├── rpc
│   └── ...
└── src
    └── ...
```

Chạy Alice node từ folder `alice`

```sh
cd $GOPATH/dev/alice
lnd --rpclisten=localhost:10001 --listen=localhost:10011 --restlisten=localhost:8001 --datadir=data --logdir=log --debuglevel=info --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=tientrivutru --btcd.rpcpass=tientrivutru
```

Sau khi chạy sẽ hiện `Waiting for wallet encryption password.`

- --rpclisten : `host:port` để listen từ RPC server. Đây là cách chính mà app có thể giao tiếp vs **lnd**
- --listen : `host:port` để listen các kết nối P2P đến . Kết nối ở tầng Network khác biệt với Lightning channel network và Bitcoin network
- --restlisten : `host:port` dùng REST để tương tác vs **lnd** thông qua HTTP.
- --datadir: Thư mục chứa dữ liệu **lnd** sẽ được lưu trữ bên trong
- --logdir: Thư mục để log output.
- --debuglevel: logging level cho tất cả các subsystems
- --bitcoin.simnet: Chỉ định nên sử dụng simnet hoặc testnet
- --bitcoin.active: Chỉ định rằng bitcoin đang hoạt động. Cũng có thể bao gồm nếu muốn thì có thể thêm --litecoin.active để kích hoạt Litecoin.
- --bitcoin.node = btcd: Sử dụng nút đầy đủ btcd để giao tiếp với blockchain. Lưu ý rằng khi sử dụng Litecoin, tùy chọn là --litecoin.node = btcd.
- --btcd.rpcuser và --btcd.rpcpass: Tên người dùng và mật khẩu cho phiên bản btcd. Lưu ý rằng khi sử dụng Litecoin, các tùy chọn là --ltcd.rpcuser và --ltcd.rpcpass.

### Starting Bob’s node và Charlie’s node

Cũng giống như Alice's node nhưng đừng quên mở terminal mới config lại \$GOPATH đấy

```js
// In a new terminal window
cd $GOPATH/dev/bob
bob$ lnd --rpclisten=localhost:10002 --listen=localhost:10012 --restlisten=localhost:8002 --datadir=data --logdir=log --debuglevel=info --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=tientrivutru --btcd.rpcpass=tientrivutru

// In another terminal window
cd $GOPATH/dev/charlie
charlie$ lnd --rpclisten=localhost:10003 --listen=localhost:10013 --restlisten=localhost:8003 --datadir=data --logdir=log --debuglevel=info --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=tientrivutru --btcd.rpcpass=tientrivutru
```

### Configuring lnd.conf

Để bỏ qua việc phải gõ một loạt các dòng lệnh mỗi lần, chúng ta có thể sửa đổi lnd.conf của mình và các đối số được chỉ định trong đó sẽ được tự động tải vào **lnd**.

```sh
gedit ~/.lnd/lnd.conf
```

**lnd.conf**

```sh
[Application Options]
datadir=data
logdir=log
debuglevel=info

[Bitcoin]
bitcoin.simnet=1
bitcoin.active=1
bitcoin.node=btcd

[btcd]
btcd.rpcuser=tientrivutru
btcd.rpcpass=tientrivutru
```

từ bh chúng ta chỉ cần chạy :

```ah
alice$ lnd --rpclisten=localhost:10001 --listen=localhost:10011 --restlisten=localhost:8001
bob$ lnd --rpclisten=localhost:10002 --listen=localhost:10012 --restlisten=localhost:8002
charlie$ lnd --rpclisten=localhost:10003 --listen=localhost:10013 --restlisten=localhost:8003
```

### Sử dụng lncli và authentication

Bây giờ chúng ta đã có các **lnd** node của mình , để tương tác với chúng chúng ta sẽ cần sử dụng lncli, giao diện dòng lệnh.

**lnd** sử dụng [macaroons](https://github.com/lightningnetwork/lnd/issues/20) để xác thực vs rpc Server. lncli thường tìm tệp admin.macaroon trong thư mục chính của **Lnd**, Để vô hiệu hóa macaroons, chuyển thành --no-macaroons vào cả lncli và **lnd**.

**lnd** cho phép bạn mã hóa ví của bạn bằng mật khẩu và tùy ý mã hóa mật khẩu thành seed passphrase . Điều này có thể được tắt bằng cách chuyển thành --noencryptwallet trong lnd.conf. Mình khuyên bạn nên thực hiện quy trình này ít nhất một lần để làm quen với các tính năng bảo mật và xác thực xung quanh **lnd**.

Chúng ta sẽ kiểm tra kết nối rpc của chúng ta đến nút Alice. Lưu ý rằng trong lệnh sau, chúng ta chỉ định --rpcserver ở đây, tương ứng với --rpcport = 10001 mà chúng ra đã đặt khi bắt đầu Alice's node.

```js
cd $GOPATH/dev/alice
lncli --rpcserver=localhost:10001 --macaroonpath=data/admin.macaroon create
```

Bạn sẽ được yêu cầu nhập và xác nhận mật khẩu ví cho Alice, phải dài hơn 8 ký tự. Bạn cũng có tùy chọn để thêm passphare vào seed word của mình. Bây giờ, chỉ cần bỏ qua bước này bằng cách nhập vào `N` khi được nhắc về việc bạn có ghi nhớ hay không và nhấn enter để tiếp tục mà không cần passphrase.

Bây giờ bạn có thể xem một số thông tin cơ bản như sau:

```sh
lncli --rpcserver=localhost:10001 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon getinfo
```

lncli vừa thực hiện một call RPC tới Alice **lnd** node. Đây là một cách tốt để kiểm tra xem các node của bạn có hoạt động hay không và lncli có hoạt động không.

Kết quả :

```sh
{
	"version": "0.8.0-beta commit=",
	"identity_pubkey": "036764d827654cf5cdc26bf53dd0a993d9dd421e232a8ed35190c492d947bd53ff",
	"alias": "036764d827654cf5cdc2",
	"color": "#3399ff",
	"num_pending_channels": 0,
	"num_active_channels": 0,
	"num_inactive_channels": 0,
	"num_peers": 0,
	"block_height": 100,
	"block_hash": "254d30b32b7a19d044b01be278f7e0ca75dfb65ec0ee28b4b4704e6c0aeb489d",
	"best_header_timestamp": 1572184888,
	"synced_to_chain": false,
	"synced_to_graph": false,
	"testnet": false,
	"chains": [
		{
			"chain": "bitcoin",
			"network": "simnet"
		}
	],
	"uris": null
}
```

Tương tự chạy lncli của Bob và Charlie

```js
cd $GOPATH/dev/bob

bob$ lncli --rpcserver=localhost:10002 --macaroonpath=data/admin.macaroon create
// Bạn phải nhập 8+ kí tự pass

// ở terminal khác:
cd $GOPATH/dev/charlie
charlie$ lncli --rpcserver=localhost:10003 --macaroonpath=data/admin.macaroon create
```

Để xem các options khác của lncli chúng ta có thể chạy `lncli --help` hoặc `lncli -h`.

Để đỡ phải gõ lại quá nhiểu những câu lệnh chúng ta gán trong terminal của alice, bob và charlie lần lượt là

```js
// Alice terminal
alice$ alias lncli-alice="lncli --rpcserver=localhost:10001 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon"

// Bob terminal
bob$ alias lncli-bob="lncli --rpcserver=localhost:10002 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon"

// Charlie terminal
Charlie$ alias lncli-charlie="lncli --rpcserver=localhost:10003 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon"

```

### Setting up Bitcoin addresses

chạy ở terminal ở folder `alice`

```sh
lncli-alice newaddress np2wkh
{
    "address": <ALICE_ADDRESS>
}
```

Kết quả màn hình của mình :

```sh
{
    "address": "rowiBcGqTvyVG3wu1MZcYTxpx36nhUJutC"
}
```

### Funding Alice

Restart mạng simnet vs `alice` là miner và đóng 400 block nào

```
btcd --simnet --txindex --rpcuser=tientrivutru --rpcpass=tientrivutru --miningaddr=<ALICE_ADDRESS>
```

Đóng 400 block

```
btcctl --simnet --rpcuser=kek --rpcpass=kek generate 400
```

thử get balance của `alice` nào

```
lncli-alice walletbalance
```

Kết quả :

```
{
    "total_balance": "145000000000",
    "confirmed_balance": "145000000000",
    "unconfirmed_balance": "0"
}
```

Sẽ ko công bằng nếu chỉ mình Alice đc tiền nhỉ hãy cho Charlie thành triệu phú nào :

```js
// Restart mạng với Charlie là miner
btcd --txindex --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru --miningaddr=<CHARLIE_ADDRESS>

// Generate more blocks
btcctl --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru generate 100

// Check Charlie's balance
charlie$ lncli-charlie walletbalance
```

Kết quả :

```
{
    "total_balance": "5000000000",
    "confirmed_balance": "5000000000",
    "unconfirmed_balance": "0"
}
```

## Tạo P2P Network

Bây giờ Alice và Charlie có một số Bitcoin trên simnet, hãy để bắt đầu thử trao đổi chúng nào.

### Connect Alice và Bob:

```js
// Get Bob's identity pubkey:
bob$ lncli-bob getinfo
{
	"version": "0.8.0-beta commit=",
--->"identity_pubkey": <BOB_PUBKEY> //"030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886",
	"alias": "030074bd051c3399de6d",
	"color": "#3399ff",
	"num_pending_channels": 0,
	"num_active_channels": 0,
	"num_inactive_channels": 0,
	"num_peers": 0,
	"block_height": 600,
	"block_hash": "5c19a1a18d0f78c0427136aa0a0879117005187de6d47e342739aa166dbd2c64",
	"best_header_timestamp": 1572397127,
	"synced_to_chain": true,
	"synced_to_graph": false,
	"testnet": false,
	"chains": [
		{
			"chain": "bitcoin",
			"network": "simnet"
		}
	],
	"uris": null
}

# Connect Alice với Bob
alice$ lncli-alice connect <BOB_PUBKEY>@localhost:10012
{

}
```

**Note**: `localhost: 10012` tương ứng với `--listen=localhost:10012` mà chúng ta đã đặt khi bắt đầu Bob lnd node.

### Kiểm tra Alice và Bob đã kết nối

list peer alice

```js
alice$ lncli-alice listpeers

{
    "peers": [
        {
            "pub_key": <BOB_PUBKEY> //"030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886",
            "address": "127.0.0.1:10012",
            "bytes_sent": "139",
            "bytes_recv": "139",
            "sat_sent": "0",
            "sat_recv": "0",
            "inbound": false,
            "ping_time": "0",
            "sync_type": "ACTIVE_SYNC"
        }
    ]
}

bob$ lncli-bob listpeers
{
    "peers": [
        {
            "pub_key": <ALICE_PUBKEY> //"036764d827654cf5cdc26bf53dd0a993d9dd421e232a8ed35190c492d947bd53ff",
            "address": "127.0.0.1:40870",
            "bytes_sent": "165",
            "bytes_recv": "165",
            "sat_sent": "0",
            "sat_recv": "0",
            "inbound": true,
            "ping_time": "1347",
            "sync_type": "ACTIVE_SYNC"
        }
    ]
}
```

Làm tương tự để kết nối Bob tới Charlie:

```
charlie$ lncli-charlie connect <BOB_PUBKEY>@localhost:10012
```

## Setting up Lightning Network

Trước khi chúng ta có thể gửi BTC, chúng ta sẽ cần thiết lập các kênh thanh toán từ Alice đến Bob và Bob đến Charlie.

**Đầu tiên, mở kênh Alice <-> Bob.**

```
alice$ lncli-alice openchannel --node_key=<BOB_PUBKEY> --local_amt=1000000
```

- **--local_amt** chỉ định số tiền mà Alice sẽ cam kết với kênh. Để xem các options khác, bạn có thể thử lncli openchannel --help.

Bây giờ chúng ta cần mining sáu block để kênh được coi là hợp lệ:

```
btcctl --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru generate 6
```

Kiểm tra xem Alice <-> kênh Bob đã được tạo chưa:

```js
alice$ lncli-alice listchannels
{
    "channels": [
        {
            "active": true,
            "remote_pubkey": <BOB_PUBKEY> //"030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886",
            "channel_point": "d6a9d2e4c194242a06495c65269ac2cf6e1ec2f18d53683399be172bd9a8d4b8:0",
            "chan_id": "660806488358912",
            "capacity": "1000000",
            "local_balance": "990950",
            "remote_balance": "0",
            "commit_fee": "9050",
            "commit_weight": "600",
            "fee_per_kw": "12500",
            "unsettled_balance": "0",
            "total_satoshis_sent": "0",
            "total_satoshis_received": "0",
            "num_updates": "0",
            "pending_htlcs": [
            ],
            "csv_delay": 144,
            "private": false,
            "initiator": true,
            "chan_status_flags": "ChanStatusDefault",
            "local_chan_reserve_sat": "10000",
            "remote_chan_reserve_sat": "10000",
            "static_remote_key": true,
            "lifetime": "98",
            "uptime": "98"
        }
    ]
}
```

### Giao dịch trong kênh (single-HOP payments)

Cuối cùng, đến phần thú vị nhất đó là gửi giao dịch ! Hãy gửi giao dịch từ Alice cho Bob.

Đầu tiên Bob sẽ cần tạo 1 lệnh invoice:

```js
bob$ lncli-bob addinvoice --amt=10000
{
	"r_hash": "<a_random_rhash_value>" //"c6bbf598433af908874cc95a23576252cfe39623502a2b3482db184237f32250",
	"pay_req": "<encoded_invoice>" //"lnsb100u1pwm369ppp5c6altxzr8tus3p6ve9dzx4mz2t87893r2q4zkdyzmvvyydlnyfgqdqqcqzpg3zw6tz43dz4y0vujxj7t6h6va9czfg8wqzx0240k3cja4v244kyshrw2zm34xluzsvzryh5yqgsrrfc8shmqr3z7qpruge2hg8jjaxcphxd86z",
	"add_index": 1
}
```

Gửi giao dịch từ Alice đến Bob:

```js
alice$ lncli-alice sendpayment --pay_req=<encoded_invoice>

Description:
Amount (in satoshis): 10000
Destination: <BOB_PUBKEY> //030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886
Confirm payment (yes/no): yes
{
	"payment_error": "",
	"payment_preimage": "65bd08f14ccd82e9f9ffbfe03e8b7dc42ef7225d3ff723665dd67798ba9bfcf3",
	"payment_route": {
		"total_time_lock": 649,
		"total_amt": 10000,
		"hops": [
			{
				"chan_id": 660806488358912,
				"chan_capacity": 1000000,
				"amt_to_forward": 10000,
				"expiry": 649,
				"amt_to_forward_msat": 10000000,
				"pub_key": "030074bd051c3399de6d1f980b4f8bd2b4e6b73bb276049ebf9e6944187f5a5886",
				"tlv_payload": true
			}
		],
		"total_amt_msat": 10000000
	}
}

// Check that Alice's channel balance was decremented accordingly:
alice$ lncli-alice listchannels

// Check that Bob's channel was credited with the payment amount:
bob$ lncli-bob listchannels
```

### Giao dịch thông qua nhiều kênh (multi-HOP payment)

Bây giờ chúng ta đã biết cách gửi thanh toán trong 1 kiênh, việc gửi thanh toán qua nhiều kênh không khó khăn hơn nhiều. Hãy thiết lập một kênh từ Bob <-> Charlie:

```js
charlie$ lncli-charlie openchannel --node_key=<BOB_PUBKEY> --local_amt=800000 --push_amt=200000

// Mine the channel funding tx
btcctl --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru generate 6
```

Lưu ý rằng lần này, chúng ta phải cung cấp đối số **--push_amt**, chỉ định số tiền chúng ta muốn bên kia có ở trạng thái kênh đầu tiên.

**Hãy để gửi giao dịch từ Alice đến Charlie bằng cách thông qua Bob nào:**

```js
charlie$ lncli-charlie addinvoice --amt=10000

alice$ lncli-alice sendpayment --pay_req=<encoded_invoice>

\\ Kiểm tra xem kênh của Charlie có được ghi có với số tiền thanh toán
\\ (ví dụ: `remote_balance` đã bị giảm 10000)
charlie$ lncli-charlie listchannels
```

## Đóng channels

```js\
// chạy lại lệnh
alice$ lncli-alice listchannels
{
    "channels": [
        {
            "active": true,
            "remote_pubkey": "0343bc80b914aebf8e50eb0b8e445fc79b9e6e8e5e018fa8c5f85c7d429c117b38",
       ---->"channel_point": "3511ae8a52c97d957eaf65f828504e68d0991f0276adff94c6ba91c7f6cd4275:0",
            "chan_id": "1337006139441152",
            "capacity": "1005000",
            "local_balance": "990000",
            "remote_balance": "10000",
            "unsettled_balance": "0",
            "total_satoshis_sent": "10000",
            "total_satoshis_received": "0",
            "num_updates": "2"
        }
    ]
}
```

`channel_point` bao gồm 2 số là `funding_txid` `output_index` được ngăn cách bởi dấu `:`

```js
// Đóng Alice<-->Bob channel từ phía Alice.
alice$ lncli-alice closechannel --funding_txid=<funding_txid> --output_index=<output_index>

// Mining 1 block bao gồm giao dịch đóng kênh để đóng kênh:
btcctl --simnet --rpcuser=tientrivutru --rpcpass=tientrivutru generate 1

// Kiểm tra balance của Bob sau khi đóng và hãy nhớ rằng trước kia chúng ta ko cho Bob đồng nào

bob$ lncli-bob walletbalance
{
    "total_balance": "20001",
    "confirmed_balance": "20001",
    "unconfirmed_balance": "0"
}
```

Bài viết chia sẻ chủ yếu là cách làm việc với `btcd`, `btcctl`, **lnd** và `lncli`. Trong bài viết tới chúng ta sẽ tìm hiểu cách thiết lập và tương tác với **lnd** bằng web.

Bài viết được dịch và điều chỉnh từ : https://dev.lightning.community/tutorial/01-lncli/index.html