Đồng thuận trong một hệ thống phân tán luôn là vấn đề khó nhất khi xây dựng một hệ thống tính toán phân tán. Đã có nhiều giải pháp và thiết kế được sinh ra để giải quyết vấn đề này. 

Raft là một thuật toán giải quyết tốt vấn đề này, như đã giới thiệu ở Phần 1. Và Raft đã chia vấn đề đồng thuận thành 3 vấn đề con: 

1. Leader Election
2. Log Replication
3. Safety

Ở bài viết này, mình sẽ bàn về vấn đề đầu tiên là **Leader Election**.

### Vai trò của Leader trong một cụm Raft

Raft là một thuật toán đồng thuận dựa trên mô hình *Leader*, nơi mà một Leader sẽ được bầu và nó sẽ chịu trách nhiệm hoàn toàn trong việc quản lý tất cả các máy khác (cụm), cụ thể là nó sẽ thực hiện replicate các log mà nó nhận được từ phía *client* đến tất cả các node trong cụm. 

Như Hình 1 bên dưới, S1 là node được bầu làm Leader khi cụm Raft khởi động và nó sẽ có trách nhiệm nhận request từ phía *client* và replicate các log chứa các command đến các node còn lại,  sau khi cụm đã đạt được sự đồng thuận trong tính toán, S1 sẽ trả về phản hồi cho *client*. 

