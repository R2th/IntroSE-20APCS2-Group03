**SYSTEM TESTING** là cấp độ kiểm tra xác nhận sản phẩm phần mềm hoàn chỉnh và được tích hợp đầy đủ. Mục đích của kiểm tra hệ thống là để đánh giá các thông số kỹ thuật của hệ thống end-to-end. Thông thường, phần mềm chỉ là một phần tử của hệ thống dựa trên máy tính lớn hơn. Cuối cùng, phần mềm được giao diện với các hệ thống phần mềm / phần cứng khác. Kiểm thử Hệ thống thực sự là một loạt các bài kiểm tra khác nhau với mục đích duy nhất là thực hiện toàn bộ hệ thống dựa trên máy tính.
Trong hướng dẫn này, chúng ta sẽ học
* Kiểm tra hệ thống là Hộp đen
* Bạn xác minh điều gì trong Kiểm thử hệ thống?
* Hệ thống phân cấp kiểm tra phần mềm
* Các loại kiểm tra hệ thống khác nhau
* Người kiểm thử nên sử dụng các loại kiểm thử hệ thống nào?

**System Testing is Blackbox**

Hai hạng mục kiểm thử phần mềm

Kiểm tra hộp đen
Kiểm tra hộp trắng
Kiểm thử hệ thống thuộc danh mục kiểm thử hộp đen của kiểm thử phần mềm.

Kiểm thử hộp trắng là kiểm tra hoạt động nội bộ hoặc mã của một ứng dụng phần mềm. Còn black box hay System Testing thì ngược lại. Kiểm tra hệ thống liên quan đến các hoạt động bên ngoài của phần mềm từ quan điểm của người dùng.

**What do you verify in System Testing?**

Kiểm tra hệ thống liên quan đến việc kiểm tra mã phần mềm để theo dõi
* Kiểm tra các ứng dụng được tích hợp đầy đủ bao gồm các thiết bị ngoại vi bên ngoài để kiểm tra cách các thành phần tương tác với nhau và với toàn bộ hệ thống. Đây cũng được gọi là kịch bản thử nghiệm End to End.
* Xác minh kiểm tra kỹ lưỡng mọi đầu vào trong ứng dụng để kiểm tra đầu ra mong muốn.
* Kiểm tra trải nghiệm của người dùng với ứng dụng.
Đó là mô tả rất cơ bản về những gì liên quan đến kiểm thử hệ thống. Bạn cần xây dựng các trường hợp thử nghiệm chi tiết và bộ thử nghiệm kiểm tra từng khía cạnh của ứng dụng khi nhìn từ bên ngoài mà không cần nhìn vào mã nguồn thực tế.

**Software Testing Hierarchy**

