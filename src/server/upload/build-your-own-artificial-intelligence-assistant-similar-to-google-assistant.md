Sau sự kiện "Google Assistant Xin Chào Việt Nam" diễn ra đầu tháng 5 vừa rồi, chúng ta đã được nghe, được thấy, được trải nghiệm thực tế công nghệ virtual assistant của Google phiên bản đặc biệt dành cho tiếng Việt ngay trên chính những chiếc smartphone của mình. Ngôn ngữ tiếng Việt là một ngôn ngữ khó. Tuy nhiên, Việt Nam lại là một thị trường béo bở và đầy tiềm năng. Việt Nam là một trong những quốc gia có dân số trẻ sử dụng smartphone rất nhiều, giới trẻ Việt Nam yêu công nghệ, thích cập nhật công nghệ mới; các công nghệ, nền tảng smart home tại Việt Nam cũng đang trên đà phát triển mạnh mẽ. Điều đó chính là lý do khiến Google chọn Việt Nam là quốc gia tiếp theo được support công nghệ virtual assistant của mình.

Dưới góc nhìn của người làm công nghệ, chúng ta sẽ đi từ việc nhìn nhận những tính năng cơ bản mà Google assistant hỗ trợ cho đến việc phân tích workflow để từ đó đưa ra một kiến trúc chung của các hệ thống kiểu này. Những nhiệm vụ, thách thức và cách giải quyết từng thành phần cũng được đưa ra phân tích để mọi người có thể có cái nhìn cơ bản nhất về bài toán đặc biệt này.

Trong bài viết này, mình cũng điểm qua một số phương pháp để tạo ra một trợ lý ảo cho riêng bạn. Dựa trên những phân tích thực tế, đưa ra lý do cũng như trao đổi về câu hỏi: "Tại sao chúng ta cần phải xây dựng một trợ lý ảo riêng mà không sử dụng luôn nền tảng sẵn có?".

Thông qua bài viết, các bạn cũng được hiểu về cách sử dụng Deep learning để giải quyết các bài toán quan trọng như: Trigger word detection, Intent classifier, named entity recognition, dialogue management. question answering, chat generator,...

