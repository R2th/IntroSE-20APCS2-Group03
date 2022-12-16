# NoSQL là gì, có liên quan tới SQL ?
  - Nếu bạn là một người quan tâm và đang đi tìm hiểu về cụm từ "NoSQL" thì chắc hẳn là bạn đã biết đến SQL - một ngôn ngữ truy vấn có cấu trúc được dùng phổ biến trên toàn thế giới, trong những cơ sở dữ liệu quan hệ. Thông qua các câu truy vấn, SQL hoàn toàn có thể được sử dụng một cách chuẩn chỉnh, tính logic cao trên các hệ thống với CSDL như vậy. Tuy nhiên, với một lượng dữ liệu cực lớn thì những bài toán mới được đặt ra đã khiến mô hình CSDL quan hệ và SQL lộ rõ điểm yếu của mình. Cái giá phải trả cho sự chuẩn chỉnh và logic chặt chẽ là tốc độ và giới hạn khả năng xử lí .
Và đây chính là đất diễn cho anh chàng NoSQL của chúng ta, bạn có thể gọi hắn là "không sql" cho dễ tưởng tượng. Nói đơn giản thì NoSQL không sử dụng câu truy vấn SQL để thao tác với dữ liệu, và tất nhiên như vậy thì cũng chẳng cần thiết phải có cơ sở dữ liệu ràng buộc quan hệ làm gì.
# Bài toán cụ thể và cách giải quyết vấn đề của NoSQL
- Có rất nhiều những hãng công nghệ đã và đang áp dụng NoSQL vào thành công của họ, sản phẩm nổi bật và dễ nhận ra nhất là công cụ tìm kiếm Google, Amazon,... Và mỗi khi search từ khóa chỉ 1 vài giây đã có tới cả triệu kết quả được phát hiện trong kho dữ liệu của cả thế giới . Nếu để cho anh bạn SQL cùng CSDL của anh ta đảm nhận nhiệm vụ này, đó sẽ là cả một thử thách to đùng cho nhà phát triển lẫn sự kiên nhẫn của người dùng.
- Cách thức của NoSQL  là sử dụng cơ sở dữ liệu phi quan hệ với các kiểu mô hình dữ liệu document, graph, key-value,... Tối ưu hóa đặc biệt cho các ứng dụng với khối lượng lớn dữ liệu, độ trễ thấp, và các mô hình dữ liệu linh hoạt, có thể nới lỏng tính nhất quán dữ liệu. Dữ liệu có thể được lưu trữ phân tán và xử lí tại nhiều nơi, đồng thời khoảng thời gian dành cho những tính toán ràng buộc về mặt quan hệ dữ liệu trong hệ thống được giải quyết mà không đòi hỏi quá nhiều về năng lực phần cứng cũng như tài nguyên hệ thống, tăng khả năng chịu lỗi.

# Những đặc điểm cơ bản của CSDL NoSQL
- High Scalability: Lượng dữ liệu có thể quản lí gần như không giới hạn trong hệ thống.

- High Availability: Chấp nhận dư thừa dữ liệu , khả năng chịu lỗi cũng vì thế mà cao hơn CSDL quan hệ khi một thành phần dữ liệu bị hỏng/mất đi.

- Atomicity: Trạng thái dữ liệu là độc lập mỗi khi diễn ra sự thay đổi.

- Consistency: Tính nhất quán dữ liệu yếu, tính đúng đắn trong logic dữ liệu có thể mất 1 khoảng thời gian để cập nhật ổn định.

- Durability: Dữ liệu có thể tồn tại trong bộ nhớ nhưng đồng thời cũng được lưu trữ lại đĩa cứng.

- Deployment Flexibility: hệ thống tự động nhận biết và lưu trữ sự thay đổi các node , không đòi hỏi cấu hình phần cứng mạnh, đồng nhất.

- Modeling flexibility: Dữ liệu lưu trữ nhiều dạng linh hoạt (key-value, document, graphs).

- Query Flexibility: Linh hoạt trong truy vấn bằng việc load một tập giá trị dựa vào một dãy các key.

# Cách sử dụng
Nãy giờ chúng ta chỉ nói khái quát về định nghĩa và đặc điểm cấu thành nên NoSQL. Giờ thì là lúc thực sự xem xét luồng hoạt động và luân chuyển dữ liệu ra sao.
Với SQL thì đã quá quen thuộc, ta có bảng lưu dữ liệu cho các đối tượng cùng với khóa chính và khóa phụ liên kết chúng với nhau. Có thế thì mới mong lấy được dữ liệu xuyên qua một dãy các bảng JOIN vào nhau. Nhưng ơ kìa, NoSQL thì chả có một cái gì giống thế cả, vậy thì "How ?".
Cùng xem một ánh xạ các khái niệm ở database cho SQL sang MongoDB( database điển hình dùng cho NoSQL) :
![](https://images.viblo.asia/44ebdc55-c5e0-4a16-b091-e4a7306baf2d.png)
### ObjectId
ObjectId là duy nhất, dùng để phân biệt các document với nhau , có tác dụng như khóa chính trong bảng csdl quan hệ.
### Field
Một field tương đương một key trong document thể hiện một thuộc tính của dữ liệu
### Document
Một document là một tập các key-value, nó tương đương với 1 bản dữ liệu. Documents có cấu trúc động, trong cùng một collection được truy xuất không cần phải có cùng một tập các key cũng như thứ tự không cần giống nhau, thậm chí các key đó cũng không nhất thiết có cùng kiểu value.
### Collection
Collection là một nhóm các documents của MongoDB. Nó tương đương với một table trong RDBMS. Thông thường, tất cả các documents trong collections có mục đích khá giống nhau hoặc liên quan tới nhau.

### Thao tác dữ liệu
-  Về cơ bản, thứ bạn cần là một Collection cho đối đượng mà bạn muốn thao tác. Collection tương tự như table, nó cần phải gắn vào một database được xác định, Collection này đóng vai trò như một người đại diện, instant cho đối tượng đó. Khi đó nó có thể thực hiện các thao tác quen thuộc thường thấy trong SQL.
-  Ví dụ như trong MongoDB :

Collection có thể được tạo ngầm mặc định, và thực thi insert 1 document ngay sau đó :
```
db.collection.insert([{
id: ObjectId(id1),
head: 'first object',
desc: 'document',
by: 'baonguyen',
point: 999
},...])
```
Hay thực hiện find (<=> select) tìm kiếm các document :
```
db.collection.find({k1:v1, k2:v2});   // điều kiện AND
db.collection.find({$or: [
{k1: v1}, {k2:v2}                // điều kiện OR
]
});
```
Cập nhật update document :
```
db.collection.update({'head':'first object'}, {$set:{'point':'1000'}, {multi:true/false}})
```

*Trên đây là những chia sẻ ngắn của mình , hi vọng lượng thông tin đủ để các bạn mường tượng và dễ tiếp cận với khái niệm NoSQL.*






..

-----



-----