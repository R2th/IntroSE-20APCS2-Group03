### Mở đầu
Một trang web được tạo ra, mục đính cao nhất đó chính là thu về traffic càng nhiều càng tốt. Bởi càng nhiều traffic, xác suất thu về đơn đặt hàng càng cao, càng nhiều traffic càng nhiều lượt tương tác quảng cáo, càng nhiều khả năng click vào link affiliate...v.v.. 

Ngoài ra lượng user đều đặn, cũng là nơi "dự trữ", đảm bảo mai mốt nếu có mở thêm dịch vụ mới, thì chúng ta cũng có thể có quyền kỳ vọng có được một lượng user nhất định nhờ những user cũ đã có. Traffic nhiều mới mong có thể gặp những vấn đề cao cấp hơn như: scale và cân bằng hệ thống, tối ưu truy vấn khi dữ liệu lớn, tối ưu trải nghiệm người dùng, dùng những dịch vụ cao cấp hơn..v.v.. chứ traffic lèo tèo thì lấy đâu ra mà tối ưu. Với cả cũng chả buồn tối ưu chi cho mệt...

Mà thôi, quay lại chủ đề bài viết. Trừ khi chúng ta có đủ nguồn tiền, hay lãi bán ra trên sản phẩm đủ lớn để đảm bảo sau khi trừ chi phí chạy adword ngày qua ngày mà vẫn có lãi thì không nói làm gì (Có tiền chạy adword lên top dễ ợt đỡ SEO chi mắc công). Còn lại thì SEO là còn đường sống còn nếu muốn lọp top google và thu về traffic...

### Những điểm mà mình note lại

Nhất là khi không dùng wordpress với nhiều plugin thuận tiện. Việc tự code lấy một trang web nhiều khi hay khiến chúng ta bỏ qua một vài điểm SEO on page cần thiết mà mình note lại dưới đây:

1. Chuẩn hóa và thống nhất giữa www và none-ww 

    Phổ biến nhất là redirect giữa www và none-www, điều này có nghĩa là `www.abc.com` và `abc.com` bị tính là hai trang khác nhau. Nguy cơ ở đây là `www.abc.com` sẽ bị tính là duplicate và ăn cắp content của `abc.com` hoặc ngược lại. 
    Cách khắc phục thì chúng ta có thể `redirect 301` về chỉ sử dụng một url chuẩn thôi, nếu dùng none-www thì redirect 301 hết những request đến www sang none-www, hoặc cách đơn giản hơn nếu không rành cấu hình phía server là sử dụng thẻ `rel="canonical"`
    ```
        <link rel="canonical" href="http://abc.com" />
    ```
    Khi render ra thì dù www hay none-www đều có thẻ này, google bot sẽ biết rằng dù `www.abc.com` hay `abc.com` thì thực chất đều là một trang... và đây cũng là cách phổ biến nhất để tránh duplicate content...
