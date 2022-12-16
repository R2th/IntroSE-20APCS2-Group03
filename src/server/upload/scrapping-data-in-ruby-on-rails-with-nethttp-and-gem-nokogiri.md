# 1. Data Scrapping là gì và tại sao lại sử dụng data scrapping:
- Data scrapping là quá trình lấy lấy data từ web để con người có thể đọc được và sử dụng được.
- Data scrapping được sử dụng khi chúng ta cần lấy data từ web nhưng không được cung cấp API hay RSS feed.

# 2. Cách thực hiện:
- Trong bài viết lần này mình sẽ thực hiện truy cập [Galaxy Cinema](https://www.galaxycine.vn) và lấy data về các phim đang được chiếu và sắp chiếu trên hệ thống của Galaxy Cinema.
- Mình sẽ sử dụng 2 công cụ hỗ trợ là [Net::HTTP](https://ruby-doc.org/stdlib-2.5.3/libdoc/net/http/rdoc/Net/HTTP.html) và gem [Nokogiri](https://github.com/sparklemotion/nokogiri).
## a. Net::HTTP:
- Mình dùng`Net::HTTP` để lấy HTML của URL `https://www.galaxycine.vn/phim-dang-chieu`.
- Kết quả thu được là 1 chuỗi HTML có nội dung dương tự URL `view-source:https://www.galaxycine.vn/phim-dang-chieu`.
    ```ruby
    require "net/http"
    movies_html = Net::HTTP.get URI("https://www.galaxycine.vn/phim-dang-chieu")
    ```
## b. Nokogiri:
- Mình dùng `Nokogiri` để đọc HTML trả về và lấy data, sử dụng css selector.
- Giới thiệu qua 1 chút về `Nokogiri`:  Nokogiri (鋸) là một thư viện ruby cung cấp các phương thức đọc các file HTML, XML, SAX sử dụng XPath hoặc CSS Selector. 
- Tham khảo thêm cách sử dụng `Nokogori` tại [đây](https://github.com/sparklemotion/nokogiri/wiki/Cheat-sheet).
- Trong bài viết này mình sẽ lấy ví dụ về cách đọc file HTML sử dụng CSS Selector.
- Sau khi lấy được chuỗi html cần đọc, khởi tạo 1 đối tượng của class `Nokogiri::HTML::Document`.
    ```ruby
    movies_doc = Nokogiri::HTML movies_html
    ```
- Câu lệnh truy vấn data của `Nokogori` có dạng 
    ```ruby
    movies_doc.css("css_selector_1").css("css_selector_2")
    ```
 - Hàm `css("css_selector")` trả về 1 đối tượng của class `Nokogiri::XML::NodeSet` cũng là 1 instance của `Enumerable`.
 - Do đó có thể sử dụng các hàm `each`, `first`, `last` như với `Array` với đối tượng của class `Nokogiri::XML::NodeSet`.
 - Có thể hình dung `Nokogiri::XML::NodeSet` là 1 array của `Nokogiri::XML::Element`.
    ```
    movies_doc.css(".watchmovie-item").each_with_index do |movie, index|
        movie.css(".article-watchmovie").css("a").first
    end
    ```
 - Đối với đối tượng của class `Nokogiri::XML::Element` để lấy text của thẻ html ta có thể sử dụng hàm `.text()`, để lấy các attribute của thẻ html ta có thể sử dụng hàm `.attr("attribute-name")`.
    ```ruby
    movie_link = movie.css(".article-watchmovie").css("a").first.attr("href")
    title = movie_doc.css(".details").css(".detail-title").first.text
    ```
- Bạn có thể tham khảo đoạn code mẫu tại [đây](https://github.com/LeTanThanh/rails_scrapping_with_nokogiri/blob/master/db/seeds.rb).
- Trong đoạn code trên mình đã sử dụng `Net::HTTP` và `Nokogori` để scrap data và `activerecord-import` để import data vào database và hiển thị lên browser.
![](https://images.viblo.asia/23504475-112c-45ea-9ca1-757f31c1db85.png)
- Trong thực tế bạn có thể sử dụng scrap data để tạo cron task import và update data từ website khác vào databasa của mình.

# 3. Nhận xét:
## a. Ưu điểm:
- Cách làm này khá dễ dàng, không cần phụ thuộc vào API hoặc RSS của bên thứ 3.
## b. Khuyết điểm:
- Cách làm này phụ thuộc khá nhiều vào CSS Selector do đó chỉ cần bên thứ 3 thay đổi CSS Selector thì phải viết lại.
- Do đó cần viết sao cho càng ít phụ thuộc vào CSS Selector càng tốt. 

# 4. Link tham khảo:
- Demo: https://github.com/LeTanThanh/rails_scrapping_with_nokogiri
- Net::HTTP: https://ruby-doc.org/stdlib-2.6.2/libdoc/net/http/rdoc/Net/HTTP.html
- Nokogiri: https://github.com/sparklemotion/nokogiri