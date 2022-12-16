Bức tranh lớn phía sau facebook, zalo, telegram và những chiếc tutorial làm app chat nhan nhản trên mạng.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/myr2ce5m2n_DzdKgqMXcAETAEv.jpeg)

Nếu các bạn là những người làm nodejs thì chắc hẳn ai cũng từng ít nhất 1 lần nhìn thấy hoặc đọc được những chiếc tutorial đại loại như: "Tạo ứng dụng chat đơn giản trong vòng 1 giờ...", "Chat real time với nodejs và socket.io...", bla blo và muôn vàn những bài viết, video, tutorial tương tự như vậy. 

Tác dụng đầu tiên của những chiếc tutorial như thế này là đem lại cho bạn sự tự tin. Tự tin bởi vì chỉ trong vòng 1 thời gian ngắn ngủi mình đã có thể tạo được một ứng dụng chat tưng tưng như thật, tự tin bởi vì cảm giác mình sắp build được facebook messenger đến nơi vậy =)). Việc có rất nhiều tutorial vô hình trung đã khiến cho chat app trở thành bài toán phổ thông mà mọi thanh niên tập làm nodejs (nói riêng) đều gặp phải, và có khi đều nghĩ nó dễ dàng.

Nhưng có thật như vậy không?

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kztczqesx4_will-it-be-easy-nope-worth-it-absolutely-quote-1.jpg)

## First things first 

Đã lại được một thời gian khá lâu kể từ bài viết kết thúc series [**Caching đại pháp**](https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z) của mình. Covid cô veo rồi công việc mới khiến mình bận rộn với những chiếc deadline và hiếm có thời gian rảnh để nghiêm túc suy tư về những thứ ngoài lề. Cho đến tận giờ, sau 1 khoảng thời gian đẩy cho thằng cu em chân ướt chân ráo làm hệ thống chat thì mình mới có cái để mà tán phét với các bạn. 

Nói là tán phét nhưng mình cũng nhận ra là dù sau bao nhiêu năm, bao nhiêu ông đã đi trước, làm trước, ngon trước dở trước thì bài toán chat vẫn là 1 bài toán hot được nhiều người quan tâm và có mong muốn được có **trải nghiệm thực sự** (chứ không phải cưỡi ngựa xem hoa như mấy tutorial). Do đó mình sẽ cố gắng để đề cập đến những vấn đề **hiện thực khó nhằn** nhất chứ không phải sự dễ dàng đơn giản như cảm giác mà tutorial mang lại cho bạn.

Một điểm nữa, lần này mình không đóng vai trò là cốt đờ trực tiếp nữa mà chỉ là người tư vấn về giải pháp thôi, nên mọi góc nhìn của mình đều sẽ xuất phát từ bức tranh giải pháp tổng thể chứ không chỉ là về mặt công nghệ. 

Và cuối cùng, xin hân hạnh giới thiệu họa sĩ: **Leonardo Da Monmen** - cũng chính là mình - người sẽ cùng các bạn khám phá bức họa nhiều màu sắc này. Bởi vì bức tranh này chỉ nói về realtime communication, các bạn hãy tìm hiểu trước 1 số khái niệm cơ bản như:

- **Two-way communication**
- **Websocket**
- **Server-sent events**
- **Short polling, long polling** 
- **MQTT**

Bài viết này sẽ không đề cập tới cách thiết kế DB, lựa chọn DB hay code như thế nào mà chỉ đề cập tới realtime communication thôi, nhé.

## Từ những bước chân của gã khổng lồ phía trước

Vậy nếu một ngày đẹp trời bạn được sếp giao cho xây dựng hệ thống chat với yêu cầu rất ngắn gọn: "làm nó giống như facebook zalo là được", bạn sẽ làm gì? 

**Tìm tutorial?**

**Đọc sách về system design?**

**Lên Educative.io làm khóa học thiết kế chat app cho million users?**

**Tìm facebook engineering blog xem có tiết lộ tý nào về cách họ làm không?**

**Gu gờ thần chưởng: "how to make a chat app" với 3 tỷ 380 triệu kết quả?**

Tất nhiên là phải đi xem facebook, zalo người ta làm như thế nào rồi. Mở ngay web của họ ra xem có gì hot nào? Chúng ta hãy cùng thử xem những cái tên phổ biến nhất trong làng chat chit đã làm gì với bài toán realtime communication nhé. 

