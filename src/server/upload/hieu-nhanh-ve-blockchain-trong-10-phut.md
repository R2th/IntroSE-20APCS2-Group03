## Lời người dịch
Bài viết được dịch từ các ý chính của bài viết gốc tiếng Nhật.

http://www.mermirai.com/entry/0409_blockchain

Bài viết mang tính chất dẫn dắt người đọc từ con số không vào thế giới Blockchain một cách đơn giản. Muốn có những hiểu biết sâu sắc về Blockchain bạn cần tìm hiểu thêm nhiều nguồn tài liệu khác. Bản dịch tôn trọng bài viết gốc, tuy nhiên có một số ví dụ được người dịch thay đổi cho phù hợp với người Việt :)

![](https://images.viblo.asia/96602d05-bf5b-468f-9c91-dbb7448bda6d.png)

## Lời nói đầu
Trong bài viết này tôi hi vọng truyền tải được đến các bạn một cách khái quát nhất về chủ đề **“Blockchain tuyệt vời như thế nào?”**. Cụ thể hơn, tôi sẽ giải thích dựa trên luận điểm **“5 điều sẽ phát triển mạnh sẽ cùng với sự phổ biến của Blockchain từ nay về sau”.**

Năm điều đó là
* Các dịch vụ phi tập trung
* Gửi và lưu trữ giá trị
* Quản lý quyền sở hữu
* Sự gia tăng của dữ liệu công khai và đáng tin cậy
* Giao dịch “trustless”
## Dịch vụ phi tập trung (decentralized)

Khi Blockchain trở nên phổ biến, điều đầu tiên phải nói đến đó là việc các ứng dụng phi tập trung sẽ ngày càng tăng. Tại sao lại như vậy? Trước tiên chúng ta cần hiểu Blockchain là gì?

![](https://images.viblo.asia/8bb12dfb-16a3-46eb-9a9f-e6f4a8ad3bfe.png)

Từ trước đến nay, khi chúng ta mua hay mượn một đồ vật gì đó, luôn luôn có một ai đó ở giữa kiểm soát dữ liệu của chúng ta. Đó có thể là chính phủ, là ngân hang hay các nhà quản lý như phần bên trái hình bên trên.

Tuy nhiên, với Blockchain trong một số trường hợp, giao dịch vẫn có thể được diễn ra mà không có một bên trung gian nào (như phần bên phải của hình phía trên). Đây là giải thích cơ bản nhất cho khái niệm decentralized - phi tập trung.

Vậy thì tại sao có Blockchain thì lại có thể hiện thực hoá được việc này? Đó là vì chúng ta có thể khẳng định những dữ liệu được trao đổi thông qua Blockchain là đúng.

Thực ra thì từ trước đến giờ chúng ta vẫn có những “dữ liệu đúng”. Tuy nhiên thường có những mối e ngại về việc chúng bị làm giả hay bị ghi đè lên. Blockchain có những cơ chế để không chấp nhận những dạng dữ liệu không chính xác như vậy.

Giả sử bạn ra chợ trời và thấy người ta rao bán một cái iphone X giá rẻ. Vậy bạn có mua nó không? Chắc hẳn là phần đông sẽ chọn không mua đúng không. Vì các bạn nghĩ là ở chợ trời thì làm gì có iphone X hàng thật. Khi mua iphone X, dù phải trả thêm một phần chi phí đáng kể, phần đông chúng ta vẫn chọn những cửa hàng uy tín để mua.

Tuy nhiên, nếu cái iphone X đó bằng một cách nào đó được xác nhận là hàng thật, thì với cái giá rẻ hơn đến 30% so với cửa hàng chính hãng, hẳn là bạn sẽ nghĩ tới việc mua nó.

Việc hiện thực hoá một hệ thống Blockchain đại khái nó cũng sẽ như vậy. Từ trước đến nay, các dữ liệu đều ở dạng “đáng nghi” như kiểu "chiếc iphone X được rao bán ở chợ trời là giả". Do đó cần có một bên thứ ba đứng ở giữa nhận trách nhiệm đảm bảo tính đúng đắn của dữ liệu đó. Blockchain với những cơ chế xác nhận tính đúng đắn của dữ liệu, có thể loại bỏ sự cần thiết của bên những thứ ba này. Qua đó hiện thực hoá sự phi tập trung (decentralized).

![](https://images.viblo.asia/308a63af-16b0-4257-b0e3-cc02ff752ceb.png)

*(Giải thích ảnh: Người A thực hiện giao dịch chuyển bitcoin cho người B với các thông tin như số tiền, thời gian, địa chỉ người nhận)*

Vậy Blockchain làm điều đó như thế nào?
Tôi sẽ giải thích thông qua một ví dụ, hệ thống Bitcoin.
Hình ảnh phía trên là một ví dụ về một giao dịch trong Bitcoin. Trong đó có ghi chép đầy đủ các thông tin như là số tiền hay là thời gian giao dịch. Những dữ liệu này được lưu vào một “sổ cái” duy nhất trên toàn thế giới.

![](https://images.viblo.asia/f0f3a100-e2a9-4941-b302-a802b721ec4f.png)

Những thông tin về lịch sử giao dịch được lưu vào trong các khối (block) như hình trên và được nối liền với nhau thành một chuỗi (chain) nên chúng ta có khái niệm Chuỗi khối hay là Blockchain.

Tuy nhiên nếu chỉ đơn giản như thế thì rõ ràng là dữ liệu hoàn toàn có thể bị làm giả.

![](https://images.viblo.asia/4a7f34c5-002f-4ea8-a2a4-b393664b8875.png)

Blockchain có một giải pháp, nếu không tìm ra một con số ma thuật tên là số Nonce thì sẽ không thể nào ghi dữ liệu vào sổ cái được. Một máy tính “thông minh” với tốc độ xử lý cao cũng phải mất tầm 10 phút để tìm ra con số này.

Do việc tìm ra con số Nonce này có thể nhận thù lao từ Blockchain, do đó rất nhiều người trên thế giới tham gia vào qua trình tìm kiếm này. Quá trình này được gọi tên là mining và người tham gia được gọi là miner. Theo tôi biết thì hiện tại chúng ta đang có hàng triệu miner trên toàn thế giới.

Mọi thứ diễn ra theo trình tự như hình trên. Khi có một giao dịch nào đó được tạo ra, yêu cầu ghi giao dịch đó vào sổ cái sẽ bắt đầu. Chỉ khi thông tin giao dịch được ghi vào sổ cái thì lúc đó nó mới chính thực được xác nhận và thực thi.

Lúc này trên toàn thế giới các miner bắt đầu nhảy vào tìm số Nonce để xác thực và lưu dữ liệu trên vào sổ cái. Và sau khi một miner tìm ra số này, thì các miner khác sẽ kiểm chứng xem con số đó có đúng hay không.

Chỉ trong trường hợp con số đó đúng thì dữ liệu về giao dịch mới được ghi vào trong sổ cái.

![](https://images.viblo.asia/5799556c-0838-4358-ae98-b7c8739dccf2.png)

Theo cách làm trên, nếu một người xấu muốn đưa một dữ liệu sai vào sổ cái thì phải lừa được vài triệu người. Thực hiện việc này là không thể. Với cơ chế này mà những dữ liệu được ghi vào trong Blockchain luôn được đảm bảo là đúng!

*※ Trên đây là ví dụ về Bitcoin, ngoài gia chúng ta cũng có những hệ thống đồng thuận tương tự khác đảm bảo được tính đúng đắn của dữ liệu.*

Vậy thì cụ thể hơn, một giao dịch trong một hệ thống phi tập trung là gì, và những điều gì có thể được hiện thực hoá trong cuộc sống?

![](https://images.viblo.asia/34269fc4-45bb-447e-b59f-bca40e61dd62.png)

Hãy cũng lấy ví dụ về mô hình chia sẻ ô tô - Car share ở Nhật Bản.

Từ trước đến này có một vài dịch vụ như vậy, nhưng luôn có công ty đứng ở giữa để vận hành quản lý xe và các thông tin liên quan.

Tuy nhiên, nếu dùng Blockchain, chúng ta có thể xây dựng được một hệ thống Car share cho một vùng nào đó mà không cần đến bên thứ ba.

Ví dụ chúng ta sẽ có một dịch vụ mà những người sử dụng sẽ cùng mua token và thống nhất với nhau về việc sử dụng token đó để mua và sử dụng xe. Tuy trước giờ cũng có những dịch vụ kiểu này rồi, nhưng Blockchain có những điểm mạnh giúp xây dựng hệ sinh thái bao gồm các thành phần như quản lý token hay các chức năng tín dụng.

Trong phần tiếp theo tôi sẽ đưa ra 4 đặc trưng trong các mô hình phi tập trung sử dụng Blockchain.

## Gửi và lưu trữ giá trị
Đầu tiên đó là việc gửi và lưu trữ giá trị.
Với bitcoin chúng ta chỉ có giới hạn 21 triệu đồng.

![](https://images.viblo.asia/52b34de7-d110-4f14-95f3-f5f439443437.png)

Nếu thêm "tính quý hiếm" vào trong hệ thống Blockchain đã có sẵn độ tin tưởng về dữ liệu cao thì chúng ta có thể vận dụng dễ dàng vào trong việc trao đổi các giá trị, cũng giống như con người từ ngày xưa dùng vỏ sò hay vàng vậy (khó làm giả và hiếm).

Tuy nhiên, nếu chả có ai dùng đến thì việc đó cũng không có ý nghĩa gì cả đúng không? Vậy tại sao bitcoin lại được nhiều người sử dụng đến vậy?

Khi bitcoin ra đời, có nhiều người đã để ý đến giá trị tiềm ẩn của nó. Đó là những người chú trọng vào cá nhân hay những tổ chức nhỏ, nói cách khác là những người theo chủ nghĩa tự do cá nhân (libertarianism).

Trước nay tiền tệ luôn được các nhà nước quản lý, nhưng với bitcoin thì khác, nó tồn tại vượt trên cả khái niệm quốc gia. Vì vậy nhóm người trên chú ý đến bitcoin như là một cách thức sử dụng tiền tệ mà không bị sự quản lý của chính phủ.

Càng ngày số người dùng bitcoin càng tăng lên, số lượng mua để đầu cơ cũng ngày một nhiều dẫn đến việc bitcoin phổ biến như ngày nay.

Nói cách khác, với khía cạnh liên quan đến tiền tệ của mình, Blockchain có thể biến internet từ một nơi chủ yêu dùng để trao đổi thông tin trở thành một nơi chúng ta có thể trao đổi các giá trị (tiền tệ) với nhau.

Tuy nhiên, Blockchain không chỉ đơn giản là có thể gửi giá trị, điểm nhấn ở đây là gửi giá trị một cách vô cùng đơn giản.

![](https://images.viblo.asia/f43486a2-1363-455c-9c14-e7729d521bf7.png)

Trước giờ chúng cũng có nhiều cách để gửi tiền, tuy nhiên chúng lại khá mất công mất sức.

Ví dụ gửi tiền nước ngoài, ngoài việc bạn phải có ký kết hợp đồng, có tài khoản ở nước ngoài thì bạn còn mất phí rất cao và thời gian chuyển cũng rất lâu. Đầu tư nước ngoài cũng vậy, rất là phiền hà.

Tuy nhiên với Blockchain thì gửi tiền ra nước ngoài hay đầu tư (mua token) trở thành việc có thể thực hiện trong một click chuột.

Việc tốn của chúng ta 2 ngày giờ chỉ còn 5 giây, một sự cải thiện tốc độ vài chục nghìn lần.

Nó cũng như so sánh tốc độ của một con rùa với tốc độ của một phi thuyền của Nasa vậy.

![](https://images.viblo.asia/be22f39b-3010-470a-bcd1-8529c6619c5d.png)

Phải nói thêm, những giá trị này luôn luôn không thể tách rời khỏi hệ thống blockchain.

Như ban nãy tôi đã nói, dữ liệu trong blockchain được xác thực trong quá trình mining.

Các miner có phần thưởng nên mới tham gia, nếu không còn phần thưởng nữa thì cũng không còn miner nữa.
 
Không có miner thì sẽ không có transaction, và Blockchain sẽ ngừng hoạt động. 

Tóm lại, việc tạo cơ chế trả công/thưởng là một việc vô cùng quan trọng trong các hệ sinh thái Blockchain.

## Quản lý quyền sở hữu
Tiếp theo tôi sẽ nói về quản lý quyền sở hữu.

Dữ liệu được lưu trữ trong Blockchain luôn là dữ liệu chính xác. Ngoài các vấn đề liên quan đến tiền tệ như bên trên ra, điều này còn có thể được ứng dụng được ở rất nhiều các mặt khác nhau nữa.

Ví dụ như việc sở hữu đất đai. Việc đánh giá sai sở hữu đất đai sẽ làm ảnh hưởng trực tiếp đến tài sản của những người có liên quan. Ngoài ra, việc quản lý nguồn gốc của thực phẩm cũng rất quan trọng. Việc rau quả có xuất xứ từ đâu nếu không được đánh giá chính xác cũng sẽ dẫn đến những vấn đề nghiêm trọng về mặt an toàn thực phẩm hay sức khoẻ.

Ngoài ra, việc quản lý các bằng sáng chế hay các nội dung số cũng vậy. Ví dụ, trong quản lý bằng sáng chế, việc xác định xem bên nào nộp trước rất quan trọng, do đó người ta đang nghiên cứu ứng dụng Blockchain để quản lý những điều này một cách an toàn chính xác, không có sai sót.

Những ví dụ trên minh chứng cho sự ứng dụng tính “dữ liệu đúng” của Blockchain trong việc quản lý các loại dữ liệu khác nhau.

Tôi sẽ giải thích một chút về vấn đề liên quan đến nội dung số.

Trước giờ người ta vẫn nghĩ những dữ liệu trên Internet là những thứ có thể sao chép dễ dàng. Thật vậy, copy paste là xong mà!

Tuy nhiên nếu sử dụng Blockchain, chúng ta có thể biến mỗi nội dung là duy nhất thông qua việc gán với một chủ sở hữu duy nhất. Việc copy một nội dung có thể vẫn thực hiện nhưng dữ liệu được sinh ra sẽ không có ý nghĩa gì do không có chủ sở hữu.

![](https://images.viblo.asia/53056ed0-3b29-41a3-a7d8-ae23d393fd5a.png)

Tại một trò chơi nuôi mèo ảo trên Blockchain có tên là CryptoKitties, con mèo đắt nhất (thực ra chỉ là một cái ảnh con mèo như hình trên) đã được bán với giá 110000$, chỉ vì tính duy nhất trên thế giới của nó. (Thực ra cũng do người mua quá... thừa tiền)

Trong khi đó một con mèo thật ở Nhật đắt lắm cũng chỉ tầm vài chục nghìn $…

![](https://images.viblo.asia/3c9ac9e0-e4ff-4a79-8ff7-444981787731.png)

Hiện nay liên hợp quốc có vẻ cũng đang xem xét việc dùng Blockchain để quản lý ID cá nhân.

Người Nhật chẳng hạn ở trong nước thì dùng thẻ công dân của mình nhưng ra nước ngoài thì thứ giấy tờ có giá trị duy nhất là hộ chiếu. Cũng có rất nhiều người trên thế giới này cũng chưa có cả hộ chiếu.

Ngoài ra, hộ chiếu từ trước đến giờ không thể đưa các thông tin như lý lịch học tập, làm việc vào được. Nếu dùng Blockchain thì các vấn đề trên đều được giải quyết. Ngay cả những người tị nạn cũng có thể có ID cho mình trên Blockchain.

Vấn đề mấu chốt ở đây là với Blockchain thì dữ liệu không nằm ở bất cứ một quốc gia nào cả. Từ trước đến nay các quốc gia nắm giữ các dữ liệu của mình trên các server riêng. Với Blockchain thì việc lưu trữ dữ liệu là hoàn toàn phân tán, vượt ra khỏi lãnh thổ quốc gia. Hay nói cách khác là thuộc quyền quản lý của cá nhân.

Những hệ thống như hệ thống quản lý ID cá nhân giống như trên, vượt ra khỏi sự phụ thuộc vào nhà nước hẳn là một trong những đặc trưng và điểm thu hút của Blockchain.

## Sự gia tăng của dữ liệu công khai và đáng tin cậy

![](https://images.viblo.asia/1508faba-ec7a-429c-aae4-6e0e12c321ed.png)

Từ trước đến này dữ liệu của các hệ thống quản lý tập trung (centralized) luôn được nắm giữ bởi nhà cung cấp dịch vụ. Ví dụ các thông tin mua bán sản phầm trên các trang EC (các trang thương mại điện tử) thì được nắm giữ bởi nhà quản lý dịch vụ đó.

Tuy nhiên trong hệ thống quản lý phi tập trung thì dữ liệu này lại thuộc về cá nhân. (Có những trường hợp dùng private chain thì có dữ liệu có thể thuộc một nhóm cá nhân nào đó)

Nếu nghĩ theo cách đó thì những dữ liệu trên Blockchain không hề có nhà quản lý, hay nói cách khác đây là những dữ liệu mở.

Có nghĩa là, những dữ liệu đóng trước có thể đều sẽ được công khai ra ngoài. Khi đó ai cũng có thể xem các thông tin mua bán, các thông tin về lý lịch làm việc, thông tin về vị trí hay ngay cả lịch sử trình duyệt của một người nào đó.

Những thông tin đó vẫn tồn tại từ lâu, nhưng chúng thuộc quyền sở hữu của các doanh nghiệp, và chúng đều là những thông tin có thể chỉnh sửa. Với việc trở thành những dữ liệu đáng tin cậy và không thể thay đổi, chúng sẽ trở nên vô cùng giá trị.

*※ Việc mở những thông tin kiểu này ở một khía cạnh khác chắc chắn sẽ gây ra những vấn đề của riêng nó.*

Ví dụ như những dịch vụ mua bán C2C, khi bạn mua một món đồ có 0 lượt đánh giá thì chắc chắn sẽ có lo lắng, kiểu như người bán là một kẻ lừa đảo chẳng hạn.

Tuy nhiên, nếu dữ liệu ở một trang tương tự khác, nơi người bán đó có hơn 100 lượt đánh giá tốt, được công khai thì chúng ta có thể yên tâm mua hàng hơn.

Một ví dụ khác, hoạt động mai mối hôn nhân hiện tại mới chỉ dừng lại ở mức dựa vào các thông tin như thu nhập hay quá trình học tập công tác, sau này các thông tin khác như tình trạng sức khoẻ, khả năng thể thao cũng được quản lý trên blockchain, hoạt động mai mối hoàn toàn có thể sử dụng chúng làm các thông tin tham khảo. Tất nhiên, đây có thực sư là điều tốt hay không chúng ta không bàn ở đây!

Vĩ mô hơn, có những nước đang tiến hành đưa các thông tin như y tế, giáo dục hay giao thông lên Blockchain. Nếu thành công trong việc này, hẳn chúng ta sẽ có những bước tiến lớn trong các hoạt động xã hội.

## Giao dịch “trustless”

Trên Blockchain, chúng ta có thể quản lý các dữ liệu chính xác và đáng tin cậy. Hơn thế nữa, chúng ta còn một khái niệm Smart Contract, nơi mà các luật lệ hay quy tắc chuẩn được xây dựng.

Ví dụ, các điều kiện kiểu như “Đến năm 2020, dữ liệu này sẽ biến mất”, “Nếu trời nắng thì tất cả các user sẽ được 1 triệu”, “Nếu A thì B” nếu được xác lập trên Blockchain sẽ được tự động thi hành đúng.

Với smart contract, chúng ta có thể tạo ra các hệ thống tự động thu tiền khi hàng được bán, tự động huỷ hợp đồng khi doanh thu đạt dưới mức cho phép chẳng hạn. Ngoài ra chúng ta cũng có thể sử dụng smart contract trong các hoạt động đầu tư hay các hợp đồng làm việc.

Tuy nhiên, dù trong Blockchain chúng ta có dữ liệu và những điều khoản đúng, vẫn tồn tại những vấn đề về tính chính xác của những dữ liệu bên ngoài có kết nối tới Blockchain. Vẫn còn rất nhiều thách thức trước mắt, tuy nhiên chắc chắn chúng ta có thể vận dụng hiệu quả Blockchain nếu biết làm đúng cách.

## Kết luận

Hiện nay hàng ngày hàng giờ vẫn có các ứng dụng chạy trên Blockchain được sinh ra. Tuy nhiên tính thực tế của chúng thì vẫn chưa có nhiều lắm.

Việc phát triển các ứng dụng Blockchain vẫn còn đang gấp phải rất nhiều vấn đề lớn như khả năng scale hay việc tiêu tốn tài nguyên điện quý giá. Tuy nhiên với sự phát triển nhanh chóng của khoa học kỹ thuật, tôi nghĩ sớm muộn chúng ta cũng sẽ giải quyết được chúng, đưa thế giới vào một tương lai công nghệ đầy tiềm năng phía trước.

Và để đón đầu tương lai đó, sao bạn và tôi không cùng bắt tay vào tìm hiểu về Blockchain ngay từ hôm nay!