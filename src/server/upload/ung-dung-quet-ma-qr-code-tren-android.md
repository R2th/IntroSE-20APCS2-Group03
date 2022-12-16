## Giới thiệu
Hiện nay việc sử dụng QrCode, BarCode để thanh toán hóa đơn or show link, show text ,... nội dung của mã cũng đã có từ lâu, và ngày càng được mở rộng trên thiết bị mobile. Hôm nay mình sẽ demo tạo 1 app đơn giản sử dụng qrcode cho việc thêm sản phẩm, sửa sản phẩm và hiện thông tin sản phẩm, cùng với đó là sử dụng SqLite cho việc lưu trữ dữ liệu nữa. OK ta cùng bắt đầu. 
> Trong bài chỗ nào không đúng hoặc sai, khó hiểu các bạn hãy comment bên dưới nhé.


<div align="center">
    
   ![](https://images.viblo.asia/29c1e649-cc67-4d69-82bf-a137dd16673d.jpg)  
    
 
</div>

<div align="center">
    
Ảnh minh họa.
    
   </div>

## Code
### 1. UI and Database
Về cơ bản mình sẽ tạo các màn gồm màn quét mã ( khi vào app), màn thêm, sửa thông tin sản phẩm, dùng ReycleView hiển thị thông tin sản phẩm.Ta sẽ install thêm thư viện để hỗ trợ việc quét mã Qr , thêm nó vào app. Và nhớ xin quền Camera trong **Manifest** nhé

```java
  implementation 'me.dm7.barcodescanner:zxing:1.9.13'
  implementation 'com.karumi:dexter:5.0.0' // Hỗ trợ xin quyền truy cập camera
```

#### 1. Database
Về db để đơn giản mình sẽ tạo một table product bao gồm id, mã, tên, giá của sản phẩm. Dùng class SQLiteHelper sẽ giúp ta làm phần này. Trước tiên là tạo class DataBase định nghĩa tên DB, Table, Colums.

```java
public class DataBase {
    public static final String DB_NAME = "DB";
    public static final int DB_VERSION = 1;
    public static final String TABLE_NAME = "PRODUCT";
    public static final String ID ="ID";
    public static final String ID_CODE ="CODE";
    public static final String NAME="NAME";
    public static final String PRICE ="PRICE";

    public static final String CREATE_TABLE = "CREATE TABLE " + TABLE_NAME + " ("
            + ID + " INTERGER PRIMARY KEY, "
            + ID_CODE + " TEXT,"
            + NAME + " TEXT,"
            + PRICE + " TEXT"
            +")";
}
```
 Trong class DataBaseHelper
```java
public class DatabaseHelper extends SQLiteOpenHelper {

    public DatabaseHelper(@Nullable Context context) {
        super(context,DataBase.DB_NAME, null, DataBase.DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(DataBase.CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + DataBase.TABLE_NAME);
        onCreate(db);
    }

    public void insertData(final String code, final String name, final String price){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DataBase.ID_CODE,code);
        values.put(DataBase.NAME,name);
        values.put(DataBase.PRICE,price);
        db.insert(DataBase.TABLE_NAME, null , values);
        db.close();
    }

    public void updateData(final String id,final String code, final String name,final String price){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DataBase.ID_CODE,code);
        values.put(DataBase.NAME,name);
        values.put(DataBase.PRICE,price);
        db.update(DataBase.TABLE_NAME, values, DataBase.ID + " = ? ", new String[]{id});
        db.close();
    }

    public void deleteData(String id){
        SQLiteDatabase db = getWritableDatabase();
        db.delete(DataBase.TABLE_NAME,"ID = ?", new String[]{id});
        db.close();
    }

    public ArrayList<Model> getAllData(){
        ArrayList<Model> arrayList = new ArrayList<>();
        String query = "SELECT * FROM " + DataBase.TABLE_NAME;

        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(query, null);
        if(cursor.moveToNext()){
            do{
                Model model = new Model(
                        ""+ cursor.getInt(cursor.getColumnIndex(DataBase.ID)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.ID_CODE)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.NAME)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.PRICE))

                );

                arrayList.add(model);
            }while (cursor.moveToNext());
        }
        db.close();
        return arrayList;
    }
}

```
   #### 2. Màn Chính
 File Xml sẽ bao gồm 2 FloatButton để Edit và Thêm data, bao gồm cả QrCode.
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/add"
        android:layout_marginTop="10dp"
        android:layout_alignParentTop="true"
        android:layout_alignParentRight="true"
        android:layout_marginLeft="10dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end|bottom"
        android:src="@drawable/ic_add" />
    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/Edit"
        android:layout_marginTop="10dp"
        android:layout_marginLeft="10dp"
        android:layout_toLeftOf="@id/add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end|bottom"
        android:src="@drawable/ic_edit" />
    <me.dm7.barcodescanner.zxing.ZXingScannerView
        android:id="@+id/scan_Qr"
        android:layout_width="match_parent"
        android:layout_centerVertical="true"
        android:layout_height="match_parent"
       />
</RelativeLayout>

```
  
  
  
   
   
#### 3. Màn thêm
Về cơ bản mình sẽ thiết kế bào gồm một imageView để khi click vào sẽ show ra màn qrcode để lấy mã sản phẩm. Và gồm 3 cái EditText để nhập sản phẩm gồm tên, giá sản phẩm, và một Button để Save sản phẩm.Như code bên dưới :

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".AddData">

    <ImageView
        android:id="@+id/img_photo_add"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:layout_marginTop="70dp"
        android:layout_marginLeft="100dp"
        android:layout_centerHorizontal="true"
        android:src="@drawable/ic_image_camera" />

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/edt_Code_add"
        android:layout_below="@id/img_photo_add"
        android:hint="Code"
        android:inputType="number"
        android:background="@drawable/background"
        android:padding="10dp"
        android:layout_marginTop="16dp"
        />
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/edt_Name_add"
        android:layout_below="@id/edt_Code_add"
        android:background="@drawable/background"
        android:hint="Name"
        android:inputType="text"
        android:padding="10dp"
        android:layout_marginTop="16dp"
        />
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/edt_Price_add"
        android:layout_below="@id/edt_Name_add"
        android:background="@drawable/background"
        android:hint="Price"
        android:inputType="number"
        android:padding="10dp"
        android:layout_marginTop="16dp"
        />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/btn_Add"
        android:text="Add"
        android:layout_below="@id/edt_Price_add"
        android:layout_centerHorizontal="true"
        android:textStyle="bold"
        android:textColor="@color/colorPrimary"
        />
</RelativeLayout>
```
Ta cũng tạo ra một file background.xml để làm background cho từng EditText như sau:

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke
        android:color="@color/colorPrimaryDark"
        android:width="1dp"/>
    <solid
        android:color="#D2EDEB"/>
    <corners
        android:radius="20dp"/>
</shape>
```

Kết quả như sau :

![](https://images.viblo.asia/df9e03d7-d92f-4952-9438-316b982c001b.png)


#### 4. List Sản Phẩm
Mình sẽ dùng RecycleView để hiển thị sản phẩm, ưu điểm của thằng này là tối ưu khi hiển thị dữ liệu, khi ta scroll đến đâu thì nó sẽ rend data đến đó, chứ không rend ra cùng một lúc tất cả các data mà ta có như ListView. Ta cũng sẽ tạo một file row.xml trong drawable để định nghĩa cách hiển thị của sản phẩm gồm một hình ảnh, tên, giá của sản phẩm. Tạo class Adapter extend RecycleView.Adapter để quản lý data các bạn có thể search thêm để biết thêm.

```java
public class Adapter extends RecyclerView.Adapter<Adapter.Holder> {

    private Context context;
    private ArrayList<Model> arrayList;
    private DatabaseHelper databaseHelper;

    public Adapter(Context context, ArrayList<Model> arrayList) {
        this.context = context;
        this.arrayList = arrayList;
        databaseHelper = new DatabaseHelper(context);
    }

    @NonNull
    @Override
    public Holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.row, parent, false);
        return  new Holder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull Holder holder, final int position) {

        Model model = arrayList.get(position);
        final String id = model.getId();
        final String code = model.getCode();
        final String name = model.getName();
        final String price = model.getPrice();

        holder.txt_Code.setText(code);
        holder.txt_Name.setText(name);
        holder.txt_Price.setText(price);
        }