Trước tiên, để bắt đầu, chúng ta sẽ nhắc lại về khái niệm cơ bản về Virtual assistant(VA)- trợ lý ảo thông minh và những ứng dụng tiêu biểu của nó.
# Virtual assistant: Khái niệm và ứng dụng
![](https://images.viblo.asia/d926b75e-8ae3-4f82-9bde-9d5931b57bd3.png)

Để định nghĩa một cách dễ hiểu, các trợ lý ảo là một con bot có khả năng thực hiện nhiệm vụ hoặc dịch vụ cho một cá nhân dựa trên các lệnh bằng lời nói hoặc văn bản. Khác với Chatbot, ngoài việc chỉ giúp có thể phản hồi lại các câu lệnh của người dùng ở dạng văn bản, trợ lý ảo giúp đỡ được con người nhiều hơn thế. Bạn có thể hỏi trợ lý ảo của bạn một câu hỏi nào đó trong một lĩnh vực hẹp nào đó(closed domain) hoặc một câu hỏi bất kỳ(open domain) và hy vọng nó sẽ giúp bạn tìm câu trả lời thích hợp. Bạn cũng có thể nhờ sự giúp đỡ của các trợ lý ảo để điều khiển các thiết bị thông minh trong nhà một cách tự động, lên lịch hẹn, quản lý công việc hàng ngày như những việc cần làm, email hay thời gian biểu.

Hiện nay, khi nói để trợ lý ảo, ta thường nói về VoiceBot, những trợ lý ảo được điều khiển bằng giọng nói. Lý do là các công nghệ về Speech2text và Text2speech đang rất phát triển trong thời gian gần đây nhờ việc áp dụng các kỹ thuật mới, đặc biệt hiệu quả trong Deep learning. Việc tích hợp 2 bài toán này vào các trợ lý ảo khiến ta dễ dàng hơn trong việc thao tác, điều khiển, tay và mắt được giải phóng giúp ta có thể dễ dàng giao tiếp với trợ lý ảo trong các trường hợp đặc biệt như lái xe, nấu ăn,... hoặc hỗ trợ cho những người bị khiếm thị.

Một số trợ lý ảo của các ông lớn về công nghệ đã trở nên quen thuộc với mọi người như Alexa của Amazon, Cortana của Microsoft, Ok Google của Google và Siri của Apple. Các công ty về công nghệ lớn không chỉ ở thế giới mà ngay cả ở Việt Nam cũng đang rất quan tâm đặc biệt tới bài toán này và vẫn luôn ấp ủ các dự án xây dựng trợ lý ảo cho riêng mình. Theo nhìn nhận và đánh giá sự vào cuộc của các công ty trong thời gian gần đây, mình nghĩ năm 2019 thực sự là năm của Virtual Assistant.

Đặc biệt, như nói ở đầu bài viết, sự kiện "Google Assistant Xin Chào Việt Nam" thực sự là một cú hích mạnh, đem công nghệ này gần hơn với mọi người hơn bao giờ hết.

**Nếu chúng ta không bắt đầu, chắc chắn chúng ta lại ở phía sau :D**

# Google Assistant: Feature and Workflow

Hiện tại, chúng ta đã tạm biết sơ qua thế nào là một trợ lý ảo và một vài ứng dụng cơ bản của nó. Tiếp theo, chúng ta sẽ tiếp tục nhìn xem trợ lý ảo **Ok Google** của ông lớn Google đã hỗ trợ người dùng Việt Nam những tính năng gì.

![](https://images.viblo.asia/28762049-7817-4148-8f68-8f44259e3ec3.png)

Nhìn qua một chút thì có vẻ khá nhiều, thực sự nhiều. Bạn có thể dùng giọng nói của mình yêu cầu trợ lý ảo của Google tìm kiếm một truy vấn, tra cứu, lên lịch hẹn, đặt lịch, kiểm soát các công việc trong ngày, gợi ý địa điểm dịch vụ như ăn uống, xem phim gần nhất, điều khiển một vài ứng dụng trên điện thoại, gọi điện nhắn tin cho ai đó, gửi mail, xem giá cổ phiếu, mua vé máy bay,... rất nhiều những tính năng được hỗ trợ. Thậm chí bạn có thể hỏi nó một câu kỳ hay chỉ là nói chuyện phiếm cho đỡ buồn. Tất cả chỉ bằng một câu lệnh, bằng chính ngôn ngữ mẹ đẻ của chúng ta.

Để thực hiện một lệnh hay tác vụ, bạn chỉ cần đơn giản gọi **Ok Google** kèm câu lệnh của chúng ta. Từ khóa **Ok Google** ở đây có chức năng kích hoạt trợ lý ảo trên điện thoại của bạn. Đây cũng là một bài toán khá hay mà chúng ta sẽ trao đổi kỹ hơn ở phần sau. Khi muốn thực hiện một câu lệnh hay tác vụ khác, bạn làm lại điều tương tự nhưng với một câu lệnh khác.

![](https://images.viblo.asia/2fc5f16d-0131-43a2-9e0b-c8194e1fd92d.png)

Nghe có vẻ khá hay và đơn giản. Chúng ta sẽ cùng tìm hiểu sâu hơn 1 chút để xem những vấn đề thực sự là gì. Nhưng trước khi bắt đầu, mình tin một số bạn sẽ đặt ra câu hỏi "Google đã làm rồi, tốt rồi, tích hợp dễ dàng rồi, mình còn làm lại làm gì? Sao không dùng luôn trên nền tảng của họ có phải đỡ mệt não hơn không?". Mình muốn chúng ta cùng trao đổi thông suốt vấn đề này trước khi bắt đầu. Tuy nhiên, phần này chính xác là phần mình muốn thảo luận, những quan điểm mình đưa ra đều là quan điểm cá nhân và chúng ta sẽ cùng trao đổi để đưa ra một câu trả lời tốt nhất.

# Tại sao chúng ta phải xây dựng một trợ lý ảo cho riêng mình?

Theo quan điểm cá nhân mình, mình đưa ra một số lý do như sau là động lực để ta phát triển các trợ lý ảo cho riêng mình.

1. Chúng ta có lợi thế là hiểu văn hóa và thói quen của người Việt. Tại sao chúng ta phải thụ động phụ thuộc vào Google?
    + Chính xác *Phong ba bão táp không bằng ngữ pháp Việt Nam*. So với các ngôn ngữ trong hệ thống chữ Latin, tiếng Việt mà một ngôn ngữ được xếp vào top những ngôn ngữ khó nhất do sự đang dạng về mặt ngữ nghĩa và văn cảnh. Và một lý do nữa mà mình cũng không thực sự muốn nói về độ khó của tiếng Việt là người Việt mình dùng Tiếng Việt thực sự rất "lộn xộn" và "dễ dãi". Mà nguyên nhân chính ở đây chính là sự "sáng tạo" rất lạ của giới trẻ Việt Nam. Vậy nên, đây là một ngôn ngữ đã khó, nay nó còn ngày càng khó hơn. Nhưng đây cũng chính là một lợi thế của chúng ta mà ta có thể "ăn đứt" được Google. Cách dùng từ, sự thay đổi văn phong của tiếng Việt không ai hiểu rõ hơn chính người Việt của chúng ta. Để xây dựng được một trợ lý ảo mà thân thiện hơn với cách nói chuyện, giao tiếp của người Việt thì mình nghĩ chẳng ai tốt mình chính mình làm cả. Và thậm chí, khi Google làm trợ lý ảo hỗ trợ cho tiếng Việt, họ cũng đã mời khá nhiều chuyên gia ngôn ngữ của ta hỗ trợ dự án. Vậy chúng ta có sẵn nguồn lực, tại sao không?

2. Chúng ta cần những sản phẩm cho các miền hẹp hơn và các lĩnh vực chuyên biệt hơn
    + Chúng ta cần những sản phẩm cho các miền hẹp hơn, các lĩnh vực chuyên biệt hơn. Đây chính là điểm mấu chốt mà mình nghĩ chúng ta sẽ tận dụng được nó rất nhiều. Google và các công ty công nghệ lớn khác như Facebook, Amazon họ làm rất tốt bài toán này nhưng các sản phẩm của họ rất Global. Việc con bạch lớn vươn cái vòi khổng lồ của mình vào các ngã rẽ, khe nhỏ là điều không thể nhưng chúng ta thì có thể. Các ứng dụng trợ lý ảo cho ngân hàng, bệnh viện, các kênh bán lẻ, giới thiệu du lịch, lễ tân,... là các bài toán mà Google không thể care được cho riêng thị phần Việt Nam. Hoặc ví dụ như chúng ta muốn xây dựng một trợ lý ảo hỗ trợ công việc của mọi người trong Sun*, chúng ta bắt buộc phải build lại nó.
3. Sự kết nối giữa các công ty khác nhau ở Việt Nam
    + Vấn đề hợp tác, kết nối giữa các công ty khác nhau ở Việt Nam cũng là một điểm then chốt để chúng ta nhảy vào bài toán này. Ví dụ đơn giản như việc chúng ta, Sun* và Google đều xây dựng được một trợ lý ảo cho riêng mình. Chắc chắn về mặc Global mình kém hẳn so với họ. Nhưng một đối tác tầm trung gì đó ở Việt Nam muốn hợp tác, tìm đối tác phát triển thiết bị loa thông minh trên xe ô tô, smartphone do họ sản xuất. Bạn nghĩ họ sẽ chọn ai. Mình tin việc kết nối giữa các công ty là vô cùng quan trọng. Việc hợp tác với một công ty trong nước sẽ dễ dàng hơn rất nhiều, từ việc trao đổi spec, phát triển và bảo trì dự án.
4. Người dùng thay đổi thói quen và văn hóa dẫn đến các vấn đề mới đòi hỏi khả năng tương thích cao
    + Thực ra ý này khá trùng với các ý ở trên, chính ta việc kết nối giữa các công ty, sự hiểu biết về văn hóa khiến ta linh động hơn trong việc cập nhật, thay đổi hệ thống cho phù hợp hơn với thời điểm hiện tại.
5. Chúng ta cần những hệ thống độc lập và kỹ thuật xử lý cho từng khách hàng, khách hàng lưu trữ và bảo mật dữ liệu của riêng họ
    + Vấn đề này gần đây cũng đang được sự quan tâm đặc biệt của các doanh nghiệp lớn và chính phủ. Các dữ liệu nhạy cảm liên quan đến thông tin cá nhân, tài chính thậm chí là thói quen người dùng khi được quản lý ở chính khách hàng sẽ tốt hơn việc bảo họ đẩy những thông tin đó cho các công ty nước ngoài như Google. Server xử lý cho trợ lý ảo có thể do chính khách hàng vận hàng và quản lý, chúng ta chỉ hỗ trợ việc xây dựng, tích hợp và bảo trì.

Rồi, coi như mọi chuyện có vẻ thông hơn, chúng ta sẽ phân tích sâu hơn về kiến trúc của một trợ lý ảo(VoiceBot).

# Kiến trúc chung

![](https://images.viblo.asia/3a4b3ebf-cb81-40a3-b34f-5f7ea55943d2.png)

Sơ đồ trên là một sơ đồ mình xây dựng nhanh cho một trợ lý ảo đơn giản.

Ban đầu, người dùng thực hiện một lệnh bằng lời nói với thiết bị của chúng ta. Module **Trigger word detection** sẽ quyết định xem đó có phải là một lệnh hay không. Nếu là một lệnh, lệnh sẽ được chuyển từ âm thanh thành văn bản thông qua **Speech2text** model. Lệnh sẽ được phân loại theo mục đích và trích chọn ra những thông tin cần thiết để xác định hàng động tiếp theo của trợ lý ảo. Thông tin được quản lý theo các Session. Lệnh được thực hiện tương ứng với mục đích và thông tin hiện có của câu lệnh, nếu chưa có đủ thông tin, hệ thống sẽ phải yêu cầu người dùng bổ sung thêm thông tin. Phản hồi của trợ lý ảo có thể là 1 đoạn âm thanh chứa thông tin được trả về qua model **Text2Speech** hoặc một hành động như bật tắt đèn, mở điều hòa,...

Chúng ta sẽ cùng phân tích một vài module quan trọng. Đầu tiên là **Trigger word detection**.

## Trigger word detection

Đây là một bài toán vô cùng quan trọng và là bài toàn duy nhất bạn sẽ phải xử lý ở phía thiết bị Client. Trợ lý ảo luôn luôn ở trạng thái hoạt động, chờ nhận lệnh của con người. Tuy nhiên, chúng ta đâu chỉ nói chuyện với mỗi con trợ lý ảo nào. Khi sử dụng nó, chúng ta vẫn nói chuyện thông thường với mọi người, kể cả những trường hợp có những giọng nói phát ra từ TV, đài FM, youtube,... Trợ lý ảo phải phân biệt được đâu là một lệnh cần nó thực hiện, đâu là một câu nói thông thường. Việc xác định này chính là bài toán Trigger word detection.

Các từ như "Ok, Google", "Hey Siri", "Cortana", "Hey Alexa" chính là các Trigger word hay đôi lúc gọi là các Wake word, Hot word vì mục đích của nó chính là để kích hoạt thiết bị của chúng ta thực hiện lệnh. Đặc điểm khi xây dựng các từ này là các từ này phải thường hiếm gặp trong môi trường thông thường để tránh việc thiết bị bị nhầm lẫn. Chắc hẳn bạn cũng không muốn nửa đêm trợ lý ảo của bạn tự dưng kích hoạt và nói liên thiên 1 hồi về cái gì đó đúng không. Thực ra lỗi kích hoạt nhầm này đã trở thành 1 incident nổi tiếng của Amazon Echo Dot, một trợ lý ảo do Amazon phát triển khi nó tự phát tiếng khóc vào ban đêm làm một người dùng kinh hãi báo cáo cho cảnh sát ngay đêm hôm đó.

Để giải quyết bài toán này một cách hiệu quả, chúng ta có thể sử dụng một mô hình Deep learning vô cùng đơn giản với input đầu vào là một phổ tần số theo thời gian(spectrogram) của dải âm thanh. Những vùng màu vàng là những vùng có dải tần số lớn, thường là những lúc người nói chuyện. Dữ liệu được gán nhãn 0(không phải từ kích hoạt) và 1(ngay sau khi từ kích hoạt được nói).

![](https://images.viblo.asia/9530c809-a601-4738-8ab5-c0e34b3e8688.jpg)
![](https://images.viblo.asia/98bd6988-2ffc-42fb-9113-9c75c210e007.png)

Âm thanh được thu bởi thiết bị thu âm gắn trên trợ lý ảo sẽ thu lại các đoạn âm thanh liên tục, tách làm các frame nhỏ và cho qua một mô hình học sâu để học cách phân biệt giữa từ kích hoạt và không phải. Chúng ta có thể sử dụng các kiến trúc mạng phổ biến như convolutional neural network và LSTM để học ra các tích năng thích hợp cho việc phân loại. Tác vụ trở thành 1 tác vụ đơn giản là gán nhãn cho chuỗi, một bài toán phổ biến trong Deep learning. Độ chính xác lên tới khoảng trên 97%.

Ngoài ra, nếu các bạn cảm thấy quá khó, đừng lo, mình gợi ý các bạn tìm hiểu về [Snowboy ](https://github.com/Kitt-AI/snowboy), một toolkit hỗ trợ tác vụ này cũng dựa trên Deep neural network.
## Intent classifier

Sau khi biết chắc một câu nói là một lệnh được gửi đến cho thiết bị trợ lý ảo, qua mô hình chuyển đổi dữ liệu âm thanh thành văn bản(mình sẽ k nói về bài toán này ở đây, bạn có thể dùng nhiều API có sẳn), lệnh cần được phân tích về mục đích để tìm ra hành động tương ứng. Ở đây, chúng ta gọi chúng là các intent hay ý định của người dùng.

Ví dụ như trong trường hợp dưới đây, người dùng thực hiện 1 lệnh "Nhắc tôi đi họp lúc 7h sáng mai", chúng ta phải biết ý định của người dùng là tạo 1 sự kiện đi họp để báo thức. Còn trong trường hợp dưới, mục đích là dịch từ một câu tiếng Việt sang tiếp Pháp. Việc phân biệt các ý định của người dùng này phải được VoiceBot thực hiện 1 cách nhanh chóng và chính xác.

![](https://images.viblo.asia/1d3df656-c5ff-4aa1-a271-30e3b18f7a70.png)

Nhiều người cho rằng, việc phân loại ý định người dùng có thể sử dụng bằng hệ thống các luật. Tuy nhiên, có hàng triệu cách để biểu thị cùng 1 ý định của người dùng, việc sử dụng luật là hoàn toàn bất khả thi. Để giải quyết bài toán này, chúng ta vẫn có thể sử dụng các mô hình học máy cơ bản như SVM, random forest,... cho nhiệm vụ phân loại. Ngoài ra, áp dụng các kiến trúc Deeplearning cho phân loại văn bản cũng vô cùng đơn giản.

Ngoài ra, bên cạnh phát hiện được ý định của người dùng, Voice cần trích xuất được thông tin theo mẫu sẵn cho từng intent để hỗ trợ cho các phase sau.

## Named entity recognition

Bài toán Named entity recognition cũng là một trong những bài toán cực kì quan trọng trong xử lý ngôn ngự tự nhiên nói chung cũng như bài toán trợ lý ảo nói riêng. Việc xác định các thực thể được đặt tên bao gồm xác định tên người, tên tổ chức, tên địa điểm, thời gian, tên sản phẩm,... Thông qua đó, ta có thể xác định được chính xác đối tượng được nói đến trong câu, nhờ vậy trợ lý ảo của chúng ta biết được thêm thông tin(keyword) về đối tượng được đề cập tới.

Ví dụ như trong các câu sau, việc xác định xong các intent của người dùng cần thêm thông tin về đối tượng được đề cập tới và thời gian để VoiceBot có thể có đủ thông tin tìm ra câu trả lời chính xác.

![](https://images.viblo.asia/5faa68f6-9961-4bcf-8212-9d9463ed7678.png)

Trước đây, bài toán này thường được giải quyết bằng các phương pháp thống kê và học máy truyền thống như Conditional random field(CRF). Tuy nhiên, với sự phát triển của các kỹ thuật học sâu, Deep learning chứng tỏ sức mạnh của mình trong việc hiểu được ngữ nghĩa, nắm bắt được ngữ cảnh của câu hơn. Do vậy, mình vẫn giải quyết bài toán này bằng một mô hình LSTM để gán nhãn cho chuỗi. Bạ có thể hình dung như dưới đây.

![](https://images.viblo.asia/17415df0-39d8-4755-9528-bcacf543e4b3.png)

Tại mỗi một step của mảng, ứng với 1 cell LSTM là một từ, nhiệm vụ của ta sẽ là học được mô hình gán nhãn cho chuỗi đầu vào đó là tên người, tên địa điểm, thời gian, tên sản phẩm,... hay đơn giản chỉ là một từ bình thường.

Tuy nói là vậy, nhưng nhiệm vụ Intent classify và Named entity recognition vẫn thường gây khó khăn cho khá nhiều người, đặc biệt là những người không có nhiều kiến thức về học máy hay học sâu. Vì vậy mình cũng có 1 giải pháp thay thế việc làm trực tiếp các task này là việc sử dụng các framework hỗ trợ các nhiệm vụ này như Rasa NLU, Dialogflow, Wit.ai,...

## Dialogue management

Tiếp theo, vấn đề này là một vấn đề không kém phần quan trọng đó là việc bạn quản lý hội thoại thế nào cho tốt. Bạn hãy tưởng tượng việc cô trợ lý của bạn chỉ hiểu được 1 câu ngay tức thì thì sẽ như thế nào? Giả sử bạn cần thực hiện 1 lệnh yêu cầu nhiều thông tin như nạp thẻ điện thoại. Trợ lý ảo yêu cầu bạn phải cung cấp số tiền bạn muốn nạp, số tài khoản bạn muốn nạp, loại sim bạn đang dùng nhưng khi bạn nhập thiếu 1 thông tin trong số đó trong lần ra lệnh đầu tiên, Bot lại hỏi bạn lại từ đầu thì cảm giác nó sẽ thật tồi tệ.

Việc quản lý hội thoại là việc đảm bảo thông tin được cung cấp trong 1 văn cảnh được lưu trữ và tái sử dụng trong những câu truy vấn sau. Như trong ví dụ này, khi câu sau chúng ta hỏi "Cô ấy bao nhiều tuổi", Google assistant vẫn hiểu cô ấy ở đây chính mà Mỹ Tâm. Thông tin được lưu trữ không chỉ là trạng thái thông tin, mà còn là cả intent của câu hỏi trước như trong ví dụ dưới đây.

![](https://images.viblo.asia/2cdc850f-a02c-4324-b739-0b1135250b5d.png)

Để giải quyết vấn đề này bạn có thể làm như mình như sau, phân đoạn hội thoại thành các mini-session, trong đó, mỗi mini-session sẽ phải định nghĩa các thông tin cần thiết để hoàn thành nhiệm vụ trong session đó. Session sau có thể tái sử dụng thông tin từ session trước nếu người dùng không cập nhật thông tin.

![](https://images.viblo.asia/f3b16097-fef0-4c93-af6d-82849002e6b8.png)

Như ở đây, mình định nghĩa 1 session cho 1 intent chuyển tiền phải bao gồm các thông tin như người được chuyển, số tiền được chuyển, số điện thoại và số tài khoản thụ hưởng(mình giả dụ thế). vậy khi 1 trong các thông tin này bị thiếu, hệ thống sẽ yêu cầu người dùng bổ sung thông tin, hơn thế nữa, thông tin này cũng được cache lại để có thể tái sử dụng trong session sau.

## Question answering

Question answering vẫn luôn là một nhiệm vụ khó nhưng hay và cực kì cần thiết cho các ứng dụng trợ lý ảo. Nhiệm vụ đặt ra cho các trợ lý ảo là phải trả lời một câu hỏi bất kỳ từ người dùng. Những câu hỏi này có thể là những câu hỏi có đáp án được mô hình hóa sẵn trong cở sở tri thức của hệ thống, cũng có thể là những câu hỏi không có ngay đáp án, cần phải có module riêng cho việc tìm kiếm và trích xuất đáp án từ internet. Câu hỏi sau khi được phân tích, trích rút từ khóa sẽ được cho qua các máy tìm kiếm để tìm ra những ứng cử có thể chứa câu trả lời. Những ứng cử này sau đó được re-ranking sau đó phân tích cú pháp của câu để tìm ra vị trí chính xác cúa đáp án.

![](https://images.viblo.asia/a6147578-be17-4ede-8cf7-afc2bef371af.png)

Ví dụ dưới đây là minh họa cho một cây phân tích cú pháp của câu hỏi "Ai đang là ông hoàng nhạc Pop", sau khi phân tích cây cú pháp, chúng ta xác định được keyword để tìm kiếm câu trả lời chính xác hơn.

![](https://images.viblo.asia/95ff71b4-cc7f-4225-aeab-5d9932436ef6.png)

Các kỹ thuật re-ranking được sử dụng phổ biến được chia làm 2 loại:
+ Loại 1: Sử dụng các kỹ thuật vector hóa câu văn, so sánh độ tương đồng giữa câu hỏi và các ứng cứ viên có thể chứa câu trả lời và sắp xếp lại. Các độ đo thường được sử dụng như cosine similarity, khoảng cách Euclid,...
+ Loại 2: Sử dụng các kiến trúc mạng Deep learning, đầu vào gồm cả câu hỏi và từng candidate, output của mô hình là một phân phối xác suất xem đó có phải là 1 cặp câu hỏi và câu trả lời đúng hay không. Phương pháp này thường cho kết quả tốt hơn tuy nhiên thời gian xử lý lại lâu hơn.

## Chat generator

![](https://images.viblo.asia/ed5ab619-b7b1-4d62-acf6-8d3af821ca87.png)

Xu hướng của người dùng hiện nay không chỉ tìm tới trợ lý ảo để nhờ sợ giúp đỡ, đôi khi họ chỉ cần những cuộc hội thoại vui vẻ. Điều này đặt ra cho ta bài toán tăng trải nghiệm người dùng bằng những cuộc hội thoại gần gũi và thân thiện hơn.

Có 2 phương pháp chính để sinh ra các đoạn hội thoại cho trợ lý ảo.

1. Retrieval based
    + Hiểu một cách đơn giản, khi người dùng thực hiện 1 hội thoại, mô hình sẽ tìm kiếm các đoạn hội thoại tương tự, đã có trong lịch sử để đưa ra câu trả lời tương tự.
    + Bạn có thể dễ dàng thực hiện phương pháp này bằng một open source khá quen thuộc đó là ChatterBot.

    ![](https://images.viblo.asia/a1c47611-fbdf-44e5-aa9b-20bede9654de.png)
3. Generative model
    + Sử dụng Retrieval based chỉ dựa trên nhưng câu thoại đã có trong lịch sử. Tính sáng tạo và phong phú của câu trả lời gần như là không có. Một trong những bước phát triển khá thú vị của Deep learning trong bài toán này là mô hình encode-decoder giúp tự động sinh hội thoại từ một câu đầu vào bất kì.
![](https://images.viblo.asia/7c4cd4e2-3421-4674-9dd2-bebdc0769aa3.png)
    + Về cơ bản, mạng sẽ gồm 2 phần, phần đầu được gọi là Encoder, có vai trò nén thông tin của câu văn đầu vào thành 1 vector(vector ngữ nghĩa). Từ vector này, phần sau của mô hình có khả năng sinh ra một câu văn mới phù hợp với câu văn đầu vào, nó được gọi là Decoder. Do vậy, mô hình này còn được gọi là kiến trúc Sequence2sequence, tức là từ câu văn sinh ra câu vă, giúp các câu trả lời có tính "sáng tạo" hơn. Tuy nhiên, một nhược điểm của phương pháp này là tính nhất quán của phản hồi mà có thể mình sẽ phân tích và trình bày ở một bài viết khác.

Cuối cùng, chúng ta cùng điểm qua một số lĩnh vực được cho là tương lai của các trợ lý ảo như Google Assistant, một số lĩnh vực nổi bật như tài chính, y tế, giáo dục, dịch vụ bán lẻ, smarthome và smart-car. Còn rất nhiều sản phẩm awesome khác mà tạm thời mình chưa nghĩ ra, đang chờ mọi người khám phá.
#  Future of voice virtual assistant
![](https://images.viblo.asia/f1494e31-ce3f-4a6c-9412-fd3075b42617.png)