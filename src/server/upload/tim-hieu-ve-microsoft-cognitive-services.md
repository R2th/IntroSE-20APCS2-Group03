Gần đây mình có đề tài nghiên cứu về nhận diện khuôn mặt. Và sau 1 lúc tìm hiểu thì thấy rằng có rất nhiều thư viện thực hiện việc này. Trong số đó có Microsoft Cognitive Services.
Sau khi test thử và thấy nó quá “ảo diệu”, không những giải quyết được vấn đề nhận diện khuôn mặt mà còn rất nhiều cái vi diệu khác nên quyết định viết bài này để chia sẻ cho các bạn.
 
**Microsoft Cognitive Services là gì?**
Microsoft Cognitive Services bao gồm một bộ các API, là kết tinh vô số tinh hoa về ứng dụng của thuật toán, machine learning, data mining của Microsoft. 
Sử dụng bộ API này, bạn có thể tạo ra những ứng dụng “vi diệu” mà không cần biết gì về machine learning hay data mining.
Cho phép lập trình viên ở mọi cấp độ từ những bạn sinh viên viết ứng dụng đầu tiên của mình hay những lập trình viên chuyên nghiệp làm việc cho những công ty,
tổ chức lớn đều có thể tạo ra được những ứng thông minh hơn một cách dễ dàng.

