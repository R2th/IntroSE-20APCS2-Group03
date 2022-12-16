Dữ liệu JSON là một phần quan trọng trong việc tạo API và quản lý dữ liệu theo cách nhất quán là điều cần thiết để sử dụng dữ liệu đó. Khi tạo API Ruby on Rails, sẽ có một vài cách khác nhau để giải quyết vấn đề này nhưng hôm nay tôi sẽ nói về Active Model serializer. Nó cung cấp quy ước dễ dàng để quản lý cấu trúc dữ liệu JSON của bạn.

## to_json

Hãy tạo ra một kịch bản trong đó chúng ta có một ứng dụng blog Rails. Nếu chúng tôi muốn xem một thể hiện của `Post`, và cả thông tin `Author` (tác giả) của `post` đó. Chúng ta có thể sử dụng phương thức to_json của ActiveRecord, cho phép chúng ta lấy được dữ liệu bao gồm các thuộc tính cần thiết của `Post` và `Author`. Nó sẽ trông như thế này:

```
# posts_controller.rb
def show
  @post = Post.find(params[:id])
  
  render json: @post.to_json(only: [:title, :description, :id],
                            include: [author: { only: [:name]}])
end
```

Các bạn có thể thấy trong ví dụ, chúng ta đã render dữ liệu dưới dạng JSON trong controller, dữ liệu này bao gồm mối quan hệ giữa 2 bảng `Post` và `Author`.

Tuy nhiên, chúng ta có thể thấy từ ví dụ này rằng việc quản lý dữ liệu JSON theo cách này dần sẽ trở nên xấu 1 cách rất nhanh. Nếu chúng ta muốn hiển thị thêm mối quan hệ nào hoặc việc bổ sung thêm các thuộc tính của đối tượng được hiển thị, nó gây ra sự khó khăn cho việc theo dõi và kiểm soát được dữ liệu bạn lấy ra. Cách tiếp cận này dẫn đến sự thất vọng khi thực hiện maintain code, và đơn giản là chúng ta không muốn điều đó xảy ra đúng không nào.

## ActiveModel::Serializer (AMS)

Đây chắc chắn là 1 giải pháp tốt hơn để khắc phục điểm yếu của to_json và đây là lúc mà Active Model gem đến và giải quyết nó! Gem này mang lại cho chúng ta quản lý dữ liệu JSON của mình theo quy ước thân thiện mà Ruby On Rails mang lại.

Trong ví dụ trên, chúng ta muốn có 1 instance của Post với dữ liệu Author của nó để hiển thị. Điều này có nghĩa là chúng ta có model Post, Active Model cho phép chúng ta tạo một PostSerializer. Với tệp mới này, chúng ta có gọi `render json :@post` một cách đơn giản và chúng ta sẽ thấy được sự khác biệt!!!!

Nhưng làm thế nào để chúng làm được điều đó? Chúng ta hãy tìm câu trả lời nhé.....

## Setting up Active Model Gem

Di chuyển đền Gemfile của bạn và thêm dòng này vào nhé:

```
gem 'active_model_serializers'
```

Hãy đảm bảo rằng bạn chạy `bundle install` để cài đặt gem trước khi bắt đầu thực hiện tính năng mới này nha.

Tiếp theo, chúng ta sẽ cần phải tạo một serializer cho mô hình Post, gem này cung cấp cho chúng ta một trình tạo đơn giản. Chạy ` rails g serializer post`trong terminal của bạn và chúng ta sẽ có một file mới là `post_serializer.rb`:

```
class PostSerializer < ActiveModel::Serializer
  attributes :id
end 
```

Đây là tệp được tạo mặc định và từ đây, chúng ta có thể thêm các thuộc tính mà chúng ta muốn render trong dữ liệu JSON. Các thuộc tính mà chúng ta chọn là các thuộc tính đặc trựng có sẵn từ model `Post`.

```
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
end
```

Khi đã tạo xong, chúng ta có thể sử dụng `render json: @post`, nó sẽ sử dụng `ActiveModel::Serializer` đã tạo cho mô hình `Post` để hiển thị ra dữ liệu gồm các thuộc tính mà ta đã định nghĩa ở trên. Nhưng bây giờ, chúng ta có một vấn đề khác. Đó là, chúng ta cũng muốn render dữ liệu của `Author` được liên kết với `Post`, vậy làm cách nào để thực hiện việc này ?

## Adding related data

Chúng ta muốn dữ liệu của của `post` dạng JSON sẽ bao gồm thông tin về tác giả của nó. Trước hết, về cơ bản chúng ta sẽ cần trải qua quá trình tương tự từ phía trên để tạo serialize cho model `Author`, có nghĩa là chúng ta sẽ cần một tệp `author_serializer.rb`.

AMS được xây dựng rất nhiều dựa trên các quy ước của Rails và giống như chúng ta sử dụng ActiveRecord để thiết lập mỗi quan hệ giữa các model, chúng ta sử dụng ActiveModel::Serializer theo cách tương tự. Nếu chúng ta có mối quan hệ kiểu `Post belongs_to Author`, chúng ta sẽ cung cấp nội dung này trong PostSerializer:

```
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  belongs_to :author
end
```

Điều này dường như quá đơn giản, nhưng thực tế thì nó đơn giản thật các bạn à :D. Ở đây, JSON sẽ được cung cấp bởi serializer khi được gọi với `render json: @post`:

```
{
  id: 1,
  title: "A Blog Post By Stephen King",
  description: "This is a blog post by Stephen King. It will 
  probably be a movie soon",
  author: {
    id: 1,
    name: "Stephen King"
  }
}
```

## Conclusion

Rails 5 được giới thiệu với các tính năng cho phép các nhà phát triển tập trung vào việc xây dựng các ứng dụng Rails API. Về cơ bản, điều này cho phép tập trung vào Model, Controllers, và xóa Views khỏi kiến trúc của MVC.  Hãy dùng thử và xem ứng dụng Rails API của bạn trở nên dễ bảo trì hơn, khả năng mở rộng cũng cao hơn trong thời gian dài đó.

Happy Coding!!!!!

**Tài liệu tham khảo**

https://medium.com/zero-equals-false/serializing-json-data-in-rails-3d952a427926
https://github.com/rails-api/active_model_serializers/blob/0-10-stable/docs/general/getting_started.md?source=post_page---------------------------