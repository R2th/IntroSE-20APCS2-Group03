**Ethereum** của Trung Quốc đó là những gì người ta ví von về **NEO Blockchain**. Chắc mọi người sẽ thắc mắc về lý do đúng không, hôm nay chúng ta sẽ cùng nhau đi tìm hiểu xem NEO có gì hay ho.

![](https://images.viblo.asia/4f8ca18f-d309-47e5-a11f-cb1e02d706b3.png)

# 1. NEO design goals: Smart Economy
**NEO** sử dụng công nghệ blockchain và định danh tài sản kỹ thuật số với tài sản thực. Nó sử dụng smart contract để quản lý tài sản, như các loại blockchain khác thì việc định danh tài sản sẽ thường là một địa chỉ và xác nhận tài sản bằng private key. Điều này có thể tạo lỗ hổng cho phép các kẻ dấu ẩn danh và thực hiện các giao dịch phi pháp. **NEO** thì khác nó sẽ định danh tài sản đó với thông tin thật của người dùng điều này giúp tài sản trở nên minh bạch và điều này hướng đến mục tiêu của **NEO** là tạo dựng một nên kinh tế thông minh.

### 1.1 Digital Assets (Tài sản kỹ thuật số)

Tài sản kỹ thuật số là một dạng chuyển đổi, số hóa từ tài sản thực tế và được định danh bằng dữ liệu điện tử trên mạng Blockchain. Việc số hóa tài sản được thực hiện theo cơ chế phân cấp, tin cậy, dễ dàng theo dõi cũng như minh bạch trong quá trình quản lý.

Trong Tài sản kỹ thuật số được chia ra thành 2 loại: 
- **Global assets** : theo như white paper của NEO thì nó là loại tài sản có thể được ghi lại trên system space và có thể được xác thực bằng bất kỳ smart contract hoặc client nào

- **Contract assets** : là loại tài sản được lưu trữ tại private storage của smart contract và muốn tương tác với nó người dùng cần xác thực là chủ nhân của smart contract đó.

Định nghĩa bình dân một chút xíu là Neo Blockchain sẽ giúp định nghĩa và chuyển đổi “một chiếc xe đạp” -> 1 Đồng NEO. Để làm việc đó thì người đăng ký, người dùng sẽ phải thực hiện định danh thông qua hệ thống của NEO.

Sau khi định danh tài sản 1 Đồng NEO = 1 chiếc xe đạp thì đồng NEO trên Blockchain sẽ tượng trưng cho 1 chiếc xe đạp. Đồng nghĩa ai sở hữu 1 đồng NEO đó thì sở hữu chiếc xe đạp đó.

Thấy đơn giản như thế nhưng việc phát triển và biến nó thành thực tế lại là chuyện khác. Có vẻ thì chặn đường này rất dài và trắc trở.

### 1.2 Digital Identity (Định danh kỹ thuật số)

Nhận dạng số là việc định danh một cá nhân, cá nhân, tổ chức hay một thiết bị nào đó trở thành một dữ liệu dưới dạng kỹ thuật số, được lưu trữ và phân tán rộng rãi trên công nghệ Blockchain. Tài sản được định danh kỹ thuật số trên **NEO** sẽ được xác nhận và bảo vệ bởi pháp luật.

Nói một cách dễ hiểu hơn là khi bạn đi làm tại công ty, bạn chính thức vào làm bạn sẽ được nhân sự dẫn đi lấy dấu vân tay trên máy chấm công. Đó là cách bạn đăng ký với công ty và mật khẩu của bạn chính là dấu vân tay để. Vậy chỉ cần bạn lấy dấu vân tay mỗi sáng là công ty xác nhận bạn có đi làm. Việc đó gọi chung là ĐỊNH DANH hay NHẬN DẠNG.

Cũng giống như vậy, kỹ thuật nhận dạng ở đây chỉ khác là bạn sẽ đăng ký với Blockchain và dữ liệu đó sẽ được phân phối đi khắp nơi trên Blockchain và được dùng cho mục đích định danh bạn, đương nhiên là mật khẩu chỉ bạn có.

Thêm một chút tưởng tượng nếu bạn đã định danh rồi thì khi nơi nào có Blockchain thì nơi đó bạn có thể được xác định, và lúc đó bạn sẽ bị theo dõi bởi Blockchain. Kỹ thuật này phù hợp triển khai cho cảnh sát, phòng chóng tội phạm là bá đạo luôn.

# 2. Công nghệ triển khai

### 2.1 Smart Contract

Hợp đồng thông minh lần đầu tiên được đề xuất bởi nhà mật mã học Nick Szabo vào năm 1994, chỉ 5 năm sau khi World Wide Web được tạo ra. Công nghệ blockchain cung cấp cho chúng ta một hệ thống phi tập trung, chống giả mạo, có độ tin cậy cao, trong đó các smart contract rất hữu ích. **NEO** có smart contract riêng của mình đó là : **NeoContract**

Các Developers không cần học ngôn ngữ lập trình mới mà có thể sử dụng C#, Java, Python,... trong môi trường IDE quen thuộc của họ (Visual Studio, Eclipse, v.v.) để phát triển smartcontract, fix bug và biên dịch. NEO sử dụng một máy ảo NeoVM rất nhẹ và đa năng ưu điểm của nó là độ tin cậy, đồng bộ và khả năng mở rộng cao. Điều này cho phép hàng triệu developers trên thế giới có thể nhanh chóng bắt tay vào phát triển smart contracts 

* #####  Verification Contract
    Không giống như hệ thống tài khoản  public-key của Bitcoin, hệ thống tài khoản của NEO sử dụng hệ thống tài khoản contract. Mỗi tài khoản trong NEO sẽ tương ứng với một smart contract và mã hash của verification contract sẽ là địa chỉ tài khoản. 


* ##### Application Contract
    Application Contract sẽ được kích hoạt bởi một hợp đồng đặc biệt, có thể truy cập và sửa đổi global state của hệ thống và private state của một contract nào đó trong thời gian nó chạy. Ví dụ bạn có thể tạo một global digital asset trong contract, vote, save data và thậm chí tự động create một contract mới khi contract đang chạy.


* ##### Function Contract
    function contract được sử dụng để cung cấp một số chức năng public hoặc thường được sử dụng, nó có thể được gọi từ các hợp đồng khác. Như vậy code của smart contract có thể được tái sử dụng, việc của các developers lúc này là phát triển các logic phức tạp hơn. Mỗi function contract khi deploy có thể chọn có một khu vực private storage có thể đọc hoặc ghi vào dữ liệu trong hợp đồng tương lai.


* ##### programming language
    Các developers có thể sử dụng hầu hết các loại ngôn ngữ lập trình mà giỏi để phát triền smart contract như C#, VB.Net, F, Java, Kotlin, C, C++, GO, Python, JavaScript . Điều này giúp các developers không cần phải học thêm ngôn ngữ mới mà có thể code luôn bằng các ngôn ngữ họ đã quen thuộc. Điều này giúp việc phát triển smart contract trở lên nhanh chóng


* ##### Phí
     Việc triển khai hợp đồng thông minh trên mạng NEO đòi hỏi một khoản phí, hiện dao động trong khoảng từ 100 đến 1000GAS tùy thuộc vào khả năng mà hợp đồng yêu cầu. Phí này được thu bởi hệ thống và được ghi nhận là mức tăng của hệ thống. Phí trong tương lai sẽ được điều chỉnh theo chi phí vận hành thực tế trong hệ thống. Smart contract được triển khai trên blockchain có thể được sử dụng nhiều lần, cho đến khi contract bị phá hủy bởi nhà triển khai.

    NEO cung cấp một môi trường thực thi đáng tin cậy cho các smart contract và việc thực hiện contract đòi hỏi phải tiêu thụ tài nguyên máy tính cho mỗi node, do đó người dùng phải trả tiền để thực hiện smart contract. Lệ phí được xác định bởi các tài nguyên tính toán được tiêu thụ với mỗi lần thực hiện và đơn giá cũng tính bằng GAS. Nếu việc thực hiện smart contract thất bại do thiếu GAS, chi phí tiêu thụ sẽ không được trả lại và điều này ngăn chặn các cuộc tấn công độc hại vào việc tiêu thụ năng lượng mạng.

    Đối với hầu hết các contract, chúng có thể được thực hiện miễn phí, miễn là chi phí thực hiện vẫn dưới 10 GAS, do đó giảm đáng kể chi phí cho người dùng.


* ##### Cross-chain Interoperability
    NeoContract cung cấp hỗ trợ cho việc thực hiện khả năng tương tác cross-chain, đảm bảo tính nhất quán trong trao đổi tài sản cross-chain, giao dịch phân phối cross-chain và thực hiện smart contract trên các blockchain khác nhau.


* ##### Oracle Machines
    Trong blockchain, các oracle machines mở cánh cửa ra thế giới bên ngoài cho các smart contract, giúp các smart contract có thể sử dụng thông tin trong thế giới thực như một điều kiện để thực hiện hợp đồng.

    NeoContract không cung cấp khả năng truy cập trực tiếp dữ liệu bên ngoài, chẳng hạn như truy cập vào tài nguyên trên Internet, vì điều này sẽ đưa ra hành vi không xác định, dẫn đến sự không nhất quán giữa các node trong khi thực hiện contract. Việc triển khai Oracle Machines trong NeoContract yêu cầu dữ liệu bên ngoài được gửi đến blockchain bởi một bên thứ ba đáng tin cậy, tích hợp các nguồn cấp dữ liệu này như một phần của sổ cái blockchain, do đó loại bỏ tính không xác định.


* ##### Ethereum DAPP
    Về lý thuyết, tất cả các DAPP trên Ethereum có thể được ghép dễ dàng trên nền tảng NeoContract, dưới dạng một ứng dụng NEO.


### 2.2 NeoVM
NeoVM là một lightweight virtual machine để thực thi NEO smart contracts. Nó là cốt lõi của NEO, thi hành mã code và đảm bảo tính nhất quán giữa các node trong mạng phân tán, hỗ trợ mạnh mẽ cho các ứng dụng decentralized.

Với sự trợ giúp của NeoCompiler, mã nguồn được viết bằng Java, C # hoặc các ngôn ngữ phổ biến khác có thể được biên dịch thành một tập lệnh NeoVM, do đó đạt được đa nền tảng. Ngoài ra, nó làm giảm thời gian tiếp cận để cho phép các developers tham gia phát triển ứng dụng trong hệ sinh thái NEO mà không cần học ngôn ngữ phát triển mới.


##### Infrastructure

![](https://images.viblo.asia/522fd467-74db-4b33-ab96-b26a20ad5894.png)

- **ExecutionEngine** : là cốt lõi của NeoVM, chủ yếu chịu trách nhiệm tải các tập lệnh và thực hiện các instructions tương ứng, chẳng hạn như điều khiển luồng, stack operation, bit operation, arithmetic operation, logical operation, cryptography, v.v. Nó cũng có thể tương tác với dữ liệu ngoài bằng interoperable service.
- **Stack**: NeoVM có bốn loại stack là InvocationStack, EvaluationStack, AltStack và ResultStack
    + InvocationStack sử dụng để lưu tất cả execution contexts mà NEO sẽ thực hiện các execution contexts sẽ được đánh số từ 0 là trên cùng của stack và N là đáy của stack
    + EvaluationStack là nơi lưu trữ data được sử dụng bởi instruction trong quá trình thực thi. Mỗi execution context có EvaluationStack riêng của nó.
    + AltStack là để lưu trữ dữ liệu tạm thời được sử dụng bởi instruction trong quá trình thực thi. Mỗi execution context có AltStack riêng của nó.
    + ResultStack được sử dụng để lưu trữ kết quả thực hiện sau khi tất cả các tập lệnh được thực thi.
- **Interoperation Service Layer**: là cầu nối giữa VM và dữ liệu ngoài. Bằng cách gọi các interoperation interfaces, NeoVM có thể truy cập thông tin block, thông tin transaction, thông tin contract, thông tin asset và các dữ liệu khác cần thiết để thực hiện smart contract.


##### Execution Process
1. Biên dịch mã nguồn của smart contract thành các tệp bytecode thống nhất bằng các trình biên dịch tương ứng.
2. Execution engine của NeoVM tải file bytecode và sau đó constructs bytecodes cùng với các tham số liên quan trong tệp làm execution context và cùng đẩy nó vào invocation stack.
3. Mỗi execution engine nhận một instruction từ contexts hiện tại và sau đó thực hiện các hoạt động tương ứng theo instruction. Dữ liệu được tạo trong quá trình thực thi sẽ được lưu trữ trong EvaluationStack và AltStack của context hiện tại.
4. Sau khi tất cả các tập lệnh được thực thi, kết quả sẽ được lưu trữ trong result stack


### 2.3 Cơ chế đồng thuận 
Cơ chế Byzantine Fault Tolerance là một giải pháp phổ quát cho các hệ thống phân tán. NEO đã đề xuất sử dụng thuật toán đồng thuận **dBFT**(delegated Byzantine Fault Tolerance) dựa trên thuật toán PBFT(Practical Byzantine Fault Tolerance). Thuật toán dBFT xác định validator được đặt theo biểu quyết blockchain thời gian thực, giúp tăng cường hiệu quả của thuật toán và tiết kiệm thời gian xác nhận giao dịch. dBFT2.0 là phiên bản nâng cấp đã được phát hành vào tháng 3 năm 2019

Thuật toán sẽ đảm bảo an toàn nếu số nút xấu trong đồng thuận không lớn hơn  
**⌊ (N−1) / 3 ⌋**  (với N = | R | là số nút được tham gia trong sự đồng thuận)

Tất cả các nút đồng thuận được yêu cầu duy trì một bảng trạng thái để ghi lại trạng thái đồng thuận hiện tại. Tập dữ liệu được sử dụng cho sự đồng thuận từ đầu đến cuối được gọi là View. Nếu không thể đạt được sự đồng thuận trong View hiện tại, thì cần phải thay đổi View mới. Chúng ta xác định mỗi View bằng một số **V**

Đối với mỗi vòng  đồng thuận, một node sẽ được bầu làm speaker trong khi các nút khác sẽ là đại biểu. Speaker **p** sẽ được xác định theo thuật toán sau: Theo giả thuyết, chiều cao khối hiện tại là **h**, sau đó **𝑝  = (ℎ − 𝑣)  𝑚𝑜𝑑 N**, phạm vi giá trị  **p** sẽ là 0 ≤ **𝑝** <N.

Để hiểu chi tiết về cơ chế đồng thuận này thì khó có thể nói một hai dòng nên mình đã viết một bài riêng về cơ chế này  :[ Cơ Chế Đồng Thuận Delegated Byzantine Fault Tolerance Của NEO](https://viblo.asia/p/co-che-dong-thuan-delegated-byzantine-fault-tolerance-cua-neo-OeVKBODJZkW)

# 3. Mô hình quản lý NEO
NEO có hai loại token: NEO and NeoGas
- NEO là tài sản tổng cộng 100 triệu tokens
- GAS là nhiên liệu. Đơn vị tối thiểu của GAS là 0,00000001.
- 100 triệu GAS, tương ứng với 100 triệu NEO, sẽ được tạo ra thông qua thuật toán phân rã trong khoảng 22 năm để giải quyết việc nắm giữ NEO. Nếu NEO được chuyển đến một địa chỉ mới, GAS được tạo sau đó sẽ được ghi vào với địa chỉ mới. Mạng NEO sẽ đặt ngưỡng bằng cách bỏ phiếu để miễn GAS cho một số lượng giao dịch chuyển khoản nhất định và hoạt động smart contract để nâng cao trải nghiệm người dùng. Khi một lượng lớn giao dịch spam xảy ra, NeoID có thể được sử dụng để ưu tiên các transaction và smart contract với danh tính đủ điều kiện. Transaction và smart contract không có thông tin xác thực đầy đủ nếu muốn được ưu tiên có thể thanh toán thêm GAS.

#### Distribution Mechanism
100 triệu mã thông báo của NEO được chia thành hai phần. Phần đầu tiên là 50 triệu mã thông báo được phân bổ theo tỷ lệ cho những người ủng hộ NEO trong quá trình gây quỹ cộng đồng. Phần này đã được phân phối.

Phần thứ hai là 50 triệu NEO do Hội đồng NEO quản lý để hỗ trợ phát triển, vận hành và bảo trì hệ sinh thái lâu dài của NEO.

- 10 triệu tokens (tổng cộng 10%) sẽ được sử dụng để thúc đẩy các nhà phát triển NEO và các thành viên của Hội đồng NEO
- 10 triệu tokens (tổng cộng 10%) sẽ được sử dụng để thúc đẩy các nhà phát triển trong hệ sinh thái NEO
- 15 triệu tokens (tổng số 15%) sẽ được sử dụng để cross-invest vào các dự án blockchain khác, thuộc sở hữu của Hội đồng NEO và chỉ được sử dụng cho các dự án NEO
- 15 triệu (tổng 15%) sẽ được giữ lại làm dự phòng

# Tổng Kết
Bài viết này là những ý hiểu của mình sau khi tìm hiểu docs của thằng NEO. Chắc hẳn mọi người sẽ chưa thể hiểu được chi tiết về nó nhưng mong nó có thể cho mọi người có cái nhìn tổng quát về mạng NEO blockchain. Sắp tới mình sẽ cố gắng viết một bài về phần triển khai và phát triển NEO để mọi người có thể hiểu sâu hơn về thằng này và nếu ai hứng thú có thể tham gia vào hệ sinh thái ngày càng lớn mạnh của nó.

**Nguồn** : https://docs.neo.org/docs/en-us/index.html