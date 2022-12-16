Xin chào các bạn, hôm nay mình xin viết một bài chia sẻ về ROOM database trong android. Vậy tại sao phải dùng ROOM, sao không dùng SQLite thuần tuý? 
Có 2 nguyên nhân dưới đây:
1. Bạn phải viết mã lặp đi lặp lại dài, mà sẽ tốn thời gian cũng như dễ mắc lỗi.
2. Rất khó để quản lý các truy vấn SQL cho một cơ sở dữ liệu quan hệ phức tạp.
Room được google giới thiệu là 1 ORM mạnh , hữu ích cho các developper, giúp giải quyết các vấn đề trên.
Dưới đây là 1 số phương thức mà Room đã định nghĩa sẵn cho ta:
![](https://images.viblo.asia/eddcf543-73af-490e-83bb-8ad437213bd4.png)
## Thêm thư viện
Add the gradle dependencies in the build.gradle file.
```
implementation “android.arch.persistence.room:runtime:1.0.0”
annotationProcessor “android.arch.persistence.room:compiler:1.0.0”
```

## Tạo model class
```
@Entity
 public class Movies {
 @NonNull
 @PrimaryKey
 private String movieId;
 private String movieName;
 
 public Movies() {
 }
 
 public String getMovieId() { return movieId; }
 public void setMovieId(String movieId) { this.movieId = movieId; }
 public String getMovieName() { return movieName; }
 public void setMovieName (String movieName) { this.movieName = movieName; }
 }
```
## Tạo 1 class interace để implement các truy vấn
```
@Dao
 public interface DaoAccess {
 
 @Insert
 void insertOnlySingleMovie (Movies movies);
 @Insert
 void insertMultipleMovies (List<Movies> moviesList);
 @Query (“SELECT * FROM Movies WHERE movieId = :movieId“)
 Movies fetchOneMoviesbyMovieId (int movieId);
 @Update
 void updateMovie (Movies movies);
 @Delete
 void deleteMovie (Movies movies);
 }
```

## Tạo 1 Room Database class, extend RoomDatabase
```
@Database (entities = {Movies.class}, version = 1, exportSchema = false)
 public abstract class MovieDatabase extends RoomDatabase {
 public abstract DaoAccess daoAccess() ;
 }
```

## Tại activity hoặc fragment, implement xử lý
```
private static final String DATABASE_NAME = “movies_db”;
 private MovieDatabase movieDatabase;
 movieDatabase = Room.databaseBuilder(getApplicationContext(),
 MovieDatabase.class, DATABASE_NAME)
 .fallbackToDesctructiveMigration()
 .build()

vi dụ như ta muốn insert 1 object

new Thread(new Runnable() {
 @Override
 public void run() {
 Movies movie =new Movies();
 movie.setMovieId( “2”);
 movie.setMovieName(“The Prestige”);
 movieDatabase.daoAccess () . insertOnlySingleMovie (movie);
 }
 }) .start();
```

Khá đơn giản đúng không ạ? tương tự ta có thể viết thêm các hàm như edit, delete.. phù hượ với yêu cầu bài toán
Các bạn có thể tham khảo thêm tại trang chủ của google:
https://developer.android.com/training/data-storage/room/index.html
bài viết được tham khảo từ: https://medium.freecodecamp.org/room-sqlite-beginner-tutorial-2e725e47bfab