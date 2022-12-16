Như chúng ta đã biết, Regression Testing được coi là loại test phổ biến nhất và hầu hết tester đều biết qua loại test này. Loại kiểm thử này quan trọng và gần như là không thể thiếu trong hoạt động kiểm thử vì chúng ta không thể ( hoặc khó) đoán được liệu những thay đổi dù là nhỏ nhất có thể ảnh hưởng đến những module khác hay không. Do đó việc chạy hồi quy được coi là giải pháp an toàn nhất. Qua bài này chúng ta sẽ cùng nhau ôn lại kiến thức về Regression Testing và tìm hiểu về sự kết hợp của Regression Testing trong Scrum nhé.
# 1. Regression Testing là gì?
Regression Testing (Hay còn gọi là kiểm tra hồi quy) là một dạng kiểm thử phần mềm để xác minh rằng mọi tính năng mới hoặc yêu cầu thay đổi hoặc sửa lỗi không tạo ra bất kỳ tác động bất lợi nào đối với hệ thống làm việc hiện tại và không phát sinh thêm lỗi mới.
# 2. Tại sao cần Regression Testing? Và tại sao Regression Testing là quan trọng trong dự án Scrum?
## 2.1. Tại sao cần Regression Testing?
Chúng ta thường khó để biết được rằng liệu với một thay đổi dù là nhỏ nhất có thể ảnh hưởng đến những module khác hay không. Vậy nên chúng ta cần thực hiện Regression Testing để:
* Để đảm bảo sự phát triển liên tục của ứng dụng hoặc phần mềm mà không có bất kỳ lỗi nào
* Để khám phá tất cả các hồi quy phần mềm một cách hiệu quả và dễ dàng.
## 2.2. Tại sao Regression Testing là quan trọng trong dự án Scrum?
![](https://images.viblo.asia/573f7a7b-c075-4dd2-9fae-fd930cad3089.gif)
* Với phương pháp phát triển phần mềm với các mô hình truyền thống như Waterfall, giai đoạn testing sẽ tiến hành riêng biệt và chỉ sau khi giai đoạn phát triển hoàn thành.
* Với dự án phát triển theo mô hình Agile, giai đoạn testing được tiến hành đồng thời với việc phát triển và coding. Dự án được phát triển theo các chu kỳ và liên tục có những tính năng mới, tính năng thay đổi theo yêu cầu... trong mỗi lần chạy nước rút.

Do đó, chúng ta cần để kiểm tra liệu những thay đổi bao gồm sửa lỗi, sửa lỗi hiệu năng, thêm mới chức năng hay thay đổi yêu cầu có tạo ra lỗi mới, có ảnh hưởng đến hiệu suất và chức năng của phần mềm đã được kiểm tra hiện có; cần để đảm bảo các code đã tồn tại trong hệ thống sẽ không bị ảnh hưởng hay bị tác động tiêu cực đến nó, không ảnh hưởng đến các functions liên quan.
# 3. Khi nào cần thực hiện Regression Testing?
Kiểm tra hồi quy là cần thiết khi có một:
* Thay đổi trong yêu cầu và mã được sửa đổi theo yêu cầu
* Tính năng mới được thêm vào phần mềm
* Sửa lỗi
* Khắc phục sự cố hiệu suất 
# 4. Cách thực hiển Regression Testing.
Kiểm tra hồi quy có thể được thực hiện bằng các kỹ thuật sau:
### 1. Chạy tất cả các bài kiểm tra hiện tại

Điều này có nghĩa là tất cả các bài kiểm tra được viết và chạy trước nên được chạy lại sau khi phát hành. Tuy nhiên, đặc biệt nếu tất cả đều là thủ công, người kiểm tra sẽ có một đống công việc khổng lồ. Có lẽ bạn không có quá nhiều thời gian và tài nguyên để lãng phí. Thực tế là không thể thực hiện thử nghiệm tổng thể 100% sản phẩm cũng làm tăng thêm điều này.

### 2. Chạy thử nghiệm với rủi ro cao
Trong phương pháp này, bạn nên xem xét các thử nghiệm mang lại giá trị cao nhất cho người dùng doanh nghiệp của bạn. Hầu hết các thử nghiệm như vậy là những thử nghiệm phải thực hiện với chức năng và các hoạt động thường xuyên nhất của người dùng doanh nghiệp. Cũng không quá khi cũng lưu ý rằng với các thay đổi sản phẩm, các quy trình chính cũng có thể khác nhau. Phân bổ 30-40% tổng thời gian hồi quy cho các xét nghiệm có rủi ro cao tùy thuộc vào những thứ khác cần thử nghiệm.

### 3. Kiểm tra các tính năng có khuyết tật cao
Bạn cũng có thể kiểm tra các khu vực có khuyết tật cao của sản phẩm, thường là các khu vực rất phức tạp. Thông thường phức tạp là tính năng bao gồm các tính toán tinh vi hoặc tích hợp với các ứng dụng khác. Các chức năng có nhiều khiếm khuyết trong quá khứ cũng đến trong bộ này.

### 4. Thử nghiệm thăm dò
Đó là về xây dựng thiết kế trường hợp thử nghiệm cùng với việc thực hiện. Trong quá trình xây dựng và thực hiện các bài kiểm tra này, bạn có thể phát hiện ra các vấn đề trong ứng dụng sẽ thúc đẩy các bài kiểm tra sau của bạn.

### 5. Kiểm tra tự động hóa
Bạn có thể cắt số kiểm tra để được chạy thủ công bằng cách tự động hóa chúng. Để thực hiện nhanh chóng, hãy sử dụng các công cụ tự động giúp giảm thời gian chạy thử nghiệm. Tuy nhiên, hãy chắc chắn rằng bạn đã dành thời gian để phát triển các tập lệnh tự động hóa. Cũng lưu ý rằng trong trường hợp thay đổi môi trường, họ sẽ cần cập nhật tương ứng
# 5. Những thách thức mà team Agile phải đối mặt trong Regression Testing.
![](https://images.viblo.asia/e188a06c-fcfb-46e8-b0d8-d69c3fb49bf3.png)
Sau đây là các vấn đề kiểm tra chính để thực hiện kiểm tra hồi quy:
* Với các hồi quy liên tiếp, các bộ thử nghiệm trở nên khá lớn. Do hạn chế về thời gian và ngân sách, toàn bộ bộ kiểm tra hồi quy không thể được thực thi
* Tối thiểu hóa bộ thử nghiệm trong khi đạt được phạm vi thử nghiệm tối đa vẫn là một thách thức
* Xác định tần suất của Kiểm tra hồi quy, nghĩa là, sau mỗi lần sửa đổi hoặc mỗi lần cập nhật bản dựng hoặc sau một loạt các sửa lỗi, là một thách thức.


Kiểm tra hồi quy là điều cần thiết trong môi trường Agile. Tuy nhiên, để làm đúng, người kiểm thử phải tập trung vào bot hiệu quả và tốc độ của các trường hợp kiểm thử. Nếu không có một chiến lược vững chắc, nhiều vấn đề và thách thức có thể xảy ra trong quá trình của toàn bộ dự án.

# Tài liệu tham khảo
https://www.vivifyscrum.com/insights/regression-testing-in-agile?fbclid=IwAR2eH6HYFGMi1qsCb51hRxuLmzVtHmxmNveev8yHWY2sk8NoKoR7cG5jm4o

lambdatest.com/blog/building-a-regression-testing-strategy-for-agile-teams/

https://www.quora.com/Why-do-we-do-regression-testing

https://testfort.com/blog/category/regression-testing?fbclid=IwAR1Spy209Ur8RYgCWF7jdmqWR8EiBxE8wLXU9mHs4I-1ihPFFx6Pu8qn9s4