Ở phần trước [PHẦN 1](https://viblo.asia/p/android-content-provider-p1-tong-quan-cach-chia-se-du-lieu-giua-2-hoac-nhieu-ung-dung-khac-nhau-63vKj0nNl2R) mình đã giới thiệu qua về khái niệm, tổng quan về Content Providers. Trong bài viết tiếp theo này, mình sẽ đi luôn vào thực hành, làm thế nào để implement, sử dụng Content Provider để chia sẻ dữ liệu giữa 2 hoặc nhiều ứng dụng khác nhau. 
Bài viết này mình sẽ tạo 1 ví dụ như sau: Tạo 1 ứng dụng **A** lưu trữ data vào Sqlite, 1 ứng dụng khác là **B** sẽ thao tác lấy dữ liệu từ ứng dụng A thông qua Content Provider.

## Creating a Content Provider 
Để tạo 1 Content Provider chúng ta cần:
* Tạo sub class extend từ ContentProvider.
* Định nghĩa content URI.
* Implement tất cả các method: *insert(), update(), query(), delete(), getType()*.
* Khai báo ContentProvider trong file AndroidManifest.xml

## Specifying the URI of a Content Provide
Một Content provider URI bao gồm 4 phần và có định dạng như sau:
```
scheme://authority/path/ID
```

* **scheme** sẽ là *content://*
* **authority** đại diện cho domain, đối với ContentProvider thì thường sẽ kết thúc là *.provider*.
* **path** đường dẫn trỏ đến dữ liệu.
* **ID** xác định duy nhất tập dữ liệu để tìm kiếm.

## Registering the provider in AndroidManifest.xml
Cũng giống như bất cứ các thành phần chính khác (Activity, Service, Broadcast..v.v), chúng ta cũng cần phải đăng ký Content Provider trong file AndroidManifest.xml. Thẻ <provider sử dụng để đăng ký ContentProvider. Nó được khai báo trong thẻ <application

```xml
        <provider
            android:name=".AndroidIDProvider"
            android:authorities="com.android.example.checkandroidid.AndroidIDProvider"
            android:enabled="true"
            android:exported="true"
            android:readPermission="com.android.example.checkandroidid.READ_DATABASE"
            android:writePermission="com.android.example.checkandroidid.WRITE_DATABASE" ></provider>
```

Ngoài ra, để ứng dụng khác có thể truy cập để thao tác với dữ liệu, thì bắt buộc bạn phải định nghĩa permission của chính bạn tự định nghĩa.  Ứng dụng B sẽ thực hiện khai báo permisson này thì ms có thể truy cập vào CSDL của ứng dụng A. Nó được khai báo trong thẻ <manifest
```xml
    <permission
        android:name="com.android.example.checkandroidid.WRITE_DATABASE"
        android:label="Write Database"
        android:protectionLevel="normal" />

    <permission
        android:name="com.android.example.checkandroidid.READ_DATABASE"
        android:label="Read Database"
        android:protectionLevel="normal" />
```

## Step 1: Tạo ứng dụng A lưu trữ data
Ứng dụng này sẽ tạo ContentProvider và sẽ chia sẻ dữ liệu của nó. Để lưu trữ dữ liệu, chúng ta sẽ sử dụng Sqlite với tên CSDL là "SampleDatabase", tên bảng "AndroidID" với 2 trường là _id, _value. 

URI của content provider sẽ như sau: 
```java
    static final String AUTHORITY = "com.android.example.checkandroidid.AndroidIDProvider";
    static final String CONTENT_PATH =  "backupdata";
    static final String URL = "content://" + AUTHORITY + "/" + CONTENT_PATH;
    static final Uri CONTENT_URI = Uri.parse(URL);
```

Chúng ta sẽ tạo UI để có thể insert, update dữ liệu. 
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:padding="50dp"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Change Android ID"
        android:textSize="30dp"
        android:textStyle="bold" />


    <EditText
        android:id="@+id/edt_android_id"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:hint="AndroidID" />


    <Button
        android:onClick="onClickAddData"
        android:id="@+id/btn_add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="Change" />
</LinearLayout>
```

## Step 2: Tạo Custom Content Provider
Để tạo Content Provider của riêng bạn, bạn cần phải tạo một lớp extend từ lớp trừu tượng ContentProvider và ghi đè các phương thức ***insert(), update(), query(), delete(), getType()***

```java
public class AndroidIDProvider extends ContentProvider {
    static final String AUTHORITY = "com.android.example.checkandroidid.AndroidIDProvider";
    static final String CONTENT_PATH =  "backupdata";
    static final String URL = "content://" + AUTHORITY + "/" + CONTENT_PATH;
    static final Uri CONTENT_URI = Uri.parse(URL);

    static final String _ID = "_id";
    static final String VALUE = "_value";

    private static HashMap<String, String> STUDENTS_PROJECTION_MAP;

    static final int URI_ALL_ITEMS_CODE = 1;
    static final int URI_ONE_ITEM_CODE = 2;

    static final UriMatcher uriMatcher;
    static{
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI(AUTHORITY, CONTENT_PATH, URI_ALL_ITEMS_CODE);
        uriMatcher.addURI(AUTHORITY, CONTENT_PATH + "/#", URI_ONE_ITEM_CODE);
    }

    /**
     * Database specific constant declarations
     */

    private SQLiteDatabase db;
    static final String DATABASE_NAME = "SampleDatabase";
    static final String TABLE_NAME = "AndroidID";
    static final int DATABASE_VERSION = 1;
    static final String CREATE_DB_TABLE =
            " CREATE TABLE " + TABLE_NAME +
                    " (_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    " name TEXT NOT NULL);";

    /**
     * Helper class that actually creates and manages
     * the provider's underlying data repository.
     */

    private static class DatabaseHelper extends SQLiteOpenHelper {
        DatabaseHelper(Context context){
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(CREATE_DB_TABLE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
            onCreate(db);
        }
    }

    @Override
    public boolean onCreate() {
        Context context = getContext();
        DatabaseHelper dbHelper = new DatabaseHelper(context);

        /**
         * Create a write able database which will trigger its
         * creation if it doesn't already exist.
         */

        db = dbHelper.getWritableDatabase();
        return (db == null)? false:true;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        /**
         * Add a new student record
         */
        long rowID = db.insert(TABLE_NAME, "", values);

        /**
         * If record is added successfully
         */
        if (rowID > 0) {
            Uri _uri = ContentUris.withAppendedId(CONTENT_URI, rowID);
            getContext().getContentResolver().notifyChange(_uri, null);
            return _uri;
        }

        throw new SQLException("Failed to add a record into " + uri);
    }

    @Override
    public Cursor query(Uri uri, String[] projection,
                        String selection,String[] selectionArgs, String sortOrder) {
        SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
        qb.setTables(TABLE_NAME);

        switch (uriMatcher.match(uri)) {
            case URI_ALL_ITEMS_CODE:
                qb.setProjectionMap(STUDENTS_PROJECTION_MAP);
                break;

            case URI_ONE_ITEM_CODE:
                qb.appendWhere( _ID + "=" + uri.getPathSegments().get(1));
                break;

            default:
        }

        if (sortOrder == null || sortOrder == ""){
            /**
             * By default sort on student names
             */
            sortOrder = VALUE;
        }

        Cursor c = qb.query(db,	projection,	selection,
                selectionArgs,null, null, sortOrder);
        /**
         * register to watch a content URI for changes
         */
        c.setNotificationUri(getContext().getContentResolver(), uri);
        return c;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        int count = 0;
        switch (uriMatcher.match(uri)){
            case URI_ALL_ITEMS_CODE:
                count = db.delete(TABLE_NAME, selection, selectionArgs);
                break;

            case URI_ONE_ITEM_CODE:
                String id = uri.getPathSegments().get(1);
                count = db.delete(TABLE_NAME, _ID +  " = " + id +
                                (!TextUtils.isEmpty(selection) ? "AND (" + selection + ')' : ""), selectionArgs);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }

        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    @Override
    public int update(Uri uri, ContentValues values,
                      String selection, String[] selectionArgs) {
        int count = 0;
        switch (uriMatcher.match(uri)) {
            case URI_ALL_ITEMS_CODE:
                count = db.update(TABLE_NAME, values, selection, selectionArgs);
                break;

            case URI_ONE_ITEM_CODE:
                count = db.update(TABLE_NAME, values,
                        _ID + " = " + uri.getPathSegments().get(1) +
                                (!TextUtils.isEmpty(selection) ? "AND (" +selection + ')' : ""), selectionArgs);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri );
        }

        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)){
            /**
             * Get all student records
             */
            case URI_ALL_ITEMS_CODE:
                return "vnd.android.cursor.dir/vnd.example.backupdata";
            /**
             * Get a particular student
             */
            case URI_ONE_ITEM_CODE:
                return "vnd.android.cursor.item/vnd.example.backupdata";
            default:
                throw new IllegalArgumentException("Unsupported URI: " + uri);
        }
    }
}
```

## Step 3: Add dữ liệu vào database
Mở class MainActivity và thực hiện code theo dưới đây:
Chú ý: Phương thức onClickAddData() chính là sự kiện khi các bạn click button "Change" ở file UI chúng ta đã tạo ở trên. Phương thức này sẽ thực hiện việc insert data vào database.

```java
    public void onClickAddData(View view) {
        // Add a new data record
        ContentValues values = new ContentValues();
        values.put(AndroidIDProvider.VALUE,
                ((EditText) findViewById(R.id.edt_android_id)).getText().toString());

        Uri uri = getContentResolver().insert(
                AndroidIDProvider.CONTENT_URI, values);
        Toast.makeText(getBaseContext(),
                uri.toString(), Toast.LENGTH_LONG).show();
    }
