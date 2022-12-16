Bài viết này mô tả cách mà transaction diễn ra. <br>
Kịch bản bao gồm 2 client đến từ 2 tổ chức A và B (gọi tắt là 2 client A và B), 2 người này sẽ thực hiện một transaction là mua - bán củ cải :grinning:. <br>
Mỗi người sẽ thông qua một peer ( peerA , peerB) để submit transaction và tương tác với Ledger.<br><br>
#### Giả định 
Chúng ta giải định rằng chúng ta đã hoàn thiện xong phần network, trong network đó có 1 channel gồm Orderer và  2 tổ chức A, B. Mỗi client A, B đã được đăng ký một identity với Certificate Authority (CA) của tổ chức tương ứng. <br>

Chaincode  đã được install trên các peer và được instantiate trên channel. Chaincode chứa logic để thực hiện một transaction mua-bán củ cải. Endorsement Policy (Chính sách chứng thực) cũng đã được đặt ra cho chaincode này, với yêu cầu là 1 transaction phải được endorsing ( chứng th) bởi cả 2 tổ chức ( "AND ('Org1MSP.peer', 'Org2MSP.peer')" ).

#### 1. Client A bắt đầu 1 transaction

![](https://images.viblo.asia/a54e83fd-2b0d-4589-89d7-b169ccd2c900.png)

Client A gửi một request muốn mua củ cải. Request này được target đến peerA, peerB, là các peer của 2 tổ chức A, B. Do ở trên mình đã giả sử là Endorsement Policy quy định cả 2 tổ chức A và B phải chứng thực một transaction nên bắt buộc request phải được target  đến cả 2 peer như thế. <br><br>
Tiếp theo, với sự hỗ trợ bởi SDK ( Node, Java, Python ) một Transaction Proposal ( đề xuất giao dịch ) sẽ được xây dựng từ request ở trên. Transaction Proposal là một yêu cầu để invoke ( gọi ) một function nào đó trong chaincode với các tham số đầu vào nhất định, function này có thể là write hoặc read Ledger.<br><br>
SDK servers sẽ có nhiệm vụ đóng gói Transaction Proposal thành một  "Properly Architected Format" (bộ đệm giao thức trên gRPC) và lấy thông-tin-số ( hiểu đơn giản đây là khi client dùng identity của mình để tạo request thì hệ thống sẽ phân tích và lấy được thông-tin-số từ identity đó ) của client để tạo signature ( chữ ký ) cho Transaction Proposal. <br>

#### 2. Các Endorsing peers sẽ kiểm tra chữ ký và thực thi transaction với bản sao Ledger được lưu trên nó.

![](https://images.viblo.asia/ad1aaa4b-0127-4bc4-8b69-a3695e2e079f.png)

Các Endorsing Peers sẽ xác nhận rằng Transaction Proposal được tạo đúng chuẩn và nó chưa tưng được gửi đi trước đây ( mục đích chống tấn công theo kiểu replay-attack ) và chữ ký  trên Transaction Proposal là đúng ( sử dụng MSP để verify - xem lại bài trước ), và người gửi transaction - client A có quyền "write" trên channel. 
<br><br>
Các Endorsing Peers sẽ lấy đầu vào của Transaction Proposal làm đối số cho function trong chaincode mà được gọi đến. Chaincode sẽ được thực thi đối với bản sao Ledger lưu tại mỗi peer để tạo ra một Transaction Value bao gồm giá trị trả về sau khi thực thi, cặp key-value cho một đối tượng cần được tạo hoặc cập nhật. Tại thời điểm này, Ledger sẽ bị "đóng băng" lại. <br><br>
Transaction Value ở trên, cùng với chữ ký của Endorsing Peer đã tạo ra nó sẽ được gửi trở lại đến SDK dưới dạng một "proposal response"

![](https://images.viblo.asia/7c9aa90c-2383-4631-8607-7de46d1c1019.png)

#### 3. Đối chiếu các Proposal Response

Application sẽ kiểm tra chữ ký của các Endorsing Peers và so sánh các Proposal Response xem chúng có giống nhau không. Nếu đây chỉ là một hành động truy vấn thì Application sẽ không submit transaction đến ordering service. <br><br>
Nếu đây là một transaction cập nhật Ledger, Application sẽ kiểm tra xem Endorsement Policy đã chỉ định trước đó ( "AND ('Org1MSP.peer', 'Org2.peer')" ) có được thực hiện hay không trước khi submit lên Ordering Service (tức là cả peerA và peerB đều đã endorsing chưa ).<br><br>
Ngay cả khi Application "không kiểm tra Proposal Response" hoặc chuyển trực tiếp transaction chưa được chứng thực đến Ordering Service, thì Endorsement Policy vẫn sẽ được thực thi bởi các Peer và ở giai đoạn commit validation ( bước 5), do đó Endorsement Policy luôn được đảm bảo.

![](https://images.viblo.asia/9a23a785-f996-4eff-8f9d-f49e6fc839a6.png)

#### 4.Client sẽ tập hợp các endorsement vào trong một transaction

Application sẽ "broadcast" Transaction Proposal và Transaction Response trong  một "Transaction Message" đến Ordering Service. Transaction sẽ chứa cặp key-value cho đối tượng cần cập nhật, các chữ ký của các Endorsing Peer. Ordering Service sẽ không cần phải kiểm tra nội dung của transaction, nó chỉ cần nhận tất cả các transaction và sắp xếp nó theo thứ tự thời gian. 

![](https://images.viblo.asia/0f0540f3-4b74-4d35-846d-8205457be260.png)

#### 5. Transaction được validated

Các blocks chứa các transactions sẽ được chuyển đến tất cả các Peers trên Channel. Các transaction trong block sẽ được kiểm tra để đảm bảo rằng Endorsement Policy đã được thực hiện và Ledger được "đóng băng" trong lúc tạo cặp key-value. Từng transaction trong block sẽ được gắn tag là hợp lệ hoặc không hợp lệ. 

![](https://images.viblo.asia/0ca1e3f8-f8b3-45ba-a12b-31f86ea4fa83.png)

#### 6. Cập nhật Ledger

Mỗi peer sẽ nối thêm block vào chuỗi và với mỗi transaction hợp lệ, các cặp key-value sẽ được  thêm vào với Ledger. Một sự kiện được phát đi, để thông báo cho Client Application rằng transaction đã được thêm vào chuỗi, cũng như thông báo về việc transaction hợp lệ hay không hợp lệ.