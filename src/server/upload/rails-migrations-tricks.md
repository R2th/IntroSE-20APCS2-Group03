Rails Migrations được giới thiệu là một cách thuận tiện để thay đổi cơ sở dữ liệu một cách có cấu trúc và có tổ chức, và mang lại sự nhất quán tuyệt vời theo thời gian trong một dự án.

Với tư cách là các developer Ruby on Rails, chúng ta nkhá quen thuộc với Rails Migrations và Rails generator. Hãy xem qua 9 thủ thuật cho generators và migrations  được thu thập từ trải nghiệm (và Stack Overflow 🙊).

## Danh sách các tip (theo cấp độ chuyên môn):

* **Drop DB columns 1/5**
* **Drop a table 1/5**
* **Roll back a specific migration 1/5**
* **:text V/S :string 2/5**
* **Đổi tên column 2/5**
* **Đổi tên model 2/5**
* **Reset lại database 3/5**


## 1- Migration 1 dòng để drop DB columns:
Rails tự động tạo migrations này nhờ vào command line:
> $ rails generate migration Remove**FieldName**From**TableName** **field_name:datatype**
Tệp migration được tạo sẽ chứa dòng sau:
```
remove_column :table_name, :column_name
```
Ví dụ:
> rails generate migration Remove**Name**From**Merchant name:string**
Sẽ tạo ra:
```
class RemoveNameFromMerchant < ActiveRecord::Migration
  def change
    remove_column :merchants, :name, :string
  end
end
```
Để chạy hãy dùng lệnh **rails db:migrate**
## 2- Cách đúng để migration để drop 1 DB table ##
Rails không phải lúc nào cũng đầy đủ: vì điều này làm mất đi khá nhiều dữ liệu cùng một lúc nên không có một lệnh one line để drop toàn bộ các bảng. Chúng ta cần tạo ra một migration (quan trọng để có được timestamp để giữ cho cơ sở dữ liệu của mọi người được đồng bộ hóa), và tự thêm vào việc xóa bên trong:
> rails generate migration Drop**Merchants**Table

Điều này sẽ tạo ra tệp .rb trống trong /db/migrate/ vẫn cần được viết vào để drop table "Merchant" trong trường hợp này.
Việc triển khai sẽ trông như sau:
```
class DropMerchantsTable < ActiveRecord::Migration
  def up
    drop_table :merchants
  end
  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
```

## 3- Rollback một migration cụ thể

Nói chung, không phải là một ý tưởng hay khi thực hiện việc migration để đảm bảo sự nhất quán về các dự án, môi trường và thời gian và việc revert một migration sẽ phá vỡ cấu trúc. Tuy nhiên trong một số trường hợp và để gỡ lỗi, chúng tôi có thể khôi phục quá trình migration bằng timestamp tương ứng bằng lệnh này:
> rake db:migrate:down VERSION=20170815201547

Việc này sẽ revert tệp migration tương ứng: db\migrate\20170815201547_create_merchants.rb (trong đó “create_merchants” không đóng vai trò, vì identifier duy nhất là timestamp).

Ý tưởng tốt hơn là revert tất cả các lần migration đến một thời điểm nhất định. Trong trường hợp này, chúng ta có thể sử dụng lệnh tương tự với đối số “STEP” xác định số lượng tệp migration mà chúng ta muốn quay trở lại theo thứ tự thời gian:
> rake db:rollback STEP=3
> 
Như bạn có thể biết, để khôi phục đến tệp migration cuối cùng, chúng ta có thể đơn giản là bỏ qua đối số STEP:
> rake db:rollback

## 4- Khi nào chúng ta nên sử dụng ‘text’ hoặc ‘string’ trong Rails?
Sự khác biệt giữa **text** và **string** là gì? Và khi nào nên được sử dụng? Rất đơn giản, sự khác biệt dựa vào cách symbol được chuyển đổi thành kiểu cột tương ứng của nó trong ngôn ngữ truy vấn: ví dụ với MySQL **:string** được ánh xạ tới VARCHAR (255).

