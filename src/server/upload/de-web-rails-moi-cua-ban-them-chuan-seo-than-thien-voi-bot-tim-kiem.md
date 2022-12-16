Khi tạo một website Rails mới, cần làm gì để **chuẩn SEO**? Làm thế nào để website Rails **thân thiện với các Search Engine** và dễ dàng cho các công cụ tìm kiếm lập chỉ mục? Hỗ trợ tốt nhất để website có **thứ hạng cao trên các công cụ tìm kiếm**?

## Mở đầu
Do khởi điểm là 1 SEO-er nên khi phát triển các ứng dụng web đưa ra thị trường, đối tượng người dùng của mình không giới hạn ở 1 quy mô nhỏ hay ứng dụng nội bộ sử dụng nên mình luôn đòi hỏi các ứng dụng web do mình phát triển phải luôn thân thiện với BOT của các công cụ tìm kiếm để mình có cơ sở SEO tốt hơn. 


Trước đây, khi tiếp cận với các Single App như Reactjs hay Vuejs, Angular, mình luôn tìm kiếm các Framework của chúng để có thể Server-side rendering. Các mã html phải được thể hiện ra 1 cách cụ thể nhất, giúp các BOT Search Engine đọc dễ dàng nhất. 


Tất nhiên khi phát triển **rails app** thì các bạn không cần phải lo về vấn đề này, tuy nhiên trong các chuẩn mực tối thiểu của SEO, ngoài những khái niệm chuyên sâu trong SEO thì website của bạn phải bảo đảm có cấu trúc cơ bản tốt để giúp các BOT hiểu rõ nội dung nó đang crawl là dễ, hỗ trợ Google index các nội dung một cách tốt nhất.

## Tại sao Website cần chuẩn SEO?


**Vì bạn có thể hiểu rằng, hầu hết mọi trang website hiện nay các nguồn truy cập đến từ:**

1. **Search** ( Tức là website các bạn xuất hiện khi người dùng search từ khoá trên các công cụ tìm kiếm, sau đó người dùng click vào để xem)
2. **Direct** (Có nghĩa là người dùng họ nhớ Domain của bạn và gõ trực tiếp địa chỉ để vào)
3. **Referral** (Họ truy cập website bạn từ các link ở website khác trỏ tới)
4. **Social** (Họ truy cập website bạn từ các link được sharing trên các MXH)
5. **Mail** (Họ truy cập website bạn từ các link ở Mail)

Và theo thống kê thì hấu hết lượng truy cập các website đến từ Search hay chính những người lập nên các website đó luôn muốn tìm cách đẩy mạnh các nguồn traffic đến website thông qua Search. Và tất nhiên SEO chính là cách giúp bạn đạt được điều này.

Để có thể hiểu thêm 1 chút thì các bạn có thể tham khảo thêm bài phân tích này!
https://growthbadger.com/traffic-study/

Do đó, nếu bạn đang build một trang web và muốn phổ biến chúng trên internet . **Đây là những bước cơ bản các bạn nên làm ngay từ đầu cho website của bạn**

**Lưu ý:**

*Trong kiến thức về SEO, nó vô cùng rộng và có nhiều phe pháí, chiến tuyến khác nhau. Để một website, bài viết có thứ hạng cao trên các công cụ tìm kiếm (tiêu biểu như Google, Yahoo, hay ping) thì đòi hỏi rất nhiều kỹ thuật khác nhau, không thể trả lời bằng 1, 2 câu cơ bản.
Tuy nhiên, có những yêu cầu đã trở thành Offical Document của Google mà đa phần người tiếp xúc với SEO đều biết và thực hiện. Trong bài viết này sẽ đề cập đến một vài trong số chúng, nó bắt đầu từ chính người tạo nên website, cấu trúc của website đó.*

## Các bước nên làm ngay từ đầu giúp Rails app có cấu trúc chuẩn SEO

### 1. Tạo cấu trúc URL thân thiện cho Rails app

Không cần phải nói nhiều, cấu trúc Link chính là phần quan trọng của website, mỗi Link giống như là một đường đi vậy. Và link thì nên cố định cấu trúc ngay từ đầu, không bao giờ cùng một nội dung mà tồn tại 2 link khác nhau.

