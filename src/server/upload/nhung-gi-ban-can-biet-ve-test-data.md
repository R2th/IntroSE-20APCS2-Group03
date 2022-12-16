Là một tester, bạn có thể nghĩ rằng *"Việc tạo testcase là đủ thách thức, vậy tại sao phải bận tâm về một thứ như test data?"*. Mục đích của bài viết này là giới thiệu cho bạn hiểu nhiều hơn về test data, tầm quan trọng của nó và đưa ra các mẹo và thủ thuật thực tế để tạo test data một cách nhanh chóng. Vì vậy, hãy bắt đầu cùng với tôi nhé!
# 1. Test data là gì?
Test data được hiểu là dữ liệu input của các phần mềm trong quá trình thực hiện kiểm thử. <br/><br/>Nó được thiết kế dựa vào sản phẩm hoặc cũng có thể là tác nhân ảnh hưởng đến sản phẩm trong quá trình kiểm thử. Test data được sử dụng cho cả các trường hợp kiểm thử tích cực để xác minh rằng các chức năng cho ra kết quả như mong đợi với các data hợp lệ và cho kiểm thử tiêu cực để xác minh khả năng của phần mềm có thể xử lý các input bất thường một cách hợp lý và chấp nhận được.

Test data được thiết kế không tốt sẽ khiến chúng ta gặp khó khăn để kiểm thử được tất cả các case đã được viết trên test case và có thể xảy ra trên thực tế, điều này sẽ cản trở rất nhiều về việc đảm bảo chất lượng phần mềm.
![](https://images.viblo.asia/85d06703-af96-435a-865f-c3ec0a9584d1.jpg)

# 2. Tạo test data như thế nào? Tại sao test data nên được tạo trước khi thực hiện kiểm thử?
Trong quá trình trình kiểm thử chúng ta sẽ cần tạo ra và tiêu thụ một lượng lớn data. Data được sử dụng như một trong các điều kiện ban đầu trước khi bắt đầu vào thực hiện test và đại diện cho phương tiện mà người tester tác động đến phần mềm.

Tùy thuộc vào môi trường, bối cảnh dự án của bạn, bạn có thể cần tạo test data trong hầu hết các test case hoặc ít nhất là xác định một test data phù hợp cho một hoặc nhiều các test case cùng một lúc. Thông thường, test data được tạo đồng bộ với test case mà nó được chỉ định sử dụng.

Test data có thể được tạo bằng các cách khác nhau như:
* Thủ công
* Sao chép hàng loạt data từ môi trường Production sang môi trường Staging/ Dev/ Testing
* Là bản sao hàng loạt test data từ các hệ thống cũ của khách hàng
* Công cụ tạo test data tự động<br/>

Thông thường, test data nên được tạo trước khi bạn bắt đầu thực hiện kiểm thử vì rất khó để xử lý việc quản lý test data nếu nó được tạo sau đó.Trong nhiều môi trường kiểm thử, việc tạo test data cần nhiều bước chuẩn bị hoặc cấu hình môi trường và những việc đấy thì có thể rất tốn thời gian. Ngoài ra, nếu việc tạo test data được thực hiện trong khi bạn đang trong giai đoạn execute test case, bạn có thể vượt quá deadline của mình.

Dưới đây là một số loại hình kiểm thử cùng với gợi ý tương ứng về test data: 
### a. Test data trong White Box Testing
Trong white box testing, test data được dùng để kiểm thử trực tiếp trong những mã code của phần mềm. Test data được lựa chọn bằng cách dựa vào các vấn đề sau:
* Mong muốn có thể cover càng nhiều nhánh/ luồng càng tốt ; test data có thể được tạo ra sao cho tất cả các nhánh trong source code của phần mềm đều được kiểm tra ít nhất một lần.
* Kiểm thử các trường hợp không hợp lệ của API: Test data có thể chứa các loại param hoặc tổ hợp các đối số không hợp lệ để gọi các methods khác nhau trong hệ thống.
### b. Test data trong Performance Testing
Performance Testing là loại kiểm thử được thự hiện để kiểm định xem hệ thống phản hồi với tốc độ như thế nào với một khối lượng công việc cụ thể. Mục tiêu của loại kiểm thử này không phải là tìm ra lỗi mà là loại bỏ các "nút thắt" làm chậm tốc độ xử lý của hệ thống. Một khía cạnh quan trọng của Performance testing là test data được sử dụng nên gần giống với kiểu dữ liệu thật được sử dụng trên môi trường Production, từ đó, chúng ta sẽ có thể tìm ra nhiều vấn đề gần giống thực tế nhất. <br/><br/>
Câu hỏi được đặt ra ở đây : "Được thôi, thật tốt nếu khi kiểm thử với data gần giống thật, nhưng làm cách nào tôi có được những data này?" Và câu trả lời sẽ khá đơn giản, đó là chúng ta sẽ tham khảo ý kiến, hỗ trợ của người biết rõ nhất - đó là khách hàng, người quản lý hoặc trực tiếp sử dụng hệ thống. <br/><br/>
Lúc này, họ sẽ có thể cung cấp một số dữ liệu mà họ đã có sẵn hoặc nếu không họ sẽ có thể hỗ trợ chúng ta bằng cách miêu tả hoặc lấy ví dụ data thật sẽ như thế nào, từ đó, chúng ta có thể dễ dàng hơn trong việc thiết kế một bộ test data tốt. 
### c. Test data trong Security Testing
Security Testing là quá trình xác nhận xem hệ thống có bảo vệ được dữ liệu hay không. Trong trường hợp này, test data cần được thiết kế sao cho có thể kiểm thử được khả năng bảo mật của phần mềm, tùy thuộc vào tính năng mà chúng ta có thể thiết kế test data cho phù hợp với các tiêu chí sau:
* *Bảo mật:* Tất cả thông tin do khách hàng cung cấp đều phải được bảo mật, mã hóa chặt chẽ và không được chia sẻ với bất kỳ bên ngoài nào. Ví dụ, nếu một ứng dụng sử dụng SSL, bạn có thể thiết kế một bộ test data phù hợp và đủ phức tạp để xác minh rằng dữ liệu đã được mã hóa một cách chính xác.
* *Xác thực:*  Để kiểm tra các chức năng liên quan đến việc xác minh danh tính của người dùng. Test data có thể được thiết kế như một sự kết hợp khác nhau giữa username và password để đảm bảo rằng hệ thống chỉ cho phép truy xuất khi user nhập trùng khớp username và password ở màn hình Login; hay ở chức năng Register để đảm bảo số điện thoại được input vào là của chính chủ bằng cách xác thực mã OTP.
* *Quyền:* Xác minh xem quyền của user là gì. Test data ở đây có thể chứa một tổ hợp người dùng, vai trò và hoạt động khác nhau để kiểm tra rằng chỉ những người dùng có đủ đặc quyền mới có thể thực hiện một số chức năng cụ thể trong hệ thống
### c. Test data trong Black-box Testing
Với Black-box testing, khi này, chúng ta thiết kế test case và kiểm thử phần mềm bằng cách đặt mình vào vị trí user thật, suy nghĩ về các viewpoint, các trường hợp có thể xảy ra trên thực tế. Khi thiết kế data test, chúng ta có thể tham khảo các loại data như sau:
* Data rỗng
* Data hợp lệ (theo quy định về validation của hệ thống)
* Data không hợp lệ (theo quy định về validation của hệ thống, các case interrupt khi đang dùng hệ thống)
* Data dùng để kiểm thử các giá trị Boundary Condition
* Data dùng để kiểm thử các giá trị trong từng Equivalence Partition
* Data dùng để kiểm thử các giá trị trong từng ô của Decision Table
* Data dùng để kiểm thử cho từng State Transition
* Data dùng để kiểm thử cho từng Use Case
# 3. Công tụ tạo test data tự động
Để tạo nhiều bộ test data khác nhau, bạn có thể sử dụng các công cụ tạo data test tự động. Dưới đây là một số ví dụ về các công cụ bạn có thể tham khảo:
* DTM Test Data: là một service giúp bạn có thể tùy thích tạo các loại dữ liệu, bảng (views, procedures etc, v.v.) hỗ trợ cho kiểm thử cơ sở dữ liệu (performance testing, load testing hoặc usability testing). Đây là một service có phí ~$149.
* Datatect: là một trình tạo data SQL của Banner, có thể tạo ra nhiều loại test data thực tế theo bảng ASCII hoặc trực tiếp tạo test data cho RDBMS ( Relational Database Management System - hệ quản trị cơ sỡ dữ liệu quan hệ) bao gồm Oracle, Sybase, SQL Server và Informix. 
 # 4. Lưu ý
* Về các thông tin có thể tác động trực tiếp đến end-user từ hệ thống như số điện thoại, email, số CMND, số thẻ ngân hàng ..., chúng ta nên có sẵn những thông tin test được kiểm duyệt và đã được cho phép dùng để test. 
* Tránh tuyệt đối các trường hợp dùng các thông tin thật của end-users sau đó test chức năng bất kì. 
* Ví dụ nếu không may bạn đã chắc rằng chức năng bạn đang kiểm thử sẽ không hề gửi tin nhắn, cuộc gọi, email, ... cho địa chỉ trong data nhưng hệ thống phát sinh lỗi khiến điều tưởng chừng không thể thành có thể, thì sẽ gây ra các hậu quả rất nghiêm trọng. Hoặc, nếu bạn vô tình kiểm thử chức năng sharing nhưng phát sinh lỗi với content chứa số CMND, số thẻ ngân hàng,.. thật của KH, thì đây cũng là một hiểm họa rất lớn cho nhiều bên.
# 5. Tổng kết
Tóm lại, test data được thiết kế tốt sẽ giúp bạn phát hiện và báo cáo nhanh chóng các lỗi nghiêm trọng của hệ thống. Việc lựa chọn và thiết kế test data phải được đánh giá lại trong mọi phase của quá trình phát triển sản phẩm. Vì vậy, hãy luôn để mắt đến nó!
# Tham khảo:
 https://www.guru99.com/software-testing-test-data.html
 https://www.softwaretestinghelp.com/test-data-generation-tools/