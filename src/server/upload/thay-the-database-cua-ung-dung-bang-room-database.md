Room Database(**Room Persistence Library**) là một phần trong Android Architecture Components, nó giúp cho việc thao tác với SQLiteDatabase Object trở lên dễ dàng hơn, giảm thiểu số lượng câu truy vấn bằng những annotation sẵn có và xác minh truy vấn tại thời điểm biên dịch.

Đó chỉ là một phần của trải nghiệm và còn nhiều thú vị hơn khi chúng ta đi sâu vào tìm hiểu thông qua ví dụ thực tế. Chắc hẳn đã có bạn đọc bài viết của mình về [Architecture ViewModel](https://viblo.asia/p/xu-ly-toi-uu-khi-xoay-man-hinh-voi-architecture-component-viewmodel-co-vi-du-thuc-te-07LKXAVJZV4) trong đó có một ví dụ thực tiễn và hôm nay mình sẽ ứng dụng trực tiếp Room để cải tiến project này.

### 1. Cấu tạo của Room Database

Điều đầu tiên chúng ta sẽ quan tâm đấy là thành phần Room database gồm những gì.

![](https://images.viblo.asia/0c6374c9-8cce-470c-a074-3fdbbd754d28.png)

- SQLite database: Đây chính là thành phần cốt lõi mà các data được lưu trữ trong đây. Và file này được lưu trong thiết bị.
- DAO (Data access object): Chứa các ánh xạ SQLite tới các hàm CRUD. Chắc hẳn bạn vẫn còn nhớ mình đã phải rất cẩn thận viết câu queries SQLite chứ, nếu chẳng may có sai thì phải dò lại rất cẩn thận. Nhưng bây giờ điều đó trở lên đơn giản hơn rất nhiều, khi bạn dùng DAO và call các method rồi Room sẽ làm tiếp những phần còn lại. (Cách queries cũ mình để phía dưới để lát nữa bạn tiện so sánh). *Tiếp nhé ^^*
- Entity: Đây chính là những đối tượng nhỏ bạn cần lưu trữ (table) Ex: user table, event table,... Hiện tại tất cả việc định nghĩa thuộc tính đã được support bằng annotations rất ngắn gọn.
- Room database: Đây là lớp abstract layer nằm ngoài cùng đóng vai trò quản lý SQLite database và cho phép truy cập tới tầng dưới cùng của SQLite. Room dùng DAO để thực hiện các queries tới database.

*(Cách queries cũ với SQLiteOpenHelper)*

`EmployeeOperations.java`

```
public class EmployeeOperations {
    public static final String LOGTAG = "EMP_MNGMNT_SYS";
 
    SQLiteOpenHelper dbhandler;
    SQLiteDatabase database;
 
    private static final String[] allColumns = {
            EmployeeDBHandler.COLUMN_ID,
            EmployeeDBHandler.COLUMN_FIRST_NAME,
            EmployeeDBHandler.COLUMN_LAST_NAME,
            EmployeeDBHandler.COLUMN_GENDER,
            EmployeeDBHandler.COLUMN_HIRE_DATE,
            EmployeeDBHandler.COLUMN_DEPT
 
    };
 
    public EmployeeOperations(Context context){
        dbhandler = new EmployeeDBHandler(context);
    }
 
    public void open(){
        Log.i(LOGTAG,"Database Opened");
        database = dbhandler.getWritableDatabase();
 
 
    }
    public void close(){
        Log.i(LOGTAG, "Database Closed");
        dbhandler.close();
 
    }
    public Employee addEmployee(Employee Employee){
        ContentValues values  = new ContentValues();
        values.put(EmployeeDBHandler.COLUMN_FIRST_NAME,Employee.getFirstname());
        values.put(EmployeeDBHandler.COLUMN_LAST_NAME,Employee.getLastname());
        values.put(EmployeeDBHandler.COLUMN_GENDER, Employee.getGender());
        values.put(EmployeeDBHandler.COLUMN_HIRE_DATE, Employee.getHiredate());
        values.put(EmployeeDBHandler.COLUMN_DEPT, Employee.getDept());
        long insertid = database.insert(EmployeeDBHandler.TABLE_EMPLOYEES,null,values);
        Employee.setEmpId(insertid);
        return Employee;
 
    }
 
    // Getting single Employee
    public Employee getEmployee(long id) {
 
        Cursor cursor = database.query(EmployeeDBHandler.TABLE_EMPLOYEES,allColumns,EmployeeDBHandler.COLUMN_ID + "=?",new String[]{String.valueOf(id)},null,null, null, null);
        if (cursor != null)
            cursor.moveToFirst();
 
        Employee e = new Employee(Long.parseLong(cursor.getString(0)),cursor.getString(1),cursor.getString(2),cursor.getString(3),cursor.getString(4),cursor.getString(5));
        // return Employee
        return e;
    }
 
    public List<Employee> getAllEmployees() {
 
        Cursor cursor = database.query(EmployeeDBHandler.TABLE_EMPLOYEES,allColumns,null,null,null, null, null);
 
            List<Employee> employees = new ArrayList<>();
        if(cursor.getCount() > 0){
            while(cursor.moveToNext()){
                Employee employee = new Employee();
                employee.setEmpId(cursor.getLong(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_ID)));
                employee.setFirstname(cursor.getString(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_FIRST_NAME)));
                employee.setLastname(cursor.getString(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_LAST_NAME)));
                employee.setGender(cursor.getString(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_GENDER)));
                employee.setHiredate(cursor.getString(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_HIRE_DATE)));
                employee.setDept(cursor.getString(cursor.getColumnIndex(EmployeeDBHandler.COLUMN_DEPT)));
                employees.add(employee);
            }
        }
        // return All Employees
        return employees;
    }
 
 
 
 
    // Updating Employee
    public int updateEmployee(Employee employee) {
 
        ContentValues values = new ContentValues();
        values.put(EmployeeDBHandler.COLUMN_FIRST_NAME, employee.getFirstname());
        values.put(EmployeeDBHandler.COLUMN_LAST_NAME, employee.getLastname());
        values.put(EmployeeDBHandler.COLUMN_GENDER, employee.getGender());
        values.put(EmployeeDBHandler.COLUMN_HIRE_DATE, employee.getHiredate());
        values.put(EmployeeDBHandler.COLUMN_DEPT, employee.getDept());
 
        // updating row
        return database.update(EmployeeDBHandler.TABLE_EMPLOYEES, values,
                EmployeeDBHandler.COLUMN_ID + "=?",new String[] { String.valueOf(employee.getEmpId())});
    }
 
    // Deleting Employee
    public void removeEmployee(Employee employee) {
 
        database.delete(EmployeeDBHandler.TABLE_EMPLOYEES, EmployeeDBHandler.COLUMN_ID + "=" + employee.getEmpId(), null);
    }
 
 
 
}
```

### 2. Bước cài đặt

Sau khi am hiểu hoặc mới chỉ nắm bắt được các thành phần của Room rồi chúng ta sẽ cùng nhau implement vào project nhé.
Đầu tiên phải thêm Google Maven repository, nếu bạn chưa có thì vào *build.gradle* :

```
allprojects {
    repositories {
        jcenter()
        google()
    }
}
```

Thêm dependencies vào *app/build.gradle* vì trong project chúng ta dùng thêm Lifecycle để thực thi việc thay đổi data:

```
    //Room
    implementation "android.arch.persistence.room:runtime:$rootProject.room_version"
    annotationProcessor "android.arch.persistence.room:compiler:$rootProject.room_version"

    //Lifecycle
    implementation "android.arch.lifecycle:extensions:$rootProject.lifecycle_version"
    annotationProcessor "android.arch.lifecycle:compiler:$rootProject.lifecycle_version"
```

Bước cài đặt khá nhanh và đơn giản, tiếp theo chúng ta chuyển bước số 3

### 3. Khởi tạo các thành phần của Room

Vừa rồi chúng ta thấy có 4 thành phần nhưng rõ ràng SQLite là nhân và bạn không cần khởi tạo nên bây giờ lần lượt sẽ tiến hành tạo : Entity, DAO và RoomDatabase.

**Entity**

Chúng ta thay đổi User.class -> UserEntity như sau:

**Chú ý:** Để hiểu sâu về điều này các bạn vui lòng `fork` project của mình và **checkout** sang `branch develop` : **[GitHub Source](https://github.com/thanhviet-ucan/ArchitectureComponentViewModel/tree/develop)**

Đây là code lúc chưa implement Room để tiện so sánh việc thay đổi như nào. Ở đây mình sẽ đăng tải code đã chỉnh sửa để phù hợp với nội dung bài viết.

`UserEntity.java`

```
@Entity(tableName = "user_table")
public class UserEntity implements User {
    @PrimaryKey(autoGenerate = true)
    private int id;
    @ColumnInfo(name = "name")
    @NonNull
    private String name;
    @ColumnInfo(name = "job")
    @NonNull
    private String job;
    @ColumnInfo(name = "idImage")
    @NonNull
    private int idImage;

    public UserEntity(String name, String job, int idImage) {
        this.name = name;
        this.job = job;
        this.idImage = idImage;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getJob() {
        return job;
    }

    @Override
    public int getIdImage() {
        return idImage;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```

**DAO:**

Với mỗi Entity các bạn tạo 1 class DAO bởi vì đây là class thực hiện việc queries đến SQLite và rõ ràng table khác nhau thì việc xử lý phải riêng biệt. Đến đây nếu còn chưa hiểu bạn có thể đọc lại nội dung ở trên hoặc comment phía dưới bài viết nha. 

`UserDao.java`

```
@Dao
public interface UserDao {
    @Query("SELECT * FROM user_table ORDER BY name ASC")
    LiveData<List<UserEntity>> loadAllUsers();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertAll(List<UserEntity> users);

    @Query("select * from user_table where id = :userId")
    LiveData<UserEntity> loadUser(int userId);

    @Query("DELETE FROM user_table WHERE id = :userId")
    void deleteUser(int userId);
}
```

**Chú ý:** Các bạn đừng quên annotation `@Dao` nha

Rất tốt bây giờ chúng ta sắp xong rồi, thêm 1 class Room database để quản lý tất cả Entity

**Room Database:**

`UserRoomDB.java`

```
@Database(entities = { UserEntity.class }, version = 1)
public abstract class UserRoomDB extends RoomDatabase {

    public abstract UserDao mUserDao();

    public static final String DATABASE_NAME = "user-list-archvm-db";
    private static UserRoomDB sInstance;
    private final MutableLiveData<Boolean> mIsDatabaseCreated = new MutableLiveData<>();

    public static UserRoomDB getInstance(final Context context, final AppExecutors executors) {
        if (sInstance == null) {
            synchronized (UserRoomDB.class) {
                if (sInstance == null) {
                    sInstance = buildDatabase(context.getApplicationContext(), executors);
                    sInstance.updateDatabaseCreated(context.getApplicationContext());
                }
            }
        }
        return sInstance;
    }

    private static UserRoomDB buildDatabase(final Context appContext, final AppExecutors executors) {
        return Room.databaseBuilder(appContext, UserRoomDB.class, DATABASE_NAME)
                .addCallback(new Callback() {
                    @Override
                    public void onCreate(@NonNull SupportSQLiteDatabase db) {
                        super.onCreate(db);
                        executors.diskIO().execute(new Runnable() {
                            @Override
                            public void run() {
                                UserRoomDB database = UserRoomDB.getInstance(appContext, executors);
                                List<UserEntity> userEntities = DataGenerator.generateUsers();
                                insertData(database, userEntities);
                                database.setDatabaseCreated();
                            }
                        });
                    }
                })
                .build();
    }

    private static void insertData(final UserRoomDB database, final List<UserEntity> userEntities) {
        database.runInTransaction(new Runnable() {
            @Override
            public void run() {
                database.mUserDao().insertAll(userEntities);
            }
        });
    }

    private void updateDatabaseCreated(final Context context) {
        if (context.getDatabasePath(DATABASE_NAME).exists()) {
            setDatabaseCreated();
        }
    }

    private void setDatabaseCreated() {
        mIsDatabaseCreated.postValue(true);
    }

    public LiveData<Boolean> getDatabaseCreated() {
        return mIsDatabaseCreated;
    }
}
```

Ở đây chúng ta đã khởi tạo những record ban đầu vào trong table User, vì vậy mà trong Callback của function create DB đã insert data trong đó.

Trong bài viết trước chúng ta đã dùng Architecture ViewModel, do vậy cần có một config để lắng nghe data thay đổi thì cần update lại View bằng việc sử dụng LiveData. Đây cũng chính là lý do chúng ta cần import thêm Lifecycle đã nói ở trên.

**Thay đổi ở ViewModel:**

`UserViewModel.java`

```
public class UserViewModel extends AndroidViewModel {
    private final MediatorLiveData<List<UserEntity>> mObservableUsers;

    public UserViewModel(@NonNull Application application) {
        super(application);
        mObservableUsers = new MediatorLiveData<>();
        mObservableUsers.setValue(null);

        LiveData<List<UserEntity>> products = BaseApp.getInstance().getRepository().getUserEntity();

        // observe the changes of the products from the database and forward them
        mObservableUsers.addSource(products, new Observer<List<UserEntity>>() {
            @Override
            public void onChanged(@Nullable List<UserEntity> userEntities) {
                mObservableUsers.setValue(userEntities);
            }
        });
    }

    public LiveData<List<UserEntity>> getUserList() {
        return mObservableUsers;
    }
}
```

`MainActivity.java`

```
private void subscribeUi(UserViewModel viewModel) {
        // Update the list when the data changes
        viewModel.getUserList().observe(this, new Observer<List<UserEntity>>() {
            @Override
            public void onChanged(@Nullable List<UserEntity> userEntities) {
                if (userEntities != null) {
//                    mBinding.setIsLoading(false);
                    mAdapter.setUserList(userEntities);
                }
                // espresso does not know how to wait for data binding's loop so we execute changes
                // sync.
                mBinding.executePendingBindings();
            }
        });
    }
```

Như vậy các bước chúng ta đều hoàn thiện, các bạn hay chạy thử project của mình để kiểm tra kết quả và so sánh với source code cũ để hiểu thêm cách phối hợp giữa các Architecture Components với nhau.

### 4. Tổng kết

Vừa rồi mình đã cung cấp cách áp dụng Room database để thay thế cho database hiện tại, ngoài việc mong muốn chúng ta đều có cách tiếp cận công nghệ mới và đồng thời giúp cho việc phát triển Android APP chất lượng hơn. Hy vọng rằng với những nội dung trên đây sẽ hữu ích cho các bạn!!!

Tất cả source code mình đã để ở đây **[GitHub Source](https://github.com/thanhviet-ucan/ArchitectureComponentViewModel)**