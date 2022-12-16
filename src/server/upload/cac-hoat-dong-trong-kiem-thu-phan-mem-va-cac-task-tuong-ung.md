![](https://images.viblo.asia/fa893bd3-b320-4844-9fe1-4b2036f0c7fe.png)

*Test activities*

Trong Agile bao gồm các giai đoạn lặp nhỏ của thiết kế, xây dựng và kiểm thử phần mềm xảy ra liên tục, được hỗ trợ bởi kế hoạch liên tục. Vì vậy, các hoạt động test cũng diễn ra trên cơ sở lặp đi lặp lại, liên tục trong phương pháp phát triển này. 

## 1. Test planning

![](https://images.viblo.asia/10cc98bd-c7c8-4ed8-bcdf-e19f790a1f7e.png)

*Test planning*

**Task**

* Xác định mục tiêu kiểm thử và cách tiếp cận để đáp ứng các mục tiêu kiểm thử. <br?
Ví dụ: chỉ định các kỹ thuật kiểm tra phù hợp và các nhiệm vụ và xây dựng một lịch trình kiểm thử  để đáp ứng thời hạn.
* Có thể xem xét lại dựa trên những phản hồi từ hoạt động giám sát và kiểm soát.  

**Work product**

Một hoặc nhiều Test plan bao gồm các thông tin sau:
* Thông tin về test basis mà các test work product khác sẽ liên quan thông qua thông tin truy xuất nguồn gốc
* Tiêu chí thoát (hoặc định nghĩa hoàn thành) sẽ được sử dụng trong quá trình theo dõi và kiểm soát

## 2. Test monitoring and control 


**Task**

* Liên quan đến việc so sánh về tiến độ thực tế đang diễn ra so với test plan bằng cách sử dụng bất kỳ số liệu giám sát kiểm tra nào được xác định trong test plan.
* Liên quan đến việc thực hiện các hoạt động cần thiết để đáp ứng các mục tiêu của Test plan.
* Được hỗ trợ bởi việc đánh giá các tiêu chí thoát để thực hiện kiểm thử như là một phần của cấp độ kiểm tra nthử được đưa ra có thể bao gồm:<br>
    * Kiểm tra test result và logs theo các tiêu chí thực hiện kiểm thử được đưa ra
    * Đánh giá mức độ chất lượng của bộ phận hoặc hệ thống dựa trên test result và logs
    * Xác định xem có cần có cần kiểm thử thêm hay không/
*  Cung cấp báo cáo tiến độ kiểm thử, bao gồm sai lệch so với kế hoạch và thông tin để hỗ trợ bất kỳ quyết định dừng kiểm thử nào. 
 
**Work product**

* Báo cáo tiến độ kiểm thử( được đưa ra trên cơ sở liên tục và / hoặc thường xuyên)
* Báo cáo tóm tắt kiểm thử (được đưa ra tại các mốc hoàn thành khác nhau)

## 3. Test analysis
**Task**

* Phân tích test basis phù hợp với mức kiểm tra đang được xem xét:
    - Thông số kỹ thuật yêu cầu
    - Thông tin thiết kế và thi công
    - Việc thực hiện các thành phần hoặc hệ thống
    - Báo cáo phân tích rủi ro

* Đánh giá cơ sở kiểm tra và các mục kiểm tra để xác định các loại khiếm khuyết, chẳng hạn như:
    - Sự mơ hồ
    - Bỏ sót
    - Sự không nhất quán
    - Không chính xác
    - Mâu thuẫn
    - Báo cáo thừa
* Xác định các tính năng và bộ tính năng sẽ được kiểm thử
    - Xác định và ưu tiên các điều kiện thử nghiệm (đặc điểm chức năng, phi chức năng và cấu trúc, các yếu tố kinh doanh và kỹ thuật khác và mức độ rủi ro)
    - Nắm bắt truy xuất nguồn gốc hai chiều giữa từng yếu tố của cơ sở thử nghiệm và các điều kiện thử nghiệm liên quan

**Work product**

Xác định và ưu tiên các điều kiện kiểm tra báo cáo biểu đồ kiểm tra có thể truy nguyên theo hai hướng báo cáo các lỗi trong test basis.


## 4. Test design

**Task**

* Thiết kế và sắp xếp độ ưu tiên các trường hợp và bộ kiểm thử
* Xác định dữ liệu kiểm tra cần thiết để hỗ trợ kiểm tra điều kiện và trường hợp kiểm tra
* Thiết kế môi trường thử nghiệm và xác định bất kỳ cơ sở hạ tầng và công cụ cần thiết
* Nắm bắt truy xuất nguồn gốc hai chiều giữa test basis, test conditions, test cases, và quy trình kiểm thử 

**Work product**
* High-level test cases, không có giá trị cụ thể cho dữ liệu đầu vào và kết quả mong đợi
* Có thể truy nguyên theo dõi các điều kiện kiểm thử mà nó bao gồm.
* Dữ liệu thử nghiệm, thiết kế môi trường thử nghiệm và nhận dạng
cơ sở hạ tầng và công cụ, mặc dù mức độ mà những kết quả này
được ghi nhận thay đổi đáng kể.
* Các điều kiện thử nghiệm được xác định trong phân tích thử nghiệm có thể được cải tiến thêm trong thiết kế thử nghiệm
## 5. Test implementation
**Task**

* Phát triển và ưu tiên các thử nghiệm thử nghiệm, và, có khả năng, tạo ra
kịch bản kiểm tra tự động
* Tạo các bộ kiểm tra từ các thử nghiệm và (nếu có) các bản kiểm tra tự động
Sắp xếp các bộ kiểm thử trong lịch thực hiện kiểm tra theo cách dẫn đến thực hiện kiểm thử hiệu quả
* Xây dựng môi trường kiểm tra và xác minh rằng mọi thứ cần thiết đã được thiết lập chính xác
* Chuẩn bị dữ liệu thử nghiệm và đảm bảo nó được tải đúng cách trong môi trường thử nghiệm
* Xác nhận và cập nhật truy xuất nguồn gốc hai chiều giữa test basis, điều kiện thử nghiệm, trường hợp thử nghiệm, quy trình thử nghiệm và bộ thử nghiệm

**Work product**

* Quy trình kiểm tra và giải trình tự các quy trình kiểm tra đó
* Test cases
* Lịch thực hiện kiểm tra
* Dữ liệu thử nghiệm dùng để gán giá trị cụ thể cho đầu vào và kết quả mong đợi của các trường hợp thử nghiệm
* Các kết quả dự kiến cụ thể được liên kết với dữ liệu thử nghiệm cụ thể được xác định bằng cách sử dụng một lời tiên tri thử nghiệm.
## 6. Test execution

**Task**

* Ghi lại ID và phiên bản của (các) mục thử nghiệm hoặc đối tượng thử nghiệm, (các) công cụ kiểm tra và phần mềm kiểm tra Thực hiện kiểm tra bằng tay hoặc bằng cách sử dụng các công cụ thực hiện kiểm tra
* So sánh kết quả thực tế với kết quả dự kiến
* Phân tích sự bất thường để xác định nguyên nhân có khả năng của chúng
* Báo cáo lỗi dựa trên những thất bại quan sát được
* Ghi log kết quả thực hiện kiểm tra (ví dụ: vượt qua, thất bại, bị chặn)
* Lặp lại các hoạt động kiểm tra hoặc là kết quả của hành động được thực hiện cho sự bất thường hoặc là một phần của thử nghiệm theo kế hoạch
* Xác minh và cập nhật truy xuất nguồn gốc hai chiều giữa cơ sở thử nghiệm, điều kiện thử nghiệm, trường hợp thử nghiệm, quy trình thử nghiệm và kết quả thử nghiệm.

**Work product**
* Tài liệu về tình trạng của các trường hợp thử nghiệm riêng lẻ hoặc thử nghiệm
các thủ tục (ví dụ: sẵn sàng để chạy, vượt qua, thất bại, bị chặn, cố tình bỏ qua,
Vân vân.)
Báo cáo lỗi
* Tài liệu về (các) mục kiểm tra, đối tượng kiểm tra, công cụ kiểm tra và
phần mềm kiểm tra đã tham gia vào thử nghiệm

## 7. Test completion

**Task**

* Kiểm tra xem tất cả các báo cáo lỗi có bị đóng hay không, nhập các yêu cầu thay đổi hoặc các mục tồn đọng của sản phẩm cho bất kỳ lỗi nào chưa được giải quyết khi kết thúc thực hiện kiểm tra

* Tạo một báo cáo tóm tắt thử nghiệm để được truyền đạt tới các bên liên quan

* Hoàn thiện và lưu trữ môi trường thử nghiệm, dữ liệu thử nghiệm, thử nghiệm
cơ sở hạ tầng và các phần mềm kiểm tra khác để tái sử dụng sau này

* Bàn giao phần mềm thử nghiệm cho các nhóm bảo trì, dự án khác
các nhóm và / hoặc các bên liên quan khác có thể hưởng lợi từ việc sử dụng nó

* Phân tích bài học rút ra từ các hoạt động kiểm tra đã hoàn thành để xác định các thay đổi cần thiết cho các lần lặp lại, phát hành và dự án trong tương lai
* Sử dụng thông tin thu thập được để cải thiện sự trưởng thành của quá trình thử nghiệm

**Work product**

* Báo cáo tóm tắt kiểm tra
* Các mục hành động để cải thiện các dự án hoặc lặp lại tiếp theo
* Thay đổi yêu cầu hoặc các mặt hàng tồn đọng sản phẩm
* Hoàn thành thử nghiệm.

### Tham khảo
istqb.org