![](https://images.viblo.asia/cbed034e-0379-46fb-8897-dfac2affc524.png)

## Giới thiệu
Trong cộng đồng Blockchain nói riêng cũng như những người không chuyên nói chung, thì Ethereum là cái tên nổi tiếng thứ 2 sau Bitcoin. Khác với Bitcoin là hệ thống tiền điện tử ngang hàng (Blockchain 1.0), Ethereum cho phép người tham gia có thể xây dựng những ứng dụng trên nền tảng này dựa trên hợp đồng thông minh (smart contract), đem các ứng dụng của Blockchain thoát ra khỏi sự đánh đồng với tiền ảo trong mắt nhiều người.

Bài viết này nhằm giải thích cách Ethereum hoạt động ở cấp độ kỹ thuật. Chúng ta sẽ đi tìm hiểu Ethereum từ cái nhìn tổng quan về hệ thống cho đến giải thích về các khái niệm quan trọng trong Ethereum như tài khoản, block, giao dịch, gas, EVM,... Hy vọng sau bài viết này, mọi người có thể hiểu thêm và chi tiết hơn cách Ethereum hoạt động.

## Mô hình tổng quan về Ethereum
Blockchain Ethereum về cơ bản là một cỗ máy trạng thái dựa trên các giao dịch. Trong khoa học máy tính,thuật ngữ một máy trạng thái đề cập đến thứ gì đó sẽ đọc một loạt các đầu vào và dựa trên các đầu vào đó, sẽ chuyển sang trạng thái mới.
![](https://images.viblo.asia/b0195ff4-3838-4ba4-9617-02900dc0bad9.png)

Với máy trạng thái Ethereum, nó bắt đầu với trạng thái nguyên thủy (genesis state). Khi các giao dịch được thực hiện, trạng thái nguyên thủy này chuyển sang các trạng thái khác hay nói chi tiết hơn thì mỗi block sẽ là mỗi trạng thái khác nhau. Tại bất kỳ thời điểm nào, trạng thái của block mới nhất sẽ đại diện cho trạng thái hiện tại của Ethereum.

![](https://images.viblo.asia/b0195ff4-3838-4ba4-9617-02900dc0bad9.png)

Trạng thái của Ethereum có hàng triệu giao dịch. Các giao dịch này được nhóm thành các block trên mạng. Một block chứa một loạt các giao dịch và mỗi block được kết nối với block trước đó.

![](https://images.viblo.asia/748a44d9-e4a0-48e9-8e9b-63abe397abd1.png)

Để chuyển đổi từ trạng thái này sang trạng thái khác, một giao dịch phải hợp lệ. Để một giao dịch được coi là hợp lệ, nó phải trải qua quá trình xác nhận được gọi là mining (đào coin). Mining là khi một nhóm các nút (tức là máy tính) sử dụng tài nguyên tính toán của họ để tạo ra một khối chứa các giao dịch hợp lệ.

Bất kỳ nút nào trên mạng tự khai báo là thợ mỏ (miner) có thể cố gắng tạo và xác thực một block. Rất nhiều thợ mỏ từ khắp nơi trên thế giới cố gắng tạo và xác nhận các block cùng một lúc. Để đào được một block thì các thợ mỏ phải giải quyết một bài toán mã băm, khi thợ mỏ giải xong bài toán và broadcast lên mạng blockchain, nó sẽ được các nút khác xác nhận là hợp lệ nếu giải pháp giải quyết bài toán mã băm là đúng.

Nhưng để block của thợ mỏ đó được đưa vào blockchain thì phải đảm bảo rằng thợ mỏ đó là người đầu tiên, nhanh nhất tìm ra giải pháp bài toán của block đó. Sau đó, thợ mỏ đó sẽ được thưởng một lượng Ether. Toàn bộ quá trình đào một block trong Ethereum cũng như Bitcoin được gọi là bằng chứng công việc (proof of work).

Bạn có thể tự hỏi: Điều gì đảm bảo rằng tất cả mọi người đều vào cùng tương tác trên một chuỗi block ? Làm thế nào chúng ta có thể chắc chắn rằng không có tồn tại một số những người khai thác, họ sẽ quyết định tạo ra chuỗi block của riêng họ?

Trước đó, chúng tôi đã định nghĩa một blockchain là một máy trạng thái thay đổi qua các block. Sử dụng định nghĩa này, chúng ta có thể hiểu trạng thái hiện tại chính xác là một sự thật duy nhất, mà mọi người phải chấp nhận. Có nhiều trạng thái (hoặc chuỗi) sẽ phá hỏng toàn bộ hệ thống, bởi vì không thể thống nhất trạng thái nào là đúng. Nếu các chuỗi được phân kỳ, bạn có thể sở hữu 10 đồng tiền trên một chuỗi, 20 trên chuỗi khác và 40 trên chuỗi khác. Trong kịch bản này, sẽ không có cách nào để xác định chuỗi nào là hợp lệ nhất.

Bất cứ khi nào nhiều chuỗi được tạo ra, khi đó xảy ra hiện tượng phân nhánh (fork). Chúng ta muốn tránh sự phân nhánh, bởi vì chúng phá vỡ hệ thống và buộc mọi người chọn chuỗi mà họ tin tưởng vào.

![](https://images.viblo.asia/e6b4e434-5230-4467-b0d2-4b934937c435.png)

Để xác định đâu là chuỗi block chính (hợp lệ) và ngăn chặn việc có nhiều chuỗi block. Ethereum sử dụng một giao thức có tên là “GHOST”. GHOST được viết tắt từ Greedy Heaviest Observed Subtree.

Nói một cách đơn giản, giao thức GHOST nói rằng chúng ta phải chọn chuỗi block có nhiều tính toán nhất được thực hiện trên mạng blockchain làm chuỗi chính (chuỗi nặng nhất).  Độ nặng của chuỗi trong Ethereum phụ thuộc vào số lượng block trong chuỗi đó và các uncle block của nó (sẽ đề cập chi tiết hơn về uncle block ở phần sau).

![](https://images.viblo.asia/22deaf79-abe8-482c-a31c-0cbb99e32f6a.png)

Chúng ta đã cùng nhau có cái nhìn tổng quan về cách hoạt động của Ethereum, phần tiếp theo chúng ta sẽ cùng đi tìm hiểu chi tiết về các thành phần trong Ethereum bao gồm:
* Tài khoản
* Trạng thái
* Gas và phí giao dịch
* Giao dịch
* Block
* Thực thi giao dịch

## Tài khoản
Trạng thái của Ethereum bao gồm nhiều đối tượng nhỏ (các tài khoản trực tuyến) có thể tương tác với nhau thông qua cơ chế truyền message. Bất kỳ tài khoản nào cũng có một định danh duy nhất (địa chỉ) là 160 bit.

Ethereum có 2 loại tài khoản:
* Tài khoản người dùng (Externally owned accounts) được quản lý bởi private key và không có chứa mã nguồn.
* Tài khoản hợp đồng chứa mã nguồn và được quản lý bởi mã nguồn trong hợp đồng, tài khoản hợp đồng chỉ có địa chỉ mà không có private key như tài khoản người dùng.

![](https://images.viblo.asia/07060d01-b52a-4d0a-881e-19eb4a2f2f14.png)

### Tài khoản người dùng và tài khoản hợp đồng
Tài khoản người dùng có thể gửi message đến các tài khoản người dùng khác hoặc đến các tài khoản hợp đồng khác bằng cách tạo và ký một giao dịch bằng private key của nó. Một message giữa hai tài khoản người dùng chỉ đơn giản là một giao dịch chuyển giá trị. Nhưng một message từ tài khoản người dùng đến tài khoản hợp đồng sẽ kích hoạt mã nguồn của tài khoản hợp đồng, cho phép nó thực hiện nhiều hành động khác nhau (ví dụ: chuyển token, ghi vào bộ nhớ trong, thực hiện một số tính toán, tạo hợp đồng mới....).

Không giống như các tài khoản người dùng, các tài khoản hợp đồng không thể tự mình thực hiện các giao dịch mới. Thay vào đó, tài khoản hợp đồng chỉ có thể thực hiện giao dịch để đáp ứng với các giao dịch khác mà nó nhận được từ tài khoản người dùng hoặc từ tài khoản hợp đồng khác.

![](https://images.viblo.asia/ff810dac-2ba7-4f7c-8503-cb0de6f5f9f7.png)

Do đó, bất kỳ hành động nào xảy ra trên blockchain Ethereum luôn được thiết lập bởi các giao dịch được thực hiện từ các tài khoản người dùng.

### Trạng thái của tài khoản
Trạng thái tài khoản bao gồm bốn thành phần, nó đều có trong bất kỳ tài khoản nào:
* nonce: Nếu tài khoản là tài khoản người dùng, con số này thể hiện số lượng giao dịch đã được gửi từ tài khoản. Nếu tài khoản là tài khoản hợp đồng, thì nonce là số lượng hợp đồng được tạo bởi nó.
* balance (số dư): Số lượng wei tài khoản đang có ( 1 ether = 10^18 wei)
* storageRoot: Giá trị băm của phần gốc (root) của cây Merkle Storage (sẽ giải thích về cây Merkle ở phần sau). Cây Merkle Storage chứa giá trị băm của các biến có trong Storage của tài khoản và theo mặc định là trống.
* codeHash: Giá trị băm của mã hợp đồng ở dạng bytecode trong EVM . Đối với các tài khoản người dùng thì trường codeHash là chuỗi trống.

![](https://images.viblo.asia/f0221a32-fdfb-4757-83ba-e90262040bb7.png)

## Trạng thái toàn cục của Ethereum (global state)
Chúng ta đãi biết rằng trạng thái toàn cục của Ethereum, bao gồm ánh xạ giữa các địa chỉ tài khoản và trạng thái tài khoản. Ánh xạ này được lưu trữ trong một cấu trúc dữ liệu được gọi là cây Merkle.

Cây Merkle là một loại cây nhị phân gồm một tập hợp các nút có:
* Các nút lá ở dưới cùng của cây có chứa dữ liệu cơ bản
* Các nút trung gian, trong đó mỗi nút trung gian là giá trị băm hai nút con của nó
* Một nút gốc duy nhất, cũng được hình thành từ hàm băm của hai nút con của nó, đại diện cho đỉnh của cây.

![](https://images.viblo.asia/cdcbb70d-0579-4f98-8237-9488a252ba53.png)

Dữ liệu ở dưới cùng của cây được tạo bằng cách chia dữ liệu mà chúng ta muốn lưu trữ thành các khối, chia các khối thành các nhóm, sau đó lấy hàm băm của mỗi nhóm và lặp lại quy trình tương tự cho đến khi tính ra 1 giá trị băm duy nhất (nút gốc của cây Merkle).

![](https://images.viblo.asia/0950c929-7af3-424d-9481-7dc9e95057c0.png)

![](https://images.viblo.asia/3679595c-7d8c-4e5a-8b90-e8c23d18fe18.png)

Cấu trúc cây Merkle này cũng được sử dụng để lưu trữ các giao dịch và biên lai. Cụ thể hơn, mọi block có một header , nơi lưu trữ hàm băm gốc (rootHash) của ba cấu trúc cây Merkle khác nhau, bao gồm:
* State tree
* Transaction tree
* Receipts tree

Khả năng lưu trữ tất cả thông tin này một cách hiệu quả ở cây Merkle vô cùng hữu ích trong Ethereum với những nút không đầy đủ trong mạng (light nodes hay light cliens). Nên biết rằng trong ethereum về cơ bản có 2 loại nút: đầy đủ (full nodes) và không đầy đủ (light nodes).

Một nút đầy đủ là nút đồng bộ hóa toàn bộ cơ sở dữ liệu của mạng blockchain, từ block nguyên thủy đến block hiện tại.Thông thường, các thợ đào là nút đầy đủ, bởi vì họ được yêu cầu làm như vậy cho quá trình khai thác.

Nhưng trừ khi một nút cần thực hiện mọi giao dịch hoặc dễ dàng truy vấn dữ liệu lịch sử, thì thực sự không cần phải lưu trữ toàn bộ chuỗi block. Đây là nơi xuất hiện khái niệm nút không đầy đủ. Thay vì tải xuống và lưu trữ toàn bộ cơ sở dữ liệu của blockchain, các nút không đầy đủ chỉ tải xuống header của tất cả block , từ block nguyên thủy đến block hiện tại. Vì các nút không đầy đủ có  các header của toàn bộ block, chúng vẫn có thể dễ dàng xác thực và kiểm chứng về các giao dịch, sự kiện, số dư, ....

Lý do là vì giá trị băm trong cây Merkle được tính toán từ dưới  lên trên - nếu người dùng xấu cố gắng thay đổi một giao dịch không hợp lệ vào dưới cùng của cây Merkle, thay đổi này sẽ gây ra thay đổi băm của nút ở trên, các nút ở trên lại cũng sẽ thay đổi hàm băm của nút ở trên nó, và cứ thế, cho đến khi cuối cùng nó thay đổi gốc của cây.

![](https://images.viblo.asia/df8672bc-3425-46d2-8dfe-905c1598f023.png)

Bất kỳ nút nào muốn xác minh một phần dữ liệu đều có thể sử dụng một cơ chế có tên gọi là “Merkle proof”. Một Merkle proof bao gồm:
* Phần dữ liệu cần xác minh và hàm băm của nó
* Giá trị băm của gốc trong cây Merkle
* Tất cả các nút trong cây cần thiết để tính ra rootHash từ nút lá cần xác minh

![](https://images.viblo.asia/e9478891-09d1-4982-8e4c-22918f4428aa.png)

Dữ liệu sẽ được xác mình là đúng khi rootHash tính ra được đúng bằng rootHash của cây.

Tóm lại, lợi ích của việc sử dụng cây Merkle là nút gốc của cấu trúc này phụ thuộc vào các hàm băm dữ liệu được lưu trữ trong cây và do đó, hàm băm của nút gốc có thể được sử dụng xác minh dữ liệu, chống việc thay đổi trái phép. Vì tiêu đề khối bao gồm hàm băm gốc của State Tree, Transaction Tree và Receipts Tree, bất kỳ nút nào cũng có thể xác thực một phần nhỏ trạng thái của Ethereum mà không cần lưu trữ toàn bộ trạng thái và tiết kiệm được không gian lưu trữ.

## Gas và Thanh toán chi phí giao dịch
Một khái niệm rất quan trọng trong Ethereum là khái niệm về phí giao dịch. Mọi tính toán xảy ra trên mạng Ethereum đều phải trả phí - không có gì miễn phí cả ! Khoản phí này được trả theo mệnh giá gọi là gas.

Gas là đơn vị được sử dụng để đo lường các khoản phí cần thiết cho một tính toán cụ thể. Gas Price là lượng Ether bạn sẵn sàng chi cho mỗi đơn vị gas.

Với mỗi giao dịch, người gửi đặt Gas Limit và Gas Price. Hai thông số này thể hiện số lượng gas mà người dùng sẵn sàng chi trả tối đa cho một giao dịch.

Ví dụ: giả sử người gửi đặt Gas Limit là 50.000 và giá gas là 20 gwei. Điều này ngụ ý rằng người gửi sẵn sàng chi tối đa 50.000 x 20 gwei = 1.000.000.000.000.000 Wei = 0,001 Ether để thực hiện giao dịch đó.

![](https://images.viblo.asia/59aada1f-f5f5-409d-91ba-f84d90dfcb58.png)

Hãy nhớ rằng Gas Limit đại diện cho lượng gas tối đa mà người gửi sẵn sàng trả cho giao dịch đó. Nếu giao dịch tiêu thụ một lượng Gas thấp hơn Gas Limit thì người dùng sẽ được hoàn trả vào cuối giao dịch.

![](https://images.viblo.asia/4d948697-20f2-4b72-9d9f-1bc76cce15e2.png)

Trong trường hợp người gửi không cung cấp đủ lượng Gas cần thiết để thực hiện giao dịch, giao dịch sẽ ‘bị hết gas’ và được coi là không hợp lệ. Trong trường hợp này, việc hủy bỏ xử lý giao dịch và bất cứ thay đổi trạng thái nào xảy ra đều sẽ bị đảo ngược (revert). Ngoài ra, một bản ghi về giao dịch không thành công được ghi lại, cho thấy giao dịch nào đã được thử và nơi mà nó không thành công. Và máy ảo Ethereum đã dùng lượng Gas chạy các tính toán trước khi hết Gas, nên người dùng sẽ không được hoàn trả lại lượng Gas.

![](https://images.viblo.asia/9e185bf1-5e68-41d9-9bb8-5628266282ab.png)

Chính xác thì lượng Gas này chạy đi đâu? Tất cả số tiền chi cho Gas của người gửi được gửi đến địa chỉ thợ đào tìm ra block chứa giao dịch đó. Vì các thợ đào nỗ lực để chạy các tính toán và xác thực các giao dịch, các thợ đào nhận được phí gas như một phần thưởng ngoài phần thưởng mà họ nhận được khi đào ra một block hợp lệ.

![](https://images.viblo.asia/01c63d8c-6ad7-4914-bc46-69a79d736394.png)

Thông thường, giá Gas mà người gửi sẵn sàng trả càng cao, giá trị mà người thợ đào nhận được từ giao dịch càng lớn. Vì vậy, các thợ đào có nhiều khả năng sẽ chọn nó. Vì các thợ đào có thể tự do lựa chọn giao dịch nào họ muốn xác thực hoặc bỏ qua. Vì  vậy nếu bạn đặt Gas Price và Gas Limit quá thấp, thì có thể giao dịch của bạn sẽ mất rất lâu để có thể được xác nhận và đưa vào blockchain.

### Phí trả cho lưu trữ
Gas không chỉ được sử dụng để thanh toán cho các bước tính toán, nó còn được sử dụng để thanh toán cho lưu trữ. Bảng dưới đây thể hiện lượng Gas phải trả cho phí lưu trữ cho Ethereum.

![](https://images.viblo.asia/0b1a01a5-3e0d-404b-9602-5bbf0b5fc592.png)

### Vậy mục đích của phí giao dịch là gì ?
Các bước tính toán trên Máy ảo Ethereum rất tốn kém. Do đó, hợp đồng thông minh Ethereum được sử dụng tốt nhất cho các tác vụ đơn giản, như chạy logic business đơn giản, xác minh chữ ký,... thay vì sử dụng các tác vụ phức tạp hơn, như lưu trữ tệp, email hoặc học máy, có thể gây quá tải cho mạng. Áp dụng phí ngăn người dùng cố tính sử dụng các tác vụ nặng đó.

Nền tảng Ethereum được xây dựng với một ngôn ngữ hoàn chỉnh Turing (Turing-Complete). Nói đơn giản, ngôn ngữ Turing hoàn chỉnh là ngôn ngữ có thể mô phỏng bất kỳ thuật toán máy tính nào. Điều này cho phép các vòng lặp và khiến Ethereum dễ gặp phải vấn đề sự cố dừng (Halting problem) , một vấn đề mà bạn gặp phải khác nếu không có phí giao dịch là một người dùng xấu có thể dễ dàng phá vỡ mạng bằng cách thực hiện một vòng lặp vô hạn trong một giao dịch, mà không có gặp trở ngại nào. Do đó, phí giao dịch bảo vệ mạng khỏi các cuộc tấn công có chủ đích.

## Giao dịch và message
Chúng ta đã biết rằng Ethereum là một máy trạng thái dựa trên các giao dịch. Nói cách khác, các giao dịch xảy ra giữa các tài khoản khác nhau là lúc trạng thái toàn cục của Ethereum được chuyển từ trạng thái này sang trạng thái khác.

Có hai loại giao dịch: mesage calls và contract creator (nghĩa là giao dịch tạo hợp đồng Ethereum mới).

Tất cả các giao dịch có chứa các thành phần sau:
* nonce: Số lượng giao dịch đã được gửi bởi người gửi (giao dịch hợp lệ).
* Giá gas (gasPrice): Số wei phải trả cho 1 gas.
* Giới hạn Gas (gasLimit): Số gas tối đa mà người gửi sẵn sàng trả cho giao dịch.
* to: Địa chỉ tài khoản nhận giao dịch.
* value: số wei mà tải khoản người gửi gửi cho tài khoản nhận.
* v, r, s: các thông số được tạo ra từ thuật toán ECDSA giúp cho các nút trong mạng có thể xác thực chữ ký số của người gửi.
* init (chỉ có ở trong giao dịch tạo hợp đồng): Một đoạn mã EVM được sử dụng để khởi tạo tài khoản hợp đồng mới. init chỉ được chạy một lần và sau đó bị loại bỏ.
* data: dữ liệu đầu vào (tức là các tham số) của message calls. Ví dụ: nếu gọi một hàm trong hợp đồng thông minh có tham số đầu vào là kiểu uint thì data sẽ là một số nguyên dương.

![](https://images.viblo.asia/66e482b6-9492-4471-a0f3-bc6b5af202ad.png)

Nhìn một cách tổng quan, tất cả giao dịch trên mạng Ethereum đều bắt đầu từ một tài khoản người dùng nào đó. Dù là một lời gọi hàm, một giao dịch từ một hợp đồng thông minh này đến một hợp đồng thông mình khác thì cũng sẽ phải được kích hoạt bởi một tài khoản người dùng.

![](https://images.viblo.asia/0b0e9f5b-2e9d-47fb-b33f-a1ba4b897ecc.png)

Một điều quan trọng cần lưu ý là các giao dịch internal (giao dịch giữa các hợp đồng với nhau) hoặc các message không có chứa gasLimit. Điều này là do gasLimit được xác định bởi chủ của giao dịch gốc.GasLimit của các tài khoản người dùng phải đủ lớn để thực hiện giao dịch, bao gồm mọi thực hiện các giao dịch phái sinh, chẳng hạn như các message giữa các hợp đồng. Nếu, trong chuỗi các giao dịch và message, khi thực thi một message cụ thể bị hết gas, thì message đấy sẽ bị revert. Tuy nhiên, việc thực thi các giao dịch và message trước đó không cần revert.

## Block
Tất cả các giao dịch được nhóm lại với nhau thành các block trên mạng. Một blockchain chứa một chuỗi các block như vậy được nối với nhau.

Trong Ethereum, một block bao gồm:
* Block header
* Thông tin về tất cả giao dịch được gom trong block đó
* Các ommers của nó (hay còn gọi là uncle block)

### Giải thích về Ommers
Do cách thức Ethereum được xây dựng, thời gian khai thác một block thấp hơn nhiều (~ 15 giây) so với các blockchain khác, như Bitcoin (~ 10 phút). Điều này cho phép xử lý giao dịch nhanh hơn. Tuy nhiên, một trong những nhược điểm của thời gian khai thác một block ngắn là sẽ có nhiều thợ mỏ đào ra 1 block trong những khoàng thời gian rất gần nhau nhưng chỉ có một block được tìm ra sớm nhất được đưa vào nhánh chính, vì vậy sẽ rất lãng phí với các block khác vì chúng cũng hợp lệ nhưng lại không được đưa vào nhánh chính vì chậm hơn về mặt thời gian (1 đến 2 giây !). Các khối như vậy được gọi là các block mồ côi (orphaned blocks) hoặc uncle blocks.

Mục đích của ommers là để thưởng cho những người khai thác những khối mồ côi này. Các ommers phải là hợp lệ, nghĩa là một block trong nhánh chính chỉ được có tối đa 2 ommer, ngoài ra, một ommer được xác nhận là hợp lệ khai nó ở trong 6 thế hệ so với block hiện tại và các ommer chỉ được giới hạn 6 ommer trong 6 thế hệ. Các block Ommer nhận được phần thưởng nhỏ hơn một block trong nhánh chính.

![](https://images.viblo.asia/45f76369-166c-411d-bc30-4ca879150468.png)

![](https://images.viblo.asia/688b8569-20a2-40fd-92b0-a389c6238c3e.png)

Như hình trên, block ommer 3’ nằm ngoài 6 thế hệ do với block hiện tại (block 10) nên không được chấp nhận, block 10’ cũng không được chấp nhận do đã có đủ 6 ommer.

### Tiêu đề block (block header)
Tiêu đề block là một phần của block bao gồm:
* parentHash: Giá trị băm block header của block phía trước. 
* ommersHash: Giá trị băm của các block uncle
* beneficiary: Địa chỉ tài khoản của thợ đào sẽ nhận phần thưởng từ block
* stateRoot:Giá trị băm nút gốc của cây trạng thái
* transactionRoot: Giá trị băm nút gốc của cây Merkle tất cả giao dịch có trong block
* receipts: Giá trị băm nút gốc của cây receipt 
* logsBloom: Cấu trúc dữ liệu Bloom Filter
* difficulty: Độ khó của block
* number: Số thứ tự của block, tình từ block nguyên thủy là 0
* gasLimit: Giá trị gas tối đa có thể sử dụng của các giao dịch trong block
* gasUsed: Tổng số gas mà các giao dịch trong block tiêu thụ
* timestamp: Thời gian block được tìm ra (tính theo unix timestamp)
* extraData: Dữ liệu bổ sung liên quan đến khối
* mixHash: hàm băm của block header trước khi tìm ra số nonce.
* nonce: Khác với số nonce trong giao dịch, đây là số nonce mà thợ đào cần tìm trong quá trình đào block. Block được khai thác thành công khi số băm keccack256 mixHash và số nonce bé hơn một giá trị mục tiêu cho trước.

![](https://images.viblo.asia/f556377f-4ebd-4fbc-9816-1da8dc453dff.png)

## Quá trình thực thi giao dịch
Giả sử bạn gửi một giao dịch vào mạng Ethereum để được xử lý. Điều gì xảy ra ?

![](https://images.viblo.asia/25867786-79dd-494e-aec3-2fb783813445.png)

Đầu tiên, tất cả các giao dịch phải đáp ứng một bộ yêu cầu ban đầu để được thực hiện. Bao gồm:
* Giao dịch phải định dạng ở chuẩn encode RLP (Recursive Length Prefix)
* Chữ ký giao dịch là hợp lệ.
* Số nonce trong giao dịch phải bằng số nonce của tài khoản gửi giao dịch
* gasLimit phải bằng hoặc lớn hơn instrinsic gas được sử dụng trong giao dịch. instrinsic gas (là lượng gas mà giao dịch sử dụng trước khi chạy bất cứ đoạn mã nào) bao gồm:

1. Chi phí được xác định trước là 21.000 gas để thực hiện giao dịch.
2. Một khoản phí gas cho dữ liệu được gửi cùng với giao dịch (4 gas cho một zero-byte hoặc 68 gas cho mỗi non-zeros byte).
3. Nếu giao dịch là giao dịch tạo hợp đồng, thêm 32.000 gas.

![](https://images.viblo.asia/d099413a-3188-4054-9a21-20c50cf639c3.png)

Số dư tài khoản của người gửi phải có đủ Ether để trang trải chi phí gas trả trước mà người gửi phải trả. Cách tính chi phí gas trả trước rất đơn giản: Đầu tiên, GasLimt được nhân với Gas Price để xác định chi phí gas tối đa. Sau đó, chi phí tối đa này được cộng thêm với số ether mà người gửi gửi cho người nhận.

![](https://images.viblo.asia/29f6eff6-7a89-4e26-a68b-e1aca533632d.png)

Tiếp theo, giao dịch bắt đầu thực hiện. Trong suốt quá trình thực hiện giao dịch, Ethereum theo dõi substate. Các substate này là một cách để ghi lại thông tin trong quá trình giao dịch sẽ cần ngay sau khi giao dịch hoàn tất. Cụ thể, nó chứa:
* Self-destruct set: một tài khoản (nếu có) sẽ bị loại xóa sau khi giao dịch hoàn tất.
* Log series: nhật ký việc mã code được thực thi trong máy ảo Ethereum
* Refund balance: số tiền được hoàn trả vào tài khoản người gửi sau khi giao dịch. Việc lưu trữ trong Ethereum rất tốn kém và người gửi được hoàn lại tiền để xóa dung lượng lưu trữ? Ethereum theo dõi điều này bằng cách sử dụng một bộ đếm hoàn trả (refund counter). Refund counter bắt đầu từ 0 và tăng lên mỗi khi hợp đồng xóa thứ gì đó trong bộ lưu trữ (storage).

Tiếp theo, các tính toán khác nhau theo yêu cầu của giao dịch sẽ được xử lý.

Khi tất cả các bước theo yêu cầu của giao dịch đã được xử lý và tất cả đều hợp lệ, trạng thái được hoàn thành bằng cách xác định lượng gas không sử dụng để hoàn trả cho người gửi. Ngoài lượng gas chưa sử dụng, người gửi cũng được hoàn lại một khoản trợ cấp (Refund balance) như đã đề cập ở trên.
Khi người gửi được hoàn lại tiền:
* Ether quy đổi từ gas sẽ được thợ đào tìm ra block chứa giao dịch thụ hưởng.
* Tổng lượng gas sử dụng cho giao dịch sẽ được đưa vào block gas counter (nhằm tính tổng lượng gas tiêu thụ của block chứa giao dịch).
* Tất cả tài khoản self-destruct set (nếu có) sẽ bị xóa.

Bây giờ, chúng ta hãy cùng xem xét một số khác biệt giữa các giao dịch tạo hợp đồng và giao dịch message calls.

### Giao dịch tạo hợp đồng
Hãy nhớ lại rằng trong Ethereum, có hai loại tài khoản: tài khoản hợp đồng và tài khoản người dùng. Khi chúng ta nói một giao dịch là tạo hợp đồng, thì ngụ ý rắng mục đích của giao dịch là tạo một tài khoản hợp đồng mới.

Để tạo một tài khoản hợp đồng mới, trước tiên chúng tôi khai báo địa chỉ của tài khoản mới bằng một công thức đặc biệt. Sau đó, chúng tôi khởi tạo tài khoản mới bằng cách:
* Đặt nonce bằng 0.
* Nếu người gửi đã gửi một số lượng Ether dưới dạng giá trị với giao dịch, thì số dư tài khoản của hợp đồng bằng giá trị giao dịch.
* Khấu trừ số dư tài khoản người tạo hợp đồng đi một lượng bằng số dư của hợp đồng.
* Storage trống.
* codeHash của hợp đồng là một chuỗi trống.

Khi đoạn mã khởi tạo hợp đồng được thực thi, nó tiêu thụ một lượng gas. Giao dịch không được phép sử dụng nhiều gas hơn lượng gas còn lại. Nếu như vậy, thì trạng thái được revert về thời điểm ngay trước khi giao dịch. Người gửi không được hoàn trả lượng gas đã sử dụng trước khi hết.

Tuy nhiên, nếu người gửi gửi bất kỳ giá trị Ether nào cùng với giao dịch, giá trị Ether sẽ được hoàn trả ngay cả khi việc tạo hợp đồng không thành công.

Nếu mã khởi tạo thực thi thành công, chi phí cuối cùng cần phải chi trả là chi phí lưu trữ. Chi phí lưu trữ và tỷ lệ thuận với kích thước mã nguồn của hợp đồng đã tạo (một lần nữa, không có cái gì là miễn phí !) Nếu không đủ gas để trả chi phí cuối cùng này, thì giao dịch sẽ bị revert.

Nếu mọi việc suôn sẻ , thì lượng gas chưa sử dụng sẽ được hoàn trả cho người gửi ban đầu của giao dịch và trạng thái thay đổi hiện được phép tồn tại.

### Message calls
Việc thực hiện một message calls tương tự như việc tạo hợp đồng, nhưng có một chút khác biệt ở đây.

Thực thi một message calls không bao gồm bất kỳ đoạn mã init nào (xem ở phần giao dịch và message), vì không có tài khoản mới nào được tạo. Tuy nhiên, nó có thể chứa dữ liệu đầu vào, nếu dữ liệu này được cung cấp bởi người gửi giao dịch. Sau khi thực hiện, các message calls cũng có một thành phần bổ sung chứa dữ liệu đầu ra, được sử dụng nếu lần thực hiện tiếp theo cần dữ liệu này.

Cũng như việc tạo hợp đồng, nếu thực thi message calls hết gas hoặc vì giao dịch không hợp lệ (ví dụ: tràn ngăn xếp, lệnh jump không hợp lệ ...), thì không có gas nào đã sử dụng được hoàn trả cho người gọi ban đầu. Thêm vào đó, tất cả lượng gas chưa sử dụng còn lại được tiêu thụ và trạng thái được revert về điểm ngay trước khi chuyển số dư.

Cho đến bản cập nhật gần đây nhất của Ethereum, không có cách nào để ngăn chặn hoặc revert việc thực hiện giao dịch mà không khiến hệ thống tiêu thụ hết lượng gas bạn cung cấp. Ví dụ: giả sử bạn đã tạo một hợp đồng gây ra lỗi khi người gọi không được ủy quyền để thực hiện một số giao dịch. Trong các phiên bản trước của Ethereum, lượng gas còn lại vẫn sẽ được tiêu thụ và không có gas nào được hoàn trả cho người gửi. Nhưng bản cập nhật Byzantium bao gồm đoạn mã revert mới, cho phép hợp đồng dừng thực thi và revert các thay đổi trạng thái, mà không tiêu thụ lượng gas còn lại và với khả năng trả lại lý do cho giao dịch thất bại. Nếu một giao dịch bị revert, thì lượng gas chưa sử dụng được trả lại cho người gửi.

### Ethereum Virtual Machine (EVM)
Cho đến nay, chúng ta đã tìm hiểu về một loạt các bước phải thực hiện để giao dịch được thực hiện từ đầu đến cuối. Bây giờ, chúng ta hãy cùng xem xét cách giao dịch thực sự được thực hiện trong EVM.

EVM là một máy ảo Turing Complete. Điểm khác biệt giữa EVM và một máy ảo Turing Complete điển hình là nó cần gas để thực thi các bước tính toán, và đó là một hạn chế. Do đó, tổng số lượng tính toán có thể được thực hiện bị giới hạn bởi lượng gas được cung cấp.

![](https://images.viblo.asia/73846810-e118-4231-bd7b-ccfe2bd24a13.png)

EVM có kiến trúc dựa trên ngăn xếp.Chạy theo nguyên tắc First in Last out.

Kích thước của mỗi ngăn xếp trong EVM là 256-bit và ngăn xếp có kích thước tối đa là 1024.

EVM có memory, dữ liệu được lưu trữ dưới dạng các mảng byte. Memory không ổn định, có nghĩa dữ liệu trong memory không được lưu trữ lâu dài.

EVM cũng có storage. Không giống như memory, storage không biến động và được duy trì như một phần của trạng thái hệ thống. EVM lưu mã chương trình riêng biệt, trong một ROM ảo chỉ có thể được truy cập thông qua các lệnh đặc biệt. Khác với các máy tính theo kiến trúc von Neumann điển hình, trong đó mã chương trình được lưu trữ trong memory hoặc storage.

![](https://images.viblo.asia/74821cc3-97ff-428e-81fb-323a21bc0215.png)

EVM cũng có ngôn ngữ của nó: “EVM bytecode”. Khi viết các hợp đồng thông minh hoạt động trên Ethereum, chúng ta thường viết mã bằng ngôn ngữ bậc cao như Solidity hay Vyper. Sau đó chúng được biên dịch bytecode mà EVM có thể hiểu được.
## Kết luận
Chúng ta đã cùng đi qua một loạt các khái niệm và kiến thức về mạng blockchain Ethereum, hy vọng sau bài viết này. Mọi người sẽ có cái nhìn rõ hơn, chân thực hơn về Ethereum hoạt động như thế nào.

## Tài liệu tham khảo
- Bài viết được lược dịch từ blog [How Ethereum work, anyway ?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) 
- [Yellow paper Ethereum](https://gavwood.com/paper.pdf)
- Kênh youtube [Block Dev](https://www.youtube.com/channel/UC6dbBV2jyaOV-3b3Tboul9w)