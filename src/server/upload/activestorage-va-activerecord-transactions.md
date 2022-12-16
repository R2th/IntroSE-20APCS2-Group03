Active Storage là tình năng mới được giới thiệu từ Rails 5.2, tạo điều kiện cho việc tải lên tệp và liên kết của chúng với ActiveRecord.

Đó là một cơ chế tiện dụng và thuận tiện, nhưng trong quá trình sử dụng cũng sẽ có một số vấn đề.

Và vấn đề của mình gặp phải là việc xóa các tệp của ActiveStorage, sau một hồi tìm kiếm, thấy một bài viết có vẻ hay hay, nên mình xin phép chia sẽ lại trong bài viết này...

Giả sử chúng ta có model User đơn giản như sau

```
Class User < ApplicationRecord
  has_one_attached :avatar

  validates :first_name, last_name, presence: true, length: { maximum: 255 }
end
```

và chúng ta đang có một user với avatr dễ thương như này:

![](https://images.viblo.asia/07940398-4958-4841-ae5c-95b2cc1844b1.png)

Mô hình của ActiveStorage như sau:

![](https://images.viblo.asia/0c52aed4-49dd-4fd6-93b9-5d276ea54566.png)
(Hình lụm ở bài viết gốc)

Bây giờ trong model User, chúng ta có thêm một hàm để cập nhật thông tin như sau (ví dụ thôi :) )

```
  def update_info! params
    ApplicationRecord.transaction do
      avatar.purge
      update! params
    end
  end
```

Nhìn có vẻ ổn, và mọi chuyện vẫn ok, nếu params truyền vào là hợp lệ

Tuy nhiên nếu param truyền vào ko đúng, ví dụ **first_name = ""** thì sao? Chắc là sẽ ROLLBACK và mọi thứ vẫn ok?

![](https://images.viblo.asia/c6016e5a-f874-4eb9-abb9-30fd7bf0b830.png)

Dường như không có vấn đề gì, nhưng có một lỗi nghiêm trọng.

Trong đoạn mã trên, rollback xảy ra  và các bản ghi **active_storage_attachments** và **active_storage_blobs** được khôi phục, nhưng tệp thực thể lại không được khôi phục.

```
[44] pry(main)> user.avatar.attached?
  ActiveStorage::Attachment Load (12.9ms)  SELECT  `active_storage_attachments`.* FROM `active_storage_attachments` WHERE `active_storage_attachments`.`record_id` = 106 AND `active_storage_attachments`.`record_type` = 'User' AND `active_storage_attachments`.`name` = 'avatar' LIMIT 1
  ActiveStorage::Blob Load (1.8ms)  SELECT  `active_storage_blobs`.* FROM `active_storage_blobs` WHERE `active_storage_blobs`.`id` = 356 LIMIT 1
=> true
```

```
[45] pry(main)> user.avatar.download
  Disk Storage (1.5ms) Downloaded file from key: evTpR7oo8dHPrLoxjFacp6oM
Errno::ENOENT: No such file or directory @ rb_sysopen - /home/le.duc.tien/JCC/bps/storage/ev/Tp/evTpR7oo8dHPrLoxjFacp6oM
```

Và em user dễ thương lúc trước thành ra thế này

![](https://images.viblo.asia/112abd37-afa4-4f9c-b6f0-9ca400249c10.png)

Và đây là cách nó hoạt động

![](https://images.viblo.asia/839cd098-3c39-4081-b86a-9834cca1f247.gif)

ApplicationRecord.transaction không thể được khôi phục tệp  trình xóa xảy ra bên ngoài giao dịch RDB như đĩa cục bộ hoặc S3.

Vậy cách giải quyết là gì?

Đơn giản là thay đổi 1 tí ở method **update_info!**

```
  def update_info! params
    ApplicationRecord.transaction do
      update! params
      avatar.purge
    end
  end
```

có vẻ ổn, tuy nhiên, nếu avatar cũng bị validate thì việc đổi thứ tự giữa save! và purge sẽ không có ý nghĩa

```
  def validate_avatar
    errors.add(:avatar, :presence) if avatar.blank?
  end
```

Vậy cách giải quyết là gì?

Sử dụng **detach** thay vì **purge**

![](https://images.viblo.asia/f98a4d06-217e-4a86-b8e9-19417658a4fa.gif)

**detach** chỉ loại bỏ **active_storage_attachments**

**attached?**  sẽ trả về **false** nếu không có bản ghi **active_storage_attachments**

Tuy nhiên, như bạn có thể thấy trong hình trên, sử dụng **detach** active_storage_attachments và tệp thực thể mà nó đề cập đến có thể gây lãng phí tài nguyên đĩa, vì vậy nó cần được làm sạch thường xuyên.

Đây là code bạn có thể sử dụng:

```
ActiveStorage::Blob.unattached.find_each(&:purge)
```


-----

Tham khảo:  https://tech.smarthr.jp/entry/2018/09/14/130139

-----

### Mr.Nara