public class Holder extends RecyclerView.ViewHolder {

        private ImageView img_photo;
        private ImageButton img_Edit;
        private TextView txt_Code, txt_Name, txt_Price;

        public Holder(@NonNull View itemView) {
            super(itemView);
            img_photo = itemView.findViewById(R.id.image_shop);
            txt_Code = itemView.findViewById(R.id.txt_Code);
            txt_Name = itemView.findViewById(R.id.txt_Name);
            txt_Price = itemView.findViewById(R.id.txt_Price);
            img_Edit = itemView.findViewById(R.id.btn_Edit_Row);

        }
    }
}
```

Về file xml để hiển thị data thì ta có trong Activity ListData
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ListData">

    <androidx.recyclerview.widget.RecyclerView
        android:layout_width="match_parent"
        android:id="@+id/recyclerView"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        android:layout_height="match_parent"
        tools:listitem="@layout/row"
        />
</RelativeLayout>
```

Tạo file row.xml 
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    app:cardUseCompatPadding="true"
    app:contentPadding="3dp"
    app:cardElevation="4dp"
    app:cardBackgroundColor="#F6F5FA"
    android:layout_height="wrap_content">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <ImageView
            android:layout_width="75dp"
            android:id="@+id/image_shop"
            android:layout_height="75dp"
            android:layout_centerVertical="true"
            android:src="@drawable/ic_shop"
            />
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:layout_toRightOf="@id/image_shop"
            android:layout_toEndOf="@id/image_shop"
            android:layout_marginLeft="16dp"
            android:layout_marginStart="16dp">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/txt_Code"
                android:text="Code"
                android:textSize="20dp"
                android:textStyle="bold"
                android:textColor="#0E0D0E"
                />
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/txt_Name"
                android:text="Name"
                android:textSize="18dp"
                />
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/txt_Price"
                android:text="Price"
                android:textSize="18dp"

                />

        </LinearLayout>
        <ImageButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/btn_Edit_Row"
            android:src="@drawable/ic_edit"
            android:layout_alignParentEnd="true"
            android:background="@null"
            android:layout_alignParentRight="true"/>
    </RelativeLayout>
