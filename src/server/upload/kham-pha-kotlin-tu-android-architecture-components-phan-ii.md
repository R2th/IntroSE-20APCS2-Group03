Tiếp theo phần 1 về khám phá kotlin từ Android Architecture Components
(https://viblo.asia/p/kham-pha-kotlin-tu-android-architecture-components-phan-i-Eb85opQ6K2G)
Ở phần 2 này mình sẽ trình bày chi tiết hơn về Kotlin qua việc sử dụng AAC với việc implement Room và Viewmodel.

# 1. ViewModel
  Sự khác biệt ở **ViewModel** là bạn có thể lưu trạng thái logic của UI trong **ViewModel** và tách nó khỏi Fragment và Activity. Nói đến đây có vẻ hơi khó hiểu phải không.
  
  ![](https://images.viblo.asia/c056697c-43e7-4ad3-80af-586e04b7ed4c.png)
  
  Ở đây mình có lấy một hình ảnh từ trang https://developer.android.com. 
  Nhìn hình các bạn có thể thấy vòng đời của **ViewModel** tồn tại ngay cả khi Fragment và Activity vào trạng thái nghỉ. Như khi xoay màn hình thì **ViewModel** vẫn tồn tại và keep trạng thái logic của UI. Và chỉ khi Fragment bị detach hoặc Activity bị finish() thì **ViewModel** mới được clear trạng thái (tương tự với case bạn vào fragment detail từ fragment main rồi sau đó back lại). 

```
class MainViewModel : ViewModel() {

    private val category = MutableLiveData<String>()

    fun initNetworkRequest() {
           compositeDisposable.add(
                repository.getCatogory()
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe({ item ->
                             category.value = item.categoryName
                        }, { e -> onLoadFail(e) }))    
    }

    fun getCategory(): LiveData<String> {
        return category
    }
}
```

Ở **ViewModel** mình có 1 đoạn code gọi API trả về 1 category sau đó lấy categoryName cho giá trị của biến category thuộc **ViewModel**. 
Sau đó bên Activity thực hiện gọi **ViewModel**

```
override val viewModel by viewModel<ListFavoriteViewModel>()
```

tại hàm onCreate() của Activity gọi initNetworkRequest() từ ViewModel

```
viewModel.initNetworkRequest()
```

Với việc thực hiện gọi như này thì bất kể  Activity của bạn bị destroyed và recreated bao nhiêu lần thì vẫn chỉ có duy nhật một ViewModel tồn tại xuyên suốt và việc thực hiện gọi lại. Do đó, bạn có thể lưu trữ trạng thái UI của mình một cách an toàn và khi khởi tạo lại Activity sẽ luôn nhận được các giá trị mới nhất.

# 2. Room
 **Room** library cung cấp một cách dễ dàng để chuyển đổi các object thành data được lưu trữ trong local database SQLite trên device. Điều này hữu ích cho việc lưu trữ dữ liệu trong các phiên ứng dụng khác nhau và cũng để sử dụng với offline mode. Room có 3 thành phần chính mà bạn cần phải xác định để sử dụng nó(**Entity, Dao, Database**): 
 
```
@Entity
data class Category(
    @PrimaryKey(autoGenerate = true) val id: Int? = null,
    @ColumnInfo(name = "categoryname") val name: String) {
}
```

Ở đây mình có define một entity **Room** tên là Category. Hay dễ hiểu hơn thì nó là một bảng Category trong cơ sở dữ liệu vậy thôi. Đây là những gì bạn sẽ tạo ra để lưu một hàng mới trong cơ sở dữ liệu và cách dữ liệu được lấy ra từ cơ sở dữ liệu trả lại cho bạn.

```
@Dao
interface CategoryDao {

    @Query("SELECT * FROM category")
    fun all(): List<Category>

    @Insert
    fun insertAll(categorys: List<Category>): List<Category>

    @Insert
    fun insert(category: Category): Long

    @Update
    fun update(category: Category)

    @Delete
    fun delete(category: Category)
}
```
**DAO**(Data Access Object) xác định cách bạn truy cập dữ liệu của mình. Lưu ý rằng đây chỉ là một interface với một số phương thức được chú thích.
Room sẽ tạo các implement dựa trên những gì bạn định nghĩa. 

```
@Database(entities = arrayOf(Category::class), version = 1)
abstract class Database : RoomDatabase() {

    companion object {

        private val DB_NAME = "ShopDatabase"

        @Volatile private var INSTANCE: Database? = null

        fun getInstance(context: Context): Database =
                INSTANCE ?: synchronized(this) {
                    INSTANCE ?: buildDatabase(context).also                     
                        { INSTANCE = it }
                }

        private fun buildDatabase(context: Context) =
                Room.databaseBuilder(context.applicationContext,
                        Database::class.java, DB_NAME)
                        .build()
    }
}
```

**Database** là điểm truy cập chính cho cơ sở dữ liệu. 
 
# => **Kotlin**
## Với đoạn code 
## `data class Category(val id: Int? = null, val categoryname: String)`
chúng ta có thể  thấy được

1. Keyword data được sử dụng cho các class mà mục tiêu của chúng là chỉ giữ dữ liệu. Tất cả các phương thức equals()/hashCode()/toString()/copy() được tạo tự động.
2. Sử dụng các biến sau tên lớp bạn khai báo chúng dưới dạng member variables (default là public). Vì val được sử dụng, nên đây là các member variables bất biến.
3. Int? có nghĩa là biến này được phép dùng null làm giá trị của nó. Không có ‘?’ Ở cuối thì null không được phép.

## Với đoạn code 
## companion object {  {}
    
Điều này tương tự như Java static. Tất nhiên, có những khác biệt, chẳng hạn như bạn có thể truyền đối tượng này và nó có thể thực hiện các interface.
       
## Với đoạn code 
## INSTANCE ?: synchronized(this) {

Toán tử ?: Có thể được sử dụng để trả về một giá trị nếu nó không phải là null, nếu không thì trả về giá trị của toán tử. Nó thay thế tất cả các câu lệnh if trong Java.

Như vây là mình đã trình bày xong phần 2 bài viết **Khám phá kotlin từ Android Architecture Components.**
Kotlin quả thực là một ngôn ngữ hiện đại với rất nhiều tính năng. Mình đang trong quá trình tìm hiểu và sẽ cố gắng thực hiện được những bài viết chất lượng hơn trong thời gian tới.
Mình hy vọng bạn thấy điều này hữu ích! Happy coding khi sử dụng Kotlin và AAC! :)

Nguồn: https://medium.com/rocknnull/exploring-kotlin-using-android-architecture-components-and-vice-versa-aa16e600041a, https://android.jlelse.eu/android-architecture-pattern-components-mvvm-livedata-viewmodel-lifecycle-544e84e85177, https://developer.android.com . Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.