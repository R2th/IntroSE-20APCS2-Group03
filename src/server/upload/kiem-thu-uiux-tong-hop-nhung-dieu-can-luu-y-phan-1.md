Khi thực hiện kiểm thử phần mềm, bên cạnh việc đảm bảo sản phẩm vận hành đúng chức năng, đúng yêu cầu ra thì việc kiểm tra UI/UX cũng có vai trò hết sức quan trọng. Hãy cùng tìm hiểu 1 số điểm cần lưu ý trong kiểm thử UI/UX


# Khả năng tiếp cận - Accessibility

![](https://images.viblo.asia/06c44172-b133-4948-816b-6f64f8c8a294.png)

Một trong những điểm quan trọng cần lưu ý trong kiểm thử UX là Khả năng tiếp cận (Accessability). Với những người có nhu cầu đặc biệt (thông thường là những người khuyết tật) thì mức độ "có thể sử dụng được" trang web của bạn là thế nào? Bạn đã bao giờ nghĩ về khía cạnh này chưa?

* Kiểm tra từng tùy chọn trợ năng/tiếp cận

* Tìm hiểu về các tiêu chuẩn liên quan đến Khả năng tiếp cận/truy cập
 
* Lên danh sách các trường hợp  mà các công ty bị kiện và phải trả rất nhiều tiền bồi thường. Việc này giúp ích trong công tác thông tin tuyên truyền về bug, đặc biệt nếu một trong những đối thủ cạnh tranh của bạn nằm trong danh sách này

* Tìm hiểu về các công cụ khác nhau có sẵn để kiểm tra từng tùy chọn đó

* Quan sát những người có nhu cầu đặc biệt sử dụng phần mềm của bạn. Nếu không có ai gặp khó khăn trong việc tiếp cận hay đưa nó vào trong kế hoạch phát triển dự án của bạn
* Tìm một chuyên gia trong lĩnh vực này để xin chia sẻ kinh nghiệm họ đã test sản phẩm của họ như thế nào. Bạn sẽ không hề muốn mắc phải những lỗi thông thường.

*Tham khảo:*

http://www.w3.org/standards/webdesign/accessibility
http://www.globalaccessibilityawarenessday.org/participate.html
<br>
<br>

# Color Blindness

![](https://images.viblo.asia/fa85c490-eab6-491c-8636-da4739ae81eb.png)

Nhiều người không nhận ra rằng mình bị mù màu. Đây cũng là một trong số những phạm trù dễ gây ngộ nhận và cần được thực hiện kiểm thử. 
* Bài test này không những có thể test sản phẩm mà còn là bài test cho cả đội dự án :)
* Hiểu được khái niệm đằng sau "color blindness"
* Chuẩn bị sẵn dữ liệu để có thể test nhiều kiểu mù màu khác nhau
* Đây cũng là một phần của việc kiểm thử tiếp cận

*Tham khảo:*

http://www.color-blindness.com/wp-content/images/Color-Blind-Essentials.pdf

http://www.color-blindness.com/coblis-color-blindness-simulator/

http://vischeck.com/
<br>
<br>
# Độ tương phản - Contrast
![](https://images.viblo.asia/9f0261af-af56-4d21-9e71-8bac2921f28f.png)

Như bạn có thể thấy trên hình ảnh phía trên, rất dễ dàng để có thể phân biệt giữa độ tương phản tốt và không tốt. Điều cần lưu ý ở đây là sự kết hợp giữa khía cạnh color blindness và độ tương phản. 
* Bạn không nên test độ tương phản bằng cái nhìn chủ quan
* Hãy tìm kiếm những tiêu chuẩn và hướng dẫn liên quan đến sự khác biệt về tương phản
* Hiểu những khái niệm căn bản về màu sắc như màu/ánh sắc (hue), độ bão hòa (saturation), cường độ (intensity) và độ sáng (brightness) 
* Tìm kiếm tham khảo những design tốt và tìm hiểu tại sao những design đó lại tốt.
* Hãy đưa các thông tin tham khảo thế nào là độ tương phản tốt/không tốt vào trong bug report của bạn

# Auto Focus
![](https://images.viblo.asia/a25e625a-ed6b-4a61-81fd-3566ff0dc9c5.png)

Đây là một bug dễ thấy và cũng dễ bị bỏ qua. Khi bạn load thành công một trang có biểu mẫu (form) hoặc trường cho nhập dữ liệu, trường đầu tiên phải có con trỏ nhấp nháy ở đó (blinking cursor). Người dùng sẽ không cần phải bấm chọn vào trường mới có thể bắt đầu nhập dữ liệu.
* Không phải website nào cũng có tính năng này. Kiểm tra xem trường đầu tiên có phải trường nhập dữ liệu không. Đôi khi, trường đầu tiên có thể là trường tìm kiếm ở đầu trang. 
* Kiểm tra cài đặt ["Caret browsing"](https://en.wikipedia.org/wiki/Caret_navigation) đã được bật chưa
* Kiểm tra xem trường nào được focus mặc định bằng cách sử dụng phím Tab và tổ hợp phím Shift+Tab
* Thử refresh/reload lại trang và kiểm tra xem con trỏ có còn focus và trường đầu tiên không
<br>
<br>
# Nút Back
![](https://images.viblo.asia/208aa3f5-e06d-48f3-b844-162d409c1027.png)
Việc test nút back rất quan trọng. Khi bạn log in thành công, hãy thử bấm Back và quan sát hiện tượng và thực hiện lại thao tác sau khi bạn log out
* Nếu bạn đang thực hiện kịch bản test theo workflow thì việc bấm back sẽ gây ra hiện tượng gì?
* Người dùng có thể điều hướng về những trang trước đó và quay lại bằng các button Back và Forward không?

*Tham khảo:*

http://www.usabilitysciences.com/from-the-usability-lab-front-back-me-up
<br>
<br>
# Cân đối giao diện trang - Balanced Page
![](https://images.viblo.asia/c7148beb-57bb-45e5-942d-d082fd2921fe.png)

Một trong số những lí do của việc sử dung thanh cuốn scrollbar vô tội vạ là do sự thiếu cân bằng trong thiết kế, kích cỡ của các đối tượng trong một trang. 
* Như có thể thấy trong hình ảnh trên, hãy kiểm tra xem các phần tử đã được bài trí đồng đều hai bên trục tung và hoành chưa
* Ấn tượng đầu tiên của bạn khi quan sát các phần tử trên 1 trang là gì?
* Màu cũng đóng vai trò quan trọng với những đoạn văn bản được sử dụng trên trang
* Website của bạn có theo một quy tắc nào về sự cân đối không hay các phần tử được đặt vào một cách ngẫu nhiên?
* Một tip có thể được áp dụng để kiểm tra sự cân đối đó làm phóng to cho tới khi những khoảng trắng trở nên rõ ràng và các phần tử bị đè lên nhau. Việc làm này cũng giúp ta biết được những phần tử này được sắp xếp như thế nào. 
<br>
<br>
# Trạng thái của các nút - Button State
![](https://images.viblo.asia/01cf424d-88f0-4d1c-a7b7-aa200f92177c.png)

Khi button được focus thì trạng thái hiển thị của nó có thay đổi không? Quan điểm test này không chỉ giới hạn ở button mà còn có thế áp dụng với trường hợp là liên kết hoặc các trường nhập. Có thế thấy rõ ràng trong hình ảnh minh họa trên đây, buttton "Sign in" được focus.
* Kiểm tra xem nếu nhấn Enter hay Space trên bàn phím thì trạng thái của button có thay đổi tương đương với việc nhấp chuột vào button không.
* Nếu con trỏ đang ở button thì khi nhấn Tab trên bàn phím, focus sẽ được chuyển sang phần tử tiếp theo (phần tử đó có thế bấm vào hoặc có thế edit được)
* Khi di chuột qua button thì trạng thái button cũng nên thay đổi (tương tự đối với hành động di chuột qua liên kết)
<br>
<br>

# Tooltips
![](https://images.viblo.asia/a2a757a6-a24b-4979-8b55-76c87995b244.png)

Tính năng này khá dễ phát triển, có khả năng cung cấp thêm thông tin cho người dùng nhưng thường bị các lập trình viên bỏ sót. 
* Kiếm tra sự ổn định, nhất quán về hiển thị của tooltips
* Tooltip chỉ hiển thị cho 1 số người dùng này nhưng lại không hiển thị cho 1 số người dùng khác
* Thông tin hiển thị trong tooltips có chính xác không. Không có gì có thế "gây bối rối" hơn việc hiển thị tooltip mà nội dung không liên quan tới phần tử nó đi cùng.
* Kiểm tra xem nội dung của tooltip có thực sự giúp ích cho người dùng không. Không ai cần tooltip hiển thị nội dung giống hệt phần tử chẳng hạn.
* Ngoài ra trong tình huống thực tế bản thân tôi đã gặp bug liên quan tới việc hiển thị tooltip khiến cho layout màn hình bị co dãn ngoài ý muốn gây ảnh hưởng tới hiển thị của các phần tử xung quanh
<br>
<br>
# Block Flash
![](https://images.viblo.asia/9bef3529-33cc-4226-9c15-489a84630db0.png)

Không phải người dùng nào cũng luôn bật Flash. Một số người còn thậm chí không cài phần mềm này. Nếu phần mềm của bạn sử dụng Flash và phải phụ thuộc vào plug-in này thì sao?
* Hãy test khi bật và tắt Flash
* Nếu plug-in là bắt buộc thì người dùng có được cảnh báo trước không? Người dùng có được hướng dẫn để bật Flash lên không
* Nếu plug-in bị tắt thì có hiển thị thông báo lỗi không
* Bạn có biết các cách khác nhau để kiểm tra xem plug-in có được bật hay không không?
* Bạn có biết website nào có thế dùng để kiểm tra nội dung Flash có được biểu diễn (render) đúng hay không không?  
* Kiểm tra xem nội dung Flash trong phần mềm bạn đang test có bị phụ thuộc vào 1 phiên bản cụ thế nào đó của Flash không

<br>
<br>

# Block hình ảnh
![](https://images.viblo.asia/0a2eb00e-514f-4e57-93c8-f3ef83f61e0b.png)

Một số người dùng tắt tính năng tải hình ảnh khi tải trang để tiết kiệm dữ liệu mạng. Họ có thế sẽ thiết đặt ngoại lệ cho 1 số website
* Website của bạn có nhiều hình ảnh không? Có hình ảnh nào nên được bỏ đi không?
* Thử chặn tải hình ảnh trong mục Cài đặt trình duyệt và tải trang web
* Thử chặn tải hình ảnh nhưng cho website của bạn vào danh sách ngoại lệ và quan sát hiển thị khi tải trang
* Kết hợp việc test này với việc test [Alt-text](https://www.w3schools.com/tags/att_img_alt.asp) cho hình ảnh 
* Bạn có thể dùng addon "DownloadThemAll" để tải toàn bộ hình ảnh trên trang kết hợp với việc kiểm tra thanh trạng thái mở rộng của trình duyệt để kiểm tra tổng số hình ảnh trên website
<br>
<br>

# Block JavaScript
![](https://images.viblo.asia/a8f0663a-e7e7-4039-867e-4e6f80281fe9.png)

Có nhiều trang web phụ thuộc vào JavaScript nên việc test khi chặn JavaScript cũng là một cách thực hiện kiểm thử
* Hãy cài mới một trình duyện và kiểm tra Cài đặt của nó xem JavaScript được mặc định là cho phép hay chặn. 
* Làm thế nào để kiểm tra xem JavaScript có được bật trên trình duyệt bạn đang sử dụng không? Có thông báo tới người dùng nếu họ cần phải bật JavaScript để có thể sử dụng được trang web không?
* Bạn cũng có thế thực hiện thêm website của mình vào danh sách ngoại lệ và kiểm tra hiển thị sau đó? Bạn có biết trang web hay công cụ nào giúp phát hiện các vấn đề liên quan tới JavaScript trên 1 trang web không?
<br>
<br>

# Block Popups
![](https://images.viblo.asia/9ab2bd9e-ede0-44b9-83de-88ab0fd67ee8.png)

Bạn có bao giờ bắt gặp một biểu tượng dấu nhân màu đỏ trên thanh địa chỉ ở một số trang web không? Bạn có thấy khó chịu khi một số trang web mở ra popups mà không thông báo hoặc hỏi bạn có muốn hiển thị popups hay không không?
* Đặt câu hỏi trang web của bạn có mở ra popups bất thình lình không? Liệu popups có phải là phương tiện hiển thị thông tin và cách thức xử lý duy nhất? Nếu người dùng cài đặt chặn popups trước đó thì sao?
* Giống như trường hợp với hình ảnh và JavaScript, hãy thử thêm trang web đang test vào ngoại lệ và thực hiện kiểm tra
* Kiểm tra xem có thông báo để người dùng biết họ cần cho phép thì popups mới hiển thị không?
* Kiểm tra xem khi popups mở ra thì có thế đóng lại dễ dàng không hay có bị tràn ra ngoài độ rộng màn hình không
<br>
<br>

# Tab Order
![](https://images.viblo.asia/8de7be8d-c6dc-4d9c-a4d2-97ead95bf416.png)

Như bạn có thế thấy trong hình ảnh, nhiều trang web có rất rất nhiều phần tử trên trang. Nếu bạn là người chỉ quen dùng bàn phím thì việc có thế sử dụng phím Tab để di chuyển qua lại giữa các Tab là hết sức quan trọng. 
* Đảm bảo website của bạn được kiếm thử điều hướng giữa các trường bằng phím Tab hoặc tổ hợp phím Shift+Tab
* Tính năng này không chỉ giới hạn ở các trường nhập dữ liệu mà còn áp dụng cả trên các labels hay bất cứ phần tử nào năm giữa cái trường nhập dữ liệu.
* Khi bấm Shift+Tab thì focus sẽ đi ngược chiều lại so với khi bấm Tab
* Việc điều hướng focus bằng cách bấm tab không được dừng ở phần tử cuối cùng mà nên đi theo vòng tròn lặp đi lặp lại qua tất cả các trường.
<br>
<br>

# Pre-canned Text
![](https://images.viblo.asia/f6e9a9a5-3437-46d1-9654-26ca5813a8d9.png)

Không ai muốn mắc lỗi và người dùng sẽ thích những trang web ngăn không cho người dùng mắc lỗi. Một cách hay để hạn chế việc mắc lỗi là cho người dùng biết họ cần điền những thông tin gì và thao tác thế nào.
* Bằng cách cung cấp các đoạn văn bản mẫu hoặc gợi ý ta có thế cho người dùng biết định dạng của loại văn bản được cho là hợp lệ 
* Với những trường như Ngày tháng năm sinh hay ngày tháng nói chung sẽ có nhiều cách để điền. Tốt hơn hết là nên cung cấp thông tin về định dạng ta đang mong muốn.
* Cần check trên nhiều trình duyệt, nhiều phiên bản trình duyệt. Đôi khi những phần pre-canned text này có thế sẽ không hiển thị hoặc hiển thị tràn ra ngoài hoặc nhiều khi là khi bấm vào rồi bấm ra ngoài sẽ không thấy hiển thị nữa.
<br>
<br>
<br>

***Trên đây là nội dung chi tiết phần I của bài viết. Mời các bạn xem tiếp phần nội dung còn lại vào các phần tiếp theo. Ngoài ra bạn cũng có thế tham khảo nội dung tổng quan được thể hiện dưới dạng mindmap trong hình ảnh dưới đây***

![](https://images.viblo.asia/a49f0554-85ed-43fd-a400-1b26f902f2bc.png)


*Nguồn:*

*https://enjoytesting.files.wordpress.com/2013/10/ui_and_ux_testing_ready_reckoner.pdf*

*http://apps.testinsane.com/mindmaps/uploads/UI-UX-Testing-Ready-Reckoner.png*

*https://en.wikipedia.org/wiki/Caret_navigation*