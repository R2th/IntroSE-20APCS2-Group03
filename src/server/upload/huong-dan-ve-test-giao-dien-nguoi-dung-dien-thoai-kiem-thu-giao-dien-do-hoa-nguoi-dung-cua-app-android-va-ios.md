Hướng dẫn về test giao diện người dùng điện thoại: Kiểm thử giao diện đồ họa người dùng dành cho app Android và iOS<br>
Với sự phát triển mạnh mẽ của thị trường điện thoại di động, việc test các ứng dụng di động đã trở nên thú vị theo từng ngày.<br>
Chỉ bằng cách test chức năng trên một ứng dụng di động, bạn không thể đăng xuất khỏi ứng dụng. Có một vài loại testing khác như test môi trường, test network, test UI, test thời lượng pin, v.v cần được hoàn thành<br>
Test giao diện người dùng là một trong những loại test quan trọng trong test ứng dụng di động và không nên xem nhẹ.<br>

![](https://images.viblo.asia/470c6b24-6ff7-405b-9506-0305c6a01f98.jpg)<br>
Giao diện đồ họa người dùng tạo ra rất nhiều sự khác biết trong cách người dùng cảm thấy thích thú và được tương tác khi tìm ứng dụng của bạn. Tầm quan trọng của một GUI tốt và hấp dẫn có thể được cảm nhận rõ rệt hơn trong môi trường thiết bị thông minh nơi kích thước màn hình nhỏ hơn nhiều so với màn hình máy tính xách tay hoặc máy tính để bàn.<br>
## Sự quan trọng của việc testing giao diện người dùng ứng dụng di động<br>
**Là một người dùng, bạn sẽ cảm thấy như đang sử dụng một ứng dụng thiếu sự tương tác của người dùng và gây khó khăn cho việc sử dụng nó như thế nào?** <br>
Khi người dùng sử dụng ứng dụng di động lần đầu tiên, nó không chỉ là hiệu năng đáng gây chú ý mà còn hấp dẫn giao diện người dùng. Một ứng dụng thân thiện với giao diện người dùng bán được nhiều hơn khi so sánh với một ứng dụng được phát triển tốt nhưng có giao diện người dùng khó chịu.<br>
Nếu một ứng dụng có giao diện người dùng hoàn hảo và tuyệt vời trên một thiết bị nhưng trên thiết bị kia thì nó hoàn toàn gây ra sự khó chịu chỉ vì nó có kích thước khác hoặc một hệ điều hành khác, thì nó sẽ để lại ấn tượng rất xấu. Thành công thương mại của ứng dụng sẽ bị ảnh hưởng xấu.<br>
**Liệu bạn sẽ quảng cáo cho một ứng dụng có nút quá nhỏ để click vào và chặn toàn bộ chức năng không?**<br>
![](https://images.viblo.asia/4c5521f7-d8bc-44b4-8877-763b053c84be.jpg)<br>
Đây có phải những trải nghiệm khó chịu cho người dùng?  Do các trường hợp nêu trên, việc kiểm tra giao diện người dùng của ứng dụng trở nên rất quan trọng. Hai yếu tố chính cần được thực hiện cho các ứng dụng di động là sự thân thiện với người dùng và sự xuất hiện trên các mô hình và phiên bản HĐH khác nhau.<br>
Sau đây là một ví dụ về cách giao diện người dùng phải hoàn hảo trên các kích thước màn hình khác nhau:<br>

![](https://images.viblo.asia/686449fe-6d44-4b2e-bcbf-86f92360270f.jpg)
## Làm thế nào để quyết định phải kiểm tra giao diện người dùng bao nhiêu là cần thiết?<br>
**Biểu đồ sau biểu thị các ngành dọc khác nhau trong đó các ứng dụng di động có thể được phân loại:**<br>
![](https://images.viblo.asia/b9b08ce2-7042-4c87-9828-104bb1b44c82.jpg)<br>
**Từ biểu đồ trên, bạn có thể nhận ra rằng các ứng dụng Chơi game chiếm phần lớn thị phần khoảng 24,43%, và sau đó là các ứng dụng kinh doanh và giáo dục.<br>**
- Các ứng dụng được phát triển dưới dạng ứng dụng chơi trò chơi cần được test kỹ lưỡng ở mọi khía cạnh vì UI là yếu tố đóng góp lớn nhất để đạt được thành công cho dù đó là Native or Hybrid app<br>
- Một ứng dụng kinh doanh có thể không hoàn toàn dựa vào UI để thành công vì trong hầu hết các trường hợp, đối tượng mục tiêu được đào tạo để sử dụng ứng dụng. Do đó, các ứng dụng như vậy có thể có một giao diện người dùng đơn giản.<br>
- Ứng dụng được phát triển cho mục đích giáo dục cần kiểm tra giao diện người dùng kỹ lưỡng.<br>
Các ứng dụng thương mại như mua sắm, du lịch, v.v cũng cần kiểm tra giao diện người dùng 1 cách hoàn toàn trên các thiết bị và các phiên bản HĐH khác nhau.<br>
Nói tóm lại, tùy thuộc vào mục đích của ứng dụng, mức độ kiểm tra giao diện người dùng có thể được quyết định nhưng kiểm tra giao diện người dùng phải luôn được thực hiện trên ít nhất 3 phiên bản HĐH khác nhau.
## Hướng dẫn: Phải test những gì trong test giao diện người dùng ứng dụng di động
Trong khi kiểm tra giao diện người dùng trên một ứng dụng di động, có nhiều đặc điểm khác nhau cần được xác minh.<br>
Sau đây là một số đặc điểm cần được kiểm tra cho mọi ứng dụng:<br>
**1) Độ phân giải màn hình**<br>
**Sau đây là một số độ phân giải màn hình phổ biến được xem xét trong khi tạo thử nghiệm:**<br>
- 640 × 480<br>
- 800 × 600<br>
- 1024 × 768<br>
- 1280 × 800<br>
- 1366 × 768<br>
- 1400 × 900<br>
- 1680 × 1050<br>
Tất cả các độ phân giải này là bắt buộc để test khi ứng dụng của bạn có bố cục nhiều cột .<br>
Do đó chúng ta cần phải xác minh từ độ phân giải nhỏ nhất đến độ phần giải lớn nhất. Ngoài ra, nếu ứng dụng của bạn có một danh sách dài các thẻ tin thì chúng cũng cần được kiểm tra ở độ phân giải khác để nhóm thông tin.<br>
![](https://images.viblo.asia/bcbe2f82-52a9-4473-832d-c8989a0a8ad4.jpg)<br>
![](https://images.viblo.asia/9c153bc7-7229-4cc6-bf78-07183e8f5610.jpg)<br>
**2) Kích thước màn hình**
Có quá nhiều biến thể trong kích thước màn hình và độ phân giải có sẵn. Đặc biệt trong các thiết bị thông minh, kích thước điều khiển không phải là yếu tố cố định, chúng có liên quan đến kích thước màn hình có sẵn.<br>
Trong quá trình test, hãy đảm bảo rằng các kích thước điều khiển trông có vẻ thẩm mỹ và kiểm soát hoàn toàn hiển thị trên màn hình mà không cần cuộn chuột. Phải test GUI trên các thiết bị khác nhau với kích thước và độ phân giải màn hình khác nhau.<br>
Dùng trình giả lập thì tố cho mục đích này nhưng lại không có gì phù hợp với thiết bị trong thực tế. Vì vậy, hãy đảm bảo rằng bạn phải test trên ít nhất hai hoặc ba thiết bị thực. Ngoài ra, nên nhớ cả việc test xoay màn hình hướng ngang và dọc nếu thiết bị hỗ trợ.<br>
Bạn phải kiểm tra ứng dụng theo các độ phân giải thường được sử dụng để đảm bảo tính khả dụng của nó.<br>
**Vài điều mà bạn phải chú ý ở đây là:**<br>
**Sự khác biệt giữa kích thước màn hình và độ phân giải**: Kích thước màn hình là chiều dài của màn hình tính bằng inch được đo theo đường chéo hoặc từ góc này sang góc khác của màn hình. Độ phân giải màn hình là chiều rộng và chiều cao<br>
Ví dụ:  640w × 480h đại diện cho số pixel tính từ bề ngang của màn hình nhân với số pixel từ trên xuống.<br>
**3) Các thành phần UI khác nhau**<br>
Các thành phần UI như nút, tiêu đề, biểu tượng, hình ảnh, trường chọn, trường văn bản, checkboxes, v.v., là một số các yếu tố khác nhau cần được xác minh cho diện mạo và kích thước của chúng trên màn hình.<br>
Cụ thể đối với các trường văn bản, nếu bàn phím ảo hiển thị sau khi tap vào text field cần được kiểm tra và xác minh.<br>
Quan trọng nhất của việc testing là kích thước của button phải là bắt buộc vì  tối nhớ có lần trong ứng dụng của mình khi test trên điện thoại Galaxy S, chúng tôi đã bị stuck bởi button đã chặn toàn bộ ứng dụng chỉ vì nút này xuất hiện quá nhỏ để click.<br>
Vị trí của các thành phần UI cũng cần được xác minh theo yêu cầu, tức là nếu tất cả đều được căn giữa hoặc căn trái, v.v.<br>
**4) Style: Màu sắc và mẫu giao diện của thiết bị**<br>
Giao diện người dùng và bảng màu ứng dụng phải phù hợp với các màu sắc và hình nền khác nhau của điện thoại. Màu sắc và hình nền của điện thoại Samsung rất khác so với điện thoại Nokia hoặc điện thoại MI.<br>
Do đó, bạn cần xác minh xem ứng dụng có phù hợp với các điện thoại đó không.<br>
Chắc chắn, ứng dụng của bạn có một thiết kế riêng biệt. Và style của các trình điều khiển phải nên phù hợp với thiết kế đó. Bạn có thể đã thấy ở nhiều ứng dụng trong đó một số trình điều khiển, ví dụ: các panals có cạnh tròn và các điều khiển khác, ví dụ: hộp văn bản có cạnh sắc nét.<br>
Mặc dù các loại sự cố này không ảnh hưởng đến khả năng sử dụng hoặc chức năng của ứng dụng, nhưng giao diện ứng dụng vẫn cần phải nhất quán để giúp xây dựng mối quan hệ thân thiện giữa ứng dụng và người dùng.<br>
Một trong những điều quan trọng nhất trong các style là phông chữ của các page khác nhau. Các phông chữ nên được test kỹ càng để tránh bất kỳ sự không nhất quán trong giao diện của ứng dụng.<br>
Hầu hết thời gian, chúng tôi phải chú ý vào text có thể nhìn thấy trong các hoàn cảnh thông thường và bỏ qua text xuất hiện trong các tình huống cụ thể. Pop-up thành công và thất bại là một ví dụ về loại text như vậy.<br>
Một yếu tố quan trọng khác trong style là mối quan hệ giữa màu phông chữ và tình huống hiển thị văn bản.<br>
Ví dụ: Màu đỏ được sử dụng cho thông báo Lỗi, Màu xanh lá cây biểu thị thành công, Màu vàng cho cảnh báo và Màu xanh lam cho hyperlinks<br>
**5) Cảm ứng đa điểm or Cảm ứng 1 điểm**<br>
Nếu ứng dụng của bạn đang hỗ trợ tính năng cảm ứng đa điểm như chạm để phóng to hoặc chạm lại để thu nhỏ, v.v., thì bạn cần test kỹ tính năng này và tạonhiều test cases cho tất cả các màn hình áp dụng.<br>
**6) Bấm nút nhanh và bấm giữ nút 1 lúc** <br>
Bấm vào icon và giữ 1 lúc sẽ hiển thị menu ngữ cảnh trong khi bấm nhanh sẽ thực hiện hành động đầu tiên của menu. Nếu tính năng có trong phần mềm của bạn, thì bạn cần xác minh chức năng này và tất cả các chức năng xung quanh nó.<br>
**7) Địa điểm**<br>
Địa điểm và vị trí là hai từ được sử dụng thay thế và điều thú vị là chúng được sử dụng nhiều hơn để truyền đạt hai khái niệm khác nhau được giải thích dưới đây:<br>
- Đôi khi, nó là địa điểm trên màn hình chỗ mà trình điều khiển xuất hiện.<br>
**Ví dụ:** Tiêu đề được đặt ở **trên cùng** của trang, Labels được **căn lề trái** và text boxes được **căn phải**, v.v ... Ở đây, ’top, ‘ left Aligned và 'Right Aligned' là những vị trí có liên quan với nhau của các trình điều khiển.<br>
-  Đôi khi đó là thứ tự điều khiển trong số các trình điều khiển khác.<br>
**Ví dụ**: Trong khi nhận thông tin cá nhân, Tên riêng được **theo sau** bởi tên họ. Hoặc, định dạng của các trình điều khiển đề cập một địa chỉ ở Mỹ phải theo **thứ tự**: ZIP, City, State.<br>
Đối với cả hai tình huống này, chúng ta đang nói về vị trí của các trình điều khiển.<br>
Trong khi test địa điểm và vị trí của các trình điều khiển, hãy đảm bảo rằng mọi thứ phải được sắp xếp một cách hợp lý trên màn hình và tạo cảm giác thẩm mỹ tốt.<br>
Có những tình huống mà một hoặc nhiều trình điều khiển xuất hiện trên nhiều hơn một màn hình. Trong tình huống này, bạn phải đảm bảo rằng chúng xuất hiện ở cùng một địa điểm và cùng theo một thứ tự trên tất cả các trang.<br>
## Làm cách nào để test sự đa dạng của UI trên các phiên bản hệ điều hành khác nhau?<br>

