Rails sử dụng orm ActiveRecord để truy cập đến database.Nhưng khác với các orm framework khác, vốn rất dễ trong việc sử dụng các query CRUD, orm trong rails rất linh động và có thể dễ dàng thay đổ để phù hợp với các yêu cầu đặc biệt. Sau đây là một số thủ thuật có thể sử dụng trong rails. Các ví dụ trong bài sử dụng rails cùng với mysql, có thể sẽ phải custom một chút với db khác.
## 1 Custom field

Với 1 table ví dụ như sau
```ruby
class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :name
      t.integer :age
      t.integer :gpa

      t.timestamps
    end
  end
end
```
Nếu muốn truy vấn student cùng với 1 trường phụ là `gpa_char` như A, B, C, D theo số điểm gpa. Với các orm framework khác ta phải tự tạo SQL và tự waping vào object và cũng mất đi 1 số tiện ích của framwork. Nhưng với rails chỉ cần đơn giản như sau:
1. tạo 1 attribute `gpa_char` vào model
```ruby
class Student < ApplicationRecord
  attribute :gpa_char
end
```
2.  Và query 
```ruby
sql = "(SELECT id, name, age, gpa, (CASE when gpa > 8 then 'A' else 'B' End) as gpa_char FROM `students`) AS students"
sql = Student.connection.unprepared_statement{sql}
Student.from(sql).first.gpa_char
```
## 2 Union

Đôi khi ta muốn select nhiều điều kiện thì việc viết 1 đống điều kiện dài ngoẵng vừa làm code khó đọc, khó bảo trì, đôi khi lại giảm performance của hệ thống, giải pháp đơn giản là sử dụng union.
Cách thức thực hiện đơn giản như sau:
1. Tạo ra các scope của từng điều kiện.
```ruby
scope :tren_18, ->{where("age > ?", 18)}
scope :duoi_18_gpa_tren_8, ->{where("age <= ? and gpa > ?", 18, 8)}
```
2. Scope union
```ruby
scope :combine, ->do
    tren_18 = Student.tren_18
    duoi_18_gpa_tren_8 = Student.duoi_18_gpa_tren_8
    join_string = "((#{tren_18.to_sql}) UNION (#{duoi_18_gpa_tren_8.to_sql})) AS students"
    sql = Student.connection.unprepared_statement{join_string}
    Student.from(sql)
  end
```

## 3 Skip validate

Validate là tính năng rất tiện dụng của rails, nhưng đôi khi ta muôn bỏ qua 1 số validate nhưng không bỏ qua tất cả. Đơn giản làm như sau:
Tạo ra 1 attribute cùng với validate như sau
```ruby
attr_accessor :skip_validate_name
validates(:name, presence: true, unless: :skip_validate_name)
```
Rồi sử dụng khi tạo Student
```ruby
:030 > Student.create!
   (0.1ms)  BEGIN
   (0.2ms)  ROLLBACK
ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
        from (irb):30
:031 > Student.create! validate_name: true
   (0.4ms)  BEGIN
  Student Create (0.6ms)  INSERT INTO `students` (`created_at`, `updated_at`) VALUES ('2019-02-21 12:40:11', '2019-02-21 12:40:11')
   (11.6ms)  COMMIT
 => #<Student id: 4, name: nil, age: nil, gpa: nil, created_at: "2019-02-21 12:40:11", updated_at: "2019-02-21 12:40:11"> 
2.4.5 :032 > 
```