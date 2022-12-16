Bài viết được tham khảo từ nguồn:
https://www.stickyminds.com/article/risk-based-testing-test-only-what-matters-0

Tóm lược:

Rajnish Mehta viết rằng các nhóm tester cần phải có cách làm khoa học để hỗ trợ nghiệp vụ của sản phẩm ra bên ngoài. Thử nghiệm dựa trên rủi do là cách tiếp cận thực tế cho nhóm vì nó cho phép họ suy nghĩ vấn đề từ góc độ của người kinh doanh mà không phải là của một người kiểm thử hay là của end-user.


Trong thời đại ngày nay, ngành công nghiệp CNTT đang chạy trên chế đô "fash mode" và phần lớn các bên liên quan đang cố gắng tìm kiếm các giải pháp nhanh hơn. Văn phòng quản lý dự án luôn vội vã đưa sản phẩm ra bên ngoài. Trong khi đó yêu cầu là không được phép sai xót theo cách này, điều này đã trở thành thách thức cho đội tester, những người bắt buộc phải chấp nhận kế hoạch chế độ “fash mode” và quảng bá sản phẩm.


Những trải nghiệm gần đây của tôi với những khách hàng bán lẻ và nhóm thử nghiệm của họ đã chỉ cho tôi thấy rằng: Đội kiểm thử thì luôn luôn muốn đáp ứng deadlines trong khi đó vẫn phải đáp ứng những thay đổi của doanh nghiệp. Trong trường hợp này, chúng tôi đã trải qua một thách thức: “Doanh nghiệp thì không ưu tiên vào nhu cầu cần thiết của chúng tôi”. 


Trong một tình huống như thế tất cả trách nhiệm này đã rơi vào đội tester, điều này có thể dễ dàng trở thành một vật tế thần cho việc vận chuyển các defect đến sản xuất. Bất cứ sự chậm trễ nào trong trong vòng đời phát triển của phần mềm (SDLC) như là yêu cầu hay quá trình phát triển có thể làm mọi thứ trở nên tồi tệ hơn. 


Là một nhà cung cấp giải pháp, một nhóm thử nghiệm phải có một câu trả lời hợp lý và khoa học cho thách thức trên. Sử dụng phương pháp thử nghiệm dựa trên rủi ro (RBT) đã hoạt động thực sự tốt bằng chứng là nhóm thử nghiệm có thể đưa ra một lời đảm bảo. Mặc dù có thể có nhiều yếu tố khác khi bạn đánh giá rủi ro, tôi chỉ chọn hai yếu tố để khám phá trong phần này để đơn giản triển khai và dễ hiểu hơn. Với cách tiếp cận chúng tôi đã chọn, nhóm thử nghiệm của chúng tôi đã tiết kiệm được rất nhiều effort cho việc kiểm thử.


Tất cả chúng tôi làm việc trong ngành CNTT đang liên tục tìm kiếm các giải pháp tiết kiệm chi phí. Rõ ràng, điều này có nghĩa là thực hiện giải pháp hợp lý nhất có thể mang lại nhiều giá trị với ít effort hơn. Theo tôi, giải pháp này là dành cho tất cả các loại và quy mô của dự án. Tùy thuộc vào ngành, yếu tố rủi ro có thể thay đổi nhưng khái niệm vẫn giữ nguyên.


Tùy thuộc vào ngành, chúng tôi phải luôn duy trì các lỗi mở từ trung bình đến thấp trong quá trình sản xuất. Ví dụ, một công ty sản xuất máy điều hòa nhịp tim sẽ có khả năng chấp nhận rủi ro thấp hơn so với ngành tài chính, vốn có khả năng chấp nhận rủi ro thấp hơn so với ngành giáo dục và vân vân. Khả năng mạo hiểm phụ thuộc vào ngành và sau đó ứng dụng được thiết kế trong công ty đó.


Một số nhà lãnh đạo ngành công nghiệp sẵn sàng chấp nhận rủi ro đã biết hơn là trì hoãn thời gian đưa sản phẩm ra thị trường. Tôi tin rằng trong ngành công nghệ thông tin, nhóm QA nên tìm cách hỗ trợ ý tưởng về khái niệm thời gian tiếp cận thị trường nhanh hơn.


Để đạt được mục tiêu chỉ thử nghiệm các vấn đề đó và đạt được thời gian tiếp cận nhanh hơn, chúng tôi cần phải suy nghĩ lại phạm vi kiểm tra. Bạn có thể có một số câu hỏi về việc làm như vậy, có thể bao gồm:

Chúng ta có cần kiểm tra mọi thứ không?

Làm cách nào để chúng tôi giảm effort  kiểm tra?

Khi nào chúng ta ngừng thử nghiệm?

Cách tốt nhất để có chu kỳ giai đoạn thử nghiệm ngắn hơn là gì?

Làm cách nào để chúng tôi thành công với nhiều chu kỳ kiểm tra hơn?

Làm cách nào để chúng tôi nhận được sự hỗ trợ từ quản lý khi chúng tôi không kiểm tra các trường hợp kiểm tra nhất định?

