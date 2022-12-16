Đây là một bài viết trong chuỗi bài tìm hiểu chuyên sâu về IPFS . Và đây sẽ là bài viết cung cấp cho các bạn kiến thức chung nhất về libp2p .

![](https://images.viblo.asia/6ca9a822-da89-4a1b-b35b-0ee815699ae0.png)

# Libp2p là gì ? ý nghĩa của nó
## Libp2p là gì ?
Chúng ta có thể tóm gọn định nghĩa chỉ bằng 1 câu . **Libp2p** là tập hợp các module về **protocols, specifications và libraries** cho phép phát triển các ứng dụng peer-to-peer.

## Peer-to-peer basics
Thực ra thì sẽ có cả tá kiến thức phía sau 1 câu định nghĩa bên trên . Hãy bắt đầu với các ứng dụng p2p bằng các khái niệm các bạn có thể đọc tại [đây](https://docs.libp2p.io/concepts/)

**P2P network** là một mạng trong đó những người tham gia (được gọi là các peers hoặc các nodes) giao tiếp trực tiếp với nhau. Điều này không đồng nghĩa là tất cả các peer đều phải giống hệt nhau, một số có thể có vai trò khác nhau trong mạng . Một trong những đặc điểm xác định của mạng p2p là chúng không yêu cầu một máy server như trong mô hình Client/Server

Do định nghĩa của mạng ngang hàng khá rộng, nên có khá nhiều loại hệ thống khác nhau được xây dựng. Các ví dụ nổi bật nhất về mạng chia sẻ file là BitTorrent và gần đây hơn là sự phổ biến của các mạng blockchain cũng giao tiếp theo kiểu P2P.

# Vậy libp2p giải quyết vấn đề gì ?
Mặc dù các mạng ngang hàng có nhiều lợi thế hơn so với mô hình client/server, nhưng cũng có những thách thức đặc biệt và nó đòi hỏi phải những giải pháp đặc biết và nhiều thời gian thực hành để vượt qua. Trong quá trình giải quyết những thách thức này và xây dựng IPFS, những contributer của IPFS đã xây dựng các giải pháp theo hướng mô đun hóa để có thể ghép lại được và nó thành **libp2p**. Mặc dù libp2p phát triển từ IPFS, nhưng nó không yêu cầu hoặc không phụ thuộc vào IPFS, nhiều dự án (bao gồm cả Libra của ZuckBucks) sử dụng libp2p làm network transport layer của họ. Trong bài viết mình sẽ cố gắng phác thảo ngắn gọn các vấn đề chính được libp2p giải quyết 

## Transport
Thực ra nền tảng của libP2P nhắm vào transport layer, chịu trách nhiệm truyền vào nhận dữ liệu giữa các peer trong mạng p2p. Libp2p cung cấp một interface đơn giản có thể điều chỉnh được để hỗ trợ các giao thức ở thiện tại và trong tương lai , cho phép các ứng dụng libp2p hoạt động trên nhiều môi trường bất kể thời gian .

## Identity
Trong một thế giới với hàng tỷ thiết bị được kế nối mạng ,vẫn một câu hỏi muôn thủa là làm sao bạn biết người bạn đang chat có đúng là người bạn biết không , hay là một ai khác đang giả dạng ? libp2p sử dụng **public key cryptography** làm cơ sở nhận dạng trong mạng ngang hàng phục vụ với hai mục đích .
* Đầu tiên , nó cung cấp cho mỗi peer một tên gọi duy nhất dưới dạng **PeerId** .
* Thứ hai là cho phép mọi người trong mạng giao tiếp an toàn với nhau . ( người A gửi một tin nhắn mã hóa bằng public key của người B vì thế chỉ người B mới có private key của mình để giải mã và đọc được tin nhắn đó )

## Security
Điều quan trọng là chúng ta có thể gửi và nhận data giữa các peer một cách an toàn. Có nghĩa là chúng ta có thể tin tưởng vào danh tính của peer mà chúng ta đang liên lạc mà không phải bên thứ ba nào đó có thể đọc được hay thay đổi chúng .

Libp2p cung cấp một kết nối nâng cao bằng cách truyền dữ liệu qua **encrypted channel** . Quá trình này linh hoạt và có thể hỗ trợ nhiều phương thức mã hóa truyền thống .Mặc định hiện tại là [secio](https://docs.libp2p.io/reference/glossary/#secio)

## Peer Routing
Khi bạn muốn gửi tin nhắn đến một người khác , bạn cần hai thông tin chính : **PeerId** của họ và ví trí của họ trên mạng để kết nối .

Có nhiều trường hợp chúng ta chỉ có PeerId của peer mà chúng ta muốn liên lạc và chúng ta cần một cách để tìm địa chỉ mạng của họ . **Peer routing** là quá trình khám phá các địa chỉ bằng cách vận dụng "kiến thức" của các peer khác.

Trong một hệ thống peer routing một peer có thể cung cấp cho chúng ta địa chỉ của peer chúng ta cần miễn là chúng có . Nếu không nó sẽ chuyển yêu cầu của chúng ta đến một peer khác mà nhiều khả năng sẽ có . Khi chúng ta giao tiếp với càng nhiều peer chúng ta không chỉ tăng cơ hội tìm thấy peer mà chúng ta đang tìm kiếm mà còn cập nhật được đầy đủ hơn về mạng , cho phép trả lời các truy vấn định tuyến của từ các peer khác . Ngoài ra libp2p sử dụng [Kademlia routing algorithm](https://en.wikipedia.org/wiki/Kademlia) 

## Content Discovery
Không giống như mô hình client server chúng ta chỉ cần query lên máy chủ rồi tìm dữ liệu là xong . Trên mạng p2p không có server nào để bạn search cả vì thế việc tìm khiếm sẽ trở nên vô cùng khó khăn . Chính vì thế Libp2p cung cấp [content routing interface](https://github.com/libp2p/js-libp2p-interfaces) để có thể giúp chúng ta tìm ,tải và verify tính toàn diện của dữ liệu mà chúng ta cần tìm . 

## Messaging / PubSub
Việc gửi các message từ peer này tới peer khác luôn là vấn đề quan trọng nhất đối với các hệ thống peer-to-peer và pub/sub là một pattern vô cùng quan trọng . Định nghĩa qua về pub/sub là một hệ thống mà trong đó các peer sẽ subscribe vào các chủ đề ( topic ) mà họ quan tâm đến và các peer gửi dữ liệu vào topic đó gọi là public

Trong một hệ thống peer-to-peer pub/sub có đôi chút khác biệt với các hệ thống pub/sub thông thường .Bao gồm
* **Reliability** (độ tin cậy ) : Tất cả các message phải được gửi đến tất cả các peer đã đăng ký chủ đề.
* **Speed** ( tốc độ ) :  Message phải được gửi một cách nhanh chóng
* **Efficiency** ( hiệu quả ) : Mạng sẽ ko tồn tại quá nhiều những bản copy của messages một cách thừa thãi 
* **Resilience** ( khả năng phục hồi ) : Các peer có thể tham gia hoặc thoát mạng mà không làm gián đoạn nó.
* **Scale** ( khả năng mở rộng ) : Các topic có thể có xử lý một lượng lớn người dùng đăng ký và xử lý một lượng lớn message
*  **Simplicity** ( sự đơn giản ) : Hệ thống này phải đủ đơn giản để có thể hiểu và thực hiện . Các peer cũng chỉ cần phải lưu ít giữ liệu

**libp2p** định nghĩa một [pubsub interface](https://github.com/libp2p/specs/tree/master/pubsub) để có thể gửi message đến tất cả các peer đã subscribe vào cùng một topic . Interface hiện tại có 2 triển khai . 
* `floodsub` sử dụng chiến lược `network flooding` là truyền lần lượt đến tất cả các peer, tuy nhiên giải pháp này không hiệu quả .
* `gossipsub` là giao thức hiện tại đang được libp2p sửa dụng . Đúng như cái tên gossip là đồn thổi, các peer đồn với nhau về message mà chúng thấy được với các peer khác . 

## Một số ảnh để tổng kết
### Libp2p đc coi là networking layer của IPFS
![](https://images.viblo.asia/822b3a6f-fe09-4e2c-8372-859fcd85208c.jpg)
### Một bộ sưu tập các giao thức p2p
![](https://images.viblo.asia/63cc3c3f-4b25-4781-a9ae-acf500f59cb0.jpg)
### IPFS được tạo thành từ các mô đun libp2p
![](https://images.viblo.asia/67a804e2-5057-487b-8ae1-380cfab3636a.jpg)
## Implementations
Hiện tại libp2p hỗ trợ các ngôn ngữ sau

* [go-libp2p](https://github.com/libp2p/go-libp2p) dành cho Go
* [js-libp2p](https://github.com/libp2p/js-libp2p) dành cho Javascript, gồm cả Node và trên cả Browser
* [rust-libp2p](https://github.com/libp2p/rust-libp2p) dành cho Rust

Ngoài ra còn một vài ngôn ngữ khác như java hay python cũng sắp đc hỗ trợ
### Giờ hãy thử chạy demo nào
Hãy cùng tham khảo qua demo tại : https://viblo.asia/p/demo-mot-vai-chuc-nang-voi-libp2p-Ljy5VyPMlra

# Reference
* https://docs.libp2p.io/
* https://medium.com/coinmonks/understanding-ipfs-in-depth-5-6-what-is-libp2p-f8bf7724d452