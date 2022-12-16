Chào các bạn 
Như các bạn đã biết thì Room database được giới thiệu như là một phần trong [Android Jetpack.](https://developer.android.com/jetpack/) 
Ok , cùng đi vào tìm hiểu thôi ! 
### Room database là gì ? 
**Room database** Với mục đích để thay thế SQLite có quá nhiều nhược điểm ,cũng như giúp cho các developer giảm tải được code trong project .

**Room database** cung cấp một lớp trừu tượng trên cơ sở của  SQLite và cho phép truy cập cơ sở dữ liệu mạnh hơn cũng như tận dùng lại được toàn bộ sức mạnh của SQLite đã vốn có .

Library này sẽ giúp bạn tạo bộ nhớ cache dữ liệu của ứng dụng . Cho phép bạn có thể lưu trữ và lấy lại dữ liệu khi cần .

Room batabase bao gồm  3 major component như sau : 

+ [Database](https://developer.android.com/reference/android/arch/persistence/room/Database) đóng vai trò là điểm truy cập chính cho kết nối với cơ sở dữ liệu của bạn

+ [Entity](https://developer.android.com/training/data-storage/room/defining-data): Như là một table trong database , đại diện của một class Entity 

+ [DAO](https://developer.android.com/training/data-storage/room/accessing-data): Chứa các menthod dùng để truy cập database .Cơ bản sẽ là [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) data 



Để hiểu xem Room database làm được những gì các bạn có thể xem thêm tại đây [Room Persistence Library](https://developer.android.com/topic/libraries/architecture/room)

Nhưng hôm nay mình sẽ giới thiệu đến các bạn một số  Annotations của Room database và cách sử dụng chúng 

### Các Annotations trong Room database 
#### 1 ) @Entity , @ColumnInfo , @PrimaryKey , @Index 
##### @Entity
Đánh dấu một class là một entity. Class này sẽ có một bảng SQLite ánh xạ trong cơ sở dữ liệu.

+ Mỗi entity phải có ít nhất 1 field được chú thích bằng @PrimaryKey.
Bạn cũng có thể sử dụng thuộc tính primaryKeys () để xác định khóa chính.

+ Khi một class  được đánh dấu là một Entity , tất cả các field  của nó được present. Nếu bạn muốn loại trừ một số field của nó, bạn có thể đánh dấu chúng bằng @Ignore.
+ Nếu một field  là *transient* , nó sẽ tự động bị bỏ qua trừ khi nó được chú thích bằng @ColumnInfo, @Embedded hoặc @Relation.
+ 
 VD : 
```
 @Entity
 public class User {
   @PrimaryKey
   private final int uid;
   private String name;
   @ColumnInfo(name = "last_name")
   private String lastName;

   public User(int uid) {
       this.uid = uid;
   }
   public String getLastName() {
       return lastName;
   }
   public void setLastName(String lastName) {
       this.lastName = lastName;
   }
 }
 
```
##### @PrimaryKey 
Đánh dấu một field trong entity như là primary key.
+ Nếu bạn muốn define primary key kết hợp bạn có thể dùng [primaryKeys()](https://developer.android.com/reference/android/arch/persistence/room/Entity#primaryKeys()) method.
+ Mỗi entity phải khai báo một khóa chính trừ khi một trong các class supper của nó đã khai báo một khóa chính. 
+ Nếu cả một entity và class supper của nó định nghĩa một PrimaryKey, thì định nghĩa PrimaryKey của class childrent sẽ bị ghi đè  PrimaryKey của class supper.
+  Nếu chú thích PrimaryKey được sử dụng trên field có gắn @Embeddedd, tất cả các cột kế thừa từ field được @Embeddedd đó sẽ trở thành composite primary key

##### @ForeignKey 
Khai báo một foreign key trên một Entity khác. 

+ Các ForeignKey cho phép bạn chỉ định các ràng buộc trên các Entyti sao cho SQLite sẽ đảm bảo rằng mối quan hệ là hợp lệ khi bạn sửa đổi cơ sở dữ liệu. 
+ Khi một ràng buộc ForeignKey được xác định, SQLite yêu cầu các cột được tham chiếu là một phần của một chỉ mục duy nhất trong bảng cha hoặc khóa chính của bảng đó.

##### @ColumnInfo
Cho phép tùy chỉnh specific field  được gắn với Annotations này.

VD : 

```
@ColumnInfo(name = "first_name")

 public String firstName;
```



#### 2 ) @DAO , @Insert , @Delete , @Query 
@DAO  Đánh dấu class này như là một  Data Access Object 

Lưu ý :
+ Class được gắn @DAO cần phải là một interface hoặc một abstract class 
+ Các query này sẽ chỉ được **verified at compile time** 

```
@Dao
public interface MyDao {
  // CURD data 
}
```

Trong class DAO các method sẽ được gắn các Annotations tương ứng như  @Insert , @Delete , @Query (kiểu CRUD data) 
Trong mỗi Annotations này các bạn có thể viết các câu query hoặc có các tùy chọn tùy ý .  
  ##### @Query 
+ Các arguments của phương thức sẽ được gắn kết với các arguments liên kết trong câu lệnh SQL. 
 Room chỉ hỗ trợ đặt tên các arguments ràng buộc theo kiểu **:arguments** để tránh nhầm lần giữa các arguments truy vấn và arguments tham số

```
    @Query ("SELECT * FROM user WHERE user_name LIKE: name AND last_name LIKE: last")
     public abstract List <User> findUsersByNameAndLastName (String name, String last);
```

 + Như là phần mở rộng của SQLite , Room hỗ trợ truyền vào các arguments là một list của các parameter query 
 
```
  @Query("SELECT * FROM user WHERE uid IN(:userIds)")
     public abstract List findByIds(int[] userIds);
```

 Query trên sẽ tương đương với việc Room sẽ chạy truy vấn là 
 SELECT * FROM user WHERE uid IN(?, ?, ?) 
 
 và lần lượt bind mỗi item của userIds vào trong câu lệnh 
 

##### @Delete 
Method được gắn với annotations này  sẽ xóa các tham số của nó khỏi cơ sở dữ liệu. 

Tất cả các tham số của method Delete phải là các class được gắn với @Entity hoặc các collections/array của class @Entity đó 

VD :
```
 @Delete
     public void deleteUsers(User... users);
     @Delete
     public void deleteAll(User user1, User user2);
     @Delete
     public void deleteWithFriends(User user, List<User> friends);
```

##### @Insert 
Ngược với @Delete annotations này sẽ insert thêm một hoặc nhiều bản ghi vào cơ sở dữ liệu 
```
 @Insert(onConflict = OnConflictStrategy.REPLACE)
     public void insertUsers(User... users);
     @Insert
     public void insertBoth(User user1, User user2);
     @Insert
     public void insertWithFriends(User user, List<User> friends);
```



Trên đây mà một số annotations cơ bản trong Room database . Huy vọng nó sẽ hữu ích với các bạn 

Refer :
https://developer.android.com/topic/libraries/architecture/room
https://developer.android.com/training/data-storage/room/accessing-data