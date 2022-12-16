# 1. Giới thiệu
Việc chia sẻ sản phẩm của bạn lên các trang mạng xã hội là một trong những cách đơn giản và hiệu quả để mở rộng độ phủ sóng của sản phẩm. Để giúp cho việc chia sẻ đạt được ảnh hưởng cao, thân thiện với người dùng nhất thì hôm nay mình sẽ giới thiệu các bạn về OpenGraph và áp dụng nó vào một project Rails 5 cơ bản cùng với sự trợ giúp của gem `localtunnel`.

Một ví dụ về việc sử dụng OpenGraph của Tiki:
![](https://images.viblo.asia/a0af2aae-9d7e-42f8-bc23-586c6d73424b.png)

Các bạn có thể thấy rõ: khi share link của một sản phẩm, Facebook sẽ tự động preview ra ảnh, tên, chi tiết của sản phẩm, rất dễ dàng thu hút khách hàng click vào link hơn là khi share một dòng link ngắn ngủi như thế này:
![](https://images.viblo.asia/8302e578-0d9f-4796-8802-96aa8e57043f.png)

Cùng bắt tay vào thực hiện thôi nào !

# 2. Tạo ứng dụng Rails mẫu
```bash
$ rails new opengraph_demo -T
$ rails g scaffold Product name description image price:float
$ rails db:migrate
```

Ở đây mình dùng `scaffold` để tạo một ứng dụng CRUD nhanh chóng. (mà thực ra chỉ cần R thôi là được :rofl::rofl:)

Tạo một vài Product mẫu
`db/seed.rb`
```ruby
Product.create(name: "Pink Keyboard",
  description: "Our original and exclusive pink keyboard I ever had.",
  image: "https://i.imgur.com/R4JWiTC.jpg",
  price: 25
)
```

```bash
$ rails db:seed
```

Sửa lại một xíu ở `app/views/products/show.html.erb` để hiển thị ảnh cho lung linh hơn thay vì text có sẵn của scaffold:

```erb
<p>
  <strong>Image:</strong>
  <%= image_tag(@product.image, size: "500x400") %>
</p>
```

Chạy rails server và truy cập vào http://localhost:3000/products

![](https://images.viblo.asia/2cf01970-df4b-421b-8ba7-7a4f5fd0842a.png)
# 3. Thêm OpenGraph vào ứng dụng
Mục tiêu của chúng ta ở đây là khi share link của 1 sản phẩm bất kì lên mạng xã hội, đường link sẽ preview ra đầy đủ tên sản phẩm, mô tả và ảnh của sản phẩm.

### 3.1. Định nghĩa meta mặc định 
Thêm đoạn code này vào trong thẻ `<head>` ở `app/views/layouts/application.html.erb`

```erb
    <%= tag :meta, property: "og:site_name", content: "OpenGraph Demo" %>
    <%= tag :meta, property: "og:type", content: "website" %>
    <%= yield :head %>
```

Đoạn code này mục đích định nghĩa ra các thẻ meta mặc định của website.

### 3.2. Tạo <meta> động cho từng sản phẩm
Tạo thẻ meta động (dynamics meta tag), để thẻ `<meta>` thay đổi nội dung tương ứng với từng sản phẩm.

`app/views/products/show.html.erb`

```erb
<% content_for :head do %>
  <%= tag :meta, property: "og:title", content: @product.name %>
  <%= tag :meta, property: "og:description", content: @product.description %>
  <%= tag :meta, property: "og:url", content: request.url %>
  <%= tag :meta, property: "og:image", content: @product.image %>
  <%= tag :meta, property: "og:image:width", content: 1200 %>
  <%= tag :meta, property: "og:image:height", content: 630 %>
<% end %>
```

Để kiểm tra xem link preview của mình như thế nào khi share trên Facebook, truy cập vào https://developers.facebook.com/tools/debug/sharing/

Thử kiểm tra đường link của mình xem nào: 
![](https://images.viblo.asia/273258e6-390e-4450-8d38-785e74d75ee5.png)

Hiện tại Facebook không thể scrape được website của mình để kiểm tra các thẻ <meta> vì website của mình vẫn đang còn chạy trên localhost :upside_down_face:. Việc chúng ta cần làm tiếp theo là đưa ứng dụng lên host để Facebook có thể scrape được. Thông thường các bạn sẽ deploy lên VPS hoặc Heroku để chạy thử nhưng việc này khá tốn thời gian, nếu muốn fix thì phải deploy lại lần nữa. 

Vậy nên mình xin giới thiệu `localtunnel`, một công cụ trợ giúp đưa ứng dụng local của mình public, có thể truy cập được từ mọi nơi.

# 3. Đưa ứng dụng public bằng `localtunnel`
Cài đặt `localtunnel`:

```bash
$ npm install -g localtunnel
```

Kiểm tra version xem localtunnel đã được cài đặt thành công hay chưa:
```bash
$ lt --version
1.9.2
```

OK. Việc cài đặt đã thành công. Bật localtunnel lên thôi.

`--port` ở đây sẽ là cổng mà `rails server` đang chạy (mặc định là 3000)
```bash
$ lt --port 3000
your url is: https://bitter-ape-38.localtunnel.me
```

Thử truy cập vào https://bitter-ape-38.localtunnel.me/products/1 xem nào:

![](https://images.viblo.asia/bd2ce1c3-58e3-4d61-972c-63006301f04a.png)

Vậy là ứng dụng của mình đã được public và có thể truy cập được từ bất cứ đâu. Quay trở lại với trang debug sharing của Facebook và đưa link của mình vào xem sao:
![](https://images.viblo.asia/09c579fc-f981-45b4-b58a-332c8481b88c.png)

Click vào **Fetch new information**

![](https://images.viblo.asia/2598579b-8b1a-47ff-b184-7302a5bab152.png)

Tuyệt vời ! Facebook đã truy cập vào website của chúng ta và đã lấy về được thông tin của các thẻ <meta> trong đó. Khi share link của một `Product` thì link preview sẽ hiện thị như trên màn hình. Chúng ta có thể thấy rõ được tên sản phẩm, mô tả sản phẩm và hình ảnh của sản phẩm.

Thử share phát lên Facebook xem nó có chuẩn chỉ không nào:
![](https://images.viblo.asia/c6a05e1a-bf6c-44c7-af5c-1884de566980.png)

Ngon :heart_eyes: Vậy là ứng dụng của mình đã có link preview đẹp đẽ rồi.

# 4. Kết luận
Ngoài Facebook ra, các social network như Twitter, Skype, Pinterest, .. cũng đã và đang hỗ trợ OpenGraph trong việc preview link. Việc sử dụng OpenGraph giúp cho đuờng link sản phẩm của bạn nổi bật hơn, thu hút được nhiều lượt click và lượt xem hơn, tăng lưu lượng truy cập và uy tín thương hiệu cho website của bạn.

| Skype | Twitter |
| -------- | -------- |
| ![](https://images.viblo.asia/44c2f4ab-2561-4196-a3c5-7f59978109ba.png)     | ![](https://images.viblo.asia/6d3e05db-5ddb-4e00-96c2-975422523bb6.png)  | Text     |

Trên đây là toàn bộ hiểu biết của mình về OpenGraph và ứng dụng vào dự án thực tế. Bài viết của mình có thể còn nhiều sai sót, mong mọi người có thể để lại bình luận phía bên dưới để mình có thể sửa và nắm rõ về OpenGraph hơn. 
Cảm ơn mọi người đã đọc bài :blush:


# 5. Tham khảo
[OpenGraphProtocol](http://ogp.me/)

https://iamturns.com/open-graph-image-size/

https://neilpatel.com/blog/open-graph-meta-tags/