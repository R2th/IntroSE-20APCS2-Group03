Nếu như ở phần trước chúng ta đã được biết Mảng trực giao (Orthogonal Array) là gì, ưu nhược điểm ra sao, những điều cần thiết liên quan đến OA như nào , các bước để tiến hành OA như thế nào ...
Thì bài viết này sẽ tiếp tục đi sâu vào "Nghiên cứu điển hình cho OATS" hơn nữa .!

## I. THU THẬP & PHÂN TÍCH DỮ LIỆU : 

Phân tích việc tạo ra các test case cho PSC(Promotional Sensitivity Calibration (Hiệu chuẩn độ nhạy khuyến mại)) bao gồm hai nhiệm vụ chính. 

Nhưng trước hết, đây là thông tin khái quát về đặc điểm và khả năng của công cụ OA.
Công cụ OA hoạt động trên đầu vào module cụ thể do chúng tôi cung cấp. Điều này xuất hiện dưới dạng các yếu tố và mức độ, trong đó một yếu tố duy nhất có thể có nhiều cấp độ. Để có một đầu ra được tối ưu hóa từ công cụ, cần phải có ít nhất 3 yếu tố có cấp độ thứ 2 trong mỗi yếu tố. Công cụ OA ở mức độ lớn có thể xử lý tới 9999 yếu tố.
Đây là cách chúng tôi chia nhỏ các task để thực hiện OA

### 1. NHIỆM VỤ 1: Quyết định các yếu tố & mức độ
Nhiệm vụ này liên quan đến việc tạo ra các yếu tố và các mức độ cần thiết của OA để tạo ra test case. 

Bảng excel sau đây chứa các yếu tố và mức độ khác nhau cho module Promotional Sensitivity