![](https://images.viblo.asia/bf917661-f89b-4dfd-9cff-ff3b00762cee.png)
<p align="center">Hình 1. Cụm Raft</p>

Để một node có thể trở thành *Leader*, nó phải nhận được ít nhất (N/2 + 1) số vote, trong đó N là số node của cụm. Như vậy một cụm Raft phải có ít nhất 3 node trở lên để có thể hoạt động và 5 node trở lên để hoạt động hiệu quả.

### Sự luân chuyển trạng thái của một node trong Raft
Khi một cụm Raft bắt đầu hoạt động hoặc một cụm Raft đang hoạt động nhưng Leader của cụm đấy bị mất kết nối thì một Leader mới sẽ được bầu thông qua quá trình bầu cử giữa các node thành viên của cụm đấy. Do đó, tại một thời điểm nhất định một node chỉ có thể mang một trong ba trạng thái sau:  *Follower*, *Candidate*, *Leader*. 

Leader sẽ phải chịu trách nhiệm hoàn toàn trong việc quản lý cụm Raft, bắt và xử lý các command được gửi từ phía *client*. Còn các *Follower* sẽ nằm ở thế bị động và họ chỉ thực hiện các yêu cầu của *Leader* và *Candidate*. Khi cụm Raft rơi vào trạng thái không có Leader (do Leader cũ bị lỗi), thì bất kỳ *Follower* nào cũng có thể trở thành *Candidate* và gửi request cho các thành viên khác để yêu cầu lượt vote từ chúng.  

![](https://images.viblo.asia/ad8ff805-c52d-4111-9399-ba80551fbc8c.png)
<p align="center">Hình 2. Quá trình chuyển đổi trạng thái của node.</p>

### Term (nhiệm kỳ) trong Raft

Trong Raft, thời gian được chia thành các đơn vị được gọi là *Terms* (nhiệm kỳ).  Như dưới Hình 3, mỗi Term sẽ được bắt đầu với một cuộc bầu cử và sau đó Leader được bầu ra sẽ phục vụ cho đến khi kết thúc Term nếu nó không bị bất kỳ lỗi nào trong quá trình làm Leader.

![](https://images.viblo.asia/eb55609f-e518-46e8-9c3c-7926c77ecd53.png)
<p align="center">Hình 3. Term</p>

Trong một số trường hợp , một cuộc bầu của có thể có 2 *Candidate* nhận được số vote ngang nhau (trường hợp này được gọi là *split vote scenarios*) thì một cuộc bầu cử mới cần phải bắt đầu ngay lập tức. Các Term được đánh số tăng dần để chỉ ra nó là Term thứ mấy, và giá trị này luôn được gửi kèm trong giao tiếp giữa các thành viên của cụm. Các node của cụm sẽ giao tiếp với nhau bằng cách sử dụng RPC (remote procedure calls).
###  Raft dùng gì để phát hiện nhiệm kỳ hiện tại có nguy cơ kết thúc và kích hoạt một nhiệm kỳ mới ?
Trong Raft, mỗi node sử dụng cơ chế *heartbeat* để phát hiện nhiệm kỳ hiện tại đã kết thúc và bắt đầu một cuộc bầu cử mới. Nghĩa là, trong suốt quá trình hoạt động bình thường *Leader* sẽ phải gửi các *heartbeat messages* đến tất cả thành viên của cụm theo định kỳ để thông báo rằng nó vẫn còn hoạt động và các node còn lại phải duy trì tiếp trạng thái *Follower* của mình, nếu không các các node khác sẽ cho răng *Leader* hiện tại đã chết và kích hoạt một cuộc bầu cử mới.

![](https://images.viblo.asia/f6fc8663-b5b9-43e3-b5a6-8414f2b20714.png)
<p align="center">Hình 4. Heartbeat messages được gử theo định kỳ từ Leader đến Followers</p>

Heartbeat có cùng kiểu *message type*  (đó là AppendEntries RPC) với các message mà Leader sử dụng để gửi các *log entries* mới đến *Follower*, nhưng các *AppendEntries RPC* đó có trường  entry[] là rỗng để biểu thị rằng đó là Heartbeat message. 

Nếu một *Follower* không nhận được *Heartbeat message* trong một khoảng thời gian *election timeout* thì nó sẽ khởi tạo một cuộc bầu cử mới. 

### Quy trình khởi tạo một cuộc bầu cử
Khi một *Follower* sau khoảng một thời gian *timeout* mà nó không nhận được bất kỳ *AppendEntries RPC* nào (hoặc là Heartbeat hoặc là message chứa *log entries*) từ *Leader* nó sẽ xem là *Leader* đã hỏng và bắt đầu một thủ tục bầu cử mới bằng cách:

1. Tăng currentTerm của nó
2. Tự vote cho chính mình và *RequestVote RPC* đến các thành viên còn lại để vote nó trở thành Leader.

Trong Hình 5 giả sử rằng S1 là node chạm đến *election timeout* đầu tiên trong cụm, do đó S1 chuyển sang trạng thái *Candidate* và gửi *RequestVote RPC*  đến cho S2, S3, S4, S5.

![](https://images.viblo.asia/e9b9596a-1be2-412e-92d6-fc23431f5a59.png)
<p align="center">Hình 5. Election process, RequestVote RPC, votes</p>

### Các kết quả có thể có của một cuộc bầu cử

Dựa trên các response mà *Candidate* nhận được từ các node trong cụm, mà cuộc bầu cử có thể sẽ kết thúc với một trong 3 kết quả:

1. *Candidate* chiến thắng cuộc bầu cử với đa số vote của các node trong cụm, khí đó nó nhận được từ (N/2 + 1) số vote trở lên, trong đó, N là số lượng node của cụm.
2. Trong khi S1 chờ đợi thì có thể nó lại nhận được một *AppendEntries RPC* từ một node tuyên bố nó vừa trở thành Leader, nếu *currentTerm* của Candidate thấp hơn so với *term* mà nó nhận được trong message, thì S1 sẽ bỏ cuộc và công nhận node đó là Leader.
3. Vote chia rẽ (*Split vote scenario*): Tình huống này có thể xảy ra khi có nhiều node trở thành *Candidate* trong cùng một thời điểm mà không một *Candidate* nào nhận được đa số vote, tình huống này được gọi là *split vote*, khi gặp phải tình huống này mỗi *Candidates* sẽ bị timeout và một cuộc bầu cử mới lại bắt đầu.

### Randomize Election Timeout để hạn chế tình trạng Split Vote
Để giảm thiểu khả năng cụm Raft rơi vào tình huống *split vote*, Raft sử dụng một cơ chế đó là *randomize election timeout*, khi đó, mỗi node sẽ có một giá trị *election timeout* khác nhau, nên sẽ giảm thiểu khả năng 2 node khởi tạo một cuộc bầu cử mới trong cùng một thời điểm.
### Tài liệu tham khảo
https://raft.github.io/raft.pdf

https://medium.com/@kasunindrasiri/understanding-raft-distributed-consensus-242ec1d2f521