```

## Step 4: Tạo ứng dụng B để lấy dữ liệu
Ứng dụng này sẽ thực hiện các thao tác truy cập vào cở dở dữ liệu vừa tạo ở ứng dụng A để thực hiện việc insert, update, delete..v.v... dữ liệu.
Trước tiên, các bạn cần phải khai báo permission mà bên ứng dụng A đã định nghĩa ở trên đầu bài viết. Khai báo permission trong file AndroidManifest.xml:
```xml
<uses-permission android:name="com.android.example.checkandroidid.WRITE_DATABASE" />
<uses-permission android:name="com.android.example.checkandroidid.READ_DATABASE" />
```

Sau đó, triển khai code lấy dữ liệu từ ứng dụng A. Cách triển khai code tương tự như các bạn đã sử dụng ContentProvider thao tác vs dữ liệu từ những ứng dụng của hệ thống như là Message, Contact...v.v. Cụ thể như sau:
```java
public class GetDataActivity extends AppCompatActivity {

    static final String AUTHORITY = "com.android.example.checkandroidid.AndroidIDProvider";
    static final String CONTENT_PATH =  "backupdata";
    static final String URL = "content://" + AUTHORITY + "/" + CONTENT_PATH;
    static final Uri CONTENT_URI = Uri.parse(URL);

    static final String _ID = "_id";
    static final String VALUE = "_value";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Retrieve student records
        Cursor c = getContentResolver().query(CONTENT_URI, null, null, null, "_value");

        if (c.moveToFirst()) {
            do {
                Log.d("MainActivity", c.getString(c.getColumnIndex(_ID)) + ", " + c.getString(c.getColumnIndex(VALUE)));
            } while (c.moveToNext());
        }
    }
}
```

Vậy là xong, việc chia sẻ giữ liệu giữa 2 hoặc nhiều ứng dụng sẽ không còn là khó khăn nữa :D

Bài viết của mình đến đây là hết, cám ơn các bạn đã quan tâm. Thanks all