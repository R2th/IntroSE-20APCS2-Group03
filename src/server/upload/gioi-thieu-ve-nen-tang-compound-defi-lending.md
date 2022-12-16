![](https://images.viblo.asia/aa6ff0b8-012a-4b45-876d-4ff40fbd106e.png)

Tiếp tục với loạt bài về các nền tảng DeFi Lending hôm nay chúng ta  sẽ đi chi tiết về một nền tảng khá nổi tiếng trong lĩnh vực này đó là **Compound**

# Compound là gì?
**Compound** là một lending protocol được xây dựng trên Blockchain Ethereum, một nền tảng Decentralized Finance (DeFi). Nền tảng này chủ yếu tập trung vào việc lending và borrow, cách thực hoạt động của nó  giống như một ngân hàng đó là giúp những người gửi tiền vào có thể kiếm lời từ việc lãi suất và cho phép người khác có thể vay tiền đi đầu tư. Nhưng khác với ngân hàng là một thực thể trung tâm kiểm soát và chi phối mọi hoạt động của dòng tiền, còn Compound không phải vậy nó là những smart contract hoạt động phi tập trung trên mạng blockchain và không ai có thể chi phối được chúng. Điều khác tiếp theo là ngân hàng sẽ cho vay và thế chấp bằng tiền hoặc tài sản hiện hữu, còn với Compound thì khác nó chỉ hỗ trợ tiền điện tử mà nó hỗ trợ mà thôi.
# Compound hoạt động ra sao?
Nếu là một người đi vay bạn sẽ không trực tiếp vay tiền từ người đi vay mà thay vào đó Compound có một nơi gọi là **Liquidity Pool** 

![](https://images.viblo.asia/fdc4758d-591f-4809-bddd-95e237168893.jpg)

Liquidity pool thì không phải là team Compound Finance, một ngân hàng mà là một loạt các smart contracts. Những smart contracts này sẽ tự động match những người đi vay với những khoản tài sản có sẵn trong pool. Sau đó các contracts sẽ tự xáo trộn các khoản thanh toán lãi suất từ người vay sang cho người cho vay.

Ngoài ra smart cũng làm nhiệm vụ xác định lãi suất bằng cách sử dụng các thuật toán đã được lập trình  sẵn chúng sẽ dựa vào quy luật cung cầu thị mà đưa ra các tỷ lệ lãi suất phù hợp. Ví dụ cụ thể chẳng hạn như khi lượng người vay USDT nhiều lên lúc này sẽ cần lượng tiền tương ứng để đáp ứng các khoản vay, lúc này các smart contracts sẽ điều chỉnh cho lãi suất của USDT cao lên để thu hút người gửi vào. Cứ như vậy đối với trường hợp khi lượng người vay giảm xuống thì chúng cũng sẽ điều chỉnh mức lãi suất giảm xuống. Do vậy tỷ lệ lãi suất này sẽ không bao giờ cố định nó sẽ thay đổi theo thời gian.

Một số điểm chú ý khác như:
- Sẽ không có mức tổi  thiểu cho các khoản cho vay hoặc đi vay
- Do tỷ số lãi suất sẽ thay đổi theo thời gian và cụ thể là block times của Ethereum, cữ mỗi lần block được đóng thì lãi suất sẽ lại được cập nhật mới. Do vậy có thể hiểu cứ sau 15 giây thì người cho vay sẽ nhận được lãi một lần.
&nbsp;
### Supplying Assets

Các positions ( tài sản trong các pool) sẽ được tracked theo một loại token được gọi là **cToken**. cToken là một loại ERC-20 nó thì đại diện cho một loại tài trong Compound. Ví dụ như nếu bạn deposit ETH vào Compound thì nó sẽ sinh ra lượng cETH tương ứng để chuyển vào tài khoản của bạn. Hay nếu bạn deposit một stablecoin DAI thì bạn cũng sẽ nhận được một lượng cDAI tương tự. Các loại cToken này được gọi là các đồng quản trị nó theo dõi các dòng tiền vào ra của liquidity pool, có thể hiểu là khi một lượng tài sản được deposit vào pool thì một lượng cToken tương ứng của loại tài sản đó sẽ được mint ra và ngược lại khi một lượng tài sản được withdraw ra khỏi pool thì một lượng cToken tương ứng cũng sẽ bị burn đi. Điều này giúp các smart contract có thể nắm được số lượng tài sản hiện có trong pool một cách dễ dàng.

cToken này là đại diện cho lượng tài sản mà người dùng đã đóng góp vào pool nên họ có thể sử dụng lượng cToken này để rút ra lượng tài sản tương ứng bất cứ lúc nào. Và việc nhận về lãi suất cũng như vậy Compound sẽ từ lượng cToken mà người dùng nắm giữ mà nhân với lãi suất thời điểm đó ra lượng lãi mà người dùng sẽ nhận được sau mỗi lần chốt lãi. Điều này sẽ làm tăng lượng cToken mà người cho vay nắm giữ và khi đó họ cũng có thể rút được ngày một nhiều hơn lượng tài sản từ pool
&nbsp;
 ### Borrowing Assets

Compound thì cho phép bất kỳ ai cũng có thể dễ dàng vay miễn là họ có một lượng tài sản thể chấp phù hợp thì họ đều có thể vay bất cứ loại tài sản nào mà Compound hỗ trợ. Không giống như các ngân hàng truyền thống thì người dùng không cần các điều khoản thương lượng, không có ngày đáo hạn, mỗi loại tài sản sẽ có một lãi suất riêng và thay đổi theo quy luật cung cầu 

Khi người dùng thế chấp tài sản vào Compound thì tương ứng họ cũng nắm dữ một lượng cToken tương ứng và lượng cToken này sẽ được sử dụng làm tài sản thế chấp để đi vay các loại tài sản khác. Mỗi loại tài sản sẽ có một hệ số thế chấp khác nhau giao động từ 0 đến 1, đại diện cho phần giá trị tài sản cơ bản có thể được vay. Các tài sản có tính thanh khoản nhỏ, vốn hóa nhỏ có hệ số thế chấp thấp. Đổi lại khi tài sản có tính thanh khoản cao, sẽ có hệ số thế chấp cao. Người dùng có thể vay thoải mái miễn là không vượt quá khả năng vay của họ và điều này giúp bảo vệ hệ thống khỏi rủi ro vỡ nợ

Về vấn đề quản lý rủi ro thì nếu như đến một lúc nào đó giá trị khoản vay của người dùng có giá trị cao hơn so với khả năng trả nợ. Thì một phần của khoản vay có thể được thanh lý trước để giá trị đi vay nhỏ hơn giá trị thế chấp. Cứ mỗi khi giá trị vay vượt hơn giá trị thế chấp hệ thống sẽ thực hiện thanh lý một phần như vậy để đảm bảo khoản vay luôn ở trạng thái có thể trả giúp làm giảm rủi ro cho hệ thống.

#### Các loại tiền điện tử mà giao thức Compound hỗ trợ

![](https://images.viblo.asia/de8b9bed-c5fc-42f2-89f5-abaa77f4251b.png)

# Hướng dẫn sử dụng Compound 

Đầu tiên bạn cần kết nối ví có chứa tiền điện tử (loại mà Compound hỗ trợ) với nền tảng.

![](https://images.viblo.asia/b6116679-221e-488a-ad14-b57598d8d17a.png)

Sau đó, bạn cần đảm bảo rằng bạn đã kết nối với ví phù hợp bằng cách kiểm tra địa chỉ ở phía trên, bên phải bảng điều khiển có tương ứng với địa chỉ ví của bạn không.

Nếu tất cả đều khớp thì tài sản trong ví của ta sẽ được hiển thị như hình sau.

![](https://images.viblo.asia/44ad3174-b80e-4971-96b4-e7d0c320dd88.png)

Tới đây, bạn cần để ý đến cột APY (tỷ lệ phần trăm lãi suất hàng năm) của BAT đang hiển thị con số 25.75%. Điều này có nghĩa là với 1 BAT cho vay, bạn sẽ nhận được 0,2575 BAT vào cuối năm. 

Tuy nhiên, mức APY này không cố định và sẽ được thay đổi tùy theo lượng cung/cầu của thị trường.

![](https://images.viblo.asia/691b0f4f-faf4-4468-b491-de366a8cacd9.jpg)

![](https://images.viblo.asia/a0ae3904-865b-4857-8ebd-dd674508f5ea.jpg)

Như có thể thấy, mức APY đã thay đổi (từ 25,75% thành 25,99%) kể từ thời điểm xác nhận giao dịch cho vay 500 BAT. APY sẽ tiếp tục dao động theo mỗi khối ETH.

![](https://images.viblo.asia/612cccb9-0955-43a7-8a40-526cb00c678d.jpg)

Vậy là đã hoàn tất và bây giờ bạn chỉ cần chờ để thu lãi. Trong trường hợp này, BTA đang thu lãi 25,76% trên 500 BAT! Các khoản thanh toán lãi được phân phối hàng ngày qua chính token bạn đã cung cấp và dựa trên lãi suất đang chạy.

Trên đây là hướng dẫn cách để cho vay tài sản và kiếm lãi. Còn việc đi vay tài sản thì cũng tương tự như vậy đó là bạn sử dụng tiền mình đã deposit làm tài sản thế chấp để vay các loại tiền khác và việc vay này cũng đòi hỏi bạn phải trả phí. Các thao  tác thì tương tự như việc bạn thực hiện cho vay.

# Kết luận 
Lại một lần nữa ta thấy được lợi ích mà smart contract mang lại và chúng đã giúp công nghệ blockchain vượt ra ngoài phạm vị của việc chỉ dùng cho thanh toán. Giờ đây người ta có thể vừa sử dụng được những mô hình kinh tế đang có mà vẫn có thể thừa hưởng được những lợi ích mà blockchain mang lại. Compound chính là một hình mẫu tiêu biểu nó thay đổi khái niêm vay và cho vay truyền thống, thay đổi được những hệ thống đã lỗi thời. Và trong vài năm tới đây người ta dự đoán thị trường DeFi nói chung và DeFi Lending nói riêng sẽ còn bùng nổ. Rất hy vọng các bạn thích bài viết này, xin chào và hẹn gặp lại trong các bài viết tiếp theo.

#### Nguồn
- https://compound.finance/documents/Compound.Whitepaper.pdf
- https://www.exodus.io/blog/compound-finance-review/#head4
- https://academy.binance.com/economics/what-is-compound-finance-in-defi
- https://blogtienao.com/compound-comp-la-gi/