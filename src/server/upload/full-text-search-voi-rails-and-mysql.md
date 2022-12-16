# Introduction
Full-text search hoặc FTS là kỹ thuật được dùng trong các search engines để tìm kiếm một cách hiệu quả và chính xác.

FTS tìm kiếm documents bằng không cần match chính xác với từ khóa tìm kiếm.ví dụ khi bạn tìm kiếm bằng "cats and dogs", FTS sẽ trả về những kết quả mà chỉ có từ "cats" hoặc "dogs".

# Implementation
### Tạo table migration

tạo migration như bình thường. Sau đó tạo index dạng `:fulltext` cho những trường mình cần.
ví dụ dưới đây mình sẽ tạo migration cho Product.

```ruby
rails generate migration create_products
```

```ruby

class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.float :price, default: 0
      t.integer :quantity

      t.timestamps
    end
    
    # fulltext cho trường name và description
    add_index :products, [:name, :description], name: "name_description", type: :fulltext 
  end
end
```

run `rake db:migrate`

OK! Bây giờ bạn đã có table products chứa name và description là `:fulltext`.

### Using FTS Functions
Trong MySQL, để thực hiện tìm kiếm FTS, bạn sử dụng hàm:
`MATCH() AGAINST()`
```ruby
Product.where("MATCH (name) AGAINST ('Rubber shoes')")
```
Kết quả trả về:
```
name
--------------------------
 Fantastic Rubber Shoes
 Intelligent Rubber Bench
 Fantastic Paper Shoes
 Aerodynamic Copper Shoes
 Lightweight Rubber Chair
 Incredible Rubber Computer
 Enormous Concrete Shoes
```
Bạn đã thấy rõ là những name nào có chứa rubber hoặc shoes đều trả về trong kết quả tìm kiếm.


**Sử dụng Relevance Score**

Relevance Score là điểm để quyết định độ match của result với từ khóa seach. Relevance Score càng lớn độ match càng chính xác. Bạn có thể select để xem Relevance Score này và có thể chọn những Relevance Score bao nhiều trở lên mới cho hiển thị. 

`Product.select("MATCH (name) AGAINST ('Rubber shoes') as score").map(&:score)`

```
+----+----------------------+
| id | score                |
+----+----------------------+
|  1 | 0.031008131802082062 |
|  2 |  0.25865283608436584 |
|  3 |  0                   |
|  ..|  ...                 |
+----+----------------------+
```

Bạn thấy Relevance Score như trên. Từ đó bạn có thể filter theo điều kiện của score này để độ match càng chính xác.
```
Product.where("MATCH (name) AGAINST ('Rubber shoes') > 0")
```

Query trên sẽ thực hiện công việc sau:
+ Thực hiện FTS theo từ khóa "Rubber shoes"
+ Filter những result có score > 0
+ ORDER BY score DESC

# Conclusion
Trong bài này mình đã hướng dẫn về cơ bản để áp dụng FTS trong MySQL với rails. Ngoài ra, có nhiều features/options nữa bạn có thể tìm hiểu thêm sau đây:

https://dev.mysql.com/doc/refman/5.5/en/fulltext-search.html

https://www.digitalocean.com/community/tutorials/how-to-improve-database-searches-with-full-text-search-in-mysql-5-6-on-ubuntu-16-04