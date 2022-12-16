### 1. Mở đầu.
Xin chào bạn!

Nếu như bạn mới tìm hiểu về Android thì bạn có biết rằng Android cung cấp một số tùy chọn để bạn lưu dữ liệu ứng dụng của mình không?. Mình xin nói rằng giải pháp mà bạn chọn tùy thuộc vào nhu cầu cụ thể của bạn, chẳng hạn như dung lượng dữ liệu của bạn yêu cầu, loại dữ liệu bạn cần để lưu trữ, và dữ liệu có phải là private cho ứng dụng của bạn hay ứng dụng khác hoặc người dùng có thể truy cập?

Sau đây mình sẽ giới thiệu cho bạn những cách lưu trữ dữ liệu có sẵn mà Android cung cấp nhé:

***Internal file storage***: Lưu trữ các file riêng tư của ứng dụng (app-private files) trong hệ thống file của thiết bị.

***External file storage***: Lưu trữ file trên hệ thống file chia sẻ ra được bên ngoài. Thường dùng cho các file mà người dùng được chia sẽ, chẳng hạn như hình ảnh, video.

***Shared Preferences***: Lưu trữ dữ liệu nguyên thủy bởi các cặp key-value.

***Database***: Lưu trữ các dữ liệu có cấu trúc trong cơ sở dữ liệu private.