2.   Structured Data <br>
   Việc có thẻ này được google khuyển khích, phổ biến nhất ở định dạng json và có cấu trúc như dưới đây
   
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
                  },
                  ....
            }
            </script>
       ```
    
       Điều này được hiểu nôm na là, thay vì để google bot tự vào mò mẫm và tìm kiếm xem trang của chúng ta có những gì. Thì bây giờ, chúng ta có chuẩn bị sẵn một ít dữ liệu tóm lược, mời google bot vào xem qua cho đỡ mắc công. Và tất nhiên rồi, ông nào mà chả thích những thứ "có chuẩn bị trước một ít..." như vậy.
       Bạn có thể tự tạo file này bằng tay, hoặc sử dụng công cụ đánh dấu có sẵn của google [tại đây](https://search.google.com/structured-data/testing-tool/u/0/)
   
 3. Đừng nhồi keyword một cách lố bịch <br>
     Hãy để mọi thứ trông càng tự nhiên càng tốt, nhiều khi viết bài nhiều khi rập khuôn nhồi càng nhiều keyword, nhiều thẻ `h` và internal link càng tốt. Khiến bài viết hay mô tả sản phẩm trông chả ra làm sao cả. Hậu quả là seo lên top chả thấy đâu, chỉ thấy tỷ lệ bỏ trang và số trang trên mỗi phiên giảm đỏ lòm, lợi bất cập hại...
 
 4. Nhớ để thuộc tính `alt` và `title` cho thẻ image.
 
    Mặc dù vị trí hiển thị cho kết quả tìm kiếm hình ảnh, phụ thuộc nhiều vào vị trí của trang trên kết quả tìm kiếm thông thường. Nhưng việc bổ sung thuộc tính alt và title khiến công cụ tìm kiếm diễn giải và thu thập thông tin tốt hơn về việc hình ảnh của chúng ta đang mô tả và nói về cái gì. Và đặc hữu ích khi kết nối internet chậm, nguồn ảnh bị hỏng có thể giúp người dùng nắm được phần nào thông tin về ảnh cho dù thực tế có thể không nhìn thấy nó do load lỗi.
    
   5. File sitemap và robots.txt
   
       Sitemap như tên của nó - là file chứa sơ đồ trang web, giúp google dễ dàng thu thập dữ liệu và đánh index và cập nhật nội dung những trang hiện cs của bạn một cách dễ dàng hơn... Vậy nên, hãy chắc chắc bạn có một file site ở ngay sau url gốc nhé - ví dụ `https://abc.com/sitemap.xml`. 
       
       Ngoài ra, nếu bạn sử dụng laravel, thì có một [package là laravel-sitemap   ](https://github.com/Laravelium/laravel-sitemap)hỗ trợ chúng ta sinh sitemap dưới định dạng chuẩn, và sẽ tiện lợi hơn nhiều nếu tạo một cronjob sinh sitemap hằng cuối mỗi tuần ( hoặc tháng tùy vào tần suất và số lượng content mới được sinh ra) - như vậy chúng ta đỡ phải update sitemap bằng tay...<br>
       Bên cạnh file site map còn có file `robots.txt` để chỉ rõ cho google bot nên crawl và đánh index những url nào, hoặc không đánh index những url chỉ định nếu những url này không muốn hiển thị trên công cụ tìm kiếm...
   6. Meta tag <br>
    Có một   [bài viết trước đây ](https://viblo.asia/p/mot-so-meo-nho-vun-vat-giup-cai-thien-trang-web-cua-ban-ByEZkvPAKQ0) mình đã đề cập đến vấn đề này. Rằng hãy chăm chút hơn đến các thẻ meta, đặc biệt là hai thẻ meta title và description. Việc có một thẻ meta title với độ dài phù hợp và chứa keyword cần SEO là rất quan trọng. Nhưng cũng đừng quá rập khuôn về độ dài của thẻ meta title (thường được khuyến nghị độ dài từ 35 -65 ký tự). Với mình, dưới mắt một người dùng, có một chút khó chịu khi thấy thẻ title kiểu `ABC | ZYZ | BLABLALA` trông công nghiệp và nhồi nhét phát khiếp lên được. 
     
       Meta description cũng thế, mặc dù google sẽ tự động trích xuất một phần nội dung trong bài để hiển thị cho phần description trên kết quả tìm kiếm. Nhưng nó luôn lộn xộn và ngắt quãng, cách tốt hơn là khi thiết kế cơ sở dữ liệu thêm hẳn trường meta description để khi đăng bài viết, ta có thể tự tay viết phần descrtion một cách gọn gàng, sạch sẽ. Bởi việc có một thẻ description với nội dung ấn tượng sẽ góp phần khiến người dùng click vào trang của bạn từ kết quả tìm kiếm...
      
      Nhân tiện, thẻ meta keywords hiện đã bị google bỏ đi từ năm nay, và không tính là một yếu tố trong SEO, nên chúng ta không cần đến thẻ này nữa nhé...
     
   7.  Content
   
       Có câu nói rằng `content is the king !` - cho thấy content đóng vai trò quan trọng như thế nào. Hữu xạ tự nhiên hương, hãy tự sáng tạo và viết content, có thể cóp nhặt nhưng không nên copy. Một trang web với nội dung rõ ràng, phù hợp với kỳ vọng của người dùng sẽ luôn thu hút và giữ chân người dùng lâu hơn, thời lượng phiên cao hơn, tỷ lệ bỏ trang thấp hơn..v.v... 
       
       Ngoài ra, một bài viết thường nên có độ dài tối thiệu hơn 500 ký tự. Bởi lẽ nội dung càng dài, càng sẽ được đánh giá cao bởi google. Dài hơn, đồng nghĩa với việc nhiều thông tin được truyền tải đến người dùng hơn... Vậy nên, hãy luôn chăm chút content và tạo nên những [bài viết độc đáo và thú vị ](https://truyencotich.top/truyen-co-tich-viet-nam)nhé...
       
   8. Internal link
   
       Trước hết, đảm bảo tất cả internal link trong đang đều ở trạng thái response 200. Đừng để link nào bị lỗi, ngoài ra, hãy cố gắng đưa vào bài viết các internal link một cách phù hợp ( trong bài viết nhé, không tính các phần tử cố định như menu các thứ... ). Điều này giúp google hiểu hơn về cấu trúc trang của bạn, tăng khả năng index các trang trong cùng một domain -  ví dụ dễ thấy nhất là khi yêu cầu google lập chỉ mục một url ta hay thấy một hộp thoại như dưới đây:
   ![](https://images.viblo.asia/43eb1734-7243-40ca-88b2-e76980272c77.jpg)
   Google hỏi chúng ta có muốn lập chỉ mục trang này và các liên kết trực tiếp của trang này không ? Điều này có nghĩ là khi thu thập trang ABC nhưng trong trang ABC google có thấy nó internal link đến trang CDE thì nó lập chỉ mục luôn CDE. Bởi vậy, internal link giúp google đánh index các trang của chúng ta nhanh chóng và đồng đều hơn. Ngoài ra, internal link còn góp phần tăng tỷ lệ giữ chân người dùng và số trang trên mỗi phiên nữa. Bởi người dùng có khả khả năng click để đọc thêm các bài liên quan...
   
   9. Tốc độ <br>
     Đây cũng là một yếu tố ảnh hưởng đến SEO, bởi google luôn muốn mang đến người dùng những nội dung phù hợp với những gì họ tìm kiếm. Ngoài ra cũng đáp ứng tốt nhất về mặt trải nghiệm. Vậy nên hãy cố gắng nâng cao tốc độ tải trang đến mức tốt nhất có thể, bạn có thể kiểm tra tốc độ trang của mình bời công cụ có sẵn của google - [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) cả trên mobile lẫn máy tính để bàn. 
     
       Ngoài ra công cụ này còn chỉ ra những điểm bạn cần cải thiện để có thể có được tốc độ tốt hơn. Và thậm chí google còn có sẵn cả một `module` tên là [PageSpeed modules](https://developers.google.com/speed/pagespeed/module/) dành cho `Nginx` và `Apache`. Module này của google sẽ tự đống tối ưu cấu hình cho những yếu tố cần thiết...<br>
   Ngoài ra, hãy cố gắng minify các tài nguyên tĩnh như js, css đến mức bé nhất có thể. Và sử dụng những định dạng ảnh nén tốt hơn như `JPEG 2000, JPEG XR và WebP` để tiết kiệm băng thông và tải trang tốt hơn mà vẫn giữ được chất lượng ảnh đủ tốt...
   
      Nếu buộc phải sử dụng thư viện ngoài như boostrap hay wowjs, chartjs..v.v thì nên sử dụng nguồn từ CDN, nhất là các trang nhắm đến người dùng quốc tế. Bởi lẽ `trình duyệt của người dùng` mới là kẻ sẽ sẽ tìm để load file js, css về từ vị trí CDN gần nhất chứ không phải `gần nhất` giữa server và nguồn file. Vậy nên cứ down thư viện về host chung lên web chưa chắc đã tốt. Nhất là các trang nhắm đến người dùng nước ngoài... Vậy nên hãy cân nhắc điều này cho phù hợp với trang của mình nhé...
   
   10. AMP <br>
   Ở [bài trước](https://viblo.asia/p/google-amp-tot-nhung-vat-va-Qbq5QvXRKD8) mình có viết một bài về AMP. Nhưng chưa đưa ra được kết quả thực tế cụ thể, cho đến thời điểm này. Mình phải công nhận là AMP thật sự mang đến tốt độ trên mobile nhanh đến ngạc nhiên. Và kết quả SEO thì khỏi nói. Đây là kết quả SEO trang AMP của mình sau 3 tháng
   
   ![](https://images.viblo.asia/13e9c790-3677-4057-ab79-1af3a9af7cab.png)
   
   
   Khá khả quan đấy chứ. Vậy nên, nếu có điều kiện và khả năng, thì hãy áp dụng AMP cho trang của bạn nhé. Bởi traffic từ ứng dụng ngày nay chiếm hầu hết lượng truy cập trang của chúng ta đấy...
   
   11. Domain, host và url
   
       Điều này nhắc lại hơi thừa, nhưng một domain đẹp chứa từ khóa chính của trang ví dụ như bạn bán laptop chẳng hạn. Và có một domain `laptop.com` hoặc `laptop.vn` thì thật sự quá tuyệt. Những domain có ý nghĩa như vậy ảnh hưởng rất lớn đến SEO. Tuy nhiên giá cả lại quá đắt đỏ, hơn nữa những domain `.com` `.net` hiện cũng chẳng còn nhiều. Phần vì lâu đời nên người ta mua hết, phần thì vì nó đẹp nên người ta mua đầu cơ và phải mua lại với mức phí cao ngất ngưởng. Vậy nên nếu bạn đang có một domain đẹp, xin chúc mừng. Domain vừa tốt cho SEO, vừa chứng tỏ bạn cũng giàu đấy chứ :v: 
       Ngoài ra, nên tạo ra những đường dẫn đẹp. Ví dụ như trang đọc truyện thì nó là `/doc-truyen/song-dong-em-dem.html` chứ không nên là `/truyen?name=songdongemdem`. Bữa nay kỹ thuật sử dụng slug name và rewrite htaccess phổ biến vậy. Việc tạo ra những đường dẫn thân thiện chắc ai cũng ý thức được...
       
       Hơn nữa, ki mua một domain, sẽ tốt hơn nếu mua lại từ ai đó. Bởi domain càng hoạt động lâu đời thì chỉ số domain authority cũng sẽ cao hơn. Điều này cũng là một yếu tố cần lưu ý...
       
###    Kết luận

Bài dài và nhiều chữ quá đi mất, mà vẫn chưa hết ý. Ngoài ra còn vụ đi backlink và kiếm traffic từ mạng xã hội và ti tỷ thứ vụn vặt nữa nữa... Nhưng mà kiến thức rộng quá, chắc mình xin tạm dừng bài viết ở đây chờ bài viết tiếp theo mình viết tiếp vậy.... <br><br>

SEO không phải việc mà load lại trang một cái là có thể thấy ngay được. Nhiều khi mất cả năm, mất nhiều thời gian hơn code nữa. Content càng độc đáo, càng chất lượng thì khả năng tăng rank càng dễ... Chứ không thì lượng truy cập lèo tèo nhìn phát nản. Mà chạy adword mãi thì tốn tiền. Vậy nên nếu không phải trang kinh doanh thu tiền từ việc bán sản phẩm thì để tạo một trang, SEO và duy trì nó xem chừng dễ nản. Nhất là khi việc lên top tìm kiếm mất quá nhiều công chờ đợi... Vậy nên, nếu bạn đang có traffic từ oganic search thì bạn thật sự rất đáng ngưỡng mộ,,,,
     <br><br>
 Cuối cùng, mình là một lập trình viên, không phải người chuyên về mảng SEO, tất cả những gì mình tìm hiểu được để thỏa tính tò mò và SEO thử cho biết chỉ có bấy nhiêu thôi. Còn nhiều điểm nữa mình biết rõ là không tìm hiểu đến cũng như không diễn giải chính xác được. Vậy nên hy vọng nhận được sự góp ý của bạn ở cuối bài viết nhé. Cám ơn bạn đã giành thời gian cho bài viết của mình... ^^
 
![](https://i.imgur.com/3Q686p3.gif)