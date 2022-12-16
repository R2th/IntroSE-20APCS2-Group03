Từ bài trước chúng ta đã cùng nhau đi tìm hiểu về ActiveRecord ORM là gì,  công cụ và tác dụng của chúng ra sao, ưu và nhược điểm của chúng như thế nào, thì hôm nay chúng ta sẽ cùng nhau đi tìm hiểu về 1 vấn đề cũng liên quan, và rất quan trọng  đến ActiveRecord đó là các phương thức của nó,  nếu như bạn nào đang đọc bài này mà chưa đọc qua bài về ActiveRecord thì mình khuyên các bạn hãy đọc bài đó trước khi đọc bài này nhé !  https://viblo.asia/p/khai-niem-co-ban-khong-the-khong-biet-ve-active-record-active-record-basic-maGK7qpelj2.

Như các bạn đã biết việc lấy dữ liệu bằng My Sql từ một hay yêu cầu từ nhiều bảng đã quá quen thuộc với devoloper . Dẫu rằng mỗi một người phát triển ứng dụng của mình đều trên 1 framework nhất định, thì mỗi 1 framework đều cung cấp nhưng method query ngắn ngọn, tiện lợi để thực hiện, nhưng trong Rails cũng vậy có rất nhiều method để giúp chúng ta giải quyết vấn đề nhanh hơn , gọn gàng hơn đi cùng nhưng cái tốt thì cũng không thể kể tới nhưng ngược điểm đi cùng, phải biết sử dụng đúng cách , đúng chỗ phù hợp cho từng mục đích khác nhau , bài toán khác nhau .


