# Giới thiệu
Phần này bao gồm những kiến thức cơ bản về thư viện Room. Sau khi đọc xong, bạn có thể bắt đầu sử dụng Room trong các ứng dụng Android của mình.

Room là một thư viện bền bỉ của Android, nằm trong project Android Jetpack của Google. Theo tài liệu, Room cung cấp một lớp trừu tượng trên SQLite để cho phép truy cập cơ sở dữ liệu thông thạo trong khi khai thác toàn bộ sức mạnh của SQLite.

Các ứng dụng xử lý lượng dữ liệu có cấu trúc đáng kể có thể được hưởng lợi rất nhiều từ việc duy trì dữ liệu đó cục bộ. Trường hợp sử dụng phổ biến nhất là lưu vào bộ nhớ cache các phần dữ liệu có liên quan. Bằng cách đó, khi thiết bị không thể truy cập mạng, người dùng vẫn có thể duyệt nội dung đó khi họ đang offline. Mọi thay đổi nội dung do người dùng thực hiện sau đó sẽ được đồng bộ hóa với máy chủ sau khi thiết bị trực tuyến trở lại.

# Thêm Room vào project
Thêm thông tin sau vào file build.gradle (app) của project:
```kotlin
dependencies {
  implementation "androidx.room:room-runtime:2.2.5"
  kapt "androidx.room:room-compiler:2.2.5"
}
```
# Ưu điểm của việc sử dụng Room
Có nhiều lợi thế khi sử dụng Room so với các giải pháp thay thế khác như SQLiteOpenHelper:

* Xác minh thời gian biên dịch của các truy vấn.
* Giảm mã chương trình tạo sẵn.
* Dễ hiểu và dễ sử dụng.
* Tích hợp dễ dàng với RxJava, LiveData và Kotlin Coroutines.
# Các thành phần của Room
* **Database:** Chứa holder database và đóng vai trò là điểm truy cập chính cho kết nối cơ bản với dữ liệu quan hệ lâu dài của ứng dụng của bạn.
* **Entity:** Đại diện cho một bảng trong cơ sở dữ liệu.
* **DAO:** Chứa các phương thức được sử dụng để truy cập cơ sở dữ liệu.

Ứng dụng của bạn sử dụng **Room database** để lấy các **đối tượng truy cập dữ liệu** hoặc **DAO**, được liên kết với **cơ sở dữ liệu** của bạn. Sau đó, ứng dụng sử dụng từng **DAO** để lấy các **entities** từ **cơ sở dữ liệu** và lưu bất kỳ thay đổi nào đối với các entities đó trở lại cơ sở dữ liệu. Cuối cùng, ứng dụng sử dụng một **entities** để lấy và đặt các giá trị tương ứng với các cột bảng trong cơ sở dữ liệu.