Bởi vì mình hơi lười ngồi đục app nên là sẽ chỉ inspect trên web cho các bạn xem thôi nhé. Tất nhiên là công nghệ dành cho app có thể khác với web bởi vì nó native hơn, tuy nhiên nó cũng cho chúng ta 1 vài cái nhìn sơ lược về cách họ làm rồi.

Hãy mở phiên bản web của Messenger, Instagram, Telegram, Slack, Discord, Zalo và ấn F12 xem chúng ta có gì dựa trên những tính năng chính của 1 backend chat:

- **List threads, list messages**
- **Send message**
- **Receive message**
- **Typing**
- **Seen**

### Facebook messenger

- Công nghệ sử dụng: **MQTT over Websocket**
- Tính năng: **send message, receive message, typing, request,... all over websocket**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qg4g4ixy5b_Screenshot%20from%202021-08-02%2020-46-57.png)

Trên đây là response khi mình bắt request WS tới server edge-chat.messenger.com của họ. Các bạn hãy thử chat và nhìn xem họ gửi message như thế nào. Dễ thấy gần như các yêu cầu về load data, list items, send, receive message, typing,... đều được thực hiện qua việc publish message và subscribe websocket chứ không sử dụng API.

### Instagram

Tất nhiên là gà cùng 1 mẹ thì công nghệ đá nhau à giống nhau rồi. Thế nhưng để ý kỹ 1 chút thì sẽ thấy có 1 vài điểm khác biệt.

- Công nghệ sử dụng: **MQTT over Websocket** + **API**
- Tính năng: 
    + **send, receive, typing over websocket**
    + **list items, seen, list user online,... over API**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/swtp2usvss_Screenshot%20from%202021-08-02%2021-00-35.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/l1a0yuzhn9_Screenshot%20from%202021-08-02%2021-00-58.png)

Thấy thằng con khác với thằng cha chỗ nào rồi chứ? Chính là việc không hoàn toàn sử dụng ws giống như FB. Tiếp tục nhé.

### Telegram

- Công nghệ sử dụng: **Websocket**
- Tính năng: **All over websocket**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2x981f0ryg_Screenshot%20from%202021-08-02%2021-11-07.png)

Quả núi to lù lù của telegram gần như giống facebook, dù không biết công nghệ gì đứng sau websocket của họ nhưng mọi tính năng từ get data, send, receive message,... đều được thực hiện hoàn toàn qua websocket.

### Slack

- Công nghệ sử dụng: **Websocket** + **API**
- Tính năng:
    + **receive, typing over websocket**
    + **list items, send message,... all over API**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/3hq6mhwpv6_Screenshot%20from%202021-08-02%2021-17-44.png)

### Discord

- Công nghệ sử dụng: **Websocket** + **API**
- Tính năng: 
    + **receive message over websocket**
    + **list items, send message, typing, seen... all over API**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8ulo4otkii_Screenshot%20from%202021-08-02%2021-24-58.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/e38kpgq0gb_Screenshot%20from%202021-08-02%2021-25-22.png)

### Zalo

- Công nghệ sử dụng: **API** + **HTTP long polling**
- Tính năng:
    + **receive message over HTTP long polling**
    + **list items, send message, typing, seen... all over API**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/1tg8n7kx0w_Screenshot%20from%202021-08-02%2021-28-54.png)

## Tới bước chân nhỏ bé phía sau của chúng ta

Vậy thì mình đã nhìn thấy gì sau khi ngắm nghía cách mà các ông lớn xây dựng web chat của họ? 

- Những ông **rất lớn** sử dụng **hoàn toàn bằng websocket / tcp**
- Những ông **vừa vừa** sử dụng kết hợp **websocket cho việc nhận tin từ server** và **API cho việc gửi tin lên server**
- Ông zalo thì mình không biết được tại sao ổng làm vậy. Các bạn tìm hiểu thêm xem.

Ở đây thì mình có đưa ra 1 số phỏng đoán dựa trên kinh nghiệm như này. Nếu sai các bạn hãy góp ý để mình hiểu thêm chứ đừng chê cười nhé.

