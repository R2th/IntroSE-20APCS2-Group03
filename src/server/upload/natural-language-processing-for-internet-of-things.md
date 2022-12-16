Như vậy là sự kiện công nghệ được mong chờ nhất trong giới Mobile là Việt Nam Mobile Day 2018 đã chính thức được diễn ra vào ngày 15/6 vừa qua tại Hà Nội. Sự kiện VNM-2018 đã thu hút rất nhiều các nhân vật nổi tiếng trong làng Công nghệ của Việt Nam và đúng như mong đợi, sự kiện đã đem lại những trending cực kì bổ ích cho giới IT ở Việt Nam bao gồm: AI, Machine Learning, Block Chain, Fintech, Marketing, Mobile App & Game ... Bên cạnh đó, còn một chủ đề cực kì hot mà theo các chuyên gia đầu ngành đánh giá là sẽ thay đổi hoàn toàn cuộc sống của con người trong tương lai, đó chính là  **Internet of Thing**. Với chủ đề **NATURAL LANGUAGE PROCESSING
FOR INTERNET OF THINGS**  anh ***Phạm Văn Toàn*** đến từ Công ty Framgia Việt Nam đã đem tới cho người nghe một góc nhìn chân thực nhất toàn cảnh IOT trên thế giới.

### The Internet is (in) everything
Theo như anh **Toàn** có đề cập, ước tính tới năm 2020 sẽ có *57.000 đối tượng mới kết nối với nhau chỉ trong 1 giây*,  *212 tỉ cảm biến có sẵn cho các đối tượng, trong đó 30 tỉ cảm biến sẽ kết nối với internet*. Với những con số khổng lồ đó, ngày càng có nhiều các công ty công nghệ nhảy vào lĩnh vực IOT, họ tạo ra những chiếc xe thông minh, những chiếc lò nướng, bóng đèn, quạt ... và tất cả đều kết nối với nhau qua mạng internet, nhưng chưa dừng ở đó, họ đã tạo ra các sản phẩm công nghệ khác gắn trên những con bò để theo dõi sản lượng sữa, họ theo dõi được con gà đẻ trứng.....tất cả mọi thứ trong cuộc sống này đều có thể kết nối với nhau.

### The world is getting smarter 
Vậy họ tạo ra thế giới mới thông minh hơn bằng cách nào. Đơn giản thôi, tất cả mọi thứ thông minh thì thế giới sẽ thông minh.
* Một chiếc xe thông minh sẽ ra sao 
    * Có thể truy cập dữ liệu từ xa real-time 
    * Dự đoán các vấn đề của chính chiếc xe đó (lốp mòn, cần thay dầu, cần thay bla bla.....)
    * Tự lái, tự cảnh báo vật cản phía trước, tự đưa ra đường tắt tránh tắc đường...
* Một ngôi nhà thông minh sẽ như nào
    * Tự theo dõi lượng điện tiêu thụ, thậm chí tự cân bằng năng lượng một cách hợp lý nhất
    * Máy pha cà phê sẽ tặng bạn một tách cafe thơm phức khi bạn bắt đầu giờ làm việc
    * Điều hoà auto tắt khi bạn rời khỏi phòng
    * Tivi sẽ auto bật khi khách đến chơi
    * Và tất cả mọi thứ trong ngôi nhà của bạn đều được điều khiển từ xa

Tất cả mọi thứ đều được **connect** với nhau thông qua internet, hãy thử tưởng tượng xem, khi bạn lái xe về nhà, cửa gara sẽ tự động mở, khi bạn bước chân vào phòng, tivi sẽ bật kênh bạn yêu thích, quạt và đèn tự động để bạn nghỉ ngơi, trong lúc đó bình nóng lạnh cũng đã sẵn sàng ngay từ khi bạn còn đang ngồi trên xe lúc lái xe về.

### What is MQTT
MQTT = Message Queue Telemetry Transport