![](https://images.viblo.asia/19d460a3-6e12-4ca2-9de0-2f0099179967.png)

# Database
Như đã đề cập trước đó, nó chứa database holder và đóng vai trò là điểm truy cập chính cho kết nối cơ bản với dữ liệu quan hệ, liên tục của ứng dụng của bạn. Lớp được chú thích bằng **@Database** phải đáp ứng các điều kiện sau:
* Là một abstract class được extends từ  `RoomDatabase`.
* Bao gồm danh sách các thực thể được liên kết với cơ sở dữ liệu với annotation.
* Chứa một phương thức trừu tượng có 0 đối số và trả về lớp được annotation bằng @Dao.
* Trong thời gian chạy, bạn có thể có được một phiên bản của Cơ sở dữ liệu bằng cách gọi `Room.databaseBuilder()` hoặc `Room.inMemoryDatabaseBuilder()`.

```kotlin
@Database(entities = arrayOf(User::class), version = 1)
abstract class UserDatabase : RoomDatabase() {
  abstract fun userDao(): UserDao
}
```
Để lấy một instance của cơ sở dữ liệu, bạn có thể sử dụng method sau:
```kotlin
val db = Room.databaseBuilder(
    applicationContext,
    UserDatabase::class.java, "users-db"
    ).build()
```

> **Note:** Nếu ứng dụng của bạn chạy trong một process duy nhất, bạn nên tuân theo mẫu thiết kế singleton khi khởi tạo đối tượng `RoomDatabase`. Mỗi khởi tạo `RoomDatabase` khá tốn kém và bạn hiếm khi cần quyền truy cập vào nhiều phiên bản trong một quy trình.

# Entity
Entity đại diện cho một bảng trong cơ sở dữ liệu. Class này được annotated bằng chú thích `@Entity`. Các trường dữ liệu trong class này đại diện cho các cột trong bảng.
```kotlin
@Entity
data class User(
  @PrimaryKey val uid: Int,
  @ColumnInfo(name = "first_name") val firstName: String?,
  @ColumnInfo(name = "last_name") val lastName: String?
)
```
* Tất cả các trường trong một thực thể phải là công khai hoặc có phương thức getter & setter.
* Entity class phải có một phương thức khởi tạo trống (nếu tất cả các trường đều có thể truy cập được) hoặc một phương thức khởi tạo được tham số hóa nhận tất cả các trường. Room cũng có thể sử dụng một phần constructors.
* Mỗi entity class phải có ít nhất một khóa chính. Bạn có thể sử dụng annotated @PrimaryKey để xác định khóa chính của một trường hoặc thuộc tính primaryKeys của chú thích @Entity cho nhiều trường.
```kotlin
@Entity(primaryKeys = arrayOf("firstName", "lastName"))
```
* Theo mặc định, Room sử dụng tên lớp làm tên bảng cơ sở dữ liệu. Nếu bạn muốn bảng có tên khác, hãy đặt thuộc tính tableName của chú thích `@Entity`. Tương tự, bạn có thể sử dụng thuộc tính name của chú thích `@ColumnInfo` để xác định tên của các cột.
```kotlin
@Entity(tableName = "users")
```
* Nếu bạn không muốn duy trì bất kỳ trường nào, bạn có thể chú thích chúng bằng cách sử dụng `@Ignore`.
```kotlin
@Ignore val picture: Bitmap?
```
* Bạn có thể sử dụng thuộc tính chỉ số của annotated `@Entity` để thêm chỉ số vào một entity. Ngoài ra, bạn có thể tạo các chỉ mục duy nhất bằng cách đặt thuộc tính duy nhất của chú thích `@Index` thành true.
```kotlin
@Entity(indices = arrayOf(Index(value = ["last_name", "address"])))@Entity(indices = arrayOf(Index(value = ["first_name", "last_name"],
        unique = true)))
 ```
 
 # Data Access Object (DAO)
DAO cung cấp một API để truy cập cơ sở dữ liệu. Đây là giao diện được chú thích bằng chú thích `@Dao`. Tất cả các phương thức trong giao diện này được sử dụng để lấy dữ liệu từ cơ sở dữ liệu hoặc thực hiện các thay đổi đối với cơ sở dữ liệu. Các phương thức này được chú thích bằng các chú thích như `@Query, @Insert, @Delete`.
```kotlin
@Dao
interface UserDao {
  @Query("SELECT * FROM user")
  fun getAll(): List<User>
  
  @Query("SELECT * FROM user WHERE uid IN (:userIds)")
  fun loadAllByIds(userIds: IntArray): List<User>
  
  @Insert
  fun insertAll(vararg users: User)
  
  @Delete
  fun delete(user: User)
}
```
> **Note:** Tất cả các truy vấn sử dụng UserDao được thực hiện trên chuỗi người gọi. Vì vậy, bạn nên cẩn thận rằng không có phương thức nào được gọi từ UI(main) thread.

# Type Converters
Đôi khi, bạn có thể cần phải duy trì một kiểu dữ liệu tùy chỉnh trong một cột cơ sở dữ liệu. Bạn có thể sử dụng bộ chuyển đổi kiểu cho các trường hợp sử dụng kiểu này.
```kotlin
class Converters {
  @TypeConverter
  fun fromTimestamp(value: Long?): Date? {
  return value?.let { Date(it) }
  }

  @TypeConverter
  fun dateToTimestamp(date: Date?): Long? {
  return date?.time?.toLong()
  }
}
```
Tiếp theo, bạn phải thêm chú thích `@TypeConverters` vào lớp `RoomDatabase` để Room có thể sử dụng trình chuyển đổi mà bạn đã xác định cho từng entity và DAO trong `RoomDatabase` đó.
```kotlin
@Database(entities = arrayOf(User::class), version = 1)
@TypeConverters(Converters::class)
abstract class UserDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

# Kết
Trên đây là tất cả những gì cơ bản về Room, hi vọng bài viết này sẽ giúp ích cho ae :D.

Nguồn tham khảo: https://blog.mindorks.com/introduction-to-room-persistent-library-in-android