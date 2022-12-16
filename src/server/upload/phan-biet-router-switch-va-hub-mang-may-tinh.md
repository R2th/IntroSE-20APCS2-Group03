# Mục tiêu
Dạo qua một vòng trên Google và qua những câu hỏi mình hay bị mọi người xung quanh "vấn đáp nhanh", ngày hôm nay mình muốn viết blog này để có thể phần nào làm rõ một chút cho các bạn về 3 thiết bị này. Do hiện nay, với công nghệ sản xuất hiện đại và nhu cầu cần mọi thứ đơn giản, đa nhiệm, các bạn có thể dễ thấy nhiều nhà sản xuất đã tích hợp 2 hay 3 thiết bị trên vào trong 1 sản phẩm. Điều này dẫn đến việc có thể chúng ta đang bị nhầm lẫn về chức năng, vai trò và nhiệm vụ của chúng! Vậy hãy cùng thử xem, 3 thiết bị trên thực sự khác nhau như thế nào!

## Định nghĩa
**1.  Router**

> Router (Bộ định tuyến)  là thiết bị mạng máy tính dùng để chuyển các gói dữ liệu qua một liên mạng và đến các đầu cuối, thông qua một tiến trình gọi là "định tuyến". Nó hoạt động ở tầng thứ 3 (Tầng giao vận) theo mô hình OSI.


