## Tìm hiểu breadcrumb
**Breadcrumb** được coi là một công cụ hữu ích và đóng vai trò quan trọng trên các website. Nó cho biết vị trí của trang trong hệ thống phân cấp trên trang web, hỗ trợ nhà phát triển web có thể dễ dàng điều hướng tới nhiều đường dẫn trong hệ thống phân cấp trang cùng một lúc. 

Việc sử dụng công cụ điều hướng nhỏ ngày giúp người dùng biết được họ đang ở đâu trên trang web của bạn. Ngoài ra, chúng cũng giúp các **bot của Google** hiểu rõ hơn về cấu trúc trang web của bạn.

Tuy nhiên, không phải trang web nào đều triển khai và các nhà phát triển nào cũng hiểu rõ về những tác động, lợi ích của nhặt nhưng cần thiết của nó đối với việc hiển thị thứ hạng SEO trên website.

Trong bài viết này, tôi sẽ nói rõ hơn về các loại breadcrumb khác nhau, những ưu và nhược điểm của chúng cũng như tác động của chúng lên thứ hạng tìm kiếm của một trang web.
## Các loại breabcrumb cơ bản
Breadcrumb thường nằm ở đầu trang, giữa thanh điều hướng trên cùng và dòng tiêu đề nội dung. Chúng bao gồm một tập hợp các liên kết, bắt đầu từ cấp cao nhất của trang web tới một cấp nhỏ hơn. Ví dụ:

