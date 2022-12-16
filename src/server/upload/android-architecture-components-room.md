## 1. Introduction

`Room` là thư viện lưu trữ lâu dài cung cấp một abstraction layer dựa trên `SQLite` cho phép truy cập CSDL mạnh mẽ hơn trong khi khai thác được toàn bộ sức mạnh của `SQLite`. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về những thành phần cơ bản và cách mà `Room` hoạt động nhé. 

## 2. Components in Room

![](https://images.viblo.asia/f165f26b-b1a0-4ff2-b6cb-f5941125272b.png)

`Room` bao gồm 3 thành phần chính :

 * `Entity` : Class được lưu trữ trong database. Mỗi class được chú thích bởi annotation @Entity tương ứng với một bảng trong cơ sở dữ liệu. Mỗi thực thể tương ứng với một dòng trong bảng.
 * `DAO` : Bao gồm các phương thức để thao tác với cơ sở dữ liệu (Data Access Object)
 * `Database` : Bao gồm database holder và đóng vai trò là điểm truy cập đến cơ sở dữ liệu.

## 3. Entity

Với mỗi một class được chú thích @Entity, một bảng tương ứng được tạo ra trong cơ sở dữ liệu.

Mặc định, Room tạo ra mỗi cột ứng với một trường trong class. Tuy nhiên, nếu không muốn lưu trữ một trường nào đó, bạn có thể chú thích bằng annotation @Ignore.

Ví dụ :

~~~java
@Entity
public class User {
    @PrimaryKey
    public int id;

    public String firstName;
    public String lastName;

    @Ignore
    Bitmap picture;
}
~~~

### 3.1 Primary Key

Mỗi entity phải định nghĩa ít nhất một trường làm khoá chính, kể cả trường hợp chỉ có một trường. 

Trường được chọn làm khoá chính được chú thích bằng annotation @PrimaryKey.

Nếu muốn định nghĩa nhiều trường làm khoá chính, có thể sử dụng thuộc tính **primaryKeys** của annotation @Entity. Ví dụ:

~~~java
@Entity(primaryKeys = {"firstName", "lastName"})
public class User {
    public String firstName;
    public String lastName;

    @Ignore
    Bitmap picture;
}
~~~

### 3.2. Custom table name, attributes

Mặc định, `Room` sử dụng tên class để đặt tên cho các bảng. 

Để đặt tên khác cho bảng, sử dụng thuộc tính **tableName** của @Entity. 

Tương tự, `Room` cũng sử dụng tên các trường trong class để đặt tên các cột trong bảng. Để thay đổi tên mặc định cho các cột, sử dụng annotation @ColumnInfo với thuộc tính name.

Ví dụ:

~~~java
@Entity(tableName = "users")
public class User {
    @PrimaryKey
    public int id;

    @ColumnInfo(name = "first_name")
    public String firstName;

    @ColumnInfo(name = "last_name")
    public String lastName;

    @Ignore
    Bitmap picture;
}
~~~

### 3.3. Index specific columns

Nếu ứng dụng của bạn phải hỗ trợ các bản SDK không cho phép sử dụng các thực thể hỗ trợ bởi FTS-3 hay FTS-4, bạn vẫn có thể đánh index các cột nhất định trong database để tăng tốc truy vấn.

Để đánh index, sử dụng thuộc tính **indices** trong annotation @Enitity.


Ví dụ:

~~~java
@Entity(indices = {@Index("name"),
        @Index(value = {"last_name", "address"})})
public class User {
    @PrimaryKey
    public int id;

    public String firstName;
    public String address;

    @ColumnInfo(name = "last_name")
    public String lastName;

    @Ignore
    Bitmap picture;
}
~~~

Trường hợp muốn một trường là duy nhất trong database, có thể gán thuộc tính **unique** bằng **true**.

### 3.4. Define relationships between objects

#### 3.4.1 Define one-to-many relationships

`Room` cho phép định nghĩa quan hệ giữa các đối tượng thông qua khoá ngoại.

Ví dụ, có một entity là **Book**, bạn có thể định nghĩa quan hệ với enity **User** thông qua annotation @ForeignKey.
~~~java

@Entity(foreignKeys = @ForeignKey(entity = User.class,
                                  parentColumns = "id",
                                  childColumns = "user_id"))
public class Book {
    @PrimaryKey
    public int bookId;

    public String title;

    @ColumnInfo(name = "user_id")
    public int userId;
}
~~~

#### 3.4.2. Create nested objects

Xét ví dụ class Address bao gồm các trường street, city, state và postCode, class User có một trường có kiểu Address. 

Tuy nhiên, bạn lại không có nhu cầu lưu Address thành một bảng riêng, mà muốn bảng User chứa các thuộc tính của Address. Trong trường hợp này có thể sử dụng annotation Embedded.

~~~java

public class Address {
    public String street;
    public String state;
    public String city;

    @ColumnInfo(name = "post_code")
    public int postCode;
}

@Entity
public class User {
    @PrimaryKey
    public int id;

    public String firstName;

    @Embedded
    public Address address;
}
~~~
Khi đó, bảng biểu diễn class User bao gồm các trường id, firstName, street, state, city, post_code.

#### 3.4.3. Define many-to-many relationships

Giả sử bạn muốn liên kết nhiều nhiều giữa các entity với nhau.

Chẳng hạn, bạn có một ứng dụng phát nhạc và user có thể sắp xếp các bài hát của họ vào playlist. Mỗi playlist có thể có một hoặc nhiều bài hát và mỗi bài hát có thể nằm trong nhiều playlist khác nhau.

Bạn có thể định nghĩa từng Entity độc lập như sau :
~~~java

@Entity
public class Playlist {
    @PrimaryKey public int id;

    public String name;
    public String description;
}

@Entity
public class Song {
    @PrimaryKey public int id;

    public String songName;
    public String artistName;
}
~~~

Sau đó, định nghĩa lớp trung gian như một Entity chứa khóa ngoại tham chiếu đến Song và Playlist.

~~~java
@Entity(tableName = "playlist_song_join",
        primaryKeys = { "playlistId", "songId" },
        foreignKeys = {
                @ForeignKey(entity = Playlist.class,
                            parentColumns = "id",
                            childColumns = "playlistId"),
                @ForeignKey(entity = Song.class,
                            parentColumns = "id",
                            childColumns = "songId")
                })
public class PlaylistSongJoin {
    public int playlistId;
    public int songId;
}
~~~

Khi đó bạn đã tạo ra quan hệ nhiều nhiều nhiều cho phép sử dụng DAO để query Playlist by song và Song by Playlist :

~~~java
@Dao
public interface PlaylistSongJoinDao {
    @Insert
    void insert(PlaylistSongJoin playlistSongJoin);

    @Query("SELECT * FROM playlist " +
           "INNER JOIN playlist_song_join " +
           "ON playlist.id=playlist_song_join.playlistId " +
           "WHERE playlist_song_join.songId=:songId")
    List<Playlist> getPlaylistsForSong(final int songId);

    @Query("SELECT * FROM song " +
           "INNER JOIN playlist_song_join " +
           "ON song.id=playlist_song_join.songId " +
           "WHERE playlist_song_join.playlistId=:playlistId")
    List<Song> getSongsForPlaylist(final int playlistId);
}
~~~

### 4. Accessing data using Room DAOs

`DAO` là thành phần chịu trách nhiệm định nghĩa các phương thức truy cập cơ sở dữ liệu.
`DAO` có thể là một **interface** hoặc **abstract class**. 

#### 4.1. Define methods for convenience

`Room` cho phép định nghĩa các thao tác thêm, sửa, xoá dữ liệu thông qua các annotation @Insert, @Update, @Delete.

Ví dụ :

~~~java
@Dao
public interface MyDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertUsers(User... users);

    @Insert
    public void insertBothUsers(User user1, User user2);

    @Insert
    public void insertUsersAndFriends(User user, List<User> friends);

    @Update
    public void updateUsers(User... users);

    @Delete
    public void deleteUsers(User... users);
}
~~~

