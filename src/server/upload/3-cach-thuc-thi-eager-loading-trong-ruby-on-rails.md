Bạn có thể quen với phương thức `#includes` để tải từ cơ sở dữ liệu nếu bạn đang sử dụng rails và ActiveRecord. Nhưng bạn có biết tại sao khi nhận được vài truy vấn SQL nhỏ và đẹp, đôi khi lại nhận được được 1 truy vấn khổng lồ với nhiều bảng và cột thay đổi. Và bạn biết `#preload` và `#eager_load` có thể giúp bạn đạt được mục tiêu tương tự? Bạn có biết những gì thay đổi trong rails 4 về vấn đề đó không? Nếu không, hãy ngồi xuống và lắng nghe. Bài học này sẽ không mất nhiều thời gian và sẽ giúp bạn làm rõ một số khía cạnh về vài điều trong eager loading mà bạn có thể chưa biết.

Hãy bắt đầu tạo class ActiveRecord của chúng ta và định nghĩa quan hệ mà chúng ta sử dụng trong toàn bộ bài viết:

```
class User < ActiveRecord::Base
  has_many :addresses
end

class Address < ActiveRecord::Base
  belongs_to :user
end
```

Và sau đây sẽ là dữ liệu seed sẽ giúp chúng ta kiểm tra kết quả truy vấn của mình:
```
rob = User.create!(name: "Robert Pankowecki", email: "robert@example.org")
bob = User.create!(name: "Bob Doe", email: "bob@example.org")

rob.addresses.create!(country: "Poland", city: "Wrocław", postal_code: "55-555", street: "Rynek")
rob.addresses.create!(country: "France", city: "Paris", postal_code: "75008", street: "8 rue Chambiges")
bob.addresses.create!(country: "Germany", city: "Berlin", postal_code: "10551", street: "Tiergarten")
```

## **Rails 3**
Thông thường, khi bạn muốn sử dụng tính năng eager loading, bạn nên sử dụng phương thức `#includes`, rails khuyến khích bạn dùng từ phiên bản rails 2.0 hoặc có thể từ rails 1.0. Và nó hoạt động với 2 câu truy vấn:
```
User.includes(:addresses)
#  SELECT "users".* FROM "users"
#  SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)
```
Vậy 2 phương pháp khác nhau chỗ nào? Trước tiên, hãy xem chúng hoạt động:
```
User.preload(:addresses)
#  SELECT "users".* FROM "users"
#  SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)
```

Rõ ràng `#preload` hoạt động giống như `#includes`. Còn có cách nào khác không ? Và đối với `#eager_load`:
```
User.eager_load(:addresses)
#  SELECT
#  "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
#  "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
#  FROM "users"
#  LEFT OUTER JOIN "addresses" ON "addresses"."user_id" = "users"."id"
```

Đó là 1 điều hoàn toàn khác, phải không ? Toàn bộ bí mật ở đây là rails có 2 cách để tải dữ liệu. Một là sử dụng các truy vấn riêng biệt để có được dữ liệu bổ sung. Và một là sử dụng truy vấn với left join để có được tất cả dữ liệu ta cần.
Nếu bạn sử dụng `#preload`, nó có nghĩa là bạn muốn chia ra truy vấn riêng biệt. Nếu bạn sử dụng `#eager_load` bạn đang sử dụng 1 truy vấn duy nhất. Vậy `#includes` được sử dụng cho trường hợp nào?  Nó dựa trên điều kiện truy vấn. Hãy xem ví dụ trong đó `#includes` ủy quyền cho `#eager_load` để nó chỉ có 1 truy vấn lớn:
```
User.includes(:addresses).where("addresses.country = ?", "Poland")
User.eager_load(:addresses).where("addresses.country = ?", "Poland")
# SELECT
# "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
# "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
# FROM "users"
# LEFT OUTER JOIN "addresses"
# ON "addresses"."user_id" = "users"."id"
# WHERE (addresses.country = 'Poland')
```

