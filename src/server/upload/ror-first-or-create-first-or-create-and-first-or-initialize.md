![](https://images.viblo.asia/31897ac3-c0f0-491d-9cea-2eaceaf0a0cc.jpg)
# 1. Giới thiệu bài toán:
- Khi lập trình chúng ta thường có nhu cầu kiểm tra 1 object đã tồn tại hay chưa, nếu chưa thì khởi tạo obejct đó với hàm `create` hoặc `new`.
- Chúng ta có thể giải quyết nó với hàm `exists?` như sau
    ```ruby
    exists = User.exists?(name: "LeTanThanh", email: "le.tan.thanh@framgia.com")
    user = User.new attributes unless exists
    user = User.create attributes unless exists
    ```
- Chúng ta có thể giải quyết bài toán trên 1 cách nhanh chóng và hiệu quả hơn với các hàm `first_or_create`, `first_or_create!` và `first_or_initialize`.

# 2. first_or_create:
- Hàm `first_or_create` sẽ thực hiện kiểm tra scope đang gọi hàm `first_or_create`, nếu scope trả về nil thì hàm `create` được gọi và trả về object mới được tạo đó, ngược lại nếu scope trả về 1 list object thì hàm `first` được gọi trả về object đầu tiên của list.

## a. Object chưa được khởi tạo:
- Ví dụ đối với object chưa được khởi tạo, khi ta gọi hàm `first_or_create`
     ```ruby
     User.where(name: "LeTanThanh").first_or_create
     ```
- Ta thấy các câu lệnh SQL được generate ra như sau
    ```SQL
    SELECT  "users".* FROM "users" WHERE "users"."name" = ? ORDER BY "users"."id" ASC LIMIT ? 
    [["name", "LeTanThanh"], ["LIMIT", 1]]

    INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)
    [["name", "LeTanThanh"], ["created_at", "2019-02-21 02:12:47.468661"], ["updated_at", "2019-02-21 02:12:47.468661"]]
    ```
- Đầu tiên SQL thực hiện kiểm tra object đã được khởi tạo hay chưa thông qua câu truy vấn `SELECT`.
- Sau đó SQL thực hiện khởi tạo object thông qua câu lệnh `INSERT`.
- Hàm trả về 1 object `User` mới được khởi tạo thông qua câu lệnh `INSERT`.
- Trong ví dụ trên đối tượng tạo ra là hợp lệ (pass được các validation) và được lưu vào trong database.
- Trong trường hợp đối tượng được tạo ra không hợp lệ (không pass được các validation) thì không được lưu vào trong database, cơ chế này hoạt động trương tự hàm `create`.
 - Trong trường hợp object chưa được khởi tạo, khi ta truyền thêm 1 hash attributes vào hàm `first_or_create` thì object mới được sẽ được tạo với hash attribute đó.
     ```ruby
     User.where(name: "LeTanThanh").first_or_create(email: "le.tan.thanh@framgia.com")
     ```
- Ta thấy các câu lệnh SQL được generate ra như sau
    ```SQL
    SELECT  "users".* FROM "users" WHERE "users"."name" = ? ORDER BY "users"."id" ASC LIMIT ?
    [["name", "LeTanThanh"], ["LIMIT", 1]]

    INSERT INTO "users" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)
    [["name", "LeTanThanh"], ["email", "le.tan.thanh@framgia.com"], ["created_at", "2019-02-21 03:46:49.194523"], ["updated_at", "2019-02-21 03:46:49.194523"]]
    ```

 ## b. Object đã được khởi tạo:
- Ví dụ đối với object đã được khởi tạo, khi ta gọi hàm first_or_create:
    ```ruby
    User.where(name: "LeTanThanh").first_or_create
    ```
- Ta thấy các câu lệnh SQL được generate ra như sau
    ```SQL
    SELECT  "users".* FROM "users" WHERE "users"."name" = ? ORDER BY "users"."id" ASC LIMIT ? 
    [["name", "LeTanThanh"], ["LIMIT", 1]]
    ```
- Đầu tiên SQL thực hiện kiểm tra object đã được khởi tạo hay chưa thông qua câu truy vấn `SELECT` giống như lấn trước.
- Tuy nhiên lần này SQL không thực hiện khởi tạo object thông qua câu lệnh `INSERT` bởi vì object đã được tìm thấy khi thực hiện câu truy vấn `SELECT`.
- Hàm trả về 1 object `User` đã được khởi tạo từ trước và được tìm thấy thông qua câu truy vấn `INSERT`.
 - Trong trường hợp object đã được khởi tạo, khi ta truyền thêm 1 hash attributes vào hàm `first_or_create` thì object trả về không được update bởi attribute đó
     ```ruby
     User.where(name: "LeTanThanh").first_or_create(email: "le.tan.thanh.update@framgia.com")
      User.where(name: "LeTanThanh").first_or_create
     ```
- Cả 2 ví dụ trên ta thấy các câu lệnh SQL đều được generate ra như sau
    ```SQL
    SELECT  "users".* FROM "users" WHERE "users"."name" = ? ORDER BY "users"."id" ASC LIMIT ?
    [["name", "LeTanThanh"], ["LIMIT", 1]]
    ```

# 3. first_or_create!:
- Hàm `first_or_create!` hoạt động tương tự như hàm `first_or_create` nhưng trong trường hợp object chưa được khởi tạo và các attribute không hợp lệ (không pass được các validation) thì hàm sẽ raise exception, cơ chế này hoạt động trương tự hàm `create!`.
    ```ruby
    User.where(name: "LeTanThanh").first_or_create!
    # => ActiveRecord::RecordInvalid (Validation failed: Email can't be blank)
    ```

# 4. first_or_initialize:
- Hàm `first_or_initialize` hạt động tương tự như hàm `first_or_create` nhưng trong trường hợp object chưa được khởi tạo thì hàm `new` được gọi chứ không phải hàm create, cơ chế này hoạt động tương tự hàm `new`.
    ```ruby
    user = User.where(name: "LeTanThanh").first_or_initialize
    user.persisted?  # false
    user.new_record? # true
    ```