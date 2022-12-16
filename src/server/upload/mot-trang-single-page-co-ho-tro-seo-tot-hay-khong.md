Có một nơi rất nổi tiếng âm u, tối tăm  của những trang Single Page App chính là SEO. Cho dù bạn là ai, công cụ tìm kiếm cũng sẽ giúp bạn gom lại content của SPA, miễn là site của bạn đã được đồng bộ và chạy tốt.

Do sự nhầm lẫn gây ra bởi tất cả những lời khuyên mâu thuẫn này, tôi thường xuyên xem các câu hỏi "Web Vue của tôi có tốt cho SEO hay không?” trên các nơi như Vue.js facebook group, forum hoặc Reddit.

Trong bài viết này, chúng tôi nhận các ý kiến đó và thực hiện một số thử nghiệm cơ bản và cố gắng đưa ra kết luận và một số lời khuyên để giúp bạn  xây dựng web SPA thân thiện với SEO. 

>**Chú thích**: Bài viết này đc viết khi Vue.js Developers blog đăng ngày 09/04/2018 

### Những vấn đề gặp phải tại SPA 
Trong khi triển khai một SPA, browser render nội dung mà không cần bao gồm nội dung chính xác. Nội dung sẽ được load ra sau khi gọi xong một Ajax và được thêm vào bởi Javascript.

Điều này cho phép người dùng đc xem cái "trang" đó mà không cần refresh trang, giúp cải thiện UX. 


<img src="https://cdn-images-1.medium.com/max/800/0*mtz2HTylSayLefHl">
 

Khi các kiến trúc trên hoạt động,  người dùng sẽ nhìn thấy trang trên browser, vậy cơ chế tìm kiếm sẽ "cào" cái gì? nó có thể chạy trên javascript không? Nếu có, nó sẽ phải đợi gọi AJAX xong mới "cào" sao ? 

Biết những điều này là cực kỳ quan trọng,  vì nó có thể xác định liệu nội dung của trang có thể được đánh index bởi công cụ tìm kiếm hay không và quan trọng là nội dung của nó được xếp hạng tốt như thế nào.

### Googlebot 
Do hiện tại google đi đầu thế giới về công cụ tìm kiếm, thành ra chúng ta chỉ tập trung vào Googlebot - Công cụ "cào" của của Google 

Vào những ngày xa xưa, Googlebot chỉ "cào" thông tin từ HTML tĩnh thôi. Trong buổi công bố năm 2014,  Googlebot sẽ cho phép "cào" nội dung web sau khi Javascipt render xong nội dung. 

Để giúp debug dễ dàng những vấn đề khi render bằng JS, Google cung cấp công cụ "Fetch As Google",  `/webmasters` này giúp hiển thị  screenshot của website của  bạn do Googlebot tạo từ một url có sẵn.

> **Chú ý** là Googlebot sẽ không "cào" theo kiểu bất đồng bộ. Đơn giản thì Googlebot sẽ đợi 20 giây mới "cào", để cho tất các các bất đồng bộ chạy hoàn tất. 
 

### Googlebot sẽ thấy SPA như thế nào?

Một ví dụ tinh túy Vue.js SPA là Vue HackerNews Clone 2.0. Đây là một open source được cung cấp bởi team Vue để thể hiện toàn bộ khả năng của Vue và các design pattern.

Tôi đã deploy app này lên Heroku và chạy thử bằng "Fetch As Google", ảnh dưới đây là hình chụp những gì Googlebot nhìn thấy 

<img src="https://cdn-images-1.medium.com/max/800/0*gTRGGG8vgHnUC-wk">
 
### Loại bỏ việc Server Side Rendering (SSR)

Một chức năng chính của Vue HackerNews Clone 2.0 chính là Server Side Rendering. Nghĩa là, không giống như cái cơ bản của SPA, nội dung của mỗi page sẽ được render sẵn từ phía server và cung cấp cho browser HTML tĩnh. 

Đó là thứ chúng ta cố phải hiểu, cách mà Googlebot thấy content của client render. Vì thế, tôi sẽ tất SSR và chạy lại

<img src="https://cdn-images-1.medium.com/max/800/0*3jYhaCOUE3AeNDlp"> 
 
