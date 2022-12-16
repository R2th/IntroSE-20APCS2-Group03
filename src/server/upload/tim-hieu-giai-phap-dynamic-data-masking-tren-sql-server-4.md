Ở bài viết lần này chúng ta sẽ tiếp tục với các ví dụ demo về các loại Che giấu dữ liệu random và Che giấu dữ liệu partial
# 1. Áp dụng che giấu random
Che giấu random là thay thế các giá trị số bằng một giá trị ngẫu nhiên trong một phạm vi được chỉ định.

Áp dụng che giấu cho cột Age . Trong trường hợp này phạm vi chỉ định là từ 1 đến 99.

![](https://images.viblo.asia/ed8bc8fd-4cba-426b-b518-a0bc518368f2.png)

Chạy câu lệnh SELECT với tài khoản đặc quyền.

![](https://images.viblo.asia/c24abbae-f77b-4b7f-89d7-1bb6ade17402.png)

Chạy lại câu lệnh SELECT với tài khoản là Linhdemo2. Bây giờ giá trị trả về đã nằm trong khoảng từ 1 đến 7.

![](https://images.viblo.asia/4772f782-a6f2-4d75-81ec-c493d8d41bcb.png)


# 2. Áp dụng che giấu partial
Che giấu partial cho phép ta chỉ định chính xác giá trị nào được che. Chức năng này hoạt động tốt nhất cho dữ liệu cột được định dạng nhất quán, chẳng hạn như số thẻ tín dụng hoặc ID quốc gia. Để thực hiện quy tắc che giấu partial, chúng ta phải chỉ định ba đối số: có bao nhiêu ký tự đầu để tiết lộ, có bao nhiêu ký tự ở giữa và cách che dấu chúng, bao nhiêu ký tự cuối để lộ.

Áp dụng che giấu cho cột phonenumber.

![](https://images.viblo.asia/dceaa461-c64b-4f1c-9a3a-b71cb9792010.png)

Trong trường hợp này, chúng ta tiết lộ 1 kí tự đầu (**1**), che dấu bốn ký tự đầu tiên bằng giá trị x (**xxxxxx** ) và tiết lộ một ký tự cuối ( **1** ).

Chạy câu lệnh SELECT với tài khoản đặc quyền.

![](https://images.viblo.asia/68def74e-260a-4b37-a0f9-a8a556830343.png)

Chạy lại câu lệnh SELECT với tài khoản là Linhdemo2.

![](https://images.viblo.asia/07932304-10f8-4b99-8209-f883504ca342.png)

Bây giờ chúng ta đã có tất cả các quy tắc che dấu, hãy truy vấn chế độ xem hệ thống **sys.masked_columns** để xem các cột được che trong cơ sở dữ liệu của và cách triển khai che giấu đó.

![](https://images.viblo.asia/0efe1f03-0e3f-444c-bbaf-341f7dd66615.png)

# 3. TÀI LIỆU THAM KHẢO
1. https://docs.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-2017
2. https://www.slideshare.net/antoniosch/dynamic-data-masking-sql-server-2016
3. https://www.imperva.com/blog/static-vs-dynamic-data-masking-why-are-we-still-comparing-the-two/
4. https://www.sentryone.com/blog/johnmartin/dynamic-data-masking-my-thoughts
5. https://www.sqlhelps.com/blog/sql-server-2016-data-masking-and-always-encrypted/