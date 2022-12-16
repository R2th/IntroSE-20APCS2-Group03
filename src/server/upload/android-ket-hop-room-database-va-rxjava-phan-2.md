# Mở đầu 

Chào các bạn 

Như bài trước mình đã giới thiệu với các bạn về việc Kết hợp Room Database và Rxjava trong bài viết này mình sẽ tiếp tục đi sâu vào code để giúp các bạn hiểu rõ  để có thể ứng dụng vào dự án của mình 

Chúng ta sẽ cùng đi làm một ứng dụng đơn giản lưu thông tin User vào database và có thể sửa nó


## Room

Đầu tiên chúng ta sẽ đi xây dựng các thành phần chính của Room bao gồm ba thành phần chính đó là : Database, DAO (Data Access Object), và Entity

### Entity

Chúng ta tạo một data class User . Với mỗi một entity thì một database table sẽ được tạo để giữ các items tương ứng
Một bảng cơ sở dữ liệu duy nhất được tạo cho mỗi class được chú thích với @Entity.

Với mỗi Object được định nghĩa với anotation @Entity Room sẽ tạo một table cho đối tượng này trong database với name là tableName được chú thích. Room sẽ tạo các cột tương ứng với số field được khai báo trong object. Nếu không muốn lưu trữ bạn có thể sử dụng anotation @Ignore Bạn có thể custom lại tên của cột thông qua anotaion @ColumnInfo(name = "column name")

```
@Entity(tableName = "users")
data class User(@PrimaryKey
                @ColumnInfo(name = "userid")
                val id: String = UUID.randomUUID().toString(),
                @ColumnInfo(name = "username")
                val userName: String)
```

### DAO (Data Access Object)

DAO là interface được chú thích với @Dao, nó đóng vai trò trung gian truy cập vào các đối tượng trong cơ sở dữ liệu và các bảng của nó. Có bốn chú thích cụ thể cho các hoạt động cơ bản của DAO: @Insert, @Update, @Delete, and @Query.


```
@Dao
interface UserDao {

    /**
     * Get a user by id.

     * @return the user from the table with a specific id.
     */
    @Query("SELECT * FROM Users WHERE userid = :id")
    fun getUserById(id: String): Flowable<User>

    /**
     * Insert một User vào database nêu user đã tồn tại thì replace user đó

     * @param user the user to be inserted.
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(user: User)

    /**
     * Delete all users.
     */
    @Query("DELETE FROM Users")
    fun deleteAllUsers()
}
```

### Database

Chúng ta tạo UsersDatabase bằng việc kế thừa từ class RoomDatabase

Thành phần Database là một abstract class đã được chú giải bằng @Database, nó extends RoomDatabase. Class này định nghĩa một danh sách các Entities và các DAO của nó.


```
@Database(entities = arrayOf(User::class), version = 1)
abstract class UsersDatabase : RoomDatabase() {

    abstract fun userDao(): UserDao

    companion object {

        @Volatile private var INSTANCE: UsersDatabase? = null

        fun getInstance(context: Context): UsersDatabase =
                INSTANCE ?: synchronized(this) {
                    INSTANCE ?: buildDatabase(context).also { INSTANCE = it }
                }

        private fun buildDatabase(context: Context) =
                Room.databaseBuilder(context.applicationContext,
                        UsersDatabase::class.java, "Sample.db")
                        .build()
    }
}
```



### ViewModelFactory

Để khởi tạo ViewModel, chúng ta  cần có ViewModelFactory: đó là một lớp thực hiện ViewModelProvider.Factory và nó sẽ tạo ViewModel từ một tham số . Class.

Khi bạn gọi phương thức get (), ViewModelProvider gọi phương thức create () của ViewModel Factory và theo kiểu lớp, phương thức trả về instance của ViewModel . Vì vậy, nếu chúng ta tạo ViewModel mới, chúng ta cần chỉnh sửa lớp này hoặc tạo ViewModelFactory mới để quản lý lớp mới.


```
class ViewModelFactory(private val dataSource: UserDao) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(UserViewModel::class.java)) {
            return UserViewModel(dataSource) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
```

###  ViewModel

+ Sau đó  chúng ta cần xây dựng 1  viewmodel cho UserActivity

```
 /**
     * Get the user name of the user.

     * @return a [Flowable] that will emit every time the user name has been updated.
     */
    // for every emission of the user, get the user name
    fun userName(): Flowable<String> {
        return dataSource.getUserById(USER_ID)
                .map { user -> user.userName }
    }

    /**
     * Update the user name.
     * @param userName the new user name
     * *
     * @return a [Completable] that completes when the user name is updated
     */
    fun updateUserName(userName: String): Completable {
        return Completable.fromAction {
            val user = User(USER_ID, userName)
            dataSource.insertUser(user)
        }
    }

    companion object {
        // using a hardcoded value for simplicity
        const val USER_ID = "1"
    }
```
### UserActivity

Trong activity chúng ta sẽ subscribe các emission của User và cập nhật giao diện người dùng mỗi khi có tên người dùng mới được emitted và Notify cho ViewModel khi nhấn nút button  "Update" để view mode lấy và lưu User

```
class UserActivity : AppCompatActivity() {

    private lateinit var viewModelFactory: ViewModelFactory

    private lateinit var viewModel: UserViewModel

    private val disposable = CompositeDisposable()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user)

        viewModelFactory = Injection.provideViewModelFactory(this)
        viewModel = ViewModelProviders.of(this, viewModelFactory).get(UserViewModel::class.java)
        update_user_button.setOnClickListener { updateUserName() }
    }

    override fun onStart() {
        super.onStart()
        // Subscribe to the emissions of the user name from the view model.
        // Update the user name text view, at every onNext emission.
        // In case of error, log the exception.
        disposable.add(viewModel.userName()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({ this.user_name.text = it },
                        { error -> Log.e(TAG, "Unable to get username", error) }))
    }

    override fun onStop() {
        super.onStop()

        // clear all the subscription
        disposable.clear()
    }

    private fun updateUserName() {
        val userName = user_name_input.text.toString()
        // Disable the update button until the user name update has been done
        update_user_button.isEnabled = false
        // Subscribe to updating the user name.
        // Enable back the button once the user name has been updated
        disposable.add(viewModel.updateUserName(userName)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({ update_user_button.isEnabled = true },
                        { error -> Log.e(TAG, "Unable to update username", error) }))
    }

    companion object {
        private val TAG = UserActivity::class.java.simpleName
    }
}
```
## Kết

   Chúng ta đã cùng nhau tìm hiểu về Room database một Components quan trọng trong Kiến trúc Android. Hi vọng bài viết này sẽ giúp ich cho các bạn  trong cuộc hành trình phát triển ứng dụng Android của mình
   ở bài viết sau mình sẽ cố gắng giới thiêu cho các bạn các Components khác nữa
   
   thank for reading !!!
   
   

## reference
https://developer.android.com/topic/libraries/architecture/room
https://github.com/googlesamples/android-architecture-components/tree/master/BasicRxJavaSample
https://medium.com/androiddevelopers/room-rxjava-acb0cd4f3757
https://code.tutsplus.com/vi/tutorials/android-architecture-components-room--cms-29946