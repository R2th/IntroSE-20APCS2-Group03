Thời đại công nghệ thông tin, doanh nghiệp công ty đang dần dần chuyển đổi số công. Áp dụng khoa học công nghệ vào quản lý, kinh doanh đang là xu hướng đứng đầu. Do đó các hoạt động đầu tư công nghệ đang được các nhà điều hành doanh nghiệp xem xét kỹ lưỡng về giá trị gia tăng, tức là tỷ suất lợi nhuận lớn hơn, chi phí hoạt động thấp hơn.

Cost of Quality - Chi phí chất lượng trong phát triển phần mềm là thước đo có thể hỗ trợ trong việc biến phần mềm thành một công cụ sinh lời cho các công ty. Các công ty đang xem xét ROI, tức là lợi tức cho tổ chức/công ty từ việc đầu tư vào phát triển phần mềm.

Ở bài viết này sẽ nghiêng về phía mặt ngoài của dự án hơn là trong quy trình sản xuất chi tiết, nên một số bạn có thể sẽ cảm thấy lạ lẫm, cùng tìm hiểu dưới góc nhìn của QA nhé.

![](https://images.viblo.asia/c9f2a2c8-de2d-4e11-b6f5-b1cc36e6167b.jpg)

# COQ là gì?

COQ là chi phí phát sinh để sản xuất một sản phẩm chất lượng cho khách hàng. Chi phí này bao gồm chi phí của tất cả các hoạt động được thực hiện một cách chủ động và có kế hoạch để ngăn ngừa các rủi ro từ sản phẩm và mang lại chất lượng tốt nhất.

Đương nhiên rồi bạn không thể cung cấp một sản phẩm không có lỗi, ý tưởng ở đây là giảm thiểu sự thất bại đối với các yêu cầu đã đưa ra từ trước, tức là bao gồm các yêu cầu Chức năng/Functional và Non Functional/Phi chức năng. Những mong đợi kỳ vọng từ sản phẩm là không thể đong đếm, nên việc thiết lập sự rõ ràng trong kỳ vọng chất lượng là rất quan trọng.

# Công thức tính COQ

**COQ = Cost of control + Cost of failure of control**

hoặc có nơi gọi là **COQ = Cost of Good Software Quality + Cost of Poor Software Quality**

![](https://images.viblo.asia/c1b74d4b-a418-4aec-850e-edb4ef8c63e5.png)

**Cost of Good Quality (COGQ)** = Prevention costs + Detection costs = Chi phí phòng ngừa và Chi phí phát hiện

**Cost of Poor Quality (COPQ)** = Internal failure costs + External failure costs = Chi phí hư hại từ bên trong + Chi phí hư hại từ bên ngoài

Mặc dù chúng ta luôn mong muốn kiểm tra tất cả các mặt về chất lượng, nhưng mỗi lần kiểm tra sẽ là mỗi lần phát sinh chi phí, vì vậy cần phải cân bằng và rõ ràng về **phạm vi chất lượng mong đợi** rõ ràng ngay từ đầu. Phạm vi trực thuộc này nên được chia sẻ với tất cả các bên liên quan trong dự án.

Quản lý chất lượng nhằm tạo ra sự cân bằng tốt và ưu tiên các tài nguyên có rủi ro cao - với một ngân sách mong muốn / tối ưu nhất.

Chất lượng của một sản phẩm thực sự rất quan trọng, nhưng điều đó không có nghĩa là cần phải đạt được ở cấp độ vi mô nhất của tất cả các tính năng. Bí quyết là đạt được sự cân bằng giữa **chất lượng và chi phí phát sinh** phù hợp theo yêu cầu của khách hàng với chi phí tối ưu nhất.

## Một số câu hỏi bạn nên cân nhắc khi bắt đầu:

- Phạm vi mong đợi của chất lượng Chức năng và Phi chức năng là như thế nào?
- Các quy trình và báo cáo được nhằm mục đích theo dõi và xem xét là gì?
- Quá trình thông báo lỗi khi bàn giao sản phẩm và hậu quả của nó sẽ xử lý như thế nào?
- Rà soát, cân nhắc lại về chi phí kế hoạch và chi phí thực tế, các cân nhắc về cải tiến quy trình trong làm việc.
- Các bên liên quan tới việc đánh giá chi phí này sẽ bao gồm những ai.

# Chất lượng của một sản phẩm là gì?
![](https://images.viblo.asia/a27eb4af-6fb7-4877-8b65-3327ce4a9f55.jpg)


Khi chúng ta đi mua sắm, cho dù là già trẻ, lớn bé, gái trai đều mong muốn có được sản phẩm tốt nhất không chỉ đáp ứng nhu cầu cốt lõi của chúng ta mà còn hiệu quả, tiết kiệm chi phí, và dễ sử dụng. Nôm là là muốn mọi thứ tốt nhất.

Kỳ vọng về chất lượng của sản phẩm phần mềm cũng vậy, không chỉ phần mềm có phục vụ "cái gì" hay không mà còn quan trọng nó phục vụ "như thế nào".

Thực tế khi bạn đặt một Homestay hoặc Khách sạn bằng trang web với miêu tả thơ mộng và nên thơ với mức giá hấp dẫn, nhưng trải nghiệm của bạn về nó thì rất tồi tệ. Điều đó dẫn tới bạn sẽ không có niềm tin vào đặt phòng online nữa hoặc ít nhất sẽ không phải là khách sạn đó nữa.

**Chất lượng - đề cập đến hiệu suất của Chức năng cũng như Phi Chức năng.**

Giống như mua iphone chính hãng với iphone hàng dựng vậy. Một bên mới 100% đầy đủ chức năng, còn seal, nhưng giá chính hãng của Apple. Một bên là cũng là mới, chính hãng nhưng hàng đã bị lỗi và thay thế, chỉnh sửa quá nhiều khi ở trên kệ hàng. 

Vì vậy mặc dù có thể sản phẩm của bạn đáp ứng được yêu cầu của khách hàng, nhưng về cốt lõi bên trong của nó lại không thể đáp ứng kỳ vọng (như ví dụ hàng dựng ở trên).

**Chất lượng đề cập đến Thiết kế bên trong của sản phẩm phần mềm, Độ tin cậy và Khả năng vận hành của nó**


# Chất lượng chức năng và phi chức năng bao gồm

1. **Fitness for Purpose**: Phần mềm thực hiện tất cả các tác vụ như được chỉ định trong tài liệu mô tả chức năng - Software Requirement Specification.
2. **Infrastructure Support**: Phần mềm hỗ trợ môi trường có thể hoạt động và có thể mở rộng. Ví dụ: Trang web hoạt động ổn định trên tất cả trình duyệt hiện có hay không.
3. **Cost**: Các chi phí liên quan đến việc phát triển và cung cấp phần mềm nằm trong ngân sách.
4. **Process**: Quy trình phát triển và xem xét được thiết lập theo các tiêu chuẩn cụ thể.
5. **Management**: Hệ thống xem xét và giám sát có tất cả các điểm để đánh giá và đảm bảo chất lượng Sản phẩm.
6. **Reporting**: Báo cáo, tài liệu kịp thời, thông tin cụ thể và có thể hành động được.
7. **Functional Suitability / Appropriateness**: Tính phù hợp, chính xác và tuân thủ.
8. **Performance Efficiency**: Thời gian phản hồi, tuân thủ các quy tắc sử dụng tài nguyên như thế nào.
9. **Compatibility (Inter-Operability)**: Cùng tồn tại, khả năng thay thế, khả năng tương tác. Ví dụ: Trang web có thể sử dụng được từ điện thoại di động / iPad không?
10. **Usability**: Dễ sử dụng, có sẵn trợ giúp hay không. Ví dụ: Trang web có dễ điều hướng và sử dụng không?
11. **Reliability**: Khả năng chịu lỗi, tính khả dụng, khả năng phục hồi. Ví dụ: Ứng dụng có hiển thị các vé đặt chỗ khi có sự cố tắt nguồn thiết bị trong khi in vé không?
12. **Sercurity**: Tính bảo mật, tính toàn vẹn, tính xác thực. Ví dụ: Dữ liệu cá nhân được chia sẻ trên trang web có an toàn không?
13. **Maintainability**: Khả năng tái sử dụng của chức năng, dễ thay đổi, dễ sao chép, khả năng kiểm tra, tính ổn định. Ví dụ: Làm thế nào dễ dàng để cải thiện trang web với các tính năng mới thêm vào?
14. **Portability**: Dễ cài đặt, di động, thích ứng, tuân thủ. Ví dụ: Trang web sẽ hoạt động theo cách tương tự nếu hệ điều hành được thay đổi / cập nhật hay không?


Ở phần này chúng ta hiểu được thế nào là chất lượng của một sản phẩm. Phần sau chúng ta tìm hiểu chi tiết hơn thế nào là Good quality thế nào là Bad quality. Chi tiết hơn về chất lượng của từng giai đoạn sản phẩm.

![](https://images.viblo.asia/f90574a7-49fc-46c4-9891-d634e71a8f13.jpg)

-----

Source: https://www.softwaretestinghelp.com/coq-cost-of-quality-tutorial/

Ảnh: Internet