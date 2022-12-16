# Giới thiệu
Chào 500 ae! Hôm nay mình sẽ tiếp tục series tìm hiểu về thư viện Room trong Android.

Ở bài trước ([Link](https://viblo.asia/p/data-access-objects-dao-trong-room-Qbq5QDQElD8)), chúng ta đã tìm hiểu về Data Access Objects - DAO trong Room. Bây giờ chúng ta sẽ tìm hiểu về các mối quan hệ của Entity trong Room nhé.

Vì SQLite là một cơ sở dữ liệu quan hệ, các thực thể có thể có mối quan hệ giữa chúng. Trong Room, các thực thể không thể tham chiếu trực tiếp đến các thực thể khác vì nó có thể gây tải dữ liệu không cần thiết mọi lúc.

Tuy nhiên, đôi khi, bạn muốn tham chiếu đến các thực thể khác từ thực thể của mình. Bạn có thể đạt được điều này bằng nhiều cách.

![](https://images.viblo.asia/b42f97b2-d698-4e5a-8e27-59b4eb2c1ff4.png)

# Embedded Objects
Bạn có thể sử dụng chú thích `@Embedded` để đại diện cho một đối tượng mà bạn muốn phân tách thành các trường con của nó trong một bảng (entity). Sau đó, bạn có thể truy vấn các trường được nhúng giống như cách bạn làm đối với các cột riêng lẻ khác.
> Các trường được nhúng cũng có thể bao gồm các trường được nhúng khác.

```kotlin
data class Address(
  val street: String?,
  val state: String?,
  val city: String?,
  val postCode: Int
)

@Entity
data class User(
  @PrimaryKey val id: Int,
  val firstName: String?,
  @Embedded val address: Address?
)
```
Sau đó, bảng đại diện cho một đối tượng `User` chứa các cột có tên sau: id, firstName, street, state, city, và postCode.

Nếu một thực thể có nhiều trường nhúng cùng loại, bạn có thể giữ cho mỗi cột là duy nhất bằng cách đặt thuộc tính `prefix`. Sau đó, Room sẽ thêm giá trị được cung cấp vào đầu mỗi tên cột trong đối tượng được nhúng.

Trong ví dụ trên, các trường của một đối tượng được phân tách thành một thực thể. Trong trường hợp bạn muốn thể hiện mối quan hệ giữa nhiều thực thể, bạn không thể sử dụng `@Embedded`.

Bạn có thể sử dụng tham số chú thích `@Relation` hoặc foreignkeys của chú thích `@Entity` để xác định mối quan hệ giữa hai thực thể. Cả hai đều khác biệt với nhau theo cách mà chú thích `@Relation` chỉ có thể được áp dụng trên một lớp không phải thực thể trong khi ForeignKey được sử dụng trên một lớp thực thể. Ngoài ra, ForeignKey ảnh hưởng đến lược đồ của một thực thể yêu cầu (các) cột con tồn tại trong (các) cột mẹ. `@Relatio`n được sử dụng để nối các bảng mà không ảnh hưởng đến lược đồ của các bảng.

Bạn có thể xác định mối quan hệ giữa các thực thể theo 3 cách:
* Quan hệ 1-1
* Quan hệ 1- nhiều
* Quan hệ nhiều - nhiều

## Quan hệ 1-1
Mối quan hệ 1-1 giữa hai thực thể là mối quan hệ trong đó mỗi cá thể của thực thể mẹ tương ứng với chính xác một phiên bản của thực thể con và ngược lại.

Ví dụ: hãy xem xét một ứng dụng phát trực tuyến nhạc mà người dùng có một thư viện các bài hát mà họ sở hữu. Mỗi người dùng chỉ có một thư viện và mỗi thư viện tương ứng với chính xác một người dùng.
```kotlin
@Entity
data class User(
  @PrimaryKey val userId: Long,
  val name: String,
  val age: Int
)

@Entity(foreignKeys = @ForeignKey(entity = User.class,
    parentColumns = "userId",
    childColumns = "userOwnerId",
    onDelete = CASCADE))
data class Library(
  @PrimaryKey val libraryId: Long,
  val title: String,
  val userOwnerId: Long
)

data class UserAndLibrary(
  @Embedded val user: User,
  @Relation(
      parentColumn = "userId",
      entityColumn = "userOwnerId"
  )
  val library: Library
)
```
Trong ví dụ trên, `User` và `Library` là các thực thể có mối quan hệ một-một. Một trong các thực thể phải bao gồm một biến là tham chiếu đến khóa chính của thực thể kia (`userOwnerId` trong thực thể `Library`).

Để truy vấn danh sách người dùng và các thư viện tương ứng, trước tiên chúng ta phải mô hình hóa mối quan hệ 1-1 giữa hai thực thể, được thực hiện bằng cách sử dụng lớp `UserAndLibrary`. Lớp `UserAndLibrary` chứa một thể hiện của thực thể mẹ `User` và thể hiện tương ứng của thực thể con `Library`. Sau đó, thêm chú thích `@Relation` vào phiên bản của thực thể con, với `parentColumn` được đặt thành tên của cột khóa chính của thực thể mẹ và `entityColumn` được đặt thành tên của cột của thực thể con tham chiếu đến khóa chính của thực thể mẹ.

Bây giờ chúng ta có thể truy vấn cơ sở dữ liệu của mình theo cách sau:
```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersAndLibraries(): List<UserAndLibrary>
```

## Quan hệ 1-Nhiều
Mối quan hệ một-nhiều giữa hai thực thể là mối quan hệ trong đó mỗi cá thể của thực thể mẹ tương ứng với không hoặc nhiều cá thể của thực thể con, nhưng mỗi thể hiện của thực thể con chỉ có thể tương ứng với chính xác một thể hiện của thực thể mẹ.

Trong ví dụ về ứng dụng phát trực tuyến nhạc trước, một `User` có thể có nhiều `playlists`. Mỗi người dùng có thể tạo bao nhiêu danh sách phát tùy thích, nhưng mỗi danh sách phát được tạo bởi chính xác một người dùng.
```kotlin
@Entity
data class User(
  @PrimaryKey val userId: Long,
  val name: String,
  val age: Int
)

@Entity(foreignKeys = @ForeignKey(entity = User.class,
    parentColumns = "userId",
    childColumns = "userCreatorId",
    onDelete = CASCADE))
  data class Playlist(
  @PrimaryKey val playlistId: Long,
  val userCreatorId: Long,
  val playlistName: String
)

data class UserWithPlaylists(
  @Embedded val user: User,
  @Relation(
      parentColumn = "userId",
      entityColumn = "userCreatorId"
  )
  val playlists: List<Playlist>
)
```
Như chúng ta có thể thấy, cách tiếp cận rất giống với mối quan hệ 1-1, sự khác biệt duy nhất ở đây là trong mô hình mối quan hệ (UserWithPlaylists). Thay vì chứa một thực thể con, giờ đây nó chứa một danh sách các thực thể con. Truy vấn cơ sở dữ liệu cũng rất tương tự.
```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersWithPlaylists(): List<UserWithPlaylists>
```
## Quan hệ Nhiều-Nhiều
Mối quan hệ nhiều-nhiều giữa hai thực thể là mối quan hệ trong đó mỗi cá thể của thực thể mẹ tương ứng với không hoặc nhiều cá thể của thực thể con và ngược lại.

Trong ví dụ về ứng dụng phát trực tuyến nhạc, mỗi danh sách phát có thể bao gồm nhiều bài hát và mỗi bài hát có thể là một phần của nhiều danh sách phát khác nhau. Do đó, phải có mối quan hệ nhiều-nhiều giữa thực thể `playlist` và thực thể `Song`. Mối quan hệ nhiều-nhiều khác biệt với các kiểu quan hệ khác vì thường không có tham chiếu đến thực thể mẹ trong thực thể con. Thay vào đó, lớp thứ ba được sử dụng để đại diện cho một thực thể liên kết (hoặc bảng tham chiếu chéo) giữa hai thực thể. Bảng tham chiếu chéo phải có các cột cho khóa chính từ mỗi thực thể trong mối quan hệ nhiều-nhiều được thể hiện trong bảng.
```kotlin
@Entity
data class Playlist(
  @PrimaryKey val id: Long,
  val playlistName: String
)

@Entity
data class Song(
  @PrimaryKey val id: Long,
  val songName: String,
  val artist: String
)

@Entity(primaryKeys = ["playlistId", "songId"],
    foreignKeys = {
      @ForeignKey(entity = Playlist.class,
      parentColumns = "id",
      childColumns = "playlistId"),
      @ForeignKey(entity = Song.class,
      parentColumns = "id",
      childColumns = "songId")
}))

data class PlaylistSongCrossRef(
  val playlistId: Long,
  val songId: Long
)
```
Bây giờ, bước tiếp theo phụ thuộc vào cách bạn muốn truy vấn các thực thể liên quan này.
* Nếu bạn muốn truy vấn playlist và danh sách các bài hát tương ứng cho từng playlist, hãy tạo một lớp dữ liệu mới chứa một đối tượng `playlist` duy nhất và danh sách tất cả các đối tượng `Song` mà danh sách phát bao gồm.
* Nếu bạn muốn truy vấn các bài hát và danh sách các danh sách phát tương ứng cho mỗi bài hát, hãy tạo một lớp dữ liệu mới chứa một đối tượng `Song` và danh sách tất cả các đối tượng `playlist` có bài hát đó.

Trong cả hai trường hợp, mô hình hóa mối quan hệ giữa các thực thể bằng cách sử dụng thuộc tính `AssociateBy` trong chú thích `@Relation` trong mỗi lớp này để xác định thực thể tham chiếu chéo cung cấp mối quan hệ giữa thực thể `Playlist` và thực thể `Song`.

```kotlin
data class PlaylistWithSongs(
  @Embedded val playlist: Playlist,
  @Relation(
      parentColumn = "playlistId",
      entityColumn = "songId",
      associateBy = @Junction(PlaylistSongCrossRef::class)
  )
  val songs: List<Song>
)

data class SongWithPlaylists(
  @Embedded val song: Song,
  @Relation(
      parentColumn = "songId",
      entityColumn = "playlistId",
      associateBy = @Junction(PlaylistSongCrossRef::class)
  )
  val playlists: List<Playlist>
)
```
Truy vấn cơ sở dữ liệu tương tự như các cách tiếp cận trước đây.
```kotlin
@Transaction
@Query("SELECT * FROM Playlist")
fun getPlaylistsWithSongs(): List<PlaylistWithSongs>

@Transaction
@Query("SELECT * FROM Song")
fun getSongsWithPlaylists(): List<SongWithPlaylists>
```

# Kết luận
Đây là tất cả về Mối quan hệ thực thể trong Room. Hy vọng bạn thích bài này

Nguồn tham khảo: https://blog.mindorks.com/entity-relationship-in-room