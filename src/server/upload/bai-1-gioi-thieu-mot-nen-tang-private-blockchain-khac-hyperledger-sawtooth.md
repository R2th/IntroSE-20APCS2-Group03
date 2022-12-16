Như các bạn đã biết **Hyperledger Sawtooth** là một trong 5 Framework Hyperledger Umbrella thuộc Linux Foundation gồm: Hyperledger Fabric, HyperledgerSawtooth, Hyperledger Iroha, Hyperledger Burror. Hypeledger Sawtooth là một nền tảng blockchain giúp doanh nghiệp có thể xây dựng một network blockchain và ứng dụng sổ cái phân tán cho riêng mình., với triết lý thiết kế là lưu trữ phân tán sổ cái và giữ smart contract an toàn, Hyperledger Sawtoot được xem là rất phù hợp cho môi trường doanh nghiệp.

Sawtooth đơn giản hóa việc phát triển một ứng dụng blockchain bằng cách tách biệt phần lõi của hệ thống khỏi ứng dụng, nhờ đó mà các nhà phát triển ứng dụng có thể định nghĩa các logic các hoạt động kinh tế dưới dạng một ngôn ngữ lập trình họ chọn, không cần quan tâm đến thiết kế bên dưới của hệ thống. 

Thiết kế lõi của Sawtooth cho phép các ứng dụng lựa chọn các quy tắc giao dịch, phạm vi riêng tư, thuật toán đông thuận để phù hợp với nghiệp vụ kinh doanh cụ thể.