- Mặc dù performance truyền tải của websocket tốt hơn so với gọi HTTP request, tuy nhiên **scale server websocket rất khó**, do việc nó phải mở kết nối persistent, lưu trữ trạng thái và phiên của client dẫn đến nó có tính chất **stateful**. Về cơ bản là bạn không thể dễ dàng scale ngang những ứng dụng **stateful** giống như **stateless** được. Do đó nó chỉ được tận dụng để **chủ động gửi tin từ server xuống client**. Nếu các bạn còn làm nó phải xử lý logic như ghi nhận message gửi lên,... thì là thêm gánh nặng cho nó rồi.
- HTTP API vẫn được sử dụng cho hầu hết các tác vụ **gửi tin lên server** do việc scale phần stateless API dễ hơn rất nhiều so với scale websocket, ngoài ra còn tận dụng được các lớp middleware có sẵn như authen, author, rate-limit,...
- Các ông lớn như FB hay telegram khi đã có thể tự build các **hệ thống websocket có khả năng scale xịn** thì có xu hướng chuyển request sang hoàn toàn websocket để **tối ưu việc truyền tải gói tin**. Việc này đòi hỏi **đồng bộ cả cơ chế request data** cho các tác vụ bình thường không cần realtime. 
- Instagram được FB mua lại chứ không phải được phát triển gốc từ facebook, nên cũng sẽ có những khoảng gap giữa **hệ thống đồng bộ của FB (dùng hoàn toàn ws)** và **hệ thống có sẵn của instagram**. Việc chỉ sử dụng 1 phần công nghệ realtime giống facebook sẽ hợp lý.
- Các ông vừa vừa build hệ thống websocket chưa to được bằng như Slack, Discord thì vẫn **tận dụng khả năng scale của HTTP API** và chỉ dùng websocket cho việc **chủ động gửi tin từ server xuống client** hoặc **những request có tần suất lớn như typing**.
- Ông zalo sử dụng hoàn toàn API và HTTP long polling cho web có thể vì vài lý do (theo mình đoán):
    + **Support những browser rất cũ tại VN**. Mình nghĩ đây là 1 lý do khá hợp lý bởi Zalo hướng tới độ phủ user rộng tại VN bao gồm cả những người sử dụng các hệ thống máy tính tại cơ quan, công sở rất cũ. HTTP long polling thì tương thích với những browser cũ này, Websocket thì chưa chắc.
    + Bản web chỉ là bản phụ so với app PC và app mobile (mà ở đó họ có thể dùng 1 cơ chế khác).
    + **Scale API thì dễ dàng hơn scale WS**.

Sau khi nhìn những phân tích này, các bạn hãy nhớ đến 1 tranh cãi bấy lâu nay xảy ra giữa những người **mới tập tành làm realtime** và **những người làm lâu năm**:

- **Sử dụng hoàn toàn WS để gửi, nhận tin hay chỉ dùng WS cho việc nhận?**

Có 2 tập hợp người đưa ra phương án **sử dụng hoàn toàn WS để gửi, nhận tin**:

- 1 là những người mới tập làm realtime, chưa có nhiều kinh nghiệm
- 2 là những người kỳ cựu trong làng realtime, có rất nhiều kinh nghiệm với hệ thống lớn

Lý do họ đưa ra là truyền tin qua WS sẽ có overhead ít hơn so với call 1 API nhờ tiết kiệm quá trình bắt tay giữa client và server. 

**ĐIỀU NÀY HOÀN TOÀN ĐÚNG**. Không có gì sai với lý thuyết này cả. Chỉ có điều ứng dụng do 2 tập hợp người này viết ra thì sẽ đi theo 2 hướng:

- Người chưa có nhiều kinh nghiệm sẽ làm ra 1 hệ thống cực kỳ khó để scale và thường chết yểu khi traffic tăng lên mức trung bình.
- Người kỳ cựu làm ra 1 hệ thống như telegram và facebook.

Còn lại 1 tập hợp người đưa ra phương án **chỉ sử dụng WS cho việc nhận tin từ server** là những người đã có kinh nghiệm và tính toán tới cả việc họ **có thể scale được hệ thống WS đó hay không**. Những người này sẽ có thể làm ra những hệ thống nhỏ, rồi scale lớn dần như Slack hay Discord. Việc họ có chạm được tới Telegram hay FB hay không thì không ai biết, nhưng ít ra là còn khả thi với những con người nhỏ bé như chúng ta.

Và vòng xoáy trôn ốc của kiến thức sẽ từ đó mà sinh ra:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/bae5eweyzl_spiral.png)

Cuối cùng thì mình đã lựa chọn thế nào? 

- **Gửi data lên qua HTTP API**
- **Nhận data do server push xuống chủ động qua websocket**

