# Intro
Server-side, server call, server 2 server, s2s, mistakenly, server pixel tracking dựa vào server của nhà quảng cáo để theo dõi các sessions được tạo ra khi click vào attribute conversion(?).
Server sẽ record và chuyển transactionID về HasOffer server. Postback Tracking có thể được nghĩ đến với với 2 process riêng biệt:  

- Điều gì xảy ra khi user click vào offer
- Điều gì xảy ra trên conversion

Conversion:

1. User xem một offer
2. User click vào offer
3. Click sẽ đi tới một HasOffers server. Server sẽ record lại click và sau đó tạo ra transaction id và record lại transaction id cho session đó
4. HasOffter server sẽ lập trức chuyển hướng user tới landing page của offer kèm theo Transaction ID của session đó trên URL
5. User xem được page của offer trên trang web của Advertiser. Site của Advertiser xử lý việc lưu lại ID của session

![](https://images.viblo.asia/cd116c62-0475-492d-8a1e-b843f48f37a4.png)

Khi User Converts trên một offer:

1. Advertiser server sẽ gửi một một signal tới HasOffers server bao bồm ID HasOffer cung cấp từ ban đầu. User sẽ không bị chuyển hướng trở lại HasOffer server trong bất cứ trường hợp nào
2. HasOffer lưu lại conversion của session


# Postback tracking protocol
Có 2 protocol cho Postback Tracking server:

- with transaction IDs
- with affiliate IDs

Việc sử dụng Transaction IDs là cách tốt nhất nhưng trong một số ít trường hợp thì nó không được sử dụng.

## Server Postback with Transaction ID

Postback tracking protocol sử dụng transaction IDs, Một mã uniq code được tạo ra khi users click vào offer 

Mã này được generate ra bởi tracking server sau đó truyền sang cho advertiser, Advertiser gửi thông tin của convertion (sau khi đã mua hàng , số tiền, số lượng ... hay register ....) 
kèm theo transaction ID ngược trở lại tracking server 

# Việc implement bên phía Advertiser (merchant site)
Advertiser phải có cách nào đó để lưu lại transaction ID, bởi vì phải phụ thuộc hoàn toàn vào phía của advertiser nên đây là một bước implement không giống nhau giữa các advertiser 
Có các cách impelement :
* Lưu ID trong database 
* Lưu ID trong cookie
* Chuyển ID qua các url khi user access tới các trang khác nhau của advertiser (merchant site)

1. Lưu trong database 
    Trong trường hợp này thì advertiser sẽ lưu trữ phiên làm việc trong database, cách này thì đòi hỏi developer phải can thiệp sâu vào phía của advertiser software 
    Cách này có một lợi điểm nó có thể track user thông qua nhiều devices, Bởi vì transaction ID được lưu trong DB và của 1 user cụ thể. Conversion sẽ được track mà không phụ thuộc vào việc user tương tác với offer như thế nào 
2. Lưu trong Cookie 
    Trong nhiều trường hợp merchant site sẽ lấy transaction từ phía tracking server và lưu lại dưới cookie của browser
    Đây là cách đơn giản để implement phía merchant site(advertiser)
    Thế nhưng nó cũng có nhược điểm đó là cookie sẽ không còn tác dụng nếu user `convert` (order ...) trên browser khác hay devices khác. 
    Cách làm này không được khuyến khích khi đang sử dụng server postback tracking 
3. Truyền params thông qua URL
    Là việc truyền ID hay các parameter trên url khi user access các page của merchant. 
    Và cách làm này cũng không được khuyến vì ID để lộ trên url và user có thay đổi nó dẫn đến việc tracking bị sai phía tracking server
  
# Advertiser postback value to tracking server
Khi User hoàn thành việc order, register (conversion) or advertiser(merchant) site. Merchant site cần phải truyền lại dữ liệu cho tracking server. 
Merchant site cần gửi lại tracking server signal gồm 2 thành phần:

* postback url
* Transaction ID của phiên làm việc

Chú ý: Merchant nên gửi get request tới Tracking server 

# Ưu và nhược điểm 
**Ưu điểm**

Đáng tin cậy hơn bởi vì tất cả việc tracking được hoàn thành ở phía server-side, dễ dàng khắc phụ sự cố
Tránh được sự gian lận

Postback tracking có nhiều option cho việc tracking conversion, thay vì việc bị giới hạn bởi simple page load, advertiser có thể gửi lại conversion URL bất cứ khi nào. 
Nó trở nên hữu ích trong trường hợp advertiser không muốn đăng ký conversion cho đến khi order được shipped đi.
Postback tracking chạy được trên các thiết bị mobile

**Nhược điểm**:

Postback tracking khó thực thi, nó yêu cầu việc communicate giữa network và advertiser để đảm bảo ID được truyền vào đúng, sau đó bên phía advertiser cần lưu và truyền lại dữ liệu conversion

# Nguồn tham khảo 
https://help.tune.com/hasoffers/server-postback-tracking-explained/?_ga=2.242188097.2136320926.1548054593-86336749.1538483925