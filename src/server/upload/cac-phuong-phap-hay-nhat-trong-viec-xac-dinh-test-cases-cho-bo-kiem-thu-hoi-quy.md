Phân tích tác động của việc thay đổi và lịch sử của defects, cả hai nội dung này đều đóng vai trò quan trọng trong việc xác định các Test case.
# 1. Background: Kiểm thử hồi quy phần mềm 
Kiểm thử hồi quy được thực hiện nhằm đảm bảo rằng một hệ thống hoặc một ứng dụng được kiểm thử (AUT) hoạt động như mong đợi sau khi cải tiến hoặc fix bug. Các hoạt động kiểm thử được diễn ra sau khi phần mềm có sự thay đổi và kiểm thử hồi quy thường được đề cập đến là các hoạt động kiểm thử được hoàn thành trong giai đoạn bảo trì phần mềm. Mục tiêu chính của kiểm thử hồi quy bao gồm: kiểm tra các components hoặc các phần đã thay đổi và sau đó kiểm tra sự ảnh hưởng của chúng đối với các function khác của hệ thống. Kiểm thử hồi quy được thực hiện ở các mức độ khác nhau: unit, integration, functional và system.

**Kiểm thử hồi quy là cần thiết vì nhiều lý do khác nhau như:**
- Thay đổi Incremental code trong một project hoặc một bản release.
- Các bản phát hành hoặc các dự án lớn đang hoạt động  
- Các hoạt động sửa lỗi sản phẩm khẩn cấp 
- Thay đổi cấu hình và môi trường

**Quá trình kiểm thử hồi quy bao gồm các bước được xác định như biểu đồ bên dưới:**

