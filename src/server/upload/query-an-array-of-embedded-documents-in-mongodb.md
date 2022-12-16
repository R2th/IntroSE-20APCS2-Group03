Khi thiết kế  dữ liệu kiểu Embedded thì chúng ta không cần tạo ra nhiều collection để lưu trữ, mà sẽ lưu trữ tất cả vào một collection.

ví dụ có collection ***inventory***:
```
    { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
    { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
    { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
    { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
    { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
```
ở trên thì thay vì việc phải tạo ra 2 collection rồi lưu kiểu reference thì chỉ cần lưu ở 1 bảng duy nhất.
Trong phạm vi bài viết này cũng sẽ chỉ cung cấp một số ví dụ về viêc query Embedded data trong mongodb.
Còn trên thực tế khi làm việc thì tùy vào yêu cầu mà có những yêu cầu khác nhau. 

Let's go:

1. **Query for a Document Nested in an Array **

    Trong ví dụ dưới đây sẽ trả về tất cả các document mà có các element match với một document cụ thể:
    ```
    db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )
    ```
    kết quả trả về:
    ```
    { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] }
    ```
    **Chú ý:** Khi query mà một element lưu dạng embedded/nested thì yêu cầu phải match chính xác với document được chỉ đinh, bao gồm cả thứ tự các trường trong document được chỉ định.
    ```
    db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )
    # không có kết quả nào được tìm thấy
    ```

2. **Specify a Query Condition on a Field in an Array of Documents**
    
    Muốn tìm kiếm các document với điều kiện cho một field embeded trong một array của document.
    Ta sẽ dùng dấu (.) để nối tên của array field với tên của field trong nested document. ví dụ:
    ```
    db.inventory.find( { 'instock.qty': { $lte: 20 } } )
    ```
    Trong ví dụ trên sẽ trả lại tất cả các document mà ***instock array*** có ít nhất một embedded document có trường ***qty*** có giá trị nhỏ hơn hoặc bằng ***20***.
    
    Có thể sử dụng ***index*** của array để chỉ rõ muốn search ở document thứ bao nhiêu trong 
    nested document:
    ```
    db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )
    ```

3. **Specify Multiple Conditions for Array of Documents**

    Trong phần 1 ở trên có phần chú ý khi chỉ dùng find thì yêu cầu về thứ tự các field trong collection được chỉ định. Nếu không muốn phải chú ý tới vấn đề order của field thì dùng **elemMatch**
    ```
    db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A"}}})
    #result:
    { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15}]}
    ```
    Có thể kết hợp với các **Comparison Query Operators** trong **elemMatch**
    ```
    db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20}}}})
    #result
    {item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 }]}
    {item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 }]}
    {item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 }
    ```
4. **count number element document in array of document use aggregation**


    Aggregation có thể hiểu là sự tập hợp. Các Aggregation operation xử lý các bản ghi dữ liệu và trả về kết quả đã được tính toán. Các phép toán tập hợp nhóm các giá trị từ nhiều Document lại với nhau, và có thể thực hiện nhiều phép toán đa dạng trên dữ liệu đã được nhóm đó để trả về một kết quả duy nhất. 
    ```
    db.inventory.aggregate(
       [
          {
             $project: {
                item: 1,
                numberOfInstock: { $size: "$instock" }
             }
          }
       ]
    )
    #result
    { item: "journal", numberOfStock: 2}
    { item: "notebook", numberOfStock: 1}
    { item: "paper", numberOfStock: 2}
    { item: "planner", numberOfStock: 2} 
    { item: "postcard", numberOfStock: 2} 
    ```
    Trong câu query ở trên mục đích là đêm ra trong mỗi document thì instock có bao nhiêu phần tử ở trong đó. Đó là một câu query đơn giản, có thể kết hợp nhiều [**Aggregation Pipeline Operators**](https://docs.mongodb.com/manual/reference/operator/aggregation/) và [**Aggregation Pipeline Stages**](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/) để thực hiện những lệnh phức tạp hơn.
    Một ví dụ khác:
    ```
    db.inventory.aggregate( [
       {$unwind: { path: "$instock", preserveNullAndEmptyArrays: true}},
       {$project: {_id: 1,
            all_stock_count: {
                $cond: [{$gt: ["$instock", 0]}, 1, 0]
            },
            deal_match: {
                $cond: [{
                    $and: [
                        {$gte: ["$instock.qty", 15]},
                        {$eq: ["$instock.warehouse", "A"]},
                    ]}, 1, 0
                ],
            }
        }},
        {$group: {_id: "$_id", all_stock_count: {$sum: "$all_stock_count"}, deal_match: {$sum: "$deal_match"}}}
    ] )
    ```
    Trong ví dụ trên là đếm trong từng document xem mỗi document thì array instock có bao nhiêu phần tử,trong mỗi document thì có bao phần tử thỏa mãn điều kiện là qty lớn hơn 15 và warehouse là A.
    

Mongodb cung cấp rất nhiều cách để chúng ta có thể thao tác và xử lý với nhưng dữ liệu lưu dạng Array of Embedded Documents. Các bạn có thể tìm hiểu thêm [tại đây](https://docs.mongodb.com/manual/core/document/). Cảm ơn đã đọc bài viết của mình.

Tham khảo: https://docs.mongodb.com/manual/core/document/