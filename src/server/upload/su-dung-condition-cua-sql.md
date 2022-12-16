Khi mới lập trình RoR mình đã bị phụ thuộc rất nhiều vào ngôn ngữ Ruby và framework Rails, dẫn đến việc khi search key trên google mình luôn thêm 1 từ khóa là "ruby" hoặc "rails". Khi đó với mình mysql thực sự chỉ là 1 "kho lưu trữ dữ liệu" chứ không phải "hệ quản trị cơ sở dữ liệu".

Khi gặp 1 bài toán khoai về lấy dữ liệu thì mình sẽ luôn search google với từ khóa "rails" để xem có kết quả gì liên quan đến model không, và nếu không có hướng giải quyết thì: "Ui dồi ôi, thế này thì nàm nàm xao được!". 

Đấy là 1 sai lầm rất lớn của mình, vì mình đã hoàn toàn bỏ qua những tính năng hay ho của SQL mà chạy theo những thứ khá cứng nhắc của ngôn ngữ lập trình. Bài viết sau đây mình sẽ trình bày 1 tip mình vừa học lỏm được của 1 anh lead, mình cũng không rõ là nó có tốt không hay nó có mới mẻ với mọi người không, nhưng cho đến thời điểm hiện tại thì nó giúp mình rất nhiều và hy vọng là nó có thể giúp mọi ngưới trong 1 trường hợp nào đấy (trong trường hợp rules dự án cho phép viết kiểu này nhé).

### Vậy tip ở đây là gì? <br>

Bạn có bao giờ gặp trường hợp như này hay tương tự chưa?<br>

Bạn có 1 bảng nhưng lại có 2 trường kiểu date để lưu 2 loại ngày khác nhau(nếu 1 record có date_a thì không có date_b và ngược lại) và spec lại phải sort cả 2 bảng đấy cùng lúc theo ASC hoặc DESC như ví dụ sau:<br>

Ta có bảng User có 2 trường date_a và date_b:<br>

|id| date_a | date_b |
|--------| -------- | -------- |
|1|     26-08-2020     |     nil     |
|2| nil     | 04-06-2020     |
|3| 03-04-2020     | nil     |
|4| nil     | 23-09-2020     |

<br>
Và spec bắt chúng ta không phải sort như này:

```ruby
scope :sort_by_both_date, -> { order(date_a: :asc, date_b: :asc) }
```

query: 
```sql
SELECT `users`.* FROM `users` WHERE ORDER BY `users`.`date_a` ASC, `users`.`date_a` ASC
```
kết quả:
|id| date_a | date_b |
|--------| -------- | -------- |
|3| 03-04-2020     | nil     |
|1|     26-08-2020     |     nil     |
|2| nil     | 04-06-2020     |
|4| nil     | 23-09-2020     |
<br>
như chúng ta thấy 04-06 nhỏ hơn 26-08 nhưng lại ở dưới vì đơn giản cột `date_a` của nó bị `nil`. Và câu query trên mang ý nghĩa là order `date_a` trước nếu 2 hay nhiều bản ghi có giá trị `date_a` bằng nhau thì lúc này `date_b: :asc` mới thực sự có giá trị (nó sẽ sort các đứa có `date_a` bằng nhau dựa vào `date_b`)<br>

Nhưng ví dụ khách hàng lại bảo "Không, tôi không thích thế, Tôi muốn nó phải sort cả 2 cùng lúc như này cơ :"<br>

|id| date_a | date_b |
|--------| -------- | -------- |
|3| 03-04-2020     | nil     |
|2| nil     | 04-06-2020     |
|1|     26-08-2020     |     nil     |
|4| nil     | 23-09-2020     |
<br>
"ơ thế khó vl", nếu search google với từ khóa "rails" thôi thì chắc cũng hẹo hoặc nếu có cách đi nữa thì chắc cũng sẽ lằng nhằng phết. Thì đây là lúc sử dụng SQL chứ còn gì nữa ? Mà mình tin phần lớn mọi người cũng sẽ nghĩ đến SQL ngay thôi :D <br>

Vậy vấn đề là viết như nào để sort được như trên ?<br>

Mình đã sử dụng đến các hàm điều kiện của SQL (IF ELSE, CASE WHEN), cái mà lúc đó mình nghĩ "Ơ SQL có IF ELSE à?":

Giả dụ chúng ta có 1 cột flag: boolean cùng bảng để giúp ta nhận biết dùng date nào khi sort (nếu flag = true thì sử dụng date_a, flag = false thì sẽ dùng date_b để sort). Vây bây giờ chúng ta có bảng ban đầu như sau:

|id| date_a | date_b | flag |
|--------| -------- | -------- | -------- |
|1|     26-08-2020     |     nil     | true |
|2| nil     | 04-06-2020     | false |
|3| 03-04-2020     | nil     | true |
|4| nil     | 23-09-2020     | false |
 <br>
 và thứ viết 1 scope như sau:
 
 ```ruby
scope :sort_by_both_date, -> { order("if(users.flag = true, users.date_a, users.date_b) asc") }
```
Câu lệnh trên sẽ ra kết quả ưng ý khách hàng. Nhưng bạn nên sử dụng Arel và đổi thành như này nhé. <br>

 ```ruby
scope :sort_by_both_date, -> { order(Arel.sql("if(users.flag = true, users.date_a, users.date_b) asc")) }
```

Chỗ if kia có cấu trúc là if( nếu, thì, không thì). Và hiểu nôm na là giờ mình đã gộp 2 cột date_a và date_b làm 1 để sort.

kết quả:
|id| date_a | date_b | flag |
|--------| -------- | -------- |--------|
|3| 03-04-2020     | nil     |true|
|2| nil     | 04-06-2020     |false|
|1|     26-08-2020     |     nil     |true|
|4| nil     | 23-09-2020     |false|

chúng ta có câu query như sau:
```sql
SELECT `users`.* FROM `users` WHERE ORDER BY IF(users.flag = true, users.date_a, users.date_b) ASC
```

### Và còn 1 ví dụ rất hay ho nữa của IF ELSE nữa nhé:

Chúng ta có 2 bảng sau:<br>
User:

| id | name |
| -------- | -------- |
| 1     | Thể     |
| 2    | Thảo     |
<br>
Payment:

| user_id | price | paid |
| -------- | -------- | -------- |
| 1     | 100     | true     |
| 1     | 50     | fasle     |
| 2     | 30     | true     |
| 2     | 70     | false    |

Và chúng ta phải hiển thị dạng bảng trên view như sau:

| Tên | Tổng tiền | Tiền đã thanh toán |
| -------- | -------- | -------- |
| Thể     | 150     | 100     |
| Thảo     | 100     | 30     |
<br>
Bình thường chúng ta sẽ dùng render collection từng row user đúng chứ, và từng user chúng ta lại viết 1 hàm để tình tổng tiền, và 1 hàm tính tổng tiền đã thanh toán để gọi ngoài view.<br>
Và kết quả là chắc chắn sẽ bị 2n+1 query (1 query tổng tiền, 1 query tổng tiền đã thanh toán của từng user).<br>

Một số bạn "chiếu cũ" từng trải sẽ nghĩ ra ngay là viết 1 scope khi để trên controller để giải quyết n+1 query cột "Tổng tiền" như sau:
```ruby
# user.rb
scope :with_total_price, (lambda do
    left_joins(:payments).select("users.*, SUM(payments.price) as total_price").group("users.id")
end)
```
Và gọi lại trên controller:
```ruby
@users = User.with_total_price
....
```
và ngoài view chúng ta chỉ cần gọi
```ruby
<% @users.each do |user| %> //Ví dụ mọi người thích dùng each hơn dùng collection :D 
...
  <%= user.total_price %>
...
```
là đã giải quyết được cột "tổng tiền" không bị query lại rồi.<br>

Thế còn tiền "Tiền đã thanh toán" thì sao ?, khoai phết vì nó còn phải có trường paid = true nữa. Chẳng nhẽ lại phải viết scope khác để thêm where paid = true, rồi join lại với User à ? Thế dở hơi quá! Mà có được không nhỉ ?<br>

Chúng ta sẽ sử dụng IF ELSE luôn trong scope vừa nãy: 

```ruby
# user.rb
scope :with_total_price, (lambda do
    left_joins(:payments).select("users.*, SUM(payments.price) as total_price, SUM(IF(payments.paid = true, payments.price, 0)) as total_paid_price").group("users.id")
end)
```
Chỗ `SUM(IF(payments.paid = true, payments.price, 0)` các bạn hiểu nôm na là nếu paid = true thì sẽ lấy payments.price để cộng vào tổng total_paid_price của user đó, còn nếu paid = false thì cộng 0.

và ngoài view gọi
```ruby
<% @users.each do |user| %> //Ví dụ mọi người thích dùng each hơn dùng collection :D 
...
  <%= user.total_price %>
  <%= user.total_paid_price %>
...
// total_price, total_paid_price không phải là 1 trường hay 1 hàm của bảng user chỉ là chúng ta đã đặt tên sau "as" khi select là có thể gọi thoải mái nhé
```
Vậy là giải quyết được tất cả n + 1 query

### Kết luận
Qua bài viết mình chỉ muốn chỉ cho các bạn là mysql có IF ELSE, CASE WHEN đấy nhé!

### Tài liệu tham khảo
https://www.mysqltutorial.org/mysql-if-statement/