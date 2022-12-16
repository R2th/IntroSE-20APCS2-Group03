Room là một persistence library cung cấp một abstraction layer cho phép thao tác với dữ liệu trong SQLite database một cách dễ dàng. Trong bài viết này, chúng mình cùng nhau tìm hiểu một vài tips để tận dụng Room một cách hiệu quả nhất:
- Pre-populate your database via RoomDatabase#Callback
- Use DAO’s inheritance capability
- Execute queries in transactions with minimal boilerplate code via `@Transaction`
- Read only what you need
- Enforce constraints between entities with foreign keys
- Simplify one-to-many queries via `@Relation`
- Avoid false positive notifications for observable queries

Để tiện follow, các bạn có thể xem ví dụ tại [Github#Room_tips](https://github.com/canhtv-0838/Room_tips). Ứng với mỗi phần là 1 commit.

### 1. Pre-populate the database

Đôi khi, bạn có thể muốn thêm dữ liệu cho database ngay sau khi database được khởi tạo hoặc khi database được mở. Việc này được gọi là prepopulating một database. Có 1 số cách để prepopulate database:

#### 1.1. Sử dụng `RoomDatabase#Callback`
Bằng cách sử dụng phương thức `.addCallback()` khi khởi tạo **RoomDatabase** và override phương thức `onCreate()` hoặc `onOpen()` để prepopulate database.
- `onCreate()` sẽ được gọi khi database được khởi tạo lần đầu tiên, ngay sau khi các bảng được tạo.
- `isOpen()` được gọi khi database được mở.
 
 `DataDatabase.kt`
```kotlin
     private fun buildDatabase(context: Context) =
            Room.databaseBuilder(
                context.applicationContext,
                DataDatabase::class.java, "Sample.db"
            )
                // prepopulate the database after onCreate was called
                .addCallback(object : Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        // insert the data on the IO Thread
                        CoroutineScope(Dispatchers.IO).launch {
                            getInstance(context).dataDao().insertData(PREPOPULATE_DATA)
                        }
                    }

//                    override fun onOpen(db: SupportSQLiteDatabase) {
//                        super.onOpen(db)
//                        CoroutineScope(Dispatchers.IO).launch {
//                            getInstance(context).dataDao().insertData(PREPOPULATE_DATA)
//                        }
//                    }
                })
                .build()

        val PREPOPULATE_DATA = listOf(Data("1", "val 1"), Data("2", "val 2"))

    }
```
#### 1.2. Prepopulate từ app asset
Đối với `Room 2.2.0` hoặc **cao hơn**, bạn có thể sử dụng API methods để prepopulate Room database bằng database file được lưu trong device. 
- Prepopulate Room database từ database file được lưu ở assets/ directory, có thể sử dụng `createFromAsset()` method từ `RoomDatabase.Builder` trước khi gọi `build()` method.

```kotlin
Room.databaseBuilder(appContext, AppDatabase.class, "Sample.db")
    .createFromAsset("database/myapp.db")
    .build()
```

 `createFromAsset()` nhận 1 string là đường dẫn của database file trong `assets/ directory`.
 
 #### 1.3. Prepopulate từ File
- Prepopulate Room database từ database file được lưu ở trong device, **ngoài thư mục assets/**. Sử dụng `createFromFile()` method từ `RoomDatabase.Builder` trước khi gọi build() method.

```kotlin
Room.databaseBuilder(appContext, AppDatabase.class, "Sample.db")
    .createFromFile(File("mypath"))
    .build()
```

`createFromFile()` có **argument là 1 File**.

Nếu app bị crash trong lần đầu tiên khởi chạy, nếu data được thực hiện insert khi database khởi tạo, data sẽ không được insert.
### 2. Use DAO’s inheritance capability
Database có nhiều bảng, và bận cần phải thực hiện các method **insert, update, delete** lặp lại nhiều lần? Điều này dẫn đến nhiều boilerplate code. 
Nếu bạn biết rằng DAOs support inheritance thì bạn có thể hạn chế điều đó bằng cách tạo 1 `BaseDao<T>` và define generic `@Insert`, `@Update`, `@Delete`.

```kotlin
interface BaseDao<T> {
   @Insert
   fun insert(vararg obj: T)
}

@Dao
interface DataDao : BaseDao<Data> {

    @Query("SELECT * FROM Data")
    fun getData(): List<Data>
}

```
DAOs có thể là interface hoặc abstract class. Bởi vì Room sẽ tự động generate implement tại compile time, bao gồm cả các methods từ BaseDao.

### 3. Execute queries in transactions with minimal boilerplate code
@Transaction annotation được sử dụng để chắc chắn rằng các database operation được thực hiện bên trong transaction. Nếu transaction fail thì sẽ throw ra 1 exception.

```kotlin
@Transaction
fun updateData(deletedData: Data, insertedData: Data) {
    delete(deletedData)
    insert(insertedData)
}
```

### 4. Read only what you need
Không phải lúc nào chúng ta cũng sử dụng hết các field của 1 object. Vì vậy bằng cách chỉ đọc những fields cần sử dụng có thể giúp cải thiện tốc độ truy vấn và giảm thiểu việc sử dụng memory.
Ví dụ chúng ta có object class: 
```kotlin
@Entity(tableName = "data")
data class Data(@PrimaryKey val id: String, val value: String)
```

Tuy nhiên chúng ta chỉ sử dụng 1 thuộc tính của object Data trên nên chúng ta sẽ tạo ra 1 object class chứa những thuộc tính mình cần sử dụng. (Mình hơi lười nên k tạo nhiều thuộc tính để minh họa, nhưng chắc các bạn cũng hiểu ý mình r.)
```kotlin
data class DataValue(
    val value: String
)
```
Và trong DAOs: 
```kotlin
@Query("SELECT value FROM data")
fun readOnlyValue() : List<DataValue>
```

### 5. Enforce constraints between entities with foreign keys
Room không trực tiếp support relation giữa các bảng. Tuy nhiên, chúng ta có thể define khóa ngoại giữa các entities.

Trong `@Entity annotation`, chúng ta có thể dựa vào `foreignKeys` để thiết lập mối quan hệ giữa các entities với nhau.
```kotlin
User.kt
@Entity(
    tableName = "user", foreignKeys = arrayOf(
        ForeignKey(
            entity = Data::class,
            parentColumns = arrayOf("id"),
            childColumns = arrayOf("user_id"),
            onDelete = ForeignKey.NO_ACTION
        )
    )
)
data class User(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val userId: String,
    @ColumnInfo(name = "name")
    val name: String,
    @ColumnInfo(name ="data_id")
    val dataId: String
)

Data.kt
@Entity(tableName = "data")
data class Data(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val id: String,
    @ColumnInfo(name = "value") val value: String
)
```
Ngoài ra, chúng ta có thể define action khi parent entity bị delete hoặc update trong database bằng các Constant NO_ACTION, RESTRICT, SET_NULL, SET_DEFAULT hoặc CASCADE.

Chú ý: trong Room, SET_DEFAULT hoạt động như SET_NULL bởi vì Room không cho phép setting defalt value cho columns.

```kotlin
 /**
     * Possible value for {@link #onDelete()} or {@link #onUpdate()}.
     * <p>
     * The "SET DEFAULT" actions are similar to {@link #SET_NULL}, except that each of the child key
     * columns is set to contain the columns default value instead of {@code NULL}.
     */
    
    int SET_DEFAULT = 4;
```

### 6. Simplify one-to-many queries via `@Relation`
Bài toán đặt ra: Mỗi Data trong List Data có List User. Để get List User của List Data
```
data class DataAndUsers (val data: Data,
                          val users: List<User> = ArrayList())
```
Bằng cách thông thường, chúng ta cần phải implement 2 queries.
1. Get List Data
```kotlin
@Query(“SELECT * FROM Data”)
fun getData() : List<Data>
```
sau đó 

2. Get List User của từng Data
```kotlin
@Query(“SELECT * FROM User where data_id =:dataId”)
fun getListUsers(dataId: String)
```
Để đơn giản hóa việc truy vấn, sử dụng `@Relation annotation` sẽ tự động fetch các các entities.
**`@Relation annotation` chỉ có thể sử dụng cho List hoặc Set.**
Trước tiên chúng ta cần tạo update lại class `DataAndUsers` 
```kotlin
data class DataAndUser(
    @Embedded
    var data: Data? = null,

    @Relation(
        parentColumn = "id",
        entityColumn = "data_id"
    )
    var users: List<User> = ArrayList()
)
```
Trong DAO, chúng ta chỉ cần sử dụng 1 query duy nhất cho cả Data và Users. 
```kotlin
@Transaction
@Query("SELECT * FROM Data")
fun getDataAndUser(): List<DataAndUser>
```

### 7. Avoid false positive notifications for observable queries

Bạn muốn get Data dựa vào id bằng cách observe chúng.

``` kotlin
@Query(“SELECT * FROM data WHERE id =:id)
fun getDataById(id: String): LiveData<Data>

//or

@Query(“SELECT * FROM data WHERE id =:id)
fun getDataById(id: String): Flowable<Data>
```

Bạn sẽ nhận được Data object được phát ra khi Data được update. Tuy nhiên bạn cũng nhận được Data tương tự khi thực hiện action khác (insert, update, delete) trên data table nhưng bạn lại không có bất kì thao tác nào với Data mà bạn nhận được. Thậm chí, nếu bạn thực hiện query ở nhiều bảng, bạn cũng có thể nhận được 1 emission bất kì khi nào có sự thay đổi từ chúng.
Lí do là 
-  SQLite support trigger bất kì khi nào DELETE, UPDATE or INSERT xảy ra ở 1 bảng.
-   Room create `InvalidationTracker` để lắng nghe sự thay đổi của bảng.
-   `LiveData` và `Flowable` query dựa vào `InvalidationTracker.Observer#onInvalidated`. Khi nó received, nó sẽ thực hiện **re-query**.

=>**Room chỉ biết rằng bảng đã bị thay đổi, chứ không hề biết tại sao nó thay đổi và thay đổi cái gì**. Vì vậy, ngay sau khi re-query, kết quả của query sẽ được emit bởi `LiveData` và `Flowable`. Bởi vì Room không nắm giữ bất kì dữ liệu nào bên trong memory và không thể nhận biết rằng object có equals() hay không. Chính vì vậy mà Room không thể biết rằng data có giống nhau hay không.

Chúng ta cần sử dụng DAO filters emssions để đảm bảo rằng Room chỉ phản hổi lại 1 object duy nhất. Việc này có thể tránh được việc observe vô tội vạ khi data thay đổi.

Nếu bạn sử dụng observable quey là `Flowables`, sử dụng `Flowable#distinctUntilChanged`.

```kotlin
@Dao
inteface DataDao : BaseDao<Data>() {
/**
* Get a Data by id.
* @return the Data from the table with a specific id.
*/
@Query(“SELECT * FROM data WHERE id =:id”)
fun getDataById(id: String): Flowable<Data>
fun getDistinctDataById(id: String): 
   Flowable<Data> = getDataById(id)
                          .distinctUntilChanged()
}
Trong sample của mình chỉ có LiveData thôi, phần này mình không đưa vào sample.
```

Nếu bạn sử dụng LiveData, bạn có thể sử dụng MediatorLiveData. MediatorLiveData cho phép lắng nghe emissions của 1 object duy nhất.

```kotlin
fun <T> LiveData<T>.getDistinct(): LiveData<T> {
    val distinctLiveData = MediatorLiveData<T>()
    distinctLiveData.addSource(this, object : Observer<T> {
        private var initialized = false
        private var lastObj: T? = null
        override fun onChanged(obj: T?) {
            if (!initialized) {
                initialized = true
                lastObj = obj
                distinctLiveData.postValue(lastObj)
            } else if ((obj == null && lastObj != null) 
                       || obj != lastObj) {
                lastObj = obj
                distinctLiveData.postValue(lastObj)
            }
        }
    })
    return distinctLiveData
}
```
Trong DAOs,  method return `LivaData`
```
@Query("SELECT * FROM Data WHERE id=:dataId")
fun getDataChanged(dataId: String): LiveData<Data>
```

Và chúng khi chúng ta observe nó
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tip7)
        CoroutineScope(Dispatchers.IO).launch {
            val dao = DataDatabase.getInstance(this@Tip7Activity).dataDao()
            val data = dao.getDataChanged("2").getDistinct()
            withContext(Dispatchers.Main) {
                data.observe(this@Tip7Activity, Observer {
                    tip7Content.text = it?.toString() ?: "";
                })
            }
            dao.update(Data("2", "id 2 is updated"))
        }
    }
```


### Source
Bài viết được tham khảo tại: 
- [7 Pro-tips for Room](https://medium.com/androiddevelopers/7-pro-tips-for-room-fbadea4bfbd1). Tuy nhiên đã chỉnh sửa để phù hợp với sample.
- [Android developer](https://developer.android.com/training/data-storage/room/prepopulate)