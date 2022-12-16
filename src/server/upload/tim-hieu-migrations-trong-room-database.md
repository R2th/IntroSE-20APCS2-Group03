Khi sử dụng Room Database, nếu bạn thay đổi `schema` của database nhưng không nâng cấp, cập nhật version thì ứng dụng của bạn sẽ bị crash hay nếu bạn có upgrade version nhưng không cung cấp bất kỳ migration nào thì ứng dụng cũng bị tình trạng tương tự, các table bị xóa và gây mất dữ liệu. Hôm nay chúng ta sẽ cùng nhau tìm hiểu cách thức Room làm việc với migrations.

## Tìm hiểu database migrations
**What SQLite API does**

 Cơ sở dữ liệu SQLite sẽ xử lý sự thay đổi của schema dựa trên version của database. Cụ thể hơn, mỗi lần bạn thay đổi schema bằng cách thêm vào, xóa đi hay thay đổi các tables, bạn phải upgrade version của database lên và cập nhật trong method `SQLiteOpenHelper.onUpgrade`. Bằng cách này, bạn sẽ yêu cầu SQLite thực hiện các công việc cần thiết để upgrade database lên version mới. Đây cũng là phương thức sẽ được gọi xử lý đầu tiên khi ứng dụng làm việc với database, SQLite đầu tiên sẽ xử lý việc upgrade version và sau đó nó sẽ bắt đầu mở database.
 
 **What Room does**
 
 Room cung cấp một abstract layer để dễ dàng thực hiện SQLite migration bằng cách sử dụng class `Migration`. Lớp `Migration` sẽ định nghĩa các công việc cần thiết để thực hiện upgrade version. 
 
 Dưới đây là những điều xảy ra khi bạn lần đầu truy cập database:
 - Room database được khởi tạo.
 - Phương thức `SQLiteOpenHelper.onUpgrade` được gọi và Room sẽ kích hoạt migrations.
 - Database được mở.
 
 Nếu bạn không cung cấp migrations nhưng lại upgrade version của database, ứng dụng của bạn có thể bị crash hoặc bị mất dữ liệu tùy vào từng trường hợp. Phần quan trọng bên trong migration là một `Identity hash String` được sử dụng bởi Room để xác định mỗi version của database. `Id` này đại diện cho version hiện tại database cũng như `Id` được lưu trữ trong `room_master_table` và quản lý bởi Room.

 Chúng ta sẽ tìm hiểu các trường hợp Room xử lý migration thông qua một ví dụ sau. Giả sử chúng ta có một table `users` với 2 columns:
 - **Id**: primary key
 - **username**: String
 
 Và giả sử chúng ta đang sử dụng version này là version 1.
 
 ### Migrate SQLite API code to Room
 Như ví dụ trên, giả sử chúng ta đang có một `Entity class` là **User** và một interface **UserDAO** để định nghĩa các truy vấn tương tác với database và một abstract class `Database`  được kế thừa từ `RoomDatabase` để chứa các thông tin cấu hình (chúng ta sẽ tập trung vào phần này).
```
@Database(entities = {User.class}, version = 1)
public abstract class UsersDatabase extends RoomDatabase
```

**Trường hợp 1: Thay đổi schema nhưng không thay đổi version**

Trong trường hợp này, khi chúng ta cố gắng truy cấp database, Room sẽ kiểm tra version của database bằng cách so sánh `Identity hash` của version hiện tại với `Id` được lưu trong `room_master_table`. Nếu không có `Identity hash` nào được lưu trữ thì ứng dụng sẽ bị crash với error `IllegalStateException`:
```
java.lang.IllegalStateException: Room cannot verify the data integrity. Looks like you’ve changed schema but forgot to update the version number. You can simply fix this by increasing the version number.
```
> Room sẽ luôn `throw` một Exception `IllegalStateException` nếu bạn thay đổi schema của database nhưng không cập nhật version.

