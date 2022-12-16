Aka **Những yếu tố giúp bạn đoạt giải mâm xôi vàng trong làng Software Architect (SA)**

Nhân những ngày nóng nực bực mình, mình ngồi hệ thống lại tất cả những ổ gà ổ voi mà mình và những người xung quanh đã vấp ngã không những 1 mà rất nhiều lần. Hy vọng rằng bất kể bạn là 1 SA, hay là 1 Developer, hay là Devops đi chăng nữa gì cũng có thể tránh được những cái bẫy này.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nd3rfqokt2_%E1%BA%A3nh.png)

## First things first

Để dạo đầu, mình lại sẽ tự giới thiệu (lần thứ n) bản thân thường được gọi là **Minh Monmen**. Và nghề nghiệp của mình là làm **tạp vụ** trong cái ngành công nghiệp không khói fancy bậc nhất này. 

Vâng, các bạn đọc đúng rồi đấy, tạp vụ ạ, bởi vì rằng thì là mà có rất nhiều thứ mà mình cần phải lau dọn. Những cái vũng sình lầy này tất nhiên không tự nhiên sinh ra cũng không tự nhiên mất đi, đơn giản là nó sẽ chuyển từ người này qua người khác mà thôi. Hy vọng khi tới lượt mình đưa cây chổi cho bạn thì bạn sẽ không cần phải quét dọn lại **bãi chiến trường** của chính mình trong những năm tháng lập trình.

Để các bạn có 1 chút ý niệm về những điều mình sắp nói ra đây, vui lòng tự vấn bản thân xem mình đã bao giờ gặp những pha xử lý **đi vào lòng đất** khiến cho ứng dụng của mình khốn đốn chưa? Đã bao giờ các bạn đọc lại code, xem lại thiết kế của mình và chỉ ước được đập nó đi xây mới hoàn toàn chưa? Đã bao giờ các bạn thử xem trong 6 tháng vừa rồi mình đã làm được gì, hay chỉ loanh quanh đập đi làm lại 1 chức năng tới 3 lần mà vẫn chưa hoàn thành chưa?

Bên dưới đây là những pha xử lý như thế, **đi thẳng vào lòng đất** mà không thèm quay đầu lại chút nào. Hãy cùng theo bước chân đầy đau thương của mình tiếp nhé.

## Chưa có bài toán đã tìm lời giải

Đây chắc chắn phải là thứ được nhắc đến đầu tiên, và sẽ phải là thứ được các bạn chú ý cả khi đọc chính bài viết này.

Đến đây rồi, các bạn đã hiểu rõ mục đích của bản thân khi đọc bài viết này chưa? Và bài viết này sinh ra để làm gì vậy?

Rất nhiều người chỉ vì cái title **Software Architect** mà vội vã đi ngồi vẽ ra cả 1 bản thiết kế hệ thống phần mềm khủng bố, những giải pháp và công nghệ trending, ước lượng data hàng triệu record, rồi áp dụng **Marchine Learning**, **Big Data**, **AI**,... này nọ trong khi đến bài toán là gì còn chưa xác định được.

Mình đang gặp phải **vấn đề gì**? Mình đang **ở đâu** trong quá trình phát triển của 1 sản phẩm?

Đây là 2 câu hỏi buộc phải trả lời trước khi có thể bắt tay vào vẽ vời hay xây dựng cái gì đó. Nếu bài toán của bạn chỉ là 1 trang blog công nghệ, việc setup 1 hệ thống micro-services với vài chục ứng dụng nhỏ là không cần thiết. Nếu bạn đang ở giai đoạn startup và test thị trường thì 1 hệ thống cồng kềnh nhiều thành phần là tối kị.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qozxbujvtv_%E1%BA%A3nh.png)

1 số kinh nghiệm đau thương của mình và 1 số tiền bối xung quanh:

