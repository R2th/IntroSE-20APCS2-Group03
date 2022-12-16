> Easily move your tables between rooms

Như các bạn đã biết, khi sử dụng Room nếu bạn thay đổi database scheme nhưng không nâng cấp database version, ứng dụng sẽ bị crash. Nếu bạn nâng cấp version nhưng không cung cấp bất kỳ migrations nào, ứng dụng cũng sẽ bị crash hoặc tables bị drop và mất luôn dữ liệu. Với vị trí là một người dùng, trải nghiệm đó thực sự không tốt chút nào.<br />
Trước đây, khi database scheme có bất kì sự thay đổi nào, bạn phải triển khai một **Migration** class và cho Room biết chính xác những gì đã thay đổi. Trong hầu hết các trường hợp, bạn cần phải viết và thực thi các truy vấn SQL phức tạp. 
Giờ đây, việc thực hiện migrate database trong Room trở nên dễ dàng hơn với sự trợ giúp của tính năng  **auto-migrations**, được giới thiệu trong phiên bản `2.4.0-alpha01`. 

# Tự động migrate với auto-migrations
Với những trường hợp đơn giản như tạo mới một table, thêm, xóa column, cập nhật primary key, foreign key hay thay đổi giá trị mặc định của column, ... Công việc của bạn chỉ đơn giản là cho Room biết bạn muốn migrate từ version nào sang version nào. Room sẽ tự động tạo ra các **migration** cần thiết.<br />
Giả sử database cần thêm `manufacturer` table, database của bạn sẽ cần được cập nhật version từ `1` lên `2`
```kotlin
@Database(
    version = 2, // Upgrade từ 1 lên 2 ở đây
    entities = [CarEntity.class, ManufacturerEntity.class], // Tạo mới table Manufacturer ở đây
    autoMigrations = [
        AutoMigration(from = 1, to = 2) // Thực hiện auto migration ở đây
    ]
)
abstract class VehicleDatabase : RoomDatabase { }
```
So với cách làm trước đây
```kotlin
Room.databaseBuilder(context, VehicleDatabase.class, "Vehicle.db")
        .addMigrations(migrationDatabase1To2)
        .build();

val migrationDatabase1To2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("CREATE TABLE manufacturer ...")
    }
}
```
Thật đơn giản đúng không nào! :wink:

Khi có sự thay đổi database version một lần nữa, chỉ cần thêm một **AutoMigration** vào danh sách **autoMigrations** là ok:
```kotlin
@Database(
    version = 3,
    entities = [CarEntity.class, ManufacturerEntity.class],
    autoMigrations = [
        AutoMigration(from = 1, to = 2),
        AutoMigration(from = 2, to = 3) // Thêm AutoMigration mới vào đây
    ]
)
```

Lưu ý: ***Room auto-migrations*** dựa trên database scheme đã được tạo ra trước đó, vì vậy hãy đảm giá trị của `exportSchema` option trong anotation @Database là true khi sử dụng **autoMigrations** (mặc định option này đã là true). Nếu không nó sẽ dẫn đến lỗi:  `Cannot create auto-migrations when export schema is OFF`

# Khi auto-migrations cần quyền trợ giúp từ người thân
**Room auto-migrations** không thể xác định được tất cả các thay đổi có thể thực hiện được trên database. Đôi khi nó cần chút trợ giúp. Ví dụ, Room không thể xác định được một table hay một column đã bị đổi tên hay bị xóa đi. Khi đó nó sẽ throw ra một compile time error yêu cầu bạn triển khai **AutoMigrationSpec**. Class này cho phép bạn chỉ rõ cho Room thao tác mà bạn mong muốn thay đổi trên database với các anotation dưới đây:
* @DeleteTable(tableName)
* @RenameTable(fromTableName, toTableName)
* @DeleteColumn(tableName, columnName)
* @RenameColumn(tableName, fromColumnName, toColumnName)

Ví dụ, bạn muốn đổi tên table `Car` thành `LuxuryCar`. Room không thể nhận biết được table `Car` đã bị xóa hay chỉ đơn giản là đổi tên và tất cả giá trị của table cần được giữ lại. Ta sẽ làm như sau
```kotlin
@Database(
    version = 2,
    entities = [LuxuryCarEntity.class, ManufacturerEntity.class],
    autoMigrations = [
        AutoMigration(from = 1, to = 2)
    ]
)
abstract class VehicleDatabase : RoomDatabase { 
    @RenameTable(fromTableName = "CarEntity", toTableName = "LuxuryCarEntity")
    class CarAutoMigration: AutoMigrationSpec {   }
}
```

# Migrations vs Auto-migrations
Câu hỏi đặt ra là **Auto-migrations** xịn xò vậy rồi thì có cần class **Migrations** nữa không? Tất nhiên là có rồi.
Để xử lí migrate một cách thủ công, Room đã cung cấp lớp **Migrations** kể từ phiên bản `1.0`. Khi bạn cần thực hiện các thay đổi phức tạp hơn trên database scheme, bạn sẽ phải sử dụng lớp này.<br />
Ví dụ:<br />
Bạn cần tách 1 table thành 2 table khác nhau, Room sẽ không biết được bạn muốn tách 2 table như thế nào, không thể tự động di chuyển data của bảng này sang bảng kia. Lúc này bạn phải sử dụng **Migrations** class để thực hiện migrations thủ công.

```kotlin
Room.databaseBuilder(context, VehicleDatabase.class, "Vehicle.db")
        .addMigrations(migrationDatabase1To2)
        .build();

val migrationDatabase1To2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        // SQL queries để tách table
    }
}
```

# Kết hợp migrations và auto-migrations
Room cho phép kết hợp **migrations** với **auto-migrations**. Ví dụ, migrate từ version 1 sang version 2 có thể được thực hiện bằng **migrations**, version 2 sang version 3 bằng cách sử dụng **auto-migrations**, ... Nếu bạn thiết lập **migrations** và **auto-migrations** cho cùng một phiên bản, nó sẽ ưu tiên dùng **migrations**.

# Kết luận
Hy vọng bài viết này sẽ giúp các bạn dễ dàng migrate database scheme hơn trong các project sắp tới. Dù vậy, tính năng này vẫn trong giai đoạn alpha, mình sẽ cập nhật thêm nếu có sự thay đổi mới trong tương lai :grinning: <br />
Tham khảo:<br />
https://medium.com/androiddevelopers/room-auto-migrations-d5370b0ca6eb<br />
https://developer.android.com/jetpack/androidx/releases/room#2.4.0-alpha02