Xin chào mọi người! Tại Google IO 2017, Google đã giới thiệu thư viện Room persistence cho phép truy cập database lưu loát trong khi khác thác toàn bộ sức mạnh của SQLite. Về cơ bản, nó là abstraction layer trên SQLite.

Room là một cách mới để tạo database trong ứng dụng Android của bạn, nó rất giống OrmLite.

*Famework này cung cấp hỗ trợ tích hợp để làm với nội dung SQL thô. Mặc dù các API này rất mạnh, chúng ở mức độ khá thấp và đỏi hỏi nhiều thời gian và công sức để sử dụng*

*Không có xác định complite- time các truy vấn SQL thôi.*

*Bạn cần viết nhiều đoạn code để chuyển đổi giữa các truy vấn SQL và đối tượng dữ liệu Java.*

*Room sẽ giúp những mối quan tâm này cho bạn trong khi cung cấp một lớp trừu tượng trên SQLite.*

**Database, Entity, DAO**

Có 3  thành phần chính trong Room:

**Entity** đại diện data cho một hàng của table, được xây dựng bằng cách sử dụng một object data có  annotate. 

**DAO**(Data Access Object) định nghĩa cho method truy cập database, dùng annotation để liên kết SQL với từng phương thức.

**Database** là class chủ sử dụng annotation để xác định các list của entity và database version. Nội dụng class này xác định danh sách các DAO.

![](https://images.viblo.asia/487dc13e-4c91-4792-a937-4ad61a38e3ff.png)

Hãy làm qua một ví dụ để hiểu rõ hơn về cách thức hoạt động, Trong ví dụ này, tôi sẽ tạo một ứng dụng cho phép lưu chi tiết người dùng như first name, last name, age.

1. Tạo mọt project mới trong Android Studio với empty activity.

2. Add dependencies trong module *build.gradle* 

```
compile 'android.arch.persistence.room:runtime:' + rootProject.archRoomVersion;
annotationProcessor 'android.arch.persistence.room:compiler:' + rootProject.archRoomVersion;
```

Định nghĩa project dependencies và thêm Google Maven repository trong root *build.gradle*

```
ext {
    buildToolsVersion = "25.0.2"
    supportLibVersion = "25.3.1"
    archRoomVersion = "1.0.0-alpha1"
}
allprojects {
    repositories {
        jcenter()
        maven { url 'https://maven.google.com' }
    }
}
```

3. Bây giờ, hãy tạo một emtity đã gọi User. Nó định nghĩa các thành phần của table củ bạn, nó phải được khởi tạo một field là primary key. Nó có thuộc tính đẻ tự động tạo ra các values. Class là annotatied với **@Entity** và tên của table. Để tạo một khóa chính của trường, bạn cần một annotate một trường với **@PrimaryKey**  và thuộc tính **autoGenerte** chỉ định ID tự động. Rôm sẽ tạo một bảng user với các thuộc tính đã được xác định.

```
@Entity(tableName = "user")
public class User {

    @PrimaryKey(autoGenerate = true)
    private int uid;

    @ColumnInfo(name = "first_name")
    private String firstName;

    @ColumnInfo(name = "last_name")
    private String lastName;

    @ColumnInfo(name = "age")
    private int age;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```

4. Tạo mọt data access object dùng interface. Trong class là annotated với **@Dao** annotation. Room sẽ tạo generate ra implementation các methed xác định. Có 4 annotations **@Query, @Insert, @Update, @Delete** để thực hiện các tha tác CRUD. @Query annotation được sử dụng để thực hiện thao tác đọc trên database.

```
@Dao
public interface UserDao {

    @Query("SELECT * FROM user")
    List<User> getAll();

    @Query("SELECT * FROM user where first_name LIKE  :firstName AND last_name LIKE :lastName")
    User findByName(String firstName, String lastName);

    @Query("SELECT COUNT(*) from user")
    int countUsers();

    @Insert
    void insertAll(User... users);

    @Delete
    void delete(User user);
}
```

5. Tạo database gọi AppDatabase extends RoomDatabase, chúng sẽ định nghĩa danh sách của entity và database version. Class là annotated với **@Database** annotation. Nó thực hành tốt để sử dụng phương pháp singleton cho database, nên bạn cần tạo 1 static method chúng sẽ trả về instance của AppDatabase.

```
@Database(entities = {User.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    private static AppDatabase INSTANCE;

    public abstract UserDao userDao();

    public static AppDatabase getAppDatabase(Context context) {
        if (INSTANCE == null) {
            INSTANCE =
                    Room.databaseBuilder(context.getApplicationContext(), AppDatabase.class, "user-database")
                            // allow queries on the main thread.
                            // Don't do this on a real app! See PersistenceBasicSample for an example.
                            .allowMainThreadQueries()
                            .build();
        }
        return INSTANCE;
    }

    public static void destroyInstance() {
        INSTANCE = null;
    }
}
```

Thật tuyệt vời, Bạn đã hoàn thành! Bạn có thể thêm user trong user table của database. Bạn phải thực hiện các query trên worker thread, nếu không ứng dụng sẽ bị crash.

```
private static User addUser(final AppDatabase db, User user) {
    db.userDao().insertAll(user);
    return user;
}

private static void populateWithTestData(AppDatabase db) {
    User user = new User();
    user.setFirstName("Ajay");
    user.setLastName("Saini");
    user.setAge(25);
    addUser(db, user);
}
```

Tuy nhiên, nó cung cấp cho bạn một tùy chọn để thực hiện các query trên main thread bằng cách gọi "allowMainThreadQueries" method trong RoomDatabase Builder. 

Nếu bạn tìm thấy điều gì đó để cải thiện hoặc có bất kỳ đề xuất nào, đừng ngại liên hệ với tôi, tôi sẽ cố gắng hết sức để trả lời bất kỳ câu hỏi nào hoặc cải thiện hướng dẫn này.

Tham khảo: https://medium.com/@ajaysaini.official/building-database-with-room-persistence-library-ecf7d0b8f3e9