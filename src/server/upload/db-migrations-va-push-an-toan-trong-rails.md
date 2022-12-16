## Vấn đề
Bạn muốn thêm một cột mới vào bảng cơ sở dữ liệu để ActiveRecord có thể đọc và cập nhật một thuộc tính mới cho model tương ứng. Bạn chỉ cần gửi một pull request làm 2 điều:
1. Tạo một DB migration thêm trường mới vào bảng.
2. Thêm code đọc và ghi dữ liệu vào cột mới.

Ví dụ:
```
class AddSerialNumberToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :serial_number, :integer
  end
end
```

```
class WidgetsController < ApplicationController
  
  # other methods omitted from this example
  
  def show
    widget = Widget.find(params.require(:id))
    @serial_number = widget.serial_number
  end
end
```

Bạn commit thay đổi và sau khi deploy code lên production, bạn nhận được lỗi sau:
```
NoMethodError: undefined method ‘serial_number’ for #<Widget:0x007fc18bd8fb68>
```

## Chuyện gì đã xảy ra?
Lỗi trên thông báo rất rõ ràng rằng code đã truy cập vào một method không tồn tại trên object `Widget`. Bạn biết rằng một class kế thừa từ `ActiveRecord::Base` sẽ tự động có các instance methods tương ứng với các cột trong cơ sở dữ liệu, do đó lỗi trên chỉ xảy ra khi cột `serial_number` không tồn tại trong cơ sở dữ liệu. Nhưng trong code mới của ta đã có thêm cột trên vào cơ sở dữ liệu. Vậy điều gì sai ở đây?

Vấn đề là việc deploy code mới và chạy các migration tương ứng là non-atomic:
1. Môi trường production có thể bao gồm nhiều webserver ảo. Trong vài phút khi deploy code, một số server có code mới trong khi số khác vẫn chạy code cũ.
2. DB migration có thể hoàn tất sau khi một số server chay code mới và bắt đầu phục vụ người dùng.

Nói cách khác, khi bạn deploy sự thay đổi, môi trường production không biến đổi ngay lập tức từ thế giới cũ sang mới. Cụ thể, cả hai tình huống sau có thể xảy ra trong khoảng thời gian không hề nhỏ trong quá trình triển khai:
1. Một server chạy code mới, nhưng DB migration vẫn chưa thực hiện.
2. Một server chạy code cũ, nhưng DB migration đã hoàn thành.

Trong ví dụ trên, lỗi xảy ra ở trường hợp 1, một hoặc nhiều server chạy code mới tham chiếu đến `serial_number` của `Widget`, nhưng trường đó vẫn chưa được thêm vào DB.

## Giải pháp cho ví dụ
Trong ví dụ này, tất cả những gì bạn phải làm là chia sự thay đổi của bạn thành hai lần push riêng biệt:
1. Đầu tiên, push code migrate và chạy migration.
2. Push code có tham chiếu đến cột mới.

## Một ví dụ khác
Đôi khi việc thay đổi cấu trúc cơ sở dữ liệu phức tạp hơn việc chỉ thêm một vài cột. Xem xét tình huống giả định sau: Ta có một model `Widget` có quan hệ `has_one :widget_configuration`. Model `WidgetConfiguration` có chứa một số thuộc tính liên quan đến `Widget`. Nhưng theo thời gian, một số thuộc tính không cần thiết nữa và các cột được loại bỏ và chỉ còn lại `widget_shape`. Để đơn giản code và khiến các truy vấn cơ sở dữ liệu hiệu quả hơn, ta sẽ loại bỏ bảng `widget_configurations` và thêm cột `widget_shape` vào bảng `widgets`.

Vấn đề là mỗi giây, người dùng web đọc, tạo, sửa, xóa hàng ngàn bản ghi `widget` và `widget_configurations` tương ứng. Làm thế nào để ta có thể thay đổi cấu trúc này mà không làm trang web ngừng hoạt động. 

Những điều gì chúng ta muốn xảy ra?

1. Đầu tiên, ta cần dữ liệu của `widget_shape` được chuyển sang bảng widgets và nó được up-to-date mà không phá vỡ các chức năng đọc và ghi `widget_configurations` khi ta vẫn đang phụ thuộc vào bảng này.
2. Chuyển việc đọc từ `widget_configurations` sang đọc từ cột mới.
3. Dừng việc ghi vào bảng `widget_configurations`.
4. Drop bảng `widget_configurations`.

Giải pháp:
1. Tạo cột mới `idget_shape` cho bảng `widgets`.
2. Thay đổi những chỗ sửa vào bảng `widget_configurations` thì sửa cả vào cột `idget_shape` trong `widgets`.
3. Chạy DB migration và Rake task để chuyển dữ liệu từ bảng cũ sang cột mới.
4. Thay đổi những chỗ đọc từ bảng `widget_configurations` thì đọc từ cột `idget_shape` trong `widgets`.
5. Drop bảng `idget_configurations`.

## Các tình huống khác với DB migration trong đó push an toàn có thể có liên quan
Bất cứ khi nào bạn có hai điều cần phải làm với nhau và cách nhau theo thời gian, bạn có khả năng gặp vấn đề về push an toàn. Ví dụ:
* Job bất đồng bộ: một job có thể được thêm vào hàng đợi, nhưng khi nó được lấy ra để thực thi, callback method của nó không còn tồn tại nữa.
* Web forms: Giả sử người dùng mở một form trước khi deploy, form chỉ có hai trường email và password. Và khi submit form, code mới được deploy và controller yêu cầu một trường mới.
* ...

## Tham khảo
[https://medium.com/czi-technology/db-migrations-and-push-safety-in-rails-508bc877dd7e](https://medium.com/czi-technology/db-migrations-and-push-safety-in-rails-508bc877dd7e)