**CÁC PHƯƠNG PHÁP KIỂM THỬ.**

  Trong lĩnh vực kiểm thử phần mềm có rất nhiều các phương pháp được áp dụng hiện nay. Trong bài viết này chúng ta sẽ cùng tìm hiểu 3 phương pháp cơ b ản được áp dụng một cách phổ biến và rộng rãi nhất cùng với các ưu điểm và nhược điểm của nó, đó là: kiểm thử hộp đen, kiểm thử hộp trắng và kiểm thử hộp xám

**1.Kiểm thử hộp đen.**

  Kiểm thử hộp đen là một phương pháp kiểm thử mà các tester không cần quan tâm đến các hoạt động bên trong hệ thống chạy ra sao, không cần quan tâm đến các dòng lệnh bên trong hệ thống hệ thống như thế nào. mà chỉ cần tập trung vào các giá trị đầu vào và các giá trị đầu ra của hệ thống có đúng với kết quả mong đợi của các trường hợp kiểm thử không để từ đó đánh giá chất lượng hệ thống.

  Chính vì cơ chế như vậy nên phương pháp này có các ưu nhược điểm như sau:

| Ưu điểm | Nhựợc điểm | 
| -------- | -------- | 
| - Rất phù hợp và hiệu quả khi mà số lượng các dòng lệnh của hệ thống là lớn.| - Bị giới hạn ở độ bao phủ của các trường hợp kiểm thử.     | 
- Không cần truy cập vào các dòng lệnh.| - Sẽ không hiệu quả bởi thực tế các tester bị giới hạn kiến thức về hệ thống.     | 
- Phân biệt được rõ ràng quan điểm của người dùng với quan điểm của nhà phát triển.| - Độ bao phủ sẽ bị thiếu vì tester không kiểm tra được các đoạn lệnh của hệ thống hoặc tập trung vào các dòng lệnh dễ xảy ra lỗi.     | 
- Không cần đòi hỏi những kiến thức về ngôn ngữ lập trình ở các tester để có thể kiểm thử hệ thống.| - Sẽ khó để có thể thiết kế đầy đủ các trường hợp kiểm thử.     | 


  
**2.Kiểm thử hộp trắng.**

  Kiểm thử hộp trắng là việc nghiên cứu cụ thể chi tiết từng luồng hoạt động cũng như các dòng lệnh bên trong hệ thống. Kiểm thử hộp trắng cũng được gọi dưới các cái tên khác như: Glass testing hay open-box testing. Kiểm thử hộp trắng đòi hỏi tester phải có kiến thức về ngôn ngữ lập trình. Tester sẽ cần phải nghiên cứu vào bên trong hê thống cụ thể là các dòng lệnh để tìm hiểu chúng có chạy đúng hay không.

  Dưới đây là các ưu nhược điểm của phương pháp này:

| Ưu điểm | Nhựợc điểm | 
| -------- | -------- | 
| - Đối với những tester có kiến thức về ngôn ngữ lập trình sẽ rất dễ dàng để phát hiện ra những lỗi ở trong các dòng lệnh.| - Trên thực tế việc sử dụng các tester có kiến thức về ngôn ngữ lập trình sẽ làm gia tăng giá thành để phát triển phần mềm.     | 
- Giúp tối ưu hóa các dòng lệnh của hệ thống.| - Đôi lúc sẽ là không khả thi khi kiểm tra chi tiết từng dòng lệnh để có thể từ đó phát hiện ra các lỗi tiềm ẩn của hệ thống, có rất nhiều các luồng không thể kiểm tra được.     | 
- Các dòng lệnh không cần thiết hoặc các dòng lệnh có khả năng mang đến các lỗi tiềm ẩn sẽ bị loại bỏ.| - Rất khó để duy trì phương pháp này liên tục, cần phải có những tool chuyên biệt như tool về phân tích code hay tool về phát hiện lỗi và sửa lỗi.    | 
- Các tester có kiến thức về ngôn ngữ lập trình sau khi đã thực hiện phương pháp này thì sẽ dễ dàng đạt được độ bao phủ lớn nhất khi thực hiện thiết kế các trường hợp kiểm thử sau này.|   | 
  
