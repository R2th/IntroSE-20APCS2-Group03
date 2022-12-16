### Test một ứng dụng hay một sản phẩm luôn luôn tồn tại những thách thức !!!

Có thể gọi tên ngay những thách thức trong công việc: nào là công nghệ mới, ngôn ngữ mới, hay thậm chí là platforms mới ; buộc chúng ta phải nghiên cứu và tìm hiểu cách tiếp cận với những mô hình mới này. Nhưng theo một nghĩa nào đó, tất cả các vấn đề kỹ thuật này có thể dễ dàng được giải quyết bằng cách chuyển đến những người đồng nghiệp tốt nhất của hầu hết các chuyên viên máy tính (giống tôi).


Thách thức có phải là khi bạn đang tự hỏi mình câu hỏi rằng nên sử dụng công cụ nào để tự động kiểm tra công nghệ mới, cách viết thử nghiệm cho ngôn ngữ kịch bản cụ thể hoặc điểm yếu trên hệ điều hành hoặc nền tảng di động; Và rồi bạn sẽ tìm thấy các câu trả lời thường sẽ có sẵn trên Internet và được viết bởi một số người dùng sớm hoặc tester - những người có kinh nghiệm sau đó họ đăng lên báo hoặc blog giải thích họ đã làm cái gì và làm chúng như thế nào. 

Nhưng thách thức thực sự lại chính là việc bạn phải giải quyết những thứ mà bạn không thể tìm kiếm trên mạng Internet và rằng phải tự mình tìm ra. Tôi đang nói về khía cạnh chức năng và nghiệp vụ của một ứng dụng mới của bạn cũng như cái cách mà người dùng sẽ làm việc và tương tác cùng với sản phẩm khi nó được release.
 
##  Vậy tôi sẽ trao đổi với ai để có thể get được thông tin mình cần ???
 
Câu hỏi đầu tiên :" Ai sẽ là người mà bạn cần trao đổi để có thể hiểu bạn cần test cái gì ?" và câu trả lời sẽ có khi mà bạn bắt tay vào quy trình dự án - rất đơn giản: - HÃY NÓI VỚI MỌI NGƯỜI MÀ BẠN CÓ THỂ 
 
 Khi bạn bắt đầu một dự án mới hoặc khi bạn được yêu cầu thử nghiệm một ứng dụng mới, bạn cần bắt đầu bằng cách mapping tất cả những người có thể cung cấp cho bạn thông tin. Vì vậy, hãy lập danh sách tất cả những người mà bạn có thể nói chuyện như : Marketing , đội phát triển ,Sales, Supporter , Giám đốc điều hành - và cố gắng nói chuyện với từng người trong số họ để hiểu những gì bạn cần kiểm tra (và tại sao) !!! ???
 
 Thậm chí nếu bạn không thể nói chuyện với tất cả trong số đó (đôi khi khá khó để có được một buổi 30 phút với CEO của bạn ...) ít nhất hãy cố gắng để cho danh sách bao gồm càng nhiều người khác nhau càng tốt để có được sự khác biệt quan điểm và đầu vào thử nghiệm.
 
##  Vậy Câu hỏi ở đây là gì ???

Vấn đề khó khăn nằm ở đây !

Hãy thử tưởng tượng kịch bản sau:

Cuối cùng, bạn có được lịch cuộc họp với Giám đốc điều hành của mình để có được outputs của cô ấy về những gì cần được kiểm tra trong hệ thống. Bạn đến cuộc họp và hỏi cô ấy: “Thưa chị,em đã được giao nhiệm vụ thử nghiệm sản phẩm mới, và em muốn hỏi chị về những gì chị nghĩ nên được kiểm tra? ".
Cô dừng lại và nhìn bạn trong một vài giây trước khi trả lời: “Chà, tôi không biết, có phải là có một chuyên gia kiểm thử ở đây không nữa…? Tôi đoán bạn sẽ test thật tốt mọi thứ ,phải không? Chúng ta tất hẳn không muốn bất kỳ lỗi nào trượt ra khỏi cửa ,phải chứ ? ”

Có gì sai với kịch bản trên? Vâng, về cơ bản chúng ta đến gặp người đó và hỏi người ta những câu hỏi sai ...

Nếu bạn chú ý đến những gì CEO nói rằng cô ấy đúng, chúng ta là những chuyên gia thử nghiệm. Cô ấy hy vọng bạn tìm ra những gì cần được kiểm tra trong hệ thống, nhưng mặt khác cô ấy cũng sống theo ảo tưởng rằng mọi thứ nên hoặc thậm chí có thể được kiểm tra (điều mà chúng ta đều biết là không thể và thậm chí khi có thể, cũng không đảm bảo kinh tế về lâu về dài).

