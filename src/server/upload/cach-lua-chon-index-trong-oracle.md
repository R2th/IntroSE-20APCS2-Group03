## 1. Cách chọn index

Index là một tính năng cực kì quan trọng khi thao tác với cơ sở dữ liệu. Việc lựa chọn index sao cho hợp lí phụ thuộc phần lớn vào số lượng dữ liệu và môi trường cài đặt của cơ sở dữ liệu.  
Tuy nhiên cũng có một vài quy tắc cơ bản khi lựa chọn index trong Oracle như sau:

-  Chọn những column được dùng nhiều trong mệnh đề **WHERE**.
-  Chọn những column được dùng nhiều để **JOIN** các bảng.
-  Chọn những column có selectivity cao. Selectivity của index là phần trăm của số row trong bảng có giá trị unique, trên tổng số record của bảng. Sẽ tốt hơn với index khi có ít row có cùng dữ liệu (selectivity tiến gần đến 1).  (Note: Oracle tự động tạo hoặc dùng index có sẵn với các column mà có constraint là unique, hoặc primary key). Việc chọn index những column có selectivity thấp hữu ích trong trường hợp ta muốn một hoặc hai giá trị được lựa chọn ít hơn các giá trị khác.
-  **Không** dùng standard B-tree index với những cột có ít giá trị khác biệt. Những cột này thường có selectivity thấp nên performance sẽ không hiệu quả.
-  **Không** chọn những cột mà giá trị thường xuyên được update. Với những câu lệnh **UPDATE**, **INSERT**, **DELETE** thì index cũng sẽ được maintain nên việc có index sẽ làm câu lệnh mất nhiều thơì gian hơn để thực thi so với không có index.
- **Không** dùng những index column chỉ xuất hiện trong **WHERE** với function hoặc operator. Câu điều kiện WHERE sử dụng function (ngoại trừ MIN hoặc MAX), hoặc operator sẽ không thể cung cấp access path đến index đó, ngoài trừ các index dạng function-based.
- Xem xét việc chọn index những foreign key hoặc các key sử dụng để JOIN trong trường hợp các cấu **UPDATE**, **INSERT**, **DELETE**, access cả bảng chính và bảng phụ. Những index này cho phép **UPDATE**, **DELETE** ở bảng chính mà không share locking bảng phụ.

## 2. Lưu ý khi chọn index
- Khi lựa chọn index, nên xem xét xem liệu phần performance đạt được khi query có đáng với phần performance mất đi khi **INSERT**, **UPDATE**, **DELETE**, và phần tài nguyên phải dùng để lưu trữ index. Bạn nên so sánh perfomance giữa trường trường hợp có/không có index để đưa ra được phương án tốt nhất.
- Khi lựa chọn composite index (index được tạo nên bởi 2 hoặc nhiều column khác nhau), tổ hợp của các column có selectivity thấp có thể tạo nên index có selectivity cao. Ngoài ra cũng nên xem xét lựa chọn các column thường được chọn làm điều kiện query ở phần **WHERE**, hoặc các column dùng để **JOIN**, để làm composite key.


------
Tài liệu tham khảo [Oracle Database Performance Tuning Guide](https://docs.oracle.com/cd/B28359_01/server.111/b28274/data_acc.htm#PFGRF004)