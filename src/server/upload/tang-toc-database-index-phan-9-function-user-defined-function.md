Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Nếu các bạn chưa đọc bài trước có thể đọc tại link [ Tăng tốc database index phần 8 - Function- Tìm kiếm không phân biệt chữ Hoa chữ Thường- UPPER và LOWER](https://viblo.asia/p/tang-toc-database-index-phan-8-function-tim-kiem-khong-phan-biet-chu-hoa-chu-thuong-upper-va-lower-aWj53zQpl6m)

Dùng Function-based có vẻ ngon rồi nhưng  có phải mọi hàm đều sử dụng được nó không? Có thể dùng hàm mặc định như UPPER cũng có thể dùng biểu thức kiểu A+B có thể dùng cả hàm tự định nghĩa nữa. Tuy nhiên có một ngoại lệ quan trọng có là hàm có phụ thuộc vào thời gian hiện tại ( dù là gián tiếp hay trực tiếp)  ví dụ

```
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURN NUMBER
AS
BEGIN
  RETURN 
    TRUNC(MONTHS_BETWEEN(SYSDATE, date_of_birth)/12);
END
```

Hàm get_age sử dụng  ngày hiện tại (SYSDATE) để  tính tuổi bằng cách trừ ngày hiện tại trừ ngày sinh, có thể dùng hàm này ở mọi phần câu truy vấn ví dụ

```
SELECT first_name, last_name, get_age(date_of_birth)
  FROM employees
 WHERE get_age(date_of_birth) = 42
```

Câu lệnh này liệt kê tất cả những nhân viên 42 tuổi. Theo như bài trước sử dụng function-based index là một cách để tối ưu câu truy vấn này. Nhưng bạn không thể định nghĩa hàm GET_AGE  trong index bởi vì nó không *xác định* (nó không luôn trả ra cùng một kết quả với cùng một đầu vào ở những thời điểm khác nhau). Chỉ có những hàm với cùng một bộ tham số trả về  cùng 1 kết quả thì mới có thể đánh index được.

Lý do thì cũng đơn giản thôi. Khi bạn insert một bản ghi database sẽ thực thi một hàm và lưu kết quả vào index, kết quả này ̀ cố định, không có một process nào chạy để cập nhật kết quả của các hàm này cả. Tuổi chỉ được cập nhật khi trường date_of_birth được thực thi bởi câu lệnh UPDATE. Nếu không có cập nhật gì cả thì thời gian trôi qua, tuổi của nhân viên đã tăng lên 1 nhưng index thì vẫn lưu kết quả cũ nên kết quả bị sai.

Posgree và Oracle yêu cầu các function phải được  khai báo là xác định khi sử dụng index với từ khóa DETERMINISTIC (Oracle) hoặc IMMUTABLE (PostgreSQL).
> **Chú ý:**
> 
> PostgreSQL và  Oracle  tin tưởng vào khai báo  DETERMINISTIC hoặc IMMUTABLE —nghĩa là chúng đặt niềm tin nơi developer.
> 
> Bạn có thể khai báo GET_AGE là deterministic  và sử dụng chúng trong định nghĩa index. Nếu bạn không để ý index có thể không hoạt động đúng, thời gian trôi qua tuổi của con người thay đổi nhưng index thì trẻ mãi, giá trị tuổi của nhân viên sẽ không thay đổi (ít nhất là trong index)

Một ví dụ khác của hàm không xác định là hàm Random và những hàm phụ thuộc vào các biến môi trường (environment variables).


> Tản mạn chút về định nghĩa hàm số: 
>  Một hàm f từ tập X đến tập Y được xác định bởi tập G gồm các cặp có thứ tự (x, y) sao cho x ∈ X, y ∈ Y, và mọi phần tử của X là thành phần đầu tiên của đúng một cặp có thứ tự ghép đôi trong G. Nói cách khác, với mọi x trong X, *có đúng một phần tử y* sao cho cặp có thứ tự (x, y) thuộc tập các cặp xác định hàm f.
>  
>  Kể mà lập trình cũng như toán học một đầu vào chỉ có duy nhất một đầu ra thì thật tuyệt vời.

### Over-Indexing
Nếu function-based index còn mới mẻ với bạn, có thể bạn bị cám dỗ rằng đánh index hết đi, ngon quá. Nhưng trọng thực tế đây là điều cuối cùng bạn nên làm.  Lý do là mọi index gây ra chi phí khi bảo trì. Function-based index thường gây rắc rối bởi vì nó rất dễ để tạo nên một index dư thừa (redundant indexes). 

Ví dụ trường hợp  [case-insensitive search từ phần trước](https://viblo.asia/p/tang-toc-database-index-phan-8-function-tim-kiem-khong-phan-biet-chu-hoa-chu-thuong-upper-va-lower-aWj53zQpl6m). Cũng có thể truy vấn theo cách này 
```
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE LOWER(last_name) = LOWER('winand')
```
Một index không thể hỗ trợ cả hai kiểu UPPER và LOWER được. Bạn đương nhiên có thể tạo thêm một index nữa theo hàm LOWER, tuy nhiên điều này tốt chi phí bảo trì khi thêm sửa xóa dữ liệu. Trong trường hợp này cần 1 index là đủ. Bạn nên sử dụng duy nhất một phương pháp trong toàn chương trình của mình. (Trong thực tế team dev có thể nhiều người, mỗi người một phong cách nên cần có quy định hoặc thư viện chung khi thực hiện điều này).

> Cảnh báo:
> Một số ORM tool có thể tự thêm hàm vào mà developer không biết. Ví dụ như Hibernate, for example,luôn sử dụng LOWER để tìm kiếm không phân biệt HOA thường.

Ngoài ra các bạn nên ưu tiên index trên dữ liệu gốc thay vì function-base nếu không thực sự cần thiết  nhé!

> Vậy có cách nào để vẫn sử dụng index để tối ưu câu truy vấn cho việc tìm kiếm những nhân viên 42 tuổi không? Các bạn để lại comment nhé!

Link bài sau: 
[Tăng tốc database index phần 10 - Query với tham số](https://viblo.asia/p/tang-toc-database-index-phan-10-query-voi-tham-so-3Q75wvL9lWb)