![](https://images.viblo.asia/4ac21f3d-5227-43fb-a030-634062460233.png)

Có thể là các loại đường dẫn dựa theo:

**Cấu trúc phân cấp cơ bản:**
> **Trang chủ › Nội thất › Bàn › Bàn trà**

**Các thuộc tính cơ bản:**
> Trang chủ › Nội thất › Bàn › Bàn trà > **Color > Size**

**Lịch sử truy cập trên trang:**
> **< Quay lại** | Trang chủ › Nội thất › Bàn › Bàn trà

## Lợi ích của breadcrumb
* **Giảm tỉ lệ thoát trang**: 
Breadcrumb có thể giảm tỷ lệ thoát trang vì website của bạn đang cung cấp cho người dùng truy cập xem các đường dẫn liên kết tới các chỉ mục hoặc chủ đề liên quan và lôi kéo họ khám phá trang web.
* **Nâng cao trải nghiệm người dùng**: Việc sử dụng breadcrumb cung cấp cho người dùng dễ dàng điều hướng đến các trang liên quan chỉ với một cú nhấp chuột thay vì phải nhấn "Quay lại" trên trình duyệt. Hơn nữa, Google có thể hiển thị đường dẫn đường dẫn của bạn trong kết quả tìm kiếm, làm cho liên kết của bạn hấp dẫn hơn với người dùng. Chúng sẽ giúp người dùng tìm kiếm với các gợi ý liên quan đến kết quả tìm kiếm của bạn. 

![](https://images.viblo.asia/b7349ac2-93d3-4705-a56a-91bbbb036450.png)
* **Tác động tích cực trên công cụ tìm kiếm Google**: Công cụ tìm kiếm Google sẽ đánh giá cao khi website sử dụng Breadcrumb. Google sẽ coi nó là một công cụ nâng cao có thể ảnh hưởng tích cực đến thứ hạng hiển thị trang web của bạn.

## Làm sao để thêm Breadcrumb Search
### Định nghĩa cấu trúc dữ liệu

Google Search sẽ nhận ra các thuộc tính của **BreadcrumbList**. Bạn phải bao gồm các thuộc tính bắt buộc để nội dung của mình đủ điều kiện hiển thị dưới dạng kết quả chi tiết. Các thuộc tính dữ liệu được định nghĩa bởi [schema.org BreadcrumbList](https://schema.org/BreadcrumbList).


| Thuộc tính yêu cầu  |  Mô tả |
| -------- | -------- |
| **item**     | Đường dẫn liên kết trên trang web.     |
| **name**     | Tiêu đề của đường dẫn được hiển thị cho người dùng.     |
| **position**     | Vị trí của đường dẫn khi hiển thị. Sắp xếp từ nhỏ đến lớn.     |

### Hướng dẫn thêm Breadcrumb

Ví dụ trên HTML, breadcrumb thường có cấu trúc:
```
<ol class="breadcrumbs">
  <li>
    <a href="http://www.example.com/books">Books</a>
  </li>
  <li>
    <a href="http://www.example.com/sciencefiction">Science Fiction</a>
  </li>
  <li>
    <a href="http://www.example.com/books/sciencefiction/awardwinners">Award Winners</a>
  </li>
<ol>
```
Kết quả hiển trị trên website của bạn sẽ có dạng: 
> **Books › Science Fiction › Award Winners**

Vậy để hiển thị trên kết quả tìm kiếm Goolge chúng ta có thể thực hiện theo các cách sau:

**Cách 1:** Thêm một đoạn code **JSON-LD**:
```
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Books",
    "item": "https://example.com/books"
  },
  {
    "@type": "ListItem",
    "position": 2,
    "name": "Science Fiction",
    "item": "https://example.com/sciencefiction"
  },
  {
    "@type": "ListItem",
    "position": 3,
    "name": "Award Winners",
    "item": "https://example.com/books/sciencefiction/awardwinners"
  }]
}
</script>
```


**Cách 2**: Chuyển đổi HTML breadcrumb của bạn theo cấu trúc **RDFa**:
```
<ol vocab="http://schema.org/" typeof="BreadcrumbList">
  <li property="itemListElement" typeof="ListItem">
    <a property="item" typeof="WebPage"
        href="https://example.com/books">
      <span property="name">Books</span></a>
    <meta property="position" content="1">
  </li>
  ›
  <li property="itemListElement" typeof="ListItem">
    <a property="item" typeof="WebPage"
        href="https://example.com/books/sciencefiction">
      <span property="name">Science Fiction</span></a>
    <meta property="position" content="2">
  </li>
  ›
  <li property="itemListElement" typeof="ListItem">
    <a property="item" typeof="WebPage"
        href="https://example.com/books/sciencefiction/awardwinnders">
      <span property="name">Award Winners</span></a>
    <meta property="position" content="3">
  </li>
</ol>
```

**Cách 3**: Chuyển đổi HTML breadcrumb của bạn theo cấu trúc **Microdata**:
```
<ol itemscope itemtype="http://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope
      itemtype="http://schema.org/ListItem">
    <a itemtype="http://schema.org/Thing"
       itemprop="item" href="https://example.com/books">
        <span itemprop="name">Books</span></a>
    <meta itemprop="position" content="1" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope
      itemtype="http://schema.org/ListItem">
    <a itemtype="http://schema.org/Thing"
       itemprop="item" href="https://example.com/books/sciencefiction">
      <span itemprop="name">Science Fiction</span></a>
    <meta itemprop="position" content="2" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope
      itemtype="http://schema.org/ListItem">
    <a itemtype="http://schema.org/Thing"
       itemprop="item" href="https://example.com/books/sciencefiction/ancillaryjustice">
      <span itemprop="name">Ancillary Justice</span></a>
    <meta itemprop="position" content="3" />
  </li>
</ol>
```
 Sau khi thêm vào đoạn code trên, chúng ta có thể kiểm tra lại cấu trúc đường dẫn của mình đã đúng hay không bằng cách sử dụng [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool). Nó sẽ xác nhận cấu trục dữ liệu của bạn và chỉ ra các lỗi có cấu trúc không hợp lệ khiến công cụ tìm kiếm bỏ qua việc hiển thị đường dẫn của bạn.

## Một số lưu ý
* Chúng ta nên sử dụng breabcrumb search cho các trang có phân cấp từ ba cấp trở lên. Đối với các thiết bị di động nên sử dụng một con trỏ quay ngược lại đường dẫn trước đó. 
* Không liên kết đến trang hiện tại nhưng nên hiển thị nó trong breadcrumb.
* Sử dụng các ký tự đơn giản để thể hiện sự phân cấp. ví dụ: >,  /,  - , vv...
* Đặt breadcumb tại các vị trí dễ định vị như: ở đầu trang, phí trên nội dung và tiêu đề chính.
* Đảm bảo các liên kết không bị trùng lặp

Hy vọng chia sẻ trên có thể giúp trang web của bạn có thể cung cấp cho người dùng một trải nghiệm tích cực, giảm tỷ lệ thoát trang và tăng thời gian thao tác trên trang, giữ được lượng người dùng tốt. 

**Chúc các bạn thành công !**
<br><br><br>**Tham khảo chi tiết tại:**

https://developers.google.com/search/docs/data-types/breadcrumb

https://schema.org/BreadcrumbList

https://www.searchenginejournal.com/breadcrumbs-seo/255007/