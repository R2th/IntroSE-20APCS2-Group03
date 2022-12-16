**Mobile Testing là một lĩnh vực thực sự thách thức. Vì sao lại vậy?<br>**

Trong khi tìm kiếm các ứng dụng / game về giáo dục cho trẻ mới biết đi, tôi đã tìm thấy một trò chơi mà một đứa trẻ có thể thực hiện nhiều thao tác khác nhau trên các phương tiện như rửa xe, lau chùi, vẽ tranh, xăm hình (phương tiện cũng có thể có hình xăm!) Và cả cái cách nó được thực hiện, tôi rất thích nó<br>

Tôi đã ngay lập tức tải xuống phiên bản trả phí và để cho con tôi chơi với hy vọng rằng tôi sẽ rảnh rang để làm việc 15-20 phút tiếp theo trong khi con tôi đang bận rộn trang trí cho phương tiện.<br>

![](https://images.viblo.asia/8cd2aebf-403b-47e7-98ec-7807d7275bd7.jpg)<br>

Con tôi tỏ ra hào hứng chấp nhận và bắt đầu khám phá (vì trẻ em chưa biết về các kịch bản kiểm thử). Nhưng trong vòng 5 phút tiếp theo, cậu bé quay lại phàn nàn - Nó không hoạt động nữa rồi, mẹ làm nó chạy lại cho con đi.<br>

Tôi thấy một cửa sổ bật lên: "Thật không may, hiện tại XYZ đã ngừng hoạt động." Tôi nhấn nút OK, khởi động lại và đưa nó cho con trai tôi. Trong vòng hai phút, hiện tượng trên lại lặp lại. Nó đã từng rất thú vị. Luôn luôn mang theo suy nghĩ của một người kiểm thử phần mềm, tôi bắt đầu điều tra.<br>

Tôi hỏi con tôi đã làm gì. (Làm thế nào con gặp vấn đề này?)<br>

Không làm gì cả, con chỉ chơi thôi - con tôi nói.<br>

Tôi đọc lại câu hỏi - con đã chơi trò chơi như thế nào, con có thể chỉ lại cho mẹ không? (Con có thể giúp mẹ tái hiện lại không?)<br>

Con tôi bắt đầu chơi và tôi xem. Nó vẫn hoạt động tốt và tôi đã thiếu kiên nhẫn. Tôi định chuyển qua làm việc nhưng tôi nghe thấy lời phàn nàn. Con tôi nói rằng không thích chơi game đó nữa vì nó đã dừng quá nhiều lần.<br>

![](https://images.viblo.asia/d1b74700-b220-4028-a339-ea5721938179.jpg)<br>

Lúc đó máu tester trong người tôi trỗi dậy, tôi ngồi xuống ghế và bắt đầu chơi thử xem sao. Nó hoạt động rất ổn trong vòng 10 phút đầu tiên và tôi không thấy bất kỳ lỗi dừng hoạt động nào. Tôi đã kiểm tra bằng cách chạm đa điểm, bật / tắt kết nối dữ liệu, bật / tắt GPS, chế độ dọc / ngang, bật / tắt nguồn nhưng thực sự không lỗi nào xảy ra. Mệt mỏi và thất vọng, tôi bảo con mình chơi lại vì tôi rất tò mò tại sao game này lại bị dừng lại nhiều lần như thế.<br>

Một vòng chơi nữa bắt đầu. Con tôi chọn một chiếc xe từ một loạt các các xe khác để chơi. Con tôi lấy xà phòng để rửa xe, sau đó xịt nước từ vòi phun nước như trong thiết kế, làm khô xe và chuyển sang phần tiếp theo nơi con tôi có thể trang trí nó. Con tôi sơn màu xanh lá cây cho xe. Nhưng rồi nó nghĩ mình không muốn màu xanh. Thay vì thay đổi sang màu khác, cậu bé quay lại khu vực vệ sinh và rảy nước lên xe với hy vọng chiếc xe sẽ có được màu nguyên bản. Lúc này, cửa sổ lỗi bật lên nhấp nháy trên màn hình. Thật không may, XYZ đã ngừng hoạt động. Tôi gần như nhảy ra khỏi ghế của mình. Sau khi làm theo các bước tương tự một lần nữa, tôi cũng có thể tái hiện được sự cố.<br>

Chuyện gì đã xảy ra?<br>

Sau một số kết hợp kiểm thử và lỗi, tôi thấy rằng <br>

Khi người dùng quay trở lại từ bước trang trí sang bước làm sạch, ứng dụng đã crash.<br>

OMG, thật là một lỗi ngớ ngẩn, tôi tự nhủ. Trong khoảng thời gian hơn tám năm làm người kiểm thử ứng dụng web, tôi đã thực hiện một số Test Cases theo mặc định. Một trong số đó là - đi ra và quay lại rồi lại tiếp tục đi ra và thực hiện một số hoạt động khác. Có phải nhà phát triển game di động đã không quan tâm đến điều tưởng chừng như ngớ ngẩn này?<br>

Ok, đúng là nhà phát triển đã bỏ qua nó. Và người kiểm thử cũng không tìm ra cái lỗi ngớ ngẩn này khiến đứa trẻ ngừng chơi trò chơi?<br>

**Tại sao tôi lại đề cập trường hợp này?<br>**

Trong thời đại mà điện thoại di động đang thống trị tất cả các lĩnh vực và gần như cứ sau hai tuần một lần một mẫu di động mới được tung ra, những người kiểm thử di động phải chịu một áp lực rất lớn. Hầu hết các câu hỏi phỏng vấn cho kiểm thử ứng dụng di động không bao gồm bất kỳ câu hỏi nào về kiểm thử cơ bản hoặc thậm chí kiểm thử chức năng.<br>

Kiểm tra di động, nó thực sự khó khăn?<br>
Những ý kiến về Mobile Testing là  người kiểm thử phải biết về cách thực hiện kiểm thử khi bộ nhớ bị đầy, kiểm thử bảo mật, kiểm thử gián đoạn, kiểm thử cho từng thiết bị cụ thể, kiểm thử trên các hệ điều hành khác nhau và nên biết một hoặc hai công cụ để kiểm tra hiệu suất. Như thế đã đủ chưa?<br>

Không, chưa đủ.<br>

**Đồng ý rằng điện thoại di động thực sự là một lĩnh vực đầy thách thức. Lý do của nó là gì**<br>

1. Sự phát triển vượt bậc của ngành công nghiệp di động đã thúc đẩy mọi ngành công nghiệp khác tung ra các ứng dụng dành cho thiết bị di động. Ngày nay, nếu bạn tìm kiếm, bạn sẽ có thể tìm thấy các ứng dụng cho hầu hết mọi từ khóa quen thuộc<br>
2. Điện thoại di động đã trở thành một phần của cuộc sống đến nỗi chúng ta từ chối sử dụng một trang web hoặc ứng dụng phần mềm nếu nó không trên thiết bị di động. Chúng ta muốn mọi thứ trong tầm tay. Và những nhu cầu khổng lồ này đã tạo ra vô số căng thẳng cho những dự án mà có thể tương thích với thiết bị di động.<br>
3. Một số lượng lớn điện thoại thông minh trên thị trường cùng với việc bổ sung tương tự hàng tháng làm cho phạm vi kiểm thử trở thành một yếu tố quan trọng và nhức nhối cho tất cả mọi người liên quan.<br>
4. Theo thời gian, ngày càng có nhiều HĐH được phát triển một cách độc lập, bên cạnh các HĐH phổ biến như iOS, WebOS, Blackberry và Android. Và hầu hết các ứng dụng được phát triển ngày nay đều được mong đợi chạy trên đa nền tảng và do đó cần phải được kiểm thử kỹ lưỡng trên các HĐH khác nhau mà được hỗ trợ.<br>
5. Tự động hóa kiểm thử di động vẫn còn trong giai đoạn sơ khai và mặc dù đã có một số công cụ có sẵn, kiểm thử tự động hóa di động không hề dễ dàng.<br>
6. Kiểm thử di động gặp phải những thách thức khác nhau như sự cố mạng - mạng yếu, mạng khỏe, thay đổi mạng như từ Wi-Fi sang 3G / 4G và ngược lại, hiệu suất của ứng dụng khi mà nhiều ứng dụng sử dụng đồng thời cùng một lúc, vấn đề bộ nhớ bị đầy, vấn đề tiêu thụ pin...<br>

Khi điện thoại di động hiện hành, tính năng quan trọng nhất là thân thiện với người dùng. Cho dù ứng dụng của bạn tốt đến đâu, hiển thị thông minh hay tính năng tốt như nào, nhưng nếu người dùng không thể xử lý nó trên màn hình trong hơn 5 giây, anh ta sẽ không bao giờ quay lại. Người dùng di động thoải mái sử dụng một số tùy chọn và do đó rất hiếm khi có bug.<br>

Bạn có thể nghĩ tại thời điểm này  kiểm thử ứng dụng web cũng giống như vậy. Thân thiện với người dùng cũng là tính năng đầu tiên để lựa chọn ứng dụng. Điều đó luôn luôn chính xác. Nhưng người dùng máy tính kiên nhẫn hơn người dùng di động. Ngay cả khi là người kiểm thử, bạn sẽ thấy các hành vi khác nhau ở chính mình khi bạn kiểm thử bất kỳ trang web nào trên máy tính để bàn, bạn có thể đợi trong 2 - 5 giây trong khi trên điện thoại di động, bạn sẽ liên tục nhấn vào biểu tượng loading để đợi 2 giây đó trôi qua.<br>

**Phần kết luận**<br>

Vì vậy, kiểm thử trên thiết bị di động không khó vì những người kiểm thử phải nghĩ đến phạm vi bao phủ rộng và sử dụng thời gian thực (vâng, chúng chắc chắn là những yếu tố khác biệt so với bất kỳ kiểm thử thông thường nào) nhưng kiểm thử di động đã trở nên khó khăn vì trong khi chạy đua với thời gian để kịp hoàn thành việc kiểm thử, hầu hết những người kiểm thử ứng dụng di động thích thú với việc test gián đoạn, test tràn bộ nhớ, kiểm tra hiệu năng nhưng lại tránh hoặc ít chú trọng đối với những kiểm thử chức năng cơ bản (lời khẳng định này là lời khẳng định chung chung và không nên được coi là lý lẽ khi tranh luận)<br>

Nếu bạn đã làm việc trên những lĩnh vực khác nhau, bạn phải biết rằng không có cái nào dễ dàng và mỗi cái đều có các khó khăn riêng. Lĩnh vực di động cũng thế. Vâng, nó khác biệt và nó đã thay đổi sự cân bằng của yêu cầu đầu vào và kỳ vọng của người dùng theo nhiều cách khách nhau. Nhưng **nó lại khó khăn bởi vì những người kiểm thử nghĩ rằng phạm vi kiểm thử trên nhiều thiết bị khác nhau quan trọng hơn kiểm thử kỹ lưỡng tất cả các chức năng trên một thiết bị.**<br>

Tuy nhiên, những gì tôi đề cập bên trên, chỉ là ý kiến cá nhân và nó ko ám chỉ bất cứ cá nhân hay lĩnh vực cụ thể nào.

Link bài viết: https://www.softwaretestinghelp.com/why-mobile-testing-is-tough/