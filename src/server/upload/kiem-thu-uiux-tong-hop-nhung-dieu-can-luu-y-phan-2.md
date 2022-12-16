Tiếp nối phần 1 của bài viết, phần 2 này sẽ đề cập thêm một số mục đáng lưu ý nữa khi thực hiện kiểm thử UI/UX cùng với một vài công cụ, add-on hỗ trợ cho việc kiểm thử.

# Breadcrumbs
![](https://images.viblo.asia/7246e9ce-4962-4a11-8948-86ba5682d534.png)

Breadcrumbs cho phép người dùng nhận biết được vị trí hiện tại của họ trong trang web họ đang dùng. Bên cạnh đó, việc sử dụng breadcrumbs còn nhằm mục đích nhanh chóng điều hướng giữa các đường dẫn khác nhau.  Nếu không có breadcrumbs, việc điều hướng trong trang web sẽ rất khó khăn, bất tiện cho người dùng và tốn thời gian. Đôi khi có thể khiến cho người dùng bối rối, đi tới cùng một màn hình nhiều lần và không thể tìm ra trang mà mình đang muốn tới. 

* Kiểm tra xem breadcrumbs được hiển thị như thế nào - một phần đoạn text thôi hay toàn bộ đường dẫn hoàn chỉnh
* Breadcrumbs text có mở rộng ra khi click vào không? Nếu có nhiều đường dẫn thì chỉ có đường dẫn đầu tiên và cuối cùng được hiển thị đầy đủ còn những đường dẫn còn lại ở trung gian sẽ được hiển thị thay thế bằng "...". Vậy khi click vào "..." (ellipsis- dấu chấm lửng) thì phần text được thay thế bằng chấm lửng có mở rộng ra và hiển thị đầy đủ không?
* Khi click vào các đường dẫn trên breadcrumbs có đi tới đúng trang không?
* Việc sử dụng breadcrumbs có giúp người dùng tiết kiệm thời gian không? Có thuận tiện hơn không?

# Color Cop
![](https://images.viblo.asia/6815ebd2-1c10-435f-9a7b-c78c7a67243e.png)
Một công cụ tuyệt vời để tìm kiếm giá trị màu sắc của bất kì phần tử (element) nào trên một trang web. Ví dụ, làm thế nào để chắc chắn rằng logo được sử dụng ở tất cả các màn hình/trang trên cùng một website là giống nhau (về màu sắc)?

* Sử dụng công cụ này để kiểm tra tất cả các phần tử chính và nắm được những attributes của chúng
* Các phần tử có được sử dụng nhất quán trên các trang khác nhau không?
* Có bằng chứng trực quan nhất rằng các phần tử này là giống nhau


# Dấu chấm lửng (Ellipsis)
![](https://images.viblo.asia/418f483f-843c-4bf9-88ab-03e04e63221c.png)

Hầu hết tất cả các vị trí, kích cỡ mỗi phần tử trong trang web đều được giới hạn trước, bao gồm ở những đoạn văn bản tĩnh. Vì thể mà người ta sử dụng các dấu chấm lửng để hiển thị thay thế, với dụng ý báo hiệu vẫn còn một phần nội dung khác chưa được hiển thị hết ở đây.
* Như có thể thấy trong ảnh chụp màn hình phía trên, khi đoạn text vượt quá độ dài cho phép, ở cuối sẽ có dấu chấm lửng "..."
* Khi di chuột qua những vị trí có dấu chấm lửng thế này bạn có thấy hiển thị tooltip không?
* Nội dung của tooltip có tương ứng, trùng khớp với phần được ẩn trong dấu "..." không?
* Thu nhỏ cửa sổ trình duyệt và kiểm tra xem các phần tử có bị cắt ngắn, hiển thị thiếu không
* Phần văn bản không bị ẩn bằng dấu "..." có đủ khoảng trắng giữa các phần tử được phân tách bởi dấu "..." không?

# Thanh trạng thái mở rộng (Extended Status Bar)
![](https://images.viblo.asia/4ecd7166-9ce6-4c71-b6b0-3942241461ea.png)
Một trong số những add-on có nhiều công dụng nhất đó là thanh trạng thái mở rộng.
* Add on này được tích hợp sẵn trên Firefox. Hỗ trợ test nhanh/ cơ bản tốc độ tải trang, giúp nhận biết sự khác nhau về tốc độ tải giữa các trang. 
* Các thông tin có thể có được đó là: số lượng hình ảnh, thời gian để load toàn bộ trang đó, tốc độ load. Bạn cũng có thể kiểm tra tốc độ đường truyền tại www.speedtest.net
* Kết hợp việc kiểm thử này với kiểm thử blocking elements như hình ảnh/ JavaScript / Popups
* Kiểm thử với nhiều tốc độ khác nhau, trên nhiều phiên bản trình duyệt và sản phẩm

# Favicon
![](https://images.viblo.asia/f151d9cd-6be4-4537-ab41-225f2bd954e8.png)

Một số người dùng có thói quen mở rất nhiều tab cùng một lúc, khoảng trên 15 tabs chẳng hạn. Khi phải thao tác làm việc với nhiều tab mở cùng lúc như vậy, việc sử dụng favicon trở nên vô cùng hữu ích. Cáchduy nhất giúp bạn nhận biết tab nào là tab bạn đang tìm kiếm và muốn mở trong hoàn cảnh này đó là nhìn vào các favicon của chúng.
* Trang web của bạn có favicon không? Favicon có sử dụng hình ảnh thống nhất với logo của trang web không? 
* Khi di chuột qua favicon, có đoạn text nào hiện ra không?
* Khi bạn ghim (pin) tab trên trình duyệt thì favicon còn hiển thị không?
* Khi đánh dấu (bookmark) trang thì favicon có hiển thị trên thanh dấu trang không?
* Khi mở thêm/ đóng bớt tab thì favicon có hiển thị ổn định không?
* Kết hợp với kiểm thử View source và kiểm tra xem việc đó có cho phép bạn tìm ra đường dẫn tới thư mục gốc lưu trữ toàn bộ ảnh của trang web không.

# SupportDetails.com
![](https://images.viblo.asia/f890f850-eb3d-48fc-ab16-4c995285a477.png)

Khi tạo báo cáo bug, một việc cần làm đó là nêu rõ thông số cụ thể về môi trường xảy ra bug. Trang web www.supportdetails.com cung cấp đầy đủ các thông tin liên quan trên một trang. Công cụ này cũng được sử dụng để tìm ra những sự khác biệt giữa các môi trường khác nhau. Bên cạnh đó bạn còn có thể trích xuất những thông tin này ra dưới dạng CSV hoặc PDF cũng như gửi các thông tin này qua email.

# Font
![](https://images.viblo.asia/a01125c9-9415-4918-973c-81abfbb3c19c.png)
Làm thế nào để có thể nhận ra sự khác biệt về font chữ và kích cỡ kí tự trên một trang web. Một cách để thực hiện việc này là dùng tính năng Kiểm tra phần tử (Inspect Element) và kiểm tra các thuộc tính (attribute) của phần tử.
* Nếu bạn cảm thấy không thuận tiện khi sử dụng Inspect element, bạn có thể sử dụng extension WhatFont trên Chrome
* Việc sử dụng font thiếu tính nhất quán có thể khiến cho độ tin cậy của trang web giảm đi đáng kể
* Bạn có biết trang web của bạn sử dụng font nào không? Kích cỡ font đó là bao nhiêu?
* Bạn nên có một chút hiểu biết căn bản về  [typography](http://www.uplevo.com/designbox/nhung-gi-ban-can-biet-ve-typography) ví dụ như serif, [font family](http://designs.vn/tin-tuc/typeface-la-gi-_13126.html#.W_P4QjgzbIU), [width, leading, tracking và kerning](http://www.uplevo.com/designbox/nhung-gi-ban-can-biet-ve-typography)


# Ngôn ngữ
![](https://images.viblo.asia/ce65d968-30b3-492e-8095-dfdfe4afaf2c.png)
Bạn đã thực hiện kiểm thử Internationalization Testing để đảm bảo các chức năng của sản phẩm không bị ảnh hưởng và mọi thứ vẫn vận hành trơn tru khi được sử dụng trong các ngôn ngữ khác nhau chưa? Việc kiểm thử này khác với localization testing.
* Thay đổi ngôn ngữ cài đặt của trình duyệt và kiểm tra xem trang web của bạn có hỗ trợ không
* Thử cài đặt một ngôn ngữ là mặc định và kiểm tra xem có sự thiếu nhất quán nào trên trang web của bạn không
* Kiểm tra xem điều gì sẽ xảy ra khi bạn thêm hoặc gỡ các ngôn ngữ đi khi bạn đã cài đặt ngôn ngữ mặc định.

# GTMetrix.com
![](https://images.viblo.asia/c4789d0e-776f-40a8-81d8-fd9986d842cd.png)
Một công cụ khác được nhắc tới ở đây cho phép thực hiện test nhanh perfomance của trang web đó là GTMetrix.com.
* Sử dụng trang web này để tìm kiếm một bản báo cáo chi tiết về trang web đang là đối tượng kiểm thử hiệu năng. Bạn còn có thể tải xuống báo cáo chi tiết này miễn phí nữa.
* Công cụ này còn đưa ra một số gợi ý trong bản báo cáo về việc cải thiện hiệu năng của trang web
* Bạn thậm chí còn có thể kiểm tra hiệu năng của một số trang web đang là đối thủ cạnh tranh với trang web của bạn. Đây là những dữ liệu khá hữu ích trong quá trình điều tra và fix những vấn đề liên quan đến hiệu năng.

# Tamper Data
![](https://images.viblo.asia/1d0b3b82-be71-4dfd-b059-8e0d55223505.png)
Một add-on hay để nắm và hiểu được những request được gửi và nhận qua trình duyệt. Những dữ liệu này còn có thể được dùng để kiểm tra liệu những validation thuộc về phía server có đang hiện hữu trên các biểu mẫu form phía giao diện trang web không.
* Có thể sử dụng add-on này cho việc kiểm thử bảo mật, nhận biêt nhiều request cho cùng một hành động, gửi request từ máy khách lên máy chủ để lấy thông tin (server polling)
* Kiểm tra xem liệu những thông tin nhạy cảm có thể bị dễ dàng thay đổi chỉnh sửa, gây ra những thất thoát, thiệt hại cho công ty của bạn không
* Bạn cũng có thể kiểm tra cả phần encoding và nén dữ liệu (data compression)


# Measure It
![](https://images.viblo.asia/52a67110-bd22-4b94-af7e-e708f84bd2df.png)
Thêm một add-on nữa mang tên "Measure it", vô cùng hữu ích trong việc "vẽ" lên trang web những chiếc "thước kẻ" và nhận diện kích thước của bất kì một vùng nào trên trang web. Công cụ này cho phép bạn kiểm tra phần căn lề, sự cân bằng và thống nhất xuyên suốt cả trang web. 
* Bạn có thể chụp lại màn hình sau đó kiểm tra và ghi lại những tham số của các phần tử hoặc sử dụng công này để có được những thông số  đó nhanh gọn hơn.

# Thanh công cụ (Toolbars)
![](https://images.viblo.asia/5bea40a4-5221-40b3-9b95-d7d6ee186aa4.png)
Bức ảnh phía trên là một hình ảnh mình họa cho một số người dùng, những người thường xuyên bật tất cả các thanh công cụ lên và phàn nàn về sự hạn chế trong phần hiển thị trang web của bạn. Mặc dù những thông tin về độ phân giải màn hình hay kích cỡ màn hình có thể được nêu rõ trên trang web, để có được sự tương thích cao nhất nhưng người dùng thường không chú tâm hoặc mặc kệ và cứ thế mở thật nhiều thanh công cụ.
Vậy khi test chúng ta có thể:
* Bật tất cả các thanh công cụ có thể
* Cho thanh Tải xuống hiển thị đồng thời với thanh add-ons
* Kiểm tra xem trang web của bạn hiển thị ra sao với màn hình hạn chế như vậy. 

# Độ phân giải của màn hình
![](https://images.viblo.asia/ec551b47-8ac5-40bf-96b3-140ceefac9c8.png)

Nếu bạn đang thực hiện kiểm thử UI thì chắc chắn bạn sẽ phải thực hiện trên nhiều độ phân giải màn hình khác nhau và kiểm tra những ảnh hưởng của độ phân giải đối với việc hiển thị của các phần tử trên trang web của bạn. Bạn có thể dùng www.supportdetails.com để kiểm tra xem độ phân giải của màn hình hiện bạn đang dùng là bao nhiêu hoặc trang http://www.screen-resolution.com/ để kiếm thử trang web trên nhiều độ phân giải khác nhau.

* Xác định rõ những độ phân giải nào sẽ được hỗ trợ trước khi thực hiện test.
* Khi viết báo cáo bug cần nêu rõ độ phân giải nào bạn sử dụng để test. Bạn cũng nên thử phóng to/thu nhỏ màn hình để mô phỏng việc thay đổi độ phân giải này. 

<br>

*Tham khảo: http://www.w3schools.com/browsers/browsersdisplay.asp*

# Kích cỡ màn hình
![](https://images.viblo.asia/623eda2f-736b-48bf-b5e6-2649253313b4.png)

Các thiết bị khác nhau có thể có những kích cỡ màn hình khác nhau. Bạn có thể dùng trang http://screensiz.es/ để hiểu được sự khác nhau về kích cỡ căn cứ và nhiều tiêu chí khác nhau. Bao gồm hệ điều hành, loại device, model của device đó, thậm chí cả độ phổ biến của nó.

# Validation
![](https://images.viblo.asia/5c510101-a0ee-40ca-bf2b-68445e90632b.png)

Kiểm thử khả năng validate trong lúc người dùng đang nhập kí tự vào hoặc sau khi submit một form nào đó. 

* Như có thể thấy trong bức ảnh chụp màn hình, ngay lúc người dùng gõ kí tự vào trường Mật khẩu, phía dưới có một thông báo cho người dùng biết rằng Mật khẩu mà họ nhập vào là yếu, dễ bị phát hiện. Việc này cho phép người dùng lập tức nhận thức được độ mạnh của Mật khẩu và điều chỉnh lại mà không cần điền hết, gửi form và sau đó lại được nhận 1 thông báo rằng Mật khẩu của bạn yếu và bạn cần chọn 1 chuỗi kí tự khác.
Việc thực hiện validation ngay tức thì như vậy sẽ rất hữu ích khi bạn điền một biểu mẫu với nhiều trường cần nhập. Không ai muốn nhập đi nhập lại hàng loạt dữ liệu cả.

* Thực hiện test đối với nhiều trường khác nhau và trên nhiều trình duyệt. 

* Lưu ý tooltip gợi ý nội dung validation có thể bị đè lên bản thân trường đó. Lỗi này khiến cho việc quan sát nội dung đã nhập trở nên khó khăn. 

* Kiểm tra xem sau khi loại bỏ lỗi validation thì thông báo lỗi có mất đi luôn không hay phải thực hiện một thao tác nào khác. Ở một số trang web, khi bạn nhập 1 đoạn văn bản vượt số kí tự cho phép sẽ có thông báo lỗi. Nhưng khi bạn xóa bớt đi đến giới hạn cho phép rồi thì thông báo lại vẫn còn ở đó. Chỉ khi bạn click chuột ra ngoài ô nhập đó hoặc trỏ vào một trường khác, thông báo mới mất đi. Hiện tượng này dễ gây bối rối cho người dùng.

* Kết hợp test cùng với những quan điểm test liên quan tới pre-canned và autofocus.

# Hiệu ứng cho button
![](https://images.viblo.asia/cce3b442-edff-4d04-b72e-730fe86ed523.png)
Làm thế nào để bạn biết liệu bạn đã click vào một button hay chưa? Bạn đã click bao nhiêu lần?
* Nên báo hiệu cho người dùng biết trạng thái của một button khi nó được click vào. Khi click vào button thường thì trạng thái của nó sẽ thay đổi
* Một ví dụ về việc thay đổi trạng thái thường gặp đối với dạng button đó là nó sẽ được highlight hoặc được đổi màu, chìm xuống hay thậm chí là thay đổi luôn phần text trên button. Ở một vài ứng dụng sẽ xuất hiện màn hình hoặc biểu tượng loading. Tất cả đều để báo cho người dùng biết về sự thay đổi trạng thái và để họ biết rằng button đã được click rồi và họ không nên/không thể click thêm nữa.

# Chế độ ẩn danh (Incognito Mode)
![](https://images.viblo.asia/fe5d2337-bfac-4010-bf51-4848708f2e33.png)

Là một tester chúng ta có thể sẽ phải đăng nhập bằng nhiều tài khoản khác nhau trên cùng một trình duyệt khi thực hiện test một chức năng nào đó. Bạn có đăng xuất mỗi lần và đăng nhập lại mỗi lần muốn chuyển sang tài khoản khác không? Chắc là không vì chúng ta đã có một tính năng để đáp ứng nhu cầu và gạt bỏ hạn chế này, đó là chế độ ẩn danh.
* Kiểm thử với nhiều tài khoản khác nhau trên cùng một trình duyệt sử dụng chế độ ẩn danh
* Một số người dùng có thói quen và thường xuyên sử dụng chế độ ẩn danh này. Trang web của bạn vận hành ra sao ở chế độ này? Mọi chức năng có được đảm bảo không?
* Kết hợp quan điểm test này với quan điểm test extension. Một số extension có thể sẽ bị chặn và không sử dụng được hoặc có thể cài đặt để cho phép hoặc không cho phép sử dụng ở chế độ ẩn danh.

# Nhớ mật khẩu
![](https://images.viblo.asia/7ddded93-9b7c-4408-bfba-4980add55129.png)

Chắc hẳn đây không phải lần đầu bạn nhìn thấy popup này nhưng liệu bạn đã hiểu được hết tầm quan trọng của nó hay chưa.

* Mỗi lần bạn nhập mật khẩu, popup này có xuất hiện không? Màn hình nơi bạn nhập mật khẩu có ảnh hưởng gì không?
* Điều gì sẽ xảy ra sau khi bạn click Nhớ mật khẩu? Bạn có thể thêm cài đặt bỏ qua không bao giờ lưu đối với một số trang web không? 
* Liệu đây có phải là một mối đe dọa, lỗ hổng về bảo mật đối với ứng dụng của bạn không?
* Bạn có thể xóa/ loại bỏ/thay đổi thiết đặt về nhớ mật khẩu đối với trang web bạn đã ghi nhớ mật khẩu không? Việc thay đổi có hiệu lực ngay lập tức không?
<br>
<br>
Trên đây là nội dung chi tiết phần II của bài viết. Mời các bạn xem tiếp phần nội dung còn lại vào các phần tiếp theo. Ngoài ra bạn cũng có thế tham khảo nội dung tổng quan được thể hiện dưới dạng mindmap trong hình ảnh dưới đây

![](https://images.viblo.asia/a49f0554-85ed-43fd-a400-1b26f902f2bc.png)

Nguồn:

https://enjoytesting.files.wordpress.com/2013/10/ui_and_ux_testing_ready_reckoner.pdf

http://apps.testinsane.com/mindmaps/uploads/UI-UX-Testing-Ready-Reckoner.png