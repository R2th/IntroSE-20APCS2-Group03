# Mở đầu
Khi viết một ứng dụng moblie bạn thường thấy rằng mình cần lưu dữ liệu giữa các lần khởi chạy ứng dụng.  Nếu dữ liệu đủ đơn giản như một số setting của app, thông tin đăng nhập,.. bạn có thể lưu chúng dưới dạng key-value ở  sharedPreferences.  Nhưng khi dữ liệu cần lưu trữ phức tạp hơn và phụ thuộc lẫn nhau , thì chúng ta sẽ cần sử dụng một hệ thống lưu trữ dữ liệu chính thức hơn - database. Database nói chung cung cấp việc insert, update, query nhanh hơn các phương thức lưu trữ local khác (file, sharedpreferences,...).

Cũng như lập trình native Android hay IOS, Flutter cũng dùng SQlite - một lựa chọn phổ biến nhất để quả lý database.  Trong bài viết này mình sẽ trình bày cách quản lý database với plugin spflite. Sqflite là plugin phổ biến và được giới thiệu trên document của flutter nên bạn có thể yên tâm sử dụng nó :grin:

# Một vài điều về SQFLite
* SQFLite hỗ trợ cho iOS, Android và MacOS, không hỗ trợ nền tảng web.
* Support transctions và batches.
* Tự động quản lý version
* Có helper cho các truy vấn insert, query, update, delete
* Hoạt động DB được thực hiện trong background thread  trên iOS và Android

Các kiểu dữ liệu được hỗ trợ bởi sqlite:
* Integer: Dart type - int
* Real: Dart type - num
* Text: Dart type - String
* Blob:Dart type - Uint8List

DateTime không được hỗ trợ -> có thể lưu bằng millisSinceEpoch hoặc String.

Bool không được hỗ trợ -> dùng kiểu khác thay thế, ví dụ 0 hoặc 1

# Ví dụ
Chúng ta sẽ đi vào một ví dụ cụ thể để hiểu một cách dễ dàng hơn. Trong ví dụ này ta sẽ lưu thông tin của một model movie vào database khi ta nhấn yêu thích.

Đầu tiên ta cần
### Thêm dependency cần thiết vào file pubspec.yaml
```dart
dependencies:
  flutter:
    sdk: flutter
  sqflite: ^1.3.1
  path: 1.6.4
  equatable: ^1.1.1
```
Tọa class Movie, xác định những thông tin cần lưu trữ. Ở đây ta sẽ lưu trữ id, porterPath, title,     overview, releaseDate, voteAverage. Trong đó id là trường unique, ta sẽ set làm primary key.
```dart
 class Movie extends Equatable {
  int id;
  String backdropPath;
  List<Genre> genres;
  String title;
  String overview;
  String porterPath;
  List<Company> productionCompanies;
  String releaseDate;
  int runtime;
  int revenue;
  int budget;
  List<Video> videos;
  List<Actor> cast;
  double voteAverage;
  int voteCount;

  @override
  List<Object> get props => [id, title];
  Map<String, dynamic> toMap() {
    return Map<String, dynamic>()
      ..["id"] = id
      ..["poster_path"] = porterPath
      ..["title"] = title
      ..["overview"] = overview
      ..["release_date"] = releaseDate
      ..["vote_average"] = voteAverage;
  }
  
    static Movie formJson(Map<String, dynamic> json) {
    return Movie()
      ..id = json["id"]
      ..title = json["title"]
      ..overview = json["overview"]
      ..porterPath = json["poster_path"]
      ..releaseDate = json["release_date"]
      ..voteAverage = json["vote_average"] * 1.0;
  }
}
```
### Mở database
Trước khi đọc và ghi dữ liệu vào cơ sở dữ liệu, ta cần mở một kết nối:
* Xác định đường dẫn đến database bằng cách sử dụng getDatabasePath () từ package *sqflite*, kết hợp với hàm join từ package *path*.
* Mở cơ sở dữ liệu với hàm openDatabase () của sqflite.

```dart
 const String DB_NAME = "movies_database.db";
 Database _database;

 Future<Database> get database async {
    if (_database != null) return _database;
    _database = await _initDatabase();
    return _database;
  }
  
  _initDatabase() async {
    return await openDatabase(
      join(await getDatabasesPath(), DB_NAME)
      },
    );
  }
```
### Tạo Table "favorite"

Tiếp theo, tạo một table lưu trữ thông tin về favorite Movie.
* id kiểu int -> INTEGER
* porterPath, title, overview, releaseDate kiểu String -> TEXT
* voteAverage kiểu double -> REAL

```dart
const String TABLE_FAVORITE = "favorite";
db.execute("""CREATE TABLE $TABLE_FAVORITE (
            id INTEGER PRIMARY KEY,
            poster_path TEXT,
            title TEXT,
            overview TEXT,
            release_date TEXT,
            vote_average REAL
        )""");
```
Lưu ý: tên cột nên giống với key trong hàng toMap(), formJson() điều này giúp cho việc read, insert dữ liệu dễ dàng hơn.

### Insert một Movie vào DB
```dart
await db.insert(TABLE_FAVORITE, movie.toMap());
```

Movie được convert thành Map() và được lưu vào bảng TABLE_FAVORITE, với key sẽ là tên cột value sẽ là giá trị được điền vào cột đó.

Bạn cũng có thể chỉ định **[conflictAlgorithm](https://github.com/tekartik/sqflite/blob/master/sqflite_common/lib/src/sql_builder.dart)** để sử dụng trong trường hợp cùng một movie được chèn hai lần.

### Lấy List Movie đã được lưu

```dart
List<Map<String, dynamic>> maps = await db.query(TABLE_FAVORITE);
List<Movie> movies = maps.map((e) => Movie.formJson(e)).toList();
```
Truy vấn  `db.query(TABLE_FAVORITE)` sẽ trả về list các record trong DB, mỗi record sẽ là một Map với key là tên cột, value là dữ liệu của cột đó. Việc ta cần làm sau đó chỉ là convert sang List<Movie> và dùng thôi.
    
### Updata Movie đã có trong bảng
 
```dart
final db = await database;
final result =
        await db.update(TABLE_FAVORITE, movie.toMap(), where: "id = ?", whereArgs: [movie.id]);
```
 Update record có id == movie.id bằng dữ liệu mới movie.toMap().
    
### Xóa movie
```dart
    final db = await database;
    final result = await db.delete(TABLE_FAVORITE, where: "id = ?", whereArgs: [movie.id]);
```
  Delete record có id == movie.id 
###  Đóng DB
 
  Bình thường DB sẽ được đóng khi bạn tắt app. Tuy nhiên nếu bạn muốn giải phóng resource, có thể đóng DB bằng cách

```dart
await db.close();
```
### Kết luận
Trên đây mình vừa trình bày một cách đơn giản về việc sử dụng SQLite trong một ứng dụng Flutter. Code của phần ví dụ trên bạn có thể xem chi tiết ở [đây](https://github.com/trantan97/moviesdb_flutter/tree/add_database).
    
Nếu phần trên quá đơn giản, bạn muốn tìm hiểu sâu hơn thì có thể vọc pagkage [sqflite](https://pub.dev/packages/sqflite) ở đây.

Cảm ơn các bạn đã theo dõi bài viết !!