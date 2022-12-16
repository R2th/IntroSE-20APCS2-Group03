Tiếp tục seri về FinTech nhé các bác!!

Trong bài viết trước mình có giới thiệu tổng quan về các hệ thông mà banks đang có. Trong bài post này, mình sẽ giải thích cho các bạn 1 thuật ngữ mà chắc chắc các bạn sẽ phải làm việc với nó hoặc ít nhất đã từng nghe tới nó khi làm việc trong lĩnh vực fin, nó chính là ISO8583.

Đầu tiên, ISO8583 là tiêu chuẩn quốc tế về sự liên lạc, tương tác của các hệ thống ngân hàng với nhau (các giao dịch, message tài chính). ISO 8583 đưa ra định dạng message và luồng giao tiếp để các hệ thống khác nhau có thể trao đổi các giao dịch.

* Mặc dù ISO 8583 đưa ra một chuẩn chung nhưng nó không được sử dụng trực tiếp cho một hệ thống hay một network nào cả. Thay vào đó mỗi network sẽ tùy biến những chuẩn này cho phù hợp với mục đích sử dụng của mình.
* Các phiên bản khác nhau của ISO 8583 có cách đặt các trường ở vị trí khác nhau. Trong đó ISO 8583:2003 được công nhận rộng rãi.

Ví dụ: Khi bạn muốn thực hiện 1 giao dịch nạp tiền vào ví điện tử. Từ nhà cung cấp ví điện tử ( ví dụ Momo, Moca...) sẽ nhận các thông tin đầu vào là Amount (số tiền cần nạp vào ví), số token (khi bạn liên kết thẻ ngân hàng với ví, bạn sẽ được cấp 1 số token để thực hiện các giao dịch)....
* B1: Các tổ chức, nhà cung cấp ví điện tử sẽ thực hiện gửi request sang ngân hàng phát hành (ngân hàng phát hành ra thẻ được liên kết vào ví) với các thông tin cần thiết như số token, số tiền..... Có thể tạo request qua API hoặc qua socket.
* B2: Nhà phát hành thẻ, kiểm tra các thông tin đầu vào (thông tin input) khi mọi thông tin đã pass qua bước valid, thực hiện build message theo chuẩn ISO8583 theo kênh POS để trừ tiền của khách hàng và cộng vào tài khoản trung gian của nhà cung cấp ví điện tử bên ngân hàng. 
* B3: Tinh tinh tinh, tiền đã xuất hiện trên ví.
    
Đó là luồng logic xử lý cơ bản, để hiện thực hoá, tôi sẽ sử dụng Java để build message ISO8583 nhé.

B1. Các bạn tạo cho mình 1 project Java và import thư viện JPOS như sau:
```
<!-- https://mvnrepository.com/artifact/org.jpos/jpos -->
<dependency>
    <groupId>org.jpos</groupId>
    <artifactId>jpos</artifactId>
    <version>2.1.0</version>
</dependency>
```
B2: Build message ISO:

```
ISOMsg isoMsgReq = new ISOMsg();
isoMsgReq.setMTI("0200");
isoMsgReq.set(2, "9704xxxxxxxxxxxxxxx");
isoMsgReq.set(3, "000000");
isoMsgReq.set(4, "000005000000");
isoMsgReq.set(7, IsoUtil.getDateTimeIso());
isoMsgReq.set(11, "08012020");
isoMsgReq.set(22, "901");
isoMsgReq.set(25, "00");
isoMsgReq.set(41, terminal);
isoMsgReq.set(49, "VND");
IsoClient isoClient = IsoClient.builder().endpointHost("IP host", PORT).build();
isoClient.send(isoMsg);
```

 Trong đó: 
*  MTI : 0200 là để đinh nghĩa đây là mesage tài chính (Finalncial Message) trong ví dụ là đang thực hiện việc trừ tiền lên MTI là 0200.
*  Field 2: Là số thẻ thực hiện giao dịch (9704xxxxxxxxxxxxxxx).
*  Field 4: Là số tiền thực hiện giao dịch.
*  Field 7: Là thời gian thực hiện giao dịch.
*  Field 11: Là số trace number (là số thực hiện đối soát)
*  Field 49: Là định dạng số tiền giao dịch (VD: VND..)
*  IP và port ở đây là: IP và port của server NS hoặc TS (Kênh POS) (tham khảo bài viết trước)
        
Các bạn có thể tham khảo thêm các MTI: 
*  x0xx	Reserved by ISO	
*  x1xx	Authorization message	Determine if funds are available, get an approval but do not post to account for reconciliation. Dual message system (DMS), awaits file exchange for posting to the account.
*  x2xx	Financial messages	Determine if funds are available, get an approval and post directly to the account. Single message system (SMS), no file exchange after this.
*  x3xx	File actions message	Used for hot-card, TMS and other exchanges
*  x4xx	Reversal and chargeback messages	Reversal (x4x0 or x4x1): Reverses the action of a previous authorization.
*  Chargeback (x4x2 or x4x3): Charges back a previously cleared financial message.
*  x5xx	Reconciliation message	Transmits settlement information message.
*  x6xx	Administrative message	Transmits administrative advice. Often used for failure messages (e.g., message reject or failure to apply).
*  x7xx	Fee collection messages	
*  x8xx	Network management message	Used for secure key exchange, logon, echo test and other network functions.
*  x9xx	Reserved by ISO	**

Đọc thêm https://en.wikipedia.org/wiki/ISO_8583
        
Và sau khi run ta nhận được response: Hehe các bạn run thử trước đã nhé!
        
Sau khi nhận được response thành công. (Field 39 = 0) thì tức là giao dịch đã thành công các bạn nhé!
        
Trên đây mình có giới thiệu về message ISO8583, nếu có thắc mắc hay câu hỏi nào, các bạn cứ comment bên dưới nhé! Mình sẽ trả lời các bạn nhé!