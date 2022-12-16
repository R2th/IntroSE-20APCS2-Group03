Bài test của bạn đã thực sự tốt?

Có lẽ bạn đã dành ra rất nhiều thời gian để viết, chạy và bảo trì chúng. Và bạn cảm thấy tuyệt vời khi tất cả các bài test của bạn đều pass. Nhưng khi tôi hỏi các tác giả test: "Làm thế nào bạn biết các bài test của bạn đã đủ mạnh?" hoặc "Có những bài test nào khác mà bạn chưa nghĩ đến không?". Họ đều lăn tăn.

Điều gì sẽ xảy ra nếu thật sự điều gì đó bị bỏ lỡ, và các developer cũng như tester đều đang hạnh phúc khi không biết rằng họ đang ship bom hẹn giờ cho khách hàng? Làm thế nào để họ biết điều đó? Và ai đang test?

Điều gì sẽ xảy ra nếu bạn có thể nhận ra các bài kiểm tra của bạn tốt như thế nào chỉ bằng cách sửa đổi mã để nó hoạt động khác đi, từ đó xem có thử nghiệm nào thất bại không? Điều gì sẽ xảy ra nếu bạn có thể tạo ra một sự thay đổi nhỏ, chạy các bài test, và xem nó có đủ tốt để nhận ra sự khác biệt đó không?

Đó chính là khái niệm đằng sau Thử nghiệm đột biến. Và đây là cách nó có thể giúp bạn.

### Chào mừng đến với thế giới của code mutation

Mutation testing, bắt đầu trở lại vào những năm 1960, đưa fault vào code của bạn để xem một nhóm bài test có thể phát hiện ra sự thay đổi tốt như thế nào. Sự thay đổi code theo cách này trở thành một "mutation", và mục tiêu là làm cho bộ bài test của bạn có thể "giết đột biến" bằng một hoặc nhiều bài test fail.

Một đoạn code mutation là một thay đổi nhỏ có ảnh hưởng đến toàn bộ hành vi của đoạn code đó. Ví dụ:

- Thay đổi toán tử số học, chẳng hạn thay phép cộng thành phép trừ, hoặc một dấu cộng thành toán tử gia tăng, hoặc một dấu hoa thị thành hai dấu hoa thị.
- Thay đổi toán tử logic, ví dụ: chuyển dấu ">" thành "<", hoặc ">="
- Remove một dòng code
- Gán một giá trị hard-code thay vì một biến

Bởi vì kiểu test này yêu cầu feedback nhanh, nên nó phù hợp nhất với unit test. Khi bạn tạo một biến đổi, một nhóm unit test cùng chạy. Nếu có một bài test fail, thì bạn đã bắt được, hoặc "kill" đột biến. Nhưng nếu tất cả các bài test đều pass, bạn có thể bỏ qua mutant code, hoặc có thể in nó ra để có thể xây dựng một unit test cho sau này.

### Lựa chọn lỗi cẩn thận

Các loại lỗi bạn truyền vào sẽ làm nổi bật nơi bạn đưa ra các giả định trong code, và sau đó là trong test. Hãy nghĩ về một lỗi gần đây mà bạn hoặc đồng nghiệp đã fix. Đó là một cơ hội tốt vì một triệu chứng của lỗi đó có thể xảy ra ở những chỗ khác, thậm chí ở chính nơi xảy ra lỗi đó. Một vài defect có thể tiếp tục được pass qua cho đến khi code ở một nơi nào đó không biết cách xử lý nó, dẫn đến defect.

Ví dụ: Có một phương thức lấy một số thông tin và sau đó tạo ra một tập nhỏ JSON data, chẳng hạn như một mảng các giá trị. Nếu developer đang test một tính năng mới, họ viết một unit test để confirm rằng mảng đó có một giá trị nhất định.

Họ có thể sẽ  không thử nghiệm thêm để verify dữ liệu có giá trị đúng hay kích thước mảng có chính xác hay không. Nhưng đây là những kiểu thử nghiệm sẽ giúp cho code của bạn phát hiện ra, từ đó bạn sẽ phát hiện ra những thay đổi không mong muốn sớm hơn. Xây dựng unit test để bắt đột biến ít hơn về chức năng và nhiều hơn về sự tỉnh táo. Nó sẽ giúp bạn tìm kiếm:

