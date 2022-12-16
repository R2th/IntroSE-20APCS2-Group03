# Mở đầu
Ok, trước khi bắt đầu, bạn cần có một chút kiến thức về SEO để hiểu những thứ bên dưới. Trước hết, có nhiều cách để cho Google và các search engines khác biết thông tin về trang web của bạn. Theo định kì các search engines sẽ ghé thăm trang web của bạn, nó sẽ chạy từ page này qua page khác để đọc dữ liệu, tìm hiểu xem trang web của bạn là gì, có những content gì, tiêu đề của content, nội dung của content, nếu là trang web bán hàng, nó sẽ xem sản phẩm tên gì, thuộc loại sản phẩm nào, giá bao nhiêu, sản xuất ở đâu,...v.v.
Việc này có thể gây mất nhiều thời gian và có thể search engines đọc sai/không đủ thông tin về trang web của bạn, khiến search engines đánh độ ưu tiên trang web của bạn sai.

Vậy thì thay vì phải mất thời gian đọc qua lần lượt từ đầu như thế, tại sao chúng ta không cung cấp cho search engines luôn dữ liệu về trang web của chúng ta khi search engines ghé thăm, như thế sẽ tiết kiệm thời gian cũng như cung cấp được thông tin chính xác nhất cho search engines.

JSON-LD là một cách (tương đối) mới để thể hiện dữ liệu về nội dung của bạn với search engines. Nó đi kèm với một vài lợi ích chính, ok cùng bắt đầu nào.