![](https://images.viblo.asia/fc09f6cd-a821-48e6-ab44-ccd326ec926c.png)

Ngoại trư một số loại file trên External Storage, thì tất cả các cách lưu trữ này dành cho dữ liệu riêng tư của ứng dụng - dữ liệu không thể truy cập tự nhiên vào các ứng dụng khác. Nếu bạn muốn chia sẻ file với các ứng dụng khác bạn nên sử dụng FileProvider API

Nếu bạn muốn chia sẻ dữ liệu cho ứng dụng khác sử dụng bạn có thể dùng Content Provider. Content Provider đưa cho bạn toàn quyền kiểm soát quyền read/write có sẵn cho các ứng dụng khác, bất kể các thức bạn đã lưu trữ dữ liệu (mặc dù thường là database).

### 2. Internal storage.
Theo mặc định thì các files được lưu vào Internal Storage (bộ nhớ trong) sẽ là private đối với ứng dụng của bạn, và các ứng dụng khác sẽ không kết nối được (người dùng cũng không được trừ khi chúng có quyền truy cập root). Điều này làm cho Internal Storage là một nơi lưu trữ dữ liệu tốt mà người dùng không cần truy cập trực tiếp. Hệ thống cung cấp một private directory trong hệ thống file cho mỗi ứng dụng, nơi bạn có thể sắp xếp bất kì tệp nào mà ứng dụng của bạn cần.
![alt](https://commonsware.com/blog/images/2014-04-07-storage-situation-internal-storage-1.png)
Khi người dùng gỡ cài đặt ứng dụng của bạn, các file được lưu trữ trong Internal Storage được xóa bỏ. Bởi do hành vi này mà bạn không nên dùng Internal Storage để lưu trữ dữ liệu mà người dùng dự kiến muốn sử dụng độc lập với ứng dụng của bạn. Ví dụ ứng dụng của bạn cho phép chụp ảnh, người dùng sẽ mong đơi sẽ sử dụng những bức ảnh đó sau khi gỡ bỏ ứng dụng của bạn. Vì vậy bạn nên lưu các loại file đó ở External Storage.

***Internal cache file:***

Nếu bạn muốn lưu trữ một số dữ liệu tạm thời, thay vì duy trì lưu dữ liệu liên tục, bạn nên sử dụng cache directory để lưu trữ dữ liệu. Mỗi ứng dụng có một bộ nhớ cache riêng dành riêng cho các loại file này. Khi ứng dụng đang hoạt động nhưng hệ thống thiếu bộ nhớ, Android có thể xoá các file trong bộ nhớ cache này để khôi phục dung lượng. Tuy nhiên bạn không nên dự vào hệ thống để dọn dẹp các tệp này cho bạn. Bạn nên luôn tự duy trì các file trong bộ nhớ cache ở trong giới hạn không gian hợp lý được tiêu thụ, chẳng hạn như 1MB. Khi người dùng gỡ các cài đặt của ứng dụng, các file này cũng bị xóa.

### 3. External storage.
Mọi thiết bị Android đều hỗ trợ không gian lưu trữ External Storage (bộ nhớ ngoài) mà bạn có thể sử dụng để lưu file. Vùng nhớ này được gọi là External (ngoài) là bởi vì nói không phải chắc chắn là một vùng nhớ có thể truy cập được mà nó là một không gian lưu trữ. Là vùng nhớ mà người dùng có thể kết nối với máy tính, thậm chí có thể tháo lắp vật lý, ví dụ như các thẻ nhớ SD. Các file trên External Storage có thể được đọc ở mọi nơi và có thể được người dùng sửa đổi khi chúng cho phép như là một USB để có thể chuyển đổi dữ liệu sang máy tính.
![alt](https://abhiandroid.com/database/wp-content/uploads/2017/03/External-Storage-Explanation-In-Android-Studio.png)

Vì vậy trước khi bạn cố gắng truy cập truy cập một file trong External Storage trong ứng dụng của bạn, bạn nên kiểm tra tính khả dụng của các thu mục này cũng như các file trong chúng

Thông thường, bạn nên sử dụng bộ nhớ ngoài cho dữ liệu mà có thể truy cập vào các ứng dụng khác và vẫn còn lưu khi ứng dụng của bạn bị người dùng gỡ cài đặt. Chăng hạn như những bức ảnh được chụp hoặc những file đã được download xuống trước đó. Hệ thống sẽ cung cấp các thư mục pubic chuẩn cho các loại file này, do đó người dùng có các vị trí cho photos, ringtones, music, ...

Bạn cũng có thể lưu file vào External Storage trong thư mục dành riêng cho ứng dụng của bạn mà hệ thống sẽ xóa khi người dùng gỡ cài đặt ứng dụng này trên điện thoại. Đây có thể là giải pháp thay thế cho bộ nhớ trong nếu cần thêm dung lượng, nhưng các file ở đây không đảm bảo có thể truy cập được bởi vì người dùng có thể xóa, hay tháo thẻ nhớ SD. Và các file này có thể đọc được mọi nơi, chúng chỉ sao lưu vào một nơi mà không được chia sẽ với các ứng dụng khác.

### 4. Shared Preferences
Nếu bạn không lưu nhiều dữ liệu và dữ liệu đó không yêu cầu cấu trúc, bạn nên sử dụng Shared Preferences. Loại lưu trữ này cho phép bạn đọc và ghi các cặp key-value của các kiểu dữ liệu nguyên thủy: booleans, floats, ints, longs và strings

Các cặp key-value này được ghi vào các tệp XML, luôn tồn tại khi ứng dụng được sử dụng và kể các khi ứng dụng bị kill. Bạn có thể chỉ định tên cho file đó theo cách thủ công cho mỗi hành động để lưu trữ dữ liệu của bạn.

Tên Shared Preferences đôi khi gây ra một chút hiểu lầm bởi vì nó không phải hoàn toàn để lưu những tùy chọn của người dùng, chẳng hạn như nhạc chuông mà người dùng đã chọn. Bạn chỉ có thể dùng Shared Preferences để lưu bất kì loại dữ liệu đơn giản nào, chẳng hạn như điểm số cao của người dùng. Tuy nhiên nếu bạn muốn lưu tùy chon người dùng cho ứng dụng của mình bạn có thể dùng PreferenceActivity 
![](https://images.viblo.asia/b9b515df-9153-4638-8ef4-a8405ac58bb8.png)
có thời gian mình sẽ trình bày sau nhé.
### 5. Databases
Android cung cấp hỗ trợ đầy đủ cho SQLite Database. Bất kì cơ sở dữ liệu mà bạn tạo chỉ có thể truy cập được bởi ứng dụng của bạn. Tuy nhiên thay vì sử dụng các SQLite API trực tiếp, thì hiện tại Android khuyến khích các Developers tên tạo và tương tác với cơ sở dữ liệu của mình với Room Databse, một component trong Android Architecture của gói Jetpack.
![alt](https://cdn-images-1.medium.com/max/640/1*-mFSEyfsQRSuuASDyCaGKA.png)

Room cung cấp một abstract class ánh xạ đối tượng cho phép truy cập cơ sở dữ liệu nhanh chóng, tốc độ trong khi đã phát huy khai thác toàn bộ sức mạnh của SQLite Database.

Mặc dù bạn có thể sử dụng với SQLite Database nhưng hiện thì đã xem như tốn rất nhiều thời gian và công sức để sử dụng ^^:

1. Các truy vấn cứng SQL thì không được Compiler time checking. 

2. Khi cấu trúc cơ sở dữ liệu thay đổi thì bạn phải update một cách thủ công. Quá trình này gây tốn thời gian vã dễ bị lỗi.

3. Bạn phải viết nhiều mã để chuyển đổi giữa các truy vấn SQL và các đối tượng dữ liệu java.

Thư viện Room sẽ giải quyết hết những vấn đề này trong khi cung cấp một lớp trừu tượng trên SQLite.

### 6.Tổng kết.
Qua bài viết này mình đã liệt kê ra những cách lưu trữ dữ liệu mà Android cung cấp cho ứng dụng. Ngoài ra bạn cũng có thể lưu trữ dữ liệu của mình bằng cách sử dụng Network Connection. Để làm việc với internet thì các bạn có thể sử dụng các gói java.net và android.net được cung cấp.

Mong bài viết đã có một cái nhìn tổng quan cho các bạn bắt đầu tìm hiểu về Storage trong Android. Xin cám ơn rất nhiều!
### 7.Tài liệu tham khảo.
https://developer.android.com/guide/topics/data/data-storage