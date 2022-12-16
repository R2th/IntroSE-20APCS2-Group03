# Giới thiệu
Trươc hết là về pipeline, nó là khái niệm dùng để miêu tả sự xử lí, truyền tải dữ liệu xuôi theo một luồng.

Và Aggregation Pipeline là một framework dùng để tổng hợp lại dữ liệu được mô hình hóa dựa trên kỹ thuật pipeline.


Những Document có thể được đưa qua một chuỗi các giai đoạn pipeline để biến đổi và kết quả nhận được sẽ là sự tổng hợp của các so sánh, sàng lọc, thêm bớt nội dung ...Mỗi giai của pipeline biến đổi các Document khi chúng đi qua, thậm chí là tạo ra loại Document khác hẳn ban đầu, kết quả bước trước làm đầu vào cho bước sau.

Nhìn chung truy vấn bằng SQL có thể làm được những gì thì với Aggregation Pipeline của Mongodb( NoSQL ) cũng có thể làm được điều đó. Thậm chí là khi nhìn vào truy vấn bạn còn dễ hình dung các bước xử lí và kết quả đầu ra hơn là thao tác với SQL.


# Một vài Operator của  Aggregation Pipeline
*Dưới đây sẽ giới thiệu một số các operator thông dụng mà mình hay sử dụng. Vì số lượng của chúng khá nhiều và đa dạng nên bạn có thể tìm thêm trên https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/ *
## Toán tử $match
Dùng để lọc các Document, chỉ cho phép chuyển các Document phù hợp với tập điều kiện được chỉ định sang giai đoạn pipeline tiếp theo (nếu có).

Cú pháp : 
```
{ $match: { <query> } }
```

Ví dụ với 1 collection user như sau :
```
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "ten" : "akainu" }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "ten" : "aokiji" }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "ten" : "bosalino kizaru" }

```
Nếu muốn lấy ra những kết quả có tên là "bosalino kizaru" ta sẽ làm như sau :
```
db.user.aggregate(
    [ { $match : { ten : "bosalino kizaru" } } ]
);
```
## Toán tử $addFields
Cũng với dữ liệu như trên, bây giờ mình lại muốn thêm vào kết quả một vài trường dữ liệu bằng $addFields.
```
db.user.aggregate([
       { 
           $addFields: { 
              chuc_vu: "Đô đốc",
              gioi_tinh: 0,    // 0: nam, 1: nữ
            },
             $addFields: { 
              tuoi: 55,
            }
        }
]
);
```
Và thế là ta được: 
```
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "ten" : "akainu", "chuc_vu": "Đô đốc", "gioi_tinh": 0, "tuoi": 55 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "ten" : "aokiji", "chuc_vu": "Đô đốc", "gioi_tinh": 0, "tuoi": 55 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "ten" : "bosalino kizaru", "chuc_vu": "Đô đốc", "gioi_tinh": 0, "tuoi": 55 }
```
Có thể thấy sau khi thêm 2 trường chuc_vu,  gioi_tinh thì kết quả được kế thừa lại tới bước tiếp theo để cuối cùng ta được tổng hợp cả 3 trường. Đúng với tư tưởng của kỹ thuật pipeline.
## Toán tử $project
Khi Document của chúng ta có quá nhiều fields, và tất nhiên ta chỉ muốn lấy 1 vài dữ liệu có ích thì dùng project là một lựa chọn.
Tất nhiên là lại dùng tiếp kết quả bước trên:
```
db.user.aggregate([
       { 
           $project: { 
             _id: 1,
              ten: 1,
              tong_hop: {
                $concat: [
                   "$ten", "-", "$tuoi", "-", 
                    { $cond: { 
                           if: { $eq: [ "$gioi_tinh", 0 }, then: "nam", else: "nữ"
                           }
                     }, 
                     "-", "$chuc_vu"
                 ]
              }
            }
        }
]
);
```
Ta sẽ thu được:
```
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "ten" : "akainu", "tong_hop": "akainu-Đô đốc-nam-55 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "ten" : "aokiji", "tong_hop": "aokiji-Đô đốc-nam-55 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "ten" : "bosalino kizaru", "tong_hop": "bosalino kizaru-Đô đốc-nam-55 }
```
Như các bạn thấy, trong $project chúng ta cũng có thể thêm các trường dữ liệu tự định nghĩa, và sâu bên trong toán tử chúng ta hoàn toàn sử dụng chèn vào toán tử khác để có được kết quả mong muốn.

Bằng cách này, sau khi query thì dữ liệu trả về có khả năng tùy biến về cả số lượng, nội dung, phân cấp như mong muốn. rất thuận tiện cho những xử lí về sau bằng các ngôn ngữ lập trình.