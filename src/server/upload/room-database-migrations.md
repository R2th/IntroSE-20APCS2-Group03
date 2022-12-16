**Database Migrations** là một khái niệm rất quan trọng trong bất kỳ sự phát triển ứng dụng nào. Khi chúng ta thêm và thay đổi các tính năng trong ứng dụng, chúng ta phải cập nhật lược đồ của cơ sở dữ liệu. Bất cứ khi nào có sự thay đổi trong lược đồ của bất kỳ bảng nào của dữ liệu, chúng ta cần phải viết một migration cho ứng dụng hiện có nếu không muốn người dùng mất tất cả dữ liệu hiện có của họ.

***Ví dụ***: chúng ta có thể xem xét một bảng có tên **users** chứa thông tin của người dùng và nó có 3 cột có tên ***uid***, ***firstname*** và ***lastname***. Bây giờ nếu chúng ta thêm một cột mới là ***age***, chúng ta cần viết một migration để thay đổi lược đồ bảng hiện tại - thêm một cột mới ***age***.

Thư viện **Room** cho phép chúng ta viết các class **Migrations** để bảo toàn dữ liệu người dùng theo cách này. Mỗi class Migration chỉ định **startVersion** và **endVersion**. Tại Runtime, Room chạy phương thức **migrate**() của mỗi class **Migration** theo đúng thứ tự để migrate cơ sở dữ liệu sang phiên bản mới hơn.

```java
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE users ADD COLUMN age INTEGER")
    }
}
```

Bây giờ chúng ta đã tạo đối tượng migration **MIGRATION_1_2**, cần thêm nó vào cấu hình cơ sở dữ liệu sử dụng database builder.

```java
Room.databaseBuilder(
    applicationContext, 
    UserDatabase::class.java, 
    "users-db"
).addMigrations(MIGRATION_1_2)
.build()
```

**Xử lý migrations bị lỗi**

Sau khi cập nhật các lược đồ cơ sở dữ liệu, có thể một số cơ sở dữ liệu trên thiết bị vẫn có thể sử dụng phiên bản lược đồ cũ hơn. Nếu Room không thể tìm thấy quy tắc di chuyển để nâng cấp cơ sở dữ liệu của thiết bị đó từ phiên bản cũ lên phiên bản hiện tại, thì nó sẽ ném ra **IllegalStateException** khiến ứng dụng bị crash.

Để ngăn ứng dụng không bị crash khi tình huống này xảy ra, hãy gọi method **fallbackToDestructiveMigration()** khi tạo cơ sở dữ liệu. Method này cho phép Room tái tạo lại các bảng cơ sở dữ liệu nếu migration các lược đồ cơ sở dữ liệu cũ sang phiên bản lược đồ mới nhất không được tìm thấy.

Lưu ý rằng điều này sẽ xóa tất cả dữ liệu trong các bảng cơ sở dữ liệu do Room quản lý.

```java
Room.databaseBuilder(
    applicationContext, 
    UserDatabase::class.java, 
    "users-db"
).fallbackToDestructiveMigration()
.build()
```

Một số tùy chọn bổ sung:

* Nếu xảy ra lỗi trong các phiên bản cụ thể của lịch sử lược đồ mà bạn không thể giải quyết bằng các đường dẫn migrations, hãy sử dụng **fallbackToDestructiveMigrationFrom**(). Method này chỉ ra rằng bạn muốn Room chỉ sử dụng logic dự phòng trong trường hợp cơ sở dữ liệu cố gắng di chuyển từ một trong những phiên bản có vấn đề đó.
* Để downgrade schema (hạ cấp lược đồ), hãy sử dụng **fallbackToDestructiveMigrationOnDowngrade**().

Tham khảo

https://developer.android.com/reference/android/arch/persistence/room/RoomDatabase.Builder