Với những người mới bắt đầu tìm hiểu về Ruby on Rails, phương thức `render` và `redirect_to` có thể dễ gây nhầm lẫn. Hai phương thức này đều xuất hiện ở cuối các action của controller, tạo HTTP response để trả về và sau cùng đều hiển thị view mới trên web browser. Bài viết sau đây sẽ chỉ ra sự khác nhau và khi nào nên dùng cho từng trường hợp.

## render

Gọi tới render sẽ tạo một response đầy đủ trả về cho browser.
Nếu không chỉ rõ render trong controller action, Rails sẽ tự động tìm kiếm và render template tương ứng dựa vào tên controller action.
```
#đoạn code dưới đây sẽ render app/views/foos/my_action.html.erb
class FoosController < ApplicationController
    def my_action
    end
end
```
Nếu bạn muốn render một view khác trong cùng controller, bạn có thể gọi `render :action_name`. 

Hoặc `render "another_controller/action"` nếu bạn muốn render một view thuộc controller khác. 
Và thậm chí cả file ngoài Rails bằng cách chỉ rõ đường dẫn `render "/users/another/apps/different_app/app/views/products/show"`.

Ngoài ra bạn cũng có thể render các định dạng khác như XML, JSON, Status Codes, Text, ...
```
#render một đoạn html ngắn 
render html: "<strong>Not Found</strong>".html_safe
#render định dạng application/json (@product.to_json sẽ được gọi tự động)
render json: @product
#render định dạng application/xml (@product.to_xml sẽ được gọi tự động)
render xml: @product 
#render định dạng text/javascript
render js: "alert('Hello Rails');"
#render status codes
render status: 500
render status: :forbidden
```

## redirect_to

Khác với **render** công việc của redirect_to là điều hướng browser, yêu cầu browser tạo một request mới đến một URL khác. Ví dụ: `redirect_to photos_url`. Hoặc tới một website khác `redirect_to "https://google.com"`.

Mặc định Rails sử dụng "302 Moved" redirect, ta có thể thay đổi bằng option **status** `redirect_to photos_path, status: 301`.

Ngoài ra còn có phương thức `redirect_back` hoạt động tương tự nhưng là điều hướng về trang trước lúc thực hiện request (buộc phải chỉ định option **fallback_location**).

**Chú ý**: `redirect_to` và `redirect_back` không dừng method lại ngay mà chỉ thực hiện response, nghĩa là các câu lệnh sau đó trong method vẫn sẽ được thực thi.


## Khi nào nên dùng?

Xét trường hợp sau
```
def index
  @books = Book.all
end
 
def show
  @book = Book.find_by(id: params[:id])
  if @book.nil?
    render action: "index"
  end
end
```

Khi biến @book là nil, bạn muốn render lại trang **index** nhưng render sẽ không chạy lại code của action **index**, vì thế biến @books sẽ không được khởi tạo và view sẽ không chính xác. 

Điều bạn cần là browser thực hiện một request mới tới trang **index**, bằng cách sử dụng `redirect_to action: :index` thay thế.

Tuy nhiên, công việc lúc này lại trở nên dài dòng. Browser request một **show** action (books/1) và controller tìm kiếm với id được cung cấp nhưng không có kết quả, gửi lại 302 redirect response yêu cầu browser request đến **index** action. Browser lại tiếp tục tạo request mới, controller nhận request này, lấy dữ liệu từ database, render view và gửi trả lại cho browser. Trong trường hợp ứng dụng nhỏ thì việc thay thế trên lại không tối ưu hơn.
```
def index
  @books = Book.all
end
 
def show
  @book = Book.find_by(id: params[:id])
  if @book.nil?
    @books = Book.all
    flash.now[:alert] = "Your book was not found"
    render "index"
  end
end
```
Vậy khi nào nên dùng render, khi nào nên dùng redirect_to tùy thuộc vào bạn. Hãy luôn đặt câu hỏi *có nên tạo một request mới?* khi phải quyết định.
## Tài liệu tham khảo
https://tosbourn.com/difference-between-redirect-render-rails/
http://guides.rubyonrails.org/layouts_and_rendering.html#using-render