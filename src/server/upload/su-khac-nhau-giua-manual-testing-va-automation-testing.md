## 1. Manual Testing là gì?
Manual testing là việc thử nghiệm một phầm mềm hoàn toàn được làm bằng tay bởi người tester. Nó được thực hiện nhằm phát hiện lỗi trong phầm mềm đang được phát triển. Trong manual testing, tester sẽ thực hiện các trường hợp kiểm thử và tạo báo cáo kiểm thử hoàn toàn thủ công mà không có bất kỳ sự trợ giúp của công cụ tự động nào.
## 2. Automation Testing là gì?
Automation testing là phương pháp kiểm thử tự động. Người tester sẽ phải viết các kịch bản kiểm thử sau đó sử dụng các tool hỗ trợ để thực hiện kiểm thử, phương pháp này sẽ giúp việc kiểm thử hiệu quả và tốn ít thời gian hơn. Automation testing giúp chạy các kịch bản kiểm thử lặp lại nhiều lần và các task kiểm thử khác khó thực hiện bằng tay như performance testing và stress testing.
## 3. Điểm khác nhau giữa Manual Testing và Automation Testing


| Parameter | Automation Testing | Manual Testing |
| -------- | -------- | -------- |
| Definition    | Automation testing sử dụng các tool để thực hiện các trường hợp kiểm thử     | Thực hiện kiểm thử hoàn toàn thủ công không có sự trợ giúp của bất kỳ công cụ tự động nào, được thực hiện bời tester    |
| Processing time|Thời gian kiểm thử rút ngắn hơn so với manual testing |Manual testing tốn nhiều thời gian và nguồn nhân lực |
| Exploratory Testing | Không cho phép kiểm thử khám phá  | Có thể kiểm thử khám phá trong manual testing  |
| Reliability | Kết quả kiểm thử đáng tin cậy vì nó được thực hiện bằng các tool và các kịch bản  | Kết quả kiểm thử không đáng tin cậy vì có khả năng xảy ra lỗi của con người  |
| UI change | Chỉ là thay đổi nhỏ trong giao diện AUT nhưng các kịch bản kiểm thử tự động cần phải sửa đổi để hoạt động đúng như mong đợi | Những thay đổi nhỏ thư thay đổi về id, class sẽ không cản trở quá trình kiểm thử |
| Investment | Cần phải đầu tư cho các công cụ kiểm thử | Cần đầu tư về nguồn nhân lực |
| Test Report Visibility | Tất cả các bên liên quan có thể đăng nhập vào hệ thống xem kết quả đã kiểm thử | Kết quả được lưu lại trong excel hoặc word |
| Performance Testing | Được thực hiện trong kiểm thử Load testing, stress testing   | Không khả thi trong kiểm thử Load testing, stress testing  |
| Parallel Execution | Có thể thực hiện song song trên cấc nền tảng vận hành khác nhau và giảm thời gian thực hiện kiểm thử| Kiểm thử song song trên các nền tảng khác nhau sẽ phải tăng nguồn nhân lực |
| Programming knowledge | Yêu cầu phải có kiến thức lập trình  | Không cần có kiến thức lập trình vẫn có thể thực hiện |
| Ideal approach  | Automation testing rất hữu ích khi thường xuyên thực hiện chạy lại một kịch bản nhiều nhiều lần| Manual testing hữu ích khi chạy bộ test case một hoặc hai lần |
## 4. Ưu, nhược điểm Manual Testing 
### Ưu điểm
* Dễ dàng cho việc test giao diện, người tester sẽ có phản hồi nhanh và trực quan về giao diện ứng dụng
* Mất ít chi phí cho các tool tự động và quy trình
* Khi có thay đổi nhỏ manual testing manual testing không bị mất nhiều thời gian để thay đổi các trường hợp kiểm thử 
### Nhược điểm
* Kết quả kiểm thử ít tin cậy hơn vì có thể sai xót do yếu tố con người
* Qúa trình thực hiện các ca kiểm thử không được ghi lại, do vậy nó không có tính tái sử dụng
* Với một số task khó thực hiện thủ công như performance testing và stress testing thì manual testing rất khó để thực hiện 
## 5. Ưu, nhược điểm Automation Testing 
### Ưu điểm
* Sử dụng tool tự động giúp tìm kiếm được nhiều lỗi hơn
* Automation testing nhanh và hiệu quả
* Qúa trình kiểm thử được ghi lại, điều đó giúp chạy lại kịch bản kiểm thử nhiều lần và thực hiện trên nhiều nền tảng khác nhau
* Automation testing được thực hiện bằng các công cụ phầm mềm, do đó nó hoạt động không mệt mỏi không giống như người kiểm thử tester
* Automation testing năng suất và chính xác
* Phạm vi kiểm thử rộng vì kiểm tra tự động không quên kiểm tra ngay cả đơn vị nhỏ nhất
###  Nhược điểm
* Rất khó có cái nhìn đúng và trực quan về giao diện người dùng như màu sắc, font chữ, vị trí, kích thước các button nếu như không có yếu tố con người
* Chi phí cho các tool kiểm thử có thể tốn kém, có thể làm tăng chi phí trong khâu kiểm thử của dự án
* Nếu có một thay đổi nhỏ cũng sẽ mất thời gian để update kịch bản kiểm thử
## Kết luận
* Manual testing là kiểm thử phần mềm trong đó các kiểm thử được thực hiện bởi QA
* Automation testing người tester sẽ viết các kịch bản test bằng các tập lệnh và nhờ vào sự giúp đỡ của các tool tự động để thực hiện kiểm thử
* Manual testing sẽ giúp có cái nhìn trực quan và chính xác về ứng dụng
* Automation testing giúp tìm thấy nhiều lỗi hơn
* Manual testing cho kết quả ít tin cậy hơn vì con người có thể mắc lỗi
* Automation testing tiêu tốn chi phí cho các tool kiểm thử, làm tăng chi phí của dự án
* Manual testing tiêu tốn thời gian và nguồn nhân lực
* Automation testing nhanh hơn và hiệu quả hơn so với manual testing 


### Tài liệu tham khảo:
https://www.guru99.com/difference-automated-vs-manual-testing.html