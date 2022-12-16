Là một android dev chắc các bạn đều quen thuộc với một số database giúp lưu trữ data ở local như **SQLite** hay **Zoom** . Ở bài viết này mình sẽ giới thiệu về một cơ sở dữ liệu khá hay và hữu ích cho việc phát triển ứng dụng phục mà bạn muốn lưu trữ dữ liệu online, đó chính là MongoDB. Với MongoDB Atlas, tất cả chỉ cần vài cú nhấp chuột trong trình duyệt là bạn có thể tạo được một database của riêng bạn và chạy trên các điện toán đám mây. Bằng cách sử dụng nó, bạn có thể xây dựng các ứng dụng Android và iOS có thể phục vụ hàng triệu người dùng một cách hiệu quả. Tuy nhiên, bạn vẫn cần một máy chủ phụ có thể hoạt động như một trung gian giữa các thiết bị của người dùng và database của bạn. Bạn sẽ cần nó để thực thi các chính sách bảo mật, thêm một mức độ trừu tượng cho các hoạt động CRUD của bạn, lên lịch công việc cho rất nhiều nhiệm vụ quan trọng khác.
**MongoDB Stitch** là một nền tảng máy chủ mạnh mẽ có thể đáp ứng tất cả các yêu cầu back-end của bạn. Ngoài việc cung cấp kiểm soát truy cập database của bạn,  nó còn cung cấp một môi trường tính toán dựa trên JavaScript mà bạn có thể sử dụng để thực hiện nhiều hoạt động ở phía máy chủ. Trong hướng dẫn này, tôi sẽ chỉ cho bạn cách sử dụng nó trong ứng dụng Android.

# Yêu cầu
- Tài khoản Atlas MongoDB

- Phiên bản mới nhất của Android Studio

- Thiết bị hoặc trình giả lập chạy Android 5.0 trở lên
# 1. Tạo một Atlas MongoDB Cluster
MongoDB Stitch cần được sử dụng với một Atlas MongoDB Cluster. Bạn có thể sử dụng một cụm đã có, hoặc tạo một cụm mới.

