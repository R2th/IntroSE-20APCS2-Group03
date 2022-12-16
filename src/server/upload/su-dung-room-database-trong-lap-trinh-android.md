Bạn đã quá chán nản với việc triển khai SQLite trong dự án của mình vì câu lệnh phức tạp và nhiều bước?

Việc này sẽ không còn xảy ra nữa nếu bạn áp dụng Room của thư viện Jetpack vào trong dự án của mình.
# Giới thiệu Room database trong Android
Room database được phát triển và cải tiến từ sqlite. Room database giúp đơn giản hoá việc code, và giảm thiểu các công đoạn liên quan đến cơ sở dữ liệu.

Bản chất Room database là abstract layer gồm cơ sở dữ liệu chuẩn SQLite được Android thông qua.

Với 3 thành phần chính là: Database, DAO(Data Access Object) và entity. Mỗi thành phần đều có nhiệm vụ và chức năng riêng.
# Áp dụng Room database 
## 1. Cài đặt thư viện
thêm vào build.gradle(app)
```
implementation("androidx.room:room-runtime:2.3.0")
    kapt("androidx.room:room-compiler:2.3.0")
    implementation("androidx.room:room-ktx:2.3.0")
```
## 2. Tạo cấu trúc Room database 
chúng ta sẽ tạo 3 class như sau:
* **Game:** Entity nơi định nghĩa bảng và trường của Database. Mỗi 1 Entity tương đương với 1 bảng trong Database.
* **GameDao:** Interface định nghĩa các câu truy vấn Database.
* **AppDatabase:** Class này extends từ RoomDatabase là nơi thao tác trực tiếp và thực hiện các truy vấn xuống Database.
Bây giờ mình sẽ hường dẫn các bạn tạo từng class một.
Đầu tiên tạo class Game.
```
@Entity(tableName = "game")
@Parcelize
data class Game(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val id: Long,
    @ColumnInfo(name = "name")
    val name: String,
    @ColumnInfo(name = "image")
    val image: String,
    @ColumnInfo(name = "score")
    val score: Long,
    @ColumnInfo(name = "platforms")
    val parentPlatforms: List<Platforms>
)
```
Sau đó các bạn tạo interface để thực hiện truy vấn.

DAO là interface được chú thích với @Dao, nó đóng vai trò trung gian truy cập vào các đối tượng trong cơ sở dữ liệu và các bảng của nó.

Có bốn chú thích cụ thể cho các hoạt động cơ bản của DAO: @Insert, @Update, @Delete, and @Query.
```
@Dao
interface GameDao {

    @Query("SELECT * FROM game")
    suspend fun getSavedGames(): List<Game>

    @Insert(onConflict = IGNORE)
    suspend fun insertGame(game: Game)

    @Delete
    suspend fun deleteGame(game: Game)

    @Query("SELECT * FROM game WHERE id =:id")
    fun isFavorite(id: Long): Game
}
```
Và cuối cùng các bạn tạo AppDatabase.

Thành phần Database là một abstract class đã được chú giải bằng @Database. Nó extend RoomDatabase Class và trong đó định nghĩa một danh sách các Entities và các DAO.
```
@Database(
    entities = [Game::class],
    version = DATABASE_VERSION,
    exportSchema = EXPORT_SCHEME
)

abstract class AppDatabase : RoomDatabase() {

    abstract fun gameDao(): GameDao

    companion object {
        const val DATABASE_VERSION = 1
        const val DATABASE_NAME = "gameSaved"
        const val EXPORT_SCHEME = false
    }
}
```
## 3. Áp dụng Room vào dự án
Mình sẽ lấy ví dụ tính năng save to favorite của mình để giúp các bạn hiểu hơn về cách dùng Room trong project.

Ở đây mình có 1 màn Game Detail với Button "Add to Saved"
![image.png](https://images.viblo.asia/881c8e79-f08d-416e-9636-bc335d40836f.png)
Bây giờ mình sẽ handle event cho Button đó. 
* Bắt đầu với lớp ViewModel, mình xây dựng 2 lớp là Get và Delete Game cho màn Saved và Insert cho màn Detail

**Màn Saved**
```
private fun getSavedGames() {
        viewModelScope.launch(Dispatchers.IO + exceptionHandler) {
            val savedGames = repo.getSavedGames()
            _games.postValue(savedGames)
        }
    }

    fun deleteGame(game: Game) {
        viewModelScope.launch(Dispatchers.IO + exceptionHandler) {
            repo.deleteGame(game)
            getSavedGames()
        }
    }
```
**Màn Detail**
```
 fun insertGame(game: Game) {
        viewModelScope.launch(Dispatchers.IO + exceptionHandler) {
            if (isFavorite.value == true) {
                gameRepo.deleteGame(game)
                _isFavorite.postValue(false)
            } else {
                gameRepo.insertGame(game)
                _isFavorite.postValue(true)
            }
        }
    }
```
* Tiếp theo là tầng Repository sẽ gọi đến tầng LocalDatasource
```
override suspend fun getSavedGames(): List<Game> =
        local.getSavedGames()

    override suspend fun insertGame(game: Game) =
        local.insertGame(game)


    override suspend fun deleteGame(game: Game) =
        local.deleteGame(game)
```
* Từ tầng LocalDatasource sẽ gọi đến lớp Dao mà chúng ta đã triển khai ở phần trước
```
class GameLocalDataSource(
    private val gameDao: GameDao
) : GameDataSource.Local {
    override suspend fun getSavedGames() =
        gameDao.getSavedGames()

    override suspend fun insertGame(game: Game) =
        gameDao.insertGame(game)

    override suspend fun deleteGame(game: Game) =
        gameDao.deleteGame(game)

    override suspend fun isFavorite(id: Long) =
        gameDao.isFavorite(id)
}
```
* Và cuối cùng là set onClick cho Button
```
textAdd.setOnClickListener {
                viewModel.insertGame(arg.game)
            }
```
Như vậy là các bạn đã hoàn thành 1 chức năng với Room database. Cùng xem kết quả nhé :D

Mình sẽ click vào Button "add to Saved" và sang màn Saved để xem kết quả
![image.png](https://images.viblo.asia/33e920ba-c366-4fe3-adce-3baca75d6e8b.png)

Oke :)) quá ngon, như vậy là Room đã hoạt động tốt

## Tổng kết
Như vậy, mình đã hướng dẫn các bạn từng bước sử dụng Room database trong Android. Với Room database, nhưng thao tác đọc, ghi database trở lên dễ dàng hơn bao giờ hết.

Hy vọng bài viết sẽ giúp các bạn làm được và hiểu chi tiết cấu trúc và làm các dự án nâng cao hơn sau này.