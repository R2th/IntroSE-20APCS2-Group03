**Thông qua bài viết này mình mong muốn giúp mọi người một phần nào đó: tìm hiểu cách kiểm tra giao diện người dùng cho ứng dụng iOS và Android**

Với thị trường phát triển mạnh mẽ cho điện thoại di động, việc kiểm thử các ứng dụng di động đã trở nên thú vị từng ngày.

Chỉ bằng cách chạy thử nghiệm chức năng trên một ứng dụng di động, bạn không thể đăng xuất khỏi ứng dụng. Để sản phẩm khi ra thị trường có chất lượng tốt nhất thì cần tiến hành các kiểm thử, một trong số đó là: kiểm thử môi trường, kiểm thử mạng, kiểm thử giao diện người dùng, kiểm thử thời lượng pin, v.v...

Kiểm thử giao diện người dùng là một trong những thử nghiệm quan trọng trong kiểm thử ứng dụng di động và không nên xem nhẹ.

![](https://images.viblo.asia/839324fd-3e7a-4d56-96c7-72920da326de.jpg)

Giao diện người dùng đồ họa được tạo ra có nhiều sự khác biệt, thú vị trong cách người dùng và tương tác. Tầm quan trọng của một GUI tốt, hấp dẫn có thể được cảm nhận rõ rệt hơn trên các thiết bị thông minh với kích thước màn hình nhỏ hơn nhiều so với màn hình máy tính xách tay hoặc máy tính để bàn.

# A. Tầm quan trọng của kiểm thử GUI trên mobile
**Là một người dùng, bạn sẽ cảm nhận được nếu sử dụng một chương trình hay ứng dụng thiếu sự tương sẽ gây khó khăn cho việc sử dụng nó như thế nào?**

Khi người dùng sử dụng một ứng dụng di động lần đầu tiên, thì không chỉ là đánh giá về mặt hiệu năng mà còn chú trọng đến giao diện người dùng hấp dẫn. Một ứng dụng thân thiện với giao diện người dùng sẽ bán được nhiều hơn khi so sánh với một ứng dụng được phát triển tốt nhất nhưng có giao diện người dùng khó chịu.

Nếu một ứng dụng có giao diện người dùng hoàn hảo và lộng lẫy trên một thiết bị nhưng trên thiết bị khác, nó hoàn toàn bị vỡ chỉ vì nó có kích thước màn hình nhỏ hơn hoặc một hệ điều hành khác, thì nó sẽ để lại ấn tượng rất xấu. Thành công thương mại của ứng dụng sẽ bị ảnh hưởng rất lớn.

**Liệu bạn sẽ quảng cáo một ứng dụng có nút quá nhỏ để nhấp vào chặn toàn bộ chức năng?**

![](https://images.viblo.asia/7e259016-18a8-4818-90ec-c8d583abe488.jpg)

**Để không gây ra những trải nghiệm khó chịu cho người dùng?** Từ các trường hợp nêu trên, việc kiểm tra giao diện người dùng của ứng dụng trở nên rất quan trọng. Hai xác minh chính cần được thực hiện cho các ứng dụng di động là sự thân thiện với người dùng và sự xuất hiện trên các mô hình và phiên bản hệ điều hành khác nhau.

**Sau đây là một ví dụ thể hiện giao diện người dùng phải hoàn hảo trên các kích thước màn hình khác nhau:**

![](https://images.viblo.asia/6225f067-3257-4774-9ce8-a6b6cdb6817c.jpg)

# B. Làm thế nào để quyết định kiểm thử giao diện bao nhiêu là đủ?

**Biểu đồ dưới đây với chiều dọc biểu thị các ngành trong đó các ứng dụng di động được phân loại:**

![](https://images.viblo.asia/be0c0819-625b-476d-aee6-58bf10102d28.jpg)

**Từ biểu đồ trên, bạn có thể nhận ra rằng các ứng dụng Chơi game chiếm phần lớn thị phần khoảng 24,43%, sau đó là các ứng dụng về kinh doanh và giáo dục.**

- Các ứng dụng được phát triển dưới dạng ứng dụng chơi trò chơi cần được test kỹ lưỡng ở mọi khía cạnh vì UI là yếu tố đóng góp lớn nhất để đạt được thành công cho dù đó là Native hay Hybrid app.
- Một ứng dụng kinh doanh có thể không hoàn toàn dựa vào UI để thành công vì trong hầu hết các trường hợp, đối tượng mục tiêu được đào tạo để sử dụng ứng dụng. Do đó, các ứng dụng như vậy có thể có một giao diện người dùng đơn giản.
- Ứng dụng được phát triển cho mục đích giáo dục cần kiểm tra giao diện người dùng kỹ lưỡng.
- Các ứng dụng thương mại như mua sắm, du lịch, v.v cũng cần kiểm tra giao diện người dùng 1 cách kĩ lưỡng trên các thiết bị và các phiên bản hệ điều hành khác nhau.
**Nói tóm lại:** tùy thuộc vào mục đích của ứng dụng, mức độ kiểm tra giao diện người dùng có thể được quyết định nhưng kiểm tra giao diện người dùng phải luôn được thực hiện trên ít nhất 3 phiên bản hệ điều hành khác nhau.

**Công cụ được đề xuất: **

Experitest: Experitest giúp bạn dễ dàng xác minh khả năng phản hồi của UI trên các kích thước cửa sổ trình duyệt khác nhau bằng kiểm tra trực quan tự động. Tăng cường kiểm tra bố cục của bạn bằng cách đảm bảo tất cả các nút, văn bản và hình ảnh ở đúng vị trí, tỷ lệ và kích thước để loại bỏ các lỗi hình ảnh ảnh hưởng đến chức năng.

# C. Các điểm cần kiểm thử trong kiểm tra giao diện người dùng ứng dụng di động

Trong khi kiểm tra giao diện người dùng trên một ứng dụng di động, có nhiều đặc điểm khác nhau cần được xác minh.

Sau đây là một số đặc điểm cần được kiểm tra cho mọi ứng dụng:

## 1. Độ phân giải màn hình

**Dưới đây là một số độ phân giải màn hình phổ biến được xem xét trong khi kiểm thử:**

1. 640 × 480
2. 800 × 600
3. 1024 × 768
4. 1280 × 800
5. 1366 × 768
6. 1400 × 900
7. 1680 × 1050

Tất cả các độ phân giải này là bắt buộc để kiểm thử khi ứng dụng của bạn có bố cục nhiều cột

Do đó kiểm thử cần phải được thực hiện bắt đầu từ độ phân giải nhỏ nhất đến lớn nhất. Ngoài ra, nếu ứng dụng của bạn có một danh sách dài các thẻ có thông tin thì chúng cũng cần được kiểm tra ở nhiều độ phân giải màn hình khác nhau

![](https://images.viblo.asia/b82c2c64-0f9d-43db-a80d-6bef018b61a6.jpg)

![](https://images.viblo.asia/34644cda-14d3-48f1-939b-42df34ad12ac.jpg)

## 2. Kích thước màn hình

Có quá nhiều biến thể trong kích thước màn hình và độ phân giải có sẵn. Trong các thiết bị thông minh đặc biệt, kích thước điều khiển động, chúng có liên quan đến kích thước màn hình có sẵn.

Trong khi kiểm tra, hãy đảm bảo rằng các kích thước có thẩm mỹ và kiểm soát hoàn toàn hiển thị trên màn hình mà không cần cuộn. Kiểm tra GUI trên các thiết bị khác nhau với kích thước và độ phân giải màn hình khác nhau.

Có thể kiểm thử bằng các dùng môi trường giả lập tuy nhiên không có gì phù hợp hơn với thiết bị thực. Vì vậy, hãy đảm bảo rằng bạn kiểm thử trên ít nhất hai hoặc ba thiết bị thực. Ngoài ra, không quên kiểm tra các chuyển hướng màn hình ngang và dọc nếu thiết bị hỗ trợ.

Bạn phải kiểm tra ứng dụng theo các độ phân giải thường được sử dụng để đảm bảo tính khả dụng của nó.

**Vài điều mà bạn phải hiểu ở đây là:**

**Sự khác biệt giữa kích thước màn hình và độ phân giải:**  Kích thước màn hình là chiều dài của màn hình tính bằng inch được đo theo đường chéo hoặc từ góc này sang góc khác của màn hình. Độ phân giải màn hình là chiều rộng và chiều cao, **Ví dụ** 640w × 480h đại diện cho số pixel đi qua màn hình nhân với số lượng pixel đi xuống.

## 3. Các phần tử khác

Các thành phần UI như: nút, tiêu đề, biểu tượng, hình ảnh, trường chọn, trường văn bản, v.v... là một số yếu tố khác cần được xác minh về diện mạo và kích thước của chúng trên màn hình.

Cụ thể đối với các trường văn bản, nếu bàn phím mềm hiển thị trên tap cần được kiểm tra và xác minh.

Quan trọng nhất là kiểm tra kỹ lưỡng kích thước các button là bắt buộc, vì tôi nhớ trong ứng dụng của mình khi kiểm tra trên điện thoại Galaxy S, chúng tôi đã tìm thấy một button đã chặn toàn bộ ứng dụng chỉ vì nút này xuất hiện quá nhỏ để nhấp vào.

Vị trí của các thành phần UI cũng cần được xác minh theo yêu cầu, tức là nếu tất cả đều được căn giữa hoặc căn trái, v.v...

## 4. Style: Màu sắc và mẫu giao diện của thiết bị

Giao diện người dùng và bảng màu ứng dụng phải phù hợp với các màu sắc và hình nền khác nhau của điện thoại. Màu sắc và hình nền của điện thoại Samsung rất khác so với điện thoại Nokia hoặc điện thoại MI.

Do đó, bạn cần xác minh xem ứng dụng có phù hợp với các điện thoại đó không.

Chắc chắn, ứng dụng của bạn có một thiết kế riêng biệt và style của các trình điều khiển phải phù hợp với thiết kế đó. Bạn có thể đã thấy ở nhiều ứng dụng trong đó một số trình điều khiển, ví dụ: các button có cạnh tròn và các điều khiển khác, hộp văn bản có cạnh sắc nét.

Mặc dù các loại sự cố này không ảnh hưởng đến khả năng sử dụng hoặc chức năng của ứng dụng, nhưng giao diện ứng dụng vẫn cần phải nhất quán để giúp xây dựng mối quan hệ thân thiện giữa ứng dụng và người dùng.

Một trong những điều quan trọng nhất trong các style là phông chữ của các page khác nhau. Các phông chữ nên được test kỹ càng để tránh sự không nhất quán trong giao diện của ứng dụng.

Hầu hết thời gian, chúng tôi phải chú ý vào text có thể nhìn thấy trong các hoàn cảnh thông thường và bỏ qua text xuất hiện trong các tình huống cụ thể. Pop-up thành công và thất bại là một ví dụ về loại text như vậy.

Một yếu tố quan trọng khác trong style là mối quan hệ giữa màu phông chữ và tình huống hiển thị văn bản.

**Ví dụ:** Màu đỏ được sử dụng cho thông báo Lỗi, Màu xanh lá cây biểu thị thành công, Màu vàng cho cảnh báo và Màu xanh lam cho hyperlinks.

## 5. Cảm ứng đa điểm or Cảm ứng 1 điểm

Nếu ứng dụng của bạn đang hỗ trợ tính năng cảm ứng đa điểm như chạm để phóng to hoặc chạm lại để thu nhỏ, v.v., thì bạn cần test kỹ tính năng này và tạo nhiều testcases cho tất cả các màn hình áp dụng.

## 6. Bấm nút nhanh và bấm giữ nút 1 lúc 

Bấm vào icon và giữ 1 lúc sẽ hiển thị menu ngữ cảnh trong khi bấm nhanh sẽ thực hiện hành động đầu tiên của menu. Nếu tính năng có trong phần mềm của bạn, thì bạn cần xác minh chức năng này và tất cả các chức năng xung quanh nó.

## 7. Vị trí

Vị trí và thứ tự hiển thị là hai từ được sử dụng thay thế và điều thú vị là chúng được sử dụng nhiều hơn để truyền đạt hai khái niệm khác nhau được giải thích dưới đây:

*1. Đôi khi, đó là khu vực trên màn hình xuất hiện một điều khiển.*

**Ví dụ:**  Tiêu đề được đặt trên Đầu trang, Nhãn được căn trái và Hộp văn bản được căn phải, v.v... Ở đây, trên cùng, bên trái căn chỉnh và căn phải là vị trí tương đối của các điều khiển.

*2. Đôi khi, đó là thứ tự kiểm soát trong số các điều khiển khác.*

**Ví dụ:**  trong khi nhận thông tin cá nhân, tên được theo sau bởi tên cuối cùng hoặc định dạng của các điều khiển để yêu cầu địa chỉ tại Hoa Kỳ phải theo thứ tự, ZIP ZIP, City, State.

Đối với cả hai tình huống này, chúng tôi đang nói về vị trí của các điều khiển.

Trong khi kiểm tra vị trí và thứ tự hiển thị của các điều khiển, hãy đảm bảo rằng mọi thứ được đặt một cách hợp lý trên màn hình và cho thấy cảm giác thẩm mỹ tốt.

Có những tình huống một hoặc nhiều điều khiển xuất hiện trên nhiều màn hình. Trong tình huống này, bạn phải đảm bảo rằng chúng xuất hiện ở cùng một vị trí và theo cùng một thứ tự tương đối trên tất cả các trang.
# D. Làm cách nào để test sự đa dạng của UI trên các phiên bản hệ điều hành khác nhau?

Giao diện người dùng thay đổi theo phiên bản hệ điều hành và với việc ra mắt các phiên bản mới, các cải tiến được thực hiện trong giao diện người dùng.

Hãy để chúng tôi quan sát giao diện người dùng của 3 hệ điều hành mới nhất hiện có và hiểu cách các biến thể này ảnh hưởng đến một ứng dụng di động.

**Bao gồm:**

1. Lollipop
2. Marshmallow
3. Nougat

![](https://images.viblo.asia/6a15ae9e-a21e-4409-bc6f-a7e327233c7d.jpg)

**Nhìn vào danh sách trên của các tính năng UI hoặc chức năng mới, dưới dạng QA, bạn cần thiết kế các trường hợp kiểm thử.**

## 1. Lollipop:

Tạo các trường hợp kiểm thử cho hiệu ứng của thiết kế mới trên ứng dụng của bạn.
Không nhất thiết cho tất cả các màn hình nhưng tạo các trường hợp kiểm thử để truy cập các phím tắt mới trên ứng dụng của bạn.

## 2. Marshmallow:

Nếu ứng dụng của bạn xử lý biểu tượng cảm xúc, hãy tạo trường hợp kiểm thử để xác minh biểu tượng cảm xúc mới. Các ứng dụng cho phép người dùng viết đánh giá hoặc trò chuyện là những ứng dụng sử dụng biểu tượng cảm xúc thường xuyên.
Khi ứng dụng của bạn được xuất bản và cài đặt lần đầu tiên, cần phải hiển thị thông báo xin phép do đó cần phải kiểm tra giao diện người dùng của màn hình cấp phép mới. Và tạo trường hợp thử nghiệm kèm theo.
Nếu ứng dụng của bạn đang sử dụng Google hiện hành thì bạn cần tạo các trường hợp thử nghiệm để kiểm tra tính năng Google UI được cập nhật.

## 3. Nougat:

Kiểm tra kỹ lưỡng ứng dụng của bạn cần được thực hiện cho chế độ thực tế và từ đó tạo ra các trường hợp thử nghiệm tương ứng.
Tạo các trường hợp kiểm thử để xác minh các tùy chọn menu cho ứng dụng của bạn.
Nếu ứng dụng của bạn xử lý biểu tượng cảm xúc và GIF, thì hãy tạo trường hợp kiểm thử để xác minh biểu tượng cảm xúc mới và tùy chọn gửi GIF.

# E. Thiết bị hoặc trình giả lập: Cần làm gì để kiểm tra giao diện người dùng?

**Khi bạn phải kiểm tra một ứng dụng di động, bạn có thể nghĩ về thiết bị hoặc trình giả lập?**

**Có nên kiểm tra trên thiết bị thật hay trình giả lập hay cả hai không?** Không có câu trả lời chắc chắn nào cho việc này vì sự lựa chọn phụ thuộc vào những gì bạn muốn kiểm tra.

Để kiểm tra chức năng, hiệu suất, phản hồi mạng, kiểm tra môi trường, v.v., bạn nên chọn một thiết bị thực sự. Nhưng đối với những thứ như UI bạn nên chọn trình giả lập cùng với một số thiết bị thực.

## 1) Ưu điểm của việc sử dụng trình giả lập để kiểm tra giao diện người dùng là:

1. Thực tế không thể thu thập các thiết bị của tất cả các độ phân giải và điều đó cũng sẽ tiêu tốn một số tiền rất lớn. Nhưng giả lập chi phí rất nhỏ hoặc không có gì.
2. Với trình giả lập, bạn có thể tạo tất cả các độ phân giải màn hình và kết hợp hệ điều hành.
3. Nếu bạn chỉ có một bộ thiết bị thực nhưng nhóm QA có nhiều hơn 1 người, thì không thể song song tất cả các QA có thể kiểm tra cùng một kiểm thử. Với trình giả lập, mọi QA có thể tạo cùng một kết hợp trên máy của họ và kiểm tra song song.
4. Thử nghiệm trên trình giả lập ít tốn thời gian hơn và nhanh hơn khi so sánh với thiết bị thực.
5. Các lỗi phổ biến liên quan đến giao diện người dùng như căn chỉnh, v.v... có thể dễ dàng bắt gặp trên trình giả lập.

## 2) Nhược điểm bao gồm:

1. Cử chỉ có thể được thử nghiệm trên các trình giả lập. Mỗi lần chỉ có thể giả lập một cử chỉ.
2. Các đầu vào vật lý của GPS, mạng rơi hoặc mạng yếu, v.v. cũng có thể được kiểm tra.
3. Không có cách nào bạn có thể tạo trình giả lập cho điện thoại Sony, LG, Nexus, v.v.
4. Không thể tạo môi trường thực với pin yếu hoặc bộ nhớ thấp, v.v., trên trình giả lập.

Do đó quyết định nên được đưa ra tùy thuộc vào ứng dụng của bạn và yêu cầu thử nghiệm.

# F. Kiểm tra giao diện người dùng bằng tay hoặc tự động hóa?

Không có sản phẩm nào cho dù đó là ứng dụng máy tính để bàn hoặc ứng dụng web hoặc ứng dụng di động có thể được phát hành mà không cần thử nghiệm. Là một QA, chúng tôi đấu tranh để tìm và báo cáo từng khiếm khuyết nhưng vẫn được báo cáo bởi khách hàng.

## 1) Bạn có biết tại sao không?

Bởi vì các bài kiểm tra dài thường bị tránh hoặc bỏ qua do đó để lại các lỗi không bị phát hiện. Ngoài ra phạm vi bảo hiểm 100%, thực hiện chuyên sâu là không thể với thử nghiệm thủ công.

Kiểm tra giao diện người dùng khá đơn giản và dễ hiểu và bạn chỉ cần nhìn vào cách nó xuất hiện trước mắt bạn. Bây giờ nếu điều này được thực hiện thủ công thì nó rất tốn thời gian. Ngoài ra, hầu hết các lần chúng ta cần tạo một dữ liệu khổng lồ để kiểm tra giao diện người dùng như cuộn sẽ chỉ xuất hiện nếu các hàng hoặc thẻ vượt qua một số lượng cụ thể.

Tạo dữ liệu lớn rất tốn thời gian. Có một bộ tự động có thể giải quyết cả hai vấn đề.

Ngược lại, nếu các chức năng hoặc giao diện người dùng của ứng dụng vẫn đang trong giai đoạn thay đổi thì không có ý nghĩa gì khi đầu tư vào tự động hóa. Tương tự, nếu các chức năng của ứng dụng là quan trọng, thì tốt hơn là kiểm tra thủ công.

## 2) Do đó tùy thuộc vào các trường hợp, bạn nên quyết định nên kiểm tra thủ công hay tự động hóa:

* Bản chất của ứng dụng của bạn.
* Tính ổn định của ứng dụng của bạn.
* Các tài nguyên có sẵn như nhân lực để nghiên cứu các công cụ và so sánh chúng.
* Bao nhiêu thời gian được đầu tư nghiên cứu và tăng cường một công cụ tự động hóa được yêu cầu?
* Khách hàng đã sẵn sàng đầu tư thời gian vào việc học tập và nghiên cứu chưa?
# G. Công cụ kiểm tra giao diện người dùng ứng dụng di động
Sau đây là danh sách 5 công cụ có thể được sử dụng để kiểm tra giao diện người dùng của ứng dụng di động cho Android hoặc iOS.

## 1. Selendroid

Selendroid là một trong những công cụ tốt nhất và được khuyên dùng nhất để tự động hóa ứng dụng di động để kiểm tra giao diện người dùng.

Nó có thể được sử dụng cho cả ứng dụng gốc và ứng dụng lai. Nó chỉ có thể được sử dụng cho các ứng dụng Android và các bài kiểm tra API của máy khách được viết bằng Selendroid 2. Nó cũng có thể được sử dụng với nhiều thiết bị và hoàn toàn tương thích với JSON.

## 2. Testdroid

Đây là một công cụ dựa trên đám mây và có thể được sử dụng cho nhiều loại thiết bị, độ phân giải màn hình khác nhau và các phiên bản hệ điều hành của cả Android và iOS. Kiểm tra thiết bị song song là một lợi thế lớn của công cụ này và là một công cụ tốt để kiểm tra giao diện người dùng. Nó giúp các nhà phát triển cải thiện thời gian tiếp thị.

## 3. SeeTest

Nó là một công cụ trả phí và có thể được sử dụng cho Android, iOS, Windows, Symbian, v.v...

Nó là một công cụ đa nền tảng và do đó lợi thế là cùng một bài kiểm tra có thể chạy trên tất cả các nền tảng. Nó có thể được sử dụng cho tất cả các ứng dụng di động và các bài kiểm tra có thể được chạy song song trên nhiều thiết bị.

## 4. UI Automation

Đây là công cụ kiểm tra giao diện người dùng chính thức của Apple và là công cụ tốt nhất để tự động hóa các ứng dụng iOS. Mặc dù khó học nhưng nó mang lại lợi thế lớn với các thư viện, hiệu năng, kiểm tra giao diện người dùng, v.v...

## 5. Calabash

Nó có thể được sử dụng cho cả thử nghiệm Android và iOS cho các ứng dụng gốc hoặc lai. Nó là một công cụ đa nền tảng và nó được sử dụng tốt nhất để tự động hóa cử chỉ, ảnh chụp màn hình, xác nhận. Nó có thể được sử dụng trên các thiết bị màn hình cảm ứng thực. Nó cũng có hỗ trợ cho đưa chuột.

Khi các nhà phát triển đang kiểm tra đơn vị ứng dụng, họ cũng có thể thực hiện kiểm tra giao diện người dùng bằng Android Studio nhưng nó chỉ có thể được sử dụng cho các ứng dụng Android, bạn có thể nghiên cứu thêm về ứng dụng này trên developer.android.com.

# H. Checklist for Testing Mobile App UI
Dưới đây là danh sách các kiểm tra mà người kiểm thử cần sử dụng để đảm bảo GUI được kiểm tra hoàn toàn tốt trên các thiết bị thông minh:

1. Kiểm tra sơ đồ màu tổng thể và chủ đề của ứng dụng trên thiết bị.
2. Kiểm tra kiểu dáng và màu sắc của các biểu tượng.
3. Kiểm tra giao diện của nội dung trang web trên nhiều thiết bị, hệ điều hành khác nhau và trong điều kiện mạng khác nhau.
4. Kiểm tra bố cục nhiều cột - kiểm tra xem các cột có được căn chỉnh chính xác và có thể xem được ngay cả ở độ phân giải thấp hơn không.
5. Kiểm tra các thông báo tiến trình hiển thị khi load trang.
6. Kiểm tra các Menu và cách chúng được gọi.
7. Kiểm tra các mục có trong Menu.
8. Kiểm tra định hướng màn hình với cả chế độ dọc và chế độ ngang.
9. Kiểm tra việc sử dụng bàn phím ảo trong khi thay đổi chế độ màn hình.
10. Kiểm tra hiệu ứng pinch-to-zoom thông qua màn hình cảm ứng và bị xoay - các chi tiết không nên bị bóp méo khi thu phóng.
11. Kiểm tra hiệu ứng trượt, màn hình tiếp theo phải vào độ phân giải màn hình chuẩn mà không bị biến dạng
12. Kiểm tra độ nhạy của các nút - nên có thể nhấp bằng bất kỳ loại cảm ứng nào (một đầu ngón tay hoặc bút stylus lớn).
13. Bàn phím ảo tự động mở khi người dùng muốn nhập văn bản vào bất kỳ trường văn bản nào.
14. Kiểm tra xem ứng dụng có được tích hợp tốt với các phím cứng di động hay không, nút home, menu, nút quay lại.
15. Kiểm tra xem điều hướng và cuộn trang có hoạt động tốt không.
16. Kiểm tra khả năng phản hồi tổng thể của ứng dụng trên thiết bị.

**Lưu ý:** Trước khi bắt đầu kiểm tra giao diện người dùng, hãy tìm hiểu kĩ về luồng hoạt động và chức năng chính của thiết bị trong ứng dụng mà bạn chuẩn bị kiểm thử. Và luôn ghi nhớ đến hoạt động của chúng trong khi bạn thực hiện test.
# I. Tổng Kết
GUI xấu là một trải nghiệm khó chịu cho người dùng. Việc kiểm tra GUI rất được khuyến khích và đặc biệt quan trọng khi nói đến các thiết bị thông minh vì ở đây kích thước màn hình tương đối nhỏ và có rất nhiều biến thể của các thiết bị có sẵn trên thị trường.

Ứng dụng của bạn có thể hiển thị và hoạt động khác nhau trên các thiết bị khác nhau. Vì vậy, điều quan trọng là phải kiểm tra ứng dụng trên ít nhất một số kích thước và biến thể tiêu chuẩn của thiết bị.

Tất cả các ứng dụng di động đều cần kiểm tra giao diện người dùng nhưng độ sâu của kiểm tra cần thiết được xác định bởi danh mục hoặc mục đích của ứng dụng. Bạn nên phân tích đầy đủ các tính năng UI của ứng dụng dựa trên mô hình điện thoại hoặc phiên bản hệ điều hành trước khi bạn tiến hành các thử nghiệm của mình.

Dựa trên phân tích này, bạn sẽ tạo ra được các trường hợp kiểm thử. Đồng thời kết hợp sử dụng kiểm thử tự động để tiết kiệm thời gian và công sức. 

Hãy chú ý trong khi kiểm tra giao diện người dùng vì công việc này tuy nó đơn giản nhưng nó có ảnh hưởng rất lớn đến việc bán ứng dụng của bạn.

***Tham khảo: *** https://www.softwaretestinghelp.com/ios-android-ui-testing/