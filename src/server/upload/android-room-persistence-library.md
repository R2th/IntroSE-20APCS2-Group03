# Android Room Persistence Library
## 1. Giới thiệu
Room là persistence library cung cấp một abstraction layer trên SQLite cho phép truy cập dễ dàng hơn và khai thác được hết sức mạnh của SQLite. 

Ba thành phần chính trong Room: 
* **Database**: Chứa database holder và phục vụ như điểm truy cập chính cho các kết nối cơ bản.
    Class sẽ được annotated bằng `@Database` và thỏa các điều kiện sau: 
    * Abstract class và extends từ `RoomDatabase`.
    * Include danh sách các entities được annotated bằng `@Entity`.
    * Chứa abstract method không có các arguments và trả về class được annotated bằng `@Dao`.
    
    Ở runtime,  ta có thể có một instance của Database bằng việc gọi `Room.databaseBuilder()` hoặc `Room.inMemoryDatabaseBuilder()`.
* **Entity**: Đại diện cho một table trong database.
* **DAO**: Chứa các method được dùng để truy cập vào database.

**Room architecture diagram**
![](https://images.viblo.asia/ac1574c0-a69c-416c-9c42-6282afbd7b40.png)

## 2. Dependencies
```
dependencies {
    def room_version = "1.1.1"

    implementation "android.arch.persistence.room:runtime:$room_version"
    annotationProcessor "android.arch.persistence.room:compiler:$room_version" // use kapt for Kotlin

    // optional - RxJava support for Room
    implementation "android.arch.persistence.room:rxjava2:$room_version"

    // optional - Guava support for Room, including Optional and ListenableFuture
    implementation "android.arch.persistence.room:guava:$room_version"

    // Test helpers
    testImplementation "android.arch.persistence.room:testing:$room_version"
}
```
## 3. Entity
### Primary key và column 
Mỗi entity phải định nghĩa ít nhất một field như một primary key. Thậm chí khi chỉ có 1 field, ta vẫn phải annotate field đó với `@PrimaryKey` annotation. Nếu chúng ta muốn Room assign ID tự động, ta có thể set `autoGenerate` property của `@PrimaryKey`. Nếu entity có một composite primary key, ta có thể dùng  `primaryKeys` property của `@Entity`.
```
@Entity(primaryKeys = arrayOf("firstName", "lastName"))
data class User(
    @PrimaryKey var id,
    var firstName: String?,
    var lastName: String?
)
```
Mặt định thì Room sử dụng tên của class làm tên của table, nếu ta muốn chỉnh sửa điều này ta có thể sử dụng `tableName` property của `@Entity` annotation.
```
@Entity(tableName = "users")
data class User (
    // ...
)
```
Tương tự vậy, Room cũng dùng tên field làm tên cho column. Để chỉnh sửa điều này ta sử dụng `name` property của `@ColumnInfo ` annotation.
```
@Entity(tableName = "users")
data class User (
    @PrimaryKey var id: Int,
    @ColumnInfo(name = "first_name") var firstName: String?,
    @ColumnInfo(name = "last_name") var lastName: String?
)
```
### Ignore fields
Room sẽ tạo một column cho mỗi field được định nghĩa trong entity, để Room phớt lờ đi một field và không coi đó là một column, ta phải annotate  `@Ignore` cho field đó. 
```
@Entity
data class User(
    @PrimaryKey var id: Int,
    var firstName: String?,
    var lastName: String?,
    @Ignore var picture: Bitmap?
)
```
Trong trường hợp entity kế thừa field từ parent entity, ta có thể dùng `ignoredColumns` property của `@Entity` như bên dưới: 
```
open class User {
    var picture: Bitmap? = null
}

@Entity(ignoredColumns = arrayOf("picture"))
data class RemoteUser(
    @PrimaryKey var id: Int,
    var hasVpn: Boolean
) : User()
```
### Quan hệ giữa các Object
SQLite là một cơ sở dữ liệu quan hệ, nên ta hoàn toàn có thể chỉ ra mối quan hệ giữa các object với Room. 
Ví dụ, ta có một entity `Book`có quan hệ với entity là `User`, ta có thể dùng `@ForeignKey` annotation để thể hiện điều này.
```
@Entity(foreignKeys = arrayOf(ForeignKey(
            entity = User::class,
            parentColumns = arrayOf("id"),
            childColumns = arrayOf("user_id"))
       )
)
data class Book(
    @PrimaryKey var bookId: Int,
    var title: String?,
    @ColumnInfo(name = "user_id") var userId: Int
)
```
Foreign keys rất mạnh, nó cho phép ta thấy rõ những gì sẽ xảy ra khi một entity được tham chiếu updated. Cụ thể hơn, ta có thể delete tất cả `Book` của `User` nếu user này bị delete, bằng việc include `onDelete = CASCADE` trong `@ForeignKey` annotation.
### Create nested objects
Đôi khi ta muốn thể hiện một entity nhanh chóng hoặc POJO (Plain old Java object). Ta có thể dùng `@Embedded` annotation.
Ví dụ, một `User` chứa một field kiểu `Address`, để lưu field này vào table ta sẽ thêm `@Embedded` như bên dưới. 
```
data class Address(
    var street: String?,
    var state: String?,
    var city: String?,
    @ColumnInfo(name = "post_code") var postCode: Int
)

@Entity
data class User(
    @PrimaryKey var id: Int,
    var firstName: String?,
    @Embedded var address: Address?
)
```
Table `User` sẽ thể hiện các column như sau: `id`, `firstName`, `street`, `state`, `city`, và `post_code`.

***Xem thêm**: https://developer.android.com/training/data-storage/room/defining-data*
## 4. DAO
Để truy cập vào dữ liệu của App thông qua Room persistence library, ta sẽ làm việc với *data access objects*, hoặc DAOs.

**`Insert`**
Room tạo ra một implementation để inserts tất cả parameters vào database trong một single transaction.
```
@Dao
interface MyDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUsers(vararg users: User)

    @Insert
    fun insertBothUsers(user1: User, user2: User)

    @Insert
    fun insertUsersAndFriends(user: User, friends: List<User>)
}
```
Nếu `@Insert` method chỉ nhận một parameter, nó sẽ trả về một kiểu `long` thể hiện `rowId` cho item mới inserted. Còn khi parameter là một array hoặc collection nó sẽ trả về `long[] ` hoặc `List<Long>`. 

**`Update`**
Được dùng để cập nhật thay đổi cho một entity. Nó xác định entity cần sửa đổi bằng primary key của entity đó. 
```
@Dao
interface MyDao {
    @Update
    fun updateUsers(vararg users: User)
}
```
**`Delete`**
Tương tự với `Update`, `Delete` cho phép xoá một entity thông qua khoá chính của nó. 
```
@Dao
interface MyDao {
    @Delete
    fun deleteUsers(vararg users: User)
}
```
**`Query`**
Annotation chính được dùng trong DAO classes. Nó cho phép thực hiện read/write vào database với một custom query. `@Query` verified lúc compile time. Nên chúng ta dễ dàng phát hiện vấn đề xảy ra khi compile, thay vì một runtime failure.
* Simple queries
```
@Dao
interface MyDao {
    @Query("SELECT * FROM user")
    fun loadAllUsers(): Array<User>
}
```
* Passing parameters into the query
```
@Dao
interface MyDao {
    @Query("SELECT * FROM user WHERE age > :minAge")
    fun loadAllUsersOlderThan(minAge: Int): Array<User>
    
    @Query("SELECT * FROM user WHERE age BETWEEN :minAge AND :maxAge")
    fun loadAllUsersBetweenAges(minAge: Int, maxAge: Int): Array<User>

    @Query("SELECT * FROM user WHERE first_name LIKE :search " + "OR last_name LIKE :search")
    fun findUserWithName(search: String): List<User>
}
```

***Xem thêm**: https://developer.android.com/training/data-storage/room/accessing-data*
## 5. Database 
AppDatabase: Liên kết với DAO thông qua một abstract method, việc implement các method của DAO sẽ được thực hiện bởi Room. 
```
@Database(entities = arrayOf(User::class), version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```
Cuối cùng ta có thể tạo một thể hiện của database như bên dưới: 
```
val db = Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java, "database-name"
        ).build()
```

## Tham khảo
1. https://developer.android.com/training/data-storage/room/
2. https://github.com/googlesamples/android-architecture-components/tree/master/BasicSample