Xin chào tất cả các bạn, hôm nay mình xin được giới thiệu 1 số thứ khá hay về Blockchain, đặc biệt là Hyperledger Sawtooth. Điểm qua 1 số phần mình sẽ đi qua trong bài này: Thứ nhất là cách xây dựng mạng thử nghiệm Sawtooth sử dụng thuật toán đồng thuận PBFT, thứ 2 mình sẽ tìm hiểu về thuật toán đồng thuận PBFT và so sánh nó với thuật toán POET, cuối cùng mình sẽ viết thử 1 Smart Contract dựa trên Sawtooth Seth - 1 kết quả từ sự hợp tác giữa Ethereum và Hyperledger Sawtooth.
# 1. Xây dựng mạng thử nghiệm Sawtooth - Creating a Sawtooth Test Network
- Trong phần này, có nhiều cách để tạo mạng thử nghiệm Sawtooth, có thể sử dụng Docker hoặc Ubuntu hoặc Kubernetes. Mình sẽ dùng Docker do khá dễ cài và được khuyến khích nhiều nhất. Trước tiên các bạn cài Docker Engine và Docker Compose, phần hướng dẫn khá chi tiết cho cách cài [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) và [Docker Compose](https://docs.docker.com/compose/install/#install-compose)
- Tiếp theo, ta dowload file Docker Compose cho [PBFT](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/sawtooth-default-pbft.yaml) và [POET](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/sawtooth-default-poet.yaml), các bạn có thể dowload 1 trong 2 file trên hoặc cả 2 để so sánh sự khác nhau. Mình sẽ dowload file Docker Compose cho PBFT nhé ^_^.
- Ta chạy `sudo docker-compose -f sawtooth-default-pbft.yaml up`(cho PBFT) để dowload các container trong file này, điều này tạo ra 5 nút mạng validator-# (0 đến 4), mỗi nút mạng sẽ có 6 container như `sawtooth-validator-default-#`, `sawtooth-rest-api-default-#`, `sawtooth-pbft-engine-default-#`, `sawtooth-settings-tp-default-#`, `sawtooth-intkey-tp-python-default-#`, `sawtooth-xo-tp-python-default-#` (`#` tương ứng với chỉ số nút mạng).
- Mở terminal mới, ta kiểm tra REST API: kết nối tới REST API của 1 nút, chạy `sudo docker exec -it sawtooth-rest-api-default-0 bash` (kết nối với nút đầu tiên), tiếp theo chạy `ps --pid 1 fw`, màn hình terminal sẽ hiển thị ![](https://images.viblo.asia/8754fd3d-c157-44e4-87e8-09bd1bb120be.png)
- Xác nhận chức năng mạng: mở terminal mới chạy `sudo docker exec -it sawtooth-shell-default bash`, tiếp theo chạy `curl http://sawtooth-rest-api-default-0:8008/peers`, màn hình sẽ tên và cổng của nút đầu tiên, như thế này ![](https://images.viblo.asia/6033be75-6474-4ea7-beb6-1d63b0f9d2a0.png)
- Tiếp theo chạy `sawtooth peer list --url http://sawtooth-rest-api-default-0:8008` sẽ hiện thị tất cả các nút ngang hàng với nút đầu tiên (peer to peer), cụ thể sẽ như thế này `tcp://validator-1:8800,tcp://validator-1:8800,tcp://validator-2:8800,tcp://validator-3:8800`, hoặc muốn rõ ràng hơn nữa có thể chạy thêm `sawnet peers list http://sawtooth-rest-api-default-0:8008`.
- Tiếp theo ta gửi 1 giao dịch lên REST API của nút đầu tiên, chạy `intkey set --url http://sawtooth-rest-api-default-0:8008 MyKey 999`, màn hình sẽ hiển thị
```
{
  "link": "http://sawtooth-rest-api-default-0:8008/batch_statuses?id=dacefc7c9fe2c8510803f8340...
}
```
- Ta có thể theo dõi giao dịch này trên các nút mạng khác bằng cách chạy `intkey show --url http://sawtooth-rest-api-default-1:8008 MyKey`, khi đó màn hình sẽ hiển thị `MyKey: 999`. Việc hiển thi Mykey là điều quan trọng khi tạo mạng Sawtooth, nếu không hiển thị Mykey thì việc cài đặt chưa thành công, các bạn có thể vào file Docker Compose PBFT tải từ đầu và sửa phần sawtooth engine phiên bản `chime` xuống `1.0` thì sẽ thành công.
- Cuối cùng là giới hạn các giao dịch cho phép sử dụng mạng Sawtooth, ta kết nối với trình xác thực của nút đầu tiên, chạy `sudo docker exec -it sawtooth-validator-default-0 bash`. Chạy `sawset proposal create --url http://sawtooth-rest-api-default-0:8008 --key /etc/sawtooth/keys/validator.priv sawtooth.validator.transaction_families='[{"family": "intkey", "version": "1.0"}, {"family":"sawtooth_settings", "version":"1.0"}, {"family":"xo", "version":"1.0"}]'` để chỉ định các giao dịch được phép. Lệnh này sẽ đặt `sawtooth.validator.transaction_families` thành mảng JSON có tên và phiên bản chỉ định cho từng loại giao dịch. Kiểm tra việc cài đặt đã thay đổi bẳng cách chạy `sawtooth settings list --url http://sawtooth-rest-api-default-0:8008`, màn hình sẽ hiển thị:
```
sawtooth.consensus.algorithm.name: {name}
sawtooth.consensus.algorithm.version: {version}
...
sawtooth.publisher.max_batches_per_block=1200
sawtooth.settings.vote.authorized_keys: 0242fcde86373d0aa376...
sawtooth.validator.transaction_families: [{"family": "intkey...
```
- Thêm nữa, nếu chúng ta muốn dừng mạng Sawtooth, ta chạy `sudo docker-compose -f sawtooth-default-pbft.yaml down`, đương nhiên nếu muốn bật lại ta chỉ thay `down` bằng `up` mà thôi.
- Như vậy là đã xong phần cài đặt mạng Sawtooth rồi.
# 2. Thuật toán đồng thuận PBFT - Sawtooth PBFT consensus algorithm
- PBFT là 1 công cụ của Hyperledger Sawtooth có khả năng chịu lỗi Byzantine một cách thực tế. Nghĩa là: Mạng Blockchain vẫn an toàn ngay cả khi 1 số nút bị lỗi hoặc bị độc hại miễn là ở dưới mức cho phép của mạng lưới.
- Đảm bảo trung thực, bởi các block được cung cấp là sau cùng, không giống các thuật toán khác kiểu xổ số như PoW hay POET
- Xây dựng dựa trên Leader Note, tức nút lãnh đạo sẽ tạo các block và các nút thành viên bỏ phiếu để tạo sự đồng thuận, chức năng leader sẽ đi qua từng nút theo vòng tròn.
- Mạng PBFT Sawtooth không hỗ trợ đăng ký mở, nhưng các nút có thể được thêm và xóa bởi quản trị viên, mỗi nút phải kết nối với tất cả các nút, mạng phải có tối thiểu 4 nút để đảm bảo tính an toàn.
- Điều quan trọng là trong mạng phải có tối thiểu 4 nút mạng, 1 mạng đã đi vào hoạt động nếu có ít hơn 4 nút mạng sẽ chạy lỗi, mạng tạo mới có ít hơn 4 nút sẽ không thể bắt đầu.
- Mỗi nút trong mạng đều phải sử dụng thuật toán đồng thuận PBFT, gồm có: 
        - Pakage: sawtooth-pbft-engine
        - Executable: pbft-engine
        - Service: sawtooth-pbft-engine.service
- Mỗi nút phải chạy bộ xử lý giao dịch Settings để xử lý các cài đặt chuỗi.
- Khối genesis phải chỉ định tên và phiên bản của công cụ đồng thuận PBFT, sử dụng setting trên chuỗi `sawtooth.consensus.algorithm.name` và `sawtooth.consensus.algorithm.version`.
- Để tìm hiểu sâu thêm về các giải thuật, các bạn có thể tham khảo tài liệu [Sawtooth PBFT](https://sawtooth.hyperledger.org/docs/pbft/releases/latest/architecture.html) này.
# 3. Sawtooth Seth - Compile - Deploy
- Sawtooth Seth bao gồm 3 phần:
    - Seth client
    - Trình xử lý giao dịch Seth tp
    - Máy chủ Seth rpc
- Ta clone về máy project của Seth [github](https://github.com/hyperledger/sawtooth-seth), ta `cd sawtooth-seth`. Chạy `sudo docker-compose up --build` để cài đặt các container cần thiết. Có thể chạy `curl http://0.0.0.0:8080/blocks` để xác định các dịch vụ cần thiết. Chạy `curl http://0.0.0.0:3030 -d '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber"}' -H "Content-Type: application/json"` ta sẽ nhận được đối tượng JSON chưa danh sách các container.
## 1. Tạo tài khoản
- Ta có thể tạo tài khoản như việc tạo khóa riêng cho Seth bằng 2 cách:
    - Tạo khóa private và mã hóa hexa, như tạo khóa bằng `sawtooth keygen`
    - Tạo khóa private sử dụng PEM để mã hóa, có hoặc không có mật khẩu, mật khẩu có thể được tạo bằng lệnh `openssl`
- Ta sẽ dùng cách 2 để tạo account, chạy `sudo docker exec -it seth-cli-go bash`, chạy `openssl ecparam -genkey -name secp256k1 | openssl ec -out key-file.pem -aes128`. Ta có thể thay đổi bằng bất kỳ hệ mã hóa nào khác ngoài `-aes128` (1 hệ mã hóa phổ biến) bằng cách thay phần đó. Chạy tiếp `seth account import key-file.pem myalias`
- Gửi giao dịch lên mạng, chạy `seth account create --nonce=0 --wait myalias`, lệnh này sẽ tạo 1 address 40 ký tự.
- Ta có thể xác thực địa chỉ trên bằng cách chạy `seth show account {address}`
## 2. Compile, Deploy Smart Contract
- Ta tạo 1 folder `contracts/contract.sol`, nội dung file như sau:
```
pragma solidity ^0.4.0;

contract intkey {
  mapping (uint => uint) intmap;

  event Set(uint key, uint value);

  function set(uint key, uint value) public {
    intmap[key] = value;
    emit Set(key, value);
  }

  function inc(uint key) public {
    intmap[key] = intmap[key] + 1;
  }

  function dec(uint key) public {
    intmap[key] = intmap[key] - 1;
  }

  function get(uint key) public constant returns (uint retVal) {
    return intmap[key];
  }
}
```
- Hoặc không cần tạo nữa, ta chỉ cần chạy như sau là có ngay 1 smart contract làm ví dụ 
```
cd sawtooth-seth/
cp contracts/examples/simple_intkey/simple_intkey.sol contracts/contract.sol
```
- Compile contract: Chạy `solc --bin contract.sol`, ta được kết quả: 
```
======= simple_intkey.sol:intkey =======
Binary:
608060405234801561001057600080fd5b50610239806100206000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631ab06ee514610067578063812600df1461009e5780639507d39a146100cb578063c20efb901461010c575b600080fd5b34801561007357600080fd5b5061009c6004803603810190808035906020019092919080359060200190929190505050610139565b005b3480156100aa57600080fd5b506100c960048036038101908080359060200190929190505050610193565b005b3480156100d757600080fd5b506100f6600480360381019080803590602001909291905050506101c2565b6040518082815260200191505060405180910390f35b34801561011857600080fd5b50610137600480360381019080803590602001909291905050506101de565b005b80600080848152602001908152602001600020819055507f545b620a3000f6303b158b321f06b4e95e28a27d70aecac8c6bdac4f48a9f6b38282604051808381526020018281526020019250505060405180910390a15050565b600160008083815260200190815260200160002054016000808381526020019081526020016000208190555050565b6000806000838152602001908152602001600020549050919050565b6001600080838152602001908152602001600020540360008083815260200190815260200160002081905550505600a165627a7a72305820db9e778e020441599ea5a4c88fbc38a17f36647f87712224f92815ad23c3d6a00029
```
- Deploy Contract: ta chạy `seth contract create --wait {alias} {contract}`. Tại `{contract}`, ta chèn blod đã bị mã hóa trước đó. Để xác nhận hợp đồng ta chạy `seth show account {address}`
- Như vậy là ta đã hoàn thành việc viết 1 smart contract làm ví dụ cũng như compile và deploy contract lên mạng Sawtooth.
> Nguồn [Hyperledger Sawtooth](https://sawtooth.hyperledger.org/docs/core/releases/latest/contents.html), [Sawtooth PBFT](https://sawtooth.hyperledger.org/docs/pbft/releases/latest/index.html), [Sawtooth Seth](https://sawtooth.hyperledger.org/docs/seth/nightly/master/contents.html)