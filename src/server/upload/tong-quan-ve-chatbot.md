Bài viết này nhằm mục đích chia sẻ một số hiểu biết cơ bản về Chatbot mà người viết tổng hợp sau một thời gian làm việc với bài toán này, hi vọng nó sẽ giúp bạn đọc rõ hơn về bài toán Chatbot, đồng thời bài viết cũng gợi mở một số hướng tiếp cận cho những ai muốn tìm hiểu sâu hơn về bài toán này.

*“Chatbot”* có lẽ là thuật ngữ được mọi người biết đến nhiều nhất khi nói về một chương trình hoặc phần mềm máy tính có khả năng trò chuyện với con người bằng ngôn ngữ tự nhiên. Sẽ chính xác hơn nếu ta gọi chương trình hoặc phần mềm này là *“Conversational systems”* hoặc *“Dialogue systems”*, tuy nhiên vì tính phổ cập của thuật ngữ *“Chatbot”* nên trong bài viết này tác giả vẫn sẽ sử dụng nó là tên gọi chung cho tất cả các hệ thống có khả năng *“đối thoại”* với con người bằng ngôn ngữ tự nhiên. Những hệ thống này bao gồm: Task-oriented Dialogue Systems(TODs), Intelligent Personal Assistants(IPAs), Chit-chat Dialogue Systems(CCDs). Bài viết sẽ đi sâu vào việc phân tích hệ thống TODs vì đây là loại Chatbot có tính ứng dụng cao và đang được các doanh nghiệp triển khai rất nhiều hiện nay, hai loại Chatbots còn lại có độ phức tạp cao và cần nhiều nguồn lực mà chỉ có một số công ty lớn như Google, Apple, Microsoft, Facebook mới có khả năng triển khai.

Nội dung của bài viết được chia thành 3 phần:
- Phân loại Chatbots: nội dung của mục này cung cấp một cái nhìn toàn cảnh về các loại Chatbots hiện nay và sự khác biệt giữa chúng.
- Tổng quan về TODs: phân tích kiến trúc tổng quan, các thành phần và cách hoạt động của hệ thống TODs.
- Một số thách thức khi xây dựng TODs: chia sẻ một số thách thức mà người viết đã gặp khi xây dựng Chatbot để giải quyết các vấn đề trong thế giới thực.

## Phân loại Chatbots
### Task-oriented dialogue systems
TODs là loại Chatbot được thiết kế để thực hiện các tác vụ cụ thể trong một lĩnh vực nhất định như: mua vé máy bay, cung cấp thông tin về đại dịch Covid-19... Chúng thường được các doanh nghiệp phát triển để cung cấp dịch vụ hỗ trợ khách hàng 24/7. Để hiểu rõ hơn về vai trò của loại Chatbot này chúng ta hãy xem ví dụ sau.

<p align="center">
  <img src="https://lh3.googleusercontent.com/NNinjyZQZ8EbP6L0XvyBMwbeIRTalpiXoi0kCf48TNLMvNQJrIpDzzy6KcmG6QSNczIdEaocQcaBjccHnBuHfLagthvPm2JnHPK5sIk1ts6IaAFaCb5tQTNfNE4NDNyHleKbERxK">
    <br>
    Hình 1. Chatbot Sani giúp tìm quán cà phê ở Hà Nội. 
</p>

