### Bài viết được dịch từ [Blockchains don’t scale. Not today, at least. But there’s hope](https://medium.com/hackernoon/blockchains-dont-scale-not-today-at-least-but-there-s-hope-2cb43946551a). Có chỉnh sửa, bổ sung các số liệu mới nhất.


![](https://hackernoon.com/hn-images/1*NoGLLOVfiAXb0S7m_1kqXw.png)


Công nghệ blockchain đã trình làng thế giới được hơn một thập kỷ. Hiện nay, blockchain đang là một trong những công nghệ được quan tâm nhất giới chuyên môn, và ở đâu đó người ta còn cho rằng blockchain phát minh quan trọng không kém Internet !

Blockchain đã vẽ ra một viễn cảnh mới có thể thay đổi hoàn toàn bộ mặt xã hội trong tương lai. Từ các hệ thống xác minh danh tính, tài sản thông minh, cho đến nền tảng xã hội chống kiểm duyệt, cấu trúc tự trị và mô hình quản trị như DAO (Decentralized Autonomous Organization). 

Nhưng những viễn cảnh đó có lẽ chưa thể xảy ra trong tương lai gần - trong khi cộng đồng và các doanh nghiệp ban đầu đang xây dựng các ứng dụng trên nền tảng blockchain, nhưng vẫn còn một rảo cản lớn ngăn chúng ta thấy các ứng dụng này tốt như mong đợi: đó là khả năng mở rộng. Blockchain, như ngày nay, bị hạn chế trong khả năng mở rộng quy mô.

Nhưng viễn cảnh ở trên có lẽ chưa xảy ra trong tương lai gần bởi vì blockchain đang gặp một rào cản rất lớn để có thể thay thế các nền tảng tập trung truyền thống, đó là khả năng mở rộng của hệ thống. Nó đang nhanh chóng trở thành một lĩnh vực nghiên cứu rất tích cực giữa các nhà nghiên cứu trong cộng đồng.

## Tại sao blockchain lại hạn chế về khả năng mở rộng

Hiện tại, tất cả các giao thức đồng thuận (consensys protocol) của blockchain (như của Bitcoin, Ethereum, Ripple, Tendermint) đều có một hạn chế đầy thách thức: mọi nút đầy đủ trong mạng phải xử lý mọi giao dịch. Blockchain có một đặc điểm quan trọng đó là tính phân tán (decentralization) - có nghĩa là mọi nút đơn trên mạng xử lý mọi giao dịch và duy trì một bản sao của toàn bộ trạng thái.

Các cơ chế đồng thuận cung cấp một số lợi ích quan trọng, chẳng hạn như khả năng chịu lỗi, bảo mật, tính trung lập và tính xác thực, nhưng nó phải trả giá bằng khả năng mở rộng. Số lượng giao dịch mà blockchain có thể xử lý không bao giờ có thể vượt quá số lượng nút tham gia vào mạng. Trên thực tế, blockchain thực sự trở nên yếu hơn khi có nhiều nút được thêm vào mạng, độ trễ giữa các nút tăng khi mỗi nút thêm vào mạng.

Trong một hệ thống cơ sở dữ liệu truyền thống, giải pháp cho khả năng mở rộng là thêm nhiều máy chủ để xử lý các giao dịch được thêm vào. Trong hệ thống blockchain phi tập trung, nơi mọi nút cần xử lý và xác thực mọi giao dịch, chúng ta sẽ cần tăng khả năng tính toán ở mỗi nút để mạng nhanh hơn. Tuy nhiên, blockchain là mạng phi tập trung, nên chúng ta sẽ không có quyền can thiệp và kiểm soát đối với các nút.

Tất cả các giao thức đồng thuận trong các blockchain công khai hoạt động theo cách phi tập trung như vậy đang đánh đổi giữa thông lượng giao dịch thấp và mức độ tập trung cao. Nói cách khác, khi kích thước của blockchain tăng lên, các yêu cầu về lưu trữ, băng thông và sức mạnh tính toán được yêu cầu khi tham gia đầy đủ vào mạng sẽ tăng lên. Tại một số điểm, nó trở nên khó sử dụng đến mức nó chỉ khả thi đối cho một vài nút xử lý một block - dẫn đến nguy cơ tập trung hóa.

Để mở rộng quy mô, giao thức blockchain cần phải có một cơ chế để giới hạn số lượng nút cần thiết tham gia để xác thực mỗi giao dịch, mà không làm mất niềm tin của toàn mạng rằng mỗi giao dịch là hợp lệ. Nghe có vẻ đơn giản, nhưng về mặt công nghệ là rất khó. Tại sao?

1. Do mỗi nút sẽ chỉ xác thực một lượng giao dịch nhất định, nên bằng cách nào đó chúng ta đảm bảo rằng giao dịch trong các block khác (mà chúng không xác thực) là hợp lệ.
2. Phải có một số cách để đảm bảo có tính sẵn sàng (availability) của dữ liệu. Có một số lý do khiến một nút có thể ngoại tuyến, bao gồm cả tấn công độc hại và mất điện.
3. Các giao dịch cần được xử lý song song bởi các nút khác nhau để đạt được khả năng mở rộng. Tuy nhiên, việc chuyển đổi trạng thái trên blockchain cũng có một số phần không thể xử lý song song, vì vậy chúng ta phải đối mặt với một số hạn chế về cách chúng ta có thể chuyển đổi trạng thái trên blockchain nhằm cân bằng cả tính song song (parallelizability) và tiện ích (utility).

## Những con số thống kê

Khả năng xử lý giao dịch tối đa theo lý thuyết của một nút Ethereum là hơn 1.000 giao dịch mỗi giây. Không may thay, đây không phải là thông lượng thực tế do đặc tính gas Limit của Ethereum.

![](https://i.imgur.com/F9ZOTW2.png)


Trong Ethereum, gas là thước đo của nỗ lực tính toán và mỗi thao tác được tốn một lượng gas nhất định (ví dụ: lấy số dư của tài khoản tốn 400 gas, tạo ra một hợp đồng tốn 32.000 gas, gửi một giao dịch tốn 21.000 gas, v.v.). Mỗi giao dịch đều có trường gas Limit để chỉ định lượng gas tối đa mà người gửi sẵn sàng trả. Do đó, lượng gas Limit cho mỗi block sẽ xác định liệu có bao nhiêu giao dịch sẽ được gom vào block đó. Hiện tại mỗi block trong Ethereum sử dụng trung bình khoảng 8 triệu gas.

![](https://miro.medium.com/max/700/0*G73nhag-Bzf-ZuvC.)

Gas Limit của Ethereum có phần giống với giới hạn 1 MB về kích thước của mỗi block trong Bitcoin, chỉ khác là gas Limit trong Ethereum được thiết lập động bởi các thợ mỏ trong khi giới hạn kích thước khối Bitcoin được mã hóa cứng vào giao thức.

Gas Limit đối với Ethereum sẽ áp đặt một giới hạn mềm đối với sức mạnh tính toán của mạng trên mỗi block: với giới hạn 8 triệu gas trung bình cho mỗi block hiện tại và lượng gas trung bình hiện tại được sử dụng cho mỗi giao dịch tiêu chuẩn khoảng 21K, chúng ta nhận được khoảng 380 giao dịch tiêu chuẩn cho mỗi block. Thời gian trung bình một block được tạo ra là hơn 13 giây, tương đương với khoảng 29 giao dịch mỗi giây. Con số trên trong thực tế sẽ thấp hơn nhiều với các giao dịch phức tạp hơn (ví dụ: lượng gas trung bình được sử dụng bởi các lời gọi hợp đồng thông minh là 50K, có nghĩa là khoảng ~ 7 giao dịch mỗi giây).

Kết hợp với thực tế là số lượng giao dịch trên mạng Ethereum đang tăng lên với tốc độ đáng kể, bạn có thể thấy điều này sẽ trở thành vấn đề như thế nào. Giao dịch hàng ngày tăng từ khoảng 40K lên 240K từ quý 2 năm 2016 đến quý 2 năm 2017, tương ứng với mức tăng trưởng 500% so với năm trước. Đỉnh điểm, vào ngày 4 tháng 1 năm 2018, mạng Ethereum ghi nhận số lượng giao dịch kỷ lục trong một ngày là 1349890 giao dịch, trung bình hơn 15 giao dịch/giây !

Tương tự, Bitcoin, mặc dù có giới hạn lý thuyết là 4.000 giao dịch mỗi giây, nhưng thực tế thì nó chỉ xử lý được khoảng 7 giao dịch mỗi giây cho các giao dịch nhỏ và 3 giao dịch mỗi giây cho các giao dịch phức tạp hơn.

Lưu ý rằng những hạn chế này không tồn tại đối với các mạng private blockchain. Trên thực tế, mạng private blockchain có thể đạt được hơn 1.000 giao dịch mỗi giây. Tại sao vậy ? Bởi vì nếu bạn đang chạy một mạng private blockchain bạn có khả năng đảm bảo rằng mọi nút trên mạng là một máy tính chất có cấu hình tốt và kết nối internet băng thông cao. Mở rộng quy mô blockchain hiện tại sẽ yêu cầu chúng ta thêm khả năng tính toán vào các nút để mạng nhanh hơn. Các mạng private blockchain có quyền kiểm soát mọi nút trong mạng, nên chúng có thể thực hiện việc này. 

Trong phần còn lại của bài viết, chúng ta sẽ cùng tìm hiểu một số giải pháp được đề xuất đang được thảo luận trong cộng đồng giúp giải quyết vấn đề mở rộng. Mỗi giải pháp có đặc trưng riêng, đi kèm sự đánh đổi một yếu tố gì đó để nâng cao khả năng mở rộng của hệ thống.

Trong thực tế, thật không may là chưa có giải pháp nào giải quyết triệt để vấn đề mở rộng của mạng blockchain. Mỗi một  giải pháp này sẽ giúp cải thiện khả năng mở rộng dần dần. Kết hợp lại với nhau, chúng ta sẽ có một triển vọng đầy hứa hẹn cho tương lai của blockchain.

## Các giải pháp

Mở rộng blockchain là một thách thức và một lĩnh vực nghiên cứu tích cực trong vài năm trở lại đây. Nếu bạn đã theo dõi các sự kiện trong cộng đồng Bitcoin, bạn có thể đã nghe nói về hai giải pháp mở rộng quy mô cụ thể của Bitcoin được gọi là SegWit và tăng kích thước block 2 megabyte (MB).

Cả hai giải pháp này đều nhằm giải quyết vấn đề cụ thể trên Bitcoin, Bitcoin có giới hạn là 1 megabyte (MB) cho mỗi block, điều đó giới hạn số lượng giao dịch có thể được thêm vào một block. Bitcoin đã phải đối mặt với sự chậm trễ (đôi khi là vài giờ và thậm chí vài ngày) trong việc xử lý và xác nhận giao dịch. Tương tự, như chúng ta đã đề cập trong phần trước, Ethereum cũng phải đối mặt với những hạn chế trong khả năng mở rộng bởi thông số gas Limit.

## Giải pháp #1: SegWit (chỉ áp dụng cho Bitcoin)

Mọi giao dịch Bitcoin đều chứa:

### Input
* Chi tiết về người gửi giao dịch trước đó
* Private key của người gửi

### Output
* Lượng tiền gửi
* Địa chỉ của người nhận

Trong số các yếu tố này, chữ ký số (`scriptSig`) là lớn nhất về kích thước, chiếm ~ 60% 70% giao dịch. Tuy nhiên, chữ ký chỉ lại cần thiết tại thời điểm xác nhận giao dịch.

Segwit( viết tắt của: Segregated witness ) là giải pháp để tách các chữ ký giao dịch khỏi phần Input giao dịch. Chữ ký sẽ được chuyển đến vào cuối giao dịch.

![](https://miro.medium.com/max/2000/0*i23mB7G2Zmc09g4A.)

SegWit cũng giải quyết các vấn đề khác bên cạnh khả năng mở rộng, chẳng hạn như tính linh hoạt trong giao dịch và tăng tính bảo mật (mà chúng tôi sẽ không đề cập chi tiết ở đây vì nó không liên quan đến khả năng mở rộng.)

## Giải pháp #2: Tăng kích thước tối đa của mỗi block lên 2 MB (chỉ áp dụng cho Bitcoin)

Một phần của cộng đồng Bitcoin (phía người dùng) ủng hộ mạnh mẽ cho SegWit, nhưng nhiều người khác (những thợ đào) lại thích một hard fork sẽ thay đổi giới hạn kích thước khối 1 MB thành 2 MB hơn. Ý tưởng cơ bản rất đơn giản: bằng cách tăng kích thước của một block, nó sẽ cho phép nhiều giao dịch hơn có thể thêm vào block, cho phép mạng xử lý nhiều giao dịch hơn mỗi giây.

![](https://miro.medium.com/max/989/0*EdR8zdZyzllOsyk-.)

Kế hoạch tăng kích thước block này đã có từ lâu, là chủ đề tranh luận sôi nổi trong cộng đồng Bitcoin và đã thu hút được sự chú ý ngày càng tăng kể từ đầu năm 2015, khi kích thước của các block bắt đầu đạt đến giới hạn cứng hiện tại là 1 MB.

## Giải pháp #3: Off-chain state channels

Các kênh trạng thái (state channel) là một cơ chế trong đó các tương tác blockchain thường sẽ xảy ra trên mạng blockchain sẽ được tiến hành bên ngoài blockchain. Ví dụ nổi tiếng nhất của chiến lược này là ý tưởng về các kênh thanh toán bằng Bitcoin, cho phép các khoản thanh toán miễn phí ngay lập tức được gửi trực tiếp giữa hai bên. Nó sử dụng các thuật toán mã hóa để bảo mật giúp hạn chế rủi ro với những người tham gia, đồng thời cung cấp những cải tiến đáng kể về chi phí và tốc độ. Chúng tôi tin rằng các kênh trạng thái sẽ là một phần quan trọng trong việc mở rộng blockchain.

Một kênh trạng thái hoạt động như sau:

1. Một phần của trạng thái blockchain bị khóa thông qua cơ chế đa chữ ký (multi signature) hoặc một hợp đồng thông minh nào đó, cách duy nhất để cập nhật trạng thái là có sự đồng ý của một nhóm người tham gia cụ thể.
2. Những người tham gia tự cập nhật bằng cách xây dựng và ký các giao dịch mà không gửi nó đến blockchain. Mỗi bản cập nhật mới ghi đè các bản cập nhật trước đó.
3. Cuối cùng, những người tham gia gửi trạng thái trở lại blockchain, đóng kênh trạng thái và mở lại trạng thái một lần nữa (thường là trong một cấu hình khác với cấu hình bắt đầu).

![](https://hackernoon.com/hn-images/1*6eEGoEk7_bmt4JCNmCnKnA.png)


Bước 1 và 3 liên quan đến các hoạt động trên blockchain, trả phí và chờ xác nhận. Tuy nhiên, Bước 2 hoàn toàn không liên quan đến blockchain. Trong trường hợp này, blockchain được sử dụng hoàn toàn như một lớp thanh toán để xử lý giai đoạn cuối cùng của một loạt các tương tác của giao dịch, điều này giúp giảm gánh nặng cho mạng blockchain.

![](https://miro.medium.com/max/1256/0*2RP1YRRhLOAyzhFd.)

 *Tại bất kỳ thời điểm nào, bất kỳ người tham gia nào cũng có thể gửi giao dịch vào hợp đồng để đóng kênh và bắt đầu quá trình xử lý. Điều này bắt đầu một giới hạn thời gian trong đó người tham gia có thể gửi giao dịch và giao dịch có số thứ tự cao nhất sẽ được xử lý. Nếu một trong những người tham gia rời khỏi kênh hoặc cố gắng gian lận, một người khác có thể xuất bản giao dịch mới nhất lên blockchain bất cứ lúc nào để hoàn thiện trạng thái, giả sử tất cả những người tham gia hoàn toàn đồng ý về trạng thái.*


Không chỉ thông lượng giao dịch được tăng lên với các kênh trạng thái, mà nó còn cung cấp hai lợi ích rất quan trọng khác: tăng tốc độ và giảm chi phí. Do các giao dịch diễn ra ngoài chuỗi, nên các khoản thanh toán có thể được xử lý ngay lập tức do nó không cần thêm thời gian để được xử lý và xác minh bởi mạng. Thứ hai, thanh toán cũng phải chịu phí thấp hơn vì chỉ cần một số lượng nhỏ giao dịch trên blockchain để đảm bảo trạng thái của các kênh thanh toán, các giao dịch đang diễn ra ngoài chuỗi thì không bị mất phí.

Có một số giải pháp đã được triển khai. Ví dụ: [Lightning Network](https://lightning.network/) là một mạng phi tập trung sử dụng các kênh trạng thái thông qua hợp đồng thông minh để cho phép thanh toán ngay lập tức và có thể mở rộng trên một mạng lưới người tham gia. Ban đầu, Lightning Network được tạo ra cho Bitcoin, nhưng dường như bây giờ họ cũng cho phép giao dịch qua các blockchain khác.

[Raiden Network](http://raiden.network/) chạy trên mạng Ethereum. Raiden Network cũng tận dụng các mạng trạng thái ngoài chuỗi (off-chain) để mở rộng Ethereum.

## Giải pháp #4: Sharding (tạm dịch là phân đoạn)

Sharding trong blockchain tương tự như Sharding trong các cơ sở dữ liệu truyền thống. Với các cơ sở dữ liệu truyền thống, phân đoạn (shard) là một phân vùng của dữ liệu trong cơ sở dữ liệu, trong đó mỗi phân đoạn được lưu trữ trên một máy chủ riêng biệt. Điều này giúp phân tán tải trên các máy chủ.

![](https://miro.medium.com/max/1396/0*Yl_rv1QvhMTY5SX1.)

Tương tự, phân đoạn blockchain, trạng thái chung của blockchain được phân tách thành nhiều phân đoạn khác nhau và mỗi phần sẽ được lưu trữ bởi các nút khác nhau trong mạng.

![](https://miro.medium.com/max/1121/0*leh2IGdJ8fwUPB9s.)

*Một shard*

![](https://miro.medium.com/max/1289/0*WPxBsWYkW0q_5hoT.)

*Các shard được lưu trong các block*

Các giao dịch xảy ra trên mạng được chuyển hướng đến các nút khác nhau tùy thuộc vào phân đoạn lưu trữ. Mỗi phân đoạn chỉ xử lý một phần nhỏ trạng thái và các phân đoạn thực hiện xử lý một cách song song. Để giao tiếp giữa các phân đoạn, chúng ta cần có một số cơ chế truyền thông điệp.

Có nhiều cách khác nhau để thực hiện việc chuyển thông điệp giữa các phân đoạn. Trong Ethereum, cách tiếp cận đang được thực hiện là sử dụng một receipt paradigm (tạm dịch là mô hình biên lai): khi một giao dịch trong phân đoạn thực thi, nó sẽ thay đổi trạng thái của cục bộ nó (local shard), đồng thời tạo ra các biên lai (receipt), được lưu trữ trong một bộ nhớ chia sẻ phân tán nào đó (distributed shared memory), nó có thể được xem (nhưng không được sửa đổi) bởi các phân đoạn khác.


![](https://miro.medium.com/max/860/0*xOw61dfPoapRlOon.)

![](https://miro.medium.com/max/1289/0*IXTBDFrl6tWHWQ7M.)

Nhìn chung, giải pháp sharding trong blockchain yêu cầu chúng ta tạo ra một mạng trong đó mỗi nút chỉ xử lý một lượng các giao dịch trong mạng chứ không phải tất cả.

Tại sao ?

Giao thức public blockchain không cần các nút phải tin tưởng lẫn nhau. Tuy nhiên, các giao dịch cần phải có đồng thuận về một trạng thái chung . Vì mỗi nút không cần tin tưởng lẫn nhau, nên sẽ là không đủ nếu một nút xử lý giao dịch trên phân đoạn A chỉ đơn giản nói với các nút xử lý giao dịch trên phân đoạn B rằng giao dịch hợp lệ; đúng hơn, nó sẽ cần phải chứng minh bằng một cách nào đó.


![](https://miro.medium.com/max/1618/0*JC0_rpvDq0_eHWbP.)


Ngoài ra, vì mục tiêu của sharding là mỗi nút sẽ không phải xác thực mọi giao dịch, chúng ta cần tìm ra một cơ chế xác định các nút nào xác thực phân đoạn nào theo cách an toàn, mà không tạo ra cơ hội cho kẻ tấn công có thể phá vỡ mạng.

## Giải pháp #5: Plasma

Plasma là một trong những giải pháp hứa hẹn cho việc mở rộng mạng blockchain.

Plasma về cơ bản là một loạt các hợp đồng chạy trên blockchain gốc (nghĩa là chuỗi chính). Blockchain gốc kiểm tra tính hợp lệ của trạng thái trong chuỗi Plasma bằng cách sử dụng một thứ gọi là ```fraud proofs``` (tạm dịch là bằng chứng gian lận). (Lưu ý: ```fraud proofs``` là một cơ chế theo đó các nút có thể xác định xem một block có hợp lệ hay không bằng cách sử dụng một phép thử toán học).

![](https://miro.medium.com/max/1214/1*inSZwzJG_gSrEDpCpzpz0g.png)

Các mạng blockchain sẽ được cấu trúc theo một hệ thống phân cấp dạng cây và mỗi nhánh được coi là một blockchain có lịch sử riêng của nó và các tính toán có thể thu nhỏ bản đồ. Chúng tôi gọi các chuỗi con là chuỗi  Plasma, mỗi chuỗi là một chuỗi trong blockchain.

![](https://miro.medium.com/max/1246/1*AJRODYqunApFeUI0QG7m9w.png)


Chuỗi Plasma sẽ không tiết lộ nội dung của chuỗi trên chuỗi chính. Thay vào đó, chỉ có các giá trị băm của blockheader được gửi trên chuỗi gốc, đủ để xác định tính hợp lệ của block. Nếu có sự gian lận (proof of fraud) được gửi trên chuỗi chính, thì block sẽ được khôi phục (rolled back) và người tạo block sẽ bị phạt. 

Kết quả, chuỗi chính sẽ chỉ phải xử lý một số lượng nhỏ các dữ liệu (commitments) gửi lên từ các chuỗi con, từ đó làm giảm lượng dữ liệu mà  chuỗi chính phải xử lý và cho phép số tăng khối lượng lượng tính lên nhiều lần.

![](https://miro.medium.com/max/1492/1*3Po_2cKvsGjdpn1Hquvvjw.png)


Ngoài ra, dữ liệu chỉ được truyền tới những người muốn xác nhận một trạng thái cụ thể. Điều này làm cho việc thực thi hợp đồng có thể mở rộng hơn bằng cách loại bỏ việc mọi nút trong mạng có thể xem mọi chuỗi. Thay vào đó, họ chỉ xem những chuỗi mà họ bị ảnh hưởng về kinh tế để thực thi hành vi đúng và xử phạt gian lận. Bằng chứng gian lận cho phép bất kỳ bên có thể phát hiện các block không hợp lệ và đảm bảo rằng tất cả các chuyển đổi trạng thái được xác thực.

Trong trường hợp có một cuộc tấn công vào một chuỗi Plasma, những người tham gia có thể nhanh chóng thực hiện một lối thoát hàng loạt khỏi chuỗi đó, với chi phí tiết kiệm đáng kể so với các đề xuất off-chain khác trước đây.

![](https://miro.medium.com/max/1514/1*WTR-TRDkxo1KvIMrm3mKwA.png)
*Với block màu đỏ (Block số 4) Alice không thể truy xuất được. Cô thoát ra bằng cách broadcast một proof of funds trên chuỗi chính và việc rút tiền của cô được xử lý sau một khoảng thời gian.*

![](https://miro.medium.com/max/1486/1*8lfwS0jEkp7Swx8b6kH6xw.png)
*Chuỗi Plasma bị lỗi (được tô màu đỏ) được định tuyến bằng cách broadcasting một commitment với chuỗi mẹ/chuỗi chính của nó (đường màu dương xanh đứt nét bên phải). Những người tham gia trong chuỗi Plasma 3rd sẽ thực hiện di chuyển hàng loạt sang một chuỗi khác cùng nhau (đường màu xanh dương đứt nét bên trái) sau một khoảng thời gian.*


Plasma có vẻ tương tự như việc triển khai các kênh trạng thái (ví dụ: Lightning Network) bằng việc xử lý các giao dịch ngoài chuỗi chính. Sự khác biệt chính giữa các kênh trạng thái và Plasma là với Plasma, không phải tất cả người tham gia cần trực tuyến để cập nhật trạng thái. Hơn nữa, những người tham gia không cần gửi dữ liệu đến chuỗi chính để tham gia và xác nhận giao dịch.

Điểm thú vị là các giải pháp kênh trạng thái như Lightning Network có thể là một lớp interface để thanh toán/hợp đồng nhanh chóng trên Plasma, trong khi Plasma duy trì cập nhật cho trạng thái cho chuỗi chính.

![](https://miro.medium.com/max/372/1*Soxn_7jM9hTd1gekldRRdg.png)

Có rất nhiều chi tiết phức tạp cho giải pháp này mà chúng tôi hy vọng sẽ đi sâu vào một bài viết trong tương lai. Bạn có thể tìm đọc thêm [Plasma White Paper](http://plasma.io/plasma-deprecated.pdf) để tìm hiểu sâu hơn về giải pháp này.

## Giải pháp #6: Off-chain computations (ví dụ: TrueBit)

[TrueBit](https://truebit.io/) là một ví dụ về giải pháp sử dụng các tính toán ngoài chuỗi để cho phép các giao dịch có thể mở rộng giữa các hợp đồng thông minh Ethereum. Về cơ bản, giống như các kênh trạng thái, TrueBit sử dụng một lớp (layer) bên ngoài blockchain để thực hiện các tác vụ phức tạp. Nói cách khác, đây là một hệ thống có thể thực hiện các tác vụ tính toán phức tạp ở ngoài chuỗi, nó có thể rất tốn kém nếu thực hiện trên chuỗi chính(on-chain). 

Thay vì mọi nút tham gia xác thực, tính toán trên mang, sẽ có những người tham gia trong mạng, được gọi là **Solvers**, họ trực tiếp thực hiện các tính toán trên các hợp đồng thông minh và trả về kết quả, cùng với một khoản tiền cọc. Nếu **Solvers** đúng, thì họ sẽ nhận được phần thưởng cùng với số tiền cọc được trả lại. Mặt khác, nếu **Solvers** cố gắng gian lận, khoản tiền cọc sẽ bị mất và mọi tranh chấp sẽ được giải quyết trên blockchain bằng cách sử dụng “Verification Game”.

Nếu Solver thực sự gian lận, họ sẽ bị phát hiện và trừng phạt. Nếu không, Solver sẽ được nhận thưởng cùng với tiền cọc đã gửi.

![](https://miro.medium.com/max/1037/0*r2efaTqdSynPD2g6.)

Tóm lại, giao thức cho phép bất cứ ai thực hiện một tác vụ tính toán và bất kỳ ai khác nhận được phần thưởng khi hoàn thành nó. Và bằng cách chuyển quá trình tính toán và xác minh khỏi blockchain Ethereum sang một giao thức riêng biệt, nó có thể mở rộng quy mô với số lượng lớn các tính toán mà không bị giới hạn bởi thuộc tính gas Limit của Ethereum.

## Các đề xuất khác cho việc mở rộng mạng blockchain.

Có một vài đề xuất khác xuất hiện trong cộng đồng blockchain. Mặc dù các giải pháp không trực tiếp nhằm giải quyết khả năng mở rộng, nhưng chúng giúp gián tiếp giải quyết một số vấn đề về giúp khả năng mở rộng có thể dễ dàng thực hiện hơn.

### Proof of stake

Tương tự như Proof-of-work, Proof-of-Stake là một cơ chế đồng thuận, củng cố tính bảo mật của blockchain bằng cách ngăn chặn việc chi tiêu kép (double spend).

Trong các mạng blockchain dựa trên Proof-of-Work, các thợ mỏ duy trì tính toàn vẹn của dữ liệu blockchain bằng cách chạy đua để giải các câu đố toán học để đổi lấy phần thưởng. Về vấn đề này, chúng giúp xác thực các giao dịch với sức mạnh tính toán phần cứng, sức mạnh tính toán càng lớn thì khả năng ảnh hưởng đến mạng của bạn càng lớn. Trong Proof-of-Stake, các bên liên quan bỏ phiếu với số tiền của họ thay vì sức mạnh tính toán.

Blockchain theo dõi một số nút xác thực nhất định, được gọi là **validators**, họ phải đặt cọc một lượng tiền để tham gia xác thực các block. Nếu quá trình xác thực của **validator** bị giao thức coi là không hợp lệ, tiền cọc của họ và đặc quyền tham gia vào quá trình đồng thuận sẽ bị mất. Nếu họ xác thực chính xác, họ nhận lại tiền đặt cọc cùng với phí giao dịch của các giao dịch trong block.

Có một số loại thuật toán đồng thuận Proof-of-stake khác nhau cũng như các cơ chế khác nhau để gán phần thưởng cho các **validator**, nhưng chúng tôi sẽ không đi chi tiết ở trong bài viết này.

### Proof-of-Stake giúp nâng cao tính mở rộng như thế nào?

Một ví dụ là với sharding. Sharding với Proof-of-work rất khó để thực hiện một cách an toàn. Hãy nhớ lại rằng với sharding, chúng tôi phân chia trách nhiệm xác nhận giữa nhiều nút để mỗi nút không phải xử lý mọi thứ. Tuy nhiên, Proof-of-work được triển khai hoàn toàn ẩn danh, điều này gây ra một vấn đề bởi kẻ tấn công có thể hướng tất cả lực băm của chúng vào việc tấn công phân đoạn (shard) và phá vỡ mạng Ví dụ: giả sử chúng ta có hai phân đoạn, A và B. A có 90% hashpower và B có 10%. A có thể tấn công B chỉ với 5,1% năng lực tính toán ( tấn công 51%).

![](https://miro.medium.com/max/963/0*OZ1LYMjankkW_hGf.)


## Lưu trữ phi tập trung (Decentralized storage)

Một giải pháp khác để giữ cho khối lượng lưu trữ của mạng nhẹ hơn là sử dụng các dịch vụ lưu trữ phi tập trung ví dụ như [Swarm](http://swarm-guide.readthedocs.io/en/latest/introduction.html). Swarm là giao thức chia sẻ tệp ngang hàng cho Ethereum, cho phép bạn lưu trữ mã nguồn ứng dụng và dữ liệu của blockchain trong các nút swarm, được kết nối và có thể trao đổi dữ liệu này với blockchain. Ý tưởng cơ bản ở đây là thay vì các nút lưu trữ mọi thứ trên blockchain, họ chỉ lưu trữ dữ liệu thường xuyên được truy xuất và để các dữ liệu khác trên đám mây như Swarm.


![](https://miro.medium.com/max/1407/0*oYqhcYIbd-lKeD0Y.)

## Kết luận

Chủ đề này thực sự rất phức tạp, nhưng chúng tôi hy vọng bài viết sẽ này hữu ích trong việc cung cấp cho các bạn một phần nào câu trả lời về lý do tại sao khả năng mở rộng lại quan trọng với blockchain và cách giải quyết ra sao.

Chúng tôi nghi ngờ rằng có một câu trả lời giải pháp đơn lẻ giúp giải quyết vấn đề mở rộng trong blockchain, nhưng chúng tôi tin rằng một số cách tiếp cận cuối cùng sẽ giải quyết vấn đề và cho phép các ứng dụng blockchain có bước nhảy vọt lớn.

## Tài liệu tham khảo

[1]  [http://www.r3cev.com/blog/2016/6/2/ethereum-platform-review](http://www.r3cev.com/blog/2016/6/2/ethereum-platform-review)  
  
[2]  [https://etherscan.io/chart/gaslimit](https://etherscan.io/chart/gaslimit)  
  
[3]  [http://ethgasstation.info/](http://ethgasstation.info/)  
  
[4]  [https://etherscan.io/chart/tx](https://etherscan.io/chart/tx)  
  
[5]  [https://github.com/ethereum/EIPs/issues/35](https://github.com/ethereum/EIPs/issues/35)

[6]  [https://docs.google.com/presentation/d/1CjD0W4l4-CwHKUvfF5Vlps76fKLEC6pIwu1a_kC_YRQ/edit#slide=id.gd284b9333_0_6](https://docs.google.com/presentation/d/1CjD0W4l4-CwHKUvfF5Vlps76fKLEC6pIwu1a_kC_YRQ/edit#slide=id.gd284b9333_0_6)