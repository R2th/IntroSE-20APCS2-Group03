![](https://images.viblo.asia/46572f18-032c-4d16-ab14-3c40a2b7a3c7.jpeg)

Phía trên đây là hình ảnh mô tả về lifecycle của một transaction trên mạng Ethereum blockchain. Thường ngày chúng ta chỉ thực hiện gửi giao dịch chứ thể nhìn thấy thực chất chúng được xử lý như thế nào đúng không? Bài viết hôm nay mình sẽ nói rõ hơn về các trạng thái mà một transaction sau khi được gửi lên mạng Ethereum sẽ được xử lý như thế nào trước khi được đưa vào chuỗi.

Thì bất kỳ khi nào transaction được gửi lên, mạng sẽ nhận nó và xử lý bằng cách chuyển transaction sang các trạng thái khác nhau. Điều này có thể hình dung các trạng thái này như những bậc thang, sau khi vượt qua hết các trạng thái chúng sẽ được chấp nhận và đưa vào chuỗi. Nhưng không phải lúc nào trạng thái của transaction cũng luôn được thay đổi để tiến về phía trước, đôi khi cũng có những trường hợp nó bị chuyển ngược về trạng thái trước đó, bị thay thế bằng transaction khác hoặc cũng có thể bị loại bỏ hoàn toàn.

Hiện nay các dapp tăng trải nghiệm cho người dùng bằng cách hiển thị các trạng thái của transaction giống y như việc realtime, giúp người dùng không cần phải refreshe lại trạng trong quá trình chờ đợi nó được xử lý. Nhưng họ thực chất chỉ đang sử dụng cách thủ công đó là sau một khoảng thời gian nhất định thì gửi request lên mạng để lấy trạng thái. Điều này khi thì gây khá tốn băng thông và đôi khi làm chậm ứng dụng. Trong bài viết dưới đây ngoài việc phân tích các trạng thái của transaction thì mình sẽ giới thiệu đến một giải pháp cho vấn đề tracking các trạng thái của transaction đó chính là **[Dfuse](https://www.dfuse.io/en)**.

# Lifecycle Của Transaction Ethereum

### Transaction States

Dưới đây sẽ là các trạng thái mà trasaction có thể xảy ra:

- **UNKNOWN** : Một transaction mới được gửi đến mạng, chưa được xem xét và xử lý sẽ ở trạng thái UNKNOWN
- **PENDING** : Một transaction ở trạng thái PENDING khi nó đang đợi để được miners chọn và xử lý. Chúng đang ở trong cái gọi là `mempool` , các miners thì thường chọn những transaction có gas price cao hơn trước, vì vậy những transactions có gas price thấp hơn có thể ở trạng thái PENDING trong một thời gian dài. Có nhiều trường hợp các transactions loại price gas thấp này không bao giờ được chọn, điều này dẫn đến kết quả là chúng bị mắc ở trạng thái PENDING vĩnh viễn.
- **IN_BLOCK**: Một transaction chuyển sang trạng thái IN_BLOCK khi được một miner nào đó lựa chọn và đưa vào block. Tuy nhiên ở trạng thái này transaction cũng có thể bị chuyển trở lại trạng thái PENDING nếu như khối chứa nó bị forked.
- **REPLACED**: Một transaction có thể chuyển sang trạng thái REPLACED từ trạng thái PENDING khi một trong các trường hợp sau xảy ra:
    + Trường hợp một là có 2 transaction với cùng một nguồn gửi và có cùng số nonce được đưa vào trạng thái PENDING nhưng sau đó có một transaction được đưa vào trạng thái IN_BLOCK trước thì khối còn lại sẽ được chuyển vào trạng thái REPLACED
    + Trường hợp hai cũng là 2 transaction cùng nguồn gửi và số nonce được đưa vào trạng thái PENDING nhưng có một transaction có gas price cao hơn 12%, thì transaction có gas price thấp hơn sẽ được đưa vào trạng thái REPLACED

Để dễ hình dung chúng ta sẽ cùng nhìn lại sơ đồ về về lifecycle của transaction:
![](https://images.viblo.asia/b9ba5f6b-dda4-4ba5-84f5-1d891011c4a5.jpeg)


### State Transitions

Phần trên chúng ta đã nói về các trạng thái của transaction thì để chuyển sang các trạng thái khác nhau chúng cần phải có các sự kiện, trong phần này chúng ta sẽ cùng nói về các sự kiện này:
- **POOLED**: Một transaction ở trạng thái **UNKNOWN** sẽ được được đưa vào pool(bể) chứa các transactions và đợi ở đó đến khi nào được miners chọn thì được gọi là **POOLED** và chuyển sang trạng thái **PENDING**. Nó thì cũng có thể là một transaction ở trạng thái **REPLACED** và được **POOLED** lại, nếu các điều kiện replaced của nó không còn đúng nữa (ví dụ: trong trường hợp hiếm hoi là có transaction trong trạng thái **IN_BLOCK** bị forked và trong trạng thái **REPLACED** lúc đó lại có một transaction cùng nguồn gửi lẫn số nonce và có gas price cao hơn vẫn đang bay nhảy ở đó. Thì nó sẽ được POOLED lại để để đưa vào trạng thái PENDING )
- **MINED**: mined là quá trình một transaction đã được xử lý bởi miner và đưa vào block. Sau khi đã được mined thì transaction sẽ được chuyển sang trạng thái **IN_BLOCK**. Do tính chất ngang hàng của mạng ethereum, thì một trạng transaction có thể chuyển trược tiếp từ trạng thái **UNKNOWN** sang trạng thái **IN_BLOCK** mà không cần qua trạng thái  **PENDING**. Và cũng tương tự thì cũng có trường hợp một transaction ở trạng thái **REPLACED** có thể được mined rồi chuyển sang trạng thái **IN_BLOCK** mà không cần thông qua trạng thái **PENDING**.
-  **REPLACED**: Một transaction chuyển từ trạng thái **PENDING** sang trạng thái **REPLACED** nhờ sự kiện replaced. Còn trạng thái **REPLACED** thì chúng ta đã đề cập đến 2 trường hợp ở trên
-  **FORKED**: Một transaction bị forked khi transaction đó đã được mined sang trạng thái **IN_BLOCK** và được đưa vào block, nhưng block này sau đó bị mạng reversed thì các transaction trong block đó sẽ bị đưa về trạng thái **PENDING** quá trình này được gọi là forked.
-  **CONFIRMED**: Một transaction ở trạng thái **IN_BLOCK** được confirmed mỗi khi một block tiếp theo được mined.

Như chúng ta có thể thấy thì vòng đời của một transaction Ethereum thì khá là phực tạp, điều này có thể gây khó khăn cho những dapp muốn tracking trạng thái transaction và chuyển tiếp cho người dùng.

# Giao diện hướng sự kiện
Cách làm của nhiều trang và dapp thường làm để tracking transaction rồi hiển thị cho người dùng. Đó là chạy ngầm sau bao nhiêu giây sẽ gọi lên node Ethereum để lấy về trạng thái của transaction rồi hiển thị lên, khiến người dùng vẫn nghĩ đó là realtime. Nhưng thực chất các node Ethereum tiêu chuẩn thì lại không được thiết kết để chuyên cung cấp cho streaming realtime dữ liệu của transaction. Và ở đây chúng ta có đề cập đến khái niệm giao diện hướng sự kiện, thì đó là những giao diện sẽ nhận những cập nhật được đẩy về từ mạng blockchain và hiển thị chúng cho người dùng theo realtime giúp tăng trải nghiệm người dùng. Còn vô tình những cách thủ công như phần trên chúng ta đề cập lại đang đi ngược lại khái niệm giao diện hướng sự kiện và đôi khi nó còn làm giảm trải nghiệm người dùng vì sẽ gây tắc nghẽn băng thông trong trường hợp nhiều người sử dụng.

Giải pháp được đề cập đến ở đấy chính là sử dụng khả năng PUB/SUB của  Ethereum’s JSON-RPC interface. PUB/SUB interface thì cho phép các dapp có thể subscribe để nhận về thông báo của một vài sự kiện sau: 
- **newHeads**: mỗi khi có một block header mới được thêm vào chuỗi
- **logs**: các logs này sẽ bao gồm thông tin về các block mới được thêm vào và các thông tin phù hợp với bộ lọc đã định sẵn trước đó
- **newPendingTransactions**: giá trị hash của tất cả các transactions đã được add vào trạng thái pending và được đã signed bằng key có sẵn trong node(điều này thì hiếm khi xảy ra ở những node public)
- **syncing**: sự kiện này cho biết khi nào node bắt đầu hoặc dừng đồng bộ hóa dữ liệu

Để có thể xem chi tiết có thể đọc [tại đây](https://github.com/ethereum/go-ethereum/wiki/RPC-PUB-SUB). Những sự kiện này sẽ cho phép dapp có thể theo dõi một transaction thông qua lifecycle một cách nhẹ nhàng hơn.

# Dễ dàng tracking trạng thái của transaction với dfuse
[Dfuse Platform](https://www.dfuse.io/en) là một nền tảng chuyên cung cấp các dịch vụ streaming interface hỗ trợ theo dõi chi tiết về lifecycle của transaction Ethereum theo realtime. [Dfuse Ethereum State Tracker API](https://docs.dfuse.io/guides/ethereum/concepts/trx_lifecycle/) sẽ cho phép các developers có thể gửi transaction lên mạnng rồi sau đó nó sẽ theo dõi các trạng thái của transaction này và gửi lại ngay lập tức khi có một thay đổi nào đó về trạng thái. Tất cả điều này đều được thực hiện trên cùng một kênh và trong suốt lifecycle của transaction.

Với việc sử dụng GraphQL ta có thể subcribe chỉ định một transaction để theo dõi và xác định luôn những dữ liệu nào mà ta muốn nhận về khi có một sự thay đổi về trạng thái của transaction đó. Nền tảng dfuse này thì sẽ giúp quản lý công việc tracking transacion phức tạp trước kia nay trở lên dễ dàng hơn, bằng cách khi transaction có bất cứ thay đổi trạng thái nào thì nó sẽ ngay lập tức gửi về cho dapp để hiển thị cho người dùng điều này mới thực sự đúng với khái niệm giao diện hướng sự kiện.

Dưới đây chúng ta sẽ có một hình ảnh để mô tả rõ hơn về sự phức tạp của các quá trình chuyển đổi trạng thái. Như ví dụ về transaction này thì nó phải trải qua đến 8 lần chuyển trạng thái mới đến đế được confirmed.


![](https://images.viblo.asia/b70003f8-e8cc-429c-afc1-013c4a456c62.gif)

Nếu như trước kia chúng ta sẽ cần xây một dapp với việc chạy nền để liên tục gọi lên node mạng nhằm lấy về những thông tin mới nhất. Thì bây giờ với việc sử dụng dfuse chúng ta chỉ cần lắng nghe những updates mới từ stream data mà ta đã kết nối, phần việc còn lại đã được dfuse lo nó sẽ tracking và gửi về cho đến khi transaction được confirmed.

# Kết luận

Và như vậy chúng ta đã có cái nhìn chi tiết hơn về những trạng thái mà một transaction sẽ trải qua trong một lifecycle. Cùng với đó là định nghĩa về một giao diện hướng sự kiện và giải pháp đó chính là dfuse. Bài này mình chỉ giới thiệu về thằng dfuse này còn mình sẽ viết thêm một bài nữa về cách sử dụng thằng này. Cảm ơn các bạn đã chú ý đón đọc, rất vui và hẹn gặp lại trong các bài viết tiếp theo

<br>
<br>


##### Nguồn : https://www.dfuse.io/en/blog/the-8-things-that-can-happen-to-your-ethereum-transaction-and-how-to-navigate-them-in-your-dapp