Để tạo một cụm mới bạn chỉ cần đăng nhập vào tài khoản MongoDB Atlas của bạn và nhấn nút Build a New Cluster.
![](https://images.viblo.asia/986b07d7-117b-46f7-a89d-4bd4d4c4d255.png)

Trong màn hình tiếp theo, yêu cầu bạn cung cấp chi tiết cấu hình về cụm mới của bạn, chọn bất kỳ nhà cung cấp đám mây nào, khu vực cung cấp cụm tầng miễn phí M0 và nhấn nút  **Create Cluster**.
![](https://images.viblo.asia/9f21f6b7-b8dd-49fa-bbd9-f6abce4618f5.png)

Sau vài phút, bạn sẽ có một cụm tầng miễn phí hoàn toàn mới có tên Cluster0.
# 2. Tạo một ứng dụng MongoDB Stitch
Để liên kết ứng dụng Stitch với cụm của bạn, nhấp vào liên kết **Link Application**. Trong trang mở ra tiếp theo, nhấn nút **Create New Application**.

Bây giờ bạn có thể nhập tên bạn muốn cho ứng dụng Stitch mới của bạn. Sau đó chọn  cụm MongoDB mà bạn muốn liên kết  và nhấn nút Create.
![](https://images.viblo.asia/0350f540-cf97-47f5-acdc-9c00b055f390.png)

Lúc này, ứng dụng của bạn đã sẵn sàng để sử dụng. Chúng ta cùng tới bước tiếp theo nào !
![](https://images.viblo.asia/25ca5fda-8ce6-4aaa-b278-4e371cec7f3e.png)

Mỗi ứng dụng sẽ có ID duy nhất, bạn cần id này để sử dụng trong android app của bạn. Bạn có thể xem id của ứng dụng bằng cách đi tới phần **Clients**  và mở tab **Java (Android)**

# 3. Cấu hình người dùng và các quy tắc
Bằng cách sử dụng MongoDB Stitch, bạn có thể tương tác một cách an toàn để với cụm Atlas MongoDB của bạn. Điều này là có thể bởi vì chuỗi kết nối của bạn không có chứa địa chỉ máy chủ, tên người dùng và mật khẩu của cơ sở dữ liệu trong mã của bạn.

Người dùng cuối được xác thực của ứng dụng Stitch của bạn sẽ tự động truy cập vào cơ sở dữ liệu của bạn. Tuy nhiên, sử dụng một hoặc nhiều quy tắc, bạn có thể kiểm soát chính xác tài liệu và trường nào họ có thể xem hoặc sửa đổi.

Để xác thực người dùng của bạn, Stitch cung cấp một số cơ chế xác thực, bao gồm xác thực ẩn danh, xác thực email / mật khẩu và xác thực bằng cách sử dụng các nhà cung cấp nhận dạng liên kết phổ biến. Trong hướng dẫn này, chúng tôi sẽ sử dụng xác thực ẩn danh. Để thiết lập nó, hãy đi tới phần **Clients** và mở tab  **Providers** 
![](https://images.viblo.asia/4502b9f9-1e28-4550-a29d-ef23200b8e29.png)

Tiếp theo, chọn tùy chọn ** Allow users to log in anonymously**, bật tùy chọn và nhấn nút **Save**.

Giả sử chúng tôi muốn cho phép người dùng ẩn danh của mình làm việc chỉ với các tài liệu họ sở hữu. Để tạo quy tắc như vậy, hãy đi tới phần **Rules**.

Vì các quy tắc được áp dụng cho các bộ sưu tập, hãy nhấn nút **Add Collection** để tạo bộ sưu tập mới ngay bây giờ. Trong biểu mẫu xuất hiện, đặt tên cho nó và chỉ định cơ sở dữ liệu chứa nó. Sau khi bạn làm như vậy, chọn **Users can only read and write their own data** .
![](https://images.viblo.asia/d6375e7c-ae99-4fc3-a787-77cefba87a81.png)

Khi chọn mẫu, bạn sẽ được nhắc chỉ định tên của trường trong tài liệu của mình, trong đó bạn sẽ lưu trữ ID xác thực Stitch được tạo tự động của người dùng. Stitch sẽ sử dụng trường này trong khi quyết định liệu tài liệu có thuộc về người dùng hay không. Hãy gọi nó là **user_id** và gửi biểu mẫu.

Trong trang  tiếp theo, bây giờ bạn có thể xác nhận rằng chỉ chủ sở hữu của các tài liệu trong bộ sưu tập của bạn mới có thể thực hiện các thao tác đọc và ghi .
![](https://images.viblo.asia/e8a14873-2c41-44d3-88ee-57c95f37c388.png)

# 4. Tạo dự án 
Đầu tiên chúng ta cần thêm thư viện để sử dụng Stick
```
implementation 'org.mongodb:stitch-android-sdk:4.0.5'
```
Ngoài ra, bạn phải sử dụng  ID của ứng dụng Stitch trong dự án của bạn. Vì vậy, hãy chuyển đến tệp res / value / String.xml và thêm nó dưới dạng thẻ string
    ```
    <string name="my_app_id">mystitchapp-qwern</string>
    ```
 # 5. Thiết lập kết nối
 Với một thể hiện của lớp StitchAppClient, bạn có thể dễ dàng sử dụng tất cả các tính năng mà nền tảng Stitch cung cấp. Để khởi tạo khởi tạo StitchAppClient, bạn phải gọi phương thức` initizeDefaultAppClient ()` và truyền ID ứng dụng Stitch của bạn cho nó.

Khi đã sẵn sàng, bạn có thể gọi phương thức `getDefaultAppClient ()` để lấy tham chiếu đến máy khách.
```
Stitch.initializeDefaultAppClient(
    resources.getString(R.string.my_app_id)
)
 
val stitchAppClient = Stitch.getDefaultAppClient()
```
Cho đến khii người dùng của bạn đăng nhập vào ứng dụng Stitch, bạn sẽ không thể thực hiện bất kỳ hành động đọc ghi nào trên cụm MongoDB Atlas của bạn. Do đó, bây giờ bạn phải đăng nhập người dùng bằng cách gọi phương thức** loginWithCredential ()** . Ngoài ra, vì bạn đã chọn xác thực ẩn danh làm cơ chế xác thực trong bảng điều khiển web của Stitch, hãy đảm bảo bạn chuyển một thể hiện của lớp AnonymousCredential.
```
stitchAppClient.auth.loginWithCredential(AnonymousCredential())
        .addOnSuccessListener { 
            // More code here
        }
```

Sau khi run app, tới bảng điều khiển web Stitch và mở phần **Clients**, bạn sẽ có thể thấy rằng một mục mới đã được thêm vào danh sách người dùng.
![](https://images.viblo.asia/24ee0336-9946-4902-ba74-31098b633803.png)

# 6. Chèn tài liệu
Sau khi xác thực thành công, bạn có thể tiếp tục và lấy một phiên bản của lớp `RemoteMongoClient` để bắt đầu tương tác với cụm MongoDB Atlas của bạn. Để làm như vậy, bạn có thể gọi phương thức `getServiceClient ()` và chỉ định rằng tên của dịch vụ bạn muốn là "`mongodb-atlas`". Đây là cách thực hiện:

```
val mongoClient = stitchAppClient.getServiceClient(
                    RemoteMongoClient.factory,
                    "mongodb-atlas"
                  )
```

Hãy nhớ rằng, nhờ vào quy tắc bạn đã tạo trước đó, người dùng của bạn chỉ có thể thực hiện các thao tác đọc và ghi trên dữ liệu của chính họ. Hơn nữa, người dùng của bạn bị giới hạn chỉ làm việc với cơ sở dữ liệu và bộ sưu tập mà bạn đã đề cập trong bảng điều khiển web Stitch.

Để có được một tham chiếu đến cơ sở dữ liệu, hãy gọi phương thức `getDatabase ()` và truyền tên của database. Tương tự, để có được một tham chiếu đến bộ sưu tập, hãy gọi phương thức `getCollection ()`, trả về một đối tượng `RemoteMongoCollection`.

```
val myCollection = mongoClient.getDatabase("test")
                              .getCollection("my_collection")
```

Sau đó bạn có thể thêm bất kỳ dữ liệu nào mà bạn muốn, ví dụ như là tôi muốn thêm thời gian mà user bắt đầu khởi tạo database thì tôi có thể làm như sau:

```
val myFirstDocument = Document()
myFirstDocument["time"] = Date().time
```

Để lắng nghe việc thêm dữ liệu có thành công hay không, bạn có thể lắng nghe sự kiện sau:
```
myCollection.insertOne(myFirstDocument)
            .addOnSuccessListener {
                Log.d("STITCH", "One document inserted")
            }
```

# 7 . Chạy các truy vấn
Bằng cách gọi phương thức `find ()` của đối tượng `RemoteMongoCollection` của bạn, bạn có thể tạo một truy vấn. (Bạn có thể tìm hiểu thêm về find () và các hoạt động truy vấn khác trong tài liệu trình điều khiển Java MongoDB.) Phương thức trả về một đối tượng `RemoteFindIterable`, trên đó bạn có thể gọi thêm các phương thức như` sort ()` và` limit () `để quản lý kết quả của truy vấn. Chẳng hạn, đoạn mã sau tạo một truy vấn để tìm năm tài liệu cuối cùng được tạo bởi người dùng:

```
val query = myCollection.find()
                        .sort( Document("time", -1) )
                        .limit(5)
```
Hiện tại, để đơn giản hóa mọi thứ, hãy sử dụng  TextView để hiển thị kết quả của truy vấn. Vì vậy, hãy thêm đoạn mã sau vào tệp XML bố cục của hoạt động của bạn:
```
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/viewer"
    />
```
Và cuối cùng, chúng ta cần hiển thị dữ liệu lên màn hình :
```
val output = StringBuilder("You opened this app: \n\n")
 
// Loop through the results
result.forEach {
    output.append(
        DateUtils.getRelativeDateTimeString(
            this@MainActivity,            
            it["time"] as Long, // Get value of 'time' field
            DateUtils.SECOND_IN_MILLIS,     
            DateUtils.WEEK_IN_MILLIS,
            0
        )
    ).append("\n")
}
 
// Update the TextView
```

Kết quả thu được sau khi run app
![](https://images.viblo.asia/6920465a-5022-4501-9e88-35b666707a6c.png)

# 8.Tổng kết
Tham khảo : https://code.tutsplus.com/tutorials/how-to-use-mongodb-stitch-in-android-apps--cms-31877