Chúng tôi tạo ra các số liệu nào?


Câu trả lời cho tất cả các vấn đề bên trên đều nằm trong việc sử dụng framework kiểm thử dựa trên rủi ro.
Kiểm  thử dựa trên rủi ro là một phương pháp tiếp cận một cách khoa học khi mà tính toán cho rủi ro. Nó chủ yếu dựa trên các yếu tố tác động kinh doanh và khả năng thất bại, mặc dù có thể nhiều hơn thế.


Sử dụng giải pháp này sẽ giúp bạn bằng nhiều cách. Ví dụ: thử nghiệm dựa trên rủi ro sẽ giúp khi triển khai thông qua cổng đảm bảo chất lượng phần mềm, điều này dẫn đến thời gian tiếp cận thị trường nhanh hơn. Nó cũng giúp giảm thiểu khả năng trễ hạn, sử dụng IT là cách để biết được chính xác rủi ro là gì , giúp xác định mức độ nghiêm trọng của các defect, và là một cách tuyệt vời để đánh dấu các trường hợp thử nghiệm để kiểm tra hồi quy. Đó là một công cụ tuyệt vời để ưu tiên thực hiện kiểm tra và chọn ứng cử viên cho tự động hóa. Thử nghiệm dựa trên rủi ro giúp xác định mức độ nghiêm trọng của các defect và có thể gợi ý “những gì cần kiểm tra” khi chúng tôi không có đủ thời gian để thử nghiệm. Khi chúng ta bị vượt ngân sách của mình, chúng tôi vẫn có thể gửi sản phẩm với rủi ro đã biết.


# What Is Risk


Chúng ta phải hiểu bao nhiêu chức năng đã tác động đến kinh doanh. Đây là linh hồn của RBT. Định nghĩa về tác động và tác động đến doanh nghiệp cần được mọi bên hiểu và hiểu rõ.


Có thể có nhiều yếu tố cần được xem xét trong khi tính toán rủi ro. Ở đây, tôi đã lấy hai yếu tố chính như đã đề cập dưới đây:

Rủi ro = Tác động * Xác suất thất bại

Phân loại tác động sẽ giúp bạn hiểu được tác động đến quy trình kinh doanh nếu bất kỳ chức năng nào bị lỗi. Khi thử nghiệm, có thể mọi kịch bản (nguy kịch, cao, trung bình và Thấp) đều không thể thực thi. Ví dụ: các kịch bản thử nghiệm được phân loại là cao không thực thi sẽ có tác động lớn đến quy trình nghiệp vụ. Ngược lại, một loại kịch bản thử nghiệm thấp sẽ gây ra tác động thấp. Do đó, điều rất quan trọng là bạn nhận được phân loại thích hợp các yêu cầu từ nhóm kinh doanh.

Khi tạo một kịch bản kiểm thử, thêm một cột ảnh hưởng và một trường hợp kiểm thử có nguồn gốc từ tài liệu yêu cầu kinh doanh có những lợi ích sau đây sẽ giúp bạn tiến hành phân tích RBT :

Điều này sẽ cung cấp một phương pháp xác định khu vực có nguy cơ rủi ro cao trong ứng dụng

Chúng ta sẽ có cách tiếp cận rủi ro được kiểm soát

Nó sẽ cung cấp các điểm dữ liệu để xác định các tập lệnh thử nghiệm hồi quy

Nó sẽ là một công cụ tuyệt vời để xác định ứng cử viên cho tự động hóa

Nó sẽ giúp chúng ta trở thành công cụ cho phương pháp kiểm thử dựa trên rủi ro

Đây sẽ là công cụ duy nhất làm giảm phạm vi kiểm thử lại và thực hiện lại các tập lệnh kiểm thử

Điều này sẽ giúp xác định mức độ nghiêm trọng của các lỗi trong giai đoạn thực hiện

Xác định được số lượng rủi ro sẽ hỗ trợ bạn khi bạn tập trung vào quy mô tổng thể ảnh hưởng của từng rủi ro; nó cũng được gọi là mức độ thiệt hại có thể gây ra bởi sự thay đổi.Sau đây là ước tính của quy mô tổng thể của tác động sẽ xảy ra nếu một lỗi liên quan đến sự thay đổi đã được tìm thấy trong quá trình sản xuất.


Critical impact—5: Vấn đề gây ra:  tất cả các chức năng chính và quan trọng của ứng dụng bị lỗi. Điều này dẫn đến mất doanh thu lớn. Một lỗi liên quan đã làm ảnh hưởng đến khả năng của đơn vị kinh doanh hoặc người cuối cùng nhận dịch vụ.

High impact—4: Một ứng dụng hoặc giao dịch gây ra sự gián đoạn đáng kể cho sản xuất; khách hàng không bị ảnh hưởng trực tiếp, nhưng hệ thống backend không hoạt động.

