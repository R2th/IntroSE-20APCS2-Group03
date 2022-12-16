Khi sử dụng Room trong phát triển ứng dụng Android, nếu bạn thay đổi database schema nhưng không cập nhật version, app của bạn sẽ crash. Nếu bạn cập nhật version nhưng không cung cấp bất cứ migration nào thì app của bạn có thể vẫn sẽ crash, hoặc nếu may mắn app của bạn không crash thì các bảng trong database sẽ bị drop và mọi data sẽ bị mất. Nghe có vẻ không may mắn lắm nhỉ? Bài viết này sẽ giúp bạn hiểu cách Room hoạt động với migrations.  

## 1. Cách SQLite hoạt động khi thay đổi schema
SQLite database xử lý sự thay đổi của schema dựa trên version của database. Mỗi khi bạn thay đổi schema bằng cách thêm, sửa, xóa các bảng, bạn phải thay đổi version của database và cập nhật trong method `onUpgrade` của `SQLiteOpenHelper`. Khi này, SQLite sẽ thực hiện cập nhật database lên version mới. Đó cũng là phương thức sẽ được gọi đầu tiên khi ứng dụng làm việc với database.
## 2. Cách Room hoạt động khi thay đổi schema
Room cung cấp một abstraction layer để dễ dàng thực hiện migration bằng cách sử dụng class `Migration`. Class này sẽ định nghĩa các phương thức sẽ được thực hiện khi migrate từ version cũ sang version mới. Room sử dụng cách triển khai `SQLiteOpenHelper` của riêng nó, và trong hàm `onUpgrade` sẽ thực hiện migration.

Nếu bạn không cung cấp migration khi thay đổi database version, app sẽ crash hoặc data sẽ bị mất tùy từng trường hợp như sau:

**Trường hợp 1: Thay đổi schema nhưng không thay đổi database version**

Trong trường hợp này, Room sẽ kiểm tra version của database bằng cách so sánh **Identity hash String** của version hiện tại với cái đã lưu trong **room_master_table**. Nhưng vì không có **identity hash** nào được lưu trước đó, app của bạn sẽ crash với `IllegalStateException`
```
java.lang.IllegalStateException: Room cannot verify the data integrity. Looks like you’ve changed schema but forgot to update the version number. You can simply fix this by increasing the version number.
```

**Trường hợp 2: Thay đổi database version nhưng không cung cấp migration**

Trong trường hợp này, mặc dù đã thay đổi database version nhưng app vẫn sẽ crash với `IllegalStateException` do không có migration.
```
java.lang.IllegalStateException: A migration from 1 to 2 is necessary. Please provide a Migration in the builder or call fallbackToDestructiveMigration in the builder in which case Room will re-create all of the tables.
```

**Trường hợp 3: Thay đổi database version, enable fallback to destructive migration**

Nếu bạn không muốn cung cấp migrations và bạn không quan tâm đến dữ liệu cũ trong database khi thay đổi version thì bạn có thể gọi phương thức `fallbackToDestructiveMigration` trong database builder:
```Java
Room.databaseBuilder(applicationContext, UserDatabase::class.java, "users")
    .fallbackToDestructiveMigration()
    .build()
```
Khi này, tuy app của bạn đã không còn crash nhưng toàn bộ data trong database sẽ bị mất hết. 

**Trường hợp 4: Thay đổi database version, cung cấp migration**

Để có thể  vừa giúp app không bị crash vừa đảm bảo toàn bộ data được bảo toàn nguyên vẹn thì bạn cần cung cấp migration. 

Nếu schema không thay đổi, bạn chỉ cần định nghĩa 1 empty migration và bảo Room thực hiện nó. Room sẽ thực hiện migrate và cập nhật **identity hash** của version 2 vào **room_master_table**.
```Java
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
    }
}
```
Nhưng nếu schema thay đổi, ví dụ như thêm 1 cột vào database, thì ta sẽ cần báo cho database biết là ta thay đổi các bảng như thế nào.
```Java
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE users ADD COLUMN age INTEGER")
    }
}
```
Sau khi đã định nghĩa migration xong, bạn đơn giản chỉ cần thêm migration đó vào trong database builder là đã update được schema thành công mà không khiến app crash hay mất data.
```Java
Room.databaseBuilder(applicationContext, UserDatabase::class.java, "users")
    .addMigrations(MIGRATION_1_2)
    .build()
```

