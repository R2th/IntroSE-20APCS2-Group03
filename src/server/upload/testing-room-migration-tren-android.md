# I. Dẫn nhập
* Trong quá trình phát triển dự án, làm việc với Database sẽ khiến cho chúng ta luôn phải đối mặt với vấn đề nâng cấp DB lên các phiên bản khác nhau tùy tình huống. Với *Room* thì chúng ta có thể tham khảo bài trên Viblo theo [link](https://viblo.asia/p/tim-hieu-migrations-trong-room-database-ByEZkNm4KQ0) để hiểu rõ hơn về quá trình nâng cấp cũng như tính toàn vẹn dữ liệu. Và trong bài viết này, mình sẽ giới thiệu đến các bạn phương pháp testing để chắc chắn quá trình nâng cấp Room DB của chúng ta đã thành công 100%
# II. Nội dung chính
* Các câu lệnh SQL được kích hoạt trong phương thức *Migration.migrate* sẽ không được xác minh và tiềm ẩn nhiều rủi ro nên chúng ta cần phải kiểm tra trước. Room cung cấp *MigrationTestHelper* để hỗ trợ chúng ta:
1. Tạo DB với phiên bản cần kiểm tra.
2. Kích hoạt các nâng cấp đã được cấu hình trên DB.
3. Chứng thực DB schema.
> Room sẽ không chứng thực dữ liệu trong DB nên chúng ta cần phải tự thực hiện theo cách riêng của mình 
### 1. Giải thích vấn đề
* Để có thể test, Room cần biết một vài thứ về DB hiện tại: số hiệu phiên bản, các entity, identity hash và các câu query để tạo/cập nhật *roommastertable*. Tất cả thông tin này sẽ được Room tự động được sinh tại thời điểm biên dịch và được lưu dưới dạng file JSON. Trong *build.gradle* chúng ta cần phải định nghĩa folder để chứa các file JSON được sinh ra này. Mỗi khi cập nhật schema, chúng ta sẽ tạo ra các file JSON tương ứng với mỗi version và đảm bảo các file này luôn được đồng bộ với source code. Mỗi khi chúng ta nâng phiên bản DB, Room sẽ sử dụng file JSON tương ứng để testing.
### 2. Điều kiện cần
* Để cho phép sinh ra các file JSON, chúng ta cần cập nhật build.gradle như sau:

**1. Xác định vị trí schema**
```
defaultConfig {
  javaCompileOptions {
            annotationProcessorOptions {
                arguments = ["room.schemaLocation": 
                                "$projectDir/schemas".toString()]
            }
        }
} 
```
**2. Bổ sung vị trí của schema vào *sourceSets***
```
android {
    
    sourceSets {
        androidTest.assets.srcDirs +=  
                           files("$projectDir/schemas".toString())
    }
```
**3. Bổ sung thư viện test của Room vào dependencies**
```
dependencies {
androidTestImplementation    
                “android.arch.persistence.room:testing:1.0.0-alpha5”
}
```
### 3. Migration test rule
* Tạo DB/schema, mở và đóng DB, chạy các nâng cấp là những việc chúng ta cần kiểm tra và phải lặp lại ở nhiều công đoạn. Để tránh lặp lại các công đoạn đã có, chúng ta sẽ sử dụng *MigrationTestHelper*
```
@Rule
public MigrationTestHelper testHelper =
        new MigrationTestHelper(
                InstrumentationRegistry.getInstrumentation(),
                <your_database_class>.class.getCanonicalName(),
                new FrameworkSQLiteOpenHelperFactory());
```
* *MigrationTestHelper* phụ thuộc rất nhiều vào file JSON đã được tạo, kể cả việc tạo DB và chứng thực nâng cấp. Chúng ta có thể tạo một phiên bản DB xác định:
```
// Create the database with version 2
SupportSQLiteDatabase db = 
                         testHelper.createDatabase(TEST_DB_NAME, 2);
```
* Chúng ta có thể chạy tập hợp các nâng cấp và chứng thực tự động khi schema đã cập nhật một cách chính xác:
`db = testHelper.runMigrationsAndValidate(TEST_DB_NAME, 4, validateDroppedTables, MIGRATION_1_2, MIGRATION_2_3, MIGRATION_3_4);`
### 4. Thực hiện test
* Chiến lược test sẽ như sau:
1. Mở DB với phiên bản xác định.
2. Chèn dữ liệu.
3. Chạy nâng cấp và chứng thực schema
4. Kiểm tra dữ liệu đúng trong DB.
### 5. Thực hiện test nâng cấp từ SQLiteDatabase sang Room
1. Extend class SQLiteOpenHelper và trong phương thức onCreate, thực thi các câu lệnh SQL để tọa ra các bảng.
2. Tạo DB trong phương thức @Before
3. Xóa DB trong phương thức @After
4. Sử dụng thực thi SQLiteOpenHelper chèn dữ liệu cần thiết để test nâng cấp từ phiên bản SQLiteDatabase sang phiên bản sử dụng Room.
5. Sử dụng MigrationTestHelper để chạy nâng cấp và chứng thực schema.
6. Kiểm tả chứng thực dữ liệu của DB.
# III. Kết
* Hy vọng với nội dung bài viết mình, các bạn sẽ có thểm kiến thức về việc test nâng cấp Room DB trước khi áp dụng vào thực tế. Nội dung bài viết được tham khảo tại [đây](https://medium.com/androiddevelopers/testing-room-migrations-be93cdb0d975)