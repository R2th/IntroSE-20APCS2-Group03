Chào các bạn, đây là bài thứ 2 trong loạt bài viết hướng dẫn về Dependency Injection và sử dụng thư viện Dagger 2 trong Android. Nếu bạn chưa đọc qua phần 1, bạn có thể đọc [ở đây](https://viblo.asia/p/dependency-injection-with-dagger-2-trong-android-phan-1-RQqKL2e0l7z)

Phần này mình sẽ xây dựng 1 ứng dụng demo để mô tả cách thức làm việc với Dagger 2 trong Android. 1 ứng dụng hết sức cơ bản thôi để giúp các bạn hình dung được cách làm.

Đây là ứng dụng có chức năng load dữ liệu về các Hotgirl từ trong database SQLite ra và hiển thị ra RecyclerView. Nó còn có thêm chức năng load 1 đoạn accessToken từ SharePreference và hiển thị lên Toolbar của ứng dụng. Just demo, đơn giản đúng không?

## Bắt đầu
## 

Đầu tiên, bạn hãy nhìn vào cấu trúc của dự án.

![](https://images.viblo.asia/539ec930-da73-40f7-930f-ceee561b9676.png)

Các thành phần cốt lõi của ứng dụng bao gồm:

**DataManager**: Lớp cung cấp các phương thức truy cập vào dữ liệu trong ứng dụng. Dữ liệu có thể lấy từ SQLite Database hoặc SharedPreference.

**DbHelper:** Lớp cung cấp các phương thức truy cập vào SQLite Database, lớp này được sử dụng bởi Data Manager.

**SharedPrefsHelper:** Lớp cung cấp các phương thức làm việc với SharedPreference. Lớp này cũng được sử dụng bởi DataManager.

**Hotgirl**: Lớp model của ứng dụng, để lưu trữ thông tin của các hotgirl <3

## Bước 1: thêm thư viện Dagger 2 vào dự án.
## 
Thêm các câu lệnh sau vào file build.gradle (ở app module) để import thư viện Dagger 2.

```java
//Dagger
implementation "com.google.dagger:dagger:2.8"
annotationProcessor "com.google.dagger:dagger-compiler:2.8"
compileOnly 'javax.annotation:jsr250-api:1.0'
implementation 'javax.inject:javax.inject:1'
```

## Bước 2: Xây dựng class model Hotgirl
## 

Bao giờ cũng vậy, ta cần xây dựng class Model để lưu trữ dữ liệu và làm việc với các thành phần khác của ứng dụng như database, activity…

```java
public class Hotgirl {
 
    String name;
    String avatar;
 
    public Hotgirl(String name, String avatar) {
        this.name = name;
        this.avatar = avatar;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAvatar() {
        return avatar;
    }
 
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
```

## Bước 3: Tạo ra các custom annotation
## 

Ta sẽ tạo ra các annotation sau: ActivityContext, ApplicationContext, DatabaseInfo , PerActivity

```java
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
public @interface ActivityContext {
}
 
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
public @interface ApplicationContext {
}
 
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
public @interface DatabaseInfo {
}
 
@Scope
@Retention(RetentionPolicy.RUNTIME)
public @interface PerActivity {
}
```

## Tại sao phải tạo ra các annotation này?
## 

Annotation @Qualifier nằm trong package javax.inject. Nó được sử dụng để phân biệt các đối tượng mà Dagger sẽ phân phối cho các lớp Dependency consumer. Ví dụ: 1 class có thể yêu cầu cung cấp cả ApplicationContext và ActivityContext. Trong khi 2 đối tượng này đều là thể hiện của lớp Context. Vậy ta cần 1 cái gì đó để giúp Dagger 2 phân biệt được 2 đối tượng này. Thứ ta cần chính là các @Qualifier annotation. Nó giúp Dagger 2 phân biệt được các đối tượng thuộc cùng 1 kiểu dữ liệu (trong trường hợp này là Context).

Annotation @DatabseInfo để cung cấp thông tin về các thuộc tính để khởi tạo DBHelper. Các thuộc tính này là name và version.

Annotation @Scope để chỉ ra vùng tồn tại của các đối tượng được dagger cung cấp. Khi 1 class được Inject các dependency bởi Dagger, và các dependency đó được chỉ định @Scope, thì mỗi thể hiện của class đó sẽ được cung cấp các dependency khác nhau, độc lập và tồn tại trong vòng đời của class đó.

## Bước 4, tạo DBHelper
## 

Tạo ra 1 class DBHelper, class này sẽ đảm nhiệm mọi công việc liên quan đến database SQLite, thêm, xoá dữ liệu, clear db,…

```java
@Singleton
public class DBHelper extends SQLiteOpenHelper {
 
    public static final String USER_TABLE_NAME = "hotgirls";
    public static final String USER_COLUMN_USER_ID = "id";
    public static final String USER_COLUMN_USER_NAME = "girl_name";
    public static final String USER_COLUMN_USER_AVATAR = "girl_avt";
 
    @Inject
    public DBHelper(@ApplicationContext Context context,
                    @DatabaseInfo String dbName,
                    @DatabaseInfo Integer version) {
        super(context, dbName, null, version);
    }
 
 
    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        tableCreateStatements(sqLiteDatabase);
    }
 
    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + USER_TABLE_NAME);
        onCreate(sqLiteDatabase);
    }
 
    private void tableCreateStatements(SQLiteDatabase sqLiteDatabase) {
        try {
            sqLiteDatabase.execSQL(
                    "CREATE TABLE IF NOT EXISTS "
                            + USER_TABLE_NAME + "("
                            + USER_COLUMN_USER_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
                            + USER_COLUMN_USER_NAME + " VARCHAR(20), "
                            + USER_COLUMN_USER_AVATAR + " VARCHAR(50))"
            );
 
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
 
    protected Long insertUser(Hotgirl girl) {
        try {
            SQLiteDatabase db = this.getWritableDatabase();
            ContentValues contentValues = new ContentValues();
            contentValues.put(USER_COLUMN_USER_NAME, girl.getName());
            contentValues.put(USER_COLUMN_USER_AVATAR, girl.getAvatar());
            return db.insert(USER_TABLE_NAME, null, contentValues);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
 
    protected List<Hotgirl> getAllGirl() throws Resources.NotFoundException, NullPointerException {
        Cursor cursor = null;
        List<Hotgirl> listGirl = new ArrayList<>();
        try {
            SQLiteDatabase db = this.getReadableDatabase();
            cursor = db.rawQuery("select * from " + USER_TABLE_NAME, null);
 
            if (cursor.getCount() > 0) {
                cursor.moveToFirst();
                do {
                    Hotgirl girl = new Hotgirl(cursor.getString(cursor.getColumnIndex(USER_COLUMN_USER_NAME)), cursor.getString(cursor.getColumnIndex(USER_COLUMN_USER_AVATAR)));
                    listGirl.add(girl);
                } while (cursor.moveToNext());
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (cursor != null) {
                cursor.close();
            }
            return listGirl;
        }
    }
 
    protected void clearDatabase() {
        getWritableDatabase().execSQL("delete from " + USER_TABLE_NAME);
    }
}
```
Hãy chú ý vào các Annotation xuất hiện trong class này:

@Singleton đảm bảo cho đối tượng DBHelper được khởi tạo duy nhất trong vòng đời của ứng dụng. Tức là cho dù ta có @Inject DBHelper ở nhiều activity, thì các đối tượng đó đều là 1.

@Inject trước hàm khởi tạo DBHelper. Chỉ ra rằng lớp DBHelper sẽ được thêm vào Dependency Graph, có nghĩa là khi cần khởi tạo đối tượng DBHelper, Dagger sẽ tìm đến phương thức khởi tạo được gắn Annotation @Inject này.

Qualifier @ApplicationContext chỉ ra rằng đối tượng context cần để khởi tạo DBHelper là đối tượng ApplicationContext, (chứ không phải ActivityContext).

@DatabaseInfo chỉ ra các thông tin cần để khởi tạo DBHelper: ở đây là name và version.

Mình sẽ quay trở lại giải thích kỹ hơn các Annotation này khi làm việc với @Module.

Tất cả các phương thức còn lại chỉ liên quan đến các operation thêm sửa xoá dữ liệu. Mình sẽ không nói kỹ thêm ở đây.

## Bước 5, tạo class SharedPrefsHelper
## 

Lớp này để xử lý các operation liên quan đến SharedPreference.

```java
public class SharedPrefsHelper {
 
    public static String PREF_KEY_ACCESS_TOKEN = "access-token";
    SharedPreferences mSharedPreferences;
 
    @Inject
    public SharedPrefsHelper(SharedPreferences sharedPreferences) {
        this.mSharedPreferences = sharedPreferences;
    }
 
    public void put(String key, String value) {
        mSharedPreferences.edit().putString(key, value).apply();
    }
 
    public void put(String key, int value) {
        mSharedPreferences.edit().putInt(key, value).apply();
    }
 
    public void put(String key, float value) {
        mSharedPreferences.edit().putFloat(key, value).apply();
    }
 
    public void put(String key, boolean value) {
        mSharedPreferences.edit().putBoolean(key, value).apply();
    }
 
    public String get(String key, String defaultValue) {
        return mSharedPreferences.getString(key, defaultValue);
    }
 
    public Integer get(String key, int defaultValue) {
        return mSharedPreferences.getInt(key, defaultValue);
    }
 
    public Float get(String key, float defaultValue) {
        return mSharedPreferences.getFloat(key, defaultValue);
    }
 
    public Boolean get(String key, boolean defaultValue) {
        return mSharedPreferences.getBoolean(key, defaultValue);
    }
 
    public void deleteSavedData(String key) {
        mSharedPreferences.edit().remove(key).apply();
    }
}
```

Cũng như lớp DBHelper, lớp này cũng được gắn thêm Annotation @Singleton để đảm bảo đối tượng của class này được khởi tạo 1 lần duy nhất trong vòng đời ứng dụng.

Annotation @Inject ở hàm khởi tạo cho phép thêm lớp này vào Dependency Graph và Dagger có thể sử dụng hàm khởi tạo này khi cần.

Vậy các lớp DBHelper, SharedPrefsHelper này được cung cấp như thế nào? Hãy cùng mình tìm hiểu.

## Bước 6, Data Manager
## 

```java
@Singleton
public class DataManager {
 
    DBHelper mDbHelper;
    SharedPrefsHelper mSharedPrefsHelper;
 
    @Inject
    public DataManager(DBHelper dbHelper, SharedPrefsHelper sharedPrefsHelper) {
        this.mDbHelper = dbHelper;
        this.mSharedPrefsHelper = sharedPrefsHelper;
    }
 
    public Long addHotGirl(Hotgirl girl) {
        return mDbHelper.insertUser(girl);
    }
 
    public List<Hotgirl> getAllGirl() throws Resources.NotFoundException, NullPointerException {
        return mDbHelper.getAllGirl();
    }
 
    public void clearDatabase() {
        mDbHelper.clearDatabase();
    }
 
    public void saveAccessToken(String accessToken) {
        mSharedPrefsHelper.put(SharedPrefsHelper.PREF_KEY_ACCESS_TOKEN, accessToken);
    }
 
    public String getAccessToken() {
        return mSharedPrefsHelper.get(SharedPrefsHelper.PREF_KEY_ACCESS_TOKEN, null);
    }
}
```
Phần quan trọng bắt đầu ở đây nhé. Lớp DataManager này sử dụng đối tượng của các lớp Context, DBHelper, SharedPrefsHelper. Hàm khởi tạo của lớp DataManager này cũng được gán Annotation @Inject, tức là nó cũng được gán vào Dependency Graph.

Khi Dagger cần khởi tạo DataManager, nó sẽ tìm trong Dependency Graph các class cần có trong hàm khởi tạo của lớp này. Ở đây là Context, SharePrefsHelper, và DBHelper. SharePrefsHelper, và DBHelper đã được thêm vào graph thông qua Annotation @Inject nên Dagger sẽ tự động gọi hàm khởi tạo của 2 lớp này ra. Vậy còn @ApplicationContext Context context thì sao? Hãy cùng mình đi vào bước 7.

## Bước 7, Application.
## 

Ta viết 1 lớp App kế thừa Application để biểu diễn vòng đời của toàn ứng dụng như sau. Đây cũng chính là lớp để Dagger sử dụng cho việc cung cấp @ApplicationContext Context cho DataManager.

```java
public class App extends Application {
 
    ApplicationComponent applicationComponent;
 
    @Inject
    DataManager dataManager;
 
    @Override
    public void onCreate() {
        super.onCreate();
        initApplicationComponent();
    }
 
    private void initApplicationComponent() {
        applicationComponent = DaggerApplicationComponent.builder().applicationModule(new ApplicationModule(this)).build();
        applicationComponent.inject(this);
    }
 
    public DataManager getDataManager() {
        return dataManager;
    }
 
    public ApplicationComponent getApplicationComponent() {
        return applicationComponent;
    }
}
```

Tiếp theo thêm class này vào file Manifest:

```java
<application
    ...
    android:name=".App"
    ...
</application>
```

Lưu ý: lớp App này sử dụng DataManager thông qua Annotation @Inject. Phần thú vị tiếp theo nằm ở class ApplicationComponent. Ta sẽ tìm hiểu ở các bước sau.

## Bước 8, Xây dựng module cung cấp Dependency (Provider)
## 

Đây là bước rất quan trọng, ta sẽ xây dựng các module cung cấp các Dependency để sử dụng trong activity của ta. Đầu tiên là ApplicationModule.

```java
@Module
public class ApplicationModule {
 
    App application;
 
    public ApplicationModule(App application) {
        this.application = application;
    }
 
    @Provides
    @ApplicationContext
    public Context provideApplicationContext() {
        return application;
    }
 
    @Provides
    @DatabaseInfo
    public String provideDBName() {
        return "DaggerExample-DB";
    }
 
    @Provides
    @DatabaseInfo
    public Integer provideDBVersion() {
        return 1;
    }
 
    @Provides
    public SharedPreferences provideSharedPreference() {
        return application.getSharedPreferences("DaggerExample-SharedPrefs", Context.MODE_PRIVATE);
    }
}
```

Như các bạn thấy module này chỉ là 1 class bình thường, ngoại trừ việc nó được gán Annotation @Module, và các phương thức của nó đều được gán Annotation @Provides. Mình sẽ giải thích vì sao lại viết các phương thức này.

Như mình đã viết ở bước 6, mình đã thêm class DataManager vào Dependency Graph. Tức là khi cần khởi tạo đối tượng DataManager, Dagger 2 sẽ tìm các thành phần cần thiết trong Dependency Graph để thực hiện hàm khởi tạo DataManager:

```java
@Inject
public DataManager(DBHelper dbHelper, SharedPrefsHelper sharedPrefsHelper) {
    this.mDbHelper = dbHelper;
    this.mSharedPrefsHelper = sharedPrefsHelper;
}
```
Ở đây Dagger sẽ tìm cách khởi tạo DBHelper và SharedPrefsHelper.

Tiếp tục, để khởi tạo DBHelper, ta cần @ApplicationContext, @DatabaseInfo String, và @DatabaseInfo Integer:
```java
@Inject
public DBHelper(@ApplicationContext Context context,
                @DatabaseInfo String dbName,
                @DatabaseInfo Integer version) {
    super(context, dbName, null, version);
}
```
Chính vì vậy, trong lớp ApplicationModule, mình đã thêm 3 phương thức sau:
```java
@Provides
@ApplicationContext
public Context provideApplicationContext() {
    return application;
}
 
@Provides
@DatabaseInfo
public String provideDBName() {
    return "DaggerExample-DB";
}
 
@Provides
@DatabaseInfo
public Integer provideDBVersion() {
    return 1;
}
```

3 phương thức này để cho Dagger sử dụng trong việc khởi tạo DBHelper .

Tiếp đến là khởi tạo SharedPrefsHelper. Ta cần đối tượng SharedPreference:

```java
@Inject
public SharedPrefsHelper(SharedPreferences sharedPreferences) {
    this.mSharedPreferences = sharedPreferences;
}
```

Vì vậy nên mình lại thêm 1 phương thức @Provides đối tượng SharedPreference:

```java
@Provides
public SharedPreferences provideSharedPreference() {
    return application.getSharedPreferences("DaggerExample-SharedPrefs", Context.MODE_PRIVATE);
}
```
Vậy là xong. mình đã có đầy đủ các “nguyên liệu” để giúp Dagger tạo ra đối tượng Data Manager. Tiếp theo sẽ là việc viết ra ApplicationComponent để làm cầu nối giữa Dependency Provider (Module mà ta vừa viết) với Dependency Consumer (các Activity).

## Bước 9, Application Component
## 
```java
@Singleton
@Component(modules = {ApplicationModule.class})
public interface ApplicationComponent {
    void inject(App app);
 
    DataManager getDataManager();
}
```

Rất đơn giản đúng không, đây chỉ là 1 interface được gắn 2 annotation:

@Singleton: chỉ ra rằng component này sẽ tồn tại trong suốt vòng đời ứng dụng, và chỉ có 1 khởi tạo duy nhất.

@Component: chỉ ra module mà nó sẽ đảm nhiệm việc kết nối.

Phương thức inject (App app) chính là phương thức kết nối giữa Dependency Provider và Dependency Consumer (trong trường hợp này ,consumer là lớp App).

Lưu ý: Bạn có thể đặt tên phương thức inject này tuỳ ý, không nhất thiết phải là inject.

Quay lại lớp App mà ta viết ở bước 7. Hãy để ý hàm này:

```java
private void initApplicationComponent() {
    applicationComponent = DaggerApplicationComponent.builder().applicationModule(new ApplicationModule(this)).build();
    applicationComponent.inject(this);
}
```

Và câu lệnh khai báo:

```java
@Inject
DataManager dataManager;
```

Hàm initApplicationComponent chính là hàm đảm nhiệm việc khởi tạo ApplicationComponent và inject (kết nối ApplicationModule với App). Lưu ý rằng bạn không thể khởi tạo ApplicationComponent 1 cách trực tiếp qua câu lệnh new, mà phải thông qua builder của Dagger.

DaggerApplicationComponent là lớp mà Dagger 2 tự sinh ra cho chúng ta để khởi tạo ApplicationComponent. Đối với các Component khác cũng tương tự, ta chỉ cần build project, sau đó thêm tiền tố Dagger vào trước tên Component là có thể sử dụng builder để tạo ra đối tương Component.

Sau khi inject xong thì ta có thể thoải mái sử dụng đối tượng DataManager mà không cần phải tự tay khởi tạo nó.

Trên đây là cách thức hoạt động cũng như cách làm việc cơ bản với Dagger 2. Cám ơn bạn đã theo dõi bài viết.