### Khi nào thì nên sử dụng?
Theo nguyên tắc chung, hãy sử dụng: **string** cho nhập văn bản ngắn (tên người dùng, email, mật khẩu, tiêu đề, v.v.) và sử dụng: **text** cho đầu vào được mong đợi hơn như mô tả, nội dung nhận xét, vv..
Với MySQL, chúng ta có thể có index trên varchars, nhưng chúng ta không thể có bất kỳ trên **text**. ➡️ Sử dụng **:string** khi index là cần thiết.

Với POSTGRES, chúng ta nên sử dụng **:text** bất cứ nơi nào chúng ta có thể, trừ khi có một hạn chế kích thước, vì không có performance penalty cho text V/S varchar.
## 5- Đổi tên một cột cơ sở dữ liệu với one line Ruby on Rails migration
Câu lệnh: 
> rails g migration Change**ColumnName**
> 
sẽ tạo tệp migation trống, để đổi tên cột bạn sử dụng đoạn migration tương tự như sau:
```
class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :table_name, :old_column, :new_column
  end
end
```
## 6- Đổi tên toàn bộ model ActiveRecord bằng migration Rails
Không phải lúc nào cũng dễ dàng tìm thấy tên phù hợp cho từng model. Khi ta chọn một cái tên không hay cho một modal, đôi khi mình thay đổi nó cho việc sử dụng dễ dàng hơn hơn, bất chấp công việc liên quan. Đây là cách tiến hành;
> rails generate migration Rename**OldTable**To**NewTable**

Sau đó chúng tôi có thể điền vào với “rename_table”:
```
class Rename OldTableToNewTable < ActiveRecord::Migration
  def change
    rename_table :old_table_name, :new_table_name #sử dụng tên số nhiều cho bảng
  end 
end
```

Chúng ta sẽ vẫn phải đi qua và đổi tên model theo cách thủ công trong tất cả các tệp (Và đừng quên kiểm tra các phiên bản được viết hoa và số nhiều của mô hình).

**7- Tinh chỉnh, tạo lại, drop cơ sở dữ liệu Ruby on Rails**

Để xóa hoàn toàn và xây dựng lại cơ sở dữ liệu, chúng ta có thể:
> rake db:reset db:migrate

Để sẽ thiết lập lại cơ sở dữ liệu và tải lại schema hiện tại:
> rake db:drop db:create db:migrate

Điều này sẽ phá hủy DB, tạo một DB mới và sau đó migrate file schema hiện tại.

⚠️ Tất cả dữ liệu sẽ bị mất trong cả hai trường hợp.

Hãy cùng so sánh các lệnh drop và migration khác nhau:

`rake db:schema:load` - Tạo các bảng và các cột trong cơ sở dữ liệu (hiện có) theo **schema.rb**. **db:schema:load** được sử dụng khi bạn thiết lập một phiên bản mới của app.

`rake db:reset` - Xóa cơ sở dữ liệu và chạy migration trên cơ sở dữ liệu mới.

`rake db:db:migrate` -  chạy (đơn) migration chưa chạy. Thông thường, bạn sẽ sử dụng `db:migrate` sau khi đã thực hiện thay đổi đối với schema của một DB hiện có thông qua các tệp migration mới.

`rake db:create` tạo ra cơ sở dữ liệu

`rake db:drop` xóa cơ sở dữ liệu

`rake db:setup` sẽ làm các việc **db:create, db:schema:load, db:seed**

`rake db:reset` sẽ làm db:drop, db:setup

`rake db:seed` chạy nhiệm vụ seed dữ liệu sơ bộ vào cơ sở dữ liệu

Qua bài viết này, mong các bạn hiểu hơn về migration trong Ruby On Rails. Cảm ơn các bạn đã đọc!