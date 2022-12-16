Đối với một dự án, có ba khía cạnh quan trọng cần chú ý đó là chi phí, thời gian và chất lượng. Bất kỳ dự án nào cũng có mục tiêu là có được một sản phẩm chất lượng cao nhưng giảm được chi phí và thời gian cần thiết để hoàn thành dự án. Vì thế mà kiểm thử phần mềm là một phần không thể thiếu của bất kỳ dự án nào. Kiểm thử phần mềm được phân loại gồm Manual testing(Kiểm thử thủ công) và Automation Testing (Kiểm thử tự động). Vậy kiểm thử thủ công và kiểm thử tự động có những ưu và nhược điểm gì và dựa vào đâu để bạn có thể quyết định thời điểm sử dụng kiểm thử thủ công và thời điểm sử dụng kiểm thử tự động để tối ưu hóa chi phí và thời gian của dự án.


## 1. Manual testing là gì?

![](https://images.viblo.asia/97180589-9ec6-4e7e-a47f-edb4fb3e6ea8.jpg)

Manual testing là việc thử nghiệm phần mềm được làm thủ công bởi con người. Và người thực hiện các công việc đó còn được gọi là Tester. 

Tester thực hiện manual testing đảm bảo rằng một phần mềm/ứng dụng hoạt động bình thường bằng cách tuân theo các điều kiện được viết trong testcase. Tester đánh giá thiết kế, chức năng và hiệu suất của ứng dụng bằng cách click vào các phần khác nhau của ứng dụng/hệ thống đó. 

***Ví dụ:*** Để kiểm thử một chức năng thêm vào giỏ hàng của một trang web thương mại điện tử, tester phải kiểm tra bằng cách thực hiện các thao tác cơ bản như một người dùng cuối của hệ thống, sau khi chọn được món hàng muốn mua trên trang web đó thì sẽ phải thao tác đối với nút nào để đưa được sản phẩm đó vào giỏ hàng. Phân tích kết quả nhận được sau khi thao tác với kết quả mong muốn để đưa ra kết luận xem chức năng đó của hệ thống có đang hoạt động đúng hay không.

## 2. Automation testing là gì?

![](https://images.viblo.asia/e5bd0d1b-8ab6-42c9-b64f-38190a1a8a46.jpg)

Automation testing là thực hiện kiểm thử phần mềm bằng một chương trình đặc biệt với rất ít hoặc không có sự tương tác của con người, giúp tester không phải lặp đi lặp lại các bước nhàm chán.
Trong Automation testing, có các pre-scripted tests được viết sẵn và chạy tự động. Các tests được chạy để so sánh kết quả thực tế với kết quả mong đợi. Các tests chạy tự động giúp tester xác định xem ứng dụng có hoạt động đúng như mong đợi hay không. Automated tests hoạt động rất hiệu quả khi cần thực hiện các kiểm tra lặp lại và hồi quy để đảm bảo rằng một ứng dụng hoạt động chính xác sau khi có thay đổi mới. Các automated tests chạy với sự trợ giúp của các công cụ, tập lệnh và phần mềm để thực hiện các hành động được xác định trước được viết trong test case.

## 3. Điểm khác nhau giữa Manual testing và Automation testing

![](https://images.viblo.asia/bab5896d-1c31-4c68-ae3d-f8c8d36dd33e.jpg)



| Manual testing | Automation testing | 
| -------- | -------- | 
| Manual testing vì là kiểm thử hoàn toàn do hành động của con người nên dễ bị gặp lỗi do con người gây ra. Vì thế mà độ tin cậy và độ chính xác kiểm thử thấp | Automation testing chạy với sự trợ giúp của các công cụ, tập lệnh và phần mềm nên có độ tin cậy cao hơn      | 
| Chi phí phụ thuộc vào nguồn nhân lực được sử dụng để kiểm thử     | Chi phí phụ thuộc vào các công cụ kiểm tra được triển khai để thực hiện kiểm thử.     |
| Thời gian cần thiết để kiểm thử thủ công nhiều hơn so với nguồn nhân lực cần để thực hiện nó     | Thời gian cần thiết để kiểm thử tự động ít hơn các công cụ phần mềm  cần để thực hiện các kiểm thử.     |
| Manual testing phù hợp khi các test case được chạy một hoặc hai lần. Do đó không có sự lặp lại thường xuyên các test case     | Automation testing phù hợp khi các test case cần phải chạy liên tục trong một thời gian dài.     |
| Manual testing giúp tìm ra sự thân thiện của ứng dụng đối với người dùng. Vì con người phải quan sát để tìm ra những điểm bất ổn của ứng dụng. Do đó Manual testing giúp cải thiện trải nghiệm của người dùng   | Automation testing không đảm bảo sự thân thiện của ứng dụng đối với người dùng. Vì không có sự quan sát của con người, không có đảm bảo về trải nghiệm khách hàng.     |

## 4. Vậy khi nào thì sử dụng Maunal testing và khi nào thì sử dụng Automation testing?

### 4.1. Khi nào thì sử dụng Manual testing

Manual testing là phù hợp nhất đối với:

•	**Exploratory Testing**: Đây là loại kiểm thử đòi hỏi phải thử nghiệm của kiến thức, kinh nghiệm, phân tích / logic kỹ năng, sáng tạo và trực giác. Xét nghiệm này được đặc trưng bởi các tài liệu ở đây kém bằng văn bản kỹ thuật, hoặc một thời gian ngắn để thực hiện. Chúng ta cần những kỹ năng của con người để thực hiện quá trình kiểm thử trong kịch bản này.

•	**Usability Testing**: Đây là một lĩnh vực mà bạn cần để đo độ thân thiện, hiệu quả, hoặc thuận tiện phần mềm hoặc sản phẩm cho người dùng cuối. Ở đây, quan sát con người là yếu tố quan trọng nhất, do đó, một phương pháp thủ công là một lợi thế.

•	**Ad-hoc Testing**: Trong kịch bản này, không có phương pháp cụ thể. Nó là một phương pháp hoàn toàn không có kế hoạch kiểm thử nơi sự hiểu biết và cái nhìn sâu sắc của các thử nghiệm là yếu tố quan trọng duy nhất.

### 4.2. Khi nào thì sử dụng Automation testing

Automation testing là phù hợp nhất đối với:

•	**Regression Testing**: automation testing là phù hợp vì các thay đổi mã thường xuyên và khả năng chạy các hồi quy một cách kịp thời.

•	**Load Testing**: automation testing cũng là cách tốt nhất để hoàn thành các thử nghiệm có hiệu quả khi nó đi kèm để tải thử nghiệm.

•	**Performance Testing**: thử nghiệm mà đòi hỏi sự mô phỏng của hàng ngàn người dùng đồng thời đòi hỏi tự động hóa.

Khi phát triển phần mềm, việc thực hiện kiểm thử là rất quan trọng và bắt buộc để tạo ra một phầm mềm tốt. Vì thế, khi đã có kiến thức về kiểm thử thì việc lựa chọn loại hình kiểm thử phù hợp với sản phẩm là điều cần thiết, dù người thực hiện kiểm thử là ai, chỉ cần là người tham gia vào quá trình phát triển phần mềm thì đều cần phải lưu tâm. Mỗi loại hình kiểm thử đều có điểm mạnh và điểm yếu riêng. Hiện tại hầu như tất cả các tổ chức, công ty phát triển phần mềm đều lựa chọn kiểm thử thủ công cho việc kiểm thử phần mềm của họ. Tuy nhiên các công cụ kiểm thử tự động cũng có những điểm mạnh nhất định mà kiểm thử thủ công không có, nên cần xem xét hoàn cảnh để có thể áp dụng kiểm thử tự động cho quá trình kiểm thử phần mềm. 

Để tối ưu hóa chi phí và thời gian cần thiết để hoàn thành một dự án thành công, chúng ta không thể chỉ phụ thuộc vào kiểm thử thủ công hoặc phương pháp kiểm thử tự động. Cần phải linh hoạt kết hợp giữa kiểm thử thủ công và kiểm thử tự động để có thể tạo ra một sản phẩm tốt nhất tới người dùng.

***Tài liệu tham khảo:*** 

https://reqtest.com/testing-blog/manual-testing-vs-automated-testing/

Cảm ơn mọi người đã đọc! (bow)