## 3. Room Auto Migration 
Những trường hợp mà mình có nêu ra ở trên gọi là migration thủ công. Gần đây, Google đã release version mới của Room **2.4.0-alpha01**. Trong bản release này, Google đã thêm vào một tính năng gọi là **Auto Migration**. Với tính năng mới này, bạn chỉ cần cho Room biết là bạn đang muốn migrate từ version nào sang version nào. Room sẽ tự động thực hiện migartion đối với các trường hợp đơn giản như thêm hoặc xóa cột hoặc thêm bảng mới vào database. Đối với những trường hợp phức tạp hơn thì Room vẫn cần một số chỉ dẫn cụ thể để có thể migrate được. 

### Auto Migration với những trường hợp đơn giản
Trong những trường hợp đơn giản, bạn chỉ cần thay đổi database version và thêm **AutoMigration** từ version 1 sang version 2.
```Java
@Database(
    version = 2, 
    entities = [ Doggos.class ],
    autoMigrations = [
        AutoMigration (from = 1, to = 2)
    ]
)
abstract class AppDatabase : RoomDatabase { }
```
Bất cứ khi nào thay đổi schema, chỉ đơn giản cần tăng version và thêm **AutoMigration** mới. 
```Java
@Database(
    version = 3, 
    entities = [ Doggos.class ],
    autoMigrations = [
        AutoMigration (from = 1, to = 2),
        AutoMigration (from = 2, to = 3)
    ]
)
abstract class AppDatabase : RoomDatabase { }
```
***Chú ý:***
<br>
* Khi thay đổi schema nhiều lần thì bạn vẫn phải giữ các AutoMigration trước đó. 
* Cùng với đó là hãy đảm bảo `exportSchema` của database được để là `true` khi sử dụng auto migration. Nếu không thì sẽ báo lỗi `Cannot create auto-migrations when export schema is OFF`

### Auto Migration với những trường hợp phức tạp hơn
Tính năng auto migration của Room không thể tự xác định được tất cả những trường hợp thay đổi schema, do đó có một số trường hợp ví dụ như một bảng bị xóa hoặc đổi tên thì Room sẽ throw một compile time error để thông báo bạn cần implement class AutoMigrationSpec. Class này cho phép bạn chỉ rõ sự thay đổi mà bạn muốn thực hiện bằng các annotation
* @DeleteTable(tableName)
* @RenameTable(fromTableName, toTableName)
* @DeleteColumn(tableName, columnName)
* @RenameColumn(tableName, fromColumnName, toColumnName)

Ví dụ khi bạn muốn đổi tên table **User** thành **Customer** chẳng hạn. Room không thể xác định được đây có phải bảng mới và xóa bảng **User** hay chỉ là đổi tên và tất cả các dữ liệu cần được giữ lại.
```Java
@Database(
    version = 2, 
    entities = [ Doggos.class ],
    autoMigrations = [
        AutoMigration (
            from = 1, 
            to = 2,
            spec = AppDatabase.UserAutoMigration::class
        )
    ]
)
abstract class AppDatabase : RoomDatabase {
    @RenameTable(fromTableName = "User", toTableName = "Customer")
    class UserAutoMigration: AutoMigrationSpec {}
}
```

## 4. Tổng kết
Như vậy là mình vừa giới thiệu cho các bạn về migration trong Room và tính năng mới Auto Migration mới được cập nhật trong Room. Hi vọng các bạn có thể áp dụng vào trong project của mình.

***Nguồn tham khảo***

[https://developer.android.com/jetpack/androidx/releases/room#2.4.0-alpha01](https://developer.android.com/jetpack/androidx/releases/room#2.4.0-alpha01)

[https://medium.com/androiddevelopers/room-auto-migrations-d5370b0ca6eb](https://medium.com/androiddevelopers/room-auto-migrations-d5370b0ca6eb)