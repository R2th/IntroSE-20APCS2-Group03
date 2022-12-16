Bài viết được tham khảo từ nguồn:
https://www.stickyminds.com/article/integrating-security-and-testing-practices

**Summary:**
QA và bảo mật thông tin sử dụng các phương pháp khác nhau để tiếp cận các mục tiêu giống nhau. Khi cả hai nhóm làm việc cùng nhau, họ có thể tạo ra tác động lớn hơn đến tính bảo mật của các sản phẩm. Dưới đây là cách team QA có thể cộng tác với infosec để thực hiện các tiêu chuẩn bảo mật gắt gao, ưu tiên những gì cần kiểm tra và nhận phản hồi nhanh hơn về các quy trình, cuối cùng sẽ thấy ít sự cố trên product hơn liên quan đến bảo mật.

![](https://images.viblo.asia/85c4ded8-f1ac-489c-973f-2c2abb7b215c.png)

QA thường được yêu cầu làm chệch hướng một số phần trăm lỗi, điều đó có nghĩa là nghĩa vụ của QA là kiểm tra để có thể tìm thấy càng nhiều lỗi khác nhau càng tốt. Hầu hết chúng ta thấy không có gì phải bàn cãi khi theo đuổi một loạt các trường hợp thử nghiệm, trải dài từ những dự kiến bằng kinh nghiệm cho đến bất ngờ gặp phải không theo một tiêu chí nào cả, và thậm chí có thể là các trường hợp độc hại.

Nhưng có bao nhiêu người trong chúng ta cảm thấy thoải mái khi ngồi đối diện với auditor và nói về security testing? Tình huống này QA thường gặp nhiều lần trong ngành của mình. Nỗi sợ hãi đó là đặc biệt có thật nếu công ty không có yêu cầu bảo mật vững chắc, hoặc không áp dụng chúng cho mọi dự án. QA cần nói chuyện với bảo mật thông tin để đảm bảo chúng tôi có quyền.

Team security có một vấn đề: Làm thế nào họ có thể đảm bảo rằng các yêu cầu bảo mật được đáp ứng? Kiểm tra thâm nhập, các nhóm màu đỏ và quét động là tất cả các cách gắt gao để tìm ra các lỗ hổng trong phần mềm của bạn, nhưng chúng thường được áp dụng sau khi phát hành, khi phần mềm đã có sẵn cho người dùng. Các công cụ phân tích tĩnh cung cấp một số tùy chọn dễ dàng hơn trong việc tái hiện và chứng nhận cho QA có được các tiêu chuẩn về bảo mật nếu các sản phẩm được chứng nhận là hợp lý.

Tất cả những thứ đó đều là những thực hành tốt, nhưng có lẽ điều đó là chưa đủ. Nhiều lỗi bảo mật đã xuất hiện sau khi release, gây ra sự tức giận cho khách hàng. Đó là cơ hội lớn để nâng cao thêm giá trị cho Team security.

Có lẽ nhiều người đã tìm thấy mình dưới cương vị là một member trong team security từ vài năm trước: Với một lỗi bảo mật mới, business có sẵn cho lý do tại sao team security nên dành thời gian để tập trung vào việc tìm kiếm thêm chúng và rất ít kiến thức về cách thực hiện hiệu quả. Vì vậy team cần có kinh nghiệm thực tế dựa trên rủi ro (Risk-based testing), nhưng team không biết tại thời điểm nào để cách ly rủi ro bảo mật. Đó là thời gian để xây dựng kỹ năng. Vì vậy việc tham gia các lớp học, nghiên cứu và nói chuyện với infosec là điều cần thiết. Ở đó team học được những điều cơ bản của mô hình mối đe dọa.

Tester (QA) đã biết rằng nếu bạn chỉ kiểm tra nơi bạn nghĩ có thể có vấn đề, bạn sẽ bỏ lỡ những sai sót tinh vi có thể trở nên quan trọng trong phần mềm. Các thực tiễn RBT điển hình không bao gồm các mối quan tâm về bảo mật và thường mất nhiều hơn một cái nhìn khó hiểu về kiến trúc của dự án. Vấn đề là trước tiên phải kiểm tra các ưu tiên cao nhất, vì vậy nếu một thực hành RBT (Risk-based testing) không phải là bắt các ưu tiên cao nhất, thì thực tế đó là thiếu sót nghiêm trọng. Thêm một mô hình mối đe dọa sẽ cho một bức tranh hoàn chỉnh hơn nhiều và hoàn toàn có thể cải tổ lại độ ưu tiên cho quá trình test.

Bắt đầu bằng cách có được một sơ đồ luồng dữ liệu cho hệ thống đang được test. Đối với mục đích của bài viết này, hãy để sử dụng một ứng dụng web mẫu, bao gồm đăng nhập, truy vấn cơ sở dữ liệu và khả năng in báo cáo được tạo. Nếu yêu cầu ưu tiên chỉ dựa trên điều đó thì chúng ta có thể tiếp cận đăng nhập trước, được thúc đẩy bởi kinh nghiệm với các hệ thống xác thực lỗi, sau đó là truy vấn cơ sở dữ liệu.

Áp dụng một phương pháp mô hình hóa mối đe dọa, không có vấn đề gì khi bạn sử dụng, miễn là nó hoạt động cho hệ thống của bạn và công ty của bạn cho thấy rằng trong khi chúng tôi có thể đã chọn chức năng đăng nhập là rủi ro cao nhất dựa trên cảm giác và kinh nghiệm thực tế, thì thực tế ưu tiên cao nhất là bảo vệ dữ liệu nhạy cảm của khách hàng. Ngoài ra, tất cả các mục ưu tiên cao nhất đều được tìm thấy bởi mô hình mối đe dọa, không phải ma trận RBT ban đầu.

Chúng tôi cần một cách để ưu tiên chúng hơn nữa, để tận dụng tốt nhất các nguồn lực hạn chế. Đây là một loại dịch chuyển trái khác: không di chuyển QA lên chuỗi phát triển, mà là giới thiệu thử nghiệm bảo mật sớm hơn so với khi bắt đầu.

Câu trả lời đã được tìm thấy trong các tiêu chuẩn bảo mật gắt gao. Ngành phần mềm có các quy định gắt gao thúc đẩy chính xác những gì chúng ta cần làm, nhưng ngay cả khi không có quy định, các mô hình như Top Ten của OWASP và Top 25 của CWE có thể đưa ra một danh sách các lỗ hổng được đánh giá và xóa khỏi phần mềm. Chúng tôi thấy rằng mỗi điểm của một tiêu chuẩn và mỗi mục trong danh sách được tạo ra ít nhất một trường hợp thử nghiệm. Phát triển các trường hợp thử nghiệm chung từ các tiêu chuẩn đó để cho phép những người thử nghiệm khác dễ dàng truy cập vào các yêu cầu và bắt đầu thực hiện chúng.

Tất nhiên, chúng ta có thể bỏ qua các thử nghiệm chức năng của mình để tập trung nghiêm ngặt vào bảo mật! Điều này bổ sung rất nhiều trường hợp thử nghiệm và chúng thường là các chức năng mất cả chuyên môn và thời gian. Một nguyên tắc nhanh chóng phát hiện ra rằng một người không thể hỗ trợ mọi dự án và những người thử nghiệm khác trong nhóm không được đào tạo để làm những điều cơ bản mà không có hướng dẫn.

Giải pháp của chúng tôi là một lần nữa hợp tác. Đội bảo mật thông tin đã bắt đầu một chương trình bảo vệ an ninh và team size đã tăng gấp đôi. Những người khác đã đảm nhận vai trò trong các bộ phận khác của tổ chức, và điều đó dẫn đến một con đường mới cho những người thử nghiệm để có được thông tin quan trọng. Chúng tôi không chỉ có thể trực tiếp đặt câu hỏi cho các nhà bảo mật, mà việc tạo ra vai trò bảo mật QA thứ hai cũng mất rất nhiều công sức.

Chúng tôi đã đóng vòng phản hồi bằng cách đưa thông tin trở lại infosec. QA đã biết có bao nhiêu lỗi có tác động bảo mật; và team security đã chia sẻ các nghị quyết của họ và chúng tôi đã nhận được báo cáo từ bản quét infosec đã chạy.

Và kết quả là sau một vài tháng làm việc, các team thực hiện các quy trình kiểm tra bảo mật thì có ít lỗi hơn, mức độ lỗi nghiêm trọng thấp hơn so với các nhóm mà không thực hiện test security. Không chỉ có vậy, sự cố sản xuất liên quan đến bảo mật cũng ít hơn so với các đội mà không có các hoạt động kiểm tra bảo mật có chủ ý.

Những khó khăn này là lý do tại sao test security trong quá trình kiểm thử là một thực hành không phổ biến. Với những hiệu ứng đã thấy, tôi có thể tự tin nói rằng đây là một con đường khó follow, nhưng nó lại là lý do dẫn đến những kết quả tốt cho sản phẩm phần mềm của chúng ta.