![](https://images.viblo.asia/9d711762-5517-47ff-beda-3241d3cfa383.png)
Trong bài viết này sẽ đề cập đến một số nền tảng mạng Bitcoin đó là BTCD, giúp bạn hiểu cách thức Bitcoin client hoạt động và cách nhiều phần của mạng Bitcoin hoạt động cùng nhau như thế nào.
Whitepaper của Bitcoin bao gồm một số kiến thức cơ bản và tập trung ở khía cạnh thiết kế của Bitcoin nhưng để hiểu sâu sắc cách thức hoạt động của một Bitcoin client thì nó nằm ở một cấp độ phải gọi là nghiên cứu và thực hành khác rồi.

Bản thân mình đã đọc về Bitcoin vào cuối năm 2018 và một trong những cuốn sách tuyệt vời mà mình đã đọc là `Mastering Bitcoin` của Andreas Antonopoulos. Đó là một nguồn tài liệu tuyệt vời cho bất cứ ai muốn hiểu về kiến trúc cũng như kỹ thuật vận hành của Bitcoin .

Bitcoin Client đầu tiên là Bitcoin Core (https://github.com/bitcoin/bitcoin), được viết bằng C ++, bởi Satoshi Nakamoto và hiện đã được contribute bởi BlockStream Developers. Đây là nền tảng Client đáng tin cậy nhất và có vai trò hàng đầu trong sự phát triển của Bitcoin. Nhưng C ++ có vẻ hơi ...già ý mình là khó và phức tạp để biên dịch và đọc. Thay vào đó hãy thử sử dụng Golang để tìm hiểu nhé .

Và may mắn thay, chúng ta đã có BTCD, một full node Bitcoin Client được viết bằng Golang.

## BTCD Components

Full node Bitcoin giúp blockchain duy trì và xác thực, chuyển tiếp các giao dịch. Nhưng làm thế nào để làm điều đó? Những công việc mà một full node cần phải làm là gì?

Về cơ bản, khi một node start, nó phải kết nối với các peer khác. Giao tiếp giữa các peer được thực hiện trên giao thức TCP, thông qua JSON-RPC. Sau đó, node bắt đầu gửi tin nhắn cho các peer khác để lan truyền các giao dịch và khối. Btcd sử dụng leveldb làm cơ sở dữ liệu và flat file để lưu trữ khối. Trước khi mỗi khối và giao dịch được chấp thuận, client phải xác minh tính hợp lệ của từng khối. Quá trình xác nhận này cần phải thông qua Hashing và [thuật toán chữ kí số Elliptic Curve](https://en.bitcoin.it/wiki/Elliptic_Curve_Digital_Signature_Algorithm#targetText=Elliptic%20Curve%20Digital%20Signature%20Algorithm%20or%20ECDSA%20is%20a%20cryptographic,the%20person%20that%20generated%20it.) để xác minh dữ liệu. Cuối cùng, các giao dịch và khối hiện được lưu trong cơ sở dữ liệu này.

Để thực hiện điều này thì BTCD client sẽ phải có các thành phần sau :

**btcec**: Package này thực hiện mã hóa đường cong elip.Bạn biết đấy, khóa công khai và khóa riêng được lấy từ thuật toán mã hóa này. Hơn thế nữa, việc ký và xác minh chữ ký của các unspent transaction (các giao dịch chưa đc xác minh ) sẽ dựa vào điều này.

**addrmgr**: Package này theo dõi các node kết nối. Các node này đến và đi vì vậy địa chỉ cần được lưu trữ và sẽ bị loại bỏ khi ngoại tuyến hoặc không dùng đến.

**blockchain**: Package này thực hiện các quy tắc xử lý và lựa chọn khối bitcoin. Một khối được phép ghép vào blockchain hoặc không phải trải qua bước này.

**btcjson**: Package này giúp xử lý các yêu cầu và phản hồi từ JSON-RPC của bitcoin.

**chaincfg**: Cấu hình chain, lưu nhiều tham số cho mạng Bitcoin. Packsage này giúp Bitcoin client biết nó bắt đầu từ đâu (mainnet hoặc testnet), khối genesis, DNS seeds, Checkpoints,...

**cmd**: Cung cấp một số lệnh chạy trên btcd. Bao gồm bootstrap blockchain, tìm checkpoint candidates, tạo certificates cho rpc-client.

**Connmgr**: Quản lý chiến lược kết nối , chẳng hạn như số lượng kết nối , cấm, hạn chế kết nối tối đa, ...

**Database**: Package này để lưu trữ dữ liệu cho các khối, giao dịch và metadata.

**mempool**: Cung cấp một pool chứa các giao dịch đã được xác thực và sẵn sàng đưa vào khối mới.

**Netsync**: Quản lý hoạt động đồng bộ hóa các khối. Nó thực hiện tải xuống các khối , giữ cho blockchain và mempool được cập nhật và cũng lan truyền khối mới được thêm vào chuỗi.

**Peer**: Package này cung cấp các nguyên tắc cơ bản, cần thiết để giao tiếp thông qua Bitcoin wired protocol. Nó bao gồm đọc và viết, handshake, message queueing

**rpcclient**: Package này triển khai API JSON-RPC Bitcoin hỗ trợ WebSocket, giúp giao tiếp với bất kỳ Bitcoin Client nào khác.

**txscript**: Thực hiện bitcoin transaction scripts language ,dùng để xác thực giao dịch bitcoin.

**wire**: Triển khai bitcoin wire protocol. Tất cả việc mã hóa và giải mã tin nhắn trên bitcoin đều được xử lý bởi package này.
Tài liệu btcd cũng bao gồm tất cả các gói ở trên các bạn có thể thử nghiên cứu repo này https://github.com/btcsuite/btcd.

## Building btcd

```sh
git clone https://github.com/btcsuite/btcd $GOPATH/src/github.com/btcsuite/btcd
cd $GOPATH/src/github.com/btcsuite/btcd
GO111MODULE=on go install -v . ./cmd/...
```

btcd (và các tiện ích) sẽ được cài đặt trong \$ GOPATH / bin
## Start btcd với Simnet

Với mục đích test , btcd cung cấp một mạng mô phỏng theo bitcoin ( Simnet ), với độ khó thấp và thời gian mining rất nhanh.

Simnet chạy trong một private network, điều đó có nghĩa là việc tìm peer và node là ko khả dụng. Tất cả các chuỗi và địa chỉ là duy nhất cũng giống như đặc điểm kỹ thuật Bitcoin thật. Vì vậy, nếu bạn muốn sử dụng btcwallet với Simnet, bạn cũng phải chỉ định --simnet flag với nó.

**Start btcd trên simnet:**

```btcd --simnet --rpcuser=youruser --rpcpass=SomeDecentp4ssw0rd```

**Get info**

```btcctl --simnet --rpcuser=youruser --rpcpass=SomeDecentp4ssw0rd getinfo```

**tạo ví** ở đây mình sử dụng [lnd](https://github.com/lightningnetwork/lnd)

Cài đặt :

```sh
go get -d github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
GO111MODULE=on go install -v . ./cmd/...
```

Chạy node lnd : 
```
lnd --rpclisten=localhost:10001 --listen=localhost:10011 --restlisten=localhost:8001
```

Sau đó tạo ví 
```
lncli --rpcserver=localhost:10001 --macaroonpath=data/admin.macaroon create
```
sau đó sẽ hiện ra 
```
Enter the private passphrase for your new wallet:
```

Bạn sẽ được yêu cầu nhập và xác nhận mật khẩu ví cho Alice, phải dài hơn 8 ký tự. Bạn cũng có tùy chọn để thêm passphare vào seed word của mình. Bây giờ, chỉ cần bỏ qua bước này bằng cách nhập vào N khi được nhắc về việc bạn có ghi nhớ hay không và nhấn enter để tiếp tục mà không cần passphrase.

mình chọn là **no** hết vì mình cũng ko cần thêm lớp bảo mật và ko có ví trước đó luôn :)))

đây là kết quả
```sh
Generating fresh cipher seed...

!!!YOU MUST WRITE DOWN THIS SEED TO BE ABLE TO RESTORE THE WALLET!!!

---------------BEGIN LND CIPHER SEED---------------
 1. abstract   2. total     3. just       4. tank   
 5. nuclear    6. leaf      7. airport    8. curtain
 9. bench     10. error    11. ozone     12. remove 
13. million   14. focus    15. fringe    16. assume 
17. toss      18. surface  19. interest  20. scatter
21. similar   22. pill     23. birth     24. clump  
---------------END LND CIPHER SEED-----------------

!!!YOU MUST WRITE DOWN THIS SEED TO BE ABLE TO RESTORE THE WALLET!!!

lnd successfully initialized!
```

**Tạo mới một siment bitcoin address:**

```lncli --rpcserver=localhost:10001 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon newaddress np2wkh```

sau khi chạy thì nhận lại được address **SVN9jH5pfbQxpHoe1hNVJEyUgHoa6ZL3p1**

**Restart btcd với mining address chúng ta vừa tạo**

```
btcd --simnet --rpcuser=youruser --rpcpass=SomeDecentp4ssw0rd --miningaddr=S... (chỗ này điền address vừa tạo nhé)
```

**Cùng nhau thành tỉ phú thế giới ảo với lệnh Mining nào**

bằng cách mining 100 block vs phần thưởng là 50 BTC 

```
btcctl --simnet --rpcuser=youruser --rpcpass=SomeDecentp4ssw0rd generate 100
```

**Check lại balance của account vừa tạo**
```
lncli --rpcserver=localhost:10001 --macaroonpath=data/chain/bitcoin/simnet/admin.macaroon walletbalance
```

Kết quả :
```
{
    "total_balance": "5000000000",
    "confirmed_balance": "5000000000",
    "unconfirmed_balance": "0"
}
```

## Kết bài 

Bài viết này nhằm hướng dẫn cài đặt và sử dụng `btcd`, `btcctl`, `lnd` và `lncli` để chúng ta có những bước đầu tiên khám phá thế giới bitcoin không mới mẻ nhưng vẫn luôn đầy tiềm năng