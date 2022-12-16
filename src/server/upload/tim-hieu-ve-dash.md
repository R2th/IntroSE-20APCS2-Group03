# Dash là gì ?
   Dash là một công nghệ blockchain đặc trưng bởi các tính năng như giao dịch xác thực tức thời (InstantSend), bảo vệ chống tiêu lặp (prevent double spending), giao dịch ẩn danh (PrivateSend), có cơ chế quản trị và cấp vốn bởi các masternode điều này tạo nên sự khác biệt giữa Dash và Bitcoin.
## Sự giống và khác nhau giữa Dash và Bitcoin
Dash gồm 2 tầng, tầng thứ nhất trong mạng lưới Dash gồm có các nodes (các
máy tính tương tác với nhau), tầng này kiểm soát bởi các miners. Tầng thứ nhất
xem xét những nền tảng cơ bản trong mạng lưới, như xác nhận các giao dịch
Dash và tạo ra DASH. Tầng thứ hai của mạng lưới Dash được đại diện bởi các
masternodes chuyên biệt. Đó là những fullnodes, các máy tính làm việc trong các
nhóm có mức độ an toàn gọi là các “quorums”. Các masternodes cung cấp một
loạt các dịch vụ phi tập trung như các giao dịch cá nhân (private transaction),
các giao dịch tức thì (instant transaction) và quản trị.
![](https://images.viblo.asia/b4f6be93-a519-4623-9fdf-03d5fd71f29f.png)

Cơ chế chọn người tạo khối mới (Leader Election) của Dash giống với Bitcoin đó là Proof of work. Việc đi tìm kiếm một lời giải cho một bài toán về mật mã như một phương pháp bảo mật các khối
trên blockchain – dựa trên sức mạnh tính toán. Khi miner tìm được lời giải cho bài toán, miner đó sẽ có quyền lãnh đạo và ra quyết định - tạo block. Để xử lý vấn đề Proof – of – work, Dash sử dụng thuật toán băm X11 thay vì SHA256 như của Bitcoin.

Thuật toán X11 sử dụng nhiều vòng của 11 thuật toán băm (blake, bmw, groestl,
jh, keccak, skein, luffa, cubehash, shavite, simd, echo), như vậy nó đảm bảo sự an
toàn cao nhất nhờ sự kết hợp các thuật toán băm rất tinh vi mà thường được sử
dụng trong các công nghệ blockchain hiện đại.

Dash hoạt động có một chút khác so với Bitcoin, vì nó có 2 tầng. Tầng thứ 2 gồm các nodes được gọi là masternode, tầng này cho phép thực hiện các dịch vụ như PrivateSend, InstantSend, hệ thống quản trị và ngân sách phi tập trung. Tầng thứ 2 này là quan trọng nên các masternodes cũng được phần thưởng khi có miner nào đó tìm được lời giải bài toán. Phần thưởng chia như sau 45 % cho miner, 45 % cho các masternode và 10 % dành cho hệ thống ngân sách. Các masternodes không tham gia vào quá trình mining nhưng nó vẫn được nhận phần thưởng khi block được tạo.

## Cơ chế đồng thuận của Dash (Fault tolerant consensus)
Giống với Bitcoin, khi một miner tìm được lời giải cho bài toán mật mã học – tạo một block mới. Nó sẽ gửi block mới này lên toàn mạng để cho các nodes khác trong mạng tiến hành xác thực để đảm bảo các giao dịch bên trong block không bị double spending. Việc thêm block mới vào blockchain xảy ra vấn đề khi các nodes sẽ nhận được các block mới khác nhau tại các thời điểm khác nhau dẫn đến có nhiều blockchain khác nhau trên một mạng. Vấn đề này được giải quyết
đối với consensus model Proof – of – work đó chính là blockchain nào có nhiều bằng chứng công việc (PoW) nhất hay blockchain nào dài nhất luôn được chọn để đồng thuận giữa các nodes trên toàn mạng phân tán.

Hệ thống masternode được gọi là Proof of Service (PoS), masternode cung cấp những dịch vụ quan trọng cho mạng lưới. Thực tế, toàn bộ mạng lưới được giám sát bởi các masternodes, nó có khả năng từ chối những block được tạo không đúng bởi các miner. Nếu một miner cố gắng chiếm đoạt toàn bộ phần thưởng của block cho mình hoặc cố gắng chạy một phiên bản cũ của phần mềm Dash, thì mạng lưới masternode sẽ làm cho block đó bị từ chối, và block đó sẽ không được đưa vào blockchain.

Masternode được trả công bởi mạng lưới cho việc cung cấp dịch vụ PrivateSend, InstantSend và dịch vụ quản trị. 45 % phần thưởng khi block được tạo được trả cho các masternodes, 45 % trả cho các miner và 10 % sẽ đưa vào ngân sách. Trong thực tế, một nửa phần thưởng từ các block sẽ trả cho miner và một nửa sẽ trả cho masternode. Sau đó, cứ mỗi 16,616 blocks (xấp xỉ 30 ngày), một superblock được tạo và nó có chứa toàn bộ 10 % phần chi trả cho những người dành được đề
xuất ngân sách. Một masternode được chọn một cách ngẫu nhiên để nhận thưởng trong mỗi block (xấp xỉ cứ mỗi 2.6 phút) từ một danh sách, một khi chúng đạt tới top 10 % của tổng số các masternodes, và sau đó quay trở lại cuối hàng đợi sau khi đã được nhận thưởng. Khi càng có nhiều masternodes được tạo, thì thời gian giữa các đợt nhận thưởng này sẽ được tăng lên. Do thuật toán lựa chọn để chọn ra masternode được nhận thưởng từ miner, nhưng về lâu dài, tất cả các masternodes sẽ nhận được các khoản thưởng tương tự nhau. Khi một masternode được chọn thì miner phải có nghĩa vụ trả phần thưởng block cho masternode ( 45 %), nếu không block đó sẽ bị từ chối bởi masternode. Nếu khoản đặt cọc của masternode đã bị sử dụng, hoặc một masternode dừng cung cấp dịch vụ cho mạng trong khoảng hơn một giờ, nó được đưa ra khỏi danh sách cho đến khi dịch vụ được cung cấp trở lại. Theo cách này, các masternode có động lực để cung cấp dịch vụ một cách hiệu quả và tin cậy cho mạng lưới.

Hệ thống các masternodes khiến cho dash linh hoạt hơn bitcoin, có thể giao dịch nhanh hơn bitcoin nhờ cơ chế InstantSend, việc tăng kích thước block của Dash có thể đạt được dễ dàng nhờ có hệ thống này.

Trên đây là bài chia sẻ rất cơ bản của mình về Dash, cảm ơn mọi người đã dành chút thời gian để đọc bài viết.

### Tài liệu tham khảo
https://docs.dash.org/en/stable/introduction/about.html