- Startup 1 nền tảng kết nối (dạng platform) với 1 thị trường ngách khá tiềm năng, số lượng sản phẩm trên thị trường không nhiều, tuy nhiên chưa xác định được sự chấp nhận của thị trường và mô hình kinh doanh hiệu quả mà đã lên giải pháp nào micro-services, nào container, nào cloud, nào hệ thống đáp ứng được hàng triệu booking,... và kết quả là cả năm trời mới ra 1 sản phẩm mà đáng nhẽ có thể làm xong từ rất sớm với 1 monolith nhẹ nhàng, hay thậm chí chỉ là setup 1 trang wordpress cũng thành hình.
~> **Đừng đổ công sức vào công nghệ sớm trừ khi business của bạn dựa hoàn toàn vào ứng dụng công nghệ, hãy tìm ra mô hình kinh doanh hiệu quả trước đã**

- Để mấy ông SA nghĩ tính năng cho sản phẩm. Thử nào mã voucher, mua sắm online, dropship, booking, affiliate,... nhưng chẳng cái nào work. Tất nhiên thử nhiều thứ là điều cần thiết và chắc chắn phải làm, nhưng cái đáng nói ở đây là cứ làm tính năng mãi, làm mãi, làm mãi, rồi lâu quá chưa kịp release đã quay xe làm tính năng khác, và lại làm mãi, làm mãi,... chưa kịp đưa ra dùng lại nghĩ ra cái khác.
~> **Bài toán mình tự nghĩ ra có thể không đúng, hoặc không phải bài toán luôn**

- Hăm hở đi tìm 1 công thức thần thánh cho mối quan hệ biện chứng giữa 2 thực thể. Sử dụng nào là hàm mũ, logarit, rồi vẽ vời các kiểu các kiểu trong khi còn chưa phân tích xem trong thực tế 2 thực thể đó quan hệ với nhau thế nào, có đặc điểm gì không, có lượng hóa được không.
~> **Lời giải có thể rất hay nhưng chỉ tiếc là chưa tìm được đề bài**

- Nghĩ giải pháp **smart content**, những hệ thống ứng dụng công nghệ cao liên quan tới nhiều giả định, nhiều model siêu cấp được training hàng ngày, sao cho có thể suggest cho user những lựa chọn xịn xò nhất. Nhưng cuối cùng chỉ cần traffic hơi cao hơn bình thường 1 tý là đã lăn ra chết. Bọn mình thường gọi là **hưởng dương**.
~> **Trước khi con người có thể thông minh thì họ phải sống và lớn được đã**

## **Quá** ham hố công nghệ mới

Chắc chắn đây là điều mà phần đông những người đọc bài viết này đều đã ít nhất 1 lần trải qua: **ham hố sự mới mẻ**. Tất nhiên khi mà đó là đức tính tự nhiên của con người rồi thì chẳng ai có thể trách chúng ta được. Những cái mới, những cái hiện đại đều có những thứ được cải thiện, nhưng lại thiếu đi bề dày kinh nghiệm và sự ổn định cần có ở môi trường production. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/exbzoaokox_46pbqm.jpg)

Và sau đây lại là 1 số pha tấu hài đến từ người thiết kế giải pháp:

- Mấy ông PHP đi dựng 1 hệ thống thương mại điện tử hoành tráng như shopify, bắt đầu học 1 nền tảng mới (nodeJS), học 1 kiến trúc mới (Micro-services), học những pattern mới (CQRS, 2FC, Event sourcing...), học những công nghệ mới (Message queue, API Gateway, K8S, Docker). Trải qua rất nhiều bài toán về vận hành như quản lý kho, quản lý ship, quản lý doanh thu, quản lý người bán,... tá lả rồi cuối cùng mô hình chưa work lại phải đập bớt đi tiếp cận những cách kinh doanh khác.
~> **Again, những mô hình trên không sai, nó phù hợp cho 1 bài toán thương mại điện tử lớn, mở rộng rất dễ dàng, chỉ tiếc là chưa tới lúc mở rộng**

