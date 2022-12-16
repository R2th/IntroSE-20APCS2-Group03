Mongodb là một trong những loại cơ sở dữ liệu Nosql phổ biến nhất hiện nay, thuộc kiểu document, mã nguồn mở, data được lưu dưới dạng binary json (BSON). Được viết bằng C++ nên mongodb có khả năng tính toán với tốc độ cao, hỗ trợ dynamic schema, cả vertical scaling và horizontal scaling. Xin liệt kê một số điểm thú vị khi làm quen với mongodb:

- Đầu tiên, tất nhiên rồi, chúng ta có thể insert một document với các key và value kiểu tuỳ ý vào một collection nào đó

```
    db.inventory.insertMany([
   // MongoDB adds the _id field with an ObjectId if _id is not present
   { item: "journal", qty: 25, status: "A",
       size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "notebook", qty: 50, status: "A",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
   { item: "paper", qty: 100, status: "D",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
   { item: "planner", qty: 75, status: "D",
       size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "postcard", qty: 45, status: "A",
       size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
]);
```

- MongoDB sử dụng ObjectId như là giá trị mặc định của trường id cho mỗi Document mà được tạo trong khi tạo ra bất kỳ Document nào. Sự tổ hợp phức tạp của ObjectId làm cho tất cả các trường id là duy nhất.
- Các mode khi sort với Mongodb lần lượt là: 1(tăng dần) và -1(giảm dần) thay vì esc và desc trong mysql
- Aggregation có thể hiểu là sự tập hợp. Các Aggregation operation xử lý các bản ghi dữ liệu và trả về kết quả đã được tính toán. Các phép toán tập hợp nhóm các giá trị từ nhiều Document lại với nhau, và có thể thực hiện nhiều phép toán đa dạng trên dữ liệu đã được nhóm đó để trả về một kết quả duy nhất. Trong SQL, count() và GROUP BY là tương đương với Aggregation trong MongoDB, cú pháp:

```
    >db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

![](https://images.viblo.asia/05709279-cd55-42e2-b36b-b8bccd1096a4.png)

- Trong MongoDB Documentation, Map-Reduce là một hệ xử lý dữ liệu để cô đọng một khối lượng lớn dữ liệu thành các kết quả tổng thể có ích. MongoDB sử dụng lệnh mapReduce cho hoạt động Map-Reduce. Nói chung, Map Reduce được sử dụng để xử lý các tập dữ liệu lớn.

Cú pháp cơ bản:
```
    >db.collection.mapReduce(
       function() {emit(key,value);},  //map function
       function(key,values) {return reduceFunction},   //reduce function
       {
          out: collection,
          query: document,
          sort: document,
          limit: number
       }
    )
```

Đầu tiên, hàm (function) của Map Reduce truy vấn Collection, sau đó ánh xạ các Document kết quả để phát xạ (Emit) các cặp key-value mà sau đó bị rút gọn dựa trên các key mà có nhiều value.

Trong cú pháp trên:
1. map là một hàm JavaScript mà ánh xạ một value với một key và phát xạ một cặp key-value.
2. reduce là một hàm JavaScript mà rút gọn hoặc nhóm tất cả Document có cùng key.
3. out xác định vị trí của kết quả truy vấn Map-Reduce.
4. query xác định tiêu chuẩn chọn tùy ý để lựa chọn các Document.
5. sort xác định tiêu chuẩn sắp xếp tùy ý.
6. limit xác định số lượng Document tối đa tùy ý để được trả về.

![](https://images.viblo.asia/43c0c476-4ceb-4d0d-8f65-50a624ae7e34.png)