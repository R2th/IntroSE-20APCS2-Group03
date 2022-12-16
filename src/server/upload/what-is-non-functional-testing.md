Kiểm thử phi chức năng ( Non-functional Testing) là một loại kiểm thử để kiểm tra các khía cạnh không hoạt động (hiệu suất, khả năng sử dụng, độ tin cậy, vv) của một ứng dụng phần mềm. Nó được thiết kế để kiểm tra sự sẵn sàng của một hệ thống theo các tham số phi chức năng mà không bao giờ được giải quyết bằng kiểm thử chức năng.

Một ví dụ tuyệt vời về kiểm tra phi chức năng sẽ là kiểm tra xem có bao nhiêu người cùng lúc có thể đăng nhập vào một phần mềm.

Kiểm thử phi chức năng cũng quan trọng không kém gì kiểm thử chức năng và ảnh hưởng đến sự hài lòng của khách hàng.

Trong bài viết này chúng ta sẽ cùng tìm hiểu về:

Mục đích của kiểm thử phi chức năng
Đặc điểm của kiểm thử phi chức năng
Tham số kiểm thử phi chức năng
Loại kiểm thử
Các loại kiểm thử phi chức năng

# 1. Mục đích của kiểm thử phi chức năng

* Kiểm thử phi chức năng sẽ tăng khả năng sử dụng, hiệu quả, khả năng bảo trì và tính di động của sản phẩm.
* Giúp giảm thiểu rủi ro sản xuất và chi phí liên quan đến các khía cạnh phi chức năng của sản phẩm.
* Tối ưu hóa cách cài đặt, thiết lập, thực thi, quản lý và giám sát sẩn phẩm.
* Thu thập và hình thành các phép đo cũng nhữ các số liệu phục vụ cho nghiên cứu và phát triển nội bộ.
* Cải thiện và nâng cao những hiểu biết về  khả năng sử dụng và công nghệ của sản phẩm đang được sử dụng.

# 2. Đặc điểm của kiểm thử phi chức năng

* Thử nghiệm phi chức năng nên không thể đo lường được, vì vậy không thể mô tả đặc tính chủ quan như tốt, tốt hơn, tốt nhất, v.v.
* Các con số chính xác không thể được biết khi bắt đầu quy trình.
* Quan trọng ưu tiên các yêu cầu
* Đảm bảo rằng các thuộc tính chất lượng được xác định chính xác
# 3. Tham số kiểm thử phi chức năng