![](https://images.viblo.asia/84a954b9-7795-4d1a-8d1f-c07df6e16a21.png)


## 1. Sổ cái phân tán ( distributed ledgers ) 

"Sổ cái phân tán" là một thuật ngữ - cách gọi khác cho blockchain. Nó phân phối database lưu trữ dữ liệu giao dịch đến tất cả các bên tham gia của network:

   - Distributed ( phân tán ): Một database được chia sẻ đến tất cả các bên tham gia mà họ không cần phải tin tưởng nhau, tất cả các bên đều có cùng dữ liệu.
   - Immutable ( bất biến ): Tất cả dữ liệu về các giao dịch đều không thể sửa đổi, việc kiểm tra hash của block sẽ giúp phát hiện hành vi sửa đổi dữ liệu.

## 2. Đặc điểm nổi bật của Hyperledger Sawtooth

### 2.1 Tách biệt tầng ứng dựng với phần lõi

Sawtooth làm cho việc phát triển và triển khai một ứng dụng blockchain trở nên dễ dàng bằng cách cung cấp một sự tách biệt rõ ràng giữa tầng ứng dụng với tầng lõi của hệ thống. Sawtooth cung cấp một **smart contract abstracion** cho phép các nhà phát triển ứng dụng viết các logic kinh doanh của mình bằng ngôn ngữ mà họ muốn.

Một ứng dụng có thể là một  **native business logic** hoặc một **smart contract virtual machine**. Trên thực tế, cả 2 loại ứng dụng này có thể cùng tồn tài với nhau trên một mạng blockchain. Sawtooth cho phép người dùng định ra các design của mình ở lớp **transaction-processing**, cho phép nhiều loại ứng dụng cùng tồn tại trên 1instance của blockchain network.

Mỗi ứng dụng sẽ định nghĩa các custom của **transaction processors** để phù hợp các yêu cầu riêng. Sawtooth cung cấp 1 **transaction families** mẫu để làm mô hình cho các low-level functions và cho các ứng dụng có thể phân tích hiệu suất và lưu trữ thông tin block.

### 2.2 Tính private của Sawtooth

Sawtooth được xây dựng để giải quyết những thách thức về "permissioned" ( private ) của network. Các cụm nodes của Sawtooth có thể được triển khai dễ dàng với sự "permission" riêng biệt. Sẽ không có một service tập trung nào có khả năng "leak" các giao dịch và các thông tin bí mật khác. 

Mạng blockchain Sawtooth sẽ lưu trữ các cài đặt về "permission" chẳng hạn như roles và identities, để dựa vào đó mà xác định quyền truy cập của các bên tham gia.

### 2.3 Thực thi transaction một cách song song

Đa số mangj blockchain hiện nay đều thực thi transaction theo trật tự để đảm bảo sự nhất quán về dữ liệu giữa các nodes trên mạng. Nhưng Sawtooth có một bộ "parallel scheduler" giúp tách các transactions thành các luồng song song. Dựa trên các locations trong state bởi một giao dịch, Sawtooth sẽ tách biệt các transactions với nhau trong khi duy trì các thay đổi.

Khi có thể, các transaction sẽ được thực hiện song song, đồng thời ngăn chặn "double spending" ngay cả có nhiều sự thay đổi đang cùng tác động vào một state. Parallel scheduling cải thiện hiệu suất đáng kể so với việc thực hiện transaction theo thứ tự. 

### 2.4 Event System

Hyperledger Sawtooth hỗ trợ việc tạo và broadcasting các events. Điều này cho phép các ứng dụng:

   - Theo dõi các events xảy ra mà có liên quan đến blockchain, chẳng hạn như một block mới đang được commit hoặc đang rẽ sang một nhánh mới.
   - Theo dõi các sự kiện cụ thể của ứng dụng được xác định bởi một transaction family.
   - Chuyển tiếp thông tin về việc thực hiện một giao dịch đến client mà không cần lưu trữ dữ liệu đó ở state.

Việc theo dõi sự kiện này được submitted và serviced thông qua một ZMQ Socket.

### 2.5 Khả năng tương thích với Ethereum Contract.

Có một project về sự tương thích giữa Sawtooth và Ethereum gọi là Seth, mở rộng khả năng tương tác của nền tảng Sawtooth sang Ethereum. EVM ( Ethereum Virtual Machine ) có thể được deploy trên Sawtooth bằng cách sử dụng Seth transaction family. 

### 2.6 Dynamic Consensus

Trong một mạng blockchain, **consensus** (sự đồng thuận) là một quá trình của  việc xây dựng sự thỏa thuận giữa một nhóm các bên tham gia trong mạng. Các thuật toán để đạt được sự đồng thuận còn hạn chế thường yêu cầu một số hình thức votting giữa một nhóm người tham gia biết trước. Các cách tiếp cận chung có thể là sự động thuận theo kiểu "Nakamotot-style", bầu ra một leader thông qua hình thức ngẫu nhiên, và các biển thể của thuật toán Byzantine Fault Tolerance (BFT), sử dụng nhiều vòng votting minh bạch để đạt được sự đồng thuận.

Sawtooth trừu tượng hóa các khái niện lõi của sự đồng thuận và tách biệt sự động thuận khỏi bối cảnh của transaction. Consensus interface trong Sawtooth hỗ trợ linh hoạt các cài cắm triển sự đồng thuận khác nhau dưới dạng các **consensus engines** tương tác với **validator** thông qua các **consensus API**. Quan trọng hơn, Sawtooth cho phép bạn có thể thay đổi thuật toán đồng thuận ngay cả khi network của bạn đã được tạo. Thuật toán đồng thuận được chọn trong quá trình thiết lập mạng ban đầu, và có thể thay đổi ngay khi mạng đó đang chạy bằng một hoặc hai transaction.

Consensus API của Sawtooth hỗ trợ nhiều thuật toán đồng thuận. Hiện Sawtooth có consensus engines cho các thuật toán sau:

   - Sawtooth PBFT ( Practical Byzatine Fault Tolerance ) là một thuật toán đồng thuận dựa trên việc votting cung cấp khả năng chịu lỗi của Byzantine với tính hữu hạn. Sawtooth PBFT mơ rộng từ PBFT cơ bản với các tính năng chẳng hạn như "dynamic network membership", "regular view changes" và một "block catch - up procedure". Một network Sawtooth với thuật toán đồng thuận PBFT yêu cầu từ 4 nodes trở lên.
   - PoET ( Proof of Elapsed Time ) là một thuật toán đồng thuận kiểu "Nakamoto-style" được thiết kế để trở thành một protocol cấp production-grade có khả năng hỗ trợ các network lớn. PoET dựa vào việc "secure instruction execution" để đạt được các lợi ích mở rộng của thuật toán đồng thuận kiểu Nakamoto-style loại bỏ được nhược điểm tiêu hao nhiều sức mạnh tính toán của thuật toán Proof of Work. Một Sawtooth network với thuật toán đồng thuận PoET yêu cầu ít nhất 3 nodes.
   
   Sawtooh hiện có 2 phiên bản của PoET:<br>
           1. PoET-SGX dựa trên một Trusted Execution Environment (TEE), chẳng hạn như Intel® Software Guard Extensions (SGX), để thực thi một hệ thống bầu cử leader ngẫu nhiên. PoET-SGX đôi khi cũng được gọi là  “PoET/BFT” bởi vì bản chất nó vẫn là "Byzantine fault tolerant".<br>
           2. PoET simulator cung cấp sự đồng thuận theo kiểu PoET-style trên mọi loại phần cứng, bao gồm cả môi trường virtualized cloud. PoET simulator cũng được gọi là “PoET/CFT" bỏi vì nó là một "crash fault tolerant" chứ không phải "Byzantine fault tolerant"
   
   - Sawtooth Raft là một thuật toán đồng thuận cũng có leader, cũng là "crash fault tolerance" nhưng  nó chỉ cho các network nhỏ với hạn chế về thành viên.
   - Devmode (viết tắt của "Developer mode") là một thuận toán bầu leader theo kiểu random đơn giản, thuật toán này hữu dụng cho việc phát triển và testing một transaction processor. Devmode không được khuyến khích một network có nhiều nodes không nên sử dụng nó cho production.

### 2.7 Transaction Families

Trong một ứng dụng Sawtooth, một data model và transaction language được implemented trong một transaction family, chạy trên Sawtooth node như một transaction processor.

Trong khi hầu hết các nhà phát triển ứng dụng sẽ tự build một transaction family tùy chỉnh phản ánh các yêu cầu riêng, Sawtooth cung cấp một số transaction family cốt lõi làm model: 
    
   - **IntegerKey**: được sử dụng để testing sổ cái đã được triển khai
   - **Settings**: Cung cấp một triển khai tham chiếu để lưu trữ các cài đặt cấu hình on-chain.
   - **Identity**: Xử lý "permissioning" on-chain cho transactor và validator keys để hợp thức hóa managing identities cho danh sách các public keys.

Transaction families còn cung cấp modela cho các lĩnh vực cụ thể:

- **Smallbank**: Xử lý phân tích hiệu suất để kiểm tra benchmarking và hiệu suấr khi so sánh hiệu suất giữa các hệ thống blockchain. Transaction family này được dựa trên "H-Store Smallbank benchmark".
- **BlockInfo**: Cung cấp một phương pháp để lưu trữ thông tin về một block lịch sử.

Một số projects Hyperledger khác cung cấp "smart contract functionality" cho nền tảng Sawtooth:
- **Sawtooth Sabre**: thực hiện smart contract on-chain, được thực thi trong WebAbssembly (WASM) virtual machine.
- **Sawtooth Seth**: Hỗ trợ cho việc chạy Ethereum Virtual Machine (EVM) smart contract trên Sawtooth.

## 3. Một vài ví dụ ứng dụng thực tế

- XO: Trình bày cách xây dựng các transaction cơ bản bằng trò chơi Tic-tac-toe. Transaction family XO bao gồm việc tạo và thực hiện transactio. Link tham khảo
https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/intro_xo_transaction_family.html
- Sawtooth Supply Chain: Trình cách truy xuất nguồn gốc và cách thông tin liên quan khác của bất cứ sản phẩm nào. Supply Chain cung cấp một ứng dụng mẫu với một **transaction processor**, REST API và web app. Ưng dụng này cũng trình bày một giải pháp phi tập trung cho việc ký các transaction trên trình duyệt, và minh họa làm thế nào để đồng bộ hóa blockchain state cho đến các local database cho các truy vấn phức tạp. Link tham khảo https://github.com/hyperledger/sawtooth-supply-chain
- Sawtooth Marketplace: Trình bày cách trao đổi tài sản với số lượng tùy ý giữa các người dùng với nhau. Ứng dụng mẫu này chứa một số các components, cùng với Sawtooth validator sễ chạy Sawtooth blockchain và cung cấp RESTAPI để tương tác với nó. Link tham khảo: https://github.com/hyperledger/sawtooth-marketplace

## Tổng kết
Bày này mình chỉ giới thiệu về nền tảng Hyperledger Sawtooth nên đa phần nội dung mình dịch từ  docs của Hyperledger Sawtooth. Ở các bài sau, mình sẽ đi vào tìm hiểu các thành phần của một network Sawtooth, luồng thực thi của network, các bước để build một ứng dụng hoàn chỉnh, nên các bạn hãy nhớ click "Theo dõi" mình nhé =))
Nếu bạn có bất cứ câu hỏi nào, hãy để lại dưới phần "Bình luận" mình sẽ cố gắng giải đáp trong phạm vi những gì mình biết được.

## Tham khảo 
https://sawtooth.hyperledger.org/docs/core/releases/latest/introduction.html