Mức độ yếu tố ban đầu:
![](https://images.viblo.asia/9a0dbaa6-762e-4296-811a-a6702297f4f2.png)
Nếu bạn nhận thấy, có một mã màu cụ thể được sử dụng giữa các yếu tố. Điều này biểu thị sự phụ thuộc giữa các cấp độ của các yếu tố riêng biệt. Ví dụ, 3 cấp độ đầu tiên của yếu tố 1 chỉ có thể di chuyển lên các mức 1, 2 hoặc 3 của yếu tố 2. Tương tự, có một sự phụ thuộc ở cấp độ thứ nhất của các nhân tố 3, 4, 5. ( Luồng của các kịch bản Promotional Sensitivity Calibration được bắt nguồn dựa trên logic nghiệp vụ và yêu cầu của khách hàng. )

### 2. NHIỆM VỤ 2: Xác định các yếu tố tổng hợp & loạI bỏ sự phụ thuộc
Nhiệm vụ tiếp theo là loại bỏ sự phụ thuộc giữa các yếu tố. Bài tập này được thực hiện để làm cho tất cả các yếu tố độc lập với nhau để tất cả các kịch bản bất hợp lý đều bị loại bỏ.
Tối ưu hóa các yếu tố liên quan đến việc kết hợp một hoặc nhiều yếu tố với nhau thành một yếu tố duy nhất chính là yếu tố tổng hợp. Những yếu tố này đồng nghĩa với mỗi cấp độ trong những yếu tố ban đầu hoàn toàn độc lập với các cấp độ của bất kỳ yếu tố nào khác. Bảng excel sau đây là tập hợp các yếu tố tổng hợp và mức độ.
Các cấp độ yếu tố tổng hợp:
![](https://images.viblo.asia/e4a4d6cb-08a3-488a-8142-b5f384de8555.png)

## II. THỰC HIỆN OA
Việc thực hiện OA gồm 3 task.
- Tạo ra test case
- Bổ sung test case cho phạm vi testing bị bỏ lỡ
- Loại bỏ ưu tiên của test case dựa trên mức độ ưu tiên
 
### 1. NHIỆM VỤ 1: Tạo test case OA
- Dựa trên phân tích được thực hiện trên các yếu tố và cấp độ cho Promotional Sensitivity Calibration, công cụ OA là đầu vào với tên của 3 yếu tố.
- Trong bước tiếp theo, mỗi yếu tố là đầu vào với 13, 5 và 4 cấp độ tương ứng. Tên tương ứng được gán cho mỗi cấp để hiểu rõ hơn.
- Cuối cùng danh sách các test case được tạo ra cho luồng Promotional Sensitivity Calibration. Báo cáo về tổng số kết hợp hợp lý cho phạm vi testing "toàn diện" đã mang lại tổng số 260 test case. Một kiểm tra đơn giản về số lượng bằng cách nhân số lượng các cấp cho một kết hợp cụ thể (ví dụ 13 * 5 * 4 = 260), như được thấy dưới đây:

Tạo ra test case cho OA
![](https://images.viblo.asia/e4caf374-6643-44d6-9fa5-ef810d15c247.jpg)


| Kết hợp | Mức độ phù hợp | % tổng |
| -------- | -------- | -------- |
| Loại khuyến mãi -> Loại doanh số     | 65     | 100     |
| Loại khuyến mãi -> Tính toán yếu tố tăng tốc quảng cáo    | 52    | 100     |
| Loại doanh số-> Tính toán yếu tố tăng tốc quảng cáo    | 20     | 100     |
| Loại khuyến mãi -> Loại doanh số -> Tính toán yếu tố tăng tốc quảng cáo     | 260     | 25     |
||
Báo cáo trên chỉ cung cấp danh sách tất cả các kết hợp có thể có ,trong đó chỉ một phần trong số này sẽ có trong danh sách cuối cùng. Bây giờ đây là nơi mà mấu chốt của việc triển khai công cụ OA được thực hiện. 

Công cụ OA tạo danh sách tất cả các test case cung cấp mức độ phù hợp tối đa cho tất cả các yếu tố và cấp độ trong tất cả 260 kịch bản có thể. Báo cáo cuối cùng chứa danh sách các test case có 65 test case. Số % phù hợp được đưa ra trong bảng trên cho biết mức độ phù hợp cho một kết hợp cụ thể đối với chỉ 65 test case. Đây là những gì chúng tôi sẽ làm trong giai đoạn tiếp theo (Nhiệm vụ 2 & Nhiệm vụ 3 sẽ được áp dụng khi % tổng nhỏ hơn 100% so với bất kỳ kết hợp nào).
 
### 2. NHIỆM VỤ 2: Các test case bổ sung cho mức độ phù hợp tối đa
Việc triển khai thành công của công cụ OA chỉ có thể thực hiện nếu mức độ phù hợp tối đa được đưa ra cho tất cả các tình huống. Như đã đề cập trước đó, sự kết hợp chứa tất cả 3 yếu tố không có bao quát hoàn chỉnh. Đây là nơi sự can thiệp của con người là cần thiết để bao quát được hết. Dựa trên kiến thức chuyên môn về domain và kiến thức trước về module, chúng tôi phải thêm tất cả các kịch bản mà không thể cover bởi tool. Sau đây là danh sách các test case sau khi bổ sung:
![](https://images.viblo.asia/b153e994-acea-4335-967c-1fa4ff1e1e2a.png)

### 3. NHIỆM VỤ 3: Xóa các test case ưu tiên thấp hơn
Mặc dù OA tạo ra các kịch bản bằng cách kết hợp tất cả các yếu tố, xem xét mức độ quan trọng của nghiệp vụ, xác suất và tác động của sự xuất hiện kịch bản trong sản xuất, các test case ưu tiên thấp hơn cần được tránh trong bước này. Sau đây là danh sách các test case không được xem xét cho danh sách cuối cùng:
![](https://images.viblo.asia/2177e670-5d40-489f-bf43-d03ab617e14b.png)
Do đó, sau khi phân tích kỹ lưỡng các test case, các kịch bản ưu tiên cao hơn được thêm vào và các test case có độ ưu tiên thấp bị loại bỏ.


| Mã màu| Số lượng test case | 
| -------- | -------- | 
| Các test case thu được bằng cách sử dụng OA   | 27     | 
| Thêm Test case thủ công    | 17     | 
|Total   | 44   | 

Vậy nên danh sách cuối cùng của test case được tạo ra là:

![](https://images.viblo.asia/ce722b84-11db-4d52-a3c4-fb8056c55788.jpg)

Câu hỏi chưa được trả lời vẫn còn là trên cơ sở những test case được thêm vào và loại bỏ. Dựa trên yêu cầu kinh doanh, chúng tôi phải đưa ra ưu tiên cho các cấp cụ thể. Điều này được thực hiện bởi vì chỉ có một số kịch bản nhất định sẽ xảy ra trong quá trình sử dụng ứng dụng trong thời gian thực. 

Ví dụ: trường hợp loại quảng cáo “Bán hàng (Tiếp thị trang web)” sẽ ưu tiên hơn khi nói đến “Cắt giảm tạm thời” hoặc “Thông tư”. Do đó chúng tôi phải ưu tiên hơn cho các kịch bản như vậy, cũng lưu ý rằng các tình huống khác không thể bỏ qua hoàn toàn.
Bảng sau đây mô tả mức độ ưu tiên của các kịch bản khác nhau và mức độ phù hợp cho từng trường hợp:

| Loại bán hàng | Mức độ ưu tiên (0-2) | Mức độ ưu tiên cá nhân (0-3) |Các test case được cover (trong 44 test case)|%|
| -------- | -------- | -------- |-------- |-------- |
| Thường xuyên - Số lượng bán hàng ban đầu     | 0     | 0     |27     |61,36   |
| Không thường xuyên - Nhiều quảng cáo - Thông tư     | 1     | 2   |5     |11,36   |
| Không thường xuyên - Nhiều chương trình khuyến mãi - Highest disc.     | 1     | 2     |4     |9,09     |
| Kết hợp - Nhiều chương trình khuyến mãi - Thông tư     | 2     | 3     |3     |6,8     |
| Kết hợp - Nhiều chương trình khuyến mãi - Highest disc.     | 2     | 3     |5     |11,36     |


- Mục tiêu chính của chúng tôi là đảm bảo rằng chúng tôi đang đưa ra mức độ phù hợp tối đa, hãy nhớ rằng kế hoạch thực hiện của chúng tôi không thể được kéo dài. 

| Tính toán yếu tố tăng tốc quảng cáo (PAF) | Ưu tiên (0-3)| Các test case được cover(trong 44 test case) |% |
| -------- | -------- | -------- | -------- |
| Đơn vị bán hàng trong tuần lễ bán hàng đầu tiên <0 -> PAF = 1     | 2     | số 8     | 18,1|
| Tổng doanh số bán trước trung bình <0 -> PAF = 1     | 2     | số 8     | 18,1 |
| Trung bình tổng các tuần trước bán hàng> 0 hoặc tổng số đơn vị bán hàng> 0 —–> giá trị trực tiếp được tìm thấy từ bảng MKDN     | 0     | 15     | 34,09 |
| Trung bình tổng các tuần trước bán hàng> 0 hoặc tổng số đơn vị bán hàng> 0 —–> giá trị gốc từ MAX của hệ số acc và DISC%     | 0     | 13     | 29,5 |

- Nó yêu cầu tất cả các kịch bản có độ ưu tiên cao hơn sẽ có được mức độ phù hợp cao hơn.
 
## III. KẾT LUẬN

Việc thực hiện công cụ OA đã dẫn đến việc tạo ra các test case hiệu quả bảo đảm mức độ phù hợp nhất cho tất cả các kịch bản.
Các lĩnh vực chính của cải tiến là hiệu quả test case, tỷ lệ để lọt bug, tỷ lệ từ chối lỗi, phạm vi testing và giảm effort. Sau đây là số liệu được sử dụng:

- Test case efficiency (Mức độ hiệu quả của test case) : Đây là tỷ lệ phần trăm test case có khả năng phát hiện lỗi trong ứng dụng.
- Defect Slippage ratio (Tỷ lệ lọt bug): Điều này đề cập đến số lỗi tìm thấy trong UAT (User Acceptance Testing) đã bị bỏ qua trong System Testing.
- Defect rejection ratio (Tỷ lệ từ chối lỗi) : Số này là số lỗi bị nhóm phát triển từ chối trong suốt quá trình System Testing.
- Test Coverage (Phạm vi testing) : Nó đề cập đến test case được đề cập đến các yêu cầu mà khách hàng đưa ra.
- Effort savings (Tiết kiệm công sức) : Đây là số effort được lưu để tạo ra test case, trước và sau khi triển khai OA. Đó là số giờ đã được lưu.



| No. | Số liệu | Chỉ tiêu được chấp nhận (%) |Trước khi triển khai OA |Đăng thực hiện OA |
| -------- | -------- | -------- |-------- |-------- |
|1| Test Case Efficiency     | 95%     | 85%     | 96%    |
|2| Defect Slippage Ratio     | 5%     | 15%     | 3%    |
|3|Defect Rejection Ratio     | 5%     | 6%     | 4%   | 
|4|Test Coverage     | 100%     | 80%     | 100%    |
|5|Effort Savings     | 20%     | 7PD     | 3 PD (58% nỗ lực được lưu)    |


Nó cũng đã giúp chúng tôi trong việc đưa ra một ước tính thích hợp cần thiết để thực hiện kiểm thử theo cách hiệu quả nhất. Thành công hoàn toàn của việc triển khai công cụ OA nằm trong việc sử dụng khả năng thống kê của công cụ kết hợp với kiến thức của người triển khai.


- Nguồn: http://toolsqa.com/blogs/orthogonal-array-testing-case-study-for-major-supermarket-retailer/