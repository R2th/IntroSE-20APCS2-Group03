![](https://images.viblo.asia/bc963102-dcc1-4ad1-9283-438bf563b8cf.jpg)

Lần trước thì mình đã có một bài giới thiệu về Azure Blockchain Service và hướng dẫn tạo một member cũng như các config trong transaction node. Thì trong bài viết này mình sẽ tiếp tục chia sẻ về Azure blockchain với phần này sẽ về cách connect đến một trasaction node và tương tác với nó.

# Sử dụng MetaMask - Remix để connect và deploy smart contract

Phần này sẽ là phần hướng dẫn sử dụng MetaMask connect đến Azure Blockchain Service network và sau đó sử dụng Remix để deploy smart contract thì dưới đây sẽ là các yêu cầu ban đầu

### Yêu Cầu
*  Bạn phải có một member Azure blockchain nếu chưa tạo hãy làm theo các bước sau: [create member  ](https://viblo.asia/p/gioi-thieu-ve-azure-blockchain-service-cach-dang-ky-tai-khoan-free-12-thang-V3m5W49QKO7#_huong-dan-tao-mot-member-4)
*  Đã cài đặt [MetaMask browser extension](https://metamask.io/)
* Và đã có một tài khoản ví trên Metamark

### Get endpoint address 

Để connect đến mạng blockchain bạn cần biết endpoint address của transaction node. Thực hiện theo các bước sau:

1. Đăng nhập vào [Azure portal](https://portal.azure.com/).
2. Chuyến đến member bạn muốn connect
3. Chọn **Transaction nodes** và chọn default node

![](https://images.viblo.asia/814b0d08-5671-4fb4-bf99-5c3fac024010.png)

4. Chọn **Connection strings > Access keys**
5. Copy endpoint address từ HTTPS (Access key 1)

![](https://images.viblo.asia/9280cb5c-199f-49ee-9a8b-520d79fedd7d.png)

### Connect MetaMask

1. Mở MetaMask browser extension và đăng nhập
2. Chọn vào phần các network và chọn **Custom RPC**

![](https://images.viblo.asia/6c337b66-bb46-46f0-a6d2-581d8ae78fc1.png)

3. Trong  **New Network > New RPC URL**,  paste endpoint address bạn vừa copy ở trên vào đây

![](https://images.viblo.asia/943908d8-7ae6-402e-9cb6-4d2528dde8ee.png)

4. Chọn **Savce**

5. Sau khi thành công thì ở phần các network sẽ hiện như thế này

![](https://images.viblo.asia/5fb37052-2f9f-4cfc-aac1-2e6d59551cce.png)

### Deploy smart contract

Phần này ta sẽ sử dụng môi trường để viết contract là Remix. Sử kết hợp giữa Metamask với Remix sẽ giúp ta có thể deploy và thực hiện call các function trong smart contract.

1. Chúng ta sẽ truy cập https://remix.ethereum.org
2. Chọn **New file** ở trang **Home**  để tạo mới file có name là `simple.sol` và chọn **OK**

![](https://images.viblo.asia/a1a1b039-4279-42b6-9575-6ba9f855476c.png)

3. Viết một contract đơn giản như sau

```js
    pragma solidity ^0.5.0;

    contract simple {
        uint balance;

        constructor() public{
            balance = 0;
        }

        function add(uint _num) public {
            balance += _num;
        }

        function get() public view returns (uint){
            return balance;
        }
    }
```

4. Tiếp theo sẽ là compile contract, đầu tiên sẽ chọn sang phần **Compile **

![](https://images.viblo.asia/6b7449a8-c749-4d44-a409-b4f94741fefd.png)

5. Sau khi đã compile xong sẽ là đến bước deploy. Chọn **Deploy & Run**  tiếp đó tại phần **Environment** chọn **Injected Web3** để connect thông qua MetaMask


![](https://images.viblo.asia/2be2893a-0c5d-4279-8442-25ab00805897.png)


6. Chọn contract **simple** và sau đó **Deploy** 

![](https://images.viblo.asia/adaf0799-58e6-4c76-af1a-3e3d85c07ccd.png)

7. Nếu ở MetaMask thông báo bạn không đủ tiền để thực hiện transaction. Do đối với public blockchain network bạn sẽ cần Ether để thánh toán cho việc gửi transaction. Vì đây là  private network trong consortium nên bạn có thể set cho gas price về 0.
8. Chọn **Gas Fee > Edit > Advanced**, set **Gas Price** về 0

![](https://images.viblo.asia/a003b0b7-b419-4b15-922e-8eb03085cf02.png)
9. Chọn **Confirm** để deploy smart contract lên blockchain có thể thấy tại Metamask giao dịch đang được thực hiện

![](https://images.viblo.asia/0d5820f1-38e6-4384-b20c-a4ec7bd2ff71.png)

10. Sau khi đã deploy thành công ta sẽ thấy trong phần **Deployed Contracts** và có thể nhìn thấy 2 function đã được định nghĩa khi viết smart contract

![](https://images.viblo.asia/7dd5253d-2a2f-4fc0-9610-456226653d49.png)

11. Function **add** sẽ là function làm thay đổi storage nên khi thực hiện cần tạo transaction. Còn **get** chỉ xem dữ liệu nên sẽ không cần tạo transaction.
12. **Add**

![](https://images.viblo.asia/2e424e68-8f4c-4843-8a19-14cafb9caccf.png)

13. **Get**

![](https://images.viblo.asia/2f2596aa-d56d-400f-8913-de7f2cf29144.png)



# Connect với Vscode
Như ở trên là connect với Metamask - Remix đến phần này chúng ta sẽ sử dụng với Vscode

### Yêu cầu
* Một điều không thể thiếu đó là cần có một member nếu chưa có thì xem [tại đây](https://viblo.asia/p/gioi-thieu-ve-azure-blockchain-service-cach-dang-ky-tai-khoan-free-12-thang-V3m5W49QKO7#_huong-dan-tao-mot-member-4)
* Đã cài đặt Vscode - nếu chưa cài đặt thì truy cập [Visual Studio Code](https://code.visualstudio.com/Download)
* Sau đã cài đặt cần phải cài đặt thêm [Azure Blockchain Development Kit for Ethereum extension](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain) trong Vscode
* [Node.js 10.15.x](https://nodejs.org/en/) hoặc hơn
* [Git 2.10.x](https://git-scm.com/) hoặc hơn
* [Python 2.7.15](https://www.python.org/downloads/release/python-2715/) đã add path trong hệ thống vì thằng extension trên yêu cầu máy phải có python từ 2.7.15 
* [Truffle 5.0.0 ](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
* [Ganache CLI 6.0.0](https://github.com/trufflesuite/ganache-cli)

Đối với Windows cần có trình biên dịch C++ đã có cài đặt module node-gyp. Cố thể sử dụng công cụ MSBuild:

* Nếu đã cài đặt  Visual Studio 2017 thì sử dụng command `npm config set msvs_version 2017 -g` 
* Nếu đã cài đặt Visual Studio 2019 thì sẽ set path của MS build tool cho npm như ví dụ sau: `npm config set msbuild_path "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe"`
* Còn nếu không phải các trường hợp trên thì run với quyền administrator command sau `npm install --global windows-build-tools`

### Verify Azure Blockchain Development Kit environment

Extension Azure Blockchain Development Kit có thể kiểm tra xem môi trường bạn thiết lập có bị thiếu gì không bằng cách `Ctrl+ Shift + P ` và chọn **Azure Blockchain: Show Welcome Page**. Extension sẽ chạy script để kiểm tra môi trường ta có thể nhìn thấy điều này bằng cách chọn **Terminal > New Terminal**. Trong tab menu chọn **Output** và trong dropdown chọn **Azure Blockchain** kết quả sẽ như sau:

![](https://images.viblo.asia/cb644ac6-1b50-4031-b281-63d1a2b9bc22.png)

Còn nếu môi trường của bạn thiếu phần gì thì một tab **Azure Blockchain Development Kit - Preview** mới sẽ được hiện ra những môi trường nào bạn còn thiếu

![](https://images.viblo.asia/e9b2f08e-089f-49dc-9c70-aedd2d203376.png)

### Connect to consortium member

Sau khi đã xong hết các yêu cầu về môi trường chúng ta sẽ đến phần connect với mạng blockchain

1. Mở extension Azure Blockchain trong Vscode
2. Chọn **Connect to network**

![](https://images.viblo.asia/5f005fe2-a8f2-48f7-83be-03c563cfa2d5.png)

3. Sẽ có nhiều lựa chọn cho bạn như mồi trường `local` hay `service` thật

![](https://images.viblo.asia/326d6512-53c7-4be7-9669-a3634cca7b54.png)

4. Ở đây nếu chọn **Azure Blockchain Service** nó sẽ yêu cầu bạn **Sign**

![](https://images.viblo.asia/c09b96a4-644d-43aa-95bd-50681e2c16d8.png)

![](https://images.viblo.asia/d7afe03f-51e8-4b56-81ec-9cfc80c93ea8.png)

5. Kết quả sẽ như sau 

![](https://images.viblo.asia/25540023-da27-42bd-9c17-8ee55db0c5f3.png)

# Create, build và deploy smart contract bằng  Vscode

Vậy là ta đã tạo được connect từ Vscode đến mạng blockchain bây giờ ta có thể thực hiện các bước tiếp theo để deploy được một contract lên mạng blockchain

### Create smart contract

1. Trong Vscode `Ctrl + Shift + P ` chọn **Azure Blockchain: New Solidity Project**
2. Sẽ có 2 lựa chọn 1 là template `Metacoin` của truffle 2 là `Create basic project` sẽ ra một tempate của Azure
3. Như ở đây mình chọn loại basic và đặt tên `HelloBlockchain` chọn thự mục mình muốn tạo và **Select new project path**
4. Một project theo chuẩn của Azure sẽ được tạo ra như sau

![](https://images.viblo.asia/575d55c6-2472-461f-969b-3935df580864.png)

### Build smart contract

Công việc build contract cũng khá đơn giản chỉ cần làm theo các bước sau đây

1. Mở project vừa tạo và vào thư mục `contracts`
2. Chuột phải vào **HelloBlockchain.sol** và chọn **Build Contracts** 

![](https://images.viblo.asia/0f6210d2-1af0-4160-881b-1c8d2ce8d5ca.png)

3. Nếu để ý trong phần **Output** sẽ thấy Azure Blockchain vẫn sử dụng Truffle để complie smart contract.

![](https://images.viblo.asia/207838da-f64b-4aca-831b-75ece139d8cb.png)

### Deploy smart contract

Sau khi compile thành công sẽ đến bước deploy lên mạng blockchain

1. Chuột phải vào **HelloBlockchain.sol** và chọn **Deploy Contracts**
 
![](https://images.viblo.asia/6113e068-854e-4142-80b7-c01096095f3c.png)

2. Sẽ có nhiều lựa chọn là deploy mạng local hay lên mang blockchain như ở đây mình chọn mạng Azure blockchain 

![](https://images.viblo.asia/1e09821f-ecf6-471e-84db-816335d23002.png)

3. Chọn tạo ra `mnemonic` mới hay sử dụng mnemonic cũ ở đây mình chọn tạo ra cái mới và chọn thư mục để lưu

![](https://images.viblo.asia/2d9b9c17-6ee1-41b7-94de-565e5c481534.png)

4. Sau khi chọn xong trong `truffle-config.js` sẽ tự động thêm một `HDWalletProvider` với thông tin mạng tương ứng

![](https://images.viblo.asia/a3af776c-f19f-4f51-b20f-78ec7c2b284b.png)

5. Và hãy cũng theo dõi quá trình deploy quá **Output**

![](https://images.viblo.asia/4d54597a-dc9d-40a7-8586-7c182d1c5616.png)

### Call contract function

Bây giờ smart contract đã được deploy ta có thể test các function của contract rất đơn giản. Azure Blockchain Development Kit cung cấp cho chung ta một giao diện để tương tác vô cùng thuận tiện

1. Chuột phải vào **HelloBlockchain.sol** chọn **Show Smart Contract Interaction Page**

![](https://images.viblo.asia/26b1b05f-5e3c-43e8-9cf5-76172dd3ac39.png)

2. Một giao diện để ta tương tác với smart contract trên blockchain

![](https://images.viblo.asia/343ef373-acff-4ef6-aedd-561bdbfa1326.png)

3. Quan lý được các phiên bản đã deploy lên 

![](https://images.viblo.asia/a03614c9-9b12-4355-9ca2-afb7215e5d2d.png)

4. Có thể lấy `Abi` hay `Bytecode` ở ngay bên dưới

![](https://images.viblo.asia/35f4b26e-c6aa-4e03-87c5-326492359e1a.png)

5. Giờ ta sẽ thử call một function **SendRequest** với nội dung **Hello! Nghĩa** xem **requestMessage** state có thay đổi không nha

![](https://images.viblo.asia/815434e7-7c54-4441-a944-05da1d3e41b2.png)

6. Ok vậy là ta đã thay đổi được state 


# Kết Luận
Và như vậy ta đã có thể connect với Azure Blockchain với việc sử dụng Metamask - Remix và Vscode. Mong rằng bài viết đã giúp bạn có thể tạo tác được với Azure Blockchain, cảm ơn đã đón đọc và hẹn gặp lại trong các bài viết tiếp theo. Đừng quên **Up vote** và **Follow** để nhận được thông báo khi có bài viết mới nha.

**Nguồn**: 

https://docs.microsoft.com/en-us/azure/blockchain/service/connect-vscode
https://docs.microsoft.com/en-us/azure/blockchain/service/connect-metamask
https://docs.microsoft.com/en-us/azure/blockchain/service/send-transaction