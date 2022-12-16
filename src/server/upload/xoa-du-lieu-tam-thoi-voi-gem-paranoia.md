## 1. Đặt vấn đề.
Sẽ có những lúc các bạn gặp trường hợp ở chức năng này muốn xóa đi dữ liệu nào đó, nhưng ở điều đó lại ảnh hưởng đến chức năng khác của ứng dụng.

Mình lấy ví dụ cho dễ hiểu luôn. Giả sử chúng ta làm ứng dụng bán hàng. Database gồm có 1 bảng gồm các danh mục. 1 bảng gồm các sản phẩm. Mỗi sản phẩm thuộc về 1 danh mục. Khi mình xóa 1 danh mục nào đó, thì theo logic thông thường thì sẽ phải xóa đi các sản phẩm thuộc danh mục đó đúng không nào? Nhưng nếu ứng dụng chúng ta lại có 1 chức năng thống kê doanh thu, tức là sẽ hiện thị ra các sản phẩm đã được mua. Vậy nên khi danh mục bị xóa thì sản phẩm cũng bị xóa theo, nên dữ liệu thống kê sẽ bị sai sót. Điều đó buộc chúng ta khi xóa danh mục, thì phải đảm bảo dữ liệu sản phẩm vẫn tồn tại để phục vụ cho chức năng thống kê.

Bài viết này mình sẽ giúp các bạn giải quyết được vấn đề trên nhờ `gem paranoia` được hỗ trợ trong rails.

## 2. Giải quyết vấn đề.
#### Chuẩn bị.
Các bạn thêm `gem "paranoia" ` vào Gemfile và chạy `bundle install` như bình thường.

Những bảng nào cần xóa tạm thì các bạn thêm 1 trường `deleted_at` vào database.

Như ví dụ ở đầu bài thì ta thêm trường `deleted_at` vào bảng danh mục bằng câu lệnh migration như sau:

`rails g migration AddDeletedAtToCategories deleted_at:datetime:index`

Và đừng quên chạy câu lệnh `rails g db:migrate` sau đó nhé. :D

Sau đó chúng ta thêm dòng này vào model Category: `acts_as_paranoid` để khai báo rằng danh mục sử dụng gem paranoia.
#### Cách sử dụng.
Sau khi chuẩn bị xong thì bây giờ chúng ta sẽ tìm hiểu gem nó hoạt động như thế nào.

Bây giờ khi chúng ta chạy câu lệnh `destroy` thông thường: `category.destroy` thì thay vì xóa danh mục đó như thông thường mà sẽ cập nhật trường `deleted_at` của danh mục đó với giá trị là thời gian hiện tại.

Muốn xóa vĩnh viễn danh mục ấy trên database thì ta sử dụng câu lệnh: `category.really_destroy!`.

Muốn xem các danh mục đã xóa ta dùng câu lệnh: `Category.only_deleted`.

Muốn xem tất cả các danh mục bao gồm danh mục đã xóa tạm thời thì sử dụng câu lệnh: `Category.with_deleted`

Còn khi chỉ xem các danh mục không gồm danh mục đã xóa tạm thời ta dùng câu lệnh sau: `Category.without_deleted`

Khi muốn khôi phục lại danh mục đã xóa thì ta dùng câu lệnh: `Category.restore(id)` - Truyền vào id danh mục muốn khôi phục.

Bây giờ chúng ta giải quyết vấn đề khi mà danh mục với sản phẩm có dùng `dependent: :destroy`.

Cụ thể:

```
class Category < ActiveRecord::Base
  acts_as_paranoid

  has_many :products, dependent: :destroy
end

class Product < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :category
end
```

Ở model Product chúng ta cũng thêm  `acts_as_paranoid` vào như bình thường. 

Khi chạy lệnh: `category.destroy` thì các product cũng xóa tạm thời bằng việc set trường `deleted_at` của các product thuộc category ấy với giá trị là thời gian hiện tại.

Khi muốn khôi phục category đồng thời khôi phục các product thuộc category ấy thì ta sử dụng: `category.restore(:recursive => true) `

Vậy là khi xóa category, xóa product, nhưng trên database vẫn còn dữ liệu của product để phục vụ cho việc thống kê sản phẩm đã mua.

Ở chức năng thống kê, chúng ta lấy tất cả các sản phẩm ( bao gồm đã xóa hay chưa) bằng câu lệnh: `Product.with_deleted`. 

##### Các bạn lưu ý:
Nếu ở model Product mà chúng ta quên không khai báo `acts_as_paranoid` hoặc không sử dụng thì khi chạy câu lệnh xóa danh mục: `category.destroy`các product của category đó sẽ bị xóa vĩnh viễn luôn.

## Tổng kết.
Khi chạy các câu lệnh `destroy`, các bạn để ý thấy câu truy vấn được thực hiện là câu UPDATE, cụ thể:
```
UPDATE "categories" SET deleted_at = '2019-01-01 01:01:01.000001' WHERE "categories"."deleted_at" IS NULL AND "categories"."id" = 1
```
Còn khi chạy câu lệnh `really_destroy!` thì mới thực hiện câu lệnh DELETE.

Qua đó chúng ta vẫn có thể thực hiện việc xóa tạm thời mà không cần dùng `gem paranoia`, thay vì sử dụng câu lệnh `destroy` ở method destroy thì ta sẽ `update attribute deleted_at` cho nó. Nhưng nhờ có `gem paranoia` hỗ trợ nên code gọn và dễ hiểu hơn.

Hi vọng qua bài viết này một phần nào đó giúp được các bạn hiểu thêm về `gem paranoia` - gem hỗ trợ xóa tạm thời.