</androidx.cardview.widget.CardView>
```
Như hình dưới đây :
![](https://images.viblo.asia/430b967f-a0a7-4ebd-a48a-a5017dd4c12a.png)


### 2. Query Db
#### a) getAllData()
Để lấy tất cả dữ liệu có trong DB thì ta định nghĩa 1 class Cusor để làm việc này. Tạo Class DataHelper extend SQLiteOpenHelper như bên trên nhé.
```java
public ArrayList<Model> getAllData(){
        ArrayList<Model> arrayList = new ArrayList<>();
        String query = "SELECT * FROM " + DataBase.TABLE_NAME;
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(query, null);
        
        if(cursor.moveToNext()){
            do{
                Model model = new Model(
                        ""+ cursor.getInt(cursor.getColumnIndex(DataBase.ID)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.ID_CODE)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.NAME)),
                        "" + cursor.getString(cursor.getColumnIndex(DataBase.PRICE))
                );
                arrayList.add(model);
            }while (cursor.moveToNext());
        }
        db.close();
        return arrayList;
    }
```

#### b) insertData()
Thêm dữ liệu vào DB
```java
 public void insertData(final String code, final String name, final String price){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DataBase.ID_CODE,code);
        values.put(DataBase.NAME,name);
        values.put(DataBase.PRICE,price);

        db.insert(DataBase.TABLE_NAME, null , values);
        db.close();
    }
