![](https://images.viblo.asia/515b4a75-e49f-417a-b0fc-b57d2226bfa2.png)

## 1. Tổng quan

Giá của tiền điện tử rất dễ biến động. Để giảm thiểu sự biến động này, các stablecoin được gắn với các tài sản ổn định khác như USD đã được tạo ra. Stablecoin giúp người dùng phòng ngừa trước sự biến động giá và để trở thành một phương tiện trao đổi đáng tin cậy. Stablecoin kể từ đó đã nhanh chóng phát triển để trở thành một thành phần mạnh mẽ của DeFi, đóng vai trò quan trọng trong hệ sinh thái này.

Ảnh dưới là top 10 các stablecoin tại  thời điểm giữa tháng 6 theo trang thống kê [CoinGeckgo](https://www.coingecko.com/en/stablecoins)

![](https://images.viblo.asia/9b1cc00f-034e-4d98-9ef5-c52d2ace3fb3.png)

Chúng ta sẽ cùng điểm qua các stablecoin được neo giá bằng với USD. Không phải tất cả các stablecoin đều giống nhau vì chúng sử dụng các cơ chế khác nhau để giữ giá neo so với USD. Có hai loại cơ bản, cụ thể là fiat-collateralized (thế chấp bằng tiền pháp định)  và crypto-collateralized (thế chấp bằng tiền mã hóa). Hầu hết các stablecoin đều sử dụng hệ thống fiat-collateralized để duy trì tỷ giá với USD.

Để đơn giản hơn, chúng ta sẽ xem xét hai stablecoin là Tether (USDT) và Dai (DAI) để cho thấy sự khác biệt trong cách neo giá của chúng.

Tether (USDT) được neo ở mức giá tương đương đô la bằng cách duy trì dự trữ 1 đô la cho mỗi token Tether được sinh ra. Có nghĩa là công ty đứng ra đảm bảo là Tether sẽ lưu trữ số lượng USD đúng là số USDT đang lưu hành trên thị trường. Người dùng sẽ phải tin tưởng công ty Tether luôn đảm bảo số lượng USDT/USD là 1:1 nhưng chẳng ai chắc chắn được điều đó luôn xảy ra (giả dụ như 1 ngày Tether bị phá sản, ... ). Do đó, Tether là một stablecoin tập trung, được thế chấp bằng tiền pháp định (ở đây tiền pháp định là USD).

Mặt khác, Dai (DAI) được thế chấp bằng các loại tiền điện tử như Ethereum (ETH). Giá trị của nó được neo ở mức 1 đô la thông qua các giao thức được quy định bởi một tổ chức tự trị phi tập trung (DAO) và các hợp đồng thông minh. Tại bất kỳ thời điểm nào, người dùng có thể dễ dàng xác nhận tài sản thế chấp để tạo DAI. DAI là một stablecoin phi tập trung, được thế chấp bằng tiền điện tử.

## 2. Maker là gì ?

Maker là một nền tảng hợp đồng thông minh chạy trên Ethereum, nó gồm có ba loại token: Sai và Dai (cả hai đều được neo giá với USD theo tỷ lệ 1:1), cũng như token quản trị của nó, Maker (MKR).

Sai (SAI) còn được gọi là **Single Collateral Dai** và dùng Ether (ETH) làm tài sản thế chấp.

Dai (DAI) được ra mắt vào tháng 11 năm 2019 và còn được gọi là Dai- **Multi-Collateral Dai**. Nó có thể dùng nhiều loại tiền mã hóa khác nhau làm làm tài sản thế chấp (như ETH, BAT, ...). Trong tương lai, DAI có kế hoạch thêm các tài sản khác làm tài sản thế chấp.

Maker (MKR) là token quản trị của Maker và người dùng có thể sử dụng nó để bỏ phiếu cho các cải tiến trên nền tảng Maker thông qua Đề xuất Cải tiến Maker. Maker là một loại tổ chức được gọi là Tổ chức tự trị phi tập trung (DAO).

### Sự khác biệt giữ SAI và DAI

Như ở phần trên
- SAI là Single Collateral Dai
- DAI là Multi-Collateral Dai
Có nghĩa là với SAI, chỉ có thể thế chấp bằng 1 tài sản duy nhất là ETH nhưng với DAI thì có thể thế chấp bằng nhiều đồng tiền mã hóa khác nhau.


Trong tương lai, DAI sẽ là tiêu chuẩn stablecoin trên thực tế được Maker duy trì và cuối cùng, SAI sẽ bị loại bỏ dần và không còn được hỗ trợ bởi Maker nữa.


## 3. Làm thế nào để sở hữu DAI

### Minting DAI

Chúng ta hãy cùng mô phỏng cách nhận DAI qua 1 ví dụ sau:

Giả sử rằng một ngày nào đó bạn cần 10.000 đô la tiền mặt, nhưng tất cả những gì bạn có là những thỏi vàng trị giá 15.000 đô la ở nhà. Vì tin rằng giá vàng sẽ tăng trong tương lai, nên thay vì bán vàng miếng lấy tiền mặt, bạn quyết định đến tiệm cầm đồ để vay 10.000 USD tiền mặt bằng cách đem vàng miếng làm tài sản thế chấp. Tiệm cầm đồ đồng ý cho bạn vay 10.000 USD với lãi suất 8%. Cả hai bạn ký một thỏa thuận hợp đồng để hoàn tất giao dịch

![](https://images.viblo.asia/30f4b63e-7501-4371-9f05-ed2745b838ae.png)


Ở đây:
- Vàng của bạn sẽ tương đương như ETH, BAT, ... thế chấp vào smart contract  Marker
- Số tiền mặt bạn vay tương đương với DAI
- Tiện cầm đồ tương đương với smart contract Maker
- Điều khoản hợp đồng tương đương với logic trong smart contract Maker
- Lãi suất cho vay tương đương với Phí ổn định (Stability Fee)

Vậy nên, khi muốn nhận hoặc vay DAI từ nền tảng Maker, chúng ta sẽ thế chấp ETH, BAT, .... (trong danh sách tài sản chấp nhận thế chấp) vào nền tảng. Khi muốn đổi lại tài sản thế chấp thì chỉ cần trả lại lượng DAI đã nhận cùng 1 ít phí ổn định (Stability Fee)

Trên nền tảng Maker, bạn có thể mượn Dai bằng cách đặt coin thế chấp vào. Giả sử ETH hiện có giá trị 150 đô la, bạn có thể khóa 1 ETH vào và nhận tối đa 100 DAI (100 đô la) với tỷ lệ tài sản thế chấp 150%.

### Trading DAI

Phương pháp trên là cách DAI được tạo ra. Sau khi DAI được tạo, bạn có thể gửi nó đến bất cứ đâu bạn muốn. Một số người dùng có thể gửi DAI của họ đến các sàn giao dịch tiền điện tử và bạn cũng có thể mua DAI từ các thị trường thứ cấp này mà không cần thông qua giao thức Maker.

Mua DAI theo cách này dễ dàng hơn vì bạn không phải khóa tài sản thế chấp và không phải lo lắng về tỷ lệ tài sản thế chấp và phí ổn định.



## Tài liệu tham khảo

https://docs.makerdao.com/