- Kết quả không hợp lệ hoặc dữ liệu rác từ một hoạt động
- Kiểu dữ liệu phù hợp đang được trả lại
- Tất cả các phần dữ liệu khác trong output đều chính xác
- Số lượng chính xác của các item đang được trả lại
- Không có lỗi làm tròn

Các loại đột biến bạn đưa vào code thực sự là những thứ dẫn đến lỗi thực tế. Con người vội vàng check mã vẫn còn chứa các hiện vật gỡ lỗi, hoặc họ quên bỏ ghi chú 1 dòng mã, hoặc họ mất tập trung và quên họ đang làm gì. Đó là lý do tại sao việc đưa các lỗi này vào code là hợp lý. Những thay đổi này sẽ thay đổi hành vi tổng thể của cả chương trình theo cách khó có thể debug sau này. 

Ở thời điểm này, có thể bạn sợ hãi khi nghĩ rằng bạn phải làm bằng tay. Nhưng thực tế, có các tool giúp thay đổi và chạy test nhanh hơn. Ví dụ: Jester cho JUnit, Pester cho Python, và Heckle cho Ruby,... Các tool này sửa đổi mã được biên dịch hoặc lắp ráp trong bộ nhớ, trong thời gian thực, và không phải source code. Nhưng quan trọng cần hiểu những khái niệm đằng sau các tool đó, để bạn có thể hiểu được cách sử dụng chúng sau này.

### Tại sao hồi sinh thử nghiệm đột biến?

Bởi vì công suất tính toán trong những năm thập niên 60 không mạnh như bây giờ, nên thử  nghiệm đột biến đã giảm xuống. Nhiều công ty không thể thực hiện nó mà vẫn hiệu quả về chi phí; việc test mất quá nhiều thời gian, hoặc họ yêu cầu trang thiết bị đắt đỏ để thực hiện. Nhưng ngày nay, chúng ta có nhiều công suất tính toán trong điện thoại hơn so với trong máy tính của những năm thập niên 60. Không chỉ có công suất tính toán rẻ, mà chúng ta còn có những đơn đặt hàng phần mềm có độ phức tạp cao hơn. Do đó, bạn cần loại thử nghiệm này.

Hình dung một hệ thống phức tạp khủng khiếp gồm 1000 web service kết nối với nhau, mỗi dịch vụ chứa 1000 class, mỗi class lại chứa 1000 method. Nếu có một mistake trong code ở bất cứ đâu trong hệ thống, nó sẽ dẫn đến bug. Để đưa ra tất cả các trường hợp kiểm thử cho tất cả những trường hợp đó để thực hiện và bao phủ tốt là điều không thể với một nhóm người, huống chi là một người. 

Nhưng đó là những thách thức mà các developer và tester phải đối mặt ngày hôm nay. Khi phần mềm vẫn tiếp tục phát triển, thì việc nghĩ ra tất cả các trường hợp thử nghiệm là không thể. Bạn cần một cái gì đó có thể giúp đỡ. Mutation testing có thể chiếu sáng nơi bạn cần unit test sâu hơn, để bạn có thể phát triển code chất lượng nhanh hơn.

### Mẹo và thủ thuật đột biến

Unit testing là loại test phù hợp nhất để sử dụng vì tốc độ mà các thử nghiệm đó thực hiện. Nhưng nếu bạn biến đổi một method trong một class của code base, thì liệu bạn có cần chạy lại toàn bộ unit test mà bạn có?

Không. Bởi vì chúng là unit test, và vì mục tiêu của chúng là các đoạn mã cụ thể, nên bạn chỉ cần chạy lại phân đoạn test nơi chạm vào mã cụ thể đó. Mutation testing cho phép điều đó. Hoặc, nếu bạn dũng cảm và muốn viết cho riêng mình, thì bạn có thể bao gồm logic phân đoạn đó trong solution.

Và trong thời đại điện toán đám may, tích hợp liên tục, và xử lý song song tồn tại, bạn có thể biến đổi nhiều phương thực trong các class, cùng một thời điểm, và lấy về feedback nhanh.

### Cách thực hiện mutating

Với công nghệ hiện đại ngày nay, bạn có thể start mutation testing nhanh hơn và rẻ hơn so với trước đây. Loại thử nghiệm này đã sẵn sàng cho một sự trở lại lớn. Rất ít người biết về loại thử nghiệm này, nhưng giờ bạn đã làm được. Bạn có sẵn sàng thực hiện nó trước cuộc cạnh tranh không?

Link tham khảo: https://techbeacon.com/app-dev-testing/mutation-testing-how-test-your-tests