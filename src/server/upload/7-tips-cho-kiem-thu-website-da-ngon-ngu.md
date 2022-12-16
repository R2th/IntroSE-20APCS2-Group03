Ngày nay, một số websites được phát triển dạng đa ngôn ngữ. Khi mà các công ty ngày càng phát triển kinh doanh ở các quốc gia khác thì số lượng các ứng dụng web đa ngôn ngữ toàn cầu sẽ tiếp tục tăng lên là điều tất yếu. Chính vì vậy Kiểm thử website hỗ trợ đa ngôn ngữ sẽ có những khó khăn, thách thức riêng đối với mỗi loại ngôn ngữ trong thế giới ngày nay.

Trong bài viết này, tôi sẽ chia sẻ về 7 Tips cơ bản để kiểm thử các ứng dụng dựa trên trình duyệt đa ngôn ngữ một cách hoàn chỉnh.

![](https://images.viblo.asia/205265f6-6433-48fd-831f-64203616663c.jpg)

## Tip 1 – Chuẩn bị và sử dụng môi trường kiểm thử được yêu cầu

Nếu 1 website được lưu trữ bằng cả tiếng Anh và Nhật thì việc đổi ngôn ngữ trình duyệt mặc định và thực hiện kiểm thử giống hệt nhau ở cả 2 loại ngôn ngữ là không đủ. Nói 1 cách khác là việc chúng ta đem toàn bộ những case để kiểm thử website khi nó được thiết định bằng Tiếng Anh sang kiểm thử website đó khi nó được thiết định bằng tiếng Nhật. Tùy thuộc vào cách triển khai của nó, trang web có thể tìm ra ngôn ngữ chính xác cho giao diện của nó từ việc cài đặt ngôn ngữ trình duyệt, cài đặt khu vực và ngôn ngữ của máy, cấu hình trong ứng dụng web hoặc các yếu tố khác.

Do đó, Để thực hiện kiểm thử thực tế, buộc chúng ta phải kiểm thử website đó bằng 2 máy: một máy với hệ điều hành bằng Tiếng Anh và 1 máy khác với hệ điều hành bằng tiếng Nhật. Có lẽ bạn muốn giữ thiết định mặc định trên mỗi máy bởi vì nhiều người dùng cũng không thay đổi thiết định mặc định trên máy của họ.

## Tip 2 – Có được những bản dịch chính xác

Một người nói ngôn ngữ bản địa, cũng chính là người dùng thuộc khu vực đó luôn là nguồn tài nguyên tốt nhất cung cấp những bản dịch chính xác về cả mặt ngữ nghĩa cũng như ngữ cảnh. Nếu như không có những người như thế thì có lẽ bạn phải phụ thuộc vào Các ứng dụng dịch Web tự động như wordreference.com và dictionary.com.

Nó sẽ luôn đem lại kết quả tốt hơn khi mà đem bản dịch tự động đi so sánh với nhiều nguồn dịch khác nhau trước khi sử dụng chúng để test.

## Tip 3 - Hãy thực sự cảm thấy thoải mái với ứng dụng

Vì bạn có thể sẽ không biết được các ngôn ngữ mà website được hỗ trợ, do vậy tốt hơn là bạn nên hiểu rõ về chức năng của website mà mình kiểm thử. Hãy thực hiện kiểm thử các testcase một vài lần bằng phiên bản website tiếng Anh. Điều này đảm bảo rằng, khi thiết định với các ngôn ngữ khác thì bạn cũng có thể dễ dàng kiểm thử website đó hơn.

Nếu không, bạn cần phải mở website bằng tiếng Anh ở trình duyệt khác để tiến hành tìm hiểu trong quá trình kiểm thử website đó bằng một ngôn ngữ khác (tuy nhiên điều này sẽ ít nhiều làm chậm tiến độ kiểm thử của bạn đấy ^^).
 
## Tip 4 - Hãy bắt đầu với việc kiểm thử các label của website

Bạn có thể bắt đầu bằng việc kiểm thử các phiên bản ngôn ngữ khác nhau của website bằng việc xem tất các label của website đó. Các label tiếng Anh thường ngắn và được dịch theo xu hướng mở rộng. Điều quan trọng là cần phát hiện bất kỳ vấn đề nào liên quan đến việc truncation label, label có bị overlay trên dưới các mục khác, hay xuống dòng không chính xác, v.v.
Việc kiểm thử nhãn này thậm chí còn quan trọng hơn cả việc so sánh các label ở các phiên bản ngôn ngữ khác nhau.

## Tip 5 - Di chuyển sang các Control khác

Tiếp theo, bạn có thể chuyển sang kiểm tra các control khác đối với các bản dịch chính xác và các vấn đề giao diện người dùng. Điều quan trọng là Website cung cấp các thông báo lỗi đúng với các ngôn ngữ khác nhau. Việc kiểm thử nên bao gồm việc kiểm thử sinh ra tất cả các thông báo lỗi. Do đó, hãy rà soát thật kỹ để tránh sót thông báo lỗi nào nhé! ^^

Thông thường, đối với bất kỳ văn bản nào mà không được dịch thì sẽ có ba khả năng tồn tại. Các văn bản sẽ bị mất hoặc những từ tiếng Anh tương đương của nó sẽ được hiển thị hoặc có thể bạn sẽ thấy các ký tự rác ở vị trí của nó.

## Tip 6 - Kiểm thử Dữ liệu

Thông thường, website đa ngôn ngữ lưu trữ dữ liệu bằng định dạng  mã hóa UTF-8. Để check ký tự mã hóa cho website của bạn trong Mozilla: Mở View -> Encoding. Dữ liệu trong các ngôn ngữ khác nhau có thể dễ dàng được trình bày bằng định dạng này.

Hãy đảm bảo chắc chắn rằng bạn đã kiểm tra dữ liệu đầu vào. Có thể dễ dàng nhập dữ liệu bằng ngôn ngữ khác ngôn ngữ đang thiết định website. Dữ liệu được hiển thị trên website nên là dữ liệu đúng. Còn đối với dữ liệu đầu ra thì nên được so sánh với bản dịch của nó. 

## Tip 7 - Hãy nhận thức về vấn đề văn hóa

Một thách thức trong việc thử nghiệm websites đa ngôn ngữ là các ngôn ngữ mang một ý nghĩa riêng đối với những người dùng đến một nền văn hóa cụ thể nào đó. Có rất nhiều thứ cụ thể như màu sắc ưa thích (và không ưa thích), hướng văn bản (có thể là từ trái sang phải, phải sang trái hoặc từ trên xuống dưới), định dạng của địa chỉ và lời chào, số đo, tiền tệ, vv là khác nhau trong các nền văn hóa khác nhau.

Chính vì vậy, không chỉ yêu cầu phiên bản ngôn ngữ khác của trang web cung cấp bản dịch chính xác mà còn phải kể đến các yếu tố khác về giao diện người dùng.

Ví dụ: hướng văn bản, ký hiệu tiền tệ, định dạng ngày vv cũng phải chính xác.

## Kết luận

Như các bạn có thể thấy được qua các Tips  được nêu ở trên, việc chọn, sử dụng môi trường kiểm thử và có được bản dịch chính xác là rất quan trọng trong quá trình kiểm thử các website đa ngôn ngữ. Nó sẽ là những điều kiện cần quan trọng góp phần kiểm thử website đa ngôn ngữ thành công hơn đó.

Bài viết được dịch từ link: https://www.softwaretestinghelp.com/7-basic-tips-for-testing-multi-lingual-web-sites/