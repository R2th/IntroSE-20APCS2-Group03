Hi các bạn, mình cũng mới chuyển qua làm 1 công việc khá hot trong thời gian gần đây - Business analyst. Trải qua khoảng 6 tháng mày mò kết hợp thực tế dự án + kiến thức sách vở, mình muốn chia sẻ với mọi người về công việc của một business analyst trong 1 dự án. Do kinh nghiệm không nhiều nên có lẽ những step sau đây mình chia sẻ có thể không được chuẩn chỉ 100%, mong bà con gạch đá nhẹ nhàng.

# 1. Lên kế hoạch
Làm gì thì cũng phải có kế hoạch, không thể hú họa đùng 1 cái làm mà chuẩn chỉ được đúng không nào. Vậy nên bước đầu tiên luôn luôn là lên kế hoạch.

## Hiểu về tổng quát dự án
Đây là bước đầu tiên ta cần xác định được trước khi làm bất kỳ cái gì khác. Chúng ta không thể cứ thế lao vào làm mà chẳng biết dự án này bắt nguồn từ đâu, hướng đến mục đích gì phải không nào? Đây là những thứ chúng ta cần biết trước khi lập kế hoạch cho bất cứ điều gì:
1. Mục đích của dự án
2. Phạm vi áp dụng của dự án
3. Các stakeholder chính

Mấy cái này thường sẽ được cung cấp qua 1 cuộc họp ở đầu mỗi dự án. Tuy nhiên với những môi trường đặc thù như startup chẳng hạn, cả team sẽ cùng list ra danh sách các user liên quan đến product của mình, đó sẽ là các stakeholder chính, danh sách này sẽ là cả team thảo luận và điều chỉnh liên tục chứ không cố định như việc làm outsource cho một tổ chức nào đó.

## Kế hoạch tiếp cận và triển khai
Ở bước này chúng ta sẽ lựa chọn quy trình cho bản thân công việc của BA cũng như cho cả dự án. 

Trong cuốn sách "A Guide to the Business Analysis Body of Knowledge" (BABOK) có đề cập đến 2 kiểu quy trình tiếp cận là "predictive" và "adaptive". Nghe kiểu này thì lạ thôi (do BABOK viết cho cả những BA ngoài ngành IT) chứ với dân dev thì chúng ta thường gọi đó là quy trình "Waterfall" và "Agile" đó.

Mình có nghe nhiều người nói rằng Waterfall chết rồi, giờ dự án nào mà chẳng dùng Agile, ... (đại khái kiểu như thế). Nhưng mình nghĩ rằng trước khi lựa chọn giữa 2 quy trình này ta cũng nên cân nhắc 1 số thứ cho phù hợp:
1. Độ formal (mình cũng chả biết dịch thế nào cho rõ nghĩa) và cấp độ chi tiết của tài liệu mà BA phải đưa ra output: Nếu dự án yêu cầu các document phải đầy đủ, được ký duyệt cẩn thận trước khi triển khai thì chắc chắn phải làm kiểu Waterfall rồi.
2. Hoạt động thu thập và phân tích nghiệp vụ: Nếu như trong quá trình thu thập và phân tích nghiệp vụ, chúng ta được triển khai thành nhiều giai đoạn, mỗi giai đoạn chỉ cần cung cấp 1 lượng thông tin nhất định nào đó thì hiển nhiên Agile sẽ tốt hơn nhiều. Tuy nhiên nếu cần khai thác toàn bộ thông tin, tổng hợp lại và lại document rồi đem ký thì lại quay về Waterfall thôi
3. Độ phức tạp và rủi ro: Nếu như ở 2 cái trên là do phía khách hàng, cấp trên yêu cầu gần như bắt buộc phải làm theo Waterfall thì còn 1 lý do này nữa khiến ta phải tự cân nhắc xem có nên dùng Waterfall hay không. Đối với những dự án có độ phức tạp và độ ảnh hưởng lớn, cũng như chứa nhiều rủi ro, ta cũng cần cân nhắc xem có nên dùng Waterfall hay không. Thường những dự án có rủi ro lớn trong bước implement thì cần làm tài liệu thật kỹ từ trước, và lúc đó thì có lẽ nên dùng Waterfall.

