Ở bài viết trước chúng ta đã biết thế nào là XP, các vai trò và giá trị cốt lõi của nó. Chúng ta cũng biết được rằng, khác với Scrum, khi scrum tập trung vào ưu tiên công việc và tốc độ phản hồi, thì XP lại tập trung vào các thực hành tốt về phát triển phần mềm mà chúng ta hay gọi là best practice. Ở bài viết này, chúng ta sẽ được tìm hiểu những best practice của XP - lập trình cực hạn.

### Những thực hành cốt lõi của XP ###

Phương pháp XP dựa trên 13 thực hành cốt lõi, tuy đơn giản nhưng rất mạnh mẽ, được mô tả dưới đây. Chúng ta sẽ xem xét chi tiết hơn từng phương pháp này, bắt đầu từ vòng ngoài cùng và đi dần vào trong.

![](https://images.viblo.asia/867c341b-adcd-48d6-9791-7185bb868af0.JPG)

**Toàn đội (Whole team)**

Thực hành “toàn đội” là một ý tưởng mà tất cả những người có đóng góp vào dự án ngồi cùng với nhau ở một khu vực, như là các thành viên của một đội đơn lẻ. XP nhấn mạnh khái niệm tổng quát hóa các chuyên môn, trái ngược với chuyên môn hóa các vai trò. Nói cách khác, bất kỳ ai có đủ điều kiện để thực hiện một vai trò nào đó, đều có thể đảm nhận nó - vai trò này không dành riêng cho những người chuyên về một lĩnh vực cụ thể. Thực hành này giúp tối ưu hóa việc sử dụng các nguồn lực, vì những người đa năng, có thể chuyển từ vai trò này sang vai trò khác khi có nhu cầu phát sinh. Thực hành này cũng cho phép chia sẻ thông tin hiệu quả hơn và giúp loại bỏ khả năng những người ở một số vai trò nhất định sẽ nhàn rỗi hoặc làm việc quá sức tại một số thời điểm nhất định trong dự án.

**Lập kế hoạch (Planning Games)**

XP có hai hoạt động lập kế hoạch chính là lập kế hoạch phát hành và lập kế hoạch cho vòng lặp.

Phát hành (Release) là quá trình đẩy những chức năng mới của sản phẩm cho người dùng cuối. Thông thường mỗi dự án có một hoặc nhiều đợt phát hành, với không quá hai lần phát hành trong một năm. Trong quá trình lập kế hoạch phát hành, khách hàng sẽ phác thảo ra những chức năng cần thiết, dựa vào đó, lập trình viên sẽ đưa ra ước tính cho độ phức tạp của những chức năng này. Dựa trên những ước tính này, cùng với độ ưu tiên, khách hàng sẽ xây dựng kế hoạch phát hành cho dự án. Do những ước tính ban đầu có thể không chính xác, nên quá trình này sẽ được xem lại thường xuyên và cải thiện khi độ ưu tiên và các ước tính thay đổi.

 Vòng lặp (Iteration) là những chu kỳ phát triển ngắn nằm bên trong 1 đợt phát hành, mà ở Scrum gọi là "sprint". Kế hoạch vòng lặp (Iteration planning) được hoàn thành tại thời điểm bắt đầu của mỗi vòng lặp. Khách hàng sẽ giải thích những chức năng nào họ muốn có ở vòng lặp tiếp theo, rồi lập trình viên sẽ chia nhỏ chức năng đó ra thành các tác vụ và ước tính nó. Dựa trên ước tính đó (Được tính chỉnh hơn những ước tính khi lập kế hoạch phát hành) và khối lượng công việc đã hoàn thành ở vòng lặp trước, đội phát triển cam kết những tác vụ mà họ có thể hoàn thành trong thời gian 2 tuần.							

**Phát hành nhỏ (Small Releases)**

Những đợt phát hành nhỏ lên môi trường kiểm định thường xuyên được khuyến khích trong XP, bao gồm cả mức vòng lặp - để thể hiện tiến độ và gia tăng tính trực quan đối với khách hàng, và mức độ phát hành để triển khai nhanh chóng sản phẩm đến người dùng cuối. Chất lượng được duy trì trong các đợt phát hành nhỏ được đảm bảo thông qua việc kiểm định kỹ lưỡng và các thực hành như CI (tích hợp liên tục) - được chạy thường xuyên nhất có thể.


**Khách hàng kiểm thử (Customer Test)**

Là 1 phần của việc xác định các chức năng cần thiết, khách hàng sẽ mô tả 1 hoặc nhiều tiêu chí kiểm thử để đánh giá sản phẩm hoạt động đúng như mong đợi hay không. Đội phát triển sẽ xây dựng chương trình kiểm thử tự động để chứng minh với bản thân cũng như khách hàng thấy sản phẩm đáp ứng được các tiêu chí.

**Quyền sở hữu code tập thể (Collective Code Ownership)**

Trong XP, bất kỳ cặp lập trình viên (pair developers) nào cũng có thể cải thiện và sửa code của bất kỳ ai. Điều này có nghĩa là nhiều người sẽ cùng làm việc trên tất cả code, và kết quả là tăng tính tương quan và kiến thức rộng hơn về code cơ bản. Thực hành này sẽ mang đến chất lượng code cao khi có nhiều người cùng xem 1 đoạn code, và sẽ có nhiều hơn cơ hội để phát hiện ra những thiếu sót. Điều này cũng giảm thiểu tác động đến dự án khi một lập trình viên rời đi, do kiến thức đã được chia sẻ từ trước.

**Tiêu chuẩn code (Code Standards)**

Mặc dù việc sở hữu code tập thể có những lợi ích của nó, nhưng việc cho phép bất cứ ai có thể sửa đổi code có thể dẫn đến vấn đề nếu các thành viên trong đội dự án có cách code khác nhau. Để giải quyết rủi ro này, đội XP tuân theo 1 tiêu chuẩn code nhất quán và điều này sẽ làm cho tất cả code giống như được code ra bởi 1 lập trình viên kinh nghiệm duy nhất. Chi tiết tiêu chuẩn của mỗi đội không quan trọng, quan trọng là toàn đội nhất quán cách code. 

**Tốc độ bền vững (Sustainable Pace)**

XP nhận ra rằng 1 đội hoạt động với tốc độ bền vững, ổn định sẽ đạt được năng suất cao nhất. Mặc dù thời gian làm ngoài giờ đôi khi là cần thiết, tuy nhiên nếu lặp lại trong 1 thời gian dài thì sẽ không bền vững và phản tác dụng. Việc duy trì nhịp độ bền vững, ổn định sẽ giúp tối ưu hóa việc phát hành với giá trị lâu dài. 

**Phép ẩn dụ (Metaphor)**

XP sử dụng những ẩn dụ và so sánh để giải thích thiết kế và tạo ra 1 tầm nhìn kỹ thuật chung. Những mô tả đó tạo ra sự so sánh mà tất cả bên liên quan có thể hiểu, từ đó có thể giải thích được hệ thống hoạt động như thế nào. Ví dụ, "Module thanh toán giống như 1 kế toán đảm bảo các giao dịch được nhập vào tài khoản tương ứng và số dư được tạo ra"				
Ngay cả khi đội không thể nghĩ ra 1 phép ẩn dụ hiệu quả để mô tả điều gì đó, họ có thể sử dụng 1 bộ tên chung cho các phần tử khác nhau để đảm bảo mọi người hiểu được các thay đổi nên được áp dụng ở đâu và tại sao.

**Tích hợp liên tục (Continuous Integration)**

Tích hợp đề cập đến việc gắn kết các đoạn code lại với nhau và đảm bảo rằng chúng có thể biên dịch (compile) và hoạt động cùng nhau.	
Thực hành này rất quan trọng, vì nó đưa ra các vấn đề trước khi nhiều code hơn được xây dựng trên thiết kế bị lỗi và không tương thích.	
	
XP sử dụng tích hợp liên tục, điều này có nghĩa là mỗi khi lập trình viên hợp nhất code vào kho chứa (điều này thường xảy ra vài lần trong 1 ngày) thì việc kiểm tra tích hợp sẽ được thực hiện tự động. Những bài kiểm tra này sẽ chỉ ra những chỗ bị lỗi hoặc những vấn đề khi tích hợp, và các vấn đề này có thể được giải quyết ngay lập tức.

**Phát triển hướng thử nghiệm (Test-Driven Development)**

Kiểm định là 1 phần quan trọng của phương pháp XP. Để đảm bảo việc kiểm định đã bao hàm đầy đủ và các vấn đề được phát hiện sớm trong giai đoạn phát triển, đội XP thường sử dụng thực hành "phát triển hướng thử nghiệm". Với cách tiếp cận này, đội sẽ viết kiểm tra chấp thuận (acceptance test) trước rồi mới phát triển code mới.				
				
Nếu bài kiểm tra hoạt động đúng, code ban đầu sẽ lỗi, vì chức năng yêu cầu vẫn chưa được phát triển. Code chỉ được thông qua khi mà nó được viết đúng. Quy trình phát triển hướng kiểm thử cố gắng rút ngắn chu kỳ kiểm thử-phản hồi nhiều nhất có thể để đạt được lợi ích của việc nhận được phản hồi sớm.

**Tái cấu trúc (Refactoring)**

Tái cấu trúc là quá trình cải thiện thiết kế của code hiện có mà không làm thay đổi kết quả của nó hoặc thêm vào chức năng mới. Nếu hệ thống luôn được duy trì một thiết kế tốt, việc đưa ra những thay đổi hoặc thêm những tính năng mới sẽ dễ dàng hơn. Tái cấu trúc  tập trung vào việc bỏ đi những đoạn code bị lặp, giảm sự phụ thuộc (sự phụ thuộc giữa các module code) và tăng tính liên kết.	

**Thiết kế đơn giản (Simple Design)**

Bằng cách tập trung vào việc giữ cho thiết đơn giản nhưng đầy đủ, đội XP có thể phát triển code nhanh chóng và đảm bảo tính thích ứng khi cần thiết.	
Thiết kế sẽ luôn được giữ ở trạng thái phù hợp với yêu cầu của dự án ở thời điểm hiện tại. Sau đó sẽ được thường xuyên xem lại và cải thiện để đảm bảo nó vẫn phù hợp.	
XP tuân theo triết lý thiết kế với câu hỏi "Thứ đơn giản nhất có thể hoạt động là gì?",  đối lập với những cấu trúc phức tạp cố gắng đáp ứng tính linh hoạt có thể có trong tương lai. Bởi vì việc code phình to ra và phức tạp đã dẫn đến nhiều dự án thất bại, do đó thiết kế đơn giản cũng được xem như 1 chiến lược giảm thiểu rủi ro.

**Lập trình theo cặp (Pair Programming)**

Trong XP, code sản phẩm được viết bởi 2 lập trình viên làm việc thành 1 nhóm. Trong khi 1 người viết code, thì người còn lại duyệt code đang được viết, và 2 người  thường xuyên đổi vai trò cho nhau. Thực hành này có vẻ như không có hiệu quả,  nhưng XP cho rằng nó giúp tiết kiệm thời gian vì làm việc nhóm giúp phát	hiện ra vấn đề sớm hơn và nó cũng có lợi ích khi mà 2 người thì sẽ có nền tảng kiến thức rộng hơn. Làm việc cặp cũng giúp lan truyền kiến thức về dự án trong cả đội.

Bằng việc tiếp cận có kỷ luật và nghiêm ngặt để áp dụng các thực ở trên, XP team đã thành công trong việc mang lại những sản phẩm có chất lượng cao.