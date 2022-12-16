![](https://images.viblo.asia/b11aa1d9-61b2-4a97-b928-2fb336509b92.jpg)

Uniswap thì đã được nhắc đến rất nhiều trong thị trường cryptocurrency thời gian qua với sự kiện tặng cho bất kì ai có giao dịch với Uniswap v1 và v2 sẽ nhận được phần quà airdrop 400 UNI. Mà có thời điểm giá UNI đã lên hơn 8$/UNI  thì tổng giải thưởng là hơn 3200$ một món quà trên trời rơi xuống vô cùng bất ngờ, dù không muốn nhận nhưng người dùng vẫn phải nhận :sweat_smile::sweat_smile:

Ngay lập tức Uniswap đã được mọi người chú ý vì điều mà họ làm nó giống như một vụ nổ vậy, một chiêu bài marketing rất chi là thành công mà chẳng mất gì. Thì hôm nay mình sẽ cùng mọi người đi vào tìm hiểu về Uniswap để những bạn nào con chưa biết về nền tảng này có thể hiểu về nó, biết nó vận hành ra sao và những sự đơn giản đến vi diệu nhưng vẫn tạo ra hiệu quả đáng bất ngờ bên trong. Nhìn trang web đơn giản như thế này thôi nhưng cả một bầu trời tri thức đấy.

![](https://images.viblo.asia/51b7d37c-af1f-42f4-84cb-47bfdd576b63.png)

# Uniswap là gì?
Muốn làm gì thì làm nhưng đầu tiên chúng ta cứ phải đi vào khái niệm xem nó là cái gì cái đã. Thì thằng uniswap này là một nền tảng Decentralized Exchange, nó nó cho phép mọi người có thể swap các loại token ERC-20 với nhau, mà không cần phải đợi khớp lệnh như những sàn Centralized Exchange truyền thống (Binance, Bitmex, OKex,...). Thay vào đó nó sẽ sử dụng smart contract để tạo ra các pool giữa các ERC-20, để bất kỳ ai và bất kỳ lúc nào người dùng cũng có thể swap các token với nhau, miễn là có pool cho cặp token đó. Mà pool này thì ai cũng có thể tạo và cung cấp thanh khoản được, nên như ở tiêu đề của bài viết mình đã nói thì đây có thể là con đường lên sàn cho các đồng coin mới. Vì bây giờ sẽ không cần thiết phải được sự cho phép của các sàn tập trung nữa, một đội phát triển có  thể tạo pool token của mình với ETH một cách dễ dàng và thông báo Presale. À nhưng có vấn đề đó là để tạo pool bạn cần thiết lập giá trị cho coin của mình bằng cách tạo ra một tỷ lệ amount giữa token của bạn và token đã có trước như ETH chẳng hạn ( ATOKEN <-> ETH). Cái tỷ lệ này mình sẽ giải thích nó ở phần nguyên lý hoạt động, vậy là bài toàn quả trứng con gà lại xuất hiện. Đang nghèo muốn mang token đi bán để có nhiều tiền mà chợt nhận ra điều đầu tiên để bán được token là bạn phải có nhiều tiền trước đã :laughing::laughing::laughing:

# Nguyên lý hoạt động của Uniswap

Nào đi vào nguyên lý hoạt động nào. Hiện Uniswap đã có bản nâng cấp nên V2 nhưng các yếu tố cốt lõi thì vẫn chủ yếu ở V1, V2 chỉ là một vài điểm cải tiến và thêm mới vào. Thì theo như mình tìm hiểu được từ V1 và đọc smart contract trong repo của họ, thì Uniswap sẽ có một contract tổng nó là contract factory - giống như contract mẹ. Sau đó từ contract mẹ này sẽ sinh ra các contract con, các contract con này chính là các pool. Đây là nơi lưu trữ lượng token của những cặp swap, ví dụ cặp DAI-ETH thì contract này sẽ giữ cả lượng DAI lẫn ETH mà liquidity Provider - **LP** (nhà cung cấp thanh khoản deposit vào).

![](https://images.viblo.asia/94f58eeb-fe09-4ef1-9921-728906138b12.png)


Đó giờ thì mọi người đã hiểu nó không sử dụng một contract để lưu trữ các pool vào mapping - mảng đâu mà thay vào đó nó sẽ tạo ra contract mới làm nhiệm vụ lưu trữ thông tin vào - ra của pool. Còn contract tổng chỉ có nhiệm vụ là lưu trữ địa chỉ của các pool này sau khi được tạo ra mà thôi. Về sau thì giá cả khi swap trên các pool này sẽ được thị trường tự quyết định. Vâng tại sao lại do thị trường tự quyết định thì ta hãy cùng đi vào nguyên lý của các pool này hoạt động nha

### Swap

**Constant Product Market Maker Model - Hằng Số Tạo Lập Thị trường.**

Trong các pool của Uniswap luôn tồn tại một công thức là: **x * y = k**
- Với **x** là số lượng token A.
- Và **y** là lượng token B

Người tạo pool hay hay chính là LP đầu tiên của pool sẽ quyết định hệ số này bằng việc deposit với lượng token tùy ý. Và điều này sẽ quyết định giá của token.

**Ví dụ:**

Giả sử pool được tạo có tên là ETH/DAI với 10 ETH và 1000 DAI.

Ta sẽ có: 

- x * y = k ⇔ 10*1000 = 10,000.

<br/>

Giá 1 ETH = 100 DAI và Giá 1 DAI = 0.01 ETH.

<br/>

##### Trường hợp 1: Swap DAI lấy ETH.
<br/>

Trader A vào pool này và swap 500 DAI + 0.3% phí để đổi lấy ETH.

- =>  y’ = 500 + 1000 = 1500 DAI.

**k** không đổi, vẫn bằng 10,000.

- => x' = 6.66 ETH.

Suy ra trader nhận được x - x' = 10 - 6.66 = 3.33 ETH, tương đương giá trị 500 DAI. 

- => giá 1 ETH = 150 DAI, tăng 50% so với giá ban đầu.

<br/>

##### Trường hợp 2: Swap ETH lấy DAI.

<br/>

Trader B bán 6 ETH để đổi lấy DAI. 

- => x' = 10 + 6 = 16. 

- => y’ = 10,000/16= 625. 

Suy ra trader nhận được y - y' = 1000 - 625 = 375 DAI, tương đương giá trị 6 ETH.

- => giá 1 ETH = 62,5 DAI, giảm 37.5% so với giá ban đầu.

<br/>

Lưu ý: Nếu mức trượt giá là quá lớn, Uniswap sẽ có cảnh báo trước khi anh em tiến hành swap hiển thị thông báo.

Đây là sơ đồ mà trong docs của Uniswap mô tả công thức này 

![](https://images.viblo.asia/01c5e6e5-e999-4f02-af4f-2e1c0956641e.jpg)

Mọi người sẽ tự hỏi vậy giá bị chênh lệch như thế làm sao có thể tin tưởng và swap được. Đừng lo vì khi thấy sự chênh lệch này sẽ luôn có các trader thông mình  họ thấy có sự chênh lệch giá này so với các sàn Decentralized Exchange hoặc Centerlized Exchange khác họ sẽ chẳng bỏ qua cơ hội kiếm lời. Bằng cách mua token ở các sàn có tỷ giá thấp hơn và mang đến Uniswap để swap kiếm lời. Một ý tưởng rất hay và thông minh đến từ Uniswap, họ để người dùng tự quyết định giá của token trong pool mà lại vừa không cần sử dụng đến Oracle của bên thứ ba để lấy giá.

### Pools

Như đã giới thiệu ở trên thì mỗi pool sẽ là địa chỉ một contract nắm giữ lượng token của một cặp ERC-20. Khi một contract pool mới tạo ra thì balance của mỗi token là 0. Để bắt đầu cung cấp giao dịch thì LP cần deposit amount cho từng token. LP đầu tiên sẽ là người quyết định tỷ giá ban đầu cho pool đó.

![](https://images.viblo.asia/1a8a5963-15be-4942-9e63-2fbfb3d18b44.jpg)


LP được khuyến khích cung cấp giá trị của 2 token bằng nhau. Bằng nhau về **giá trị** nha chứ không phải về **số lượng**, kiểu 1000$ token DAI và 1000$ token ETH với giá của chúng tại thời điểm deposit. Vì nếu họ mà đưa vào với một lượng giá trị khác nhau sẽ vô tình làm giá của cặp token trong pool lệch so với giá trị thực tế mà ngoài thị trường quy định. Điều này sẽ dẫn đến việc các trader thông minh nhảy vào swap để kiếm chênh lệch và người bị thiệt mất token chính là LP. Chính vì vậy Uniswap khuyên LP nên cung cấp giá trị bằng nhau là vì thế.

Khi LP cung cấp thanh khoản cho Pool, họ sẽ nhận lại được **Liquidity Token**, tương đương lượng thanh khoản họ đã cung cấp cho pool. Các token này đại diện cho sự đóng góp của LP vào pool. Mỗi khi có người swap thì fee của giao dịch là 0.3% sẽ được chia sẻ theo tỷ lệ đóng góp của từng LP, những người đóng góp càng nhiều sẽ nhận được càng nhiều và ngược lại. Và bất cứ khi nào LP muốn rút tiền của mình đã đóng góp và lượng phần thưởng được chia, họ sẽ cần burn lượng liquidity token mà mình nắm giữ, nên ở đây ta có thể hiểu liquidity token giống như một loại token quản trị giúp quản lý lượng tiền vào - ra của pool và thành phần đóng góp của từng LP.

### Flash Swap
Flash swaps  thì đã xuất hiện trọng V2 của Uniswap nó cho phép bạn rút tối đa toàn bộ dự trữ của bất kỳ token ERC20 nào trên Uniswap và thực hiện logic tùy ý mà không cần đặt cọc trước một khoản, miễn là vào cuối giao dịch bạn cầntrả lại các token ERC20 đã rút cùng với một khoản phí nhỏ. Ta sẽ cùng lấy một ví dụ về sự hữu ích của flash swap này như sau:

**Ví dụ:**

Nhờ vào quy luật tạo lập thị trường của Uniswap nên khả năng xuất hiện chênh lệch giá giữa Uniswap và các sàn khác rất hay xảy ra. Nhưng sự chênh lệch này sẽ chỉ phù hợp cho những người có sẵn tài sản, họ ngay lấy tức có thể tận dụng cơ hội ngay. Điều này gây thiệt thòi cho những người không có sẵn tài họ sẽ thường không thể chớp được cơ hội này vì không có tài sản để swap. Nhưng giờ đây flash swap xuất hiện nó giúp tạo nên sự công bằng, ngay cả những  người không có sẵn tài sản để swap thì họ cũng có thể vay tạm lượng token và mang đi giao dịch kiếm lời. Miễn là đến cuối cùng của giao dịch flash swap người dùng này  trả lại lượng token mình đã vay và thanh toán được các phí gas.  


### Oracles

Đối với các ứng dụng  decentralized financial như lending, margin trading, prediction markets thì vấn đề feed giá đóng một vai trò vô cùng quan trọng. Các ứng dụng này thường sử dụng một oracle của bên thứ ba để làm nhiệm vụ này, oracle tiêu biểu nhất trong Ethereum là Chainlink. Mặc dù giá của Uniswap đã được thiết kết để có thể phụ thuộc vào cung cầu của thị trường nhưng thự sự nó vẫn gặp một số vấn đề không an toàn. Như ở V1 thì những kẻ tấn công vẫn có thể thực hiện thao túng được giá, thì để giải quyết các vấn đề này thì trong V2 Uniswap đã đề xuất cải tiến Oracle.

Đầu tiên sẽ có một cặp giá trị đo lường giá của thị trường sẽ được khởi tạo ở đầu mỗi khối, trước khi có bất kỳ giao dịch nào được diễn ra. Để thay đổi giá này thành giá không đồng bộ với giá của thị trường bên ngoài, kẻ tấn công phải thực hiện được một giao dịch làm thay đổi giá cuối cùng ở khối trước đó, nhưng không có gì đảm bảo rằng kẻ này có thể làm cho giá đó là giá bắt đầu của khối tiếp theo. Nếu không thành công kẻ tấn công sẽ bị mất tiền do những trade kiếm tiền chênh lệch giá sẽ nhảy vào, trừ khi hắn có thể  “selfishly” đào được 2 khối liên tiếp, đây là một thử thách vô cùng khó để có thể xảy ra.

Nhưng chỉ điều này thôi thì không đủ. Nếu thực sự giải quyết được vấn đề này thì lợi nhuận thu được vẫn có thể sẽ lớn hơn chi phí chúng bỏ ra thì để làm khó hơn bài toán về kinh tế này. Trong Uniswap v2 đã thêm giá cuối của khối vào một biến giá tích lũy trong hợp đồng pool và được tính theo khoảng thời gian giá này tồn tại. Như ví dụ dưới đây thì biến số này sẽ đại diện cho tổng giá của Uniswap cho mỗi giây trong toàn bộ lịch sử của contract pool.

![](https://images.viblo.asia/3054d81f-b734-4066-8773-c256c0bbad4a.png)

Các contract bên ngoài có thể sử dụng biến này để theo dõi time-weighted average prices (giá trung bình theo khoảng thời gian) - **TWAPs** bất kỳ lúc nào.

Điều này được thực hiện bằng cách đọc giá tích lũy từ cặp token ERC-20 ở đầu và cuối khoảng thời gian. Sự khác biệt về giá tích lũy này sau đó có thể được chia cho độ dài của khoảng thời gian và tạo ra TWAP trong khoảng thời gian đó. 

![](https://images.viblo.asia/8b616488-7fd8-4e43-9b9c-dfdee465733f.png)

TWPs thì có thể được sử dụng trực tiếp hoặc làm cơ sở cho các công cụ đo lường động ví dụ EMA hay SMA khi cần thiết

Một số lưu ý :

- Đối với TWAP của 10 phút thì cứ 10 phút sẽ lấy mẫu một lần. Đối với TWAP 1 tuần sẽ lấy mẫu mỗi tuần 1 lần.
- Đối với TWAP đơn giản thì chi phí tính toán tăng (xấp xỉ tuyến tính) với thanh khoản trên Uniswap, cũng như với khoảng thời gian mà bạn  trung bình.
- Chi phí một cuộc tấn công tương đối đơn giản để ước tính. Thay đổi 5% giá trên TWAP trong 1 giờ xấp xỉ số tiền bị mất đối với chênh lệch giá và chi phí thay đổi giá 5% mỗi khối trong 1 giờ

Tóm lại Uniswap V2 sẽ giới thiệu 2 biến mới trong mỗi pool là **price0CumulativeLast** và **price1CumulativeLast**, chúng sẽ lưu trữ giá của token0 và token1 tương ứng nhân với khoảng thời gian chúng được quan sát (tính theo giây). Các biến này có tính tích lũy, có nghĩa là chúng ngày càng tăng lên. Chúng được cập nhật với `swap`/`mint`/`burn` đầu tiên của mỗi khối. 

# Tổng kết
Thông qua bài viết này hi vọng một số bạn đọc có thể hiểu tổng quát được về các thức cũng như, những nguyên lý hoạt động bên trong một giao diện đơn giản kia, nhưng nó không hề đơn giản chút nào. Chính những sự khác biệt đến từ sự đơn giản này đã giúp Uniswap trở thành ngôi sao sáng của làng DeFi những ngày gần đây. Cảm ơn các bạn đã chú ý đón đọc rất vui và hẹn gặp lại mọi người trong các bài viết tiếp theo.