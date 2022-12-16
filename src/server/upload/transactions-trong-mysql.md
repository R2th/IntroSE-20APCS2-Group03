Transaction trong SQL là một đơn vị công việc được thực hiện bởi một Database. Transaction là đơn vị hoặc dãy công việc được thực hiện theo một thứ tự logic và hợp lý, có thể được thao tác bởi người dùng hoặc bởi một Database program.

Một transaction là một sự lan truyền của một hoặc nhiều thay đổi tới Database. Ví dụ, nếu bạn đang tạo một bản ghi hoặc cập nhật một bản ghi hoặc xóa một bản ghi từ một bảng, thì bạn đang thực hiện transaction trên bảng đó. Nó là quan trọng để điều khiển các transaction để bảo đảm toàn vẹn dữ liệu và để xử lý các Database Error.

Nói cách khác, một Transaction sẽ không bao giờ hoàn thành trừ khi mỗi hoạt động riêng bên trong nhóm được thực hiện thành công. Nếu bất kỳ hoạt động nào bên trong Transaction thất bại, thì toàn bộ Transaction đó sẽ thất bại.

Thực tế, bạn sẽ gộp nhiều truy vấn SQL vào thành một nhóm và bạn sẽ thực thi tất cả chúng cùng với nhau như là một Transaction.

Một ứng dụng ngân hàng là ví dụ điển hình về lý do tại sao transactions cần thiết. Hãy thử tưởng tượng một cơ sở dữ liệu của 1 ngân hàng với hai bảng: `checking` và `savings`. Để chuyển được 200$ của Jane từ `checking account` sang `saving account` của cô ấy, bạn cần thực hiện ít nhất 3 bước:

1. Đảm bảo số dư trong `checking account` của cô ấy lớn hơn 200$.
2. Trừ 200$ trong `checking account`.
3. Thêm 200$ vào số dư của `saving account`.

Toàn bộ hoạt động nên được gói trong một giao dịch để nếu bất kỳ một trong các bước không thành công, bất kỳ bước hoàn thành nào cũng có thể được khôi phục.

Bạn có thể bắt đầu một transaction với lệnh `START TRANSACTION` và sau đó thực hiện các thay đổi của nó vĩnh viễn với `COMMIT` hoặc loại bỏ các thay đổi với `ROLLBACK`

```SQL
START TRANSACTION;
SELECT balance FROM checking WHERE customer_id = 10233276;
UPDATE checking SET balance = balance - 200.00 WHERE customer_id = 10233276;
UPDATE savings  SET balance = balance + 200.00 WHERE customer_id = 10233276;
COMMIT;
```

Nhưng transactions độc lập không phải toàn bộ câu chuyện. Điều gì xảy ra nếu máy chủ xảy ra sự cố khi thực hiện dòng 4? Ai biết? Khách hàng có lẽ chỉ mất 200$. Và nếu một tiến trình khác xuất hiện giữa dòng 3 và 4 và xóa toàn bộ số dư của `checking account` thì sao? Ngân hàng đã cấp cho khách hàng khoản tín dụng 200$ mà không hề biết.

Transactions không đủ, trừ khi hệ thống vượt qua ACID test. ACID là viết tắt của Atomicity (nguyên tử), Consistency (nhất quán), Isolation (độc lập), và Durability (bễn vững) Đây là những tiêu chí liên quan chặt chẽ mà một hệ thống xử lý transaction hoạt động tốt phải đáp ứng:

* Atomicity

Một transaction phải hoạt động như một đơn vị công việc không thể tách rời để toàn bộ transaction được áp dụng hoặc khôi phục. Khi các transaction là nguyên tử, không có transaction nào được hoàn thành một phần: đó là tất cả hoặc không có gì.

* Consistency

Cơ sở dữ liệu phải luôn luôn chuyển từ trạng thái nhất quán sang trạng thái tiếp theo. Trong ví dụ của chúng ta, tính nhất quán đảm bảo rằng sự cố giữa dòng 3 và 4 không có kết quả là 200$ biến mất khỏi tài khoản kiểm tra. Bởi vì transaction không bao giờ được commit, nên không có thay đổi nào trong giao dịch được phản ánh trong cơ sở dữ liệu.

* Isolation

Kết quả của một transaction thường vô hình với các transaction khác cho đến khi các transaction hoàn tất. Điều này đảm bảo rằng nếu summary của tài khoản ngân hàng chạy sau dòng 3 nhưng trước dòng 4 trong ví dụ của chúng ta, vẫn sẽ thấy 200$ trong `checking account`. Khi thảo luận về mức độ cô lập, bạn sẽ hiểu lý do tại sao nói thường vô hình.

* Durability

Sau khi commited, một transaction sẽ thay đổi vĩnh viễn. Điều này có nghĩa là những thay đổi phải được ghi lại sao cho dữ liệu không bị mất trong một sự cố hệ thống. Độ bền là một khái niệm hơi mờ, tuy nhiên, vì thực sự có nhiều cấp độ. Một số chiến lược độ bền cung cấp một đảm bảo an toàn mạnh mẽ hơn so với những chiến lược khác, và không có gì là bền 100%. Chúng ta thảo luận về độ bền thực sự có ý nghĩa gì trong MySQL trong các bài viết sau

Giao dịch ACID đảm bảo rằng các ngân hàng không làm mất tiền của bạn. Nói chung là cực kỳ khó khăn hoặc không thể làm điều này với logic ứng dụng. Máy chủ cơ sở dữ liệu tuân thủ ACID phải thực hiện tất cả các loại điều phức tạp mà bạn có thể không nhận ra để cung cấp bảo đảm ACID.

Một máy chủ cơ sở dữ liệu với các ACID transactions thường yêu cầu nhiều tài nguyên CPU, bộ nhớ và dung lượng ổ đĩa hơn so với máy chủ không có chúng. Đây là lúc kiến trúc MySQL’s storage engine phát huy lợi thế của bạn. Bạn có thể quyết định xem ứng dụng của bạn có cần transactions hay không. Nếu bạn không thực sự cần chúng, bạn có thể có hiệu suất cao hơn với nontransactional storage engine. Bạn có thể sử dụng LOCK TABLES để đưa ra mức độ bảo vệ bạn cần mà không cần transactions.

Tài liệu tham khảo: sác High Performance MySQL