**Bộ API Cognitive Service của Microsoft bao gồm 5 bộ API nhỏ:**

 ![](https://images.viblo.asia/558e6dec-9e9d-46c3-a719-cf04f0890bf1.png)
 
* **Vision**: Nhận diện hình ảnh, khuôn mặt và cảm xúc
* **Speech**: Nhận diện giọng nói
* **Language**: Nhận diện ngôn ngữ
* **Knowledge**: Tra cứu dữ liệu trong giới học thuật (các báo cáo, bài báo khoa học)
* **Search**: Sử dụng bing để tìm kiếm bằng chữ, hình ảnh, video

Tiếp theo mình sẽ giới thiệu chi tiết các chức năng trọng từng bộ API

**1. Vision API**(thằng ngầu nhất):

* **Computer Vision API:** API này cho phép trích xuất những thông tin có giá trị từ bức ảnh của bạn với khả năng xác định được kiểu đối tượng trong ảnh (là bánh mỳ, con chó, con mèo hay cây cối, …) 
hay nếu là người thì API này cũng xác định được giới tính của nhân vật trong ảnh. Ngoài ra, API này cũng hỗ trợ nhận diện được những nhận vật nổi tiếng hay trích xuất chữ có trong bức hình của bạn.

* **Face API:** Cái tên nói lên tất cả, đây là API cho phép phát hiện khuôn mặt có trong bức hình của bạn. Ngoài ra, API này cũng trả về các thuộc tính của khuôn mặt như tuổi, giới tính, 
độ rạng ngời của nụ cười hay thậm chí là chiều dài của tóc, … Ngoài phát hiện khuôn mặt, Face API còn cho phép so sánh 2 khuôn mặt có phải là của cùng một người hay không.

* **Emotion API:** API này cho phép xác định tâm trạng của người có trong bức hình xem họ đang vui, đang buồn hay đang giận dữ.

* **Video API:** API này là một tập hợp các thuật toán xử lý video tân tiến của Microsoft. Với Video API, các nhà phát triển có thể tích hợp các tính năng chỉnh sửa video bao gồm chống rung, 
phát hiện khuôn mặt người, phát hiện chuyển động hay tạo video thumbnail.

**2.  Speech API**

* **Bing Speech API:** API này cho phép trích xuất một tập tin âm thanh sang dạng chữ, chuyển đổi định dạng chữ sang âm thanh (tức là đọc chữ) hay đoán ý của một câu nói.

* **Custom Recognition Intelligent Service (CRIS):** CRIS cho phép bạn có thể tùy biến language model và acoustic model sao cho phù hợp với ứng dụng hoặc người dùng của bạn.

* **Speaker Recognition API:** Với những thuật toán nhận dạng giọng nói tân tiến của Microsoft, API này cho phép nhận dạng giọng nói của người nói trong một tập tin âm thanh. API này bao gồm 2 thành phần: 
speaker verification và speaker identification tạm dịch tương ứng là xác nhận người nói và xác định người nói. Speaker Verification cho phép xác nhận và xác thực người dùng bằng giọng nói của họ. 
Lập trình viên chỉ cần cho người dùng đọc một đoạn văn bản có sẵn để lưu lại dữ liệu giọng nói của họ (enrollment) rồi ở mỗi lần cần xác thực, người dùng chỉ cần đọc lại chính xác đoạn văn bản đã 
được dùng để lấy dữ liệu giọng nói của mình (bước enrollment) để xác thực. Speaker Identification có thể xác định được người đang nói trong một tập tin âm thanh dựa trên một tập dữ liệu các người nói tiềm năng. 
Tính năng này cũng có thể được sử dụng để xác thực người dùng bằng giọng nói. Tuy nhiên thay vì phải đọc chính xác một đoạn văn bản cố định như Speaker Verification 
thì khi sử dụng tính năng Speaker Identification này, người dùng có thể đọc một đoạn văn bản bất kỳ, API sẽ phân tích và đối chiếu với tập dữ liệu giọng nói của người dùng để so sánh và xác thực.

**3. Language API**

* **Bing Spell Check API:** API này cho phép phát hiện và sửa các lỗi chính tả có trong một đoạn văn bản mà bạn cung cấp. API còn có khả năng phát hiện từ lóng, sửa lỗi tên riêng hay sửa các từ đồng âm, …

* **Web Language Model API:** API này giúp hỗ trợ xử lý ngôn ngữ tự nhiên, với khả năng chèn khoảng cách vào 1 đoạn văn bản được viết liền nhau như hashtag hay đường dẫn.

* **Linguistic Analysis API:** The Linguistic Analysis API giúp bạn hiểu sâu hơn văn bản của mình. API này sẽ giúp phân tích cú pháp của ngôn ngữ tự nhiên để dễ dàng xác định được các thực thể (danh từ) 
hay các hành động (động từ) có trong văn bản. Việc xử lý văn bản này có thể hữu ích cho các công việc phân tích như phân tích tâm lý.

* **Language Understanding Intelligent Service (LUIS):** LUIS cho phép lập trình viên xây dựng các model hiểu được ngôn ngữ tự nhiên cũng như hiểu được các câu lệnh riêng được thiết kế riêng cho ứng dụng của bạn.
Ví dụ: Bạn có thể nói “bật đèn trong phòng ngủ”, gửi câu lệnh đó tới LUIS model, và thay vì trả lại chính xác các câu từ có trong câu lệnh trên, LUIS sẽ trả về dữ liệu chứa:
thông tin hành động là “bật” vị trí là “phòng ngủ” và đối tượng hướng đến là “bóng đèn”, từ đó ứng dụng có thể dễ dàng xử lý được câu lệnh của bạn.

* **Text Analytics API:** API này giúp xác định các ẩn ý, từ khóa, chủ đề hay ngôn ngữ được sử dụng có trong một đoạn văn bản.

**4. Knownledge API**

* **Academic Knowledge API:** API này cho phép lập trình viên xây dựng những giải pháp tìm kiếm tài liệu học thuật với tính năng Interpret, trả về kết quả gợi ý cho từ khóa mà người dùng nhập vào dựa vào nguồn dữ liệu phong phú từ hệ thống Microsoft Academic Graph (MAG).

* **Knowledge Exploration Service API:** API này cho phép lập trình viên xây dựng những giải pháp tìm kiếm sử dụng ngôn ngữ tự nhiên bằng cách dịch ngôn ngữ tự nhiên mà người dùng nhập vào sang các biểu thức truy vấn có cấu trúc mà máy tính có thể dễ dàng hiểu và xử lý được.

* **Entity Linking Intelligence Service API:** Với một đoạn văn bản, Entity Linking Intelligence Service sẽ nhận dạng và xác định từng thực thể (entity) có trong đoạn văn dựa vào ngữ cảnh của đoạn văn đó và sẽ liên kết những entity này tới Wikipedia. Lấy ví dụ rằng bạn có một đoạn văn bản trong đó chứa từ cloud, từ cloud này có thể hiểu sang thành “Cloud Computing” (điện toán đám mây) hay “Cloud” (đám mây trên trời), dựa vào ngữ cảnh mà API này sẽ xác định được rằng từ cloud có ý nghĩa như thế nào.

* **Recommendations API:** API này cho phép xây dựng các giải pháp khuyến nghị cho người dùng. Chẳng hạn như bạn xây dựng một ứng dụng bán hàng, sử dụng API này cho phép bạn dễ dàng xây dựng ra các tính năng khuyến nghị mua hàng như “Các sản phẩm được bán chạy”, “Các sản phẩm được mua cùng” hay “Những sản phẩm hàng đầu trong mặt hàng Đồ gia dụng” chẳng hạn, từ đó sẽ khuyến khích người dùng mua nhiều hơn.

**5.  Search API**

* **Bing Web Search API:** Đây là API chủ lực của gói Search API. Chỉ với một cú pháp lệnh gọi đến API này, lập trình viên có thể lấy được các kết quả trả về cho trang web, hình ảnh, video hay tin tức tương ứng. Nó khá tương tự với việc bạn tìm kiếm trên các công cụ tìm kiếm như Bing.com hay Google.com. Ngoài ra, lập trình viên cũng sẽ nhận được những tính năng mạnh mẽ từ công cụ tìm kiếm Bing Search như ranking kết quả tìm kiếm, phân loại kết quả tìm kiếm theo vùng, …

* **Bing Autosuggest API:** API này cho phép lập trình viên có thể xây dựng tính năng đề xuất các từ khóa tìm kiếm liên quan kể cả khi từ khóa tìm kiếm chưa được điền đầy đủ. Ví dụ nếu người dùng gõ từ khóa tìm kiếm là “Thời tiết tại H”, API sẽ trả về danh sách các từ khóa gợi ý như “Thời tiết tại Hà Nội”, “Thời tiết tại Hồ Chí Minh” hay “Thời tiết tại Hà Giang” chẳng hạn.

* **Bing Image Search API:** API này cho phép lập trình viên có thể tìm kiếm các hình ảnh tương ứng với từ khóa nhập vào. Ngoài trả về đường dẫn của hình ảnh, API này cũng trả về các metadata hữu ích như kích thước ảnh, màu chủ đạo của ảnh, …

* **Bing Video Search API:** API này cho phép lập trình viên có thể tìm kiếm các video tương ứng với từ khóa nhập vào. Ngoài trả về đường dẫn của video, API này cũng trả về các metadata hữu ích khác như tên nhà sản xuất, định dạng mã hóa, ảnh thumbnail, …

* **Bing News Search API:** API này cho phép lập trình viên có thể tìm kiếm các tin tức, bài báo tương ứng với từ khóa nhập vào. Ngoài ra, API cũng trả về các metadata hữu ích khác như thể loại, thông tin nhà xuất bản, ngày xuất bản, …


Với tổng cộng 21 API mà dịch vụ Microsoft Cognitive Services cung cấp, lập trình viên có thể thỏa sức xây dựng các ứng dụng tích hợp các tính năng thông minh sử dụng sức mạnh từ machine learning 
mà dịch vụ này mang lại một cách dễ dàng chỉ bằng việc gọi API và xử lý kết quả trả về với định dạng JSON.
Các API của Cognitive Services được viết dưới dạng REST API do vậy lập trình viên có thể tích hợp các API này trên nhiều nền tảng khác nhau như iOS, Android, hay Windows, chỉ cần có kết nối Internet.

Hiện tại, hầu hết các API từ Cognitive Services đều có gói sử dụng miễn phí, do vậy bạn có thể ngay lập tức đăng ký và trải nghiệm ngay 21 API mà Microsoft Cognitive Services mang lại hoàn toàn miễn phí.
Sử dụng API rất đơn giản, bạn không cần cài đặt gì cả, chỉ cần làm 3 bước:

1. Đăng ký tài khoản Cognitive Service để lấy key. Một tài khoản free cho phép bạn gọi khoản 5000-10000 request mỗi tháng, cũng khá đủ để nghịch ngợm lung tung rồi.
2. Chọn API mình muốn sử dụng, sau đó vào xem document của nó
    Bạn cũng có thể tham khảo các demo trực quan & có tính tương tác của các API trong Cognitive Services tại các đường dẫn sau:
    https://azure.microsoft.com/en-us/services/cognitive-services/
3. Mỗi API sẽ có 1 API URL riêng. Ta chỉ cần gửi request tới URL này, trong request có kèm theo key và link của hình ảnh muốn nhận diện. Kết quả sẽ được trả về dưới dạng JSON