# JSON-LD là gì?
> JSON-LD là viết tắt của **J**ava**S**cript **O**bject **N**otation for **L**inked **D**ata, là một phương thức mã hóa dữ liệu liên kết sử dụng JSON ([Wikipedia](https://en.wikipedia.org/wiki/JSON-LD))

<br>


[JSON](http://json.org/) là một định dạng trao đổi dữ liệu nhẹ, dễ đọc và viết đối với con người và dễ phân tích và khởi tạo đối với máy tính.


[Linked Data](http://linkeddata.org/) là cách sử dụng internet để kết nối các dữ liệu có liên quan

JSON-LD là kết hợp của cả hai thứ trên. Nó sẽ là một đoạn code cho bạn biết sản phẩm nào có giá thế nào, hoặc zip code này thuộc về công ty nào... Về cơ bản, bạn sẽ cung cấp một đoạn mã Javascript nhỏ có tất cả thông tin trên.

Nó là một cách định dạng cho dữ liệu tương tự có cấu trúc với [Microdata](https://en.wikipedia.org/wiki/Microdata_(HTML)) and [RDFa](https://en.wikipedia.org/wiki/RDFa). Về cơ bản, theo điều khoản của SEO, JSON-LD là thể hiện bộ từ vựng của [Schema.org](https://schema.org/), với sự đồng hợp tác của Google, Bing, Yahoo và Yandex từ năm 2011 để tạo ra một bộ từ điển đồng nhất dữ liệu cấu trúc cho các trang web. (Tuy nhiên, Bing và các search engines khác không chính thức công bố sự hỗ trợ đối với JSON-LD).

# Schema.org là gì?

Ok chúng ta đã nói về Schema.org, vậy nó là cái gì? Thứ chúng ta đang nói tới ở đây là dữ liệu có cấu trúc cho trang web của bạn. Schema.org cung cấp những cách thể hiện thông tin của bạn với Google theo một cách mà máy tính có thể đọc được. Với dữ liệu có cấu trúc, bạn tạo ra các lựa chọn cho Google để thể hiện content của bạn theo ba loại Google Search:

- *Rick results*: Các nội dung được thêm vào của bạn, như giá của sản phẩm, xếp hạng và sự khả dụng của sản phẩm đó, được hiển thị chính xác trong kết quả tìm kiếm dưới dạng thông tin bổ sung trong snippet của bạn.

![](https://images.viblo.asia/4765067e-334e-4c1f-83c3-493c93bf18cd.png)

- *Site links search boxes*: Nếu trang web của bạn đủ điều kiện, bạn có thể tiến hành search content của trang web của bạn từ chính trang tìm kiếm.

![](https://images.viblo.asia/e471a0b8-bf10-450f-94b4-5c8385b9f699.png)

- *Knowledge Graph cards*: Cái này khó hơn một chút, vì bạn sẽ phải chứng minh trước tiên rằng bạn là người có thẩm quyền đối với một số nội dung nhất định. Sau khi bạn đã làm như vậy, Google có thể đưa dữ liệu của bạn vào *Knowledge Graph cards*.

![](https://images.viblo.asia/d3746655-b9b3-46bf-b41a-fed69fa73736.jpg)


# Tại sao phải sử dụng JSON-LD?
Các phương thức từng được sử dụng để triển khai schema.org trước khi JSON-LD xuất hiện thì rất cồng kềnh. Bạn phải thêm các thuộc tính schema.org vào các đoạn mã trong markup của bạn. Markup có thể phải thay đổi từ trang này sang trang khác, mặc dù bạn đã gắn cùng một header ở mọi nơi. Điều này làm cho schema.org tốn rất nhiều công sức để thực hiện.

JSON-LD cho phép bạn thu thập tất cả dữ liệu về sản phẩm của bạn và hiển thị chúng trong một đoạn mã JavaScript nhỏ, có thể được đẩy vào trang ở bất kì chỗ nào. Điều này cho phép bạn làm việc trên schema.org sử dụng JSON-LD độc lập với sự phát triển trang web của bạn.

Trên thực tế, trong document của mình, Google thường tuyên bố JSON-LD là cách dễ nhất để thêm siêu dữ liệu vào các trang web. Nó là lựa chọn mà ít có khả năng bị "hỏng" nhất khi bạn thực hiện các thay đổi với trang web của mình.


# JSON-LD có tác dụng gì?

JSON-LD chú thích các phần tử trên một trang, cấu trúc các dữ liệu, những thứ mà các công cụ tìm kiếm có thể sử dụng để định hướng các phần tử và thiết lập các thông tin xung quanh các thực thể, điều này liên quan đến việc tạo ra tổng thể một website tốt hơn, có tổ chức hơn.

> Dữ liệu rất lộn xộn và không liên kết. JSON-LD tổ chức và kết nối chúng, tạo ra một Web tốt hơn.
 
![](https://images.viblo.asia/3ad6e7ba-0a76-4581-9c6a-72a530e4b8dd.png)


# JSON-LD nằm ở đâu trong trang HTML?


Google đề xuất bạn nên thêm JSON-LD vào phần **\<head>**   của HTML. Tuy nhiên, vẫn ổn nếu JSON-LD nằm trong phần **\<body>**. Google cũng có thể nắm bắt các thẻ được tạo trong DOM. Tóm lại là nó nằm ở đâu Google cũng có thể nhận được =))

#     Phân tích JSON-LD

Ví dụ một đoạn JSON-LD đầy đủ:
```js
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
### Các thẻ không thay đổi

```js
<script type="application/ld+json">
{
...
}
</script>
```

Khi bạn thấy JSON-LD, thứ đầu tiên bạn sẽ luôn thấy là thẻ \<script>. Thẻ \<script> có thuộc tính type cho biết: "Hey trình duyệt, tôi đang gọi JavaScript có chứa JSON-LD."

*Lưu ý: JSON-LD của bạn phải được đặt trong dấu ngoặc nhọn.*

```js
"@context": "http://schema.org/",
```

Phần tử thứ hai giữ vị trí cố định trong markup JSON-LD là @context với giá trị là `http://schema.org`. @Context nói: "Hey trình duyệt, đây là từ vựng tôi tham khảo. Bạn có thể tìm thấy nó tại http://schema.org". Lợi ích cho SEO là chúng ta có thể sử dụng bất kỳ loại và thuộc tính nào mà Schema.org định nghĩa.

```js
"@Type": "…",
```

Phần tử cuối cùng trong nhóm copy/paste JSON-LD Schema là đặc tả @type ( sau dấu hai chấm sẽ là chú thích dữ liệu). @type chỉ định loại danh mục được đánh dấu. Bạn có thể tìm thấy một danh sách tất cả các loại danh mục tại: https://schema.org/docs/full.html.

Ví dụ: `"@type": "Person",` 

@type nói rằng: "Hey, tôi đang sử dụng loại danh mục Person (Bạn có thể tìm thấy tại http://schema.org/Person)". Thật vậy, nếu bạn nhập URL vào trình duyệt, document của loại danh mục và thông số kỹ thuật sẽ xuất hiện, bao gồm mọi thuộc tính danh mục (và thường là một số trường hợp sử dụng ví dụ).

### Các cặp Attribute-value
Bước tiếp theo là chú thích thông tin về loại danh mục. Bạn có thể tìm thấy các thuộc tính trong trang Schema.org.

1. Attribute: Các thuộc tính xuất phát từ bộ từ vựng của Schema.org và phải được đặt trong cặp nháy kép, và phải thuộc về thuộc tính được cho phép trong loại danh mục đó.
2. Value: Giá trị tương ứng với thuộc tính. String (kí tự) và URL cần đặt trong cặp ngoặc kép. Số (int, float hoặc double) thì bản thân nó không cần ngoặc kép, tuy nhiên đặt chúng vào cặp ngoặc kép vẫn ok (điều này có nghĩa là chúng sẽ được coi như dạng dữ liệu *string*)

![](https://images.viblo.asia/ac61279b-87a4-4a2f-bb0a-3328e7ea086b.png)

### Ngoặc vuông
Dấu ngoặc vuông tồn tại cho các tình huống có nhiều giá trị cho thuộc tính. Một cách sử dụng phổ biến là tận dụng thuộc tính *sameAs* như sử dụng *[dấu ngoặc vuông]* để liệt kê nhiều nền tảng truyền thông.![](https://images.viblo.asia/9248d713-d727-4ce0-bb9b-92d831df7852.png)
![](https://images.viblo.asia/a25f0c51-1aca-4b82-a285-506a49ee33bd.png)

*Lưu ý: Không có dấu phẩy sau phần tử cuối cùng trong ngoặc vuông. Điều này chỉ ra rằng không có thêm thông tin trong dấu ngoặc vuông.*


# Thêm JSON-LD vào website

Bạn có thể sử dụng bất kỳ thuộc tính schema.org nào vào trong JSON-LD. Bạn có thể tìm thấy một danh sách tất cả các loại danh mục và thuộc tính liên quan tại: https://schema.org/docs/full.html. Sau khi thêm script JSON-LD mới vào trang web của bạn, hãy đảm bảo xác thực code của bạn bằng [công cụ kiểm tra dữ liệu có cấu trúc của Google](https://search.google.com/structured-data/testing-tool/u/0/). Ở đây bạn có thể kiểm tra xem đoạn code của bạn đã chính xác cấu trúc hay chưa.


Ngoài ra còn có một cách đơn giản hơn là sử dụng các template có sẵn ([ví dụ như cái này](https://www.schemaapp.com/tools/jsonld-schema-generator/)) để tạo đoạn script nhanh hơn với các danh mục được liệt kê sẵn. Nếu bạn đang sử dụng WordPress, có rất nhiều [plugin](https://wordpress.org/plugins/tags/json-ld/) có thể giúp các bạn thêm đoạn JSON-LD trong 1 nốt nhạc.

# Tổng kết
Trên đây là những kinh nghiệm của mình khi sử dụng JSON-LD, trong khuôn khổ bài viết chỉ mang tính giới thiệu và phân tích về JSON-LD, về cách sử dụng các bạn có thể thực hành bằng cách sử dụng thử các danh mục thuộc tính tại  https://schema.org/docs/full.html và test lại với  [công cụ kiểm tra dữ liệu có cấu trúc của Google](https://search.google.com/structured-data/testing-tool/u/0/).