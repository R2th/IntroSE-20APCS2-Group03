![](https://images.viblo.asia/0ab0e825-875e-4de5-abf6-a1a70a13bded.png)

Trend Defi mặc dù đã bớt nhiệt nhưng những sản phẩm nổi bật của làn sóng này mang lại thì  vẫn rất được người dùng ưa chuộng. Đặc biệt là các nền tảng Decentralized Exchange, tiêu biểu là Uniswap, SushiSwap, 1inch Exchange, FalconSwap,... Nhưng khi đã sử dụng các nền tảng DEx này mà không biết đến một công cụ sau đây thì quả thật là một một điều lãng phí. Công cụ mình muốn nói ở đây chính là [Dextool](https://www.dextools.io/), đây là một tool hỗ trợ giúp phân tích dữ liệu thời gian thực, giúp các traders có thể có được những chiến lược hợp lý, nhìn thấy được những tín hiệu từ thị trường hay cũng như kiếm được những khoảng chênh lệch giá lớn. Dựa trên việc lấy dữ lệu từ blockchain của các sàn DEX uy tín, mà ở tại thời điểm viết bài thì mới có của  [UniSwap](https://uniswap.org/).

Thì sau đây mình sẽ đi vào giới thiệu các chức năng chính của công cụ này, để mọi người có thế thấy được những tiện ích mà nó mang lại.

# DEXTboard

![](https://images.viblo.asia/fc5ee14f-b6e6-458c-ac7e-16a72f1f71df.png)

Ở trang DEXTboard này ta có thể nhìn thấy ngay trước mặt mình là phần các **Hot Pairs** đây là từ các dữ liệu tool tổng hợp được và đưa ra các Pair hot nhất, có nhiều trao đổi và được nhiều người chú ý tới nhất. Có thể giúp các trade biết được các đồng coin nào đang được được cộng đồng quan tâm, từ đó họ có thể tìm hiểu xem công nghệ bên trong của đồng coin đó là gì, có cơ hội lên các sàn CEX uy tín hay không,... Ngoài ra cũng có các thông tin của các coin của phần **Hot New** cũng khá hữu ích. Hiện tại thì các chức năng mới chỉ tập trung lấy dữ liệu từ **Uniswap** và theo như phần hiển thị của DEXTboard thì sắp tới sẽ được tích hợp từ nhiều sàn DEX khác như SushiSwap, IDEX 2.0, MoonSwap, Kucoin.

# Pool Explorer

![](https://images.viblo.asia/dea25f24-30c7-4f5a-8aa2-e6ba80682ca8.png)

Chức năng **Pool Explorer** sẽ hiển thị tất các các pair cùng với các thông tin của pair đó, được khởi tạo từ bao giờ, lượng token amount đang bao nhiêu, amount ETH đang như thế nào, vừa có sự thay đổi giá bao nhiêu phần trăm, giá USD của token hiện tại,... Rất nhiều các thông tin.

Từ đây người dùng có thể kiểm tra các thông tin của pair hoặc chuyển sang sàn DEX để trade luôn. Trên thanh tìm kiếm cũng tích hợp thêm tính năng lọc pair theo các kiểu type của pair.

![](https://images.viblo.asia/9a75f269-14ee-4f38-a7c2-97f46a814b4e.png)

Ví dụ như khi ta lọc để tìm ra các pair mới gần đây (**New**). Ta tìm thấy một pair mới là token **fDAI** vừa khởi tạo 58 phút trước

![](https://images.viblo.asia/ac92cd6c-7130-4df6-b375-d8ca36b3d4bf.png)

Dextool cũng có tích hợp  các đánh giá và hiển thị cảnh báo điểm(**Score**) thấp đối với những pool có thanh khoản thấp, ít thông tin về website, email contact,... Các tiêu chí này lát nữa mình sẽ show cho mọi người trong phần **Pair Explorer**. Nên khi có những cảnh báo như thế này thì mọi người cần chú ý trước khi giao dịch.

![](https://images.viblo.asia/14f94953-0e53-4106-a03d-79f338f7cfe5.png)

Phía trên cũng có các **View last 2h** và **View last 4h** để lọc ra các pair mới cũng cấp thanh khoản trong khoảng thời gian trên.

Ngoài ra ở mỗi pair cũng sẽ có các **Actions** để người dùng có thể thao tác luôn như: lọc theo Symbol của pair, Buy token trên UniSwap, kiểm tra contract pair trên Etherescan, xem thanh khoản có bị block hay không, hoặc chuyển sang Pair Explorer để xem chi tiết hơn các thông tin pair và chart giá theo thời gian thực.

![](https://images.viblo.asia/0c6e2813-bee2-472d-b5be-90ac0f4a8186.png)

#  Pair Explorer
![](https://images.viblo.asia/7abb27d4-48ea-47f0-a3a7-c84a1126ee14.png)

Ở đây sẽ hiển thị chi tiết các thông tin của pair như địa chỉ pool, website, add token vào metamask, nhóm telegram, trang twitter,... Và quan trọng là biểu đồ giá của token, cái này được tích hợp giống như **[TradingView](http://tradingview.com/)**, có thể sử dụng các indicator, các công cụ chỉ báo. 

### Score Pair

À mình  sẽ nói rõ hơn công thức tính điểm của Pair, thì Dextool sẽ phân tích từ các thông tin về token mà họ thu thập được càng nhiều thì độ thanh **information** sẽ càng dài, tiếp đến là các chỉ số như lượng transaction được thực hiện trên pair, số holder đang nắm giữ token,...

![](https://images.viblo.asia/04d3aa29-cb86-4a88-9d44-b90cead4cd27.gif)

 Cùng với đó là đánh giá của cộng đồng như lượt vote **like** hoặc **dislike** để đưa ra một số điểm tín nhiệm biểu thị sự uy tín của pool. Điều này rất quan trọng do các sàn DEX thì là phi tập trung nên ai cũng có thể list token của họ lên mạng blockchain, điều này không tránh khỏi nhiều trường hợp lừa đào (Scam).

### Share Pair

Ngoài còn có thêm các actions như chia sẻ pair lên các mạng xác hội, thêm pair vào list favorites, hoặc có thể chuyển sang Uni để trade luôn.
 
 ![](https://images.viblo.asia/08eb328d-5024-46df-bea5-1759c3c7780d.png)

![](https://images.viblo.asia/951c716d-e22a-4105-b775-bf7786c3b307.png)

Đó là các tính năng ở phần trên của **Pair Exlorer**, phần phía dưới sẽ là danh sách các transactions cùng với các tính năng rất hay.

### My Positions

![](https://images.viblo.asia/22fd0a54-915c-45f8-a321-3ba73160eb47.png)

Đây là hiển thị cho tài khoản free nên ta sẽ không có được những tính năng nâng cao. Ví dụ như tính nắng **My Positions** thì bạn có thể đánh dấu rằng đó là transaction mình đã mua với amount bao nhiêu, giá USD lúc đó, giá tính theo ETH lúc đó, ngoài ra người dùng cũng có thể thay đổi gá trị của phần đánh dấu đó. Để lần sau khi mua người dùng có thể so sánh xem mình đã lãi hay lỗ.

![](https://images.viblo.asia/225232cc-0c72-469c-905d-acb429ce98b3.png)

![](https://images.viblo.asia/4ff2a20b-bb19-450e-8e15-87d93c713b17.png)

### Price Alert

Tính năng đặt thông báo **(Price Alert)**, chẳng hạn bạn muốn đặt thông là khi giá tại 0.1 như ví dụ bên dưới thì tool sẽ bắn thông báo cho bạn biết, giúp bạn đỡ phải check chart liên tục. Nhưng do đây là thông báo trên trình duyệt nên để nhận được thông báo này bạn cần phải mở trình duyệt, chứ nếu tắt đi nó sẽ không thể bắn thông báo được.

![](https://images.viblo.asia/b38e4552-13d4-44d1-9d8c-402c663d2d1b.png)

### Bot/Smart Contract

Tính năng phát hiện ra các transacions từ smart contract hoặc từ bot. Dextool có thể phát hiện ra các transaction kiểu này và hiển thị cho người dùng.

![](https://images.viblo.asia/e0aea074-2f28-436e-91b2-00c51b48d165.png)

### Follow Maker in Pair

Tính năng theo dõi lãi lỗ của maker nhất định trong pair đó, thì dextool sẽ follow theo địa chỉ mà người dùng đã ghim để tìm ra tất cả các trasaction mua/bán của maker đó trong pair và tổng hợp lại như sau. Tổng cộng có 613 tx và có cả Price min/max với USD hay ETH tương ứng, lượng ETH đã mua và bán.

![](https://images.viblo.asia/c2978733-368a-472d-a815-1e6881182394.png)

![](https://images.viblo.asia/24815e49-13e2-486a-8eac-8dcef7fc25f3.png)

### Show Front Running Bot

![](https://images.viblo.asia/c2eb15fb-2069-4707-9380-a05bc40b1876.png)

###  Add Wallet Favorites

Các tính năng trả phí của **Pair Explorer** còn có thêm phần lưu các ví (address - wallet) có thể bạn thấy họ trade có lợi nhuận khá tốt, hay đánh dấu những address có khả năng là cá voi. Bằng cách sử dụng tính năng **Add Wallet Favorites**.

![](https://images.viblo.asia/0f15310c-9d01-44e8-8b22-806c3cd72546.png)

Trong phần **Wallet Info** người dùng có thể thấy được chủ ví đang sở hữu những loại token nào, amount, giá trị theo ETH hay USD

![](https://images.viblo.asia/a85cc2fe-a3f5-4673-b716-74eabdc30150.png)

Lưu tên cho wallet

![](https://images.viblo.asia/d4f61337-924d-42f4-8130-ddbd7bb70fe5.png)

Khi vào các pair có mà có sự xuất hiện của address đó thì sẽ hiển thị như sau

![](https://images.viblo.asia/fc391d9e-91b5-46a0-9a90-7907289281e3.png)

# Big Swap Explorer
Trong trang này Dextool sẽ cập nhật những transacion mới nhất mà có giá trị  từ **10,000USD** trở lên. Các transaction này có thể gây ảnh hướng lớn khiến các pair nhỏ bị thay đổi giá nhiều, hoặc cũng có thể là tín hiệu từ một cá voi nào đó. Người dùng cũng có thể lọc theo Symbol hay giá trị của transaction.

![](https://images.viblo.asia/4d62ca98-f479-4faa-8bda-965337ed81c2.png)

# Multiswap

Thường như trên trình duyệt để có thể swap nhiều token một lúc một là bạn sẽ cần mở nhiều tab hoặc thủ công là đợi swap xong thì chuyển qua token khác. Để giảm thiểu cho thao tác chuyển tab cũng như cập nhật các sự thay đổi pair liên tục thì Dextool có thêm tính năng **MuiltiSwap**, để người dùng cùng lúc có thể swap nhiều pair.

![](https://images.viblo.asia/e839abab-46e0-49eb-990d-31646ec5d9e5.png)

![](https://images.viblo.asia/510bfa1c-6d17-4809-8a99-26109cd63f00.png)

# Configuration And User Account

Configuration bật thông báo cũng như các pair hot

![](https://images.viblo.asia/53a7c6bc-3088-47ba-a2e3-4e31e2f50573.png)

Thông tin về địa chỉa ví cũng như các tính năng của các gói trả phí 

![](https://images.viblo.asia/2b0fa4aa-4828-4576-a64e-9d04095f77ff.png)

Và đây là bảng giá

![](https://images.viblo.asia/a8c086b4-4a78-496f-914f-349d8d0dbf6b.png)

# Kết luận

Dextool là một công cụ rất là hữu ích cho những ai đang giao dịch, đầu tư, kiếm chênh lệch giá trên các nền tảng DEX với các dự án IDO đang được list liên tục hiện nay. Mong rằng bài viết có thể giúp các bạn có được những hiểu biết chi tiết hơn về công cụ hợ trợ giao dịch rất bổ ích này.