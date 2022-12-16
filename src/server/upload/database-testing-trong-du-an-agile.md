Ra đời vào đầu những năm 80, cơ sở dữ liệu có thể coi là bước ngoặt lớn trong ngành IT. Tuy nhiên, hơn 90% doanh nghiệp chỉ có 10 nhân viên sử dụng hệ thống CRM(hệ thống quản lý quan hệ khách hàng) và các giải pháp kinh doanh khác dựa trên cơ sở dữ liệu. Quản trị quan hệ khách hàng giúp doanh nghiệp tạo ra giá trị bền vững, nhưng nếu cơ sở dữ liệu bị lỗi thì sẽ gây tổn thất lớn cho doanh nghiệp. Để ngăn chặn điều đó, database testing cần thực hiện một cách kỹ lưỡng. Vậy làm thế nào để đưa database testing vào dự án Agile? Cùng tìm hiển trong bài viết này nhé.

![](https://images.viblo.asia/0908b6bd-1cec-417c-a0a1-dd924e22d5c1.jpg)

# Database testing có thực sự cần thiết?

Có thể bạn nghĩ  "Ứng dụng đã được test kỹ và mọi thứ hoạt động chính xác. Qúa trình test kết thúc, phần mềm hoạt động tốt nên không cần lãng phí thời gian test cơ sở dữ liệu." Trên thực tế, tổn thất do chất lượng dữ liệu kém hàng năm chiếm 20% khoản lỗ (611 tỷ USD) ở các công ty Mỹ. Database testing có thể phát hiện dữ liệu bị lỗi và cho hiển thị lỗi đó, từ đó ngăn chặn các tổn thất này. 

# Database testing: Test những gì?

![](https://images.viblo.asia/fcb1ba1c-a044-40a5-a924-0a2262dd50b5.jpg)

Cơ sở dữ liệu của các hệ thống lớn khá phức tạp, do đó tester có thể cảm thấy bị choáng ngợp bởi tổng thể trước mặt. Đừng lo lắng, về cơ bản việc test cơ sở dữ liệu xoay quanh ba point chính: luồng dữ liệu, logic nghiệp vụ và hiệu suất cơ sở dữ liệu. Những point trên có thể nhóm lại thành 2 kiểu test types là:

* Functional testing: test luồng dữ liệu và logic nghiệp vụ.
* Non-functional testing: test hiệu năng cơ sở dữ liệu.

Chi tiết từng test types sử dụng sẽ được trình bày dưới đây

# Functional testing: Hộp đen hay hộp trắng?
Với Functional testing có hai cách tiếp cận là hộp đen và hộp trắng.

Ở kiểm thử hộp đen, tester test bằng cách dùng hệ thống như end-user. Đây là một cách tốt để test xử lý dữ liệu và luồng nghiệp vụ. Kiểm thử hộp đen chỉ cần kiến thức về ứng dụng và một số kỹ năng test cơ bản. 

Khác với hộp đen, kiểm thử hộp trắng đòi hỏi kiến thức về ngôn ngữ truy vấn có cấu trúc (SQL). Sử dụng SQL, tester viết các truy vấn vào cơ sở dữ liệu để so sánh kết quả thực tế với kết quả đầu ra mong đợi.

Để đảm bảo luồng dữ liệu và logic nghiệp vụ hoạt động đúng thì cần sử dụng cả hai phương pháp trên.
Đã có cách tiếp cận rõ ràng, ta cùng đi vào testing process thực tế

## 1. Luồng dữ liệu

Luồng dữ liệu hoạt động đúng đảm bảo thao tác giao diện của người dùng được đáp ứng đầy đủ. Những điểm chính cần lưu ý khi test luồng dữ liệu:

**CRUD operations** (create-retrieve-update-delete): Đây là từ viết tắt mô tả các transactions giữa người dùng và chương trình. Cách tốt nhất để test CRUD là giả lập hành vi của người dùng và kiểm tra xem kết quả thực tế có phù hợp với kết quả mong đợi hay không. Điều thú vị là tập hợp các hành động của người dùng là hữu hạn bất kể ứng dụng có phức tạp thế nào. Test CRUD bao gồm cả việc kiểm tra ánh xạ dữ liệu dữ liệu, khi dữ liệu được ánh xạ chính xác đảm bảo rằng các table và record liên quan được cập nhật khi người dùng thực hiện các giao dịch.

**ACID**: Là từ viết tắt mô tả tập hợp requirements đối với các giao dịch với cơ sở dữ liệu. Những yêu cầu này bao gồm:
* Atomicity (Tính nguyên tử)- còn gọi là quy tắc “all or nothing”, đảm bảo rằng giao dịch với cơ sở dữ liệu được coi như một nguyên tử  là đơn vị nhỏ nhất và không thể phân chia. Giao dịch sẽ xảy ra hoàn toàn hoặc không xảy ra.
* Consistency (Tính nhất quán) - đảm bảo rằng cơ sở dữ liệu vẫn đúng(không có conflic) bất kể giao dịch có thành công hay không.
* Isolation (Độc lập) - đảm bảo các giao dịch khác nhau không ảnh hưởng lẫn nhau khi chúng được thực hiện từng cái một hoặc cùng một lúc.
* Durability (Bền vững) - đảm bảo khi giao dịch hoàn thành, kết quả giao dịch luôn ổn định bất kể điều kiện bên ngoài (ví dụ mấtkết nối hoặc mất điện).

Các thuộc tính trên tăng độ tin cậy cho việc xử lý thông tin trong cơ sở xử liệu.

Đối với ACID, cách hiệu quả nhất là làm theo black-box. Các thuộc tính ACID xác định chi tiết testcase có liên quan. Ví dụ:

Consistency (Tính nhất quán) - đảm bảo rằng cơ sở dữ liệu vẫn đúng(không có conflic) bất kể giao dịch có thành công hay không.
         ![](https://images.viblo.asia/80424efb-b32d-4390-b6ad-33418c184c97.jpg)


Data integrity (Toàn vẹn dữ liệu): Trong quá trình vận hành hệ thống, dữ liệu được thay đổi liên tục. Tuy nhiên có một số kiểu dữ liệu cần được đảm bảo toàn vẹn. Bao gồm:

* Tính toàn vẹn theo hàng: tất cả các hàng trong bảng có một ID duy nhất.
* Tính toàn vẹn theo cột: tất cả các cột trong bảng phải cùng format.
* Tính toàn vẹn tham chiếu tạo ra relationships giữa các bảng.
* Tính toàn vẹn do người dùng định nghĩa: được thể hiện trong ứng dụng có độ complex cao và dựa trên logic tùy chỉnh (triggers, stored procedures, functions, các ngôn ngữ lập trình khác SQL)

Mục đích chính của việc kiểm tra tính toàn vẹn dữ liệu là đảm bảo rằng các thao tác của người dùng không làm thay đổi những kiểu dữ liệu được liệt kê ở trên. Vì vậy, testcase cần có sẽ kết hợp những case "incorrect": các case mâu thuẫn với logic nghiệp vụ, nhập sai dữ liệu, bỏ qua các quy tắc đầu vào cho một hàng / cột cụ thể, xóa dữ liệu được tham chiếu trong bảng khác. Trong tất cả các trường hợp này, cơ sở dữ liệu sẽ báo lỗi và ngăn chặn những thay đổi này.

Để verify luồng dữ liệu, communicat với dev là cần thiết, tester sẽ hiểu rõ hơn về luồng dữ liệu.

## 2. Logic nghiệp vụ

Logic nghiệp vụ xác định các quy tắc để tạo, lưu trữ, thay đổi và hiển thị dữ liệu và mô tả các  business objects nên tương tác như thế nào. 

Cả hai phương pháp hộp đen và hộp trắng đều có thể test Logic nghiệp vụ. White box testing được chạy khi ứng dụng chưa sẵn sàng(chưa thể sử dụng được như end-user). Nó tập trung vào hoạt động kiểm tra tính chính xác của trigger, relational constraints và stored procedures  bằng cách sử dụng các truy vấn SQL. Kiểm tra hộp trắng giúp phát hiện và giải quyết các vấn đề về code nhanh chóng.

Khi White box testing hoàn tất thành công, nhóm thử nghiệm có thể tiến hành black-box testing để verify logic nghiệp vụ khi làm việc trên giao diện người dùng.

# Functional testing: Hiệu suất cơ sở dữ liệu

Kiểm tra hiệu suất cơ sở dữ liệu có thể hiểu như stress và load testing. Load testing kiểm tra số lượng truy vấn cơ sở dữ liệu có thể xử lý tại một thời điểm. Chỉ số báo hiệu suất (KPI) là thời gian cơ sở dữ liệu cần để đáp ứng với các truy vấn của người dùng (càng ít càng tốt). Stress testing là Load testing đến break point và xem có bao nhiêu người dùng có thể truy cập cơ sở dữ liệu cùng một lúc.

Để kiểm tra hiệu suất cơ sở dữ liệu, có hai sự lựa chọn là manual và automated testing. Để chọn phương pháp hợp lý, bạn nên xem xét số lượng người dùng của cơ sở dữ liệu đang test. Có thể kiểm tra hiệu suất của hệ thống CRM cho một doanh nghiệp nhỏ theo cách thủ công, nhưng với một số ứng dụng web có hàng trăm người dùng thì manual testing không khả thi. Có một số công cụ để kiểm tra hiệu suất cơ sở dữ liệu tuy nhiên giá thành khá đắt đỏ.
# Tổng kết

Thoạt nhìn, kiểm tra cơ sở dữ liệu kỹ lưỡng trong các dự án Agile có vẻ khó khăn. Tuy nhiên, với kế hoạch đúng đắn, effort đưa ra không hề lãng phí.

Đầu tiên, bạn có thể break các quan điểm test cơ sở dữ liệu thành hai loại functional and non-functional testing. Functional testing bao gồm luồn dữ liệu và logic nghiệp vụ. non-functional testing là về hiệu năng cơ sở dữ liệu. Để việc test hiệu quả, bạn nên tính đến các chi tiết cụ thể sau:

* Đối với functional: cần phải chạy cả thử nghiệm hộp đen và hộp trắng để đảm bảo phạm vi kiểm tra đầy đủ và tích cực trải nghiệm người dùng.
* Đối với non-functional: việc lựa chọn giữa manual và automated testing phụ thuộc vào phạm vi người dùng (nhỏ, trung bình hoặc lớn). Trong trường hợp chọn automated, bạn nên lưu ý các chi phí bổ sung để có kế hoạch đối với ngân sách.

Hiểu biết tốt về phạm vi và các rủi ro liên quan cho phép test toàn diện và hiệu quả trong thời hạn dự án Agile.

> Nguồn dịch: http://istqbexamcertification.com/how-to-run-database-testing-in-agile-projects/