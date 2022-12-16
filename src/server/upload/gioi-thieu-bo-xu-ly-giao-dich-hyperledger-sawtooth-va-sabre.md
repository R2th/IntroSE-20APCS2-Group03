Xin chào các bạn, hôm nay mình sẽ viết 1 bài viết giới thiệu về bộ xử lý giao dịch (transaction processors) của Hyperledger Sawtooth và Sabre.
# 1. Hệ thống phân tán (Distributed Systems) là gì ?
- Hệ thống phân tán có các tính chất sau:
    * Phân tán (Distributed)
    * Bất biến (Immutable)
    * Bảo mật (Secure)
- Ngày nay moij người có xu hướng sử dụng các hệ thống phân tán hơn là việc sử dụng cơ sở dữ liệu để lưu trữ dữ liệu 1 cách hợp nhất. Vì 1 hệ cơ sở dữ liệu đồng nhất sẽ có người quản lý và duy trì (đây là điều người ta không mong muốn), thay vào đó mỗi người sẽ có 1 sổ cái lưu trữ riêng (ledger). Điều quan trọng là mạng phân tán không thể thay đổi được. Chúng ta không thể truy cập dữ liệu vào lịch sử và thay đổi nó được. Nếu muốn truy cập lịch sử dữ liệu để thay đổi 1 cái gì đó, người đó phải tính toán lại tất cả các block được sinh ra sau block muốn sửa hiện tại sao cho đúng, điều này gần như không thể. Việc xác thực được bảo mật bằng khóa công khai và khóa riêng. Tất cả các giao dịch không thỏa mãn 2 khóa trên thì đều không hợp lệ.
# 2. Hyperledger Sawtooth
- Hyperledger Sawtooth là 1 nền tảng chuỗi khối để xây dựng, triển khai và chạy mạng các sổ cái phân tán. Nó cung cấp một nền tảng module để triển khai các cập nhật dựa trên giao dịch đối với trạng thái được chia sẻ giữa các bên liên quan. Chúng ta sẽ phải chia sẻ trạng thái giao dịch với nhau, nếu không thì không đúng tính chất của 1 mạng sổ cái phân tán. Ở đây nhóm giao dịch (transaction families) là một nhóm hoạt động và loại giao dịch được cho phép trong chuỗi khối của chúng ta. Điều này thì phụ thuộc vào nhu cầu của công ty và logic kinh doanh của nó. Chúng ta có thể lựa chọn bất kỳ họ giao dịch nào. Sawtooth hỗ trợ phát triển Smart Contract từ cả bytecode của Ethereum EVM lẫn bytecode của WebAssembly.
- Lớp ứng dụng trong sawtooth được trừu tượng hóa. Nghĩa là tất cả các Developer có thể sử dụng bất kỳ ngôn ngữ nào để phát triển logic nghiệp vụ cần thiết cho hệ thống mà không cần quan tâm nhiều đến cốt lõi của hệ thống. Điều này là rất tiện lợi trong sawtooth.
- Trong sawtooth, mỗi ứng dụng xác định 1 bộ xử lý giao dịch duy nhất. Việc giao dịch trên mạng được điều khiển bởi các thuật toán đồng thuận. Vì lớp cốt lõi và lớp ứng dụng được tách biệt hoàn toàn trong sawtooth. Nó cho phép các Developer sử dụng các quy tắc giao dịch ưu tiên và thuật toán đồng thuận theo quy tắc kinh doanh riêng của họ. Các thuật toán đồng thuận khác nhau có các ưu nhược điểm khác nhau, điển hình là PoET và PBFT.
- Hầu hết các công nghệ Blockchain sử dụng quy trình xử lý nối tiếp nhưng sawtooth lại cho phép xử lý song song. Các bộ xử lý giao dịch được thực hiện theo cách song song để tránh các vấn đề như vấn đề chi tiêu gấp đôi. Do đó, hiệu suất được cải thiện đáng kể. Nhiều họ giao dịch có thể được chạy song song.
- Một tính năng quan trọng khác mà sawtooth có là triển khai các mạng private. Điều này có thể đạt được bằng cách cấp phép cho một cụm nút giống nhau. Các quyền này cũng được lưu trữ trong chuỗi khối. Vì vậy tất cả những người tham gia đều có thể truy cập những thông tin này.
# 2. Sawtooth Sabre
- Sawtooth Saber là một họ giao dịch cho các smart contract WebAssembly trên chuỗi.
- Có thể triển khai và thực thi bytecode trên chuỗi thông qua các giao dịch là một lợi thế lớn của Sabre. Lợi thế chỉ phát huy tối đa khi tính đến tốc độ và ngôn ngữ hỗ trợ trong WebAssembly.
- Tất cả các đối tượng Sabre như đăng ký không gian tên, đăng ký hợp đồng và hợp đồng được tuần tự hóa bằng cách sử dụng bộ đệm giao thức trước khi được lưu trữ ở trạng thái. Cơ quan đăng ký không gian tên lưu trữ không gian tên (được sử dụng để xác định một phần trạng thái), chủ sở hữu của không gian tên và các quyền được cấp cho không gian tên. Cơ quan đăng ký hợp đồng theo dõi các phiên bản của hợp đồng Sabre và danh sách các chủ sở hữu.
- Sabre bao gồm hai phần chính: Sabre CLI và bộ xử lý giao dịch Sabre.
- Sabre CLI được sử dụng để gửi giao dịch Saber tới API phần còn lại sawtooth. Do đó, cần đảm bảo cả hai phiên bản có tương thích với nhau hay không.
# 3. Sawtooth vs Sabre
- Cả dòng giao dịch cốt lõi của Sawtooth và Sawtooth Sabre đều có thể được sử dụng để triển khai logic kinh doanh cần thiết cho một công ty. Nhưng vì Sabre cung cấp một lớp trừu tượng khác, một người dùng được xác định là quản trị viên bởi sổ đăng ký không gian tên có thể triển khai nó.
- Sau khi triển khai, bất kỳ nút nào cũng có thể sử dụng nó. Việc triển khai dễ dàng hơn rất nhiều trong Sabre.
- Trong việc triển khai bộ xử lý giao dịch sawtooth nên được triển khai trong mỗi với mọi nút. Điều này có thể khó triển khai hơn nhưng nó cũng có những lợi thế riêng. Vì tất cả các nút phải đồng ý nên tính minh bạch sẽ tăng lên.
- Vì quản trị viên có thể triển khai bytecode có hại, việc triển khai của Sabre có phần rủi ro hơn. Nhưng vì nó sử dụng WebAssembly, nên nó rất nhanh.
![](https://images.viblo.asia/d0e7c58d-04dd-4f81-98ba-502e78d4e76e.jpeg)

# 4. Cái nào là tốt hơn, Sawtooth TP hay Sabre ?
- Thật ra không thể khẳng định cái nào là tốt hơn cả. Nó phụ thuộc vào nhu cầu của người sử dụng.
- Việc trước tiên là xác định nhu cầu nghiệp vụ cần thiết, rồi sau đó là lựa chọn cái phù hợp hơn.
> Nguồn [Sawtooth Core](https://sawtooth.hyperledger.org/docs/core/releases/latest/contents.html), [Sawtooth sabre](https://sawtooth.hyperledger.org/docs/sabre/nightly/master/index.html)