![](https://images.viblo.asia/7aba9b8f-bcb0-4e18-a536-bda8d9738368.png)

Như với hầu hết mọi quy trình kỹ thuật phần mềm, kiểm thử phần mềm có một thứ tự quy định để thực hiện mọi thứ. Sau đây là danh sách các hạng mục kiểm thử phần mềm được sắp xếp theo thứ tự thời gian. Đây là các bước được thực hiện để kiểm tra hoàn toàn phần mềm mới nhằm chuẩn bị cho việc tiếp thị nó:
* Kiểm thử đơn vị được thực hiện trên mỗi mô-đun hoặc khối mã trong quá trình phát triển. Unit Testing thường được thực hiện bởi lập trình viên viết mã.

* Kiểm tra tích hợp được thực hiện trước, trong và sau khi tích hợp mô-đun mới vào gói phần mềm chính. Điều này liên quan đến việc kiểm tra từng mô-đun mã riêng lẻ. Một phần mềm có thể chứa một số mô-đun thường được tạo ra bởi một số lập trình viên khác nhau. Điều quan trọng là phải kiểm tra hiệu ứng của từng mô-đun trên toàn bộ mô hình chương trình.

* Kiểm thử hệ thống được thực hiện bởi một đại lý kiểm thử chuyên nghiệp trên sản phẩm phần mềm đã hoàn thiện trước khi nó được đưa ra thị trường.

* Thử nghiệm chấp nhận - thử nghiệm beta của sản phẩm được thực hiện bởi người dùng cuối thực tế.

**Different Types of System Testing**

Có hơn 50 loại Kiểm thử Hệ thống. Để có danh sách đầy đủ các loại kiểm thử phần mềm, hãy nhấp vào đây. Dưới đây, chúng tôi đã liệt kê các loại kiểm thử hệ thống mà một công ty phát triển phần mềm lớn thường sử dụng

1. Kiểm tra khả năng sử dụng - chủ yếu tập trung vào việc người dùng dễ sử dụng ứng dụng, tính linh hoạt trong việc xử lý các điều khiển và khả năng của hệ thống để đáp ứng các mục tiêu của nó

2.  Kiểm tra tải - là cần thiết để biết rằng một giải pháp phần mềm sẽ hoạt động dưới các tải trong đời thực.

3. Kiểm tra hồi quy - liên quan đến việc kiểm tra được thực hiện để đảm bảo không có thay đổi nào được thực hiện trong suốt quá trình phát triển gây ra lỗi mới. Nó cũng đảm bảo không có lỗi cũ xuất hiện từ việc bổ sung các mô-đun phần mềm mới theo thời gian.

4. Kiểm tra khôi phục - được thực hiện để chứng minh một giải pháp phần mềm là đáng tin cậy, đáng tin cậy và có thể khôi phục thành công từ các sự cố có thể xảy ra.

5. Kiểm thử di chuyển- được thực hiện để đảm bảo rằng phần mềm có thể được di chuyển từ cơ sở hạ tầng hệ thống cũ hơn sang cơ sở hạ tầng hệ thống hiện tại mà không gặp bất kỳ sự cố nào.

6. Kiểm tra chức năng - Còn được gọi là kiểm tra tính hoàn chỉnh của chức năng, Kiểm tra chức năng liên quan đến việc cố gắng nghĩ về bất kỳ chức năng nào có thể bị thiếu. Người kiểm tra có thể lập danh sách các chức năng bổ sung mà một sản phẩm có thể phải cải thiện trong quá trình kiểm tra chức năng.

7. Kiểm thử Phần cứng / Phần mềm - IBM gọi kiểm thử Phần cứng / Phần mềm là "Kiểm tra HW / SW". Đây là lúc người kiểm tra tập trung sự chú ý của mình vào các tương tác giữa phần cứng và phần mềm trong quá trình kiểm tra hệ thống.

**What Types of System Testing Should Testers Use?**

* Có hơn 50 loại thử nghiệm hệ thống khác nhau. Các loại cụ thể được người kiểm tra sử dụng phụ thuộc vào một số biến. Các biến đó bao gồm:
* Người thử nghiệm làm việc cho ai - Đây là một yếu tố chính trong việc xác định các loại thử nghiệm hệ thống mà người thử nghiệm sẽ sử dụng. Các phương pháp được sử dụng bởi các công ty lớn khác với các phương pháp được sử dụng bởi các công ty vừa và nhỏ.
* Thời gian có sẵn để thử nghiệm - Cuối cùng, tất cả 50 loại thử nghiệm có thể được sử dụng. Thời gian thường là thứ giới hạn chúng ta chỉ sử dụng những loại phù hợp nhất cho dự án phần mềm.
* Các tài nguyên có sẵn cho người thử nghiệm - Tất nhiên một số người thử nghiệm sẽ không có các nguồn lực cần thiết để tiến hành một kiểu thử nghiệm. Ví dụ: nếu bạn là một kiểm thử viên làm việc cho một công ty phát triển phần mềm lớn, bạn có thể có phần mềm kiểm thử tự động đắt tiền không có sẵn cho những người khác.
* Giáo dục của Software Tester- Có sẵn một đường hướng học tập nhất định cho từng loại kiểm thử phần mềm. Để sử dụng một số phần mềm liên quan, người kiểm thử phải học cách sử dụng nó.
* Ngân sách kiểm tra - Tiền trở thành một yếu tố không chỉ đối với các công ty nhỏ hơn và các nhà phát triển phần mềm cá nhân mà còn cả các công ty lớn.