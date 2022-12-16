## Giới thiệu
Ở phần 1, mình đã giới thiệu 3 cách để tăng hiệu năng, giúp tối ưu hóa kết quả truy vấn trong MongoDB

- https://viblo.asia/p/mot-so-tips-de-tang-hieu-nang-truy-van-trong-mongodb-phan-1-1Je5EXNmlnL

Ở phần 2 này mình sẽ trình bày tiếp các cách khác để giúp các bạn thuận lợi hơn trong quá trình làm việc. Lets go!!!

### 4. Cẩn thận với Sort

Khi muốn lấy ra 1 danh sách documents để hiển thị, thường chúng ta sẽ phải sắp xếp theo 1 quy định nào đó. Ví dụ: Danh sách user theo thứ tự mã quốc gia tăng dần:

```
db.user.find().sort({ country: 1 });
```

Việc sắp xếp có thể đạt hiệu quả cao khi bạn có một chỉ mục được xác định. Nếu bạn không có chỉ mục được xác định, MongoDB phải tự sắp xếp kết quả và điều này có thể gây ra vấn đề khi phân tích một tập lớn các documents được trả về. MongoDB áp đặt [giới hạn bộ nhớ 32 MB](https://docs.mongodb.com/manual/reference/limits/#Sort-Operations) cho các hoạt động sắp xếp và thay vì trả về lỗi thì chúng ta sẽ nhận được 1 kết quả trống rỗng không có records nào cả.

Việc sắp xếp đôi khi sẽ bị gặp vấn đề nếu bạn không để ý đến chỉ mục đã đánh trên collection. Quay trở lại collection **user** mà chúng ta đã đánh index:

```
db.user.createIndex({ country: 1 });
```

Bây giờ, chúng ta muốn sắp xếp cả 2 trường **country** và **city** theo thứ tự tăng dần:

```
db.user.find().sort({ country: 1, city: 1 });
```

Mặc dù index trên **country** được sử dụng, MongoDB vẫn phải sắp xếp theo chính trường thứ cấp **city**. Điều này khiến cho tốc độ truy vấn chậm và có thể vượt quá giới hạn bộ nhớ sắp xếp 32 MB. Do đó, bạn nên tạo một chỉ mục ghép:

```
db.user.createIndex({ country: 1, city: 1 });
```

Các hoạt động sắp xếp bây giờ được lập chỉ mục đầy đủ và sẽ chạy nhanh chóng. Bạn cũng có thể sắp xếp theo thứ tự ngược lại vì MongoDB có thể bắt đầu ở cuối chỉ mục và hoạt động ngược. Ví dụ:

```
db.user.find().sort({ country: -1, city: -1 });
```

Tuy nhiên, vấn đề phát sinh nếu bạn cố gắng sắp xếp theo thứ tự **country** giảm dần nhưng tăng dần thứ tự **city**:

```
db.user.find().sort({ country: -1, city: 1 });
```

Chỉ mục của chúng ta không thể được sử dụng, do đó bạn phải không cho phép các tiêu chí sắp xếp thứ cấp không được lập chỉ mục hoặc tạo một chỉ mục phù hợp khác:

```
db.user.createIndex({ country: -1, city: 1 });
```

Sau đó, bạn có thể thoải mái sắp xếp theo thứ tự tùy ý:

```
db.user.find().sort({ country: 1, city: -1 });
```

### 5. Tạo nhiều đối tượng kết nối
Khi xây dựng một ứng dụng, ta sử dụng một đối tượng kết nối cơ sở dữ liệu liên tục duy nhất cho tất cả các truy vấn và cập nhật thì nó vẫn đảm bảo hiệu quả.

MongoDB chạy tất cả các lệnh theo thứ tự nó nhận từ mỗi kết nối của client. Mặc dù ứng dụng của chúng ta có thể thực hiện các cuộc gọi không đồng bộ đến cơ sở dữ liệu, mọi lệnh được xếp hàng đồng bộ và phải hoàn thành trước khi có thể được xử lý tiếp theo. Nếu chúng ta có một truy vấn phức tạp mất mười giây để chạy, lúc này người khác không thể tương tác ứng dụng của bạn cùng một lúc trên cùng một kết nối.

Hiệu suất có thể được cải thiện bằng cách xác định nhiều hơn một đối tượng kết nối cơ sở dữ liệu. Ví dụ:

1. Một để xử lý phần lớn các truy vấn nhanh

2. Một để xử lý việc chèn và cập nhật tài liệu chậm hơn

3. Một để xử lý việc tạo report phức tạp.

Mỗi đối tượng được coi là một máy khách cơ sở dữ liệu riêng biệt và sẽ không trì hoãn việc xử lý của người khác vì vậy ứng dụng luôn đáp ứng được mọi tương tác.

### 6. Set thời gian thực hiện tối đa

Việc thực thi truy vấn mất nhiều thời gian có thể khiến ứng dụng web của bạn rơi vào trường hợp timeout và làm user khó chịu. Điều này có thể gây ra nhiều vấn đề rắc rối khác nhau trong Node.js và chúng ta phải tiếp tục chờ đợi callback bất đồng bộ.

Chúng ta có thể giới hạn thời gian thực hiện được tính bằng mili giây bằng [maxTimeMS()](https://docs.mongodb.com/v3.2/reference/method/cursor.maxTimeMS/) . Ví dụ: cho phép 100 mili giây (một phần mười giây) để truy vấn các documents trong collection User có trường CIty bắt đầu bằng chữ  'A':
```
db.user.find({ city: /^A.+/i }).maxTimeMS(100);
```

Chúng ta nên đặt cho **maxTimeMS** một giá trị hợp lý cho bất kỳ lệnh nào có thể mất thời gian đáng kể. Lưu ý rằng MongoDB không cho phép bạn xác định giá trị global timeout và nó phải được đặt cho các truy vấn riêng lẻ (mặc dù một số thư viện có thể tự động áp dụng mặc định).

### 7. Làm mới lại index

Nếu bạn nghĩ cấu trúc của câu query rất là hợp lý rồi nhưng các truy vấn vẫn chạy chậm, bạn có thể thử xây dựng lại các chỉ mục trên mỗi collections. Ví dụ: xây dựng lại chỉ mục trong collection User thông qua MongoDB command-line:

```
db.user.reIndex();
```

Nếu vẫn không ăn thua thì chúng ta phải xem xét [sửa chữa database ](https://docs.mongodb.com/manual/release-notes/4.2-compatibility/#remove-support-for-the-repairdatabase-command) để tìm và khắc phục sự cố. Phương pháp này chỉ nên sử dụng khi đã hết cách.

## Tổng kết

Trên đây mình đã trình bày 1 số tips để bạn có thể tăng hiệu suất truy vấn trong MongoDB. Hy vọng bài viết sẽ giúp ích cho bạn. Cảm ơn các bạn đã đọc bài.