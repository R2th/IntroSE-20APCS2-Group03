![Thiếu một nửa kết quả](https://cdn-images-1.medium.com/max/800/1*B5eRHgjsScsufovzZub3WA.jpeg)

### Tại sao chia sẻ điều này?

Phương thức `Chunk` của Laravel được sử dụng rộng rãi để phân chia các truy vấn lớn thành các phần truy vấn nhỏ hơn khi xử lý với một cơ sở dữ liệu lớn. 
Nhưng có một vấn đề nếu thuộc tính được sử dụng trong truy vấn sẽ bị thay đổi trong callback function. Nó rất dễ bị bỏ qua và do đó thường bị sử dụng sai.

### Vấn đề ở đây là gì?

Vui lòng xem ví dụ dưới đây:
![](https://cdn-images-1.medium.com/max/800/1*npHx-Iup4pR91SjMcBX26w.png)

Giả định: tổng số người dùng chưa xử lý là 400 (Id là 1 - 400)

**Vấn đề là: Chỉ có một nửa số người dùng được xử lý.**

### Phân tích

Mỗi chunk đang được fetch thông qua single query sử dụng kết hợp với limit và offset. Chúng ta hãy xem chức năng chunk sẽ hoạt động như thế nào.

- Ban đầu, người dùng chưa được xử lý là 400 (Id 1 - 400), đối với truy vấn chunk thứ nhất: 
```select * from `users` where `processed` = 0 limit 100 offset 0```
và 100 người dùng đầu tiên Ids (1-100) được xử lý

- Sau lần chunk thứ nhất, người dùng chưa được xử lý là 300 (Id 101 - 400), truy vấn chunk thứ 2: 
```select * from `users` where `processed` = 0 limit 100 offset 100```
và 100 người dùng tiếp theo với Ids (201-300) được xử lý

- Sau lần chunk thứ 2, người dùng chưa được xử lý là 200 (Id 101 - 200 và 301 - 400), đối với truy vấn đoạn thứ 3: 
```select * from `users` where `processed` = 0 limit 100 offset 200```
và không có 1 người dùng nào được xử lý

Kết quả là: 200 người dùng được xử lý, nhưng 200 người dùng vẫn chưa được xử lý.

### - Giải pháp

Bạn nên sử dụng phương thức `chunkById` thay cho phương thức `chunk` trong tình huóng này, chúng có vai trò tương tự như nhau. Sự khác biệt duy nhất là cách xây dựng truy vấn. 
`ChunkById` sử dụng 'id' và 'limit' trong khi `chunk` sử dụng 'limit' và 'offset'. Code sửa đổi sẽ như sau:
![](https://cdn-images-1.medium.com/max/800/1*CCaWBLWnlS1mL1s-e6UDbg.png)

Khi sử dụng `chunkById`, một câu truy vấn chunk sẽ giống như dưới đây:

Truy vấn chunk thứ nhất: ```select * from `users` where ``processed` = 0 and `id` > 0 order by `id` asc limit 100```

Truy vấn chunk thứ 2: ```select * from `users` where ``processed` = 0 and `id` > 100 order by `id` asc limit 100```

Truy vấn chunk thứ 3:  ```select * from `users` where ``processed` = 0 and `id` > 200 order by `id` asc limit 100```

Truy vấn chunk thứ 4: ```select * from `users` where ``processed` = 0 and `id` > 300 order by `id` asc limit 100```

Do đó, kết quả tìm nạp sẽ là 1-100, 101- 200, 201 -300, 301- 400 theo trình tự và tất cả người dùng đều được xử lý.

Bài viết được sưu tầm và dịch từ: https://engineering.carsguide.com.au/chunk-be-careful-b19c8197dc4d