Giao diện người dùng thay đổi theo phiên bản HĐH và với việc ra mắt phiên bản mới, các cải tiến được thực hiện trong Giao diện người dùng.<br>
Chúng ta hãy cùng xem xét giao diện người dùng của 3 hệ điều hành mới nhất hiện nay và tìm hiểu các biến thể này ảnh hưởng đến một ứng dụng di động như thế này.<br>

Chúng là: <br>
- Lollipop<br>
- Marshmallow<br>
- Nougat<br>
![](https://images.viblo.asia/44252750-8a52-4189-81d2-bfccc1bfceab.jpg)<br>
**Nhìn vào danh sách trên của các tính năng UI hoặc chức năng mới là1 QA, bạn cần tạo các test case xung quanh vấn đề này.**<br>
**1) Lollipop:**<br>
- Tạo các test cases cho hiệu ứng của thiết kế mới trên ứng dụng của bạn.
- Không nhất thiết cho tất cả các màn hình nhưng tạo các test cases để truy cập các lối tắt mới trên ứng dụng của bạn. <br>
**2) Marshmallow:**<br>
- Nếu ứng dụng của bạn xử lý biểu tượng cảm xúc, hãy tạo test cases để xác minh những biểu tượng cảm xúc mới. Ứng dụng cho phép người dùng viết các đánh giá hoặc trò chuyện là những ứng dụng sử dụng biểu tượng cảm xúc thường xuyên.*<br>
- Khi ứng dụng của bạn được đưa ra thị trường và cài đặt lần đầu tiên, có thể sẽ cần phải xin permission do đó cần phải kiểm tra giao diện người dùng của màn hình cấp permission mới. Và tạo test case cho việc này.*<br>
- Nếu ứng dụng của bạn đang sử dụng Google Now thì bạn cần tạo các test cases để test bản update cho Google Now feature’s UI*<br>
**3) Nougat:**<br>
- Kiểm tra kỹ lưỡng ứng dụng của bạn cần được thực hiện cho chế độ daydream reality và từ đó tạo ra các testcases tương ứng.<br>
- Tạo các test case để xác minh những tùy chọn menu cho ứng dụng của bạn.<br>
- Nếu ứng dụng của bạn xử lý biểu tượng cảm xúc và ảnh GIF, thì hãy tạo test cases để xác minh biểu tượng cảm xúc mới và tùy chọn gửi ảnh GIF.<br>
**Thiết bị thực hoặc giả lập: Chọn gì để test giao diện người dùng?**<br>
**Khi bạn phải test một ứng dụng di động, bạn có thể nghĩ về thiết bị test nên là gì?**<br>
**Liệu thử nghiệm trên một thiết bị thực hay giả lập hay cả hai?** Không có câu trả lời chắc chắn cho vấn đề này bởi vì sự lựa chọn phụ thuộc vào những gì bạn muốn kiểm tra.<br>
Để kiểm tra chức năng, hiệu suất, phản hồi mạng, test fields, v.v., bạn nên chọn một thiết bị thật. Nhưng đối với những thứ như UI bạn nên chọn trình giả lập cùng với một số thiết bị thật.<br>
**Ưu điểm**
Ưu điểm của việc sử dụng trình giả lập để kiểm tra UI là: <br>
1) Thực tế không thể thu thập tất cả thiết bị bao gồm tất cả các độ phân giải vì điều đó sẽ rất tốn kém. Nhưng sử dụng trình giả lập thì chi phí gần như bằng không.<br>
2) Với trình giả lập, bạn có thể tạo được tất cả độ phân giải màn hình kết hợp với HĐH.<br>
3) Nếu bạn chỉ có một bộ devices thật nhưng nhóm QA có nhiều hơn 1 người, thì không thể tất cả các QA có thể test song song cùng một thiết bị. Với trình giả lập, mọi QA có thể kết hợp thiết bị của họ và test song song.<br>
4) Thử nghiệm trên trình giả lập tốn ít thời gian hơn và nhanh hơn khi so sánh với thiết bị thực.<br>
5) Các lỗi phổ biến liên quan đến giao diện người dùng như căn chỉnh, vv có thể dễ dàng bắt gặp trên trình giả lập.<br>