Đây có lẽ là kiểu sẽ giúp hệ thống của mình sống tới mức nó đủ lớn. Ít ra vẫn đủ khả năng nghĩ cách scale hệ thống này chứ chưa đạt level thượng thừa như tụi FB tele được.

## Những gam màu xám xịt 

Gạt qua một bên câu chuyện về những gã khổng lồ hay việc kiến thức cũng có sự lớn khôn và phù hợp. Anh em hãy cùng mình trải nghiệm những gam màu xám xịt mà giới dạy học không hề nói cho chúng ta khi họ đưa ra chiếc tutorial **Build a real-time chat app in 3 hours**.

### Socket.io?

Đơn giản chỉ là 1 library giúp chúng ta một số công việc chân tay nặng nhọc như tạo server, ping pong, keep alive, store session,... Đây có thể coi là library gần như ai cũng biết mặt nếu làm việc với nodejs realtime. Anh em mới làm cũng rất hào hứng sử dụng nó, coi nó là magic khi mà việc gửi và nhận tin nhắn xảy ra quá dễ dàng chỉ với vài dòng code. Thế nhưng cái pain in the ass của nó thì thầy giáo lại không nói.

- **Không có cơ chế QoS**. Sớm thôi, các bạn sẽ trải nghiệm **niềm vui** khi mạng của client vốn không được ngon và thông suốt như tưởng tượng mà cứ chập chờn chập chờn, lúc tắt lúc bật. Khi ấy bạn không thể tin tưởng socket.io được nữa bởi nó không có cơ chế đảm bảo QoS (quality of service). Việc các bạn thất lạc message xảy ra như cơm bữa và tất nhiên, mất message chính là tại bạn chứ chẳng tại ai cả.
- **Scale rất ảo**. Khi các bạn vượt qua giới hạn 1 node ws, các bạn sẽ tính đường scale nó lên. Lúc này redis adapter sẽ xung trận với vai trò cầu nối giữa các node thông qua redis pubsub. Tuy nhiên cơ chế đếm callback của pubsub tương ứng với số lượng node thật sự là gây rắc rối cho mình không ít khi gắn các process khác với khả năng emit message vào chung. Và còn vấn đề môi trường nữa chứ, bởi vì redis pubsub được sử dụng không theo database number mà trên toàn server redis, nên các môi trường lại lẫn lộn message vô nhau.
- **Version break**. Cho tới giờ socket.io vẫn đang phát triển, và một số tính năng mới muốn sử dụng thì phải cài version mới. Tại thời điểm mình sử dụng thì phần typescript cũng như các adapter của nó đều chưa hoàn thiện, và cắm code vào chạy toàn nhận những tràng error đỏ lòm.
- **Ack bằng callback**. Mình không thích callback. Vậy thôi. Tất cả các event mình sử dụng trên socket.io đều là fire and forget. Còn các bạn đừng thấy callback tiện mà lạm dụng, hậu quả khó lường lắm đó.
- **Ping pong thường xuyên lỗi và không ổn định**. Điều này làm bọn mình dở khóc dở cười rất nhiều. Dù mạng ngon nhưng mà thằng client socket.io vẫn thường xuyên bị dis kết nối không rõ lý do sau 1 thời gian dù đã thử đủ cách như đổi thời gian ping pong mặc định, tăng timeout cho LB,... Rút cục mấy issue đó đều để open và người ta cũng chỉ bảo: thôi mày đen.

Socket.io đã làm tốt công việc của mình ở mức cơ bản. Nhưng để implement nó vào 1 app chat với độ tin cậy cao thì các bạn còn phải làm nhiều điều nữa như tự đảm bảo QoS, scaling, track nọ track chai,... **Trong đó việc khó nhất chính là đồng bộ state của client với server khi xảy ra mất kết nối**. Hãy nhớ điều này nhé.

Thế mới thấy té ra mọi thứ không hề đơn giản như chiếc tut mấy dòng code demo.

### MQTT?

MQTT là một cái tên nổi tiếng trong làng IoT vì kích thước truyền tải nhỏ, phù hợp với các loại mạng phập phù của hội thiết bị thông minh 5.0. Nó được thiết kế theo cơ chế publish / subscribe và built-in khá nhiều tính năng chất lượng như QoS, persistent session, last will message,... Đây cũng là giao thức được Facebook sử dụng cho ứng dụng realtime của họ (như mình phân tích ở trên là MQTT over Websocket). 

