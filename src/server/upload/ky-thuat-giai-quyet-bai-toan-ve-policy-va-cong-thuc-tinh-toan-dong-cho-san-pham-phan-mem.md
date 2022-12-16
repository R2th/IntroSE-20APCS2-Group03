Dạo này tôi có một mối duyên rất tình cờ với việc làm các phần mềm thuộc lĩnh vực tài chính và ngân hàng. Một số bài toán trong lĩnh vực này làm tôi nhớ đến những ngày đầu làm việc với phần mềm Trinet Expense tôi đã phát triển 1 kỹ thuật để tạo ra việc cấu hình các policy kiểm tra các báo cáo về chi phí.

Trong phạm vi ngày hôm nay tôi sẽ giới thiệu 1 bài toán tương tự tôi gặp phải khi làm việc với một sản phẩm phần mềm tài chính mới của tôi

Bài toán:

Bạn xây dựng một module survey và affiliate cho công ty tài chính thu thập thông tin người dùng. Các trường trong survey sẽ được thiết kế động sử dụng các thư viện survey ví dụ như dưới đây:
![](https://images.viblo.asia/b6d2fa5d-1209-4ded-9f59-4303fb6fb2db.png)
Với từng survey chúng tôi sẽ có những công thức tính hoa hồng (bonus) khác nhau được cấu hình động trong cơ sở dữ liệu để khi cộng tác viên giới thiệu khách hàng họ được tính toán tiền hoa hồng theo quy tắc của công ty. Dưới đây là 2 công thức được áp dụng với survey "Đăng ký làm thẻ tín dụng":

-  Nếu số hồ sơ mà cộng tác viên giới thiệu làm thẻ tín dụng trong tháng > 5 thì hoa hồng cho cộng tác viên: 300k, F2(Cấp cha) = 50k, F1(Cấp ông bà) = 50k
- Nếu số hồ sơ mà cộng tác viên giới thiệu làm thẻ tín dụng trong tháng < 5 thì hoa hồng cho cộng tác viên: 200k, F2(Cấp cha) = 30k, F1(Cấp ông bà) = 20k
Việc này dẫn đến chúng tôi phải cấu hình 1 vài công thức tính bonus kiểu như sau:
![](https://images.viblo.asia/50d21635-2827-493e-bb56-498c9c205fa8.png)

Bài toán này giống hệt những thứ tôi đã làm với Trinet Expense khi cần cấu hình động các policy cho các report chi phí.

Phân tích một xúi. có vẻ như chúng ta sẽ có vài Rule như dưới đây
- Rule Trạng thái hồ sơ
- Rule Số hồ sơ trong tháng hoàn thành
- Rule nâng cao nếu họ muốn kiểm tra 1 field nào đó trong kết quả thu thập

Tưởng tượng ta sẽ cần làm ra 1 thứ có thể biểu diễn công thức kiểu thề này

if (ruleA->and(ruleB)->or(ruleC)) then
- Tính tiền cho cộng tác viên
- Tính tiền cho cấp cha và ông của cộng tác viên

Lưu mớ này vào DB thế nào, đơn giản ta xài 1 bảng với schema như sau:
![](https://images.viblo.asia/e1b2c5d1-b107-4d45-bbd8-c62c23b0ce19.png)

- Field if_clause
![](https://images.viblo.asia/3910534c-be55-4f2f-86a8-dc1913741fd2.png)

- Field formula
![](https://images.viblo.asia/fc20ca5e-de69-4e29-ba2b-97d50affedd3.png)

Okay, Xong cái schemla và cách lưu vào DB

Giờ đến phần học thuật khó vãi liên quan đến làm thế nào để xài mấy thứ cao siêu như Design Pattern và OOP để biểu diễn mớ công thức này trong ngôn ngữ lập trình. Xem class Diagram sau, cái được gọi là Hiệp đẹp zai Pattern:
![](https://images.viblo.asia/f9b87652-ec33-4265-9a89-81641c8ad08a.png)

Source code github: https://github.com/ericbui148/hieppattern