> [*Cuối tuần này bạn có kế hoạch đi đâu chưa? Hãy để Sani gợi ý cho bạn một số quán cafe để hẹn hò nhé* 😊](https://www.facebook.com/Tui-l%C3%A0-Sani-103250421878333)

Sani là Chatbot có khả năng trò chuyện với người dùng để giúp họ:
- Tìm kiếm quán cà phê ở Hà Nội với một số tiêu chí như: không gian yên tĩnh, đồ uống ngon, hẹn hò, học tập...
- Tìm quán cà phê gần một địa điểm cụ thể nào đó ở Hà Nội: gần Hồ Tây, đại học Bách Khoa, quận Cầu Giấy…
- Cung cấp thông tin hoặc đưa ra đánh giá về quán cà phê.
Sani được thiết kế để có thể thực hiện một số tác vụ liên quan đến *“quán cà phê”*, nó không thể trả lời chính xác khi người dùng hỏi về một lĩnh vực khác.
<p align="center">
  <img src="https://lh3.googleusercontent.com/msfRFhwfilrCDbj9d121JNxpbkhr84lLc5gx2YksW-d9dh3jaWLAg53S8Sp0I9b6VTT1wHRmAy7R0oSlnnYlQPC3gl56fmr1jABTGUa1fqoA5E-CZy2-2EqvQaqfASrfxOGgWTPW">
    <br>
    Hình 2. Sani sẽ nhại lại khi người dùng hỏi về lĩnh vực khác.
</p>
Các hệ thống TODs hiện nay đang được các doanh nghiệp ứng dụng mạnh mẽ trong nhiều lĩnh vực như tài chính, y tế, thương mại điện tử, viễn thông...chúng thường được tích hợp trên các nền tảng Chat như Messenger, WhatsApp, Slack hoặc Chat platform do doanh nghiệp tự phát triển. Một số hệ thống có khả năng giao tiếp bằng giọng nói thường được doanh nghiệp tích hợp trên các tổng đài trả lời điện thoại tự động để cung cấp các dịch vụ chăm sóc khách hàng của mình.

### Intelligent Personal Assistants
IPAs là loại Chatbot đóng vai trò như một trợ lý cá nhân để giúp người dùng thực hiện một số công việc thường ngày của họ. Ví dụ trợ lý cá nhân Siri của Apple có thể thực hiện các tác vụ như: thực hiện cuộc gọi, gửi tin nhắn, tìm quán ăn, quản lý lịch hẹn....Tương đồng với Siri còn có một số trợ lý cá nhân khác như Cortana của Microsoft, Google Assistant, Alexa của Amazon. Đối với những yêu cầu nằm ngoài khả năng của mình, các trợ lý thường thực thi hành động Web search như một hành động thay thế.
<p align="center">
  <img src="https://lh5.googleusercontent.com/3aUkpPSqNY5dng-CUZ8vVUfKSWqFdUYGjHTs0pbBmKSwhgdjjpatHyzxEwFTuoxNDyiN2e47a1qPq6a7IW62-Gjmt2E0Hn1oPR4ckbeD8irHWgY8Jv8dYJJhSSXkmVh0fTrPvDmU">
    <br>
    Hình 3. Siri có thể giúp thực hiện một cuộc gọi khi người dùng đang bận lái xe.
</p>
IPAs có khả năng thực hiện nhiều tác vụ khác nhau mà không bị giới hạn trong một lĩnh vực cụ thể và nó mang lại cho người dùng cảm giác luôn bên cạnh để giúp đỡ họ khi cần. Để làm được điều này IPAs thường được tích hợp trên các thiết bị cá nhân như điện thoại thông minh, máy tính cá nhân, thiết bị smart home, đồng hồ thông minh và được cho phép quyền truy cập vào thông tin cá nhân của người dùng như: danh bạ, email, lịch, hành vi của người dùng trên thiết bị...

### Chit-chat dialogue systems
Không giống như TODs và IPAs được thiết kế để giúp người dùng hoàn thành tác vụ một cách hiệu quả và nhanh chóng. Chit-chat dialogue systems(CDDs) được thiết kế để trở thành một người “*bạn ảo”* đồng hành lâu dài với người dùng, lắng nghe họ tâm sự và cùng thảo luận về mọi chủ đề trong cuộc sống.

Ví dụ Xiaoice Chatbot được Microsoft phát triển cho thị trường Trung Quốc và ra mắt năm 2014. Xiaoice được thiết kế mô phỏng theo tính cách của một cô gái 18 tuổi với khả năng ứng xử khéo léo trong giao tiếp(chỉ số EQ cao), hiểu biết về nhiều lĩnh vực kể cả các sự kiện vừa mới diễn ra(chỉ số IQ cao). Chính vì vậy mà Xiaoice đã trở thành người bạn tâm sự của giới trẻ tại Trung Quốc. Hiện nay Xiaoice có hơn 650 triệu người dùng và được triển khai trên hơn 450 triệu thiết bị thông minh. Đây là một trong những Chatbot thành công nhất trên thị trường hiện nay khi Xiaoice tách ra thành công ty riêng năm 2020 và được định giá lên tới 1 tỉ đô la.

Tuy khả năng mà các hệ thống CDDs mang lại rất ấn tượng nhưng nó đang gặp vấn đề trong việc kiểm soát nội dung khi thảo luận về các chủ đề nhạy cảm như phân biệt chủng tộc, tôn giáo, chiến tranh, chính trị hoặc đưa ra nội không phù hợp với lứa tuổi vị thành niên. Xiaoice đã phải tạm ngưng phát hành ở thị Mỹ, Ấn Độ và bị gỡ khỏi ứng dụng QQ của Tencent khi đưa ra những phản hồi gây tranh cãi khi thảo luận về những nội dung nhạy cảm này.

Một số Chit-chat dialogue systems phổ biến khác mà bạn đọc có thể tìm hiểu thêm như:
- Kuki(Mitsuku) được phát triển bởi Pandorabots(một công ty cung cấp dịch vụ xây dựng và triển khai Chatbot). Nó là một trong những Chatbot phổ biến nhất hiện nay và được ước tính có hơn 1 tỷ tin nhắn với 25 triệu người dùng.  
- Meena là một Chatbot được phát triển bởi Google và được công bố kết quả nghiên cứu vào tháng 01/2020. Trong đó Google AI team đưa ra một chỉ số đánh giá mới mà dựa trên đó Meena có điểm số cao hơn so với tất cả Chatbot hiện có(🤔). Tuy nhiên đến nay Meena vẫn chưa được phát hành ra bên ngoài để người dùng đánh giá.
- BlenderBot được phát triển bởi Facebook, trong kết quả nghiên cứu của phiên bản BlenderBot 1.0 họ tuyên bố đã đánh bại Meena của Google và mới gần đây vào tháng 07/2021 họ đã cho ra mắt phiên bản thứ 2 với nhiều cải tiến so với phiên bản cũ. Tháng 10/2020 đã diễn ra một sự kiện gọi là Bot Battle giữa Kuki và BlenderBot, trong sự kiện này 2 Chatbot sẽ nói chuyện với nhau trong 2 tuần liên tiếp. Người xem có thể bình chọn cho Chatbot mà họ thấy thông minh hơn. Kết quả báo chiến thắng đã thuộc về Kuki với hơn 78% bình chọn từ hơn 40000 người.
- Replika được phát triển với công ty startup tên là Luka, nó được phát hành dưới dạng ứng dụng trên Android, IOS và Web, hiện nay nó đã có hơn 7 triệu người dùng(số liệu tháng 5/2020). Người dùng ban đầu khi dùng ứng dụng có thể tự tạo mối quan hệ với Replika như bạn bè, người yêu, người hướng dẫn...và họ có thể thay đổi mối quan hệ này sau đó nếu muốn.

## Tổng quan về TODs
Có hai hướng tiếp cận cho các hệ thống TODs đó là pipeline và end-to-end. Pipeline nghĩa là hệ thống TODs sẽ được chia thành các module nhỏ, mỗi module sẽ thực hiện nhiệm vụ khác nhau, tiến trình xử lý của hệ thống sẽ tuần tự đi qua từng module. Ngược lại end-to-end nghĩa là hệ thống TODs được thiết kế với một module duy nhất để xử lý yêu cầu của người dùng. Mỗi hướng tiếp cận đều có những ưu, nhược và thách thức riêng, hầu hết các Chatbot dạng TODs hiện nay được triển khai theo hướng pipeline vì tính dễ kiểm soát và dễ dàng tích hợp vào các hệ thống đã có của doanh nghiệp hơn. End-to-end TODs là hướng nghiên cứu có nhiều tiềm năng và đang trong quá trình nghiên cứu với kỳ vọng có thể khắc phục một số nhược điểm của pipeline TODs.

Do bản thân người viết cũng chưa có nhiều hiểu biết về end-to-end TODs nên trong nội dung của mục này sẽ đi sâu vào việc mô tả về kiến trúc và các thành phần của pipeline TODs. Bạn đọc nếu quan tâm về end-to-end TODs có thể xem thêm tài liệu tham khảo ở mục 5.

Một số thuật ngữ quan trọng:
- Intent: ý định trong mỗi câu nói của người dùng(ví dụ: chào hỏi, tìm quán cà phê...).
- Entity: các thông tin có thể trích xuất trong câu nói của người dùng(ví dụ: số điện thoại, địa chỉ, tên quán cà phê...).
- Slot: đối tượng để ánh xạ giá trị các trường trong Database với với các thông tin mà người dùng cung cấp, ví dụ thông tin người dùng cung cấp là tìm quán cà phê để “học bài” thì mục đích “học bài” sẽ được ánh xạ vào cặp key-value là “purpose: HB” để tiện cho việc truy xuất dữ liệu.
- Action: là hành động mà Chatbot có thể làm, thể hiện khả năng của Chatbot(ví dụ: tìm quán cà phê, tìm nhà ăn...)
- Domain: là một tập các intents, entities, slots, actions. Chúng mang ý nghĩa thể hiện cho tất cả những gì Chatbot có thể hiểu(thông qua intents, entities, slots) và có thể làm(actions).
- Tracker Store: là cơ sở dữ liệu để lưu trữ lịch sử cuộc hội thoại của Chatbot với người dùng. Một số hệ thống thiết kế đơn giản sẽ lưu lịch sử trò chuyện trong RAM hoặc gộp chung với Knowledge DB.
- Knowledge DB: là cơ sở dữ liệu lưu trữ tri thức của Chatbot. Ví dụ như: thông tin về các quán cà phê, nhà hàng...

<p align="center">
  <img src="https://lh4.googleusercontent.com/VgB-4DWWraIKcnPbennE2UrogE77CJP19HaBOoWwSsqj3WZ473zo1GdrvF7qX2vIg-0qYH6-ycLHXCcfjYKHyRRz6RY3q_OgxWK3HWbPbadzYo8_pNnQmsxr9ciRUmtTCGR9snYL">
    <br>
    Hình 4. Kiến trúc của một hệ thống TODs.
</p>
Kiến trúc của một pipeline TODs được mô tả trong hình 4, nó gồm 4 module đảm nhận các vai trò khác nhau, đầu ra của module trước sẽ là đầu vào của module sau. Ngoài ra một số hệ thống TODs có thể được tích hợp thêm các dịch vụ Automatic Speech Recognition (ASR) và Text to Speech (TTS) để cung cấp khả năng tương tác bằng giọng nói cho Chatbot. Để hiểu hơn về vai trò của từng module chúng ta hãy cùng phân tích ví dụ về Chatbot Sani ở mục 1.

Sani là Chatbot có khả năng đưa ra gợi ý và cung cấp thông tin về các quán cà phê ở Hà Nội. Dựa trên khả năng này ta có thể giả định Sani được thiết kế với domain như sau:
- Intents: greet(chào hỏi), request_coffee_shops(tìm quán cà phê), ask_for_review(đánh giá về quán cà phê), thank(tạm biệt).
- Entities: location(địa điểm hoặc khu vực mà người dùng đang tìm quán cà phê), purpose(mục đích tìm quán cà phê), coffee_shop_name(tên quán cà phê)
- Slots: coordinates(toạ độ địa lý của entity location), purpose(mục đích tìm quán cà phê), coffee_shop_name(tên quán cà phê)
- Actions: utter_greet(hành động đưa ra lời chào), suggest_coffee_shops(đưa ra gợi ý về quán cà phê), review_coffee_shop(đưa ra đánh giá về quán cà phê), utter_bye(chào tạm biệt).

**Natural Language Understanding (NLU)**. Đây là module chịu trách nhiệm chuyển đổi tin nhắn văn bản của người dùng thành dạng dữ liệu có cấu trúc đã được định nghĩa từ trước. Dạng dữ liệu có cấu trúc này chính là các Intents, Entities. Để làm được điều này NLU sẽ phải giải quyết 2 bài toán trong lĩnh vực xử lý ngôn ngữ tự nhiên là Intent Classification(IC) và Named Entity Recognition(NER) hay còn được gọi là Entity Extraction. Bài toán IC giải quyết vấn đề ánh xạ tin nhắn của người dùng vào một bộ các Intents đã định nghĩa trước. Bài toán NER giải quyết vấn đề trích xuất các thông tin có trong tin nhắn của người dùng. Ví dụ với tin nhắn “*tìm quán cà phê để hẹn hò khu vực hồ tây*” NLU sẽ ánh xạ vào intent *request_coffee_shops* và các entities được trích xuất: *(purpose, hẹn hò), (location, hồ tây)*. Các Intents, Entities này sau đó được tổng hợp thành định dạng như “*request_coffee_shops(purpose = hẹn hò, location = hồ tây)*” sau đó gửi đến module DST.

**Dialogue State Tracking (DST)** là module chịu trách nhiệm theo dõi và cập nhật trạng thái của cuộc hội thoại. Có 2 luồng xử lý riêng biệt trong module này bao gồm:
- Luồng 1: cập nhật trạng thái được kích hoạt bởi module NLU
- Luồng 2:  cập nhật trạng thái kích hoạt bởi Dialogue Policy.
Ở luồng thứ nhất DST sẽ thực hiện các tiến trình sau:
- Cập nhật Intent và Entities được gửi tới từ NLU vào Tracker Store.
- Truy xuất lịch sử cuộc trò chuyện từ Tracker Store bao gồm các Intents, Entities, Slots, Actions trong những lượt trò chuyện trước đó.
- Dựa trên Intent và Entities tại trạng thái hiện tại và lịch sử cuộc trò chuyện thực hiện cập nhật giá trị của các Slots. Ví dụ trạng thái hiện tại có entity *location = “hồ tây”* cần phải cập nhật giá trị cho slot *coordinates = (21.0580311,105.8063123)* là toạ độ địa lý của *“hồ tây"* để tiện cho việc truy xuất thông tin từ Knowledge DB. Chatbot Sani làm điều này bằng cách sử dụng Google maps API.
- Cập nhật giá trị của Slots mới vào Tracker Store. Sau đó gửi trạng thái hiện tại của hệ thống cho module Dialogue Policy. Trạng thái của hệ thống được gửi tới Dialogue Policy bao gồm: Intent, Entities, Slots và lịch sử cuộc trò chuyện.

Luồng thứ 2 được kích hoạt sau khi module Dialogue Policy hoàn thành các tác vụ, chi tiết sẽ được mô tả trong phần Dialogue Policy.

**Dialogue Policy (DP)** là module thực hiện dự đoán hành động kế tiếp mà Chatbot cần thực hiện dựa trên trạng thái cuộc hội thoại được gửi tới từ DST. Ta có thể xem đây là bài toán Classification tương tự như bài toán IC của module NLU. Từ trạng trái của cuộc hội thoại bao gồm:
- Intent: request_coffee_shops
- Entities: purpose = hẹn hò, location = hồ tây
- Slots: coordinates = (21.0580311,105.8063123), purpose = HH, coffee_shop_name = None
- History: Intents, Entities, Actions của những lượt trước đó.

DP sẽ đưa ra dự đoán hành động kế tiếp là *suggest_coffee_shops* với Slots: *coordinates = (21.0580311,105.8063123), purpose = HH, coffee_shop_name = None*.
DP sau đó sẽ thực thi hành động *suggest_coffee_shops*, hành động này ở đây là tìm những quán cà phê có *coordinates = (21.0580311,105.8063123) và purpose = HH* trong Knowledge DB.

Sau khi thực hiện xong hành động *suggest_coffee_shops*, kết quả sẽ được gửi về module NLG để tạo ra câu trả lời bằng ngôn ngữ tự nhiên hiển thị cho người dùng. Đồng thời hành động mới được thực thi cũng sẽ được gửi về module DST để kích hoạt luồng 2 cập nhật trạng thái mới là hành động mà Chatbot vừa mới thực thi.

**Natural Language Generation (NLG)** là module chịu trách nhiệm tạo ra câu trả lời bằng ngôn ngữ tự nhiên từ kết quả của module DP. Phương pháp truyền thống là sử dụng một bộ các mẫu câu có sẵn kết hợp với kết quả từ DP để tạo ra câu trả lời. Ví dụ kết quả của module DP trả về là *suggest_coffee_shops(coffee_shop_name = Cộng cà phê Trích Sài)* NLG sẽ tạo ra câu trả lời với mẫu câu “Sani gợi ý cho bạn quán Cộng cà phê Trích Sài rất hợp để hẹn hò nè.” Trong đó Cộng cà phê Trích Sài là *coffee_shop_name* từ DP. Hiện này các phương pháp tiên tiến hơn sử dụng Deep learning để tạo ra câu trả lời bằng ngôn ngữ tự nhiên bạn đọc nếu quan tâm có thể tìm hiểu thêm về phương pháp này.

## Một số thách thức khi xây dựng TODs
Có rất nhiều thách thức trong việc xây dựng Chatbot để giải quyết các vấn đề trong thế giới thực. Ở đây người viết sẽ chia sẻ một số thách thức hay nói đúng hơn là các vấn đề mà bản thân đã gặp phải khi xây dựng Chatbot. Các vấn đề này đang được người viết nghiên cứu để tìm hướng giải quyết. Bạn đọc quan tâm có thể tự tìm hiểu và tìm lời giải cho những thách thức này.

**Một là**, vấn đề thiếu dữ liệu để phân tích thiết kế domain(xem lại định nghĩa về domain ở mục 2 nếu cần) và dữ liệu đào tạo mô hình học máy(mô hình Intent Classification, Named Entity Recognition, Dialogue Policy). Một số doanh nghiệp xây dựng Chatbot mà trước đó họ chưa có kênh Chat cho người dùng. Nghĩa là sẽ không có lịch sử Chat để phân tích hành vi của người dùng và nhu cầu của họ. Sẽ rất khó để có thể thiết kế Chatbot đáp ứng đúng nhu cầu của người dùng. Việc thiết kế Chatbot sẽ cần sự tham gia người có hiểu biết sâu sắc về trải nghiệm của người dùng và lĩnh vực hoạt động của doanh nghiệp. Tuy nhiên như vậy vẫn chưa đủ, sẽ cần phải xây dựng thêm bộ phận chăm sóc khách hàng đề backup cho những trường hợp mà Chatbot không xử lý được.

**Hai là**, vấn đề xây dựng Chatbot ở các lĩnh vực khác nhau. Rất khó để tận dụng những module đã xây dựng trong lĩnh vực này cho các lĩnh vực khác.

**Ba là**, các vấn đề liên quan đến module NLU như vấn đề sai lỗi chính tả, viết tắt trong tin nhắn của người dùng. Hay khi người dùng spam 2, 3 tin nhắn một lúc hoặc trong một tin nhắn có nhiều ý định(ví dụ: xin chào, mình muốn tìm quán cà phê ở Hồ Tây).

**Bốn là**, thiếu công cụ để theo dõi, phân tích hoạt động của Chatbot trong kịch bản thực tế để phát hiện vấn đề và phát triển nó đáp ứng đúng nhu cầu của người dùng.

## Kết luận
Chatbot là một bài toán có tính ứng dụng cao và đang đạt được sự quan tâm rất lớn hiện nay. Rất nhiều doanh nghiệp mong muốn triển khai nó để cung cấp trải nghiệm tốt hơn cho người dùng và tối ưu chi phí nhân sự. Tuy nhiên hiện nay Chatbot vẫn chưa đạt được mức độ thông minh như kỳ vọng, nó chưa vẫn đủ thông minh như những chuyên gia trong lĩnh vực để giải đáp mọi thắc mắc của người dùng, ví dụ như kỹ năng bán hàng hoặc kỹ năng tư vấn các vấn đề chuyên sâu. Người dùng có thể cảm thấy tệ hơn khi nói chuyện với một Chatbot kém thông minh và không bao giờ quay lại sử dụng dịch vụ của doanh nghiệp. Vì vậy các doanh nghiệp vẫn đang rất thận trọng trong việc triển khai Chatbot để cung cấp các dịch vụ 24/7 của mình.

## Tài liệu tham khảo
Paper & Blog post
- [Recent Advances in Deep Learning Based Dialogue Systems: A Systematic Survey](https://arxiv.org/pdf/2105.04387.pdf)
- [A Survey on Dialogue Systems: Recent Advances and New Frontiers](https://arxiv.org/pdf/1711.01731.pdf)
- [Recent Advances and Challenges in Task-oriented Dialog Systems](https://arxiv.org/pdf/2003.07490.pdf)
- [The Design and Implementation of XiaoIce, an Empathetic Social Chatbot](https://arxiv.org/pdf/1812.08989.pdf)
- [From Eliza to XiaoIce: Challenges and Opportunities with Social Chatbots](https://arxiv.org/pdf/1801.01957.pdf)
- [Towards a Human-like Open-Domain Chatbot](https://arxiv.org/abs/2001.09977)
- [Can You Put it All Together: Evaluating Conversational Agents’ Ability to Blend Skills](https://arxiv.org/pdf/2004.08449.pdf)
- [End-to-End Task-Completion Neural Dialogue Systems](https://aclanthology.org/I17-1074.pdf)
- [Building End-To-End Dialogue Systems Using Generative Hierarchical Neural Network Models](https://arxiv.org/abs/1507.04808)
- [An overview of task-oriented dialog systems](https://www.youtube.com/watch?v=c62zNrRlkps)
- [5 Levels of Conversational AI: 2020 Update](https://rasa.com/blog/5-levels-of-conversational-ai-2020-update/)

Business insight
- https://www.businessinsider.com/chatbot-market-stats-trends
- https://landbot.io/blog/chatbot-statistics-compilation
- https://congdongchatbot.com/wp-content/uploads/2018/10/2018-state-of-chatbots-report.pdf
- https://www.ai-startups.org/top/conversational/
- https://www.chatbotguide.org/pros-and-cons-of-chatbots

Awesome chatbots
- https://github.com/JStumpp/awesome-chatbots
- https://github.com/DopplerHQ/awesome-bots