**Nhược điểm**
Nhược điểm bao gồm:
1) Thao tác với thiết bị ko thể test trên các trình giả lập. Mỗi lần thao tác chỉ có thể được giả lập một cử chỉ.<br>
2) Các đầu vào vật lý của GPS, rớt mạng hoặc mạng yếu, v.v. cũng có thể được kiểm tra.<br>
3) Bạn không thể tạo được trình giả lập cho điện thoại Sony, LG, Nexus, v.v.<br>
4) Không thể tạo môi trường thật với chế độ pin yếu hoặc bộ nhớ bị đầy, v.v., trên trình giả lập.<br>
Do đó quyết định nên được đưa ra tùy thuộc vào ứng dụng của bạn và yêu cầu của việc test.<br>
## Kiểm tra giao diện người dùng bằng tay hoặc tự động hóa? <br>
Không có sản phẩm nào cho dù đó là ứng dụng máy tính để bàn hoặc ứng dụng web hoặc ứng dụng di động có thể được phát hành mà không cần thử nghiệm. Là một QA, chúng tôi đấu tranh để tìm và báo cáo từng khiếm khuyết nhưng vẫn được báo cáo bởi khách hàng.<br>
**Bạn có biết tại sao?**<br>
 Bởi vì các test dài thường bị tránh hoặc bỏ qua do đó để lại các lỗi không bị phát hiện. Ngoài ra mức độ bao phủ 100%, test chuyên sâu là không thể với việc test manual.<br>
 Test giao diện người dùng khá đơn giản và dễ hiểu và bạn chỉ cần nhìn vào cách nó xuất hiện trước mắt bạn. Bây giờ nếu điều này được thực hiện thủ công thì nó rất tốn thời gian. Ngoài ra, hầu hết các lần chúng ta cần tạo một dữ liệu lớn để test giao diện người dùng như cuộn màn hình sẽ chỉ xuất hiện nếu rows hoặc cards vượt qua một số lượng cụ thể.<br>
