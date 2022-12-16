Ở bài viết này mình xin phép giới thiệu một vài điều về một hàm rất quen thuộc khi lập trình Ruby on Rails, đó là `redirect_to`

## Tổng quát

Rails redirect_to có hai tham số, **option** và **response_status** (tùy chọn). Nó chuyển hướng trình duyệt đến đích được chỉ định trong tùy chọn.

Tham số này có thể là:

1. Hash

```
redirect_to action: 'show', id: 2
```

2. Record

```
redirect_to article
```

3. Một chuỗi bắt đầu bằng giao thức - // (như http://) - được chuyển thẳng qua làm đích để chuyển hướng.

```
redirect_to 'http://www.nara.com'
```

4. Một `helper method` được tạo bở Rails

```
redirect_to articles_url
```

5. :back - Quay lại trang đã đưa ra yêu cầu.

```
redirect_to :back 
```

Nếu cần, bạn cũng có thể chỉ định controller và action.

```
redirect_to :controller => 'article', :action => 'index'
```

Bạn cũng có thể chỉ định format.

```
redirect_to :action => 'show', :format => 'html'
```

Redirect to root page

```
redirect_to :root
```

Ngoài ra, `redirect_to` không dừng thực thi hàm. Để chấm dứt thực thi hàm ngay sau redirect_to, hãy sử dụng return.

```
redirect_to article_url(article) and return
```

hoặc

```
return redirect_to article_url(article)
```

## Truyền tham số trong redirect_to

Nếu bạn cần chuyển các tham số bổ sung, chỉ cần thêm nó vào helper method

```
redirect_to article_path(article, param: 'foo')
```

Đoạn code trên sẽ tạo path:

```
"/articles/1?param=foo"
```

Hoặc, nếu bạn muốn chỉ định controller và action chính xác:

```
redirect_to controller: 'articles', action: 'show', id: 1, param: 'foo'
```

Code trên cũng sẽ tạo ra path tương tự

Bây giờ, bạn có thể truy cập param trong responding action:

```
def show
  @param = params[:param]
  ...
end
```

## _url và _path

Khác biệt chính giữa _url và _path là:

- _url sẽ cung cấp cho bạn đường dẫn URL tuyệt đối, chứa giao thức, máy chủ và cổng.
 
 Ví dụ: `http://localhost:3000/articles`
 
- _path sẽ trả về đường dẫn tương đối, được đưa ra mà không có miền, giao thức, vv...

 Ví dụ, nó sẽ chỉ là `/articles`
 
##  Sử dụng `redirect_back` thay vì `redirect_to: back`

Trong Rails 4.x, để quay lại trang trước, chúng ta sử dụng redirect_to: back.

Tuy nhiên đôi khi chúng ta nhận được ngoại lệ ActionController::RedirectBackError khi HTTP_REFERER không có mặt.

```
class PostsController < ApplicationController
  def publish
    post = Post.find params[:id]

    redirect_to :back
  end
end
```

Điều này hoạt động tốt khi HTTP_REFERER có mặt và nó chuyển hướng đến trang trước.

Vấn đề xuất hiện khi HTTP_REFERER không có mặt và do đó sẽném ra ngoại lệ.

Để tránh ngoại lệ này, chúng ta có thể sử dụng `rescue` và chuyển hướng đến root_path

```
class PostsController < ApplicationController
  rescue_from ActionController::RedirectBackError, with: :redirect_to_default

  def publish
    post = Post.find params[:id]
    redirect_to :back
  end

  private

  def redirect_to_default
    redirect_to root_path
  end
end
```

Trong Rails 5, `redirect_to: back` đã không được chấp nhận và thay vào đó một phương thức mới đã được thêm vào được gọi là `redirect_back.`

Khi HTTP_REFERER không có mặt, nó chuyển hướng đến người dùng bất cứ điều gì được truyền vào fallback_location.

```
redirect_back(fallback_location: root_path)
```

## redirect_to và render

Gọi tới render sẽ tạo một response đầy đủ trả về cho browser. Nếu không chỉ rõ render trong controller action, Rails sẽ tự động tìm kiếm và render template tương ứng dựa vào tên controller action.

Khác với render công việc của redirect_to là điều hướng browser, yêu cầu browser tạo một request mới đến một URL khác. 

Mặc định Rails sử dụng "302 Moved" redirect, ta có thể thay đổi bằng option status

```
redirect_to root_path, status: 301.
```

Nếu bạn sử dụng `render`, khi người dùng làm mới trang, nó sẽ gửi lại yêu cầu POST trước đó. Điều này có thể gây ra các kết quả không mong muốn như mua hàng trùng lặp và các kết quả khác.

![](https://images.viblo.asia/1723e0ed-7510-4150-86e8-680dea30bf5c.png)

Nhưng nếu bạn sử dụng `redirect_to`, khi người dùng làm mới trang, nó sẽ chỉ yêu cầu lại cùng một trang đó. Điều này còn được gọi là Post/Redirect/Get (PRG) pattern.

![](https://images.viblo.asia/31324b8c-dee7-42ed-87a9-ad14ef864eb6.png)


-----
Trên đây là một vài điều cơ bản về `redirect_to` mà mình lượm lặt được từ nhiều nguồn:

https://stackoverflow.com

https://dzone.com/articles/rails-redirect-to

https://blog.bigbinary.com/2016/02/29/rails-5-improves-redirect_to_back-with-redirect-back.html


-----
## Mr.Nara