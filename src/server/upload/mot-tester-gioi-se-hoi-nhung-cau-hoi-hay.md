# Kiểm thử một ứng dụng hay một sản phẩm mới luôn luôn là một thử thách
Chúng là những thử thách làm việc với những công nghệ mới, những ngôn ngữ mới hay thậm chí là những nền tảng mới; buộc những người Tester điều tra và học cách làm thế nào để đối phó với những mô hình mới này. Nhưng theo một nghĩa nào đó, tất cả các vấn đề kỹ thuật này có thể được giải quyết dễ dàng bằng cách chuyển sang người bạn thân nhất của hầu hết các chuyên viên máy tính: GOOGLE

Biết đâu có thể là nếu bạn đang tự hỏi bản thân mình nên sử dụng công cụ nào để kiểm thử tự động một công nghệ mới, làm thế nào để viết bài kiểm tra cho một ngôn ngữ kịch bản cụ thể hoặc những điểm yếu trên hệ điều hành hoặc nền tảng di động; các câu trả lời sẽ có sẵn trên Internet, được viết bởi một số người áp dụng hoặc thử nghiệm sớm, người đã thực hiện thử thách và đăng một bài báo hoặc blog giải thích những gì anh ta đã làm và làm thế nào.

Nhưng thử thách thực sự là đối phó với những thứ mà có thể không thể tìm thấy trên Internet, và những thứ mà bạn sẽ cần tự tìm ra bằng chính bản thân mình. Tôi đang đề cập tới những chức năng và khía cạnh kinh doanh của ứng dụng của bạn và cách mà người dùng của bạn sẽ làm việc và tương tác với sản phẩm của bạn sau khi nó được phát hành. 

# Ai là là người mà tôi có thể nói chuyện để lấy được thông tin?  

Câu hỏi đầu tiên cần hỏi là “Bạn cần nói chuyện với ai để hiểu được rằng bạn kiểm tra cái gì?” Và câu trả lời, ít nhất là trong phần đầu của quá trình, rất đơn giản - NÓI VỚI TẤT CẢ MỌI NGƯỜI BẠN CÓ THỂ.

Khi bạn bắt đầu một dự án mới hoặc khi bạn được yêu cầu kiểm tra một ứng dụng mới, bạn cần bắt đầu định hướng tất cả mọi người, người mà có thể cung cấp cho bạn những thông tin bạn cần. Vì vậy hãy tạo ra một danh sách những người bạn cần nói chuyện - Marketing, nhóm Phát triển, Sales, Support, CEO - và cố gắng nói chuyện với mỗi nhóm để hiểu được bạn kiểm tra những gì? Và tại sao? 

Thậm chí nếu bạn không quản lý để nói chuyện với tất cả họ (thỉnh thoảng có thể rất khó để có được một phiên làm việc 30 phút với CEO của bạn …) thì ít nhất hãy cố gắng tạo ra một danh sách và bao gồm càng nhiều những người khác nhau càng tốt để có được những quan điểm và thử nghiệm  đầu vào khác nhau. 
# Vậy câu hỏi nào bạn nên hỏi? 

Đây là một phần của vấn đề…

Hãy tưởng tượng về kịch bản sau đây: 

Bạn cuối cũng có lịch họp với CEO của mình để có được những đầu vào cho việc kiểm thử hệ thống. Bạn đến cuộc họp và hỏi cô ấy: “ Thưa giám đốc điều hành, Tôi đã được giao nhiệm vụ thử nghiệm sản phẩm mới, và tôi muốn hỏi rằng bạn nghĩ là những gì nên được kiểm tra? 
Cô ấy sẽ dừng lại và nhìn bạn một vài giây và trả lời: “Chà, Tôi không biết, bạn có phải chuyên gia kiểm thử ở đây không? Tôi đoán rằng tốt nhất là bạn kiểm tra tất cả mọi thứ, đúng không? Chúng ta đều không muốn có bất kỳ một lỗi nào lọt ra bên ngoài, đúng không? 

Điều gì không đúng với kịch bản trên? Chà, về cơ bản chúng ta đã đến gặp người đó và hỏi anh ta những câu hỏi sai…

