## 1. Re-testing là gì? 
Re-testing hay còn được gọi là Confirmation testing (kiểm thử chấp nhận) là một quy trình kiểm tra lại các testcase failed trong lần cuối cùng thực hiện test. Nói chung, tester tìm bug đó trong quá trình kiểm thử và assign lại cho Dev fix. Sau khi Dev fix xong thì đẩy lại cho Tester kiểm tra lại. Quá trình liên tục này được gọi là Re-testing (kiểm thử lại /Kiểm thử chấp nhận).

## 2. Regression testing  là gì?
Regression testing (kiểm thử hồi quy) là một loại kiểm thử phần mềm được thực hiện để kiểm tra các tính năng và chức năng hiện tại có bị ảnh hưởng khi thay đổi một đoạn code hay không.

## 3. Sự khác nhau giữa Re-testing và Regression testing

| Re-testing |Regression testing  |
| -------- | -------- |
| Re-testing được thực hiện để xác nhận lại các trường hợp failed trong lần cuối cùng thực hiện có pass sau khi Dev fix hay không     | Kiểm thử hồi quy được thực hiện để xác nhận xem những chương trình hoặc code thay đổi có ảnh hưởng đến tính năng cũ hay không      | 
| Re-testing được thực hiện dựa trên cơ sở các lỗi đã được fix     |  Mục đích của kiểm thử hồi quy là khi 1 phần code thay đổi nhưng không được sinh ra bất kì ảnh hưởng nào khác đến các chức năng đã có   | 
| Xác minh lỗi là một phần của re-testing     | Xác minh lỗi không phải là một phần của regression testing      | 
| Mức độ ưu tiên của re-testing cao hơn kiểm thử hồi quy, vì vậy nó được thực hiện trước khi kiểm thử hồi quy     | Dựa vào dự án và nguồn nhân lực, kiểm thử hồi quy có thể được thực hiện song song với kiểm thử chấp nhận      | 
| Không thể tự động hóa các test case    | Có thể sử dụng auto test để kiểm thử hồi quy do kiểm thử thủ công tốn thời gian và nhân lực      | 
| Kiểm thử chấp nhận là kiểm thử theo kế hoạch     | Kiểm thử hồi quy được coi là kiểm thử chung      | 
| Test lại các case failed     | Được thực hiện cho các case passed      | 
| Kiểm tra lại để đảm bảo rằng các lỗi đã được fix     | Check các ảnh hưởng không mong đợi      | 
| Re-testing thực thi 1 lỗi với cùng 1 dữ liệu, cùng 1 môi trường nhưng đầu vào khác nhau là 1 bản built mới     | Kiểm thử hồi quy được thực hiện khi có bất kì chỉnh sửa hoặc thay đổi nào đó. Nó trở thành bắt buộc trong dự án      | 


Bài viết được dịch từ: https://www.guru99.com/re-testing-vs-regression-testing.html