- Thử sức với micro-frontend sau khi đọc 1 vài bài viết trên mạng. Cuối cùng khách hàng kêu như cháy nhà vì giao diện người dùng quá phân mảnh, không nhất quán và thời gian phát triển quá lâu, trang này không kết nối được trang kia, rồi trang này user nọ trang kia user kia,...
~> **Frontend vẫn là thứ có tính thống nhất rất cao, đừng dại mà đập nó ra quá sớm để rồi hối hận**

- Sử dụng 1 chiếc database key-value chưa ai nghe tới khi còn chưa có kinh nghiệm thiết kế cũng như vận hành. Kết quả là làm khó cho dev khi 1 chức năng đơn giản khi làm trên những database khác lại cần phải xây mới lại toàn bộ data model và xử lý những bài toán sâu bên dưới **chưa phải của mình**. Người setup, vận hành đều chưa có kinh nghiệm với db này dẫn tới việc backup, debug, trace,... đều **khó như lên giời**.
~> **Hãy nhìn vào độ phổ biến của 1 công nghệ trước khi sử dụng nó. 99% chúng ta không phải là người có thể tự bước trên con đường mới mẻ này đâu**.

- Đưa 1 ngôn ngữ không những mới với toàn bộ team mà còn mới với cả thế giới vào xử lý những bài toán **chưa bị ảnh hưởng bởi sự nhanh chậm của ngôn ngữ**. Và cuối cùng là 1 bài toán rất đơn giản cũng gặp rất nhiều lỗi và mất rất nhiều thời gian mặc dù đã được senior xử lý.
~> **Trăm hay không bằng tay quen. Chỉ nên tính tới việc sử dụng 1 ngôn ngữ mới với 1 team cũ nếu bài toán bắt buộc phải vậy**

## Bỏ quên sự phù hợp

Sự phù hợp là yếu tố quan trọng trong việc quyết định có áp dụng một giải pháp vào 1 bài toán hay không. Bỏ quên sự phù hợp khi giải 1 bài toán là biểu hiện của 1 SA tồi. 

**Dữ liệu có dạng thế nào?** 
**Số lượng bao nhiêu?**
**Việc đọc/ghi có tương quan thế nào?** 
**Đặc điểm của đọc ghi ra sao?**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/jja8itn301_%E1%BA%A3nh.png)

Đây là 1 số câu hỏi cơ bản phải trả lời được trước khi thiết kế giải pháp về dữ liệu. Hãy xem 1 số cách thiết kế mang tính hài hước sau đây:

- Cố đưa những cái **distributed** như distributed database, distributed code, distributed system vào những hệ thống **chưa có vấn đề về độ lớn dữ liệu**. Mặc dù chỉ là 1 hệ thống quản lý vài trăm ngàn bản ghi đơn giản, ấy vậy mà lại sử dụng những chiếc db distributed rất fancy, cuối cùng hệ thống giống như 1 cái blackbox, ngoại trừ đọc bằng code ra thì không thể check data trực tiếp trong db được.
~> **Đây là 1 căn bệnh của nhiều SA khi muốn mọi thứ phải được distributed, horizontal scaling nhưng với... vài trăm ngàn bản ghi và 1-2 node**

- Thiết kế giải pháp **partition trên 1 node** với dữ liệu dạng **phân bố đều**, **access số lượng ít row** và **heavy-read**. Partition trên 1 node sẽ rất hiệu quả với data dạng **hot-cold**, tức là phân bố không đều để có thể tận dụng được phần cứng giới hạn của 1 node (như ram cho index hot-partition), ngoài ra nó cũng phù hợp với quá trình aggregate dạng **table-scan** khi giới hạn được khoảng tác động của query. Việc **partition trên 1 node** và **phân bố đều** sẽ gây gánh nặng ngược trở lại phần cứng và không hiệu quả.
~ **Không phải cái gì lớn thì partition cũng hiệu quả, chia như thế nào phụ thuộc rất nhiều vào tính chất của từng loại dữ liệu và cách chúng ta sử dụng chúng**

