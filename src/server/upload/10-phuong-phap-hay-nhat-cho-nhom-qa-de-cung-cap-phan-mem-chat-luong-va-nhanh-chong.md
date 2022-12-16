> Bài viết là chia sẻ của Karim Fanadka, một QA Team Leader.

Là một trưởng nhóm đảm bảo chất lượng (QA), tôi phải ký vào chất lượng của bản phát hành chính sau mỗi sáu tuần. Mỗi bản phát hành chính thường bao gồm hai tính năng mới và ba tính năng nhỏ hơn, chẳng hạn như thay đổi giao diện người dùng (UI) hoặc báo cáo mới, cũng như các vấn đề về tính ổn định và sửa lỗi. Tôi có tám kỹ sư QA làm việc trên code được phát triển bởi 30 nhà phát triển.

Vì vậy, để tránh phải qua đêm và cuối tuần ở lại nơi làm việc, nhóm của chúng tôi đã áp dụng 10 phương pháp hay nhất này để đảm bảo khối lượng công việc có thể quản lý được trong khi đảm bảo rằng các bản phát hành mà chúng tôi phê duyệt duy trì các tiêu chuẩn chất lượng cao nhất.

# 1. Giải thoát khỏi vai trò cổ điển và trách nhiệm của QA
Chúng tôi đã vi phạm ranh giới theo cả hai hướng. Chúng tôi là một đơn vị khách hàng, và chúng tôi nghe từ khách hàng của mình về các vấn đề họ gặp phải và những tính năng họ muốn thấy trong sản phẩm của chúng tôi. Mặt khác, chúng tôi tích cực tham gia vào các cuộc thảo luận thiết kế, cung cấp đầu vào mà chúng tôi nhận được từ khách hàng. Ngoài ra, kiến thức và kinh nghiệm kiểm tra code của chúng tôi giúp chúng tôi xác định các lỗi thiết kế trước khi mọi người dành thời gian để code, làm giảm đáng kể chu kỳ phát triển và giúp chúng tôi đáp ứng kỳ vọng của khách hàng khi chúng tôi phát hành phiên bản mới.

# 2. Chọn tiêu chí phát hành của bạn một cách cẩn thận

Bạn không thể kiểm tra tất cả mọi thứ trong một sản phẩm cho mỗi bản phát hành, và may mắn thay, bạn không cần phải làm điều đó. Bạn vẫn có thể tự tin trong sản phẩm bạn phê duyệt nếu bạn tập trung vào các khu vực trong code của mình, nơi những thay đổi quan trọng nhất đã được thực hiện. Trước khi chu kỳ phát hành mới bắt đầu, nhóm của chúng tôi sẽ cùng với tất cả các bên liên quan hiểu được các phần nào của sản phẩm sẽ được đụng đến bằng mã mới hoặc đã cập nhật. Chúng tôi sử dụng thông tin đó để ưu tiên các nỗ lực thử nghiệm của chúng tôi. Chúng tôi tập trung vào các phần của mã và sử dụng các kiểm tra tự động hóa hiện có để xử lý các phần khác. Nếu bạn biết một cái gì đó làm việc trong bản phát hành cuối cùng và bạn không chạm vào nó trong bản phát hành này, thì bạn không cần phải dành quá nhiều thời gian thử nghiệm. Vì vậy, hãy căn cứ trên tiêu chí phát hành của bạn trên code mới đang được thêm vào.

# 3. Ưu tiên sửa lỗi dựa trên mức sử dụng