Vấn đề nằm ở chỗ  rằng : chúng ta yêu cầu một người khác làm công việc của chúng ta cho chúng ta , để tìm ra những cái để kiểm tra, thay vì hỏi cho những đầu vào mà chúng ta cần phải tự mình hiểu những gì cần phải được kiểm tra và làm thế nào.

Vì vậy, quay trở lại kịch bản cuộc họp CEO của chúng tôi,câu hỏi nào sẽ có giá trị để hỏi ? Vâng,bạn cần phải yêu cầu đầu vào của mình trên hệ thống, thậm chí không nói về các hoạt động thử nghiệm. Hãy cố gắng hiểu những lĩnh vực nào là quan trọng từ góc độ người dùng hoặc dựa trên lợi thế cạnh tranh của chúng ta hoặc dựa trên những gì làm cho ứng dụng của chúng ta trở nên độc đáo, vân vân và mây mây ...

Dưới đây là một vài ví dụ bạn có thể hỏi CEO hoặc VP Marketing của bạn hoặc thậm chí Giám đốc bán hàng:
- Các khía cạnh quan trọng nhất của Sản phẩm của chúng ta là gì? Những điều khiến sản phẩm của chúng ta trở nên độc đáo?

- Các tính năng nào trong sản phẩm được khách hàng của chúng tôi sử dụng rộng rãi nhất? Action gì sẽ khiến người dùng của chúng ta tức giận và khiến họ chọn không tiếp tục sử dụng sản phẩm của chúng ta ?

- Ngày nay xu hướng thị trường tập trung ở đâu ?

- Làm thế nào chúng ta tốt hơn so với đối thủ cạnh tranh ? Những chức năng nào có vấn đề nhất so với các đối thủ cạnh tranh của chúng ta, các chức năng tương tự mà chúng ta muốn vượt lên?

- Có bất kỳ rủi ro nào bạn nghĩ chúng ta nên đặc biệt lưu ý ? Rủi ro trong công nghệ , rủi ro trong sản phẩm của chúng ta ?

Nhớ rằng chúng ta không hỏi họ cần test cái gì,thay vào đó chúng ta đã hỏi điều gì là quan trọng trong mắt họ (dựa trên kinh nghiệm của họ).

Trong vai trò của Giám đốc điều hành,Marketing và Sales,họ sẽ nói cho chúng ta về những điều có thể liên quan đến chức năng của sản phẩm.

Nếu chúng ta nói chuyện với nhóm support của mình, chúng ta sẽ hỏi họ những câu hỏi liên quan đến các vùng mà người dùng của chúng ta thường tìm thấy lỗi,tập trung vào những nơi có số lượng lỗi lớn nhất cũng như những vấn đề quan trọng nhất được tìm thấy.

Cuối cùng, khi nói chuyện với các đồng nghiệp phát triển của chúng ta,chúng ta sẽ hỏi họ về những rủi ro công nghệ, cũng như những vùng họ đang thay đổi nhiều nhất, hoặc khu vực có sản phẩm tương đối yếu hoặc phức tạp.

### Nghệ thuật lắng nghe và tập trung vào những câu hỏi 

![](https://images.viblo.asia/100d13a8-dc43-4f30-b911-921b8d2b38bc.jpg)

Vậy bạn làm gì với tất cả thông tin? Về cơ bản bạn cần phải lấy những thứ bạn có và xử lý nó để có được sự nhìn nhận đa chiều 360 độ về ứng dụng của bạn. Tại sao tôi lại nói là 360 độ ? Ý tôi chính là từ tất cả các góc độ  quan trọng khác nhau như : Công nghệ, Tính khả dụng, Khả năng hỗ trợ, Khả năng cạnh tranh...

Xét cho cùng, công việc của bạn là kiểm tra và đưa ra được một cái nhìn xem ứng dụng có đáp ứng các tiêu chuẩn chất lượng của người dùng và các bên liên quan hay không. Cách duy nhất để làm điều này là bằng cách hiểu những gì quan trọng đối với tất cả chúng và tạo ra một kế hoạch kiểm thử (hoặc kế hoạch làm việc!) Hãy làm đi và bạn sẽ có kết quả xứng đáng !



 
 
 
 
 
 
 










Refer this link source : 
https://qablog.practitest.com/a-good-tester-asks-good-questions/