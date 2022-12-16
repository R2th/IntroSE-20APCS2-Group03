> Room là một persistence library, một phần của Android Architecture Components. Nó giúp bạn dễ dàng là việc với đối tượng SQLiteDatabase trong ứng dụng của bạn hơn,  giảm số lượng mã soạn sẵn và xác minh các truy vấn SQL tại thời điểm biên dịch
> Vậy để tiếp cận và sử dụng Room cho những người mới vừa bắt đầu mà lại không muốn thao tác quá phức tạp như việc giao tác trực tiếp với SQLite hãy đọc tiếp và xem cách sử dụng Room nhé  :D
### Bước 1 —  Nâng cấp gradle dependencies trong ứng dụng của bạn
Các phụ thuộc Room phòng có sẵn thông qua kho lưu trữ Maven mới của Google, chỉ cần thêm nó vào danh sách các kho lưu trữ trong tệp build.gradle chính của bạn
```
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```
Thêm phiên bản Room library của bạn
```
ext {
   ... 
    roomVersion = '1.0.0-alpha4'
}
```
Trong file  app/build.gradle , thêm dependencies cho Room
```
dependencies{
 …
implementation        
   “android.arch.persistence.room:runtime:$rootProject.roomVersion”
annotationProcessor 
   “android.arch.persistence.room:compiler:$rootProject.roomVersion”
androidTestImplementation 
   “android.arch.persistence.room:testing:$rootProject.roomVersion”
}
```
Tiếp theo , để migrate trong room nghĩa là tăng phiên bản Database của bạn lên và nâng cấp các bảng dữ liệu của bạn , Thêm đoạn mã này vào file app/build.gradle :
```
android {
    defaultConfig {
        ...
       // used by Room, to test migrations
        javaCompileOptions {
            annotationProcessorOptions {
                arguments = ["room.schemaLocation": 
                                 "$projectDir/schemas".toString()]
            }
        }
    }

    // used by Room, to test migrations
    sourceSets {
        androidTest.assets.srcDirs += 
                           files("$projectDir/schemas".toString())
    }
...
```
###  Bước 2 - Cập nhật các thực thể Model trong Room 
Room tạo ra một bảng như là một Class trong 1DB với anotation với việc dùng  @Entity 
@PrimaryKey dùng để set khóa chính cho bất kì 1 trường nào trong bảng 
@ColumnInfo(name = “column_name”) chúng ta dùng nó để đặt tên cho 1 cột trong bảng 
Nếu trong trường hợp các class có nhiều constructor thì anotation @Ignore giúp Room phân biệt cons nào dùng và không 
```
@Entity(tableName = "users")
public class User {

    @PrimaryKey
    @ColumnInfo(name = "userid")
    private String mId;

    @ColumnInfo(name = "username")
    private String mUserName;

    @ColumnInfo(name = "last_update")
    private Date mDate;

    @Ignore
    public User(String userName) {
        mId = UUID.randomUUID().toString();
        mUserName = userName;
        mDate = new Date(System.currentTimeMillis());
    }

    public User(String id, String userName, Date date) {
        this.mId = id;
        this.mUserName = userName;
        this.mDate = date;
    }
...
}
```
### Bước 3 - Tạo Data Access Objects (DAOs)
**DAOs chịu trách nhiệm định nghĩa các phương thức truy cập trong DB **

Với room đơn giản chỉ cần khai báo các câu lệnh như sau : 
```
@Query(“SELECT * FROM Users”)
List<User> getUsers();
```
@Query là anotation như là định nghĩa một mẫu hỏi trong việc truy vấn DB
### Bước 4 - Tạo DataBase 
Chúng ta đã xác định bảng Users và các truy vấn tương ứng, nhưng chúng ta đã tạo ra cơ sở dữ liệu kết hợp các phần khác của Room này lại với nhau. Để làm điều này, chúng ta cần định nghĩa một lớp trừu tượng mở rộng . Lớp này được chú thích với @Database
```
Database(entities = {User.class}, version = 2)
@TypeConverters(DateConverter.class)
public abstract class UsersDatabase extends RoomDatabase {

    private static UsersDatabase INSTANCE;

    public abstract UserDao userDao();
```
Và trong trường hợp chúng ta muốn dữ lại các dữ liệu đã lưu và muốn nâng cấp phiên bản của Db nhưng lại không thay đổi các bảng ta cũng cấp 1 migration rỗng  :
```
static final Migration MIGRATION_1_2 = new Migration(1, 2) {
    @Override
    public void migrate(SupportSQLiteDatabase database) {
// Since we didn't alter the table, there's nothing else to do here.
    }
};
```
Tạo ra 1 một đối tượng DB và thêm migration bằng cách dưới đây :
```
database = Room.databaseBuilder(context.getApplicationContext(),
        UsersDatabase.class, "Sample.db")
        .addMigrations(MIGRATION_1_2)
        .build();
```
### Bước 5 - Nâng cấp Repository để sử dụng Room
Chúng ta đã tạo ra Dao giúp ta thao tác với Sqlite qua câu lệnh. Sau đó tạo ra LocalUserDataSource để dùng các phương thức của DAOs. Và chúng ta sẽ cập nhật LocalUserDataSource Như sau :
```
public List<User> getUsers() {
   return mUserDao.getUsers();
}
```
### Bước 6 - Unitest Room 
**Testing UserDao**

```
@Before
public void initDb() throws Exception {
    mDatabase = Room.inMemoryDatabaseBuilder(
                           InstrumentationRegistry.getContext(),
                           UsersDatabase.class)
                    .build();
}
```
Để chắc chắn đã đóng cổng Connect Db sau khi test thì :
```
@After
public void closeDb() throws Exception {
    mDatabase.close();
}
```
Để insert 1 user nào đó trong quá trình test :
```
@Test
public void insertAndGetUser() {
    // When inserting a new user in the data source
    mDatabase.userDao().insertUser(USER);

    //The user can be retrieved
    List<User> users = mDatabase.userDao().getUsers();
    assertThat(users.size(), is(1));
    User dbUser = users.get(0);
    assertEquals(dbUser.getId(), USER.getId());
    assertEquals(dbUser.getUserName(), USER.getUserName());
}
```
## Trên đây là những tổng hợp lưu ý khi tiếp cận và sử dụng với 6 bước !! Chúc các bạn có thể sử dụng thành thục room một cách dễ dàng để thao tác các dữ liệu Local !!