Trong ví dụ đó, rails đã phát hiện ra điều kiện trong mệnh đề where sử dụng các cột từ tên các bảng được tải sẵn. Vì vậy `#includes` ủy nhiệm công việc cho `eager_load`. Bạn luôn có thể đạt được kết quả tương tự bằng cách sử dụng phương thức `eager_load` trực tiếp.
Điều gì sẽ ra nếu bạn thử thay thế sử dụng `#preload` 1 cách rõ ràng?
```
User.preload(:addresses).where("addresses.country = ?", "Poland")
#  SELECT "users".* FROM "users" WHERE (addresses.country = 'Poland')
#
#  SQLite3::SQLException: no such column: addresses.country
```

Chúng ta nhận được ngoại lệ vì chúng ta chưa nối bảng `users` với bảng `addresses` bằng 1 cách nào đó. 

## **Mục đích này có được tiết lộ?**
Nếu bạn nhìn vào ví dụ của chúng ta 1 lần nữa:
```
User.includes(:addresses).where("addresses.country = ?", "Poland")
```

Bạn có thể sẽ thắc mắc, mục đích chính ban đầu của đoạn mã này là gì ? Ý muốn của tác giả là gì ? Chúng ta đang cố gắng đạt được điều gì ở đây với mã rails đơn giản đó:
1. Cung cấp cho tôi người dùng với địa chỉ đánh bóng và chỉ tải trước địa chỉ đánh bóng
2. Cung cấp cho tôi người dùng với địa chỉ đánh bóng và tải tất cả các địa chỉ của họ
3. Cung cấp cho tôi tất cả người dùng và địa chỉ đánh bóng của họ
Bạn có biết chúng ta đạt được mục tiêu nào không ? Cái đầu tiên. Hãy xem chúng ta có thể đạt được điều thứ 2 và thứ 3 không nhé.

## **`#preload` có tốt không ?**
Mục tiêu hiện tại của chúng ta: 
1. Đưa cho tôi người dùng với địa chỉ đánh bóng nhưng tải trước tất cả các địa chỉ của họ. 
2. Tôi cần phải biết được tất cả địa chỉ của những người có ít nhất 1 địa chỉ ở Ba Lan.
Chúng ta biết rằng chúng ta chỉ cần người dùng có địa chỉ đánh bóng. 
Điều đó thật dễ dàng: `User.joins(addresses).where("addresses.country = ?", "Poland")` và chúng ta biết rằng chúng ta muốn tải tất cả các địa chỉ mong muốn vì vậy chúng ta cần `includes(:addresses)` phải không ?
```
r = User.joins(:addresses).where("addresses.country = ?", "Poland").includes(:addresses)

r[0]
#=> #<User id: 1, name: "Robert Pankowecki", email: "robert@example.org", created_at: "2013-12-08 11:26:24", updated_at: "2013-12-08 11:26:24">

r[0].addresses
# [
#   #<Address id: 1, user_id: 1, country: "Poland", street: "Rynek", postal_code: "55-555", city: "Wrocław", created_at: "2013-12-08 11:26:50", updated_at: "2013-12-08 11:26:50">
# ]
```
Vâng, điều đó không hoạt động chính xác như những gì chúng ta mong muốn. Chúng ta đang thiếu địa chỉ thứ 2 của người dùng mà dự kiến có trong thời gian này. Rails vẫn phát hiện ra rằng chúng ta đang sử dụng bảng được bao gồm ở trong câu lệnh where và sử dụng `#eager_load` được thêm vào ở dưới. Sự khác biệt duy nhất so với ví dụ trước đó là Rails đã sử dụng `INNER JOIN` thay vì `LEFT JOIN`, nhưng đối với truy vấn đó, nó thậm chí lại không tạo ra 1 sự khác biệt nào:
```
SELECT
"users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
"addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
FROM "users"
INNER JOIN "addresses"
ON "addresses"."user_id" = "users"."id"
WHERE (addresses.country = 'Poland')
```
Đây là loại tình huống mà bạn có thể được nhận biết rõ ràng về những gì bạn muốn đạt được bằng cách gọi trực tiếp `#preload` thay vì `#includes`.
```
r = User.joins(:addresses).where("addresses.country = ?", "Poland").preload(:addresses)
# SELECT "users".* FROM "users"
# INNER JOIN "addresses" ON "addresses"."user_id" = "users"."id"
# WHERE (addresses.country = 'Poland')

# SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1)

r[0]
# [#<User id: 1, name: "Robert Pankowecki", email: "robert@example.org", created_at: "2013-12-08 11:26:24", updated_at: "2013-12-08 11:26:24">]

r[0].addresses
# [
#  <Address id: 1, user_id: 1, country: "Poland", street: "Rynek", postal_code: "55-555", city: "Wrocław", created_at: "2013-12-08 11:26:50", updated_at: "2013-12-08 11:26:50">,
#  <Address id: 3, user_id: 1, country: "France", street: "8 rue Chambiges", postal_code: "75008", city: "Paris", created_at: "2013-12-08 11:36:30", updated_at: "2013-12-08 11:36:30">]
# ]
```