- Thiết kế giải pháp có sự phát triển liên tục về schema db nhưng lại dùng thuần SQL. Kết quả là việc migrate ngày càng làm bảng thêm nặng nề và gây downtime cho hệ thống khi phải tác động tới schema của toàn bộ bảng hàng triệu record. Việc dùng SQL đơn thuần chỉ vì muốn vậy chứ không dựa trên việc phân tích đặc điểm dữ liệu và các yêu cầu trong tương lai. NoSQL mặc dù phù hợp hơn, cũng đã được dùng rất nhiều trong hệ thống nhưng lại không được xem xét sử dụng.
~> **Sự phù hợp về dữ liệu, 1 lần nữa là điều cần xem xét và ưu tiên hàng đầu trước khi lựa chọn giải pháp. 1 giải pháp không phù hợp sẽ gây ra rất nhiều technical debt**

## Thích ăn lẩu

Và cuối cùng, một SA tồi là người thích ăn lẩu.

Nói thì có vẻ mê tín nhưng nếu SA cho phép quá nhiều công nghệ, quá nhiều giải pháp tham gia vào dự án của mình thì cuối cùng sản phẩm sẽ không khác gì 1 nồi lẩu thập cẩm và chắc chắn sẽ chẳng ai muốn ăn.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lurtnasx2p_%E1%BA%A3nh.png)

Món lẩu này sẽ đem lại cho các bạn **3 không**?

- **No sharing**: Mỗi người 1 ngôn ngữ sẽ triệt tiêu khả năng share kinh nghiệm lẫn nhau giữa các dev.
- **No replacement**: Hãy tưởng tượng nếu 1 ngày người duy nhất làm ngôn ngữ X nghỉ ốm, hoặc tệ hơn là nghỉ việc.
- **No inheritance**: Mỗi service mới sẽ trở thành 1 hành trình hoàn toàn mới, giải quyết lại những bài toán mà những người khác đã gặp phải, đơn giản vì nó được xây dựng trên 1 công nghệ mới.

Và cuối cùng, những người mệt nhất sẽ là team Devops-System. Đây là team vận hành sản phẩm về mặt kỹ thuật, phụ trách quản lý tất cả những công nghệ, những ngôn ngữ mà người thiết kế giải pháp đã đưa ra. Thiếu kinh nghiệm về dev đã đành, nhưng thiếu kinh nghiệm về vận hành mới là mối nguy thực sự đối với bất kỳ sản phẩm nào. Bạn chắc chắn sẽ không muốn phải là người **thưởng thức** nồi lẩu này đâu.

> Nói vậy không có nghĩa là 1 dự án chỉ nên sử dụng 1 công nghệ. Áp dụng những công nghệ thực sự cần thiết, code gói gọn trong 1-2 ngôn ngữ sẽ là chìa khóa giúp tránh được sự hổ lốn quá mức của nồi lẩu.

## Tổng kết

Người ta thường nói người thành công thì sẽ phải trải qua rất nhiều thất bại. Đây mình nhìn thấy thất bại hơi nhiều mà chưa thấy thành công mấy, nên không dám chia sẻ là tránh những thứ trên các bạn sẽ thành công. Tuy nhiên các bạn hãy cứ ghi nhớ 1 vài nguyên tắc cơ bản trong đầu để không mắc lại những sai lầm của bọn mình là được.

Nên nhớ rằng, 1 hệ thống thiết kế tốt thực sự sẽ không phải là **hệ thống 100k req/s** hello world mà sẽ là hệ thống **1k req/s** nhưng thực sự trả về thông tin gì đó có ích. Cân bằng được giữa các yếu tố **nguồn lực kinh tế** - **business phù hợp** - **chịu tải tương đối** - **mở rộng khi cần** sẽ giúp các bạn có những giải pháp công nghệ hiệu quả. 

Cảm ơn các bạn đã đón xem.