- Tạo big data rất tốn thời gian. Có một bộ test tự động có thể giải quyết cả hai vấn đề.<br>
- Ngược lại, nếu các chức năng hoặc giao diện người dùng của ứng dụng vẫn đang trong giai đoạn phát triển thì không có ý nghĩa gì khi đầu tư vào automation test. Tương tự, nếu các chức năng của ứng dụng là quan trọng, thì tốt hơn là test thủ công.<br>
**Do đó tùy thuộc vào các điểm sau, bạn nên quyết định nên test thủ công hay tự động hóa:**<br>
- Bản chất của ứng dụng của bạn.<br>
- Sự ổn định của ứng dụng của bạn.<br>
- Các tài nguyên có sẵn như nhân lực để nghiên cứu các công cụ và so sánh chúng.<br>
- Bao nhiêu thời gian được đầu tư nghiên cứu và tăng cường một công cụ tự động hóa được yêu cầu?<br>
- Khách hàng có sẵn sàng đầu tư thời gian vào việc học tập và nghiên cứu chưa?<br>
## Công cụ kiểm tra giao diện người dùng ứng dụng di động
Sau đây là danh sách 5 công cụ có thể được sử dụng để kiểm tra giao diện người dùng của ứng dụng di động cho Android và / hoặc iOS.<br>
**(Đối với các công cụ kiểm tra chức năng, bạn có thể tham khảo danh sách các tool test auto trên các tool tự động hóa của chúng tôi để kiểm tra trang ứng dụng Android).**<br>
**1) Selendroid**<br>
- Selendroid là một trong những công cụ tốt nhất và được khuyên dùng nhất để tự động hóa ứng dụng di động trong việc kiểm tra giao diện người dùng.<br>
- Nó có thể được sử dụng cho cả Native và Hybrid apps. Nó chỉ có thể được sử dụng cho các ứng dụng Android và các bài kiểm tra client API được viết bằng Selendroid 2. Nó cũng có thể được sử dụng với nhiều thiết bị và hoàn toàn tương thích với JSON.<br>