Sửa lỗi là một phần không thể tách rời của bất kỳ bản phát hành mới nào, nhưng bạn nên tập trung vào những nỗ lực nào trên các lỗi nào? Câu trả lời của chúng tôi là dữ liệu sử dụng. Chúng tôi sử dụng Google Analytics để xem cách người dùng cuối tương tác mà không cần công cụ kiểm tra tải. Điều này mang lại cho chúng ta rất nhiều thông tin quan trọng. Ví dụ, nếu chúng ta biết rằng một khu vực của một ứng dụng hiếm khi được sử dụng, một lỗi trong phần đó của code sẽ được ưu tiên thấp hơn. Nếu ít hơn một phần trăm người dùng của chúng tôi đang sử dụng một trình duyệt cụ thể, các vấn đề cụ thể cho trình duyệt đó sẽ ít chú ý hơn. Nhưng chúng tôi cũng lắng nghe khách hàng của mình. Điều cuối cùng chúng tôi muốn là để người dùng gặp phải lỗi. Nếu có thứ gì đó vượt qua chúng tôi và người dùng khám phá lỗi, các lỗi đó sẽ được ưu tiên sửa trong bản phát hành tiếp theo.

# 4. Áp dụng phương pháp tiếp cận hai tầng để kiểm tra tự động hóa

Nếu một cam kết mà bị một nhà phát triển làm vỡ phần chính của bản build bằng bất kỳ cách nào, chúng tôi sẽ thông báo cho họ càng nhanh càng tốt. Điều đó nói rằng, chúng tôi không thể chạy thử nghiệm hệ thống đầy đủ cho mọi cam kết. Điều đó sẽ mất quá nhiều thời gian, và vào thời điểm một vấn đề có thể được tìm thấy, nhà phát triển có thể đã chuyển sang làm một thứ khác. Vì vậy, chúng tôi đã áp dụng phương pháp tiếp cận hai cấp để kiểm tra tự động hóa. 
Bậc một được kích hoạt bởi mọi cam kết với cơ sở code và cung cấp xác nhận nhanh chóng các thay đổi của nhà phát triển, với các bài kiểm tra sanity hoàn thành trong vòng vài phút. 
Bậc hai chạy thử nghiệm hồi quy toàn diện hơn và chạy tự động vào ban đêm, khi chúng ta có nhiều thời gian hơn để kiểm tra các thay đổi. 
Quyết định mức độ sáng hoặc đầy đủ của mỗi cấp phải là nghệ thuật. Nhưng một khi bạn bắt đầu làm việc như thế này, bạn nhanh chóng tìm hiểu làm thế nào để cân bằng giữa kiểm tra sanity ban ngày và kiểm tra hồi quy ban đêm.

# 5. Thực hiện ở gần môi trường liên quan

Mọi nhóm QA đều đã từng nghe ý kiến của nhà phát triển khi báo lỗi như sau: "... nhưng nó hoạt động trên máy của tôi". Làm thế nào để bạn tránh tình huống đó?

QA của chúng tôi và các nhóm phát triển của chúng tôi chạy chính xác cùng một môi trường. Tuy nhiên, khi các bản build của chúng tôi chuyển qua nhà phát triển, chúng tôi phải kiểm tra chương trình theo điều kiện production, vì vậy chúng tôi xây dựng môi trường dàn dựng để mô phỏng môi trường production của khách hàng.

# 6. Tạo ra một nhóm chuyên kiểm tra bảo mật

Bởi vì khách hàng sử dụng sản phẩm của chúng tôi như một phần mềm như một dịch vụ (SaaS), chúng tôi lưu trữ tất cả dữ liệu trên máy chủ của mình và chúng tôi cần thực hiện kiểm tra bảo mật trước mỗi bản phát hành. Lỗ hổng bảo mật trên nền tảng SaaS có xu hướng được người dùng khám phá và những vấn đề đó có thể nhanh chóng khiến khách hàng bỏ đi. Để ngăn chặn điều đó, chúng tôi đã thành lập một nhóm thử nghiệm chuyên thực hiện kiểm tra thâm nhập nguyên cả tuần trên các phiên bản ổn định của các sản phẩm và bản cập nhật sắp phát hành. Trước khi bắt đầu thử nghiệm, chúng tôi tóm tắt nhóm về các tính năng mới trong các bản phát hành sắp tới và môi trường sản phẩm. Nhóm nghiên cứu sử dụng thông tin đó để kiểm tra lỗ hổng bảo mật để cố gắng xâm nhập vào hệ thống. Các thành viên trong nhóm trải qua quá trình đào tạo bảo mật nghiêm ngặt và quen thuộc với các tiêu chuẩn bảo mật của công ty và ISO có liên quan, với chuyên môn trong các ứng dụng đám mây.

