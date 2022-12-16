Cùng nhau tìm hiểu về các phương thức cập nhật bản ghi thông dụng trong Rails
## 1. update
### a) update(attribute_name: value)
- Là một instance method
- Cập nhật một hoặc nhiều thuộc tính của bản ghi
- Có kiểm tra validations, chạy callbacks
- Trả về True/False
- Trường `updated_at` được cập nhật nếu thành công
- `update!` raise exception nếu có lỗi xảy ra
```
user = User.find_by id: 1
user.update name: "Hanh", email: "hanh@gmail.com"
```
### b) update(id, attributes)
- Là một class method
- Cập nhật thuộc tính của bản ghi với id truyền vào, có thể cập nhật nhiều bản ghi cùng lúc
- Validations, callbacks được gọi khi cập nhật
- Trả về bản ghi đó dù cập nhật thành công hay không
- Trường `updated_at` được cập nhật nếu thành công
```
# Cập nhật một bản ghi
User.update(1, name: "Hanh", email: "hanh@gmail.com")
# Cập nhật nhiều bản ghi
User.update([1,2], [{name: "Hanh", email: "hanh@gmail.com"}, {name: "Huong", email: "huong@gmail.com"}])
```
## 2. update_attribute(attribute_name, value)
- Chỉ cập nhật một thuộc tính của bản ghi
- Bỏ qua validations, vẫn chạy callbacks
- Trả về True/False
- Trường `updated_at` được cập nhật
```
user = User.find_by id: 1
user.update_attribute :name, "Hanh"
```
## 3. update_attributes(attribute_name: value)
- Giống với `update(attribute_name: value)` ở mục 1.a phía trên
- `update_attributes!` raise exception nếu cập nhật không thành công
## 4. update_column(attribute_name, value)
- Cập nhật trực tiếp một thuộc tính trong cơ sở dữ liệu
- Validations, callbacks đều bị bỏ qua khi cập nhật
- Trả về True/False
- Trường `updated_at` không được cập nhật
```
user = User.find_by id: 1
user.update_column :name, "Hanh"
```
## 5. update_columns(attribute_name: value)
- Cập nhật trực tiếp một hoặc nhiều thuộc tính trong cơ sở dữ liệu
- Bỏ qua cả validations và callbacks
- Trả về True/False
- Trường `updated_at` không được cập nhật
```
user = User.find_by id: 1
user.update_columns name: "Hanh", email: "hanh@gmail.com"
```
## Tổng kết

| Method | Validations | Callbacks | Cập nhật `updated_at` | Cập nhật nhiều thuộc tính | Method với `!` | Trả về
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| update(attr_name: value)     | có     | có     | có     | có     | có     | T/F     |
| update(id, attributes)     | có     | có     | có     | có (Có thể cập nhật nhiều  bản ghi)     | không     | bản ghi     |
| update_attribute(attr_name, value)     | không     | có     | có     | không     | không     | T/F     |
| update_attributes(attr_name: value)     | có     | có     | có     | có     | có     | T/F     |
| update_column(attr_name, value)     | không     | không     | không     | không     | không     | T/F     |
| update_columns(attr_name: value)     | không     | không     | không     | có     | không     | T/F     |