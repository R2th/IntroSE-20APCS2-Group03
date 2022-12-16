### Ở đâu đó trên Shopee

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F650f03c2-6dc7-48f9-a272-b8c0c24fb9da%2FUntitled.png?table=block&id=6ce9c83e-ba1d-4d13-8320-2ed33119821c&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2290&userId=&cache=v2)

Lấy ví dụ khi chung ta search từ khóa "**bàn phím cơ giá rẻ**" trên Shopee, kết quả hiển thị ra tương tự như hình trên.

Sau khi xem hình, một dev chưa biết khái niệm về Full-Text Search sẽ nghĩ ngay giải pháp kiểu như:

```bash
SELECT * FROM products WHERE name LIKE "%bàn%" 
							OR name LIKE "%phím%"
							OR name LIKE "%cơ%"
							OR name LIKE "%giá%"
							OR name LIKE "%rẻ%"
```

Nếu xét về giải pháp thì đây vẫn là một giải pháp sẽ cho kết quả đúng, nhưng cái giá phải trả là ngốn rất nhiều tài nguyên của Database

Hôm nay mình sẽ giới thiệu về khái niệm Full-Text Search, từ được định nghĩa để giải quyết bài toán tương tự ở trên

### Full-Text Search là gì?

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5eb9403b-e10e-43d4-83d2-bc5c45e337a7%2FUntitled.png?table=block&id=d28a2fe7-41c6-47c6-bf77-19cceda6fa12&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=3020&userId=&cache=v2)

Như cái tên của nó đã nói, Full-Text Search là tìm kiếm tất cả nhưng gì là text trong database của bạn, nó đem lại một giải pháp **Linh động** và **Nhanh**

- **Linh động**: sử dụng Full-text Search chúng ta không cần chia nhỏ các từ khóa đơn ra riêng biệt như cách ở trên, giải pháp đã tự xử lý những từ liên quan trong quá trình tìm kiếm
- **Nhanh**: bằng việc sử dụng "Inverted Index" nó đem đến tốc độ tìm kiếm nhanh hơn việc dùng tìm kiếm thông thường

### Full-Text Search có thật sự cần thiết

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6f54cdd3-810a-4c49-9e29-20fc808fdeb9%2FUntitled.png?table=block&id=7f36419a-68d2-4010-b6d9-f1245144326b&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1440&userId=&cache=v2)

Nếu bạn đang xây dựng một hệ thống đặc thù, không cần quan trọng việc tìm kiếm, hay chỉ cần tìm kiếm chính xác từ hoặc cụm từ là đủ thì Full-Text Search không cần thiết với dự án của bạn.

Nhưng nếu bạn xây dựng một hệ thống bán hàng, quản lý hàng hóa, cần phục vụ tốt quá trình tìm kiếm để đem lại hiểu quả cho người sử dụng thì Full-Text Search thật sự cần thiết đối với dự án của bạn

Ngoài ra ở các website lớn, hoặc như Google việc bạn search một nội dung nó còn có thể dịch ra các thứ tiếng, hoặc sử dụng các công nghệ để đoán hiểu được bạn cần gì, từ đó đưa ra các kết quả mong muốn... Đó là một phạm trụ vũ trụ, hy vọng mình có dịp biết và chia sẽ cho các bạn 😂

### Full-Text Search được hỗ trợ ở đâu?

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9cd05585-c842-44da-ae0c-204e9299b0d2%2FUntitled.png?table=block&id=ba0b7b9c-0088-4dc0-a7b1-52ea2ba62d58&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2260&userId=&cache=v2)

Hiện này theo xu hướng phát triển, cũng khá nhiều các hệ quản trị CSDL hỗ trợ Full-Text Search, điển hình như

- Mysql
- Elasticsearch
- PostgreSQL

( Các bạn có thể xem thêm ở link bên dưới )

### Tài liêu tham khảo

- [https://en.wikipedia.org/wiki/Full-text_search](https://en.wikipedia.org/wiki/Full-text_search)