## Kế hoạch với stakeholder
Là một BA, bạn có thành công trong dự án hay không có sự ảnh hưởng rất lớn từ các stakeholder. Vậy nên việc lên kế hoạch với stakeholder là bắt buộc. Bước này chúng ta sẽ chuẩn bị cách thức tiếp cận cũng như giữ mối quan hệ với các stakeholder.

Để chuẩn bị kế hoạch làm việc với các stakeholder, ta cần cân nhắc những thứ sau:
1. Cách tiếp cận và triển khai: Dự án sẽ chạy theo kiểu Waterfall hay Agile ảnh hưởng khá nhiều đến cách làm việc với stakeholder. Nếu theo kiểu Waterfall thì gần như ta chỉ đi gặp mỗi stakeholder 1 lần, khai thác toàn bộ các thông tin cần thiết và rất ít khi contact lại để khai thác thêm thông tin. Còn đối với kiểu Agile thì ta sẽ cân nhắc theo từng giai đoạn mình cần những thông tin gì, khai thác từ những stakeholder nào và triển khai theo từng giai đoạn đó.
2. Danh sách stakeholder: Stakeholder của chúng ta gồm những ai? Bạn luôn luôn phải lập danh sách các stakeholder và chia ra làm các loại (stakeholder trực tiếp/gián tiếp), phân tích mức độ ảnh hưởng của stakeholder đến với sự thành công của dự án. Và quan trọng hơn nữa, cách tiếp cận với từng stakeholder là gì (không phải ai cũng có thể dùng cách interview được, và cũng như cách nói chuyện với một giám đốc tập đoàn lớn - chẳng hạn như chúng ta có cơ hội tiếp cận - sẽ khác với cách nói chuyện với các bạn học sinh, ...), cũng như bộ câu hỏi phù hợp dành cho các stakeholder.

## Kế hoạch quản lý dự án
Với phạm vi của BA, ta sẽ không quản lý về mặt con người mà sẽ cần xác định được cách quyết định được đưa ra thông qua requirement và design, cũng như các hoạt động review, quản lý thay đổi, như thế nào thì được chấp thuận cũng như mức độ ưu tiên.

Phần này trong các tổ chức lớn thường có quy định rất rõ ràng từ các bậc tiền bối từng trải lâu năm. Kinh nghiệm của mình thì chưa đủ để xây dựng nên một quy trình quản lý dự án như này, hiện đang dùng quy trình có sẵn tại công ty, tuy nhiên mình xin list ra để mọi người chú ý đến nó, hãy luôn để nó vào to-do list khi start 1 dự án.

## Kế hoạch quản lý tài liệu
Một việc rất quan trọng đối với BA đó là xây dựng và duy trì bộ tài liệu. Vậy nên khi bắt đầu dự án, kế hoạch để quản lý tài liệu cũng rất quan trọng, ta cần xác định được những thứ sau:
1. Thông tin nên được tổ chức như thế nào (format của tài liệu)
2. Cấp độ chi tiết của mỗi thông tin được cung cấp cho các bên
3. Các mối quan hệ giữa các thông tin (kiểu như là task này thuộc về userstory nào trong backlog)
4. Cách thức thông tin được truyền đạt giữa nhiều tầng của tổ chức
5. Quyền truy cập và cách lưu trữ thông tin (ví dụ các app dùng để lưu là gì, những ai được phép truy cập vào phần thư mục nào, ...)
6. Các tài liệu nào cần được cập nhật, cập nhật sau khoảng thời gian nào, ...

# Tạm kết
Qua phần này ta đã tìm hiểu được về bước lên kế hoạch khi tiếp cận một dự án. Mình hy vọng bài viết này có ích không chỉ cho các bạn đang muốn tìm hiểu về BA mà còn cho mọi người ở những ngành nghề khác nhau, đặc biệt là các developer có cách tiếp cận khác hơn so với việc chỉ chăm chăm ngó xem nên code bằng ngôn ngữ gì =))

Nguồn tham khảo: "A Guide to the Business Analysis Body of Knowledge" - IIBA