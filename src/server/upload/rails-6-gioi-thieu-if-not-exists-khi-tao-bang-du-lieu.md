`Rails 6` bổ sung thêm tùy chọn `if_not_exists` để  `create_table` tùy chọn tạo ra một bảng nếu nó không tồn tại.

Giá trị mặc định của `if_not_exists` là `false`

Trước Rails 6 chúng ta có thể làm được điều này không?. Hoàn toàn có thể nhưng cách viết nó sẽ dài hơn.

Trước rails 6 ta sử dung `ActiveRecord :: Base.connection.table_exists?` để kiểm tra một bảng có tồn tại hay chưa khi `create_table`

**1. Rails 5.2**

Tạo 1 bảng users trong Rails 5.2
```
>> class CreateUsers < ActiveRecord::Migration[6.0]
>>   def change
>>     create_table :users do |t|
>>       t.string :name, index: { unique: true }
>>
>>       t.timestamps
>>     end
>>   end
>> end

>> CreateUsers.new.change
-- create_table(:users)
CREATE TABLE "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp NOT NULL, "updated_at" timestamp NOT NULL)
```


Bây giờ tạo lại bảng users với tùy chọn `if_not_exists` 


```
>> class CreateUsers < ActiveRecord::Migration[6.0]
>>   def change
>>     create_table :users, if_not_exists: true do |t|
>>       t.string :name, index: { unique: true }
>>
>>       t.timestamps
>>     end
>>   end
>> end

>> CreateUsers.new.change
-- create_table(:users, {:if_not_exists=>true})
CREATE TABLE "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp NOT NULL, "updated_at" timestamp NOT NULL)

=> Traceback (most recent call last):
        2: from (irb):121
        1: from (irb):114:in 'change'
ActiveRecord::StatementInvalid (PG::DuplicateTable: ERROR:  relation "users" already exists)
: CREATE TABLE "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp NOT NULL, "updated_at" timestamp NOT NULL)
```

Chúng ta có thể thấy rằng rails 5.2 bỏ qua tùy chọn `if_not_exists`, và cố gắng tạo lại bảng

Bây giờ hãy thử `ActiveRecord :: Base.connection.table_exists?` với rails 5.2

```
>> class CreateUsers < ActiveRecord::Migration[5.2]
>>   def change
>>     unless ActiveRecord::Base.connection.table_exists?('users')
>>       create_table :users do |t|
>>         t.string :name
>>
>>         t.timestamps
>>       end
>>     end
>>   end
>> end

>> CreateUsers.new.change

=> nil
```

Dựa vào kết quả trên chúng ta có thể thấy rằng `create_table: :users` đã không được chạy vì `ActiveRecord::Base.connection.table_exists?('users')` trả về kết quả true

**2. Rails 6**

Bây giờ tạo bảng users trong rails 6 với tùy chọn `if_not_exists`  = true

```
>> class CreateUsers < ActiveRecord::Migration[6.0]
>>   def change
>>     create_table :users, if_not_exists: true do |t|
>>       t.string :name, index: { unique: true }
>>
>>       t.timestamps
>>     end
>>   end
>> end

>> CreateUsers.new.change
-- create_table(:users, {:if_not_exists=>true})
CREATE TABLE IF NOT EXISTS "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp(6) NOT NULL, "updated_at" timestamp(6) NOT NULL)

=> #<PG::Result:0x00007fc4614fef48 status=PGRES_COMMAND_OK ntuples=0 nfields=0 cmd_tuples=0>

>> CreateUsers.new.change
-- create_table(:users, {:if_not_exists=>true})
CREATE TABLE IF NOT EXISTS "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp(6) NOT NULL, "updated_at" timestamp(6) NOT NULL)

=> #<PG::Result:0x00007fc46513fde0 status=PGRES_COMMAND_OK ntuples=0 nfields=0 cmd_tuples=0>
```

Nhìn vào ví dụ trên. Chúng ta có thể thấy không có ngoại lệ nào được đưa ra khi chúng ta tạo lại bẳng users lần thứ 2

Bây giờ tạo lại bảng users với tùy chọn `if_not_exists` = false

```
>> class CreateUsers < ActiveRecord::Migration[6.0]
>>   def change
>>     create_table :users, if_not_exists: false do |t|
>>       t.string :name, index: { unique: true }
>>
>>       t.timestamps
>>     end
>>   end
>> end

>> CreateUsers.new.change
-- create_table(:users, {:if_not_exists=>false})
CREATE TABLE "users" ("id" bigserial primary key, "name" character varying, "created_at" timestamp(6) NOT NULL, "updated_at" timestamp(6) NOT NULL)

=> Traceback (most recent call last):
        2: from (irb):23
        1: from (irb):15:in `change'
ActiveRecord::StatementInvalid (PG::DuplicateTable: ERROR:  relation "users" already exists
)
```

Một ngoại lệ được bắn ra vì tùy chọn `if_not_exists` = false

Đây là [pull request](https://github.com/rails/rails/pull/31382) liên quan

**Nguồn tham khảo**
https://blog.bigbinary.com/2019/05/22/rails-6-adds-if_not_exists-option-to-create_table.html
https://api.rubyonrails.org/v5.2/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-table_exists-3F