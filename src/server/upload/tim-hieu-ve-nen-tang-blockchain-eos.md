![](https://images.viblo.asia/f45185bf-6ea1-4d9b-88d0-8d01c98aad13.jpg)

## 1. EOS là gì ?

EOS hay EOSIO là một nền tảng blockchain với kiến trúc cho phép các ứng dụng phi tập trung (Dapps) có thể được mở rộng theo chiều dọc và chiều ngang (vertical and horizontal scaling), nó còn có thể được sử dụng để khởi chạy các mạng blockchain public hoặc private. Cũng tương tự như Ethereum, EOS cho phép các nhà phát triển có thể xây dựng các Dapp thông qua hợp đồng thông minh. Theo nhóm phát triển của dự án EOS, nền tảng có thể đạt tốc độ lên đến hàng triệu giao dịch mỗi giây nhờ vào kiến trúc do nhóm phát triển EOS xây dựng.

## 2. Đặc tính kỹ thuật

### C++/WASM Virtual Machine

EOS sử dụng ngôn ngữ C++ để viết hợp đồng thông minh. C++ là một ngôn ngữ lập trình phổ biến, các nhà phát triển không cần học thêm một ngôn ngữ mới để có thể bắt tay vào lập trình (như Solidity của Ethereum).

Giống như Ethereum, EOS cũng có một máy ảo để thực thi hợp đồng thông minh được gọi là  máy ảo WebAssembly (WASM Virtual Machine). WebAssembly (WASM) là một dạng mã nhị phân dành các máy ảo dạng stack-based, WASM đã được sử dụng rộng rãi bởi các tập đoàn lớn như Google, Microsoft, Apple, v..v. Lựa chọn thiết kế máy ảo sử dụng tiêu chuẩn WASM cho phép EOS tận dụng sức mạnh  rất lớn của cộng đồng đang tham gia phát triển các trình biên dịch, bộ công cụ với WASM. 

### Thông lượng cao và khả năng mở rộng

EOS được thiết kế nhằm hướng đến việc xử lý một lượng lớn giao dịch. Sử dụng cơ chế đồng thuận Delegated Proof of Stake (DPOS), mạng blockchain của EOS không cần phải đợi tất cả các nút để hoàn tất giao dịch. Điều này cho phép EOS đạt được thông lượng giao dịch cao hơn nhiều khi so sánh với các cơ chế đồng thuận khác.

### Thời gian xác nhận nhanh hơn và độ trễ thấp hơn
EOS được thiết kế để có độ trễ giao dịch thấp, giúp các ứng dụng phân tán nhanh hơn (vốn xưa nay các Dapp bị chê là chậm, tốn thời gian xử lý).

### Phí giao dịch bằng zero
Không như nhiều nền tảng khác, các giao dịch trên EOS không bị tính phí.

### Hệ thống phân quyền
EOS có một hệ thống phân quyền toàn diện nhằm tùy chỉnh cho các trường hợp sử dụng khác nhau. Chẳng hạn, chúng ta có thể tạo quyền tùy chỉnh và sử dụng nó để bảo vệ một tính năng cụ thể của hợp đồng thông minh. Chúng ta cũng có thể phân chia để gọi các hàm trong hợp đồng thông minh trên nhiều tài khoản với các quyền hạn khác nhau. 

### Khả năng nâng cấp
Các ứng dụng được triển khai trên EOS có thể được nâng cấp. Điều này có nghĩa là các nhà phát triển có thể triển khai sửa lỗi mã nguồn, thêm tính năng hoặc thay đổi logic ứng dụng, miễn là được cung cấp đủ thẩm quyền. Tuy nhiên, cũng có thể triển khai các hợp đồng thông minh không thể sửa đổi trên blockchain. 

### Tiêu thụ ít năng lượng
Với DPOS là cơ chế đồng thuận, EOS tiêu thụ ít năng lượng hơn để xác thực các giao dịch so với thuật toán POW của Bitcoin hay Ethereum.


## 3. Stack

![](https://images.viblo.asia/fc8df15a-cb76-4920-a4ad-e93e9e344d75.png)

### EOS.CTD (Contract Development Toolkit)

EOSIO.CDT là một bộ công cụ dành hỗ trợ việc viết hợp đồng thông minh trên EOS. 

### Nodeos
Nodeos một thành phần cốt lõi của EOS. Nodeos xử lý tất cả các kết nối mạng ngang hàng, lưu giữ dữ liệu lên blockchain. Đối với môi trường phát triển, nodeos cũng có thể được sử dụng để thiết lập một mạng blockchain single node.

### Cleos/Keosd
Keosd phần quản lý các key, tài khoản trên mạng EOS.

Cleos là một công cụ dòng lệnh cho phép các nhà phát triển tương tác với các nút cũng như triển khai, kiểm tra các hợp đồng thông minh của EOS.

![](https://images.viblo.asia/df02f942-63c5-4a3b-a526-0371d29f2b05.png)

### EOSJS
SDK Javascript API để tích hợp với các blockchain trên EOSIO thông qua API RPC của EOS.

### Demux
Demux có nhiệm vụ chuyển hướng các events từ sổ cái blockchain EOS sang các nơi lưu trữ dữ liệu offchain (database, data store,...)

## 4. Demo

Phần này chúng ta sẽ cùng thử viết một hợp đồng thông minh trên EOS và deploy nó. Trước đó, các bạn cần cài đặt eos, eosio.cdt. Hướng dẫn cài đặt chi tiết các bạn có thể xem tại [đây](https://developers.eos.io/eosio-home/docs/setting-up-your-environment).

### Tạo thư mục và file chứa mã nguồn của hợp đồng

```bash
mkdir CONTRACTS_DIR
cd CONTRACTS_DIR
mkdir hello
cd hello
touch hello.cpp
```

### Viết hợp đồng thông minh

```cpp
#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] hello : public contract {
  public:
      using contract::contract;

      [[eosio::action]]
      void hi( name user ) {
         print( "Hello, ", user);
      }
};
```

Đoạn mã trên được viết theo chuẩn C++11, cần import thư viện `eosio/eosio.hpp`,  class `hello` được kế thừa từ class `eosio::contract`. Class `hello` có một method duy nhất là `hi()` với mục đích in ra lời chào. 

### Biên dịch sang dạng wasm

```bash
eosio-cpp hello.cpp -o hello.wasm
```

Khi biên dịch thành công, terminal sẽ ko có cảnh báo lỗi và trong thư mục xuất hiện file mới `hello.wasm`

### Tạo tài khoản

Để deploy hợp đồng thông minh, chúng ta cần có một tài khoản. Để tạo tài khoản, chúng ta cần tạo ví và unlock (chi tiết xem thêm tại [đây](https://developers.eos.io/eosio-home/docs/wallets))


```bash
cleos wallet keys
cleos create account eosio hello EOS7GTyXybBAaeE6vEiLveA4oeKehXzvEN173BA7cXvYWmmg7HwT2 -p eosio@active
```

Kết quả lần lượt là:

```bash
[
  "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
  "EOS7GTyXybBAaeE6vEiLveA4oeKehXzvEN173BA7cXvYWmmg7HwT2"
]
```

```bash
executed transaction: c9fb70626da6d27df377c449d5c92fcf54c7b2505fc10d8174bc38e935cdc8f1  200 bytes  228 us
#         eosio <= eosio::newaccount            {"creator":"eosio","name":"hello","owner":{"threshold":1,"keys":[{"key":"EOS7GTyXybBAaeE6vEiLveA4oeK...
```


### Deploy hợp đồng thông minh với [cleos set contract](https://developers.eos.io/eosiocleos/reference#cleos-set-contract)

```bash
cleos set contract hello CONTRACTS_DIR/hello -p hello@active
```

Kết quả:

```bash
Reading WASM from /home/le.thanh.cong/CONTRACTS_DIR/hello/hello.wasm...
Publishing contract...
executed transaction: 6fd8448504f0f6cccbba2f9039cd7b7da18a05c9b7064d464f28ee2efe854a48  688 bytes  8323 us
#         eosio <= eosio::setcode               {"account":"hello","vmtype":0,"vmversion":0,"code":"0061736d0100000001370b6000017f60027f7f0060037f7f...
#         eosio <= eosio::setabi                {"account":"hello","abi":"0e656f73696f3a3a6162692f312e31000102686900010475736572046e616d650100000000...
```


### Gọi hàm trong hợp đồng
Sau khi đã deploy hợp đồng hello.cpp, chúng ta có thể gọi các hàm bên trong hợp đồng

```bash
cleos push action hello hi '["bob"]' -p bob@active
```

Kết quả:

```bash
executed transaction: 4c10c1426c16b1656e802f3302677594731b380b18a44851d38e8b5275072857  244 bytes  1000 cycles
#    hello.code <= hello.code::hi               {"user":"bob"}
>> Hello, bob
```


## Tài liệu tham khảo
https://developers.eos.io/eosio-home/docs/