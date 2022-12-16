Trong bài viết này, mình sẽ đề cập đến cách tạo bài viết trên trang facebook cá nhân hoặc nhóm thuộc sở hữu thông qua ứng dụng rails. 

Các bước tiến hành là:
- Tạo access token cho trang Facebook cần post lên 
- Sử dụng access token đó để post bài viết từ rails app 

## Tạo access token cho Facebook page 
Để có thể tương tác được với facebook, ta cần sử dụng các Facebook API. Muốn sử dụng được Facebook API, ta cần tạo access token để kết nối.

Để tạo access token, trước tiên ta tạo 1 ứng dụng trên trang https://developers.facebook.com/

![](https://images.viblo.asia/ddfc86c3-7f51-4e9b-9e12-151937983d50.png)

Tiếp theo, tạo access token có thời gian sử dụng ngắn 

Sử dụng công cụ ở trang https://developers.facebook.com/tools/explorer/ , chọn ứng dụng vừa tạo và chọn “Get user access token in the drop down”. 

![](https://images.viblo.asia/8a546f64-88a2-4899-a76e-2aa3bafe3026.png)

Ngay khi bạn chọn “Get user access token in the drop down”, nó sẽ hiện ra 1 pop up. Tại đây bạn có thể chọn các quyền hay phạm vi cho access token của bạn.

VD, tôi chọn quyền `publish pages` và `manager pages`, những quyền này có thể cho phép tạo access token không bao giờ hết hạn.

![](https://images.viblo.asia/50aed601-3cc9-48af-87d4-da1082222fd7.png)

Khi đó, bạn có thể tạo ra access token nhưng đây chỉ là mã truy cập trong 1 thời gian nhất định, nếu bạn muốn sử dụng cho ứng dụng của mình, để không phải mất công lặp lại các bước trên để lấy mã, thì ta sẽ tạo ra access token được sử dụng không giới hạn thời gian.

Để tạo được access token không giới hạn thời gian, đầu tiên bạn vào trang `https://developers.facebook.com/tools/accesstoken/`, nhập access token giới hạn ở trên, tại đây, sẽ hiển thị tất cả ứng dụng facebook bạn tạo.

![](https://images.viblo.asia/9bd9d45c-8277-4cca-b04d-bcb83726d352.png)

Chọn ứng dụng bạn cần tạo token và ấn `debug`, sẽ hiển thị tất cả thông tin về access token giới hạn của bạn, kể cả các quyền được dùng. Và thời gian token hoạt động là 60 ngày. Để tạo ra access token không giới hạn thời gian, ta chọn `Extend Access Token` 

![](https://images.viblo.asia/cd24cc98-fda1-4b6b-a96c-a150322c804e.png)

Sau khi có access token không giới hạn, ta chuyển đến trang https://developers.facebook.com/tools/explorer/, sử dụng token đó và gọi api `/me/accounts`, bấm submit , khi đó ta sẽ thấy được tất cả trang facebook ta sở hữu, và các access token để truy cập các trang đấy. Bởi vì ta sử dụng token không giới hạn, nên các access token của các trang đấy cũng không hết hạn, chỉ khi ta thay đổi user / password của ứng dụng. 

![](https://images.viblo.asia/26f161a0-3df3-470c-ac3d-946183d64404.png)

Bạn muốn kiểm tra 1 token là giới hạn hay không giới hạn thì có thể vào trang https://developers.facebook.com/tools/debug/accesstoken/ để kiểm tra.

## Tạo bài viết từ Rails app 

Muốn post 1 bài viết lên facebook từ rails, ta cần dùng access token của user nếu bạn muốn post bài lên trang cá nhân, hoặc access token của 1 trang mà bạn sở hữu, nếu muốn post bài viết lên trang đấy. Sau đó, ta sẽ kết nối đến facebook api dựa theo token đó từ rails app

Để rails có thể kết nối được facebook API, ta sử dụng gem `koala`

Giả sử, ta có model Post lưu thông tin bài viết, ta muốn thực hiện chức năng là khi tạo 1 bài viết từ form, sẽ lập tức gửi nội dung bài viết lên trang facebook với 1 format định sẵn, có thể là tiêu đề bài viết, tóm tắt nội dung bài viết, và link bài viết (link ở đây có thể link đến trang chi tiết bài viết ở server Rails /posts/:id)

Khi đó, ta sẽ dùng gem koala để gửi bài viết lên facebook 

```ruby
fb_graph = Koala::Facebook::API.new(fb_page_access_token)
# fb_page_access_token là access token của trang facebook (vô hạn hoặc giới hạn)

post_content = post.title + "\n" + post.description + "\n" 
fb_graph.put_wall_post(post_content, {link: "#{host}/posts/#{post.id}"})
```

khi đó, bài viết sẽ được tự động gửi lên facebook.

Ngoài ra, bạn có thể gửi 1 bức ảnh hay 1 video lên facebook dễ dàng thông qua các hàm tương ứng như `put_picture`, `put_video`

Trên đây là hướng dẫn cách gửi bài viết từ Rails lên facebook, cảm ơn bạn đã theo dõi.