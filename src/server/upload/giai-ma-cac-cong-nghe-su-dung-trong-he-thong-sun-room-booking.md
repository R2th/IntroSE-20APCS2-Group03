Xin chào tất cả mọi người. Sau một thời gian vắng bóng trên chiến trường Viblo thì mình đã trở lại rồi đây. Dạo gần đây trên trang báo điện tử chính thức của Sun* có đăng một bài về dự án Room Booking sử đụng các công nghệ AI để quản lý phòng họp, chi tiết tại [đây](https://news.sun-asterisk.com/vi/p/rooms-booking-dat-phong-hop-bang-ai-chuyen-chi-co-o-sun-n1ZdpxxAPr6). Đây là một dự án nội bộ của Sun* tuy nhiên nó cũng có nhiều kĩ thuật khá hay mà mình nghĩ rằng nó đáng để chia sẻ. Đứng trên góc nhìn là người hỗ trợ chính về các vấn đè kĩ thuật, đặc biệt là các kĩ thuật liên quan đến xử lý ảnh và IoT thì hôm nay mình sẽ chia sẻ một bài viết **giải mã** các công nghệ được sử dụng trong dự án đang nhận rất nhiều sự quan tâm này. OK giờ chúng ta bắt đầu thôi 

# Mục tiêu của hệ thống 

Tại thời điểm bắt đầu lên specs cho dự án này thì cũng là lúc những vấn đề nổi cộm trong việc đặt phòng tại Sun* trở nên nhức nhối. Mình nghĩ không chỉ tại Sun* mà với khá nhiều công ty cũng gặp phải tình trạng này. Việc book phòng được thực hiện bởi một vài người thuộc bộ phần Back Office thế nên việc phải trở lời những câu hỏi lặp lại như:

> “Chị ơi cho em hỏi sáng ngày mai có còn phòng nào còn trống không?”
> “Chị ơi cho em hỏi phòng Vientiane thứ 3 tuần sau có trống giờ nào không để cho em book với?”, 
> “Chị ơi em đang cần phòng họp gấp với khách hàng, không biết có phòng nào trống, hay có ai book mà không sử dụng không ạ?” … 

Để trả lời những câu hỏi như trên thường tốn rất nhiều thời gian, hơn nữa tuần suất của các câu hỏi này diễn ra thường xuyên khiến các bạn BO không khỏi *hoa mắt chóng mặt*. Vậy yêu cầu đặt ra là làm sao để giải quyết được các vấn đề kể trên.  Và cũng kể từ đó thì hệ thống quản lý đặt phòng ra đời 

![](https://news.sun-asterisk.com/images/750/f18f6020-f3ea-4c1b-8731-dcb1ca1b1eab.jpg)

Điều chúng ta có thể nghĩ ngay đến đó là một hệ thống backend quản lý các thông tin đặt phòng của mọi người, cho phép đặt phòng và kiểm tra các trạng thái tuy nhiên một hệ thống backend là chưa thể đủ để giải quyết tất cả các vấn đề nêu trên. Ví dụ như case **Chị ơi em đang cần phòng họp gấp với khách hàng, không biết có phòng nào trống, hay có ai book mà không sử dụng không ạ?** thì bản thân hệ thống sẽ không thể check được số lượng người thực tế hiện đang có mặt trong phòng là bao nhiêu bởi rất có thể trạng thái  phòng thì đã được book trên hệ thống tuy nhiên vì một lý do nào đó mà không sử dụng. Và đó chính là lúc bọn mình tính đến các giải pháp đếm số lượng người xuất hiện trong phòng.  Và từ đây một loạt các thử nghiệm đã được tiến hành để cho ra được một kết quả tốt nhất. Bây giờ mình sẽ cùng các bạn đi bóc mẽ chi tiết các thành phần trong đó nhé.  

# Giải mã hệ thống đếm người 
## Làm sao để biết phòng có người hay không?
Mới đầu nghe thì có vẻ đơn giảntuy nhiên lúc bắt đầu survey các giải pháp để thực hiện thì lại xuất hiện khá nhiều các vấn đề phát sinh từ việc lựa chọn các thiết bị, lựa chọn các cảm biến sao cho phù hợp với bài toán. Yêu cầu đầu tiên của hệ thống này là check được xem trong phòng họp hiện có người sử dụng hay không. Và bạn mình có tiến hành survey các giải pháp như sau:
### Giải pháp 1: Lắp camera theo dõi tại cửa ra vào:
#### Ý tưởng đơn giản 
Mô hình này rất đơn giản bao gồm camera được gắn vào phía trên của cửa ra vào trong phòng họp. Khi có người qua lại thì bộ đếm sẽ tự đồng cộng giá trị (trong trường hợp có người vào phòng) hoặc trừ giá trị (trong trường hợp có người ra khỏi phòng). Bọn mình đã bắt tay ngay vào việc thử nghiệm các giải thuật detect (phát hiện người) và tracking (theo dõi đối tượng đã được detect) để xác định chiều di chuyển như mong muốn. Bước đầu giải pháp này được kì vọng sẽ đem lại độ chính xác khá tốt so với những giải pháp khác. Mọi người có thể hình dung giải pháp này như ảnh bên dưới 

![](https://images.viblo.asia/c6042780-4bf6-4a30-b293-c8ff689d7088.gif)

#### Nhưng chưa thực sự phù hợp 
Mặc dù sau khi đã thử nghiệm giải pháp trên với những phòng họp nhỏ, lượng người ra vào thường rất ít thì giải pháp trên tỏ ra khá hiệu quả, việc đếm người sẽ cho một kết quả chính xác. Tuy nhiên giải pháp này gặp phải sai số khá nhiều với những phòng họp đông, lượng người vào chen chúc nhau có thể gọi là **như ong vỡ tổ**. Điều đó dẫn đến việc đếm số người bị sai. Việc đếm số người bị sai một chút thực sự không có ảnh hưởng quá lớn với những bài toán như **Đếm số người ra vào trong cửa hàng** tuy nhiên lại thực sự có vấn đề với bài toán **Có bao nhiêu người hiện đang ở trong phòng** bởi số người còn lại trong phòng được tính đơn giản bởi công thức: 

$$Số người trong phòng = Số người vào - Số người ra$$

Điều này dẫn đến việc hệ thống trả ra kết quả sai. Ưu điểm của phương pháp này đó là việc tính toán kết quả nhanh và công thức đơn giản. 

### Giải pháp 2: Sử dụng cảm biến chuyển động 
#### Ý tưởng siêu đơn giản 
Cảm biến chuyển động là loại cảm biến dựa trên tín hiệu hồng ngoại để phát hiện chuyển động. Điều đó có nghĩa rằng nếu có một vật thể sống chuyển động qua vùng hồng ngoại của cảm biến thì sẽ trả về giá trị là 1. Việc đơn giản là lắp một thiết bị cảm biến hồng ngoại vào trong phòng, điều chỉnh phạm vi của hồng ngoại và nhận đầu ra của dữ liệu thông qua một bo mạch nhúng. Bọn mình sử dụng cảm biến PIR **Parallax Inc 555-28027** mua gần 20$ được đặt hàng trực tiếp từ Mỹ để đảm bảo độ chính xác tốt nhất đồng thời sử dụng bo mạch Arduino với chip Wifi ESP 8266 để truyền nhận dữ liệu lên trên server. Mô hình chung của hệ thống cũng khá đơn giản do chỉ có hai đối tượng là bo mạch và cảm biến giao tiếp với nhau.  Cảm biến nhận diện khá  tốt đối những trường hợp có nhiều chuyển động trong cuộc họp như gõ bàn phím, nói chuyện ... Sơ đồ đấu nối của cảm biến và bo mạch thực hiện như sau:

![](https://hackster.imgix.net/uploads/attachments/298182/nodemcu_pir_bb_IzEhC0NtEh.jpg)

#### Nhưng chưa thực sự phù hợp 
Mọ thứ tưởng chừng như đã đi đến hồi kết cho đến một ngày mình nhận được tin nhắn: 
> Em ơi sao anh ngồi trong phòng từ nãy đến giờ để đọc tài liệu mà lại báo là phòng không có người 

Vậy là một vấn đề của hệ thống đã được phát sinh. **Với những người ngồi im như tượng thì sẽ báo không có người trong phòng**. Vậy là hệ thống lại đi vào bế tắc một lần nữa đồng nghĩa với việc giải pháp của chúng tôi cần phải xem xét lại. 

### Giải pháp 3: Kết hợp các loại cảm biến
Vấn đề đã trở lên phức tạp hơn khi chúng tôi thử nghiệm với các loại cảm biến khác nhau. Nếu như một mình cảm biến chuyển động mà không được chúng tôi sẽ đưa thêm cảm biến âm thanh, cảm biến ánh sáng vào trong phòng họp. Trường hợp này làm cho mô hình của chúng tôi có độ chính xác tốt hơn tuy nhiên vẫn chưa thể giải quyết được trường hợp có người ngồi im trong phòng, không nói chuyện thậm chí là không bật đèn nữa. Hệ thống lại sắp đi vào bế tắc 

### Sao không dùng camera tại vị trí trong phòng họp?
Có thể bạn sẽ đặt ngay câu hỏi này khi đọc hết các phần trên của mình, **Sao không dùng camera để đếm người**. Vấn đề sử dụng camera trong phòng họp là một sự đấu tranh rất nhiều của team dự án với các đội dự án khác trong công ty. Đương nhiên việc sử dụng camera sẽ dẫn đến một số rủi ro nhất định trong việc lộ thông tin cuộc họp, thông tin dự án và thậm chí cả những thông tin riêng tư của những người đang họp trong phòng họp đó. Điều này dẫn đến việc sử dụng camera không được đưa ra làm giải pháp đầu tiên. Vấn đề chỉ thực sự phát sinh khi các giải pháp của chúng tôi tìm hiểu tỏ ra chưa thực sự khả thi trong thực tế mà thôi. Bắt đầu đau đầu rồi đấy các bạn ạ. Thực ra giải pháp cuối cùng chúng tôi cũng có thể sử dụng các thiết bị có bán sẵn trên thị trường nhưng với cái lòng tự tôn của một team công nghệ thì thực sự đó là điều tối kị. Những câu hỏi lớn được đặt ra 

![](https://chantroimoimedia.com/wp-content/uploads/2018/08/d%E1%BA%A5u-h%E1%BB%8Fi-1.jpg)

### Sự thoả thuận với khách hàng 
Mặc dù là dự án nội bộ nhưng khách hàng của chúng tôi cũng khó tính không kém gì các khách hàng bên ngoài. Và cuối cùng thì sau nhiều buổi họp, sau rất nhiều lần hứa hẹn, đàm phán, cam kết thì bộ phận quản lý về security của công ty cũng đồng ý cho chúng tôi lắp đặt camera sử dụng cho mục đích đếm người trong phòng họp với các thỏa thuận tuyệt đổi:
* **Dữ liệu hình ảnh chỉ được xử lý tại thiết bị nhúng, không được đẩy lên server**
* **Chỉ gửi lên server kết quả của mô hình đã được thực hiện dưới thiết bị nhúng**
* **Tất cả các thiết bị chỉ truyền nhận dữ liệu trong giải mạng nội bộ của công ty**

Sau khi xem xét về các vấn đề kĩ thuật. Chúng tôi kí kết cam kết bảo mật và cũng như để bắt đầu một chặng đường mới nhiều thử thách và cũng thú vị hơn rất nhiêu


## Làm sao để biết có bao nhiêu người trong phòng?
### Lựa chọn thiết bị  
Việc có thể tích hợp được các phương pháp xử lý ảnh dưới thiết bị nhúng trong một khoảng thời gian phát triển nhanh nhất (bởi team mình không có kinh nghiệm làm việc với các thiết bị nhúng) chính vì thế việc lựa chọn thiết bị tương thích với các framework về xử lý ảnh và các giải thuật Machine Learning, Deep Learning sẵn có là ưu tiên đầu tiên. Hơn nữa giá thành của mỗi thiết bị cũng phải đủ rẻ để có thể cạnh tranh giải pháp với mỗi thiết bị có bán sẵn trên thị trường. Sau một hồi tham khảo các thiết bị chúng mình lựa chọn **Rapberry Pi 3 B+** với module camera để thực hiện cho giải pháp trên. 
![](https://sg.element14.com/productimages/large/en_GB/SC14013-40.jpg)

Các ưu điểm của thiết bị này như sau:
* Giá thành hợp lý 
* Hỗ trợ cài đặt hệ điều hành Ubuntu từ đó có thể cài đặt sẵn những phần mềm hỗ trợ như OpenCV, Pytorch, Tensorflow... 
* Hỗ trợ đầy đủ các chuẩn giao tiếp không dây như Bluetooh, Wifi và đương nhiên là có cả cổng LAN 
* Cộng đồng hỗ trợ đông đảo
* Độ bền cao do thường được sử dụng làm bộ điều khiển trong tâm trong các thiết bị IoT 
### Thiết kế giải thuật 
#### Lúc đầu là detect cả người 
Vì là bài toán đếm người nên ban đầu bọn mình nghĩ ngay đến việc áp dụng các giải thuật Machine Learning để giải quyết bài toán People Detection tức là nhận diện cơ thể người. Từ kết quả của mô hình sẽ tính ra được số lượng người đang trong phòng. Đây là một bài toán object detection kinh điển và có thể giải quyết bằng nhiều phương pháp khác nhau kể cả xử lý ảnh , Machine Learning hay Deep Learning. Và tất nhiên chỉ trong khoảng 2 ngày bọn mình đã ghép được một mô hình có thể detect được khá chính xác số lượng người trong phòng:
![](https://images.squarespace-cdn.com/content/v1/5a3c1a29f9a61e2987882112/1527130375211-0YGML6YFMAUQITSUWH1R/ke17ZwdGBToddI8pDm48kFTEgwhRQcX9r3XtU0e50sUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcjVvFZn3_1TpSINbj1p15LLAjcj6UHNkQOuDz3gO52lBvccB2t33iJEaqs_Hdgp_g/2nd.png?format=1000w)

Tuy nhiên một vấn đề thực sự nảy sinh trong một số trường hợp đặc biệt mô hình trả về kết quả chưa thực sự chính xác. Ví dụ như trong trường hợp người và ghế trong phòng bị lẫn màu với nhau, hoặc người họp quay lưng lại phía camera dẫn đến tình trạng không nhìn thấy được thân người 

Điều này làm cho mô hình đếm người không thực sự ổn định. Số lượng người bị thay đổi liên tục do có lúc detect sai. Sau khi phân tích dữ liệu bọn mình rút ra được một số case dẫn đến kết quả sai trong việc detect số người như sau:
* Người bị khuất góc 
* Người bị lẫn màu với ghế đen 
* Người bị che lẫn nhau, không nhìn rõ toàn bộ người 

Từ những sự phát hiện trên dẫn đến những sự cải tiến khác hơn nữa trong mô hình. 

#### Lúc sau chỉ là detect dầu người 
Sau khi phân tích dữ liệu và thấy mô hình detect toàn bộ cơ thể người không phù hợp cho bài toán trong phòng họp. Bọn mình đã chuyển hướng sang mô hình mới đó là **Detect đầu người** bởi vì mình nhận thấy trong phòng họp thì đầu người là bộ phận có thể nhìn thấy dễ dàng nhất từ góc nhìn của camera. Bọn mình có nói vui đó là trừ khi có người nào chui xuống gầm bàn họp thì mới chịu thôi. Vậy là sau một thời gian làm dữ liệu thì một mô hình mới ra đời đảm bảo được độ chính xác cao hơn mô hình cũ. 

![](https://i.ytimg.com/vi/DXj9L100iTA/hqdefault.jpg)

Tuy nhiên để cải tiến đến khi đạt được đến mô hình tốt nhất cũng có rất nhiều trải nghiệm. Trải nghiệm mà mình nhớ nhất đó là trong một ngày giông bão (theo nghĩa đen luôn) mà người họp lại thích dùng ánh sáng tự nhiên chứ không bật điện khiến cho phòng họp cứ nhá nhem tối dẫn đến mô hình bị sai một số người. Dù bọn mình cũng đã thực hiện khá nhiều bước augumentation dữ liệu nhưng thực sự khó có thể tái hiện đủ các case trên thực tế được. Điều này bắt buộc phải đòi hỏi sự kiên trì và nỗ lực cải tiến mô hình mới của cả team. 

### Tối ưu giải thuật 
Để mô hình có thể đạt được độ chính xác chấp nhận được nhưng quan trọng là phải chạy nhanh trên một phần cứng hạn chế như **Rapberry Pi** bọn mình đã phải tiến hành tinh chỉnh, giảm kích thước của mạng đồng thời áp dụng thêm nhiều kĩ thuật khác như model compression,knowledge distillation để có một mô hình nhẹ nhất. Để tìm hiểu thêm về các phương pháp này các bạn có thể tham khảo các bài viết trước đó của mình nhé. Sau khi giải quyết xong phần mô hình dưới device bọn mình còn thực hiện một số những cải tiến giúp cho mô hình hoạt động hiệu quả hơn và giảm thiểu số lượng tính toán của thiết bị. Có thể kể ra một số các trường hợp như:

- Sử dụng background substraction với threshold để phát hiện chuyển động giữa các frame. Nếu như không có chuyển động thì không chạy vào mô hình detection 
- Giới hạn khoảng thời gian phát hiện đối tượng tránh tính trạng detect liên tục trên các frame 
- Tự động suppend camera vào những khung giờ ngoài giờ làm việc như từ 6h tối đến 6h sáng để cho thiết bị có thời gian **nghỉ ngơi**

OK vậy là phần kĩ thuật đã được giải mã xong. Giờ chúng ta tiếp tục sang phần các phương thức truyền nhận dữ liệu nhé 


## Các phương thức truyền nhận dữ liệu 
### Dữ liệu được lưu ở đâu 
Sau khi lấy được dữ liệu từ các thiết bị nhúng thì chúng ta phải giải quyết đến bài toán lưu trữ liệu dữ liệu. Bạn thử tưởng tượng  số lượng dữ liệu được cập nhật gần như real time và với số lượng phòng lớn cỡ vài chục phòng thì lượng bản ghi cần phải lưu trong một ngày sẽ rất lớn và các thao tác truy xuất dữ liệu cũng đòi hỏi phải thật nhanh. Để đáp ứng với dạng dữ liệu này chúng mình lựa chọn lưu trữ dữ liệu theo dạng **time-series** với một database rất nổi tiếng trong việc lưu trữ này đó chính là **InfluxDB**. Nó cho phép lưu trữ các dữ liệu time-series và so với MongoDB thì nó nhanh hơn, nhẹ hơn rất nhiều lần 
> InfluxDB outperformed MongoDB in all three tests with 2.4x greater write throughput, while using 20x less disk space, and delivering 5.7x higher performance when it came to query speed.

Kiến trúc của hệ thống cơ bản như sau: 

![](https://www.survivingwithandroid.com/wp-content/uploads/2019/11/iot-system.png)

### Theo dõi dữ liệu như thế nào 
Để tiện thể cho việc theo dõi dữ liệu của từng phòng họp chúng tôi tích hợp một công cụ visualization data nổi tiếng đó là Grafana. Sự kết hợp của Grafana và InfluxDB được coi là một cặp đôi rất ăn ý. Grafana cho phép truy xuất dữ liệu theo từng giờ, từng ngày, tuần, tháng, năm .... 
![](https://images.viblo.asia/1f82e4c8-a330-496b-85ff-1134b765eb03.png)

### MQTT 
Do để tất cả các xử lý về xử lý ảnh được thực hiện ở dưới client nên việc gửi dữ liệu trên server được thực hiện đơn giản. Chúng tôi sử dụng một mô hình publish / subcriber với giao thức MQTT để có thể truyền nhận dữ liệu một cách realtime. Phía backend cũng như phía web client cũng sử dụng chung giao thức này để tiến hành hiển thị dữ liệu một cách real time. Để thực hiện việc này chúng tôi tự xây dựng một MQTT Broker trên server dùng chung cho cả web client và các thiết bị Rapberry Pi đặt trong phòng họp. Điều này đảm bảo các giao tiếp được thực hiện trong cùng một mạng nội bộ của công ty. 

![](https://i.morioh.com/62c64705df.png)

### RESTful API 
Để có thể giao tiếp với các bên backend khác để quản lý phòng họp, lịch họp chúng tôi xây dựng các endpoint API cho phép lấy các thông tin cần thiết. Phía backend API được viết sử dụng framework Django của Python 

# Giải mã hệ thống chatbot 
## Đầu vào đầu ra 
Vấn đề của hệ thống chatbot được đặt ra khi đại đa số những người dùng của Sun* được sử dụng Chatwork và muốn chat trực tiếp để hỏi thông tin phòng họp thay vì phải lên trang Backend. Điều này dẫn đến việc cần thiết cho ra đời một hệ thống chatbot phục vụ vấn đề này. Hệ thống chatbot được build thông qua server nội bộ của công ty giúp trả lời các yêu cầu qua chatwork. Việc xử lý chatbot và đoạn hội thoại được thực hiện trên cùng một backend Django viết các API. Đổi với chatwork cần phải tạo một tài khoản đặc biệt và cung cấp webhook cũng như API Key để có thể nhận được các tin nhắn, xử lý và trả lời lại người dùng. Tổng quan về hệ thống giao tiếp với Chatwork mình đã viết khá kĩ trong bài [Xây dựng chatbot tự động chat trên Chatwork với Chatterbot và Django](https://viblo.asia/p/xay-dung-chatbot-tu-dong-chat-tren-chatwork-voi-chatterbot-va-django-XL6lAxkBZek). 

![](https://news.sun-asterisk.com/images/750/3114b812-d908-4d4e-9fe9-0559b1fa1391.png)

Mình sẽ nói kĩ hơn về các bước xử lý trong phần chatbot này 
## Xây dựng dữ liệu 
Để có được bộ dữ liệu training cho chatbot thì bọn mình đã phải tự thu thập các câu nói mà người dùng hay hỏi trong khi sử dụng hệ thống book phòng họp. Sau đó phân chia dữ liệu vào các trường hợp cụ thể gọi là intents cũng như đánh dấu các thành phần cụ thể trong dữ liệu gọi là các entity. Việc xây dựng các bộ dữ liệu này mất khá nhiều thời gian và phải bổ sung nhiều theo thời gian 
## NLU Engine - xử lý NLP
Sau khi có dữ liệu thì bọn mình sử dụng một framework để training NLP khá nổi tiếng đó là RASA và cụ thể đó là RASA NLU Engine để cho mô hình phát hiện intents và nhận dạng các thực thể. 
![](https://hackernoon.com/hn-images/1*tDuTrYgBkx9lWrXp-wSHmQ.png)

Tuy nhiên do mô hình nhận dạng thực thể của RASA chưa thực sự được tốt cho tiếng Việt nên cần phải xử lý thêm khá nhiều Rule based trong quá trình hậu xử lý mô hình. Đây cũng là yếu tố các bạn nên cân nhắc nếu muốn sử dụng RASA NLU trong việc phát hiện entity cho tiếng Việt 
## Dialog Engine - quản lý hội thoại
Cuối cùng để ghép các câu thành một đoạn hội thoại theo từng kịch bản của chatbot thì bọn mình sử dụng RASA CORE kết hợp với một số Rule based để xây dựng mô hình. Các bạn có thể thắc mắc rằng tại sao lại sử dụng RASA mà không sử dụng một số framework online khác thì đơn giản là RASA có thể hỗ trợ offline nên phù hợp với tính chất nội bộ của dự án này. 
# Tổng kết

Trên đây là những kĩ thuật tổng quan của dự án  Room Booking được triển khai tại Sun*.  Ngoài ra còn rất nhiều các kĩ thuật khác liên quan đến quá trình phát triển cũng như deployment và monitor hệ thống này nhưng trong phạm vi một bài viết khó lòng nói hết hơn nữa cũng ít liên quan đến chủ đề AI mà mình hay chia sẻ nên hi vọng sẽ nhận được nhiều phản hồi từ các bạn. Xin chào và hẹn gặp lại các bạn trong những bài viết sắp tới.