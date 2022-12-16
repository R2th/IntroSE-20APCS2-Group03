Xin chào mọi người, hiện nay việc sử dụng database cho những app android đang ngày càng đơn giản với những ORM support tận nơi cho chúng ta như ROOM, greenDAO...

Tuy nhiên, nếu chúng ta đã có database sẵn có và chỉ việc đọc ra sử dụng như : game ai là triệu phú, tiếng anh offline ... chúng ta sẽ cần phải sử dụng theo 1 cách khác. Như tiêu đề bài viết, chúng ta sẽ đọc ra 1 file .sqlite từ Assets Folder.

## Tạo folder Assets
Đầu tiên, sẽ coppy file database vào folder assets:
![](https://images.viblo.asia/f9ac9687-be21-4781-a828-e7c41227274f.png)

Sau đó, sẽ sử dung lib : 

`compile 'com.readystatesoftware.sqliteasset:sqliteassethelper:+'`

để thao tác với database.
## Tạo class open helper
Class này sẽ khai báo database name, database version được sử dụng trong app
```
public class DatabaseOpenHelper extends SQLiteAssetHelper {
    private static final String DATABASE_NAME = "db.sqlite";
    private static final int DATABASE_VERSION = 1;

    public DatabaseOpenHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }
}
```
## Tạo class database assets
Class này dùng để thao tác trực tiếp với database, bao gôm add, delete,update

Dưới đây, mình sẽ demo việc get 1 list data từ trong database ra .

```
public class DatabaseAccess {
    private SQLiteOpenHelper openHelper;
    private SQLiteDatabase database;
    private static DatabaseAccess instance;

    /**
     * Private constructor to aboid object creation from outside classes.
     *
     * @param context
     */
    private DatabaseAccess(Context context) {
        this.openHelper = new DatabaseOpenHelper(context);
    }

    /**
     * Return a singleton instance of DatabaseAccess.
     *
     * @param context the Context
     * @return the instance of DabaseAccess
     */
    public static DatabaseAccess getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseAccess(context);
        }
        return instance;
    }

    /**
     * Open the databases connection.
     */
    public void open() {
        this.database = openHelper.getWritableDatabase();
    }

    /**
     * Close the databases connection.
     */
    public void close() {
        if (database != null) {
            this.database.close();
        }
    }

    public SQLiteDatabase getDatabase() {
        return database;
    }

    /**
     * Read all quotes from the databases.
     *
     * @return a List of quotes
     */

    public List<QuestionType> getZQuestionType() {
        List<QuestionType> list = new ArrayList<>();
        Cursor cursor = database.rawQuery("SELECT * FROM 'ZQUESTIONTYPE'", null);
        cursor.moveToFirst();
        while (!cursor.isAfterLast()) {
            QuestionType questionType = new QuestionType();
            questionType.setzPk(cursor.getInt(0));
            questionType.setzEnt(cursor.getInt(1));
            questionType.setzOPT(cursor.getInt(2));
            questionType.setzDescription(cursor.getString(3));
            questionType.setzId(cursor.getInt(4));
            questionType.setzName(cursor.getString(5));
            list.add(questionType);
            cursor.moveToNext();
        }
        cursor.close();
        return list;
    }
```

## Class Fragment
Việc sử dụng khá đơn giản, chỉ cần gọi : DatabaseAccess.getInstance(getActivity()).getZQuestionType(); là chúng đa đã có 1 list được lấy ra từ trong DB
```
public class FragmentTest extends BaseFragment<FragmentTestBinding, FragmentTestViewModel>
        implements BaseViewAdapter.Listener {

    public static FragmentTest newInstance() {
        Bundle args = new Bundle();
        FragmentTest fragment = new FragmentTest();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public int getLayoutId() {
        return R.layout.fragment_test;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        initAdapter();
    }

    private void initAdapter() {
        SingleTypeAdapter<QuestionType> adapter = new SingleTypeAdapter<>(getActivity(), R.layout.item_test);
        GridLayoutManager manager = new GridLayoutManager(getActivity(), 2);
        List<QuestionType> questionTypeList = DatabaseAccess.getInstance(getActivity()).getZQuestionType();
        adapter.set(questionTypeList);
        getViewDataBinding().recyclerView.setLayoutManager(manager);
        getViewDataBinding().recyclerView.setAdapter(adapter);
        adapter.setPresenter(this);
    }
```

## Android manifest
Trong android manifest, sẽ thêm quyền đọc ghi như dưới đây:

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.sqliteassethelper.demo">
 
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
</manifest>
```
Hy vọng bài viết có thể giúp đỡ các bạn đang tìn hiểu về SQLite.
Bài viết được tham khảo : http://blog.nkdroidsolutions.com/access-sqlite-database-assets-folder-android-application-example/#
Source: https://github.com/jgilfelt/android-sqlite-asset-helper/tree/master/samples