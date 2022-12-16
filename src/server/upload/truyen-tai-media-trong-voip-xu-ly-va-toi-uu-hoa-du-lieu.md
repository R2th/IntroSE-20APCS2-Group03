Trong ứng dụng VOIP,  âm thành và hình ảnh được truyền từ máy này sang máy khác theo thời gian thực và phải qua nhiều giai đoạn:  
- Biến đổi tín hiệu số thu được thiết bị ngoại vi thành dữ liệu máy.
- Mã hoá và nén dữ liệu.
- Chia dữ liệu thành các gói nhỏ và đẩy lên internet.
- Sắp xếp dữ liệu nhận được.
- Giải mã dữ liệu.
- Tái tạo tín hiệu và hiển thị qua thiết bị ngoại vi.

Hiện nay công nghệ ngày một phát triển, những chiếc smartphone được trang bị những cấu hình rất tốt để xử lý mã hóa giải mã hình ảnh, âm thanh, cùng với đó là hạ tầng mạng 3G, 4G cũng đang phát triển chóng mặt với băng thông rộng có thể truyển tại một lượng lớn data một cách nhanh chóng, tuy nhiên chúng ta vẫn không thể hoàn toàn dựa vào phần cứng mà vẫn rất cần các phần mềm để hỗ trợ việc truyền dữ liệu tốt hơn. Vì thế chúng ta cần có những biện pháp xử lý để mang đến cho người dùng những trải nghiệm tốt hơn, tức là : 
- Đảm bảo dữ liệu được truyền với độ trễ thấp, nghĩa là khi hai người thực hiện cuộc voice call hay video call không thể chấp nhận được việc một người nói một lúc người kia mới trả lời.
- Đảm bảo chất lượng dữ liệu ở mức tốt nhất có thể kể cả trường hợp đường truyền yếu, nghĩa là phải đảm bảo hai người có thể hiểu nghe và nhìn được một cách rõ ràng không bị đứt đoạn.

Trong môi trường lý tưởng tức là hai thiết bị cấu hình tốt có thể xử lý âm thanh và hình ảnh chất lượng cao cùng với một đường truyền băng thông rộng chúng ta có thể yên tâm truyền một khối lượng data lớn mà vẫn đảm bảo độ trễ là rất nhỏ, khi đó người dùng có thể trải nghiệm được chất lượng âm thanh và hình ảnh rất tốt, tuy nhiên hãy tưởng tượng nhiều người cùng tham gia vào một lúc khi đó khối lượng data cũng sẽ tăng lên rất nhiều mà với môi trường lý tưởng như hiện tại cũng không thể đáp ứng được. Quay lại với thực tế là việc mỗi người dùng sử dụng các thiết bị với cấu hình rất khác nhau vì thế nếu một thiết bị tốt cố gắng truyền tải một lượng dữ liệu lớn thì thiết bị với cấu hình kém cũng không thể xử lý hết các dữ liệu đó trong thời gian ngắn dẫn tới độ trễ sẽ tăng lên, đầy bộ nhớ cache, drop gói tin khiến ấm thanh và hình ảnh bị đứt đoạn, hay một vấn đề khác đó là băng thông mạng của mỗi người cũng rất khác nhau dẫn tới việc tải dữ liệu từ máy có băng thông nhỏ sẽ chậm hơn và và cũng gây nên các vấn đề tương tự. Chúng ta cũng không thể quên được vai trò của server dù chỉ đóng vài trò điều hướng các gói tin hay phải xử lý data của tất cả các client thì việc càng tối ưu hóa dung lượng data sẽ càng giảm được nhiều chi phí.

Tóm lại công việc của chúng ta là phải tìm cách điều chỉnh dung lượng data cho phù hợp với điều kiện thực tế nghĩa là phải có các biện pháp đo đạc tính toán lượng data mà thiết bị và băng thông có thể đáp ứng được từ đó có giải pháp tối ưu hóa data trên mỗi thiết bị trước khi gửi đi. Bài viết này tôi và các bạn sẽ đi vào thảo luận về các vấn đề đó.

