Không lâu về trước, khi khái niệm front-end engineering lần đầu tiên được đưa ra trong ngành phát triển web, tui hay đọc các bài thảo luận về sự khác nhau giữa hai khái niệm này. Tuy khái niệm front-end engineer không có gì là quá mới mẻ, tuy nhiên vẫn còn khá nhiều cuộc tranh cãi và nhiều hiểu lầm liên quan tới hai khái niệm này, đặc biệt là trong những năm điên rồ gần đây của giới front-end và sự phất lên của Javascript :heart_eyes:.

Một website cơ bản được chia ra làm 2 phần là front-end và back-end. Nhiệm vụ của front-end là làm việc với các giao diện web hoặc app (thứ mà user trực tiếp cảm nhận và tương tác với).

Có khá nhiều cách tiếp cận với việc phát triển một trang web hoặc web app dù là nó động hay tĩnh. Trong những năm gần đây, JavaScript đang phất lên hơn bao giờ hết nhờ sự magic (mặc dù sida :expressionless:) và độ hiểu quả của nó. Từ ngày flash chết và HTML 5 ra mắt, với bộ API của nó thì chắc chắn trong những năm tiếp theo JavaScript sẽ là ngôn ngữ chủ đạo cho phát triển web.

Giờ này nhắc tới Front-end engineering, theo ý kiến cá nhân của tui thì nó liên quan nhiều hơn tới phát triển dựa trên JavaScript. Bởi vì trong những năm 2000, chưa hề có Grunt, Gulp hay NPM - những thứ giúp cho việc phát triển front-end trở nên ngầu và pro hơn. Cuộc cách mạng Javascript và nó đã nổi lên nhờ có NODE.js ra đời và theo sau đó là hàng trăm nghìn tools, lib viết bằng Javascript :flushed:.