Khi gặp lỗi trên, chúng ta sẽ follow theo gợi ý của nó và cập nhật version của database.
```
@Database(entities = {User.class}, version = 2)
public abstract class UsersDatabase extends RoomDatabase
```

**Trường hợp 2: Cập nhật version nhưng không cung cấp migration**

Sau khi upgrade version lên 2 như trên, nếu bạn cố truy cập lại database thì ứng dụng của bạn vẫn có thể bị crash với error:
```
java.lang.IllegalStateException: A migration from 1 to 2 is necessary. Please provide a Migration in the builder or call fallbackToDestructiveMigration in the builder in which case Room will re-create all of the tables.
```

> Room sẽ ném một Exception `IllegalStateException` nếu bạn không cung cấp một `Migration`

Để giải quyết vấn đề trên, chúng ta có thể áp dụng các cách sau:
- **Enable fallback to destructive**: Nếu bạn không muốn cung cấp migrations và bạn không quan tâm đến dữ liệu cũ trong database khi upgrade version thì bạn có thể gọi phương thức `fallbackToDestructiveMigration` trong database builder:
```
database = Room.databaseBuilder(context.getApplicationContext(),
                        UsersDatabase.class, "Sample.db")
                .fallbackToDestructiveMigration()
                .build();
```

Bây giờ, nếu bạn chạy lại ứng dụng, Room sẽ thực hiện các bước sau:

Step 1: Upgrade từ version 1 (đã được cài trên thiết bị) lên version 2. Bởi vì không có bất kì migrations nào được cung cấp nên các tables, dữ liệu trong version 1 sẽ bị xóa và `identity hash` mới sẽ được insert vào `room_master_table`.

Step 2: Mở database và so sánh `identity hash` của version hiện tại với `identity hash` trong `room_master_table` giống nhau nên ứng dụng có thể chạy bình thường nhưng tất cả dữ liệu cũ sẽ bị mất hoàn toàn.

- **Provide migrations**: Để giải quyết việc mất dữ liệu ở trên thì chúng ta cần phải cung cấp migration để Room xử lý việc upgrade version chính xác.

Nếu schema không thay đổi, chúng ta chỉ cần đinh nghĩa một empty migration như sau. Room sẽ  thực hiện migrate và cập nhật `identity hash` của version 2 vào `room_master_table`.

```
@Database(entities = {User.class}, version = 2)
public abstract class UsersDatabase extends RoomDatabase {
…
static final Migration MIGRATION_1_2 = new Migration(1, 2) {
    @Override
    public void migrate(SupportSQLiteDatabase database) {
        // Since we didn't alter the table, there's nothing else to do here.
    }
};
…
database =  Room.databaseBuilder(context.getApplicationContext(),
        UsersDatabase.class, "Sample.db")
        .addMigrations(MIGRATION_1_2)
        .build();
```

Nếu schema của database thay đổi, ví dụ chúng ta thêm một column `last_update` vào bảng `users` bằng cách thêm thuộc tính vào class `User`. Trong class `UserDatabase` chúng ta cần thay đổi như sau:

Tăng version lên 3:
```
@Database(entities = {User.class}, version = 3)
public abstract class UsersDatabase extends RoomDatabase
```
Định nghĩa migration từ version 2 lên version 3:
```
static final Migration MIGRATION_2_3 = new Migration(2, 3) {
    @Override
    public void migrate(SupportSQLiteDatabase database) {
        database.execSQL("ALTER TABLE users "
                + " ADD COLUMN last_update INTEGER");
    }
};
```
Thêm migration ở trên vào database builder:
```
database = Room.databaseBuilder(context.getApplicationContext(),
        UsersDatabase.class, "Sample.db")
        .addMigrations(MIGRATION_1_2, MIGRATION_2_3)
        .build();
```

Với cách này thì schema sẽ được cập nhật và dữ liệu được lưu giữ lại hoàn toàn.

Các bạn có thể tìm hiểu chi tiết thêm ở đây:

Ref: https://medium.com/androiddevelopers/understanding-migrations-with-room-f01e04b07929