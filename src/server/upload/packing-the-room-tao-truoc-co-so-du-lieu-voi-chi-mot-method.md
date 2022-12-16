Có một số trường hợp trong ứng dụng của mình, bạn muốn có sẵn cơ sở dữ liệu với dữ liệu được đóng gói trong APK hoặc được tải xuống từ máy chủ. Cho dù bạn muốn làm điều này với **SQLite** hay với **Room**, có một số điều cần xử lý: mở cơ sở dữ liệu, validate schema, khóa tệp cơ sở dữ liệu và xử lý đồng bộ hóa luồng, sao chép tất cả nội dung và đóng cơ sở dữ liệu.

Bắt đầu với **Room** 2.2, bạn có thể tạo trước cơ sở dữ liệu của mình bằng cách gọi một phương thức: **RoomDatabase.Builder#createFromAsset()** hoặc **createdFromFile()**, tùy thuộc vào vị trí của cơ sở dữ liệu được đóng gói sẵn của bạn. Hãy đọc tiếp để tìm hiểu cách sử dụng các phương pháp này, một số mẹo làm việc với cơ sở dữ liệu được đóng gói sẵn và những gì xảy ra khi có liên quan với migration.

### createFromAsset()

Nếu cơ sở dữ liệu được đóng gói sẵn của bạn là một phần của folder **assets**, hãy sử dụng **createdFromAsset()** với tham số là đướng dẫn của file trong folder **assets** . Ví dụ: nếu cơ sở dữ liệu của bạn được đặt tại: **assets/database/myapp.db**, bạn hãy gọi method **createdFromAsset(database/myapp.db)**.

```
Room.databaseBuilder(appContext, TestDatabase.class, “Sample.db”)
    .createFromAsset(“database/myapp.db”)
    .build()
```

### createFromFile()

Nếu cơ sở dữ liệu của bạn không có trong folder **assets**, ví dụ: bạn đã tải xuống từ máy chủ và lưu vào disk, sử dụng **createFromFile()** với tham số truyền vào là file đã tải đó:

```
Room.databaseBuilder(appContext, TestDatabase.class, “Sample.db”)
    .createFromFile(File(“mypath”))
    .build()
```

> Trong memory databases, không hỗ trợ tạo trước cơ sở dữ liệu thông qua phương thức **createdFromAsset** hoặc **createdFromFile** và **RoomDatabase.build()** sẽ ném **IllegalArgumentException** nếu bạn cố gắng làm điều này.

### File permission

**Room** không mở cơ sở dữ liệu bạn đã cung cấp, thay vào đó nó sao chép nó. Vì vậy, nếu bạn sử dụng Tệp, hãy đảm bảo rằng bạn có quyền đọc, để **Room** có thể sao chép nó.

### Xác thực cơ sở dữ liệu

**Room** đảm bảo tính hợp lệ của cơ sở dữ liệu khi di chuyển từ phiên bản này sang phiên bản khác. Do đó, nó sẽ kiểm tra tính hợp lệ khi tạo cơ sở dữ liệu từ **assets** hoặc **file**. VỚi việc làm như thế, nó đảm bảo rằng các schemas của các cơ sở dữ liệu ban đầu và cái mà bạn đang sao chép được match với nhau.

> **Room** cho phép exporting **schema** của cơ sở dữ liệu thông qua tham số **exportSchema** trong annotation **@Database**. Vì vậy, khi bạn đang tạo cơ sở dữ liệu đóng gói sẵn, hãy sử dụng schema được xác định ở đó.

### Di chuyển cơ sở dữ liệu

Nói chung, khi schema của cơ sở dữ liệu thay đổi, bạn tăng phiên bản cơ sở dữ liệu trong annotation **@RoomDatabase** và thực hiện **migration** hoặc cho phép **destructive migrations**. **Room** sẽ xem xét phiên bản đã được cài đặt trên thiết bị và phiên bản mới nhất được xác định trong ứng dụng của bạn.

Ví dụ: giả sử, cơ sở dữ liệu trên thiết bị là **2.0** và phiên bản cơ sở dữ liệu ứng dụng của bạn, được xác định trong **@RoomDatabase**, là **4.0**. Ở đây, hãy xem điều gì xảy ra trong các tình huống khác nhau, khi cơ sở dữ liệu được đóng gói sẵn cũng được thêm vào trong các trường hợp bên dưới:

* Destructive migrations được enable và cơ sở dữ liệu được đóng gói sẵn có phiên bản cũ hơn phiên bản được xác định trong ứng dụng của bạn, thì cơ sở dữ liệu bị hủy và dữ liệu không được sao chép.
Ví dụ: Nếu cơ sở dữ liệu đóng gói sẵn là phiên bản 3.0 và Destructive migrations được enable, thì cơ sở dữ liệu sẽ bị hủy và dữ liệu không được sao chép.

* Destructive migrations được enable và cơ sở dữ liệu đóng gói sẵn có cùng phiên bản với phiên bản được xác định trong ứng dụng của bạn, thì cơ sở dữ liệu bị hủy và dữ liệu được sao chép từ cơ sở dữ liệu được đóng gói sẵn.
Ví dụ: nếu cơ sở dữ liệu được đóng gói sẵn là phiên bản 4.0, giống như phiên bản cơ sở dữ liệu của ứng dụng và Destructive migrations được enable, thì cơ sở dữ liệu sẽ bị hủy và dữ liệu được sao chép từ cơ sở dữ liệu được đóng gói sẵn.

* Việc migration được implemented và phiên bản của cơ sở dữ liệu được đóng gói cũ hơn phiên bản trong annotation **@RoomDatabase** của bạn, thì **Room** sẽ sao chép dữ liệu và chạy migration.
Ví dụ: nếu cơ sở dữ liệu đóng gói sẵn là phiên bản 3.0 và bạn đã thực hiện các lần di chuyển sau: từ phiên bản 2.0 đến 3.0 và 3.0 đến 4.0, thì việc migration từ phiên bản 2.0 đến 3.0 sẽ được chạy, cơ sở dữ liệu sẽ được sao chép và sau đó migration từ phiên bản 3.0 đến 4.0 được chạy.


| On device db version | @RoomDatabase version | Pre-packaged db version | Migrations | Data copied |
| -------- | -------- | -------- | -------- | -------- |
| 2     | 4     | 3     | destructive     | No     |
| 2     | 4     | 4     | destructive     | No     |
| 2     | 4     | 3     | implemented     | Yes and migrations run     |


> Như một cách thực hành tốt nhất, hãy đảm bảo rằng cơ sở dữ liệu được đóng gói sẵn là phiên bản giống như phiên bản mới nhất được khai báo trong annotation **@RoomDatabase**. Bằng cách này, bạn tránh phải đối phó với các case migration.

> Đọc thêm về **migrations** trong **Room** trong các bài viết khác và về thử nghiệm migrations [ở đây](https://medium.com/androiddevelopers/understanding-migrations-with-room-f01e04b07929).

Giờ đây, bạn có thể dễ dàng tạo trước một Room database từ dữ liệu được gắn trong file APK hoặc từ một file. **Room** bảo vệ tính toàn vẹn dữ liệu của bạn và giúp bạn thực hiện migrations khi cần thiết.