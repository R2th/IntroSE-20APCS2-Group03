Với thị trường phát triển mạnh mẽ cho điện thoại di động, việc kiểm thử các ứng dụng di động đã trở nên thú vị từng ngày.<br>

Kiểm thử giao diện người dùng là một phần quan trọng trong kiểm thử ứng dụng di động và không nên xem nhẹ.<br>

Giao diện đồ họa người dùng tạo ra nhiều sự khác biệt ở mức độ thú vị và tương tác của người dùng khi tìm thấy ứng dụng của bạn. Tầm quan trọng của một GUI tốt và hấp dẫn có thể được cảm nhận rõ rệt hơn trong môi trường thiết bị thông minh có kích thước màn hình nhỏ hơn nhiều so với màn hình máy tính xách tay hoặc máy tính để bàn.<br>

![](https://images.viblo.asia/d74ede86-d69b-4733-871d-7e1817b50037.png)<br>
*UI testing*<br><br>

## 1. Giao diện tạo nên cảm nhận đầu tiên của người dùng với ứng dụng?

> `Là một người dùng, bạn sẽ cảm thấy như thế nào nếu sử dụng một ứng dụng thiếu sự tương tác của người dùng và gây khó khăn cho việc sử dụng?`

Khi người dùng sử dụng ứng dụng di động lần đầu tiên, không chỉ hiệu suất vượt trội gây sự chú ý mà còn là giao diện người dùng hấp dẫn. Một ứng dụng thân thiện với giao diện người dùng sẽ bán được nhiều hơn khi so sánh với một ứng dụng được phát triển tốt nhất nhưng có giao diện người dùng khó chịu.<br>

Nếu một ứng dụng có giao diện người dùng hoàn hảo và lộng lẫy trên một thiết bị nhưng trên thiết bị kia, nó hoàn toàn bị rối chỉ vì nó có kích thước khác hoặc một hệ điều hành khác, thì nó sẽ để lại ấn tượng rất xấu. Lợi nhuận thương mại của ứng dụng cũng sẽ bị ảnh hưởng xấu.<br>

Khi điện thoại di động xuất hiện, tính năng quan trọng nhất là thân thiện với người dùng . Cho dù ứng dụng của bạn tốt đến đâu, hiển thị thông minh hay tính năng khôn ngoan, nếu người dùng không thể xử lý nó trên màn hình nhỏ đó quá 5 giây, họ sẽ không bao giờ quay lại sử dụng ứng dụng. Người dùng di động có thể tha hồ lựa chọn các ứng dụng  thích hợp cho lĩnh vực mà họ quan tâm và do đó họ sẽ tìm 1 ứng dụng hoàn thiện nhất, dễ dùng nhất, không bao giờ chịu bất kỳ lỗi nào khi đang sử dụng app.

### 1. 1 Hai yếu tố xác minh chính cần được thực hiện cho các ứng dụng di động là sự thân thiện với người dùng và sự hiển thị trên các mô hình và phiên bản hệ điều hành khác nhau.
![](https://images.viblo.asia/0a4594b3-b28c-46b6-b220-37d1e4bdc3a0.jpg)<br>
*Hiển thị giao diện người dùng trên các thiết bị có kích thước khác nhau*<br><br>
Ở các màn hình có kích thước khác nhau nhưng chúng ta luôn cần đảm bảo rằng ứng dụng hiển thị đầy đủ các item tương ứng như design. <br>
### 1.2 Thị phần các loại ứng dụng di động<br>

![](https://images.viblo.asia/4b84da10-b4d4-4d64-960f-3a0b28b2c243.jpg)
*Thị phần các loại ứng dụng di động*<br><br>
Từ biểu đồ trên, bạn có thể nhận ra rằng các ứng dụng chơi game chiếm phần lớn thị phần khoảng 24,43%, và sau đó là các ứng dụng kinh doanh và giáo dục.

* Các ứng dụng được phát triển dưới dạng ứng dụng chơi trò chơi cần được kiểm tra kỹ lưỡng ở mọi khía cạnh vì UI là người đóng góp lớn nhất để đạt được thành công cho dù đó là ứng dụng gốc ( Native app) hay ứng dụng lai( Hybrid app)
* Một ứng dụng kinh doanh có thể không hoàn toàn dựa vào UI để thành công vì trong hầu hết các trường hợp, đối tượng mục tiêu được hướng đến là để sử dụng đúng chức năng của ứng dụng. Do đó, các ứng dụng như vậy có thể có một giao diện người dùng đơn giản.
* Ứng dụng được phát triển cho mục đích giáo dục cần kiểm tra giao diện người dùng kỹ lưỡng.
Các ứng dụng thương mại như mua sắm, du lịch, v.v cũng cần kiểm tra giao diện người dùng hoàn chỉnh trên các thiết bị và các phiên bản hệ điều hành khác nhau.<br><br>
Nói tóm lại, tùy thuộc vào mục đích của ứng dụng, độ sâu của kiểm tra giao diện người dùng có thể được quyết định nhưng kiểm tra giao diện người dùng phải luôn được thực hiện trên ít nhất 3 phiên bản hệ điều hành khác nhau. Tuy nhiên, trong thực tế, các ứng dụng  di động chủ yếu được phát triển trên 2 hệ điều hành là Android và iOS. 
## 2. Nguyên tắc kiểm tra những gì trongkiểm thử giao diện người dùng trên ứng dụng di động
### 2.1 Độ phân giải màn hình

Sau đây là một số độ phân giải màn hình phổ biến được xem xét trong khi kiểm thử:

640 × 480<br>
800 × 600<br>
1024 × 768<br>
1280 × 800<br>
1366 × 768<br>
1400 × 900<br>
1680 × 1050<br><br>
Tất cả các độ phân giải này là bắt buộc kiểm thử khi bạn có bố cục nhiều cột trong ứng dụng của mình.

Do đó xác minh cần phải được thực hiện bắt đầu từ độ phân giải nhỏ nhất đến lớn nhất. Ngoài ra, nếu ứng dụng của bạn có một danh sách dài các item có thông tin thì chúng cũng cần được kiểm tra ở độ phân giải khác nhau.<br>

### 2.2 Kích thước màn hình
![](https://images.viblo.asia/56bd6116-0ce6-4e34-9dfc-96667109fd78.jpg)<br>
*Kích thước màn hình khác nhau*<br><br>
Có quá nhiều biến thể trong kích thước màn hình và độ phân giải có sẵn. Trong các thiết bị thông minh đặc biệt, kích thước các item điều khiển không tĩnh, chúng có liên quan đến kích thước màn hình có sẵn.

Trong khi kiểm thử, hãy đảm bảo rằng các kích thước điều khiển trông có vẻ thẩm mỹ và kiểm soát hoàn toàn hiển thị trên màn hình mà không cần cuộn. Kiểm tra GUI trên các thiết bị khác nhau với kích thước và độ phân giải màn hình khác nhau.

Trình giả lập tốt cho mục đích này nhưng không có gì phù hợp hơn cả với thiết bị thực. Vì vậy, hãy đảm bảo rằng bạn kiểm thử trên ít nhất hai hoặc ba thiết bị thực. Ngoài ra, đừng quên kiểm tra hướng dọc và hướng ngang nếu thiết bị hỗ trợ hoặc ứng dụng có yêu cầu. 

Bạn phải kiểm tra ứng dụng theo các độ phân giải thường được sử dụng để đảm bảo tính khả dụng của nó.<br>

**Sự khác biệt giữa kích thước màn hình và độ phân giải:** <br>
![](https://images.viblo.asia/0d9a1606-b309-4717-9dff-a033ac1c4e09.jpg)<br>
*Kích thước màn hình và độ phân giải của iphone*<br><br>
Kích thước màn hình là chiều dài của màn hình tính bằng inch được đo theo đường chéo hoặc từ góc này sang góc khác của màn hình. Độ phân giải màn hình là chiều rộng và chiều cao, Ví dụ 640w × 480h đại diện cho số pixel đi qua màn hình nhân với một số pixel đi xuống.

### 2.3 Các thành phần UI khác nhau
Các thành phần UI như buttons, headings, icons, images, selection fields, text fields, checkboxes, v.v... là một số yếu tố khác nhau cần được xác minh về hiển thị và kích thước của chúng trên màn hình.<br>

Quan trọng nhất là kiểm tra kỹ lưỡng kích thước item là bắt buộc vì trong trên điện thoại màn hình nhỏ như Galaxy S, iPhone 5, iPhone SE,... các button có thể quá nhỏ hoặc text dài có thể làm vỡ giao diện. 

Vị trí của các thành phần UI cũng cần được xác minh theo yêu cầu, nghĩa là tất cả đều được căn giữa hoặc căn trái, căn phải,...
![](https://images.viblo.asia/83f28d95-64ca-4874-a775-67fc146a8ceb.png)<br>
*Các thành phần UI khác nhau trên ứng dụng di động*<br><br>

### 2.4 Kiểu: Màu sắc và theme chủ thể của thiết bị
![](https://images.viblo.asia/c04eed55-6e61-45c0-b99c-3bc4a23aaf4b.png)<br>
*Theme for mobile*<br><br>
Giao diện người dùng và bảng màu ứng dụng phải phù hợp với các màu sắc và cách phối hợp chủ đề khác nhau của điện thoại. Màu sắc và theme của điện thoại Samsung rất khác so với điện thoại Nokia hoặc điện thoại MI .

Do đó, bạn cần xác minh xem ứng dụng có phù hợp với các điện thoại đó không. Giao diện nhất quán của ứng dụng sẽ giúp xây dựng mối quan hệ thân thiện giữa ứng dụng và người dùng.

Một trong những điều quan trọng nhất trong giao diện ứng dụng là phông chữ của các trang khác nhau. Phông chữ phải được kiểm tra tốt để tránh bất kỳ sự không nhất quán nào trong giao diện của ứng dụng.

Hầu hết thời gian, chúng ta chỉ tập trung vào văn bản có thể nhìn thấy trong các chức năng thông thường và bỏ qua văn bản xuất hiện trong các tình huống cụ thể. Message thông báo thành công và thất bại là một ví dụ về loại văn bản như vậy.

Một yếu tố quan trọng khác trong giao diện ứng dụng di động là mối quan hệ giữa màu phông chữ và tình huống hiển thị văn bản.
Ví dụ: 
* Màu đỏ được sử dụng cho thông báo lỗi. 
* Màu xanh lá cây thường thông báo thành công
* Màu vàng cho cảnh báo
* Màu xanh lam cho URL

### 2.5 Đa chạm hoặc một chạm

![](https://images.viblo.asia/d920d70c-86b1-4960-898e-4b8291201c5a.JPG)
Nếu ứng dụng của bạn hỗ trợ tính năng cảm ứng đa điểm như dùng nhiều ngón tay để zoom in/ zoom out , v.v., thì bạn cần kiểm tra kỹ tính năng này và tạo nhiều trường hợp thử nghiệm cho tất cả các màn hình áp dụng.<br>

Ngoài ra cũng cần kiểm thử thao tác bằng 1 tap hay multi tap. Có những incident, multi tap sẽ request nhiều lần lên server và tạo nhiều bản ghi giống nhau trong DB ảnh hưởng không nhỏ đến việc quản lý và truy vấn dữ liệu.

### 2.6 Bấm dài hay ngắn
Nhấn giữ 1 item và tap nhanh vào 1 item sẽ có những hiệu ứng khác nhau hoặc action khác nhau. <br>
Ví dụ các button thì chỉ cần tap 1 lần là có thể thực hiện chức năng của nó 
Các thao tác khác như copy/ Paste thì cần nhấn và giữ để thực hiện. 

### 2.7 Địa điểm
Địa điểm và vị trí là hai từ được sử dụng thay thế và điều thú vị là chúng được sử dụng nhiều hơn để truyền đạt hai khái niệm khác nhau được giải thích dưới đây:

1) Đôi khi, đó là khu vực trên màn hình nơi điều khiển xuất hiện.

Ví dụ: Tiêu đề được đặt trên  đầu trang, label được căn  trái và khung văn bản được căn phải, v.v ... Ở đây, 'trên cùng', 'bên trái được căn chỉnh' và 'Căn phải' là vị trí tương đối của các điều khiển.

2) Đôi khi đó là thứ tự kiểm soát trong số các điều khiển khác.

Ví dụ: Trong khi nhận thông tin cá nhân, Tên chính được đặt sau họ tên.

Trong khi kiểm tra vị trí và vị trí của các điều khiển, hãy đảm bảo rằng mọi thứ được đặt một cách hợp lý trên màn hình và cho thấy cảm giác thẩm mỹ tốt.

Có những tình huống một hoặc nhiều điều khiển xuất hiện trên nhiều màn hình. Trong tình huống này, bạn phải đảm bảo rằng chúng xuất hiện ở cùng một vị trí và theo cùng một thứ tự tương đối trên tất cả các trang.

## 3. Danh sách các khía cạnh cần kiểm tra cho giao diện ứng dụng di động
Dưới đây là danh sách kiểm tra dành cho người kiểm tra để đảm bảo GUI được kiểm tra hoàn toàn tốt trên các thiết bị thông minh:
Kiểm tra sơ đồ màu tổng thể và chủ đề của ứng dụng trên thiết bị.<br>
✅	Kiểm tra kiểu dáng và màu sắc của các biểu tượng.<br>
✅	Kiểm tra giao diện của nội dung app trên nhiều thiết bị và điều kiện mạng.<br>
✅	Kiểm tra bố cục nhiều cột - kiểm tra xem các cột có được căn chỉnh chính xác và có thể xem được ngay cả ở độ phân giải thấp hơn không.<br>
✅	Kiểm tra nếu các chỉ số tiến trình được hiển thị khi các trang đang tải.<br>
✅	Kiểm tra các Menu và cách chúng được gọi.<br>
✅	Kiểm tra các mục có trong Menu.<br>
✅	Định hướng màn hình được kiểm thử ở cả chế độ dọc và ngang.<br>
✅	Kiểm tra việc sử dụng bàn phím ảo trong khi thay đổi chế độ màn hình.<br>
✅	Kiểm tra hiệu ứng pinch-to-zoom thông qua màn hình cảm ứng và bị xoay - các item không bị bóp méo khi thu phóng.<br>
✅	Kiểm tra hiệu ứng khi cuộn/ trượt<br>
✅	Kiểm tra độ nhạy của các nút - phải có thể nhấp bằng bất kỳ loại cảm ứng nào (một đầu ngón tay hoặc bút chỉ).<br>
✅	Bàn phím ảo sẽ tự động mở khi người dùng muốn nhập văn bản vào bất kỳ trường văn bản nào hoặc có thể ẩn đi khi tap ra ngoài vùng bàn phím ảo.<br>
✅	Kiểm tra xem ứng dụng có được tích hợp tốt với các phím cứng di động hay không, nút home, menu, nút quay lại.<br>
✅	Kiểm tra xem điều hướng và cuộn trang có hoạt động tốt thông qua trackball không.<br>
✅	Kiểm tra khả năng phản hồi tổng thể của ứng dụng trên thiết bị.<br>

**Mẹo**<br>
Trước khi bắt đầu kiểm tra giao diện người dùng, hãy tìm hiểu kiến thức về luồng hoạt động và chức năng của ứng dụng sẽ được kiểm tra. Và ghi nhớ các chức năng này trong khi thực hiện kiểm thử.

## Phần Kết Luận
GUI xấu là một trải nghiệm khó chịu cho người dùng. Việc kiểm tra GUI rất được khuyến khích và đặc biệt quan trọng khi nói đến các thiết bị thông minh vì ở đây kích thước màn hình tương đối nhỏ và rất nhiều biến thể của các thiết bị có sẵn trên thị trường.

Ứng dụng của bạn có thể trông và hoạt động khác nhau trên các thiết bị khác nhau. Vì vậy, điều quan trọng là phải kiểm tra ứng dụng trên ít nhất một số kích thước và biến thể tiêu chuẩn của thiết bị.

Tất cả các ứng dụng di động đều cần kiểm tra giao diện người dùng nhưng độ sâu của kiểm tra cần thiết được xác định bởi danh mục hoặc mục đích của ứng dụng. Bạn nên phân tích đầy đủ các tính năng UI của ứng dụng dựa trên các phiên bản mô hình hoặc hệ điều hành của điện thoại trước khi bạn  bắt đầu việc kiểm thử

Hãy để mắt trong khi kiểm tra giao diện người dùng vì nó đơn giản nhưng lại có ảnh hưởng lớn đến hiệu quả kinh doaanh của ứng dụng.
## Tham  khảo
https://www.softwaretestinghelp.com/ios-android-ui-testing/
https://www.softwaretestinghelp.com/why-mobile-testing-is-tough/
https://www.tutorialspoint.com/mobile_testing/mobile_testing_ui.htm