Với sự giúp đỡ của họ, nhóm của chúng tôi gần đây đã phát hiện ra lỗ hổng bảo mật, được tạo ra bởi một trong những nhà cung cấp môi trường đám mây hàng đầu, điều này đã cho phép tin tặc thu thập thông tin có giá trị. Chúng tôi đã nhanh chóng cập nhật cơ sở hạ tầng của mình trên đám Amazon’s cloud để ngăn chặn vi phạm.

# 7. Thành lập nhóm chuyên thử nghiệm hiệu năng 

Yêu cầu nhóm chuyên thử nghiệm hiệu năng chạy thử nghiệm ngay sau khi sản phẩm ổn định và tóm tắt cho nhóm về các phiên bản và tính năng mới để họ có thể đánh giá các rủi ro về hiệu suất. Khi các nhà phát triển giới thiệu một tính năng mới không ảnh hưởng đến hiệu suất, chẳng hạn như một nút trên màn hình, chúng tôi chỉ chạy các phép thử hồi quy của chúng tôi. Nhưng nếu chúng tôi nghi ngờ rằng một tính năng có thể ảnh hưởng đến hiệu suất, chúng tôi cũng viết và thực hiện các thử nghiệm hiệu suất mới.

Luôn cập nhật các nhóm bảo mật và hiệu suất của bạn với tất cả thông tin thích hợp và cung cấp cho họ môi trường gần với production nhất có thể. Một trong các bản phát hành gần đây của chúng tôi, các kỹ sư hiệu suất đã phát hiện ra một nút cổ chai đáng kể trong môi trường SaaS bên trong do một cấu hình mới trong cơ sở dữ liệu của nhà cung cấp đó. Nếu nhóm thực hiện không thử nghiệm môi trường, một lỗi crash sẽ xảy ra. Bước này là quan trọng. Nếu bạn không có phương tiện để thành lập nhóm thực hiện riêng của riêng bạn, hãy đào tạo một số thành viên nhóm QA để thực hiện kiểm tra hiệu suất.

# 8. Chạy một chu kỳ hồi quy

Chúng tôi chạy chu kỳ hồi quy của chúng tôi trong giai đoạn cuối cùng khi ổn định sản phẩm, và đó là quá trình kích hoạt ánh sáng xanh đi vào production. Vì rất ít thay đổi trong phát triển tại thời điểm này, bạn có cơ hội để xác thực toàn bộ sản phẩm. Chúng tôi khái niệm mô hình sản phẩm của mình như một cây có phân cấp các nhánh mô-đun và thành phần để giúp chúng tôi hiểu sản phẩm từ góc nhìn của khách hàng. Khi bất kỳ nhánh nào được sửa đổi, hệ thống phân cấp cho thấy những nhánh nào dưới nó sẽ bị ảnh hưởng và sẽ cần thử nghiệm QA bổ sung.

Chu kỳ hồi quy của chúng tôi sử dụng phương pháp đèn giao thông. Nếu mỗi nhánh nhận được ánh sáng xanh (vượt qua tất cả các thử nghiệm), sản phẩm được coi là sẵn sàng để bàn giao. Nếu một nhánh nhận được ánh sáng màu vàng (tất cả các thử nghiệm được thông qua nhưng với một hoặc nhiều cảnh báo được báo cáo), chúng tôi sẽ thảo luận vấn đề này với các bên liên quan của chúng tôi. Cuối cùng, nếu một nhánh nhận được một ánh sáng đỏ (một hoặc nhiều kiểm tra thất bại), chúng tôi sẽ dừng lại và giải quyết vấn đề. Chúng tôi cũng tự động hóa chu kỳ hồi quy của chúng tôi, vì vậy nó chỉ mất một vài ngày để chạy.

