# I. Giới thiệu
- Khi chúng ta cần debug database trong ứng dụng android, khá là khó để xem những gì xảy ra trong database khi user thao tác. Đối với shared preferences cũng vậy.
- Vậy để giải quyết vấn đề này, ta có một thư viện để làm đơn giản hóa những việc trên. Đó là [Android-Debug-Database](https://github.com/amitshekhariitbhu/Android-Debug-Database) của lập trình viên **amitshekhariitbhu**.
- Vậy thư viện trên có thể làm được gì?
1.  Xem tất cả databases.
2.  Xem tất cả dữ liệu shared preferences sử dụng trong application.
3.  Chạy tất cả query để update hoặc delete data.
4.  Sửa trực tiếp giá trị các trường trong database và shared preferences.
5.  Xóa các row trong databases.
6.  Search các dữ liệu bạn muốn.
7.  Sắp xếp dữ liệu.
8.  Export dữ liệu.
9.  Kiểm tra phiên bản của database.
10.  Download databases
- Và thư viện này không yêu cầu thiết bị của bạn phải **root** để sử dụng

# II. Sử dụng debug database
- Thêm đoạn mã này vào **build.gradle** :`debugImplementation 'com.amitshekhar.android:debug-db:1.0.4'`
- Sau khi thêm đoạn mã trên và chạy ứng dụng, nhìn vào logcat ta sẽ thấy đoạn log như dưới đây
> D/DebugDB: Open http://XXX.XXX.X.XXX:8080 in your browser
- Ngoài ra bạn có thể lấy được địa chỉ debug bằng cách sử dụng method `DebugDB.getAddressLog()`.
- Hãy nhớ rằng khi bạn sử dụng `debugImplementation `, ứng dụng chỉ compile trên debug build nên khi bạn build release thì nhớ xóa nó đi nhé. Và điện thoại và máy tính cá nhân của bạn phải sử dụng chung một mạng network. Hoặc nếu kết nối qua usb thì run command line sau `adb forward tcp:8080 tcp:8080`.

# III. Một số option khi sử dụng
- Vì thư viện này tự động khởi tạo cho nên nếu bạn muốn debug file database bất kỳ nào thì hãy xem ví dụ dưới:
```
public static void setCustomDatabaseFiles(Context context) {
    if (BuildConfig.DEBUG) {
        try {
            Class<?> debugDB = Class.forName("com.amitshekhar.DebugDB");
            Class[] argTypes = new Class[]{HashMap.class};
            Method setCustomDatabaseFiles = debugDB.getMethod("setCustomDatabaseFiles", argTypes);
            HashMap<String, Pair<File, String>> customDatabaseFiles = new HashMap<>();
            // set your custom database files
            customDatabaseFiles.put(ExtTestDBHelper.DATABASE_NAME,
                    new Pair<>(new File(context.getFilesDir() + "/" + ExtTestDBHelper.DIR_NAME +
                                                    "/" + ExtTestDBHelper.DATABASE_NAME), ""));
            setCustomDatabaseFiles.invoke(null, customDatabaseFiles);
        } catch (Exception ignore) {

        }
    }
}
```

- Ngoài ra nếu bạn muốn debug inMemory Room database thì hãy xem ví dụ dưới đây:
```
public static void setInMemoryRoomDatabases(SupportSQLiteDatabase... database) {
    if (BuildConfig.DEBUG) {
        try {
            Class<?> debugDB = Class.forName("com.amitshekhar.DebugDB");
            Class[] argTypes = new Class[]{HashMap.class};
            HashMap<String, SupportSQLiteDatabase> inMemoryDatabases = new HashMap<>();
            // set your inMemory databases
            inMemoryDatabases.put("InMemoryOne.db", database[0]);
            Method setRoomInMemoryDatabase = debugDB.getMethod("setInMemoryRoomDatabases", argTypes);
            setRoomInMemoryDatabase.invoke(null, inMemoryDatabases);
        } catch (Exception ignore) {

        }
    }
}
```

# IV. Một số ví dụ khi debug database:
- Quan sát dữ liệu:
![](https://mindorks.files.wordpress.com/2018/01/bd5ef-1b2lbvrlqxzmnv_zmr36mqg.png)

- Sửa các giá trị
![](https://mindorks.files.wordpress.com/2018/01/c52f4-1_exopnglkixhedkfzb7meq.png)

# V. Kết luận
- Vậy như đã thấy ở trên, việc debug database của bạn đã đơn giản hơn rất nhiều thay vì show log, debug ứng dụng v.vv...
- Có những việc tưởng chừng đơn giản nhưng tốn khá nhiều thời gian, vậy tại sao chúng ta không tìm cách giải quyết chúng nhanh hơn. Hy vọng bài viết trên giúp các bạn biết thêm về thư viện debug database, cảm ơn bạn đã đọc bài viết ^^
Happy Reading

Nguồn [Android-Debug-Database](https://github.com/amitshekhariitbhu/Android-Debug-Database)