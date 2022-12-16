Rails với ActiveRecord giúp đỡ cho lập trình viên rất nhiều trong việc truy xuất dữ liệu từ cơ sở dữ liệu, đặc biệt là trong trường hợp cần lấy dữ liệu từ các bảng liên kết với nhau bằng việc cung cấp các method tiện ích. Trong Rails có các method như là preload, eager_load, includes, references và joins. Các method này đều có cùng mục đích là load data từ các bảng có quan hệ, tuy nhiên mỗi cách lại có cách thức xử lý khác nhau và phù hợp cho các trường hợp khác nhau. Chúng ta hãy cùng tìm hiểu trong bài viết này.
# Chuẩn bị model
```
# app/models/student.rb
class Student < ApplicationRecord
  belongs_to :room, class_name: Room
end

# app/models/room.rb
class Room < ApplicationRecord
  has_many :students
end
```
# Preload
Thực hiện từng câu query riêng biệt để lấy data từ DB.

Ví dụ: 
```
Room.preload(:students)

Room Load (0.1ms)  SELECT "rooms".* FROM "rooms"
Student Load (0.2ms)  SELECT "students".* FROM "students" WHERE "students"."room_id" IN (1, 2, 3)
```
Preload luôn sinh ra 2 câu lệnh riêng rẽ để load data:
  - Lấy ra tất cả dữ liệu trong bảng room.
  - Lấy ra tất cả dữ liệu của bảng students thuộc room
  
Không thể dùng  Room.preload(:students).where("students.name = 'A' ") => raise exception

Có thể dùng  Room.preload(:students).where("rooms.name = 'A' ")

# Includes
Nếu chỉ dùng includes không thì hoạt động không khác gì preload.

Ví dụ: 
```
Room.includes(:students)
Room Load (0.1ms)  SELECT "rooms".* FROM "rooms"
Student Load (0.1ms)  SELECT "students".* FROM "students" WHERE "students"."room_id" IN (1, 2, 3)
```
Có thể sử dụng references với includes() nếu như chúng ta có một điều kiện cho một eager loaded table, dùng kết hợp references với includes giúp cho includes tạo ra query giống với eager_load.

Ví dụ:
```
Room.includes(:students).where("students.name: '1' ").references(:students)
SQL (6.7ms)  SELECT "rooms"."id" AS t0_r0, "rooms"."name" AS t0_r1, "rooms"."created_at" AS t0_r2, "rooms"."updated_at" AS t0_r3, "students"."id" AS t1_r0, "students"."name" AS t1_r1, "students"."room_id" AS t1_r2, "students"."created_at" AS t1_r3, "students"."updated_at" AS t1_r4 FROM "rooms" LEFT OUTER JOIN "students" ON "students"."room_id" = "rooms"."id" WHERE "students"."name" = ?  [["name", "1"]]
```

# Eager_load
Sử dụng 1 câu query lớn với LEFT JOIN để liên kết nhiều tables.

Join trước, rồi sau đó query theo điều kiện của bảng references

Ví dụ:
```
Room.eager_load(:students)
SQL (0.3ms)  SELECT "rooms"."id" AS t0_r0, "rooms"."name" AS t0_r1, "rooms"."created_at" AS t0_r2, "rooms"."updated_at" AS t0_r3, "students"."id" AS t1_r0, "students"."name" AS t1_r1, "students"."room_id" AS t1_r2, "students"."created_at" AS t1_r3, "students"."updated_at" AS t1_r4 FROM "rooms" LEFT OUTER JOIN "students" ON "students"."room_id" = "rooms"."id"

Room.eager_load(:students).where(name: "Student 1")
SQL (0.1ms)  SELECT "rooms"."id" AS t0_r0, "rooms"."name" AS t0_r1, "rooms"."created_at" AS t0_r2, "rooms"."updated_at" AS t0_r3, "students"."id" AS t1_r0, "students"."name" AS t1_r1, "students"."room_id" AS t1_r2, "students"."created_at" AS t1_r3, "students"."updated_at" AS t1_r4 FROM "rooms" LEFT OUTER JOIN "students" ON "students"."room_id" = "rooms"."id" WHERE "rooms"."name" = ?  [["name", "Student 1"]]
```

# Joins
Chỉ sinh ra một câu query duy nhất.

Khác với eager_load dử dụng LEFT OUTER JOIN, joins sử dụng INNER JOIN.

Joins sẽ sinh ra những bản ghi giống nhau bị lặp lại.

Nếu chỉ muốn dùng bảng liên kết để lọc dữ liệu, không lấy dữ liệu => sử dụng joins

Ví dụ:
```
Room.joins(:students)
SELECT "rooms".* FROM "rooms" INNER JOIN "students" ON "students"."room_id" = "rooms"."id"
```

# Kết luận
Trên đây mình đã tổng hợp và giới thiệu một số cách load data association khi làm việc với ActiveRecord trong Rails.Hy vọng bài viết giúp đỡ được các bạn phần nào trong quá trình phát triển phần mềm và lựa chọn được phương pháp phù hợp nhất với mình.