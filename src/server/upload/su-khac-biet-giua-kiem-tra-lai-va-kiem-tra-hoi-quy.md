**1. Khái niệm**

**Kiểm thử hồi quy (tiếng Anh: Regression testing)** là một dạng kiểm thử phần mềm để xác minh rằng phần mềm vốn đã được phát triển và kiểm thử từ trước vẫn sẽ hoạt động chính xác sau khi bị thay đổi hoặc giao tiếp với các phần mềm khác. Thay đổi có thể gồm cải tiến phần mềm, bản vá lỗi, thay đổi cấu hình,.... Trong quá trình kiểm thử hồi quy, lỗi phần mềm mới hoặc lỗi hồi quy có thể được phát hiện.

Quy trình kiểm tra hồi quy là để phát hiện ra các lỗi mới hoặc 'hồi quy' trong các khu vực chức năng và phi chức năng hiện có của hệ thống phần mềm sau khi các thay đổi đã được thực hiện, chẳng hạn như cải tiến, bản vá hoặc thay đổi cấu hình. Kiểm thử hồi quy có thể được sử dụng như một phương tiện hiệu quả để kiểm tra hệ thống phần mềm, lựa chọn một cách có hệ thống số lượng kiểm thử tối thiểu cần thiết để đảm bảo các thay đổi không ảnh hưởng đến mô-đun cụ thể hoặc các mô-đun liên quan.

**Ưu điểm của kiểm thử hồi quy**

* Kiểm thử hồi quy cải thiện chất lượng sản phẩm.
* Loại thử nghiệm này có thể được tự động hóa.
* Nó đảm bảo rằng các lỗi và sự cố đã được khắc phục không tái phát trở lại. 
* Loại thử nghiệm này xác minh rằng các sửa đổi không ảnh hưởng đến hoạt động chính xác của mã đã được thử nghiệm và phát hiện bất kỳ tác dụng phụ nào.
* Kiểm thử hồi quy có thể được sử dụng trong quá trình kiểm tra tích hợp. Trong trường hợp này, chúng sẽ hữu ích hơn.

**Nhược điểm của kiểm thử hồi quy**

* Nó đòi hỏi nỗ lực của con người để kiểm tra thủ công và cần được thực hiện cho mọi thay đổi nhỏ trong mã.
* Nó thường cần các tập lệnh thử nghiệm phức tạp để thử nghiệm các dự án có giá trị cao và chức năng phong phú.
* Đây là một quá trình lặp đi lặp lại nhiều và có thể ảnh hưởng đến việc chạy nước rút nhanh.
* Không có tần suất cụ thể cho kiểm tra hồi quy.
* Cần có mục đích rõ ràng để dẫn dắt nhiệm vụ kiểm tra hồi quy.
* Một phân tích rõ ràng phải được thực hiện trước khi thử nghiệm, điều này thường rất khó thực hiện trong điều kiện hạn chế về thời gian và nguồn lực.

**Re-testing** hay còn được gọi là Confirmation testing (kiểm thử chấp nhận) là một quy trình kiểm tra lại các testcase failed trong lần cuối cùng thực hiện test. Nói chung, tester tìm bug đó trong quá trình kiểm thử và assign lại cho Dev fix. Sau khi Dev fix xong thì đẩy lại cho Tester kiểm tra lại. Quá trình liên tục này được gọi là Re-testing (kiểm thử lại /Kiểm thử chấp nhận).

Kiểm tra lại là một thuật ngữ không chính thức được sử dụng nhiều hơn trong ngành và nó có nghĩa là kiểm tra một mô-đun đơn lẻ hoặc một phân đoạn cụ thể sau khi nó đã được khắc phục về việc tìm ra lỗi từ lần kiểm tra trước. Thử nghiệm này có thể được thực hiện nhiều lần để đảm bảo rằng bộ phận hoạt động bình thường.

Sự khác biệt cơ bản ở đây là, việc kiểm tra lại không quan tâm đến ảnh hưởng của bản sửa lỗi, bản vá hoặc sự thay thế khác đối với các thành phần khác trong hệ thống.

**Ưu điểm của Kiểm tra lại**

* Với việc kiểm tra lại, người kiểm tra đảm bảo rằng nhà phát triển đã sửa lỗi. Họ đảm bảo rằng lỗi không còn xuất hiện khi áp dụng các bước tương tự. Khi kết thúc quá trình kiểm tra lại thành công, một lỗi sẽ được đóng lại. Bằng cách này, kiểm tra lại làm tăng chất lượng của phần mềm bằng cách kiểm tra các trường hợp kiểm thử không thành công.

* Mất ít thời gian hơn vì nó chỉ yêu cầu kiểm tra một lỗi cụ thể hoặc trường hợp kiểm thử không thành công.

**Nhược điểm của Kiểm tra lại**
* Đôi khi, việc giải quyết một lỗi chỉ cần một thay đổi nhỏ về code. Trong những trường hợp như vậy, chỉ để kiểm tra một lỗi, nhà phát triển cần thực hiện việc deploy code. Điều này trở nên tốn thời gian cho nhà phát triển.

* Trong một số trường hợp, tester mất thời gian để kiểm tra lại vì họ cần phải lặp lại chính xác các bước đó để kiểm tra xem sự cố có được giải quyết hay không.

**2. Sự khác biệt giữa Kiểm tra lại và Kiểm tra hồi quy**

* Kiểm tra lại là một quá trình xác minh các bản sửa lỗi được thực hiện cho một mô-đun hoặc một phần tử cụ thể trong khi kiểm tra hồi quy là một quá trình để kiểm tra ảnh hưởng của những thay đổi trong chức năng của toàn bộ hệ thống phần mềm sau khi các thay đổi đối với hệ thống đã được thực hiện. Ảnh hưởng của bản sửa lỗi lên thành phần khác của hệ thống là trọng tâm chính.

* Quá trình kiểm tra lại được lập kế hoạch dựa trên các bản sửa lỗi được thực hiện cho hệ thống và nó có thể là một bài kiểm tra chung để kiểm tra chức năng của toàn bộ hệ thống hoặc kiểm tra một khu vực cụ thể nơi các thay đổi được thực hiện.

* Kiểm tra lại liên quan đến việc chạy lại các trường hợp thử nghiệm trước đó đã bị lỗi và kiểm tra hồi quy bao gồm việc chạy lại các thử nghiệm đã được vượt qua trong các bản dựng trước đó của hệ thống phần mềm

* Kiểm tra lại liên quan đến việc chạy lại các thử nghiệm không thành công được kết hợp với các bản sửa lỗi cho các lỗi trong hệ thống, trong khi kiểm tra hồi quy chỉ liên quan đến khía cạnh hồi quy của hệ thống phần mềm do kết quả của các thay đổi.

* Kiểm thử hồi quy được thực hiện sau quá trình kiểm tra lại.

* Trong các dự án có sẵn nhiều nguồn lực, việc kiểm tra hồi quy và kiểm tra lại được thực hiện đồng thời.