### **I. Tạo trường dữ liệu kiểu array**

**1. Tạo trực tiếp trong PostgreSQL:**

```
CREATE TABLE arrays_example(
               name   text,
               values integer[]
           );
```

Bằng cách thêm `[]` vào sau kiểu dữ liệu mong muốn, ta có thể tạo được trường dữ liệu là 1 mảng của kiểu dữ liệu mong muốn.

**2. Tạo bằng rails migration:**

- B1: Tạo một bảng với trường dữ liệu thông thường

```
rails g migration add_subjects_to_book subjects:text
```

- B2: Thêm thuộc tính `array:true` vào file `migration`

```
class AddSubjectsToBook < ActiveRecord::Migration
  def change
    add_column :books, :subjects, :text, array:true, default: []
  end
end
```

### **II. Thêm dữ liệu kiểu array**

**1. Thêm trực tiếp trong PostgreSQL:**

Đơn giản ta chỉ cần thêm data vào trường kiểu array giá trị dạng `'{...}'` như sau:

```
INSERT INTO arrays_example VALUES('numbers', '{1, 2, 3}');
```

**2. Thêm bằng rails:**

- Đầu tiên là khởi tạo một object:

```
b = Book.create
```

- Tiếp theo, push một mảng giá trị vào trường cần thêm data, sử dụng như một mảng thông thường:

```
b.subjects << 'education'
```

- Hoặc 

```
b.subjects.push 'business'
```

- Hoặc

```
b.subjects += ['history']
```

- Cuối cùng chỉ cần save object:

```
b.save!
```

### **III. Truy xuất data kiểu array**

**1. Truy xuất các bản ghi có data chứa một giá trị đã biết:**

- Ta sử dụng `"ANY"` để truy xuất các bản ghi có chứa một giá trị truyền vào theo cú pháp:

```
Book.where("'history' = ANY (subjects)")
```

- Hoặc:

```
Book.where("? = ANY (subjects)", "history")
```

**2. Truy xuất các bản ghi có data chứa một hoặc nhiều giá trị đã biết:**

- Ta sử dụng `"@>"` để truy xuất các bản ghi có chứa các giá trị truyền vào theo cú pháp:

```
Book.where("subjects @> '{history,education}''")
```

- Hoặc:

```
Book.where("subjects @> ?", '{history,education}')
```

- Hoặc:

```
Book.where("subjects @> ARRAY[?]", ["history", "education"])
```

### **IV. Kết luận**

Trên đây là giới thiệu sơ lược về cách sử dụng data kiểu Array trong Rails với PostgreSQL. Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về kiểu Array trong Rails với PostgreSQL.

## **Cảm ơn đã theo dõi**