#### 4.2. Query for information

@Query là annotation chính được sử dụng với `DAO`, nó cho phép bạn thực hiện đọc/ghi trên cơ sở dữ liệu.
Mỗi phương thức @Query sẽ được xác minh tại thời điểm biên dịch. Vì vậy, nếu có vấn đề gì với câu truy vấn, sẽ báo lỗi **compile** thay vì lỗi **runtime**.

Ví dụ :
~~~java
@Dao
public interface MyDao {
    @Query("SELECT * FROM user")
    public User[] loadAllUsers();
}
~~~
## 5. Database

Database class được chú thích bởi annotation @Database và cần đáp ứng các yêu cầu sau :

* Là abstract class extends RoomDatabase.
* Bao gồm danh sách các thực thể được liên kết với CSDL trong annotation.
* Chứa một abstract method không có tham số truyền vào và trả về class được chú thích với annotation @Dao.

Ví dụ :
~~~java
@Database(entities = {User.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserDao userDao();
}
~~~

Tại runtime, bạn có thể tạo một instance của Database bằng cách gọi `Room.databaseBuilder()` hoặc `Room.inMemoryDatabaseBuilder()`.

~~~java
AppDatabase db = Room.databaseBuilder(getApplicationContext(),
        AppDatabase.class, "database-name").build();
~~~

**Note**

Nếu ứng dụng của bạn chạy single process. bạn nên tuân theo singleton design pattern khi khởi tạo đối tượng `AppDatabase`.

Nếu ứng dụng của bạn chạy multi process, hãy thêm `enableMultiInstanceInvalidation()` khi tạo database builder. Với cách đó, khi bạn có một instance của AppDatabase trong mỗi process, bạn có thể invalidate tệp database được chia sẻ  trong một process, và việc invalidation này sẽ được tự động chuyển tới các instance của AppDatabase trong các process khác.

## 6. References

* https://developer.android.com/topic/libraries/architecture/room
* https://developer.android.com/training/data-storage/room/index.html