**3.Kiểm thử hộp xám.**

  Kiểm thử hộp xám là một phương pháp kiểm thử mà đòi hỏi tester phải có một lượng kiến thức nhất định về các luồng hoạt động ở bên trong hệ thống. Khác với kiểm thử hộp đen, phương pháp mà tester chỉ quan tâm duy nhất để việc kiểm thử thông qua giao diện người dùng, kiểm thử hộp xám đòi hỏi tester phải truy cập vào các tài liệu thiết kế hệ thống cũng như hệ thống cơ sở dữ liệu của hệ thống. Do đó mà tester có thể chuẩn bị tốt hơn những dữ liệu cho việc kiểm thử cũng như các trường hợp kiểm thử trong quá trình lên kế hoạch kiểm thử hệ thống.
  
| Ưu điểm | Nhựợc điểm | 
| -------- | -------- | 
| - Vì là sự kết hợp giữa kiểm thử hộp trắng và kiểm thử hộp đen nên có được ưu điểm của cả hai phương pháp này.| - Vì phương pháp này không dựa trên việc truy cập code của hệ thống nên sẽ không tránh được việc độ bao phủ của các trường hợp kiểm thử bị giới hạn.| 
- Các tester sử dụng phương pháp này không dựa vào các dòng lệnh của hệ thống mà chủ yếu dựa trên các tài liệu định nghĩa giao diện cũng như các tài liệu đặc tả chức năng.| - Khi sử dụng phương pháp này thì nhiều trường hợp kiểm thử có thể bị dư thừa nếu mà những nhà thiết kế phần mềm đã chạy các trường hợp kiểm thử này trước đó.| 
- Trong phương pháp này các tester có thể thiết kế nên những trường hợp kiểm thử đặc biệt xung quanh các giao thức kết nối và các loại dữ liệu khác nhau.| - Việc kiểm tra tất cả các luồng đầu vào của hệ thống là không thể thực hiện được vì bị giới hạn về mặt thời gian kiểm thử và sẽ dẫn đến có rất nhiều các luồng hoạt động của hệ thống không được kiểm tra.| 
- Việc kiểm thử được hoàn thành từ góc nhìn của người dùng chứ không phải từ nhà thiết kế.|   | 
  
**4.Bảng so sánh giữa các phương pháp kiểm thử.**

| Kiểm thử hộp đen. | Kiểm thử hộp xám.| Kiểm thử hộp trắng | 
| -------- | -------- | -------- | 
|Không cần quan tâm đến các luồng hoạt động trong hệ thống.| Cần có kiến thức nhất định về các luồng hoạt động bên trong hệ thống.    | Cần nắm được toàn bộ các luồng hoạt động bên trong hệ thống.   | 
| Được biết đến với các tên gọi khác như: closed-box testing, data-driven testing hoặc functional testing.|Được biết đến với các tên gọi khác như: translucent testing.    | Được biết đến với các tên gọi khác như: clear-box testing hoặc code-based testing. |
| Được thực hiện bởi người dùng cuối, kiểm thử viên và lập trình viên.| Được thực hiện bởi người dùng cuối, kiểm thử viên và lập trình viên.    | Thường thì được hoàn thành bởi kiểm thử viên và lập trình viên.    |
| Việc kiểm thử dựa trên kết quả mong muốn và kết quả thực tế mà hệ thống trả về.| Việc kiểm thử dựa trên các sơ đồ về cơ sở dữ liệu và sơ đồ về các luồng dữ liệu.     | Dựa trên toàn bộ kiến thức về các luồng hoạt động bên trong hệ thống và các bộ dữ liệu kiểm thử phù hợp mà các kiểm thử viên tự thiết kế. |
| Vì chỉ quan tâm đến các giá trị đầu vào, kết quả đầu ra và kết quả mong đợi nên đây là phương pháp tốn ít thời gian nhất cũng như đô bao phủ các trường hợp không đầy đủ nhất.| Mức độ đầy đủ của các trường hợp kiểm thử ở mức vừa phải và mức độ tốn thời gian là vừa phải. |Đầy đủ nhất và tốn nhiều thời gian nhất  |
| Không thích hợp để kiểm tra các thuật toán trong hệ thống.| Không thích hợp để kiểm tra các thuật toán trong hệ thống.   | Thích hợp để kiểm tra các thuật toán trong hệ thống.   |
| Phương pháp này sẽ được hoàn thành bởi cơ chế phát hiện lỗi.| Các miền dữ liệu và các giới hạn có thể sẽ được test nếu các tester có kiến thức về nó.  | Các miền dữ liệu và các giới hạn sẽ được test.    |

Link tham khảo: https://www.tutorialspoint.com/software_testing/software_testing_methods.htm