![Front-end](https://images.viblo.asia/40eb2902-7fae-409e-8f62-c6485df25bba.jpeg)

## Vậy cuối cùng là engineer khác gì developer ở front-end side? :smirk:

Về cơ bản, hầu như nó khác biệt trong các tiếp cận phát triển trang web. Theo cách truyền thống, front-end developer bắt đầu với việc tiếp nhận một tài liệu Photoshop hoặc bản vẽ wireframe, layout từ Sketch hoặc Adobe XD chả hạn, sau đó implement và phát triển giao diện web.

Trong trường hợp này, các tools chính mà developer sử dụng chỉ cần là code editor (Sublime Text, Vim, Notepad etc.), trình duyệt Web và một devtool (thường là Chrome Developer Tool) là đủ. Hầu như những việc mà họ cần làm là biến các bản mẫu từ Photoshop (hoặc XD) thành các sản phẩm web chạy được trên trình duyệt. Không có page load speed optimization, không có tối giảm HTTP request hoặc vấn đề nào về hiệu năng khác được quan tâm.

Tuy nhiên không chỉ đơn giản như vậy, với sự bùng nổ của các thiêt bị di động, iOS và Android OS, hiện tại hơn 50% website user là người dùng di động trên các trình duyệt màn hình nhỏ, được truy cập từ các mạng khác nhau từ 3G, 4G, Wifi mang đến một sự đau đầu nhẹ cho front-end developer về responsive giao diện hoặc các vấn đề về tối ưu tốc độ tải cho mạng di động.

Sau đó, với việc ra mắt CSS3 media query đã giúp cho các front-end developer rất nhiều trong việc làm giao diện responsive, tương thích nhiều màn hình từ desktop, tablet tới mobile, các CSS framework như Bootstrap cũng tích hợp sẵn responsive luôn. Các vấn đề về tốc độ tải và hiệu năng trên trình duyệt di động dần được chú ý hơn và đó là nơi mà các thuật ngữ về engineering được đặt ra.

## Cách tiếp cận của Front-end Engineer

Các tiếp cận phát triển web hiện đại khác kiểu truyền thống ở nhiều khía cạnh khác nhau. Đầu tiên, sự khác biệt là về môi trường phát triển, tiếp theo là hiệu năng load trang và các vấn đề về hiệu năng được đặt lên cao. Thanks God nhờ có `NODE.js` và package manager `NPM`, các front-end engineer hiện đại phải làm việc với các bộ CLI (Command line interface) để sử dụng các thể loại build task (nghe ngầu vl).

Front-end automation (tự động hoá) hay build task là để thực hiện các nhiệm vụ như dịch `LESS` `SASS` (các pre-processor giúp viết code CSS ngon hơn, dễ maintain hơn) thành CSS hoặc bundle (trộn) nhiều file CSS, JS lại thành 1 file để giảm số HTTP request từ client tới server, thứ góp phần quan trọng trong việc cải thiện hiệu năng từ front-end side. Càng ít HTTP request thì web bạn load càng ngon hơn và ít lỗi có thể xảy ra hơn. Ngoài ra build task còn có minify CSS, JS (giảm dung lượng file), các phần source-map hỗ trợ debugging tốt hơn, etc.

Nhờ có các CSS framework như Bootstrap, Materialize hay nhiều cái khác nữa, việc viết layout CSS và thiết kế giao diện responsive đa trình duyệt trở nên đơn giản hơn nhiều. Tuy nhiên vấn đề của các framework này là, chúng được load sẵn ngay từ đầu (ở trình duyệt của user) với khá nhiều class CSS, thuộc tính và cả những đoạn JS script kể cả những phần không bao giờ xài trong project.

Để dễ hình dung, ở một dự án web thực tế, bạn hầu như chỉ xài 30-50% resource của một framework (HTML/CSS class và JS plugin). Các thành phần bị bỏ rơi còn lại chỉ đơn giản trở thành rác, làm nặng thêm trang web của bạn đồng nghĩa với browser sẽ load lâu hơn, hiệu năng kém hơn. Để tối ưu hoá các thành phần sử dụng trong CSS framework, có thể viết các build task từ Grunt, Gulp, Bower hoặc Yeoman. Ví dụ, bạn có thể xài một grunt package để bundle tất cả script JS và CSS thành 1 file, Grunt ngoài ra cũng sẽ minify/uglify CSS và JS của bạn cho hiệu năng load nhanh hơn.

## Một số chỉ dẫn về front-end engineering

Nói ngắn gọn, trong khi front-end developer truyền thống bỏ qua các vấn đề về tốc độ load trang, tính usability, chia code thành module dễ maintain, loại bỏ rác CSS và JS thì front-end engineer sẽ xem xét các vấn đề này một các nghiêm túc và cẩn thận :grin:.

1. Master cách tiếp cận với HTML [semantic coding](http://goo.gl/nV95L).
2. Master thiết kế CSS theo modules hoặc sử dụng một CSS pre-processor như `LESS` `SCSS`. Tìm hiểu các best-practice cho CSS, tối ưu hoá các code CSS đồng thời phải cải thiện tính [maintainable](http://goo.gl/1ltJgb).
3. Hiểu cách hoạt động của các engine đằng sau trình duyệt. Tìm hiểu các nguyên lí của browser, cách chúng load các tài nguyên từ bên ngoài. [Đây](http://goo.gl/WFb7T) là một bài viết rất chi tiết cảu tác giả Tali Garsiel về nguyên lí hoạt động của browser engine.
4. Tìm hiểu sâu về DOM - Document Object Model hoặc các mà JS render ra HTML DOM trên trình duyệt. Master các cách thức luân chuyển DOM, DOM events và các chủ đề tương tự. [MDN](http://goo.gl/mccJ44) là một trang khá hay để học sâu về DOM.
5. Học kĩ về RAW JavaScript trước khi học JQuery - khá nhiều người mới bắt đầu bỏ qua JavaScript và học JQuery ngay dẫn tới mắc khá nhiều sai lầm cơ bản khi sử dụng các tools, lib được viết bằng JS. [Code Academy](http://goo.gl/sswKD8) và [W3School](http://goo.gl/2CthE) là đủ để bạn học về JavaScript. Có thể tham khảo đọc thêm quyển [Eloquent JavaScript](http://goo.gl/6Cch) dành cho những người mới bắt đầu học, khá hay.
6. Master một CSS Framework ví dụ như Bootstrap, các thành phần bên trong nó. Tìm hiểu các công cụ liên quan tới Framework đó và các tối ưu hoá khi chạy code ở môi trường production.
7. Tìm hiểu về [kiến trúc client-server](http://goo.gl/9oKZQ) và [network performance evaluation](http://goo.gl/GKL5c8) để hiểu rõ các mà các tài nguyên được load vào trình duyệt (có thể sử dụng Chrome Developer Tool để quan sát).
8. Học về [HTTP](http://goo.gl/6l1h0W) và [HTTP VERBS cũng như HTTP REQUEST](http://goo.gl/5oZKyY). Có một quyển sách khá ngắn gọn và dễ đọc về HTTP là [HTTP succinctly](http://goo.gl/w8u89H).
9. Master CLI terminal hoặc bash - Có một guide step by step khá hay về học CLI hoặc terminal: ["The Command Line Crash Course"](http://goo.gl/PXcy7). Tin tui đi, khi bạn làm việc với các build script và automation process trong dự án thì bạn cần một vài kĩ năng sử dụng CLI và những hiểu biết về chúng.
10. Master một công cụ automation/build tool như Grunt hoặc Webpack - biết làm sao để buld các package code thành những đoạn minify/uglify CSS và JS, tối ưu hoá và dọn sạch rác và các tài nguyên không dùng.
11. Đọc về các nguyên tắc block render qua các tài liệu [critical rendering path](http://goo.gl/Qcwp06) cùng với [Google page speed scoring rules](http://goo.gl/mJDhV).
12. Học cách sử dụng các lệnh của Git, thử sử dụng trên Github hoặc Bitbucket. Tìm hiểu các vấn đề về xử lí branch, conflict code và đánh tags version bằng Git.
13. Thử deploy code của bạn lên các cloud platform như Heroku hoặc Google Cloud Engine bằng các công cụ CLI. Hoặc đơn giản hơn, deploy một số project web tĩnh lên Github Pages.
14. Tìm hiểu về Docker, container structure và cách một số web server hoạt động (Server Apache/Nginx chẳng hạn). Viết các file config webserver Nginx hoặc Apache.

*Reference from [@amitmojumder](https://medium.com/@amitmojumder/front-end-engineer-differs-from-front-end-developer-68efe13fce7b)*