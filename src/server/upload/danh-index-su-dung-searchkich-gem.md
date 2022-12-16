# Giới thiệu
Elasticsearch cho phép trả về kết quả cực nhanh bởi thay vì tìm kiếm tìm kiếm thông thường  vì Eslaticsearch tìm kiếm bởi `inverted index`.  Vậy đánh index là gì?

Lấy một ví đơn giản để bạn có thể hình dung ra, ví dụ như sau:

Giả sử khi đọc một quyển sách. Để tìm kiếm 1 chương trong 1 quyển sách thì rõ ràng quyển sách có phụ lục sẽ nhanh hơn nhiều so với quyển sách không có phụ lục đúng không. (Mình ko nói đến chương mở đầu nằm ngay trang thứ 2 nhé =)) ). 

Và để ES cho ra kết quả nhanh như vậy cũng vì lý do tương tự như đánh mục lục cho quyển sách vậy. ES sẽ tiến hành đánh index(mục lục) cho phần content(quyển sách) và lưu lại để phục vụ cho việc tìm kiếm sau này.

Hnay mình tiếp tục giới thiệu cho các bạn về `Gem Searchkich` và trong gem này người ta đánh index ntnao

# Indexing
Kiểm soát dữ liệu nào được đánh index với phương thức `search_data`. Gọi `Product.reindex` sau khi thay đổi cách sử dụng phương thức này.

``` ruby
class Product < ApplicationRecord
  belongs_to :category

  def search_data
    {
      name: name,
      category_name: category.name,
    }
  end
end
```

Searchkick sử dụng  `find_in_batches` để import documents. 
p/s: `find_in_batches` lấy ra batch các records. Nó gọi tới các `batches` đưa vào trong `block` dưới dạng một mảng các record thay vì đưa lần lượt từng record vào, điều làm cho việc sửa dụng `find_in_batches` sẽ hiệu quả hơn  trong việc thao tác với một số lượng lớn các bản ghi.

Để  eager load các associations, ta sử dụng scope `search_import`.
``` ruby
class Product < ApplicationRecord
  scope :search_import, -> { includes(:category) }
end
```
Mặc định, tất cả các record đã được đánh index. 
By default, all records are indexed.  Để kiểm những record đã đc đánh index ta sử dụng method `should_index?`  cùng với scope  `search_import`
``` ruby

class Product < ApplicationRecord
  scope :search_import, -> { where(active: true) }

  def should_index?
    active # chỉ index đối với các record active
  end
end
```
Trường hợp khi `reindex` bị gián đoạn bạn có thể resume nó bằng câu lệnh:
``` ruby
Product.reindex(resume: true)
```
Đối với trường hợp bạn phải reindex số lượng record lớn thì có thể tham khảo thêm ại [parallel reindexing](https://github.com/ankane/searchkick#parallel-reindexing)

## Khi nào thì  Reindex, khi nào thì ko cần Reindex
### Reindex
*  Khi bạn cài đặt hoặc upgrade searchkick
* Thay đổi nội dung  `search_data` method
* Thay đổi `searchkick` method
### Không cần reindex
* Khởi động app
## Stay Synced
Có 4 cách để giữ việc đồng bộ index với database của bạn:
1. Inline (default): Bất cứ khi nào inserted, updated, hay deleted 1 record

2. Asynchronous: Sử dụng background jobs để hiệu quả performance tốt hơn

``` ruby
class Product < ApplicationRecord
  searchkick callbacks: :async
end
```
Jobs sẽ được add vào hàng đợi với name là `searchkick`.

3. Queuing: Push ids của các record cần update vào trong hàng đợi và reindex theo từng batchs. Cách này sẽ có hiệu quả performance tốt hơn so với viẹc sử dụng `Asysnchronous` vì nó sẽ thực hiện đồng thời 1 lần nhiều record thay vì thực hiện riêng lẻ như Asysnchronous. Xem cách setup [tại đây](https://github.com/ankane/searchkick#queuing)

4. Manual

Tắt  syncing tự động 
``` ruby
class Product < ApplicationRecord
  searchkick callbacks: false
end
```
Bạn có thể update hàng loạt bằng tay như sau:

``` ruby
Searchkick.callbacks(:bulk) do
  User.find_each(&:update_fields)
end
```
Hoặc tạm thời skill updates để thực hiện update hàng loạt bằng tay như sau:

``` ruby
Searchkick.callbacks(false) do
  User.find_each(&:update_fields)
end
```
### Associations
Data sẽ không được tự động syns khi có 1 association bị update. Nếu muốn reindex trong trường hợp này bạn có thể gọi:
``` ruby
class Image < ApplicationRecord
  belongs_to :product

  after_commit :reindex_product

  def reindex_product
    product.reindex
  end
end
```
## Analytics
Cách tốt hơn để improve tìm kiếm của bạn bằng cách theo track searches and conversions

Sẽ dễ dàng hơn để làm điều này với `Searchjoy`.

``` ruby
Product.search "apple", track: {user_id: current_user.id}
```
Đọc hướng dẫn và cài đặt [taị đây](https://github.com/ankane/searchjoy)

Tập trung ở 2 phần là:

* top_searches Với low conversions
* top_searches Với no results

# Tài liệu tham khảo
https://github.com/ankane/searchkick
https://github.com/ankane/searchkick#queuing
https://github.com/ankane/searchjoy