Đây chính xác là điều mà chúng ta mong muốn đạt được. Nhờ sử dụng `#preload`, chúng ta không còn lẫn lộn người dùng nào mà chúng ta muốn kết hợp với dữ liệu nào mà chúng ta muốn tải trước chúng. Và các truy vấn đã đơn giản lại đơn giản hơn 1 lần nữa.

## **Tải trước tập con của quan hệ**
Mục tiêu của ví dụ tiếp theo là: đưa cho tôi tất cả các người dùng và địa chỉ đánh bóng của họ.
Thành thật mà nói, tôi không bao giờ thích tải trước chỉ 1 tập con của quan hệ vì 1 phần ứng dụng của bạn có thể giả định rằng nó được tải đầy đủ. Nó chỉ có ý nghĩa nếu bạn nhận được dữ liệu để hiển thị nó.
Tôi thực sự muốn thêm điều kiện vào chính liên kết:
```
class User < ActiveRecord::Base
  has_many :addresses
  has_many :polish_addresses, conditions: {country: "Poland"}, class_name: "Address"
end
```
Và chỉ cần tải trước nó rõ ràng bằng cách sử dụng:
```
r = User.preload(:polish_addresses)

# SELECT "users".* FROM "users"
# SELECT "addresses".* FROM "addresses" WHERE "addresses"."country" = 'Poland' AND "addresses"."user_id" IN (1, 2)

r

# [
#   <User id: 1, name: "Robert Pankowecki", email: "robert@example.org", created_at: "2013-12-08 11:26:24", updated_at: "2013-12-08 11:26:24">
#   <User id: 2, name: "Bob Doe", email: "bob@example.org", created_at: "2013-12-08 11:26:25", updated_at: "2013-12-08 11:26:25">
# ]

r[0].polish_addresses

# [
#   #<Address id: 1, user_id: 1, country: "Poland", street: "Rynek", postal_code: "55-555", city: "Wrocław", created_at: "2013-12-08 11:26:50", updated_at: "2013-12-08 11:26:50">
# ]

r[1].polish_addresses
# []
```

hay cách khác:
```
r = User.eager_load(:polish_addresses)

# SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
#        "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
# FROM "users"
# LEFT OUTER JOIN "addresses"
# ON "addresses"."user_id" = "users"."id" AND "addresses"."country" = 'Poland'

r
# [
#   #<User id: 1, name: "Robert Pankowecki", email: "robert@example.org", created_at: "2013-12-08 11:26:24", updated_at: "2013-12-08 11:26:24">,
#   #<User id: 2, name: "Bob Doe", email: "bob@example.org", created_at: "2013-12-08 11:26:25", updated_at: "2013-12-08 11:26:25">
# ]

r[0].polish_addresses
# [
#   #<Address id: 1, user_id: 1, country: "Poland", street: "Rynek", postal_code: "55-555", city: "Wrocław", created_at: "2013-12-08 11:26:50", updated_at: "2013-12-08 11:26:50">
# ]

r[1].polish_addresses
# []
```

Chúng ta nên làm gì khi chúng ta chỉ biết thời gian chạy của các điều kiện liên kết mà chúng ta muốn áp dụng ? Thành thật tôi không biết. Xin vui lòng cho tôi biết nếu các bạn có ý kiến về nó:

## **Câu hỏi cuối cùng**
Bạn có thể hỏi: công cụ này khó như thế nào? Tôi không chắc chắn nhưng tôi nghĩ rằng hầu hết các ORM được xây dựng để giúp bạn truy vấn đơn giản và tải dữ liệu từ 1 bảng. Với eager loading vấn đề phức tạp hơn và chúng ta muốn tải nhiều dữ liệu từ nhiều bảng với nhiều điều kiện. Trong Rails, chúng ta đã sử dụng chuỗi API để xây dựng 2 hay nhiều hơn truy vấn (trong trường hợp sử dụng `#preload`).
Tôi sẽ yêu thích loại API nào? Tôi đang nghĩ về 1 cái gì đó như:
```
User.joins(:addresses).where("addresses.country = ?", "Poland").preload do |users|
  users.preload(:addresses).where("addresses.country = ?", "Germany")
  users.preload(:lists) do |lists|
    lists.preload(:tasks).where("tasks.state = ?", "unfinished")
  end
end
```

Tôi hi vọng bạn có được ý tưởng.

## **Sự thay đổi của Rails 4 & 5**
Hãy nói về những thay đổi của Rails 4
```
class User < ActiveRecord::Base
  has_many :addresses
  has_many :polish_addresses, -> {where(country: "Poland")}, class_name: "Address"
end
```

Giờ đây Rails khuyến khích bạn dùng cú pháp lambda cho việc định nghĩa quan hệ. Điều này là rất tốt vì tôi đã nhiều thấy rất nhiều lần các lỗi ở các mệnh đề where được thông dịch chỉ 1 lần khi class đã được tải.
Nó là cùng 1 cách bạn được khuyến khích bạn dùng lambda hay phương thức để thể hiện các mệnh đề scope.
```
# Bad, Time.now would be always the time when the class was loaded
# You might not even spot the bug in development because classes are
# automatically reloaded for you after changes.
scope :from_the_past, where("happens_at <= ?", Time.now)

# OK
scope :from_the_past, -> { where("happens_at <= ?", Time.now) }

# OK
def self.from_the_past
  where("happens_at <= ?", Time.now)
end
```

Trong trường hợp của chúng ta, điều kiện `where(country: "Poland")` luôn giống nhau, không có vấn đề gì được diễn giải một cách linh hoạt hoặc 1 lần ngay từ đầu. Nhưng nó là tốt khi mà Rails đang cố gắng làm cho cú pháp mạch lạc trong cả 2 trường hợp (điều kiện và mệnh đề scope) và bảo về chúng tránh các lỗi như vậy.
Bây giờ chúng ta thay đổi cú pháp tại chỗ, chúng ta có thể kiểm tra cho bất kì sự khác biệt nào trong hành vi.
```
User.includes(:addresses)
#  SELECT "users".* FROM "users"
#  SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)

User.preload(:addresses)
#  SELECT "users".* FROM "users"
#  SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)

User.eager_load(:addresses)
#  SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
#         "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
#  FROM "users"
#  LEFT OUTER JOIN "addresses"
#  ON "addresses"."user_id" = "users"."id"
```

Vâng, điều này trông có vẻ khá giống nhau. Không có gì đáng ngạc nhiên ở đây. hãy thêm điều kiện mà nó đã gây ra cho chúng ta rất nhiều rắc rối trước đây:
```
User.includes(:addresses).where("addresses.country = ?", "Poland")

# DEPRECATION WARNING: It looks like you are eager loading table(s)
# (one of: users, addresses) that are referenced in a string SQL
# snippet. For example:
#
#    Post.includes(:comments).where("comments.title = 'foo'")
#
# Currently, Active Record recognizes the table in the string, and knows
# to JOIN the comments table to the query, rather than loading comments
# in a separate query. However, doing this without writing a full-blown
# SQL parser is inherently flawed. Since we don't want to write an SQL
# parser, we are removing this functionality. From now on, you must explicitly
# tell Active Record when you are referencing a table from a string:
#
#   Post.includes(:comments).where("comments.title = 'foo'").references(:comments)
#
# If you don't rely on implicit join references you can disable the
# feature entirely by setting `config.active_record.disable_implicit_join_references = true`. (

# SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
#        "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7
# FROM "users"
# LEFT OUTER JOIN "addresses" ON "addresses"."user_id" = "users"."id"
# WHERE (addresses.country = 'Poland')
```

