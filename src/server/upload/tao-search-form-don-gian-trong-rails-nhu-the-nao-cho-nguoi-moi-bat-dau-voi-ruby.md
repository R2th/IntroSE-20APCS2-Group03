- Tình cờ ngồi hướng dẫn code cho anh bạn đang muốn chuyển qua ruby thế là sẵn mình viết 1 bài hướng dẫn cơ bản cho các bạn vừa nhập môn với ruby, chủ đề là viết chức năng search cơ bản nhé. Cùng bắt tay vào việc nhé =))
## Bước 1:  view
Ở đây mình sẽ có 1 trang books/index.html.erb chứa danh sách những cuốn sách như sau:
```
<h1>Books</h1>
<table>
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <% for book in @books %>
        <div class='book'>
            <strong> <%= book.name %> </strong>
        </div>
        <%= link_to 'Edit', edit_book_path(book) %>
      <% end %>
     </tr>       
  </tbody>
</table>
```
## Bước 2: Thêm form tìm kiếm
```
<%= form_tag(books_path) do %>
  <%= text_field_tag :term %>
  <%= submit_tag 'Search' %>
<% end %>
```
Bây giờ bạn đã có 1 form tìm kiếm đơn giản và sẽ gửi đi giá trị biến term mà ta nhập vào.
## Bước 3:  Tạo method book_params
- Bước này thì chắc các bạn nào khi bắt đầu với rails cũng sẽ hiểu rồi, chỉ là viết method để lấy giá trị từ params mà ta cần
```
def book_params
  params.require(:).permit(:term)
end
```
## Bước 4: Chỉnh sửa form
Ta cần chú ý vấn đề, mặc định form của chúng ta sẽ sử dụng method là post để gửi, ta cần sửa lại là get.
```
<%= form_tag(books_path, method: :get) do %>
  <%= text_field_tag :term %>
  <%= submit_tag 'Search' %>
<% end %>
```
## Bước 5: Xử lý search term
Bây giờ sau khi đã có form search ta sẽ xử lý term để lọc danh sách trả về:
```
def index
  @books = if params[:term]
    Book.where('name LIKE ?', "%#{params[:term]}%")
  else
    Book.all
  end
end
```
- Chắc có lẽ cũng không giải thích nhiều, chúng ta chỉ kiểm tra xem có nhận được giá trị term hay không, nếu có ta sẽ gọi where để lọc ra bằng cách sử dụng regular expression đơn giản để tìm name của book có chứa chuỗi term. Nếu bạn không biết regular expression thì mình khuyên các bạn nên tìm hiểu qua vì bạn còn lập trình thì sẽ gặp khá nhiều đấy
## Bước 6: Giữ chuỗi term sau khi search
- Sau khi reload lại và trả về kết quả bạn mong muốn, nhưng ở đây form search của chúng ta cũng được reload và mất đi giá trị ta đã nhập, ta sẽ thêm 1 tí vào form để giữ giá trị cho trường input term sẽ lấy giá trị của params[:term] 
```
  <%= text_field_tag :term, params[:term] %>
```
## Bước 7: Viết method search vào model
- Thay vì quá rườm ra trong controller ta sẽ chuyển câu lệnh truy vấn vào model thông qua method search như sau:
```
def self.search(term)
  if term
    where('name LIKE ?', "%#{term}%")
  else
    all
  end
end
```
- Và trong index ta chỉ việc gọi:
`def index
  @tasks = Task.search(params[:term])
end
`
## Tổng kết:
Về cơ bản thì đây là cách tạo 1 form tìm kiếm đơn giản, ta có thể phát triển thêm tìm kiếm bởi nhiều dữ liệu khác nhau, rails có các gem hỗ trợ search rất mạnh mẽ, nhưng với những bạn mới tiếp cận với rails thì mình nghĩ tự viết cho mình, tự giải quyết nó thì sẽ giúp bạn hiểu rõ hơn. Mong rằng bài viết sẽ hữu ích cho các bạn. Mọi thắc mắc có thể comment bên dưới cùng trao đổi nhé.