Mặc dù là client render, Googlebot vẫn có thể thấy content của website chúng bình thường, Tôi cũng đợi vài ngày để xem Google có đánh index cho SPA của tôi không, thì đây là kết quả: 

<img src="https://cdn-images-1.medium.com/max/800/0*Abrff5Cu_dodjeMA">

### Chờ tí, có mấy thứ không ổn này? …

Dù bài test này thoả mãi mọi quan tâm về content Client render, nhưng ta vẫn còn một số lý do không thể tin tưởng đc 
1. Giống như mọi JS engines, Googlebot đôi lúc sẽ không công hiệu và sẽ có những trường hợp nó không thể render được page.
2. Nội dung trang có thể index đc, nhưng không có nghĩa nó sẽ được xếp hạng tốt. 

### Javascript chạy không tốt?

Googlebot dường như không có vấn đề gì khi render Vue HackerNews. Nhưng không có chắc chắn là nó render toàn bộ một cách hoàn hảo. Thông báo của Google năm 2014 về Javascript cũng không chắc chắn là nó sẽ đảm bảo cả, mặc dù các dev dường như đã bỏ lơ nó,

Giống như browser, Googlebot phải cố một Javascript engine với một đống những chức năng web, phiên bản ES và nhiều thứ khác nữa. 
Trong một video từ developer của Google (Addy Osmani  và  Rob Dodson)  vào tháng 11/2017, Googlebot hiện tại dựa trên Chrome 41. Hiện tại có rất nhiều API đc viết trc bản release 41 này, và nếu bạn xài nó, không có gì chắc chắn Googlebot sẽ render đc và index đc trang của bạn. 

Bạn nghĩ rằng đây không phải vẫn đề quan trọng, vì bạn sẽ translate polyfill nó tích hợp trên mọi browser. Về khoảng này, thì bạn đã sai vì đã quá mù quáng tin vào những transpile đó chạy đúng mọi lúc, cũng giống như bạn tin app của mình chạy đúng trên mọi browser vậy. 

### Tối ưu hoá nào!

Đừng quên rằng, chữ "O" trong "SEO" nghĩa là "Optimizaition" (Tối ưu). Đã được đánh index không có nghĩa là site của bạn sẽ ở xếp hạng tốt. Fetch As Google cho ta biết hình dạng củng site của trên Google, nhưng không cho chúng ta so sánh chúng vs đối thủ khác. 

Có một số bình luận khá thú vị ở bài viết: SEO vs. React: Web Crawlers are Smarter Than You Think made by SEO của Barry Adams ("https://www.freecodecamp.org/news/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9/"): 

> Điều sẽ xảy ra khi bạn sử dụng React mà không xài SSR là "cào" sẽ dừng lại ngay trang đầu tiên vì nó không thấy bất cứ hyperlinks nào để nó đi theo cả. Nó khiến cho quá trình "cào" sẽ chậm là không hiệu quả. Đó là lý do những website build bằng React (hoặc flatform JS tương tự) sự tối ưu lại thấp hơn các web HTML tĩnh.  Các trang web HTML đơn giản có thể được "cào" rất hiệu quả, nội dung mới được thêm và thay đổi sẽ được "cào" và đánh index nhanh hơn nhiều, Google có thể đánh giá độ ưu tiên "cào" các trang riêng lẻ trên các trang web đó. 

Dù không có gì chứng minh luận điểm trên, nhưng dường như về lý thuyết thì nó đúng với quết định xếp hạng cũng như là tốc độ trang. 

### Vậy làm sao khi SEO cực kỳ quan trọng?

Điểm mấu chốt là, nếu như SEO cực kỳ quan trọng, bạn không thể dựa vào sự render của SPA và  nội dung phải luôn luôn đầy đủ trong trang. 

Nó không có nghĩa bạn cần bỏ kiến trúc SPA, có 2 kỹ thuât: SSR (render phía server) và prerendering (render trước), cả hai để mang kết qủa tương tự. 

### Server-Side Rendering

Server-side rendering (SSR) là nơi trang web được render bởi server, cũng là một phần của quy trình request/response  của server. Trong trường hợp của Vue.js và cách frameworks tương tự, điều này được thực hiện dựa theo DOM ảo. 