**2) Testdroid**<br>
- Đây là một công cụ dựa trên nền tảng đám mây và có thể được sử dụng cho nhiều loại thiết bị, độ phân giải màn hình khác nhau và các phiên bản HĐH của cả Android và iOS. Test song song trên 2 thiết bị là một lợi thế lớn của tool này và nó cũng là một công cụ tốt để kiểm tra giao diện người dùng. Nó giúp các nhà phát triển cải thiện thời gian tiếp thị.<br>

**3) SeeTest**<br>
- Nó là một công cụ trả phí và có thể được sử dụng cho Android, iOS, Windows, Symbian, v.v.<br>
- Nó là một công cụ đa nền tảng và do đó lợi thế là cùng một bài test có thể chạy trên tất cả các nền tảng. Nó có thể được sử dụng cho tất cả các ứng dụng di động và các bài test có thể được chạy song song trên nhiều thiết bị.<br>

**4) UI Automation**<br>
- Đây là công cụ kiểm tra giao diện người dùng chính thức của Apple và là công cụ tốt nhất để tự động hóa các ứng dụng iOS. Mặc dù khó học nhưng nó mang lại lợi thế lớn với các thư viện, hiệu năng, kiểm tra giao diện người dùng, v.v.<br>

**5) Calabash**<br>
- Nó có thể được sử dụng cho việc test cả trên Android và iOS cho các ứng dụng Native hoặc Hybrid. Nó là một công cụ đa nền tảng và nó được sử dụng tốt nhất để tự động hóa các thao tác, ảnh chụp màn hình, xác nhận, vv nó có thể được sử dụng trên các thiết bị màn hình cảm ứng thực. Nó cũng có hỗ trợ cucumber.<br>
- Khi các nhà phát triển unit test cho ứng dụng, họ cũng có thể thực hiện kiểm tra giao diện người dùng bằng Android Studio nhưng nó chỉ có thể được sử dụng cho các ứng dụng Android, bạn có thể nghiên cứu thêm về ứng dụng này trên developer.android.com.<br>
## Checklist để kiểm tra giao diện người dùng ứng dụng di động<br>
Dưới đây là danh sách kiểm tra dành cho người kiểm tra để đảm bảo GUI được kiểm tra một cách tốt nhất trên các thiết bị thông minh:<br>
- Kiểm tra màu hình nền tổng thể và chủ đề của ứng dụng<br>
- Kiểm tra kiểu dáng và màu sắc của các biểu tượng.<br>
- Kiểm tra giao diện của nội dung web trên nhiều thiết bị và điều kiện mạng.<br>
- Kiểm tra bố cục nhiều cột - kiểm tra xem các cột có được căn chỉnh chính xác và có thể xem được ngay cả ở độ phân giải thấp hay không.<br>
- Kiểm tra nếu các chỉ số tiến trình được hiển thị rõ ràng khi các trang đang loading.<br>
- Kiểm tra các Menu và cách chúng được gọi.<br>
- Kiểm tra các mục có trong Menu.<br>
- Xoay màn hình được thử nghiệm ở cả chế độ dọc và ngang.<br>
- Kiểm tra việc sử dụng bàn phím ảo trong khi thay đổi chế độ màn hình.<br>
- Kiểm tra hiệu ứng pinch-to-zoom thông qua màn hình cảm ứng và trackballs - chi tiết không nên bị bóp méo khi thu phóng.<br>
- Kiểm tra hiệu ứng trượt - nên hoạt động trong một nét đơn, màn hình tiếp theo phải vào độ phân giải màn hình mà không bị biến dạng<br>
- Kiểm tra độ nhạy của các nút - phải có thể nhấp bằng bất kỳ loại cảm ứng nào (đầu ngón tay hoặc bút stylus).<br>
- Bàn phím ảo sẽ tự động mở khi người dùng muốn nhập văn bản vào bất kỳ trường văn bản nào.<br>
- Kiểm tra xem ứng dụng có được tích hợp tốt với các phím cứng di động hay không, nút home, menu, nút back.<br>
- Kiểm tra xem điều hướng và cuộn trang có hoạt động tốt thông qua trackball không.<br>
- Kiểm tra khả năng phản hồi tổng thể của ứng dụng trên thiết bị.<br>
Tip:  Trước khi bắt đầu kiểm tra giao diện người dùng, hãy tìm hiểu kiến thức về cả tiến trình và chức năng của thiết bị trong ứng dụng sẽ được kiểm tra. Và ghi nhớ các chức năng này trong khi thực hiện thử nghiệm.<br>
## Phần kết luận<br>
GUI xấu là một trải nghiệm khó chịu cho người dùng. Việc testing GUI rất được khuyến khích và đặc biệt quan trọng đối với các thiết bị thông minh vì ở đây kích thước màn hình tương đối nhỏ và sự đa dạng của các thiết bị có sẵn trên thị trường.<br>
Ứng dụng của bạn có thể trông khác nhau và hoạt động khác nhau trên các thiết bị khác nhau. Vì vậy, điều quan trọng là phải test ứng dụng ít nhất là 1 lần ở size tiêu chuẩn và đa dạng trên các thiết bị.<br>
Tất cả các ứng dụng di động đều cần được kiểm tra giao diện người dùng nhưng mức độ kiểm tra cần thiết phải được xác định bởi danh mục hoặc mục đích của ứng dụng. Bạn nên thực hiện một phân tích đầy đủ về các tính năng của ứng dụng UI đối với các phiên bản mô hình điện thoại hoặc hệ điều hành trước khi bạn hoàn thành môi trường test của mình.<br>
Dựa trên phân tích này, bạn nên tạo các test cases để test. Sử dụng automation test bất cứ nơi nào có thể để tiết kiệm thời gian.<br>
Hãy chú ý trong khi kiểm tra giao diện người dùng vì nó đơn giản nhưng nó có ảnh hưởng lớn đến việc bán ứng dụng của bạn.<br>


Link bài viết
https://www.softwaretestinghelp.com/ios-android-ui-testing/