![](https://images.viblo.asia/978b94d3-db7c-47fe-a0c8-dd97347ed523.jpg)
# 2. Làm thế nào để chọn được Test Cases cho kiểm thử hồi quy?
Việc chọn các test case cho các gói kiểm thử hồi quy không phải là một bài toán   tầm thường. Có ba loại test suite được thực hiện trong mỗi lần release ứng dụng phần mềm: kiểm thử hồi quy, kiểm thử phát hành cụ thể và kiểm tra xác minh các lỗi đã được fix. Cần suy nghĩ cẩn thận và chú ý đến việc lựa chọn các bộ kiểm thử phù hợp cho gói kiểm thử hồi quy.
Dưới đây là một số hướng dẫn cụ thể cho việc thực hiện lựa chọn này: 

**1. Bao gồm các test case có lỗi thường xuyên xảy ra**: Một số vùng trong ứng dụng rất dễ bị lỗi vì chúng thường fail sau một vài thay đổi nhỏ về mặt coding. Chúng ta có thể theo dõi các trường hợp kiểm thử không thành công này trong suốt chu kỳ của sản phẩm và cover chúng trong bộ kiểm thử hồi quy.

**2. Bao gồm các trường hợp kiểm thử xác minh các tính năng cốt lõi của ứng dụng**: Trước khi thiết kế các test case cần xác định tất cả các tính năng cốt lõi của ứng dụng. Đảm bảo rằng các trường hợp kiểm thử đã bao gồm tất cả các chức năng được đề cập trong spec. Người ta có thể sử dụng ma trận dấu vết (Traceability matrix) để đảm bảo rằng không có yêu cầu nào bị bỏ qua.

**3. Bao gồm các trường hợp kiểm thử cho các chức năng đã có những sự thay đổi**: Duy trì lịch sử thay đổi chức năng cho tài liệu kiểm thử để xác định các trường hợp kiểm thử có trong bộ kiểm thử hồi quy.

**4. Bao gồm tất cả các trường hợp kiểm thử tích hợp**: Ngay cả khi kiểm thử tích hợp là một phần riêng biệt của chu kỳ kiểm thử phần mềm, các trường hợp kiểm thử của nó phải được bao gồm trong bộ kiểm thử hồi quy. Việc sửa chữa vào phút cuối, một ứng dụng đã được kiểm tra có thể phá vỡ tính toàn vẹn giữa các module khác nhau. Ví dụ như: dữ liệu có thể bị mất trên một giao diện, các thông điệp có thể không được truyền đi đúng cách hoặc là giao diện có thể không được thực hiện như spec.

**5. Bao gồm tất cả các trường hợp kiểm thử phức tạp**: Một số chức năng của hệ thống chỉ có thể được thực hiện bằng cách làm theo một chuỗi các sự kiện giao diện đồ hoạ người dùng (GUI) phức tạp. Để mở file, một người dùng có thể phải nhấn vào menu "File" và sau đó chọn "Open", sử dụng hộp thoại để chỉ định tên file và sau đó tập trung ứng dụng vào cửa sổ mới mở. Rõ ràng, tăng số lượng các hoạt động có thể tăng thêm theo cấp số nhân về vấn đề trình tự. Điều này có thể trở thành một vấn đề nghiêm trọng, trong một số tình huống, chức năng của toàn bộ hệ thống sẽ bị ngừng hoạt động. Theo đó, tất cả các trường hợp kiểm thử phức tạp phải là một phần của bộ kiểm thử hồi quy.

**6. Ưu tiên các trường hợp kiểm thử để kiểm thử hồi quy**: Ưu tiên các trường hợp kiểm thử khi chúng liên quan đến các hoạt động kinh doanh và các chức năng quan trọng thường được sử dụng, Nó luôn luôn hữu ích nếu một phân tích được hoàn thành để xác định các trường hợp kiểm thử có liên quan. Một ý tưởng là phân loại các trường hợp kiểm thử thành các mức độ ưu tiên khác nhau dựa trên tầm quan trọng và việc sử dụng của khách hàng. Ở đây, các trường hợp kiểm thử được phân thành ba loại:

- **Ưu tiên 0**: Các trường hợp kiểm thử cho các chức năng cơ bản (theo SRS của ứng dụng), chúng được chạy để xác mình chấp nhận hệ thống trước và đảm bảo rằng các chức năng được kiểm tra lại sau khi trải qua một thay đổi lớn. Các trường hợp kiểm thử này mang lại giá trị dự án cao.

- **Ưu tiên 1**: Điều này bao gồm các trường hợp kiểm thử kiểm tra các chức năng cần thiết để mang lại giá trị dự án cao. 

- **Ưu tiên 2**: Chứng được thực thi như một phần của chu kỳ kiểm thử hệ thống và được chọn để kiểm thử hồi quy khi cần thiết. Các trường hợp kiểm thử này mang lại giá trị dự án vừa phải.

Việc lựa chọn các trường hợp kiểm thử dựa trên mức độ ưu tiên sẽ làm giảm đáng kể effort dành cho việc kiểm thử hồi quy.

**7. Phân loại các trường hợp kiểm thử đã chọn**: Kiểm thử hồi quy trở nên rất khó khăn khi phạm vi ứng dụng lớn và có các increment và các patch liên tục cho hệ thống. Trong những trường hợp như vậy, các kiểm thử chọn lọc cần được thực hiện để tiết kiệm chi phí và thời gian kiểm thử. Việc phân loại các trường hợp kiểm thử làm cho công việc này trở nên dễ dàng hơn. Chúng ta có thể đặt chúng thành hai loại chính:

- **Các trường hợp kiểm thử có thể sử dụng lại**: Bao gồm các trường hợp kiểm thử có thể sử dụng lặp đi lặp lại trong chu kỳ hồi quy thành công. Điều này có thể thực hiện tự động để tập các trường hợp kiểm thử có thể dễ dàng thực thi trên một bản dựng mới.
- **Các trường hợp kiểm thử lỗi thời**: Đây là lỗi cụ thể và không được sử dụng trong các chu kỳ thành công. Các thông minh để sử dụng chúng là khi các lỗi tương tự xảy ra.

**8. Chọn các trường hợp kiểm thử trên cơ sở từng trường hợp (case-to-case)**: Có thể có một số cách tiếp cận chính xác để kiểm thử hồi quy, nó phải được thực hiện trên cơ sở từng trường hợp, cụ thể:

- Nếu mức độ nghiêm trọng và tác động đến bản fix bug thấp thì nó đủ để một kỹ sư kiểm thử chọn ra vài trường hợp từ công cụ quản lý kiểm thử và thực thi chúng. Các trường hợp kiểm thử này có thể thuộc bất kỳ Mức độ ưu tiên nào ( 0, 1 hoặc 2).

- Nếu mức độ nghiêm trọng và tác động của bản fix bug là trung bình thì người kiểm thử cần phải thực hiện tất cả các trường hợp kiểm thử với Mức độ ưu tiên 0 và Mức độ ưu tiên 1. Nếu việc fix bug cần các trường hợp kiểm thử bổ sung từ Mức độ ưu tiên 2 thì các trường hợp kiểm thử đó cũng có thể được chọn và sử dụng để kiểm thử hồi quy. Tuy nhiên việc chọn các trường hợp kiểm thử Mức độ ưu tiên 2 trong trường hợp này là mong muốn nhưng không phải bắt buộc.

- Nếu mức độ nghiêm trọng và tác động của bản fix bug là cao thì chúng ta cần phải thức hiện tất cả các trường hợp Mức độ ưu tiên 0, Mức độ ưu tiên 1 và các trường hợp kiểm thử có mức độ ưu tiên được chọn cẩn thận. 

Người ta cũng có thể xem toàn bộ nhật ký thay đổi đã xảy ra do sửa lỗi và chọn các trường hợp kiểm thử để tiến hành kiểm thử hồi quy. Đây là một quá trình phức tạp nhưng có thể cho kết quả rất tốt. 

**9. Phân loại các trường hợp kiểm thử hồi quy dựa trên rủi ro phơi nhiễm**.
Việc phân loại các trường hợp kiểm thử hồi quy phải được thực hiện ở đầu dự án và được xác minh tại thời điểm Closure. Các trường hợp kiểm thử được phân loại dựa trên mức độ phơi nhiễm rủi ro của chúng và được tính toán dựa trên logic khoa học được đưa ra dưới đây:

**Risk Exposure (RE= R x P) = Requirements Risk (R) x Probability for Defect (P)**

![](https://images.viblo.asia/56e208f2-c661-4ce8-9952-16a53f073ec7.jpg)

**Probability for Defect (P) = Number of Defects (N) x Average Severity of the Defects (S)**

![](https://images.viblo.asia/b7e9ede0-3b18-4a7f-b2cd-8aa0922d6a81.jpg)

# 3. Kết luận
Việc xác định các trường hợp kiểm thử hồi quy là rất quan trọng và đòi hỏi phải có hiểu biết về các ứng dụng hoặc sản phẩm đang được kiểm thử. Phân tích thay đổi và lịch sử của các defect, cả hai đều đóng một vai trò quan trọng trong việc xác định các trường hợp kiểm thử. Do đó, sự kết hợp giữa người kiểm thử và người quản lý dự án có thể mang lại giá trị để xác định được các trường hợp kiểm thử hồi quy trong vòng đời của ứng dụng hoặc vòng đời của sản phẩm.


Link tham khảo: https://www.capgemini.com/2017/01/best-practices-in-identifying-test-cases-for-regression-suite/#