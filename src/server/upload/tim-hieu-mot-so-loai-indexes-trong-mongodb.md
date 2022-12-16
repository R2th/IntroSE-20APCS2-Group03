![](https://images.viblo.asia/88383437-d687-4f92-be36-c0c0c998afd4.png)
Ở bài viết này mình sẽ trình bày hết sức đơn giản về lý thuyết và không hướng dẫn chi tiết bạn cách làm như thế nào. Nhưng một khi đã hiểu bạn có thể vào trực tiếp trang chủ của mongoDB để thực hành theo nhé. Nào hãy bắt đầu tìm hiểu thôi.
## 1. MongoDB là gì?
Trước khi tìm hiểu về **mongodb** ta cùng nhau tìm hiểu **NoSQL** là gì trước nhé:
* NoSQL là viết tắt của None-Relational SQL. Là một mã nguồn mở không sử dụng các mối quan hệ ràng buộc như các loại CSDL quan hệ khác.
* NoSQL được phát triển trên Javascript Framework với kiểu dữ liệu là json và dạng dữ liệu theo kiểu key: value.
* NoSQL ra đời như là để giải quyết một số hạn chế trong mô hình dữ liệu quan hệ.
* NoSQL bỏ qua tính toàn vẹn của dữ liệu và transaction để đổi lấy hiệu suất nhanh và khả năng mở rộng.

Vì vậy CSDL NoSQL là lựa chọn cực kỳ thích hợp cho nhiều ứng dụng hiện đại, ví dụ như di động, web và trò chơi. Bởi vì tính linh hoạt, cực kì thiết thực và có khả năng thay đổi quy mô và hiệu năng cao để đem đến cho người dùng trải nghiệm tuyệt vời.

MongoDB chúng ta tìm hiệu trên chính là một hệ quản trị cơ sở dữ liệu thuộc NoSQL. Cũng giống như MySQL, SQLServer là hệ quản trị cơ sở dữ liệu của SQL.

Một vài điểm khác biệt so với CSDL quan hệ là: ở CSDL quan hệ sử dụng các bảng để lưu dữ liệu thì MongoDB sử dụng khái niệm là collection. Là nơi định nghĩa các column. Với mỗi row gọi là document. Các collection trong MongoDB được tái cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuần theo một cấu trúc nhất định. Thông tin liên quan được lưu trữ cùng nhau để truy vấn nhanh chóng.

Ví dụ:
   
   Dưới đây là hình ảnh minh họa một database có một collection zips. Trong collection zips có rất nhiều document.
   
  ![](https://images.viblo.asia/bddc182b-fd0e-42ff-9957-dda7c01478f5.png)
   
   Kiểu dữ liệu giống json phải không nào. Điều chúng ta thường thấy trong CSDL quan hệ là sẽ tạo một bảng để lưu City riêng phải không nào. MongoDB thì khác những dữ liệu nào liên quan nó sẽ gom chung vào một collection. Đừng lo ngại về bộ nhớ vì nó có tính mở rộng rất tuyệt vời. 
    
## 2. Indexes trong mongoDB
Thường khi chúng ta làm việc với dữ liệu không quá lớn thì chúng ta không quan tâm thời gian chúng thực thi. Và thời gian của chúng cũng không đáng kể. Tuy nhiên đối với dữ liệu tương đối lớn. Hàng chục ngàn record trở lên việc quan tâm tới thời gian thực thi là cực kì quan trọng. Nó giúp tăng hiệu năng của ứng dụng, giúp trải nghiệm của người dùng được tốt hơn.

Indexes nó hỗ trợ việc thực thi những câu lệnh query một cách hiệu quả. Nếu không có các Indexes. Nó phải thực hiện việc quét qua tất cả các document trong collection để chọn những document phù hợp với câu lệnh truy vấn. Nếu như có Indexes thích hợp cho câu lệnh query thì MongoDB này có thể sử dụng chỉ mục để hạn chế số lượng document cần phải kiểm tra. Cụ thể mongoDB sẽ chia nhỏ document của chúng ta tương tự như thế này.
![](https://images.viblo.asia/ec8d3688-1788-4a2d-9702-26a8fffa3dd9.png)
Việc tìm kiếm sẽ nhanh hơn nếu được phân vùng như thế này.

Nào vậy thì mongoDB có những loại Indexes nào thường dùng. Chúng ta cùng tới phần tiếp theo để tìm hiểu chi tiết.
## 3. Các loại Indexes trong mongoDB
Trước tiên bạn cần cài đăt mongoDB vào máy của mình và import dữ liệu bên dưới vào. Bạn tự search và làm theo nhé. :blush:

Dữ liệu mình ví dụ ở đây mình lấy từ trang của mongoDB.  [data-set](https://docs.mongodb.com/manual/tutorial/aggregation-zip-code-data-set/)

Dùng tool [Robo-3T](https://robomongo.org/) để thao tác với dữ liệu của chúng ta.
###     1. Single Field Indexes:
Chúng ta thực hiện một câu lệnh đơn giản xem chi tiết việc tìm kiếm những thành phố nào có dân số bằng 4546 : 
> db.zips.find({"pop":4546}).explain("executionStats")

![](https://images.viblo.asia/1d0decf8-7a1b-40e9-8c6a-fcc98ba8b59b.png)

Cùng phân tích kết quả:
    "nReturned" : 2 => document tìm được.
    "executionTimeMillis" : 16 => thời gian thực thi là 16 mili giây.
    "totalDocsExamined" : 29353 => số document, mongoDB phải quét qua.
    
Bây giờ ta thực hiện đánh chỉ số cho pop:
> db.records.createIndex( { score: 1 } )

![](https://images.viblo.asia/6b7b41a9-70ef-4134-8420-55e44722a3f4.png)

Bây giờ index đã tăng lên thành 2, mọi collection của chúng ta khi tạo nó sẽ có 1 index mặc định cho _id nhé các bạn.

Nào bây giờ hãy xem kết quả sau khi đã đánh dấu chỉ số thì như thế nào.
![](https://images.viblo.asia/6ee7e9eb-b1cd-4d3b-8d29-015baef87625.png)

Kết quả thật sự ấn tượng phải không nào. Kết quả chưa đến 1 mili giây để tìm kiếm và chỉ quét qua đúng 2 record.

###     2. Compound Indexes: 
Compound indexes cho phép ta đánh dấu chỉ mục cho nhiều trường. Nào hãy xem ví dụ để dễ hiểu hơn (mình đã xóa index ở phần trước rồi).

Tìm những thành phố thuộc tiểu bang MA và dân số bé hơn hoặc bằng 21905. lấy 30 phần tử từ vị trí 30 của kết quả tìm được.
![](https://images.viblo.asia/a7cdb8e1-4053-4088-bef8-6355e81872ed.png)

Hãy gắn index cho nó.
> db.zips.createIndex({"state":1, "pop":1})

Và hãy cùng xem kết quả:
![](https://images.viblo.asia/423224fe-0bcc-457b-8497-bb56961bb3e6.png)

Kết quả thật tuyệt vời phải không nào.
###     3. Unique Indexes: 
Unique thì chúng ta khá quên thuộc, như đã nói ở phần trước, mỗi một ducument trong collection khi sinh ra thì mặc định có một id riêng biệt, sắp xếp theo chiều tăng dần. Vậy hãy xem nó như thế nào.

![](https://images.viblo.asia/e950b89f-0c49-4a26-bc0e-8057323f1dfb.png)

Quả đúng như vậy "id" : 1. 1 là sắp xếp theo chiều tăng, ngược lại -1 thì sắp theo chiều giảm.
###     4. Sparse Indexes: 
Với những trường hợp bạn muốn tìm những document có field cần tìm không rỗng thì bạn hay tự kiểm tra xem trường đó của document có tồn tại giá trị không phải không nào.
Với Index bạn có thể làm điều đó một cách rất nhanh chóng và hiệu quả. Bằng các đánh index(chỉ mục) cho trường bạn đang xét đó. Việc còn lại là đây.
> db.YOUR_COLLECTION.find().sort({"FIELD_NEED_SORT_OR_NOT"}).hint({FIELD_NEED_HINT: 1})
###     5. TTL Indexes: 
TTL là từ viết tắt của Time To Live. Hãy thử tưởng tượng ứng dụng của chúng ta muốn cho người dùng dùng thử ứng dụng nhưng muốn login vào ứng dụng chúng ta cần phải có tài khoản và mật khẩu. Vậy khi tạo tài khoản cho người dùng dùng thử lại nảy sinh ra rác về sau. Thì rất may mongoDB cung cấp cho chúng ta TTL Indexes để mà giúp cho trường như đã nêu trên.
> db.eventlog.createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 3600 } )

Ở đây chúng ta đã set index cho trường **lastModifiedDate**. Document sau khi được tạo sẽ có thời gian sống là 3600s.
Một lưu ý: đó là trường **lastModifiedDate** phải có kiểu là **Date**
###     6. Text Indexes: 
Thông thường một ứng dụng sẽ không thể thiếu phần search phải không các bạn (không phải tất cả nha các bạn :sweat_smile::sweat_smile:). 
Đầu tiên chúng ta tạo index cho field cần search.
 ```
db.zips.createIndex(
   {
     city: "text",
     state: "text"
   }
 )
```
Việc tạo index đã thành công, vậy việc search thì như thế nào nhỉ :thinking:
> db.zips.find({$text: {$search: "HADLEY"}).pretty()

![](https://images.viblo.asia/7763aa08-08a4-4de6-9e46-bc3527a22591.png)

Về phần text indexes này khá là nhiều. Nếu bạn quan tâm hãy tìm hiểu thêm về set ngôn ngữ, cũng như tìm kiếm không phân biệt hoa thường hay tìm kiếm như LIKE trong SQL nữa nhé! :grinning:
 ## 4. Kết:
 Trên đây mình đã trình bày về một số indexes trong mongo mình từng thử qua, ngoài ra còn một vài index hữu dùng khác nữa. Không phải chỉ có chừng này index như thế nào đâu nhé.
 Việc thêm index sẽ tăng tốc việc tìm kiếm. Nhưng bạn hay cân nhắc việc thêm index vào database vì khi insert một data mới vào việc tính toán và tìm vị trí phù hợp cũng tốn khá nhiều thời gian. Vì vậy cần phải có sự lựa chọn phù hợp cho từng index trong ứng dụng của chúng ta.
 Mong rằng với chia sẽ của mình các bạn sẽ phát triển ứng dụng của mình tốt hơn.
 
  ***Tham khảo:***
  - https://docs.mongodb.com/manual/indexes/