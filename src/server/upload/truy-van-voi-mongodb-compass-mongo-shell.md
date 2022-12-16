1. Lời giới thiệu:
    Ở phần trước, mình đã giới thiệu về config mongo. Phần này mình tiếp tục chia sẻ về tool query bao mạnh cho người chơi hệ Mongo.
    Cụ thể là công cụ mongoDB cây nhà lá vườn lúc cài đặt trên window có hỗ trợ cài đặt sẵn. Thay vì phải tự tải về rồi cài đặt như Robo 3T, Studio 3T, NoSQL Manager, Nucleon Database Master...
2. Mongo Compass _ sức mạnh vượt thời gian:
    - Collection: user
    - DB: test
    - ENV: localhost
    ![](https://images.viblo.asia/1d7cfa30-6e0f-44da-9176-1526b7a07098.png)
    - Thử query không điều kiện
    ![](https://images.viblo.asia/8ac2fe1c-a561-41f4-a18f-3870b766d19e.png)
    - Thử câu query khác xem: 
    {"user":"user222"} ->>> Fight
    ![](https://images.viblo.asia/66c778f4-d2c2-4ef3-8d19-54f6ab35a08b.png)
Số lượng document tìm thấy ở Displaying documents
Syntax query cần viết đúng với chuẩn object của mongo đặt ra, các cô bác có thể tìm hiểu thêm ở đây: https://www.mongodb.com/docs/compass/current/query/filter/ 
    - Chưa hết: ngoài việc filter data bằng find, compass còn cho phép sort, skip, limit để sắp xếp cũng như phân trang kết quả trả về
    - Thử sort từ a->z theo username:
    ![](https://images.viblo.asia/641b5720-ae13-4cdc-9f66-23a2e5485c3d.png)
    - Thử lấy chỉ 2 document 1 trang trả về:
    ![](https://images.viblo.asia/5a7639d6-fa34-4c50-9505-b29f5d5ee0ec.png)
    - Công cụ Analyzre:
    Vào mục schema -> analyze. Công cụ sử phục phân tích, trực qua hoá dữ liệu biến động
    ![](https://images.viblo.asia/d02b8311-2707-4d7b-89f5-dd23d4e0200e.png)
    - Index: 
    Mỗi collection sẽ tự động đánh index cho _id, và bạn cũng có thể đánh index thêm cho những field khác nếu muốn, nó hiển thị ở đây
    ![](https://images.viblo.asia/2541fa0b-abea-48f7-a826-d21fc2a05ae7.png)
3. Mongo Shell _ Công cụ hỗ trợ mạnh mẽ: 
    Hãy xem công cụ mongoShell có gì đặc biệt. Nó nằm ở đâu này.
    ![](https://images.viblo.asia/0904d013-7f4c-440a-b71e-75e654f1321f.png)
    - Sử dụng show dbs/show databases để xem list các db ở local
       ![](https://images.viblo.asia/e8c4093b-c122-4a07-87b9-783d1cb371da.png)
    - Chọn db, use <tên db> 
    ![](https://images.viblo.asia/ff9871b4-0f4a-4a2d-b89e-45202b3eef3d.png)
    - Show list collections: show collections
    Truy vấn bằng cách db.<_tên collection>.<query>(<condition>)
    ![](https://images.viblo.asia/8d2c6052-36bc-4984-907c-4ccc4d5b7977.png)
    Ngoài ra vẫn còn nhiều câu truy vấn hữu ích: 
    https://www.mongodb.com/docs/mongodb-shell/crud/read/
    
    😊😊Hôm nay tới đây thôi, mong mọi người upvote để ủng hộ mình tiếp tục series và có những bài viết tốt hơn. Bài viết có thể có sai xót mọi người hãy để lại comment bên dưới🖐️🖐️