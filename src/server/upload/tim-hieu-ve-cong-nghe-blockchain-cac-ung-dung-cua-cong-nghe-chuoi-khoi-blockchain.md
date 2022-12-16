# I. Công nghệ Blockchain là gì?
![](https://images.viblo.asia/6d141f86-2d85-4674-81bc-d8699c290bb5.jpg)

Blockchain tên gọi ban đầu là block chain (chuỗi khối) – là một cuốn sổ cái ghi lại thông tin số dư và lịch sử của tất cả tài khoản tham gia vào chuỗi giao dịch của mình.
Mỗi khối chứa thông tin trong hệ thống blockchain thường được gọi là "block". Các block đều chứa thông tin về thời gian khởi tạo và được liên kết với khối trước đó, kèm theo đó là một mã thời gian và dữ liệu giao dịch. Dữ liệu khi đã được mạng lưới chấp nhận thì sẽ không có cách nào thay đổi được. Vì vậy, có thể nói Blockchain ra đời để chống gian lận và thay đổi các dữ liệu trong các giao dịch.

Cụ thể hơn, một blockchain là một chuỗi tuyến tính gồm nhiều khối được kết nối và được bảo đảm bằng các bằng chứng mật mã. Một blockchain thường được xây dựng như một hệ thống phân tán có chức năng như một sổ cái phi tập trung. Điều này có nghĩa là có nhiều bản sổ cái (phân tán) và không có tổ chức nào nắm quyền kiểm soát duy nhất (phi tập trung). Nói một cách đơn giản, mỗi người dùng tham gia vào mạng blockchain sẽ giữ một bản sao điện tử của dữ liệu blockchain. Dữ liệu blockchain được cập nhật thường xuyên tất cả các giao dịch mới nhất và đồng bộ với bản sao của người dùng.

Nói cách khác, một hệ thống phân tán được duy trì bởi công việc tập thể của nhiều người dùng trên khắp thế giới. Những người dùng này còn được gọi là các node mạng, và tất cả các node này đều tham gia vào quá trình xác minh và xác thực giao dịch theo các quy tắc của hệ thống. Do đó, quyền lực là phi tập trung.
Công nghệ Blockchain cũng có thể được áp dụng trong các lĩnh vực khác không nhất thiết phải có các hoạt động tài chính. Trong bối cảnh tiền điện tử, blockchain có vai trò lưu giữ hồ sơ vĩnh viễn của tất cả các giao dịch đã được xác nhận.

# II. Lịch sử Blockchain?
![](https://images.viblo.asia/7103f99c-da40-4c68-bd25-852aaa1e67c0.png)

Ý tưởng đằng sau công nghệ blockchain được mô tả ngay từ năm 1991 khi các nhà nghiên cứu Stuart Haber và W. Scott Stornetta giới thiệu một giải pháp thực tế về mặt tính toán để đánh dấu thời gian các văn bản số để chúng không bị đề lùi ngày về trước hoặc can thiệp vào. 
Hệ thống đã sử dụng một chuỗi gồm các khối được bảo mật bằng mật mã để lưu trữ các văn bản được đánh dấu thời gian, và năm 1992, các cây Merkle đã được tích hợp vào thiết kế, khiến nó trở nên hiệu quả hơn bằng cách cho phép một khối có thể tập hợp một vài văn bản. Tuy nhiên, công nghệ này đã không được sử dụng và bằng sáng chế đã hết hạn vào năm 2004, bốn năm trước khi Bitcoin ra đời.

Năm 2004, nhà khoa học máy tính và người theo chủ nghĩa mật mã Hal Finney (Harold Thomas Finney II) đưa ra một hệ thống gọi là RPoW, Proof Of Work Tái sử dụng. Hệ thống hoạt động bằng cách nhận một Hashcash không thể thay đổi hoặc không thể thay thế dựa trên token proof of work, và đổi lại đã tạo ra một token đã được ký RSA mà sau đó có thể được trao đổi trực tiếp từ người này sang người khác. 
RPoW đã giải quyết vấn đề vì tiêu dùng hai lần bằng cách lưu giữ quyền sở hữu các token đã đăng ký trên một máy chủ đáng tin cậy; máy chủ này được thiết kế để cho phép người dùng trên toàn thế giới xác minh tính chính xác và liêm chính trong thời gian thực. 
RPoW có thể được xem là một thử nghiệm ban đầu và là những bước đầu tiên quan trọng trong lịch sử tiền điện tử.

Vào cuối năm 2008, cuốn sách trắng giới thiệu về hệ thống tiền mặt điện tử mạng ngang hàng, phi tập trung – tên là Bitcoin – đã được đăng trên danh sách nhận thư về mật mã học bởi một người hoặc tổ chức lấy biệt danh là Satoshi Nakamoto.
Dựa trên thuật toán proof of work Hashcash, nhưng thay vì sử dụng một hàm tính toán dựa trên phần cứng như RPoW, tính năng chống chi tiêu hai lần trong Bitcoin được cung cấp bởi một giao thức mạng ngang hàng để theo dõi và xác thực các giao dịch. Nói ngắn gọn, các thợ đào “đào” Bitcoin để nhận phần thưởng bằng cách sử dụng cơ chế proof-of-work và sau đó xác minh bằng các node phi tập trung trong mạng.
Vào ngày 3 tháng 1 năm 2009, Bitcoin ra đời khi Satoshi Nakamoto đào được khối bitcoin đầu tiên, đem lại phần thưởng 50 bitcoin. Người nhận Bitcoin đầu tiên là Hal Finney, ông ta nhận được 10 bitcoin từ Satoshi Nakamoto trong giao dịch bitcoin đầu tiên của thế giới vào ngày 12 tháng 1 năm 2009.

# III. Nguyên lý hoạt động của Blockchain
![](https://images.viblo.asia/d0b067ff-b760-479f-b0f3-2752ea78aee3.png)

### 1. Nguyên lý mã hoá

Trên thực tế, cuốn sổ cái luôn được duy trì bởi các máy tính trong mạng ngang hàng được kết nối với nhau. Vì thế, nó sẽ có một số điểm khác biệt:​

Trong hệ thống ngân hàng, chúng ta chỉ biết các giao dịch và số dư tài khoản của riêng mình thì trên blockchain của bitcoin bạn có thể xem các giao dịch của tất cả mọi người.​
Mạng lưới Bitcoin là mạng lưới phân tán không cần bên thứ ba đóng vai trò trung gian xử lý giao dịch.​
Hệ thống blockchain được thiết kế theo cách không yêu cầu sự tin cậy và bảo đảm bởi độ tin cậy có được thông qua các hàm mã hóa toán học đặc biệt.​
Để có thể thực hiện các giao dịch trên blockchain, bạn cần một phần mềm sẽ cho phép bạn lưu trữ và trao đổi các đồng Bitcoin của bạn gọi là ví tiền điện tử. Ví tiền điện tử này sẽ được bảo vệ bằng một phương pháp mã hóa đặc biệt đó là sử dụng một cặp khóa bảo mật duy nhất: khóa riêng tư (private key) và khóa công khai (public key).

Nếu một thông điệp được mã hóa bằng một khóa công khai cụ thể thì chỉ chủ sở hữu của khóa riêng tư là một cặp với khóa công khai này mới có thể giải mã và đọc nội dung thông điệp.

Khi mã hóa một yêu cầu giao dịch bằng khóa riêng tư, có nghĩa là bạn đang tạo ra một chữ ký điện tử được các máy tính trong mạng lưới blockchain sử dụng để kiểm tra chủ thể gửi và tính xác thực của giao dịch. Chữ ký này là một chuỗi văn bản và là sự kết hợp của yêu cầu giao dịch và khóa riêng tư của bạn.

Nếu một ký tự đơn trong thông điệp yêu cầu giao dịch này bị thay đổi thì chữ ký điện tử sẽ thay đổi theo. Vì thế, hacker khó có thể thay đổi yêu cầu giao dịch của bạn hoặc thay đổi số lượng Bitcoin mà bạn đang gửi.
![](https://images.viblo.asia/0a13dab7-b933-4b55-b554-44904c3170f5.png)

Để gửi Bitcoin (BTC), bạn cần chứng minh rằng bạn sở hữu khóa riêng tư của một chiếc ví điện tử cụ thể bởi bạn cần sử dụng nó để mã hóa thông điệp yêu cầu giao dịch. Sau khi tin nhắn của bạn đã được gửi đi và được mã hóa thì bạn không cần phải tiết lộ khóa riêng tư của bạn nữa.

### 2. Quy tắc của sổ cái

Mỗi nút trong blockchain đều đang lưu giữ một bản sao của sổ kế toán. Do vậy, mỗi nút đều biết số dư tài khoản của bạn là bao nhiêu. Hệ thống blockchain chỉ ghi lại mỗi giao dịch được yêu cầu chứ không hề theo dõi số dư tài khoản của bạn.

Để biết số dư trên ví điện tử của mình thì bạn cần xác thực và xác nhận tất cả các giao dịch đã diễn ra trên mạng lưới mà có liên quan tới ví điện tử của bạn.
![](https://cafebitcoin.info/wp-content/uploads/2017/08/giao-dich-chua-tieu.png)

Việc xác minh “số dư” này được thực hiện nhờ các tính toán dựa vào liên kết đến các giao dịch trước đó. Nhìn vào hình trên, để gửi 10btc cho John, Mary cần tạo yêu cầu giao dịch bao gồm các liên kết đến các giao dịch đã diễn ra trước đó với tổng số dư bằng hoặc vượt quá 10 btc.

Các liên kết này được xem như là giá trị đầu vào, các nút trong mạng lưới sẽ xác minh xem tổng số tiền của các giao dịch này bằng hoặc vượt quá 10 btc không. Tất cả điều này được thực hiện tự động trong ví điện tử của Mary và được kiểm tra bởi các nút trên mạng lưới Bitcoin, Mary chỉ gửi một giao dịch 10 bitcoin tới ví của John bằng khóa công khai của John.
![](https://cafebitcoin.info/wp-content/uploads/2017/08/giao-dich-dau-vao.png)

Vậy, làm thế nào hệ thống có thể tin tưởng các giao dịch đầu vào này và xác thực tính hợp lệ của chúng?

Thực tế là các nút sẽ kiểm tra tất cả các giao dịch có liên quan đến ví tiền điện tử bạn sử dụng trước đó để gửi Bitcoin (BTC) thông qua việc tham chiếu các lịch sử giao dịch. Có một bản ghi sẽ lưu trữ số BTC chưa được dùng và được các nút mạng lưu giữ giúp đơn giản hóa và tăng tốc quá trình xác minh. Vì thế, các ví tiền điện tử tránh được tình trạng chi tiêu đúp giao dịch.

=> “Như vậy sở hữu Bitcoin có nghĩa là có các giao dịch được lưu trong sổ kế toán liên hệ đến địa chỉ ví của bạn mà chưa được sử dụng làm giao dịch đầu vào.”

Mã nguồn trên mạng lưới Bitcoin là nguồn mở, có nghĩa là bất kỳ ai có máy tính kết nối được internet đều có thể tham gia vào mạng lưới và thực hiện giao dịch.

Tuy nhiên, nếu có bất kỳ một lỗi nào trong mã nguồn được sử dụng để phát thông báo yêu cầu giao dịch thì các Bitcoin liên quan sẽ bị mất vĩnh viễn.

### 3. Nguyên lý tạo khối
Các giao dịch sau khi được gửi lên trên mạng lưới blockchain sẽ được nhóm vào các khối và các giao dịch trong cùng 1 khối (block) được coi là đã xảy ra cùng thời điểm. Các giao dịch chưa được thực hiện trong 1 khối được coi là chưa được xác nhận.

Mỗi nút có thể nhóm các giao dịch với nhau thành một khối và gửi nó vào mạng lưới như một hàm ý cho các khối tiếp theo được gắn vào sau đó.

Bất kỳ nút nào cũng có thể tạo ra một khối mới. Vậy, câu hỏi đặt ra là: hệ thống sẽ đồng thuận với khối nào? khối nào sẽ là khối tiếp theo?

Để được thêm vào blockchain, mỗi khối phải chứa một đoạn mã đóng vai trò như một đáp án cho một vấn đề toán học phức tạp được tạo ra bằng hàm mã hóa băm không thể đảo ngược.

Cách duy nhất để giải quyết vấn đề toán học như vậy là đoán các số ngẫu nhiên, những số khi mà kết hợp với nội dung khối trước tạo ra một kết quả đã được hệ thống định nghĩa. Điều này nhiều khi có thể mất khoảng một năm cho một máy tính điển hình với một cấu hình cơ bản có thể đoán đúng các con số đáp án của vấn đề toán học này.

Mạng lưới quy định mỗi khối được tạo ra sau một quãng thời gian là 10 phút một lần, bởi vì trong mạng lưới luôn có một số lượng lớn các máy tính đều tập trung vào việc đoán ra dãy số này. Nút nào giải quyết được vấn đề toán học như vậy sẽ được quyền gắn khối tiếp theo lên trên chuỗi và gửi nó tới toàn bộ mạng lưới.

Vậy điều gì sẽ xảy ra nếu hai nút giải quyết cùng một vấn đề cùng một lúc và truyền các khối kết quả của chúng đồng thời lên mạng lưới? Trong trường hợp này, cả hai khối được gửi lên mạng lưới và mỗi nút sẽ xây dựng các khối kế tiếp trên khối mà nó nhận được trước tiên.

Tuy nhiên, hệ thống blockchain luôn yêu cầu mỗi nút phải xây dựng trên chuỗi khối dài nhất mà nó nhận được. Vì vậy, nếu có sự mơ hồ về việc block nào là khối cuối cùng thì ngay sau khi khối tiếp theo được giải quyết thì mỗi nút sẽ áp dụng vào chuỗi dài nhất.
![](https://cafebitcoin.info/wp-content/uploads/2017/08/nguyen-ly-tao-khoi.png)

Do xác suất việc xây dựng các block đồng thời là rất thấp nên hầu như không có trường hợp nhiều khối được giải quyết cùng một lúc và nhiều lần tạo ra các khối nối đuôi khác nhau. Do đó, toàn bộ chuỗi-khối sẽ nhanh chóng ổn định và hợp nhất lại khi mà mọi nút đều đồng thuận.

### 4. Thuật toán bảo mật Blockchain
Nếu có bất kỳ sự bất đồng về khối đại diện sau cùng của chuỗi thì điều này sẽ dẫn đến khả năng gian lận. Nếu một giao dịch xảy ra trong 1 khối thuộc về đuôi ngắn hơn khi khối tiếp theo được giải quyết, giao dịch đó sẽ trở lại thành giao dịch chưa được xác nhận vì tất cả các giao dịch khác được nhóm vào trong khối kia.

[](https://cafebitcoin.info/wp-content/uploads/2017/08/tan-cong-blockchain.png)
Mỗi block chứa một tham chiếu đến khối trước đó, và tham chiếu đó là một phần của vấn đề toán học cần được giải quyết để truyền khối sau tới mạng lưới.
Vì vậy, rất khó để tính toán trước một loạt các block bởi nó cần tính ra một số lượng lớn các số ngẫu nhiên cần thiết để giải quyết một khối và đặt nó trên blockchain. 

Các giao dịch trong mạng lưới blockchain của bitcoin được bảo vệ bởi một cuộc chạy đua tính toán toán học: với bất kỳ kẻ tấn công nào muốn cạnh tranh với toàn bộ mạng lưới.

Do đó, giao dịch ngày càng an toàn hơn theo thời gian. Và những khối đã được thêm vào chuỗi trong quá khứ bao giờ cũng an toàn hơn so với những khối mới được thêm vào. Bởi một block được thêm vào chuỗi trung bình cứ 10p một lần cho nên trong khoảng 1h kể từ khi giao dịch được nhóm vào trong khối đầu tiên của nó sẽ tạo ra một xác suất khá cao rằng giao dịch đã được xử lý và không thể đảo ngược.

# IV. Đặc điểm chính của công nghệ Blockchain

Công nghệ Blockchain (Blockchain technology) đóng vai trò giống như một cuốn sổ cái ghi lại tất cả các giao dịch xảy ra trong hệ thống. 
Các đặc điểm chính của blockchain có thể kể đến như:

- Không thể làm giả, không thể phá hủy các chuỗi blockchain: Các chuỗi Blockchian gần như không thể bị phá hủy được, và theo lý thuyết thì chỉ có máy tính lượng tử mới có thể can thiệp vào và giải mã chuỗi blockchain và nó chỉ bị phá hủy hoàn toàn khi không còn internet trên toàn cầu
- Bất biến: Dữ liệu trong blockchan gần như không thể sửa đổi được (chỉ có thể sửa đổi được bởi chính người đã tạo ra nó, nhưng phải được sự đồng thuận của các nút trên mạng) và các dữ liệu đó sẽ lưu giữ mãi mãi
- Bảo mật Dữ liệu: Các thông tin, dữ liệu trong các chuỗi blockchain được phân tán và an toàn tuyệt đối chỉ có người nắm giữ private key mới có quyền truy xuất dữ liệu đó
- Minh bạch: Ai cũng có thể theo dõi được đường đi của dữ liệu trong blockchain từ địa chỉ này tới địa chỉ khác và có thể thống kê toàn bộ lịch sử trên địa chỉ đó.
- Hợp đồng thông minh: là các kỹ thuật số được nhúng bởi một đoạn code if-this-then-that (IFTTT) trong hệ thống, cho phép chúng tự thực thi mà không cần bên thứ ba. Blockchain không cần bên thứ ba tham gia vào hệ thống, và nó bảo đảm rằng tất cả các bên tham gia đều biết được chi tiết hợp đồng và các điều khoản sẽ được tự động thực hiện một khi các điều kiện được bảo đảm.

# V. Các loại trong hệ thống Blockchain
Trong hệ thống Blockchain chia thành 3 loại chính gồm:
- Public:
 Đây là hệ thống blockchain mà bất kỳ ai cũng có quyền đọc và ghi dữ liệu trên Blockchain được. Quá trình xác thực giao dịch trên Blockchain này đòi hỏi phải có hàng nghìn hay thậm chí là hàng vạn nút tham gia. Do đó để tấn công vào hệ thống Blockchain này là điều bất khả thi vì chi phí rất cao. Ví dụ về public blockchain: Bitcoin, Ethereum…
- Private: 
 Đây là hệ thống blockchain cho phép người dùng chỉ được quyền đọc dữ liệu, không có quyền ghi vì điều này thuộc về một bên thứ ba tuyệt đối tin cậy. Bên thứ ba này có thể hoặc không cho phép người dùng đọc dữ liệu trong một số trường hợp. Bên thứ ba toàn quyền quyết định mọi thay đổi trên Blockchain. Vì đây là một Private Blockchain, cho nên thời gian xác nhận giao dịch khá nhanh vì chỉ cần một lượng nhỏ thiết bị tham gia xác thực giao dịch. Ví dụ: Ripple là một dạng Private Blockchain, hệ thống này cho phép 20% các nút là gian dối và chỉ cần 80% còn lại hoạt động ổn định là được.
- Permissioned: 
 Hay còn gọi là Consortium, là một dạng của Private Blockchain nhưng bổ sung thêm một số tính năng nhất định, kết hợp giữa “niềm tin” khi tham gia vào Public và “niềm tin tuyệt đối” khi tham gia vào Private. Ví dụ: Các ngân hàng hay tổ chức tài chính liên doanh sẽ sử dụng Blockchain cho riêng mình.
 
# VI. Các phiên bản trong hệ thống Blockchain
Hiện tại thì công nghệ blockchain có 3 phiên bản chính gồm:
- Blockchain 1.0 – Tiền tệ và Thanh toán: 
Là phiên bản sơ khai và đầu tiên của blockchain, ưng dụng chính của phiên bản này là các công việc liên quan đến tiền mã hoá: bao gồm việc chuyển đổi tiền tệ, kiều hối và tạo lập hệ thống thanh toán kỹ thuật số. Đây cũng là lĩnh vực quen thuộc với rất nhiều ngườt nhất, đôi khi khá nhiều người lầm tưởng Bitcoin và Blockchain là một.

- Blockchain 2.0 – Tài chính và Thị trường:
  Đây là phiên bản thứ 2 của blockchain, ứng dụng của nó là xử lý tài chính và ngân hàng: mở rộng quy mô của Blockchain, đưa blockchain tích hợp vào các ứng dụng tài chính và thị trường. Các tài sản bao gồm cổ phiếu, chi phiếu, nợ, quyền sở hữu và bất kỳ điều gì có liên quan đến thỏa thuận hay hợp đồng.

- Blockchain 3.0 – Thiết kế và Giám sát hoạt động:
 Hiện tại đây đang là phiên bản cao nhất của blockchain, với phiên bản này, công nghệ Blockchain sẽ vượt khỏi biên giới chỉ phục vụ cho lĩnh vực tài chính, và đi vào các lĩnh vực khác như giáo dục, chính phủ, y tế và nghệ thuật…

# VII. Các cơ chế đồng thuận trong Blockchain

Cơ chế đồng thuận trong Blockchain có thể hiểu như cách thức mà mọi người quản lý trong hệ thống blockchain có thể đồng ý cho một giao dịch xảy ra trong hệ thống. 
Dưới đây là các loại cơ chế đồng thuận phổ biến trong blockchain:

- Proof of Work (Bằng chứng Công việc):
  Đây là cơ chế đồng thuận phổ biến nhất, được dùng trong Bitcoin, Ethereum, Litecoin, Dogecoin và hầu hết các loại tiền mã hoá. Đây là cơ chế đồng thuận tiêu tốn khá nhiều điện năng.

- Proof of Stake (Bằng chứng Cổ phần):
  Đây là cơ chế đồng thuận phổ biến trong Decred, Peercoin và trong tương lai là Ethereum và nhiều loại tiền mã hoá khác. Cơ chế đồng thuận này phân cấp hơn, tiêu hao ít năng lượng và không dễ gì bị đe doạ.

- Delegated Proof-of-Stake (Uỷ quyền Cổ phần):
 Đây là cơ chế đồng thuận phổ biến trong Steemit, EOS, BitShares. Cơ chế đồng thuận này có chi phí giao dịch rẻ; có khả năng mở rộng; hiệu suất năng lượng cao. Tuy nhiên vẫn một phần hơi hướng tập trung vì thuật toán này lựa chọn người đáng tin cậy để uỷ quyền.

- Proof of Authority (Bằng chứng Uỷ nhiệm):
 Đây là cơ chế đồng thuận phổ biến thường thấy trong POA.Network, Ethereum Kovan testnet. Cơ chế đồng thuận này có hiệu suất cao, có khả năng mở rộng tốt.

- Proof-of-Weight (Bằng chứng Khối lượng /Càng lớn càng tốt):
 Đây là cơ chế đồng thuận phổ biến trong Algorand, Filecoin. Cơ chế đồng thuận này có thể tuỳ chỉnh và khả năng mở rộng tốt. Tuy nhiên quá trình thúc đẩy việc phát triển sẽ là một thử thách lớn.

- Byzantine Fault Tolerance (Đồng thuận chống gian lận /Tướng Byzantine bao vây Blockchain):
 Đây là cơ chế đồng thuận phổ biến trong Hyperledger, Stellar, Dispatch, và Ripple. Cơ chế đồng thuận này có năng suất cao; chi phí thấp; có khả năng mở rộng. Tuy nhiên vẫn chưa thể tin tưởng hoàn toàn. 
 
#  VIII. Các ứng dụng của blockchain trong đời sống
![](https://images.viblo.asia/b2fd5105-0d32-4558-bc3e-19e62076d5e9.png)
Một số ngành công nghiệp mà công nghệ blockchain có thể tác động đến như:

Công nghệ ô tô Automotive (Automotive)

Chế tạo (Manufacturing)

Công nghệ, truyền thông và viễn thông (Tech, media & Telecommunications)

Dịch vụ tài chính (Financial Services)

Nghệ thuật & Giải trí (Art & Recreation)

Chăm sóc sức khỏe (Healthcare)

Bảo hiểm (Insurance)

Bán lẻ (Retail)

Khu vực công (Public Sector)

Bất động sản (Property)

Nông nghiệp (Agricultural)

Khai thác (Mining)

Vận tải và Logistics (Transport & Logistics)

Công trình hạ tầng kỹ thuật (Utility)
# IX. Reference:
https://vi.wikipedia.org/wiki/Blockchain
https://www.goldmansachs.com/insights/pages/blockchain/
https://www.binance.vision/vi/blockchain