![](https://images.viblo.asia/1b0eb4ca-8151-4180-948e-f3e8acca07f0.png)

Đầu tiên chúng ta cùng đi tìm hiểu:
## Distinct

![](https://images.viblo.asia/d186e013-056e-4294-9b12-787f133a56f5.png)

* giả sử bạn có 1 mảng gồm các phần tử sau :

     `users = [{id: 1, role: "admin"}, {id: 2, role: "admin"}, {id: 3, role: "reader"}, {id: 4, role: "reader"}, {id: 5, role:   "reader"}]`
   
   chúng ta có 5 phần tử trong mảng và bây giờ bài toán là chúng ta chỉ muốn lấy ra các phần tử `role` là  duy nhất trong mảng khi đó `uniq`  là 1 lựa chọn đúg đắn
   
   `users = [{id: 1, role: "admin"}, {id: 2, role: "admin"}, {id: 3, role: "reader"}, {id: 4, role: "reader"}, {id: 5, role:   "reader"}].plcuk(:role).uniq`

   kết quả là: `["admin", "reader"]`
     
   =>  vậy thì nếu là `distinct` thì sao ? ` undefined method distinct' for #<Array:0x0000558ff8f82e50>`
   
 >bởi vì `uniq` có thể lọc ở dạng mảng còn `distinct` thì không, do bản thân  nó là `query method`
 >1 chút ý nho nhỏ đó là ở Rails 5+ `Relation#uniq` sẽ không được hỗ trợ nữa mà thay vào đó sẽ là `Relation#distinct`, nếu bạn `joins` qua bảng để lấy ra bản ghi k bị trùng lặp thì hãy dùng `distinct` nhé !

-----

## extract_associated
( Relation#extract_associated)

nếu chúng ta muốn `trích xuất các record từ một ActiveRecord::Relation`, chúng ta sử dụng `preload và collect`

Ví dụ, chúng ta muốn lấy ra thông báo của vài users. Câu truy vấn sẽ như sau:

Rails 5.2
```ruby
> User.where(gender: "male").preload(:notifications).collect(&:notifications)
User Load (1.3ms)  SELECT `users`.* FROM `users` WHERE `users`.`gender` = 0
UserNotification Load (1.4ms)  SELECT `user_notifications`.* FROM `user_notifications` WHERE `user_notifications`.`user_id` IN (1, 2, 4)
Notification Load (1.1ms)  SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`id` IN (1, 2, 3)
```

Đối với Rails 6.

`#extract_associated` được giới thiệu như một cách viết ngắn gọn cho preload và collect.

Chúng ta thay câu truy vấn ở trên như sau:

```ruby
User.where(gender: "male").extract_associated(:notifications)
```


-----


## Joins

![](https://images.viblo.asia/b478984c-98ff-4363-900f-e46d57c74456.png)

Khi nào và trường hợp nào chúng ta sử dụng đến nó ???

* Nếu trong bài toán của bạn chỉ muốn dùng bảng liên kết để lọc dữ liệu, không lấy dữ liệu thì `joins` là sự lựa chọn số 1. Chúng ta có 1 ví dụ nhỏ như sau :

`Post.joins(:comments).where(:comments => {author: 'Dutavi'}).map { |post| post.title }
  Post Load (1.2ms)  SELECT  "posts".* FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" WHERE "comments"."author" = $1
=> ["One weird trick to better Rails apps",
 "1,234 weird tricks to faster Rails apps",
 "You wouldn't believe what happened to this Rails developer after 14 days"]`

như ví dụ trên ra chỉ lấy các bài post có comment được viết bở Dutavi. Ta không lấy dữ liệu comment, vậy nên joins là hợp ly

đặc điểm:
 
 * Chỉ sinh ra 1 câu query duy nhất
 * Joins sẽ sinh ra những bản ghi giống nhau bị lặp lại
 * joins sử dụng `INNER JOIN` và khác với eager_load nó  sử dụng `LEFT OUTER JOIN` 

ngược điểm:

* có thể sẽ gây ra N+1

> vì nó không tải dữ liệu vào bộ nhớ nên từ việc lấy dữ liệu từ các bảng liên quan có thể gây ra N+1



-----



## Preload

* preload() sẽ load cả những bảng quan hệ ra bộ nhớ, và câu lệnh SQL thực hiện tối đa chỉ là 2 thay vì nhiều câu lệnh như joins phía trên
* luôn sinh ra 2 câu lệnh riêng rẽ để load data, 1 câu query cho asicuation, và 1 câu để load dữ liệu, tuy nhiên `perload` sẽ raise lên exception nếu chúng ta làm thêm các điều kiện liên quan đến data assciation.

VD: 
`SELECT "posts".* FROM "posts"  ORDER BY "posts"."created_at" DESC
SELECT "authors".* FROM "authors" WHERE "authors"."id" IN (3, 2, 1)`



## includes 

![](https://images.viblo.asia/5ef25ad0-e2d8-46f8-96b2-b4b6b968b8b7.jpg)

* dùng để loading associations
* cho phép chúng ta thực hiện eager loading , các data cần sử dụng sẽ được pre-cached bởi vì thế khi chúng ta sử dụng kết quả có tính chất lặp, rút gọn số câu truy vấn xuống.
* với việc so sánh với preload thì includes thông minh hơn nhiều 

` @companies = Company.includes(:person).where(:person => { active: true } ).all`

```ruby 
@companies.each do |company|
     company.person.name
  end
```

ta có đoạn code mẫu sau: 
các bạn có đánh giá sao về vòng lặp này , nếu chúng ta k dùng `includes` ở đây thì mỗi lần `.person` thì lại thực hiện 1 câu truy vấn xuống DB, trường hợp bạn có 1000 cái `companies` thì sao ??? nó sẽ gọi 1000 lần phải không ? điều này làm giảm performance của hệ thống,
bản chất chính của `includes` là :

> đảm bảo tất cả các liên kết đã được load bằng cách sử dụng lượng truy vấn tối thiết nhất có thể.


-----


### kết thúc:
vậy với những gì chúng ta đã tìm hiểu ở bên trên , có thể giúp các bạn 1 phần nào giải quyết bài toán của mình và hiểu rõ hơn về cách thức hoạt động và bản chất của chúng thế nào , ta có thể thấy được để tăng hiệu suất và giải quyết vấn đề N+1 Rails đã cung cấp cho chúng ta các phương thức này , hơn nữa giúp cho chúng ta 1 số cách load data association khi làm việc với ActiveRecord. Còn nữa trước khi áp dụng các phương thức này vào vấn đề của mình thì hãy phân tích lựa chọn 1 method phù hợp để giải quyết bài toán, tránh trường hợp dùng tràn lan mà không hay biết tại sao dùng cái này ở đây mà không phải cái kia, để tối ưu hệ thống của mình thì đừng bỏ lỡ các kiến thức này nhé !