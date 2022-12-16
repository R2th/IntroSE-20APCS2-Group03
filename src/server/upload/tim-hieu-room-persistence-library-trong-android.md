# 1. Lời dẫn
   Đối với những nhà phát triển ứng dụng Android, việc chuyển đổi dữ liệu dạng thô thành cơ sở dữ liệu dạng cấu trúc để lưu trữ trong bộ nhớ là một điều không quá khó khăn đúng không nào? Android cung cấp sẵn cho chúng ta thư viện SQLite cho phép thực hiện các tác vụ CRUD (Create, Read, Update and Delete) để thao tác với dữ liệu trong cơ sở dữ liệu. Các classes và interfaces cho SQLite được cung cấp trong gói android.database.
   
   Thoạt đọc đến đây, ai cũng thấy rằng sử dụng SQLite khi làm việc với cơ sở dữ liệu quá tốt rồi, thế còn gì để bàn ở đây nữa nhỉ? Nhưng khoan, hãy để ý kỹ có thể thấy chính SQLite cũng tồn tại một vài nhược điểm sau (các bạn nào đã từng sử dụng SQLite có thể kiểm chứng điều này nhé):
*    Không hỗ trợ cho việc xác thực câu lệnh truy vấn SQL thời điểm compile-time.
*    Khi có thay đổi từ data graph, bạn sẽ phải cập nhật lại các câu truy vấn SQL thủ công.
*    Khi sử dụng SQLite bạn sẽ phải viết những đoạn code lặp đi lặp lại vừa tốn thời gian vừa dễ mắc lỗi.
               
   Để khắc phục những vấn đề trên, Google đã giới thiệu cho chúng ta Room Persistence Library. Vậy Room là gì, chúng ta cùng nhau tìm hiểu nhé!
   
# 2. Giới thiệu Room Persistence Library
   Room persistence library cung cấp lớp trừu tượng thông qua SQLite cho phép truy cập dữ liệu mạnh hơn trong khi vẫn có đầy đủ sức mạnh của SQLite.
    
Room là thư viện trong nhóm Architecture Components thuộc bộ [Android Jetpack](https://developer.android.com/jetpack/)
    
>   Room is fluent SQLite database access
-----
##    How to import Room?
*    Mở buile.gradle và thêm google repository như sau:  

```java
        allprojects { 
            repositories {
            jcenter()
            google()
            }
         }
```
                

*    Mở build.gradle (app) và thêm dòng lệnh sau vào trong dependencies:        
```java
        dependencies {
            implementation "android.arch.persistence.room:runtime:1.1.1"
            annotationProcessor "android.arch.persistence.room:compiler:1.1.1"
        }
```        
# 3. Các thành phần chính trong Room
Có 3 thành phần chính trong Room: **Entity**, **DAO** và **Database**
    ![](https://images.viblo.asia/4f2d1116-80ac-4bc9-9cb7-86d3fa5cd337.png)

*Hình 1: Sơ đồ cấu trúc Room*                                                                                
Sau đây chúng ta cùng đi tìm hiểu về từng thành phần nhé!
##     3.1. Entity
Entity đại diện cho 1 bảng trong cơ sở dữ liệu
        

-----
Tìm hiểu Room thông qua ví dụ sau để hiểu hơn. Bài toán quản lý cơ sở dữ liệu User

User.java
```java
@Entity
public class User {
    @PrimaryKey
    private int uid;
    @ColumnInfo(name = "first_name")
    private String firstName;
    @ColumnInfo(name = "last_name")
    private String lastName;
}
```
Một số annotation đáng lưu ý khi làm việc với Entity:


* **Entity** 
    Với mỗi Object được định nghĩa với annotation Entity, Room sẽ tạo ra 1 table tương ứng cho đối tượng này. 
* **tableName**
    Mặc định, Room sử dụng tên của class làm tên của table trong cơ sở dữ liệu. Nếu muốn cài đặt cho table có tên khác, bạn chỉ cần gọi thuộc tính tableName và set tên tùy ý.
```java
    @Entity(tableName = "users")
```

* **Primary key**
    Mỗi object phải xác định ít nhất 1 trường làm khóa chính, ngay cả khi chỉ có 1 trường thì vẫn cần phải sử dụng thuộc tính này. Bạn cũng có thể gán ID cho các cột tự động tăng bằng cách sử dụng thuộc tính autoGenerate (với các thuộc tính int, long)
```java
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    private int mId;
```
* **Indices**
    Nếu bạn muốn đánh index cho 1 số trường để tăng tốc độ truy vấn, có thể dùng thuộc tính indices.
```java
    @Entity(indices = {@Index("name"),
        @Index(value = {"last_name", "address"})})
```
* **Unique**
    Nếu muốn 1 số trường là duy nhất trong cơ sở dữ liệu, sử dụng unique.
```java
    @Entity(indices = {@Index(value = {"first_name", "last_name"},
        unique = true)})
```
* **ForeignKey**
    Xác định mối quan hệ giữa 2 bảng bằng cách sử dụng foreignKeys.           
```java
    @Entity(foreignKeys = @ForeignKey(entity = User.class,
                                  parentColumns = "id",
                                  childColumns = "user_id"))
```
* **Nested Object**
    Trong trường hợp tạo ra 1 object chứa các nested object mà không có nhu cầu lưu nested object đó thành bảng riêng, có thể sử dụng Embedded.
```java
    public class Address {
        public String street;
        public String state;
        public String city;
    }

    @Entity
        public class User {
        @PrimaryKey
        public int id;

        public String firstName;

        @Embedded
        public Address address;
    }
```
##     3.2. DAO
Định nghĩa các phương thức thao tác với cơ sở dữ liệu.
        
UserDAO.java
```java
@Dao
public interface UserDao {
    @Query("SELECT * FROM user")
    List<User> getAll();
    @Query("SELECT * FROM user WHERE uid IN (:userIds)")
    List<User> loadAllByIds(int[] userIds);
    @Query("SELECT * FROM user WHERE first_name LIKE :first AND "
           + "last_name LIKE :last LIMIT 1")
    User findByName(String first, String last);
    @Insert
    void insertAll(User... users);
    @Delete
    void delete(User user);
}
```
##     3.3. Database
Database đóng vai trò điểm truy cập chính cho kết nối dữ liệu.
Là 1 Database phải thỏa mãn 3 điều kiện sau:
* Là abstract class extend từ RoomDatabase.
* Bao gồm danh sách các thực thể liên kết với cơ sở dữ liệu.
* Chứa 1 abstract method không có thuộc tính nào và return class được đánh dấu là **Dao**

Tại thời điểm runtime, bạn sẽ nhận được thể hiện của Database bằng cách gọi Room.databaseBuilder() hoặc Room.inMemoryDatabaseBuilder().

```java
AppDatabase.java
@Database(entities = {User.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserDao userDao();
}
```
        
# 4. Lời kết
Đây là bài viết đầu tiên của mình được viết dựa trên những hiểu biết về Room database và dựa trên những tài liệu tham khảo nhưng không thể tránh khỏi sai sót khi trong quá trình viết bài. Mình rất mong các bạn thông cảm cũng như đóng góp ý kiến để mình hoàn thiện bài hơn trong tương lai và đừng quên đón đọc các bài viết tiếp theo của mình. 

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
# 5. Tài liệu tham khảo

https://developer.android.com/topic/libraries/architecture/room
    
https://developer.android.com/training/data-storage/room/
    
https://medium.freecodecamp.org/room-sqlite-beginner-tutorial-2e725e47bfab