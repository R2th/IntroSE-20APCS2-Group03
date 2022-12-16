Bài viết được dịch từ nguồn:

https://www.stickyminds.com/article/use-rejected-defect-ratio-improve-bug-reporting


![](https://images.viblo.asia/da9a80ff-21e0-45b0-8ada-d920fa3d0877.jpg)

# Tóm lược: 
Có rất nhiều số liệu để thực hiện đo lường hiệu quả của tester. Một là tỷ lệ lỗi bị từ chối, hai là số bug report bị từ chối chia cho tổng số bug report được gửi (số bug reject report/ Total number bug report). Bạn có thể nghĩ rằng bạn muốn khi report bug thì bug không bị từ chối, tuy nhiên có một số lý do mà điều đó không nằm trong trường hợp của bạn. Hãy xem xét các loại bug bị từ chối, xem cách chúng đóng góp vào tỷ lệ lỗi bị từ chối và khám phá tý lệ phù hợp cho đội tester.

Có nhiều số liệu để đo lường hiệu quả của đội test. Một số liệu như vậy đó là tỷ lệ lỗi bị từ chối, nó cũng là số bug report bị từ chối chia cho tổng số lỗi được gửi.

Có ba loại lỗi bị từ chối:
+ Lỗi không thể sửa
+ Lỗi không chính xác
+ Lỗi trùng lặp.

Hãy nhìn lại các lỗi bị từ chối này, xem lại cách chúng góp phần vào tỷ lệ lỗi bị từ chối và khám phá tỷ lệ phù hợp cho team test của bạn. (Có thể bản thân mình nghĩ rằng mình không muốn report bug mà bug đó bị từ chối, có những lập luận về đội develop về lý do tại sao trường hợp đó không nằm trong trường hợp mà bạn nghĩ).

*Hãy bắt đầu với loại lỗi bị từ chối đầu tiên:*

# Lỗi không thể sửa
Có hai loại lỗi không thể sửa. Một là lỗi khó tái hiện. Nó có thể xảy ra là do sự tương tác giữa một vài tham số, một số trong đó thậm chí không nhận ra.

Vì dụ: Giả sử bạn nói rằng bạn đã chạy một số case liên tiếp và một trong những case mà bạn chưa biết đã làm thay đổi một tham số cấu hình từ giá trị mặc định là A, sang một giá trị khác là B. Lỗi chỉ xảy ra khi tham số cấu hình giữ giá trị là B và giá trị đầu vào là C. Khi đã cố gắng tái hiện lỗi, rất có thể bạn muốn bắt đầu từ trạng thái đã biết, vì vậy bạn sẽ khởi tạo lại hệ thống (hoặc có thể Clear Data). Vì vậy, lỗi sẽ không xảy ra, vì tham số cấu hình hiện tại giữ giá trị mặc định là A.

Một trường hợp khác của loại lỗi không thể sửa là khi test thử nghiệm thực sự thì phát hiện ra lỗi, nhưng một số dữ liệu bị thiếu thông tin tái hiện:
Step: Giá trị đầu vào cụ thể hoặc hiểu rằng lỗi chỉ xảy ra theo một thứ tự hành động nhất định.
=> Kết quả là tái hiện theo các bước trong mô tả thì không xảy ra lỗi.

Tuy nhiên, trong cả hai trường hợp trên, thực sự đã có defect trong sản phẩm!

Loại lỗi không thể sửa thứ hai là những lỗi không thể lặp lại vì không có lỗi. Tester có thể đã nhìn thấy một cái gì đó bất thường và hiểu sai về nó, hoặc hệ thống được sử dụng để kiểm tra có thể đã gặp phải một số vấn đề như thành phần phần cứng bị lỗi, trình điều khiển không tương ứng hoặc cài đặt quyền không chính xác. Mọi nỗ lực tái hiện lỗi trên hệ thống được xây dựng tốt đều thất bại.

Cả hai loại lỗi này thường được đóng trong hệ các thống báo cáo lỗi “Từ chối - không thể tái hiện.”

# Lỗi không chính xác

Những loại lỗi này là trường hợp tester nghĩ rằng sản phẩm nên hoạt động theo một cách nhất định và báo cáo lỗi khi hành vi của sản phẩm không đáp ứng mong đợi.

Các bug này thường được đóng trong hệ các thống báo cáo lỗi “Từ chối - không phải là bug” hoặc “Từ chối - bởi design” (Nó đã làm theo đúng hành vi của design rồi).

# Lỗi trùng lặp

Đây là những lỗi mà ai đó đã report và người nào đó report lại. Một lỗi chỉ là bản sao nếu các triệu chứng giống nhau. Nếu nguyên nhân gốc rễ là giống nhau nhưng triệu chứng giống nhau thì nó không phải là bị trùng lặp.

Các bug này thường được đóng trong hệ các thống báo cáo lỗi “Từ chối - trùng lặp”.

# Ảnh hưởng của Rejected bug đến team như nào?
Rõ ràng một lỗi không chính xác được report tạo ra sự lãng phí: Thời gian mà tester check đầu tư vào việc tái hiện lỗi, thời gian mà người tham gia xử lý lỗi đó đầu tư vào việc đọc và hiểu lỗi và thời gian mà các nhà phát triển đầu tư vào nó để cố gắng tái hiện một lỗi mà không thể khắc phục được hoặc trong việc sửa chữa (và hủy kết nối) một cái gì đó không cần sửa chữa để bắt đầu.

Ngoài thực tế là tỷ lệ lỗi bị từ chối (Sau này sẽ viết tắt là RDR) là thước đo sự kém hiệu quả của đội test, nó cũng nói lên điều gì đó về tính chuyên nghiệp của tester. Mỗi lỗi không thể tái hiện lại do thiếu chi tiết trong báo cáo có nghĩa là những người tester không tỉ mỉ trong báo cáo để đảm bảo rằng lỗi đó được tái hiện một cách đáng tin cậy bằng cách làm mà mình đã viết. Ngoài ra, đối với các lỗi không thường xuyên, tester cần ghi chú đầy đủ về tỷ lệ phát sinh lỗi thấp trong báo cáo của mình.

Một lỗi không chính xác cho thấy tester không thông thạo hoặc không hiểu rõ các yêu cầu của sản phẩm. Một lỗi trùng lặp cho thấy tester đã không thực hiện tìm kiếm tối thiểu trong cơ sở dữ liệu (phần mềm report bug của dự án) để kiểm tra xem lỗi đã được báo cáo hay chưa. Ngoài ra, điều đó có nghĩa là tester đã báo cáo lỗi trước tiên không bao gồm các từ khóa thích hợp trong tiêu đề để giúp những tester khác dễ dàng tìm thấy.

Khi có ai đó từ chối bug mà bạn report, bạn bị xúc phạm. Là không chuyên nghiệp. Một mặt, điều đó có nghĩa là bản thân bạn sẽ phải chiến đấu vì lỗi của mình. Khi bug bạn report bị từ chối, bạn cần trải qua một số bước như sau:

- Kiểm tra xem lỗi có thể tái hiện trên hệ thống của mình không và cập nhật các bước tái hiện xem có bị thiếu step nào hay không?
- Nếu sự thiếu hiểu lầm về spec là do yêu cầu không rõ ràng hoặc tài liệu không chính xác, nhấn mạnh lại là lỗi do tài liệu không chính xác và chỉ close bug đó khi mà tài liệu đã được cập nhật.
- Nếu nghĩ rằng hành vi của sản phẩm, trong khi đáp ứng các yêu cầu là không chính xác, cần thảo luận về các yêu cầu với đội BRSE và đội develop và hãy cố gắng thuyết phục họ rằng các yêu cầu cần được cập nhật.
- Nếu lỗi bị từ chối là bị trùng lặp, cần đảm bảo rằng nó không được gắn thẻ theo cách đó do nguyên nhân gốc rễ của vấn đề.

Mặt khác, bạn cần phải cẩn thận hơn khi report bug. Nếu không hoàn toàn chắc chắn rằng cái mà mình phát hiện ra là một defect, bạn cần đầu tư thêm thời gian để tái hiện cẩn thận trước khi báo cáo. Bạn nên hỏi người trong team của mình xem mình đã hiểu đúng vấn đề hay chưa hoặc kiểm tra xem lỗi có thể tái hiện trên thiết bị của người khác hay không?

# The Case against No Rejected Bugs

Đội tester nên theo dõi và cố gắng giảm mức độ RDR. Câu hỏi là, mức độ nào của RDR là một mục tiêu tốt?

Về mặt này, có vẻ như 0% là một mục tiêu tốt, nhưng có thể có người sẽ không đồng ý. Vì một mức RDR nhất định thực sự lành mạnh khi RDR quá gần bằng 0, nhóm tester phải chịu những vấn đề không kém phần đáng lo ngại so với RDR cao.

Đội test sẽ phải đầu tư nỗ lực để đạt được RDR rất thấp. Mọi lỗi bị từ chối sẽ được phân tích để tìm ra lỗi sai và mọi người test đã báo cáo lỗi mà bị từ chối sẽ cần phải giải thích điều gì đã xảy ra và làm thế nào để tránh lỗi này trong tương lai. Kết quả sẽ là tester chỉ báo cáo các lỗi mà họ hoàn toàn chắc chắn.

Nếu bạn nhận thấy một hành vi mà cho là làm tổn thương tính khả dụng của sản phẩm, cần chấp nhận hành vi đó thay việc giải thích tại sao cần mở một lỗi trên một thứ được xác định là yêu cầu. Nếu có bằng chứng cho thấy có lỗi xảy ra nhưng không có kịch bản tái hiện tốt, không muốn báo cáo; thì bạn cũng không cần phải đau buồn. Nếu bạn gặp phải một lỗi nghiêm trọng nhưng tần suất thấp, bạn có thể quyết định không báo cáo vì các lỗi thấp không phải lúc nào cũng được sửa, vậy tại sao rủi ro báo cáo một cái gì đó cuối cùng có thể bị từ chối?

Nói tóm lại, việc phấn đấu cho RDR rất thấp sẽ tạo ra căng thẳng không lành mạnh trong nhóm tester và làm tăng khả năng một số lỗi sẽ không được báo cáo.

Việc mà tester cần phải làm: Không chỉ báo cáo các lỗi rõ ràng mà còn cảnh báo dự án về mọi tình huống có vẻ đáng ngờ. Tester cần có tầm quan trọng cao trong việc đảm bảo không có lỗi nào thoát được, thậm chí với chi phí của một số lỗi báo cáo trùng lặp - tốt hơn tester nên dành một giờ để kiểm tra xem lỗi mà họ vừa xác định đã được báo cáo hay chưa, vì hậu quả của báo cáo dư thừa. Là một tester bạn cần phải giữ một tâm thế thoải mái khi đặt các câu hỏi bằng văn bản liên quan đến kiến trúc hoặc các thông số kỹ thuật được yêu cầu, ngay cả khi điều đó có nghĩa là một số lỗi của tester sẽ được gắn thẻ như là “không phải bug”.

Tester không nên sợ mắc lỗi ở mọi thời gian. Điều đó có nghĩa là chúng ta cần giữ một trạng thái cân bằng và một số mức RDR được coi là hợp lý.

# Tìm tỷ lệ lỗi bị loại bỏ tối ưu

Quy tắc ngón tay cho RDR là 15%. Giá trị này dựa trên kinh nghiệm khi làm việc với vai trò là tester đó là đội làm việc theo nhóm tốt và có hiệu quả. Đây là RDR trong một số dự án liên tiếp, trong khi một số nhóm khác làm việc trong cùng các dự án và song song mặc dù ít hiểu biết về sản phẩm và được coi là kém hiệu quả hơn với 30% RDR.

Giá trị đánh giá ở trên có vẻ là không minh bạch. Nó chắc chắn là không khoa học. 10% hay 20% hay 30% hoặc đạt mục tiêu ở mức 5% đều là có vấn đề.

Cuối cùng, đó là một quyết định cục bộ nên được đưa ra bởi nhóm tester dựa trên sản phẩm, mức độ chuyên môn của team, mô hình phát triển, chất lượng của nhóm phát triển.v.v.Bạn nên theo dõi RDR của mình và đưa ra quyết định xem có cần phải làm gì đó chủ động về nó không? Nếu nó quá cao hoặc quá thấp, cần phải đưa ra hành động để khắc phục.