## 1. Codec
Codec( *compresses and decompresses* ) là một chương trình phần mềm sử dụng các thuật toán nén và giải nén dữ liệu gốc thành một định dạng dữ liệu khác. 
Hiện tại có rất nhiều loại codec được sử dụng để mã hóa và giải mã âm thanh, video, mỗi loại codec có những ưu và nhược điểm tùy từng mục đích sử dụng mà chúng ta có thể tùy chọn loại codec phù hợp. Các  bạn có thể tìm hiểu các loại audio codec như : G719, G722, OPUS, SILK, SPEEX, GSM 6.10, ... hay video codec VP8, VP9, H263 H264, H265, MPEG4, ...

## 2. Audio Codecs.

![](https://images.viblo.asia/2abdfea2-19d6-4dd1-996d-e661b5e58c14.png)
 **H1. Biểu đồ chất lượng của một số audio codec**



![](https://images.viblo.asia/c40a39d8-1242-4d5b-8d97-251cdfc45f55.png)
**H2. Biểu đồ độ trễ và birate**



Trong các biểu đồ đánh giá trên chúng ta thấy có hai khái niệm được nhắc đến birate và latency.
Birate được đo bởi đơn vị kb/s, nó tượng trưng cho khối lượng dữ liệu được lưu trữ trong 1s, vì thế birate càng cao thì nó chưa càng nhiều thông tin mô tả âm thanh trong 1s do đó chất lượng âm thanh cũng sẽ tốt hơn.
Latency được đo bởi đơn vị s, nó thời gian để codec giải mã và mã hoá dữ liệu gây nên độ trễ từ khi ta nói tới khi người khác có thể nghe thấy.

Như ta thấy ở biểu đồ thứ nhất MP3, Opus, AAC, Vorbis là bốn codec có thể mã hoá một lượng dữ liệu lớn nhất đạt tới 128kb/s, tuy nhiên Mp3, Vorbis, AAC lại không được sử dụng làm codec trong ứng dụng VOIP. Tại sao vậy ? Để biết nguyên nhân, chúng ta hãy nhìn xuống biểu đồ thứ hai, với độ trễ lên tới 200ms nó là quá lớn để sử dụng cho một ứng real-time.

Vậy chúng ta nên lựa chọn loại codec nào ? Như tôi đã nói phía trên chúng sẽ lựa chọn trên 2 tiêu chí : 

* *Thứ nhất là latency càng thấp càng tốt.*

* *Thứ hai đó là có khoảng birate rộng nghĩa là nó có sự linh hoạt để điều chỉnh birate phù hợp với sự biến thiên của băng thông trong môi trường mạng.*


Quan sát trên biểu đồ chúng ta có thể thấy Opus là codec tốt nhất khi có độ trễ rất nhỏ cùng với dải birate rất dài chúng ta có thể điều chỉnh với chất lượng tốt nhất khi băng thông mạng lớn và cũng có thể giảm tới chất lượng thấp hơn khi băng thông mạng giảm, bên cạnh đó chúng ta cũng có thể lựa chọn Speex, AAC-LD, G722 hay ARM-WB tuỳ thuộc vào yêu cầu đầu vào và các tiêu chí khác như free license hay open-source để có thể tự điều chỉnh.

Bây giờ chúng ta hãy cùng nhau tìm hiểu thêm sâu hơn một chút nữa về birate và các để điều chỉnh chúng. 
Như chúng ta đã biết âm thanh được thể hiện bởi tần số, vì thế việc mã hoá âm thanh thành data là công việc lưu trữ tần số, tuy nhiên âm thanh phát ra một cách liên tục nhưng chúng ta lại không thể lưu hết các trang thái của chúng, thay vào đó chúng ta xác định ra những khoảng Δtime để lấy chúng và gọi chúng là một mẫu (sample) như vậy có thể dễ dàng thấy Δtime càng nhỏ thì âm thanh lưu trữ sẽ càng chi tiết, nghe sẽ càng giống với thực tế. Vậy vấn đề mã hoá âm thanh ở đây chính là xử lý việc lưu trữ tần số và chọn ra Δtime phù hợp.

![](https://images.viblo.asia/17f3ff7a-466a-409b-af9f-78d89667f415.png)

 **H3. Audio Sample**


Đầu tiên với việc lưu trữ tần số, ta biết rằng dải tần số cũng là vô cùng, tuy nhiên may mắn thay con người chỉ có thể nghe được những âm thanh phát ra với tần số 20Hz - 20kHz thế nên với việc lưu trữ tần số của con người với bước đơn vị là 1Hz thì ta chỉ cần mã hoá cho chưa đến 20.000 giá trị ~ 2^24 tức là tầm 3 bytes để biểu diễ cho 1 sample. Tuy nhiên con số đó vẫn rất lớn vì thế mà các audio codec phát triển để giảm thiểu con số đó rất nhiều, giúp giảm được lượng data cần để lưu trữ mà vẫn giữ được chất lượng âm thanh. 

Lấy Opus codec làm ví dụ, chúng ta hãy xem qua một số tham số :
- Frame size được đo bởi đơn vị ms, đây là đơn vị tượng trưng cho khoảng thời gian chúng ta tạo ra một frame, ví dụ với frame size là 10ms nghĩa là cứ 10ms Opus sẽ lấy tạo ra một frame và lưu trữ frame này lại. Mỗi frame sau khi đươc tạo xong có thể coi là data packet để truyền đi, việc tính toán frame size hợp lý là rất quan trọng bởi vì nếu fram size lớn thì số lượng packet gửi đi sẽ nhỏ hơn và chi phí khi gắn IP, UDP,  RTP header cũng sẽ nhỏ hơn, tuy nhiên nếu mất 1 gói tin đồng nghĩa với mất một lượng lớn thông tin, theo tính toán frame size khoảng 20ms sẽ là 
- Sampling rates (khz), hay còn gọi là tốc độ lấy mẫu ví dụ 16Khz nghĩa là trong 1s nó sẽ lấy được 16000 mẫu âm thanh, số lượng mẫu lấy được càng nhiều thì âm thanh sẽ được mô tả càng rõ ràng, chất lượng âm thanh càng tốt nhưng dung lượng lưu trữ sẽ càng lớn. Tuỳ theo mục đích truyền âm thanh với chất lượng thế nào mà sampling rate sẽ đươc điều chỉnh hợp lý, ví dụ người ta nghiên cứu với cuộc đàm thoại bình thường chỉ cần 8Hz là đủ bởi vì khi ta nói chuyện tần số âm thanh luôn ở một mức ổn định trong một khoảng nhỏ ta có thể bỏ qua đoạn âm thanh quá trầm hoặc quá cao, ngược lại khi hát thì khoảng tần số biến thiên sẽ lớn hơn.

## 3. Video Codecs.

Bản chất của mã hoá giải mã video chính là mã hoá và giải mã ảnh, vì thế chất lượng video phụ thuộc vào chất lượng ảnh và bên cạnh đó còn một tham số khác đó là frame rate ( fps - frame per second ) tức là số lượng khung hình trên giây. Chúng ta hay xem phim và nghe thấy một câu quen thuộc là 24 hình trên giây, nếu bạn chưa hiểu nó là gì thì hôm nay tôi sẽ nói cho bạn biết đó chính là 24fps - một tiêu chuẩn trong sản xuất phim, con số này đủ để đánh lừa mắt bạn rằng chuyển động bạn nhìn thấy là liền mạch.

Bây giờ chúng ta tìm hiểu qua một chút về mã hoá ảnh, làm sao để biến các bức ảnh thành data ?
Chắc các bạn đều biết một bức ảnh được tạo bởi các màu sắc do đó chỉ cần lưu trữ màu sắc cùng với toạ độ của chúng là có thể lưu trữ được hình ảnh. Để lưu trữ màu sắc chúng ta có các phổ màu và dùng một lượng bit nhất định để biểu diễn cho tất cả các phổ màu đó, ví dụ dùng ảnh màu RGB (red-green-blue : đó là sự kết hợp của 3 màu cơ bản) ta sử dụng 256 giá trị (từ 0 -255) để biểu diễn cho mỗi màu thành phần tương đương với  8 bits, nghĩa là để biểu 1 điểm màu sẽ cần tất cả là 3 bytes.

Tóm lại, công việc của chúng ta sẽ là chia bức ảnh thành rất nhiều điểm nhỏ, mỗi điểm gọi là 1 pixel (picture elements) và dễ dàng nhận thấy càng nhiều pixel thì bức ảnh sẽ được lưu trữ càng chi tiết, ảnh càng rõ nét, và giờ thì chúng ra đã rõ ràng dung lương của bức ảnh sẽ phụ thuộc dung lượng của 1 pixel và mật độ điểm ảnh (dpi - pixels per inch). Và cũng như audio nếu sử dụng ảnh gốc dung lượng ảnh sẽ rất cao và các kỹ thuật nén ảnh sẽ giúp giảm dung lượng ảnh xuống nhiều lần mà vẫn giữ được chất lượng ảnh cần thiết.

Tương tự audio codec, video codec cũng phải làm nhiệm vụ điều chỉnh birate để tương thích với băng thông cho phép. Để điều chỉnh birate ngoài hai tham số chúng ta thấy ở trên đó là fps và dpi thì mỗi codec đều phải có cho mình một thuật toán xử lý video giúp làm giảm hơn nữa dung lượng mà vấn đem lại chất lượng tốt. 

Hiện nay chúng ta có thể thấy 2 loại video codec rất tốt đang cạnh tranh nhau đó là H26x (H263, H264, H265) và VPx (VP8, VP9). H26x là bộ mã hoá được cấp phép bởi MPEG LA và đây là bộ mã hoá thương mại được phát triển từ 1998 còn VPx là bộ mã hoá được phát triển bởi On2 và công bố vào năm 2008, sau đó được google mua lại vào năm 2010 biến nó trở thành một dự án mã nguồn mở.  H26x đã ra đời trước và đã có cho mình một hệ sinh thái với chất lượng rất tốt, một ví dụ điển hình đó là ứng dụng FacTime trên iphone của Apple, tuy nhiên VPx dưới sự hậu thuẫn của google cũng được đánh giá rất cao và là đối thủ cạnh tranh đáng gờm, rõ ràng với việc phải trả phí để mua bản quyền đối với H26x và miễn phí đối với VPx thì chúng ta cũng có thể hiểu rằng H26x chắc chắn có những ưu điểm hơn so với VPx, tuy nhiên với việc là mã nguồn mở tôi nghĩ rằng VP8 sẽ ngày càng phát triển mạnh mẽ hơn nữa. Và cũng bởi vì Vp8 là mã nguồn mở thế nên chúng ta có thể tìm hiểu về các thuật toán xử lý video của dư án này ( ban có thể tham khảo thêm https://tools.ietf.org/html/draft-ietf-payload-vp8-17 ). 

Giờ tôi sẽ giới thiệu cho bạn một chi tiết thú vị về môt thuận toán trong VP8. Hãy tưởng tượng nếu hai người đang video call với nhau, trong trường hợp này nếu hai người đang ngồi thì tất cả background xung quanh bạn gần như không thay đổi chỉ có sự chuyển động của gương mặt và cơ thể, nói đến đây bạn đã có ý tương gì để có thể giảm dung lượng cho video chưa ^^! , dễ thấy rằng cố gắng lưu trữ nhiều lần những thứ giống nhau thật sự là lãng phí. VP8 dùng khái niêm Gold Frame để chỉ một frame chứa nhiều nhất các điểm giống nhau, và những frame khác sẽ được vẽ lại dựa trên những Gold Frame đó. Tuy nhiên cái gì cũng có mặt trái của nó, đầu tiên là cái giá bạn phải trả cho việc tìm ra Gold Frame, vẽ lại các frame còn lại và ghép lại chúng là thời gian trễ, tiếp đến là thuật toán này sẽ tỏ ra kiếm hiệu quả nếu các chi tiết di chuyển liên tục, lúc này chúng ta vẫn tốn thời gian đi tìm Gold Frame mà thực ra Gold Frame lúc này không có nhiều ý nghĩa :)


# KẾT BÀI : 

Như vậy qua bài viết này tôi đã cung cấp cho các bạn cái nhìn tổng quát con đường mà âm thanh hình ảnh được chuyển đổi qua lại như thế nào . Tôi cũng nhắc đến các khái niệm, các cách tiếp cận để bạn có thể bắt đầu với công việc tìm hiểu các codec, cấu hình chúng vả nâng cao chất lượng cho ứng dụng VOIP.  Hi vọng nó sẽ hữu ích  :]

Bài tiếp theo trong loại bài về ứng dụng VOIP tôi sẽ nói về một khía cạnh khác nó liên quan nhiều hơn tới các giao thức nằm phía sâu bên dưới, các bạn sẽ hiểu được cách để thiết lập một đường truyền, cách data được chia nhỏ và đóng gói thành các packet và đẩy lên mạng internet. Càm ơn đã theo dõi ~.