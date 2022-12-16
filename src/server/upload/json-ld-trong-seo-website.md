<div align="center">
    
# Lời nói đầu
    
</div>

Chắc hẳn các bạn đều đã quá quen thuộc với câu 
> Dân ta phải biết sử ta, nếu mà không biết thì tra google

Đúng như vậy, giờ đây google đã trở thành công cụ tìm kiếm phổ biến bậc nhất trên toàn thế giới nói chung cũng như là Việt Nam nói riêng, và mỗi khi tìm kiếm một từ khóa, google sẽ trả về cho bạn vô số kết quả (nếu bạn để ý phần phân trang phía cuối)

![](https://images.viblo.asia/b948e94a-de5e-481e-8044-dad33108d161.png)

Mỗi trang như vậy có khoảng 10 kết quả, và mình tin chắc là tất cả mọi người cùng lắm chỉ chuyển đến page thứ 2 là tìm được thứ mình cần, tức là nếu bạn muốn trang web của mình có được nhiều lượt truy cập thì phải làm cho nó xuất hiện trên đầu trong danh sách kết quả tìm kiếm của Google. Và thứ bạn cần đó chính là **SEO**.

Vậy hãy cùng tìm hiểu xem SEO là gì và cần gì để "làm SEO" nhé!

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## SEO là gì?
    
</div>

- **SEO (Search Engine Optimization)** dịch ra là tối ưu hóa công cụ tìm kiếm (ví dụ như Google, Bing, Yahoo, ...). Nói qua một chút về cơ chế hoạt động của Search Engine để cho mọi người dễ hiểu nhé, một Search Engine sẽ bao gồm 3 yếu tố:
    - **Spider**: hay còn được gọi là Crawler hoặc Bot. Ngoài ra, công cụ này còn được gọi là những “con bọ”. Spider chịu trách nhiệm thu thập thông tin của các trang web. 
    - **Index**: công cụ lập chỉ mục. Những thông tin spider thu thập được sẽ được mã hóa dưới dạng text và lưu trữ lại với dung lượng nhỏ nhất có thể. Khi người dùng tìm kiếm thông tin, Search Engine không cần phải tốn thời gian truy cập vào từng trang web để tìm mà chỉ cần nhờ đến những thông tin đã được lập chỉ mục. Quá trình index diễn ra song song với việc thu thập thông tin của spider.
    - **Search Engine Results Page (SERP)**: kết quả tìm kiếm của bạn sẽ được trích xuất, xếp hạng và hiển thị trên trang web. Bạn chỉ cần chọn mục muốn xem.

    => Trước tiên, spider sẽ thu thập thông tin của các trang web. Những thông tin này liền được mang đi lập chỉ mục. Khi người dùng tìm kiếm, công cụ tìm kiếm sẽ trích xuất dữ liệu và cho bạn những kết quả tương ứng với từ đã tìm. 

- Để làm **SEO** thì chúng ta cần quan tâm đến rất nhiều vấn đề, ví dụ: 
    - **Domain**: tên miền phải có từ khóa hoặc liên quan đến website, và thời hạn của tên miền cũng ảnh hưởng một phần (một tên miền được sử dụng lâu dài sẽ được đánh giá cao hơn một tên miền mới đăng ký)
    - **Hosting**: hosting cần có tốc độ cao, an toàn và ổn định
    - **Tối ưu URL**:  như bạn thấy ở viblo, cũng như là các trang web đọc báo/bán hàng khác thì trong url sẽ cung cấp thông tin để cho người đọc biết được nội dung của trang web nói về cái gì (thường thì sẽ là title của bài viết)
    
   ![](https://images.viblo.asia/8a21e5f8-cf88-4a7e-b445-300ff2aa0b73.png)
    
    -  **Title và description ở trang kết quả tìm kiếm**:  khi tìm kiếm trên một `Search Engine` bất kì, ngoài đường link vào trang web còn có thêm phần mô tả của nội dung trên kết quả tìm kiếm, điều này cung cấp cho người dùng thêm thông tin để đưa ra quyết định có truy cập vào trang web hay không. Vì vậy title và description phải mô tả ngắn gọn, đầy đủ và hấp dẫn, thu hút nhằm tăng lượng truy cập vào website.
    ![](https://images.viblo.asia/b92fc705-b7af-4c07-97e5-66d1cd60e611.png)
    
    - ...
<div align="center">
    
## Tìm hiểu về JSON-LD để SEO website
    
</div>

<div align="center">
    
### JSON-LD là gì?
    
</div>

Theo như định nghĩa trên wikipedia thì:
> **JSON-LD** là viết tắt của **JavaScript Object Notation for Linked Data**, là một phương thức mã hóa dữ liệu liên kết sử dụng JSON

Hiểu đơn giản thì đây là sự kết hợp của **JSON** và **LD (Linked Data)**:
- **JSON**: cái này thì chắc anh em cũng khá quen rồi, đây là một định dạng trao đổi dữ liệu nhẹ, dễ hiểu đối với người dùng và cũng dễ phân tích, khởi tạo đối với máy tính.
- **Linked Data**: hiểu đơn giản là dữ liệu có cấu trúc cho website của bạn.

**JSON-LD** là một cách mới để thể hiện dữ liệu của trang web cho `Search Engine` biết, và nó cũng dựa trên một bộ quy tắc chung (để đồng nhất dữ liệu cấu trúc cho các trang web) được tạo ra bởi sự hợp tác của các ông lớn như Google, Yahoo, Bing, đó chính là  [Schema.org](https://schema.org).

<div align="center">
    
### Khai báo, sử dụng JSON-LD như thế nào?
    
</div>

Trong một website, JSON-LD thường được khai báo vào trong thẻ `<head>`, tuy nhiên nếu để trong thẻ `<body>` thì `Search Engine` vẫn có thể nhận được.

Đặc điểm nhận dạng của JSON-LD là được đặt trong một đoạn `script` ví dụ như sau:
```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "http://www.example.com",
  "name": "Unlimited Ball Bearings Corp.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-401-555-1212",
    "contactType": "Customer service"
  }
}
</script>
```

Trong đó:
- `type="application/ld+json`: khai báo cho trình duyệt biết được rằng đây là đoạn json-ld, và như đã nói ở trên thì phần script này thường được để ở trong thẻ `<head>`
- `@context`:  khai báo bộ quy tắc được sử dụng để viết đoạn json-ld này (trong ví dụ này là https://schema.org)
- `@type`: phân loại nội dung trang web, như trong ví dụ trên là Organization, ngoài ra còn một số type khác như Person/Product/Place/... (danh sách cụ thể các bạn có thể xem ở [đây](https://schema.org/docs/full.html))
- Tiếp theo là các cặp `"attribute":"value"` để chú thích thêm thông tin cho trang web:
    - **attribute**: các thuộc tính được đặt trong dấu `""` tương ứng với `@type` mà bạn đã khai báo ở trên, hãy nhớ tìm hiểu kĩ phân loại trang web của bạn có những thuộc tính gì nhé.
    - **value**: giá trị này cũng được đặt trong dấu `""`, ngoài ra, nếu một attribute có nhiều value thì có thể sử dụng dấu `[]` để khai báo.
<div align="center">
    
# Lời kết
    
</div>

Qua bài viết này, hi vọng các bạn đã có thể đã nắm được kiến thức về SEO nói chung và JSON-LD nói riêng. Và hãy nhớ rằng JSON-LD chỉ là 1 phần để SEO website thôi nhé. Để SEO được một website, hãy tự mình tìm hiểu thêm nữa nhé, chúc các bạn thành công!

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- https://developers.google.com/search/docs/guides/intro-structured-data?hl=vi
- https://schema.org/ ([github](https://github.com/schemaorg/schemaorg))
- https://json-ld.org/