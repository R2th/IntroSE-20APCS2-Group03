![](https://images.viblo.asia/20ebb43a-f173-40b4-a911-e8d6c1f2301f.jpeg)

# Hyperledger Sawtooth là gì?
![](https://images.viblo.asia/d1241481-0cac-401d-9cce-51ebcd797f0b.png)
Hyperledger Sawtooth là một nền tảng blockchain doanh nghiệp dùng để xây dựng các mạng blockchain và ứng dụng sử dụng công nghệ sổ cái phân tán (Distributed Ledger Technology). Triết lý thiết kế của Sawtooth nhắm tới mục tiêu giữ sổ cái phân tán đồng thời khiến cho các hợp đồng thông minh (smart contract) trở nên an toàn, đặc biệt là cho doanh nghiệp sử dụng.

Sawtooth giúp đơn giản hóa quá trình phát triển các ứng dụng blockchain bằng cách phân tách phần lõi của hệ thống với miền ứng dụng. Nhờ đó những nhà phát triển có thể chỉ định các quy tắc doanh nghiệp riêng biệt phù hợp với ứng dụng của họ, sử dụng ngôn ngữ lập trình tùy chọn mà không cần thiết phải tìm hiểu về những thiết kế nằm sâu trong phần lõi. 

Bên cạnh đó, Sawtooth còn có tính module hóa rất cao. Điều này cho phép các doanh nghiệp và tổ chức thực hiện các quyết định chính sách phù hợp nhất với họ. Thiết kế lõi của Sawtooth cho phép các ứng dụng chọn quy tắc giao dịch, phân quyền và thuật  toán đồng thuận mà hỗ trợ cho các nhu cầu kinh doanh riêng biệt của từng doanh nghiệp.

Sawtooth là mã nguồn mở, một trong những dự án đầu tiên nằm trong [Hyperledger umbrella](https://www.hyperledger.org/blog/2016/09/13/meet-hyperledger-an-umbrella-for-open-source-blockchain-smart-contract-technologies)

# Distributed Ledgers
![](https://images.viblo.asia/9602bb2f-e92e-48fe-bece-fddd0f4164e0.png)

Sổ cái phân tán (distributed ledger) là một thuật ngữ  của blockchain. Nó phân phối cơ sở dữ liệu ( hay còn gọi là một cuốn sổ cái) tới tất cả những bên tham gia mạng blockchain (còn được gọi là các `peer` hoặc `nodes`). Không tồn tại quản trị viên trung tâm hay việc dữ liệu bị lưu trữ tập trung. Về bản chất, nó mang những đặc điểm sau:
* **Phân tán**:  Một cơ sở dữ liệu blockchain được chia sẻ với tất cả những bên tham gia hệ thống và được nhận diện một cách rõ ràng trên toàn bộ mạng lưới ( các `nodes` và các `peers`). Tất cả các bên tham gia có cùng thông tin giống nhau.
* **Bất biến**: Cơ sở dữ liệu blockchain là một lịch sử các giao dịch mà không thể thay đổi, sử dụng hàm băm khối ( block hash) để giúp dễ dàng phát hiện và ngăn chặn việc thay đổi lịch sử.
* **An toàn**: Toàn bộ những thay đổi được thực hiện qua các giao dịch được ký bởi những định danh đã xác thực trong mạng.

Những đặc trưng trên cùng với các cơ chế đồng thuận cung cấp sự tin tưởng giữa tất cả các bên tham gia trong mạng blockchain.

# Đặc điểm nổi bật của Hyperledger Sawtooth
### Sự tách biệt giữa tầng ứng dụng và hệ thống cốt lõi
![](https://images.viblo.asia/eb21c8e6-ab2e-4e59-a9f5-4553e7b7c124.png)
Sawtooth giúp dễ dàng phát triển và triển khai một ứng dụng bằng cách cung cấp sự tách biệt rõ rằng giữa tầng ứng dụng và tầng lõi hệ thống. Bên cạnh đó, Sawtooth cung cấp các `smart contract abtraction` giúp các nhà phát triển ứng dụng viết contract logic bằng ngôn ngữ họ muốn.

Mỗi ứng dụng có thể là một logic nghiệp vụ riêng hoặc một máy ảo hợp đồng thông minh (smart contract virtual machine). Trên thực tế, cả hai loại ứng dụng trên có thể  tổn tại trong cùng một blockchain. Sawtooth cho phép những quyết định thiết kế này được đưa ra trong lớp xử lý giao dịch, cho phép nhiều loại ứng dụng  tồn tại trên cùng một thực thể của mạng blockchain.

Mỗi ứng dụng định nghĩa bộ xử lý giao dịch( [transaction processors](https://sawtooth.hyperledger.org/docs/core/releases/latest/glossary.html#term-transaction-processor))  (giống như smart contract của Ethereum hay chaincode của Fabric) tùy chỉnh cho các yêu cầu riêng biệt của nó. Sawtooth còn cung cấp một số [transaction families](https://sawtooth.hyperledger.org/docs/core/releases/latest/glossary.html#term-transaction-family) mẫu  cho các chức năng cấp thấp (chẳng hạn như duy trì cài đặt toàn chuỗi và lưu trữ quyền trên chuỗi), và cho các ứng dụng cụ thể như phân tích hiệu suất và lưu trữ thông tin khối.

Transaction processor SDKs đã có sẵn trong nhiều loại ngôn ngữ để tinh giản việc tạo mới một hợp đồng  thông minh, bao gồm Python, JavaScript, Go, C++, Java, and Rust. Ngoài ra, REST API cũng được cung cấp để đơn giản hóa việc phát triển ứng dụng bên phía client bằng cách sử dụng [validator](https://sawtooth.hyperledger.org/docs/core/releases/latest/glossary.html#term-validator) chuẩn hóa giao tiếp sang chuẩn HTTP/JSON. 

### Private Networks with the Sawtooth Permissioning Features
Sawtooth được xây dựng để giải quyết các thách thức của permissioned (private) networks. Các cụm node Sawtooth có thể được triển khai dễ dàng với phân quyền riêng biệt. Vì vậy không có dịch vụ tập trung nào có khả năng rò rỉ các giao dịch hoặc các thông tin bí mật khác.

Các cài đặt đặc trưng của phân quyền, chẳng hạn như vai trò và định danh, cũng được lưu trữ trên blockchain để tất cả các người tham gia trong mạng đều có thể truy cập thông tin này.

### Thực hiện giao dịch song song
![](https://images.viblo.asia/0044d782-4d0f-4c18-b6d6-8de761311c5c.png)
Đây là một tính năng nổi bật nhất của Sawtooth.
Hầu hết các mạng blockchain yêu cầu giao dịch tuần tự để đảm bảo trật tự nhất quán giữa các node trong mạng. Tuy nhiên Sawtooth lại được tích hợp một bộ lập lịch song song (parallel scheduling) giúp phân chia các giao dịch thành các luồng song song. Dựa trên vị trí trong trạng thái (state) được truy cập bởi giao dịch, Sawtooth có thể tách biệt việc thực hiện các giao dịch với nhau trong khi vẫn duy trì thay đổi theo ngữ cảnh.

Các giao dịch có thể thực hiện song song với nhau đồng thời ngăn chặn `double-spending` ngay cả với nhiều sửa đổi trong cùng một trạng thái. Nhờ có khả năng lập lịch song song, Sawtooth cung cấp sự gia tăng đáng kể về hiệu suất so với thực hiện tuần tự.
### Event System
Hyperledger Sawtooth hỗ trợ việc tạo và lan truyền các sự kiện cho phép các ứng dụng có thể :
* Theo dõi các sự kiện xảy ra liên quan đến hệ thống blockchain, chẳng hạn một chuỗi mới được tạo hoặc chuyển ra một fork mới
* Theo dõi các sự kiện cụ thể của ứng dụng xác định bởi `transaction family`.
* Chuyển tiếp thông tin về thực hiện một giao dịch trở lại phía client mà không cần phải lưu trữ dữ liệu đó trong trong trạng thái. 

Việc theo dõi được gửi và thực hiện thông qua thông qua ZMQ Socket.
### Tích hợp Ethereum Contract với Seth
Với những dự án tích hợp Sawtooth-Ethereum, Seth sẽ giúp mở rộng khả năng tương tác giữa nền tảng Sawtooth với Ethereum bằng cách triển khai EVM (Ethereum Virtual Machine) smart contracts sử dụng Seth transaction family.
### Dynamic Consensus
![](https://images.viblo.asia/41ec31e9-4bd0-46e3-93fc-4c874271dca2.png)
Trong blockchain, đồng thuận là một tiến trình xây dựng thỏa thuận giữa một nhóm các bên tham gia trong cùng một mạng.  Trong private chain, các thuật toán đồng thuận thường yêu cầu một hình thức voting trong tập hợp những bên tham gia đã được định danh từ trước. Các cách tiếp cận chung bao gồm sự đồng thuận theo kiểu Nakamoto, bầu ra một nhà lãnh đạo thông qua một số hình thức xổ số và các biến thể của thuật toán Byzantine Fault Tolerance (BFT) truyền thống, sử dụng nhiều vòng bỏ phiếu rõ ràng để đạt được sự đồng thuận.

Sawtooth trừu tượng hóa các khái niệm cốt lõi của sự đồng thuận và cô lập sự đồng thuận từ ngữ cảnh của giao dịch. Consensus interface Sawtooth hỗ trợ `plugging in` trong việc triển khai phương thức đồng thuận khác nhau dưới dạng các `consensus engine` tương tác với `validator` thông qua API đồng thuận. Đặc biệt, Sawtooth cho phép bạn thay đổi phương thức đồng thuận sau khi mạng blockchain đã được tạo. Thuật toán đồng thuận được chọn trong quá trình thiết lập mạng ban đầu và có thể được thay đổi trên một blockchain đang chạy với một hoặc hai giao dịch.

 Sawtooth consensus API hỗ trợ nhiều thuật toán đồng thuận trên mạng, bao gồm:
 
[Sawtooth PBFT](https://sawtooth.hyperledger.org/docs/pbft/releases/v1.2.3/) (Practical Byzantine Fault Tolerance): là một thuật toán đồng thuận dựa trên biểu quyết, cung cấp khả năng chịu lỗi của Byzantine với tính chung cuộc (finality) . Sawtooth PBFT mở rộng thuật toán PBFT ban đầu với các tính năng như thành viên mạng động (dynamic membership) , thay đổi chế độ xem thường xuyên và thủ tục bắt kịp khối (block catch-up procedure). Một mạng Sawtooth với sự đồng thuận PBFT yêu cầu ít nhất bốn nodes.

[PoET (Proof of Elapsed Time)](https://sawtooth.hyperledger.org/docs/core/releases/latest/architecture/poet.html)  là một thuật toán đồng thuận kiểu Nakamoto, được thiết kế để trở thành một giao thức cấp production có khả năng hỗ trợ các quần thể network lớn. PoET dựa vào thực thi lệnh an toàn để đạt được các lợi ích mở rộng của thuật toán đồng thuận kiểu Nakamoto mà không bị nhược điểm tiêu thụ năng lượng của thuật toán Proof of Work. Một mạng Sawtooth với sự đồng thuận PoET yêu cầu ít nhất ba nodes.

Sawtooth bao gồm hai phiên bản của sự đồng thuận PoET:

PoET-SGX dựa vào Môi trường thực thi tin cậy (Trusted Execution Environment) để triển khai hệ thống `lottery` bầu cử lãnh đạo, chẳng hạn như Intel® Software Guard Extensions  (SGX). PoET-SGX đôi khi được gọi là PoET / BFT 'vì nó có khả năng chịu lỗi Byzantine.

Trình mô phỏng PoET cung cấp sự đồng thuận theo kiểu PoET trên mọi loại phần cứng, bao gồm cả môi trường virtualized cloud. Trình giả lập PoET còn được gọi là PoET / CF.T, vì nó có khả năng chịu lỗi crash fault tolerant, không phải là lỗi Byzantine.

[Sawtooth Raft ](https://github.com/hyperledger/sawtooth-raft) là một thuật toán đồng thuận dựa trên nhà lãnh đạo (leader-based ) cung cấp khả năng chịu lỗi sự cố cho một mạng nhỏ với tư cách thành viên bị hạn chế.

Devmode (viết tắt của“developer mode”) là một thuật toán đơn giản hóa bầu lãnh đạo ngẫu nhiên, rất hữu ích để phát triển và thử nghiệm bộ xử lý giao dịch. Devmode không được khuyến nghị cho các mạng nhiều nút và không nên được sử dụng cho production.

Để tìm hiểu kĩ hơn, xem qua [About Dynamic Consensus.](https://sawtooth.hyperledger.org/docs/core/releases/latest/sysadmin_guide/about_dynamic_consensus.html)
(Mình sẽ có thêm một bài dịch chuyên về consensus sau)

# Sample Transaction Families
![](https://images.viblo.asia/6cd83a24-8c33-44e4-bafb-80492c93bdbc.png)
Trong một ứng dụng Sawtooth, mô hình dữ liệu và ngôn ngữ giao dịch được triển khai trong một [transaction family](https://sawtooth.hyperledger.org/docs/core/releases/latest/glossary.html#term-transaction-family), được chạy trên Sawtooth node như một bộ xử lý giao dịch. 
Bởi vì đa số các nhà phát triển sẽ xây dựng các `transaction families` tùy theo các yêu cầu riêng biệt trong sổ cái của họ, Sawtooth cung cấp một số transaction families cốt lõi làm mẫu 

* IntegerKey - Được sử dụng để thử nghiệm sổ cái triển khai.
* Setting - Cung cấp  tham chiếu triển khai để lưu trữ cài đặt cấu hình trên chuỗi.
* Identity - Xử lý cấp phép trên chuỗi cho các  giao dịch viên và khóa xác nhận để tinh giản quản lý danh tính và danh sách khóa công khai.

Ngoài ra còn có các `transaction family` mô hình hóa  cho một vài ngữ cảnh cụ thể:

* [Smallbank](https://sawtooth.hyperledger.org/docs/core/releases/latest/transaction_family_specifications/smallbank_transaction_family.html) - Xử lý phân tích hiệu suất để kiểm tra hiệu chuẩn và kiểm tra hiệu năng khi so sánh hiệu năng của các hệ thống blockchain. Transaction Family này dựa trên hiệu chuẩn H-Store Smallbank.
* [BlockInfo](https://sawtooth.hyperledger.org/docs/core/releases/latest/transaction_family_specifications/blockinfo_transaction_family.html) - Cung cấp phương pháp lưu trữ thông tin về cầu hình số lượng các history blocks. 

Các dự án Hyperledger khác cung cấp chức năng hợp đồng thông minh cho nền tảng Sawtooth:

* Sawtooth Saber - Thực hiện các hợp đồng thông minh trên chuỗi được thực thi trong máy ảo WebAssugging (WASM).
* [Sawtooth Seth](https://sawtooth.hyperledger.org/docs/seth/nightly/master/) - Hỗ trợ chạy các hợp đồng thông minh Ethereum Virtual Machine (EVM) trên Sawtooth
* Để biết thêm thông tin, xem [Transaction Family Specifications](https://sawtooth.hyperledger.org/docs/core/releases/latest/transaction_family_specifications.html). (Mình cũng sẽ có thêm một bài viết nữa về mảng này sau :sweat_smile:)

# Kết luận
Hy vọng qua bài viết vừa rồi các bạn đã có một cái nhìn tổng quan về dự án Hyperledger Sawtooth! Hẹn gặp lại ở những bài viết sau! :smile: