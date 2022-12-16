Kể từ khi phương pháp phát triển Agile được giới thiệu trong phát triển phần mềm, vai trò của QA trong các dự án Agile được thay đổi đáng kể. Không còn một team QA độc lập, cách xa đội phát triển và thiết kế, ngồi chờ đợi đội ngũ phát triển bàn giao sản phẩm để kiểm thử. Thay vào đó, QA được tham gia vào tất cả các giai đoạn của dự án, từ giai đoạn phân tích các yêu cầu và thiết kế của mỗi tính năng. Vì vậy, họ có thể đưa ra ý kiến của họ & giúp cho phần mềm được hoàn thiện hơn.

Một trong những yếu tố quan trọng nhất đối với QA khi tham gia vào dự án Agile là phải hiểu rõ về phương pháp và quy trình phát triển Agile. Vậy, những thử thách mà Tester hay QA thường phải đối mặt khi kiểm thử những dự án Agile là gì? Nó có giống như trong dự án Scrum hay không?

Bản chất của phát triển theo mô hình Agile là cung cấp phần mềm thường xuyên mỗi khi thêm hoặc thay đổi một tính năng nhỏ có giá trị với khách hàng. Điều đó đặt ra rất nhiều thách thức không chỉ cho QA mà còn cho những người phát triển và bất kỳ ai khác tham gia vào quá trình phát triển ứng dụng.
Trong bài viết này, tôi sẽ liệt kê một số thử thách phổ biến mà QA thường gặp trong các dự án Agile và cách để khắc phục chúng như thế nào.

## Thay đổi yêu cầu/Thay đổi ở những phút chót

Thay đổi yêu cầu từ phía khách hàng không phải là hiếm trong các dự án Agile. Đây có thể là một cơn ác mộng đối với toàn đội vì điều đó có nghĩa là một phần công việc đã được thực hiện có thể bị loại bỏ, thậm chí có thể bị loại bỏ hoàn toàn.
Những yêu cầu thay đổi và những yêu cầu từ phút cuối có thể ảnh hưởng đến phạm vi kiểm thử và có thể ảnh hưởng đến chất lượng bàn giao sản phẩm. Vậy khi gặp phải tình huống này, QA nên làm thế nào?

**Cách khắc phục:**

QA nên học cách ứng phó với những thay đổi, vì QA nên biết rằng trong các dự án Agile, thay đổi là điều không thể tránh khỏi. Khi các yêu cầu thay đổi đặc biệt vào giai đoạn chạy nước rút, nếu QA không có đủ thời gian kiểm thử đầy đủ các tính năng, QA nên cung cấp càng nhiều thông tin càng tốt về những tính năng đã thực hiện và những phần nào của ứng dụng chưa được thực hiện để nhóm có thể đưa ra quyết định sáng suốt (có thể dựa trên rủi ro) có nên bàn giao tính năng này hay không.

Hoặc QA có thể để developer tham gia vào quá trình kiểm thử vì kiểm thử và chất lượng nên là trách nhiệm của toàn nhóm.

Ngoài ra, khi QA không có đủ thời gian để kiểm thử tất cả các tính năng. Dựa trên kinh nghiệm hoặc phương pháp phân tích rủi ro có thể đánh giá độ ưu tiên cho các chức năng nào cần phải chạy.
Các cân nhắc có thể bao gồm:

* Chức năng nào là quan trọng nhất đối với mục đích dự định của dự án?
* Chức năng nào hiển thị nhiều nhất với người dùng?
* Chức năng nào có tác động tài chính lớn nhất đối với người dùng?
* Những khía cạnh nào của ứng dụng là quan trọng nhất đối với khách hàng?
* Những khía cạnh nào của ứng dụng có thể được kiểm tra sớm trong chu kỳ phát triển?
* Những phần nào của mã là phức tạp nhất, và do đó hầu hết đều bị lỗi?
* Những khía cạnh nào của các dự án trước đây có liên quan / tương tự gây ra vấn đề?
* Những khía cạnh nào của các dự án trước đây tương tự / có liên quan có chi phí bảo trì lớn?
* Những loại vấn đề nào sẽ gây ra nhiều khiếu nại về dịch vụ khách hàng nhất?

## Specs không đầy đủ, rõ ràng

Sẽ có những lúc khi người dùng sản phẩm đưa ra yêu cầu hoặc ý tưởng về tính năng của sản phẩm nhưng không được viết một cách chi tiết hoặc không định nghĩa đầy đủ hành vi của tính năng đó. Họ yêu cầu đội phát triển tạo ra prototype để họ có thể thêm ý tưởng về chức năng và hành vi của các tính năng.

Điều này tạo ra thách thức đối với QA vì có thể dẫn đến không hiểu rõ yêu cầu hoặc chức năng, vì vậy không thể tạo ra test case một cách chính xác.

**Cách khắc phục**

Trong quá trình đọc tài liệu của mô hình Agile, nếu có những vấn đề khúc mắc thì Tester cần trao đổi với team ngay để làm rõ Specs và đặt câu hỏi với khách hàng một cách hiệu quả nhằm tạo ra sản phẩm tương đồng gần nhất với yêu cầu của khách hàng.

Thực tế có những trường hợp ngay cả khi confirm với khách hàng mà vẫn chưa thể làm rõ được vấn đề, nguyên nhân là do khách hàng không hiểu về kỹ thuật, luôn thay đổi yêu cầu liên tục. Khi đó ta nên refer đến những hệ thống đã có sẵn, có chức năng tương tự để đưa ra suggestions hợp lý cho khác hàng lựa chọn. Việc tạo câu hỏi cho khách hàng cũng cần rõ ràng để tránh mất thời gian chờ đợi confirm.

Một cách khác, thay vì QA cứ ngồi chờ đợi để làm rõ đầy đủ, chi tiết về tính năng. QA nên viết high level test design, trong trường hợp khách hàng có thay đổi về chi tiết thì nhìn chung ngữ cảnh test vẫn là giống nhau.

## Kiểm thử diễn ra liên tục

Trong mô hình Agile, kiểm thử không phải là một giai đoạn, nó là một hoạt động. Kiểm thử được bắt đầu ngay từ đầu, ngay cả trước khi bắt đầu phát triển. Để mỗi giai đoạn (Sprint) được diễn ra suôn sẻ, QA nên phối hợp với chủ sở hữu sản phẩm để tìm hiểu chi tiết các yêu cầu & đưa ra chiến lược kiểm thử phù hợp.

Việc cung cấp phản hồi sớm cho nhà phát triển là rất quan trọng và thách thức đối với QA. Với tư cách là người kiểm thử, không chỉ chúng ta phải đảm bảo rằng tính năng mới hoạt động như yêu cầu & theo tiêu chí chấp nhận của chúng, chúng ta cũng phải đảm bảo rằng khi tích hợp code mới không làm ảnh hưởng tới chức năng hiện tại.

**Cách khắc phục:**

Đảm bảo mỗi câu chuyện có tiêu chí chấp nhận phù hợp và bối cảnh của câu chuyện được mọi người hiểu rõ trước khi bắt đầu công việc phát triển.

Bắt đầu tạo các test case (tự động hoặc thủ công) càng sớm càng tốt để khi tính năng được hoàn thành, bạn có thể bắt đầu ngay lập tức.

QA nên khuyến khích nhóm phát triển cung cấp các tính năng sớm bằng việc deploy lên môi trường kiểm thử , nơi mà QA hoặc chủ sở hữu sản phẩm có thể chạy thử nghiệm, thay vì ngồi đợi sản phẩm hoàn thiện rồi mới tiến hành kiểm thử.

Thực hiện kiểm thử hồi quy tự động để giảm bớt effort của quá trình kiểm thử và giải phóng thời gian của bạn để thử nghiệm thăm dò.

## Nhiều trình duyệt / nhiều thiết bị

Ngày nay, kiến trúc của nhiều trang web bao gồm “back-end” và “front-end”. Phần front-end phần lớn dựa trên JavaScript và CSS có khả năng hoạt động khác nhau khi được xem từ các trình duyệt hoặc thiết bị khác nhau.

Đảm bảo rằng một trang web hoạt động như mong đợi trong tất cả các trình duyệt chính và thiết bị di động phổ biến hoặc máy tính bảng thực sự là một thách thức hàng đầu cho những người kiểm thử trong các dự án Agile.

**Cách khắc phục:**

Tự động hóa là chìa khóa ở đây. Viết một kịch bản và chạy nó trên nhiều trình duyệt là những gì tự động hóa tốt nhất.

Bạn có thể sử dụng Selenium Grid với Docker để quản lý và chạy kiểm thử tự động của bạn song song trên nhiều trình duyệt.

Một công cụ tuyệt vời khác để thử nghiệm đa trình duyệt là BrowserSync.

## Giao tiếp

Với dự án Agile khi các thành viên giao tiếp không tốt với nhau, hoặc team giao tiếp với các vai trò khác bên ngoài team không tốt thì sẽ gây ra hàng loạt các vấn đề như: Công việc trùng lặp nhau, bỏ quên công việc, thời hạn từng việc bị bỏ qua, mục tiêu được hiểu khác nhau từ các thành viên, sự không đồng nhất trong việc hiểu được điều kiện hoàn thành công việc,… Thì giao tiếp chính là chìa khoá hiệu quả mang đến sự thành công cho một team.

**Cách khắc phục:**

Đảm bảo có sự giao tiếp hiệu quả giữa các nhóm. Tương tác với nhà phát triển và chủ sở hữu sản phẩm liên tục.

Đảm bảo có một quy trình tại chỗ và mỗi thành viên trong nhóm tuân thủ quy trình đó. Rất thường xuyên, các vấn đề chính hoặc lỗi không được xác định sớm vì quá trình này không được theo dõi và nhóm không thể giao tiếp với nhau.

 

Nguồn tham khảo: https://www.testingexcellence.com/agile-testing-challenges-qa-agile-projects/