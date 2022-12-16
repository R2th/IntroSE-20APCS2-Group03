### Tại sao chúng ta cần cơ sở dữ liệu?
Mỗi khi bạn tương tác với ứng dụng và thay đổi một cái gì đó trong đó. bạn muốn lưu dữ liệu đó để bất cứ khi nào bạn mở ứng dụng vào lần tới, những thay đổi bạn đã thực hiện sẽ ở đó. Và, chỉ có thể bằng cách lưu những dữ liệu đó.
* Trong Android, chúng ta sử dụng SQLite database để lưu dữ liệu. Nó lưu trữ dữ liệu dưới dạng bảng. Trong khi lưu các cặp Key-Value, chúng ta sẽ sử dụng **Shared Preferences**.Cách triển khai cơ sở dữ liệu SQlite: Xác định lược đồ của cơ sở dữ liệu. Schema về cơ bản là bản kế hoạch chi tiết cho bạn biết cách dữ liệu của bạn được tổ chức trong cơ sở dữ liệu. Lược đồ được phản ánh trong các câu lệnh SQL mà bạn sử dụng để tạo cơ sở dữ liệu của mình. Nó cũng có thể hữu ích nếu bạn tạo một lớp hợp đồng. Lớp hợp đồng là một thùng chứa các hằng số xác định tên của bảng một
* Tạo một class DatabaseHandler và extend từ class SQLiteOpenHelper, class này sẽ được sử dụng để mở kết nối SQlite và tạo và sửa đổi cơ sở dữ liệu. Bây giờ trong phần này, bạn phải ghi đè hai phương thức (vì nó là một lớp trừu tượng),là onCreate và onUpgrad .
```
class FeedReaderDbHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(SQL_CREATE_ENTRIES)
    }
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        // This database is only a cache for online data, so its upgrade policy is
        // to simply to discard the data and start over
        db.execSQL(SQL_DELETE_ENTRIES)
        onCreate(db)
    }
    override fun onDowngrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        onUpgrade(db, oldVersion, newVersion)
    }
    companion object {
        // If you change the database schema, you must increment the database version.
        const val DATABASE_VERSION = 1
        const val DATABASE_NAME = "FeedReader.db"
    }
}
```
### Shared Preferences là gì và cách thực hiện?
Tùy chọn chia sẻ là một trong những phương pháp bạn có thể lưu dữ liệu trong Android, nó chỉ đơn giản cho phép bạn lưu trữ và truy xuất dữ liệu theo cặp khóa-giá trị. Nếu bạn không hiểu về cặp khóa-giá trị. Đây là một ví dụ :
```
"key" : "value"
"username" : "dipakkr"
"password" : "12345678"
```
Vì vậy, ở đây bạn có thể thấy các cặp trên, username và password là các Key(khóa), trong khi dữ liệu tương ứng của chúng là các value(giá trị).
Để lưu dữ liệu trong Shared Preferences:
```
val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return
with (sharedPref.edit()) {
    putString("username","dipakkr")
    putString("password",12345678")
    commit()
}
```
Để lấy dữ liệu từ Shared Preferences:
```
val username = sharedPref.getString("username", "")
```
### Ưu điểm và nhược điểm của Shared Preferences và SQLite
**Shared Preferences:**
Tất cả các prefs được chia sẻ được lưu trữ trong /data/data/[package name]/shared_prefs/[app name].xml
Shared Preference không có gì ngoài một bảng đơn giản có hai cột. (key,value).
=> Vì vây nó có giới hạn là có kích thước 8192 ký tự theo tài liệu này: http://developer.android.com/reference/java/util/prefs/Preferences.html#MAX_VALUE_LENGTH  
**Ưu điểm:**
 * Truy xuất nhanh
 * Dễ hiểu và lập trình
 
**Nhược điểm:**
 * Có kích thước nhỏ, bị giới hạn 
 * Nhưng việc việc lưu trữ và đọc dữ liệu có cấu trúc lớn sẽ gây khó khăn khi mà lưu theo dạng key/value    
 
**Database:**  
 Khi chúng ta có rất nhiều giá trị để lưu trữ với cấu trúc phức tạp, chúng ta chỉ còn lại một giải pháp tuyệt vời đó là DB.  
**Ưu điểm:**
 * Chúng ta có thể duy trì dữ liệu lớn với cấu trúc dữ liệu phức tạp.  
 * Vì dữ liệu được cấu trúc và quản lý bởi cơ sở dữ liệu, nó có thể được truy vấn để có được một tập hợp con của dữ liệu phù hợp với các tiêu chí nhất định khi sử dụng ngôn ngữ truy vấn như SQL
 * Android có các API tốt và đơn giản để xử lý các hoạt động Sqlite.  
 
 **Nhược điểm:**
 * Hoạt động hơi chậm so với Shared Preferences.
 * Phải mất một thời gian để thiết lập nó  
 
Phần chia sẻ của mình đến đầy là hết !Hy vọng sau khi xem bài viết mình mọi ngừoi nắm được ưu, nhược điểm của từng thằng và triển khai được demo đơn giản. Cảm ơn mọi người đã quan tâm ! :grinning: