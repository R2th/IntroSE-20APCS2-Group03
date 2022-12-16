## Giới thiệu
- Tiếp tục với solidity và smart contract, chúng ta tìm hiểu tiếp về Ethereum Virtual Machine 

- Vẫn như cũ, các bạn có thể tìm đọc [Tài liệu gốc về solidity ở đây ](https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html)

- Minh thì có nhiều cái phải học, nhiều cái thấy hứng thú, nên cứ thích cái gì, thì tìm hiểu về cái đó thôi, nên không biết solidity này bao giờ mới hoàn thành.

Ví dụ trong công việc, tìm hiểu một cái mới hay ho, trong ngôn ngữ mình đang làm, thì mình sẽ gác cái solidity này lại, để viết về cái hay ho đó, chia sẻ cho anh em.

Còn solidity mình vẫn đang học, và đang tìm hiểu trong thời gian rảnh. Nên mình cũng chưa phải chuyên gia về smart contract hay solidity, nên có nhiều thứ trình bày kém, anh em có thể góp ý thêm, mình sẽ giành thời gian để sửa.

Mình sẽ cố gắng giành thời gian dịch tài liệu trên trang tài liệu gốc, để mọi người, có cái đọc cho vui giải buồn. Trên viblo có khá nhiều bài về smart contract và solidity, mọi người quan tâm có thể tìm hiểu thêm [ở đây ](https://viblo.asia/search?q=smart%20contract%20solidity).

Khuyến khích đọc các bài viết của anh [Kiên đi nắng](https://viblo.asia/u/kiendinang). Là một trong user mình follow, nhiều kiến thức anh ấy trình bày rất dễ hiểu, và là người tìm hiểu khá kỹ về smart contract và ethereum, cùng với anh [Tiến](https://viblo.asia/u/vigov5), và anh [Thắng](https://viblo.asia/u/thangtd90), là các tác giả trên viblo, mà mình nghĩ là các bạn nên follow để theo học. Khi rảnh, mình cũng hay lên viblo đọc các bài viết về công nghệ của các anh này. Rồi, lan man chút thôi, để anh em muốn có ý định học và làm về smart contract và sử dụng solidity có hướng mà học, giờ đến với chủ đề chính của bài viết này nào, về  "ethereum virtual machine" (tạm dịch là máy ảo chạy ethereum) :facepunch:
## Ethereum Virtual Machine 
### Tổng quan.
- Ethereum virtual machine (viết tắt là EVM), là môi trường chạy thời gian thực (runtime environment) cho những *smart contracts* trên nền tảng Ethereum. Nó (EVM) không hẳn là một cái sandbox (khái niệm sandbox trong lập trình là cái khá phổ biến, nó không phải hộp đen của máy bay hay tàu thủy đâu, nhưng nó cũng có nghĩa tương tự, nó là môi trường test, mình cứ test thoải mái trên đó, mà không lo nghĩ ảnh hưởng đến cái gì cả), nhưng nó khá là độc lập, điều đó có nghĩa là khi code bạn viết chạy trên EVM, nó sẽ không truy cập đến mạng, các file hệ thống, hoặc các tiến trình khác. Thậm chí, các smart contract còn bị giới hạn về việc truy cập các smart contract khác, trên cùng một EVM.
- Nói thì có vẻ to tát vậy thôi, chứ EVM hiểu chung chung là cái máy ảo thôi, giống như dùng Virtual ENV, hay bạn dùng vmware workstation để cài một cái hệ điều hành khác để dùng vậy. Nó không được truy cập đến mạng, các file hệ thống của máy, cũng không vào được các ổ đĩa trên máy thật (nếu bạn không cho phép). Còn network được đề cập đến ở Ethereum Virtual Machine, được hiểu là đề cập đến Ethereum network nhé, chứ không phải mạng internet thông thường. 

### Accounts
- Có hai loại tài khoản (account) trên Ethereum: **External account**, **Contract account**.
- Hai loại tài khoản (external và contract) có thể chỉ sử dụng một cùng một địa chỉ. Với external account, là tài khoản thông thường, sử dụng cập private-public key. Loại contract account thì liên hệ mật thiết với code đã được lưu trữ. Theo ý mình hiểu, thì người dùng external account, sẽ như một người dùng thông thường, chỉ biết sử dụng các tính năng thông qua các giao diện người dùng, còn **contract account** thì giống như coder chúng ta, code bục mặt để xây dựng các tính năng ấy.
- Địa chỉ của **external account** sẽ được xác định bởi cặp private-public key được đề cập ở trên, trong khi địa chỉ của **contract account** sẽ được xác định ngay tại thời điểm mà contract được tạo ra.
- Bất kể là có sử dụng để lưu code hay không (tức là có sử dụng là **contract account** hay không), thì hai tài khoản này được đối xử như nhau trên EVM. 
- Mỗi account sẽ có một cặp key-value được lưu trữ với định dạng là các từ 256 bit, và nó được gọi là **storage**
- Hơn nữa, mỗi account sẽ có một **balance** (từ tiêng anh thì có thể hiểu theo một vài nghĩa, nhưng mình hiểu ở đây là số dư, giống như số dư trong tài khoản ngân hàng của bạn vậy)

 :information_source:  ở đây có đề cập đến (1 ether = 10^18 [wei](https://forum.ethereum.org/discussion/304/what-is-wei)). **Balance** này có thể thay đổi thông qua các giao dịch được biết đến là các transaction trên các nền tảng Ether 
### Transaction 
- Transaction là một mesage được gửi từ một account đến một account khác (có thể là các account khác), nó phải giống nhau hoặc từ **special zero-account** (sẽ được đề cập đến sau). Nó bao gồm dữ liệu nhị phân (binary data), thường được gọi là payload và **Ether**
- Mình bổ sung thêm ở đây cho dễ hiểu một chút. Nền tảng Ether là các ứng dụng/nền tảng được xây dựng trên nền tảng Ethereum. Còn **Ether** giống như coins trong bitcoin hoặc tiền/vàng ấy, nó **mang tính giá trị** trên nền Ether. Điều này có nghĩa là, khi một transaction được gửi đi, với dữ liệu của nó, thì người gửi phải mất một ít ether. 
- Nếu tài khoản nhận (trong 1 transaction có tài khoản nhận và tài khoản gửi nhé, bản gốc nó là target account mà mình dịch nó là tài khoản nhận thì nó khá là tối nghĩa, nên phải giải thích thêm cho dễ  hiểu), tồn tại code, thì code đó sẽ thực thi, và **payload** trong tracsaction được gửi đến được xem như nào input đầu vào của code.
- Nếu **target account** (tài khoản nhận) là **zero-account**, thì **transaction** sẽ tạo ra một **new contract**. 

:information_source: **zero-account** là tài khoản có địa chỉ là **0**.
- Giống như đã được đề cập đến ở trên, địa chỉ của một contract không phải là **zero address** (tức là **0**), nó (contract) sẽ xác định được người gửi và số transaction đã được gửi của nó. Dữ liệu của transaction tạo contract sẽ dược dữ lại trên EVM dưới dạng các bytecode, và được thực thi. Dữ liệu đầu ra của thực thi sẽ được lưu trữ như là code của contract. Điều này đồng nghĩa với việc , khi mà thực hiện việc tạo ra một contract, bạn không cần thiết phải gửi các code của contract (vì code của contract được sinh ra sau khi transaction tạo contract được thực thi).

:information_source: Trong khi một contract đang được tạo, code của contract vẫn là rỗng, chính vì vậy, bạn không nên gọi đến contract trong quá trình này, hãy thực hiện và gọi nó khi nó được tạo xong.

### Gas 
- Trong quá trình tạo, mỗi một transaction sẽ phải trả phí, dù ít hay nhiều. Cái này được gọi là **gas**. Mục đích của nó là giới hạn số việc cần phải thực hiện và trả cho việc thực thi transaction trong thời gian đó. Trong khi EVM thực hiện một transaction, gas sẽ giảm dần cho đến khi nó hết theo một số các quy luật đặc biệt. 
- **gas price** là gia trị được đặt bởi người tạo ra transaction, người này phải trả **gas_price * gas** trước khi việc gửi transaction được thực hiện. Sau quá trình thực thi, gas sẽ được trả cho creator (người tạo contract).
- Nếu gas được sử dụng có thể là bất kỳ số nào (nó tất nhiên phải là số dương), nếu out-of-gas exception được nhận diện, EVM sẽ revert lại mọi thay về trạng thái tại lúc gas hết.
- Có vẻ hơi lủng củng, bạn có thể hiểu là khi gửi một transaction đến một contract, bạn phải mất phí, cái đó gọi là gas, dù ít hay nhiều, và gas này được người tạo ra transaction trả. gas này sẽ trả cho người tạo ra contract, mà nó thực thi transaction đã gửi kia. Khi gas hết, thì trạng thái sẽ dừng lại, và sẽ chờ chi phí tiếp, nếu không có, thì trạng thái thay đổi như nào sẽ giữ nguyên coi như là trạng thái mới. 

### Storage, Memory, Stack
- EVM có 3 vùng có thể lưu trữ được dữ liệu: storage, memory và stack.
- Mỗi một account sẽ có một vùng dữ liệu, và chúng được gọi là **storage**, nó nằm ở giữa việc function call và các transaction. Storage là một cặp key-value được lưu trữ, với key và value là những từ 256 bit. Không có khả năng để tính toàn **storage** trong một hợp đồng, và khá tốn kém để đọc dữ liệu từ **storage**, và còn tốn kém hơn nữa để thay đổi **storage**. Một contract không thể đọc hay ghi vào bất kỳ vùng storage nào khác ngoài vùng storage của chính nào.
- Vùng data thứ hai được gọi là **memory**. Nó là vùng được làm mới một cách thường xuyên với mỗi một **thể hiện** trên mỗi message được gọi đến. **Memory** là tuyến tính và có thể đánh địa chỉ ở byte level. Đọc nó mặc định sẽ có độ rộng là 256 bit, trong khi ghi ta có thể chọn 8 bit hoặc 256 bit. Memory có thể mở rộng bở một từ (256 bit), khi truy cập đến (ví dụ như đọc hoặc ghi) từ một bộ nhớ trước đó. Trong quá trình tăng lên của memory, giá được quy định trong gas và phải trả. Giá của memory sẽ càng lớn khi sự mở rộng của nó càng cao.
- EVM không phải là một **register machine** mà là một **stack machine**, vì vậy mọi tính toán được thực hiện trên một vùng gọi dữ liệu gọi là **stack**. Nó có kích thước tôi đa là 1024(2^10 thì phải) các thành phần và chứa các từ 256-bit. Truy cập vào stack theo thứ tự top cho đến hết stack theo quy luật sau: Nó có thể copy 16 element trên đầu và thay đổi một trong những element trong 16 element này với element bên trên nhất. Mọi phép toán được lấy  từ hai hoặc nhiều hơn các element, và kết quả của chúng sẽ lại được đẩy vào stack. Dĩ nhiên, có thể di chuyển các thành phần của **stack** vào storage hoặc memory để truy cập sâu hơn vào stack... nhưng không thể truy cập các phần tử sâu hơn, nếu phần tử trên nhất của stack chưa ra khỏi stack. Điều này, nếu bạn làm đã từng đọc qua về kiểu dữ liệu stack, thì khá là dễ hiểu. Nhưng nếu khó hiểu quá, thì hãy tưởng tượng theo cách sau:

ta có một mảng a gồm 5 phần tử 1, 2, 3, 4, 5
```
a = [1, 2, 3, 4, 5]
```
Mỗi lần, ta sẽ lần lượt duyệt các phần tử của mảng, nhưng mỗi lượt ta chỉ được truy cập vào mảng 3 lần.
Nếu theo lần lượt, ta sẽ duyệt 3 phần tử 1, 2, 3 của mảng a 
Muốn truy cập vào phần tử 4 của mảng a, ta phải đợi lượt sau, nhưng nếu phần tử 1 của mảng a vẫn còn, thì dù lượt sau hay lượt sau nữa, nếu theo thứ tự và chỉ duyệt được 3 lần, ta cũng chỉ truy cập được đến 3 phần tử 
 1, 2,3 mà thôi. Vậy muốn truy cập đến phần tử 4 của mảng a, ta ném phần tử 1 ra ngoài mảng a 
 mảng a sẽ như sau
 ```
a = [2, 3, 4, 5]
```
Vậy vẫn theo luật: ta sẽ truy cập theo thứ tự, 1 lượt 3 lần vào mảng a 
ta sẽ truy cập được 3 phần tử : 2, 3, 4. 
Cứ như vậy, nếu ta ném phần tử đầu tiên là 2 đi, ta sẽ truy cập lượt tiếp theo là 3, 4, 5 của mảng a

Vậy stack của EVM cũng vậy, nó không chỉ có 5 phần tử  từ 1 đến 5 như mảng a, mà nó có tối đa là 1024 phần tử, và mỗi lượt truy cập không phải 3 lần mà là 16 lần. Ngoài ra trong kích thước truy cập mỗi lần, ta có thể truy cập bất kỳ phần tử nào. Còn việc truy cập và đổi chỗ các phần tử của stack, thì hiểu là 
```
a = [1, 2, 3, 4, 5]
```
ta chặt ra phần tử theo thứ tự từ đầu đến cuối mảng
```
a = [4, 5]
// mảng chặt ra 
b = [1,2,3]
```
Ta có thể truy cập mảng b không theo thứ tự vẫn được. 
:cry: càng giải thích thì càng khó hiểu nhỉ. Thôi, bạn nào vẫn chưa biết gì về stack, thì lên google tìm hiểu: cấu trúc dữ liệu stack, có nhiều thầy giảng hay lắm, vì nó là cấu trúc dữ liệu cơ bản như mảng vậy.


### Instruction Set
- Instruction set của EVM là cơ chế tối thiểu để tránh việc thực hiện không chính xác hoặc các nguyên nhân đến các vấn của sự không đồng bộ, đồng thuận. Mọi phép toán **instruction** để là kiểu dữ liệu cơ bản, 256-bit và sử dụng rất ít memory. Chỉ thực hiện các phép toán cơ bản, các bit hay các phép toán so sánh logic. Điều kiện và không điều kiện nhảy là không thể. (nó giống như kiểu câu lệnh jumps to label). Hơn nữa, constract có thể truy cập các thuộc tính có liên quan của khối hiện tại như số và dấu thời gian của nó (timestamp)

### Message calls 
- Các contract có thể gọi đến các contract khác hoặc gửi Ether đến các tài khoản non-contract (cụ thể là external và zero như mình đề cập ở trên), điều này gọi là message call. **Message call** giống như transaction, nó có nguồn gửi, nguồn nhận, data payload (dữ liệu binary data), Ether, gas và dữ liệu trả về. Tất nhiên, mọi transaction của message call có thể tạo ra thêm nhiều message call con. 
- Một contract sẽ có thể quyết định xem nó sẽ giữ lại bao nhiêu gas và sử dụng bao nhiêu gas trong message call. Điều này cũng thực tế là sự ăn chia giữa các bên, khi contract nhận gas, Ether từ người gửi, (người tạo ra transaction) thì giờ đây, contract lại đóng vai trò là người tạo ra các transaction, và thỏa thuận về việc sẽ giữ lại bao nhiêu phần trăm lợi nhuận cho chính bản thân mình. Trong trường hợp **out-of-gas exception** diễn ra trong quá trình call message, nó sẽ đưa ra thông báo lỗi vào stack. Trong trường hợp này, gas được gửi với call message được sử dụng sẽ phải tăng lên. Trong Solidity, calling contract (cái contract mà tạo ra message call đến contract khác) thường sẽ đưa ra một exception mặc định, và exception này sẽ nổi lên trên trong call stack. 
- Giống như nói từ trước, contract được gọi đến, sẽ nhận một lần làm mới, xóa bỏ bộ nhớ đệm (memory) và có thể truy cập vào call payload được cung cấp và tách rời ở một vùng dữ liệu gọi là **calldata**. Sáu khi thực thi xong, nó( contract được gọi đến) sẽ trả về dữ liệu và nó được lưu trữ ở một vùng nào đó trên memory của contract tạo ra message call. Mọ quá trình message calls sẽ được đồng bộ và thống nhất. 
- Giống stack, mà mình nghĩ message calls cũng là stack ấy, nó có tối đa 1024, như vậy đối với các hoạt động phức tạp, vòng lặp sẽ được ưu tiên hơn là sử dụng gọi đệ quy. Hơn nữa, chỉ có thể 63 hoặc 64 gas được gửi đi trong 1 tin nhắn (giống ở stack là 16 nhé), đó là nguyên nhân, trong thực tế, người ta thường giới hạn nhỏ hơn 1000 đối với size tối đa. (theo đề cập ở trên là 1024).

### Delegatecall/ Callcode and Libraries 
- Ở đây có một số biến thể của message call, nó được gọi là **delegatecall**. Nó (delegatecall) như một cuộc gọi thông báo ở thực tế, mà địa chị được gọi đến sẽ thực hiện nội dung của calling contract (contract tạo ra message call) và giữ nguyên giá trị của **msg.sender** và **msg.value**.
- ĐIều này có nghĩa là một contract có thể load động code của mình từ các địa chỉ khác nhau trong thời gian chạy. Storage, địa chỉ hiện thời (address), **balance** sẽ được tham chiếu đến calling contract, trong khi chỉ code được giữ lại ở địa chỉ được gọi đến. 
- Điều này mở ra khả năng cài đặt các thư viện "library" trong Solidity. Tái sử dụng các code từ thư viện sẽ được áp dụng ở vùng **storage** của contract, hoặc cài đặt trong các cấu trúc dữ liệu phức tạp.

### Logs 
- Lưu trữ dữ liệu và chỉ mục về cấu trúc dữ liệu đến block-level, đó chính là log.Log trong Solidity được sắp xếp sử dụng để cài đặt các event. Các Contract không thể truy cập vào dữ liệu log sau khi nó được tạo ra, nhưng nó có thể thường xuyên truy cập đến từ ngoài block-chain. Có một phần dữ liệu log được lưu trữ tại **bloom filter**, điều này tạo điều kiện cho việc tìm kiếm dữ liệu một cách thường xuyên, và cũng là một con đường được bảo mật và an toàn. Các mạng network peer-to-peer không thể tải về log của khối block-chain, nhưng vẫn truy cập vào được. 

### Create 
- Các contract có thể tạo ra các contract khác sử dụng một mã opcode đặc biệt, điều này giống với địa chỉ **zero** được đề cập ở trên vậy. Chỉ có một điều duy nhất khác giữa **create calls** và các message call thông thường là **payload data** sẽ được thực thi và kết quả sẽ được lưu trữ như code của một caller/creator với địa chỉ là địa chỉ của contract mới trên stack. 

### Deactivate and Self-destruct
- Chỉ có một cách duy nhất để loại bỏ code ra khỏi một khối blockchain là khi contract ở địa chỉ đó gọi **selfdestruct**. Trong quá trình đó thì **Ether** mà contract lưu sẽ được gửi tới một địa chỉ được chỉ định, và code sẽ được xóa khỏi trạng thái. Xóa một contract theo lý thuyết nghe có vẻ là một ý tưởng tốt, nhưng trong thực tế, đó là một lựa chọn nguy hiểm và nhiều nguy cơ, có thể làm mât **Ether** một cách vĩnh viễn. 

:information_source: Nếu contract không có hàm tự hủy của nó **selfdestruct**, thì nó vẫn có khả năng sử dụng và thực hiện việc đó thông qua **delegatecall** hoặc **callcode**
- Nếu bạn muốn deactive **contract** của bạn, thì bạn nên **disable** thay vì xóa nó. Điều này đảm bảo việc khả năng sử dụng lại contract ngay lập tức khi cần thiết.