Medium impact—3: Tiến trình bị gián đoạn với các phần mở rộng lớn để lên lịch và chi phí dự án; khách hàng không bị ảnh hưởng trực tiếp, nhưng thay đổi đã thực hiện làm ảnh hưởng đến code khác. Cần thời gian và nghiên cứu  để giải quyết vấn đề.


Moderate impact—2: Tiến trình bị gián đoạn với các phần mở rộng có thể quản lý được đối với lịch trình và chi phí ngắn hạn; khách hàng không bị ảnh hưởng. Một ví dụ về điều này sẽ là trường được thêm vào cho doanh nghiệp không hoạt động như thiết kế.

Marginal impact—1 — 1: Một lỗi thẩm mỹ.

# Xác xuất thất bại là gì?

Phần này chủ yếu được nhìn nhận bởi CNTT. Nó cho thấy một sự thất bại của chức năng được mã hóa do các lý do khác nhau, bao gồm mã phức tạp, nghiệp vụ phức tạp, thiết kế kiến trúc hệ thống, và tác động của các hệ thống ngoại vi. Thất bại cũng được xác định trong năm loại:

Critical - 5: Là thất bại mang tính nghiêm trọng, ảnh hưởng nghiêm trọng đến dự án, đến công ty. Gây ra ảnh hưởng nghiêm trọng về tài chính, về uy tín của công ty.

# High—4: Là thất bại mang tính chất nghiêm trọng nhưng chưa đến mức ảnh hưởng đến công ty. Tuy nhiên, nó có thể gây ảnh hưởng đến hệ thống và các hệ thống ngoại vi khác.

Medium—3: Là thất bại mang tính chất trung bình và không gây ảnh hưởng đến công ty, nó có thể ảnh hưởng đến hệ thống và các hệ thống ngoại vi khác nhưng vẫn có thể khắc phục được.

Moderate—2: Là thất bại mang tính chất bình thường dưới mức trung bình, nó là những lỗi nhỏ và dễ khắc phục, nó có thể còn không ảnh hưởng đến hệ thống hay các hệ thống ngoại vi khác.

Marginal—1: Là thất bại có độ nghiêm trọng rất thấp, nó ảnh hưởng đến hệ thống và hệ thống ngoại vi cũng rất thấp.

# Công thức tính rủi ro

![](https://images.viblo.asia/da5507ab-e2db-4e36-abcf-4baf38f543e2.jpg)


P1 – Critical Impact: Phải được test, đề xuất kiểm thử tự động


P2 – High Impact: Nên được test, đề xuất thực hiện automation

P3 – Medium Impact:  Có thể được được test nếu ngân sách và kế hoạch cho phép, có thể chạy tự động

P4 – Low Impact: Không cần test, không ảnh hưởng đến ứng dụng và không cần chạy automation

Ảnh hưởng nghiệp vụ thường bị nhầm lẫn với độ ưu tiên của thực hiện test. Nhóm test sẽ xác định các trường hợp kiểm thử với sự giúp đỡ từ nhóm và thực hiện chúng theo thứ tự ưu tiên của chúng, từ critical tới low.

Sau khi phân tích RBT được làm, nhóm QA dễ dàng xác định được khu vực rủi ro trong ứng dụng. Trong mỗi dự án đều có sự chậm trễ và kế hoạch thu hẹp, và vai trò của QA là hoàn thành kiểm thử. Trong kịch bản đó, RBT có thể được sử dụng như một công cụ hữu ích để quản lý việc đưa ra các quyết định. 


Điều quan trọng ở đây là nghiệp vụ rõ ràng định nghĩa những gì bị ảnh hưởng. Thông thường, phía doanh nghiệp hay nhầm lẫn giữa ảnh hưởng và độ ưu tiên. IT, phân tích nghiệp vụ (BA), và nhân viên điều hành nên hiểu rõ ràng nó và cung cấp đầu vào cho nhóm QA.

Nói chúng, nhóm QA nên xem xét giá trị dựa trên kiểm thử. Kiểm thử có thể là một quy trình không bao giờ kết thúc trong đó có những thay đổi thường xuyên về môi trường, đường dẫn ứng dụng, và các bản vá lỗi hệ điều hành thường xuyên xảy ra. Nó quan trọng đối với việc nhóm QA xác định được khi nào thì dừng test. Hãy nhớ rằng, chi phí chất lượng và chi phí cho lỗi cần được điều chỉnh.

![](https://images.viblo.asia/12868237-e321-4079-bf72-e7f314c93a7d.jpg)

# Kết luận

Tổ chức nên xem xét sử dụng phương pháp RBT khi làm việc trên các dự án. Trong khi một số tổ chức trưởng thành hơn những tổ chức khác, thì các tổ chức CNTT trưởng thành nên thực hành RBT ở cấp độ doanh nghiệp trên tất cả các dự án. Một phương pháp giảng dạy về thủ tục của phương pháp này để quản lý CNTT sẽ giúp họ hiểu được lợi ích của nó. Có thể mất ít nỗ lực để thực hiện, nhưng nó đáng để nỗ lực vì kết quả tuyệt vời mà bạn sẽ thấy