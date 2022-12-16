© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/aWj53xePK6m)

Bài viết nằm trong series [Comparing and distinguishing](https://viblo.asia/s/series-comparing-and-distinguishing-W65GEjjxZDO).

Chắc chắn đã có không ít bài viết giới thiệu về 2 thuật ngữ này theo nhiều cách khác nhau. 

Nhưng nếu đã quen với style của mình thì chắc chắn bạn sẽ biết nó khác với phần còn lại. Cùng xem có gì thú vị nhé. Gét gô!

--- 

Tình huống thế này, mình tin đa số chúng ta đã trải qua và thậm chí thực hiện nó rất nhiều lần.

> Đêm hôm trước do Tokuda **Netflix and chill** với bạn gái nên sáng mệt quá không đi học được. Tokuda bèn nhờ bạn mình là Ozawa điểm danh hộ để tránh bị lên sổ đầu bài ngồi do nghỉ không phép. Đến lúc điểm danh, cô giáo Thảo gọi tên Tokuda thì ngay lập tức Ozawa hô rõ to **Có**. Mọi chuyện diễn ra đúng như kế hoạch, Tokuda đã được điểm danh nhưng thực tế thì lại đang ngồi rung đùi ở nhà.

Và chính nó là ví dụ về **proxy** trong thực tế.

> Đầy đủ thì là **forward proxy** nhưng thôi gọi **proxy** cho nhanh và phân biệt với **reverse proxy**.
> 
> Hiểu một cách đơn giản nếu **proxy** là cách để Tokuda trick cô giáo Thảo thì ngược lại **reverse proxy** là cách để cô Thảo trick lại Tokuda. 

Vậy trong lập trình thì nên hiểu **proxy** và **reverse proxy** như thế nào? Làm sao để phân biệt, chúng có gì giống và khác nhau?

## 1) Information exchange direction

Điều quan trọng nhất để phân biệt **proxy** và **reverse proxy** là **data direction**:
- **Source / Sender**: who send the data.
- **Destination / Receiver**: who receive the data.

Về bản chất cách thức hoạt động của cả **proxy** và **reverse proxy** gần như nhau, chỉ khác một điều là hướng data được truyền tải (direction of data exchange).

## 2) Proxy / Forward proxy

Đại khái theo từ điển **proxy** là ai đó có quyền đại diện cho chủ thể để thực hiện một nhiệm vụ dưới danh nghĩa của chủ thể đó. Ví dụ là tình huống **điểm danh hộ** ở trên.

### 2.1) Proxy

Trong thế giới lập trình hay gần gũi hơn là thế giới internet, **proxy** có thể là bất kì thứ gì có nhiệm vụ trung chuyển data từ browser (client) đến web server (server).

Ví dụ, Tokuda ngồi nhà buồn buồn mở po..hub.com lên xem cho đỡ chán. Sau khi nhập url và enter, thế quái nào không truy cập được và lỗi to đùng chình ình trên màn hình **This site can't be reached**. Lí do là gì?

Rất dễ hiểu, vì nhà mạng (**ISP - Internet service provider**) đã chặn truy cập này. Cụ thể, trong trường hợp này ISP đóng vai trò là **proxy**, đứng giữa kết nối của Tokuda tới po..hub.com, và ISP đã chặn request này để gián tiếp giúp giảm số ca vô sinh hiếm muộn... :crossed_fingers:. 

> ISP đóng vai trò là **proxy**, nhận request từ browser và forward đến địa chỉ đích. Tất nhiên còn nhiều step khác nhưng hãy hình dung đơn giản như vậy để hiểu vai trò của proxy.

![](https://i.imgur.com/zPehSdx.png)

Nhưng chúng ta không thể kiểm soát được ISP, nó thuộc sự quản lý của các tập đoàn viễn thông mà bạn đang sử dụng mạng của họ như Viettel, FPT, VNPT... Hãy lấy ví dụ khác gần gũi hơn, một số công ty quản lí khá nghiêm ngặt về truy cập kết nối internet của nhân viên đại khái như:
- Không được lướt Facebook.
- Không được vào Youtube, Gmail.
- Thậm chí không được truy cập Github.

Vậy các công ty đó đã làm như thế nào?

Rất đơn giản, nhân viên muốn truy cập internet bắt buộc phải thông qua mạng của công ty (corporate proxy). Và tại đây, proxy dễ dàng filter các request nào hợp lệ và không hợp lệ để tiếp tục xử lí.

![](https://i.imgur.com/g0GjEVu.png)

### 2.2) Advantages

Chúng ta chắc chắn đã hiểu rõ về khái niệm và lợi ích cơ bản của **proxy** với 2 ví dụ trên. Ngoài ra chúng còn có kha khá những benefit khác mình tổng hợp dưới đây:

- **Allow/Deny request**: là ví dụ ở trên, **proxy**/**forward proxy** check các request có hợp lệ hay không để thực hiện **forward** hoặc **block** request.
- **Log/Monitor request**: một vài trường hợp **proxy** cần theo dõi đánh giá hành vi sử dụng internet của từng nhân viên. Ví dụ, công ty cho phép bạn lướt Facebook trong giờ làm, nhưng nếu số lượng request lớn và thời gian sử dụng lâu thì... tất nhiên là không được. 
- **Cache responses**: rất dễ hiểu, cache response để giảm letancy, tăng performance, tối ưu bandwidth... Ví dụ, công ty có một vài website nội bộ chuyên cung cấp các thông tin static (hoặc ít thay đổi) về thông tin nhân sự, hợp đồng, code of conduct... Lúc này proxy cache lại response để trả về cho người dùng trong các lần request tiếp theo thay vì request trực tiếp đến server.
- **Anonymous**: điều cuối cùng vô cùng quan trọng và hay ho đó là giúp bạn (client) ẩn mình khỏi thế giới internet. Nói vậy cho nguy hiểm, thật ra là **server (receiver)** có thể biết ai là người gửi request, nhưng sẽ khó để biết **thực chất** request được gửi từ đâu. Nghe hơi ảo ma canada. 
  
    Trong phần mềm, **proxy** giống như anh chàng đưa thư tận tâm, **proxy** forward chính xác những thông tin client gửi (bao gồm header, payload, cookie...) đến server và trả về client đúng những thông tin server trả về. Những thông tin về vị trí *nếu không được yêu cầu* thì gần như rất khó xác định chính xác request được gửi từ đâu.
    
    > Tokuda muốn gửi thư tỏ tình với Thảo nhưng lại không muốn lặn lội xa xôi mấy chục km để đưa tận tay. Tokuda nhờ Ozawa đi chuyển thư hộ. Ozawa nhận lời nhưng do bận công việc nên nhờ Angela White đi thay. AW vốn tính hay giúp đỡ nên nhận lời liền, đi được nửa đường thì hết xăng, AW gọi bạn là Hatano đến cấp cứu. Thế là qua tay mấy người thư mới gửi đến được Thảo. Về cơ bản Thảo chỉ biết người gửi là **Tokuda**, và nhận thư từ **Hatano**.
    
    Đây chính là cách để **Tokuda** vào po..hub.com thông qua VPN (đóng vai trò như **forward proxy**) mà không còn bị nhà mạng chặn. 

## 3) Reverse proxy

Với đống chữ nghĩa dài dằng dặc như trên thì ta đã hiểu cơ bản về **forward proxy**. Và **reserve proxy** đơn giản là những thứ ngược lại với **forward proxy**. 
                 
### 3.1) Reverse proxy

Nếu **forward proxy** nói đến việc **forward request** (requests go out from client to server) thì **reverse proxy** nói đến việc **receive request** (requests come in from client to server). Trông nó như này:

![](https://i.imgur.com/wFFPRQ0.png)

Ví dụ thực tế, Thảo nhờ chăm chỉ đi cày ngày đêm nên tậu được cho mình con iPhone 13 Pro Max 1TB xịn xò. Dùng chưa được bao lâu thì máy lỗi, Thảo gọi đến cửa hàng để bảo hành. Bộ phận CSKH thì nhân viên đông vô kể, sáng ngày trực điện thoại. Sau khi gọi và xác nhận thông tin, Thảo được nối máy cho anh nhân viên Tokuda để tư vấn. Thế quái nào Tokuda lại đúng là anh khách ruột của Thảo, cuộc hội ngộ thật bất ngờ...

![](https://i.imgur.com/nZF1TUa.png)

Có thể hiểu **reverse proxy** trong trường hợp này là con bot có nhiệm vụ xác định danh tính của Thảo để chuyển tiếp cuộc gọi đến đúng chăm sóc viên. Trong phần mềm, **reverse proxy** lúc này thuộc về hệ sinh thái của server, với nhiệm vụ nhận request từ client và điều hướng đến các server thật phía sau để xử lý. 

Với **forward proxy**, server không thể biết request được gọi từ đâu thì tương tự với **reverse proxy**, client không biết request thực sự được gửi tới server nào để xử lý (client cũng chẳng cần quan tâm tới việc này).

Khi kết hợp **forward proxy** và **reverse proxy**, bức tranh tổng thể trông như này:

![](https://i.imgur.com/4T3UFRc.png)

### 3.2) Advantages

Phần cuối cùng đây rồi, **reverse proxy** dùng làm gì, hay nói cách khác lợi ích mà **reverse proxy** đem lại như thế nào?

- **Load balancing**: chính là ví dụ trên với Thảo và chiếc iPhone. Trong lập trình đó là việc phân tán các request đồng đều đến nhiều server khác nhau nhằm mục đích tăng throughput, giảm letancy, phục vụ số lượng client lớn hơn. Còn mục đích này có đạt được hay không lại tuỳ thuộc vào ông Solution Architect, Software Architect, Engineer, Developer...
- **Security**: có thể coi firewall chính là một **reverse proxy**, có nhiệm vụ chặn các truy cập khả nghi đến server, làm rate limit, chặn DDOS (một phần)...
- **Caching response**: giống với **forward proxy**, khi có request đến có thể nhanh chóng response luôn mà không cần gửi request đến server.

Ok, vậy là đã xong 2 khái niệm về **forward proxy** và **reverse proxy**, nếu có thắc mắc hoặc câu hỏi gì thì để lại comment bên dưới nhé. See you in next post!

### Reference

- https://youtu.be/AuINJdBPf8I
- https://www.jscape.com/blog/bid/87783/forward-proxy-vs-reverse-proxy
- https://www.strongdm.com/blog/difference-between-proxy-and-reverse-proxy

### After credit

Thực tế các SE sẽ quen và làm việc nhiều hơn với **reverse proxy**, ứng dụng thực tiễn của nó chính là **Load Balancer** và **API Gateway** trong MSA. Bài sau sẽ so sánh cụ thể và tìm hiểu kĩ hơn về 2 term này!

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)