Trạng thái của DOM ảo được convert thằng HTML, chúng đc thêm vào trang trước khi gửi đển client. Khi browser nhận được thông tin, thì Javascript chỉ cần cho show những nội dung có sẵn.

**SSR** sẽ đảm bảo trang của bạn với thân thiện với SEO, dù cho "cào" bất kể hình thức nào đi nữa, kể cả khi "cào" trên Javascript,

**SSR** cũng có những nhược điểm:
- Bạn sẽ cần thiết kế code của bạn chạy "toàn cầu". Ví dụ: Code của phải phải chạy cả trên browser và môi trường Javascript trên server. Nghĩa là bất cứ code nào sử dụng API của browser, như là `window` thì nó sẽ chết ngắc. 
- App của bạn sẽ chạy cả những request đển server, đồng nghĩa với thời gian load trang sẽ chậm lại, Caching sẽ giúp giảm bớt một phần.
- Sẽ có sự phức tạp và tiêu tốn thời gian khi làm SSR, bạn sẽ cần thêm hàng giờ để hoàn thành project.
- Nó chỉ có thể chạy tốt với server chạy bằng Node. SSR không thể chạy những môi trường không có Node. Ví dụ: Trên môi trường PHP, SSR sẽ chạy đc khi có extension v8js, nhưng hàng fake sẽ không ngon như hàng auth đc. 

Nếu bạn vẫn muốn phát triển SSR trên Vue SPA, bạn cầm bắt đầu với hướng dẫn này : https://ssr.vuejs.org/ . Bạn cũng có thể tham khảo việc phát triển SSR trên Laravel và Vue qua: https://vuejsdevelopers.com/2017/11/06/vue-js-laravel-server-side-rendering/
 

> **Thao khảo**: Frameworks Nuxt.js sẽ giúp bạn khá nhiều thời gian khi phát triển SSR cho SPA.

### Prerendering
Nếu bạn không thể sử dụng SSR với một số lý do trên, thì vẫn còn một cơ hội nữa: Prerendering (Render trước). Với cách này, bạn chạy app của mình trên môi trường dev, copy lấy thông tin HTML  sau khi render và trả các file HTML khi có một response lên server. 

Nó khá là tương đồng với mô hình SSR, ngoại trừ nó được làm trước khi deloy, không phải khi đang chạy live. Nó được thực hiện với trình duyện headless như Chrome và có tích hợp trong flow build của Wedpack, Gulp etc.

Điều tươi mới của Prerendering là nó không cần đến Node.js trên server prodcut và không nhất thiết một server cho product.

Tuy nhiên, Prerendering vẫn có nhược điểm sau:

- Nó sẽ không chạy trên nhưng trang hiển thị data thay đổi, vd: Vue HackerNews,
- Nó không thích hợp cho những trang đăc-biêt-cho-người-dùng. vd: Trang thông tin người dùng, tuy nhiên, những loại trang này thì không quan trọng SEO nữa, chả ai muốn trang cá nhân của mình được Google đánh index cả.
- Bân sẽ cần Prerender tất cả route của từng trang riêng biệt, điều này sẽ ngốn khá nhiều thời gian và bô nhớ.

Nếu bạn vẫn muốn phát triển Prerendering trên Vue app của mình, hãy xem qua bài: https://vuejsdevelopers.com/2017/04/01/vue-js-prerendering-node-laravel/

>**Tham khảo**: Bạn có thể mua dịch vụ này qua prerender.io

### Kết luận:
Nhiều developer xem Thông bố của Google 2014 về Javascript render như một hình thức SEO cho nội dung SPA. Nhưng thật sự, nó không chắc chắn rằng Googlebot sẽ render đúng website của bạn, và cho dù có, thì thứ hạng của site bạn vẫn thua thiệt so với những trang HTML tính. 

Lời khuyên của tôi: Nếu bạn muốn sử dụng kiến trúc SPA, hãy chắn chắn server bạn cung cấp SSR hoặc Prerendering. 

*Bài viết này tôi dịch từ Medium, bạn có thể tham khảo source chính từ link dưới đây*

Source: https://medium.com/js-dojo/is-my-single-page-app-seo-friendly-be2c827f1c38