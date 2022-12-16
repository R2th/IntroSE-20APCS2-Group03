### Nguyên tắc Pareto trong kiểm thử phần mềm

![](https://images.viblo.asia/bc405ae6-d729-4d0d-bfbf-40c2f4a6bff2.jpg)

Theo như nguyên tắc Pareto thì **20% nỗ lực mang lại 80% kết quả, và 80% nỗ lực còn lại thì chỉ mang lại 20% kết quả** mà thôi.

Người đầu tiên khám phá ra mô hình này là Vilfredo Pareto, một nhà kinh tế Ý. Ông đã kết luận rằng 80% tất cả các tài sản ở Ý chỉ thuộc về 20% dân số. Ông ấy cũng cũng gợi ý rằng mô hình này cũng có thể được tìm ra ở nhiều khu vực khác nữa.

Cuối cùng thì, nguyên tắc này nhận được cái tên là “Nguyên tắc Pareto” và đã được áp dụng vào một số lĩnh vực và ngành công nghiệp khác nhau. Và đảm bảo chất lượng (QA) cũng không phải là một ngoại lệ.

![](https://images.viblo.asia/3adf7da9-e7bb-40c5-b2b6-421bfd4f8dc8.jpg)

Trong kiểm thử phần mềm, nguyên tắc Pareto được hiểu là **“80% của tất cả các lỗi có thể được tìm thấy trong 20% modules chương trình”.** Hơn nữa, một nửa các modules có thể không chưa bug nào. 

Tất nhiên, các con số là gần đúng và tỷ lệ thực tế có thể là 30% và 70%, vv. Ý tưởng là sự phân bổ của các trục trục trặc của phần mềm (software glitches) là không như nhau, và chúng thường được tập trung ở 1 phần nhất định nào đó trong code mà thôi. Đặc biệt, nó là điển hình đối với khiếm khuyết nghiêm trọng nhất.

Áp dụng nguyên tắc Pareto và các hoạt động QA giúp cho chúng ta giảm thời gian kiểm thử và tăng hiệu suất. Nhưng bạn nên biết sử dụng nó như thế nào và khi nào để đạt được những kết quả tốt hơn. 

Đây là những cách để áp dụng nguyên tắc Pareto trong kiểm thử phần mềm:
* Thử sắp xếp các khiếm khuyết theo nguyên nhân gây ra chúng chứ không phải hậu quả mà chúng gây ra. Có nghĩa là bạn không nên nhóm các lỗi mà cùng gây ra các kết quả giống nhau. Tốt hơn là nhóm các vấn đề mà xảy ra trong cùng module.
* Phối hợp với các dev để tìm ra những cách mới để nhóm những vấn đề này. Ví dụ, họ có thể sử dụng một thư viện cơ bản giống nhau cho các modules mà nơi hầu hết các lỗi đã được tìm thấy ở đó.
* Sử dụng thời gian và nỗ lực đủ để xác định các vùng vấn đề trong code hơn là tìm các lỗi ngẫu nhiên.
* Đánh độ ưu tiên cho các testcase để bắt đầu kiểm thử với những testcases có độ ưu tiên quan trọng nhất.
* Phân tích phản ánh của người dùng. Nó sẽ giúp chúng ta xác định được những vùng rủi ro một cách khá tốt. 

Nguyên tắc Pareto yêu cầu các kỹ năng phân tích và logic tốt. Nhưng nó có thể là một công cụ rất là hữu ích trong việc giảm số lượng lỗi đồng thời giảm nỗ lực kiểm thử phần mềm tổng thể.

### Luật 80/20 trong kiểm thử hiệu năng

![](https://images.viblo.asia/9eb31c19-fc42-48e3-b080-531272a5c7bf.png)

Luật 80/20 được biết đến như là nguyên tắc Pareto, khẳng định rằng đối với nhiều thứ thì 80% của hiệu suất nhận được từ  20% nguyên nhân.

Kịch bản kiểm thử chịu tải có thể là một ví dụ tuyệt vời của Pareto. Cấu hình kiểm thử chịu tải là một việc khó khăn. Có hàng tấn các thông số bạn có thể điều chỉnh để đạt được các loại hành vi và mô phỏng người dùng mà bạn mong muốn.

Nhiều người tiếp cận kiểm thử chịu tải với tham vọng mô phỏng thực tế một cách hoàn hảo trong kiểm thử chịu tải của họ, vì vậy họ sẽ tìm hiểu một cách chính xác xem có bao nhiêu người dùng thực mà hệ thống của họ sẽ có thể xử lý được.

Thật không may là, sự mô phỏng thực tế là không dễ dàng gì, nó mất rất nhiều thời gian và nỗ lực để thiết lập lên một sự kiểm thử như thế, và thậm chí có nỗ lực nhiều lần cũng vẫn chưa đủ và bỏ lỡ một số khía cạnh quan trọng mà làm cho mô phỏng trở nên không thực tế.

Kết quả cuối cùng có thể là một kiểm thử chịu tải cực kỳ tốn tiền và/hoặc tốn thời gian nhưng nó thậm chí có thể không mang lại cho bạn kết quả như mong muốn. Các tổ chức mà dành hàng tấn thời gian và tiền bạc cho một kiểm thử chịu tải thì không có khả năng thực hiện bất kỳ kiểm thử chịu tải nào trừ khi nó là cần thiết.

Thông thường thì điều này sẽ xảy ra ngay trước khi sản phẩm được phát hành, khi mà có ít thời gian để sửa chữa bất kỳ vấn đề nào được tìm thấy và chi phí sửa chữa những vấn đề được tìm thấy ở thời điểm muộn như vậy sẽ khá cao.

### Kiểm thử đơn giản và bắt đầu sớm
Đây là nơi Nguyên tắc Pareto rơi vào bối cảnh: nếu bạn không cố gắng mô phỏng thực tế một cách hoàn hảo, thì cấu hình của bạn sẽ đơn giản hơn rất nhiều. Bạn có thể tránh được việc chỉ dành 20 phần trăm nỗ lực để thiết lập nên kiểm thử chịu tải.

Kết quả bạn nhận được có thể không phải cụ thể cho bạn biết chính xác có bao nhiêu người dùng mà trang web của bạn có thể xử lý, nhưng có thể nó sẽ cho bạn biết nếu hiệu năng của bạn không đạt mục tiêu và có thể cho bạn thấy các điểm tắc nghẽn hiệu năng.

Bởi vì việc thử nghiệm là đơn giản hơn nhiều để cấu hình và chạy, bạn có thể chạy nhiều thử nghiệm hơn ở các giai đoạn phát triển khác nhau và học được nhiều thứ tổng hợp hơn so với những gì mà bạn đã học được từ một thử nghiệm đơn lẻ.

Việc có thể chạy nhiều thử nghiệm sớm hơn giúp chúng ta có thể phát hiện và sửa chữa các vấn đề về hiệu năng sớm hơn và sửa chữa càng sớm bao nhiêu thì thường tiết kiệm thời gian phát triển cũng như giúp giảm thiểu tổng chi phí dự án. Việc kiểm thử thường xuyên hơn cũng sẽ giúp cho một nhóm phát triển tự tin hơn và tham gia nhiều hơn vào việc nâng cao hiệu năng sản phẩm. 

### Những kinh nghiệm tốt nhất cho kiểm thử chịu tải
Có rất nhiều ý tưởng trừu tượng, mượt mà, bạn thực sự làm nó như thế nào?

1. Chính xác thì nơi có thể cắt giảm sự phức tạp trong kiểm thử chịu tải của bạn sẽ phụ thuộc vào tình huống cụ thể của bạn, nhưng điều đó có nghĩa là bạn có thể muốn sử dụng một phiên bản đơn giản của hành vi người dùng khi thiết kế kiểm thử chịu tải của mình.

1. Người dùng được mô phỏng trong thử nghiệm của bạn có thể có hành vi tĩnh hơn rất nhiều so với một người dùng thực tế, có lẽ chỉ cần truy cập vào một chuỗi các trang hoặc nội dung không ngẫu nhiên. Hoặc bạn có thể yêu cầu người dùng mô phỏng truy cập vào một trang được chọn một cách ngẫu nhiên trên trang web của bạn, bỏ qua thực tế là một số trang được truy cập nhiều hơn các trang khác.

1. Nếu bạn đang kiểm thử một ứng dụng dựa trên API (kiểu như ứng dụng trên thiết bị di động), bạn có thể thấy tốt hơn là không quan tâm đến các luồng người dùng và thay bằng việc thử thực hiện các điểm cuối API, dưới dạng hỗn hợp hay thậm chí là riêng lẻ.

1. Nếu bạn biết có bao nhiêu cuộc gọi mỗi giây điểm cuối API "X" sẽ có 1.000 người dùng đồng thời, bạn có thể chạy một thử nghiệm chịu tải mà nó sinh ra số lượng yêu cầu đó trên mỗi giây và xem liệu back end của bạn có thể xử lý nó không và nút thắt cổ chai sẽ xuất hiện ở đâu trong hệ thống của bạn. Sau đó làm tương tự với mỗi điểm cuối (tất nhiên là bạn có thể thực hiện nhiều điểm cuối trong cùng một thử nghiệm nếu muốn).

1. Thường thì bạn sẽ không nhận được nhiều thông tin bổ sung từ việc mô phỏng chính xác các luồng người dùng, và nó làm phức tạp cấu hình kiểm thử chịu tải một cách đáng kể. Thử nghiệm đơn giản nhất một cách tuyệt mà bạn có thể làm chỉ là gõ một điểm cuối API duy nhất ở một thời điểm. Nó rất dễ để cấu hình, nhưng nếu chạy loại thử nghiệm đó liên tục cho mỗi điểm cuối quan trọng và từ giai đoạn đầu trong quá trình phát triển ứng dụng của bạn, sẽ làm cho bạn tự tin về hiệu năng của mình đến thời điểm phát hành. 

### Xây dựng mô phỏng thực tế
Khi chạy các thử nghiệm phức tạp hơn thì chắc chắn sẽ đem lại những giá trị nào đó, nhưng nếu bạn không chạy các thử nghiệm tải trọng và chịu tải đơn giản hơn, thường xuyên hơn, thì có lẽ bạn nên bắt đầu nó trước khi thực hiện các thử nghiệm quy mô lớn, phức tạp mô phỏng thực tế một cách chặt chẽ. 

Các thử nghiệm đơn giản như sau:

* Chạy các thử nghiệm đơn giản có nghĩa là mỗi thử nghiệm sẽ đòi hỏi ít thời gian và công sức hơn
* Ít thời gian và công sức hơn cho mỗi thử nghiệm có nghĩa là bạn có thể chạy nhiều thử nghiệm hơn
* Nhiều thử nghiệm hơn mang tới cho bạn nhiều cơ hội hơn để lặp lại và tối ưu hóa thiết lập thử nghiệm
* Các thử nghiệm càng nhỏ cũng cho phép bạn chạy thử nghiệm sớm hơn trong quá trình phát triển, nắm bắt các sự cố sớm hơn và giảm cả chi phí sửa chữa sự cố và rủi ro giao hàng không đúng hạn :D

Chạy nhiều thử nghiệm đơn giản hơn sẽ dạy cho bạn cách thực hiện bài kiểm tra quy mô lớn, phức tạp hơn tốt hơn (kiểu làm nhiều cái nhỏ OK rồi thì thực hiện cái quy mô lớn sẽ có kinh nghiệm hơn, trơn tru hơn ý):

* Bạn sẽ hiểu rõ hơn là loại lưu lượng nào gây sức ép lên backend và loại nào không
* Bạn sẽ thấy backend phản ứng lại như thế nào và biết được nơi để tìm kiếm, chức năng nào để sử dụng và nói chung là làm thế nào để tận dụng tối đa thử nghiệm của bạn
* Điều này có nghĩa là đến lúc thực hiện một kiểm thử quy mô lớn, phức tạp, thì bạn sẽ được chuẩn bị tốt hơn để làm nó. Thử nghiệm chịu tải lớn, có rủi ro cao sẽ trở thành rủi ro nhỏ hơn và thấp hơn bao giờ hết.

### Đừng để hoàn hảo là kẻ thù của sản phẩm
Chủ nghĩa hiện thực là một mục tiêu tốt, nhưng đừng đánh mất sự đánh đổi. Nếu bạn chờ cho đến khi có một mô phỏng hoàn hảo, bạn sẽ bỏ lỡ các cơ hội để sửa các sự cố. 

Thay vào đó, hãy tìm cách bắt đầu với kiểm thử đơn giản và sau đó thì xây dựng nên các mô phỏng phức tạp hơn.

Hãy nhớ rằng kiểm thử sớm cũng không phải là một loại thuốc chữa bách bệnh. Các vấn đề có thể được phát sinh muộn trong quá trình phát triển phần mềm và việc kiểm thử liên tục có thể tránh được các bản sửa lỗi vào phút cuối cùng.

Cuối cùng, hãy nhớ rằng bạn một lượng thời gian giới và một lịch trình khắt khe. Nếu bạn có thể đạt được 80% kết quả với 20% công việc, thì bạn sẽ có nhiều thời gian hơn để giải quyết các vấn đề cấp bách khác đấy.

Hi vọng qua bài viết này mỗi QA sẽ chỉ cần dùng 20% nỗ lực để đạt được 80% hiệu năng trong quá trình kiểm thử phần mềm nhé!

**Bài viết được dịch từ link:**

http://blog.qatestlab.com/2011/02/25/pareto-principle-in-software-testing/
https://techbeacon.com/app-dev-testing/when-should-i-start-load-testing