## Giới thiệu 

Hẳn là mọi người đều thấy qua các đánh giá 5 sao, 4 sao,... rất nhiều lần, thậm chí là mỗi ngày khi chúng ta tìm kiếm thứ gì đó trên google (đồ ăn, du lịch, mua sắm,...). Dưới đây là một ví dụ: <br>

![](https://images.viblo.asia/f4a1b182-b229-4489-9f20-e9f29337eeee.png) <br>
Có lẽ một số bạn sẽ nghĩ đây là đánh giá của google đưa ra tuỳ thuộc vào chất lượng của website (mình cũng từng lầm tưởng là vậy). Nhưng đây chỉ là một dạng dữ liệu có cấu trúc được định nghĩa trong website (dùng JSON-LD, Microdata hoặc RDFa).
Hiểu một cách đơn giản nhất, dữ liệu có cấu trúc là thông tin được định dạng theo cách có thể được hiểu một cách phổ biến. Đối với các website, dữ liệu có cấu trúc giúp cho công cụ tìm kiếm có thể dễ dàng cho biết một trang nói về nội dung gì và các thành phần khác nhau trên trang đó. Từ đó cho phép công cụ tìm kiếm trả về kết quả hữu ích hơn với truy vấn của người dùng.
## Microdata, JSON-LD, RDFa là gì?

**Microdata** là một phương thức đơn giản để phân loại các nội dung trong website. Microdata hiểu một cách đơn giản là để thêm dữ liệu có cấu trúc vào website. Microdata nó định nghĩa thuộc tính, có thể đặt vào trong HTML để cho biết trang web đó viết về mục đích gì. <br>
**JSON-LD** (JavaScript Object Notation for Linked Data) là một phương thức mã hoá dữ liệu liên kết (Linked Data) sử dụng JSON. <br>
**RDFa** (Resource Description Framework in Attributes) là một đuôi mở rộng (extension) của mã HTML5 được thiết kế để giúp bạn đánh dấu dữ liệu có cấu trúc. Đây là một W3C Recommendation và nó có thể dùng để kết hợp nhiều dữ liệu có cấu trúc khác nhau. Nếu bạn muốn thêm dữ liệu có cấu trúc trong trường hợp Schema.org không đủ đáp ứng.

## Microdata, JSON-LD, RDFa dùng như thế nào?
Ở đây mình sẽ view page source một số website để đưa ra cấu trúc của Microdata, JSON-LD và RDFa tương ứng cho thêm phần thực tế nhé. OK, GO!

### Microdata
**Hình ảnh:** <br>
![](https://images.viblo.asia/1568cc66-03eb-4ccb-b37d-26e4d4888d50.png) <br>
**Link website:** https://www.foody.vn/ho-chi-minh/che-thap-cam-phuc-linh
```
<!--- Đây là phần rating --->
<div 
    itemprop="aggregateRating" 
    itemscope 
    itemtype="http://schema.org/AggregateRating" 
    class="microsite-top-points-block" 
    style="font-size:20px;position:absolute;width: 600px;"
>
    <meta itemprop="worstRating" content="1">
    <meta itemprop="bestRating" content="10">
    <div itemprop="ratingValue" class="microsite-point-avg ">7.3</div>
    <div itemprop="reviewCount" class="microsite-review-count">32</div>
    <div class="microsite-review-text">Bình luận</div>
</div>
```
Như vậy, để hiển thị đánh gía 5 sao trên công cụ tìm kiếm, chúng ta chỉ cần chỉnh giá trị ratingValue :open_mouth::open_mouth: 

### JSON-LD
**Hình ảnh:** <br>
![](https://images.viblo.asia/f4a1b182-b229-4489-9f20-e9f29337eeee.png) <br>
**Link website:** https://www.cooky.vn/cong-thuc/tra-dao-dole-16934<br>
Phần này chắc hẳn các bạn sẽ quan tâm đến cách hiển thị hình ảnh nhỏ bên góc trái phải không nào. Khi view page source, ta sẽ thấy đoạn code như bên dưới nhé.
```
<script type="application/ld+json">
    {
    "@context": "http://schema.org/",
    "@type": "Recipe",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.cooky.vn/cong-thuc/tra-dao-dole-16934"
     },
     "name": "Cách Làm Trà Đào thơm ngon dậy mùi cực ngon cực dễ làm tại nhà",
     "image": {
         "@type": "ImageObject",
         "url": "https://media.cooky.vn/recipe/g2/16934/s400x400/recipe16934-635979775269411988.jpg",
         "height": "400px",
         "width": "400px"
     },
     "author": {
         "@type":"Person",
         "name":"Cooky VN"
     },
     "description": "Cách làm trà đào thơm ngon như nhà hàng, siêu đơn giản tại nhà. Những miếng trà đào dole căng mọng nước và sáng bóng vẫn giữ nguyên được độ giòn vừa phải, kết hợp với bí quyết pha trà đào cực chuẩn sẽ cho bạn ly trà đào ngon",
     // Các bạn view page source website trên để xem tiếp nhé :)...
     }
</script>
```

### RDFa
Sau một hồi tìm kiếm miệt mài thì mình vẫn chưa tìm ra website nào dùng RDFa. Nhưng mà cấu trúc của nó thì kiểu như thế này các bạn nhé :)
```
<div vocab="http://Schema.org/" typeof="Product">
  <img property="image" src=" productphoto.jpg" alt="image description"/>
  <span property="name">product name</span>
  <div property="review" typeof="Review"> Review:
    <span property="reviewRating" typeof="Rating">
      <span property="ratingValue">5</span> -
    </span>
    <b>‘<span property="name">Review Title</span>‘</b> by
    <span property="author" typeof="Person">
      <span property="name">author name</span>
    </span>, written on 
    <meta property="datePublished" content="2006-05-04">May 4 2006
    <div property="reviewBody">review text</div>
    <span property="publisher" typeof="Organization">
      <meta property="name" content="publisher name">
    </span>
  </div>
</div>
```
## Microdata, JSON-LD hay RDFa?
Google đã có một bài hướng dẫn sau https://developers.google.com/search/docs/guides/sd-policies (Last updated March 21, 2019). Trong đó, Google khuyến khích sử dụng JSON-LD thay vì Microdata hay là RDFa. Chúng ta cũng có thể thấy rằng việc sử dụng JSON-LD tiện lợi hơn Microdata và RDFa. Khi sử dụng JSON-LD chúng ta có thể định nghĩa dữ liệu cấu trúc ở một phần script riêng thay vì lồng vào các thẻ html gây khó khăn trong việc xem và chỉnh sửa.

## Kết luận 
Ở bài viết này mình chỉ đưa ra các ví dụ để chúng ta có thể hình dung qua về cấu trúc của Microdata, JSON-LD và RDFa. Về chi tiết hơn, ý nghĩa của từng thuộc tính như thế nào mọi người có thể tìm hiểu chi tiết hơn nhé. Chúc mọi người thành công <3000.

## Tham khảo
https://schema.org/ <br>
https://www.thuatngumarketing.com/microdata/ <br>
https://www.thuatngumarketing.com/json-ld/ <br>
http://vietmoz.com/huong-dan-su-dung-schema-markup-danh-cho-nguoi-moi/ <br>
https://www.ionos.com/digitalguide/websites/website-creation/tutorial-rdfa-markup-with-schemaorg/