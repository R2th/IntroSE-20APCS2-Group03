## I. Giới thiệu
Trong bài viết này, chúng ta cùng xem một trong các thư viện của Android Architecture Components đó là Room Database

### Android Architecture Components là gì?
Đó là một tập các thư viện giúp bạn thiết kế ứng dụng mạnh mẽ, có thể kiểm tra và bảo trì dễ dàng.

### 1. Room là gì?
Room là một thư viện bền bỉ cung cấp một lớp trừu tượng trên SQLite, cho phép truy cập cơ sở dữ liệu dễ dàng truy cập sức mạnh của SQLite

Về cơ bản thì nó là một bao bọc trên SQLite database

### 2. Tạo sao nên sử dụng Room?
- Cung cấp kiểm tra thời gian biên dịch
- Phù hợp tốt với LiveData
- Kiểm tra các thành phần khác nhau trong Room dễ dàng
- Dễ sử dụng và thực hiện
- Giảm số lượng mã 

### 3. Các thành phần cơ bản Room
Về cơ bản có 3 thành phần chính

*  Entity: Một class Java hoặc Kotlin đại diện cho một bảng trong database
*  DAO: Viết tắt của DATA ACCESS OBJECT. Về cơ bản đây là 1 interface, chứa các phương thức như là getData(), ... sử dụng để truy cập cơ sở dữ liệu. Interface này được implement bởi Room
*  Database: đây là lớp trừu tưởng mở rộng RoomDatabase, đây là nơi bạn xác định các thực thể (bảng) và version của cơ sở dữ liệu. Nó chứa trình giữ database và đóng vai trò là điểm truy cập chính cho kết nối

![](https://images.viblo.asia/33c9d218-297a-42e8-8687-ba42fd623898.png)

## II. Demo
### 1. Thêm các dependences
```
implementation "android.arch.persistence.room:runtime:1.0.0"
kapt "android.arch.persistence.room:compiler:1.0.0"
```

### 2. Thêm bảng 

```
@Entity(tableName = "weatherData")
data class WeatherData(@PrimaryKey(autoGenerate = true) var id: Long?,
        @ColumnInfo(name = "humidity") var humidity: Int,
        @ColumnInfo(name = "temp_c") var tempInC: Double,
        @ColumnInfo(name = "temp_f") var tempInF: Double,
        @ColumnInfo(name = "lat") var lat: Double,
        @ColumnInfo(name = "lon") var lon: Double,
        @ColumnInfo(name = "name") var name: String,
        @ColumnInfo(name = "region") var region: String,
        @Ignore @ColumnInfo(name = "cloud") var cloud: String

){
    constructor():this(null,0,0.0,0.0,0.0,0.0,
            "","","")
}
```

Vài điểm cần lưu ý
* Lớp này nên được chú thích với Entity, đây là cách xác định của Room với mỗi Thực thể bạn tạo ra, một bảng được tạo ra với database. Theo mặc định, Room tạo một cột cho mỗi trường, nhưng bạn có thể tránh điều này bằng cách thềm anotation Ignore Cho nó
* Mỗi thực thể phải có ít nhất 1 khía chính. Hãy thêm bằng anotation PrimaryKey
* Theo mặc định, Room sử dụng tên class làm tên bảng, bạn có thể tùy chỉnh bằng cách thêm tableName

### 3. Tạo một DAO

```
@Dao
interface WeatherDataDao {

    @Query("SELECT * from weatherData")
    fun getAll(): List<WeatherData>

    @Insert(onConflict = REPLACE)
    fun insert(weatherData: WeatherData)

    @Query("DELETE from weatherData")
    fun deleteAll()
}
```
Một vài điểm lưu ý
*  Bằng cách truy cập cơ sở dữ liệu bằng cách sử dụng DAO thay vì trình tạo truy vấn hoặc truy vấn trực tiếp, bạn có thể tách riêng các thành phần khác nhau của kiến trúc cơ sở dữ liệu của bạn.
*  Một DAO có thể là một interface hoặc một lớp trừu tượng. Trong trường hợp của một lớp trừu tượng, nó có thể tùy ý có một hàm tạo để lấy RoomDatabase làm tham số duy nhất của nó.
*  Room tạo ra mỗi lần thực hiện DAO tại thời gian biên dịch.
Bạn, có thể làm được nhiều hơn nữa với DAO, như chuyển các tham số vào truy vấn, trả về các tập hợp con của cột hoặc truyền một bộ sưu tập các đối số và hơn thế nữa.

### 4. Database class

```
@Database(entities = arrayOf(WeatherData::class), version = 1)
abstract class WeatherDataBase : RoomDatabase() {

    abstract fun weatherDataDao(): WeatherDataDao

    companion object {
        private var INSTANCE: WeatherDataBase? = null
        fun getInstance(context: Context): WeatherDataBase? {
            if (INSTANCE == null) {
                synchronized(WeatherDataBase::class) {
                    INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                            WeatherDataBase::class.java, "weather.db")
                            .build()
                }
            }
            return INSTANCE
        }
        fun destroyInstance() {
            INSTANCE = null
        }
    }
}
```

Lưu ý:
* Bạn nên làm theo desgin pattern khi khởi tạo database vì mỗi RoomDatabase khá tốn tài nguyên và hiếm khi cần truy cập nhiều instances
* Class nên là abstract và extends RoomDatabase

Nếu bạn thử chạy mã trên với cơ sở dữ liệu đã tạo ở trên, ứng dụng của bạn sẽ bị lỗi khi thao tác được thực hiện trên main thread . Theo mặc định, Room giữ một kiểm tra về điều đó và không cho phép các hoạt động trên main thread vì nó có thể làm cho giao diện người dùng của bạn bị lag.

Bạn có thể tránh điều đó bằng cách sử dụng AsyncTask hoặc Handler hoặc Rxjava với lịch trình io hoặc bất kỳ tùy chọn nào khác đặt hoạt động trên bất kỳ thread nào khác

## III. Tổng kết
Trên mình đã giới thiệu về Room database cũng như cách sử dụng nó đơn giản nhất, cảm ơn các bạn đã theo dõi bài viết.
Nguồn: https://medium.com/mindorks/android-architecture-components-room-and-kotlin-f7b725c8d1d