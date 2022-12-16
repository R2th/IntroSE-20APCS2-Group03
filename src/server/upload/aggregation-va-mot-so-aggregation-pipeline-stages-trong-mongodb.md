### I. Aggregation
Aggregation có thể hiểu là sự tập hợp. Các Aggregation operation xử lý các bản ghi dữ liệu và trả về kết quả đã được tính toán. Các phép toán tập hợp nhóm các giá trị từ nhiều Document lại với nhau, và có thể thực hiện nhiều phép toán đa dạng trên dữ liệu đã được nhóm đó để trả về một kết quả duy nhất. Trong SQL, count() và GROUP BY là tương đương với Aggregation trong MongoDB.
Với Aggregation trong MongoDB,ta sử dụng phương thức aggregate().

Cú pháp cơ bản của phương thức aggregate() là như sau:
> >db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)

Ví dụ
Trong Collection, bạn có dữ liệu sau:
![](https://images.viblo.asia/37d426e4-7b75-4153-b6e6-8cb7f9c8e4e6.png)

Từ Collection trên, nếu bạn muốn hiển thị một danh sách có bao nhiêu bài hướng dẫn được viết bởi mỗi người dùng, thì bạn sẽ sử dụng phương thức aggregate() như sau:
![](https://images.viblo.asia/6cd4ef86-dae5-4aee-961f-541e66dec3df.png)
Truy vấn SQL tương đương cho trường hợp trên là **select by_user, count(*) from mycol group by by_user.**

### II. Một số Aggregation có sẵn trong mongoDB
Trong ví dụ trên, chúng ta đã nhóm các Document bởi trường by_user và trên mỗi lần xuất hiện của by_user, giá trị trước đó của tổng sẽ được tăng lên. Có một danh sách các biểu thức Aggregation có sẵn, được liệt kê dưới đây:

|Biểu thức | Mô tả | Ví dụ
| -------- | -------- | -------- |
| $sum     | Tổng giá trị được xác định từ tất cả Document trong Collection đó |```db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])```
| $avg     | Tính trung bình của tất cả giá trị đã cho từ tất cả Document trong Collection đó    |```db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])```
|$min     | Lấy giá trị nhỏ nhất của các giá trị từ tất cả Document trong Collection đó |```db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])```
| $limit     | Giới hạn số lượng documents đầu ra   |```db.article.aggregate( { $limit : 5 } );```
| $max     | Lấy giá trị lớn nhất của các giá trị từ tất cả Document trong Collection đó     |```db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])```
| $push    | Chèn giá trị vào trong một mảng trong Document kết quả    |```db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])```
| $addToSet    | Chèn giá trị tới một mảng trong Document kết quả, nhưng không tạo các bản sao     |```db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])```
| $first   | Lấy Document đầu tiên từ Source Document theo nhóm     |```db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])```
|$last    | Lấy Document cuối cùng từ Source Document theo nhóm     |```db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])```

### III. Khái niệm pipeline trong MongoDB và một số Aggregation pipeline trong mongoDB
Trong UNIX, lệnh shell pipeline nghĩa là khả năng để thực thi một hoạt động trên một số input và sử dụng output như là input cho lệnh tiếp theo, và …. MongoDB cũng hỗ trợ cùng khái niệm pipeline đó trong Aggregation. Có một tập hợp các giai đoạn có thể có và mỗi giai đoạn đó lấy một tập hợp các Document như là một input và tạo ra một tập các Document kết quả (hoặc kết quả cuối cùng JSON Document tại phần cuối của pipeline). Kết quả này, sau đó, sẽ lại được sử dụng cho giai đoạn tiếp theo …
Các giai đoạn có thể có trong Aggregation là:

**$project**: Được sử dụng để chọn một số trường cụ thể từ một Collection.

**$match**: Đây là một hoạt động lọc và vì thế nó có thể giảm số Document mà được cung cấp như là input cho giai đoạn kế tiếp.

**$group**: Thực hiện Aggregation thực sự, như đã trình bày ở trên.

**$sort**: Sắp xếp các Document.

**$skip**: Nhảy qua số Document đã cung cấp.

**$limit**: Giới hạn số Document.

**$unwind**: Được sử dụng để chia một Document đang sử dụng mảng thành nhiều Document. Sử dụng hoạt động này sẽ tạo một số lượng Document cho bước tiếp theo.

Ngoài các nội dung tớ chia sẻ ở trên, các bạn cũng có thể xem thêm ở slide này nhé^.^

{@googleslide: https://docs.google.com/presentation/d/14_NZ5ecWPrE2lVHKHwYirW-J-sVW4AnDgInin7jP8PE/edit#slide=id.p}

### IV. Tài liệu tham khảo
https://docs.mongodb.com/manual/aggregation/index.html
https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/