![](https://images.viblo.asia/54e99eaf-3e02-446b-a24a-3a3fc03ceb69.png)

## Bảo mật:

Tham số xác định cách hệ thống được bảo vệ chống lại các tấn công có chủ ý và đột ngột từ các nguồn nội bộ và bên ngoài. Điều này được kiểm tra qua **Kiểm thử bảo mật**.

> Kiểm thử bảo mật là một biến thể của Kiểm thử phần mềm đảm bảo rằng hệ thống và ứng dụng trong một tổ chức, không có bất kỳ lỗ hổng nào có thể gây ra tổn thất lớn.
> 
> Kiểm thử bảo mật của bất kỳ hệ thống nào là về việc tìm kiếm tất cả các lỗ hổng và điểm yếu có thể có của hệ thống dẫn đến mất thông tin trong nội bộ hoặc người bên ngoài.
> 
> Mục tiêu của kiểm thử bảo mật là xác định các mối đe dọa trong hệ thống và đo lường các lỗ hổng tiềm ẩn của nó. Nó cũng giúp phát hiện tất cả các rủi ro bảo mật có thể xảy ra trong hệ thống và giúp các nhà phát triển sửa các lỗi này thông qua mã hóa.
> 
## Độ tin cậy:

Mức độ mà bất kỳ hệ thống phần mềm nào liên tục thực hiện các chức năng được chỉ định mà không bị lỗi. Điều này được kiểm tra bằng **kiểm thử độ tin cậy**.

> Kiểm thử độ tin cậy là một loại kiểm thử để xác minh rằng phần mềm có khả năng thực hiện một hoạt động mà không có lỗi trong một khoảng thời gian nhất định trong một môi trường được chỉ định hay không.
> 
> Độ tin cậy có nghĩa là "yielding the same" (cùng một năng suất) , nói cách khác, từ "đáng tin cậy" có nghĩa là một cái gì đó là đáng tin cậy và rằng nó sẽ cung cấp cho cùng một kết quả  sau mỗi lần thực hiện.
> 
> Kiểm thử độ tin cậy trong phần mềm đảm bảo rằng sản phẩm không có lỗi và đáng tin cậy cho mục đích dự định của nó.

## Khả năng phục hồi:
Tham số kiểm thử xem hệ thống phần mềm có tiếp tục hoạt động và phục hồi chính nó trong trường hợp lỗi hệ thống không. Điều này được kiểm tra bằng ***kiểm thử phục hồi***

> Kiểm thử phục hồi được thực hiện để xác định xem các hoạt động có thể được tiếp tục không sau khi mà một vấn đề xảy ra hay sau khi tính toàn vẹn của hệ thống bị mất.
> 
> Nó liên quan đến việc quay lại một điểm mà tồn tại sự toàn vẹn của hệ thống và sau đó xử lý lại các vấn đề dẫn đến thất bại.

## Khả dụng:

Tham số xác định mức độ mà người dùng có thể phụ thuộc vào hệ thống trong quá trình hoạt động của nó. Điều này được kiểm tra bằng **kiểm thử tính ổn định**.

> Kiểm thử tính ổn định là khả năng sản phẩm có thể tiếp tục hoạt động, theo thời gian và trên toàn bộ phạm vi sử dụng của nó mà không bị lỗi hoặc gây ra lỗi.
> 
> Nó là một kỹ thuật kiểm thử phi chức năng, với mục đích nhấn mạnh thành phần phần mềm đến mức tối đa. Xác định xem nó hoạt động như thế nào ở các mức tải trọng thấp có thể chấp nhận được, tải trọng cao điểm, tải trọng được tạo ra trong các đột biến, với một số lượng lớn dữ liệu khối lượng cần xử lý, v.v .
> 
> Kiểm thử độ ổn định được thực hiện để kiểm thử tính hiệu quả của một sản phẩm được phát triển vượt quá khả năng hoạt động bình thường, thường đến điểm ngắt. Có ý nghĩa lớn hơn là xử lý lỗi, độ tin cậy của phần mềm, độ mạnh và khả năng mở rộng của một sản phẩm chịu tải nặng hơn là kiểm tra hoạt động của hệ thống trong các trường hợp bình thường.

## Khả năng sử dụng:

Sự dễ dàng mà người dùng có thể tìm hiểu, vận hành, chuẩn bị đầu vào và đầu ra thông qua tương tác với một hệ thống. Điều này được kiểm tra bằng tính năng **kiểm thử khả năng sử dụng.**

> Kiểm tra khả năng sử dụng là một loại kiểm thử phần mềm mà sẽ kiểm thử tại một địa điểm cụ thể, bộ phận nhỏ người dùng cuối mục tiêu cụ thể, của một hệ thống phần mềm cụ thể, "sử dụng" ở đây nhằm tìm ra các khuyết tật về khả năng sử dụng. Kiểm thử này chủ yếu tập trung vào sự dễ dàng của người dùng sử dụng ứng dụng, tính linh hoạt trong việc xử lý các điều khiển và khả năng hệ thống đáp ứng các mục tiêu của nó. Nó còn được gọi là Kiểm thử trải nghiệm người dùng.
> 
> Kiểm thử này được đề xuất nên đưa vào ngay giai đoạn thiết kế ban đầu của SDLC, cho phép hiển thị nhiều hơn so với sự mong đợi của người dùng.
> 
## Khả năng mở rộng:

Thuật ngữ này đề cập đến mức độ mà bất kỳ ứng dụng phần mềm nào cũng có thể mở rộng khả năng xử lý của nó để đáp ứng sự gia tăng nhu cầu. Điều này được kiểm tra bằng **kiểm thử khả năng mở rộng**

> Kiểm thử khả năng mở rộng là kiểm tra xem khả năng của một mạng, một hệ thống hoặc một quá trình có tiếp tục hoạt động tốt, thay đổi được về dung lượng hoặc khối lượng của hệ thống để đáp ứng nhu cầu ngày càng phát triển hay không. 
> 
> Kiểm thử khả năng mở rộng đảm bảo rằng một ứng dụng có thể xử lý sự gia tăng dự kiến về lưu lượng người dùng, khối lượng dữ liệu, tần suất giao dịch, vv Nó kiểm tra hệ thống, quy trình và khả năng cơ sở dữ liệu để đáp ứng nhu cầu ngày càng tăng.
> 
> Nó cũng được gọi là kiểm thử hiệu suất, vì nó tập trung vào hoặt động của ứng dụng, khi được triển khai đến một hệ thống lớn hơn hoặc được kiểm thử dưới tải dư thừa.
> Ý tưởng đằng sau Kiểm thử khả năng mở rộng là để đo lường tại thời điểm đó tại sao ứng dụng ngừng mở rộng quy mô và xác định lý do đằng sau nó.

## Khả năng tương tác:
Tham số phi chức năng này kiểm tra một giao diện hệ thống phần mềm với các hệ thống phần mềm khác. Điều này được kiểm tra bằng **kiểm thử khả năng tương tác.**

> Kiểm thử khả năng tương tác là một loại kiểm thử để kiểm tra xem phần mềm có thể liên kết với các thành phần của phần mềm, các phần mềm khác hoặc hệ thống khác hay không.
> 
> Mục tiêu của kiểm thử khả năng tương tác là để chứng minh rằng chức năng đầu cuối giữa hai hệ thống giao tiếp là theo yêu cầu của tiêu chuẩn mà trên đó các hệ thống đó dựa vào.

## Hiệu quả:

Mức độ mà bất kỳ hệ thống phần mềm nào cũng có thể xử lý dung lượng, số lượng và thời gian phản hồi.

## Mềm dẻo:

Thuật ngữ này đề cập đến sự dễ dàng mà ứng dụng có thể làm việc trong các cấu hình phần cứng và phần mềm khác nhau. Giống như RAM tối thiểu, yêu cầu CPU.

## Tính di động:

Sự linh hoạt của phần mềm để có thể chuyển từ môi trường phần cứng hoặc phần mềm hiện tại của nó.

## Khả năng sử dụng lại:

Nó đề cập đến một phần của hệ thống phần mềm có thể được chuyển đổi để sử dụng trong một ứng dụng khác.


# 4. Loại kiểm thử

Nói chung, có ba loại kiểm thử

* Chức năng
* Phi chức năng
* Bảo trì

![](https://images.viblo.asia/05a98fee-da64-49ab-ae39-1096cf2b8bd8.png)

Trong các loại thử nghiệm này, có nhiều cấp độ KIỂM TRA, nhưng thông thường, mọi người gọi chúng là kiểm thử. Bạn có thể tìm thấy một số khác biệt trong phân loại ở trên hoặc qua sách, tài liệu tham khảo khác nhau.

Danh sách trên không hoàn chỉnh vì có hơn 100 loại kiểm thử. Đừng lo lắng, Bạn có nhiều thời gian đề tìm hiểu tất cả. Ngoài ra, lưu ý rằng không phải tất cả các loại kiểm thử đều áp dụng cho tất cả các dự án, việc đó còn tùy thuộc vào tính chất và phạm vi của dự án. Thông tin thêm về điều này sẽ có trong bài viết sau

# 5. Các loại kiểm thử phi chức năng
* Kiểm thử hiệu suất 
* Kiểm thử tải trọng
* Kiểm thử chuyển đổi dự phòng
* Kiểm thử bảo mật
* Kiểm thử khả năng tương thích
* Kiểm thử khả năng sử dụng
* Kiểm thử về áp lực
* Kiểm thử tính bền vững
* Kiểm thử khả năng mở rộng
* Kiểm thử khối lượng
* Kiểm thử phục hồi
* Kiểm thử tuân thủ
* Kiểm thử tính di động
* Kiểm thử tính hiệu quả
* Kiểm thửu độ tin cậy
* Kiểm thử đường cơ sở
* Kiểm thử độ bền
* Kiểm thử tài liệu
* Kiểm thử khôi phục
* Kiểm thử quốc tế hóa
* Kiểm thử bản địa hóa

# Tài liệu tham khảo
https://www.guru99.com/non-functional-testing.html