Chắc hẳn các huynh đệ dev backend bây giờ đã không còn xa lạ gì với 1 database hết sức phổ biến là **mongodb** và ai cũng giắt sau thắt lưng dăm ba tuyệt chiêu với database thần thánh này rồi đúng không? Nhưng tại hạ xin giới thiệu dưới đây là 1 nửa cuốn tàn thư **Binh pháp Mon tử và 360 mưu kế** từng lưu truyền trong nhân gian nhưng đã thất lạc từ lâu mà tại hạ khó khăn lắm mới có được, đảm bảo các huynh đệ sẽ lĩnh hội được những tuyệt chiêu phi phàm mà nhẹ thì làm đồng môn lác mắt, tỷ muội ái mộ mà nặng thì thượng quan tưởng thưởng hạ nhân trầm trồ.

**Let's start!**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7fxp5oq03r_%E1%BA%A3nh.png)

## First things first

Khoan đã nào đừng vội thế. Hãy cùng điểm qua 1 chút về nhà chiến lược gia đại tài mà chúng ta không biết mặt (it's me). Tại hạ tên **Minh** họ **Monmen**, từng được giang hồ đồn thổi với nhiều cái tên dị hợm như **Minh béo**, **Minh mô mần**, **Minh mũm mĩm**,... nhưng với vẻ ngoài đẹp trai cùng tài chém gió kiệt xuất biến không thành có, tại hạ đã làm rất nhiều anh hùng trong thiên hạ đọc đến dòng này và tưởng là có gì đó kinh khủng. Nhưng mà không có đâu, chỉ là nhân ngày đầu xuân năm mới, tại hạ cũng thu dọn lại trí nhớ lộn xộn của bản thân và nhận ra nó cần sắp xếp lại nên mở bát luôn bằng 1 bài đánh index mongodb cho ngăn nắp. Đây là 1 trong những kiến thức tại hạ tâm đắc nhất được đúc kết từ 4 năm sử dụng mongodb cho tới giờ. 

Mời các huynh đệ theo dõi. 

## Kế sách 1: Nhất index hạ song field (aka nhất tiễn hạ song điêu)

Theo thư tịch cổ về mongodb thì chiếc DB thần thánh này **thường** chỉ hỗ trợ duy nhất **1 index** cho **1 query**. (Các hạ đừng nhầm với việc không hỗ trợ nhiều index 1 query nha, nó có hỗ trợ nhưng chỉ trong 1 số trường hợp ngặt nghèo). Chính vì vậy mà trường phái đánh index cho mongodb trở nên thịnh hành với chiêu thức **compound index** (khác với hệ sql như mysql thường thịnh hành index 1 field). Chiêu thức đánh index này cho phép các vị huynh đệ đánh 1 index dùng nhiều field thay vì 1. Chính vì vậy chỉ cần 1 index cũng có thể thoải mái support cho query của các huynh đệ.

**Nhất index hạ song field** là kế sách tận dụng 1 **compound index** để giải quyết vấn đề của query trên nhiều field.

**Điều kiện thi triển:**

- Thường xuyên sử dụng query với filter, sort nhiều field
- Query có sự xuất hiện của **toàn bộ** hoặc **prefix field** (trong filter và sort)

**Cách thi triển**

***Xác định số field thường xuyên được sử dụng và đưa vào index.***
- Recommend **tối đa 4 field**. Nếu phải đánh 4 field trở lên, hãy cân nhắc kỹ cách tiếp cận khác.
- 4 field được đưa vào index thường bao gồm các kiểu: **tìm kiếm chính xác**, **tìm kiếm khoảng**, **sort kết quả**.

***Xác định thứ tự của các field trong index. Nói chung, có 1 số cách xác định priority cho việc đặt thứ tự như sau:***
- Theo đặc điểm query: `chính xác` > `khoảng` > `sort`
- Theo đặc điểm data: `nhiều giá trị khác nhau` > `ít giá trị khác nhau`
- Theo đặc điểm tần suất: `field xuất hiện trong nhiều query` > `field ít được query` (cách này để tối ưu cho các trường hợp muốn tái sử dụng index prefix)

***Xác định chiều sắp xếp của các field trong index. Việc này để hỗ trợ cho quá trình sort. Theo đó:***
- Nếu chỉ sort 1 field, chiều không quan trọng
- Nếu sort 2 field trở lên, 2 field đó phải có chiều tương tự mà index hỗ trợ. Ví dụ index `{a: 1, b: -1}` sẽ chỉ hỗ trợ `sort({a: 1, b: -1})` hoặc `sort({a: -1, b: 1})`

```javascript
db.test.createIndex({a: 1, b: 1, c: 1});
```

**Lưu ý**

- Không nên tham field bỏ index vì nó làm index trở nên nặng nề, khó lưu trữ toàn bộ trên ram.
- Chú ý nhiều tới thứ tự các field.
- Cân đối giữa việc đổi thứ tự field và tạo 1 index khác dựa vào tần suất sử dụng của từng index.

Nghệ thuật ở đây chính là việc các huynh đệ phải cân đối lợi hại của việc thay đổi thứ tự các field khi đánh index. Có 1 số nhận định mà các huynh đệ có thể tham khảo.

- Các field kiểu `user_id`, `parent_id`,... thường đứng đầu tùy theo business. Thường có độ phân tán vừa phải + so sánh chính xác.
- Các field kiểu `type`, `status`,... thường đứng giữa. Các field này thường có kiểu tìm kiếm chính xác nhưng độ phân tán thấp, trong query thường phải đi kèm với 1 field phía trên. Trừ các trường hợp mang yếu tố quản trị, báo cáo mà các field này đi riêng lẻ.
- Các field kiểu `score` thường đứng giữa hoặc cuối. Các field này thường được dùng trong tìm kiếm khoảng hoặc sort. 
- Các field kiểu `datetime` liên tục thường đứng cuối. Các field này thường được dùng để sort. Với các trường hợp dùng `datetime` để filter theo khoảng thì thường đi riêng lẻ.

Xem thêm tại [https://docs.mongodb.com/manual/core/index-compound/](https://docs.mongodb.com/manual/core/index-compound/)

## Kế sách 2: Ve sầu thoát hashed (aka ve sầu thoát xác)

Đôi khi huynh đệ chúng ta phải đối mặt với những field chứa những dòng text lớn, kiểu như `slug`, `login token`, `session token`, `security token`... mà đặc điểm của nó là **rất dài**. Những field này thường xuất hiện trong tìm kiếm chính xác. Thế nhưng đánh index những field text này lại có những vấn đề:

- **Dung lượng index lớn**, có thể không chứa được trên ram hoặc giảm performance.
- **Chạm limit 1024 ký tự** của mongodb cho 1 field được index.

Vậy làm sao để vượt qua kẻ địch mạnh như hổ này?

Rất đơn giản hãy sử dụng chiêu thức **ve sầu thoát hashed**. Ta sẽ tránh mặt mạnh nhất của địch là **độ dài**, tạo 1 vỏ bọc là đánh index cho field này nhưng thật ra là chúng ta sẽ **hash giá trị** của chúng khi đưa vào index. Nếu field có value dài hơn 1024 ký tự thì vẫn sẽ index được bình thường, đồng thời hiệu quả lưu trữ của index tăng lên rõ rệt khi dung lượng giảm đi đáng kể.

> Hash là các thuật toán xử lý mapping 1 value -> 1 hash (thường có độ dài xác định). 

**Điều kiện thi triển**

- Chỉ tìm kiếm chính xác trên text field
- Chỉ dùng 1 field để tìm kiếm. Do vậy index sẽ hiệu quả với các loại field có độ phân tán gần như unique.

**Cách thi triển**

Thật may mắn là mongodb hỗ trợ chúng ta việc này `out of the box`, tất cả việc ta cần làm là tạo 1 index hashed như sau:

```javascript
db.test.createIndex({fieldName: 'hashed'});
```

**Lưu ý**

- Hashed index không hỗ trợ **compound index**
- Hashed index không hỗ trợ **tìm kiếm khoảng**, **tìm kiếm prefix**, **sort**
- Hashed index không hỗ trợ **unique**

Usecase thường gặp nhất khi sử dụng chiêu thức này thường là ở các hệ thống authentication khi tìm kiếm 1 bản ghi trong db với 1 chuỗi token dài ngoằng.

Xem thêm tại [https://docs.mongodb.com/manual/core/index-hashed/](https://docs.mongodb.com/manual/core/index-hashed/)

## Kế sách 3: Mượn unique hoàn prefix (aka mượn xác hoàn hồn)

Unique index trên 1 chuỗi vốn được coi là **pain in the ass** trong kỹ thuật đánh index bởi nó làm chậm đi rất nhiều quá trình insert và update dữ liệu do phải đảm bảo tính unique, cộng thêm với việc unique index không được sử dụng hashed (do value sau khi hash không đảm bảo được tính unique). Do vậy index unique dựa trên chuỗi sẽ được xử lý tương tự 1 field bình thường và sẽ **rất tốn dung lượng**.

Đây là kẻ địch mà chúng ta không thể tránh khỏi, cũng chẳng có cách nào làm đi vòng qua nó được khi yêu cầu bài toán đã đặt ra thế. Tuy nhiên tại hạ đã nghiệm ra 1 chiêu thức biến chiếc unique index nặng nề vô dụng trở nên hữu ích hơn chính là **mượn unique hoàn prefix**.

Bản chất của chiêu thức này chính là việc lợi dụng những thông tin trong unique index để phục vụ cho 1 mục đích khác. Qua đó tận dụng được khả năng **tìm kiếm theo prefix** của unique index và tăng khả năng sử dụng của nó.

**Điều kiện thi triển**

- Unique index sinh ra từ sự kết hợp của nhiều thông tin.
- Unique index có thể là compound index hoặc index cho 1 field string bình thường.

**Cách thi triển**

Tạo dựng unique key bằng việc đưa những field có giá trị tìm kiếm và có độ phân tán lớn lên đầu key. Ví dụ unique key là sự kết hợp của 1 số thông tin: item_id, other_id,...,type, user_id. Vì số lượng thành tố không xác định nên tại hạ dùng string key chứ không dùng các field riêng lẻ với compound index.

Unique key: `item_123:other_2:type_1:user_1:`.

Việc sắp xếp này tương tự sắp xếp thứ tự 1 compound index, khi tại hạ đưa những data cần tìm kiếm lên phía trên, đẩy các data ít quan trọng hơn xuống dưới. Ở đây là tại hạ hay tìm kiếm theo `item`, `other`, còn user_id không cần thiết vì đã lưu trữ bên ngoài và index bên ngoài.

Như vậy, khi tìm kiếm toàn bộ các bản ghi có giá trị `item_123` sẽ có dạng tìm kiếm theo Regex như sau:

```javascript
db.test.find({uniqueField: /^item_123:/});
```

Hay sâu hơn đến `other_2`

```javascript
db.test.find({uniqueField: /^item_123:other_2:/});
```

Với unique index dựa trên compound index thì cách làm tương tự, tận dụng được các field là prefix của index.

**Lưu ý**
- Chỉ áp dụng được với tìm kiếm prefix regex. Không thể tìm kiếm 1 giá trị không phải prefix.
- Độ lớn của index không mất đi, chỉ là 1 kiểu tận dụng sự hao phí có sẵn cho index này.

Kế sách này thường được tại hạ sử dụng để tận thu nguồn lực, sử dụng trong các case cần update hay delete hàng loạt dựa vào 1 data xuất hiện trong unique key nhưng không cần xuất hiện ở ngoài (hoặc có ở ngoài nhưng không cần tạo index).

Xem thêm tại [https://docs.mongodb.com/manual/reference/operator/query/regex/#index-use](https://docs.mongodb.com/manual/reference/operator/query/regex/#index-use)

## Kế sách 4: Điệu value ly index (aka điệu hổ ly sơn)

Nhớ khi xưa Tôn Sách muốn đánh chiếm Lư Giang nhưng lại vướng phải binh hùng tướng mạnh của Lưu Huân đang trấn thủ. Lúc đó Tôn Sách đã sử dụng kế dẫn dụ Lưu Huân xuất binh đi đánh Thượng Liễu để nhân cơ hội đánh úp Lư Giang. Đó gọi là kế **Điệu hổ ly sơn**.

Ngày nay đứng trước một thế lực cực kì mạnh mẽ đó là index những field **ít giá trị** như `status`, `state`, `type`,... rất kém hiệu quả và tốn dung lượng trên các collection lớn. Tại hạ cũng đã sử dụng kế sách **Điệu value ly index** nhằm làm suy yếu dung lượng của index, từ đó làm index tốn ít dung lượng hơn và hiệu quả hơn.

Cách index này gọi là **partial index**.

> **Partial index** là loại index dựa trên 1 điều kiện nhất định. Tức là chỉ những bản ghi nào **thỏa mãn điều kiện** mới được index. Do đó dung lượng index sẽ giảm xuống. Toàn bộ bản ghi không thỏa mãn điều kiện sẽ không được index.

**Điều kiện thi triển**

Kế sách này được thi triển hiệu quả trong 1 số binh tình như sau:

- Collection có số lượng bản ghi lớn (vài triệu trở lên)
- Index truyền thống không hiệu quả
    + Index trên các field dạng flag, ít giá trị khác nhau như `status`, `state`, `type`,... nhưng các flag này được **phân bố không đều**. Ví dụ `status` có 10% là 0, 20% là 1, 70% là 2.
    + Index trên các field phân bố đều, nhưng business logic **không dùng toàn bộ**. Ví dụ index trên field `score`.
- Truy vấn **luôn luôn** sử dụng 1 kiểu điều kiện và thường là điều kiện thiểu số. Ví dụ luôn query theo `status = 1`, hay `score > 5` 

**Cách thi triển**

***Xác định phần thiểu số và đặt làm điều kiện filter.***
***Nếu index thuộc dạng compound index thì:***
- Nếu phần thiểu số là 1 giá trị thì không cần đưa field này vào index.
- Nếu phần thiểu số là 1 khoảng thì tùy vào nhu cầu để tạo index với thứ tự field bình thường.

```javascript
// isDirty là field có giá trị boolean đánh dấu dirty record cần update
db.test.createIndex(
   { createdAt: 1 },
   { partialFilterExpression: { isDirty: true } }
)

// Status chứa trạng thái xử lý của 1 bản ghi với phân bố không đều ở trên
db.test.createIndex(
   { status: 1, createdAt: 1 },
   { partialFilterExpression: { status: { $lt: 2 } } }
)

// Tạo bảng xếp hạng top user nhưng với điều kiện score > 5
db.test.createIndex(
   { score: -1, name: 1 },
   { partialFilterExpression: { score: { $gt: 5 } } }
)
```

**Lưu ý**

- Kế sách index này rất hiệu quả với các trường hợp cần tìm kiếm, sort trên 1 tập hợp thiểu số cho trước. Nên nhớ **thiểu số** và **cho trước** là 2 yếu tố quyết định thành bại của chiến thuật này.
- Không hiệu quả với các trường hợp đa số vì dung lượng index không giảm được mấy.

**Điệu value ly index** được tại hạ thi triển rất hiệu quả trên các collection chục triệu tới trăm triệu bản ghi với dung lượng index chỉ khoảng vài MB đổ lại khi đã chắt lọc được giá trị thiểu số để cho vào filter. Việc tiết kiệm dung lượng của index rất quan trọng trong việc đảm bảo mongodb sẽ nhét vừa các index của chúng ta trong ram, từ đó tăng hiệu quả xử lý index. 

Xem thêm tại [https://docs.mongodb.com/manual/core/index-partial/](https://docs.mongodb.com/manual/core/index-partial/)

## Kế sách 5: Vô index thắng hữu index (aka vô chiêu thắng hữu chiêu)

Kế sách cuối cùng và cũng là bí kíp thượng thừa của trưởng môn phái mongo được tại hạ đúc kết đơn giản là **Vô index thắng hữu index**. Tuy ngắn gọn nhưng kế sách này có bảy bảy bốn chín cách biến hóa và rất khó nắm bắt. Tại hạ hiện tại cũng chỉ nắm được 1 số cách biến hóa cơ bản của kế sách này, và khi thực hành nó cũng vẫn còn bập bõm lắm.

Nói một cách ngắn gọn: **The most efficient index is NO INDEX**.

Việt súp: **Cách index hiệu quả nhất là không index**.

Nói vậy tức là sao? Index luôn đi kèm với sự đánh đổi, và những sự đánh đổi đó là:

**Write performance**

Làm 1 phép toán cơ bản:

1 IO: 1 action đọc hoặc ghi vào disk

insert 1 record = **1 IO** (for data) + **n IO** (n là số index)
delete 1 record = **1 IO** (for data) + **n IO** (n là số index)
update 1 record = **1 IO** (for delete old data) + **1 IO** (for create new data) + **n IO** (n là số index) 

Càng nhiều index, ta càng cần nhiều IO operation để thực thi với mỗi action. Điều này làm tốc độ ghi giảm xuống. 

Vậy nên:

- Tiết kiệm số lượng index.
- Không index bừa bãi.
- Tạo các index có thể tái sử dụng trong nhiều trường hợp hơn.

**Storage**

Chưa cần nhắc đến disk storage cho index (do disk rất rẻ) thì index cần được lưu ở trong ram để cho kết quả tìm kiếm tốt nhất, do vậy tạo càng nhiều index hay index càng nặng thì dung lượng ram chiếm hữu càng tăng. Để index tràn ram là thứ cuối cùng các vị huynh đệ muốn xảy ra trên con mongo của mình.

Làm sao để tiết kiệm?

- Again, tạo index và reuse index hiệu quả.
- Sử dụng kế sách 2, 3, 4 tại hạ vừa bày ở trên để giảm dung lượng 1 index không thể cắt bỏ.

**Kinh nghiệm cá nhân**

Sau con đường đi lấy kinh đầy chông gai và đau khổ, tại hạ đã lĩnh hội được 1 số chân kinh sau:

- Trên các hệ thống **write operation nhiều**, ví dụ các hệ thống tracking, logging, thì **ĐỪNG TẠO INDEX**. Tận dụng 1 index mặc định duy nhất là chiếc index **_id_**. Đừng nghĩ id là vô dụng khi mà MongoID được cấu thành từ timestamp và các thành tố random. Từ đó cho phép ta query dựa trên thời gian, sorting rất hiệu quả. Với những batch operation trên mongo trong các hệ thống data analytic thì tại hạ luôn luôn sử dụng việc **chia khoảng id để xử lý**. Vô cùng hữu hiệu và không cần tạo thêm bất kỳ index nào cả.
- Biến thể khác của **No index** chính là **sharding**. Tức là thay vì phải tạo index cho 1 field nào đó thì ta tách hẳn nó thành các collection khác nhau. Việc này khá khoai sắn và tùy thuộc vào từng hệ thống. Ví dụ tách deleted record sang 1 collection khác chứ không lưu field `isDeleted`, hay tách type `x`, type `y` ra 2 collection x, y chứ không lưu field `type` nữa,...
- Biến thể khác nữa của **No index** dựa trên số lượng record mà index trả về trong 1 query. Nếu collection có số lượng record từ vài trăm ngàn tới vài triệu và 1 truy vấn lôi **phần lớn** trong số đó ra để tính toán (ví dụ khi aggregate), thì việc đánh index (và mongo sử dụng index đó) có thể còn chậm hơn cả việc thực hiện collection scan. Lý do là vì collection scan thì các bản ghi sẽ được đọc theo **storage block**, trong khi index scan thì đọc kiểu **random access**. Do vậy mà khi số lượng bản ghi match với query đủ lớn thì việc đọc từng block trên disk trong collection scan sẽ nhanh hơn đọc theo index. Do đó loại bỏ index là điều cần thiết.

## Tổng kết

Nhờ áp dụng những kế sách thần thánh trên, tại hạ đã quản trị thành công chiếc database có nhiều operation nhất và cũng nặng nề nhất mạng xã hội GAPO chỉ với **2 CPU + 12GB ram + 3000 IOPS disk**. Hiện tại thì data cũng tầm tầm trăm triệu, nặng trăm GB, hàng ngày thêm, sửa, xóa chục triệu record và dùng thường trực ~ 2000 IOPS.

Tới đây, tại hạ cũng sức tàn lực kiệt phải kết lại cuốn tàn thư đã thất truyền này. Rất mong các vị huynh đệ phiêu bạt trên giang hồ có tuyệt chiêu nào hay, hay món võ nào tâm đắc có thể đóng góp ý kiến để tại hạ được mở mang tầm mắt. Xin cảm ơn.

Wait a minute, các ý chính trong bài:

- **Sử dụng compound index từ 2 - 4 field**
- **Sử dụng hashed index cho long string field**
- **Tận dụng unique index cho tìm kiếm prefix** 
- **Giảm dung lượng index bằng partial index**
- **Dẹp mẹ đi đừng index nữa**