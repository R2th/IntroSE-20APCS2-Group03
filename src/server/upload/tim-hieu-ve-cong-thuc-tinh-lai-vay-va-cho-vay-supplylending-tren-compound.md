Compound Finance là một trong những giao thức hàng đầu để vay và cho vay tiền điện tử trong không gian DeFi. Chúng ta hay cùng tìm hiểu thêm về việc các chỉ số lãi suất sẽ được tính toán như thế nào trong nền tảng defi Compound nhé.
![](https://images.viblo.asia/d6fa0674-bc37-4589-8476-441bda1d57c3.png)

# I. Vay và Cho vay (Supply/Lending) trên Compound
Lãi suất cho vay và vay trên Compound được cộng dồn mỗi block(khoản 15 giây  trên Ethereum tích lũy liên tục lãi lũy kế ) và được xác định bằng tỷ lệ sử dụng trên thị trường (utilization percentage).<br />
**Tỷ lệ sử dụng = tổng vay/tổng cho vay <br />
utilization ratio = total borrow/total supply<br />**
Tỷ lệ sử dụng được dùng như là tham số đầu vào cho công thức xác định lãi suất.<br />
Những tham số còn lại được quy định bởi Quản trị của Compound (Compound Governance)
Cho vay trên Compound
# II. Công thức tính lãi suất vay
Công thức tính lãi suất cho vay nhìn chung là hàm tuyến tính tăng với hệ số chặn y được coi là lãi suất cơ bản(base rate) thể hiện lãi suất cho vay khi nhu cầu vay là 0 và độ dốc(slope) thể hiện tỷ lệ thay đổi của các lãi suất.<br />
Những tham số này khác nhau với mỗi tài sản token ERC20 được cung cấp bởi các nền tảng khác nhau.<br />
Một số thị trường có công thức cao cấp hơn bao gồm điểm kink. Điểm kink là tỷ lệ sử dụng mà ở đó độ dốc sẽ dốc hơn.<br />
Những công thức này có thể được dùng để giảm chi phí của việc cho vay cho tới khi đạt tới điểm kịnk và sau đó tăng chi phí cho vay sau điểm kink để thúc đẩy một mức độ tối thiểu thanh khoản.<br />
# III. Công thức tính lãi suất cho vay
**Supply interest rate =borrow interest rate x utilization ratio .<br />
Lãi suất cho vay = lãi suất vay x tỷ lệ sử dụng <br />**
Hệ số dự trữ( reserve factor ) là tỷ lệ của những thanh toán tiền vay không được trả cho những người cung cấp mà thay vào đó được dành riêng cho vào 1 bể dự trữ đóng vai trò bảo hiểm trong trường hợp người vay không trả được nợ.VD : không có ai vay thì cũng không có doanh thu nên cũng không có nguồn để trả cho người cho vay  .<br />
Trong trường hợp biến động giá lớn, nhiều vị thế vay có thể trở thành dưới mức thế chấp khi đó nền tảng có những quỹ không hiệu quả để trả cho những người cho vay. Trong trường hợp đó người cho vay sẽ được trả bằng cách sử dụng tài sản trong bể dự trữ.<br />
<br />
![](https://images.viblo.asia/da53f78f-c986-43a2-adb4-1f3d47ab6138.jpg)

## Ví dụ:
Trong thị trường DAI, 100 triệu được cho vay và 50 triệu được vay. Giả sử lãi suất cơ bản là 1% và độ dốc là 10%. Khi 50 triệu được vay thì tỷ lệ sử dụng là 50%.<br />
Khi đó Lãi suất vay = 0,5*0,1+0,01=0,06 hay 6%.<br />
Lãi suất cho vay (với giả định hệ số dự trữ là 0%) = 0,5*0,06 = 0,03 hoặc 3%.<br />
-> Công thức trên khiến người vay phải trả nhiều hơn và người cho vay thu được ít hơn cũng giống như với  1 ngân hàng thì lãi bạn nhận được khi cho vay vốn sẽ ít hơn nhiều so với số tiền mà những những người đi vay thực tế phải trả.<br />
–>Lãi suất vay không phải tỷ suất cận biên mà nó là tỷ suất cho tất cả người vay . Có thể hiểu là lãi suất vay có thể thay đổi theo thời gian. VD: giả định người vay đầu tiên vay 25 triệu. Lãi vay sẽ là 25 *0,1 +0,01 = 3.5%.<br />
Sau đó 1 người vay khác vào và vay 25 triệu thì lãi tăng tới 6% đối với tất cả mọi người vay.<br />
-Giả định tỷ lệ dự trữ được đặt là 10% thì 10% của lãi suất vay sẽ được cho vào bể dự trữ DAI, điều này là hạ lãi suất cho vay xuống 2,7% được tính = 0,5*0,06*(1-0,01)= 0,027 hay 2,7%.<br />
Cách khác để nghĩ về lãi cho vay là 6% lãi vay của 50 triệu tương đương 3 triệu của khoản thanh toán nợ. Phân chia 3 triệu khoản thanh toán này cho những người cho vay 100 triệu hay là lãi suất 3%. Với 10% lãi vay chuyển vào quỹ dự trữ thì sẽ trả là 2,7 triệu.<br />
-Giả định 100 triệu DAI được cho vay và 90 triệu DAI được vay thì tỷ lệ sử dụng là 0%.<br />
Điểm kink là điểm mà khi tỷ lệ sử dụng là 80% thì trước đó độ dốc là 10% và sau đó thì độ dốc là 40% hay là lãi suất vay sẽ cao hơn nhiều nếu tỷ lệ sử dụng vượt quá 80%.<br />
Lãi suất cơ bản vẫn là 1% .<br />
Lãi suất vay = 0,01(base) +0,8*0,1(pre-kink)+0,1*0,4(post-kink)= 13% .<br />
Lãi suất cho vay (với giả định hệ số dự trữ là 0%) = 0,9*0,13=11,7%.<br />
## Ưu điểm của Compound<br />
1. Mở khóa giá trị của tài sản mà không phải bán nó .<br />
1. Dễ dàng thiết kế vị thế long hay short.<br />
1. Giả định bạn kỳ vọng thị trường giá xuống trên giá ETH thì bạn nên:<br />
Cho vay stablecoin như USDC hoặc DAI.<br />
- Vay ETH.<br />
- Bán ETH lấy stablecoin.<br />
- Nếu giá ETH xuống bạn có thể dùng stablecoin để mua ETH với giá rẻ hơn để trả khoản nợ ETH đã vay.<br />
Nguồn tài liệu: https://www.youtube.com/watch?v=pEfooGMeAWs

-----