**Trong SEO:**

Một URL với ID: `http://domain.com/post/1`


Và 1 URL như thế này: `http://domain.com/post/cach-lam-web-rails-chuan-seo`

Thì rõ ràng, URL sau là điều bạn cần hướng đến để làm được. Bởi nó sẽ luôn thân thiện hơn với các công cụ tìm kiếm và tốt cho SEO hơn, là điểm cộng cho Website của bạn vì URL cũng đã thể hiện được được nội dung LINK đó sẽ có nội dung gì. Và theo kinh nghiệm cá nhân mình thì URL cũng không được quá dài, càng ngắn càng tốt nhưng phải thể hiện được đủ ý nghĩa.

Để làm được điều này, lúc phát triển ứng dụng, bạn nên lưu lại 1 trường để làm URL sau này.

Ví dụ là slug chẳng hạn, render chúng từ title. Và sau này thay vì `find_by id: params[:id]` thì bạn sẽ `find_by slug: params[:slug] `đó. Hoặc nên bổ sung chức năng cho người dùng custom lại URL này thay vì là đang render tự động.

| ID | title | slug |
| ------ | ------ | ------
| 1 | Để web Rails mới của bạn thêm chuẩn SEO, thân thiện với Bot tìm kiếm| cach-lam-web-rails-chuan-seo |

Nếu backend bạn đang sử dụng Rails thì có 1 GEM giúp bạn làm điều đó 1 cách dễ dàng chính là https://github.com/norman/friendly_id

Tuy nhiên trong quá trình sử dụng, mình nhận thấy nếu chỉ sử dụng `gem friendly_id` thì nó đang covert title UTF8 (có dấu tiếng Việt) sang không dấu đang không được goog lắm, hay bị mất chữ hoặc sai một số từ. Do đó mà mình kết hợp sử dụng thêm `gem stringex` để sử dụng method `to_url` của nó hỗ trợ convert từ string name UTF8 thành slug không dấu

File model sử dụng slug của mình sẽ trông giống như này
```
  extend FriendlyId

  friendly_id :name, use: %i(slugged finders)

 def should_generate_new_friendly_id?
    will_save_change_to_name? || super
  end

  def normalize_friendly_id input
    input.to_s.to_url
  end
```

