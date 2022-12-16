Đây là bài viết tiếp theo trong seris giới thiệu về Tool Laravel Rocket của một kỹ sư người nhật.

Nếu bạn chưa xem phần 1 thì link [ở đây](https://viblo.asia/p/gioi-thieu-ve-laravel-rocket-phan-1-Do754bN4ZM6).

### Thiết kế API
Ta có thể generate tự động API từ file Swagger.
Lúc đó, hãy tạo file định nghĩa API với tên file kiểu như *documents/apiv1.yml* rồi chạy lệnh sau:
```
php artisan rocket:generate:api:from-oas --osa=./documents/api_v1.yml

```

Sau khi chạy lệnh này, các file cần thiết cho API như setting routing, Controller,... sẽ được generate. 

### Bussiness Logic
Sau khi đã generate tự động xong chúng ta sẽ bắt tay vào viết bussiness logic để hoàn thành app.

Trong thế giới quan của Laravel Rocket, bussiness logic không được viết ở Controller hay Model mà sẽ được viết trong layer Service. Do đó bạn cần định nghĩa service trong *app/Services*. Laravel Rocket cũng chuẩn bị sẵn Generator cho việc này.
```
php artisan rocket:make:service Message
```

Sau khi chạy lệnh trên thi file *MessageService* sẽ được generate ra, bạn sẽ viết thêm method vào file này để định nghĩa bussiness logic.

Ngoài ra, những method common được call từ nhiều chỗ khác nhau không chỉ từ Controller thì sẽ viết vào Helper. Đương nhiên là Help này cũng có thể được generate tự động. 

Bạn chạy câu lệnh dưới đây để generate file Help.
```
php artisan rocket:make:helper Message
```

Dù là Service hay Helper thì khi thực hiện generate đều sẽ generate cả file test. Tuy nhiên hiện tại file test này chỉ dừng ở mức độ kiểm tra xem có thể generate được instance hay không (vì vẫn chưa có method nào cả). Trong tương lai tác giả cũng ấp ủ dự định sẽ chỉnh sửa để có thể bổ sung thêm test cho những method đã được thêm vào sau. 

### Thay đổi cấu trúc table
Trường hợp muốn thay đổi cấu trúc table sau khi generate thì bạn chỉnh sửa file *documents/db.mwb* rôi generate lại bằng lệnh dưới đây. 差分が更新され、Alter Tableが行われるMigrationファイルが生成され、Model、Repository等もアップデートされます。
```
php artisan rocket:generate:from-mwb
```
Sau khi chạy lệnh này thì nội dung thay đổi sẽ được update, file Migration dùng để Alter Table được generate ra, và những file liên quan khác như Model, Repository cũng được update.

Tuy nhiêm đối với việc update class của PHP như Model, Repository thì bạn cần lưu ý rằng : Tool chỉ giữ lại những nội dung đã được chỉnh sửa manual sau khi generate trong phạm vi có thể. Do đó bạn cần xác nhận lại sau khi chỉnh sửa.

### Chỉnh sửa Admin CRUD
Các xử lý Admin CRUD được implement sẵn bằng React, bạn có thể generate những file React này kèm với những API cần thiết để sử dụng. Tuy nhiên, bạn sẽ phải customize khá nhiều.

Để customize thì bạn thực hiện chỉnh sửa file* resources/assets/admin*, rồi build lại bằng yarn dev chẳng hạn. 

## Cấu trúc code được generate của Laravel Rocket

### Repository Pattern
Là Repository Pattern của Laravel. Đây là nơi tập trung các xử lý generate, update, get của Model. 

Những đặc trưng được bổ sung thêm của nó bao gồm:
* Có thể add thêm method một cách linh hoạt hơn. 

Ví dụ bạn có thể chỉ định tên một column nào đó để get data bằng cách định nghĩa method kiểu như findByMessage; hoặc có thể get bằng filter đã chỉ định duới dạng array như allByFilter

* Filter được định nghĩa sẵn bằng method *buildQueryByFilter*

Do đó bạn có thể định nghĩa filter một cách tự do bằng cách viết đè lên hàm này. Nhờ vậy bạn không cần phải định nghĩa nhiều hàm vẫn có thể access vào model.

### Decorator Pattern
Là pattern phân chia logic dùng cho View từ Model, có chuẩn bị sẵn class Presenter cho mỗi Model trong thư mục *app\Presenters* (được geneate tự động). 

Presenter này là tác giả tự viết chứ không phải dùng lib đâu ạ.
```
$model->present()->name
```
Ban có thể access vào Presenter bằng cách chèn vào một method *present* như trên. Nếu không có method nào được mô tả trong Presenter, trường hợp có dữ liệu name trong Model thì nó sẽ được output tự động. 

Ví dụ, nếu không có method *name* nào được định nghĩa thì sẽ call property name của $model.

### Response Object
Trong Laravel, Request được phân chia thành object và có thể thực hiện các xử lý như Validation trong đó. 

Tuy nhiên, Response cũng được định nghĩa ở dạng object và thể thực hiện các xử lý như convert data của Model. 

Các class đang đặt trong thư mục app\Http\Responses.


## Kết
Bài giới thiệu đến đây là kết thúc.

Hy vọng mọi người có cái nhìn tổng quan hơn về tool Laravel Rocket này.

Về cá nhân mình thấy tuy tool này có thể tự đông generate ra nhiều file cần thiết nhưng cũng cần phải customize nhiều. 

Đồng thời tác giả chỉ đang viết ra tool với mục đích cho cả nhấn sử dụng chứ không phải cho cộng đồng nên sẽ còn nhiều điểm cần cải thiện hơn nữa. Do đó chưa nên sử dụng tool vào thời điểm này. Sau này chờ bác ấy cải thiện thêm thì chắc dùng ngon :D