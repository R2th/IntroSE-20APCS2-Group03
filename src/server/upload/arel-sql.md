## Giới thiệu
Arel Sql là một sự trừu tượng hóa SQL và ActiveRecord sử dụng để build các query SQL, có thể trừu tượng hóa các phân đoạn của một câu truy vấn SQL bằng các phương thức Ruby, có thể tái sử dụng, giúp đơn giản hóa những câu truy vấn phức tạp, khó đọc hoặc khó suy luận. <br>
### Cơ bản về Arel
Mỗi model ActiveRecord đều có arel_table, để có thể get Arel::Table có 2 cách:
```
my_table = Address.arel_table
```
or
```
my_table = Arel::Table.new(:addresses) # Not recommended usage in Rails 5.0/Arel 7.1
```
VD: 
```
Address.where(my_table[:id].eq(1))
# SELECT "addresses".* FROM "addresses"  WHERE "addresses"."id" = 1

Address.where(id: 1)
# SELECT "addresses".* FROM "addresses"  WHERE "addresses"."id" = 1

Address.where(my_table[:id].in([1,2,3]))
# SELECT "addresses".* FROM "addresses"  WHERE "addresses"."id" IN (1, 2, 3)

Address.where(id: [1,2,3])
# SELECT "addresses".* FROM "addresses"  WHERE "addresses"."id" IN (1, 2, 3)
```

**Bạn có thể xem list of prodications bằng cách:**
```
Arel::Predications.instance_methods

[:in, :matches, :eq, :lt, :not_eq, :not_eq_any, :not_eq_all, :eq_any,
:eq_all, :in_any, :in_all, :not_in, :not_in_any, :not_in_all, :matches_any
:matches_all, :does_not_match, :does_not_match_any, :does_not_match_all,
:gteq, :gteq_any, :gteq_all, :gt, :gt_any, :gt_all, :lt_any, :lt_all, :lteq,
:lteq_any, :lteq_all, :eql_any]
```

VD:
```
veg = Arel::Table.new(:vegetables)
query = veg[:created_at].gteq( 5.days.ago ).and(
  veg[:color].eq("green").or(
    veg[:gardener].eq("Susan")
  )
)
query.to_sql
#  "vegetables"."created_at" >= '2016-12-13 03:54:28.575342'
#    AND ("vegetables"."color" = 'green' OR "vegetables"."gardener" = 'Susan')
Vegetable.where( query )
```
**Để có thể xâu chuỗi nhiều câu truy vấn lại với nhau, bạn có thể sử dụng các phương thức từ Arel::Nodes::Node**
```
Arel::Nodes::Node.instance_methods - Enumerable.instance_methods - Object.methods
# => [:each, :to_sql, :not, :or, :and, :lower, :create_true, :create_false,
# ...
```

Trong đó có **not**, **or** và **and** là được sử dụng nhiều nhất
```
veg = Arel::Table.new(:vegetables)
query = veg[:created_at].gteq( 5.days.ago )
                        .and(veg[:color].eq("green")
                        .or(veg[:gardener].eq("Susan")))
query.to_sql

#  "vegetables"."created_at" >= '2016-12-13 03:54:28.575342'
#    AND ("vegetables"."color" = 'green' OR "vegetables"."gardener" = 'Susan')
Vegetable.where( query )
```

**Còn một số phướng thức khác thuộc Arel::SelectManager**
```
Arel::SelectManager.instance_methods - Object.methods
# => [:take, :join, :union, :source, :offset, :skip, :group, :lock, :from, :limit,
#     :on, :with, :order, :locked, :exists, :except, :orders, :froms, :distinct, :as,
#     :outer_join, :project, :having, :projections, :projections=, :limit=, :offset=,
# ...
```
VD: <br>
Joins:
```
User.joins(:photos).on(users[:id].eq(photos[:user_id]))
# => SELECT * FROM users INNER JOIN photos ON users.id = photos.user_id
```

left_joins: <br>
```
User.join(photos, Arel::Nodes::OuterJoin).on(users[:id].eq(photos[:user_id]))
# => SELECT FROM users LEFT OUTER JOIN photos ON users.id = photos.user_id
```

### Kết luận: <br>
Trên là giới thiệu cơ bản của mình về Arel SQL, Arel là một AST tuyệt vời để giúp bạn nhanh chóng xây dựng ngay cả những câu query phức tạp nhất.
https://www.cloudbees.com/blog/creating-advanced-active-record-db-queries-arel<br>
https://jpospisil.com/2014/06/16/the-definitive-guide-to-arel-the-sql-manager-for-ruby.html <br>