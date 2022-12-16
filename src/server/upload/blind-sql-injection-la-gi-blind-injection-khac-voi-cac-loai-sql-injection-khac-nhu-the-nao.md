Lỗ hổng SQL Injection (SQLI) là một trong những vấn đề bảo mật web lâu đời và phổ biến nhất. Mình đã có một bài viết [Mô tả SQL Injection là gì và cách kiểm tra](https://manhnv.com/2019/05/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/), các bạn có thể đọc kỹ hơn để biết.

Trong bài viết này mình sẽ nói đến một trong các loại SQL injection đó là **Blind SQL injection**.

## Blind SQL injection là gì?

Blind SQL injection là một kiểu tấn công SQL injection truy vấn cơ sở dữ liệu sử dụng các mệnh đề để đoán biết. Cách tấn công này thường được sử dụng khi mà một ứng dụng (web, apps) được cấu hình để chỉ hiển thị những thông báo lỗi chung chung, không hiển thị ra lỗi của SQL.
Blind SQL Injection đôi khi được gọi là SQL Inferential SQL.

Có hai biến thể chính để thực hiện Blind SQL injection:
    * Blind SQL injejction dựa vào nội dung phản hồi.
    * Blind SQL injejction dựa vào độ trễ của thời gian phản hồi.

## Các kiểm tra Blind SQL injection.

### Blind SQL injejction dựa vào nội dung phản hồi.

Trong trường hợp tấn công Blind SQL injection dựa trên nội dung, kẻ tấn công thực hiện các truy vấn SQL khác nhau để hỏi các câu hỏi TRUE hoặc FALSE của cơ sở dữ liệu. Sau đó, họ phân tích sự khác biệt trong câu trả lòi giữa các câu lệnh TRUE và FALSE.

Sau đây là một ví dụ về một web bán hàng online, nơi hiển thị thông tin sản phẩm được bán.

```url
http://www.shop-online.com/product_detail.php?id=1
```

Liên kết trên sẽ hiển thị thông tin chi tiết của sản phẩm có `id=1` được lấy từ cơ sở dữ liệu. Câu lệnh SQL cho liên kết này khi được yêu cầu là:

```sql
SELECT * FROM products WHERE id = 1

--hoặc

SELECT column_name, column_name_2 FROM table_name WHERE id = 1
```

Kẻ tấn công sẽ sửa lại truy vấn bằng các sửa url thành:

```url
http://www.shop-online.com/product_detail.php?id=1 and 1 = 2
```

Câu lệnh SQL sẽ đổi thành:

```sql
SELECT * FROM products WHERE ID = 1 and 1=2

--hoặc

SELECT column_name, column_name_2 FROM table_name WHERE ID = 1 and 1=2
```

Điều này sẽ khiến truy vấn trả về sai và không có mục nào được hiển thị trong thông tin sản phẩm. Kẻ tấn công sau đó tiến hành thay đổi yêu cầu thành:

```url
http://www.shop-online.com/product_detail.php?id=1 and 1 = 1
```

Và câu lệnh SQL lúc này lại đổi thành:

```sql
SELECT * FROM products WHERE ID = 1 and 1=1

--hoặc

SELECT column_name, column_name_2 FROM table_name WHERE ID = 1 and 1=1
```

Điều này trả về TRUE và các chi tiết của sản phẩm có `id=1` hiển thị. Đây là một dấu hiệu rõ ràng rằng ứng dụng này đang gặp lỗi SQL injection và chúng tôi đã dùng Blind SQL injection để tấn công.

### Blind SQL injejction dựa vào độ trễ của thời gian phản hồi.

Trong trường hợp này các cuộc tấn công dựa trên thời gian, kẻ tấn công làm cho cơ sở dữ liệu thực hiện một hành động tốn thời gian. Nếu ứng dụng không trả về phản hồi ngay lập tức, ứng dụng này dễ bị Blind SQL injection. Một hành động phổ biến dùng cho thời gian là `sleep`.

Dựa trên ví dụ trước, kẻ tấn công trước tiên sẽ đánh giá thời gian phản hồi của máy chủ web cho mộ truy vấn thông thường. Yêu cầu kẻ tấn công đưa ra là:

```url
http://www.shop-online.com/product_detail.php?id=1 and if(1=1, sleep(10), false)
```

Nếu ứng dụng gặp lỗi SQL injection thì phản hồi sẽ bị trễ 10 giây.

## Hậu quả của Blind SQL injection.

Các Blind SQL injection thường được sử dụng để xây dựng lược đồ cơ sở dữ liệu và lấy tất cả dữ liệu trong cơ sở dữ liệu. Điều này được thực hiện bằng cách sử dụng các kỹ thuật `brute force` và yêu cầu nhiều `requests` nhưng có thể được tự động hóa bởi những kẻ tấn công sử dụng các công cụ SQL injection như: SQLmap ..v..v..v..

## Sự khác nhau giữa Blind SQL injection và các loại SQL injection khác.

Đối với SQL injection thông thường cho phép chúng ta khai thác thông tin trực tiếp từ cơ sở dữ liệu. Đối với Blind, chúng ta phải đoán thông tin dần dần dựa theo kết quả trả về là TRUE FALSE. Do đó sẽ dẫn tới một vấn để đó là nếu thông tin chúng ta cần lấy. ví dụ: tên cơ sở dữ liệu, tên bảng, tên user quá dài thì việc đoán sẽ gặp trở ngại lớn về thời gian.

## Tổng kết.

* Qua bài viết này mình đã trả lời cho các bạn 2 câu hỏi:
    * Blind SQL injection là gì?
    * Blind injection khác với các loại SQL injection khác như thế nào?
* Những ví dụ trên mình đưa ra chỉ là một số ví dụ cơ bản của Blind SQL injection, vậy bạn đọc có thể áp dụng nó và có thể tìm hiểu thêm một số dùng khác với: UNION, SUBSTRING .v.v.v.. để khai thác Blind SQL injection một cách hiệu quả.
* Và đây là bài viết trên blog của mình: https://manhnv.com/2019/05/blind-sql-injection-la-gi-blind-injection-khac-voi-cac-loai-sql-injection-khac-nhu-the-nao/

**[Penetration Testing Web & Apps](https://viblo.asia/s/penetration-testing-web-apps-pmleBzPM5rd)**