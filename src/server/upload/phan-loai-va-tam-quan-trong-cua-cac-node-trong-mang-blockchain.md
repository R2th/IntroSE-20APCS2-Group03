**Trước khi đi vào phân loại và nêu rõ được tầm quan trọng của các node trọng mạng blockchain thì mình xin được trích dẫn khái niệm về blockchain từ [Wikipedia](https://vi.wikipedia.org/wiki/Blockchain) như sau:**
> Blockchain (chuỗi khối), tên ban đầu block chain là một cơ sở dữ liệu phân cấp lưu trữ thông tin trong các khối thông tin được liên kết với nhau bằng mã hóa và mở rộng theo thời gian. Mỗi khối thông tin đều chứa thông tin về thời gian khởi tạo và được liên kết tới khối trước đó, kèm một mã thời gian và dữ liệu giao dịch. Blockchain được thiết kế để chống lại việc thay đổi của dữ liệu: Một khi dữ liệu đã được mạng lưới chấp nhận thì sẽ không có cách nào thay đổi được nó.
> 
> Blockchain được đảm bảo nhờ cách thiết kế sử dụng hệ thống tính toán phân cấp với khả năng chịu lỗi byzantine cao. Vì vậy sự đồng thuận phân cấp có thể đạt được nhờ Blockchain. Vì vậy Blockchain phù hợp để ghi lại những sự kiện, hồ sơ y tế, xử lý giao dịch, công chứng, danh tính và chứng minh nguồn gốc. Việc này có tiềm năng giúp xóa bỏ các hậu quả lớn khi dữ liệu bị thay đổi trong bối cảnh thương mại toàn cầu.

Công nghệ blockchain tương đồng với cơ sở dữ liệu, chỉ khác ở việc tương tác với cơ sở dữ liệu. Và Blockchain sử dụng cơ chế đồng thuận phân tán đồng đẳng. tức là dữ liệu của tất cả mạng blockchain sẽ được lưu trữ trên một mạng lưới, và node chính là một một thiết bị kết nối vào mạng lưới đó.

## Node là gì ?
Bất kỳ thiết bị nào được kết nối với blockchain đều có thể được phân loại là một node. Ví dụ: máy chủ, máy tính, máy tính xách tay, ví trực tuyến hoặc máy tính để bàn và điện thoại di động. Tất cả các node đều được kết nối với blockchain theo một cách nào đó và liên tục cập nhật cho nhau những thông tin mới nhất được thêm vào blockchain. Các node là một thành phần quan trọng đối với cơ sở hạ tầng của một blockchain. Chúng hoạt động để xác nhận cho sổ cái và cho phép mọi người xem các giao dịch được  tiến hành  hoặc dữ liệu được hoặc lưu giữ trên mạng một cách minh bạch. Lợi ích cốt lõi của các node là đảm bảo dữ liệu được lưu giữ trên blockchain là hợp lệ, an toàn và có thể truy cập được cho các bên được ủy quyền.

## Vai trò của một node?
Mục tiêu của các node là duy trì độ tin cậy của dữ liệu được lưu trữ trên blockchain. Thực tế là toàn bộ lịch sử blockchain có thể được lưu trữ với một node đầy đủ duy nhất chạy nó. Tuy nhiên Blockchain càng có nhiều node, nó càng trở nên phi tập trung hơn và do đó trở nên linh hoạt trước các mối đe dọa như sự cố hệ thống hoặc mất điện. Khi một block (khối) dữ liệu mới được thêm vào một blockchain, một node sẽ truyền đi block đó với các node khác trên mạng. Dựa trên tính hợp lệ của block mới và loại node, các node đầy đủ có thể từ chối hoặc chấp nhận khối. Khi một khối mới được node chấp nhận, thông tin sẽ được thêm vào đầu của các khối đã tồn tại trước đó.

Tóm lại vai trò của node là :

* Kiểm tra tính hợp lệ của một khối (block) mới.
* Lưu trữ một khối vào blockchain.
* Cập nhật các node khác trong mạng blockchain để đảm bảo rằng thông tin trên các node khác đều là mới nhất.

## Phân loại và sự khác nhau của node
Các node thường được phân thành hai loại: full nodes (node đầy đủ) và light nodes (còn được gọi là nút nhẹ hoặc nút Xác minh thanh toán đơn giản (SPV)). Các full node bao gồm một bản sao duy nhất của toàn bộ lịch sử blockchain bao gồm các giao dịch, dấu thời gian và tất cả các khối đã tạo. Ví dụ: một full node Bitcoin sẽ lưu trữ tất cả thông tin liên quan đến mọi giao dịch đơn lẻ kể từ khi mạng Bitcoin bắt đầu cho đến bây giờ.

Các light node hoặc node SPV thường là ví được tải xuống và được kết nối với các full node để xác thực thêm thông tin được lưu trữ trên blockchain. Chúng có kích thước nhỏ hơn nhiều và chỉ chứa thông tin về lịch sử một phần blockchain.

### Full và Super Nodes

Một full node nắm giữ tất cả thông tin được lưu giữ trên một blockchain và hoạt động như một máy chủ cốt lõi trên các mạng blockchain phi tập trung. Mỗi khối trong một blockchain được xác minh, xác thực và lưu trữ bởi tất cả các full node trong mạng.

Hình ảnh minh họa cho một node đầy đủ trong mạng blockchain:
![Hình ảnh minh họa cho một node đầy đủ trong mạng blockchain.](https://images.viblo.asia/2d9d3bf2-506d-4b2b-a887-dec3b0e0dacb.png)
Mỗi node đầy đủ sẽ lưu trữ một bản sao của tất cả các giao dịch blockchain. Vì thế chúng đòi hỏi dung lượng lưu trữ và năng lượng tính toán cao. 
Các full node nắm giữ một vai trò rất quan trọng trong mạng blockchain. Bởi vì chúng quyết định đến tính bảo mật và hợp lệ của mạng blockchain đó. Vì thế vai trò của nó khác với các loại node khác bao gồm:

* Xác thực chữ ký trong mỗi khối giao dịch: Khi một khối mới được thêm vào blockchain, full node sẽ dùng khóa công khai của người gửi giao dịch để kiểm tra tính hợp lệ của giao dịch. Quá trình này gọi là xác thực chữ ký điện tử.
* Người thực thi quyết định chính của các quy tắc đồng thuận: Các node đầy đủ có quyền và sự ảnh hưởng đến việc từ chối các khối mới. Sau khi được các node khác xác thực, full node có thể từ chối khối mới này bởi vì một trong những lý do như : Định dạng khối không đúng, hoặc khối này đã được khai thác.


Các node đầy đủ thường được điều hành bởi các tình nguyện viên hoặc các bên liên quan. Và việc chạy các node đầy đủ này cụ thể là trên mạng bitcoin thì sẽ không nhận được phần thưởng cho việc xác thực giao dịch.

### Light nodes

Các light node có mục đích tương tự như các node đầy đủ, tuy nhiên thay vì lưu trữ toàn bộ lịch sử giao dịch của một blockchain thì chúng chỉ giữ một phần của lịch sử giao dịch như tiêu đề của các khối, từ đó có thể truy vấn tính hợp lệ của các giao dịch trước đó. 
Tiêu đề khối là một bản tóm tắt của một khối, bao gồm thông tin liên kết với khối trước đó. Thông tin lưu trữ trong tiêu đề bao gồm: dấu thời gian tại thời điểm tạo khối, và số nonce.

Hình ảnh minh họa cho các full node và light node: 
![](https://images.viblo.asia/0c5a7991-f309-4cc3-a859-bf256c408b32.png)
Như hình trên, các light node sẽ được kết nối với full node ( thường được gọi là node cha của chúng). Các light node phải dựa vào full node để xác minh tính hợp lệ của dữ liệu.
Các light node giúp phần mở rộng và phân cấp mạng lưới blockchain, bởi vì lưu trử và xử lý dữ liệu ít hơn các node đầy đủ nên chúng cần ít tài nguyên hơn để duy trì và chạy. Ví dụ về light node : máy tính để bàn, ví blockchain.

### Node khai thác (Mining node)

Các node khai thác là các node tạo ra các khối cho blockchain. Giống như chúng ta thường nghe đến "thợ đào bitcoin", thì các thợ đào đang chạy loại node mining. Vai trò của các node này là thực hiện tính toán để tìm ra một số nonce đáp ứng yêu cầu của blockchain đó.
Node đầu tiên tìm ra được số nonce này, sẽ gửi kết quả của nó cho các full node xác thực và full node sẽ thêm block mới này blockchain.
Việc tìm ra số nonce này sẽ tiêu tốn tài nguyên và năng lượng, vì vậy các node mining này sẽ nhận được một phần thưởng cho việc tạo ra khối mới.
Các node khai thác chỉ chịu trách nhiệm tạo ra cács khối chứ chúng không chịu trách nhiệm về việc duy trì hoặc tính hợp lệ của các khối trong tương lai ( không giống như các node đầy đủ ).

Hình minh họa đầy đủ các node trong mạng blockchain: 
![](https://images.viblo.asia/1bf2de80-581c-4a29-95fd-a4bf66a75068.png)

### Sự khác biệt giữa các node khai thác và node đầy đủ .

Sự khác biệt thứ nhất đó là node đầy đủ sẽ không được trả thưởng cho việc xác thực khối và node khai thác thì sẽ được trả thưởng cho việc tìm ra khối mới.
Thứ hai là người khai thác ngoài việc chạy một node khai thác thì phải chạy một node đầy đủ để có thể xác thực và thêm khối đó vào blockchain thì người đó mới được nhận thưởng. Ngược lại thì node đầy đủ không yêu cầu phải tồn tại node khai thác. 

**Đặc điểm chính của các loại node:**

| | Có thể tạo khối mới | Gửi một giao dịch mới | Chứa thông tin số dư của ví | Lưu toàn bộ lịch sử giao dịch của blockchain |
| -------- | -------- | -------- |-------- | -------- |
| Mining node     | Yes     | No     | No     | No     |
| Full node     | No     | Yes     | Yes     | Yes     |
| Light node    | No     | Yes     | Yes     | No     |

## Kết luận
Bài viết mình có tham khảo và viết theo ý hiểu của mình theo nguồn sau : [Classification and importance of nodes in a blockchain network](https://www.seba.swiss/research/Classification-and-importance-of-nodes-in-a-blockchain-network)