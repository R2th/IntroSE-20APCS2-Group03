# Giới thiệu
Chào 500 ae! Hôm nay mình sẽ tiếp tục series tìm hiểu về thư viện Room trong Android.

Ở bài trước [(Link)](https://viblo.asia/p/tim-hieu-ve-thu-vien-room-trong-android-07LKXLEEKV4), mình đã trình bày về cách chúng ta có thể sử dụng thư viện Room để tạo cơ sở dữ liệu quan hệ rất dễ dàng. Một số lợi thế của việc sử dụng Room là xác minh truy vấn thời gian biên dịch, không có mã soạn sẵn và dễ dàng tích hợp với RxJava, LiveData và Kotlin Coroutines. Tất cả những lợi thế này trong Room đều đạt được bằng cách sử dụng Data Access Objects (DAO).

Trong bài viết này, chúng ta sẽ thảo luận chi tiết về Data Access Objects (DAO).

Trong Room, DAO được sử dụng để truy cập dữ liệu lâu dài của ứng dụng của bạn. Chúng là cách tốt hơn và mang tính mô-đun để truy cập cơ sở dữ liệu của bạn so với trình tạo truy vấn hoặc truy vấn trực tiếp.

DAO có thể là một interface hoặc một abstract class. Nếu đó là một lớp trừu tượng, nó có thể tùy chọn có một phương thức khởi tạo lấy RoomDatabase làm tham số duy nhất của nó. Room tạo mỗi triển khai DAO tại thời điểm biên dịch.

Bạn có thể thực hiện nhiều hoạt động bằng cách sử dụng DAO như Insertion, Updation, Deletion và thực hiện các truy vấn khác. Ngoài ra, bạn có thể dễ dàng tích hợp LiveData, RxJava Observables, Kotlin Coroutines trong DAO.

# Insertion
Khi bạn tạo một phương thức DAO và chú thích nó bằng `@Insert`, Room sẽ tạo một triển khai chèn tất cả các tham số vào cơ sở dữ liệu trong **single transaction**.
```kotlin
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUsers(vararg users: User)    @Insert
    fun insertBothUsers(user1: User, user2: User)    @Insert
    fun insertUsersAndFriends(user: User, friends: List<User>)
}
```
Tham số chú thích `onConflict` cho biết phải làm gì nếu xung đột xảy ra khi chèn. Nó có thể nhận các giá trị sau:
* **OnConflictStrategy.REPLACE** : Để thay thế dữ liệu cũ và tiếp tục transaction
* **OnConflictStrategy.ROLLBACK** : Để khôi phục transaction.
* **OnConflictStrategy.ABORT** : Để hủy bỏ transaction. transaction được quay trở lại.
* **OnConflictStrategy.FAIL** : Để transaction thất bại. transaction được quay trở lại.
* **OnConflictStrategy.NONE** : Để bỏ qua xung đột.

> Lưu ý: Các chiến lược ROLLBACK và FAIL không được dùng nữa. Sử dụng ABORT để thay thế.

# Updation
Khi bạn tạo một phương thức DAO và chú thích nó bằng `@Update`, Room sẽ tạo một triển khai sửa đổi một tập hợp các thực thể, được cung cấp dưới dạng tham số, trong cơ sở dữ liệu. Nó sử dụng một truy vấn khớp với khóa chính của mỗi thực thể.
```kotlin
@Dao
interface UserDao {
    @Update(onConflict = OnConflictStrategy.REPLACE)
    fun updateUsers(vararg users: User)    @Update
    fun update(user: User)
}
```
# Deletion
Khi bạn tạo một phương thức DAO và chú thích nó bằng `@Delete`, Room sẽ tạo một triển khai loại bỏ một tập hợp các thực thể, được cung cấp dưới dạng tham số, khỏi cơ sở dữ liệu. Nó sử dụng các khóa chính để tìm các thực thể cần xóa.
```kotlin
@Dao
interface UserDao {
    @Delete
    fun deleteUsers(vararg users: User)
}
```
# Simple queries
`@ Query` là chú thích chính được sử dụng trong các lớp DAO. Nó cho phép bạn thực hiện các thao tác đọc / ghi trên cơ sở dữ liệu. Mỗi phương thức `@ Query` đều được xác minh tại thời điểm biên dịch, vì vậy nếu có vấn đề với truy vấn, lỗi biên dịch sẽ xảy ra thay vì lỗi thời gian chạy.

Room cũng xác minh giá trị trả về của truy vấn sao cho nếu tên của trường trong đối tượng được trả về không khớp với tên cột tương ứng trong phản hồi truy vấn, Room sẽ thông báo cho bạn theo một trong hai cách sau:
* Nó đưa ra một warning nếu chỉ một số tên trường trùng khớp.
* Nó đưa ra một error nếu không có tên trường nào phù hợp.

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun loadAllUsers(): Array<User>
}
```
## Chuyển các tham số vào truy vấn
Các tham số được truyền cho các phương thức DAO có thể được sử dụng vào truy vấn được viết bằng chú thích @Query.
```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users WHERE age BETWEEN :minAge AND :maxAge")
    fun loadAllUsersBetweenAges(minAge: Int, maxAge: Int): Array<User>

    @Query("SELECT * FROM users WHERE first_name LIKE :search " +
           "OR last_name LIKE :search")
    fun findUserWithName(search: String): List<User>
}
```
## Trả lại tập hợp con của các cột
Bạn cũng có thể trả về các tập hợp con của các cột từ một truy vấn trong Room.
```kotlin
data class NameTuple(
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?
)@Dao
interface UserDao {
    @Query("SELECT first_name, last_name FROM users")
    fun loadFullName(): List<NameTuple>
}
```
## Truy cập trực tiếp con trỏ
Nếu logic của ứng dụng của bạn yêu cầu quyền truy cập trực tiếp vào các hàng trả về, bạn có thể trả về đối tượng `Cursor` từ các truy vấn của mình.
```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun loadAllUsers(): Cursor
}
```
## Truy vấn nhiều bảng
Một số truy vấn của bạn có thể yêu cầu quyền truy cập vào nhiều bảng để tính toán kết quả. Room cho phép bạn viết bất kỳ truy vấn nào, vì vậy bạn cũng có thể join table. Hơn nữa, nếu phản hồi là kiểu dữ liệu observable, chẳng hạn như `Flowable` hoặc `LiveData`, Room sẽ xem tất cả các bảng được tham chiếu trong truy vấn để tìm kiếm sự vô hiệu.
```kotlin
@Dao
interface BookDao {
    @Query(
        "SELECT * FROM book " +
        "INNER JOIN loan ON loan.book_id = book.id " +
        "INNER JOIN user ON user.id = loan.user_id " +
        "WHERE users.name LIKE :userName"
    )
    fun findBooksBorrowedByNameSync(userName: String): List<Book>
}
```
## Truy vấn trả về type
Room hỗ trợ nhiều loại trả về cho các phương thức truy vấn, bao gồm trả về type chuyên biệt cho khả năng tương tác với các khung hoặc API cụ thể.
![](https://images.viblo.asia/e1308231-e481-4b64-a415-c8f4d9471eea.png)

Bạn có thể trả về `LiveData`, `Observable` và `Flow` từ các phương thức truy vấn. Ngoài ra, bạn có thể thực hiện chức năng tạm ngưng phương pháp DAO. Những điều này được thảo luận trong các bài riêng biệt.

# Kết luận
Trên đây là tất cả về DAO trong Room. Hi vọng bài viết của mình sẽ giúp ích được cho ae! Cảm ơn cả nhà đã đọc đến tận đây :D

Nguồn tham khảo: https://blog.mindorks.com/data-access-objects-dao-in-room