Xin chào tất cả mọi người, như tiêu đề của bài viết cũng đã nói thì hôm nay chúng ta sẽ cùng nhau tìm hiểu về một vấn đề, một giải pháp mới cho sự phát triển các ứng dụng trên mạng Ethereum nói riêng và Blockchain nói chung nhé.

> Lưu ý: bài viết này chỉ ở mức giới thiệu và thực hành, (có thể) ở các bài viết sau, mình sẽ đi sâu hơn (một chút :D) về kỹ thuật cũng như một số phần khó hiểu (có thể có) ở bài viết này.

![](https://images.viblo.asia/5f7b1a2f-61d3-4fee-8467-d417e842a06d.jpg)


### Mục lục:

#### 1. Vấn đề - giải pháp 

#### 2, Thực hành

#### 3, Tổng kết

# 1, Vấn đề - giải pháp

### 1.1, Vấn đề

Đôi khi, việc các hợp đồng thông minh có thể truy cập dữ liệu từ các dApp (decentralized application) khác hoặc từ World Wide Web là thực sự cần thiết (kết quả bóng đá, boxing, đua ngựa; thời tiết;...)

Vậy nhưng, việc các hợp đồng thông minh có thể truy cập dữ liệu bên ngoài là cực kì phức tạp do những thách thức về kỹ thuật và các thuật toán đồng thuận của mỗi mạng Blockchain. Do đó, ở thời điểm hiện tại, các hợp đồng thông minh Ethereum chưa hỗ trợ việc truy cập dữ liệu từ bên ngoài mạng Ethereum. Và giải pháp cho vấn đề này (ở thời điểm hiện tại) chính là [Provable](http://provable.xyz/).

![](https://images.viblo.asia/4140ae62-ce9f-4c82-8dde-431fb6f463f2.jpg)

Vậy Provable nó là cái gì?

> Mình xin được lưu ý lại là bài viết sẽ không/chưa (dám) đi sâu vào kỹ thuật mà thay vào đó, thì mình sẽ chia sẻ những gì mình tìm hiểu được qua document cũng như các blog liên quan và chúng ta hãy cùng tìm hiểu chúng qua một ví dụ đơn giản để có thể tiếp cận nó một cách dễ dàng hơn (phần nào).

### 1.2, Giới thiệu về Provable

Để tránh một số hiểu lầm thì Provable - tiền thân là Oraclize và có thể coi là Oraclize phiên bản 2.0, nó thúc đẩy khả năng bảo mật và khả năng tương tác của Oraclize.

![](https://images.viblo.asia/bc973bbf-de8f-4fbf-9795-88df159bb061.jpg)

Theo document của Provable:

> Provable is the leading oracle service for smart contracts and blockchain applications, serving thousands of requests every day on platforms like Ethereum, Rootstock, R3 Corda, Hyperledger Fabric and EOS. 

Tạm dịch ra thì Provable là dịch vụ "oracle" hàng đầu cho các ứng dụng Blockchain và các hợp đồng thông minh, nó hoạt động trên các nền tảng: Ethereum, EOS, Hyperledger,...

> "Oracle" có thể coi là cầu nối giữa thế giới thực và Smart Contract thông qua một bên trung gian thứ ba.
> 

Vậy thì tóm lại, Provable là giải pháp để các hợp đồng thông minh có thể thao tác vơi dữ liệu từ bên ngoài Blockchain thông qua một bên trung gian. Với Provable, các hợp đồng thông minh có thể lấy dữ liệu từ bên ngoài Blockchain và thực thi các API call được cung cấp giống như các ứng dụng thông thường.

![](https://images.viblo.asia/98641e38-fa8e-4cea-9ba1-35c1b69523ce.png)

Provable cung cấp kết nối an toàn giữa các hợp đồng thông minh và thế giới bên ngoài, cho phép tìm, nạp dữ liệu và ủy quyền thực thi mã. Dữ liệu được gửi đến hợp đồng thông minh cùng với cái gọi là "authenticity proof"- một lời bảo đảm, chứng minh rằng dữ liệu (hoặc kết quả) đó không bị giả mạo.

![](https://images.viblo.asia/0bb43d2f-3cb8-4131-9f7c-e5be67d09264.jpg)

Một số case tiêu biểu để thấy Provable thực sự cần thiết:
*  Tạo ra một số thực sự random trên Blockchain là một vấn đề cực kỳ lớn (trong khi rất nhiều ứng dụng trên Blockchain hiện tại dùng đến nó), và Provable có thể lấy số random từ bên ngoài Blockchain (từ một nguồn nào đó mà ta tin tưởng vào thuật toán random của nó) để sử dụng.
*  Trong crowd sales, việc smart contract biết được tỉ giá hiện tại của Ether cũng như các token khác (so với VNĐ, Đô la,...) cũng rất quan trọng.
*  Trong cá cược (đá bóng, đua ngựa,..): sẽ đảm bảo tính fair-play hơn nếu ta có thể fetch dữ liệu kết quả từ bên ngoài (có thể là từ một trang web uy tín nào đó) và đưa lên Blockchain. 

Như vậy, chúng ta đã thấy được một số hạn chế về việc thao tác với dữ liệu của các ứng dụng trên Blockchain và giải pháp cho hạn chế đó. Bây giờ, chúng ta hãy cùng thực hành về giải pháp đó xem nó hoạt động như thế nào và kết quả ra sao. 

![](https://images.viblo.asia/1c99d451-0b59-4af9-b33a-cf4790d65b63.jpg)
# 2, Thực hành
Chúng ta sẽ cùng làm bài thực hành đơn giản: ứng dụng Provable để fetch giá của Ether từ APIs của coinbase về contract của mình và ta có thể dùng nó như dữ liệu trên Blockchain (vì thực ra nó đã được đưa lên Blockchain). Và để đơn giản, thì ta sẽ chỉ test bằng cách viết, chạy smart contract và kiểm tra kết quả.

Trước khi đi vào thực hành thì chúng ta sẽ có một số lưu ý:

* Chúng ta sẽ sử dụng [Remix IDE](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.5.1+commit.c8a2cb62.js) để deploy và test hợp đồng thông minh.
* Ta sẽ chỉ có thể sử dụng mainnet hoặc Ropsten, Kovan và Rinkeby testnets của Ethereum và ở đây, chúng ta sẽ sử dụng mạng Ropsten để test.

### Tiến hành test

Để có thể sử dụng Provable thì ta phải cho contract của chúng ta kế thừa từ `usingProvable` contract của Provable (ta có thể import trực tiếp link github của contract hoặc sẽ tốt hơn nếu ta copy code đó về thư mục của mình để dùng): https://github.com/provable-things/ethereum-api/blob/master/provableAPI_0.5.sol - source github của Provable vì nó là open source và ta có thể vào và kiểm tra code.

Và đây là contract mình đã chuẩn bị: 

```
pragma solidity ^0.5.0;

import "https://github.com/provable-things/ethereum-api/provableAPI_0.5.sol";

contract ExampleContract is usingProvable {

  string public ETHUSD;

  event LogConstructorInitiated(string nextStep);
  event LogPriceUpdated(string price);
  event LogNewProvableQuery(string description);

  constructor() public payable {
    emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
  }

  function __callback(bytes32 myid, string memory result) public {
    if (msg.sender != provable_cbAddress()) {
      revert();
    } else {
      ETHUSD = result;
      emit LogPriceUpdated(ETHUSD);
    }
  }

  function updatePrice() public payable {
    if (provable_getPrice("URL") > address(this).balance) {
      emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
    } else {
      emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
      provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
    }
  }
  
  function getPrice() public view returns (string memory) {
      return ETHUSD;
  }
}

```

Ở mức đơn giản thì việc smart contract của ta áp dụng Provable sẽ thực hiện qua 3 bước:

* Bạn gửi một query tới Provable smart contract.
* Provable nhận query của bạn và tạo một yêu cầu tương ứng.
* Khi Provable contract nhận được dữ liệu (theo yêu cầu), nó sẽ gọi hàm `__callback()` trong contract của bạn- nơi bạn có thể truy cập dữ liệu được yêu cầu.

Và bây giờ thì chúng ta sẽ cùng test contract trên.

Bước 1: Deploy contract

 Ta sẽ deploy contract bằng Remix IDE

![](https://images.viblo.asia/d2a11903-06e4-4101-bc62-6f04e13383eb.jpg)

Bước 2: Kiểm tra 

Ta kiểm tra biến hiện tại của contract:

![](https://images.viblo.asia/aa473f85-119a-4abf-bddb-74fcdd83cd0a.jpg)

Do biến mới khởi tạo nên nó có giá trị là 0.

Bước 3: Thực hiện gọi hàm fetch dữ liệu về

Ta gọi hàm `updatePrice()` để thực hiện fetch dữ liệu từ coinbase API về và lưu nó vào biến `ETHUSD`

![](https://images.viblo.asia/2dbd11d9-01a1-4eff-a931-74d189b91a8a.jpg)

Bước 4: Kiểm tra

Giờ ta sẽ cùng kiểm tra lại giá trị của biến `ETHUSD`

![](https://images.viblo.asia/f2a41d2b-d769-4b02-bbff-23b808fd52f2.jpg)

Bước 5: Đối chiếu lại 

Và cuối cùng thì ta đối chiếu lại trên coinbase xem đã fetch đúng chưa:

![](https://images.viblo.asia/60156991-a79a-46e4-bb69-b60a069ef9bf.jpg)

Bingo! Chính xác như API của coinbase cung cấp và nó đã trở thành 1 biến lưu trữ trên Blockchain :D 

# 3, Tổng kết 

Vậy là qua việc thực hành bằng một contract đơn giản thì ta (phần nào) đã thấy được giải pháp Provable dành cho sự phát triển các hợp đồng thông minh cũng như các ứng dụng trên Blockchain nói chung và Ethereum nói riêng. 

Và tất nhiên, vấn đề nào cũng có tính 2 mặt của nó và mình sẽ cố gắng tìm hiểu kỹ hơn để có thể cùng mọi người thảo luận, giải thích về nó sâu hơn, để có thể ứng dụng nó như một giải pháp cho các ứng dụng trên Blockchain.

Cảm ơn mọi người đã theo dõi bài viết của mình. Vì bài viết cũng chỉ ở mức giới thiệu nên chắc chắn sẽ còn những điểm khó hiểu, mong mọi người thông cảm :D và còn chỗ nào mình thiếu sót, chưa tìm hiểu kĩ thì mong mọi người đóng góp ý kiến và chúng ta cùng chia sẻ về nó :handshake:

Tài liệu tham khảo:

https://docs.provable.xyz/

https://ethereumdev.io/getting-data-internet-oraclize/