Tuyệt vời, bây giờ trông nó cực kì rườm rà. Tôi khuyên bạn nên đọc tất cả bởi vì nó giải thích khá cụ thể.
Mặt khác, bởi vì rails không muốn trở nên thông minh hơn nữa và theo dõi điều kiện của chúng ta để phát hiện ra đang sử dụng thuật toán nào, nó mong đợi sự giúp đỡ từ chúng ta. Chúng ta phải nói cho nó có điều kiện cho 1 trong các bảng. Như thế này:
```
User.includes(:addresses).where("addresses.country = ?", "Poland").references(:addresses)
```

Tôi đã tự hỏi điều gì sẽ xảy ra nếu chúng ta cố gắng tải trước nhiều bảng hơn nhưng chỉ tham chiếu đến 1 trong số chúng:
```
User.includes(:addresses, :places).where("addresses.country = ?", "Poland").references(:addresses)

#  SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4,
#         "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1, "addresses"."country" AS t1_r2, "addresses"."street" AS t1_r3, "addresses"."postal_code" AS t1_r4, "addresses"."city" AS t1_r5, "addresses"."created_at" AS t1_r6, "addresses"."updated_at" AS t1_r7,
#         "places"."id" AS t2_r0, "places"."user_id" AS t2_r1, "places"."name" AS t2_r2, "places"."created_at" AS t2_r3, "places"."updated_at" AS t2_r4
#  FROM "users"
#  LEFT OUTER JOIN "addresses" ON "addresses"."user_id" = "users"."id"
#  LEFT OUTER JOIN "places" ON "places"."user_id" = "users"."id"
#  WHERE (addresses.country = 'Poland')
```

Tôi tưởng tượng rằng các địa chỉ sẽ được tải bằng thuật toán `#eager_load` (bằng việc sử dụng LEFT JOIN) và các địa điểm sẽ được tải bằng thuật toán `#preload` (bằng cách thực hiện các truy vấn riêng biệt để lấy chúng) nhưng bạn có thể thấy điều đó không đúng. Có lẽ họ sẽ thay đổi phương thức trong tương lai.
Rails 4 không cảnh báo cho bạn sử dụng phương thức `#references` nếu bạn sử dụng `#eager_load` một cách rõ ràng để lấy dữ liệu và thực thi truy vấn giống hệt nhau:
```
User.eager_load(:addresses).where("addresses.country = ?", "Poland")
```

Mặt khác, 2 cách này giống nhau:
```
User.includes(:addresses).where("addresses.country = ?", "Poland").references(:addresses)
User.eager_load(:addresses).where("addresses.country = ?", "Poland")
```

Và nếu bạn đang cố gắng sử dụng `#preload`, bạn vẫn nhận được ngoại lệ tương tự:
```
User.preload(:addresses).where("addresses.country = ?", "Poland")
#  SELECT "users".* FROM "users" WHERE (addresses.country = 'Poland')
#
#  SQLite3::SQLException: no such column: addresses.country: SELECT "users".* FROM "users"  WHERE (addresses.country = 'Poland')
```

Nếu bạn đang cố gắng sử dụng các truy vấn khác mà tôi đang giới thiệu cho bạn, chúng vẫn hoặc động theo cách tương tự trong Rails 4:
```
# Give me users with polish addresses and preload all of their addresses
User.joins(:addresses).where("addresses.country = ?", "Poland").preload(:addresses)

#Give me all users and their polish addresses.
User.preload(:polish_addresses)
```

Cuối cùng trong Rails 4 đã có ít nhất 1 số tài liệu cho các phương thức, Rails 3 đã bị thiếu trong nhiều năm:

* `#includes`

* `#preload`

* `#eager_load`

## **Tổng kết**
Có 3 cách để thực hiện eager loading trong rails:
* `#includes`
* `#preload`
* `#eager_load`

`#includes` ủy nhiệm công việc cho `#preload` hay `#eager_load` tùy thuộc vào sự hiện diện hoặc vắng mặt của mệnh đề liên quan tới một trong các bảng được tải sẵn.

`#preload` đang sử dụng các truy vấn DB riêng biệt để lấy dữ liệu.

`#eager_load` đang sử dụng câu lệnh truy vấn lớn với LEFT JOIN cho mỗi bảng được tải sẵn.
Ở trong Rails 4 & 5 bạn nên sử dụng `#references` kết hợp với `#includes` nếu bạn có điều kiện bổ sung cho 1 trong các bảng được tải sẵn.
Bài viết được dịch tại: https://blog.arkency.com/2013/12/rails4-preloading/