Nếu bạn chú ý đến những gì CEO nói cô ấy đã đúng, chúng tôi là những chuyên gia thử nghiệm. Cô ấy kỳ vọng bạn sẽ đưa ra những gì cần được kiểm tra trong hệ thống, nhưng mặt khác cô ấy cũng đang sống trong ảo tưởng rằng mọi thứ nên hoặc thậm chí có thể được kiểm tra (những điều mà chúng ta đều biết là không thể và thậm chí là có thể, cũng  không kinh tế về lâu dài).

Vấn đề ở đây là chúng tôi đã yêu cầu người khác làm việc cho chúng tôi, đưa ra những gì cần kiểm tra, thay vì yêu cầu đầu vào mà chúng tôi cần phải tự hiểu những gì cần kiểm tra và làm thế nào.

Vậy trở lại với kịch bản họp với CEO, Những câu hỏi nào sẽ có giá trị để hỏi? Chà, bạn cần phải hỏi về đầu vào của cô ấy trên hệ thống, thậm chí không cần nói về các hoạt động thử nghiệm. Cố gắng hiểu những lĩnh vực nào quan trọng từ góc độ người dùng, hoặc dựa trên lợi thế cạnh tranh của chúng hoặc dựa trên những gì làm cho ứng dụng của chúng tôi trở nên độc nhất, v.v. Bạn nên tập trung câu hỏi của mình vào những gì quan trọng đối với họ.

Đây là một số câu hỏi bạn có thể hỏi CEO hoặc VIP Marketing hoặc thậm chí cả Giám đốc Kinh doanh: 
* Các khía cạnh quan trọng nhất của sản phẩm của chúng ta là gì? Những thứ làm cho chúng ta trở nên độc nhất?
* Những lĩnh vực nào trong sản phẩm được khách hàng sử dụng rộng rãi nhất? Những kiểu nào sẽ khiến người dùng tức giận và khiến họ chọn không làm việc với sản phẩm nữa?
* Hiện nay thị trường đang tập trung ở đâu?
* Làm thế nào chúng ta trở nên tốt hơn so với đối thủ cạnh tranh? Những chỗ nào là những vấn đề gây khó khăn nhất trong các đối thủ cạnh tranh, những chỗ nào mà chúng ta muốn vượt qua?
* Có bất kỳ rủi ro nào bạn nghĩ rằng chúng ta nên đặc biệt chú ý? Rủi ro trong công nghệ của chúng ta hay rủi ro trong sản phẩm?

Lưu ý rằng chúng ta hỏi hỏi họ là Kiểm thử cái gì? Nhưng chúng ta cần hỏi rằng những gì là quan trọng trong mắt họ (dựa vào kinh nghiệm của họ). 
Trong trường hợp của CEO, Marketing và Sales chúng tôi sẽ muốn nói về những thứ liên quan đến chức năng của sản phẩm.

Nếu chúng ta nói chuyện với đội Support, chúng ta sẽ hỏi họ những câu hỏi liên quan đến các lĩnh vực mà người dùng của chúng ta tìm thấy lỗi, tập trung vào những nơi có số lượng lỗi lớn nhất cũng như nơi phát hiện ra các vấn đề nghiêm trọng nhất.

Cuối cùng, khi nói chuyện với đội phát triển, chúng ta sẽ hỏi họ về rủi ro công nghệ, cũng như những nơi họ đang thực hiện nhiều thay đổi nhất hoặc nơi sản phẩm tương đối yếu hoặc phức tạp và vì vậy chúng ta nên cố gắng để thử nghiệm nhiều hơn.

# Nghệ thuật lắng nghe

Vậy bạn sẽ làm gì với tất cả các thông tin có được? Về cơ bản, bạn cần lấy những thứ bạn có được và xử lý nó để có được góc 360 độ đọc ứng dụng của bạn. 360 độ nghĩa là gì? Ý tôi là từ tất cả các góc độ quan trọng khác nhau: Công nghệ, Tính khả dụng, Khả năng hỗ trợ, Khả năng cạnh tranh, v.v.

Sau tất cả, công việc của bạn là kiểm tra và cung cấp khả năng hiển thị liệu ứng dụng có đáp ứng các tiêu chuẩn chất lượng của người dùng và các bên liên quan hay không. Cách duy nhất để làm điều này là bằng cách hiểu cái gì là quan trọng đối với tất cả chúng và tạo ra một kế hoạch kiểm tra (hoặc kế hoạch làm việc!) cái mà sẽ bao quát nó một cách hiệu quả.

*Tài liệu tham khảo: https://qablog.practitest.com/a-good-tester-asks-good-questions/*