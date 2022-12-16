*Hầu hết các hệ thống Machine learning đều dựa trên mạng trí tuệ nhân tạo, hoặc là tập hợp lớp các thuật toán mà các biến có thể được điều chỉnh thông qua một quá trình học tập. Những loại hệ thống này không cho kết quả chính xác; trên thực tế, đôi khi họ có thể tạo ra một kết quả không rõ ràng. Vậy làm thế nào để kiểm tra chúng? Peter Varhol nói với bạn những gì mà bạn nên cân nhắc khi đánh giá hệ thống Machine learning?*

![](https://images.viblo.asia/0e55c363-88e5-4347-b0fb-d823587d867e.jpg)


# 1. Định nghĩa về Machine learning

Machine learning là ngành khoa học giúp máy tính hoạt động mà không cần lập trình rõ ràng. Trong thập kỷ qua, machine learning đã cho chúng ta tự lái xe, nhận dạng giọng nói thực tế, tìm kiếm web hiệu quả, và sự hiểu biết sâu rộng về hệ gen của con người... Machine learning ngày nay phổ biến đến mức bạn có thể sử dụng nó hàng chục lần một ngày mà không biết. Nhiều nhà nghiên cứu cũng nghĩ rằng đó là cách tốt nhất để đạt được tiến bộ về mặt trí tuệ nhân tạo ở mức độ con người.

Có rất nhiều các ứng dụng sử dụng Machine learning ra đời trên mọi lĩnh vực của cuộc sống, từ khoa học máy tính đến những ngành ít liên quan hơn như vật lý, hóa học, y học, chính trị. Cỗ máy đánh cờ vây với khả năng tính toán trong một không gian có số lượng phần tử còn nhiều hơn số lượng hạt trong vũ trụ, tối ưu hơn bất kì đại kì thủ nào, là một trong rất nhiều ví dụ hùng hồn cho sự vượt trội của machine learning so với các phương pháp cổ điển.

Tuy nhiên gần đây chắc hẳn các bạn cũng đã từng nghe đến xe ô tô không người lái của hãng Uber đã để xảy ra vụ tai nạn đến chết người với một người phụ nữ và hãng Uber đã phải dừng hoạt động đối với những chiếc xe không người lái. Machine learning ngày càng phát triển để thay thế con người, nhưng hiện tại vẫn đang dần được phát triển, vậy làm thế nào để nó trở thành hiện thực được sử dụng trong cuộc sống của chúng ta. Là một QA/Tester chúng ta sẽ kiểm thử như thế nào với hệ thông này?

# 2. Phân tích hiện trạng

## 2.1. Thực trạng

Các hệ thống kiểm thử không phải lúc nào cũng trả về cùng một yêu cầu, cùng một spec nhất định mà nó luôn có những định nghĩa mới và những chiến thuật mới.

Về mặt lý thuyết, kiểm thử phần mềm coi là một hoạt động khá đơn giản. Đối với mỗi đầu vào có một đầu ra xác định và được biết trước. Chúng tôi nhập các giá trị, tạo ra những lựa chọn hoặc điều hướng một ứng dụng, sau đó so sánh kết quả thực tế với kết quả mong muốn. Nếu chúng phù hợp với nhau, chúng ta đánh “OK” và di chuyển tiếp đến đối tượng khác. Nếu chúng không phù hợp, chúng ta có thể có một bug.

Cứ cho là như vậy, đôi khi có một đầu ra mà không được định nghĩa rõ ràng, có một vài sự mơ hồ nào đó, hoặc bạn nhận được một bất đồng về việc một kết quả cụ thể đại diện cho một bug hoặc một vài trường hợp khác. Nhưng tóm lại, chúng ta đã tưởng tượng được đầu ra là gì.

Nhưng có một loại phần mềm ở đó có một đầu ra được định nghĩa không còn là những trường hợp như thế nữa đó là hệ thống: “Machine learning systems” mà sau đây tôi sẽ gọi là: “Hệ thống máy học”

Hầu hết các hệ thống Machine Learning đều dựa trên mạng trí tuệ nhân tạo, hoặc là tập hợp các thuật toán mà các biến đều được điều chỉnh thông qua một quá trình học. Quá trình học này liên quan đến việc sử dụng các đầu vào đã biết để tạo ra các đầu ra sau đó được so sánh với các kết quả đã biết. 

## 2.2. Ví dụ

Ví dụ: Bạn có một ứng dụng ở đó bạn cố gắng xác định thời gian đi làm dựa trên thời tiết. Những đầu vào có thể là nhiệt độ, khả năng lượng mưa và ngày trong khi đầu ra của bạn là thời gian đi lại cho một khoảng cách nhất định.

![](https://images.viblo.asia/3cda868d-e357-4534-983b-b009e7c1b910.png)

Khi thuật toán phản ánh kết quả đã biết với độ chính xác mong muốn, các hệ số đại số được đóng băng và mã sản phẩm được tạo ra. Ngày nay, điều này chiếm phần lớn những gì chúng ta hiểu là trí thông minh nhân tạo.

Loại phần mềm này ngày càng trở nên phổ biến, vì nó được sử dụng trong các lĩnh vực như thương mại điện tử, giao thông công cộng, ngành công nghiệp ô tô, tài chính và mạng máy tính. Nó có tiềm năng để đưa ra các quyết định cho đầu vào các mục tiêu được xác định đầy đủ. Để hiện thực hóa nó, bạn cần dữ liệu định lượng. Những đầu vào và kết quả mong đợi đầu ra có thể được đánh giá theo toán học và thao tác trong một loạt các phương trình. Điều này có thể đơn giản đầu vào như là độ trễ của mạng, và đầu ra rất có khả năng cho việc mua bán.

Trong một vài trường hợp, những ứng dụng này được được mô tả như là trí thông minh nhân tạo, trong đó họ đưa ra các quyết định mà có vẻ trước đây chỉ là tầm nhìn của người sử dụng hoặc là người điều khiển với mỗi đối tượng trong ứng dụng.

Những loại hệ thống này không cho kết quả chính xác. Trong thực tế, đôi khi họ có thể tạo ra một kết quả rõ ràng là không chính xác. Nhưng chúng rất hữu ích trong một số tình huống khi dữ liệu đã tồn tại trên mối quan hệ giữa đầu vào được ghi lại và kết quả mong muốn.

Ví dụ: Nhiều năm trước tôi có nghĩ ra mạng trí tuệ nhân tạo như là một phần của cảm biến gió điện tử. Nó làm việc mặc dù gió làm mát cảm biến điện tử dựa trên giảm chính xác nhiệt độ ở tốc độ và hướng cụ thể. Tôi đã xây dựng mạng thần kinh có ba lớp các phương trình đại số, mỗi khối có bốn hoặc năm phương trình phân biệt trong các nút riêng lẻ, tính toán song song. Họ sẽ sử dụng các biến bắt đầu, sau đó điều chỉnh các giá trị dựa trên các đầu ra thuật toán và câu trả lời thực tế. 

Tôi sau đó đã được đào tạo nó. Tôi đã có hơn năm trăm điểm dữ liệu về tốc độ và hướng gió đã biết và mức độ làm mát của cảm biến. Hệ thống mạng mà tôi tạo ra đã vượt qua và truyền từng đầu vào vào các phương trình của nó qua nhiều lớp và tạo ra một câu trả lời. Lúc đầu câu trả lời từ mạng có thể không gần với câu trả lời đúng được biết sau nhiều lần thử nghiệm. Nhưng thuật toán đã có thể điều chỉnh chính nó dựa trên câu trả lời thực tế. Sau nhiều lần lặp lại với dữ liệu được huấn luyện, các giá trị này sẽ dần trở về với kết quả chính xác và nhất quán. 

# 3. Phương thức để kiểm thử

Làm thế nào để bạn kiểm tra nó? Bạn đã biết câu trả lời là đúng, bởi vì bạn đã xây dựng kết nối bằng cách sử dụng “test data”- dữ liệu thử nghiệm, nhưng sẽ rất hiếm khi có được một câu trả lời chính xác mọi lúc.

Sản phẩm này thực tế là đã được kiểm tra trong suốt một quá trình đào tạo. Quá trình đào tạo mang đến kết quả chính xác hoặc nó phân kỳ. Câu hỏi đặt ra là cách bạn đánh giá chất lượng kết nối như thế nào. Sau đây là một số hướng dẫn tôi đã sử dụng:

1. Có tiêu chí chấp nhận khách quan. Biết trước số lượng lỗi mà bạn và những người sử dụng sẽ chấp nhận được.

2. Kiểm thử với dữ liệu mới. Một khi bạn đã đào tạo kết nối và  đóng băng kiến trúc và các biến, hãy sử dụng đầu vào và đầu ra mới để xác định tính chính xác của nó.

3. Đừng đếm trên tất cả các kết quả chính xác. Đó chỉ là bản chất của con thú. Trong khi các phương trình đại số thường không phức tạp, có rất nhiều trong số chúng được sử dụng trên sự kết nối, đôi khi tạo ra những kết quả chỉ là cho một khía cạnh nào đó mà thôi. Bạn không thể giải thích nó bằng logic, vì thế bạn phải kiểm thử và thường xuyên dẫn đến một kết quả tồi xen với một kết quả tốt. Và nếu nó không đủ tốt, bạn có thể phải đề nghị loại bỏ toàn bộ kiến trúc mạng và bắt đầu lại.

4. Hiểu được kiến trúc của hệ thống kết nối gần như là một phần của quá trình kiểm thử. Rất ít, nếu có, các nhân viên kiểm thử sẽ có thể thực hiện theo một bộ đầu vào thông qua mạng lưới các thuật toán, nhưng sự hiểu biết về cách thức xây dựng kết nối sẽ giúp người kiểm thử xác định xem kiến trúc khác có tạo ra kết quả tốt hơn hay không. 

5. Truyền đạt mức độ tự tin bạn có trong kết quả cho người quản lý và người dùng. Machine learning cung cấp cho bạn cơ hội duy nhất để mô tả sự tự tin bằng thuật ngữ thống kê, do đó hãy sử dụng chúng.

Một điều quan trọng cần lưu ý là bản thân dữ liệu đào tạo có thể chứa các thông tin không chính xác. Trong trường hợp này, do lỗi đo, tốc độ và hướng gió đã ghi có thể bị tắt hoặc không rõ ràng. Trong các trường hợp khác, làm lạnh của dây tóc có thể có một số lỗi trong đo lường của nó.


# 4. Chú ý

Dưới đây là một số cân nhắc quan trọng khác:

1. Bạn cần các kịch bản thử nghiệm. Ba cũng có thể là đủ, đại diện cho trường hợp tốt nhất dự kiến, trường hợp trung bình và trường hợp xấu nhất.

2. Bạn sẽ không đạt được sự tối ưu hóa toán học. Bạn làm việc với các thuật toán tạo ra các phép xấp xỉ, chứ không phải kết quả chính xác. Xác định mức độ của các kết quả có thể chấp nhận được đối với mỗi kịch bản.

3. Khiếm khuyết sẽ được phản ánh, không có khả năng của mô hình để đạt được các mục tiêu của ứng dụng.

4. Lưu ý rằng trong các loại ứng dụng này, tiêu chí chấp nhận không được biểu hiện dưới dạng số, loại hoặc mức độ lỗi. Trên thực tế, trong hầu hết các trường hợp, nó được biểu hiện dưới dạng khả năng thống kê trong phạm vi nhất định. Việc đánh giá chất lượng và rủi ro không phải là yếu tố chủ yếu đối với hầu hết các dự án phát triển và thử nghiệm, vì vậy người kiểm thử có thể không được trang bị để xem xét.

5. Người kiểm thử có thể cung cấp phản hồi tốt hơn về những nỗ lực của họ đối với các ứng dụng như thế nào? Trước tiên, đánh giá ứng dụng theo tiêu chí chấp nhận. Thứ hai, hãy chuẩn bị để hỗ trợ các khẳng định đó theo các thuật ngữ thống kê; ví dụ, 95% tự tin rằng ứng dụng sẽ đưa ra câu trả lời trong một phạm vi cho trước. Cuối cùng, có hiểu biết cấp cao về nền tảng của ứng dụng, để bất kỳ thiếu sót nào có thể được gán cho một thành phần ứng dụng cụ thể.

Cả hai phương pháp thử nghiệm và kết quả đều phải thay đổi để phù hợp với các ứng dụng không hoạt động giống như phần mềm truyền thống. Nếu bạn tìm thấy mình làm việc trên hệ thống Machine learning và các ứng dụng tiên đoán, những đề xuất này có thể là một sự khởi đầu tốt theo hướng đó.

# 5. KẾT LUẬN

Vậy tôi tóm tắt các phương pháp của quá trình kiểm thử như sau:

- Có tiêu chí chấp nhận khách quan.

- Kiểm thử với dữ liệu mới

- Thử để các trường hợp trong bộ testcase vừa có case lỗi và case pass.

- Hiểu về nghiệp vụ, tìm hiểu với các hệ thống tương tự

- Hãy sử dụng phương pháp thống kê một cách hiệu quả.

- Hãy sử dụng thiết bị giả lập để kiểm tra chúng.

- Hãy sử dụng thiết bị thực tế để kiểm thử một lần nữa trong không gian của môi trường thử nghiệm sau đó là không gian rộng hơn, bạn cũng không quên trường hợp vẫn phải có con người vận hành cùng chúng trong suốt quá trình thử nghiệm...trước khi đưa ra sử dụng thực tế.

Bài viết được tham khảo từ nguồn: https://www.stickyminds.com/article/testing-moving-target-how-do-we-test-machine-learning-systems