## Ransack là gì?
* Là một gem trong Rails hỗ trợ xây dựng chức năng tìm kiếm.
* Có thể sắp xếp kết quả tìm kiếm theo ý muốn người sử dụng.

## Tìm kiếm bằng Ransack
Trên Viblo củng như trên Google có khá nhiều bài hướng dẫn sử dụng Gem Ransack rồi.

Các bạn có thể vào [đây](https://github.com/activerecord-hackery/ransack) để tìm hiểu cách sử dụng củng như nguyên lý hoạt động của nó.

Đến đây, chắc các bạn củng đã nắm cơ bản cách sử dụng của Gem Ransack.

Thông thường, khi sử dụng Ransack, chúng ta có một biểu mẫu sử dụng **search_form_for** trợ giúp mà Ransack cung cấp. Có thể thấy như đoạn code sau:

```
# View index.html.erb
# Tìm kiếm với name

<%= search_form_for @q do |f| %>
  <%= f.label :name_cont %>
      <%= f.search_field :name_cont %>
  <%= f.submit %>
<% end %>
```

Trong controller có đoạn code như sau:
```
# in ItemsController.rb

def index
  @q = Person.ransack(params[:q])
  @people = @q.result
end
```

Nhưng nếu ta muốn hiển thị một view khác với kết quả Ransack thì sao? 

Ví dụ: Ta muốn gửi users đến trang 'Search Results' cụ thể bằng Search Controller.

Để làm điều này, ta sẽ cần truy vấn tìm kiếm từ user và định dạng nó theo cách mà Ransack nhận được nó bằng cách sử dụng các trình trợ giúp biểu mẫu cơ bản. Cụ thể, Ransack muốn một parameter 'q', chứa giá trị Hash khác. Giá trị Hash của 'q' là một cặp key value trong đó key là một chuỗi chứa các phương thức cho cách Ransack nên tìm đối tượng và value của key đó là một chuỗi truy vấn tìm kiếm thực tế từ người dùng.

Về cơ bản, biến params kiểu như này:
```
params = {"q": {"name_cont": "Actually query from the User"}}
```
Ta có thể tạo thông số 'q' này mà Ransack mong đợi bằng cách nhìn thấy đại loại như sau:
```
# trong bất kì view nào

<%= form_tag search_path, method: :get do %>
     <%= text_field_tag :"q[name_cont]" %>
     <%= submit_tag "Tìm kiếm", data: { disable_with: "Searching..." }
<% end %>
```
Form này sẽ tạo params 'q' theo định dạng và theo cách Ransack muốn và gửi nó tới bất kỳ Controller nào ta thiết lập. Tất nhiên ta có thể thay đổi name_cont với bất cứ điều gì phù hợp với nhu cầu tìm kiếm.

Trong Controller muốn sử dụng để hiển thị kết quả, ta vẫn sử dụng như bình thường:
```
def search
    @q = Item.ransack(params[:q])
    @items = @q.result
  end
```

Bây giờ ta có thể sử dụng @items là biến đối tượng trong view để hiển thị kết quả tìm kiếm.

Chúc các bạn thành công!!!