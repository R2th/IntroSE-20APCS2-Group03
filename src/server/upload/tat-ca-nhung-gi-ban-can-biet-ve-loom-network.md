![](https://images.viblo.asia/b40c74eb-0bec-47ff-a7e7-d603096fae72.jpg)

[Blockchain](https://viblo.asia/p/blockchain-va-hop-dong-thong-minh-dang-thay-doi-nen-tai-chinh-cua-chung-ta-nhu-the-nao-naQZRXmq5vx) là một công nghệ tuyệt vời và vô cùng tiềm năng. Nó hứa hẹn mang lại một giải pháp phi tập trung cho rất nhiều lĩnh vực trong đời sống. Tuy nhiên, một trong những hạn chế lớn nhất mà công nghệ blockchain đang gặp phải chính là vấn đề về tốc độ và khả năng mở rộng khi áp dụng vào những dự án thực tế. Chính vì thế [Loom network](https://loomx.io/) được sinh ra là một trong những nền tảng đầu tiên với khả năng giúp Ethereum mở rộng. Nó cho phép lập trình viên có thể tạo ra những ứng dụng phi tập trung có khả năng mở rộng cao và không tốn chi phí giao dịch trong thực tế. 



# I. Loom Plasmachain
![](https://images.viblo.asia/d7264e51-0248-4384-b7f5-96c419bf9fda.jpeg)
Plasma là một trong những giải pháp hứa hẹn cho việc mở rộng mạng blockchain.
Hiểu đơn giản bạn có thể tạo ra một blockchain chạy trên blockchain gốc (nghĩa là chuỗi chính). Blockchain gốc kiểm tra tính hợp lệ của trạng thái trong chuỗi Plasma bằng cách sử dụng một thứ gọi là fraud proofs (tạm dịch là bằng chứng gian lận). (Lưu ý: fraud proofs là một cơ chế theo đó các nút có thể xác định xem một block có hợp lệ hay không bằng cách sử dụng một phép thử toán học). Từ đó ta có thể xử lý các giao thức trong hợp đồng thông minh khối lượng lớn và nhanh hơn.


[Loom Plasmachain](https://medium.com/loom-network/loom-network-plasma-5e86caaadef2) đóng vai trò như một cây cầu trung tâm nơi mà tất cả các chains kết nối với mạng Ethereum, để giao tiếp giữa các mạng blockchain và cùng nhau chia sẻ thanh khoản của các tài sản được mã hóa 


# II. Loom Transfer Gateway

[Transfer Gateway](https://loomx.io/developers/en/transfer-gateway.html) là cơ chế cho phép các tokens được dịch chuyển giữa các ứng dụng phi tập trung của Loom và mạng Ethereum

Loom Transfer Gateway gồm 4 phần chính:
* Gateway Solidity contract trên Ethereum (Mainnet Gateway)
* Gateway Go contract trên Loom DappChain (DappChain Gateway)
* Address Mapper Go contract trên Loom DappChain
* Gateway Oracle (có thể chạt trong tiến trình trên DappChain node hoặc tiến trình độc lập

## 2.1 Token chuyển từ Ethereum sang DappChain
![](https://images.viblo.asia/785f075e-8041-4623-a702-ed84f67acbe5.png)

Khi người dùng muốn chuyển token từ tài khoản của họ trên Ethereum sang tài khoản của họ trên DappChain thì cần làm những việc sau:
* Đầu tiên chuyển token tới Mainet Gateway
* Mainnet Gateway sẽ gửi đi 1 sự kiện đến Gateway Oracle 
* Gateway Oracle chuyển tiếp sự kiện đó đến DappChain Gateway
* Cuối cùng DappChain Gateway chuyển số token tương ứng đến tài khoản người dùng bên DappChain

## 2.2 Chuyển Token từ DappChain sang Ethereum
![](https://images.viblo.asia/4234e1d7-7d06-4366-9909-a7f223cbf844.png)
Để chuyển token ngược trở lại mạng Ethereum, người dùng cần phải:
* Chuyển token trở lại DappChain Gateway, ở đây sẽ sinh ra một lệnh chờ xử lý rút tiền và gửi tới Gateway Oracle
* Gateway Oracle sẽ kí lệnh rút tiền và thông báo lại cho DappChain Gateway
* DappChain Gateway gửi chữ ký đến cho người dùng và họ có thể dùng để rút tiền bên Mainnet Gateway đến tài khoản của họ
# III. Demo
Trong demo này chúng ta sẽ đi tìm hiểu những bước cần thiết để chuyển tokens giữa contract được deployed ở `extdev` và  `Rinkeby`. 

 Yêu cầu:
> 
> Node >= 8
> 
> yarn or npm
> 
> truffle
> 
## 1. Deploy token contracts to `extdev`
![](https://images.viblo.asia/05df9594-c4a1-49cf-97f6-62602f2ce896.png)
Trước hết bạn phải thực hiện những set up cơ bản sau:
1. Download `Loom` binary. 
```js
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
# set LOOM_BIN to reference the downloaded loom binary,
# makes it easy to invoke it from anywhere
export LOOM_BIN=`pwd`/loom
```

2. Clone the[ Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) repo.
```js
# clone the tutorial repo to the gateway-tutorial directory
git clone https://github.com/loomnetwork/truffle-dappchain-example gateway-tutorial
cd gateway-tutorial
# install dependencies
yarn
```
3. Tạo cặp khóa public key và private key trên `extdev` Plasmachain

```js
$LOOM_BIN genkey -k extdev_private_key -a extdev_public_key
```
Nếu thành công, bạn sẽ thấy hiện lên console tương tự như sau:
```js
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```
Đây chính là public key và private key của account bạn trên `extdev` PlasmaChain, chúng sẽ được lưu trong `extdev_private_key` file và extdev_public_key file.

 4. Cuối cùng là deploy `My token` contract lên `extdev` PlasmaChain.
 ```js
 yarn deploy:extdev
 ```
 
##  2. Deploy token contracts to `Rinkeby`
## 
![](https://images.viblo.asia/7e7cec46-62c0-4870-99bb-8bff54179c6d.png)

1. Mở code của demo, thay thế 3 file 
![](https://images.viblo.asia/302c322e-3f9b-4840-a034-e79d527e7d49.png) lần lượt là account, mnemonic và private key của bạn ( lưu ý: Chỉ nên dùng các tài khoản để test). Hãy đảm bảo rằng có đủ lượng ETH trong rinkeby để deploy contract.
2. Set up Infura API key ( lấy từ https://infura.io/)
```js
export INFURA_API_KEY=XXXXXXXXXXXXXXXX
```
Thay thế đoạn XXXXXXXXXXXXXXXX bằng infura key của bạn.

3. Cuối cùng thì deploy contract thôi:
```js
yarn deploy:rinkeby
```
## 3. Map extdev contracts to Rinkeby contracts
## 

Sau khi deploy contracts lên cả 2 chain rồi, bạn cần phải cho Transfer Gateway biết rằng bạn muốn trao đổi token giữa các contracts đó. Đầu tiên phải map `My token` trên `extdev` với `My Rinkeby Token` contract được deploy trên `Rinkeby`:
```js
node ./gateway-cli.js map-contracts token
```
Sau khi thực hiện câu lệnh trên, Transfer Gateway sẽ xác minh rằng bạn chính là người deploy 2 contract đó.
## 4. Map extdev account to Rinkeby account
Bây giờ thì 2 contracts đã được kết nối với nhau thông qua Transfer Gateway . Tuy nhiên bạn phải kết nối tài khoản giữa tài khoản `extdev` và tài khoản `Rinkeby` để có thể chuyển token giữa 2 bên.
```js
node ./gateway-cli.js map-accounts
```
Ok, vậy là mọi thứ đã sẵn sàng để trao đổi token giữa `extdev` và `Rinkeby` rồi! :+1:

# 5. Token transfer
### Từ Rinkeby tới extdev
Sau khi kết nối contracts và accounts thành công, bây giờ chúng ta có thể trao đổi token và ETH giữa Rinkeby và extdev . Trước tiên cùng tạo 1 số token erc721 và chuyển 1 trong số chúng tới `extdev`:
```js
# mint some tokens on Rinkeby
node ./gateway-cli.js mint-token 1
node ./gateway-cli.js mint-token 3

# transfer a token to extdev PlasmaChain
node ./gateway-cli.js deposit-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```
### Từ extdev tới Rinkeby
Chúng ta có thể chyển erc721 tokens ngược trở lại `Rinkeby` sử dụng câu lệnh `withdraw-token`: 
```js
# transfer a token to Rinkeby
node ./gateway-cli.js withdraw-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```
# IV. Kết luận
Hy vọng rằng qua bài giới thiệu và demo trên bạn đã phần nào hiểu được cách thức hoạt động của Loom transfer gateway và ứng dụng vào project của chính mình. Hẹn gặp lại ở những bài sau! 
# V. Nguồn tài liệu
https://loomx.io/developers/en/intro-to-loom.html#what-is-plasmachain