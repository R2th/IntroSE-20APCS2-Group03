Hệ sinh thái được cho là  mang đến sứ mệnh xây dựng một nền kinh tế dữ liệu, thúc đẩy phát triển cho nền công nghiệp AI
![](https://images.viblo.asia/72bcf4f5-89c9-434e-bbd3-2cb683ee8591.png)

# Mục tiêu của OceanProtocol

Đầu tiên mình sẽ giới thiệu về mục tiêu hay có thể hiểu là ứng dụng của OceanProtocol

Theo như trang chủ : https://oceanprotocol.com/protocol/ , ứng dụng chính của OceanProtocol chính là xây dựng một hệ sinh thái cho nền kinh tế dữ liệu, có thể hiểu là xây dựng ra một nền tảng để có thể kinh doanh về dữ liệu như : 

* Các bộ dữ liệu được đã được gắn nhãn phục vụ cho AI, deep learning...
* Các mô hình đã được trained 
* ....

OceanProtocl mang đến hệ sinh thái để triển khai các  ứng dụng như vậy, mục tiêu hướng đến 2 loại người dùng chính:
![](https://images.viblo.asia/34d4b49c-3f48-4278-8421-363280072306.png)

* Người sở hữu data là những người có data muốn bán hoặc chia sẻ
* Người sử dụng data có thể là những nhà nghiên cứu, phân tích dữ liệu ...


# Thuật ngữ 
Điều đầu tiên khi tìm hiểu nền tảng này sẽ gặp phải một lượng lớn thông tin về những thành phần của một hệ sinh thái data economy này: 

* **Ocean Network:** Đây là những mạng được cài đặt máy ảo ethereum (EVM) và đã được deployed Ocean Protocol smart contracts (keeper contracts)  , đây là source code của phần keeper contracts: https://github.com/oceanprotocol/keeper-contracts
* **Asset or Data Asset:** Đây là những thứ có thể chia sẻ thông qua Ocean Network, về cơ bản thì hiện tại có thể đăng ký đủ loại data nhưng mục tiêu hướng đến như đã đề xuất thì sẽ là những loại data như **data sets**, **trained model parameters**, **pipelines**, hay **data-cleaning services**
* **Marketplace:** Một service cung cấp hiển thị những Asset có sẵn được cung cấp bởi các Asset owner và người dùng có thể mua chúng hoặc nhận miễn phí
* **Verifier:** Một người hoặc một phần mềm kiểm tra các bước trong transaction. Ví dụ: Xác minh xem liệu chữ ký điện tử có hợp lệ không và sau đó sẽ được nhận reward.
* **Service Execution Agreement (SEA):** Có thể hiểu đây là tổng hợp các đồng thuận của các  đối tượng trong mạng Ocean gồm có publisher, consumer, verifier. Mục đích cuối cùng là xác định những Asset được giao, các điều kiện và phần thưởng tương ứng.

# Các thành phần chính

Để xây dựng các ứng dụng trên nền tảng Ocean Protocol, Ocean foundation đã cũng cấp các components mã nguồn mở để cho các nhà phát triển tự xây dựng các ứng dụng của mình. Như đã đề cập trong phần mục tiêu của OceanProtocol thì họ sẽ hướng đến đầu tiên là các Data Marketplace, do đó các component đầu tiên được xây dựng cũng hướng đến việc hỗ trợ xây dựng một marketplace

## Barge

**Repo:** https://github.com/oceanprotocol/barge

Về cơ bản repo này sẽ là một tập hợp các container sẽ được kích hoạt bằng Docker Compose để tạo ra một mạng local chưa toàn bộ stack của Ocean Protocol (Các components được dưới thiệu tiếp theo)

## Aquarius
**Repo:** https://github.com/oceanprotocol/aquarius

Aquarius lưu trữ các metadata về các Assets. Các metadata này được lưu bởi các cơ sở dữ liệu như Mongodb hoặc Elasticsearch, BigchainDB. Chức năng chính của Aquarius đó là lưu metadata để dễ dàng để thực hiện tác vụ **search**. Do chỉ dùng với metadata nên sẽ tối ưu khả năng query tăng tốc độ tìm kiếm.

Aquarius sẽ chạy một server Flask và sẽ phải deploy để sử dụng

## Brizo
**Repo:** https://github.com/oceanprotocol/brizo

Brizo là một phần kết hợp với Aquarius, Aquarius lưu trữ metadata để có thể search các asset hiện tại thì phần Brizo sẽ là lưu các asset đấy, có thể lựa chọn các loại storage như Azure, Amazon hoặc IPFS,...

Brizo không chỉ đơn giản là một storage mà nó đóng vai trò như một phần của chiếc then cửa bảo vệ dữ liệu của các Asset owner, Brizo nhận các Event từ keeper-contracts để xác định những request acess vào các assets có hợp lệ hay không

## Keeper contracts
**Repo:** https://github.com/oceanprotocol/keeper-contracts

Keeper contracts kết hợp với Brizo sẽ bảo vệ cũng như cấp quyền access và các Asset khi user tạo request. Phần contract này được viết bằng solidity và được deploy lên các network tương ứng như **Mainet ETH**, **Pacific** hay testnet của Ocean là **Nile**.

## Squid
**Repo** https://github.com/oceanprotocol/squid-js

Đây chính là một thư viện cho phía client để có thể tương tác với mạng Ocean, nếu ai đã từng xây dựng các Dapp trên ETH thì có thể hiểu rằng nó sẽ tương ứng với thư viện web3

Ngoài Js thì squid cũng được xây dựng trên các ngôn ngữ khác như Python, Java, ...

# Kiến trúc
![](https://images.viblo.asia/5ce23dcc-63f1-4c5f-a8e0-5ac70fee0eb0.png)

Như trong sơ đồ thì kiến trúc của hệ sinh thái sẽ cần đến 3 tầng, các tầng này được cấu thành từ các components đã được giới thiệu.
Chi tiết từng phần sẽ được dần giải thích qua các bước:

## Tầng 3: Application layer

![](https://images.viblo.asia/3d248a29-6786-4906-885d-6b445e3550e5.png)

Tầng này sẽ là nơi mà người dùng nhìn thấy và tương tác, là các ứng dụng Frontend hay là những tool để người dùng có thể sử dụng tìm kiếm hoặc tạo request access vào các Assets. Về cơ bản thì đây chỉ là phần giao diện người dùng, các action này sẽ thông qua Squid để tương tác với Ocean Protocol

## Tầng 2: Protocol layer

**Aquarius**:

![](https://images.viblo.asia/bbfc4ab0-bddf-442c-b507-4c3f9f016e41.png)

Một trong những phần quan trọng của tầng 2 chính là Aquarius, thông qua Aquarius, người dùng có thể tương tác trực tiếp với dữ liệu metadata với mục đích chính là tìm kiếm các Assets (Hiển thị nhưng không cho truy xuất vào nội dung bên trong Assets)

Tương tác với Aquarius thì có thể trực tiếp thông qua các api vì đơn giản Aquarius là một Flask server, tuy nhiên cũng có thể tương tác thông qua Squid Client - và cách này được recommend nhiều hơn vì nó dễ dàng đồng bộ với các ứng dụng.

**Brizo**

![](https://images.viblo.asia/29f6b746-e89c-4f94-ae2e-14a2938f3d9d.png)

Như đã nói ở phần Brizo thì nó kết hợp với Keeper Contracts để bảo vệ dữ liệu và tất nhiên là Keeper contracts không tồn tại ở tầng 2 mà nó ở tận tầng 3. Vậy làm cách nào để Brizo tương tác với Keeper contracts để bảo vệ assets ? Câu trả lời ở đây là nó dùng một Event Handler để nhận lệnh từ  Keeper Contracts. 

Khi có quyền được cấp bởi Keeper Contracts thông qua Event Handler, Brizo sẽ truy xuất vào storage (có thể là các cloud hay ipfs) để lấy các assets tương ứng.

## Tầng 1: Decentralized VM Layer

Tầng này có thể là coi là trái tim để phân luồng các assets tuy nhiên lại không quá phức tạp để setup, phần contract đã được deploy trên mạng EVM tương ứng

Phần code của contract các  bạn có thể thảo khảo tại đây:  https://github.com/oceanprotocol/keeper-contracts

Như vậy bài viết lần này chỉ giới thiệu cơ bản về các concepts chính cũng như ứng dụng của OceanProtocol, trong bài viết tới mình sẽ hướng dẫn xây dựng một marketplace sample.

# Nguồn

* Core concepts: https://docs.oceanprotocol.com/concepts/introduction/
* Setup guides: https://docs.oceanprotocol.com/setup/quickstart/