Ok, mình cũng hớn hở bắt tay vào làm rồi tìm hiểu với mong muốn đưa ứng dụng chat của mình lên tầm thế giới. Nhưng mà làm chat với MQTT nó lại không hề đơn giản như là socket.io mà chúng ta vẫn thường quen.

- **Thay đổi hoàn toàn mindset**. Ở MQTT không có khái niệm room hay routing backend. Room là khái niệm hoàn toàn thuộc về mặt quản lý ở backend của socket.io, do vậy các bạn dễ dàng tạo các phòng chat, thêm user vào và emit message tự động tới các phòng. Thế nhưng ở MQTT thì các bạn phải tự làm việc quản lý room, tự làm việc emit tới từng topic cụ thể bởi vì việc **lắng nghe topic nào lại phụ thuộc client**. Việc subscribe vào 1 topic thường chỉ xảy ra khi khởi tạo kết nối và rất hạn chế việc bạn bắt client unsubscribe hay subscribe topic mới. Điều này khác hoàn toàn với mindset khi làm với socket.io.
- **Scale không dễ như quảng cáo**. Khi sử dụng MQTT thì đa số chúng ta sẽ dùng luôn message broker của 1 bên thứ 3 nào đó, như là Mosquitto, VerneMQ hay EMQ X. Mấy ông này thì đều quảng cáo là scale ngang kinh khủng khiếp, thế nhưng qua việc sản phẩm bên mình chạy thử vài thằng thì tới lúc chạy cluster với traffic cao cao 1 chút là phát sinh ra đủ thứ issue vấn đề và tất nhiên là không được như quảng cáo. Chán đời nhưng cũng chả biết làm thế nào vì cuộc sống vẫn phải phụ thuộc thằng khác. Có vấn đề, có issue mà nó không sửa thì cũng chịu.
- **Conflict connection**. Đây là một vấn đề hết sức tricky dưới client. Muốn dùng được tính năng persistent session thì phải giữ nguyên Client ID, thế nhưng giữ client ID mà code dưới app làm không chuẩn - trường hợp này bọn mình gặp rất nhiều. Dù app define duy nhất 1 instance mqtt connection là singleton nhưng thế quái nào vẫn sinh ra vài cái instance cùng ID dẫn đến các client tự kick nhau và không thằng nào connect được cả. Vấn đề này người làm backend như mình thật sự bất lực khi không thể can thiệp gì vô mà phó mặc hoàn toàn cho ae client. 
- **Security khó hơn**. Nếu các bạn làm với socket.io rồi thì sẽ thấy authn, authz trên đó còn dễ chán. Security cho hệ thống mqtt phức tạp hơn nhiều bởi việc quy hoạch topic và subscribe pattern. Mindset của mình thường là security first, do đó mình nhận ra luôn security mqtt rất khổ ngay từ khâu thiết kế. 

Nếu mọi người không để ý, đây sẽ là hệ thống dễ tấn công hơn nhiều so với hệ thống API vốn đã tồn tại từ lâu đời và mọi người đều có nhiều kinh nghiệm. Security ở đây còn không chỉ là ở việc mình có sử dụng đúng không mà còn xuất phát từ chính phần mềm của bên thứ 3 nữa. Vài hôm trước mình có support 1 issue security liên quan tới lỗ hổng của EMQ X cho phép mình bypass auth và gửi dữ liệu sai cho client khác. Đến giờ là gần 1 tháng và issue still open :|

Nhưng mà thôi, bỏ qua những cơn mưa giăng khắp lối, implement MQTT cũng khiến hệ thống chat của mình khá ổn định, không bị miss message như trước và nhìn chung là đáng đồng tiền bát gạo. Hy vọng nó sẽ trụ được lâu lâu chút.

## Vài lời sau cuối

Realtime communication là một bài toán phức tạp và đòi hỏi mọi người phải học hỏi rất nhiều. Ban đầu có thể dễ như ăn cháo, nhưng càng về sau dù yêu cầu thì vẫn ngắn gọn: **như facebook zalo** nhưng ta lại gặp phải không biết cơ man nào là vấn đề như kết nối với app thiếu ổn định, duplicate connection, conflict connection, duplicate message,... 

Thôi hy vọng sau bài viết này, lăng kính của các bạn trẻ sẽ bớt hồng đi một chút, bởi vì thứ đang chờ đợi các bạn khi sếp yêu cầu làm app chat không phải là con đường trải đầy hoa hồng đâu. Chúc các bạn mạnh mẽ để tiếp tục dấn bước nhé.