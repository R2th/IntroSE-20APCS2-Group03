**Trong bài này mình sẽ hướng dẫn anh em setup @TypeConverter trong Room database**

### 1. Room database là gì?
*The Room persistence library provides an abstraction layer over SQLite to allow for more robust database access while harnessing the full power of SQLite.*

> Room là một persistence library, một phần của Android Architecture Components. Nó giúp bạn dễ dàng là việc với đối tượng SQLiteDatabase trong ứng dụng của bạn hơn, giảm số lượng mã soạn sẵn và xác minh các truy vấn SQL tại thời điểm biên dịch.
> 
![](https://images.viblo.asia/a4ccf93c-c0a5-4e21-837a-35e4c0827203.png)

Trước khi Room được ra mắt, chúng ta phải viết rất nhiều dòng lệnh phức tạp, dài loằng ngoằng, cơ bản là rất tốn thời gian để setup SQLite :( . Room xuất hiện như một vị cứu tinh giúp đỡ anh em, từng câu lệnh, từng query cực kì đơn giản và dễ hiểu. Room cung cấp rất nhiều function, hỗ trợ lưu trữ các dữ liệu nguyên thủy nhưng nó không hỗ trợ các Class Object cho người dùng tự định nghĩa. Tuy nhiên các bạn không phải lo lắng về điều này. TypeConverter lại xuất hiện để cứu anh em. TypeConverter có thể convert một Custom Class sang kiểu dữ liệu mà Room có thể lưu trữ được và ngược lại.

### 2. Cài đặt

```scala
@Entity(tableName = "current_weather")
data class CurrentWeatherResponse(
val coord: Coord,
@PrimaryKey
val id: Int,
val main: Main,
val name: String,
val sys: Sys,
val visibility: Int,
val weather: List<Weather>,
val wind: Wind
): Serializable
```

Đây là một Entity của Database tuy nhiên, Entity này có những property không phải dữ liệu nguyên thủy như: Coord, Main, Sys, List<Weather>, Wind. Sau đây chúng ta sẽ bắt tay vào định nghĩa lớp Converters để convert các propery này nhé:

  ```swift
  class Converters {
    @TypeConverter
    fun toCoord(coord: String): Coord? {
        return Gson().fromJson<Coord>(coord,Coord::class.java)
    }

    @TypeConverter
    fun fromCoord(coord: Coord): String? {
        return Gson().toJson(coord)
    }

    @TypeConverter
    fun toWind(wind: String): Wind? {
        return Gson().fromJson<Wind>(wind,Wind::class.java)
    }

    @TypeConverter
    fun fromWind(wind: Wind): String? {
        return Gson().toJson(wind)
    }

    @TypeConverter
    fun toMain(main: String): Main? {
        return Gson().fromJson<Main>(main,Main::class.java)
    }

    @TypeConverter
    fun fromMain(main: Main): String? {
        return Gson().toJson(main)
    }

    @TypeConverter
    fun toSys(sys: String): Sys? {
        return Gson().fromJson<Sys>(sys,Sys::class.java)
    }

    @TypeConverter
    fun fromSys(sys: Sys): String? {
        return Gson().toJson(sys)
    }

    @TypeConverter
    fun toWeather(weather: String): List<Weather>? {
        val listType = object : TypeToken<ArrayList<Weather>>(){}.type
        return Gson().fromJson<List<Weather>>(weather,listType)
    }

    @TypeConverter
    fun fromWeather(weather: List<Weather>): String? {
        return Gson().toJson(weather)
    }
}
```

Như mình đã đề cập, Room chỉ lưu trữ các kiểu dữ liệu nguyên thủy nên giải pháp ở đây là convert Object -> dữ liệu nguyên thủy. Và mình sử dụng Gson để convert Object -> String.
Bạn phải tạo 2 function để convert qua lại: Object -> String và String -> Object (như mình đã tạo là to... & from...)
Đừng quên Anotation @TypeConverter trên mỗi function nhé. 

### 3. Kết thúc
```swift
@Database(
    entities = [CurrentWeatherResponse::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class WeatherDatabase : RoomDatabase() {

    abstract fun getWeatherDao(): WeatherDao

    companion object{
        @Volatile
        private var instance: WeatherDatabase?=null
        private val LOCK = Any()
        operator fun invoke(context: Context) = instance?: synchronized(LOCK){
            instance?: createDatabase(context).also{
                instance = it
            }

        }
        private fun createDatabase(context: Context) =
            Room.databaseBuilder(
                context.applicationContext,
                WeatherDatabase::class.java,
                "weather.db"
            ).build()
    }
}
```

Bước cuối cùng là thêm Anotation @TypeConverters(Converters::class) ở abstract class Database nữa nhé.  Vậy là bạn đã setup TypeConverter vào dự án của bạn thành công. 

 *Code được lấy trong project:*

 **Github: https://github.com/iamhiutrun/Weather_Forecast**