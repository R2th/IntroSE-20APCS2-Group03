Nhiều bạn còn phân vân không rõ sự khác nhau giữa Retesting và Regression Testing, 
Retesting và Regression Testing  là một câu hỏi thường gặp đối với các bạn tester/ QA. Hôm nay mình sẽ nêu một số điểm khác nhau để mọi người dễ hình dung hơn nhé.
# 1. Khái niệm
- Retesting là gì?
Retesting (Kiểm tra lại): là một loại thử nghiệm được thực hiện để kiểm tra các case Failed trong lần thực hiện cuối cùng thành các case Passed sau khi các lỗi đã được fix.
- Retesting( Kiểm tra hồi quy) là gì?
Kiểm tra hồi quy: là một loại kiểm thử phần mềm được thực hiện để kiểm tra xem thay đổi code có làm xáo trộn các tính năng và chức năng hiện tại của Ứng dụng không.
# 2. Kiểm tra hồi quy
- Kiểm tra hồi quy được thực hiện để đảm bảo rằng sự thay đổi trong một phần của phần mềm không ảnh hưởng đến các phần khác của ứng dụng. 
- Hồi quy là thực hiện lại các trường hợp thử nghiệm cho phần không thay đổi để thấy rằng chức năng không thay đổi và đang hoạt động tốt. 
- Chu trình như sau: Design New Test => Execute test => Re test => Regresstion test

- Khi một lỗi được báo cáo, nhóm Dev sẽ sửa lỗi. Có khả năng dev sẽ thay đổi code và có thể dẫn đến các ảnh hưởng có thể không nhìn thấy ngay lập tức. Vì vậy, bất cứ khi nào thay đổi code, nhóm QA phải đảm bảo rằng không có ảnh hưởng của phần thay đổi đối với các phần khác của hệ thống.
- Đây là loại phương pháp xác minh được theo dõi trong trường kiểm tra các lỗi đã sửa.
# 3. Kiểm tra lại

- Kiểm tra lại được thực hiện để đảm bảo rằng lỗi được sửa bằng cách chạy lặp lại cùng một trường hợp kiểm tra. Nó được chạy trên cùng một code nơi thay đổi đã được thực hiện. 
- Ngoài ra, nó không liên quan đến việc kiểm tra các phần khác của phần mềm. Hơn nữa, Kiểm tra lại có nghĩa là chỉ kiểm tra lại một phần nhất định của ứng dụng.  Kiểm tra lại không xem xét nó sẽ ảnh hưởng như thế nào trong phần khác hoặc trong toàn bộ ứng dụng.

- Việc kiểm tra lại chỉ được thực hiện đối với các trường hợp Thử nghiệm thất bại. Khi có ít thời gian Thử nghiệm lại được ưu tiên hơn so với thử nghiệm hồi quy.
# 4. So sánh chi tiết giữa Retesting và Regression Testing


| Regression Testing| Re-testing| 
| -------- | -------- |
 |- Regression Testing (Kiểm tra hồi quy) được thực hiện để xác nhận xem một chương trình hoặc thay đổi code gần đây có ảnh hưởng xấu đến các tính năng hiện có hay không  |  - Re-testing (Kiểm tra lại) được thực hiện để xác nhận các trường hợp thử nghiệm Failed thì trong lần thực hiện cuối cùng được Passed sau khi các lỗi được khắc phục  | 
|- Mục đích của Kiểm tra hồi quy là việc thay đổi code mới nhất sẽ không ảnh hưởng đến các chức năng hiện có  | - Kiểm tra lại được thực hiện trên cơ sở các Defect được fix |
| - Xác minh lỗi không phải là một phần của Kiểm tra hồi quy    | - Xác minh lỗi là một phần của kiểm tra lại    | 
|  - Dựa trên dự án và tính sẵn có của tài nguyên, Kiểm tra hồi quy có thể được tiến hành song song với Kiểm tra lại  | - Ưu tiên kiểm tra lại cao hơn kiểm tra hồi quy, do đó, nó được thực hiện trước khi kiểm tra hồi quy    | 
|- Bạn có thể thực hiện tự động hóa để kiểm tra hồi quy, Kiểm tra thủ công có thể tốn kém và mất thời gian  | - Bạn không thể tự động hóa các trường hợp kiểm tra để kiểm tra lại |
| - Kiểm tra hồi quy được gọi là kiểm tra chung    | - Kiểm tra lại là một thử nghiệm theo kế hoạch    | 
|  - Kiểm tra hồi quy được thực hiện cho các trường hợp kiểm tra đã qua  |  -  Việc kiểm tra lại chỉ được thực hiện đối với các trường hợp thử nghiệm thất bại | 
| - Kiểm tra hồi quy kiểm tra các ảnh hưởng không mong muốn |- Kiểm tra lại đảm bảo rằng lỗi ban đầu đã được dev fix thành công  |
| - Kiểm tra hồi quy chỉ được thực hiện khi có bất kỳ sửa đổi hoặc thay đổi nào là bắt buộc trong một dự án hiện có    |  - Kiểm tra lại thực hiện một lỗi với cùng một dữ liệu và cùng một môi trường với các đầu vào khác nhau với một kịch bản mới  | 
|-  Các trường hợp thử nghiệm để kiểm tra hồi quy có thể được lấy từ đặc tả chức năng, hướng dẫn sử dụng và hướng dẫn sử dụng và báo cáo lỗi liên quan đến các vấn đề đã sửa   | - Các trường hợp thử nghiệm để kiểm tra lại không thể có được trước khi bắt đầu thử nghiệm.    |


* Trong các trường hợp kiểm thử hồi quy được trích xuất từ các trường hợp kiểm thử chức năng để đảm bảo rằng không có lỗi mới nào được đưa vào & kiểm tra xem các tính năng và chức năng ban đầu có hoạt động như mong đợi hay không và đảm bảo không có lỗi mới nào được đưa ra. 
* Khi bộ kiểm tra hồi quy được tạo, bạn có thể tự động hóa các trường hợp kiểm tra bằng công cụ tự động hóa nhưng tương tự không áp dụng cho Kiểm tra lại.

# 5. Phần kết luận
Lỗi được ghi lại bởi tester trong khi thử nghiệm ứng dụng và được fix bởi dev trong dự án. 
- Trong Kiểm tra lại, tester sẽ kiểm tra lỗi tương tự cho dù đã sửa hay không sử dụng các bước để sao chép được đề cập trong lỗi. 
- Trong kiểm tra hồi quy, tester sẽ kiểm tra lỗi được fix tương tự không bị ảnh hưởng đến phần không thay đổi khác của ứng dụng, không phá vỡ chức năng hoạt động trước đó và bị hỏng do sửa lỗi.


# 6. Tham khảo
https://www.guru99.com/re-testing-vs-regression-testing.html
https://www.testingdocs.com/regression-testing-vs-re-testing/