```

### 3. QrCode
#### a) QRCode Thêm
Trong ACctivity Add đã tạo bên trên ta sẽ tạo 1 imageView để khi nhấn vào nó sẽ show ra màn QrCode để quét lấy mã sản phẩm và add vào EditText , như sau:
```java
public class QrCode extends AppCompatActivity implements ZXingScannerView.ResultHandler {

    private ZXingScannerView scannerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        scannerView = new ZXingScannerView(this);
        setContentView(scannerView);
    }
    @Override
    public void handleResult(Result rawResult) {
        AddData.edt_Code.setText(rawResult.getText());// set Code vào editText Code
        onBackPressed();

    }
    @Override
    protected void onResume() {
        super.onResume();
        scannerView.setResultHandler(this);
        scannerView.startCamera();
    }
    @Override
    protected void onPause() {
        super.onPause();
        scannerView.stopCamera();
    }
}
```
#### b) Màn chính
Khi vào màn chính sẽ show luôn QrCode để quét, nhận được mã Qr ta sẽ query Db để lấy thông tin và show chúng lên một Dialog, luồng xử lý là như vậy.
```java
public class MainActivity extends AppCompatActivity implements ZXingScannerView.ResultHandler{

    private FloatingActionButton btn_add,btn_Edit;
    private ZXingScannerView zXingScannerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        zXingScannerView = findViewById(R.id.scan_Qr);
        
         Dexter.withActivity(this)
                .withPermission(Manifest.permission.CAMERA)
                .withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
                        zXingScannerView.resumeCameraPreview(MainActivity.this);
                        zXingScannerView.startCamera();
                    }

                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {
                        Toast.makeText(MainActivity.this, "You must enable this permission", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {

                    }
                }).check();
                
        btn_add = findViewById(R.id.add);
        btn_Edit = findViewById(R.id.Edit);
        btn_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, AddData.class));
            }
        });
        btn_Edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this,ListData.class));
            }
        });
       
    }
    @Override
    public void handleResult(Result rawResult) {
        final String scanResult = rawResult.getText();

        Cursor data = databaseHelper.selectData(scanResult);

        final TextView txt_name = new TextView(this);
        final TextView txt_price = new TextView(this);

        LinearLayout layout = new LinearLayout(getApplicationContext());
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.addView(txt_name);
        layout.addView(txt_price);

        if (data.moveToFirst()) {
            txt_name.setText(data.getString(data.getColumnIndex("NAME")));
            txt_price.setText(data.getString(data.getColumnIndex("PRICE")));
        }
        data.close();

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Infor");
        builder.setView(layout);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                zXingScannerView.resumeCameraPreview(MainActivity.this);
            }
        });

        AlertDialog alertDialog = builder.create();
        alertDialog.show();

    }

    @Override
    protected void onResume() {
        super.onResume();
        zXingScannerView.resumeCameraPreview(MainActivity.this);
        zXingScannerView.startCamera();
    }

    @Override
    protected void onPause() {
        super.onPause();
        zXingScannerView.stopCamera();
    }
}
```

Các bạn hãy làm tiếp với các trường hợp khác nhé . Cảm ơn mọi người đã đọc.Ngoài ra ta có thể thêm animation vào app cho cold hơn,..
## Kết quả

{@youtube: https://youtu.be/yfhEm-3HUVs}


## Link tham khảo
1. https://github.com/dm77/barcodescanner
2. https://github.com/journeyapps/zxing-android-embedded
3. https://stackoverflow.com/questions/5486789/how-do-i-make-a-splash-screen
4. https://medium.com/@bhawanthagunawardana/android-sqlite-database-crud-s-with-example-application-4f5a841da8f6