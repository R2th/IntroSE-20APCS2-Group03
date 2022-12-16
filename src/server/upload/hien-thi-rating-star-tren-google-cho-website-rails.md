Nếu bạn đã từng search google từ khóa nào đó và gặp những kết quả tìm kiếm ở những trang web có **hiển thị  các đánh giá (Rating)**  như bên dưới thì chắc chắn bạn sẽ thắc mắc bằng cách nào để làm được điều đó ?

Có phải rằng website của bạn chỉ cần có 1 chức năng rating là nó sẽ hiển thị vậy hay không ?

![](https://images.viblo.asia/48d3f3ba-b010-420b-9bec-874e4046fd4a.png)

**Trong khái niệm SEO, nó gọi là cấu trúc schema.**

Trên mặt lý thuyết, việc được hiển thị rating như thế này sẽ gây chú ý và giúp người tìm kiếm quyết định hành động click vào website của bạn. Cũng như nó sẽ chiếm 1 diện tích lớn hơn các nội dung của website khác.


Hôm nay mình sẽ hướng dẫn các bạn cách để có thể hiển thị Rating (Star) giống vậy trên Google cho website Rails của bạn.

## Làm sao để hiển thị Rating trên Google và các Search engines

Đầu tiên. Các bạn sẽ cần xây dựng 1 chức năng đánh giá cho nội dung của các bạn. Sau đó kết hợp với cấu trúc schema AggregateRating để hiển thị lên Google nói riêng và các công cụ tìm kiếm khác nói chung.

Đây sẽ là chức năng để quyết định nội dung đó có tổng trung bình bao nhiêu sao khi hiển thị trên Google. Thật ra các bạn cũng có thể fetch con số này để hiển thị.
Tuy nhiên, mình khuyên khích các bạn nên xây dựng chức năng đó để mang tính công bằng, hữu ích hơn. Tránh bị Google phát hiện sẽ đánh giá là spam schema.


Để nhanh chóng thì các bạn có thể sử dụng **gem ratyrate**

## Setup gem ratyrate

**Thêm vào Gemfile:**

`gem "ratyrate"`

`bundle install`

**Generate các files**

`rails g ratyrate user` => Với user và tên model thực hiện việc rating

**Chạy migrations:**

`rake db:migrate`

**Thêm thư viện js của gem vào ứng dụng**

Cho vào application.js
```
//= require jquery.raty
//= require ratyrate
```

Bây giờ giả sử User sẽ đánh giá Post. Chúng ta sẽ cần thêm **ratyrate_rateable**  vào model Post. kèm theo đó là giá trị các hạng mục muốn đánh giá cho Post đó

**VD: Mình muốn đánh giá Post về 2 mục. 1 là chất lượng nội dung, 2 là chất lượng hỗ trợ từ tác giả của Post.**

```
class Post < ActiveRecord::Base
  ratyrate_rateable "content_quality", "quality_author_support"
end
```

Ở Model User sẽ là đối tượng thực hiện đánh giá. Mình cần thêm **ratyrate_rater** vào

```
class User < ActiveRecord::Base
  ratyrate_rater
end
```

Trên view mình chỉ cần gọi helper **rating_for** do gem này hỗ trợ.

```
<div class="box-rating">
    <% if current_user %>
       Content Quality: <%= rating_for @post, "content_quality" %>
       Quality author's support: <%= rating_for @post, "quality_author_support" %>
   <% end %>
</div>
```

Vậy là nó đã có thể hiển thị 1 Box rating có dạng thế này
![](https://images.viblo.asia/465cb2f7-f6fc-4f65-9994-511c87df22a6.png)

Vậy là bây giờ hệ thống đã có một chức năng đánh giá Post xịn sò.

Bước tiếp theo làm thế nào để hiển thị số đánh giá trung bình lên Google như nội dung và hình ảnh phía đầu bài viết ?

## Thêm cấu trúc schema AggregateRating

Đây là cấu trúc schema chuẩn dùng để hiển thị Rating cho website của bạn trên các công cụ tìm kiếm. 
Ngoài AggregateRating thì bạn có thể tham khảo thêm nhiều  Schema khác [tại đây](https://schema.org/docs/documents.html)

**Cách 1. Dùng attribute và thẻ meta**

```
<div class="rating">
  <div vocab="http://schema.org/" typeof="Product">
     <div property="name" ><%= @post.title %></div>
       <img property="image" src="<%= @post.image_url %>" alt="<%= @post.title %> />
      <div property="aggregateRating" typeof="AggregateRating">
        <span property="ratingValue"><%= @post.average(:content_quality).avg %></span>
          <span property="ratingCount"><%= @post.rates(:content_quality).size %></span> votes
          <meta property="bestRating" content="5"/>
          <meta property="worstRating" content="1"/>
      </div>
    </div>
  </div>
</div>
```

**Cách 2. Chèn ở dạng JSON**

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "<%= @post.average(:content_quality).avg %>",
    "reviewCount": "<%= @post.rates(:content_quality).size %>"
  },
  "description": "<%= @post.description %>",
  "name": "<%= @post.title %>",
  "image": "<%= @post.image_url %>"
 }
</script>
```


Như vậy là đã hoàn tất quá trình, các bạn có thể đợi 1 thời gian để Google cập nhật cho website của bạn. Tất nhiên sẽ còn tùy thuộc vào 1 số yếu tố nữa chứ không phải bất kỳ website nào khi chèn mã schema thì Google đều hiển thị Star trên cả.!

Chúc các bạn thành công !