![](https://images.viblo.asia/d7653b6c-4445-49f5-abe2-c23dd2649759.jpg)

Router có vai trò kết nối 2 mạng trở lên với nhau (Thông thường là 2 mạng LANs hay WANs hoặc kết nối 1 mạng LANs với mạng ISP của nó). Router có chức năng gửi các gói dữ liệu mạng giữa 2 hoặc nhiều mạng, từ một tới nhiều điểm đích đến cuối cùng từ router. Chính vì vậy, vị trí của nó trong một mạng Internet là ở nơi có 2 mạng kết nối với nhau trở lên.

Về cấu tạo, router thường bao gồm 1 hoặc nhiều cổng LAN và có thể bao gồm ăng-ten phát tín hiệu wifi. Thông thường, chúng ta sẽ sử dụng router để kết nối máy tính của mình với mạng internet (sử dụng dây mạng từ cổng LAN) hoặc sử dụng các thiết bị của mình bắt tín hiệu wifi do router phát ra.

Router sử dụng phần headers trong các gói tin để có thể xác định đường đi nhanh nhất cho các packet (đơn vị đo dữ liệu ở tầng mạng - Network Layer) từ host này đến với các host khác.

**2. Switch**

> Switch (thiết bị chuyển mạch) là một thiết bị dùng để kết nối các đoạn mạng với nhau theo mô hình mạng hình sao (star). Theo mô hình này, switch đóng vai trò là thiết bị trung tâm, tất cả các máy tính đều được nối về đây. Trong mô hình tham chiếu OSI, switch hoạt động ở tầng liên kết dữ liệu, ngoài ra có một số loại switch cao cấp hoạt động ở tầng mạng.
> 
![](https://images.viblo.asia/94ad0c1e-fbe1-469f-9f6e-115bfb120aa8.jpg)

Nói qua một chút về mạng thiết kế theo hình sao. Hiện nay đây là kiểu thiết kế mạng được sử dụng phổ biến. Phạm vi ứng dụng của mạng LAN thường được sử dụng để kết nối các máy tính trong gia đình, trong một phòng Game, phòng NET, trong một toà nhà của Cơ quan, Trường học.- Cự ly của mạng LAN giới hạn trong phạm vi có bán kính khoảng 100m, các máy tính có cự ly xa hơn thông thường người ta sử dụng mạng Internet để trao đổi thông tin. Mạng có các ưu điểm như tốc độ cao, một máy hỏng không gây ảnh hưởng đến kết nối mạng của các máy còn lại.

Switch quyết định chuyển frame dựa trên địa chỉ MAC, do đó nó được xếp vào thiết bị Lớp 2. Chính nhờ Switch có khả năng lựa chọn đường dẫn để quyết định chuyển frame nên mạng LAN có thể hoạt động hiệu quả hơn.

Switch nhận biết máy nào kết nối với cổng của nó bằng cách học địa chỉ MAC nguồn trong frame mà nó nhận được. Khi hai máy thực hiện liên lạc với nhau.
Switch chỉ thiết lập một mạch ảo giữa hai cổng tương ứng mà không làm ảnh hưởng đến lưu thông trên các cổng khác. Do đó, mạng LAN có hiệu suất hoạt động cao thường sử dụng chuyển mạch toàn bộ.

Switch tập trung các kết nối và quyết định chọn đường dẫn để truyền dữ liệu hiệu quả. Frame được chuyển mạch từ cổng nhận vào đến cổng phát ra. Mỗi cổng là một kết nối cung cấp chọn băng thông cho host.

Trong Ethernet Hub, tất cả các cổng kết nối vào một mạng chính, hay nói cách khác, tất cả các thiết bị kết nối Hub sẽ cùng chia sẻ băng thông mạng. Nếu có hai máy trạm được thiết lập phiên kết nối thì chúng sẽ sử dụng một lượng băng thông đáng kể và hoạt động của các thiết bị còn lại kết nối vào Hub sẽ bị giảm xuống.

Để giải quyết tình trạng trên, Switch xử lý mỗi cổng là một đoạn mạng (segment) riêng biệt. Khi các máy ở các cổng khác nhau cần liên lạc với nhau, Switch sẽ chuyển frame từ cổng này sang cổng kia và đảm bảo cung cấp chọn băng thông cho mỗi phiên kết nối.

**3. Hub**
> Hub là một điểm kết nối trung tâm cho tất cả các thiết bị khác trong mạng kết nối đến (Giống switch). Hub kết nối các segments của một mạng LAN

Một hub nối nhiều máy tính (hoặc thiết bị mạng khác) với nhau để tạo thành một mạng phân khúc duy nhất trong trung tâm hệ thống. 

Trên đoạn mạng này, tất cả các máy tính có thể giao tiếp trực tiếp với nhau. Ethernet hub là các loại phổ biến nhất, các trung tâm với nhiều loại khác của mạng cùng tồn tại.

Một trung tâm bao gồm một loạt các cổng chấp nhận mỗi một cáp mạng. mạng Hub nhỏ thường chứa bốn cổng kết nối. Chúng chứa 4 hoặc đôi khi 5 cổng, và một cổng được dành cho "uplink" kết nối tới một hub hoặc thiết bị tương tự. Trung tâm lớn hơn chứa 8, 12, 16, và thậm chí cả 24 cổng..

Hubs phân loại là 1 Layer  thiết bị trong mô hình OSI. Tại lớp vật lý, trung tâm có thể hỗ trợ rất ít trong mạng. Hubs không đọc bất kỳ dữ liệu đi qua chúng và không nhận thức được nguồn hoặc đích của họ. Về cơ bản, một trung tâm chỉ đơn giản là nhận và gửi đến các gói tin, có thể khuếch đại các tín hiệu điện và phát sóng các gói tin này tới tất cả các thiết bị khác trên mạng .

## Sự khác biệt giữa Router, Switch, Hub
**ROUTER là một thiết bị hoàn toàn khác so với 2 thiết bị còn lại**

Như đã nói khá chi tiết ở trên, vai trò của Router ở trong một mạng máy tính là việc định tuyến các packets (Chứa cả dữ liệu lẫn địa chỉ đích đến) từ điểm đầu đến điểm đích mong muốn trong mạng máy tính. Trong khi đó, Hub và Switch có vai trò liên quan đến việc truyền các frame (đơn vị của tầng liên kết dữ liệu)


**Vai trò của Hub và Switch là như nhau**

Khẳng định này đã được tôi nhắc đến khi nói về định nghĩa của 2 loại thiết bị này. Cả 2 đều là trung tâm để kết nối đến của các thiết bị trong một mạng máy tính và đều xử lý một loại dữ liệu là frame. Khi chúng nhận được 1 frame, chúng sẽ khuyếch đại frame đó và rồi chuyển nó tới thiết bị đích.

Điểm khác biệt lớn nhất giữa 2 thiết bị này là về phương thức chúng chuyển frame sau khi nhận được từ máy nguồn tới máy đích.

Đối với Hub, một frame nhận được sẽ được gửi tới toàn bộ các cổng có kết nối vào Hub dù cho frame đó chúng ta chỉ muốn nó được chuyển tới 1 thiết bị/ cổng nhất định nào đó. (hay đơn giản hơn là chuyển frame đó tới mạng quảng bá - broadcast). Việc này hoạt động trên nguyên tắc "thà truyền nhầm còn hơn bỏ sót :))" - tất cả các cổng đều nhận được frame đó vậy nên chắc chắn đích đến mong muốn cũng sẽ nhận được! Cơ chế này đòi hỏi rất nhiều tài nguyên mạng và có thể dẫn tới nghẽn!

Switch xử lý việc này theo một cách thông minh hơn! Chúng ghi lại địa chỉ MAC của tất cả các thiết bị kết nối với chúng! Với thông tin có được này, switch có thể xác định chính xác cổng nào đang được kết nối với thiết bị nào. Vì thế khi nhận được một frame, nó gửi chính xác frame tới cổng đó mà không cần phải gửi cho tất cả các cổng còn lại! Điều này hoàn toàn tối ưu so với Hub và đó là lý do Switch là thiết bị được sử dụng nhiều hơn!

## Kết luận
Nói từ nãy cũng không phải quá chi tiết, tuy nhiên có một số điểm mình muốn tổng kết lại qua bài viết này

1. Router là thiết bị định tuyến. Có tác dụng là kết nối 2 mạng máy tính trở lên với nhau (hoặc 1 thiết bị và 1 mạng máy tính)
2. Switch và Hub là 2 thiết bị có vai trò tương đương giúp kết nối nhiều máy tính với 1 mạng máy tính và chúng đóng vai trò trung tâm. Tuy nhiên 2 thiết bị này khác nhau ở phương thức truyền tin. Hub sử dụng cách truyền quảng bá còn Switch sẽ truyền trực tiếp tới cổng kết nối với thiết bị nhận thông qua dữ liệu địa chỉ MAC mà nó lưu lại.

Mong rằng qua bài này, có thể giúp các bạn phần nào phân biệt rõ ràng được về chức năng của 3 thiết bị mạng vô cùng phổ biến hiện nay!