### 3. Tạo sitemap cho ứng dụng Rails
**Nếu bạn chưa biết Sitemap là gì thì nói 1 cách dễ hiểu thì Sitemap chính là bản đồ cho trang web của bạn**. Khi đến 1 địa điểm nào đó mới, rõ ràng có "tấm bản đồ" trong tay thì lúc nào bạn cũng sẽ biết rõ đường đi và đi nhanh hơn phải không?
![S](https://writemaps.com/blog/wp-content/uploads/2018/07/Google-Screenshot_2018-07-16_11.26.59.png)

Và sitemap của website nó chính là tấm bản đồ đó. Sitemap có định đạng XML, được các công cụ tìm kiếm sử dụng để thu nhập thông tin của 1 website, để các công cụ đó biết 1 cách nhanh chóng rằng có những URL nào trên website của bạn để các BOT call thông tin và lập chỉ mục một cách nhanh chóng hơn.

**Và khi sử dụng rails, làm thế nào để có thể tạo Sitemap tự động cho ứng dụng của mình?**

Có 1 cách nhanh nhất đó là sử dụng **Gem sitemap_generator** https://github.com/kjvarga/sitemap_generator này.
Sau khi có được file sitemap thì tiến hành submit nó thông qua Google console

![S](https://www.upsieutoc.com/images/2021/01/19/submit-sitemap-google.png)

Gem này bên cạnh việc render sitemap cho web rails thì nó cũng đã tự động **ping sitemap** đến các công cụ tìm kiếm rồi. Hoặc nếu thích bạn có thể làm thủ công bằng cách

> - Với Google
> http://www.google.com/webmasters/sitemaps/ping?sitemap=http://www.domain.com/sitemap.xml
> 
> - Với yahoo:
> http://search.yahooapis.com/SiteExplorerService/V1/updateNotification?appid=YahooDemo&url=http://www.domain.com/sitemap.xml
> 
> - Với Ping
> http://www.bing.com/webmaster/ping.aspx?siteMap=http://www.domain.com/sitemap.xml

Đây là cách mà các bạn thông báo cho các công cụ tìm kiếm rằng sitemap của các bạn đã có thay đổi và BOT nên "ghé thăm" lại sitemap ngay lúc đó.

###  4. Tạo breadcrumb cho các Link

Theo định nghĩa

> **Breadcrumbs** là một đường dẫn anchor text, thường nằm ở đầu trang. Đường dẫn anchor text này giúp người truy cập website dễ dàng biết được họ đang ở đâu, và các Breadcrumbs này có thể nhấp vào để có thể quay về trang trước cấp cao hơn
> 
Nó không chỉ có tác dụng trong việc điều hướng, nâng cao trải nghiệm người dùng, thuận tiện hơn trong việc di chuyển giữa các cấp trong website mà trong SEO nó cung cấp cho các Search Engine một cách khái quát để nhanh chóng hiểu cấu trúc của website. 
Đồng thời khi sử dụng kết hợp cấu trúc schema **BreadcrumbList** (https://schema.org/BreadcrumbList) chúng ta có thể dễ dàng hiển thị một kết quả đẹp trên google, kết quả tìm kiếm của bạn sẽ trở nên hấp dẫn hơn nhiều đối với người tìm kiếm (Thay vì hiển thị ở dạng link thì có thể hiển thị theo phân cấp như sau)

![S](https://gtvseo.com/wp-content/uploads/2020/10/breadcrumb-wordpress.jpg)

Để làm được điều này, các bạn cần tạo 1 cấu trúc phân cấp cho website của bạn. Nếu là bài viết thì nên phân chia nó vào các chuyên mục.

Trong Rails, các bạn có thể sử dụng **gem Ancestry** ( https://github.com/stefankroes/ancestry ) để tạo các cây chuyên mục dạng phân cấp. Từ đó có thể render ra các breadcrumb.

###  5. Thêm các thẻ metadata

Các thẻ metadata ( meta tag, openGraph) sẽ giúp các công cụ tìm kiếm (crawlers) hiểu và index các nội dung trên các trang của bạn một cách chính xác nhất. Mặc định một ứng dụng Rails thì thường chỉ có thẻ titlte để hiển thị trên thanh trình duyệt. Các BOT cũng đủ sự thông mình nên khi hiển thị các bài viết đó trên các kết quả thì sẽ lấy title này và một số đoạn trong nội dung bài viết làm description. 

Và điều chúng ta nên làm đó là chèn thêm các thẻ meta quan trọng cần có khác như **meta desciption tag** hay **title tag** thông qua việc chèn vào header tương ứng của các pages.

Các bạn có thẻ để ý thấy là Viblo gần đây cũng đã update chức năng này. Nó cho phép mình tùy chỉnh meta title, description khác với title bài viết. ( Tuy nhiên với URL thì nó chưa cho custom đâu )
![Custom meta desciption tag, titlte tag](https://www.upsieutoc.com/images/2021/01/19/custom-meta.png)

Và trong rails, để có thể cấu hình 1 cách đầy đủ và chính xác, dễ dàng nhất cho từng URL và trang web. Các bạn có thể sử dụng **gem meta-tags** https://github.com/kpumuk/meta-tags

## Kết luận
Mình hi vọng bài viết này sẽ mang đến cho các bạn Dev một số thông tin hữu ích. Đây là những kiến thức về SEO cơ bản nhất nên hi vọng các bạn có thể áp dụng ngay từ lúc phát triển ứng dụng để giúp cho cấu trúc website của bạn thân thiện với các công cụ tìm kiếm.

Nếu có bất kỳ câu hỏi nào liên quan đến bài viết nói riêng hoặc SEO, các bạn có thể để lại một bình luận, mình sẽ trả lời nếu trong khả năng. Cám ơn các bạn !