# 9. Mô phỏng bằng tài khoản khách hàng trên production

Vì chúng tôi duy trì dữ liệu khách hàng trong cơ sở dữ liệu của mình, chúng tôi phải đảm bảo rằng dữ liệu đó vẫn tương thích với bất kỳ phiên bản mới nào mà chúng tôi phát hành. “Ăn thức ăn cho chó” là quan niệm của chúng tôi và rất quan trọng, vì vậy khi nhóm QA chạy thử nghiệm di chuyển dữ liệu, chúng tôi tạo một tài khoản thử nghiệm được quản lý trên hệ thống production của chúng tôi. Chúng tôi sử dụng tài khoản này để liên tục tạo dữ liệu và điền vào cơ sở dữ liệu của chúng tôi.

Khi chúng tôi phát hành phiên bản mới, chúng tôi chạy các bản cập nhật để kiểm tra xem không có dữ liệu nào bị lỗi và nếu chúng tôi tìm thấy bất kỳ lỗi nào về hỏng dữ liệu, chúng sẽ trở thành ưu tiên cao nhất của chúng tôi. Chúng tôi cũng dành một hoặc hai ngày để thử nghiệm khả năng tương thích ngược thủ công trong khi chúng tôi thực hiện các bước hướng tới việc tìm kiếm một cách tiếp cận tự động và hiệu quả hơn. Tuy nhiên, bạn vẫn cần phải làm một số thử nghiệm thủ công, vì đây là một trong những giai đoạn cuối cùng trước khi đưa lên production.
# 10. Thực hiện kiểm tra sanity đối với production

Chúng tôi thực hiện kiểm tra sanity sau khi phát hành trên tài khoản production của chúng tôi để xác thực rằng mọi thứ hoạt động như mong đợi, bao gồm tất cả các hệ thống của bên thứ ba. Trước tiên chúng tôi thực hiện các thử nghiệm bằng tài khoản production hiện tại của chúng tôi nhưng sau đó tạo một tài khoản mới để xác thực rằng quy trình sẽ tiếp tục hoạt động chính xác khi khách hàng đăng ký mới. Chúng tôi tiến hành kiểm tra sanity trong nửa ngày, một phần của nhóm kiểm tra bằng tài khoản cũ và phần còn lại kiểm tra phần mới được tạo. Cuối cùng, chúng tôi kiểm tra các thành phần của bên thứ ba, chẳng hạn như hệ thống thanh toán, để đảm bảo tính tương thích của phiên bản.

Kỹ thuật hiệu suất đã thay đổi vai trò và quy trình truyền thống của các kỹ sư QA. Hôm nay, bạn phải có đội ngũ chuyên môn và chuyên dụng cao, cũng như một quá trình QA liên tục thông qua production và hơn thế nữa. Ngoài ra, để thực hiện vai trò của bạn một cách kỹ lưỡng và thỏa mãn khách hàng của bạn, bạn phải sẵn lòng trở thành khách hàng của mình.

Để duy trì chất lượng sản phẩm đồng thời đáp ứng nhu cầu phát hành sản phẩm thường xuyên, người thử nghiệm QA phải phá vỡ khuôn mẫu truyền thống. Bạn phải phát triển các kỹ năng mới, chẳng hạn như thiết kế và phát triển phần mềm, vì vậy bạn có thể tham gia nhiều hơn vào các giai đoạn khác nhau của quá trình phát triển. Thực hiện theo 10 phương pháp hay nhất này là giành chiến thắng cho nhóm của bạn và doanh nghiệp. Làm điều đó đúng, và bạn sẽ rút ngắn chu kỳ phát triển và làm cho công việc của các chuyên gia QA của bạn hấp dẫn hơn.

Nguồn: https://techbeacon.com/10-best-practices-qa-teams-deliver-quality-software-fast