Đây là một giao thức truyền thông điệp (message) theo mô hình publish/subscribe (xuất bản – theo dõi), sử dụng băng thông thấp, độ tin cậy cao và có khả năng hoạt động trong điều kiện đường truyền không ổn định.
![](https://images.viblo.asia/f3a95f76-8822-4332-943f-4e152ad4d0ae.png)
Kiến trúc mức cao (high-level) của MQTT gồm 2 phần chính là Broker và Clients.

Trong đó, broker được coi như trung tâm, nó là điểm giao của tất cả các kết nối đến từ client. Nhiệm vụ chính của broker là nhận mesage từ publisher, xếp các message theo hàng đợi rồi chuyển chúng tới một địa chỉ cụ thể. Nhiệm vụ phụ của broker là nó có thể đảm nhận thêm một vài tính năng liên quan tới quá trình truyền thông như: bảo mật message, lưu trữ message, logs,...

Client thì được chia thành 2 nhóm là publisher và subscriber. Client là các software components hoạt động tại edge device  nên chúng được thiết kế để có thể hoạt động một cách linh hoạt (lightweight). Client chỉ làm ít nhất một trong 2 việc là publish các message lên một topic cụ thể hoặc subscribe một topic nào đó để nhận message từ topic này.
![](https://images.viblo.asia/7fb9adab-9359-4179-a4ec-9fc993786eb1.png)

### Importance of Natural Language Process
![](https://images.viblo.asia/42004049-2b92-4831-b040-e3d35d2b2115.png)
**1.Phong ba bão táp không bằng ngữ pháp Việt Nam**
Câu từ của Việt Nam cực kì phong phú với 54 dân tộc anh em, 64 tỉnh thành trên cả nước, với các từ đồng âm khác nghĩa, đó là thách thức cực kì lớn của IOT Việt Nam
Hơn nữa *khi một người nói một câu gì đó thì chưa chắc đã phải là ý nghĩa của nó theo nghĩa đen mà  là nó lại mang một ý nghĩa gì đó theo nghĩa bóng* (đau đầu vãi :()

**2. Từ ngữ bị phân chia**
![](https://images.viblo.asia/ad143a8c-b639-4f60-aafc-9fd95257c487.png)

Vâng, nhìn vào bức ảnh trên thì cũng đủ hiểu rằng, chỉ một câu nói thôi nhưng có rất nhiều cách để phân tích xem ngữ cách người nói đang thuộc ngữ cảnh nào 
* Và cách giải quyết là :) :
    * Kết hợp tối đa
    * Sử dụng mô hình ngôn ngữ: Chọn phân tích có xác suất cao nhất
    * Thuật toán Viterbi: Cách hiệu quả nhất để tìm ra đường ngắn nhất thông qua biểu đồ 

**3.Kĩ thuật POS: Part of Speech**
* POS tagging: là quá trình đánh dấu một từ trong một câu (văn bản) tương ứng với một phần cụ thể của lời nói
* Dựa trên cả định nghĩa và ngữ cảnh 
* Đây là nền tảng cho các kỹ thuật NLP khác
 ![](https://images.viblo.asia/7efc5a22-479f-46e6-b796-86b3e291bd03.png)
                
 **4. Name Entity Recognition - NER**
 Nhận dạng thực thể định danh (Named Entity Recognition – NER), còn gọi là nhận dạng thực thể có tên, là nhiệm vụ nhận biết các từ xuất hiện trong văn bản là tên gọi của một đối tượng nào đó, như tên người (nhân danh), tên đất (địa danh, địa điểm), tên tổ chức, tên tác phẩm, tên sự kiện, thời gian, tiền tệ, v.v. NER đóng vai trò quan trọng trong các ứng dụng tự động trích xuất thông tin, khai phá dữ liệu, dịch máy, và đương nhiên nó cũng là thành phần Vô cùng quan trọng trong IOT rồi.
![](https://images.viblo.asia/98065e46-fda5-4993-b8bf-c0ba9dfeac0e.png)

**5.Detect command process**

Một vấn đề vô cùng quan trọng nữa là, sau khi chúng ta có tất cả các dữ liệu rồi, làm sao để chúng có thể ghép lại thành một câu hoàn chỉnh đúng ngữ nghĩa và ngữ cảnh, sơ đồ bên dưới sẽ giúp bạn hiểu rõ vấn đề này
![](https://images.viblo.asia/32c7ac1b-e13d-4de7-b52a-2af8fb744d00.png)

Vâng chốt lại vấn đề, để đưa IOT vào thực tiễn thì còn có quá nhiều việc phải làm từ phần cứng, phần mềm cho đến các trí tuệ mà con người đưa vào để áp dụng cho chúng. Trong đó quá trình sử dụng ngôn ngữ tự nhiên để ra lệnh cho các thiết bị cũng như các thiết bị sẽ sử dụng ngôn ngữ tự nhiên đó phản hồi lại cho người dùng còn cả một quá trình dài dài để đạt hiệu quả hơn nữa, hi vong với những công nghệ mới nhất của AI, BlockChain cũng nhảy vào để giúp phần giúp IOT trở nên thông minh hơn nữa, mạnh mẽ hơn nữa và đưa vào sử dụng rông rãi sớm nhất có thể.

Cảm ơn tất cả các diễn giả đã dành thời gian quý báu của mình để đến chia sẻ những kiến thức của mình, tạo động lực và truyền cảm hứng tới những con người yêu công nghệ của Việt Nam. Đặc biệt cảm ơn anh **Phạm Văn Toàn** đã mang đến những cái nhìn trực quan nhất về vấn đề *Xử lý ngôn ngữ tự nhiên cho IOT* cho giới công nghệ Việt Nam