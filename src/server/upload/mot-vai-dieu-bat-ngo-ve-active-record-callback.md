Active Record là một  trong nhưng công cụ tuyệt vời của Rails. Nó rất trực quan và mạnh mẽ. 

Tuy nhiên Active Record Callbacks có thể có một số cơ chế ngạc nhiên, và nên sử dụng một cách hợp lý và cẩn thận. Hày làm một ví dụ mới model Post với schema dưới đây

```
create_table :posts do |t|
  t.string  :title
  t.string  :description
  t.boolean :published, default: false, null: false
  t.boolean :posted_on_social_media, default: false, null: false
  t.timestamps
end
```


**after_create_commit**

Khi post được tạo, chúng ta sẽ publish và post bài viết lên mạng. Điều đầu tiên nghĩ đến là thêm 2 callbacks vào after_create_commit là publish, post_on_social_media

```
class Post < ApplicationRecord
  after_create_commit :publish, :post_on_social_media

  private

  def publish
    puts 'publishing'
    update(published: true)
  end

  def post_on_social_media
    puts 'posting on social media'
    update(posted_on_social_media: true)
  end
end
```

Trông thì có vẻ đúng, nhưng sự thật thì chỉ có callback post_on_social_media được chạy và publish thì không.

Callbacks được gọi ngược so với thứ tự định nghĩa. Vậy nên post_on_social_media được gọi trước publish. Trong khi đó bên trong method, đã thực hiện update bản ghi, vì thế đã tạm dừng create callback và thực hiện update callback. 

Hãy thử viết rspec cho ví dụ trên
```
require 'rails_helper'
RSpec.describe Post, type: :model do
  describe 'Callbacks' do
    subject(:post) { Post.create(title: 'Awesome title', description: 'Awesome description') }

    it { is_expected.to have_attributes(posted_on_social_media: true) }
    it { is_expected.to have_attributes(published: true) }
  end
end
```

Trong khi exxample đầu tiên pass, thì cái thứ hai đã fail 

```
$ bundle exec rspec
...
Failed examples:
rspec ./spec/models/post_spec.rb:8 # Post Callbacks is expected to have attributes {:published => true}
```
 Nếu như đã đọc [hướng dẫn ](https://edgeguides.rubyonrails.org/active_record_callbacks.html#destroying-an-object)của Rails
về Active Record Callbacks, nó đã đề cập đến việc tránh sử dụng update trong after_commit callbacks

> Tránh việc update và save trong callbacks. Điều này có thể thay đổi trạng thái của model và gây ra các tác dụng phụ không mong muốn. Thay vào đó, có thể an toàn gán trực tiếp giá trị cho thuộc tính trong before_create / before_update

Vậy làm sao để định nghĩa callbacks cho trường hợp này?

Điều đầu tiên cần lưu ý là lựa chọn sự kiện cho callback, after_create_commit. Active Record Callback (except after_commit) được thực hiện trong 1 transaction, nó có thể rollback nếu có 1 exception. Tuy nhiên, nếu hệ thống cần tương tác với bên ngoài, cần chắc chắn transaction được commit trước khi thực sự tương tác vói bên ngoài, cũng như các thay đổi sẽ không rollback.

Trong trường hợp của chúng ta, methodo post_on_social_media sẽ tương tác với bên ngoài, vì vậy đặt trong callback after_create_commit là hợp lý. Tuy nhiên publish chỉ update 1 cột trong bảng DB, và nó có thể đặt trong before_create hoặc after_create callback.

```
class Post < ApplicationRecord
  after_create_commit :publish, :post_on_social_media

  private

  def publish
    puts 'publishing'
    self.published = true
  end

  def post_on_social_media
    puts 'posting on social media'
    update(posted_on_social_media: true)
  end
end
```

Bây giờ thì rspec của chúng ta đã hoàn toàn xanh.

**Sử dụng chung after_create_commit và after_update_commit**

Hường dẫ chính thức của Rails nói rằng

> Sử dụng chung after_create_commit và after_update_coomit trong cùng 1 model sẽ chỉ cho phép callback cuối cùng được thực hiện, và sẽ ghi đẽ lên tất cả

Ví dụ:

```
class Post < ApplicationRecord
  after_create_commit :print_update_log
  after_update_commit :print_update_log

  private

  def print_update_log
    puts 'post was updated'
  end
end
# Create
@post = Post.create title: "Title"
# không print ra gì cả

# Update
@post.update title: "Title 2"
=> post was updated
```
nhưng nếu thay đổi phương thức khác nhau trong 2 method

```
class Post < ApplicationRecord
  after_create_commit :print_create_log
  after_update_commit :print_update_log

  private

  def print_create_log
    puts 'post was created'
  end

  def print_update_log
    puts 'post was updated'
  end
end

# Create
@post = Post.create
=> post was created

# Update
@post.save
=> post was updated
```

Trong hầu hết các trường hợp, bạn nên có những callbacks khác nhau cho create và update,