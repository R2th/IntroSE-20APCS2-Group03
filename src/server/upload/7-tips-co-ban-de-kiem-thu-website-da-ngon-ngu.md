7 típ cơ bản để kiểm thử website đa ngôn ngữ
Ngày nay một số trang web được triển khai bằng nhiều ngôn ngữ. Khi các công ty ngày càng mở rộng doanh nghiệp ở các quốc gia khác, số lượng ứng dụng web đa ngôn ngữ toàn cầu như vậy sẽ tiếp tục tăng.

Do đó, kiểm thử các trang web đa ngôn ngữ cũng là một thách thức đối với người kiểm thử

Trong bài viết này, tôi sẽ chia sẻ 7 tip cơ bản cho phép bạn kiểm thử các ứng dụng dựa trên trình duyệt đa ngôn ngữ một cách hoàn chỉnh.
![](https://images.viblo.asia/95168537-3f28-45d6-a077-effd8809f259.jpg)



Tip # 1 Chuẩn bị và sử dụng môi trường kiểm thử cần thiế

Nếu một trang web được lưu trữ cả bằng tiếng Anh và tiếng Nhật, thì việc thay đổi ngôn ngữ trình duyệt mặc định và thực hiện các test case giống hệt nhau ở cả hai ngôn ngữ là không đủ.

Tùy thuộc vào việc triển khai, trang web có thể tìm ra ngôn ngữ chính xác cho giao diện của nó từ cài đặt ngôn ngữ trình duyệt, cài đặt ngôn ngữ và khu vực của máy, cấu hình trong ứng dụng web hoặc các yếu tố khác.

Do đó, để thực hiện một kiểm thử thực tế, điều bắt buộc là trang web phải được kiểm thử từ hai máy - một với hệ điều hành tiếng Anh và một với hệ điều hành Nhật Bản. Bạn có thể muốn giữ cài đặt mặc định trên mỗi máy vì nhiều người dùng không thay đổi cài đặt mặc định trên máy của họ.

Tip # 2 Có được bản dịch chính xác

Một người bản ngữ của ngôn ngữ, thuộc cùng khu vực với người dùng, sẽ cho ra bản dịch chính xác về cả ý nghĩa cũng như ngữ cảnh nhất

Nếu một người như vậy không có sẵn để cung cấp cho bạn bản dịch văn bản, bạn có thể phải phụ thuộc vào bản dịch web tự động có sẵn trên các trang web như wordreference.com và dictionary.com.

Bạn cũng nên so sánh các bản dịch tự động từ nhiều nguồn trước khi sử dụng chúng trong kiểm thử

Tip # 3 Thực sự thoải mái với ứng dụng

Vì bạn có thể không biết các ngôn ngữ được trang web hỗ trợ, nên tốt hơn hết là bạn nên đối thoại với chức năng của trang web. Thực hiện các trường hợp thử nghiệm trong phiên bản tiếng Anh của trang web một số lần. Đến khi bạn kiểm thử trên các ngôn ngữ khác nó sẽ giúp bạn tìm đường dễ dàng hơn

Mặt khác, bạn có thể phải mở phiên bản tiếng Anh của trang web trong một trình duyệt khác để tìm ra cách tiến hành trong phiên bản ngôn ngữ khác (và điều này có thể làm chậm tiến độ kiểm thử của bạn lại).

Tip # 4 Bắt đầu kiểm thử với các labels

Bạn có thể bắt đầu thử nghiệm phiên bản ngôn ngữ khác của trang web bằng cách trước tiên xem tất cả các labels. Labels là các mục tĩnh trên trang web. Labels tiếng Anh thường ngắn và khi được dịch sang các ngôn ngữ khác thì có xu hướng mở rộng. Điều quan trọng là phải phát hiện bất kỳ vấn đề nào liên quan đến cắt ngắn labels, lớp phủ trên / dưới các điều khiển khác, gói từ không chính xác, v.v.

Điều quan trọng hơn nữa là so sánh các labels với bản dịch của chúng trong ngôn ngữ khác.

Tip # 5 Tiếp tục kiểm thử trên các controls khác

Tiếp theo, bạn có thể chuyển sang kiểm thử các control khác để có bản dịch chính xác và phát hiện ra các bug giao diện người dùng. Điều quan trọng là trang web cung cấp thông báo lỗi chính xác trong ngôn ngữ khác. Kiểm thử nên bao gồm cả tất cả các thông báo lỗi.

Thông thường, đối với bất kỳ văn bản nào không được dịch, có ba khả năng tồn tại. Văn bản sẽ bị thiếu hoặc tương đương bằng tiếng Anh của nó sẽ có mặt hoặc bạn sẽ thấy các ký tự rác ở vị trí của nó.

Tip # 6 – Kiểm thử dữ liệu

Thông thường, các trang web đa ngôn ngữ lưu trữ dữ liệu ở định dạng mã hóa UTF-8 Unicode. Để kiểm thử mã hóa ký tự cho trang web của bạn trong Mozilla: đi đến Xem -> Mã hóa ký tự. Còn trong trong IE hãy đi đến Xem -> Mã hóa. Dữ liệu trong các ngôn ngữ khác nhau có thể dễ dàng được trình bày theo định dạng này.

Hãy chắc chắn để kiểm thử dữ liệu đầu vào. Có thể nhập dữ liệu bằng ngôn ngữ khác trong trang web. Dữ liệu hiển thị trên trang web phải chính xác. Dữ liệu đầu ra cũng nên được so sánh với bản dịch của nó.

Tip # 7 Cảnh giác với các vấn đề văn hóa

Một thách thức trong việc thử nghiệm các trang web đa ngôn ngữ là mỗi ngôn ngữ có thể dành cho người dùng từ một nền văn hóa cụ thể. Nhiều thứ như màu sắc ưa thích (và không ưa thích), hướng văn bản (có thể từ trái sang phải, phải sang trái hoặc từ trên xuống dưới), định dạng của lời chào và địa chỉ, biện pháp, tiền tệ, v.v.

Không chỉ phiên bản ngôn ngữ khác của trang web cung cấp bản dịch chính xác, các yếu tố khác của giao diện người dùng như hướng văn bản, ký hiệu tiền tệ, định dạng ngày, vv cũng cần phải chính xác.

Kết luận Sử dụng môi trường kiểm thử chính xác và có được bản dịch chính xác là rất quan trọng trong việc thực hiện kiểm thử thành công các phiên bản ngôn ngữ khác của trang web.

Tham khảo: https://www.softwaretestinghelp.com/7-basic-tips-for-testing-multi-lingual-web-sites/